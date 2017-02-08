/**
 * Saves a new post to the Firebase DB.
 */
// [START write_fan_out]

var addNewMovieForm = document.getElementById('addnewmovieform');
var movieTitlePT = document.getElementById('movie-title-pt');
var movieTitleEN = document.getElementById('movie-title-en');
var movieGenre = document.getElementById('movie-genre');
var movieYear = document.getElementById('movie-year');
var movieDirector = document.getElementById('movie-director');
var movieDescription = document.getElementById('movie-description');
var moviePicture = document.getElementById('movie-picture');




















function addNewMovie(movieTitlePT, movieTitleEN, movieGenre, movieYear, movieDirector, movieDescription, movieUri) {

  // A post entry.
  var movieData = {
    movietitlept: movieTitlePT,
    movietitleen: movieTitleEN,
    moviegenre: movieGenre,
    movieyear: movieYear,
    moviedirector: movieDirector,
    moviedescription: movieDescription,
    movieuri: movieUri
  };


//var keywords = movieTitlePT.replace(/([ .,;]+)/g,'$1§sep§').split('§sep§');
var keywords = movieTitlePT.split(' ');


for (var i = 0; i < keywords.length; i++) {
      //console.log(keywords[i].length + keywords[i]);
      keywords[i] = keywords[i].replace(/([ .,;]+)/g,'');

  }


  // Get a key for a new Post.
  //var newMovieKey = firebase.database().ref().child('movies').push().key;

  // Write the new post's data simultaneously in the posts list and the user's post list.
  var updates = {};
  updates['/movies/' + movieUri] = movieData;


  //UPLOAD MOVIE PICTURE


var file = document.getElementById("movie-picture").files[0];


var uploadMsg = document.getElementById("uploadmsg");

    // Upload file and metadata to the object 'images/mountains.jpg'
    var uploadTask = storageRef.child("movie-thumb/" + movieUri + "/thumb.png").put(file);

    // Listen for state changes, errors, and completion of the upload.
    uploadTask.on(firebase.storage.TaskEvent.STATE_CHANGED, // or 'state_changed'
      function(snapshot) {
        // Get task progress, including the number of bytes uploaded and the total number of bytes to be uploaded
        var progress = (snapshot.bytesTransferred / snapshot.totalBytes) * 100;
      uploadMsg.innerHTML = 'Progresso do upload da imagem em ' + progress + '%';
        switch (snapshot.state) {
          case firebase.storage.TaskState.PAUSED: // or 'paused'
              uploadMsg.innerHTML = 'upload da imagem pausado';
            break;
          case firebase.storage.TaskState.RUNNING: // or 'running'
            uploadMsg.innerHTML = 'upload da imagem em andamento';
            break;
        }
      }, function(error) {
        switch (error.code) {
          case 'storage/unauthorized':
          uploadMsg.innerHTML = 'error - storage/unauthorized';
            // User doesn't have permission to access the object
            break;

          case 'storage/canceled':
        uploadMsg.innerHTML = 'error - storage/canceled';
            // User canceled the upload
            break;

          case 'storage/unknown':
          uploadMsg.innerHTML = 'error - storage/unknown';
            // Unknown error occurred, inspect error.serverResponse
            break;
        }
      }, function() {

        // Upload completed successfully, now we can get the download URL
        //var downloadURL = uploadTask.snapshot.downloadURL;
          uploadMsg.innerHTML = 'Upload realizado com sucesso';

    });


    var updates2= {};


    updates2['/movies/' + movieUri + '/keywords'] = keywords;

    firebase.database().ref().update(updates);
    return firebase.database().ref().update(updates2);
}

addNewMovieForm.onsubmit = function(e) {
  e.preventDefault();
  var movietitleen = movieTitleEN.value;
  var movietitlept = movieTitlePT.value;
  var movieyear = movieYear.value;
  var moviegenre = movieGenre.value;
  var moviedirector = movieDirector.value;
  var moviedescription = movieDescription.value;

  var movieuri = movietitleen.replace(/\s+/g, '-').toLowerCase();
  movieuri = movieuri.replace(/[^\w\s]/gi, '');
    movieuri = movieuri.replace(/[á|ã|â|à]/gi, "a");
     movieuri = movieuri.replace(/[é|ê|è]/gi, "e");
     movieuri = movieuri.replace(/[í|ì|î]/gi, "i");
     movieuri = movieuri.replace(/[õ|ò|ó|ô]/gi, "o");
     movieuri = movieuri.replace(/[ú|ù|û]/gi, "u");
     movieuri = movieuri.replace(/[ç]/gi, "c");
     movieuri = movieuri.replace(/[ñ]/gi, "n");
     movieuri = movieuri.replace(/[á|ã|â]/gi, "a");
     movieuri = movieuri.substring(0, 35);


  movieuri = movieuri + '-' + movieyear;


  if (movietitlept && moviedescription) {
    addNewMovie(movietitlept, movietitleen, moviegenre, movieyear, moviedirector, moviedescription, movieuri).then(function() {
      document.getElementById('msg').innerHTML = 'Filme adicionado com sucesso - <br>ID: ' +movieuri ;
        document.getElementById('msg').style.display = 'block';
    });
    movieTitleEN.value = '';
        movieTitlePT.value = '';
    movieYear.value = '';
    movieGenre.value = '';
    movieDirector.value = '';
    movieDescription.value = '';
  }

  else {
    alert('ocorreu algum erro!');
  }



};
