/* eslint-disable no-underscore-dangle */
/* eslint-disable max-len */
import { it, describe, afterEach } from 'mocha';
import { reduxToPipe,
  injectDataIntoBody,
  bodyPayloadToPipe,
  payloadToPipe,
  injectIntoBody,
  ensureOutput,
  inputActionDispatcher,
  outputActionDispatcher,
  logOutput } from './mappers.js';

const createDummyReturn = () => (() => {});

describe('Mappers', () => {
  afterEach(() => expect.restoreSpies());
  describe('outputActionDispatcher', () => {
    it('should return a function', () => {
      const actionCreator = createDummyReturn();
      expect(outputActionDispatcher(actionCreator)).toBeA('function');
    });

    it('should call the actionCreator with the body', () => {
      const actionCreator = expect.createSpy();
      const input = { parameters: { dispatch: createDummyReturn() } };
      const output = { body: {} };
      outputActionDispatcher(actionCreator)(output, input);
      expect(actionCreator).toHaveBeenCalledWith(output.body);
    });

    it('should return the output', () => {
      const actionCreator = expect.createSpy();
      const input = { parameters: { dispatch: createDummyReturn() } };
      const output = { body: {} };
      const actual = outputActionDispatcher(actionCreator)(output, input);
      const expected = output;
      expect(actual).toBe(expected);
    });

    it('should call the actionCreator with a key provided as a second param', () => {
      const actionCreator = expect.createSpy();
      const input = { parameters: { dispatch: createDummyReturn() } };
      const prop = 'testing';
      const output = { [prop]: {} };
      outputActionDispatcher(actionCreator, prop)(output, input);
      expect(actionCreator).toHaveBeenCalledWith(output[prop]);
    });

    it('should call dispatch with the action', () => {
      const action = { a: 1 };
      const actionCreator = () => action;
      const input = { parameters: { dispatch: expect.createSpy() } };
      const output = { body: {} };
      outputActionDispatcher(actionCreator)(output, input);
      expect(input.parameters.dispatch).toHaveBeenCalledWith(action);
    });
  });

  describe('inputActionDispatcher', () => {
    it('should return a function', () => {
      const actionCreator = createDummyReturn();
      expect(inputActionDispatcher(actionCreator)).toBeA('function');
    });

    it('should call the actionCreator with the body', () => {
      const actionCreator = expect.createSpy();
      const message = { parameters: { dispatch: createDummyReturn() }, body: { data: 1 } };
      inputActionDispatcher(actionCreator)(message);
      expect(actionCreator).toHaveBeenCalledWith(message.body.data);
    });

    it('should call dispatch with the action', () => {
      const action = { a: 1 };
      const actionCreator = () => action;
      const message = { parameters: { dispatch: expect.createSpy() }, body: {} };
      inputActionDispatcher(actionCreator)(message);
      expect(message.parameters.dispatch).toHaveBeenCalledWith(action);
    });
  });

  describe('injectIntoBody', () => {
    it('should return the output as is', () => {
      const response = { a: 2 };
      expect(injectIntoBody(response)).toEqual({ body: response });
    });
    it('should return a default empty output', () => {
      expect(injectIntoBody()).toEqual({ body: {} });
    });
  });

  describe('payloadToPipe', () => {
    it('should pick the _meta and _payload into parameters and body', () => {
      const response = {
        _meta: {},
        _payload: {}
      };
      expect(payloadToPipe(response)).toEqual(
        {
          parameters: response._meta,
          body: response._payload
        }
      );
    });
  });

  describe('ensureOutput', () => {
    it('should return the output as is', () => {
      const response = { a: 2 };
      expect(ensureOutput(response)).toEqual(response);
    });
    it('should return a default empty output', () => {
      expect(ensureOutput()).toEqual({});
    });
  });

  describe('bodyPayloadToPipe', () => {
    it('should pick the _meta and _payload from a body into parameters and body', () => {
      const response = {
        body: {
          _meta: {},
          _payload: {}
        }
      };
      expect(bodyPayloadToPipe(response)).toEqual(
        {
          parameters: response.body._meta,
          body: response.body._payload
        }
      );
    });
  });

  describe('injectDataIntoBody', () => {
    it('should pick the data and put it into the input', () => {
      const data = { a: 1 };
      expect(injectDataIntoBody({ body: {} }, data)).toEqual(
        {
          body: {
            data
          }
        }
      );
    });
  });

  describe('reduxToPipe', () => {
    it('should pick the dispatch and getState arguments and put them into the input', () => {
      const dispatch = createDummyReturn();
      const getState = createDummyReturn();
      expect(reduxToPipe({}, {}, dispatch, getState)).toEqual(
        {
          parameters: {
            dispatch, getState
          },
          body: {}
        }
      );
    });

    it('should pick the dispatch and getState arguments when last is undefined and put them into the input', () => {
      const dispatch = createDummyReturn();
      const getState = createDummyReturn();
      expect(reduxToPipe({}, {}, dispatch, getState, undefined)).toEqual(
        {
          parameters: {
            dispatch, getState
          },
          body: {}
        }
      );
    });
  });

  describe('logOutput', () => {
    it('should return the output as is', () => {
      const output = { a: 2 };
      const input = { b: 3 };
      expect(logOutput(output, input)).toEqual(output);
    });
    it('should log the output by default', () => {
      const output = { a: 2 };
      const input = { b: 3 };
      const spy = expect.spyOn(console, 'log');
      logOutput(output, input);
      expect(spy).toHaveBeenCalledWith('logOutput', output, input);
    });
  });
});
