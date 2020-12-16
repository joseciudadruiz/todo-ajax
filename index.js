$(document).ready(function () {
var getDisplayTasks = function () {
  $.ajax({
    type: 'GET',
    url: 'https://altcademy-to-do-list-api.herokuapp.com/tasks?api_key=239',
    dataType: 'json',
    success: function (response, textStatus) {
      $('#to-do').empty();
      response.tasks.forEach(function(task) {
          $('#to-do').append('<div class="row"><p class="col-xs-8">' + task.content + '</p><button class="delete" data-id="' + task.id + '">Delete</button><input type="checkbox" class="mark-complete" data-id="' + task.id + '"' + (task.completed ? 'checked' : '') + '>');
      });
  },

    error: function (request, textStatus, errorMessage) {
      console.log(errorMessage);
    }
  });
};
  var createTask = function () {
    $.ajax({
      type: 'POST',
      url: 'https://altcademy-to-do-list-api.herokuapp.com/tasks?api_key=239',
      contentType: 'application/JSON',
      dataType: 'json',
      data: JSON.stringify({
        task: {
          content: $('#new-tasks').val()
        }
      }),
      success: function (response, textStatus) {
        $('#new-tasks').val('');
        getDisplayTasks();
      },
      error: function (request, textStatus, errorMessage) {
        console.log(errorMessage);
      }
    });
  };
  $('#new-content').on('submit', function(e) {
    e.preventDefault();
    createTask();
  });
    getDisplayTasks();

  var deleteTask = function (id) {
    $.ajax({
      type: 'DELETE',
      url: 'https://altcademy-to-do-list-api.herokuapp.com/tasks/' + id + '?api_key=239',
      success: function(response, textStatus){
        getDisplayTasks();
      },
      error: function (request, textStatus, errorMessage) {
        console.log(errorMessage);
      }
    });
  }

    $(document).on('click', '.delete', function () {
      deleteTask($(this).data('id'));
    });
  getDisplayTasks();

var markTaskComplete = function (id) {
  $.ajax({
    type: 'PUT',
    url: 'https://altcademy-to-do-list-api.herokuapp.com/tasks/' + id + '/mark_complete?api_key=239',
    dataType: 'json',
    success: function (response, textStatus) {
      getDisplayTasks();
    },
    error: function (request, textStatus, errorMessage) {
      console.log(errorMessage);
    }
  });
};

var markTaskActive = function (id) {
  $.ajax({
    type: 'PUT',
    url : 'https://altcademy-to-do-list-api.herokuapp.com/tasks/' + id + '/mark_active?api_key=239',
    dataType: 'json',
    success: function(response, textStatus) {
      getDisplayTasks();
    },
    error: function(request, textStatus, errorMessage) {
      console.log(errorMessage);
    }
  })
}
$(document).on('change', '.mark-complete', function () {
  if(this.checked) {
    markTaskComplete($(this).data('id'));
  } else {
    markTaskActive($(this).data('id'));
  }
});
getDisplayTasks();

// completed data
var completeTasks = function () {
  $.ajax({
    type: 'GET',
    url: 'https://altcademy-to-do-list-api.herokuapp.com/tasks?api_key=239',
    dataType: 'json',
    success: function (response, textStatus) {
      $('#to-do').empty();
      response.tasks.forEach(function(task) {
        if (task.completed === true) {
          $('#to-do').append('<div class="row"><p class="col-xs-8">' + task.content + '</p><button class="delete" data-id="' + task.id + '">Delete</button><input type="checkbox" class="mark-complete" data-id="' + task.id + '"' + (task.completed ? 'checked' : '') + '>');
        }
      });
  },

    error: function (request, textStatus, errorMessage) {
      console.log(errorMessage);
    }
  });
};
  $(document).on('click', '#completed', function() {
    completeTasks();
  });

  // activeData
  var activeTasks = function () {
    $.ajax({
      type: 'GET',
      url: 'https://altcademy-to-do-list-api.herokuapp.com/tasks?api_key=239',
      dataType: 'json',
      success: function (response, textStatus) {
        $('#to-do').empty();
        response.tasks.forEach(function(task) {
          if (task.completed === false) {
            $('#to-do').append('<div class="row"><p class="col-xs-8">' + task.content + '</p><button class="delete" data-id="' + task.id + '">Delete</button><input type="checkbox" class="mark-complete" data-id="' + task.id + '"' + (task.completed ? 'checked' : '') + '>');
          }
        });
    },

      error: function (request, textStatus, errorMessage) {
        console.log(errorMessage);
      }
    });
  };
    $(document).on('click', '#active', function() {
      activeTasks();
    });
    // all
    $(document).on('click', '#all', function() {
      $.ajax({
        type: 'GET',
        url: 'https://altcademy-to-do-list-api.herokuapp.com/tasks?api_key=239',
        dataType: 'json',
        success: function (response, textStatus) {
          $('#to-do').empty();
          response.tasks.forEach(function(task) {
              $('#to-do').append('<div class="row"><p class="col-xs-8">' + task.content + '</p><button class="delete" data-id="' + task.id + '">Delete</button><input type="checkbox" class="mark-complete" data-id="' + task.id + '"' + (task.completed ? 'checked' : '') + '>');
          });
      },

        error: function (request, textStatus, errorMessage) {
          console.log(errorMessage);
        }
      });
    })


});
