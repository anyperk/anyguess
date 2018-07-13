App.room = App.cable.subscriptions.create("QuestionNotificationsChannel", {
  received: function(data) {
    const questions = new Questions()
    if(data['message']['answer']) {
      questions.checkIfAnswerIsCorrect(data['message']['answer'])
      return
    }
    questions.clearLoginView();
    questions.renderQuestion(data);
    questions.startCountdown();
  }
});

let selectedAnswer = null
let isGameover = false

class Questions {
  startCountdown() {
    $("#countdown").countdown360({
      radius      : 60.5,
      seconds     : 20,
      strokeWidth : 15,
      fillStyle   : '#0276FD',
      strokeStyle : '#003F87',
      fontSize    : 50,
      fontColor   : '#FFFFFF',
      autostart: false,
      onComplete  : function () { console.log('completed'); isGameover = true }
    }).start()
  }

  clearLoginView() {
    $('#login').remove();
  }

  renderQuestion(data) {
    const question = data['message']
    const answer1 = question['answer1'];
    const answer2 = question['answer2'];
    const text = question['text'];


    const html = `<div class="question-container">
      <h2>Question:</h2>
      <h1>${text}</h1>
      <div class="message"></div>
      <table>
        <tr>
          <td><div>Answer A:</div><div class="answer1">${answer1}</div><button onclick="selectA()">Select A</button></td>
          <td><div>Answer B:</div><div class="answer2">${answer2}</div><button onclick="selectB()">Select B</button></td>
        </tr>
      </table>
    </div>`

    $('#current-question').empty();
    $('#current-question').append(html);
  }

  checkIfAnswerIsCorrect(answer) {
    if(answer === selectedAnswer) {
      this.renderCorrectMessage()
    } else {
      this.renderYouLost()
    }
  }

  renderYouLost() {
    $('.message').empty()
    $('.message').append('<div style="margin-top: 30px; text-align: center;font-size: 50px;color: #f13131;">You lost!</div>')
    isGameover = true
  }

  renderCorrectMessage() {
    $('.message').empty()
    $('.message').append('<div style="margin-top: 30px; text-align: center;font-size: 50px;color: #13b713;">Correct!</div>')
  }

}

function renderYouAlreadyLostMessage() {
  $('.message').empty()
  $('.message').append('<div style="margin-top: 30px; text-align: center;font-size: 50px;color: #f6d515;">You already lost!</div>')
}

function selectA() {
  if (isGameover) {
    renderYouAlreadyLostMessage()
    return
  }
  $('.answer1').css({
    "border": '1px solid red',
    "borderRadius": '4px'
  })
  $('.answer2').css({
    "border": 'none'
  })
  selectedAnswer = '1'
}

function selectB() {
  if (isGameover) {
    renderYouAlreadyLostMessage()
    return
  }
  $('.answer2').css({
    "border": '1px solid red',
    "borderRadius": '4px'
  })
  $('.answer1').css({
    border: 'none'
  })
  selectedAnswer = '2'
}
