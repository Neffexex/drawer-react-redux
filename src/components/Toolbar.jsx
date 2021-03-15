import React, {useState} from 'react';
import '../styles/toolbar.scss';
import {BrushIcon, EraserIcon, FigureIcon, LineIcon, RedoIcon, TextIcon, UndoIcon} from '../icons/Icons'
import {useDispatch, useSelector} from 'react-redux'
import Brush from '../Tools/Brush'
import {colorChangeAction, setToolAction, setWidthAction, toolbarAction} from '../store/actions/toolbarActions'
import Line from '../Tools/Line'
import {redoAction, undoAction} from '../store/actions/canvasActions'
import Tooltip from '@material-ui/core/Tooltip';

import Eraser from '../Tools/Eraser'
import TextClass from '../Tools/Text'

const Toolbar = () => {
	const [changeColor, setChangeColor] = useState('#000')
	const canvas = useSelector(state => state.canvas.canvas)
	const undoList = useSelector(state => state.canvas.undoList)
	const redoList = useSelector(state => state.canvas.redoList)
	const selectedFigure = useSelector(state => state.toolbar.selectedTool)
	const canvasState = useSelector(state => state.canvas)
	const color = useSelector(state => state.toolbar.color)
	const dispatch = useDispatch()
	const handleClick = (tool, idx) => {
		dispatch(toolbarAction(tool))
		dispatch(setToolAction(idx))
		if(idx === 3) {
			dispatch(setWidthAction(15))
		}
	}
	const handleChangeColor = ({target: {value}}) => {
		dispatch(colorChangeAction(value))
		setChangeColor(value)
	}



	return (
		<div className="toolbar">
			<Tooltip title="Кисть" placement="right-end">
				<button className={selectedFigure === 1 ? 'active' : ''}
								onClick={() => handleClick(new Brush(canvas, canvasState.socket, canvasState.sessionId), 1)}>
					<BrushIcon/>
				</button>
			</Tooltip>
			<Tooltip title="Линия" placement="right-end">
				<button className={selectedFigure === 2 ? 'active' : ''}
								onClick={() => handleClick(new Line(canvas, canvasState.socket, canvasState.sessionId), 2)}>
					<LineIcon/>
				</button>
			</Tooltip>
			<Tooltip title="Стиралка" placement="right-end">
				<button className={selectedFigure === 3 ? 'active' : ''}
								onClick={() => handleClick(new Eraser(canvas, canvasState.socket, canvasState.sessionId, changeColor), 3)}>
					<EraserIcon/></button>
			</Tooltip>
			<Tooltip title="Фигуры" placement="right-end">
				<button className={selectedFigure === 4 ? 'active' : ''} onClick={() => dispatch(setToolAction(4))}>
					<FigureIcon/>
				</button>
			</Tooltip>
			<Tooltip title="Текст" placement="right-end">
				<button className={selectedFigure === 5 ? 'active' : ''}
								onClick={() => handleClick(new TextClass(canvas, canvasState.socket, canvasState.sessionId), 5)}><TextIcon />
				</button>
			</Tooltip>
			<Tooltip title="colors" placement="right-end">
				<button><input id="color" value={color} onChange={handleChangeColor} type="color"/></button>
			</Tooltip>
			<Tooltip title="Отменить"  placement="left-start">
				<button className={!undoList.length && 'disabled'} onClick={() => dispatch(undoAction())}><UndoIcon /></button>
			</Tooltip>
			<Tooltip title="Вернуть"    placement="left-start">
				<button className={!redoList.length && 'disabled'}  onClick={() => dispatch(redoAction())}><RedoIcon /></button>
			</Tooltip>
		</div>
	);
};

export default Toolbar;
