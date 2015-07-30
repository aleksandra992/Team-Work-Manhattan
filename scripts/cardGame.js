var Game = (function () {

    var deck=Object.create(Deck).init('Manhattan');


       var magicValue,
        selectedButton = null,
        potTurns,
        magicValueIsCorrect,
        areShuffled,
        buttonClickCount = 0,
        cardDeck = deck.fillDeckWithCards(),
        threePots = ThreePots.getThreePots(cardDeck, deck),
        currentPotTurns,
        gameInstructionsCounter = 0,
        currentMixedPots = {
            firstPot: [],
            secondPot: [],
            thirdPot: []
        },
        currentThreePots = {
            firstPot: threePots.firstPot,
            secondPot: threePots.secondPot,
            thirdPot: threePots.thirdPot
        },
        cardCanvas = document.getElementById("cardCanvas"),
        context = cardCanvas.getContext("2d"),
        wrapper = document.getElementById('wrapper'),
        redirectionToTheAnswer = new CustomEvent("theAnswer");

    function checkMagicValue(magicValue) {
        if (magicValue < MAGIC_VALUE.MIN || magicValue > MAGIC_VALUE.MAX
            || isNaN(magicValue) || magicValue === null || magicValue % 1 !== 0) {
            alert.render('Magic value should be a number between 1 and 27');
            return false;
        } else {
            return true;
        }
    }

    function howToPlay() {
        var msg = 'HOW TO PLAY:' +
            "<br>" +
            "<br>" + 'Enter a number within 1 - 27' +
            "<br>" + 'Pick a card from the deck' +
            "<br>" + 'Choose the pot with your card (3x)';
        alert.render(msg);
    }



    var alert = new CustomAlert();


    function drawText(currentCard, context) {
        context.clearRect(0, 0, context.canvas.width, context.canvas.height);
        context.fillStyle = 'black';
        context.font = "1.1em Consolas";
        context.fillText(currentCard.toString(), 20, 240);
    }

    wrapper.addEventListener("theAnswer", function () {
        context.clearRect(0, 0, cardCanvas.width, cardCanvas.height);
        $("#btnChoosePot1").remove();
        $("#btnChoosePot2").remove();
        $("#btnChoosePot3").remove();

        var pot = currentThreePots.firstPot,
            i;
        for (i = 0; i < NUMBER_OF_CARDS.POT; i += 1) {
            pot.push(currentThreePots.secondPot[i]);
        }
        for (i = 0; i < NUMBER_OF_CARDS.POT; i += 1) {
            pot.push(currentThreePots.thirdPot[i]);
        }
        var potToDraw = pot.slice();

        var giveFinalCards = setInterval(function () {
            finalCardsTimer();
        }, TIMERS.GIVE_FINAL_CARDS_MS);
        i = 0;

        function finalCardsTimer() {
            if (i === magicValue - 1) {

                potToDraw[i].drawCard( context, CARD_POS.MAGIC_DECK_START_X + i * CARD_POS.MAGIC_DECK_SPACING, CARD_POS.MAGIC_DECK_Y, CARD_DIM.WIDTH, CARD_DIM.HEIGHT);
            } else {
                Card.drawCardBack(context, CARD_POS.MAGIC_DECK_START_X + i * CARD_POS.MAGIC_DECK_SPACING, CARD_POS.MAGIC_DECK_Y, CARD_DIM.WIDTH, CARD_DIM.HEIGHT);
            }
            i++;
            if (i === NUMBER_OF_CARDS.DECK) {
                clearInterval(giveFinalCards);
            }
        }

        var turnTheCards = setTimeout(function () {
           // turnCards();
        }, TIMERS.GIVE_FINAL_CARDS_MS * NUMBER_OF_CARDS.DECK + TIMERS.WAIT_BEFORE_TURN_CARDS_MS);
        var k = 0;

      /*  function turnCards() {

            var getTurnedCards = setInterval(function () {
                turnCardsTimer();
            }, TIMERS.TURN_CARDS_MS);

            function turnCardsTimer() {

                console.log(potToDraw[k]);
                throw Error();
                potToDraw[k].drawCard(context, CARD_POS.MAGIC_DECK_START_X + k * CARD_POS.MAGIC_DECK_SPACING, CARD_POS.MAGIC_DECK_Y, CARD_DIM.WIDTH, CARD_DIM.HEIGHT);

                k++;

                if (k === NUMBER_OF_CARDS.DECK) {
                    clearInterval(turnTheCards);
                }
            }
        }
        */

        var magicCard = setTimeout(function () {
            magicCardTimer();
        }, TIMERS.GIVE_FINAL_CARDS_MS * NUMBER_OF_CARDS.DECK + TIMERS.WAIT_BEFORE_ZOOM_MAGIC_CARD_MS);
        var j = 0;

        function magicCardTimer() {

            var zoomedMagiCard = setInterval(function () {
                magicCardZoomTimer();
            }, TIMERS.ZOOM_MAGIC_CARD_MS);

            function magicCardZoomTimer() {

                potToDraw[magicValue - 1].drawCard( context, CARD_POS.MAGIC_DECK_START_X + (magicValue - 1) * CARD_POS.MAGIC_DECK_SPACING, CARD_POS.MAGIC_DECK_Y, CARD_DIM.WIDTH + j, CARD_DIM.HEIGHT + (j * 1.33));
                j++;
                if (j === 78) {
                    clearInterval(zoomedMagiCard);
                }
            }
        }

        var magicCardRotate = setTimeout(function () {
            potToDraw[magicValue - 1].rotateMagicCard(context, CARD_POS.MAGIC_DECK_START_X + (magicValue - 1) * CARD_POS.MAGIC_DECK_SPACING, CARD_POS.ROTATED_CARD_Y,
                150, 96 + 200);
        }, (TIMERS.GIVE_FINAL_CARDS_MS * NUMBER_OF_CARDS.DECK) + TIMERS.WAIT_BEFORE_ROTATE_MAGIC_CARD_MS + (TIMERS.ZOOM_MAGIC_CARD_MS * 78));
    }, false);

    $(document).ready(function () {
        $('#cardCanvas').css('display', 'none');
        $('#border-motion').css('display', 'block');
        $('#numberContainer').slideDown(500);
        $('.formBox').slideDown(4000);
        $('#play-btn').on("click", function () {
            $('#cardCanvas').css('display', 'none');
            var container = document.querySelector('#numberContainer');
            $('#svgAnimationID').css('display', 'none');
            container.style.display = 'none';
            $('#pickInputNumber').css('display', 'block');
            $('#submit-btn').css('display', 'block');
        });
        $('#how-to-play-btn').on("click", function () {
            howToPlay();
        });
        $('#submit-btn').on("click", function () {
            $('#border-motion').css('display', 'block');
            $('#submit-btn').css('display', 'block');
            magicValueIsCorrect = checkMagicValue(magicValue);
            if (magicValueIsCorrect) {
                $("#btnDrawCard").trigger("click");
            }
        });
        $('#start-over-btn').on("click", function () {
            document.location.reload(true);
        });
        $("#pickInputNumber").on("keyup", function () {
            magicValue = $('#input:text').val();
            potTurns = ThreePots.potDealer(magicValue);
            currentPotTurns = potTurns.split(' ');
        });
        $("#btnDrawCard").on("click", function () {
            $('#border-motion').css('display', 'none');
            $('#cardCanvas').css('display', 'block');
            $(this).prop('disabled', true);
            $('#btnDrawPots').css('display', 'block');
            $("#btnDrawPots").prop('disabled', false);
            $('#svgAnimationID').css('display', 'none');
            $('#submit-btn').css('display', 'none');
            $('#pickInputNumber').css('display', 'none');
            var container = document.querySelector('#numberContainer');
            container.style.display = 'none';
            var currentCardDeck = cardDeck.slice();
            var currentCard = {};

            gameInstructions(gameInstructionsCounter);
            gameInstructionsCounter++;

            var giveCards = setInterval(function () {
                cardsTimer();
            }, TIMERS.GIVE_CARDS_MS);
            var deckIndex = 0;

            function cardsTimer() {
                currentCard = deck.getRandomCard(currentCardDeck);
                currentCard.drawCard( context, CARD_POS.MAIN_DECK_START_X + deckIndex * CARD_POS.MAIN_DECK_SPACING, CARD_POS.MAIN_DECK_Y, CARD_DIM.WIDTH, CARD_DIM.HEIGHT);
                currentCardDeck = deck.deleteDrawedCard(currentCardDeck, currentCard);
                deckIndex++;
                if (deckIndex === NUMBER_OF_CARDS.DECK) {
                    clearInterval(giveCards);
                }
            }
        });

        $("#btnDrawPots").on("click", function () {
            gameInstructions(gameInstructionsCounter);
            gameInstructionsCounter++;
            $('#pickInputNumber').css('display', 'none');
            $('#submit-btn').css('display', 'none');
            $('#btnDrawPots').css('display', 'none');
            context.clearRect(0, 0, cardCanvas.width, cardCanvas.height);
            ThreePots.dealThreePots(threePots, context);
            $('#canvasContainer').append('<input type="button" class="invisible-button" id="btnChoosePot1" value="1">');
            $('#canvasContainer').append('<input type="button" class="invisible-button" id="btnChoosePot2" value="2">');
            $('#canvasContainer').append('<input type="button" class="invisible-button" id="btnChoosePot3" value="3">');

            if (currentPotTurns === undefined) {
                currentPotTurns = ['TOP', 'TOP', 'TOP'];
            }

            var buttonChoosePot1 = document.getElementById("btnChoosePot1");
            var buttonChoosePot2 = document.getElementById("btnChoosePot2");
            var buttonChoosePot3 = document.getElementById("btnChoosePot3");

            buttonChoosePot1.addEventListener('click', function () {

                ThreePots.PutFirstOnPlace(buttonClickCount, currentPotTurns, currentThreePots, threePots);

                if (buttonClickCount < 2) {
                    ThreePots.shuffleCards(currentThreePots, threePots);
                }

                buttonClickCount++;

                if (buttonClickCount === 3) {
                    wrapper.dispatchEvent(redirectionToTheAnswer);
                }
                else {
                    context.clearRect(0, 0, cardCanvas.width, cardCanvas.height);
                    ThreePots.dealThreePots(currentThreePots, context);
                }
            }, false);

            buttonChoosePot2.addEventListener('click', function () {

                ThreePots.PutSecondOnPlace(buttonClickCount, currentPotTurns, currentThreePots, threePots);

                if (buttonClickCount < 2) {
                    ThreePots.shuffleCards(currentThreePots, threePots);
                }

                buttonClickCount++;

                if (buttonClickCount === 3) {
                    wrapper.dispatchEvent(redirectionToTheAnswer);
                }
                else {
                    context.clearRect(0, 0, cardCanvas.width, cardCanvas.height);
                    ThreePots.dealThreePots(currentThreePots, context);
                }
            }, false);

            buttonChoosePot3.addEventListener('click', function () {

                ThreePots.PutThirdOnPlace(buttonClickCount, currentPotTurns, currentThreePots, threePots);

                if (buttonClickCount < 2) {
                    ThreePots.shuffleCards(currentThreePots, threePots);
                }

                buttonClickCount++;

                if (buttonClickCount === 3) {
                    wrapper.dispatchEvent(redirectionToTheAnswer);
                }
                else {
                    context.clearRect(0, 0, cardCanvas.width, cardCanvas.height);
                    ThreePots.dealThreePots(currentThreePots, context);
                }
            }, false);

        });
    });
    var Game = {
        init: function () {
            return this;
        },
        createInputPage: function (selector) {
            var container = document.querySelector(selector);
            container.style.font = "24px Consolas";
            container.style.width = '1000px';
            container.style.height = '500px';
            container.style.display = 'none';
            container.style.marginLeft = '30px';

            var infoBox = document.createElement('div');
            var playButton = document.createElement('button');

            infoBox.style.font = 'Times New Roman';
            infoBox.style.position = 'relative';
            infoBox.style.margin = '100px';
            infoBox.style.fontSize = '15px';
            infoBox.style.color = "white";
            infoBox.style.width = '400px';
            infoBox.style.height = '200px';
            infoBox.style.float = 'left';
            infoBox.style.display = 'inline-block';
            infoBox.innerHTML = '';
            infoBox.innerHTML = 'HOW TO PLAY';
            infoBox.innerHTML += '<ol><li>Click on the red button below</li><li>Enter a number within 1 - 27</li><li>Pick a card from the deck</li><li>Choose the pot with your card (3x)</li></ol>';

            playButton.setAttribute('id', 'play-btn');
            playButton.style.position = 'relative';
            playButton.style.border = 'none';
            playButton.style.top = '20px';
            playButton.style.display = 'inline-block';
            playButton.style.width = '100px';
            playButton.style.height = '100px';
            playButton.style.background = 'url(Images/play-btn.png)';

            infoBox.appendChild(playButton);
            container.appendChild(infoBox);

            function enterNumber() {

                var btn1 = document.getElementById('btnDrawCard');
                var btn2 = document.getElementById('btnDrawPots');
                var btn3 = document.getElementById('btnAnswer');
                var popup1 = document.getElementById('popUpLink');
                btn1.addEventListener('mouseout', onButtonMouseOut, false);
                btn1.addEventListener('mouseover', onButtonMouseOver, false);
                btn2.addEventListener('mouseout', onButtonMouseOut, false);
                btn2.addEventListener('mouseover', onButtonMouseOver, false);
                btn3.addEventListener('mouseout', onButtonMouseOut, false);
                btn3.addEventListener('mouseover', onButtonMouseOver, false);
                submitButton.addEventListener('mouseover', onButtonMouseOver, false);
                submitButton.addEventListener('mouseout', onButtonMouseOut, false);
                popup1.addEventListener('mouseover', infoOnMouseOver, false);
                popup1.addEventListener('mouseout', infoOnMouseOut, false);
                var choosePot1 = document.getElementById('btnChoosePot1');

                function infoOnMouseOver(event) {
                    if (selectedButton !== this) {
                        this.nextSibling.style.display = 'block';
                    }
                }

                function infoOnMouseOut(event) {
                    if (selectedButton !== this) {
                        this.nextSibling.style.display = 'none';
                    }
                }

                function onButtonMouseOver(event) {
                    if (selectedButton !== this) {
                        this.style.background = 'gray';
                        this.style.color = 'white';
                    }
                }

                function onButtonMouseOut(event) {
                    if (selectedButton !== this) {
                        this.style.background = '';
                        this.style.color = 'black';
                    }
                }
            }
        }
    };
    return Game;
}());
var game = Object.create(Game).init();
game.createInputPage('#numberContainer');