import {Dispatcher} from 'flux';

class AppDispatcher extends Dispatcher {
    dispatchAsync(promise, types, payload) {
        const {request, success, failure} = types;
        promise.then(
            response => this.dispatch({
                type: success,
                payload: Object.assign({}, payload, {response})
            }),
            error => this.dispatch({
                type: failure,
                payload: Object.assign({}, payload, {error})
            })
        );
        this.dispatch({
            type: request,
            payload: Object.assign({}, payload)
        });
    }
}

export default new AppDispatcher();