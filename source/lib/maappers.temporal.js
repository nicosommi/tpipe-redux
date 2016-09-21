import { piper } from 'tpipe';

/*
* This function just puts the redux args into the input
*/
export function reduxToPipe(...args) {
  let getState = args[args.length - 1];
  let dispatch = args[args.length - 2];
  if (getState === undefined) {
    getState = args[args.length - 2];
    dispatch = args[args.length - 3];
  }
  return { parameters: { dispatch, getState }, body: {} };
}

/*
* This function just puts a data arg into the input
*/
export function injectDataIntoBody(input, data) {
  const newInputBody = Object.assign({},
    input.body,
    { data }
  );
  return Object.assign({}, input, { body: newInputBody });
}

/*
* This is an adapter from the warehouse api error to the tpipe format
*/
export function bodyPayloadToPipe(output = {}) {
  /* eslint-disable no-underscore-dangle */
  return { parameters: output.body._meta, body: output.body._payload };
}

/*
* This is an adapter from the warehouse api error to the tpipe format
*/
export function ensureOutput(output = {}) {
  return output;
}

/*
* This is an adapter from the warehouse api to the tpipe format
*/
export function payloadToPipe(output = {}) {
  return { parameters: output._meta, body: output._payload };
}

/*
* This is an adapter from the warehouse api to the tpipe format
*/
export function injectIntoBody(output = {}) {
  return { body: output };
}

function dispatchAction(obj, dispatch) {
  if (typeof dispatch === 'function') dispatch(obj);
}

/*
* This function is used in the input to dispatch the corresponding action
*/
export function inputActionDispatcher(actionToDispatch) {
  return (input = {}) => {
    const { dispatch } = input.parameters;
    // FIXME: crei que probablemente data deberia mapearse a body derecho en un mapper anterior
    dispatchAction(actionToDispatch(input.body.data), dispatch);
    return input;
  };
}

/*
* This function is used in both error and success mappings to dispatch the corresponding action
*/
export function outputActionDispatcher(actionToDispatch, outputProp = 'body') {
  return (output, input = {}) => {
    const { dispatch } = input.parameters;
    dispatchAction(actionToDispatch(output[outputProp]), dispatch);
    return output;
  };
}

export function logOutput(output = {}, input = {}) {
  /* eslint-disable no-console */
  console.log('logOutput', output, input);
  return output;
}

/*
* This function builds the default pipe used for thunks in this app (most common pattern)
*/
export function getDefaultThunkPipe(handler, requestAction, successAction, errorAction) {
  return piper(handler)
    .reset()
    .input(reduxToPipe, inputActionDispatcher(requestAction))
    .output(payloadToPipe, outputActionDispatcher(successAction))
    .error(bodyPayloadToPipe, outputActionDispatcher(errorAction))
    .pipe.getThunk();
}

export function getDataThunkPipe(handler, requestAction, successAction, errorAction) {
  return piper(handler)
    .reset()
    .input(reduxToPipe)
    .input(injectDataIntoBody)
    .input(inputActionDispatcher(requestAction))
    .output(payloadToPipe)
    .output(outputActionDispatcher(successAction))
    .error(bodyPayloadToPipe)
    .error(outputActionDispatcher(errorAction))
    .pipe.getThunk();
}
