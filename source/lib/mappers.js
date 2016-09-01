import Promise from './promise.js'
import { Logger } from './utils/log.js'
import { piper } from 'tpipe'

const logger = new Logger('nicosommi.tpipe-redux.mappers')

export function chainThunks (...args) {
  logger.log('chainThunks', { args })
  const newThunk = piper(
    (input) => {
      logger.log('chainThunk thunk called')
      const { dispatch, getState } = input.parameters
      return Promise.reduce(
        args,
        (a, thunk) => {
          logger.log('calling thunk ', { thunk })
          return thunk(dispatch, getState)(input)
        },
        {}
      )
    }
  )
    .reset()
    .input((input, dispatch, getState) => {
      logger.log('chain thunk input mapper called')
      return Object.assign(input, { parameters: { dispatch, getState } })
    }).pipe.getThunk()

  return newThunk
}
