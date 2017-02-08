


firebase.auth().onAuthStateChanged(function(user) {
  if (user) {
    document.getElementById('notloggedmsg').style.display = "none";
    firebase.database().ref('favorites/'+user.uid).on('value', function(snapshot){

      console.log(snapshot.val());


      var anyFavs=0;
      for(a in snapshot.val()){
        anyFavs++;
      }
      if(anyFavs===0){
        console.log('não tem favs');
            document.getElementById('nofavsmsg').style.display = "inline-block";
      }else{  console.log('tem '+anyFavs+' favs');}

        snapshot.forEach(function(item) {



              firebase.database().ref('movies/'+item.val().movieid+'/scenes/'+item.val().sceneid).on('value', function(snapshot){



                                var toAdd = document.createDocumentFragment();

                                var address = snapshot.val().scenestreet+' '+snapshot.val().scenenumber+' - '+snapshot.val().scenecity+' - '+snapshot.val().scenestate+' - '+snapshot.val().scenecountry;

                                var newScene = document.createElement('div');

                                newScene.id = snapshot.val().sceneid;

                                newScene.className = 'col-sm-12';

                                var test1 = "'"+snapshot.val().movieid+"'";

                                var test2 = "'"+snapshot.val().sceneid+"'";

                                newScene.innerHTML = '<div class="col-sm-12"><div class="block"><h2>'+ snapshot.val().scenetitle +'</h2><h2 class="address">'+ address +'</h2><a href="javaScript:void(0);" class="favorite" id="'+snapshot.val().sceneid+'add" onclick="addFav('+ test1 +', '+ test2 +');" style="display:none" movieid="'+snapshot.val().movieid+'" sceneid="'+snapshot.val().sceneid+'">adicionar aos favoritos  <span class="glyphicon glyphicon-star" aria-hidden="true"></span></a><a href="javaScript:void(0);" class="favorite-remove" class="favorite-remove" id="'+snapshot.val().sceneid+'del"  onclick="delFav('+ test1 +', '+ test2 +');" movieid="'+snapshot.val().movieid+'" sceneid="'+snapshot.val().sceneid+'">remover dos favoritos  <span class="glyphicon glyphicon-remove" aria-hidden="true"></span></a><p>'+ snapshot.val().scenedescription +'</p><div class="image-post" id="'+snapshot.val().sceneid+'-mapa"></div></div><article class="col-md-6 col-sm-6 col-xs-12" id="card1"><div class="movie-scene-container"><img class="layer" id="scenepic1"  src="http://movspot.com/img/scene-movie.jpg"></div></article><article class="col-md-6 col-sm-6 col-xs-12" id="card1"><div class="movie-scene-container"><img class="layer" id="scenepic2"  src="http://movspot.com/img/scene-movie.jpg"></div></article></div>';




                                      toAdd.appendChild(newScene);

                                      document.getElementById('scenelist').appendChild(toAdd);


                                      var img1 = document.getElementById('scenepic1');

                                      var img2 = document.getElementById('scenepic2');

                                      storageRef.child('scene-pics/' + snapshot.val().movieid + '/'+ snapshot.val().sceneid + '/pic1.png').getDownloadURL().then(function(url) {
                                        img1.src = url;
                                        //console.log('dentro da funcao o pic1 url é ' + pic1);
                                      }).catch(function(error) {
                                        // Handle any errors
                                      });

                                      storageRef.child('scene-pics/' + snapshot.val().movieid + '/'+ snapshot.val().sceneid + '/pic2.png').getDownloadURL().then(function(url) {
                                        img2.src = url;
                                        //console.log('dentro da funcao o pic2 url é ' + pic2);
                                      }).catch(function(error) {
                                        // Handle any errors
                                      });

                                      //MAPA DO GURGO
                                      var myCenter=new google.maps.LatLng(snapshot.val().lat, snapshot.val().lng);

                                      var marker;

                                      function initialize() {
                                      var mapProp = {
                                        center:myCenter,
                                        zoom:18,
                                        mapTypeId:google.maps.MapTypeId.ROADMAP
                                        };

                                      var map=new google.maps.Map(document.getElementById(snapshot.val().sceneid+'-mapa'), mapProp);

                                      var marker=new google.maps.Marker({
                                        position:myCenter,
                                        animation:google.maps.Animation.BOUNCE
                                        });

                                      marker.setMap(map);
                                      }

                                      initialize();

                    });




        });


    });







  } else {
    // No user is signed in.
    document.getElementById('notloggedmsg').style.display = "inline-block";
    document.getElementById('scenelist').innerHTML = '';
    $('#loginModal').modal('show');
  }
});
