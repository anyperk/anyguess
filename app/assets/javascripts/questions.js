App.room = App.cable.subscriptions.create("QuestionNotificationsChannel", {
  received: function(data) {
    clearLoginView();
    renderQuestion(data);
  }
});


function clearLoginView() {
  $('#login').remove();
}

function renderQuestion(data) {
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