(function() {

	let resourceCache = {};
	let readyCallbacks = [];
	let doc = window.document;



	function load(urlOrArr) {
		// checks if developer passed an array of urls else assume just one
		if (urlOrArr instanceof Array) {
			urlOrArr.forEach(function(url) {
				_load(url);
			});
		} else {
			_load(urlOrArr);
		}
	}


	function _load(url) {
		if (resourceCache[url]) {
			return resourceCache[url];

		} else {
			let imageElem = doc.createElement('img');
			imageElem.src = url;

			// attach event listener to each image
			imageElem.onload = function(evt) {
					// add image to cache
					// ex. resourceCache{'images/stone-block.png' : <img src="images/stone-block.png"/> , ...}
					resourceCache[url] = imageElem;

					if (isReady()) {
						// console.log('it is ready');
						readyCallbacks.forEach(function(func) {
							func();
						});
					}
			}

			resourceCache[url] = false;
		}
	}


	function onReady(func) {
		readyCallbacks.push(func);
	}

	function isReady() {
		// assume already loaded
		let ready = true;

		for (let key in resourceCache) {
			if ( resourceCache.hasOwnProperty(key) && !resourceCache[key] ) {
				ready = false;
			}
		}
		return ready;
	}

	function get(url) {
		return resourceCache[url];
	}


	// public api
	window.Resources = {
		load: load,
		onReady: onReady,
		isReady: isReady,
		get: get
	};

})();








