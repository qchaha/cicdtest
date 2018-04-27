// { "framework": "Vue" } 

/******/ (function(modules) { // webpackBootstrap
/******/ 	// The module cache
/******/ 	var installedModules = {};
/******/
/******/ 	// The require function
/******/ 	function __webpack_require__(moduleId) {
/******/
/******/ 		// Check if module is in cache
/******/ 		if(installedModules[moduleId]) {
/******/ 			return installedModules[moduleId].exports;
/******/ 		}
/******/ 		// Create a new module (and put it into the cache)
/******/ 		var module = installedModules[moduleId] = {
/******/ 			i: moduleId,
/******/ 			l: false,
/******/ 			exports: {}
/******/ 		};
/******/
/******/ 		// Execute the module function
/******/ 		modules[moduleId].call(module.exports, module, module.exports, __webpack_require__);
/******/
/******/ 		// Flag the module as loaded
/******/ 		module.l = true;
/******/
/******/ 		// Return the exports of the module
/******/ 		return module.exports;
/******/ 	}
/******/
/******/
/******/ 	// expose the modules object (__webpack_modules__)
/******/ 	__webpack_require__.m = modules;
/******/
/******/ 	// expose the module cache
/******/ 	__webpack_require__.c = installedModules;
/******/
/******/ 	// define getter function for harmony exports
/******/ 	__webpack_require__.d = function(exports, name, getter) {
/******/ 		if(!__webpack_require__.o(exports, name)) {
/******/ 			Object.defineProperty(exports, name, {
/******/ 				configurable: false,
/******/ 				enumerable: true,
/******/ 				get: getter
/******/ 			});
/******/ 		}
/******/ 	};
/******/
/******/ 	// getDefaultExport function for compatibility with non-harmony modules
/******/ 	__webpack_require__.n = function(module) {
/******/ 		var getter = module && module.__esModule ?
/******/ 			function getDefault() { return module['default']; } :
/******/ 			function getModuleExports() { return module; };
/******/ 		__webpack_require__.d(getter, 'a', getter);
/******/ 		return getter;
/******/ 	};
/******/
/******/ 	// Object.prototype.hasOwnProperty.call
/******/ 	__webpack_require__.o = function(object, property) { return Object.prototype.hasOwnProperty.call(object, property); };
/******/
/******/ 	// __webpack_public_path__
/******/ 	__webpack_require__.p = "";
/******/
/******/ 	// Load entry module and return exports
/******/ 	return __webpack_require__(__webpack_require__.s = 77);
/******/ })
/************************************************************************/
/******/ ([
/* 0 */
/***/ (function(module, exports) {

var core = module.exports = { version: '2.5.3' };
if (typeof __e == 'number') __e = core; // eslint-disable-line no-undef


/***/ }),
/* 1 */
/***/ (function(module, exports) {

// https://github.com/zloirock/core-js/issues/86#issuecomment-115759028
var global = module.exports = typeof window != 'undefined' && window.Math == Math
  ? window : typeof self != 'undefined' && self.Math == Math ? self
  // eslint-disable-next-line no-new-func
  : Function('return this')();
if (typeof __g == 'number') __g = global; // eslint-disable-line no-undef


/***/ }),
/* 2 */
/***/ (function(module, exports, __webpack_require__) {

var store = __webpack_require__(38)('wks');
var uid = __webpack_require__(25);
var Symbol = __webpack_require__(1).Symbol;
var USE_SYMBOL = typeof Symbol == 'function';

var $exports = module.exports = function (name) {
  return store[name] || (store[name] =
    USE_SYMBOL && Symbol[name] || (USE_SYMBOL ? Symbol : uid)('Symbol.' + name));
};

$exports.store = store;


/***/ }),
/* 3 */
/***/ (function(module, exports, __webpack_require__) {

var global = __webpack_require__(1);
var core = __webpack_require__(0);
var ctx = __webpack_require__(18);
var hide = __webpack_require__(7);
var PROTOTYPE = 'prototype';

var $export = function (type, name, source) {
  var IS_FORCED = type & $export.F;
  var IS_GLOBAL = type & $export.G;
  var IS_STATIC = type & $export.S;
  var IS_PROTO = type & $export.P;
  var IS_BIND = type & $export.B;
  var IS_WRAP = type & $export.W;
  var exports = IS_GLOBAL ? core : core[name] || (core[name] = {});
  var expProto = exports[PROTOTYPE];
  var target = IS_GLOBAL ? global : IS_STATIC ? global[name] : (global[name] || {})[PROTOTYPE];
  var key, own, out;
  if (IS_GLOBAL) source = name;
  for (key in source) {
    // contains in native
    own = !IS_FORCED && target && target[key] !== undefined;
    if (own && key in exports) continue;
    // export native or passed
    out = own ? target[key] : source[key];
    // prevent global pollution for namespaces
    exports[key] = IS_GLOBAL && typeof target[key] != 'function' ? source[key]
    // bind timers to global for call from export context
    : IS_BIND && own ? ctx(out, global)
    // wrap global constructors for prevent change them in library
    : IS_WRAP && target[key] == out ? (function (C) {
      var F = function (a, b, c) {
        if (this instanceof C) {
          switch (arguments.length) {
            case 0: return new C();
            case 1: return new C(a);
            case 2: return new C(a, b);
          } return new C(a, b, c);
        } return C.apply(this, arguments);
      };
      F[PROTOTYPE] = C[PROTOTYPE];
      return F;
    // make static versions for prototype methods
    })(out) : IS_PROTO && typeof out == 'function' ? ctx(Function.call, out) : out;
    // export proto methods to core.%CONSTRUCTOR%.methods.%NAME%
    if (IS_PROTO) {
      (exports.virtual || (exports.virtual = {}))[key] = out;
      // export proto methods to core.%CONSTRUCTOR%.prototype.%NAME%
      if (type & $export.R && expProto && !expProto[key]) hide(expProto, key, out);
    }
  }
};
// type bitmap
$export.F = 1;   // forced
$export.G = 2;   // global
$export.S = 4;   // static
$export.P = 8;   // proto
$export.B = 16;  // bind
$export.W = 32;  // wrap
$export.U = 64;  // safe
$export.R = 128; // real proto method for `library`
module.exports = $export;


/***/ }),
/* 4 */
/***/ (function(module, exports, __webpack_require__) {

var anObject = __webpack_require__(5);
var IE8_DOM_DEFINE = __webpack_require__(50);
var toPrimitive = __webpack_require__(35);
var dP = Object.defineProperty;

exports.f = __webpack_require__(6) ? Object.defineProperty : function defineProperty(O, P, Attributes) {
  anObject(O);
  P = toPrimitive(P, true);
  anObject(Attributes);
  if (IE8_DOM_DEFINE) try {
    return dP(O, P, Attributes);
  } catch (e) { /* empty */ }
  if ('get' in Attributes || 'set' in Attributes) throw TypeError('Accessors not supported!');
  if ('value' in Attributes) O[P] = Attributes.value;
  return O;
};


/***/ }),
/* 5 */
/***/ (function(module, exports, __webpack_require__) {

var isObject = __webpack_require__(8);
module.exports = function (it) {
  if (!isObject(it)) throw TypeError(it + ' is not an object!');
  return it;
};


/***/ }),
/* 6 */
/***/ (function(module, exports, __webpack_require__) {

// Thank's IE8 for his funny defineProperty
module.exports = !__webpack_require__(15)(function () {
  return Object.defineProperty({}, 'a', { get: function () { return 7; } }).a != 7;
});


/***/ }),
/* 7 */
/***/ (function(module, exports, __webpack_require__) {

var dP = __webpack_require__(4);
var createDesc = __webpack_require__(19);
module.exports = __webpack_require__(6) ? function (object, key, value) {
  return dP.f(object, key, createDesc(1, value));
} : function (object, key, value) {
  object[key] = value;
  return object;
};


/***/ }),
/* 8 */
/***/ (function(module, exports) {

module.exports = function (it) {
  return typeof it === 'object' ? it !== null : typeof it === 'function';
};


/***/ }),
/* 9 */
/***/ (function(module, exports) {

var hasOwnProperty = {}.hasOwnProperty;
module.exports = function (it, key) {
  return hasOwnProperty.call(it, key);
};


/***/ }),
/* 10 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


exports.__esModule = true;

var _assign = __webpack_require__(66);

var _assign2 = _interopRequireDefault(_assign);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

exports.default = _assign2.default || function (target) {
  for (var i = 1; i < arguments.length; i++) {
    var source = arguments[i];

    for (var key in source) {
      if (Object.prototype.hasOwnProperty.call(source, key)) {
        target[key] = source[key];
      }
    }
  }

  return target;
};

/***/ }),
/* 11 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0_babel_runtime_helpers_typeof__ = __webpack_require__(42);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0_babel_runtime_helpers_typeof___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_0_babel_runtime_helpers_typeof__);

var Env = {
	/**
  *
  * @returns {boolean}
  */
	isMjb: function isMjb() {
		if (Env.isWeb()) {
			return typeof window !== 'undefined' && /meijiabang/i.test(window.navigator.userAgent);
		}
		var appName = weex.config.env.appName;

		return (/(meijialove|美甲帮)/i.test(appName)
		);
	},
	isMeijiabangJSBridgeReady: function isMeijiabangJSBridgeReady() {
		return Env.isMjb() && Env.isWeb() && typeof window !== 'undefined' && window.MeijiabangJSBridge;
	},
	isWechat: function isWechat() {
		return Env.isWeb() && /MicroMessenger\/([\d.]+)/i.test(window.navigator.userAgent);
	},
	isWeb: function isWeb() {
		var platform = weex.config.env.platform;

		return (typeof window === 'undefined' ? 'undefined' : __WEBPACK_IMPORTED_MODULE_0_babel_runtime_helpers_typeof___default()(window)) === 'object' && platform.toLowerCase() === 'web';
	},
	isIOS: function isIOS() {
		var _weex$config$env = weex.config.env,
		    platform = _weex$config$env.platform,
		    osName = _weex$config$env.osName;

		return platform.toLowerCase() === 'ios' || osName.toLowerCase() === 'ios';
	},
	isIPhoneX: function isIPhoneX() {
		var deviceHeight = weex.config.env.deviceHeight;

		if (Env.isWeb()) {
			return typeof window !== 'undefined' && window.screen && window.screen.width && window.screen.height && ~~window.screen.width === 375 && ~~window.screen.height === 812;
		}
		return Env.isIOS() && deviceHeight === 2436;
	},
	isAndroid: function isAndroid() {
		var _weex$config$env2 = weex.config.env,
		    platform = _weex$config$env2.platform,
		    osName = _weex$config$env2.osName,
		    os = _weex$config$env2.os;

		return platform.toLowerCase() === 'android' || osName.toLowerCase() === 'android' || os.toLowerCase() === 'android';
	},
	supportsEB: function supportsEB() {
		var weexVersion = weex.config.env.weexVersion || '0';
		var isHighWeex = Env.compareVersion(weexVersion, '0.10.1.4') && (Env.isIOS() || Env.isAndroid());
		var expressionBinding = weex.requireModule('expressionBinding');
		return expressionBinding && expressionBinding.enableBinding && isHighWeex;
	},

	/**
  * 获取weex屏幕真实的设置高度，需要减去导航栏高度
  * @returns {Number}
  */
	getPageHeight: function getPageHeight() {
		var env = weex.config.env;

		var navHeight = Env.isWeb() ? 0 : Env.isIPhoneX() ? 176 : 132;
		return env.deviceHeight / env.deviceWidth * 750 - navHeight;
	},

	/**
  * 版本号比较
  * @memberOf Env
  * @param currVer {string}
  * @param promoteVer {string}
  * @returns {boolean}
  *
  */
	compareVersion: function compareVersion() {
		var currVer = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : '0.0.0';
		var promoteVer = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : '0.0.0';

		if (currVer === promoteVer) return true;
		var currVerArr = currVer.split('.');
		var promoteVerArr = promoteVer.split('.');
		var len = Math.max(currVerArr.length, promoteVerArr.length);
		for (var i = 0; i < len; i++) {
			var proVal = ~~promoteVerArr[i];
			var curVal = ~~currVerArr[i];
			if (proVal < curVal) {
				return true;
			} else if (proVal > curVal) {
				return false;
			}
		}
		return false;
	}
};

/* harmony default export */ __webpack_exports__["a"] = (Env);

/***/ }),
/* 12 */
/***/ (function(module, exports, __webpack_require__) {

module.exports = __webpack_require__(91);


/***/ }),
/* 13 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


exports.__esModule = true;

var _promise = __webpack_require__(14);

var _promise2 = _interopRequireDefault(_promise);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

exports.default = function (fn) {
  return function () {
    var gen = fn.apply(this, arguments);
    return new _promise2.default(function (resolve, reject) {
      function step(key, arg) {
        try {
          var info = gen[key](arg);
          var value = info.value;
        } catch (error) {
          reject(error);
          return;
        }

        if (info.done) {
          resolve(value);
        } else {
          return _promise2.default.resolve(value).then(function (value) {
            step("next", value);
          }, function (err) {
            step("throw", err);
          });
        }
      }

      return step("next");
    });
  };
};

/***/ }),
/* 14 */
/***/ (function(module, exports, __webpack_require__) {

module.exports = { "default": __webpack_require__(93), __esModule: true };

/***/ }),
/* 15 */
/***/ (function(module, exports) {

module.exports = function (exec) {
  try {
    return !!exec();
  } catch (e) {
    return true;
  }
};


/***/ }),
/* 16 */
/***/ (function(module, exports, __webpack_require__) {

// to indexed object, toObject with fallback for non-array-like ES3 strings
var IObject = __webpack_require__(54);
var defined = __webpack_require__(33);
module.exports = function (it) {
  return IObject(defined(it));
};


/***/ }),
/* 17 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony default export */ __webpack_exports__["a"] = ({
	getRootDomain: function getRootDomain() {
		var r = window.location.host.match(/^(\w+\.)*(\w+\.\w+)(:\d+)?$/);
		return r ? r[2] : window.location.host;
	},
	getUrlParam: function getUrlParam(key, url) {
		var reg = new RegExp('(#|&|\\?)' + key + '=([^&=\?#]+)');
		var ret = (url || document.location.href).match(reg);
		return ret && ret[2] || '';
	}
});

/***/ }),
/* 18 */
/***/ (function(module, exports, __webpack_require__) {

// optional / simple context binding
var aFunction = __webpack_require__(24);
module.exports = function (fn, that, length) {
  aFunction(fn);
  if (that === undefined) return fn;
  switch (length) {
    case 1: return function (a) {
      return fn.call(that, a);
    };
    case 2: return function (a, b) {
      return fn.call(that, a, b);
    };
    case 3: return function (a, b, c) {
      return fn.call(that, a, b, c);
    };
  }
  return function (/* ...args */) {
    return fn.apply(that, arguments);
  };
};


/***/ }),
/* 19 */
/***/ (function(module, exports) {

module.exports = function (bitmap, value) {
  return {
    enumerable: !(bitmap & 1),
    configurable: !(bitmap & 2),
    writable: !(bitmap & 4),
    value: value
  };
};


/***/ }),
/* 20 */
/***/ (function(module, exports) {

module.exports = {};


/***/ }),
/* 21 */
/***/ (function(module, exports, __webpack_require__) {

// 19.1.2.14 / 15.2.3.14 Object.keys(O)
var $keys = __webpack_require__(53);
var enumBugKeys = __webpack_require__(39);

module.exports = Object.keys || function keys(O) {
  return $keys(O, enumBugKeys);
};


/***/ }),
/* 22 */
/***/ (function(module, exports) {

var toString = {}.toString;

module.exports = function (it) {
  return toString.call(it).slice(8, -1);
};


/***/ }),
/* 23 */
/***/ (function(module, exports) {

module.exports = true;


/***/ }),
/* 24 */
/***/ (function(module, exports) {

module.exports = function (it) {
  if (typeof it != 'function') throw TypeError(it + ' is not a function!');
  return it;
};


/***/ }),
/* 25 */
/***/ (function(module, exports) {

var id = 0;
var px = Math.random();
module.exports = function (key) {
  return 'Symbol('.concat(key === undefined ? '' : key, ')_', (++id + px).toString(36));
};


/***/ }),
/* 26 */
/***/ (function(module, exports, __webpack_require__) {

var def = __webpack_require__(4).f;
var has = __webpack_require__(9);
var TAG = __webpack_require__(2)('toStringTag');

module.exports = function (it, tag, stat) {
  if (it && !has(it = stat ? it : it.prototype, TAG)) def(it, TAG, { configurable: true, value: tag });
};


/***/ }),
/* 27 */
/***/ (function(module, exports, __webpack_require__) {

// 7.1.13 ToObject(argument)
var defined = __webpack_require__(33);
module.exports = function (it) {
  return Object(defined(it));
};


/***/ }),
/* 28 */
/***/ (function(module, exports) {

exports.f = {}.propertyIsEnumerable;


/***/ }),
/* 29 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0_babel_runtime_core_js_object_assign__ = __webpack_require__(66);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0_babel_runtime_core_js_object_assign___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_0_babel_runtime_core_js_object_assign__);

/**
 * 设置cookie
 * @param key
 * @param value
 * @param options
 * @returns {string}
 */

function setCookie(key, value, options) {
	var days = void 0,
	    time = void 0,
	    decode = void 0;

	// A key and value were given. Set cookie.
	if (arguments.length > 1 && String(value) !== '[object Object]') {
		// Enforce object
		options = __WEBPACK_IMPORTED_MODULE_0_babel_runtime_core_js_object_assign___default()({}, options);

		if (value === null || value === undefined) options.expires = -1;

		if (typeof options.expires === 'number') {
			days = options.expires * 24 * 60 * 60 * 1000;
			time = options.expires = new Date();

			time.setTime(time.getTime() + days);
		}

		value = String(value);

		return document.cookie = [encodeURIComponent(key), '=', options.raw ? value : encodeURIComponent(value), options.expires ? '; expires=' + options.expires.toUTCString() : '', options.path ? '; path=' + options.path : '', options.domain ? '; domain=' + options.domain : '', options.secure ? '; secure' : ''].join('');
	}

	// Key and possibly options given, get cookie
	options = value || {};

	decode = options.raw ? function (s) {
		return s;
	} : decodeURIComponent;
	return getCookie(key, decode);
}

/**
 *
 * @param key
 * @param decode
 * @returns {null, String}
 */

function getCookie(key, decode) {
	decode = decode || decodeURIComponent;
	var result = new RegExp('(?:^|; )' + encodeURIComponent(key) + '=([^;]*)').exec(document.cookie);
	return result ? decode(result[1]) : null;
}

/* harmony default export */ __webpack_exports__["a"] = ({
	setCookie: setCookie,
	getCookie: getCookie
});

/***/ }),
/* 30 */
/***/ (function(module, exports, __webpack_require__) {

module.exports = { "default": __webpack_require__(145), __esModule: true };

/***/ }),
/* 31 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

var $at = __webpack_require__(94)(true);

// 21.1.3.27 String.prototype[@@iterator]()
__webpack_require__(49)(String, 'String', function (iterated) {
  this._t = String(iterated); // target
  this._i = 0;                // next index
// 21.1.5.2.1 %StringIteratorPrototype%.next()
}, function () {
  var O = this._t;
  var index = this._i;
  var point;
  if (index >= O.length) return { value: undefined, done: true };
  point = $at(O, index);
  this._i += point.length;
  return { value: point, done: false };
});


/***/ }),
/* 32 */
/***/ (function(module, exports) {

// 7.1.4 ToInteger
var ceil = Math.ceil;
var floor = Math.floor;
module.exports = function (it) {
  return isNaN(it = +it) ? 0 : (it > 0 ? floor : ceil)(it);
};


/***/ }),
/* 33 */
/***/ (function(module, exports) {

// 7.2.1 RequireObjectCoercible(argument)
module.exports = function (it) {
  if (it == undefined) throw TypeError("Can't call method on  " + it);
  return it;
};


/***/ }),
/* 34 */
/***/ (function(module, exports, __webpack_require__) {

var isObject = __webpack_require__(8);
var document = __webpack_require__(1).document;
// typeof document.createElement is 'object' in old IE
var is = isObject(document) && isObject(document.createElement);
module.exports = function (it) {
  return is ? document.createElement(it) : {};
};


/***/ }),
/* 35 */
/***/ (function(module, exports, __webpack_require__) {

// 7.1.1 ToPrimitive(input [, PreferredType])
var isObject = __webpack_require__(8);
// instead of the ES6 spec version, we didn't implement @@toPrimitive case
// and the second argument - flag - preferred type is a string
module.exports = function (it, S) {
  if (!isObject(it)) return it;
  var fn, val;
  if (S && typeof (fn = it.toString) == 'function' && !isObject(val = fn.call(it))) return val;
  if (typeof (fn = it.valueOf) == 'function' && !isObject(val = fn.call(it))) return val;
  if (!S && typeof (fn = it.toString) == 'function' && !isObject(val = fn.call(it))) return val;
  throw TypeError("Can't convert object to primitive value");
};


/***/ }),
/* 36 */
/***/ (function(module, exports, __webpack_require__) {

// 7.1.15 ToLength
var toInteger = __webpack_require__(32);
var min = Math.min;
module.exports = function (it) {
  return it > 0 ? min(toInteger(it), 0x1fffffffffffff) : 0; // pow(2, 53) - 1 == 9007199254740991
};


/***/ }),
/* 37 */
/***/ (function(module, exports, __webpack_require__) {

var shared = __webpack_require__(38)('keys');
var uid = __webpack_require__(25);
module.exports = function (key) {
  return shared[key] || (shared[key] = uid(key));
};


/***/ }),
/* 38 */
/***/ (function(module, exports, __webpack_require__) {

var global = __webpack_require__(1);
var SHARED = '__core-js_shared__';
var store = global[SHARED] || (global[SHARED] = {});
module.exports = function (key) {
  return store[key] || (store[key] = {});
};


/***/ }),
/* 39 */
/***/ (function(module, exports) {

// IE 8- don't enum bug keys
module.exports = (
  'constructor,hasOwnProperty,isPrototypeOf,propertyIsEnumerable,toLocaleString,toString,valueOf'
).split(',');


/***/ }),
/* 40 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

// 25.4.1.5 NewPromiseCapability(C)
var aFunction = __webpack_require__(24);

function PromiseCapability(C) {
  var resolve, reject;
  this.promise = new C(function ($$resolve, $$reject) {
    if (resolve !== undefined || reject !== undefined) throw TypeError('Bad Promise constructor');
    resolve = $$resolve;
    reject = $$reject;
  });
  this.resolve = aFunction(resolve);
  this.reject = aFunction(reject);
}

module.exports.f = function (C) {
  return new PromiseCapability(C);
};


/***/ }),
/* 41 */
/***/ (function(module, exports) {

exports.f = Object.getOwnPropertySymbols;


/***/ }),
/* 42 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


exports.__esModule = true;

var _iterator = __webpack_require__(124);

var _iterator2 = _interopRequireDefault(_iterator);

var _symbol = __webpack_require__(126);

var _symbol2 = _interopRequireDefault(_symbol);

var _typeof = typeof _symbol2.default === "function" && typeof _iterator2.default === "symbol" ? function (obj) { return typeof obj; } : function (obj) { return obj && typeof _symbol2.default === "function" && obj.constructor === _symbol2.default && obj !== _symbol2.default.prototype ? "symbol" : typeof obj; };

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

exports.default = typeof _symbol2.default === "function" && _typeof(_iterator2.default) === "symbol" ? function (obj) {
  return typeof obj === "undefined" ? "undefined" : _typeof(obj);
} : function (obj) {
  return obj && typeof _symbol2.default === "function" && obj.constructor === _symbol2.default && obj !== _symbol2.default.prototype ? "symbol" : typeof obj === "undefined" ? "undefined" : _typeof(obj);
};

/***/ }),
/* 43 */
/***/ (function(module, exports, __webpack_require__) {

exports.f = __webpack_require__(2);


/***/ }),
/* 44 */
/***/ (function(module, exports, __webpack_require__) {

var global = __webpack_require__(1);
var core = __webpack_require__(0);
var LIBRARY = __webpack_require__(23);
var wksExt = __webpack_require__(43);
var defineProperty = __webpack_require__(4).f;
module.exports = function (name) {
  var $Symbol = core.Symbol || (core.Symbol = LIBRARY ? {} : global.Symbol || {});
  if (name.charAt(0) != '_' && !(name in $Symbol)) defineProperty($Symbol, name, { value: wksExt.f(name) });
};


/***/ }),
/* 45 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "e", function() { return Touch; });
/* unused harmony export Preview */
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "b", function() { return Env; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return Cookie; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "f", function() { return Url; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "c", function() { return JsBridge; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "d", function() { return SnsShare; });
/* unused harmony export Wechat */
/* unused harmony export Browser */
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "g", function() { return WebTracker; });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__web_touch__ = __webpack_require__(136);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__web_preview__ = __webpack_require__(142);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2__env__ = __webpack_require__(11);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_3__web_cookie__ = __webpack_require__(29);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_4__web_url__ = __webpack_require__(17);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_5__web_js_bridge__ = __webpack_require__(68);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_6__web_sns_share__ = __webpack_require__(143);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_7__web_wechat__ = __webpack_require__(69);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_8__web_browser__ = __webpack_require__(71);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_9__web_web_tracker__ = __webpack_require__(72);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_10__get_routes__ = __webpack_require__(146);
/* harmony reexport (binding) */ __webpack_require__.d(__webpack_exports__, "i", function() { return __WEBPACK_IMPORTED_MODULE_10__get_routes__["a"]; });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_11__web_get_scripts__ = __webpack_require__(70);
/* unused harmony reexport getScripts */
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_12__web_download_app__ = __webpack_require__(147);
/* harmony reexport (binding) */ __webpack_require__.d(__webpack_exports__, "h", function() { return __WEBPACK_IMPORTED_MODULE_12__web_download_app__["a"]; });















var Touch = __WEBPACK_IMPORTED_MODULE_0__web_touch__["a" /* default */];
var Preview = __WEBPACK_IMPORTED_MODULE_1__web_preview__["a" /* default */];
var Env = __WEBPACK_IMPORTED_MODULE_2__env__["a" /* default */];
var Cookie = __WEBPACK_IMPORTED_MODULE_3__web_cookie__["a" /* default */];
var Url = __WEBPACK_IMPORTED_MODULE_4__web_url__["a" /* default */];
var JsBridge = __WEBPACK_IMPORTED_MODULE_5__web_js_bridge__["a" /* default */];
var SnsShare = __WEBPACK_IMPORTED_MODULE_6__web_sns_share__["a" /* default */];
var Wechat = __WEBPACK_IMPORTED_MODULE_7__web_wechat__["a" /* default */];
var Browser = __WEBPACK_IMPORTED_MODULE_8__web_browser__["a" /* default */];
var WebTracker = __WEBPACK_IMPORTED_MODULE_9__web_web_tracker__["a" /* default */];

/* unused harmony default export */ var _unused_webpack_default_export = ({
	touch: __WEBPACK_IMPORTED_MODULE_0__web_touch__["a" /* default */],
	preview: __WEBPACK_IMPORTED_MODULE_1__web_preview__["a" /* default */],
	env: __WEBPACK_IMPORTED_MODULE_2__env__["a" /* default */],
	cookie: __WEBPACK_IMPORTED_MODULE_3__web_cookie__["a" /* default */],
	url: __WEBPACK_IMPORTED_MODULE_4__web_url__["a" /* default */],
	jsBridge: __WEBPACK_IMPORTED_MODULE_5__web_js_bridge__["a" /* default */],
	snsShare: __WEBPACK_IMPORTED_MODULE_6__web_sns_share__["a" /* default */],
	wechat: __WEBPACK_IMPORTED_MODULE_7__web_wechat__["a" /* default */],
	browser: __WEBPACK_IMPORTED_MODULE_8__web_browser__["a" /* default */],
	webTracker: __WEBPACK_IMPORTED_MODULE_9__web_web_tracker__["a" /* default */]
});

/***/ }),
/* 46 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony default export */ __webpack_exports__["a"] = ({
	pageType: 'app',
	appName: '美甲帮',
	appSlogan: '和百万美甲师在一起',
	appVersion: '4.8',
	appPlatform: 'H5',
	appUrl: 'https://m.meijiabang.cn/',
	cdnCacheTime: '600',
	whiteDomainRegExp: /^([^\.]+\.)*(meijialove\.com|mli\.so|meijiabang\.cn|mooyoo\.com\.cn|cpma\-cn\.com|manicurist\.org\.cn|nailist\.com\.cn|chinanailist\.com)$/i,
	cookieDomainRegExp: /^([^\.]+\.)*(meijialove\.com|mli\.so|meijiabang\.cn)$/i,
	appIcon: 'https://m.meijiabang.cn/img/icon180.jpg',
	downloadAppUrl: 'http://www.meijiabang.cn/1-',
	downloadAppDefaultSource: '402',
	apiTimeout: 30000,
	api: {
		default: '//api.meijiabang.cn/',
		cpma: '//api.manicurist.org.cn/',
		cdn: '//api-cdn.meijiabang.cn/',
		defaultStatic: '//static-api.meijiabang.cn/'
	},
	apiWechatPay: 'http://meijialove.com/', //暂时添加微信支付域名
	wechatPaymentOrigin: '//api.meijiabang.cn/', //微信支付根域名
	mallPaymentUrl: 'http://meijialove.com/init.php/home/payment/mall_go_pay',
	wechatAppId: 'wx8dd9768db7127fdb', // 美甲帮服务号 appID
	//阿里云日志服务Tracking
	webTrackingDomainRegExp: /^(m(\d*|test)\.)?(meijialove\.com|meijiabang\.cn)$/i,
	webTrackingEndpoint: 'cn-hangzhou.log.aliyuncs.com',
	webTrackingProject: 'meijiabang-log',
	webTrackingLogstore: 'web-tracking'
});

/***/ }),
/* 47 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


exports.__esModule = true;

var _from = __webpack_require__(163);

var _from2 = _interopRequireDefault(_from);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

exports.default = function (arr) {
  if (Array.isArray(arr)) {
    for (var i = 0, arr2 = Array(arr.length); i < arr.length; i++) {
      arr2[i] = arr[i];
    }

    return arr2;
  } else {
    return (0, _from2.default)(arr);
  }
};

/***/ }),
/* 48 */
/***/ (function(module, exports) {



/***/ }),
/* 49 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

var LIBRARY = __webpack_require__(23);
var $export = __webpack_require__(3);
var redefine = __webpack_require__(51);
var hide = __webpack_require__(7);
var has = __webpack_require__(9);
var Iterators = __webpack_require__(20);
var $iterCreate = __webpack_require__(95);
var setToStringTag = __webpack_require__(26);
var getPrototypeOf = __webpack_require__(99);
var ITERATOR = __webpack_require__(2)('iterator');
var BUGGY = !([].keys && 'next' in [].keys()); // Safari has buggy iterators w/o `next`
var FF_ITERATOR = '@@iterator';
var KEYS = 'keys';
var VALUES = 'values';

var returnThis = function () { return this; };

module.exports = function (Base, NAME, Constructor, next, DEFAULT, IS_SET, FORCED) {
  $iterCreate(Constructor, NAME, next);
  var getMethod = function (kind) {
    if (!BUGGY && kind in proto) return proto[kind];
    switch (kind) {
      case KEYS: return function keys() { return new Constructor(this, kind); };
      case VALUES: return function values() { return new Constructor(this, kind); };
    } return function entries() { return new Constructor(this, kind); };
  };
  var TAG = NAME + ' Iterator';
  var DEF_VALUES = DEFAULT == VALUES;
  var VALUES_BUG = false;
  var proto = Base.prototype;
  var $native = proto[ITERATOR] || proto[FF_ITERATOR] || DEFAULT && proto[DEFAULT];
  var $default = (!BUGGY && $native) || getMethod(DEFAULT);
  var $entries = DEFAULT ? !DEF_VALUES ? $default : getMethod('entries') : undefined;
  var $anyNative = NAME == 'Array' ? proto.entries || $native : $native;
  var methods, key, IteratorPrototype;
  // Fix native
  if ($anyNative) {
    IteratorPrototype = getPrototypeOf($anyNative.call(new Base()));
    if (IteratorPrototype !== Object.prototype && IteratorPrototype.next) {
      // Set @@toStringTag to native iterators
      setToStringTag(IteratorPrototype, TAG, true);
      // fix for some old engines
      if (!LIBRARY && !has(IteratorPrototype, ITERATOR)) hide(IteratorPrototype, ITERATOR, returnThis);
    }
  }
  // fix Array#{values, @@iterator}.name in V8 / FF
  if (DEF_VALUES && $native && $native.name !== VALUES) {
    VALUES_BUG = true;
    $default = function values() { return $native.call(this); };
  }
  // Define iterator
  if ((!LIBRARY || FORCED) && (BUGGY || VALUES_BUG || !proto[ITERATOR])) {
    hide(proto, ITERATOR, $default);
  }
  // Plug for library
  Iterators[NAME] = $default;
  Iterators[TAG] = returnThis;
  if (DEFAULT) {
    methods = {
      values: DEF_VALUES ? $default : getMethod(VALUES),
      keys: IS_SET ? $default : getMethod(KEYS),
      entries: $entries
    };
    if (FORCED) for (key in methods) {
      if (!(key in proto)) redefine(proto, key, methods[key]);
    } else $export($export.P + $export.F * (BUGGY || VALUES_BUG), NAME, methods);
  }
  return methods;
};


/***/ }),
/* 50 */
/***/ (function(module, exports, __webpack_require__) {

module.exports = !__webpack_require__(6) && !__webpack_require__(15)(function () {
  return Object.defineProperty(__webpack_require__(34)('div'), 'a', { get: function () { return 7; } }).a != 7;
});


/***/ }),
/* 51 */
/***/ (function(module, exports, __webpack_require__) {

module.exports = __webpack_require__(7);


/***/ }),
/* 52 */
/***/ (function(module, exports, __webpack_require__) {

// 19.1.2.2 / 15.2.3.5 Object.create(O [, Properties])
var anObject = __webpack_require__(5);
var dPs = __webpack_require__(96);
var enumBugKeys = __webpack_require__(39);
var IE_PROTO = __webpack_require__(37)('IE_PROTO');
var Empty = function () { /* empty */ };
var PROTOTYPE = 'prototype';

// Create object with fake `null` prototype: use iframe Object with cleared prototype
var createDict = function () {
  // Thrash, waste and sodomy: IE GC bug
  var iframe = __webpack_require__(34)('iframe');
  var i = enumBugKeys.length;
  var lt = '<';
  var gt = '>';
  var iframeDocument;
  iframe.style.display = 'none';
  __webpack_require__(55).appendChild(iframe);
  iframe.src = 'javascript:'; // eslint-disable-line no-script-url
  // createDict = iframe.contentWindow.Object;
  // html.removeChild(iframe);
  iframeDocument = iframe.contentWindow.document;
  iframeDocument.open();
  iframeDocument.write(lt + 'script' + gt + 'document.F=Object' + lt + '/script' + gt);
  iframeDocument.close();
  createDict = iframeDocument.F;
  while (i--) delete createDict[PROTOTYPE][enumBugKeys[i]];
  return createDict();
};

module.exports = Object.create || function create(O, Properties) {
  var result;
  if (O !== null) {
    Empty[PROTOTYPE] = anObject(O);
    result = new Empty();
    Empty[PROTOTYPE] = null;
    // add "__proto__" for Object.getPrototypeOf polyfill
    result[IE_PROTO] = O;
  } else result = createDict();
  return Properties === undefined ? result : dPs(result, Properties);
};


/***/ }),
/* 53 */
/***/ (function(module, exports, __webpack_require__) {

var has = __webpack_require__(9);
var toIObject = __webpack_require__(16);
var arrayIndexOf = __webpack_require__(97)(false);
var IE_PROTO = __webpack_require__(37)('IE_PROTO');

module.exports = function (object, names) {
  var O = toIObject(object);
  var i = 0;
  var result = [];
  var key;
  for (key in O) if (key != IE_PROTO) has(O, key) && result.push(key);
  // Don't enum bug & hidden keys
  while (names.length > i) if (has(O, key = names[i++])) {
    ~arrayIndexOf(result, key) || result.push(key);
  }
  return result;
};


/***/ }),
/* 54 */
/***/ (function(module, exports, __webpack_require__) {

// fallback for non-array-like ES3 and non-enumerable old V8 strings
var cof = __webpack_require__(22);
// eslint-disable-next-line no-prototype-builtins
module.exports = Object('z').propertyIsEnumerable(0) ? Object : function (it) {
  return cof(it) == 'String' ? it.split('') : Object(it);
};


/***/ }),
/* 55 */
/***/ (function(module, exports, __webpack_require__) {

var document = __webpack_require__(1).document;
module.exports = document && document.documentElement;


/***/ }),
/* 56 */
/***/ (function(module, exports, __webpack_require__) {

__webpack_require__(100);
var global = __webpack_require__(1);
var hide = __webpack_require__(7);
var Iterators = __webpack_require__(20);
var TO_STRING_TAG = __webpack_require__(2)('toStringTag');

var DOMIterables = ('CSSRuleList,CSSStyleDeclaration,CSSValueList,ClientRectList,DOMRectList,DOMStringList,' +
  'DOMTokenList,DataTransferItemList,FileList,HTMLAllCollection,HTMLCollection,HTMLFormElement,HTMLSelectElement,' +
  'MediaList,MimeTypeArray,NamedNodeMap,NodeList,PaintRequestList,Plugin,PluginArray,SVGLengthList,SVGNumberList,' +
  'SVGPathSegList,SVGPointList,SVGStringList,SVGTransformList,SourceBufferList,StyleSheetList,TextTrackCueList,' +
  'TextTrackList,TouchList').split(',');

for (var i = 0; i < DOMIterables.length; i++) {
  var NAME = DOMIterables[i];
  var Collection = global[NAME];
  var proto = Collection && Collection.prototype;
  if (proto && !proto[TO_STRING_TAG]) hide(proto, TO_STRING_TAG, NAME);
  Iterators[NAME] = Iterators.Array;
}


/***/ }),
/* 57 */
/***/ (function(module, exports, __webpack_require__) {

// getting tag from 19.1.3.6 Object.prototype.toString()
var cof = __webpack_require__(22);
var TAG = __webpack_require__(2)('toStringTag');
// ES3 wrong here
var ARG = cof(function () { return arguments; }()) == 'Arguments';

// fallback for IE11 Script Access Denied error
var tryGet = function (it, key) {
  try {
    return it[key];
  } catch (e) { /* empty */ }
};

module.exports = function (it) {
  var O, T, B;
  return it === undefined ? 'Undefined' : it === null ? 'Null'
    // @@toStringTag case
    : typeof (T = tryGet(O = Object(it), TAG)) == 'string' ? T
    // builtinTag case
    : ARG ? cof(O)
    // ES3 arguments fallback
    : (B = cof(O)) == 'Object' && typeof O.callee == 'function' ? 'Arguments' : B;
};


/***/ }),
/* 58 */
/***/ (function(module, exports, __webpack_require__) {

// call something on iterator step with safe closing on error
var anObject = __webpack_require__(5);
module.exports = function (iterator, fn, value, entries) {
  try {
    return entries ? fn(anObject(value)[0], value[1]) : fn(value);
  // 7.4.6 IteratorClose(iterator, completion)
  } catch (e) {
    var ret = iterator['return'];
    if (ret !== undefined) anObject(ret.call(iterator));
    throw e;
  }
};


/***/ }),
/* 59 */
/***/ (function(module, exports, __webpack_require__) {

// check on default Array iterator
var Iterators = __webpack_require__(20);
var ITERATOR = __webpack_require__(2)('iterator');
var ArrayProto = Array.prototype;

module.exports = function (it) {
  return it !== undefined && (Iterators.Array === it || ArrayProto[ITERATOR] === it);
};


/***/ }),
/* 60 */
/***/ (function(module, exports, __webpack_require__) {

var classof = __webpack_require__(57);
var ITERATOR = __webpack_require__(2)('iterator');
var Iterators = __webpack_require__(20);
module.exports = __webpack_require__(0).getIteratorMethod = function (it) {
  if (it != undefined) return it[ITERATOR]
    || it['@@iterator']
    || Iterators[classof(it)];
};


/***/ }),
/* 61 */
/***/ (function(module, exports, __webpack_require__) {

// 7.3.20 SpeciesConstructor(O, defaultConstructor)
var anObject = __webpack_require__(5);
var aFunction = __webpack_require__(24);
var SPECIES = __webpack_require__(2)('species');
module.exports = function (O, D) {
  var C = anObject(O).constructor;
  var S;
  return C === undefined || (S = anObject(C)[SPECIES]) == undefined ? D : aFunction(S);
};


/***/ }),
/* 62 */
/***/ (function(module, exports, __webpack_require__) {

var ctx = __webpack_require__(18);
var invoke = __webpack_require__(106);
var html = __webpack_require__(55);
var cel = __webpack_require__(34);
var global = __webpack_require__(1);
var process = global.process;
var setTask = global.setImmediate;
var clearTask = global.clearImmediate;
var MessageChannel = global.MessageChannel;
var Dispatch = global.Dispatch;
var counter = 0;
var queue = {};
var ONREADYSTATECHANGE = 'onreadystatechange';
var defer, channel, port;
var run = function () {
  var id = +this;
  // eslint-disable-next-line no-prototype-builtins
  if (queue.hasOwnProperty(id)) {
    var fn = queue[id];
    delete queue[id];
    fn();
  }
};
var listener = function (event) {
  run.call(event.data);
};
// Node.js 0.9+ & IE10+ has setImmediate, otherwise:
if (!setTask || !clearTask) {
  setTask = function setImmediate(fn) {
    var args = [];
    var i = 1;
    while (arguments.length > i) args.push(arguments[i++]);
    queue[++counter] = function () {
      // eslint-disable-next-line no-new-func
      invoke(typeof fn == 'function' ? fn : Function(fn), args);
    };
    defer(counter);
    return counter;
  };
  clearTask = function clearImmediate(id) {
    delete queue[id];
  };
  // Node.js 0.8-
  if (__webpack_require__(22)(process) == 'process') {
    defer = function (id) {
      process.nextTick(ctx(run, id, 1));
    };
  // Sphere (JS game engine) Dispatch API
  } else if (Dispatch && Dispatch.now) {
    defer = function (id) {
      Dispatch.now(ctx(run, id, 1));
    };
  // Browsers with MessageChannel, includes WebWorkers
  } else if (MessageChannel) {
    channel = new MessageChannel();
    port = channel.port2;
    channel.port1.onmessage = listener;
    defer = ctx(port.postMessage, port, 1);
  // Browsers with postMessage, skip WebWorkers
  // IE8 has postMessage, but it's sync & typeof its postMessage is 'object'
  } else if (global.addEventListener && typeof postMessage == 'function' && !global.importScripts) {
    defer = function (id) {
      global.postMessage(id + '', '*');
    };
    global.addEventListener('message', listener, false);
  // IE8-
  } else if (ONREADYSTATECHANGE in cel('script')) {
    defer = function (id) {
      html.appendChild(cel('script'))[ONREADYSTATECHANGE] = function () {
        html.removeChild(this);
        run.call(id);
      };
    };
  // Rest old browsers
  } else {
    defer = function (id) {
      setTimeout(ctx(run, id, 1), 0);
    };
  }
}
module.exports = {
  set: setTask,
  clear: clearTask
};


/***/ }),
/* 63 */
/***/ (function(module, exports) {

module.exports = function (exec) {
  try {
    return { e: false, v: exec() };
  } catch (e) {
    return { e: true, v: e };
  }
};


/***/ }),
/* 64 */
/***/ (function(module, exports, __webpack_require__) {

var anObject = __webpack_require__(5);
var isObject = __webpack_require__(8);
var newPromiseCapability = __webpack_require__(40);

module.exports = function (C, x) {
  anObject(C);
  if (isObject(x) && x.constructor === C) return x;
  var promiseCapability = newPromiseCapability.f(C);
  var resolve = promiseCapability.resolve;
  resolve(x);
  return promiseCapability.promise;
};


/***/ }),
/* 65 */
/***/ (function(module, exports, __webpack_require__) {

var ITERATOR = __webpack_require__(2)('iterator');
var SAFE_CLOSING = false;

try {
  var riter = [7][ITERATOR]();
  riter['return'] = function () { SAFE_CLOSING = true; };
  // eslint-disable-next-line no-throw-literal
  Array.from(riter, function () { throw 2; });
} catch (e) { /* empty */ }

module.exports = function (exec, skipClosing) {
  if (!skipClosing && !SAFE_CLOSING) return false;
  var safe = false;
  try {
    var arr = [7];
    var iter = arr[ITERATOR]();
    iter.next = function () { return { done: safe = true }; };
    arr[ITERATOR] = function () { return iter; };
    exec(arr);
  } catch (e) { /* empty */ }
  return safe;
};


/***/ }),
/* 66 */
/***/ (function(module, exports, __webpack_require__) {

module.exports = { "default": __webpack_require__(121), __esModule: true };

/***/ }),
/* 67 */
/***/ (function(module, exports, __webpack_require__) {

// 19.1.2.7 / 15.2.3.4 Object.getOwnPropertyNames(O)
var $keys = __webpack_require__(53);
var hiddenKeys = __webpack_require__(39).concat('length', 'prototype');

exports.f = Object.getOwnPropertyNames || function getOwnPropertyNames(O) {
  return $keys(O, hiddenKeys);
};


/***/ }),
/* 68 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__env__ = __webpack_require__(11);


var JsBridge = {
	init: function init(options) {
		JSBridge.ready(function () {});
	},
	ready: function ready(callback) {
		// TODO: 客户端加载 js-bridge 的钩子
		if (__WEBPACK_IMPORTED_MODULE_0__env__["a" /* default */].isMeijiabangJSBridgeReady()) {
			if (typeof callback === 'function') callback();
		} else {
			if (__WEBPACK_IMPORTED_MODULE_0__env__["a" /* default */].isIOS()) {
				Array.isArray(window.WVJBCallbacks) ? window.WVJBCallbacks.push(callback) : window.WVJBCallbacks = [callback];
				var WVJBIframe = document.createElement('iframe');
				WVJBIframe.style.display = 'none';
				WVJBIframe.src = 'wvjbscheme://__BRIDGE_LOADED__';
				document.documentElement.appendChild(WVJBIframe);
				WVJBIframe.onload = function () {
					document.documentElement.removeChild(WVJBIframe);
				};
			} else if (__WEBPACK_IMPORTED_MODULE_0__env__["a" /* default */].isAndroid()) {
				requestAnimationFrame(JsBridge.ready(callback));
			} else {
				alert('美甲帮正在努力兼容你的设备');
			}
		}
	}
};

/* harmony default export */ __webpack_exports__["a"] = (JsBridge);

/***/ }),
/* 69 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0_babel_runtime_regenerator__ = __webpack_require__(12);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0_babel_runtime_regenerator___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_0_babel_runtime_regenerator__);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1_babel_runtime_helpers_asyncToGenerator__ = __webpack_require__(13);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1_babel_runtime_helpers_asyncToGenerator___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_1_babel_runtime_helpers_asyncToGenerator__);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2__env__ = __webpack_require__(11);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_3__get_scripts__ = __webpack_require__(70);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_4__get_data__ = __webpack_require__(144);






var wechat = {};
//微信JS-SDK根据签名授权
var authWeixin = function authWeixin(callback) {
	Object(__WEBPACK_IMPORTED_MODULE_4__get_data__["a" /* default */])({
		path: 'thirdsns/wechat_jsapi_sign_package',
		version: 'v1',
		data: {
			url: encodeURIComponent(window.location.href.replace(/#.*/, ''))
		},
		success: function success(res) {
			window.wx.config({
				// debug: true,
				appId: res.data.app_id,
				timestamp: res.data.timestamp,
				nonceStr: res.data.nonce_str,
				signature: res.data.signature,
				jsApiList: ['checkJsApi', 'onMenuShareTimeline', 'onMenuShareAppMessage', 'onMenuShareQQ', 'onMenuShareWeibo', 'hideMenuItems', 'showMenuItems', 'hideAllNonBaseMenuItem', 'showAllNonBaseMenuItem', 'translateVoice', 'startRecord', 'stopRecord', 'onRecordEnd', 'playVoice', 'pauseVoice', 'stopVoice', 'uploadVoice', 'downloadVoice', 'chooseImage', 'previewImage', 'uploadImage', 'downloadImage', 'getNetworkType', 'openLocation', 'getLocation', 'hideOptionMenu', 'showOptionMenu', 'closeWindow', 'scanQRCode', 'chooseWXPay', 'openProductSpecificView', 'addCard', 'chooseCard', 'openCard']
			});
			if (typeof callback === 'function') {
				callback(window.wx);
			}
		}
	});
};

//初始化方法
wechat.init = function () {
	var _ref = __WEBPACK_IMPORTED_MODULE_1_babel_runtime_helpers_asyncToGenerator___default()( /*#__PURE__*/__WEBPACK_IMPORTED_MODULE_0_babel_runtime_regenerator___default.a.mark(function _callee(opt, callback) {
		return __WEBPACK_IMPORTED_MODULE_0_babel_runtime_regenerator___default.a.wrap(function _callee$(_context) {
			while (1) {
				switch (_context.prev = _context.next) {
					case 0:
						if (!__WEBPACK_IMPORTED_MODULE_2__env__["a" /* default */].isWechat()) {
							_context.next = 10;
							break;
						}

						if (!window.wx) {
							_context.next = 5;
							break;
						}

						wechat.setShareMsg(opt, callback);
						_context.next = 8;
						break;

					case 5:
						_context.next = 7;
						return Object(__WEBPACK_IMPORTED_MODULE_3__get_scripts__["a" /* default */])('//res.wx.qq.com/open/js/jweixin-1.0.0.js');

					case 7:
						authWeixin(function () {
							wechat.setShareMsg(opt, callback);
						});

					case 8:
						_context.next = 12;
						break;

					case 10:
						wechat.setShareMsg(opt, callback);
						console.log('不在微信环境中');

					case 12:
					case 'end':
						return _context.stop();
				}
			}
		}, _callee, this);
	}));

	return function (_x, _x2) {
		return _ref.apply(this, arguments);
	};
}();

//打开微信扫描功能
wechat.scanQRCode = function (type, cb) {
	if (window.wx) {
		window.wx.scanQRCode({
			needResult: type, // 默认为0，扫描结果由微信处理，1则直接返回扫描结果，
			scanType: ['qrCode', 'barCode'], // 可以指定扫二维码还是一维码，默认二者都有
			success: function success(res) {
				// 当needResult 为 1 时，扫码返回的结果
				cb(res.resultStr);
			}
		});
	} else {
		console.log('不在微信中,closeWindow方法无效');
	}
};

//关闭当前页面
wechat.closeWindow = function () {
	if (window.wx) {
		window.wx.ready(function () {
			window.wx.closeWindow();
		});
	} else {
		console.log('不在微信中,closeWindow方法无效');
	}
};

//检查网络类型
wechat.getNetworkType = function (cb) {
	if (window.wx) {
		window.wx.ready(function () {
			window.wx.getNetworkType({
				success: function success(res) {
					cb(res);
				}
			});
		});
	} else {
		console.log('不在微信中,getNetworkType方法无效');
	}
};

//打开右上角菜单类型
wechat.showOptionMenu = function () {
	if (window.wx) {
		window.wx.hideOptionMenu();
	} else {
		console.log('不在微信中,showOptionMenu方法无效');
	}
};

//设置分享文案
wechat.setShareMsg = function (opt, callback) {
	if (window.wx) {
		window.wx.ready(function () {
			var shareWechatConfig = opt || {};
			shareWechatConfig.imgUrl = shareWechatConfig.imgUrl.replace(/^http:\/\//, 'https://');
			window.wx.onMenuShareAppMessage(shareWechatConfig);
			window.wx.onMenuShareWeibo(shareWechatConfig);
			window.wx.onMenuShareAppMessage(shareWechatConfig);
			window.wx.onMenuShareQQ(shareWechatConfig);
			shareWechatConfig.title = opt.shareMomentsTitle || shareWechatConfig.title;
			window.wx.onMenuShareTimeline(shareWechatConfig);
			if (typeof callback === 'function') callback();
		});
	} else {
		Object(__WEBPACK_IMPORTED_MODULE_3__get_scripts__["a" /* default */])({ url: '//res.wx.qq.com/open/js/jweixin-1.0.0.js' }, function () {
			authWeixin(function () {
				wechat.setShareMsg(opt, callback);
			});
		});
	}
};

/* harmony default export */ __webpack_exports__["a"] = (wechat);

/***/ }),
/* 70 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export (immutable) */ __webpack_exports__["a"] = getScripts;
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0_babel_runtime_core_js_promise__ = __webpack_require__(14);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0_babel_runtime_core_js_promise___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_0_babel_runtime_core_js_promise__);

function loadJavascript(url) {

	return new __WEBPACK_IMPORTED_MODULE_0_babel_runtime_core_js_promise___default.a(function (resolve, reject) {
		var script = document.createElement('script');
		script.type = 'text\/javascript';
		script.src = url;

		script.onload = function (res) {
			resolve(res);
		};
		script.onerror = function (err) {
			reject(err);
		};
		document.body.appendChild(script);
	});
}

function getScripts(urls) {
	if (!urls || !Array.isArray(urls) && typeof urls !== 'string') throw new Error('请提供正确的远程路径!{String, Array[String,]}');
	if (Array.isArray(urls)) {
		return __WEBPACK_IMPORTED_MODULE_0_babel_runtime_core_js_promise___default.a.all(urls.map(function (url) {
			loadJavascript(url);
		}));
	}
	return loadJavascript(urls);
}

/***/ }),
/* 71 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
var browser = {};
var ua = navigator.userAgent;
ua.match(/(iPad).*OS\s([\d_]+)/) || ua.match(/(iPhone\sOS)\s([\d_]+)/) ? browser.iOS = true : browser.iOS = false;
ua.match(/(Android);?[\s\/]+([\d.]+)?/) ? browser.Android = true : browser.Android = false;
ua.match(/(iPhone|iPod|iPad).*AppleWebKit(?!.*Safari)/) ? browser.Webview = true : browser.Webview = false;
browser.Webview || ua.match(/Version\/([\d.]+)([^S](Safari)|[^M]*(Mobile)[^S]*(Safari))/) ? browser.Safari = true : browser.Safari = false;
ua.match(/Meijiabang\/([\d.]+)/i) || (!!window.MeijiabangJSBridge ? ["Meijiabang/3.0", "3.0"] : false) ? browser.Meijiabang = true : browser.Meijiabang = false;
ua.match(/MicroMessenger\/([\d.]+)/i) ? browser.Wechat = true : browser.Wechat = false;
ua.match(/MQQBrowser\/([\d.]+)/i) ? browser.QQBrowser = true : browser.QQBrowser = false;
ua.match(/ QQ\/([\d.]+)/i) ? browser.QQ = true : browser.QQ = false;
ua.match(/uc\/([\d.]+)/gi) ? browser.UC = true : browser.UC = false;
ua.match(/Chrome\/([\d.]+)/) ? browser.Chrome = true : browser.Chrome = false;
/* harmony default export */ __webpack_exports__["a"] = (browser);

/***/ }),
/* 72 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0_babel_runtime_core_js_json_stringify__ = __webpack_require__(30);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0_babel_runtime_core_js_json_stringify___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_0_babel_runtime_core_js_json_stringify__);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1_babel_runtime_helpers_extends__ = __webpack_require__(10);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1_babel_runtime_helpers_extends___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_1_babel_runtime_helpers_extends__);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2__browser__ = __webpack_require__(71);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_3__cookie__ = __webpack_require__(29);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_4__url__ = __webpack_require__(17);






var tracker = {},
    Tracking = {};
var Util = __WEBPACK_IMPORTED_MODULE_1_babel_runtime_helpers_extends___default()({
	cookie: function cookie() {
		if (arguments.length === 1) {
			return __WEBPACK_IMPORTED_MODULE_3__cookie__["a" /* default */].getCookie.apply(__WEBPACK_IMPORTED_MODULE_3__cookie__["a" /* default */], arguments);
		} else {
			return __WEBPACK_IMPORTED_MODULE_3__cookie__["a" /* default */].setCookie.apply(__WEBPACK_IMPORTED_MODULE_3__cookie__["a" /* default */], arguments);
		}
	}
}, __WEBPACK_IMPORTED_MODULE_4__url__["a" /* default */]);

+function () {
	var uuid = function uuid(len, radix) {
		var chars = '0123456789ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz'.split('');
		var uuid = [],
		    i = void 0;
		radix = radix || chars.length;
		if (len) {
			// Compact form
			for (i = 0; i < len; i++) {
				uuid[i] = chars[0 | Math.random() * radix];
			}
		} else {
			// rfc4122, version 4 form
			var r = void 0;
			// rfc4122 requires these characters
			uuid[8] = uuid[13] = uuid[18] = uuid[23] = '-';
			uuid[14] = '4';
			// Fill in random data. At i==19 set the high bits of clock sequence as
			// per rfc4122, sec. 4.1.5
			for (i = 0; i < 36; i++) {
				if (!uuid[i]) {
					r = 0 | Math.random() * 16;
					uuid[i] = chars[i == 19 ? r & 0x3 | 0x8 : r];
				}
			}
		}
		return uuid.join('');
	};

	var WebTrackerGuid = Util.cookie('web-tracker-guid') || '';

	if (!WebTrackerGuid) {
		WebTrackerGuid = uuid(32);
		Util.cookie('web-tracker-guid', WebTrackerGuid, {
			expires: 365,
			domain: Util.getRootDomain(),
			path: '/'
		});
	}

	function WebTracker() {
		var createHttpRequest = function createHttpRequest() {
			if (window.ActiveXObject) {
				return new ActiveXObject('Microsoft.XMLHTTP');
			} else if (window.XMLHttpRequest) {
				return new XMLHttpRequest();
			}
		};

		this.uri_ = '//meijiabang-log.cn-hangzhou.log.aliyuncs.com/logstores/web-tracking/track?APIVersion=0.6.0';
		this.error_uri_ = '//meijiabang-log.cn-hangzhou.log.aliyuncs.com/logstores/web-error/track?APIVersion=0.6.0';
		this.params_ = [];
		this.httpRequest_ = createHttpRequest();

		var href = window.location.href;

		//app应用url特殊处理
		if (href.indexOf('#!') > 0) {
			var regMatch = window.location.hash.match(/#(![^\/]+\/)(.*)/);
			if (regMatch) {
				href = href.replace('?', regMatch[1] + ':param?' + regMatch[2] + '&').replace(window.location.hash, '');
			} else {
				href = href.replace('?', window.location.hash.replace('#', '') + '?').replace(window.location.hash, '');
			}
		}

		var url = href.replace(/(#|\?).*/, '');
		var param = href.replace(/[^\?#]+(\?([^#]+))?(#.*)?/, '$2').replace(/(^|&)__source=[^&]+/, '');
		var hash = href.replace(/[^#]+#?/, '');

		var uid = 0;

		if (Util.cookie('g0yk_6c66_access_token')) {
			if (Util.cookie('g0yk_6c66_access_token').split('-').length === 2) {
				uid = Util.cookie('g0yk_6c66_access_token').split('-')[0];
			}
		}

		this.defaultData = {
			'url': url, //地址
			'param': param,
			'hash': hash,
			'os': __WEBPACK_IMPORTED_MODULE_2__browser__["a" /* default */].IOS && 'ios' || __WEBPACK_IMPORTED_MODULE_2__browser__["a" /* default */].Android && 'android' || 'other',
			'browser': __WEBPACK_IMPORTED_MODULE_2__browser__["a" /* default */].Meijiabang && 'meijiabang' || __WEBPACK_IMPORTED_MODULE_2__browser__["a" /* default */].Wechat && 'wechat' || __WEBPACK_IMPORTED_MODULE_2__browser__["a" /* default */].QQ && 'qq' || __WEBPACK_IMPORTED_MODULE_2__browser__["a" /* default */].QQBrowser && 'qqBrowser' || __WEBPACK_IMPORTED_MODULE_2__browser__["a" /* default */].UC && 'uc' || __WEBPACK_IMPORTED_MODULE_2__browser__["a" /* default */].Safari && 'safari' || __WEBPACK_IMPORTED_MODULE_2__browser__["a" /* default */].Chrome && 'chrome' || 'other',
			'guid': WebTrackerGuid,
			'uid': uid,
			'content_url': window.location.href,
			'content_title': document.title

			/*
      * url:地址
      * param: 地址里面带的参数
      * hash: 地址尾缀
      * os:访问设备系统类型
      * browser:访问浏览器的类型
      * uid: 用户uid(没有登陆的话传0)
      * guid: 相当于cookie的ID,统计PV时候用的,
      * event: 操作方式(点击按钮的统计就是'click',进入页面的就是'access'....)
      * category: 自定义的类型
      * label: 自定义的标题
      * value: 自定义的值
      * content_url: 默认当前URL
      * content_titl: 默认当前标题
      * */

		};var linkSource = ['utm_source', 'utm_medium', 'utm_campaign', 'utm_term', 'utm_content', 'content_url', 'content_title', 'content_tags', 'content_business', 'content_act'];
		if (!Util.getUrlParam('__source') || Util.getUrlParam('__source') === '') {
			for (var i = 0; i < linkSource.length; i++) {
				Util.getUrlParam(linkSource[i]) ? this.defaultData[linkSource[i]] = decodeURIComponent(Util.getUrlParam(linkSource[i])) : '';
			}
		} else {
			this.defaultData['source'] = decodeURIComponent(Util.getUrlParam('__source'));
		}
	}

	WebTracker.prototype = {
		_setParam: function _setParam(key, value) {
			if (!key || !value) {
				return;
			}
			this.params_.push(key);
			this.params_.push(value);
		},
		push: function push(data, type) {
			for (var l in this.defaultData) {
				this._setParam(l, this.defaultData[l]);
			}
			for (var k in data) {
				this._setParam(k, data[k]);
			}
			var url = '';
			if (type == 'error') {
				url = this.error_uri_;
			} else {
				url = this.uri_;
			}
			var k = 0;
			while (this.params_.length > 0) {
				if (k % 2 == 0) {
					url += '&' + encodeURIComponent(this.params_.shift());
				} else {
					url += '=' + encodeURIComponent(this.params_.shift());
				}
				++k;
			}
			try {
				this.httpRequest_.open('GET', url, true);
				this.httpRequest_.send(null);
			} catch (ex) {
				if (window && window.console && typeof window.console.log === 'function') {
					console.log('Failed to log to ali log service because of this exception:\n' + ex);
					console.log('Failed log data:', url);
				}
			}
		}
	};
	Tracking.webTracker = new WebTracker();
}();

tracker.report = function (event, category, label, value) {
	Tracking.webTracker.push({
		'event': event,
		'category': category,
		'label': label,
		'value': value
	});
};

tracker.customReport = function (opt) {
	Tracking.webTracker.push(opt);
};

tracker.startError = function () {
	console.log('开启错误监控');
	window.onerror = function (errorMessage, scriptURI, lineNumber, columnNumber, errorObj) {
		console.log(errorMessage, scriptURI, lineNumber, columnNumber, errorObj);
		var error_m = '';
		if (errorObj) {
			error_m = errorMessage + '|' + __WEBPACK_IMPORTED_MODULE_0_babel_runtime_core_js_json_stringify___default()(errorObj);
		} else {
			error_m = errorMessage;
		}

		setTimeout(function () {
			Tracking.webTracker.push({
				'error_message': error_m,
				'error_level': 'low'
			}, 'error');
		}, 10);
		return true;
	};

	window.addEventListener('error', function () {}, true);
};

// 保留方法，后续用vue自定义命令实现;
// var array = document.querySelectorAll('[click-tracker-category]');
// for (var i = 0; i < array.length; i++) {
//     array[i].removeEventListener('click', null, false);
//     array[i].addEventListener('click', function (e) {
//         WebTracker.report('click', e.target.getAttribute('click-tracker-category'), e.target.getAttribute('click-tracker-label'), e.target.getAttribute('click-tracker-value'));
//     }, false);
// }

/* harmony default export */ __webpack_exports__["a"] = (tracker);

/***/ }),
/* 73 */
/***/ (function(module, exports, __webpack_require__) {

module.exports = { "default": __webpack_require__(243), __esModule: true };

/***/ }),
/* 74 */
/***/ (function(module, exports, __webpack_require__) {


var clean = __webpack_require__(248)

/**
 * Export.
 */

module.exports = toSpaceCase

/**
 * Convert a `string` to space case.
 *
 * @param {String} string
 * @return {String}
 */

function toSpaceCase(string) {
  return clean(string).replace(/[\W_]+(.|$)/g, function (matches, match) {
    return match ? ' ' + match : ''
  }).trim()
}


/***/ }),
/* 75 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
Object.defineProperty(__webpack_exports__, "__esModule", { value: true });
/* harmony default export */ __webpack_exports__["default"] = ({
	install: function install(Vue) {
		Vue.prototype.$module = function (name) {
			var module = weex.requireModule(name);
			var platform = WXEnvironment.platform;
			if (module) {
				return module;
			} else if (platform.toLowerCase() === 'web') {
				var requireContext = __webpack_require__(252);
				var modules = function (m) {
					return m.keys().filter(function (key) {
						return key.indexOf('index.js') === -1;
					}).map(function (key) {
						return m(key).default;
					});
				}(requireContext);
				var result = (modules.filter(function (module) {
					return module.name === name;
				}) || [])[0];
				if (result) {
					return result.module;
				} else {
					console.log('模块不存在！');
				}
			}
		};
	}
});

/***/ }),
/* 76 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
var Config = {
    BASE_URL: 'http://api.meijiabang.cn/',
    pageType: "app",
    appName: "美甲帮",
    appSlogan: "和百万美甲师在一起",
    appVersion: "4.8",
    appPlatform: "H5",
    appUrl: 'http://m.meijiabang.cn/',
    cdnCacheTime: '600',
    whiteDomainRegExp: /^([^\.]+\.)*(meijialove\.com|mli\.so|meijiabang\.cn|mooyoo\.com\.cn|cpma\-cn\.com|manicurist\.org\.cn|nailist\.com\.cn|chinanailist\.com)$/i,
    cookieDomainRegExp: /^([^\.]+\.)*(meijialove\.com|mli\.so|meijiabang\.cn)$/i,
    appIcon: "https://m.meijiabang.cn/img/icon180.jpg",
    downloadAppUrl: "http://www.meijiabang.cn/1-",
    downloadAppDefaultSource: "402",
    apiTimeout: 30000,
    api: {
        default: "//api.meijiabang.cn/",
        cpma: "//api.manicurist.org.cn/",
        cdn: "//api-cdn.meijiabang.cn/",
        api2: "//api2.meijiabang.cn/",
        defaultStatic: "//static-api.meijiabang.cn/"
    },
    apiWechatPay: "http://meijialove.com/", //暂时添加微信支付域名
    wechatPaymentOrigin: '//api.meijiabang.cn/', //微信支付根域名
    wechatPaymentOriginS2: '//s2.meijiabang.cn/', //微信支付根域名s2
    mallPaymentUrl: "http://meijialove.com/init.php/home/payment/mall_go_pay",
    wechatAppId: "wx8dd9768db7127fdb", // 美甲帮服务号 appID
    //阿里云日志服务Tracking
    webTrackingDomainRegExp: /^(m(\d*|test)\.)?(meijialove\.com|meijiabang\.cn)$/i,
    webTrackingEndpoint: "cn-hangzhou.log.aliyuncs.com",
    webTrackingProject: "meijiabang-log",
    webTrackingLogstore: "web-tracking"
};

/* harmony default export */ __webpack_exports__["a"] = (Config);

/***/ }),
/* 77 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
Object.defineProperty(__webpack_exports__, "__esModule", { value: true });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__App_vue__ = __webpack_require__(78);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__App_vue___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_0__App_vue__);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__components__ = __webpack_require__(80);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2__modules__ = __webpack_require__(75);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_3__api__ = __webpack_require__(254);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_4__utils_web_web_tracker_js__ = __webpack_require__(72);







__WEBPACK_IMPORTED_MODULE_4__utils_web_web_tracker_js__["a" /* default */].startError();

Vue.use(__WEBPACK_IMPORTED_MODULE_1__components__["a" /* default */]);
Vue.use(__WEBPACK_IMPORTED_MODULE_2__modules__["default"]);
Vue.use(__WEBPACK_IMPORTED_MODULE_3__api__["a" /* default */]);

__WEBPACK_IMPORTED_MODULE_0__App_vue___default.a.el = '#root';

new Vue(__WEBPACK_IMPORTED_MODULE_0__App_vue___default.a);

/***/ }),
/* 78 */
/***/ (function(module, exports, __webpack_require__) {

var __vue_exports__, __vue_options__
var __vue_styles__ = []

/* template */
var __vue_template__ = __webpack_require__(79)
__vue_options__ = __vue_exports__ = __vue_exports__ || {}
if (
  typeof __vue_exports__.default === "object" ||
  typeof __vue_exports__.default === "function"
) {
__vue_options__ = __vue_exports__ = __vue_exports__.default
}
if (typeof __vue_options__ === "function") {
  __vue_options__ = __vue_options__.options
}

__vue_options__.render = __vue_template__.render
__vue_options__.staticRenderFns = __vue_template__.staticRenderFns
__vue_options__.style = __vue_options__.style || {}
__vue_styles__.forEach(function (module) {
  for (var name in module) {
    __vue_options__.style[name] = module[name]
  }
})
if (typeof __register_static_styles__ === "function") {
  __register_static_styles__(__vue_options__._scopeId, __vue_styles__)
}

module.exports = __vue_exports__


/***/ }),
/* 79 */
/***/ (function(module, exports) {

module.exports={render:function (){var _vm=this;var _h=_vm.$createElement;var _c=_vm._self._c||_h;
  return _c('app-container', {
    attrs: {
      "id": "XuIq3wTO",
      "title": '路由测试',
      "bgColor": '#f2f3f5',
      "titleConfig": [],
      "shareTitle": '',
      "shareText": '',
      "shareLink": 'https://m.meijiabang.cn/force/web/index.html?page=beb383d4c0e35924_45',
      "shareImage": '',
      "width": 0,
      "height": 0,
      "showStartTime": '2018-03-31T16:00:00.000Z',
      "showEndTime": ''
    }
  }, [_c('resource-niche-group', {
    attrs: {
      "id": "hVQ7VJyb",
      "itemStyle": 'A4',
      "imageList": [{
        'imageSrc': 'http://cdn3.meijiabang.cn/public/upload/common_image/2018/01/31/382626b985310e9a0331ec1f1be3a73698hHMv.png',
        'width': '344px',
        'height': '240px',
        'route': 'meijiabang://openurl_in_app?url=http%3A%2F%2Fm1.meijiabang.cn%2Findex.html%23%2Feducation%2Fteacher-profile%2F57&content_title=&content_business=%E5%95%86%E5%9F%8E&content_act=&content_tags='
      }, {
        'imageSrc': 'http://cdn3.meijiabang.cn/public/upload/obj_image/2018/03/22/6f8db243e739a111079bc8c9d2731f4a6m7yO6.jpg',
        'width': '900px',
        'height': '368px',
        'route': 'meijiabang://openurl_in_app?url=https%3A%2F%2Fm.meijiabang.cn&content_title=&content_business=%E5%95%86%E5%9F%8E&content_act=&content_tags='
      }, {
        'imageSrc': 'http://cdn3.meijiabang.cn/public/upload/obj_image/2018/04/13/7047e15b81293602eaeb47cfb7c8f35a8Ak448.PNG',
        'width': '750px',
        'height': '1334px',
        'route': 'meijiabang://home_recommend?tag=%e7%83%ad%e9%97%a8%e7%be%8e%e5%9b%be&subtag=%E6%9C%80%E7%83%AD&content_title=&content_business=%E5%95%86%E5%9F%8E&content_act=&content_tags='
      }, {
        'imageSrc': 'http://cdn3.meijiabang.cn/public/upload/obj_image/2018/04/13/e1824c191c2230a85b8b5f8ec39a199fN7Nbnb.jpg',
        'width': '200px',
        'height': '200px',
        'route': 'meijiabang://goods_list?title=%E5%8C%97%E6%AC%A7&attrs.basic_brand=6&content_title=&content_business=%E5%95%86%E5%9F%8E&content_act=&content_tags='
      }]
    }
  })], 1)
},staticRenderFns: []}

/***/ }),
/* 80 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
var context = __webpack_require__(81);

//去中心化组件管理
var components = function (c) {
  return c.keys().map(function (key) {
    return c(key).default;
  });
}(context);

/* harmony default export */ __webpack_exports__["a"] = ({
  install: function install(Vue) {
    components.map(function (component) {
      Vue.component(component.name, component);
    });
  }
});

/***/ }),
/* 81 */
/***/ (function(module, exports, __webpack_require__) {

var map = {
	"./anchor-item/index.js": 82,
	"./anchors/index.js": 87,
	"./app-container/index.js": 118,
	"./countdown/index.js": 149,
	"./coupons/index.js": 159,
	"./f-waterfall/index.js": 172,
	"./goods-item/index.js": 177,
	"./goods-list/index.js": 190,
	"./image-router/index.js": 200,
	"./login/index.js": 205,
	"./modal/index.js": 211,
	"./resource-niche-group/index.js": 216,
	"./weex-render/index.js": 242
};
function webpackContext(req) {
	return __webpack_require__(webpackContextResolve(req));
};
function webpackContextResolve(req) {
	var id = map[req];
	if(!(id + 1)) // check for number or string
		throw new Error("Cannot find module '" + req + "'.");
	return id;
};
webpackContext.keys = function webpackContextKeys() {
	return Object.keys(map);
};
webpackContext.resolve = webpackContextResolve;
module.exports = webpackContext;
webpackContext.id = 81;

/***/ }),
/* 82 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
Object.defineProperty(__webpack_exports__, "__esModule", { value: true });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__index_vue__ = __webpack_require__(83);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__index_vue___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_0__index_vue__);
/* harmony reexport (default from non-hamory) */ __webpack_require__.d(__webpack_exports__, "default", function() { return __WEBPACK_IMPORTED_MODULE_0__index_vue___default.a; });


/***/ }),
/* 83 */
/***/ (function(module, exports, __webpack_require__) {

var __vue_exports__, __vue_options__
var __vue_styles__ = []

/* styles */
__vue_styles__.push(__webpack_require__(84)
)

/* script */
__vue_exports__ = __webpack_require__(85)

/* template */
var __vue_template__ = __webpack_require__(86)
__vue_options__ = __vue_exports__ = __vue_exports__ || {}
if (
  typeof __vue_exports__.default === "object" ||
  typeof __vue_exports__.default === "function"
) {
__vue_options__ = __vue_exports__ = __vue_exports__.default
}
if (typeof __vue_options__ === "function") {
  __vue_options__ = __vue_options__.options
}

__vue_options__.render = __vue_template__.render
__vue_options__.staticRenderFns = __vue_template__.staticRenderFns
__vue_options__._scopeId = "data-v-4eede658"
__vue_options__.style = __vue_options__.style || {}
__vue_styles__.forEach(function (module) {
  for (var name in module) {
    __vue_options__.style[name] = module[name]
  }
})
if (typeof __register_static_styles__ === "function") {
  __register_static_styles__(__vue_options__._scopeId, __vue_styles__)
}

module.exports = __vue_exports__


/***/ }),
/* 84 */
/***/ (function(module, exports) {

module.exports = {
  "anchors-item": {
    "position": "relative",
    "zIndex": 0
  }
}

/***/ }),
/* 85 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
Object.defineProperty(__webpack_exports__, "__esModule", { value: true });
//
//
//
//
//
//

/* harmony default export */ __webpack_exports__["default"] = ({
    name: 'anchor-item',
    props: {
        beforeSrc: {
            type: String
        },
        afterSrc: {
            type: String
        },
        label: {
            type: String
        }
    },
    watch: {
        beforeSrc: function beforeSrc() {
            this.$parent.changeAttr();
        },
        afterSrc: function afterSrc() {
            this.$parent.changeAttr();
        }
    }
});

/***/ }),
/* 86 */
/***/ (function(module, exports) {

module.exports={render:function (){var _vm=this;var _h=_vm.$createElement;var _c=_vm._self._c||_h;
  return _c('div', {
    staticClass: ["anchors-item"]
  }, [_vm._t("default")], 2)
},staticRenderFns: []}

/***/ }),
/* 87 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
Object.defineProperty(__webpack_exports__, "__esModule", { value: true });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__index_vue__ = __webpack_require__(88);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__index_vue___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_0__index_vue__);
/* harmony reexport (default from non-hamory) */ __webpack_require__.d(__webpack_exports__, "default", function() { return __WEBPACK_IMPORTED_MODULE_0__index_vue___default.a; });


/***/ }),
/* 88 */
/***/ (function(module, exports, __webpack_require__) {

var __vue_exports__, __vue_options__
var __vue_styles__ = []

/* styles */
__vue_styles__.push(__webpack_require__(89)
)

/* script */
__vue_exports__ = __webpack_require__(90)

/* template */
var __vue_template__ = __webpack_require__(117)
__vue_options__ = __vue_exports__ = __vue_exports__ || {}
if (
  typeof __vue_exports__.default === "object" ||
  typeof __vue_exports__.default === "function"
) {
__vue_options__ = __vue_exports__ = __vue_exports__.default
}
if (typeof __vue_options__ === "function") {
  __vue_options__ = __vue_options__.options
}

__vue_options__.render = __vue_template__.render
__vue_options__.staticRenderFns = __vue_template__.staticRenderFns
__vue_options__._scopeId = "data-v-8aab666a"
__vue_options__.style = __vue_options__.style || {}
__vue_styles__.forEach(function (module) {
  for (var name in module) {
    __vue_options__.style[name] = module[name]
  }
})
if (typeof __register_static_styles__ === "function") {
  __register_static_styles__(__vue_options__._scopeId, __vue_styles__)
}

module.exports = __vue_exports__


/***/ }),
/* 89 */
/***/ (function(module, exports) {

module.exports = {
  "header-text": {
    "height": "80",
    "lineHeight": "80",
    "textAlign": "center",
    "fontSize": "28"
  },
  "anchors-header": {
    "position": "relative",
    "zIndex": 100
  },
  "on-sticky": {
    "paddingTop": "80"
  },
  "sticky": {
    "position": "fixed",
    "top": 0,
    "left": 0,
    "width": 100,
    "zIndex": 100
  },
  "header-unit": {
    "flexDirection": "row",
    "width": "750",
    "height": "80",
    "backgroundColor": "#ffffff"
  },
  "spec-sroller": {
    "position": "relative"
  },
  "scroller-box": {
    "height": "80"
  },
  "spec-scroller-box": {
    "position": "relative",
    "flexDirection": "row",
    "backgroundColor": "#ffffff"
  },
  "absolute-box": {
    "position": "absolute",
    "left": 0,
    "width": 100
  },
  "spec-scroller-box-text": {
    "width": "660",
    "height": "80",
    "lineHeight": "80",
    "paddingLeft": "30",
    "fontSize": "28"
  },
  "btn-box": {
    "position": "absolute",
    "top": 0,
    "right": 0,
    "justifyContent": "center",
    "alignItems": "center",
    "width": "90",
    "height": "80",
    "zIndex": 200
  },
  "anchors-main": {
    "position": "relative",
    "zIndex": 0
  },
  "hide": {
    "zIndex": 100,
    "opacity": 1
  }
}

/***/ }),
/* 90 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
Object.defineProperty(__webpack_exports__, "__esModule", { value: true });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0_babel_runtime_regenerator__ = __webpack_require__(12);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0_babel_runtime_regenerator___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_0_babel_runtime_regenerator__);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1_babel_runtime_helpers_asyncToGenerator__ = __webpack_require__(13);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1_babel_runtime_helpers_asyncToGenerator___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_1_babel_runtime_helpers_asyncToGenerator__);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2_babel_runtime_core_js_promise__ = __webpack_require__(14);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2_babel_runtime_core_js_promise___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_2_babel_runtime_core_js_promise__);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_3__anchor_lists_vue__ = __webpack_require__(112);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_3__anchor_lists_vue___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_3__anchor_lists_vue__);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_4__scroll_js__ = __webpack_require__(116);



//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//



// const dom = weex.requireModule('dom') //暂时废弃


var pushDom = function pushDom(item) {
	return new __WEBPACK_IMPORTED_MODULE_2_babel_runtime_core_js_promise___default.a(function (resolve, reject) {
		__WEBPACK_IMPORTED_MODULE_4__scroll_js__["a" /* default */].getComponentRect(item.elm, function (info) {
			resolve(info);
		});
	});
};

var numDescSort = function numDescSort(a, b) {
	return a - b;
};

/* harmony default export */ __webpack_exports__["default"] = ({
	name: 'anchors',
	props: {
		color: {
			type: String
		},
		model: {
			type: Number
		},
		type: {
			type: Number,
			default: function _default() {
				return 1;
			}
		}
	},
	watch: {
		color: function color(nv, ov) {
			this._color = nv;
		},
		type: function type() {
			this.headerList = [];
			this.boxes = [];
			this.reLists = [];
			this.getDom();
			this.setAttr();
		}
	},
	components: {
		anchorLists: __WEBPACK_IMPORTED_MODULE_3__anchor_lists_vue___default.a
	},
	data: function data() {
		return {
			scrolling: false,
			sticky: false,

			headerList: [],
			reLists: [], // 模式为展开式的时候初始显示在上层的四个
			lists: [],
			boxes: [],

			headWidth: '750px',
			width: '750px',

			showChoiceList: false, //展开式的时候点击按钮显示隐藏楼层

			disappear: '',
			appear: '',
			disappears: [],
			appears: [],

			_color: ''
		};
	},

	methods: {
		report: function report(index) {
			var evt = new Event('userTrack');
			evt.data = {
				action: '\u70B9\u51FB\u951A\u70B9\u5BFC\u822A' + (this.type === 1 ? '展开式' : '滑动式'), options: {
					location: 'L' + (index + 1)
				}
			};
			document.dispatchEvent(evt);
		},
		checkOverflow: function checkOverflow(length) {
			//展开式模式下面的宽度判断和显示问题
			if (length > 4) {
				this.width = 750 / 4 + 'px';
				this.headWidth = 750 / 4 + 'px';
				return true;
			}

			this.headWidth = 750 / length + 'px';
			return false;
		},
		countWidth: function countWidth(length) {
			// 根据传入的锚点数组长度计算导航单元长度
			switch (length) {
				case 1:
					return '750px';

				case 2:
					return 750 / 2 + 'px';

				case 3:
					return 750 / 3 + 'px';

				default:
					return 750 / 4 + 'px';
			}
		},
		setSpecAttr: function setSpecAttr(length) {
			// 为展开式的时候的属性设置
			var flag = this.checkOverflow(length);
			if (flag) {
				// 未展开的导航条，显示4个 展开的时候每行3个
				this.reLists = this.headerList;

				if (length % 4 === 0 && length >= 4) {
					for (var i = 0; i < this.headerList.length; i += 4) {
						this.boxes.push(this.headerList.slice(i, i + 4));
					}
				} else if (length % 4 !== 0 && length >= 4) {
					var rem = length % 4;
					for (var _i = 0; _i < this.headerList.length - rem; _i += 4) {
						this.boxes.push(this.headerList.slice(_i, _i + 4));
					}

					this.boxes.push(this.headerList.slice(length - rem, length));
				}
			} else {
				this.reLists = this.headerList;
			}
		},
		setAttr: function setAttr() {
			// 初始化设置数组对象和宽度等
			var len = this.headerList.length;
			if (this.headerList.length < 1) return;
			this.headerList.forEach(function (item) {
				return item.src = item.before_src;
			});
			// this.headerList[0].src = this.headerList[0].after_src
			this.width = this.countWidth(len, this.type);

			if (parseInt(this.type) === 2) {
				this.lists = this.headerList;
				return;
			}

			this.setSpecAttr(len);
		},
		changeAttr: function changeAttr() {
			//来自slot的变化通知
			this.headerList = [];
			this.boxes = [];
			this.reLists = [];
			this.getDom();
			this.setAttr();
		},
		getDom: function getDom() {
			var _this = this;

			// 获取到锚点的dom节点
			this.domList = [];
			this.headerList = [];
			this.$slots.default.forEach(function (item, index) {
				if (item.tag && item.componentOptions.propsData) {
					_this.headerList.push({
						before_src: item.componentOptions.propsData.beforeSrc,
						after_src: item.componentOptions.propsData.afterSrc,
						label: item.componentOptions.propsData.label
					});
					_this.domList.push(item);
				}
			});
		},
		choiceHandle: function choiceHandle() {
			this.showChoiceList = !this.showChoiceList;
			var label = this.label;
			this.checkHeader(label);
		},
		checkHeader: function checkHeader(label) {
			var _this2 = this;

			if (parseInt(this.type) === 2) {
				this.headerList.forEach(function (item, index) {
					item.src = item.before_src;
					if (item.label === label) {
						item.src = item.after_src;
						_this2.$set(_this2.headerList, index, item);
					}
				});
			}

			if (parseInt(this.type) === 1 && !this.showChoiceList) {
				this.reLists.forEach(function (item, index) {
					item.src = item.before_src;
					_this2.$set(_this2.reLists, index, item);
					if (item.label === label) {
						item.src = item.after_src;
						_this2.$set(_this2.reLists, index, item);
					}
				});
			} else if (parseInt(this.type) === 1 && this.showChoiceList) {
				this.boxes.forEach(function (item, index) {
					item.forEach(function (_item, _index) {
						_item.src = _item.before_src;
						_this2.$set(item, _index, _item);
						if (_item.label === label) {
							_item.src = _item.after_src;
							_this2.$set(item, _index, _item);
						}
					});
				});
			}
		},
		resetClass: function resetClass() {
			var _this3 = this;

			// 补sticky层级混乱的坑，辣鸡weex harveyguo@meijiabang.cn
			this.scrolling = !this.scrolling;
			setInterval(function () {
				_this3.scrolling = !_this3.scrolling;
			}, 300);
		},
		skip: function skip(label) {
			var _this4 = this;

			return __WEBPACK_IMPORTED_MODULE_1_babel_runtime_helpers_asyncToGenerator___default()( /*#__PURE__*/__WEBPACK_IMPORTED_MODULE_0_babel_runtime_regenerator___default.a.mark(function _callee() {
				var domUnit, realDom, root, el;
				return __WEBPACK_IMPORTED_MODULE_0_babel_runtime_regenerator___default.a.wrap(function _callee$(_context) {
					while (1) {
						switch (_context.prev = _context.next) {
							case 0:
								// 锚点滚动至dom节点
								// this.resetClass()
								_this4.showChoiceList = false; //选中之后隐藏展示框
								_this4.label = label;
								_this4.checkHeader(label);
								domUnit = _this4.domList.filter(function (item) {
									return item.componentOptions.propsData.label === label;
								});

								if (!domUnit[0]) {
									_context.next = 14;
									break;
								}

								realDom = domUnit[0].elm;
								root = _this4.$root.$el;

								if (weex.config.env.deviceModel === 'unknown') root = _this4.$parent.$el;
								el = _this4.$el;


								_this4.userClick = true; //标记为用户点击触发
								_context.next = 12;
								return __WEBPACK_IMPORTED_MODULE_4__scroll_js__["a" /* default */].scrollToElement(realDom, { root: root, el: el });

							case 12:
								setTimeout(function () {
									_this4.headerScroll(label);
									_this4.userClick = false; //延迟300毫秒，目的是这个事件内用户滚动不做锚点定位
								}, 300);

								return _context.abrupt('return');

							case 14:
							case 'end':
								return _context.stop();
						}
					}
				}, _callee, _this4);
			}))();
		},
		listenScroll: function listenScroll() {
			var _this5 = this;

			return __WEBPACK_IMPORTED_MODULE_1_babel_runtime_helpers_asyncToGenerator___default()( /*#__PURE__*/__WEBPACK_IMPORTED_MODULE_0_babel_runtime_regenerator___default.a.mark(function _callee2() {
				var ref, root, el;
				return __WEBPACK_IMPORTED_MODULE_0_babel_runtime_regenerator___default.a.wrap(function _callee2$(_context2) {
					while (1) {
						switch (_context2.prev = _context2.next) {
							case 0:
								//页面开始监听滚动
								ref = _this5.$refs.header;
								root = _this5.$root.$el; //scroller作为根节点时需要，现在改为div为根节点，去weex化

								if (weex.config.env.deviceModel === 'unknown') root = _this5.$parent.$el;
								el = _this5.$el;


								document.addEventListener('scroll', function () {
									var topList = _this5.domList.map(function (item) {
										return el.offsetTop + item.elm.offsetTop;
									}); //构建锚点内容滚动高度数组

									if (_this5.showChoiceList) {
										_this5.showChoiceList = false;
									}
									var top = document.body.scrollTop || document.documentElement.scrollTop;

									if (top >= el.offsetTop && el.offsetHeight + el.offsetTop > top) {
										_this5.sticky = true;
									}
									if (top <= el.offsetTop) {
										_this5.sticky = false;
									}
									if (el.offsetHeight + el.offsetTop <= top) {
										_this5.sticky = false;
									}

									topList.push(top);
									topList.sort(numDescSort); // 正序排序，查找当前高度的位置
									var topIndex = topList.findIndex(function (item) {
										return item === top;
									}) - 1;
									if (topIndex === -1) return;
									var label = _this5.domList[topIndex] && _this5.domList[topIndex].componentOptions && _this5.domList[topIndex].componentOptions.propsData ? _this5.domList[topIndex].componentOptions.propsData.label : '';
									if (_this5.userClick) return;
									_this5.label = label;
									_this5.headerScroll(label);
									_this5.checkHeader(label);
								});

							case 5:
							case 'end':
								return _context2.stop();
						}
					}
				}, _callee2, _this5);
			}))();
		},
		headerScroll: function headerScroll(label) {
			var header = parseInt(this.type) === 1 ? this.$refs.scrollerA : this.$refs.scrollerB;
			var headerList = parseInt(this.type) === 1 ? this.reLists : this.lists;
			var length = headerList.length;
			var width = (parseInt(this.type) === 1 ? this.headWidth : this.width).replace(/px/g, '');
			width = parseInt(width);

			var index = headerList.findIndex(function (item) {
				return item.label === label;
			});
			if (headerList.length > 4 && index >= 4) {
				var left = index * width;
				left > (length - 1) * width ? left = (length - 1) * width : '';

				var refLeft = header.$el.scrollLeft;
				header.$el.scrollLeft = left;
			} else {
				var _refLeft = header.$el.scrollLeft;
				if (_refLeft === 0) return;
				header.$el.scrollLeft = 0;
			}
		}
	},
	created: function created() {
		this.getDom();
		this.setAttr();
	},
	mounted: function mounted() {
		var _this6 = this;

		this.listenScroll();
		var MutationObserver = window.MutationObserver || window.WebKitMutationObserver || window.MozMutationObserver;
		var target = this.$refs.slot;

		var config = { attributes: true, childList: true, characterData: true };
		var observer = new MutationObserver(function (mutations) {
			_this6.headerList = [];
			_this6.boxes = [];
			_this6.reLists = [];
			_this6.getDom();
			_this6.setAttr();
		});

		observer.observe(target, config);
		// this.resetClass() //十分重要！！！如要你要让锚点导航能用的话！！

		this._color = this.color;

		console.log('anchor over');
	}
});

/***/ }),
/* 91 */
/***/ (function(module, exports, __webpack_require__) {

/**
 * Copyright (c) 2014-present, Facebook, Inc.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 */

// This method of obtaining a reference to the global object needs to be
// kept identical to the way it is obtained in runtime.js
var g = (function() { return this })() || Function("return this")();

// Use `getOwnPropertyNames` because not all browsers support calling
// `hasOwnProperty` on the global `self` object in a worker. See #183.
var hadRuntime = g.regeneratorRuntime &&
  Object.getOwnPropertyNames(g).indexOf("regeneratorRuntime") >= 0;

// Save the old regeneratorRuntime in case it needs to be restored later.
var oldRuntime = hadRuntime && g.regeneratorRuntime;

// Force reevalutation of runtime.js.
g.regeneratorRuntime = undefined;

module.exports = __webpack_require__(92);

if (hadRuntime) {
  // Restore the original runtime.
  g.regeneratorRuntime = oldRuntime;
} else {
  // Remove the global property added by runtime.js.
  try {
    delete g.regeneratorRuntime;
  } catch(e) {
    g.regeneratorRuntime = undefined;
  }
}


/***/ }),
/* 92 */
/***/ (function(module, exports) {

/**
 * Copyright (c) 2014-present, Facebook, Inc.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 */

!(function(global) {
  "use strict";

  var Op = Object.prototype;
  var hasOwn = Op.hasOwnProperty;
  var undefined; // More compressible than void 0.
  var $Symbol = typeof Symbol === "function" ? Symbol : {};
  var iteratorSymbol = $Symbol.iterator || "@@iterator";
  var asyncIteratorSymbol = $Symbol.asyncIterator || "@@asyncIterator";
  var toStringTagSymbol = $Symbol.toStringTag || "@@toStringTag";

  var inModule = typeof module === "object";
  var runtime = global.regeneratorRuntime;
  if (runtime) {
    if (inModule) {
      // If regeneratorRuntime is defined globally and we're in a module,
      // make the exports object identical to regeneratorRuntime.
      module.exports = runtime;
    }
    // Don't bother evaluating the rest of this file if the runtime was
    // already defined globally.
    return;
  }

  // Define the runtime globally (as expected by generated code) as either
  // module.exports (if we're in a module) or a new, empty object.
  runtime = global.regeneratorRuntime = inModule ? module.exports : {};

  function wrap(innerFn, outerFn, self, tryLocsList) {
    // If outerFn provided and outerFn.prototype is a Generator, then outerFn.prototype instanceof Generator.
    var protoGenerator = outerFn && outerFn.prototype instanceof Generator ? outerFn : Generator;
    var generator = Object.create(protoGenerator.prototype);
    var context = new Context(tryLocsList || []);

    // The ._invoke method unifies the implementations of the .next,
    // .throw, and .return methods.
    generator._invoke = makeInvokeMethod(innerFn, self, context);

    return generator;
  }
  runtime.wrap = wrap;

  // Try/catch helper to minimize deoptimizations. Returns a completion
  // record like context.tryEntries[i].completion. This interface could
  // have been (and was previously) designed to take a closure to be
  // invoked without arguments, but in all the cases we care about we
  // already have an existing method we want to call, so there's no need
  // to create a new function object. We can even get away with assuming
  // the method takes exactly one argument, since that happens to be true
  // in every case, so we don't have to touch the arguments object. The
  // only additional allocation required is the completion record, which
  // has a stable shape and so hopefully should be cheap to allocate.
  function tryCatch(fn, obj, arg) {
    try {
      return { type: "normal", arg: fn.call(obj, arg) };
    } catch (err) {
      return { type: "throw", arg: err };
    }
  }

  var GenStateSuspendedStart = "suspendedStart";
  var GenStateSuspendedYield = "suspendedYield";
  var GenStateExecuting = "executing";
  var GenStateCompleted = "completed";

  // Returning this object from the innerFn has the same effect as
  // breaking out of the dispatch switch statement.
  var ContinueSentinel = {};

  // Dummy constructor functions that we use as the .constructor and
  // .constructor.prototype properties for functions that return Generator
  // objects. For full spec compliance, you may wish to configure your
  // minifier not to mangle the names of these two functions.
  function Generator() {}
  function GeneratorFunction() {}
  function GeneratorFunctionPrototype() {}

  // This is a polyfill for %IteratorPrototype% for environments that
  // don't natively support it.
  var IteratorPrototype = {};
  IteratorPrototype[iteratorSymbol] = function () {
    return this;
  };

  var getProto = Object.getPrototypeOf;
  var NativeIteratorPrototype = getProto && getProto(getProto(values([])));
  if (NativeIteratorPrototype &&
      NativeIteratorPrototype !== Op &&
      hasOwn.call(NativeIteratorPrototype, iteratorSymbol)) {
    // This environment has a native %IteratorPrototype%; use it instead
    // of the polyfill.
    IteratorPrototype = NativeIteratorPrototype;
  }

  var Gp = GeneratorFunctionPrototype.prototype =
    Generator.prototype = Object.create(IteratorPrototype);
  GeneratorFunction.prototype = Gp.constructor = GeneratorFunctionPrototype;
  GeneratorFunctionPrototype.constructor = GeneratorFunction;
  GeneratorFunctionPrototype[toStringTagSymbol] =
    GeneratorFunction.displayName = "GeneratorFunction";

  // Helper for defining the .next, .throw, and .return methods of the
  // Iterator interface in terms of a single ._invoke method.
  function defineIteratorMethods(prototype) {
    ["next", "throw", "return"].forEach(function(method) {
      prototype[method] = function(arg) {
        return this._invoke(method, arg);
      };
    });
  }

  runtime.isGeneratorFunction = function(genFun) {
    var ctor = typeof genFun === "function" && genFun.constructor;
    return ctor
      ? ctor === GeneratorFunction ||
        // For the native GeneratorFunction constructor, the best we can
        // do is to check its .name property.
        (ctor.displayName || ctor.name) === "GeneratorFunction"
      : false;
  };

  runtime.mark = function(genFun) {
    if (Object.setPrototypeOf) {
      Object.setPrototypeOf(genFun, GeneratorFunctionPrototype);
    } else {
      genFun.__proto__ = GeneratorFunctionPrototype;
      if (!(toStringTagSymbol in genFun)) {
        genFun[toStringTagSymbol] = "GeneratorFunction";
      }
    }
    genFun.prototype = Object.create(Gp);
    return genFun;
  };

  // Within the body of any async function, `await x` is transformed to
  // `yield regeneratorRuntime.awrap(x)`, so that the runtime can test
  // `hasOwn.call(value, "__await")` to determine if the yielded value is
  // meant to be awaited.
  runtime.awrap = function(arg) {
    return { __await: arg };
  };

  function AsyncIterator(generator) {
    function invoke(method, arg, resolve, reject) {
      var record = tryCatch(generator[method], generator, arg);
      if (record.type === "throw") {
        reject(record.arg);
      } else {
        var result = record.arg;
        var value = result.value;
        if (value &&
            typeof value === "object" &&
            hasOwn.call(value, "__await")) {
          return Promise.resolve(value.__await).then(function(value) {
            invoke("next", value, resolve, reject);
          }, function(err) {
            invoke("throw", err, resolve, reject);
          });
        }

        return Promise.resolve(value).then(function(unwrapped) {
          // When a yielded Promise is resolved, its final value becomes
          // the .value of the Promise<{value,done}> result for the
          // current iteration. If the Promise is rejected, however, the
          // result for this iteration will be rejected with the same
          // reason. Note that rejections of yielded Promises are not
          // thrown back into the generator function, as is the case
          // when an awaited Promise is rejected. This difference in
          // behavior between yield and await is important, because it
          // allows the consumer to decide what to do with the yielded
          // rejection (swallow it and continue, manually .throw it back
          // into the generator, abandon iteration, whatever). With
          // await, by contrast, there is no opportunity to examine the
          // rejection reason outside the generator function, so the
          // only option is to throw it from the await expression, and
          // let the generator function handle the exception.
          result.value = unwrapped;
          resolve(result);
        }, reject);
      }
    }

    var previousPromise;

    function enqueue(method, arg) {
      function callInvokeWithMethodAndArg() {
        return new Promise(function(resolve, reject) {
          invoke(method, arg, resolve, reject);
        });
      }

      return previousPromise =
        // If enqueue has been called before, then we want to wait until
        // all previous Promises have been resolved before calling invoke,
        // so that results are always delivered in the correct order. If
        // enqueue has not been called before, then it is important to
        // call invoke immediately, without waiting on a callback to fire,
        // so that the async generator function has the opportunity to do
        // any necessary setup in a predictable way. This predictability
        // is why the Promise constructor synchronously invokes its
        // executor callback, and why async functions synchronously
        // execute code before the first await. Since we implement simple
        // async functions in terms of async generators, it is especially
        // important to get this right, even though it requires care.
        previousPromise ? previousPromise.then(
          callInvokeWithMethodAndArg,
          // Avoid propagating failures to Promises returned by later
          // invocations of the iterator.
          callInvokeWithMethodAndArg
        ) : callInvokeWithMethodAndArg();
    }

    // Define the unified helper method that is used to implement .next,
    // .throw, and .return (see defineIteratorMethods).
    this._invoke = enqueue;
  }

  defineIteratorMethods(AsyncIterator.prototype);
  AsyncIterator.prototype[asyncIteratorSymbol] = function () {
    return this;
  };
  runtime.AsyncIterator = AsyncIterator;

  // Note that simple async functions are implemented on top of
  // AsyncIterator objects; they just return a Promise for the value of
  // the final result produced by the iterator.
  runtime.async = function(innerFn, outerFn, self, tryLocsList) {
    var iter = new AsyncIterator(
      wrap(innerFn, outerFn, self, tryLocsList)
    );

    return runtime.isGeneratorFunction(outerFn)
      ? iter // If outerFn is a generator, return the full iterator.
      : iter.next().then(function(result) {
          return result.done ? result.value : iter.next();
        });
  };

  function makeInvokeMethod(innerFn, self, context) {
    var state = GenStateSuspendedStart;

    return function invoke(method, arg) {
      if (state === GenStateExecuting) {
        throw new Error("Generator is already running");
      }

      if (state === GenStateCompleted) {
        if (method === "throw") {
          throw arg;
        }

        // Be forgiving, per 25.3.3.3.3 of the spec:
        // https://people.mozilla.org/~jorendorff/es6-draft.html#sec-generatorresume
        return doneResult();
      }

      context.method = method;
      context.arg = arg;

      while (true) {
        var delegate = context.delegate;
        if (delegate) {
          var delegateResult = maybeInvokeDelegate(delegate, context);
          if (delegateResult) {
            if (delegateResult === ContinueSentinel) continue;
            return delegateResult;
          }
        }

        if (context.method === "next") {
          // Setting context._sent for legacy support of Babel's
          // function.sent implementation.
          context.sent = context._sent = context.arg;

        } else if (context.method === "throw") {
          if (state === GenStateSuspendedStart) {
            state = GenStateCompleted;
            throw context.arg;
          }

          context.dispatchException(context.arg);

        } else if (context.method === "return") {
          context.abrupt("return", context.arg);
        }

        state = GenStateExecuting;

        var record = tryCatch(innerFn, self, context);
        if (record.type === "normal") {
          // If an exception is thrown from innerFn, we leave state ===
          // GenStateExecuting and loop back for another invocation.
          state = context.done
            ? GenStateCompleted
            : GenStateSuspendedYield;

          if (record.arg === ContinueSentinel) {
            continue;
          }

          return {
            value: record.arg,
            done: context.done
          };

        } else if (record.type === "throw") {
          state = GenStateCompleted;
          // Dispatch the exception by looping back around to the
          // context.dispatchException(context.arg) call above.
          context.method = "throw";
          context.arg = record.arg;
        }
      }
    };
  }

  // Call delegate.iterator[context.method](context.arg) and handle the
  // result, either by returning a { value, done } result from the
  // delegate iterator, or by modifying context.method and context.arg,
  // setting context.delegate to null, and returning the ContinueSentinel.
  function maybeInvokeDelegate(delegate, context) {
    var method = delegate.iterator[context.method];
    if (method === undefined) {
      // A .throw or .return when the delegate iterator has no .throw
      // method always terminates the yield* loop.
      context.delegate = null;

      if (context.method === "throw") {
        if (delegate.iterator.return) {
          // If the delegate iterator has a return method, give it a
          // chance to clean up.
          context.method = "return";
          context.arg = undefined;
          maybeInvokeDelegate(delegate, context);

          if (context.method === "throw") {
            // If maybeInvokeDelegate(context) changed context.method from
            // "return" to "throw", let that override the TypeError below.
            return ContinueSentinel;
          }
        }

        context.method = "throw";
        context.arg = new TypeError(
          "The iterator does not provide a 'throw' method");
      }

      return ContinueSentinel;
    }

    var record = tryCatch(method, delegate.iterator, context.arg);

    if (record.type === "throw") {
      context.method = "throw";
      context.arg = record.arg;
      context.delegate = null;
      return ContinueSentinel;
    }

    var info = record.arg;

    if (! info) {
      context.method = "throw";
      context.arg = new TypeError("iterator result is not an object");
      context.delegate = null;
      return ContinueSentinel;
    }

    if (info.done) {
      // Assign the result of the finished delegate to the temporary
      // variable specified by delegate.resultName (see delegateYield).
      context[delegate.resultName] = info.value;

      // Resume execution at the desired location (see delegateYield).
      context.next = delegate.nextLoc;

      // If context.method was "throw" but the delegate handled the
      // exception, let the outer generator proceed normally. If
      // context.method was "next", forget context.arg since it has been
      // "consumed" by the delegate iterator. If context.method was
      // "return", allow the original .return call to continue in the
      // outer generator.
      if (context.method !== "return") {
        context.method = "next";
        context.arg = undefined;
      }

    } else {
      // Re-yield the result returned by the delegate method.
      return info;
    }

    // The delegate iterator is finished, so forget it and continue with
    // the outer generator.
    context.delegate = null;
    return ContinueSentinel;
  }

  // Define Generator.prototype.{next,throw,return} in terms of the
  // unified ._invoke helper method.
  defineIteratorMethods(Gp);

  Gp[toStringTagSymbol] = "Generator";

  // A Generator should always return itself as the iterator object when the
  // @@iterator function is called on it. Some browsers' implementations of the
  // iterator prototype chain incorrectly implement this, causing the Generator
  // object to not be returned from this call. This ensures that doesn't happen.
  // See https://github.com/facebook/regenerator/issues/274 for more details.
  Gp[iteratorSymbol] = function() {
    return this;
  };

  Gp.toString = function() {
    return "[object Generator]";
  };

  function pushTryEntry(locs) {
    var entry = { tryLoc: locs[0] };

    if (1 in locs) {
      entry.catchLoc = locs[1];
    }

    if (2 in locs) {
      entry.finallyLoc = locs[2];
      entry.afterLoc = locs[3];
    }

    this.tryEntries.push(entry);
  }

  function resetTryEntry(entry) {
    var record = entry.completion || {};
    record.type = "normal";
    delete record.arg;
    entry.completion = record;
  }

  function Context(tryLocsList) {
    // The root entry object (effectively a try statement without a catch
    // or a finally block) gives us a place to store values thrown from
    // locations where there is no enclosing try statement.
    this.tryEntries = [{ tryLoc: "root" }];
    tryLocsList.forEach(pushTryEntry, this);
    this.reset(true);
  }

  runtime.keys = function(object) {
    var keys = [];
    for (var key in object) {
      keys.push(key);
    }
    keys.reverse();

    // Rather than returning an object with a next method, we keep
    // things simple and return the next function itself.
    return function next() {
      while (keys.length) {
        var key = keys.pop();
        if (key in object) {
          next.value = key;
          next.done = false;
          return next;
        }
      }

      // To avoid creating an additional object, we just hang the .value
      // and .done properties off the next function object itself. This
      // also ensures that the minifier will not anonymize the function.
      next.done = true;
      return next;
    };
  };

  function values(iterable) {
    if (iterable) {
      var iteratorMethod = iterable[iteratorSymbol];
      if (iteratorMethod) {
        return iteratorMethod.call(iterable);
      }

      if (typeof iterable.next === "function") {
        return iterable;
      }

      if (!isNaN(iterable.length)) {
        var i = -1, next = function next() {
          while (++i < iterable.length) {
            if (hasOwn.call(iterable, i)) {
              next.value = iterable[i];
              next.done = false;
              return next;
            }
          }

          next.value = undefined;
          next.done = true;

          return next;
        };

        return next.next = next;
      }
    }

    // Return an iterator with no values.
    return { next: doneResult };
  }
  runtime.values = values;

  function doneResult() {
    return { value: undefined, done: true };
  }

  Context.prototype = {
    constructor: Context,

    reset: function(skipTempReset) {
      this.prev = 0;
      this.next = 0;
      // Resetting context._sent for legacy support of Babel's
      // function.sent implementation.
      this.sent = this._sent = undefined;
      this.done = false;
      this.delegate = null;

      this.method = "next";
      this.arg = undefined;

      this.tryEntries.forEach(resetTryEntry);

      if (!skipTempReset) {
        for (var name in this) {
          // Not sure about the optimal order of these conditions:
          if (name.charAt(0) === "t" &&
              hasOwn.call(this, name) &&
              !isNaN(+name.slice(1))) {
            this[name] = undefined;
          }
        }
      }
    },

    stop: function() {
      this.done = true;

      var rootEntry = this.tryEntries[0];
      var rootRecord = rootEntry.completion;
      if (rootRecord.type === "throw") {
        throw rootRecord.arg;
      }

      return this.rval;
    },

    dispatchException: function(exception) {
      if (this.done) {
        throw exception;
      }

      var context = this;
      function handle(loc, caught) {
        record.type = "throw";
        record.arg = exception;
        context.next = loc;

        if (caught) {
          // If the dispatched exception was caught by a catch block,
          // then let that catch block handle the exception normally.
          context.method = "next";
          context.arg = undefined;
        }

        return !! caught;
      }

      for (var i = this.tryEntries.length - 1; i >= 0; --i) {
        var entry = this.tryEntries[i];
        var record = entry.completion;

        if (entry.tryLoc === "root") {
          // Exception thrown outside of any try block that could handle
          // it, so set the completion value of the entire function to
          // throw the exception.
          return handle("end");
        }

        if (entry.tryLoc <= this.prev) {
          var hasCatch = hasOwn.call(entry, "catchLoc");
          var hasFinally = hasOwn.call(entry, "finallyLoc");

          if (hasCatch && hasFinally) {
            if (this.prev < entry.catchLoc) {
              return handle(entry.catchLoc, true);
            } else if (this.prev < entry.finallyLoc) {
              return handle(entry.finallyLoc);
            }

          } else if (hasCatch) {
            if (this.prev < entry.catchLoc) {
              return handle(entry.catchLoc, true);
            }

          } else if (hasFinally) {
            if (this.prev < entry.finallyLoc) {
              return handle(entry.finallyLoc);
            }

          } else {
            throw new Error("try statement without catch or finally");
          }
        }
      }
    },

    abrupt: function(type, arg) {
      for (var i = this.tryEntries.length - 1; i >= 0; --i) {
        var entry = this.tryEntries[i];
        if (entry.tryLoc <= this.prev &&
            hasOwn.call(entry, "finallyLoc") &&
            this.prev < entry.finallyLoc) {
          var finallyEntry = entry;
          break;
        }
      }

      if (finallyEntry &&
          (type === "break" ||
           type === "continue") &&
          finallyEntry.tryLoc <= arg &&
          arg <= finallyEntry.finallyLoc) {
        // Ignore the finally entry if control is not jumping to a
        // location outside the try/catch block.
        finallyEntry = null;
      }

      var record = finallyEntry ? finallyEntry.completion : {};
      record.type = type;
      record.arg = arg;

      if (finallyEntry) {
        this.method = "next";
        this.next = finallyEntry.finallyLoc;
        return ContinueSentinel;
      }

      return this.complete(record);
    },

    complete: function(record, afterLoc) {
      if (record.type === "throw") {
        throw record.arg;
      }

      if (record.type === "break" ||
          record.type === "continue") {
        this.next = record.arg;
      } else if (record.type === "return") {
        this.rval = this.arg = record.arg;
        this.method = "return";
        this.next = "end";
      } else if (record.type === "normal" && afterLoc) {
        this.next = afterLoc;
      }

      return ContinueSentinel;
    },

    finish: function(finallyLoc) {
      for (var i = this.tryEntries.length - 1; i >= 0; --i) {
        var entry = this.tryEntries[i];
        if (entry.finallyLoc === finallyLoc) {
          this.complete(entry.completion, entry.afterLoc);
          resetTryEntry(entry);
          return ContinueSentinel;
        }
      }
    },

    "catch": function(tryLoc) {
      for (var i = this.tryEntries.length - 1; i >= 0; --i) {
        var entry = this.tryEntries[i];
        if (entry.tryLoc === tryLoc) {
          var record = entry.completion;
          if (record.type === "throw") {
            var thrown = record.arg;
            resetTryEntry(entry);
          }
          return thrown;
        }
      }

      // The context.catch method must only be called with a location
      // argument that corresponds to a known catch block.
      throw new Error("illegal catch attempt");
    },

    delegateYield: function(iterable, resultName, nextLoc) {
      this.delegate = {
        iterator: values(iterable),
        resultName: resultName,
        nextLoc: nextLoc
      };

      if (this.method === "next") {
        // Deliberately forget the last sent value so that we don't
        // accidentally pass it on to the delegate.
        this.arg = undefined;
      }

      return ContinueSentinel;
    }
  };
})(
  // In sloppy mode, unbound `this` refers to the global object, fallback to
  // Function constructor if we're in global strict mode. That is sadly a form
  // of indirect eval which violates Content Security Policy.
  (function() { return this })() || Function("return this")()
);


/***/ }),
/* 93 */
/***/ (function(module, exports, __webpack_require__) {

__webpack_require__(48);
__webpack_require__(31);
__webpack_require__(56);
__webpack_require__(103);
__webpack_require__(110);
__webpack_require__(111);
module.exports = __webpack_require__(0).Promise;


/***/ }),
/* 94 */
/***/ (function(module, exports, __webpack_require__) {

var toInteger = __webpack_require__(32);
var defined = __webpack_require__(33);
// true  -> String#at
// false -> String#codePointAt
module.exports = function (TO_STRING) {
  return function (that, pos) {
    var s = String(defined(that));
    var i = toInteger(pos);
    var l = s.length;
    var a, b;
    if (i < 0 || i >= l) return TO_STRING ? '' : undefined;
    a = s.charCodeAt(i);
    return a < 0xd800 || a > 0xdbff || i + 1 === l || (b = s.charCodeAt(i + 1)) < 0xdc00 || b > 0xdfff
      ? TO_STRING ? s.charAt(i) : a
      : TO_STRING ? s.slice(i, i + 2) : (a - 0xd800 << 10) + (b - 0xdc00) + 0x10000;
  };
};


/***/ }),
/* 95 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

var create = __webpack_require__(52);
var descriptor = __webpack_require__(19);
var setToStringTag = __webpack_require__(26);
var IteratorPrototype = {};

// 25.1.2.1.1 %IteratorPrototype%[@@iterator]()
__webpack_require__(7)(IteratorPrototype, __webpack_require__(2)('iterator'), function () { return this; });

module.exports = function (Constructor, NAME, next) {
  Constructor.prototype = create(IteratorPrototype, { next: descriptor(1, next) });
  setToStringTag(Constructor, NAME + ' Iterator');
};


/***/ }),
/* 96 */
/***/ (function(module, exports, __webpack_require__) {

var dP = __webpack_require__(4);
var anObject = __webpack_require__(5);
var getKeys = __webpack_require__(21);

module.exports = __webpack_require__(6) ? Object.defineProperties : function defineProperties(O, Properties) {
  anObject(O);
  var keys = getKeys(Properties);
  var length = keys.length;
  var i = 0;
  var P;
  while (length > i) dP.f(O, P = keys[i++], Properties[P]);
  return O;
};


/***/ }),
/* 97 */
/***/ (function(module, exports, __webpack_require__) {

// false -> Array#indexOf
// true  -> Array#includes
var toIObject = __webpack_require__(16);
var toLength = __webpack_require__(36);
var toAbsoluteIndex = __webpack_require__(98);
module.exports = function (IS_INCLUDES) {
  return function ($this, el, fromIndex) {
    var O = toIObject($this);
    var length = toLength(O.length);
    var index = toAbsoluteIndex(fromIndex, length);
    var value;
    // Array#includes uses SameValueZero equality algorithm
    // eslint-disable-next-line no-self-compare
    if (IS_INCLUDES && el != el) while (length > index) {
      value = O[index++];
      // eslint-disable-next-line no-self-compare
      if (value != value) return true;
    // Array#indexOf ignores holes, Array#includes - not
    } else for (;length > index; index++) if (IS_INCLUDES || index in O) {
      if (O[index] === el) return IS_INCLUDES || index || 0;
    } return !IS_INCLUDES && -1;
  };
};


/***/ }),
/* 98 */
/***/ (function(module, exports, __webpack_require__) {

var toInteger = __webpack_require__(32);
var max = Math.max;
var min = Math.min;
module.exports = function (index, length) {
  index = toInteger(index);
  return index < 0 ? max(index + length, 0) : min(index, length);
};


/***/ }),
/* 99 */
/***/ (function(module, exports, __webpack_require__) {

// 19.1.2.9 / 15.2.3.2 Object.getPrototypeOf(O)
var has = __webpack_require__(9);
var toObject = __webpack_require__(27);
var IE_PROTO = __webpack_require__(37)('IE_PROTO');
var ObjectProto = Object.prototype;

module.exports = Object.getPrototypeOf || function (O) {
  O = toObject(O);
  if (has(O, IE_PROTO)) return O[IE_PROTO];
  if (typeof O.constructor == 'function' && O instanceof O.constructor) {
    return O.constructor.prototype;
  } return O instanceof Object ? ObjectProto : null;
};


/***/ }),
/* 100 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

var addToUnscopables = __webpack_require__(101);
var step = __webpack_require__(102);
var Iterators = __webpack_require__(20);
var toIObject = __webpack_require__(16);

// 22.1.3.4 Array.prototype.entries()
// 22.1.3.13 Array.prototype.keys()
// 22.1.3.29 Array.prototype.values()
// 22.1.3.30 Array.prototype[@@iterator]()
module.exports = __webpack_require__(49)(Array, 'Array', function (iterated, kind) {
  this._t = toIObject(iterated); // target
  this._i = 0;                   // next index
  this._k = kind;                // kind
// 22.1.5.2.1 %ArrayIteratorPrototype%.next()
}, function () {
  var O = this._t;
  var kind = this._k;
  var index = this._i++;
  if (!O || index >= O.length) {
    this._t = undefined;
    return step(1);
  }
  if (kind == 'keys') return step(0, index);
  if (kind == 'values') return step(0, O[index]);
  return step(0, [index, O[index]]);
}, 'values');

// argumentsList[@@iterator] is %ArrayProto_values% (9.4.4.6, 9.4.4.7)
Iterators.Arguments = Iterators.Array;

addToUnscopables('keys');
addToUnscopables('values');
addToUnscopables('entries');


/***/ }),
/* 101 */
/***/ (function(module, exports) {

module.exports = function () { /* empty */ };


/***/ }),
/* 102 */
/***/ (function(module, exports) {

module.exports = function (done, value) {
  return { value: value, done: !!done };
};


/***/ }),
/* 103 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

var LIBRARY = __webpack_require__(23);
var global = __webpack_require__(1);
var ctx = __webpack_require__(18);
var classof = __webpack_require__(57);
var $export = __webpack_require__(3);
var isObject = __webpack_require__(8);
var aFunction = __webpack_require__(24);
var anInstance = __webpack_require__(104);
var forOf = __webpack_require__(105);
var speciesConstructor = __webpack_require__(61);
var task = __webpack_require__(62).set;
var microtask = __webpack_require__(107)();
var newPromiseCapabilityModule = __webpack_require__(40);
var perform = __webpack_require__(63);
var promiseResolve = __webpack_require__(64);
var PROMISE = 'Promise';
var TypeError = global.TypeError;
var process = global.process;
var $Promise = global[PROMISE];
var isNode = classof(process) == 'process';
var empty = function () { /* empty */ };
var Internal, newGenericPromiseCapability, OwnPromiseCapability, Wrapper;
var newPromiseCapability = newGenericPromiseCapability = newPromiseCapabilityModule.f;

var USE_NATIVE = !!function () {
  try {
    // correct subclassing with @@species support
    var promise = $Promise.resolve(1);
    var FakePromise = (promise.constructor = {})[__webpack_require__(2)('species')] = function (exec) {
      exec(empty, empty);
    };
    // unhandled rejections tracking support, NodeJS Promise without it fails @@species test
    return (isNode || typeof PromiseRejectionEvent == 'function') && promise.then(empty) instanceof FakePromise;
  } catch (e) { /* empty */ }
}();

// helpers
var isThenable = function (it) {
  var then;
  return isObject(it) && typeof (then = it.then) == 'function' ? then : false;
};
var notify = function (promise, isReject) {
  if (promise._n) return;
  promise._n = true;
  var chain = promise._c;
  microtask(function () {
    var value = promise._v;
    var ok = promise._s == 1;
    var i = 0;
    var run = function (reaction) {
      var handler = ok ? reaction.ok : reaction.fail;
      var resolve = reaction.resolve;
      var reject = reaction.reject;
      var domain = reaction.domain;
      var result, then;
      try {
        if (handler) {
          if (!ok) {
            if (promise._h == 2) onHandleUnhandled(promise);
            promise._h = 1;
          }
          if (handler === true) result = value;
          else {
            if (domain) domain.enter();
            result = handler(value);
            if (domain) domain.exit();
          }
          if (result === reaction.promise) {
            reject(TypeError('Promise-chain cycle'));
          } else if (then = isThenable(result)) {
            then.call(result, resolve, reject);
          } else resolve(result);
        } else reject(value);
      } catch (e) {
        reject(e);
      }
    };
    while (chain.length > i) run(chain[i++]); // variable length - can't use forEach
    promise._c = [];
    promise._n = false;
    if (isReject && !promise._h) onUnhandled(promise);
  });
};
var onUnhandled = function (promise) {
  task.call(global, function () {
    var value = promise._v;
    var unhandled = isUnhandled(promise);
    var result, handler, console;
    if (unhandled) {
      result = perform(function () {
        if (isNode) {
          process.emit('unhandledRejection', value, promise);
        } else if (handler = global.onunhandledrejection) {
          handler({ promise: promise, reason: value });
        } else if ((console = global.console) && console.error) {
          console.error('Unhandled promise rejection', value);
        }
      });
      // Browsers should not trigger `rejectionHandled` event if it was handled here, NodeJS - should
      promise._h = isNode || isUnhandled(promise) ? 2 : 1;
    } promise._a = undefined;
    if (unhandled && result.e) throw result.v;
  });
};
var isUnhandled = function (promise) {
  return promise._h !== 1 && (promise._a || promise._c).length === 0;
};
var onHandleUnhandled = function (promise) {
  task.call(global, function () {
    var handler;
    if (isNode) {
      process.emit('rejectionHandled', promise);
    } else if (handler = global.onrejectionhandled) {
      handler({ promise: promise, reason: promise._v });
    }
  });
};
var $reject = function (value) {
  var promise = this;
  if (promise._d) return;
  promise._d = true;
  promise = promise._w || promise; // unwrap
  promise._v = value;
  promise._s = 2;
  if (!promise._a) promise._a = promise._c.slice();
  notify(promise, true);
};
var $resolve = function (value) {
  var promise = this;
  var then;
  if (promise._d) return;
  promise._d = true;
  promise = promise._w || promise; // unwrap
  try {
    if (promise === value) throw TypeError("Promise can't be resolved itself");
    if (then = isThenable(value)) {
      microtask(function () {
        var wrapper = { _w: promise, _d: false }; // wrap
        try {
          then.call(value, ctx($resolve, wrapper, 1), ctx($reject, wrapper, 1));
        } catch (e) {
          $reject.call(wrapper, e);
        }
      });
    } else {
      promise._v = value;
      promise._s = 1;
      notify(promise, false);
    }
  } catch (e) {
    $reject.call({ _w: promise, _d: false }, e); // wrap
  }
};

// constructor polyfill
if (!USE_NATIVE) {
  // 25.4.3.1 Promise(executor)
  $Promise = function Promise(executor) {
    anInstance(this, $Promise, PROMISE, '_h');
    aFunction(executor);
    Internal.call(this);
    try {
      executor(ctx($resolve, this, 1), ctx($reject, this, 1));
    } catch (err) {
      $reject.call(this, err);
    }
  };
  // eslint-disable-next-line no-unused-vars
  Internal = function Promise(executor) {
    this._c = [];             // <- awaiting reactions
    this._a = undefined;      // <- checked in isUnhandled reactions
    this._s = 0;              // <- state
    this._d = false;          // <- done
    this._v = undefined;      // <- value
    this._h = 0;              // <- rejection state, 0 - default, 1 - handled, 2 - unhandled
    this._n = false;          // <- notify
  };
  Internal.prototype = __webpack_require__(108)($Promise.prototype, {
    // 25.4.5.3 Promise.prototype.then(onFulfilled, onRejected)
    then: function then(onFulfilled, onRejected) {
      var reaction = newPromiseCapability(speciesConstructor(this, $Promise));
      reaction.ok = typeof onFulfilled == 'function' ? onFulfilled : true;
      reaction.fail = typeof onRejected == 'function' && onRejected;
      reaction.domain = isNode ? process.domain : undefined;
      this._c.push(reaction);
      if (this._a) this._a.push(reaction);
      if (this._s) notify(this, false);
      return reaction.promise;
    },
    // 25.4.5.1 Promise.prototype.catch(onRejected)
    'catch': function (onRejected) {
      return this.then(undefined, onRejected);
    }
  });
  OwnPromiseCapability = function () {
    var promise = new Internal();
    this.promise = promise;
    this.resolve = ctx($resolve, promise, 1);
    this.reject = ctx($reject, promise, 1);
  };
  newPromiseCapabilityModule.f = newPromiseCapability = function (C) {
    return C === $Promise || C === Wrapper
      ? new OwnPromiseCapability(C)
      : newGenericPromiseCapability(C);
  };
}

$export($export.G + $export.W + $export.F * !USE_NATIVE, { Promise: $Promise });
__webpack_require__(26)($Promise, PROMISE);
__webpack_require__(109)(PROMISE);
Wrapper = __webpack_require__(0)[PROMISE];

// statics
$export($export.S + $export.F * !USE_NATIVE, PROMISE, {
  // 25.4.4.5 Promise.reject(r)
  reject: function reject(r) {
    var capability = newPromiseCapability(this);
    var $$reject = capability.reject;
    $$reject(r);
    return capability.promise;
  }
});
$export($export.S + $export.F * (LIBRARY || !USE_NATIVE), PROMISE, {
  // 25.4.4.6 Promise.resolve(x)
  resolve: function resolve(x) {
    return promiseResolve(LIBRARY && this === Wrapper ? $Promise : this, x);
  }
});
$export($export.S + $export.F * !(USE_NATIVE && __webpack_require__(65)(function (iter) {
  $Promise.all(iter)['catch'](empty);
})), PROMISE, {
  // 25.4.4.1 Promise.all(iterable)
  all: function all(iterable) {
    var C = this;
    var capability = newPromiseCapability(C);
    var resolve = capability.resolve;
    var reject = capability.reject;
    var result = perform(function () {
      var values = [];
      var index = 0;
      var remaining = 1;
      forOf(iterable, false, function (promise) {
        var $index = index++;
        var alreadyCalled = false;
        values.push(undefined);
        remaining++;
        C.resolve(promise).then(function (value) {
          if (alreadyCalled) return;
          alreadyCalled = true;
          values[$index] = value;
          --remaining || resolve(values);
        }, reject);
      });
      --remaining || resolve(values);
    });
    if (result.e) reject(result.v);
    return capability.promise;
  },
  // 25.4.4.4 Promise.race(iterable)
  race: function race(iterable) {
    var C = this;
    var capability = newPromiseCapability(C);
    var reject = capability.reject;
    var result = perform(function () {
      forOf(iterable, false, function (promise) {
        C.resolve(promise).then(capability.resolve, reject);
      });
    });
    if (result.e) reject(result.v);
    return capability.promise;
  }
});


/***/ }),
/* 104 */
/***/ (function(module, exports) {

module.exports = function (it, Constructor, name, forbiddenField) {
  if (!(it instanceof Constructor) || (forbiddenField !== undefined && forbiddenField in it)) {
    throw TypeError(name + ': incorrect invocation!');
  } return it;
};


/***/ }),
/* 105 */
/***/ (function(module, exports, __webpack_require__) {

var ctx = __webpack_require__(18);
var call = __webpack_require__(58);
var isArrayIter = __webpack_require__(59);
var anObject = __webpack_require__(5);
var toLength = __webpack_require__(36);
var getIterFn = __webpack_require__(60);
var BREAK = {};
var RETURN = {};
var exports = module.exports = function (iterable, entries, fn, that, ITERATOR) {
  var iterFn = ITERATOR ? function () { return iterable; } : getIterFn(iterable);
  var f = ctx(fn, that, entries ? 2 : 1);
  var index = 0;
  var length, step, iterator, result;
  if (typeof iterFn != 'function') throw TypeError(iterable + ' is not iterable!');
  // fast case for arrays with default iterator
  if (isArrayIter(iterFn)) for (length = toLength(iterable.length); length > index; index++) {
    result = entries ? f(anObject(step = iterable[index])[0], step[1]) : f(iterable[index]);
    if (result === BREAK || result === RETURN) return result;
  } else for (iterator = iterFn.call(iterable); !(step = iterator.next()).done;) {
    result = call(iterator, f, step.value, entries);
    if (result === BREAK || result === RETURN) return result;
  }
};
exports.BREAK = BREAK;
exports.RETURN = RETURN;


/***/ }),
/* 106 */
/***/ (function(module, exports) {

// fast apply, http://jsperf.lnkit.com/fast-apply/5
module.exports = function (fn, args, that) {
  var un = that === undefined;
  switch (args.length) {
    case 0: return un ? fn()
                      : fn.call(that);
    case 1: return un ? fn(args[0])
                      : fn.call(that, args[0]);
    case 2: return un ? fn(args[0], args[1])
                      : fn.call(that, args[0], args[1]);
    case 3: return un ? fn(args[0], args[1], args[2])
                      : fn.call(that, args[0], args[1], args[2]);
    case 4: return un ? fn(args[0], args[1], args[2], args[3])
                      : fn.call(that, args[0], args[1], args[2], args[3]);
  } return fn.apply(that, args);
};


/***/ }),
/* 107 */
/***/ (function(module, exports, __webpack_require__) {

var global = __webpack_require__(1);
var macrotask = __webpack_require__(62).set;
var Observer = global.MutationObserver || global.WebKitMutationObserver;
var process = global.process;
var Promise = global.Promise;
var isNode = __webpack_require__(22)(process) == 'process';

module.exports = function () {
  var head, last, notify;

  var flush = function () {
    var parent, fn;
    if (isNode && (parent = process.domain)) parent.exit();
    while (head) {
      fn = head.fn;
      head = head.next;
      try {
        fn();
      } catch (e) {
        if (head) notify();
        else last = undefined;
        throw e;
      }
    } last = undefined;
    if (parent) parent.enter();
  };

  // Node.js
  if (isNode) {
    notify = function () {
      process.nextTick(flush);
    };
  // browsers with MutationObserver, except iOS Safari - https://github.com/zloirock/core-js/issues/339
  } else if (Observer && !(global.navigator && global.navigator.standalone)) {
    var toggle = true;
    var node = document.createTextNode('');
    new Observer(flush).observe(node, { characterData: true }); // eslint-disable-line no-new
    notify = function () {
      node.data = toggle = !toggle;
    };
  // environments with maybe non-completely correct, but existent Promise
  } else if (Promise && Promise.resolve) {
    var promise = Promise.resolve();
    notify = function () {
      promise.then(flush);
    };
  // for other environments - macrotask based on:
  // - setImmediate
  // - MessageChannel
  // - window.postMessag
  // - onreadystatechange
  // - setTimeout
  } else {
    notify = function () {
      // strange IE + webpack dev server bug - use .call(global)
      macrotask.call(global, flush);
    };
  }

  return function (fn) {
    var task = { fn: fn, next: undefined };
    if (last) last.next = task;
    if (!head) {
      head = task;
      notify();
    } last = task;
  };
};


/***/ }),
/* 108 */
/***/ (function(module, exports, __webpack_require__) {

var hide = __webpack_require__(7);
module.exports = function (target, src, safe) {
  for (var key in src) {
    if (safe && target[key]) target[key] = src[key];
    else hide(target, key, src[key]);
  } return target;
};


/***/ }),
/* 109 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

var global = __webpack_require__(1);
var core = __webpack_require__(0);
var dP = __webpack_require__(4);
var DESCRIPTORS = __webpack_require__(6);
var SPECIES = __webpack_require__(2)('species');

module.exports = function (KEY) {
  var C = typeof core[KEY] == 'function' ? core[KEY] : global[KEY];
  if (DESCRIPTORS && C && !C[SPECIES]) dP.f(C, SPECIES, {
    configurable: true,
    get: function () { return this; }
  });
};


/***/ }),
/* 110 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";
// https://github.com/tc39/proposal-promise-finally

var $export = __webpack_require__(3);
var core = __webpack_require__(0);
var global = __webpack_require__(1);
var speciesConstructor = __webpack_require__(61);
var promiseResolve = __webpack_require__(64);

$export($export.P + $export.R, 'Promise', { 'finally': function (onFinally) {
  var C = speciesConstructor(this, core.Promise || global.Promise);
  var isFunction = typeof onFinally == 'function';
  return this.then(
    isFunction ? function (x) {
      return promiseResolve(C, onFinally()).then(function () { return x; });
    } : onFinally,
    isFunction ? function (e) {
      return promiseResolve(C, onFinally()).then(function () { throw e; });
    } : onFinally
  );
} });


/***/ }),
/* 111 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

// https://github.com/tc39/proposal-promise-try
var $export = __webpack_require__(3);
var newPromiseCapability = __webpack_require__(40);
var perform = __webpack_require__(63);

$export($export.S, 'Promise', { 'try': function (callbackfn) {
  var promiseCapability = newPromiseCapability.f(this);
  var result = perform(callbackfn);
  (result.e ? promiseCapability.reject : promiseCapability.resolve)(result.v);
  return promiseCapability.promise;
} });


/***/ }),
/* 112 */
/***/ (function(module, exports, __webpack_require__) {

var __vue_exports__, __vue_options__
var __vue_styles__ = []

/* styles */
__vue_styles__.push(__webpack_require__(113)
)

/* script */
__vue_exports__ = __webpack_require__(114)

/* template */
var __vue_template__ = __webpack_require__(115)
__vue_options__ = __vue_exports__ = __vue_exports__ || {}
if (
  typeof __vue_exports__.default === "object" ||
  typeof __vue_exports__.default === "function"
) {
__vue_options__ = __vue_exports__ = __vue_exports__.default
}
if (typeof __vue_options__ === "function") {
  __vue_options__ = __vue_options__.options
}

__vue_options__.render = __vue_template__.render
__vue_options__.staticRenderFns = __vue_template__.staticRenderFns
__vue_options__._scopeId = "data-v-7f896114"
__vue_options__.style = __vue_options__.style || {}
__vue_styles__.forEach(function (module) {
  for (var name in module) {
    __vue_options__.style[name] = module[name]
  }
})
if (typeof __register_static_styles__ === "function") {
  __register_static_styles__(__vue_options__._scopeId, __vue_styles__)
}

module.exports = __vue_exports__


/***/ }),
/* 113 */
/***/ (function(module, exports) {

module.exports = {
  "header-unit": {
    "flexDirection": "row",
    "width": "750",
    "height": "80",
    "backgroundColor": "#ffffff"
  },
  "header-text": {
    "height": "80",
    "lineHeight": "80",
    "textAlign": "center",
    "fontSize": "28"
  }
}

/***/ }),
/* 114 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
Object.defineProperty(__webpack_exports__, "__esModule", { value: true });
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//

/* harmony default export */ __webpack_exports__["default"] = ({
    name: 'anchor-lists',
    props: {
        color: {
            type: String
        },
        lists: {
            type: Array
        },
        width: {
            type: String
        },
        model: { // 图片锚点或者文字锚点
            type: Number,
            default: function _default() {
                return 1; //1图片 2文字
            }
        }
    },
    methods: {
        skip: function skip(item, index) {
            var label = item.label;
            if (this.model === 1) {
                this.lists.forEach(function (item) {
                    return item.src = item.before_src;
                });
            }
            this.$emit('skip', label);
            this.$emit('report', index);
            item.src = item.after_src;
            this.$set(this.lists, index, item);
        }
    }
});

/***/ }),
/* 115 */
/***/ (function(module, exports) {

module.exports={render:function (){var _vm=this;var _h=_vm.$createElement;var _c=_vm._self._c||_h;
  return _c('div', {
    staticClass: ["anchor-lists-component", "header-unit"],
    style: {
      'background': _vm.color
    }
  }, [_vm._l((_vm.lists), function(item, index) {
    return (_vm.model === 2) ? _c('text', {
      key: index,
      staticClass: ["header-text"],
      style: {
        'width': _vm.width
      },
      on: {
        "click": function($event) {
          _vm.skip(item, index)
        }
      }
    }, [_vm._v(_vm._s(item.name))]) : _vm._e()
  }), _vm._l((_vm.lists), function(item, index) {
    return (_vm.model === 1) ? _c('image', {
      key: index,
      staticClass: ["header-image"],
      style: {
        'width': _vm.width,
        'background-color': _vm.color
      },
      attrs: {
        "src": item.src
      },
      on: {
        "click": function($event) {
          _vm.skip(item, index)
        }
      }
    }) : _vm._e()
  })], 2)
},staticRenderFns: []}

/***/ }),
/* 116 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0_babel_runtime_core_js_promise__ = __webpack_require__(14);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0_babel_runtime_core_js_promise___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_0_babel_runtime_core_js_promise__);

var scrollToElement = function scrollToElement(ref, options) {
    return new __WEBPACK_IMPORTED_MODULE_0_babel_runtime_core_js_promise___default.a(function (resolve, reject) {
        var root = options.root,
            el = options.el;

        var top = el.offsetTop;

        document.body.scrollTop = ref.offsetTop + top;
        document.documentElement.scrollTop = ref.offsetTop + top;
        resolve();
    });
};

/* harmony default export */ __webpack_exports__["a"] = ({
    scrollToElement: scrollToElement
});

/***/ }),
/* 117 */
/***/ (function(module, exports) {

module.exports={render:function (){var _vm=this;var _h=_vm.$createElement;var _c=_vm._self._c||_h;
  return _c('div', {
    staticClass: ["anchors-component"],
    class: [_vm.sticky ? 'on-sticky' : '']
  }, [_c('div', {
    ref: "header",
    staticClass: ["anchors-header"],
    class: [_vm.scrolling ? 'hide' : '', _vm.sticky ? 'sticky' : '']
  }, [_c('scroller', {
    directives: [{
      name: "show",
      rawName: "v-show",
      value: (_vm.type === 2 || _vm.type === '2'),
      expression: "type === 2 || type === '2'"
    }],
    ref: "scrollerB",
    staticClass: ["scroller-box"],
    attrs: {
      "scrollDirection": "horizontal"
    }
  }, [_c('anchor-lists', {
    attrs: {
      "model": _vm.model,
      "lists": _vm.lists,
      "width": _vm.width,
      "color": _vm._color
    },
    on: {
      "report": _vm.report,
      "skip": _vm.skip
    }
  })], 1), _c('div', {
    directives: [{
      name: "show",
      rawName: "v-show",
      value: (_vm.type === 1 || _vm.type === '1'),
      expression: "type === 1 || type === '1'"
    }],
    staticClass: ["spec-sroller"]
  }, [_c('scroller', {
    directives: [{
      name: "show",
      rawName: "v-show",
      value: (!_vm.showChoiceList),
      expression: "!showChoiceList"
    }],
    ref: "scrollerA",
    staticClass: ["spec-scroller-box"],
    staticStyle: {
      height: "80px"
    },
    attrs: {
      "scrollDirection": "horizontal"
    }
  }, [_c('anchor-lists', {
    attrs: {
      "model": _vm.model,
      "lists": _vm.reLists,
      "width": _vm.headWidth,
      "color": _vm._color
    },
    on: {
      "report": _vm.report,
      "skip": _vm.skip
    }
  })], 1), _c('div', {
    directives: [{
      name: "show",
      rawName: "v-show",
      value: (_vm.boxes.length > 0 && !_vm.showChoiceList),
      expression: "boxes.length > 0 && !showChoiceList"
    }],
    staticClass: ["btn-box"],
    on: {
      "click": _vm.choiceHandle
    }
  }, [_c('image', {
    staticClass: ["btn"],
    staticStyle: {
      width: "40px",
      height: "40px"
    },
    attrs: {
      "resize": "contain",
      "src": "http://cdn3.meijiabang.cn/public/upload/obj_image/2018/03/19/97699edb769f70f67cb4b12264b1ac22qnkV0q.png"
    }
  })]), _c('div', {
    directives: [{
      name: "show",
      rawName: "v-show",
      value: (_vm.showChoiceList),
      expression: "showChoiceList"
    }],
    staticClass: ["spec-scroller-box"],
    style: {
      'background-color': _vm._color
    }
  }, [_c('text', {
    staticClass: ["spec-scroller-box-text"]
  }), _c('div', {
    staticClass: ["btn-box"],
    on: {
      "click": _vm.choiceHandle
    }
  }, [_c('image', {
    staticClass: ["btn"],
    staticStyle: {
      width: "40px",
      height: "40px"
    },
    attrs: {
      "resize": "contain",
      "src": "http://cdn3.meijiabang.cn/public/upload/obj_image/2018/03/19/3aaed695081d9c583c3dec0a7f85b190nkkNQ5.png"
    }
  })])]), _c('div', {
    staticClass: ["absolute-box"],
    style: {
      'bottom': -(_vm.boxes.length * 80) + 'px'
    }
  }, _vm._l((_vm.boxes), function(item, index) {
    return (_vm.showChoiceList) ? _c('div', {
      staticClass: ["spec-scroller-box"],
      style: {
        'background-color': _vm._color
      }
    }, [_c('anchor-lists', {
      attrs: {
        "model": _vm.model,
        "lists": item,
        "color": _vm.color,
        "width": _vm.width
      },
      on: {
        "report": _vm.report,
        "skip": _vm.skip
      }
    })], 1) : _vm._e()
  }))])]), _c('div', {
    ref: "slot",
    staticClass: ["anchors-main"]
  }, [_vm._t("default")], 2)])
},staticRenderFns: []}

/***/ }),
/* 118 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
Object.defineProperty(__webpack_exports__, "__esModule", { value: true });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__index_vue__ = __webpack_require__(119);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__index_vue___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_0__index_vue__);
/* harmony reexport (default from non-hamory) */ __webpack_require__.d(__webpack_exports__, "default", function() { return __WEBPACK_IMPORTED_MODULE_0__index_vue___default.a; });


/***/ }),
/* 119 */
/***/ (function(module, exports, __webpack_require__) {

var __vue_exports__, __vue_options__
var __vue_styles__ = []

/* script */
__vue_exports__ = __webpack_require__(120)

/* template */
var __vue_template__ = __webpack_require__(148)
__vue_options__ = __vue_exports__ = __vue_exports__ || {}
if (
  typeof __vue_exports__.default === "object" ||
  typeof __vue_exports__.default === "function"
) {
__vue_options__ = __vue_exports__ = __vue_exports__.default
}
if (typeof __vue_options__ === "function") {
  __vue_options__ = __vue_options__.options
}

__vue_options__.render = __vue_template__.render
__vue_options__.staticRenderFns = __vue_template__.staticRenderFns
__vue_options__.style = __vue_options__.style || {}
__vue_styles__.forEach(function (module) {
  for (var name in module) {
    __vue_options__.style[name] = module[name]
  }
})
if (typeof __register_static_styles__ === "function") {
  __register_static_styles__(__vue_options__._scopeId, __vue_styles__)
}

module.exports = __vue_exports__


/***/ }),
/* 120 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
Object.defineProperty(__webpack_exports__, "__esModule", { value: true });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0_babel_runtime_helpers_extends__ = __webpack_require__(10);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0_babel_runtime_helpers_extends___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_0_babel_runtime_helpers_extends__);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__utils_web_url__ = __webpack_require__(17);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2__utils_env__ = __webpack_require__(11);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_3__utils__ = __webpack_require__(45);

//
//
//
//
//
//
//






/* harmony default export */ __webpack_exports__["default"] = ({
	name: 'app-container',
	props: {
		title: {
			type: String,
			default: '美甲帮'
		},
		bgColor: {
			type: String,
			default: '#f2f3f5'
		},
		titleConfig: {
			type: Array,
			default: function _default() {
				return [];
			}
		},
		shareTitle: {
			type: String,
			default: ''
		},
		shareText: {
			type: String,
			default: ''
		},
		shareImage: {
			type: String,
			default: ''
		},
		showStartTime: {
			type: [Date, String]
		},
		showEndTime: {
			type: [Date, String]
		},
		shareLink: {
			type: String,
			default: ''
		}
	},
	data: function data() {
		return {
			pageId: 0,
			isBottomShow: true,
			height: '',
			deviceModel: weex.config.env.deviceModel,
			bundleName: __WEBPACK_IMPORTED_MODULE_1__utils_web_url__["a" /* default */].getUrlParam('page'),
			showModal: false,
			modalImage: '//m.meijiabang.cn/force/web/static/images/not-start.png',
			modalText: '活动暂未开始哦',
			loginCallbackFunction: function loginCallbackFunction() {}
		};
	},

	watch: {
		title: function title() {
			this.init();
		}
	},
	computed: {
		realShareImage: function realShareImage() {
			return this.shareImage.replace(/http:\/\//, 'https://');
		}
	},
	methods: {
		init: function init() {
			var _this = this;

			// 设置高度
			var scale = weex.config.env.deviceModel === 'unknown' ? .5 : 1;
			this.height = weex.config.env.deviceHeight / scale + 'px';

			// 设置标题
			this.$module('mjb-native').setTitle(this.title);

			// 初始化分享
			if (this.titleConfig.indexOf('分享') > -1) {
				this.$module('mjb-native').enableShare(true, {
					title: this.shareTitle,
					text: this.shareText,
					image_url: this.realShareImage,
					link_url: this.shareLink || window.location.origin + '/force/web/index.html',
					share_image_only: false,
					shareSuccess: function shareSuccess() {
						_this.$module('mjb-native').track(_this.title, _this.pageId, data.action, true, __WEBPACK_IMPORTED_MODULE_0_babel_runtime_helpers_extends___default()({}, data.options, {
							env: '微信内'
						}));
					}
				}, function () {
					if (__WEBPACK_IMPORTED_MODULE_2__utils_env__["a" /* default */].isMjb()) {
						window.isMjbShareCallback = function (bool) {
							if (bool) {
								_this.$module('mjb-native').track(_this.title, _this.pageId, data.action, true, __WEBPACK_IMPORTED_MODULE_0_babel_runtime_helpers_extends___default()({}, data.options, {
									env: 'APP内'
								}));
							}
						};
					}
				});
			}

			// 登录监听
			this.$module('globalEvent').addEventListener('login', function (e) {
				if (_this.$refs.login) {
					if (typeof e.data.loginCallback === 'function') {
						_this.loginCallbackFunction = e.data.loginCallback;
					} else {
						_this.loginCallbackFunction = _this.loginCallback;
					}
					_this.$refs.login.showLogin();
				}
			});

			this.$module('globalEvent').addEventListener('userTrack', function (e) {
				// 统一上报
				var data = e.data;
				_this.$module('mjb-native').track(_this.title, _this.pageId, data.action, true, __WEBPACK_IMPORTED_MODULE_0_babel_runtime_helpers_extends___default()({}, data.options, {
					env: __WEBPACK_IMPORTED_MODULE_2__utils_env__["a" /* default */].isMjb() ? 'APP内' : 'APP外',
					business: data.business || '商城'
				}));
			});
		},
		timeCheck: function timeCheck() {
			// 上线判断

			var currentTime = new Date().getTime();
			var startTime = this.showStartTime ? new Date(this.showStartTime).getTime() : 0;
			var endTime = this.showEndTime ? new Date(this.showEndTime).getTime() : 0;
			// 未上线
			if (!startTime || startTime > currentTime) {
				this.modalImage = '//m.meijiabang.cn/force/web/static/images/not-start.png';
				this.modalText = '活动暂未开始哦';
				this.showModal = true;
			} else if (endTime && currentTime > endTime) {
				// 已下线
				this.modalImage = '//m.meijiabang.cn/force/web/static/images/end.png';
				this.modalText = '活动已经结束了哦';
				this.showModal = true;
			} else {
				this.showModal = false;
			}
		},
		loginCallback: function loginCallback(res) {
			console.log(res);
		}
	},
	created: function created() {
		var bundleName = __WEBPACK_IMPORTED_MODULE_1__utils_web_url__["a" /* default */].getUrlParam('page');
		var names = bundleName ? bundleName.split('_') : '';

		if (names.length > 1) {
			this.pageId = names[1];
		}

		this.$module('mjb-native').track(this.title, this.pageId, '访问', true, {});

		this.init();
		this.timeCheck();
		if (this.deviceModel === 'unknown' && this.bundleName) {
			__WEBPACK_IMPORTED_MODULE_3__utils__["e" /* Touch */].start();
		}
	}
});

/***/ }),
/* 121 */
/***/ (function(module, exports, __webpack_require__) {

__webpack_require__(122);
module.exports = __webpack_require__(0).Object.assign;


/***/ }),
/* 122 */
/***/ (function(module, exports, __webpack_require__) {

// 19.1.3.1 Object.assign(target, source)
var $export = __webpack_require__(3);

$export($export.S + $export.F, 'Object', { assign: __webpack_require__(123) });


/***/ }),
/* 123 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

// 19.1.2.1 Object.assign(target, source, ...)
var getKeys = __webpack_require__(21);
var gOPS = __webpack_require__(41);
var pIE = __webpack_require__(28);
var toObject = __webpack_require__(27);
var IObject = __webpack_require__(54);
var $assign = Object.assign;

// should work with symbols and should have deterministic property order (V8 bug)
module.exports = !$assign || __webpack_require__(15)(function () {
  var A = {};
  var B = {};
  // eslint-disable-next-line no-undef
  var S = Symbol();
  var K = 'abcdefghijklmnopqrst';
  A[S] = 7;
  K.split('').forEach(function (k) { B[k] = k; });
  return $assign({}, A)[S] != 7 || Object.keys($assign({}, B)).join('') != K;
}) ? function assign(target, source) { // eslint-disable-line no-unused-vars
  var T = toObject(target);
  var aLen = arguments.length;
  var index = 1;
  var getSymbols = gOPS.f;
  var isEnum = pIE.f;
  while (aLen > index) {
    var S = IObject(arguments[index++]);
    var keys = getSymbols ? getKeys(S).concat(getSymbols(S)) : getKeys(S);
    var length = keys.length;
    var j = 0;
    var key;
    while (length > j) if (isEnum.call(S, key = keys[j++])) T[key] = S[key];
  } return T;
} : $assign;


/***/ }),
/* 124 */
/***/ (function(module, exports, __webpack_require__) {

module.exports = { "default": __webpack_require__(125), __esModule: true };

/***/ }),
/* 125 */
/***/ (function(module, exports, __webpack_require__) {

__webpack_require__(31);
__webpack_require__(56);
module.exports = __webpack_require__(43).f('iterator');


/***/ }),
/* 126 */
/***/ (function(module, exports, __webpack_require__) {

module.exports = { "default": __webpack_require__(127), __esModule: true };

/***/ }),
/* 127 */
/***/ (function(module, exports, __webpack_require__) {

__webpack_require__(128);
__webpack_require__(48);
__webpack_require__(134);
__webpack_require__(135);
module.exports = __webpack_require__(0).Symbol;


/***/ }),
/* 128 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

// ECMAScript 6 symbols shim
var global = __webpack_require__(1);
var has = __webpack_require__(9);
var DESCRIPTORS = __webpack_require__(6);
var $export = __webpack_require__(3);
var redefine = __webpack_require__(51);
var META = __webpack_require__(129).KEY;
var $fails = __webpack_require__(15);
var shared = __webpack_require__(38);
var setToStringTag = __webpack_require__(26);
var uid = __webpack_require__(25);
var wks = __webpack_require__(2);
var wksExt = __webpack_require__(43);
var wksDefine = __webpack_require__(44);
var enumKeys = __webpack_require__(130);
var isArray = __webpack_require__(131);
var anObject = __webpack_require__(5);
var isObject = __webpack_require__(8);
var toIObject = __webpack_require__(16);
var toPrimitive = __webpack_require__(35);
var createDesc = __webpack_require__(19);
var _create = __webpack_require__(52);
var gOPNExt = __webpack_require__(132);
var $GOPD = __webpack_require__(133);
var $DP = __webpack_require__(4);
var $keys = __webpack_require__(21);
var gOPD = $GOPD.f;
var dP = $DP.f;
var gOPN = gOPNExt.f;
var $Symbol = global.Symbol;
var $JSON = global.JSON;
var _stringify = $JSON && $JSON.stringify;
var PROTOTYPE = 'prototype';
var HIDDEN = wks('_hidden');
var TO_PRIMITIVE = wks('toPrimitive');
var isEnum = {}.propertyIsEnumerable;
var SymbolRegistry = shared('symbol-registry');
var AllSymbols = shared('symbols');
var OPSymbols = shared('op-symbols');
var ObjectProto = Object[PROTOTYPE];
var USE_NATIVE = typeof $Symbol == 'function';
var QObject = global.QObject;
// Don't use setters in Qt Script, https://github.com/zloirock/core-js/issues/173
var setter = !QObject || !QObject[PROTOTYPE] || !QObject[PROTOTYPE].findChild;

// fallback for old Android, https://code.google.com/p/v8/issues/detail?id=687
var setSymbolDesc = DESCRIPTORS && $fails(function () {
  return _create(dP({}, 'a', {
    get: function () { return dP(this, 'a', { value: 7 }).a; }
  })).a != 7;
}) ? function (it, key, D) {
  var protoDesc = gOPD(ObjectProto, key);
  if (protoDesc) delete ObjectProto[key];
  dP(it, key, D);
  if (protoDesc && it !== ObjectProto) dP(ObjectProto, key, protoDesc);
} : dP;

var wrap = function (tag) {
  var sym = AllSymbols[tag] = _create($Symbol[PROTOTYPE]);
  sym._k = tag;
  return sym;
};

var isSymbol = USE_NATIVE && typeof $Symbol.iterator == 'symbol' ? function (it) {
  return typeof it == 'symbol';
} : function (it) {
  return it instanceof $Symbol;
};

var $defineProperty = function defineProperty(it, key, D) {
  if (it === ObjectProto) $defineProperty(OPSymbols, key, D);
  anObject(it);
  key = toPrimitive(key, true);
  anObject(D);
  if (has(AllSymbols, key)) {
    if (!D.enumerable) {
      if (!has(it, HIDDEN)) dP(it, HIDDEN, createDesc(1, {}));
      it[HIDDEN][key] = true;
    } else {
      if (has(it, HIDDEN) && it[HIDDEN][key]) it[HIDDEN][key] = false;
      D = _create(D, { enumerable: createDesc(0, false) });
    } return setSymbolDesc(it, key, D);
  } return dP(it, key, D);
};
var $defineProperties = function defineProperties(it, P) {
  anObject(it);
  var keys = enumKeys(P = toIObject(P));
  var i = 0;
  var l = keys.length;
  var key;
  while (l > i) $defineProperty(it, key = keys[i++], P[key]);
  return it;
};
var $create = function create(it, P) {
  return P === undefined ? _create(it) : $defineProperties(_create(it), P);
};
var $propertyIsEnumerable = function propertyIsEnumerable(key) {
  var E = isEnum.call(this, key = toPrimitive(key, true));
  if (this === ObjectProto && has(AllSymbols, key) && !has(OPSymbols, key)) return false;
  return E || !has(this, key) || !has(AllSymbols, key) || has(this, HIDDEN) && this[HIDDEN][key] ? E : true;
};
var $getOwnPropertyDescriptor = function getOwnPropertyDescriptor(it, key) {
  it = toIObject(it);
  key = toPrimitive(key, true);
  if (it === ObjectProto && has(AllSymbols, key) && !has(OPSymbols, key)) return;
  var D = gOPD(it, key);
  if (D && has(AllSymbols, key) && !(has(it, HIDDEN) && it[HIDDEN][key])) D.enumerable = true;
  return D;
};
var $getOwnPropertyNames = function getOwnPropertyNames(it) {
  var names = gOPN(toIObject(it));
  var result = [];
  var i = 0;
  var key;
  while (names.length > i) {
    if (!has(AllSymbols, key = names[i++]) && key != HIDDEN && key != META) result.push(key);
  } return result;
};
var $getOwnPropertySymbols = function getOwnPropertySymbols(it) {
  var IS_OP = it === ObjectProto;
  var names = gOPN(IS_OP ? OPSymbols : toIObject(it));
  var result = [];
  var i = 0;
  var key;
  while (names.length > i) {
    if (has(AllSymbols, key = names[i++]) && (IS_OP ? has(ObjectProto, key) : true)) result.push(AllSymbols[key]);
  } return result;
};

// 19.4.1.1 Symbol([description])
if (!USE_NATIVE) {
  $Symbol = function Symbol() {
    if (this instanceof $Symbol) throw TypeError('Symbol is not a constructor!');
    var tag = uid(arguments.length > 0 ? arguments[0] : undefined);
    var $set = function (value) {
      if (this === ObjectProto) $set.call(OPSymbols, value);
      if (has(this, HIDDEN) && has(this[HIDDEN], tag)) this[HIDDEN][tag] = false;
      setSymbolDesc(this, tag, createDesc(1, value));
    };
    if (DESCRIPTORS && setter) setSymbolDesc(ObjectProto, tag, { configurable: true, set: $set });
    return wrap(tag);
  };
  redefine($Symbol[PROTOTYPE], 'toString', function toString() {
    return this._k;
  });

  $GOPD.f = $getOwnPropertyDescriptor;
  $DP.f = $defineProperty;
  __webpack_require__(67).f = gOPNExt.f = $getOwnPropertyNames;
  __webpack_require__(28).f = $propertyIsEnumerable;
  __webpack_require__(41).f = $getOwnPropertySymbols;

  if (DESCRIPTORS && !__webpack_require__(23)) {
    redefine(ObjectProto, 'propertyIsEnumerable', $propertyIsEnumerable, true);
  }

  wksExt.f = function (name) {
    return wrap(wks(name));
  };
}

$export($export.G + $export.W + $export.F * !USE_NATIVE, { Symbol: $Symbol });

for (var es6Symbols = (
  // 19.4.2.2, 19.4.2.3, 19.4.2.4, 19.4.2.6, 19.4.2.8, 19.4.2.9, 19.4.2.10, 19.4.2.11, 19.4.2.12, 19.4.2.13, 19.4.2.14
  'hasInstance,isConcatSpreadable,iterator,match,replace,search,species,split,toPrimitive,toStringTag,unscopables'
).split(','), j = 0; es6Symbols.length > j;)wks(es6Symbols[j++]);

for (var wellKnownSymbols = $keys(wks.store), k = 0; wellKnownSymbols.length > k;) wksDefine(wellKnownSymbols[k++]);

$export($export.S + $export.F * !USE_NATIVE, 'Symbol', {
  // 19.4.2.1 Symbol.for(key)
  'for': function (key) {
    return has(SymbolRegistry, key += '')
      ? SymbolRegistry[key]
      : SymbolRegistry[key] = $Symbol(key);
  },
  // 19.4.2.5 Symbol.keyFor(sym)
  keyFor: function keyFor(sym) {
    if (!isSymbol(sym)) throw TypeError(sym + ' is not a symbol!');
    for (var key in SymbolRegistry) if (SymbolRegistry[key] === sym) return key;
  },
  useSetter: function () { setter = true; },
  useSimple: function () { setter = false; }
});

$export($export.S + $export.F * !USE_NATIVE, 'Object', {
  // 19.1.2.2 Object.create(O [, Properties])
  create: $create,
  // 19.1.2.4 Object.defineProperty(O, P, Attributes)
  defineProperty: $defineProperty,
  // 19.1.2.3 Object.defineProperties(O, Properties)
  defineProperties: $defineProperties,
  // 19.1.2.6 Object.getOwnPropertyDescriptor(O, P)
  getOwnPropertyDescriptor: $getOwnPropertyDescriptor,
  // 19.1.2.7 Object.getOwnPropertyNames(O)
  getOwnPropertyNames: $getOwnPropertyNames,
  // 19.1.2.8 Object.getOwnPropertySymbols(O)
  getOwnPropertySymbols: $getOwnPropertySymbols
});

// 24.3.2 JSON.stringify(value [, replacer [, space]])
$JSON && $export($export.S + $export.F * (!USE_NATIVE || $fails(function () {
  var S = $Symbol();
  // MS Edge converts symbol values to JSON as {}
  // WebKit converts symbol values to JSON as null
  // V8 throws on boxed symbols
  return _stringify([S]) != '[null]' || _stringify({ a: S }) != '{}' || _stringify(Object(S)) != '{}';
})), 'JSON', {
  stringify: function stringify(it) {
    var args = [it];
    var i = 1;
    var replacer, $replacer;
    while (arguments.length > i) args.push(arguments[i++]);
    $replacer = replacer = args[1];
    if (!isObject(replacer) && it === undefined || isSymbol(it)) return; // IE8 returns string on undefined
    if (!isArray(replacer)) replacer = function (key, value) {
      if (typeof $replacer == 'function') value = $replacer.call(this, key, value);
      if (!isSymbol(value)) return value;
    };
    args[1] = replacer;
    return _stringify.apply($JSON, args);
  }
});

// 19.4.3.4 Symbol.prototype[@@toPrimitive](hint)
$Symbol[PROTOTYPE][TO_PRIMITIVE] || __webpack_require__(7)($Symbol[PROTOTYPE], TO_PRIMITIVE, $Symbol[PROTOTYPE].valueOf);
// 19.4.3.5 Symbol.prototype[@@toStringTag]
setToStringTag($Symbol, 'Symbol');
// 20.2.1.9 Math[@@toStringTag]
setToStringTag(Math, 'Math', true);
// 24.3.3 JSON[@@toStringTag]
setToStringTag(global.JSON, 'JSON', true);


/***/ }),
/* 129 */
/***/ (function(module, exports, __webpack_require__) {

var META = __webpack_require__(25)('meta');
var isObject = __webpack_require__(8);
var has = __webpack_require__(9);
var setDesc = __webpack_require__(4).f;
var id = 0;
var isExtensible = Object.isExtensible || function () {
  return true;
};
var FREEZE = !__webpack_require__(15)(function () {
  return isExtensible(Object.preventExtensions({}));
});
var setMeta = function (it) {
  setDesc(it, META, { value: {
    i: 'O' + ++id, // object ID
    w: {}          // weak collections IDs
  } });
};
var fastKey = function (it, create) {
  // return primitive with prefix
  if (!isObject(it)) return typeof it == 'symbol' ? it : (typeof it == 'string' ? 'S' : 'P') + it;
  if (!has(it, META)) {
    // can't set metadata to uncaught frozen object
    if (!isExtensible(it)) return 'F';
    // not necessary to add metadata
    if (!create) return 'E';
    // add missing metadata
    setMeta(it);
  // return object ID
  } return it[META].i;
};
var getWeak = function (it, create) {
  if (!has(it, META)) {
    // can't set metadata to uncaught frozen object
    if (!isExtensible(it)) return true;
    // not necessary to add metadata
    if (!create) return false;
    // add missing metadata
    setMeta(it);
  // return hash weak collections IDs
  } return it[META].w;
};
// add metadata on freeze-family methods calling
var onFreeze = function (it) {
  if (FREEZE && meta.NEED && isExtensible(it) && !has(it, META)) setMeta(it);
  return it;
};
var meta = module.exports = {
  KEY: META,
  NEED: false,
  fastKey: fastKey,
  getWeak: getWeak,
  onFreeze: onFreeze
};


/***/ }),
/* 130 */
/***/ (function(module, exports, __webpack_require__) {

// all enumerable object keys, includes symbols
var getKeys = __webpack_require__(21);
var gOPS = __webpack_require__(41);
var pIE = __webpack_require__(28);
module.exports = function (it) {
  var result = getKeys(it);
  var getSymbols = gOPS.f;
  if (getSymbols) {
    var symbols = getSymbols(it);
    var isEnum = pIE.f;
    var i = 0;
    var key;
    while (symbols.length > i) if (isEnum.call(it, key = symbols[i++])) result.push(key);
  } return result;
};


/***/ }),
/* 131 */
/***/ (function(module, exports, __webpack_require__) {

// 7.2.2 IsArray(argument)
var cof = __webpack_require__(22);
module.exports = Array.isArray || function isArray(arg) {
  return cof(arg) == 'Array';
};


/***/ }),
/* 132 */
/***/ (function(module, exports, __webpack_require__) {

// fallback for IE11 buggy Object.getOwnPropertyNames with iframe and window
var toIObject = __webpack_require__(16);
var gOPN = __webpack_require__(67).f;
var toString = {}.toString;

var windowNames = typeof window == 'object' && window && Object.getOwnPropertyNames
  ? Object.getOwnPropertyNames(window) : [];

var getWindowNames = function (it) {
  try {
    return gOPN(it);
  } catch (e) {
    return windowNames.slice();
  }
};

module.exports.f = function getOwnPropertyNames(it) {
  return windowNames && toString.call(it) == '[object Window]' ? getWindowNames(it) : gOPN(toIObject(it));
};


/***/ }),
/* 133 */
/***/ (function(module, exports, __webpack_require__) {

var pIE = __webpack_require__(28);
var createDesc = __webpack_require__(19);
var toIObject = __webpack_require__(16);
var toPrimitive = __webpack_require__(35);
var has = __webpack_require__(9);
var IE8_DOM_DEFINE = __webpack_require__(50);
var gOPD = Object.getOwnPropertyDescriptor;

exports.f = __webpack_require__(6) ? gOPD : function getOwnPropertyDescriptor(O, P) {
  O = toIObject(O);
  P = toPrimitive(P, true);
  if (IE8_DOM_DEFINE) try {
    return gOPD(O, P);
  } catch (e) { /* empty */ }
  if (has(O, P)) return createDesc(!pIE.f.call(O, P), O[P]);
};


/***/ }),
/* 134 */
/***/ (function(module, exports, __webpack_require__) {

__webpack_require__(44)('asyncIterator');


/***/ }),
/* 135 */
/***/ (function(module, exports, __webpack_require__) {

__webpack_require__(44)('observable');


/***/ }),
/* 136 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0_babel_runtime_helpers_classCallCheck__ = __webpack_require__(137);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0_babel_runtime_helpers_classCallCheck___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_0_babel_runtime_helpers_classCallCheck__);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1_babel_runtime_helpers_createClass__ = __webpack_require__(138);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1_babel_runtime_helpers_createClass___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_1_babel_runtime_helpers_createClass__);


// Phantom Limb
// ------------
// http://viewinglens.com/phantom-limb
// https://github.com/brian-c/phantom-limb
// brian.carstensen@gmail.com

// Default configuration
var config = {
  style: true,
  startOnLoad: true

  // Apply overrides
};for (var param in window.phantomLimbConfig) {
  config[param] = window.phantomLimbConfig[param];
}

// Keep track of whether the mouse is down.
var mouseIsDown = false;

// We'll instantiate the fingers when we start.
var fingers = [];

// Create a synthetic event from a real event and a finger.
var createMouseEvent = function createMouseEvent(eventName, originalEvent, finger) {
  var e = document.createEvent('MouseEvent');

  e.initMouseEvent(eventName, true, true, originalEvent.view, originalEvent.detail, finger.x || originalEvent.screenX, finger.y || originalEvent.screenY, finger.x || originalEvent.clientX, finger.y || originalEvent.clientY, originalEvent.ctrlKey, originalEvent.shiftKey, originalEvent.altKey, originalEvent.metaKey, originalEvent.button, finger.target || originalEvent.relatedTarget);

  e.synthetic = true;

  // Set this so we can match shared targets later.
  e._finger = finger;

  return e;
};

// Given a mouse event, fire a touch event for each finger.
// Add the appropriate touch-specific event properties.
var fireTouchEvents = function fireTouchEvents(eventName, originalEvent) {
  // All touch events, including "touchend".
  var events = [];
  var gestures = [];

  // For each finger with a target, create a touch event.
  fingers.forEach(function (finger) {
    if (!finger.target) return;

    // Convert "ontouch*" properties and attributes to listeners.
    var onEventName = 'on' + eventName;

    if (onEventName in finger.target) {
      console.warn('Converting `' + onEventName + '` property to event listener.', finger.target);
      finger.target.addEventListener(eventName, finger.target[onEventName], false);
      delete finger.target[onEventName];
    }

    if (finger.target.hasAttribute(onEventName)) {
      console.warn('Converting `' + onEventName + '` attribute to event listener.', finger.target);
      var handler = new Function('event', finger.target.getAttribute(onEventName));
      finger.target.addEventListener(eventName, handler, false);
      finger.target.removeAttribute(onEventName);
    }

    // Set up a new event with the coordinates of the finger.
    var touch = createMouseEvent(eventName, originalEvent, finger);

    events.push(touch);
  });

  // Figure out scale and rotation.
  if (events.length > 1) {
    var x = events[0].pageX - events[1].pageX;
    var y = events[0].pageY - events[1].pageY;

    var distance = Math.sqrt(Math.pow(x, 2) + Math.pow(y, 2));
    var angle = Math.atan2(x, y) * (180 / Math.PI);

    var gestureName = 'gesturechange';

    if (eventName === 'touchstart') {
      gestureName = 'gesturestart';
      startDistance = distance;
      startAngle = angle;
    }

    if (eventName === 'touchend') gestureName = 'gestureend';

    events.forEach(function (event) {
      var gesture = createMouseEvent(gestureName, event, event._finger);
      gestures.push(gesture);
    });

    events.concat(gestures).forEach(function (event) {
      event.scale = distance / startDistance;
      event.rotation = startAngle - angle;
    });
  }

  // Loop through the events array and fill in each touch array.
  events.forEach(function (touch) {
    touch.touches = events.filter(function (e) {
      return ~e.type.indexOf('touch') && e.type !== 'touchend';
    });

    touch.changedTouches = events.filter(function (e) {
      return ~e.type.indexOf('touch') && e._finger.target === touch._finger.target;
    });

    touch.targetTouches = touch.changedTouches.filter(function (e) {
      return ~e.type.indexOf('touch') && e.type !== 'touchend';
    });
  });

  // Then fire the events.
  events.concat(gestures).forEach(function (event, i) {
    event.identifier = i;
    event._finger.target.dispatchEvent(event);
  });
};

var startDistance = NaN;
var startAngle = NaN;

// Prevent all mousedown event from doing anything.
// We'll fire one manually at touchend.
var phantomTouchStart = function phantomTouchStart(e) {
  if (e.synthetic) return;

  mouseIsDown = true;

  e.preventDefault();
  e.stopPropagation();

  fireTouchEvents('touchstart', e);
};

// The center between two fingers
var centerX = NaN;
var centerY = NaN;

// Set each finger's position target.
// Pressing alt engages the second finger.
// Pressing shift locks the second finger's position relative to the first's.
var moveFingers = function moveFingers(e) {
  // We'll use this if the second is locked with the first.
  var changeX = e.clientX - fingers[0].x || 0;
  var changeY = e.clientY - fingers[0].y || 0;

  // The first finger just follows the mouse.
  fingers[0].move(e.clientX, e.clientY);

  // TODO: Determine modifier keys independent of mouse movement.

  if (e.altKey) {
    // Reset the center.
    if (!centerX && !centerY) {
      centerX = innerWidth / 2;
      centerY = innerHeight / 2;
    }

    // Lock the center with the first finger.
    if (e.shiftKey) {
      centerX += changeX;
      centerY += changeY;
    }

    var secondX = centerX + (centerX - e.clientX);
    var secondY = centerY + (centerY - e.clientY);

    fingers[1].move(secondX, secondY);
  } else {
    // Disengage the second finger.
    fingers[1].move(NaN, NaN);

    // Reset the center next time the alt key is held.
    centerX = NaN;
    centerY = NaN;
  }
};

// Prevent all mousemove events from firing.
// We'll fire one (and only one) manually at touchend.
var phantomTouchMove = function phantomTouchMove(e) {
  if (e.synthetic) return;

  e.preventDefault();
  e.stopPropagation();

  moveFingers(e);

  if (mouseIsDown) {
    fireTouchEvents('touchmove', e);
  }
};

// Prevent all mouseup events from firing.
// We'll fire one manually at touchend.
var phantomTouchEnd = function phantomTouchEnd(e) {
  if (e.synthetic) return;

  mouseIsDown = false;

  e.preventDefault();
  e.stopPropagation();

  fireTouchEvents('touchend', e);

  fingers.forEach(function (finger) {
    if (!finger.target) return;

    // Mobile Safari moves all the mouse event to fire after the touchend event.
    finger.target.dispatchEvent(createMouseEvent('mouseover', e, finger));
    finger.target.dispatchEvent(createMouseEvent('mousemove', e, finger));
    finger.target.dispatchEvent(createMouseEvent('mousedown', e, finger));

    // TODO: These two only fire if content didn't change. How can we tell?
    finger.target.dispatchEvent(createMouseEvent('mouseup', e, finger));
    finger.target.dispatchEvent(createMouseEvent('click', e, finger));
  });
};

// Prevent clicks. We'll handle them manually.
var phantomClick = function phantomClick(e) {
  if (e.synthetic) return;

  e.preventDefault();
  e.stopPropagation();
};

// Not entirely proud of this, but I can't serve CSS from GitHub
// and I want the bookmarklet to be as simple as possible.
var defaultCSS = ['._phantom-limb,', '._phantom-limb a {', 'cursor: none !important;', '}', '._phantom-limb_finger {', 'background: rgba(128, 128, 128, 0.5);', 'border: 2px solid rgb(128, 128, 128);', 'border-radius: 50%;', 'display: none;', 'width: 20px;', 'height: 20px;', 'margin: -10px 0 0 -10px;', 'pointer-events: none;', 'position: fixed;', 'z-index: 999999' + '}', '._phantom-limb ._phantom-limb_finger {', 'display: block;', '}'].join('\n');

if (config.style) {
  var styleTag = document.createElement('style');
  styleTag.id = '_phantom-limb_default-style';
  styleTag.innerHTML = defaultCSS;
  document.querySelector('head').appendChild(styleTag);
}

// On/off switch
var hide = function hide() {
  document.documentElement.classList.remove('_phantom-limb');
};

var show = function show() {
  document.documentElement.classList.add('_phantom-limb');
};

var start = function start() {
  var ua = navigator.userAgent.toLowerCase();
  if (/(mobile|android|iphone)/i.test(ua)) return;
  console.warn('[phantom-limb]: The environment is not mobile. Use phantom-limb.js to emulate @touch event');
  if (fingers.length === 0) fingers.push(new Finger(), new Finger());

  document.addEventListener('mousedown', phantomTouchStart, true);
  document.addEventListener('mousemove', phantomTouchMove, true);
  document.addEventListener('mouseup', phantomTouchEnd, true);
  document.addEventListener('click', phantomClick, true);

  show();
};

var stop = function stop() {
  document.removeEventListener('mousedown', phantomTouchStart, true);
  document.removeEventListener('mousemove', phantomTouchMove, true);
  document.removeEventListener('mouseup', phantomTouchEnd, true);
  document.removeEventListener('click', phantomClick, true);

  hide();
};

// Detect keyup, exit when esc.
var phantomKeyUp = function phantomKeyUp(e) {
  if (e.keyCode === 27) {
    if (document.documentElement.classList.contains('_phantom-limb')) {
      stop();
    } else {
      start();
    }
  }
};

document.addEventListener('keyup', phantomKeyUp, false);

// if (config.startOnLoad) addEventListener('DOMContentLoaded', start, false)

// A Finger is a representation on the screen.
// It keeps track of its position and the node that it's over.

var Finger = function () {
  function Finger() {
    __WEBPACK_IMPORTED_MODULE_0_babel_runtime_helpers_classCallCheck___default()(this, Finger);

    this.x = NaN;
    this.y = NaN;

    this.target = null;
    this.node = document.createElement('span');
    this.node.classList.add('_phantom-limb_finger');
    this.place();
  }

  __WEBPACK_IMPORTED_MODULE_1_babel_runtime_helpers_createClass___default()(Finger, [{
    key: 'place',
    value: function place() {
      document.body.appendChild(this.node);
    }
  }, {
    key: 'hide',
    value: function hide() {
      this.node.style.display = 'none';
    }
  }, {
    key: 'show',
    value: function show() {
      this.node.style.display = '';
    }
  }, {
    key: 'move',
    value: function move(x, y) {
      if (isNaN(x) || isNaN(y)) {
        this.hide();
        this.target = null;
      } else {
        this.show();

        this.node.style.left = x + 'px';
        this.node.style.top = y + 'px';

        this.x = x;
        this.y = y;

        if (!mouseIsDown) this.target = document.elementFromPoint(x, y);
      }
    }
  }]);

  return Finger;
}();

/* harmony default export */ __webpack_exports__["a"] = ({
  start: start, stop: stop, hide: hide, show: show
});

/***/ }),
/* 137 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


exports.__esModule = true;

exports.default = function (instance, Constructor) {
  if (!(instance instanceof Constructor)) {
    throw new TypeError("Cannot call a class as a function");
  }
};

/***/ }),
/* 138 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


exports.__esModule = true;

var _defineProperty = __webpack_require__(139);

var _defineProperty2 = _interopRequireDefault(_defineProperty);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

exports.default = function () {
  function defineProperties(target, props) {
    for (var i = 0; i < props.length; i++) {
      var descriptor = props[i];
      descriptor.enumerable = descriptor.enumerable || false;
      descriptor.configurable = true;
      if ("value" in descriptor) descriptor.writable = true;
      (0, _defineProperty2.default)(target, descriptor.key, descriptor);
    }
  }

  return function (Constructor, protoProps, staticProps) {
    if (protoProps) defineProperties(Constructor.prototype, protoProps);
    if (staticProps) defineProperties(Constructor, staticProps);
    return Constructor;
  };
}();

/***/ }),
/* 139 */
/***/ (function(module, exports, __webpack_require__) {

module.exports = { "default": __webpack_require__(140), __esModule: true };

/***/ }),
/* 140 */
/***/ (function(module, exports, __webpack_require__) {

__webpack_require__(141);
var $Object = __webpack_require__(0).Object;
module.exports = function defineProperty(it, key, desc) {
  return $Object.defineProperty(it, key, desc);
};


/***/ }),
/* 141 */
/***/ (function(module, exports, __webpack_require__) {

var $export = __webpack_require__(3);
// 19.1.2.4 / 15.2.3.6 Object.defineProperty(O, P, Attributes)
$export($export.S + $export.F * !__webpack_require__(6), 'Object', { defineProperty: __webpack_require__(4).f });


/***/ }),
/* 142 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony default export */ __webpack_exports__["a"] = ({});

/***/ }),
/* 143 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0_babel_runtime_helpers_extends__ = __webpack_require__(10);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0_babel_runtime_helpers_extends___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_0_babel_runtime_helpers_extends__);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__env__ = __webpack_require__(11);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2__wechat__ = __webpack_require__(69);




var SnsShare = {
	setShareMsg: function setShareMsg() {
		var opt = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : {};
		var callback = arguments[1];

		var shareConfig = {
			imgUrl: opt.image_url || document.getElementById('share-image').getAttribute('content'),
			link: opt.link_url || document.getElementById('share-link').getAttribute('content') || window.location.href,
			desc: opt.text || document.getElementById('share-text').getAttribute('content'),
			title: opt.title || document.getElementById('share-title').getAttribute('content'),
			success: function success() {
				if (typeof opt.shareSuccess === 'function') {
					opt.shareSuccess();
				}
			}
		};

		document.getElementById('share-image').setAttribute('content', shareConfig.imgUrl);
		document.getElementById('share-link').setAttribute('content', shareConfig.link);
		document.getElementById('share-text').setAttribute('content', shareConfig.desc);
		document.getElementById('share-title').setAttribute('content', shareConfig.title);

		if (__WEBPACK_IMPORTED_MODULE_1__env__["a" /* default */].isWechat()) {
			__WEBPACK_IMPORTED_MODULE_2__wechat__["a" /* default */].init(__WEBPACK_IMPORTED_MODULE_0_babel_runtime_helpers_extends___default()({}, opt, shareConfig), callback);
		} else {
			if (typeof callback === 'function') callback();
		}
	}
};

/* harmony default export */ __webpack_exports__["a"] = (SnsShare);

/***/ }),
/* 144 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__config__ = __webpack_require__(46);

/* harmony default export */ __webpack_exports__["a"] = (function (obj) {
	if (!obj && !obj.path) return;

	var data = 'release_platform=' + __WEBPACK_IMPORTED_MODULE_0__config__["a" /* default */].appPlatform + '&release_version=' + (obj.releaseVersion || __WEBPACK_IMPORTED_MODULE_0__config__["a" /* default */].appVersion) + '&_=' + Date.parse(new Date());

	var hosts;
	if (obj.host === 'cdn') {
		hosts = __WEBPACK_IMPORTED_MODULE_0__config__["a" /* default */].api.cdn;
		data += '&___from=api-cdn&___cdn_cache_time=' + (obj.cdnCacheTime || __WEBPACK_IMPORTED_MODULE_0__config__["a" /* default */].cdnCacheTime);
	} else if (obj.host === 'cpma') {
		hosts = __WEBPACK_IMPORTED_MODULE_0__config__["a" /* default */].api.cpma;
	} else if (obj.host) {
		hosts = obj.host;
	} else {
		hosts = __WEBPACK_IMPORTED_MODULE_0__config__["a" /* default */].api.default;
	}
	var url = hosts + (obj.version || 'v3') + '/' + obj.path + '.json';

	if (obj.method) obj.method = obj.method.toUpperCase();

	if (obj.data) {
		for (var key in obj.data) {
			data += '&' + key + '=' + obj.data[key];
		}

		// get 和 delete 的时候data放到query
		if (!obj.method || obj.method.toLowerCase() === 'get' || obj.method.toLowerCase() === 'delete') {
			url = url + '?' + data.replace(/^&/, '');
			data = null;
		}
	}

	var xhr = new XMLHttpRequest();
	// 兼容静态接口, 可选是否发送cookie
	xhr.withCredentials = true;
	if (obj.hasOwnProperty('cookie')) {
		xhr.withCredentials = obj.cookie;
	}

	xhr.responseType = "json";
	xhr.onload = function () {
		this.status === 200 ? obj.success(this.response, { status: this.status }) : '';
	};
	xhr.onerror = function (res) {
		obj.error(this.response);
	};
	xhr.timeout = obj.timeout || 15000;
	xhr.ontimeout = function () {
		obj.ontimeout();
	};
	xhr.open(obj.method || 'GET', url, true);
	xhr.setRequestHeader("Content-Type", "application/x-www-form-urlencoded;");
	xhr.send(data);
});

/***/ }),
/* 145 */
/***/ (function(module, exports, __webpack_require__) {

var core = __webpack_require__(0);
var $JSON = core.JSON || (core.JSON = { stringify: JSON.stringify });
module.exports = function stringify(it) { // eslint-disable-line no-unused-vars
  return $JSON.stringify.apply($JSON, arguments);
};


/***/ }),
/* 146 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__web_url__ = __webpack_require__(17);


var getRoutes = function getRoutes(url) {
	if (!url) return '';
	var route = url;

	var action = route.replace(/^(meijiabang:\/\/)?([\w\-]+).*/, '$2');
	var h5Uri = '',
	    regMatch = '';
	var statsRoute = void 0,
	    statsValue = void 0;

	switch (action) {
		case 'goods_details':
			var goodId = __WEBPACK_IMPORTED_MODULE_0__web_url__["a" /* default */].getUrlParam('goods_id', route);
			h5Uri = '#!mall-goods/' + goodId;
			break;
		case 'mall_index':
			h5Uri = '#!mall';
			break;
		case 'flash_sale_list':
			h5Uri = '#!flash_sales';
			break;
		case 'opus_search_index':
			break;
		case 'course_index':
			break;
		case 'job_index':
			//statsRoute = '招聘首页';
			break;
		case 'goods_search':
			var keyword = __WEBPACK_IMPORTED_MODULE_0__web_url__["a" /* default */].getUrlParam('keyword', route);
			//statsRoute = '商品搜索';
			statsValue = keyword;
			break;
		case 'goods_list':
		case 'category_navigator_goods_list':
			var categoryId = __WEBPACK_IMPORTED_MODULE_0__web_url__["a" /* default */].getUrlParam('category_id', route);
			var title = __WEBPACK_IMPORTED_MODULE_0__web_url__["a" /* default */].getUrlParam('title', route);
			var searchContent = 'category_id-' + categoryId + '--title-' + decodeURI(title) + '__';
			h5Uri = '#!mall-search/' + searchContent;
			statsValue = searchContent;
			break;
		case 'circle_index':
			h5Uri = '#!community';
			break;
		case 'user_details':
			var uid = __WEBPACK_IMPORTED_MODULE_0__web_url__["a" /* default */].getUrlParam('uid', route);
			statsValue = uid;
			break;
		case 'topic':
			regMatch = route.match(/^topic\/(\d+)/);
			var topicId = '';
			__WEBPACK_IMPORTED_MODULE_0__web_url__["a" /* default */].getUrlParam('id', route) ? topicId = __WEBPACK_IMPORTED_MODULE_0__web_url__["a" /* default */].getUrlParam('id', route) : topicId = regMatch[1];
			h5Uri = '#!topic/' + topicId;
			statsValue = topicId;
			break;
		case 'course':
			var courseId = __WEBPACK_IMPORTED_MODULE_0__web_url__["a" /* default */].getUrlParam('id', route);
			h5Uri = '#!course/' + courseId;
			statsValue = courseId;
			break;
		case 'opus':
			var shareId = __WEBPACK_IMPORTED_MODULE_0__web_url__["a" /* default */].getUrlParam('id', route);
			h5Uri = '#!share/' + shareId;
			//statsRoute = '图片';
			statsValue = shareId;
			break;
		case 'live_rooms':
			regMatch = route.match(/live_rooms\/(\d+)?/);
			var liveId = regMatch[1];
			h5Uri = '#!live/' + liveId;
			statsRoute = '直播';
			statsValue = liveId;
			break;
		case 'openurl_in_app':
		case 'openurl_out_app':
			var openUrl = __WEBPACK_IMPORTED_MODULE_0__web_url__["a" /* default */].getUrlParam('url', route);
			h5Uri = decodeURIComponent(openUrl);
			statsRoute = 'openurl';
			statsValue = openUrl;
			break;
		case 'openurl':
		case 'openurl2':
		case 'openurl3':
			regMatch = route.match(/^openurl\d?\/(.+)/);
			var url = regMatch[1];
			url = decodeURIComponent(url);
			h5Uri = url;
			statsRoute = 'openurl';
			statsValue = url;
			break;
		case 'show_image':
			return;
		default:
			statsRoute = route.replace('meijiabang://', '');
			break;
	}

	return {
		h5Route: h5Uri,
		appRoute: route
	};
};

/* harmony default export */ __webpack_exports__["a"] = (getRoutes);

/***/ }),
/* 147 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__config_index__ = __webpack_require__(46);


/* harmony default export */ __webpack_exports__["a"] = (function () {
	var style = document.createElement('style');
	var download = document.createElement('div');
	style.innerHTML = '#download-meijiabang{position:fixed;top:0;left:0;width:100%;height:100%;background:rgba(0,0,0,0.7);z-index:10000}#download-meijiabang .download-box{position:absolute;top:0;left:0;right:0;bottom:0;margin:auto;width:5.5rem;height:13.6rem}#download-meijiabang .download-box .img1{width:5.5rem}#download-meijiabang .download-box .img2{width:5.5rem}#download-meijiabang .download-box .img3{width:5.5rem}#download-meijiabang .download-box .close{position:absolute;top:-0.75rem;right:-0.75rem;width:.85rem}';
	download.innerHTML = '<div class="download-box">' + '<img class="img1" src="//m.meijiabang.cn/img/download-tips/1.png">' + '<img class="img2" src="//m.meijiabang.cn/img/download-tips/2.png">' + '<a href="' + __WEBPACK_IMPORTED_MODULE_0__config_index__["a" /* default */].downloadAppUrl + __WEBPACK_IMPORTED_MODULE_0__config_index__["a" /* default */].downloadAppDefaultSource + '"><img class="img3" src="//m.meijiabang.cn/img/download-tips/3.png"></a>' + '<img class="close" onClick="this.parentNode.parentNode.remove();" src="//m.meijiabang.cn/img/download-tips/close.png">' + '</div>';
	download.id = 'download-meijiabang';
	document.body.appendChild(style);
	document.body.appendChild(download);
});

/***/ }),
/* 148 */
/***/ (function(module, exports) {

module.exports={render:function (){var _vm=this;var _h=_vm.$createElement;var _c=_vm._self._c||_h;
  return _c('div', {
    staticStyle: {
      width: "750px"
    },
    style: {
      'background-color': _vm.bgColor
    }
  }, [_vm._t("default"), _c('login-box', {
    ref: "login",
    on: {
      "callback": _vm.loginCallbackFunction
    }
  }), (_vm.showModal && (_vm.deviceModel !== 'unknown' || _vm.bundleName)) ? _c('modal-box', {
    attrs: {
      "src": _vm.modalImage,
      "text": _vm.modalText
    }
  }) : _vm._e()], 2)
},staticRenderFns: []}

/***/ }),
/* 149 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
Object.defineProperty(__webpack_exports__, "__esModule", { value: true });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__index_vue__ = __webpack_require__(150);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__index_vue___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_0__index_vue__);
/* harmony reexport (default from non-hamory) */ __webpack_require__.d(__webpack_exports__, "default", function() { return __WEBPACK_IMPORTED_MODULE_0__index_vue___default.a; });


/***/ }),
/* 150 */
/***/ (function(module, exports, __webpack_require__) {

var __vue_exports__, __vue_options__
var __vue_styles__ = []

/* styles */
__vue_styles__.push(__webpack_require__(151)
)

/* script */
__vue_exports__ = __webpack_require__(152)

/* template */
var __vue_template__ = __webpack_require__(158)
__vue_options__ = __vue_exports__ = __vue_exports__ || {}
if (
  typeof __vue_exports__.default === "object" ||
  typeof __vue_exports__.default === "function"
) {
__vue_options__ = __vue_exports__ = __vue_exports__.default
}
if (typeof __vue_options__ === "function") {
  __vue_options__ = __vue_options__.options
}

__vue_options__.render = __vue_template__.render
__vue_options__.staticRenderFns = __vue_template__.staticRenderFns
__vue_options__._scopeId = "data-v-781fb65e"
__vue_options__.style = __vue_options__.style || {}
__vue_styles__.forEach(function (module) {
  for (var name in module) {
    __vue_options__.style[name] = module[name]
  }
})
if (typeof __register_static_styles__ === "function") {
  __register_static_styles__(__vue_options__._scopeId, __vue_styles__)
}

module.exports = __vue_exports__


/***/ }),
/* 151 */
/***/ (function(module, exports) {

module.exports = {
  "time-wrapper": {
    "position": "relative",
    "flexDirection": "row",
    "alignItems": "center",
    "justifyContent": "center",
    "minHeight": "90"
  },
  "time-box": {
    "minHeight": "90"
  },
  "time-image": {
    "width": "750",
    "minHeight": "90"
  },
  "time-text-box": {
    "position": "absolute",
    "top": 0,
    "left": 0,
    "width": 100,
    "height": 100,
    "justifyContent": "center",
    "alignItems": "center",
    "flexDirection": "row"
  },
  "time-text": {
    "marginRight": "7",
    "fontSize": "28"
  },
  "time-text-end": {
    "marginLeft": "-200"
  }
}

/***/ }),
/* 152 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
Object.defineProperty(__webpack_exports__, "__esModule", { value: true });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__wx_countdown_vue__ = __webpack_require__(153);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__wx_countdown_vue___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_0__wx_countdown_vue__);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__style_js__ = __webpack_require__(157);
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//




/* harmony default export */ __webpack_exports__["default"] = ({
	name: 'countdown',
	components: { WxcCountdown: __WEBPACK_IMPORTED_MODULE_0__wx_countdown_vue___default.a },
	props: {
		width: {
			type: String
		},
		height: {
			type: String
		},
		imageSrc: {
			type: String
		},
		color: {
			type: String,
			default: '#000000'
		},
		itemStyle: {
			type: [String, Number]
		},
		timeInterval: {
			type: Array,
			default: function _default() {
				return [];
			}
		}
	},
	watch: {
		timeInterval: function timeInterval(newVal, oldVal) {
			this.setAttr();
			this.setInfo();
		},
		imageSrc: function imageSrc() {
			console.log('change img');
			this.setAttr();
			this.setInfo();
		},
		itemStyle: function itemStyle() {
			this.setAttr();
			this.setInfo();
		}
	},
	data: function data() {
		return {
			isEnd: false,
			newValue: '',
			oldValue: '',

			time: new Date().getTime(),
			hideTime: new Date().getTime(),
			text: {},
			tpl: '{d}\u5929{h}:{m}:{s}',
			hideTpl: '{d}\u5929{h}:{m}:{s}',

			startTime: 0,
			endTime: 0
		};
	},

	computed: {
		style: function style() {
			var style = {};
			this.itemStyle = parseInt(this.itemStyle);
			this.itemStyle === 2 ? style = Object(__WEBPACK_IMPORTED_MODULE_1__style_js__["a" /* deep */])(this.color) : style = Object(__WEBPACK_IMPORTED_MODULE_1__style_js__["b" /* tint */])(this.color);
			return style;
		},
		imgHeight: function imgHeight() {
			if (this.width && this.height) {
				var width = parseInt(this.width.replace(/px/g, ''));
				var height = parseInt(this.height.replace(/px/g, ''));

				var imgHeight = height * 750 / width + 'px';

				return imgHeight;
			}

			return '90px';
		}
	},
	methods: {
		setInfo: function setInfo() {
			//初始化设置时间
			var time = new Date().getTime();
			var startTime = parseInt(this.startTime) || this.startTime;
			var endTime = parseInt(this.endTime) || this.endTime;

			this.isEnd = false;

			if (time < startTime) {
				this.time = startTime;
				this.text = { start: '活动还有', end: '开始' };
			} else if (startTime <= time && time < endTime) {
				this.time = endTime;
				this.text = { start: '活动还剩', end: '结束' };
			} else {
				this.isEnd = true;
			}

			var dayTime = 1000 * 60 * 60 * 24;
			if (this.time - new Date().getTime() <= dayTime) {
				this.tpl = '{h}:{m}:{s}';
			} else {
				this.tpl = '{d}\u5929{h}:{m}:{s}';
			}
		},
		onCompleted: function onCompleted() {
			this.setInfo();
		},
		timeRun: function timeRun(time) {
			var p = parseInt;
			var day = time.day,
			    hour = time.hour,
			    minute = time.minute,
			    second = time.second;


			day = p(day);
			hour = p(hour);
			minute = p(minute);
			second = p(second);

			day <= 0 ? this.tpl = '{h}:{m}:{s}' : '';
			// 状态更改重新跑一遍设置
			if (day <= 0 && hour <= 0 && minute <= 0 && second <= 0) {
				this.setAttr();
				this.setInfo();
			}
		},
		setAttr: function setAttr() {
			var timeInterval = this.timeInterval.map(function (item) {
				var _item = new Date().getTime();
				if (Number(item)) {
					_item = Number(item);
				} else if (typeof item === 'string') {
					_item = new Date(item).getTime();
				} else if (item === '' || !item) {
					_item = new Date().getTime();
				} else if (item instanceof Date) {
					_item = item.getTime();
				}
				return _item;
			});

			this.startTime = timeInterval[0];
			this.endTime = timeInterval[1];
		}
	},
	created: function created() {
		this.setAttr();
		this.setInfo();
	},
	mounted: function mounted() {
		// console.log('mounted asjkdhwiudih')
	}
});

/***/ }),
/* 153 */
/***/ (function(module, exports, __webpack_require__) {

var __vue_exports__, __vue_options__
var __vue_styles__ = []

/* styles */
__vue_styles__.push(__webpack_require__(154)
)

/* script */
__vue_exports__ = __webpack_require__(155)

/* template */
var __vue_template__ = __webpack_require__(156)
__vue_options__ = __vue_exports__ = __vue_exports__ || {}
if (
  typeof __vue_exports__.default === "object" ||
  typeof __vue_exports__.default === "function"
) {
__vue_options__ = __vue_exports__ = __vue_exports__.default
}
if (typeof __vue_options__ === "function") {
  __vue_options__ = __vue_options__.options
}

__vue_options__.render = __vue_template__.render
__vue_options__.staticRenderFns = __vue_template__.staticRenderFns
__vue_options__._scopeId = "data-v-9dcaf4f0"
__vue_options__.style = __vue_options__.style || {}
__vue_styles__.forEach(function (module) {
  for (var name in module) {
    __vue_options__.style[name] = module[name]
  }
})
if (typeof __register_static_styles__ === "function") {
  __register_static_styles__(__vue_options__._scopeId, __vue_styles__)
}

module.exports = __vue_exports__


/***/ }),
/* 154 */
/***/ (function(module, exports) {

module.exports = {
  "time-dot-wrap": {
    "flexDirection": "row",
    "alignItems": "center"
  }
}

/***/ }),
/* 155 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
Object.defineProperty(__webpack_exports__, "__esModule", { value: true });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0_babel_runtime_helpers_extends__ = __webpack_require__(10);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0_babel_runtime_helpers_extends___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_0_babel_runtime_helpers_extends__);

//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//

/* harmony default export */ __webpack_exports__["default"] = ({
  props: {
    // 时间戳
    time: {
      type: Number,
      default: 1501200000000
    },
    // 倒计时的间隔,单位为"毫秒"
    interval: {
      type: Number,
      default: 1000
    },
    tpl: {
      type: String,
      default: '{h}:{m}:{s}'
    },
    // 最外层包裹 style
    timeWrapStyle: Object,
    // 数字盒子 style
    timeBoxStyle: Object,
    // : 盒子Style
    dotBoxStyle: Object,
    // 数字文字 Style
    timeTextStyle: Object,
    // : 文字Style
    dotTextStyle: Object
  },
  data: function data() {
    return {
      NOW_DATE: new Date().getTime(),
      completed: false,
      tplIndexOfDays: -1,
      tplIndexOfHours: -1,
      tplIndexOfMinutes: -1,
      tplIndexOfSeconds: -1,
      TIME_WRAP_STYLE: {
        flexDirection: 'row',
        alignItems: 'center',
        marginLeft: '12px',
        marginRight: '12px'
      },
      TIME_BOX_STYLE: {
        flexDirection: 'row',
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: '#333333',
        height: '30px',
        width: '30px'
      },
      DOT_BOX_STYLE: {
        width: '18px',
        flexDirection: 'row',
        justifyContent: 'center',
        alignItems: 'center'
      },
      TIME_TEXT_STYLE: {
        color: '#FFCC80',
        fontSize: '18px'
      },
      DOT_TEXT_STYLE: {
        color: '#333333',
        fontSize: '18px',
        fontWeight: 'bold',
        textAlign: 'center'
      }
    };
  },
  mounted: function mounted() {
    var _this = this;

    setInterval(function () {
      _this.NOW_DATE = new Date().getTime();
      _this.$emit('wxTimeRun', _this.countDownData);
    }, this.interval);

    this.tplIndexOfDays = this.tpl.indexOf('d');
    this.tplIndexOfHours = this.tpl.indexOf('h');
    this.tplIndexOfMinutes = this.tpl.indexOf('m');
    this.tplIndexOfSeconds = this.tpl.indexOf('s');
  },

  watch: {
    //2018/02/26 by harvey in mooyoo
    tpl: function tpl() {
      this.tplIndexOfDays = this.tpl.indexOf('d');
      this.tplIndexOfHours = this.tpl.indexOf('h');
      this.tplIndexOfMinutes = this.tpl.indexOf('m');
      this.tplIndexOfSeconds = this.tpl.indexOf('s');
    }
  },
  computed: {
    mrTimeWrapStyle: function mrTimeWrapStyle() {
      return __WEBPACK_IMPORTED_MODULE_0_babel_runtime_helpers_extends___default()({}, this.TIME_WRAP_STYLE, this.timeWrapStyle);
    },
    mrTimeBoxStyle: function mrTimeBoxStyle() {
      return __WEBPACK_IMPORTED_MODULE_0_babel_runtime_helpers_extends___default()({}, this.TIME_BOX_STYLE, this.timeBoxStyle);
    },
    mrDotBoxStyle: function mrDotBoxStyle() {
      return __WEBPACK_IMPORTED_MODULE_0_babel_runtime_helpers_extends___default()({}, this.DOT_BOX_STYLE, this.dotBoxStyle);
    },
    mrTimeTextStyle: function mrTimeTextStyle() {
      return __WEBPACK_IMPORTED_MODULE_0_babel_runtime_helpers_extends___default()({}, this.TIME_TEXT_STYLE, this.timeTextStyle);
    },
    mrDotTextStyle: function mrDotTextStyle() {
      return __WEBPACK_IMPORTED_MODULE_0_babel_runtime_helpers_extends___default()({}, this.DOT_TEXT_STYLE, this.dotTextStyle);
    },
    countDownData: function countDownData() {
      var timeSpacing = this.time - this.NOW_DATE;

      // 倒计时结束了
      if (timeSpacing < 0) {
        if (this.completed === false) {
          this.$emit('wxcOnComplete');
        }
        // this.completed = true;
        return {
          day: '00',
          hour: '00',
          minute: '00',
          second: '00'
        };
      }

      var day = 0;
      var hour = 0;
      var minute = 0;
      var second = 0;

      if (this.tplIndexOfDays !== -1) {
        day = Math.floor(timeSpacing / (24 * 60 * 60 * 1000));
        hour = Math.floor(timeSpacing % (24 * 60 * 60 * 1000) / (60 * 60 * 1000));
      } else {
        day = 0;
        hour = Math.floor(timeSpacing / (60 * 60 * 1000));
      }

      if (this.tplIndexOfHours !== -1) {
        hour = Math.floor((timeSpacing - day * 24 * 60 * 60 * 1000) / (60 * 60 * 1000));
        minute = Math.floor((timeSpacing - day * 24 * 60 * 60 * 1000) % (60 * 60 * 1000) / (60 * 1000));
      } else {
        hour = 0;
        minute = Math.floor((timeSpacing - day * 24 * 60 * 60 * 1000) / (60 * 1000));
      }

      if (this.tplIndexOfMinutes !== -1) {
        minute = Math.floor((timeSpacing - day * 24 * 60 * 60 * 1000 - hour * 60 * 60 * 1000) / (60 * 1000));
        second = Math.floor((timeSpacing - day * 24 * 60 * 60 * 1000 - hour * 60 * 60 * 1000) % (60 * 1000) / 1000);
      } else {
        minute = 0;
        second = Math.floor((timeSpacing - day * 24 * 60 * 60 * 1000 - hour * 60 * 60 * 1000) / 1000);
      }

      return {
        day: day < 10 ? '0' + day : '' + day,
        hour: hour < 10 ? '0' + hour : '' + hour,
        minute: minute < 10 ? '0' + minute : '' + minute,
        second: second < 10 ? '0' + second : '' + second
      };
    }
  },

  methods: {
    getDot: function getDot(prevTagIndex) {
      var nextTagIndex = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : -1;

      if (nextTagIndex === -1) {
        return this.tpl.slice(prevTagIndex + 2);
      }
      return this.tpl.slice(prevTagIndex + 2, nextTagIndex - 1);
    }
  }
});

/***/ }),
/* 156 */
/***/ (function(module, exports) {

module.exports={render:function (){var _vm=this;var _h=_vm.$createElement;var _c=_vm._self._c||_h;
  return _c('div', {
    style: _vm.mrTimeWrapStyle
  }, [_c('div', {
    staticClass: ["time-dot-wrap"]
  }, [(_vm.tplIndexOfDays !== -1) ? _c('div', {
    style: _vm.mrTimeBoxStyle,
    attrs: {
      "accessible": true,
      "ariaLabel": ((_vm.countDownData.day) + "天")
    }
  }, [_c('text', {
    style: _vm.mrTimeTextStyle
  }, [_vm._v(_vm._s(_vm.countDownData.day))])]) : _vm._e(), (_vm.tplIndexOfDays !== -1) ? _c('div', {
    style: _vm.mrDotBoxStyle,
    attrs: {
      "ariaHidden": true
    }
  }, [_c('text', {
    style: _vm.mrDotTextStyle
  }, [_vm._v(_vm._s(_vm.getDot(_vm.tplIndexOfDays, _vm.tplIndexOfHours)))])]) : _vm._e(), (_vm.tplIndexOfHours !== -1) ? _c('div', {
    style: _vm.mrTimeBoxStyle,
    attrs: {
      "accessible": true,
      "ariaLabel": ((_vm.countDownData.hour) + "时")
    }
  }, [_c('text', {
    style: _vm.mrTimeTextStyle
  }, [_vm._v(_vm._s(_vm.countDownData.hour))])]) : _vm._e(), (_vm.tplIndexOfHours !== -1) ? _c('div', {
    style: {
      'width': '20px',
      'height': '36px'
    },
    attrs: {
      "ariaHidden": true
    }
  }, [_c('text', {
    style: _vm.mrDotTextStyle
  }, [_vm._v(_vm._s(_vm.getDot(_vm.tplIndexOfHours, _vm.tplIndexOfMinutes)))])]) : _vm._e(), (_vm.tplIndexOfMinutes !== -1) ? _c('div', {
    style: _vm.mrTimeBoxStyle,
    attrs: {
      "accessible": true,
      "ariaLabel": ((_vm.countDownData.minute) + "分")
    }
  }, [_c('text', {
    style: _vm.mrTimeTextStyle
  }, [_vm._v(_vm._s(_vm.countDownData.minute))])]) : _vm._e(), (_vm.tplIndexOfMinutes !== -1) ? _c('div', {
    style: {
      'width': '20px',
      'height': '36px'
    },
    attrs: {
      "ariaHidden": true
    }
  }, [_c('text', {
    style: _vm.mrDotTextStyle
  }, [_vm._v(_vm._s(_vm.getDot(_vm.tplIndexOfMinutes, _vm.tplIndexOfSeconds)))])]) : _vm._e(), (_vm.tplIndexOfSeconds !== -1) ? _c('div', {
    style: _vm.mrTimeBoxStyle,
    attrs: {
      "accessible": true,
      "ariaLabel": ((_vm.countDownData.second) + "秒")
    }
  }, [_c('text', {
    style: _vm.mrTimeTextStyle
  }, [_vm._v(_vm._s(_vm.countDownData.second))])]) : _vm._e(), (_vm.tplIndexOfSeconds !== -1) ? _c('div', {
    style: _vm.mrDotBoxStyle,
    attrs: {
      "ariaHidden": true
    }
  }, [_c('text', {
    style: _vm.mrDotTextStyle
  }, [_vm._v(_vm._s(_vm.getDot(_vm.tplIndexOfSeconds, -1)))])]) : _vm._e()])])
},staticRenderFns: []}

/***/ }),
/* 157 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return deep; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "b", function() { return tint; });
function deep() {
    var color = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : '#000';


    return {
        timeBoxStyle: {
            width: '46px',
            height: '46px',
            borderRadius: '6px',
            backgroundColor: '#000'
        },
        timeTextStyle: {
            color: '#fff',
            fontSize: '28px'
        },
        dotBoxStyle: {
            width: '36px',
            height: '36px'
        },
        dotTextStyle: {
            fontSize: '28px',
            color: color
        }
    };
}

function tint() {
    var color = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : '#fff';

    return {
        timeBoxStyle: {
            width: '46px',
            height: '46px',
            borderRadius: '6px',
            backgroundColor: '#fff'
        },
        timeTextStyle: {
            color: '#333',
            fontSize: '28px'
        },
        dotBoxStyle: {
            width: '36px',
            height: '36px'
        },
        dotTextStyle: {
            fontSize: '28px',
            color: color
        }
    };
}



/***/ }),
/* 158 */
/***/ (function(module, exports) {

module.exports={render:function (){var _vm=this;var _h=_vm.$createElement;var _c=_vm._self._c||_h;
  return _c('div', {
    staticClass: ["time-wrapper"],
    style: {
      'height': _vm.imgHeight
    }
  }, [(_vm.imageSrc !== '') ? _c('image', {
    staticClass: ["time-image"],
    style: {
      'height': _vm.imgHeight
    },
    attrs: {
      "resize": "stretch",
      "src": _vm.imageSrc
    }
  }) : _vm._e(), _c('div', {
    staticClass: ["time-text-box"]
  }, [(!_vm.isEnd) ? _c('text', {
    staticClass: ["time-text"],
    style: {
      'color': _vm.color
    }
  }, [_vm._v(_vm._s(_vm.text.start))]) : _vm._e(), (!_vm.isEnd) ? _c('wxc-countdown', {
    ref: "countdown",
    staticClass: ["time-box"],
    attrs: {
      "tpl": _vm.tpl,
      "timeBoxStyle": _vm.style.timeBoxStyle,
      "timeTextStyle": _vm.style.timeTextStyle,
      "dotBoxStyle": _vm.style.dotBoxStyle,
      "dotTextStyle": _vm.style.dotTextStyle,
      "time": _vm.time
    },
    on: {
      "wxTimeRun": _vm.timeRun,
      "wxcOnComplete": _vm.onCompleted
    }
  }) : _vm._e(), (!_vm.isEnd) ? _c('text', {
    staticClass: ["time-text", "time-text-end"],
    style: {
      'color': _vm.color
    }
  }, [_vm._v("\n\t\t\t" + _vm._s(_vm.text.end) + "\n\t\t")]) : _vm._e(), (_vm.isEnd) ? _c('text', {
    staticClass: ["time-text"]
  }, [_vm._v("活动已结束")]) : _vm._e()], 1)])
},staticRenderFns: []}

/***/ }),
/* 159 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
Object.defineProperty(__webpack_exports__, "__esModule", { value: true });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__index_vue__ = __webpack_require__(160);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__index_vue___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_0__index_vue__);
/* harmony reexport (default from non-hamory) */ __webpack_require__.d(__webpack_exports__, "default", function() { return __WEBPACK_IMPORTED_MODULE_0__index_vue___default.a; });


/***/ }),
/* 160 */
/***/ (function(module, exports, __webpack_require__) {

var __vue_exports__, __vue_options__
var __vue_styles__ = []

/* styles */
__vue_styles__.push(__webpack_require__(161)
)

/* script */
__vue_exports__ = __webpack_require__(162)

/* template */
var __vue_template__ = __webpack_require__(171)
__vue_options__ = __vue_exports__ = __vue_exports__ || {}
if (
  typeof __vue_exports__.default === "object" ||
  typeof __vue_exports__.default === "function"
) {
__vue_options__ = __vue_exports__ = __vue_exports__.default
}
if (typeof __vue_options__ === "function") {
  __vue_options__ = __vue_options__.options
}

__vue_options__.render = __vue_template__.render
__vue_options__.staticRenderFns = __vue_template__.staticRenderFns
__vue_options__._scopeId = "data-v-7f2516ba"
__vue_options__.style = __vue_options__.style || {}
__vue_styles__.forEach(function (module) {
  for (var name in module) {
    __vue_options__.style[name] = module[name]
  }
})
if (typeof __register_static_styles__ === "function") {
  __register_static_styles__(__vue_options__._scopeId, __vue_styles__)
}

module.exports = __vue_exports__


/***/ }),
/* 161 */
/***/ (function(module, exports) {

module.exports = {
  "coupon-wrapper": {
    "flexDirection": "row",
    "justifyContent": "center"
  },
  "coupon-box": {
    "flexDirection": "row",
    "alignItems": "center",
    "flexWrap": "wrap"
  },
  "margin": {
    "marginRight": "14"
  }
}

/***/ }),
/* 162 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
Object.defineProperty(__webpack_exports__, "__esModule", { value: true });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0_babel_runtime_regenerator__ = __webpack_require__(12);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0_babel_runtime_regenerator___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_0_babel_runtime_regenerator__);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1_babel_runtime_helpers_asyncToGenerator__ = __webpack_require__(13);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1_babel_runtime_helpers_asyncToGenerator___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_1_babel_runtime_helpers_asyncToGenerator__);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2_babel_runtime_helpers_toConsumableArray__ = __webpack_require__(47);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2_babel_runtime_helpers_toConsumableArray___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_2_babel_runtime_helpers_toConsumableArray__);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_3__unit_vue__ = __webpack_require__(167);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_3__unit_vue___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_3__unit_vue__);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_4__utils_env__ = __webpack_require__(11);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_5__utils_web_cookie__ = __webpack_require__(29);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_6__utils_web_url__ = __webpack_require__(17);



//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//






/* harmony default export */ __webpack_exports__["default"] = ({
	name: 'coupons',
	props: {
		coupons: {
			type: Array
		},
		type: {
			type: String
		}
	},
	data: function data() {
		return {
			noLogin: false,
			typeIndex: 1,
			couponList: this.coupons,
			width: 0,
			infos: []
		};
	},

	watch: {
		coupons: function coupons(nv, ov) {
			this.couponList = [].concat(__WEBPACK_IMPORTED_MODULE_2_babel_runtime_helpers_toConsumableArray___default()(nv));
			this.setAttr();
			this.getInfo();
		}
	},
	components: {
		unit: __WEBPACK_IMPORTED_MODULE_3__unit_vue___default.a
	},
	methods: {
		report: function report(id, index) {

			var cnum = '';
			switch (this.type) {
				case '1':
					cnum = '一';
					break;
				case '2':
					cnum = '二';
					break;
				case '3':
					cnum = '三';
					break;
				default:
			}

			if (cnum) {
				var evt = new Event('userTrack');
				evt.data = {
					action: '\u70B9\u51FB\u4F18\u60E0\u5238\u4E00\u884C' + cnum + '\u4E2A', options: {
						coupons_id: id,
						location: 'L' + (index + 1),
						business: '商城'
					}
				};
				document.dispatchEvent(evt);
			}
		},
		getInfo: function getInfo() {
			var _this = this;

			return __WEBPACK_IMPORTED_MODULE_1_babel_runtime_helpers_asyncToGenerator___default()( /*#__PURE__*/__WEBPACK_IMPORTED_MODULE_0_babel_runtime_regenerator___default.a.mark(function _callee() {
				var coupon_group, dataObj, result, data, list;
				return __WEBPACK_IMPORTED_MODULE_0_babel_runtime_regenerator___default.a.wrap(function _callee$(_context) {
					while (1) {
						switch (_context.prev = _context.next) {
							case 0:
								coupon_group = '';

								_this.couponList.forEach(function (item, index) {
									(index + 1) % _this.typeIndex === 0 ? item.notMargin = true : item.notMargin = false;
									item.isGot = false;
									item.noMore = false;
									item.couponsId ? coupon_group = coupon_group + '-' + item.couponsId : '';
								});

								coupon_group = coupon_group.replace(/^-/g, '');
								dataObj = {
									path: 'activity/promotions/coupon_status',
									version: 'v1',
									data: { coupon_group: coupon_group }
								};

								if (coupon_group) {
									_context.next = 6;
									break;
								}

								return _context.abrupt('return');

							case 6:
								_context.next = 8;
								return _this.$api.get(dataObj);

							case 8:
								result = _context.sent;

								_this.$emit('res', result);
								data = result.data;

								if (data.error_code === 0) {
									_this.noLogin = false;
									list = data.data.list;

									list.map(function (item, index) {
										item.is_got === 1 ? _this.couponList[index].isGot = true : '';
										if (item.coupon_status === 5 || item.coupon_status === 3) {
											//已领完和已过期
											_this.couponList[index].noMore = true;
										}
										_this.$set(_this.couponList, index, _this.couponList[index]);
									});
								} else if (data.error_code === 20001) {
									_this.noLogin = true;
								}

							case 12:
							case 'end':
								return _context.stop();
						}
					}
				}, _callee, _this);
			}))();
		},
		setAttr: function setAttr() {
			var type = parseInt(this.type);

			switch (type) {
				case 2:
					this.typeIndex = 2;
					this.couponList.forEach(function (item) {
						return item.width = 750 / 2 + 'px';
					});
					break;

				case 3:
					this.typeIndex = 3;
					this.couponList.forEach(function (item) {
						return item.width = 750 / 3 + 'px';
					});
					break;

				default:
					this.typeIndex = 1;
					this.couponList.forEach(function (item) {
						return item.width = 750 + 'px';
					});
					break;
			}
		}
	},
	created: function created() {
		var _this2 = this;

		return __WEBPACK_IMPORTED_MODULE_1_babel_runtime_helpers_asyncToGenerator___default()( /*#__PURE__*/__WEBPACK_IMPORTED_MODULE_0_babel_runtime_regenerator___default.a.mark(function _callee2() {
			return __WEBPACK_IMPORTED_MODULE_0_babel_runtime_regenerator___default.a.wrap(function _callee2$(_context2) {
				while (1) {
					switch (_context2.prev = _context2.next) {
						case 0:
							_this2.setAttr();

							if (!__WEBPACK_IMPORTED_MODULE_4__utils_env__["a" /* default */].isMjb()) {
								_context2.next = 10;
								break;
							}

							_context2.prev = 2;
							_context2.next = 5;
							return _this2.$module('mjb-native').getAccessToken();

						case 5:
							_context2.next = 10;
							break;

						case 7:
							_context2.prev = 7;
							_context2.t0 = _context2['catch'](2);

							console.log(_context2.t0);

						case 10:
							_this2.getInfo();

						case 11:
						case 'end':
							return _context2.stop();
					}
				}
			}, _callee2, _this2, [[2, 7]]);
		}))();
	}
});

/***/ }),
/* 163 */
/***/ (function(module, exports, __webpack_require__) {

module.exports = { "default": __webpack_require__(164), __esModule: true };

/***/ }),
/* 164 */
/***/ (function(module, exports, __webpack_require__) {

__webpack_require__(31);
__webpack_require__(165);
module.exports = __webpack_require__(0).Array.from;


/***/ }),
/* 165 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

var ctx = __webpack_require__(18);
var $export = __webpack_require__(3);
var toObject = __webpack_require__(27);
var call = __webpack_require__(58);
var isArrayIter = __webpack_require__(59);
var toLength = __webpack_require__(36);
var createProperty = __webpack_require__(166);
var getIterFn = __webpack_require__(60);

$export($export.S + $export.F * !__webpack_require__(65)(function (iter) { Array.from(iter); }), 'Array', {
  // 22.1.2.1 Array.from(arrayLike, mapfn = undefined, thisArg = undefined)
  from: function from(arrayLike /* , mapfn = undefined, thisArg = undefined */) {
    var O = toObject(arrayLike);
    var C = typeof this == 'function' ? this : Array;
    var aLen = arguments.length;
    var mapfn = aLen > 1 ? arguments[1] : undefined;
    var mapping = mapfn !== undefined;
    var index = 0;
    var iterFn = getIterFn(O);
    var length, result, step, iterator;
    if (mapping) mapfn = ctx(mapfn, aLen > 2 ? arguments[2] : undefined, 2);
    // if object isn't iterable or it's array with default iterator - use simple case
    if (iterFn != undefined && !(C == Array && isArrayIter(iterFn))) {
      for (iterator = iterFn.call(O), result = new C(); !(step = iterator.next()).done; index++) {
        createProperty(result, index, mapping ? call(iterator, mapfn, [step.value, index], true) : step.value);
      }
    } else {
      length = toLength(O.length);
      for (result = new C(length); length > index; index++) {
        createProperty(result, index, mapping ? mapfn(O[index], index) : O[index]);
      }
    }
    result.length = index;
    return result;
  }
});


/***/ }),
/* 166 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

var $defineProperty = __webpack_require__(4);
var createDesc = __webpack_require__(19);

module.exports = function (object, index, value) {
  if (index in object) $defineProperty.f(object, index, createDesc(0, value));
  else object[index] = value;
};


/***/ }),
/* 167 */
/***/ (function(module, exports, __webpack_require__) {

var __vue_exports__, __vue_options__
var __vue_styles__ = []

/* styles */
__vue_styles__.push(__webpack_require__(168)
)

/* script */
__vue_exports__ = __webpack_require__(169)

/* template */
var __vue_template__ = __webpack_require__(170)
__vue_options__ = __vue_exports__ = __vue_exports__ || {}
if (
  typeof __vue_exports__.default === "object" ||
  typeof __vue_exports__.default === "function"
) {
__vue_options__ = __vue_exports__ = __vue_exports__.default
}
if (typeof __vue_options__ === "function") {
  __vue_options__ = __vue_options__.options
}

__vue_options__.render = __vue_template__.render
__vue_options__.staticRenderFns = __vue_template__.staticRenderFns
__vue_options__._scopeId = "data-v-152d6bcc"
__vue_options__.style = __vue_options__.style || {}
__vue_styles__.forEach(function (module) {
  for (var name in module) {
    __vue_options__.style[name] = module[name]
  }
})
if (typeof __register_static_styles__ === "function") {
  __register_static_styles__(__vue_options__._scopeId, __vue_styles__)
}

module.exports = __vue_exports__


/***/ }),
/* 168 */
/***/ (function(module, exports) {

module.exports = {
  "coupon-unit": {
    "position": "relative"
  },
  "coupon-image": {
    "height": "90"
  },
  "coupon-icon": {
    "flexDirection": "row",
    "justifyContent": "center",
    "alignItems": "center",
    "position": "absolute",
    "bottom": "14",
    "right": "14",
    "width": "100",
    "height": "100",
    "borderRadius": "50",
    "backgroundColor": "#000000",
    "opacity": 0.5
  },
  "coupon-icon-text": {
    "color": "#ffffff",
    "transform": "rotate(-45deg)",
    "fontSize": "28",
    "textAlign": "center"
  }
}

/***/ }),
/* 169 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
Object.defineProperty(__webpack_exports__, "__esModule", { value: true });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0_babel_runtime_regenerator__ = __webpack_require__(12);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0_babel_runtime_regenerator___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_0_babel_runtime_regenerator__);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1_babel_runtime_helpers_asyncToGenerator__ = __webpack_require__(13);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1_babel_runtime_helpers_asyncToGenerator___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_1_babel_runtime_helpers_asyncToGenerator__);


//
//
//
//
//
//
//
//
//
//
//
//
//

var modal = weex.requireModule('modal');

/* harmony default export */ __webpack_exports__["default"] = ({
	props: {
		width: {
			type: [Number, String]
		},
		imageBefore: {
			type: String
		},
		couponsId: {
			type: [Number, String]
		},
		isGot: {
			type: [Boolean, String]
		},
		noMore: {
			type: [Boolean, String]
		},
		needLogin: {
			type: Boolean,
			default: false
		}
	},
	data: function data() {
		return {
			height: 140
		};
	},

	methods: {
		onLoad: function onLoad(e) {
			var size = e.size;
			var width = size.naturalWidth;
			var height = size.naturalHeight;
			var imageWidth = parseInt(this.width);
			this.height = imageWidth * height / width;
			this.height < 140 ? this.height = 140 + 'px' : this.height = this.height + 'px';
		},
		getCoupon: function getCoupon() {
			var _this = this;

			return __WEBPACK_IMPORTED_MODULE_1_babel_runtime_helpers_asyncToGenerator___default()( /*#__PURE__*/__WEBPACK_IMPORTED_MODULE_0_babel_runtime_regenerator___default.a.mark(function _callee() {
				var id, dataObj, result, data;
				return __WEBPACK_IMPORTED_MODULE_0_babel_runtime_regenerator___default.a.wrap(function _callee$(_context) {
					while (1) {
						switch (_context.prev = _context.next) {
							case 0:
								_this.$emit('report', true);

								if (!_this.needLogin) {
									_context.next = 3;
									break;
								}

								return _context.abrupt('return', _this.$module('mjb-native').login(function () {
									_this.$emit('login');
								}));

							case 3:
								id = _this.couponsId;

								if (!_this.noMore) {
									_context.next = 9;
									break;
								}

								_this.$api.toast('优惠券已派完，晚点再试试吧');
								return _context.abrupt('return');

							case 9:
								if (!_this.isGot) {
									_context.next = 12;
									break;
								}

								_this.$api.toast('您已领取么么哒');
								return _context.abrupt('return');

							case 12:
								dataObj = {
									path: 'activity/promotions/coupons',
									version: 'v1',
									data: {
										_method: 'POST',
										coupon_ids: id
									}
								};

								if (id) {
									_context.next = 15;
									break;
								}

								return _context.abrupt('return');

							case 15:
								_context.next = 17;
								return _this.$api.get(dataObj);

							case 17:
								result = _context.sent;

								_this.$emit('res', result);
								data = result.data;

								if (data.error_code === 0) {
									_this.$api.toast('领取成功么么哒');
									_this.isGot = true;
								} else if (data.error_code === 20001) {
									// to login
									console.log('to login');
								} else {
									//其余情况跑后端提示
									_this.$api.toast(data.error_description);
								}

							case 21:
							case 'end':
								return _context.stop();
						}
					}
				}, _callee, _this);
			}))();
		}
	}
});

/***/ }),
/* 170 */
/***/ (function(module, exports) {

module.exports={render:function (){var _vm=this;var _h=_vm.$createElement;var _c=_vm._self._c||_h;
  return _c('div', {
    staticClass: ["coupon-unit"]
  }, [_c('image', {
    staticClass: ["coupon-image"],
    style: {
      'width': _vm.width,
      'height': _vm.height
    },
    attrs: {
      "src": _vm.imageBefore
    },
    on: {
      "load": _vm.onLoad,
      "click": _vm.getCoupon
    }
  }), (_vm.noMore) ? _c('div', {
    staticClass: ["coupon-icon"]
  }, [_c('text', {
    staticClass: ["coupon-icon-text"]
  }, [_vm._v("已领完")])]) : (_vm.isGot) ? _c('div', {
    staticClass: ["coupon-icon"]
  }, [_c('text', {
    staticClass: ["coupon-icon-text"]
  }, [_vm._v("已领取")])]) : _vm._e()])
},staticRenderFns: []}

/***/ }),
/* 171 */
/***/ (function(module, exports) {

module.exports={render:function (){var _vm=this;var _h=_vm.$createElement;var _c=_vm._self._c||_h;
  return _c('div', {
    staticClass: ["coupon-wrapper"]
  }, [_c('div', {
    staticClass: ["coupon-box"]
  }, _vm._l((_vm.couponList), function(item, index) {
    return (item.couponsId && item.imageBefore) ? _c('unit', {
      key: index,
      staticClass: ["coupon-unit"],
      attrs: {
        "width": item.width,
        "imageBefore": item.imageBefore,
        "couponsId": item.couponsId,
        "isGot": item.isGot,
        "noMore": item.noMore,
        "needLogin": _vm.noLogin
      },
      on: {
        "report": function($event) {
          _vm.report(item.couponsId, index)
        },
        "login": _vm.getInfo
      }
    }) : _vm._e()
  }))])
},staticRenderFns: []}

/***/ }),
/* 172 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
Object.defineProperty(__webpack_exports__, "__esModule", { value: true });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__index_vue__ = __webpack_require__(173);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__index_vue___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_0__index_vue__);
/* harmony reexport (default from non-hamory) */ __webpack_require__.d(__webpack_exports__, "default", function() { return __WEBPACK_IMPORTED_MODULE_0__index_vue___default.a; });


/***/ }),
/* 173 */
/***/ (function(module, exports, __webpack_require__) {

var __vue_exports__, __vue_options__
var __vue_styles__ = []

/* styles */
__vue_styles__.push(__webpack_require__(174)
)

/* script */
__vue_exports__ = __webpack_require__(175)

/* template */
var __vue_template__ = __webpack_require__(176)
__vue_options__ = __vue_exports__ = __vue_exports__ || {}
if (
  typeof __vue_exports__.default === "object" ||
  typeof __vue_exports__.default === "function"
) {
__vue_options__ = __vue_exports__ = __vue_exports__.default
}
if (typeof __vue_options__ === "function") {
  __vue_options__ = __vue_options__.options
}

__vue_options__.render = __vue_template__.render
__vue_options__.staticRenderFns = __vue_template__.staticRenderFns
__vue_options__._scopeId = "data-v-0dd66798"
__vue_options__.style = __vue_options__.style || {}
__vue_styles__.forEach(function (module) {
  for (var name in module) {
    __vue_options__.style[name] = module[name]
  }
})
if (typeof __register_static_styles__ === "function") {
  __register_static_styles__(__vue_options__._scopeId, __vue_styles__)
}

module.exports = __vue_exports__


/***/ }),
/* 174 */
/***/ (function(module, exports) {

module.exports = {
  "waterfall-container": {
    "marginLeft": "18",
    "marginRight": "18",
    "flexDirection": "row",
    "justifyContent": "space-around",
    "alignItems": "flex-start"
  },
  "column-left": {
    "width": "348"
  },
  "column-right": {
    "width": "348",
    "marginLeft": "18"
  },
  "goods-item": {
    "marginTop": "18"
  }
}

/***/ }),
/* 175 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
Object.defineProperty(__webpack_exports__, "__esModule", { value: true });
//
//
//
//
//
//
//
//
//
//

/* harmony default export */ __webpack_exports__["default"] = ({
	name: 'f-waterfall',
	props: {
		items: {
			type: Array,
			default: function _default() {
				return [];
			}
		}
	},
	watch: {
		items: function items(val) {
			this.itemsLeft = [];
			this.itemsRight = [];
			var heightLeft = 0;
			var heightRight = 0;
			// 计算各列
			for (var i in val) {
				var item = val[i];
				// 计算虚拟高度
				if (item.status !== 3 && item.preview.cover && item.sale_mode !== 1 && item.preview.type !== 3 && item.preview.if_show !== '0' && item.preview.if_show !== 0) {
					var height = 0;

					if (item.preview.cover) height += 348;

					if (item.preview.promotion_tips) height += 40;

					if (item.bottom_mark_image && item.bottom_mark_image.s.url) height += 40;

					if (item.preview.name) height += 36 * (this.ctx.measureText(item.preview.name).width > 320 ? 2 : 1);

					if (heightLeft > heightRight) {
						this.itemsRight.push(item);
						heightRight += height;
					} else {
						this.itemsLeft.push(item);
						heightLeft += height;
					}
				}
			}
		}
	},
	data: function data() {
		return {
			ctx: {},
			itemsLeft: [],
			itemsRight: []
		};
	},

	methods: {
		report: function report($event) {
			this.$emit('report', $event);
		}
	},
	created: function created() {
		// 高度计算器
		var $canvas = document.querySelector('#height-calculator');
		if (!$canvas) {
			$canvas = document.createElement('canvas');
			$canvas.setAttribute('id', 'height-calculator');
			$canvas.style.height = '100px';
			$canvas.style.width = '320px';
			$canvas.style.display = 'none';
			document.body.appendChild($canvas);
		}
		this.ctx = $canvas.getContext('2d');
		this.ctx.font = 'normal normal normal 28px Arial';
	}
});

/***/ }),
/* 176 */
/***/ (function(module, exports) {

module.exports={render:function (){var _vm=this;var _h=_vm.$createElement;var _c=_vm._self._c||_h;
  return _c('div', {
    staticClass: ["waterfall-container"]
  }, [_c('div', {
    staticClass: ["column-left"]
  }, _vm._l((_vm.itemsLeft), function(item, index) {
    return _c('goods-item', {
      key: index,
      staticClass: ["goods-item"],
      attrs: {
        "item": item
      },
      on: {
        "report": _vm.report
      }
    })
  })), _c('div', {
    staticClass: ["column-right"]
  }, _vm._l((_vm.itemsRight), function(item, index) {
    return _c('goods-item', {
      key: index,
      staticClass: ["goods-item"],
      attrs: {
        "item": item
      },
      on: {
        "report": _vm.report
      }
    })
  }))])
},staticRenderFns: []}

/***/ }),
/* 177 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
Object.defineProperty(__webpack_exports__, "__esModule", { value: true });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__index_vue__ = __webpack_require__(178);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__index_vue___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_0__index_vue__);
/* harmony reexport (default from non-hamory) */ __webpack_require__.d(__webpack_exports__, "default", function() { return __WEBPACK_IMPORTED_MODULE_0__index_vue___default.a; });


/***/ }),
/* 178 */
/***/ (function(module, exports, __webpack_require__) {

var __vue_exports__, __vue_options__
var __vue_styles__ = []

/* styles */
__vue_styles__.push(__webpack_require__(179)
)

/* script */
__vue_exports__ = __webpack_require__(180)

/* template */
var __vue_template__ = __webpack_require__(189)
__vue_options__ = __vue_exports__ = __vue_exports__ || {}
if (
  typeof __vue_exports__.default === "object" ||
  typeof __vue_exports__.default === "function"
) {
__vue_options__ = __vue_exports__ = __vue_exports__.default
}
if (typeof __vue_options__ === "function") {
  __vue_options__ = __vue_options__.options
}

__vue_options__.render = __vue_template__.render
__vue_options__.staticRenderFns = __vue_template__.staticRenderFns
__vue_options__._scopeId = "data-v-6b752db3"
__vue_options__.style = __vue_options__.style || {}
__vue_styles__.forEach(function (module) {
  for (var name in module) {
    __vue_options__.style[name] = module[name]
  }
})
if (typeof __register_static_styles__ === "function") {
  __register_static_styles__(__vue_options__._scopeId, __vue_styles__)
}

module.exports = __vue_exports__


/***/ }),
/* 179 */
/***/ (function(module, exports) {

module.exports = {}

/***/ }),
/* 180 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
Object.defineProperty(__webpack_exports__, "__esModule", { value: true });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__single_vue__ = __webpack_require__(181);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__single_vue___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_0__single_vue__);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__multiple_vue__ = __webpack_require__(185);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__multiple_vue___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_1__multiple_vue__);
//
//
//
//




/* harmony default export */ __webpack_exports__["default"] = ({
	name: 'goods-item',
	props: {
		hideDivider: Boolean,
		single: Boolean, // single / multiple ,
		item: Object
	},
	components: {
		SingleGoodsItem: __WEBPACK_IMPORTED_MODULE_0__single_vue___default.a,
		MultipleGoodsItem: __WEBPACK_IMPORTED_MODULE_1__multiple_vue___default.a
	},
	methods: {
		jump: function jump(item) {
			this.$emit('report', item.goods_id);
			this.$module('mjb-native').route('meijiabang://goods_details?goods_id=' + item.goods_id);
		}
	}
});

/***/ }),
/* 181 */
/***/ (function(module, exports, __webpack_require__) {

var __vue_exports__, __vue_options__
var __vue_styles__ = []

/* styles */
__vue_styles__.push(__webpack_require__(182)
)

/* script */
__vue_exports__ = __webpack_require__(183)

/* template */
var __vue_template__ = __webpack_require__(184)
__vue_options__ = __vue_exports__ = __vue_exports__ || {}
if (
  typeof __vue_exports__.default === "object" ||
  typeof __vue_exports__.default === "function"
) {
__vue_options__ = __vue_exports__ = __vue_exports__.default
}
if (typeof __vue_options__ === "function") {
  __vue_options__ = __vue_options__.options
}

__vue_options__.render = __vue_template__.render
__vue_options__.staticRenderFns = __vue_template__.staticRenderFns
__vue_options__._scopeId = "data-v-0fbd30b7"
__vue_options__.style = __vue_options__.style || {}
__vue_styles__.forEach(function (module) {
  for (var name in module) {
    __vue_options__.style[name] = module[name]
  }
})
if (typeof __register_static_styles__ === "function") {
  __register_static_styles__(__vue_options__._scopeId, __vue_styles__)
}

module.exports = __vue_exports__


/***/ }),
/* 182 */
/***/ (function(module, exports) {

module.exports = {
  "single-item-container": {
    "position": "relative",
    "backgroundColor": "#ffffff",
    "width": "750"
  },
  "single-item": {
    "paddingTop": "24",
    "paddingLeft": "24",
    "paddingRight": "24",
    "paddingBottom": "24",
    "flexDirection": "row",
    "justifyContent": "space-between",
    "alignItems": "flex-start"
  },
  "cover": {
    "width": "230",
    "height": "230",
    "backgroundColor": "#D9D9D9"
  },
  "image-container": {
    "position": "relative",
    "paddingRight": "24"
  },
  "mark-image": {
    "position": "absolute",
    "right": "24",
    "top": 0,
    "width": "100",
    "height": "100"
  },
  "attribute-tag": {
    "position": "absolute",
    "left": "0",
    "top": "0",
    "paddingTop": "10",
    "paddingBottom": "10",
    "paddingLeft": "1",
    "paddingRight": "1",
    "borderColor": "#f2a9c1",
    "borderWidth": "1",
    "borderStyle": "solid",
    "borderRadius": "4",
    "flexDirection": "column",
    "justifyContent": "center",
    "alignItems": "center"
  },
  "attribute-tag-text": {
    "color": "#f1a9c1",
    "fontSize": "20"
  },
  "goods-name": {
    "lines": 2,
    "textOverflow": "ellipsis",
    "fontSize": "28",
    "color": "#333333",
    "lineHeight": "36",
    "height": "72"
  },
  "promotion-tips": {
    "lines": 1,
    "marginTop": "14",
    "fontSize": "22",
    "color": "#ff5577",
    "height": "30",
    "lineHeight": "30"
  },
  "price-bar": {
    "marginTop": "30",
    "paddingLeft": "14",
    "paddingRight": "14",
    "paddingBottom": "20",
    "flexDirection": "row",
    "justifyContent": "space-between",
    "alignItems": "center"
  },
  "price-text": {
    "flexDirection": "row",
    "justifyContent": "flex-start",
    "alignItems": "flex-end",
    "height": "46"
  },
  "price-word": {
    "fontSize": "24",
    "color": "#ff5577"
  },
  "price-number": {
    "fontSize": "36",
    "lineHeight": "46",
    "color": "#ff5577"
  },
  "bottom-cart": {
    "height": "64",
    "width": "64"
  },
  "divider": {
    "position": "absolute",
    "bottom": 0,
    "left": "20",
    "height": "1",
    "width": "750",
    "backgroundColor": "#e6e6e6"
  },
  "details-container": {
    "width": "448"
  },
  "original-price": {
    "marginTop": "4",
    "fontSize": "24",
    "height": "34",
    "lineHeight": "34",
    "fontWeight": "normal",
    "color": "#999999",
    "textDecoration": "line-through"
  },
  "no-goods": {
    "width": "110",
    "height": "110"
  }
}

/***/ }),
/* 183 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
Object.defineProperty(__webpack_exports__, "__esModule", { value: true });
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//

/* harmony default export */ __webpack_exports__["default"] = ({
	name: 'single-goods-item',
	props: {
		hideDivider: Boolean,
		item: {
			type: Object,
			default: function _default() {
				return {};
			}
		},
		saleMode: String
	},
	computed: {
		price: function price() {
			var p1 = '';
			var price = '';
			var p2 = '';
			try {
				if (/(auto|presale)/ig.test(this.saleMode) && this.item.sale_mode === 2 && this.item.presale_info && this.item.presale_info.deposit_price) {
					p1 = '定金:';
					price = this.item.presale_info.deposit_price;
				} else if (this.item.preview.lowest_price) {
					p1 = '¥';
					price = this.item.preview.lowest_price;
					p2 = '起';
				} else {
					p1 = '¥';
					price = this.item.preview.sale_price || this.item.preview.original_price;
					p2 = '起';
				}
				return { p1: p1, price: price, p2: p2 };
			} catch (e) {
				return { p1: p1, price: price, p2: p2 };
			}
		}
	}
});

/***/ }),
/* 184 */
/***/ (function(module, exports) {

module.exports={render:function (){var _vm=this;var _h=_vm.$createElement;var _c=_vm._self._c||_h;
  return (_vm.item.status !== 3 && _vm.item.preview.cover && _vm.item.sale_mode !== 1 && _vm.item.preview.type != 3 && _vm.item.preview.if_show != '0') ? _c('div', {
    staticClass: ["single-item-container"]
  }, [_c('div', {
    staticClass: ["single-item"]
  }, [_c('div', {
    staticClass: ["image-container"]
  }, [_c('image', {
    staticClass: ["cover"],
    attrs: {
      "resize": "cover",
      "src": _vm.item.preview.cover
    }
  }), (_vm.item.status === 2) ? _c('image', {
    staticClass: ["mark-image", "no-goods"],
    attrs: {
      "src": "https://m.meijiabang.cn/img/no-good.png"
    }
  }) : _vm._e(), (_vm.item.status !== 2 && _vm.item.mark_image && _vm.item.mark_image.s && _vm.item.mark_image.s.url) ? _c('image', {
    staticClass: ["mark-image"],
    attrs: {
      "src": _vm.item.mark_image.s.url
    }
  }) : _vm._e(), (_vm.item.preview.attribute_tag) ? _c('div', {
    staticClass: ["attribute-tag"]
  }, _vm._l((_vm.item.preview.attribute_tag.split('\\n')), function(tag, index) {
    return _c('text', {
      key: index,
      staticClass: ["attribute-tag-text"]
    }, [_vm._v(_vm._s(tag))])
  })) : _vm._e()]), _c('div', {
    staticClass: ["details-container"]
  }, [_c('div', {
    staticClass: ["goods-name-container"]
  }, [(_vm.item.preview.name) ? _c('text', {
    staticClass: ["goods-name"]
  }, [_vm._v(_vm._s(_vm.item.preview.name))]) : _vm._e()]), _c('div'), (_vm.item.promotion_tips) ? _c('text', {
    staticClass: ["promotion-tips"]
  }, [_vm._v(_vm._s(_vm.item.promotion_tips))]) : _vm._e(), _c('div', {
    staticClass: ["price-bar"]
  }, [_c('div', [_c('div', {
    staticClass: ["price-text"]
  }, [_c('text', {
    staticClass: ["price-word"]
  }, [_vm._v(_vm._s(_vm.price.p1))]), _c('text', {
    staticClass: ["price-number"]
  }, [_vm._v(_vm._s(_vm.price.price))]), _c('text', {
    staticClass: ["price-word"]
  }, [_vm._v(_vm._s(_vm.price.p2))])]), (_vm.item.preview.original_price && _vm.price.price !== _vm.item.preview.original_price) ? _c('text', {
    staticClass: ["original-price"]
  }, [_vm._v("¥" + _vm._s(_vm.item.preview.original_price))]) : _vm._e()]), _c('image', {
    staticClass: ["bottom-cart"],
    attrs: {
      "src": "https://m.meijiabang.cn/img/icon/add-cart@2x.png"
    }
  })])])]), (!_vm.hideDivider) ? _c('div', {
    staticClass: ["divider"]
  }) : _vm._e()]) : _vm._e()
},staticRenderFns: []}

/***/ }),
/* 185 */
/***/ (function(module, exports, __webpack_require__) {

var __vue_exports__, __vue_options__
var __vue_styles__ = []

/* styles */
__vue_styles__.push(__webpack_require__(186)
)

/* script */
__vue_exports__ = __webpack_require__(187)

/* template */
var __vue_template__ = __webpack_require__(188)
__vue_options__ = __vue_exports__ = __vue_exports__ || {}
if (
  typeof __vue_exports__.default === "object" ||
  typeof __vue_exports__.default === "function"
) {
__vue_options__ = __vue_exports__ = __vue_exports__.default
}
if (typeof __vue_options__ === "function") {
  __vue_options__ = __vue_options__.options
}

__vue_options__.render = __vue_template__.render
__vue_options__.staticRenderFns = __vue_template__.staticRenderFns
__vue_options__._scopeId = "data-v-10b1d682"
__vue_options__.style = __vue_options__.style || {}
__vue_styles__.forEach(function (module) {
  for (var name in module) {
    __vue_options__.style[name] = module[name]
  }
})
if (typeof __register_static_styles__ === "function") {
  __register_static_styles__(__vue_options__._scopeId, __vue_styles__)
}

module.exports = __vue_exports__


/***/ }),
/* 186 */
/***/ (function(module, exports) {

module.exports = {
  "multiple-item": {
    "backgroundColor": "#ffffff"
  },
  "cover": {
    "width": "308",
    "height": "308"
  },
  "image-container": {
    "position": "relative",
    "paddingTop": "20",
    "paddingLeft": "20",
    "paddingRight": "20",
    "paddingBottom": "20"
  },
  "mark-image": {
    "position": "absolute",
    "right": "10",
    "top": "10",
    "width": "110",
    "height": "110"
  },
  "attribute-tag": {
    "position": "absolute",
    "left": "20",
    "top": "20",
    "paddingTop": "10",
    "paddingBottom": "10",
    "paddingLeft": "1",
    "paddingRight": "1",
    "borderColor": "#f2a9c1",
    "borderWidth": "1",
    "borderStyle": "solid",
    "borderRadius": "4",
    "flexDirection": "column",
    "justifyContent": "center",
    "alignItems": "center"
  },
  "attribute-tag-text": {
    "color": "#f1a9c1",
    "fontSize": "20"
  },
  "promotion-tips": {
    "lines": 1,
    "paddingLeft": "14",
    "backgroundColor": "#ffeff4",
    "fontSize": "22",
    "color": "#ff5577",
    "height": "40",
    "lineHeight": "40"
  },
  "goods-name": {
    "lines": 2,
    "marginLeft": "14",
    "marginRight": "14",
    "marginTop": "14",
    "marginBottom": "14",
    "textOverflow": "ellipsis",
    "fontSize": "28",
    "color": "#333333",
    "lineHeight": "36",
    "height": "72"
  },
  "price-bar": {
    "paddingLeft": "14",
    "paddingRight": "14",
    "paddingBottom": "20",
    "flexDirection": "row",
    "justifyContent": "space-between",
    "alignItems": "center"
  },
  "price-text": {
    "flexDirection": "row",
    "justifyContent": "flex-start",
    "alignItems": "flex-end"
  },
  "price-word": {
    "fontSize": "24",
    "color": "#ff5577"
  },
  "price-number": {
    "fontSize": "36",
    "color": "#ff5577"
  },
  "bottom-mark-image": {
    "width": "348",
    "height": "40"
  },
  "bottom-cart": {
    "height": "56",
    "width": "56"
  },
  "no-goods": {
    "position": "absolute",
    "top": 0,
    "right": 0,
    "width": "120",
    "height": "120"
  }
}

/***/ }),
/* 187 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
Object.defineProperty(__webpack_exports__, "__esModule", { value: true });
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//

/* harmony default export */ __webpack_exports__["default"] = ({
	name: 'multiple-goods-item',
	props: {
		item: {
			type: Object,
			default: function _default() {
				return {};
			}
		},
		saleMode: String
	},
	computed: {
		price: function price() {
			var p1 = '';
			var price = '';
			var p2 = '';
			try {
				if (/(auto|presale)/ig.test(this.saleMode) && this.item.sale_mode === 2 && this.item.presale_info && this.item.presale_info.deposit_price) {
					p1 = '定金:';
					price = this.item.presale_info.deposit_price;
				} else if (this.item.preview.lowest_price) {
					p1 = '¥';
					price = this.item.preview.lowest_price;
					p2 = '起';
				} else {
					p1 = '¥';
					price = this.item.preview.sale_price || this.item.preview.original_price;
					p2 = '起';
				}
				return { p1: p1, price: price, p2: p2 };
			} catch (e) {
				return { p1: p1, price: price, p2: p2 };
			}
		}
	}
});

/***/ }),
/* 188 */
/***/ (function(module, exports) {

module.exports={render:function (){var _vm=this;var _h=_vm.$createElement;var _c=_vm._self._c||_h;
  return _c('div', {
    staticClass: ["multiple-item"]
  }, [_c('div', {
    staticClass: ["image-container"]
  }, [_c('image', {
    staticClass: ["cover"],
    attrs: {
      "resize": "cover",
      "src": _vm.item.preview.cover
    }
  }), (_vm.item.status === 2) ? _c('image', {
    staticClass: ["no-goods"],
    attrs: {
      "src": "https://m.meijiabang.cn/img/no-good.png"
    }
  }) : _vm._e(), (_vm.item.status !== 2 && _vm.item.mark_image && _vm.item.mark_image.s && _vm.item.mark_image.s.url) ? _c('image', {
    staticClass: ["mark-image"],
    attrs: {
      "src": _vm.item.mark_image.s.url
    }
  }) : _vm._e(), (_vm.item.preview.attribute_tag) ? _c('div', {
    staticClass: ["attribute-tag"]
  }, _vm._l((_vm.item.preview.attribute_tag.split('\\n')), function(tag, index) {
    return _c('text', {
      key: index,
      staticClass: ["attribute-tag-text"]
    }, [_vm._v(_vm._s(tag))])
  })) : _vm._e()]), (_vm.item.bottom_mark_image && _vm.item.bottom_mark_image.s.url) ? _c('image', {
    staticClass: ["bottom-mark-image"],
    attrs: {
      "src": _vm.item.bottom_mark_image.s.url.replace(/@320w/, '@326w_40h_1e_1c')
    }
  }) : _vm._e(), _c('div', [(_vm.item.promotion_tips) ? _c('text', {
    staticClass: ["promotion-tips"]
  }, [_vm._v(_vm._s(_vm.item.promotion_tips))]) : _vm._e()]), _c('div', {
    staticClass: ["goods-name-container"]
  }, [(_vm.item.preview.name) ? _c('text', {
    staticClass: ["goods-name"]
  }, [_vm._v(_vm._s(_vm.item.preview.name))]) : _vm._e(), _c('text', [_vm._v(_vm._s(_vm.item.currentIndex))])]), _c('div', {
    staticClass: ["price-bar"]
  }, [_c('div', {
    staticClass: ["price-text"]
  }, [_c('text', {
    staticClass: ["price-word"]
  }, [_vm._v(_vm._s(_vm.price.p1))]), _c('text', {
    staticClass: ["price-number"]
  }, [_vm._v(_vm._s(_vm.price.price))]), _c('text', {
    staticClass: ["price-word"]
  }, [_vm._v(_vm._s(_vm.price.p2))])]), _c('image', {
    staticClass: ["bottom-cart"],
    attrs: {
      "src": "https://m.meijiabang.cn/img/icon/add-cart@2x.png"
    }
  })])])
},staticRenderFns: []}

/***/ }),
/* 189 */
/***/ (function(module, exports) {

module.exports={render:function (){var _vm=this;var _h=_vm.$createElement;var _c=_vm._self._c||_h;
  return _c(_vm.single ? 'single-goods-item' : 'multiple-goods-item', {
    tag: "component",
    attrs: {
      "hideDivider": _vm.hideDivider,
      "item": _vm.item
    },
    nativeOn: {
      "click": function($event) {
        _vm.jump(_vm.item)
      }
    }
  })
},staticRenderFns: []}

/***/ }),
/* 190 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
Object.defineProperty(__webpack_exports__, "__esModule", { value: true });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__index_vue__ = __webpack_require__(191);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__index_vue___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_0__index_vue__);
/* harmony reexport (default from non-hamory) */ __webpack_require__.d(__webpack_exports__, "default", function() { return __WEBPACK_IMPORTED_MODULE_0__index_vue___default.a; });


/***/ }),
/* 191 */
/***/ (function(module, exports, __webpack_require__) {

var __vue_exports__, __vue_options__
var __vue_styles__ = []

/* styles */
__vue_styles__.push(__webpack_require__(192)
)

/* script */
__vue_exports__ = __webpack_require__(193)

/* template */
var __vue_template__ = __webpack_require__(199)
__vue_options__ = __vue_exports__ = __vue_exports__ || {}
if (
  typeof __vue_exports__.default === "object" ||
  typeof __vue_exports__.default === "function"
) {
__vue_options__ = __vue_exports__ = __vue_exports__.default
}
if (typeof __vue_options__ === "function") {
  __vue_options__ = __vue_options__.options
}

__vue_options__.render = __vue_template__.render
__vue_options__.staticRenderFns = __vue_template__.staticRenderFns
__vue_options__._scopeId = "data-v-4f65317e"
__vue_options__.style = __vue_options__.style || {}
__vue_styles__.forEach(function (module) {
  for (var name in module) {
    __vue_options__.style[name] = module[name]
  }
})
if (typeof __register_static_styles__ === "function") {
  __register_static_styles__(__vue_options__._scopeId, __vue_styles__)
}

module.exports = __vue_exports__


/***/ }),
/* 192 */
/***/ (function(module, exports) {

module.exports = {
  "waterfall-item": {
    "marginTop": "18"
  },
  "goods-list-container": {
    "alignItems": "center"
  }
}

/***/ }),
/* 193 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
Object.defineProperty(__webpack_exports__, "__esModule", { value: true });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0_babel_runtime_regenerator__ = __webpack_require__(12);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0_babel_runtime_regenerator___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_0_babel_runtime_regenerator__);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1_babel_runtime_helpers_asyncToGenerator__ = __webpack_require__(13);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1_babel_runtime_helpers_asyncToGenerator___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_1_babel_runtime_helpers_asyncToGenerator__);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2_weex_ui_packages_wxc_part_loading__ = __webpack_require__(194);





/* harmony default export */ __webpack_exports__["default"] = ({
	name: 'goods-list',
	props: {
		itemStyle: {
			type: String,
			default: '1'
		},
		goodsId: {
			type: String,
			default: ''
		}
	},
	components: {
		WxcPartLoading: __WEBPACK_IMPORTED_MODULE_2_weex_ui_packages_wxc_part_loading__["a" /* default */]
	},
	data: function data() {
		return {
			items: [],
			showLoading: true
		};
	},

	watch: {
		goodsId: function goodsId() {
			this.getGoodsInfo();
		}
	},
	methods: {
		report: function report(id) {
			var evt = new Event('userTrack');
			evt.data = {
				action: '\u70B9\u51FB\u666E\u901A\u5546\u54C1' + (this.itemStyle === '2' ? '一行一个' : '瀑布流'), options: {
					goods_id: id
				}
			};
			document.dispatchEvent(evt);
		},
		getGoodsInfo: function getGoodsInfo() {
			var _this = this;

			return __WEBPACK_IMPORTED_MODULE_1_babel_runtime_helpers_asyncToGenerator___default()( /*#__PURE__*/__WEBPACK_IMPORTED_MODULE_0_babel_runtime_regenerator___default.a.mark(function _callee() {
				return __WEBPACK_IMPORTED_MODULE_0_babel_runtime_regenerator___default.a.wrap(function _callee$(_context) {
					while (1) {
						switch (_context.prev = _context.next) {
							case 0:
								_context.next = 2;
								return _this.goodsId;

							case 2:
								_context.t0 = _context.sent;

								if (!_context.t0) {
									_context.next = 5;
									break;
								}

								_this.$api.get({
									host: 'cdn',
									version: 'v1',
									path: 'goods',
									data: {
										fields: 'items[].preview.if_show,items[].preview.type,items[].goods_id,items[].mark_image.s(187|webp|0),items[].bottom_mark_image.s(320),items[].price_grade.price,items[].price_grade.desc,items[].price_grade.name,items[].price_grade.mark_image,items[].preview.lowest_price,items[].preview.name,items[].preview.cover.s(360|png),items[].preview.stock,items[].preview.original_price,items[].preview.sale_price,items[].sales_promotion.tag_image,items[].sales_promotion.promotion_mark.s(187|webp|0),items[].status,items[].sale_mode,items[].spec_select_mode,items[].promotion_tips,items[].attribute_tag,items[].buy_limit_app_route,items[].has_color_spec_group,items[].presale_info,attrs,recommend_keywords,navigators',
										goods_id: _this.goodsId,
										offset: 0,
										limit: 500,
										___cdn_cache_time: 30
									}
								}).then(function (res) {
									var data = res.data;
									_this.items = data.data.items;
								}).catch(function (err) {
									console.log(err);
								});

							case 5:
								_this.showLoading = false;

							case 6:
							case 'end':
								return _context.stop();
						}
					}
				}, _callee, _this);
			}))();
		}
	},
	created: function created() {
		this.getGoodsInfo();
	}
}); //
//
//
//
//
//
//
//
//
//
//
//
//
//
//

/***/ }),
/* 194 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__index_vue__ = __webpack_require__(195);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__index_vue___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_0__index_vue__);
/* harmony reexport (default from non-hamory) */ __webpack_require__.d(__webpack_exports__, "a", function() { return __WEBPACK_IMPORTED_MODULE_0__index_vue___default.a; });


/***/ }),
/* 195 */
/***/ (function(module, exports, __webpack_require__) {

var __vue_exports__, __vue_options__
var __vue_styles__ = []

/* script */
__vue_exports__ = __webpack_require__(196)

/* template */
var __vue_template__ = __webpack_require__(198)
__vue_options__ = __vue_exports__ = __vue_exports__ || {}
if (
  typeof __vue_exports__.default === "object" ||
  typeof __vue_exports__.default === "function"
) {
__vue_options__ = __vue_exports__ = __vue_exports__.default
}
if (typeof __vue_options__ === "function") {
  __vue_options__ = __vue_options__.options
}

__vue_options__.render = __vue_template__.render
__vue_options__.staticRenderFns = __vue_template__.staticRenderFns
__vue_options__.style = __vue_options__.style || {}
__vue_styles__.forEach(function (module) {
  for (var name in module) {
    __vue_options__.style[name] = module[name]
  }
})
if (typeof __register_static_styles__ === "function") {
  __register_static_styles__(__vue_options__._scopeId, __vue_styles__)
}

module.exports = __vue_exports__


/***/ }),
/* 196 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
Object.defineProperty(__webpack_exports__, "__esModule", { value: true });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__wxc_loading_type__ = __webpack_require__(197);
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//



/* harmony default export */ __webpack_exports__["default"] = ({
  props: {
    show: {
      type: Boolean,
      default: false
    },
    width: {
      type: [Number, String],
      default: 36
    },
    height: {
      type: [Number, String],
      default: 36
    }
  },
  data: function data() {
    return {
      PART: __WEBPACK_IMPORTED_MODULE_0__wxc_loading_type__["a" /* PART */]
    };
  },
  computed: {
    loadingStyle: function loadingStyle() {
      var height = this.height,
          width = this.width;

      return {
        height: height + 'px',
        width: width + 'px'
      };
    }
  }
});

/***/ }),
/* 197 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* unused harmony export GIF */
/* unused harmony export BLACK_GIF */
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return PART; });
/**
 * Created by Tw93 on 2016/10/29.
 */

var GIF = 'https://img.alicdn.com/tfs/TB1aks3PpXXXXcXXFXXXXXXXXXX-150-150.gif';
var BLACK_GIF = 'https://img.alicdn.com/tfs/TB1Ep_9NVXXXXb8XVXXXXXXXXXX-74-74.gif';
var PART = 'https://gtms02.alicdn.com/tfs/TB1y4QbSXXXXXbgapXXXXXXXXXX-50-50.gif';

/***/ }),
/* 198 */
/***/ (function(module, exports) {

module.exports={render:function (){var _vm=this;var _h=_vm.$createElement;var _c=_vm._self._c||_h;
  return _c('div', [(_vm.show) ? _c('image', {
    style: _vm.loadingStyle,
    attrs: {
      "src": _vm.PART,
      "resize": "contain",
      "quality": "original"
    }
  }) : _vm._e()])
},staticRenderFns: []}

/***/ }),
/* 199 */
/***/ (function(module, exports) {

module.exports={render:function (){var _vm=this;var _h=_vm.$createElement;var _c=_vm._self._c||_h;
  return _c('div', {
    staticClass: ["goods-list-container"]
  }, [_c('wxc-part-loading', {
    attrs: {
      "show": _vm.showLoading
    }
  }), (_vm.itemStyle === '1') ? _c('f-waterfall', {
    ref: "waterfall",
    staticClass: ["waterfall"],
    attrs: {
      "columnCount": 2,
      "columnGap": 18,
      "columnWidth": 'auto',
      "items": _vm.items
    },
    on: {
      "report": _vm.report,
      "update:items": function($event) {
        _vm.items = $event
      }
    }
  }) : _vm._e(), (_vm.itemStyle === '2') ? _c('list', _vm._l((_vm.items), function(item, index) {
    return (item.status !== 3 && item.preview.cover && item.sale_mode !== 1 && item.preview.type != 3 && item.preview.if_show != '0') ? _c('cell', {
      staticClass: ["cell"],
      appendAsTree: true,
      attrs: {
        "append": "tree"
      }
    }, [_c('goods-item', {
      attrs: {
        "item": item,
        "single": ""
      },
      on: {
        "report": _vm.report
      }
    })], 1) : _vm._e()
  })) : _vm._e()], 1)
},staticRenderFns: []}

/***/ }),
/* 200 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
Object.defineProperty(__webpack_exports__, "__esModule", { value: true });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__index_vue__ = __webpack_require__(201);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__index_vue___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_0__index_vue__);
/* harmony reexport (default from non-hamory) */ __webpack_require__.d(__webpack_exports__, "default", function() { return __WEBPACK_IMPORTED_MODULE_0__index_vue___default.a; });


/***/ }),
/* 201 */
/***/ (function(module, exports, __webpack_require__) {

var __vue_exports__, __vue_options__
var __vue_styles__ = []

/* styles */
__vue_styles__.push(__webpack_require__(202)
)

/* script */
__vue_exports__ = __webpack_require__(203)

/* template */
var __vue_template__ = __webpack_require__(204)
__vue_options__ = __vue_exports__ = __vue_exports__ || {}
if (
  typeof __vue_exports__.default === "object" ||
  typeof __vue_exports__.default === "function"
) {
__vue_options__ = __vue_exports__ = __vue_exports__.default
}
if (typeof __vue_options__ === "function") {
  __vue_options__ = __vue_options__.options
}

__vue_options__.render = __vue_template__.render
__vue_options__.staticRenderFns = __vue_template__.staticRenderFns
__vue_options__._scopeId = "data-v-aa8c4c78"
__vue_options__.style = __vue_options__.style || {}
__vue_styles__.forEach(function (module) {
  for (var name in module) {
    __vue_options__.style[name] = module[name]
  }
})
if (typeof __register_static_styles__ === "function") {
  __register_static_styles__(__vue_options__._scopeId, __vue_styles__)
}

module.exports = __vue_exports__


/***/ }),
/* 202 */
/***/ (function(module, exports) {

module.exports = {
  "image": {
    "borderStyle": "solid",
    "boxSizing": "border-box"
  }
}

/***/ }),
/* 203 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
Object.defineProperty(__webpack_exports__, "__esModule", { value: true });
//
//
//

/* harmony default export */ __webpack_exports__["default"] = ({
	name: 'image-router',
	props: {
		imageSrc: {
			type: String,
			default: '',
			required: true
		},
		route: {
			type: String,
			default: '',
			required: true
		},
		width: {
			type: [String, Number],
			required: true,
			default: '750px'
		},
		height: {
			type: [String, Number],
			required: true,
			default: '750px'
		}
	},
	computed: {
		src: function src() {
			return this.imageSrc;
		},
		computedWidth: function computedWidth() {
			return this.width;
		},
		computedHeight: function computedHeight() {
			return this.height;
		}
	},
	data: function data() {
		return {};
	},

	methods: {
		jumpRoute: function jumpRoute() {
			var _this = this;

			var appRoute = this.route;
			this.$emit('report', decodeURIComponent(appRoute));
			if (appRoute) {
				setTimeout(function () {
					_this.$module('mjb-native').route(appRoute);
				}, 300);
			}
		}
	}
});

/***/ }),
/* 204 */
/***/ (function(module, exports) {

module.exports={render:function (){var _vm=this;var _h=_vm.$createElement;var _c=_vm._self._c||_h;
  return (_vm.src) ? _c('image', {
    staticClass: ["image"],
    style: {
      width: _vm.computedWidth,
      height: _vm.computedHeight
    },
    attrs: {
      "src": _vm.src
    },
    on: {
      "click": _vm.jumpRoute
    }
  }) : _vm._e()
},staticRenderFns: []}

/***/ }),
/* 205 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
Object.defineProperty(__webpack_exports__, "__esModule", { value: true });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__index_vue__ = __webpack_require__(206);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__index_vue___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_0__index_vue__);
/* harmony reexport (default from non-hamory) */ __webpack_require__.d(__webpack_exports__, "default", function() { return __WEBPACK_IMPORTED_MODULE_0__index_vue___default.a; });


/***/ }),
/* 206 */
/***/ (function(module, exports, __webpack_require__) {

var __vue_exports__, __vue_options__
var __vue_styles__ = []

/* styles */
__vue_styles__.push(__webpack_require__(207)
)

/* script */
__vue_exports__ = __webpack_require__(208)

/* template */
var __vue_template__ = __webpack_require__(210)
__vue_options__ = __vue_exports__ = __vue_exports__ || {}
if (
  typeof __vue_exports__.default === "object" ||
  typeof __vue_exports__.default === "function"
) {
__vue_options__ = __vue_exports__ = __vue_exports__.default
}
if (typeof __vue_options__ === "function") {
  __vue_options__ = __vue_options__.options
}

__vue_options__.render = __vue_template__.render
__vue_options__.staticRenderFns = __vue_template__.staticRenderFns
__vue_options__._scopeId = "data-v-044bbad4"
__vue_options__.style = __vue_options__.style || {}
__vue_styles__.forEach(function (module) {
  for (var name in module) {
    __vue_options__.style[name] = module[name]
  }
})
if (typeof __register_static_styles__ === "function") {
  __register_static_styles__(__vue_options__._scopeId, __vue_styles__)
}

module.exports = __vue_exports__


/***/ }),
/* 207 */
/***/ (function(module, exports) {

module.exports = {
  "login-bg": {
    "position": "fixed",
    "top": 0,
    "left": 0,
    "width": 100,
    "height": 100,
    "zIndex": 999
  },
  "box": {
    "position": "absolute",
    "alignItems": "center",
    "top": 0,
    "left": 0,
    "right": 0,
    "bottom": 0,
    "backgroundColor": "#ffffff",
    "borderRadius": 0.25,
    "width": 8,
    "height": 6.25,
    "boxShadow": "2px 2px 8px #aaa",
    "textAlign": "center",
    "animation": "big .5s both"
  },
  "title": {
    "fontSize": "23",
    "color": "#555555",
    "lineHeight": "23",
    "marginTop": 1.25,
    "marginBottom": 0.5
  },
  "ts": {
    "fontSize": 0.35,
    "color": "#aaaaaa",
    "lineHeight": 0.35,
    "marginTop": 0.25
  },
  "close": {
    "position": "absolute",
    "top": 0.25,
    "right": 0.5,
    "color": "#777777",
    "fontSize": 0.35
  },
  "input-phone-view-p": {
    "display": "inline-block",
    "textAlign": "center",
    "width": 6,
    "height": 1,
    "lineHeight": 1,
    "borderRadius": 0.5,
    "marginBottom": 0.25,
    "fontSize": 0.35,
    "fontWeight": "100",
    "backgroundColor": "#ff99ae",
    "color": "#ffffff",
    "borderColor": "#ff99ae"
  },
  "input-phone-view-input": {
    "border": "1px solid #ccc",
    "textAlign": "center",
    "borderRadius": 0.5,
    "marginBottom": 0.25,
    "width": 6,
    "height": 1,
    "fontSize": 0.35
  },
  "anew": {
    "marginTop": 0.25,
    "marginBottom": 0.5,
    "fontSize": 0.35,
    "color": "#aaaaaa",
    "lineHeight": 0.35,
    "paddingBottom": 0.25,
    "width": 8,
    "textAlign": "center"
  },
  "user-msg": {
    "fontSize": 0.35,
    "color": "#aaaaaa",
    "lineHeight": 0.35,
    "paddingBottom": 0.25,
    "width": 8,
    "textAlign": "center"
  },
  "anew-btn": {
    "color": "#ff99ae"
  },
  "input-verification-view": {
    "alignItems": "center"
  },
  "input-verification-view-input": {
    "border": "1px solid #ccc",
    "textAlign": "center",
    "borderRadius": 0.5,
    "marginBottom": 0.25,
    "width": 6,
    "height": 1,
    "fontSize": 0.35
  },
  "@FONT-FACE": [
    {
      "fontFamily": "iconfont",
      "src": "url('//at.alicdn.com/t/font_1468830346_790904.eot?#iefix') format('embedded-opentype'), url('//at.alicdn.com/t/font_1468830346_790904.woff') format('woff'), url('//at.alicdn.com/t/font_1468830346_790904.ttf') format('truetype'), url('//at.alicdn.com/t/font_1468830346_790904.svg#iconfont') format('svg')"
    }
  ],
  "icon": {
    "fontFamily": "\"iconfont\" !important",
    "fontStyle": "normal",
    "display": "inline-block",
    "verticalAlign": "middle",
    "backgroundSize": "100% auto",
    "backgroundPosition": "center",
    "WebkitFontSmoothing": "antialiased",
    "WebkitTextStrokeWidth": "0.2",
    "MozOsxFontSmoothing": "grayscale"
  },
  "icon-check": {
    "content:before": "\"\\e600\""
  },
  "icon-close": {
    "content:before": "\"\\e601\""
  },
  "icon-refresh": {
    "content:before": "\"\\e605\""
  },
  "icon-top": {
    "content:before": "\"\\e603\""
  },
  "icon-loading": {
    "content:before": "\"\\e607\""
  },
  "icon-back": {
    "content:before": "\"\\e602\""
  },
  "icon-right": {
    "content:before": "\"\\e604\""
  }
}

/***/ }),
/* 208 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
Object.defineProperty(__webpack_exports__, "__esModule", { value: true });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0_babel_runtime_regenerator__ = __webpack_require__(12);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0_babel_runtime_regenerator___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_0_babel_runtime_regenerator__);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1_babel_runtime_helpers_asyncToGenerator__ = __webpack_require__(13);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1_babel_runtime_helpers_asyncToGenerator___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_1_babel_runtime_helpers_asyncToGenerator__);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2__utils_phone__ = __webpack_require__(209);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_3__utils_env__ = __webpack_require__(11);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_4__utils_web_cookie__ = __webpack_require__(29);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_5__utils_web_url__ = __webpack_require__(17);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_6__utils_web_js_bridge__ = __webpack_require__(68);


//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//







/* harmony default export */ __webpack_exports__["default"] = ({
	name: 'login-box',
	data: function data() {
		return {
			show: false,
			showClass: false,
			phoneText: '',
			verificationText: '',
			inputType: true,
			time: 60,
			notTime: true
		};
	},

	methods: {
		showLogin: function showLogin() {
			var _this = this;

			return __WEBPACK_IMPORTED_MODULE_1_babel_runtime_helpers_asyncToGenerator___default()( /*#__PURE__*/__WEBPACK_IMPORTED_MODULE_0_babel_runtime_regenerator___default.a.mark(function _callee2() {
				return __WEBPACK_IMPORTED_MODULE_0_babel_runtime_regenerator___default.a.wrap(function _callee2$(_context2) {
					while (1) {
						switch (_context2.prev = _context2.next) {
							case 0:
								if (__WEBPACK_IMPORTED_MODULE_3__utils_env__["a" /* default */].isMjb()) {
									if (__WEBPACK_IMPORTED_MODULE_3__utils_env__["a" /* default */].isMeijiabangJSBridgeReady()) {
										window.MeijiabangJSBridge.callHandler('login', { 'force': true }, function () {
											var _ref = __WEBPACK_IMPORTED_MODULE_1_babel_runtime_helpers_asyncToGenerator___default()( /*#__PURE__*/__WEBPACK_IMPORTED_MODULE_0_babel_runtime_regenerator___default.a.mark(function _callee(res) {
												return __WEBPACK_IMPORTED_MODULE_0_babel_runtime_regenerator___default.a.wrap(function _callee$(_context) {
													while (1) {
														switch (_context.prev = _context.next) {
															case 0:
																if (!res.error_code) {
																	_context.next = 5;
																	break;
																}

																console.log('错误码：' + res.error_code + '错误原因：' + res.error_description);
																_this.$emit('callback', res);
																_context.next = 9;
																break;

															case 5:
																console.log('登录成功', res);
																_context.next = 8;
																return _this.$module('mjb-native').getAccessToken().then(function (res) {
																	var data = res.data;
																	__WEBPACK_IMPORTED_MODULE_4__utils_web_cookie__["a" /* default */].setCookie('g0yk_6c66_access_token', data.access_token, {
																		expires: new Date(data.expired_date),
																		domain: __WEBPACK_IMPORTED_MODULE_5__utils_web_url__["a" /* default */].getRootDomain(),
																		path: '/'
																	});
																});

															case 8:
																_this.$emit('callback', res);
																//							app.onMeijiabangJsBridgeReady(success);

															case 9:
															case 'end':
																return _context.stop();
														}
													}
												}, _callee, _this);
											}));

											return function (_x) {
												return _ref.apply(this, arguments);
											};
										}());
									} else {
										__WEBPACK_IMPORTED_MODULE_6__utils_web_js_bridge__["a" /* default */].ready(function () {
											_this.showLogin();
										});
									}
								} else {
									_this.phoneText = '';
									_this.show = true;
									_this.inputType = true;
								}

							case 1:
							case 'end':
								return _context2.stop();
						}
					}
				}, _callee2, _this);
			}))();
		},
		closeLogin: function closeLogin() {
			this.show = false;
			this.$emit('callback');
		},
		getVerification: function getVerification() {
			var _this2 = this;

			if (__WEBPACK_IMPORTED_MODULE_2__utils_phone__["a" /* default */].verify(this.phoneText)) {
				this.notTime = true;
				this.time = 60;
				this.inputType = false;
				var interval = setInterval(function () {
					if (_this2.time <= 0) {
						clearInterval(interval);
						_this2.notTime = false;
					} else {
						_this2.time--;
					}
				}, 1000);
				this.$api.get({
					path: 'user/phone/verification_code',
					data: {
						phone: this.phoneText,
						usage: 'user_login'
					}
				}).then(function (res) {}).catch(function () {
					_this2.$api.toast('网络出错，请稍候重试');
				});
			} else {
				this.$api.toast('请输入正确的手机号');
			}
		},
		loginOperation: function loginOperation() {
			var _this3 = this;

			if (this.verificationText.length >= 6) {
				// Util.startLoading()
				this.$api.post({
					version: 'v1',
					path: 'login',
					data: {
						fields: 'uid',
						account: this.phoneText,
						verification_code: this.verificationText,
						type: 'verification_code'
					}
				}).then(function (res) {
					_this3.show = false;
					_this3.$emit('callback', res);
				}).catch(function () {
					_this3.$api.toast('网络错误,请重试(。-`ω´-)');
				});
			}
		}
	}
});

/***/ }),
/* 209 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony default export */ __webpack_exports__["a"] = ({
	verify: function verify(value) {
		var zz = /^(0|86|17951)?(1[0-9])[0-9]{9}$/;
		if (zz.test(value) === false) {
			return false;
		} else if (zz.test(value) === true || value === '') {
			return true;
		} else {
			console.log('操作失败');
			return false;
		}
	}
});

/***/ }),
/* 210 */
/***/ (function(module, exports) {

module.exports={render:function (){var _vm=this;var _h=_vm.$createElement;var _c=_vm._self._c||_h;
  return _c('div', {
    staticClass: ["login"]
  }, [(_vm.show) ? _c('div', {
    class: {
      'login-bg': _vm.show
    }
  }, [_c('div', {
    staticClass: ["box"]
  }, [_c('i', {
    staticClass: ["close", "icon", "icon-close"],
    on: {
      "click": _vm.closeLogin
    }
  }), _c('p', {
    staticClass: ["title"]
  }, [_vm._v("欢迎来到美甲帮")]), _c('div', {
    directives: [{
      name: "show",
      rawName: "v-show",
      value: (_vm.inputType),
      expression: "inputType"
    }],
    staticClass: ["input-phone-view"]
  }, [_c('input', {
    staticClass: ["input-phone-view-input"],
    attrs: {
      "placeholder": "请输入手机号",
      "value": (_vm.phoneText)
    },
    on: {
      "input": function($event) {
        _vm.phoneText = $event.target.attr.value
      }
    }
  }), _c('p', {
    staticClass: ["input-phone-view-p"],
    on: {
      "click": _vm.getVerification
    }
  }, [_vm._v("获取验证码")])], 1), _c('div', {
    directives: [{
      name: "show",
      rawName: "v-show",
      value: (!_vm.inputType),
      expression: "!inputType"
    }],
    staticClass: ["input-verification-view"]
  }, [_c('p', {
    staticClass: ["user-msg"]
  }, [_vm._v("验证码已发送至:+86 " + _vm._s(_vm.phoneText))]), _c('input', {
    staticClass: ["input-verification-view-input"],
    attrs: {
      "maxlength": "6",
      "placeholder": "请输入验证码",
      "value": (_vm.verificationText)
    },
    on: {
      "input": [function($event) {
        _vm.verificationText = $event.target.attr.value
      }, _vm.loginOperation]
    }
  }), _c('p', {
    directives: [{
      name: "show",
      rawName: "v-show",
      value: (_vm.notTime),
      expression: "notTime"
    }],
    staticClass: ["anew"]
  }, [_vm._v(_vm._s(_vm.time) + "秒后可重新获取")]), _c('p', {
    directives: [{
      name: "show",
      rawName: "v-show",
      value: (!_vm.notTime),
      expression: "!notTime"
    }],
    staticClass: ["anew", "anew-btn"],
    on: {
      "click": _vm.getVerification
    }
  }, [_vm._v("重新获取")])], 1), _c('p', {
    staticClass: ["ts"]
  }, [_vm._v("请获取手机验证码登陆美甲帮")])], 1)]) : _vm._e()])
},staticRenderFns: []}

/***/ }),
/* 211 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
Object.defineProperty(__webpack_exports__, "__esModule", { value: true });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__index_vue__ = __webpack_require__(212);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__index_vue___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_0__index_vue__);
/* harmony reexport (default from non-hamory) */ __webpack_require__.d(__webpack_exports__, "default", function() { return __WEBPACK_IMPORTED_MODULE_0__index_vue___default.a; });


/***/ }),
/* 212 */
/***/ (function(module, exports, __webpack_require__) {

var __vue_exports__, __vue_options__
var __vue_styles__ = []

/* styles */
__vue_styles__.push(__webpack_require__(213)
)

/* script */
__vue_exports__ = __webpack_require__(214)

/* template */
var __vue_template__ = __webpack_require__(215)
__vue_options__ = __vue_exports__ = __vue_exports__ || {}
if (
  typeof __vue_exports__.default === "object" ||
  typeof __vue_exports__.default === "function"
) {
__vue_options__ = __vue_exports__ = __vue_exports__.default
}
if (typeof __vue_options__ === "function") {
  __vue_options__ = __vue_options__.options
}

__vue_options__.render = __vue_template__.render
__vue_options__.staticRenderFns = __vue_template__.staticRenderFns
__vue_options__._scopeId = "data-v-24d5e8da"
__vue_options__.style = __vue_options__.style || {}
__vue_styles__.forEach(function (module) {
  for (var name in module) {
    __vue_options__.style[name] = module[name]
  }
})
if (typeof __register_static_styles__ === "function") {
  __register_static_styles__(__vue_options__._scopeId, __vue_styles__)
}

module.exports = __vue_exports__


/***/ }),
/* 213 */
/***/ (function(module, exports) {

module.exports = {
  "force-modal": {
    "position": "fixed",
    "top": 0,
    "left": 0,
    "zIndex": 9999
  },
  "force-modal-wrapper": {
    "flexDirection": "row",
    "justifyContent": "center",
    "alignItems": "center",
    "width": "750",
    "backgroundColor": "rgba(0,0,0,0.5)"
  },
  "force-modal-body": {
    "alignItems": "center",
    "justifyContent": "flex-start",
    "width": "600",
    "height": "432",
    "backgroundColor": "#ffffff",
    "borderRadius": "16",
    "textAlign": "center"
  },
  "force-modal-image": {
    "marginTop": "70",
    "width": "234",
    "height": "222"
  },
  "force-modal-text": {
    "marginTop": "20",
    "fontSize": "36"
  }
}

/***/ }),
/* 214 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
Object.defineProperty(__webpack_exports__, "__esModule", { value: true });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__utils__ = __webpack_require__(45);
//
//
//
//
//
//
//
//
//
//



/* harmony default export */ __webpack_exports__["default"] = ({
	name: 'modal-box',
	props: {
		src: {
			type: String,
			default: ''
		},
		text: {
			type: String,
			default: ''
		}
	},
	data: function data() {
		return {
			height: ''
		};
	},
	mounted: function mounted() {
		var scale = weex.config.env.deviceModel === 'unknown' ? weex.config.env.scale : 1;
		this.height = weex.config.env.deviceHeight / scale + 'px';
		console.log(2, weex.config.env.deviceModel, weex.config.env.deviceHeight, weex.config.env.scale, this.height);
	}
});

/***/ }),
/* 215 */
/***/ (function(module, exports) {

module.exports={render:function (){var _vm=this;var _h=_vm.$createElement;var _c=_vm._self._c||_h;
  return _c('div', {
    staticClass: ["force-modal"]
  }, [_c('div', {
    staticClass: ["force-modal-wrapper"],
    style: {
      height: _vm.height
    },
    on: {
      "touchmove": function($event) {},
      "mousewheel": function($event) {}
    }
  }, [_c('div', {
    staticClass: ["force-modal-body"]
  }, [_c('img', {
    staticClass: ["force-modal-image"],
    attrs: {
      "src": _vm.src,
      "alt": ""
    }
  }), _c('div', {
    staticClass: ["force-modal-text"]
  }, [_vm._v(_vm._s(_vm.text))])])])])
},staticRenderFns: []}

/***/ }),
/* 216 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
Object.defineProperty(__webpack_exports__, "__esModule", { value: true });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__index_vue__ = __webpack_require__(217);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__index_vue___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_0__index_vue__);
/* harmony reexport (default from non-hamory) */ __webpack_require__.d(__webpack_exports__, "default", function() { return __WEBPACK_IMPORTED_MODULE_0__index_vue___default.a; });


/***/ }),
/* 217 */
/***/ (function(module, exports, __webpack_require__) {

var __vue_exports__, __vue_options__
var __vue_styles__ = []

/* styles */
__vue_styles__.push(__webpack_require__(218)
)

/* script */
__vue_exports__ = __webpack_require__(219)

/* template */
var __vue_template__ = __webpack_require__(241)
__vue_options__ = __vue_exports__ = __vue_exports__ || {}
if (
  typeof __vue_exports__.default === "object" ||
  typeof __vue_exports__.default === "function"
) {
__vue_options__ = __vue_exports__ = __vue_exports__.default
}
if (typeof __vue_options__ === "function") {
  __vue_options__ = __vue_options__.options
}

__vue_options__.render = __vue_template__.render
__vue_options__.staticRenderFns = __vue_template__.staticRenderFns
__vue_options__._scopeId = "data-v-2ad4bffe"
__vue_options__.style = __vue_options__.style || {}
__vue_styles__.forEach(function (module) {
  for (var name in module) {
    __vue_options__.style[name] = module[name]
  }
})
if (typeof __register_static_styles__ === "function") {
  __register_static_styles__(__vue_options__._scopeId, __vue_styles__)
}

module.exports = __vue_exports__


/***/ }),
/* 218 */
/***/ (function(module, exports) {

module.exports = {
  "resource-niche-group": {
    "width": "750"
  }
}

/***/ }),
/* 219 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
Object.defineProperty(__webpack_exports__, "__esModule", { value: true });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0_babel_runtime_helpers_toConsumableArray__ = __webpack_require__(47);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0_babel_runtime_helpers_toConsumableArray___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_0_babel_runtime_helpers_toConsumableArray__);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__config__ = __webpack_require__(220);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2__resource_niche_a1_vue__ = __webpack_require__(221);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2__resource_niche_a1_vue___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_2__resource_niche_a1_vue__);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_3__resource_niche_a2_vue__ = __webpack_require__(225);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_3__resource_niche_a2_vue___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_3__resource_niche_a2_vue__);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_4__resource_niche_a3_vue__ = __webpack_require__(229);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_4__resource_niche_a3_vue___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_4__resource_niche_a3_vue__);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_5__resource_niche_a4_vue__ = __webpack_require__(233);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_5__resource_niche_a4_vue___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_5__resource_niche_a4_vue__);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_6__resource_niche_a5_vue__ = __webpack_require__(237);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_6__resource_niche_a5_vue___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_6__resource_niche_a5_vue__);

//
//
//
//
//








var getScaledHeight = function getScaledHeight(originalWidth, scaledWidth, originalHeight) {
	var ow = parseInt(originalWidth);
	var sw = parseInt(scaledWidth);
	var oh = parseInt(originalHeight);

	return parseInt(sw * oh / ow) + 'px';
};

/* harmony default export */ __webpack_exports__["default"] = ({
	name: 'resource-niche-group',
	props: {
		itemStyle: {
			type: String,
			default: 'A1'
		},
		imageList: {
			type: Array,
			default: function _default() {
				return [];
			}
		}
	},
	components: {
		ResourceNicheA1: __WEBPACK_IMPORTED_MODULE_2__resource_niche_a1_vue___default.a,
		ResourceNicheA2: __WEBPACK_IMPORTED_MODULE_3__resource_niche_a2_vue___default.a,
		ResourceNicheA3: __WEBPACK_IMPORTED_MODULE_4__resource_niche_a3_vue___default.a,
		ResourceNicheA4: __WEBPACK_IMPORTED_MODULE_5__resource_niche_a4_vue___default.a,
		ResourceNicheA5: __WEBPACK_IMPORTED_MODULE_6__resource_niche_a5_vue___default.a
	},
	computed: {
		group: function group() {
			var _this = this;

			var itemStyle = this.itemStyle.toLowerCase();

			var imageHeight = '200px';

			if (itemStyle === 'a1') {
				return this.imageList.map(function (image) {
					return {
						is: 'resource-niche-' + itemStyle,
						images: _this.getImageObject('a1', 0, image, '750px', getScaledHeight(image.width, '750px', image.height))
					};
				});
			} else {
				var length = this.imageList.length;
				var len = Number(itemStyle.slice(-1));
				var imageWidth = 750 / len + 'px';

				// a5 特殊处理
				if (itemStyle === 'a5') {
					len = 3;
					imageWidth = '375px';
				}
				var list = [];
				var tempList = [];
				if (length) {
					if (length % len === 0) {
						// 能整除
						this.imageList.map(function (image, index) {
							tempList.push(_this.getImageObject(itemStyle, index, image, imageWidth, getScaledHeight(image.width, imageWidth, image.height)));

							if ((index + 1) % len === 0) {
								list.push({ is: 'resource-niche-' + itemStyle, images: [].concat(__WEBPACK_IMPORTED_MODULE_0_babel_runtime_helpers_toConsumableArray___default()(tempList)) });
								tempList = [];
							}
						});
					} else if (this.imageList.length % len === 1) {
						// 不能整除且余数为一
						this.imageList.map(function (image, index) {
							tempList.push(_this.getImageObject(itemStyle, index, image, imageWidth, getScaledHeight(image.width, imageWidth, image.height)));
							// last one
							if (index === length - 1) {
								list.push({
									is: 'resource-niche-a1',
									images: _this.getImageObject('a1', index, image, '750px', getScaledHeight(image.width, '750px', image.height))

								});
							} else if ((index + 1) % len === 0) {
								list.push({ is: 'resource-niche-' + itemStyle, images: [].concat(__WEBPACK_IMPORTED_MODULE_0_babel_runtime_helpers_toConsumableArray___default()(tempList)) });
								tempList = [];
							}
						});
					} else {
						// 不能整除且余数不为1
						this.imageList.map(function (image, index) {
							var styleType = itemStyle;
							if (index > length - 1 - length % len) {
								styleType = styleType.replace(/\d/ig, length % len);
								imageWidth = 750 / (length % len) + 'px';
							}

							tempList.push(_this.getImageObject(styleType, index, image, imageWidth, getScaledHeight(image.width, imageWidth, image.height)));

							if ((index + 1) % len === 0 || index === length - 1) {
								list.push({ is: 'resource-niche-' + styleType, images: [].concat(__WEBPACK_IMPORTED_MODULE_0_babel_runtime_helpers_toConsumableArray___default()(tempList)) });
								tempList = [];
							}
						});
					}
				}
				return list;
			}
			return [];
		}
	},
	data: function data() {
		return {};
	},

	methods: {
		report: function report() {
			var obj = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : {};

			var evt = new Event('userTrack');
			evt.data = {
				action: '\u70B9\u51FB\u5E7F\u544A\u7EC4' + this.itemStyle.toUpperCase(), options: {
					app_route: obj.route,
					location: obj.location
				}
			};
			document.dispatchEvent(evt);
		},
		getImageObject: function getImageObject(type, index, image, imageWidth, imageHeight) {

			// a5的特殊处理
			//				if (type === 'a5') {
			//					if ((index + 1) % 3 === 1) {
			//						imageHeight = (parseInt(imageHeight) * 2) + 'px'
			//					}
			//				}
			return {
				imageSrc: image.imageSrc,
				width: imageWidth,
				height: imageHeight,
				route: image.route
			};
		}
	}
});

/***/ }),
/* 220 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* unused harmony default export */ var _unused_webpack_default_export = ({
	name: '广告组',
	type: 'resource-niche-group',
	accepts: ['image-router'],
	items: [{
		name: 'radio-group',
		label: '样式选择',
		prop: 'itemStyle',
		value: 'A1',
		values: ['A1', 'A2', 'A3', 'A4', 'A5'],
		dependencies: [],
		required: true,
		props: {},
		type: ''
	}],
	components: []
});

/***/ }),
/* 221 */
/***/ (function(module, exports, __webpack_require__) {

var __vue_exports__, __vue_options__
var __vue_styles__ = []

/* styles */
__vue_styles__.push(__webpack_require__(222)
)

/* script */
__vue_exports__ = __webpack_require__(223)

/* template */
var __vue_template__ = __webpack_require__(224)
__vue_options__ = __vue_exports__ = __vue_exports__ || {}
if (
  typeof __vue_exports__.default === "object" ||
  typeof __vue_exports__.default === "function"
) {
__vue_options__ = __vue_exports__ = __vue_exports__.default
}
if (typeof __vue_options__ === "function") {
  __vue_options__ = __vue_options__.options
}

__vue_options__.render = __vue_template__.render
__vue_options__.staticRenderFns = __vue_template__.staticRenderFns
__vue_options__._scopeId = "data-v-d6235274"
__vue_options__.style = __vue_options__.style || {}
__vue_styles__.forEach(function (module) {
  for (var name in module) {
    __vue_options__.style[name] = module[name]
  }
})
if (typeof __register_static_styles__ === "function") {
  __register_static_styles__(__vue_options__._scopeId, __vue_styles__)
}

module.exports = __vue_exports__


/***/ }),
/* 222 */
/***/ (function(module, exports) {

module.exports = {}

/***/ }),
/* 223 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
Object.defineProperty(__webpack_exports__, "__esModule", { value: true });
//
//
//

/* harmony default export */ __webpack_exports__["default"] = ({
	name: 'resource-niche-a1',
	props: {
		images: {
			type: Object,
			default: function _default() {
				return {
					imageSrc: '',
					route: '',
					width: '',
					height: ''
				};
			}
		}

	},
	data: function data() {
		return {};
	},

	methods: {
		report: function report(route) {
			this.$emit('report', {
				location: null,
				route: route
			});
		}
	}
});

/***/ }),
/* 224 */
/***/ (function(module, exports) {

module.exports={render:function (){var _vm=this;var _h=_vm.$createElement;var _c=_vm._self._c||_h;
  return _c('image-router', {
    attrs: {
      "imageSrc": _vm.images.imageSrc,
      "route": _vm.images.route,
      "width": _vm.images.width,
      "height": _vm.images.height
    },
    on: {
      "report": _vm.report
    }
  })
},staticRenderFns: []}

/***/ }),
/* 225 */
/***/ (function(module, exports, __webpack_require__) {

var __vue_exports__, __vue_options__
var __vue_styles__ = []

/* styles */
__vue_styles__.push(__webpack_require__(226)
)

/* script */
__vue_exports__ = __webpack_require__(227)

/* template */
var __vue_template__ = __webpack_require__(228)
__vue_options__ = __vue_exports__ = __vue_exports__ || {}
if (
  typeof __vue_exports__.default === "object" ||
  typeof __vue_exports__.default === "function"
) {
__vue_options__ = __vue_exports__ = __vue_exports__.default
}
if (typeof __vue_options__ === "function") {
  __vue_options__ = __vue_options__.options
}

__vue_options__.render = __vue_template__.render
__vue_options__.staticRenderFns = __vue_template__.staticRenderFns
__vue_options__._scopeId = "data-v-d6072372"
__vue_options__.style = __vue_options__.style || {}
__vue_styles__.forEach(function (module) {
  for (var name in module) {
    __vue_options__.style[name] = module[name]
  }
})
if (typeof __register_static_styles__ === "function") {
  __register_static_styles__(__vue_options__._scopeId, __vue_styles__)
}

module.exports = __vue_exports__


/***/ }),
/* 226 */
/***/ (function(module, exports) {

module.exports = {
  "a2-container": {
    "width": "750",
    "flexDirection": "row",
    "flexWrap": "wrap"
  }
}

/***/ }),
/* 227 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
Object.defineProperty(__webpack_exports__, "__esModule", { value: true });
//
//
//
//
//

/* harmony default export */ __webpack_exports__["default"] = ({
	name: 'resource-niche-a2',
	props: {
		images: {
			type: Array,
			default: function _default() {
				return [];
			}
		}

	},
	data: function data() {
		return {};
	},

	methods: {
		report: function report(route, index) {
			this.$emit('report', {
				location: 'L' + (index + 1),
				route: route
			});
		}
	}
});

/***/ }),
/* 228 */
/***/ (function(module, exports) {

module.exports={render:function (){var _vm=this;var _h=_vm.$createElement;var _c=_vm._self._c||_h;
  return _c('div', {
    staticClass: ["a2-container"]
  }, _vm._l((_vm.images), function(imageItem, index) {
    return _c('image-router', {
      key: index,
      attrs: {
        "imageSrc": imageItem.imageSrc,
        "route": imageItem.route,
        "width": imageItem.width,
        "height": imageItem.height
      },
      on: {
        "report": function($event) {
          _vm.report($event, index)
        }
      }
    })
  }))
},staticRenderFns: []}

/***/ }),
/* 229 */
/***/ (function(module, exports, __webpack_require__) {

var __vue_exports__, __vue_options__
var __vue_styles__ = []

/* styles */
__vue_styles__.push(__webpack_require__(230)
)

/* script */
__vue_exports__ = __webpack_require__(231)

/* template */
var __vue_template__ = __webpack_require__(232)
__vue_options__ = __vue_exports__ = __vue_exports__ || {}
if (
  typeof __vue_exports__.default === "object" ||
  typeof __vue_exports__.default === "function"
) {
__vue_options__ = __vue_exports__ = __vue_exports__.default
}
if (typeof __vue_options__ === "function") {
  __vue_options__ = __vue_options__.options
}

__vue_options__.render = __vue_template__.render
__vue_options__.staticRenderFns = __vue_template__.staticRenderFns
__vue_options__._scopeId = "data-v-d5eaf470"
__vue_options__.style = __vue_options__.style || {}
__vue_styles__.forEach(function (module) {
  for (var name in module) {
    __vue_options__.style[name] = module[name]
  }
})
if (typeof __register_static_styles__ === "function") {
  __register_static_styles__(__vue_options__._scopeId, __vue_styles__)
}

module.exports = __vue_exports__


/***/ }),
/* 230 */
/***/ (function(module, exports) {

module.exports = {
  "a3-container": {
    "width": "750",
    "flexDirection": "row",
    "flexWrap": "wrap"
  }
}

/***/ }),
/* 231 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
Object.defineProperty(__webpack_exports__, "__esModule", { value: true });
//
//
//
//
//

/* harmony default export */ __webpack_exports__["default"] = ({
	name: 'resource-niche-a3',
	props: {
		images: {
			type: Array,
			default: function _default() {
				return [];
			}
		}

	},
	data: function data() {
		return {};
	},

	methods: {
		report: function report(route, index) {
			this.$emit('report', {
				location: 'L' + (index + 1),
				route: route
			});
		}
	}
});

/***/ }),
/* 232 */
/***/ (function(module, exports) {

module.exports={render:function (){var _vm=this;var _h=_vm.$createElement;var _c=_vm._self._c||_h;
  return _c('div', {
    staticClass: ["a3-container"]
  }, _vm._l((_vm.images), function(imageItem, index) {
    return _c('image-router', {
      key: index,
      attrs: {
        "imageSrc": imageItem.imageSrc,
        "route": imageItem.route,
        "width": imageItem.width,
        "height": imageItem.height
      },
      on: {
        "report": function($event) {
          _vm.report($event, index)
        }
      }
    })
  }))
},staticRenderFns: []}

/***/ }),
/* 233 */
/***/ (function(module, exports, __webpack_require__) {

var __vue_exports__, __vue_options__
var __vue_styles__ = []

/* styles */
__vue_styles__.push(__webpack_require__(234)
)

/* script */
__vue_exports__ = __webpack_require__(235)

/* template */
var __vue_template__ = __webpack_require__(236)
__vue_options__ = __vue_exports__ = __vue_exports__ || {}
if (
  typeof __vue_exports__.default === "object" ||
  typeof __vue_exports__.default === "function"
) {
__vue_options__ = __vue_exports__ = __vue_exports__.default
}
if (typeof __vue_options__ === "function") {
  __vue_options__ = __vue_options__.options
}

__vue_options__.render = __vue_template__.render
__vue_options__.staticRenderFns = __vue_template__.staticRenderFns
__vue_options__._scopeId = "data-v-d5cec56e"
__vue_options__.style = __vue_options__.style || {}
__vue_styles__.forEach(function (module) {
  for (var name in module) {
    __vue_options__.style[name] = module[name]
  }
})
if (typeof __register_static_styles__ === "function") {
  __register_static_styles__(__vue_options__._scopeId, __vue_styles__)
}

module.exports = __vue_exports__


/***/ }),
/* 234 */
/***/ (function(module, exports) {

module.exports = {
  "a4-container": {
    "width": "750",
    "flexDirection": "row",
    "flexWrap": "wrap"
  }
}

/***/ }),
/* 235 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
Object.defineProperty(__webpack_exports__, "__esModule", { value: true });
//
//
//
//
//

/* harmony default export */ __webpack_exports__["default"] = ({
	name: 'resource-niche-a4',
	props: {
		images: {
			type: Array,
			default: function _default() {
				return [];
			}
		}

	},
	data: function data() {
		return {};
	},

	methods: {
		report: function report(route, index) {
			this.$emit('report', {
				location: 'L' + (index + 1),
				route: route
			});
		}
	}
});

/***/ }),
/* 236 */
/***/ (function(module, exports) {

module.exports={render:function (){var _vm=this;var _h=_vm.$createElement;var _c=_vm._self._c||_h;
  return _c('div', {
    staticClass: ["a4-container"]
  }, _vm._l((_vm.images), function(imageItem, index) {
    return _c('image-router', {
      key: index,
      attrs: {
        "imageSrc": imageItem.imageSrc,
        "route": imageItem.route,
        "width": imageItem.width,
        "height": imageItem.height
      },
      on: {
        "report": function($event) {
          _vm.report($event, index)
        }
      }
    })
  }))
},staticRenderFns: []}

/***/ }),
/* 237 */
/***/ (function(module, exports, __webpack_require__) {

var __vue_exports__, __vue_options__
var __vue_styles__ = []

/* styles */
__vue_styles__.push(__webpack_require__(238)
)

/* script */
__vue_exports__ = __webpack_require__(239)

/* template */
var __vue_template__ = __webpack_require__(240)
__vue_options__ = __vue_exports__ = __vue_exports__ || {}
if (
  typeof __vue_exports__.default === "object" ||
  typeof __vue_exports__.default === "function"
) {
__vue_options__ = __vue_exports__ = __vue_exports__.default
}
if (typeof __vue_options__ === "function") {
  __vue_options__ = __vue_options__.options
}

__vue_options__.render = __vue_template__.render
__vue_options__.staticRenderFns = __vue_template__.staticRenderFns
__vue_options__._scopeId = "data-v-d5b2966c"
__vue_options__.style = __vue_options__.style || {}
__vue_styles__.forEach(function (module) {
  for (var name in module) {
    __vue_options__.style[name] = module[name]
  }
})
if (typeof __register_static_styles__ === "function") {
  __register_static_styles__(__vue_options__._scopeId, __vue_styles__)
}

module.exports = __vue_exports__


/***/ }),
/* 238 */
/***/ (function(module, exports) {

module.exports = {
  "a5-container": {
    "width": "750",
    "flexDirection": "row",
    "flexWrap": "wrap"
  },
  "a5-right": {
    "width": "375"
  }
}

/***/ }),
/* 239 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
Object.defineProperty(__webpack_exports__, "__esModule", { value: true });
//
//
//
//
//
//
//
//
//
//

/* harmony default export */ __webpack_exports__["default"] = ({
	name: 'resource-niche-a5',
	props: {
		images: {
			type: Array,
			default: function _default() {
				return [{}, {}, {}];
			},
			validate: function validate(images) {
				return images.length === 3;
			}
		}
	},
	data: function data() {
		return {};
	},

	methods: {
		report: function report(route, location) {
			this.$emit('report', {
				location: location,
				route: route
			});
		}
	}
});

/***/ }),
/* 240 */
/***/ (function(module, exports) {

module.exports={render:function (){var _vm=this;var _h=_vm.$createElement;var _c=_vm._self._c||_h;
  return _c('div', {
    staticClass: ["a5-container"]
  }, [_c('image-router', {
    staticClass: ["a5-left"],
    attrs: {
      "imageSrc": _vm.images[0].imageSrc,
      "route": _vm.images[0].route,
      "width": _vm.images[0].width,
      "height": _vm.images[0].height
    },
    on: {
      "report": function($event) {
        _vm.report($event, 'L1')
      }
    }
  }), _c('div', {
    staticClass: ["a5-right"]
  }, [_c('image-router', {
    attrs: {
      "imageSrc": _vm.images[1].imageSrc,
      "route": _vm.images[1].route,
      "width": _vm.images[1].width,
      "height": _vm.images[1].height
    },
    on: {
      "report": function($event) {
        _vm.report($event, 'L2')
      }
    }
  }), _c('image-router', {
    attrs: {
      "imageSrc": _vm.images[2].imageSrc,
      "route": _vm.images[2].route,
      "width": _vm.images[2].width,
      "height": _vm.images[2].height
    },
    on: {
      "report": function($event) {
        _vm.report($event, 'L3')
      }
    }
  })], 1)], 1)
},staticRenderFns: []}

/***/ }),
/* 241 */
/***/ (function(module, exports) {

module.exports={render:function (){var _vm=this;var _h=_vm.$createElement;var _c=_vm._self._c||_h;
  return _c('div', {
    staticClass: ["resource-niche-group"]
  }, _vm._l((_vm.group), function(item, index) {
    return _c(item.is, {
      key: index,
      tag: "component",
      attrs: {
        "images": item.images
      },
      on: {
        "report": _vm.report
      }
    })
  }))
},staticRenderFns: []}

/***/ }),
/* 242 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
Object.defineProperty(__webpack_exports__, "__esModule", { value: true });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0_babel_runtime_helpers_extends__ = __webpack_require__(10);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0_babel_runtime_helpers_extends___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_0_babel_runtime_helpers_extends__);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1_babel_runtime_core_js_json_stringify__ = __webpack_require__(30);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1_babel_runtime_core_js_json_stringify___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_1_babel_runtime_core_js_json_stringify__);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2_babel_runtime_core_js_object_keys__ = __webpack_require__(73);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2_babel_runtime_core_js_object_keys___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_2_babel_runtime_core_js_object_keys__);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_3_babel_runtime_helpers_toConsumableArray__ = __webpack_require__(47);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_3_babel_runtime_helpers_toConsumableArray___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_3_babel_runtime_helpers_toConsumableArray__);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_4_util_create_guid__ = __webpack_require__(246);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_5_to_slug_case__ = __webpack_require__(247);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_5_to_slug_case___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_5_to_slug_case__);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_6_to_camel_case__ = __webpack_require__(249);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_6_to_camel_case___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_6_to_camel_case__);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_7__validater__ = __webpack_require__(250);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_8_util_decode_image_src__ = __webpack_require__(251);











/* harmony default export */ __webpack_exports__["default"] = ({
	name: 'weex-render',
	props: {
		configs: {
			type: Object,
			default: function _default() {
				return {
					type: 'app-container',
					components: []
				};
			}
		}
	},
	data: function data() {
		return {
			vueConfig: '',
			elements: []
		};
	},

	computed: {
		filteredComponents: function filteredComponents() {
			var configs = this.configs;
			var components = Array.isArray(configs.components) ? [].concat(__WEBPACK_IMPORTED_MODULE_3_babel_runtime_helpers_toConsumableArray___default()(configs.components)) : [];

			// 1. 提取组件

			var componentHandler = function componentHandler(_component) {
				var component = Object(__WEBPACK_IMPORTED_MODULE_7__validater__["a" /* default */])(_component);
				component.items = component.items || [];
				if (component.type === 'resource-niche-group') {
					var imageList = [];
					// 广告组的图片列表生成
					if (Array.isArray(component.components)) {
						component.components.map(function (subComponent) {
							var imageItem = {};
							subComponent.items.map(function (item) {
								if (item.name === 'image-picker') {
									var imageObject = Object(__WEBPACK_IMPORTED_MODULE_8_util_decode_image_src__["a" /* default */])(item.value);
									__WEBPACK_IMPORTED_MODULE_2_babel_runtime_core_js_object_keys___default()(imageObject).map(function (key) {
										if (key === 'src') {
											item.realProp && (imageItem[__WEBPACK_IMPORTED_MODULE_6_to_camel_case___default()(item.realProp || '')] = imageObject['src']);
										} else {
											key && (imageItem[__WEBPACK_IMPORTED_MODULE_5_to_slug_case___default()(key)] = imageObject[key]);
										}
									});
								} else {
									item.realProp && (imageItem[__WEBPACK_IMPORTED_MODULE_6_to_camel_case___default()(item.realProp)] = item.value);
								}
							});
							imageList.push(imageItem);
						});
					}
					component.items.push({
						prop: 'imageList|' + component.guid,
						realProp: 'imageList',
						value: imageList
					});
					component.components = [];
				} else if (component.type === 'coupons') {
					var coupons = [];
					// 优惠券列表生成
					if (Array.isArray(component.components)) {
						component.components.map(function (subComponent) {
							var couponItem = {};
							subComponent.items.map(function (item) {
								if (item.realProp) {
									if (item.name === 'image-picker') {
										couponItem[__WEBPACK_IMPORTED_MODULE_6_to_camel_case___default()(item.realProp)] = Object(__WEBPACK_IMPORTED_MODULE_8_util_decode_image_src__["a" /* default */])(item.value).src;
									} else {
										couponItem[__WEBPACK_IMPORTED_MODULE_6_to_camel_case___default()(item.realProp)] = item.value;
									}
								}
							});
							coupons.push(couponItem);
						});
					}
					component.items.push({
						prop: 'coupons|' + component.guid,
						realProp: 'coupons',
						value: coupons
					});
					component.components = [];
				} else if (component.type === 'anchors') {
					if (component.components) {
						component.components = component.components.map(function (com) {
							return componentHandler(com);
						});
					}
				} else if (component.type === 'anchor-item') {
					if (component.components) {
						component.components = component.components.map(function (com) {
							return componentHandler(com);
						});
					}
				} else {
					component.components = component.components || [];
				}

				return component;
			};

			// 2. 组件重组，特殊组件特殊处理
			return components.map(function (component) {

				return componentHandler(component);
			});
		}
	},
	methods: {},
	render: function render(h) {

		// template maker

		var vueMaker = function vueMaker() {
			var configs = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : {};


			var getVNode = function getVNode() {
				var component = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : {};

				var prop = {};
				component.items && component.items.length && component.items.map(function (item) {
					if (item.name === 'image-picker') {
						// 图片路径的特殊处理
						var imageObject = Object(__WEBPACK_IMPORTED_MODULE_8_util_decode_image_src__["a" /* default */])(item.value);
						prop[item.realProp] = imageObject.src;
						prop['width'] = imageObject.width;
						prop['height'] = imageObject.height;
						return;
					}
					prop[item.realProp] = item.value;
				});
				var guid = component.guid || Object(__WEBPACK_IMPORTED_MODULE_4_util_create_guid__["a" /* default */])();
				return h(component.type, {
					props: prop,
					domProps: { id: guid },
					key: guid,
					ref: guid
				}, component.components && component.components.length ? component.components.map(function (compt) {
					return getVNode(compt);
				}) : []);
			};

			var getElm = function getElm() {
				var component = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : {};

				var $elm = document.createElement(component.type);
				$elm.setAttribute('id', component.guid || Object(__WEBPACK_IMPORTED_MODULE_4_util_create_guid__["a" /* default */])());
				component.items && component.items.length && component.items.map(function (item) {
					if (item.name === 'image-picker' && item.realProp) {
						// 图片路径的特殊处理
						var imageObject = Object(__WEBPACK_IMPORTED_MODULE_8_util_decode_image_src__["a" /* default */])(item.value);
						$elm.setAttribute(':' + __WEBPACK_IMPORTED_MODULE_5_to_slug_case___default()(item.realProp), __WEBPACK_IMPORTED_MODULE_1_babel_runtime_core_js_json_stringify___default()(imageObject.src).replace(/"/ig, '\''));
						$elm.setAttribute(':width', __WEBPACK_IMPORTED_MODULE_1_babel_runtime_core_js_json_stringify___default()(imageObject.width).replace(/"/ig, '\''));
						$elm.setAttribute(':height', __WEBPACK_IMPORTED_MODULE_1_babel_runtime_core_js_json_stringify___default()(imageObject.height).replace(/"/ig, '\''));
						return;
					}
					item.realProp && $elm.setAttribute(':' + __WEBPACK_IMPORTED_MODULE_5_to_slug_case___default()(item.realProp), __WEBPACK_IMPORTED_MODULE_1_babel_runtime_core_js_json_stringify___default()(item.value).replace(/"/ig, '\''));
				});
				if (Array.isArray(component.components)) {
					component.components.map(function (com) {
						$elm.appendChild(getElm(com));
					});
				}
				return $elm;
			};

			var template = getElm(configs);

			var vnode = configs.type ? getVNode(configs) : {};

			return {
				template: template,
				vnode: vnode
			};
		};

		var configs = __WEBPACK_IMPORTED_MODULE_0_babel_runtime_helpers_extends___default()({}, this.configs, { components: this.filteredComponents });

		var forceWeex = vueMaker(configs);

		this.$emit('rendered', forceWeex.template.outerHTML.replace(/&amp;/ig, '&'));

		return forceWeex.vnode;
	},
	mounted: function mounted() {
		var _this = this;

		window.addEventListener('message', function (event) {
			var data = event.data || {};
			if (event.source.location.origin === window.location.origin) {
				var message = data.data || {};
				// console.log('%c[weex-render]: 配置数据来自' + event.source.location.href, 'color: #ff5577;')
				if (data.type === 'locate') {
					var id = message.location.id;
					var $target = document.getElementById(id);

					// 滚动到组件相应位置
					if ($target) {
						// 重置边框
						_this.elements.map(function (element) {
							element.el.style = element.style;
						});

						// 缓存元素
						_this.elements.push({
							el: $target,
							style: __WEBPACK_IMPORTED_MODULE_0_babel_runtime_helpers_extends___default()({}, $target.style)
						});

						// 绿色高亮
						$target.style.border = '1px solid green';
						_this.$module('dom').scrollToElement($target, {});
					}
				}
			}
		}, false);
	}
});

/***/ }),
/* 243 */
/***/ (function(module, exports, __webpack_require__) {

__webpack_require__(244);
module.exports = __webpack_require__(0).Object.keys;


/***/ }),
/* 244 */
/***/ (function(module, exports, __webpack_require__) {

// 19.1.2.14 Object.keys(O)
var toObject = __webpack_require__(27);
var $keys = __webpack_require__(21);

__webpack_require__(245)('keys', function () {
  return function keys(it) {
    return $keys(toObject(it));
  };
});


/***/ }),
/* 245 */
/***/ (function(module, exports, __webpack_require__) {

// most Object methods by ES6 should accept primitives
var $export = __webpack_require__(3);
var core = __webpack_require__(0);
var fails = __webpack_require__(15);
module.exports = function (KEY, exec) {
  var fn = (core.Object || {})[KEY] || Object[KEY];
  var exp = {};
  exp[KEY] = exec(fn);
  $export($export.S + $export.F * fails(function () { fn(1); }), 'Object', exp);
};


/***/ }),
/* 246 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/**
 * 生成一个8位的随机字母和数字的组合
 * @returns {guid} | String
 */

// guid 缓存
var guids = [];

var guidFactory = function guidFactory() {
	var chars = '0123456789ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz';
	var len = chars.length;

	var str = '';
	for (var i = 0; i < 8; i++) {
		var t = Math.floor(Math.random() * len);
		str += chars[t];
	}
	if (guids.indexOf(str) > -1) {
		return guidFactory();
	}
	guids.push(str);
	return str;
};

/* harmony default export */ __webpack_exports__["a"] = (function () {

	return guidFactory();
});

/***/ }),
/* 247 */
/***/ (function(module, exports, __webpack_require__) {


var toSpace = __webpack_require__(74)

/**
 * Export.
 */

module.exports = toSlugCase

/**
 * Convert a `string` to slug case.
 *
 * @param {String} string
 * @return {String}
 */

function toSlugCase(string) {
  return toSpace(string).replace(/\s/g, '-')
}


/***/ }),
/* 248 */
/***/ (function(module, exports) {


/**
 * Export.
 */

module.exports = toNoCase

/**
 * Test whether a string is camel-case.
 */

var hasSpace = /\s/
var hasSeparator = /(_|-|\.|:)/
var hasCamel = /([a-z][A-Z]|[A-Z][a-z])/

/**
 * Remove any starting case from a `string`, like camel or snake, but keep
 * spaces and punctuation that may be important otherwise.
 *
 * @param {String} string
 * @return {String}
 */

function toNoCase(string) {
  if (hasSpace.test(string)) return string.toLowerCase()
  if (hasSeparator.test(string)) return (unseparate(string) || string).toLowerCase()
  if (hasCamel.test(string)) return uncamelize(string).toLowerCase()
  return string.toLowerCase()
}

/**
 * Separator splitter.
 */

var separatorSplitter = /[\W_]+(.|$)/g

/**
 * Un-separate a `string`.
 *
 * @param {String} string
 * @return {String}
 */

function unseparate(string) {
  return string.replace(separatorSplitter, function (m, next) {
    return next ? ' ' + next : ''
  })
}

/**
 * Camelcase splitter.
 */

var camelSplitter = /(.)([A-Z]+)/g

/**
 * Un-camelcase a `string`.
 *
 * @param {String} string
 * @return {String}
 */

function uncamelize(string) {
  return string.replace(camelSplitter, function (m, previous, uppers) {
    return previous + ' ' + uppers.toLowerCase().split('').join(' ')
  })
}


/***/ }),
/* 249 */
/***/ (function(module, exports, __webpack_require__) {


var space = __webpack_require__(74)

/**
 * Export.
 */

module.exports = toCamelCase

/**
 * Convert a `string` to camel case.
 *
 * @param {String} string
 * @return {String}
 */

function toCamelCase(string) {
  return space(string).replace(/\s(\w)/g, function (matches, letter) {
    return letter.toUpperCase()
  })
}


/***/ }),
/* 250 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0_babel_runtime_helpers_extends__ = __webpack_require__(10);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0_babel_runtime_helpers_extends___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_0_babel_runtime_helpers_extends__);

var _filter = function _filter(configs) {
	var _configs = __WEBPACK_IMPORTED_MODULE_0_babel_runtime_helpers_extends___default()({}, configs);

	if (Array.isArray(_configs.components) && _configs.components.length) {
		var items = _configs.items || [];

		_configs.components = _configs.components.filter(function (component) {
			var validation = true;

			if (Array.isArray(component.dependencies) && component.dependencies.length && items.length) {
				component.dependencies.map(function (dependency) {
					// 依赖的遍历
					items.map(function (item) {
						var prop = item.realProp || item.prop;
						if (prop === dependency.prop) {
							// 正则
							if (dependency.regex) {
								var regex = new RegExp(dependency.regex, 'ig');
								if (!regex.test(item.value)) {
									validation = false;
								}
							}
						}
					});
				});
			}

			return validation;
		}).map(_filter);
	}
	return _configs;
};

/* harmony default export */ __webpack_exports__["a"] = (function () {
	var configs = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : {};

	return _filter(configs);
});

/***/ }),
/* 251 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony default export */ __webpack_exports__["a"] = (function () {
	var src = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : '';

	var srcArray = src.split('|');
	var srcObject = {
		src: '',
		width: 0,
		height: 0
	};
	if (srcArray.length > 2) {
		srcObject.src = srcArray[0];
		srcObject.width = srcArray[1] + 'px';
		srcObject.height = srcArray[2] + 'px';
	}
	return srcObject;
});

/***/ }),
/* 252 */
/***/ (function(module, exports, __webpack_require__) {

var map = {
	"./index.js": 75,
	"./mjb-native.js": 253
};
function webpackContext(req) {
	return __webpack_require__(webpackContextResolve(req));
};
function webpackContextResolve(req) {
	var id = map[req];
	if(!(id + 1)) // check for number or string
		throw new Error("Cannot find module '" + req + "'.");
	return id;
};
webpackContext.keys = function webpackContextKeys() {
	return Object.keys(map);
};
webpackContext.resolve = webpackContextResolve;
module.exports = webpackContext;
webpackContext.id = 252;

/***/ }),
/* 253 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
Object.defineProperty(__webpack_exports__, "__esModule", { value: true });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0_babel_runtime_core_js_promise__ = __webpack_require__(14);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0_babel_runtime_core_js_promise___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_0_babel_runtime_core_js_promise__);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1_babel_runtime_helpers_extends__ = __webpack_require__(10);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1_babel_runtime_helpers_extends___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_1_babel_runtime_helpers_extends__);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2_babel_runtime_core_js_json_stringify__ = __webpack_require__(30);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2_babel_runtime_core_js_json_stringify___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_2_babel_runtime_core_js_json_stringify__);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_3_babel_runtime_helpers_typeof__ = __webpack_require__(42);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_3_babel_runtime_helpers_typeof___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_3_babel_runtime_helpers_typeof__);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_4__utils__ = __webpack_require__(45);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_5__config__ = __webpack_require__(46);







var module = {
	// 模块名在此声明-
	name: 'mjb-native',
	module: {
		/**
   *
   * @param title {String}
   */
		setTitle: function setTitle(title) {
			document.title = title || '美甲帮';
		},

		/**
   *
   * @param enabled {Boolean}
   * @param shareConfig {String}
   * @param callback {Function}
   */
		login: function login(callback) {
			if (__WEBPACK_IMPORTED_MODULE_4__utils__["b" /* Env */].isWeb()) {
				var evt = new Event('login');
				evt.data = { loginCallback: callback };
				document.dispatchEvent(evt);
			}
		},
		enableShare: function enableShare(enabled) {
			var shareConfig = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : {};
			var callback = arguments[2];

			if (enabled) {
				var _shareConfig = {};
				if (typeof shareConfig === 'string') {
					_shareConfig = JSON.parse(shareConfig);
				} else if ((typeof shareConfig === 'undefined' ? 'undefined' : __WEBPACK_IMPORTED_MODULE_3_babel_runtime_helpers_typeof___default()(shareConfig)) === 'object') {
					_shareConfig = shareConfig;
				}
				try {
					__WEBPACK_IMPORTED_MODULE_4__utils__["d" /* SnsShare */].setShareMsg(_shareConfig, callback);
					if (__WEBPACK_IMPORTED_MODULE_4__utils__["b" /* Env */].isMjb() && __WEBPACK_IMPORTED_MODULE_4__utils__["b" /* Env */].isMeijiabangJSBridgeReady()) {
						window.MeijiabangJSBridge.callHandler('showShareMenu');
					}
					document.getElementById('share-enable').setAttribute('content', '1');
				} catch (e) {
					console.log(e);
				}
			} else {
				if (__WEBPACK_IMPORTED_MODULE_4__utils__["b" /* Env */].isMjb() && __WEBPACK_IMPORTED_MODULE_4__utils__["b" /* Env */].isMeijiabangJSBridgeReady()) {
					window.MeijiabangJSBridge.callHandler('hideShareMenu');
				}
				document.getElementById('share-enable').setAttribute('content', '0');

				if (typeof callback === 'function') callback();
			}
		},

		/**
   *
   * @param pageName {String}
   * @param pageParams {String}
   * @param actionName {String}
   * @param isOutPoint {Boolean}
   * @param actionParams {Object}
   */
		track: function track(pageName, pageParams, actionName) {
			var isOutPoint = arguments.length > 3 && arguments[3] !== undefined ? arguments[3] : true;
			var actionParams = arguments.length > 4 && arguments[4] !== undefined ? arguments[4] : {};

			if (__WEBPACK_IMPORTED_MODULE_4__utils__["b" /* Env */].isMjb() && __WEBPACK_IMPORTED_MODULE_4__utils__["b" /* Env */].isMeijiabangJSBridgeReady()) {
				window.MeijiabangJSBridge.callHandler('userTrack', __WEBPACK_IMPORTED_MODULE_2_babel_runtime_core_js_json_stringify___default()({
					'page_name': pageName,
					'page_param': pageParams,
					'action': actionName,
					'action_param': actionParams,
					'is_outpoint': isOutPoint
				}));
			} else {
				__WEBPACK_IMPORTED_MODULE_4__utils__["g" /* WebTracker */].customReport({
					event: 'userTrack',
					action: actionName,
					page_name: pageName,
					page_param: pageParams,
					action_param: __WEBPACK_IMPORTED_MODULE_2_babel_runtime_core_js_json_stringify___default()(actionParams)
				});
			}
		},

		/**
   *
   * @param type {string}
   * @param eventObject {Object}
   */
		reportEvent: function reportEvent(type, eventObject) {
			// app 内
			if (__WEBPACK_IMPORTED_MODULE_4__utils__["b" /* Env */].isMjb() && __WEBPACK_IMPORTED_MODULE_4__utils__["b" /* Env */].isMeijiabangJSBridgeReady()) {

				window.MeijiabangJSBridge.callHandler(type, __WEBPACK_IMPORTED_MODULE_2_babel_runtime_core_js_json_stringify___default()(eventObject));
			} else {
				__WEBPACK_IMPORTED_MODULE_4__utils__["g" /* WebTracker */].customReport(__WEBPACK_IMPORTED_MODULE_1_babel_runtime_helpers_extends___default()({
					event: type
				}, eventObject));
			}
		},

		/**
   * @param route {String}
   */
		route: function route(_route) {
			// App内兼容
			var routes = Object(__WEBPACK_IMPORTED_MODULE_4__utils__["i" /* getRoutes */])(_route);
			if (__WEBPACK_IMPORTED_MODULE_4__utils__["b" /* Env */].isMjb()) {
				if (__WEBPACK_IMPORTED_MODULE_4__utils__["b" /* Env */].isMeijiabangJSBridgeReady()) {
					window.MeijiabangJSBridge.callHandler('appRoute', '{"app_route": "' + routes.appRoute + '"}');
				} else {
					__WEBPACK_IMPORTED_MODULE_4__utils__["c" /* JsBridge */].ready(function () {
						window.MeijiabangJSBridge.callHandler('appRoute', '{"app_route": "' + routes.appRoute + '"}');
					});
				}
			}
			// App外兼容
			else {
					routes.h5Route ? window.location.href = /https?:\/\//.test(routes.h5Route) ? routes.h5Route : __WEBPACK_IMPORTED_MODULE_5__config__["a" /* default */].appUrl + routes.h5Route : Object(__WEBPACK_IMPORTED_MODULE_4__utils__["h" /* downloadApp */])();
				}
		},


		/**
   *
   * @returns {Object, Promise}
   */
		getAccessToken: function getAccessToken() {
			// app 内
			if (__WEBPACK_IMPORTED_MODULE_4__utils__["b" /* Env */].isMjb()) {

				var getAccessToken = function getAccessToken() {
					return new __WEBPACK_IMPORTED_MODULE_0_babel_runtime_core_js_promise___default.a(function (resolve, reject) {
						window.MeijiabangJSBridge.callHandler('getAccessToken', {}, function (res) {
							if (res.error_code) {
								reject(res);
							} else {
								var data = res.data;
								__WEBPACK_IMPORTED_MODULE_4__utils__["a" /* Cookie */].setCookie('g0yk_6c66_access_token', data.access_token, {
									expires: new Date(data.expired_date),
									domain: __WEBPACK_IMPORTED_MODULE_4__utils__["f" /* Url */].getRootDomain(),
									path: '/'
								});
								resolve(res);
							}
						});
					});
				};

				if (__WEBPACK_IMPORTED_MODULE_4__utils__["b" /* Env */].isMeijiabangJSBridgeReady()) {
					return getAccessToken();
				} else {
					return new __WEBPACK_IMPORTED_MODULE_0_babel_runtime_core_js_promise___default.a(function (resolve, reject) {
						__WEBPACK_IMPORTED_MODULE_4__utils__["c" /* JsBridge */].ready(function () {
							getAccessToken().then(function (res) {
								resolve(res);
							}).catch(function (e) {
								reject(e);
							});
						});
					});
				}
			} else {
				return {
					data: {
						access_token: __WEBPACK_IMPORTED_MODULE_4__utils__["a" /* Cookie */].getCookie('g0yk_6c66_access_token')
					},
					error_code: 0
				};
			}
		},
		triggerWebView: function triggerWebView() {
			var url = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : 'https://m.meijiabang.cn';

			window.location.href = url;
		}
	}
};

/* harmony default export */ __webpack_exports__["default"] = (module);

/***/ }),
/* 254 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0_babel_runtime_core_js_promise__ = __webpack_require__(14);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0_babel_runtime_core_js_promise___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_0_babel_runtime_core_js_promise__);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__util__ = __webpack_require__(255);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2__post_message__ = __webpack_require__(256);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_3__config__ = __webpack_require__(76);






var stream = weex.requireModule('stream');
var headers = {
	'Content-Type': 'application/json'
};

var get = function get() {
	var obj = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : {};

	var hosts = __WEBPACK_IMPORTED_MODULE_1__util__["b" /* createHost */](obj.host);

	var data = 'release_platform=' + __WEBPACK_IMPORTED_MODULE_3__config__["a" /* default */].appPlatform + '&release_version=' + (obj.releaseVersion || __WEBPACK_IMPORTED_MODULE_3__config__["a" /* default */].appVersion) + '&_=' + Date.parse(new Date());
	data = '?' + data.replace(/^&/, '') + __WEBPACK_IMPORTED_MODULE_1__util__["a" /* createData */](obj.data);

	var url = hosts + (obj.version || 'v3') + '/' + obj.path + '.json';
	url = url + data;

	return new __WEBPACK_IMPORTED_MODULE_0_babel_runtime_core_js_promise___default.a(function (resolve, reject) {
		stream.fetch({
			method: 'GET',
			url: url,
			withCredentials: true,
			type: 'json'
		}, function (response) {
			resolve(response);
		});
	});
};

var post = function post() {
	var obj = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : {};

	var hosts = __WEBPACK_IMPORTED_MODULE_1__util__["b" /* createHost */](obj.host);

	var data = 'release_platform=' + __WEBPACK_IMPORTED_MODULE_3__config__["a" /* default */].appPlatform + '&release_version=' + (obj.releaseVersion || __WEBPACK_IMPORTED_MODULE_3__config__["a" /* default */].appVersion) + '&_=' + Date.parse(new Date());
	data = '?' + data.replace(/^&/, '');

	var url = hosts + (obj.version || 'v3') + '/' + obj.path + '.json';
	url = url + data;

	return new __WEBPACK_IMPORTED_MODULE_0_babel_runtime_core_js_promise___default.a(function (resolve, reject) {
		var ddd = __WEBPACK_IMPORTED_MODULE_1__util__["a" /* createData */](obj.data, 'POST');
		console.log('ddd', ddd);
		stream.fetch({
			method: 'POST',
			url: url,
			// headers,
			withCredentials: true,
			type: 'json',
			body: ddd
		}, function (response) {
			resolve(response);
		});
	});
};

/* harmony default export */ __webpack_exports__["a"] = ({
	install: function install(Vue) {
		Vue.prototype.$api = {
			get: get,
			post: post,
			toast: __WEBPACK_IMPORTED_MODULE_1__util__["c" /* toast */],
			postMessage: __WEBPACK_IMPORTED_MODULE_2__post_message__["a" /* default */]
		};
	}
});

/***/ }),
/* 255 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return createData; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "b", function() { return createHost; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "c", function() { return toast; });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0_babel_runtime_core_js_object_keys__ = __webpack_require__(73);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0_babel_runtime_core_js_object_keys___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_0_babel_runtime_core_js_object_keys__);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1_babel_runtime_core_js_json_stringify__ = __webpack_require__(30);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1_babel_runtime_core_js_json_stringify___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_1_babel_runtime_core_js_json_stringify__);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2_babel_runtime_helpers_typeof__ = __webpack_require__(42);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2_babel_runtime_helpers_typeof___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_2_babel_runtime_helpers_typeof__);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_3__config__ = __webpack_require__(76);




var modal = weex.requireModule('modal');

var toast = function toast(msg) {
    var ms = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : .5;

    modal.toast({
        message: msg,
        duration: ms
    });
};

var createData = function createData() {
    var data = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : {};
    var method = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : 'GET';

    if ((typeof data === 'undefined' ? 'undefined' : __WEBPACK_IMPORTED_MODULE_2_babel_runtime_helpers_typeof___default()(data)) !== 'object' || data === '') throw '参入参数错误';

    var _method = method.toLowerCase();
    if (_method === 'post') {
        return __WEBPACK_IMPORTED_MODULE_1_babel_runtime_core_js_json_stringify___default()(data);
    }

    var url = '';
    __WEBPACK_IMPORTED_MODULE_0_babel_runtime_core_js_object_keys___default()(data).forEach(function (key) {
        return url += '&' + key + '=' + data[key];
    });
    return url;
};

var createHost = function createHost(host) {
    var _hosts = void 0;

    if (host === 'cdn') {
        _hosts = __WEBPACK_IMPORTED_MODULE_3__config__["a" /* default */].api.cdn;
        // data += '&___from=api-cdn&___cdn_cache_time=' + (obj.cdnCacheTime || Config.cdnCacheTime);
    } else if (host === 'cpma') {
        _hosts = __WEBPACK_IMPORTED_MODULE_3__config__["a" /* default */].api.cpma;
    } else if (host) {
        _hosts = host;
    } else {
        _hosts = __WEBPACK_IMPORTED_MODULE_3__config__["a" /* default */].api.default;
    }

    return _hosts;
};



/***/ }),
/* 256 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony default export */ __webpack_exports__["a"] = (function () {
	var message = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : {};
	var sender = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : window.parent;
	var target = arguments.length > 2 && arguments[2] !== undefined ? arguments[2] : window.location.origin;

	if (window.parent === window) return;
	sender.postMessage({
		type: message.type || 'message',
		data: message.data
	}, target);
});

/***/ })
/******/ ]);