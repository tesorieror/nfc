/**
 * http://usejsdoc.org/
 */

var model = new RemoteModel(update);
//var model = new LocalModel(update)

// var router = new TagRouter()
var router = new LocalRouter()

var dispatcher = new function() {
	var self = this
	this.tagDiscovered = function(tag) {
		// console.log(router);
		console.log("Tag discovered:", tag.id)
		router.getFunctionName(tag, function(action) {
			// console.log("Model", model)
			console.log("Displatcher.getFunctionName", action)
			try {
				model[action]()
			} catch (e) {
				console.error(e.message)
				console.error(e)
			}
		})
	}
}(router)

function discover(e) {
	var tagid = document.getElementsByName("tagid")[0].value
	var tagcontent = document.getElementsByName("tagcontent")[0].value
	dispatcher.tagDiscovered({
		id : tagid,
		content : tagcontent
	})
}

function routerChanged() {
	var routerType = document.getElementsByName("router")[0].value
	router = new window[routerType]();
}

// model.showState()

function update(action, params, result) {
	console.log("Update", action)
	console.log("Params", params)
	console.log("Result", result);
}

function init() {

}

/**
 * Functions
 */

