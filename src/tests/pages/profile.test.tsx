import { act } from '@testing-library/react';
import * as reduxHooks from 'react-redux';

import { ProfilePackPage } from '@pages/ProfilePackPage';
import { renderWithStore } from '@utils/tests';
import * as actions from '@slices/pack/actions';
import { chartData } from '@mocks/packActions';
import { Modal } from '@layouts/ModalLayout/ModalLayout';
import { ButtonLayout } from '@layouts/ButtonLayout/ButtonLayout';
import { samples } from '@mocks/packPage';

jest.mock('react-redux', () => ({
    ...jest.requireActual('react-redux'),
}));

const mockedDispatch = jest.spyOn(reduxHooks, 'useDispatch');

describe('PROFILE PACK', () => {
    it('render loader', async () => {
        jest.spyOn(reduxHooks, 'useSelector').mockReturnValue(false);
        mockedDispatch.mockReturnValue(jest.fn());
        const { result } = renderWithStore(<ProfilePackPage />, {});
        expect(result.getAllByTestId('loader')).toBeTruthy();
    });

    it('render profile pack', async () => {
        jest.spyOn(reduxHooks, 'useSelector').mockReturnValue(samples);
        mockedDispatch.mockReturnValue(jest.fn());

        const { result } = await act(async () => renderWithStore(<ProfilePackPage />, {}, ''));
        const packContainer = result.getByTestId('profile-pack');
        expect(packContainer).toBeInTheDocument();
    });

    it('fetch get pack', async () => {
        const dispatch = jest.fn();
        mockedDispatch.mockReturnValue(dispatch);
        jest.spyOn(reduxHooks, 'useSelector').mockReturnValue(samples);

        const mockedFetchGetPack = jest.spyOn(actions, 'fetchGetPack');
        await act(async () => renderWithStore(<ProfilePackPage />, {}, ''));
        expect(mockedFetchGetPack).toHaveBeenCalledTimes(2);
    });

    it('canvas modal', () => {
        const { result } = renderWithStore(
            <Modal active={true} setActive={jest.fn()}>
                {Object.keys(chartData).map((year) => {
                    return (
                        <ButtonLayout key={year} typeStyle={'auth'} onClicked={jest.fn()}>
                            {year}
                        </ButtonLayout>
                    );
                })}
            </Modal>,
            {}
        );

        const buttonYear = result.getByRole('button', { name: '2022' });
        expect(buttonYear).toBeTruthy();
    });
});
