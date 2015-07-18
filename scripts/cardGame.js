(function() {

	var suitType = {Diamond: 'Diamond', Heart: 'Heart', Spade: 'Spade', Clubs: 'Club'};
	var deckOfCard = [];

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

	var savedDeck = deckOfCard.slice();

	function drawRandomCard() {
		var currentCard = deckOfCard[Math.floor(Math.random() * deckOfCard.length)];
		var index = deckOfCard.indexOf(currentCard);
		if (index > -1) {
			deckOfCard.splice(index, 1);
		}
		if (deckOfCard.length == 0) {
			deckOfCard = savedDeck.slice();
		}
		return currentCard;
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

	function drawCard(alignX, alignY) {

		var cardCanvas = document.getElementById("cardCanvas");
		var context = cardCanvas.getContext("2d");

			if (context) {		
				var currentCard = drawRandomCard();
				if (currentCard) {
					var currentImage = new Image();
					currentImage.onload = function () {
						context.drawImage(currentImage, alignX, alignY, 108, 154);
					};
					currentImage.src = currentCard.Picture;

					playCardGameSound(currentCard.Sound);

					// drawText(currentCard, context);
				}			
			}

		
	}
	$(document).ready(function() {
		$("#btnDrawCard").on("click", function() {
			for (var i = 1; i <= 27; i+=1) {
				drawCard(20+i*30, 40);	
				// hot to implement the fracking setTimeoit ?
			}
		});
	});
}());