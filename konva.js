function getMousePosition(e) {
  const root = document.documentElement;

  document.addEventListener("mousemove", evt => {
    let x = evt.clientX;
    let y = evt.clientY;

    var width = window.innerWidth;
    var height = window.innerHeight;

    var stage = new Konva.Stage({
      container: "container",
      width: width,
      height: height
    });

    var layer = new Konva.Layer();

    var textpath = new Konva.TextPath({
      x: 120,
      y: 50,

      fill: "#333",
      fontSize: 20,
      fontFamily: "Arial",
      textIndent: x,
      textAlign: "center",
      color: "blue",
      fill: "green",
      indent: 200,
      margin: 200,
      text:
        "All the world's a stage, and all the men and women merely players.",
      data:
        "M " +
        x +
        " 300 Q 550 100 " +
        x +
        " 100 Q " +
        y +
        " 100 " +
        y +
        " 300 Q 200 450 400 450 Q 550 " +
        y +
        " 550 450 550 300 "
    });

    layer.add(textpath);

    // add the layer to the stage
    stage.add(layer);
  });
}

getMousePosition();
