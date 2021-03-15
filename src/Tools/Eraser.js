import Tool from './Tool'

export default class Eraser extends Tool {
	constructor(canvas, socket, id, color) {
		super(canvas, socket, id, color);
		this.listen()
	}

	listen() {
		this.canvas.onmousemove = this.mouseMoveHandler
		this.canvas.onmousedown = this.mouseDownHandler
		this.canvas.onmouseup = this.mouseUpHandler
		this.canvas.onmouseleave = this.mouseLeaveHandler
	}
	mouseLeaveHandler = () => {
		this.ctx.fillStyle = this.updateColor
		this.ctx.strokeStyle = this.updateColor
	}
	mouseUpHandler = (e) => {
		this.ctx.fillStyle = this.updateColor
		this.ctx.strokeStyle = this.updateColor
		this.mouseDown = false;
		this.socket.send(JSON.stringify({
			method:  'draw',
			id: this.id,
			figure: {
				type: 'finish',
			}
		}))
	}

	mouseDownHandler = (e) => {
		this.mouseDown = true
		this.ctx.beginPath()
		this.ctx.moveTo(e.pageX - e.target.offsetLeft, e.pageY - e.target.offsetTop)
	}
	mouseMoveHandler = (e) => {
		if (this.mouseDown) {
			// this.draw(e.pageX - e.target.offsetLeft, e.pageY - e.target.offsetTop)
			this.socket.send(JSON.stringify({
				method: 'draw',
				id: this.id,
				figure: {
					type: 'eraser',
					x: e.pageX - e.target.offsetLeft,
					y: e.pageY - e.target.offsetTop,
					width: this.ctx.lineWidth
				}
			}))
		}
	}
	static staticDraw = (ctx, x, y, width) => {
		ctx.lineWidth = width;
		ctx.strokeStyle = 'white'
		ctx.lineTo(x, y)
		ctx.stroke()
	}
}
