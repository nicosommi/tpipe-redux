import { chainThunks } from '../source/lib/mappers.js'
import { piper } from 'tpipe'
import sinon from 'sinon'
import { Logger } from '../source/lib/utils/log.js'

const logger = new Logger('nicosommi.tpipe-redux.mappers.spec')

describe('(mappers)', () => {
  describe('(chainThunks)', () => {
    let firstThunk
    let secondThunk
    let firstHandler
    let secondHandler
    let dispatch
    let getState

    beforeEach(() => {
      firstHandler = sinon.spy(() => logger.log('first handler called'))
      secondHandler = sinon.spy(() => logger.log('second handler called'))
      dispatch = sinon.spy()
      getState = sinon.spy()
      const reduxInputMapper = (input, dispatch, getState) => {
        return { parameters: { dispatch, getState }, body: input.body }
      }
      firstThunk = piper(firstHandler).reset().input(reduxInputMapper).pipe.getThunk()
      secondThunk = piper(secondHandler).reset().input(reduxInputMapper).pipe.getThunk()

      logger.log('chainThunks', {chainThunks})
      return chainThunks(firstThunk, secondThunk)(dispatch, getState)()
    })

    it('should execute one thunk, and then the other', () => {
      sinon.assert.callOrder(firstHandler, secondHandler)
    })

    it('should send the redux parameters to the first one', () => {
      firstHandler.getCall(0).args[0].parameters.should.eql({ dispatch, getState })
    })

    it('should send the redux parameters to the second one', () => {
      secondHandler.getCall(0).args[0].parameters.should.eql({ dispatch, getState })
    })
  })
})
