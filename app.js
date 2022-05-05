//variables
let squares = [];
let currentSnake = [3, 2, 1];
let direction = 1;
const width = 10;
let score = 0;
let intervalTime = 1000;
let speed = 0.9;
let timerId = 0;
let appleIndex = 0;

//dom selectors
const grid = document.querySelector(".grid");
const startButton = document.getElementById("start");
const scoreDisplay = document.getElementById("score");

function createGrid() {
  //create 100 of elements
  for (let i = 0; i < width * width; i++) {
    //create element
    const square = document.createElement("div");
    square.classList.add("square");
    //append in a grid container
    grid.append(square);
    //push it into square array
    squares.push(square);
  }
}

createGrid();

currentSnake.forEach((index) => {
  squares[index].classList.add("snake");
});

//start game
function startGame() {
  clearInterval(timerId);
  //remove the snake class
  currentSnake.forEach((index) => squares[index].classList.remove("snake"));
  //remove the apple
  squares[appleIndex].classList.remove("apple");

  //calling move functin repeatedly

  currentSnake = [3, 2, 1];
  score = 0;
  scoreDisplay.textContent = 0;
  intervalTime = 1000;
  timerId = setInterval(move, intervalTime);
  direction = 1;
  //make snake from current snake index
  currentSnake.forEach((index) => squares[index].classList.add("snake"));
  //remake apple
  generateApples();
}

function move() {
  if (
    (currentSnake[0] + width >= width * width && direction == 10) || //snake head hits bottom wall
    (currentSnake[0] % width === width - 1 && direction === 1) || //snake head hits right wall
    (currentSnake[0] % width === 0 && direction === -1) || //snake head hits left wall
    (currentSnake[0] - width < 10 && direction === -width) || //snake head hits up wall
    squares[currentSnake[0] + direction].classList.contains("snake")
  )
    return clearInterval(timerId);

  //remove last element from our current snake
  let tail = currentSnake.pop();

  //remove styling from it
  squares[tail].classList.remove("snake");
  //add square in the direction we are heading
  currentSnake.unshift(currentSnake[0] + direction);
  //getting apple
  if (squares[currentSnake[0]].classList.contains("apple")) {
    //if snake head has also contains class apple
    squares[currentSnake[0]].classList.remove("apple"); // remove class apple
    //grou our snake by adding sanke class to head
    squares[tail].classList.add("snake");

    //update current snake array
    currentSnake.push(tail);
    //generate apple again
    generateApples();
    //adding to score
    score++;
    //display the score
    scoreDisplay.textContent = `${score}`;
    //speed up snake
    intervalTime = intervalTime * speed;
    clearInterval(timerId);

    timerId = setInterval(move, intervalTime);
  }

  //style the element
  squares[currentSnake[0]].classList.add("snake");
}

generateApples();

function generateApples() {
  do {
    //generate random number
    appleIndex = Math.floor(Math.random() * squares.length);
  } while (squares[appleIndex].classList.contains("snake"));
  squares[appleIndex].classList.add("apple");
}

//keycode
//39 is right arrow
//38 is for the up arrow
//37 is for left arrow
//40 is for down arrow

function control(e) {
  if (e.keyCode === 39) {
    direction = 1;
  } else if (e.keyCode === 38) {
    direction = -width;
  } else if (e.keyCode === 37) {
    direction = -1;
  } else if (e.keyCode === 40) {
    direction = +width;
  }
}

document.addEventListener("keyup", control);
startButton.addEventListener("click", startGame);
