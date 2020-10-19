var canv = document.getElementById('canvas'),
	ctx = canv.getContext('2d'),
	isMouseDown = false,
	coords = [];
canv.width = window.innerWidth;
canv.height = window.innerHeight;

// ===========================================
canv.addEventListener('mousedown', function () {
	isMouseDown = true;
})

canv.addEventListener('mouseup', function () {
	isMouseDown = false;
	ctx.beginPath();
	coords.push('mouseup');
})

canv.addEventListener('mousemove', function (e) {
	if (isMouseDown) {
		coords.push([e.clientX, e.clientY]);

		ctx.lineWidth = 20;
		ctx.lineTo(e.clientX, e.clientY);
		ctx.stroke();

		ctx.beginPath();
		ctx.arc(e.clientX, e.clientY, 10, 0, Math.PI * 2);
		ctx.fill();

		ctx.beginPath();
		ctx.moveTo(e.clientX, e.clientY);
	}
});

function save() {
	localStorage.setItem('coords', JSON.stringify(coords));
}

function clear() {
	ctx.fillStyle = 'white';
	ctx.fillRect(0, 0, canv.width, canv.height);

	ctx.beginPath();
	ctx.fillStyle = 'black';
}

function replay() {
	var
		timer = setInterval(function () {
			if (!coords.length) {
				clearInterval(timer);
				ctx.beginPath();
				return;
			}
			var
				crd = coords.shift(),
				e = {
					clientX: crd['0'],
					clientY: crd['1']
				};
			ctx.lineTo(e.clientX, e.clientY);
			ctx.stroke();

			ctx.beginPath();
			ctx.arc(e.clientX, e.clientY, 10, 0, Math.PI * 2);
			ctx.fill();

			ctx.beginPath();
			ctx.moveTo(e.clientX, e.clientY);
		}, 10)
}

document.addEventListener('keydown', function (e) {
	if (e.keyCode == 83) {
		//save
		save();
		console.log('Saved');
	}
	if (e.keyCode == 82) {
		//replay
		console.log('Replaying ...');
		coords = JSON.parse(localStorage.getItem('coords'));

		clear();
		replay();
	}
	if (e.keyCode == 67) {
		//clear
		clear();
		console.log('Cleared');
	}
})
