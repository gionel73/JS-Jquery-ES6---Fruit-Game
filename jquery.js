var action, livesLeft, score, playing;
const fruits = ["images/apple.jpg", "images/lemon.jpg", "images/pumpkin.jpg", "images/banana.jpg", "images/cherry.jpg"];

$(() => {

    $("#lives").hide();
    startGame();


// ---------------------
function startGame() {

    $("#reset").click( () => playing ? location.reload() : gameCtrl() );
}
// ---------------------
function gameCtrl() {
    gameInit();
    startAction();
    $("#fruits").mouseover(() => {
        score++;
        displayScore();
        $("#sound")[0].play(); // play sound
        stopAction();
        setTimeout(startAction, 400);
    });
}
// ---------------------
function gameInit() {
    livesLeft = 3;
    score = 0;
    playing = true;
    $("#lives").show();
    $("#game-over").hide();
    displayScore();
    displayLives();
    displayStart();
}
// ---------------------
function startAction() {
    let step;
    step = Math.round(Math.random() * 5) + 2;
    setFruit();
    action = setInterval(() => {
        $("#fruits").css('top', $("#fruits").position().top + step);
        if ( $("#fruits").position().top > ($("#game-window").height() - 30)) {
            if (--livesLeft > 0) {
                $("#fruits").hide();
                displayLives();
                setFruit();
                step = Math.round(Math.random() * 5) + 2;
            } else {
                playing = false;
                displayStart();
                $("#lives").hide();
                clearInterval(action);
                $("#fruits").hide();
                $("#game-over").css('display', 'flex');
                $("#final-score").text(score);
            }
        }
    }, 10);
}
// ---------------------
function setFruit() {
    let fruitNr, posX;
    fruitNr = Math.floor(Math.random() * 5);
    $("#fruits").attr('src', `${fruits[fruitNr]}`);
    posX = Math.floor(Math.random() * 500) + 50;
    $("#fruits").css({
        'left': posX,
        'top': -70
    });
    $("#fruits").show();
}
// ---------------------
function displayScore() {
    $("#score-value").text(score);
}
// ---------------------
function displayLives() {
    $("#lives-left").empty();
    for (let i = 0; i < livesLeft; i++) {
        $("#lives-left").append(`<img src="images/heart.ico" class="life">`);
    }
}
// ---------------------
function displayStart() {
    if (playing) {
        $("#reset").text("Reset Game");
    } else {
        $("#reset").text("Start Game");
    }
}
// ---------------------
function stopAction() {
    clearInterval(action);
    $("#fruits").hide("explode", 400);
}
//-----------------------
});
