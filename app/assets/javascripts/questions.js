App.room = App.cable.subscriptions.create("QuestionNotificationsChannel", {
    received: function (data) {
        id = $("#game-container").data("id");
        if (!id) {
            return
        }
        if (data['message']['answer']) {
            game.Answer(data['message']['answer']);
        } else {
            game.Question(data['message'])
        }
    }
});

class Game {
    constructor() {
        this.selectedAnswer = null;
        this.countdown = null;
        this.gameover = null;
        this.playing = true;
        this.game = $("#game-container").data("id");
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

        $("#question").html(text + '?');
        $("#answer1").html(answer1);
        $("#answer2").html(answer2);
        $("#message").text("");
        $("div.answer").removeClass("correct");
        $("div.answer").removeClass("selected");

        this.clearLoginView();
        this.startCountdown();
    }

    Answer(answer) {
        console.log("answer: " + answer);
        $("#countdown").countdown360({}).stop();

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
        App.loser.lost({action: 'lost', game_id: $("#game-container").data("id")})
    }

    startCountdown() {
        $("#countdown").countdown360({
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
        }).start();
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
