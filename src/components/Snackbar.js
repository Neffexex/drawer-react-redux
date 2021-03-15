import React, {useEffect} from 'react';
import Snackbar from '@material-ui/core/Snackbar';
import MuiAlert, { AlertProps } from '@material-ui/lab/Alert';


const SnackbarAlert = ({ notification, setNotification, message, severity, vertical, horizontal }) => {
	useEffect(() => {
		const timeout = setTimeout(() => {
			setNotification(false)
		}, 4000)
		return () => clearTimeout(timeout)
	}, [])


	return (
		<Snackbar
			open={notification}
			autoHideDuration={6000}
			anchorOrigin={{vertical: vertical, horizontal: horizontal}}>
			<Alert severity={severity}>
				{message}
			</Alert>
		</Snackbar>
	);
}

export default SnackbarAlert

function Alert(props) {
	return <MuiAlert elevation={6} variant="filled" {...props} />;
}
