

var dataSet1=[];
var adminDataSet=[];

function delUser(uid){
  var toRemove = firebase.database().ref('/users/' + uid);
  toRemove.remove();

  var toRemove2 = firebase.database().ref('/admin-users/' + uid);
  toRemove2.remove();

  alert('Usuário removido com sucesso!');
  location.reload();
}

function makeAdmin(uid, email) {
  // A post entry.
  firebase.database().ref('admin-users/' + uid).set({
    uid: uid,
    email: email,
  });
    alert('Administrador adicionado com sucesso!');
      location.reload();
}
function removeAdmin(uid) {
  // A post entry.
  var toRemove = firebase.database().ref('/admin-users/' + uid);
  toRemove.remove();
  alert('Administrador removido com sucesso!');
  location.reload();
}





firebase.database().ref('users').on('value', function(snapshot){


  snapshot.forEach(function(item) {


var profPic = '<img src="'+item.val().profile_picture+'" width="20">';

var uidString = "'"+item.key+"'";
var emailString = "'"+item.val().email+"'";


//var movieUriString = "'"+item.val().movieuri+"'";
var delLink = '<a href="javascript:void(0)" class="btn btn-danger btn-xs" style="margin:5px;" onclick="delUser('+uidString+')">excluir usuário</a>';
var makeAdmin = '<a href="javascript:void(0)" class="btn btn-warning btn-xs" style="margin:5px;" onclick="makeAdmin('+uidString+', '+emailString+')">adicionar admin</a>';
//var removeAdmin = '<a href="javascript:void(0)" class="btn btn-info btn-xs" style="margin:5px;" onclick="removeAdmin('+uidString+')">remover admin</a>';

var links = delLink + makeAdmin;



    dataSet1.push([ profPic, item.val().email, item.val().username, /*item.val().type,*/ item.key, links]);

    });

//document.getElementById('total-users').innerHTML = i;
//$.fn.dataTableExt.sErrMode = 'throw';
    $('#userTable').DataTable( {
      "language": {
          "url": "//cdn.datatables.net/plug-ins/1.10.12/i18n/Portuguese-Brasil.json"
      },
        data: dataSet1,
        columns: [
          { title: "Foto" },

            { title: "Email" },
            { title: "Name" },
            //{ title: "Tipo" },
            { title: "ID" },
            { title: "Ação" },

        ]
    } );



});







firebase.database().ref('admin-users').on('value', function(snapshot){


  snapshot.forEach(function(item) {



      var uidString = "'"+item.key+"'";
      var emailString = "'"+item.val().email+"'";



//var delLink = '<a href="javascript:void(0)" class="btn btn-danger btn-xs" style="margin:5px;" onclick="delUser('+uidString+')">excluir usuário</a>';
//var makeAdmin = '<a href="javascript:void(0)" class="btn btn-warning btn-xs" style="margin:5px;" onclick="makeAdmin('+uidString+', '+emailString+')">adicionar admin</a>';
var removeAdmin = '<a href="javascript:void(0)" class="btn btn-info btn-xs" style="margin:5px;" onclick="removeAdmin('+uidString+')">remover admin</a>';

var links = removeAdmin;


    adminDataSet.push([ item.val().email, item.key, links]);

    });

//document.getElementById('total-users').innerHTML = i;
//$.fn.dataTableExt.sErrMode = 'throw';
    $('#adminTable').DataTable( {
      "language": {
          "url": "//cdn.datatables.net/plug-ins/1.10.12/i18n/Portuguese-Brasil.json"
      },
        data: adminDataSet,
        columns: [
            { title: "Email" },
            { title: "ID" },
            { title: "Ação" },

        ]
    } );




});
