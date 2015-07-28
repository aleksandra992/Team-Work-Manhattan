
function gameInstructions(gameInstructionsCounter){

    var paper;

    var  text = "#####";
    if (gameInstructionsCounter === 0) {
        paper = Raphael(550, 450, 400, 100);
        text = 'Think about one card \n and remember it!';
    } else if ((gameInstructionsCounter === 1) || (gameInstructionsCounter === 2) || (gameInstructionsCounter === 3)) {
        paper = Raphael(650, 250, 400, 500);
        text = 'Point at the pot where\n your card is now!';
    } else {
        paper = Raphael(550, 450, 400, 100);
        text = "";
    }



    var hint = paper.text(200, 30, text)
           .attr({
              //font: "30px Courier", 
              font: "30px Helvetica", 
              fill: "#893d3d"
           })
           .animate({
              x: 200,
              y: 50,
              font: "50px",
              fill: "ivory",
              callback: function() {
                hint.animate({
                    fill: "transparent"
                  }, 2000);
                }
              }, 3000);

    //console.log('game instruction counter = '+gameInstructionsCounter);
}