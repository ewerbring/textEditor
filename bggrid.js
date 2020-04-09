function createGrid() {
  let i;
  for (i = 0; i < 100; i++) {
    var horisontal = document.createElement("div");
    var vertical = document.createElement("div");

    horisontal.setAttribute("class", "horisontalLine");
    vertical.setAttribute("class", "verticalLine");

    document.getElementById("bgGridHori").appendChild(horisontal);
    document.getElementById("bgGridVerti").appendChild(vertical);
    console.log("hello");
  }
}

createGrid();
