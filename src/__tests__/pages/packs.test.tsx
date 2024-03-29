import { act, fireEvent, screen } from '@testing-library/react';
import * as reduxHooks from 'react-redux';

import * as packSlice from '@store/slices/pack/packSlice';
import { PacksPage } from '@pages/PacksPage';
import { renderWithStore } from '@utils/tests';
import { packs } from '@mocks/packsPage';
import * as actions from '@store/slices/pack/actions';

jest.mock('react-redux', () => ({
  ...jest.requireActual('react-redux'),
}));

const mockedDispatch = jest.spyOn(reduxHooks, 'useDispatch');

describe('PACKS PAGE', () => {
  beforeEach(() => {
    jest.useFakeTimers();
  });
  it('initial page render', async () => {
    const dispatch = jest.fn();
    mockedDispatch.mockReturnValue(dispatch);

    jest.spyOn(reduxHooks, 'useSelector').mockReturnValue([]);
    mockedDispatch.mockReturnValue(jest.fn());

    const mockedsetDefaultState = jest.spyOn(packSlice, 'setDefaultPackState');

    const {
      result: { getByTestId, getAllByTestId },
    } = await act(async () => renderWithStore(<PacksPage />, {}, ''));

    expect(mockedsetDefaultState).toHaveBeenCalledTimes(1);
    expect(getByTestId('packs-page')).toBeTruthy();
    expect(getAllByTestId('vertical-skeleton')).toBeTruthy();
  });

  it('page render with packs', async () => {
    const dispatch = jest.fn();
    mockedDispatch.mockReturnValue(dispatch);

    jest.spyOn(reduxHooks, 'useSelector').mockReturnValue(packs);
    const mockedfetchGetPacks = jest.spyOn(actions, 'fetchGetPacks');

    await act(async () => renderWithStore(<PacksPage />, {}, ''));

    expect(mockedfetchGetPacks).toHaveBeenCalledTimes(1);
    expect(mockedfetchGetPacks).toBeCalledWith(0);
  });

  it('render search input', async () => {
    const dispatch = jest.fn();
    mockedDispatch.mockReturnValue(dispatch);
    const mockedfetchSearchPacks = jest.spyOn(actions, 'fetchSearchPacks');
    jest.spyOn(reduxHooks, 'useSelector').mockReturnValue(packs);

    const {
      result: { getByTestId },
    } = await act(async () => renderWithStore(<PacksPage />, {}, ''));

    await act(async () => {
      fireEvent.click(screen.getByTestId('open_input'));
    });

    await act(async () => {
      fireEvent.change(getByTestId('search_input'), {
        target: { value: 'rap' },
      });
    });

    const input = getByTestId('search_input');
    expect(input.getAttribute('placeholder')).toBe('Search genres, author');
    expect(input.getAttribute('value')).toBe('rap');

    expect(mockedfetchSearchPacks).not.toHaveBeenCalled();
    jest.advanceTimersByTime(500);
    expect(mockedfetchSearchPacks).toHaveBeenCalledWith('rap');

    await act(async () => {
      fireEvent.click(screen.getByTestId('close_input'));
    });

    expect(input.getAttribute('placeholder')).toBe('');
    expect(input.getAttribute('value')).toBe('rap');
  });

  it('render video player', async () => {
    const dispatch = jest.fn();
    mockedDispatch.mockReturnValue(dispatch);

    jest.spyOn(reduxHooks, 'useSelector').mockReturnValue(packs);
    const {
      result: { getByTestId },
    } = await act(async () => renderWithStore(<PacksPage />, {}, ''));

    const videoPlayer = getByTestId('video-player');

    expect(videoPlayer).toHaveAttribute('autoPlay');
    expect(videoPlayer).toHaveAttribute(
      'src',
      'https://storage.yandexcloud.net/sample-cloud/videos/Arcade%20by%20Output.mp4',
    );
    expect(videoPlayer).toHaveAttribute('loop');

    const linkElement = screen.getByText(/More than a sample library/i);
    expect(linkElement).toBeInTheDocument();
  });
});
