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
            potTurns+=" ";
        } else if (logic[i] === '1') {
            potTurns += 'MIDDLE';
            potTurns+=" ";
        } else if (logic[i] === '2') {
            potTurns += 'DOWN';
            potTurns+=" ";
        }


    }
    return potTurns;
}
