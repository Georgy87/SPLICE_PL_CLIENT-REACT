import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';

import { renderWithRouter } from '../tests/helpers/RenderWithRouter';
import { PackItem } from '../components/PackItem/PackItem';
import { Navbar } from '../components/Navbar/Navbar';
import { NavbarItem } from '../components/NavbarItem/NavbarItem';
import { LoginPage } from '../pages/LoginPage/LoginPage';
import { UserProfilePage } from '../pages/UserProfilePage/UserProfilePage';

describe('ROUTER TEST', () => {
	test('LOGIN TEST', async () => {
		render(renderWithRouter(<Navbar />));
		const link = screen.getByTestId('login-link');
		userEvent.click(link);
		expect(screen.getByTestId('login-page')).toBeInTheDocument();
	});

	test('REGISTRATION TEST', async () => {
		render(renderWithRouter(<LoginPage />));
		const link = screen.getByTestId('registration-link');
		userEvent.click(link);
		expect(screen.getByTestId('registration-page')).toBeInTheDocument();
	});

	test('PACKS-PAGE TEST', async () => {
		render(renderWithRouter(<Navbar />));
		const link = screen.getByTestId('packs-link');
		userEvent.click(link);
		expect(screen.getByTestId('packs-page')).toBeInTheDocument();
	});

	test('PROFILE-PACK-PAGE', async () => {
		const pack = {
			_id: '0',
			genre: '',
			name: '',
			packInfo: '',
			text: '',
			listens: 0,
			picture: '',
			audio: '',
			pause: false,
			samples: [],
			userId: '',
			update: false,
		};

		render(renderWithRouter(<PackItem pack={pack} id={pack._id} index={0} />));
		const link = screen.getByTestId('profile-pack-link');
		userEvent.click(link);
		expect(screen.getByTestId('profile-pack-page')).toBeInTheDocument();
	});

	test('USER-PROFILE-PAGE TEST', async () => {
		render(renderWithRouter(<NavbarItem pageName={'PROFILE'} iconName={'profile'} link={'profile-link'}/>));
		const link = screen.getByTestId('profile-link');
		userEvent.click(link);
		expect(screen.getByTestId('user-profile-page')).toBeInTheDocument();
	});

	test('LIKES-PAGE TEST', async () => {
		render(renderWithRouter(<NavbarItem pageName={'LIKES'} iconName={'likes'} link={'likes-link'}/>));
		const link = screen.getByTestId('likes-link');
		userEvent.click(link);
		expect(screen.getByTestId('liked-samples-page')).toBeInTheDocument();
	});

	test('SEQUENCER-PAGE TEST', async () => {
		render(renderWithRouter(<NavbarItem pageName={'SEQUENCER'} iconName={'sequencer'} link={'sequencer-link'}/>));
		const link = screen.getByTestId('sequencer-link');
		userEvent.click(link);
		expect(screen.getByTestId('sequencer-page')).toBeInTheDocument();
	});

	test('CREATE-PACK-PAGE TEST', async () => {
		render(renderWithRouter(<UserProfilePage />));
		const link = screen.getByTestId('create-pack-link');
		userEvent.click(link);
		expect(screen.getByTestId('create-pack-page')).toBeInTheDocument();
	});

	test('USER-PACKS-PAGE TEST', async () => {
		render(renderWithRouter(<UserProfilePage />));
		const link = screen.getByTestId('user-packs-link');
		userEvent.click(link);
		expect(screen.getByTestId('user-packs-page')).toBeInTheDocument();
	});
});
