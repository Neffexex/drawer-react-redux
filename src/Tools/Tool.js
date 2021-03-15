export default class Tool {
	constructor(canvas, socket, id, updateColor) {
		this.canvas = canvas;
		this.socket = socket
		this.id = id
		this.updateColor = updateColor
		this.ctx = canvas.getContext('2d')
		this.destroyEvents()
	}



	destroyEvents = () => {
		this.canvas.onkeydown = null
		this.canvas.onmousemove = null
		this.canvas.onmousedown = null
		this.canvas.onmouseup = null
	}
}
