// Create a die object
function Die(value) {
    this.value = value;
    this.roll = function () {
        // Returns image of randomly generated number from 1-6, with 3 == angryDie
        var rollResult = Math.floor(Math.random() * 6) + 1;
        if (rollResult === 3) {
            this.value = 'img/angry.png';
        } else {
            this.value = 'img/' + String(rollResult) + '.png'
        }
    };
}

var die1 = new Die($('#die1').children().attr('src'));
var die2 = new Die($('#die2').children().attr('src'));

// Display/change the value of the die object
$('#roll').click(function () {
    if (!($('#hold1').hasClass('held'))) {
        die1.roll();
        $('#die1 ').children().attr('src', die1.value);
    }
    if (!($('#hold2').hasClass('held'))) {
        die2.roll();
        $('#die2').children().attr('src', die2.value);
    }
});

// Click toggles die status to Hold/Held
$('.content').first().find('button').click(function () {
    $(this).toggleClass('held');
    if ($(this).hasClass('held')) {
        $(this).html("HELD");
    } else {
        $(this).html("HOLD")
    }
});

// Change the non-held die to match the random number generator
// Create a function to hold/release dice
// Create a way to keep track of the round number, and track successes
