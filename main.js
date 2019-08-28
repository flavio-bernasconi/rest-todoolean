
var urlApi = "http://157.230.17.132:3002/todos/";


function addItems(){
  var valore = $("#add").val();
  console.log(valore);

  $.ajax({
    url : urlApi,
    method : "POST",
    data : {
      text : valore
    },
    success : function(){
      console.log("aggiunto");
      $(".listItems").empty();
      getData();
    },
    errror : function(){
      console.log("errore");
    }

  })
}

function deleteItem(){
  var questo = $(this);
  var box = questo.parent();
  var identificativo = box.data("id");


  $.ajax({
    url : urlApi + identificativo,
    method : "DELETE",
    success : function(){
      console.log(identificativo," è stato cancellato");
      box.remove();
    },
    error : function(){
      alert("error while deleting an item");
    }
  })


}

$(document).on("click",".delete",deleteItem)

function printItems(list){

  var source = $("#template").html();
  var template = Handlebars.compile(source);

  for (var i = 0; i < list.length; i++) {
    var base = list[i];

    var daInserire = {
      text : base.text,
      id : base.id
    }

    var html = template(daInserire);
    $(".listItems").append(html);

  }//fine ciclo



}


function getData(){
  $.ajax({
    url: urlApi,
    method: "GET",
    success : function(data){
      console.log(data);
      printItems(data);
    },
    errore: function(){
      alert("errore API")
    }

  })
}

function init() {

    getData();

    $("button").click(
      function(){
        addItems();
        var valore = $("#add").val("");

      }
    )



}

$(document).ready(init);
