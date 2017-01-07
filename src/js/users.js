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
    current: function(includeRelated){
        var fragment = 'me';
        if (includeRelated === true) {
            fragment += '?with_related_data=true';
        }
        var promise = _request(_buildUrl(fragment));
        return promise;
    }

};