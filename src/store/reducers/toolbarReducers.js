import {actionTypes} from '../actions/actionTypes'

const initialState = {
	tool: null,
	selectedTool: 1,
	method: 'brush',
}


export const toolbarReducer = (state = initialState, {type, payload}) => {

	switch (type) {
		case actionTypes.SET_TOOL:
			return {
				...state,
				selectedTool: payload.tool
			}
		case actionTypes.SET_WIDTH:
			const toolWidth = state.tool;
			toolWidth.ctx.lineWidth = parseInt(payload.width)
			return {
				...state,
				tool: toolWidth
			}
		case actionTypes.SET_COLOR:
			const toolColor = state.tool;
			toolColor.ctx.fillColor = payload.color
			toolColor.ctx.strokeColor = payload.color
			toolColor.ctx.fillStyle = payload.color
			toolColor.ctx.strokeStyle = payload.color
			return {
				...state,
				canvas: toolColor
			}
		case actionTypes.SET_TOOLBAR:
			return {
				...state,
				tool: payload.tool
			}
		default:
			return state;
	}
}
