

    var parser = document.createElement('a');
    parser.href = window.location;

    var movieuri = parser.href.split("movies/").pop();
    movieuri=movieuri.replace('#','');

    console.log('this is the movie uri ~~~> ' + movieuri);

    var movieTitlePT = document.getElementById('movie-title-pt');
    var movieTitleEN = document.getElementById('movie-title-en');
    var movieGenre = document.getElementById('movie-genre');
    var movieYear = document.getElementById('movie-year');
    var movieDirector = document.getElementById('movie-director');
    var movieDescription = document.getElementById('movie-description');
    var moviePicture = document.getElementById('movie-picture');

    firebase.database().ref('movies/' + movieuri).on('value', function(snapshot){

    movieTitlePT.innerHTML = '';
    movieTitleEN.innerHTML = '';
    movieGenre.innerHTML = '';
    movieYear.innerHTML = '';
    movieDirector.innerHTML = '';
    movieDescription.innerHTML = '';
    //moviePicture.src = '';

    movieTitlePT.innerHTML = snapshot.val().movietitlept;
    movieTitleEN.innerHTML = snapshot.val().movietitleen;
    movieGenre.innerHTML = snapshot.val().moviegenre;
    movieYear.innerHTML = snapshot.val().movieyear;
    movieDirector.innerHTML = snapshot.val().moviedirector;
    movieDescription.innerHTML = snapshot.val().moviedescription;

    //console.log('TITULO EM PT '+movieTitlePT.innerHTML);


    //document.getElementById("movie-picture").src= 'https://www.goodi.com.br/img/logo_144_90.png'

    storageRef.child('movie-thumb/' + movieuri + '/thumb.png').getDownloadURL().then(function(url) {
      moviePicture.src = url;
    }).catch(function(error) {
      // Handle any errors
    });


    });

      /*

      *********************************************

      ******* ----  SCENE RELATED CODE ----  ******

      *********************************************

      */



firebase.database().ref('movies/' + movieuri + '/scenes').on('value', function(snapshot){

  snapshot.forEach(function(item) {

      var sceneid = item.val().sceneid;

      //check if fav

      var isFav = false;

      //if($.inArray(sceneid, favs) > -1){

      function getFavs(){
        var addLink = document.getElementById(sceneid+'add');
        var delLink = document.getElementById(sceneid+'del');

        var favs = [];

        var user = firebase.auth().currentUser;
        //console.log(user.uid);
        firebase.database().ref('favorites/'+user.uid).on('value', function(snapshot){
            snapshot.forEach(function(item) {
              //console.log(item.val().sceneid);
              favs.push(item.val().sceneid);
              console.log(favs);
            });
            console.log(sceneid);

            console.log(favs[0]);

          //  if($.inArray(sceneid, favs)){
          if(favs.indexOf(sceneid)>-1){
              isFav = true;
                console.log(sceneid + 'is INDEED fav');
                addLink.style.display = "none";
                delLink.style.display = "inline-block";
            }

            else{
              isFav = false;
                console.log(sceneid + 'is not fav');
                addLink.style.display = "inline-block";
                delLink.style.display = "none";
            }

        });

      }


      var toAdd = document.createDocumentFragment();

      var address = item.val().scenestreet+' '+item.val().scenenumber+' - '+item.val().scenecity+' - '+item.val().scenestate+' - '+item.val().scenecountry;

      var newScene = document.createElement('div');

      newScene.id = item.val().sceneid;

      newScene.className = 'col-sm-12';

      var test1 = "'"+movieuri+"'";

      var test2 = "'"+item.val().sceneid+"'";


      newScene.innerHTML = '<div class="col-sm-12"><div class="block"><h2>'+ item.val().scenetitle +'</h2><h2 class="address">'+ address +'</h2><a href="javaScript:void(0);" class="favorite" id="'+item.val().sceneid+'add" onclick="addFav('+ test1 +', '+ test2 +');" movieid="'+movieuri+'" sceneid="'+item.val().sceneid+'">adicionar aos favoritos  <span class="glyphicon glyphicon-star" aria-hidden="true"></span></a><a href="javaScript:void(0);" class="favorite-remove" class="favorite-remove" id="'+item.val().sceneid+'del"  onclick="delFav('+ test1 +', '+ test2 +');" style="display:none" movieid="'+movieuri+'" sceneid="'+item.val().sceneid+'">remover dos favoritos  <span class="glyphicon glyphicon-remove" aria-hidden="true"></span></a><p>'+ item.val().scenedescription +'</p><div class="image-post" id="'+item.val().sceneid+'-mapa"></div></div><article class="col-md-6 col-sm-6 col-xs-12" id="card1"><div class="movie-scene-container"><img class="layer" id="scenepic1"  src="http://movspot.com/img/scene-movie.jpg"></div></article><article class="col-md-6 col-sm-6 col-xs-12" id="card1"><div class="movie-scene-container"><img class="layer" id="scenepic2"  src="http://movspot.com/img/scene-movie.jpg"></div></article></div>';


      toAdd.appendChild(newScene);

      console.log('ABAIXO O HTML DA CENA ');

      console.log(newScene.innerHTML);

      document.getElementById('scenelist').appendChild(toAdd);

      getFavs()

      var img1 = document.getElementById('scenepic1');

      var img2 = document.getElementById('scenepic2');

      storageRef.child('scene-pics/' + movieuri + '/'+ sceneid + '/pic1.png').getDownloadURL().then(function(url) {
        img1.src = url;
        //console.log('dentro da funcao o pic1 url é ' + pic1);
      }).catch(function(error) {
        // Handle any errors
      });

      storageRef.child('scene-pics/' + movieuri + '/'+ sceneid + '/pic2.png').getDownloadURL().then(function(url) {
        img2.src = url;
        //console.log('dentro da funcao o pic2 url é ' + pic2);
      }).catch(function(error) {
        // Handle any errors
      });

      //MAPA DO GURGO
      var myCenter=new google.maps.LatLng(item.val().lat, item.val().lng);

      var marker;

      function initialize() {
      var mapProp = {
        center:myCenter,
        zoom:18,
        mapTypeId:google.maps.MapTypeId.ROADMAP
        };

      var map=new google.maps.Map(document.getElementById(item.val().sceneid+'-mapa'), mapProp);

      var marker=new google.maps.Marker({
        position:myCenter,
        animation:google.maps.Animation.BOUNCE
        });

      marker.setMap(map);
      }

      initialize();

  });



});


/*  ********************************************

*******   ----  GOOGLE MAPS  ----  *****

*********************************************/
