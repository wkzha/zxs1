(global["webpackJsonp"] = global["webpackJsonp"] || []).push([["common/vendor"],{

/***/ 1:
/*!************************************************************!*\
  !*** ./node_modules/@dcloudio/uni-mp-weixin/dist/index.js ***!
  \************************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";
/* WEBPACK VAR INJECTION */(function(global) {

var _interopRequireDefault = __webpack_require__(/*! @babel/runtime/helpers/interopRequireDefault */ 3);
Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.createApp = createApp;
exports.createComponent = createComponent;
exports.createPage = createPage;
exports.createPlugin = createPlugin;
exports.createSubpackageApp = createSubpackageApp;
exports.default = void 0;
var _slicedToArray2 = _interopRequireDefault(__webpack_require__(/*! @babel/runtime/helpers/slicedToArray */ 4));
var _defineProperty2 = _interopRequireDefault(__webpack_require__(/*! @babel/runtime/helpers/defineProperty */ 10));
var _construct2 = _interopRequireDefault(__webpack_require__(/*! @babel/runtime/helpers/construct */ 14));
var _toConsumableArray2 = _interopRequireDefault(__webpack_require__(/*! @babel/runtime/helpers/toConsumableArray */ 17));
var _typeof2 = _interopRequireDefault(__webpack_require__(/*! @babel/runtime/helpers/typeof */ 12));
var _uniI18n = __webpack_require__(/*! @dcloudio/uni-i18n */ 21);
var _vue = _interopRequireDefault(__webpack_require__(/*! vue */ 24));
function ownKeys(object, enumerableOnly) { var keys = Object.keys(object); if (Object.getOwnPropertySymbols) { var symbols = Object.getOwnPropertySymbols(object); enumerableOnly && (symbols = symbols.filter(function (sym) { return Object.getOwnPropertyDescriptor(object, sym).enumerable; })), keys.push.apply(keys, symbols); } return keys; }
function _objectSpread(target) { for (var i = 1; i < arguments.length; i++) { var source = null != arguments[i] ? arguments[i] : {}; i % 2 ? ownKeys(Object(source), !0).forEach(function (key) { (0, _defineProperty2.default)(target, key, source[key]); }) : Object.getOwnPropertyDescriptors ? Object.defineProperties(target, Object.getOwnPropertyDescriptors(source)) : ownKeys(Object(source)).forEach(function (key) { Object.defineProperty(target, key, Object.getOwnPropertyDescriptor(source, key)); }); } return target; }
var realAtob;
var b64 = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789+/=';
var b64re = /^(?:[A-Za-z\d+/]{4})*?(?:[A-Za-z\d+/]{2}(?:==)?|[A-Za-z\d+/]{3}=?)?$/;
if (typeof atob !== 'function') {
  realAtob = function realAtob(str) {
    str = String(str).replace(/[\t\n\f\r ]+/g, '');
    if (!b64re.test(str)) {
      throw new Error("Failed to execute 'atob' on 'Window': The string to be decoded is not correctly encoded.");
    }

    // Adding the padding if missing, for semplicity
    str += '=='.slice(2 - (str.length & 3));
    var bitmap;
    var result = '';
    var r1;
    var r2;
    var i = 0;
    for (; i < str.length;) {
      bitmap = b64.indexOf(str.charAt(i++)) << 18 | b64.indexOf(str.charAt(i++)) << 12 | (r1 = b64.indexOf(str.charAt(i++))) << 6 | (r2 = b64.indexOf(str.charAt(i++)));
      result += r1 === 64 ? String.fromCharCode(bitmap >> 16 & 255) : r2 === 64 ? String.fromCharCode(bitmap >> 16 & 255, bitmap >> 8 & 255) : String.fromCharCode(bitmap >> 16 & 255, bitmap >> 8 & 255, bitmap & 255);
    }
    return result;
  };
} else {
  // 注意atob只能在全局对象上调用，例如：`const Base64 = {atob};Base64.atob('xxxx')`是错误的用法
  realAtob = atob;
}
function b64DecodeUnicode(str) {
  return decodeURIComponent(realAtob(str).split('').map(function (c) {
    return '%' + ('00' + c.charCodeAt(0).toString(16)).slice(-2);
  }).join(''));
}
function getCurrentUserInfo() {
  var token = wx.getStorageSync('uni_id_token') || '';
  var tokenArr = token.split('.');
  if (!token || tokenArr.length !== 3) {
    return {
      uid: null,
      role: [],
      permission: [],
      tokenExpired: 0
    };
  }
  var userInfo;
  try {
    userInfo = JSON.parse(b64DecodeUnicode(tokenArr[1]));
  } catch (error) {
    throw new Error('获取当前用户信息出错，详细错误信息为：' + error.message);
  }
  userInfo.tokenExpired = userInfo.exp * 1000;
  delete userInfo.exp;
  delete userInfo.iat;
  return userInfo;
}
function uniIdMixin(Vue) {
  Vue.prototype.uniIDHasRole = function (roleId) {
    var _getCurrentUserInfo = getCurrentUserInfo(),
      role = _getCurrentUserInfo.role;
    return role.indexOf(roleId) > -1;
  };
  Vue.prototype.uniIDHasPermission = function (permissionId) {
    var _getCurrentUserInfo2 = getCurrentUserInfo(),
      permission = _getCurrentUserInfo2.permission;
    return this.uniIDHasRole('admin') || permission.indexOf(permissionId) > -1;
  };
  Vue.prototype.uniIDTokenValid = function () {
    var _getCurrentUserInfo3 = getCurrentUserInfo(),
      tokenExpired = _getCurrentUserInfo3.tokenExpired;
    return tokenExpired > Date.now();
  };
}
var _toString = Object.prototype.toString;
var hasOwnProperty = Object.prototype.hasOwnProperty;
function isFn(fn) {
  return typeof fn === 'function';
}
function isStr(str) {
  return typeof str === 'string';
}
function isObject(obj) {
  return obj !== null && (0, _typeof2.default)(obj) === 'object';
}
function isPlainObject(obj) {
  return _toString.call(obj) === '[object Object]';
}
function hasOwn(obj, key) {
  return hasOwnProperty.call(obj, key);
}
function noop() {}

/**
 * Create a cached version of a pure function.
 */
function cached(fn) {
  var cache = Object.create(null);
  return function cachedFn(str) {
    var hit = cache[str];
    return hit || (cache[str] = fn(str));
  };
}

/**
 * Camelize a hyphen-delimited string.
 */
var camelizeRE = /-(\w)/g;
var camelize = cached(function (str) {
  return str.replace(camelizeRE, function (_, c) {
    return c ? c.toUpperCase() : '';
  });
});
function sortObject(obj) {
  var sortObj = {};
  if (isPlainObject(obj)) {
    Object.keys(obj).sort().forEach(function (key) {
      sortObj[key] = obj[key];
    });
  }
  return !Object.keys(sortObj) ? obj : sortObj;
}
var HOOKS = ['invoke', 'success', 'fail', 'complete', 'returnValue'];
var globalInterceptors = {};
var scopedInterceptors = {};
function mergeHook(parentVal, childVal) {
  var res = childVal ? parentVal ? parentVal.concat(childVal) : Array.isArray(childVal) ? childVal : [childVal] : parentVal;
  return res ? dedupeHooks(res) : res;
}
function dedupeHooks(hooks) {
  var res = [];
  for (var i = 0; i < hooks.length; i++) {
    if (res.indexOf(hooks[i]) === -1) {
      res.push(hooks[i]);
    }
  }
  return res;
}
function removeHook(hooks, hook) {
  var index = hooks.indexOf(hook);
  if (index !== -1) {
    hooks.splice(index, 1);
  }
}
function mergeInterceptorHook(interceptor, option) {
  Object.keys(option).forEach(function (hook) {
    if (HOOKS.indexOf(hook) !== -1 && isFn(option[hook])) {
      interceptor[hook] = mergeHook(interceptor[hook], option[hook]);
    }
  });
}
function removeInterceptorHook(interceptor, option) {
  if (!interceptor || !option) {
    return;
  }
  Object.keys(option).forEach(function (hook) {
    if (HOOKS.indexOf(hook) !== -1 && isFn(option[hook])) {
      removeHook(interceptor[hook], option[hook]);
    }
  });
}
function addInterceptor(method, option) {
  if (typeof method === 'string' && isPlainObject(option)) {
    mergeInterceptorHook(scopedInterceptors[method] || (scopedInterceptors[method] = {}), option);
  } else if (isPlainObject(method)) {
    mergeInterceptorHook(globalInterceptors, method);
  }
}
function removeInterceptor(method, option) {
  if (typeof method === 'string') {
    if (isPlainObject(option)) {
      removeInterceptorHook(scopedInterceptors[method], option);
    } else {
      delete scopedInterceptors[method];
    }
  } else if (isPlainObject(method)) {
    removeInterceptorHook(globalInterceptors, method);
  }
}
function wrapperHook(hook) {
  return function (data) {
    return hook(data) || data;
  };
}
function isPromise(obj) {
  return !!obj && ((0, _typeof2.default)(obj) === 'object' || typeof obj === 'function') && typeof obj.then === 'function';
}
function queue(hooks, data) {
  var promise = false;
  for (var i = 0; i < hooks.length; i++) {
    var hook = hooks[i];
    if (promise) {
      promise = Promise.resolve(wrapperHook(hook));
    } else {
      var res = hook(data);
      if (isPromise(res)) {
        promise = Promise.resolve(res);
      }
      if (res === false) {
        return {
          then: function then() {}
        };
      }
    }
  }
  return promise || {
    then: function then(callback) {
      return callback(data);
    }
  };
}
function wrapperOptions(interceptor) {
  var options = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : {};
  ['success', 'fail', 'complete'].forEach(function (name) {
    if (Array.isArray(interceptor[name])) {
      var oldCallback = options[name];
      options[name] = function callbackInterceptor(res) {
        queue(interceptor[name], res).then(function (res) {
          /* eslint-disable no-mixed-operators */
          return isFn(oldCallback) && oldCallback(res) || res;
        });
      };
    }
  });
  return options;
}
function wrapperReturnValue(method, returnValue) {
  var returnValueHooks = [];
  if (Array.isArray(globalInterceptors.returnValue)) {
    returnValueHooks.push.apply(returnValueHooks, (0, _toConsumableArray2.default)(globalInterceptors.returnValue));
  }
  var interceptor = scopedInterceptors[method];
  if (interceptor && Array.isArray(interceptor.returnValue)) {
    returnValueHooks.push.apply(returnValueHooks, (0, _toConsumableArray2.default)(interceptor.returnValue));
  }
  returnValueHooks.forEach(function (hook) {
    returnValue = hook(returnValue) || returnValue;
  });
  return returnValue;
}
function getApiInterceptorHooks(method) {
  var interceptor = Object.create(null);
  Object.keys(globalInterceptors).forEach(function (hook) {
    if (hook !== 'returnValue') {
      interceptor[hook] = globalInterceptors[hook].slice();
    }
  });
  var scopedInterceptor = scopedInterceptors[method];
  if (scopedInterceptor) {
    Object.keys(scopedInterceptor).forEach(function (hook) {
      if (hook !== 'returnValue') {
        interceptor[hook] = (interceptor[hook] || []).concat(scopedInterceptor[hook]);
      }
    });
  }
  return interceptor;
}
function invokeApi(method, api, options) {
  for (var _len = arguments.length, params = new Array(_len > 3 ? _len - 3 : 0), _key = 3; _key < _len; _key++) {
    params[_key - 3] = arguments[_key];
  }
  var interceptor = getApiInterceptorHooks(method);
  if (interceptor && Object.keys(interceptor).length) {
    if (Array.isArray(interceptor.invoke)) {
      var res = queue(interceptor.invoke, options);
      return res.then(function (options) {
        return api.apply(void 0, [wrapperOptions(interceptor, options)].concat(params));
      });
    } else {
      return api.apply(void 0, [wrapperOptions(interceptor, options)].concat(params));
    }
  }
  return api.apply(void 0, [options].concat(params));
}
var promiseInterceptor = {
  returnValue: function returnValue(res) {
    if (!isPromise(res)) {
      return res;
    }
    return new Promise(function (resolve, reject) {
      res.then(function (res) {
        if (res[0]) {
          reject(res[0]);
        } else {
          resolve(res[1]);
        }
      });
    });
  }
};
var SYNC_API_RE = /^\$|Window$|WindowStyle$|sendHostEvent|sendNativeEvent|restoreGlobal|requireGlobal|getCurrentSubNVue|getMenuButtonBoundingClientRect|^report|interceptors|Interceptor$|getSubNVueById|requireNativePlugin|upx2px|hideKeyboard|canIUse|^create|Sync$|Manager$|base64ToArrayBuffer|arrayBufferToBase64|getLocale|setLocale|invokePushCallback|getWindowInfo|getDeviceInfo|getAppBaseInfo|getSystemSetting|getAppAuthorizeSetting/;
var CONTEXT_API_RE = /^create|Manager$/;

// Context例外情况
var CONTEXT_API_RE_EXC = ['createBLEConnection'];

// 同步例外情况
var ASYNC_API = ['createBLEConnection', 'createPushMessage'];
var CALLBACK_API_RE = /^on|^off/;
function isContextApi(name) {
  return CONTEXT_API_RE.test(name) && CONTEXT_API_RE_EXC.indexOf(name) === -1;
}
function isSyncApi(name) {
  return SYNC_API_RE.test(name) && ASYNC_API.indexOf(name) === -1;
}
function isCallbackApi(name) {
  return CALLBACK_API_RE.test(name) && name !== 'onPush';
}
function handlePromise(promise) {
  return promise.then(function (data) {
    return [null, data];
  }).catch(function (err) {
    return [err];
  });
}
function shouldPromise(name) {
  if (isContextApi(name) || isSyncApi(name) || isCallbackApi(name)) {
    return false;
  }
  return true;
}

/* eslint-disable no-extend-native */
if (!Promise.prototype.finally) {
  Promise.prototype.finally = function (callback) {
    var promise = this.constructor;
    return this.then(function (value) {
      return promise.resolve(callback()).then(function () {
        return value;
      });
    }, function (reason) {
      return promise.resolve(callback()).then(function () {
        throw reason;
      });
    });
  };
}
function promisify(name, api) {
  if (!shouldPromise(name)) {
    return api;
  }
  return function promiseApi() {
    var options = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : {};
    for (var _len2 = arguments.length, params = new Array(_len2 > 1 ? _len2 - 1 : 0), _key2 = 1; _key2 < _len2; _key2++) {
      params[_key2 - 1] = arguments[_key2];
    }
    if (isFn(options.success) || isFn(options.fail) || isFn(options.complete)) {
      return wrapperReturnValue(name, invokeApi.apply(void 0, [name, api, options].concat(params)));
    }
    return wrapperReturnValue(name, handlePromise(new Promise(function (resolve, reject) {
      invokeApi.apply(void 0, [name, api, Object.assign({}, options, {
        success: resolve,
        fail: reject
      })].concat(params));
    })));
  };
}
var EPS = 1e-4;
var BASE_DEVICE_WIDTH = 750;
var isIOS = false;
var deviceWidth = 0;
var deviceDPR = 0;
function checkDeviceWidth() {
  var _wx$getSystemInfoSync = wx.getSystemInfoSync(),
    platform = _wx$getSystemInfoSync.platform,
    pixelRatio = _wx$getSystemInfoSync.pixelRatio,
    windowWidth = _wx$getSystemInfoSync.windowWidth; // uni=>wx runtime 编译目标是 uni 对象，内部不允许直接使用 uni

  deviceWidth = windowWidth;
  deviceDPR = pixelRatio;
  isIOS = platform === 'ios';
}
function upx2px(number, newDeviceWidth) {
  if (deviceWidth === 0) {
    checkDeviceWidth();
  }
  number = Number(number);
  if (number === 0) {
    return 0;
  }
  var result = number / BASE_DEVICE_WIDTH * (newDeviceWidth || deviceWidth);
  if (result < 0) {
    result = -result;
  }
  result = Math.floor(result + EPS);
  if (result === 0) {
    if (deviceDPR === 1 || !isIOS) {
      result = 1;
    } else {
      result = 0.5;
    }
  }
  return number < 0 ? -result : result;
}
var LOCALE_ZH_HANS = 'zh-Hans';
var LOCALE_ZH_HANT = 'zh-Hant';
var LOCALE_EN = 'en';
var LOCALE_FR = 'fr';
var LOCALE_ES = 'es';
var messages = {};
var locale;
{
  locale = normalizeLocale(wx.getSystemInfoSync().language) || LOCALE_EN;
}
function initI18nMessages() {
  if (!isEnableLocale()) {
    return;
  }
  var localeKeys = Object.keys(__uniConfig.locales);
  if (localeKeys.length) {
    localeKeys.forEach(function (locale) {
      var curMessages = messages[locale];
      var userMessages = __uniConfig.locales[locale];
      if (curMessages) {
        Object.assign(curMessages, userMessages);
      } else {
        messages[locale] = userMessages;
      }
    });
  }
}
initI18nMessages();
var i18n = (0, _uniI18n.initVueI18n)(locale, {});
var t = i18n.t;
var i18nMixin = i18n.mixin = {
  beforeCreate: function beforeCreate() {
    var _this = this;
    var unwatch = i18n.i18n.watchLocale(function () {
      _this.$forceUpdate();
    });
    this.$once('hook:beforeDestroy', function () {
      unwatch();
    });
  },
  methods: {
    $$t: function $$t(key, values) {
      return t(key, values);
    }
  }
};
var setLocale = i18n.setLocale;
var getLocale = i18n.getLocale;
function initAppLocale(Vue, appVm, locale) {
  var state = Vue.observable({
    locale: locale || i18n.getLocale()
  });
  var localeWatchers = [];
  appVm.$watchLocale = function (fn) {
    localeWatchers.push(fn);
  };
  Object.defineProperty(appVm, '$locale', {
    get: function get() {
      return state.locale;
    },
    set: function set(v) {
      state.locale = v;
      localeWatchers.forEach(function (watch) {
        return watch(v);
      });
    }
  });
}
function isEnableLocale() {
  return typeof __uniConfig !== 'undefined' && __uniConfig.locales && !!Object.keys(__uniConfig.locales).length;
}
function include(str, parts) {
  return !!parts.find(function (part) {
    return str.indexOf(part) !== -1;
  });
}
function startsWith(str, parts) {
  return parts.find(function (part) {
    return str.indexOf(part) === 0;
  });
}
function normalizeLocale(locale, messages) {
  if (!locale) {
    return;
  }
  locale = locale.trim().replace(/_/g, '-');
  if (messages && messages[locale]) {
    return locale;
  }
  locale = locale.toLowerCase();
  if (locale === 'chinese') {
    // 支付宝
    return LOCALE_ZH_HANS;
  }
  if (locale.indexOf('zh') === 0) {
    if (locale.indexOf('-hans') > -1) {
      return LOCALE_ZH_HANS;
    }
    if (locale.indexOf('-hant') > -1) {
      return LOCALE_ZH_HANT;
    }
    if (include(locale, ['-tw', '-hk', '-mo', '-cht'])) {
      return LOCALE_ZH_HANT;
    }
    return LOCALE_ZH_HANS;
  }
  var lang = startsWith(locale, [LOCALE_EN, LOCALE_FR, LOCALE_ES]);
  if (lang) {
    return lang;
  }
}
// export function initI18n() {
//   const localeKeys = Object.keys(__uniConfig.locales || {})
//   if (localeKeys.length) {
//     localeKeys.forEach((locale) =>
//       i18n.add(locale, __uniConfig.locales[locale])
//     )
//   }
// }

function getLocale$1() {
  // 优先使用 $locale
  var app = getApp({
    allowDefault: true
  });
  if (app && app.$vm) {
    return app.$vm.$locale;
  }
  return normalizeLocale(wx.getSystemInfoSync().language) || LOCALE_EN;
}
function setLocale$1(locale) {
  var app = getApp();
  if (!app) {
    return false;
  }
  var oldLocale = app.$vm.$locale;
  if (oldLocale !== locale) {
    app.$vm.$locale = locale;
    onLocaleChangeCallbacks.forEach(function (fn) {
      return fn({
        locale: locale
      });
    });
    return true;
  }
  return false;
}
var onLocaleChangeCallbacks = [];
function onLocaleChange(fn) {
  if (onLocaleChangeCallbacks.indexOf(fn) === -1) {
    onLocaleChangeCallbacks.push(fn);
  }
}
if (typeof global !== 'undefined') {
  global.getLocale = getLocale$1;
}
var interceptors = {
  promiseInterceptor: promiseInterceptor
};
var baseApi = /*#__PURE__*/Object.freeze({
  __proto__: null,
  upx2px: upx2px,
  getLocale: getLocale$1,
  setLocale: setLocale$1,
  onLocaleChange: onLocaleChange,
  addInterceptor: addInterceptor,
  removeInterceptor: removeInterceptor,
  interceptors: interceptors
});
function findExistsPageIndex(url) {
  var pages = getCurrentPages();
  var len = pages.length;
  while (len--) {
    var page = pages[len];
    if (page.$page && page.$page.fullPath === url) {
      return len;
    }
  }
  return -1;
}
var redirectTo = {
  name: function name(fromArgs) {
    if (fromArgs.exists === 'back' && fromArgs.delta) {
      return 'navigateBack';
    }
    return 'redirectTo';
  },
  args: function args(fromArgs) {
    if (fromArgs.exists === 'back' && fromArgs.url) {
      var existsPageIndex = findExistsPageIndex(fromArgs.url);
      if (existsPageIndex !== -1) {
        var delta = getCurrentPages().length - 1 - existsPageIndex;
        if (delta > 0) {
          fromArgs.delta = delta;
        }
      }
    }
  }
};
var previewImage = {
  args: function args(fromArgs) {
    var currentIndex = parseInt(fromArgs.current);
    if (isNaN(currentIndex)) {
      return;
    }
    var urls = fromArgs.urls;
    if (!Array.isArray(urls)) {
      return;
    }
    var len = urls.length;
    if (!len) {
      return;
    }
    if (currentIndex < 0) {
      currentIndex = 0;
    } else if (currentIndex >= len) {
      currentIndex = len - 1;
    }
    if (currentIndex > 0) {
      fromArgs.current = urls[currentIndex];
      fromArgs.urls = urls.filter(function (item, index) {
        return index < currentIndex ? item !== urls[currentIndex] : true;
      });
    } else {
      fromArgs.current = urls[0];
    }
    return {
      indicator: false,
      loop: false
    };
  }
};
var UUID_KEY = '__DC_STAT_UUID';
var deviceId;
function useDeviceId(result) {
  deviceId = deviceId || wx.getStorageSync(UUID_KEY);
  if (!deviceId) {
    deviceId = Date.now() + '' + Math.floor(Math.random() * 1e7);
    wx.setStorage({
      key: UUID_KEY,
      data: deviceId
    });
  }
  result.deviceId = deviceId;
}
function addSafeAreaInsets(result) {
  if (result.safeArea) {
    var safeArea = result.safeArea;
    result.safeAreaInsets = {
      top: safeArea.top,
      left: safeArea.left,
      right: result.windowWidth - safeArea.right,
      bottom: result.screenHeight - safeArea.bottom
    };
  }
}
function populateParameters(result) {
  var _result$brand = result.brand,
    brand = _result$brand === void 0 ? '' : _result$brand,
    _result$model = result.model,
    model = _result$model === void 0 ? '' : _result$model,
    _result$system = result.system,
    system = _result$system === void 0 ? '' : _result$system,
    _result$language = result.language,
    language = _result$language === void 0 ? '' : _result$language,
    theme = result.theme,
    version = result.version,
    platform = result.platform,
    fontSizeSetting = result.fontSizeSetting,
    SDKVersion = result.SDKVersion,
    pixelRatio = result.pixelRatio,
    deviceOrientation = result.deviceOrientation;
  // const isQuickApp = "mp-weixin".indexOf('quickapp-webview') !== -1

  // osName osVersion
  var osName = '';
  var osVersion = '';
  {
    osName = system.split(' ')[0] || '';
    osVersion = system.split(' ')[1] || '';
  }
  var hostVersion = version;

  // deviceType
  var deviceType = getGetDeviceType(result, model);

  // deviceModel
  var deviceBrand = getDeviceBrand(brand);

  // hostName
  var _hostName = getHostName(result);

  // deviceOrientation
  var _deviceOrientation = deviceOrientation; // 仅 微信 百度 支持

  // devicePixelRatio
  var _devicePixelRatio = pixelRatio;

  // SDKVersion
  var _SDKVersion = SDKVersion;

  // hostLanguage
  var hostLanguage = language.replace(/_/g, '-');

  // wx.getAccountInfoSync

  var parameters = {
    appId: "__UNI__B1EB762",
    appName: "app02",
    appVersion: "1.0.0",
    appVersionCode: "100",
    appLanguage: getAppLanguage(hostLanguage),
    uniCompileVersion: "3.6.14",
    uniRuntimeVersion: "3.6.14",
    uniPlatform: undefined || "mp-weixin",
    deviceBrand: deviceBrand,
    deviceModel: model,
    deviceType: deviceType,
    devicePixelRatio: _devicePixelRatio,
    deviceOrientation: _deviceOrientation,
    osName: osName.toLocaleLowerCase(),
    osVersion: osVersion,
    hostTheme: theme,
    hostVersion: hostVersion,
    hostLanguage: hostLanguage,
    hostName: _hostName,
    hostSDKVersion: _SDKVersion,
    hostFontSizeSetting: fontSizeSetting,
    windowTop: 0,
    windowBottom: 0,
    // TODO
    osLanguage: undefined,
    osTheme: undefined,
    ua: undefined,
    hostPackageName: undefined,
    browserName: undefined,
    browserVersion: undefined
  };
  Object.assign(result, parameters);
}
function getGetDeviceType(result, model) {
  var deviceType = result.deviceType || 'phone';
  {
    var deviceTypeMaps = {
      ipad: 'pad',
      windows: 'pc',
      mac: 'pc'
    };
    var deviceTypeMapsKeys = Object.keys(deviceTypeMaps);
    var _model = model.toLocaleLowerCase();
    for (var index = 0; index < deviceTypeMapsKeys.length; index++) {
      var _m = deviceTypeMapsKeys[index];
      if (_model.indexOf(_m) !== -1) {
        deviceType = deviceTypeMaps[_m];
        break;
      }
    }
  }
  return deviceType;
}
function getDeviceBrand(brand) {
  var deviceBrand = brand;
  if (deviceBrand) {
    deviceBrand = brand.toLocaleLowerCase();
  }
  return deviceBrand;
}
function getAppLanguage(defaultLanguage) {
  return getLocale$1 ? getLocale$1() : defaultLanguage;
}
function getHostName(result) {
  var _platform = 'WeChat';
  var _hostName = result.hostName || _platform; // mp-jd
  {
    if (result.environment) {
      _hostName = result.environment;
    } else if (result.host && result.host.env) {
      _hostName = result.host.env;
    }
  }
  return _hostName;
}
var getSystemInfo = {
  returnValue: function returnValue(result) {
    useDeviceId(result);
    addSafeAreaInsets(result);
    populateParameters(result);
  }
};
var showActionSheet = {
  args: function args(fromArgs) {
    if ((0, _typeof2.default)(fromArgs) === 'object') {
      fromArgs.alertText = fromArgs.title;
    }
  }
};
var getAppBaseInfo = {
  returnValue: function returnValue(result) {
    var _result = result,
      version = _result.version,
      language = _result.language,
      SDKVersion = _result.SDKVersion,
      theme = _result.theme;
    var _hostName = getHostName(result);
    var hostLanguage = language.replace('_', '-');
    result = sortObject(Object.assign(result, {
      appId: "__UNI__B1EB762",
      appName: "app02",
      appVersion: "1.0.0",
      appVersionCode: "100",
      appLanguage: getAppLanguage(hostLanguage),
      hostVersion: version,
      hostLanguage: hostLanguage,
      hostName: _hostName,
      hostSDKVersion: SDKVersion,
      hostTheme: theme
    }));
  }
};
var getDeviceInfo = {
  returnValue: function returnValue(result) {
    var _result2 = result,
      brand = _result2.brand,
      model = _result2.model;
    var deviceType = getGetDeviceType(result, model);
    var deviceBrand = getDeviceBrand(brand);
    useDeviceId(result);
    result = sortObject(Object.assign(result, {
      deviceType: deviceType,
      deviceBrand: deviceBrand,
      deviceModel: model
    }));
  }
};
var getWindowInfo = {
  returnValue: function returnValue(result) {
    addSafeAreaInsets(result);
    result = sortObject(Object.assign(result, {
      windowTop: 0,
      windowBottom: 0
    }));
  }
};
var getAppAuthorizeSetting = {
  returnValue: function returnValue(result) {
    var locationReducedAccuracy = result.locationReducedAccuracy;
    result.locationAccuracy = 'unsupported';
    if (locationReducedAccuracy === true) {
      result.locationAccuracy = 'reduced';
    } else if (locationReducedAccuracy === false) {
      result.locationAccuracy = 'full';
    }
  }
};

// import navigateTo from 'uni-helpers/navigate-to'

var protocols = {
  redirectTo: redirectTo,
  // navigateTo,  // 由于在微信开发者工具的页面参数，会显示__id__参数，因此暂时关闭mp-weixin对于navigateTo的AOP
  previewImage: previewImage,
  getSystemInfo: getSystemInfo,
  getSystemInfoSync: getSystemInfo,
  showActionSheet: showActionSheet,
  getAppBaseInfo: getAppBaseInfo,
  getDeviceInfo: getDeviceInfo,
  getWindowInfo: getWindowInfo,
  getAppAuthorizeSetting: getAppAuthorizeSetting
};
var todos = ['vibrate', 'preloadPage', 'unPreloadPage', 'loadSubPackage'];
var canIUses = [];
var CALLBACKS = ['success', 'fail', 'cancel', 'complete'];
function processCallback(methodName, method, returnValue) {
  return function (res) {
    return method(processReturnValue(methodName, res, returnValue));
  };
}
function processArgs(methodName, fromArgs) {
  var argsOption = arguments.length > 2 && arguments[2] !== undefined ? arguments[2] : {};
  var returnValue = arguments.length > 3 && arguments[3] !== undefined ? arguments[3] : {};
  var keepFromArgs = arguments.length > 4 && arguments[4] !== undefined ? arguments[4] : false;
  if (isPlainObject(fromArgs)) {
    // 一般 api 的参数解析
    var toArgs = keepFromArgs === true ? fromArgs : {}; // returnValue 为 false 时，说明是格式化返回值，直接在返回值对象上修改赋值
    if (isFn(argsOption)) {
      argsOption = argsOption(fromArgs, toArgs) || {};
    }
    for (var key in fromArgs) {
      if (hasOwn(argsOption, key)) {
        var keyOption = argsOption[key];
        if (isFn(keyOption)) {
          keyOption = keyOption(fromArgs[key], fromArgs, toArgs);
        }
        if (!keyOption) {
          // 不支持的参数
          console.warn("The '".concat(methodName, "' method of platform '\u5FAE\u4FE1\u5C0F\u7A0B\u5E8F' does not support option '").concat(key, "'"));
        } else if (isStr(keyOption)) {
          // 重写参数 key
          toArgs[keyOption] = fromArgs[key];
        } else if (isPlainObject(keyOption)) {
          // {name:newName,value:value}可重新指定参数 key:value
          toArgs[keyOption.name ? keyOption.name : key] = keyOption.value;
        }
      } else if (CALLBACKS.indexOf(key) !== -1) {
        if (isFn(fromArgs[key])) {
          toArgs[key] = processCallback(methodName, fromArgs[key], returnValue);
        }
      } else {
        if (!keepFromArgs) {
          toArgs[key] = fromArgs[key];
        }
      }
    }
    return toArgs;
  } else if (isFn(fromArgs)) {
    fromArgs = processCallback(methodName, fromArgs, returnValue);
  }
  return fromArgs;
}
function processReturnValue(methodName, res, returnValue) {
  var keepReturnValue = arguments.length > 3 && arguments[3] !== undefined ? arguments[3] : false;
  if (isFn(protocols.returnValue)) {
    // 处理通用 returnValue
    res = protocols.returnValue(methodName, res);
  }
  return processArgs(methodName, res, returnValue, {}, keepReturnValue);
}
function wrapper(methodName, method) {
  if (hasOwn(protocols, methodName)) {
    var protocol = protocols[methodName];
    if (!protocol) {
      // 暂不支持的 api
      return function () {
        console.error("Platform '\u5FAE\u4FE1\u5C0F\u7A0B\u5E8F' does not support '".concat(methodName, "'."));
      };
    }
    return function (arg1, arg2) {
      // 目前 api 最多两个参数
      var options = protocol;
      if (isFn(protocol)) {
        options = protocol(arg1);
      }
      arg1 = processArgs(methodName, arg1, options.args, options.returnValue);
      var args = [arg1];
      if (typeof arg2 !== 'undefined') {
        args.push(arg2);
      }
      if (isFn(options.name)) {
        methodName = options.name(arg1);
      } else if (isStr(options.name)) {
        methodName = options.name;
      }
      var returnValue = wx[methodName].apply(wx, args);
      if (isSyncApi(methodName)) {
        // 同步 api
        return processReturnValue(methodName, returnValue, options.returnValue, isContextApi(methodName));
      }
      return returnValue;
    };
  }
  return method;
}
var todoApis = Object.create(null);
var TODOS = ['onTabBarMidButtonTap', 'subscribePush', 'unsubscribePush', 'onPush', 'offPush', 'share'];
function createTodoApi(name) {
  return function todoApi(_ref) {
    var fail = _ref.fail,
      complete = _ref.complete;
    var res = {
      errMsg: "".concat(name, ":fail method '").concat(name, "' not supported")
    };
    isFn(fail) && fail(res);
    isFn(complete) && complete(res);
  };
}
TODOS.forEach(function (name) {
  todoApis[name] = createTodoApi(name);
});
var providers = {
  oauth: ['weixin'],
  share: ['weixin'],
  payment: ['wxpay'],
  push: ['weixin']
};
function getProvider(_ref2) {
  var service = _ref2.service,
    success = _ref2.success,
    fail = _ref2.fail,
    complete = _ref2.complete;
  var res = false;
  if (providers[service]) {
    res = {
      errMsg: 'getProvider:ok',
      service: service,
      provider: providers[service]
    };
    isFn(success) && success(res);
  } else {
    res = {
      errMsg: 'getProvider:fail service not found'
    };
    isFn(fail) && fail(res);
  }
  isFn(complete) && complete(res);
}
var extraApi = /*#__PURE__*/Object.freeze({
  __proto__: null,
  getProvider: getProvider
});
var getEmitter = function () {
  var Emitter;
  return function getUniEmitter() {
    if (!Emitter) {
      Emitter = new _vue.default();
    }
    return Emitter;
  };
}();
function apply(ctx, method, args) {
  return ctx[method].apply(ctx, args);
}
function $on() {
  return apply(getEmitter(), '$on', Array.prototype.slice.call(arguments));
}
function $off() {
  return apply(getEmitter(), '$off', Array.prototype.slice.call(arguments));
}
function $once() {
  return apply(getEmitter(), '$once', Array.prototype.slice.call(arguments));
}
function $emit() {
  return apply(getEmitter(), '$emit', Array.prototype.slice.call(arguments));
}
var eventApi = /*#__PURE__*/Object.freeze({
  __proto__: null,
  $on: $on,
  $off: $off,
  $once: $once,
  $emit: $emit
});

/**
 * 框架内 try-catch
 */
/**
 * 开发者 try-catch
 */
function tryCatch(fn) {
  return function () {
    try {
      return fn.apply(fn, arguments);
    } catch (e) {
      // TODO
      console.error(e);
    }
  };
}
function getApiCallbacks(params) {
  var apiCallbacks = {};
  for (var name in params) {
    var param = params[name];
    if (isFn(param)) {
      apiCallbacks[name] = tryCatch(param);
      delete params[name];
    }
  }
  return apiCallbacks;
}
var cid;
var cidErrMsg;
var enabled;
function normalizePushMessage(message) {
  try {
    return JSON.parse(message);
  } catch (e) {}
  return message;
}
function invokePushCallback(args) {
  if (args.type === 'enabled') {
    enabled = true;
  } else if (args.type === 'clientId') {
    cid = args.cid;
    cidErrMsg = args.errMsg;
    invokeGetPushCidCallbacks(cid, args.errMsg);
  } else if (args.type === 'pushMsg') {
    var message = {
      type: 'receive',
      data: normalizePushMessage(args.message)
    };
    for (var i = 0; i < onPushMessageCallbacks.length; i++) {
      var callback = onPushMessageCallbacks[i];
      callback(message);
      // 该消息已被阻止
      if (message.stopped) {
        break;
      }
    }
  } else if (args.type === 'click') {
    onPushMessageCallbacks.forEach(function (callback) {
      callback({
        type: 'click',
        data: normalizePushMessage(args.message)
      });
    });
  }
}
var getPushCidCallbacks = [];
function invokeGetPushCidCallbacks(cid, errMsg) {
  getPushCidCallbacks.forEach(function (callback) {
    callback(cid, errMsg);
  });
  getPushCidCallbacks.length = 0;
}
function getPushClientId(args) {
  if (!isPlainObject(args)) {
    args = {};
  }
  var _getApiCallbacks = getApiCallbacks(args),
    success = _getApiCallbacks.success,
    fail = _getApiCallbacks.fail,
    complete = _getApiCallbacks.complete;
  var hasSuccess = isFn(success);
  var hasFail = isFn(fail);
  var hasComplete = isFn(complete);
  Promise.resolve().then(function () {
    if (typeof enabled === 'undefined') {
      enabled = false;
      cid = '';
      cidErrMsg = 'uniPush is not enabled';
    }
    getPushCidCallbacks.push(function (cid, errMsg) {
      var res;
      if (cid) {
        res = {
          errMsg: 'getPushClientId:ok',
          cid: cid
        };
        hasSuccess && success(res);
      } else {
        res = {
          errMsg: 'getPushClientId:fail' + (errMsg ? ' ' + errMsg : '')
        };
        hasFail && fail(res);
      }
      hasComplete && complete(res);
    });
    if (typeof cid !== 'undefined') {
      invokeGetPushCidCallbacks(cid, cidErrMsg);
    }
  });
}
var onPushMessageCallbacks = [];
// 不使用 defineOnApi 实现，是因为 defineOnApi 依赖 UniServiceJSBridge ，该对象目前在小程序上未提供，故简单实现
var onPushMessage = function onPushMessage(fn) {
  if (onPushMessageCallbacks.indexOf(fn) === -1) {
    onPushMessageCallbacks.push(fn);
  }
};
var offPushMessage = function offPushMessage(fn) {
  if (!fn) {
    onPushMessageCallbacks.length = 0;
  } else {
    var index = onPushMessageCallbacks.indexOf(fn);
    if (index > -1) {
      onPushMessageCallbacks.splice(index, 1);
    }
  }
};
var api = /*#__PURE__*/Object.freeze({
  __proto__: null,
  getPushClientId: getPushClientId,
  onPushMessage: onPushMessage,
  offPushMessage: offPushMessage,
  invokePushCallback: invokePushCallback
});
var mocks = ['__route__', '__wxExparserNodeId__', '__wxWebviewId__'];
function findVmByVueId(vm, vuePid) {
  var $children = vm.$children;
  // 优先查找直属(反向查找:https://github.com/dcloudio/uni-app/issues/1200)
  for (var i = $children.length - 1; i >= 0; i--) {
    var childVm = $children[i];
    if (childVm.$scope._$vueId === vuePid) {
      return childVm;
    }
  }
  // 反向递归查找
  var parentVm;
  for (var _i = $children.length - 1; _i >= 0; _i--) {
    parentVm = findVmByVueId($children[_i], vuePid);
    if (parentVm) {
      return parentVm;
    }
  }
}
function initBehavior(options) {
  return Behavior(options);
}
function isPage() {
  return !!this.route;
}
function initRelation(detail) {
  this.triggerEvent('__l', detail);
}
function selectAllComponents(mpInstance, selector, $refs) {
  var components = mpInstance.selectAllComponents(selector) || [];
  components.forEach(function (component) {
    var ref = component.dataset.ref;
    $refs[ref] = component.$vm || toSkip(component);
    {
      if (component.dataset.vueGeneric === 'scoped') {
        component.selectAllComponents('.scoped-ref').forEach(function (scopedComponent) {
          selectAllComponents(scopedComponent, selector, $refs);
        });
      }
    }
  });
}
function syncRefs(refs, newRefs) {
  var oldKeys = (0, _construct2.default)(Set, (0, _toConsumableArray2.default)(Object.keys(refs)));
  var newKeys = Object.keys(newRefs);
  newKeys.forEach(function (key) {
    var oldValue = refs[key];
    var newValue = newRefs[key];
    if (Array.isArray(oldValue) && Array.isArray(newValue) && oldValue.length === newValue.length && newValue.every(function (value) {
      return oldValue.includes(value);
    })) {
      return;
    }
    refs[key] = newValue;
    oldKeys.delete(key);
  });
  oldKeys.forEach(function (key) {
    delete refs[key];
  });
  return refs;
}
function initRefs(vm) {
  var mpInstance = vm.$scope;
  var refs = {};
  Object.defineProperty(vm, '$refs', {
    get: function get() {
      var $refs = {};
      selectAllComponents(mpInstance, '.vue-ref', $refs);
      // TODO 暂不考虑 for 中的 scoped
      var forComponents = mpInstance.selectAllComponents('.vue-ref-in-for') || [];
      forComponents.forEach(function (component) {
        var ref = component.dataset.ref;
        if (!$refs[ref]) {
          $refs[ref] = [];
        }
        $refs[ref].push(component.$vm || toSkip(component));
      });
      return syncRefs(refs, $refs);
    }
  });
}
function handleLink(event) {
  var _ref3 = event.detail || event.value,
    vuePid = _ref3.vuePid,
    vueOptions = _ref3.vueOptions; // detail 是微信,value 是百度(dipatch)

  var parentVm;
  if (vuePid) {
    parentVm = findVmByVueId(this.$vm, vuePid);
  }
  if (!parentVm) {
    parentVm = this.$vm;
  }
  vueOptions.parent = parentVm;
}
function markMPComponent(component) {
  // 在 Vue 中标记为小程序组件
  var IS_MP = '__v_isMPComponent';
  Object.defineProperty(component, IS_MP, {
    configurable: true,
    enumerable: false,
    value: true
  });
  return component;
}
function toSkip(obj) {
  var OB = '__ob__';
  var SKIP = '__v_skip';
  if (isObject(obj) && Object.isExtensible(obj)) {
    // 避免被 @vue/composition-api 观测
    Object.defineProperty(obj, OB, {
      configurable: true,
      enumerable: false,
      value: (0, _defineProperty2.default)({}, SKIP, true)
    });
  }
  return obj;
}
var MPPage = Page;
var MPComponent = Component;
var customizeRE = /:/g;
var customize = cached(function (str) {
  return camelize(str.replace(customizeRE, '-'));
});
function initTriggerEvent(mpInstance) {
  var oldTriggerEvent = mpInstance.triggerEvent;
  var newTriggerEvent = function newTriggerEvent(event) {
    for (var _len3 = arguments.length, args = new Array(_len3 > 1 ? _len3 - 1 : 0), _key3 = 1; _key3 < _len3; _key3++) {
      args[_key3 - 1] = arguments[_key3];
    }
    // 事件名统一转驼峰格式，仅处理：当前组件为 vue 组件、当前组件为 vue 组件子组件
    if (this.$vm || this.dataset && this.dataset.comType) {
      event = customize(event);
    } else {
      // 针对微信/QQ小程序单独补充驼峰格式事件，以兼容历史项目
      var newEvent = customize(event);
      if (newEvent !== event) {
        oldTriggerEvent.apply(this, [newEvent].concat(args));
      }
    }
    return oldTriggerEvent.apply(this, [event].concat(args));
  };
  try {
    // 京东小程序 triggerEvent 为只读
    mpInstance.triggerEvent = newTriggerEvent;
  } catch (error) {
    mpInstance._triggerEvent = newTriggerEvent;
  }
}
function initHook(name, options, isComponent) {
  var oldHook = options[name];
  options[name] = function () {
    markMPComponent(this);
    initTriggerEvent(this);
    if (oldHook) {
      for (var _len4 = arguments.length, args = new Array(_len4), _key4 = 0; _key4 < _len4; _key4++) {
        args[_key4] = arguments[_key4];
      }
      return oldHook.apply(this, args);
    }
  };
}
if (!MPPage.__$wrappered) {
  MPPage.__$wrappered = true;
  Page = function Page() {
    var options = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : {};
    initHook('onLoad', options);
    return MPPage(options);
  };
  Page.after = MPPage.after;
  Component = function Component() {
    var options = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : {};
    initHook('created', options);
    return MPComponent(options);
  };
}
var PAGE_EVENT_HOOKS = ['onPullDownRefresh', 'onReachBottom', 'onAddToFavorites', 'onShareTimeline', 'onShareAppMessage', 'onPageScroll', 'onResize', 'onTabItemTap'];
function initMocks(vm, mocks) {
  var mpInstance = vm.$mp[vm.mpType];
  mocks.forEach(function (mock) {
    if (hasOwn(mpInstance, mock)) {
      vm[mock] = mpInstance[mock];
    }
  });
}
function hasHook(hook, vueOptions) {
  if (!vueOptions) {
    return true;
  }
  if (_vue.default.options && Array.isArray(_vue.default.options[hook])) {
    return true;
  }
  vueOptions = vueOptions.default || vueOptions;
  if (isFn(vueOptions)) {
    if (isFn(vueOptions.extendOptions[hook])) {
      return true;
    }
    if (vueOptions.super && vueOptions.super.options && Array.isArray(vueOptions.super.options[hook])) {
      return true;
    }
    return false;
  }
  if (isFn(vueOptions[hook]) || Array.isArray(vueOptions[hook])) {
    return true;
  }
  var mixins = vueOptions.mixins;
  if (Array.isArray(mixins)) {
    return !!mixins.find(function (mixin) {
      return hasHook(hook, mixin);
    });
  }
}
function initHooks(mpOptions, hooks, vueOptions) {
  hooks.forEach(function (hook) {
    if (hasHook(hook, vueOptions)) {
      mpOptions[hook] = function (args) {
        return this.$vm && this.$vm.__call_hook(hook, args);
      };
    }
  });
}
function initUnknownHooks(mpOptions, vueOptions) {
  var excludes = arguments.length > 2 && arguments[2] !== undefined ? arguments[2] : [];
  findHooks(vueOptions).forEach(function (hook) {
    return initHook$1(mpOptions, hook, excludes);
  });
}
function findHooks(vueOptions) {
  var hooks = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : [];
  if (vueOptions) {
    Object.keys(vueOptions).forEach(function (name) {
      if (name.indexOf('on') === 0 && isFn(vueOptions[name])) {
        hooks.push(name);
      }
    });
  }
  return hooks;
}
function initHook$1(mpOptions, hook, excludes) {
  if (excludes.indexOf(hook) === -1 && !hasOwn(mpOptions, hook)) {
    mpOptions[hook] = function (args) {
      return this.$vm && this.$vm.__call_hook(hook, args);
    };
  }
}
function initVueComponent(Vue, vueOptions) {
  vueOptions = vueOptions.default || vueOptions;
  var VueComponent;
  if (isFn(vueOptions)) {
    VueComponent = vueOptions;
  } else {
    VueComponent = Vue.extend(vueOptions);
  }
  vueOptions = VueComponent.options;
  return [VueComponent, vueOptions];
}
function initSlots(vm, vueSlots) {
  if (Array.isArray(vueSlots) && vueSlots.length) {
    var $slots = Object.create(null);
    vueSlots.forEach(function (slotName) {
      $slots[slotName] = true;
    });
    vm.$scopedSlots = vm.$slots = $slots;
  }
}
function initVueIds(vueIds, mpInstance) {
  vueIds = (vueIds || '').split(',');
  var len = vueIds.length;
  if (len === 1) {
    mpInstance._$vueId = vueIds[0];
  } else if (len === 2) {
    mpInstance._$vueId = vueIds[0];
    mpInstance._$vuePid = vueIds[1];
  }
}
function initData(vueOptions, context) {
  var data = vueOptions.data || {};
  var methods = vueOptions.methods || {};
  if (typeof data === 'function') {
    try {
      data = data.call(context); // 支持 Vue.prototype 上挂的数据
    } catch (e) {
      if (Object({"VUE_APP_DARK_MODE":"false","VUE_APP_NAME":"app02","VUE_APP_PLATFORM":"mp-weixin","NODE_ENV":"development","BASE_URL":"/"}).VUE_APP_DEBUG) {
        console.warn('根据 Vue 的 data 函数初始化小程序 data 失败，请尽量确保 data 函数中不访问 vm 对象，否则可能影响首次数据渲染速度。', data);
      }
    }
  } else {
    try {
      // 对 data 格式化
      data = JSON.parse(JSON.stringify(data));
    } catch (e) {}
  }
  if (!isPlainObject(data)) {
    data = {};
  }
  Object.keys(methods).forEach(function (methodName) {
    if (context.__lifecycle_hooks__.indexOf(methodName) === -1 && !hasOwn(data, methodName)) {
      data[methodName] = methods[methodName];
    }
  });
  return data;
}
var PROP_TYPES = [String, Number, Boolean, Object, Array, null];
function createObserver(name) {
  return function observer(newVal, oldVal) {
    if (this.$vm) {
      this.$vm[name] = newVal; // 为了触发其他非 render watcher
    }
  };
}

function initBehaviors(vueOptions, initBehavior) {
  var vueBehaviors = vueOptions.behaviors;
  var vueExtends = vueOptions.extends;
  var vueMixins = vueOptions.mixins;
  var vueProps = vueOptions.props;
  if (!vueProps) {
    vueOptions.props = vueProps = [];
  }
  var behaviors = [];
  if (Array.isArray(vueBehaviors)) {
    vueBehaviors.forEach(function (behavior) {
      behaviors.push(behavior.replace('uni://', "wx".concat("://")));
      if (behavior === 'uni://form-field') {
        if (Array.isArray(vueProps)) {
          vueProps.push('name');
          vueProps.push('value');
        } else {
          vueProps.name = {
            type: String,
            default: ''
          };
          vueProps.value = {
            type: [String, Number, Boolean, Array, Object, Date],
            default: ''
          };
        }
      }
    });
  }
  if (isPlainObject(vueExtends) && vueExtends.props) {
    behaviors.push(initBehavior({
      properties: initProperties(vueExtends.props, true)
    }));
  }
  if (Array.isArray(vueMixins)) {
    vueMixins.forEach(function (vueMixin) {
      if (isPlainObject(vueMixin) && vueMixin.props) {
        behaviors.push(initBehavior({
          properties: initProperties(vueMixin.props, true)
        }));
      }
    });
  }
  return behaviors;
}
function parsePropType(key, type, defaultValue, file) {
  // [String]=>String
  if (Array.isArray(type) && type.length === 1) {
    return type[0];
  }
  return type;
}
function initProperties(props) {
  var isBehavior = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : false;
  var file = arguments.length > 2 && arguments[2] !== undefined ? arguments[2] : '';
  var options = arguments.length > 3 ? arguments[3] : undefined;
  var properties = {};
  if (!isBehavior) {
    properties.vueId = {
      type: String,
      value: ''
    };
    {
      if (options.virtualHost) {
        properties.virtualHostStyle = {
          type: null,
          value: ''
        };
        properties.virtualHostClass = {
          type: null,
          value: ''
        };
      }
    }
    // scopedSlotsCompiler auto
    properties.scopedSlotsCompiler = {
      type: String,
      value: ''
    };
    properties.vueSlots = {
      // 小程序不能直接定义 $slots 的 props，所以通过 vueSlots 转换到 $slots
      type: null,
      value: [],
      observer: function observer(newVal, oldVal) {
        var $slots = Object.create(null);
        newVal.forEach(function (slotName) {
          $slots[slotName] = true;
        });
        this.setData({
          $slots: $slots
        });
      }
    };
  }
  if (Array.isArray(props)) {
    // ['title']
    props.forEach(function (key) {
      properties[key] = {
        type: null,
        observer: createObserver(key)
      };
    });
  } else if (isPlainObject(props)) {
    // {title:{type:String,default:''},content:String}
    Object.keys(props).forEach(function (key) {
      var opts = props[key];
      if (isPlainObject(opts)) {
        // title:{type:String,default:''}
        var value = opts.default;
        if (isFn(value)) {
          value = value();
        }
        opts.type = parsePropType(key, opts.type);
        properties[key] = {
          type: PROP_TYPES.indexOf(opts.type) !== -1 ? opts.type : null,
          value: value,
          observer: createObserver(key)
        };
      } else {
        // content:String
        var type = parsePropType(key, opts);
        properties[key] = {
          type: PROP_TYPES.indexOf(type) !== -1 ? type : null,
          observer: createObserver(key)
        };
      }
    });
  }
  return properties;
}
function wrapper$1(event) {
  // TODO 又得兼容 mpvue 的 mp 对象
  try {
    event.mp = JSON.parse(JSON.stringify(event));
  } catch (e) {}
  event.stopPropagation = noop;
  event.preventDefault = noop;
  event.target = event.target || {};
  if (!hasOwn(event, 'detail')) {
    event.detail = {};
  }
  if (hasOwn(event, 'markerId')) {
    event.detail = (0, _typeof2.default)(event.detail) === 'object' ? event.detail : {};
    event.detail.markerId = event.markerId;
  }
  if (isPlainObject(event.detail)) {
    event.target = Object.assign({}, event.target, event.detail);
  }
  return event;
}
function getExtraValue(vm, dataPathsArray) {
  var context = vm;
  dataPathsArray.forEach(function (dataPathArray) {
    var dataPath = dataPathArray[0];
    var value = dataPathArray[2];
    if (dataPath || typeof value !== 'undefined') {
      // ['','',index,'disable']
      var propPath = dataPathArray[1];
      var valuePath = dataPathArray[3];
      var vFor;
      if (Number.isInteger(dataPath)) {
        vFor = dataPath;
      } else if (!dataPath) {
        vFor = context;
      } else if (typeof dataPath === 'string' && dataPath) {
        if (dataPath.indexOf('#s#') === 0) {
          vFor = dataPath.substr(3);
        } else {
          vFor = vm.__get_value(dataPath, context);
        }
      }
      if (Number.isInteger(vFor)) {
        context = value;
      } else if (!propPath) {
        context = vFor[value];
      } else {
        if (Array.isArray(vFor)) {
          context = vFor.find(function (vForItem) {
            return vm.__get_value(propPath, vForItem) === value;
          });
        } else if (isPlainObject(vFor)) {
          context = Object.keys(vFor).find(function (vForKey) {
            return vm.__get_value(propPath, vFor[vForKey]) === value;
          });
        } else {
          console.error('v-for 暂不支持循环数据：', vFor);
        }
      }
      if (valuePath) {
        context = vm.__get_value(valuePath, context);
      }
    }
  });
  return context;
}
function processEventExtra(vm, extra, event, __args__) {
  var extraObj = {};
  if (Array.isArray(extra) && extra.length) {
    /**
     *[
     *    ['data.items', 'data.id', item.data.id],
     *    ['metas', 'id', meta.id]
     *],
     *[
     *    ['data.items', 'data.id', item.data.id],
     *    ['metas', 'id', meta.id]
     *],
     *'test'
     */
    extra.forEach(function (dataPath, index) {
      if (typeof dataPath === 'string') {
        if (!dataPath) {
          // model,prop.sync
          extraObj['$' + index] = vm;
        } else {
          if (dataPath === '$event') {
            // $event
            extraObj['$' + index] = event;
          } else if (dataPath === 'arguments') {
            extraObj['$' + index] = event.detail ? event.detail.__args__ || __args__ : __args__;
          } else if (dataPath.indexOf('$event.') === 0) {
            // $event.target.value
            extraObj['$' + index] = vm.__get_value(dataPath.replace('$event.', ''), event);
          } else {
            extraObj['$' + index] = vm.__get_value(dataPath);
          }
        }
      } else {
        extraObj['$' + index] = getExtraValue(vm, dataPath);
      }
    });
  }
  return extraObj;
}
function getObjByArray(arr) {
  var obj = {};
  for (var i = 1; i < arr.length; i++) {
    var element = arr[i];
    obj[element[0]] = element[1];
  }
  return obj;
}
function processEventArgs(vm, event) {
  var args = arguments.length > 2 && arguments[2] !== undefined ? arguments[2] : [];
  var extra = arguments.length > 3 && arguments[3] !== undefined ? arguments[3] : [];
  var isCustom = arguments.length > 4 ? arguments[4] : undefined;
  var methodName = arguments.length > 5 ? arguments[5] : undefined;
  var isCustomMPEvent = false; // wxcomponent 组件，传递原始 event 对象

  // fixed 用户直接触发 mpInstance.triggerEvent
  var __args__ = isPlainObject(event.detail) ? event.detail.__args__ || [event.detail] : [event.detail];
  if (isCustom) {
    // 自定义事件
    isCustomMPEvent = event.currentTarget && event.currentTarget.dataset && event.currentTarget.dataset.comType === 'wx';
    if (!args.length) {
      // 无参数，直接传入 event 或 detail 数组
      if (isCustomMPEvent) {
        return [event];
      }
      return __args__;
    }
  }
  var extraObj = processEventExtra(vm, extra, event, __args__);
  var ret = [];
  args.forEach(function (arg) {
    if (arg === '$event') {
      if (methodName === '__set_model' && !isCustom) {
        // input v-model value
        ret.push(event.target.value);
      } else {
        if (isCustom && !isCustomMPEvent) {
          ret.push(__args__[0]);
        } else {
          // wxcomponent 组件或内置组件
          ret.push(event);
        }
      }
    } else {
      if (Array.isArray(arg) && arg[0] === 'o') {
        ret.push(getObjByArray(arg));
      } else if (typeof arg === 'string' && hasOwn(extraObj, arg)) {
        ret.push(extraObj[arg]);
      } else {
        ret.push(arg);
      }
    }
  });
  return ret;
}
var ONCE = '~';
var CUSTOM = '^';
function isMatchEventType(eventType, optType) {
  return eventType === optType || optType === 'regionchange' && (eventType === 'begin' || eventType === 'end');
}
function getContextVm(vm) {
  var $parent = vm.$parent;
  // 父组件是 scoped slots 或者其他自定义组件时继续查找
  while ($parent && $parent.$parent && ($parent.$options.generic || $parent.$parent.$options.generic || $parent.$scope._$vuePid)) {
    $parent = $parent.$parent;
  }
  return $parent && $parent.$parent;
}
function handleEvent(event) {
  var _this2 = this;
  event = wrapper$1(event);

  // [['tap',[['handle',[1,2,a]],['handle1',[1,2,a]]]]]
  var dataset = (event.currentTarget || event.target).dataset;
  if (!dataset) {
    return console.warn('事件信息不存在');
  }
  var eventOpts = dataset.eventOpts || dataset['event-opts']; // 支付宝 web-view 组件 dataset 非驼峰
  if (!eventOpts) {
    return console.warn('事件信息不存在');
  }

  // [['handle',[1,2,a]],['handle1',[1,2,a]]]
  var eventType = event.type;
  var ret = [];
  eventOpts.forEach(function (eventOpt) {
    var type = eventOpt[0];
    var eventsArray = eventOpt[1];
    var isCustom = type.charAt(0) === CUSTOM;
    type = isCustom ? type.slice(1) : type;
    var isOnce = type.charAt(0) === ONCE;
    type = isOnce ? type.slice(1) : type;
    if (eventsArray && isMatchEventType(eventType, type)) {
      eventsArray.forEach(function (eventArray) {
        var methodName = eventArray[0];
        if (methodName) {
          var handlerCtx = _this2.$vm;
          if (handlerCtx.$options.generic) {
            // mp-weixin,mp-toutiao 抽象节点模拟 scoped slots
            handlerCtx = getContextVm(handlerCtx) || handlerCtx;
          }
          if (methodName === '$emit') {
            handlerCtx.$emit.apply(handlerCtx, processEventArgs(_this2.$vm, event, eventArray[1], eventArray[2], isCustom, methodName));
            return;
          }
          var handler = handlerCtx[methodName];
          if (!isFn(handler)) {
            var _type = _this2.$vm.mpType === 'page' ? 'Page' : 'Component';
            var path = _this2.route || _this2.is;
            throw new Error("".concat(_type, " \"").concat(path, "\" does not have a method \"").concat(methodName, "\""));
          }
          if (isOnce) {
            if (handler.once) {
              return;
            }
            handler.once = true;
          }
          var params = processEventArgs(_this2.$vm, event, eventArray[1], eventArray[2], isCustom, methodName);
          params = Array.isArray(params) ? params : [];
          // 参数尾部增加原始事件对象用于复杂表达式内获取额外数据
          if (/=\s*\S+\.eventParams\s*\|\|\s*\S+\[['"]event-params['"]\]/.test(handler.toString())) {
            // eslint-disable-next-line no-sparse-arrays
            params = params.concat([,,,,,,,,,, event]);
          }
          ret.push(handler.apply(handlerCtx, params));
        }
      });
    }
  });
  if (eventType === 'input' && ret.length === 1 && typeof ret[0] !== 'undefined') {
    return ret[0];
  }
}
var eventChannels = {};
var eventChannelStack = [];
function getEventChannel(id) {
  if (id) {
    var eventChannel = eventChannels[id];
    delete eventChannels[id];
    return eventChannel;
  }
  return eventChannelStack.shift();
}
var hooks = ['onShow', 'onHide', 'onError', 'onPageNotFound', 'onThemeChange', 'onUnhandledRejection'];
function initEventChannel() {
  _vue.default.prototype.getOpenerEventChannel = function () {
    // 微信小程序使用自身getOpenerEventChannel
    {
      return this.$scope.getOpenerEventChannel();
    }
  };
  var callHook = _vue.default.prototype.__call_hook;
  _vue.default.prototype.__call_hook = function (hook, args) {
    if (hook === 'onLoad' && args && args.__id__) {
      this.__eventChannel__ = getEventChannel(args.__id__);
      delete args.__id__;
    }
    return callHook.call(this, hook, args);
  };
}
function initScopedSlotsParams() {
  var center = {};
  var parents = {};
  _vue.default.prototype.$hasScopedSlotsParams = function (vueId) {
    var has = center[vueId];
    if (!has) {
      parents[vueId] = this;
      this.$on('hook:destroyed', function () {
        delete parents[vueId];
      });
    }
    return has;
  };
  _vue.default.prototype.$getScopedSlotsParams = function (vueId, name, key) {
    var data = center[vueId];
    if (data) {
      var object = data[name] || {};
      return key ? object[key] : object;
    } else {
      parents[vueId] = this;
      this.$on('hook:destroyed', function () {
        delete parents[vueId];
      });
    }
  };
  _vue.default.prototype.$setScopedSlotsParams = function (name, value) {
    var vueIds = this.$options.propsData.vueId;
    if (vueIds) {
      var vueId = vueIds.split(',')[0];
      var object = center[vueId] = center[vueId] || {};
      object[name] = value;
      if (parents[vueId]) {
        parents[vueId].$forceUpdate();
      }
    }
  };
  _vue.default.mixin({
    destroyed: function destroyed() {
      var propsData = this.$options.propsData;
      var vueId = propsData && propsData.vueId;
      if (vueId) {
        delete center[vueId];
        delete parents[vueId];
      }
    }
  });
}
function parseBaseApp(vm, _ref4) {
  var mocks = _ref4.mocks,
    initRefs = _ref4.initRefs;
  initEventChannel();
  {
    initScopedSlotsParams();
  }
  if (vm.$options.store) {
    _vue.default.prototype.$store = vm.$options.store;
  }
  uniIdMixin(_vue.default);
  _vue.default.prototype.mpHost = "mp-weixin";
  _vue.default.mixin({
    beforeCreate: function beforeCreate() {
      if (!this.$options.mpType) {
        return;
      }
      this.mpType = this.$options.mpType;
      this.$mp = (0, _defineProperty2.default)({
        data: {}
      }, this.mpType, this.$options.mpInstance);
      this.$scope = this.$options.mpInstance;
      delete this.$options.mpType;
      delete this.$options.mpInstance;
      if (this.mpType === 'page' && typeof getApp === 'function') {
        // hack vue-i18n
        var app = getApp();
        if (app.$vm && app.$vm.$i18n) {
          this._i18n = app.$vm.$i18n;
        }
      }
      if (this.mpType !== 'app') {
        initRefs(this);
        initMocks(this, mocks);
      }
    }
  });
  var appOptions = {
    onLaunch: function onLaunch(args) {
      if (this.$vm) {
        // 已经初始化过了，主要是为了百度，百度 onShow 在 onLaunch 之前
        return;
      }
      {
        if (wx.canIUse && !wx.canIUse('nextTick')) {
          // 事实 上2.2.3 即可，简单使用 2.3.0 的 nextTick 判断
          console.error('当前微信基础库版本过低，请将 微信开发者工具-详情-项目设置-调试基础库版本 更换为`2.3.0`以上');
        }
      }
      this.$vm = vm;
      this.$vm.$mp = {
        app: this
      };
      this.$vm.$scope = this;
      // vm 上也挂载 globalData
      this.$vm.globalData = this.globalData;
      this.$vm._isMounted = true;
      this.$vm.__call_hook('mounted', args);
      this.$vm.__call_hook('onLaunch', args);
    }
  };

  // 兼容旧版本 globalData
  appOptions.globalData = vm.$options.globalData || {};
  // 将 methods 中的方法挂在 getApp() 中
  var methods = vm.$options.methods;
  if (methods) {
    Object.keys(methods).forEach(function (name) {
      appOptions[name] = methods[name];
    });
  }
  initAppLocale(_vue.default, vm, normalizeLocale(wx.getSystemInfoSync().language) || LOCALE_EN);
  initHooks(appOptions, hooks);
  initUnknownHooks(appOptions, vm.$options);
  return appOptions;
}
function parseApp(vm) {
  return parseBaseApp(vm, {
    mocks: mocks,
    initRefs: initRefs
  });
}
function createApp(vm) {
  App(parseApp(vm));
  return vm;
}
var encodeReserveRE = /[!'()*]/g;
var encodeReserveReplacer = function encodeReserveReplacer(c) {
  return '%' + c.charCodeAt(0).toString(16);
};
var commaRE = /%2C/g;

// fixed encodeURIComponent which is more conformant to RFC3986:
// - escapes [!'()*]
// - preserve commas
var encode = function encode(str) {
  return encodeURIComponent(str).replace(encodeReserveRE, encodeReserveReplacer).replace(commaRE, ',');
};
function stringifyQuery(obj) {
  var encodeStr = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : encode;
  var res = obj ? Object.keys(obj).map(function (key) {
    var val = obj[key];
    if (val === undefined) {
      return '';
    }
    if (val === null) {
      return encodeStr(key);
    }
    if (Array.isArray(val)) {
      var result = [];
      val.forEach(function (val2) {
        if (val2 === undefined) {
          return;
        }
        if (val2 === null) {
          result.push(encodeStr(key));
        } else {
          result.push(encodeStr(key) + '=' + encodeStr(val2));
        }
      });
      return result.join('&');
    }
    return encodeStr(key) + '=' + encodeStr(val);
  }).filter(function (x) {
    return x.length > 0;
  }).join('&') : null;
  return res ? "?".concat(res) : '';
}
function parseBaseComponent(vueComponentOptions) {
  var _ref5 = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : {},
    isPage = _ref5.isPage,
    initRelation = _ref5.initRelation;
  var needVueOptions = arguments.length > 2 ? arguments[2] : undefined;
  var _initVueComponent = initVueComponent(_vue.default, vueComponentOptions),
    _initVueComponent2 = (0, _slicedToArray2.default)(_initVueComponent, 2),
    VueComponent = _initVueComponent2[0],
    vueOptions = _initVueComponent2[1];
  var options = _objectSpread({
    multipleSlots: true,
    addGlobalClass: true
  }, vueOptions.options || {});
  {
    // 微信 multipleSlots 部分情况有 bug，导致内容顺序错乱 如 u-list，提供覆盖选项
    if (vueOptions['mp-weixin'] && vueOptions['mp-weixin'].options) {
      Object.assign(options, vueOptions['mp-weixin'].options);
    }
  }
  var componentOptions = {
    options: options,
    data: initData(vueOptions, _vue.default.prototype),
    behaviors: initBehaviors(vueOptions, initBehavior),
    properties: initProperties(vueOptions.props, false, vueOptions.__file, options),
    lifetimes: {
      attached: function attached() {
        var properties = this.properties;
        var options = {
          mpType: isPage.call(this) ? 'page' : 'component',
          mpInstance: this,
          propsData: properties
        };
        initVueIds(properties.vueId, this);

        // 处理父子关系
        initRelation.call(this, {
          vuePid: this._$vuePid,
          vueOptions: options
        });

        // 初始化 vue 实例
        this.$vm = new VueComponent(options);

        // 处理$slots,$scopedSlots（暂不支持动态变化$slots）
        initSlots(this.$vm, properties.vueSlots);

        // 触发首次 setData
        this.$vm.$mount();
      },
      ready: function ready() {
        // 当组件 props 默认值为 true，初始化时传入 false 会导致 created,ready 触发, 但 attached 不触发
        // https://developers.weixin.qq.com/community/develop/doc/00066ae2844cc0f8eb883e2a557800
        if (this.$vm) {
          this.$vm._isMounted = true;
          this.$vm.__call_hook('mounted');
          this.$vm.__call_hook('onReady');
        }
      },
      detached: function detached() {
        this.$vm && this.$vm.$destroy();
      }
    },
    pageLifetimes: {
      show: function show(args) {
        this.$vm && this.$vm.__call_hook('onPageShow', args);
      },
      hide: function hide() {
        this.$vm && this.$vm.__call_hook('onPageHide');
      },
      resize: function resize(size) {
        this.$vm && this.$vm.__call_hook('onPageResize', size);
      }
    },
    methods: {
      __l: handleLink,
      __e: handleEvent
    }
  };
  // externalClasses
  if (vueOptions.externalClasses) {
    componentOptions.externalClasses = vueOptions.externalClasses;
  }
  if (Array.isArray(vueOptions.wxsCallMethods)) {
    vueOptions.wxsCallMethods.forEach(function (callMethod) {
      componentOptions.methods[callMethod] = function (args) {
        return this.$vm[callMethod](args);
      };
    });
  }
  if (needVueOptions) {
    return [componentOptions, vueOptions, VueComponent];
  }
  if (isPage) {
    return componentOptions;
  }
  return [componentOptions, VueComponent];
}
function parseComponent(vueComponentOptions, needVueOptions) {
  return parseBaseComponent(vueComponentOptions, {
    isPage: isPage,
    initRelation: initRelation
  }, needVueOptions);
}
var hooks$1 = ['onShow', 'onHide', 'onUnload'];
hooks$1.push.apply(hooks$1, PAGE_EVENT_HOOKS);
function parseBasePage(vuePageOptions) {
  var _parseComponent = parseComponent(vuePageOptions, true),
    _parseComponent2 = (0, _slicedToArray2.default)(_parseComponent, 2),
    pageOptions = _parseComponent2[0],
    vueOptions = _parseComponent2[1];
  initHooks(pageOptions.methods, hooks$1, vueOptions);
  pageOptions.methods.onLoad = function (query) {
    this.options = query;
    var copyQuery = Object.assign({}, query);
    delete copyQuery.__id__;
    this.$page = {
      fullPath: '/' + (this.route || this.is) + stringifyQuery(copyQuery)
    };
    this.$vm.$mp.query = query; // 兼容 mpvue
    this.$vm.__call_hook('onLoad', query);
  };
  {
    initUnknownHooks(pageOptions.methods, vuePageOptions, ['onReady']);
  }
  return pageOptions;
}
function parsePage(vuePageOptions) {
  return parseBasePage(vuePageOptions);
}
function createPage(vuePageOptions) {
  {
    return Component(parsePage(vuePageOptions));
  }
}
function createComponent(vueOptions) {
  {
    return Component(parseComponent(vueOptions));
  }
}
function createSubpackageApp(vm) {
  var appOptions = parseApp(vm);
  var app = getApp({
    allowDefault: true
  });
  vm.$scope = app;
  var globalData = app.globalData;
  if (globalData) {
    Object.keys(appOptions.globalData).forEach(function (name) {
      if (!hasOwn(globalData, name)) {
        globalData[name] = appOptions.globalData[name];
      }
    });
  }
  Object.keys(appOptions).forEach(function (name) {
    if (!hasOwn(app, name)) {
      app[name] = appOptions[name];
    }
  });
  if (isFn(appOptions.onShow) && wx.onAppShow) {
    wx.onAppShow(function () {
      for (var _len5 = arguments.length, args = new Array(_len5), _key5 = 0; _key5 < _len5; _key5++) {
        args[_key5] = arguments[_key5];
      }
      vm.__call_hook('onShow', args);
    });
  }
  if (isFn(appOptions.onHide) && wx.onAppHide) {
    wx.onAppHide(function () {
      for (var _len6 = arguments.length, args = new Array(_len6), _key6 = 0; _key6 < _len6; _key6++) {
        args[_key6] = arguments[_key6];
      }
      vm.__call_hook('onHide', args);
    });
  }
  if (isFn(appOptions.onLaunch)) {
    var args = wx.getLaunchOptionsSync && wx.getLaunchOptionsSync();
    vm.__call_hook('onLaunch', args);
  }
  return vm;
}
function createPlugin(vm) {
  var appOptions = parseApp(vm);
  if (isFn(appOptions.onShow) && wx.onAppShow) {
    wx.onAppShow(function () {
      for (var _len7 = arguments.length, args = new Array(_len7), _key7 = 0; _key7 < _len7; _key7++) {
        args[_key7] = arguments[_key7];
      }
      vm.__call_hook('onShow', args);
    });
  }
  if (isFn(appOptions.onHide) && wx.onAppHide) {
    wx.onAppHide(function () {
      for (var _len8 = arguments.length, args = new Array(_len8), _key8 = 0; _key8 < _len8; _key8++) {
        args[_key8] = arguments[_key8];
      }
      vm.__call_hook('onHide', args);
    });
  }
  if (isFn(appOptions.onLaunch)) {
    var args = wx.getLaunchOptionsSync && wx.getLaunchOptionsSync();
    vm.__call_hook('onLaunch', args);
  }
  return vm;
}
todos.forEach(function (todoApi) {
  protocols[todoApi] = false;
});
canIUses.forEach(function (canIUseApi) {
  var apiName = protocols[canIUseApi] && protocols[canIUseApi].name ? protocols[canIUseApi].name : canIUseApi;
  if (!wx.canIUse(apiName)) {
    protocols[canIUseApi] = false;
  }
});
var uni = {};
if (typeof Proxy !== 'undefined' && "mp-weixin" !== 'app-plus') {
  uni = new Proxy({}, {
    get: function get(target, name) {
      if (hasOwn(target, name)) {
        return target[name];
      }
      if (baseApi[name]) {
        return baseApi[name];
      }
      if (api[name]) {
        return promisify(name, api[name]);
      }
      {
        if (extraApi[name]) {
          return promisify(name, extraApi[name]);
        }
        if (todoApis[name]) {
          return promisify(name, todoApis[name]);
        }
      }
      if (eventApi[name]) {
        return eventApi[name];
      }
      if (typeof wx[name] !== 'function' && !hasOwn(protocols, name)) {
        return;
      }
      return promisify(name, wrapper(name, wx[name]));
    },
    set: function set(target, name, value) {
      target[name] = value;
      return true;
    }
  });
} else {
  Object.keys(baseApi).forEach(function (name) {
    uni[name] = baseApi[name];
  });
  {
    Object.keys(todoApis).forEach(function (name) {
      uni[name] = promisify(name, todoApis[name]);
    });
    Object.keys(extraApi).forEach(function (name) {
      uni[name] = promisify(name, todoApis[name]);
    });
  }
  Object.keys(eventApi).forEach(function (name) {
    uni[name] = eventApi[name];
  });
  Object.keys(api).forEach(function (name) {
    uni[name] = promisify(name, api[name]);
  });
  Object.keys(wx).forEach(function (name) {
    if (hasOwn(wx, name) || hasOwn(protocols, name)) {
      uni[name] = promisify(name, wrapper(name, wx[name]));
    }
  });
}
wx.createApp = createApp;
wx.createPage = createPage;
wx.createComponent = createComponent;
wx.createSubpackageApp = createSubpackageApp;
wx.createPlugin = createPlugin;
var uni$1 = uni;
var _default = uni$1;
exports.default = _default;
/* WEBPACK VAR INJECTION */}.call(this, __webpack_require__(/*! ./../../../webpack/buildin/global.js */ 2)))

/***/ }),

/***/ 10:
/*!***************************************************************!*\
  !*** ./node_modules/@babel/runtime/helpers/defineProperty.js ***!
  \***************************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

var toPropertyKey = __webpack_require__(/*! ./toPropertyKey.js */ 11);
function _defineProperty(obj, key, value) {
  key = toPropertyKey(key);
  if (key in obj) {
    Object.defineProperty(obj, key, {
      value: value,
      enumerable: true,
      configurable: true,
      writable: true
    });
  } else {
    obj[key] = value;
  }
  return obj;
}
module.exports = _defineProperty, module.exports.__esModule = true, module.exports["default"] = module.exports;

/***/ }),

/***/ 102:
/*!***************************************************************!*\
  !*** D:/project/前端/front/front/static/pay-confirm/weixin.png ***!
  \***************************************************************/
/*! no static exports found */
/***/ (function(module, exports) {

module.exports = "data:image/png;base64,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"

/***/ }),

/***/ 103:
/*!*****************************************************************!*\
  !*** D:/project/前端/front/front/static/pay-confirm/zhifubao.png ***!
  \*****************************************************************/
/*! no static exports found */
/***/ (function(module, exports) {

module.exports = "data:image/png;base64,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"

/***/ }),

/***/ 104:
/*!****************************************************************!*\
  !*** D:/project/前端/front/front/static/pay-confirm/jianshe.png ***!
  \****************************************************************/
/*! no static exports found */
/***/ (function(module, exports) {

module.exports = "data:image/png;base64,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"

/***/ }),

/***/ 105:
/*!***************************************************************!*\
  !*** D:/project/前端/front/front/static/pay-confirm/nongye.png ***!
  \***************************************************************/
/*! no static exports found */
/***/ (function(module, exports) {

module.exports = "data:image/png;base64,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"

/***/ }),

/***/ 106:
/*!*****************************************************************!*\
  !*** D:/project/前端/front/front/static/pay-confirm/zhongguo.png ***!
  \*****************************************************************/
/*! no static exports found */
/***/ (function(module, exports) {

module.exports = "data:image/png;base64,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"

/***/ }),

/***/ 107:
/*!*****************************************************************!*\
  !*** D:/project/前端/front/front/static/pay-confirm/jiaotong.png ***!
  \*****************************************************************/
/*! no static exports found */
/***/ (function(module, exports) {

module.exports = "data:image/png;base64,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"

/***/ }),

/***/ 11:
/*!**************************************************************!*\
  !*** ./node_modules/@babel/runtime/helpers/toPropertyKey.js ***!
  \**************************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

var _typeof = __webpack_require__(/*! ./typeof.js */ 12)["default"];
var toPrimitive = __webpack_require__(/*! ./toPrimitive.js */ 13);
function _toPropertyKey(arg) {
  var key = toPrimitive(arg, "string");
  return _typeof(key) === "symbol" ? key : String(key);
}
module.exports = _toPropertyKey, module.exports.__esModule = true, module.exports["default"] = module.exports;

/***/ }),

/***/ 12:
/*!*******************************************************!*\
  !*** ./node_modules/@babel/runtime/helpers/typeof.js ***!
  \*******************************************************/
/*! no static exports found */
/***/ (function(module, exports) {

function _typeof(obj) {
  "@babel/helpers - typeof";

  return (module.exports = _typeof = "function" == typeof Symbol && "symbol" == typeof Symbol.iterator ? function (obj) {
    return typeof obj;
  } : function (obj) {
    return obj && "function" == typeof Symbol && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj;
  }, module.exports.__esModule = true, module.exports["default"] = module.exports), _typeof(obj);
}
module.exports = _typeof, module.exports.__esModule = true, module.exports["default"] = module.exports;

/***/ }),

/***/ 13:
/*!************************************************************!*\
  !*** ./node_modules/@babel/runtime/helpers/toPrimitive.js ***!
  \************************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

var _typeof = __webpack_require__(/*! ./typeof.js */ 12)["default"];
function _toPrimitive(input, hint) {
  if (_typeof(input) !== "object" || input === null) return input;
  var prim = input[Symbol.toPrimitive];
  if (prim !== undefined) {
    var res = prim.call(input, hint || "default");
    if (_typeof(res) !== "object") return res;
    throw new TypeError("@@toPrimitive must return a primitive value.");
  }
  return (hint === "string" ? String : Number)(input);
}
module.exports = _toPrimitive, module.exports.__esModule = true, module.exports["default"] = module.exports;

/***/ }),

/***/ 14:
/*!**********************************************************!*\
  !*** ./node_modules/@babel/runtime/helpers/construct.js ***!
  \**********************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

var setPrototypeOf = __webpack_require__(/*! ./setPrototypeOf.js */ 15);
var isNativeReflectConstruct = __webpack_require__(/*! ./isNativeReflectConstruct.js */ 16);
function _construct(Parent, args, Class) {
  if (isNativeReflectConstruct()) {
    module.exports = _construct = Reflect.construct.bind(), module.exports.__esModule = true, module.exports["default"] = module.exports;
  } else {
    module.exports = _construct = function _construct(Parent, args, Class) {
      var a = [null];
      a.push.apply(a, args);
      var Constructor = Function.bind.apply(Parent, a);
      var instance = new Constructor();
      if (Class) setPrototypeOf(instance, Class.prototype);
      return instance;
    }, module.exports.__esModule = true, module.exports["default"] = module.exports;
  }
  return _construct.apply(null, arguments);
}
module.exports = _construct, module.exports.__esModule = true, module.exports["default"] = module.exports;

/***/ }),

/***/ 15:
/*!***************************************************************!*\
  !*** ./node_modules/@babel/runtime/helpers/setPrototypeOf.js ***!
  \***************************************************************/
/*! no static exports found */
/***/ (function(module, exports) {

function _setPrototypeOf(o, p) {
  module.exports = _setPrototypeOf = Object.setPrototypeOf ? Object.setPrototypeOf.bind() : function _setPrototypeOf(o, p) {
    o.__proto__ = p;
    return o;
  }, module.exports.__esModule = true, module.exports["default"] = module.exports;
  return _setPrototypeOf(o, p);
}
module.exports = _setPrototypeOf, module.exports.__esModule = true, module.exports["default"] = module.exports;

/***/ }),

/***/ 16:
/*!*************************************************************************!*\
  !*** ./node_modules/@babel/runtime/helpers/isNativeReflectConstruct.js ***!
  \*************************************************************************/
/*! no static exports found */
/***/ (function(module, exports) {

function _isNativeReflectConstruct() {
  if (typeof Reflect === "undefined" || !Reflect.construct) return false;
  if (Reflect.construct.sham) return false;
  if (typeof Proxy === "function") return true;
  try {
    Boolean.prototype.valueOf.call(Reflect.construct(Boolean, [], function () {}));
    return true;
  } catch (e) {
    return false;
  }
}
module.exports = _isNativeReflectConstruct, module.exports.__esModule = true, module.exports["default"] = module.exports;

/***/ }),

/***/ 17:
/*!******************************************************************!*\
  !*** ./node_modules/@babel/runtime/helpers/toConsumableArray.js ***!
  \******************************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

var arrayWithoutHoles = __webpack_require__(/*! ./arrayWithoutHoles.js */ 18);
var iterableToArray = __webpack_require__(/*! ./iterableToArray.js */ 19);
var unsupportedIterableToArray = __webpack_require__(/*! ./unsupportedIterableToArray.js */ 7);
var nonIterableSpread = __webpack_require__(/*! ./nonIterableSpread.js */ 20);
function _toConsumableArray(arr) {
  return arrayWithoutHoles(arr) || iterableToArray(arr) || unsupportedIterableToArray(arr) || nonIterableSpread();
}
module.exports = _toConsumableArray, module.exports.__esModule = true, module.exports["default"] = module.exports;

/***/ }),

/***/ 18:
/*!******************************************************************!*\
  !*** ./node_modules/@babel/runtime/helpers/arrayWithoutHoles.js ***!
  \******************************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

var arrayLikeToArray = __webpack_require__(/*! ./arrayLikeToArray.js */ 8);
function _arrayWithoutHoles(arr) {
  if (Array.isArray(arr)) return arrayLikeToArray(arr);
}
module.exports = _arrayWithoutHoles, module.exports.__esModule = true, module.exports["default"] = module.exports;

/***/ }),

/***/ 19:
/*!****************************************************************!*\
  !*** ./node_modules/@babel/runtime/helpers/iterableToArray.js ***!
  \****************************************************************/
/*! no static exports found */
/***/ (function(module, exports) {

function _iterableToArray(iter) {
  if (typeof Symbol !== "undefined" && iter[Symbol.iterator] != null || iter["@@iterator"] != null) return Array.from(iter);
}
module.exports = _iterableToArray, module.exports.__esModule = true, module.exports["default"] = module.exports;

/***/ }),

/***/ 2:
/*!***********************************!*\
  !*** (webpack)/buildin/global.js ***!
  \***********************************/
/*! no static exports found */
/***/ (function(module, exports) {

var g;

// This works in non-strict mode
g = (function() {
	return this;
})();

try {
	// This works if eval is allowed (see CSP)
	g = g || new Function("return this")();
} catch (e) {
	// This works if the window reference is available
	if (typeof window === "object") g = window;
}

// g can still be undefined, but nothing to do about it...
// We return undefined, instead of nothing here, so it's
// easier to handle this case. if(!global) { ...}

module.exports = g;


/***/ }),

/***/ 20:
/*!******************************************************************!*\
  !*** ./node_modules/@babel/runtime/helpers/nonIterableSpread.js ***!
  \******************************************************************/
/*! no static exports found */
/***/ (function(module, exports) {

function _nonIterableSpread() {
  throw new TypeError("Invalid attempt to spread non-iterable instance.\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method.");
}
module.exports = _nonIterableSpread, module.exports.__esModule = true, module.exports["default"] = module.exports;

/***/ }),

/***/ 21:
/*!*************************************************************!*\
  !*** ./node_modules/@dcloudio/uni-i18n/dist/uni-i18n.es.js ***!
  \*************************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";
/* WEBPACK VAR INJECTION */(function(uni, global) {

var _interopRequireDefault = __webpack_require__(/*! @babel/runtime/helpers/interopRequireDefault */ 3);
Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.LOCALE_ZH_HANT = exports.LOCALE_ZH_HANS = exports.LOCALE_FR = exports.LOCALE_ES = exports.LOCALE_EN = exports.I18n = exports.Formatter = void 0;
exports.compileI18nJsonStr = compileI18nJsonStr;
exports.hasI18nJson = hasI18nJson;
exports.initVueI18n = initVueI18n;
exports.isI18nStr = isI18nStr;
exports.isString = void 0;
exports.normalizeLocale = normalizeLocale;
exports.parseI18nJson = parseI18nJson;
exports.resolveLocale = resolveLocale;
var _slicedToArray2 = _interopRequireDefault(__webpack_require__(/*! @babel/runtime/helpers/slicedToArray */ 4));
var _classCallCheck2 = _interopRequireDefault(__webpack_require__(/*! @babel/runtime/helpers/classCallCheck */ 22));
var _createClass2 = _interopRequireDefault(__webpack_require__(/*! @babel/runtime/helpers/createClass */ 23));
var _typeof2 = _interopRequireDefault(__webpack_require__(/*! @babel/runtime/helpers/typeof */ 12));
var isArray = Array.isArray;
var isObject = function isObject(val) {
  return val !== null && (0, _typeof2.default)(val) === 'object';
};
var defaultDelimiters = ['{', '}'];
var BaseFormatter = /*#__PURE__*/function () {
  function BaseFormatter() {
    (0, _classCallCheck2.default)(this, BaseFormatter);
    this._caches = Object.create(null);
  }
  (0, _createClass2.default)(BaseFormatter, [{
    key: "interpolate",
    value: function interpolate(message, values) {
      var delimiters = arguments.length > 2 && arguments[2] !== undefined ? arguments[2] : defaultDelimiters;
      if (!values) {
        return [message];
      }
      var tokens = this._caches[message];
      if (!tokens) {
        tokens = parse(message, delimiters);
        this._caches[message] = tokens;
      }
      return compile(tokens, values);
    }
  }]);
  return BaseFormatter;
}();
exports.Formatter = BaseFormatter;
var RE_TOKEN_LIST_VALUE = /^(?:\d)+/;
var RE_TOKEN_NAMED_VALUE = /^(?:\w)+/;
function parse(format, _ref) {
  var _ref2 = (0, _slicedToArray2.default)(_ref, 2),
    startDelimiter = _ref2[0],
    endDelimiter = _ref2[1];
  var tokens = [];
  var position = 0;
  var text = '';
  while (position < format.length) {
    var char = format[position++];
    if (char === startDelimiter) {
      if (text) {
        tokens.push({
          type: 'text',
          value: text
        });
      }
      text = '';
      var sub = '';
      char = format[position++];
      while (char !== undefined && char !== endDelimiter) {
        sub += char;
        char = format[position++];
      }
      var isClosed = char === endDelimiter;
      var type = RE_TOKEN_LIST_VALUE.test(sub) ? 'list' : isClosed && RE_TOKEN_NAMED_VALUE.test(sub) ? 'named' : 'unknown';
      tokens.push({
        value: sub,
        type: type
      });
    }
    //  else if (char === '%') {
    //   // when found rails i18n syntax, skip text capture
    //   if (format[position] !== '{') {
    //     text += char
    //   }
    // }
    else {
      text += char;
    }
  }
  text && tokens.push({
    type: 'text',
    value: text
  });
  return tokens;
}
function compile(tokens, values) {
  var compiled = [];
  var index = 0;
  var mode = isArray(values) ? 'list' : isObject(values) ? 'named' : 'unknown';
  if (mode === 'unknown') {
    return compiled;
  }
  while (index < tokens.length) {
    var token = tokens[index];
    switch (token.type) {
      case 'text':
        compiled.push(token.value);
        break;
      case 'list':
        compiled.push(values[parseInt(token.value, 10)]);
        break;
      case 'named':
        if (mode === 'named') {
          compiled.push(values[token.value]);
        } else {
          if (true) {
            console.warn("Type of token '".concat(token.type, "' and format of value '").concat(mode, "' don't match!"));
          }
        }
        break;
      case 'unknown':
        if (true) {
          console.warn("Detect 'unknown' type of token!");
        }
        break;
    }
    index++;
  }
  return compiled;
}
var LOCALE_ZH_HANS = 'zh-Hans';
exports.LOCALE_ZH_HANS = LOCALE_ZH_HANS;
var LOCALE_ZH_HANT = 'zh-Hant';
exports.LOCALE_ZH_HANT = LOCALE_ZH_HANT;
var LOCALE_EN = 'en';
exports.LOCALE_EN = LOCALE_EN;
var LOCALE_FR = 'fr';
exports.LOCALE_FR = LOCALE_FR;
var LOCALE_ES = 'es';
exports.LOCALE_ES = LOCALE_ES;
var hasOwnProperty = Object.prototype.hasOwnProperty;
var hasOwn = function hasOwn(val, key) {
  return hasOwnProperty.call(val, key);
};
var defaultFormatter = new BaseFormatter();
function include(str, parts) {
  return !!parts.find(function (part) {
    return str.indexOf(part) !== -1;
  });
}
function startsWith(str, parts) {
  return parts.find(function (part) {
    return str.indexOf(part) === 0;
  });
}
function normalizeLocale(locale, messages) {
  if (!locale) {
    return;
  }
  locale = locale.trim().replace(/_/g, '-');
  if (messages && messages[locale]) {
    return locale;
  }
  locale = locale.toLowerCase();
  if (locale.indexOf('zh') === 0) {
    if (locale.indexOf('-hans') > -1) {
      return LOCALE_ZH_HANS;
    }
    if (locale.indexOf('-hant') > -1) {
      return LOCALE_ZH_HANT;
    }
    if (include(locale, ['-tw', '-hk', '-mo', '-cht'])) {
      return LOCALE_ZH_HANT;
    }
    return LOCALE_ZH_HANS;
  }
  var lang = startsWith(locale, [LOCALE_EN, LOCALE_FR, LOCALE_ES]);
  if (lang) {
    return lang;
  }
}
var I18n = /*#__PURE__*/function () {
  function I18n(_ref3) {
    var locale = _ref3.locale,
      fallbackLocale = _ref3.fallbackLocale,
      messages = _ref3.messages,
      watcher = _ref3.watcher,
      formater = _ref3.formater;
    (0, _classCallCheck2.default)(this, I18n);
    this.locale = LOCALE_EN;
    this.fallbackLocale = LOCALE_EN;
    this.message = {};
    this.messages = {};
    this.watchers = [];
    if (fallbackLocale) {
      this.fallbackLocale = fallbackLocale;
    }
    this.formater = formater || defaultFormatter;
    this.messages = messages || {};
    this.setLocale(locale || LOCALE_EN);
    if (watcher) {
      this.watchLocale(watcher);
    }
  }
  (0, _createClass2.default)(I18n, [{
    key: "setLocale",
    value: function setLocale(locale) {
      var _this = this;
      var oldLocale = this.locale;
      this.locale = normalizeLocale(locale, this.messages) || this.fallbackLocale;
      if (!this.messages[this.locale]) {
        // 可能初始化时不存在
        this.messages[this.locale] = {};
      }
      this.message = this.messages[this.locale];
      // 仅发生变化时，通知
      if (oldLocale !== this.locale) {
        this.watchers.forEach(function (watcher) {
          watcher(_this.locale, oldLocale);
        });
      }
    }
  }, {
    key: "getLocale",
    value: function getLocale() {
      return this.locale;
    }
  }, {
    key: "watchLocale",
    value: function watchLocale(fn) {
      var _this2 = this;
      var index = this.watchers.push(fn) - 1;
      return function () {
        _this2.watchers.splice(index, 1);
      };
    }
  }, {
    key: "add",
    value: function add(locale, message) {
      var override = arguments.length > 2 && arguments[2] !== undefined ? arguments[2] : true;
      var curMessages = this.messages[locale];
      if (curMessages) {
        if (override) {
          Object.assign(curMessages, message);
        } else {
          Object.keys(message).forEach(function (key) {
            if (!hasOwn(curMessages, key)) {
              curMessages[key] = message[key];
            }
          });
        }
      } else {
        this.messages[locale] = message;
      }
    }
  }, {
    key: "f",
    value: function f(message, values, delimiters) {
      return this.formater.interpolate(message, values, delimiters).join('');
    }
  }, {
    key: "t",
    value: function t(key, locale, values) {
      var message = this.message;
      if (typeof locale === 'string') {
        locale = normalizeLocale(locale, this.messages);
        locale && (message = this.messages[locale]);
      } else {
        values = locale;
      }
      if (!hasOwn(message, key)) {
        console.warn("Cannot translate the value of keypath ".concat(key, ". Use the value of keypath as default."));
        return key;
      }
      return this.formater.interpolate(message[key], values).join('');
    }
  }]);
  return I18n;
}();
exports.I18n = I18n;
function watchAppLocale(appVm, i18n) {
  // 需要保证 watch 的触发在组件渲染之前
  if (appVm.$watchLocale) {
    // vue2
    appVm.$watchLocale(function (newLocale) {
      i18n.setLocale(newLocale);
    });
  } else {
    appVm.$watch(function () {
      return appVm.$locale;
    }, function (newLocale) {
      i18n.setLocale(newLocale);
    });
  }
}
function getDefaultLocale() {
  if (typeof uni !== 'undefined' && uni.getLocale) {
    return uni.getLocale();
  }
  // 小程序平台，uni 和 uni-i18n 互相引用，导致访问不到 uni，故在 global 上挂了 getLocale
  if (typeof global !== 'undefined' && global.getLocale) {
    return global.getLocale();
  }
  return LOCALE_EN;
}
function initVueI18n(locale) {
  var messages = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : {};
  var fallbackLocale = arguments.length > 2 ? arguments[2] : undefined;
  var watcher = arguments.length > 3 ? arguments[3] : undefined;
  // 兼容旧版本入参
  if (typeof locale !== 'string') {
    var _ref4 = [messages, locale];
    locale = _ref4[0];
    messages = _ref4[1];
  }
  if (typeof locale !== 'string') {
    // 因为小程序平台，uni-i18n 和 uni 互相引用，导致此时访问 uni 时，为 undefined
    locale = getDefaultLocale();
  }
  if (typeof fallbackLocale !== 'string') {
    fallbackLocale = typeof __uniConfig !== 'undefined' && __uniConfig.fallbackLocale || LOCALE_EN;
  }
  var i18n = new I18n({
    locale: locale,
    fallbackLocale: fallbackLocale,
    messages: messages,
    watcher: watcher
  });
  var _t = function t(key, values) {
    if (typeof getApp !== 'function') {
      // app view
      /* eslint-disable no-func-assign */
      _t = function t(key, values) {
        return i18n.t(key, values);
      };
    } else {
      var isWatchedAppLocale = false;
      _t = function t(key, values) {
        var appVm = getApp().$vm;
        // 可能$vm还不存在，比如在支付宝小程序中，组件定义较早，在props的default里使用了t()函数（如uni-goods-nav），此时app还未初始化
        // options: {
        // 	type: Array,
        // 	default () {
        // 		return [{
        // 			icon: 'shop',
        // 			text: t("uni-goods-nav.options.shop"),
        // 		}, {
        // 			icon: 'cart',
        // 			text: t("uni-goods-nav.options.cart")
        // 		}]
        // 	}
        // },
        if (appVm) {
          // 触发响应式
          appVm.$locale;
          if (!isWatchedAppLocale) {
            isWatchedAppLocale = true;
            watchAppLocale(appVm, i18n);
          }
        }
        return i18n.t(key, values);
      };
    }
    return _t(key, values);
  };
  return {
    i18n: i18n,
    f: function f(message, values, delimiters) {
      return i18n.f(message, values, delimiters);
    },
    t: function t(key, values) {
      return _t(key, values);
    },
    add: function add(locale, message) {
      var override = arguments.length > 2 && arguments[2] !== undefined ? arguments[2] : true;
      return i18n.add(locale, message, override);
    },
    watch: function watch(fn) {
      return i18n.watchLocale(fn);
    },
    getLocale: function getLocale() {
      return i18n.getLocale();
    },
    setLocale: function setLocale(newLocale) {
      return i18n.setLocale(newLocale);
    }
  };
}
var isString = function isString(val) {
  return typeof val === 'string';
};
exports.isString = isString;
var formater;
function hasI18nJson(jsonObj, delimiters) {
  if (!formater) {
    formater = new BaseFormatter();
  }
  return walkJsonObj(jsonObj, function (jsonObj, key) {
    var value = jsonObj[key];
    if (isString(value)) {
      if (isI18nStr(value, delimiters)) {
        return true;
      }
    } else {
      return hasI18nJson(value, delimiters);
    }
  });
}
function parseI18nJson(jsonObj, values, delimiters) {
  if (!formater) {
    formater = new BaseFormatter();
  }
  walkJsonObj(jsonObj, function (jsonObj, key) {
    var value = jsonObj[key];
    if (isString(value)) {
      if (isI18nStr(value, delimiters)) {
        jsonObj[key] = compileStr(value, values, delimiters);
      }
    } else {
      parseI18nJson(value, values, delimiters);
    }
  });
  return jsonObj;
}
function compileI18nJsonStr(jsonStr, _ref5) {
  var locale = _ref5.locale,
    locales = _ref5.locales,
    delimiters = _ref5.delimiters;
  if (!isI18nStr(jsonStr, delimiters)) {
    return jsonStr;
  }
  if (!formater) {
    formater = new BaseFormatter();
  }
  var localeValues = [];
  Object.keys(locales).forEach(function (name) {
    if (name !== locale) {
      localeValues.push({
        locale: name,
        values: locales[name]
      });
    }
  });
  localeValues.unshift({
    locale: locale,
    values: locales[locale]
  });
  try {
    return JSON.stringify(compileJsonObj(JSON.parse(jsonStr), localeValues, delimiters), null, 2);
  } catch (e) {}
  return jsonStr;
}
function isI18nStr(value, delimiters) {
  return value.indexOf(delimiters[0]) > -1;
}
function compileStr(value, values, delimiters) {
  return formater.interpolate(value, values, delimiters).join('');
}
function compileValue(jsonObj, key, localeValues, delimiters) {
  var value = jsonObj[key];
  if (isString(value)) {
    // 存在国际化
    if (isI18nStr(value, delimiters)) {
      jsonObj[key] = compileStr(value, localeValues[0].values, delimiters);
      if (localeValues.length > 1) {
        // 格式化国际化语言
        var valueLocales = jsonObj[key + 'Locales'] = {};
        localeValues.forEach(function (localValue) {
          valueLocales[localValue.locale] = compileStr(value, localValue.values, delimiters);
        });
      }
    }
  } else {
    compileJsonObj(value, localeValues, delimiters);
  }
}
function compileJsonObj(jsonObj, localeValues, delimiters) {
  walkJsonObj(jsonObj, function (jsonObj, key) {
    compileValue(jsonObj, key, localeValues, delimiters);
  });
  return jsonObj;
}
function walkJsonObj(jsonObj, walk) {
  if (isArray(jsonObj)) {
    for (var i = 0; i < jsonObj.length; i++) {
      if (walk(jsonObj, i)) {
        return true;
      }
    }
  } else if (isObject(jsonObj)) {
    for (var key in jsonObj) {
      if (walk(jsonObj, key)) {
        return true;
      }
    }
  }
  return false;
}
function resolveLocale(locales) {
  return function (locale) {
    if (!locale) {
      return locale;
    }
    locale = normalizeLocale(locale) || locale;
    return resolveLocaleChain(locale).find(function (locale) {
      return locales.indexOf(locale) > -1;
    });
  };
}
function resolveLocaleChain(locale) {
  var chain = [];
  var tokens = locale.split('-');
  while (tokens.length) {
    chain.push(tokens.join('-'));
    tokens.pop();
  }
  return chain;
}
/* WEBPACK VAR INJECTION */}.call(this, __webpack_require__(/*! ./node_modules/@dcloudio/uni-mp-weixin/dist/index.js */ 1)["default"], __webpack_require__(/*! ./../../../webpack/buildin/global.js */ 2)))

/***/ }),

/***/ 22:
/*!***************************************************************!*\
  !*** ./node_modules/@babel/runtime/helpers/classCallCheck.js ***!
  \***************************************************************/
/*! no static exports found */
/***/ (function(module, exports) {

function _classCallCheck(instance, Constructor) {
  if (!(instance instanceof Constructor)) {
    throw new TypeError("Cannot call a class as a function");
  }
}
module.exports = _classCallCheck, module.exports.__esModule = true, module.exports["default"] = module.exports;

/***/ }),

/***/ 23:
/*!************************************************************!*\
  !*** ./node_modules/@babel/runtime/helpers/createClass.js ***!
  \************************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

var toPropertyKey = __webpack_require__(/*! ./toPropertyKey.js */ 11);
function _defineProperties(target, props) {
  for (var i = 0; i < props.length; i++) {
    var descriptor = props[i];
    descriptor.enumerable = descriptor.enumerable || false;
    descriptor.configurable = true;
    if ("value" in descriptor) descriptor.writable = true;
    Object.defineProperty(target, toPropertyKey(descriptor.key), descriptor);
  }
}
function _createClass(Constructor, protoProps, staticProps) {
  if (protoProps) _defineProperties(Constructor.prototype, protoProps);
  if (staticProps) _defineProperties(Constructor, staticProps);
  Object.defineProperty(Constructor, "prototype", {
    writable: false
  });
  return Constructor;
}
module.exports = _createClass, module.exports.__esModule = true, module.exports["default"] = module.exports;

/***/ }),

/***/ 24:
/*!******************************************************************************************!*\
  !*** ./node_modules/@dcloudio/vue-cli-plugin-uni/packages/mp-vue/dist/mp.runtime.esm.js ***!
  \******************************************************************************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* WEBPACK VAR INJECTION */(function(global) {/*!
 * Vue.js v2.6.11
 * (c) 2014-2022 Evan You
 * Released under the MIT License.
 */
/*  */

var emptyObject = Object.freeze({});

// These helpers produce better VM code in JS engines due to their
// explicitness and function inlining.
function isUndef (v) {
  return v === undefined || v === null
}

function isDef (v) {
  return v !== undefined && v !== null
}

function isTrue (v) {
  return v === true
}

function isFalse (v) {
  return v === false
}

/**
 * Check if value is primitive.
 */
function isPrimitive (value) {
  return (
    typeof value === 'string' ||
    typeof value === 'number' ||
    // $flow-disable-line
    typeof value === 'symbol' ||
    typeof value === 'boolean'
  )
}

/**
 * Quick object check - this is primarily used to tell
 * Objects from primitive values when we know the value
 * is a JSON-compliant type.
 */
function isObject (obj) {
  return obj !== null && typeof obj === 'object'
}

/**
 * Get the raw type string of a value, e.g., [object Object].
 */
var _toString = Object.prototype.toString;

function toRawType (value) {
  return _toString.call(value).slice(8, -1)
}

/**
 * Strict object type check. Only returns true
 * for plain JavaScript objects.
 */
function isPlainObject (obj) {
  return _toString.call(obj) === '[object Object]'
}

function isRegExp (v) {
  return _toString.call(v) === '[object RegExp]'
}

/**
 * Check if val is a valid array index.
 */
function isValidArrayIndex (val) {
  var n = parseFloat(String(val));
  return n >= 0 && Math.floor(n) === n && isFinite(val)
}

function isPromise (val) {
  return (
    isDef(val) &&
    typeof val.then === 'function' &&
    typeof val.catch === 'function'
  )
}

/**
 * Convert a value to a string that is actually rendered.
 */
function toString (val) {
  return val == null
    ? ''
    : Array.isArray(val) || (isPlainObject(val) && val.toString === _toString)
      ? JSON.stringify(val, null, 2)
      : String(val)
}

/**
 * Convert an input value to a number for persistence.
 * If the conversion fails, return original string.
 */
function toNumber (val) {
  var n = parseFloat(val);
  return isNaN(n) ? val : n
}

/**
 * Make a map and return a function for checking if a key
 * is in that map.
 */
function makeMap (
  str,
  expectsLowerCase
) {
  var map = Object.create(null);
  var list = str.split(',');
  for (var i = 0; i < list.length; i++) {
    map[list[i]] = true;
  }
  return expectsLowerCase
    ? function (val) { return map[val.toLowerCase()]; }
    : function (val) { return map[val]; }
}

/**
 * Check if a tag is a built-in tag.
 */
var isBuiltInTag = makeMap('slot,component', true);

/**
 * Check if an attribute is a reserved attribute.
 */
var isReservedAttribute = makeMap('key,ref,slot,slot-scope,is');

/**
 * Remove an item from an array.
 */
function remove (arr, item) {
  if (arr.length) {
    var index = arr.indexOf(item);
    if (index > -1) {
      return arr.splice(index, 1)
    }
  }
}

/**
 * Check whether an object has the property.
 */
var hasOwnProperty = Object.prototype.hasOwnProperty;
function hasOwn (obj, key) {
  return hasOwnProperty.call(obj, key)
}

/**
 * Create a cached version of a pure function.
 */
function cached (fn) {
  var cache = Object.create(null);
  return (function cachedFn (str) {
    var hit = cache[str];
    return hit || (cache[str] = fn(str))
  })
}

/**
 * Camelize a hyphen-delimited string.
 */
var camelizeRE = /-(\w)/g;
var camelize = cached(function (str) {
  return str.replace(camelizeRE, function (_, c) { return c ? c.toUpperCase() : ''; })
});

/**
 * Capitalize a string.
 */
var capitalize = cached(function (str) {
  return str.charAt(0).toUpperCase() + str.slice(1)
});

/**
 * Hyphenate a camelCase string.
 */
var hyphenateRE = /\B([A-Z])/g;
var hyphenate = cached(function (str) {
  return str.replace(hyphenateRE, '-$1').toLowerCase()
});

/**
 * Simple bind polyfill for environments that do not support it,
 * e.g., PhantomJS 1.x. Technically, we don't need this anymore
 * since native bind is now performant enough in most browsers.
 * But removing it would mean breaking code that was able to run in
 * PhantomJS 1.x, so this must be kept for backward compatibility.
 */

/* istanbul ignore next */
function polyfillBind (fn, ctx) {
  function boundFn (a) {
    var l = arguments.length;
    return l
      ? l > 1
        ? fn.apply(ctx, arguments)
        : fn.call(ctx, a)
      : fn.call(ctx)
  }

  boundFn._length = fn.length;
  return boundFn
}

function nativeBind (fn, ctx) {
  return fn.bind(ctx)
}

var bind = Function.prototype.bind
  ? nativeBind
  : polyfillBind;

/**
 * Convert an Array-like object to a real Array.
 */
function toArray (list, start) {
  start = start || 0;
  var i = list.length - start;
  var ret = new Array(i);
  while (i--) {
    ret[i] = list[i + start];
  }
  return ret
}

/**
 * Mix properties into target object.
 */
function extend (to, _from) {
  for (var key in _from) {
    to[key] = _from[key];
  }
  return to
}

/**
 * Merge an Array of Objects into a single Object.
 */
function toObject (arr) {
  var res = {};
  for (var i = 0; i < arr.length; i++) {
    if (arr[i]) {
      extend(res, arr[i]);
    }
  }
  return res
}

/* eslint-disable no-unused-vars */

/**
 * Perform no operation.
 * Stubbing args to make Flow happy without leaving useless transpiled code
 * with ...rest (https://flow.org/blog/2017/05/07/Strict-Function-Call-Arity/).
 */
function noop (a, b, c) {}

/**
 * Always return false.
 */
var no = function (a, b, c) { return false; };

/* eslint-enable no-unused-vars */

/**
 * Return the same value.
 */
var identity = function (_) { return _; };

/**
 * Check if two values are loosely equal - that is,
 * if they are plain objects, do they have the same shape?
 */
function looseEqual (a, b) {
  if (a === b) { return true }
  var isObjectA = isObject(a);
  var isObjectB = isObject(b);
  if (isObjectA && isObjectB) {
    try {
      var isArrayA = Array.isArray(a);
      var isArrayB = Array.isArray(b);
      if (isArrayA && isArrayB) {
        return a.length === b.length && a.every(function (e, i) {
          return looseEqual(e, b[i])
        })
      } else if (a instanceof Date && b instanceof Date) {
        return a.getTime() === b.getTime()
      } else if (!isArrayA && !isArrayB) {
        var keysA = Object.keys(a);
        var keysB = Object.keys(b);
        return keysA.length === keysB.length && keysA.every(function (key) {
          return looseEqual(a[key], b[key])
        })
      } else {
        /* istanbul ignore next */
        return false
      }
    } catch (e) {
      /* istanbul ignore next */
      return false
    }
  } else if (!isObjectA && !isObjectB) {
    return String(a) === String(b)
  } else {
    return false
  }
}

/**
 * Return the first index at which a loosely equal value can be
 * found in the array (if value is a plain object, the array must
 * contain an object of the same shape), or -1 if it is not present.
 */
function looseIndexOf (arr, val) {
  for (var i = 0; i < arr.length; i++) {
    if (looseEqual(arr[i], val)) { return i }
  }
  return -1
}

/**
 * Ensure a function is called only once.
 */
function once (fn) {
  var called = false;
  return function () {
    if (!called) {
      called = true;
      fn.apply(this, arguments);
    }
  }
}

var ASSET_TYPES = [
  'component',
  'directive',
  'filter'
];

var LIFECYCLE_HOOKS = [
  'beforeCreate',
  'created',
  'beforeMount',
  'mounted',
  'beforeUpdate',
  'updated',
  'beforeDestroy',
  'destroyed',
  'activated',
  'deactivated',
  'errorCaptured',
  'serverPrefetch'
];

/*  */



var config = ({
  /**
   * Option merge strategies (used in core/util/options)
   */
  // $flow-disable-line
  optionMergeStrategies: Object.create(null),

  /**
   * Whether to suppress warnings.
   */
  silent: false,

  /**
   * Show production mode tip message on boot?
   */
  productionTip: "development" !== 'production',

  /**
   * Whether to enable devtools
   */
  devtools: "development" !== 'production',

  /**
   * Whether to record perf
   */
  performance: false,

  /**
   * Error handler for watcher errors
   */
  errorHandler: null,

  /**
   * Warn handler for watcher warns
   */
  warnHandler: null,

  /**
   * Ignore certain custom elements
   */
  ignoredElements: [],

  /**
   * Custom user key aliases for v-on
   */
  // $flow-disable-line
  keyCodes: Object.create(null),

  /**
   * Check if a tag is reserved so that it cannot be registered as a
   * component. This is platform-dependent and may be overwritten.
   */
  isReservedTag: no,

  /**
   * Check if an attribute is reserved so that it cannot be used as a component
   * prop. This is platform-dependent and may be overwritten.
   */
  isReservedAttr: no,

  /**
   * Check if a tag is an unknown element.
   * Platform-dependent.
   */
  isUnknownElement: no,

  /**
   * Get the namespace of an element
   */
  getTagNamespace: noop,

  /**
   * Parse the real tag name for the specific platform.
   */
  parsePlatformTagName: identity,

  /**
   * Check if an attribute must be bound using property, e.g. value
   * Platform-dependent.
   */
  mustUseProp: no,

  /**
   * Perform updates asynchronously. Intended to be used by Vue Test Utils
   * This will significantly reduce performance if set to false.
   */
  async: true,

  /**
   * Exposed for legacy reasons
   */
  _lifecycleHooks: LIFECYCLE_HOOKS
});

/*  */

/**
 * unicode letters used for parsing html tags, component names and property paths.
 * using https://www.w3.org/TR/html53/semantics-scripting.html#potentialcustomelementname
 * skipping \u10000-\uEFFFF due to it freezing up PhantomJS
 */
var unicodeRegExp = /a-zA-Z\u00B7\u00C0-\u00D6\u00D8-\u00F6\u00F8-\u037D\u037F-\u1FFF\u200C-\u200D\u203F-\u2040\u2070-\u218F\u2C00-\u2FEF\u3001-\uD7FF\uF900-\uFDCF\uFDF0-\uFFFD/;

/**
 * Check if a string starts with $ or _
 */
function isReserved (str) {
  var c = (str + '').charCodeAt(0);
  return c === 0x24 || c === 0x5F
}

/**
 * Define a property.
 */
function def (obj, key, val, enumerable) {
  Object.defineProperty(obj, key, {
    value: val,
    enumerable: !!enumerable,
    writable: true,
    configurable: true
  });
}

/**
 * Parse simple path.
 */
var bailRE = new RegExp(("[^" + (unicodeRegExp.source) + ".$_\\d]"));
function parsePath (path) {
  if (bailRE.test(path)) {
    return
  }
  var segments = path.split('.');
  return function (obj) {
    for (var i = 0; i < segments.length; i++) {
      if (!obj) { return }
      obj = obj[segments[i]];
    }
    return obj
  }
}

/*  */

// can we use __proto__?
var hasProto = '__proto__' in {};

// Browser environment sniffing
var inBrowser = typeof window !== 'undefined';
var inWeex = typeof WXEnvironment !== 'undefined' && !!WXEnvironment.platform;
var weexPlatform = inWeex && WXEnvironment.platform.toLowerCase();
var UA = inBrowser && window.navigator.userAgent.toLowerCase();
var isIE = UA && /msie|trident/.test(UA);
var isIE9 = UA && UA.indexOf('msie 9.0') > 0;
var isEdge = UA && UA.indexOf('edge/') > 0;
var isAndroid = (UA && UA.indexOf('android') > 0) || (weexPlatform === 'android');
var isIOS = (UA && /iphone|ipad|ipod|ios/.test(UA)) || (weexPlatform === 'ios');
var isChrome = UA && /chrome\/\d+/.test(UA) && !isEdge;
var isPhantomJS = UA && /phantomjs/.test(UA);
var isFF = UA && UA.match(/firefox\/(\d+)/);

// Firefox has a "watch" function on Object.prototype...
var nativeWatch = ({}).watch;
if (inBrowser) {
  try {
    var opts = {};
    Object.defineProperty(opts, 'passive', ({
      get: function get () {
      }
    })); // https://github.com/facebook/flow/issues/285
    window.addEventListener('test-passive', null, opts);
  } catch (e) {}
}

// this needs to be lazy-evaled because vue may be required before
// vue-server-renderer can set VUE_ENV
var _isServer;
var isServerRendering = function () {
  if (_isServer === undefined) {
    /* istanbul ignore if */
    if (!inBrowser && !inWeex && typeof global !== 'undefined') {
      // detect presence of vue-server-renderer and avoid
      // Webpack shimming the process
      _isServer = global['process'] && global['process'].env.VUE_ENV === 'server';
    } else {
      _isServer = false;
    }
  }
  return _isServer
};

// detect devtools
var devtools = inBrowser && window.__VUE_DEVTOOLS_GLOBAL_HOOK__;

/* istanbul ignore next */
function isNative (Ctor) {
  return typeof Ctor === 'function' && /native code/.test(Ctor.toString())
}

var hasSymbol =
  typeof Symbol !== 'undefined' && isNative(Symbol) &&
  typeof Reflect !== 'undefined' && isNative(Reflect.ownKeys);

var _Set;
/* istanbul ignore if */ // $flow-disable-line
if (typeof Set !== 'undefined' && isNative(Set)) {
  // use native Set when available.
  _Set = Set;
} else {
  // a non-standard Set polyfill that only works with primitive keys.
  _Set = /*@__PURE__*/(function () {
    function Set () {
      this.set = Object.create(null);
    }
    Set.prototype.has = function has (key) {
      return this.set[key] === true
    };
    Set.prototype.add = function add (key) {
      this.set[key] = true;
    };
    Set.prototype.clear = function clear () {
      this.set = Object.create(null);
    };

    return Set;
  }());
}

/*  */

var warn = noop;
var tip = noop;
var generateComponentTrace = (noop); // work around flow check
var formatComponentName = (noop);

if (true) {
  var hasConsole = typeof console !== 'undefined';
  var classifyRE = /(?:^|[-_])(\w)/g;
  var classify = function (str) { return str
    .replace(classifyRE, function (c) { return c.toUpperCase(); })
    .replace(/[-_]/g, ''); };

  warn = function (msg, vm) {
    var trace = vm ? generateComponentTrace(vm) : '';

    if (config.warnHandler) {
      config.warnHandler.call(null, msg, vm, trace);
    } else if (hasConsole && (!config.silent)) {
      console.error(("[Vue warn]: " + msg + trace));
    }
  };

  tip = function (msg, vm) {
    if (hasConsole && (!config.silent)) {
      console.warn("[Vue tip]: " + msg + (
        vm ? generateComponentTrace(vm) : ''
      ));
    }
  };

  formatComponentName = function (vm, includeFile) {
    if (vm.$root === vm) {
      if (vm.$options && vm.$options.__file) { // fixed by xxxxxx
        return ('') + vm.$options.__file
      }
      return '<Root>'
    }
    var options = typeof vm === 'function' && vm.cid != null
      ? vm.options
      : vm._isVue
        ? vm.$options || vm.constructor.options
        : vm;
    var name = options.name || options._componentTag;
    var file = options.__file;
    if (!name && file) {
      var match = file.match(/([^/\\]+)\.vue$/);
      name = match && match[1];
    }

    return (
      (name ? ("<" + (classify(name)) + ">") : "<Anonymous>") +
      (file && includeFile !== false ? (" at " + file) : '')
    )
  };

  var repeat = function (str, n) {
    var res = '';
    while (n) {
      if (n % 2 === 1) { res += str; }
      if (n > 1) { str += str; }
      n >>= 1;
    }
    return res
  };

  generateComponentTrace = function (vm) {
    if (vm._isVue && vm.$parent) {
      var tree = [];
      var currentRecursiveSequence = 0;
      while (vm && vm.$options.name !== 'PageBody') {
        if (tree.length > 0) {
          var last = tree[tree.length - 1];
          if (last.constructor === vm.constructor) {
            currentRecursiveSequence++;
            vm = vm.$parent;
            continue
          } else if (currentRecursiveSequence > 0) {
            tree[tree.length - 1] = [last, currentRecursiveSequence];
            currentRecursiveSequence = 0;
          }
        }
        !vm.$options.isReserved && tree.push(vm);
        vm = vm.$parent;
      }
      return '\n\nfound in\n\n' + tree
        .map(function (vm, i) { return ("" + (i === 0 ? '---> ' : repeat(' ', 5 + i * 2)) + (Array.isArray(vm)
            ? ((formatComponentName(vm[0])) + "... (" + (vm[1]) + " recursive calls)")
            : formatComponentName(vm))); })
        .join('\n')
    } else {
      return ("\n\n(found in " + (formatComponentName(vm)) + ")")
    }
  };
}

/*  */

var uid = 0;

/**
 * A dep is an observable that can have multiple
 * directives subscribing to it.
 */
var Dep = function Dep () {
  this.id = uid++;
  this.subs = [];
};

Dep.prototype.addSub = function addSub (sub) {
  this.subs.push(sub);
};

Dep.prototype.removeSub = function removeSub (sub) {
  remove(this.subs, sub);
};

Dep.prototype.depend = function depend () {
  if (Dep.SharedObject.target) {
    Dep.SharedObject.target.addDep(this);
  }
};

Dep.prototype.notify = function notify () {
  // stabilize the subscriber list first
  var subs = this.subs.slice();
  if ( true && !config.async) {
    // subs aren't sorted in scheduler if not running async
    // we need to sort them now to make sure they fire in correct
    // order
    subs.sort(function (a, b) { return a.id - b.id; });
  }
  for (var i = 0, l = subs.length; i < l; i++) {
    subs[i].update();
  }
};

// The current target watcher being evaluated.
// This is globally unique because only one watcher
// can be evaluated at a time.
// fixed by xxxxxx (nvue shared vuex)
/* eslint-disable no-undef */
Dep.SharedObject = {};
Dep.SharedObject.target = null;
Dep.SharedObject.targetStack = [];

function pushTarget (target) {
  Dep.SharedObject.targetStack.push(target);
  Dep.SharedObject.target = target;
  Dep.target = target;
}

function popTarget () {
  Dep.SharedObject.targetStack.pop();
  Dep.SharedObject.target = Dep.SharedObject.targetStack[Dep.SharedObject.targetStack.length - 1];
  Dep.target = Dep.SharedObject.target;
}

/*  */

var VNode = function VNode (
  tag,
  data,
  children,
  text,
  elm,
  context,
  componentOptions,
  asyncFactory
) {
  this.tag = tag;
  this.data = data;
  this.children = children;
  this.text = text;
  this.elm = elm;
  this.ns = undefined;
  this.context = context;
  this.fnContext = undefined;
  this.fnOptions = undefined;
  this.fnScopeId = undefined;
  this.key = data && data.key;
  this.componentOptions = componentOptions;
  this.componentInstance = undefined;
  this.parent = undefined;
  this.raw = false;
  this.isStatic = false;
  this.isRootInsert = true;
  this.isComment = false;
  this.isCloned = false;
  this.isOnce = false;
  this.asyncFactory = asyncFactory;
  this.asyncMeta = undefined;
  this.isAsyncPlaceholder = false;
};

var prototypeAccessors = { child: { configurable: true } };

// DEPRECATED: alias for componentInstance for backwards compat.
/* istanbul ignore next */
prototypeAccessors.child.get = function () {
  return this.componentInstance
};

Object.defineProperties( VNode.prototype, prototypeAccessors );

var createEmptyVNode = function (text) {
  if ( text === void 0 ) text = '';

  var node = new VNode();
  node.text = text;
  node.isComment = true;
  return node
};

function createTextVNode (val) {
  return new VNode(undefined, undefined, undefined, String(val))
}

// optimized shallow clone
// used for static nodes and slot nodes because they may be reused across
// multiple renders, cloning them avoids errors when DOM manipulations rely
// on their elm reference.
function cloneVNode (vnode) {
  var cloned = new VNode(
    vnode.tag,
    vnode.data,
    // #7975
    // clone children array to avoid mutating original in case of cloning
    // a child.
    vnode.children && vnode.children.slice(),
    vnode.text,
    vnode.elm,
    vnode.context,
    vnode.componentOptions,
    vnode.asyncFactory
  );
  cloned.ns = vnode.ns;
  cloned.isStatic = vnode.isStatic;
  cloned.key = vnode.key;
  cloned.isComment = vnode.isComment;
  cloned.fnContext = vnode.fnContext;
  cloned.fnOptions = vnode.fnOptions;
  cloned.fnScopeId = vnode.fnScopeId;
  cloned.asyncMeta = vnode.asyncMeta;
  cloned.isCloned = true;
  return cloned
}

/*
 * not type checking this file because flow doesn't play well with
 * dynamically accessing methods on Array prototype
 */

var arrayProto = Array.prototype;
var arrayMethods = Object.create(arrayProto);

var methodsToPatch = [
  'push',
  'pop',
  'shift',
  'unshift',
  'splice',
  'sort',
  'reverse'
];

/**
 * Intercept mutating methods and emit events
 */
methodsToPatch.forEach(function (method) {
  // cache original method
  var original = arrayProto[method];
  def(arrayMethods, method, function mutator () {
    var args = [], len = arguments.length;
    while ( len-- ) args[ len ] = arguments[ len ];

    var result = original.apply(this, args);
    var ob = this.__ob__;
    var inserted;
    switch (method) {
      case 'push':
      case 'unshift':
        inserted = args;
        break
      case 'splice':
        inserted = args.slice(2);
        break
    }
    if (inserted) { ob.observeArray(inserted); }
    // notify change
    ob.dep.notify();
    return result
  });
});

/*  */

var arrayKeys = Object.getOwnPropertyNames(arrayMethods);

/**
 * In some cases we may want to disable observation inside a component's
 * update computation.
 */
var shouldObserve = true;

function toggleObserving (value) {
  shouldObserve = value;
}

/**
 * Observer class that is attached to each observed
 * object. Once attached, the observer converts the target
 * object's property keys into getter/setters that
 * collect dependencies and dispatch updates.
 */
var Observer = function Observer (value) {
  this.value = value;
  this.dep = new Dep();
  this.vmCount = 0;
  def(value, '__ob__', this);
  if (Array.isArray(value)) {
    if (hasProto) {
      {// fixed by xxxxxx 微信小程序使用 plugins 之后，数组方法被直接挂载到了数组对象上，需要执行 copyAugment 逻辑
        if(value.push !== value.__proto__.push){
          copyAugment(value, arrayMethods, arrayKeys);
        } else {
          protoAugment(value, arrayMethods);
        }
      }
    } else {
      copyAugment(value, arrayMethods, arrayKeys);
    }
    this.observeArray(value);
  } else {
    this.walk(value);
  }
};

/**
 * Walk through all properties and convert them into
 * getter/setters. This method should only be called when
 * value type is Object.
 */
Observer.prototype.walk = function walk (obj) {
  var keys = Object.keys(obj);
  for (var i = 0; i < keys.length; i++) {
    defineReactive$$1(obj, keys[i]);
  }
};

/**
 * Observe a list of Array items.
 */
Observer.prototype.observeArray = function observeArray (items) {
  for (var i = 0, l = items.length; i < l; i++) {
    observe(items[i]);
  }
};

// helpers

/**
 * Augment a target Object or Array by intercepting
 * the prototype chain using __proto__
 */
function protoAugment (target, src) {
  /* eslint-disable no-proto */
  target.__proto__ = src;
  /* eslint-enable no-proto */
}

/**
 * Augment a target Object or Array by defining
 * hidden properties.
 */
/* istanbul ignore next */
function copyAugment (target, src, keys) {
  for (var i = 0, l = keys.length; i < l; i++) {
    var key = keys[i];
    def(target, key, src[key]);
  }
}

/**
 * Attempt to create an observer instance for a value,
 * returns the new observer if successfully observed,
 * or the existing observer if the value already has one.
 */
function observe (value, asRootData) {
  if (!isObject(value) || value instanceof VNode) {
    return
  }
  var ob;
  if (hasOwn(value, '__ob__') && value.__ob__ instanceof Observer) {
    ob = value.__ob__;
  } else if (
    shouldObserve &&
    !isServerRendering() &&
    (Array.isArray(value) || isPlainObject(value)) &&
    Object.isExtensible(value) &&
    !value._isVue &&
    !value.__v_isMPComponent
  ) {
    ob = new Observer(value);
  }
  if (asRootData && ob) {
    ob.vmCount++;
  }
  return ob
}

/**
 * Define a reactive property on an Object.
 */
function defineReactive$$1 (
  obj,
  key,
  val,
  customSetter,
  shallow
) {
  var dep = new Dep();

  var property = Object.getOwnPropertyDescriptor(obj, key);
  if (property && property.configurable === false) {
    return
  }

  // cater for pre-defined getter/setters
  var getter = property && property.get;
  var setter = property && property.set;
  if ((!getter || setter) && arguments.length === 2) {
    val = obj[key];
  }

  var childOb = !shallow && observe(val);
  Object.defineProperty(obj, key, {
    enumerable: true,
    configurable: true,
    get: function reactiveGetter () {
      var value = getter ? getter.call(obj) : val;
      if (Dep.SharedObject.target) { // fixed by xxxxxx
        dep.depend();
        if (childOb) {
          childOb.dep.depend();
          if (Array.isArray(value)) {
            dependArray(value);
          }
        }
      }
      return value
    },
    set: function reactiveSetter (newVal) {
      var value = getter ? getter.call(obj) : val;
      /* eslint-disable no-self-compare */
      if (newVal === value || (newVal !== newVal && value !== value)) {
        return
      }
      /* eslint-enable no-self-compare */
      if ( true && customSetter) {
        customSetter();
      }
      // #7981: for accessor properties without setter
      if (getter && !setter) { return }
      if (setter) {
        setter.call(obj, newVal);
      } else {
        val = newVal;
      }
      childOb = !shallow && observe(newVal);
      dep.notify();
    }
  });
}

/**
 * Set a property on an object. Adds the new property and
 * triggers change notification if the property doesn't
 * already exist.
 */
function set (target, key, val) {
  if ( true &&
    (isUndef(target) || isPrimitive(target))
  ) {
    warn(("Cannot set reactive property on undefined, null, or primitive value: " + ((target))));
  }
  if (Array.isArray(target) && isValidArrayIndex(key)) {
    target.length = Math.max(target.length, key);
    target.splice(key, 1, val);
    return val
  }
  if (key in target && !(key in Object.prototype)) {
    target[key] = val;
    return val
  }
  var ob = (target).__ob__;
  if (target._isVue || (ob && ob.vmCount)) {
     true && warn(
      'Avoid adding reactive properties to a Vue instance or its root $data ' +
      'at runtime - declare it upfront in the data option.'
    );
    return val
  }
  if (!ob) {
    target[key] = val;
    return val
  }
  defineReactive$$1(ob.value, key, val);
  ob.dep.notify();
  return val
}

/**
 * Delete a property and trigger change if necessary.
 */
function del (target, key) {
  if ( true &&
    (isUndef(target) || isPrimitive(target))
  ) {
    warn(("Cannot delete reactive property on undefined, null, or primitive value: " + ((target))));
  }
  if (Array.isArray(target) && isValidArrayIndex(key)) {
    target.splice(key, 1);
    return
  }
  var ob = (target).__ob__;
  if (target._isVue || (ob && ob.vmCount)) {
     true && warn(
      'Avoid deleting properties on a Vue instance or its root $data ' +
      '- just set it to null.'
    );
    return
  }
  if (!hasOwn(target, key)) {
    return
  }
  delete target[key];
  if (!ob) {
    return
  }
  ob.dep.notify();
}

/**
 * Collect dependencies on array elements when the array is touched, since
 * we cannot intercept array element access like property getters.
 */
function dependArray (value) {
  for (var e = (void 0), i = 0, l = value.length; i < l; i++) {
    e = value[i];
    e && e.__ob__ && e.__ob__.dep.depend();
    if (Array.isArray(e)) {
      dependArray(e);
    }
  }
}

/*  */

/**
 * Option overwriting strategies are functions that handle
 * how to merge a parent option value and a child option
 * value into the final value.
 */
var strats = config.optionMergeStrategies;

/**
 * Options with restrictions
 */
if (true) {
  strats.el = strats.propsData = function (parent, child, vm, key) {
    if (!vm) {
      warn(
        "option \"" + key + "\" can only be used during instance " +
        'creation with the `new` keyword.'
      );
    }
    return defaultStrat(parent, child)
  };
}

/**
 * Helper that recursively merges two data objects together.
 */
function mergeData (to, from) {
  if (!from) { return to }
  var key, toVal, fromVal;

  var keys = hasSymbol
    ? Reflect.ownKeys(from)
    : Object.keys(from);

  for (var i = 0; i < keys.length; i++) {
    key = keys[i];
    // in case the object is already observed...
    if (key === '__ob__') { continue }
    toVal = to[key];
    fromVal = from[key];
    if (!hasOwn(to, key)) {
      set(to, key, fromVal);
    } else if (
      toVal !== fromVal &&
      isPlainObject(toVal) &&
      isPlainObject(fromVal)
    ) {
      mergeData(toVal, fromVal);
    }
  }
  return to
}

/**
 * Data
 */
function mergeDataOrFn (
  parentVal,
  childVal,
  vm
) {
  if (!vm) {
    // in a Vue.extend merge, both should be functions
    if (!childVal) {
      return parentVal
    }
    if (!parentVal) {
      return childVal
    }
    // when parentVal & childVal are both present,
    // we need to return a function that returns the
    // merged result of both functions... no need to
    // check if parentVal is a function here because
    // it has to be a function to pass previous merges.
    return function mergedDataFn () {
      return mergeData(
        typeof childVal === 'function' ? childVal.call(this, this) : childVal,
        typeof parentVal === 'function' ? parentVal.call(this, this) : parentVal
      )
    }
  } else {
    return function mergedInstanceDataFn () {
      // instance merge
      var instanceData = typeof childVal === 'function'
        ? childVal.call(vm, vm)
        : childVal;
      var defaultData = typeof parentVal === 'function'
        ? parentVal.call(vm, vm)
        : parentVal;
      if (instanceData) {
        return mergeData(instanceData, defaultData)
      } else {
        return defaultData
      }
    }
  }
}

strats.data = function (
  parentVal,
  childVal,
  vm
) {
  if (!vm) {
    if (childVal && typeof childVal !== 'function') {
       true && warn(
        'The "data" option should be a function ' +
        'that returns a per-instance value in component ' +
        'definitions.',
        vm
      );

      return parentVal
    }
    return mergeDataOrFn(parentVal, childVal)
  }

  return mergeDataOrFn(parentVal, childVal, vm)
};

/**
 * Hooks and props are merged as arrays.
 */
function mergeHook (
  parentVal,
  childVal
) {
  var res = childVal
    ? parentVal
      ? parentVal.concat(childVal)
      : Array.isArray(childVal)
        ? childVal
        : [childVal]
    : parentVal;
  return res
    ? dedupeHooks(res)
    : res
}

function dedupeHooks (hooks) {
  var res = [];
  for (var i = 0; i < hooks.length; i++) {
    if (res.indexOf(hooks[i]) === -1) {
      res.push(hooks[i]);
    }
  }
  return res
}

LIFECYCLE_HOOKS.forEach(function (hook) {
  strats[hook] = mergeHook;
});

/**
 * Assets
 *
 * When a vm is present (instance creation), we need to do
 * a three-way merge between constructor options, instance
 * options and parent options.
 */
function mergeAssets (
  parentVal,
  childVal,
  vm,
  key
) {
  var res = Object.create(parentVal || null);
  if (childVal) {
     true && assertObjectType(key, childVal, vm);
    return extend(res, childVal)
  } else {
    return res
  }
}

ASSET_TYPES.forEach(function (type) {
  strats[type + 's'] = mergeAssets;
});

/**
 * Watchers.
 *
 * Watchers hashes should not overwrite one
 * another, so we merge them as arrays.
 */
strats.watch = function (
  parentVal,
  childVal,
  vm,
  key
) {
  // work around Firefox's Object.prototype.watch...
  if (parentVal === nativeWatch) { parentVal = undefined; }
  if (childVal === nativeWatch) { childVal = undefined; }
  /* istanbul ignore if */
  if (!childVal) { return Object.create(parentVal || null) }
  if (true) {
    assertObjectType(key, childVal, vm);
  }
  if (!parentVal) { return childVal }
  var ret = {};
  extend(ret, parentVal);
  for (var key$1 in childVal) {
    var parent = ret[key$1];
    var child = childVal[key$1];
    if (parent && !Array.isArray(parent)) {
      parent = [parent];
    }
    ret[key$1] = parent
      ? parent.concat(child)
      : Array.isArray(child) ? child : [child];
  }
  return ret
};

/**
 * Other object hashes.
 */
strats.props =
strats.methods =
strats.inject =
strats.computed = function (
  parentVal,
  childVal,
  vm,
  key
) {
  if (childVal && "development" !== 'production') {
    assertObjectType(key, childVal, vm);
  }
  if (!parentVal) { return childVal }
  var ret = Object.create(null);
  extend(ret, parentVal);
  if (childVal) { extend(ret, childVal); }
  return ret
};
strats.provide = mergeDataOrFn;

/**
 * Default strategy.
 */
var defaultStrat = function (parentVal, childVal) {
  return childVal === undefined
    ? parentVal
    : childVal
};

/**
 * Validate component names
 */
function checkComponents (options) {
  for (var key in options.components) {
    validateComponentName(key);
  }
}

function validateComponentName (name) {
  if (!new RegExp(("^[a-zA-Z][\\-\\.0-9_" + (unicodeRegExp.source) + "]*$")).test(name)) {
    warn(
      'Invalid component name: "' + name + '". Component names ' +
      'should conform to valid custom element name in html5 specification.'
    );
  }
  if (isBuiltInTag(name) || config.isReservedTag(name)) {
    warn(
      'Do not use built-in or reserved HTML elements as component ' +
      'id: ' + name
    );
  }
}

/**
 * Ensure all props option syntax are normalized into the
 * Object-based format.
 */
function normalizeProps (options, vm) {
  var props = options.props;
  if (!props) { return }
  var res = {};
  var i, val, name;
  if (Array.isArray(props)) {
    i = props.length;
    while (i--) {
      val = props[i];
      if (typeof val === 'string') {
        name = camelize(val);
        res[name] = { type: null };
      } else if (true) {
        warn('props must be strings when using array syntax.');
      }
    }
  } else if (isPlainObject(props)) {
    for (var key in props) {
      val = props[key];
      name = camelize(key);
      res[name] = isPlainObject(val)
        ? val
        : { type: val };
    }
  } else if (true) {
    warn(
      "Invalid value for option \"props\": expected an Array or an Object, " +
      "but got " + (toRawType(props)) + ".",
      vm
    );
  }
  options.props = res;
}

/**
 * Normalize all injections into Object-based format
 */
function normalizeInject (options, vm) {
  var inject = options.inject;
  if (!inject) { return }
  var normalized = options.inject = {};
  if (Array.isArray(inject)) {
    for (var i = 0; i < inject.length; i++) {
      normalized[inject[i]] = { from: inject[i] };
    }
  } else if (isPlainObject(inject)) {
    for (var key in inject) {
      var val = inject[key];
      normalized[key] = isPlainObject(val)
        ? extend({ from: key }, val)
        : { from: val };
    }
  } else if (true) {
    warn(
      "Invalid value for option \"inject\": expected an Array or an Object, " +
      "but got " + (toRawType(inject)) + ".",
      vm
    );
  }
}

/**
 * Normalize raw function directives into object format.
 */
function normalizeDirectives (options) {
  var dirs = options.directives;
  if (dirs) {
    for (var key in dirs) {
      var def$$1 = dirs[key];
      if (typeof def$$1 === 'function') {
        dirs[key] = { bind: def$$1, update: def$$1 };
      }
    }
  }
}

function assertObjectType (name, value, vm) {
  if (!isPlainObject(value)) {
    warn(
      "Invalid value for option \"" + name + "\": expected an Object, " +
      "but got " + (toRawType(value)) + ".",
      vm
    );
  }
}

/**
 * Merge two option objects into a new one.
 * Core utility used in both instantiation and inheritance.
 */
function mergeOptions (
  parent,
  child,
  vm
) {
  if (true) {
    checkComponents(child);
  }

  if (typeof child === 'function') {
    child = child.options;
  }

  normalizeProps(child, vm);
  normalizeInject(child, vm);
  normalizeDirectives(child);

  // Apply extends and mixins on the child options,
  // but only if it is a raw options object that isn't
  // the result of another mergeOptions call.
  // Only merged options has the _base property.
  if (!child._base) {
    if (child.extends) {
      parent = mergeOptions(parent, child.extends, vm);
    }
    if (child.mixins) {
      for (var i = 0, l = child.mixins.length; i < l; i++) {
        parent = mergeOptions(parent, child.mixins[i], vm);
      }
    }
  }

  var options = {};
  var key;
  for (key in parent) {
    mergeField(key);
  }
  for (key in child) {
    if (!hasOwn(parent, key)) {
      mergeField(key);
    }
  }
  function mergeField (key) {
    var strat = strats[key] || defaultStrat;
    options[key] = strat(parent[key], child[key], vm, key);
  }
  return options
}

/**
 * Resolve an asset.
 * This function is used because child instances need access
 * to assets defined in its ancestor chain.
 */
function resolveAsset (
  options,
  type,
  id,
  warnMissing
) {
  /* istanbul ignore if */
  if (typeof id !== 'string') {
    return
  }
  var assets = options[type];
  // check local registration variations first
  if (hasOwn(assets, id)) { return assets[id] }
  var camelizedId = camelize(id);
  if (hasOwn(assets, camelizedId)) { return assets[camelizedId] }
  var PascalCaseId = capitalize(camelizedId);
  if (hasOwn(assets, PascalCaseId)) { return assets[PascalCaseId] }
  // fallback to prototype chain
  var res = assets[id] || assets[camelizedId] || assets[PascalCaseId];
  if ( true && warnMissing && !res) {
    warn(
      'Failed to resolve ' + type.slice(0, -1) + ': ' + id,
      options
    );
  }
  return res
}

/*  */



function validateProp (
  key,
  propOptions,
  propsData,
  vm
) {
  var prop = propOptions[key];
  var absent = !hasOwn(propsData, key);
  var value = propsData[key];
  // boolean casting
  var booleanIndex = getTypeIndex(Boolean, prop.type);
  if (booleanIndex > -1) {
    if (absent && !hasOwn(prop, 'default')) {
      value = false;
    } else if (value === '' || value === hyphenate(key)) {
      // only cast empty string / same name to boolean if
      // boolean has higher priority
      var stringIndex = getTypeIndex(String, prop.type);
      if (stringIndex < 0 || booleanIndex < stringIndex) {
        value = true;
      }
    }
  }
  // check default value
  if (value === undefined) {
    value = getPropDefaultValue(vm, prop, key);
    // since the default value is a fresh copy,
    // make sure to observe it.
    var prevShouldObserve = shouldObserve;
    toggleObserving(true);
    observe(value);
    toggleObserving(prevShouldObserve);
  }
  if (
    true
  ) {
    assertProp(prop, key, value, vm, absent);
  }
  return value
}

/**
 * Get the default value of a prop.
 */
function getPropDefaultValue (vm, prop, key) {
  // no default, return undefined
  if (!hasOwn(prop, 'default')) {
    return undefined
  }
  var def = prop.default;
  // warn against non-factory defaults for Object & Array
  if ( true && isObject(def)) {
    warn(
      'Invalid default value for prop "' + key + '": ' +
      'Props with type Object/Array must use a factory function ' +
      'to return the default value.',
      vm
    );
  }
  // the raw prop value was also undefined from previous render,
  // return previous default value to avoid unnecessary watcher trigger
  if (vm && vm.$options.propsData &&
    vm.$options.propsData[key] === undefined &&
    vm._props[key] !== undefined
  ) {
    return vm._props[key]
  }
  // call factory function for non-Function types
  // a value is Function if its prototype is function even across different execution context
  return typeof def === 'function' && getType(prop.type) !== 'Function'
    ? def.call(vm)
    : def
}

/**
 * Assert whether a prop is valid.
 */
function assertProp (
  prop,
  name,
  value,
  vm,
  absent
) {
  if (prop.required && absent) {
    warn(
      'Missing required prop: "' + name + '"',
      vm
    );
    return
  }
  if (value == null && !prop.required) {
    return
  }
  var type = prop.type;
  var valid = !type || type === true;
  var expectedTypes = [];
  if (type) {
    if (!Array.isArray(type)) {
      type = [type];
    }
    for (var i = 0; i < type.length && !valid; i++) {
      var assertedType = assertType(value, type[i]);
      expectedTypes.push(assertedType.expectedType || '');
      valid = assertedType.valid;
    }
  }

  if (!valid) {
    warn(
      getInvalidTypeMessage(name, value, expectedTypes),
      vm
    );
    return
  }
  var validator = prop.validator;
  if (validator) {
    if (!validator(value)) {
      warn(
        'Invalid prop: custom validator check failed for prop "' + name + '".',
        vm
      );
    }
  }
}

var simpleCheckRE = /^(String|Number|Boolean|Function|Symbol)$/;

function assertType (value, type) {
  var valid;
  var expectedType = getType(type);
  if (simpleCheckRE.test(expectedType)) {
    var t = typeof value;
    valid = t === expectedType.toLowerCase();
    // for primitive wrapper objects
    if (!valid && t === 'object') {
      valid = value instanceof type;
    }
  } else if (expectedType === 'Object') {
    valid = isPlainObject(value);
  } else if (expectedType === 'Array') {
    valid = Array.isArray(value);
  } else {
    valid = value instanceof type;
  }
  return {
    valid: valid,
    expectedType: expectedType
  }
}

/**
 * Use function string name to check built-in types,
 * because a simple equality check will fail when running
 * across different vms / iframes.
 */
function getType (fn) {
  var match = fn && fn.toString().match(/^\s*function (\w+)/);
  return match ? match[1] : ''
}

function isSameType (a, b) {
  return getType(a) === getType(b)
}

function getTypeIndex (type, expectedTypes) {
  if (!Array.isArray(expectedTypes)) {
    return isSameType(expectedTypes, type) ? 0 : -1
  }
  for (var i = 0, len = expectedTypes.length; i < len; i++) {
    if (isSameType(expectedTypes[i], type)) {
      return i
    }
  }
  return -1
}

function getInvalidTypeMessage (name, value, expectedTypes) {
  var message = "Invalid prop: type check failed for prop \"" + name + "\"." +
    " Expected " + (expectedTypes.map(capitalize).join(', '));
  var expectedType = expectedTypes[0];
  var receivedType = toRawType(value);
  var expectedValue = styleValue(value, expectedType);
  var receivedValue = styleValue(value, receivedType);
  // check if we need to specify expected value
  if (expectedTypes.length === 1 &&
      isExplicable(expectedType) &&
      !isBoolean(expectedType, receivedType)) {
    message += " with value " + expectedValue;
  }
  message += ", got " + receivedType + " ";
  // check if we need to specify received value
  if (isExplicable(receivedType)) {
    message += "with value " + receivedValue + ".";
  }
  return message
}

function styleValue (value, type) {
  if (type === 'String') {
    return ("\"" + value + "\"")
  } else if (type === 'Number') {
    return ("" + (Number(value)))
  } else {
    return ("" + value)
  }
}

function isExplicable (value) {
  var explicitTypes = ['string', 'number', 'boolean'];
  return explicitTypes.some(function (elem) { return value.toLowerCase() === elem; })
}

function isBoolean () {
  var args = [], len = arguments.length;
  while ( len-- ) args[ len ] = arguments[ len ];

  return args.some(function (elem) { return elem.toLowerCase() === 'boolean'; })
}

/*  */

function handleError (err, vm, info) {
  // Deactivate deps tracking while processing error handler to avoid possible infinite rendering.
  // See: https://github.com/vuejs/vuex/issues/1505
  pushTarget();
  try {
    if (vm) {
      var cur = vm;
      while ((cur = cur.$parent)) {
        var hooks = cur.$options.errorCaptured;
        if (hooks) {
          for (var i = 0; i < hooks.length; i++) {
            try {
              var capture = hooks[i].call(cur, err, vm, info) === false;
              if (capture) { return }
            } catch (e) {
              globalHandleError(e, cur, 'errorCaptured hook');
            }
          }
        }
      }
    }
    globalHandleError(err, vm, info);
  } finally {
    popTarget();
  }
}

function invokeWithErrorHandling (
  handler,
  context,
  args,
  vm,
  info
) {
  var res;
  try {
    res = args ? handler.apply(context, args) : handler.call(context);
    if (res && !res._isVue && isPromise(res) && !res._handled) {
      res.catch(function (e) { return handleError(e, vm, info + " (Promise/async)"); });
      // issue #9511
      // avoid catch triggering multiple times when nested calls
      res._handled = true;
    }
  } catch (e) {
    handleError(e, vm, info);
  }
  return res
}

function globalHandleError (err, vm, info) {
  if (config.errorHandler) {
    try {
      return config.errorHandler.call(null, err, vm, info)
    } catch (e) {
      // if the user intentionally throws the original error in the handler,
      // do not log it twice
      if (e !== err) {
        logError(e, null, 'config.errorHandler');
      }
    }
  }
  logError(err, vm, info);
}

function logError (err, vm, info) {
  if (true) {
    warn(("Error in " + info + ": \"" + (err.toString()) + "\""), vm);
  }
  /* istanbul ignore else */
  if ((inBrowser || inWeex) && typeof console !== 'undefined') {
    console.error(err);
  } else {
    throw err
  }
}

/*  */

var callbacks = [];
var pending = false;

function flushCallbacks () {
  pending = false;
  var copies = callbacks.slice(0);
  callbacks.length = 0;
  for (var i = 0; i < copies.length; i++) {
    copies[i]();
  }
}

// Here we have async deferring wrappers using microtasks.
// In 2.5 we used (macro) tasks (in combination with microtasks).
// However, it has subtle problems when state is changed right before repaint
// (e.g. #6813, out-in transitions).
// Also, using (macro) tasks in event handler would cause some weird behaviors
// that cannot be circumvented (e.g. #7109, #7153, #7546, #7834, #8109).
// So we now use microtasks everywhere, again.
// A major drawback of this tradeoff is that there are some scenarios
// where microtasks have too high a priority and fire in between supposedly
// sequential events (e.g. #4521, #6690, which have workarounds)
// or even between bubbling of the same event (#6566).
var timerFunc;

// The nextTick behavior leverages the microtask queue, which can be accessed
// via either native Promise.then or MutationObserver.
// MutationObserver has wider support, however it is seriously bugged in
// UIWebView in iOS >= 9.3.3 when triggered in touch event handlers. It
// completely stops working after triggering a few times... so, if native
// Promise is available, we will use it:
/* istanbul ignore next, $flow-disable-line */
if (typeof Promise !== 'undefined' && isNative(Promise)) {
  var p = Promise.resolve();
  timerFunc = function () {
    p.then(flushCallbacks);
    // In problematic UIWebViews, Promise.then doesn't completely break, but
    // it can get stuck in a weird state where callbacks are pushed into the
    // microtask queue but the queue isn't being flushed, until the browser
    // needs to do some other work, e.g. handle a timer. Therefore we can
    // "force" the microtask queue to be flushed by adding an empty timer.
    if (isIOS) { setTimeout(noop); }
  };
} else if (!isIE && typeof MutationObserver !== 'undefined' && (
  isNative(MutationObserver) ||
  // PhantomJS and iOS 7.x
  MutationObserver.toString() === '[object MutationObserverConstructor]'
)) {
  // Use MutationObserver where native Promise is not available,
  // e.g. PhantomJS, iOS7, Android 4.4
  // (#6466 MutationObserver is unreliable in IE11)
  var counter = 1;
  var observer = new MutationObserver(flushCallbacks);
  var textNode = document.createTextNode(String(counter));
  observer.observe(textNode, {
    characterData: true
  });
  timerFunc = function () {
    counter = (counter + 1) % 2;
    textNode.data = String(counter);
  };
} else if (typeof setImmediate !== 'undefined' && isNative(setImmediate)) {
  // Fallback to setImmediate.
  // Technically it leverages the (macro) task queue,
  // but it is still a better choice than setTimeout.
  timerFunc = function () {
    setImmediate(flushCallbacks);
  };
} else {
  // Fallback to setTimeout.
  timerFunc = function () {
    setTimeout(flushCallbacks, 0);
  };
}

function nextTick (cb, ctx) {
  var _resolve;
  callbacks.push(function () {
    if (cb) {
      try {
        cb.call(ctx);
      } catch (e) {
        handleError(e, ctx, 'nextTick');
      }
    } else if (_resolve) {
      _resolve(ctx);
    }
  });
  if (!pending) {
    pending = true;
    timerFunc();
  }
  // $flow-disable-line
  if (!cb && typeof Promise !== 'undefined') {
    return new Promise(function (resolve) {
      _resolve = resolve;
    })
  }
}

/*  */

/* not type checking this file because flow doesn't play well with Proxy */

var initProxy;

if (true) {
  var allowedGlobals = makeMap(
    'Infinity,undefined,NaN,isFinite,isNaN,' +
    'parseFloat,parseInt,decodeURI,decodeURIComponent,encodeURI,encodeURIComponent,' +
    'Math,Number,Date,Array,Object,Boolean,String,RegExp,Map,Set,JSON,Intl,' +
    'require' // for Webpack/Browserify
  );

  var warnNonPresent = function (target, key) {
    warn(
      "Property or method \"" + key + "\" is not defined on the instance but " +
      'referenced during render. Make sure that this property is reactive, ' +
      'either in the data option, or for class-based components, by ' +
      'initializing the property. ' +
      'See: https://vuejs.org/v2/guide/reactivity.html#Declaring-Reactive-Properties.',
      target
    );
  };

  var warnReservedPrefix = function (target, key) {
    warn(
      "Property \"" + key + "\" must be accessed with \"$data." + key + "\" because " +
      'properties starting with "$" or "_" are not proxied in the Vue instance to ' +
      'prevent conflicts with Vue internals. ' +
      'See: https://vuejs.org/v2/api/#data',
      target
    );
  };

  var hasProxy =
    typeof Proxy !== 'undefined' && isNative(Proxy);

  if (hasProxy) {
    var isBuiltInModifier = makeMap('stop,prevent,self,ctrl,shift,alt,meta,exact');
    config.keyCodes = new Proxy(config.keyCodes, {
      set: function set (target, key, value) {
        if (isBuiltInModifier(key)) {
          warn(("Avoid overwriting built-in modifier in config.keyCodes: ." + key));
          return false
        } else {
          target[key] = value;
          return true
        }
      }
    });
  }

  var hasHandler = {
    has: function has (target, key) {
      var has = key in target;
      var isAllowed = allowedGlobals(key) ||
        (typeof key === 'string' && key.charAt(0) === '_' && !(key in target.$data));
      if (!has && !isAllowed) {
        if (key in target.$data) { warnReservedPrefix(target, key); }
        else { warnNonPresent(target, key); }
      }
      return has || !isAllowed
    }
  };

  var getHandler = {
    get: function get (target, key) {
      if (typeof key === 'string' && !(key in target)) {
        if (key in target.$data) { warnReservedPrefix(target, key); }
        else { warnNonPresent(target, key); }
      }
      return target[key]
    }
  };

  initProxy = function initProxy (vm) {
    if (hasProxy) {
      // determine which proxy handler to use
      var options = vm.$options;
      var handlers = options.render && options.render._withStripped
        ? getHandler
        : hasHandler;
      vm._renderProxy = new Proxy(vm, handlers);
    } else {
      vm._renderProxy = vm;
    }
  };
}

/*  */

var seenObjects = new _Set();

/**
 * Recursively traverse an object to evoke all converted
 * getters, so that every nested property inside the object
 * is collected as a "deep" dependency.
 */
function traverse (val) {
  _traverse(val, seenObjects);
  seenObjects.clear();
}

function _traverse (val, seen) {
  var i, keys;
  var isA = Array.isArray(val);
  if ((!isA && !isObject(val)) || Object.isFrozen(val) || val instanceof VNode) {
    return
  }
  if (val.__ob__) {
    var depId = val.__ob__.dep.id;
    if (seen.has(depId)) {
      return
    }
    seen.add(depId);
  }
  if (isA) {
    i = val.length;
    while (i--) { _traverse(val[i], seen); }
  } else {
    keys = Object.keys(val);
    i = keys.length;
    while (i--) { _traverse(val[keys[i]], seen); }
  }
}

var mark;
var measure;

if (true) {
  var perf = inBrowser && window.performance;
  /* istanbul ignore if */
  if (
    perf &&
    perf.mark &&
    perf.measure &&
    perf.clearMarks &&
    perf.clearMeasures
  ) {
    mark = function (tag) { return perf.mark(tag); };
    measure = function (name, startTag, endTag) {
      perf.measure(name, startTag, endTag);
      perf.clearMarks(startTag);
      perf.clearMarks(endTag);
      // perf.clearMeasures(name)
    };
  }
}

/*  */

var normalizeEvent = cached(function (name) {
  var passive = name.charAt(0) === '&';
  name = passive ? name.slice(1) : name;
  var once$$1 = name.charAt(0) === '~'; // Prefixed last, checked first
  name = once$$1 ? name.slice(1) : name;
  var capture = name.charAt(0) === '!';
  name = capture ? name.slice(1) : name;
  return {
    name: name,
    once: once$$1,
    capture: capture,
    passive: passive
  }
});

function createFnInvoker (fns, vm) {
  function invoker () {
    var arguments$1 = arguments;

    var fns = invoker.fns;
    if (Array.isArray(fns)) {
      var cloned = fns.slice();
      for (var i = 0; i < cloned.length; i++) {
        invokeWithErrorHandling(cloned[i], null, arguments$1, vm, "v-on handler");
      }
    } else {
      // return handler return value for single handlers
      return invokeWithErrorHandling(fns, null, arguments, vm, "v-on handler")
    }
  }
  invoker.fns = fns;
  return invoker
}

function updateListeners (
  on,
  oldOn,
  add,
  remove$$1,
  createOnceHandler,
  vm
) {
  var name, def$$1, cur, old, event;
  for (name in on) {
    def$$1 = cur = on[name];
    old = oldOn[name];
    event = normalizeEvent(name);
    if (isUndef(cur)) {
       true && warn(
        "Invalid handler for event \"" + (event.name) + "\": got " + String(cur),
        vm
      );
    } else if (isUndef(old)) {
      if (isUndef(cur.fns)) {
        cur = on[name] = createFnInvoker(cur, vm);
      }
      if (isTrue(event.once)) {
        cur = on[name] = createOnceHandler(event.name, cur, event.capture);
      }
      add(event.name, cur, event.capture, event.passive, event.params);
    } else if (cur !== old) {
      old.fns = cur;
      on[name] = old;
    }
  }
  for (name in oldOn) {
    if (isUndef(on[name])) {
      event = normalizeEvent(name);
      remove$$1(event.name, oldOn[name], event.capture);
    }
  }
}

/*  */

/*  */

// fixed by xxxxxx (mp properties)
function extractPropertiesFromVNodeData(data, Ctor, res, context) {
  var propOptions = Ctor.options.mpOptions && Ctor.options.mpOptions.properties;
  if (isUndef(propOptions)) {
    return res
  }
  var externalClasses = Ctor.options.mpOptions.externalClasses || [];
  var attrs = data.attrs;
  var props = data.props;
  if (isDef(attrs) || isDef(props)) {
    for (var key in propOptions) {
      var altKey = hyphenate(key);
      var result = checkProp(res, props, key, altKey, true) ||
          checkProp(res, attrs, key, altKey, false);
      // externalClass
      if (
        result &&
        res[key] &&
        externalClasses.indexOf(altKey) !== -1 &&
        context[camelize(res[key])]
      ) {
        // 赋值 externalClass 真正的值(模板里 externalClass 的值可能是字符串)
        res[key] = context[camelize(res[key])];
      }
    }
  }
  return res
}

function extractPropsFromVNodeData (
  data,
  Ctor,
  tag,
  context// fixed by xxxxxx
) {
  // we are only extracting raw values here.
  // validation and default values are handled in the child
  // component itself.
  var propOptions = Ctor.options.props;
  if (isUndef(propOptions)) {
    // fixed by xxxxxx
    return extractPropertiesFromVNodeData(data, Ctor, {}, context)
  }
  var res = {};
  var attrs = data.attrs;
  var props = data.props;
  if (isDef(attrs) || isDef(props)) {
    for (var key in propOptions) {
      var altKey = hyphenate(key);
      if (true) {
        var keyInLowerCase = key.toLowerCase();
        if (
          key !== keyInLowerCase &&
          attrs && hasOwn(attrs, keyInLowerCase)
        ) {
          tip(
            "Prop \"" + keyInLowerCase + "\" is passed to component " +
            (formatComponentName(tag || Ctor)) + ", but the declared prop name is" +
            " \"" + key + "\". " +
            "Note that HTML attributes are case-insensitive and camelCased " +
            "props need to use their kebab-case equivalents when using in-DOM " +
            "templates. You should probably use \"" + altKey + "\" instead of \"" + key + "\"."
          );
        }
      }
      checkProp(res, props, key, altKey, true) ||
      checkProp(res, attrs, key, altKey, false);
    }
  }
  // fixed by xxxxxx
  return extractPropertiesFromVNodeData(data, Ctor, res, context)
}

function checkProp (
  res,
  hash,
  key,
  altKey,
  preserve
) {
  if (isDef(hash)) {
    if (hasOwn(hash, key)) {
      res[key] = hash[key];
      if (!preserve) {
        delete hash[key];
      }
      return true
    } else if (hasOwn(hash, altKey)) {
      res[key] = hash[altKey];
      if (!preserve) {
        delete hash[altKey];
      }
      return true
    }
  }
  return false
}

/*  */

// The template compiler attempts to minimize the need for normalization by
// statically analyzing the template at compile time.
//
// For plain HTML markup, normalization can be completely skipped because the
// generated render function is guaranteed to return Array<VNode>. There are
// two cases where extra normalization is needed:

// 1. When the children contains components - because a functional component
// may return an Array instead of a single root. In this case, just a simple
// normalization is needed - if any child is an Array, we flatten the whole
// thing with Array.prototype.concat. It is guaranteed to be only 1-level deep
// because functional components already normalize their own children.
function simpleNormalizeChildren (children) {
  for (var i = 0; i < children.length; i++) {
    if (Array.isArray(children[i])) {
      return Array.prototype.concat.apply([], children)
    }
  }
  return children
}

// 2. When the children contains constructs that always generated nested Arrays,
// e.g. <template>, <slot>, v-for, or when the children is provided by user
// with hand-written render functions / JSX. In such cases a full normalization
// is needed to cater to all possible types of children values.
function normalizeChildren (children) {
  return isPrimitive(children)
    ? [createTextVNode(children)]
    : Array.isArray(children)
      ? normalizeArrayChildren(children)
      : undefined
}

function isTextNode (node) {
  return isDef(node) && isDef(node.text) && isFalse(node.isComment)
}

function normalizeArrayChildren (children, nestedIndex) {
  var res = [];
  var i, c, lastIndex, last;
  for (i = 0; i < children.length; i++) {
    c = children[i];
    if (isUndef(c) || typeof c === 'boolean') { continue }
    lastIndex = res.length - 1;
    last = res[lastIndex];
    //  nested
    if (Array.isArray(c)) {
      if (c.length > 0) {
        c = normalizeArrayChildren(c, ((nestedIndex || '') + "_" + i));
        // merge adjacent text nodes
        if (isTextNode(c[0]) && isTextNode(last)) {
          res[lastIndex] = createTextVNode(last.text + (c[0]).text);
          c.shift();
        }
        res.push.apply(res, c);
      }
    } else if (isPrimitive(c)) {
      if (isTextNode(last)) {
        // merge adjacent text nodes
        // this is necessary for SSR hydration because text nodes are
        // essentially merged when rendered to HTML strings
        res[lastIndex] = createTextVNode(last.text + c);
      } else if (c !== '') {
        // convert primitive to vnode
        res.push(createTextVNode(c));
      }
    } else {
      if (isTextNode(c) && isTextNode(last)) {
        // merge adjacent text nodes
        res[lastIndex] = createTextVNode(last.text + c.text);
      } else {
        // default key for nested array children (likely generated by v-for)
        if (isTrue(children._isVList) &&
          isDef(c.tag) &&
          isUndef(c.key) &&
          isDef(nestedIndex)) {
          c.key = "__vlist" + nestedIndex + "_" + i + "__";
        }
        res.push(c);
      }
    }
  }
  return res
}

/*  */

function initProvide (vm) {
  var provide = vm.$options.provide;
  if (provide) {
    vm._provided = typeof provide === 'function'
      ? provide.call(vm)
      : provide;
  }
}

function initInjections (vm) {
  var result = resolveInject(vm.$options.inject, vm);
  if (result) {
    toggleObserving(false);
    Object.keys(result).forEach(function (key) {
      /* istanbul ignore else */
      if (true) {
        defineReactive$$1(vm, key, result[key], function () {
          warn(
            "Avoid mutating an injected value directly since the changes will be " +
            "overwritten whenever the provided component re-renders. " +
            "injection being mutated: \"" + key + "\"",
            vm
          );
        });
      } else {}
    });
    toggleObserving(true);
  }
}

function resolveInject (inject, vm) {
  if (inject) {
    // inject is :any because flow is not smart enough to figure out cached
    var result = Object.create(null);
    var keys = hasSymbol
      ? Reflect.ownKeys(inject)
      : Object.keys(inject);

    for (var i = 0; i < keys.length; i++) {
      var key = keys[i];
      // #6574 in case the inject object is observed...
      if (key === '__ob__') { continue }
      var provideKey = inject[key].from;
      var source = vm;
      while (source) {
        if (source._provided && hasOwn(source._provided, provideKey)) {
          result[key] = source._provided[provideKey];
          break
        }
        source = source.$parent;
      }
      if (!source) {
        if ('default' in inject[key]) {
          var provideDefault = inject[key].default;
          result[key] = typeof provideDefault === 'function'
            ? provideDefault.call(vm)
            : provideDefault;
        } else if (true) {
          warn(("Injection \"" + key + "\" not found"), vm);
        }
      }
    }
    return result
  }
}

/*  */



/**
 * Runtime helper for resolving raw children VNodes into a slot object.
 */
function resolveSlots (
  children,
  context
) {
  if (!children || !children.length) {
    return {}
  }
  var slots = {};
  for (var i = 0, l = children.length; i < l; i++) {
    var child = children[i];
    var data = child.data;
    // remove slot attribute if the node is resolved as a Vue slot node
    if (data && data.attrs && data.attrs.slot) {
      delete data.attrs.slot;
    }
    // named slots should only be respected if the vnode was rendered in the
    // same context.
    if ((child.context === context || child.fnContext === context) &&
      data && data.slot != null
    ) {
      var name = data.slot;
      var slot = (slots[name] || (slots[name] = []));
      if (child.tag === 'template') {
        slot.push.apply(slot, child.children || []);
      } else {
        slot.push(child);
      }
    } else {
      // fixed by xxxxxx 临时 hack 掉 uni-app 中的异步 name slot page
      if(child.asyncMeta && child.asyncMeta.data && child.asyncMeta.data.slot === 'page'){
        (slots['page'] || (slots['page'] = [])).push(child);
      }else{
        (slots.default || (slots.default = [])).push(child);
      }
    }
  }
  // ignore slots that contains only whitespace
  for (var name$1 in slots) {
    if (slots[name$1].every(isWhitespace)) {
      delete slots[name$1];
    }
  }
  return slots
}

function isWhitespace (node) {
  return (node.isComment && !node.asyncFactory) || node.text === ' '
}

/*  */

function normalizeScopedSlots (
  slots,
  normalSlots,
  prevSlots
) {
  var res;
  var hasNormalSlots = Object.keys(normalSlots).length > 0;
  var isStable = slots ? !!slots.$stable : !hasNormalSlots;
  var key = slots && slots.$key;
  if (!slots) {
    res = {};
  } else if (slots._normalized) {
    // fast path 1: child component re-render only, parent did not change
    return slots._normalized
  } else if (
    isStable &&
    prevSlots &&
    prevSlots !== emptyObject &&
    key === prevSlots.$key &&
    !hasNormalSlots &&
    !prevSlots.$hasNormal
  ) {
    // fast path 2: stable scoped slots w/ no normal slots to proxy,
    // only need to normalize once
    return prevSlots
  } else {
    res = {};
    for (var key$1 in slots) {
      if (slots[key$1] && key$1[0] !== '$') {
        res[key$1] = normalizeScopedSlot(normalSlots, key$1, slots[key$1]);
      }
    }
  }
  // expose normal slots on scopedSlots
  for (var key$2 in normalSlots) {
    if (!(key$2 in res)) {
      res[key$2] = proxyNormalSlot(normalSlots, key$2);
    }
  }
  // avoriaz seems to mock a non-extensible $scopedSlots object
  // and when that is passed down this would cause an error
  if (slots && Object.isExtensible(slots)) {
    (slots)._normalized = res;
  }
  def(res, '$stable', isStable);
  def(res, '$key', key);
  def(res, '$hasNormal', hasNormalSlots);
  return res
}

function normalizeScopedSlot(normalSlots, key, fn) {
  var normalized = function () {
    var res = arguments.length ? fn.apply(null, arguments) : fn({});
    res = res && typeof res === 'object' && !Array.isArray(res)
      ? [res] // single vnode
      : normalizeChildren(res);
    return res && (
      res.length === 0 ||
      (res.length === 1 && res[0].isComment) // #9658
    ) ? undefined
      : res
  };
  // this is a slot using the new v-slot syntax without scope. although it is
  // compiled as a scoped slot, render fn users would expect it to be present
  // on this.$slots because the usage is semantically a normal slot.
  if (fn.proxy) {
    Object.defineProperty(normalSlots, key, {
      get: normalized,
      enumerable: true,
      configurable: true
    });
  }
  return normalized
}

function proxyNormalSlot(slots, key) {
  return function () { return slots[key]; }
}

/*  */

/**
 * Runtime helper for rendering v-for lists.
 */
function renderList (
  val,
  render
) {
  var ret, i, l, keys, key;
  if (Array.isArray(val) || typeof val === 'string') {
    ret = new Array(val.length);
    for (i = 0, l = val.length; i < l; i++) {
      ret[i] = render(val[i], i, i, i); // fixed by xxxxxx
    }
  } else if (typeof val === 'number') {
    ret = new Array(val);
    for (i = 0; i < val; i++) {
      ret[i] = render(i + 1, i, i, i); // fixed by xxxxxx
    }
  } else if (isObject(val)) {
    if (hasSymbol && val[Symbol.iterator]) {
      ret = [];
      var iterator = val[Symbol.iterator]();
      var result = iterator.next();
      while (!result.done) {
        ret.push(render(result.value, ret.length, i, i++)); // fixed by xxxxxx
        result = iterator.next();
      }
    } else {
      keys = Object.keys(val);
      ret = new Array(keys.length);
      for (i = 0, l = keys.length; i < l; i++) {
        key = keys[i];
        ret[i] = render(val[key], key, i, i); // fixed by xxxxxx
      }
    }
  }
  if (!isDef(ret)) {
    ret = [];
  }
  (ret)._isVList = true;
  return ret
}

/*  */

/**
 * Runtime helper for rendering <slot>
 */
function renderSlot (
  name,
  fallback,
  props,
  bindObject
) {
  var scopedSlotFn = this.$scopedSlots[name];
  var nodes;
  if (scopedSlotFn) { // scoped slot
    props = props || {};
    if (bindObject) {
      if ( true && !isObject(bindObject)) {
        warn(
          'slot v-bind without argument expects an Object',
          this
        );
      }
      props = extend(extend({}, bindObject), props);
    }
    // fixed by xxxxxx app-plus scopedSlot
    nodes = scopedSlotFn(props, this, props._i) || fallback;
  } else {
    nodes = this.$slots[name] || fallback;
  }

  var target = props && props.slot;
  if (target) {
    return this.$createElement('template', { slot: target }, nodes)
  } else {
    return nodes
  }
}

/*  */

/**
 * Runtime helper for resolving filters
 */
function resolveFilter (id) {
  return resolveAsset(this.$options, 'filters', id, true) || identity
}

/*  */

function isKeyNotMatch (expect, actual) {
  if (Array.isArray(expect)) {
    return expect.indexOf(actual) === -1
  } else {
    return expect !== actual
  }
}

/**
 * Runtime helper for checking keyCodes from config.
 * exposed as Vue.prototype._k
 * passing in eventKeyName as last argument separately for backwards compat
 */
function checkKeyCodes (
  eventKeyCode,
  key,
  builtInKeyCode,
  eventKeyName,
  builtInKeyName
) {
  var mappedKeyCode = config.keyCodes[key] || builtInKeyCode;
  if (builtInKeyName && eventKeyName && !config.keyCodes[key]) {
    return isKeyNotMatch(builtInKeyName, eventKeyName)
  } else if (mappedKeyCode) {
    return isKeyNotMatch(mappedKeyCode, eventKeyCode)
  } else if (eventKeyName) {
    return hyphenate(eventKeyName) !== key
  }
}

/*  */

/**
 * Runtime helper for merging v-bind="object" into a VNode's data.
 */
function bindObjectProps (
  data,
  tag,
  value,
  asProp,
  isSync
) {
  if (value) {
    if (!isObject(value)) {
       true && warn(
        'v-bind without argument expects an Object or Array value',
        this
      );
    } else {
      if (Array.isArray(value)) {
        value = toObject(value);
      }
      var hash;
      var loop = function ( key ) {
        if (
          key === 'class' ||
          key === 'style' ||
          isReservedAttribute(key)
        ) {
          hash = data;
        } else {
          var type = data.attrs && data.attrs.type;
          hash = asProp || config.mustUseProp(tag, type, key)
            ? data.domProps || (data.domProps = {})
            : data.attrs || (data.attrs = {});
        }
        var camelizedKey = camelize(key);
        var hyphenatedKey = hyphenate(key);
        if (!(camelizedKey in hash) && !(hyphenatedKey in hash)) {
          hash[key] = value[key];

          if (isSync) {
            var on = data.on || (data.on = {});
            on[("update:" + key)] = function ($event) {
              value[key] = $event;
            };
          }
        }
      };

      for (var key in value) loop( key );
    }
  }
  return data
}

/*  */

/**
 * Runtime helper for rendering static trees.
 */
function renderStatic (
  index,
  isInFor
) {
  var cached = this._staticTrees || (this._staticTrees = []);
  var tree = cached[index];
  // if has already-rendered static tree and not inside v-for,
  // we can reuse the same tree.
  if (tree && !isInFor) {
    return tree
  }
  // otherwise, render a fresh tree.
  tree = cached[index] = this.$options.staticRenderFns[index].call(
    this._renderProxy,
    null,
    this // for render fns generated for functional component templates
  );
  markStatic(tree, ("__static__" + index), false);
  return tree
}

/**
 * Runtime helper for v-once.
 * Effectively it means marking the node as static with a unique key.
 */
function markOnce (
  tree,
  index,
  key
) {
  markStatic(tree, ("__once__" + index + (key ? ("_" + key) : "")), true);
  return tree
}

function markStatic (
  tree,
  key,
  isOnce
) {
  if (Array.isArray(tree)) {
    for (var i = 0; i < tree.length; i++) {
      if (tree[i] && typeof tree[i] !== 'string') {
        markStaticNode(tree[i], (key + "_" + i), isOnce);
      }
    }
  } else {
    markStaticNode(tree, key, isOnce);
  }
}

function markStaticNode (node, key, isOnce) {
  node.isStatic = true;
  node.key = key;
  node.isOnce = isOnce;
}

/*  */

function bindObjectListeners (data, value) {
  if (value) {
    if (!isPlainObject(value)) {
       true && warn(
        'v-on without argument expects an Object value',
        this
      );
    } else {
      var on = data.on = data.on ? extend({}, data.on) : {};
      for (var key in value) {
        var existing = on[key];
        var ours = value[key];
        on[key] = existing ? [].concat(existing, ours) : ours;
      }
    }
  }
  return data
}

/*  */

function resolveScopedSlots (
  fns, // see flow/vnode
  res,
  // the following are added in 2.6
  hasDynamicKeys,
  contentHashKey
) {
  res = res || { $stable: !hasDynamicKeys };
  for (var i = 0; i < fns.length; i++) {
    var slot = fns[i];
    if (Array.isArray(slot)) {
      resolveScopedSlots(slot, res, hasDynamicKeys);
    } else if (slot) {
      // marker for reverse proxying v-slot without scope on this.$slots
      if (slot.proxy) {
        slot.fn.proxy = true;
      }
      res[slot.key] = slot.fn;
    }
  }
  if (contentHashKey) {
    (res).$key = contentHashKey;
  }
  return res
}

/*  */

function bindDynamicKeys (baseObj, values) {
  for (var i = 0; i < values.length; i += 2) {
    var key = values[i];
    if (typeof key === 'string' && key) {
      baseObj[values[i]] = values[i + 1];
    } else if ( true && key !== '' && key !== null) {
      // null is a special value for explicitly removing a binding
      warn(
        ("Invalid value for dynamic directive argument (expected string or null): " + key),
        this
      );
    }
  }
  return baseObj
}

// helper to dynamically append modifier runtime markers to event names.
// ensure only append when value is already string, otherwise it will be cast
// to string and cause the type check to miss.
function prependModifier (value, symbol) {
  return typeof value === 'string' ? symbol + value : value
}

/*  */

function installRenderHelpers (target) {
  target._o = markOnce;
  target._n = toNumber;
  target._s = toString;
  target._l = renderList;
  target._t = renderSlot;
  target._q = looseEqual;
  target._i = looseIndexOf;
  target._m = renderStatic;
  target._f = resolveFilter;
  target._k = checkKeyCodes;
  target._b = bindObjectProps;
  target._v = createTextVNode;
  target._e = createEmptyVNode;
  target._u = resolveScopedSlots;
  target._g = bindObjectListeners;
  target._d = bindDynamicKeys;
  target._p = prependModifier;
}

/*  */

function FunctionalRenderContext (
  data,
  props,
  children,
  parent,
  Ctor
) {
  var this$1 = this;

  var options = Ctor.options;
  // ensure the createElement function in functional components
  // gets a unique context - this is necessary for correct named slot check
  var contextVm;
  if (hasOwn(parent, '_uid')) {
    contextVm = Object.create(parent);
    // $flow-disable-line
    contextVm._original = parent;
  } else {
    // the context vm passed in is a functional context as well.
    // in this case we want to make sure we are able to get a hold to the
    // real context instance.
    contextVm = parent;
    // $flow-disable-line
    parent = parent._original;
  }
  var isCompiled = isTrue(options._compiled);
  var needNormalization = !isCompiled;

  this.data = data;
  this.props = props;
  this.children = children;
  this.parent = parent;
  this.listeners = data.on || emptyObject;
  this.injections = resolveInject(options.inject, parent);
  this.slots = function () {
    if (!this$1.$slots) {
      normalizeScopedSlots(
        data.scopedSlots,
        this$1.$slots = resolveSlots(children, parent)
      );
    }
    return this$1.$slots
  };

  Object.defineProperty(this, 'scopedSlots', ({
    enumerable: true,
    get: function get () {
      return normalizeScopedSlots(data.scopedSlots, this.slots())
    }
  }));

  // support for compiled functional template
  if (isCompiled) {
    // exposing $options for renderStatic()
    this.$options = options;
    // pre-resolve slots for renderSlot()
    this.$slots = this.slots();
    this.$scopedSlots = normalizeScopedSlots(data.scopedSlots, this.$slots);
  }

  if (options._scopeId) {
    this._c = function (a, b, c, d) {
      var vnode = createElement(contextVm, a, b, c, d, needNormalization);
      if (vnode && !Array.isArray(vnode)) {
        vnode.fnScopeId = options._scopeId;
        vnode.fnContext = parent;
      }
      return vnode
    };
  } else {
    this._c = function (a, b, c, d) { return createElement(contextVm, a, b, c, d, needNormalization); };
  }
}

installRenderHelpers(FunctionalRenderContext.prototype);

function createFunctionalComponent (
  Ctor,
  propsData,
  data,
  contextVm,
  children
) {
  var options = Ctor.options;
  var props = {};
  var propOptions = options.props;
  if (isDef(propOptions)) {
    for (var key in propOptions) {
      props[key] = validateProp(key, propOptions, propsData || emptyObject);
    }
  } else {
    if (isDef(data.attrs)) { mergeProps(props, data.attrs); }
    if (isDef(data.props)) { mergeProps(props, data.props); }
  }

  var renderContext = new FunctionalRenderContext(
    data,
    props,
    children,
    contextVm,
    Ctor
  );

  var vnode = options.render.call(null, renderContext._c, renderContext);

  if (vnode instanceof VNode) {
    return cloneAndMarkFunctionalResult(vnode, data, renderContext.parent, options, renderContext)
  } else if (Array.isArray(vnode)) {
    var vnodes = normalizeChildren(vnode) || [];
    var res = new Array(vnodes.length);
    for (var i = 0; i < vnodes.length; i++) {
      res[i] = cloneAndMarkFunctionalResult(vnodes[i], data, renderContext.parent, options, renderContext);
    }
    return res
  }
}

function cloneAndMarkFunctionalResult (vnode, data, contextVm, options, renderContext) {
  // #7817 clone node before setting fnContext, otherwise if the node is reused
  // (e.g. it was from a cached normal slot) the fnContext causes named slots
  // that should not be matched to match.
  var clone = cloneVNode(vnode);
  clone.fnContext = contextVm;
  clone.fnOptions = options;
  if (true) {
    (clone.devtoolsMeta = clone.devtoolsMeta || {}).renderContext = renderContext;
  }
  if (data.slot) {
    (clone.data || (clone.data = {})).slot = data.slot;
  }
  return clone
}

function mergeProps (to, from) {
  for (var key in from) {
    to[camelize(key)] = from[key];
  }
}

/*  */

/*  */

/*  */

/*  */

// inline hooks to be invoked on component VNodes during patch
var componentVNodeHooks = {
  init: function init (vnode, hydrating) {
    if (
      vnode.componentInstance &&
      !vnode.componentInstance._isDestroyed &&
      vnode.data.keepAlive
    ) {
      // kept-alive components, treat as a patch
      var mountedNode = vnode; // work around flow
      componentVNodeHooks.prepatch(mountedNode, mountedNode);
    } else {
      var child = vnode.componentInstance = createComponentInstanceForVnode(
        vnode,
        activeInstance
      );
      child.$mount(hydrating ? vnode.elm : undefined, hydrating);
    }
  },

  prepatch: function prepatch (oldVnode, vnode) {
    var options = vnode.componentOptions;
    var child = vnode.componentInstance = oldVnode.componentInstance;
    updateChildComponent(
      child,
      options.propsData, // updated props
      options.listeners, // updated listeners
      vnode, // new parent vnode
      options.children // new children
    );
  },

  insert: function insert (vnode) {
    var context = vnode.context;
    var componentInstance = vnode.componentInstance;
    if (!componentInstance._isMounted) {
      callHook(componentInstance, 'onServiceCreated');
      callHook(componentInstance, 'onServiceAttached');
      componentInstance._isMounted = true;
      callHook(componentInstance, 'mounted');
    }
    if (vnode.data.keepAlive) {
      if (context._isMounted) {
        // vue-router#1212
        // During updates, a kept-alive component's child components may
        // change, so directly walking the tree here may call activated hooks
        // on incorrect children. Instead we push them into a queue which will
        // be processed after the whole patch process ended.
        queueActivatedComponent(componentInstance);
      } else {
        activateChildComponent(componentInstance, true /* direct */);
      }
    }
  },

  destroy: function destroy (vnode) {
    var componentInstance = vnode.componentInstance;
    if (!componentInstance._isDestroyed) {
      if (!vnode.data.keepAlive) {
        componentInstance.$destroy();
      } else {
        deactivateChildComponent(componentInstance, true /* direct */);
      }
    }
  }
};

var hooksToMerge = Object.keys(componentVNodeHooks);

function createComponent (
  Ctor,
  data,
  context,
  children,
  tag
) {
  if (isUndef(Ctor)) {
    return
  }

  var baseCtor = context.$options._base;

  // plain options object: turn it into a constructor
  if (isObject(Ctor)) {
    Ctor = baseCtor.extend(Ctor);
  }

  // if at this stage it's not a constructor or an async component factory,
  // reject.
  if (typeof Ctor !== 'function') {
    if (true) {
      warn(("Invalid Component definition: " + (String(Ctor))), context);
    }
    return
  }

  // async component
  var asyncFactory;
  if (isUndef(Ctor.cid)) {
    asyncFactory = Ctor;
    Ctor = resolveAsyncComponent(asyncFactory, baseCtor);
    if (Ctor === undefined) {
      // return a placeholder node for async component, which is rendered
      // as a comment node but preserves all the raw information for the node.
      // the information will be used for async server-rendering and hydration.
      return createAsyncPlaceholder(
        asyncFactory,
        data,
        context,
        children,
        tag
      )
    }
  }

  data = data || {};

  // resolve constructor options in case global mixins are applied after
  // component constructor creation
  resolveConstructorOptions(Ctor);

  // transform component v-model data into props & events
  if (isDef(data.model)) {
    transformModel(Ctor.options, data);
  }

  // extract props
  var propsData = extractPropsFromVNodeData(data, Ctor, tag, context); // fixed by xxxxxx

  // functional component
  if (isTrue(Ctor.options.functional)) {
    return createFunctionalComponent(Ctor, propsData, data, context, children)
  }

  // extract listeners, since these needs to be treated as
  // child component listeners instead of DOM listeners
  var listeners = data.on;
  // replace with listeners with .native modifier
  // so it gets processed during parent component patch.
  data.on = data.nativeOn;

  if (isTrue(Ctor.options.abstract)) {
    // abstract components do not keep anything
    // other than props & listeners & slot

    // work around flow
    var slot = data.slot;
    data = {};
    if (slot) {
      data.slot = slot;
    }
  }

  // install component management hooks onto the placeholder node
  installComponentHooks(data);

  // return a placeholder vnode
  var name = Ctor.options.name || tag;
  var vnode = new VNode(
    ("vue-component-" + (Ctor.cid) + (name ? ("-" + name) : '')),
    data, undefined, undefined, undefined, context,
    { Ctor: Ctor, propsData: propsData, listeners: listeners, tag: tag, children: children },
    asyncFactory
  );

  return vnode
}

function createComponentInstanceForVnode (
  vnode, // we know it's MountedComponentVNode but flow doesn't
  parent // activeInstance in lifecycle state
) {
  var options = {
    _isComponent: true,
    _parentVnode: vnode,
    parent: parent
  };
  // check inline-template render functions
  var inlineTemplate = vnode.data.inlineTemplate;
  if (isDef(inlineTemplate)) {
    options.render = inlineTemplate.render;
    options.staticRenderFns = inlineTemplate.staticRenderFns;
  }
  return new vnode.componentOptions.Ctor(options)
}

function installComponentHooks (data) {
  var hooks = data.hook || (data.hook = {});
  for (var i = 0; i < hooksToMerge.length; i++) {
    var key = hooksToMerge[i];
    var existing = hooks[key];
    var toMerge = componentVNodeHooks[key];
    if (existing !== toMerge && !(existing && existing._merged)) {
      hooks[key] = existing ? mergeHook$1(toMerge, existing) : toMerge;
    }
  }
}

function mergeHook$1 (f1, f2) {
  var merged = function (a, b) {
    // flow complains about extra args which is why we use any
    f1(a, b);
    f2(a, b);
  };
  merged._merged = true;
  return merged
}

// transform component v-model info (value and callback) into
// prop and event handler respectively.
function transformModel (options, data) {
  var prop = (options.model && options.model.prop) || 'value';
  var event = (options.model && options.model.event) || 'input'
  ;(data.attrs || (data.attrs = {}))[prop] = data.model.value;
  var on = data.on || (data.on = {});
  var existing = on[event];
  var callback = data.model.callback;
  if (isDef(existing)) {
    if (
      Array.isArray(existing)
        ? existing.indexOf(callback) === -1
        : existing !== callback
    ) {
      on[event] = [callback].concat(existing);
    }
  } else {
    on[event] = callback;
  }
}

/*  */

var SIMPLE_NORMALIZE = 1;
var ALWAYS_NORMALIZE = 2;

// wrapper function for providing a more flexible interface
// without getting yelled at by flow
function createElement (
  context,
  tag,
  data,
  children,
  normalizationType,
  alwaysNormalize
) {
  if (Array.isArray(data) || isPrimitive(data)) {
    normalizationType = children;
    children = data;
    data = undefined;
  }
  if (isTrue(alwaysNormalize)) {
    normalizationType = ALWAYS_NORMALIZE;
  }
  return _createElement(context, tag, data, children, normalizationType)
}

function _createElement (
  context,
  tag,
  data,
  children,
  normalizationType
) {
  if (isDef(data) && isDef((data).__ob__)) {
     true && warn(
      "Avoid using observed data object as vnode data: " + (JSON.stringify(data)) + "\n" +
      'Always create fresh vnode data objects in each render!',
      context
    );
    return createEmptyVNode()
  }
  // object syntax in v-bind
  if (isDef(data) && isDef(data.is)) {
    tag = data.is;
  }
  if (!tag) {
    // in case of component :is set to falsy value
    return createEmptyVNode()
  }
  // warn against non-primitive key
  if ( true &&
    isDef(data) && isDef(data.key) && !isPrimitive(data.key)
  ) {
    {
      warn(
        'Avoid using non-primitive value as key, ' +
        'use string/number value instead.',
        context
      );
    }
  }
  // support single function children as default scoped slot
  if (Array.isArray(children) &&
    typeof children[0] === 'function'
  ) {
    data = data || {};
    data.scopedSlots = { default: children[0] };
    children.length = 0;
  }
  if (normalizationType === ALWAYS_NORMALIZE) {
    children = normalizeChildren(children);
  } else if (normalizationType === SIMPLE_NORMALIZE) {
    children = simpleNormalizeChildren(children);
  }
  var vnode, ns;
  if (typeof tag === 'string') {
    var Ctor;
    ns = (context.$vnode && context.$vnode.ns) || config.getTagNamespace(tag);
    if (config.isReservedTag(tag)) {
      // platform built-in elements
      if ( true && isDef(data) && isDef(data.nativeOn)) {
        warn(
          ("The .native modifier for v-on is only valid on components but it was used on <" + tag + ">."),
          context
        );
      }
      vnode = new VNode(
        config.parsePlatformTagName(tag), data, children,
        undefined, undefined, context
      );
    } else if ((!data || !data.pre) && isDef(Ctor = resolveAsset(context.$options, 'components', tag))) {
      // component
      vnode = createComponent(Ctor, data, context, children, tag);
    } else {
      // unknown or unlisted namespaced elements
      // check at runtime because it may get assigned a namespace when its
      // parent normalizes children
      vnode = new VNode(
        tag, data, children,
        undefined, undefined, context
      );
    }
  } else {
    // direct component options / constructor
    vnode = createComponent(tag, data, context, children);
  }
  if (Array.isArray(vnode)) {
    return vnode
  } else if (isDef(vnode)) {
    if (isDef(ns)) { applyNS(vnode, ns); }
    if (isDef(data)) { registerDeepBindings(data); }
    return vnode
  } else {
    return createEmptyVNode()
  }
}

function applyNS (vnode, ns, force) {
  vnode.ns = ns;
  if (vnode.tag === 'foreignObject') {
    // use default namespace inside foreignObject
    ns = undefined;
    force = true;
  }
  if (isDef(vnode.children)) {
    for (var i = 0, l = vnode.children.length; i < l; i++) {
      var child = vnode.children[i];
      if (isDef(child.tag) && (
        isUndef(child.ns) || (isTrue(force) && child.tag !== 'svg'))) {
        applyNS(child, ns, force);
      }
    }
  }
}

// ref #5318
// necessary to ensure parent re-render when deep bindings like :style and
// :class are used on slot nodes
function registerDeepBindings (data) {
  if (isObject(data.style)) {
    traverse(data.style);
  }
  if (isObject(data.class)) {
    traverse(data.class);
  }
}

/*  */

function initRender (vm) {
  vm._vnode = null; // the root of the child tree
  vm._staticTrees = null; // v-once cached trees
  var options = vm.$options;
  var parentVnode = vm.$vnode = options._parentVnode; // the placeholder node in parent tree
  var renderContext = parentVnode && parentVnode.context;
  vm.$slots = resolveSlots(options._renderChildren, renderContext);
  vm.$scopedSlots = emptyObject;
  // bind the createElement fn to this instance
  // so that we get proper render context inside it.
  // args order: tag, data, children, normalizationType, alwaysNormalize
  // internal version is used by render functions compiled from templates
  vm._c = function (a, b, c, d) { return createElement(vm, a, b, c, d, false); };
  // normalization is always applied for the public version, used in
  // user-written render functions.
  vm.$createElement = function (a, b, c, d) { return createElement(vm, a, b, c, d, true); };

  // $attrs & $listeners are exposed for easier HOC creation.
  // they need to be reactive so that HOCs using them are always updated
  var parentData = parentVnode && parentVnode.data;

  /* istanbul ignore else */
  if (true) {
    defineReactive$$1(vm, '$attrs', parentData && parentData.attrs || emptyObject, function () {
      !isUpdatingChildComponent && warn("$attrs is readonly.", vm);
    }, true);
    defineReactive$$1(vm, '$listeners', options._parentListeners || emptyObject, function () {
      !isUpdatingChildComponent && warn("$listeners is readonly.", vm);
    }, true);
  } else {}
}

var currentRenderingInstance = null;

function renderMixin (Vue) {
  // install runtime convenience helpers
  installRenderHelpers(Vue.prototype);

  Vue.prototype.$nextTick = function (fn) {
    return nextTick(fn, this)
  };

  Vue.prototype._render = function () {
    var vm = this;
    var ref = vm.$options;
    var render = ref.render;
    var _parentVnode = ref._parentVnode;

    if (_parentVnode) {
      vm.$scopedSlots = normalizeScopedSlots(
        _parentVnode.data.scopedSlots,
        vm.$slots,
        vm.$scopedSlots
      );
    }

    // set parent vnode. this allows render functions to have access
    // to the data on the placeholder node.
    vm.$vnode = _parentVnode;
    // render self
    var vnode;
    try {
      // There's no need to maintain a stack because all render fns are called
      // separately from one another. Nested component's render fns are called
      // when parent component is patched.
      currentRenderingInstance = vm;
      vnode = render.call(vm._renderProxy, vm.$createElement);
    } catch (e) {
      handleError(e, vm, "render");
      // return error render result,
      // or previous vnode to prevent render error causing blank component
      /* istanbul ignore else */
      if ( true && vm.$options.renderError) {
        try {
          vnode = vm.$options.renderError.call(vm._renderProxy, vm.$createElement, e);
        } catch (e) {
          handleError(e, vm, "renderError");
          vnode = vm._vnode;
        }
      } else {
        vnode = vm._vnode;
      }
    } finally {
      currentRenderingInstance = null;
    }
    // if the returned array contains only a single node, allow it
    if (Array.isArray(vnode) && vnode.length === 1) {
      vnode = vnode[0];
    }
    // return empty vnode in case the render function errored out
    if (!(vnode instanceof VNode)) {
      if ( true && Array.isArray(vnode)) {
        warn(
          'Multiple root nodes returned from render function. Render function ' +
          'should return a single root node.',
          vm
        );
      }
      vnode = createEmptyVNode();
    }
    // set parent
    vnode.parent = _parentVnode;
    return vnode
  };
}

/*  */

function ensureCtor (comp, base) {
  if (
    comp.__esModule ||
    (hasSymbol && comp[Symbol.toStringTag] === 'Module')
  ) {
    comp = comp.default;
  }
  return isObject(comp)
    ? base.extend(comp)
    : comp
}

function createAsyncPlaceholder (
  factory,
  data,
  context,
  children,
  tag
) {
  var node = createEmptyVNode();
  node.asyncFactory = factory;
  node.asyncMeta = { data: data, context: context, children: children, tag: tag };
  return node
}

function resolveAsyncComponent (
  factory,
  baseCtor
) {
  if (isTrue(factory.error) && isDef(factory.errorComp)) {
    return factory.errorComp
  }

  if (isDef(factory.resolved)) {
    return factory.resolved
  }

  var owner = currentRenderingInstance;
  if (owner && isDef(factory.owners) && factory.owners.indexOf(owner) === -1) {
    // already pending
    factory.owners.push(owner);
  }

  if (isTrue(factory.loading) && isDef(factory.loadingComp)) {
    return factory.loadingComp
  }

  if (owner && !isDef(factory.owners)) {
    var owners = factory.owners = [owner];
    var sync = true;
    var timerLoading = null;
    var timerTimeout = null

    ;(owner).$on('hook:destroyed', function () { return remove(owners, owner); });

    var forceRender = function (renderCompleted) {
      for (var i = 0, l = owners.length; i < l; i++) {
        (owners[i]).$forceUpdate();
      }

      if (renderCompleted) {
        owners.length = 0;
        if (timerLoading !== null) {
          clearTimeout(timerLoading);
          timerLoading = null;
        }
        if (timerTimeout !== null) {
          clearTimeout(timerTimeout);
          timerTimeout = null;
        }
      }
    };

    var resolve = once(function (res) {
      // cache resolved
      factory.resolved = ensureCtor(res, baseCtor);
      // invoke callbacks only if this is not a synchronous resolve
      // (async resolves are shimmed as synchronous during SSR)
      if (!sync) {
        forceRender(true);
      } else {
        owners.length = 0;
      }
    });

    var reject = once(function (reason) {
       true && warn(
        "Failed to resolve async component: " + (String(factory)) +
        (reason ? ("\nReason: " + reason) : '')
      );
      if (isDef(factory.errorComp)) {
        factory.error = true;
        forceRender(true);
      }
    });

    var res = factory(resolve, reject);

    if (isObject(res)) {
      if (isPromise(res)) {
        // () => Promise
        if (isUndef(factory.resolved)) {
          res.then(resolve, reject);
        }
      } else if (isPromise(res.component)) {
        res.component.then(resolve, reject);

        if (isDef(res.error)) {
          factory.errorComp = ensureCtor(res.error, baseCtor);
        }

        if (isDef(res.loading)) {
          factory.loadingComp = ensureCtor(res.loading, baseCtor);
          if (res.delay === 0) {
            factory.loading = true;
          } else {
            timerLoading = setTimeout(function () {
              timerLoading = null;
              if (isUndef(factory.resolved) && isUndef(factory.error)) {
                factory.loading = true;
                forceRender(false);
              }
            }, res.delay || 200);
          }
        }

        if (isDef(res.timeout)) {
          timerTimeout = setTimeout(function () {
            timerTimeout = null;
            if (isUndef(factory.resolved)) {
              reject(
                 true
                  ? ("timeout (" + (res.timeout) + "ms)")
                  : undefined
              );
            }
          }, res.timeout);
        }
      }
    }

    sync = false;
    // return in case resolved synchronously
    return factory.loading
      ? factory.loadingComp
      : factory.resolved
  }
}

/*  */

function isAsyncPlaceholder (node) {
  return node.isComment && node.asyncFactory
}

/*  */

function getFirstComponentChild (children) {
  if (Array.isArray(children)) {
    for (var i = 0; i < children.length; i++) {
      var c = children[i];
      if (isDef(c) && (isDef(c.componentOptions) || isAsyncPlaceholder(c))) {
        return c
      }
    }
  }
}

/*  */

/*  */

function initEvents (vm) {
  vm._events = Object.create(null);
  vm._hasHookEvent = false;
  // init parent attached events
  var listeners = vm.$options._parentListeners;
  if (listeners) {
    updateComponentListeners(vm, listeners);
  }
}

var target;

function add (event, fn) {
  target.$on(event, fn);
}

function remove$1 (event, fn) {
  target.$off(event, fn);
}

function createOnceHandler (event, fn) {
  var _target = target;
  return function onceHandler () {
    var res = fn.apply(null, arguments);
    if (res !== null) {
      _target.$off(event, onceHandler);
    }
  }
}

function updateComponentListeners (
  vm,
  listeners,
  oldListeners
) {
  target = vm;
  updateListeners(listeners, oldListeners || {}, add, remove$1, createOnceHandler, vm);
  target = undefined;
}

function eventsMixin (Vue) {
  var hookRE = /^hook:/;
  Vue.prototype.$on = function (event, fn) {
    var vm = this;
    if (Array.isArray(event)) {
      for (var i = 0, l = event.length; i < l; i++) {
        vm.$on(event[i], fn);
      }
    } else {
      (vm._events[event] || (vm._events[event] = [])).push(fn);
      // optimize hook:event cost by using a boolean flag marked at registration
      // instead of a hash lookup
      if (hookRE.test(event)) {
        vm._hasHookEvent = true;
      }
    }
    return vm
  };

  Vue.prototype.$once = function (event, fn) {
    var vm = this;
    function on () {
      vm.$off(event, on);
      fn.apply(vm, arguments);
    }
    on.fn = fn;
    vm.$on(event, on);
    return vm
  };

  Vue.prototype.$off = function (event, fn) {
    var vm = this;
    // all
    if (!arguments.length) {
      vm._events = Object.create(null);
      return vm
    }
    // array of events
    if (Array.isArray(event)) {
      for (var i$1 = 0, l = event.length; i$1 < l; i$1++) {
        vm.$off(event[i$1], fn);
      }
      return vm
    }
    // specific event
    var cbs = vm._events[event];
    if (!cbs) {
      return vm
    }
    if (!fn) {
      vm._events[event] = null;
      return vm
    }
    // specific handler
    var cb;
    var i = cbs.length;
    while (i--) {
      cb = cbs[i];
      if (cb === fn || cb.fn === fn) {
        cbs.splice(i, 1);
        break
      }
    }
    return vm
  };

  Vue.prototype.$emit = function (event) {
    var vm = this;
    if (true) {
      var lowerCaseEvent = event.toLowerCase();
      if (lowerCaseEvent !== event && vm._events[lowerCaseEvent]) {
        tip(
          "Event \"" + lowerCaseEvent + "\" is emitted in component " +
          (formatComponentName(vm)) + " but the handler is registered for \"" + event + "\". " +
          "Note that HTML attributes are case-insensitive and you cannot use " +
          "v-on to listen to camelCase events when using in-DOM templates. " +
          "You should probably use \"" + (hyphenate(event)) + "\" instead of \"" + event + "\"."
        );
      }
    }
    var cbs = vm._events[event];
    if (cbs) {
      cbs = cbs.length > 1 ? toArray(cbs) : cbs;
      var args = toArray(arguments, 1);
      var info = "event handler for \"" + event + "\"";
      for (var i = 0, l = cbs.length; i < l; i++) {
        invokeWithErrorHandling(cbs[i], vm, args, vm, info);
      }
    }
    return vm
  };
}

/*  */

var activeInstance = null;
var isUpdatingChildComponent = false;

function setActiveInstance(vm) {
  var prevActiveInstance = activeInstance;
  activeInstance = vm;
  return function () {
    activeInstance = prevActiveInstance;
  }
}

function initLifecycle (vm) {
  var options = vm.$options;

  // locate first non-abstract parent
  var parent = options.parent;
  if (parent && !options.abstract) {
    while (parent.$options.abstract && parent.$parent) {
      parent = parent.$parent;
    }
    parent.$children.push(vm);
  }

  vm.$parent = parent;
  vm.$root = parent ? parent.$root : vm;

  vm.$children = [];
  vm.$refs = {};

  vm._watcher = null;
  vm._inactive = null;
  vm._directInactive = false;
  vm._isMounted = false;
  vm._isDestroyed = false;
  vm._isBeingDestroyed = false;
}

function lifecycleMixin (Vue) {
  Vue.prototype._update = function (vnode, hydrating) {
    var vm = this;
    var prevEl = vm.$el;
    var prevVnode = vm._vnode;
    var restoreActiveInstance = setActiveInstance(vm);
    vm._vnode = vnode;
    // Vue.prototype.__patch__ is injected in entry points
    // based on the rendering backend used.
    if (!prevVnode) {
      // initial render
      vm.$el = vm.__patch__(vm.$el, vnode, hydrating, false /* removeOnly */);
    } else {
      // updates
      vm.$el = vm.__patch__(prevVnode, vnode);
    }
    restoreActiveInstance();
    // update __vue__ reference
    if (prevEl) {
      prevEl.__vue__ = null;
    }
    if (vm.$el) {
      vm.$el.__vue__ = vm;
    }
    // if parent is an HOC, update its $el as well
    if (vm.$vnode && vm.$parent && vm.$vnode === vm.$parent._vnode) {
      vm.$parent.$el = vm.$el;
    }
    // updated hook is called by the scheduler to ensure that children are
    // updated in a parent's updated hook.
  };

  Vue.prototype.$forceUpdate = function () {
    var vm = this;
    if (vm._watcher) {
      vm._watcher.update();
    }
  };

  Vue.prototype.$destroy = function () {
    var vm = this;
    if (vm._isBeingDestroyed) {
      return
    }
    callHook(vm, 'beforeDestroy');
    vm._isBeingDestroyed = true;
    // remove self from parent
    var parent = vm.$parent;
    if (parent && !parent._isBeingDestroyed && !vm.$options.abstract) {
      remove(parent.$children, vm);
    }
    // teardown watchers
    if (vm._watcher) {
      vm._watcher.teardown();
    }
    var i = vm._watchers.length;
    while (i--) {
      vm._watchers[i].teardown();
    }
    // remove reference from data ob
    // frozen object may not have observer.
    if (vm._data.__ob__) {
      vm._data.__ob__.vmCount--;
    }
    // call the last hook...
    vm._isDestroyed = true;
    // invoke destroy hooks on current rendered tree
    vm.__patch__(vm._vnode, null);
    // fire destroyed hook
    callHook(vm, 'destroyed');
    // turn off all instance listeners.
    vm.$off();
    // remove __vue__ reference
    if (vm.$el) {
      vm.$el.__vue__ = null;
    }
    // release circular reference (#6759)
    if (vm.$vnode) {
      vm.$vnode.parent = null;
    }
  };
}

function updateChildComponent (
  vm,
  propsData,
  listeners,
  parentVnode,
  renderChildren
) {
  if (true) {
    isUpdatingChildComponent = true;
  }

  // determine whether component has slot children
  // we need to do this before overwriting $options._renderChildren.

  // check if there are dynamic scopedSlots (hand-written or compiled but with
  // dynamic slot names). Static scoped slots compiled from template has the
  // "$stable" marker.
  var newScopedSlots = parentVnode.data.scopedSlots;
  var oldScopedSlots = vm.$scopedSlots;
  var hasDynamicScopedSlot = !!(
    (newScopedSlots && !newScopedSlots.$stable) ||
    (oldScopedSlots !== emptyObject && !oldScopedSlots.$stable) ||
    (newScopedSlots && vm.$scopedSlots.$key !== newScopedSlots.$key)
  );

  // Any static slot children from the parent may have changed during parent's
  // update. Dynamic scoped slots may also have changed. In such cases, a forced
  // update is necessary to ensure correctness.
  var needsForceUpdate = !!(
    renderChildren ||               // has new static slots
    vm.$options._renderChildren ||  // has old static slots
    hasDynamicScopedSlot
  );

  vm.$options._parentVnode = parentVnode;
  vm.$vnode = parentVnode; // update vm's placeholder node without re-render

  if (vm._vnode) { // update child tree's parent
    vm._vnode.parent = parentVnode;
  }
  vm.$options._renderChildren = renderChildren;

  // update $attrs and $listeners hash
  // these are also reactive so they may trigger child update if the child
  // used them during render
  vm.$attrs = parentVnode.data.attrs || emptyObject;
  vm.$listeners = listeners || emptyObject;

  // update props
  if (propsData && vm.$options.props) {
    toggleObserving(false);
    var props = vm._props;
    var propKeys = vm.$options._propKeys || [];
    for (var i = 0; i < propKeys.length; i++) {
      var key = propKeys[i];
      var propOptions = vm.$options.props; // wtf flow?
      props[key] = validateProp(key, propOptions, propsData, vm);
    }
    toggleObserving(true);
    // keep a copy of raw propsData
    vm.$options.propsData = propsData;
  }
  
  // fixed by xxxxxx update properties(mp runtime)
  vm._$updateProperties && vm._$updateProperties(vm);
  
  // update listeners
  listeners = listeners || emptyObject;
  var oldListeners = vm.$options._parentListeners;
  vm.$options._parentListeners = listeners;
  updateComponentListeners(vm, listeners, oldListeners);

  // resolve slots + force update if has children
  if (needsForceUpdate) {
    vm.$slots = resolveSlots(renderChildren, parentVnode.context);
    vm.$forceUpdate();
  }

  if (true) {
    isUpdatingChildComponent = false;
  }
}

function isInInactiveTree (vm) {
  while (vm && (vm = vm.$parent)) {
    if (vm._inactive) { return true }
  }
  return false
}

function activateChildComponent (vm, direct) {
  if (direct) {
    vm._directInactive = false;
    if (isInInactiveTree(vm)) {
      return
    }
  } else if (vm._directInactive) {
    return
  }
  if (vm._inactive || vm._inactive === null) {
    vm._inactive = false;
    for (var i = 0; i < vm.$children.length; i++) {
      activateChildComponent(vm.$children[i]);
    }
    callHook(vm, 'activated');
  }
}

function deactivateChildComponent (vm, direct) {
  if (direct) {
    vm._directInactive = true;
    if (isInInactiveTree(vm)) {
      return
    }
  }
  if (!vm._inactive) {
    vm._inactive = true;
    for (var i = 0; i < vm.$children.length; i++) {
      deactivateChildComponent(vm.$children[i]);
    }
    callHook(vm, 'deactivated');
  }
}

function callHook (vm, hook) {
  // #7573 disable dep collection when invoking lifecycle hooks
  pushTarget();
  var handlers = vm.$options[hook];
  var info = hook + " hook";
  if (handlers) {
    for (var i = 0, j = handlers.length; i < j; i++) {
      invokeWithErrorHandling(handlers[i], vm, null, vm, info);
    }
  }
  if (vm._hasHookEvent) {
    vm.$emit('hook:' + hook);
  }
  popTarget();
}

/*  */

var MAX_UPDATE_COUNT = 100;

var queue = [];
var activatedChildren = [];
var has = {};
var circular = {};
var waiting = false;
var flushing = false;
var index = 0;

/**
 * Reset the scheduler's state.
 */
function resetSchedulerState () {
  index = queue.length = activatedChildren.length = 0;
  has = {};
  if (true) {
    circular = {};
  }
  waiting = flushing = false;
}

// Async edge case #6566 requires saving the timestamp when event listeners are
// attached. However, calling performance.now() has a perf overhead especially
// if the page has thousands of event listeners. Instead, we take a timestamp
// every time the scheduler flushes and use that for all event listeners
// attached during that flush.
var currentFlushTimestamp = 0;

// Async edge case fix requires storing an event listener's attach timestamp.
var getNow = Date.now;

// Determine what event timestamp the browser is using. Annoyingly, the
// timestamp can either be hi-res (relative to page load) or low-res
// (relative to UNIX epoch), so in order to compare time we have to use the
// same timestamp type when saving the flush timestamp.
// All IE versions use low-res event timestamps, and have problematic clock
// implementations (#9632)
if (inBrowser && !isIE) {
  var performance = window.performance;
  if (
    performance &&
    typeof performance.now === 'function' &&
    getNow() > document.createEvent('Event').timeStamp
  ) {
    // if the event timestamp, although evaluated AFTER the Date.now(), is
    // smaller than it, it means the event is using a hi-res timestamp,
    // and we need to use the hi-res version for event listener timestamps as
    // well.
    getNow = function () { return performance.now(); };
  }
}

/**
 * Flush both queues and run the watchers.
 */
function flushSchedulerQueue () {
  currentFlushTimestamp = getNow();
  flushing = true;
  var watcher, id;

  // Sort queue before flush.
  // This ensures that:
  // 1. Components are updated from parent to child. (because parent is always
  //    created before the child)
  // 2. A component's user watchers are run before its render watcher (because
  //    user watchers are created before the render watcher)
  // 3. If a component is destroyed during a parent component's watcher run,
  //    its watchers can be skipped.
  queue.sort(function (a, b) { return a.id - b.id; });

  // do not cache length because more watchers might be pushed
  // as we run existing watchers
  for (index = 0; index < queue.length; index++) {
    watcher = queue[index];
    if (watcher.before) {
      watcher.before();
    }
    id = watcher.id;
    has[id] = null;
    watcher.run();
    // in dev build, check and stop circular updates.
    if ( true && has[id] != null) {
      circular[id] = (circular[id] || 0) + 1;
      if (circular[id] > MAX_UPDATE_COUNT) {
        warn(
          'You may have an infinite update loop ' + (
            watcher.user
              ? ("in watcher with expression \"" + (watcher.expression) + "\"")
              : "in a component render function."
          ),
          watcher.vm
        );
        break
      }
    }
  }

  // keep copies of post queues before resetting state
  var activatedQueue = activatedChildren.slice();
  var updatedQueue = queue.slice();

  resetSchedulerState();

  // call component updated and activated hooks
  callActivatedHooks(activatedQueue);
  callUpdatedHooks(updatedQueue);

  // devtool hook
  /* istanbul ignore if */
  if (devtools && config.devtools) {
    devtools.emit('flush');
  }
}

function callUpdatedHooks (queue) {
  var i = queue.length;
  while (i--) {
    var watcher = queue[i];
    var vm = watcher.vm;
    if (vm._watcher === watcher && vm._isMounted && !vm._isDestroyed) {
      callHook(vm, 'updated');
    }
  }
}

/**
 * Queue a kept-alive component that was activated during patch.
 * The queue will be processed after the entire tree has been patched.
 */
function queueActivatedComponent (vm) {
  // setting _inactive to false here so that a render function can
  // rely on checking whether it's in an inactive tree (e.g. router-view)
  vm._inactive = false;
  activatedChildren.push(vm);
}

function callActivatedHooks (queue) {
  for (var i = 0; i < queue.length; i++) {
    queue[i]._inactive = true;
    activateChildComponent(queue[i], true /* true */);
  }
}

/**
 * Push a watcher into the watcher queue.
 * Jobs with duplicate IDs will be skipped unless it's
 * pushed when the queue is being flushed.
 */
function queueWatcher (watcher) {
  var id = watcher.id;
  if (has[id] == null) {
    has[id] = true;
    if (!flushing) {
      queue.push(watcher);
    } else {
      // if already flushing, splice the watcher based on its id
      // if already past its id, it will be run next immediately.
      var i = queue.length - 1;
      while (i > index && queue[i].id > watcher.id) {
        i--;
      }
      queue.splice(i + 1, 0, watcher);
    }
    // queue the flush
    if (!waiting) {
      waiting = true;

      if ( true && !config.async) {
        flushSchedulerQueue();
        return
      }
      nextTick(flushSchedulerQueue);
    }
  }
}

/*  */



var uid$2 = 0;

/**
 * A watcher parses an expression, collects dependencies,
 * and fires callback when the expression value changes.
 * This is used for both the $watch() api and directives.
 */
var Watcher = function Watcher (
  vm,
  expOrFn,
  cb,
  options,
  isRenderWatcher
) {
  this.vm = vm;
  if (isRenderWatcher) {
    vm._watcher = this;
  }
  vm._watchers.push(this);
  // options
  if (options) {
    this.deep = !!options.deep;
    this.user = !!options.user;
    this.lazy = !!options.lazy;
    this.sync = !!options.sync;
    this.before = options.before;
  } else {
    this.deep = this.user = this.lazy = this.sync = false;
  }
  this.cb = cb;
  this.id = ++uid$2; // uid for batching
  this.active = true;
  this.dirty = this.lazy; // for lazy watchers
  this.deps = [];
  this.newDeps = [];
  this.depIds = new _Set();
  this.newDepIds = new _Set();
  this.expression =  true
    ? expOrFn.toString()
    : undefined;
  // parse expression for getter
  if (typeof expOrFn === 'function') {
    this.getter = expOrFn;
  } else {
    this.getter = parsePath(expOrFn);
    if (!this.getter) {
      this.getter = noop;
       true && warn(
        "Failed watching path: \"" + expOrFn + "\" " +
        'Watcher only accepts simple dot-delimited paths. ' +
        'For full control, use a function instead.',
        vm
      );
    }
  }
  this.value = this.lazy
    ? undefined
    : this.get();
};

/**
 * Evaluate the getter, and re-collect dependencies.
 */
Watcher.prototype.get = function get () {
  pushTarget(this);
  var value;
  var vm = this.vm;
  try {
    value = this.getter.call(vm, vm);
  } catch (e) {
    if (this.user) {
      handleError(e, vm, ("getter for watcher \"" + (this.expression) + "\""));
    } else {
      throw e
    }
  } finally {
    // "touch" every property so they are all tracked as
    // dependencies for deep watching
    if (this.deep) {
      traverse(value);
    }
    popTarget();
    this.cleanupDeps();
  }
  return value
};

/**
 * Add a dependency to this directive.
 */
Watcher.prototype.addDep = function addDep (dep) {
  var id = dep.id;
  if (!this.newDepIds.has(id)) {
    this.newDepIds.add(id);
    this.newDeps.push(dep);
    if (!this.depIds.has(id)) {
      dep.addSub(this);
    }
  }
};

/**
 * Clean up for dependency collection.
 */
Watcher.prototype.cleanupDeps = function cleanupDeps () {
  var i = this.deps.length;
  while (i--) {
    var dep = this.deps[i];
    if (!this.newDepIds.has(dep.id)) {
      dep.removeSub(this);
    }
  }
  var tmp = this.depIds;
  this.depIds = this.newDepIds;
  this.newDepIds = tmp;
  this.newDepIds.clear();
  tmp = this.deps;
  this.deps = this.newDeps;
  this.newDeps = tmp;
  this.newDeps.length = 0;
};

/**
 * Subscriber interface.
 * Will be called when a dependency changes.
 */
Watcher.prototype.update = function update () {
  /* istanbul ignore else */
  if (this.lazy) {
    this.dirty = true;
  } else if (this.sync) {
    this.run();
  } else {
    queueWatcher(this);
  }
};

/**
 * Scheduler job interface.
 * Will be called by the scheduler.
 */
Watcher.prototype.run = function run () {
  if (this.active) {
    var value = this.get();
    if (
      value !== this.value ||
      // Deep watchers and watchers on Object/Arrays should fire even
      // when the value is the same, because the value may
      // have mutated.
      isObject(value) ||
      this.deep
    ) {
      // set new value
      var oldValue = this.value;
      this.value = value;
      if (this.user) {
        try {
          this.cb.call(this.vm, value, oldValue);
        } catch (e) {
          handleError(e, this.vm, ("callback for watcher \"" + (this.expression) + "\""));
        }
      } else {
        this.cb.call(this.vm, value, oldValue);
      }
    }
  }
};

/**
 * Evaluate the value of the watcher.
 * This only gets called for lazy watchers.
 */
Watcher.prototype.evaluate = function evaluate () {
  this.value = this.get();
  this.dirty = false;
};

/**
 * Depend on all deps collected by this watcher.
 */
Watcher.prototype.depend = function depend () {
  var i = this.deps.length;
  while (i--) {
    this.deps[i].depend();
  }
};

/**
 * Remove self from all dependencies' subscriber list.
 */
Watcher.prototype.teardown = function teardown () {
  if (this.active) {
    // remove self from vm's watcher list
    // this is a somewhat expensive operation so we skip it
    // if the vm is being destroyed.
    if (!this.vm._isBeingDestroyed) {
      remove(this.vm._watchers, this);
    }
    var i = this.deps.length;
    while (i--) {
      this.deps[i].removeSub(this);
    }
    this.active = false;
  }
};

/*  */

var sharedPropertyDefinition = {
  enumerable: true,
  configurable: true,
  get: noop,
  set: noop
};

function proxy (target, sourceKey, key) {
  sharedPropertyDefinition.get = function proxyGetter () {
    return this[sourceKey][key]
  };
  sharedPropertyDefinition.set = function proxySetter (val) {
    this[sourceKey][key] = val;
  };
  Object.defineProperty(target, key, sharedPropertyDefinition);
}

function initState (vm) {
  vm._watchers = [];
  var opts = vm.$options;
  if (opts.props) { initProps(vm, opts.props); }
  if (opts.methods) { initMethods(vm, opts.methods); }
  if (opts.data) {
    initData(vm);
  } else {
    observe(vm._data = {}, true /* asRootData */);
  }
  if (opts.computed) { initComputed(vm, opts.computed); }
  if (opts.watch && opts.watch !== nativeWatch) {
    initWatch(vm, opts.watch);
  }
}

function initProps (vm, propsOptions) {
  var propsData = vm.$options.propsData || {};
  var props = vm._props = {};
  // cache prop keys so that future props updates can iterate using Array
  // instead of dynamic object key enumeration.
  var keys = vm.$options._propKeys = [];
  var isRoot = !vm.$parent;
  // root instance props should be converted
  if (!isRoot) {
    toggleObserving(false);
  }
  var loop = function ( key ) {
    keys.push(key);
    var value = validateProp(key, propsOptions, propsData, vm);
    /* istanbul ignore else */
    if (true) {
      var hyphenatedKey = hyphenate(key);
      if (isReservedAttribute(hyphenatedKey) ||
          config.isReservedAttr(hyphenatedKey)) {
        warn(
          ("\"" + hyphenatedKey + "\" is a reserved attribute and cannot be used as component prop."),
          vm
        );
      }
      defineReactive$$1(props, key, value, function () {
        if (!isRoot && !isUpdatingChildComponent) {
          {
            if(vm.mpHost === 'mp-baidu' || vm.mpHost === 'mp-kuaishou' || vm.mpHost === 'mp-xhs'){//百度、快手、小红书 observer 在 setData callback 之后触发，直接忽略该 warn
                return
            }
            //fixed by xxxxxx __next_tick_pending,uni://form-field 时不告警
            if(
                key === 'value' && 
                Array.isArray(vm.$options.behaviors) &&
                vm.$options.behaviors.indexOf('uni://form-field') !== -1
              ){
              return
            }
            if(vm._getFormData){
              return
            }
            var $parent = vm.$parent;
            while($parent){
              if($parent.__next_tick_pending){
                return  
              }
              $parent = $parent.$parent;
            }
          }
          warn(
            "Avoid mutating a prop directly since the value will be " +
            "overwritten whenever the parent component re-renders. " +
            "Instead, use a data or computed property based on the prop's " +
            "value. Prop being mutated: \"" + key + "\"",
            vm
          );
        }
      });
    } else {}
    // static props are already proxied on the component's prototype
    // during Vue.extend(). We only need to proxy props defined at
    // instantiation here.
    if (!(key in vm)) {
      proxy(vm, "_props", key);
    }
  };

  for (var key in propsOptions) loop( key );
  toggleObserving(true);
}

function initData (vm) {
  var data = vm.$options.data;
  data = vm._data = typeof data === 'function'
    ? getData(data, vm)
    : data || {};
  if (!isPlainObject(data)) {
    data = {};
     true && warn(
      'data functions should return an object:\n' +
      'https://vuejs.org/v2/guide/components.html#data-Must-Be-a-Function',
      vm
    );
  }
  // proxy data on instance
  var keys = Object.keys(data);
  var props = vm.$options.props;
  var methods = vm.$options.methods;
  var i = keys.length;
  while (i--) {
    var key = keys[i];
    if (true) {
      if (methods && hasOwn(methods, key)) {
        warn(
          ("Method \"" + key + "\" has already been defined as a data property."),
          vm
        );
      }
    }
    if (props && hasOwn(props, key)) {
       true && warn(
        "The data property \"" + key + "\" is already declared as a prop. " +
        "Use prop default value instead.",
        vm
      );
    } else if (!isReserved(key)) {
      proxy(vm, "_data", key);
    }
  }
  // observe data
  observe(data, true /* asRootData */);
}

function getData (data, vm) {
  // #7573 disable dep collection when invoking data getters
  pushTarget();
  try {
    return data.call(vm, vm)
  } catch (e) {
    handleError(e, vm, "data()");
    return {}
  } finally {
    popTarget();
  }
}

var computedWatcherOptions = { lazy: true };

function initComputed (vm, computed) {
  // $flow-disable-line
  var watchers = vm._computedWatchers = Object.create(null);
  // computed properties are just getters during SSR
  var isSSR = isServerRendering();

  for (var key in computed) {
    var userDef = computed[key];
    var getter = typeof userDef === 'function' ? userDef : userDef.get;
    if ( true && getter == null) {
      warn(
        ("Getter is missing for computed property \"" + key + "\"."),
        vm
      );
    }

    if (!isSSR) {
      // create internal watcher for the computed property.
      watchers[key] = new Watcher(
        vm,
        getter || noop,
        noop,
        computedWatcherOptions
      );
    }

    // component-defined computed properties are already defined on the
    // component prototype. We only need to define computed properties defined
    // at instantiation here.
    if (!(key in vm)) {
      defineComputed(vm, key, userDef);
    } else if (true) {
      if (key in vm.$data) {
        warn(("The computed property \"" + key + "\" is already defined in data."), vm);
      } else if (vm.$options.props && key in vm.$options.props) {
        warn(("The computed property \"" + key + "\" is already defined as a prop."), vm);
      }
    }
  }
}

function defineComputed (
  target,
  key,
  userDef
) {
  var shouldCache = !isServerRendering();
  if (typeof userDef === 'function') {
    sharedPropertyDefinition.get = shouldCache
      ? createComputedGetter(key)
      : createGetterInvoker(userDef);
    sharedPropertyDefinition.set = noop;
  } else {
    sharedPropertyDefinition.get = userDef.get
      ? shouldCache && userDef.cache !== false
        ? createComputedGetter(key)
        : createGetterInvoker(userDef.get)
      : noop;
    sharedPropertyDefinition.set = userDef.set || noop;
  }
  if ( true &&
      sharedPropertyDefinition.set === noop) {
    sharedPropertyDefinition.set = function () {
      warn(
        ("Computed property \"" + key + "\" was assigned to but it has no setter."),
        this
      );
    };
  }
  Object.defineProperty(target, key, sharedPropertyDefinition);
}

function createComputedGetter (key) {
  return function computedGetter () {
    var watcher = this._computedWatchers && this._computedWatchers[key];
    if (watcher) {
      if (watcher.dirty) {
        watcher.evaluate();
      }
      if (Dep.SharedObject.target) {// fixed by xxxxxx
        watcher.depend();
      }
      return watcher.value
    }
  }
}

function createGetterInvoker(fn) {
  return function computedGetter () {
    return fn.call(this, this)
  }
}

function initMethods (vm, methods) {
  var props = vm.$options.props;
  for (var key in methods) {
    if (true) {
      if (typeof methods[key] !== 'function') {
        warn(
          "Method \"" + key + "\" has type \"" + (typeof methods[key]) + "\" in the component definition. " +
          "Did you reference the function correctly?",
          vm
        );
      }
      if (props && hasOwn(props, key)) {
        warn(
          ("Method \"" + key + "\" has already been defined as a prop."),
          vm
        );
      }
      if ((key in vm) && isReserved(key)) {
        warn(
          "Method \"" + key + "\" conflicts with an existing Vue instance method. " +
          "Avoid defining component methods that start with _ or $."
        );
      }
    }
    vm[key] = typeof methods[key] !== 'function' ? noop : bind(methods[key], vm);
  }
}

function initWatch (vm, watch) {
  for (var key in watch) {
    var handler = watch[key];
    if (Array.isArray(handler)) {
      for (var i = 0; i < handler.length; i++) {
        createWatcher(vm, key, handler[i]);
      }
    } else {
      createWatcher(vm, key, handler);
    }
  }
}

function createWatcher (
  vm,
  expOrFn,
  handler,
  options
) {
  if (isPlainObject(handler)) {
    options = handler;
    handler = handler.handler;
  }
  if (typeof handler === 'string') {
    handler = vm[handler];
  }
  return vm.$watch(expOrFn, handler, options)
}

function stateMixin (Vue) {
  // flow somehow has problems with directly declared definition object
  // when using Object.defineProperty, so we have to procedurally build up
  // the object here.
  var dataDef = {};
  dataDef.get = function () { return this._data };
  var propsDef = {};
  propsDef.get = function () { return this._props };
  if (true) {
    dataDef.set = function () {
      warn(
        'Avoid replacing instance root $data. ' +
        'Use nested data properties instead.',
        this
      );
    };
    propsDef.set = function () {
      warn("$props is readonly.", this);
    };
  }
  Object.defineProperty(Vue.prototype, '$data', dataDef);
  Object.defineProperty(Vue.prototype, '$props', propsDef);

  Vue.prototype.$set = set;
  Vue.prototype.$delete = del;

  Vue.prototype.$watch = function (
    expOrFn,
    cb,
    options
  ) {
    var vm = this;
    if (isPlainObject(cb)) {
      return createWatcher(vm, expOrFn, cb, options)
    }
    options = options || {};
    options.user = true;
    var watcher = new Watcher(vm, expOrFn, cb, options);
    if (options.immediate) {
      try {
        cb.call(vm, watcher.value);
      } catch (error) {
        handleError(error, vm, ("callback for immediate watcher \"" + (watcher.expression) + "\""));
      }
    }
    return function unwatchFn () {
      watcher.teardown();
    }
  };
}

/*  */

var uid$3 = 0;

function initMixin (Vue) {
  Vue.prototype._init = function (options) {
    var vm = this;
    // a uid
    vm._uid = uid$3++;

    var startTag, endTag;
    /* istanbul ignore if */
    if ( true && config.performance && mark) {
      startTag = "vue-perf-start:" + (vm._uid);
      endTag = "vue-perf-end:" + (vm._uid);
      mark(startTag);
    }

    // a flag to avoid this being observed
    vm._isVue = true;
    // merge options
    if (options && options._isComponent) {
      // optimize internal component instantiation
      // since dynamic options merging is pretty slow, and none of the
      // internal component options needs special treatment.
      initInternalComponent(vm, options);
    } else {
      vm.$options = mergeOptions(
        resolveConstructorOptions(vm.constructor),
        options || {},
        vm
      );
    }
    /* istanbul ignore else */
    if (true) {
      initProxy(vm);
    } else {}
    // expose real self
    vm._self = vm;
    initLifecycle(vm);
    initEvents(vm);
    initRender(vm);
    callHook(vm, 'beforeCreate');
    !vm._$fallback && initInjections(vm); // resolve injections before data/props  
    initState(vm);
    !vm._$fallback && initProvide(vm); // resolve provide after data/props
    !vm._$fallback && callHook(vm, 'created');      

    /* istanbul ignore if */
    if ( true && config.performance && mark) {
      vm._name = formatComponentName(vm, false);
      mark(endTag);
      measure(("vue " + (vm._name) + " init"), startTag, endTag);
    }

    if (vm.$options.el) {
      vm.$mount(vm.$options.el);
    }
  };
}

function initInternalComponent (vm, options) {
  var opts = vm.$options = Object.create(vm.constructor.options);
  // doing this because it's faster than dynamic enumeration.
  var parentVnode = options._parentVnode;
  opts.parent = options.parent;
  opts._parentVnode = parentVnode;

  var vnodeComponentOptions = parentVnode.componentOptions;
  opts.propsData = vnodeComponentOptions.propsData;
  opts._parentListeners = vnodeComponentOptions.listeners;
  opts._renderChildren = vnodeComponentOptions.children;
  opts._componentTag = vnodeComponentOptions.tag;

  if (options.render) {
    opts.render = options.render;
    opts.staticRenderFns = options.staticRenderFns;
  }
}

function resolveConstructorOptions (Ctor) {
  var options = Ctor.options;
  if (Ctor.super) {
    var superOptions = resolveConstructorOptions(Ctor.super);
    var cachedSuperOptions = Ctor.superOptions;
    if (superOptions !== cachedSuperOptions) {
      // super option changed,
      // need to resolve new options.
      Ctor.superOptions = superOptions;
      // check if there are any late-modified/attached options (#4976)
      var modifiedOptions = resolveModifiedOptions(Ctor);
      // update base extend options
      if (modifiedOptions) {
        extend(Ctor.extendOptions, modifiedOptions);
      }
      options = Ctor.options = mergeOptions(superOptions, Ctor.extendOptions);
      if (options.name) {
        options.components[options.name] = Ctor;
      }
    }
  }
  return options
}

function resolveModifiedOptions (Ctor) {
  var modified;
  var latest = Ctor.options;
  var sealed = Ctor.sealedOptions;
  for (var key in latest) {
    if (latest[key] !== sealed[key]) {
      if (!modified) { modified = {}; }
      modified[key] = latest[key];
    }
  }
  return modified
}

function Vue (options) {
  if ( true &&
    !(this instanceof Vue)
  ) {
    warn('Vue is a constructor and should be called with the `new` keyword');
  }
  this._init(options);
}

initMixin(Vue);
stateMixin(Vue);
eventsMixin(Vue);
lifecycleMixin(Vue);
renderMixin(Vue);

/*  */

function initUse (Vue) {
  Vue.use = function (plugin) {
    var installedPlugins = (this._installedPlugins || (this._installedPlugins = []));
    if (installedPlugins.indexOf(plugin) > -1) {
      return this
    }

    // additional parameters
    var args = toArray(arguments, 1);
    args.unshift(this);
    if (typeof plugin.install === 'function') {
      plugin.install.apply(plugin, args);
    } else if (typeof plugin === 'function') {
      plugin.apply(null, args);
    }
    installedPlugins.push(plugin);
    return this
  };
}

/*  */

function initMixin$1 (Vue) {
  Vue.mixin = function (mixin) {
    this.options = mergeOptions(this.options, mixin);
    return this
  };
}

/*  */

function initExtend (Vue) {
  /**
   * Each instance constructor, including Vue, has a unique
   * cid. This enables us to create wrapped "child
   * constructors" for prototypal inheritance and cache them.
   */
  Vue.cid = 0;
  var cid = 1;

  /**
   * Class inheritance
   */
  Vue.extend = function (extendOptions) {
    extendOptions = extendOptions || {};
    var Super = this;
    var SuperId = Super.cid;
    var cachedCtors = extendOptions._Ctor || (extendOptions._Ctor = {});
    if (cachedCtors[SuperId]) {
      return cachedCtors[SuperId]
    }

    var name = extendOptions.name || Super.options.name;
    if ( true && name) {
      validateComponentName(name);
    }

    var Sub = function VueComponent (options) {
      this._init(options);
    };
    Sub.prototype = Object.create(Super.prototype);
    Sub.prototype.constructor = Sub;
    Sub.cid = cid++;
    Sub.options = mergeOptions(
      Super.options,
      extendOptions
    );
    Sub['super'] = Super;

    // For props and computed properties, we define the proxy getters on
    // the Vue instances at extension time, on the extended prototype. This
    // avoids Object.defineProperty calls for each instance created.
    if (Sub.options.props) {
      initProps$1(Sub);
    }
    if (Sub.options.computed) {
      initComputed$1(Sub);
    }

    // allow further extension/mixin/plugin usage
    Sub.extend = Super.extend;
    Sub.mixin = Super.mixin;
    Sub.use = Super.use;

    // create asset registers, so extended classes
    // can have their private assets too.
    ASSET_TYPES.forEach(function (type) {
      Sub[type] = Super[type];
    });
    // enable recursive self-lookup
    if (name) {
      Sub.options.components[name] = Sub;
    }

    // keep a reference to the super options at extension time.
    // later at instantiation we can check if Super's options have
    // been updated.
    Sub.superOptions = Super.options;
    Sub.extendOptions = extendOptions;
    Sub.sealedOptions = extend({}, Sub.options);

    // cache constructor
    cachedCtors[SuperId] = Sub;
    return Sub
  };
}

function initProps$1 (Comp) {
  var props = Comp.options.props;
  for (var key in props) {
    proxy(Comp.prototype, "_props", key);
  }
}

function initComputed$1 (Comp) {
  var computed = Comp.options.computed;
  for (var key in computed) {
    defineComputed(Comp.prototype, key, computed[key]);
  }
}

/*  */

function initAssetRegisters (Vue) {
  /**
   * Create asset registration methods.
   */
  ASSET_TYPES.forEach(function (type) {
    Vue[type] = function (
      id,
      definition
    ) {
      if (!definition) {
        return this.options[type + 's'][id]
      } else {
        /* istanbul ignore if */
        if ( true && type === 'component') {
          validateComponentName(id);
        }
        if (type === 'component' && isPlainObject(definition)) {
          definition.name = definition.name || id;
          definition = this.options._base.extend(definition);
        }
        if (type === 'directive' && typeof definition === 'function') {
          definition = { bind: definition, update: definition };
        }
        this.options[type + 's'][id] = definition;
        return definition
      }
    };
  });
}

/*  */



function getComponentName (opts) {
  return opts && (opts.Ctor.options.name || opts.tag)
}

function matches (pattern, name) {
  if (Array.isArray(pattern)) {
    return pattern.indexOf(name) > -1
  } else if (typeof pattern === 'string') {
    return pattern.split(',').indexOf(name) > -1
  } else if (isRegExp(pattern)) {
    return pattern.test(name)
  }
  /* istanbul ignore next */
  return false
}

function pruneCache (keepAliveInstance, filter) {
  var cache = keepAliveInstance.cache;
  var keys = keepAliveInstance.keys;
  var _vnode = keepAliveInstance._vnode;
  for (var key in cache) {
    var cachedNode = cache[key];
    if (cachedNode) {
      var name = getComponentName(cachedNode.componentOptions);
      if (name && !filter(name)) {
        pruneCacheEntry(cache, key, keys, _vnode);
      }
    }
  }
}

function pruneCacheEntry (
  cache,
  key,
  keys,
  current
) {
  var cached$$1 = cache[key];
  if (cached$$1 && (!current || cached$$1.tag !== current.tag)) {
    cached$$1.componentInstance.$destroy();
  }
  cache[key] = null;
  remove(keys, key);
}

var patternTypes = [String, RegExp, Array];

var KeepAlive = {
  name: 'keep-alive',
  abstract: true,

  props: {
    include: patternTypes,
    exclude: patternTypes,
    max: [String, Number]
  },

  created: function created () {
    this.cache = Object.create(null);
    this.keys = [];
  },

  destroyed: function destroyed () {
    for (var key in this.cache) {
      pruneCacheEntry(this.cache, key, this.keys);
    }
  },

  mounted: function mounted () {
    var this$1 = this;

    this.$watch('include', function (val) {
      pruneCache(this$1, function (name) { return matches(val, name); });
    });
    this.$watch('exclude', function (val) {
      pruneCache(this$1, function (name) { return !matches(val, name); });
    });
  },

  render: function render () {
    var slot = this.$slots.default;
    var vnode = getFirstComponentChild(slot);
    var componentOptions = vnode && vnode.componentOptions;
    if (componentOptions) {
      // check pattern
      var name = getComponentName(componentOptions);
      var ref = this;
      var include = ref.include;
      var exclude = ref.exclude;
      if (
        // not included
        (include && (!name || !matches(include, name))) ||
        // excluded
        (exclude && name && matches(exclude, name))
      ) {
        return vnode
      }

      var ref$1 = this;
      var cache = ref$1.cache;
      var keys = ref$1.keys;
      var key = vnode.key == null
        // same constructor may get registered as different local components
        // so cid alone is not enough (#3269)
        ? componentOptions.Ctor.cid + (componentOptions.tag ? ("::" + (componentOptions.tag)) : '')
        : vnode.key;
      if (cache[key]) {
        vnode.componentInstance = cache[key].componentInstance;
        // make current key freshest
        remove(keys, key);
        keys.push(key);
      } else {
        cache[key] = vnode;
        keys.push(key);
        // prune oldest entry
        if (this.max && keys.length > parseInt(this.max)) {
          pruneCacheEntry(cache, keys[0], keys, this._vnode);
        }
      }

      vnode.data.keepAlive = true;
    }
    return vnode || (slot && slot[0])
  }
};

var builtInComponents = {
  KeepAlive: KeepAlive
};

/*  */

function initGlobalAPI (Vue) {
  // config
  var configDef = {};
  configDef.get = function () { return config; };
  if (true) {
    configDef.set = function () {
      warn(
        'Do not replace the Vue.config object, set individual fields instead.'
      );
    };
  }
  Object.defineProperty(Vue, 'config', configDef);

  // exposed util methods.
  // NOTE: these are not considered part of the public API - avoid relying on
  // them unless you are aware of the risk.
  Vue.util = {
    warn: warn,
    extend: extend,
    mergeOptions: mergeOptions,
    defineReactive: defineReactive$$1
  };

  Vue.set = set;
  Vue.delete = del;
  Vue.nextTick = nextTick;

  // 2.6 explicit observable API
  Vue.observable = function (obj) {
    observe(obj);
    return obj
  };

  Vue.options = Object.create(null);
  ASSET_TYPES.forEach(function (type) {
    Vue.options[type + 's'] = Object.create(null);
  });

  // this is used to identify the "base" constructor to extend all plain-object
  // components with in Weex's multi-instance scenarios.
  Vue.options._base = Vue;

  extend(Vue.options.components, builtInComponents);

  initUse(Vue);
  initMixin$1(Vue);
  initExtend(Vue);
  initAssetRegisters(Vue);
}

initGlobalAPI(Vue);

Object.defineProperty(Vue.prototype, '$isServer', {
  get: isServerRendering
});

Object.defineProperty(Vue.prototype, '$ssrContext', {
  get: function get () {
    /* istanbul ignore next */
    return this.$vnode && this.$vnode.ssrContext
  }
});

// expose FunctionalRenderContext for ssr runtime helper installation
Object.defineProperty(Vue, 'FunctionalRenderContext', {
  value: FunctionalRenderContext
});

Vue.version = '2.6.11';

/**
 * https://raw.githubusercontent.com/Tencent/westore/master/packages/westore/utils/diff.js
 */
var ARRAYTYPE = '[object Array]';
var OBJECTTYPE = '[object Object]';
var NULLTYPE = '[object Null]';
var UNDEFINEDTYPE = '[object Undefined]';
// const FUNCTIONTYPE = '[object Function]'

function diff(current, pre) {
    var result = {};
    syncKeys(current, pre);
    _diff(current, pre, '', result);
    return result
}

function syncKeys(current, pre) {
    if (current === pre) { return }
    var rootCurrentType = type(current);
    var rootPreType = type(pre);
    if (rootCurrentType == OBJECTTYPE && rootPreType == OBJECTTYPE) {
        if(Object.keys(current).length >= Object.keys(pre).length){
            for (var key in pre) {
                var currentValue = current[key];
                if (currentValue === undefined) {
                    current[key] = null;
                } else {
                    syncKeys(currentValue, pre[key]);
                }
            }
        }
    } else if (rootCurrentType == ARRAYTYPE && rootPreType == ARRAYTYPE) {
        if (current.length >= pre.length) {
            pre.forEach(function (item, index) {
                syncKeys(current[index], item);
            });
        }
    }
}

function nullOrUndefined(currentType, preType) {
    if(
        (currentType === NULLTYPE || currentType === UNDEFINEDTYPE) && 
        (preType === NULLTYPE || preType === UNDEFINEDTYPE)
    ) {
        return false
    }
    return true
}

function _diff(current, pre, path, result) {
    if (current === pre) { return }
    var rootCurrentType = type(current);
    var rootPreType = type(pre);
    if (rootCurrentType == OBJECTTYPE) {
        if (rootPreType != OBJECTTYPE || Object.keys(current).length < Object.keys(pre).length) {
            setResult(result, path, current);
        } else {
            var loop = function ( key ) {
                var currentValue = current[key];
                var preValue = pre[key];
                var currentType = type(currentValue);
                var preType = type(preValue);
                if (currentType != ARRAYTYPE && currentType != OBJECTTYPE) {
                    if (currentValue !== pre[key] && nullOrUndefined(currentType, preType)) {
                        setResult(result, (path == '' ? '' : path + ".") + key, currentValue);
                    }
                } else if (currentType == ARRAYTYPE) {
                    if (preType != ARRAYTYPE) {
                        setResult(result, (path == '' ? '' : path + ".") + key, currentValue);
                    } else {
                        if (currentValue.length < preValue.length) {
                            setResult(result, (path == '' ? '' : path + ".") + key, currentValue);
                        } else {
                            currentValue.forEach(function (item, index) {
                                _diff(item, preValue[index], (path == '' ? '' : path + ".") + key + '[' + index + ']', result);
                            });
                        }
                    }
                } else if (currentType == OBJECTTYPE) {
                    if (preType != OBJECTTYPE || Object.keys(currentValue).length < Object.keys(preValue).length) {
                        setResult(result, (path == '' ? '' : path + ".") + key, currentValue);
                    } else {
                        for (var subKey in currentValue) {
                            _diff(currentValue[subKey], preValue[subKey], (path == '' ? '' : path + ".") + key + '.' + subKey, result);
                        }
                    }
                }
            };

            for (var key in current) loop( key );
        }
    } else if (rootCurrentType == ARRAYTYPE) {
        if (rootPreType != ARRAYTYPE) {
            setResult(result, path, current);
        } else {
            if (current.length < pre.length) {
                setResult(result, path, current);
            } else {
                current.forEach(function (item, index) {
                    _diff(item, pre[index], path + '[' + index + ']', result);
                });
            }
        }
    } else {
        setResult(result, path, current);
    }
}

function setResult(result, k, v) {
    // if (type(v) != FUNCTIONTYPE) {
        result[k] = v;
    // }
}

function type(obj) {
    return Object.prototype.toString.call(obj)
}

/*  */

function flushCallbacks$1(vm) {
    if (vm.__next_tick_callbacks && vm.__next_tick_callbacks.length) {
        if (Object({"VUE_APP_DARK_MODE":"false","VUE_APP_NAME":"app02","VUE_APP_PLATFORM":"mp-weixin","NODE_ENV":"development","BASE_URL":"/"}).VUE_APP_DEBUG) {
            var mpInstance = vm.$scope;
            console.log('[' + (+new Date) + '][' + (mpInstance.is || mpInstance.route) + '][' + vm._uid +
                ']:flushCallbacks[' + vm.__next_tick_callbacks.length + ']');
        }
        var copies = vm.__next_tick_callbacks.slice(0);
        vm.__next_tick_callbacks.length = 0;
        for (var i = 0; i < copies.length; i++) {
            copies[i]();
        }
    }
}

function hasRenderWatcher(vm) {
    return queue.find(function (watcher) { return vm._watcher === watcher; })
}

function nextTick$1(vm, cb) {
    //1.nextTick 之前 已 setData 且 setData 还未回调完成
    //2.nextTick 之前存在 render watcher
    if (!vm.__next_tick_pending && !hasRenderWatcher(vm)) {
        if(Object({"VUE_APP_DARK_MODE":"false","VUE_APP_NAME":"app02","VUE_APP_PLATFORM":"mp-weixin","NODE_ENV":"development","BASE_URL":"/"}).VUE_APP_DEBUG){
            var mpInstance = vm.$scope;
            console.log('[' + (+new Date) + '][' + (mpInstance.is || mpInstance.route) + '][' + vm._uid +
                ']:nextVueTick');
        }
        return nextTick(cb, vm)
    }else{
        if(Object({"VUE_APP_DARK_MODE":"false","VUE_APP_NAME":"app02","VUE_APP_PLATFORM":"mp-weixin","NODE_ENV":"development","BASE_URL":"/"}).VUE_APP_DEBUG){
            var mpInstance$1 = vm.$scope;
            console.log('[' + (+new Date) + '][' + (mpInstance$1.is || mpInstance$1.route) + '][' + vm._uid +
                ']:nextMPTick');
        }
    }
    var _resolve;
    if (!vm.__next_tick_callbacks) {
        vm.__next_tick_callbacks = [];
    }
    vm.__next_tick_callbacks.push(function () {
        if (cb) {
            try {
                cb.call(vm);
            } catch (e) {
                handleError(e, vm, 'nextTick');
            }
        } else if (_resolve) {
            _resolve(vm);
        }
    });
    // $flow-disable-line
    if (!cb && typeof Promise !== 'undefined') {
        return new Promise(function (resolve) {
            _resolve = resolve;
        })
    }
}

/*  */

function clearInstance(key, value) {
  // 简易去除 Vue 和小程序组件实例
  if (value) {
    if (value._isVue || value.__v_isMPComponent) {
      return {}
    }
  }
  return value
}

function cloneWithData(vm) {
  // 确保当前 vm 所有数据被同步
  var ret = Object.create(null);
  var dataKeys = [].concat(
    Object.keys(vm._data || {}),
    Object.keys(vm._computedWatchers || {}));

  dataKeys.reduce(function(ret, key) {
    ret[key] = vm[key];
    return ret
  }, ret);

  // vue-composition-api
  var compositionApiState = vm.__composition_api_state__ || vm.__secret_vfa_state__;
  var rawBindings = compositionApiState && compositionApiState.rawBindings;
  if (rawBindings) {
    Object.keys(rawBindings).forEach(function (key) {
      ret[key] = vm[key];
    });
  }

  //TODO 需要把无用数据处理掉，比如 list=>l0 则 list 需要移除，否则多传输一份数据
  Object.assign(ret, vm.$mp.data || {});
  if (
    Array.isArray(vm.$options.behaviors) &&
    vm.$options.behaviors.indexOf('uni://form-field') !== -1
  ) { //form-field
    ret['name'] = vm.name;
    ret['value'] = vm.value;
  }

  return JSON.parse(JSON.stringify(ret, clearInstance))
}

var patch = function(oldVnode, vnode) {
  var this$1 = this;

  if (vnode === null) { //destroy
    return
  }
  if (this.mpType === 'page' || this.mpType === 'component') {
    var mpInstance = this.$scope;
    var data = Object.create(null);
    try {
      data = cloneWithData(this);
    } catch (err) {
      console.error(err);
    }
    data.__webviewId__ = mpInstance.data.__webviewId__;
    var mpData = Object.create(null);
    Object.keys(data).forEach(function (key) { //仅同步 data 中有的数据
      mpData[key] = mpInstance.data[key];
    });
    var diffData = this.$shouldDiffData === false ? data : diff(data, mpData);
    if (Object.keys(diffData).length) {
      if (Object({"VUE_APP_DARK_MODE":"false","VUE_APP_NAME":"app02","VUE_APP_PLATFORM":"mp-weixin","NODE_ENV":"development","BASE_URL":"/"}).VUE_APP_DEBUG) {
        console.log('[' + (+new Date) + '][' + (mpInstance.is || mpInstance.route) + '][' + this._uid +
          ']差量更新',
          JSON.stringify(diffData));
      }
      this.__next_tick_pending = true;
      mpInstance.setData(diffData, function () {
        this$1.__next_tick_pending = false;
        flushCallbacks$1(this$1);
      });
    } else {
      flushCallbacks$1(this);
    }
  }
};

/*  */

function createEmptyRender() {

}

function mountComponent$1(
  vm,
  el,
  hydrating
) {
  if (!vm.mpType) {//main.js 中的 new Vue
    return vm
  }
  if (vm.mpType === 'app') {
    vm.$options.render = createEmptyRender;
  }
  if (!vm.$options.render) {
    vm.$options.render = createEmptyRender;
    if (true) {
      /* istanbul ignore if */
      if ((vm.$options.template && vm.$options.template.charAt(0) !== '#') ||
        vm.$options.el || el) {
        warn(
          'You are using the runtime-only build of Vue where the template ' +
          'compiler is not available. Either pre-compile the templates into ' +
          'render functions, or use the compiler-included build.',
          vm
        );
      } else {
        warn(
          'Failed to mount component: template or render function not defined.',
          vm
        );
      }
    }
  }
  
  !vm._$fallback && callHook(vm, 'beforeMount');

  var updateComponent = function () {
    vm._update(vm._render(), hydrating);
  };

  // we set this to vm._watcher inside the watcher's constructor
  // since the watcher's initial patch may call $forceUpdate (e.g. inside child
  // component's mounted hook), which relies on vm._watcher being already defined
  new Watcher(vm, updateComponent, noop, {
    before: function before() {
      if (vm._isMounted && !vm._isDestroyed) {
        callHook(vm, 'beforeUpdate');
      }
    }
  }, true /* isRenderWatcher */);
  hydrating = false;
  return vm
}

/*  */

function renderClass (
  staticClass,
  dynamicClass
) {
  if (isDef(staticClass) || isDef(dynamicClass)) {
    return concat(staticClass, stringifyClass(dynamicClass))
  }
  /* istanbul ignore next */
  return ''
}

function concat (a, b) {
  return a ? b ? (a + ' ' + b) : a : (b || '')
}

function stringifyClass (value) {
  if (Array.isArray(value)) {
    return stringifyArray(value)
  }
  if (isObject(value)) {
    return stringifyObject(value)
  }
  if (typeof value === 'string') {
    return value
  }
  /* istanbul ignore next */
  return ''
}

function stringifyArray (value) {
  var res = '';
  var stringified;
  for (var i = 0, l = value.length; i < l; i++) {
    if (isDef(stringified = stringifyClass(value[i])) && stringified !== '') {
      if (res) { res += ' '; }
      res += stringified;
    }
  }
  return res
}

function stringifyObject (value) {
  var res = '';
  for (var key in value) {
    if (value[key]) {
      if (res) { res += ' '; }
      res += key;
    }
  }
  return res
}

/*  */

var parseStyleText = cached(function (cssText) {
  var res = {};
  var listDelimiter = /;(?![^(]*\))/g;
  var propertyDelimiter = /:(.+)/;
  cssText.split(listDelimiter).forEach(function (item) {
    if (item) {
      var tmp = item.split(propertyDelimiter);
      tmp.length > 1 && (res[tmp[0].trim()] = tmp[1].trim());
    }
  });
  return res
});

// normalize possible array / string values into Object
function normalizeStyleBinding (bindingStyle) {
  if (Array.isArray(bindingStyle)) {
    return toObject(bindingStyle)
  }
  if (typeof bindingStyle === 'string') {
    return parseStyleText(bindingStyle)
  }
  return bindingStyle
}

/*  */

var MP_METHODS = ['createSelectorQuery', 'createIntersectionObserver', 'selectAllComponents', 'selectComponent'];

function getTarget(obj, path) {
  var parts = path.split('.');
  var key = parts[0];
  if (key.indexOf('__$n') === 0) { //number index
    key = parseInt(key.replace('__$n', ''));
  }
  if (parts.length === 1) {
    return obj[key]
  }
  return getTarget(obj[key], parts.slice(1).join('.'))
}

function internalMixin(Vue) {

  Vue.config.errorHandler = function(err, vm, info) {
    Vue.util.warn(("Error in " + info + ": \"" + (err.toString()) + "\""), vm);
    console.error(err);
    /* eslint-disable no-undef */
    var app = typeof getApp === 'function' && getApp();
    if (app && app.onError) {
      app.onError(err);
    }
  };

  var oldEmit = Vue.prototype.$emit;

  Vue.prototype.$emit = function(event) {
    if (this.$scope && event) {
      var triggerEvent = this.$scope['_triggerEvent'] || this.$scope['triggerEvent'];
      if (triggerEvent) {
        try {
          triggerEvent.call(this.$scope, event, {
            __args__: toArray(arguments, 1)
          });
        } catch (error) {

        }
      }
    }
    return oldEmit.apply(this, arguments)
  };

  Vue.prototype.$nextTick = function(fn) {
    return nextTick$1(this, fn)
  };

  MP_METHODS.forEach(function (method) {
    Vue.prototype[method] = function(args) {
      if (this.$scope && this.$scope[method]) {
        return this.$scope[method](args)
      }
      // mp-alipay
      if (typeof my === 'undefined') {
        return
      }
      if (method === 'createSelectorQuery') {
        /* eslint-disable no-undef */
        return my.createSelectorQuery(args)
      } else if (method === 'createIntersectionObserver') {
        /* eslint-disable no-undef */
        return my.createIntersectionObserver(args)
      }
      // TODO mp-alipay 暂不支持 selectAllComponents,selectComponent
    };
  });

  Vue.prototype.__init_provide = initProvide;

  Vue.prototype.__init_injections = initInjections;

  Vue.prototype.__call_hook = function(hook, args) {
    var vm = this;
    // #7573 disable dep collection when invoking lifecycle hooks
    pushTarget();
    var handlers = vm.$options[hook];
    var info = hook + " hook";
    var ret;
    if (handlers) {
      for (var i = 0, j = handlers.length; i < j; i++) {
        ret = invokeWithErrorHandling(handlers[i], vm, args ? [args] : null, vm, info);
      }
    }
    if (vm._hasHookEvent) {
      vm.$emit('hook:' + hook, args);
    }
    popTarget();
    return ret
  };

  Vue.prototype.__set_model = function(target, key, value, modifiers) {
    if (Array.isArray(modifiers)) {
      if (modifiers.indexOf('trim') !== -1) {
        value = value.trim();
      }
      if (modifiers.indexOf('number') !== -1) {
        value = this._n(value);
      }
    }
    if (!target) {
      target = this;
    }
    // 解决动态属性添加
    Vue.set(target, key, value);
  };

  Vue.prototype.__set_sync = function(target, key, value) {
    if (!target) {
      target = this;
    }
    // 解决动态属性添加
    Vue.set(target, key, value);
  };

  Vue.prototype.__get_orig = function(item) {
    if (isPlainObject(item)) {
      return item['$orig'] || item
    }
    return item
  };

  Vue.prototype.__get_value = function(dataPath, target) {
    return getTarget(target || this, dataPath)
  };


  Vue.prototype.__get_class = function(dynamicClass, staticClass) {
    return renderClass(staticClass, dynamicClass)
  };

  Vue.prototype.__get_style = function(dynamicStyle, staticStyle) {
    if (!dynamicStyle && !staticStyle) {
      return ''
    }
    var dynamicStyleObj = normalizeStyleBinding(dynamicStyle);
    var styleObj = staticStyle ? extend(staticStyle, dynamicStyleObj) : dynamicStyleObj;
    return Object.keys(styleObj).map(function (name) { return ((hyphenate(name)) + ":" + (styleObj[name])); }).join(';')
  };

  Vue.prototype.__map = function(val, iteratee) {
    //TODO 暂不考虑 string
    var ret, i, l, keys, key;
    if (Array.isArray(val)) {
      ret = new Array(val.length);
      for (i = 0, l = val.length; i < l; i++) {
        ret[i] = iteratee(val[i], i);
      }
      return ret
    } else if (isObject(val)) {
      keys = Object.keys(val);
      ret = Object.create(null);
      for (i = 0, l = keys.length; i < l; i++) {
        key = keys[i];
        ret[key] = iteratee(val[key], key, i);
      }
      return ret
    } else if (typeof val === 'number') {
      ret = new Array(val);
      for (i = 0, l = val; i < l; i++) {
        // 第一个参数暂时仍和小程序一致
        ret[i] = iteratee(i, i);
      }
      return ret
    }
    return []
  };

}

/*  */

var LIFECYCLE_HOOKS$1 = [
    //App
    'onLaunch',
    'onShow',
    'onHide',
    'onUniNViewMessage',
    'onPageNotFound',
    'onThemeChange',
    'onError',
    'onUnhandledRejection',
    //Page
    'onInit',
    'onLoad',
    // 'onShow',
    'onReady',
    // 'onHide',
    'onUnload',
    'onPullDownRefresh',
    'onReachBottom',
    'onTabItemTap',
    'onAddToFavorites',
    'onShareTimeline',
    'onShareAppMessage',
    'onResize',
    'onPageScroll',
    'onNavigationBarButtonTap',
    'onBackPress',
    'onNavigationBarSearchInputChanged',
    'onNavigationBarSearchInputConfirmed',
    'onNavigationBarSearchInputClicked',
    //Component
    // 'onReady', // 兼容旧版本，应该移除该事件
    'onPageShow',
    'onPageHide',
    'onPageResize',
    'onUploadDouyinVideo'
];
function lifecycleMixin$1(Vue) {

    //fixed vue-class-component
    var oldExtend = Vue.extend;
    Vue.extend = function(extendOptions) {
        extendOptions = extendOptions || {};

        var methods = extendOptions.methods;
        if (methods) {
            Object.keys(methods).forEach(function (methodName) {
                if (LIFECYCLE_HOOKS$1.indexOf(methodName)!==-1) {
                    extendOptions[methodName] = methods[methodName];
                    delete methods[methodName];
                }
            });
        }

        return oldExtend.call(this, extendOptions)
    };

    var strategies = Vue.config.optionMergeStrategies;
    var mergeHook = strategies.created;
    LIFECYCLE_HOOKS$1.forEach(function (hook) {
        strategies[hook] = mergeHook;
    });

    Vue.prototype.__lifecycle_hooks__ = LIFECYCLE_HOOKS$1;
}

/*  */

// install platform patch function
Vue.prototype.__patch__ = patch;

// public mount method
Vue.prototype.$mount = function(
    el ,
    hydrating 
) {
    return mountComponent$1(this, el, hydrating)
};

lifecycleMixin$1(Vue);
internalMixin(Vue);

/*  */

/* harmony default export */ __webpack_exports__["default"] = (Vue);

/* WEBPACK VAR INJECTION */}.call(this, __webpack_require__(/*! ./../../../../../webpack/buildin/global.js */ 2)))

/***/ }),

/***/ 25:
/*!********************************************!*\
  !*** D:/project/前端/front/front/pages.json ***!
  \********************************************/
/*! no static exports found */
/***/ (function(module, exports) {



/***/ }),

/***/ 3:
/*!**********************************************************************!*\
  !*** ./node_modules/@babel/runtime/helpers/interopRequireDefault.js ***!
  \**********************************************************************/
/*! no static exports found */
/***/ (function(module, exports) {

function _interopRequireDefault(obj) {
  return obj && obj.__esModule ? obj : {
    "default": obj
  };
}
module.exports = _interopRequireDefault, module.exports.__esModule = true, module.exports["default"] = module.exports;

/***/ }),

/***/ 31:
/*!**********************************************************************************************************!*\
  !*** ./node_modules/@dcloudio/vue-cli-plugin-uni/packages/vue-loader/lib/runtime/componentNormalizer.js ***!
  \**********************************************************************************************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "default", function() { return normalizeComponent; });
/* globals __VUE_SSR_CONTEXT__ */

// IMPORTANT: Do NOT use ES2015 features in this file (except for modules).
// This module is a runtime utility for cleaner component module output and will
// be included in the final webpack user bundle.

function normalizeComponent (
  scriptExports,
  render,
  staticRenderFns,
  functionalTemplate,
  injectStyles,
  scopeId,
  moduleIdentifier, /* server only */
  shadowMode, /* vue-cli only */
  components, // fixed by xxxxxx auto components
  renderjs // fixed by xxxxxx renderjs
) {
  // Vue.extend constructor export interop
  var options = typeof scriptExports === 'function'
    ? scriptExports.options
    : scriptExports

  // fixed by xxxxxx auto components
  if (components) {
    if (!options.components) {
      options.components = {}
    }
    var hasOwn = Object.prototype.hasOwnProperty
    for (var name in components) {
      if (hasOwn.call(components, name) && !hasOwn.call(options.components, name)) {
        options.components[name] = components[name]
      }
    }
  }
  // fixed by xxxxxx renderjs
  if (renderjs) {
    (renderjs.beforeCreate || (renderjs.beforeCreate = [])).unshift(function() {
      this[renderjs.__module] = this
    });
    (options.mixins || (options.mixins = [])).push(renderjs)
  }

  // render functions
  if (render) {
    options.render = render
    options.staticRenderFns = staticRenderFns
    options._compiled = true
  }

  // functional template
  if (functionalTemplate) {
    options.functional = true
  }

  // scopedId
  if (scopeId) {
    options._scopeId = 'data-v-' + scopeId
  }

  var hook
  if (moduleIdentifier) { // server build
    hook = function (context) {
      // 2.3 injection
      context =
        context || // cached call
        (this.$vnode && this.$vnode.ssrContext) || // stateful
        (this.parent && this.parent.$vnode && this.parent.$vnode.ssrContext) // functional
      // 2.2 with runInNewContext: true
      if (!context && typeof __VUE_SSR_CONTEXT__ !== 'undefined') {
        context = __VUE_SSR_CONTEXT__
      }
      // inject component styles
      if (injectStyles) {
        injectStyles.call(this, context)
      }
      // register component module identifier for async chunk inferrence
      if (context && context._registeredComponents) {
        context._registeredComponents.add(moduleIdentifier)
      }
    }
    // used by ssr in case component is cached and beforeCreate
    // never gets called
    options._ssrRegister = hook
  } else if (injectStyles) {
    hook = shadowMode
      ? function () { injectStyles.call(this, this.$root.$options.shadowRoot) }
      : injectStyles
  }

  if (hook) {
    if (options.functional) {
      // for template-only hot-reload because in that case the render fn doesn't
      // go through the normalizer
      options._injectStyles = hook
      // register for functioal component in vue file
      var originalRender = options.render
      options.render = function renderWithStyleInjection (h, context) {
        hook.call(context)
        return originalRender(h, context)
      }
    } else {
      // inject component registration as beforeCreate hook
      var existing = options.beforeCreate
      options.beforeCreate = existing
        ? [].concat(existing, hook)
        : [hook]
    }
  }

  return {
    exports: scriptExports,
    options: options
  }
}


/***/ }),

/***/ 32:
/*!************************************************!*\
  !*** D:/project/前端/front/front/utils/utils.js ***!
  \************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";
/* WEBPACK VAR INJECTION */(function(uni) {

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;
// 跳转页面
var jump = function jump(url) {
  uni.navigateTo({
    url: url
  });
};
var tab = function tab(url) {
  uni.switchTab({
    url: url
  });
};
// 输出信息
var msg = function msg(title) {
  var duration = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : 1500;
  var mask = arguments.length > 2 && arguments[2] !== undefined ? arguments[2] : false;
  var icon = arguments.length > 3 && arguments[3] !== undefined ? arguments[3] : 'none';
  //统一提示方便全局修改
  if (Boolean(title) === false) {
    return;
  }
  uni.showToast({
    title: title,
    duration: duration,
    mask: mask,
    icon: icon
  });
};
var msgBack = function msgBack(title) {
  var duration = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : 1500;
  var delta = arguments.length > 2 && arguments[2] !== undefined ? arguments[2] : 1;
  if (!title) {
    return;
  }
  msg(title);
  setTimeout(function () {
    uni.navigateBack({
      delta: delta
    });
  }, duration);
};
var genTradeNo = function genTradeNo() {
  var date = new Date();
  var tradeNo = date.getFullYear().toString() + (date.getMonth() + 1).toString() + date.getDate().toString() + date.getHours().toString() + date.getMinutes().toString() + date.getSeconds().toString() + date.getMilliseconds().toString();
  for (var i = 0; i < 5; i++)
  //5位随机数，用以加在时间戳后面。
  {
    tradeNo += Math.floor(Math.random() * 10);
  }
  return tradeNo;
};
//获取当前时间（yyyy-MM-dd hh:mm:ss）
var getCurDateTime = function getCurDateTime() {
  var currentTime = new Date(),
    year = currentTime.getFullYear(),
    month = currentTime.getMonth() + 1 < 10 ? '0' + (currentTime.getMonth() + 1) : currentTime.getMonth() + 1,
    day = currentTime.getDate() < 10 ? '0' + currentTime.getDate() : currentTime.getDate(),
    hour = currentTime.getHours(),
    minute = currentTime.getMinutes(),
    second = currentTime.getSeconds();
  return year + "-" + month + "-" + day + " " + hour + ":" + minute + ":" + second;
};
//获取当前日期（yyyy-MM-dd）
var getCurDate = function getCurDate() {
  var currentTime = new Date(),
    year = currentTime.getFullYear(),
    month = currentTime.getMonth() + 1 < 10 ? '0' + (currentTime.getMonth() + 1) : currentTime.getMonth() + 1,
    day = currentTime.getDate() < 10 ? '0' + currentTime.getDate() : currentTime.getDate();
  return year + "-" + month + "-" + day;
};
var _default = {
  jump: jump,
  msg: msg,
  msgBack: msgBack,
  tab: tab,
  genTradeNo: genTradeNo,
  getCurDateTime: getCurDateTime,
  getCurDate: getCurDate
};
exports.default = _default;
/* WEBPACK VAR INJECTION */}.call(this, __webpack_require__(/*! ./node_modules/@dcloudio/uni-mp-weixin/dist/index.js */ 1)["default"]))

/***/ }),

/***/ 33:
/*!**********************************************!*\
  !*** D:/project/前端/front/front/api/index.js ***!
  \**********************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";
/* WEBPACK VAR INJECTION */(function(uni) {

var _interopRequireDefault = __webpack_require__(/*! @babel/runtime/helpers/interopRequireDefault */ 3);
Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.uploadMedia = exports.upload = exports.updateBrowseDuration = exports.update = exports.session = exports.sendsms = exports.sendemail = exports.security = exports.save = exports.rubbish = exports.resetPass = exports.registerSms = exports.registerEmail = exports.register = exports.recommend2 = exports.recommend = exports.page = exports.option = exports.myForum = exports.login = exports.list = exports.info = exports.groupby = exports.forumDetail = exports.follow = exports.faceMatch = exports.faceLogin = exports.deleteRecords = exports.del = exports.defaultAddress = exports.default = exports.baiduIdentify = exports.auth = exports.allPublicForm = exports.add = void 0;
var _http = _interopRequireDefault(__webpack_require__(/*! ./http */ 34));
var _base = _interopRequireDefault(__webpack_require__(/*! ./base */ 35));
/**
 * 登陆校验
 */
var auth = function auth() {
  var token = uni.getStorageSync("token");
  if (!uni.getStorageSync("token")) {
    uni.navigateTo({
      url: '../login/login'
    });
    return;
  }
};
/**
 * 登陆
 */
exports.auth = auth;
var login = function login(tableName, data) {
  return _http.default.request({
    url: "".concat(tableName, "/login"),
    method: 'GET',
    data: data
  });
};
/**
 * 人脸识别登陆
 */
exports.login = login;
var faceLogin = function faceLogin(tableName, data) {
  return _http.default.request({
    url: "".concat(tableName, "/faceLogin"),
    method: 'GET',
    data: data
  });
};
/**
 *  * 发送邮箱验证码
 *   */
exports.faceLogin = faceLogin;
var sendemail = function sendemail(tableName, email) {
  return _http.default.request({
    url: "".concat(tableName, "/sendemail?email=").concat(email),
    method: 'GET'
  });
};
/**
 *  * 发送短信证码
 *   */
exports.sendemail = sendemail;
var sendsms = function sendsms(tableName, mobile) {
  return _http.default.request({
    url: "".concat(tableName, "/sendsms?mobile=").concat(mobile),
    method: 'GET'
  });
};
/**
 *  * 注册
 *   */
exports.sendsms = sendsms;
var register = function register(tableName, data) {
  var url = "".concat(tableName, "/register");
  return _http.default.request({
    url: url,
    method: 'POST',
    data: data
  });
};
/**
 *  * 邮箱注册
 *   */
exports.register = register;
var registerEmail = function registerEmail(tableName, data, emailcode) {
  var url = "".concat(tableName, "/register?emailcode=").concat(emailcode);
  return _http.default.request({
    url: url,
    method: 'POST',
    data: data
  });
};
/**
 *  * 短信注册
 *   */
exports.registerEmail = registerEmail;
var registerSms = function registerSms(tableName, data, smscode) {
  var url = "".concat(tableName, "/register?smscode=").concat(smscode);
  return _http.default.request({
    url: url,
    method: 'POST',
    data: data
  });
};
/**
 * 重置密码
 */
exports.registerSms = registerSms;
var resetPass = function resetPass(tableName, username) {
  var data = {
    username: username
  };
  return _http.default.request({
    url: "".concat(tableName, "/resetPass"),
    method: 'GET',
    data: data
  });
};
/**
 * 获取登陆用户信息
 */
exports.resetPass = resetPass;
var session = function session(tableName) {
  return _http.default.request({
    url: "".concat(tableName, "/session"),
    method: 'GET'
  });
};
/**
 * 查询
 */
exports.session = session;
var list = function list(tableName, data) {
  return _http.default.request({
    url: "".concat(tableName, "/list"),
    method: 'GET',
    data: data
  });
};
/**
 * 查询 page
 */
exports.list = list;
var page = function page(tableName, data) {
  return _http.default.request({
    url: "".concat(tableName, "/page"),
    method: 'GET',
    data: data
  });
};
/**
 * 保存
 */
exports.page = page;
var add = function add(tableName, data) {
  return _http.default.request({
    url: "".concat(tableName, "/add"),
    method: 'POST',
    data: data
  });
};
// 保存
exports.add = add;
var save = function save(tableName, data) {
  return _http.default.request({
    url: "".concat(tableName, "/save"),
    method: 'POST',
    data: data
  });
};
/**
 * 更新
 */
exports.save = save;
var update = function update(tableName, data) {
  return _http.default.request({
    url: "".concat(tableName, "/update"),
    method: 'POST',
    data: data
  });
};
exports.update = update;
var updateBrowseDuration = function updateBrowseDuration(tableName, id, duration, data) {
  return _http.default.request({
    url: "".concat(tableName, "/updateBrowseDuration/") + id + "?duration=" + duration,
    method: 'POST',
    data: data
  });
};
/**
 * 删除
 */
exports.updateBrowseDuration = updateBrowseDuration;
var del = function del(tableName, data) {
  return _http.default.request({
    url: "".concat(tableName, "/delete"),
    method: 'POST',
    data: data
  });
};
/**
 * 单条信息查询
 */
exports.del = del;
var info = function info(tableName, id) {
  return _http.default.request({
    url: "".concat(tableName, "/detail/").concat(id),
    method: 'GET'
  });
};
/**
 * 智能推荐
 */
exports.info = info;
var recommend = function recommend(tableName, data) {
  return _http.default.request({
    url: "".concat(tableName, "/autoSort"),
    method: 'get',
    data: data
  });
};
/**
 * 智能推荐(按购买类型推荐)
 */
exports.recommend = recommend;
var recommend2 = function recommend2(tableName, data) {
  return _http.default.request({
    url: "".concat(tableName, "/autoSort2"),
    method: 'get',
    data: data
  });
};
/**
 * 上传
 */
exports.recommend2 = recommend2;
var upload = function upload(callback) {
  uni.chooseImage({
    count: 4,
    //默认9
    sizeType: ['original', 'compressed'],
    //可以指定是原图还是压缩图，默认二者都有
    //sourceType: ['album'], //从相册选择
    success: function success(res) {
      uni.uploadFile({
        url: "".concat(_base.default.url, "file/upload"),
        //仅为示例，非真实的接口地址
        filePath: res.tempFilePaths[0],
        name: 'file',
        header: {
          'Token': uni.getStorageSync("token")
        },
        success: function success(uploadFileRes) {
          // console.log(uploadFileRes)
          var result = JSON.parse(uploadFileRes.data);
          if (result.code == 0) {
            callback(result);
          } else {
            uni.showToast({
              title: result.msg,
              icon: 'none',
              duration: 2000
            });
          }
        }
      });
    }
  });
};
/**
 * 垃圾识别
 */
exports.upload = upload;
var rubbish = function rubbish(tableName, fileName) {
  return _http.default.request({
    url: "".concat(tableName, "/aliyun/rubbish?fileName=") + fileName,
    method: 'GET'
  });
};
/**
 * 百度识别（文字，动物，植物，菜品）
 */
exports.rubbish = rubbish;
var baiduIdentify = function baiduIdentify(tableName, type, fileName) {
  return _http.default.request({
    url: "".concat(tableName, "/baidu/").concat(type, "?fileName=") + fileName,
    method: 'GET'
  });
};
exports.baiduIdentify = baiduIdentify;
var uploadMedia = function uploadMedia(callback) {
  uni.chooseVideo({
    count: 1,
    sourceType: ['camera', 'album'],
    success: function success(res) {
      console.log(res);
      uni.uploadFile({
        url: "".concat(_base.default.url, "file/upload"),
        //仅为示例，非真实的接口地址
        filePath: res.tempFilePath,
        name: 'file',
        header: {
          'Token': uni.getStorageSync("token")
        },
        success: function success(uploadFileRes) {
          // console.log(uploadFileRes)
          var result = JSON.parse(uploadFileRes.data);
          if (result.code == 0) {
            callback(result);
          } else {
            uni.showToast({
              title: result.msg,
              icon: 'none',
              duration: 2000
            });
          }
        }
      });
    }
  });
};

/**
 * 获取默认地址
 */
exports.uploadMedia = uploadMedia;
var defaultAddress = function defaultAddress(userid) {
  return _http.default.request({
    url: "address/default?userid=".concat(userid),
    method: 'GET'
  });
};
/**
 * 联动查询
 * @param {*} tableName 
 * @param {*} columnName 
 * @param {*} data 
 */
exports.defaultAddress = defaultAddress;
var option = function option(tableName, columnName, data) {
  return _http.default.request({
    url: "option/".concat(tableName, "/").concat(columnName),
    method: 'GET',
    data: data
  });
};
/**
 * 随
 * @param {*} tableName 
 * @param {*} columnName 
 * @param {*} data 
 */
exports.option = option;
var follow = function follow(tableName, columnName, data) {
  return _http.default.request({
    url: "follow/".concat(tableName, "/").concat(columnName),
    method: 'GET',
    data: data
  });
};
// 论坛接口
exports.follow = follow;
var allPublicForm = function allPublicForm() {
  var page = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : 1;
  var limit = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : 10;
  var title = arguments.length > 2 && arguments[2] !== undefined ? arguments[2] : '%%';
  var data = {
    page: page,
    limit: limit,
    title: title
  };
  return _http.default.request({
    url: "forum/flist?parentid=0&isdone=\u5F00\u653E&sort=addtime&order=desc",
    method: 'GET',
    data: data
  });
};
// 我的帖子
exports.allPublicForm = allPublicForm;
var myForum = function myForum() {
  var page = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : 1;
  var limit = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : 10;
  var data = {
    page: page,
    limit: limit
  };
  return _http.default.request({
    url: "forum/page?parentid=0&sort=addtime&order=desc",
    method: 'GET',
    data: data
  });
};
exports.myForum = myForum;
var forumDetail = function forumDetail(id) {
  return _http.default.request({
    url: "forum/list/".concat(id),
    method: 'GET'
  });
};
exports.forumDetail = forumDetail;
var groupby = function groupby() {
  return _http.default.request({
    url: "examrecord/groupby",
    method: 'GET'
  });
};
exports.groupby = groupby;
var deleteRecords = function deleteRecords(userid, paperid) {
  return _http.default.request({
    url: "examrecord/deleteRecords?userid=".concat(userid, "&paperid=").concat(paperid),
    method: 'POST'
  });
};
exports.deleteRecords = deleteRecords;
var faceMatch = function faceMatch(data) {
  return _http.default.request({
    url: "matchFace",
    method: 'GET',
    data: data
  });
};
exports.faceMatch = faceMatch;
var security = function security(tableName, data) {
  return _http.default.request({
    url: "".concat(tableName, "/security"),
    method: 'GET',
    data: data
  });
};
exports.security = security;
var _default = {
  login: login,
  // 登陆
  sendemail: sendemail,
  //发送邮箱验证码
  sendsms: sendsms,
  //发送短信验证码
  register: register,
  //注册
  registerEmail: registerEmail,
  //邮箱注册
  registerSms: registerSms,
  //短信注册
  resetPass: resetPass,
  // 重置
  auth: auth,
  // 校验
  session: session,
  // 个人信息
  list: list,
  // 查询
  page: page,
  // 查询 page
  add: add,
  // 添加
  update: update,
  // 修改
  updateBrowseDuration: updateBrowseDuration,
  del: del,
  // 删除
  info: info,
  // 单条信息查询,
  recommend: recommend,
  // 智能推荐
  recommend2: recommend2,
  // 智能推荐(按购买类型推荐)
  defaultAddress: defaultAddress,
  // 默认地址
  save: save,
  // 保存
  upload: upload,
  // 上传
  rubbish: rubbish,
  baiduIdentify: baiduIdentify,
  option: option,
  // 联动查询
  follow: follow,
  // 随
  allPublicForm: allPublicForm,
  myForum: myForum,
  forumDetail: forumDetail,
  groupby: groupby,
  deleteRecords: deleteRecords,
  faceMatch: faceMatch,
  uploadMedia: uploadMedia,
  faceLogin: faceLogin,
  security: security
};
exports.default = _default;
/* WEBPACK VAR INJECTION */}.call(this, __webpack_require__(/*! ./node_modules/@dcloudio/uni-mp-weixin/dist/index.js */ 1)["default"]))

/***/ }),

/***/ 34:
/*!*********************************************!*\
  !*** D:/project/前端/front/front/api/http.js ***!
  \*********************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";
/* WEBPACK VAR INJECTION */(function(uni) {

var _interopRequireDefault = __webpack_require__(/*! @babel/runtime/helpers/interopRequireDefault */ 3);
Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;
var _base = _interopRequireDefault(__webpack_require__(/*! ./base */ 35));
/**
 * 通用uni-app网络请求
 * 基于 Promise 对象实现更简单的 request 使用方式，支持请求和响应拦截
 */
var _default = {
  config: {
    baseUrl: _base.default.url,
    header: {
      'Content-Type': 'application/json;charset=UTF-8'
    },
    data: {},
    method: "GET",
    dataType: "json",
    // responseType: "json",
    success: function success() {},
    fail: function fail() {},
    complete: function complete() {}
  },
  interceptor: {
    request: null,
    response: null
  },
  request: function request(options) {
    var _this = this;
    if (!options) {
      options = {};
    }
    options.baseUrl = options.baseUrl || this.config.baseUrl;
    options.dataType = options.dataType || this.config.dataType;
    options.url = options.baseUrl + options.url;
    options.data = options.data || {};
    options.method = options.method || this.config.method;
    var token = {
      'Token': uni.getStorageSync("token")
    };
    options.header = Object.assign({}, options.header, token);
    return new Promise(function (resolve, reject) {
      var _config = null;
      options.complete = function (response) {
        var statusCode = response.statusCode;
        response.config = _config;
        if (true) {
          if (statusCode === 200) {
            // console.log("【" + _config.requestId + "】 结果：" + JSON.stringify(response.data))
          }
        }
        if (_this.interceptor.response) {
          var newResponse = _this.interceptor.response(response);
          if (newResponse) {
            response = newResponse;
          }
        }
        if (statusCode === 200) {
          //成功
          var rs = response.data;
          if (rs.code === 0) {
            // 请求成功后返回
            resolve(response.data);
          } else if (rs.code == 401) {
            uni.navigateTo({
              url: '../login/login'
            });
          } else {
            uni.showToast({
              title: rs.msg,
              icon: 'none',
              duration: 2000
            });
          }
        } else {
          uni.showToast({
            title: "接口执行异常",
            icon: 'none',
            duration: 2000
          });
          reject(response);
        }
      };
      _config = Object.assign({}, _this.config, options);
      _config.requestId = new Date().getTime();
      if (_this.interceptor.request) {
        _this.interceptor.request(_config);
      }
      if (true) {
        // console.log("【" + _config.requestId + "】 地址：" + _config.url)
        if (_config.data) {
          // console.log("【" + _config.requestId + "】 参数：" + JSON.stringify(_config.data))
        }
      }
      uni.request(_config);
    });
  },
  get: function get(url, data, options) {
    if (!options) {
      options = {};
    }
    options.url = url;
    options.data = data;
    options.method = 'GET';
    return this.request(options);
  },
  post: function post(url, data, options) {
    if (!options) {
      options = {};
    }
    options.url = url;
    options.data = data;
    options.method = 'POST';
    return this.request(options);
  },
  put: function put(url, data, options) {
    if (!options) {
      options = {};
    }
    options.url = url;
    options.data = data;
    options.method = 'PUT';
    return this.request(options);
  },
  delete: function _delete(url, data, options) {
    if (!options) {
      options = {};
    }
    options.url = url;
    options.data = data;
    options.method = 'DELETE';
    return this.request(options);
  }
};
/**
 * 请求接口日志记录
 */
exports.default = _default;
function _reqlog(req) {
  if (true) {
    // console.log("【" + req.requestId + "】 地址：" + req.url)
    if (req.data) {
      // console.log("【" + req.requestId + "】 请求参数：" + JSON.stringify(req.data))
    }
  }
}

/**
 * 响应接口日志记录
 */
function _reslog(res) {
  var _statusCode = res.statusCode;
  if (true) {
    // console.log("【" + res.config.requestId + "】 地址：" + res.config.url)
    if (res.config.data) {
      // console.log("【" + res.config.requestId + "】 请求参数：" + JSON.stringify(res.config.data))
    }
    // console.log("【" + res.config.requestId + "】 响应结果：" + JSON.stringify(res))
  }
}
/* WEBPACK VAR INJECTION */}.call(this, __webpack_require__(/*! ./node_modules/@dcloudio/uni-mp-weixin/dist/index.js */ 1)["default"]))

/***/ }),

/***/ 35:
/*!*********************************************!*\
  !*** D:/project/前端/front/front/api/base.js ***!
  \*********************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;
var base = {
  url: "http://localhost:8080/schoolreading/"
};
var _default = base;
exports.default = _default;

/***/ }),

/***/ 36:
/*!***************************************************!*\
  !*** D:/project/前端/front/front/utils/validate.js ***!
  \***************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.checkIdCard = checkIdCard;
exports.isEmail = isEmail;
exports.isIntNumer = isIntNumer;
exports.isMobile = isMobile;
exports.isNumber = isNumber;
exports.isPhone = isPhone;
exports.isURL = isURL;
/**
 * 邮箱
 * @param {*} s
 */
function isEmail(s) {
  return /^([a-zA-Z0-9_-])+@([a-zA-Z0-9_-])+((.[a-zA-Z0-9_-]{2,3}){1,2})$/.test(s);
}

/**
 * 手机号码
 * @param {*} s
 */
function isMobile(s) {
  return /^1[0-9]{10}$/.test(s);
}

/**
 * 电话号码
 * @param {*} s
 */
function isPhone(s) {
  return /^([0-9]{3,4}-)?[0-9]{7,8}$/.test(s);
}

/**
 * URL地址
 * @param {*} s
 */
function isURL(s) {
  return /^http[s]?:\/\/.*/.test(s);
}

/**
 * 匹配数字，可以是小数，不可以是负数,可以为空
 * @param {*} s 
 */
function isNumber(s) {
  return /(^-?[+-]?([0-9]*\.?[0-9]+|[0-9]+\.?[0-9]*)([eE][+-]?[0-9]+)?$)|(^$)/.test(s);
}
/**
 * 匹配整数，可以为空
 * @param {*} s 
 */
function isIntNumer(s) {
  return /(^-?\d+$)|(^$)/.test(s);
}
/**
 * 身份证校验
 */
function checkIdCard(idcard) {
  var regIdCard = /(^\d{15}$)|(^\d{18}$)|(^\d{17}(\d|X|x)$)/;
  if (!regIdCard.test(idcard)) {
    return false;
  } else {
    return true;
  }
}

/***/ }),

/***/ 37:
/*!*************************************************!*\
  !*** D:/project/前端/front/front/utils/system.js ***!
  \*************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";
/* WEBPACK VAR INJECTION */(function(uni) {

var _interopRequireDefault = __webpack_require__(/*! @babel/runtime/helpers/interopRequireDefault */ 3);
Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.isAuth = isAuth;
exports.isAuthFront = isAuthFront;
var _menu = _interopRequireDefault(__webpack_require__(/*! ./menu */ 38));
/**
 * 是否有权限(后台权限)
 * @param {*} key
 */
function isAuth(tableName, key) {
  var role = uni.getStorageSync("role");
  var menus = _menu.default.list();
  for (var i = 0; i < menus.length; i++) {
    if (menus[i].roleName == role) {
      for (var j = 0; j < menus[i].backMenu.length; j++) {
        for (var k = 0; k < menus[i].backMenu[j].child.length; k++) {
          if (tableName == menus[i].backMenu[j].child[k].tableName) {
            var buttons = menus[i].backMenu[j].child[k].buttons.join(',');
            return buttons.indexOf(key) !== -1 || false;
          }
        }
      }
    }
  }
  return false;
}

/**
 * 是否有权限(前台权限)
 * @param {*} key
 */
function isAuthFront(tableName, key) {
  var role = uni.getStorageSync("role");
  var menus = _menu.default.list();
  for (var i = 0; i < menus.length; i++) {
    if (menus[i].roleName == role) {
      for (var j = 0; j < menus[i].frontMenu.length; j++) {
        for (var k = 0; k < menus[i].frontMenu[j].child.length; k++) {
          if (tableName == menus[i].frontMenu[j].child[k].tableName) {
            var buttons = menus[i].frontMenu[j].child[k].buttons.join(',');
            return buttons.indexOf(key) !== -1 || false;
          }
        }
      }
    }
  }
  return false;
}
/* WEBPACK VAR INJECTION */}.call(this, __webpack_require__(/*! ./node_modules/@dcloudio/uni-mp-weixin/dist/index.js */ 1)["default"]))

/***/ }),

/***/ 38:
/*!***********************************************!*\
  !*** D:/project/前端/front/front/utils/menu.js ***!
  \***********************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;
var menu = {
  list: function list() {
    return [{
      "backMenu": [{
        "child": [{
          "appFrontIcon": "cuIcon-medal",
          "buttons": ["新增", "查看", "修改", "删除"],
          "menu": "家长",
          "menuJump": "列表",
          "tableName": "jiazhang"
        }],
        "menu": "家长管理"
      }, {
        "child": [{
          "appFrontIcon": "cuIcon-vipcard",
          "buttons": ["新增", "查看", "修改", "删除"],
          "menu": "活动组织者",
          "menuJump": "列表",
          "tableName": "huodongzuzhizhe"
        }],
        "menu": "活动组织者管理"
      }, {
        "child": [{
          "appFrontIcon": "cuIcon-similar",
          "buttons": ["新增", "查看", "修改", "删除"],
          "menu": "书籍分类",
          "menuJump": "列表",
          "tableName": "shujifenlei"
        }],
        "menu": "书籍分类管理"
      }, {
        "child": [{
          "appFrontIcon": "cuIcon-skin",
          "buttons": ["新增", "查看", "修改", "删除", "章节管理"],
          "menu": "书籍",
          "menuJump": "列表",
          "tableName": "shuji"
        }],
        "menu": "书籍管理"
      }, {
        "child": [{
          "appFrontIcon": "cuIcon-flashlightopen",
          "buttons": ["新增", "查看", "修改", "删除", "查看评论", "申请"],
          "menu": "读书会活动",
          "menuJump": "列表",
          "tableName": "dushuhuihuodong"
        }],
        "menu": "读书会活动管理"
      }, {
        "child": [{
          "appFrontIcon": "cuIcon-keyboard",
          "buttons": ["新增", "查看", "修改", "删除", "审核", "取消", "记录"],
          "menu": "活动申请",
          "menuJump": "列表",
          "tableName": "huodongshenqing"
        }],
        "menu": "活动申请管理"
      }, {
        "child": [{
          "appFrontIcon": "cuIcon-skin",
          "buttons": ["新增", "查看", "修改", "删除", "审核"],
          "menu": "取消申请",
          "menuJump": "列表",
          "tableName": "quxiaoshenqing"
        }],
        "menu": "取消申请管理"
      }, {
        "child": [{
          "appFrontIcon": "cuIcon-shop",
          "buttons": ["新增", "查看", "修改", "删除"],
          "menu": "活动日志",
          "menuJump": "列表",
          "tableName": "huodongrizhi"
        }],
        "menu": "活动日志管理"
      }, {
        "child": [{
          "appFrontIcon": "cuIcon-cardboard",
          "buttons": ["新增", "查看", "修改", "删除", "签到"],
          "menu": "阅读签到",
          "menuJump": "列表",
          "tableName": "yueduqiandao"
        }],
        "menu": "阅读签到管理"
      }, {
        "child": [{
          "appFrontIcon": "cuIcon-paint",
          "buttons": ["新增", "查看", "修改", "删除"],
          "menu": "签到打卡",
          "menuJump": "列表",
          "tableName": "qiandaodaka"
        }],
        "menu": "签到打卡管理"
      }, {
        "child": [{
          "appFrontIcon": "cuIcon-favor",
          "buttons": ["查看", "删除"],
          "menu": "我的收藏管理",
          "menuJump": "1",
          "tableName": "storeup"
        }],
        "menu": "我的收藏管理"
      }, {
        "child": [{
          "appFrontIcon": "cuIcon-group",
          "buttons": ["新增", "查看", "修改", "删除"],
          "menu": "会员交流",
          "tableName": "forum"
        }],
        "menu": "会员交流"
      }, {
        "child": [{
          "appFrontIcon": "cuIcon-circle",
          "buttons": ["新增", "查看", "修改", "删除"],
          "menu": "轮播图管理",
          "tableName": "config"
        }, {
          "appFrontIcon": "cuIcon-service",
          "buttons": ["新增", "查看", "修改", "删除"],
          "menu": "在线客服",
          "tableName": "chat"
        }],
        "menu": "系统管理"
      }],
      "frontMenu": [{
        "child": [{
          "appFrontIcon": "cuIcon-present",
          "buttons": ["查看"],
          "menu": "书籍列表",
          "menuJump": "列表",
          "tableName": "shuji"
        }],
        "menu": "书籍模块"
      }, {
        "child": [{
          "appFrontIcon": "cuIcon-time",
          "buttons": ["查看", "申请"],
          "menu": "读书会活动列表",
          "menuJump": "列表",
          "tableName": "dushuhuihuodong"
        }],
        "menu": "读书会活动模块"
      }, {
        "child": [{
          "appFrontIcon": "cuIcon-time",
          "buttons": ["查看"],
          "menu": "活动日志列表",
          "menuJump": "列表",
          "tableName": "huodongrizhi"
        }],
        "menu": "活动日志模块"
      }],
      "hasBackLogin": "是",
      "hasBackRegister": "否",
      "hasFrontLogin": "否",
      "hasFrontRegister": "否",
      "roleName": "管理员",
      "tableName": "users"
    }, {
      "backMenu": [{
        "child": [{
          "appFrontIcon": "cuIcon-keyboard",
          "buttons": ["查看", "取消", "记录", "删除"],
          "menu": "活动申请",
          "menuJump": "列表",
          "tableName": "huodongshenqing"
        }],
        "menu": "活动申请管理"
      }, {
        "child": [{
          "appFrontIcon": "cuIcon-skin",
          "buttons": ["查看", "删除"],
          "menu": "取消申请",
          "menuJump": "列表",
          "tableName": "quxiaoshenqing"
        }],
        "menu": "取消申请管理"
      }, {
        "child": [{
          "appFrontIcon": "cuIcon-shop",
          "buttons": ["查看", "修改", "删除"],
          "menu": "活动日志",
          "menuJump": "列表",
          "tableName": "huodongrizhi"
        }],
        "menu": "活动日志管理"
      }, {
        "child": [{
          "appFrontIcon": "cuIcon-cardboard",
          "buttons": ["查看", "签到"],
          "menu": "阅读签到",
          "menuJump": "列表",
          "tableName": "yueduqiandao"
        }],
        "menu": "阅读签到管理"
      }, {
        "child": [{
          "appFrontIcon": "cuIcon-paint",
          "buttons": ["查看", "删除"],
          "menu": "签到打卡",
          "menuJump": "列表",
          "tableName": "qiandaodaka"
        }],
        "menu": "签到打卡管理"
      }],
      "frontMenu": [{
        "child": [{
          "appFrontIcon": "cuIcon-present",
          "buttons": ["查看"],
          "menu": "书籍列表",
          "menuJump": "列表",
          "tableName": "shuji"
        }],
        "menu": "书籍模块"
      }, {
        "child": [{
          "appFrontIcon": "cuIcon-time",
          "buttons": ["查看", "申请"],
          "menu": "读书会活动列表",
          "menuJump": "列表",
          "tableName": "dushuhuihuodong"
        }],
        "menu": "读书会活动模块"
      }, {
        "child": [{
          "appFrontIcon": "cuIcon-time",
          "buttons": ["查看"],
          "menu": "活动日志列表",
          "menuJump": "列表",
          "tableName": "huodongrizhi"
        }],
        "menu": "活动日志模块"
      }],
      "hasBackLogin": "否",
      "hasBackRegister": "否",
      "hasFrontLogin": "是",
      "hasFrontRegister": "是",
      "roleName": "家长",
      "tableName": "jiazhang"
    }, {
      "backMenu": [{
        "child": [{
          "appFrontIcon": "cuIcon-flashlightopen",
          "buttons": ["新增", "查看", "修改", "删除", "查看评论"],
          "menu": "读书会活动",
          "menuJump": "列表",
          "tableName": "dushuhuihuodong"
        }],
        "menu": "读书会活动管理"
      }, {
        "child": [{
          "appFrontIcon": "cuIcon-keyboard",
          "buttons": ["查看", "删除", "审核"],
          "menu": "活动申请",
          "menuJump": "列表",
          "tableName": "huodongshenqing"
        }],
        "menu": "活动申请管理"
      }, {
        "child": [{
          "appFrontIcon": "cuIcon-skin",
          "buttons": ["查看", "删除", "审核"],
          "menu": "取消申请",
          "menuJump": "列表",
          "tableName": "quxiaoshenqing"
        }],
        "menu": "取消申请管理"
      }, {
        "child": [{
          "appFrontIcon": "cuIcon-shop",
          "buttons": ["查看"],
          "menu": "活动日志",
          "menuJump": "列表",
          "tableName": "huodongrizhi"
        }],
        "menu": "活动日志管理"
      }],
      "frontMenu": [{
        "child": [{
          "appFrontIcon": "cuIcon-present",
          "buttons": ["查看"],
          "menu": "书籍列表",
          "menuJump": "列表",
          "tableName": "shuji"
        }],
        "menu": "书籍模块"
      }, {
        "child": [{
          "appFrontIcon": "cuIcon-time",
          "buttons": ["查看", "申请"],
          "menu": "读书会活动列表",
          "menuJump": "列表",
          "tableName": "dushuhuihuodong"
        }],
        "menu": "读书会活动模块"
      }, {
        "child": [{
          "appFrontIcon": "cuIcon-time",
          "buttons": ["查看"],
          "menu": "活动日志列表",
          "menuJump": "列表",
          "tableName": "huodongrizhi"
        }],
        "menu": "活动日志模块"
      }],
      "hasBackLogin": "是",
      "hasBackRegister": "是",
      "hasFrontLogin": "否",
      "hasFrontRegister": "否",
      "roleName": "活动组织者",
      "tableName": "huodongzuzhizhe"
    }];
  }
};
var _default = menu;
exports.default = _default;

/***/ }),

/***/ 4:
/*!**************************************************************!*\
  !*** ./node_modules/@babel/runtime/helpers/slicedToArray.js ***!
  \**************************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

var arrayWithHoles = __webpack_require__(/*! ./arrayWithHoles.js */ 5);
var iterableToArrayLimit = __webpack_require__(/*! ./iterableToArrayLimit.js */ 6);
var unsupportedIterableToArray = __webpack_require__(/*! ./unsupportedIterableToArray.js */ 7);
var nonIterableRest = __webpack_require__(/*! ./nonIterableRest.js */ 9);
function _slicedToArray(arr, i) {
  return arrayWithHoles(arr) || iterableToArrayLimit(arr, i) || unsupportedIterableToArray(arr, i) || nonIterableRest();
}
module.exports = _slicedToArray, module.exports.__esModule = true, module.exports["default"] = module.exports;

/***/ }),

/***/ 446:
/*!******************************************************************!*\
  !*** D:/project/前端/front/front/assets/css/global-restaurant.css ***!
  \******************************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

// extracted by mini-css-extract-plugin
    if(false) { var cssReload; }
  

/***/ }),

/***/ 46:
/*!************************************************************************!*\
  !*** D:/project/前端/front/front/components/vue-jsonp/dist/index.esm.js ***!
  \************************************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


var _interopRequireDefault = __webpack_require__(/*! @babel/runtime/helpers/interopRequireDefault */ 3);
Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.VueJsonp = void 0;
exports.jsonp = o;
var _typeof2 = _interopRequireDefault(__webpack_require__(/*! @babel/runtime/helpers/typeof */ 12));
function e(t, n) {
  t = t.replace(/=/g, "");
  var o = [];
  switch (n.constructor) {
    case String:
    case Number:
    case Boolean:
      o.push(encodeURIComponent(t) + "=" + encodeURIComponent(n));
      break;
    case Array:
      n.forEach(function (n) {
        o = o.concat(e(t + "[]=", n));
      });
      break;
    case Object:
      Object.keys(n).forEach(function (r) {
        var a = n[r];
        o = o.concat(e(t + "[" + r + "]", a));
      });
  }
  return o;
}
function t(e) {
  var n = [];
  return e.forEach(function (e) {
    "string" == typeof e ? n.push(e) : n = n.concat(t(e));
  }), n;
}
/**
 * Vue Jsonp.
 * # Carry Your World #
 *
 * @author: LancerComet
 * @license: MIT
 */
var n = {
  install: function install(e) {
    e.prototype.$jsonp = o;
  }
};
exports.VueJsonp = n;
function o(n, o, r) {
  if (void 0 === o && (o = {}), "string" != typeof n) throw new Error('[Vue-jsonp] Type of param "url" is not string.');
  if ("object" != (0, _typeof2.default)(o) || !o) throw new Error("[Vue-jsonp] Invalid params, should be an object.");
  return r = "number" == typeof r ? r : 5e3, new Promise(function (a, c) {
    var u = "string" == typeof o.callbackQuery ? o.callbackQuery : "callback",
      i = "string" == typeof o.callbackName ? o.callbackName : "jsonp_" + (Math.floor(1e5 * Math.random()) * Date.now()).toString(16);
    o[u] = i, delete o.callbackQuery, delete o.callbackName;
    var s = [];
    Object.keys(o).forEach(function (t) {
      s = s.concat(e(t, o[t]));
    });
    var l = t(s).join("&"),
      f = function f() {
        p(), clearTimeout(m), c({
          status: 400,
          statusText: "Bad Request"
        });
      },
      p = function p() {
        b.removeEventListener("error", f);
      },
      d = function d() {
        document.body.removeChild(b), delete window[i];
      },
      m = null;
    r > -1 && (m = setTimeout(function () {
      p(), d(), c({
        statusText: "Request Timeout",
        status: 408
      });
    }, r)), window[i] = function (e) {
      clearTimeout(m), p(), d(), a(e);
    };
    var b = document.createElement("script");
    b.addEventListener("error", f), b.src = n + (/\?/.test(n) ? "&" : "?") + l, document.body.appendChild(b);
  });
}

/***/ }),

/***/ 5:
/*!***************************************************************!*\
  !*** ./node_modules/@babel/runtime/helpers/arrayWithHoles.js ***!
  \***************************************************************/
/*! no static exports found */
/***/ (function(module, exports) {

function _arrayWithHoles(arr) {
  if (Array.isArray(arr)) return arr;
}
module.exports = _arrayWithHoles, module.exports.__esModule = true, module.exports["default"] = module.exports;

/***/ }),

/***/ 515:
/*!*************************************************************************!*\
  !*** D:/project/前端/front/front/components/mescroll-uni/mescroll-uni.js ***!
  \*************************************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


var _interopRequireDefault = __webpack_require__(/*! @babel/runtime/helpers/interopRequireDefault */ 3);
Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = MeScroll;
var _typeof2 = _interopRequireDefault(__webpack_require__(/*! @babel/runtime/helpers/typeof */ 12));
/* mescroll-uni
 * version 1.1.8
 * 2019-11-01 wenju
 * http://www.mescroll.com
 */

function MeScroll(options) {
  var me = this;
  me.version = '1.1.8'; // mescroll版本号
  me.options = options || {}; // 配置

  me.isDownScrolling = false; // 是否在执行下拉刷新的回调
  me.isUpScrolling = false; // 是否在执行上拉加载的回调
  var hasDownCallback = me.options.down && me.options.down.callback; // 是否配置了down的callback

  // 初始化下拉刷新
  me.initDownScroll();
  // 初始化上拉加载,则初始化
  me.initUpScroll();

  // 自动加载
  setTimeout(function () {
    // 待主线程执行完毕再执行,避免new MeScroll未初始化,在回调获取不到mescroll的实例
    // 自动触发下拉刷新 (只有配置了down的callback才自动触发下拉刷新)
    if (me.optDown.use && me.optDown.auto && hasDownCallback) {
      if (me.optDown.autoShowLoading) {
        me.triggerDownScroll(); // 显示下拉进度,执行下拉回调
      } else {
        me.optDown.callback && me.optDown.callback(me); // 不显示下拉进度,直接执行下拉回调
      }
    }
    // 自动触发上拉加载
    me.optUp.use && me.optUp.auto && !me.isUpAutoLoad && me.triggerUpScroll();
  }, 30); // 需让me.optDown.inited和me.optUp.inited先执行
}

/* 配置参数:下拉刷新 */
MeScroll.prototype.extendDownScroll = function (optDown) {
  // 下拉刷新的配置
  MeScroll.extend(optDown, {
    use: true,
    // 是否启用下拉刷新; 默认true
    auto: true,
    // 是否在初始化完毕之后自动执行下拉刷新的回调; 默认true
    autoShowLoading: false,
    // 如果设置auto=true(在初始化完毕之后自动执行下拉刷新的回调),那么是否显示下拉刷新的进度; 默认false
    isLock: false,
    // 是否锁定下拉刷新,默认false;
    offset: 80,
    // 在列表顶部,下拉大于80px,松手即可触发下拉刷新的回调
    startTop: 100,
    // scroll-view滚动到顶部时,此时的scroll-top不一定为0, 此值用于控制最大的误差
    fps: 40,
    // 下拉节流 (值越大每秒刷新频率越高)
    inOffsetRate: 1,
    // 在列表顶部,下拉的距离小于offset时,改变下拉区域高度比例;值小于1且越接近0,高度变化越小,表现为越往下越难拉
    outOffsetRate: 0.2,
    // 在列表顶部,下拉的距离大于offset时,改变下拉区域高度比例;值小于1且越接近0,高度变化越小,表现为越往下越难拉
    bottomOffset: 20,
    // 当手指touchmove位置在距离body底部20px范围内的时候结束上拉刷新,避免Webview嵌套导致touchend事件不执行
    minAngle: 45,
    // 向下滑动最少偏移的角度,取值区间  [0,90];默认45度,即向下滑动的角度大于45度则触发下拉;而小于45度,将不触发下拉,避免与左右滑动的轮播等组件冲突;
    textInOffset: '下拉刷新',
    // 下拉的距离在offset范围内的提示文本
    textOutOffset: '释放更新',
    // 下拉的距离大于offset范围的提示文本
    textLoading: '加载中 ...',
    // 加载中的提示文本
    inited: null,
    // 下拉刷新初始化完毕的回调
    inOffset: null,
    // 下拉的距离进入offset范围内那一刻的回调
    outOffset: null,
    // 下拉的距离大于offset那一刻的回调
    onMoving: null,
    // 下拉过程中的回调,滑动过程一直在执行; rate下拉区域当前高度与指定距离的比值(inOffset: rate<1; outOffset: rate>=1); downHight当前下拉区域的高度
    beforeLoading: null,
    // 准备触发下拉刷新的回调: 如果return true,将不触发showLoading和callback回调; 常用来完全自定义下拉刷新, 参考案例【淘宝 v6.8.0】
    showLoading: null,
    // 显示下拉刷新进度的回调
    afterLoading: null,
    // 准备结束下拉的回调. 返回结束下拉的延时执行时间,默认0ms; 常用于结束下拉之前再显示另外一小段动画,才去隐藏下拉刷新的场景, 参考案例【dotJump】
    endDownScroll: null,
    // 结束下拉刷新的回调
    callback: function callback(mescroll) {
      // 下拉刷新的回调;默认重置上拉加载列表为第一页
      mescroll.resetUpScroll();
    }
  });
};

/* 配置参数:上拉加载 */
MeScroll.prototype.extendUpScroll = function (optUp) {
  // 上拉加载的配置
  MeScroll.extend(optUp, {
    use: true,
    // 是否启用上拉加载; 默认true
    auto: true,
    // 是否在初始化完毕之后自动执行上拉加载的回调; 默认true
    isLock: false,
    // 是否锁定上拉加载,默认false;
    isBoth: true,
    // 上拉加载时,如果滑动到列表顶部是否可以同时触发下拉刷新;默认true,两者可同时触发;
    isBounce: false,
    // 默认禁止橡皮筋的回弹效果, 必读事项: http://www.mescroll.com/qa.html?v=190725#q25
    callback: null,
    // 上拉加载的回调;function(page,mescroll){ }
    page: {
      num: 0,
      // 当前页码,默认0,回调之前会加1,即callback(page)会从1开始
      size: 10,
      // 每页数据的数量
      time: null // 加载第一页数据服务器返回的时间; 防止用户翻页时,后台新增了数据从而导致下一页数据重复;
    },

    noMoreSize: 5,
    // 如果列表已无数据,可设置列表的总数量要大于等于5条才显示无更多数据;避免列表数据过少(比如只有一条数据),显示无更多数据会不好看
    offset: 80,
    // 距底部多远时,触发upCallback
    textLoading: '加载中 ...',
    // 加载中的提示文本
    textNoMore: '-- END --',
    // 没有更多数据的提示文本
    inited: null,
    // 初始化完毕的回调
    showLoading: null,
    // 显示加载中的回调
    showNoMore: null,
    // 显示无更多数据的回调
    hideUpScroll: null,
    // 隐藏上拉加载的回调
    toTop: {
      // 回到顶部按钮,需配置src才显示
      src: null,
      // 图片路径,默认null (建议写成网络图,不必考虑相对路径)
      offset: 1000,
      // 列表滚动多少距离才显示回到顶部按钮,默认1000
      duration: 300,
      // 回到顶部的动画时长,默认300ms
      btnClick: null,
      // 点击按钮的回调
      onShow: null // 是否显示的回调
    },

    empty: {
      use: true,
      // 是否显示空布局
      icon: null,
      // 图标路径
      tip: '~ 暂无相关数据 ~',
      // 提示
      btnText: '',
      // 按钮
      btnClick: null,
      // 点击按钮的回调
      onShow: null // 是否显示的回调
    },

    onScroll: false // 是否监听滚动事件
  });
};

/* 配置参数 */
MeScroll.extend = function (userOption, defaultOption) {
  if (!userOption) return defaultOption;
  for (var key in defaultOption) {
    if (userOption[key] == null) {
      var def = defaultOption[key];
      if (def != null && (0, _typeof2.default)(def) === 'object') {
        userOption[key] = MeScroll.extend({}, def); // 深度匹配
      } else {
        userOption[key] = def;
      }
    } else if ((0, _typeof2.default)(userOption[key]) === 'object') {
      MeScroll.extend(userOption[key], defaultOption[key]); // 深度匹配
    }
  }

  return userOption;
};

/* -------初始化下拉刷新------- */
MeScroll.prototype.initDownScroll = function () {
  var me = this;
  // 配置参数
  me.optDown = me.options.down || {};
  me.extendDownScroll(me.optDown);
  me.downHight = 0; // 下拉区域的高度

  // 在页面中加入下拉布局
  if (me.optDown.use && me.optDown.inited) {
    // 初始化完毕的回调
    setTimeout(function () {
      // 待主线程执行完毕再执行,避免new MeScroll未初始化,在回调获取不到mescroll的实例
      me.optDown.inited(me);
    }, 0);
  }
};

/* 列表touchstart事件 */
MeScroll.prototype.touchstartEvent = function (e) {
  if (!this.optDown.use) return;
  this.startPoint = this.getPoint(e); // 记录起点
  this.startTop = this.getScrollTop(); // 记录此时的滚动条位置
  this.lastPoint = this.startPoint; // 重置上次move的点
  this.maxTouchmoveY = this.getBodyHeight() - this.optDown.bottomOffset; // 手指触摸的最大范围(写在touchstart避免body获取高度为0的情况)
  this.inTouchend = false; // 标记不是touchend
};

/* 列表touchmove事件 */
MeScroll.prototype.touchmoveEvent = function (e) {
  if (!this.optDown.use) return;
  if (!this.startPoint) return;
  var me = this;

  // 节流
  var t = new Date().getTime();
  if (me.moveTime && t - me.moveTime < me.moveTimeDiff) {
    // 小于节流时间,则不处理
    return;
  } else {
    me.moveTime = t;
    me.moveTimeDiff = 1000 / me.optDown.fps;
  }
  var scrollTop = me.getScrollTop(); // 当前滚动条的距离
  var curPoint = me.getPoint(e); // 当前点

  var moveY = curPoint.y - me.startPoint.y; // 和起点比,移动的距离,大于0向下拉,小于0向上拉

  // (向下拉&&在顶部) scroll-view在滚动时不会触发touchmove,当触顶/底/左/右时,才会触发touchmove
  // scroll-view滚动到顶部时,scrollTop不一定为0; 在iOS的APP中scrollTop可能为负数,不一定和startTop相等
  if (moveY > 0 && (scrollTop <= 0 || scrollTop <= me.optDown.startTop && scrollTop === me.startTop)) {
    // 可下拉的条件
    if (me.optDown.use && !me.inTouchend && !me.isDownScrolling && !me.optDown.isLock && (!me.isUpScrolling || me.isUpScrolling && me.optUp.isBoth)) {
      // 下拉的角度是否在配置的范围内
      var x = Math.abs(me.lastPoint.x - curPoint.x);
      var y = Math.abs(me.lastPoint.y - curPoint.y);
      var z = Math.sqrt(x * x + y * y);
      if (z !== 0) {
        var angle = Math.asin(y / z) / Math.PI * 180; // 两点之间的角度,区间 [0,90]
        if (angle < me.optDown.minAngle) return; // 如果小于配置的角度,则不往下执行下拉刷新
      }

      // 如果手指的位置超过配置的距离,则提前结束下拉,避免Webview嵌套导致touchend无法触发
      if (me.maxTouchmoveY > 0 && curPoint.y >= me.maxTouchmoveY) {
        me.inTouchend = true; // 标记执行touchend
        me.touchendEvent(); // 提前触发touchend
        return;
      }
      me.preventDefault(e); // 阻止默认事件

      var diff = curPoint.y - me.lastPoint.y; // 和上次比,移动的距离 (大于0向下,小于0向上)

      // 下拉距离  < 指定距离
      if (me.downHight < me.optDown.offset) {
        if (me.movetype !== 1) {
          me.movetype = 1; // 加入标记,保证只执行一次
          me.optDown.inOffset && me.optDown.inOffset(me); // 进入指定距离范围内那一刻的回调,只执行一次
          me.isMoveDown = true; // 标记下拉区域高度改变,在touchend重置回来
        }

        me.downHight += diff * me.optDown.inOffsetRate; // 越往下,高度变化越小

        // 指定距离  <= 下拉距离
      } else {
        if (me.movetype !== 2) {
          me.movetype = 2; // 加入标记,保证只执行一次
          me.optDown.outOffset && me.optDown.outOffset(me); // 下拉超过指定距离那一刻的回调,只执行一次
          me.isMoveDown = true; // 标记下拉区域高度改变,在touchend重置回来
        }

        if (diff > 0) {
          // 向下拉
          me.downHight += Math.round(diff * me.optDown.outOffsetRate); // 越往下,高度变化越小
        } else {
          // 向上收
          me.downHight += diff; // 向上收回高度,则向上滑多少收多少高度
        }
      }

      var rate = me.downHight / me.optDown.offset; // 下拉区域当前高度与指定距离的比值
      me.optDown.onMoving && me.optDown.onMoving(me, rate, me.downHight); // 下拉过程中的回调,一直在执行
    }
  }

  me.lastPoint = curPoint; // 记录本次移动的点
};

/* 列表touchend事件 */
MeScroll.prototype.touchendEvent = function (e) {
  if (!this.optDown.use) return;
  // 如果下拉区域高度已改变,则需重置回来
  if (this.isMoveDown) {
    if (this.downHight >= this.optDown.offset) {
      // 符合触发刷新的条件
      this.triggerDownScroll();
    } else {
      // 不符合的话 则重置
      this.downHight = 0;
      this.optDown.endDownScroll && this.optDown.endDownScroll(this);
    }
    this.movetype = 0;
    this.isMoveDown = false;
  } else if (this.getScrollTop() === this.startTop) {
    // 到顶/左/右/底的滑动事件
    var isScrollUp = this.getPoint(e).y - this.startPoint.y < 0; // 和起点比,移动的距离,大于0向下拉,小于0向上拉
    // 上滑 && 检查并触发上拉
    isScrollUp && this.triggerUpScroll(true);
  }
};

/* 根据点击滑动事件获取第一个手指的坐标 */
MeScroll.prototype.getPoint = function (e) {
  if (!e) {
    return {
      x: 0,
      y: 0
    };
  }
  if (e.touches && e.touches[0]) {
    return {
      x: e.touches[0].pageX,
      y: e.touches[0].pageY
    };
  } else if (e.changedTouches && e.changedTouches[0]) {
    return {
      x: e.changedTouches[0].pageX,
      y: e.changedTouches[0].pageY
    };
  } else {
    return {
      x: e.clientX,
      y: e.clientY
    };
  }
};

/* 触发下拉刷新 */
MeScroll.prototype.triggerDownScroll = function () {
  if (this.optDown.beforeLoading && this.optDown.beforeLoading(this)) {
    //return true则处于完全自定义状态
  } else {
    this.showDownScroll(); // 下拉刷新中...
    this.optDown.callback && this.optDown.callback(this); // 执行回调,联网加载数据
  }
};

/* 显示下拉进度布局 */
MeScroll.prototype.showDownScroll = function () {
  this.isDownScrolling = true; // 标记下拉中
  this.downHight = this.optDown.offset; // 更新下拉区域高度
  this.optDown.showLoading(this, this.downHight); // 下拉刷新中...
};

/* 结束下拉刷新 */
MeScroll.prototype.endDownScroll = function () {
  var me = this;
  // 结束下拉刷新的方法
  var endScroll = function endScroll() {
    me.downHight = 0;
    me.isDownScrolling = false;
    me.optDown.endDownScroll && me.optDown.endDownScroll(me);
    me.setScrollHeight(0); // 重置滚动区域,使数据不满屏时仍可检查触发翻页
  };
  // 结束下拉刷新时的回调
  var delay = 0;
  if (me.optDown.afterLoading) delay = me.optDown.afterLoading(me); // 结束下拉刷新的延时,单位ms
  if (typeof delay === 'number' && delay > 0) {
    setTimeout(endScroll, delay);
  } else {
    endScroll();
  }
};

/* 锁定下拉刷新:isLock=ture,null锁定;isLock=false解锁 */
MeScroll.prototype.lockDownScroll = function (isLock) {
  if (isLock == null) isLock = true;
  this.optDown.isLock = isLock;
};

/* -------初始化上拉加载------- */
MeScroll.prototype.initUpScroll = function () {
  var me = this;
  // 配置参数
  me.optUp = me.options.up || {
    use: false
  };
  me.extendUpScroll(me.optUp);
  if (!me.optUp.isBounce) me.setBounce(false); // 不允许bounce时,需禁止window的touchmove事件

  if (me.optUp.use === false) return; // 配置不使用上拉加载时,则不初始化上拉布局
  me.optUp.hasNext = true; // 如果使用上拉,则默认有下一页
  me.startNum = me.optUp.page.num + 1; // 记录page开始的页码

  // 初始化完毕的回调
  if (me.optUp.inited) {
    setTimeout(function () {
      // 待主线程执行完毕再执行,避免new MeScroll未初始化,在回调获取不到mescroll的实例
      me.optUp.inited(me);
    }, 0);
  }
};

/*列表滚动事件*/
MeScroll.prototype.scroll = function (e, onScroll) {
  // 更新滚动条的位置
  this.setScrollTop(e.scrollTop);
  // 更新滚动内容高度
  this.setScrollHeight(e.scrollHeight);

  // 向上滑还是向下滑动
  if (this.preScrollY == null) this.preScrollY = 0;
  this.isScrollUp = e.scrollTop - this.preScrollY > 0;
  this.preScrollY = e.scrollTop;

  // 上滑 && 检查并触发上拉
  this.isScrollUp && this.triggerUpScroll(true);

  // 顶部按钮的显示隐藏
  if (e.scrollTop >= this.optUp.toTop.offset) {
    this.showTopBtn();
  } else {
    this.hideTopBtn();
  }

  // 滑动监听
  this.optUp.onScroll && onScroll && onScroll();
};

/* 触发上拉加载 */
MeScroll.prototype.triggerUpScroll = function (isCheck) {
  if (!this.isUpScrolling && this.optUp.use && this.optUp.callback) {
    // 是否校验在底部; 默认不校验
    if (isCheck === true) {
      var canUp = false;
      // 还有下一页 && 没有锁定 && 不在下拉中
      if (this.optUp.hasNext && !this.optUp.isLock && !this.isDownScrolling) {
        if (this.getScrollBottom() <= this.optUp.offset) {
          // 到底部
          canUp = true; // 标记可上拉
        }
      }

      if (canUp === false) return;
    }
    this.showUpScroll(); // 上拉加载中...
    this.optUp.page.num++; // 预先加一页,如果失败则减回
    this.isUpAutoLoad = true; // 标记上拉已经自动执行过,避免初始化时多次触发上拉回调
    this.num = this.optUp.page.num; // 把最新的页数赋值在mescroll上,避免对page的影响
    this.size = this.optUp.page.size; // 把最新的页码赋值在mescroll上,避免对page的影响
    this.time = this.optUp.page.time; // 把最新的页码赋值在mescroll上,避免对page的影响
    this.optUp.callback(this); // 执行回调,联网加载数据
  }
};

/* 显示上拉加载中 */
MeScroll.prototype.showUpScroll = function () {
  this.isUpScrolling = true; // 标记上拉加载中
  this.optUp.showLoading && this.optUp.showLoading(this); // 回调
};

/* 显示上拉无更多数据 */
MeScroll.prototype.showNoMore = function () {
  this.optUp.hasNext = false; // 标记无更多数据
  this.optUp.showNoMore && this.optUp.showNoMore(this); // 回调
};

/* 隐藏上拉区域**/
MeScroll.prototype.hideUpScroll = function () {
  this.optUp.hideUpScroll && this.optUp.hideUpScroll(this); // 回调
};

/* 结束上拉加载 */
MeScroll.prototype.endUpScroll = function (isShowNoMore) {
  if (isShowNoMore != null) {
    // isShowNoMore=null,不处理下拉状态,下拉刷新的时候调用
    if (isShowNoMore) {
      this.showNoMore(); // isShowNoMore=true,显示无更多数据
    } else {
      this.hideUpScroll(); // isShowNoMore=false,隐藏上拉加载
    }
  }

  this.isUpScrolling = false; // 标记结束上拉加载
};

/* 重置上拉加载列表为第一页
 *isShowLoading 是否显示进度布局;
 * 1.默认null,不传参,则显示上拉加载的进度布局
 * 2.传参true, 则显示下拉刷新的进度布局
 * 3.传参false,则不显示上拉和下拉的进度 (常用于静默更新列表数据)
 */
MeScroll.prototype.resetUpScroll = function (isShowLoading) {
  if (this.optUp && this.optUp.use) {
    var page = this.optUp.page;
    this.prePageNum = page.num; // 缓存重置前的页码,加载失败可退回
    this.prePageTime = page.time; // 缓存重置前的时间,加载失败可退回
    page.num = this.startNum; // 重置为第一页
    page.time = null; // 重置时间为空
    if (!this.isDownScrolling && isShowLoading !== false) {
      // 如果不是下拉刷新触发的resetUpScroll并且不配置列表静默更新,则显示进度;
      if (isShowLoading == null) {
        this.removeEmpty(); // 移除空布局
        this.showUpScroll(); // 不传参,默认显示上拉加载的进度布局
      } else {
        this.showDownScroll(); // 传true,显示下拉刷新的进度布局,不清空列表
      }
    }

    this.isUpAutoLoad = true; // 标记上拉已经自动执行过,避免初始化时多次触发上拉回调
    this.num = page.num; // 把最新的页数赋值在mescroll上,避免对page的影响
    this.size = page.size; // 把最新的页码赋值在mescroll上,避免对page的影响
    this.time = page.time; // 把最新的页码赋值在mescroll上,避免对page的影响
    this.optUp.callback && this.optUp.callback(this); // 执行上拉回调
  }
};

/* 设置page.num的值 */
MeScroll.prototype.setPageNum = function (num) {
  this.optUp.page.num = num - 1;
};

/* 设置page.size的值 */
MeScroll.prototype.setPageSize = function (size) {
  this.optUp.page.size = size;
};

/* 联网回调成功,结束下拉刷新和上拉加载
 * dataSize: 当前页的数据量(必传)
 * totalPage: 总页数(必传)
 * systime: 服务器时间 (可空)
 */
MeScroll.prototype.endByPage = function (dataSize, totalPage, systime) {
  var hasNext;
  if (this.optUp.use && totalPage != null) hasNext = this.optUp.page.num < totalPage; // 是否还有下一页
  this.endSuccess(dataSize, hasNext, systime);
};

/* 联网回调成功,结束下拉刷新和上拉加载
 * dataSize: 当前页的数据量(必传)
 * totalSize: 列表所有数据总数量(必传)
 * systime: 服务器时间 (可空)
 */
MeScroll.prototype.endBySize = function (dataSize, totalSize, systime) {
  var hasNext;
  if (this.optUp.use && totalSize != null) {
    var loadSize = (this.optUp.page.num - 1) * this.optUp.page.size + dataSize; // 已加载的数据总数
    hasNext = loadSize < totalSize; // 是否还有下一页
  }

  this.endSuccess(dataSize, hasNext, systime);
};

/* 联网回调成功,结束下拉刷新和上拉加载
 * dataSize: 当前页的数据个数(不是所有页的数据总和),用于上拉加载判断是否还有下一页.如果不传,则会判断还有下一页
 * hasNext: 是否还有下一页,布尔类型;用来解决这个小问题:比如列表共有20条数据,每页加载10条,共2页.如果只根据dataSize判断,则需翻到第三页才会知道无更多数据,如果传了hasNext,则翻到第二页即可显示无更多数据.
 * systime: 服务器时间(可空);用来解决这个小问题:当准备翻下一页时,数据库新增了几条记录,此时翻下一页,前面的几条数据会和上一页的重复;这里传入了systime,那么upCallback的page.time就会有值,把page.time传给服务器,让后台过滤新加入的那几条记录
 */
MeScroll.prototype.endSuccess = function (dataSize, hasNext, systime) {
  var me = this;
  // 结束下拉刷新
  if (me.isDownScrolling) me.endDownScroll();

  // 结束上拉加载
  if (me.optUp.use) {
    var isShowNoMore; // 是否已无更多数据
    if (dataSize != null) {
      var pageNum = me.optUp.page.num; // 当前页码
      var pageSize = me.optUp.page.size; // 每页长度
      // 如果是第一页
      if (pageNum === 1) {
        if (systime) me.optUp.page.time = systime; // 设置加载列表数据第一页的时间
      }

      if (dataSize < pageSize || hasNext === false) {
        // 返回的数据不满一页时,则说明已无更多数据
        me.optUp.hasNext = false;
        if (dataSize === 0 && pageNum === 1) {
          // 如果第一页无任何数据且配置了空布局
          isShowNoMore = false;
          me.showEmpty();
        } else {
          // 总列表数少于配置的数量,则不显示无更多数据
          var allDataSize = (pageNum - 1) * pageSize + dataSize;
          if (allDataSize < me.optUp.noMoreSize) {
            isShowNoMore = false;
          } else {
            isShowNoMore = true;
          }
          me.removeEmpty(); // 移除空布局
        }
      } else {
        // 还有下一页
        isShowNoMore = false;
        me.optUp.hasNext = true;
        me.removeEmpty(); // 移除空布局
      }
    }

    // 隐藏上拉
    me.endUpScroll(isShowNoMore);
  }
};

/* 回调失败,结束下拉刷新和上拉加载 */
MeScroll.prototype.endErr = function () {
  // 结束下拉,回调失败重置回原来的页码和时间
  if (this.isDownScrolling) {
    var page = this.optUp.page;
    if (page && this.prePageNum) {
      page.num = this.prePageNum;
      page.time = this.prePageTime;
    }
    this.endDownScroll();
  }
  // 结束上拉,回调失败重置回原来的页码
  if (this.isUpScrolling) {
    this.optUp.page.num--;
    this.endUpScroll(false);
  }
};

/* 显示空布局 */
MeScroll.prototype.showEmpty = function () {
  this.optUp.empty.use && this.optUp.empty.onShow && this.optUp.empty.onShow(true);
};

/* 移除空布局 */
MeScroll.prototype.removeEmpty = function () {
  this.optUp.empty.use && this.optUp.empty.onShow && this.optUp.empty.onShow(false);
};

/* 显示回到顶部的按钮 */
MeScroll.prototype.showTopBtn = function () {
  if (!this.topBtnShow) {
    this.topBtnShow = true;
    this.optUp.toTop.onShow && this.optUp.toTop.onShow(true);
  }
};

/* 隐藏回到顶部的按钮 */
MeScroll.prototype.hideTopBtn = function () {
  if (this.topBtnShow) {
    this.topBtnShow = false;
    this.optUp.toTop.onShow && this.optUp.toTop.onShow(false);
  }
};

/* 获取滚动条的位置 */
MeScroll.prototype.getScrollTop = function () {
  return this.scrollTop || 0;
};

/* 记录滚动条的位置 */
MeScroll.prototype.setScrollTop = function (y) {
  this.scrollTop = y;
};

/* 滚动到指定位置 */
MeScroll.prototype.scrollTo = function (y, t) {
  this.myScrollTo && this.myScrollTo(y, t); // scrollview需自定义回到顶部方法
};

/* 自定义scrollTo */
MeScroll.prototype.resetScrollTo = function (myScrollTo) {
  this.myScrollTo = myScrollTo;
};

/* 滚动条到底部的距离 */
MeScroll.prototype.getScrollBottom = function () {
  return this.getScrollHeight() - this.getClientHeight() - this.getScrollTop();
};

/* 计步器
 star: 开始值
 end: 结束值
 callback(step,timer): 回调step值,计步器timer,可自行通过window.clearInterval(timer)结束计步器;
 t: 计步时长,传0则直接回调end值;不传则默认300ms
 rate: 周期;不传则默认30ms计步一次
 * */
MeScroll.prototype.getStep = function (star, end, callback, t, rate) {
  var diff = end - star; // 差值
  if (t === 0 || diff === 0) {
    callback && callback(end);
    return;
  }
  t = t || 300; // 时长 300ms
  rate = rate || 30; // 周期 30ms
  var count = t / rate; // 次数
  var step = diff / count; // 步长
  var i = 0; // 计数
  var timer = setInterval(function () {
    if (i < count - 1) {
      star += step;
      callback && callback(star, timer);
      i++;
    } else {
      callback && callback(end, timer); // 最后一次直接设置end,避免计算误差
      clearInterval(timer);
    }
  }, rate);
};

/* 滚动容器的高度 */
MeScroll.prototype.getClientHeight = function (isReal) {
  var h = this.clientHeight || 0;
  if (h === 0 && isReal !== true) {
    // 未获取到容器的高度,可临时取body的高度 (可能会有误差)
    h = this.getBodyHeight();
  }
  return h;
};
MeScroll.prototype.setClientHeight = function (h) {
  this.clientHeight = h;
};

/* 滚动内容的高度 */
MeScroll.prototype.getScrollHeight = function () {
  return this.scrollHeight || 0;
};
MeScroll.prototype.setScrollHeight = function (h) {
  this.scrollHeight = h;
};

/* body的高度 */
MeScroll.prototype.getBodyHeight = function () {
  return this.bodyHeight || 0;
};
MeScroll.prototype.setBodyHeight = function (h) {
  this.bodyHeight = h;
};

/* 阻止浏览器默认滚动事件 */
MeScroll.prototype.preventDefault = function (e) {
  // 小程序不支持e.preventDefault
  // app的bounce只能通过配置pages.json的style.app-plus.bounce为"none"来禁止
  // cancelable:是否可以被禁用; defaultPrevented:是否已经被禁用
  if (e && e.cancelable && !e.defaultPrevented) e.preventDefault();
};

/* 是否允许下拉回弹(橡皮筋效果); true或null为允许; false禁止bounce */
MeScroll.prototype.setBounce = function (isBounce) {};

/***/ }),

/***/ 516:
/*!********************************************************************************!*\
  !*** D:/project/前端/front/front/components/mescroll-uni/mescroll-uni-option.js ***!
  \********************************************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;
// mescroll 全局配置
var GlobalOption = {
  down: {
    // 其他down的配置参数也可以写,这里只展示了常用的配置:
    textInOffset: '下拉刷新',
    // 下拉的距离在offset范围内的提示文本
    textOutOffset: '释放更新',
    // 下拉的距离大于offset范围的提示文本
    textLoading: '加载中 ...',
    // 加载中的提示文本
    offset: 80 // 在列表顶部,下拉大于80upx,松手即可触发下拉刷新的回调
  },

  up: {
    // 其他up的配置参数也可以写,这里只展示了常用的配置:
    textLoading: '加载中 ...',
    // 加载中的提示文本
    textNoMore: '-- END --',
    // 没有更多数据的提示文本
    offset: 80,
    // 距底部多远时,触发upCallback
    isBounce: false,
    // 默认禁止橡皮筋的回弹效果, 必读事项: http://www.mescroll.com/qa.html?v=190725#q25
    toTop: {
      // 回到顶部按钮,需配置src才显示
      src: "http://www.mescroll.com/img/mescroll-totop.png?v=1",
      // 图片路径 (建议放入static目录, 如 /static/img/mescroll-totop.png )
      offset: 1000,
      // 列表滚动多少距离才显示回到顶部按钮,默认1000
      duration: 300 // 回到顶部的动画时长,默认300ms
    },

    empty: {
      use: true,
      // 是否显示空布局
      icon: "http://www.mescroll.com/img/mescroll-empty.png?v=1",
      // 图标路径 (建议放入static目录, 如 /static/img/mescroll-empty.png )
      tip: '~ 暂无相关数据 ~' // 提示
    }
  }
};
var _default = GlobalOption;
exports.default = _default;

/***/ }),

/***/ 524:
/*!*********************************************************************************!*\
  !*** D:/project/前端/front/front/components/zebra-swiper/libs/mixins/relation.js ***!
  \*********************************************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";
/* WEBPACK VAR INJECTION */(function(uni) {

var _interopRequireDefault = __webpack_require__(/*! @babel/runtime/helpers/interopRequireDefault */ 3);
Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.ChildrenMixin = ChildrenMixin;
exports.ParentMixin = ParentMixin;
var _toConsumableArray2 = _interopRequireDefault(__webpack_require__(/*! @babel/runtime/helpers/toConsumableArray */ 17));
var _defineProperty2 = _interopRequireDefault(__webpack_require__(/*! @babel/runtime/helpers/defineProperty */ 10));
function ChildrenMixin(parent) {
  var options = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : {};
  var indexKey = options.indexKey || 'index';
  return {
    inject: (0, _defineProperty2.default)({}, parent, {
      default: null
    }),
    mounted: function mounted() {
      this.parent = this[parent];
      this.bindRelation();
    },
    beforeDestroy: function beforeDestroy() {
      var _this = this;
      if (this.parent) {
        this.parent.children = this.parent.children.filter(function (item) {
          return item !== _this;
        });
        uni.$emit("childrenReady" + this.parent._uid, this);
      }
    },
    methods: {
      bindRelation: function bindRelation() {
        if (!this.parent || this.parent.children.indexOf(this) !== -1) {
          return;
        }
        var children = [].concat((0, _toConsumableArray2.default)(this.parent.children), [this]);
        this.parent.children = children;
        this.index = this.parent.children.indexOf(this);
        uni.$emit("childrenReady" + this.parent._uid, this);
      }
    }
  };
}
function ParentMixin(parent) {
  return {
    provide: function provide() {
      return (0, _defineProperty2.default)({}, parent, this);
    },
    created: function created() {
      this.children = [];
    },
    beforeDestroy: function beforeDestroy() {
      uni.$off("childrenReady" + this._uid);
    }
  };
}
/* WEBPACK VAR INJECTION */}.call(this, __webpack_require__(/*! ./node_modules/@dcloudio/uni-mp-weixin/dist/index.js */ 1)["default"]))

/***/ }),

/***/ 525:
/*!*****************************************************************************!*\
  !*** D:/project/前端/front/front/components/zebra-swiper/libs/utils/utils.js ***!
  \*****************************************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";
/* WEBPACK VAR INJECTION */(function(uni) {

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.getAllRect = getAllRect;
exports.getRect = getRect;
exports.requestAnimationFrame = requestAnimationFrame;
function getAllRect(context, selector) {
  return new Promise(function (resolve) {
    uni.createSelectorQuery().in(context).selectAll(selector).boundingClientRect().exec(function () {
      var rect = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : [];
      return resolve(rect[0]);
    });
  });
}
function getRect(context, selector) {
  return new Promise(function (resolve) {
    uni.createSelectorQuery().in(context).select(selector).boundingClientRect().exec(function () {
      var rect = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : [];
      return resolve(rect[0]);
    });
  });
}
function requestAnimationFrame(cb) {
  var systemInfo = uni.getSystemInfoSync();
  if (systemInfo.platform === 'devtools') {
    return setTimeout(function () {
      cb();
    }, 1000 / 30);
  }
  return uni.createSelectorQuery().selectViewport().boundingClientRect().exec(function () {
    cb();
  });
}
/* WEBPACK VAR INJECTION */}.call(this, __webpack_require__(/*! ./node_modules/@dcloudio/uni-mp-weixin/dist/index.js */ 1)["default"]))

/***/ }),

/***/ 53:
/*!************************************************************************************************!*\
  !*** ./node_modules/@dcloudio/vue-cli-plugin-uni/packages/@babel/runtime/regenerator/index.js ***!
  \************************************************************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

// TODO(Babel 8): Remove this file.

var runtime = __webpack_require__(/*! @babel/runtime/helpers/regeneratorRuntime */ 54)();
module.exports = runtime;

/***/ }),

/***/ 535:
/*!*********************************************************************************!*\
  !*** D:/project/前端/front/front/components/zebra-swiper/libs/vue2/get-params.js ***!
  \*********************************************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


var _interopRequireDefault = __webpack_require__(/*! @babel/runtime/helpers/interopRequireDefault */ 3);
Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.getParams = getParams;
var _index = _interopRequireDefault(__webpack_require__(/*! ../../index.js */ 536));
var _utils = __webpack_require__(/*! ./utils.js */ 612);
var _paramsList = __webpack_require__(/*! ./params-list.js */ 613);
function getParams() {
  var obj = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : {};
  var params = {
    on: {}
  };
  var passedParams = {};
  (0, _utils.extend)(params, _index.default.defaults);
  (0, _utils.extend)(params, _index.default.extendedDefaults);
  params._emitClasses = true;
  params.init = false;
  var rest = {};
  var allowedParams = _paramsList.paramsList.map(function (key) {
    return key.replace(/_/, '');
  });
  // Prevent empty Object.keys(obj) array on ios.
  var plainObj = Object.assign({}, obj);
  Object.keys(plainObj).forEach(function (key) {
    if (typeof obj[key] === 'undefined') return;
    if (allowedParams.indexOf(key) >= 0) {
      if ((0, _utils.isObject)(obj[key])) {
        params[key] = {};
        passedParams[key] = {};
        (0, _utils.extend)(params[key], obj[key]);
        (0, _utils.extend)(passedParams[key], obj[key]);
      } else {
        params[key] = obj[key];
        passedParams[key] = obj[key];
      }
    } else if (key.search(/on[A-Z]/) === 0 && typeof obj[key] === 'function') {
      params.on["".concat(key[2].toLowerCase()).concat(key.substr(3))] = obj[key];
    } else {
      rest[key] = obj[key];
    }
  });
  ['navigation', 'pagination', 'scrollbar'].forEach(function (key) {
    if (params[key] === true) params[key] = {};
    if (params[key] === false) delete params[key];
  });
  return {
    params: params,
    passedParams: passedParams,
    rest: rest
  };
}

/***/ }),

/***/ 536:
/*!******************************************************************!*\
  !*** D:/project/前端/front/front/components/zebra-swiper/index.js ***!
  \******************************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


var _interopRequireDefault = __webpack_require__(/*! @babel/runtime/helpers/interopRequireDefault */ 3);
Object.defineProperty(exports, "__esModule", {
  value: true
});
Object.defineProperty(exports, "Swiper", {
  enumerable: true,
  get: function get() {
    return _core.default;
  }
});
Object.defineProperty(exports, "default", {
  enumerable: true,
  get: function get() {
    return _core.default;
  }
});
var _core = _interopRequireDefault(__webpack_require__(/*! ./libs/core.js */ 537));
var _autoplay = _interopRequireDefault(__webpack_require__(/*! ./modules/autoplay/autoplay.js */ 592));
var _freeMode = _interopRequireDefault(__webpack_require__(/*! ./modules/free-mode/free-mode.js */ 593));
var _effectFade = _interopRequireDefault(__webpack_require__(/*! ./modules/effect-fade/effect-fade.js */ 594));
var _effectCube = _interopRequireDefault(__webpack_require__(/*! ./modules/effect-cube/effect-cube.js */ 598));
var _effectCoverflow = _interopRequireDefault(__webpack_require__(/*! ./modules/effect-coverflow/effect-coverflow.js */ 599));
var _effectFlip = _interopRequireDefault(__webpack_require__(/*! ./modules/effect-flip/effect-flip.js */ 600));
var _effectCards = _interopRequireDefault(__webpack_require__(/*! ./modules/effect-cards/effect-cards.js */ 601));
var _effectCreative = _interopRequireDefault(__webpack_require__(/*! ./modules/effect-creative/effect-creative.js */ 602));
var _effectPanorama = _interopRequireDefault(__webpack_require__(/*! ./modules/effect-panorama/effect-panorama.js */ 603));
var _effectCarousel = _interopRequireDefault(__webpack_require__(/*! ./modules/effect-carousel/effect-carousel.js */ 604));
var _navigation = _interopRequireDefault(__webpack_require__(/*! ./modules/navigation/navigation.js */ 605));
var _pagination = _interopRequireDefault(__webpack_require__(/*! ./modules/pagination/pagination.js */ 606));
var _thumbs = _interopRequireDefault(__webpack_require__(/*! ./modules/thumbs/thumbs.js */ 608));
var _scrollbar = _interopRequireDefault(__webpack_require__(/*! ./modules/scrollbar/scrollbar.js */ 609));
var _virtual = _interopRequireDefault(__webpack_require__(/*! ./modules/virtual/virtual.js */ 610));
var _willChange = _interopRequireDefault(__webpack_require__(/*! ./modules/will-change/will-change.js */ 611));
var modules = [_autoplay.default, _freeMode.default, _effectFade.default, _effectCube.default, _effectCoverflow.default, _effectFlip.default, _effectCards.default, _effectCreative.default, _effectPanorama.default, _effectCarousel.default, _navigation.default, _pagination.default, _thumbs.default, _scrollbar.default, _willChange.default, _virtual.default];
_core.default.use(modules);

/***/ }),

/***/ 537:
/*!**********************************************************************!*\
  !*** D:/project/前端/front/front/components/zebra-swiper/libs/core.js ***!
  \**********************************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


var _interopRequireDefault = __webpack_require__(/*! @babel/runtime/helpers/interopRequireDefault */ 3);
Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;
var _regenerator = _interopRequireDefault(__webpack_require__(/*! @babel/runtime/regenerator */ 53));
var _asyncToGenerator2 = _interopRequireDefault(__webpack_require__(/*! @babel/runtime/helpers/asyncToGenerator */ 55));
var _toConsumableArray2 = _interopRequireDefault(__webpack_require__(/*! @babel/runtime/helpers/toConsumableArray */ 17));
var _classCallCheck2 = _interopRequireDefault(__webpack_require__(/*! @babel/runtime/helpers/classCallCheck */ 22));
var _createClass2 = _interopRequireDefault(__webpack_require__(/*! @babel/runtime/helpers/createClass */ 23));
var _utils = __webpack_require__(/*! ../shared/utils.js */ 538);
var _getSupport = __webpack_require__(/*! ../shared/get-support.js */ 539);
var _getDevice = __webpack_require__(/*! ../shared/get-device.js */ 540);
var _getBrowser = __webpack_require__(/*! ../shared/get-browser.js */ 541);
var _moduleExtendParams = _interopRequireDefault(__webpack_require__(/*! ./moduleExtendParams.js */ 542));
var _eventsEmitter = _interopRequireDefault(__webpack_require__(/*! ./events-emitter.js */ 543));
var _index = _interopRequireDefault(__webpack_require__(/*! ./update/index.js */ 544));
var _index2 = _interopRequireDefault(__webpack_require__(/*! ./translate/index.js */ 554));
var _index3 = _interopRequireDefault(__webpack_require__(/*! ./transition/index.js */ 560));
var _defaults = _interopRequireDefault(__webpack_require__(/*! ./defaults.js */ 565));
var _index4 = _interopRequireDefault(__webpack_require__(/*! ./classes/index.js */ 566));
var _index5 = _interopRequireDefault(__webpack_require__(/*! ./check-overflow/index.js */ 569));
var _index6 = _interopRequireDefault(__webpack_require__(/*! ./slide/index.js */ 570));
var _index7 = _interopRequireDefault(__webpack_require__(/*! ./loop/index.js */ 578));
var _index8 = _interopRequireDefault(__webpack_require__(/*! ./grab-cursor/index.js */ 582));
var _index9 = _interopRequireDefault(__webpack_require__(/*! ./events/index.js */ 585));
var _utils2 = __webpack_require__(/*! ./utils/utils.js */ 525);
var prototypes = {
  eventsEmitter: _eventsEmitter.default,
  update: _index.default,
  checkOverflow: _index5.default,
  slide: _index6.default,
  loop: _index7.default,
  translate: _index2.default,
  transition: _index3.default,
  grabCursor: _index8.default,
  events: _index9.default,
  classes: _index4.default
};
var extendedDefaults = {};
var Swiper = /*#__PURE__*/function () {
  function Swiper() {
    (0, _classCallCheck2.default)(this, Swiper);
    var swiper = this;
    var params;
    var el;
    var native;
    for (var _len = arguments.length, args = new Array(_len), _key = 0; _key < _len; _key++) {
      args[_key] = arguments[_key];
    }
    if (args.length === 1 && args[0].constructor && Object.prototype.toString.call(args[0]).slice(8, -1) === 'Object') {
      params = args[0];
    } else if (args.length === 2 && args[0].constructor && Object.prototype.toString.call(args[0]).slice(8, -1) === 'Object') {
      params = args[0];
      native = args[1];
    } else {
      el = args[0];
      params = args[1];
      native = args[2];
    }
    if (!params) params = {};
    params = (0, _utils.extend)({}, params);
    if (el && !params.el) params.el = el;

    // Swiper Instance
    swiper.__swiper__ = true;
    swiper.support = (0, _getSupport.getSupport)();
    swiper.device = (0, _getDevice.getDevice)({
      userAgent: params.userAgent
    });
    swiper.browser = (0, _getBrowser.getBrowser)();
    swiper.eventsListeners = {};
    swiper.eventsAnyListeners = [];
    swiper.modules = (0, _toConsumableArray2.default)(swiper.__modules__);
    swiper.native = native;
    if (params.modules && Array.isArray(params.modules)) {
      var _swiper$modules;
      (_swiper$modules = swiper.modules).push.apply(_swiper$modules, (0, _toConsumableArray2.default)(params.modules));
    }
    var allModulesParams = {};
    swiper.modules.forEach(function (mod) {
      mod({
        swiper: swiper,
        extendParams: (0, _moduleExtendParams.default)(params, allModulesParams),
        on: swiper.on.bind(swiper),
        once: swiper.once.bind(swiper),
        off: swiper.off.bind(swiper),
        emit: swiper.emit.bind(swiper)
      });
    }); // Extend defaults with modules params
    var swiperParams = (0, _utils.extend)({}, _defaults.default, allModulesParams); // Extend defaults with passed params
    swiper.params = (0, _utils.extend)({}, swiperParams, extendedDefaults, params);
    swiper.originalParams = (0, _utils.extend)({}, swiper.params);
    swiper.passedParams = (0, _utils.extend)({}, params); // add event listeners

    if (swiper.params && swiper.params.on) {
      Object.keys(swiper.params.on).forEach(function (eventName) {
        swiper.on(eventName, swiper.params.on[eventName]);
      });
    }
    if (swiper.params && swiper.params.onAny) {
      swiper.onAny(swiper.params.onAny);
    } // Save Dom lib

    Object.assign(swiper, {
      enabled: swiper.params.enabled,
      el: el,
      // Classes
      classNames: [],
      // Slides
      slides: [],
      slidesGrid: [],
      snapGrid: [],
      slidesSizesGrid: [],
      // isDirection
      isHorizontal: function isHorizontal() {
        return swiper.params.direction === 'horizontal';
      },
      isVertical: function isVertical() {
        return swiper.params.direction === 'vertical';
      },
      // Indexes
      activeIndex: 0,
      realIndex: 0,
      //
      isBeginning: true,
      isEnd: false,
      // Props
      translate: 0,
      previousTranslate: 0,
      progress: 0,
      velocity: 0,
      animating: false,
      // Locks
      allowSlideNext: swiper.params.allowSlideNext,
      allowSlidePrev: swiper.params.allowSlidePrev,
      // Touch Events
      touchEvents: function touchEvents() {
        var touch = ['touchstart', 'touchmove', 'touchend', 'touchcancel'];
        var desktop = ['pointerdown', 'pointermove', 'pointerup'];
        swiper.touchEventsTouch = {
          start: touch[0],
          move: touch[1],
          end: touch[2],
          cancel: touch[3]
        };
        swiper.touchEventsDesktop = {
          start: desktop[0],
          move: desktop[1],
          end: desktop[2]
        };
        return swiper.support.touch || !swiper.params.simulateTouch ? swiper.touchEventsTouch : swiper.touchEventsDesktop;
      }(),
      touchEventsData: {
        isTouched: undefined,
        isMoved: undefined,
        allowTouchCallbacks: undefined,
        touchStartTime: undefined,
        isScrolling: undefined,
        currentTranslate: undefined,
        startTranslate: undefined,
        allowThresholdMove: undefined,
        // Form elements to match
        focusableElements: swiper.params.focusableElements,
        // Last click time
        lastClickTime: (0, _utils.now)(),
        clickTimeout: undefined,
        // Velocities
        velocities: [],
        allowMomentumBounce: undefined,
        isTouchEvent: undefined,
        startMoving: undefined
      },
      // Clicks
      allowClick: true,
      // Touches
      allowTouchMove: swiper.params.allowTouchMove,
      touches: {
        startX: 0,
        startY: 0,
        currentX: 0,
        currentY: 0,
        diff: 0
      },
      // Images
      imagesToLoad: [],
      imagesLoaded: 0,
      virtualList: [],
      virtualIndexList: []
    });
    swiper.emit('_swiper'); // Init

    if (swiper.params.init) {
      swiper.init();
    } // Return app instance
    return swiper;
  }
  (0, _createClass2.default)(Swiper, [{
    key: "enable",
    value: function enable() {
      var swiper = this;
      if (swiper.enabled) return;
      swiper.enabled = true;
      if (swiper.params.grabCursor) {
        swiper.setGrabCursor();
      }
      swiper.emit('enable');
    }
  }, {
    key: "disable",
    value: function disable() {
      var swiper = this;
      if (!swiper.enabled) return;
      swiper.enabled = false;
      if (swiper.params.grabCursor) {
        swiper.unsetGrabCursor();
      }
      swiper.emit('disable');
    }
  }, {
    key: "setProgress",
    value: function setProgress(progress, speed) {
      var swiper = this;
      progress = Math.min(Math.max(progress, 0), 1);
      var min = swiper.minTranslate();
      var max = swiper.maxTranslate();
      var current = (max - min) * progress + min;
      swiper.translateTo(current, typeof speed === 'undefined' ? 0 : speed);
      swiper.updateActiveIndex();
      swiper.updateSlidesClasses();
    }
  }, {
    key: "emitContainerClasses",
    value: function emitContainerClasses() {
      var swiper = this;
      if (!swiper.params._emitClasses || !swiper.el) return;
      var cls = swiper.native.contentClass.split(' ').filter(function (className) {
        return className.indexOf('swiper') === 0 || className.indexOf(swiper.params.containerModifierClass) === 0;
      });
      swiper.emit('_containerClasses', cls.join(' '));
    }
  }, {
    key: "getSlideClasses",
    value: function getSlideClasses(slideEl) {
      var swiper = this;
      return slideEl.slideClass.split(' ').filter(function (className) {
        return className.indexOf('swiper-slide') === 0 || className.indexOf(swiper.params.slideClass) === 0;
      }).join(' ');
    }
  }, {
    key: "emitSlidesClasses",
    value: function emitSlidesClasses() {
      var swiper = this;
      if (!swiper.params._emitClasses || !swiper.el) return;
      var updates = [];
      swiper.slides.forEach(function (slideEl) {
        var classNames = swiper.getSlideClasses(slideEl);
        updates.push({
          slideEl: slideEl,
          classNames: classNames
        });
        swiper.emit('_slideClass', slideEl, classNames);
      });
      swiper.emit('_slideClasses', updates);
    }
  }, {
    key: "slidesPerViewDynamic",
    value: function slidesPerViewDynamic() {
      var view = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : 'current';
      var exact = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : false;
      var swiper = this;
      var params = swiper.params,
        slides = swiper.slides,
        slidesGrid = swiper.slidesGrid,
        slidesSizesGrid = swiper.slidesSizesGrid,
        swiperSize = swiper.size,
        activeIndex = swiper.activeIndex;
      var spv = 1;
      if (params.centeredSlides) {
        var slideSize = slides[activeIndex].swiperSlideSize;
        var breakLoop;
        for (var i = activeIndex + 1; i < slides.length; i += 1) {
          if (slides[i] && !breakLoop) {
            slideSize += slides[i].swiperSlideSize;
            spv += 1;
            if (slideSize > swiperSize) breakLoop = true;
          }
        }
        for (var _i = activeIndex - 1; _i >= 0; _i -= 1) {
          if (slides[_i] && !breakLoop) {
            slideSize += slides[_i].swiperSlideSize;
            spv += 1;
            if (slideSize > swiperSize) breakLoop = true;
          }
        }
      } else {
        // eslint-disable-next-line
        if (view === 'current') {
          for (var _i2 = activeIndex + 1; _i2 < slides.length; _i2 += 1) {
            var slideInView = exact ? slidesGrid[_i2] + slidesSizesGrid[_i2] - slidesGrid[activeIndex] < swiperSize : slidesGrid[_i2] - slidesGrid[activeIndex] < swiperSize;
            if (slideInView) {
              spv += 1;
            }
          }
        } else {
          // previous
          for (var _i3 = activeIndex - 1; _i3 >= 0; _i3 -= 1) {
            var _slideInView = slidesGrid[activeIndex] - slidesGrid[_i3] < swiperSize;
            if (_slideInView) {
              spv += 1;
            }
          }
        }
      }
      return spv;
    }
  }, {
    key: "changeDirection",
    value: function changeDirection(newDirection, needUpdate) {
      if (needUpdate === void 0) {
        needUpdate = true;
      }
      var swiper = this;
      var currentDirection = swiper.params.direction;
      if (!newDirection) {
        // eslint-disable-next-line
        newDirection = currentDirection === 'horizontal' ? 'vertical' : 'horizontal';
      }
      if (newDirection === currentDirection || newDirection !== 'horizontal' && newDirection !== 'vertical') {
        return swiper;
      }
      swiper.$wrapperEl.removeClass("".concat(swiper.params.containerModifierClass).concat(currentDirection));
      swiper.$wrapperEl.addClass("".concat(swiper.params.containerModifierClass).concat(newDirection));
      swiper.emitContainerClasses();
      swiper.params.direction = newDirection;
      swiper.slides.forEach(function (slideEl) {
        if (newDirection === 'vertical') {
          slideEl.css({
            width: ''
          });
        } else {
          slideEl.css({
            height: ''
          });
        }
      });
      swiper.emit('changeDirection');
      if (needUpdate) swiper.update();
      return swiper;
    }
  }, {
    key: "update",
    value: function () {
      var _update = (0, _asyncToGenerator2.default)( /*#__PURE__*/_regenerator.default.mark(function _callee(el) {
        var swiper, snapGrid, params, setTranslate, translated;
        return _regenerator.default.wrap(function _callee$(_context) {
          while (1) {
            switch (_context.prev = _context.next) {
              case 0:
                setTranslate = function _setTranslate() {
                  var translateValue = swiper.rtlTranslate ? swiper.translate * -1 : swiper.translate;
                  var newTranslate = Math.min(Math.max(translateValue, swiper.maxTranslate()), swiper.minTranslate());
                  swiper.setTranslate(newTranslate);
                  swiper.updateActiveIndex();
                  swiper.updateSlidesClasses();
                };
                swiper = this;
                if (!(!swiper || swiper.destroyed)) {
                  _context.next = 4;
                  break;
                }
                return _context.abrupt("return");
              case 4:
                snapGrid = swiper.snapGrid, params = swiper.params; // Breakpoints
                _context.next = 7;
                return swiper.native.getRect();
              case 7:
                el = _context.sent;
                if (el) {
                  _context.next = 10;
                  break;
                }
                return _context.abrupt("return", false);
              case 10:
                Object.assign(swiper, {
                  el: el,
                  $el: swiper.native
                });
                swiper.emit('beforeUpdate');
                if (params.breakpoints) {
                  swiper.setBreakpoint();
                }
                swiper.updateSize();
                swiper.updateSlides();
                swiper.updateProgress();
                swiper.updateSlidesClasses();
                if (swiper.params.freeMode && swiper.params.freeMode.enabled) {
                  setTranslate();
                  if (swiper.params.autoHeight) {
                    swiper.updateAutoHeight();
                  }
                } else {
                  if ((swiper.params.slidesPerView === 'auto' || swiper.params.slidesPerView > 1) && swiper.isEnd && !swiper.params.centeredSlides) {
                    translated = swiper.slideTo(swiper.slides.length - 1, 0, false, true);
                  } else {
                    translated = swiper.slideTo(swiper.activeIndex, 0, false, true);
                  }
                  if (!translated) {
                    setTranslate();
                  }
                }
                if (params.watchOverflow && snapGrid !== swiper.snapGrid) {
                  swiper.checkOverflow();
                }
                swiper.emit('update');
              case 20:
              case "end":
                return _context.stop();
            }
          }
        }, _callee, this);
      }));
      function update(_x) {
        return _update.apply(this, arguments);
      }
      return update;
    }()
  }, {
    key: "mount",
    value: function () {
      var _mount = (0, _asyncToGenerator2.default)( /*#__PURE__*/_regenerator.default.mark(function _callee2(el) {
        var swiper;
        return _regenerator.default.wrap(function _callee2$(_context2) {
          while (1) {
            switch (_context2.prev = _context2.next) {
              case 0:
                swiper = this;
                if (!swiper.mounted) {
                  _context2.next = 3;
                  break;
                }
                return _context2.abrupt("return", true);
              case 3:
                _context2.next = 5;
                return swiper.native.getRect();
              case 5:
                el = _context2.sent;
                if (el) {
                  _context2.next = 8;
                  break;
                }
                return _context2.abrupt("return", false);
              case 8:
                swiper.emit('beforeMount'); // Set breakpoint
                // let $wrapperEl = new DomSimulation(swiper.native);
                // let $el = new DomSimulation(swiper.native);
                // if (swiper.native && swiper.native.children && swiper.native.children.length) {
                // 	swiper.native.children.forEach((item) => {
                // 		item.$itemEl = new ChildDomSimulation(item);
                // 	})
                // }
                Object.assign(swiper, {
                  $el: swiper.native,
                  el: el,
                  $wrapperEl: swiper.native,
                  wrapperEl: swiper.native,
                  mounted: true
                });
                return _context2.abrupt("return", true);
              case 11:
              case "end":
                return _context2.stop();
            }
          }
        }, _callee2, this);
      }));
      function mount(_x2) {
        return _mount.apply(this, arguments);
      }
      return mount;
    }()
  }, {
    key: "init",
    value: function () {
      var _init = (0, _asyncToGenerator2.default)( /*#__PURE__*/_regenerator.default.mark(function _callee3(el) {
        var swiper, mounted;
        return _regenerator.default.wrap(function _callee3$(_context3) {
          while (1) {
            switch (_context3.prev = _context3.next) {
              case 0:
                swiper = this;
                if (!swiper.initialized) {
                  _context3.next = 3;
                  break;
                }
                return _context3.abrupt("return", swiper);
              case 3:
                _context3.next = 5;
                return swiper.mount(el);
              case 5:
                mounted = _context3.sent;
                if (!(mounted === false)) {
                  _context3.next = 8;
                  break;
                }
                return _context3.abrupt("return", swiper);
              case 8:
                swiper.emit('beforeInit'); // Set breakpoint

                swiper.addClasses(); // Create loop

                if (swiper.params.loop) {
                  swiper.loopCreate();
                } // Update size

                swiper.updateSize(); // Update slides

                swiper.updateSlides();
                if (swiper.params.watchOverflow) {
                  swiper.checkOverflow();
                } // Set Grab Cursor

                if (swiper.params.grabCursor && swiper.enabled) {
                  swiper.setGrabCursor();
                }

                // if (swiper.params.loop) {
                // 	swiper.on("update", () => {
                // 		swiper.slideTo(swiper.params.initialSlide + swiper.loopedSlides, 0, swiper.params
                // 			.runCallbacksOnInit,
                // 			false, true);
                // 	})
                // } else {
                // 	swiper.slideTo(swiper.params.initialSlide, 0, swiper.params.runCallbacksOnInit, false, true);
                // } // Attach events
                // Slide To Initial Slide
                if (swiper.params.loop) {
                  swiper.slideTo(swiper.params.initialSlide + swiper.loopedSlides, 0, swiper.params.runCallbacksOnInit, false, true);
                } else {
                  swiper.slideTo(swiper.params.initialSlide, 0, swiper.params.runCallbacksOnInit, false, true);
                }
                swiper.attachEvents(); // Init Flag
                swiper.initialized = true; // Emit
                swiper.emit('init');
                swiper.emit('afterInit');
                return _context3.abrupt("return", swiper);
              case 21:
              case "end":
                return _context3.stop();
            }
          }
        }, _callee3, this);
      }));
      function init(_x3) {
        return _init.apply(this, arguments);
      }
      return init;
    }()
  }, {
    key: "destroy",
    value: function destroy() {
      var deleteInstance = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : true;
      var cleanStyles = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : true;
      var swiper = this;
      var params = swiper.params,
        $el = swiper.$el,
        $wrapperEl = swiper.$wrapperEl,
        slides = swiper.slides;
      if (typeof swiper.params === 'undefined' || swiper.destroyed) {
        return null;
      }
      swiper.emit('beforeDestroy'); // Init Flag

      swiper.initialized = false; // Detach events

      swiper.detachEvents(); // Destroy loop

      if (params.loop) {
        swiper.loopDestroy();
      } // Cleanup styles

      swiper.emit('destroy'); // Detach emitter events

      Object.keys(swiper.eventsListeners).forEach(function (eventName) {
        swiper.off(eventName);
      });
      if (deleteInstance !== false) {
        (0, _utils.deleteProps)(swiper);
      }
      swiper.destroyed = true;
      return null;
    }
  }], [{
    key: "extendDefaults",
    value: function extendDefaults(newDefaults) {
      (0, _utils.extend)(extendedDefaults, newDefaults);
    }
  }, {
    key: "extendedDefaults",
    get: function get() {
      return extendedDefaults;
    }
  }, {
    key: "defaults",
    get: function get() {
      return _defaults.default;
    }
  }, {
    key: "installModule",
    value: function installModule(mod) {
      if (!Swiper.prototype.__modules__) Swiper.prototype.__modules__ = [];
      var modules = Swiper.prototype.__modules__;
      if (typeof mod === 'function' && modules.indexOf(mod) < 0) {
        modules.push(mod);
      }
    }
  }, {
    key: "use",
    value: function use(module) {
      if (Array.isArray(module)) {
        module.forEach(function (m) {
          return Swiper.installModule(m);
        });
        return Swiper;
      }
      Swiper.installModule(module);
      return Swiper;
    }
  }]);
  return Swiper;
}();
Object.keys(prototypes).forEach(function (prototypeGroup) {
  Object.keys(prototypes[prototypeGroup]).forEach(function (protoMethod) {
    Swiper.prototype[protoMethod] = prototypes[prototypeGroup][protoMethod];
  });
});
var _default = Swiper;
exports.default = _default;

/***/ }),

/***/ 538:
/*!*************************************************************************!*\
  !*** D:/project/前端/front/front/components/zebra-swiper/shared/utils.js ***!
  \*************************************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


var _interopRequireDefault = __webpack_require__(/*! @babel/runtime/helpers/interopRequireDefault */ 3);
Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.animateCSSModeScroll = animateCSSModeScroll;
exports.deleteProps = deleteProps;
exports.extend = extend;
exports.getTranslate = getTranslate;
exports.isObject = isObject;
exports.nextTick = nextTick;
exports.now = now;
exports.setCSSProperty = setCSSProperty;
var _defineProperty2 = _interopRequireDefault(__webpack_require__(/*! @babel/runtime/helpers/defineProperty */ 10));
var _typeof2 = _interopRequireDefault(__webpack_require__(/*! @babel/runtime/helpers/typeof */ 12));
function deleteProps(obj) {
  var object = obj;
  Object.keys(object).forEach(function (key) {
    try {
      object[key] = null;
    } catch (e) {// no getter for object
    }
    try {
      delete object[key];
    } catch (e) {// something got wrong
    }
  });
}
function getTranslate(el) {
  var axis = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : 'x';
  var curTransform;
  if (axis === 'x') {
    curTransform = el.translate;
  }
  if (axis === 'y') {
    curTransform = el.translate;
  }
  return curTransform || 0;
}
function isObject(o) {
  return (0, _typeof2.default)(o) === 'object' && o !== null && o.constructor && Object.prototype.toString.call(o).slice(8, -1) === 'Object';
}
function now() {
  return Date.now();
}
function nextTick(callback) {
  var delay = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : 0;
  return setTimeout(callback, delay);
}
function extend() {
  var to = Object(arguments.length <= 0 ? undefined : arguments[0]);
  var noExtend = ['__proto__', 'constructor', 'prototype'];
  for (var i = 1; i < arguments.length; i += 1) {
    var nextSource = i < 0 || arguments.length <= i ? undefined : arguments[i];
    if (nextSource !== undefined && nextSource !== null) {
      var keysArray = Object.keys(Object(nextSource)).filter(function (key) {
        return noExtend.indexOf(key) < 0;
      });
      for (var nextIndex = 0, len = keysArray.length; nextIndex < len; nextIndex += 1) {
        var nextKey = keysArray[nextIndex];
        var desc = Object.getOwnPropertyDescriptor(nextSource, nextKey);
        if (desc !== undefined && desc.enumerable) {
          if (isObject(to[nextKey]) && isObject(nextSource[nextKey])) {
            if (nextSource[nextKey].__swiper__) {
              to[nextKey] = nextSource[nextKey];
            } else {
              extend(to[nextKey], nextSource[nextKey]);
            }
          } else if (!isObject(to[nextKey]) && isObject(nextSource[nextKey])) {
            to[nextKey] = {};
            if (nextSource[nextKey].__swiper__) {
              to[nextKey] = nextSource[nextKey];
            } else {
              extend(to[nextKey], nextSource[nextKey]);
            }
          } else {
            to[nextKey] = nextSource[nextKey];
          }
        }
      }
    }
  }
  return to;
}
function setCSSProperty(el, varName, varValue) {
  el.style.setProperty(varName, varValue);
}
function animateCSSModeScroll(_ref) {
  var swiper = _ref.swiper,
    targetPosition = _ref.targetPosition,
    side = _ref.side;
  var window = getWindow();
  var startPosition = -swiper.translate;
  var startTime = null;
  var time;
  var duration = swiper.params.speed;
  swiper.wrapperEl.style.scrollSnapType = 'none';
  window.cancelAnimationFrame(swiper.cssModeFrameID);
  var dir = targetPosition > startPosition ? 'next' : 'prev';
  var isOutOfBound = function isOutOfBound(current, target) {
    return dir === 'next' && current >= target || dir === 'prev' && current <= target;
  };
  var animate = function animate() {
    time = new Date().getTime();
    if (startTime === null) {
      startTime = time;
    }
    var progress = Math.max(Math.min((time - startTime) / duration, 1), 0);
    var easeProgress = 0.5 - Math.cos(progress * Math.PI) / 2;
    var currentPosition = startPosition + easeProgress * (targetPosition - startPosition);
    if (isOutOfBound(currentPosition, targetPosition)) {
      currentPosition = targetPosition;
    }
    swiper.wrapperEl.scrollTo((0, _defineProperty2.default)({}, side, currentPosition));
    if (isOutOfBound(currentPosition, targetPosition)) {
      swiper.wrapperEl.style.overflow = 'hidden';
      swiper.wrapperEl.style.scrollSnapType = '';
      setTimeout(function () {
        swiper.wrapperEl.style.overflow = '';
        swiper.wrapperEl.scrollTo((0, _defineProperty2.default)({}, side, currentPosition));
      });
      window.cancelAnimationFrame(swiper.cssModeFrameID);
      return;
    }
    swiper.cssModeFrameID = window.requestAnimationFrame(animate);
  };
  animate();
}

/***/ }),

/***/ 539:
/*!*******************************************************************************!*\
  !*** D:/project/前端/front/front/components/zebra-swiper/shared/get-support.js ***!
  \*******************************************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.getSupport = getSupport;
var support;
function getMobile() {
  if (navigator.userAgent.indexOf('Mobile') > -1) {
    return true;
  } else {
    return false;
  }
}
function calcSupport() {
  return {
    smoothScroll: true,
    touch: true,
    passiveListener: function checkPassiveListener() {
      var supportsPassive = false;
      try {
        var opts = Object.defineProperty({}, 'passive', {
          // eslint-disable-next-line
          get: function get() {
            supportsPassive = true;
          }
        });
      } catch (e) {// No support
      }
      return supportsPassive;
    }(),
    gestures: function checkGestures() {
      return false;
    }()
  };
}
function getSupport() {
  if (!support) {
    support = calcSupport();
  }
  return support;
}

/***/ }),

/***/ 54:
/*!*******************************************************************!*\
  !*** ./node_modules/@babel/runtime/helpers/regeneratorRuntime.js ***!
  \*******************************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

var _typeof = __webpack_require__(/*! ./typeof.js */ 12)["default"];
function _regeneratorRuntime() {
  "use strict";

  /*! regenerator-runtime -- Copyright (c) 2014-present, Facebook, Inc. -- license (MIT): https://github.com/facebook/regenerator/blob/main/LICENSE */
  module.exports = _regeneratorRuntime = function _regeneratorRuntime() {
    return exports;
  }, module.exports.__esModule = true, module.exports["default"] = module.exports;
  var exports = {},
    Op = Object.prototype,
    hasOwn = Op.hasOwnProperty,
    defineProperty = Object.defineProperty || function (obj, key, desc) {
      obj[key] = desc.value;
    },
    $Symbol = "function" == typeof Symbol ? Symbol : {},
    iteratorSymbol = $Symbol.iterator || "@@iterator",
    asyncIteratorSymbol = $Symbol.asyncIterator || "@@asyncIterator",
    toStringTagSymbol = $Symbol.toStringTag || "@@toStringTag";
  function define(obj, key, value) {
    return Object.defineProperty(obj, key, {
      value: value,
      enumerable: !0,
      configurable: !0,
      writable: !0
    }), obj[key];
  }
  try {
    define({}, "");
  } catch (err) {
    define = function define(obj, key, value) {
      return obj[key] = value;
    };
  }
  function wrap(innerFn, outerFn, self, tryLocsList) {
    var protoGenerator = outerFn && outerFn.prototype instanceof Generator ? outerFn : Generator,
      generator = Object.create(protoGenerator.prototype),
      context = new Context(tryLocsList || []);
    return defineProperty(generator, "_invoke", {
      value: makeInvokeMethod(innerFn, self, context)
    }), generator;
  }
  function tryCatch(fn, obj, arg) {
    try {
      return {
        type: "normal",
        arg: fn.call(obj, arg)
      };
    } catch (err) {
      return {
        type: "throw",
        arg: err
      };
    }
  }
  exports.wrap = wrap;
  var ContinueSentinel = {};
  function Generator() {}
  function GeneratorFunction() {}
  function GeneratorFunctionPrototype() {}
  var IteratorPrototype = {};
  define(IteratorPrototype, iteratorSymbol, function () {
    return this;
  });
  var getProto = Object.getPrototypeOf,
    NativeIteratorPrototype = getProto && getProto(getProto(values([])));
  NativeIteratorPrototype && NativeIteratorPrototype !== Op && hasOwn.call(NativeIteratorPrototype, iteratorSymbol) && (IteratorPrototype = NativeIteratorPrototype);
  var Gp = GeneratorFunctionPrototype.prototype = Generator.prototype = Object.create(IteratorPrototype);
  function defineIteratorMethods(prototype) {
    ["next", "throw", "return"].forEach(function (method) {
      define(prototype, method, function (arg) {
        return this._invoke(method, arg);
      });
    });
  }
  function AsyncIterator(generator, PromiseImpl) {
    function invoke(method, arg, resolve, reject) {
      var record = tryCatch(generator[method], generator, arg);
      if ("throw" !== record.type) {
        var result = record.arg,
          value = result.value;
        return value && "object" == _typeof(value) && hasOwn.call(value, "__await") ? PromiseImpl.resolve(value.__await).then(function (value) {
          invoke("next", value, resolve, reject);
        }, function (err) {
          invoke("throw", err, resolve, reject);
        }) : PromiseImpl.resolve(value).then(function (unwrapped) {
          result.value = unwrapped, resolve(result);
        }, function (error) {
          return invoke("throw", error, resolve, reject);
        });
      }
      reject(record.arg);
    }
    var previousPromise;
    defineProperty(this, "_invoke", {
      value: function value(method, arg) {
        function callInvokeWithMethodAndArg() {
          return new PromiseImpl(function (resolve, reject) {
            invoke(method, arg, resolve, reject);
          });
        }
        return previousPromise = previousPromise ? previousPromise.then(callInvokeWithMethodAndArg, callInvokeWithMethodAndArg) : callInvokeWithMethodAndArg();
      }
    });
  }
  function makeInvokeMethod(innerFn, self, context) {
    var state = "suspendedStart";
    return function (method, arg) {
      if ("executing" === state) throw new Error("Generator is already running");
      if ("completed" === state) {
        if ("throw" === method) throw arg;
        return doneResult();
      }
      for (context.method = method, context.arg = arg;;) {
        var delegate = context.delegate;
        if (delegate) {
          var delegateResult = maybeInvokeDelegate(delegate, context);
          if (delegateResult) {
            if (delegateResult === ContinueSentinel) continue;
            return delegateResult;
          }
        }
        if ("next" === context.method) context.sent = context._sent = context.arg;else if ("throw" === context.method) {
          if ("suspendedStart" === state) throw state = "completed", context.arg;
          context.dispatchException(context.arg);
        } else "return" === context.method && context.abrupt("return", context.arg);
        state = "executing";
        var record = tryCatch(innerFn, self, context);
        if ("normal" === record.type) {
          if (state = context.done ? "completed" : "suspendedYield", record.arg === ContinueSentinel) continue;
          return {
            value: record.arg,
            done: context.done
          };
        }
        "throw" === record.type && (state = "completed", context.method = "throw", context.arg = record.arg);
      }
    };
  }
  function maybeInvokeDelegate(delegate, context) {
    var methodName = context.method,
      method = delegate.iterator[methodName];
    if (undefined === method) return context.delegate = null, "throw" === methodName && delegate.iterator["return"] && (context.method = "return", context.arg = undefined, maybeInvokeDelegate(delegate, context), "throw" === context.method) || "return" !== methodName && (context.method = "throw", context.arg = new TypeError("The iterator does not provide a '" + methodName + "' method")), ContinueSentinel;
    var record = tryCatch(method, delegate.iterator, context.arg);
    if ("throw" === record.type) return context.method = "throw", context.arg = record.arg, context.delegate = null, ContinueSentinel;
    var info = record.arg;
    return info ? info.done ? (context[delegate.resultName] = info.value, context.next = delegate.nextLoc, "return" !== context.method && (context.method = "next", context.arg = undefined), context.delegate = null, ContinueSentinel) : info : (context.method = "throw", context.arg = new TypeError("iterator result is not an object"), context.delegate = null, ContinueSentinel);
  }
  function pushTryEntry(locs) {
    var entry = {
      tryLoc: locs[0]
    };
    1 in locs && (entry.catchLoc = locs[1]), 2 in locs && (entry.finallyLoc = locs[2], entry.afterLoc = locs[3]), this.tryEntries.push(entry);
  }
  function resetTryEntry(entry) {
    var record = entry.completion || {};
    record.type = "normal", delete record.arg, entry.completion = record;
  }
  function Context(tryLocsList) {
    this.tryEntries = [{
      tryLoc: "root"
    }], tryLocsList.forEach(pushTryEntry, this), this.reset(!0);
  }
  function values(iterable) {
    if (iterable) {
      var iteratorMethod = iterable[iteratorSymbol];
      if (iteratorMethod) return iteratorMethod.call(iterable);
      if ("function" == typeof iterable.next) return iterable;
      if (!isNaN(iterable.length)) {
        var i = -1,
          next = function next() {
            for (; ++i < iterable.length;) {
              if (hasOwn.call(iterable, i)) return next.value = iterable[i], next.done = !1, next;
            }
            return next.value = undefined, next.done = !0, next;
          };
        return next.next = next;
      }
    }
    return {
      next: doneResult
    };
  }
  function doneResult() {
    return {
      value: undefined,
      done: !0
    };
  }
  return GeneratorFunction.prototype = GeneratorFunctionPrototype, defineProperty(Gp, "constructor", {
    value: GeneratorFunctionPrototype,
    configurable: !0
  }), defineProperty(GeneratorFunctionPrototype, "constructor", {
    value: GeneratorFunction,
    configurable: !0
  }), GeneratorFunction.displayName = define(GeneratorFunctionPrototype, toStringTagSymbol, "GeneratorFunction"), exports.isGeneratorFunction = function (genFun) {
    var ctor = "function" == typeof genFun && genFun.constructor;
    return !!ctor && (ctor === GeneratorFunction || "GeneratorFunction" === (ctor.displayName || ctor.name));
  }, exports.mark = function (genFun) {
    return Object.setPrototypeOf ? Object.setPrototypeOf(genFun, GeneratorFunctionPrototype) : (genFun.__proto__ = GeneratorFunctionPrototype, define(genFun, toStringTagSymbol, "GeneratorFunction")), genFun.prototype = Object.create(Gp), genFun;
  }, exports.awrap = function (arg) {
    return {
      __await: arg
    };
  }, defineIteratorMethods(AsyncIterator.prototype), define(AsyncIterator.prototype, asyncIteratorSymbol, function () {
    return this;
  }), exports.AsyncIterator = AsyncIterator, exports.async = function (innerFn, outerFn, self, tryLocsList, PromiseImpl) {
    void 0 === PromiseImpl && (PromiseImpl = Promise);
    var iter = new AsyncIterator(wrap(innerFn, outerFn, self, tryLocsList), PromiseImpl);
    return exports.isGeneratorFunction(outerFn) ? iter : iter.next().then(function (result) {
      return result.done ? result.value : iter.next();
    });
  }, defineIteratorMethods(Gp), define(Gp, toStringTagSymbol, "Generator"), define(Gp, iteratorSymbol, function () {
    return this;
  }), define(Gp, "toString", function () {
    return "[object Generator]";
  }), exports.keys = function (val) {
    var object = Object(val),
      keys = [];
    for (var key in object) {
      keys.push(key);
    }
    return keys.reverse(), function next() {
      for (; keys.length;) {
        var key = keys.pop();
        if (key in object) return next.value = key, next.done = !1, next;
      }
      return next.done = !0, next;
    };
  }, exports.values = values, Context.prototype = {
    constructor: Context,
    reset: function reset(skipTempReset) {
      if (this.prev = 0, this.next = 0, this.sent = this._sent = undefined, this.done = !1, this.delegate = null, this.method = "next", this.arg = undefined, this.tryEntries.forEach(resetTryEntry), !skipTempReset) for (var name in this) {
        "t" === name.charAt(0) && hasOwn.call(this, name) && !isNaN(+name.slice(1)) && (this[name] = undefined);
      }
    },
    stop: function stop() {
      this.done = !0;
      var rootRecord = this.tryEntries[0].completion;
      if ("throw" === rootRecord.type) throw rootRecord.arg;
      return this.rval;
    },
    dispatchException: function dispatchException(exception) {
      if (this.done) throw exception;
      var context = this;
      function handle(loc, caught) {
        return record.type = "throw", record.arg = exception, context.next = loc, caught && (context.method = "next", context.arg = undefined), !!caught;
      }
      for (var i = this.tryEntries.length - 1; i >= 0; --i) {
        var entry = this.tryEntries[i],
          record = entry.completion;
        if ("root" === entry.tryLoc) return handle("end");
        if (entry.tryLoc <= this.prev) {
          var hasCatch = hasOwn.call(entry, "catchLoc"),
            hasFinally = hasOwn.call(entry, "finallyLoc");
          if (hasCatch && hasFinally) {
            if (this.prev < entry.catchLoc) return handle(entry.catchLoc, !0);
            if (this.prev < entry.finallyLoc) return handle(entry.finallyLoc);
          } else if (hasCatch) {
            if (this.prev < entry.catchLoc) return handle(entry.catchLoc, !0);
          } else {
            if (!hasFinally) throw new Error("try statement without catch or finally");
            if (this.prev < entry.finallyLoc) return handle(entry.finallyLoc);
          }
        }
      }
    },
    abrupt: function abrupt(type, arg) {
      for (var i = this.tryEntries.length - 1; i >= 0; --i) {
        var entry = this.tryEntries[i];
        if (entry.tryLoc <= this.prev && hasOwn.call(entry, "finallyLoc") && this.prev < entry.finallyLoc) {
          var finallyEntry = entry;
          break;
        }
      }
      finallyEntry && ("break" === type || "continue" === type) && finallyEntry.tryLoc <= arg && arg <= finallyEntry.finallyLoc && (finallyEntry = null);
      var record = finallyEntry ? finallyEntry.completion : {};
      return record.type = type, record.arg = arg, finallyEntry ? (this.method = "next", this.next = finallyEntry.finallyLoc, ContinueSentinel) : this.complete(record);
    },
    complete: function complete(record, afterLoc) {
      if ("throw" === record.type) throw record.arg;
      return "break" === record.type || "continue" === record.type ? this.next = record.arg : "return" === record.type ? (this.rval = this.arg = record.arg, this.method = "return", this.next = "end") : "normal" === record.type && afterLoc && (this.next = afterLoc), ContinueSentinel;
    },
    finish: function finish(finallyLoc) {
      for (var i = this.tryEntries.length - 1; i >= 0; --i) {
        var entry = this.tryEntries[i];
        if (entry.finallyLoc === finallyLoc) return this.complete(entry.completion, entry.afterLoc), resetTryEntry(entry), ContinueSentinel;
      }
    },
    "catch": function _catch(tryLoc) {
      for (var i = this.tryEntries.length - 1; i >= 0; --i) {
        var entry = this.tryEntries[i];
        if (entry.tryLoc === tryLoc) {
          var record = entry.completion;
          if ("throw" === record.type) {
            var thrown = record.arg;
            resetTryEntry(entry);
          }
          return thrown;
        }
      }
      throw new Error("illegal catch attempt");
    },
    delegateYield: function delegateYield(iterable, resultName, nextLoc) {
      return this.delegate = {
        iterator: values(iterable),
        resultName: resultName,
        nextLoc: nextLoc
      }, "next" === this.method && (this.arg = undefined), ContinueSentinel;
    }
  }, exports;
}
module.exports = _regeneratorRuntime, module.exports.__esModule = true, module.exports["default"] = module.exports;

/***/ }),

/***/ 540:
/*!******************************************************************************!*\
  !*** D:/project/前端/front/front/components/zebra-swiper/shared/get-device.js ***!
  \******************************************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";
/* WEBPACK VAR INJECTION */(function(uni) {

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.getDevice = getDevice;
var _getSupport = __webpack_require__(/*! ./get-support.js */ 539);
var deviceCached;
function calcDevice() {
  var _ref = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : {},
    userAgent = _ref.userAgent;
  var support = (0, _getSupport.getSupport)();
  var device = {
    ios: false,
    android: false
  };
  var res = uni.getSystemInfoSync();
  if (res.platform == "android") {
    device.os = 'android';
    device.android = true;
  }
  if (res.platform == "ios") {
    device.os = 'ios';
    device.ios = true;
  } // Export object

  return device;
}
function getDevice() {
  var overrides = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : {};
  if (!deviceCached) {
    deviceCached = calcDevice(overrides);
  }
  return deviceCached;
}
/* WEBPACK VAR INJECTION */}.call(this, __webpack_require__(/*! ./node_modules/@dcloudio/uni-mp-weixin/dist/index.js */ 1)["default"]))

/***/ }),

/***/ 541:
/*!*******************************************************************************!*\
  !*** D:/project/前端/front/front/components/zebra-swiper/shared/get-browser.js ***!
  \*******************************************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";
/* WEBPACK VAR INJECTION */(function(uni) {

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.getBrowser = getBrowser;
var browser;
function calcBrowser() {
  function isSafari() {
    var res = uni.getSystemInfoSync();
    return res.model;
  }
  return {
    isSafari: isSafari(),
    isWebView: /(iPhone|iPod|iPad).*AppleWebKit(?!.*Safari)/i.test(isSafari())
  };
}
function getBrowser() {
  if (!browser) {
    browser = calcBrowser();
  }
  return browser;
}
/* WEBPACK VAR INJECTION */}.call(this, __webpack_require__(/*! ./node_modules/@dcloudio/uni-mp-weixin/dist/index.js */ 1)["default"]))

/***/ }),

/***/ 542:
/*!************************************************************************************!*\
  !*** D:/project/前端/front/front/components/zebra-swiper/libs/moduleExtendParams.js ***!
  \************************************************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


var _interopRequireDefault = __webpack_require__(/*! @babel/runtime/helpers/interopRequireDefault */ 3);
Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = moduleExtendParams;
var _typeof2 = _interopRequireDefault(__webpack_require__(/*! @babel/runtime/helpers/typeof */ 12));
var _utils = __webpack_require__(/*! ../shared/utils.js */ 538);
function moduleExtendParams(params, allModulesParams) {
  return function extendParams() {
    var obj = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : {};
    var moduleParamName = Object.keys(obj)[0];
    var moduleParams = obj[moduleParamName];
    if ((0, _typeof2.default)(moduleParams) !== 'object' || moduleParams === null) {
      (0, _utils.extend)(allModulesParams, obj);
      return;
    }
    if (['navigation', 'pagination', 'scrollbar'].indexOf(moduleParamName) >= 0 && params[moduleParamName] === true) {
      params[moduleParamName] = {
        auto: true
      };
    }
    if (!(moduleParamName in params && 'enabled' in moduleParams)) {
      (0, _utils.extend)(allModulesParams, obj);
      return;
    }
    if (params[moduleParamName] === true) {
      params[moduleParamName] = {
        enabled: true
      };
    }
    if ((0, _typeof2.default)(params[moduleParamName]) === 'object' && !('enabled' in params[moduleParamName])) {
      params[moduleParamName].enabled = true;
    }
    if (!params[moduleParamName]) params[moduleParamName] = {
      enabled: false
    };
    (0, _utils.extend)(allModulesParams, obj);
  };
}

/***/ }),

/***/ 543:
/*!********************************************************************************!*\
  !*** D:/project/前端/front/front/components/zebra-swiper/libs/events-emitter.js ***!
  \********************************************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


var _interopRequireDefault = __webpack_require__(/*! @babel/runtime/helpers/interopRequireDefault */ 3);
Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;
var _toConsumableArray2 = _interopRequireDefault(__webpack_require__(/*! @babel/runtime/helpers/toConsumableArray */ 17));
/* eslint-disable no-underscore-dangle */
var _default = {
  on: function on(events, handler, priority) {
    var self = this;
    if (typeof handler !== 'function') return self;
    var method = priority ? 'unshift' : 'push';
    events.split(' ').forEach(function (event) {
      if (!self.eventsListeners[event]) self.eventsListeners[event] = [];
      self.eventsListeners[event][method](handler);
    });
    return self;
  },
  once: function once(events, handler, priority) {
    var self = this;
    if (typeof handler !== 'function') return self;
    function onceHandler() {
      self.off(events, onceHandler);
      if (onceHandler.__emitterProxy) {
        delete onceHandler.__emitterProxy;
      }
      for (var _len = arguments.length, args = new Array(_len), _key = 0; _key < _len; _key++) {
        args[_key] = arguments[_key];
      }
      handler.apply(self, args);
    }
    onceHandler.__emitterProxy = handler;
    return self.on(events, onceHandler, priority);
  },
  onAny: function onAny(handler, priority) {
    var self = this;
    if (typeof handler !== 'function') return self;
    var method = priority ? 'unshift' : 'push';
    if (self.eventsAnyListeners.indexOf(handler) < 0) {
      self.eventsAnyListeners[method](handler);
    }
    return self;
  },
  offAny: function offAny(handler) {
    var self = this;
    if (!self.eventsAnyListeners) return self;
    var index = self.eventsAnyListeners.indexOf(handler);
    if (index >= 0) {
      self.eventsAnyListeners.splice(index, 1);
    }
    return self;
  },
  off: function off(events, handler) {
    var self = this;
    if (!self.eventsListeners) return self;
    events.split(' ').forEach(function (event) {
      // self.native.off(event, handler);
      if (typeof handler === 'undefined') {
        self.eventsListeners[event] = [];
      } else if (self.eventsListeners[event]) {
        self.eventsListeners[event].forEach(function (eventHandler, index) {
          if (eventHandler === handler || eventHandler.__emitterProxy && eventHandler.__emitterProxy === handler) {
            self.eventsListeners[event].splice(index, 1);
          }
        });
      }
    });
    return self;
  },
  emit: function emit() {
    var self = this;
    if (!self.eventsListeners) return self;
    var events;
    var data;
    var context;
    for (var _len2 = arguments.length, args = new Array(_len2), _key2 = 0; _key2 < _len2; _key2++) {
      args[_key2] = arguments[_key2];
    }
    if (typeof args[0] === 'string' || Array.isArray(args[0])) {
      events = args[0];
      data = args.slice(1, args.length);
      context = self;
    } else {
      events = args[0].events;
      data = args[0].data;
      context = args[0].context || self;
    }
    data.unshift(context);
    var eventsArray = Array.isArray(events) ? events : events.split(' ');
    eventsArray.forEach(function (event) {
      // console.log(event)
      if (self.eventsAnyListeners && self.eventsAnyListeners.length) {
        self.eventsAnyListeners.forEach(function (eventHandler) {
          eventHandler.apply(context, [event].concat((0, _toConsumableArray2.default)(data)));
        });
      }
      if (self.eventsListeners && self.eventsListeners[event]) {
        self.eventsListeners[event].forEach(function (eventHandler) {
          eventHandler.apply(context, data);
        });
      }
    });
    return self;
  }
};
exports.default = _default;

/***/ }),

/***/ 544:
/*!******************************************************************************!*\
  !*** D:/project/前端/front/front/components/zebra-swiper/libs/update/index.js ***!
  \******************************************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


var _interopRequireDefault = __webpack_require__(/*! @babel/runtime/helpers/interopRequireDefault */ 3);
Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;
var _updateSize = _interopRequireDefault(__webpack_require__(/*! ./updateSize.js */ 545));
var _updateSlides = _interopRequireDefault(__webpack_require__(/*! ./updateSlides.js */ 546));
var _updateAutoHeight = _interopRequireDefault(__webpack_require__(/*! ./updateAutoHeight.js */ 547));
var _updateSlidesOffset = _interopRequireDefault(__webpack_require__(/*! ./updateSlidesOffset.js */ 548));
var _updateSlidesProgress = _interopRequireDefault(__webpack_require__(/*! ./updateSlidesProgress.js */ 549));
var _updateProgress = _interopRequireDefault(__webpack_require__(/*! ./updateProgress.js */ 550));
var _updateSlidesClasses = _interopRequireDefault(__webpack_require__(/*! ./updateSlidesClasses.js */ 551));
var _updateActiveIndex = _interopRequireDefault(__webpack_require__(/*! ./updateActiveIndex.js */ 552));
var _updateClickedSlide = _interopRequireDefault(__webpack_require__(/*! ./updateClickedSlide.js */ 553));
var _default = {
  updateSize: _updateSize.default,
  updateSlides: _updateSlides.default,
  updateAutoHeight: _updateAutoHeight.default,
  updateSlidesOffset: _updateSlidesOffset.default,
  updateSlidesProgress: _updateSlidesProgress.default,
  updateProgress: _updateProgress.default,
  updateSlidesClasses: _updateSlidesClasses.default,
  updateActiveIndex: _updateActiveIndex.default,
  updateClickedSlide: _updateClickedSlide.default
};
exports.default = _default;

/***/ }),

/***/ 545:
/*!***********************************************************************************!*\
  !*** D:/project/前端/front/front/components/zebra-swiper/libs/update/updateSize.js ***!
  \***********************************************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = updateSize;
function updateSize() {
  var swiper = this;
  var width;
  var height;
  var el = swiper.el;
  if (typeof swiper.params.width !== 'undefined' && swiper.params.width !== null) {
    width = swiper.params.width;
  } else {
    width = el.width;
  }
  if (typeof swiper.params.height !== 'undefined' && swiper.params.height !== null) {
    height = swiper.params.height;
  } else {
    height = el.height;
  }
  if (width === 0 && swiper.isHorizontal() || height === 0 && swiper.isVertical()) {
    return;
  } // Subtract paddings
  if (Number.isNaN(width)) width = 0;
  if (Number.isNaN(height)) height = 0;
  Object.assign(swiper, {
    width: width,
    height: height,
    size: swiper.isHorizontal() ? width : height
  });
}

/***/ }),

/***/ 546:
/*!*************************************************************************************!*\
  !*** D:/project/前端/front/front/components/zebra-swiper/libs/update/updateSlides.js ***!
  \*************************************************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


var _interopRequireDefault = __webpack_require__(/*! @babel/runtime/helpers/interopRequireDefault */ 3);
Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = updateSlides;
var _regenerator = _interopRequireDefault(__webpack_require__(/*! @babel/runtime/regenerator */ 53));
var _defineProperty2 = _interopRequireDefault(__webpack_require__(/*! @babel/runtime/helpers/defineProperty */ 10));
var _asyncToGenerator2 = _interopRequireDefault(__webpack_require__(/*! @babel/runtime/helpers/asyncToGenerator */ 55));
var _toConsumableArray2 = _interopRequireDefault(__webpack_require__(/*! @babel/runtime/helpers/toConsumableArray */ 17));
var _utils = __webpack_require__(/*! ../../shared/utils.js */ 538);
function updateSlides() {
  var swiper = this;
  function getDirectionLabel(property) {
    if (swiper.isHorizontal()) {
      return property;
    } // prettier-ignore

    return {
      'width': 'height',
      'margin-top': 'margin-left',
      'margin-bottom ': 'margin-right',
      'margin-left': 'margin-top',
      'margin-right': 'margin-bottom',
      'padding-left': 'padding-top',
      'padding-right': 'padding-bottom',
      'marginRight': 'marginBottom'
    }[property];
  }
  function getDirectionPropertyValue(node, label) {
    return parseFloat(node[getDirectionLabel(label)] || 0);
  }
  function getComputedStyle(native) {
    return native.itemStyle;
  }
  var params = swiper.params;
  var $wrapperEl = swiper.$wrapperEl,
    swiperSize = swiper.size,
    rtl = swiper.rtlTranslate,
    wrongRTL = swiper.wrongRTL;
  var isVirtual = swiper.virtual && params.virtual.enabled;
  var previousSlidesLength = isVirtual ? swiper.virtual.slides.length : swiper.slides.length;
  // const slides = $wrapperEl.children(`.${swiper.params.slideClass}`);
  var slides = swiper.slides;
  var slidesLength = isVirtual ? swiper.virtual.slides.length : slides.length;
  var snapGrid = [];
  var slidesGrid = [];
  var slidesSizesGrid = [];
  var offsetBefore = params.slidesOffsetBefore;
  if (typeof offsetBefore === 'function') {
    offsetBefore = params.slidesOffsetBefore.call(swiper);
  }
  var offsetAfter = params.slidesOffsetAfter;
  if (typeof offsetAfter === 'function') {
    offsetAfter = params.slidesOffsetAfter.call(swiper);
  }
  var previousSnapGridLength = swiper.snapGrid.length;
  var previousSlidesGridLength = swiper.slidesGrid.length;
  var spaceBetween = params.spaceBetween;
  var slidePosition = -offsetBefore;
  var prevSlideSize = 0;
  var index = 0;
  if (typeof swiperSize === 'undefined') {
    return;
  }
  if (typeof spaceBetween === 'string' && spaceBetween.indexOf('%') >= 0) {
    spaceBetween = parseFloat(spaceBetween.replace('%', '')) / 100 * swiperSize;
  }
  swiper.virtualSize = -spaceBetween; // reset margins

  if (params.centeredSlides && params.cssMode) {
    (0, _utils.setCSSProperty)(swiper.wrapperEl, '--swiper-centered-offset-before', '');
    (0, _utils.setCSSProperty)(swiper.wrapperEl, '--swiper-centered-offset-after', '');
  }
  var gridEnabled = params.grid && params.grid.rows > 1 && swiper.grid;
  if (gridEnabled) {
    swiper.grid.initSlides(slidesLength);
  }
  var slideSize;
  var shouldResetSlideSize = params.slidesPerView === 'auto' && params.breakpoints && Object.keys(params.breakpoints).filter(function (key) {
    return typeof params.breakpoints[key].slidesPerView !== 'undefined';
  }).length > 0;
  Array.apply(void 0, (0, _toConsumableArray2.default)(Array(slidesLength))).forEach( /*#__PURE__*/function () {
    var _ref = (0, _asyncToGenerator2.default)( /*#__PURE__*/_regenerator.default.mark(function _callee(item, i) {
      var slide, slideStyles, currentTransform, currentWebKitTransform, width, paddingLeft, paddingRight, marginLeft, marginRight, boxSizing;
      return _regenerator.default.wrap(function _callee$(_context) {
        while (1) {
          switch (_context.prev = _context.next) {
            case 0:
              slideSize = 0;
              slide = slides[i];
              if (gridEnabled) {
                swiper.grid.updateSlide(i, slide, slidesLength, getDirectionLabel);
              }
              if (params.slidesPerView === 'auto') {
                if (shouldResetSlideSize) {
                  slides[i].style[getDirectionLabel('width')] = "";
                }
                slideStyles = getComputedStyle(slide);
                currentTransform = slide.itemStyle.transform;
                currentWebKitTransform = slide.itemStyle.webkitTransform;
                if (currentTransform) {
                  slide.itemStyle.transform = 'none';
                }
                if (currentWebKitTransform) {
                  slide.itemStyle.webkitTransform = 'none';
                }
                if (params.roundLengths) {
                  slideSize = swiper.isHorizontal() ? slide.outerWidth(true) : slide.outerHeight(true);
                } else {
                  width = swiper.isHorizontal() ? slide.width : slide.height;
                  paddingLeft = getDirectionPropertyValue(slideStyles, 'padding-left');
                  paddingRight = getDirectionPropertyValue(slideStyles, 'padding-right');
                  marginLeft = getDirectionPropertyValue(slideStyles, 'margin-left');
                  marginRight = getDirectionPropertyValue(slideStyles, 'margin-right');
                  boxSizing = slideStyles['box-sizing'];
                  if (boxSizing && boxSizing === 'border-box') {
                    slideSize = width + marginLeft + marginRight;
                  } else {
                    // slideSize = width + paddingLeft + paddingRight + marginLeft + marginRight;
                    slideSize = width;
                  }
                }
                if (currentTransform) {
                  slide.itemStyle.transform = currentTransform;
                }
                if (currentWebKitTransform) {
                  slide.itemStyle.webkitTransform = currentWebKitTransform;
                }
                if (params.roundLengths) slideSize = Math.floor(slideSize);
              } else {
                slideSize = (swiperSize - (params.slidesPerView - 1) * spaceBetween) / params.slidesPerView;
                if (params.roundLengths) slideSize = Math.floor(slideSize);
                slides[i] && slides[i].css((0, _defineProperty2.default)({}, getDirectionLabel('width'), "".concat(slideSize, "px")));
              }
              if (slides[i]) {
                slides[i].swiperSlideSize = slideSize;
              }
              slidesSizesGrid.push(slideSize);
              if (params.centeredSlides) {
                slidePosition = slidePosition + slideSize / 2 + prevSlideSize / 2 + spaceBetween;
                if (prevSlideSize === 0 && i !== 0) slidePosition = slidePosition - swiperSize / 2 - spaceBetween;
                if (i === 0) slidePosition = slidePosition - swiperSize / 2 - spaceBetween;
                if (Math.abs(slidePosition) < 1 / 1000) slidePosition = 0;
                if (params.roundLengths) slidePosition = Math.floor(slidePosition);
                if (index % params.slidesPerGroup === 0) snapGrid.push(slidePosition);
                slidesGrid.push(slidePosition);
              } else {
                if (params.roundLengths) slidePosition = Math.floor(slidePosition);
                if ((index - Math.min(swiper.params.slidesPerGroupSkip, index)) % swiper.params.slidesPerGroup === 0) snapGrid.push(slidePosition);
                slidesGrid.push(slidePosition);
                slidePosition = slidePosition + slideSize + spaceBetween;
              }
              swiper.virtualSize += slideSize + spaceBetween;
              prevSlideSize = slideSize;
              index += 1;
            case 10:
            case "end":
              return _context.stop();
          }
        }
      }, _callee);
    }));
    return function (_x, _x2) {
      return _ref.apply(this, arguments);
    };
  }());
  swiper.virtualSize = Math.max(swiper.virtualSize, swiperSize) + offsetAfter;
  if (rtl && wrongRTL && (params.effect === 'slide' || params.effect === 'coverflow')) {
    $wrapperEl.css({
      width: "".concat(swiper.virtualSize + params.spaceBetween, "px")
    });
  }
  if (params.setWrapperSize) {
    $wrapperEl.css((0, _defineProperty2.default)({}, getDirectionLabel('width'), "".concat(swiper.virtualSize + params.spaceBetween, "px")));
  }
  if (gridEnabled) {
    swiper.grid.updateWrapperSize(slideSize, snapGrid, getDirectionLabel);
  } // Remove last grid elements depending on width

  if (!params.centeredSlides) {
    var newSlidesGrid = [];
    for (var i = 0; i < snapGrid.length; i += 1) {
      var slidesGridItem = snapGrid[i];
      if (params.roundLengths) slidesGridItem = Math.floor(slidesGridItem);
      if (snapGrid[i] <= swiper.virtualSize - swiperSize) {
        newSlidesGrid.push(slidesGridItem);
      }
    }
    snapGrid = newSlidesGrid;
    if (Math.floor(swiper.virtualSize - swiperSize) - Math.floor(snapGrid[snapGrid.length - 1]) > 1) {
      snapGrid.push(swiper.virtualSize - swiperSize);
    }
  }
  if (snapGrid.length === 0) snapGrid = [0];
  if (params.spaceBetween !== 0) {
    var key = swiper.isHorizontal() && rtl ? 'margin-left' : getDirectionLabel('margin-right');
    slides.filter(function (_, slideIndex) {
      if (!params.cssMode) return true;
      if (slideIndex === slides.length - 1) {
        return false;
      }
      return true;
    }).forEach(function (item) {
      item.css((0, _defineProperty2.default)({}, key, "".concat(spaceBetween, "px")));
    });
  }
  if (params.centeredSlides && params.centeredSlidesBounds) {
    var allSlidesSize = 0;
    slidesSizesGrid.forEach(function (slideSizeValue) {
      allSlidesSize += slideSizeValue + (params.spaceBetween ? params.spaceBetween : 0);
    });
    allSlidesSize -= params.spaceBetween;
    var maxSnap = allSlidesSize - swiperSize;
    snapGrid = snapGrid.map(function (snap) {
      if (snap < 0) return -offsetBefore;
      if (snap > maxSnap) return maxSnap + offsetAfter;
      return snap;
    });
  }
  if (params.centerInsufficientSlides) {
    var _allSlidesSize = 0;
    slidesSizesGrid.forEach(function (slideSizeValue) {
      _allSlidesSize += slideSizeValue + (params.spaceBetween ? params.spaceBetween : 0);
    });
    _allSlidesSize -= params.spaceBetween;
    if (_allSlidesSize < swiperSize) {
      var allSlidesOffset = (swiperSize - _allSlidesSize) / 2;
      snapGrid.forEach(function (snap, snapIndex) {
        snapGrid[snapIndex] = snap - allSlidesOffset;
      });
      slidesGrid.forEach(function (snap, snapIndex) {
        slidesGrid[snapIndex] = snap + allSlidesOffset;
      });
    }
  }
  Object.assign(swiper, {
    slides: slides,
    snapGrid: snapGrid,
    slidesGrid: slidesGrid,
    slidesSizesGrid: slidesSizesGrid
  });
  if (params.centeredSlides && params.cssMode && !params.centeredSlidesBounds) {
    (0, _utils.setCSSProperty)(swiper.wrapperEl, '--swiper-centered-offset-before', "".concat(-snapGrid[0], "px"));
    (0, _utils.setCSSProperty)(swiper.wrapperEl, '--swiper-centered-offset-after', "".concat(swiper.size / 2 - slidesSizesGrid[slidesSizesGrid.length - 1] / 2, "px"));
    var addToSnapGrid = -swiper.snapGrid[0];
    var addToSlidesGrid = -swiper.slidesGrid[0];
    swiper.snapGrid = swiper.snapGrid.map(function (v) {
      return v + addToSnapGrid;
    });
    swiper.slidesGrid = swiper.slidesGrid.map(function (v) {
      return v + addToSlidesGrid;
    });
  }
  if (slidesLength !== previousSlidesLength) {
    swiper.emit('slidesLengthChange');
  }
  if (snapGrid.length !== previousSnapGridLength) {
    if (swiper.params.watchOverflow) swiper.checkOverflow();
    swiper.emit('snapGridLengthChange');
  }
  if (slidesGrid.length !== previousSlidesGridLength) {
    swiper.emit('slidesGridLengthChange');
  }
  if (params.watchSlidesProgress) {
    swiper.updateSlidesOffset();
  }
  return slides;
}

/***/ }),

/***/ 547:
/*!*****************************************************************************************!*\
  !*** D:/project/前端/front/front/components/zebra-swiper/libs/update/updateAutoHeight.js ***!
  \*****************************************************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


var _interopRequireDefault = __webpack_require__(/*! @babel/runtime/helpers/interopRequireDefault */ 3);
Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = updateAutoHeight;
var _regenerator = _interopRequireDefault(__webpack_require__(/*! @babel/runtime/regenerator */ 53));
var _asyncToGenerator2 = _interopRequireDefault(__webpack_require__(/*! @babel/runtime/helpers/asyncToGenerator */ 55));
function updateAutoHeight(_x) {
  return _updateAutoHeight.apply(this, arguments);
}
function _updateAutoHeight() {
  _updateAutoHeight = (0, _asyncToGenerator2.default)( /*#__PURE__*/_regenerator.default.mark(function _callee(speed) {
    var swiper, activeSlides, isVirtual, newHeight, i, getSlideByIndex, index, height;
    return _regenerator.default.wrap(function _callee$(_context) {
      while (1) {
        switch (_context.prev = _context.next) {
          case 0:
            swiper = this;
            activeSlides = [];
            isVirtual = swiper.virtual && swiper.params.virtual.enabled;
            newHeight = 0;
            if (typeof speed === 'number') {
              swiper.setTransition(speed);
            } else if (speed === true) {
              swiper.setTransition(swiper.params.speed);
            }
            getSlideByIndex = function getSlideByIndex(index) {
              if (isVirtual) {
                return swiper.slides.filter(function (el) {
                  return parseInt(el.getAttribute('data-swiper-slide-index'), 10) === index;
                })[0];
              }
              return swiper.slides[index];
            }; // Find slides currently in view
            if (!(swiper.params.slidesPerView !== 'auto' && swiper.params.slidesPerView > 1)) {
              _context.next = 22;
              break;
            }
            if (!swiper.params.centeredSlides) {
              _context.next = 11;
              break;
            }
            swiper.visibleSlides.each(function (slide) {
              activeSlides.push(slide);
            });
            _context.next = 20;
            break;
          case 11:
            i = 0;
          case 12:
            if (!(i < Math.ceil(swiper.params.slidesPerView))) {
              _context.next = 20;
              break;
            }
            index = swiper.activeIndex + i;
            if (!(index > swiper.slides.length && !isVirtual)) {
              _context.next = 16;
              break;
            }
            return _context.abrupt("break", 20);
          case 16:
            activeSlides.push(getSlideByIndex(index));
          case 17:
            i += 1;
            _context.next = 12;
            break;
          case 20:
            _context.next = 23;
            break;
          case 22:
            activeSlides.push(getSlideByIndex(swiper.activeIndex));
          case 23:
            i = 0;
          case 24:
            if (!(i < activeSlides.length)) {
              _context.next = 33;
              break;
            }
            if (!(typeof activeSlides[i] !== 'undefined')) {
              _context.next = 30;
              break;
            }
            _context.next = 28;
            return activeSlides[i].getHeight();
          case 28:
            height = _context.sent;
            newHeight = height > newHeight ? height : newHeight;
          case 30:
            i += 1;
            _context.next = 24;
            break;
          case 33:
            // Update Height

            if (newHeight || newHeight === 0) swiper.$wrapperEl.css({
              height: "".concat(newHeight ? newHeight : '', "px")
            });
          case 34:
          case "end":
            return _context.stop();
        }
      }
    }, _callee, this);
  }));
  return _updateAutoHeight.apply(this, arguments);
}

/***/ }),

/***/ 548:
/*!*******************************************************************************************!*\
  !*** D:/project/前端/front/front/components/zebra-swiper/libs/update/updateSlidesOffset.js ***!
  \*******************************************************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


var _interopRequireDefault = __webpack_require__(/*! @babel/runtime/helpers/interopRequireDefault */ 3);
Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = updateSlidesOffset;
var _regenerator = _interopRequireDefault(__webpack_require__(/*! @babel/runtime/regenerator */ 53));
var _asyncToGenerator2 = _interopRequireDefault(__webpack_require__(/*! @babel/runtime/helpers/asyncToGenerator */ 55));
function updateSlidesOffset() {
  return _updateSlidesOffset.apply(this, arguments);
}
function _updateSlidesOffset() {
  _updateSlidesOffset = (0, _asyncToGenerator2.default)( /*#__PURE__*/_regenerator.default.mark(function _callee() {
    var swiper, slides, i, offset;
    return _regenerator.default.wrap(function _callee$(_context) {
      while (1) {
        switch (_context.prev = _context.next) {
          case 0:
            swiper = this;
            slides = swiper.slides;
            for (i = 0; i < slides.length; i += 1) {
              offset = (slides[i].swiperSlideSize + swiper.params.spaceBetween) * slides[i].index;
              slides[i].swiperSlideOffset = swiper.isHorizontal() ? offset : offset;
            }
          case 3:
          case "end":
            return _context.stop();
        }
      }
    }, _callee, this);
  }));
  return _updateSlidesOffset.apply(this, arguments);
}

/***/ }),

/***/ 549:
/*!*********************************************************************************************!*\
  !*** D:/project/前端/front/front/components/zebra-swiper/libs/update/updateSlidesProgress.js ***!
  \*********************************************************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = updateSlidesProgress;
function updateSlidesProgress() {
  var translate = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : this && this.translate || 0;
  var swiper = this;
  var params = swiper.params;
  var slides = swiper.slides,
    rtl = swiper.rtlTranslate,
    snapGrid = swiper.snapGrid;
  if (slides.length === 0) return;
  if (typeof slides[0].swiperSlideOffset === 'undefined' || typeof slides[slides.length - 1].swiperSlideOffset === 'undefined') swiper.updateSlidesOffset();
  var offsetCenter = -translate;
  if (rtl) offsetCenter = translate; // Visible Slides

  swiper.visibleSlidesIndexes = [];
  swiper.visibleSlides = [];

  // slides.forEach((item)=>)

  for (var i = 0; i < slides.length; i += 1) {
    var slide = slides[i];
    var slideOffset = slide.swiperSlideOffset;
    if (params.cssMode && params.centeredSlides) {
      slideOffset -= slides[0].swiperSlideOffset;
    }
    var slideProgress = (offsetCenter + (params.centeredSlides ? swiper.minTranslate() : 0) - slideOffset) / (slide.swiperSlideSize + params.spaceBetween);
    var originalSlideProgress = (offsetCenter - snapGrid[0] + (params.centeredSlides ? swiper.minTranslate() : 0) - slideOffset) / (slide.swiperSlideSize + params.spaceBetween);
    var slideBefore = -(offsetCenter - slideOffset);
    var slideAfter = slideBefore + swiper.slidesSizesGrid[i];
    var isVisible = slideBefore >= 0 && slideBefore < swiper.size - 1 || slideAfter > 1 && slideAfter <= swiper.size || slideBefore <= 0 && slideAfter >= swiper.size;
    if (isVisible) {
      swiper.visibleSlides.push(slide);
      swiper.visibleSlidesIndexes.push(i);
      slides[i].addClass(params.slideVisibleClass);
    }
    slide.progress = rtl ? -slideProgress : slideProgress;
    slide.originalProgress = rtl ? -originalSlideProgress : originalSlideProgress;
  }
}

/***/ }),

/***/ 55:
/*!*****************************************************************!*\
  !*** ./node_modules/@babel/runtime/helpers/asyncToGenerator.js ***!
  \*****************************************************************/
/*! no static exports found */
/***/ (function(module, exports) {

function asyncGeneratorStep(gen, resolve, reject, _next, _throw, key, arg) {
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
    Promise.resolve(value).then(_next, _throw);
  }
}
function _asyncToGenerator(fn) {
  return function () {
    var self = this,
      args = arguments;
    return new Promise(function (resolve, reject) {
      var gen = fn.apply(self, args);
      function _next(value) {
        asyncGeneratorStep(gen, resolve, reject, _next, _throw, "next", value);
      }
      function _throw(err) {
        asyncGeneratorStep(gen, resolve, reject, _next, _throw, "throw", err);
      }
      _next(undefined);
    });
  };
}
module.exports = _asyncToGenerator, module.exports.__esModule = true, module.exports["default"] = module.exports;

/***/ }),

/***/ 550:
/*!***************************************************************************************!*\
  !*** D:/project/前端/front/front/components/zebra-swiper/libs/update/updateProgress.js ***!
  \***************************************************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = updateProgress;
function updateProgress(translate) {
  var swiper = this;
  if (typeof translate === 'undefined') {
    var multiplier = swiper.rtlTranslate ? -1 : 1; // eslint-disable-next-line

    translate = swiper && swiper.translate && swiper.translate * multiplier || 0;
  }
  var params = swiper.params;
  var translatesDiff = swiper.maxTranslate() - swiper.minTranslate();
  var progress = swiper.progress,
    isBeginning = swiper.isBeginning,
    isEnd = swiper.isEnd;
  var wasBeginning = isBeginning;
  var wasEnd = isEnd;
  if (translatesDiff === 0) {
    progress = 0;
    isBeginning = true;
    isEnd = true;
  } else {
    progress = (translate - swiper.minTranslate()) / translatesDiff;
    isBeginning = progress <= 0;
    isEnd = progress >= 1;
  }
  Object.assign(swiper, {
    progress: progress,
    isBeginning: isBeginning,
    isEnd: isEnd
  });
  if (params.watchSlidesProgress || params.centeredSlides && params.autoHeight) swiper.updateSlidesProgress(translate);
  if (isBeginning && !wasBeginning) {
    swiper.emit('reachBeginning toEdge');
  }
  if (isEnd && !wasEnd) {
    swiper.emit('reachEnd toEdge');
  }
  if (wasBeginning && !isBeginning || wasEnd && !isEnd) {
    swiper.emit('fromEdge');
  }
  swiper.emit('progress', progress);
}

/***/ }),

/***/ 551:
/*!********************************************************************************************!*\
  !*** D:/project/前端/front/front/components/zebra-swiper/libs/update/updateSlidesClasses.js ***!
  \********************************************************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = updateSlidesClasses;
function updateSlidesClasses() {
  var swiper = this;
  var slides = swiper.slides,
    params = swiper.params,
    $wrapperEl = swiper.$wrapperEl,
    activeIndex = swiper.activeIndex,
    realIndex = swiper.realIndex;
  if (!slides.length || !$wrapperEl) return;
  var isVirtual = swiper.virtual && params.virtual.enabled;
  for (var i = 0; i < slides.length; i++) {
    slides[i].removeClass("".concat(params.slideActiveClass, " ").concat(params.slideNextClass, " ").concat(params.slidePrevClass, " ").concat(params.slideDuplicateActiveClass, " ").concat(params.slideDuplicateNextClass, " ").concat(params.slideDuplicatePrevClass));
  }
  var activeSlide;
  if (isVirtual) {
    // activeSlide = swiper.$wrapperEl.find(`.${params.slideClass}[data-swiper-slide-index="${activeIndex}"]`);
    activeSlide = slides[slides.findIndex(function (item) {
      return item.dataSwiperSlideIndex == activeIndex;
    })];
  } else {
    activeSlide = slides[activeIndex];
  } // Active classes

  if (!activeSlide) return;
  activeSlide.addClass(params.slideActiveClass);
  if (params.loop) {
    if (activeSlide.hasClass(params.slideDuplicateClass)) {
      // $wrapperEl.children[realIndex].addClass(params.slideDuplicateActiveClass);
      var index = slides.findIndex(function (item) {
        return !item.hasClass(params.slideDuplicateClass) && item.dataSwiperSlideIndex == realIndex;
      });
      slides[index] && slides[index].addClass(params.slideDuplicateActiveClass);
    } else {
      // $wrapperEl.children[realIndex].addClass(params.slideDuplicateActiveClass);
      var _index = slides.findIndex(function (item) {
        return item.hasClass(params.slideDuplicateClass) && item.dataSwiperSlideIndex == realIndex;
      });
      slides[_index] && slides[_index].addClass(params.slideDuplicateActiveClass);
    }
  } // Next Slide

  var nextSlide = activeSlide.nextAll(".".concat(params.slideClass))[0];
  if (nextSlide) {
    nextSlide.addClass(params.slideNextClass);
  } else {
    if (params.loop && !nextSlide) {
      nextSlide = slides[0];
      nextSlide.addClass(params.slideNextClass);
    } // Prev Slide
  }

  var prevSlide = activeSlide.prevAll(".".concat(params.slideClass))[0];
  if (prevSlide) {
    prevSlide.addClass(params.slidePrevClass);
  } else {
    if (params.loop && !prevSlide) {
      prevSlide = slides[slides.length - 1];
      prevSlide.addClass(params.slidePrevClass);
    }
  }
  if (params.loop) {
    // Duplicate to all looped slides
    if (nextSlide.hasClass(params.slideDuplicateClass)) {
      // $wrapperEl.children(
      // 	nextSlide.dataSwiperSlideIndex
      // ).addClass(params.slideDuplicateNextClass);

      var _index2 = slides.findIndex(function (item) {
        return !item.hasClass(params.slideDuplicateClass) && item.dataSwiperSlideIndex == nextSlide.dataSwiperSlideIndex;
      });
      slides[_index2] && slides[_index2].addClass(params.slideDuplicateNextClass);
    } else {
      // $wrapperEl.children(
      // 	nextSlide.dataSwiperSlideIndex
      // ).addClass(params.slideDuplicateNextClass);

      var _index3 = slides.findIndex(function (item) {
        return item.hasClass(params.slideDuplicateClass) && item.dataSwiperSlideIndex == nextSlide.dataSwiperSlideIndex;
      });
      slides[_index3] && slides[_index3].addClass(params.slideDuplicateNextClass);
    }
    if (prevSlide.hasClass(params.slideDuplicateClass)) {
      // $wrapperEl.children(
      // 	prevSlide.dataSwiperSlideIndex
      // ).addClass(params.slideDuplicatePrevClass);
      var _index4 = slides.findIndex(function (item) {
        return !item.hasClass(params.slideDuplicateClass) && item.dataSwiperSlideIndex == prevSlide.dataSwiperSlideIndex;
      });
      slides[_index4] && slides[_index4].addClass(params.slideDuplicatePrevClass);
    } else {
      // $wrapperEl.children(
      // 	prevSlide.dataSwiperSlideIndex
      // ).addClass(params.slideDuplicatePrevClass);
      var _index5 = slides.findIndex(function (item) {
        return item.hasClass(params.slideDuplicateClass) && item.dataSwiperSlideIndex == prevSlide.dataSwiperSlideIndex;
      });
      slides[_index5] && slides[_index5].addClass(params.slideDuplicatePrevClass);
    }
  }
  swiper.emitSlidesClasses();
}

/***/ }),

/***/ 552:
/*!******************************************************************************************!*\
  !*** D:/project/前端/front/front/components/zebra-swiper/libs/update/updateActiveIndex.js ***!
  \******************************************************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = updateActiveIndex;
function updateActiveIndex(newActiveIndex) {
  var swiper = this;
  var translate = swiper.rtlTranslate ? swiper.translate : -swiper.translate;
  var slidesGrid = swiper.slidesGrid,
    snapGrid = swiper.snapGrid,
    params = swiper.params,
    previousIndex = swiper.activeIndex,
    previousRealIndex = swiper.realIndex,
    previousSnapIndex = swiper.snapIndex;
  var activeIndex = newActiveIndex;
  var snapIndex;
  if (typeof activeIndex === 'undefined') {
    for (var i = 0; i < slidesGrid.length; i += 1) {
      if (typeof slidesGrid[i + 1] !== 'undefined') {
        if (translate >= slidesGrid[i] && translate < slidesGrid[i + 1] - (slidesGrid[i + 1] - slidesGrid[i]) / 2) {
          activeIndex = i;
        } else if (translate >= slidesGrid[i] && translate < slidesGrid[i + 1]) {
          activeIndex = i + 1;
        }
      } else if (translate >= slidesGrid[i]) {
        activeIndex = i;
      }
    } // Normalize slideIndex

    if (params.normalizeSlideIndex) {
      if (activeIndex < 0 || typeof activeIndex === 'undefined') activeIndex = 0;
    }
  }
  if (snapGrid.indexOf(translate) >= 0) {
    snapIndex = snapGrid.indexOf(translate);
  } else {
    var skip = Math.min(params.slidesPerGroupSkip, activeIndex);
    snapIndex = skip + Math.floor((activeIndex - skip) / params.slidesPerGroup);
  }
  if (snapIndex >= snapGrid.length) snapIndex = snapGrid.length - 1;
  if (swiper.loopedSlides) {
    swiper.slides.filter(function (item) {
      return item.index >= swiper.loopedSlides && item.index < swiper.slides.length - swiper.loopedSlides;
    }).forEach(function (item, index) {
      item.dataSwiperSlideIndex = item.index - swiper.loopedSlides;
    });
    swiper.slides.filter(function (item) {
      return item.index < swiper.loopedSlides;
    }).forEach(function (item, index) {
      if (swiper.slides[swiper.slides.length - swiper.loopedSlides * 3 + index]) {
        item.dataSwiperSlideIndex = swiper.slides[swiper.slides.length - swiper.loopedSlides * 3 + index].index;
      }
    });
    swiper.slides.filter(function (item) {
      return item.index >= swiper.slides.length - swiper.loopedSlides;
    }).forEach(function (item, index) {
      item.dataSwiperSlideIndex = swiper.slides[index].index;
    });
  }
  if (activeIndex === previousIndex) {
    if (snapIndex !== previousSnapIndex) {
      swiper.snapIndex = snapIndex;
      swiper.emit('snapIndexChange');
    }
    return;
  } // Get real index

  var realIndex;
  if (swiper.virtual && params.virtual.enabled) {
    realIndex = activeIndex;
  } else {
    if (swiper.slides[activeIndex].dataSwiperSlideIndex == undefined || swiper.slides[activeIndex].dataSwiperSlideIndex == null) {
      realIndex = activeIndex;
    } else {
      realIndex = swiper.slides[activeIndex].dataSwiperSlideIndex;
    }
  }
  Object.assign(swiper, {
    snapIndex: snapIndex,
    realIndex: realIndex,
    previousIndex: previousIndex,
    activeIndex: activeIndex
  });
  swiper.emit('activeIndexChange');
  swiper.emit('snapIndexChange');
  if (previousRealIndex !== realIndex) {
    swiper.emit('realIndexChange');
  }
  if (swiper.initialized || swiper.params.runCallbacksOnInit) {
    swiper.emit('slideChange', activeIndex);
  }
}

/***/ }),

/***/ 553:
/*!*******************************************************************************************!*\
  !*** D:/project/前端/front/front/components/zebra-swiper/libs/update/updateClickedSlide.js ***!
  \*******************************************************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = updateClickedSlide;
function updateClickedSlide(e) {
  var swiper = this;
  var params = swiper.params;
  var slide = swiper.slides[e];
  var slideFound = false;
  var slideIndex;
  if (slide) {
    for (var i = 0; i < swiper.slides.length; i += 1) {
      if (swiper.slides[i] === slide) {
        slideFound = true;
        slideIndex = i;
        break;
      }
    }
  }
  if (slide && slideFound) {
    swiper.clickedSlide = slide;
    if (swiper.virtual && swiper.params.virtual.enabled) {
      swiper.clickedIndex = parseInt($(slide).attr('data-swiper-slide-index'), 10);
    } else {
      swiper.clickedIndex = slideIndex;
    }
  } else {
    swiper.clickedSlide = undefined;
    swiper.clickedIndex = undefined;
    return;
  }
  if (params.slideToClickedSlide && swiper.clickedIndex !== undefined && swiper.clickedIndex !== swiper.activeIndex) {
    swiper.slideToClickedSlide();
  }
}

/***/ }),

/***/ 554:
/*!*********************************************************************************!*\
  !*** D:/project/前端/front/front/components/zebra-swiper/libs/translate/index.js ***!
  \*********************************************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


var _interopRequireDefault = __webpack_require__(/*! @babel/runtime/helpers/interopRequireDefault */ 3);
Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;
var _getTranslate = _interopRequireDefault(__webpack_require__(/*! ./getTranslate.js */ 555));
var _setTranslate = _interopRequireDefault(__webpack_require__(/*! ./setTranslate.js */ 556));
var _minTranslate = _interopRequireDefault(__webpack_require__(/*! ./minTranslate.js */ 557));
var _maxTranslate = _interopRequireDefault(__webpack_require__(/*! ./maxTranslate.js */ 558));
var _translateTo = _interopRequireDefault(__webpack_require__(/*! ./translateTo.js */ 559));
var _default = {
  getTranslate: _getTranslate.default,
  setTranslate: _setTranslate.default,
  minTranslate: _minTranslate.default,
  maxTranslate: _maxTranslate.default,
  translateTo: _translateTo.default
};
exports.default = _default;

/***/ }),

/***/ 555:
/*!****************************************************************************************!*\
  !*** D:/project/前端/front/front/components/zebra-swiper/libs/translate/getTranslate.js ***!
  \****************************************************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = getSwiperTranslate;
var _utils = __webpack_require__(/*! ../../shared/utils.js */ 538);
function getSwiperTranslate() {
  var axis = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : this.isHorizontal() ? 'x' : 'y';
  var swiper = this;
  var params = swiper.params,
    rtl = swiper.rtlTranslate,
    translate = swiper.translate,
    $wrapperEl = swiper.$wrapperEl;
  if (params.virtualTranslate) {
    return rtl ? -translate : translate;
  }
  if (params.cssMode) {
    return translate;
  }
  var currentTranslate = (0, _utils.getTranslate)(swiper, axis);
  if (rtl) currentTranslate = -currentTranslate;
  return currentTranslate || 0;
}

/***/ }),

/***/ 556:
/*!****************************************************************************************!*\
  !*** D:/project/前端/front/front/components/zebra-swiper/libs/translate/setTranslate.js ***!
  \****************************************************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = setTranslate;
function setTranslate(translate, byController) {
  var swiper = this;
  var rtl = swiper.rtlTranslate,
    params = swiper.params,
    $wrapperEl = swiper.$wrapperEl,
    wrapperEl = swiper.wrapperEl,
    progress = swiper.progress;
  var x = 0;
  var y = 0;
  var z = 0;
  if (isNaN(translate)) {
    return;
  }
  if (!$wrapperEl) return;
  if (swiper.isHorizontal()) {
    x = rtl ? -translate : translate;
  } else {
    y = translate;
  }
  if (params.roundLengths) {
    x = Math.floor(x);
    y = Math.floor(y);
  }
  if (params.cssMode) {
    wrapperEl[swiper.isHorizontal() ? 'scrollLeft' : 'scrollTop'] = swiper.isHorizontal() ? -x : -y;
  } else if (!params.virtualTranslate) {
    $wrapperEl.transform("translate3d(".concat(x, "px, ").concat(y, "px, ").concat(z, "px)"));
  }
  swiper.previousTranslate = swiper.translate;
  swiper.translate = swiper.isHorizontal() ? x : y; // Check if we need to update progress

  var newProgress;
  var translatesDiff = swiper.maxTranslate() - swiper.minTranslate();
  if (translatesDiff === 0) {
    newProgress = 0;
  } else {
    newProgress = (translate - swiper.minTranslate()) / translatesDiff;
  }
  if (newProgress !== progress) {
    swiper.updateProgress(translate);
  }
  swiper.emit('setTranslate', swiper.translate, byController);
}

/***/ }),

/***/ 557:
/*!****************************************************************************************!*\
  !*** D:/project/前端/front/front/components/zebra-swiper/libs/translate/minTranslate.js ***!
  \****************************************************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = minTranslate;
function minTranslate() {
  return -this.snapGrid[0];
}

/***/ }),

/***/ 558:
/*!****************************************************************************************!*\
  !*** D:/project/前端/front/front/components/zebra-swiper/libs/translate/maxTranslate.js ***!
  \****************************************************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = maxTranslate;
function maxTranslate() {
  return -this.snapGrid[this.snapGrid.length - 1];
}

/***/ }),

/***/ 559:
/*!***************************************************************************************!*\
  !*** D:/project/前端/front/front/components/zebra-swiper/libs/translate/translateTo.js ***!
  \***************************************************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


var _interopRequireDefault = __webpack_require__(/*! @babel/runtime/helpers/interopRequireDefault */ 3);
Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = translateTo;
var _defineProperty2 = _interopRequireDefault(__webpack_require__(/*! @babel/runtime/helpers/defineProperty */ 10));
var _utils = __webpack_require__(/*! ../../shared/utils.js */ 538);
function translateTo() {
  var translate = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : 0;
  var speed = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : this.params.speed;
  var runCallbacks = arguments.length > 2 && arguments[2] !== undefined ? arguments[2] : true;
  var translateBounds = arguments.length > 3 && arguments[3] !== undefined ? arguments[3] : true;
  var internal = arguments.length > 4 ? arguments[4] : undefined;
  var swiper = this;
  var timer;
  var params = swiper.params,
    wrapperEl = swiper.wrapperEl;
  if (swiper.animating && params.preventInteractionOnTransition) {
    return false;
  }
  var minTranslate = swiper.minTranslate();
  var maxTranslate = swiper.maxTranslate();
  var newTranslate;
  if (translateBounds && translate > minTranslate) newTranslate = minTranslate;else if (translateBounds && translate < maxTranslate) newTranslate = maxTranslate;else newTranslate = translate; // Update progress

  swiper.updateProgress(newTranslate);
  if (params.cssMode) {
    var isH = swiper.isHorizontal();
    if (speed === 0) {
      wrapperEl[isH ? 'scrollLeft' : 'scrollTop'] = -newTranslate;
    } else {
      var _wrapperEl$scrollTo;
      if (!swiper.support.smoothScroll) {
        (0, _utils.animateCSSModeScroll)({
          swiper: swiper,
          targetPosition: -newTranslate,
          side: isH ? 'left' : 'top'
        });
        return true;
      }
      wrapperEl.scrollTo((_wrapperEl$scrollTo = {}, (0, _defineProperty2.default)(_wrapperEl$scrollTo, isH ? 'left' : 'top', -newTranslate), (0, _defineProperty2.default)(_wrapperEl$scrollTo, "behavior", 'smooth'), _wrapperEl$scrollTo));
    }
    return true;
  }
  if (speed === 0) {
    swiper.setTransition(0);
    swiper.setTranslate(newTranslate);
    if (runCallbacks) {
      swiper.emit('beforeTransitionStart', speed, internal);
      swiper.emit('transitionEnd');
    }
  } else {
    swiper.setTransition(speed);
    swiper.setTranslate(newTranslate);
    if (runCallbacks) {
      swiper.emit('beforeTransitionStart', speed, internal);
      swiper.emit('transitionStart');
    }
    if (!swiper.animating) {
      swiper.animating = true;
      if (!swiper.onTranslateToWrapperTransitionEnd) {
        swiper.onTranslateToWrapperTransitionEnd = function transitionEnd(e) {
          if (!swiper || swiper.destroyed) return;
          if (e.target !== this) return;
          clearTimeout(timer);
          swiper.onTranslateToWrapperTransitionEnd = null;
          delete swiper.onTranslateToWrapperTransitionEnd;
          if (runCallbacks) {
            swiper.emit('transitionEnd');
          }
        };
      }
      timer = setTimeout(function () {
        swiper.onTranslateToWrapperTransitionEnd();
      }, speed);
    }
  }
  return true;
}

/***/ }),

/***/ 560:
/*!**********************************************************************************!*\
  !*** D:/project/前端/front/front/components/zebra-swiper/libs/transition/index.js ***!
  \**********************************************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


var _interopRequireDefault = __webpack_require__(/*! @babel/runtime/helpers/interopRequireDefault */ 3);
Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;
var _setTransition = _interopRequireDefault(__webpack_require__(/*! ./setTransition.js */ 561));
var _transitionStart = _interopRequireDefault(__webpack_require__(/*! ./transitionStart.js */ 562));
var _transitionEnd = _interopRequireDefault(__webpack_require__(/*! ./transitionEnd.js */ 564));
var _default = {
  setTransition: _setTransition.default,
  transitionStart: _transitionStart.default,
  transitionEnd: _transitionEnd.default
};
exports.default = _default;

/***/ }),

/***/ 561:
/*!******************************************************************************************!*\
  !*** D:/project/前端/front/front/components/zebra-swiper/libs/transition/setTransition.js ***!
  \******************************************************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = setTransition;
function setTransition(duration, byController) {
  var swiper = this;
  if (!swiper.$wrapperEl) return;
  if (!swiper.params.cssMode) {
    swiper.$wrapperEl.transition(duration);
  }
  swiper.emit('setTransition', duration, byController);
}

/***/ }),

/***/ 562:
/*!********************************************************************************************!*\
  !*** D:/project/前端/front/front/components/zebra-swiper/libs/transition/transitionStart.js ***!
  \********************************************************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


var _interopRequireDefault = __webpack_require__(/*! @babel/runtime/helpers/interopRequireDefault */ 3);
Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = transitionStart;
var _transitionEmit = _interopRequireDefault(__webpack_require__(/*! ./transitionEmit.js */ 563));
function transitionStart() {
  var runCallbacks = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : true;
  var direction = arguments.length > 1 ? arguments[1] : undefined;
  var swiper = this;
  var params = swiper.params;
  if (params.cssMode) return;
  if (params.autoHeight) {
    swiper.updateAutoHeight();
  }
  (0, _transitionEmit.default)({
    swiper: swiper,
    runCallbacks: runCallbacks,
    direction: direction,
    step: 'Start'
  });
}

/***/ }),

/***/ 563:
/*!*******************************************************************************************!*\
  !*** D:/project/前端/front/front/components/zebra-swiper/libs/transition/transitionEmit.js ***!
  \*******************************************************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = transitionEmit;
function transitionEmit(_ref) {
  var swiper = _ref.swiper,
    runCallbacks = _ref.runCallbacks,
    direction = _ref.direction,
    step = _ref.step;
  var activeIndex = swiper.activeIndex,
    previousIndex = swiper.previousIndex;
  var dir = direction;
  if (!dir) {
    if (activeIndex > previousIndex) dir = 'next';else if (activeIndex < previousIndex) dir = 'prev';else dir = 'reset';
  }
  swiper.emit("transition".concat(step));
  if (runCallbacks && activeIndex !== previousIndex) {
    if (dir === 'reset') {
      swiper.emit("slideResetTransition".concat(step));
      return;
    }
    swiper.emit("slideChangeTransition".concat(step));
    if (dir === 'next') {
      swiper.emit("slideNextTransition".concat(step));
    } else {
      swiper.emit("slidePrevTransition".concat(step));
    }
  }
}

/***/ }),

/***/ 564:
/*!******************************************************************************************!*\
  !*** D:/project/前端/front/front/components/zebra-swiper/libs/transition/transitionEnd.js ***!
  \******************************************************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


var _interopRequireDefault = __webpack_require__(/*! @babel/runtime/helpers/interopRequireDefault */ 3);
Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = transitionEnd;
var _transitionEmit = _interopRequireDefault(__webpack_require__(/*! ./transitionEmit.js */ 563));
function transitionEnd() {
  var runCallbacks = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : true;
  var direction = arguments.length > 1 ? arguments[1] : undefined;
  var swiper = this;
  var params = swiper.params;
  swiper.animating = false;
  if (params.cssMode) return;
  swiper.setTransition(0);
  (0, _transitionEmit.default)({
    swiper: swiper,
    runCallbacks: runCallbacks,
    direction: direction,
    step: 'End'
  });
}

/***/ }),

/***/ 565:
/*!**************************************************************************!*\
  !*** D:/project/前端/front/front/components/zebra-swiper/libs/defaults.js ***!
  \**************************************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;
var _default = {
  init: true,
  direction: 'horizontal',
  touchEventsTarget: 'wrapper',
  initialSlide: 0,
  speed: 300,
  cssMode: false,
  updateOnWindowResize: true,
  resizeObserver: true,
  nested: false,
  createElements: false,
  enabled: true,
  focusableElements: 'input, select, option, textarea, button, video, label',
  // Overrides
  width: null,
  height: null,
  //
  preventInteractionOnTransition: false,
  // ssr
  userAgent: null,
  url: null,
  // To support iOS's swipe-to-go-back gesture (when being used in-app).
  edgeSwipeDetection: false,
  edgeSwipeThreshold: 20,
  // Autoheight
  autoHeight: false,
  // Set wrapper width
  setWrapperSize: false,
  // Virtual Translate
  virtualTranslate: false,
  virtualList: [],
  virtualIndexList: [],
  // Effects
  effect: 'slide',
  // 'slide' or 'fade' or 'cube' or 'coverflow' or 'flip'
  // Breakpoints
  breakpoints: undefined,
  breakpointsBase: 'window',
  // Slides grid
  spaceBetween: 0,
  slidesPerView: 1,
  slidesPerGroup: 1,
  slidesPerGroupSkip: 0,
  slidesPerGroupAuto: false,
  centeredSlides: false,
  centeredSlidesBounds: false,
  slidesOffsetBefore: 0,
  // in px
  slidesOffsetAfter: 0,
  // in px
  normalizeSlideIndex: true,
  centerInsufficientSlides: false,
  // Disable swiper and hide navigation when container not overflow
  watchOverflow: true,
  // Round length
  roundLengths: false,
  // Touches
  touchRatio: 1,
  touchAngle: 45,
  simulateTouch: true,
  shortSwipes: true,
  longSwipes: true,
  longSwipesRatio: 0.5,
  longSwipesMs: 300,
  followFinger: true,
  allowTouchMove: true,
  threshold: 0,
  touchMoveStopPropagation: false,
  touchStartPreventDefault: true,
  touchStartForcePreventDefault: false,
  touchReleaseOnEdges: false,
  // Unique Navigation Elements
  uniqueNavElements: true,
  // Resistance
  resistance: true,
  resistanceRatio: 0.85,
  // Progress
  watchSlidesProgress: false,
  // Cursor
  grabCursor: false,
  // Clicks
  preventClicks: true,
  preventClicksPropagation: true,
  slideToClickedSlide: false,
  // Images
  preloadImages: true,
  updateOnImagesReady: true,
  // loop
  loop: false,
  loopAdditionalSlides: 0,
  loopedSlides: null,
  loopFillGroupWithBlank: false,
  loopPreventsSlide: true,
  // rewind
  rewind: false,
  // Swiping/no swiping
  allowSlidePrev: true,
  allowSlideNext: true,
  swipeHandler: null,
  // '.swipe-handler',
  noSwiping: false,
  noSwipingClass: 'swiper-no-swiping',
  noSwipingSelector: null,
  // Passive Listeners
  passiveListeners: true,
  // NS
  containerModifierClass: 'swiper-',
  // NEW
  slideClass: 'swiper-slide',
  slideBlankClass: 'swiper-slide-invisible-blank',
  slideActiveClass: 'swiper-slide-active',
  slideDuplicateActiveClass: 'swiper-slide-duplicate-active',
  slideVisibleClass: 'swiper-slide-visible',
  slideDuplicateClass: 'swiper-slide-duplicate',
  slideNextClass: 'swiper-slide-next',
  slideDuplicateNextClass: 'swiper-slide-duplicate-next',
  slidePrevClass: 'swiper-slide-prev',
  slideDuplicatePrevClass: 'swiper-slide-duplicate-prev',
  wrapperClass: 'swiper-wrapper',
  slideThumbsClass: 'swiper-slide-thumb',
  // Callbacks
  runCallbacksOnInit: true,
  // Internals
  _emitClasses: false,
  willChange: false
};
exports.default = _default;

/***/ }),

/***/ 566:
/*!*******************************************************************************!*\
  !*** D:/project/前端/front/front/components/zebra-swiper/libs/classes/index.js ***!
  \*******************************************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


var _interopRequireDefault = __webpack_require__(/*! @babel/runtime/helpers/interopRequireDefault */ 3);
Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;
var _addClasses = _interopRequireDefault(__webpack_require__(/*! ./addClasses.js */ 567));
var _removeClasses = _interopRequireDefault(__webpack_require__(/*! ./removeClasses.js */ 568));
var _default = {
  addClasses: _addClasses.default,
  removeClasses: _removeClasses.default
};
exports.default = _default;

/***/ }),

/***/ 567:
/*!************************************************************************************!*\
  !*** D:/project/前端/front/front/components/zebra-swiper/libs/classes/addClasses.js ***!
  \************************************************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


var _interopRequireDefault = __webpack_require__(/*! @babel/runtime/helpers/interopRequireDefault */ 3);
Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = addClasses;
var _toConsumableArray2 = _interopRequireDefault(__webpack_require__(/*! @babel/runtime/helpers/toConsumableArray */ 17));
var _typeof2 = _interopRequireDefault(__webpack_require__(/*! @babel/runtime/helpers/typeof */ 12));
function prepareClasses(entries, prefix) {
  var resultClasses = [];
  entries.forEach(function (item) {
    if ((0, _typeof2.default)(item) === 'object') {
      Object.keys(item).forEach(function (classNames) {
        if (item[classNames]) {
          resultClasses.push(prefix + classNames);
        }
      });
    } else if (typeof item === 'string') {
      resultClasses.push(prefix + item);
    }
  });
  return resultClasses;
}
function addClasses() {
  var swiper = this;
  var classNames = swiper.classNames,
    params = swiper.params,
    rtl = swiper.rtl,
    $el = swiper.$el,
    device = swiper.device,
    support = swiper.support; // prettier-ignore

  var suffixes = prepareClasses(['initialized', params.direction, {
    'pointer-events': !support.touch
  }, {
    'free-mode': swiper.params.freeMode && params.freeMode.enabled
  }, {
    'autoheight': params.autoHeight
  }, {
    'rtl': rtl
  }, {
    'grid': params.grid && params.grid.rows > 1
  }, {
    'grid-column': params.grid && params.grid.rows > 1 && params.grid.fill === 'column'
  }, {
    'android': device.android
  }, {
    'ios': device.ios
  }, {
    'css-mode': params.cssMode
  }, {
    'centered': params.cssMode && params.centeredSlides
  }], params.containerModifierClass);
  classNames.push.apply(classNames, (0, _toConsumableArray2.default)(suffixes));
  $el.addClass((0, _toConsumableArray2.default)(classNames).join(' '));
  swiper.emitContainerClasses();
}

/***/ }),

/***/ 568:
/*!***************************************************************************************!*\
  !*** D:/project/前端/front/front/components/zebra-swiper/libs/classes/removeClasses.js ***!
  \***************************************************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = removeClasses;
function removeClasses() {
  var swiper = this;
  var $el = swiper.$el,
    classNames = swiper.classNames;
  $el.removeClass(classNames.join(' '));
  swiper.emitContainerClasses();
}

/***/ }),

/***/ 569:
/*!**************************************************************************************!*\
  !*** D:/project/前端/front/front/components/zebra-swiper/libs/check-overflow/index.js ***!
  \**************************************************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;
function checkOverflow() {
  var swiper = this;
  var wasLocked = swiper.isLocked,
    params = swiper.params;
  var slidesOffsetBefore = params.slidesOffsetBefore;
  if (slidesOffsetBefore) {
    var lastSlideIndex = swiper.slides.length - 1;
    var lastSlideRightEdge = swiper.slidesGrid[lastSlideIndex] + swiper.slidesSizesGrid[lastSlideIndex] + slidesOffsetBefore * 2;
    swiper.isLocked = swiper.size > lastSlideRightEdge;
  } else {
    swiper.isLocked = swiper.snapGrid.length === 1;
  }
  if (params.allowSlideNext === true) {
    swiper.allowSlideNext = !swiper.isLocked;
  }
  if (params.allowSlidePrev === true) {
    swiper.allowSlidePrev = !swiper.isLocked;
  }
  if (wasLocked && wasLocked !== swiper.isLocked) {
    swiper.isEnd = false;
  }
  if (wasLocked !== swiper.isLocked) {
    swiper.emit(swiper.isLocked ? 'lock' : 'unlock');
  }
}
var _default = {
  checkOverflow: checkOverflow
};
exports.default = _default;

/***/ }),

/***/ 570:
/*!*****************************************************************************!*\
  !*** D:/project/前端/front/front/components/zebra-swiper/libs/slide/index.js ***!
  \*****************************************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


var _interopRequireDefault = __webpack_require__(/*! @babel/runtime/helpers/interopRequireDefault */ 3);
Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;
var _slideTo = _interopRequireDefault(__webpack_require__(/*! ./slideTo.js */ 571));
var _slideToLoop = _interopRequireDefault(__webpack_require__(/*! ./slideToLoop.js */ 572));
var _slideNext = _interopRequireDefault(__webpack_require__(/*! ./slideNext.js */ 573));
var _slidePrev = _interopRequireDefault(__webpack_require__(/*! ./slidePrev.js */ 574));
var _slideReset = _interopRequireDefault(__webpack_require__(/*! ./slideReset.js */ 575));
var _slideToClosest = _interopRequireDefault(__webpack_require__(/*! ./slideToClosest.js */ 576));
var _slideToClickedSlide = _interopRequireDefault(__webpack_require__(/*! ./slideToClickedSlide.js */ 577));
var _default = {
  slideTo: _slideTo.default,
  slideToLoop: _slideToLoop.default,
  slideNext: _slideNext.default,
  slidePrev: _slidePrev.default,
  slideReset: _slideReset.default,
  slideToClosest: _slideToClosest.default,
  slideToClickedSlide: _slideToClickedSlide.default
};
exports.default = _default;

/***/ }),

/***/ 571:
/*!*******************************************************************************!*\
  !*** D:/project/前端/front/front/components/zebra-swiper/libs/slide/slideTo.js ***!
  \*******************************************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


var _interopRequireDefault = __webpack_require__(/*! @babel/runtime/helpers/interopRequireDefault */ 3);
Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = slideTo;
var _defineProperty2 = _interopRequireDefault(__webpack_require__(/*! @babel/runtime/helpers/defineProperty */ 10));
var _typeof2 = _interopRequireDefault(__webpack_require__(/*! @babel/runtime/helpers/typeof */ 12));
var _utils = __webpack_require__(/*! ../../shared/utils.js */ 538);
function slideTo() {
  var index = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : 0;
  var speed = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : this.params.speed;
  var runCallbacks = arguments.length > 2 && arguments[2] !== undefined ? arguments[2] : true;
  var internal = arguments.length > 3 ? arguments[3] : undefined;
  var initial = arguments.length > 4 ? arguments[4] : undefined;
  if (typeof index !== 'number' && typeof index !== 'string') {
    throw new Error("The 'index' argument cannot have type other than 'number' or 'string'. [".concat((0, _typeof2.default)(index), "] given."));
  }
  if (typeof index === 'string') {
    /**
     * The `index` argument converted from `string` to `number`.
     * @type {number}
     */
    var indexAsNumber = parseInt(index, 10);
    /**
     * Determines whether the `index` argument is a valid `number`
     * after being converted from the `string` type.
     * @type {boolean}
     */

    var isValidNumber = isFinite(indexAsNumber);
    if (!isValidNumber) {
      throw new Error("The passed-in 'index' (string) couldn't be converted to 'number'. [".concat(index, "] given."));
    } // Knowing that the converted `index` is a valid number,
    // we can update the original argument's value.

    index = indexAsNumber;
  }
  var swiper = this;
  var slideIndex = index;
  var timer;
  if (slideIndex < 0) slideIndex = 0;
  var params = swiper.params,
    snapGrid = swiper.snapGrid,
    slidesGrid = swiper.slidesGrid,
    previousIndex = swiper.previousIndex,
    activeIndex = swiper.activeIndex,
    rtl = swiper.rtlTranslate,
    wrapperEl = swiper.wrapperEl,
    enabled = swiper.enabled;
  if (swiper.animating && params.preventInteractionOnTransition || !enabled && !internal && !initial) {
    return false;
  }
  var skip = Math.min(swiper.params.slidesPerGroupSkip, slideIndex);
  var snapIndex = skip + Math.floor((slideIndex - skip) / swiper.params.slidesPerGroup);
  if (snapIndex >= snapGrid.length) snapIndex = snapGrid.length - 1;
  if ((activeIndex || params.initialSlide || 0) === (previousIndex || 0) && runCallbacks) {
    swiper.emit('beforeSlideChangeStart');
  }
  var translate = -snapGrid[snapIndex]; // Update progress

  swiper.updateProgress(translate); // Normalize slideIndex

  if (params.normalizeSlideIndex) {
    for (var i = 0; i < slidesGrid.length; i += 1) {
      var normalizedTranslate = -Math.floor(translate * 100);
      var normalizedGrid = Math.floor(slidesGrid[i] * 100);
      var normalizedGridNext = Math.floor(slidesGrid[i + 1] * 100);
      if (typeof slidesGrid[i + 1] !== 'undefined') {
        if (normalizedTranslate >= normalizedGrid && normalizedTranslate < normalizedGridNext - (normalizedGridNext - normalizedGrid) / 2) {
          slideIndex = i;
        } else if (normalizedTranslate >= normalizedGrid && normalizedTranslate < normalizedGridNext) {
          slideIndex = i + 1;
        }
      } else if (normalizedTranslate >= normalizedGrid) {
        slideIndex = i;
      }
    }
  } // Directions locks

  if (swiper.initialized && slideIndex !== activeIndex) {
    if (!swiper.allowSlideNext && translate < swiper.translate && translate < swiper.minTranslate()) {
      return false;
    }
    if (!swiper.allowSlidePrev && translate > swiper.translate && translate > swiper.maxTranslate()) {
      if ((activeIndex || 0) !== slideIndex) return false;
    }
  }
  var direction;
  if (slideIndex > activeIndex) direction = 'next';else if (slideIndex < activeIndex) direction = 'prev';else direction = 'reset'; // Update Index

  if (rtl && -translate === swiper.translate || !rtl && translate === swiper.translate) {
    swiper.updateActiveIndex(slideIndex); // Update Height

    if (params.autoHeight) {
      setTimeout(function () {
        swiper.updateAutoHeight();
      }, 0);
    }
    swiper.updateSlidesClasses();
    if (params.effect !== 'slide') {
      swiper.setTranslate(translate);
    }
    if (direction !== 'reset') {
      swiper.transitionStart(runCallbacks, direction);
      swiper.transitionEnd(runCallbacks, direction);
    }
    return false;
  }
  if (params.cssMode) {
    var isH = swiper.isHorizontal();
    var t = rtl ? translate : -translate;
    if (speed === 0) {
      var isVirtual = swiper.virtual && swiper.params.virtual.enabled;
      if (isVirtual) {
        swiper.wrapperEl.style.scrollSnapType = 'none';
        swiper._immediateVirtual = true;
      }
      wrapperEl[isH ? 'scrollLeft' : 'scrollTop'] = t;
      if (isVirtual) {
        requestAnimationFrame(function () {
          swiper.wrapperEl.style.scrollSnapType = '';
          swiper._swiperImmediateVirtual = false;
        });
      }
    } else {
      var _wrapperEl$scrollTo;
      if (!swiper.support.smoothScroll) {
        (0, _utils.animateCSSModeScroll)({
          swiper: swiper,
          targetPosition: t,
          side: isH ? 'left' : 'top'
        });
        return true;
      }
      wrapperEl.scrollTo((_wrapperEl$scrollTo = {}, (0, _defineProperty2.default)(_wrapperEl$scrollTo, isH ? 'left' : 'top', t), (0, _defineProperty2.default)(_wrapperEl$scrollTo, "behavior", 'smooth'), _wrapperEl$scrollTo));
    }
    return true;
  }
  swiper.setTransition(speed);
  swiper.setTranslate(translate);
  swiper.updateActiveIndex(slideIndex);
  swiper.updateSlidesClasses();
  swiper.emit('beforeTransitionStart', speed, internal);
  swiper.transitionStart(runCallbacks, direction);
  if (speed === 0) {
    swiper.transitionEnd(runCallbacks, direction);
  } else if (!swiper.animating) {
    swiper.animating = true;
    if (!swiper.onSlideToWrapperTransitionEnd) {
      swiper.onSlideToWrapperTransitionEnd = function transitionEnd(e) {
        if (!swiper || swiper.destroyed) return;
        clearTimeout(timer);
        swiper.onSlideToWrapperTransitionEnd = null;
        delete swiper.onSlideToWrapperTransitionEnd;
        swiper.transitionEnd(runCallbacks, direction);
      };
    }
    timer = setTimeout(function () {
      if (swiper.onSlideToWrapperTransitionEnd) {
        swiper.onSlideToWrapperTransitionEnd();
      }
    }, speed);
  }
  return true;
}

/***/ }),

/***/ 572:
/*!***********************************************************************************!*\
  !*** D:/project/前端/front/front/components/zebra-swiper/libs/slide/slideToLoop.js ***!
  \***********************************************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = slideToLoop;
function slideToLoop() {
  var index = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : 0;
  var speed = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : this.params.speed;
  var runCallbacks = arguments.length > 2 && arguments[2] !== undefined ? arguments[2] : true;
  var internal = arguments.length > 3 ? arguments[3] : undefined;
  var swiper = this;
  var newIndex = index;
  if (swiper.params.loop) {
    newIndex += swiper.loopedSlides;
  }
  return swiper.slideTo(newIndex, speed, runCallbacks, internal);
}

/***/ }),

/***/ 573:
/*!*********************************************************************************!*\
  !*** D:/project/前端/front/front/components/zebra-swiper/libs/slide/slideNext.js ***!
  \*********************************************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = slideNext;
function slideNext() {
  var speed = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : this.params.speed;
  var runCallbacks = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : true;
  var internal = arguments.length > 2 ? arguments[2] : undefined;
  var swiper = this;
  var animating = swiper.animating,
    enabled = swiper.enabled,
    params = swiper.params;
  if (!enabled) return swiper;
  var perGroup = params.slidesPerGroup;
  if (params.slidesPerView === 'auto' && params.slidesPerGroup === 1 && params.slidesPerGroupAuto) {
    perGroup = Math.max(swiper.slidesPerViewDynamic('current', true), 1);
  }
  var increment = swiper.activeIndex < params.slidesPerGroupSkip ? 1 : perGroup;
  if (params.loop) {
    if (animating && params.loopPreventsSlide) return false;
    swiper.loopFix();
  }
  if (params.rewind && swiper.isEnd) {
    return swiper.slideTo(0, speed, runCallbacks, internal);
  }
  setTimeout(function () {
    swiper.slideTo(swiper.activeIndex + increment, speed, runCallbacks, internal);
  }, 30);
  return true;
}

/***/ }),

/***/ 574:
/*!*********************************************************************************!*\
  !*** D:/project/前端/front/front/components/zebra-swiper/libs/slide/slidePrev.js ***!
  \*********************************************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = slidePrev;
function slidePrev() {
  var speed = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : this.params.speed;
  var runCallbacks = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : true;
  var internal = arguments.length > 2 ? arguments[2] : undefined;
  var swiper = this;
  var params = swiper.params,
    animating = swiper.animating,
    snapGrid = swiper.snapGrid,
    slidesGrid = swiper.slidesGrid,
    rtlTranslate = swiper.rtlTranslate,
    enabled = swiper.enabled;
  if (!enabled) return swiper;
  if (params.loop) {
    if (animating && params.loopPreventsSlide) return false;
    swiper.loopFix();
  }
  var translate = rtlTranslate ? swiper.translate : -swiper.translate;
  function normalize(val) {
    if (val < 0) return -Math.floor(Math.abs(val));
    return Math.floor(val);
  }
  var normalizedTranslate = normalize(translate);
  var normalizedSnapGrid = snapGrid.map(function (val) {
    return normalize(val);
  });
  var prevSnap = snapGrid[normalizedSnapGrid.indexOf(normalizedTranslate) - 1];
  if (typeof prevSnap === 'undefined' && params.cssMode) {
    var prevSnapIndex;
    snapGrid.forEach(function (snap, snapIndex) {
      if (normalizedTranslate >= snap) {
        prevSnapIndex = snapIndex;
      }
    });
    if (typeof prevSnapIndex !== 'undefined') {
      prevSnap = snapGrid[prevSnapIndex > 0 ? prevSnapIndex - 1 : prevSnapIndex];
    }
  }
  var prevIndex = 0;
  if (typeof prevSnap !== 'undefined') {
    prevIndex = slidesGrid.indexOf(prevSnap);
    if (prevIndex < 0) prevIndex = swiper.activeIndex - 1;
    if (params.slidesPerView === 'auto' && params.slidesPerGroup === 1 && params.slidesPerGroupAuto) {
      prevIndex = prevIndex - swiper.slidesPerViewDynamic('previous', true) + 1;
      prevIndex = Math.max(prevIndex, 0);
    }
  }
  if (params.rewind && swiper.isBeginning) {
    return swiper.slideTo(swiper.slides.length - 1, speed, runCallbacks, internal);
  }
  setTimeout(function () {
    swiper.slideTo(prevIndex, speed, runCallbacks, internal);
  }, 30);
  return true;
}

/***/ }),

/***/ 575:
/*!**********************************************************************************!*\
  !*** D:/project/前端/front/front/components/zebra-swiper/libs/slide/slideReset.js ***!
  \**********************************************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = slideReset;
function slideReset() {
  var speed = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : this.params.speed;
  var runCallbacks = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : true;
  var internal = arguments.length > 2 ? arguments[2] : undefined;
  var swiper = this;
  return swiper.slideTo(swiper.activeIndex, speed, runCallbacks, internal);
}

/***/ }),

/***/ 576:
/*!**************************************************************************************!*\
  !*** D:/project/前端/front/front/components/zebra-swiper/libs/slide/slideToClosest.js ***!
  \**************************************************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = slideToClosest;
/* eslint no-unused-vars: "off" */
function slideToClosest() {
  var speed = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : this.params.speed;
  var runCallbacks = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : true;
  var internal = arguments.length > 2 ? arguments[2] : undefined;
  var threshold = arguments.length > 3 && arguments[3] !== undefined ? arguments[3] : 0.5;
  var swiper = this;
  var index = swiper.activeIndex;
  var skip = Math.min(swiper.params.slidesPerGroupSkip, index);
  var snapIndex = skip + Math.floor((index - skip) / swiper.params.slidesPerGroup);
  var translate = swiper.rtlTranslate ? swiper.translate : -swiper.translate;
  if (translate >= swiper.snapGrid[snapIndex]) {
    var currentSnap = swiper.snapGrid[snapIndex];
    var nextSnap = swiper.snapGrid[snapIndex + 1];
    if (translate - currentSnap > (nextSnap - currentSnap) * threshold) {
      index += swiper.params.slidesPerGroup;
    }
  } else {
    var prevSnap = swiper.snapGrid[snapIndex - 1];
    var _currentSnap = swiper.snapGrid[snapIndex];
    if (translate - prevSnap <= (_currentSnap - prevSnap) * threshold) {
      index -= swiper.params.slidesPerGroup;
    }
  }
  index = Math.max(index, 0);
  index = Math.min(index, swiper.slidesGrid.length - 1);
  return swiper.slideTo(index, speed, runCallbacks, internal);
}

/***/ }),

/***/ 577:
/*!*******************************************************************************************!*\
  !*** D:/project/前端/front/front/components/zebra-swiper/libs/slide/slideToClickedSlide.js ***!
  \*******************************************************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = slideToClickedSlide;
var _utils = __webpack_require__(/*! ../../shared/utils.js */ 538);
function slideToClickedSlide() {
  var swiper = this;
  var params = swiper.params,
    $wrapperEl = swiper.$wrapperEl;
  var slidesPerView = params.slidesPerView === 'auto' ? swiper.slidesPerViewDynamic() : params.slidesPerView;
  var slideToIndex = swiper.clickedIndex;
  var realIndex;
  if (params.loop) {
    if (swiper.animating) return;
    // realIndex = parseInt($(swiper.clickedSlide).attr('data-swiper-slide-index'), 10);
    realIndex = parseInt(swiper.activeIndex, 10);
    if (params.centeredSlides) {
      if (slideToIndex < swiper.loopedSlides - slidesPerView / 2 || slideToIndex > swiper.slides.length - swiper.loopedSlides + slidesPerView / 2) {
        swiper.loopFix();
        slideToIndex = $wrapperEl.children(".".concat(params.slideClass, "[data-swiper-slide-index=\"").concat(realIndex, "\"]:not(.").concat(params.slideDuplicateClass, ")")).eq(0).index();
        (0, _utils.nextTick)(function () {
          swiper.slideTo(slideToIndex);
        });
      } else {
        swiper.slideTo(slideToIndex);
      }
    } else if (slideToIndex > swiper.slides.length - slidesPerView) {
      swiper.loopFix();
      slideToIndex = $wrapperEl.children(".".concat(params.slideClass, "[data-swiper-slide-index=\"").concat(realIndex, "\"]:not(.").concat(params.slideDuplicateClass, ")")).eq(0).index();
      (0, _utils.nextTick)(function () {
        swiper.slideTo(slideToIndex);
      });
    } else {
      swiper.slideTo(slideToIndex);
    }
  } else {
    swiper.slideTo(slideToIndex);
  }
}

/***/ }),

/***/ 578:
/*!****************************************************************************!*\
  !*** D:/project/前端/front/front/components/zebra-swiper/libs/loop/index.js ***!
  \****************************************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


var _interopRequireDefault = __webpack_require__(/*! @babel/runtime/helpers/interopRequireDefault */ 3);
Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;
var _loopCreate = _interopRequireDefault(__webpack_require__(/*! ./loopCreate.js */ 579));
var _loopFix = _interopRequireDefault(__webpack_require__(/*! ./loopFix.js */ 580));
var _loopDestroy = _interopRequireDefault(__webpack_require__(/*! ./loopDestroy.js */ 581));
var _default = {
  loopCreate: _loopCreate.default,
  loopFix: _loopFix.default,
  loopDestroy: _loopDestroy.default
};
exports.default = _default;

/***/ }),

/***/ 579:
/*!*********************************************************************************!*\
  !*** D:/project/前端/front/front/components/zebra-swiper/libs/loop/loopCreate.js ***!
  \*********************************************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


var _interopRequireDefault = __webpack_require__(/*! @babel/runtime/helpers/interopRequireDefault */ 3);
Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = loopCreate;
var _toConsumableArray2 = _interopRequireDefault(__webpack_require__(/*! @babel/runtime/helpers/toConsumableArray */ 17));
function loopCreate() {
  var swiper = this;
  var params = swiper.params,
    $wrapperEl = swiper.$wrapperEl,
    native = swiper.native; // Remove duplicated slides
  var $selector = $wrapperEl;
  var slides = native.children;
  if (params.loopFillGroupWithBlank) {
    var blankSlidesNum = params.slidesPerGroup - slides.length % params.slidesPerGroup;
    if (blankSlidesNum !== params.slidesPerGroup) {
      native.loopBlankShow = true;
      native.loopBlankNumber = blankSlidesNum;
    }
  }
  if (params.slidesPerView === 'auto' && !params.loopedSlides) params.loopedSlides = slides.length;
  swiper.loopedSlides = Math.ceil(parseFloat(params.loopedSlides || params.slidesPerView, 10));
  swiper.loopedSlides += params.loopAdditionalSlides;
  if (swiper.loopedSlides > slides.length) {
    swiper.loopedSlides = slides.length;
  }
  var prependSlides = [];
  var appendSlides = [];
  slides.forEach(function (el, index) {
    var slide = el;
    if (index < slides.length && index >= slides.length - swiper.loopedSlides) {
      prependSlides.push(el);
    }
    if (index < swiper.loopedSlides) {
      appendSlides.push(el);
    }
  });
  var list = (0, _toConsumableArray2.default)(swiper.native.value);
  var newList = (0, _toConsumableArray2.default)(list);
  swiper.originalDataList = (0, _toConsumableArray2.default)(swiper.native.value);
  for (var i = 0; i < appendSlides.length; i += 1) {
    newList.push(list[appendSlides[i].index]);
  }
  for (var _i = prependSlides.length - 1; _i >= 0; _i -= 1) {
    newList.unshift(list[prependSlides[_i].index]);
  }
  swiper.native.$emit("input", newList);
  return true;
}

/***/ }),

/***/ 580:
/*!******************************************************************************!*\
  !*** D:/project/前端/front/front/components/zebra-swiper/libs/loop/loopFix.js ***!
  \******************************************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = loopFix;
function loopFix() {
  var swiper = this;
  swiper.emit('beforeLoopFix');
  var activeIndex = swiper.activeIndex,
    slides = swiper.slides,
    loopedSlides = swiper.loopedSlides,
    allowSlidePrev = swiper.allowSlidePrev,
    allowSlideNext = swiper.allowSlideNext,
    snapGrid = swiper.snapGrid,
    rtl = swiper.rtlTranslate;
  var newIndex;
  swiper.allowSlidePrev = true;
  swiper.allowSlideNext = true;
  var snapTranslate = -snapGrid[activeIndex];
  var diff = snapTranslate - swiper.getTranslate();
  if (activeIndex < loopedSlides) {
    newIndex = slides.length - loopedSlides * 3 + activeIndex;
    newIndex += loopedSlides;
    var slideChanged = swiper.slideTo(newIndex, 0, false, true);
    if (slideChanged && diff !== 0) {
      swiper.setTranslate((rtl ? -swiper.translate : swiper.translate) - diff);
    }
  } else if (activeIndex >= slides.length - loopedSlides) {
    newIndex = -slides.length + activeIndex + loopedSlides;
    newIndex += loopedSlides;
    var _slideChanged = swiper.slideTo(newIndex, 0, false, true);
    if (_slideChanged && diff !== 0) {
      swiper.setTranslate((rtl ? -swiper.translate : swiper.translate) - diff);
    }
  }
  swiper.allowSlidePrev = allowSlidePrev;
  swiper.allowSlideNext = allowSlideNext;
  swiper.emit('loopFix');
}

/***/ }),

/***/ 581:
/*!**********************************************************************************!*\
  !*** D:/project/前端/front/front/components/zebra-swiper/libs/loop/loopDestroy.js ***!
  \**********************************************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = loopDestroy;
function loopDestroy() {
  var swiper = this;
  var $wrapperEl = swiper.$wrapperEl,
    params = swiper.params,
    slides = swiper.slides;
}

/***/ }),

/***/ 582:
/*!***********************************************************************************!*\
  !*** D:/project/前端/front/front/components/zebra-swiper/libs/grab-cursor/index.js ***!
  \***********************************************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


var _interopRequireDefault = __webpack_require__(/*! @babel/runtime/helpers/interopRequireDefault */ 3);
Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;
var _setGrabCursor = _interopRequireDefault(__webpack_require__(/*! ./setGrabCursor.js */ 583));
var _unsetGrabCursor = _interopRequireDefault(__webpack_require__(/*! ./unsetGrabCursor.js */ 584));
var _default = {
  setGrabCursor: _setGrabCursor.default,
  unsetGrabCursor: _unsetGrabCursor.default
};
exports.default = _default;

/***/ }),

/***/ 583:
/*!*******************************************************************************************!*\
  !*** D:/project/前端/front/front/components/zebra-swiper/libs/grab-cursor/setGrabCursor.js ***!
  \*******************************************************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


var _interopRequireDefault = __webpack_require__(/*! @babel/runtime/helpers/interopRequireDefault */ 3);
Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = setGrabCursor;
var _defineProperty2 = _interopRequireDefault(__webpack_require__(/*! @babel/runtime/helpers/defineProperty */ 10));
function setGrabCursor(moving) {
  var _el$setCss;
  var swiper = this;
  if (swiper.support.touch || !swiper.params.simulateTouch || swiper.params.watchOverflow && swiper.isLocked || swiper.params.cssMode) return;
  var el = swiper.params.touchEventsTarget === 'container' ? swiper.$el : swiper.$wrapperEl;
  el.setCss((_el$setCss = {
    cursor: 'move'
  }, (0, _defineProperty2.default)(_el$setCss, "cursor", moving ? '-webkit-grabbing' : '-webkit-grab'), (0, _defineProperty2.default)(_el$setCss, "cursor", moving ? '-moz-grabbin' : '-moz-grab'), (0, _defineProperty2.default)(_el$setCss, "cursor", moving ? 'grabbing' : 'grab'), _el$setCss));
}

/***/ }),

/***/ 584:
/*!*********************************************************************************************!*\
  !*** D:/project/前端/front/front/components/zebra-swiper/libs/grab-cursor/unsetGrabCursor.js ***!
  \*********************************************************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = unsetGrabCursor;
function unsetGrabCursor() {
  var swiper = this;
  if (swiper.support.touch || swiper.params.watchOverflow && swiper.isLocked || swiper.params.cssMode) {
    return;
  }
  swiper[swiper.params.touchEventsTarget === 'container' ? '$el' : '$wrapperEl'].setCss({
    cursor: ''
  });
}

/***/ }),

/***/ 585:
/*!******************************************************************************!*\
  !*** D:/project/前端/front/front/components/zebra-swiper/libs/events/index.js ***!
  \******************************************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


var _interopRequireDefault = __webpack_require__(/*! @babel/runtime/helpers/interopRequireDefault */ 3);
Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;
var _onTouchStart = _interopRequireDefault(__webpack_require__(/*! ./onTouchStart.js */ 586));
var _onTouchMove = _interopRequireDefault(__webpack_require__(/*! ./onTouchMove.js */ 587));
var _onTouchEnd = _interopRequireDefault(__webpack_require__(/*! ./onTouchEnd.js */ 588));
var _onResize = _interopRequireDefault(__webpack_require__(/*! ./onResize.js */ 589));
var _onClick = _interopRequireDefault(__webpack_require__(/*! ./onClick.js */ 590));
var _onScroll = _interopRequireDefault(__webpack_require__(/*! ./onScroll.js */ 591));
var dummyEventAttached = false;
function dummyEventListener() {}
var events = function events(swiper, method) {
  var params = swiper.params,
    touchEvents = swiper.touchEvents,
    wrapperEl = swiper.wrapperEl,
    device = swiper.device,
    support = swiper.support;
  var el = swiper.native;
  var capture = !!params.nested;
  var domMethod = method === 'on' ? 'on' : 'off';
  var swiperMethod = method;
  // Object.keys(swiper.eventsListeners).forEach((item) => {
  // 	if (method == 'off') {
  // 		swiper.native.off(item)
  // 	}
  // })
  if (!support.touch) {
    var desktopMethod = method === 'on' ? 'addEventListener' : 'removeEventListener';
    // el[domMethod](touchEvents.start, swiper.onTouchStart, false);
    if (document.querySelector("#".concat(swiper.$el.swiperElId))) {
      document.querySelector("#".concat(swiper.$el.swiperElId))[desktopMethod](touchEvents.start, swiper.onTouchStart, false);
    }
    document[desktopMethod](touchEvents.move, swiper.onTouchMove, capture);
    document[desktopMethod](touchEvents.end, swiper.onTouchEnd, false);
  } else {
    var passiveListener = touchEvents.start === 'touchstart' && support.passiveListener && params.passiveListeners ? {
      passive: true,
      capture: false
    } : false;

    // el[domMethod](touchEvents.start, swiper.onTouchStart, passiveListener);
    // el[domMethod](touchEvents.move, swiper.onTouchMove, support.passiveListener ? {
    // 	passive: false,
    // 	capture
    // } : capture);
    // el[domMethod](touchEvents.end, swiper.onTouchEnd, passiveListener);

    if (touchEvents.cancel) {

      // el[domMethod](touchEvents.cancel, swiper.onTouchEnd, passiveListener);
    }
  }
  if (params.preventClicks || params.preventClicksPropagation) {

    // el[domMethod]('click', swiper.onClick, true);
  }
  if (params.cssMode) {
    // wrapperEl[domMethod]('scroll', swiper.onScroll);
  }
  if (params.updateOnWindowResize) {
    // swiper[swiperMethod](device.ios || device.android ? 'resize orientationchange observerUpdate' :
    // 	'resize observerUpdate', onResize, true);
  } else {
    // swiper[swiperMethod]('observerUpdate', onResize, true);
  }
};
function attachEvents() {
  var swiper = this;
  var params = swiper.params,
    support = swiper.support;
  swiper.onTouchStart = _onTouchStart.default.bind(swiper);
  swiper.onTouchMove = _onTouchMove.default.bind(swiper);
  swiper.onTouchEnd = _onTouchEnd.default.bind(swiper);
  if (params.cssMode) {
    swiper.onScroll = _onScroll.default.bind(swiper);
  }
  swiper.onClick = _onClick.default.bind(swiper);
  events(swiper, 'on');
}
function detachEvents() {
  var swiper = this;
  events(swiper, 'off');
}
var _default = {
  attachEvents: attachEvents,
  detachEvents: detachEvents
};
exports.default = _default;

/***/ }),

/***/ 586:
/*!*************************************************************************************!*\
  !*** D:/project/前端/front/front/components/zebra-swiper/libs/events/onTouchStart.js ***!
  \*************************************************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = onTouchStart;
var _utils = __webpack_require__(/*! ../../shared/utils.js */ 538);
function onTouchStart(event) {
  var swiper = this;
  var data = swiper.touchEventsData;
  var params = swiper.params,
    touches = swiper.touches,
    enabled = swiper.enabled;
  if (!enabled) return;
  if (swiper.animating && params.preventInteractionOnTransition) {
    return;
  }
  if (!swiper.animating && params.cssMode && params.loop) {
    swiper.loopFix();
  }
  var e = event;
  if (e.originalEvent) e = e.originalEvent;
  data.isTouchEvent = e.type === 'touchstart' || e.type === 'touchStart' || e.type === 'onTouchstart';
  if (!data.isTouchEvent && 'which' in e && e.which === 3) return;
  if (!data.isTouchEvent && 'button' in e && e.button > 0) return;
  if (data.isTouched && data.isMoved) return; // change target el for shadow root component

  var swipingClassHasValue = !!params.noSwipingClass && params.noSwipingClass !== '';
  var noSwipingSelector = params.noSwipingSelector ? params.noSwipingSelector : ".".concat(params.noSwipingClass);
  var isTargetShadow = !!(e.target && e.target.shadowRoot);
  if (params.noSwiping) {
    swiper.allowClick = true;
    return;
  }
  if (params.swipeHandler) {
    if (!$targetEl.closest(params.swipeHandler)[0]) return;
  }
  touches.currentX = e.type === 'touchstart' || e.type === 'touchStart' || e.type === 'onTouchstart' ? e.touches[0].pageX : e.pageX;
  touches.currentY = e.type === 'touchstart' || e.type === 'touchStart' || e.type === 'onTouchstart' ? e.touches[0].pageY : e.pageY;
  var startX = touches.currentX;
  var startY = touches.currentY;
  var edgeSwipeDetection = params.edgeSwipeDetection || params.iOSEdgeSwipeDetection;
  var edgeSwipeThreshold = params.edgeSwipeThreshold || params.iOSEdgeSwipeThreshold;
  Object.assign(data, {
    isTouched: true,
    isMoved: false,
    allowTouchCallbacks: true,
    isScrolling: undefined,
    startMoving: undefined
  });
  touches.startX = startX;
  touches.startY = startY;
  data.touchStartTime = (0, _utils.now)();
  swiper.allowClick = true;
  swiper.updateSize();
  swiper.swipeDirection = undefined;
  if (params.threshold > 0) data.allowThresholdMove = false;
  // if (e.type !== 'touchstart' && e.type !== 'touchStart') {
  // let preventDefault = true;
  // if ($targetEl.is(data.focusableElements)) preventDefault = false;

  // const shouldPreventDefault = preventDefault && swiper.allowTouchMove && params.touchStartPreventDefault;

  // if ((params.touchStartForcePreventDefault || shouldPreventDefault) && !$targetEl[0].isContentEditable) {
  // e.preventDefault();
  // }
  // }

  swiper.emit('touch-start', e);
}

/***/ }),

/***/ 587:
/*!************************************************************************************!*\
  !*** D:/project/前端/front/front/components/zebra-swiper/libs/events/onTouchMove.js ***!
  \************************************************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = onTouchMove;
var _utils = __webpack_require__(/*! ../../shared/utils.js */ 538);
function onTouchMove(event) {
  var swiper = this;
  var data = swiper.touchEventsData;
  var params = swiper.params,
    touches = swiper.touches,
    rtl = swiper.rtlTranslate,
    enabled = swiper.enabled;
  if (!enabled) return;
  var e = event;
  if (e.originalEvent) e = e.originalEvent;
  if (!data.isTouched) {
    if (data.startMoving && data.isScrolling) {
      swiper.emit('touchMoveOpposite', e);
    }
    return;
  }
  if (data.isTouchEvent && e.type !== 'touchmove' && e.type !== 'touchMove' && e.type !== 'onTouchmove') return;
  var targetTouch = (e.type === 'touchmove' || e.type === 'touchMove' || e.type === 'onTouchmove') && e.touches && (e.touches[0] || e.changedTouches[0]);
  var pageX = e.type === 'touchmove' || e.type === 'touchMove' || e.type === 'onTouchmove' ? targetTouch.pageX : e.pageX;
  var pageY = e.type === 'touchmove' || e.type === 'touchMove' || e.type === 'onTouchmove' ? targetTouch.pageY : e.pageY;
  if (e.preventedByNestedSwiper) {
    touches.startX = pageX;
    touches.startY = pageY;
    return;
  }
  if (!swiper.allowTouchMove) {
    swiper.allowClick = false;
    if (data.isTouched) {
      Object.assign(touches, {
        startX: pageX,
        startY: pageY,
        currentX: pageX,
        currentY: pageY
      });
      data.touchStartTime = (0, _utils.now)();
    }
    return;
  }
  if (data.isTouchEvent && params.touchReleaseOnEdges && !params.loop) {
    if (swiper.isVertical()) {
      if (pageY < touches.startY && swiper.translate <= swiper.maxTranslate() || pageY > touches.startY && swiper.translate >= swiper.minTranslate()) {
        data.isTouched = false;
        data.isMoved = false;
        return;
      }
    } else if (pageX < touches.startX && swiper.translate <= swiper.maxTranslate() || pageX > touches.startX && swiper.translate >= swiper.minTranslate()) {
      return;
    }
  }

  // if (data.isTouchEvent && document.activeElement) {
  //   if (e.target === document.activeElement && $(e.target).is(data.focusableElements)) {
  //     data.isMoved = true;
  //     swiper.allowClick = false;
  //     return;
  //   }
  // }

  if (data.allowTouchCallbacks) {
    swiper.emit('touch-move', e);
  }
  if (e.touches && e.touches.length > 1) return;
  touches.currentX = pageX;
  touches.currentY = pageY;
  var diffX = touches.currentX - touches.startX;
  var diffY = touches.currentY - touches.startY;
  if (swiper.params.threshold && Math.sqrt(Math.pow(diffX, 2) + Math.pow(diffY, 2)) < swiper.params.threshold) return;
  if (typeof data.isScrolling === 'undefined') {
    var touchAngle;
    if (swiper.isHorizontal() && touches.currentY === touches.startY || swiper.isVertical() && touches.currentX === touches.startX) {
      data.isScrolling = false;
    } else {
      if (diffX * diffX + diffY * diffY >= 25) {
        touchAngle = Math.atan2(Math.abs(diffY), Math.abs(diffX)) * 180 / Math.PI;
        data.isScrolling = swiper.isHorizontal() ? touchAngle > params.touchAngle : 90 - touchAngle > params.touchAngle;
      }
    }
  }
  if (data.isScrolling) {
    swiper.emit('touchMoveOpposite', e);
  }
  if (typeof data.startMoving === 'undefined') {
    if (touches.currentX !== touches.startX || touches.currentY !== touches.startY) {
      data.startMoving = true;
    }
  }
  if (data.isScrolling) {
    data.isTouched = false;
    return;
  }
  if (!data.startMoving) {
    return;
  }
  swiper.allowClick = false;
  if (!params.cssMode && e.cancelable) {
    e.preventDefault();
  }
  if (params.touchMoveStopPropagation && !params.nested) {
    e.stopPropagation();
  }
  if (!data.isMoved) {
    if (params.loop && !params.cssMode) {
      swiper.loopFix();
    }
    data.startTranslate = swiper.getTranslate();
    swiper.setTransition(0);
    if (swiper.animating) {
      swiper.$wrapperEl.emit('transitionend', [swiper]);
    }
    data.allowMomentumBounce = false;
    if (params.grabCursor && (swiper.allowSlideNext === true || swiper.allowSlidePrev === true)) {
      swiper.setGrabCursor(true);
    }
    swiper.emit('sliderFirstMove', e);
  }
  swiper.emit('sliderMove', e);
  data.isMoved = true;
  var diff = swiper.isHorizontal() ? diffX : diffY;
  touches.diff = diff;
  diff *= params.touchRatio;
  if (rtl) diff = -diff;
  swiper.swipeDirection = diff > 0 ? 'prev' : 'next';
  data.currentTranslate = diff + data.startTranslate;
  var disableParentSwiper = true;
  var resistanceRatio = params.resistanceRatio;
  if (params.touchReleaseOnEdges) {
    resistanceRatio = 0;
  }
  if (diff > 0 && data.currentTranslate > swiper.minTranslate()) {
    disableParentSwiper = false;
    if (params.resistance) data.currentTranslate = swiper.minTranslate() - 1 + Math.pow(-swiper.minTranslate() + data.startTranslate + diff, resistanceRatio);
  } else if (diff < 0 && data.currentTranslate < swiper.maxTranslate()) {
    disableParentSwiper = false;
    if (params.resistance) data.currentTranslate = swiper.maxTranslate() + 1 - Math.pow(swiper.maxTranslate() - data.startTranslate - diff, resistanceRatio);
  }
  if (disableParentSwiper) {
    e.preventedByNestedSwiper = true;
  }
  if (!swiper.allowSlideNext && swiper.swipeDirection === 'next' && data.currentTranslate < data.startTranslate) {
    data.currentTranslate = data.startTranslate;
  }
  if (!swiper.allowSlidePrev && swiper.swipeDirection === 'prev' && data.currentTranslate > data.startTranslate) {
    data.currentTranslate = data.startTranslate;
  }
  if (!swiper.allowSlidePrev && !swiper.allowSlideNext) {
    data.currentTranslate = data.startTranslate;
  }
  if (params.threshold > 0) {
    if (Math.abs(diff) > params.threshold || data.allowThresholdMove) {
      if (!data.allowThresholdMove) {
        data.allowThresholdMove = true;
        touches.startX = touches.currentX;
        touches.startY = touches.currentY;
        data.currentTranslate = data.startTranslate;
        touches.diff = swiper.isHorizontal() ? touches.currentX - touches.startX : touches.currentY - touches.startY;
        return;
      }
    } else {
      data.currentTranslate = data.startTranslate;
      return;
    }
  }
  if (!params.followFinger || params.cssMode) return;
  if (params.freeMode && params.freeMode.enabled && swiper.freeMode || params.watchSlidesProgress) {
    swiper.updateActiveIndex();
    swiper.updateSlidesClasses();
  }
  if (swiper.params.freeMode && params.freeMode.enabled && swiper.freeMode) {
    swiper.freeMode.onTouchMove();
  }
  swiper.updateProgress(data.currentTranslate);
  swiper.setTranslate(data.currentTranslate);
}

/***/ }),

/***/ 588:
/*!***********************************************************************************!*\
  !*** D:/project/前端/front/front/components/zebra-swiper/libs/events/onTouchEnd.js ***!
  \***********************************************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = onTouchEnd;
var _utils = __webpack_require__(/*! ../../shared/utils.js */ 538);
function onTouchEnd(event) {
  var swiper = this;
  var data = swiper.touchEventsData;
  var params = swiper.params,
    touches = swiper.touches,
    rtl = swiper.rtlTranslate,
    slidesGrid = swiper.slidesGrid,
    enabled = swiper.enabled;
  if (!enabled) return;
  var e = event;
  if (e.originalEvent) e = e.originalEvent;
  if (data.allowTouchCallbacks) {
    swiper.emit('touch-end', e);
  }
  data.allowTouchCallbacks = false;
  if (!data.isTouched) {
    if (data.isMoved && params.grabCursor) {
      swiper.setGrabCursor(false);
    }
    data.isMoved = false;
    data.startMoving = false;
    return;
  }
  if (params.grabCursor && data.isMoved && data.isTouched && (swiper.allowSlideNext === true || swiper.allowSlidePrev === true)) {
    swiper.setGrabCursor(false);
  }
  var touchEndTime = (0, _utils.now)();
  var timeDiff = touchEndTime - data.touchStartTime; // Tap, doubleTap, Click

  if (swiper.allowClick) {
    var pathTree = e.path || e.composedPath && e.composedPath();
    // swiper.updateClickedSlide(pathTree && pathTree[0] || e.target);
    swiper.emit('tap click', e);
    if (timeDiff < 300 && touchEndTime - data.lastClickTime < 300) {
      swiper.emit('doubleTap doubleClick', e);
    }
  }
  data.lastClickTime = (0, _utils.now)();
  (0, _utils.nextTick)(function () {
    if (!swiper.destroyed) swiper.allowClick = true;
  });
  if (!data.isTouched || !data.isMoved || !swiper.swipeDirection || touches.diff === 0 || data.currentTranslate === data.startTranslate) {
    data.isTouched = false;
    data.isMoved = false;
    data.startMoving = false;
    return;
  }
  data.isTouched = false;
  data.isMoved = false;
  data.startMoving = false;
  var currentPos;
  if (params.followFinger) {
    currentPos = rtl ? swiper.translate : -swiper.translate;
  } else {
    currentPos = -data.currentTranslate;
  }
  if (params.cssMode) {
    return;
  }
  if (swiper.params.freeMode && params.freeMode.enabled) {
    swiper.freeMode.onTouchEnd({
      currentPos: currentPos
    });
    return;
  }
  var stopIndex = 0;
  var groupSize = swiper.slidesSizesGrid[0];
  for (var i = 0; i < slidesGrid.length; i += i < params.slidesPerGroupSkip ? 1 : params.slidesPerGroup) {
    var _increment = i < params.slidesPerGroupSkip - 1 ? 1 : params.slidesPerGroup;
    if (typeof slidesGrid[i + _increment] !== 'undefined') {
      if (currentPos >= slidesGrid[i] && currentPos < slidesGrid[i + _increment]) {
        stopIndex = i;
        groupSize = slidesGrid[i + _increment] - slidesGrid[i];
      }
    } else if (currentPos >= slidesGrid[i]) {
      stopIndex = i;
      groupSize = slidesGrid[slidesGrid.length - 1] - slidesGrid[slidesGrid.length - 2];
    }
  }
  var ratio = (currentPos - slidesGrid[stopIndex]) / groupSize;
  var increment = stopIndex < params.slidesPerGroupSkip - 1 ? 1 : params.slidesPerGroup;
  if (timeDiff > params.longSwipesMs) {
    if (!params.longSwipes) {
      swiper.slideTo(swiper.activeIndex);
      return;
    }
    if (swiper.swipeDirection === 'next') {
      if (ratio >= params.longSwipesRatio) swiper.slideTo(stopIndex + increment);else swiper.slideTo(stopIndex);
    }
    if (swiper.swipeDirection === 'prev') {
      if (ratio > 1 - params.longSwipesRatio) swiper.slideTo(stopIndex + increment);else swiper.slideTo(stopIndex);
    }
  } else {
    if (!params.shortSwipes) {
      swiper.slideTo(swiper.activeIndex);
      return;
    }
    var isNavButtonTarget = swiper.navigation && (e.target === swiper.navigation.nextEl || e.target === swiper.navigation.prevEl);
    if (!isNavButtonTarget) {
      if (swiper.swipeDirection === 'next') {
        swiper.slideTo(stopIndex + increment);
      }
      if (swiper.swipeDirection === 'prev') {
        swiper.slideTo(stopIndex);
      }
    } else if (e.target === swiper.navigation.nextEl) {
      swiper.slideTo(stopIndex + increment);
    } else {
      swiper.slideTo(stopIndex);
    }
  }
}

/***/ }),

/***/ 589:
/*!*********************************************************************************!*\
  !*** D:/project/前端/front/front/components/zebra-swiper/libs/events/onResize.js ***!
  \*********************************************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = onResize;
function onResize() {
  var swiper = this;
  var params = swiper.params,
    el = swiper.el;
  if (el && el.offsetWidth === 0) return;
  if (params.breakpoints) {
    swiper.setBreakpoint();
  }
  var allowSlideNext = swiper.allowSlideNext,
    allowSlidePrev = swiper.allowSlidePrev,
    snapGrid = swiper.snapGrid;
  swiper.allowSlideNext = true;
  swiper.allowSlidePrev = true;
  swiper.updateSize();
  swiper.updateSlides();
  swiper.updateSlidesClasses();
  if ((params.slidesPerView === 'auto' || params.slidesPerView > 1) && swiper.isEnd && !swiper.isBeginning && !swiper.params.centeredSlides) {
    swiper.slideTo(swiper.slides.length - 1, 0, false, true);
  } else {
    swiper.slideTo(swiper.activeIndex, 0, false, true);
  }
  if (swiper.autoplay && swiper.autoplay.running && swiper.autoplay.paused) {
    swiper.autoplay.run();
  }
  swiper.allowSlidePrev = allowSlidePrev;
  swiper.allowSlideNext = allowSlideNext;
  if (swiper.params.watchOverflow && snapGrid !== swiper.snapGrid) {
    swiper.checkOverflow();
  }
}

/***/ }),

/***/ 590:
/*!********************************************************************************!*\
  !*** D:/project/前端/front/front/components/zebra-swiper/libs/events/onClick.js ***!
  \********************************************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = onClick;
function onClick(e) {
  var swiper = this;
  if (!swiper.enabled) return;
  if (!swiper.allowClick) {
    if (swiper.params.preventClicks) e.preventDefault();
    if (swiper.params.preventClicksPropagation && swiper.animating) {
      e.stopPropagation();
      e.stopImmediatePropagation();
    }
  }
}

/***/ }),

/***/ 591:
/*!*********************************************************************************!*\
  !*** D:/project/前端/front/front/components/zebra-swiper/libs/events/onScroll.js ***!
  \*********************************************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = onScroll;
function onScroll() {
  var swiper = this;
  var wrapperEl = swiper.wrapperEl,
    rtlTranslate = swiper.rtlTranslate,
    enabled = swiper.enabled;
  if (!enabled) return;
  swiper.previousTranslate = swiper.translate;
  if (swiper.isHorizontal()) {
    swiper.translate = -wrapperEl.scrollLeft;
  } else {
    swiper.translate = -wrapperEl.scrollTop;
  } // eslint-disable-next-line

  if (swiper.translate === -0) swiper.translate = 0;
  swiper.updateActiveIndex();
  swiper.updateSlidesClasses();
  var newProgress;
  var translatesDiff = swiper.maxTranslate() - swiper.minTranslate();
  if (translatesDiff === 0) {
    newProgress = 0;
  } else {
    newProgress = (swiper.translate - swiper.minTranslate()) / translatesDiff;
  }
  if (newProgress !== swiper.progress) {
    swiper.updateProgress(rtlTranslate ? -swiper.translate : swiper.translate);
  }
  swiper.emit('setTranslate', swiper.translate, false);
}

/***/ }),

/***/ 592:
/*!**************************************************************************************!*\
  !*** D:/project/前端/front/front/components/zebra-swiper/modules/autoplay/autoplay.js ***!
  \**************************************************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = Autoplay;
var _utils = __webpack_require__(/*! ../../shared/utils.js */ 538);
function Autoplay(_ref) {
  var swiper = _ref.swiper,
    extendParams = _ref.extendParams,
    on = _ref.on,
    emit = _ref.emit;
  var timeout;
  swiper.autoplay = {
    running: false,
    paused: false
  };
  extendParams({
    autoplay: {
      enabled: false,
      delay: 3000,
      waitForTransition: true,
      disableOnInteraction: true,
      stopOnLastSlide: false,
      reverseDirection: false,
      pauseOnMouseEnter: false
    }
  });
  function run() {
    var $activeSlideEl = swiper.slides[swiper.activeIndex];
    var delay = swiper.params.autoplay.delay;
    clearTimeout(timeout);
    timeout = (0, _utils.nextTick)(function () {
      var autoplayResult;
      if (swiper.params.autoplay.reverseDirection) {
        if (swiper.params.loop) {
          swiper.loopFix();
          autoplayResult = swiper.slidePrev(swiper.params.speed, true, true);
          emit('autoplay');
        } else if (!swiper.isBeginning) {
          autoplayResult = swiper.slidePrev(swiper.params.speed, true, true);
          emit('autoplay');
        } else if (!swiper.params.autoplay.stopOnLastSlide) {
          autoplayResult = swiper.slideTo(swiper.slides.length - 1, swiper.params.speed, true, true);
          emit('autoplay');
        } else {
          stop();
        }
      } else if (swiper.params.loop) {
        swiper.loopFix();
        setTimeout(function () {
          autoplayResult = swiper.slideNext(swiper.params.speed, true, true);
        }, 30);
        emit('autoplay');
      } else if (!swiper.isEnd) {
        autoplayResult = swiper.slideNext(swiper.params.speed, true, true);
        emit('autoplay');
      } else if (!swiper.params.autoplay.stopOnLastSlide) {
        autoplayResult = swiper.slideTo(0, swiper.params.speed, true, true);
        emit('autoplay');
      } else {
        stop();
      }
      if (swiper.params.cssMode && swiper.autoplay.running) run();else if (autoplayResult === false) {
        run();
      }
    }, delay);
  }
  function start() {
    if (typeof timeout !== 'undefined') return false;
    if (swiper.autoplay.running) return false;
    swiper.autoplay.running = true;
    emit('autoplayStart');
    run();
    return true;
  }
  function stop() {
    if (!swiper.autoplay.running) return false;
    if (typeof timeout === 'undefined') return false;
    if (timeout) {
      clearTimeout(timeout);
      timeout = undefined;
    }
    swiper.autoplay.running = false;
    emit('autoplayStop');
    return true;
  }
  function pause(speed) {
    if (!swiper.autoplay.running) return;
    if (swiper.autoplay.paused) return;
    if (timeout) clearTimeout(timeout);
    swiper.autoplay.paused = true;
    if (speed === 0 || !swiper.params.autoplay.waitForTransition) {
      swiper.autoplay.paused = false;
      run();
    } else {
      ['transitionEnd', 'webkitTransitionEnd'].forEach(function (event) {
        swiper.on(event, onTransitionEnd);
      });
    }
  }
  function onVisibilityChange() {
    // const document = getDocument();

    // if (document.visibilityState === 'hidden' && swiper.autoplay.running) {
    // 	pause();
    // }

    // if (document.visibilityState === 'visible' && swiper.autoplay.paused) {
    // 	run();
    // 	swiper.autoplay.paused = false;
    // }
  }
  function onTransitionEnd(e) {
    if (!swiper || swiper.destroyed || !swiper.$wrapperEl) return;
    // if (e.target !== swiper.$wrapperEl[0]) return;
    ['transitionEnd', 'webkitTransitionEnd'].forEach(function (event) {
      swiper.off(event, onTransitionEnd);
    });
    swiper.autoplay.paused = false;
    if (!swiper.autoplay.running) {
      stop();
    } else {
      run();
    }
  }
  function onMouseEnter() {
    if (swiper.params.autoplay.disableOnInteraction) {
      stop();
    } else {
      pause();
    }

    // ['transitionend', 'webkitTransitionEnd'].forEach(event => {
    // 	swiper.$wrapperEl[0].removeEventListener(event, onTransitionEnd);
    // });
  }

  function onMouseLeave() {
    if (swiper.params.autoplay.disableOnInteraction) {
      return;
    }
    swiper.autoplay.paused = false;
    run();
  }
  function attachMouseEvents() {
    if (swiper.params.autoplay.pauseOnMouseEnter) {}
  }
  function detachMouseEvents() {}
  on('init update', function () {
    if (swiper.params.autoplay.enabled) {
      start();
      attachMouseEvents();
    }
  });
  on('beforeTransitionStart', function (_s, speed, internal) {
    if (swiper.autoplay.running) {
      if (internal || !swiper.params.autoplay.disableOnInteraction) {
        swiper.autoplay.pause(speed);
      } else {
        if (!swiper.params.loop) {
          stop();
        }
      }
    }
  });
  on('sliderFirstMove', function () {
    if (swiper.autoplay.running) {
      if (swiper.params.autoplay.disableOnInteraction) {
        stop();
      } else {
        pause();
      }
    }
  });
  on('touch-end', function () {
    if (swiper.params.cssMode && swiper.autoplay.paused && !swiper.params.autoplay.disableOnInteraction) {
      run();
    }
  });
  on('destroy', function () {
    detachMouseEvents();
    if (swiper.autoplay.running) {
      stop();
    }
  });
  Object.assign(swiper.autoplay, {
    pause: pause,
    run: run,
    start: start,
    stop: stop
  });
}

/***/ }),

/***/ 593:
/*!****************************************************************************************!*\
  !*** D:/project/前端/front/front/components/zebra-swiper/modules/free-mode/free-mode.js ***!
  \****************************************************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = freeMode;
var _utils = __webpack_require__(/*! ../../shared/utils.js */ 538);
function freeMode(_ref) {
  var swiper = _ref.swiper,
    extendParams = _ref.extendParams,
    emit = _ref.emit,
    once = _ref.once;
  extendParams({
    freeMode: {
      enabled: false,
      momentum: true,
      momentumRatio: 1,
      momentumBounce: true,
      momentumBounceRatio: 1,
      momentumVelocityRatio: 1,
      sticky: false,
      minimumVelocity: 0.02
    }
  });
  function onTouchMove() {
    var data = swiper.touchEventsData,
      touches = swiper.touches; // Velocity

    if (data.velocities.length === 0) {
      data.velocities.push({
        position: touches[swiper.isHorizontal() ? 'startX' : 'startY'],
        time: data.touchStartTime
      });
    }
    data.velocities.push({
      position: touches[swiper.isHorizontal() ? 'currentX' : 'currentY'],
      time: (0, _utils.now)()
    });
  }
  function onTouchEnd(_ref2) {
    var currentPos = _ref2.currentPos;
    var params = swiper.params,
      $wrapperEl = swiper.$wrapperEl,
      rtl = swiper.rtlTranslate,
      snapGrid = swiper.snapGrid,
      data = swiper.touchEventsData; // Time diff

    var touchEndTime = (0, _utils.now)();
    var timeDiff = touchEndTime - data.touchStartTime;
    if (currentPos < -swiper.minTranslate()) {
      swiper.slideTo(swiper.activeIndex);
      return;
    }
    if (currentPos > -swiper.maxTranslate()) {
      if (swiper.slides.length < snapGrid.length) {
        swiper.slideTo(snapGrid.length - 1);
      } else {
        swiper.slideTo(swiper.slides.length - 1);
      }
      return;
    }
    if (params.freeMode.momentum) {
      if (data.velocities.length > 1) {
        var lastMoveEvent = data.velocities.pop();
        var velocityEvent = data.velocities.pop();
        var distance = lastMoveEvent.position - velocityEvent.position;
        var time = lastMoveEvent.time - velocityEvent.time;
        swiper.velocity = distance / time;
        swiper.velocity /= 2;
        if (Math.abs(swiper.velocity) < params.freeMode.minimumVelocity) {
          swiper.velocity = 0;
        } // this implies that the user stopped moving a finger then released.
        // There would be no events with distance zero, so the last event is stale.

        if (time > 150 || (0, _utils.now)() - lastMoveEvent.time > 300) {
          swiper.velocity = 0;
        }
      } else {
        swiper.velocity = 0;
      }
      swiper.velocity *= params.freeMode.momentumVelocityRatio;
      data.velocities.length = 0;
      var momentumDuration = 1000 * params.freeMode.momentumRatio;
      var momentumDistance = swiper.velocity * momentumDuration;
      var newPosition = swiper.translate + momentumDistance;
      if (rtl) newPosition = -newPosition;
      var doBounce = false;
      var afterBouncePosition;
      var bounceAmount = Math.abs(swiper.velocity) * 20 * params.freeMode.momentumBounceRatio;
      var needsLoopFix;
      if (newPosition < swiper.maxTranslate()) {
        if (params.freeMode.momentumBounce) {
          if (newPosition + swiper.maxTranslate() < -bounceAmount) {
            newPosition = swiper.maxTranslate() - bounceAmount;
          }
          afterBouncePosition = swiper.maxTranslate();
          doBounce = true;
          data.allowMomentumBounce = true;
        } else {
          newPosition = swiper.maxTranslate();
        }
        if (params.loop && params.centeredSlides) needsLoopFix = true;
      } else if (newPosition > swiper.minTranslate()) {
        if (params.freeMode.momentumBounce) {
          if (newPosition - swiper.minTranslate() > bounceAmount) {
            newPosition = swiper.minTranslate() + bounceAmount;
          }
          afterBouncePosition = swiper.minTranslate();
          doBounce = true;
          data.allowMomentumBounce = true;
        } else {
          newPosition = swiper.minTranslate();
        }
        if (params.loop && params.centeredSlides) needsLoopFix = true;
      } else if (params.freeMode.sticky) {
        var nextSlide;
        for (var j = 0; j < snapGrid.length; j += 1) {
          if (snapGrid[j] > -newPosition) {
            nextSlide = j;
            break;
          }
        }
        if (Math.abs(snapGrid[nextSlide] - newPosition) < Math.abs(snapGrid[nextSlide - 1] - newPosition) || swiper.swipeDirection === 'next') {
          newPosition = snapGrid[nextSlide];
        } else {
          newPosition = snapGrid[nextSlide - 1];
        }
        newPosition = -newPosition;
      }
      if (needsLoopFix) {
        once('transitionEnd', function () {
          swiper.loopFix();
        });
      } // Fix duration

      if (swiper.velocity !== 0) {
        if (rtl) {
          momentumDuration = Math.abs((-newPosition - swiper.translate) / swiper.velocity);
        } else {
          momentumDuration = Math.abs((newPosition - swiper.translate) / swiper.velocity);
        }
        if (params.freeMode.sticky) {
          var moveDistance = Math.abs((rtl ? -newPosition : newPosition) - swiper.translate);
          var currentSlideSize = swiper.slidesSizesGrid[swiper.activeIndex];
          if (moveDistance < currentSlideSize) {
            momentumDuration = params.speed;
          } else if (moveDistance < 2 * currentSlideSize) {
            momentumDuration = params.speed * 1.5;
          } else {
            momentumDuration = params.speed * 2.5;
          }
        }
      } else if (params.freeMode.sticky) {
        swiper.slideToClosest();
        return;
      }
      if (params.freeMode.momentumBounce && doBounce) {
        swiper.updateProgress(afterBouncePosition);
        swiper.setTransition(momentumDuration);
        swiper.setTranslate(newPosition);
        swiper.transitionStart(true, swiper.swipeDirection);
        swiper.animating = true;
        $wrapperEl.transitionEnd(function () {
          if (!swiper || swiper.destroyed || !data.allowMomentumBounce) return;
          emit('momentumBounce');
          swiper.setTransition(params.speed);
          setTimeout(function () {
            swiper.setTranslate(afterBouncePosition);
            $wrapperEl.transitionEnd(function () {
              if (!swiper || swiper.destroyed) return;
              swiper.transitionEnd();
            }, momentumDuration);
          }, 0);
        }, momentumDuration);
      } else if (swiper.velocity) {
        emit('_freeModeNoMomentumRelease');
        swiper.updateProgress(newPosition);
        swiper.setTransition(momentumDuration);
        swiper.setTranslate(newPosition);
        swiper.transitionStart(true, swiper.swipeDirection);
        if (!swiper.animating) {
          swiper.animating = true;
          $wrapperEl.transitionEnd(function () {
            if (!swiper || swiper.destroyed) return;
            swiper.transitionEnd();
          }, momentumDuration);
        }
      } else {
        swiper.updateProgress(newPosition);
      }
      swiper.updateActiveIndex();
      swiper.updateSlidesClasses();
    } else if (params.freeMode.sticky) {
      swiper.slideToClosest();
      return;
    } else if (params.freeMode) {
      emit('_freeModeNoMomentumRelease');
    }
    if (!params.freeMode.momentum || timeDiff >= params.longSwipesMs) {
      swiper.updateProgress();
      swiper.updateActiveIndex();
      swiper.updateSlidesClasses();
    }
  }
  Object.assign(swiper, {
    freeMode: {
      onTouchMove: onTouchMove,
      onTouchEnd: onTouchEnd
    }
  });
}

/***/ }),

/***/ 594:
/*!********************************************************************************************!*\
  !*** D:/project/前端/front/front/components/zebra-swiper/modules/effect-fade/effect-fade.js ***!
  \********************************************************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


var _interopRequireDefault = __webpack_require__(/*! @babel/runtime/helpers/interopRequireDefault */ 3);
Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = EffectFade;
var _effectInit = _interopRequireDefault(__webpack_require__(/*! ../../shared/effect-init.js */ 595));
var _effectTarget = _interopRequireDefault(__webpack_require__(/*! ../../shared/effect-target.js */ 596));
var _effectVirtualTransitionEnd = _interopRequireDefault(__webpack_require__(/*! ../../shared/effect-virtual-transition-end.js */ 597));
function EffectFade(_ref) {
  var swiper = _ref.swiper,
    extendParams = _ref.extendParams,
    on = _ref.on;
  extendParams({
    fadeEffect: {
      crossFade: false,
      transformEl: null
    }
  });
  var setTranslate = function setTranslate() {
    var slides = swiper.slides;
    var params = swiper.params.fadeEffect;
    for (var i = 0; i < slides.length; i += 1) {
      var $slideEl = swiper.slides[i];
      var offset = $slideEl.swiperSlideOffset;
      var tx = -offset;
      if (!swiper.params.virtualTranslate) tx -= swiper.translate;
      var ty = 0;
      if (!swiper.isHorizontal()) {
        ty = tx;
        tx = 0;
      }
      var slideOpacity = swiper.params.fadeEffect.crossFade ? Math.max(1 - Math.abs($slideEl.progress), 0) : 1 + Math.min(Math.max($slideEl.progress, -1), 0);
      var $targetEl = (0, _effectTarget.default)(params, $slideEl);
      $targetEl.css({
        opacity: slideOpacity
      });
      $targetEl.transform("translate3d(".concat(tx, "px, ").concat(ty, "px, 0px)"));
      if (swiper.params.willChange) {
        $targetEl.willChange("opacity");
      }
      slides[i].addClass('swiper-slide-fade');
    }
  };
  var setTransition = function setTransition(duration) {
    var transformEl = swiper.params.fadeEffect.transformEl;
    var $transitionElements = transformEl ? swiper.slides.find(transformEl) : swiper.slides;
    for (var i = 0; i < $transitionElements.length; i += 1) {
      $transitionElements[i].transition(duration);
    }
    (0, _effectVirtualTransitionEnd.default)({
      swiper: swiper,
      duration: duration,
      transformEl: transformEl,
      allSlides: true
    });
  };
  (0, _effectInit.default)({
    effect: 'fade',
    swiper: swiper,
    on: on,
    setTranslate: setTranslate,
    setTransition: setTransition,
    overwriteParams: function overwriteParams() {
      return {
        slidesPerView: 1,
        slidesPerGroup: 1,
        watchSlidesProgress: true,
        spaceBetween: 0,
        virtualTranslate: !swiper.params.cssMode
      };
    }
  });
}

/***/ }),

/***/ 595:
/*!*******************************************************************************!*\
  !*** D:/project/前端/front/front/components/zebra-swiper/shared/effect-init.js ***!
  \*******************************************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = effectInit;
function effectInit(params) {
  var effect = params.effect,
    swiper = params.swiper,
    on = params.on,
    setTranslate = params.setTranslate,
    setTransition = params.setTransition,
    overwriteParams = params.overwriteParams,
    perspective = params.perspective;
  on('beforeInit', function () {
    if (swiper.params.effect !== effect) return;
    swiper.classNames.push("".concat(swiper.params.containerModifierClass).concat(effect));
    if (perspective && perspective()) {
      swiper.classNames.push("".concat(swiper.params.containerModifierClass, "3d"));
    }
    var overwriteParamsResult = overwriteParams ? overwriteParams() : {};
    Object.assign(swiper.params, overwriteParamsResult);
    Object.assign(swiper.originalParams, overwriteParamsResult);
  });
  on('setTranslate', function () {
    if (swiper.params.effect !== effect) return;
    setTranslate();
  });
  on('setTransition', function (_s, duration) {
    if (swiper.params.effect !== effect) return;
    setTransition(duration);
  });
}

/***/ }),

/***/ 596:
/*!*********************************************************************************!*\
  !*** D:/project/前端/front/front/components/zebra-swiper/shared/effect-target.js ***!
  \*********************************************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = effectTarget;
function effectTarget(effectParams, $slideEl) {
  if (effectParams.transformEl) {
    return $slideEl.find(effectParams.transformEl).css({
      'backface-visibility': 'hidden',
      '-webkit-backface-visibility': 'hidden'
    });
  }
  return $slideEl;
}

/***/ }),

/***/ 597:
/*!*************************************************************************************************!*\
  !*** D:/project/前端/front/front/components/zebra-swiper/shared/effect-virtual-transition-end.js ***!
  \*************************************************************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = effectVirtualTransitionEnd;
function effectVirtualTransitionEnd(_ref) {
  var swiper = _ref.swiper,
    duration = _ref.duration,
    transformEl = _ref.transformEl,
    allSlides = _ref.allSlides;
  var slides = swiper.slides,
    activeIndex = swiper.activeIndex,
    $wrapperEl = swiper.$wrapperEl;
  if (swiper.params.virtualTranslate && duration !== 0) {
    (function () {
      var eventTriggered = false;
      var $transitionEndTarget;
      if (allSlides) {
        $transitionEndTarget = transformEl ? slides.find(transformEl) : slides;
      } else {
        $transitionEndTarget = transformEl ? slides.eq(activeIndex).find(transformEl) : slides[activeIndex];
      }
      for (var i = 0; i < $transitionEndTarget.length; i += 1) {
        $transitionEndTarget[i].transitionEnd(function () {
          if (eventTriggered) return;
          if (!swiper || swiper.destroyed) return;
          eventTriggered = true;
          swiper.animating = false;
          // const triggerEvents = ['webkitTransitionEnd', 'transitionend'];
          swiper.emit('transitionEnd');
          // for (let i = 0; i < triggerEvents.length; i += 1) {
          // 	$wrapperEl.trigger(triggerEvents[i]);
          // }
        }, duration);
      }
    })();
  }
}

/***/ }),

/***/ 598:
/*!********************************************************************************************!*\
  !*** D:/project/前端/front/front/components/zebra-swiper/modules/effect-cube/effect-cube.js ***!
  \********************************************************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


var _interopRequireDefault = __webpack_require__(/*! @babel/runtime/helpers/interopRequireDefault */ 3);
Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = EffectCube;
var _effectInit = _interopRequireDefault(__webpack_require__(/*! ../../shared/effect-init.js */ 595));
function EffectCube(_ref) {
  var swiper = _ref.swiper,
    extendParams = _ref.extendParams,
    on = _ref.on;
  extendParams({
    cubeEffect: {
      slideShadows: true,
      shadow: true,
      shadowOffset: 20,
      shadowScale: 0.94
    }
  });
  var setTranslate = function setTranslate() {
    var $el = swiper.$el,
      $wrapperEl = swiper.$wrapperEl,
      slides = swiper.slides,
      swiperWidth = swiper.width,
      swiperHeight = swiper.height,
      rtl = swiper.rtlTranslate,
      swiperSize = swiper.size,
      browser = swiper.browser;
    var params = swiper.params.cubeEffect;
    var isHorizontal = swiper.isHorizontal();
    var isVirtual = swiper.virtual && swiper.params.virtual.enabled;
    var wrapperRotate = 0;
    var $cubeShadowEl;
    if (params.shadow) {
      if (isHorizontal) {
        // $cubeShadowEl = $wrapperEl.find('.swiper-cube-shadow');
        if (!swiper.native.cubeShadowShowWrapper) {
          swiper.$wrapperEl.updateData({
            cubeShadowShowWrapper: true
          });
        }
        swiper.$wrapperEl.cubeShadowCss({
          height: "".concat(swiperWidth, "px")
        });
      } else {
        if (!swiper.native.cubeShadowShowRoot) {
          swiper.$wrapperEl.updateData({
            cubeShadowShowRoot: true
          });
        }
      }
    }
    for (var i = 0; i < slides.length; i += 1) {
      var $slideEl = slides[i];
      var slideIndex = i;
      if (isVirtual) {
        slideIndex = parseInt(swiper.activeIndex, 10);
      }
      var slideAngle = slideIndex * 90;
      var round = Math.floor(slideAngle / 360);
      if (rtl) {
        slideAngle = -slideAngle;
        round = Math.floor(-slideAngle / 360);
      }
      var progress = Math.max(Math.min($slideEl.progress, 1), -1);
      var tx = 0;
      var ty = 0;
      var tz = 0;
      if (slideIndex % 4 === 0) {
        tx = -round * 4 * swiperSize;
        tz = 0;
      } else if ((slideIndex - 1) % 4 === 0) {
        tx = 0;
        tz = -round * 4 * swiperSize;
      } else if ((slideIndex - 2) % 4 === 0) {
        tx = swiperSize + round * 4 * swiperSize;
        tz = swiperSize;
      } else if ((slideIndex - 3) % 4 === 0) {
        tx = -swiperSize;
        tz = 3 * swiperSize + swiperSize * 4 * round;
      }
      if (rtl) {
        tx = -tx;
      }
      if (!isHorizontal) {
        ty = tx;
        tx = 0;
      }
      var transform = "rotateX(".concat(isHorizontal ? 0 : -slideAngle, "deg) rotateY(").concat(isHorizontal ? slideAngle : 0, "deg) translate3d(").concat(tx, "px, ").concat(ty, "px, ").concat(tz, "px)");
      if (progress <= 1 && progress > -1) {
        wrapperRotate = slideIndex * 90 + progress * 90;
        if (rtl) wrapperRotate = -slideIndex * 90 - progress * 90;
      }
      $slideEl.transform(transform);
      // if (params.slideShadows) {
      // 	// Set shadows
      // 	let shadowBefore = isHorizontal ?
      // 		$slideEl.find('.swiper-slide-shadow-left') :
      // 		$slideEl.find('.swiper-slide-shadow-top');
      // 	let shadowAfter = isHorizontal ?
      // 		$slideEl.find('.swiper-slide-shadow-right') :
      // 		$slideEl.find('.swiper-slide-shadow-bottom');
      // 	if (shadowBefore.length === 0) {
      // 		shadowBefore = $(
      // 			`<div class="swiper-slide-shadow-${isHorizontal ? 'left' : 'top'}"></div>`,
      // 		);
      // 		$slideEl.append(shadowBefore);
      // 	}
      // 	if (shadowAfter.length === 0) {
      // 		shadowAfter = $(
      // 			`<div class="swiper-slide-shadow-${isHorizontal ? 'right' : 'bottom'}"></div>`,
      // 		);
      // 		$slideEl.append(shadowAfter);
      // 	}
      // 	if (shadowBefore.length) shadowBefore[0].style.opacity = Math.max(-progress, 0);
      // 	if (shadowAfter.length) shadowAfter[0].style.opacity = Math.max(progress, 0);
      // }
      $slideEl.addClass('swiper-slide-cube');
    }
    $wrapperEl.css({
      '-webkit-transform-origin': "50% 50% -".concat(swiperSize / 2, "px"),
      'transform-origin': "50% 50% -".concat(swiperSize / 2, "px")
    });
    if (params.shadow) {
      if (isHorizontal) {
        swiper.$wrapperEl.cubeShadowTransform("translate3d(0px, ".concat(swiperWidth / 2 + params.shadowOffset, "px, ").concat(-swiperWidth / 2, "px) rotateX(90deg) rotateZ(0deg) scale(").concat(params.shadowScale, ")"));
      } else {
        var shadowAngle = Math.abs(wrapperRotate) - Math.floor(Math.abs(wrapperRotate) / 90) * 90;
        var multiplier = 1.5 - (Math.sin(shadowAngle * 2 * Math.PI / 360) / 2 + Math.cos(shadowAngle * 2 * Math.PI / 360) / 2);
        var scale1 = params.shadowScale;
        var scale2 = params.shadowScale / multiplier;
        var offset = params.shadowOffset;
        swiper.$wrapperEl.cubeShadowTransform("scale3d(".concat(scale1, ", 1, ").concat(scale2, ") translate3d(0px, ").concat(swiperHeight / 2 + offset, "px, ").concat(-swiperHeight / 2 / scale2, "px) rotateX(-90deg)"));
      }
    }
    var zFactor = browser.isSafari || browser.isWebView ? -swiperSize / 2 : 0;
    $wrapperEl.transform("translate3d(0px,0,".concat(zFactor, "px) rotateX(").concat(swiper.isHorizontal() ? 0 : wrapperRotate, "deg) rotateY(").concat(swiper.isHorizontal() ? -wrapperRotate : 0, "deg)"));
  };
  var setTransition = function setTransition(duration) {
    var $el = swiper.$el,
      slides = swiper.slides;
    for (var i = 0; i < slides.length; i++) {
      slides[i].transition(duration);
    }
    if (swiper.params.cubeEffect.shadow && !swiper.isHorizontal()) {
      swiper.$wrapperEl.cubeShadowTransition(duration);
    }
  };
  (0, _effectInit.default)({
    effect: 'cube',
    swiper: swiper,
    on: on,
    setTranslate: setTranslate,
    setTransition: setTransition,
    perspective: function perspective() {
      return true;
    },
    overwriteParams: function overwriteParams() {
      return {
        slidesPerView: 1,
        slidesPerGroup: 1,
        watchSlidesProgress: true,
        resistanceRatio: 0,
        spaceBetween: 0,
        centeredSlides: false,
        virtualTranslate: true
      };
    }
  });
}

/***/ }),

/***/ 599:
/*!******************************************************************************************************!*\
  !*** D:/project/前端/front/front/components/zebra-swiper/modules/effect-coverflow/effect-coverflow.js ***!
  \******************************************************************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


var _interopRequireDefault = __webpack_require__(/*! @babel/runtime/helpers/interopRequireDefault */ 3);
Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = EffectCoverflow;
var _effectInit = _interopRequireDefault(__webpack_require__(/*! ../../shared/effect-init.js */ 595));
var _effectTarget = _interopRequireDefault(__webpack_require__(/*! ../../shared/effect-target.js */ 596));
function EffectCoverflow(_ref) {
  var swiper = _ref.swiper,
    extendParams = _ref.extendParams,
    on = _ref.on;
  extendParams({
    coverflowEffect: {
      rotate: 50,
      stretch: 0,
      depth: 100,
      scale: 1,
      modifier: 1,
      slideShadows: true,
      transformEl: null
    }
  });
  var setTranslate = function setTranslate() {
    var swiperWidth = swiper.width,
      swiperHeight = swiper.height,
      slides = swiper.slides,
      slidesSizesGrid = swiper.slidesSizesGrid;
    var params = swiper.params.coverflowEffect;
    var isHorizontal = swiper.isHorizontal();
    var transform = swiper.translate;
    var center = isHorizontal ? -transform + swiperWidth / 2 : -transform + swiperHeight / 2;
    var rotate = isHorizontal ? params.rotate : -params.rotate;
    var translate = params.depth; // Each slide offset from center

    for (var i = 0, length = slides.length; i < length; i += 1) {
      var $slideEl = slides[i];
      var slideSize = slidesSizesGrid[i];
      var slideOffset = $slideEl.swiperSlideOffset;
      var offsetMultiplier = (center - slideOffset - slideSize / 2) / slideSize * params.modifier;
      var rotateY = isHorizontal ? rotate * offsetMultiplier : 0;
      var rotateX = isHorizontal ? 0 : rotate * offsetMultiplier; // var rotateZ = 0

      var translateZ = -translate * Math.abs(offsetMultiplier);
      var stretch = params.stretch; // Allow percentage to make a relative stretch for responsive sliders

      if (typeof stretch === 'string' && stretch.indexOf('%') !== -1) {
        stretch = parseFloat(params.stretch) / 100 * slideSize;
      }
      var translateY = isHorizontal ? 0 : stretch * offsetMultiplier;
      var translateX = isHorizontal ? stretch * offsetMultiplier : 0;
      var scale = 1 - (1 - params.scale) * Math.abs(offsetMultiplier); // Fix for ultra small values

      if (Math.abs(translateX) < 0.001) translateX = 0;
      if (Math.abs(translateY) < 0.001) translateY = 0;
      if (Math.abs(translateZ) < 0.001) translateZ = 0;
      if (Math.abs(rotateY) < 0.001) rotateY = 0;
      if (Math.abs(rotateX) < 0.001) rotateX = 0;
      if (Math.abs(scale) < 0.001) scale = 0;
      var slideTransform = "translate3d(".concat(translateX, "px,").concat(translateY, "px,").concat(translateZ, "px)  rotateX(").concat(rotateX, "deg) rotateY(").concat(rotateY, "deg) scale(").concat(scale, ")");
      var $targetEl = (0, _effectTarget.default)(params, $slideEl);
      $targetEl.transform(slideTransform);
      $slideEl.css({
        zIndex: -Math.abs(Math.round(offsetMultiplier)) + 1
      });
      if (swiper.params.willChange) {
        $targetEl.willChange("transform");
      }
      $slideEl.addClass('swiper-slide-coverflow');
      // if (params.slideShadows) {
      //   // Set shadows
      //   let $shadowBeforeEl = isHorizontal ? $slideEl.find('.swiper-slide-shadow-left') : $slideEl.find('.swiper-slide-shadow-top');
      //   let $shadowAfterEl = isHorizontal ? $slideEl.find('.swiper-slide-shadow-right') : $slideEl.find('.swiper-slide-shadow-bottom');

      //   if ($shadowBeforeEl.length === 0) {
      //     $shadowBeforeEl = createShadow(params, $slideEl, isHorizontal ? 'left' : 'top');
      //   }

      //   if ($shadowAfterEl.length === 0) {
      //     $shadowAfterEl = createShadow(params, $slideEl, isHorizontal ? 'right' : 'bottom');
      //   }

      //   if ($shadowBeforeEl.length) $shadowBeforeEl[0].style.opacity = offsetMultiplier > 0 ? offsetMultiplier : 0;
      //   if ($shadowAfterEl.length) $shadowAfterEl[0].style.opacity = -offsetMultiplier > 0 ? -offsetMultiplier : 0;
      // }
    }
  };

  var setTransition = function setTransition(duration) {
    var transformEl = swiper.params.coverflowEffect.transformEl;
    var $transitionElements = transformEl ? swiper.slides.find(transformEl) : swiper.slides;
    for (var i = 0; i < $transitionElements.length; i++) {
      $transitionElements[i].transition(duration);
    }
  };
  (0, _effectInit.default)({
    effect: 'coverflow',
    swiper: swiper,
    on: on,
    setTranslate: setTranslate,
    setTransition: setTransition,
    perspective: function perspective() {
      return true;
    },
    overwriteParams: function overwriteParams() {
      return {
        watchSlidesProgress: true
      };
    }
  });
}

/***/ }),

/***/ 6:
/*!*********************************************************************!*\
  !*** ./node_modules/@babel/runtime/helpers/iterableToArrayLimit.js ***!
  \*********************************************************************/
/*! no static exports found */
/***/ (function(module, exports) {

function _iterableToArrayLimit(arr, i) {
  var _i = null == arr ? null : "undefined" != typeof Symbol && arr[Symbol.iterator] || arr["@@iterator"];
  if (null != _i) {
    var _s,
      _e,
      _x,
      _r,
      _arr = [],
      _n = !0,
      _d = !1;
    try {
      if (_x = (_i = _i.call(arr)).next, 0 === i) {
        if (Object(_i) !== _i) return;
        _n = !1;
      } else for (; !(_n = (_s = _x.call(_i)).done) && (_arr.push(_s.value), _arr.length !== i); _n = !0) {
        ;
      }
    } catch (err) {
      _d = !0, _e = err;
    } finally {
      try {
        if (!_n && null != _i["return"] && (_r = _i["return"](), Object(_r) !== _r)) return;
      } finally {
        if (_d) throw _e;
      }
    }
    return _arr;
  }
}
module.exports = _iterableToArrayLimit, module.exports.__esModule = true, module.exports["default"] = module.exports;

/***/ }),

/***/ 600:
/*!********************************************************************************************!*\
  !*** D:/project/前端/front/front/components/zebra-swiper/modules/effect-flip/effect-flip.js ***!
  \********************************************************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


var _interopRequireDefault = __webpack_require__(/*! @babel/runtime/helpers/interopRequireDefault */ 3);
Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = EffectFlip;
var _effectInit = _interopRequireDefault(__webpack_require__(/*! ../../shared/effect-init.js */ 595));
var _effectTarget = _interopRequireDefault(__webpack_require__(/*! ../../shared/effect-target.js */ 596));
var _effectVirtualTransitionEnd = _interopRequireDefault(__webpack_require__(/*! ../../shared/effect-virtual-transition-end.js */ 597));
function EffectFlip(_ref) {
  var swiper = _ref.swiper,
    extendParams = _ref.extendParams,
    on = _ref.on;
  extendParams({
    flipEffect: {
      slideShadows: true,
      limitRotation: true,
      transformEl: null
    }
  });
  var setTranslate = function setTranslate() {
    var slides = swiper.slides,
      rtl = swiper.rtlTranslate;
    var params = swiper.params.flipEffect;
    for (var i = 0; i < slides.length; i += 1) {
      var $slideEl = slides[i];
      var progress = $slideEl.progress;
      if (swiper.params.flipEffect.limitRotation) {
        progress = Math.max(Math.min($slideEl.progress, 1), -1);
      }
      var offset = $slideEl.swiperSlideOffset;
      var rotate = -180 * progress;
      var rotateY = rotate;
      var rotateX = 0;
      var tx = swiper.params.cssMode ? -offset - swiper.translate : -offset;
      var ty = 0;
      if (!swiper.isHorizontal()) {
        ty = tx;
        tx = 0;
        rotateX = -rotateY;
        rotateY = 0;
      } else if (rtl) {
        rotateY = -rotateY;
      }
      $slideEl.css({
        zIndex: -Math.abs(Math.round(progress)) + slides.length
      });
      // if (params.slideShadows) {
      //   // Set shadows
      //   let shadowBefore = swiper.isHorizontal()
      //     ? $slideEl.find('.swiper-slide-shadow-left')
      //     : $slideEl.find('.swiper-slide-shadow-top');
      //   let shadowAfter = swiper.isHorizontal()
      //     ? $slideEl.find('.swiper-slide-shadow-right')
      //     : $slideEl.find('.swiper-slide-shadow-bottom');
      //   if (shadowBefore.length === 0) {
      //     shadowBefore = createShadow(params, $slideEl, swiper.isHorizontal() ? 'left' : 'top');
      //   }
      //   if (shadowAfter.length === 0) {
      //     shadowAfter = createShadow(params, $slideEl, swiper.isHorizontal() ? 'right' : 'bottom');
      //   }
      //   if (shadowBefore.length) shadowBefore[0].style.opacity = Math.max(-progress, 0);
      //   if (shadowAfter.length) shadowAfter[0].style.opacity = Math.max(progress, 0);
      // }
      var transform = "translate3d(".concat(tx, "px, ").concat(ty, "px, 0px) rotateX(").concat(rotateX, "deg) rotateY(").concat(rotateY, "deg)");
      var $targetEl = (0, _effectTarget.default)(params, $slideEl);
      $targetEl.transform(transform);
      if (swiper.params.willChange) {
        $targetEl.willChange("transform");
      }
      slides[i].addClass('swiper-slide-flip');
    }
  };
  var setTransition = function setTransition(duration) {
    var transformEl = swiper.params.flipEffect.transformEl;
    var $transitionElements = transformEl ? swiper.slides.find(transformEl) : swiper.slides;
    for (var i = 0; i < $transitionElements.length; i += 1) {
      $transitionElements[i].transition(duration);
    }
    (0, _effectVirtualTransitionEnd.default)({
      swiper: swiper,
      duration: duration,
      transformEl: transformEl
    });
  };
  (0, _effectInit.default)({
    effect: 'flip',
    swiper: swiper,
    on: on,
    setTranslate: setTranslate,
    setTransition: setTransition,
    perspective: function perspective() {
      return true;
    },
    overwriteParams: function overwriteParams() {
      return {
        slidesPerView: 1,
        slidesPerGroup: 1,
        watchSlidesProgress: true,
        spaceBetween: 0,
        virtualTranslate: !swiper.params.cssMode
      };
    }
  });
}

/***/ }),

/***/ 601:
/*!**********************************************************************************************!*\
  !*** D:/project/前端/front/front/components/zebra-swiper/modules/effect-cards/effect-cards.js ***!
  \**********************************************************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


var _interopRequireDefault = __webpack_require__(/*! @babel/runtime/helpers/interopRequireDefault */ 3);
Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = EffectCards;
var _effectInit = _interopRequireDefault(__webpack_require__(/*! ../../shared/effect-init.js */ 595));
var _effectTarget = _interopRequireDefault(__webpack_require__(/*! ../../shared/effect-target.js */ 596));
var _effectVirtualTransitionEnd = _interopRequireDefault(__webpack_require__(/*! ../../shared/effect-virtual-transition-end.js */ 597));
function EffectCards(_ref) {
  var swiper = _ref.swiper,
    extendParams = _ref.extendParams,
    on = _ref.on;
  extendParams({
    cardsEffect: {
      slideShadows: true,
      transformEl: null,
      rotate: true
    }
  });
  var setTranslate = function setTranslate() {
    var slides = swiper.slides,
      activeIndex = swiper.activeIndex;
    var params = swiper.params.cardsEffect;
    var _swiper$touchEventsDa = swiper.touchEventsData,
      startTranslate = _swiper$touchEventsDa.startTranslate,
      isTouched = _swiper$touchEventsDa.isTouched;
    var currentTranslate = swiper.translate;
    for (var i = 0; i < slides.length; i += 1) {
      var $slideEl = slides[i];
      var slideProgress = $slideEl.progress;
      var progress = Math.min(Math.max(slideProgress, -4), 4);
      var offset = $slideEl.swiperSlideOffset;
      if (swiper.params.centeredSlides && !swiper.params.cssMode) {
        swiper.$wrapperEl.transform("translateX(".concat(swiper.minTranslate(), "px)"));
      }
      if (swiper.params.centeredSlides && swiper.params.cssMode) {
        offset -= slides.swiperSlideOffset;
      }
      var tX = swiper.params.cssMode ? -offset - swiper.translate : -offset;
      var tY = 0;
      var tZ = -100 * Math.abs(progress);
      var scale = 1;
      var rotate = -2 * progress;
      var tXAdd = 8 - Math.abs(progress) * 0.75;
      var isSwipeToNext = (i === activeIndex || i === activeIndex - 1) && progress > 0 && progress < 1 && (isTouched || swiper.params.cssMode) && currentTranslate < startTranslate;
      var isSwipeToPrev = (i === activeIndex || i === activeIndex + 1) && progress < 0 && progress > -1 && (isTouched || swiper.params.cssMode) && currentTranslate > startTranslate;
      if (isSwipeToNext || isSwipeToPrev) {
        var subProgress = Math.pow(1 - Math.abs((Math.abs(progress) - 0.5) / 0.5), 0.5);
        rotate += -28 * progress * subProgress;
        scale += -0.5 * subProgress;
        tXAdd += 96 * subProgress;
        tY = "".concat(-25 * subProgress * Math.abs(progress), "%");
      }
      if (progress < 0) {
        // next
        tX = "calc(".concat(tX, "px + (").concat(tXAdd * Math.abs(progress), "%))");
      } else if (progress > 0) {
        // prev
        tX = "calc(".concat(tX, "px + (-").concat(tXAdd * Math.abs(progress), "%))");
      } else {
        tX = "".concat(tX, "px");
      }
      if (!swiper.isHorizontal()) {
        var prevY = tY;
        tY = tX;
        tX = prevY;
      }
      var scaleString = progress < 0 ? "".concat(1 + (1 - scale) * progress) : "".concat(1 - (1 - scale) * progress);
      var transform = "translate3d(".concat(tX, ", ").concat(tY, ", ").concat(tZ, "px) rotateZ(").concat(params.rotate ? rotate : 0, "deg) scale(").concat(scaleString, ")");

      // if (params.slideShadows) {
      //   // Set shadows
      //   let $shadowEl = $slideEl.find('.swiper-slide-shadow');
      //   if ($shadowEl.length === 0) {
      //     $shadowEl = createShadow(params, $slideEl);
      //   }
      //   if ($shadowEl.length)
      //     $shadowEl[0].style.opacity = Math.min(Math.max((Math.abs(progress) - 0.5) / 0.5, 0), 1);
      // }

      // $slideEl[0].style.zIndex = -Math.abs(Math.round(slideProgress)) + slides.length;
      $slideEl.css({
        zIndex: -Math.abs(Math.round(slideProgress)) + slides.length
      });
      var $targetEl = (0, _effectTarget.default)(params, $slideEl);
      $targetEl.transform(transform);
      if (swiper.params.willChange) {
        $targetEl.willChange("transform");
      }
      slides[i].addClass('swiper-slide-cards');
    }
  };
  var setTransition = function setTransition(duration) {
    var transformEl = swiper.params.cardsEffect.transformEl;
    var $transitionElements = transformEl ? swiper.slides.find(transformEl) : swiper.slides;
    for (var i = 0; i < $transitionElements.length; i += 1) {
      $transitionElements[i].transition(duration);
    }
    (0, _effectVirtualTransitionEnd.default)({
      swiper: swiper,
      duration: duration,
      transformEl: transformEl
    });
  };
  (0, _effectInit.default)({
    effect: 'cards',
    swiper: swiper,
    on: on,
    setTranslate: setTranslate,
    setTransition: setTransition,
    perspective: function perspective() {
      return true;
    },
    overwriteParams: function overwriteParams() {
      return {
        watchSlidesProgress: true,
        virtualTranslate: !swiper.params.cssMode
      };
    }
  });
}

/***/ }),

/***/ 602:
/*!****************************************************************************************************!*\
  !*** D:/project/前端/front/front/components/zebra-swiper/modules/effect-creative/effect-creative.js ***!
  \****************************************************************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


var _interopRequireDefault = __webpack_require__(/*! @babel/runtime/helpers/interopRequireDefault */ 3);
Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = EffectCreative;
var _effectInit = _interopRequireDefault(__webpack_require__(/*! ../../shared/effect-init.js */ 595));
var _effectTarget = _interopRequireDefault(__webpack_require__(/*! ../../shared/effect-target.js */ 596));
var _effectVirtualTransitionEnd = _interopRequireDefault(__webpack_require__(/*! ../../shared/effect-virtual-transition-end.js */ 597));
function EffectCreative(_ref) {
  var swiper = _ref.swiper,
    extendParams = _ref.extendParams,
    on = _ref.on;
  extendParams({
    creativeEffect: {
      transformEl: null,
      limitProgress: 1,
      shadowPerProgress: false,
      progressMultiplier: 1,
      perspective: true,
      prev: {
        translate: [0, 0, 0],
        rotate: [0, 0, 0],
        opacity: 1,
        scale: 1
      },
      next: {
        translate: [0, 0, 0],
        rotate: [0, 0, 0],
        opacity: 1,
        scale: 1
      }
    }
  });
  var getTranslateValue = function getTranslateValue(value) {
    if (typeof value === 'string') return value;
    return "".concat(value, "px");
  };
  var setTranslate = function setTranslate() {
    var slides = swiper.slides,
      $wrapperEl = swiper.$wrapperEl,
      slidesSizesGrid = swiper.slidesSizesGrid;
    var params = swiper.params.creativeEffect;
    var multiplier = params.progressMultiplier;
    var isCenteredSlides = swiper.params.centeredSlides;
    if (isCenteredSlides) {
      var margin = slidesSizesGrid[0] / 2 - swiper.params.slidesOffsetBefore || 0;
      $wrapperEl.transform("translateX(calc(50% - ".concat(margin, "px))"));
    }
    var _loop = function _loop(i) {
      var $slideEl = slides[i];
      var slideProgress = $slideEl.progress;
      var progress = Math.min(Math.max($slideEl.progress, -params.limitProgress), params.limitProgress);
      var originalProgress = progress;
      if (!isCenteredSlides) {
        originalProgress = Math.min(Math.max($slideEl.originalProgress, -params.limitProgress), params.limitProgress);
      }
      var offset = $slideEl.swiperSlideOffset;
      var t = [swiper.params.cssMode ? -offset - swiper.translate : -offset, 0, 0];
      var r = [0, 0, 0];
      var custom = false;
      if (!swiper.isHorizontal()) {
        t[1] = t[0];
        t[0] = 0;
      }
      var data = {
        translate: [0, 0, 0],
        rotate: [0, 0, 0],
        scale: 1,
        opacity: 1
      };
      if (progress < 0) {
        data = params.next;
        custom = true;
      } else if (progress > 0) {
        data = params.prev;
        custom = true;
      }
      // set translate
      t.forEach(function (value, index) {
        t[index] = "calc(".concat(value, "px + (").concat(getTranslateValue(data.translate[index]), " * ").concat(Math.abs(progress * multiplier), "))");
      });
      // set rotates
      r.forEach(function (value, index) {
        r[index] = data.rotate[index] * Math.abs(progress * multiplier);
      });

      // $slideEl[0].style.zIndex = -Math.abs(Math.round(slideProgress)) + slides.length;
      $slideEl.css({
        zIndex: -Math.abs(Math.round(slideProgress)) + slides.length
      });
      var translateString = t.join(', ');
      var rotateString = "rotateX(".concat(r[0], "deg) rotateY(").concat(r[1], "deg) rotateZ(").concat(r[2], "deg)");
      var scaleString = originalProgress < 0 ? "scale(".concat(1 + (1 - data.scale) * originalProgress * multiplier, ")") : "scale(".concat(1 - (1 - data.scale) * originalProgress * multiplier, ")");
      var opacityString = originalProgress < 0 ? 1 + (1 - data.opacity) * originalProgress * multiplier : 1 - (1 - data.opacity) * originalProgress * multiplier;
      var transform = "translate3d(".concat(translateString, ") ").concat(rotateString, " ").concat(scaleString);

      // Set shadows
      // if ((custom && data.shadow) || !custom) {
      //   let $shadowEl = $slideEl.children('.swiper-slide-shadow');
      //   if ($shadowEl.length === 0 && data.shadow) {
      //     $shadowEl = createShadow(params, $slideEl);
      //   }
      //   if ($shadowEl.length) {
      //     const shadowOpacity = params.shadowPerProgress
      //       ? progress * (1 / params.limitProgress)
      //       : progress;
      //     $shadowEl[0].style.opacity = Math.min(Math.max(Math.abs(shadowOpacity), 0), 1);
      //   }
      // }

      var $targetEl = (0, _effectTarget.default)(params, $slideEl);
      $targetEl.transform(transform);
      $targetEl.css({
        opacity: opacityString
      });
      if (data.origin) {
        $targetEl.css({
          'transform-origin': data.origin
        });
      }
      if (swiper.params.willChange) {
        slides[i].willChange("transform,opacity");
      }
      slides[i].addClass('swiper-slide-creative');
    };
    for (var i = 0; i < slides.length; i += 1) {
      _loop(i);
    }
  };
  var setTransition = function setTransition(duration) {
    var transformEl = swiper.params.creativeEffect.transformEl;
    var $transitionElements = transformEl ? swiper.slides.find(transformEl) : swiper.slides;
    for (var i = 0; i < $transitionElements.length; i += 1) {
      $transitionElements[i].transition(duration);
    }
    (0, _effectVirtualTransitionEnd.default)({
      swiper: swiper,
      duration: duration,
      transformEl: transformEl,
      allSlides: true
    });
  };
  (0, _effectInit.default)({
    effect: 'creative',
    swiper: swiper,
    on: on,
    setTranslate: setTranslate,
    setTransition: setTransition,
    perspective: function perspective() {
      return swiper.params.creativeEffect.perspective;
    },
    overwriteParams: function overwriteParams() {
      return {
        watchSlidesProgress: true,
        virtualTranslate: !swiper.params.cssMode
      };
    }
  });
}

/***/ }),

/***/ 603:
/*!****************************************************************************************************!*\
  !*** D:/project/前端/front/front/components/zebra-swiper/modules/effect-panorama/effect-panorama.js ***!
  \****************************************************************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = Panorama;
function Panorama(_ref) {
  var swiper = _ref.swiper,
    extendParams = _ref.extendParams,
    on = _ref.on;
  extendParams({
    panorama: {
      depth: 200,
      rotate: 30
    }
  });
  on('beforeInit', function () {
    if (swiper.params.effect !== 'panorama') return;
    swiper.classNames.push("".concat(swiper.params.containerModifierClass, "panorama"));
    swiper.classNames.push("".concat(swiper.params.containerModifierClass, "3d"));
    var overwriteParams = {
      watchSlidesProgress: true
    };
    Object.assign(swiper.params, overwriteParams);
    Object.assign(swiper.originalParams, overwriteParams);
  });
  on('progress', function () {
    if (swiper.params.effect !== 'panorama') return;
    var sizesGrid = swiper.slidesSizesGrid;
    var _swiper$params$panora = swiper.params.panorama,
      _swiper$params$panora2 = _swiper$params$panora.depth,
      depth = _swiper$params$panora2 === void 0 ? 200 : _swiper$params$panora2,
      _swiper$params$panora3 = _swiper$params$panora.rotate,
      rotate = _swiper$params$panora3 === void 0 ? 30 : _swiper$params$panora3;
    var angleRad = rotate * Math.PI / 180;
    var halfAngleRad = angleRad / 2;
    var angleModifier = 1 / (180 / rotate);
    for (var i = 0; i < swiper.slides.length; i += 1) {
      var slideEl = swiper.slides[i];
      var slideProgress = slideEl.progress;
      var slideSize = sizesGrid[i];
      var progressModifier = swiper.params.centeredSlides ? 0 : (swiper.params.slidesPerView - 1) * 0.5;
      var modifiedProgress = slideProgress + progressModifier;
      var angleCos = 1 - Math.cos(modifiedProgress * angleModifier * Math.PI);
      var translateX = "".concat(modifiedProgress * (slideSize / 3) * angleCos, "px");
      var rotateY = modifiedProgress * rotate;
      var radius = slideSize * 0.5 / Math.sin(halfAngleRad);
      var translateZ = "".concat(radius * angleCos - depth, "px");
      slideEl.transform("translateX(".concat(translateX, ") translateZ(").concat(translateZ, ") rotateY(").concat(rotateY, "deg)"));
      if (swiper.params.willChange) {
        slideEl.willChange("transform");
      }
      slideEl.addClass('swiper-slide-panorama');
    }
  });
  on('setTransition', function (s, duration) {
    if (swiper.params.effect !== 'panorama') return;
    swiper.slides.forEach(function (slideEl) {
      slideEl.transition(duration);
    });
  });
}

/***/ }),

/***/ 604:
/*!****************************************************************************************************!*\
  !*** D:/project/前端/front/front/components/zebra-swiper/modules/effect-carousel/effect-carousel.js ***!
  \****************************************************************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


var _interopRequireDefault = __webpack_require__(/*! @babel/runtime/helpers/interopRequireDefault */ 3);
Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = EffectCarousel;
var _effectInit = _interopRequireDefault(__webpack_require__(/*! ../../shared/effect-init.js */ 595));
var _effectTarget = _interopRequireDefault(__webpack_require__(/*! ../../shared/effect-target.js */ 596));
function EffectCarousel(_ref) {
  var swiper = _ref.swiper,
    extendParams = _ref.extendParams,
    on = _ref.on;
  extendParams({
    carouselEffect: {}
  });
  var setTranslate = function setTranslate() {
    var scaleStep = 0.2;
    var zIndexMax = swiper.slides.length;
    for (var i = 0; i < swiper.slides.length; i += 1) {
      var slideEl = swiper.slides[i];
      var slideProgress = swiper.slides[i].progress;
      var absProgress = Math.abs(slideProgress);
      var modify = 1;
      if (absProgress > 1) {
        modify = (absProgress - 1) * 0.3 + 1;
      }
      var translate = "".concat(slideProgress * modify * 50, "%");
      var scale = 1 - absProgress * scaleStep;
      var zIndex = zIndexMax - Math.abs(Math.round(slideProgress));
      var slideTransform = "translateX(".concat(translate, ") scale(").concat(scale, ")");
      slideEl.transform(slideTransform);
      slideEl.css({
        zIndex: zIndex
      });
      if (absProgress > 3) {
        slideEl.css({
          opacity: 0
        });
      } else {
        slideEl.css({
          opacity: 1
        });
      }
    }
  };
  var setTransition = function setTransition(duration) {
    var transformEl = swiper.params.coverflowEffect.transformEl;
    var $transitionElements = transformEl ? swiper.slides.find(transformEl) : swiper.slides;
    for (var i = 0; i < $transitionElements.length; i++) {
      $transitionElements[i].transition(duration);
    }
  };
  (0, _effectInit.default)({
    effect: 'carousel',
    swiper: swiper,
    on: on,
    setTranslate: setTranslate,
    setTransition: setTransition,
    perspective: function perspective() {
      return true;
    },
    overwriteParams: function overwriteParams() {
      return {
        watchSlidesProgress: true,
        slidesPerView: 'auto',
        centeredSlides: true
      };
    }
  });
}

/***/ }),

/***/ 605:
/*!******************************************************************************************!*\
  !*** D:/project/前端/front/front/components/zebra-swiper/modules/navigation/navigation.js ***!
  \******************************************************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = Navigation;
function Navigation(_ref) {
  var swiper = _ref.swiper,
    extendParams = _ref.extendParams,
    on = _ref.on,
    emit = _ref.emit;
  extendParams({
    navigation: {
      nextEl: null,
      prevEl: null,
      hideOnClick: false,
      disabledClass: 'swiper-button-disabled',
      hiddenClass: 'swiper-button-hidden',
      lockClass: 'swiper-button-lock'
    }
  });
  swiper.navigation = {
    nextEl: null,
    $nextEl: null,
    prevEl: null,
    $prevEl: null
  };
  function toggleEl($el, disabled) {
    if (!swiper.$wrapperEl) return;
    // debugger
    var params = swiper.params.navigation;
    if ($el) {
      swiper.$wrapperEl[disabled ? "add".concat($el) : "remove".concat($el)](params.disabledClass);
      if (swiper.params.watchOverflow && swiper.enabled) {
        swiper.$wrapperEl[swiper.isLocked ? "add".concat($el) : "remove".concat($el)](params.lockClass);
      }
    }
  }
  function update() {
    // Update Navigation Buttons
    if (swiper.params.loop) return;
    var _swiper$navigation = swiper.navigation,
      $nextEl = _swiper$navigation.$nextEl,
      $prevEl = _swiper$navigation.$prevEl;
    toggleEl('PrevElClass', swiper.isBeginning && !swiper.params.rewind);
    toggleEl('NextElClass', swiper.isEnd && !swiper.params.rewind);
  }
  function onPrevClick(e) {
    // e.preventDefault();
    if (swiper.isBeginning && !swiper.params.loop && !swiper.params.rewind) return;
    swiper.slidePrev();
  }
  function onNextClick() {
    // e.preventDefault();
    if (swiper.isEnd && !swiper.params.loop && !swiper.params.rewind) return;
    swiper.slideNext();
  }
  function init() {
    var params = swiper.params.navigation;
    if (params.slot || params.custom) {
      params.nextEl = true;
      params.prevEl = true;
    }
    if (!(params.nextEl || params.prevEl) && !params.slot && !params.custom) return;
    if (params.slot) {
      swiper.native.updateData({
        showPrevButtonSlot: true,
        showNextButtonSlot: true
      });
    } else if (params.custom) {} else {
      swiper.native.updateData({
        showPrevButton: true,
        showNextButton: true
      });
    }
    var $nextEl = params.nextEl;
    var $prevEl = params.prevEl;
    if ($nextEl) {
      swiper.on('nextClick', onNextClick);
    }
    if ($prevEl) {
      swiper.on('prevClick', onPrevClick);
    }
    Object.assign(swiper.navigation, {
      $nextEl: $nextEl,
      nextEl: $nextEl,
      $prevEl: $prevEl,
      prevEl: $prevEl
    });
    if (!swiper.enabled) {
      if ($nextEl) swiper.$wrapperEl.addNextElClass(params.lockClass);
      if ($prevEl) swiper.$wrapperEl.addPrevElClass(params.lockClass);
    }
  }
  function destroy() {
    var _swiper$navigation2 = swiper.navigation,
      $nextEl = _swiper$navigation2.$nextEl,
      $prevEl = _swiper$navigation2.$prevEl;
    if ($nextEl) {
      swiper.off('nextClick', onNextClick);
      swiper.$wrapperEl.removeNextElClass(swiper.params.navigation.disabledClass);
    }
    if ($prevEl) {
      swiper.off('prevClick', onPrevClick);
      swiper.$wrapperEl.removePrevElClass(swiper.params.navigation.disabledClass);
    }
  }
  on('init', function () {
    init();
    update();
  });
  on('toEdge fromEdge lock unlock', function () {
    update();
  });
  on('destroy', function () {
    destroy();
  });
  on('enable disable', function () {
    var _swiper$navigation3 = swiper.navigation,
      $nextEl = _swiper$navigation3.$nextEl,
      $prevEl = _swiper$navigation3.$prevEl;
    if ($nextEl) {
      swiper.$wrapperEl[swiper.enabled ? 'removeNextElClass' : 'addNextElClass'](swiper.params.navigation.lockClass);
      // $nextEl[swiper.enabled ? 'removeClass' : 'addClass'](swiper.params.navigation.lockClass);
    }

    if ($prevEl) {
      swiper.$wrapperEl[swiper.enabled ? 'removePrevElClass' : 'addPrevElClass'](swiper.params.navigation.lockClass);
      // $prevEl[swiper.enabled ? 'removeClass' : 'addClass'](swiper.params.navigation.lockClass);
    }
  });
  // on('click', (_s, e) => {
  // 	const {
  // 		$nextEl,
  // 		$prevEl
  // 	} = swiper.navigation;
  // 	const targetEl = e.target;
  // 	if (
  // 		swiper.params.navigation.hideOnClick &&
  // 		!$(targetEl).is($prevEl) &&
  // 		!$(targetEl).is($nextEl)
  // 	) {
  // 		if (
  // 			swiper.pagination &&
  // 			swiper.params.pagination &&
  // 			swiper.params.pagination.clickable &&
  // 			(swiper.pagination.el === targetEl || swiper.pagination.el.contains(targetEl))
  // 		)
  // 			return;
  // 		let isHidden;
  // 		if ($nextEl) {
  // 			isHidden = $nextEl.hasClass(swiper.params.navigation.hiddenClass);
  // 		} else if ($prevEl) {
  // 			isHidden = $prevEl.hasClass(swiper.params.navigation.hiddenClass);
  // 		}
  // 		if (isHidden === true) {
  // 			emit('navigationShow');
  // 		} else {
  // 			emit('navigationHide');
  // 		}
  // 		if ($nextEl) {
  // 			$nextEl.toggleClass(swiper.params.navigation.hiddenClass);
  // 		}
  // 		if ($prevEl) {
  // 			$prevEl.toggleClass(swiper.params.navigation.hiddenClass);
  // 		}
  // 	}
  // });

  Object.assign(swiper.navigation, {
    update: update,
    init: init,
    destroy: destroy
  });
}

/***/ }),

/***/ 606:
/*!******************************************************************************************!*\
  !*** D:/project/前端/front/front/components/zebra-swiper/modules/pagination/pagination.js ***!
  \******************************************************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


var _interopRequireDefault = __webpack_require__(/*! @babel/runtime/helpers/interopRequireDefault */ 3);
Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = Pagination;
var _toConsumableArray2 = _interopRequireDefault(__webpack_require__(/*! @babel/runtime/helpers/toConsumableArray */ 17));
var _defineProperty2 = _interopRequireDefault(__webpack_require__(/*! @babel/runtime/helpers/defineProperty */ 10));
var _classesToSelector = _interopRequireDefault(__webpack_require__(/*! ../../shared/classes-to-selector.js */ 607));
function Pagination(_ref) {
  var swiper = _ref.swiper,
    extendParams = _ref.extendParams,
    on = _ref.on,
    emit = _ref.emit;
  var pfx = 'swiper-pagination';
  extendParams({
    pagination: {
      el: null,
      bulletElement: 'span',
      clickable: false,
      hideOnClick: false,
      renderBullet: null,
      renderProgressbar: null,
      renderFraction: null,
      renderCustom: null,
      progressbarOpposite: false,
      type: 'bullets',
      // 'bullets' or 'progressbar' or 'fraction' or 'custom'
      dynamicBullets: false,
      dynamicMainBullets: 1,
      formatFractionCurrent: function formatFractionCurrent(number) {
        return number;
      },
      formatFractionTotal: function formatFractionTotal(number) {
        return number;
      },
      bulletClass: "".concat(pfx, "-bullet"),
      bulletActiveClass: "".concat(pfx, "-bullet-active"),
      modifierClass: "".concat(pfx, "-"),
      currentClass: "".concat(pfx, "-current"),
      totalClass: "".concat(pfx, "-total"),
      hiddenClass: "".concat(pfx, "-hidden"),
      progressbarFillClass: "".concat(pfx, "-progressbar-fill"),
      progressbarOppositeClass: "".concat(pfx, "-progressbar-opposite"),
      clickableClass: "".concat(pfx, "-clickable"),
      lockClass: "".concat(pfx, "-lock"),
      horizontalClass: "".concat(pfx, "-horizontal"),
      verticalClass: "".concat(pfx, "-vertical")
    }
  });
  swiper.pagination = {
    el: null,
    $el: null,
    bullets: []
  };
  var bulletSize;
  var dynamicBulletIndex = 0;
  function isPaginationDisabled() {
    return !swiper.params.pagination.el || !swiper.pagination.el || !swiper.pagination.$el;
  }
  function setSideBullets($bulletEl, position) {
    var bulletActiveClass = swiper.params.pagination.bulletActiveClass;
    var bullets = swiper.pagination.bullets;
    if (bullets[$bulletEl.index + position]) {
      bullets[$bulletEl.index + position].addPaginationItemClass("".concat(bulletActiveClass, "-").concat(position > 0 ? 'next' : 'prev'));
    }
    if (bullets[$bulletEl.index + (position > 0 ? position + 1 : position - 1)]) {
      bullets[$bulletEl.index + (position > 0 ? position + 1 : position - 1)].addPaginationItemClass("".concat(bulletActiveClass, "-").concat(position > 0 ? 'next' : 'prev', "-").concat(position > 0 ? 'next' : 'prev'));
    }
  }
  function update() {
    // Render || Update Pagination bullets/items
    var rtl = swiper.rtl;
    var params = swiper.params.pagination;
    if (isPaginationDisabled()) return;
    var slidesLength = swiper.virtual && swiper.params.virtual.enabled ? swiper.virtual.slides.length : swiper.slides.length;
    var $el = swiper.pagination.$el;
    // Current/Total
    var current;
    var total = swiper.params.loop ? Math.ceil((slidesLength - swiper.loopedSlides * 2) / swiper.params.slidesPerGroup) : swiper.snapGrid.length;
    if (swiper.params.loop) {
      current = Math.ceil((swiper.activeIndex - swiper.loopedSlides) / swiper.params.slidesPerGroup);
      if (current > slidesLength - 1 - swiper.loopedSlides * 2) {
        current -= slidesLength - swiper.loopedSlides * 2;
      }
      if (current > total - 1) current -= total;
      if (current < 0 && swiper.params.paginationType !== 'bullets') current = total + current;
    } else if (typeof swiper.snapIndex !== 'undefined') {
      current = swiper.snapIndex;
    } else {
      current = swiper.activeIndex || 0;
    }
    // Types
    if (params.type === 'bullets' && swiper.pagination.bullets && swiper.pagination.bullets.length > 0) {
      var bullets = swiper.pagination.bullets;
      var firstIndex;
      var lastIndex;
      var midIndex;
      if (params.dynamicBullets) {
        bulletSize = bullets[0][swiper.isHorizontal() ? 'outerWidth' : 'outerHeight'];
        swiper.$wrapperEl.paginationCss((0, _defineProperty2.default)({}, swiper.isHorizontal() ? 'width' : 'height', "".concat(bulletSize * (params.dynamicMainBullets + 4), "px")));
        if (params.dynamicMainBullets > 1 && swiper.previousIndex !== undefined) {
          dynamicBulletIndex += current - (swiper.previousIndex - swiper.loopedSlides || 0);
          if (dynamicBulletIndex > params.dynamicMainBullets - 1) {
            dynamicBulletIndex = params.dynamicMainBullets - 1;
          } else if (dynamicBulletIndex < 0) {
            dynamicBulletIndex = 0;
          }
        }
        firstIndex = Math.max(current - dynamicBulletIndex, 0);
        lastIndex = firstIndex + (Math.min(bullets.length, params.dynamicMainBullets) - 1);
        midIndex = (lastIndex + firstIndex) / 2;
      }
      bullets.forEach(function (item) {
        item.removePaginationItemClass(['', '-next', '-next-next', '-prev', '-prev-prev', '-main'].map(function (suffix) {
          return "".concat(params.bulletActiveClass).concat(suffix);
        }).join(' '));
      });
      if ($el.length > 1) {
        bullets.each(function (bullet) {
          var $bullet = $(bullet);
          var bulletIndex = $bullet.index();
          if (bulletIndex === current) {
            $bullet.addClass(params.bulletActiveClass);
          }
          if (params.dynamicBullets) {
            if (bulletIndex >= firstIndex && bulletIndex <= lastIndex) {
              $bullet.addClass("".concat(params.bulletActiveClass, "-main"));
            }
            if (bulletIndex === firstIndex) {
              setSideBullets($bullet, 'prev');
            }
            if (bulletIndex === lastIndex) {
              setSideBullets($bullet, 'next');
            }
          }
        });
      } else {
        var $bullet = bullets[current];
        var bulletIndex = $bullet.index;
        $bullet.addPaginationItemClass(params.bulletActiveClass);
        if (params.dynamicBullets) {
          var $firstDisplayedBullet = bullets[firstIndex];
          var $lastDisplayedBullet = bullets[lastIndex];
          for (var i = firstIndex; i <= lastIndex; i += 1) {
            bullets[i].addPaginationItemClass("".concat(params.bulletActiveClass, "-main"));
          }
          if (swiper.params.loop) {
            if (bulletIndex >= bullets.length) {
              for (var _i = params.dynamicMainBullets; _i >= 0; _i -= 1) {
                bullets[bullets.length - _i].addPaginationItemClass("".concat(params.bulletActiveClass, "-main"));
              }
              bullets[bullets.length - params.dynamicMainBullets - 1].addPaginationItemClass("".concat(params.bulletActiveClass, "-prev"));
            } else {
              setSideBullets($firstDisplayedBullet, -1);
              setSideBullets($lastDisplayedBullet, 1);
            }
          } else {
            setSideBullets($firstDisplayedBullet, -1);
            setSideBullets($lastDisplayedBullet, 1);
          }
        }
      }
      if (params.dynamicBullets) {
        var dynamicBulletsLength = Math.min(bullets.length, params.dynamicMainBullets + 4);
        var bulletsOffset = (bulletSize * dynamicBulletsLength - bulletSize) / 2 - midIndex * bulletSize;
        var offsetProp = rtl ? 'right' : 'left';
        bullets.forEach(function (item) {
          item.setCss((0, _defineProperty2.default)({}, swiper.isHorizontal() ? offsetProp : 'top', "".concat(bulletsOffset, "px")));
        });
        // bullets.css(swiper.isHorizontal() ? offsetProp : 'top', `${bulletsOffset}px`);
      }
    }

    if (params.type === 'fraction') {
      // $el
      // 	.find(classesToSelector(params.currentClass))
      // 	.text(params.formatFractionCurrent(current + 1));
      swiper.native.paginationContent.text = params.formatFractionCurrent(current + 1);
      swiper.native.paginationContent.total = params.formatFractionTotal(total);
      swiper.native.updateData({
        paginationContent: swiper.native.paginationContent
      });
      // $el.find(classesToSelector(params.totalClass)).text(params.formatFractionTotal(total));
    }

    if (params.type === 'progressbar') {
      var progressbarDirection;
      if (params.progressbarOpposite) {
        progressbarDirection = swiper.isHorizontal() ? 'vertical' : 'horizontal';
      } else {
        progressbarDirection = swiper.isHorizontal() ? 'horizontal' : 'vertical';
      }
      var scale = (current + 1) / total;
      var scaleX = 1;
      var scaleY = 1;
      if (progressbarDirection === 'horizontal') {
        scaleX = scale;
      } else {
        scaleY = scale;
      }
      // $el
      // .find(classesToSelector(params.progressbarFillClass))
      swiper.native.paginationContent.transform("translate3d(0,0,0) scaleX(".concat(scaleX, ") scaleY(").concat(scaleY, ")"));
      swiper.native.paginationContent.transition(swiper.params.speed);
      swiper.native.updateData({
        paginationContent: swiper.native.paginationContent
      });
    }
    if (params.type === 'custom' && params.renderCustom) {
      $el.html(params.renderCustom(swiper, current + 1, total));
      emit('paginationRender', $el[0]);
    } else {
      emit('paginationUpdate', $el[0]);
    }
    if (swiper.params.watchOverflow && swiper.enabled) {
      swiper.$wrapperEl[swiper.isLocked ? 'addPaginationClass' : 'removePaginationClass'](params.lockClass);
    }
  }
  function render() {
    // Render Container
    var params = swiper.params.pagination;
    if (isPaginationDisabled()) return;
    var slidesLength = swiper.virtual && swiper.params.virtual.enabled ? swiper.virtual.slides.length : swiper.slides.length;
    var $el = swiper.pagination.$el;
    var paginationHTML = 0;
    if (params.type === 'bullets') {
      var numberOfBullets = swiper.params.loop ? Math.ceil((slidesLength - swiper.loopedSlides * 2) / swiper.params.slidesPerGroup) : swiper.snapGrid.length;
      if (swiper.params.freeMode && swiper.params.freeMode.enabled && !swiper.params.loop && numberOfBullets > slidesLength) {
        numberOfBullets = slidesLength;
      }
      for (var i = 0; i < numberOfBullets; i += 1) {
        if (params.renderBullet) {
          paginationHTML += params.renderBullet.call(swiper, i, params.bulletClass);
        }
        // else {
        // 	paginationHTML +=
        // 		`<${params.bulletElement} class="${params.bulletClass}"></${params.bulletElement}>`;
        // }
        // paginationHTML += 1;
        else {
          swiper.native.paginationType = "bullets";
          swiper.native.paginationContent.push({
            index: i,
            outerWidth: 16,
            outerHeight: 16,
            classContent: [params.bulletClass],
            styleContent: {},
            addPaginationItemClass: function addPaginationItemClass(value) {
              this.classContent = Array.from(new Set([].concat((0, _toConsumableArray2.default)(this.classContent), (0, _toConsumableArray2.default)(value.split(" ")))));
            },
            removePaginationItemClass: function removePaginationItemClass(value) {
              this.classContent = this.classContent.filter(function (item) {
                return !value.split(" ").includes(item);
              });
            },
            setCss: function setCss(value) {
              var _this = this;
              // vueNative['itemStyle'] = {
              // 	...vueNative['itemStyle'],
              // 	...value
              // };Object.keys(value).forEach((item) => {
              Object.keys(value).forEach(function (item) {
                // this.$set(this.itemStyle, item, value[item])
                _this.styleContent[item] = value[item];
              });

              // this.$set(this.itemStyle, item, value[item])
            }
          });

          swiper.native.updateData({
            paginationType: swiper.native.paginationType,
            paginationContent: swiper.native.paginationContent
          });
        }
      }
      // $el.html(paginationHTML);

      // swiper.$wrapperEl.addPaginationItemClass(params.bulletClass)

      // swiper.pagination.bullets = $el.find(classesToSelector(params.bulletClass));
      swiper.pagination.bullets = swiper.native.paginationContent;
    }
    if (params.type === 'fraction') {
      if (params.renderFraction) {
        paginationHTML = params.renderFraction.call(swiper, params.currentClass, params.totalClass);
      } else {
        swiper.native.paginationType = "fraction";
        // paginationHTML =
        // 	`<span class="${params.currentClass}"></span>` +
        // 	' / ' +
        // 	`<span class="${params.totalClass}"></span>`;
        swiper.native.paginationContent = {
          currentClass: params.currentClass,
          totalClass: params.totalClass
        };
        swiper.native.updateData({
          paginationType: swiper.native.paginationType,
          paginationContent: swiper.native.paginationContent
        });
      }
    }
    if (params.type === 'progressbar') {
      if (params.renderProgressbar) {
        paginationHTML = params.renderProgressbar.call(swiper, params.progressbarFillClass);
      } else {
        swiper.native.paginationType = "progressbar";
        // paginationHTML = `<span class="${params.progressbarFillClass}"></span>`;
        swiper.native.paginationContent = {
          progressbarFillClass: params.progressbarFillClass,
          styleContent: {
            transform: '',
            transitionDuration: ''
          },
          transition: function transition(value) {
            this.styleContent.transitionDuration = "".concat(value, "ms");
          },
          transform: function transform(value) {
            this.styleContent.transform = value;
          }
        };
        swiper.native.updateData({
          paginationType: swiper.native.paginationType,
          paginationContent: swiper.native.paginationContent
        });
      }
      // $el.html(paginationHTML);
    }

    if (params.type !== 'custom') {
      emit('paginationRender', swiper.pagination.$el[0]);
    }
  }
  function init() {
    var params = swiper.params.pagination;
    if (!params.el) return;
    // swiper.native.showIndicators = true;
    swiper.native.updateData({
      showIndicators: true
    });
    var $el = params.el;
    if (params.type === 'bullets' && params.clickable) {
      swiper.$wrapperEl.addPaginationClass(params.clickableClass);
    }
    swiper.$wrapperEl.addPaginationClass(params.modifierClass + params.type);
    swiper.$wrapperEl.addPaginationClass(params.modifierClass + swiper.params.direction);
    if (params.type === 'bullets' && params.dynamicBullets) {
      swiper.$wrapperEl.addPaginationClass("".concat(params.modifierClass).concat(params.type, "-dynamic"));
      dynamicBulletIndex = 0;
      if (params.dynamicMainBullets < 1) {
        params.dynamicMainBullets = 1;
      }
    }
    if (params.type === 'progressbar' && params.progressbarOpposite) {
      swiper.$wrapperEl.addPaginationClass(params.progressbarOppositeClass);
    }
    if (params.clickable) {
      swiper.on('paginationItemClick', function onClick(_s, itemIndex) {
        var index = itemIndex * swiper.params.slidesPerGroup;
        if (swiper.params.loop) index += swiper.loopedSlides;
        swiper.slideTo(index);
      });
    }
    Object.assign(swiper.pagination, {
      $el: $el,
      el: $el
    });
    if (!swiper.enabled) {
      swiper.$wrapperEl.addPaginationClass(params.lockClass);
    }
  }
  function destroy() {
    var params = swiper.params.pagination;
    if (isPaginationDisabled()) return;
    var $el = swiper.pagination.$el;
    if (params.clickable) {
      swiper.off('paginationItemClick', (0, _classesToSelector.default)(params.bulletClass));
    }
  }
  on('init update', function () {
    if (swiper.native.paginationContent) {
      swiper.native.updateData({
        paginationContent: []
      });
    }
    // swiper.native.paginationContent = [];
    init();
    render();
    update();
  });
  on('activeIndexChange', function () {
    if (swiper.params.loop) {
      update();
    } else if (typeof swiper.snapIndex === 'undefined') {
      update();
    }
  });
  on('snapIndexChange', function () {
    if (!swiper.params.loop) {
      update();
    }
  });
  on('slidesLengthChange', function () {
    if (swiper.params.loop) {
      render();
      update();
    }
  });
  on('snapGridLengthChange', function () {
    if (!swiper.params.loop) {
      render();
      update();
    }
  });
  on('destroy', function () {
    destroy();
  });
  on('enable disable', function () {
    var $el = swiper.pagination.$el;
    if ($el) {
      $el[swiper.enabled ? 'removeClass' : 'addClass'](swiper.params.pagination.lockClass);
    }
  });
  on('lock unlock', function () {
    update();
  });
  on('click', function (_s, e) {
    var targetEl = e.target;
    var $el = swiper.pagination.$el;
    if (swiper.params.pagination.el && swiper.params.pagination.hideOnClick && $el.length > 0 && !$(targetEl).hasClass(swiper.params.pagination.bulletClass)) {
      if (swiper.navigation && (swiper.navigation.nextEl && targetEl === swiper.navigation.nextEl || swiper.navigation.prevEl && targetEl === swiper.navigation.prevEl)) return;
      var isHidden = $el.hasClass(swiper.params.pagination.hiddenClass);
      if (isHidden === true) {
        emit('paginationShow');
      } else {
        emit('paginationHide');
      }
      $el.toggleClass(swiper.params.pagination.hiddenClass);
    }
  });
  Object.assign(swiper.pagination, {
    render: render,
    update: update,
    init: init,
    destroy: destroy
  });
}

/***/ }),

/***/ 607:
/*!***************************************************************************************!*\
  !*** D:/project/前端/front/front/components/zebra-swiper/shared/classes-to-selector.js ***!
  \***************************************************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = classesToSelector;
function classesToSelector() {
  var classes = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : '';
  return ".".concat(classes.trim().replace(/([\.:!\/])/g, '\\$1') // eslint-disable-line
  .replace(/ /g, '.'));
}

/***/ }),

/***/ 608:
/*!**********************************************************************************!*\
  !*** D:/project/前端/front/front/components/zebra-swiper/modules/thumbs/thumbs.js ***!
  \**********************************************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = Thumb;
var _utils = __webpack_require__(/*! ../../shared/utils.js */ 538);
// import $ from '../../shared/dom.js';

function Thumb(_ref) {
  var swiper = _ref.swiper,
    extendParams = _ref.extendParams,
    on = _ref.on;
  extendParams({
    thumbs: {
      swiper: null,
      multipleActiveThumbs: true,
      autoScrollOffset: 0,
      slideThumbActiveClass: 'swiper-slide-thumb-active',
      thumbsContainerClass: 'swiper-thumbs'
    }
  });
  var initialized = false;
  var swiperCreated = false;
  swiper.thumbs = {
    swiper: null
  };
  function onThumbClick() {
    var thumbsSwiper = swiper.thumbs.swiper;
    if (!thumbsSwiper) return;
    var clickedIndex = thumbsSwiper.clickedIndex;
    var clickedSlide = thumbsSwiper.clickedSlide;
    if (clickedSlide && clickedSlide.hasClass(swiper.params.thumbs.slideThumbActiveClass)) return;
    if (typeof clickedIndex === 'undefined' || clickedIndex === null) return;
    var slideToIndex;
    if (thumbsSwiper.params.loop) {
      slideToIndex = parseInt($(thumbsSwiper.clickedSlide).attr('data-swiper-slide-index'), 10);
    } else {
      slideToIndex = clickedIndex;
    }
    if (swiper.params.loop) {
      var currentIndex = swiper.activeIndex;
      if (swiper.slides.eq(currentIndex).hasClass(swiper.params.slideDuplicateClass)) {
        swiper.loopFix();
        // eslint-disable-next-line
        swiper._clientLeft = swiper.$wrapperEl[0].clientLeft;
        currentIndex = swiper.activeIndex;
      }
      var prevIndex = swiper.slides.eq(currentIndex).prevAll("[data-swiper-slide-index=\"".concat(slideToIndex, "\"]")).eq(0).index();
      var nextIndex = swiper.slides.eq(currentIndex).nextAll("[data-swiper-slide-index=\"".concat(slideToIndex, "\"]")).eq(0).index();
      if (typeof prevIndex === 'undefined') slideToIndex = nextIndex;else if (typeof nextIndex === 'undefined') slideToIndex = prevIndex;else if (nextIndex - currentIndex < currentIndex - prevIndex) slideToIndex = nextIndex;else slideToIndex = prevIndex;
    }
    swiper.slideTo(slideToIndex);
  }
  function init() {
    var thumbsParams = swiper.params.thumbs;
    if (initialized) return false;
    initialized = true;
    var SwiperClass = swiper.constructor;
    if (thumbsParams.swiper instanceof SwiperClass) {
      swiper.thumbs.swiper = thumbsParams.swiper;
      Object.assign(swiper.thumbs.swiper.originalParams, {
        watchSlidesProgress: true,
        slideToClickedSlide: false
      });
      Object.assign(swiper.thumbs.swiper.params, {
        watchSlidesProgress: true,
        slideToClickedSlide: false
      });
    } else if ((0, _utils.isObject)(thumbsParams.swiper)) {
      var thumbsSwiperParams = Object.assign({}, thumbsParams.swiper);
      Object.assign(thumbsSwiperParams, {
        watchSlidesProgress: true,
        slideToClickedSlide: false
      });
      swiper.thumbs.swiper = new SwiperClass(thumbsSwiperParams);
      swiperCreated = true;
    }
    swiper.thumbs.swiper.$el && swiper.thumbs.swiper.$el.addClass(swiper.params.thumbs.thumbsContainerClass);
    swiper.thumbs.swiper.on('slideClick', onThumbClick);
    return true;
  }
  function update(initial) {
    var thumbsSwiper = swiper.thumbs.swiper;
    if (!thumbsSwiper) return;
    var slidesPerView = thumbsSwiper.params.slidesPerView === 'auto' ? thumbsSwiper.slidesPerViewDynamic() : thumbsSwiper.params.slidesPerView;
    var autoScrollOffset = swiper.params.thumbs.autoScrollOffset;
    var useOffset = autoScrollOffset && !thumbsSwiper.params.loop;
    if (swiper.realIndex !== thumbsSwiper.realIndex || useOffset) {
      var currentThumbsIndex = thumbsSwiper.activeIndex;
      var newThumbsIndex;
      var direction;
      if (thumbsSwiper.params.loop) {
        if (thumbsSwiper.slides.eq(currentThumbsIndex).hasClass(thumbsSwiper.params.slideDuplicateClass)) {
          thumbsSwiper.loopFix();
          // eslint-disable-next-line
          thumbsSwiper._clientLeft = thumbsSwiper.$wrapperEl[0].clientLeft;
          currentThumbsIndex = thumbsSwiper.activeIndex;
        }
        // Find actual thumbs index to slide to
        var prevThumbsIndex = thumbsSwiper.slides.eq(currentThumbsIndex).prevAll("[data-swiper-slide-index=\"".concat(swiper.realIndex, "\"]")).eq(0).index();
        var nextThumbsIndex = thumbsSwiper.slides.eq(currentThumbsIndex).nextAll("[data-swiper-slide-index=\"".concat(swiper.realIndex, "\"]")).eq(0).index();
        if (typeof prevThumbsIndex === 'undefined') {
          newThumbsIndex = nextThumbsIndex;
        } else if (typeof nextThumbsIndex === 'undefined') {
          newThumbsIndex = prevThumbsIndex;
        } else if (nextThumbsIndex - currentThumbsIndex === currentThumbsIndex - prevThumbsIndex) {
          newThumbsIndex = thumbsSwiper.params.slidesPerGroup > 1 ? nextThumbsIndex : currentThumbsIndex;
        } else if (nextThumbsIndex - currentThumbsIndex < currentThumbsIndex - prevThumbsIndex) {
          newThumbsIndex = nextThumbsIndex;
        } else {
          newThumbsIndex = prevThumbsIndex;
        }
        direction = swiper.activeIndex > swiper.previousIndex ? 'next' : 'prev';
      } else {
        newThumbsIndex = swiper.realIndex;
        direction = newThumbsIndex > swiper.previousIndex ? 'next' : 'prev';
      }
      if (useOffset) {
        newThumbsIndex += direction === 'next' ? autoScrollOffset : -1 * autoScrollOffset;
      }
      if (thumbsSwiper.visibleSlidesIndexes && thumbsSwiper.visibleSlidesIndexes.indexOf(newThumbsIndex) < 0) {
        if (thumbsSwiper.params.centeredSlides) {
          if (newThumbsIndex > currentThumbsIndex) {
            newThumbsIndex = newThumbsIndex - Math.floor(slidesPerView / 2) + 1;
          } else {
            newThumbsIndex = newThumbsIndex + Math.floor(slidesPerView / 2) - 1;
          }
        } else if (newThumbsIndex > currentThumbsIndex && thumbsSwiper.params.slidesPerGroup === 1) {
          // newThumbsIndex = newThumbsIndex - slidesPerView + 1;
        }
        thumbsSwiper.slideTo(newThumbsIndex, initial ? 0 : undefined);
      }
    }

    // Activate thumbs
    var thumbsToActivate = 1;
    var thumbActiveClass = swiper.params.thumbs.slideThumbActiveClass;
    if (swiper.params.slidesPerView > 1 && !swiper.params.centeredSlides) {
      thumbsToActivate = swiper.params.slidesPerView;
    }
    if (!swiper.params.thumbs.multipleActiveThumbs) {
      thumbsToActivate = 1;
    }
    thumbsToActivate = Math.floor(thumbsToActivate);
    // thumbsSwiper.slides.removeClass(thumbActiveClass);
    thumbsSwiper.slides.forEach(function (item) {
      item.addClass(swiper.params.slideThumbsClass);
      item.removeClass(thumbActiveClass);
    });
    if (thumbsSwiper.params.loop || thumbsSwiper.params.virtual && thumbsSwiper.params.virtual.enabled) {
      for (var i = 0; i < thumbsToActivate; i += 1) {
        thumbsSwiper.$wrapperEl.children("[data-swiper-slide-index=\"".concat(swiper.realIndex + i, "\"]")).addClass(thumbActiveClass);
      }
    } else {
      for (var _i = 0; _i < thumbsToActivate; _i += 1) {
        thumbsSwiper.slides[swiper.realIndex + _i].addClass(thumbActiveClass);
      }
    }
  }
  on('beforeInit', function () {
    var thumbs = swiper.params.thumbs;
    if (!thumbs || !thumbs.swiper) return;
    init();
    update(true);
  });
  on('slideChange update resize observerUpdate', function () {
    if (!swiper.thumbs.swiper) return;
    update();
  });
  on('setTransition', function (_s, duration) {
    var thumbsSwiper = swiper.thumbs.swiper;
    if (!thumbsSwiper) return;
    thumbsSwiper.setTransition(duration);
  });
  on('beforeDestroy', function () {
    var thumbsSwiper = swiper.thumbs.swiper;
    if (!thumbsSwiper) return;
    if (swiperCreated && thumbsSwiper) {
      thumbsSwiper.destroy();
    }
  });
  Object.assign(swiper.thumbs, {
    init: init,
    update: update
  });
}

/***/ }),

/***/ 609:
/*!****************************************************************************************!*\
  !*** D:/project/前端/front/front/components/zebra-swiper/modules/scrollbar/scrollbar.js ***!
  \****************************************************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


var _interopRequireDefault = __webpack_require__(/*! @babel/runtime/helpers/interopRequireDefault */ 3);
Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = Scrollbar;
var _regenerator = _interopRequireDefault(__webpack_require__(/*! @babel/runtime/regenerator */ 53));
var _asyncToGenerator2 = _interopRequireDefault(__webpack_require__(/*! @babel/runtime/helpers/asyncToGenerator */ 55));
var _utils = __webpack_require__(/*! ../../shared/utils.js */ 538);
function Scrollbar(_ref) {
  var swiper = _ref.swiper,
    extendParams = _ref.extendParams,
    on = _ref.on,
    emit = _ref.emit;
  var isTouched = false;
  var timeout = null;
  var dragTimeout = null;
  var dragStartPos;
  var dragSize;
  var trackSize;
  var divider;
  extendParams({
    scrollbar: {
      el: null,
      dragSize: 'auto',
      hide: false,
      draggable: false,
      snapOnRelease: true,
      lockClass: 'swiper-scrollbar-lock',
      dragClass: 'swiper-scrollbar-drag'
    }
  });
  swiper.scrollbar = {
    el: null,
    dragEl: null,
    $el: null,
    $dragEl: null
  };
  function setTranslate() {
    if (!swiper.params.scrollbar.el || !swiper.scrollbar.el) return;
    var scrollbar = swiper.scrollbar,
      rtl = swiper.rtlTranslate,
      progress = swiper.progress;
    var params = swiper.params.scrollbar;
    var newSize = dragSize;
    var newPos = (trackSize - dragSize) * progress;
    if (rtl) {
      newPos = -newPos;
      if (newPos > 0) {
        newSize = dragSize - newPos;
        newPos = 0;
      } else if (-newPos + dragSize > trackSize) {
        newSize = trackSize + newPos;
      }
    } else if (newPos < 0) {
      newSize = dragSize + newPos;
      newPos = 0;
    } else if (newPos + dragSize > trackSize) {
      newSize = trackSize - newPos;
    }
    if (swiper.isHorizontal()) {
      swiper.$wrapperEl.scrollbarItemTransform("translate3d(".concat(newPos, "px, 0, 0)"));
      swiper.$wrapperEl.scrollbarItemCss({
        width: "".concat(newSize, "px")
      });
    } else {
      swiper.$wrapperEl.scrollbarItemTransform("translate3d(0px, ".concat(newPos, "px, 0)"));
      swiper.$wrapperEl.scrollbarItemCss({
        height: "".concat(newSize, "px")
      });
    }
    if (params.hide) {
      clearTimeout(timeout);
      swiper.$wrapperEl.scrollbarCss({
        opacity: 1
      });
      timeout = setTimeout(function () {
        swiper.$wrapperEl.scrollbarCss({
          opacity: 0
        });
        swiper.$wrapperEl.scrollbarTransition(400);
      }, 1000);
    }
  }
  function setTransition(duration) {
    if (!swiper.params.scrollbar.el || !swiper.scrollbar.el) return;
    swiper.$wrapperEl.scrollbarItemTransition(duration);
  }
  function updateSize() {
    return _updateSize.apply(this, arguments);
  }
  function _updateSize() {
    _updateSize = (0, _asyncToGenerator2.default)( /*#__PURE__*/_regenerator.default.mark(function _callee2() {
      var scrollbar, $el, methods, rectInfo;
      return _regenerator.default.wrap(function _callee2$(_context2) {
        while (1) {
          switch (_context2.prev = _context2.next) {
            case 0:
              if (!(!swiper.params.scrollbar.el || !swiper.scrollbar.el)) {
                _context2.next = 2;
                break;
              }
              return _context2.abrupt("return");
            case 2:
              scrollbar = swiper.scrollbar;
              $el = scrollbar.$el, methods = scrollbar.methods;
              swiper.$wrapperEl.scrollbarItemCss({
                width: '',
                height: ''
              });
              _context2.next = 7;
              return swiper.native.getRectScrollbar();
            case 7:
              rectInfo = _context2.sent;
              methods.offset = function () {
                return rectInfo;
              };
              trackSize = swiper.isHorizontal() ? rectInfo.width : rectInfo.height;
              divider = swiper.size / (swiper.virtualSize + swiper.params.slidesOffsetBefore - (swiper.params.centeredSlides ? swiper.snapGrid[0] : 0));
              if (swiper.params.scrollbar.dragSize === 'auto') {
                dragSize = trackSize * divider;
              } else {
                dragSize = parseInt(swiper.params.scrollbar.dragSize, 10);
              }
              if (swiper.isHorizontal()) {
                swiper.$wrapperEl.scrollbarItemCss({
                  width: "".concat(dragSize, "px")
                });
              } else {
                swiper.$wrapperEl.scrollbarItemCss({
                  height: "".concat(dragSize, "px")
                });
              }
              if (divider >= 1) {
                swiper.$wrapperEl.scrollbarCss({
                  display: 'none'
                });
              } else {
                swiper.$wrapperEl.scrollbarCss({
                  display: ''
                });
              }
              if (swiper.params.scrollbar.hide) {
                swiper.$wrapperEl.scrollbarCss({
                  opacity: 0
                });
              }
              if (swiper.params.watchOverflow && swiper.enabled) {
                swiper.$wrapperEl[swiper.isLocked ? 'addScrollbarClass' : 'removeScrollbarClass'](swiper.params.scrollbar.lockClass);
              }
            case 16:
            case "end":
              return _context2.stop();
          }
        }
      }, _callee2);
    }));
    return _updateSize.apply(this, arguments);
  }
  function getPointerPosition(e) {
    if (swiper.isHorizontal()) {
      return e.type === 'touchstart' || e.type === 'touchmove' || 'touchStart' || e.type === 'touchMove' ? e.touches[0].clientX : e.clientX;
    }
    return e.type === 'touchstart' || e.type === 'touchmove' ? e.touches[0].clientY : e.clientY;
  }
  function setDragPosition(e) {
    var scrollbar = swiper.scrollbar,
      rtl = swiper.rtlTranslate;
    var $el = scrollbar.$el,
      methods = scrollbar.methods;
    var positionRatio;
    positionRatio = (getPointerPosition(e) - methods.offset()[swiper.isHorizontal() ? 'left' : 'top'] - (dragStartPos !== null ? dragStartPos : dragSize / 2)) / (trackSize - dragSize);
    positionRatio = Math.max(Math.min(positionRatio, 1), 0);
    if (rtl) {
      positionRatio = 1 - positionRatio;
    }
    var position = swiper.minTranslate() + (swiper.maxTranslate() - swiper.minTranslate()) * positionRatio;
    swiper.updateProgress(position);
    swiper.setTranslate(position);
    swiper.updateActiveIndex();
    swiper.updateSlidesClasses();
  }
  function onDragStart(_s, e) {
    var params = swiper.params.scrollbar;
    var scrollbar = swiper.scrollbar,
      $wrapperEl = swiper.$wrapperEl;
    isTouched = true;
    dragStartPos =
    // e.target ===
    //  $dragEl[0] || e.target === $dragEl ?
    // getPointerPosition(e) -
    // e.target.getBoundingClientRect()[swiper.isHorizontal() ? 'left' : 'top'] :
    null;
    // e.preventDefault();
    // e.stopPropagation();

    $wrapperEl.transition(100);
    swiper.$wrapperEl.scrollbarItemTransition(100);
    // $dragEl.transition(100);
    setDragPosition(e);
    clearTimeout(dragTimeout);
    swiper.$wrapperEl.scrollbarTransition(0);
    if (params.hide) {
      swiper.$wrapperEl.scrollbarCss({
        opacity: 1
      });
    }
    if (swiper.params.cssMode) {
      swiper.$wrapperEl.css({
        'scroll-snap-type': 'none'
      });
    }
    emit('scrollbarDragStart', e);
  }
  function onDragMove(_s, e) {
    var scrollbar = swiper.scrollbar,
      $wrapperEl = swiper.$wrapperEl;
    if (!isTouched) return;
    setDragPosition(e);
    $wrapperEl.transition(0);
    swiper.$wrapperEl.scrollbarTransition(0);
    swiper.$wrapperEl.scrollbarItemTransition(0);
    emit('scrollbarDragMove', e);
  }
  function onDragEnd(_s, e) {
    var params = swiper.params.scrollbar;
    var scrollbar = swiper.scrollbar,
      $wrapperEl = swiper.$wrapperEl;
    var $el = scrollbar.$el;
    if (!isTouched) return;
    isTouched = false;
    if (swiper.params.cssMode) {
      swiper.$wrapperEl.css({
        'scroll-snap-type': ''
      });
      $wrapperEl.transition('');
    }
    if (params.hide) {
      clearTimeout(dragTimeout);
      dragTimeout = (0, _utils.nextTick)(function () {
        swiper.$wrapperEl.scrollbarCss({
          opacity: 0
        });
        swiper.$wrapperEl.scrollbarTransition(400);
      }, 1000);
    }
    emit('scrollbarDragEnd', e);
    if (params.snapOnRelease) {
      swiper.slideToClosest();
    }
  }
  function events(method) {
    var scrollbar = swiper.scrollbar,
      touchEventsTouch = swiper.touchEventsTouch,
      touchEventsDesktop = swiper.touchEventsDesktop,
      params = swiper.params,
      support = swiper.support;
    var $el = scrollbar.$el;
    var target = $el;
    var activeListener = support.passiveListener && params.passiveListeners ? {
      passive: false,
      capture: false
    } : false;
    var passiveListener = support.passiveListener && params.passiveListeners ? {
      passive: true,
      capture: false
    } : false;
    if (!target) return;
    var eventMethod = method === 'on' ? 'on' : 'off';
    if (!support.touch) {
      swiper[eventMethod]('touchStartScrollbar', onDragStart, activeListener);
      swiper[eventMethod]('touchMoveScrollbar', onDragMove, activeListener);
      swiper[eventMethod]('touchEndScrollbar', onDragEnd, passiveListener);
    } else {
      swiper[eventMethod]('touchStartScrollbar', onDragStart, activeListener);
      swiper[eventMethod]('touchMoveScrollbar', onDragMove, activeListener);
      swiper[eventMethod]('touchEndScrollbar', onDragEnd, passiveListener);
    }
  }
  function enableDraggable() {
    if (!swiper.params.scrollbar.el) return;
    events('on');
  }
  function disableDraggable() {
    if (!swiper.params.scrollbar.el) return;
    events('off');
  }
  function init() {
    var scrollbar = swiper.scrollbar;
    var params = swiper.params.scrollbar;
    if (!params.el) return;
    // swiper.native.updateData({
    // 	scrollbarShow: true
    // })
    var $el = params.el;
    Object.assign(scrollbar, {
      $el: $el,
      el: $el,
      methods: {}
    });
    if (params.draggable) {
      enableDraggable();
    }
    swiper.$wrapperEl[swiper.enabled ? 'removeScrollbarClass' : 'addScrollbarClass'](swiper.params.scrollbar.lockClass);
    return true;
  }
  function destroy() {
    disableDraggable();
  }
  on('init', /*#__PURE__*/(0, _asyncToGenerator2.default)( /*#__PURE__*/_regenerator.default.mark(function _callee() {
    return _regenerator.default.wrap(function _callee$(_context) {
      while (1) {
        switch (_context.prev = _context.next) {
          case 0:
            _context.next = 2;
            return init();
          case 2:
            updateSize();
            setTranslate();
          case 4:
          case "end":
            return _context.stop();
        }
      }
    }, _callee);
  })));
  on('update resize observerUpdate lock unlock', function () {
    updateSize();
  });
  on('setTranslate', function () {
    setTranslate();
  });
  on('setTransition', function (_s, duration) {
    setTransition(duration);
  });
  on('enable disable', function () {
    var $el = swiper.scrollbar.$el;
    if ($el) {
      $el[swiper.enabled ? 'removeClass' : 'addClass'](swiper.params.scrollbar.lockClass);
    }
  });
  on('destroy', function () {
    destroy();
  });
  Object.assign(swiper.scrollbar, {
    updateSize: updateSize,
    setTranslate: setTranslate,
    init: init,
    destroy: destroy
  });
}

/***/ }),

/***/ 610:
/*!************************************************************************************!*\
  !*** D:/project/前端/front/front/components/zebra-swiper/modules/virtual/virtual.js ***!
  \************************************************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


var _interopRequireDefault = __webpack_require__(/*! @babel/runtime/helpers/interopRequireDefault */ 3);
Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = Virtual;
var _regenerator = _interopRequireDefault(__webpack_require__(/*! @babel/runtime/regenerator */ 53));
var _typeof2 = _interopRequireDefault(__webpack_require__(/*! @babel/runtime/helpers/typeof */ 12));
var _asyncToGenerator2 = _interopRequireDefault(__webpack_require__(/*! @babel/runtime/helpers/asyncToGenerator */ 55));
function Virtual(_ref) {
  var swiper = _ref.swiper,
    extendParams = _ref.extendParams,
    on = _ref.on;
  extendParams({
    virtual: {
      enabled: false,
      slides: [],
      cache: true,
      renderSlide: null,
      renderExternal: null,
      renderExternalUpdate: true,
      addSlidesBefore: 0,
      addSlidesAfter: 0
    }
  });
  var cssModeTimeout;
  swiper.virtual = {
    cache: {},
    from: undefined,
    to: undefined,
    slides: [],
    offset: 0,
    slidesGrid: []
  };
  function renderSlide(slide, index) {
    var params = swiper.params.virtual;
    if (params.cache && swiper.virtual.cache[index]) {
      return swiper.virtual.cache[index];
    }
    // const $slideEl = params.renderSlide ?
    // 	$(params.renderSlide.call(swiper, slide, index)) :
    // 	$(
    // 		`<div class="${swiper.params.slideClass}" data-swiper-slide-index="${index}">${slide}</div>`,
    // 	);
    // if (!$slideEl.attr('data-swiper-slide-index')) $slideEl.attr('data-swiper-slide-index', index);
    // if (params.cache) swiper.virtual.cache[index] = $slideEl;
    // return $slideEl;
  }

  function onRendered() {
    swiper.updateSlides();
    swiper.updateProgress();
    swiper.updateSlidesClasses();
    if (swiper.lazy && swiper.params.lazy.enabled) {
      swiper.lazy.load();
    }
  }
  function update(_x) {
    return _update.apply(this, arguments);
  }
  function _update() {
    _update = (0, _asyncToGenerator2.default)( /*#__PURE__*/_regenerator.default.mark(function _callee2(force) {
      var _swiper$params, slidesPerView, slidesPerGroup, centeredSlides, _swiper$params$virtua, addSlidesBefore, addSlidesAfter, _swiper$virtual, previousFrom, previousTo, slides, previousSlidesGrid, previousOffset, activeIndex, offsetProp, slidesAfter, slidesBefore, from, to, offset, onRendered, prependIndexes, appendIndexes, _loop, i, _i2;
      return _regenerator.default.wrap(function _callee2$(_context2) {
        while (1) {
          switch (_context2.prev = _context2.next) {
            case 0:
              onRendered = function _onRendered() {
                swiper.updateSlides();
                swiper.updateProgress();
                swiper.updateSlidesClasses();
                if (swiper.lazy && swiper.params.lazy.enabled) {
                  swiper.lazy.load();
                }
              };
              _swiper$params = swiper.params, slidesPerView = _swiper$params.slidesPerView, slidesPerGroup = _swiper$params.slidesPerGroup, centeredSlides = _swiper$params.centeredSlides;
              _swiper$params$virtua = swiper.params.virtual, addSlidesBefore = _swiper$params$virtua.addSlidesBefore, addSlidesAfter = _swiper$params$virtua.addSlidesAfter;
              _swiper$virtual = swiper.virtual, previousFrom = _swiper$virtual.from, previousTo = _swiper$virtual.to, slides = _swiper$virtual.slides, previousSlidesGrid = _swiper$virtual.slidesGrid, previousOffset = _swiper$virtual.offset;
              if (!swiper.params.cssMode) {
                swiper.updateActiveIndex();
              }
              activeIndex = swiper.activeIndex || 0;
              if (swiper.rtlTranslate) offsetProp = 'right';else offsetProp = swiper.isHorizontal() ? 'left' : 'top';
              if (centeredSlides) {
                slidesAfter = Math.floor(slidesPerView / 2) + slidesPerGroup + addSlidesAfter;
                slidesBefore = Math.floor(slidesPerView / 2) + slidesPerGroup + addSlidesBefore;
              } else {
                slidesAfter = slidesPerView + (slidesPerGroup - 1) + addSlidesAfter;
                slidesBefore = slidesPerGroup + addSlidesBefore;
              }
              from = Math.max((activeIndex || 0) - slidesBefore, 0);
              to = Math.min((activeIndex || 0) + slidesAfter, slides.length - 1);
              offset = (swiper.slidesGrid[from] || 0) - (swiper.slidesGrid[0] || 0);
              Object.assign(swiper.virtual, {
                from: from,
                to: to,
                offset: offset,
                slidesGrid: swiper.slidesGrid
              });
              if (!(previousFrom === from && previousTo === to && !force)) {
                _context2.next = 16;
                break;
              }
              if (swiper.slidesGrid !== previousSlidesGrid && offset !== previousOffset) {
                swiper.slides.css(offsetProp, "".concat(offset, "px"));
              }
              swiper.updateProgress();
              return _context2.abrupt("return");
            case 16:
              if (!swiper.params.virtual.renderExternal) {
                _context2.next = 20;
                break;
              }
              swiper.params.virtual.renderExternal.call(swiper, {
                offset: offset,
                from: from,
                to: to,
                slides: function getSlides() {
                  var slidesToRender = [];
                  if (swiper.params.virtual.type == 'keep') {
                    for (var i = 0; i < from; i += 1) {
                      slidesToRender.push("");
                    }
                  }
                  for (var _i = from; _i <= to; _i += 1) {
                    slidesToRender.push(slides[_i]);
                  }
                  return slidesToRender;
                }()
              });
              if (swiper.params.virtual.renderExternalUpdate) {
                onRendered();
              }
              return _context2.abrupt("return");
            case 20:
              prependIndexes = [];
              appendIndexes = [];
              if (force) {
                swiper.$wrapperEl.find(".".concat(swiper.params.slideClass)).remove();
              } else {
                _loop = function _loop(i) {
                  if (i < from || i > to) {
                    swiper.virtualList.splice(swiper.virtualList.findIndex(function (item) {
                      return item == slides[i];
                    }), 1);
                    swiper.virtualIndexList.splice(swiper.virtualIndexList.findIndex(function (item) {
                      return item == i;
                    }), 1);
                    // swiper.slides[i].virtualShow = false;
                  }
                };
                for (i = previousFrom; i <= previousTo; i += 1) {
                  _loop(i);
                }
              }
              for (_i2 = 0; _i2 < slides.length; _i2 += 1) {
                if (_i2 >= from && _i2 <= to) {
                  if (typeof previousTo === 'undefined' || force) {
                    appendIndexes.push(_i2);
                  } else {
                    if (_i2 > previousTo) appendIndexes.push(_i2);
                    if (_i2 < previousFrom) prependIndexes.push(_i2);
                  }
                }
              }
              // let list = [];
              appendIndexes.forEach(function (index) {
                // if (swiper.slides[index]) {
                // 	swiper.slides[index].virtualShow = true;
                // } else {
                swiper.virtualList.push(slides[index]);
                swiper.virtualIndexList.push(index);
                // }

                // renderSlide(slides[index], index)
                // renderSlide(slides[index], index)
                // swiper.$wrapperEl.append(renderSlide(slides[index], index));
              });

              prependIndexes.sort(function (a, b) {
                return b - a;
              }).forEach(function (index) {
                // swiper.slides[index].virtualShow = true;
                swiper.virtualList.unshift(slides[index]);
                swiper.virtualIndexList.unshift(index);

                // swiper.$wrapperEl.prepend(renderSlide(slides[index], index));
              });

              swiper.native.emit("input", [swiper.virtualList]);
              onRendered();
            case 28:
            case "end":
              return _context2.stop();
          }
        }
      }, _callee2);
    }));
    return _update.apply(this, arguments);
  }
  function appendSlide(slides) {
    if ((0, _typeof2.default)(slides) === 'object' && 'length' in slides) {
      for (var i = 0; i < slides.length; i += 1) {
        if (slides[i]) swiper.virtual.slides.push(slides[i]);
      }
    } else {
      swiper.virtual.slides.push(slides);
    }
    update(true);
  }
  function prependSlide(slides) {
    var activeIndex = swiper.activeIndex;
    var newActiveIndex = activeIndex + 1;
    var numberOfNewSlides = 1;
    if (Array.isArray(slides)) {
      for (var i = 0; i < slides.length; i += 1) {
        if (slides[i]) swiper.virtual.slides.unshift(slides[i]);
      }
      newActiveIndex = activeIndex + slides.length;
      numberOfNewSlides = slides.length;
    } else {
      swiper.virtual.slides.unshift(slides);
    }
    if (swiper.params.virtual.cache) {
      var cache = swiper.virtual.cache;
      var newCache = {};
      Object.keys(cache).forEach(function (cachedIndex) {
        var $cachedEl = cache[cachedIndex];
        var cachedElIndex = $cachedEl.attr('data-swiper-slide-index');
        if (cachedElIndex) {
          $cachedEl.attr('data-swiper-slide-index', parseInt(cachedElIndex, 10) + numberOfNewSlides);
        }
        newCache[parseInt(cachedIndex, 10) + numberOfNewSlides] = $cachedEl;
      });
      swiper.virtual.cache = newCache;
    }
    update(true);
    swiper.slideTo(newActiveIndex, 0);
  }
  function removeSlide(slidesIndexes) {
    if (typeof slidesIndexes === 'undefined' || slidesIndexes === null) return;
    var activeIndex = swiper.activeIndex;
    if (Array.isArray(slidesIndexes)) {
      for (var i = slidesIndexes.length - 1; i >= 0; i -= 1) {
        swiper.virtual.slides.splice(slidesIndexes[i], 1);
        if (swiper.params.virtual.cache) {
          delete swiper.virtual.cache[slidesIndexes[i]];
        }
        if (slidesIndexes[i] < activeIndex) activeIndex -= 1;
        activeIndex = Math.max(activeIndex, 0);
      }
    } else {
      swiper.virtual.slides.splice(slidesIndexes, 1);
      if (swiper.params.virtual.cache) {
        delete swiper.virtual.cache[slidesIndexes];
      }
      if (slidesIndexes < activeIndex) activeIndex -= 1;
      activeIndex = Math.max(activeIndex, 0);
    }
    update(true);
    swiper.slideTo(activeIndex, 0);
  }
  function removeAllSlides() {
    swiper.virtual.slides = [];
    if (swiper.params.virtual.cache) {
      swiper.virtual.cache = {};
    }
    update(true);
    swiper.slideTo(0, 0);
  }
  on('beforeInit', function () {
    if (!swiper.params.virtual.enabled) return;
    swiper.virtual.slides = swiper.params.virtual.slides;
    swiper.classNames.push("".concat(swiper.params.containerModifierClass, "virtual"));
    swiper.params.watchSlidesProgress = true;
    swiper.originalParams.watchSlidesProgress = true;
    if (!swiper.params.initialSlide) {
      update();
    }
  });
  // on('beforeUpdate', () => {
  // 	if (!swiper.params.virtual.enabled) return;
  // 	let offsetProp;
  // 	if (swiper.rtlTranslate) offsetProp = 'right';
  // 	else offsetProp = swiper.isHorizontal() ? 'left' : 'top';
  // 	swiper.slides.forEach((item, index) => {
  // 		item.dataSwiperSlideIndex = swiper.virtualIndexList[index];
  // 		item.css({
  // 			[offsetProp]: `${swiper.virtual.offset}px`
  // 		})
  // 	})
  // })
  on('setTranslate', /*#__PURE__*/(0, _asyncToGenerator2.default)( /*#__PURE__*/_regenerator.default.mark(function _callee() {
    return _regenerator.default.wrap(function _callee$(_context) {
      while (1) {
        switch (_context.prev = _context.next) {
          case 0:
            if (swiper.params.virtual.enabled) {
              _context.next = 2;
              break;
            }
            return _context.abrupt("return");
          case 2:
            if (swiper.params.cssMode && !swiper._immediateVirtual) {
              clearTimeout(cssModeTimeout);
              cssModeTimeout = setTimeout(function () {
                update();
              }, 100);
            } else {
              console.log("update==========");
              clearTimeout(cssModeTimeout);
              cssModeTimeout = setTimeout(function () {
                update();
              }, 100);
              // update();
            }
          case 3:
          case "end":
            return _context.stop();
        }
      }
    }, _callee);
  })));
  Object.assign(swiper.virtual, {
    appendSlide: appendSlide,
    prependSlide: prependSlide,
    removeSlide: removeSlide,
    removeAllSlides: removeAllSlides,
    update: update
  });
}

/***/ }),

/***/ 611:
/*!********************************************************************************************!*\
  !*** D:/project/前端/front/front/components/zebra-swiper/modules/will-change/will-change.js ***!
  \********************************************************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = WillChange;
function WillChange(_ref) {
  var swiper = _ref.swiper,
    extendParams = _ref.extendParams,
    on = _ref.on;
  on('setTransition', function (s, duration) {
    if (!swiper.params.willChange) return;
    if (swiper.params.effect == "slide" || swiper.params.effect == "cube" || swiper.params.effect == "coverflow" || swiper.params.effect == "panorama") {
      swiper.$wrapperEl.willChange("transform");
    }
  });
  on('transitionEnd', function (s, duration) {
    if (!swiper.params.willChange) return;
    swiper.$wrapperEl.willChange("auto");
    swiper.slides.forEach(function (item) {
      item.$itemEl.willChange("auto");
    });
  });
}

/***/ }),

/***/ 612:
/*!****************************************************************************!*\
  !*** D:/project/前端/front/front/components/zebra-swiper/libs/vue2/utils.js ***!
  \****************************************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


var _interopRequireDefault = __webpack_require__(/*! @babel/runtime/helpers/interopRequireDefault */ 3);
Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.extend = extend;
exports.isObject = isObject;
exports.needsNavigation = needsNavigation;
exports.needsPagination = needsPagination;
exports.needsScrollbar = needsScrollbar;
exports.uniqueClasses = uniqueClasses;
var _typeof2 = _interopRequireDefault(__webpack_require__(/*! @babel/runtime/helpers/typeof */ 12));
function isObject(o) {
  return (0, _typeof2.default)(o) === 'object' && o !== null && o.constructor && Object.prototype.toString.call(o).slice(8, -1) === 'Object';
}
function extend(target, src) {
  var noExtend = ['__proto__', 'constructor', 'prototype'];
  Object.keys(src).filter(function (key) {
    return noExtend.indexOf(key) < 0;
  }).forEach(function (key) {
    if (typeof target[key] === 'undefined') target[key] = src[key];else if (isObject(src[key]) && isObject(target[key]) && Object.keys(src[key]).length > 0) {
      if (src[key].__swiper__) target[key] = src[key];else extend(target[key], src[key]);
    } else {
      target[key] = src[key];
    }
  });
}
function needsNavigation() {
  var props = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : {};
  return props.navigation && typeof props.navigation.nextEl === 'undefined' && typeof props.navigation.prevEl === 'undefined';
}
function needsPagination() {
  var props = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : {};
  return props.pagination && typeof props.pagination.el === 'undefined';
}
function needsScrollbar() {
  var props = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : {};
  return props.scrollbar;
}
function uniqueClasses() {
  var classNames = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : '';
  var classes = classNames.split(' ').map(function (c) {
    return c.trim();
  }).filter(function (c) {
    return !!c;
  });
  var unique = [];
  classes.forEach(function (c) {
    if (unique.indexOf(c) < 0) unique.push(c);
  });
  return unique.join(' ');
}

/***/ }),

/***/ 613:
/*!**********************************************************************************!*\
  !*** D:/project/前端/front/front/components/zebra-swiper/libs/vue2/params-list.js ***!
  \**********************************************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.paramsList = void 0;
/* underscore in name -> watch for changes */
var paramsList = ['modules', 'init', '_direction', 'touchEventsTarget', 'initialSlide', '_speed', 'cssMode', 'updateOnWindowResize', 'resizeObserver', 'nested', 'focusableElements', '_enabled', '_width', '_height', 'preventInteractionOnTransition', 'userAgent', 'url', '_edgeSwipeDetection', '_edgeSwipeThreshold', '_freeMode', '_autoHeight', 'setWrapperSize', 'virtualTranslate', '_effect', 'breakpoints', '_spaceBetween', '_slidesPerView', 'maxBackfaceHiddenSlides', '_grid', '_slidesPerGroup', '_slidesPerGroupSkip', '_slidesPerGroupAuto', '_centeredSlides', '_centeredSlidesBounds', '_slidesOffsetBefore', '_slidesOffsetAfter', 'normalizeSlideIndex', '_centerInsufficientSlides', '_watchOverflow', 'roundLengths', 'touchRatio', 'touchAngle', 'simulateTouch', '_shortSwipes', '_longSwipes', 'longSwipesRatio', 'longSwipesMs', '_followFinger', 'allowTouchMove', '_threshold', 'touchMoveStopPropagation', 'touchStartPreventDefault', 'touchStartForcePreventDefault', 'touchReleaseOnEdges', 'uniqueNavElements', '_resistance', '_resistanceRatio', '_watchSlidesProgress', '_grabCursor', 'preventClicks', 'preventClicksPropagation', '_slideToClickedSlide', '_preloadImages', 'updateOnImagesReady', '_loop', '_loopAdditionalSlides', '_loopedSlides', '_loopFillGroupWithBlank', 'loopPreventsSlide', '_rewind', '_allowSlidePrev', '_allowSlideNext', '_swipeHandler', '_noSwiping', 'noSwipingClass', 'noSwipingSelector', 'passiveListeners', 'containerModifierClass', 'slideClass', 'slideBlankClass', 'slideActiveClass', 'slideDuplicateActiveClass', 'slideVisibleClass', 'slideDuplicateClass', 'slideNextClass', 'slideDuplicateNextClass', 'slidePrevClass', 'slideDuplicatePrevClass', 'wrapperClass', 'runCallbacksOnInit', 'observer', 'observeParents', 'observeSlideChildren',
// modules
'a11y', '_autoplay', '_controller', 'coverflowEffect', 'cubeEffect', 'fadeEffect', 'flipEffect', 'creativeEffect', 'cardsEffect', 'hashNavigation', 'history', 'keyboard', 'lazy', 'mousewheel', '_navigation', '_pagination', 'parallax', '_scrollbar', '_thumbs', '_virtual', 'zoom'];
exports.paramsList = paramsList;

/***/ }),

/***/ 614:
/*!**********************************************************************************!*\
  !*** D:/project/前端/front/front/components/zebra-swiper/libs/vue2/init-swiper.js ***!
  \**********************************************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


var _interopRequireDefault = __webpack_require__(/*! @babel/runtime/helpers/interopRequireDefault */ 3);
Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.initSwiper = initSwiper;
exports.mountSwiper = mountSwiper;
var _index = _interopRequireDefault(__webpack_require__(/*! ../../index.js */ 536));
var _utils = __webpack_require__(/*! ./utils.js */ 612);
function initSwiper(swiperParams, native) {
  return new _index.default(swiperParams, native);
}
function mountSwiper(_ref, swiperParams) {
  var el = _ref.el,
    nextEl = _ref.nextEl,
    prevEl = _ref.prevEl,
    paginationEl = _ref.paginationEl,
    scrollbarEl = _ref.scrollbarEl,
    swiper = _ref.swiper;
  if ((0, _utils.needsNavigation)(swiperParams) && nextEl && prevEl) {
    swiper.params.navigation.nextEl = nextEl;
    swiper.originalParams.navigation.nextEl = nextEl;
    swiper.params.navigation.prevEl = prevEl;
    swiper.originalParams.navigation.prevEl = prevEl;
  }
  if ((0, _utils.needsPagination)(swiperParams) && paginationEl) {
    swiper.params.pagination.el = paginationEl;
    swiper.originalParams.pagination.el = paginationEl;
  }
  if ((0, _utils.needsScrollbar)(swiperParams) && scrollbarEl) {
    swiper.params.scrollbar.el = scrollbarEl;
    swiper.originalParams.scrollbar.el = scrollbarEl;
  }
  swiper.init(el);
}

/***/ }),

/***/ 615:
/*!***************************************************************************!*\
  !*** D:/project/前端/front/front/components/zebra-swiper/libs/vue2/loop.js ***!
  \***************************************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


var _interopRequireDefault = __webpack_require__(/*! @babel/runtime/helpers/interopRequireDefault */ 3);
Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.calcLoopedSlides = calcLoopedSlides;
exports.renderLoop = renderLoop;
var _toConsumableArray2 = _interopRequireDefault(__webpack_require__(/*! @babel/runtime/helpers/toConsumableArray */ 17));
var _index = _interopRequireDefault(__webpack_require__(/*! ../../index.js */ 536));
function calcLoopedSlides(slides, swiperParams) {
  var slidesPerViewParams = swiperParams.slidesPerView;
  if (swiperParams.breakpoints) {
    var breakpoint = _index.default.prototype.getBreakpoint(swiperParams.breakpoints);
    var breakpointOnlyParams = breakpoint in swiperParams.breakpoints ? swiperParams.breakpoints[breakpoint] : undefined;
    if (breakpointOnlyParams && breakpointOnlyParams.slidesPerView) {
      slidesPerViewParams = breakpointOnlyParams.slidesPerView;
    }
  }
  var loopedSlides = Math.ceil(parseFloat(swiperParams.loopedSlides || slidesPerViewParams, 10));
  loopedSlides += swiperParams.loopAdditionalSlides;
  if (loopedSlides > slides.length) {
    loopedSlides = slides.length;
  }
  return loopedSlides;
}
function renderLoop(native, swiperParams, data) {
  var modifiedValue = data;
  if (swiperParams.loopFillGroupWithBlank) {
    var blankSlidesNum = swiperParams.slidesPerGroup - modifiedValue.length % swiperParams.slidesPerGroup;
    if (blankSlidesNum !== swiperParams.slidesPerGroup) {
      for (var i = 0; i < blankSlidesNum; i += 1) {
        var blankSlide = h('div', {
          class: "".concat(swiperParams.slideClass, " ").concat(swiperParams.slideBlankClass)
        });
        modifiedValue.push(blankSlide);
      }
    }
  }
  if (swiperParams.slidesPerView === 'auto' && !swiperParams.loopedSlides) {
    swiperParams.loopedSlides = modifiedValue.length;
  }
  var loopedSlides = calcLoopedSlides(modifiedValue, swiperParams);
  var prependSlides = [];
  var appendSlides = [];
  var prependValue = [];
  var appendValue = [];
  modifiedValue.forEach(function (child, index) {
    if (index < loopedSlides) {
      if (!native.loopUpdateData) {
        appendValue.push(child);
      }
    }
    if (index < modifiedValue.length && index >= modifiedValue.length - loopedSlides) {
      if (!native.loopUpdateData) {
        prependValue.push(child);
      }
    }
  });
  if (native) {
    if (!native.originalDataList) native.originalDataList = [];
    native.originalDataList = [].concat(prependValue, (0, _toConsumableArray2.default)(modifiedValue), appendValue);
  }
  return {
    data: [].concat(prependValue, (0, _toConsumableArray2.default)(modifiedValue), appendValue)
  };
}

/***/ }),

/***/ 616:
/*!*****************************************************************************************!*\
  !*** D:/project/前端/front/front/components/zebra-swiper/libs/vue2/get-changed-params.js ***!
  \*****************************************************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.getChangedParams = getChangedParams;
var _paramsList = __webpack_require__(/*! ./params-list.js */ 613);
var _utils = __webpack_require__(/*! ./utils.js */ 612);
function getChangedParams(swiperParams, oldParams, children, oldChildren) {
  var keys = [];
  if (!oldParams) return keys;
  var addKey = function addKey(key) {
    if (keys.indexOf(key) < 0) keys.push(key);
  };
  var oldChildrenKeys = oldChildren.map(function (child) {
    return child.props && child.props.key;
  });
  var childrenKeys = children.map(function (child) {
    return child.props && child.props.key;
  });
  if (oldChildrenKeys.join('') !== childrenKeys.join('')) keys.push('children');
  if (oldChildren.length !== children.length) keys.push('children');
  var watchParams = _paramsList.paramsList.filter(function (key) {
    return key[0] === '_';
  }).map(function (key) {
    return key.replace(/_/, '');
  });
  watchParams.forEach(function (key) {
    if (key in swiperParams && key in oldParams) {
      if ((0, _utils.isObject)(swiperParams[key]) && (0, _utils.isObject)(oldParams[key])) {
        var newKeys = Object.keys(swiperParams[key]);
        var oldKeys = Object.keys(oldParams[key]);
        if (newKeys.length !== oldKeys.length) {
          addKey(key);
        } else {
          newKeys.forEach(function (newKey) {
            if (swiperParams[key][newKey] !== oldParams[key][newKey]) {
              addKey(key);
            }
          });
          oldKeys.forEach(function (oldKey) {
            if (swiperParams[key][oldKey] !== oldParams[key][oldKey]) addKey(key);
          });
        }
      } else if (swiperParams[key] !== oldParams[key]) {
        addKey(key);
      }
    } else if (key in swiperParams && !(key in oldParams)) {
      addKey(key);
    } else if (!(key in swiperParams) && key in oldParams) {
      addKey(key);
    }
  });
  return keys;
}

/***/ }),

/***/ 617:
/*!************************************************************************************!*\
  !*** D:/project/前端/front/front/components/zebra-swiper/libs/vue2/update-swiper.js ***!
  \************************************************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


var _interopRequireDefault = __webpack_require__(/*! @babel/runtime/helpers/interopRequireDefault */ 3);
Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.updateSwiper = updateSwiper;
var _regenerator = _interopRequireDefault(__webpack_require__(/*! @babel/runtime/regenerator */ 53));
var _asyncToGenerator2 = _interopRequireDefault(__webpack_require__(/*! @babel/runtime/helpers/asyncToGenerator */ 55));
var _utils = __webpack_require__(/*! ./utils.js */ 612);
function updateSwiper(_x) {
  return _updateSwiper.apply(this, arguments);
}
function _updateSwiper() {
  _updateSwiper = (0, _asyncToGenerator2.default)( /*#__PURE__*/_regenerator.default.mark(function _callee(_ref) {
    var swiper, slides, passedParams, changedParams, nextEl, prevEl, paginationEl, scrollbarEl, updateParams, currentParams, pagination, navigation, scrollbar, virtual, thumbs, needThumbsInit, needControllerInit, needPaginationInit, needScrollbarInit, needNavigationInit, destroyModule, initialized;
    return _regenerator.default.wrap(function _callee$(_context) {
      while (1) {
        switch (_context.prev = _context.next) {
          case 0:
            swiper = _ref.swiper, slides = _ref.slides, passedParams = _ref.passedParams, changedParams = _ref.changedParams, nextEl = _ref.nextEl, prevEl = _ref.prevEl, paginationEl = _ref.paginationEl, scrollbarEl = _ref.scrollbarEl;
            updateParams = changedParams.filter(function (key) {
              return key !== 'children' && key !== 'direction';
            });
            currentParams = swiper.params, pagination = swiper.pagination, navigation = swiper.navigation, scrollbar = swiper.scrollbar, virtual = swiper.virtual, thumbs = swiper.thumbs;
            if (changedParams.includes('thumbs') && passedParams.thumbs && passedParams.thumbs.swiper && currentParams.thumbs && !currentParams.thumbs.swiper) {
              needThumbsInit = true;
            }
            if (changedParams.includes('controller') && passedParams.controller && passedParams.controller.control && currentParams.controller && !currentParams.controller.control) {
              needControllerInit = true;
            }
            if (changedParams.includes('pagination') && passedParams.pagination && (passedParams.pagination.el || paginationEl) && (currentParams.pagination || currentParams.pagination === false) && pagination && !pagination.el) {
              needPaginationInit = true;
            }
            if (changedParams.includes('scrollbar') && passedParams.scrollbar && (passedParams.scrollbar.el || scrollbarEl) && (currentParams.scrollbar || currentParams.scrollbar === false) && scrollbar && !scrollbar.el) {
              needScrollbarInit = true;
            }
            if (changedParams.includes('navigation') && passedParams.navigation && (passedParams.navigation.prevEl || prevEl) && (passedParams.navigation.nextEl || nextEl) && (currentParams.navigation || currentParams.navigation === false) && navigation && !navigation.prevEl && !navigation.nextEl) {
              needNavigationInit = true;
            }
            destroyModule = function destroyModule(mod) {
              if (!swiper[mod]) return;
              swiper[mod].destroy();
              if (mod === 'navigation') {
                currentParams[mod].prevEl = undefined;
                currentParams[mod].nextEl = undefined;
                swiper[mod].prevEl = undefined;
                swiper[mod].nextEl = undefined;
              } else {
                currentParams[mod].el = undefined;
                swiper[mod].el = undefined;
              }
            };
            updateParams.forEach(function (key) {
              if ((0, _utils.isObject)(currentParams[key]) && (0, _utils.isObject)(passedParams[key])) {
                (0, _utils.extend)(currentParams[key], passedParams[key]);
              } else {
                var newValue = passedParams[key];
                if ((newValue === true || newValue === false) && (key === 'navigation' || key === 'pagination' || key === 'scrollbar')) {
                  if (newValue === false) {
                    destroyModule(key);
                  }
                } else {
                  currentParams[key] = passedParams[key];
                }
              }
            });
            // if (changedParams.includes('virtual') && virtual && currentParams.virtual.enabled) {
            // 	virtual.update();
            // }
            if (changedParams.includes('children') && virtual && currentParams.virtual.enabled) {
              // virtual.slides = slides;
              virtual.update(true);
            } else if (changedParams.includes('children') && swiper.lazy && swiper.params.lazy.enabled) {
              swiper.lazy.load();
            }
            if (needThumbsInit) {
              initialized = thumbs.init();
              if (initialized) thumbs.update(true);
            }
            if (needControllerInit) {
              swiper.controller.control = currentParams.controller.control;
            }
            if (needPaginationInit) {
              if (paginationEl) currentParams.pagination.el = paginationEl;
              pagination.init();
              pagination.render();
              pagination.update();
            }
            if (needScrollbarInit) {
              if (scrollbarEl) currentParams.scrollbar.el = scrollbarEl;
              scrollbar.init();
              scrollbar.updateSize();
              scrollbar.setTranslate();
            }
            if (needNavigationInit) {
              if (nextEl) currentParams.navigation.nextEl = nextEl;
              if (prevEl) currentParams.navigation.prevEl = prevEl;
              navigation.init();
              navigation.update();
            }
            if (changedParams.includes('allowSlideNext')) {
              swiper.allowSlideNext = passedParams.allowSlideNext;
            }
            if (changedParams.includes('allowSlidePrev')) {
              swiper.allowSlidePrev = passedParams.allowSlidePrev;
            }
            if (changedParams.includes('direction')) {
              swiper.changeDirection(passedParams.direction, false);
            }
            swiper.update();
          case 20:
          case "end":
            return _context.stop();
        }
      }
    }, _callee);
  }));
  return _updateSwiper.apply(this, arguments);
}

/***/ }),

/***/ 618:
/*!******************************************************************************!*\
  !*** D:/project/前端/front/front/components/zebra-swiper/libs/vue2/virtual.js ***!
  \******************************************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


var _interopRequireDefault = __webpack_require__(/*! @babel/runtime/helpers/interopRequireDefault */ 3);
Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.renderVirtual = renderVirtual;
exports.updateOnVirtualData = updateOnVirtualData;
var _defineProperty2 = _interopRequireDefault(__webpack_require__(/*! @babel/runtime/helpers/defineProperty */ 10));
function ownKeys(object, enumerableOnly) { var keys = Object.keys(object); if (Object.getOwnPropertySymbols) { var symbols = Object.getOwnPropertySymbols(object); enumerableOnly && (symbols = symbols.filter(function (sym) { return Object.getOwnPropertyDescriptor(object, sym).enumerable; })), keys.push.apply(keys, symbols); } return keys; }
function _objectSpread(target) { for (var i = 1; i < arguments.length; i++) { var source = null != arguments[i] ? arguments[i] : {}; i % 2 ? ownKeys(Object(source), !0).forEach(function (key) { (0, _defineProperty2.default)(target, key, source[key]); }) : Object.getOwnPropertyDescriptors ? Object.defineProperties(target, Object.getOwnPropertyDescriptors(source)) : ownKeys(Object(source)).forEach(function (key) { Object.defineProperty(target, key, Object.getOwnPropertyDescriptor(source, key)); }); } return target; }
// import { h } from 'vue';

function updateOnVirtualData(swiper) {
  if (!swiper || swiper.destroyed || !swiper.params.virtual || swiper.params.virtual && !swiper.params.virtual.enabled) return;
  swiper.updateSlides();
  swiper.updateProgress();
  swiper.updateSlidesClasses();
  if (swiper.lazy && swiper.params.lazy.enabled) {
    swiper.lazy.load();
  }
  if (swiper.parallax && swiper.params.parallax && swiper.params.parallax.enabled) {
    swiper.parallax.setTranslate();
  }
}
function renderVirtual(swiperRef, slides, virtualData) {
  if (!virtualData) return null;
  var style = swiperRef.isHorizontal() ? (0, _defineProperty2.default)({}, swiperRef.rtlTranslate ? 'right' : 'left', "".concat(virtualData.offset, "px")) : {
    top: "".concat(virtualData.offset, "px")
  };
  return slides.filter(function (slide, index) {
    return index >= virtualData.from && index <= virtualData.to;
  }).map(function (slide) {
    if (!slide.props) slide.props = {};
    if (!slide.props.style) slide.props.style = {};
    slide.props.swiperRef = swiperRef;
    slide.props.style = style;
    return h(slide.type, _objectSpread({}, slide.props), slide.children);
  });
}

/***/ }),

/***/ 642:
/*!***************************************************************************!*\
  !*** D:/project/前端/front/front/components/w-picker/city-data/province.js ***!
  \***************************************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;
/* eslint-disable */
var provinceData = [{
  "label": "北京市",
  "value": "11"
}, {
  "label": "天津市",
  "value": "12"
}, {
  "label": "河北省",
  "value": "13"
}, {
  "label": "山西省",
  "value": "14"
}, {
  "label": "内蒙古自治区",
  "value": "15"
}, {
  "label": "辽宁省",
  "value": "21"
}, {
  "label": "吉林省",
  "value": "22"
}, {
  "label": "黑龙江省",
  "value": "23"
}, {
  "label": "上海市",
  "value": "31"
}, {
  "label": "江苏省",
  "value": "32"
}, {
  "label": "浙江省",
  "value": "33"
}, {
  "label": "安徽省",
  "value": "34"
}, {
  "label": "福建省",
  "value": "35"
}, {
  "label": "江西省",
  "value": "36"
}, {
  "label": "山东省",
  "value": "37"
}, {
  "label": "河南省",
  "value": "41"
}, {
  "label": "湖北省",
  "value": "42"
}, {
  "label": "湖南省",
  "value": "43"
}, {
  "label": "广东省",
  "value": "44"
}, {
  "label": "广西壮族自治区",
  "value": "45"
}, {
  "label": "海南省",
  "value": "46"
}, {
  "label": "重庆市",
  "value": "50"
}, {
  "label": "四川省",
  "value": "51"
}, {
  "label": "贵州省",
  "value": "52"
}, {
  "label": "云南省",
  "value": "53"
}, {
  "label": "西藏自治区",
  "value": "54"
}, {
  "label": "陕西省",
  "value": "61"
}, {
  "label": "甘肃省",
  "value": "62"
}, {
  "label": "青海省",
  "value": "63"
}, {
  "label": "宁夏回族自治区",
  "value": "64"
}, {
  "label": "新疆维吾尔自治区",
  "value": "65"
}, {
  "label": "台湾",
  "value": "66"
}, {
  "label": "香港",
  "value": "67"
}, {
  "label": "澳门",
  "value": "68"
}];
var _default = provinceData;
exports.default = _default;

/***/ }),

/***/ 643:
/*!***********************************************************************!*\
  !*** D:/project/前端/front/front/components/w-picker/city-data/city.js ***!
  \***********************************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;
/* eslint-disable */
var cityData = [[{
  "label": "市辖区",
  "value": "1101"
}], [{
  "label": "市辖区",
  "value": "1201"
}], [{
  "label": "石家庄市",
  "value": "1301"
}, {
  "label": "唐山市",
  "value": "1302"
}, {
  "label": "秦皇岛市",
  "value": "1303"
}, {
  "label": "邯郸市",
  "value": "1304"
}, {
  "label": "邢台市",
  "value": "1305"
}, {
  "label": "保定市",
  "value": "1306"
}, {
  "label": "张家口市",
  "value": "1307"
}, {
  "label": "承德市",
  "value": "1308"
}, {
  "label": "沧州市",
  "value": "1309"
}, {
  "label": "廊坊市",
  "value": "1310"
}, {
  "label": "衡水市",
  "value": "1311"
}], [{
  "label": "太原市",
  "value": "1401"
}, {
  "label": "大同市",
  "value": "1402"
}, {
  "label": "阳泉市",
  "value": "1403"
}, {
  "label": "长治市",
  "value": "1404"
}, {
  "label": "晋城市",
  "value": "1405"
}, {
  "label": "朔州市",
  "value": "1406"
}, {
  "label": "晋中市",
  "value": "1407"
}, {
  "label": "运城市",
  "value": "1408"
}, {
  "label": "忻州市",
  "value": "1409"
}, {
  "label": "临汾市",
  "value": "1410"
}, {
  "label": "吕梁市",
  "value": "1411"
}], [{
  "label": "呼和浩特市",
  "value": "1501"
}, {
  "label": "包头市",
  "value": "1502"
}, {
  "label": "乌海市",
  "value": "1503"
}, {
  "label": "赤峰市",
  "value": "1504"
}, {
  "label": "通辽市",
  "value": "1505"
}, {
  "label": "鄂尔多斯市",
  "value": "1506"
}, {
  "label": "呼伦贝尔市",
  "value": "1507"
}, {
  "label": "巴彦淖尔市",
  "value": "1508"
}, {
  "label": "乌兰察布市",
  "value": "1509"
}, {
  "label": "兴安盟",
  "value": "1522"
}, {
  "label": "锡林郭勒盟",
  "value": "1525"
}, {
  "label": "阿拉善盟",
  "value": "1529"
}], [{
  "label": "沈阳市",
  "value": "2101"
}, {
  "label": "大连市",
  "value": "2102"
}, {
  "label": "鞍山市",
  "value": "2103"
}, {
  "label": "抚顺市",
  "value": "2104"
}, {
  "label": "本溪市",
  "value": "2105"
}, {
  "label": "丹东市",
  "value": "2106"
}, {
  "label": "锦州市",
  "value": "2107"
}, {
  "label": "营口市",
  "value": "2108"
}, {
  "label": "阜新市",
  "value": "2109"
}, {
  "label": "辽阳市",
  "value": "2110"
}, {
  "label": "盘锦市",
  "value": "2111"
}, {
  "label": "铁岭市",
  "value": "2112"
}, {
  "label": "朝阳市",
  "value": "2113"
}, {
  "label": "葫芦岛市",
  "value": "2114"
}], [{
  "label": "长春市",
  "value": "2201"
}, {
  "label": "吉林市",
  "value": "2202"
}, {
  "label": "四平市",
  "value": "2203"
}, {
  "label": "辽源市",
  "value": "2204"
}, {
  "label": "通化市",
  "value": "2205"
}, {
  "label": "白山市",
  "value": "2206"
}, {
  "label": "松原市",
  "value": "2207"
}, {
  "label": "白城市",
  "value": "2208"
}, {
  "label": "延边朝鲜族自治州",
  "value": "2224"
}], [{
  "label": "哈尔滨市",
  "value": "2301"
}, {
  "label": "齐齐哈尔市",
  "value": "2302"
}, {
  "label": "鸡西市",
  "value": "2303"
}, {
  "label": "鹤岗市",
  "value": "2304"
}, {
  "label": "双鸭山市",
  "value": "2305"
}, {
  "label": "大庆市",
  "value": "2306"
}, {
  "label": "伊春市",
  "value": "2307"
}, {
  "label": "佳木斯市",
  "value": "2308"
}, {
  "label": "七台河市",
  "value": "2309"
}, {
  "label": "牡丹江市",
  "value": "2310"
}, {
  "label": "黑河市",
  "value": "2311"
}, {
  "label": "绥化市",
  "value": "2312"
}, {
  "label": "大兴安岭地区",
  "value": "2327"
}], [{
  "label": "市辖区",
  "value": "3101"
}], [{
  "label": "南京市",
  "value": "3201"
}, {
  "label": "无锡市",
  "value": "3202"
}, {
  "label": "徐州市",
  "value": "3203"
}, {
  "label": "常州市",
  "value": "3204"
}, {
  "label": "苏州市",
  "value": "3205"
}, {
  "label": "南通市",
  "value": "3206"
}, {
  "label": "连云港市",
  "value": "3207"
}, {
  "label": "淮安市",
  "value": "3208"
}, {
  "label": "盐城市",
  "value": "3209"
}, {
  "label": "扬州市",
  "value": "3210"
}, {
  "label": "镇江市",
  "value": "3211"
}, {
  "label": "泰州市",
  "value": "3212"
}, {
  "label": "宿迁市",
  "value": "3213"
}], [{
  "label": "杭州市",
  "value": "3301"
}, {
  "label": "宁波市",
  "value": "3302"
}, {
  "label": "温州市",
  "value": "3303"
}, {
  "label": "嘉兴市",
  "value": "3304"
}, {
  "label": "湖州市",
  "value": "3305"
}, {
  "label": "绍兴市",
  "value": "3306"
}, {
  "label": "金华市",
  "value": "3307"
}, {
  "label": "衢州市",
  "value": "3308"
}, {
  "label": "舟山市",
  "value": "3309"
}, {
  "label": "台州市",
  "value": "3310"
}, {
  "label": "丽水市",
  "value": "3311"
}], [{
  "label": "合肥市",
  "value": "3401"
}, {
  "label": "芜湖市",
  "value": "3402"
}, {
  "label": "蚌埠市",
  "value": "3403"
}, {
  "label": "淮南市",
  "value": "3404"
}, {
  "label": "马鞍山市",
  "value": "3405"
}, {
  "label": "淮北市",
  "value": "3406"
}, {
  "label": "铜陵市",
  "value": "3407"
}, {
  "label": "安庆市",
  "value": "3408"
}, {
  "label": "黄山市",
  "value": "3410"
}, {
  "label": "滁州市",
  "value": "3411"
}, {
  "label": "阜阳市",
  "value": "3412"
}, {
  "label": "宿州市",
  "value": "3413"
}, {
  "label": "六安市",
  "value": "3415"
}, {
  "label": "亳州市",
  "value": "3416"
}, {
  "label": "池州市",
  "value": "3417"
}, {
  "label": "宣城市",
  "value": "3418"
}], [{
  "label": "福州市",
  "value": "3501"
}, {
  "label": "厦门市",
  "value": "3502"
}, {
  "label": "莆田市",
  "value": "3503"
}, {
  "label": "三明市",
  "value": "3504"
}, {
  "label": "泉州市",
  "value": "3505"
}, {
  "label": "漳州市",
  "value": "3506"
}, {
  "label": "南平市",
  "value": "3507"
}, {
  "label": "龙岩市",
  "value": "3508"
}, {
  "label": "宁德市",
  "value": "3509"
}], [{
  "label": "南昌市",
  "value": "3601"
}, {
  "label": "景德镇市",
  "value": "3602"
}, {
  "label": "萍乡市",
  "value": "3603"
}, {
  "label": "九江市",
  "value": "3604"
}, {
  "label": "新余市",
  "value": "3605"
}, {
  "label": "鹰潭市",
  "value": "3606"
}, {
  "label": "赣州市",
  "value": "3607"
}, {
  "label": "吉安市",
  "value": "3608"
}, {
  "label": "宜春市",
  "value": "3609"
}, {
  "label": "抚州市",
  "value": "3610"
}, {
  "label": "上饶市",
  "value": "3611"
}], [{
  "label": "济南市",
  "value": "3701"
}, {
  "label": "青岛市",
  "value": "3702"
}, {
  "label": "淄博市",
  "value": "3703"
}, {
  "label": "枣庄市",
  "value": "3704"
}, {
  "label": "东营市",
  "value": "3705"
}, {
  "label": "烟台市",
  "value": "3706"
}, {
  "label": "潍坊市",
  "value": "3707"
}, {
  "label": "济宁市",
  "value": "3708"
}, {
  "label": "泰安市",
  "value": "3709"
}, {
  "label": "威海市",
  "value": "3710"
}, {
  "label": "日照市",
  "value": "3711"
}, {
  "label": "莱芜市",
  "value": "3712"
}, {
  "label": "临沂市",
  "value": "3713"
}, {
  "label": "德州市",
  "value": "3714"
}, {
  "label": "聊城市",
  "value": "3715"
}, {
  "label": "滨州市",
  "value": "3716"
}, {
  "label": "菏泽市",
  "value": "3717"
}], [{
  "label": "郑州市",
  "value": "4101"
}, {
  "label": "开封市",
  "value": "4102"
}, {
  "label": "洛阳市",
  "value": "4103"
}, {
  "label": "平顶山市",
  "value": "4104"
}, {
  "label": "安阳市",
  "value": "4105"
}, {
  "label": "鹤壁市",
  "value": "4106"
}, {
  "label": "新乡市",
  "value": "4107"
}, {
  "label": "焦作市",
  "value": "4108"
}, {
  "label": "濮阳市",
  "value": "4109"
}, {
  "label": "许昌市",
  "value": "4110"
}, {
  "label": "漯河市",
  "value": "4111"
}, {
  "label": "三门峡市",
  "value": "4112"
}, {
  "label": "南阳市",
  "value": "4113"
}, {
  "label": "商丘市",
  "value": "4114"
}, {
  "label": "信阳市",
  "value": "4115"
}, {
  "label": "周口市",
  "value": "4116"
}, {
  "label": "驻马店市",
  "value": "4117"
}, {
  "label": "省直辖县级行政区划",
  "value": "4190"
}], [{
  "label": "武汉市",
  "value": "4201"
}, {
  "label": "黄石市",
  "value": "4202"
}, {
  "label": "十堰市",
  "value": "4203"
}, {
  "label": "宜昌市",
  "value": "4205"
}, {
  "label": "襄阳市",
  "value": "4206"
}, {
  "label": "鄂州市",
  "value": "4207"
}, {
  "label": "荆门市",
  "value": "4208"
}, {
  "label": "孝感市",
  "value": "4209"
}, {
  "label": "荆州市",
  "value": "4210"
}, {
  "label": "黄冈市",
  "value": "4211"
}, {
  "label": "咸宁市",
  "value": "4212"
}, {
  "label": "随州市",
  "value": "4213"
}, {
  "label": "恩施土家族苗族自治州",
  "value": "4228"
}, {
  "label": "省直辖县级行政区划",
  "value": "4290"
}], [{
  "label": "长沙市",
  "value": "4301"
}, {
  "label": "株洲市",
  "value": "4302"
}, {
  "label": "湘潭市",
  "value": "4303"
}, {
  "label": "衡阳市",
  "value": "4304"
}, {
  "label": "邵阳市",
  "value": "4305"
}, {
  "label": "岳阳市",
  "value": "4306"
}, {
  "label": "常德市",
  "value": "4307"
}, {
  "label": "张家界市",
  "value": "4308"
}, {
  "label": "益阳市",
  "value": "4309"
}, {
  "label": "郴州市",
  "value": "4310"
}, {
  "label": "永州市",
  "value": "4311"
}, {
  "label": "怀化市",
  "value": "4312"
}, {
  "label": "娄底市",
  "value": "4313"
}, {
  "label": "湘西土家族苗族自治州",
  "value": "4331"
}], [{
  "label": "广州市",
  "value": "4401"
}, {
  "label": "韶关市",
  "value": "4402"
}, {
  "label": "深圳市",
  "value": "4403"
}, {
  "label": "珠海市",
  "value": "4404"
}, {
  "label": "汕头市",
  "value": "4405"
}, {
  "label": "佛山市",
  "value": "4406"
}, {
  "label": "江门市",
  "value": "4407"
}, {
  "label": "湛江市",
  "value": "4408"
}, {
  "label": "茂名市",
  "value": "4409"
}, {
  "label": "肇庆市",
  "value": "4412"
}, {
  "label": "惠州市",
  "value": "4413"
}, {
  "label": "梅州市",
  "value": "4414"
}, {
  "label": "汕尾市",
  "value": "4415"
}, {
  "label": "河源市",
  "value": "4416"
}, {
  "label": "阳江市",
  "value": "4417"
}, {
  "label": "清远市",
  "value": "4418"
}, {
  "label": "东莞市",
  "value": "4419"
}, {
  "label": "中山市",
  "value": "4420"
}, {
  "label": "潮州市",
  "value": "4451"
}, {
  "label": "揭阳市",
  "value": "4452"
}, {
  "label": "云浮市",
  "value": "4453"
}], [{
  "label": "南宁市",
  "value": "4501"
}, {
  "label": "柳州市",
  "value": "4502"
}, {
  "label": "桂林市",
  "value": "4503"
}, {
  "label": "梧州市",
  "value": "4504"
}, {
  "label": "北海市",
  "value": "4505"
}, {
  "label": "防城港市",
  "value": "4506"
}, {
  "label": "钦州市",
  "value": "4507"
}, {
  "label": "贵港市",
  "value": "4508"
}, {
  "label": "玉林市",
  "value": "4509"
}, {
  "label": "百色市",
  "value": "4510"
}, {
  "label": "贺州市",
  "value": "4511"
}, {
  "label": "河池市",
  "value": "4512"
}, {
  "label": "来宾市",
  "value": "4513"
}, {
  "label": "崇左市",
  "value": "4514"
}], [{
  "label": "海口市",
  "value": "4601"
}, {
  "label": "三亚市",
  "value": "4602"
}, {
  "label": "三沙市",
  "value": "4603"
}, {
  "label": "儋州市",
  "value": "4604"
}, {
  "label": "省直辖县级行政区划",
  "value": "4690"
}], [{
  "label": "市辖区",
  "value": "5001"
}, {
  "label": "县",
  "value": "5002"
}], [{
  "label": "成都市",
  "value": "5101"
}, {
  "label": "自贡市",
  "value": "5103"
}, {
  "label": "攀枝花市",
  "value": "5104"
}, {
  "label": "泸州市",
  "value": "5105"
}, {
  "label": "德阳市",
  "value": "5106"
}, {
  "label": "绵阳市",
  "value": "5107"
}, {
  "label": "广元市",
  "value": "5108"
}, {
  "label": "遂宁市",
  "value": "5109"
}, {
  "label": "内江市",
  "value": "5110"
}, {
  "label": "乐山市",
  "value": "5111"
}, {
  "label": "南充市",
  "value": "5113"
}, {
  "label": "眉山市",
  "value": "5114"
}, {
  "label": "宜宾市",
  "value": "5115"
}, {
  "label": "广安市",
  "value": "5116"
}, {
  "label": "达州市",
  "value": "5117"
}, {
  "label": "雅安市",
  "value": "5118"
}, {
  "label": "巴中市",
  "value": "5119"
}, {
  "label": "资阳市",
  "value": "5120"
}, {
  "label": "阿坝藏族羌族自治州",
  "value": "5132"
}, {
  "label": "甘孜藏族自治州",
  "value": "5133"
}, {
  "label": "凉山彝族自治州",
  "value": "5134"
}], [{
  "label": "贵阳市",
  "value": "5201"
}, {
  "label": "六盘水市",
  "value": "5202"
}, {
  "label": "遵义市",
  "value": "5203"
}, {
  "label": "安顺市",
  "value": "5204"
}, {
  "label": "毕节市",
  "value": "5205"
}, {
  "label": "铜仁市",
  "value": "5206"
}, {
  "label": "黔西南布依族苗族自治州",
  "value": "5223"
}, {
  "label": "黔东南苗族侗族自治州",
  "value": "5226"
}, {
  "label": "黔南布依族苗族自治州",
  "value": "5227"
}], [{
  "label": "昆明市",
  "value": "5301"
}, {
  "label": "曲靖市",
  "value": "5303"
}, {
  "label": "玉溪市",
  "value": "5304"
}, {
  "label": "保山市",
  "value": "5305"
}, {
  "label": "昭通市",
  "value": "5306"
}, {
  "label": "丽江市",
  "value": "5307"
}, {
  "label": "普洱市",
  "value": "5308"
}, {
  "label": "临沧市",
  "value": "5309"
}, {
  "label": "楚雄彝族自治州",
  "value": "5323"
}, {
  "label": "红河哈尼族彝族自治州",
  "value": "5325"
}, {
  "label": "文山壮族苗族自治州",
  "value": "5326"
}, {
  "label": "西双版纳傣族自治州",
  "value": "5328"
}, {
  "label": "大理白族自治州",
  "value": "5329"
}, {
  "label": "德宏傣族景颇族自治州",
  "value": "5331"
}, {
  "label": "怒江傈僳族自治州",
  "value": "5333"
}, {
  "label": "迪庆藏族自治州",
  "value": "5334"
}], [{
  "label": "拉萨市",
  "value": "5401"
}, {
  "label": "日喀则市",
  "value": "5402"
}, {
  "label": "昌都市",
  "value": "5403"
}, {
  "label": "林芝市",
  "value": "5404"
}, {
  "label": "山南市",
  "value": "5405"
}, {
  "label": "那曲地区",
  "value": "5424"
}, {
  "label": "阿里地区",
  "value": "5425"
}], [{
  "label": "西安市",
  "value": "6101"
}, {
  "label": "铜川市",
  "value": "6102"
}, {
  "label": "宝鸡市",
  "value": "6103"
}, {
  "label": "咸阳市",
  "value": "6104"
}, {
  "label": "渭南市",
  "value": "6105"
}, {
  "label": "延安市",
  "value": "6106"
}, {
  "label": "汉中市",
  "value": "6107"
}, {
  "label": "榆林市",
  "value": "6108"
}, {
  "label": "安康市",
  "value": "6109"
}, {
  "label": "商洛市",
  "value": "6110"
}], [{
  "label": "兰州市",
  "value": "6201"
}, {
  "label": "嘉峪关市",
  "value": "6202"
}, {
  "label": "金昌市",
  "value": "6203"
}, {
  "label": "白银市",
  "value": "6204"
}, {
  "label": "天水市",
  "value": "6205"
}, {
  "label": "武威市",
  "value": "6206"
}, {
  "label": "张掖市",
  "value": "6207"
}, {
  "label": "平凉市",
  "value": "6208"
}, {
  "label": "酒泉市",
  "value": "6209"
}, {
  "label": "庆阳市",
  "value": "6210"
}, {
  "label": "定西市",
  "value": "6211"
}, {
  "label": "陇南市",
  "value": "6212"
}, {
  "label": "临夏回族自治州",
  "value": "6229"
}, {
  "label": "甘南藏族自治州",
  "value": "6230"
}], [{
  "label": "西宁市",
  "value": "6301"
}, {
  "label": "海东市",
  "value": "6302"
}, {
  "label": "海北藏族自治州",
  "value": "6322"
}, {
  "label": "黄南藏族自治州",
  "value": "6323"
}, {
  "label": "海南藏族自治州",
  "value": "6325"
}, {
  "label": "果洛藏族自治州",
  "value": "6326"
}, {
  "label": "玉树藏族自治州",
  "value": "6327"
}, {
  "label": "海西蒙古族藏族自治州",
  "value": "6328"
}], [{
  "label": "银川市",
  "value": "6401"
}, {
  "label": "石嘴山市",
  "value": "6402"
}, {
  "label": "吴忠市",
  "value": "6403"
}, {
  "label": "固原市",
  "value": "6404"
}, {
  "label": "中卫市",
  "value": "6405"
}], [{
  "label": "乌鲁木齐市",
  "value": "6501"
}, {
  "label": "克拉玛依市",
  "value": "6502"
}, {
  "label": "吐鲁番市",
  "value": "6504"
}, {
  "label": "哈密市",
  "value": "6505"
}, {
  "label": "昌吉回族自治州",
  "value": "6523"
}, {
  "label": "博尔塔拉蒙古自治州",
  "value": "6527"
}, {
  "label": "巴音郭楞蒙古自治州",
  "value": "6528"
}, {
  "label": "阿克苏地区",
  "value": "6529"
}, {
  "label": "克孜勒苏柯尔克孜自治州",
  "value": "6530"
}, {
  "label": "喀什地区",
  "value": "6531"
}, {
  "label": "和田地区",
  "value": "6532"
}, {
  "label": "伊犁哈萨克自治州",
  "value": "6540"
}, {
  "label": "塔城地区",
  "value": "6542"
}, {
  "label": "阿勒泰地区",
  "value": "6543"
}, {
  "label": "自治区直辖县级行政区划",
  "value": "6590"
}], [{
  "label": "台北",
  "value": "6601"
}, {
  "label": "高雄",
  "value": "6602"
}, {
  "label": "基隆",
  "value": "6603"
}, {
  "label": "台中",
  "value": "6604"
}, {
  "label": "台南",
  "value": "6605"
}, {
  "label": "新竹",
  "value": "6606"
}, {
  "label": "嘉义",
  "value": "6607"
}, {
  "label": "宜兰",
  "value": "6608"
}, {
  "label": "桃园",
  "value": "6609"
}, {
  "label": "苗栗",
  "value": "6610"
}, {
  "label": "彰化",
  "value": "6611"
}, {
  "label": "南投",
  "value": "6612"
}, {
  "label": "云林",
  "value": "6613"
}, {
  "label": "屏东",
  "value": "6614"
}, {
  "label": "台东",
  "value": "6615"
}, {
  "label": "花莲",
  "value": "6616"
}, {
  "label": "澎湖",
  "value": "6617"
}], [{
  "label": "香港岛",
  "value": "6701"
}, {
  "label": "九龙",
  "value": "6702"
}, {
  "label": "新界",
  "value": "6703"
}], [{
  "label": "澳门半岛",
  "value": "6801"
}, {
  "label": "氹仔岛",
  "value": "6802"
}, {
  "label": "路环岛",
  "value": "6803"
}, {
  "label": "路氹城",
  "value": "6804"
}]];
var _default = cityData;
exports.default = _default;

/***/ }),

/***/ 644:
/*!***********************************************************************!*\
  !*** D:/project/前端/front/front/components/w-picker/city-data/area.js ***!
  \***********************************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;
/* eslint-disable */
var areaData = [[[{
  "label": "东城区",
  "value": "110101"
}, {
  "label": "西城区",
  "value": "110102"
}, {
  "label": "朝阳区",
  "value": "110105"
}, {
  "label": "丰台区",
  "value": "110106"
}, {
  "label": "石景山区",
  "value": "110107"
}, {
  "label": "海淀区",
  "value": "110108"
}, {
  "label": "门头沟区",
  "value": "110109"
}, {
  "label": "房山区",
  "value": "110111"
}, {
  "label": "通州区",
  "value": "110112"
}, {
  "label": "顺义区",
  "value": "110113"
}, {
  "label": "昌平区",
  "value": "110114"
}, {
  "label": "大兴区",
  "value": "110115"
}, {
  "label": "怀柔区",
  "value": "110116"
}, {
  "label": "平谷区",
  "value": "110117"
}, {
  "label": "密云区",
  "value": "110118"
}, {
  "label": "延庆区",
  "value": "110119"
}]], [[{
  "label": "和平区",
  "value": "120101"
}, {
  "label": "河东区",
  "value": "120102"
}, {
  "label": "河西区",
  "value": "120103"
}, {
  "label": "南开区",
  "value": "120104"
}, {
  "label": "河北区",
  "value": "120105"
}, {
  "label": "红桥区",
  "value": "120106"
}, {
  "label": "东丽区",
  "value": "120110"
}, {
  "label": "西青区",
  "value": "120111"
}, {
  "label": "津南区",
  "value": "120112"
}, {
  "label": "北辰区",
  "value": "120113"
}, {
  "label": "武清区",
  "value": "120114"
}, {
  "label": "宝坻区",
  "value": "120115"
}, {
  "label": "滨海新区",
  "value": "120116"
}, {
  "label": "宁河区",
  "value": "120117"
}, {
  "label": "静海区",
  "value": "120118"
}, {
  "label": "蓟州区",
  "value": "120119"
}]], [[{
  "label": "长安区",
  "value": "130102"
}, {
  "label": "桥西区",
  "value": "130104"
}, {
  "label": "新华区",
  "value": "130105"
}, {
  "label": "井陉矿区",
  "value": "130107"
}, {
  "label": "裕华区",
  "value": "130108"
}, {
  "label": "藁城区",
  "value": "130109"
}, {
  "label": "鹿泉区",
  "value": "130110"
}, {
  "label": "栾城区",
  "value": "130111"
}, {
  "label": "井陉县",
  "value": "130121"
}, {
  "label": "正定县",
  "value": "130123"
}, {
  "label": "行唐县",
  "value": "130125"
}, {
  "label": "灵寿县",
  "value": "130126"
}, {
  "label": "高邑县",
  "value": "130127"
}, {
  "label": "深泽县",
  "value": "130128"
}, {
  "label": "赞皇县",
  "value": "130129"
}, {
  "label": "无极县",
  "value": "130130"
}, {
  "label": "平山县",
  "value": "130131"
}, {
  "label": "元氏县",
  "value": "130132"
}, {
  "label": "赵县",
  "value": "130133"
}, {
  "label": "石家庄高新技术产业开发区",
  "value": "130171"
}, {
  "label": "石家庄循环化工园区",
  "value": "130172"
}, {
  "label": "辛集市",
  "value": "130181"
}, {
  "label": "晋州市",
  "value": "130183"
}, {
  "label": "新乐市",
  "value": "130184"
}], [{
  "label": "路南区",
  "value": "130202"
}, {
  "label": "路北区",
  "value": "130203"
}, {
  "label": "古冶区",
  "value": "130204"
}, {
  "label": "开平区",
  "value": "130205"
}, {
  "label": "丰南区",
  "value": "130207"
}, {
  "label": "丰润区",
  "value": "130208"
}, {
  "label": "曹妃甸区",
  "value": "130209"
}, {
  "label": "滦县",
  "value": "130223"
}, {
  "label": "滦南县",
  "value": "130224"
}, {
  "label": "乐亭县",
  "value": "130225"
}, {
  "label": "迁西县",
  "value": "130227"
}, {
  "label": "玉田县",
  "value": "130229"
}, {
  "label": "唐山市芦台经济技术开发区",
  "value": "130271"
}, {
  "label": "唐山市汉沽管理区",
  "value": "130272"
}, {
  "label": "唐山高新技术产业开发区",
  "value": "130273"
}, {
  "label": "河北唐山海港经济开发区",
  "value": "130274"
}, {
  "label": "遵化市",
  "value": "130281"
}, {
  "label": "迁安市",
  "value": "130283"
}], [{
  "label": "海港区",
  "value": "130302"
}, {
  "label": "山海关区",
  "value": "130303"
}, {
  "label": "北戴河区",
  "value": "130304"
}, {
  "label": "抚宁区",
  "value": "130306"
}, {
  "label": "青龙满族自治县",
  "value": "130321"
}, {
  "label": "昌黎县",
  "value": "130322"
}, {
  "label": "卢龙县",
  "value": "130324"
}, {
  "label": "秦皇岛市经济技术开发区",
  "value": "130371"
}, {
  "label": "北戴河新区",
  "value": "130372"
}], [{
  "label": "邯山区",
  "value": "130402"
}, {
  "label": "丛台区",
  "value": "130403"
}, {
  "label": "复兴区",
  "value": "130404"
}, {
  "label": "峰峰矿区",
  "value": "130406"
}, {
  "label": "肥乡区",
  "value": "130407"
}, {
  "label": "永年区",
  "value": "130408"
}, {
  "label": "临漳县",
  "value": "130423"
}, {
  "label": "成安县",
  "value": "130424"
}, {
  "label": "大名县",
  "value": "130425"
}, {
  "label": "涉县",
  "value": "130426"
}, {
  "label": "磁县",
  "value": "130427"
}, {
  "label": "邱县",
  "value": "130430"
}, {
  "label": "鸡泽县",
  "value": "130431"
}, {
  "label": "广平县",
  "value": "130432"
}, {
  "label": "馆陶县",
  "value": "130433"
}, {
  "label": "魏县",
  "value": "130434"
}, {
  "label": "曲周县",
  "value": "130435"
}, {
  "label": "邯郸经济技术开发区",
  "value": "130471"
}, {
  "label": "邯郸冀南新区",
  "value": "130473"
}, {
  "label": "武安市",
  "value": "130481"
}], [{
  "label": "桥东区",
  "value": "130502"
}, {
  "label": "桥西区",
  "value": "130503"
}, {
  "label": "邢台县",
  "value": "130521"
}, {
  "label": "临城县",
  "value": "130522"
}, {
  "label": "内丘县",
  "value": "130523"
}, {
  "label": "柏乡县",
  "value": "130524"
}, {
  "label": "隆尧县",
  "value": "130525"
}, {
  "label": "任县",
  "value": "130526"
}, {
  "label": "南和县",
  "value": "130527"
}, {
  "label": "宁晋县",
  "value": "130528"
}, {
  "label": "巨鹿县",
  "value": "130529"
}, {
  "label": "新河县",
  "value": "130530"
}, {
  "label": "广宗县",
  "value": "130531"
}, {
  "label": "平乡县",
  "value": "130532"
}, {
  "label": "威县",
  "value": "130533"
}, {
  "label": "清河县",
  "value": "130534"
}, {
  "label": "临西县",
  "value": "130535"
}, {
  "label": "河北邢台经济开发区",
  "value": "130571"
}, {
  "label": "南宫市",
  "value": "130581"
}, {
  "label": "沙河市",
  "value": "130582"
}], [{
  "label": "竞秀区",
  "value": "130602"
}, {
  "label": "莲池区",
  "value": "130606"
}, {
  "label": "满城区",
  "value": "130607"
}, {
  "label": "清苑区",
  "value": "130608"
}, {
  "label": "徐水区",
  "value": "130609"
}, {
  "label": "涞水县",
  "value": "130623"
}, {
  "label": "阜平县",
  "value": "130624"
}, {
  "label": "定兴县",
  "value": "130626"
}, {
  "label": "唐县",
  "value": "130627"
}, {
  "label": "高阳县",
  "value": "130628"
}, {
  "label": "容城县",
  "value": "130629"
}, {
  "label": "涞源县",
  "value": "130630"
}, {
  "label": "望都县",
  "value": "130631"
}, {
  "label": "安新县",
  "value": "130632"
}, {
  "label": "易县",
  "value": "130633"
}, {
  "label": "曲阳县",
  "value": "130634"
}, {
  "label": "蠡县",
  "value": "130635"
}, {
  "label": "顺平县",
  "value": "130636"
}, {
  "label": "博野县",
  "value": "130637"
}, {
  "label": "雄县",
  "value": "130638"
}, {
  "label": "保定高新技术产业开发区",
  "value": "130671"
}, {
  "label": "保定白沟新城",
  "value": "130672"
}, {
  "label": "涿州市",
  "value": "130681"
}, {
  "label": "定州市",
  "value": "130682"
}, {
  "label": "安国市",
  "value": "130683"
}, {
  "label": "高碑店市",
  "value": "130684"
}], [{
  "label": "桥东区",
  "value": "130702"
}, {
  "label": "桥西区",
  "value": "130703"
}, {
  "label": "宣化区",
  "value": "130705"
}, {
  "label": "下花园区",
  "value": "130706"
}, {
  "label": "万全区",
  "value": "130708"
}, {
  "label": "崇礼区",
  "value": "130709"
}, {
  "label": "张北县",
  "value": "130722"
}, {
  "label": "康保县",
  "value": "130723"
}, {
  "label": "沽源县",
  "value": "130724"
}, {
  "label": "尚义县",
  "value": "130725"
}, {
  "label": "蔚县",
  "value": "130726"
}, {
  "label": "阳原县",
  "value": "130727"
}, {
  "label": "怀安县",
  "value": "130728"
}, {
  "label": "怀来县",
  "value": "130730"
}, {
  "label": "涿鹿县",
  "value": "130731"
}, {
  "label": "赤城县",
  "value": "130732"
}, {
  "label": "张家口市高新技术产业开发区",
  "value": "130771"
}, {
  "label": "张家口市察北管理区",
  "value": "130772"
}, {
  "label": "张家口市塞北管理区",
  "value": "130773"
}], [{
  "label": "双桥区",
  "value": "130802"
}, {
  "label": "双滦区",
  "value": "130803"
}, {
  "label": "鹰手营子矿区",
  "value": "130804"
}, {
  "label": "承德县",
  "value": "130821"
}, {
  "label": "兴隆县",
  "value": "130822"
}, {
  "label": "滦平县",
  "value": "130824"
}, {
  "label": "隆化县",
  "value": "130825"
}, {
  "label": "丰宁满族自治县",
  "value": "130826"
}, {
  "label": "宽城满族自治县",
  "value": "130827"
}, {
  "label": "围场满族蒙古族自治县",
  "value": "130828"
}, {
  "label": "承德高新技术产业开发区",
  "value": "130871"
}, {
  "label": "平泉市",
  "value": "130881"
}], [{
  "label": "新华区",
  "value": "130902"
}, {
  "label": "运河区",
  "value": "130903"
}, {
  "label": "沧县",
  "value": "130921"
}, {
  "label": "青县",
  "value": "130922"
}, {
  "label": "东光县",
  "value": "130923"
}, {
  "label": "海兴县",
  "value": "130924"
}, {
  "label": "盐山县",
  "value": "130925"
}, {
  "label": "肃宁县",
  "value": "130926"
}, {
  "label": "南皮县",
  "value": "130927"
}, {
  "label": "吴桥县",
  "value": "130928"
}, {
  "label": "献县",
  "value": "130929"
}, {
  "label": "孟村回族自治县",
  "value": "130930"
}, {
  "label": "河北沧州经济开发区",
  "value": "130971"
}, {
  "label": "沧州高新技术产业开发区",
  "value": "130972"
}, {
  "label": "沧州渤海新区",
  "value": "130973"
}, {
  "label": "泊头市",
  "value": "130981"
}, {
  "label": "任丘市",
  "value": "130982"
}, {
  "label": "黄骅市",
  "value": "130983"
}, {
  "label": "河间市",
  "value": "130984"
}], [{
  "label": "安次区",
  "value": "131002"
}, {
  "label": "广阳区",
  "value": "131003"
}, {
  "label": "固安县",
  "value": "131022"
}, {
  "label": "永清县",
  "value": "131023"
}, {
  "label": "香河县",
  "value": "131024"
}, {
  "label": "大城县",
  "value": "131025"
}, {
  "label": "文安县",
  "value": "131026"
}, {
  "label": "大厂回族自治县",
  "value": "131028"
}, {
  "label": "廊坊经济技术开发区",
  "value": "131071"
}, {
  "label": "霸州市",
  "value": "131081"
}, {
  "label": "三河市",
  "value": "131082"
}], [{
  "label": "桃城区",
  "value": "131102"
}, {
  "label": "冀州区",
  "value": "131103"
}, {
  "label": "枣强县",
  "value": "131121"
}, {
  "label": "武邑县",
  "value": "131122"
}, {
  "label": "武强县",
  "value": "131123"
}, {
  "label": "饶阳县",
  "value": "131124"
}, {
  "label": "安平县",
  "value": "131125"
}, {
  "label": "故城县",
  "value": "131126"
}, {
  "label": "景县",
  "value": "131127"
}, {
  "label": "阜城县",
  "value": "131128"
}, {
  "label": "河北衡水经济开发区",
  "value": "131171"
}, {
  "label": "衡水滨湖新区",
  "value": "131172"
}, {
  "label": "深州市",
  "value": "131182"
}]], [[{
  "label": "小店区",
  "value": "140105"
}, {
  "label": "迎泽区",
  "value": "140106"
}, {
  "label": "杏花岭区",
  "value": "140107"
}, {
  "label": "尖草坪区",
  "value": "140108"
}, {
  "label": "万柏林区",
  "value": "140109"
}, {
  "label": "晋源区",
  "value": "140110"
}, {
  "label": "清徐县",
  "value": "140121"
}, {
  "label": "阳曲县",
  "value": "140122"
}, {
  "label": "娄烦县",
  "value": "140123"
}, {
  "label": "山西转型综合改革示范区",
  "value": "140171"
}, {
  "label": "古交市",
  "value": "140181"
}], [{
  "label": "城区",
  "value": "140202"
}, {
  "label": "矿区",
  "value": "140203"
}, {
  "label": "南郊区",
  "value": "140211"
}, {
  "label": "新荣区",
  "value": "140212"
}, {
  "label": "阳高县",
  "value": "140221"
}, {
  "label": "天镇县",
  "value": "140222"
}, {
  "label": "广灵县",
  "value": "140223"
}, {
  "label": "灵丘县",
  "value": "140224"
}, {
  "label": "浑源县",
  "value": "140225"
}, {
  "label": "左云县",
  "value": "140226"
}, {
  "label": "大同县",
  "value": "140227"
}, {
  "label": "山西大同经济开发区",
  "value": "140271"
}], [{
  "label": "城区",
  "value": "140302"
}, {
  "label": "矿区",
  "value": "140303"
}, {
  "label": "郊区",
  "value": "140311"
}, {
  "label": "平定县",
  "value": "140321"
}, {
  "label": "盂县",
  "value": "140322"
}, {
  "label": "山西阳泉经济开发区",
  "value": "140371"
}], [{
  "label": "城区",
  "value": "140402"
}, {
  "label": "郊区",
  "value": "140411"
}, {
  "label": "长治县",
  "value": "140421"
}, {
  "label": "襄垣县",
  "value": "140423"
}, {
  "label": "屯留县",
  "value": "140424"
}, {
  "label": "平顺县",
  "value": "140425"
}, {
  "label": "黎城县",
  "value": "140426"
}, {
  "label": "壶关县",
  "value": "140427"
}, {
  "label": "长子县",
  "value": "140428"
}, {
  "label": "武乡县",
  "value": "140429"
}, {
  "label": "沁县",
  "value": "140430"
}, {
  "label": "沁源县",
  "value": "140431"
}, {
  "label": "山西长治高新技术产业园区",
  "value": "140471"
}, {
  "label": "潞城市",
  "value": "140481"
}], [{
  "label": "城区",
  "value": "140502"
}, {
  "label": "沁水县",
  "value": "140521"
}, {
  "label": "阳城县",
  "value": "140522"
}, {
  "label": "陵川县",
  "value": "140524"
}, {
  "label": "泽州县",
  "value": "140525"
}, {
  "label": "高平市",
  "value": "140581"
}], [{
  "label": "朔城区",
  "value": "140602"
}, {
  "label": "平鲁区",
  "value": "140603"
}, {
  "label": "山阴县",
  "value": "140621"
}, {
  "label": "应县",
  "value": "140622"
}, {
  "label": "右玉县",
  "value": "140623"
}, {
  "label": "怀仁县",
  "value": "140624"
}, {
  "label": "山西朔州经济开发区",
  "value": "140671"
}], [{
  "label": "榆次区",
  "value": "140702"
}, {
  "label": "榆社县",
  "value": "140721"
}, {
  "label": "左权县",
  "value": "140722"
}, {
  "label": "和顺县",
  "value": "140723"
}, {
  "label": "昔阳县",
  "value": "140724"
}, {
  "label": "寿阳县",
  "value": "140725"
}, {
  "label": "太谷县",
  "value": "140726"
}, {
  "label": "祁县",
  "value": "140727"
}, {
  "label": "平遥县",
  "value": "140728"
}, {
  "label": "灵石县",
  "value": "140729"
}, {
  "label": "介休市",
  "value": "140781"
}], [{
  "label": "盐湖区",
  "value": "140802"
}, {
  "label": "临猗县",
  "value": "140821"
}, {
  "label": "万荣县",
  "value": "140822"
}, {
  "label": "闻喜县",
  "value": "140823"
}, {
  "label": "稷山县",
  "value": "140824"
}, {
  "label": "新绛县",
  "value": "140825"
}, {
  "label": "绛县",
  "value": "140826"
}, {
  "label": "垣曲县",
  "value": "140827"
}, {
  "label": "夏县",
  "value": "140828"
}, {
  "label": "平陆县",
  "value": "140829"
}, {
  "label": "芮城县",
  "value": "140830"
}, {
  "label": "永济市",
  "value": "140881"
}, {
  "label": "河津市",
  "value": "140882"
}], [{
  "label": "忻府区",
  "value": "140902"
}, {
  "label": "定襄县",
  "value": "140921"
}, {
  "label": "五台县",
  "value": "140922"
}, {
  "label": "代县",
  "value": "140923"
}, {
  "label": "繁峙县",
  "value": "140924"
}, {
  "label": "宁武县",
  "value": "140925"
}, {
  "label": "静乐县",
  "value": "140926"
}, {
  "label": "神池县",
  "value": "140927"
}, {
  "label": "五寨县",
  "value": "140928"
}, {
  "label": "岢岚县",
  "value": "140929"
}, {
  "label": "河曲县",
  "value": "140930"
}, {
  "label": "保德县",
  "value": "140931"
}, {
  "label": "偏关县",
  "value": "140932"
}, {
  "label": "五台山风景名胜区",
  "value": "140971"
}, {
  "label": "原平市",
  "value": "140981"
}], [{
  "label": "尧都区",
  "value": "141002"
}, {
  "label": "曲沃县",
  "value": "141021"
}, {
  "label": "翼城县",
  "value": "141022"
}, {
  "label": "襄汾县",
  "value": "141023"
}, {
  "label": "洪洞县",
  "value": "141024"
}, {
  "label": "古县",
  "value": "141025"
}, {
  "label": "安泽县",
  "value": "141026"
}, {
  "label": "浮山县",
  "value": "141027"
}, {
  "label": "吉县",
  "value": "141028"
}, {
  "label": "乡宁县",
  "value": "141029"
}, {
  "label": "大宁县",
  "value": "141030"
}, {
  "label": "隰县",
  "value": "141031"
}, {
  "label": "永和县",
  "value": "141032"
}, {
  "label": "蒲县",
  "value": "141033"
}, {
  "label": "汾西县",
  "value": "141034"
}, {
  "label": "侯马市",
  "value": "141081"
}, {
  "label": "霍州市",
  "value": "141082"
}], [{
  "label": "离石区",
  "value": "141102"
}, {
  "label": "文水县",
  "value": "141121"
}, {
  "label": "交城县",
  "value": "141122"
}, {
  "label": "兴县",
  "value": "141123"
}, {
  "label": "临县",
  "value": "141124"
}, {
  "label": "柳林县",
  "value": "141125"
}, {
  "label": "石楼县",
  "value": "141126"
}, {
  "label": "岚县",
  "value": "141127"
}, {
  "label": "方山县",
  "value": "141128"
}, {
  "label": "中阳县",
  "value": "141129"
}, {
  "label": "交口县",
  "value": "141130"
}, {
  "label": "孝义市",
  "value": "141181"
}, {
  "label": "汾阳市",
  "value": "141182"
}]], [[{
  "label": "新城区",
  "value": "150102"
}, {
  "label": "回民区",
  "value": "150103"
}, {
  "label": "玉泉区",
  "value": "150104"
}, {
  "label": "赛罕区",
  "value": "150105"
}, {
  "label": "土默特左旗",
  "value": "150121"
}, {
  "label": "托克托县",
  "value": "150122"
}, {
  "label": "和林格尔县",
  "value": "150123"
}, {
  "label": "清水河县",
  "value": "150124"
}, {
  "label": "武川县",
  "value": "150125"
}, {
  "label": "呼和浩特金海工业园区",
  "value": "150171"
}, {
  "label": "呼和浩特经济技术开发区",
  "value": "150172"
}], [{
  "label": "东河区",
  "value": "150202"
}, {
  "label": "昆都仑区",
  "value": "150203"
}, {
  "label": "青山区",
  "value": "150204"
}, {
  "label": "石拐区",
  "value": "150205"
}, {
  "label": "白云鄂博矿区",
  "value": "150206"
}, {
  "label": "九原区",
  "value": "150207"
}, {
  "label": "土默特右旗",
  "value": "150221"
}, {
  "label": "固阳县",
  "value": "150222"
}, {
  "label": "达尔罕茂明安联合旗",
  "value": "150223"
}, {
  "label": "包头稀土高新技术产业开发区",
  "value": "150271"
}], [{
  "label": "海勃湾区",
  "value": "150302"
}, {
  "label": "海南区",
  "value": "150303"
}, {
  "label": "乌达区",
  "value": "150304"
}], [{
  "label": "红山区",
  "value": "150402"
}, {
  "label": "元宝山区",
  "value": "150403"
}, {
  "label": "松山区",
  "value": "150404"
}, {
  "label": "阿鲁科尔沁旗",
  "value": "150421"
}, {
  "label": "巴林左旗",
  "value": "150422"
}, {
  "label": "巴林右旗",
  "value": "150423"
}, {
  "label": "林西县",
  "value": "150424"
}, {
  "label": "克什克腾旗",
  "value": "150425"
}, {
  "label": "翁牛特旗",
  "value": "150426"
}, {
  "label": "喀喇沁旗",
  "value": "150428"
}, {
  "label": "宁城县",
  "value": "150429"
}, {
  "label": "敖汉旗",
  "value": "150430"
}], [{
  "label": "科尔沁区",
  "value": "150502"
}, {
  "label": "科尔沁左翼中旗",
  "value": "150521"
}, {
  "label": "科尔沁左翼后旗",
  "value": "150522"
}, {
  "label": "开鲁县",
  "value": "150523"
}, {
  "label": "库伦旗",
  "value": "150524"
}, {
  "label": "奈曼旗",
  "value": "150525"
}, {
  "label": "扎鲁特旗",
  "value": "150526"
}, {
  "label": "通辽经济技术开发区",
  "value": "150571"
}, {
  "label": "霍林郭勒市",
  "value": "150581"
}], [{
  "label": "东胜区",
  "value": "150602"
}, {
  "label": "康巴什区",
  "value": "150603"
}, {
  "label": "达拉特旗",
  "value": "150621"
}, {
  "label": "准格尔旗",
  "value": "150622"
}, {
  "label": "鄂托克前旗",
  "value": "150623"
}, {
  "label": "鄂托克旗",
  "value": "150624"
}, {
  "label": "杭锦旗",
  "value": "150625"
}, {
  "label": "乌审旗",
  "value": "150626"
}, {
  "label": "伊金霍洛旗",
  "value": "150627"
}], [{
  "label": "海拉尔区",
  "value": "150702"
}, {
  "label": "扎赉诺尔区",
  "value": "150703"
}, {
  "label": "阿荣旗",
  "value": "150721"
}, {
  "label": "莫力达瓦达斡尔族自治旗",
  "value": "150722"
}, {
  "label": "鄂伦春自治旗",
  "value": "150723"
}, {
  "label": "鄂温克族自治旗",
  "value": "150724"
}, {
  "label": "陈巴尔虎旗",
  "value": "150725"
}, {
  "label": "新巴尔虎左旗",
  "value": "150726"
}, {
  "label": "新巴尔虎右旗",
  "value": "150727"
}, {
  "label": "满洲里市",
  "value": "150781"
}, {
  "label": "牙克石市",
  "value": "150782"
}, {
  "label": "扎兰屯市",
  "value": "150783"
}, {
  "label": "额尔古纳市",
  "value": "150784"
}, {
  "label": "根河市",
  "value": "150785"
}], [{
  "label": "临河区",
  "value": "150802"
}, {
  "label": "五原县",
  "value": "150821"
}, {
  "label": "磴口县",
  "value": "150822"
}, {
  "label": "乌拉特前旗",
  "value": "150823"
}, {
  "label": "乌拉特中旗",
  "value": "150824"
}, {
  "label": "乌拉特后旗",
  "value": "150825"
}, {
  "label": "杭锦后旗",
  "value": "150826"
}], [{
  "label": "集宁区",
  "value": "150902"
}, {
  "label": "卓资县",
  "value": "150921"
}, {
  "label": "化德县",
  "value": "150922"
}, {
  "label": "商都县",
  "value": "150923"
}, {
  "label": "兴和县",
  "value": "150924"
}, {
  "label": "凉城县",
  "value": "150925"
}, {
  "label": "察哈尔右翼前旗",
  "value": "150926"
}, {
  "label": "察哈尔右翼中旗",
  "value": "150927"
}, {
  "label": "察哈尔右翼后旗",
  "value": "150928"
}, {
  "label": "四子王旗",
  "value": "150929"
}, {
  "label": "丰镇市",
  "value": "150981"
}], [{
  "label": "乌兰浩特市",
  "value": "152201"
}, {
  "label": "阿尔山市",
  "value": "152202"
}, {
  "label": "科尔沁右翼前旗",
  "value": "152221"
}, {
  "label": "科尔沁右翼中旗",
  "value": "152222"
}, {
  "label": "扎赉特旗",
  "value": "152223"
}, {
  "label": "突泉县",
  "value": "152224"
}], [{
  "label": "二连浩特市",
  "value": "152501"
}, {
  "label": "锡林浩特市",
  "value": "152502"
}, {
  "label": "阿巴嘎旗",
  "value": "152522"
}, {
  "label": "苏尼特左旗",
  "value": "152523"
}, {
  "label": "苏尼特右旗",
  "value": "152524"
}, {
  "label": "东乌珠穆沁旗",
  "value": "152525"
}, {
  "label": "西乌珠穆沁旗",
  "value": "152526"
}, {
  "label": "太仆寺旗",
  "value": "152527"
}, {
  "label": "镶黄旗",
  "value": "152528"
}, {
  "label": "正镶白旗",
  "value": "152529"
}, {
  "label": "正蓝旗",
  "value": "152530"
}, {
  "label": "多伦县",
  "value": "152531"
}, {
  "label": "乌拉盖管委会",
  "value": "152571"
}], [{
  "label": "阿拉善左旗",
  "value": "152921"
}, {
  "label": "阿拉善右旗",
  "value": "152922"
}, {
  "label": "额济纳旗",
  "value": "152923"
}, {
  "label": "内蒙古阿拉善经济开发区",
  "value": "152971"
}]], [[{
  "label": "和平区",
  "value": "210102"
}, {
  "label": "沈河区",
  "value": "210103"
}, {
  "label": "大东区",
  "value": "210104"
}, {
  "label": "皇姑区",
  "value": "210105"
}, {
  "label": "铁西区",
  "value": "210106"
}, {
  "label": "苏家屯区",
  "value": "210111"
}, {
  "label": "浑南区",
  "value": "210112"
}, {
  "label": "沈北新区",
  "value": "210113"
}, {
  "label": "于洪区",
  "value": "210114"
}, {
  "label": "辽中区",
  "value": "210115"
}, {
  "label": "康平县",
  "value": "210123"
}, {
  "label": "法库县",
  "value": "210124"
}, {
  "label": "新民市",
  "value": "210181"
}], [{
  "label": "中山区",
  "value": "210202"
}, {
  "label": "西岗区",
  "value": "210203"
}, {
  "label": "沙河口区",
  "value": "210204"
}, {
  "label": "甘井子区",
  "value": "210211"
}, {
  "label": "旅顺口区",
  "value": "210212"
}, {
  "label": "金州区",
  "value": "210213"
}, {
  "label": "普兰店区",
  "value": "210214"
}, {
  "label": "长海县",
  "value": "210224"
}, {
  "label": "瓦房店市",
  "value": "210281"
}, {
  "label": "庄河市",
  "value": "210283"
}], [{
  "label": "铁东区",
  "value": "210302"
}, {
  "label": "铁西区",
  "value": "210303"
}, {
  "label": "立山区",
  "value": "210304"
}, {
  "label": "千山区",
  "value": "210311"
}, {
  "label": "台安县",
  "value": "210321"
}, {
  "label": "岫岩满族自治县",
  "value": "210323"
}, {
  "label": "海城市",
  "value": "210381"
}], [{
  "label": "新抚区",
  "value": "210402"
}, {
  "label": "东洲区",
  "value": "210403"
}, {
  "label": "望花区",
  "value": "210404"
}, {
  "label": "顺城区",
  "value": "210411"
}, {
  "label": "抚顺县",
  "value": "210421"
}, {
  "label": "新宾满族自治县",
  "value": "210422"
}, {
  "label": "清原满族自治县",
  "value": "210423"
}], [{
  "label": "平山区",
  "value": "210502"
}, {
  "label": "溪湖区",
  "value": "210503"
}, {
  "label": "明山区",
  "value": "210504"
}, {
  "label": "南芬区",
  "value": "210505"
}, {
  "label": "本溪满族自治县",
  "value": "210521"
}, {
  "label": "桓仁满族自治县",
  "value": "210522"
}], [{
  "label": "元宝区",
  "value": "210602"
}, {
  "label": "振兴区",
  "value": "210603"
}, {
  "label": "振安区",
  "value": "210604"
}, {
  "label": "宽甸满族自治县",
  "value": "210624"
}, {
  "label": "东港市",
  "value": "210681"
}, {
  "label": "凤城市",
  "value": "210682"
}], [{
  "label": "古塔区",
  "value": "210702"
}, {
  "label": "凌河区",
  "value": "210703"
}, {
  "label": "太和区",
  "value": "210711"
}, {
  "label": "黑山县",
  "value": "210726"
}, {
  "label": "义县",
  "value": "210727"
}, {
  "label": "凌海市",
  "value": "210781"
}, {
  "label": "北镇市",
  "value": "210782"
}], [{
  "label": "站前区",
  "value": "210802"
}, {
  "label": "西市区",
  "value": "210803"
}, {
  "label": "鲅鱼圈区",
  "value": "210804"
}, {
  "label": "老边区",
  "value": "210811"
}, {
  "label": "盖州市",
  "value": "210881"
}, {
  "label": "大石桥市",
  "value": "210882"
}], [{
  "label": "海州区",
  "value": "210902"
}, {
  "label": "新邱区",
  "value": "210903"
}, {
  "label": "太平区",
  "value": "210904"
}, {
  "label": "清河门区",
  "value": "210905"
}, {
  "label": "细河区",
  "value": "210911"
}, {
  "label": "阜新蒙古族自治县",
  "value": "210921"
}, {
  "label": "彰武县",
  "value": "210922"
}], [{
  "label": "白塔区",
  "value": "211002"
}, {
  "label": "文圣区",
  "value": "211003"
}, {
  "label": "宏伟区",
  "value": "211004"
}, {
  "label": "弓长岭区",
  "value": "211005"
}, {
  "label": "太子河区",
  "value": "211011"
}, {
  "label": "辽阳县",
  "value": "211021"
}, {
  "label": "灯塔市",
  "value": "211081"
}], [{
  "label": "双台子区",
  "value": "211102"
}, {
  "label": "兴隆台区",
  "value": "211103"
}, {
  "label": "大洼区",
  "value": "211104"
}, {
  "label": "盘山县",
  "value": "211122"
}], [{
  "label": "银州区",
  "value": "211202"
}, {
  "label": "清河区",
  "value": "211204"
}, {
  "label": "铁岭县",
  "value": "211221"
}, {
  "label": "西丰县",
  "value": "211223"
}, {
  "label": "昌图县",
  "value": "211224"
}, {
  "label": "调兵山市",
  "value": "211281"
}, {
  "label": "开原市",
  "value": "211282"
}], [{
  "label": "双塔区",
  "value": "211302"
}, {
  "label": "龙城区",
  "value": "211303"
}, {
  "label": "朝阳县",
  "value": "211321"
}, {
  "label": "建平县",
  "value": "211322"
}, {
  "label": "喀喇沁左翼蒙古族自治县",
  "value": "211324"
}, {
  "label": "北票市",
  "value": "211381"
}, {
  "label": "凌源市",
  "value": "211382"
}], [{
  "label": "连山区",
  "value": "211402"
}, {
  "label": "龙港区",
  "value": "211403"
}, {
  "label": "南票区",
  "value": "211404"
}, {
  "label": "绥中县",
  "value": "211421"
}, {
  "label": "建昌县",
  "value": "211422"
}, {
  "label": "兴城市",
  "value": "211481"
}]], [[{
  "label": "南关区",
  "value": "220102"
}, {
  "label": "宽城区",
  "value": "220103"
}, {
  "label": "朝阳区",
  "value": "220104"
}, {
  "label": "二道区",
  "value": "220105"
}, {
  "label": "绿园区",
  "value": "220106"
}, {
  "label": "双阳区",
  "value": "220112"
}, {
  "label": "九台区",
  "value": "220113"
}, {
  "label": "农安县",
  "value": "220122"
}, {
  "label": "长春经济技术开发区",
  "value": "220171"
}, {
  "label": "长春净月高新技术产业开发区",
  "value": "220172"
}, {
  "label": "长春高新技术产业开发区",
  "value": "220173"
}, {
  "label": "长春汽车经济技术开发区",
  "value": "220174"
}, {
  "label": "榆树市",
  "value": "220182"
}, {
  "label": "德惠市",
  "value": "220183"
}], [{
  "label": "昌邑区",
  "value": "220202"
}, {
  "label": "龙潭区",
  "value": "220203"
}, {
  "label": "船营区",
  "value": "220204"
}, {
  "label": "丰满区",
  "value": "220211"
}, {
  "label": "永吉县",
  "value": "220221"
}, {
  "label": "吉林经济开发区",
  "value": "220271"
}, {
  "label": "吉林高新技术产业开发区",
  "value": "220272"
}, {
  "label": "吉林中国新加坡食品区",
  "value": "220273"
}, {
  "label": "蛟河市",
  "value": "220281"
}, {
  "label": "桦甸市",
  "value": "220282"
}, {
  "label": "舒兰市",
  "value": "220283"
}, {
  "label": "磐石市",
  "value": "220284"
}], [{
  "label": "铁西区",
  "value": "220302"
}, {
  "label": "铁东区",
  "value": "220303"
}, {
  "label": "梨树县",
  "value": "220322"
}, {
  "label": "伊通满族自治县",
  "value": "220323"
}, {
  "label": "公主岭市",
  "value": "220381"
}, {
  "label": "双辽市",
  "value": "220382"
}], [{
  "label": "龙山区",
  "value": "220402"
}, {
  "label": "西安区",
  "value": "220403"
}, {
  "label": "东丰县",
  "value": "220421"
}, {
  "label": "东辽县",
  "value": "220422"
}], [{
  "label": "东昌区",
  "value": "220502"
}, {
  "label": "二道江区",
  "value": "220503"
}, {
  "label": "通化县",
  "value": "220521"
}, {
  "label": "辉南县",
  "value": "220523"
}, {
  "label": "柳河县",
  "value": "220524"
}, {
  "label": "梅河口市",
  "value": "220581"
}, {
  "label": "集安市",
  "value": "220582"
}], [{
  "label": "浑江区",
  "value": "220602"
}, {
  "label": "江源区",
  "value": "220605"
}, {
  "label": "抚松县",
  "value": "220621"
}, {
  "label": "靖宇县",
  "value": "220622"
}, {
  "label": "长白朝鲜族自治县",
  "value": "220623"
}, {
  "label": "临江市",
  "value": "220681"
}], [{
  "label": "宁江区",
  "value": "220702"
}, {
  "label": "前郭尔罗斯蒙古族自治县",
  "value": "220721"
}, {
  "label": "长岭县",
  "value": "220722"
}, {
  "label": "乾安县",
  "value": "220723"
}, {
  "label": "吉林松原经济开发区",
  "value": "220771"
}, {
  "label": "扶余市",
  "value": "220781"
}], [{
  "label": "洮北区",
  "value": "220802"
}, {
  "label": "镇赉县",
  "value": "220821"
}, {
  "label": "通榆县",
  "value": "220822"
}, {
  "label": "吉林白城经济开发区",
  "value": "220871"
}, {
  "label": "洮南市",
  "value": "220881"
}, {
  "label": "大安市",
  "value": "220882"
}], [{
  "label": "延吉市",
  "value": "222401"
}, {
  "label": "图们市",
  "value": "222402"
}, {
  "label": "敦化市",
  "value": "222403"
}, {
  "label": "珲春市",
  "value": "222404"
}, {
  "label": "龙井市",
  "value": "222405"
}, {
  "label": "和龙市",
  "value": "222406"
}, {
  "label": "汪清县",
  "value": "222424"
}, {
  "label": "安图县",
  "value": "222426"
}]], [[{
  "label": "道里区",
  "value": "230102"
}, {
  "label": "南岗区",
  "value": "230103"
}, {
  "label": "道外区",
  "value": "230104"
}, {
  "label": "平房区",
  "value": "230108"
}, {
  "label": "松北区",
  "value": "230109"
}, {
  "label": "香坊区",
  "value": "230110"
}, {
  "label": "呼兰区",
  "value": "230111"
}, {
  "label": "阿城区",
  "value": "230112"
}, {
  "label": "双城区",
  "value": "230113"
}, {
  "label": "依兰县",
  "value": "230123"
}, {
  "label": "方正县",
  "value": "230124"
}, {
  "label": "宾县",
  "value": "230125"
}, {
  "label": "巴彦县",
  "value": "230126"
}, {
  "label": "木兰县",
  "value": "230127"
}, {
  "label": "通河县",
  "value": "230128"
}, {
  "label": "延寿县",
  "value": "230129"
}, {
  "label": "尚志市",
  "value": "230183"
}, {
  "label": "五常市",
  "value": "230184"
}], [{
  "label": "龙沙区",
  "value": "230202"
}, {
  "label": "建华区",
  "value": "230203"
}, {
  "label": "铁锋区",
  "value": "230204"
}, {
  "label": "昂昂溪区",
  "value": "230205"
}, {
  "label": "富拉尔基区",
  "value": "230206"
}, {
  "label": "碾子山区",
  "value": "230207"
}, {
  "label": "梅里斯达斡尔族区",
  "value": "230208"
}, {
  "label": "龙江县",
  "value": "230221"
}, {
  "label": "依安县",
  "value": "230223"
}, {
  "label": "泰来县",
  "value": "230224"
}, {
  "label": "甘南县",
  "value": "230225"
}, {
  "label": "富裕县",
  "value": "230227"
}, {
  "label": "克山县",
  "value": "230229"
}, {
  "label": "克东县",
  "value": "230230"
}, {
  "label": "拜泉县",
  "value": "230231"
}, {
  "label": "讷河市",
  "value": "230281"
}], [{
  "label": "鸡冠区",
  "value": "230302"
}, {
  "label": "恒山区",
  "value": "230303"
}, {
  "label": "滴道区",
  "value": "230304"
}, {
  "label": "梨树区",
  "value": "230305"
}, {
  "label": "城子河区",
  "value": "230306"
}, {
  "label": "麻山区",
  "value": "230307"
}, {
  "label": "鸡东县",
  "value": "230321"
}, {
  "label": "虎林市",
  "value": "230381"
}, {
  "label": "密山市",
  "value": "230382"
}], [{
  "label": "向阳区",
  "value": "230402"
}, {
  "label": "工农区",
  "value": "230403"
}, {
  "label": "南山区",
  "value": "230404"
}, {
  "label": "兴安区",
  "value": "230405"
}, {
  "label": "东山区",
  "value": "230406"
}, {
  "label": "兴山区",
  "value": "230407"
}, {
  "label": "萝北县",
  "value": "230421"
}, {
  "label": "绥滨县",
  "value": "230422"
}], [{
  "label": "尖山区",
  "value": "230502"
}, {
  "label": "岭东区",
  "value": "230503"
}, {
  "label": "四方台区",
  "value": "230505"
}, {
  "label": "宝山区",
  "value": "230506"
}, {
  "label": "集贤县",
  "value": "230521"
}, {
  "label": "友谊县",
  "value": "230522"
}, {
  "label": "宝清县",
  "value": "230523"
}, {
  "label": "饶河县",
  "value": "230524"
}], [{
  "label": "萨尔图区",
  "value": "230602"
}, {
  "label": "龙凤区",
  "value": "230603"
}, {
  "label": "让胡路区",
  "value": "230604"
}, {
  "label": "红岗区",
  "value": "230605"
}, {
  "label": "大同区",
  "value": "230606"
}, {
  "label": "肇州县",
  "value": "230621"
}, {
  "label": "肇源县",
  "value": "230622"
}, {
  "label": "林甸县",
  "value": "230623"
}, {
  "label": "杜尔伯特蒙古族自治县",
  "value": "230624"
}, {
  "label": "大庆高新技术产业开发区",
  "value": "230671"
}], [{
  "label": "伊春区",
  "value": "230702"
}, {
  "label": "南岔区",
  "value": "230703"
}, {
  "label": "友好区",
  "value": "230704"
}, {
  "label": "西林区",
  "value": "230705"
}, {
  "label": "翠峦区",
  "value": "230706"
}, {
  "label": "新青区",
  "value": "230707"
}, {
  "label": "美溪区",
  "value": "230708"
}, {
  "label": "金山屯区",
  "value": "230709"
}, {
  "label": "五营区",
  "value": "230710"
}, {
  "label": "乌马河区",
  "value": "230711"
}, {
  "label": "汤旺河区",
  "value": "230712"
}, {
  "label": "带岭区",
  "value": "230713"
}, {
  "label": "乌伊岭区",
  "value": "230714"
}, {
  "label": "红星区",
  "value": "230715"
}, {
  "label": "上甘岭区",
  "value": "230716"
}, {
  "label": "嘉荫县",
  "value": "230722"
}, {
  "label": "铁力市",
  "value": "230781"
}], [{
  "label": "向阳区",
  "value": "230803"
}, {
  "label": "前进区",
  "value": "230804"
}, {
  "label": "东风区",
  "value": "230805"
}, {
  "label": "郊区",
  "value": "230811"
}, {
  "label": "桦南县",
  "value": "230822"
}, {
  "label": "桦川县",
  "value": "230826"
}, {
  "label": "汤原县",
  "value": "230828"
}, {
  "label": "同江市",
  "value": "230881"
}, {
  "label": "富锦市",
  "value": "230882"
}, {
  "label": "抚远市",
  "value": "230883"
}], [{
  "label": "新兴区",
  "value": "230902"
}, {
  "label": "桃山区",
  "value": "230903"
}, {
  "label": "茄子河区",
  "value": "230904"
}, {
  "label": "勃利县",
  "value": "230921"
}], [{
  "label": "东安区",
  "value": "231002"
}, {
  "label": "阳明区",
  "value": "231003"
}, {
  "label": "爱民区",
  "value": "231004"
}, {
  "label": "西安区",
  "value": "231005"
}, {
  "label": "林口县",
  "value": "231025"
}, {
  "label": "牡丹江经济技术开发区",
  "value": "231071"
}, {
  "label": "绥芬河市",
  "value": "231081"
}, {
  "label": "海林市",
  "value": "231083"
}, {
  "label": "宁安市",
  "value": "231084"
}, {
  "label": "穆棱市",
  "value": "231085"
}, {
  "label": "东宁市",
  "value": "231086"
}], [{
  "label": "爱辉区",
  "value": "231102"
}, {
  "label": "嫩江县",
  "value": "231121"
}, {
  "label": "逊克县",
  "value": "231123"
}, {
  "label": "孙吴县",
  "value": "231124"
}, {
  "label": "北安市",
  "value": "231181"
}, {
  "label": "五大连池市",
  "value": "231182"
}], [{
  "label": "北林区",
  "value": "231202"
}, {
  "label": "望奎县",
  "value": "231221"
}, {
  "label": "兰西县",
  "value": "231222"
}, {
  "label": "青冈县",
  "value": "231223"
}, {
  "label": "庆安县",
  "value": "231224"
}, {
  "label": "明水县",
  "value": "231225"
}, {
  "label": "绥棱县",
  "value": "231226"
}, {
  "label": "安达市",
  "value": "231281"
}, {
  "label": "肇东市",
  "value": "231282"
}, {
  "label": "海伦市",
  "value": "231283"
}], [{
  "label": "加格达奇区",
  "value": "232701"
}, {
  "label": "松岭区",
  "value": "232702"
}, {
  "label": "新林区",
  "value": "232703"
}, {
  "label": "呼中区",
  "value": "232704"
}, {
  "label": "呼玛县",
  "value": "232721"
}, {
  "label": "塔河县",
  "value": "232722"
}, {
  "label": "漠河县",
  "value": "232723"
}]], [[{
  "label": "黄浦区",
  "value": "310101"
}, {
  "label": "徐汇区",
  "value": "310104"
}, {
  "label": "长宁区",
  "value": "310105"
}, {
  "label": "静安区",
  "value": "310106"
}, {
  "label": "普陀区",
  "value": "310107"
}, {
  "label": "虹口区",
  "value": "310109"
}, {
  "label": "杨浦区",
  "value": "310110"
}, {
  "label": "闵行区",
  "value": "310112"
}, {
  "label": "宝山区",
  "value": "310113"
}, {
  "label": "嘉定区",
  "value": "310114"
}, {
  "label": "浦东新区",
  "value": "310115"
}, {
  "label": "金山区",
  "value": "310116"
}, {
  "label": "松江区",
  "value": "310117"
}, {
  "label": "青浦区",
  "value": "310118"
}, {
  "label": "奉贤区",
  "value": "310120"
}, {
  "label": "崇明区",
  "value": "310151"
}]], [[{
  "label": "玄武区",
  "value": "320102"
}, {
  "label": "秦淮区",
  "value": "320104"
}, {
  "label": "建邺区",
  "value": "320105"
}, {
  "label": "鼓楼区",
  "value": "320106"
}, {
  "label": "浦口区",
  "value": "320111"
}, {
  "label": "栖霞区",
  "value": "320113"
}, {
  "label": "雨花台区",
  "value": "320114"
}, {
  "label": "江宁区",
  "value": "320115"
}, {
  "label": "六合区",
  "value": "320116"
}, {
  "label": "溧水区",
  "value": "320117"
}, {
  "label": "高淳区",
  "value": "320118"
}], [{
  "label": "锡山区",
  "value": "320205"
}, {
  "label": "惠山区",
  "value": "320206"
}, {
  "label": "滨湖区",
  "value": "320211"
}, {
  "label": "梁溪区",
  "value": "320213"
}, {
  "label": "新吴区",
  "value": "320214"
}, {
  "label": "江阴市",
  "value": "320281"
}, {
  "label": "宜兴市",
  "value": "320282"
}], [{
  "label": "鼓楼区",
  "value": "320302"
}, {
  "label": "云龙区",
  "value": "320303"
}, {
  "label": "贾汪区",
  "value": "320305"
}, {
  "label": "泉山区",
  "value": "320311"
}, {
  "label": "铜山区",
  "value": "320312"
}, {
  "label": "丰县",
  "value": "320321"
}, {
  "label": "沛县",
  "value": "320322"
}, {
  "label": "睢宁县",
  "value": "320324"
}, {
  "label": "徐州经济技术开发区",
  "value": "320371"
}, {
  "label": "新沂市",
  "value": "320381"
}, {
  "label": "邳州市",
  "value": "320382"
}], [{
  "label": "天宁区",
  "value": "320402"
}, {
  "label": "钟楼区",
  "value": "320404"
}, {
  "label": "新北区",
  "value": "320411"
}, {
  "label": "武进区",
  "value": "320412"
}, {
  "label": "金坛区",
  "value": "320413"
}, {
  "label": "溧阳市",
  "value": "320481"
}], [{
  "label": "虎丘区",
  "value": "320505"
}, {
  "label": "吴中区",
  "value": "320506"
}, {
  "label": "相城区",
  "value": "320507"
}, {
  "label": "姑苏区",
  "value": "320508"
}, {
  "label": "吴江区",
  "value": "320509"
}, {
  "label": "苏州工业园区",
  "value": "320571"
}, {
  "label": "常熟市",
  "value": "320581"
}, {
  "label": "张家港市",
  "value": "320582"
}, {
  "label": "昆山市",
  "value": "320583"
}, {
  "label": "太仓市",
  "value": "320585"
}], [{
  "label": "崇川区",
  "value": "320602"
}, {
  "label": "港闸区",
  "value": "320611"
}, {
  "label": "通州区",
  "value": "320612"
}, {
  "label": "海安县",
  "value": "320621"
}, {
  "label": "如东县",
  "value": "320623"
}, {
  "label": "南通经济技术开发区",
  "value": "320671"
}, {
  "label": "启东市",
  "value": "320681"
}, {
  "label": "如皋市",
  "value": "320682"
}, {
  "label": "海门市",
  "value": "320684"
}], [{
  "label": "连云区",
  "value": "320703"
}, {
  "label": "海州区",
  "value": "320706"
}, {
  "label": "赣榆区",
  "value": "320707"
}, {
  "label": "东海县",
  "value": "320722"
}, {
  "label": "灌云县",
  "value": "320723"
}, {
  "label": "灌南县",
  "value": "320724"
}, {
  "label": "连云港经济技术开发区",
  "value": "320771"
}, {
  "label": "连云港高新技术产业开发区",
  "value": "320772"
}], [{
  "label": "淮安区",
  "value": "320803"
}, {
  "label": "淮阴区",
  "value": "320804"
}, {
  "label": "清江浦区",
  "value": "320812"
}, {
  "label": "洪泽区",
  "value": "320813"
}, {
  "label": "涟水县",
  "value": "320826"
}, {
  "label": "盱眙县",
  "value": "320830"
}, {
  "label": "金湖县",
  "value": "320831"
}, {
  "label": "淮安经济技术开发区",
  "value": "320871"
}], [{
  "label": "亭湖区",
  "value": "320902"
}, {
  "label": "盐都区",
  "value": "320903"
}, {
  "label": "大丰区",
  "value": "320904"
}, {
  "label": "响水县",
  "value": "320921"
}, {
  "label": "滨海县",
  "value": "320922"
}, {
  "label": "阜宁县",
  "value": "320923"
}, {
  "label": "射阳县",
  "value": "320924"
}, {
  "label": "建湖县",
  "value": "320925"
}, {
  "label": "盐城经济技术开发区",
  "value": "320971"
}, {
  "label": "东台市",
  "value": "320981"
}], [{
  "label": "广陵区",
  "value": "321002"
}, {
  "label": "邗江区",
  "value": "321003"
}, {
  "label": "江都区",
  "value": "321012"
}, {
  "label": "宝应县",
  "value": "321023"
}, {
  "label": "扬州经济技术开发区",
  "value": "321071"
}, {
  "label": "仪征市",
  "value": "321081"
}, {
  "label": "高邮市",
  "value": "321084"
}], [{
  "label": "京口区",
  "value": "321102"
}, {
  "label": "润州区",
  "value": "321111"
}, {
  "label": "丹徒区",
  "value": "321112"
}, {
  "label": "镇江新区",
  "value": "321171"
}, {
  "label": "丹阳市",
  "value": "321181"
}, {
  "label": "扬中市",
  "value": "321182"
}, {
  "label": "句容市",
  "value": "321183"
}], [{
  "label": "海陵区",
  "value": "321202"
}, {
  "label": "高港区",
  "value": "321203"
}, {
  "label": "姜堰区",
  "value": "321204"
}, {
  "label": "泰州医药高新技术产业开发区",
  "value": "321271"
}, {
  "label": "兴化市",
  "value": "321281"
}, {
  "label": "靖江市",
  "value": "321282"
}, {
  "label": "泰兴市",
  "value": "321283"
}], [{
  "label": "宿城区",
  "value": "321302"
}, {
  "label": "宿豫区",
  "value": "321311"
}, {
  "label": "沭阳县",
  "value": "321322"
}, {
  "label": "泗阳县",
  "value": "321323"
}, {
  "label": "泗洪县",
  "value": "321324"
}, {
  "label": "宿迁经济技术开发区",
  "value": "321371"
}]], [[{
  "label": "上城区",
  "value": "330102"
}, {
  "label": "下城区",
  "value": "330103"
}, {
  "label": "江干区",
  "value": "330104"
}, {
  "label": "拱墅区",
  "value": "330105"
}, {
  "label": "西湖区",
  "value": "330106"
}, {
  "label": "滨江区",
  "value": "330108"
}, {
  "label": "萧山区",
  "value": "330109"
}, {
  "label": "余杭区",
  "value": "330110"
}, {
  "label": "富阳区",
  "value": "330111"
}, {
  "label": "临安区",
  "value": "330112"
}, {
  "label": "桐庐县",
  "value": "330122"
}, {
  "label": "淳安县",
  "value": "330127"
}, {
  "label": "建德市",
  "value": "330182"
}], [{
  "label": "海曙区",
  "value": "330203"
}, {
  "label": "江北区",
  "value": "330205"
}, {
  "label": "北仑区",
  "value": "330206"
}, {
  "label": "镇海区",
  "value": "330211"
}, {
  "label": "鄞州区",
  "value": "330212"
}, {
  "label": "奉化区",
  "value": "330213"
}, {
  "label": "象山县",
  "value": "330225"
}, {
  "label": "宁海县",
  "value": "330226"
}, {
  "label": "余姚市",
  "value": "330281"
}, {
  "label": "慈溪市",
  "value": "330282"
}], [{
  "label": "鹿城区",
  "value": "330302"
}, {
  "label": "龙湾区",
  "value": "330303"
}, {
  "label": "瓯海区",
  "value": "330304"
}, {
  "label": "洞头区",
  "value": "330305"
}, {
  "label": "永嘉县",
  "value": "330324"
}, {
  "label": "平阳县",
  "value": "330326"
}, {
  "label": "苍南县",
  "value": "330327"
}, {
  "label": "文成县",
  "value": "330328"
}, {
  "label": "泰顺县",
  "value": "330329"
}, {
  "label": "温州经济技术开发区",
  "value": "330371"
}, {
  "label": "瑞安市",
  "value": "330381"
}, {
  "label": "乐清市",
  "value": "330382"
}], [{
  "label": "南湖区",
  "value": "330402"
}, {
  "label": "秀洲区",
  "value": "330411"
}, {
  "label": "嘉善县",
  "value": "330421"
}, {
  "label": "海盐县",
  "value": "330424"
}, {
  "label": "海宁市",
  "value": "330481"
}, {
  "label": "平湖市",
  "value": "330482"
}, {
  "label": "桐乡市",
  "value": "330483"
}], [{
  "label": "吴兴区",
  "value": "330502"
}, {
  "label": "南浔区",
  "value": "330503"
}, {
  "label": "德清县",
  "value": "330521"
}, {
  "label": "长兴县",
  "value": "330522"
}, {
  "label": "安吉县",
  "value": "330523"
}], [{
  "label": "越城区",
  "value": "330602"
}, {
  "label": "柯桥区",
  "value": "330603"
}, {
  "label": "上虞区",
  "value": "330604"
}, {
  "label": "新昌县",
  "value": "330624"
}, {
  "label": "诸暨市",
  "value": "330681"
}, {
  "label": "嵊州市",
  "value": "330683"
}], [{
  "label": "婺城区",
  "value": "330702"
}, {
  "label": "金东区",
  "value": "330703"
}, {
  "label": "武义县",
  "value": "330723"
}, {
  "label": "浦江县",
  "value": "330726"
}, {
  "label": "磐安县",
  "value": "330727"
}, {
  "label": "兰溪市",
  "value": "330781"
}, {
  "label": "义乌市",
  "value": "330782"
}, {
  "label": "东阳市",
  "value": "330783"
}, {
  "label": "永康市",
  "value": "330784"
}], [{
  "label": "柯城区",
  "value": "330802"
}, {
  "label": "衢江区",
  "value": "330803"
}, {
  "label": "常山县",
  "value": "330822"
}, {
  "label": "开化县",
  "value": "330824"
}, {
  "label": "龙游县",
  "value": "330825"
}, {
  "label": "江山市",
  "value": "330881"
}], [{
  "label": "定海区",
  "value": "330902"
}, {
  "label": "普陀区",
  "value": "330903"
}, {
  "label": "岱山县",
  "value": "330921"
}, {
  "label": "嵊泗县",
  "value": "330922"
}], [{
  "label": "椒江区",
  "value": "331002"
}, {
  "label": "黄岩区",
  "value": "331003"
}, {
  "label": "路桥区",
  "value": "331004"
}, {
  "label": "三门县",
  "value": "331022"
}, {
  "label": "天台县",
  "value": "331023"
}, {
  "label": "仙居县",
  "value": "331024"
}, {
  "label": "温岭市",
  "value": "331081"
}, {
  "label": "临海市",
  "value": "331082"
}, {
  "label": "玉环市",
  "value": "331083"
}], [{
  "label": "莲都区",
  "value": "331102"
}, {
  "label": "青田县",
  "value": "331121"
}, {
  "label": "缙云县",
  "value": "331122"
}, {
  "label": "遂昌县",
  "value": "331123"
}, {
  "label": "松阳县",
  "value": "331124"
}, {
  "label": "云和县",
  "value": "331125"
}, {
  "label": "庆元县",
  "value": "331126"
}, {
  "label": "景宁畲族自治县",
  "value": "331127"
}, {
  "label": "龙泉市",
  "value": "331181"
}]], [[{
  "label": "瑶海区",
  "value": "340102"
}, {
  "label": "庐阳区",
  "value": "340103"
}, {
  "label": "蜀山区",
  "value": "340104"
}, {
  "label": "包河区",
  "value": "340111"
}, {
  "label": "长丰县",
  "value": "340121"
}, {
  "label": "肥东县",
  "value": "340122"
}, {
  "label": "肥西县",
  "value": "340123"
}, {
  "label": "庐江县",
  "value": "340124"
}, {
  "label": "合肥高新技术产业开发区",
  "value": "340171"
}, {
  "label": "合肥经济技术开发区",
  "value": "340172"
}, {
  "label": "合肥新站高新技术产业开发区",
  "value": "340173"
}, {
  "label": "巢湖市",
  "value": "340181"
}], [{
  "label": "镜湖区",
  "value": "340202"
}, {
  "label": "弋江区",
  "value": "340203"
}, {
  "label": "鸠江区",
  "value": "340207"
}, {
  "label": "三山区",
  "value": "340208"
}, {
  "label": "芜湖县",
  "value": "340221"
}, {
  "label": "繁昌县",
  "value": "340222"
}, {
  "label": "南陵县",
  "value": "340223"
}, {
  "label": "无为县",
  "value": "340225"
}, {
  "label": "芜湖经济技术开发区",
  "value": "340271"
}, {
  "label": "安徽芜湖长江大桥经济开发区",
  "value": "340272"
}], [{
  "label": "龙子湖区",
  "value": "340302"
}, {
  "label": "蚌山区",
  "value": "340303"
}, {
  "label": "禹会区",
  "value": "340304"
}, {
  "label": "淮上区",
  "value": "340311"
}, {
  "label": "怀远县",
  "value": "340321"
}, {
  "label": "五河县",
  "value": "340322"
}, {
  "label": "固镇县",
  "value": "340323"
}, {
  "label": "蚌埠市高新技术开发区",
  "value": "340371"
}, {
  "label": "蚌埠市经济开发区",
  "value": "340372"
}], [{
  "label": "大通区",
  "value": "340402"
}, {
  "label": "田家庵区",
  "value": "340403"
}, {
  "label": "谢家集区",
  "value": "340404"
}, {
  "label": "八公山区",
  "value": "340405"
}, {
  "label": "潘集区",
  "value": "340406"
}, {
  "label": "凤台县",
  "value": "340421"
}, {
  "label": "寿县",
  "value": "340422"
}], [{
  "label": "花山区",
  "value": "340503"
}, {
  "label": "雨山区",
  "value": "340504"
}, {
  "label": "博望区",
  "value": "340506"
}, {
  "label": "当涂县",
  "value": "340521"
}, {
  "label": "含山县",
  "value": "340522"
}, {
  "label": "和县",
  "value": "340523"
}], [{
  "label": "杜集区",
  "value": "340602"
}, {
  "label": "相山区",
  "value": "340603"
}, {
  "label": "烈山区",
  "value": "340604"
}, {
  "label": "濉溪县",
  "value": "340621"
}], [{
  "label": "铜官区",
  "value": "340705"
}, {
  "label": "义安区",
  "value": "340706"
}, {
  "label": "郊区",
  "value": "340711"
}, {
  "label": "枞阳县",
  "value": "340722"
}], [{
  "label": "迎江区",
  "value": "340802"
}, {
  "label": "大观区",
  "value": "340803"
}, {
  "label": "宜秀区",
  "value": "340811"
}, {
  "label": "怀宁县",
  "value": "340822"
}, {
  "label": "潜山县",
  "value": "340824"
}, {
  "label": "太湖县",
  "value": "340825"
}, {
  "label": "宿松县",
  "value": "340826"
}, {
  "label": "望江县",
  "value": "340827"
}, {
  "label": "岳西县",
  "value": "340828"
}, {
  "label": "安徽安庆经济开发区",
  "value": "340871"
}, {
  "label": "桐城市",
  "value": "340881"
}], [{
  "label": "屯溪区",
  "value": "341002"
}, {
  "label": "黄山区",
  "value": "341003"
}, {
  "label": "徽州区",
  "value": "341004"
}, {
  "label": "歙县",
  "value": "341021"
}, {
  "label": "休宁县",
  "value": "341022"
}, {
  "label": "黟县",
  "value": "341023"
}, {
  "label": "祁门县",
  "value": "341024"
}], [{
  "label": "琅琊区",
  "value": "341102"
}, {
  "label": "南谯区",
  "value": "341103"
}, {
  "label": "来安县",
  "value": "341122"
}, {
  "label": "全椒县",
  "value": "341124"
}, {
  "label": "定远县",
  "value": "341125"
}, {
  "label": "凤阳县",
  "value": "341126"
}, {
  "label": "苏滁现代产业园",
  "value": "341171"
}, {
  "label": "滁州经济技术开发区",
  "value": "341172"
}, {
  "label": "天长市",
  "value": "341181"
}, {
  "label": "明光市",
  "value": "341182"
}], [{
  "label": "颍州区",
  "value": "341202"
}, {
  "label": "颍东区",
  "value": "341203"
}, {
  "label": "颍泉区",
  "value": "341204"
}, {
  "label": "临泉县",
  "value": "341221"
}, {
  "label": "太和县",
  "value": "341222"
}, {
  "label": "阜南县",
  "value": "341225"
}, {
  "label": "颍上县",
  "value": "341226"
}, {
  "label": "阜阳合肥现代产业园区",
  "value": "341271"
}, {
  "label": "阜阳经济技术开发区",
  "value": "341272"
}, {
  "label": "界首市",
  "value": "341282"
}], [{
  "label": "埇桥区",
  "value": "341302"
}, {
  "label": "砀山县",
  "value": "341321"
}, {
  "label": "萧县",
  "value": "341322"
}, {
  "label": "灵璧县",
  "value": "341323"
}, {
  "label": "泗县",
  "value": "341324"
}, {
  "label": "宿州马鞍山现代产业园区",
  "value": "341371"
}, {
  "label": "宿州经济技术开发区",
  "value": "341372"
}], [{
  "label": "金安区",
  "value": "341502"
}, {
  "label": "裕安区",
  "value": "341503"
}, {
  "label": "叶集区",
  "value": "341504"
}, {
  "label": "霍邱县",
  "value": "341522"
}, {
  "label": "舒城县",
  "value": "341523"
}, {
  "label": "金寨县",
  "value": "341524"
}, {
  "label": "霍山县",
  "value": "341525"
}], [{
  "label": "谯城区",
  "value": "341602"
}, {
  "label": "涡阳县",
  "value": "341621"
}, {
  "label": "蒙城县",
  "value": "341622"
}, {
  "label": "利辛县",
  "value": "341623"
}], [{
  "label": "贵池区",
  "value": "341702"
}, {
  "label": "东至县",
  "value": "341721"
}, {
  "label": "石台县",
  "value": "341722"
}, {
  "label": "青阳县",
  "value": "341723"
}], [{
  "label": "宣州区",
  "value": "341802"
}, {
  "label": "郎溪县",
  "value": "341821"
}, {
  "label": "广德县",
  "value": "341822"
}, {
  "label": "泾县",
  "value": "341823"
}, {
  "label": "绩溪县",
  "value": "341824"
}, {
  "label": "旌德县",
  "value": "341825"
}, {
  "label": "宣城市经济开发区",
  "value": "341871"
}, {
  "label": "宁国市",
  "value": "341881"
}]], [[{
  "label": "鼓楼区",
  "value": "350102"
}, {
  "label": "台江区",
  "value": "350103"
}, {
  "label": "仓山区",
  "value": "350104"
}, {
  "label": "马尾区",
  "value": "350105"
}, {
  "label": "晋安区",
  "value": "350111"
}, {
  "label": "闽侯县",
  "value": "350121"
}, {
  "label": "连江县",
  "value": "350122"
}, {
  "label": "罗源县",
  "value": "350123"
}, {
  "label": "闽清县",
  "value": "350124"
}, {
  "label": "永泰县",
  "value": "350125"
}, {
  "label": "平潭县",
  "value": "350128"
}, {
  "label": "福清市",
  "value": "350181"
}, {
  "label": "长乐市",
  "value": "350182"
}], [{
  "label": "思明区",
  "value": "350203"
}, {
  "label": "海沧区",
  "value": "350205"
}, {
  "label": "湖里区",
  "value": "350206"
}, {
  "label": "集美区",
  "value": "350211"
}, {
  "label": "同安区",
  "value": "350212"
}, {
  "label": "翔安区",
  "value": "350213"
}], [{
  "label": "城厢区",
  "value": "350302"
}, {
  "label": "涵江区",
  "value": "350303"
}, {
  "label": "荔城区",
  "value": "350304"
}, {
  "label": "秀屿区",
  "value": "350305"
}, {
  "label": "仙游县",
  "value": "350322"
}], [{
  "label": "梅列区",
  "value": "350402"
}, {
  "label": "三元区",
  "value": "350403"
}, {
  "label": "明溪县",
  "value": "350421"
}, {
  "label": "清流县",
  "value": "350423"
}, {
  "label": "宁化县",
  "value": "350424"
}, {
  "label": "大田县",
  "value": "350425"
}, {
  "label": "尤溪县",
  "value": "350426"
}, {
  "label": "沙县",
  "value": "350427"
}, {
  "label": "将乐县",
  "value": "350428"
}, {
  "label": "泰宁县",
  "value": "350429"
}, {
  "label": "建宁县",
  "value": "350430"
}, {
  "label": "永安市",
  "value": "350481"
}], [{
  "label": "鲤城区",
  "value": "350502"
}, {
  "label": "丰泽区",
  "value": "350503"
}, {
  "label": "洛江区",
  "value": "350504"
}, {
  "label": "泉港区",
  "value": "350505"
}, {
  "label": "惠安县",
  "value": "350521"
}, {
  "label": "安溪县",
  "value": "350524"
}, {
  "label": "永春县",
  "value": "350525"
}, {
  "label": "德化县",
  "value": "350526"
}, {
  "label": "金门县",
  "value": "350527"
}, {
  "label": "石狮市",
  "value": "350581"
}, {
  "label": "晋江市",
  "value": "350582"
}, {
  "label": "南安市",
  "value": "350583"
}], [{
  "label": "芗城区",
  "value": "350602"
}, {
  "label": "龙文区",
  "value": "350603"
}, {
  "label": "云霄县",
  "value": "350622"
}, {
  "label": "漳浦县",
  "value": "350623"
}, {
  "label": "诏安县",
  "value": "350624"
}, {
  "label": "长泰县",
  "value": "350625"
}, {
  "label": "东山县",
  "value": "350626"
}, {
  "label": "南靖县",
  "value": "350627"
}, {
  "label": "平和县",
  "value": "350628"
}, {
  "label": "华安县",
  "value": "350629"
}, {
  "label": "龙海市",
  "value": "350681"
}], [{
  "label": "延平区",
  "value": "350702"
}, {
  "label": "建阳区",
  "value": "350703"
}, {
  "label": "顺昌县",
  "value": "350721"
}, {
  "label": "浦城县",
  "value": "350722"
}, {
  "label": "光泽县",
  "value": "350723"
}, {
  "label": "松溪县",
  "value": "350724"
}, {
  "label": "政和县",
  "value": "350725"
}, {
  "label": "邵武市",
  "value": "350781"
}, {
  "label": "武夷山市",
  "value": "350782"
}, {
  "label": "建瓯市",
  "value": "350783"
}], [{
  "label": "新罗区",
  "value": "350802"
}, {
  "label": "永定区",
  "value": "350803"
}, {
  "label": "长汀县",
  "value": "350821"
}, {
  "label": "上杭县",
  "value": "350823"
}, {
  "label": "武平县",
  "value": "350824"
}, {
  "label": "连城县",
  "value": "350825"
}, {
  "label": "漳平市",
  "value": "350881"
}], [{
  "label": "蕉城区",
  "value": "350902"
}, {
  "label": "霞浦县",
  "value": "350921"
}, {
  "label": "古田县",
  "value": "350922"
}, {
  "label": "屏南县",
  "value": "350923"
}, {
  "label": "寿宁县",
  "value": "350924"
}, {
  "label": "周宁县",
  "value": "350925"
}, {
  "label": "柘荣县",
  "value": "350926"
}, {
  "label": "福安市",
  "value": "350981"
}, {
  "label": "福鼎市",
  "value": "350982"
}]], [[{
  "label": "东湖区",
  "value": "360102"
}, {
  "label": "西湖区",
  "value": "360103"
}, {
  "label": "青云谱区",
  "value": "360104"
}, {
  "label": "湾里区",
  "value": "360105"
}, {
  "label": "青山湖区",
  "value": "360111"
}, {
  "label": "新建区",
  "value": "360112"
}, {
  "label": "南昌县",
  "value": "360121"
}, {
  "label": "安义县",
  "value": "360123"
}, {
  "label": "进贤县",
  "value": "360124"
}], [{
  "label": "昌江区",
  "value": "360202"
}, {
  "label": "珠山区",
  "value": "360203"
}, {
  "label": "浮梁县",
  "value": "360222"
}, {
  "label": "乐平市",
  "value": "360281"
}], [{
  "label": "安源区",
  "value": "360302"
}, {
  "label": "湘东区",
  "value": "360313"
}, {
  "label": "莲花县",
  "value": "360321"
}, {
  "label": "上栗县",
  "value": "360322"
}, {
  "label": "芦溪县",
  "value": "360323"
}], [{
  "label": "濂溪区",
  "value": "360402"
}, {
  "label": "浔阳区",
  "value": "360403"
}, {
  "label": "柴桑区",
  "value": "360404"
}, {
  "label": "武宁县",
  "value": "360423"
}, {
  "label": "修水县",
  "value": "360424"
}, {
  "label": "永修县",
  "value": "360425"
}, {
  "label": "德安县",
  "value": "360426"
}, {
  "label": "都昌县",
  "value": "360428"
}, {
  "label": "湖口县",
  "value": "360429"
}, {
  "label": "彭泽县",
  "value": "360430"
}, {
  "label": "瑞昌市",
  "value": "360481"
}, {
  "label": "共青城市",
  "value": "360482"
}, {
  "label": "庐山市",
  "value": "360483"
}], [{
  "label": "渝水区",
  "value": "360502"
}, {
  "label": "分宜县",
  "value": "360521"
}], [{
  "label": "月湖区",
  "value": "360602"
}, {
  "label": "余江县",
  "value": "360622"
}, {
  "label": "贵溪市",
  "value": "360681"
}], [{
  "label": "章贡区",
  "value": "360702"
}, {
  "label": "南康区",
  "value": "360703"
}, {
  "label": "赣县区",
  "value": "360704"
}, {
  "label": "信丰县",
  "value": "360722"
}, {
  "label": "大余县",
  "value": "360723"
}, {
  "label": "上犹县",
  "value": "360724"
}, {
  "label": "崇义县",
  "value": "360725"
}, {
  "label": "安远县",
  "value": "360726"
}, {
  "label": "龙南县",
  "value": "360727"
}, {
  "label": "定南县",
  "value": "360728"
}, {
  "label": "全南县",
  "value": "360729"
}, {
  "label": "宁都县",
  "value": "360730"
}, {
  "label": "于都县",
  "value": "360731"
}, {
  "label": "兴国县",
  "value": "360732"
}, {
  "label": "会昌县",
  "value": "360733"
}, {
  "label": "寻乌县",
  "value": "360734"
}, {
  "label": "石城县",
  "value": "360735"
}, {
  "label": "瑞金市",
  "value": "360781"
}], [{
  "label": "吉州区",
  "value": "360802"
}, {
  "label": "青原区",
  "value": "360803"
}, {
  "label": "吉安县",
  "value": "360821"
}, {
  "label": "吉水县",
  "value": "360822"
}, {
  "label": "峡江县",
  "value": "360823"
}, {
  "label": "新干县",
  "value": "360824"
}, {
  "label": "永丰县",
  "value": "360825"
}, {
  "label": "泰和县",
  "value": "360826"
}, {
  "label": "遂川县",
  "value": "360827"
}, {
  "label": "万安县",
  "value": "360828"
}, {
  "label": "安福县",
  "value": "360829"
}, {
  "label": "永新县",
  "value": "360830"
}, {
  "label": "井冈山市",
  "value": "360881"
}], [{
  "label": "袁州区",
  "value": "360902"
}, {
  "label": "奉新县",
  "value": "360921"
}, {
  "label": "万载县",
  "value": "360922"
}, {
  "label": "上高县",
  "value": "360923"
}, {
  "label": "宜丰县",
  "value": "360924"
}, {
  "label": "靖安县",
  "value": "360925"
}, {
  "label": "铜鼓县",
  "value": "360926"
}, {
  "label": "丰城市",
  "value": "360981"
}, {
  "label": "樟树市",
  "value": "360982"
}, {
  "label": "高安市",
  "value": "360983"
}], [{
  "label": "临川区",
  "value": "361002"
}, {
  "label": "东乡区",
  "value": "361003"
}, {
  "label": "南城县",
  "value": "361021"
}, {
  "label": "黎川县",
  "value": "361022"
}, {
  "label": "南丰县",
  "value": "361023"
}, {
  "label": "崇仁县",
  "value": "361024"
}, {
  "label": "乐安县",
  "value": "361025"
}, {
  "label": "宜黄县",
  "value": "361026"
}, {
  "label": "金溪县",
  "value": "361027"
}, {
  "label": "资溪县",
  "value": "361028"
}, {
  "label": "广昌县",
  "value": "361030"
}], [{
  "label": "信州区",
  "value": "361102"
}, {
  "label": "广丰区",
  "value": "361103"
}, {
  "label": "上饶县",
  "value": "361121"
}, {
  "label": "玉山县",
  "value": "361123"
}, {
  "label": "铅山县",
  "value": "361124"
}, {
  "label": "横峰县",
  "value": "361125"
}, {
  "label": "弋阳县",
  "value": "361126"
}, {
  "label": "余干县",
  "value": "361127"
}, {
  "label": "鄱阳县",
  "value": "361128"
}, {
  "label": "万年县",
  "value": "361129"
}, {
  "label": "婺源县",
  "value": "361130"
}, {
  "label": "德兴市",
  "value": "361181"
}]], [[{
  "label": "历下区",
  "value": "370102"
}, {
  "label": "市中区",
  "value": "370103"
}, {
  "label": "槐荫区",
  "value": "370104"
}, {
  "label": "天桥区",
  "value": "370105"
}, {
  "label": "历城区",
  "value": "370112"
}, {
  "label": "长清区",
  "value": "370113"
}, {
  "label": "章丘区",
  "value": "370114"
}, {
  "label": "平阴县",
  "value": "370124"
}, {
  "label": "济阳县",
  "value": "370125"
}, {
  "label": "商河县",
  "value": "370126"
}, {
  "label": "济南高新技术产业开发区",
  "value": "370171"
}], [{
  "label": "市南区",
  "value": "370202"
}, {
  "label": "市北区",
  "value": "370203"
}, {
  "label": "黄岛区",
  "value": "370211"
}, {
  "label": "崂山区",
  "value": "370212"
}, {
  "label": "李沧区",
  "value": "370213"
}, {
  "label": "城阳区",
  "value": "370214"
}, {
  "label": "即墨区",
  "value": "370215"
}, {
  "label": "青岛高新技术产业开发区",
  "value": "370271"
}, {
  "label": "胶州市",
  "value": "370281"
}, {
  "label": "平度市",
  "value": "370283"
}, {
  "label": "莱西市",
  "value": "370285"
}], [{
  "label": "淄川区",
  "value": "370302"
}, {
  "label": "张店区",
  "value": "370303"
}, {
  "label": "博山区",
  "value": "370304"
}, {
  "label": "临淄区",
  "value": "370305"
}, {
  "label": "周村区",
  "value": "370306"
}, {
  "label": "桓台县",
  "value": "370321"
}, {
  "label": "高青县",
  "value": "370322"
}, {
  "label": "沂源县",
  "value": "370323"
}], [{
  "label": "市中区",
  "value": "370402"
}, {
  "label": "薛城区",
  "value": "370403"
}, {
  "label": "峄城区",
  "value": "370404"
}, {
  "label": "台儿庄区",
  "value": "370405"
}, {
  "label": "山亭区",
  "value": "370406"
}, {
  "label": "滕州市",
  "value": "370481"
}], [{
  "label": "东营区",
  "value": "370502"
}, {
  "label": "河口区",
  "value": "370503"
}, {
  "label": "垦利区",
  "value": "370505"
}, {
  "label": "利津县",
  "value": "370522"
}, {
  "label": "广饶县",
  "value": "370523"
}, {
  "label": "东营经济技术开发区",
  "value": "370571"
}, {
  "label": "东营港经济开发区",
  "value": "370572"
}], [{
  "label": "芝罘区",
  "value": "370602"
}, {
  "label": "福山区",
  "value": "370611"
}, {
  "label": "牟平区",
  "value": "370612"
}, {
  "label": "莱山区",
  "value": "370613"
}, {
  "label": "长岛县",
  "value": "370634"
}, {
  "label": "烟台高新技术产业开发区",
  "value": "370671"
}, {
  "label": "烟台经济技术开发区",
  "value": "370672"
}, {
  "label": "龙口市",
  "value": "370681"
}, {
  "label": "莱阳市",
  "value": "370682"
}, {
  "label": "莱州市",
  "value": "370683"
}, {
  "label": "蓬莱市",
  "value": "370684"
}, {
  "label": "招远市",
  "value": "370685"
}, {
  "label": "栖霞市",
  "value": "370686"
}, {
  "label": "海阳市",
  "value": "370687"
}], [{
  "label": "潍城区",
  "value": "370702"
}, {
  "label": "寒亭区",
  "value": "370703"
}, {
  "label": "坊子区",
  "value": "370704"
}, {
  "label": "奎文区",
  "value": "370705"
}, {
  "label": "临朐县",
  "value": "370724"
}, {
  "label": "昌乐县",
  "value": "370725"
}, {
  "label": "潍坊滨海经济技术开发区",
  "value": "370772"
}, {
  "label": "青州市",
  "value": "370781"
}, {
  "label": "诸城市",
  "value": "370782"
}, {
  "label": "寿光市",
  "value": "370783"
}, {
  "label": "安丘市",
  "value": "370784"
}, {
  "label": "高密市",
  "value": "370785"
}, {
  "label": "昌邑市",
  "value": "370786"
}], [{
  "label": "任城区",
  "value": "370811"
}, {
  "label": "兖州区",
  "value": "370812"
}, {
  "label": "微山县",
  "value": "370826"
}, {
  "label": "鱼台县",
  "value": "370827"
}, {
  "label": "金乡县",
  "value": "370828"
}, {
  "label": "嘉祥县",
  "value": "370829"
}, {
  "label": "汶上县",
  "value": "370830"
}, {
  "label": "泗水县",
  "value": "370831"
}, {
  "label": "梁山县",
  "value": "370832"
}, {
  "label": "济宁高新技术产业开发区",
  "value": "370871"
}, {
  "label": "曲阜市",
  "value": "370881"
}, {
  "label": "邹城市",
  "value": "370883"
}], [{
  "label": "泰山区",
  "value": "370902"
}, {
  "label": "岱岳区",
  "value": "370911"
}, {
  "label": "宁阳县",
  "value": "370921"
}, {
  "label": "东平县",
  "value": "370923"
}, {
  "label": "新泰市",
  "value": "370982"
}, {
  "label": "肥城市",
  "value": "370983"
}], [{
  "label": "环翠区",
  "value": "371002"
}, {
  "label": "文登区",
  "value": "371003"
}, {
  "label": "威海火炬高技术产业开发区",
  "value": "371071"
}, {
  "label": "威海经济技术开发区",
  "value": "371072"
}, {
  "label": "威海临港经济技术开发区",
  "value": "371073"
}, {
  "label": "荣成市",
  "value": "371082"
}, {
  "label": "乳山市",
  "value": "371083"
}], [{
  "label": "东港区",
  "value": "371102"
}, {
  "label": "岚山区",
  "value": "371103"
}, {
  "label": "五莲县",
  "value": "371121"
}, {
  "label": "莒县",
  "value": "371122"
}, {
  "label": "日照经济技术开发区",
  "value": "371171"
}, {
  "label": "日照国际海洋城",
  "value": "371172"
}], [{
  "label": "莱城区",
  "value": "371202"
}, {
  "label": "钢城区",
  "value": "371203"
}], [{
  "label": "兰山区",
  "value": "371302"
}, {
  "label": "罗庄区",
  "value": "371311"
}, {
  "label": "河东区",
  "value": "371312"
}, {
  "label": "沂南县",
  "value": "371321"
}, {
  "label": "郯城县",
  "value": "371322"
}, {
  "label": "沂水县",
  "value": "371323"
}, {
  "label": "兰陵县",
  "value": "371324"
}, {
  "label": "费县",
  "value": "371325"
}, {
  "label": "平邑县",
  "value": "371326"
}, {
  "label": "莒南县",
  "value": "371327"
}, {
  "label": "蒙阴县",
  "value": "371328"
}, {
  "label": "临沭县",
  "value": "371329"
}, {
  "label": "临沂高新技术产业开发区",
  "value": "371371"
}, {
  "label": "临沂经济技术开发区",
  "value": "371372"
}, {
  "label": "临沂临港经济开发区",
  "value": "371373"
}], [{
  "label": "德城区",
  "value": "371402"
}, {
  "label": "陵城区",
  "value": "371403"
}, {
  "label": "宁津县",
  "value": "371422"
}, {
  "label": "庆云县",
  "value": "371423"
}, {
  "label": "临邑县",
  "value": "371424"
}, {
  "label": "齐河县",
  "value": "371425"
}, {
  "label": "平原县",
  "value": "371426"
}, {
  "label": "夏津县",
  "value": "371427"
}, {
  "label": "武城县",
  "value": "371428"
}, {
  "label": "德州经济技术开发区",
  "value": "371471"
}, {
  "label": "德州运河经济开发区",
  "value": "371472"
}, {
  "label": "乐陵市",
  "value": "371481"
}, {
  "label": "禹城市",
  "value": "371482"
}], [{
  "label": "东昌府区",
  "value": "371502"
}, {
  "label": "阳谷县",
  "value": "371521"
}, {
  "label": "莘县",
  "value": "371522"
}, {
  "label": "茌平县",
  "value": "371523"
}, {
  "label": "东阿县",
  "value": "371524"
}, {
  "label": "冠县",
  "value": "371525"
}, {
  "label": "高唐县",
  "value": "371526"
}, {
  "label": "临清市",
  "value": "371581"
}], [{
  "label": "滨城区",
  "value": "371602"
}, {
  "label": "沾化区",
  "value": "371603"
}, {
  "label": "惠民县",
  "value": "371621"
}, {
  "label": "阳信县",
  "value": "371622"
}, {
  "label": "无棣县",
  "value": "371623"
}, {
  "label": "博兴县",
  "value": "371625"
}, {
  "label": "邹平县",
  "value": "371626"
}], [{
  "label": "牡丹区",
  "value": "371702"
}, {
  "label": "定陶区",
  "value": "371703"
}, {
  "label": "曹县",
  "value": "371721"
}, {
  "label": "单县",
  "value": "371722"
}, {
  "label": "成武县",
  "value": "371723"
}, {
  "label": "巨野县",
  "value": "371724"
}, {
  "label": "郓城县",
  "value": "371725"
}, {
  "label": "鄄城县",
  "value": "371726"
}, {
  "label": "东明县",
  "value": "371728"
}, {
  "label": "菏泽经济技术开发区",
  "value": "371771"
}, {
  "label": "菏泽高新技术开发区",
  "value": "371772"
}]], [[{
  "label": "中原区",
  "value": "410102"
}, {
  "label": "二七区",
  "value": "410103"
}, {
  "label": "管城回族区",
  "value": "410104"
}, {
  "label": "金水区",
  "value": "410105"
}, {
  "label": "上街区",
  "value": "410106"
}, {
  "label": "惠济区",
  "value": "410108"
}, {
  "label": "中牟县",
  "value": "410122"
}, {
  "label": "郑州经济技术开发区",
  "value": "410171"
}, {
  "label": "郑州高新技术产业开发区",
  "value": "410172"
}, {
  "label": "郑州航空港经济综合实验区",
  "value": "410173"
}, {
  "label": "巩义市",
  "value": "410181"
}, {
  "label": "荥阳市",
  "value": "410182"
}, {
  "label": "新密市",
  "value": "410183"
}, {
  "label": "新郑市",
  "value": "410184"
}, {
  "label": "登封市",
  "value": "410185"
}], [{
  "label": "龙亭区",
  "value": "410202"
}, {
  "label": "顺河回族区",
  "value": "410203"
}, {
  "label": "鼓楼区",
  "value": "410204"
}, {
  "label": "禹王台区",
  "value": "410205"
}, {
  "label": "祥符区",
  "value": "410212"
}, {
  "label": "杞县",
  "value": "410221"
}, {
  "label": "通许县",
  "value": "410222"
}, {
  "label": "尉氏县",
  "value": "410223"
}, {
  "label": "兰考县",
  "value": "410225"
}], [{
  "label": "老城区",
  "value": "410302"
}, {
  "label": "西工区",
  "value": "410303"
}, {
  "label": "瀍河回族区",
  "value": "410304"
}, {
  "label": "涧西区",
  "value": "410305"
}, {
  "label": "吉利区",
  "value": "410306"
}, {
  "label": "洛龙区",
  "value": "410311"
}, {
  "label": "孟津县",
  "value": "410322"
}, {
  "label": "新安县",
  "value": "410323"
}, {
  "label": "栾川县",
  "value": "410324"
}, {
  "label": "嵩县",
  "value": "410325"
}, {
  "label": "汝阳县",
  "value": "410326"
}, {
  "label": "宜阳县",
  "value": "410327"
}, {
  "label": "洛宁县",
  "value": "410328"
}, {
  "label": "伊川县",
  "value": "410329"
}, {
  "label": "洛阳高新技术产业开发区",
  "value": "410371"
}, {
  "label": "偃师市",
  "value": "410381"
}], [{
  "label": "新华区",
  "value": "410402"
}, {
  "label": "卫东区",
  "value": "410403"
}, {
  "label": "石龙区",
  "value": "410404"
}, {
  "label": "湛河区",
  "value": "410411"
}, {
  "label": "宝丰县",
  "value": "410421"
}, {
  "label": "叶县",
  "value": "410422"
}, {
  "label": "鲁山县",
  "value": "410423"
}, {
  "label": "郏县",
  "value": "410425"
}, {
  "label": "平顶山高新技术产业开发区",
  "value": "410471"
}, {
  "label": "平顶山市新城区",
  "value": "410472"
}, {
  "label": "舞钢市",
  "value": "410481"
}, {
  "label": "汝州市",
  "value": "410482"
}], [{
  "label": "文峰区",
  "value": "410502"
}, {
  "label": "北关区",
  "value": "410503"
}, {
  "label": "殷都区",
  "value": "410505"
}, {
  "label": "龙安区",
  "value": "410506"
}, {
  "label": "安阳县",
  "value": "410522"
}, {
  "label": "汤阴县",
  "value": "410523"
}, {
  "label": "滑县",
  "value": "410526"
}, {
  "label": "内黄县",
  "value": "410527"
}, {
  "label": "安阳高新技术产业开发区",
  "value": "410571"
}, {
  "label": "林州市",
  "value": "410581"
}], [{
  "label": "鹤山区",
  "value": "410602"
}, {
  "label": "山城区",
  "value": "410603"
}, {
  "label": "淇滨区",
  "value": "410611"
}, {
  "label": "浚县",
  "value": "410621"
}, {
  "label": "淇县",
  "value": "410622"
}, {
  "label": "鹤壁经济技术开发区",
  "value": "410671"
}], [{
  "label": "红旗区",
  "value": "410702"
}, {
  "label": "卫滨区",
  "value": "410703"
}, {
  "label": "凤泉区",
  "value": "410704"
}, {
  "label": "牧野区",
  "value": "410711"
}, {
  "label": "新乡县",
  "value": "410721"
}, {
  "label": "获嘉县",
  "value": "410724"
}, {
  "label": "原阳县",
  "value": "410725"
}, {
  "label": "延津县",
  "value": "410726"
}, {
  "label": "封丘县",
  "value": "410727"
}, {
  "label": "长垣县",
  "value": "410728"
}, {
  "label": "新乡高新技术产业开发区",
  "value": "410771"
}, {
  "label": "新乡经济技术开发区",
  "value": "410772"
}, {
  "label": "新乡市平原城乡一体化示范区",
  "value": "410773"
}, {
  "label": "卫辉市",
  "value": "410781"
}, {
  "label": "辉县市",
  "value": "410782"
}], [{
  "label": "解放区",
  "value": "410802"
}, {
  "label": "中站区",
  "value": "410803"
}, {
  "label": "马村区",
  "value": "410804"
}, {
  "label": "山阳区",
  "value": "410811"
}, {
  "label": "修武县",
  "value": "410821"
}, {
  "label": "博爱县",
  "value": "410822"
}, {
  "label": "武陟县",
  "value": "410823"
}, {
  "label": "温县",
  "value": "410825"
}, {
  "label": "焦作城乡一体化示范区",
  "value": "410871"
}, {
  "label": "沁阳市",
  "value": "410882"
}, {
  "label": "孟州市",
  "value": "410883"
}], [{
  "label": "华龙区",
  "value": "410902"
}, {
  "label": "清丰县",
  "value": "410922"
}, {
  "label": "南乐县",
  "value": "410923"
}, {
  "label": "范县",
  "value": "410926"
}, {
  "label": "台前县",
  "value": "410927"
}, {
  "label": "濮阳县",
  "value": "410928"
}, {
  "label": "河南濮阳工业园区",
  "value": "410971"
}, {
  "label": "濮阳经济技术开发区",
  "value": "410972"
}], [{
  "label": "魏都区",
  "value": "411002"
}, {
  "label": "建安区",
  "value": "411003"
}, {
  "label": "鄢陵县",
  "value": "411024"
}, {
  "label": "襄城县",
  "value": "411025"
}, {
  "label": "许昌经济技术开发区",
  "value": "411071"
}, {
  "label": "禹州市",
  "value": "411081"
}, {
  "label": "长葛市",
  "value": "411082"
}], [{
  "label": "源汇区",
  "value": "411102"
}, {
  "label": "郾城区",
  "value": "411103"
}, {
  "label": "召陵区",
  "value": "411104"
}, {
  "label": "舞阳县",
  "value": "411121"
}, {
  "label": "临颍县",
  "value": "411122"
}, {
  "label": "漯河经济技术开发区",
  "value": "411171"
}], [{
  "label": "湖滨区",
  "value": "411202"
}, {
  "label": "陕州区",
  "value": "411203"
}, {
  "label": "渑池县",
  "value": "411221"
}, {
  "label": "卢氏县",
  "value": "411224"
}, {
  "label": "河南三门峡经济开发区",
  "value": "411271"
}, {
  "label": "义马市",
  "value": "411281"
}, {
  "label": "灵宝市",
  "value": "411282"
}], [{
  "label": "宛城区",
  "value": "411302"
}, {
  "label": "卧龙区",
  "value": "411303"
}, {
  "label": "南召县",
  "value": "411321"
}, {
  "label": "方城县",
  "value": "411322"
}, {
  "label": "西峡县",
  "value": "411323"
}, {
  "label": "镇平县",
  "value": "411324"
}, {
  "label": "内乡县",
  "value": "411325"
}, {
  "label": "淅川县",
  "value": "411326"
}, {
  "label": "社旗县",
  "value": "411327"
}, {
  "label": "唐河县",
  "value": "411328"
}, {
  "label": "新野县",
  "value": "411329"
}, {
  "label": "桐柏县",
  "value": "411330"
}, {
  "label": "南阳高新技术产业开发区",
  "value": "411371"
}, {
  "label": "南阳市城乡一体化示范区",
  "value": "411372"
}, {
  "label": "邓州市",
  "value": "411381"
}], [{
  "label": "梁园区",
  "value": "411402"
}, {
  "label": "睢阳区",
  "value": "411403"
}, {
  "label": "民权县",
  "value": "411421"
}, {
  "label": "睢县",
  "value": "411422"
}, {
  "label": "宁陵县",
  "value": "411423"
}, {
  "label": "柘城县",
  "value": "411424"
}, {
  "label": "虞城县",
  "value": "411425"
}, {
  "label": "夏邑县",
  "value": "411426"
}, {
  "label": "豫东综合物流产业聚集区",
  "value": "411471"
}, {
  "label": "河南商丘经济开发区",
  "value": "411472"
}, {
  "label": "永城市",
  "value": "411481"
}], [{
  "label": "浉河区",
  "value": "411502"
}, {
  "label": "平桥区",
  "value": "411503"
}, {
  "label": "罗山县",
  "value": "411521"
}, {
  "label": "光山县",
  "value": "411522"
}, {
  "label": "新县",
  "value": "411523"
}, {
  "label": "商城县",
  "value": "411524"
}, {
  "label": "固始县",
  "value": "411525"
}, {
  "label": "潢川县",
  "value": "411526"
}, {
  "label": "淮滨县",
  "value": "411527"
}, {
  "label": "息县",
  "value": "411528"
}, {
  "label": "信阳高新技术产业开发区",
  "value": "411571"
}], [{
  "label": "川汇区",
  "value": "411602"
}, {
  "label": "扶沟县",
  "value": "411621"
}, {
  "label": "西华县",
  "value": "411622"
}, {
  "label": "商水县",
  "value": "411623"
}, {
  "label": "沈丘县",
  "value": "411624"
}, {
  "label": "郸城县",
  "value": "411625"
}, {
  "label": "淮阳县",
  "value": "411626"
}, {
  "label": "太康县",
  "value": "411627"
}, {
  "label": "鹿邑县",
  "value": "411628"
}, {
  "label": "河南周口经济开发区",
  "value": "411671"
}, {
  "label": "项城市",
  "value": "411681"
}], [{
  "label": "驿城区",
  "value": "411702"
}, {
  "label": "西平县",
  "value": "411721"
}, {
  "label": "上蔡县",
  "value": "411722"
}, {
  "label": "平舆县",
  "value": "411723"
}, {
  "label": "正阳县",
  "value": "411724"
}, {
  "label": "确山县",
  "value": "411725"
}, {
  "label": "泌阳县",
  "value": "411726"
}, {
  "label": "汝南县",
  "value": "411727"
}, {
  "label": "遂平县",
  "value": "411728"
}, {
  "label": "新蔡县",
  "value": "411729"
}, {
  "label": "河南驻马店经济开发区",
  "value": "411771"
}], [{
  "label": "济源市",
  "value": "419001"
}]], [[{
  "label": "江岸区",
  "value": "420102"
}, {
  "label": "江汉区",
  "value": "420103"
}, {
  "label": "硚口区",
  "value": "420104"
}, {
  "label": "汉阳区",
  "value": "420105"
}, {
  "label": "武昌区",
  "value": "420106"
}, {
  "label": "青山区",
  "value": "420107"
}, {
  "label": "洪山区",
  "value": "420111"
}, {
  "label": "东西湖区",
  "value": "420112"
}, {
  "label": "汉南区",
  "value": "420113"
}, {
  "label": "蔡甸区",
  "value": "420114"
}, {
  "label": "江夏区",
  "value": "420115"
}, {
  "label": "黄陂区",
  "value": "420116"
}, {
  "label": "新洲区",
  "value": "420117"
}], [{
  "label": "黄石港区",
  "value": "420202"
}, {
  "label": "西塞山区",
  "value": "420203"
}, {
  "label": "下陆区",
  "value": "420204"
}, {
  "label": "铁山区",
  "value": "420205"
}, {
  "label": "阳新县",
  "value": "420222"
}, {
  "label": "大冶市",
  "value": "420281"
}], [{
  "label": "茅箭区",
  "value": "420302"
}, {
  "label": "张湾区",
  "value": "420303"
}, {
  "label": "郧阳区",
  "value": "420304"
}, {
  "label": "郧西县",
  "value": "420322"
}, {
  "label": "竹山县",
  "value": "420323"
}, {
  "label": "竹溪县",
  "value": "420324"
}, {
  "label": "房县",
  "value": "420325"
}, {
  "label": "丹江口市",
  "value": "420381"
}], [{
  "label": "西陵区",
  "value": "420502"
}, {
  "label": "伍家岗区",
  "value": "420503"
}, {
  "label": "点军区",
  "value": "420504"
}, {
  "label": "猇亭区",
  "value": "420505"
}, {
  "label": "夷陵区",
  "value": "420506"
}, {
  "label": "远安县",
  "value": "420525"
}, {
  "label": "兴山县",
  "value": "420526"
}, {
  "label": "秭归县",
  "value": "420527"
}, {
  "label": "长阳土家族自治县",
  "value": "420528"
}, {
  "label": "五峰土家族自治县",
  "value": "420529"
}, {
  "label": "宜都市",
  "value": "420581"
}, {
  "label": "当阳市",
  "value": "420582"
}, {
  "label": "枝江市",
  "value": "420583"
}], [{
  "label": "襄城区",
  "value": "420602"
}, {
  "label": "樊城区",
  "value": "420606"
}, {
  "label": "襄州区",
  "value": "420607"
}, {
  "label": "南漳县",
  "value": "420624"
}, {
  "label": "谷城县",
  "value": "420625"
}, {
  "label": "保康县",
  "value": "420626"
}, {
  "label": "老河口市",
  "value": "420682"
}, {
  "label": "枣阳市",
  "value": "420683"
}, {
  "label": "宜城市",
  "value": "420684"
}], [{
  "label": "梁子湖区",
  "value": "420702"
}, {
  "label": "华容区",
  "value": "420703"
}, {
  "label": "鄂城区",
  "value": "420704"
}], [{
  "label": "东宝区",
  "value": "420802"
}, {
  "label": "掇刀区",
  "value": "420804"
}, {
  "label": "京山县",
  "value": "420821"
}, {
  "label": "沙洋县",
  "value": "420822"
}, {
  "label": "钟祥市",
  "value": "420881"
}], [{
  "label": "孝南区",
  "value": "420902"
}, {
  "label": "孝昌县",
  "value": "420921"
}, {
  "label": "大悟县",
  "value": "420922"
}, {
  "label": "云梦县",
  "value": "420923"
}, {
  "label": "应城市",
  "value": "420981"
}, {
  "label": "安陆市",
  "value": "420982"
}, {
  "label": "汉川市",
  "value": "420984"
}], [{
  "label": "沙市区",
  "value": "421002"
}, {
  "label": "荆州区",
  "value": "421003"
}, {
  "label": "公安县",
  "value": "421022"
}, {
  "label": "监利县",
  "value": "421023"
}, {
  "label": "江陵县",
  "value": "421024"
}, {
  "label": "荆州经济技术开发区",
  "value": "421071"
}, {
  "label": "石首市",
  "value": "421081"
}, {
  "label": "洪湖市",
  "value": "421083"
}, {
  "label": "松滋市",
  "value": "421087"
}], [{
  "label": "黄州区",
  "value": "421102"
}, {
  "label": "团风县",
  "value": "421121"
}, {
  "label": "红安县",
  "value": "421122"
}, {
  "label": "罗田县",
  "value": "421123"
}, {
  "label": "英山县",
  "value": "421124"
}, {
  "label": "浠水县",
  "value": "421125"
}, {
  "label": "蕲春县",
  "value": "421126"
}, {
  "label": "黄梅县",
  "value": "421127"
}, {
  "label": "龙感湖管理区",
  "value": "421171"
}, {
  "label": "麻城市",
  "value": "421181"
}, {
  "label": "武穴市",
  "value": "421182"
}], [{
  "label": "咸安区",
  "value": "421202"
}, {
  "label": "嘉鱼县",
  "value": "421221"
}, {
  "label": "通城县",
  "value": "421222"
}, {
  "label": "崇阳县",
  "value": "421223"
}, {
  "label": "通山县",
  "value": "421224"
}, {
  "label": "赤壁市",
  "value": "421281"
}], [{
  "label": "曾都区",
  "value": "421303"
}, {
  "label": "随县",
  "value": "421321"
}, {
  "label": "广水市",
  "value": "421381"
}], [{
  "label": "恩施市",
  "value": "422801"
}, {
  "label": "利川市",
  "value": "422802"
}, {
  "label": "建始县",
  "value": "422822"
}, {
  "label": "巴东县",
  "value": "422823"
}, {
  "label": "宣恩县",
  "value": "422825"
}, {
  "label": "咸丰县",
  "value": "422826"
}, {
  "label": "来凤县",
  "value": "422827"
}, {
  "label": "鹤峰县",
  "value": "422828"
}], [{
  "label": "仙桃市",
  "value": "429004"
}, {
  "label": "潜江市",
  "value": "429005"
}, {
  "label": "天门市",
  "value": "429006"
}, {
  "label": "神农架林区",
  "value": "429021"
}]], [[{
  "label": "芙蓉区",
  "value": "430102"
}, {
  "label": "天心区",
  "value": "430103"
}, {
  "label": "岳麓区",
  "value": "430104"
}, {
  "label": "开福区",
  "value": "430105"
}, {
  "label": "雨花区",
  "value": "430111"
}, {
  "label": "望城区",
  "value": "430112"
}, {
  "label": "长沙县",
  "value": "430121"
}, {
  "label": "浏阳市",
  "value": "430181"
}, {
  "label": "宁乡市",
  "value": "430182"
}], [{
  "label": "荷塘区",
  "value": "430202"
}, {
  "label": "芦淞区",
  "value": "430203"
}, {
  "label": "石峰区",
  "value": "430204"
}, {
  "label": "天元区",
  "value": "430211"
}, {
  "label": "株洲县",
  "value": "430221"
}, {
  "label": "攸县",
  "value": "430223"
}, {
  "label": "茶陵县",
  "value": "430224"
}, {
  "label": "炎陵县",
  "value": "430225"
}, {
  "label": "云龙示范区",
  "value": "430271"
}, {
  "label": "醴陵市",
  "value": "430281"
}], [{
  "label": "雨湖区",
  "value": "430302"
}, {
  "label": "岳塘区",
  "value": "430304"
}, {
  "label": "湘潭县",
  "value": "430321"
}, {
  "label": "湖南湘潭高新技术产业园区",
  "value": "430371"
}, {
  "label": "湘潭昭山示范区",
  "value": "430372"
}, {
  "label": "湘潭九华示范区",
  "value": "430373"
}, {
  "label": "湘乡市",
  "value": "430381"
}, {
  "label": "韶山市",
  "value": "430382"
}], [{
  "label": "珠晖区",
  "value": "430405"
}, {
  "label": "雁峰区",
  "value": "430406"
}, {
  "label": "石鼓区",
  "value": "430407"
}, {
  "label": "蒸湘区",
  "value": "430408"
}, {
  "label": "南岳区",
  "value": "430412"
}, {
  "label": "衡阳县",
  "value": "430421"
}, {
  "label": "衡南县",
  "value": "430422"
}, {
  "label": "衡山县",
  "value": "430423"
}, {
  "label": "衡东县",
  "value": "430424"
}, {
  "label": "祁东县",
  "value": "430426"
}, {
  "label": "衡阳综合保税区",
  "value": "430471"
}, {
  "label": "湖南衡阳高新技术产业园区",
  "value": "430472"
}, {
  "label": "湖南衡阳松木经济开发区",
  "value": "430473"
}, {
  "label": "耒阳市",
  "value": "430481"
}, {
  "label": "常宁市",
  "value": "430482"
}], [{
  "label": "双清区",
  "value": "430502"
}, {
  "label": "大祥区",
  "value": "430503"
}, {
  "label": "北塔区",
  "value": "430511"
}, {
  "label": "邵东县",
  "value": "430521"
}, {
  "label": "新邵县",
  "value": "430522"
}, {
  "label": "邵阳县",
  "value": "430523"
}, {
  "label": "隆回县",
  "value": "430524"
}, {
  "label": "洞口县",
  "value": "430525"
}, {
  "label": "绥宁县",
  "value": "430527"
}, {
  "label": "新宁县",
  "value": "430528"
}, {
  "label": "城步苗族自治县",
  "value": "430529"
}, {
  "label": "武冈市",
  "value": "430581"
}], [{
  "label": "岳阳楼区",
  "value": "430602"
}, {
  "label": "云溪区",
  "value": "430603"
}, {
  "label": "君山区",
  "value": "430611"
}, {
  "label": "岳阳县",
  "value": "430621"
}, {
  "label": "华容县",
  "value": "430623"
}, {
  "label": "湘阴县",
  "value": "430624"
}, {
  "label": "平江县",
  "value": "430626"
}, {
  "label": "岳阳市屈原管理区",
  "value": "430671"
}, {
  "label": "汨罗市",
  "value": "430681"
}, {
  "label": "临湘市",
  "value": "430682"
}], [{
  "label": "武陵区",
  "value": "430702"
}, {
  "label": "鼎城区",
  "value": "430703"
}, {
  "label": "安乡县",
  "value": "430721"
}, {
  "label": "汉寿县",
  "value": "430722"
}, {
  "label": "澧县",
  "value": "430723"
}, {
  "label": "临澧县",
  "value": "430724"
}, {
  "label": "桃源县",
  "value": "430725"
}, {
  "label": "石门县",
  "value": "430726"
}, {
  "label": "常德市西洞庭管理区",
  "value": "430771"
}, {
  "label": "津市市",
  "value": "430781"
}], [{
  "label": "永定区",
  "value": "430802"
}, {
  "label": "武陵源区",
  "value": "430811"
}, {
  "label": "慈利县",
  "value": "430821"
}, {
  "label": "桑植县",
  "value": "430822"
}], [{
  "label": "资阳区",
  "value": "430902"
}, {
  "label": "赫山区",
  "value": "430903"
}, {
  "label": "南县",
  "value": "430921"
}, {
  "label": "桃江县",
  "value": "430922"
}, {
  "label": "安化县",
  "value": "430923"
}, {
  "label": "益阳市大通湖管理区",
  "value": "430971"
}, {
  "label": "湖南益阳高新技术产业园区",
  "value": "430972"
}, {
  "label": "沅江市",
  "value": "430981"
}], [{
  "label": "北湖区",
  "value": "431002"
}, {
  "label": "苏仙区",
  "value": "431003"
}, {
  "label": "桂阳县",
  "value": "431021"
}, {
  "label": "宜章县",
  "value": "431022"
}, {
  "label": "永兴县",
  "value": "431023"
}, {
  "label": "嘉禾县",
  "value": "431024"
}, {
  "label": "临武县",
  "value": "431025"
}, {
  "label": "汝城县",
  "value": "431026"
}, {
  "label": "桂东县",
  "value": "431027"
}, {
  "label": "安仁县",
  "value": "431028"
}, {
  "label": "资兴市",
  "value": "431081"
}], [{
  "label": "零陵区",
  "value": "431102"
}, {
  "label": "冷水滩区",
  "value": "431103"
}, {
  "label": "祁阳县",
  "value": "431121"
}, {
  "label": "东安县",
  "value": "431122"
}, {
  "label": "双牌县",
  "value": "431123"
}, {
  "label": "道县",
  "value": "431124"
}, {
  "label": "江永县",
  "value": "431125"
}, {
  "label": "宁远县",
  "value": "431126"
}, {
  "label": "蓝山县",
  "value": "431127"
}, {
  "label": "新田县",
  "value": "431128"
}, {
  "label": "江华瑶族自治县",
  "value": "431129"
}, {
  "label": "永州经济技术开发区",
  "value": "431171"
}, {
  "label": "永州市金洞管理区",
  "value": "431172"
}, {
  "label": "永州市回龙圩管理区",
  "value": "431173"
}], [{
  "label": "鹤城区",
  "value": "431202"
}, {
  "label": "中方县",
  "value": "431221"
}, {
  "label": "沅陵县",
  "value": "431222"
}, {
  "label": "辰溪县",
  "value": "431223"
}, {
  "label": "溆浦县",
  "value": "431224"
}, {
  "label": "会同县",
  "value": "431225"
}, {
  "label": "麻阳苗族自治县",
  "value": "431226"
}, {
  "label": "新晃侗族自治县",
  "value": "431227"
}, {
  "label": "芷江侗族自治县",
  "value": "431228"
}, {
  "label": "靖州苗族侗族自治县",
  "value": "431229"
}, {
  "label": "通道侗族自治县",
  "value": "431230"
}, {
  "label": "怀化市洪江管理区",
  "value": "431271"
}, {
  "label": "洪江市",
  "value": "431281"
}], [{
  "label": "娄星区",
  "value": "431302"
}, {
  "label": "双峰县",
  "value": "431321"
}, {
  "label": "新化县",
  "value": "431322"
}, {
  "label": "冷水江市",
  "value": "431381"
}, {
  "label": "涟源市",
  "value": "431382"
}], [{
  "label": "吉首市",
  "value": "433101"
}, {
  "label": "泸溪县",
  "value": "433122"
}, {
  "label": "凤凰县",
  "value": "433123"
}, {
  "label": "花垣县",
  "value": "433124"
}, {
  "label": "保靖县",
  "value": "433125"
}, {
  "label": "古丈县",
  "value": "433126"
}, {
  "label": "永顺县",
  "value": "433127"
}, {
  "label": "龙山县",
  "value": "433130"
}, {
  "label": "湖南吉首经济开发区",
  "value": "433172"
}, {
  "label": "湖南永顺经济开发区",
  "value": "433173"
}]], [[{
  "label": "荔湾区",
  "value": "440103"
}, {
  "label": "越秀区",
  "value": "440104"
}, {
  "label": "海珠区",
  "value": "440105"
}, {
  "label": "天河区",
  "value": "440106"
}, {
  "label": "白云区",
  "value": "440111"
}, {
  "label": "黄埔区",
  "value": "440112"
}, {
  "label": "番禺区",
  "value": "440113"
}, {
  "label": "花都区",
  "value": "440114"
}, {
  "label": "南沙区",
  "value": "440115"
}, {
  "label": "从化区",
  "value": "440117"
}, {
  "label": "增城区",
  "value": "440118"
}], [{
  "label": "武江区",
  "value": "440203"
}, {
  "label": "浈江区",
  "value": "440204"
}, {
  "label": "曲江区",
  "value": "440205"
}, {
  "label": "始兴县",
  "value": "440222"
}, {
  "label": "仁化县",
  "value": "440224"
}, {
  "label": "翁源县",
  "value": "440229"
}, {
  "label": "乳源瑶族自治县",
  "value": "440232"
}, {
  "label": "新丰县",
  "value": "440233"
}, {
  "label": "乐昌市",
  "value": "440281"
}, {
  "label": "南雄市",
  "value": "440282"
}], [{
  "label": "罗湖区",
  "value": "440303"
}, {
  "label": "福田区",
  "value": "440304"
}, {
  "label": "南山区",
  "value": "440305"
}, {
  "label": "宝安区",
  "value": "440306"
}, {
  "label": "龙岗区",
  "value": "440307"
}, {
  "label": "盐田区",
  "value": "440308"
}, {
  "label": "龙华区",
  "value": "440309"
}, {
  "label": "坪山区",
  "value": "440310"
}], [{
  "label": "香洲区",
  "value": "440402"
}, {
  "label": "斗门区",
  "value": "440403"
}, {
  "label": "金湾区",
  "value": "440404"
}], [{
  "label": "龙湖区",
  "value": "440507"
}, {
  "label": "金平区",
  "value": "440511"
}, {
  "label": "濠江区",
  "value": "440512"
}, {
  "label": "潮阳区",
  "value": "440513"
}, {
  "label": "潮南区",
  "value": "440514"
}, {
  "label": "澄海区",
  "value": "440515"
}, {
  "label": "南澳县",
  "value": "440523"
}], [{
  "label": "禅城区",
  "value": "440604"
}, {
  "label": "南海区",
  "value": "440605"
}, {
  "label": "顺德区",
  "value": "440606"
}, {
  "label": "三水区",
  "value": "440607"
}, {
  "label": "高明区",
  "value": "440608"
}], [{
  "label": "蓬江区",
  "value": "440703"
}, {
  "label": "江海区",
  "value": "440704"
}, {
  "label": "新会区",
  "value": "440705"
}, {
  "label": "台山市",
  "value": "440781"
}, {
  "label": "开平市",
  "value": "440783"
}, {
  "label": "鹤山市",
  "value": "440784"
}, {
  "label": "恩平市",
  "value": "440785"
}], [{
  "label": "赤坎区",
  "value": "440802"
}, {
  "label": "霞山区",
  "value": "440803"
}, {
  "label": "坡头区",
  "value": "440804"
}, {
  "label": "麻章区",
  "value": "440811"
}, {
  "label": "遂溪县",
  "value": "440823"
}, {
  "label": "徐闻县",
  "value": "440825"
}, {
  "label": "廉江市",
  "value": "440881"
}, {
  "label": "雷州市",
  "value": "440882"
}, {
  "label": "吴川市",
  "value": "440883"
}], [{
  "label": "茂南区",
  "value": "440902"
}, {
  "label": "电白区",
  "value": "440904"
}, {
  "label": "高州市",
  "value": "440981"
}, {
  "label": "化州市",
  "value": "440982"
}, {
  "label": "信宜市",
  "value": "440983"
}], [{
  "label": "端州区",
  "value": "441202"
}, {
  "label": "鼎湖区",
  "value": "441203"
}, {
  "label": "高要区",
  "value": "441204"
}, {
  "label": "广宁县",
  "value": "441223"
}, {
  "label": "怀集县",
  "value": "441224"
}, {
  "label": "封开县",
  "value": "441225"
}, {
  "label": "德庆县",
  "value": "441226"
}, {
  "label": "四会市",
  "value": "441284"
}], [{
  "label": "惠城区",
  "value": "441302"
}, {
  "label": "惠阳区",
  "value": "441303"
}, {
  "label": "博罗县",
  "value": "441322"
}, {
  "label": "惠东县",
  "value": "441323"
}, {
  "label": "龙门县",
  "value": "441324"
}], [{
  "label": "梅江区",
  "value": "441402"
}, {
  "label": "梅县区",
  "value": "441403"
}, {
  "label": "大埔县",
  "value": "441422"
}, {
  "label": "丰顺县",
  "value": "441423"
}, {
  "label": "五华县",
  "value": "441424"
}, {
  "label": "平远县",
  "value": "441426"
}, {
  "label": "蕉岭县",
  "value": "441427"
}, {
  "label": "兴宁市",
  "value": "441481"
}], [{
  "label": "城区",
  "value": "441502"
}, {
  "label": "海丰县",
  "value": "441521"
}, {
  "label": "陆河县",
  "value": "441523"
}, {
  "label": "陆丰市",
  "value": "441581"
}], [{
  "label": "源城区",
  "value": "441602"
}, {
  "label": "紫金县",
  "value": "441621"
}, {
  "label": "龙川县",
  "value": "441622"
}, {
  "label": "连平县",
  "value": "441623"
}, {
  "label": "和平县",
  "value": "441624"
}, {
  "label": "东源县",
  "value": "441625"
}], [{
  "label": "江城区",
  "value": "441702"
}, {
  "label": "阳东区",
  "value": "441704"
}, {
  "label": "阳西县",
  "value": "441721"
}, {
  "label": "阳春市",
  "value": "441781"
}], [{
  "label": "清城区",
  "value": "441802"
}, {
  "label": "清新区",
  "value": "441803"
}, {
  "label": "佛冈县",
  "value": "441821"
}, {
  "label": "阳山县",
  "value": "441823"
}, {
  "label": "连山壮族瑶族自治县",
  "value": "441825"
}, {
  "label": "连南瑶族自治县",
  "value": "441826"
}, {
  "label": "英德市",
  "value": "441881"
}, {
  "label": "连州市",
  "value": "441882"
}], [{
  "label": "东莞市",
  "value": "441900"
}], [{
  "label": "中山市",
  "value": "442000"
}], [{
  "label": "湘桥区",
  "value": "445102"
}, {
  "label": "潮安区",
  "value": "445103"
}, {
  "label": "饶平县",
  "value": "445122"
}], [{
  "label": "榕城区",
  "value": "445202"
}, {
  "label": "揭东区",
  "value": "445203"
}, {
  "label": "揭西县",
  "value": "445222"
}, {
  "label": "惠来县",
  "value": "445224"
}, {
  "label": "普宁市",
  "value": "445281"
}], [{
  "label": "云城区",
  "value": "445302"
}, {
  "label": "云安区",
  "value": "445303"
}, {
  "label": "新兴县",
  "value": "445321"
}, {
  "label": "郁南县",
  "value": "445322"
}, {
  "label": "罗定市",
  "value": "445381"
}]], [[{
  "label": "兴宁区",
  "value": "450102"
}, {
  "label": "青秀区",
  "value": "450103"
}, {
  "label": "江南区",
  "value": "450105"
}, {
  "label": "西乡塘区",
  "value": "450107"
}, {
  "label": "良庆区",
  "value": "450108"
}, {
  "label": "邕宁区",
  "value": "450109"
}, {
  "label": "武鸣区",
  "value": "450110"
}, {
  "label": "隆安县",
  "value": "450123"
}, {
  "label": "马山县",
  "value": "450124"
}, {
  "label": "上林县",
  "value": "450125"
}, {
  "label": "宾阳县",
  "value": "450126"
}, {
  "label": "横县",
  "value": "450127"
}], [{
  "label": "城中区",
  "value": "450202"
}, {
  "label": "鱼峰区",
  "value": "450203"
}, {
  "label": "柳南区",
  "value": "450204"
}, {
  "label": "柳北区",
  "value": "450205"
}, {
  "label": "柳江区",
  "value": "450206"
}, {
  "label": "柳城县",
  "value": "450222"
}, {
  "label": "鹿寨县",
  "value": "450223"
}, {
  "label": "融安县",
  "value": "450224"
}, {
  "label": "融水苗族自治县",
  "value": "450225"
}, {
  "label": "三江侗族自治县",
  "value": "450226"
}], [{
  "label": "秀峰区",
  "value": "450302"
}, {
  "label": "叠彩区",
  "value": "450303"
}, {
  "label": "象山区",
  "value": "450304"
}, {
  "label": "七星区",
  "value": "450305"
}, {
  "label": "雁山区",
  "value": "450311"
}, {
  "label": "临桂区",
  "value": "450312"
}, {
  "label": "阳朔县",
  "value": "450321"
}, {
  "label": "灵川县",
  "value": "450323"
}, {
  "label": "全州县",
  "value": "450324"
}, {
  "label": "兴安县",
  "value": "450325"
}, {
  "label": "永福县",
  "value": "450326"
}, {
  "label": "灌阳县",
  "value": "450327"
}, {
  "label": "龙胜各族自治县",
  "value": "450328"
}, {
  "label": "资源县",
  "value": "450329"
}, {
  "label": "平乐县",
  "value": "450330"
}, {
  "label": "荔浦县",
  "value": "450331"
}, {
  "label": "恭城瑶族自治县",
  "value": "450332"
}], [{
  "label": "万秀区",
  "value": "450403"
}, {
  "label": "长洲区",
  "value": "450405"
}, {
  "label": "龙圩区",
  "value": "450406"
}, {
  "label": "苍梧县",
  "value": "450421"
}, {
  "label": "藤县",
  "value": "450422"
}, {
  "label": "蒙山县",
  "value": "450423"
}, {
  "label": "岑溪市",
  "value": "450481"
}], [{
  "label": "海城区",
  "value": "450502"
}, {
  "label": "银海区",
  "value": "450503"
}, {
  "label": "铁山港区",
  "value": "450512"
}, {
  "label": "合浦县",
  "value": "450521"
}], [{
  "label": "港口区",
  "value": "450602"
}, {
  "label": "防城区",
  "value": "450603"
}, {
  "label": "上思县",
  "value": "450621"
}, {
  "label": "东兴市",
  "value": "450681"
}], [{
  "label": "钦南区",
  "value": "450702"
}, {
  "label": "钦北区",
  "value": "450703"
}, {
  "label": "灵山县",
  "value": "450721"
}, {
  "label": "浦北县",
  "value": "450722"
}], [{
  "label": "港北区",
  "value": "450802"
}, {
  "label": "港南区",
  "value": "450803"
}, {
  "label": "覃塘区",
  "value": "450804"
}, {
  "label": "平南县",
  "value": "450821"
}, {
  "label": "桂平市",
  "value": "450881"
}], [{
  "label": "玉州区",
  "value": "450902"
}, {
  "label": "福绵区",
  "value": "450903"
}, {
  "label": "容县",
  "value": "450921"
}, {
  "label": "陆川县",
  "value": "450922"
}, {
  "label": "博白县",
  "value": "450923"
}, {
  "label": "兴业县",
  "value": "450924"
}, {
  "label": "北流市",
  "value": "450981"
}], [{
  "label": "右江区",
  "value": "451002"
}, {
  "label": "田阳县",
  "value": "451021"
}, {
  "label": "田东县",
  "value": "451022"
}, {
  "label": "平果县",
  "value": "451023"
}, {
  "label": "德保县",
  "value": "451024"
}, {
  "label": "那坡县",
  "value": "451026"
}, {
  "label": "凌云县",
  "value": "451027"
}, {
  "label": "乐业县",
  "value": "451028"
}, {
  "label": "田林县",
  "value": "451029"
}, {
  "label": "西林县",
  "value": "451030"
}, {
  "label": "隆林各族自治县",
  "value": "451031"
}, {
  "label": "靖西市",
  "value": "451081"
}], [{
  "label": "八步区",
  "value": "451102"
}, {
  "label": "平桂区",
  "value": "451103"
}, {
  "label": "昭平县",
  "value": "451121"
}, {
  "label": "钟山县",
  "value": "451122"
}, {
  "label": "富川瑶族自治县",
  "value": "451123"
}], [{
  "label": "金城江区",
  "value": "451202"
}, {
  "label": "宜州区",
  "value": "451203"
}, {
  "label": "南丹县",
  "value": "451221"
}, {
  "label": "天峨县",
  "value": "451222"
}, {
  "label": "凤山县",
  "value": "451223"
}, {
  "label": "东兰县",
  "value": "451224"
}, {
  "label": "罗城仫佬族自治县",
  "value": "451225"
}, {
  "label": "环江毛南族自治县",
  "value": "451226"
}, {
  "label": "巴马瑶族自治县",
  "value": "451227"
}, {
  "label": "都安瑶族自治县",
  "value": "451228"
}, {
  "label": "大化瑶族自治县",
  "value": "451229"
}], [{
  "label": "兴宾区",
  "value": "451302"
}, {
  "label": "忻城县",
  "value": "451321"
}, {
  "label": "象州县",
  "value": "451322"
}, {
  "label": "武宣县",
  "value": "451323"
}, {
  "label": "金秀瑶族自治县",
  "value": "451324"
}, {
  "label": "合山市",
  "value": "451381"
}], [{
  "label": "江州区",
  "value": "451402"
}, {
  "label": "扶绥县",
  "value": "451421"
}, {
  "label": "宁明县",
  "value": "451422"
}, {
  "label": "龙州县",
  "value": "451423"
}, {
  "label": "大新县",
  "value": "451424"
}, {
  "label": "天等县",
  "value": "451425"
}, {
  "label": "凭祥市",
  "value": "451481"
}]], [[{
  "label": "秀英区",
  "value": "460105"
}, {
  "label": "龙华区",
  "value": "460106"
}, {
  "label": "琼山区",
  "value": "460107"
}, {
  "label": "美兰区",
  "value": "460108"
}], [{
  "label": "海棠区",
  "value": "460202"
}, {
  "label": "吉阳区",
  "value": "460203"
}, {
  "label": "天涯区",
  "value": "460204"
}, {
  "label": "崖州区",
  "value": "460205"
}], [{
  "label": "西沙群岛",
  "value": "460321"
}, {
  "label": "南沙群岛",
  "value": "460322"
}, {
  "label": "中沙群岛的岛礁及其海域",
  "value": "460323"
}], [{
  "label": "儋州市",
  "value": "460400"
}], [{
  "label": "五指山市",
  "value": "469001"
}, {
  "label": "琼海市",
  "value": "469002"
}, {
  "label": "文昌市",
  "value": "469005"
}, {
  "label": "万宁市",
  "value": "469006"
}, {
  "label": "东方市",
  "value": "469007"
}, {
  "label": "定安县",
  "value": "469021"
}, {
  "label": "屯昌县",
  "value": "469022"
}, {
  "label": "澄迈县",
  "value": "469023"
}, {
  "label": "临高县",
  "value": "469024"
}, {
  "label": "白沙黎族自治县",
  "value": "469025"
}, {
  "label": "昌江黎族自治县",
  "value": "469026"
}, {
  "label": "乐东黎族自治县",
  "value": "469027"
}, {
  "label": "陵水黎族自治县",
  "value": "469028"
}, {
  "label": "保亭黎族苗族自治县",
  "value": "469029"
}, {
  "label": "琼中黎族苗族自治县",
  "value": "469030"
}]], [[{
  "label": "万州区",
  "value": "500101"
}, {
  "label": "涪陵区",
  "value": "500102"
}, {
  "label": "渝中区",
  "value": "500103"
}, {
  "label": "大渡口区",
  "value": "500104"
}, {
  "label": "江北区",
  "value": "500105"
}, {
  "label": "沙坪坝区",
  "value": "500106"
}, {
  "label": "九龙坡区",
  "value": "500107"
}, {
  "label": "南岸区",
  "value": "500108"
}, {
  "label": "北碚区",
  "value": "500109"
}, {
  "label": "綦江区",
  "value": "500110"
}, {
  "label": "大足区",
  "value": "500111"
}, {
  "label": "渝北区",
  "value": "500112"
}, {
  "label": "巴南区",
  "value": "500113"
}, {
  "label": "黔江区",
  "value": "500114"
}, {
  "label": "长寿区",
  "value": "500115"
}, {
  "label": "江津区",
  "value": "500116"
}, {
  "label": "合川区",
  "value": "500117"
}, {
  "label": "永川区",
  "value": "500118"
}, {
  "label": "南川区",
  "value": "500119"
}, {
  "label": "璧山区",
  "value": "500120"
}, {
  "label": "铜梁区",
  "value": "500151"
}, {
  "label": "潼南区",
  "value": "500152"
}, {
  "label": "荣昌区",
  "value": "500153"
}, {
  "label": "开州区",
  "value": "500154"
}, {
  "label": "梁平区",
  "value": "500155"
}, {
  "label": "武隆区",
  "value": "500156"
}], [{
  "label": "城口县",
  "value": "500229"
}, {
  "label": "丰都县",
  "value": "500230"
}, {
  "label": "垫江县",
  "value": "500231"
}, {
  "label": "忠县",
  "value": "500233"
}, {
  "label": "云阳县",
  "value": "500235"
}, {
  "label": "奉节县",
  "value": "500236"
}, {
  "label": "巫山县",
  "value": "500237"
}, {
  "label": "巫溪县",
  "value": "500238"
}, {
  "label": "石柱土家族自治县",
  "value": "500240"
}, {
  "label": "秀山土家族苗族自治县",
  "value": "500241"
}, {
  "label": "酉阳土家族苗族自治县",
  "value": "500242"
}, {
  "label": "彭水苗族土家族自治县",
  "value": "500243"
}]], [[{
  "label": "锦江区",
  "value": "510104"
}, {
  "label": "青羊区",
  "value": "510105"
}, {
  "label": "金牛区",
  "value": "510106"
}, {
  "label": "武侯区",
  "value": "510107"
}, {
  "label": "成华区",
  "value": "510108"
}, {
  "label": "龙泉驿区",
  "value": "510112"
}, {
  "label": "青白江区",
  "value": "510113"
}, {
  "label": "新都区",
  "value": "510114"
}, {
  "label": "温江区",
  "value": "510115"
}, {
  "label": "双流区",
  "value": "510116"
}, {
  "label": "郫都区",
  "value": "510117"
}, {
  "label": "金堂县",
  "value": "510121"
}, {
  "label": "大邑县",
  "value": "510129"
}, {
  "label": "蒲江县",
  "value": "510131"
}, {
  "label": "新津县",
  "value": "510132"
}, {
  "label": "都江堰市",
  "value": "510181"
}, {
  "label": "彭州市",
  "value": "510182"
}, {
  "label": "邛崃市",
  "value": "510183"
}, {
  "label": "崇州市",
  "value": "510184"
}, {
  "label": "简阳市",
  "value": "510185"
}], [{
  "label": "自流井区",
  "value": "510302"
}, {
  "label": "贡井区",
  "value": "510303"
}, {
  "label": "大安区",
  "value": "510304"
}, {
  "label": "沿滩区",
  "value": "510311"
}, {
  "label": "荣县",
  "value": "510321"
}, {
  "label": "富顺县",
  "value": "510322"
}], [{
  "label": "东区",
  "value": "510402"
}, {
  "label": "西区",
  "value": "510403"
}, {
  "label": "仁和区",
  "value": "510411"
}, {
  "label": "米易县",
  "value": "510421"
}, {
  "label": "盐边县",
  "value": "510422"
}], [{
  "label": "江阳区",
  "value": "510502"
}, {
  "label": "纳溪区",
  "value": "510503"
}, {
  "label": "龙马潭区",
  "value": "510504"
}, {
  "label": "泸县",
  "value": "510521"
}, {
  "label": "合江县",
  "value": "510522"
}, {
  "label": "叙永县",
  "value": "510524"
}, {
  "label": "古蔺县",
  "value": "510525"
}], [{
  "label": "旌阳区",
  "value": "510603"
}, {
  "label": "罗江区",
  "value": "510604"
}, {
  "label": "中江县",
  "value": "510623"
}, {
  "label": "广汉市",
  "value": "510681"
}, {
  "label": "什邡市",
  "value": "510682"
}, {
  "label": "绵竹市",
  "value": "510683"
}], [{
  "label": "涪城区",
  "value": "510703"
}, {
  "label": "游仙区",
  "value": "510704"
}, {
  "label": "安州区",
  "value": "510705"
}, {
  "label": "三台县",
  "value": "510722"
}, {
  "label": "盐亭县",
  "value": "510723"
}, {
  "label": "梓潼县",
  "value": "510725"
}, {
  "label": "北川羌族自治县",
  "value": "510726"
}, {
  "label": "平武县",
  "value": "510727"
}, {
  "label": "江油市",
  "value": "510781"
}], [{
  "label": "利州区",
  "value": "510802"
}, {
  "label": "昭化区",
  "value": "510811"
}, {
  "label": "朝天区",
  "value": "510812"
}, {
  "label": "旺苍县",
  "value": "510821"
}, {
  "label": "青川县",
  "value": "510822"
}, {
  "label": "剑阁县",
  "value": "510823"
}, {
  "label": "苍溪县",
  "value": "510824"
}], [{
  "label": "船山区",
  "value": "510903"
}, {
  "label": "安居区",
  "value": "510904"
}, {
  "label": "蓬溪县",
  "value": "510921"
}, {
  "label": "射洪县",
  "value": "510922"
}, {
  "label": "大英县",
  "value": "510923"
}], [{
  "label": "市中区",
  "value": "511002"
}, {
  "label": "东兴区",
  "value": "511011"
}, {
  "label": "威远县",
  "value": "511024"
}, {
  "label": "资中县",
  "value": "511025"
}, {
  "label": "内江经济开发区",
  "value": "511071"
}, {
  "label": "隆昌市",
  "value": "511083"
}], [{
  "label": "市中区",
  "value": "511102"
}, {
  "label": "沙湾区",
  "value": "511111"
}, {
  "label": "五通桥区",
  "value": "511112"
}, {
  "label": "金口河区",
  "value": "511113"
}, {
  "label": "犍为县",
  "value": "511123"
}, {
  "label": "井研县",
  "value": "511124"
}, {
  "label": "夹江县",
  "value": "511126"
}, {
  "label": "沐川县",
  "value": "511129"
}, {
  "label": "峨边彝族自治县",
  "value": "511132"
}, {
  "label": "马边彝族自治县",
  "value": "511133"
}, {
  "label": "峨眉山市",
  "value": "511181"
}], [{
  "label": "顺庆区",
  "value": "511302"
}, {
  "label": "高坪区",
  "value": "511303"
}, {
  "label": "嘉陵区",
  "value": "511304"
}, {
  "label": "南部县",
  "value": "511321"
}, {
  "label": "营山县",
  "value": "511322"
}, {
  "label": "蓬安县",
  "value": "511323"
}, {
  "label": "仪陇县",
  "value": "511324"
}, {
  "label": "西充县",
  "value": "511325"
}, {
  "label": "阆中市",
  "value": "511381"
}], [{
  "label": "东坡区",
  "value": "511402"
}, {
  "label": "彭山区",
  "value": "511403"
}, {
  "label": "仁寿县",
  "value": "511421"
}, {
  "label": "洪雅县",
  "value": "511423"
}, {
  "label": "丹棱县",
  "value": "511424"
}, {
  "label": "青神县",
  "value": "511425"
}], [{
  "label": "翠屏区",
  "value": "511502"
}, {
  "label": "南溪区",
  "value": "511503"
}, {
  "label": "宜宾县",
  "value": "511521"
}, {
  "label": "江安县",
  "value": "511523"
}, {
  "label": "长宁县",
  "value": "511524"
}, {
  "label": "高县",
  "value": "511525"
}, {
  "label": "珙县",
  "value": "511526"
}, {
  "label": "筠连县",
  "value": "511527"
}, {
  "label": "兴文县",
  "value": "511528"
}, {
  "label": "屏山县",
  "value": "511529"
}], [{
  "label": "广安区",
  "value": "511602"
}, {
  "label": "前锋区",
  "value": "511603"
}, {
  "label": "岳池县",
  "value": "511621"
}, {
  "label": "武胜县",
  "value": "511622"
}, {
  "label": "邻水县",
  "value": "511623"
}, {
  "label": "华蓥市",
  "value": "511681"
}], [{
  "label": "通川区",
  "value": "511702"
}, {
  "label": "达川区",
  "value": "511703"
}, {
  "label": "宣汉县",
  "value": "511722"
}, {
  "label": "开江县",
  "value": "511723"
}, {
  "label": "大竹县",
  "value": "511724"
}, {
  "label": "渠县",
  "value": "511725"
}, {
  "label": "达州经济开发区",
  "value": "511771"
}, {
  "label": "万源市",
  "value": "511781"
}], [{
  "label": "雨城区",
  "value": "511802"
}, {
  "label": "名山区",
  "value": "511803"
}, {
  "label": "荥经县",
  "value": "511822"
}, {
  "label": "汉源县",
  "value": "511823"
}, {
  "label": "石棉县",
  "value": "511824"
}, {
  "label": "天全县",
  "value": "511825"
}, {
  "label": "芦山县",
  "value": "511826"
}, {
  "label": "宝兴县",
  "value": "511827"
}], [{
  "label": "巴州区",
  "value": "511902"
}, {
  "label": "恩阳区",
  "value": "511903"
}, {
  "label": "通江县",
  "value": "511921"
}, {
  "label": "南江县",
  "value": "511922"
}, {
  "label": "平昌县",
  "value": "511923"
}, {
  "label": "巴中经济开发区",
  "value": "511971"
}], [{
  "label": "雁江区",
  "value": "512002"
}, {
  "label": "安岳县",
  "value": "512021"
}, {
  "label": "乐至县",
  "value": "512022"
}], [{
  "label": "马尔康市",
  "value": "513201"
}, {
  "label": "汶川县",
  "value": "513221"
}, {
  "label": "理县",
  "value": "513222"
}, {
  "label": "茂县",
  "value": "513223"
}, {
  "label": "松潘县",
  "value": "513224"
}, {
  "label": "九寨沟县",
  "value": "513225"
}, {
  "label": "金川县",
  "value": "513226"
}, {
  "label": "小金县",
  "value": "513227"
}, {
  "label": "黑水县",
  "value": "513228"
}, {
  "label": "壤塘县",
  "value": "513230"
}, {
  "label": "阿坝县",
  "value": "513231"
}, {
  "label": "若尔盖县",
  "value": "513232"
}, {
  "label": "红原县",
  "value": "513233"
}], [{
  "label": "康定市",
  "value": "513301"
}, {
  "label": "泸定县",
  "value": "513322"
}, {
  "label": "丹巴县",
  "value": "513323"
}, {
  "label": "九龙县",
  "value": "513324"
}, {
  "label": "雅江县",
  "value": "513325"
}, {
  "label": "道孚县",
  "value": "513326"
}, {
  "label": "炉霍县",
  "value": "513327"
}, {
  "label": "甘孜县",
  "value": "513328"
}, {
  "label": "新龙县",
  "value": "513329"
}, {
  "label": "德格县",
  "value": "513330"
}, {
  "label": "白玉县",
  "value": "513331"
}, {
  "label": "石渠县",
  "value": "513332"
}, {
  "label": "色达县",
  "value": "513333"
}, {
  "label": "理塘县",
  "value": "513334"
}, {
  "label": "巴塘县",
  "value": "513335"
}, {
  "label": "乡城县",
  "value": "513336"
}, {
  "label": "稻城县",
  "value": "513337"
}, {
  "label": "得荣县",
  "value": "513338"
}], [{
  "label": "西昌市",
  "value": "513401"
}, {
  "label": "木里藏族自治县",
  "value": "513422"
}, {
  "label": "盐源县",
  "value": "513423"
}, {
  "label": "德昌县",
  "value": "513424"
}, {
  "label": "会理县",
  "value": "513425"
}, {
  "label": "会东县",
  "value": "513426"
}, {
  "label": "宁南县",
  "value": "513427"
}, {
  "label": "普格县",
  "value": "513428"
}, {
  "label": "布拖县",
  "value": "513429"
}, {
  "label": "金阳县",
  "value": "513430"
}, {
  "label": "昭觉县",
  "value": "513431"
}, {
  "label": "喜德县",
  "value": "513432"
}, {
  "label": "冕宁县",
  "value": "513433"
}, {
  "label": "越西县",
  "value": "513434"
}, {
  "label": "甘洛县",
  "value": "513435"
}, {
  "label": "美姑县",
  "value": "513436"
}, {
  "label": "雷波县",
  "value": "513437"
}]], [[{
  "label": "南明区",
  "value": "520102"
}, {
  "label": "云岩区",
  "value": "520103"
}, {
  "label": "花溪区",
  "value": "520111"
}, {
  "label": "乌当区",
  "value": "520112"
}, {
  "label": "白云区",
  "value": "520113"
}, {
  "label": "观山湖区",
  "value": "520115"
}, {
  "label": "开阳县",
  "value": "520121"
}, {
  "label": "息烽县",
  "value": "520122"
}, {
  "label": "修文县",
  "value": "520123"
}, {
  "label": "清镇市",
  "value": "520181"
}], [{
  "label": "钟山区",
  "value": "520201"
}, {
  "label": "六枝特区",
  "value": "520203"
}, {
  "label": "水城县",
  "value": "520221"
}, {
  "label": "盘州市",
  "value": "520281"
}], [{
  "label": "红花岗区",
  "value": "520302"
}, {
  "label": "汇川区",
  "value": "520303"
}, {
  "label": "播州区",
  "value": "520304"
}, {
  "label": "桐梓县",
  "value": "520322"
}, {
  "label": "绥阳县",
  "value": "520323"
}, {
  "label": "正安县",
  "value": "520324"
}, {
  "label": "道真仡佬族苗族自治县",
  "value": "520325"
}, {
  "label": "务川仡佬族苗族自治县",
  "value": "520326"
}, {
  "label": "凤冈县",
  "value": "520327"
}, {
  "label": "湄潭县",
  "value": "520328"
}, {
  "label": "余庆县",
  "value": "520329"
}, {
  "label": "习水县",
  "value": "520330"
}, {
  "label": "赤水市",
  "value": "520381"
}, {
  "label": "仁怀市",
  "value": "520382"
}], [{
  "label": "西秀区",
  "value": "520402"
}, {
  "label": "平坝区",
  "value": "520403"
}, {
  "label": "普定县",
  "value": "520422"
}, {
  "label": "镇宁布依族苗族自治县",
  "value": "520423"
}, {
  "label": "关岭布依族苗族自治县",
  "value": "520424"
}, {
  "label": "紫云苗族布依族自治县",
  "value": "520425"
}], [{
  "label": "七星关区",
  "value": "520502"
}, {
  "label": "大方县",
  "value": "520521"
}, {
  "label": "黔西县",
  "value": "520522"
}, {
  "label": "金沙县",
  "value": "520523"
}, {
  "label": "织金县",
  "value": "520524"
}, {
  "label": "纳雍县",
  "value": "520525"
}, {
  "label": "威宁彝族回族苗族自治县",
  "value": "520526"
}, {
  "label": "赫章县",
  "value": "520527"
}], [{
  "label": "碧江区",
  "value": "520602"
}, {
  "label": "万山区",
  "value": "520603"
}, {
  "label": "江口县",
  "value": "520621"
}, {
  "label": "玉屏侗族自治县",
  "value": "520622"
}, {
  "label": "石阡县",
  "value": "520623"
}, {
  "label": "思南县",
  "value": "520624"
}, {
  "label": "印江土家族苗族自治县",
  "value": "520625"
}, {
  "label": "德江县",
  "value": "520626"
}, {
  "label": "沿河土家族自治县",
  "value": "520627"
}, {
  "label": "松桃苗族自治县",
  "value": "520628"
}], [{
  "label": "兴义市",
  "value": "522301"
}, {
  "label": "兴仁县",
  "value": "522322"
}, {
  "label": "普安县",
  "value": "522323"
}, {
  "label": "晴隆县",
  "value": "522324"
}, {
  "label": "贞丰县",
  "value": "522325"
}, {
  "label": "望谟县",
  "value": "522326"
}, {
  "label": "册亨县",
  "value": "522327"
}, {
  "label": "安龙县",
  "value": "522328"
}], [{
  "label": "凯里市",
  "value": "522601"
}, {
  "label": "黄平县",
  "value": "522622"
}, {
  "label": "施秉县",
  "value": "522623"
}, {
  "label": "三穗县",
  "value": "522624"
}, {
  "label": "镇远县",
  "value": "522625"
}, {
  "label": "岑巩县",
  "value": "522626"
}, {
  "label": "天柱县",
  "value": "522627"
}, {
  "label": "锦屏县",
  "value": "522628"
}, {
  "label": "剑河县",
  "value": "522629"
}, {
  "label": "台江县",
  "value": "522630"
}, {
  "label": "黎平县",
  "value": "522631"
}, {
  "label": "榕江县",
  "value": "522632"
}, {
  "label": "从江县",
  "value": "522633"
}, {
  "label": "雷山县",
  "value": "522634"
}, {
  "label": "麻江县",
  "value": "522635"
}, {
  "label": "丹寨县",
  "value": "522636"
}], [{
  "label": "都匀市",
  "value": "522701"
}, {
  "label": "福泉市",
  "value": "522702"
}, {
  "label": "荔波县",
  "value": "522722"
}, {
  "label": "贵定县",
  "value": "522723"
}, {
  "label": "瓮安县",
  "value": "522725"
}, {
  "label": "独山县",
  "value": "522726"
}, {
  "label": "平塘县",
  "value": "522727"
}, {
  "label": "罗甸县",
  "value": "522728"
}, {
  "label": "长顺县",
  "value": "522729"
}, {
  "label": "龙里县",
  "value": "522730"
}, {
  "label": "惠水县",
  "value": "522731"
}, {
  "label": "三都水族自治县",
  "value": "522732"
}]], [[{
  "label": "五华区",
  "value": "530102"
}, {
  "label": "盘龙区",
  "value": "530103"
}, {
  "label": "官渡区",
  "value": "530111"
}, {
  "label": "西山区",
  "value": "530112"
}, {
  "label": "东川区",
  "value": "530113"
}, {
  "label": "呈贡区",
  "value": "530114"
}, {
  "label": "晋宁区",
  "value": "530115"
}, {
  "label": "富民县",
  "value": "530124"
}, {
  "label": "宜良县",
  "value": "530125"
}, {
  "label": "石林彝族自治县",
  "value": "530126"
}, {
  "label": "嵩明县",
  "value": "530127"
}, {
  "label": "禄劝彝族苗族自治县",
  "value": "530128"
}, {
  "label": "寻甸回族彝族自治县",
  "value": "530129"
}, {
  "label": "安宁市",
  "value": "530181"
}], [{
  "label": "麒麟区",
  "value": "530302"
}, {
  "label": "沾益区",
  "value": "530303"
}, {
  "label": "马龙县",
  "value": "530321"
}, {
  "label": "陆良县",
  "value": "530322"
}, {
  "label": "师宗县",
  "value": "530323"
}, {
  "label": "罗平县",
  "value": "530324"
}, {
  "label": "富源县",
  "value": "530325"
}, {
  "label": "会泽县",
  "value": "530326"
}, {
  "label": "宣威市",
  "value": "530381"
}], [{
  "label": "红塔区",
  "value": "530402"
}, {
  "label": "江川区",
  "value": "530403"
}, {
  "label": "澄江县",
  "value": "530422"
}, {
  "label": "通海县",
  "value": "530423"
}, {
  "label": "华宁县",
  "value": "530424"
}, {
  "label": "易门县",
  "value": "530425"
}, {
  "label": "峨山彝族自治县",
  "value": "530426"
}, {
  "label": "新平彝族傣族自治县",
  "value": "530427"
}, {
  "label": "元江哈尼族彝族傣族自治县",
  "value": "530428"
}], [{
  "label": "隆阳区",
  "value": "530502"
}, {
  "label": "施甸县",
  "value": "530521"
}, {
  "label": "龙陵县",
  "value": "530523"
}, {
  "label": "昌宁县",
  "value": "530524"
}, {
  "label": "腾冲市",
  "value": "530581"
}], [{
  "label": "昭阳区",
  "value": "530602"
}, {
  "label": "鲁甸县",
  "value": "530621"
}, {
  "label": "巧家县",
  "value": "530622"
}, {
  "label": "盐津县",
  "value": "530623"
}, {
  "label": "大关县",
  "value": "530624"
}, {
  "label": "永善县",
  "value": "530625"
}, {
  "label": "绥江县",
  "value": "530626"
}, {
  "label": "镇雄县",
  "value": "530627"
}, {
  "label": "彝良县",
  "value": "530628"
}, {
  "label": "威信县",
  "value": "530629"
}, {
  "label": "水富县",
  "value": "530630"
}], [{
  "label": "古城区",
  "value": "530702"
}, {
  "label": "玉龙纳西族自治县",
  "value": "530721"
}, {
  "label": "永胜县",
  "value": "530722"
}, {
  "label": "华坪县",
  "value": "530723"
}, {
  "label": "宁蒗彝族自治县",
  "value": "530724"
}], [{
  "label": "思茅区",
  "value": "530802"
}, {
  "label": "宁洱哈尼族彝族自治县",
  "value": "530821"
}, {
  "label": "墨江哈尼族自治县",
  "value": "530822"
}, {
  "label": "景东彝族自治县",
  "value": "530823"
}, {
  "label": "景谷傣族彝族自治县",
  "value": "530824"
}, {
  "label": "镇沅彝族哈尼族拉祜族自治县",
  "value": "530825"
}, {
  "label": "江城哈尼族彝族自治县",
  "value": "530826"
}, {
  "label": "孟连傣族拉祜族佤族自治县",
  "value": "530827"
}, {
  "label": "澜沧拉祜族自治县",
  "value": "530828"
}, {
  "label": "西盟佤族自治县",
  "value": "530829"
}], [{
  "label": "临翔区",
  "value": "530902"
}, {
  "label": "凤庆县",
  "value": "530921"
}, {
  "label": "云县",
  "value": "530922"
}, {
  "label": "永德县",
  "value": "530923"
}, {
  "label": "镇康县",
  "value": "530924"
}, {
  "label": "双江拉祜族佤族布朗族傣族自治县",
  "value": "530925"
}, {
  "label": "耿马傣族佤族自治县",
  "value": "530926"
}, {
  "label": "沧源佤族自治县",
  "value": "530927"
}], [{
  "label": "楚雄市",
  "value": "532301"
}, {
  "label": "双柏县",
  "value": "532322"
}, {
  "label": "牟定县",
  "value": "532323"
}, {
  "label": "南华县",
  "value": "532324"
}, {
  "label": "姚安县",
  "value": "532325"
}, {
  "label": "大姚县",
  "value": "532326"
}, {
  "label": "永仁县",
  "value": "532327"
}, {
  "label": "元谋县",
  "value": "532328"
}, {
  "label": "武定县",
  "value": "532329"
}, {
  "label": "禄丰县",
  "value": "532331"
}], [{
  "label": "个旧市",
  "value": "532501"
}, {
  "label": "开远市",
  "value": "532502"
}, {
  "label": "蒙自市",
  "value": "532503"
}, {
  "label": "弥勒市",
  "value": "532504"
}, {
  "label": "屏边苗族自治县",
  "value": "532523"
}, {
  "label": "建水县",
  "value": "532524"
}, {
  "label": "石屏县",
  "value": "532525"
}, {
  "label": "泸西县",
  "value": "532527"
}, {
  "label": "元阳县",
  "value": "532528"
}, {
  "label": "红河县",
  "value": "532529"
}, {
  "label": "金平苗族瑶族傣族自治县",
  "value": "532530"
}, {
  "label": "绿春县",
  "value": "532531"
}, {
  "label": "河口瑶族自治县",
  "value": "532532"
}], [{
  "label": "文山市",
  "value": "532601"
}, {
  "label": "砚山县",
  "value": "532622"
}, {
  "label": "西畴县",
  "value": "532623"
}, {
  "label": "麻栗坡县",
  "value": "532624"
}, {
  "label": "马关县",
  "value": "532625"
}, {
  "label": "丘北县",
  "value": "532626"
}, {
  "label": "广南县",
  "value": "532627"
}, {
  "label": "富宁县",
  "value": "532628"
}], [{
  "label": "景洪市",
  "value": "532801"
}, {
  "label": "勐海县",
  "value": "532822"
}, {
  "label": "勐腊县",
  "value": "532823"
}], [{
  "label": "大理市",
  "value": "532901"
}, {
  "label": "漾濞彝族自治县",
  "value": "532922"
}, {
  "label": "祥云县",
  "value": "532923"
}, {
  "label": "宾川县",
  "value": "532924"
}, {
  "label": "弥渡县",
  "value": "532925"
}, {
  "label": "南涧彝族自治县",
  "value": "532926"
}, {
  "label": "巍山彝族回族自治县",
  "value": "532927"
}, {
  "label": "永平县",
  "value": "532928"
}, {
  "label": "云龙县",
  "value": "532929"
}, {
  "label": "洱源县",
  "value": "532930"
}, {
  "label": "剑川县",
  "value": "532931"
}, {
  "label": "鹤庆县",
  "value": "532932"
}], [{
  "label": "瑞丽市",
  "value": "533102"
}, {
  "label": "芒市",
  "value": "533103"
}, {
  "label": "梁河县",
  "value": "533122"
}, {
  "label": "盈江县",
  "value": "533123"
}, {
  "label": "陇川县",
  "value": "533124"
}], [{
  "label": "泸水市",
  "value": "533301"
}, {
  "label": "福贡县",
  "value": "533323"
}, {
  "label": "贡山独龙族怒族自治县",
  "value": "533324"
}, {
  "label": "兰坪白族普米族自治县",
  "value": "533325"
}], [{
  "label": "香格里拉市",
  "value": "533401"
}, {
  "label": "德钦县",
  "value": "533422"
}, {
  "label": "维西傈僳族自治县",
  "value": "533423"
}]], [[{
  "label": "城关区",
  "value": "540102"
}, {
  "label": "堆龙德庆区",
  "value": "540103"
}, {
  "label": "林周县",
  "value": "540121"
}, {
  "label": "当雄县",
  "value": "540122"
}, {
  "label": "尼木县",
  "value": "540123"
}, {
  "label": "曲水县",
  "value": "540124"
}, {
  "label": "达孜县",
  "value": "540126"
}, {
  "label": "墨竹工卡县",
  "value": "540127"
}, {
  "label": "格尔木藏青工业园区",
  "value": "540171"
}, {
  "label": "拉萨经济技术开发区",
  "value": "540172"
}, {
  "label": "西藏文化旅游创意园区",
  "value": "540173"
}, {
  "label": "达孜工业园区",
  "value": "540174"
}], [{
  "label": "桑珠孜区",
  "value": "540202"
}, {
  "label": "南木林县",
  "value": "540221"
}, {
  "label": "江孜县",
  "value": "540222"
}, {
  "label": "定日县",
  "value": "540223"
}, {
  "label": "萨迦县",
  "value": "540224"
}, {
  "label": "拉孜县",
  "value": "540225"
}, {
  "label": "昂仁县",
  "value": "540226"
}, {
  "label": "谢通门县",
  "value": "540227"
}, {
  "label": "白朗县",
  "value": "540228"
}, {
  "label": "仁布县",
  "value": "540229"
}, {
  "label": "康马县",
  "value": "540230"
}, {
  "label": "定结县",
  "value": "540231"
}, {
  "label": "仲巴县",
  "value": "540232"
}, {
  "label": "亚东县",
  "value": "540233"
}, {
  "label": "吉隆县",
  "value": "540234"
}, {
  "label": "聂拉木县",
  "value": "540235"
}, {
  "label": "萨嘎县",
  "value": "540236"
}, {
  "label": "岗巴县",
  "value": "540237"
}], [{
  "label": "卡若区",
  "value": "540302"
}, {
  "label": "江达县",
  "value": "540321"
}, {
  "label": "贡觉县",
  "value": "540322"
}, {
  "label": "类乌齐县",
  "value": "540323"
}, {
  "label": "丁青县",
  "value": "540324"
}, {
  "label": "察雅县",
  "value": "540325"
}, {
  "label": "八宿县",
  "value": "540326"
}, {
  "label": "左贡县",
  "value": "540327"
}, {
  "label": "芒康县",
  "value": "540328"
}, {
  "label": "洛隆县",
  "value": "540329"
}, {
  "label": "边坝县",
  "value": "540330"
}], [{
  "label": "巴宜区",
  "value": "540402"
}, {
  "label": "工布江达县",
  "value": "540421"
}, {
  "label": "米林县",
  "value": "540422"
}, {
  "label": "墨脱县",
  "value": "540423"
}, {
  "label": "波密县",
  "value": "540424"
}, {
  "label": "察隅县",
  "value": "540425"
}, {
  "label": "朗县",
  "value": "540426"
}], [{
  "label": "乃东区",
  "value": "540502"
}, {
  "label": "扎囊县",
  "value": "540521"
}, {
  "label": "贡嘎县",
  "value": "540522"
}, {
  "label": "桑日县",
  "value": "540523"
}, {
  "label": "琼结县",
  "value": "540524"
}, {
  "label": "曲松县",
  "value": "540525"
}, {
  "label": "措美县",
  "value": "540526"
}, {
  "label": "洛扎县",
  "value": "540527"
}, {
  "label": "加查县",
  "value": "540528"
}, {
  "label": "隆子县",
  "value": "540529"
}, {
  "label": "错那县",
  "value": "540530"
}, {
  "label": "浪卡子县",
  "value": "540531"
}], [{
  "label": "那曲县",
  "value": "542421"
}, {
  "label": "嘉黎县",
  "value": "542422"
}, {
  "label": "比如县",
  "value": "542423"
}, {
  "label": "聂荣县",
  "value": "542424"
}, {
  "label": "安多县",
  "value": "542425"
}, {
  "label": "申扎县",
  "value": "542426"
}, {
  "label": "索县",
  "value": "542427"
}, {
  "label": "班戈县",
  "value": "542428"
}, {
  "label": "巴青县",
  "value": "542429"
}, {
  "label": "尼玛县",
  "value": "542430"
}, {
  "label": "双湖县",
  "value": "542431"
}], [{
  "label": "普兰县",
  "value": "542521"
}, {
  "label": "札达县",
  "value": "542522"
}, {
  "label": "噶尔县",
  "value": "542523"
}, {
  "label": "日土县",
  "value": "542524"
}, {
  "label": "革吉县",
  "value": "542525"
}, {
  "label": "改则县",
  "value": "542526"
}, {
  "label": "措勤县",
  "value": "542527"
}]], [[{
  "label": "新城区",
  "value": "610102"
}, {
  "label": "碑林区",
  "value": "610103"
}, {
  "label": "莲湖区",
  "value": "610104"
}, {
  "label": "灞桥区",
  "value": "610111"
}, {
  "label": "未央区",
  "value": "610112"
}, {
  "label": "雁塔区",
  "value": "610113"
}, {
  "label": "阎良区",
  "value": "610114"
}, {
  "label": "临潼区",
  "value": "610115"
}, {
  "label": "长安区",
  "value": "610116"
}, {
  "label": "高陵区",
  "value": "610117"
}, {
  "label": "鄠邑区",
  "value": "610118"
}, {
  "label": "蓝田县",
  "value": "610122"
}, {
  "label": "周至县",
  "value": "610124"
}], [{
  "label": "王益区",
  "value": "610202"
}, {
  "label": "印台区",
  "value": "610203"
}, {
  "label": "耀州区",
  "value": "610204"
}, {
  "label": "宜君县",
  "value": "610222"
}], [{
  "label": "渭滨区",
  "value": "610302"
}, {
  "label": "金台区",
  "value": "610303"
}, {
  "label": "陈仓区",
  "value": "610304"
}, {
  "label": "凤翔县",
  "value": "610322"
}, {
  "label": "岐山县",
  "value": "610323"
}, {
  "label": "扶风县",
  "value": "610324"
}, {
  "label": "眉县",
  "value": "610326"
}, {
  "label": "陇县",
  "value": "610327"
}, {
  "label": "千阳县",
  "value": "610328"
}, {
  "label": "麟游县",
  "value": "610329"
}, {
  "label": "凤县",
  "value": "610330"
}, {
  "label": "太白县",
  "value": "610331"
}], [{
  "label": "秦都区",
  "value": "610402"
}, {
  "label": "杨陵区",
  "value": "610403"
}, {
  "label": "渭城区",
  "value": "610404"
}, {
  "label": "三原县",
  "value": "610422"
}, {
  "label": "泾阳县",
  "value": "610423"
}, {
  "label": "乾县",
  "value": "610424"
}, {
  "label": "礼泉县",
  "value": "610425"
}, {
  "label": "永寿县",
  "value": "610426"
}, {
  "label": "彬县",
  "value": "610427"
}, {
  "label": "长武县",
  "value": "610428"
}, {
  "label": "旬邑县",
  "value": "610429"
}, {
  "label": "淳化县",
  "value": "610430"
}, {
  "label": "武功县",
  "value": "610431"
}, {
  "label": "兴平市",
  "value": "610481"
}], [{
  "label": "临渭区",
  "value": "610502"
}, {
  "label": "华州区",
  "value": "610503"
}, {
  "label": "潼关县",
  "value": "610522"
}, {
  "label": "大荔县",
  "value": "610523"
}, {
  "label": "合阳县",
  "value": "610524"
}, {
  "label": "澄城县",
  "value": "610525"
}, {
  "label": "蒲城县",
  "value": "610526"
}, {
  "label": "白水县",
  "value": "610527"
}, {
  "label": "富平县",
  "value": "610528"
}, {
  "label": "韩城市",
  "value": "610581"
}, {
  "label": "华阴市",
  "value": "610582"
}], [{
  "label": "宝塔区",
  "value": "610602"
}, {
  "label": "安塞区",
  "value": "610603"
}, {
  "label": "延长县",
  "value": "610621"
}, {
  "label": "延川县",
  "value": "610622"
}, {
  "label": "子长县",
  "value": "610623"
}, {
  "label": "志丹县",
  "value": "610625"
}, {
  "label": "吴起县",
  "value": "610626"
}, {
  "label": "甘泉县",
  "value": "610627"
}, {
  "label": "富县",
  "value": "610628"
}, {
  "label": "洛川县",
  "value": "610629"
}, {
  "label": "宜川县",
  "value": "610630"
}, {
  "label": "黄龙县",
  "value": "610631"
}, {
  "label": "黄陵县",
  "value": "610632"
}], [{
  "label": "汉台区",
  "value": "610702"
}, {
  "label": "南郑区",
  "value": "610703"
}, {
  "label": "城固县",
  "value": "610722"
}, {
  "label": "洋县",
  "value": "610723"
}, {
  "label": "西乡县",
  "value": "610724"
}, {
  "label": "勉县",
  "value": "610725"
}, {
  "label": "宁强县",
  "value": "610726"
}, {
  "label": "略阳县",
  "value": "610727"
}, {
  "label": "镇巴县",
  "value": "610728"
}, {
  "label": "留坝县",
  "value": "610729"
}, {
  "label": "佛坪县",
  "value": "610730"
}], [{
  "label": "榆阳区",
  "value": "610802"
}, {
  "label": "横山区",
  "value": "610803"
}, {
  "label": "府谷县",
  "value": "610822"
}, {
  "label": "靖边县",
  "value": "610824"
}, {
  "label": "定边县",
  "value": "610825"
}, {
  "label": "绥德县",
  "value": "610826"
}, {
  "label": "米脂县",
  "value": "610827"
}, {
  "label": "佳县",
  "value": "610828"
}, {
  "label": "吴堡县",
  "value": "610829"
}, {
  "label": "清涧县",
  "value": "610830"
}, {
  "label": "子洲县",
  "value": "610831"
}, {
  "label": "神木市",
  "value": "610881"
}], [{
  "label": "汉滨区",
  "value": "610902"
}, {
  "label": "汉阴县",
  "value": "610921"
}, {
  "label": "石泉县",
  "value": "610922"
}, {
  "label": "宁陕县",
  "value": "610923"
}, {
  "label": "紫阳县",
  "value": "610924"
}, {
  "label": "岚皋县",
  "value": "610925"
}, {
  "label": "平利县",
  "value": "610926"
}, {
  "label": "镇坪县",
  "value": "610927"
}, {
  "label": "旬阳县",
  "value": "610928"
}, {
  "label": "白河县",
  "value": "610929"
}], [{
  "label": "商州区",
  "value": "611002"
}, {
  "label": "洛南县",
  "value": "611021"
}, {
  "label": "丹凤县",
  "value": "611022"
}, {
  "label": "商南县",
  "value": "611023"
}, {
  "label": "山阳县",
  "value": "611024"
}, {
  "label": "镇安县",
  "value": "611025"
}, {
  "label": "柞水县",
  "value": "611026"
}]], [[{
  "label": "城关区",
  "value": "620102"
}, {
  "label": "七里河区",
  "value": "620103"
}, {
  "label": "西固区",
  "value": "620104"
}, {
  "label": "安宁区",
  "value": "620105"
}, {
  "label": "红古区",
  "value": "620111"
}, {
  "label": "永登县",
  "value": "620121"
}, {
  "label": "皋兰县",
  "value": "620122"
}, {
  "label": "榆中县",
  "value": "620123"
}, {
  "label": "兰州新区",
  "value": "620171"
}], [{
  "label": "嘉峪关市",
  "value": "620201"
}], [{
  "label": "金川区",
  "value": "620302"
}, {
  "label": "永昌县",
  "value": "620321"
}], [{
  "label": "白银区",
  "value": "620402"
}, {
  "label": "平川区",
  "value": "620403"
}, {
  "label": "靖远县",
  "value": "620421"
}, {
  "label": "会宁县",
  "value": "620422"
}, {
  "label": "景泰县",
  "value": "620423"
}], [{
  "label": "秦州区",
  "value": "620502"
}, {
  "label": "麦积区",
  "value": "620503"
}, {
  "label": "清水县",
  "value": "620521"
}, {
  "label": "秦安县",
  "value": "620522"
}, {
  "label": "甘谷县",
  "value": "620523"
}, {
  "label": "武山县",
  "value": "620524"
}, {
  "label": "张家川回族自治县",
  "value": "620525"
}], [{
  "label": "凉州区",
  "value": "620602"
}, {
  "label": "民勤县",
  "value": "620621"
}, {
  "label": "古浪县",
  "value": "620622"
}, {
  "label": "天祝藏族自治县",
  "value": "620623"
}], [{
  "label": "甘州区",
  "value": "620702"
}, {
  "label": "肃南裕固族自治县",
  "value": "620721"
}, {
  "label": "民乐县",
  "value": "620722"
}, {
  "label": "临泽县",
  "value": "620723"
}, {
  "label": "高台县",
  "value": "620724"
}, {
  "label": "山丹县",
  "value": "620725"
}], [{
  "label": "崆峒区",
  "value": "620802"
}, {
  "label": "泾川县",
  "value": "620821"
}, {
  "label": "灵台县",
  "value": "620822"
}, {
  "label": "崇信县",
  "value": "620823"
}, {
  "label": "华亭县",
  "value": "620824"
}, {
  "label": "庄浪县",
  "value": "620825"
}, {
  "label": "静宁县",
  "value": "620826"
}, {
  "label": "平凉工业园区",
  "value": "620871"
}], [{
  "label": "肃州区",
  "value": "620902"
}, {
  "label": "金塔县",
  "value": "620921"
}, {
  "label": "瓜州县",
  "value": "620922"
}, {
  "label": "肃北蒙古族自治县",
  "value": "620923"
}, {
  "label": "阿克塞哈萨克族自治县",
  "value": "620924"
}, {
  "label": "玉门市",
  "value": "620981"
}, {
  "label": "敦煌市",
  "value": "620982"
}], [{
  "label": "西峰区",
  "value": "621002"
}, {
  "label": "庆城县",
  "value": "621021"
}, {
  "label": "环县",
  "value": "621022"
}, {
  "label": "华池县",
  "value": "621023"
}, {
  "label": "合水县",
  "value": "621024"
}, {
  "label": "正宁县",
  "value": "621025"
}, {
  "label": "宁县",
  "value": "621026"
}, {
  "label": "镇原县",
  "value": "621027"
}], [{
  "label": "安定区",
  "value": "621102"
}, {
  "label": "通渭县",
  "value": "621121"
}, {
  "label": "陇西县",
  "value": "621122"
}, {
  "label": "渭源县",
  "value": "621123"
}, {
  "label": "临洮县",
  "value": "621124"
}, {
  "label": "漳县",
  "value": "621125"
}, {
  "label": "岷县",
  "value": "621126"
}], [{
  "label": "武都区",
  "value": "621202"
}, {
  "label": "成县",
  "value": "621221"
}, {
  "label": "文县",
  "value": "621222"
}, {
  "label": "宕昌县",
  "value": "621223"
}, {
  "label": "康县",
  "value": "621224"
}, {
  "label": "西和县",
  "value": "621225"
}, {
  "label": "礼县",
  "value": "621226"
}, {
  "label": "徽县",
  "value": "621227"
}, {
  "label": "两当县",
  "value": "621228"
}], [{
  "label": "临夏市",
  "value": "622901"
}, {
  "label": "临夏县",
  "value": "622921"
}, {
  "label": "康乐县",
  "value": "622922"
}, {
  "label": "永靖县",
  "value": "622923"
}, {
  "label": "广河县",
  "value": "622924"
}, {
  "label": "和政县",
  "value": "622925"
}, {
  "label": "东乡族自治县",
  "value": "622926"
}, {
  "label": "积石山保安族东乡族撒拉族自治县",
  "value": "622927"
}], [{
  "label": "合作市",
  "value": "623001"
}, {
  "label": "临潭县",
  "value": "623021"
}, {
  "label": "卓尼县",
  "value": "623022"
}, {
  "label": "舟曲县",
  "value": "623023"
}, {
  "label": "迭部县",
  "value": "623024"
}, {
  "label": "玛曲县",
  "value": "623025"
}, {
  "label": "碌曲县",
  "value": "623026"
}, {
  "label": "夏河县",
  "value": "623027"
}]], [[{
  "label": "城东区",
  "value": "630102"
}, {
  "label": "城中区",
  "value": "630103"
}, {
  "label": "城西区",
  "value": "630104"
}, {
  "label": "城北区",
  "value": "630105"
}, {
  "label": "大通回族土族自治县",
  "value": "630121"
}, {
  "label": "湟中县",
  "value": "630122"
}, {
  "label": "湟源县",
  "value": "630123"
}], [{
  "label": "乐都区",
  "value": "630202"
}, {
  "label": "平安区",
  "value": "630203"
}, {
  "label": "民和回族土族自治县",
  "value": "630222"
}, {
  "label": "互助土族自治县",
  "value": "630223"
}, {
  "label": "化隆回族自治县",
  "value": "630224"
}, {
  "label": "循化撒拉族自治县",
  "value": "630225"
}], [{
  "label": "门源回族自治县",
  "value": "632221"
}, {
  "label": "祁连县",
  "value": "632222"
}, {
  "label": "海晏县",
  "value": "632223"
}, {
  "label": "刚察县",
  "value": "632224"
}], [{
  "label": "同仁县",
  "value": "632321"
}, {
  "label": "尖扎县",
  "value": "632322"
}, {
  "label": "泽库县",
  "value": "632323"
}, {
  "label": "河南蒙古族自治县",
  "value": "632324"
}], [{
  "label": "共和县",
  "value": "632521"
}, {
  "label": "同德县",
  "value": "632522"
}, {
  "label": "贵德县",
  "value": "632523"
}, {
  "label": "兴海县",
  "value": "632524"
}, {
  "label": "贵南县",
  "value": "632525"
}], [{
  "label": "玛沁县",
  "value": "632621"
}, {
  "label": "班玛县",
  "value": "632622"
}, {
  "label": "甘德县",
  "value": "632623"
}, {
  "label": "达日县",
  "value": "632624"
}, {
  "label": "久治县",
  "value": "632625"
}, {
  "label": "玛多县",
  "value": "632626"
}], [{
  "label": "玉树市",
  "value": "632701"
}, {
  "label": "杂多县",
  "value": "632722"
}, {
  "label": "称多县",
  "value": "632723"
}, {
  "label": "治多县",
  "value": "632724"
}, {
  "label": "囊谦县",
  "value": "632725"
}, {
  "label": "曲麻莱县",
  "value": "632726"
}], [{
  "label": "格尔木市",
  "value": "632801"
}, {
  "label": "德令哈市",
  "value": "632802"
}, {
  "label": "乌兰县",
  "value": "632821"
}, {
  "label": "都兰县",
  "value": "632822"
}, {
  "label": "天峻县",
  "value": "632823"
}, {
  "label": "大柴旦行政委员会",
  "value": "632857"
}, {
  "label": "冷湖行政委员会",
  "value": "632858"
}, {
  "label": "茫崖行政委员会",
  "value": "632859"
}]], [[{
  "label": "兴庆区",
  "value": "640104"
}, {
  "label": "西夏区",
  "value": "640105"
}, {
  "label": "金凤区",
  "value": "640106"
}, {
  "label": "永宁县",
  "value": "640121"
}, {
  "label": "贺兰县",
  "value": "640122"
}, {
  "label": "灵武市",
  "value": "640181"
}], [{
  "label": "大武口区",
  "value": "640202"
}, {
  "label": "惠农区",
  "value": "640205"
}, {
  "label": "平罗县",
  "value": "640221"
}], [{
  "label": "利通区",
  "value": "640302"
}, {
  "label": "红寺堡区",
  "value": "640303"
}, {
  "label": "盐池县",
  "value": "640323"
}, {
  "label": "同心县",
  "value": "640324"
}, {
  "label": "青铜峡市",
  "value": "640381"
}], [{
  "label": "原州区",
  "value": "640402"
}, {
  "label": "西吉县",
  "value": "640422"
}, {
  "label": "隆德县",
  "value": "640423"
}, {
  "label": "泾源县",
  "value": "640424"
}, {
  "label": "彭阳县",
  "value": "640425"
}], [{
  "label": "沙坡头区",
  "value": "640502"
}, {
  "label": "中宁县",
  "value": "640521"
}, {
  "label": "海原县",
  "value": "640522"
}]], [[{
  "label": "天山区",
  "value": "650102"
}, {
  "label": "沙依巴克区",
  "value": "650103"
}, {
  "label": "新市区",
  "value": "650104"
}, {
  "label": "水磨沟区",
  "value": "650105"
}, {
  "label": "头屯河区",
  "value": "650106"
}, {
  "label": "达坂城区",
  "value": "650107"
}, {
  "label": "米东区",
  "value": "650109"
}, {
  "label": "乌鲁木齐县",
  "value": "650121"
}, {
  "label": "乌鲁木齐经济技术开发区",
  "value": "650171"
}, {
  "label": "乌鲁木齐高新技术产业开发区",
  "value": "650172"
}], [{
  "label": "独山子区",
  "value": "650202"
}, {
  "label": "克拉玛依区",
  "value": "650203"
}, {
  "label": "白碱滩区",
  "value": "650204"
}, {
  "label": "乌尔禾区",
  "value": "650205"
}], [{
  "label": "高昌区",
  "value": "650402"
}, {
  "label": "鄯善县",
  "value": "650421"
}, {
  "label": "托克逊县",
  "value": "650422"
}], [{
  "label": "伊州区",
  "value": "650502"
}, {
  "label": "巴里坤哈萨克自治县",
  "value": "650521"
}, {
  "label": "伊吾县",
  "value": "650522"
}], [{
  "label": "昌吉市",
  "value": "652301"
}, {
  "label": "阜康市",
  "value": "652302"
}, {
  "label": "呼图壁县",
  "value": "652323"
}, {
  "label": "玛纳斯县",
  "value": "652324"
}, {
  "label": "奇台县",
  "value": "652325"
}, {
  "label": "吉木萨尔县",
  "value": "652327"
}, {
  "label": "木垒哈萨克自治县",
  "value": "652328"
}], [{
  "label": "博乐市",
  "value": "652701"
}, {
  "label": "阿拉山口市",
  "value": "652702"
}, {
  "label": "精河县",
  "value": "652722"
}, {
  "label": "温泉县",
  "value": "652723"
}], [{
  "label": "库尔勒市",
  "value": "652801"
}, {
  "label": "轮台县",
  "value": "652822"
}, {
  "label": "尉犁县",
  "value": "652823"
}, {
  "label": "若羌县",
  "value": "652824"
}, {
  "label": "且末县",
  "value": "652825"
}, {
  "label": "焉耆回族自治县",
  "value": "652826"
}, {
  "label": "和静县",
  "value": "652827"
}, {
  "label": "和硕县",
  "value": "652828"
}, {
  "label": "博湖县",
  "value": "652829"
}, {
  "label": "库尔勒经济技术开发区",
  "value": "652871"
}], [{
  "label": "阿克苏市",
  "value": "652901"
}, {
  "label": "温宿县",
  "value": "652922"
}, {
  "label": "库车县",
  "value": "652923"
}, {
  "label": "沙雅县",
  "value": "652924"
}, {
  "label": "新和县",
  "value": "652925"
}, {
  "label": "拜城县",
  "value": "652926"
}, {
  "label": "乌什县",
  "value": "652927"
}, {
  "label": "阿瓦提县",
  "value": "652928"
}, {
  "label": "柯坪县",
  "value": "652929"
}], [{
  "label": "阿图什市",
  "value": "653001"
}, {
  "label": "阿克陶县",
  "value": "653022"
}, {
  "label": "阿合奇县",
  "value": "653023"
}, {
  "label": "乌恰县",
  "value": "653024"
}], [{
  "label": "喀什市",
  "value": "653101"
}, {
  "label": "疏附县",
  "value": "653121"
}, {
  "label": "疏勒县",
  "value": "653122"
}, {
  "label": "英吉沙县",
  "value": "653123"
}, {
  "label": "泽普县",
  "value": "653124"
}, {
  "label": "莎车县",
  "value": "653125"
}, {
  "label": "叶城县",
  "value": "653126"
}, {
  "label": "麦盖提县",
  "value": "653127"
}, {
  "label": "岳普湖县",
  "value": "653128"
}, {
  "label": "伽师县",
  "value": "653129"
}, {
  "label": "巴楚县",
  "value": "653130"
}, {
  "label": "塔什库尔干塔吉克自治县",
  "value": "653131"
}], [{
  "label": "和田市",
  "value": "653201"
}, {
  "label": "和田县",
  "value": "653221"
}, {
  "label": "墨玉县",
  "value": "653222"
}, {
  "label": "皮山县",
  "value": "653223"
}, {
  "label": "洛浦县",
  "value": "653224"
}, {
  "label": "策勒县",
  "value": "653225"
}, {
  "label": "于田县",
  "value": "653226"
}, {
  "label": "民丰县",
  "value": "653227"
}], [{
  "label": "伊宁市",
  "value": "654002"
}, {
  "label": "奎屯市",
  "value": "654003"
}, {
  "label": "霍尔果斯市",
  "value": "654004"
}, {
  "label": "伊宁县",
  "value": "654021"
}, {
  "label": "察布查尔锡伯自治县",
  "value": "654022"
}, {
  "label": "霍城县",
  "value": "654023"
}, {
  "label": "巩留县",
  "value": "654024"
}, {
  "label": "新源县",
  "value": "654025"
}, {
  "label": "昭苏县",
  "value": "654026"
}, {
  "label": "特克斯县",
  "value": "654027"
}, {
  "label": "尼勒克县",
  "value": "654028"
}], [{
  "label": "塔城市",
  "value": "654201"
}, {
  "label": "乌苏市",
  "value": "654202"
}, {
  "label": "额敏县",
  "value": "654221"
}, {
  "label": "沙湾县",
  "value": "654223"
}, {
  "label": "托里县",
  "value": "654224"
}, {
  "label": "裕民县",
  "value": "654225"
}, {
  "label": "和布克赛尔蒙古自治县",
  "value": "654226"
}], [{
  "label": "阿勒泰市",
  "value": "654301"
}, {
  "label": "布尔津县",
  "value": "654321"
}, {
  "label": "富蕴县",
  "value": "654322"
}, {
  "label": "福海县",
  "value": "654323"
}, {
  "label": "哈巴河县",
  "value": "654324"
}, {
  "label": "青河县",
  "value": "654325"
}, {
  "label": "吉木乃县",
  "value": "654326"
}], [{
  "label": "石河子市",
  "value": "659001"
}, {
  "label": "阿拉尔市",
  "value": "659002"
}, {
  "label": "图木舒克市",
  "value": "659003"
}, {
  "label": "五家渠市",
  "value": "659004"
}, {
  "label": "铁门关市",
  "value": "659006"
}]], [[{
  "label": "台北",
  "value": "660101"
}], [{
  "label": "高雄",
  "value": "660201"
}], [{
  "label": "基隆",
  "value": "660301"
}], [{
  "label": "台中",
  "value": "660401"
}], [{
  "label": "台南",
  "value": "660501"
}], [{
  "label": "新竹",
  "value": "660601"
}], [{
  "label": "嘉义",
  "value": "660701"
}], [{
  "label": "宜兰",
  "value": "660801"
}], [{
  "label": "桃园",
  "value": "660901"
}], [{
  "label": "苗栗",
  "value": "661001"
}], [{
  "label": "彰化",
  "value": "661101"
}], [{
  "label": "南投",
  "value": "661201"
}], [{
  "label": "云林",
  "value": "661301"
}], [{
  "label": "屏东",
  "value": "661401"
}], [{
  "label": "台东",
  "value": "661501"
}], [{
  "label": "花莲",
  "value": "661601"
}], [{
  "label": "澎湖",
  "value": "661701"
}]], [[{
  "label": "香港岛",
  "value": "670101"
}], [{
  "label": "九龙",
  "value": "670201"
}], [{
  "label": "新界",
  "value": "670301"
}]], [[{
  "label": "澳门半岛",
  "value": "680101"
}], [{
  "label": "氹仔岛",
  "value": "680201"
}], [{
  "label": "路环岛",
  "value": "680301"
}], [{
  "label": "路氹城",
  "value": "680401"
}]]];
var _default = areaData;
exports.default = _default;

/***/ }),

/***/ 645:
/*!*****************************************************************!*\
  !*** D:/project/前端/front/front/components/w-picker/w-picker.js ***!
  \*****************************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


var _interopRequireDefault = __webpack_require__(/*! @babel/runtime/helpers/interopRequireDefault */ 3);
Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;
var _toConsumableArray2 = _interopRequireDefault(__webpack_require__(/*! @babel/runtime/helpers/toConsumableArray */ 17));
var forMatNum = function forMatNum(num) {
  return num < 10 ? '0' + num : num + '';
};
var initPicker = {
  //日期
  date: {
    init: function init(start, end) {
      var mode = arguments.length > 2 && arguments[2] !== undefined ? arguments[2] : "date";
      var step = arguments.length > 3 ? arguments[3] : undefined;
      var value = arguments.length > 4 ? arguments[4] : undefined;
      var flag = arguments.length > 5 ? arguments[5] : undefined;
      var disabled = arguments.length > 6 ? arguments[6] : undefined;
      var aToday = new Date();
      var tYear,
        tMonth,
        tDay,
        tHours,
        tMinutes,
        tSeconds,
        defaultVal = [];
      var initstartDate = new Date(start.toString());
      var endDate = new Date(end.toString());
      if (start > end) {
        initstartDate = new Date(end.toString());
        endDate = new Date(start.toString());
      }
      ;
      var startYear = initstartDate.getFullYear();
      var startMonth = initstartDate.getMonth() + 1;
      var endYear = endDate.getFullYear();
      var years = [],
        months = [],
        days = [],
        hours = [],
        minutes = [],
        seconds = [],
        areas = [],
        returnArr = [],
        dvalDate = [];
      switch (mode) {
        case "half":
          dvalDate = flag ? [].concat((0, _toConsumableArray2.default)(value.split(" ")[0].split("-")), (0, _toConsumableArray2.default)(value.split(" ")[1].split(":"))) : [].concat((0, _toConsumableArray2.default)(value.split(" ")[0].split("-")), [value.split(" ")[1]]);
          break;
        case "date":
        case "yearMonth":
          dvalDate = value.split("-");
          break;
        case "dateTime":
          dvalDate = [].concat((0, _toConsumableArray2.default)(value.split(" ")[0].split("-")), (0, _toConsumableArray2.default)(value.split(" ")[1].split(":")));
          break;
        case "time":
          dvalDate = value.split(":");
          break;
      }
      var curMonth = flag ? dvalDate[1] * 1 : dvalDate[1] + 1;
      var dYear = aToday.getFullYear();
      var dMonth = aToday.getMonth() + 1;
      var dDate = aToday.getDate();
      var totalDays = new Date(startYear, curMonth, 0).getDate();
      var dvalObj = {};
      switch (mode) {
        case "half":
        case "date":
        case "yearMonth":
          var curYear = dvalDate[0];
          var _curMonth = dvalDate[1];
          if (disabled) {
            for (var s = startYear; s <= dYear; s++) {
              years.push(s + '');
            }
            ;
            if (curYear == dYear) {
              for (var m = 1; m <= dMonth; m++) {
                months.push(forMatNum(m));
              }
              ;
            } else {
              for (var _m = 1; _m <= 12; _m++) {
                months.push(forMatNum(_m));
              }
              ;
            }
            if (_curMonth == dMonth) {
              for (var d = 1; d <= dDate; d++) {
                days.push(forMatNum(d));
              }
            } else {
              for (var _d = 1; _d <= totalDays; _d++) {
                days.push(forMatNum(_d));
              }
            }
          } else {
            for (var _s = startYear; _s <= endYear; _s++) {
              years.push(_s + '');
            }
            ;
            for (var _m2 = 1; _m2 <= 12; _m2++) {
              months.push(forMatNum(_m2));
            }
            ;
            for (var _d2 = 1; _d2 <= totalDays; _d2++) {
              days.push(forMatNum(_d2));
            }
          }
          ;
          break;
        default:
          for (var _s2 = startYear; _s2 <= endYear; _s2++) {
            years.push(_s2 + '');
          }
          ;
          for (var _m3 = 1; _m3 <= 12; _m3++) {
            months.push(forMatNum(_m3));
          }
          ;
          for (var _d3 = 1; _d3 <= totalDays; _d3++) {
            days.push(forMatNum(_d3));
          }
          break;
      }
      for (var h = 0; h < 24; h++) {
        hours.push(forMatNum(h));
      }
      for (var _m4 = 0; _m4 < 60; _m4 += step * 1) {
        minutes.push(forMatNum(_m4));
      }
      for (var _s3 = 0; _s3 < 60; _s3++) {
        seconds.push(forMatNum(_s3));
      }
      if (flag) {
        returnArr = [years.indexOf(dvalDate[0]), months.indexOf(dvalDate[1]), days.indexOf(dvalDate[2]), hours.indexOf(dvalDate[3]), minutes.indexOf(dvalDate[4]) == -1 ? 0 : minutes.indexOf(dvalDate[4]), seconds.indexOf(dvalDate[5])];
      }
      switch (mode) {
        case "date":
          if (flag) {
            defaultVal = [returnArr[0], returnArr[1], returnArr[2]];
            return {
              years: years,
              months: months,
              days: days,
              defaultVal: defaultVal
            };
          } else {
            defaultVal = [years.indexOf(dvalDate[0]) == -1 ? 0 : years.indexOf(dvalDate[0]), months.indexOf(dvalDate[1]) == -1 ? 0 : months.indexOf(dvalDate[1]), days.indexOf(dvalDate[2]) == -1 ? 0 : days.indexOf(dvalDate[2])];
            return {
              years: years,
              months: months,
              days: days,
              defaultVal: defaultVal
            };
          }
          break;
        case "half":
          areas = [{
            label: "上午",
            value: 0
          }, {
            label: "下午",
            value: 1
          }];
          if (flag) {
            defaultVal = [returnArr[0], returnArr[1], returnArr[2], returnArr[3]];
            return {
              years: years,
              months: months,
              days: days,
              areas: areas,
              defaultVal: defaultVal
            };
          } else {
            var idx = 0;
            areas.map(function (v, k) {
              if (v.label == dvalDate[3]) {
                idx = v.value;
              }
            });
            defaultVal = [years.indexOf(dvalDate[0]) == -1 ? 0 : years.indexOf(dvalDate[0]), months.indexOf(dvalDate[1]) == -1 ? 0 : months.indexOf(dvalDate[1]), days.indexOf(dvalDate[2]) == -1 ? 0 : days.indexOf(dvalDate[2]), idx];
            return {
              years: years,
              months: months,
              days: days,
              areas: areas,
              defaultVal: defaultVal
            };
          }
          break;
        case "yearMonth":
          if (flag) {
            defaultVal = [returnArr[0], returnArr[1]];
            return {
              years: years,
              months: months,
              defaultVal: defaultVal
            };
          } else {
            defaultVal = [years.indexOf(dvalDate[0]) == -1 ? 0 : years.indexOf(dvalDate[0]), months.indexOf(dvalDate[1]) == -1 ? 0 : months.indexOf(dvalDate[1])];
            return {
              years: years,
              months: months,
              defaultVal: defaultVal
            };
          }
          break;
        case "dateTime":
          if (flag) {
            defaultVal = returnArr;
          } else {
            defaultVal = [years.indexOf(dvalDate[0]) == -1 ? 0 : years.indexOf(dvalDate[0]), months.indexOf(dvalDate[1]) == -1 ? 0 : months.indexOf(dvalDate[1]), days.indexOf(dvalDate[2]) == -1 ? 0 : days.indexOf(dvalDate[2]), hours.indexOf(dvalDate[3]) == -1 ? 0 : hours.indexOf(dvalDate[3]), minutes.indexOf(dvalDate[4]) == -1 ? 0 : minutes.indexOf(dvalDate[4]), seconds.indexOf(dvalDate[5]) == -1 ? 0 : seconds.indexOf(dvalDate[5])];
          }
          return {
            years: years,
            months: months,
            days: days,
            hours: hours,
            minutes: minutes,
            seconds: seconds,
            defaultVal: defaultVal
          };
          break;
        case "time":
          if (flag) {
            defaultVal = [returnArr[3], returnArr[4], returnArr[5]];
          } else {
            defaultVal = [hours.indexOf(dvalDate[0]) == -1 ? 0 : hours.indexOf(dvalDate[0]), minutes.indexOf(dvalDate[1]) == -1 ? 0 : minutes.indexOf(dvalDate[1]), seconds.indexOf(dvalDate[2]) == -1 ? 0 : seconds.indexOf(dvalDate[2])];
          }
          return {
            hours: hours,
            minutes: minutes,
            seconds: seconds,
            defaultVal: defaultVal
          };
          break;
      }
    },
    initMonths: function initMonths(year, disabled) {
      var aDate = new Date();
      var dYear = aDate.getFullYear();
      var dMonth = aDate.getMonth() + 1;
      var dDate = aDate.getDate();
      var flag = dYear == year ? true : false;
      var months = [];
      if (disabled) {
        if (flag) {
          for (var m = 1; m <= dMonth; m++) {
            months.push(forMatNum(m));
          }
          ;
        } else {
          for (var _m5 = 1; _m5 <= 12; _m5++) {
            months.push(forMatNum(_m5));
          }
          ;
        }
      } else {
        for (var _m6 = 1; _m6 <= 12; _m6++) {
          months.push(forMatNum(_m6));
        }
        ;
      }
      ;
      return months;
    },
    initDays: function initDays(year, month, disabled) {
      var aDate = new Date();
      var dYear = aDate.getFullYear();
      var dMonth = aDate.getMonth() + 1;
      var dDate = aDate.getDate();
      var flag = dYear == year && dMonth == month ? true : false;
      var totalDays = new Date(year, month, 0).getDate();
      var dates = [];
      if (flag && disabled) {
        for (var d = 1; d <= dDate; d++) {
          dates.push(forMatNum(d));
        }
        ;
      } else {
        for (var _d4 = 1; _d4 <= totalDays; _d4++) {
          dates.push(forMatNum(_d4));
        }
        ;
      }
      ;
      return dates;
    }
  },
  //短期日期上下午
  limitHour: {
    init: function init() {
      var dayStep = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : 7;
      var dVal = arguments.length > 1 ? arguments[1] : undefined;
      var startDate = new Date();
      var date = [],
        areas = [],
        hours = [];
      var hour = new Date().getHours();
      var weeks = ["周日", "周一", "周二", "周三", "周四", "周五", "周六"];
      var arrs = [];
      var defaultVal = [];
      var d = 0,
        a = 0,
        h = 0;
      for (var i = 0; i < dayStep; i++) {
        var year = void 0,
          month = void 0,
          day = void 0,
          weekday = void 0;
        year = startDate.getFullYear();
        month = forMatNum(startDate.getMonth() + 1);
        day = forMatNum(startDate.getDate());
        weekday = weeks[startDate.getDay()];
        var label = "";
        switch (i) {
          case 0:
            label = "今天";
            break;
          case 1:
            label = "明天";
            break;
          case 2:
            label = "后天";
            break;
          default:
            label = month + "月" + day + "日" + " " + weekday;
            break;
        }
        date.push({
          label: label,
          value: year + "-" + month + "-" + day,
          today: i == 0 ? true : false
        });
        startDate.setDate(startDate.getDate() + 1);
      }
      if (hour > 12) {
        areas = [{
          label: "下午",
          value: 1
        }];
      } else {
        areas = [{
          label: "上午",
          value: 0
        }, {
          label: "下午",
          value: 1
        }];
      }
      ;
      for (var k = hour > 12 ? hour - 12 : hour; k <= 12; k++) {
        hours.push({
          label: forMatNum(k),
          value: forMatNum(hour > 12 ? k + 12 : k)
        });
      }
      ;
      date.map(function (v, k) {
        if (v.label == dVal[0]) {
          d = k;
        }
      });
      if (d != 0) {
        areas = this.initAreas(date[d]);
        hours = this.initHours(date[d], areas[a]);
      }
      areas.map(function (v, k) {
        if (v.label == dVal[1]) {
          a = k;
        }
      });
      hours.map(function (v, k) {
        if (v.label == dVal[2]) {
          h = k;
        }
      });
      defaultVal = [d, a, h];
      return {
        date: date,
        areas: areas,
        hours: hours,
        defaultVal: defaultVal
      };
    },
    initAreas: function initAreas(date) {
      var areas = [];
      var hour = new Date().getHours();
      if (date.today) {
        if (hour > 12) {
          areas = [{
            label: "下午",
            value: 1
          }];
        } else {
          areas = [{
            label: "上午",
            value: 0
          }, {
            label: "下午",
            value: 1
          }];
        }
        ;
      } else {
        areas = [{
          label: "上午",
          value: 0
        }, {
          label: "下午",
          value: 1
        }];
      }
      return areas;
    },
    initHours: function initHours(dateCol, hourCol) {
      var hours = [];
      var hour = new Date().getHours();
      if (dateCol.today) {
        if (hourCol.value == 1 && hour <= 12) {
          for (var k = 1; k <= 12; k++) {
            hours.push({
              label: forMatNum(k),
              value: forMatNum(hourCol.value == 1 ? k + 12 : k)
            });
          }
          ;
        } else {
          for (var _k = hour > 12 ? hour - 12 : hour; _k <= 12; _k++) {
            hours.push({
              label: forMatNum(_k),
              value: forMatNum(hourCol.value == 1 ? _k + 12 : _k)
            });
          }
          ;
        }
      } else {
        for (var _k2 = 1; _k2 <= 12; _k2++) {
          hours.push({
            label: forMatNum(_k2),
            value: forMatNum(hourCol.value == 1 ? _k2 + 12 : _k2)
          });
        }
        ;
      }
      ;
      return hours;
    }
  },
  //短期日期时间初始化
  limit: {
    init: function init() {
      var dayStep = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : 7;
      var startHour = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : 8;
      var endHour = arguments.length > 2 && arguments[2] !== undefined ? arguments[2] : 20;
      var minuteStep = arguments.length > 3 && arguments[3] !== undefined ? arguments[3] : 1;
      var afterStep = arguments.length > 4 && arguments[4] !== undefined ? arguments[4] : 30;
      var dVal = arguments.length > 5 ? arguments[5] : undefined;
      var startDate = new Date();
      var bsDate = new Date(new Date().getTime() + afterStep * 60 * 1000);
      var date = [],
        hours = [],
        minutes = [];
      var hour = bsDate.getHours();
      var minute = Math.floor(bsDate.getMinutes() / minuteStep) * minuteStep;
      var weeks = ["周日", "周一", "周二", "周三", "周四", "周五", "周六"];
      var d = 0,
        h = 0,
        m = 0;
      var defaultVal = [];
      for (var i = 0; i < dayStep; i++) {
        var year = void 0,
          month = void 0,
          day = void 0,
          weekday = void 0;
        year = startDate.getFullYear();
        month = forMatNum(startDate.getMonth() + 1);
        day = forMatNum(startDate.getDate());
        weekday = weeks[startDate.getDay()];
        var label = "";
        switch (i) {
          case 0:
            label = "今天";
            break;
          case 1:
            label = "明天";
            break;
          case 2:
            label = "后天";
            break;
          default:
            label = month + "月" + day + "日" + " " + weekday;
            break;
        }
        date.push({
          label: label,
          value: year + "-" + month + "-" + day,
          flag: i == 0 ? true : false
        });
        startDate.setDate(startDate.getDate() + 1);
      }
      if (hour < startHour) {
        hour = startHour;
      }
      ;
      if (hour > endHour) {
        hour = endHour;
      }
      ;
      for (var k = hour * 1; k <= endHour * 1; k++) {
        hours.push({
          label: forMatNum(k),
          value: forMatNum(k),
          flag: k == hour ? true : false
        });
      }
      ;
      for (var j = minute; j < 60; j += minuteStep * 1) {
        minutes.push({
          label: forMatNum(j),
          value: forMatNum(j)
        });
      }
      date.map(function (v, k) {
        if (v.label == dVal[0]) {
          d = k;
        }
      });
      if (d != 0) {
        hours = this.initHours(startHour = 8, endHour = 20, minuteStep = 1, afterStep = 30, date[d].value);
      }
      hours.map(function (v, k) {
        if (v.label == dVal[1]) {
          h = k;
        }
      });
      minutes.map(function (v, k) {
        if (v.label == dVal[2]) {
          m = k;
        }
      });
      defaultVal = [d, h, m];
      return {
        date: date,
        hours: hours,
        minutes: minutes,
        defaultVal: defaultVal
      };
    },
    initHours: function initHours() {
      var startHour = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : 8;
      var endHour = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : 20;
      var minuteStep = arguments.length > 2 && arguments[2] !== undefined ? arguments[2] : 1;
      var afterStep = arguments.length > 3 && arguments[3] !== undefined ? arguments[3] : 30;
      var date = arguments.length > 4 ? arguments[4] : undefined;
      var hours = [];
      var arr = date.split("-");
      var aDate = new Date();
      var dYear = aDate.getFullYear();
      var dMonth = aDate.getMonth() + 1;
      var dDate = aDate.getDate();
      var bsDate = new Date(new Date().getTime() + afterStep * 60 * 1000);
      var hour = bsDate.getHours();
      var flag = dYear == arr[0] && dMonth == arr[1] && dDate == arr[2] ? true : false;
      if (hour > endHour) {
        hour = endHour;
      }
      ;
      if (flag) {
        for (var k = hour * 1; k <= endHour * 1; k++) {
          hours.push({
            label: forMatNum(k),
            value: forMatNum(k),
            flag: k == hour ? true : false
          });
        }
        ;
      } else {
        for (var _k3 = startHour * 1; _k3 <= endHour * 1; _k3++) {
          hours.push({
            label: forMatNum(_k3),
            value: forMatNum(_k3),
            flag: false
          });
        }
      }
      ;
      return hours;
    },
    initMinutes: function initMinutes() {
      var startHour = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : 8;
      var endHour = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : 20;
      var minuteStep = arguments.length > 2 && arguments[2] !== undefined ? arguments[2] : 1;
      var afterStep = arguments.length > 3 && arguments[3] !== undefined ? arguments[3] : 30;
      var date = arguments.length > 4 ? arguments[4] : undefined;
      var hour = arguments.length > 5 ? arguments[5] : undefined;
      var minutes = [];
      var bsDate = new Date(new Date().getTime() + afterStep * 60 * 1000);
      var arr = date.split("-");
      var aDate = new Date();
      var dYear = aDate.getFullYear();
      var dMonth = aDate.getMonth() + 1;
      var dDate = aDate.getDate();
      var dHour = bsDate.getHours();
      ;
      var minute = Math.floor(bsDate.getMinutes() / minuteStep) * minuteStep;
      var flag = dYear == arr[0] && dMonth == arr[1] && dDate == arr[2] ? true : false;
      if (flag) {
        if (hour == dHour) {
          for (var j = minute; j < 60; j += minuteStep * 1) {
            minutes.push({
              label: forMatNum(j),
              value: forMatNum(j)
            });
          }
        } else {
          for (var _j = 0; _j < 60; _j += minuteStep * 1) {
            minutes.push({
              label: forMatNum(_j),
              value: forMatNum(_j)
            });
          }
        }
      } else {
        for (var _j2 = 0; _j2 < 60; _j2 += minuteStep * 1) {
          minutes.push({
            label: forMatNum(_j2),
            value: forMatNum(_j2)
          });
        }
      }
      return minutes;
    }
  },
  //选择区间初始化
  range: {
    init: function init(start, end, value, flag) {
      var aToday = new Date();
      var tYear,
        tMonth,
        tDay,
        tHours,
        tMinutes,
        tSeconds,
        defaultVal = [];
      var initstartDate = new Date(start.toString());
      var endDate = new Date(end.toString());
      if (start > end) {
        initstartDate = new Date(end.toString());
        endDate = new Date(start.toString());
      }
      ;
      var startYear = initstartDate.getFullYear();
      var startMonth = initstartDate.getMonth() + 1;
      var endYear = endDate.getFullYear();
      var fyears = [],
        fmonths = [],
        fdays = [],
        tyears = [],
        tmonths = [],
        tdays = [],
        returnArr = [],
        startDVal = [],
        endDVal = [];
      startDVal = value[0].split("-");
      endDVal = value[1].split("-");
      var curMonth = flag ? startDVal[1] * 1 : startDVal[1] + 1;
      var totalDays = new Date(startYear, curMonth, 0).getDate();
      for (var s = startYear; s <= endYear; s++) {
        fyears.push(s + '');
      }
      ;
      for (var m = 1; m <= 12; m++) {
        fmonths.push(forMatNum(m));
      }
      ;
      for (var d = 1; d <= totalDays; d++) {
        fdays.push(forMatNum(d));
      }
      ;
      for (var _s4 = startDVal[0]; _s4 <= endYear; _s4++) {
        tyears.push(_s4 + '');
      }
      ;
      for (var _m7 = startDVal[1]; _m7 <= 12; _m7++) {
        tmonths.push(forMatNum(_m7));
      }
      ;
      for (var _d5 = startDVal[2]; _d5 <= totalDays; _d5++) {
        tdays.push(forMatNum(_d5));
      }
      ;
      defaultVal = [fyears.indexOf(startDVal[0]) == -1 ? 0 : fyears.indexOf(startDVal[0]), fmonths.indexOf(startDVal[1]) == -1 ? 0 : fmonths.indexOf(startDVal[1]), fdays.indexOf(startDVal[2]) == -1 ? 0 : fdays.indexOf(startDVal[2]), 0, tyears.indexOf(endDVal[0]) == -1 ? 0 : tyears.indexOf(endDVal[0]), tmonths.indexOf(endDVal[1]) == -1 ? 0 : tmonths.indexOf(endDVal[1]), tdays.indexOf(endDVal[2]) == -1 ? 0 : tdays.indexOf(endDVal[2])];
      return {
        fyears: fyears,
        fmonths: fmonths,
        fdays: fdays,
        tyears: tyears,
        tmonths: tmonths,
        tdays: tdays,
        defaultVal: defaultVal
      };
    },
    initStartDays: function initStartDays(year, month) {
      var totalDays = new Date(year, month, 0).getDate();
      var dates = [];
      for (var d = 1; d <= totalDays; d++) {
        dates.push(forMatNum(d));
      }
      ;
      return dates;
    },
    initEndYears: function initEndYears(curYear, startYear, endYear) {
      var years = [];
      for (var y = curYear; y <= endYear; y++) {
        years.push(forMatNum(y));
      }
      ;
      return years;
    },
    initEndMonths: function initEndMonths(curMonth) {
      var months = [];
      for (var m = curMonth * 1; m <= 12; m++) {
        months.push(forMatNum(m));
      }
      ;
      return months;
    },
    initEndDays: function initEndDays(curYear, curMonth, curDate, tYear, tMonth) {
      var totalDays = new Date(curYear, curMonth, 0).getDate();
      var days = [];
      for (var d = curDate * 1; d <= totalDays; d++) {
        days.push(forMatNum(d));
      }
      ;
      return days;
    },
    initToMonths: function initToMonths(curYear, curMonth, curDate, tYear) {
      var aDate = new Date(curYear, curMonth, curDate).getTime();
      var bDate = new Date(tYear, curMonth, curDate).getTime();
      var months = [];
      if (bDate - aDate > 0) {
        console.log(1);
        for (var m = 1; m <= 12; m++) {
          months.push(forMatNum(m));
        }
        ;
      } else {
        for (var _m8 = curMonth * 1; _m8 <= 12; _m8++) {
          months.push(forMatNum(_m8));
        }
        ;
      }
      return months;
    },
    initToDays: function initToDays(curYear, curMonth, curDate, tYear, tMonth) {
      var aDate = new Date(curYear, curMonth, curDate).getTime();
      var bDate = new Date(tYear, tMonth, curDate).getTime();
      var totalDays = new Date(tYear, tMonth, 0).getDate();
      var days = [];
      if (bDate - aDate > 0) {
        for (var d = 1; d <= totalDays; d++) {
          days.push(forMatNum(d));
        }
        ;
      } else {
        for (var _d6 = curDate * 1; _d6 <= totalDays; _d6++) {
          days.push(forMatNum(_d6));
        }
        ;
      }
      return days;
    }
  }
};
var _default = initPicker;
exports.default = _default;

/***/ }),

/***/ 660:
/*!**************************************************************************!*\
  !*** D:/project/前端/front/front/components/uni-ui/lib/uni-icons/icons.js ***!
  \**************************************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;
var _default = {
  'contact': "\uE100",
  'person': "\uE101",
  'personadd': "\uE102",
  'contact-filled': "\uE130",
  'person-filled': "\uE131",
  'personadd-filled': "\uE132",
  'phone': "\uE200",
  'email': "\uE201",
  'chatbubble': "\uE202",
  'chatboxes': "\uE203",
  'phone-filled': "\uE230",
  'email-filled': "\uE231",
  'chatbubble-filled': "\uE232",
  'chatboxes-filled': "\uE233",
  'weibo': "\uE260",
  'weixin': "\uE261",
  'pengyouquan': "\uE262",
  'chat': "\uE263",
  'qq': "\uE264",
  'videocam': "\uE300",
  'camera': "\uE301",
  'mic': "\uE302",
  'location': "\uE303",
  'mic-filled': "\uE332",
  'speech': "\uE332",
  'location-filled': "\uE333",
  'micoff': "\uE360",
  'image': "\uE363",
  'map': "\uE364",
  'compose': "\uE400",
  'trash': "\uE401",
  'upload': "\uE402",
  'download': "\uE403",
  'close': "\uE404",
  'redo': "\uE405",
  'undo': "\uE406",
  'refresh': "\uE407",
  'star': "\uE408",
  'plus': "\uE409",
  'minus': "\uE410",
  'circle': "\uE411",
  'checkbox': "\uE411",
  'close-filled': "\uE434",
  'clear': "\uE434",
  'refresh-filled': "\uE437",
  'star-filled': "\uE438",
  'plus-filled': "\uE439",
  'minus-filled': "\uE440",
  'circle-filled': "\uE441",
  'checkbox-filled': "\uE442",
  'closeempty': "\uE460",
  'refreshempty': "\uE461",
  'reload': "\uE462",
  'starhalf': "\uE463",
  'spinner': "\uE464",
  'spinner-cycle': "\uE465",
  'search': "\uE466",
  'plusempty': "\uE468",
  'forward': "\uE470",
  'back': "\uE471",
  'left-nav': "\uE471",
  'checkmarkempty': "\uE472",
  'home': "\uE500",
  'navigate': "\uE501",
  'gear': "\uE502",
  'paperplane': "\uE503",
  'info': "\uE504",
  'help': "\uE505",
  'locked': "\uE506",
  'more': "\uE507",
  'flag': "\uE508",
  'home-filled': "\uE530",
  'gear-filled': "\uE532",
  'info-filled': "\uE534",
  'help-filled': "\uE535",
  'more-filled': "\uE537",
  'settings': "\uE560",
  'list': "\uE562",
  'bars': "\uE563",
  'loop': "\uE565",
  'paperclip': "\uE567",
  'eye': "\uE568",
  'arrowup': "\uE580",
  'arrowdown': "\uE581",
  'arrowleft': "\uE582",
  'arrowright': "\uE583",
  'arrowthinup': "\uE584",
  'arrowthindown': "\uE585",
  'arrowthinleft': "\uE586",
  'arrowthinright': "\uE587",
  'pulldown': "\uE588",
  'closefill': "\uE589",
  'sound': "\uE590",
  'scan': "\uE612"
};
exports.default = _default;

/***/ }),

/***/ 7:
/*!***************************************************************************!*\
  !*** ./node_modules/@babel/runtime/helpers/unsupportedIterableToArray.js ***!
  \***************************************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

var arrayLikeToArray = __webpack_require__(/*! ./arrayLikeToArray.js */ 8);
function _unsupportedIterableToArray(o, minLen) {
  if (!o) return;
  if (typeof o === "string") return arrayLikeToArray(o, minLen);
  var n = Object.prototype.toString.call(o).slice(8, -1);
  if (n === "Object" && o.constructor) n = o.constructor.name;
  if (n === "Map" || n === "Set") return Array.from(o);
  if (n === "Arguments" || /^(?:Ui|I)nt(?:8|16|32)(?:Clamped)?Array$/.test(n)) return arrayLikeToArray(o, minLen);
}
module.exports = _unsupportedIterableToArray, module.exports.__esModule = true, module.exports["default"] = module.exports;

/***/ }),

/***/ 8:
/*!*****************************************************************!*\
  !*** ./node_modules/@babel/runtime/helpers/arrayLikeToArray.js ***!
  \*****************************************************************/
/*! no static exports found */
/***/ (function(module, exports) {

function _arrayLikeToArray(arr, len) {
  if (len == null || len > arr.length) len = arr.length;
  for (var i = 0, arr2 = new Array(len); i < len; i++) {
    arr2[i] = arr[i];
  }
  return arr2;
}
module.exports = _arrayLikeToArray, module.exports.__esModule = true, module.exports["default"] = module.exports;

/***/ }),

/***/ 9:
/*!****************************************************************!*\
  !*** ./node_modules/@babel/runtime/helpers/nonIterableRest.js ***!
  \****************************************************************/
/*! no static exports found */
/***/ (function(module, exports) {

function _nonIterableRest() {
  throw new TypeError("Invalid attempt to destructure non-iterable instance.\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method.");
}
module.exports = _nonIterableRest, module.exports.__esModule = true, module.exports["default"] = module.exports;

/***/ })

}]);
//# sourceMappingURL=../../.sourcemap/mp-weixin/common/vendor.js.map