const FeedMe = require("feedme");
const request = require("request");
const Log = require("../../../js/logger");

var FbFetcher = function () {
	var fetchTodoList = function () {
		Log.log("Called get todo list!");

		request("https://magic-mirror-3b22b.firebaseio.com/todolist.json", function (error, response, body) {
			console.error("error:", error); // Print the error if one occurred
			console.log("statusCode:", response && response.statusCode); // Print the response status code if a response was received
			console.log("body:", body); // Print the HTML for the Google homepage.
			var todoList = JSON.parse(body);
			console.log(todoList.todo1);
			console.log(todoList.todo2);
			console.log(todoList.todo3);
		});
	};

	/* startFetch()
	 * Initiate fetchNews();
	 */
	this.startFetch = function () {
		fetchTodoList();
	};
};

module.exports = FbFetcher;
