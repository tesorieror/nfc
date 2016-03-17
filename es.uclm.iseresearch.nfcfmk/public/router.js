var LocalRouter = function() {
	var self = this
	this.map = {}
	this.map['FIRST_PHOTO'] = 'firstPhoto'
	this.map['PREV_PHOTO'] = 'prevPhoto'
	this.map['NEXT_PHOTO'] = 'nextPhoto'
	this.map['LAST_PHOTO'] = 'lastPhoto'

	this.map['FIRST_GALLERY'] = 'firstGallery'
	this.map['PREV_GALLERY'] = 'prevGallery'
	this.map['NEXT_GALLERY'] = 'nextGallery'
	this.map['LAST_GALLERY'] = 'lastGallery'

	this.map['MODEL_STATE'] = 'getModelState'
		
	this.getFunctionName = function(tag, callback) {
		// if (self.map[tag.id])
		callback(self.map[tag.id])
	}
}

var TagRouter = function() {
	var self = this
	this.getFunctionName = function(tag, callback) {
		callback(tag.content)
	}
}

var RemoteRouter = function() {
	var self = this

	function createRequest() {
		var result = null;
		if (window.XMLHttpRequest) {
			// FireFox, Safari, etc.
			result = new XMLHttpRequest();
			if (typeof result.overrideMimeType != 'undefined') {
				result.overrideMimeType('text/json'); // Or anything else
			}
		} else if (window.ActiveXObject) {
			// MSIE
			result = new ActiveXObject("Microsoft.XMLHTTP");
		} else {
			// No known mechanism -- consider aborting the application
		}
		return result;
	}

	this.getFunctionName = function(tag, callback, error) {
		var xhttp = createRequest();
		xhttp.open("GET", "/functions/" + tag.id, true);
		xhttp.onreadystatechange = function() {
			if (xhttp.readyState == 4 && xhttp.status == 200) {
				console.log(xhttp.responseText);
				callback(xhttp.responseText)
			}
		};
		xhttp.send();
	}
}