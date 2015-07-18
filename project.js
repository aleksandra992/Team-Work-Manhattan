/**
 * Created by Aleksandra on 7/18/2015.
 */
function cardTrick27(userSelectedNumber) {


    var result = (function () {
        var baseThree = userSelectedNumber.toString(3);
        var result = {
            firstHand: baseThree[0],
            secondHand: baseThree[1],
            lastHnad: baseThree[2]
        };

        function resultTranslator(result) {
            for (var prop in result) {
                if (result.hasOwnProperty(prop)) {
                    handFixer(prop);
                }
            }
            function handFixer(hand) {
                if (result[hand] === '0') {
                    result[hand] = 'TOP';
                } else if (result[hand] === '1') {
                    result[hand] = 'MIDDLE';
                } else if (result[hand] === '2') {
                    result[hand] = 'DOWN';
                } else {
                    result[hand] = 'TOP';
                }
            }

            function toString(result) {
                return '1.' + result.firstHand + ' \n2.' + result.secondHand + ' \n3.' + result.lastHnad + '\n';
            }

            return toString(result);
        }

        result = resultTranslator(result);
        return result;
    }());
    return result;
}


console.log(cardTrick27(8));
