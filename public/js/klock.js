function startTime() {
  var today = new Date();
  var h = today.getHours();
  var m = today.getMinutes();
  var s = today.getSeconds();
  // add a zero in front of numbers<10
  m = checkTime(m);
  s = checkTime(s);
  document.getElementById("time").innerHTML =
    `<p id="timeText">` + h + ":" + m + ":" + s + `</p>`;
  t = setTimeout(function() {
    startTime();
  }, 500);
  var time = document.getElementById("time");

  sec = s;

  let timeText = document.getElementById("timeText");

  if (m % 2 == 0) {
    timeText.style = "transform: rotate( 180deg)";
  } else {
    timeText.style = "transform: rotate( 0deg)";
  }
  time.style =
    "transform: rotate( " +
    sec * 3 +
    "deg); transform-origin: center center ;;";
}

startTime();
