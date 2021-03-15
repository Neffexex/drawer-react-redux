import {actionTypes} from './actionTypes'

const toolbarChange = (tool) => ({
	type: actionTypes.SET_TOOLBAR,
	payload: {tool}
})



export const toolbarAction = (toolbar) => dispatch => {
	dispatch(toolbarChange(toolbar))
}



export const colorChangeAction = color => ({
	type: actionTypes.SET_COLOR,
	payload: {color}
})


export const setWidthAction = width => ({
	type: actionTypes.SET_WIDTH,
	payload: {width}
})


export const setMethodAction = method => ({
	type: actionTypes.SET_METHOD,
	payload: {method}
})

export const setPositionAction = (x, y) => ({
	type: actionTypes.UPDATE_TEXTAREA,
	payload: {x, y}
})


export const setTextAction = text => ({
	type: actionTypes.UPDATE_TEXT,
	payload: {text}
})



export const setToolAction = tool => ({
	type: actionTypes.SET_TOOL,
	payload: {tool}
})
