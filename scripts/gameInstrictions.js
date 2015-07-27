
function gameInstructions(gameInstructionsCounter){

    var  text = "#####";
    if (gameInstructionsCounter === 0) {
        text = 'Think about one card \n and remember it!';
    } else if ((gameInstructionsCounter === 1) || (gameInstructionsCounter === 2)){
        text = 'Point at the pot where\n your card is now!';
    } else {
        text = "";
    }

    var paper  = Raphael(550, 500, 400, 100);

    var hint = paper.text(200, 30, text)
           .attr({
              //font: "30px Courier", 
              font: "30px Helvetica", 
              fill: "black"})
           .animate({
              x: 200,
              y: 50,
              font: "50px",
              fill: "ivory",
              callback: function() {
                hint.animate({
                    fill: "black"
                  }, 2000);
                }
              }, 3000);

    //console.log('game instruction counter = '+gameInstructionsCounter);
}