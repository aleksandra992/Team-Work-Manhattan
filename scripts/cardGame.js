(function () {

    var suitType = {
        Diamond: 'Diamond',
        Heart: 'Heart',
        Spade: 'Spade',
        Clubs: 'Club'
    };
    var magicValue = 1;
    var selectedButton = null;
    var potTurns;
    var magicValueIsCorrect,
        areShuffled;
    var buttonClickCount = 0;
    var cardDeck = fillDeckWithCards();
    var threePots = getThreePots(cardDeck);
    var currentPotTurns;
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
    var MAX_SHUFFLES = 3,
        MAGIC_VALUE = {
            MIN: 1,
            MAX: 27
        };

    function checkIfClickedMoreThanThree(clickedTimes) {
        if (clickedTimes >= MAX_SHUFFLES) {
            window.alert('You should not click more than 3 times.Proceed to answer');
            document.getElementById('btnAnswer').style.background = 'yellow';
        }
    }

    function checkIfShuffledEnough(numberOfShuffles) {
        if (numberOfShuffles < MAX_SHUFFLES) {
            window.alert('You should shuffle the deck at least 3 times');
            document.getElementById('btnChoosePot1').style.background = 'yellow';
            document.getElementById('btnChoosePot2').style.background = 'yellow';
            document.getElementById('btnChoosePot3').style.background = 'yellow';
            return false;
        }
        else {
            return true;
        }
    }

    function checkMagicValue(magicValue) {
        if (magicValue < MAGIC_VALUE.MIN || magicValue > MAGIC_VALUE.MAX) {
            window.alert('Magic value should be between 1 and 27');
            return false;
        }
        else {
            return true;
        }
    }


    function Card(name, suitType, cardValue, picture, sound) {
        this.Name = name;
        this.SuitType = suitType;
        this.CardValue = cardValue;
        this.Picture = picture;
        this.Sound = sound;
    }

    Card.prototype.toString = function () {
        return this.Name + ' of ' + this.SuitType + 's';
    };

    function fillDeckWithCards() {
        var deckOfCard = [];
        deckOfCard.push(new Card('Ace', suitType.Diamond, 14, 'images/classic-cards/4.png', 'sounds/cardPlace1.wav'));
        deckOfCard.push(new Card('Ace', suitType.Clubs, 14, 'images/classic-cards/2.png', 'sounds/cardPlace2.wav'));
        deckOfCard.push(new Card('Ace', suitType.Heart, 14, 'images/classic-cards/3.png', 'sounds/cardPlace3.wav'));
        deckOfCard.push(new Card('Ace', suitType.Spade, 14, 'images/classic-cards/1.png', 'sounds/cardPlace4.wav'));
        deckOfCard.push(new Card('King', suitType.Diamond, 13, 'images/classic-cards/8.png', 'sounds/cardPlace1.wav'));
        deckOfCard.push(new Card('King', suitType.Clubs, 13, 'images/classic-cards/6.png', 'sounds/cardPlace2.wav'));
        deckOfCard.push(new Card('King', suitType.Heart, 13, 'images/classic-cards/7.png', 'sounds/cardPlace3.wav'));
        deckOfCard.push(new Card('King', suitType.Spade, 13, 'images/classic-cards/5.png', 'sounds/cardPlace4.wav'));
        deckOfCard.push(new Card('Queen', suitType.Diamond, 12, 'images/classic-cards/12.png', 'sounds/cardPlace1.wav'));
        deckOfCard.push(new Card('Queen', suitType.Clubs, 12, 'images/classic-cards/10.png', 'sounds/cardPlace2.wav'));
        deckOfCard.push(new Card('Queen', suitType.Heart, 12, 'images/classic-cards/11.png', 'sounds/cardPlace3.wav'));
        deckOfCard.push(new Card('Queen', suitType.Spade, 12, 'images/classic-cards/9.png', 'sounds/cardPlace4.wav'));
        deckOfCard.push(new Card('Jack', suitType.Diamond, 11, 'images/classic-cards/16.png', 'sounds/cardPlace1.wav'));
        deckOfCard.push(new Card('Jack', suitType.Clubs, 11, 'images/classic-cards/14.png', 'sounds/cardPlace1.wav'));
        deckOfCard.push(new Card('Jack', suitType.Heart, 11, 'images/classic-cards/15.png', 'sounds/cardPlace1.wav'));
        deckOfCard.push(new Card('Jack', suitType.Spade, 11, 'images/classic-cards/13.png', 'sounds/cardPlace1.wav'));
        deckOfCard.push(new Card('Ten', suitType.Diamond, 10, 'images/classic-cards/20.png', 'sounds/cardPlace2.wav'));
        deckOfCard.push(new Card('Ten', suitType.Clubs, 10, 'images/classic-cards/18.png', 'sounds/cardPlace2.wav'));
        deckOfCard.push(new Card('Ten', suitType.Heart, 10, 'images/classic-cards/19.png', 'sounds/cardPlace2.wav'));
        deckOfCard.push(new Card('Ten', suitType.Spade, 10, 'images/classic-cards/17.png', 'sounds/cardPlace2.wav'));
        deckOfCard.push(new Card('Nine', suitType.Diamond, 9, 'images/classic-cards/24.png', 'sounds/cardPlace3.wav'));
        deckOfCard.push(new Card('Nine', suitType.Clubs, 9, 'images/classic-cards/22.png', 'sounds/cardPlace3.wav'));
        deckOfCard.push(new Card('Nine', suitType.Heart, 9, 'images/classic-cards/23.png', 'sounds/cardPlace3.wav'));
        deckOfCard.push(new Card('Nine', suitType.Spade, 9, 'images/classic-cards/21.png', 'sounds/cardPlace3.wav'));
        deckOfCard.push(new Card('Eight', suitType.Diamond, 8, 'images/classic-cards/28.png', 'sounds/cardPlace4.wav'));
        deckOfCard.push(new Card('Eight', suitType.Clubs, 8, 'images/classic-cards/26.png', 'sounds/cardPlace4.wav'));
        deckOfCard.push(new Card('Eight', suitType.Heart, 8, 'images/classic-cards/27.png', 'sounds/cardPlace4.wav'));

        return deckOfCard.slice();

    }

    function getRandomCard(deck) {
        var currentCard = deck[Math.floor(Math.random() * deck.length)];
        return currentCard;
    }

    function deleteDrawedCard(deck, currentCard) {
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

    function playCardGameSound(soundResource) {
        if (soundResource) {
            var currentAudio = new Audio();
            currentAudio.src = soundResource;
            currentAudio.play();
        }
    }

    function drawText(currentCard, context) {
        context.clearRect(0, 0, context.canvas.width, context.canvas.height);
        context.fillStyle = 'black';
        context.font = "1.1em Consolas";
        context.fillText(currentCard.toString(), 20, 240);
    }

    function drawCard(card, context, alignX, alignY) {

        if (context) {

            if (card) {
                var currentImage = new Image();
                currentImage.onload = function () {
                    context.drawImage(currentImage, alignX, alignY, 108, 154);
                };
                currentImage.src = card.Picture;

                playCardGameSound(card.Sound);
                // drawText(currentCard, context);
            }
        }
    }

    function getThreePots(deck) {
        var currentDeck = deck.slice();
        var firstPot = [],
            secondPot = [],
            thirdPot = [];
        var currentCard = {};
        for (var i = 0; i < 9; i++) {
            currentCard = getRandomCard(currentDeck);
            firstPot.push(currentCard);
            currentDeck = deleteDrawedCard(currentDeck, currentCard);

            currentCard = getRandomCard(currentDeck);
            secondPot.push(currentCard);
            currentDeck = deleteDrawedCard(currentDeck, currentCard);

            currentCard = getRandomCard(currentDeck);
            thirdPot.push(currentCard);
            currentDeck = deleteDrawedCard(currentDeck, currentCard);
        }
        return {
            firstPot: firstPot.slice(),
            secondPot: secondPot.slice(),
            thirdPot: thirdPot.slice()
        }


    }

    function potDealer(number) {
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
    }

    function dealThreePots(threePots, context) {


        var firstPot = threePots.firstPot,
            secondPot = threePots.secondPot,
            thirdPot = threePots.thirdPot,
            i;

        for (i = 0; i < 9; i += 1) {
            drawCard(firstPot[i], context, 20 + i * 20, 40);
            drawCard(secondPot[i], context, 20 + i * 20, 210);
            drawCard(thirdPot[i], context, 20 + i * 20, 380);

        }

        return {
            firstPot: firstPot.slice(),
            secondPot: secondPot.slice(),
            thirdPot: thirdPot.slice()
        }
    }

    var cardCanvas = document.getElementById("cardCanvas");
    var context = cardCanvas.getContext("2d");

    function createInputPage(selector) {
        var container = document.querySelector(selector);
        container.style.font = "24px Consolas";
        container.style.width = '1000px';
        container.style.height = '500px';
        container.style.display = 'none';
        container.style.marginLeft = '30px';
        var inputBox = document.createElement('div');
        var form = document.createElement('form');
        var inputArea = document.createElement('input');
        var submitButton = document.createElement('button');
        var popUpLink = document.createElement('a');
        var popUpDiv = document.createElement('div');

        popUpDiv.setAttribute('id', 'popUpDiv');
        popUpDiv.setAttribute('data-role', 'popup');
        popUpDiv.style.width = '270px';
        popUpDiv.style.height = '44px';
        // popUpDiv.style.borderTop = '1px solid black';
        popUpDiv.style.borderRight = '1px solid black';
        popUpDiv.style.borderBottom = '1px solid black';
        popUpDiv.style.borderRadius = '200px';
        popUpDiv.style.display = 'none';
        popUpDiv.style.position = 'relative';
        popUpDiv.style.left = '368px';
        popUpDiv.style.top = '0px';
        popUpDiv.style.fontSize = '12px';
        popUpDiv.innerHTML = '';
        popUpDiv.innerHTML += '<ol><li>Enter a number within 1 - 27</li><li>Pick a card from the deck</li><li>Choose the pot with your card (3x)</li></ol>';

        popUpLink.setAttribute('href', '#popUpDiv');
        popUpLink.setAttribute('data-rel', 'popup');
        popUpLink.setAttribute('data-role', 'button');
        popUpLink.setAttribute('data-inline', 'true');
        popUpLink.setAttribute('data-transition', 'pop');
        popUpLink.id = 'popUpLink';
        popUpLink.text += 'info';
        popUpLink.style.textDecoration = 'none';
        popUpLink.style.fontSize = '12px';
        popUpLink.style.color = 'black';

        popUpLink.style.position = 'relative';
        popUpLink.style.top = '-10px';
        popUpLink.style.left = '160px';
        popUpLink.style.marginLeft = '3px';
        popUpLink.style.marginRight = '3px';


        form.id = 'pickInputNumber';
        form.className = 'formBox';
        form.style.display = 'none';

        inputArea.setAttribute('type', 'text');
        inputArea.style.width = '220px';
        inputArea.style.height = '80px';
        inputArea.style.marginTop = '5px';
        inputArea.style.border = '5px solid black';
        inputArea.style.fontSize = '76px';
        inputArea.style.textAlign = 'center';

        submitButton.setAttribute('id', 'submit-btn');
        submitButton.style.width = '60px';
        submitButton.style.height = '60px';
        submitButton.style.marginTop = '5px';
        submitButton.style.border = '3px solid black';
        submitButton.style.fontSize = '24px';
        submitButton.style.textAlign = 'center';
        submitButton.innerHTML = 'GO!';
        submitButton.style.display = 'inline-block';
        submitButton.style.padding = '3px';
        submitButton.style.position = 'relative';
        submitButton.style.top = '-20px';
        submitButton.style.left = '20px';

        inputBox.innerHTML = '';
        inputBox.innerHTML += '<h1>Manhattan Project</h1></br> Chapter: Prediction</br>';
        inputBox.innerHTML += '<em>enter your favorite number within 1 and 27</em>';
        inputBox.style.borderLeft = '2px dotted black';
        inputBox.style.borderRight = '2px dotted black';
        inputBox.style.boxShadow = '0px 4px 7px rgba(0,0,0,0.6)';
        inputBox.style.borderRadius = '20px';
        inputBox.style.background = '#FDF9E7';
        inputBox.style.width = '390px';
        inputBox.style.height = '310px';
        inputBox.style.margin = "50px";
        inputBox.style.textAlign = "center";
        inputBox.style.display = 'inline-block';


        form.appendChild(inputArea);


        inputBox.appendChild(form);
        inputBox.appendChild(submitButton);
        inputBox.appendChild(popUpLink);
        inputBox.appendChild(popUpDiv);

        popUpDiv.className = 'box e'
        window.getComputedStyle(popUpDiv).opacity; // added
        popUpDiv.className += ' in';

        container.appendChild(inputBox);

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

    function shuffleCards() {
        currentMixedPots = {
            firstPot: [],
            secondPot: [],
            thirdPot: []
        };
        for (var i = 0; i < 9; i++) {
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
        for (var i = 0; i < 9; i++) {
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
        for (var i = 0; i < 9; i++) {
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
    }

    function PutFirstOnPlace(turn) {

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

    }

    function PutSecondOnPlace(turn) {

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

    }

    function PutThirdOnPlace(turn) {

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

    }

    createInputPage('#numberContainer');

    $(document).ready(function () {
        $('#numberContainer').slideDown(5000);
        $('.formBox').slideDown(4000);
        $('#submit-btn').on("click", function () {
            magicValueIsCorrect = checkMagicValue(magicValue);
            if (magicValueIsCorrect) {
                $("#btnDrawCard").trigger("click");
            }
        });
        $("#pickInputNumber").on("keyup", function () {
            magicValue = $("input:text").val();
            potTurns = potDealer(magicValue);
            currentPotTurns = potTurns.split(' ');

            // use value for potDealer.js
            // and fire staright to the next step of execution

        });
        $("#btnDrawCard").on("click", function () {
            $(this).prop('disabled', true);
            $("#btnDrawPots").prop('disabled', false);
            var container = document.querySelector('#numberContainer');
            container.style.display = 'none';
            var currentCardDeck = cardDeck.slice();
            var currentCard = {};
            // window.scrollBy(0, 200);
            for (var i = 1; i <= 27; i += 1) {
                currentCard = getRandomCard(currentCardDeck);
                drawCard(currentCard, context, 20 + i * 30, 40);
                currentCardDeck = deleteDrawedCard(currentCardDeck, currentCard);
                // hot to implement the fracking setTimeoit
            }
        });

        if ($("#btnDrawCard").prop('disabled') === false) {
            $("#btnDrawPots").prop('disabled', true);
        }

        $("#btnDrawPots").on("click", function () {

            $(this).prop('disabled', true);
            // console.log(magicValue); // magicValue is already ok here

            context.clearRect(0, 0, cardCanvas.width, cardCanvas.height);
            dealThreePots(threePots, context);
            $('#wrapper').append('<input type="button" class="btnChoosePot" id="btnChoosePot1" value="1">');
            $('#wrapper').append('<input type="button" class="btnChoosePot" id="btnChoosePot2" value="2">');
            $('#wrapper').append('<input type="button" class="btnChoosePot" id="btnChoosePot3" value="3">');
            console.log(currentPotTurns);
            if (currentPotTurns === undefined) {
                currentPotTurns = ['TOP', 'TOP', 'TOP'];
            }


            $("#btnChoosePot1").on("click", function () {
                document.getElementById('btnChoosePot1').style.background = '#dbe6c4';
                checkIfClickedMoreThanThree(buttonClickCount);
                PutFirstOnPlace(buttonClickCount);
                console.log('pred shuffle');
                console.log(currentThreePots);

                if (buttonClickCount < 2) {
                    shuffleCards();
                }
                buttonClickCount++;
                context.clearRect(0, 0, cardCanvas.width, cardCanvas.height);
                dealThreePots(currentThreePots, context);
                //  console.log(threePots);
                console.log('sfter shuffle');
                console.log(currentThreePots);


            });
            $("#btnChoosePot2").on("click", function () {
                document.getElementById('btnChoosePot2').style.background = '#dbe6c4';
                checkIfClickedMoreThanThree(buttonClickCount);
                PutSecondOnPlace(buttonClickCount);
                console.log('pred shuffle');
                console.log(currentThreePots);
                if (buttonClickCount < 2) {
                    shuffleCards();
                }
                buttonClickCount++;
                context.clearRect(0, 0, cardCanvas.width, cardCanvas.height);
                dealThreePots(currentThreePots, context);
                // console.log(threePots);
                console.log('sfter shuffle');
                console.log(currentThreePots);

            });

            $("#btnChoosePot3").on("click", function () {
                document.getElementById('btnChoosePot3').style.background = '#dbe6c4';
                checkIfClickedMoreThanThree(buttonClickCount);
                PutThirdOnPlace(buttonClickCount);
                console.log('pred shuffle');
                console.log(currentThreePots);
                if (buttonClickCount < 2) {
                    shuffleCards();
                }
                buttonClickCount++;
                context.clearRect(0, 0, cardCanvas.width, cardCanvas.height);
                dealThreePots(currentThreePots, context);
                console.log('after shuffle');
                console.log(currentThreePots);

            });


            $("#btnAnswer").on("click", function () {
                areShuffled = checkIfShuffledEnough(buttonClickCount);
                if (areShuffled) {
                    $("#btnChoosePot1").remove();
                    $("#btnChoosePot2").remove();
                    $("#btnChoosePot3").remove();

                    var pot = currentThreePots.firstPot;
                    for (var i = 0; i < 9; i++) {
                        pot.push(currentThreePots.secondPot[i]);
                    }
                    for (var i = 0; i < 9; i++) {
                        pot.push(currentThreePots.thirdPot[i]);
                    }
                    context.clearRect(0, 0, cardCanvas.width, cardCanvas.height);
                    var i;
                    for (i = 0; i < magicValue; i++) {
                        drawCard(pot[i], context, 20 + i * 30, 40)
                    }
                    drawCard(pot[magicValue - 1], context, 20 + (i - 1) * 30, 100);
                    console.log(pot);
                    console.log(pot[magicValue - 1]);
                    drawCard(pot[magicValue - 1], context, 20 + (i - 1) * 30, 100);
                    console.log(pot);
                    console.log(pot[magicValue - 1]);
                }
            });
        });
    });
}());