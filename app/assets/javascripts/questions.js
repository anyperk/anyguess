App.room = App.cable.subscriptions.create("QuestionNotificationsChannel", {
    received: function (data) {
        if (data['message']['answer']) {
            // questions.checkIfAnswerIsCorrect(data['message']['answer'])
            // return
            game.Answer(data['message']['answer']);
        } else {
            game.Question(data['message'])
        }
        // questions.clearLoginView();
        // questions.renderQuestion(data);
        // questions.startCountdown();
    }
});

class Game {
    constructor() {
        this.selectedAnswer = null;
        this.countdown = null;
        this.gameover = null;
        this.playing = true;
    }

    Playing() {
        return this.playing;
    }

    Question(question) {
        const text = question['text'];
        const answer1 = question['answer1'];
        const answer2 = question['answer2'];
        console.log("question: " + text);

        this.selectedAnswer = null;

        this.clearLoginView();
        this.startCountdown();

        $("#question").html(text + '?');
        $("#answer1").html(answer1);
        $("#answer2").html(answer2);
        $("#message").text("");
        $("div.answer").removeClass("correct");
        $("div.answer").removeClass("selected");
    }

    Answer(answer) {
        console.log("answer: " + answer);
        this.countdown.stop();

        $("div.answer.answer"+answer).addClass("correct");

        if (this.playing) {
            if (this.selectedAnswer == answer) {
                this.Correct();
            } else {
                this.Incorrect();
            }
        }
    }

    Select(answer) {
        this.selectedAnswer = answer;
        console.log("select: " + answer);
    }

    clearLoginView() {
        $('#login').remove();
    }

    Correct() {
        $('#message').text('You are correct!')
    }

    Incorrect() {
        $('#message').text('Sorry, wrong answer. You are out of the game.');
        this.playing = false;

    }

    startCountdown() {
        this.countdown = $("#countdown").countdown360({
            radius: 60.5,
            seconds: 20,
            strokeWidth: 15,
            fillStyle: '#314380',
            strokeStyle: '#FEBE10',
            fontSize: 50,
            fontColor: '#FEBE10',
            autostart: false,
            onComplete: function() {
                console.log("countdown ended");
                if (!this.selectedAnswer) {
                    game.Incorrect();
                }
            }
        });
        this.countdown.start();
    }

    CountdownEnded() {

    }

}

const game = new Game();

$(document).ready(function () {
    $("div.answer.answer1").click(function () {
        if (game.Playing()) {
            $("div.answer").removeClass("selected");
            $(this).addClass("selected");
            game.Select(1);
        }
    });
    $("div.answer.answer2").click(function () {
        if (game.Playing()) {
            $("div.answer").removeClass("selected");
            $(this).addClass("selected");
            game.Select(2);
        }
    });
});

//
// let isGameover = false;
// let selectedAnswer = null;
//
// class Questions {
//   startCountdown() {
//     $("#countdown").countdown360({
//       radius      : 60.5,
//       seconds     : 20,
//       strokeWidth : 15,
//       fillStyle   : '#314380',
//       strokeStyle : '#FEBE10',
//       fontSize    : 50,
//       fontColor   : '#FEBE10',
//       autostart: false,
//       onComplete  : function () { console.log('completed'); isGameover = true }
//     }).start()
//   }
//
//   clearLoginView() {
//     $('#login').remove();
//   }
//
//   renderQuestion(data) {
//     const question = data['message'];
//     const answer1 = question['answer1'];
//     const answer2 = question['answer2'];
//     const text = question['text'];
//
//     $("#question").html(text+'?');
//     $("#answer1").html(answer1);
//     $("#answer2").html(answer2);
//   }
//
//   checkIfAnswerIsCorrect(answer) {
//     if(answer === selectedAnswer) {
//       this.renderCorrectMessage()
//     } else {
//       this.renderYouLost()
//     }
//   }
//
//   renderYouLost() {
//     $('.message').empty()
//     $('.message').append('<div style="margin-top: 30px; text-align: center;font-size: 50px;color: #f13131;">You lost!</div>')
//     isGameover = true
//   }
//
//   renderCorrectMessage() {
//     $('.message').empty()
//     $('.message').append('<div style="margin-top: 30px; text-align: center;font-size: 50px;color: #13b713;">Correct!</div>')
//   }
//
// }
//
// function renderYouAlreadyLostMessage() {
//   $('.message').empty()
//   $('.message').append('<div style="margin-top: 30px; text-align: center;font-size: 50px;color: #f6d515;">You already lost!</div>')
// }
//
// function selectA() {
//   if (isGameover) {
//     renderYouAlreadyLostMessage()
//     return
//   }
//   $('.answer1').css({
//     "border": '1px solid red',
//     "borderRadius": '4px'
//   })
//   $('.answer2').css({
//     "border": 'none'
//   })
//   selectedAnswer = '1'
// }
//
// function selectB() {
//   if (isGameover) {
//     renderYouAlreadyLostMessage()
//     return
//   }
//   $('.answer2').css({
//     "border": '1px solid red',
//     "borderRadius": '4px'
//   })
//   $('.answer1').css({
//     border: 'none'
//   })
//   selectedAnswer = '2'
// }
