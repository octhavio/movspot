var users = document.getElementById('user-number');
var movies = document.getElementById('movie-number');
var scenes = document.getElementById('scene-number');


firebase.database().ref('users/').on('value', function(snapshot){
  document.getElementById('user-number').innerHTML = snapshot.numChildren();


});
firebase.database().ref('movies/').on('value', function(snapshot){
   document.getElementById('movie-number').innerHTML = snapshot.numChildren();

var i = 0;
     snapshot.forEach(function(item) {

       var cenas = item.child('scenes').numChildren();
       i = i + cenas;

     });

document.getElementById('scene-number').innerHTML = i;


});
