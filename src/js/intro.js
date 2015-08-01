var TogglClient = function(token, options){
    var config = {
        clientName: 'Toggl JS Client',
        baseUrl : 'https://www.toggl.com/api/',
        apiVersion : 'v8',
        defaultWorkspace: 1021505,
        auth : ''
    };

    var _init = function(token, options){
        if(!token) {
            throw new Error('You must provide your API token to use the Toggl API');
        }
        config.auth = 'Basic ' + btoa(token + ':api_token');
    };

