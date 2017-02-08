
var changeHomeInfoForm = document.getElementById('homeinfoform');

//header
//var headerImage = document.getElementById('header-picture');
//var headerImageMsg = document.getElementById('header-msg');
//var callToActionText = document.getElementById('cta-text');

//featured cities
var city1Picture = document.getElementById('city1-picture');
var city1PictureMsg = document.getElementById('city1-msg');

var city1Title = document.getElementById('city1');
var city1UploadPreview = document.getElementById('city1UploadPreview');


var city2Picture = document.getElementById('city2-picture');
var city2PictureMsg = document.getElementById('city2-msg');
var city2Title = document.getElementById('city2');
var city2UploadPreview = document.getElementById('city2UploadPreview');

var city3Picture = document.getElementById('city3-picture');
var city3PictureMsg = document.getElementById('city3-msg');
var city3Title = document.getElementById('city3');
var city3UploadPreview = document.getElementById('city3UploadPreview');

// featured movies
var movie1Id = document.getElementById('movie1-id');
var movie2Id = document.getElementById('movie2-id');
var movie3Id = document.getElementById('movie3-id');
var movie4Id = document.getElementById('movie4-id');
var movie5Id = document.getElementById('movie5-id');
var movie6Id = document.getElementById('movie6-id');
var movie7Id = document.getElementById('movie7-id');
var movie8Id = document.getElementById('movie8-id');
var movie9Id = document.getElementById('movie9-id');
var movie10Id = document.getElementById('movie10-id');
var movie11Id = document.getElementById('movie11-id');
var movie12Id = document.getElementById('movie12-id');




firebase.database().ref('home/').on('value', function(snapshot){

city1.value = snapshot.val().city1;
city2.value = snapshot.val().city2;
city3.value = snapshot.val().city3;
movie1Id.value = snapshot.val().movie1id;
movie2Id.value = snapshot.val().movie2id;
movie3Id.value = snapshot.val().movie3id;
movie4Id.value = snapshot.val().movie4id;
movie5Id.value = snapshot.val().movie5id;
movie6Id.value = snapshot.val().movie6id;
movie7Id.value = snapshot.val().movie7id;
movie8Id.value = snapshot.val().movie8id;
movie9Id.value = snapshot.val().movie9id;
movie10Id.value = snapshot.val().movie10id;
movie11Id.value = snapshot.val().movie11id;
movie12Id.value = snapshot.val().movie12id;


function fetchStaticImage(element, path){
  storageRef.child(path).getDownloadURL().then(function(url) {
    element.src = url;

//      console.log('url-> '+url);
//      console.log('src-> '+element.src);
  }).catch(function(error) {
    // Handle any errors
    console.log('image '+String(element)+' could not be fetched');
  });
}


fetchStaticImage(city1UploadPreview,'home/city1.png');
fetchStaticImage(city2UploadPreview,'home/city2.png');
fetchStaticImage(city3UploadPreview,'home/city3.png');



});








