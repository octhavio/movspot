
    var city1Picture = document.getElementById('city1-picture');
    var city1 = document.getElementById('city1-text');
    var city2Picture = document.getElementById('city2-picture');
    var city2 = document.getElementById('city2-text');
    var city3Picture = document.getElementById('city3-picture');
    var city3 = document.getElementById('city3-text');
        var city1Link = document.getElementById('city1-link');
          var city2Link = document.getElementById('city2-link');
            var city3Link = document.getElementById('city3-link');

    // featured movies
    var movie1Picture = document.getElementById('movie1-picture');
    var movie2Picture = document.getElementById('movie2-picture');
    var movie3Picture = document.getElementById('movie3-picture');
    var movie4Picture = document.getElementById('movie4-picture');
    var movie5Picture = document.getElementById('movie5-picture');
    var movie6Picture = document.getElementById('movie6-picture');
    var movie7Picture = document.getElementById('movie7-picture');
    var movie8Picture = document.getElementById('movie8-picture');
    var movie9Picture = document.getElementById('movie9-picture');
    var movie10Picture = document.getElementById('movie10-picture');
    var movie11Picture = document.getElementById('movie11-picture');
    var movie12Picture = document.getElementById('movie12-picture');


    var movie1Link = document.getElementById('movie1-link');
    var movie2Link = document.getElementById('movie2-link');
    var movie3Link = document.getElementById('movie3-link');
    var movie4Link = document.getElementById('movie4-link');
    var movie5Link = document.getElementById('movie5-link');
    var movie6Link = document.getElementById('movie6-link');
    var movie7Link = document.getElementById('movie7-link');
    var movie8Link = document.getElementById('movie8-link');
    var movie9Link = document.getElementById('movie9-link');
    var movie10Link = document.getElementById('movie10-link');
    var movie11Link = document.getElementById('movie11-link');
    var movie12Link = document.getElementById('movie12-link');

    firebase.database().ref('home/').on('value', function(snapshot){

    city1.innerHTML = '';
    city2.innerHTML = '';
    city3.innerHTML = '';


    city1Link.href = cleanSearchTerms(snapshot.val().city1);
    city2Link.href = cleanSearchTerms(snapshot.val().city2);
    city3Link.href = cleanSearchTerms(snapshot.val().city3);
    city1.innerHTML = snapshot.val().city1;
    city2.innerHTML = snapshot.val().city2;
    city3.innerHTML = snapshot.val().city3;

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


    fetchStaticImage(city1Picture,'home/city1.png');
    fetchStaticImage(city2Picture,'home/city2.png');
    fetchStaticImage(city3Picture,'home/city3.png');

    /*
    storageRef.child('home/city1.png').getDownloadURL().then(function(url) {
      city1Picture.src = url;
    }).catch(function(error) {
      // Handle any errors
    });
*/


  //movie CODE
  function homeFeatureMovie(movieid, picture, link){

      var path = 'movie-thumb/'+movieid+'/thumb.png';
      fetchStaticImage(picture,path);
      link.href = siteurl+'movies/'+movieid;

  }
  homeFeatureMovie(snapshot.val().movie1id, movie1Picture, movie1Link);
  homeFeatureMovie(snapshot.val().movie2id, movie2Picture, movie2Link);
  homeFeatureMovie(snapshot.val().movie3id, movie3Picture, movie3Link);
  homeFeatureMovie(snapshot.val().movie4id, movie4Picture, movie4Link);
  homeFeatureMovie(snapshot.val().movie5id, movie5Picture, movie5Link);
  homeFeatureMovie(snapshot.val().movie6id, movie6Picture, movie6Link);
  homeFeatureMovie(snapshot.val().movie7id, movie7Picture, movie7Link);
  homeFeatureMovie(snapshot.val().movie8id, movie8Picture, movie8Link);
  homeFeatureMovie(snapshot.val().movie9id, movie9Picture, movie9Link);
  homeFeatureMovie(snapshot.val().movie10id, movie10Picture, movie10Link);
  homeFeatureMovie(snapshot.val().movie11id, movie11Picture, movie11Link);
  homeFeatureMovie(snapshot.val().movie12id, movie12Picture, movie12Link);

    });
