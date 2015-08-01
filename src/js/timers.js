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
        var data = {
            'time_entry': {
                'description': description,
                'tags': tagArray,
                'wid': config.defaultWorkspace,
                'created_with': config.clientName
            }
        };
        var promise = _request(_buildUrl('time_entries'), 'POST', JSON.stringify(data));
        return promise;
    },

    /*
     * https://github.com/toggl/toggl_api_docs/blob/master/chapters/time_entries.md#start-a-time-entry
     */
    start: function(description, tagArray, duration, start){
        var data = {
            'time_entry': {
                'description': description,
                'tags': tagArray,
                'duration': duration,
                'start': start,
                'wid': config.defaultWorkspace,
                'created_with': config.clientName
            }
        };
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
        var data = {
            'time_entry': {
                'description': description,
                'tags': tagArray,
                'duration': duration,
                'start': start,
                'wid': config.defaultWorkspace,
                'created_with': config.clientName
            }
        };
        var promise = _request(_buildUrl('time_entries', id), 'PUT', JSON.stringify(data));
        return promise;

    },

    /*
     * https://github.com/toggl/toggl_api_docs/blob/master/chapters/time_entries.md#delete-a-time-entry
     */
    del: function(id){
        var promise = _request(_buildUrl('time_entries', id), 'DELETE');
        return promise;
    },

    /*
     * https://github.com/toggl/toggl_api_docs/blob/master/chapters/time_entries.md#get-time-entries-started-in-a-specific-time-range
     */
    between: function(startDate,endDate){
        throw new Error('Timer.getBetween not yet implemented');
    }
};