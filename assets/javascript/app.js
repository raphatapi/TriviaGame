// Set variables
var questions = ["Who is the character that lives under sticks?", "Who is Pooh Bear's best friend?", "What is Winnie the Pooh's favorite food?", "Who is Lumpy?", "Which character grows lots of vegetables in his garden?", "What is Tigger's Favorite Thing to Do?", "Which character is wise?", "Who calls Pooh a 'Silly old bear'?", "In which wood do Pooh and his friends have their adventures?", "What are the Hundred Acre Wood gang afraid of?"];
var choices = [["Winnie The Pooh", "Kanga", "Eeyore", "Tigger"], ["Piglet", "Rabbit", "Roo", "Owl"], ["Thistles", "Carrots", "Rutabaga", "Honey"], ["A monster", "The baby Heffalump", "The camel", "The Hunchback of Notre Dame"], ["Rabbit", "Piglet", "Eeyore", "Christopher Robin"], ["Make his bed", "Wash dishes", "Bounce", "Put toys away"], ["Winnie The Pooh", "Roo", "Owl", "Tigger"], ["Piglet", "Owl", "Kanga", "Christopher Robin"], ["Muir Woods", "Hundred Acre Wood", "Redwood", "Thistles Wood"], ["The Backson", "Snow", "Bees", "Roller Coasters"]];
var images = ["<img class='center-block img-eeyore' src='assets/images/eeyore.gif'>", "<img class='center-block img-piglet' src='assets/images/piglet.gif'>", "<img class='center-block img-honey' src='assets/images/honey.gif'>", "<img class='center-block img-lumpy' src='assets/images/lumpy.gif'>", "<img class='center-block img-rabbit' src='assets/images/rabbit.gif'>", "<img class='center-block img-bounce' src='assets/images/bounce.gif'>", "<img class='center-block img-owl' src='assets/images/owl.gif'>", "<img class='center-block img-cr' src='assets/images/christopher_robin.gif'>", "<img class='center-block img-haw' src='assets/images/haw.gif'>", "<img class='center-block img-backson' src='assets/images/backson.gif'>"];
var correct = ["Eeyore", "Piglet", "Honey", "The baby Heffalump", "Rabbit", "Bounce", "Owl", "Christopher Robin", "Hundred Acre Wood", "Backson"];
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
		startTrivia = "<p class='text-center main-button-container'><a class='btn btn-warning btn-lg startBtn' href='#' role='button'>Start Trivia</a></p>";
		$(".main-area").html(startTrivia);
	};

	greeting();

    $("body").on("click", ".startBtn", function(event){
		gameHTML();
		timerTrivia();
	});

    //HEY PAUL CAN YOU HELP ME? SOMETHING WITH THE CONDITION THAT IS DEFAULTING TO ELSE
    $("body").on("click", ".answer", function(event){
        selectedAnswer = $(this).text();
        console.log(typeof selectedAnswer, selectedAnswer, correct[currentQuestion], typeof correct[currentQuestion]);
        console.log(selectedAnswer === correct[currentQuestion])
        if (selectedAnswer === correct[currentQuestion]) { //SOMETHING WRONG HERE!
 			// alert("correct");
 			triviaWin();
 			clearInterval(timer);
          
        } else {
        	// alert("wrong");
            clearInterval(timer);
            triviaLoss();
        };
        // console.log(typeof selectedAnswer);
    });

    $("body").on("click", ".reset-button", function(event) {
        resetTrivia();
    });
});

function triviaTimeOut() {
	wrongAnswers++;
	triviaHTML = "<p class='text-center timer-p'>Time Remaining: <span class='timer'>" + counter + "</span></p>" + "<p class='text-center'>You ran out of time!  The correct answer is: " + correct[currentQuestion] + "</p>" + "<img class='center-block img-sad' src='assets/images/wrong.gif'>";
	$(".main-area").html(triviaHTML);
	setTimeout(wait, 4000);
}

function triviaWin() {
    correctAnswers++;
    triviaHTML = "<p class='text-center timer-p'>Time Remaining: <span class='timer'>" + counter + "</span></p>" + "<p class='text-center'>Correct! The answer is: " + correct[currentQuestion] + "</p>" + images[currentQuestion];
    $(".main-area").html(triviaHTML);
    setTimeout(wait, 4000);
};

function triviaLoss() {
    wrongAnswers++;
    triviaHTML = "<p class='text-center timer-p'>Time Remaining: <span class='timer'>" + counter + "</span></p>" + "<p class='text-center'>Wrong! The correct answer is: " + correct[currentQuestion] + "</p>" + "<img class='center-block img-sad' src='assets/images/wrong.gif'>";
    $(".main-area").html(triviaHTML);
    setTimeout(wait, 4000);
};

function gameHTML() {
    triviaHTML = "<p class='text-center timer-p'>Time Remaining: <span class='timer'>30</span></p><p class='text-center'>" + questions[currentQuestion] + "</p><p class='answer'>" + choices[currentQuestion][0] + "</p><p class='answer'>" + choices[currentQuestion][1] + "</p><p class='answer'>" + choices[currentQuestion][2] + "</p><p class='answer'>" + choices[currentQuestion][3] + "</p>";
    $(".main-area").html(triviaHTML);
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
	triviaHTML = "<p class='text-center timer-p'>Time Remaining: <span class='timer'>" + counter + "</span></p>" + "<p class='text-center'>All done, here's how you did!" + "</p>" + "<p class='summary-correct text-center'>Correct Answers: " + correctAnswers + "</p>" + "<p class='text-center'>Wrong Answers: " + wrongAnswers + "</p>" + "<p class='text-center reset-button-container'><a class='btn btn-warning btn-lg reset-button' href='#' role='button'>Reset The Trivia!</a></p>";
	$(".main-area").html(triviaHTML);
};

function resetTrivia() {
	window.location.reload();
};