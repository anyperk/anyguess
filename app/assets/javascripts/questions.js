App.room = App.cable.subscriptions.create("QuestionNotificationsChannel", {
  received: function(data) {
    clearLoginView();
    renderQuestion(data);
    startCountdown();
  }
});

function startCountdown() {
  $("#countdown").countdown360({
    radius      : 60.5,
    seconds     : 20,
    strokeWidth : 15,
    fillStyle   : '#0276FD',
    strokeStyle : '#003F87',
    fontSize    : 50,
    fontColor   : '#FFFFFF',
    autostart: false,
    onComplete  : function () { console.log('completed') }
  }).start()
}

function clearLoginView() {
  $('#login').remove();
}

function renderQuestion(data) {
    console.log(data['message']);
  const question = JSON.parse(data['message']);
  const answer1 = question['answer1'];
  const answer2 = question['answer2'];
  const text = question['text'];


  const html = `<div class="question-container">
    <h2>Question:</h2>
    <h1>${text}</h1>
    <table>
      <tr>
        <td><div>Answer A:</div><div>${answer1}</div></td>
        <td><div>Answer B:</div><div>${answer2}</div></td>
      </tr>
    </table>
  </div>`;

  $('#current-question').empty();
  $('#current-question').append(html);
}
