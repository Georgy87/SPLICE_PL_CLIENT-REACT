import { useDispatch } from 'react-redux';
import { bindActionCreators } from 'redux';
import { ActionCreators } from '../store/slices/player/playerSlice';

export const useActions = () => {
    const dispatch = useDispatch();
    return bindActionCreators(ActionCreators, dispatch);
}