
var movieTable = document.getElementById('movieTable');
  var i = 0;


var dataSet=[];


function delMovie(movieid){
  var toRemove = firebase.database().ref('/movies/' + movieid);
  toRemove.remove();
  alert('Filme removido com sucesso!');
  location.reload();
}




firebase.database().ref('movies').on('value', function(snapshot){


  snapshot.forEach(function(item) {

var movieUriString = "'"+item.val().movieuri+"'";
var delLink = '<a href="javascript:void(0)" class="btn btn-xs btn-danger" style="margin:3px;" onclick="delMovie('+movieUriString+')">excluir</a> <a href="http://movspot.com/admin/movie/edit/'+item.val().movieuri+'" class="btn btn-xs btn-warning" style="margin:3px;">editar</a>';
    dataSet.push([ item.key, item.val().movietitlept, item.val().movietitleen, item.val().movieyear, item.val().moviedirector, item.val().moviegenre, item.val().moviedescription, delLink]);

    });

//document.getElementById('total-users').innerHTML = i;

    $('#movieTable').DataTable( {
      "language": {
          "url": "//cdn.datatables.net/plug-ins/1.10.12/i18n/Portuguese-Brasil.json"
      },
        data: dataSet,
        columns: [
            { title: "ID" },
            { title: "Título PT" },
            { title: "Título EN" },
            { title: "Ano" },
            { title: "Diretor" },
            { title: "Gênero" },
            { title: "Sinopse" },
            { title: "Ação" },

        ]
    } );



});
