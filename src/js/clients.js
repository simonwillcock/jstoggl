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
        var data = {
            'client': {
                'name': name,
                'wid': config.defaultWorkspace
            }
        };
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
        var data = {
            'client': {
                'name': name,
                'wid': config.defaultWorkspace
            }
        };
        var promise = _request(_buildUrl('clients', id), 'PUT', JSON.stringify(data));
        return promise;

    },

    /*
     * https://github.com/toggl/toggl_api_docs/blob/master/chapters/clients.md#delete-a-client
     */
    del: function(id){
        var promise = _request(_buildUrl('clients', id), 'DELETE');
        return promise;
    },

    /*
     * https://github.com/toggl/toggl_api_docs/blob/master/chapters/clients.md#get-client-projects
     */
    getProjects: function(id){
        var promise = _request(_buildUrl('clients', id, 'projects'));
        return promise;
    },

    /*
     * https://github.com/toggl/toggl_api_docs/blob/master/chapters/clients.md#get-clients-visible-to-user
     */
    visible: function(){
        var promise = _request(_buildUrl('clients'));
        return promise;
    }
};

