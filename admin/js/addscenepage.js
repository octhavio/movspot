
var addNewSceneForm = document.getElementById('addnewsceneform');

//basic scene info
var movieId = document.getElementById('movie-id');
var sceneTitle = document.getElementById('scene-title');
var sceneDescription = document.getElementById('scene-description');

//address stuff
var sceneStreet= document.getElementById('scene-street');
var sceneNumber= document.getElementById('scene-number');
var sceneCity= document.getElementById('scene-city');
var sceneState= document.getElementById('scene-state');
var sceneCountry= document.getElementById('scene-country');
var scenePicture1= document.getElementById('scene-picture-1');
var scenePicture2= document.getElementById('scene-picture-2');
var sceneLat= document.getElementById('scene-lat');
var sceneLng= document.getElementById('scene-lng');
//var locationType= document.getElementById('locationtype');


function getLocation(address) {
    var geocoder = new google.maps.Geocoder();
    var latitude;
    var longitude;

    var coord = [];
console.log('2');

   // var address = sceneAddress;
    geocoder.geocode({ 'address': address }, function (results, status) {
      if (status == google.maps.GeocoderStatus.OK) {
          latitude = results[0].geometry.location.lat();
          longitude = results[0].geometry.location.lng();

          coord.push(latitude);
          coord.push(longitude);

          console.log(longitude+' - '+latitude);
          console.log('3');
      } else {
        coord.latitude = 0;
        coord.longitude = 0;
          alert("Não conseguimos achar a latitude e longitude do endereço. Não será possível adicionar cena");
      }
    });


    return coord;

};


function addNewScene(movieId, sceneTitle, sceneDescription, sceneStreet, sceneNumber, sceneCity, sceneState,  sceneCountry, sceneId, locationType, latitude, longitude) {
console.log('1');

var lalala;
if(locationType === 'latlngtype'){
  console.log('location type === latlng');
  //latitude = sceneLat.value;
//  longitude = sceneLng.value;
  var sceneAddress = sceneCity+' '+sceneState+' '+sceneCountry;
}
else{
  console.log('location type === address');
  var sceneAddress = sceneStreet+' '+sceneNumber+' '+sceneCity+' '+sceneState+' '+sceneCountry;
   //lalala = getLocation(sceneAddress);
  //  console.log(lalala);
}

console.log('4');
//latitude = lalala.latitude;
//longitude = lalala.longitude;

//var geocoder = new google.maps.Geocoder();

  // A post entry.
  var sceneData = {
    movieid: movieId,
    scenetitle: sceneTitle,
    scenedescription: sceneDescription,
    scenestreet: sceneStreet,
    scenenumber: sceneNumber,
    scenecity: sceneCity,
    scenestate: sceneState,
    scenecountry: sceneCountry,
    sceneid: sceneId,
    sceneaddress: sceneAddress,
    lat: latitude,
    lng: longitude
  };

  // Get a key for a new Post.
  //var newMovieKey = firebase.database().ref().child('movies').push().key;

  // Write the new post's data simultaneously in the posts list and the user's post list.
  var updates = {};
  updates['/movies/' + movieId + "/scenes/" + sceneId] = sceneData;


  //UPLOAD SCENE PICTURE PICTURE 1

var file1 = document.getElementById("scene-picture-1").files[0];

    //console.log(file);
var uploadMsg1 = document.getElementById("uploadmsg-1");

    // Upload file and metadata to the object 'images/mountains.jpg'
    var uploadTask1 = storageRef.child("scene-pics/" + movieId + '/' +  sceneId + "/pic1.png").put(file1);

    // Listen for state changes, errors, and completion of the upload.
    uploadTask1.on(firebase.storage.TaskEvent.STATE_CHANGED, // or 'state_changed'
      function(snapshot) {
        // Get task progress, including the number of bytes uploaded and the total number of bytes to be uploaded
        var progress = (snapshot.bytesTransferred / snapshot.totalBytes) * 100;
        uploadMsg1.innerHTML = 'Progresso do upload da imagem em ' + progress + '%';
          switch (snapshot.state) {
            case firebase.storage.TaskState.PAUSED: // or 'paused'
                uploadMsg1.innerHTML = 'upload da imagem pausado';
              break;
            case firebase.storage.TaskState.RUNNING: // or 'running'
              uploadMsg1.innerHTML = 'upload da imagem em andamento';
              break;
          }
        }, function(error) {
          switch (error.code) {
            case 'storage/unauthorized':
            uploadMsg1.innerHTML = 'error - storage/unauthorized';
              // User doesn't have permission to access the object
              break;

            case 'storage/canceled':
          uploadMsg1.innerHTML = 'error - storage/canceled';
              // User canceled the upload
              break;

            case 'storage/unknown':
            uploadMsg1.innerHTML = 'error - storage/unknown';
              // Unknown error occurred, inspect error.serverResponse
              break;
          }
        }, function() {

          // Upload completed successfully, now we can get the download URL
          //var downloadURL = uploadTask.snapshot.downloadURL;
            uploadMsg1.innerHTML = 'Upload realizado com sucesso';
    });

    //UPLOAD SCENE PICTURE PICTURE 2


    var file2 = document.getElementById("scene-picture-2").files[0];

      //console.log(file);
    var uploadMsg2 = document.getElementById("uploadmsg-2");

      // Upload file and metadata to the object 'images/mountains.jpg'
      var uploadTask2 = storageRef.child("scene-pics/" + movieId + '/' +  sceneId + "/pic2.png").put(file1);

      // Listen for state changes, errors, and completion of the upload.
      uploadTask2.on(firebase.storage.TaskEvent.STATE_CHANGED, // or 'state_changed'
        function(snapshot) {
          // Get task progress, including the number of bytes uploaded and the total number of bytes to be uploaded
          var progress = (snapshot.bytesTransferred / snapshot.totalBytes) * 100;
          uploadMsg2.innerHTML = 'Progresso do upload da imagem em ' + progress + '%';
            switch (snapshot.state) {
              case firebase.storage.TaskState.PAUSED: // or 'paused'
                  uploadMsg2.innerHTML = 'upload da imagem pausado';
                break;
              case firebase.storage.TaskState.RUNNING: // or 'running'
                uploadMsg2.innerHTML = 'upload da imagem em andamento';
                break;
            }
          }, function(error) {
            switch (error.code) {
              case 'storage/unauthorized':
              uploadMsg2.innerHTML = 'error - storage/unauthorized';
                // User doesn't have permission to access the object
                break;

              case 'storage/canceled':
            uploadMsg2.innerHTML = 'error - storage/canceled';
                // User canceled the upload
                break;

              case 'storage/unknown':
              uploadMsg2.innerHTML = 'error - storage/unknown';
                // Unknown error occurred, inspect error.serverResponse
                break;
            }
          }, function() {

            // Upload completed successfully, now we can get the download URL
            //var downloadURL = uploadTask.snapshot.downloadURL;
              uploadMsg2.innerHTML = 'Upload realizado com sucesso';
      });


      return firebase.database().ref().update(updates);

}

