
var urlApi = "http://157.230.17.132:3002/todos/";


function check(){
  $(document).on("click","input[type=checkbox]",
      function(){

        var cerchio = $(this);

        var box = cerchio.parent();
        var testo = box.find(".evento").text();
        var data = box.find(".day").text();
        var idRadio = box.data("id");

        console.log("radio ",idRadio,testo,data);

        var fatto = "";

        if ($(this).prop("checked")) {
          console.log("SONO c");
          fatto = "checked"

        }
        else {
          console.log("NON lo sono");
          fatto = ""
        }

        $.ajax({
          url : urlApi + idRadio,
          method : "PUT",//put sovra scrive i dati quindi e' necessario prendere i
          //valori del box attuali e rimettterli
          data : {
            text : testo,
            date : data,
            spunta : fatto
          },
          success : function(){
            console.log(idRadio,"spunta aggiunta");

          },
          error : function(){
            alert("error while checking element");
          }
        })




      }
    )
}



function addItems(){
  var valoreTesto = $("#testo").val();
  var valoreData = $("#data").val();

  if (valoreTesto != "" && valoreData != "" ) {
    $.ajax({
      url : urlApi,
      method : "POST",
      data : {
        text : valoreTesto,
        date : valoreData,
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

//template handle dove aggiungere nuovi elementi
function printItems(list){

  var source = $("#template").html();
  var template = Handlebars.compile(source);

  for (var i = 0; i < list.length; i++) {
    var base = list[i];

    var daInserire = {
      text : base.text,
      id : base.id,
      date : base.date,
      check : base.spunta,

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

    check()

}

$(document).ready(init);
