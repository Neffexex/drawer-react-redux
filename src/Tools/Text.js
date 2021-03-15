import Drawer from './Tool'
import store from '../store/store';
import {setPositionAction, setTextAction, setToolAction, toolbarAction} from '../store/actions/toolbarActions'
import Brush from './Brush'

export default class Text extends Drawer {
	constructor(canvas, socket, id) {
		super(canvas, socket, id);
		this.listen()
	}

	listen() {
		this.canvas.onclick = this.clickHandler
		this.canvas.onmouseup = this.mouseDownHandler
		this.canvas.onmousemove = this.mouseMoveHandler
	}


	clickHandler = (e) => {


	}


	mouseDownHandler = (e) => {
		if (store.getState().canvas.text) {

			this.socket.send(JSON.stringify({
				method: 'typing',
				id: this.id,
				posX: this.startX,
				posY: this.startY,
				text: store.getState().canvas.text
			}))
			this.mouseDown = true;
			store.dispatch(toolbarAction(new Brush(this.canvas, this.socket, this.id)))
			store.dispatch(setTextAction(''))
			store.dispatch(setToolAction(1))
			store.dispatch(setPositionAction(null, null))
		} else {
			this.startX = e.pageX - e.target.offsetLeft
			this.startY = e.pageY - e.target.offsetTop
			store.dispatch(setPositionAction(e.pageX - e.target.offsetLeft, e.pageY - e.target.offsetTop))
		}
	}


	static staticDraw(ctx, x, y, text) {
		ctx.font = '20px Arial';
		ctx.fillText(text, x, y)
	}
}
