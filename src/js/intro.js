var TogglClient = function(token, options){
    var config = {
        clientName: 'Toggl JS Client',
        baseUrl : 'https://www.toggl.com/api/',
        apiVersion : 'v8'
    };

    var _init = function(token, options){
        if(!token) {
            throw new Error('You must provide your API token to use the Toggl API');
        }
        config.auth = 'Basic ' + btoa(token + ':api_token');
        if (typeof options === 'undefined' || typeof options.defaultWorkspace === 'undefined') {
            workspaces.all().then(function(workspaces){
                config.defaultWorkspace = workspaces[0].id;
            });
        } else {
            config.defaultWorkspace = options.defaultWorkspace;
        }
    };

