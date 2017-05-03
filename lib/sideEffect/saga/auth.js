'use strict';

Object.defineProperty(exports, "__esModule", {
    value: true
});

var _regenerator = require('babel-runtime/regenerator');

var _regenerator2 = _interopRequireDefault(_regenerator);

var _effects = require('redux-saga/effects');

var _reactRouterRedux = require('react-router-redux');

var _notificationActions = require('../../actions/notificationActions');

var _authActions = require('../../actions/authActions');

var _fetchActions = require('../../actions/fetchActions');

var _auth = require('../../auth');

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

exports.default = function (authClient) {
    var _marked = [handleAuth].map(_regenerator2.default.mark);

    if (!authClient) return function () {
        return null;
    };
    function handleAuth(action) {
        var type, payload, error, meta, errorMessage;
        return _regenerator2.default.wrap(function handleAuth$(_context) {
            while (1) {
                switch (_context.prev = _context.next) {
                    case 0:
                        type = action.type, payload = action.payload, error = action.error, meta = action.meta;
                        _context.t0 = type;
                        _context.next = _context.t0 === _authActions.USER_LOGIN ? 4 : _context.t0 === _authActions.USER_CHECK ? 23 : _context.t0 === _authActions.USER_LOGOUT ? 35 : _context.t0 === _fetchActions.FETCH_ERROR ? 40 : 54;
                        break;

                    case 4:
                        _context.prev = 4;
                        _context.next = 7;
                        return (0, _effects.put)({ type: _authActions.USER_LOGIN_LOADING });

                    case 7:
                        _context.next = 9;
                        return (0, _effects.call)(authClient, _auth.AUTH_LOGIN, payload);

                    case 9:
                        _context.next = 11;
                        return (0, _effects.put)({ type: _authActions.USER_LOGIN_SUCCESS });

                    case 11:
                        _context.next = 13;
                        return (0, _effects.put)((0, _reactRouterRedux.push)(meta.pathName || '/'));

                    case 13:
                        _context.next = 22;
                        break;

                    case 15:
                        _context.prev = 15;
                        _context.t1 = _context['catch'](4);
                        _context.next = 19;
                        return (0, _effects.put)({ type: _authActions.USER_LOGIN_FAILURE, error: _context.t1, meta: { auth: true } });

                    case 19:
                        errorMessage = typeof _context.t1 === 'string' ? _context.t1 : typeof _context.t1 === 'undefined' || !_context.t1.message ? 'aor.auth.sign_in_error' : _context.t1.message;
                        _context.next = 22;
                        return (0, _effects.put)((0, _notificationActions.showNotification)(errorMessage, 'warning'));

                    case 22:
                        return _context.abrupt('break', 54);

                    case 23:
                        _context.prev = 23;
                        _context.next = 26;
                        return (0, _effects.call)(authClient, _auth.AUTH_CHECK, payload);

                    case 26:
                        _context.next = 34;
                        break;

                    case 28:
                        _context.prev = 28;
                        _context.t2 = _context['catch'](23);
                        _context.next = 32;
                        return (0, _effects.call)(authClient, _auth.AUTH_LOGOUT);

                    case 32:
                        _context.next = 34;
                        return (0, _effects.put)((0, _reactRouterRedux.replace)({
                            pathname: _context.t2 && _context.t2.redirectTo || '/login',
                            state: { nextPathname: meta.pathName }
                        }));

                    case 34:
                        return _context.abrupt('break', 54);

                    case 35:
                        _context.next = 37;
                        return (0, _effects.call)(authClient, _auth.AUTH_LOGOUT);

                    case 37:
                        _context.next = 39;
                        return (0, _effects.put)((0, _reactRouterRedux.push)('/login'));

                    case 39:
                        return _context.abrupt('break', 54);

                    case 40:
                        _context.prev = 40;
                        _context.next = 43;
                        return (0, _effects.call)(authClient, _auth.AUTH_ERROR, error);

                    case 43:
                        _context.next = 53;
                        break;

                    case 45:
                        _context.prev = 45;
                        _context.t3 = _context['catch'](40);
                        _context.next = 49;
                        return (0, _effects.call)(authClient, _auth.AUTH_LOGOUT);

                    case 49:
                        _context.next = 51;
                        return (0, _effects.put)((0, _reactRouterRedux.push)('/login'));

                    case 51:
                        _context.next = 53;
                        return (0, _effects.put)((0, _notificationActions.hideNotification)());

                    case 53:
                        return _context.abrupt('break', 54);

                    case 54:
                    case 'end':
                        return _context.stop();
                }
            }
        }, _marked[0], this, [[4, 15], [23, 28], [40, 45]]);
    }
    return _regenerator2.default.mark(function watchAuthActions() {
        return _regenerator2.default.wrap(function watchAuthActions$(_context2) {
            while (1) {
                switch (_context2.prev = _context2.next) {
                    case 0:
                        _context2.next = 2;
                        return [(0, _effects.takeEvery)(function (action) {
                            return action.meta && action.meta.auth;
                        }, handleAuth), (0, _effects.takeEvery)(_fetchActions.FETCH_ERROR, handleAuth)];

                    case 2:
                    case 'end':
                        return _context2.stop();
                }
            }
        }, watchAuthActions, this);
    });
};

module.exports = exports['default'];