var checkAgainst = {
        1: {'success': ['12', '21'], 'fail': ['33']},
        2: {'success': ['34', '43'], 'fail': ['33']},
        3: {'success': ['56', '65'], 'fail': ['33']}
    };

// Create a game object
function Game() {
    this.round = 1;
    this.success = false;
    this.checkSuccess = function() {
        var currentDice = getValues();
        console.log(currentDice);
        if (checkAgainst[this.round]['success'].includes(currentDice)) {
            this.success = true
        } else if (checkAgainst[this.round]['fail'].includes(currentDice)) {
            this.round = 1;
            $('#gameStatus').html("ANGRY DICE!! MOVING BACK TO ROUND " + this.round)
        } else {
            this.success = false
        }
    };
    this.checkWin = function() {
        if (this.success == true) {
            if (this.round === 3) {
                $('#gameStatus').html("YOU WIN THE GAME!!")
            } else {
                this.round += 1;
                $('#gameStatus').html("NICE!! MOVING ON TO ROUND " + this.round)
            }
        }
    }
}

// Create a die object
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

// Instantiate the game and two die objects
var game = new Game();
var die1 = new Die(3, $('#die1').children().attr('src'));
var die2 = new Die(3, $('#die2').children().attr('src'));

function getValues() {
    var values = String(die1.num) + String(die2.num);
    return values
}

// Display/change the value of the die object
$('#roll').click(function () {
    if (!($('#hold1').hasClass('held'))) {
        die1.roll();
        $('#die1').children().attr('src', die1.value);
    }
    if (!($('#hold2').hasClass('held'))) {
        die2.roll();
        $('#die2').children().attr('src', die2.value);
    }
    game.checkSuccess();
    game.checkWin()
});

// Click toggles die status to Hold/Held
$('.content').first().find('button').click(function () {
    if ($(this).value !== 6) {
        $(this).toggleClass('held');
        if ($(this).hasClass('held')) {
            $(this).html("HELD");
        } else {
            $(this).html("HOLD")
        }
    } else {
        alert("You can't hold a six")
    }

});

// TODO Disallow holding a die with value 6
