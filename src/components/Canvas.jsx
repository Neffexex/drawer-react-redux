import React, {useEffect, useRef} from 'react';
import '../styles/canvas.scss'
import {useDispatch, useSelector} from 'react-redux'
import {
	canvasActions,
	pushUndoAction,
	sessionId,
	socketAction,
	update, updateRedo
} from '../store/actions/canvasActions'
import {setTextAction,  toolbarAction} from '../store/actions/toolbarActions'
import Brush from '../Tools/Brush'
import {useParams} from 'react-router-dom'
import Rect from '../Tools/Rect'
import Circle from '../Tools/Circle'
import Line from '../Tools/Line'
import Eraser from '../Tools/Eraser'
import Star from '../Tools/Star'
import TextClass from '../Tools/Text'

const Canvas = () => {
	const canvasRef = useRef()
	const position = useSelector(state => state.canvas.position)
	const text = useSelector(state => state.canvas.text)
	const selectedFigure = useSelector(state => state.toolbar.selectedTool)
	const textRef = useRef()

	useEffect(() => {
		if (selectedFigure === 5) {
			textRef.current.focus()
		}
	}, [position])



	const dispatch = useDispatch()
	const id = useParams().id
	useEffect(() => {
		dispatch(canvasActions(canvasRef.current))
	}, [dispatch])
	const mouseDownHandler = () => {
		dispatch(pushUndoAction(canvasRef.current.toDataURL()))
	}


	useEffect(() => {
		const socket = new WebSocket(`wss://draw-app-canvas.herokuapp.com/`)
		socket.onopen = () => {
			dispatch(socketAction(socket))
			dispatch(sessionId(id))
			dispatch(toolbarAction(new Brush(canvasRef.current, socket, id)))
			socket.send(JSON.stringify({
				id,
				method: 'connection'
			}))
		}
		socket.onmessage = (event) => {
			let msg = JSON.parse(event.data)
			switch (msg.method) {
				case 'connection':
					console.log('Connected')
					break
				case 'draw':
					drawHandler(msg)
					break
				case 'undo':
					console.log('undo', msg)
					undoFn(msg)
					break
				case 'redo':
					redoFn(msg)
					break;
				case 'typing':
					typingFn(msg)
					break

			}
		}
	}, [])
	const typingFn = (msg) => {
		const ctx = canvasRef.current.getContext('2d')

		TextClass.staticDraw(ctx, msg.posX, msg.posY, msg.text)
	}
	const redoFn = (msg) => dispatch(updateRedo(msg.redoList))
	const undoFn = (msg) => {
		dispatch(update(msg.undoList, canvasRef.current))
	}
	const drawHandler = (msg) => {
		const figure = msg.figure
		const ctx = canvasRef.current.getContext('2d')
		switch (figure.type) {
			case 'brush':
				Brush.draw(ctx, figure.x, figure.y)
				break
			case 'eraser':
				Eraser.staticDraw(ctx, figure.x, figure.y, figure.width)
				break;
			case 'rect':
				Rect.staticDraw(ctx, figure.x, figure.y, figure.w, figure.h, figure.color)
				break;
			case 'circle':
				Circle.staticDraw(ctx, figure.x, figure.y, figure.r, figure.color)
				break;
			case 'line':
				Line.staticDraw(ctx, figure.x, figure.y, figure.currentX, figure.currentY, figure.color)
				break;
			case 'star':
				Star.staticDraw(ctx, figure.cx, figure.cy, figure.spikes, figure.outerRadius, figure.innerRadius, figure.color)
				break;
			case 'finish':
				ctx.beginPath()
				break
		}
	}


	console.log(position)
	return (
		<div className="canvas">
			<textarea
				autoFocus={true}
				ref={textRef}
				style={{
					top: position.y + 80,
					left: position.x + 160,
					display: position.x ? '' : 'none'
				}}
				onBlur={() => {}}
				value={text}
				onChange={({target: {value}}) => dispatch(setTextAction(value))}/>
			<canvas onMouseDown={() => mouseDownHandler()} ref={canvasRef} width={1200} height={500}/>
		</div>
	);
};

export default Canvas;
