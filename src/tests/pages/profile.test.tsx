import React from 'react';
import { act, fireEvent, screen } from '@testing-library/react';
import { ProfilePackPage } from '../../pages';
import { renderWithStore } from '../../utils/tests';
import * as reduxHooks from 'react-redux';
import * as actions from '../../store/slices/pack/actions';

jest.mock('react-redux', () => ({
    ...jest.requireActual('react-redux'),
}));

const mockedDispatch = jest.spyOn(reduxHooks, 'useDispatch');

describe('PROFILE PACK', () => {
    it('Loader', async () => {
        jest.spyOn(reduxHooks, 'useSelector').mockReturnValue(false);
        mockedDispatch.mockReturnValue(jest.fn());
        const { result } = renderWithStore(<ProfilePackPage />, {}, '');
        expect(result.getAllByTestId('loader')).toBeTruthy();
    });

    it('Profile pack', async () => {
        jest.spyOn(reduxHooks, 'useSelector').mockReturnValue([
            {
                _id: 'd',
                audio: 'a',
                packId: 'h',
                sampleName: '',
                audioCoordinates: ['[1, 2]'],
                likes: [],
                duration: '3.4285714285714284',
                canvasImage: 'ht',
                packPicture: 'ht',
                bpm: 140,
                category: 'drums',
                id: '622002b7ad53bf0526655f19',
            },
        ]);

        mockedDispatch.mockReturnValue(jest.fn());

        renderWithStore(<ProfilePackPage />, {}, '');
        const button = screen.getByRole('button', { name: 'Views' });

        await act(async () => {
            fireEvent.click(button);
        });

        expect(button).toBeTruthy();
        expect(screen.getByTestId('modal')).toHaveClass('modalCourse active');
    });

    it('fetchGetPack', async () => {
        const dispatch = jest.fn();
        mockedDispatch.mockReturnValue(dispatch);

        const mockedFetchGetPack = jest.spyOn(actions, 'fetchGetPack');
        await act(async () => renderWithStore(<ProfilePackPage />, {}, ''));
        expect(mockedFetchGetPack).toHaveBeenCalledTimes(2);
    });

    it('set years', async () => {
        jest.spyOn(reduxHooks, 'useSelector').mockReturnValue([
            {
                _id: 'd',
                audio: 'a',
                packId: 'h',
                sampleName: '',
                audioCoordinates: ['[1, 2]'],
                likes: [],
                duration: '3.4285714285714284',
                canvasImage: 'ht',
                packPicture: 'ht',
                bpm: 140,
                category: 'drums',
                id: '622002b7ad53bf0526655f19',
            },
        ]);
        const dispatch = jest.fn();
        mockedDispatch.mockReturnValue(dispatch);
        await act(async () => renderWithStore(<ProfilePackPage />, {}, ''));
        const button = screen.getByRole('button', { name: 'View' });
    });
});
