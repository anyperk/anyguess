# Place all the behaviors and hooks related to the matching controller here.
# All this logic will automatically be available in application.js.
# You can use CoffeeScript in this file: http://coffeescript.org/

App.room = App.cable.subscriptions.create "QuestionNotificationsChannel",
  received: (data) ->
    $('#messages').append data['message']
    console.log "message received:"
    console.log data['message']
    console.log $("#messages").text()
