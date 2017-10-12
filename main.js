// Success and Fail rolls by round number
var checkAgainst = {
        1: {'success': ['12', '21'], 'fail': ['33']},
        2: {'success': ['34', '43'], 'fail': ['33']},
        3: {'success': ['56', '65'], 'fail': ['33']}
    };

// Create a Game to track round and successful rolls
function Game() {
    this.round = 1;
    this.success = false;
    this.counter = 0
}

// Make Dice
function Die(num, value) {
    this.num = num;
    this.value = value;
    this.roll = function () {
        // Returns image of randomly generated number from 1-6, with 3 == angryDie
        this.num = Math.floor(Math.random() * 6) + 1;
        if (this.num === 3) {
            this.value = 'img/angry.png';
        } else {
            this.value = 'img/' + String(this.num) + '.png'
        }
    };
}

// Instantiate game and dice objects
var game = new Game();
var die1 = new Die(3, $('#die1').children().attr('src'));
var die2 = new Die(3, $('#die2').children().attr('src'));

function getValues() {
    var values = String(die1.num) + String(die2.num);
    return values
}

function rollIt() {
    if (!($('#hold1').hasClass('held'))) {
        die1.roll();
        $('#die1').children().attr('src', die1.value);
    }
    if (!($('#hold2').hasClass('held'))) {
        die2.roll();
        $('#die2').children().attr('src', die2.value);
    }
}

function holdIt(elem) {
    // Get value of Die
    if ($(elem).prev('div').attr('id') === 'die1') {
        var value = die1.num
    } else {
        var value = die2.num
    }
    // Hold all values except 6
    if (value !== 6) {
       $(elem).toggleClass('held');
        if ($(elem).hasClass('held')) {
            $(elem).html("HELD");
        } else {
            $(elem).html("HOLD")
        }
    } else {
        alert("You can't hold a six!")
    }
}

// Check for roll success/failure
function checkSuccess(Game) {
    var currentDice = getValues();
    console.log(currentDice);
    if (checkAgainst[Game.round]['success'].includes(currentDice)) {
        Game.success = true
    } else if (checkAgainst[Game.round]['fail'].includes(currentDice)) {
        Game.round = 1;
        $('#gameStatus').html("ANGRY DICE!! MOVING BACK TO ROUND " + Game.round)
    } else {
        Game.success = false
    }
}

// Check for round win/game win
function checkWin(Game) {
    if (Game.success === true) {
        if (Game.round === 3) {
            $('#gameStatus').html("YOU WIN THE GAME IN " + Game.counter + " MOVES!!");
            Game.round = 1;
            Game.success = false;
            Game.counter = 0
        } else {
            Game.round += 1;
            $('#gameStatus').html("NICE!! MOVING ON TO ROUND " + Game.round)
        }
    }
}

// ROLL
$('#roll').click(function () {
    $('#gameStatus').html("ROUND: " + game.round);
    rollIt();
    checkSuccess(game);
    checkWin(game);
    game.counter += 1
});

// HOLD
$('.content').first().find('button').click(function () {
    holdIt(this)
});

