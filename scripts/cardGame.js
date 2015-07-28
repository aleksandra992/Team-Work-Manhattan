var Game = (function () {

    var MAX_SHUFFLES = 3,
        MAGIC_VALUE = {
            MIN: 1,
            MAX: 27
        };

    var CARD_DIM = {
        WIDTH: 100,
        HEIGHT: 145
    };

    var CARD_POS = {
        MAIN_DECK_START_X: 27,
        POTS_START_X: 20,
        MAGIC_DECK_START_X: 30,
        MAIN_DECK_Y: 220,
        POT_1_Y: 40,
        POT_2_Y: 210,
        POT_3_Y: 380,
        MAGIC_DECK_Y: 220,
        ROTATED_CARD_Y: 50,
        MAIN_DECK_SPACING: 30,
        POTS_SPACING: 35,
        MAGIC_DECK_SPACING: 26,
    };

    var suitType = {
        Diamond: 'Diamond',
        Heart: 'Heart',
        Spade: 'Spade',
        Clubs: 'Club'
    };

    var NUMBER_OF_CARDS = {
        DECK: 27,
        POT: 9
    };

    var TIMERS = {
        GIVE_CARDS_MS: 100,
        GIVE_POTS_MS: 100,
        GIVE_FINAL_CARDS_MS: 200,
        TURN_CARDS_MS: 1,
        ZOOM_MAGIC_CARD_MS: 10,
        WAIT_BEFORE_TURN_CARDS_MS: 500,
        WAIT_BEFORE_ZOOM_MAGIC_CARD_MS: 1100,
        WAIT_BEFORE_ROTATE_MAGIC_CARD_MS: 3000,
        ROTATION_SPEED_FPS: (1000 / 100),
    };

    var Deck = (function () {

        var Deck = {
            init: function (name) {
                this.name = name;
                return this;
            },
            fillDeckWithCards: function () {
                var deckOfCard = [];
                deckOfCard.push(Object.create(Card).init('Ace', suitType.Diamond, 14, 'images/classic-cards/01_of_diamonds_A.svg', 'sounds/cardPlace1.wav'));
                deckOfCard.push(Object.create(Card).init('Ace', suitType.Clubs, 14, 'images/classic-cards/01_of_clubs_A.svg', 'sounds/cardPlace2.wav'));
                deckOfCard.push(Object.create(Card).init('Ace', suitType.Heart, 14, 'images/classic-cards/01_of_hearts_A.svg', 'sounds/cardPlace3.wav'));
                deckOfCard.push(Object.create(Card).init('Ace', suitType.Spade, 14, 'images/classic-cards/01_of_spades_A.svg', 'sounds/cardPlace4.wav'));
                deckOfCard.push(Object.create(Card).init('King', suitType.Diamond, 13, 'images/classic-cards/King_of_diamonds2.svg', 'sounds/cardPlace1.wav'));
                deckOfCard.push(Object.create(Card).init('King', suitType.Clubs, 13, 'images/classic-cards/King_of_clubs2.svg', 'sounds/cardPlace2.wav'));
                deckOfCard.push(Object.create(Card).init('King', suitType.Heart, 13, 'images/classic-cards/King_of_hearts2.svg', 'sounds/cardPlace3.wav'));
                deckOfCard.push(Object.create(Card).init('King', suitType.Spade, 13, 'images/classic-cards/King_of_spades2.svg', 'sounds/cardPlace4.wav'));
                deckOfCard.push(Object.create(Card).init('Queen', suitType.Diamond, 12, 'images/classic-cards/Queen_of_diamonds2.svg', 'sounds/cardPlace1.wav'));
                deckOfCard.push(Object.create(Card).init('Queen', suitType.Clubs, 12, 'images/classic-cards/Queen_of_clubs2.svg', 'sounds/cardPlace2.wav'));
                deckOfCard.push(Object.create(Card).init('Queen', suitType.Heart, 12, 'images/classic-cards/Queen_of_hearts2.svg', 'sounds/cardPlace3.wav'));
                deckOfCard.push(Object.create(Card).init('Queen', suitType.Spade, 12, 'images/classic-cards/Queen_of_spades2.svg', 'sounds/cardPlace4.wav'));
                deckOfCard.push(Object.create(Card).init('Jack', suitType.Diamond, 11, 'images/classic-cards/Jack_of_diamonds2.svg', 'sounds/cardPlace1.wav'));
                deckOfCard.push(Object.create(Card).init('Jack', suitType.Clubs, 11, 'images/classic-cards/Jack_of_clubs2.svg', 'sounds/cardPlace1.wav'));
                deckOfCard.push(Object.create(Card).init('Jack', suitType.Heart, 11, 'images/classic-cards/Jack_of_hearts2.svg', 'sounds/cardPlace1.wav'));
                deckOfCard.push(Object.create(Card).init('Jack', suitType.Spade, 11, 'images/classic-cards/Jack_of_spades2.svg', 'sounds/cardPlace1.wav'));
                deckOfCard.push(Object.create(Card).init('Ten', suitType.Diamond, 10, 'images/classic-cards/10_of_diamonds_-_David_Bellot.svg', 'sounds/cardPlace2.wav'));
                deckOfCard.push(Object.create(Card).init('Ten', suitType.Clubs, 10, 'images/classic-cards/10_of_clubs_-_David_Bellot.svg', 'sounds/cardPlace2.wav'));
                deckOfCard.push(Object.create(Card).init('Ten', suitType.Heart, 10, 'images/classic-cards/10_of_hearts_-_David_Bellot.svg', 'sounds/cardPlace2.wav'));
                deckOfCard.push(Object.create(Card).init('Ten', suitType.Spade, 10, 'images/classic-cards/10_of_spades_-_David_Bellot.svg', 'sounds/cardPlace2.wav'));
                deckOfCard.push(Object.create(Card).init('Nine', suitType.Diamond, 9, 'images/classic-cards/09_of_diamonds.svg', 'sounds/cardPlace3.wav'));
                deckOfCard.push(Object.create(Card).init('Nine', suitType.Clubs, 9, 'images/classic-cards/09_of_clubs.svg', 'sounds/cardPlace3.wav'));
                deckOfCard.push(Object.create(Card).init('Nine', suitType.Heart, 9, 'images/classic-cards/09_of_hearts.svg', 'sounds/cardPlace3.wav'));
                deckOfCard.push(Object.create(Card).init('Nine', suitType.Spade, 9, 'images/classic-cards/09_of_spades.svg', 'sounds/cardPlace3.wav'));
                deckOfCard.push(Object.create(Card).init('Eight', suitType.Diamond, 8, 'images/classic-cards/08_of_diamonds.svg', 'sounds/cardPlace4.wav'));
                deckOfCard.push(Object.create(Card).init('Eight', suitType.Clubs, 8, 'images/classic-cards/08_of_clubs.svg', 'sounds/cardPlace4.wav'));
                deckOfCard.push(Object.create(Card).init('Eight', suitType.Heart, 8, 'images/classic-cards/08_of_hearts.svg', 'sounds/cardPlace4.wav'));

                return deckOfCard.slice();


            },
            getRandomCard: function (deck) {
                var currentCard = deck[Math.floor(Math.random() * deck.length)];
                return currentCard;
            },
            deleteDrawedCard: function (deck, currentCard) {
                var currentIndex;
                deck.some(function (item, index) {
                    currentIndex = index;
                    return currentCard.Name === item.Name && currentCard.SuitType === item.SuitType;
                });
                if (currentIndex > -1) {
                    deck.splice(currentIndex, 1);
                }
                return deck.slice();
            }

        }
        return Deck;

    })();

    var Card = (function () {
        var Card = {
            init: function (name, suitType, cardValue, picture, sound) {
                this.Name = name;
                this.SuitType = suitType;
                this.CardValue = cardValue;
                this.Picture = picture;
                this.Sound = sound;
                return this;
            },
            playCardGameSound: function (soundResource) {
                if (soundResource) {
                    var currentAudio = new Audio();
                    currentAudio.src = soundResource;
                    currentAudio.play();
                }
            },
            drawCard: function (card, context, alignX, alignY, width, height) {

                if (context) {

                    if (card) {
                        var currentImage = new Image();
                        currentImage.onload = function () {
                            context.drawImage(currentImage, alignX, alignY, width, height);
                        };
                        currentImage.src = card.Picture;

                        Card.playCardGameSound(card.Sound);
                    }
                }
            },
            drawCardBack: function (context, alignX, alignY, width, height) {

                if (context) {
                    var cardBack = new Image();
                    cardBack.src = 'images/back.jpg';
                    cardBack.onload = function () {
                        context.drawImage(cardBack, alignX, alignY, width, height);
                        Card.playCardGameSound('sounds/cardPlace1.wav');
                    }
                }
            },
            rotateMagicCard: function (card, context, alignX, alignY, height, width) {

                if (context) {
                    if (card) {
                        var currentImage = new Image();
                        var angle = 0; //angle

                        document.getElementById("cardCanvas").style.paddingLeft = "275px";
                        document.getElementById("cardCanvas").style.paddingRight = "250px";

                        currentImage.onload = function () {
                            cardCanvas.width = this.width << 1; //double the canvas width
                            cardCanvas.height = this.height << 1; //double the canvas height
                            var cache = this; //cache the local copy of image element for future reference

                            var rotateCard = setInterval(function () {
                                rotateCardTimer()
                            }, TIMERS.ROTATION_SPEED_FPS);

                            function rotateCardTimer() {
                                context.save(); //saves the state of canvas
                                context.clearRect(0, 0, cardCanvas.width, cardCanvas.height); //clear the canvas
                                context.translate(cache.width, cache.height);
                                context.rotate(Math.PI / 180 * (angle += 1)); //increm ent the angle and rotate the image
                                context.drawImage(currentImage, -cache.width / 2, -cache.height / 2, cache.width, cache.height);
                                context.restore(); //restore the state of canvas
                                if (angle === 180 * magicValue) {
                                    clearInterval(rotateCard);
                                }
                            }
                        };
                        currentImage.src = card.Picture;
                    }
                }
            }


        }
        return Card;
    }());

    var ThreePots = (function () {
        var ThreePots = {
            init: function () {

                return this;
            },
            getThreePots: function (deck) {
                var currentDeck = deck.slice();
                var firstPot = [],
                    secondPot = [],
                    thirdPot = [];
                var currentCard = {};

                for (var i = 0; i < NUMBER_OF_CARDS.POT; i++) {
                    currentCard = Deck.getRandomCard(currentDeck);
                    firstPot.push(currentCard);
                    currentDeck = Deck.deleteDrawedCard(currentDeck, currentCard);

                    currentCard = Deck.getRandomCard(currentDeck);
                    secondPot.push(currentCard);
                    currentDeck = Deck.deleteDrawedCard(currentDeck, currentCard);

                    currentCard = Deck.getRandomCard(currentDeck);
                    thirdPot.push(currentCard);
                    currentDeck = Deck.deleteDrawedCard(currentDeck, currentCard);
                }
                return {
                    firstPot: firstPot.slice(),
                    secondPot: secondPot.slice(),
                    thirdPot: thirdPot.slice()
                }


            },
            potDealer: function (number) {
                var logicForNumbers = ['000', '100', '200',
                    '010', '110', '210',
                    '020', '120', '220',
                    '001', '101', '201',
                    '011', '111', '211',
                    '021', '121', '221',
                    '002', '102', '202',
                    '012', '112', '212',
                    '022', '122', '222'];
                var logic = logicForNumbers[number - 1];
                var potTurns = '';
                for (var i = 0; i < logic.length; i++) {
                    if (logic[i] === '0') {
                        potTurns += 'TOP';
                        potTurns += " ";
                    } else if (logic[i] === '1') {
                        potTurns += 'MIDDLE';
                        potTurns += " ";
                    } else if (logic[i] === '2') {
                        potTurns += 'DOWN';
                        potTurns += " ";
                    }


                }
                return potTurns;
            },
            dealThreePots: function (threePots, context) {


                var firstPot = threePots.firstPot,
                    secondPot = threePots.secondPot,
                    thirdPot = threePots.thirdPot,
                    i;

                var giveThreePots = setInterval(function () {
                    threePotsTimer()
                }, TIMERS.GIVE_CARDS_MS);
                var i = 0;

                function threePotsTimer() {
                    Card.drawCard(firstPot[i], context, CARD_POS.POTS_START_X + i * CARD_POS.POTS_SPACING, CARD_POS.POT_1_Y, CARD_DIM.WIDTH, CARD_DIM.HEIGHT);
                    Card.drawCard(secondPot[i], context, CARD_POS.POTS_START_X + i * CARD_POS.POTS_SPACING, CARD_POS.POT_2_Y, CARD_DIM.WIDTH, CARD_DIM.HEIGHT);
                    Card.drawCard(thirdPot[i], context, CARD_POS.POTS_START_X + i * CARD_POS.POTS_SPACING, CARD_POS.POT_3_Y, CARD_DIM.WIDTH, CARD_DIM.HEIGHT);
                    i++;
                    if (i === NUMBER_OF_CARDS.POT) {
                        clearInterval(giveThreePots);
                    }
                }

                return {
                    firstPot: firstPot.slice(),
                    secondPot: secondPot.slice(),
                    thirdPot: thirdPot.slice()
                }
            },
            shuffleCards: function () {
                currentMixedPots = {
                    firstPot: [],
                    secondPot: [],
                    thirdPot: []
                };
                for (var i = 0; i < NUMBER_OF_CARDS.POT; i++) {
                    if (i % 3 === 0) {
                        currentMixedPots.firstPot.push(currentThreePots.firstPot[i]);
                    }
                    else if (i % 3 === 1) {
                        currentMixedPots.secondPot.push(currentThreePots.firstPot[i]);
                    }
                    else if (i % 3 === 2) {
                        currentMixedPots.thirdPot.push(currentThreePots.firstPot[i]);
                    }
                }
                for (var i = 0; i < NUMBER_OF_CARDS.POT; i++) {
                    if (i % 3 === 0) {
                        currentMixedPots.firstPot.push(currentThreePots.secondPot[i]);
                    }
                    else if (i % 3 === 1) {
                        currentMixedPots.secondPot.push(currentThreePots.secondPot[i]);
                    }
                    else if (i % 3 === 2) {
                        currentMixedPots.thirdPot.push(currentThreePots.secondPot[i]);
                    }
                }
                for (var i = 0; i < NUMBER_OF_CARDS.POT; i++) {
                    if (i % 3 === 0) {
                        currentMixedPots.firstPot.push(currentThreePots.thirdPot[i]);
                    }
                    else if (i % 3 === 1) {
                        currentMixedPots.secondPot.push(currentThreePots.thirdPot[i]);
                    }
                    else if (i % 3 === 2) {
                        currentMixedPots.thirdPot.push(currentThreePots.thirdPot[i]);
                    }
                }
                currentThreePots.firstPot = currentMixedPots.firstPot.slice();
                currentThreePots.secondPot = currentMixedPots.secondPot.slice();
                currentThreePots.thirdPot = currentMixedPots.thirdPot.slice();
                threePots.firstPot = currentMixedPots.firstPot.slice();
                threePots.secondPot = currentMixedPots.secondPot.slice();
                threePots.thirdPot = currentMixedPots.thirdPot.slice();
            },
            PutFirstOnPlace: function (turn) {

                if (currentPotTurns[turn] === 'TOP') {//put the current pot on the top
                    console.log('top');
                    currentThreePots.firstPot = threePots.firstPot.slice();
                    currentThreePots.secondPot = threePots.secondPot.slice();
                    currentThreePots.thirdPot = threePots.thirdPot.slice();
                }
                if (currentPotTurns[turn] === 'MIDDLE') {//put the current pot in the middle
                    console.log('middle');
                    currentThreePots.secondPot = threePots.firstPot.slice();
                    currentThreePots.firstPot = threePots.secondPot.slice();
                    currentThreePots.thirdPot = threePots.thirdPot.slice();
                }
                if (currentPotTurns[turn] === 'DOWN') {//put the current pot on the bottom
                    console.log('bottom');
                    currentThreePots.thirdPot = threePots.firstPot.slice();
                    currentThreePots.firstPot = threePots.thirdPot.slice();
                    currentThreePots.secondPot = threePots.secondPot.slice();
                }
                threePots.firstPot = currentThreePots.firstPot.slice();
                threePots.secondPot = currentThreePots.secondPot.slice();
                threePots.thirdPot = currentThreePots.thirdPot.slice();

                gameInstructions(gameInstructionsCounter);
                gameInstructionsCounter++;
            },
            PutSecondOnPlace: function (turn) {

                if (currentPotTurns[turn] === 'TOP') {//put the current pot on the top
                    console.log('top');
                    currentThreePots.firstPot = threePots.secondPot.slice();
                    currentThreePots.secondPot = threePots.firstPot.slice();
                    currentThreePots.thirdPot = threePots.thirdPot.slice();
                }
                if (currentPotTurns[turn] === 'MIDDLE') {//put the current pot in the middle
                    console.log('middle');
                    currentThreePots.secondPot = threePots.secondPot.slice();
                    currentThreePots.firstPot = threePots.firstPot.slice();
                    currentThreePots.thirdPot = threePots.thirdPot.slice();
                }
                if (currentPotTurns[turn] === 'DOWN') {//put the current pot on the bottom
                    console.log('bottom');
                    currentThreePots.thirdPot = threePots.secondPot.slice();
                    currentThreePots.firstPot = threePots.firstPot.slice();
                    currentThreePots.secondPot = threePots.thirdPot.slice();
                }
                threePots.firstPot = currentThreePots.firstPot.slice();
                threePots.secondPot = currentThreePots.secondPot.slice();
                threePots.thirdPot = currentThreePots.thirdPot.slice();

                gameInstructions(gameInstructionsCounter);
                gameInstructionsCounter++;
            },
            PutThirdOnPlace: function (turn) {

                if (currentPotTurns[turn] === 'TOP') {//put the current pot on the top
                    console.log('top');
                    currentThreePots.firstPot = threePots.thirdPot.slice();
                    currentThreePots.secondPot = threePots.secondPot.slice();
                    currentThreePots.thirdPot = threePots.firstPot.slice();
                }
                if (currentPotTurns[turn] === 'MIDDLE') {//put the current pot in the middle
                    console.log('middle');
                    currentThreePots.secondPot = threePots.thirdPot.slice();
                    currentThreePots.firstPot = threePots.firstPot.slice();
                    currentThreePots.thirdPot = threePots.secondPot.slice();
                }
                if (currentPotTurns[turn] === 'DOWN') {//put the current pot on the bottom
                    console.log('bottom');
                    currentThreePots.thirdPot = threePots.thirdPot.slice();
                    currentThreePots.firstPot = threePots.firstPot.slice();
                    currentThreePots.secondPot = threePots.secondPot.slice();
                }
                threePots.firstPot = currentThreePots.firstPot.slice();
                threePots.secondPot = currentThreePots.secondPot.slice();
                threePots.thirdPot = currentThreePots.thirdPot.slice();

                gameInstructions(gameInstructionsCounter);
                gameInstructionsCounter++;
            }
        }
        return ThreePots;
    }());

    var Deck = Object.create(Deck).init('Manhattan');
    var ThreePots = Object.create(ThreePots).init();
    var magicValue;
    var selectedButton = null;
    var potTurns;
    var magicValueIsCorrect,
        areShuffled;
    var buttonClickCount = 0;
    var cardDeck = Deck.fillDeckWithCards();
    var threePots = ThreePots.getThreePots(cardDeck);
    var currentPotTurns;
    var gameInstructionsCounter = 0;
    var currentMixedPots = {
        firstPot: [],
        secondPot: [],
        thirdPot: []
    };
    var currentThreePots = {
        firstPot: threePots.firstPot,
        secondPot: threePots.secondPot,
        thirdPot: threePots.thirdPot
    };
    var cardCanvas = document.getElementById("cardCanvas");
    var context = cardCanvas.getContext("2d");

    var wrapper = document.getElementById('wrapper');
    var redirectionToTheAnswer = new CustomEvent("theAnswer");

    function checkMagicValue(magicValue) {
        if (magicValue < MAGIC_VALUE.MIN || magicValue > MAGIC_VALUE.MAX
            || isNaN(magicValue) || magicValue == null) {
            alert.render('Magic value should be a number between 1 and 27');
            return false;
        }
        else {
            return true;
        }
    }
    function howToPlay() {
        var msg = 'HOW TO PLAY:' +
                "<br>" +
            "<br>"  + 'Enter a number within 1 - 27' +
            "<br>" + 'Pick a card from the deck' +
            "<br>" + 'Choose the pot with your card (3x)';
            alert.render(msg);
    }


    var dialogBox = document.createElement('div'),
        dialogOverLay = document.createElement('div'),
        nestedDialogBox = document.createElement('div'),
        dialogAlertHeader = document.createElement('div'),
        dialogAlertBody = document.createElement('div'),
        dialogAlertFooter = document.createElement('div');

    dialogBox.appendChild(nestedDialogBox);
    nestedDialogBox.appendChild(dialogAlertHeader);
    nestedDialogBox.appendChild(dialogAlertBody);
    nestedDialogBox.appendChild(dialogAlertFooter);

    dialogOverLay.style.display = 'none';
    dialogOverLay.style.opacity = '0.8';
    dialogOverLay.style.position = 'fixed';
    dialogOverLay.style.top = '0px';
    dialogOverLay.style.left = '0px';
    dialogOverLay.style.background = '#FFF';
    dialogOverLay.style.width = '100%';
    dialogOverLay.style.zIndex = '10';

    dialogBox.style.display = 'none';
    dialogBox.style.position = 'fixed';
    dialogBox.style.background = '#000';
    dialogBox.style.borderRadius = '9px';
    dialogBox.style.width = '550px';
    dialogBox.style.zIndex = '10';

    dialogAlertHeader.style.background = '#666';
    dialogAlertHeader.style.fontSize = '19px';
    dialogAlertHeader.style.padding = '10px';
    dialogAlertHeader.style.color = '#CCC';
    dialogAlertHeader.style.borderTopLeftRadius = '10px';
    dialogAlertHeader.style.borderTopRightRadius = '10px';

    dialogAlertBody.style.background = '#333';
    dialogAlertBody.style.padding = '20px';
    dialogAlertBody.style.color = '#FFF';

    dialogAlertFooter.style.background = '#666';
    dialogAlertFooter.style.padding = '10px';
    dialogAlertFooter.style.textAlign = 'right';
    dialogAlertFooter.style.borderBottomLeftRadius = '10px';
    dialogAlertFooter.style.borderBottomRightRadius = '10px';


    document.body.appendChild(dialogOverLay);
    document.body.appendChild(dialogBox);

    var alert = new CustomAlert();


    function CustomAlert() {
        this.render = function (dialog) {
            var winW = window.innerWidth;
            var winH = window.innerHeight;

            dialogOverLay.style.display = "block";
            dialogOverLay.style.height = winH + "px";
            dialogBox.style.left = (winW / 2) - (550 * .5) + "px";
            dialogBox.style.top = "100px";
            dialogBox.style.display = "block";
            dialogAlertHeader.innerHTML = "Message from the magician:";
            dialogAlertBody.innerHTML = dialog;
            dialogAlertFooter.innerHTML = '<button id="btnOK">OK</button>';
            var btnOK = document.getElementById('btnOK');
            btnOK.addEventListener('click', alert.ok);
        },
            this.ok = function () {
                dialogBox.style.display = "none";
                dialogOverLay.style.display = "none";
            }
    }


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

        var pot = currentThreePots.firstPot;
        for (var i = 0; i < NUMBER_OF_CARDS.POT; i++) {
            pot.push(currentThreePots.secondPot[i]);
        }
        for (var i = 0; i < NUMBER_OF_CARDS.POT; i++) {
            pot.push(currentThreePots.thirdPot[i]);
        }
        var potToDraw = pot.slice(0);


        var giveFinalCards = setInterval(function () {
            finalCardsTimer()
        }, TIMERS.GIVE_FINAL_CARDS_MS);
        var i = 0;

        function finalCardsTimer() {
            if (i === magicValue - 1) {
                Card.drawCard(potToDraw[i], context, CARD_POS.MAGIC_DECK_START_X + i * CARD_POS.MAGIC_DECK_SPACING, CARD_POS.MAGIC_DECK_Y, CARD_DIM.WIDTH, CARD_DIM.HEIGHT);
            }
            else {
                Card.drawCardBack(context, CARD_POS.MAGIC_DECK_START_X + i * CARD_POS.MAGIC_DECK_SPACING, CARD_POS.MAGIC_DECK_Y, CARD_DIM.WIDTH, CARD_DIM.HEIGHT);
            }
            i++;
            if (i === NUMBER_OF_CARDS.DECK) {
                clearInterval(giveFinalCards);
            }
        }


        var turnTheCards = setTimeout(function () {
            turnCards()
        }, TIMERS.GIVE_FINAL_CARDS_MS * NUMBER_OF_CARDS.DECK + TIMERS.WAIT_BEFORE_TURN_CARDS_MS);
        var k = 0;

        function turnCards() {

            var getTurnedCards = setInterval(function () {
                turnCardsTimer()
            }, TIMERS.TURN_CARDS_MS);

            function turnCardsTimer() {
                Card.drawCard(potToDraw[k], context, CARD_POS.MAGIC_DECK_START_X + k * CARD_POS.MAGIC_DECK_SPACING, CARD_POS.MAGIC_DECK_Y, CARD_DIM.WIDTH, CARD_DIM.HEIGHT);
                k++;

                if (k === NUMBER_OF_CARDS.DECK) {
                    clearInterval(turnTheCards);
                }
            }
        }


        var magicCard = setTimeout(function () {
            magicCardTimer()
        }, TIMERS.GIVE_FINAL_CARDS_MS * NUMBER_OF_CARDS.DECK + TIMERS.WAIT_BEFORE_ZOOM_MAGIC_CARD_MS);
        var j = 0;

        function magicCardTimer() {

            var zoomedMagiCard = setInterval(function () {
                magicCardZoomTimer()
            }, TIMERS.ZOOM_MAGIC_CARD_MS);

            function magicCardZoomTimer() {

                Card.drawCard(potToDraw[magicValue - 1], context, CARD_POS.MAGIC_DECK_START_X + (magicValue - 1) * CARD_POS.MAGIC_DECK_SPACING, CARD_POS.MAGIC_DECK_Y, CARD_DIM.WIDTH + j, CARD_DIM.HEIGHT + (j * 1.33));
                j++;
                if (j === 78) {
                    clearInterval(zoomedMagiCard);
                }
            }
        }


        var magicCardRotate = setTimeout(function () {
            Card.rotateMagicCard(potToDraw[magicValue - 1], context, CARD_POS.MAGIC_DECK_START_X + (magicValue - 1) * CARD_POS.MAGIC_DECK_SPACING, CARD_POS.ROTATED_CARD_Y,
                150, 96 + 200)
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

            // use value for potDealer.js
            // and fire staright to the next step of execution

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
            // window.scrollBy(0, 200);


            gameInstructions(gameInstructionsCounter);
            gameInstructionsCounter++;

            var giveCards = setInterval(function () {
                cardsTimer()
            }, TIMERS.GIVE_CARDS_MS);
            var deckIndex = 0;

            function cardsTimer() {
                currentCard = Deck.getRandomCard(currentCardDeck);
                Card.drawCard(currentCard, context, CARD_POS.MAIN_DECK_START_X + deckIndex * CARD_POS.MAIN_DECK_SPACING, CARD_POS.MAIN_DECK_Y, CARD_DIM.WIDTH, CARD_DIM.HEIGHT);
                currentCardDeck = Deck.deleteDrawedCard(currentCardDeck, currentCard);
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
            // console.log(magicValue); // magicValue is already ok here

            context.clearRect(0, 0, cardCanvas.width, cardCanvas.height);
            ThreePots.dealThreePots(threePots, context);
            $('#canvasContainer').append('<input type="button" class="invisible-button" id="btnChoosePot1" value="1">');
            $('#canvasContainer').append('<input type="button" class="invisible-button" id="btnChoosePot2" value="2">');
            $('#canvasContainer').append('<input type="button" class="invisible-button" id="btnChoosePot3" value="3">');
            console.log(currentPotTurns);
            if (currentPotTurns === undefined) {
                currentPotTurns = ['TOP', 'TOP', 'TOP'];
            }


            var buttonChoosePot1 = document.getElementById("btnChoosePot1");
            var buttonChoosePot2 = document.getElementById("btnChoosePot2");
            var buttonChoosePot3 = document.getElementById("btnChoosePot3");


            buttonChoosePot1.addEventListener('click', function () {

                ThreePots.PutFirstOnPlace(buttonClickCount);

                if (buttonClickCount < 2) {
                    ThreePots.shuffleCards();
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

                ThreePots.PutSecondOnPlace(buttonClickCount);

                if (buttonClickCount < 2) {
                    ThreePots.shuffleCards();
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

                ThreePots.PutThirdOnPlace(buttonClickCount);

                if (buttonClickCount < 2) {
                    ThreePots.shuffleCards();
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

    }

    return Game;


}());
var game = Object.create(Game).init();
game.createInputPage('#numberContainer');