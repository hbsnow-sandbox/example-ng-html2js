import {EventEmitter} from 'events';
import AppDispatcher from '../dispatcher/AppDispatcher';
import PlayerConstants from '../constants/PlayerConstants';

const CHANGE_EVENT = 'change';

class PlayerStore extends EventEmitter {

	constructor() {
		super();

		this.players = {};

		AppDispatcher.register(this.handler.bind(this));
	}

	getAll() {
		return this.players;
	}

	emitChange() {
		this.emit(CHANGE_EVENT);
	}

	addChangeListener(callback) {
		this.on(CHANGE_EVENT, callback);
	}

	removeChangeListener(callback) {
		this.removeListener(CHANGE_EVENT, callback);
	}

	/**
	 * Register callback to handle all updates
	 *
	 * @param {Object} action
	 */
	handler(action) {
		let data = action.data;

		switch (action.actionType) {
			case PlayerConstants.PREVIEW:
				this.players = data;
				this.emitChange();

				break;
		}
	}

}

const playerStore = new PlayerStore();
export default playerStore;
