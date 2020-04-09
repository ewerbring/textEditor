let toggleCounter = 0;

function toggleMain() {
  let buttonText = document.getElementById("toggleButton");
  toggleCounter += 1;
  if (toggleCounter % 2 === 0) {
    $("#mainCont").css("opacity", "1");
    $("#typingCont").hide();
    $("#mainCont").css("pointer-events", "");

    $(".paraClass").hide();
    buttonText.innerHTML = "Type text";
  } else {
    $("#mainCont").css("opacity", "0.35");
    $("#mainCont").css("pointer-events", "none");
    $("#typingCont").show();

    $(".paraClass").show();
    buttonText.innerHTML = "Collage inspiration";
  }
}

function lowerOpacity() {
  console.log("hejj");
}

/// first just inspiration
/// then you can generate your own text
