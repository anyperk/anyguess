# Place all the behaviors and hooks related to the matching controller here.
# All this logic will automatically be available in application.js.
# You can use CoffeeScript in this file: http://coffeescript.org/

$(document).ready ->
  $("#new_question").on("ajax:success", (event) ->
    [data, status, xhr] = event.detail
    addQuestion(data)
    this.reset()
  ).on "ajax:error", (event) ->
    console.log "ERROR"
    $("#new_question").append "<p>ERROR</p>"


  addQuestion = (data)->
    console.log "addQuestion"
    console.log data
    $('#game tr:last').after('<tr>' +
      '<th></th>' +
      '<td>' +
      '<b>' + data.text + '?</b><br/>' +
      data.answer1 + '<br/>' +
      data.answer2 +
      '</td>' +
      '</tr>');
