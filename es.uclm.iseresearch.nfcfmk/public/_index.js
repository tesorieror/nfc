/**
 * http://usejsdoc.org/
 */

// var model = new RemoteModel(update);
var gallery = new LocalModel()

// var router = new TagRouter()
var router = new LocalRouter()

// var controller = new NFCController(gallery, window)
var controller = new DefaultController(gallery, window)

var DefaultController = function(gallery, window) {
	var self = this
	var view = window
	var model = gallery

	this.firstGalleryButtonClicked = function() {
		model.firstGallery()
	}

	this.prevGalleryButtonClicked = function() {
		model.prevGallery()
	}

	this.nextGalleryButtonClicked = function() {
		model.nextGallery()
	}

	this.lastGalleryButtonClicked = function() {
		model.lastGallery()
	}

	this.firstPhotoButtonClicked = function() {
		model.firstPhoto()
	}

	this.prevPhotoButtonClicked = function() {
		model.prevPhoto()
	}

	this.nextPhotoButtonClicked = function() {
		model.nextPhoto()
	}

	this.lastPhotoButtonClicked = function() {
		model.lastPhoto()
	}

	function updatePhoto() {
		model.getImageUrl(function(result) {
			if (!result.error) {
				view.document.getElementById('photo').src(result.data);
			} else {
				console.error(result.error);
			}
		});
	}

	function modelChanged(info) {
		if (info.aspect == ModelAspects.PHOTO_CHANGED)
			updatePhoto();
	}
	
	model.addListener(modelChanged)

	// iniitialization
	updatePhoto()
}

var ModelAspects = {
	"PHOTO_CHANGED" : 0,
	"GALLERY_CHANGED" : 1
}

var LocalModel = function() {
	var self = this

	this.galleryLength = [ 4, 4, 4, 4 ]
	this.photoIndex = 0
	this.galleryIndex = 0

	this.listeners = [];

	this.addListener = function(listener) {
		self.listeners.push(listener)
	}

	this.removeListener = function(listener) {
		var index = self.listeners.indexOf(listener)
		if (index > -1)
			self.listeners.splice(index, 1)
	}

	function changed(event) {
		for (var i = 0; i < self.listeners.length; i++) {
			listener[i](event)
		}
	}

	this.setPhotoIndex = function(index) {
		self.photoIndex = index
		changed({
			aspect : ModelAspects.PHOTO_CHANGED,
			data : self.photoIndex,
			error : null
		});
	}

	this.setGalleryIndex = function(index) {
		self.galleryIndex = index
		changed({
			aspect : ModelAspects.GALLERY_CHANGED,
			data : self.galleryIndex,
			error : null
		})
	}

	this.nextPhoto = function() {
		self
				.setPhotoIndex((self.photoIndex < self.galleryLength[this.galleryIndex] - 1) ? self.photoIndex + 1
						: self.photoIndex)
	}

	this.prevPhoto = function() {
		self.setPhotoIndex((self.photoIndex > 0) ? self.photoIndex - 1
				: self.photoIndex)
	}

	this.firstPhoto = function() {
		self.setPhotoIndex(0)
	}

	this.lastPhoto = function() {
		self.setPhotoIndex(self.galleryLength[self.galleryIndex] - 1)
	}

	this.nextGallery = function() {
		self
				.setGalleryIndex(self.galleryIndex < self.galleryLength.length - 1 ? self.galleryIndex + 1
						: self.galleryIndex)
		self.setPhotoIndex(0)
	}

	this.prevGallery = function() {
		self.setGalleryIndex(self.galleryIndex > 0 ? self.galleryIndex - 1
				: self.galleryIndex)
		self.setPhotoIndex(0)
	}

	this.firstGallery = function() {
		self.SetGalleryIndex(0)
		self.SetPhotoIndex(0)
	}

	this.lastGallery = function() {
		self.setGalleryIndex(self.galleryLength.length - 1)
		self.setPhotoIndex(0)
	}

	/**
	 * Model Query
	 */

	this.getImageUrl = function(callback) {
		callback({
			data : buildImasgeUrl(),
			error : null
		})
	}

	this.getPhotoIndex = function(callback) {
		callback({
			data : self.photoIndex,
			error : null
		})
	}

	this.getGalleryIndex = function(callback) {
		callback({
			data : self.galleryIndex,
			error : null
		})
	}

	function buildImageUrl() {
		return '/resources/' + this.galleryIndex + '/' + this.photoIndex
				+ '.png'
	}
}

// var Actions = {
// "FIRST_PHOTO" : "firstPhoto",
// "PREV_PHOTO" : "prevPhoto",
// "NEXT_PHOTO" : "nextPhoto",
// "LAST_PHOTO" : "lastPhoto",
// "FIRST_GALLERY" : "firstGallery",
// "PREV_GALLERY" : "prevGallery",
// "NEXT_GALLERY" : "nextGallery",
// "LAST_GALLERY" : "lastGallery",
// "MODEL_STATE" : "getModelState",
// "GET_IMAGE_URL" : "getImageUrl"
// }

//
// var dispatcher = new function() {
// var self = this
// this.tagDiscovered = function(tag) {
// // console.log(router);
// console.log("Tag discovered:", tag.id)
// router.getFunctionName(tag, function(action) {
// // console.log("Model", model)
// console.log("Displatcher.getFunctionName", action)
// try {
// model[action]()
// } catch (e) {
// console.error(e.message)
// console.error(e)
// }
// })
// }
// }(router)
//
// function discover(e) {
// var tagid = document.getElementsByName("tagid")[0].value
// var tagcontent = document.getElementsByName("tagcontent")[0].value
// dispatcher.tagDiscovered({
// id : tagid,
// content : tagcontent
// })
// }
//
// function routerChanged() {
// var routerType = document.getElementsByName("router")[0].value
// router = new window[routerType]();
// }
//
// // model.showState()
//
// function update(action, params, result) {
// console.log("Update", action)
// console.log("Params", params)
// console.log("Result", result);
// }
//
function init() {

}

/**
 * Functions
 */

