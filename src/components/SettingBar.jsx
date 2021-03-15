import React, {useState} from 'react';
import {useDispatch, useSelector} from 'react-redux'
import {setWidthAction, toolbarAction} from '../store/actions/toolbarActions'
import {CircleIcon, HamburgerIcon, SquareIcon, StarIcon} from '../icons/Icons'
import Circle from '../Tools/Circle'
import Rect from '../Tools/Rect'
import Star from '../Tools/Star'
import DrawerSidebar from './Drawer'
import {Slider, withStyles} from '@material-ui/core'

const SettingBar = () => {
	const selectedFigure = useSelector(state => state.toolbar.selectedTool)
	const [open, setOpen] = useState(false)
	const canvasState = useSelector(state => state.canvas)
	const canvas = useSelector(state => state.canvas.canvas)
	const dispatch = useDispatch()
	const [idx, setIdx] = useState(null)
	const handleClick = (tool, idx) => {
		dispatch(toolbarAction(tool))
		setIdx(idx)
	}


	const toggleOpen = () => setOpen(!open)
	return (
		<div className="settingBar">
			<div className="settingBar__header">
				<div className="settingBar__hamburger" onClick={toggleOpen}>
					<HamburgerIcon />
				</div>
			</div>
			{[1,2,3].includes(selectedFigure) && <div className="weight-slider">
				<PrettoSlider   valueLabelDisplay="auto" min={1} max={50} onChange={(e, value) => dispatch(setWidthAction(value))} aria-label="pretto slider" defaultValue={1} />
			</div>}
			{selectedFigure === 4 && 	<div className="settingBar__figure">
				<div className={`settingBar__circle ${idx === 1 && "activeFigure"}`} onClick={() => handleClick(new Circle(canvas, canvasState.socket, canvasState.sessionId), 1)}>
					<CircleIcon />
				</div>
				<div className={`settingBar__square ${idx === 2 && "activeFigure"}`} onClick={() => handleClick(new Rect(canvas, canvasState.socket, canvasState.sessionId), 2)}>
					<SquareIcon />
				</div>
				<div className={`settingBar__star ${idx === 3 && "activeFigure"}`} onClick={() => handleClick(new Star(canvas, canvasState.socket, canvasState.sessionId), 3)}>
					<StarIcon />
				</div>
			</div>}
			<DrawerSidebar open={open} close={toggleOpen} />
		</div>
	);
};

const PrettoSlider = withStyles({
	root: {
		color: '#3897f0',
		height: 8,
	},
	thumb: {
		height: 24,
		width: 24,
		backgroundColor: '#fff',
		border: '2px solid currentColor',
		marginTop: -8,
		marginLeft: -12,
		'&:focus, &:hover, &$active': {
			boxShadow: 'inherit',
		},
	},
	active: {},
	valueLabel: {
		left: 'calc(-50% + 4px)',
	},
	track: {
		height: 8,
		borderRadius: 4,
	},
	rail: {
		height: 8,
		borderRadius: 4,
	},
})(Slider);

export default SettingBar;
