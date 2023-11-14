// Buttons and input
const user_guess = document.getElementById("user-input");
const guess_button = document.getElementById("guess-button");
const reset_button = document.getElementById("reset-button");
guess_button.addEventListener("click", run_game);
reset_button.addEventListener("click", reset_game);
// Random number
const correct_number = Math.floor((Math.random() * 100) + 1);
console.log(correct_number);
// Information for the user
const guesses_made = document.getElementById("guesses-made");
const user_guesses = document.getElementById("user-guesses");
const guesses_left = document.getElementById("guesses-left");
const info_text = document.getElementById("info-text");

let guesses_array = [];
let end = false;

function run_game() {
  // Get users guess
  let guess = Number(user_guess.value);
  // Check if usere actually typed something
  if (guess == "") {
    info_text.textContent = "You have to actually type something first. Duh..";
    return;
  }
  // Check if user already guessed this number before
  guesses_array.forEach(function (logged_guess) {
    if (guess == logged_guess) {
      info_text.textContent = `You already guessed on ${logged_guess} before.`;
      end = true;
    }
  })
  // If user didnt guess this number before, add it to the list of guesses made
  guesses_array.push(guess);
  // Stop the code from going further if user guessed a previously already guessed number
  if (end) {
    end = false;
    return;
  }
  // What should happen if guess is correct
  if (guess == correct_number) {
    guesses_made.textContent = Number(guesses_made.textContent) + 1;
    guesses_left.textContent = Number(guesses_left.textContent) - 1;
    info_text.textContent = `You got it! It was ${correct_number} all along.`;
    guess_button.disabled = true;
    return
  } // What should happen if guess was incorrect
  else if (guess != correct_number) {
    guesses_made.textContent = Number(guesses_made.textContent) + 1;
    guesses_left.textContent = Number(guesses_left.textContent) - 1;
    // If guess was too high
    if (guess > correct_number) {
      info_text.innerHTML = `Your guess was too <span class="high">high</span>.`;
      user_guesses.innerHTML += `<span class="high">${guess} </span>`;
    } // If guess was too low
    else {
      info_text.innerHTML = `Your guess was too <span class="low">low</span>.`;
      user_guesses.innerHTML += `<span class="low">${guess} </span>`;
    }
  }
  // If user is out of guesses
  if (Number(guesses_left.textContent) == 0) {
    info_text.textContent = `You lost, Bobby. It was ${correct_number}`;
    guess_button.disabled = true;
  }
}

function reset_game() {
  location.reload();
}