(function() {

    var suitType = {
        Diamond: 'Diamond',
        Heart: 'Heart',
        Spade: 'Spade',
        Clubs: 'Club'
    };
    var magicValue = 1;

    function Card(name, suitType, cardValue, picture, sound) {
        this.Name = name;
        this.SuitType = suitType;
        this.CardValue = cardValue;
        this.Picture = picture;
        this.Sound = sound;
    }

    Card.prototype.toString = function() {
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

    function drawRandomCard(deck) {
        var currentCard = deck[Math.floor(Math.random() * deck.length)];
        return currentCard;
    }

    function deleteDrawedCard(deck, currentCard) {
        var currentIndex;
        deck.some(function(item, index) {
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
                currentImage.onload = function() {
                    context.drawImage(currentImage, alignX, alignY, 108, 154);
                };
                currentImage.src = card.Picture;

                playCardGameSound(card.Sound);
                // drawText(currentCard, context);
            }
        }
    }

    function dealThreePots(deck, context) {
        var firstPot = [],
            secondPot = [],
            thirdPot = [],
            i,
            len = deck.length;
        for (i = 0; i < len; i += 1) {
            console.log(deck[i]);

            if (i < 9) {
                firstPot.push(deck[i]);
                drawCard(deck[i], context, 20 + i * 20, 40);

            } else if (i >= 9 && i < 18) {

                secondPot.push(deck[i]);
                drawCard(deck[i], context, -160 + i * 20, 210);

            } else {
                thirdPot.push(deck[i]);
                drawCard(deck[i], context, -340 + i * 20, 370);

            }

        }
    }

    var cards = fillDeckWithCards();
    var cards2 = fillDeckWithCards();
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
        var submitButton = document.createElement('input');

        form.setAttribute('method', 'get');
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

        
        inputBox.innerHTML = '';
        inputBox.innerHTML += '<h1>Manhattan Project</h1></br> Chapter: Prediction</br>';
        inputBox.innerHTML += '<em>enter your favorite number within 1 and 27</em>';
        inputBox.style.borderLeft = '2px dotted black';
        inputBox.style.borderRight= '2px dotted black';
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

        container.appendChild(inputBox);
    }

    createInputPage('#numberContainer');

    $(document).ready(function() {   
        $('#numberContainer').slideDown(5000);
        $('.formBox').slideDown(4000);
        $("#pickInputNumber").on("keyup", function() {
            magicValue = $("input:text").val();
            // use value for potDealer.js
            // and fire staright to the next step of execution
        });
        $("#btnDrawCard").on("click", function() {
            var container = document.querySelector('#numberContainer');
            container.style.display = 'none';

            var currentCard = {};
            // window.scrollBy(0, 200);  
            for (var i = 1; i <= 27; i += 1) {
                currentCard = drawRandomCard(cards);
                drawCard(currentCard, context, 20 + i * 30, 40);
                cards = deleteDrawedCard(cards, currentCard);
                // hot to implement the fracking setTimeoit 
            }
        });
        $("#btnDrawPots").on("click", function() {

            console.log(magicValue); // magicValue is already ok here

            context.clearRect(0, 0, cardCanvas.width, cardCanvas.height);
            dealThreePots(cards2, context);
        });
    });
}());