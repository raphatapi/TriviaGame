// Create a jQery prototype to make it easier to use it later
var timer;
var startBtn;
var selectedAnswer;
var questionCounter = 0;
var correctAnswers = 0;
var wrongAnswers = 0;
var counter = 30;
var triviaHTML; 
var questions = ["Who is the character that lives under sticks?", "Who is Pooh Bear's best friend?", "What is Winnie the Pooh's favorite food?", "Who is Lumpy?", "Which character grows lots of vegetables in his garden?", "What is Tigger's Favorite Thing to Do?", "Which character is wise?", "Who calls Pooh a 'Silly old bear'?", "In which wood do Pooh and his friends have their adventures?", "What are the Hundred Acre Wood gang afraid of?"];
var choices = [["Winnie The Pooh", "Kanga", "Eeyore", "Tigger"], ["Piglet", "Rabbit", "Roo", "Owl"], ["Thistles", "Carrots", "Rutabaga", "Honey"], ["A monster", "The baby Heffalump", "The camel", "The Hunchback of Notre Dame"], ["Rabbit", "Piglet", "Eeyore", "Christopher Robin"], ["Make his bed", "Wash dishes", "Bounce", "Put toys away"], ["Winnie The Pooh", "Roo", "Owl", "Tigger"], ["Piglet", "Owl", "Kanga", "Christopher Robin"], ["Muir Woods", "Hundred Acre Wood", "Redwood", "Thistles Wood"], ["The Backson", "Snow", "Bees", "Roller Coasters"]];
var images = ["<img class='center-block img-eeyore' src='assets/images/eeyore.gif'>", "<img class='center-block img-piglet' src='assets/images/piglet.gif'>", "<img class='center-block img-honey' src='assets/images/honey.gif'>", "<img class='center-block img-lumpy' src='assets/images/lumpy.gif'>", "<img class='center-block img-bounce' src='assets/images/bounce.gif'>", "<img class='center-block img-owl' src='assets/images/owl.gif'>", "<img class='center-block img-cr' src='assets/images/christopher_robin.gif'>", "<img class='center-block img-haw' src='assets/images/haw.gif'>", "<img class='center-block img-backson' src='assets/images/backson.gif'>"];
var correct = ["Eeyore", "Piglet", "Honey", "The baby Heffalump", "Rabbit", "Bounce", "Owl", "Christopher Robin", "Hundred Acre Wood", "Backson"];


$(document).ready(function() {

    function greeting() {
    	startBtn = $("<button>");
    	startBtn.addClass("btn btn-warning btn-lg btn-block start-button");
    	startBtn.text("Start Trivia");
    	$("#start").append(startBtn);

    	$("#start").on("click", function() {
    		$(this).remove();
            gameHTML();
            timerWrapper();
    	});
    };

    greeting();

    $("body").on("click", ".answer", function(event){
        selectedAnswer = $(this).text();
        if(selectedAnswer !== correct[questionCounter]) {
 			console.log("correct!");
            clearInterval(timer);
            triviaWin();
        }
        else {
            clearInterval(timer);
            triviaLoss();
        }
    });

    $("body").on("click", ".reset", function(event) {
        resetTrivia();
    });
});

function triviaTimeOut() {
	wrongAnswers++;
	triviaHTML = "<p class='text-center timer-p'>Time Remaining: <span class='timer'>" + counter + "</span></p>" + "<p class='text-center'>You ran out of time!  The correct answer is: " + correct[questionCounter] + "</p>" + "<img class='center-block img-sad' src='assets/images/wrong.gif'>";
	$(".main-area").html(triviaHTML);
	setTimeout(wait, 4000);  //  change to 4000 or other amount
}

function triviaWin() {
    correctAnswers++;
    // var triviaQuestion = trivia[questionCounter];
    triviaHTML = "<p class='text-center timer-p'>Time Remaining: <span class='timer'>" + counter + "</span></p>" + "<p class='text-center'>Correct! The answer is: " + correct[questionCounter] + "</p>" + images[questionCounter];
    $(".main-area").html(triviaHTML);
    setTimeout(wait, 4000);  //  change to 4000 or other amount
};

function triviaLoss() {
    wrongAnswers++;
    // var triviaQuestion = trivia[questionCounter];
    triviaHTML = "<p class='text-center timer-p'>Time Remaining: <span class='timer'>" + counter + "</span></p>" + "<p class='text-center'>Wrong! The correct answer is: "+ correct[questionCounter] + "</p>" + "<img class='center-block img-sad' src='assets/images/wrong.gif'>";
    $(".main-area").html(triviaHTML);
    setTimeout(wait, 4000); //  change to 4000 or other amount
};

function gameHTML() {
    // var triviaQuestion = trivia[questionCounter];
    triviaHTML = "<p class='text-center timer-p'>Time Remaining: <span class='timer'>30</span></p><p class='text-center'>" + questions[questionCounter] + "</p><p class='first-answer answer'>A. " + choices[questionCounter][0] + "</p><p class='answer'>B. "+ choices[questionCounter][1] + "</p><p class='answer'>C. "+ choices[questionCounter][2] + "</p><p class='answer'>D. "+ choices[questionCounter][3] + "</p>";
    $(".main-area").html(triviaHTML);
};

function wait() {
    if (questionCounter < 9) {
        questionCounter++;
        gameHTML();
        counter = 30;
        timerWrapper();
    }
    else {
        finalScreen();
    }
};

function timerWrapper() {
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

function finalScreen() {
	triviaHTML = "<p class='text-center timer-p'>Time Remaining: <span class='timer'>" + counter + "</span></p>" + "<p class='text-center'>All done, here's how you did!" + "</p>" + "<p class='summary-correct'>Correct Answers: " + correctAnswers + "</p>" + "<p>Wrong Answers: " + wrongAnswers + "</p>" + "<p class='text-center reset-button-container'><a class='btn btn-warning btn-lg btn-block reset-button' href='#' role='button'>Reset The Quiz!</a></p>";
	$(".main-area").html(triviaHTML);
};

function resetTrivia() {
	questionCounter = 0;
	correctAnswers = 0;
	wrongAnswers = 0;
	counter = 30;
	gameHTML();
	timerWrapper();
}