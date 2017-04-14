import { describe, it, beforeEach } from 'mocha'
import defaultSet, {
  mapActionToInput,
  createBodyDispatcher,
  getThunk
} from '../source/lib/mappers.js'
import sinon, { spy } from 'sinon'

describe('tpipe redux', () => {
  let fakePipe,
    openSpy

  beforeEach(function beforeEachBody() {
    openSpy = sinon.spy()
    fakePipe = {
      open: openSpy,
      options: {
        metaKey: 'parameters',
        payloadKey: 'body'
      }
    }
  })

  describe('mapping set', () => {
    it('should expose a default mapping set', () => {
      defaultSet.should.eql({
        inputMappings: [mapActionToInput],
        extraProperties: {
          getThunk
        }
      })
    })
  })

  

  describe('map action to input', () => {
    let dispatch,
      getState,
      payload

    beforeEach(() => {
      dispatch = () => {a: 1}
      getState = () => {b: 2}
      payload = {c: 3}
    })

    it('should transform the redux request into a pipe message', () => {
      const expectedOutput = {
        parameters: {
          dispatch,
          getState
        },
        body: payload
      }
      return mapActionToInput.apply(fakePipe, [{}, payload, dispatch, getState])
        .should.deepEqual(expectedOutput)
    })
  })

  describe('create dispatcher mapping', () => {
    let actionCreator,
      input,
      dispatch,
      payload,
      output

    beforeEach(() => {
      dispatch = sinon.spy()
      input = {
        parameters: {b: 2, dispatch},
        body: payload
      }
      actionCreator = (payload) => ({ type: 'atype', payload })
      output = createBodyDispatcher(actionCreator).apply(fakePipe, [input])
      return output
    })

    it('should return the input as is', () => {
      output
        .should.deepEqual(input)
    })

    it('should call the dispatch with the action creator result', () => {
      dispatch.firstCall.args[0]
        .should.deepEqual(actionCreator(payload))
    })
  })
  
  
  describe('getThunk', () => {
    let input,
      dispatch,
      getState,
      payload

    beforeEach(() => {
      dispatch = sinon.spy()
      getState = sinon.spy()
      payload = {a: 1}
      input = {
        parameters: {},
        body: {}
      }
      getThunk.apply(fakePipe, [])(payload)(dispatch, getState)
    })

    it('should call open correctly', () => {
      openSpy.firstCall.args
        .should.deepEqual([payload, dispatch, getState])
    })
  })
  
  describe('defaultSet', () => {
    it('should have all the basic mappings ready for redux', () => {
      defaultSet
        .should.deepEqual({
          inputMappings: [mapActionToInput],
          extraProperties: {
            getThunk
          }
        })
    })
  })
})
