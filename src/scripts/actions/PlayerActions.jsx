import AppDispatcher from '../dispatcher/AppDispatcher';
import PlayerConstants from '../constants/PlayerConstants';

export default {

	preview: (data) => {
		AppDispatcher.dispatch({
			actionType: PlayerConstants.PREVIEW,
			data: data
		});
	}

};