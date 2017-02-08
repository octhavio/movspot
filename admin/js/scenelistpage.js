
var sceneTable = document.getElementById('sceneTable');
  var i = 0;


var dataSet=[];


function delScene(movieid,sceneid){
  var toRemove = firebase.database().ref('/movies/' + movieid + '/scenes/' + sceneid);
  toRemove.remove();
  alert('Cena removido com sucesso!');
  location.reload();
}


firebase.database().ref('movies').on('value', function(snapshot){


  snapshot.forEach(function(item) {

    firebase.database().ref('movies/'+item.key+'/scenes').on('value', function(snapshot){


      snapshot.forEach(function(item) {
              var movieIdString = "'"+item.val().movieid+"'";
              var sceneIdString = "'"+item.key+"'";
              var delLink = '<a href="javascript:void(0)" class="btn btn-xs btn-danger" style="margin:3px;" onclick="delScene('+movieIdString+', '+sceneIdString+')">excluir</a> <a href="http://movspot.com/admin/scene/edit/'+item.val().movieid+'/'+item.key+'" class="btn btn-xs btn-warning" style="margin:3px;">editar</a>';
                  dataSet.push([ item.val().movieid, item.key , item.val().scenetitle, delLink]);
              });

          });

    });






//document.getElementById('total-users').innerHTML = i;

    $('#sceneTable').DataTable( {
      "language": {
          "url": "//cdn.datatables.net/plug-ins/1.10.12/i18n/Portuguese-Brasil.json"
      },
        data: dataSet,
        columns: [
            { title: "Movie ID" },
            { title: "Scene ID" },
            { title: "Scene Title" },
            { title: "Ação" },

        ]
    } );



});
