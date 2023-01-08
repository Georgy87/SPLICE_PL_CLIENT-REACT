import { fireEvent, screen } from '@testing-library/react';
import * as reduxHooks from 'react-redux';
import { PacksPage } from '../../pages';
import { renderWithStore } from '../../utils/tests';

jest.mock('react-redux', () => ({
    ...jest.requireActual('react-redux'),
}));

const mockedDispatch = jest.spyOn(reduxHooks, 'useDispatch');

describe('PACKS PAGE', () => {
    it('set default pack state', async () => {
        jest.spyOn(reduxHooks, "useSelector").mockReturnValue(false);
        const { result } = renderWithStore(<PacksPage />, {}, "");
        
    });
});
