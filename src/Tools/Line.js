import Tool from './Tool'

export default class Line extends Tool {
	constructor(canvas, socket, id) {
		super(canvas, socket, id);
		this.listen()
	}

	listen() {
		this.canvas.onmousemove = this.mouseMoveHandler
		this.canvas.onmousedown = this.mouseDownHandler
		this.canvas.onmouseup = this.mouseUpHandler
	}

	mouseUpHandler = (e) => {
		this.mouseDown = false;
		this.socket.send(JSON.stringify({
			method: 'draw',
			id: this.id,
			figure: {
				type: 'line',
				x: this.startX,
				y: this.startY,
				currentX: this.currentX,
				currentY: this.currentY,
				color: this.ctx.strokeStyle
			}
		}))
	}

	mouseDownHandler = (e) => {
		this.mouseDown = true
		this.ctx.beginPath()
		this.startX = e.pageX - e.target.offsetLeft
		this.startY = e.pageY - e.target.offsetTop
		this.saved = this.canvas.toDataURL()
	}
	mouseMoveHandler = (e) => {
		if (this.mouseDown) {
			this.currentX = e.pageX - e.target.offsetLeft
			this.currentY = e.pageY - e.target.offsetTop
			this.draw(this.startX, this.startY)
		}
	}
	draw = (x, y, r) => {
		const img = new Image()
		img.src = this.saved

		this.ctx.strokeStyle = this.color
		img.onload = () => {
			this.ctx.clearRect(0, 0, this.canvas.width, this.canvas.height)
			this.ctx.drawImage(img, 0, 0, this.canvas.width, this.canvas.height)
			this.ctx.beginPath()
			this.ctx.moveTo(this.currentX, this.currentY);
			this.ctx.lineTo(x, y);
			this.ctx.fill()
			this.ctx.stroke()
		}
	}

	static staticDraw = (ctx, x, y, currentX, currentY, color) => {
		ctx.strokeStyle = color
		ctx.beginPath()
		ctx.moveTo(currentX, currentY);
		ctx.lineTo(x, y);
		ctx.fill()
		ctx.stroke()
	}

}
