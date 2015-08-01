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
        var data = {
            'project': {
                'name': name,
                'wid': config.defaultWorkspace
            }
        };
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
        var data = {
            'project': {
                'name': name,
                'wid': config.defaultWorkspace
            }
        };
        var promise = _request(_buildUrl('projects', id), 'PUT', JSON.stringify(data));
        return promise;

    },

    /*
     * https://github.com/toggl/toggl_api_docs/blob/master/chapters/projects.md#delete-a-project
     */
    del: function(id){
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