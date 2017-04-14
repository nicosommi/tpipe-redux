import { Logger } from './utils/log.js'
import Promise from './promise.js'

const logger = new Logger('nicosommi.tPipeRedux')

export const createBodyDispatcher = (actionCreator) => {
  logger.log('createBodyDispatcher begin')
  return function dispatchBody (input, potentialInput) {
    logger.log('dispatchBody begin')
    let { dispatch } = input[this.options.metaKey]
    if (!dispatch) {
      dispatch = potentialInput[this.options.metaKey].dispatch
    }
    dispatch(actionCreator(input[this.options.payloadKey]))
    return input
  }
}

export function mapActionToInput (input, actionPayload, dispatch, getState) {
  logger.log('mapActionToInput begin')
  return {
    [this.options.metaKey]: {
      dispatch,
      getState
    },
    [this.options.payloadKey]: actionPayload
  }
}

export function getThunk () {
  return (...args) => {
    return (...more) => {
      return this.open.apply(this, args.concat(more))
    }
  }
}

const defaultSet = {
  inputMappings: [mapActionToInput],
  extraProperties: {
    getThunk
  }
}

export default defaultSet
