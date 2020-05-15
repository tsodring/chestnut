import React, { useState, useContext } from 'react';
import { Menu, Icon } from 'semantic-ui-react';
import { Link, NavLink } from 'react-router-dom';

import logo from '../images/chestnut.png';
import { AuthContext } from '../context/auth-context';

const Navbar = () => {
	const [activeItem, setActiveItem] = useState('');
	const auth = useContext(AuthContext);

	// Highlights the clicked item on navbar
	const handleItemClick = (name) => setActiveItem(name);

	return (
		<Menu color='green' stackable inverted attached='top'>
			<Menu.Item
				as={Link}
				exact
				to='/'
				onClick={handleItemClick}
				style={{ textAlign: 'center' }}
			>
				<img src={logo} alt='Chestnut Logo' />
			</Menu.Item>
			{auth.isLoggedIn && (
				<Menu.Item
					as={NavLink}
					exact
					to='/'
					name='Home'
					active={activeItem === 'Home'}
					onClick={handleItemClick}
					style={{ textAlign: 'center' }}
				>
					<Icon name='home' style={{ marginRight: '.5rem' }} />
					Home
				</Menu.Item>
			)}
			{auth.isLoggedIn && (
				<Menu.Item
					as={NavLink}
					exact
					to='/keys'
					name='Keys'
					active={activeItem === 'Keys'}
					onClick={handleItemClick}
				>
					<Icon name='key' style={{ marginRight: '.5rem' }} />
					Manage Keys
				</Menu.Item>
			)}
			{auth.isLoggedIn && (
				<Menu.Item
					as={NavLink}
					exact
					to='/users'
					name='Search Users'
					active={activeItem === 'Search Users'}
					onClick={handleItemClick}
				>
					<Icon name='users' style={{ marginRight: '.5rem' }} />
					Search Users
				</Menu.Item>
			)}
			<Menu.Menu position='right'>
				{auth.isLoggedIn && auth.isAdmin && (
					<Menu.Item
						as={NavLink}
						exact
						to='/admin'
						name='Admin Page'
						active={activeItem === 'Admin Page'}
						onClick={handleItemClick}
					>
						<Icon name='settings' style={{ marginRight: '.5rem' }} />
						Admin Page
					</Menu.Item>
				)}
				{auth.isLoggedIn && (
					<Menu.Item
						as={NavLink}
						exact
						to='/settings'
						name='Account Settings'
						active={activeItem === 'Account Settings'}
						onClick={handleItemClick}
						style={{ alignContent: 'center' }}
					>
						<Icon name='setting' style={{ marginRight: '.5rem' }} />
						Account Settings
					</Menu.Item>
				)}
				{auth.isLoggedIn && (
					<Menu.Item>
						<Icon name='user' style={{ marginRight: '.5rem' }} />
						<p>
							Logged in as <b>{auth.username}</b>
						</p>
					</Menu.Item>
				)}
				{auth.isLoggedIn && (
					<Menu.Item name='Logout' onClick={auth.logout}>
						<Icon name='logout' style={{ marginRight: '.5rem' }} />
						Logout
					</Menu.Item>
				)}
			</Menu.Menu>
		</Menu>
	);
};

export default Navbar;
