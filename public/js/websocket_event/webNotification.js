 // Enable pusher logging - don't include this in production
 if(localStorage.getItem('token')){
      
    // Pusher.logToConsole = true;


    console.log(window.location.hostname);
    var pusher = new Pusher('75e5c96aa620ea39fcde', {
      cluster: 'eu',
      forceTLS: true,
      // wsHost: window.location.hostname,
      // wsPort: 6001,
      // disableStats: true,
    });
    

    var channel = pusher.subscribe('project-notification');
    channel.bind('project-notify', function(data) {
      console.log(data);
      $displayNotification = new WebNotificationClass();
      $displayNotification.realTimeEvent(type = 'project-notify', data);
     // alert(JSON.stringify(data));
    });


  //   window.Pusher = require('pusher-js');

  //   window.Echo = new Echo({
  //     broadcaster: 'pusher',
  //     key: 'junicancodewebsoket',
  //     wsHost: window.location.hostname,
  //     wsPort: 6001,
  //     disableStats: true,
  // });


  // var channel = window.Echo.channel(`web-notification`)
  //     channel.listen('web-notify', (e) => {
  //     console.log(e);
  //     alert(JSON.stringify(e));
  // });

  // const connection = new WebSocket(`wss://${window.location.hostname}:6001`)

  //   connection.addEventListener('message', event => {
  //       console.log(event.data)
  //   })
 }