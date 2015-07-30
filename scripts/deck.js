var Deck=(function(){
    var deckOfCard = [];
    var Deck = {
        init: function(name) {
            this.name = name;
            return this;
        },
        fillDeckWithCards: function() {

            deckOfCard.push(Object.create(Card).init('Ace', suitType.Diamond, 14, 'Images/classic-cards/01_of_diamonds_A.svg', 'sounds/cardPlace1.wav'));
            deckOfCard.push(Object.create(Card).init('Ace', suitType.Clubs, 14, 'Images/classic-cards/01_of_clubs_A.svg', 'sounds/cardPlace2.wav'));
            deckOfCard.push(Object.create(Card).init('Ace', suitType.Heart, 14, 'Images/classic-cards/01_of_hearts_A.svg', 'sounds/cardPlace3.wav'));
            deckOfCard.push(Object.create(Card).init('Ace', suitType.Spade, 14, 'Images/classic-cards/01_of_spades_A.svg', 'sounds/cardPlace4.wav'));
            deckOfCard.push(Object.create(Card).init('King', suitType.Diamond, 13, 'Images/classic-cards/King_of_diamonds2.svg', 'sounds/cardPlace1.wav'));
            deckOfCard.push(Object.create(Card).init('King', suitType.Clubs, 13, 'Images/classic-cards/King_of_clubs2.svg', 'sounds/cardPlace2.wav'));
            deckOfCard.push(Object.create(Card).init('King', suitType.Heart, 13, 'Images/classic-cards/King_of_hearts2.svg', 'sounds/cardPlace3.wav'));
            deckOfCard.push(Object.create(Card).init('King', suitType.Spade, 13, 'Images/classic-cards/King_of_spades2.svg', 'sounds/cardPlace4.wav'));
            deckOfCard.push(Object.create(Card).init('Queen', suitType.Diamond, 12, 'Images/classic-cards/Queen_of_diamonds2.svg', 'sounds/cardPlace1.wav'));
            deckOfCard.push(Object.create(Card).init('Queen', suitType.Clubs, 12, 'Images/classic-cards/Queen_of_clubs2.svg', 'sounds/cardPlace2.wav'));
            deckOfCard.push(Object.create(Card).init('Queen', suitType.Heart, 12, 'Images/classic-cards/Queen_of_hearts2.svg', 'sounds/cardPlace3.wav'));
            deckOfCard.push(Object.create(Card).init('Queen', suitType.Spade, 12, 'Images/classic-cards/Queen_of_spades2.svg', 'sounds/cardPlace4.wav'));
            deckOfCard.push(Object.create(Card).init('Jack', suitType.Diamond, 11, 'Images/classic-cards/Jack_of_diamonds2.svg', 'sounds/cardPlace1.wav'));
            deckOfCard.push(Object.create(Card).init('Jack', suitType.Clubs, 11, 'Images/classic-cards/Jack_of_clubs2.svg', 'sounds/cardPlace1.wav'));
            deckOfCard.push(Object.create(Card).init('Jack', suitType.Heart, 11, 'Images/classic-cards/Jack_of_hearts2.svg', 'sounds/cardPlace1.wav'));
            deckOfCard.push(Object.create(Card).init('Jack', suitType.Spade, 11, 'Images/classic-cards/Jack_of_spades2.svg', 'sounds/cardPlace1.wav'));
            deckOfCard.push(Object.create(Card).init('Ten', suitType.Diamond, 10, 'Images/classic-cards/10_of_diamonds_-_David_Bellot.svg', 'sounds/cardPlace2.wav'));
            deckOfCard.push(Object.create(Card).init('Ten', suitType.Clubs, 10, 'Images/classic-cards/10_of_clubs_-_David_Bellot.svg', 'sounds/cardPlace2.wav'));
            deckOfCard.push(Object.create(Card).init('Ten', suitType.Heart, 10, 'Images/classic-cards/10_of_hearts_-_David_Bellot.svg', 'sounds/cardPlace2.wav'));
            deckOfCard.push(Object.create(Card).init('Ten', suitType.Spade, 10, 'Images/classic-cards/10_of_spades_-_David_Bellot.svg', 'sounds/cardPlace2.wav'));
            deckOfCard.push(Object.create(Card).init('Nine', suitType.Diamond, 9, 'Images/classic-cards/09_of_diamonds.svg', 'sounds/cardPlace3.wav'));
            deckOfCard.push(Object.create(Card).init('Nine', suitType.Clubs, 9, 'Images/classic-cards/09_of_clubs.svg', 'sounds/cardPlace3.wav'));
            deckOfCard.push(Object.create(Card).init('Nine', suitType.Heart, 9, 'Images/classic-cards/09_of_hearts.svg', 'sounds/cardPlace3.wav'));
            deckOfCard.push(Object.create(Card).init('Nine', suitType.Spade, 9, 'Images/classic-cards/09_of_spades.svg', 'sounds/cardPlace3.wav'));
            deckOfCard.push(Object.create(Card).init('Eight', suitType.Diamond, 8, 'Images/classic-cards/08_of_diamonds.svg', 'sounds/cardPlace4.wav'));
            deckOfCard.push(Object.create(Card).init('Eight', suitType.Clubs, 8, 'Images/classic-cards/08_of_clubs.svg', 'sounds/cardPlace4.wav'));
            deckOfCard.push(Object.create(Card).init('Eight', suitType.Heart, 8, 'Images/classic-cards/08_of_hearts.svg', 'sounds/cardPlace4.wav'));

            return deckOfCard.slice();


        },
        getRandomCard: function(deck) {
            var currentCard = deck[Math.floor(Math.random() * deck.length)];
            return currentCard;
        },
        deleteDrawedCard: function(deck, currentCard) {
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

    };
    return Deck;
}());
