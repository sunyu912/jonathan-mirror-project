const NodeHelper = require("node_helper");
const FbFetcher = require("./fbfetcher.js");
const Log = require("../../../js/logger");
const request = require("request");

module.exports = NodeHelper.create({
	// Override start method.
	start: function () {
		Log.log("Starting node helper for: " + this.name);
	},

	broadcastTodoList: function (todoListMap) {
		console.log("Sent sendSocketNotification before! " + todoListMap);
		this.sendSocketNotification("TODO_LIST", todoListMap);
		console.log("Sent sendSocketNotification!");
	},

	// Override socket notification handler.
	socketNotificationReceived: function (notification, payload) {
		var self = this;
		Log.log("Received the socket message on helper: " + notification + " " + JSON.stringify(payload));
		if (notification === "main") {
			console.log("Feteching the todo list ...");
			request("https://magic-mirror-3b22b.firebaseio.com/todolist.json", function (error, response, body) {
				console.error("error:", error); // Print the error if one occurred
				console.log("statusCode:", response && response.statusCode); // Print the response status code if a response was received
				console.log("body:", body); // Print the HTML for the Google homepage.
				var todoList = JSON.parse(body);
				console.log(todoList.todo1);
				console.log(todoList.todo2);
				console.log(todoList.todo3);
				self.broadcastTodoList(todoList);
			});
		}
	}
});
