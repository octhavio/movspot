firebase.auth().onAuthStateChanged(function(user) {

  if(user){

    firebase.database().ref('/admin-users/' + user.uid).once('value').then(function(snapshot) {

console.log(snapshot.val());

      if(snapshot.val() !== null){
        document.getElementById('side-menu').style.display = 'inline-block';
        document.getElementById('page-wrapper').style.display = 'block';
        console.log('admin logado com sucesso');
      }
      else{
        document.getElementById('side-menu').style.display = 'none';
        document.getElementById('page-wrapper').style.display = 'none';
        alert('Você não tem acesso de admin. Entre com uma conta de administrador');
        window.location="http://movspot.com";
      }
  });

  }

  else{

    console.log('Você não tem acesso de admin. Entre com uma conta de administrador');
    alert('Você não tem acesso de admin. Entre com uma conta de administrador');
    window.location="http://movspot.com";

  }



});
