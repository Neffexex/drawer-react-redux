import { combineReducers } from 'redux'
import {toolbarReducer} from './toolbarReducers'
import {canvasReducer} from './canvasReducer'


const rootReducers = combineReducers({
		toolbar: toolbarReducer,
		canvas: canvasReducer
})


export default rootReducers
