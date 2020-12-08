let questionNumber = 0;
let correctAnswer = 0;
let totalQuestionsAnswered = 0;
$("#restart").hide();
$("#giveUp").hide();
$("#photo-correct").hide();
$("#photo-wrong").hide();
$("#finished").hide();
$("#next-question").hide();

function showScore() {
  return `${correctAnswer} / ${totalQuestionsAnswered}`;
}

function whatQuestion() {
  $("#q-num").text(questionNumber + 1 + " of " + QUESTIONANSWER.length);
}

function startQuiz() {
  $("#start").click(function (e) {
    removeStart();
    showQuestions();
    buildQuestion();
    showResults();
    $("#giveUp").fadeIn();
  });
}

function removeStart() {
  $("#start").toggle(1500);
}

function showQuestions() {
  $("#quiz").toggle(1500);
}

function buildQuestion() {
  let question = QUESTIONANSWER[questionNumber];
  console.log("this is the question ", question);
  presentQuestion();
  presentAnswer();
}

function generateQuestion() {
  let showing = QUESTIONANSWER[questionNumber].question;
  return showing;
}

function presentQuestion() {
  $("#question-display").text(generateQuestion());
  whatQuestion();
}

function generateAnswer() {
  let choices = "";
  let currentQuestion = QUESTIONANSWER[questionNumber];
  let answers = currentQuestion.answers;
  choices += "<legend>" + generateQuestion() + "</legend>";
  for (let i = 0; i < answers.length; i++) {
    choices += `<div class="rightAnswer"><input type="radio" value="${i}" id="alternative-${i}" name="answer">
        <label for="alternative-${i}">${answers[i]}</label></div>`;
  }
  return choices;
  console.log("generate answer is working");
}

function presentAnswer() {
  $("#answers").html(generateAnswer());
}

$("#submit").on("click", function (run) {
  submitAnswer();
  run.preventDefault();
});

$("#next-question").on("click", function (e) {
  $("#feedback-wrong").hide();
  $("#feedback-correct").hide();
  if (questionNumber < QUESTIONANSWER.length - 1) {
    $("#quiz").show();
    nextQuestion();
  } else {
    endQuiz();
  }
});

function submitAnswer() {
  let selected = $("input:checked");
  if (!selected.length) {
    $("#must-pick").show();
    return;
  }
  $("#must-pick").hide();
  let answer = selected.val();
  console.log("selected variable is ", selected);
  console.log("answer variable is ", answer);
  checkAnswer(QUESTIONANSWER[questionNumber], answer);
  showResults();
  $("#submit").hide();
  $("#quiz").hide();
  if (questionNumber == QUESTIONANSWER.length - 1) {
    //console.log("quiz finished, show restart button and get rid of give up")
    endQuiz();
  }
}

function checkAnswer(question, selectedAnswer) {
  console.log("should be correct answer ", question.correctAnswer);
  console.log("this is the selected answer ", selectedAnswer);
  if (question.correctAnswer == selectedAnswer) {
    ifAnswerIsCorrect();
    console.log("Correct");
  } else {
    ifAnswerIsWrong();
    console.log("Wrong");
  }
}

function ifAnswerIsCorrect() {
  correctAnswer++;
  totalQuestionsAnswered++;
  //show correct feedback
  $("#feedback-correct").show();
  $("#next-question").show();
  $("#photo-correct").fadeIn(2000);
}

function ifAnswerIsWrong() {
  console.log("inside ifAnswerIsWrong");
  totalQuestionsAnswered++;
  //update show-right-answer
  $("#show-right-answer").text(
    QUESTIONANSWER[questionNumber].answers[
      QUESTIONANSWER[questionNumber].correctAnswer
    ]
  );
  //show incorrect feedback
  $("#feedback-wrong").show();
  $("#next-question").show();
  $("#photo-wrong").fadeIn(2000);
}

function nextQuestion() {
  $("#next-question").hide();
  $("#photo-wrong").hide();
  $("#photo-correct").hide();
  $("#submit").show();
  questionNumber++;
  buildQuestion();
}

function endQuiz() {
  showScore();
  $("#submit").hide();
  $("#restart").show();
  $("#giveUp").hide();
  console.log("No more questions");
  $("#quiz").hide(2500);
  $("#next-question").hide();
  $("#finished").show();
}

function showResults() {
  $("#score").fadeIn(1500);
  $("#results").text(showScore());
}

function restartQuiz() {
  $("#restart").on("click", function (e) {
    questionNumber = 0;
    correctAnswer = 0;
    totalQuestionsAnswered = 0;
    $("#photo-wrong").hide();
    $("#photo-correct").hide();
    showQuestions();
    buildQuestion();
    showResults();
    $("#submit").fadeIn(2000);
    $("#restart").hide();
    $("#giveUp").show();
    $("#finished").hide();
    $("#feedback-wrong").hide();
    $("#feedback-correct").hide();
  });
}

function giveUp() {
  $("#giveUp").on("click", function (e) {
    $("#photo-wrong").hide();
    $("#photo-correct").hide();
    $("#quiz").hide();
    $("#restart").show();
    $("#giveUp").hide();
    $("#feedback-wrong").hide();
    $("#feedback-correct").hide();
  });
}

function takeQuizApp() {
  startQuiz();
  restartQuiz();
  giveUp();
  showScore();
  
}

$(takeQuizApp);