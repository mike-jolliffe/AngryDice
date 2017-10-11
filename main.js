// Create a die object
function Die(value) {
    this.value = value;
    //this.roll = rollDie;
}

var die1 = new Die($('#die1 ').children().attr('src'));
console.log(die1.value);
// Create a function for displaying/changing the value of the die object

// Create a roll function that generates a random number from 1-6
// Change the non-held die to match the random number generator
// Create a function to hold/release dice
// Create a way to keep track of the round number, and track successes
