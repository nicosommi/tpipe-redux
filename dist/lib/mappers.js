'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.createBodyDispatcher = undefined;
exports.mapActionToInput = mapActionToInput;
exports.getThunk = getThunk;

var _log = require('./utils/log.js');

var _promise = require('./promise.js');

var _promise2 = _interopRequireDefault(_promise);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _defineProperty(obj, key, value) { if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }

var logger = new _log.Logger('nicosommi.tPipeRedux');

var createBodyDispatcher = exports.createBodyDispatcher = function createBodyDispatcher(actionCreator) {
  logger.log('createBodyDispatcher begin');
  return function dispatchBody(input, potentialInput) {
    logger.log('dispatchBody begin');
    var dispatch = input[this.options.metaKey].dispatch;

    if (!dispatch) {
      dispatch = potentialInput[this.options.metaKey].dispatch;
    }
    dispatch(actionCreator(input[this.options.payloadKey]));
    return input;
  };
};

function mapActionToInput(input, actionPayload, dispatch, getState) {
  var _ref;

  logger.log('mapActionToInput begin');
  return _ref = {}, _defineProperty(_ref, this.options.metaKey, {
    dispatch: dispatch,
    getState: getState
  }), _defineProperty(_ref, this.options.payloadKey, actionPayload), _ref;
}

function getThunk() {
  var _this = this;

  return function () {
    for (var _len = arguments.length, args = Array(_len), _key = 0; _key < _len; _key++) {
      args[_key] = arguments[_key];
    }

    return function () {
      for (var _len2 = arguments.length, more = Array(_len2), _key2 = 0; _key2 < _len2; _key2++) {
        more[_key2] = arguments[_key2];
      }

      return _this.open.apply(_this, args.concat(more));
    };
  };
}

var defaultSet = {
  inputMappings: [mapActionToInput],
  extraProperties: {
    getThunk: getThunk
  }
};

exports.default = defaultSet;