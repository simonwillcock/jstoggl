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
        var data = {
            'tag': {
                'name': name,
                'wid': config.defaultWorkspace
            }
        };
        var promise = _request(_buildUrl('tags'), 'POST', JSON.stringify(data));
        return promise;
    },

    /*
     * https://github.com/toggl/toggl_api_docs/blob/master/chapters/tags.md#update-a-tag
     */
    update: function(id, name){
        var data = {
            'tag': {
                'name': name,
                'wid': config.defaultWorkspace
            }
        };
        var promise = _request(_buildUrl('tags', id), 'PUT', JSON.stringify(data));
        return promise;

    },


    /*
     * https://github.com/toggl/toggl_api_docs/blob/master/chapters/tags.md#delete-a-tag
     */
    del: function(id){
        var promise = _request(_buildUrl('tags', id), 'DELETE');
        return promise;
    }

};