


//lets fetch the search terms from the url
    var parser = document.createElement('a');
    parser.href = window.location;
    var searchTerms = parser.href.split("search/").pop().replace('#','');

// now lets treat the string fetched and make it into an array of keywords


function stringTrim(str){
   str = str.toLowerCase();
  str = str.replace(/[á|ã|â|à]/gi, "a");
   str = str.replace(/[é|ê|è]/gi, "e");
   str = str.replace(/[í|ì|î]/gi, "i");
   str = str.replace(/[õ|ò|ó|ô]/gi, "o");
   str = str.replace(/[ú|ù|û]/gi, "u");
   str = str.replace(/[ç]/gi, "c");
   str = str.replace(/[ñ]/gi, "n");
   str = str.replace(/[á|ã|â]/gi, "a");
   str = str.replace(/\+/g,'');
   return str;
}
    var searchString = searchTerms.replace(/\+/g,' ').trim();
     searchString = searchString.toLowerCase();
    searchString = searchString.replace(/[á|ã|â|à]/gi, "a");
     searchString = searchString.replace(/[é|ê|è]/gi, "e");
     searchString = searchString.replace(/[í|ì|î]/gi, "i");
     searchString = searchString.replace(/[õ|ò|ó|ô]/gi, "o");
     searchString = searchString.replace(/[ú|ù|û]/gi, "u");
     searchString = searchString.replace(/[ç]/gi, "c");
     searchString = searchString.replace(/[ñ]/gi, "n");
     searchString = searchString.replace(/[á|ã|â]/gi, "a");
     searchString = searchString.replace(/\+/g,'');


    var noresults = document.getElementById('noresults');

    var searchArray = searchTerms.split('+');

    var searchResultsList = document.getElementById('search-result-list');

//results limits
    var keywordResultNumber = 0;
      var locationResultNumber = 0;
    var maxKeywordResults = 10;
    var maxLocationResults = 10;

