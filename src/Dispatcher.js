'use strict';

const Flux = require('flux');
const Collection = require('runner-runner-collection');


class Dispatcher extends Flux.Dispatcher {
	constructor() {
		super();
		this._queue = new Collection.Queue();
    }
	dispatch(payload) {
		this._queue.enqueue(payload);
		if (this.isDispatching()) {
			return;
		}
		for (let queuedPayload of this._queue) {
			super.dispatch(queuedPayload);
		}
	}
}

module.exports = Dispatcher
