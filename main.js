let count = 0;
let layer = 0;
function sendText() {
  count += 1;

  if (count > 0) {
    let link = document.getElementById("userInput").value;

    var div = document.createElement("div");
    div.setAttribute("id", "id" + count + "");
    var opacity = document.getElementById("opacityInput").value;
    var layer = document.getElementById("layerInput").value;
    var color = document.getElementById("colorInput").value;
    var width = document.getElementById("widthInput").value;
    var height = document.getElementById("heightInput").value;

    var iframe = document.createElement("iframe");

    if (link.startsWith("http")) {
      iframe.src = link;
    } else if (link.startsWith("www")) {
      iframe.src = "http://" + link;
    } else iframe.src = "https://thecreativeindependent.com/random";
    iframe.style =
      "position:relative; width: 98%; height:100%; opacity: " +
      opacity +
      "; z-index:5;";
    div.style =
      "left:400px;background-color: white;border:7px solid #f95006 ; width: " +
      width +
      "px; height: " +
      height +
      "px; display: inline-block; ";
    document.getElementById("mainCont").appendChild(div);
    document.getElementById("id" + count + "").appendChild(iframe);
    // console.log("iframe.contentWindow =", iframe.contentWindow);
    console.log(color);
    $("#id" + count).resizable();
    $("#id" + count).draggable();
  }
}

function sendPara() {
  let count = 0;
  count += 1;
  var para = document.createElement("p");
  var paraClass = document.getElementById("layerInput").value;
  var width2 = document.getElementById("width2Input").value;
  var fontSize = document.getElementById("fontInput").value;

  para.setAttribute("class", "paraClass");
  var text = document.getElementById("paraInput").value;
  document.getElementById("paraInput").value = "";
  para.innerHTML = text;
  para.style =
    "position:absolute; left: 200px ; top: 100px; width: " +
    width2 +
    "px; font-size: " +
    fontSize +
    "px;";
  document.getElementById("writingCont").appendChild(para);
  $(".paraClass").draggable();
}

function sendGptPara() {
  console.log("hello");
  var gptPara = document.createElement("p");
  var width3 = document.getElementById("width3Input").value;
  var fontSize2 = document.getElementById("gptFontInput").value;

  gptPara.setAttribute("class", "paraClass2");
  var gptText = document.getElementById("gptParaInput").value;
  gptPara.innerHTML = gptText;
  gptPara.style =
    "position:absolute; left: 200px ; top: 100px; width: " +
    width3 +
    "px; font-size: " +
    fontSize2 +
    "px;";
  document.getElementById("mainCont").appendChild(gptPara);
  $(".paraClass2").draggable();
}

function checkTime(i) {
  if (i < 10) {
    i = "0" + i;
  }
  return i;
}

// var seconds = 0;

// function incrementSeconds() {
//   seconds += 1;
//   var time = document.getElementById("time");
//   time.style =
//     "transform: rotate( " + seconds + "deg); transform-origin: center center;;";
// }
// setInterval(incrementSeconds, 1000);
// $("#search").draggable();

let toggleCount = 1;
let about = document.getElementById("aboutBox");
let aboutButton = document.getElementById("aboutButton");
about.style = "display: none;";
function toggleAbout() {
  console.log("gekk");

  toggleCount += 1;
  console.log(toggleCount);
  console.log(about);
  if (toggleCount % 2 == 0) {
    aboutButton.innerHTML = "About - Close";
    about.style = "display: ;";
  } else {
    about.style = `display:none;`;
    aboutButton.innerHTML = "About";
  }
}
