/* Magic Mirror
 * Module: HelloWorld
 *
 * By Michael Teeuw https://michaelteeuw.nl
 * MIT Licensed.
 */

Module.register("helloworld", {
	// Default module config.
	defaults: {
		text: "Hello World!",
		name: "Yu Sun"
	},

	start: function () {
		this.mySpecialProperty = "So much wow!";
		Log.log("HelloWorld is started!");
		this.sendSocketNotification("main", { name: "Jonathan", age: 15 }); // JSON
	},

	getTemplate: function () {
		Log.log(this.name + " is started!!!!!");
		return "helloworld.njk";
	},

	getTemplateData: function () {
		return this.config;
	},

	// Override socket notification handler.
	socketNotificationReceived: function (notification, payload) {
		Log.log("Received the notification on the module: " + notification + " " + payload);
		if (notification === "TODO_LIST") {
			console.log("Main file receivied TODO List 1: " + payload);
			console.log("Main file receivied TODO List 2: " + JSON.stringify(payload));
			this.todoList = payload;			
			var todoListDiv = document.getElementById("todoListDiv");
			for (var key in this.todoList) { 
				console.log(key);
				console.log(this.todoList[key]);
				// create
				var todoDiv = document.createElement("div");
				todoDiv.innerHTML = this.todoList[key];
				todoListDiv.appendChild(todoDiv);
			}			
		}
	}
});
