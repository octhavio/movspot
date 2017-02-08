
/*

 */

function addFav(movieid, sceneid){

var user = firebase.auth().currentUser;
//console.log(user.uid);

  if (user) {
    // user is signed in.

    var favData = {
      movieid: movieid,
      sceneid: sceneid,
    };

    var updates = {};
    updates['/favorites/' + user.uid + '/' + movieid+'-'+sceneid] = favData;

    var addLink = document.getElementById(sceneid+'add');
    var delLink = document.getElementById(sceneid+'del');
    //  addLink.preventDefault();
      //      delLink.preventDefault();
    addLink.style.display = "none";
    delLink.style.display = "inline-block";
    console.log('ADICIONADO AO FAVS');
    return firebase.database().ref().update(updates);
  } else {
    // No user is signed in.
    //alert('Você precisa estar logado para acessar essa função.');
    $('#loginModal').modal('show');
    console.log('Usuário não está logado');
  }

}


function delFav(movieid, sceneid){

  var user = firebase.auth().currentUser;
  console.log(user.uid);

  if (user) {
    // user is signed in.

    var fav = firebase.database().ref('/favorites/' + user.uid + '/' + movieid+'-'+sceneid);
    fav.remove();

    var addLink = document.getElementById(sceneid+'add');
    var delLink = document.getElementById(sceneid+'del');
    //addLink.preventDefault();
      //    delLink.preventDefault();
    addLink.style.display = "inline-block";
    delLink.style.display = "none";
    console.log('RETIRADO DO FAVS');

  }

  else {
    // No user is signed in.
    $('#loginModal').modal('show');
    console.log('Usuário não está logado');
  }

}
