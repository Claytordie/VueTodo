//Set up local storage to maintain data after closing browser window
var STORAGE_KEY = 'todoswithvue'
var todoStorage = {
  fetch: function () {
    var todos = JSON.parse(localStorage.getItem(STORAGE_KEY) || '[]')
    todos.forEach(function (todo, index) {
      todo.id = index
    })
    todoStorage.uid = todos.length
    return todos
  },
  save: function (todos) {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(todos))
  }
}

//Random Color Generator for Backgrounds
 function colorWheel() {
    var randomColor = Math.floor(Math.random()*16777215).toString(16);
    var color = '#' + randomColor;
    return color;
}

//Vue instance
var tasklist = new Vue({
    el: '#tasklist',
    data: {
        items: todoStorage.fetch(),
        todoName: "",
        todoDetail: ""
    },
    methods: {
        addtask: function () {
            if (this.todoName)
            this.items.push({text: this.todoName, description: this.todoDetail, bgColor: colorWheel()});
            this.todoName = "";
            this.todoDetail = "";           
        },
        removetask: function (task) {
            this.items.splice(this.items.indexOf(task), 1);
        }
    },
    watch: {
        items: 
            function (items) {
                todoStorage.save(items);
            
        }
    }
})