addNewSceneForm.onsubmit = function(e) {
  e.preventDefault();

  //basic scene info
  var movieid = movieId.value;
  var scenetitle = sceneTitle.value;
  var scenedescription = sceneDescription.value;

  //address stuff
  var scenestreet = sceneStreet.value;
  var scenenumber = sceneNumber.value;
  var scenecity = sceneCity.value;
  var scenestate = sceneState.value;
  var scenecountry = sceneCountry.value;
  var locationtype = $('input[name="locationtype"]:checked').val();


  var sceneid = scenetitle.replace(/\s+/g, '-').toLowerCase();

  sceneid = sceneid.substring(0,22);


  console.log(sceneid);

  if (movieid && scenetitle && scenedescription && scenecity) {
        console.log('validou os campos');
          console.log('locatointype -> '+locationtype);
    if(locationtype === 'addresstype'){
        console.log('location type address');
      var geocoder = new google.maps.Geocoder();
      var address = scenestreet + ' ' + scenenumber + ' ' + scenecity + ' ' + scenestate + ' ' + scenecountry;
      geocoder.geocode({ 'address': address }, function (results, status) {
        if (status == google.maps.GeocoderStatus.OK) {
            var latitude = results[0].geometry.location.lat();
            var longitude = results[0].geometry.location.lng();
            addNewScene(movieid, scenetitle, scenedescription, scenestreet, scenenumber, scenecity, scenestate,  scenecountry, sceneid, locationtype, latitude, longitude).then(function() {
              document.getElementById('msg').innerHTML = 'Cena adicionado com sucesso';
            });



        } else {
      //    coord.latitude = 0;
        //  coord.longitude = 0;

            alert("Não conseguimos achar a latitude e longitude do endereço. Não será possível adicionar cena");
        }
      });
    }


if(locationtype === 'latlngtype'){
  console.log('location type latlng');
  var scenenumber = '';
  var scenestreet = '';
  var latitude = sceneLat.value
  var longitude = sceneLng.value;

  addNewScene(movieid, scenetitle, scenedescription, scenestreet, scenenumber, scenecity, scenestate,  scenecountry, sceneid, locationtype, latitude, longitude).then(function() {
    document.getElementById('msg').innerHTML = 'Cena adicionado com sucesso';
    document.getElementById('msg').style.display = 'block';
  });
}

        movieId.value = '';
        sceneTitle.value = '';
        sceneDescription.value = '';
        sceneStreet.value = '';
        sceneNumber.value = '';
        sceneCity.value = '';
        sceneState.value = '';
        sceneCountry.value = '';
  }
  else{
    console.log('erro nao validou os campos');
      document.getElementById('msg').innerHTML = 'Erro!';
  }


};
