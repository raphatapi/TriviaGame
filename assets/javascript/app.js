// Set variables
var questions = ["Who is the character that lives under sticks?", "Who is Pooh Bear's best friend?", "What is Winnie the Pooh's favorite food?", "Who is Lumpy?", "Which character grows lots of vegetables in his garden?", "What is Tigger's Favorite Thing to Do?", "Which character is wise?", "Who calls Pooh a 'Silly old bear'?", "In which wood do Pooh and his friends have their adventures?", "What are the Hundred Acre Wood gang afraid of?"];
var choices = [["Winnie The Pooh", "Kanga", "Eeyore", "Tigger"], ["Piglet", "Rabbit", "Roo", "Owl"], ["Thistles", "Carrots", "Rutabaga", "Honey"], ["A monster", "The baby Heffalump", "The camel", "The Hunchback of Notre Dame"], ["Rabbit", "Piglet", "Eeyore", "Christopher Robin"], ["Make his bed", "Wash dishes", "Bounce", "Put toys away"], ["Winnie The Pooh", "Roo", "Owl", "Tigger"], ["Piglet", "Owl", "Kanga", "Christopher Robin"], ["Muir Woods", "Hundred Acre Wood", "Redwood", "Thistles Wood"], ["The Backson", "Snow", "Bees", "Roller Coasters"]];
var images = ["<img class='center-block img-answer' src='assets/images/eeyore.gif'>", "<img class='center-block img-answer' src='assets/images/piglet.gif'>", "<img class='center-block img-answer' src='assets/images/honey.gif'>", "<img class='center-block img-answer' src='assets/images/lumpy.gif'>", "<img class='center-block img-answer' src='assets/images/rabbit.gif'>", "<img class='center-block img-answer' src='assets/images/bounce.gif'>", "<img class='center-block img-answer' src='assets/images/owl.gif'>", "<img class='center-block img-answer' src='assets/images/christopher_robin.gif'>", "<img class='center-block img-answer' src='assets/images/haw.gif'>", "<img class='center-block img-answer' src='assets/images/backson.gif'>"];
var correct = ["Eeyore", "Piglet", "Honey", "The baby Heffalump", "Rabbit", "Bounce", "Owl", "Christopher Robin", "Hundred Acre Wood", "The Backson"];
var selectedAnswer;
var currentQuestion = 0;
var correctAnswers = 0;
var wrongAnswers = 0;
var timer;
var counter = 30;
var triviaHTML;
var startTrivia; 



$(document).ready(function() {

    function greeting() {
		startTrivia = $("<button>");
		startTrivia.addClass("text-center btn btn-warning btn-lg startBtn");
		startTrivia.text("Start Trivia");
		$(".main-area").html(startTrivia);
	};

	greeting();

    $(".startBtn").on("click", function(event){
		gameHTML();
		timerTrivia();
	});

    $(".reset-button").on("click", function(event) {
        resetTrivia();
    });
});

function triviaTimeOut() {
	wrongAnswers++;
    triviaHTML = "<p class='text-center timer-p'>Time Remaining: <span class='timer'>" + counter + "</span></p>";
    $(".main-area").html(triviaHTML);
    setTimeout(wait, 4000);
    var loss = $("<p>");
    loss.addClass("text-center");
    loss.text("You ran out of time!  The correct answer is: " + correct[currentQuestion]);
    $(".main-area").append(loss);
    var lossImg = $("<img>");
    lossImg.addClass("center-block img-answer");
    lossImg.attr("src", "assets/images/wrong.gif");
    $(".main-area").append(lossImg);
	// wrongAnswers++;
	// triviaHTML = "<p class='text-center timer-p'>Time Remaining: <span class='timer'>" + counter + "</span></p>" + "<p class='text-center'>You ran out of time!  The correct answer is: " + correct[currentQuestion] + "</p>" + "<img class='center-block img-sad' src='assets/images/wrong.gif'>";
	// $(".main-area").html(triviaHTML);
	// setTimeout(wait, 4000);
}

function triviaWin() {
    correctAnswers++;
    triviaHTML = "<p class='text-center timer-p'>Time Remaining: <span class='timer'>" + counter + "</span></p>";
    $(".main-area").html(triviaHTML);
    setTimeout(wait, 4000);
    var win = $("<p>");
    win.addClass("text-center");
    win.text("Hooray! The answer is: " + correct[currentQuestion]);
    $(".main-area").append(win);
    $(".main-area").append(images[currentQuestion]);
};

function triviaLoss() {
    wrongAnswers++;
    triviaHTML = "<p class='text-center timer-p'>Time Remaining: <span class='timer'>" + counter + "</span></p>";
    $(".main-area").html(triviaHTML);
    setTimeout(wait, 4000);
    var loss = $("<p>");
    loss.addClass("text-center");
    loss.text("Oh, Bother! The correct answer is: " + correct[currentQuestion]);
    $(".main-area").append(loss);
    var lossImg = $("<img>");
    lossImg.addClass("center-block img-answer");
    lossImg.attr("src", "assets/images/wrong.gif");
    $(".main-area").append(lossImg);
};

function gameHTML() {
	triviaHTML = "<p class='text-center timer-p'>Time Remaining: <span class='timer'>30</span></p><p class='text-center'>" + questions[currentQuestion] + "</p>";
    $(".main-area").html(triviaHTML);  
    for (var i = 0; i < 4; i++) {
    	var answerBtn = $("<button>");
    	answerBtn.addClass("text-center btn btn-warning btn-lg answer");
    	answerBtn.text(choices[currentQuestion][i]);
    	$(".main-area").append(answerBtn);
    }

    $(".answer").on("click", function(event){
        selectedAnswer = $(this).text();
        if (selectedAnswer === correct[currentQuestion]) {
 			triviaWin();
 			clearInterval(timer);
          
        } else {
            clearInterval(timer);
            triviaLoss();
        };
    });
};

function wait() {
    if (currentQuestion < 9) {
        currentQuestion++;
        gameHTML();
        counter = 30;
        timerTrivia();
    }
    else {
        results();
    }
};

function timerTrivia() {
	timer = setInterval(thirtySeconds, 1000);
	function thirtySeconds() {
		if (counter === 0) {
			clearInterval(timer);
			triviaTimeOut();
		}
		if (counter > 0) {
			counter--;
		}
		$(".timer").html(counter);
	};
};

function results() {
	triviaHTML = "<p class='text-center timer-p'>Time Remaining: <span class='timer'>" + counter + "</span></p>" + "<h2 class='text-center'>And the results are..." + "</h2>" + "<p class='summary-correct text-center'>Correct Answers: " + correctAnswers + "</p>" + "<p class='text-center'>Wrong Answers: " + wrongAnswers + "</p>" + "<p class='text-center reset-button-container'><a class='btn btn-warning btn-lg reset-button' href='#' role='button'>Play Again!</a></p>";
	$(".main-area").html(triviaHTML);
};

function resetTrivia() {
	window.location.reload();
};