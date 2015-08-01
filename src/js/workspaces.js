/*
 * Workspaces
 * https://github.com/toggl/toggl_api_docs/blob/master/chapters/workspaces.md
 *
 */
var workspaces = {
    url: function(){
        return _buildUrl('workspaces');
    },

    /*
     * https://github.com/toggl/toggl_api_docs/blob/master/chapters/workspaces.md#get-single-workspace
     */
    get: function(id){
        var promise = _request(_buildUrl('workspaces', id));
        return promise;
    },

    /*
     * https://github.com/toggl/toggl_api_docs/blob/master/chapters/workspaces.md#get-workspaces
     */
    all: function(){
        var promise = _request(_buildUrl('workspaces'));
        return promise;
    }
};

