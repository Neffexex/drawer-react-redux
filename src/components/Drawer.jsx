import React from 'react';
import {Drawer} from '@material-ui/core'
import {Close} from '@material-ui/icons'

const DrawerSidebar = ({open, close}) => {
	return (
		<Drawer className="drawer" anchor="left" open={open} onClose={close}>
			<div className="drawer__header">
				<div>
					Draw.K
				</div>
			<div onClick={close}>	<Close /></div>
			</div>
		</Drawer>
	);
};

export default DrawerSidebar;
