var ThreePots=(function(){
    var ThreePots = {
        init: function() {

            return this;
        },
        getThreePots: function(cardDeck, Deck) {
            var currentDeck = cardDeck.slice(),
                firstPot = [],
                secondPot = [],
                thirdPot = [],
                currentCard = {};

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
            };
        },
        potDealer: function(number) {
            var logicForNumbers = ['000', '100', '200',
                '010', '110', '210',
                '020', '120', '220',
                '001', '101', '201',
                '011', '111', '211',
                '021', '121', '221',
                '002', '102', '202',
                '012', '112', '212',
                '022', '122', '222'
            ];
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
        dealThreePots: function(threePots, context, Card) {
            var firstPot = threePots.firstPot,
                secondPot = threePots.secondPot,
                thirdPot = threePots.thirdPot,
                i = 0;

            var giveThreePots = setInterval(function() {
                threePotsTimer(Card);
            }, TIMERS.GIVE_CARDS_MS);

            function threePotsTimer(Card) {
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
            };
        },
        shuffleCards: function(currentThreePots, threePots) {
            var i;
            currentMixedPots = {
                firstPot: [],
                secondPot: [],
                thirdPot: [],
            };
            for (i = 0; i < NUMBER_OF_CARDS.POT; i++) {
                if (i % 3 === 0) {
                    currentMixedPots.firstPot.push(currentThreePots.firstPot[i]);
                } else if (i % 3 === 1) {
                    currentMixedPots.secondPot.push(currentThreePots.firstPot[i]);
                } else if (i % 3 === 2) {
                    currentMixedPots.thirdPot.push(currentThreePots.firstPot[i]);
                }
            }
            for (i = 0; i < NUMBER_OF_CARDS.POT; i++) {
                if (i % 3 === 0) {
                    currentMixedPots.firstPot.push(currentThreePots.secondPot[i]);
                } else if (i % 3 === 1) {
                    currentMixedPots.secondPot.push(currentThreePots.secondPot[i]);
                } else if (i % 3 === 2) {
                    currentMixedPots.thirdPot.push(currentThreePots.secondPot[i]);
                }
            }
            for (i = 0; i < NUMBER_OF_CARDS.POT; i++) {
                if (i % 3 === 0) {
                    currentMixedPots.firstPot.push(currentThreePots.thirdPot[i]);
                } else if (i % 3 === 1) {
                    currentMixedPots.secondPot.push(currentThreePots.thirdPot[i]);
                } else if (i % 3 === 2) {
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
        PutFirstOnPlace: function(turn, currentPotTurns, currentThreePots, threePots, gameInstructionsCounter) {

            if (currentPotTurns[turn] === 'TOP') { //put the current pot on the top
                console.log('top');
                currentThreePots.firstPot = threePots.firstPot.slice();
                currentThreePots.secondPot = threePots.secondPot.slice();
                currentThreePots.thirdPot = threePots.thirdPot.slice();
            }
            if (currentPotTurns[turn] === 'MIDDLE') { //put the current pot in the middle
                console.log('middle');
                currentThreePots.secondPot = threePots.firstPot.slice();
                currentThreePots.firstPot = threePots.secondPot.slice();
                currentThreePots.thirdPot = threePots.thirdPot.slice();
            }
            if (currentPotTurns[turn] === 'DOWN') { //put the current pot on the bottom
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
        PutSecondOnPlace: function(turn, currentPotTurns, currentThreePots, threePots, gameInstructionsCounter) {

            if (currentPotTurns[turn] === 'TOP') { //put the current pot on the top
                console.log('top');
                currentThreePots.firstPot = threePots.secondPot.slice();
                currentThreePots.secondPot = threePots.firstPot.slice();
                currentThreePots.thirdPot = threePots.thirdPot.slice();
            }
            if (currentPotTurns[turn] === 'MIDDLE') { //put the current pot in the middle
                console.log('middle');
                currentThreePots.secondPot = threePots.secondPot.slice();
                currentThreePots.firstPot = threePots.firstPot.slice();
                currentThreePots.thirdPot = threePots.thirdPot.slice();
            }
            if (currentPotTurns[turn] === 'DOWN') { //put the current pot on the bottom
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
        PutThirdOnPlace: function(turn, currentPotTurns, currentThreePots, threePots, gameInstructionsCounter) {

            if (currentPotTurns[turn] === 'TOP') { //put the current pot on the top
                console.log('top');
                currentThreePots.firstPot = threePots.thirdPot.slice();
                currentThreePots.secondPot = threePots.secondPot.slice();
                currentThreePots.thirdPot = threePots.firstPot.slice();
            }
            if (currentPotTurns[turn] === 'MIDDLE') { //put the current pot in the middle
                console.log('middle');
                currentThreePots.secondPot = threePots.thirdPot.slice();
                currentThreePots.firstPot = threePots.firstPot.slice();
                currentThreePots.thirdPot = threePots.secondPot.slice();
            }
            if (currentPotTurns[turn] === 'DOWN') { //put the current pot on the bottom
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
    };
    return ThreePots;
}());
