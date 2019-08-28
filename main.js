
var urlApi = "http://157.230.17.132:3002/todos/";


function addItems(){
  var valoreTesto = $("#testo").val();
  var valoreData = $("#data").val();

  if (valoreTesto != "" && valoreData != "" ) {
    $.ajax({
      url : urlApi,
      method : "POST",
      data : {
        text : valoreTesto,
        date : valoreData
      },
      success : function(){
        console.log("aggiunto");
        $(".listItems").empty();
        getData();
        var valoreTesto = $("#testo").val("");

      },
      errror : function(){
        console.log("errore");
      }

    })
  }else {
    console.log("input vuoto");
  }


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
      id : base.id,
      date : base.date
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

      }
    );

    var tastoInvio = $("input");
    $(tastoInvio).keypress(function(e){
        if(e.keyCode == 13)
        {
          addItems();
        }
    });



}

$(document).ready(init);
