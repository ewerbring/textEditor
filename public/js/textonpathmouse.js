function getMousePosition(e) {
  const root = document.documentElement;

  document.addEventListener("mousemove", evt => {
    let x = evt.clientX;
    let y = evt.clientY;

    function newTextPath() {
      const textPath = document.querySelector("#text-path");
      const path = document.querySelector("#curve");

      path.setAttribute(
        "d",
        "M 200 0 Q 200 250 200 350 Q 200 450 400 450 Q 500 450 500 250 C 500 100 50 0 50 300 Q 50 550 450 550 Q 700 550 700 50 "
      );
      textPath.setAttribute("startOffset", -(y + x - 100));
    }

    newTextPath();
  });
}

getMousePosition();

function checkTime(i) {
  if (i < 10) {
    i = "0" + i;
  }
  return i;
}

function startTime() {
  var today = new Date();

  var min = today.getMinutes();
  var secu = today.getSeconds();
  // add a zero in front of numbers<10
  m = checkTime(min);
  s = checkTime(secu);

  sec = s;
  console.log(sec, min);
}

startTime();
