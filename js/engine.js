var Engine = (function(global) {

	let win = global.window;
	let doc = global.document;
	let canvas = doc.createElement('canvas');
	let ctx = canvas.getContext('2d');

	let lastTime;

	canvas.width = 505;
	canvas.height = 606;
	canvas.id = 'canvas';
	doc.body.appendChild(canvas);



	function init() {
		// reset();
		lastTime = Date.now();
		main();
	}
	// function reset() {}


	function main() {
		let now = Date.now();
		let dt = (now - lastTime) / 1000.0;

		update(dt);
		render();

		lastTime = now;
		
		win.requestAnimationFrame(main);
	}


	function update(dt) {
		updateEntities(dt);
	}
	

	function updateEntities(dt) {
		// allEnemies[] retrieved via app.js
		allEnemies.forEach(function(enemy) {
			// update each enemy object
			enemy.update(dt);
		});
		// update player object
		player.update();
	}


	// renders game board, enemies and player
	function render() {
		var rowImages = [
			'images/water-block.png',
			'images/stone-block.png',
			'images/stone-block.png',
			'images/stone-block.png',
			'images/grass-block.png',
			'images/grass-block.png'
		];
		var numRows = 6;
		var numCols = 5;
		var row;
		var col;

		// clear canvas before drawing
		ctx.clearRect(0, 0, canvas.width, canvas.height);
		// loop to draw rows and columns of images
		for (row = 0; row < numRows; row++) {

			for (col = 0; col < numCols; col++) {
				// drawImage(imageURL, x coord to start, y coord to start)
				ctx.drawImage( Resources.get(rowImages[row]), col*101, row*83 );
			}
		}

		renderEntities();
	}


	// renders enemies and player
	function renderEntities() {
		allEnemies.forEach(function(enemy) {
			enemy.render();
		});
		player.render();
	}




	Resources.load([
		'images/stone-block.png',
		'images/water-block.png',
		'images/grass-block.png',
		'images/enemy-bug.png',
		'images/char-boy.png'
	]);
	Resources.onReady(init);


	// allows global access to ctx
	global.ctx = ctx;

})(this);

