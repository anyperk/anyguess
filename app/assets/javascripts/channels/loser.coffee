App.loser = App.cable.subscriptions.create "LoserChannel",
  connected: ->
    # Called when the subscription is ready for use on the server

  disconnected: ->
    # Called when the subscription has been terminated by the server

  received: (data) ->
    $("#players .user[data-id='"+data['user']['id']+"'").appendTo("#viewers")

  lost: (data)->
    console.log "lost:"
    console.log data
    @perform("lost", data)
