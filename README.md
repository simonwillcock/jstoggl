JSToggl
=======

An API wrapper to simplify interactions with the official [Toggl API](https://github.com/toggl/toggl_api_docs).

Find out more about [Toggl](https://toggl.com/).

Usage
-------

You will need your API token that you can find in [your Toggl profile](https://toggl.com/app/profile).

You will also likely need to get the domain that you will be making requests from whitelisted so that the API returns the correct [CORS headers](https://github.com/toggl/toggl_api_docs/blob/master/toggl_api.md#cors). You can do so by emailing [support@toggl.com](mailto:support@toggl.com) with your domain name and requesting that it be added. They usually respond within 24 hours of making the request.

You will also require jQuery, but I hope to remove this requirement as it is really only being used to make the AJAX request.

#### Create your client
```javascript
var Toggl = TogglClient(myToken);
```

#### Start and stop a timer

All requests return a promise with the API response that you can then use.

```javascript
var timerId;
Toggl.timers.start('My Test Timer').then(function(timer){
    // Do stuff - eg. toggle the button state to stop the timer
    timerId = timer.data.id;
});

Toggl.timers.stop(timerId).then(function(){
    // Do stuff - eg. toggle the button state back to start another timer
});
```

#### Get the currently running timer

```javascript
var timerId;
Toggl.timers.current().then(function(timer){
    if(timer)
        timerId = timer.data.id;
    }
});
```

#### Create a new Client

```javascript
Toggl.clients.create('My Client Pty Ltd').then(function(client){
    
});
```

#### Create projects assigned to a client

```javascript
Toggl.clients.getProjects(clientId).then(function(projectArray){
    // for(var i = 0; i < projectArray.length; i++){ ... }
});
```


### License


JSToggl is licensed under [GPL v2](https://github.com/simonwillcock/jstoggl/blob/master/LICENSE.txt)