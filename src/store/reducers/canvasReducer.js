import {actionTypes} from '../actions/actionTypes'

const initialState = {
	canvas: null,
	sessionId: null,
	socket: null,
	userId: localStorage.getItem('session'),
	undoList : [],
	redoList : [],
	update: null,
	position: {
		x: null,
		y: null,
	},
	text: '',
}



export const canvasReducer = (state = initialState, {type, payload}) => {
	switch(type) {
		case actionTypes.UPDATE_TEXTAREA:
			return {
				...state,
				position: {x: payload.x, y: payload.y}
			}
		case actionTypes.UPDATE_TEXT:
			return {
				...state,
				text: payload.text
			}
		case actionTypes.UPDATE_UNDO_CANVAS: {
			const {canvas, undoList} = payload;
			let undoCanvas = canvas;
			let ctxUndo = undoCanvas.getContext('2d')

			if (undoList.length > 0) {

				let dataUrl = undoList.pop()
				let img = new Image()
				img.src = dataUrl
				img.onload =  () => {
					ctxUndo.clearRect(0,0, state.canvas.width, state.canvas.height)
					ctxUndo.drawImage(img, 0, 0, state.canvas.width, state.canvas.height)
				}
			} else {
				ctxUndo.clearRect(0, 0, state.canvas.width, state.canvas.height)
			}
			return {
				...state,
				undoList,
				canvas: undoCanvas
			}
		}
		case actionTypes.UPDATE_REDO_CANVAS: {
			const { redoList } = payload;
			let redoCanvas = state.canvas;
			let ctx = redoCanvas.getContext('2d')
			if (redoList.length > 0) {
				let dataUrl = redoList.pop()
				// state.undoList.push(state.canvas.toDataURL())
				let img = new Image()
				img.src = dataUrl
				img.onload =  () => {
					ctx.clearRect(0,0, state.canvas.width, state.canvas.height)
					ctx.drawImage(img, 0, 0, state.canvas.width, state.canvas.height)
				}
			}
			return {
				...state,
				redoList,
				canvas: redoCanvas
			}
		}
		case actionTypes.SET_SESSIONID:
			return {
				...state,
				sessionId: payload.sessionId
			}
		case actionTypes.SET_SOCKET:
			return {
				...state,
				socket: payload.socket
			}
		case actionTypes.PUSH_UNDO:
			return {
				...state,
				undoList:  [...state.undoList, payload.undo]
			}
		case actionTypes.REDO:
			let redoCanvas = state.canvas;
			if (state.redoList.length > 0) {
				state.undoList.push(state.canvas.toDataURL())
				state.socket.send(JSON.stringify({
					method: 'redo',
					id: state.sessionId,
					undoList: state.undoList,
					redoList: state.redoList,
				}))
			}
			return {
				...state,
				canvas:  redoCanvas,
			}
		case actionTypes.UNDO:
			let undoCanvas = state.canvas;

			let ctxUndo = undoCanvas.getContext('2d')
			if (state.undoList.length > 0) {
				state.redoList.push(state.canvas.toDataURL())
				state.socket.send(JSON.stringify({
					method: 'undo',
					id: state.sessionId,
					undoList: state.undoList,
					redoList: state.redoList,
				}))

			} else {
				ctxUndo.clearRect(0, 0, state.canvas.width, state.canvas.height)
			}
			return {
				...state,
				canvas:   undoCanvas,
			}
		case actionTypes.SET_CANVAS:
			return {
				...state,
				canvas: payload.canvas
			}
		default:
			return state;
	}
}
