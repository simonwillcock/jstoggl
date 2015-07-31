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

    ////////////////////////

    

    /* Utils */

    var _buildUrl = function(collection, object, action){
        return config.baseUrl + config.apiVersion + '/' + collection +
        (
            (typeof action !== 'undefined' && typeof object !== 'undefined') ?
                '/' + object + '/' + action
                : (typeof action === 'undefined' && typeof object !== 'undefined') ? '/' + object
                : (typeof object === 'undefined' && typeof action !== 'undefined') ? '/' + action
                : ''

        );
    };

    var _request = function(url, verb, postdata){
        var headers = {
            'Authorization' : config.auth
        }
        if (typeof verb === 'undefined' && typeof postdata === 'undefined'){
            verb = 'GET';
        } else if(typeof verb === 'undefined' && typeof postdata !== 'undefined'){
            verb = 'POST';
        }
        var deferred = $.Deferred();
        $.ajax({
            url: url,
            type: verb,
            headers: headers,
            data: postdata,
            dataType: 'json',
            contentType: 'application/json',
            success: function(data){
                deferred.resolve(data);
            },
            error: function(error){
                deferred.reject(error);
            }
        });
        return deferred.promise();
    };


    /*
     * Time Entries
     * https://github.com/toggl/toggl_api_docs/blob/master/chapters/time_entries.md
     *
     */
    var timers = {
        url: function(){
            return _buildUrl('timer_entries');
        },

        /*
         * https://github.com/toggl/toggl_api_docs/blob/master/chapters/time_entries.md#get-running-time-entry
         */
        all : function(){
            var promise = _request(_buildUrl('time_entries'));
            return promise;
        },

        /*
         * https://github.com/toggl/toggl_api_docs/blob/master/chapters/time_entries.md#get-running-time-entry
         */
        current : function(){
            var promise = _request(_buildUrl('time_entries/current'));
            return promise;
        },

        /*
         * https://github.com/toggl/toggl_api_docs/blob/master/chapters/time_entries.md#create-a-time-entry
         */
        create: function(description, tagArray){
            data = {
                'time_entry': {
                    'description': description,
                    'tags': tagArray,                    
                    'wid': config.defaultWorkspace,
                    'created_with': config.clientName
                }
            }
            var promise = _request(_buildUrl('time_entries'), 'POST', JSON.stringify(data));
            return promise;
        },

        /*
         * https://github.com/toggl/toggl_api_docs/blob/master/chapters/time_entries.md#start-a-time-entry
         */
        start: function(description, tagArray, duration, start){
            data = {
                'time_entry': {
                    'description': description,
                    'tags': tagArray,
                    'duration': duration,
                    'start': start,
                    'wid': config.defaultWorkspace,
                    'created_with': config.clientName
                }
            }
            var promise = _request(_buildUrl('time_entries/start'), 'POST', JSON.stringify(data));
            return promise;
        },

        /*
         * https://github.com/toggl/toggl_api_docs/blob/master/chapters/time_entries.md#stop-a-time-entry
         */
        stop: function(id){

            var promise = _request(_buildUrl('time_entries', id, 'stop'), 'PUT');
            return promise;
        },

        /*
         * https://github.com/toggl/toggl_api_docs/blob/master/chapters/time_entries.md#get-time-entry-details
         */
        get: function(id){
            var promise = _request(_buildUrl('time_entries', id));
            return promise;
        },

        /*
         * https://github.com/toggl/toggl_api_docs/blob/master/chapters/time_entries.md#update-a-time-entry
         */
        update: function(id, description, tagArray, duration, start){
            data = {
                'time_entry': {
                    'description': description,
                    'tags': tagArray,
                    'duration': duration,
                    'start': start,
                    'wid': config.defaultWorkspace,
                    'created_with': config.clientName
                }
            }
            var promise = _request(_buildUrl('time_entries', id), 'PUT', JSON.stringify(data));
            return promise;

        },

        /*
         * https://github.com/toggl/toggl_api_docs/blob/master/chapters/time_entries.md#delete-a-time-entry
         */
        delete: function(id){
            var promise = _request(_buildUrl('time_entries', id), 'DELETE');
            return promise;
        },

        /*
         * https://github.com/toggl/toggl_api_docs/blob/master/chapters/time_entries.md#get-time-entries-started-in-a-specific-time-range
         */
        between: function(startDate,endDate){
            throw new Error('Timer.getBetween not yet implemented');
            return promise;
        }
    };

    /*
     * Tags
     * https://github.com/toggl/toggl_api_docs/blob/master/chapters/tags.md
     *
     */
    var tags = {
        url: function(){
            return _buildUrl('tags');
        },

        /*
         * https://github.com/toggl/toggl_api_docs/blob/master/chapters/tags.md#create-tag
         */
        create: function(name){
            data = {
                'tag': {
                    'name': name,
                    'wid': config.defaultWorkspace
                }
            }
            var promise = _request(_buildUrl('tags'), 'POST', JSON.stringify(data));
            return promise;
        },

        /*
         * https://github.com/toggl/toggl_api_docs/blob/master/chapters/tags.md#update-a-tag
         */
        update: function(id, name){
            data = {
                'tag': {
                    'name': name,
                    'wid': config.defaultWorkspace
                }
            }
            var promise = _request(_buildUrl('tags', id), 'PUT', JSON.stringify(data));
            return promise;

        },


        /*
         * https://github.com/toggl/toggl_api_docs/blob/master/chapters/tags.md#delete-a-tag
         */
        delete: function(id){
            var promise = _request(_buildUrl('tags', id), 'DELETE');
            return promise;
        }

    };

    /*
     * Projects
     * https://github.com/toggl/toggl_api_docs/blob/master/chapters/projects.md
     *
     */
    var projects = {
        url: function(){
            return _buildUrl('projects');
        },
        /*
         * https://github.com/toggl/toggl_api_docs/blob/master/chapters/projects.md#create-project
         */
        create: function(name){
            data = {
                'project': {
                    'name': name,
                    'wid': config.defaultWorkspace
                }
            }
            var promise = _request(_buildUrl('projects'), 'POST', JSON.stringify(data));
            return promise;
        },

        /*
         * https://github.com/toggl/toggl_api_docs/blob/master/chapters/projects.md#get-project-data
         */
        get: function(id){
            var promise = _request(_buildUrl('projects', id));
            return promise;
        },

        /*
         * https://github.com/toggl/toggl_api_docs/blob/master/chapters/projects.md#update-project-data
         */
        update: function(id, name){
            data = {
                'project': {
                    'name': name,
                    'wid': config.defaultWorkspace
                }
            }
            var promise = _request(_buildUrl('projects', id), 'PUT', JSON.stringify(data));
            return promise;

        },

        /*
         * https://github.com/toggl/toggl_api_docs/blob/master/chapters/projects.md#delete-a-project
         */
        delete: function(id){
            var promise = _request(_buildUrl('projects', id), 'DELETE');
            return promise;
        },

        /*
         * https://github.com/toggl/toggl_api_docs/blob/master/chapters/projects.md#get-project-data
         */
        getUsers: function(id){
            var promise = _request(_buildUrl('projects', id, '/project_users'));
            return promise;
        },

        /*
         * https://github.com/toggl/toggl_api_docs/blob/master/chapters/projects.md#get-project-data
         */
        getTasks: function(id){
            var promise = _request(_buildUrl('projects', id, '/tasks'));
            return promise;
        }
    };

    /*
     * Clients
     * https://github.com/toggl/toggl_api_docs/blob/master/chapters/clients.md
     *
     */
    var clients = {
        url: function(){
            return _buildUrl('clients');
        },
        /*
         * https://github.com/toggl/toggl_api_docs/blob/master/chapters/clients.md#create-a-client
         */
        create: function(name){
            data = {
                'client': {
                    'name': name,
                    'wid': config.defaultWorkspace
                }
            }
            var promise = _request(_buildUrl('clients'), 'POST', JSON.stringify(data));
            return promise;
        },

        /*
         * https://github.com/toggl/toggl_api_docs/blob/master/chapters/clients.md#get-client-details
         */
        get: function(id){
            var promise = _request(_buildUrl('clients', id));
            return promise;
        },

        /*
         * https://github.com/toggl/toggl_api_docs/blob/master/chapters/clients.md#update-a-client
         */
        update: function(id, name){
            data = {
                'client': {
                    'name': name,
                    'wid': config.defaultWorkspace
                }
            }
            var promise = _request(_buildUrl('clients', id), 'PUT', JSON.stringify(data));
            return promise;

        },

        /*
         * https://github.com/toggl/toggl_api_docs/blob/master/chapters/clients.md#delete-a-client
         */
        delete: function(id){
            var promise = _request(_buildUrl('clients', id), 'DELETE');
            return promise;
        },

        /*
         * https://github.com/toggl/toggl_api_docs/blob/master/chapters/clients.md#get-client-projects
         */
        getProjects: function(id, state){
            var promise = _request(_buildUrl('clients', id, 'projects'));
            return promise;
        },

        /*
         * https://github.com/toggl/toggl_api_docs/blob/master/chapters/clients.md#get-clients-visible-to-user
         */
        visible: function(){
            var promise = _request(_buildUrl('clients'));
            return promise;
        },
    };

    /*
     * Users
     * https://github.com/toggl/toggl_api_docs/blob/master/chapters/users.md
     *
     */
    var users = {
        url: function(){
            return _buildUrl('me');
        },

        /*
         * https://github.com/toggl/toggl_api_docs/blob/master/chapters/users.md#get-current-user-data
         */
        current: function(){
            var promise = _request(_buildUrl('me'));
            return promise;
        }

    };

    _init(token, options);

    return {
        timers: timers,
        users: users,
        projects: projects,
        tags: tags,
        clients: clients
    };
};