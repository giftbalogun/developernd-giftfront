 // Enable pusher logging - don't include this in production
    // Pusher.logToConsole = true;

    var pusher = new Pusher('75e5c96aa620ea39fcde', {
      cluster: 'eu',
      forceTLS: true,
      // wsHost: window.location.hostname,
      // wsPort: 6001,
      // disableStats: true,
    });
    
    var channel = pusher.subscribe('comment-notification');
    channel.bind('comment-notify', function(data) {
      
      const commentNotification = new CommentNotificationClass();
      commentNotification.realTimeEvent(type = 'comment-notify', data);
     
    });
    channel.bind('comment-reply-notify', function(data) {
      console.log(data);
      
      const commentNotification = new CommentNotificationClass();
      commentNotification.realTimeEvent(type = 'comment-reply-notify', data);
     
    });