function changeHomeInfo(city1Title, city2Title, city3Title, movie1Id, movie2Id, movie3Id, movie4Id, movie5Id, movie6Id, movie7Id, movie8Id, movie9Id, movie10Id, movie11Id, movie12Id) {

  // A post entry.
  var homeData = {
    //calltoactiontext: callToActionText,
    city1: city1Title,
    city2: city2Title,
    city3: city3Title,
    movie1id: movie1Id,
    movie2id: movie2Id,
    movie3id: movie3Id,
    movie4id: movie4Id,
    movie5id: movie5Id,
    movie6id: movie6Id,
    movie7id: movie7Id,
    movie8id: movie8Id,
    movie9id: movie9Id,
    movie10id: movie10Id,
    movie11id: movie11Id,
    movie12id: movie12Id
  };


  var updates = {};
  updates['/home/'] = homeData;

  //UPLOAD PICTURES


function uploadImage(fieldName, uploadMsgName, imageLocation) {

  var file = fieldName.files[0];

  //var uploadMsgName = document.getElementById(uploadMsgName);

      // Upload file and metadata to the object 'images/mountains.jpg'
      var uploadTask = storageRef.child(imageLocation).put(file);

      // Listen for state changes, errors, and completion of the upload.
      uploadTask.on(firebase.storage.TaskEvent.STATE_CHANGED, // or 'state_changed'
        function(snapshot) {
          // Get task progress, including the number of bytes uploaded and the total number of bytes to be uploaded
          var progress = (snapshot.bytesTransferred / snapshot.totalBytes) * 100;
        uploadMsgName.innerHTML = 'Progresso do upload da imagem do header ' + progress + '%';
          switch (snapshot.state) {
            case firebase.storage.TaskState.PAUSED: // or 'paused'
                uploadMsgName.innerHTML = 'upload da imagem do header pausado';
              break;
            case firebase.storage.TaskState.RUNNING: // or 'running'
              uploadMsgName.innerHTML = 'upload da imagem do header em andamento';
              break;
          }
        }, function(error) {
        switch (error.code) {
          case 'storage/unauthorized':
          uploadMsgName.innerHTML = 'error - storage/unauthorized';
            // User doesn't have permission to access the object
            break;

          case 'storage/canceled':
        uploadMsgName.innerHTML = 'error - storage/canceled';
            // User canceled the upload
            break;

          case 'storage/unknown':
          uploadMsgName.innerHTML = 'error - storage/unknown';
            // Unknown error occurred, inspect error.serverResponse
            break;
        }
      }, function() {

        // Upload completed successfully, now we can get the download URL
        //var downloadURL = uploadTask.snapshot.downloadURL;
          uploadMsgName.innerHTML = 'Upload realizado com sucesso';
        return true;
      });

}

console.log(city1Picture.value);
console.log(city2Picture.value);
console.log(city3Picture.value);

if(city1Picture.value.length > 5){uploadImage(city1Picture, city1PictureMsg, 'home/city1.png');} else{console.log('upload1 nao realizado');}
if(city2Picture.value.length > 5){uploadImage(city2Picture, city2PictureMsg, 'home/city2.png');}else{console.log('upload2 nao realizado');}
if(city3Picture.value.length > 5){uploadImage(city3Picture, city3PictureMsg, 'home/city3.png');}else{console.log('upload3 nao realizado');}

/*

var file1 = headerImage.files[0];

var uploadMsg1 = document.getElementById("uploadmsg1");

    // Upload file and metadata to the object 'images/mountains.jpg'
    var uploadTask1 = storageRef.child("home/header.png").put(file);

    // Listen for state changes, errors, and completion of the upload.
    uploadTask1.on(firebase.storage.TaskEvent.STATE_CHANGED, // or 'state_changed'
      function(snapshot) {
        // Get task progress, including the number of bytes uploaded and the total number of bytes to be uploaded
        var progress = (snapshot.bytesTransferred / snapshot.totalBytes) * 100;
      uploadMsg1.innerHTML = 'Progresso do upload da imagem do header ' + progress + '%';
        switch (snapshot.state) {
          case firebase.storage.TaskState.PAUSED: // or 'paused'
              uploadMsg1.innerHTML = 'upload da imagem do header pausado';
            break;
          case firebase.storage.TaskState.RUNNING: // or 'running'
            uploadMsg1.innerHTML = 'upload da imagem do header em andamento';
            break;
        }
      }, function(error) {
      switch (error.code) {
        case 'storage/unauthorized':
          // User doesn't have permission to access the object
          break;

        case 'storage/canceled':
          // User canceled the upload
          break;

        case 'storage/unknown':
          // Unknown error occurred, inspect error.serverResponse
          break;
      }
    }, function() {

      // Upload completed successfully, now we can get the download URL
      var downloadURL = uploadTask1.snapshot.downloadURL;

    });*/

    return firebase.database().ref().update(updates);
}

  changeHomeInfoForm.onsubmit = function(e) {

  e.preventDefault();

  function cityLinkIt(city){

     city = city.trim();
     city = city.toLowerCase();
     city = city.replace(/[á|ã|â|à]/gi, "a");
     city = city.replace(/[é|ê|è]/gi, "e");
     city = city.replace(/[í|ì|î]/gi, "i");
     city = city.replace(/[õ|ò|ó|ô]/gi, "o");
     city = city.replace(/[ú|ù|û]/gi, "u");
     city = city.replace(/[ç]/gi, "c");
     city = city.replace(/[ñ]/gi, "n");
     city = city.replace(/[á|ã|â]/gi, "a");

     return city;
  }


  //call to action

  //var callToActionText = callToActionText.value.trim();

  //featured cities

  var city1 = city1Title.value.trim();
  var city2 = city2Title.value.trim();
  var city3 = city3Title.value.trim();


  // featured movies
  var movie1id = movie1Id.value.trim();
  var movie2id = movie2Id.value.trim();
  var movie3id = movie3Id.value.trim();
  var movie4id = movie4Id.value.trim();
  var movie5id = movie5Id.value.trim();
  var movie6id = movie6Id.value.trim();
  var movie7id = movie7Id.value.trim();
  var movie8id = movie8Id.value.trim();
  var movie9id = movie9Id.value.trim();
  var movie10id = movie10Id.value.trim();
  var movie11id = movie11Id.value.trim();
  var movie12id = movie12Id.value.trim();


  if (city1 && movie1Id) {
    changeHomeInfo(city1, city2, city3, movie1id, movie2id, movie3id, movie4id, movie5id, movie6id, movie7id, movie8id, movie9id, movie10id, movie11id, movie12id).then(function() {
      document.getElementById('msg').innerHTML = 'Informações alteradas com sucesso';
      alert('Informações alteradas com sucesso');
      scroll(0,0);
      //window.location = window.location;
    });
      city1Title.innerHTML = '';
      city2Title.innerHTML = '';
      city3Title.innerHTML = '';
      movie1Id.innerHTML = '';
      movie2Id.innerHTML = '';
      movie3Id.innerHTML = '';
      movie4Id.innerHTML = '';
      movie5Id.innerHTML = '';
      movie6Id.innerHTML = '';
      movie7Id.innerHTML = '';
      movie8Id.innerHTML = '';
      movie9Id.innerHTML = '';
      movie10Id.innerHTML = '';
      movie11Id.innerHTML = '';
      movie12Id.innerHTML = '';
  }

  else {
    alert('ocorreu algum erro!');
  }



};
