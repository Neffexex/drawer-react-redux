import Tool from './Tool'

export default class Star extends Tool {
	constructor(canvas, socket, id) {
		super(canvas, socket, id);
		this.listen()
	}

	listen () {
		this.canvas.onmousemove = this.mouseMoveHandler
		this.canvas.onmousedown = this.mouseDownHandler
		this.canvas.onmouseup = this.mouseUpHandler
	}

	mouseUpHandler = (e) =>  {
		this.mouseDown = false;
		this.socket.send(JSON.stringify({
			method: 'draw',
			id: this.id,
			figure: {
				type: 'star',
				cx: this.startX,
				cy: this.startY,
				spikes: 5,
				color: this.ctx.strokeStyle,
				outerRadius: 30,
				innerRadius: 15
			}
		}))
	}

	mouseDownHandler = (e) => {
		this.mouseDown = true
		this.ctx.beginPath()
		this.startX = e.pageX  - e.target.offsetLeft
		this.startY = e.pageY - e.target.offsetTop
		this.saved = this.canvas.toDataURL()
	}
	mouseMoveHandler = (e) => {
		if(this.mouseDown) {
			this.currentX = e.pageX  - e.target.offsetLeft;
			this.currentY = e.pageY - e.target.offsetTop;
			this.width  = this.currentX  - this.startX;
			this.height = this.currentY  - this.startY
			this.r = Math.sqrt(this.width**2 + this.height**2)
			// this.draw(this.startX, this.startY, this.r)
		}
	}
	draw  = (x, y, r) => {
		const img = new Image()
		img.src = this.saved
		img.onload = () => {
			this.ctx.clearRect(0, 0, this.canvas.width, this.canvas.height)
			this.ctx.drawImage(img, 0, 0,  this.canvas.width, this.canvas.height)
			this.ctx.beginPath()
			this.ctx.arc(x, y, r,0, Math.PI * 2)
			this.ctx.stroke()
		}
	}

	static staticDraw(ctx, cx, cy, spikes, outerRadius, innerRadius, color) {
		var rot = Math.PI / 2 * 3;
		var x = cx;
		var y = cy;
		var step = Math.PI / spikes;

		ctx.strokeSyle = "#000";
		ctx.beginPath();
		ctx.moveTo(cx, cy - outerRadius)
		for (let i = 0; i < spikes; i++) {
			x = cx + Math.cos(rot) * outerRadius;
			y = cy + Math.sin(rot) * outerRadius;
			ctx.lineTo(x, y)
			rot += step

			x = cx + Math.cos(rot) * innerRadius;
			y = cy + Math.sin(rot) * innerRadius;
			ctx.lineTo(x, y)
			rot += step
		}
		ctx.lineTo(cx, cy - outerRadius)
		ctx.closePath();
		ctx.lineWidth=5;
		ctx.strokeStyle=color;
		ctx.stroke();
		ctx.fillStyle=color;
	}
}
