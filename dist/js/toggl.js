/**
 ** JSToggl - An API wrapper to simplify interactions with the Toggl API
 ** @author Simon Willcock <simon@willcock.com.au>
 ** @version v0.1.0
 **/

var TogglClient = function (token, options) {
  var config = {
    clientName: 'Toggl JS Client',
    baseUrl: 'https://www.toggl.com/api/',
    apiVersion: 'v8'
  };

  var _init = function (token, options) {
    if (!token) {
      throw new Error('You must provide your API token to use the Toggl API');
    }
    config.auth = 'Basic ' + btoa(token + ':api_token');
    if (typeof options === 'undefined' || typeof options.defaultWorkspace === 'undefined') {
      workspaces.all().then(function (workspaces) {
        config.defaultWorkspace = workspaces[0].id;
      });
    } else {
      config.defaultWorkspace = options.defaultWorkspace;
    }
  };



  var clients = {
    url: function () {
      return _buildUrl('clients');
    },


    create: function (name) {
      var data = {
        'client': {
          'name': name,
          'wid': config.defaultWorkspace
        }
      };
      var promise = _request(_buildUrl('clients'), 'POST', JSON.stringify(data));
      return promise;
    },


    get: function (id) {
      var promise = _request(_buildUrl('clients', id));
      return promise;
    },


    update: function (id, name) {
      var data = {
        'client': {
          'name': name,
          'wid': config.defaultWorkspace
        }
      };
      var promise = _request(_buildUrl('clients', id), 'PUT', JSON.stringify(data));
      return promise;

    },


    del: function (id) {
      var promise = _request(_buildUrl('clients', id), 'DELETE');
      return promise;
    },


    getProjects: function (id) {
      var promise = _request(_buildUrl('clients', id, 'projects'));
      return promise;
    },


    visible: function () {
      var promise = _request(_buildUrl('clients'));
      return promise;
    }
  };



  var projects = {
    url: function () {
      return _buildUrl('projects');
    },

    create: function (name) {
      var data = {
        'project': {
          'name': name,
          'wid': config.defaultWorkspace
        }
      };
      var promise = _request(_buildUrl('projects'), 'POST', JSON.stringify(data));
      return promise;
    },


    get: function (id) {
      var promise = _request(_buildUrl('projects', id));
      return promise;
    },


    update: function (id, name) {
      var data = {
        'project': {
          'name': name,
          'wid': config.defaultWorkspace
        }
      };
      var promise = _request(_buildUrl('projects', id), 'PUT', JSON.stringify(data));
      return promise;

    },


    del: function (id) {
      var promise = _request(_buildUrl('projects', id), 'DELETE');
      return promise;
    },


    getUsers: function (id) {
      var promise = _request(_buildUrl('projects', id, '/project_users'));
      return promise;
    },


    getTasks: function (id) {
      var promise = _request(_buildUrl('projects', id, '/tasks'));
      return promise;
    }
  };

  var tags = {
    url: function () {
      return _buildUrl('tags');
    },


    create: function (name) {
      var data = {
        'tag': {
          'name': name,
          'wid': config.defaultWorkspace
        }
      };
      var promise = _request(_buildUrl('tags'), 'POST', JSON.stringify(data));
      return promise;
    },


    update: function (id, name) {
      var data = {
        'tag': {
          'name': name,
          'wid': config.defaultWorkspace
        }
      };
      var promise = _request(_buildUrl('tags', id), 'PUT', JSON.stringify(data));
      return promise;

    },



    del: function (id) {
      var promise = _request(_buildUrl('tags', id), 'DELETE');
      return promise;
    }

  };

  var timers = {
    url: function () {
      return _buildUrl('timer_entries');
    },


    all: function () {
      var promise = _request(_buildUrl('time_entries'));
      return promise;
    },


    current: function () {
      var promise = _request(_buildUrl('time_entries/current'));
      return promise;
    },


    create: function (description, tagArray) {
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


    start: function (description, tagArray, duration, start) {
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


    stop: function (id) {

      var promise = _request(_buildUrl('time_entries', id, 'stop'), 'PUT');
      return promise;
    },


    get: function (id) {
      var promise = _request(_buildUrl('time_entries', id));
      return promise;
    },


    update: function (id, description, tagArray, duration, start) {
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


    del: function (id) {
      var promise = _request(_buildUrl('time_entries', id), 'DELETE');
      return promise;
    },


    between: function (startDate, endDate) {
      throw new Error('Timer.getBetween not yet implemented');
    }
  };

  var users = {
    url: function () {
      return _buildUrl('me');
    },


    current: function () {
      var promise = _request(_buildUrl('me'));
      return promise;
    }

  };


  var _buildUrl = function (collection, object, action) {
    return config.baseUrl + config.apiVersion + '/' + collection + ((typeof action !== 'undefined' && typeof object !== 'undefined') ? '/' + object + '/' + action : (typeof action === 'undefined' && typeof object !== 'undefined') ? '/' + object : (typeof object === 'undefined' && typeof action !== 'undefined') ? '/' + action : ''

    );
  };

  var _request = function (url, verb, postdata) {
    var headers = {
      'Authorization': config.auth
    };
    if (typeof verb === 'undefined' && typeof postdata === 'undefined') {
      verb = 'GET';
    } else if (typeof verb === 'undefined' && typeof postdata !== 'undefined') {
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
      success: function (data) {
        deferred.resolve(data);
      },
      error: function (error) {
        deferred.reject(error);
      }
    });
    return deferred.promise();
  };

  var workspaces = {
    url: function () {
      return _buildUrl('workspaces');
    },


    get: function (id) {
      var promise = _request(_buildUrl('workspaces', id));
      return promise;
    },


    all: function () {
      var promise = _request(_buildUrl('workspaces'));
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