import { act, fireEvent, screen } from '@testing-library/react';
import { ProfilePackPage } from '../../pages';
import { renderWithStore } from '../../utils/tests';
import * as reduxHooks from 'react-redux';
import * as actions from '../../store/slices/pack/actions';

jest.mock('react-redux', () => ({
    ...jest.requireActual('react-redux'),
}));

const mockedDispatch = jest.spyOn(reduxHooks, 'useDispatch');

describe('PROFILE', () => {
    it('useSelector test false', async () => {
        jest.spyOn(reduxHooks, 'useSelector').mockReturnValue(false);
        mockedDispatch.mockReturnValue(jest.fn());
        const result = renderWithStore(<ProfilePackPage />, {}, '');
        // expect(result).toMatchSnapshot();
    });

    it('useSelector test true', async () => {
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
      
        const result = renderWithStore(<ProfilePackPage />, {}, '');
        // expect(result).toMatchSnapshot();
    });

    it('useEffect test', async () => {
        const dispatch = jest.fn();
        mockedDispatch.mockReturnValue(dispatch);

        const mockedFetchLogin = jest.spyOn(actions, 'fetchGetPack');
        await act(async () => renderWithStore(<ProfilePackPage />, {}, ''));
        expect(mockedFetchLogin).toHaveBeenCalledTimes(2);
    });
});
