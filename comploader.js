$( document ).ready(function(){
  let routeJSON = {};
  let routeArray =[];

  $('#topNav').append(
    "<li class='level1 inactive' style='z-index; 1005'>" +
      "<a href='#' id='sendTbas' class='tabNoArrow'>" +
          "Send data" +
          "<div class='rightCapNoArrow'></div>" +
    "</a>" +
    "</li>"
  );

  $('#sendTbas').click(function(e){
      e.preventDefault();
      sendData();
    });

  function sendData(){
    var even = $(".even");
    var odd = $(".odd");
    for(var i = 0; i < even.length; i++){
      routeArray.push({
        tba: even[i].children[2].innerText,
        city: even[i].children[10].innerText,
        address: even[i].children[12].innerText,
        zipCode: even[i].children[13].innerText,
        route: even[i].children[16].innerText.replace(/\xa0/g, ''),
        status: even[i].children[18].innerText,
        associate: even[i].children[19].innerText.replace(/\xa0/g, ''),
        sortZone: even[i].children[26].innerText,
        link: even[i].children[2].children[0].href
      })
    }

    for(var i = 0; i < odd.length; i++){
      routeArray.push({
        tba: odd[i].children[2].innerText,
        city: odd[i].children[10].innerText,
        address: odd[i].children[12].innerText,
        zipCode: odd[i].children[13].innerText,
        route: odd[i].children[16].innerText.replace(/\xa0/g, ''),
        status: odd[i].children[18].innerText,
        associate: odd[i].children[19].innerText.replace(/\xa0/g, ''),
        sortZone: odd[i].children[26].innerText,
        link: odd[i].children[2].children[0].href
      })
    }

    $.ajax({
      type: "POST",
      url: "http://localhost:9000/api/tbas",
      data: JSON.stringify(routeArray),
      success: function(data){
        console.log(data)
      },
      error: function(data){
        console.log("Please check if server is running....")
      }
    });

  }

  //create button with additonal options
  function optionButton(id, value, color, bgColor, padding){
    var id = id;
    var value = value;
    var color = color;
    var bgColor = bgColor;
    var padding = padding;
    var string;

    string = "<input id='" + id + "' type='button' value='" + value +
    "' style='" +"color: " + color + "; " + "background-color:" + bgColor +
    "; " + "padding: " + padding + "; border-style: solid;'></button>";

    return string;
  };

});
