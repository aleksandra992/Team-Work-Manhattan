var Card=(function(){
    var Card = {
        init: function(name, suitType, cardValue, picture, sound) {
            this.Name = name;
            this.SuitType = suitType;
            this.CardValue = cardValue;
            this.Picture = picture;
            this.Sound = sound;
            return this;
        },
        playCardGameSound: function(soundResource) {
            if (soundResource) {
                var currentAudio = new Audio();
                currentAudio.src = soundResource;
                currentAudio.play();
            }
        },
        drawCard: function( context, alignX, alignY, width, height) {

            if (context) {

                if (this) {
                    var currentImage = new Image();
                    currentImage.onload = function() {
                        context.drawImage(currentImage, alignX, alignY, width, height);
                    };
                    currentImage.src = this.Picture;

                    this.playCardGameSound(this.Sound);
                }
            }
        },
        drawCardBack: function(context, alignX, alignY, width, height) {

            if (context) {
                var cardBack = new Image();
                cardBack.src = 'images/back.jpg';
                cardBack.onload = function() {
                    context.drawImage(cardBack, alignX, alignY, width, height);
                    Card.playCardGameSound('sounds/cardPlace1.wav');
                };
            }
        },
        rotateMagicCard: function( context, alignX, alignY, height, width) {

            if (context) {
                if (this) {
                    var currentImage = new Image();
                    var angle = 0; //angle

                    document.getElementById("cardCanvas").style.paddingLeft = "275px";
                    document.getElementById("cardCanvas").style.paddingRight = "250px";

                    currentImage.onload = function() {
                        var cardCanvas = document.getElementById("cardCanvas");
                        cardCanvas.width = this.width << 1; //double the canvas width
                        cardCanvas.height = this.height << 1; //double the canvas height
                        var cache = this; //cache the local copy of image element for future reference

                        var rotateCard = setInterval(function() {
                            rotateCardTimer();
                        }, TIMERS.ROTATION_SPEED_FPS);

                        function rotateCardTimer() {
                            context.save(); //saves the state of canvas
                            context.clearRect(0, 0, cardCanvas.width, cardCanvas.height); //clear the canvas
                            context.translate(cache.width, cache.height);
                            context.rotate(Math.PI / 180 * (angle += 1)); //increm ent the angle and rotate the image
                            context.drawImage(currentImage, -cache.width / 2, -cache.height / 2, cache.width, cache.height);
                            context.restore(); //restore the state of canvas
                            if (angle === 180 * ROTATE_GUESSED_CARD) {
                                clearInterval(rotateCard);
                            }
                        }
                    };
                    currentImage.src = this.Picture;
                }
            }
        }
    };
    return Card;

}());