//here we connect to the movie DB
firebase.database().ref('movies').on('value', function(snapshot){

//we fetch every movie (i know it sucks, firebase is to blame)
  snapshot.forEach(function(item) {
    var keywords = item.val().keywords;

    var movieTitlePT = item.val().movietitlept;
    var movieTitleEN = item.val().movietitleen;
    var movieDescription = item.val().moviedescription;
    var movieYear = item.val().movieyear;
    var movieDirector = item.val().moviedirector;
    var movieUri = item.val().movieuri;
    var movieGenre = item.val().moviegenre;

      var scenes2 = item.val().scenes;

descLength = movieDescription.length;
movieDescription = movieDescription.substring(0,115);
if(descLength > 115){
  movieDescription = movieDescription + '...';
}

// if no scenes
    if(typeof item.val().scenes === 'undefined'){
      var scenes = [];
    }
    else{
        var scenes = item.val().scenes;
    }


    var stopKeywordsLoop = false;
    var stopLocationLoop = false;



    //SCENE LOCATION SEARCH


          for(a in scenes2){

              var scene = scenes2[a];
              var city = scene.scenecity.trim().toLowerCase();
              var id = scene.sceneid;
              console.log('check search string timmed vs city trimmed');
console.log(searchString);
console.log(city);

city = stringTrim(city);
              if(searchString === city && stopLocationLoop === false ){

                          locationResultNumber++;
                          noresults.style.display = 'none';
                          var sceneNumber = 0;
                          for(var i in scenes) {
                              if (scenes.hasOwnProperty(i)) {
                              sceneNumber++;
                              }
                          }


                          var toAdd = document.createDocumentFragment();
                          var resultItem = document.createElement('article');
                          resultItem.id = movieUri;
                          resultItem.className = 'col-md-4 col-sm-6';


                          resultItem.innerHTML = '<a href="'+ siteurl +'movies/'+ movieUri +' "><div class="card"><div class="image-background-card"><img src="'+ siteurl +'img/place-movie.jpg" id="'+movieUri+'-bg"></div><div class="card-information"><div class=frame><span class="helper"></span><img src="'+ siteurl +'img/placeholder-movie.jpg" id="'+movieUri+'-thumb"></div><center style="padding-bottom:10px; padding-top:10px;"><h4 class="yellow" id="scene-number">'+ sceneNumber +' Cena(s)</h4><h2 class="dark-gray" id="movie-title">'+ movieTitlePT +'</h2></center><p class="subtitle-card" id="movie-description">'+ movieDescription +'</p></div></div></a>';


                          toAdd.appendChild(resultItem);
                          document.getElementById('search-result-list').appendChild(toAdd);

                          stopLocationLoop = true;
                          var moviePicture = document.getElementById(movieUri+'-pic');
                          var movieBackground = document.getElementById(movieUri+'-bg');

                          storageRef.child('movie-thumb/' + movieUri + '/thumb.png').getDownloadURL().then(function(url) {
                          moviePicture.src = url;
                          }).catch(function(error) {
                          // Handle any errors
                          });


                          //fetches the scene background picture
                          if(sceneNumber > 0){

                          firebase.database().ref('movies/' + movieUri + '/scenes').limitToFirst(1).on('value', function(snapshot){

                          snapshot.forEach(function(item) {

                          var sceneid = item.val().sceneid;
                          storageRef.child('scene-pics/' + movieUri + '/'+ sceneid + '/pic1.png').getDownloadURL().then(function(url) {
                           movieBackground.src = url;
                          }).catch(function(error) {
                           // Handle any errors
                          });

                          });

                          });
                          }



              }


          }

//KEYWORDS SEARCH
      keywords.forEach(function(item) {

          if( $.inArray(item, searchArray) > -1 && stopKeywordsLoop === false && keywordResultNumber < maxKeywordResults){
keywordResultNumber++;
noresults.style.display = 'none';
            var sceneNumber = 0;
                for(var i in scenes) {
                    if (scenes.hasOwnProperty(i)) {
                      sceneNumber++;
                    }
                }


                var toAdd = document.createDocumentFragment();
                 var resultItem = document.createElement('article');
                 resultItem.id = movieUri;
                 resultItem.className = 'col-md-4 col-sm-6';
              //   resultItem.innerHTML = '<div>'+ movieTitlePT +'</div>';

                   resultItem.innerHTML = '<a href="'+ siteurl +'movies/'+ movieUri +' "><div class="card"><div class="image-background-card"><img src="'+ siteurl +'img/place-movie.jpg" id="movie-background"></div><div class="card-information"><div class=frame><span class="helper"></span><img src="'+ siteurl +'img/placeholder-movie.jpg" id="movie-picture"></div><center style="padding-bottom:10px; padding-top:10px;"><h4 class="yellow" id="scene-number">'+ sceneNumber +' Cena(s)</h4><h2 class="dark-gray" id="movie-title">'+ movieTitlePT +'</h2></center><p class="subtitle-card" id="movie-description">'+ movieDescription +'</p></div></div></a>';

                 toAdd.appendChild(resultItem);
                 document.getElementById('search-result-list').appendChild(toAdd);

                 stopKeywordsLoop = true;
                 var moviePicture = document.getElementById('movie-picture');
                 var movieBackground = document.getElementById('movie-background');

                 storageRef.child('movie-thumb/' + movieUri + '/thumb.png').getDownloadURL().then(function(url) {
                   moviePicture.src = url;
                 }).catch(function(error) {
                   // Handle any errors
                 });


                        //fetches the scene background picture
                    if(sceneNumber > 0){

                      firebase.database().ref('movies/' + movieUri + '/scenes').limitToFirst(1).on('value', function(snapshot){

                        snapshot.forEach(function(item) {

                                var sceneid = item.val().sceneid;
                                storageRef.child('scene-pics/' + movieUri + '/'+ sceneid + '/pic1.png').getDownloadURL().then(function(url) {
                                   movieBackground.src = url;
                                 }).catch(function(error) {
                                   // Handle any errors
                                 });

                        });

                      });
                    }



          }
        });


  });



});
