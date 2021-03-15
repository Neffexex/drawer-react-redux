import {actionTypes} from './actionTypes'

const canvasrChange = (canvas) => ({
	type: actionTypes.SET_CANVAS,
	payload: {canvas}
})



export const canvasActions = (canvas) => dispatch => {
	dispatch(canvasrChange(canvas))
}


export const pushUndoAction = undo => ({
	type: actionTypes.PUSH_UNDO,
	payload: {undo}
})



export const redoAction = () => ({
	type: actionTypes.REDO
})
export const undoAction = (canvas, undoList) => ({
	type: actionTypes.UNDO,
	payload: {canvas, undoList}
})



export const socketAction = socket => ({
	type: actionTypes.SET_SOCKET,
	payload: {socket}
})

export const sessionId = sessionId => ({
	type: actionTypes.SET_SESSIONID,
	payload: {sessionId}
})


export const update = (undoList, canvas) => ({
	type: actionTypes.UPDATE_UNDO_CANVAS,
	payload: {undoList, canvas}
})
export const updateRedo = (redoList) => ({
	type: actionTypes.UPDATE_REDO_CANVAS,
	payload: {redoList}
})
