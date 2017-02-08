// Initialize Firebase
var config = {
  apiKey: "AIzaSyB47zhou7qRuV8MvKsTDW60tPr5CXgxH3g",
  authDomain: "filmesviagem-221d8.firebaseapp.com",
  databaseURL: "https://filmesviagem-221d8.firebaseio.com",
  storageBucket: "filmesviagem-221d8.appspot.com",
};

firebase.initializeApp(config);

// Get a reference to the storage service, which is used to create references in your storage bucket
var storage = firebase.storage();

// Create a storage reference from our storage service
var storageRef = storage.ref();

var siteurl = "http://movspot.com/";

var s = [];

//var uid;


firebase.auth().onAuthStateChanged(function(user) {
  if (user) {

      // User is signed in.
      document.getElementById('loggedcontainer').style.display = 'inline-block';
      document.getElementById('facebookloginbtn').style.display = 'none';
      document.getElementById('googleloginbtn').style.display = 'none';
      document.getElementById('logindropdown').style.display = 'none';

      name = user.displayName;

      email = user.email;
      photoUrl = user.photoURL;
      uid = user.uid;

      console.log(name);
      console.log(email);
      console.log(photoUrl);
      console.log(uid);

      document.getElementById('userpic').src = photoUrl;
      document.getElementById('username').innerHTML = name.substring(0, name.indexOf(' '));;

      $('#loginModal').modal('hide');

        var userData = {
          username: name,
          email: email,
          profile_picture : photoUrl

        };

        // Write the new post's data simultaneously in the posts list and the user's post list.
        var updates = {};
        updates['users/' + uid + '/'] = userData;

        return firebase.database().ref().update(updates);


  } else {
    // No user is signed in.

    document.getElementById('facebookloginbtn').style.display = 'inline-block';
    document.getElementById('googleloginbtn').style.display = 'inline-block';
    document.getElementById('loggedcontainer').style.display = 'none';
    document.getElementById('logindropdown').style.display = 'inline-block';
  }
});



function facebookLogin(){

  var provider = new firebase.auth.FacebookAuthProvider();
  firebase.auth().signInWithPopup(provider).then(function(result) {
    // This gives you a Facebook Access Token. You can use it to access the Facebook API.
    var token = result.credential.accessToken;
    // The signed-in user info.
    var user = result.user;
    //alert('ta logado!!!');
    // ...

    document.getElementById('facebookloginbtn').style.display = 'none';
    document.getElementById('googleloginbtn').style.display = 'none';
  }).catch(function(error) {
    // Handle Errors here.
    var errorCode = error.code;
    var errorMessage = error.message;
    // The email of the user's account used.
    var email = error.email;
    // The firebase.auth.AuthCredential type that was used.
    var credential = error.credential;
    // ...
  });


}






function googleLogin(){
  var provider = new firebase.auth.GoogleAuthProvider();
  firebase.auth().signInWithPopup(provider).then(function(result) {
    // This gives you a Google Access Token. You can use it to access the Google API.
    var token = result.credential.accessToken;
    // The signed-in user info.
    var user = result.user;

    document.getElementById('facebookloginbtn').style.display = 'none';
    document.getElementById('googleloginbtn').style.display = 'none';
    // ...
  }).catch(function(error) {
    // Handle Errors here.
    var errorCode = error.code;
    var errorMessage = error.message;
    // The email of the user's account used.
    var email = error.email;
    // The firebase.auth.AuthCredential type that was used.
    var credential = error.credential;
    // ...
  });


}


function userLogout(){
firebase.auth().signOut().then(function() {
// Sign-out successful.
}, function(error) {
// An error happened.
});
}


function cleanSearchTerms(term){

  var searchTerms = term.replace(/([ .,;]+)/g,'+');
  searchTerms = searchTerms.toLowerCase();
 searchTerms = searchTerms.replace(/[á|ã|â|à]/gi, "a");
  searchTerms = searchTerms.replace(/[é|ê|è]/gi, "e");
  searchTerms = searchTerms.replace(/[í|ì|î]/gi, "i");
  searchTerms = searchTerms.replace(/[õ|ò|ó|ô]/gi, "o");
  searchTerms = searchTerms.replace(/[ú|ù|û]/gi, "u");
  searchTerms = searchTerms.replace(/[ç]/gi, "c");
  searchTerms = searchTerms.replace(/[ñ]/gi, "n");
  searchTerms = searchTerms.replace(/[á|ã|â]/gi, "a");

  return siteurl+'search/'+searchTerms;



}


(function(i,s,o,g,r,a,m){i['GoogleAnalyticsObject']=r;i[r]=i[r]||function(){
(i[r].q=i[r].q||[]).push(arguments)},i[r].l=1*new Date();a=s.createElement(o),
m=s.getElementsByTagName(o)[0];a.async=1;a.src=g;m.parentNode.insertBefore(a,m)
})(window,document,'script','https://www.google-analytics.com/analytics.js','ga');

ga('create', 'UA-85687878-1', 'auto');
ga('send', 'pageview');
ga(function(tracker) {
  var clientId = tracker.get('clientId');
  //console.log('clientid -> '+clientId);
});
