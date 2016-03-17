/**
 * http://usejsdoc.org/
 */

var Actions = {
	"FIRST_PHOTO" : "firstPhoto",
	"PREV_PHOTO" : "prevPhoto",
	"NEXT_PHOTO" : "nextPhoto",
	"LAST_PHOTO" : "lastPhoto",
	"FIRST_GALLERY" : "firstGallery",
	"PREV_GALLERY" : "prevGallery",
	"NEXT_GALLERY" : "nextGallery",
	"LAST_GALLERY" : "lastGallery",
	"MODEL_STATE" : "getModelState"
}

var LocalModel = function(update) {
	var self = this
	this.galleryLength = [ 4, 4, 4, 4 ]
	this.photoIndex = 0
	this.galleryIndex = 0

	this.nextPhoto = function() {
		this.photoIndex = (this.photoIndex < this.galleryLength[this.galleryIndex] - 1) ? this.photoIndex + 1
				: this.photoIndex;
		return update(Actions.NEXT_PHOTO, this.getModelState())
	}

	this.prevPhoto = function() {
		this.photoIndex = (this.photoIndex > 0) ? this.photoIndex - 1
				: this.photoIndex;
		return update(Actions.PREV_PHOTO, this.getModelState())
	}

	this.firstPhoto = function() {
		this.photoIndex = 0
		return update(Actions.FIRST_PHOTO, this.getModelState())
	}

	this.lastPhoto = function() {
		this.photoIndex = this.galleryLength[this.galleryIndex] - 1
		update(Actions.LAST_PHOTO, this.getModelState())
	}

	this.nextGallery = function() {
		this.galleryIndex = this.galleryIndex < this.galleryLength.length - 1 ? this.galleryIndex + 1
				: this.galleryIndex
		this.photoIndex = 0
		return update(Actions.NEXT_GALLERY, this.getModelState())
	}

	this.prevGallery = function() {
		this.galleryIndex = this.galleryIndex > 0 ? this.galleryIndex - 1
				: this.galleryIndex
		this.photoIndex = 0
		return update(Actions.PREV_GALLERY, this.getModelState())
	}

	this.firstGallery = function() {
		this.galleryIndex = 0
		this.photoIndex = 0
		return update(Actions.FIRST_GALLERY, this.getModelState())
	}

	this.lastGallery = function() {
		this.galleryIndex = this.galleryLength.length - 1
		this.photoIndex = 0
		return update(Actions.LAST_GALLERY, this.getModelState())
	}

	this.getModelState = function() {
		return {
			photo : this.photoIndex,
			gallery : this.galleryIndex,
		}
	}
}

var RemoteModel = function(update) {

	var self = this

//	this.update = update

	this.nextPhoto = function() {
		var params = {}
		// Code
		execute(Actions.NEXT_PHOTO, params);
	}

	this.prevPhoto = function() {
		var params = {}
		// Code
		execute(Actions.PREV_PHOTO, params);
	}

	this.firstPhoto = function() {
		var params = {}
		// Code
		execute(Actions.FIRST_PHOTO, params);
	}

	this.lastPhoto = function() {
		var params = {}
		// Code
		execute(Actions.LAST_PHOTO, params);
	}

	this.nextGallery = function() {
		var params = {}
		// Code
		execute(Actions.NEXT_GALLERY, params);
	}

	this.prevGallery = function() {
		var params = {}
		// Code
		execute(Actions.PREV_GALLERY, params);
	}

	this.firstGallery = function() {
		var params
		// Code
		execute(Actions.FIRST_GALLERY, params);
	}

	this.lastGallery = function() {
		var params
		// Code
		execute(Actions.LAST_GALLERY, params);
	}

	function execute(action, params) {
		var xhttp = createRequest()
		xhttp.open("POST", "/modelsrv/" + action, true);
		xhttp.onreadystatechange = function() {
			if (xhttp.readyState == 4 && xhttp.status == 200) {
				console.log('Result', xhttp.responseText);
				var result = JSON.parse(xhttp.responseText) 
				update(action, params, result)
			}
		};
		xhttp.send();
	}

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
};