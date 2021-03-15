import React from 'react';
import {Button, Dialog, DialogActions, DialogContent, DialogTitle, TextField} from '@material-ui/core'

const Modal = ({ open, onClose, value, onChange }) => {
	return (
		<Dialog open={open}>
			<DialogTitle>
				Введите свое имя
			</DialogTitle>
			<DialogContent>
				<TextField onChange={onChange} />
			</DialogContent>
			<DialogActions>
				<Button disabled={!value} onClick={onClose}>Сохранить</Button>
			</DialogActions>
		</Dialog>
	);
};

export default Modal;
