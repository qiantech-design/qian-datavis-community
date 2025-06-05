(function(global2, factory) {
  typeof exports === "object" && typeof module !== "undefined" ? factory(exports) : typeof define === "function" && define.amd ? define(["exports"], factory) : (global2 = typeof globalThis !== "undefined" ? globalThis : global2 || self, factory(global2.datavisCore = {}));
})(this, function(exports2) {
  "use strict";var __defProp = Object.defineProperty;
var __defProps = Object.defineProperties;
var __getOwnPropDescs = Object.getOwnPropertyDescriptors;
var __getOwnPropSymbols = Object.getOwnPropertySymbols;
var __hasOwnProp = Object.prototype.hasOwnProperty;
var __propIsEnum = Object.prototype.propertyIsEnumerable;
var __pow = Math.pow;
var __defNormalProp = (obj, key, value) => key in obj ? __defProp(obj, key, { enumerable: true, configurable: true, writable: true, value }) : obj[key] = value;
var __spreadValues = (a, b) => {
  for (var prop in b || (b = {}))
    if (__hasOwnProp.call(b, prop))
      __defNormalProp(a, prop, b[prop]);
  if (__getOwnPropSymbols)
    for (var prop of __getOwnPropSymbols(b)) {
      if (__propIsEnum.call(b, prop))
        __defNormalProp(a, prop, b[prop]);
    }
  return a;
};
var __spreadProps = (a, b) => __defProps(a, __getOwnPropDescs(b));
var __async = (__this, __arguments, generator) => {
  return new Promise((resolve, reject) => {
    var fulfilled = (value) => {
      try {
        step(generator.next(value));
      } catch (e) {
        reject(e);
      }
    };
    var rejected = (value) => {
      try {
        step(generator.throw(value));
      } catch (e) {
        reject(e);
      }
    };
    var step = (x) => x.done ? resolve(x.value) : Promise.resolve(x.value).then(fulfilled, rejected);
    step((generator = generator.apply(__this, __arguments)).next());
  });
};

  function _0x39ca4c(n) {
    return { all: n = n || /* @__PURE__ */ new Map(), on: function(t, e) {
      var i = n.get(t);
      i ? i.push(e) : n.set(t, [e]);
    }, off: function(t, e) {
      var i = n.get(t);
      i && (e ? i.splice(i.indexOf(e) >>> 0, 1) : n.set(t, []));
    }, emit: function(t, e) {
      var i = n.get(t);
      i && i.slice().map(function(n2) {
        n2(e);
      }), (i = n.get("*")) && i.slice().map(function(n2) {
        n2(t, e);
      });
    } };
  }
  let random = (bytes) => crypto.getRandomValues(new Uint8Array(bytes));
  let customRandom = (alphabet, defaultSize, getRandom) => {
    let mask = (2 << Math.log(alphabet.length - 1) / Math.LN2) - 1;
    let step = -~(1.6 * mask * defaultSize / alphabet.length);
    return (size = defaultSize) => {
      let id = "";
      while (true) {
        let bytes = getRandom(step);
        let j = step;
        while (j--) {
          id += alphabet[bytes[j] & mask] || "";
          if (id.length === size)
            return id;
        }
      }
    };
  };
  let customAlphabet = (alphabet, size = 21) => customRandom(alphabet, size, random);
  var freeGlobal = typeof global == "object" && global && global.Object === Object && global;
  var freeSelf = typeof self == "object" && self && self.Object === Object && self;
  var root = freeGlobal || freeSelf || Function("return this")();
  var Symbol$1 = root.Symbol;
  var objectProto$g = Object.prototype;
  var hasOwnProperty$d = objectProto$g.hasOwnProperty;
  var nativeObjectToString$1 = objectProto$g.toString;
  var symToStringTag$1 = Symbol$1 ? Symbol$1.toStringTag : void 0;
  function getRawTag(value) {
    var isOwn = hasOwnProperty$d.call(value, symToStringTag$1), tag = value[symToStringTag$1];
    try {
      value[symToStringTag$1] = void 0;
      var unmasked = true;
    } catch (e) {
    }
    var result = nativeObjectToString$1.call(value);
    if (unmasked) {
      if (isOwn) {
        value[symToStringTag$1] = tag;
      } else {
        delete value[symToStringTag$1];
      }
    }
    return result;
  }
  var objectProto$f = Object.prototype;
  var nativeObjectToString = objectProto$f.toString;
  function objectToString(value) {
    return nativeObjectToString.call(value);
  }
  var nullTag = "[object Null]", undefinedTag = "[object Undefined]";
  var symToStringTag = Symbol$1 ? Symbol$1.toStringTag : void 0;
  function baseGetTag(value) {
    if (value == null) {
      return value === void 0 ? undefinedTag : nullTag;
    }
    return symToStringTag && symToStringTag in Object(value) ? getRawTag(value) : objectToString(value);
  }
  function isObjectLike(value) {
    return value != null && typeof value == "object";
  }
  var symbolTag$3 = "[object Symbol]";
  function isSymbol(value) {
    return typeof value == "symbol" || isObjectLike(value) && baseGetTag(value) == symbolTag$3;
  }
  function arrayMap(array, iteratee) {
    var index = -1, length = array == null ? 0 : array.length, result = Array(length);
    while (++index < length) {
      result[index] = iteratee(array[index], index, array);
    }
    return result;
  }
  var isArray = Array.isArray;
  var INFINITY$2 = 1 / 0;
  var symbolProto$2 = Symbol$1 ? Symbol$1.prototype : void 0, symbolToString = symbolProto$2 ? symbolProto$2.toString : void 0;
  function baseToString(value) {
    if (typeof value == "string") {
      return value;
    }
    if (isArray(value)) {
      return arrayMap(value, baseToString) + "";
    }
    if (isSymbol(value)) {
      return symbolToString ? symbolToString.call(value) : "";
    }
    var result = value + "";
    return result == "0" && 1 / value == -INFINITY$2 ? "-0" : result;
  }
  var reWhitespace = /\s/;
  function trimmedEndIndex(string) {
    var index = string.length;
    while (index-- && reWhitespace.test(string.charAt(index))) {
    }
    return index;
  }
  var reTrimStart = /^\s+/;
  function baseTrim(string) {
    return string ? string.slice(0, trimmedEndIndex(string) + 1).replace(reTrimStart, "") : string;
  }
  function isObject(value) {
    var type = typeof value;
    return value != null && (type == "object" || type == "function");
  }
  var NAN = 0 / 0;
  var reIsBadHex = /^[-+]0x[0-9a-f]+$/i;
  var reIsBinary = /^0b[01]+$/i;
  var reIsOctal = /^0o[0-7]+$/i;
  var freeParseInt = parseInt;
  function toNumber(value) {
    if (typeof value == "number") {
      return value;
    }
    if (isSymbol(value)) {
      return NAN;
    }
    if (isObject(value)) {
      var other = typeof value.valueOf == "function" ? value.valueOf() : value;
      value = isObject(other) ? other + "" : other;
    }
    if (typeof value != "string") {
      return value === 0 ? value : +value;
    }
    value = baseTrim(value);
    var isBinary = reIsBinary.test(value);
    return isBinary || reIsOctal.test(value) ? freeParseInt(value.slice(2), isBinary ? 2 : 8) : reIsBadHex.test(value) ? NAN : +value;
  }
  var INFINITY$1 = 1 / 0, MAX_INTEGER = 17976931348623157e292;
  function toFinite(value) {
    if (!value) {
      return value === 0 ? value : 0;
    }
    value = toNumber(value);
    if (value === INFINITY$1 || value === -INFINITY$1) {
      var sign = value < 0 ? -1 : 1;
      return sign * MAX_INTEGER;
    }
    return value === value ? value : 0;
  }
  function toInteger(value) {
    var result = toFinite(value), remainder = result % 1;
    return result === result ? remainder ? result - remainder : result : 0;
  }
  function identity(value) {
    return value;
  }
  var asyncTag = "[object AsyncFunction]", funcTag$2 = "[object Function]", genTag$1 = "[object GeneratorFunction]", proxyTag = "[object Proxy]";
  function isFunction(value) {
    if (!isObject(value)) {
      return false;
    }
    var tag = baseGetTag(value);
    return tag == funcTag$2 || tag == genTag$1 || tag == asyncTag || tag == proxyTag;
  }
  var coreJsData = root["__core-js_shared__"];
  var maskSrcKey = function() {
    var uid = /[^.]+$/.exec(coreJsData && coreJsData.keys && coreJsData.keys.IE_PROTO || "");
    return uid ? "Symbol(src)_1." + uid : "";
  }();
  function isMasked(func) {
    return !!maskSrcKey && maskSrcKey in func;
  }
  var funcProto$2 = Function.prototype;
  var funcToString$2 = funcProto$2.toString;
  function toSource(func) {
    if (func != null) {
      try {
        return funcToString$2.call(func);
      } catch (e) {
      }
      try {
        return func + "";
      } catch (e) {
      }
    }
    return "";
  }
  var reRegExpChar = /[\\^$.*+?()[\]{}|]/g;
  var reIsHostCtor = /^\[object .+?Constructor\]$/;
  var funcProto$1 = Function.prototype, objectProto$e = Object.prototype;
  var funcToString$1 = funcProto$1.toString;
  var hasOwnProperty$c = objectProto$e.hasOwnProperty;
  var reIsNative = RegExp(
    "^" + funcToString$1.call(hasOwnProperty$c).replace(reRegExpChar, "\\$&").replace(/hasOwnProperty|(function).*?(?=\\\()| for .+?(?=\\\])/g, "$1.*?") + "$"
  );
  function baseIsNative(value) {
    if (!isObject(value) || isMasked(value)) {
      return false;
    }
    var pattern = isFunction(value) ? reIsNative : reIsHostCtor;
    return pattern.test(toSource(value));
  }
  function getValue(object, key) {
    return object == null ? void 0 : object[key];
  }
  function getNative(object, key) {
    var value = getValue(object, key);
    return baseIsNative(value) ? value : void 0;
  }
  var WeakMap = getNative(root, "WeakMap");
  var objectCreate = Object.create;
  var baseCreate = /* @__PURE__ */ function() {
    function object() {
    }
    return function(proto) {
      if (!isObject(proto)) {
        return {};
      }
      if (objectCreate) {
        return objectCreate(proto);
      }
      object.prototype = proto;
      var result = new object();
      object.prototype = void 0;
      return result;
    };
  }();
  function apply(func, thisArg, args) {
    switch (args.length) {
      case 0:
        return func.call(thisArg);
      case 1:
        return func.call(thisArg, args[0]);
      case 2:
        return func.call(thisArg, args[0], args[1]);
      case 3:
        return func.call(thisArg, args[0], args[1], args[2]);
    }
    return func.apply(thisArg, args);
  }
  function copyArray(source, array) {
    var index = -1, length = source.length;
    array || (array = Array(length));
    while (++index < length) {
      array[index] = source[index];
    }
    return array;
  }
  var HOT_COUNT = 800, HOT_SPAN = 16;
  var nativeNow = Date.now;
  function shortOut(func) {
    var count = 0, lastCalled = 0;
    return function() {
      var stamp = nativeNow(), remaining = HOT_SPAN - (stamp - lastCalled);
      lastCalled = stamp;
      if (remaining > 0) {
        if (++count >= HOT_COUNT) {
          return arguments[0];
        }
      } else {
        count = 0;
      }
      return func.apply(void 0, arguments);
    };
  }
  function constant(value) {
    return function() {
      return value;
    };
  }
  var defineProperty = function() {
    try {
      var func = getNative(Object, "defineProperty");
      func({}, "", {});
      return func;
    } catch (e) {
    }
  }();
  var baseSetToString = !defineProperty ? identity : function(func, string) {
    return defineProperty(func, "toString", {
      "configurable": true,
      "enumerable": false,
      "value": constant(string),
      "writable": true
    });
  };
  const baseSetToString$1 = baseSetToString;
  var setToString = shortOut(baseSetToString$1);
  function arrayEach(array, iteratee) {
    var index = -1, length = array == null ? 0 : array.length;
    while (++index < length) {
      if (iteratee(array[index], index, array) === false) {
        break;
      }
    }
    return array;
  }
  function baseFindIndex(array, predicate, fromIndex, fromRight) {
    var length = array.length, index = fromIndex + (fromRight ? 1 : -1);
    while (fromRight ? index-- : ++index < length) {
      if (predicate(array[index], index, array)) {
        return index;
      }
    }
    return -1;
  }
  var MAX_SAFE_INTEGER$1 = 9007199254740991;
  var reIsUint = /^(?:0|[1-9]\d*)$/;
  function isIndex(value, length) {
    var type = typeof value;
    length = length == null ? MAX_SAFE_INTEGER$1 : length;
    return !!length && (type == "number" || type != "symbol" && reIsUint.test(value)) && (value > -1 && value % 1 == 0 && value < length);
  }
  function baseAssignValue(object, key, value) {
    if (key == "__proto__" && defineProperty) {
      defineProperty(object, key, {
        "configurable": true,
        "enumerable": true,
        "value": value,
        "writable": true
      });
    } else {
      object[key] = value;
    }
  }
  function eq(value, other) {
    return value === other || value !== value && other !== other;
  }
  var objectProto$d = Object.prototype;
  var hasOwnProperty$b = objectProto$d.hasOwnProperty;
  function assignValue(object, key, value) {
    var objValue = object[key];
    if (!(hasOwnProperty$b.call(object, key) && eq(objValue, value)) || value === void 0 && !(key in object)) {
      baseAssignValue(object, key, value);
    }
  }
  function copyObject(source, props, object, customizer) {
    var isNew = !object;
    object || (object = {});
    var index = -1, length = props.length;
    while (++index < length) {
      var key = props[index];
      var newValue = customizer ? customizer(object[key], source[key], key, object, source) : void 0;
      if (newValue === void 0) {
        newValue = source[key];
      }
      if (isNew) {
        baseAssignValue(object, key, newValue);
      } else {
        assignValue(object, key, newValue);
      }
    }
    return object;
  }
  var nativeMax$1 = Math.max;
  function overRest(func, start, transform2) {
    start = nativeMax$1(start === void 0 ? func.length - 1 : start, 0);
    return function() {
      var args = arguments, index = -1, length = nativeMax$1(args.length - start, 0), array = Array(length);
      while (++index < length) {
        array[index] = args[start + index];
      }
      index = -1;
      var otherArgs = Array(start + 1);
      while (++index < start) {
        otherArgs[index] = args[index];
      }
      otherArgs[start] = transform2(array);
      return apply(func, this, otherArgs);
    };
  }
  function baseRest(func, start) {
    return setToString(overRest(func, start, identity), func + "");
  }
  var MAX_SAFE_INTEGER = 9007199254740991;
  function isLength(value) {
    return typeof value == "number" && value > -1 && value % 1 == 0 && value <= MAX_SAFE_INTEGER;
  }
  function isArrayLike(value) {
    return value != null && isLength(value.length) && !isFunction(value);
  }
  function isIterateeCall(value, index, object) {
    if (!isObject(object)) {
      return false;
    }
    var type = typeof index;
    if (type == "number" ? isArrayLike(object) && isIndex(index, object.length) : type == "string" && index in object) {
      return eq(object[index], value);
    }
    return false;
  }
  function createAssigner(assigner) {
    return baseRest(function(object, sources) {
      var index = -1, length = sources.length, customizer = length > 1 ? sources[length - 1] : void 0, guard = length > 2 ? sources[2] : void 0;
      customizer = assigner.length > 3 && typeof customizer == "function" ? (length--, customizer) : void 0;
      if (guard && isIterateeCall(sources[0], sources[1], guard)) {
        customizer = length < 3 ? void 0 : customizer;
        length = 1;
      }
      object = Object(object);
      while (++index < length) {
        var source = sources[index];
        if (source) {
          assigner(object, source, index, customizer);
        }
      }
      return object;
    });
  }
  var objectProto$c = Object.prototype;
  function isPrototype(value) {
    var Ctor = value && value.constructor, proto = typeof Ctor == "function" && Ctor.prototype || objectProto$c;
    return value === proto;
  }
  function baseTimes(n, iteratee) {
    var index = -1, result = Array(n);
    while (++index < n) {
      result[index] = iteratee(index);
    }
    return result;
  }
  var argsTag$3 = "[object Arguments]";
  function baseIsArguments(value) {
    return isObjectLike(value) && baseGetTag(value) == argsTag$3;
  }
  var objectProto$b = Object.prototype;
  var hasOwnProperty$a = objectProto$b.hasOwnProperty;
  var propertyIsEnumerable$1 = objectProto$b.propertyIsEnumerable;
  var isArguments = baseIsArguments(/* @__PURE__ */ function() {
    return arguments;
  }()) ? baseIsArguments : function(value) {
    return isObjectLike(value) && hasOwnProperty$a.call(value, "callee") && !propertyIsEnumerable$1.call(value, "callee");
  };
  function stubFalse() {
    return false;
  }
  var freeExports$2 = typeof exports2 == "object" && exports2 && !exports2.nodeType && exports2;
  var freeModule$2 = freeExports$2 && typeof module == "object" && module && !module.nodeType && module;
  var moduleExports$2 = freeModule$2 && freeModule$2.exports === freeExports$2;
  var Buffer$1 = moduleExports$2 ? root.Buffer : void 0;
  var nativeIsBuffer = Buffer$1 ? Buffer$1.isBuffer : void 0;
  var isBuffer = nativeIsBuffer || stubFalse;
  var argsTag$2 = "[object Arguments]", arrayTag$2 = "[object Array]", boolTag$3 = "[object Boolean]", dateTag$3 = "[object Date]", errorTag$2 = "[object Error]", funcTag$1 = "[object Function]", mapTag$5 = "[object Map]", numberTag$3 = "[object Number]", objectTag$4 = "[object Object]", regexpTag$3 = "[object RegExp]", setTag$5 = "[object Set]", stringTag$3 = "[object String]", weakMapTag$2 = "[object WeakMap]";
  var arrayBufferTag$3 = "[object ArrayBuffer]", dataViewTag$4 = "[object DataView]", float32Tag$2 = "[object Float32Array]", float64Tag$2 = "[object Float64Array]", int8Tag$2 = "[object Int8Array]", int16Tag$2 = "[object Int16Array]", int32Tag$2 = "[object Int32Array]", uint8Tag$2 = "[object Uint8Array]", uint8ClampedTag$2 = "[object Uint8ClampedArray]", uint16Tag$2 = "[object Uint16Array]", uint32Tag$2 = "[object Uint32Array]";
  var typedArrayTags = {};
  typedArrayTags[float32Tag$2] = typedArrayTags[float64Tag$2] = typedArrayTags[int8Tag$2] = typedArrayTags[int16Tag$2] = typedArrayTags[int32Tag$2] = typedArrayTags[uint8Tag$2] = typedArrayTags[uint8ClampedTag$2] = typedArrayTags[uint16Tag$2] = typedArrayTags[uint32Tag$2] = true;
  typedArrayTags[argsTag$2] = typedArrayTags[arrayTag$2] = typedArrayTags[arrayBufferTag$3] = typedArrayTags[boolTag$3] = typedArrayTags[dataViewTag$4] = typedArrayTags[dateTag$3] = typedArrayTags[errorTag$2] = typedArrayTags[funcTag$1] = typedArrayTags[mapTag$5] = typedArrayTags[numberTag$3] = typedArrayTags[objectTag$4] = typedArrayTags[regexpTag$3] = typedArrayTags[setTag$5] = typedArrayTags[stringTag$3] = typedArrayTags[weakMapTag$2] = false;
  function baseIsTypedArray(value) {
    return isObjectLike(value) && isLength(value.length) && !!typedArrayTags[baseGetTag(value)];
  }
  function baseUnary(func) {
    return function(value) {
      return func(value);
    };
  }
  var freeExports$1 = typeof exports2 == "object" && exports2 && !exports2.nodeType && exports2;
  var freeModule$1 = freeExports$1 && typeof module == "object" && module && !module.nodeType && module;
  var moduleExports$1 = freeModule$1 && freeModule$1.exports === freeExports$1;
  var freeProcess = moduleExports$1 && freeGlobal.process;
  var nodeUtil = function() {
    try {
      var types = freeModule$1 && freeModule$1.require && freeModule$1.require("util").types;
      if (types) {
        return types;
      }
      return freeProcess && freeProcess.binding && freeProcess.binding("util");
    } catch (e) {
    }
  }();
  var nodeIsTypedArray = nodeUtil && nodeUtil.isTypedArray;
  var isTypedArray = nodeIsTypedArray ? baseUnary(nodeIsTypedArray) : baseIsTypedArray;
  var objectProto$a = Object.prototype;
  var hasOwnProperty$9 = objectProto$a.hasOwnProperty;
  function arrayLikeKeys(value, inherited) {
    var isArr = isArray(value), isArg = !isArr && isArguments(value), isBuff = !isArr && !isArg && isBuffer(value), isType = !isArr && !isArg && !isBuff && isTypedArray(value), skipIndexes = isArr || isArg || isBuff || isType, result = skipIndexes ? baseTimes(value.length, String) : [], length = result.length;
    for (var key in value) {
      if ((inherited || hasOwnProperty$9.call(value, key)) && !(skipIndexes && // Safari 9 has enumerable `arguments.length` in strict mode.
      (key == "length" || // Node.js 0.10 has enumerable non-index properties on buffers.
      isBuff && (key == "offset" || key == "parent") || // PhantomJS 2 has enumerable non-index properties on typed arrays.
      isType && (key == "buffer" || key == "byteLength" || key == "byteOffset") || // Skip index properties.
      isIndex(key, length)))) {
        result.push(key);
      }
    }
    return result;
  }
  function overArg(func, transform2) {
    return function(arg) {
      return func(transform2(arg));
    };
  }
  var nativeKeys = overArg(Object.keys, Object);
  var objectProto$9 = Object.prototype;
  var hasOwnProperty$8 = objectProto$9.hasOwnProperty;
  function baseKeys(object) {
    if (!isPrototype(object)) {
      return nativeKeys(object);
    }
    var result = [];
    for (var key in Object(object)) {
      if (hasOwnProperty$8.call(object, key) && key != "constructor") {
        result.push(key);
      }
    }
    return result;
  }
  function keys(object) {
    return isArrayLike(object) ? arrayLikeKeys(object) : baseKeys(object);
  }
  function nativeKeysIn(object) {
    var result = [];
    if (object != null) {
      for (var key in Object(object)) {
        result.push(key);
      }
    }
    return result;
  }
  var objectProto$8 = Object.prototype;
  var hasOwnProperty$7 = objectProto$8.hasOwnProperty;
  function baseKeysIn(object) {
    if (!isObject(object)) {
      return nativeKeysIn(object);
    }
    var isProto = isPrototype(object), result = [];
    for (var key in object) {
      if (!(key == "constructor" && (isProto || !hasOwnProperty$7.call(object, key)))) {
        result.push(key);
      }
    }
    return result;
  }
  function keysIn(object) {
    return isArrayLike(object) ? arrayLikeKeys(object, true) : baseKeysIn(object);
  }
  var reIsDeepProp = /\.|\[(?:[^[\]]*|(["'])(?:(?!\1)[^\\]|\\.)*?\1)\]/, reIsPlainProp = /^\w*$/;
  function isKey(value, object) {
    if (isArray(value)) {
      return false;
    }
    var type = typeof value;
    if (type == "number" || type == "symbol" || type == "boolean" || value == null || isSymbol(value)) {
      return true;
    }
    return reIsPlainProp.test(value) || !reIsDeepProp.test(value) || object != null && value in Object(object);
  }
  var nativeCreate = getNative(Object, "create");
  function hashClear() {
    this.__data__ = nativeCreate ? nativeCreate(null) : {};
    this.size = 0;
  }
  function hashDelete(key) {
    var result = this.has(key) && delete this.__data__[key];
    this.size -= result ? 1 : 0;
    return result;
  }
  var HASH_UNDEFINED$2 = "__lodash_hash_undefined__";
  var objectProto$7 = Object.prototype;
  var hasOwnProperty$6 = objectProto$7.hasOwnProperty;
  function hashGet(key) {
    var data = this.__data__;
    if (nativeCreate) {
      var result = data[key];
      return result === HASH_UNDEFINED$2 ? void 0 : result;
    }
    return hasOwnProperty$6.call(data, key) ? data[key] : void 0;
  }
  var objectProto$6 = Object.prototype;
  var hasOwnProperty$5 = objectProto$6.hasOwnProperty;
  function hashHas(key) {
    var data = this.__data__;
    return nativeCreate ? data[key] !== void 0 : hasOwnProperty$5.call(data, key);
  }
  var HASH_UNDEFINED$1 = "__lodash_hash_undefined__";
  function hashSet(key, value) {
    var data = this.__data__;
    this.size += this.has(key) ? 0 : 1;
    data[key] = nativeCreate && value === void 0 ? HASH_UNDEFINED$1 : value;
    return this;
  }
  function Hash(entries) {
    var index = -1, length = entries == null ? 0 : entries.length;
    this.clear();
    while (++index < length) {
      var entry = entries[index];
      this.set(entry[0], entry[1]);
    }
  }
  Hash.prototype.clear = hashClear;
  Hash.prototype["delete"] = hashDelete;
  Hash.prototype.get = hashGet;
  Hash.prototype.has = hashHas;
  Hash.prototype.set = hashSet;
  function listCacheClear() {
    this.__data__ = [];
    this.size = 0;
  }
  function assocIndexOf(array, key) {
    var length = array.length;
    while (length--) {
      if (eq(array[length][0], key)) {
        return length;
      }
    }
    return -1;
  }
  var arrayProto = Array.prototype;
  var splice = arrayProto.splice;
  function listCacheDelete(key) {
    var data = this.__data__, index = assocIndexOf(data, key);
    if (index < 0) {
      return false;
    }
    var lastIndex = data.length - 1;
    if (index == lastIndex) {
      data.pop();
    } else {
      splice.call(data, index, 1);
    }
    --this.size;
    return true;
  }
  function listCacheGet(key) {
    var data = this.__data__, index = assocIndexOf(data, key);
    return index < 0 ? void 0 : data[index][1];
  }
  function listCacheHas(key) {
    return assocIndexOf(this.__data__, key) > -1;
  }
  function listCacheSet(key, value) {
    var data = this.__data__, index = assocIndexOf(data, key);
    if (index < 0) {
      ++this.size;
      data.push([key, value]);
    } else {
      data[index][1] = value;
    }
    return this;
  }
  function ListCache(entries) {
    var index = -1, length = entries == null ? 0 : entries.length;
    this.clear();
    while (++index < length) {
      var entry = entries[index];
      this.set(entry[0], entry[1]);
    }
  }
  ListCache.prototype.clear = listCacheClear;
  ListCache.prototype["delete"] = listCacheDelete;
  ListCache.prototype.get = listCacheGet;
  ListCache.prototype.has = listCacheHas;
  ListCache.prototype.set = listCacheSet;
  var Map$1 = getNative(root, "Map");
  function mapCacheClear() {
    this.size = 0;
    this.__data__ = {
      "hash": new Hash(),
      "map": new (Map$1 || ListCache)(),
      "string": new Hash()
    };
  }
  function isKeyable(value) {
    var type = typeof value;
    return type == "string" || type == "number" || type == "symbol" || type == "boolean" ? value !== "__proto__" : value === null;
  }
  function getMapData(map, key) {
    var data = map.__data__;
    return isKeyable(key) ? data[typeof key == "string" ? "string" : "hash"] : data.map;
  }
  function mapCacheDelete(key) {
    var result = getMapData(this, key)["delete"](key);
    this.size -= result ? 1 : 0;
    return result;
  }
  function mapCacheGet(key) {
    return getMapData(this, key).get(key);
  }
  function mapCacheHas(key) {
    return getMapData(this, key).has(key);
  }
  function mapCacheSet(key, value) {
    var data = getMapData(this, key), size = data.size;
    data.set(key, value);
    this.size += data.size == size ? 0 : 1;
    return this;
  }
  function MapCache(entries) {
    var index = -1, length = entries == null ? 0 : entries.length;
    this.clear();
    while (++index < length) {
      var entry = entries[index];
      this.set(entry[0], entry[1]);
    }
  }
  MapCache.prototype.clear = mapCacheClear;
  MapCache.prototype["delete"] = mapCacheDelete;
  MapCache.prototype.get = mapCacheGet;
  MapCache.prototype.has = mapCacheHas;
  MapCache.prototype.set = mapCacheSet;
  var FUNC_ERROR_TEXT = "Expected a function";
  function memoize(func, resolver) {
    if (typeof func != "function" || resolver != null && typeof resolver != "function") {
      throw new TypeError(FUNC_ERROR_TEXT);
    }
    var memoized = function() {
      var args = arguments, key = resolver ? resolver.apply(this, args) : args[0], cache = memoized.cache;
      if (cache.has(key)) {
        return cache.get(key);
      }
      var result = func.apply(this, args);
      memoized.cache = cache.set(key, result) || cache;
      return result;
    };
    memoized.cache = new (memoize.Cache || MapCache)();
    return memoized;
  }
  memoize.Cache = MapCache;
  var MAX_MEMOIZE_SIZE = 500;
  function memoizeCapped(func) {
    var result = memoize(func, function(key) {
      if (cache.size === MAX_MEMOIZE_SIZE) {
        cache.clear();
      }
      return key;
    });
    var cache = result.cache;
    return result;
  }
  var rePropName = /[^.[\]]+|\[(?:(-?\d+(?:\.\d+)?)|(["'])((?:(?!\2)[^\\]|\\.)*?)\2)\]|(?=(?:\.|\[\])(?:\.|\[\]|$))/g;
  var reEscapeChar = /\\(\\)?/g;
  var stringToPath = memoizeCapped(function(string) {
    var result = [];
    if (string.charCodeAt(0) === 46) {
      result.push("");
    }
    string.replace(rePropName, function(match, number, quote, subString) {
      result.push(quote ? subString.replace(reEscapeChar, "$1") : number || match);
    });
    return result;
  });
  function toString(value) {
    return value == null ? "" : baseToString(value);
  }
  function castPath(value, object) {
    if (isArray(value)) {
      return value;
    }
    return isKey(value, object) ? [value] : stringToPath(toString(value));
  }
  var INFINITY = 1 / 0;
  function toKey(value) {
    if (typeof value == "string" || isSymbol(value)) {
      return value;
    }
    var result = value + "";
    return result == "0" && 1 / value == -INFINITY ? "-0" : result;
  }
  function baseGet(object, path) {
    path = castPath(path, object);
    var index = 0, length = path.length;
    while (object != null && index < length) {
      object = object[toKey(path[index++])];
    }
    return index && index == length ? object : void 0;
  }
  function get(object, path, defaultValue) {
    var result = object == null ? void 0 : baseGet(object, path);
    return result === void 0 ? defaultValue : result;
  }
  function arrayPush(array, values) {
    var index = -1, length = values.length, offset = array.length;
    while (++index < length) {
      array[offset + index] = values[index];
    }
    return array;
  }
  var spreadableSymbol = Symbol$1 ? Symbol$1.isConcatSpreadable : void 0;
  function isFlattenable(value) {
    return isArray(value) || isArguments(value) || !!(spreadableSymbol && value && value[spreadableSymbol]);
  }
  function baseFlatten(array, depth, predicate, isStrict, result) {
    var index = -1, length = array.length;
    predicate || (predicate = isFlattenable);
    result || (result = []);
    while (++index < length) {
      var value = array[index];
      if (depth > 0 && predicate(value)) {
        if (depth > 1) {
          baseFlatten(value, depth - 1, predicate, isStrict, result);
        } else {
          arrayPush(result, value);
        }
      } else if (!isStrict) {
        result[result.length] = value;
      }
    }
    return result;
  }
  var getPrototype = overArg(Object.getPrototypeOf, Object);
  const getPrototype$1 = getPrototype;
  var objectTag$3 = "[object Object]";
  var funcProto = Function.prototype, objectProto$5 = Object.prototype;
  var funcToString = funcProto.toString;
  var hasOwnProperty$4 = objectProto$5.hasOwnProperty;
  var objectCtorString = funcToString.call(Object);
  function isPlainObject(value) {
    if (!isObjectLike(value) || baseGetTag(value) != objectTag$3) {
      return false;
    }
    var proto = getPrototype$1(value);
    if (proto === null) {
      return true;
    }
    var Ctor = hasOwnProperty$4.call(proto, "constructor") && proto.constructor;
    return typeof Ctor == "function" && Ctor instanceof Ctor && funcToString.call(Ctor) == objectCtorString;
  }
  function stackClear() {
    this.__data__ = new ListCache();
    this.size = 0;
  }
  function stackDelete(key) {
    var data = this.__data__, result = data["delete"](key);
    this.size = data.size;
    return result;
  }
  function stackGet(key) {
    return this.__data__.get(key);
  }
  function stackHas(key) {
    return this.__data__.has(key);
  }
  var LARGE_ARRAY_SIZE = 200;
  function stackSet(key, value) {
    var data = this.__data__;
    if (data instanceof ListCache) {
      var pairs = data.__data__;
      if (!Map$1 || pairs.length < LARGE_ARRAY_SIZE - 1) {
        pairs.push([key, value]);
        this.size = ++data.size;
        return this;
      }
      data = this.__data__ = new MapCache(pairs);
    }
    data.set(key, value);
    this.size = data.size;
    return this;
  }
  function Stack(entries) {
    var data = this.__data__ = new ListCache(entries);
    this.size = data.size;
  }
  Stack.prototype.clear = stackClear;
  Stack.prototype["delete"] = stackDelete;
  Stack.prototype.get = stackGet;
  Stack.prototype.has = stackHas;
  Stack.prototype.set = stackSet;
  function baseAssign(object, source) {
    return object && copyObject(source, keys(source), object);
  }
  function baseAssignIn(object, source) {
    return object && copyObject(source, keysIn(source), object);
  }
  var freeExports = typeof exports2 == "object" && exports2 && !exports2.nodeType && exports2;
  var freeModule = freeExports && typeof module == "object" && module && !module.nodeType && module;
  var moduleExports = freeModule && freeModule.exports === freeExports;
  var Buffer2 = moduleExports ? root.Buffer : void 0, allocUnsafe = Buffer2 ? Buffer2.allocUnsafe : void 0;
  function cloneBuffer(buffer, isDeep) {
    if (isDeep) {
      return buffer.slice();
    }
    var length = buffer.length, result = allocUnsafe ? allocUnsafe(length) : new buffer.constructor(length);
    buffer.copy(result);
    return result;
  }
  function arrayFilter(array, predicate) {
    var index = -1, length = array == null ? 0 : array.length, resIndex = 0, result = [];
    while (++index < length) {
      var value = array[index];
      if (predicate(value, index, array)) {
        result[resIndex++] = value;
      }
    }
    return result;
  }
  function stubArray() {
    return [];
  }
  var objectProto$4 = Object.prototype;
  var propertyIsEnumerable = objectProto$4.propertyIsEnumerable;
  var nativeGetSymbols$1 = Object.getOwnPropertySymbols;
  var getSymbols = !nativeGetSymbols$1 ? stubArray : function(object) {
    if (object == null) {
      return [];
    }
    object = Object(object);
    return arrayFilter(nativeGetSymbols$1(object), function(symbol) {
      return propertyIsEnumerable.call(object, symbol);
    });
  };
  function copySymbols(source, object) {
    return copyObject(source, getSymbols(source), object);
  }
  var nativeGetSymbols = Object.getOwnPropertySymbols;
  var getSymbolsIn = !nativeGetSymbols ? stubArray : function(object) {
    var result = [];
    while (object) {
      arrayPush(result, getSymbols(object));
      object = getPrototype$1(object);
    }
    return result;
  };
  function copySymbolsIn(source, object) {
    return copyObject(source, getSymbolsIn(source), object);
  }
  function baseGetAllKeys(object, keysFunc, symbolsFunc) {
    var result = keysFunc(object);
    return isArray(object) ? result : arrayPush(result, symbolsFunc(object));
  }
  function getAllKeys(object) {
    return baseGetAllKeys(object, keys, getSymbols);
  }
  function getAllKeysIn(object) {
    return baseGetAllKeys(object, keysIn, getSymbolsIn);
  }
  var DataView = getNative(root, "DataView");
  var Promise$1 = getNative(root, "Promise");
  var Set$1 = getNative(root, "Set");
  var mapTag$4 = "[object Map]", objectTag$2 = "[object Object]", promiseTag = "[object Promise]", setTag$4 = "[object Set]", weakMapTag$1 = "[object WeakMap]";
  var dataViewTag$3 = "[object DataView]";
  var dataViewCtorString = toSource(DataView), mapCtorString = toSource(Map$1), promiseCtorString = toSource(Promise$1), setCtorString = toSource(Set$1), weakMapCtorString = toSource(WeakMap);
  var getTag = baseGetTag;
  if (DataView && getTag(new DataView(new ArrayBuffer(1))) != dataViewTag$3 || Map$1 && getTag(new Map$1()) != mapTag$4 || Promise$1 && getTag(Promise$1.resolve()) != promiseTag || Set$1 && getTag(new Set$1()) != setTag$4 || WeakMap && getTag(new WeakMap()) != weakMapTag$1) {
    getTag = function(value) {
      var result = baseGetTag(value), Ctor = result == objectTag$2 ? value.constructor : void 0, ctorString = Ctor ? toSource(Ctor) : "";
      if (ctorString) {
        switch (ctorString) {
          case dataViewCtorString:
            return dataViewTag$3;
          case mapCtorString:
            return mapTag$4;
          case promiseCtorString:
            return promiseTag;
          case setCtorString:
            return setTag$4;
          case weakMapCtorString:
            return weakMapTag$1;
        }
      }
      return result;
    };
  }
  const getTag$1 = getTag;
  var objectProto$3 = Object.prototype;
  var hasOwnProperty$3 = objectProto$3.hasOwnProperty;
  function initCloneArray(array) {
    var length = array.length, result = new array.constructor(length);
    if (length && typeof array[0] == "string" && hasOwnProperty$3.call(array, "index")) {
      result.index = array.index;
      result.input = array.input;
    }
    return result;
  }
  var Uint8Array$1 = root.Uint8Array;
  function cloneArrayBuffer(arrayBuffer) {
    var result = new arrayBuffer.constructor(arrayBuffer.byteLength);
    new Uint8Array$1(result).set(new Uint8Array$1(arrayBuffer));
    return result;
  }
  function cloneDataView(dataView, isDeep) {
    var buffer = isDeep ? cloneArrayBuffer(dataView.buffer) : dataView.buffer;
    return new dataView.constructor(buffer, dataView.byteOffset, dataView.byteLength);
  }
  var reFlags = /\w*$/;
  function cloneRegExp(regexp) {
    var result = new regexp.constructor(regexp.source, reFlags.exec(regexp));
    result.lastIndex = regexp.lastIndex;
    return result;
  }
  var symbolProto$1 = Symbol$1 ? Symbol$1.prototype : void 0, symbolValueOf$1 = symbolProto$1 ? symbolProto$1.valueOf : void 0;
  function cloneSymbol(symbol) {
    return symbolValueOf$1 ? Object(symbolValueOf$1.call(symbol)) : {};
  }
  function cloneTypedArray(typedArray, isDeep) {
    var buffer = isDeep ? cloneArrayBuffer(typedArray.buffer) : typedArray.buffer;
    return new typedArray.constructor(buffer, typedArray.byteOffset, typedArray.length);
  }
  var boolTag$2 = "[object Boolean]", dateTag$2 = "[object Date]", mapTag$3 = "[object Map]", numberTag$2 = "[object Number]", regexpTag$2 = "[object RegExp]", setTag$3 = "[object Set]", stringTag$2 = "[object String]", symbolTag$2 = "[object Symbol]";
  var arrayBufferTag$2 = "[object ArrayBuffer]", dataViewTag$2 = "[object DataView]", float32Tag$1 = "[object Float32Array]", float64Tag$1 = "[object Float64Array]", int8Tag$1 = "[object Int8Array]", int16Tag$1 = "[object Int16Array]", int32Tag$1 = "[object Int32Array]", uint8Tag$1 = "[object Uint8Array]", uint8ClampedTag$1 = "[object Uint8ClampedArray]", uint16Tag$1 = "[object Uint16Array]", uint32Tag$1 = "[object Uint32Array]";
  function initCloneByTag(object, tag, isDeep) {
    var Ctor = object.constructor;
    switch (tag) {
      case arrayBufferTag$2:
        return cloneArrayBuffer(object);
      case boolTag$2:
      case dateTag$2:
        return new Ctor(+object);
      case dataViewTag$2:
        return cloneDataView(object, isDeep);
      case float32Tag$1:
      case float64Tag$1:
      case int8Tag$1:
      case int16Tag$1:
      case int32Tag$1:
      case uint8Tag$1:
      case uint8ClampedTag$1:
      case uint16Tag$1:
      case uint32Tag$1:
        return cloneTypedArray(object, isDeep);
      case mapTag$3:
        return new Ctor();
      case numberTag$2:
      case stringTag$2:
        return new Ctor(object);
      case regexpTag$2:
        return cloneRegExp(object);
      case setTag$3:
        return new Ctor();
      case symbolTag$2:
        return cloneSymbol(object);
    }
  }
  function initCloneObject(object) {
    return typeof object.constructor == "function" && !isPrototype(object) ? baseCreate(getPrototype$1(object)) : {};
  }
  var mapTag$2 = "[object Map]";
  function baseIsMap(value) {
    return isObjectLike(value) && getTag$1(value) == mapTag$2;
  }
  var nodeIsMap = nodeUtil && nodeUtil.isMap;
  var isMap = nodeIsMap ? baseUnary(nodeIsMap) : baseIsMap;
  var setTag$2 = "[object Set]";
  function baseIsSet(value) {
    return isObjectLike(value) && getTag$1(value) == setTag$2;
  }
  var nodeIsSet = nodeUtil && nodeUtil.isSet;
  var isSet = nodeIsSet ? baseUnary(nodeIsSet) : baseIsSet;
  var CLONE_DEEP_FLAG$1 = 1, CLONE_FLAT_FLAG = 2, CLONE_SYMBOLS_FLAG$1 = 4;
  var argsTag$1 = "[object Arguments]", arrayTag$1 = "[object Array]", boolTag$1 = "[object Boolean]", dateTag$1 = "[object Date]", errorTag$1 = "[object Error]", funcTag = "[object Function]", genTag = "[object GeneratorFunction]", mapTag$1 = "[object Map]", numberTag$1 = "[object Number]", objectTag$1 = "[object Object]", regexpTag$1 = "[object RegExp]", setTag$1 = "[object Set]", stringTag$1 = "[object String]", symbolTag$1 = "[object Symbol]", weakMapTag = "[object WeakMap]";
  var arrayBufferTag$1 = "[object ArrayBuffer]", dataViewTag$1 = "[object DataView]", float32Tag = "[object Float32Array]", float64Tag = "[object Float64Array]", int8Tag = "[object Int8Array]", int16Tag = "[object Int16Array]", int32Tag = "[object Int32Array]", uint8Tag = "[object Uint8Array]", uint8ClampedTag = "[object Uint8ClampedArray]", uint16Tag = "[object Uint16Array]", uint32Tag = "[object Uint32Array]";
  var cloneableTags = {};
  cloneableTags[argsTag$1] = cloneableTags[arrayTag$1] = cloneableTags[arrayBufferTag$1] = cloneableTags[dataViewTag$1] = cloneableTags[boolTag$1] = cloneableTags[dateTag$1] = cloneableTags[float32Tag] = cloneableTags[float64Tag] = cloneableTags[int8Tag] = cloneableTags[int16Tag] = cloneableTags[int32Tag] = cloneableTags[mapTag$1] = cloneableTags[numberTag$1] = cloneableTags[objectTag$1] = cloneableTags[regexpTag$1] = cloneableTags[setTag$1] = cloneableTags[stringTag$1] = cloneableTags[symbolTag$1] = cloneableTags[uint8Tag] = cloneableTags[uint8ClampedTag] = cloneableTags[uint16Tag] = cloneableTags[uint32Tag] = true;
  cloneableTags[errorTag$1] = cloneableTags[funcTag] = cloneableTags[weakMapTag] = false;
  function baseClone(value, bitmask, customizer, key, object, stack) {
    var result, isDeep = bitmask & CLONE_DEEP_FLAG$1, isFlat = bitmask & CLONE_FLAT_FLAG, isFull = bitmask & CLONE_SYMBOLS_FLAG$1;
    if (customizer) {
      result = object ? customizer(value, key, object, stack) : customizer(value);
    }
    if (result !== void 0) {
      return result;
    }
    if (!isObject(value)) {
      return value;
    }
    var isArr = isArray(value);
    if (isArr) {
      result = initCloneArray(value);
      if (!isDeep) {
        return copyArray(value, result);
      }
    } else {
      var tag = getTag$1(value), isFunc = tag == funcTag || tag == genTag;
      if (isBuffer(value)) {
        return cloneBuffer(value, isDeep);
      }
      if (tag == objectTag$1 || tag == argsTag$1 || isFunc && !object) {
        result = isFlat || isFunc ? {} : initCloneObject(value);
        if (!isDeep) {
          return isFlat ? copySymbolsIn(value, baseAssignIn(result, value)) : copySymbols(value, baseAssign(result, value));
        }
      } else {
        if (!cloneableTags[tag]) {
          return object ? value : {};
        }
        result = initCloneByTag(value, tag, isDeep);
      }
    }
    stack || (stack = new Stack());
    var stacked = stack.get(value);
    if (stacked) {
      return stacked;
    }
    stack.set(value, result);
    if (isSet(value)) {
      value.forEach(function(subValue) {
        result.add(baseClone(subValue, bitmask, customizer, subValue, value, stack));
      });
    } else if (isMap(value)) {
      value.forEach(function(subValue, key2) {
        result.set(key2, baseClone(subValue, bitmask, customizer, key2, value, stack));
      });
    }
    var keysFunc = isFull ? isFlat ? getAllKeysIn : getAllKeys : isFlat ? keysIn : keys;
    var props = isArr ? void 0 : keysFunc(value);
    arrayEach(props || value, function(subValue, key2) {
      if (props) {
        key2 = subValue;
        subValue = value[key2];
      }
      assignValue(result, key2, baseClone(subValue, bitmask, customizer, key2, value, stack));
    });
    return result;
  }
  var CLONE_DEEP_FLAG = 1, CLONE_SYMBOLS_FLAG = 4;
  function cloneDeep(value) {
    return baseClone(value, CLONE_DEEP_FLAG | CLONE_SYMBOLS_FLAG);
  }
  var HASH_UNDEFINED = "__lodash_hash_undefined__";
  function setCacheAdd(value) {
    this.__data__.set(value, HASH_UNDEFINED);
    return this;
  }
  function setCacheHas(value) {
    return this.__data__.has(value);
  }
  function SetCache(values) {
    var index = -1, length = values == null ? 0 : values.length;
    this.__data__ = new MapCache();
    while (++index < length) {
      this.add(values[index]);
    }
  }
  SetCache.prototype.add = SetCache.prototype.push = setCacheAdd;
  SetCache.prototype.has = setCacheHas;
  function arraySome(array, predicate) {
    var index = -1, length = array == null ? 0 : array.length;
    while (++index < length) {
      if (predicate(array[index], index, array)) {
        return true;
      }
    }
    return false;
  }
  function cacheHas(cache, key) {
    return cache.has(key);
  }
  var COMPARE_PARTIAL_FLAG$5 = 1, COMPARE_UNORDERED_FLAG$3 = 2;
  function equalArrays(array, other, bitmask, customizer, equalFunc, stack) {
    var isPartial = bitmask & COMPARE_PARTIAL_FLAG$5, arrLength = array.length, othLength = other.length;
    if (arrLength != othLength && !(isPartial && othLength > arrLength)) {
      return false;
    }
    var arrStacked = stack.get(array);
    var othStacked = stack.get(other);
    if (arrStacked && othStacked) {
      return arrStacked == other && othStacked == array;
    }
    var index = -1, result = true, seen = bitmask & COMPARE_UNORDERED_FLAG$3 ? new SetCache() : void 0;
    stack.set(array, other);
    stack.set(other, array);
    while (++index < arrLength) {
      var arrValue = array[index], othValue = other[index];
      if (customizer) {
        var compared = isPartial ? customizer(othValue, arrValue, index, other, array, stack) : customizer(arrValue, othValue, index, array, other, stack);
      }
      if (compared !== void 0) {
        if (compared) {
          continue;
        }
        result = false;
        break;
      }
      if (seen) {
        if (!arraySome(other, function(othValue2, othIndex) {
          if (!cacheHas(seen, othIndex) && (arrValue === othValue2 || equalFunc(arrValue, othValue2, bitmask, customizer, stack))) {
            return seen.push(othIndex);
          }
        })) {
          result = false;
          break;
        }
      } else if (!(arrValue === othValue || equalFunc(arrValue, othValue, bitmask, customizer, stack))) {
        result = false;
        break;
      }
    }
    stack["delete"](array);
    stack["delete"](other);
    return result;
  }
  function mapToArray(map) {
    var index = -1, result = Array(map.size);
    map.forEach(function(value, key) {
      result[++index] = [key, value];
    });
    return result;
  }
  function setToArray(set) {
    var index = -1, result = Array(set.size);
    set.forEach(function(value) {
      result[++index] = value;
    });
    return result;
  }
  var COMPARE_PARTIAL_FLAG$4 = 1, COMPARE_UNORDERED_FLAG$2 = 2;
  var boolTag = "[object Boolean]", dateTag = "[object Date]", errorTag = "[object Error]", mapTag = "[object Map]", numberTag = "[object Number]", regexpTag = "[object RegExp]", setTag = "[object Set]", stringTag = "[object String]", symbolTag = "[object Symbol]";
  var arrayBufferTag = "[object ArrayBuffer]", dataViewTag = "[object DataView]";
  var symbolProto = Symbol$1 ? Symbol$1.prototype : void 0, symbolValueOf = symbolProto ? symbolProto.valueOf : void 0;
  function equalByTag(object, other, tag, bitmask, customizer, equalFunc, stack) {
    switch (tag) {
      case dataViewTag:
        if (object.byteLength != other.byteLength || object.byteOffset != other.byteOffset) {
          return false;
        }
        object = object.buffer;
        other = other.buffer;
      case arrayBufferTag:
        if (object.byteLength != other.byteLength || !equalFunc(new Uint8Array$1(object), new Uint8Array$1(other))) {
          return false;
        }
        return true;
      case boolTag:
      case dateTag:
      case numberTag:
        return eq(+object, +other);
      case errorTag:
        return object.name == other.name && object.message == other.message;
      case regexpTag:
      case stringTag:
        return object == other + "";
      case mapTag:
        var convert = mapToArray;
      case setTag:
        var isPartial = bitmask & COMPARE_PARTIAL_FLAG$4;
        convert || (convert = setToArray);
        if (object.size != other.size && !isPartial) {
          return false;
        }
        var stacked = stack.get(object);
        if (stacked) {
          return stacked == other;
        }
        bitmask |= COMPARE_UNORDERED_FLAG$2;
        stack.set(object, other);
        var result = equalArrays(convert(object), convert(other), bitmask, customizer, equalFunc, stack);
        stack["delete"](object);
        return result;
      case symbolTag:
        if (symbolValueOf) {
          return symbolValueOf.call(object) == symbolValueOf.call(other);
        }
    }
    return false;
  }
  var COMPARE_PARTIAL_FLAG$3 = 1;
  var objectProto$2 = Object.prototype;
  var hasOwnProperty$2 = objectProto$2.hasOwnProperty;
  function equalObjects(object, other, bitmask, customizer, equalFunc, stack) {
    var isPartial = bitmask & COMPARE_PARTIAL_FLAG$3, objProps = getAllKeys(object), objLength = objProps.length, othProps = getAllKeys(other), othLength = othProps.length;
    if (objLength != othLength && !isPartial) {
      return false;
    }
    var index = objLength;
    while (index--) {
      var key = objProps[index];
      if (!(isPartial ? key in other : hasOwnProperty$2.call(other, key))) {
        return false;
      }
    }
    var objStacked = stack.get(object);
    var othStacked = stack.get(other);
    if (objStacked && othStacked) {
      return objStacked == other && othStacked == object;
    }
    var result = true;
    stack.set(object, other);
    stack.set(other, object);
    var skipCtor = isPartial;
    while (++index < objLength) {
      key = objProps[index];
      var objValue = object[key], othValue = other[key];
      if (customizer) {
        var compared = isPartial ? customizer(othValue, objValue, key, other, object, stack) : customizer(objValue, othValue, key, object, other, stack);
      }
      if (!(compared === void 0 ? objValue === othValue || equalFunc(objValue, othValue, bitmask, customizer, stack) : compared)) {
        result = false;
        break;
      }
      skipCtor || (skipCtor = key == "constructor");
    }
    if (result && !skipCtor) {
      var objCtor = object.constructor, othCtor = other.constructor;
      if (objCtor != othCtor && ("constructor" in object && "constructor" in other) && !(typeof objCtor == "function" && objCtor instanceof objCtor && typeof othCtor == "function" && othCtor instanceof othCtor)) {
        result = false;
      }
    }
    stack["delete"](object);
    stack["delete"](other);
    return result;
  }
  var COMPARE_PARTIAL_FLAG$2 = 1;
  var argsTag = "[object Arguments]", arrayTag = "[object Array]", objectTag = "[object Object]";
  var objectProto$1 = Object.prototype;
  var hasOwnProperty$1 = objectProto$1.hasOwnProperty;
  function baseIsEqualDeep(object, other, bitmask, customizer, equalFunc, stack) {
    var objIsArr = isArray(object), othIsArr = isArray(other), objTag = objIsArr ? arrayTag : getTag$1(object), othTag = othIsArr ? arrayTag : getTag$1(other);
    objTag = objTag == argsTag ? objectTag : objTag;
    othTag = othTag == argsTag ? objectTag : othTag;
    var objIsObj = objTag == objectTag, othIsObj = othTag == objectTag, isSameTag = objTag == othTag;
    if (isSameTag && isBuffer(object)) {
      if (!isBuffer(other)) {
        return false;
      }
      objIsArr = true;
      objIsObj = false;
    }
    if (isSameTag && !objIsObj) {
      stack || (stack = new Stack());
      return objIsArr || isTypedArray(object) ? equalArrays(object, other, bitmask, customizer, equalFunc, stack) : equalByTag(object, other, objTag, bitmask, customizer, equalFunc, stack);
    }
    if (!(bitmask & COMPARE_PARTIAL_FLAG$2)) {
      var objIsWrapped = objIsObj && hasOwnProperty$1.call(object, "__wrapped__"), othIsWrapped = othIsObj && hasOwnProperty$1.call(other, "__wrapped__");
      if (objIsWrapped || othIsWrapped) {
        var objUnwrapped = objIsWrapped ? object.value() : object, othUnwrapped = othIsWrapped ? other.value() : other;
        stack || (stack = new Stack());
        return equalFunc(objUnwrapped, othUnwrapped, bitmask, customizer, stack);
      }
    }
    if (!isSameTag) {
      return false;
    }
    stack || (stack = new Stack());
    return equalObjects(object, other, bitmask, customizer, equalFunc, stack);
  }
  function baseIsEqual(value, other, bitmask, customizer, stack) {
    if (value === other) {
      return true;
    }
    if (value == null || other == null || !isObjectLike(value) && !isObjectLike(other)) {
      return value !== value && other !== other;
    }
    return baseIsEqualDeep(value, other, bitmask, customizer, baseIsEqual, stack);
  }
  var COMPARE_PARTIAL_FLAG$1 = 1, COMPARE_UNORDERED_FLAG$1 = 2;
  function baseIsMatch(object, source, matchData, customizer) {
    var index = matchData.length, length = index, noCustomizer = !customizer;
    if (object == null) {
      return !length;
    }
    object = Object(object);
    while (index--) {
      var data = matchData[index];
      if (noCustomizer && data[2] ? data[1] !== object[data[0]] : !(data[0] in object)) {
        return false;
      }
    }
    while (++index < length) {
      data = matchData[index];
      var key = data[0], objValue = object[key], srcValue = data[1];
      if (noCustomizer && data[2]) {
        if (objValue === void 0 && !(key in object)) {
          return false;
        }
      } else {
        var stack = new Stack();
        if (customizer) {
          var result = customizer(objValue, srcValue, key, object, source, stack);
        }
        if (!(result === void 0 ? baseIsEqual(srcValue, objValue, COMPARE_PARTIAL_FLAG$1 | COMPARE_UNORDERED_FLAG$1, customizer, stack) : result)) {
          return false;
        }
      }
    }
    return true;
  }
  function isStrictComparable(value) {
    return value === value && !isObject(value);
  }
  function getMatchData(object) {
    var result = keys(object), length = result.length;
    while (length--) {
      var key = result[length], value = object[key];
      result[length] = [key, value, isStrictComparable(value)];
    }
    return result;
  }
  function matchesStrictComparable(key, srcValue) {
    return function(object) {
      if (object == null) {
        return false;
      }
      return object[key] === srcValue && (srcValue !== void 0 || key in Object(object));
    };
  }
  function baseMatches(source) {
    var matchData = getMatchData(source);
    if (matchData.length == 1 && matchData[0][2]) {
      return matchesStrictComparable(matchData[0][0], matchData[0][1]);
    }
    return function(object) {
      return object === source || baseIsMatch(object, source, matchData);
    };
  }
  function baseHasIn(object, key) {
    return object != null && key in Object(object);
  }
  function hasPath(object, path, hasFunc) {
    path = castPath(path, object);
    var index = -1, length = path.length, result = false;
    while (++index < length) {
      var key = toKey(path[index]);
      if (!(result = object != null && hasFunc(object, key))) {
        break;
      }
      object = object[key];
    }
    if (result || ++index != length) {
      return result;
    }
    length = object == null ? 0 : object.length;
    return !!length && isLength(length) && isIndex(key, length) && (isArray(object) || isArguments(object));
  }
  function hasIn(object, path) {
    return object != null && hasPath(object, path, baseHasIn);
  }
  var COMPARE_PARTIAL_FLAG = 1, COMPARE_UNORDERED_FLAG = 2;
  function baseMatchesProperty(path, srcValue) {
    if (isKey(path) && isStrictComparable(srcValue)) {
      return matchesStrictComparable(toKey(path), srcValue);
    }
    return function(object) {
      var objValue = get(object, path);
      return objValue === void 0 && objValue === srcValue ? hasIn(object, path) : baseIsEqual(srcValue, objValue, COMPARE_PARTIAL_FLAG | COMPARE_UNORDERED_FLAG);
    };
  }
  function baseProperty(key) {
    return function(object) {
      return object == null ? void 0 : object[key];
    };
  }
  function basePropertyDeep(path) {
    return function(object) {
      return baseGet(object, path);
    };
  }
  function property(path) {
    return isKey(path) ? baseProperty(toKey(path)) : basePropertyDeep(path);
  }
  function baseIteratee(value) {
    if (typeof value == "function") {
      return value;
    }
    if (value == null) {
      return identity;
    }
    if (typeof value == "object") {
      return isArray(value) ? baseMatchesProperty(value[0], value[1]) : baseMatches(value);
    }
    return property(value);
  }
  function arrayAggregator(array, setter, iteratee, accumulator) {
    var index = -1, length = array == null ? 0 : array.length;
    while (++index < length) {
      var value = array[index];
      setter(accumulator, value, iteratee(value), array);
    }
    return accumulator;
  }
  function createBaseFor(fromRight) {
    return function(object, iteratee, keysFunc) {
      var index = -1, iterable = Object(object), props = keysFunc(object), length = props.length;
      while (length--) {
        var key = props[fromRight ? length : ++index];
        if (iteratee(iterable[key], key, iterable) === false) {
          break;
        }
      }
      return object;
    };
  }
  var baseFor = createBaseFor();
  function baseForOwn(object, iteratee) {
    return object && baseFor(object, iteratee, keys);
  }
  function createBaseEach(eachFunc, fromRight) {
    return function(collection, iteratee) {
      if (collection == null) {
        return collection;
      }
      if (!isArrayLike(collection)) {
        return eachFunc(collection, iteratee);
      }
      var length = collection.length, index = fromRight ? length : -1, iterable = Object(collection);
      while (fromRight ? index-- : ++index < length) {
        if (iteratee(iterable[index], index, iterable) === false) {
          break;
        }
      }
      return collection;
    };
  }
  var baseEach = createBaseEach(baseForOwn);
  function baseAggregator(collection, setter, iteratee, accumulator) {
    baseEach(collection, function(value, key, collection2) {
      setter(accumulator, value, iteratee(value), collection2);
    });
    return accumulator;
  }
  function createAggregator(setter, initializer) {
    return function(collection, iteratee) {
      var func = isArray(collection) ? arrayAggregator : baseAggregator, accumulator = initializer ? initializer() : {};
      return func(collection, setter, baseIteratee(iteratee), accumulator);
    };
  }
  function assignMergeValue(object, key, value) {
    if (value !== void 0 && !eq(object[key], value) || value === void 0 && !(key in object)) {
      baseAssignValue(object, key, value);
    }
  }
  function isArrayLikeObject(value) {
    return isObjectLike(value) && isArrayLike(value);
  }
  function safeGet(object, key) {
    if (key === "constructor" && typeof object[key] === "function") {
      return;
    }
    if (key == "__proto__") {
      return;
    }
    return object[key];
  }
  function toPlainObject(value) {
    return copyObject(value, keysIn(value));
  }
  function baseMergeDeep(object, source, key, srcIndex, mergeFunc, customizer, stack) {
    var objValue = safeGet(object, key), srcValue = safeGet(source, key), stacked = stack.get(srcValue);
    if (stacked) {
      assignMergeValue(object, key, stacked);
      return;
    }
    var newValue = customizer ? customizer(objValue, srcValue, key + "", object, source, stack) : void 0;
    var isCommon = newValue === void 0;
    if (isCommon) {
      var isArr = isArray(srcValue), isBuff = !isArr && isBuffer(srcValue), isTyped = !isArr && !isBuff && isTypedArray(srcValue);
      newValue = srcValue;
      if (isArr || isBuff || isTyped) {
        if (isArray(objValue)) {
          newValue = objValue;
        } else if (isArrayLikeObject(objValue)) {
          newValue = copyArray(objValue);
        } else if (isBuff) {
          isCommon = false;
          newValue = cloneBuffer(srcValue, true);
        } else if (isTyped) {
          isCommon = false;
          newValue = cloneTypedArray(srcValue, true);
        } else {
          newValue = [];
        }
      } else if (isPlainObject(srcValue) || isArguments(srcValue)) {
        newValue = objValue;
        if (isArguments(objValue)) {
          newValue = toPlainObject(objValue);
        } else if (!isObject(objValue) || isFunction(objValue)) {
          newValue = initCloneObject(srcValue);
        }
      } else {
        isCommon = false;
      }
    }
    if (isCommon) {
      stack.set(srcValue, newValue);
      mergeFunc(newValue, srcValue, srcIndex, customizer, stack);
      stack["delete"](srcValue);
    }
    assignMergeValue(object, key, newValue);
  }
  function baseMerge(object, source, srcIndex, customizer, stack) {
    if (object === source) {
      return;
    }
    baseFor(source, function(srcValue, key) {
      stack || (stack = new Stack());
      if (isObject(srcValue)) {
        baseMergeDeep(object, source, key, srcIndex, baseMerge, customizer, stack);
      } else {
        var newValue = customizer ? customizer(safeGet(object, key), srcValue, key + "", object, source, stack) : void 0;
        if (newValue === void 0) {
          newValue = srcValue;
        }
        assignMergeValue(object, key, newValue);
      }
    }, keysIn);
  }
  function createFind(findIndexFunc) {
    return function(collection, predicate, fromIndex) {
      var iterable = Object(collection);
      if (!isArrayLike(collection)) {
        var iteratee = baseIteratee(predicate);
        collection = keys(collection);
        predicate = function(key) {
          return iteratee(iterable[key], key, iterable);
        };
      }
      var index = findIndexFunc(collection, predicate, fromIndex);
      return index > -1 ? iterable[iteratee ? collection[index] : index] : void 0;
    };
  }
  var nativeMax = Math.max;
  function findIndex(array, predicate, fromIndex) {
    var length = array == null ? 0 : array.length;
    if (!length) {
      return -1;
    }
    var index = fromIndex == null ? 0 : toInteger(fromIndex);
    if (index < 0) {
      index = nativeMax(length + index, 0);
    }
    return baseFindIndex(array, baseIteratee(predicate), index);
  }
  var find = createFind(findIndex);
  const find$1 = find;
  function baseMap(collection, iteratee) {
    var index = -1, result = isArrayLike(collection) ? Array(collection.length) : [];
    baseEach(collection, function(value, key, collection2) {
      result[++index] = iteratee(value, key, collection2);
    });
    return result;
  }
  var objectProto = Object.prototype;
  var hasOwnProperty = objectProto.hasOwnProperty;
  var groupBy = createAggregator(function(result, value, key) {
    if (hasOwnProperty.call(result, key)) {
      result[key].push(value);
    } else {
      baseAssignValue(result, key, [value]);
    }
  });
  var merge = createAssigner(function(object, source, srcIndex) {
    baseMerge(object, source, srcIndex);
  });
  function baseSortBy(array, comparer) {
    var length = array.length;
    array.sort(comparer);
    while (length--) {
      array[length] = array[length].value;
    }
    return array;
  }
  function compareAscending(value, other) {
    if (value !== other) {
      var valIsDefined = value !== void 0, valIsNull = value === null, valIsReflexive = value === value, valIsSymbol = isSymbol(value);
      var othIsDefined = other !== void 0, othIsNull = other === null, othIsReflexive = other === other, othIsSymbol = isSymbol(other);
      if (!othIsNull && !othIsSymbol && !valIsSymbol && value > other || valIsSymbol && othIsDefined && othIsReflexive && !othIsNull && !othIsSymbol || valIsNull && othIsDefined && othIsReflexive || !valIsDefined && othIsReflexive || !valIsReflexive) {
        return 1;
      }
      if (!valIsNull && !valIsSymbol && !othIsSymbol && value < other || othIsSymbol && valIsDefined && valIsReflexive && !valIsNull && !valIsSymbol || othIsNull && valIsDefined && valIsReflexive || !othIsDefined && valIsReflexive || !othIsReflexive) {
        return -1;
      }
    }
    return 0;
  }
  function compareMultiple(object, other, orders) {
    var index = -1, objCriteria = object.criteria, othCriteria = other.criteria, length = objCriteria.length, ordersLength = orders.length;
    while (++index < length) {
      var result = compareAscending(objCriteria[index], othCriteria[index]);
      if (result) {
        if (index >= ordersLength) {
          return result;
        }
        var order = orders[index];
        return result * (order == "desc" ? -1 : 1);
      }
    }
    return object.index - other.index;
  }
  function baseOrderBy(collection, iteratees, orders) {
    if (iteratees.length) {
      iteratees = arrayMap(iteratees, function(iteratee) {
        if (isArray(iteratee)) {
          return function(value) {
            return baseGet(value, iteratee.length === 1 ? iteratee[0] : iteratee);
          };
        }
        return iteratee;
      });
    } else {
      iteratees = [identity];
    }
    var index = -1;
    iteratees = arrayMap(iteratees, baseUnary(baseIteratee));
    var result = baseMap(collection, function(value, key, collection2) {
      var criteria = arrayMap(iteratees, function(iteratee) {
        return iteratee(value);
      });
      return { "criteria": criteria, "index": ++index, "value": value };
    });
    return baseSortBy(result, function(object, other) {
      return compareMultiple(object, other, orders);
    });
  }
  var sortBy = baseRest(function(collection, iteratees) {
    if (collection == null) {
      return [];
    }
    var length = iteratees.length;
    if (length > 1 && isIterateeCall(collection, iteratees[0], iteratees[1])) {
      iteratees = [];
    } else if (length > 2 && isIterateeCall(iteratees[0], iteratees[1], iteratees[2])) {
      iteratees = [iteratees[0]];
    }
    return baseOrderBy(collection, baseFlatten(iteratees, 1), []);
  });
  const sortBy$1 = sortBy;
  const nanoStr = "1234567890abcdefghijklmnopqrstuvwxyz";
  const nanoid = customAlphabet(nanoStr, 8);
  const treeToList = (_0x1f79f9, _0x152503) => {
    let _0x340f7b = [];
    const _0x414c6d = [];
    if (!_0x1f79f9 || _0x1f79f9["length"] === 0)
      return _0x414c6d;
    _0x340f7b = _0x340f7b["concat"](_0x1f79f9);
    while (_0x340f7b["length"]) {
      const _0x499540 = _0x340f7b["shift"]();
      _0x499540[_0x152503] && (_0x340f7b = _0x340f7b["concat"](_0x499540[_0x152503])), _0x414c6d["push"](_0x499540);
    }
    return _0x414c6d;
  };
  const componentMerge = (_0x1cfd45, _0x3a692f, _0x24d3f3 = ![]) => {
    if (_0x24d3f3)
      return merge(_0x1cfd45, _0x3a692f);
    const _0xf800d7 = _0x3a692f["option"];
    if (!_0xf800d7)
      return merge(_0x1cfd45, _0x3a692f);
    _0x3a692f["option"] = void 0;
    if (_0xf800d7)
      return __spreadProps(__spreadValues({}, merge(_0x1cfd45, _0x3a692f)), { "option": _0xf800d7 });
  };
  const setAttributes = (_0x667bdb, _0x13369d) => {
    for (const _0x416759 in _0x13369d) {
      _0x667bdb["setAttribute"](_0x416759, _0x13369d[_0x416759]);
    }
  };
  const hideDoms = (_0x39899b) => {
    _0x39899b["forEach"]((_0x530bf6) => {
      _0x530bf6["style"]["display"] = "none";
    });
  };
  const showDoms = (_0xa5f225, _0x4a5a9a = "block") => {
    _0xa5f225["forEach"]((_0x17e252) => {
      _0x17e252["style"]["display"] = _0x4a5a9a;
    });
  };
  const traverse = (_0x16ace9, _0x159c7b, _0x2963d4) => {
    _0x16ace9 = _0x16ace9 || [], _0x16ace9["forEach"]((_0x4a754d) => {
      _0x2963d4(_0x4a754d);
      const _0x59794c = _0x4a754d[_0x159c7b];
      _0x59794c && traverse(_0x59794c, _0x159c7b, _0x2963d4);
    });
  };
  const logError = (_0x33a4c5) => {
    return console["error"](_0x33a4c5);
  };
  const logWarning = (_0x1ded02) => {
    return console["warn"](_0x1ded02);
  };
  function applyToPoint(matrix, point) {
    return Array.isArray(point) ? [
      matrix.a * point[0] + matrix.c * point[1] + matrix.e,
      matrix.b * point[0] + matrix.d * point[1] + matrix.f
    ] : {
      x: matrix.a * point.x + matrix.c * point.y + matrix.e,
      y: matrix.b * point.x + matrix.d * point.y + matrix.f
    };
  }
  function inverse(matrix) {
    const { a, b, c, d, e, f } = matrix;
    const denom = a * d - b * c;
    return {
      a: d / denom,
      b: b / -denom,
      c: c / -denom,
      d: a / denom,
      e: (d * e - c * f) / -denom,
      f: (b * e - a * f) / denom
    };
  }
  function isUndefined(val) {
    return typeof val === "undefined";
  }
  function translate(tx, ty = 0) {
    return {
      a: 1,
      c: 0,
      e: tx,
      b: 0,
      d: 1,
      f: ty
    };
  }
  function transform(...matrices) {
    matrices = Array.isArray(matrices[0]) ? matrices[0] : matrices;
    const multiply = (m1, m2) => {
      return {
        a: m1.a * m2.a + m1.c * m2.b,
        c: m1.a * m2.c + m1.c * m2.d,
        e: m1.a * m2.e + m1.c * m2.f + m1.e,
        b: m1.b * m2.a + m1.d * m2.b,
        d: m1.b * m2.c + m1.d * m2.d,
        f: m1.b * m2.e + m1.d * m2.f + m1.f
      };
    };
    switch (matrices.length) {
      case 0:
        throw new Error("no matrices provided");
      case 1:
        return matrices[0];
      case 2:
        return multiply(matrices[0], matrices[1]);
      default: {
        const [m1, m2, ...rest] = matrices;
        const m = multiply(m1, m2);
        return transform(m, ...rest);
      }
    }
  }
  function compose(...matrices) {
    return transform(...matrices);
  }
  function scale(sx, sy = void 0, cx = void 0, cy = void 0) {
    if (isUndefined(sy))
      sy = sx;
    const scaleMatrix = {
      a: sx,
      c: 0,
      e: 0,
      b: 0,
      d: sy,
      f: 0
    };
    if (isUndefined(cx) || isUndefined(cy)) {
      return scaleMatrix;
    }
    return transform([
      translate(cx, cy),
      scaleMatrix,
      translate(-cx, -cy)
    ]);
  }
  function peg$subclass(child, parent) {
    function C() {
      this.constructor = child;
    }
    C.prototype = parent.prototype;
    child.prototype = new C();
  }
  function peg$SyntaxError(message, expected, found, location) {
    var self2 = Error.call(this, message);
    if (Object.setPrototypeOf) {
      Object.setPrototypeOf(self2, peg$SyntaxError.prototype);
    }
    self2.expected = expected;
    self2.found = found;
    self2.location = location;
    self2.name = "SyntaxError";
    return self2;
  }
  peg$subclass(peg$SyntaxError, Error);
  function peg$padEnd(str, targetLength, padString) {
    padString = padString || " ";
    if (str.length > targetLength) {
      return str;
    }
    targetLength -= str.length;
    padString += padString.repeat(targetLength);
    return str + padString.slice(0, targetLength);
  }
  peg$SyntaxError.prototype.format = function(sources) {
    var str = "Error: " + this.message;
    if (this.location) {
      var src = null;
      var k;
      for (k = 0; k < sources.length; k++) {
        if (sources[k].source === this.location.source) {
          src = sources[k].text.split(/\r\n|\n|\r/g);
          break;
        }
      }
      var s = this.location.start;
      var offset_s = this.location.source && typeof this.location.source.offset === "function" ? this.location.source.offset(s) : s;
      var loc = this.location.source + ":" + offset_s.line + ":" + offset_s.column;
      if (src) {
        var e = this.location.end;
        var filler = peg$padEnd("", offset_s.line.toString().length, " ");
        var line = src[s.line - 1];
        var last = s.line === e.line ? e.column : line.length + 1;
        var hatLen = last - s.column || 1;
        str += "\n --> " + loc + "\n" + filler + " |\n" + offset_s.line + " | " + line + "\n" + filler + " | " + peg$padEnd("", s.column - 1, " ") + peg$padEnd("", hatLen, "^");
      } else {
        str += "\n at " + loc;
      }
    }
    return str;
  };
  peg$SyntaxError.buildMessage = function(expected, found) {
    var DESCRIBE_EXPECTATION_FNS = {
      literal: function(expectation) {
        return '"' + literalEscape(expectation.text) + '"';
      },
      class: function(expectation) {
        var escapedParts = expectation.parts.map(function(part) {
          return Array.isArray(part) ? classEscape(part[0]) + "-" + classEscape(part[1]) : classEscape(part);
        });
        return "[" + (expectation.inverted ? "^" : "") + escapedParts.join("") + "]";
      },
      any: function() {
        return "any character";
      },
      end: function() {
        return "end of input";
      },
      other: function(expectation) {
        return expectation.description;
      }
    };
    function hex(ch) {
      return ch.charCodeAt(0).toString(16).toUpperCase();
    }
    function literalEscape(s) {
      return s.replace(/\\/g, "\\\\").replace(/"/g, '\\"').replace(/\0/g, "\\0").replace(/\t/g, "\\t").replace(/\n/g, "\\n").replace(/\r/g, "\\r").replace(/[\x00-\x0F]/g, function(ch) {
        return "\\x0" + hex(ch);
      }).replace(/[\x10-\x1F\x7F-\x9F]/g, function(ch) {
        return "\\x" + hex(ch);
      });
    }
    function classEscape(s) {
      return s.replace(/\\/g, "\\\\").replace(/\]/g, "\\]").replace(/\^/g, "\\^").replace(/-/g, "\\-").replace(/\0/g, "\\0").replace(/\t/g, "\\t").replace(/\n/g, "\\n").replace(/\r/g, "\\r").replace(/[\x00-\x0F]/g, function(ch) {
        return "\\x0" + hex(ch);
      }).replace(/[\x10-\x1F\x7F-\x9F]/g, function(ch) {
        return "\\x" + hex(ch);
      });
    }
    function describeExpectation(expectation) {
      return DESCRIBE_EXPECTATION_FNS[expectation.type](expectation);
    }
    function describeExpected(expected2) {
      var descriptions = expected2.map(describeExpectation);
      var i, j;
      descriptions.sort();
      if (descriptions.length > 0) {
        for (i = 1, j = 1; i < descriptions.length; i++) {
          if (descriptions[i - 1] !== descriptions[i]) {
            descriptions[j] = descriptions[i];
            j++;
          }
        }
        descriptions.length = j;
      }
      switch (descriptions.length) {
        case 1:
          return descriptions[0];
        case 2:
          return descriptions[0] + " or " + descriptions[1];
        default:
          return descriptions.slice(0, -1).join(", ") + ", or " + descriptions[descriptions.length - 1];
      }
    }
    function describeFound(found2) {
      return found2 ? '"' + literalEscape(found2) + '"' : "end of input";
    }
    return "Expected " + describeExpected(expected) + " but " + describeFound(found) + " found.";
  };
  function decomposeTSR(matrix, flipX = false, flipY = false) {
    if (flipX) {
      if (flipY) {
        matrix = compose(matrix, scale(-1, -1));
      } else {
        matrix = compose(matrix, scale(1, -1));
      }
    } else if (flipY) {
      matrix = compose(matrix, scale(-1, 1));
    }
    const a = matrix.a;
    const b = matrix.b;
    const c = matrix.c;
    const d = matrix.d;
    let scaleX, scaleY, rotation;
    if (a !== 0 || c !== 0) {
      const hypotAc = Math.hypot(a, c);
      scaleX = hypotAc;
      scaleY = (a * d - b * c) / hypotAc;
      const acos = Math.acos(a / hypotAc);
      rotation = c > 0 ? -acos : acos;
    } else if (b !== 0 || d !== 0) {
      const hypotBd = Math.hypot(b, d);
      scaleX = (a * d - b * c) / hypotBd;
      scaleY = hypotBd;
      const acos = Math.acos(b / hypotBd);
      rotation = Math.PI / 2 + (d > 0 ? -acos : acos);
    } else {
      scaleX = 0;
      scaleY = 0;
      rotation = 0;
    }
    if (flipY) {
      scaleX = -scaleX;
    }
    if (flipX) {
      scaleY = -scaleY;
    }
    return {
      translate: { tx: matrix.e, ty: matrix.f },
      scale: { sx: scaleX, sy: scaleY },
      rotation: { angle: rotation }
    };
  }
  const getBBox = (_0x5f2541) => {
    const { tl: _0x3a5575, tr: _0x4caa92, bl: _0x48fd65, br: _0x3c08e4 } = getCoords(_0x5f2541), _0x3670e3 = [_0x3a5575["x"], _0x4caa92["x"], _0x48fd65["x"], _0x3c08e4["x"]], _0x404bcb = [_0x3a5575["y"], _0x4caa92["y"], _0x48fd65["y"], _0x3c08e4["y"]];
    let _0x554255 = Math["min"](..._0x3670e3), _0x1264b8 = Math["min"](..._0x404bcb), _0x45c472 = Math["max"](..._0x3670e3), _0x29e98f = Math["max"](..._0x404bcb);
    return { "x": _0x554255, "y": _0x1264b8, "w": _0x45c472 - _0x554255, "h": _0x29e98f - _0x1264b8 };
  };
  const isRectIntersect = (_0x29929d, _0x18589a, _0xb48b4c = ![]) => {
    const { x: _0x57ebff, y: _0x5a80e2, w: _0x1ae240, h: _0x1ad1d2 } = _0x29929d, { x: _0x853b98, y: _0x4451f4, w: _0x33d849, h: _0x122368 } = _0x18589a;
    let _0xa68a28 = _0x57ebff <= _0x853b98 + _0x33d849 && _0x57ebff + _0x1ae240 >= _0x853b98 && _0x5a80e2 <= _0x4451f4 + _0x122368 && _0x5a80e2 + _0x1ad1d2 >= _0x4451f4;
    return _0xb48b4c && (_0xa68a28 = _0x57ebff <= _0x853b98 && _0x57ebff + _0x1ae240 >= _0x853b98 + _0x33d849 && _0x5a80e2 <= _0x4451f4 && _0x5a80e2 + _0x1ad1d2 >= _0x4451f4 + _0x122368), _0xa68a28;
  };
  const rotatePoint = (_0x209044 = { "x": 0, "y": 0 }, _0x4c9d94 = { "x": 0, "y": 0 }, _0x4f3ad8) => {
    const _0x4fc5cb = _0x209044["x"] - _0x4c9d94["x"], _0x68f4d5 = _0x209044["y"] - _0x4c9d94["y"], _0xe35a1a = _0x4f3ad8 * (Math["PI"] / 180), _0x1a69c3 = _0x4fc5cb * Math["cos"](_0xe35a1a) - _0x68f4d5 * Math["sin"](_0xe35a1a) + _0x4c9d94["x"], _0x47a84c = _0x4fc5cb * Math["sin"](_0xe35a1a) + _0x68f4d5 * Math["cos"](_0xe35a1a) + _0x4c9d94["y"];
    return { "x": _0x1a69c3, "y": _0x47a84c };
  };
  const getCoords = (_0x107c7c = { "x": 0, "y": 0, "w": 0, "h": 0, "angle": 0 }) => {
    const { x: _0x31918a, y: _0x348d29, w: _0x12b2ac, h: _0x4d8d75, angle = 0 } = _0x107c7c, _0x2a87d2 = { "x": _0x31918a + _0x12b2ac / 2, "y": _0x348d29 + _0x4d8d75 / 2 };
    let [_0x35d10c, _0x3cc2f8, _0x5b7f40, _0x50d6c3] = [{ "x": _0x31918a, "y": _0x348d29 }, { "x": _0x31918a + _0x12b2ac, "y": _0x348d29 }, { "x": _0x31918a, "y": _0x348d29 + _0x4d8d75 }, { "x": _0x31918a + _0x12b2ac, "y": _0x348d29 + _0x4d8d75 }];
    [_0x35d10c, _0x3cc2f8, _0x5b7f40, _0x50d6c3] = [rotatePoint(_0x35d10c, _0x2a87d2, angle), rotatePoint(_0x3cc2f8, _0x2a87d2, angle), rotatePoint(_0x5b7f40, _0x2a87d2, angle), rotatePoint(_0x50d6c3, _0x2a87d2, angle)];
    const [_0x1ea1d4, _0x972083, _0x42087a, _0xedfbb2] = [{ "x": (_0x35d10c["x"] + _0x5b7f40["x"]) / 2, "y": (_0x35d10c["y"] + _0x5b7f40["y"]) / 2 }, { "x": (_0x3cc2f8["x"] + _0x50d6c3["x"]) / 2, "y": (_0x3cc2f8["y"] + _0x50d6c3["y"]) / 2 }, { "x": (_0x35d10c["x"] + _0x3cc2f8["x"]) / 2, "y": (_0x35d10c["y"] + _0x3cc2f8["y"]) / 2 }, { "x": (_0x5b7f40["x"] + _0x50d6c3["x"]) / 2, "y": (_0x5b7f40["y"] + _0x50d6c3["y"]) / 2 }];
    return { "tl": _0x35d10c, "tr": _0x3cc2f8, "bl": _0x5b7f40, "br": _0x50d6c3, "l": _0x1ea1d4, "r": _0x972083, "t": _0x42087a, "b": _0xedfbb2 };
  };
  const getBoundingRect = (_0x3d00e7, _0x466776 = 0) => {
    const _0x5c02d6 = [], _0x4af4ac = [], _0x507a11 = [];
    _0x3d00e7["forEach"]((_0x274caa) => {
      const _0x409520 = _0x274caa["getGlobalPosition"](), { tl: _0x4e1efe, tr: _0x183a9c, bl: _0x202141, br: _0x272ce5 } = getCoords(_0x409520);
      _0x5c02d6["push"](_0x4e1efe["x"], _0x183a9c["x"], _0x202141["x"], _0x272ce5["x"]), _0x4af4ac["push"](_0x4e1efe["y"], _0x183a9c["y"], _0x202141["y"], _0x272ce5["y"]), _0x507a11["push"](_0x4e1efe, _0x183a9c, _0x202141, _0x272ce5);
    });
    let _0x28f70a = Math["min"](..._0x5c02d6), _0x4e28a9 = Math["min"](..._0x4af4ac), _0x17d375 = Math["max"](..._0x5c02d6), _0x242976 = Math["max"](..._0x4af4ac);
    if (_0x466776)
      return computeOBB(_0x507a11, _0x466776);
    return { "x": _0x28f70a, "y": _0x4e28a9, "w": _0x17d375 - _0x28f70a, "h": _0x242976 - _0x4e28a9, "angle": 0 };
  };
  const getRelativeBoundingRect = (_0x242c67, _0x510a99 = 0) => {
    const _0x590ec1 = [], _0x67aba2 = [], _0x3e3f97 = [];
    _0x242c67["forEach"]((_0x1a767e) => {
      const { tl: _0x44db6e, tr: _0xfc989, bl: _0x3afb47, br: _0x141acd } = getCoords(_0x1a767e);
      _0x590ec1["push"](_0x44db6e["x"], _0xfc989["x"], _0x3afb47["x"], _0x141acd["x"]), _0x67aba2["push"](_0x44db6e["y"], _0xfc989["y"], _0x3afb47["y"], _0x141acd["y"]), _0x3e3f97["push"](_0x44db6e, _0xfc989, _0x3afb47, _0x141acd);
    });
    let _0x1ff43 = Math["min"](..._0x590ec1), _0x146736 = Math["min"](..._0x67aba2), _0x21bcaf = Math["max"](..._0x590ec1), _0x21e961 = Math["max"](..._0x67aba2);
    if (_0x510a99)
      return computeOBB(_0x3e3f97, _0x510a99);
    return { "x": _0x1ff43, "y": _0x146736, "w": _0x21bcaf - _0x1ff43, "h": _0x21e961 - _0x146736, "angle": 0 };
  };
  const getPositionRect = (_0x567f1a) => {
    const _0x3190d6 = [], _0x4d7007 = [];
    _0x567f1a["forEach"]((_0x1a6dbc) => {
      const { tl: _0x3416f6, tr: _0x1c0267, bl: _0x43a191, br: _0x52d752 } = getCoords(_0x1a6dbc);
      _0x3190d6["push"](_0x3416f6["x"], _0x1c0267["x"], _0x43a191["x"], _0x52d752["x"]), _0x4d7007["push"](_0x3416f6["y"], _0x1c0267["y"], _0x43a191["y"], _0x52d752["y"]);
    });
    let _0xa32673 = Math["min"](..._0x3190d6), _0x276d11 = Math["min"](..._0x4d7007), _0x2cf01e = Math["max"](..._0x3190d6), _0x2f519b = Math["max"](..._0x4d7007);
    return { "x": _0xa32673, "y": _0x276d11, "w": _0x2cf01e - _0xa32673, "h": _0x2f519b - _0x276d11 };
  };
  const getDOMMatrix = (_0x342f09) => {
    const { a: _0x2ca1fa, b: _0x42650d, c: _0x19aa47, d: _0x1a3a61, e: _0x12d168, f: _0x2eeb8a } = _0x342f09;
    return new DOMMatrix([_0x2ca1fa, _0x42650d, _0x19aa47, _0x1a3a61, _0x12d168, _0x2eeb8a]);
  };
  const multiplyMatrix = (_0x233506) => {
    let _0xe8eaad = getDOMMatrix(_0x233506[0]);
    for (let _0x3cb8fc = 1; _0x3cb8fc < _0x233506["length"]; _0x3cb8fc++) {
      const _0x389e64 = getDOMMatrix(_0x233506[_0x3cb8fc]);
      _0xe8eaad = _0xe8eaad["multiply"](_0x389e64);
    }
    const { a: _0x416b3c, b: _0x35ef3f, c: _0x2d4f7f, d: _0x10fc29, e: _0x29b43a, f: _0x12f89c } = _0xe8eaad;
    return { "a": _0x416b3c, "b": _0x35ef3f, "c": _0x2d4f7f, "d": _0x10fc29, "e": _0x29b43a, "f": _0x12f89c };
  };
  const getObjectCenter = (_0x3f34d1) => {
    const { x: _0x4d06ae, y: _0x5e4e2c, w: _0x48bfa1, h: _0x45ec85 } = _0x3f34d1;
    return { "x": _0x4d06ae + _0x48bfa1 / 2, "y": _0x5e4e2c + _0x45ec85 / 2 };
  };
  const getPositionCenter = (_0x49e197) => {
    const { x: _0x54abbe, y: _0x25181f, w: _0x149947, h: _0x5b66b5 } = _0x49e197;
    return { "x": _0x54abbe + _0x149947 / 2, "y": _0x25181f + _0x5b66b5 / 2 };
  };
  const composeMatrix = ({ tx = 0, ty = 0, sx = 1, sy = 1, angle = 0 }) => {
    const _0x508c30 = angle * Math["PI"] / 180, _0x318916 = Math["cos"](_0x508c30), _0x273733 = Math["sin"](_0x508c30);
    return { "a": sx * _0x318916, "b": _0x273733, "c": -_0x273733, "d": sy * _0x318916, "e": tx, "f": ty };
  };
  const decomposeMatrix = (_0x106d9b) => {
    const { rotation: _0x527c13, scale: { sx: _0x452dac, sy: _0x3a09d3 }, translate: { tx: _0x48d80e, ty: _0x31298a } } = decomposeTSR(_0x106d9b), _0x3dd943 = _0x527c13["angle"] * 180 / Math["PI"];
    return { "tx": _0x48d80e, "ty": _0x31298a, "sx": _0x452dac, "sy": _0x3a09d3, "angle": _0x3dd943 };
  };
  const getAngle = (_0x1a75ae = { "x": 0, "y": 0 }, _0x395037 = { "x": 0, "y": 0 }) => {
    const [_0x553b78, _0x38acbf] = [_0x395037["x"] - _0x1a75ae["x"], _0x395037["y"] - _0x1a75ae["y"]], _0x53a588 = Math["atan2"](_0x38acbf, _0x553b78), _0x1c13c2 = _0x53a588 * (180 / Math["PI"]);
    return (_0x1c13c2 - 90 + 360) % 360;
  };
  const isPointInside = (_0x264efd, _0x13c78a) => {
    const { tl: _0x15adc8, tr: _0x3eec7d, bl: _0x2c8574, br: _0x29bcfa } = getCoords(_0x13c78a), { x: _0x41dfc2, y: _0x1878ce } = _0x264efd;
    let _0x3b3a21 = [{ "x": _0x15adc8["x"], "y": _0x15adc8["y"] }, { "x": _0x3eec7d["x"], "y": _0x3eec7d["y"] }, { "x": _0x29bcfa["x"], "y": _0x29bcfa["y"] }, { "x": _0x2c8574["x"], "y": _0x2c8574["y"] }], _0x3be84f = ![];
    for (let _0x440570 = 0, _0x329c96 = _0x3b3a21["length"] - 1; _0x440570 < _0x3b3a21["length"]; _0x329c96 = _0x440570++) {
      _0x3b3a21[_0x440570]["y"] > _0x1878ce != _0x3b3a21[_0x329c96]["y"] > _0x1878ce && _0x41dfc2 < (_0x3b3a21[_0x329c96]["x"] - _0x3b3a21[_0x440570]["x"]) * (_0x1878ce - _0x3b3a21[_0x440570]["y"]) / (_0x3b3a21[_0x329c96]["y"] - _0x3b3a21[_0x440570]["y"]) + _0x3b3a21[_0x440570]["x"] && (_0x3be84f = !_0x3be84f);
    }
    return _0x3be84f;
  };
  const getPositionFromCoords = (_0x4f029f, _0x5923a7) => {
    let { tl: _0x5d265e, br: _0x231676, tr: _0x13df3a } = _0x4f029f;
    const _0x5cccbc = { "x": (_0x5d265e["x"] + _0x231676["x"]) / 2, "y": (_0x5d265e["y"] + _0x231676["y"]) / 2 }, _0x1ea1ed = rotatePoint(_0x5d265e, _0x5cccbc, -_0x5923a7), _0x46675c = rotatePoint(_0x13df3a, _0x5cccbc, -_0x5923a7), _0x40c18c = rotatePoint(_0x231676, _0x5cccbc, -_0x5923a7), _0x42b3d3 = _0x46675c["x"] - _0x1ea1ed["x"], _0x2a727d = _0x40c18c["y"] - _0x46675c["y"], _0x1e3442 = _0x5cccbc["x"] - _0x42b3d3 / 2, _0x3d7c87 = _0x5cccbc["y"] - _0x2a727d / 2;
    return { "x": _0x1e3442, "y": _0x3d7c87, "w": _0x42b3d3, "h": _0x2a727d, "angle": _0x5923a7 };
  };
  const getTotalMatrix = (_0x24224d, _0x5343ba = !![], _0x49c41e = ![]) => {
    const _0x3109ee = [];
    _0x5343ba && _0x3109ee["push"](_0x24224d["editor"]["viewportTransform"]);
    if (_0x49c41e) {
      const { x: _0x369ecc, y: _0x4814b8, angle: _0x5d9a8a } = _0x24224d;
      _0x3109ee["push"](composeMatrix({ "tx": _0x369ecc, "ty": _0x4814b8, "angle": _0x5d9a8a }));
    }
    const _0x44604a = (_0x326136) => {
      if (_0x326136["group"]) {
        const { x: _0x427a56, y: _0x25fd3a, angle: _0x45ba5d } = _0x326136["group"], _0x2526ec = composeMatrix({ "tx": _0x427a56, "ty": _0x25fd3a, "angle": _0x45ba5d });
        _0x3109ee["push"](_0x2526ec), _0x44604a(_0x326136["group"]);
      }
    };
    _0x44604a(_0x24224d);
    if (!_0x3109ee["length"])
      return { "a": 1, "b": 0, "c": 0, "d": 1, "e": 0, "f": 0 };
    return multiplyMatrix(_0x3109ee);
  };
  const getObjMatrix = (_0x32c95b) => {
    const { x: _0x1a4ff1, y: _0x23783e, angle: _0x35418b } = _0x32c95b;
    return composeMatrix({ "tx": _0x1a4ff1, "ty": _0x23783e, "angle": _0x35418b });
  };
  const applyMatrix = (_0x1b3dc4, _0x46b53b) => {
    const _0x3f9791 = getObjMatrix(_0x1b3dc4), { tx: _0x9b11d5, ty: _0x1c09d1, angle: _0x12daf3 } = decomposeMatrix(multiplyMatrix([_0x3f9791, _0x46b53b]));
    return _0x1b3dc4["x"] = _0x9b11d5, _0x1b3dc4["y"] = _0x1c09d1, _0x1b3dc4["angle"] = _0x12daf3, _0x1b3dc4;
  };
  const getApplyMatrixPosition = (_0xe96e5b, _0x1a3bfb) => {
    const _0x520b10 = getObjMatrix(_0xe96e5b), _0x2eaa0e = decomposeMatrix(_0x1a3bfb), { tx: _0x4d9079, ty: _0x157d43, angle: _0x429204 } = decomposeMatrix(multiplyMatrix([_0x520b10, _0x1a3bfb])), _0x23c944 = { "x": _0x4d9079, "y": _0x157d43, "angle": _0x429204, "w": _0xe96e5b["w"] * _0x2eaa0e["sx"], "h": _0xe96e5b["h"] * _0x2eaa0e["sy"] };
    return _0x23c944;
  };
  const createSvgElement = (_0x1ce9b6, _0x236c08 = {}, _0xe684e7 = {}) => {
    const _0x3f8760 = document["createElementNS"]("http://www.w3.org/2000/svg", _0x1ce9b6);
    return _0x236c08 && Object["keys"](_0x236c08)["forEach"]((_0x17f12b) => {
      _0x3f8760["setAttribute"](_0x17f12b, _0x236c08[_0x17f12b]);
    }), _0xe684e7 && Object["assign"](_0x3f8760["style"], _0xe684e7), _0x3f8760;
  };
  const updateSvgElement = (_0x488d2a, _0xff2768 = {}, _0x53d94d) => {
    Object["keys"](_0xff2768)["forEach"]((_0x1b70cc) => {
      _0x488d2a["setAttribute"](_0x1b70cc, _0xff2768[_0x1b70cc]);
    }), _0x53d94d && Object["assign"](_0x488d2a["style"], _0x53d94d);
  };
  function computeCentroid(_0x4c9186) {
    let [_0x3707b5, _0x4b74a4, _0x58843f, _0x599de7] = [_0x4c9186[0]["x"], _0x4c9186[0]["x"], _0x4c9186[0]["y"], _0x4c9186[0]["y"]];
    for (let _0x19848b of _0x4c9186) {
      _0x3707b5 = Math["min"](_0x3707b5, _0x19848b["x"]), _0x4b74a4 = Math["max"](_0x4b74a4, _0x19848b["x"]), _0x58843f = Math["min"](_0x58843f, _0x19848b["y"]), _0x599de7 = Math["max"](_0x599de7, _0x19848b["y"]);
    }
    return { "x": (_0x3707b5 + _0x4b74a4) / 2, "y": (_0x58843f + _0x599de7) / 2 };
  }
  function buildOBB(_0x545f88, _0x3e8f5a, _0x2c71f1) {
    let _0x50dbbb = { "center": _0x3e8f5a, "halfExtents": { "x": 0, "y": 0 }, "orientation": { "x": 0, "y": 0 } };
    for (let _0x1113b2 of _0x545f88) {
      let _0x3993f2 = _0x1113b2["x"] - _0x3e8f5a["x"], _0x3277f9 = _0x1113b2["y"] - _0x3e8f5a["y"], _0x22c8a8 = Math["abs"](_0x3993f2 * _0x2c71f1[0][0] + _0x3277f9 * _0x2c71f1[0][1]), _0x452b5c = Math["abs"](_0x3993f2 * _0x2c71f1[1][0] + _0x3277f9 * _0x2c71f1[1][1]);
      _0x50dbbb["halfExtents"]["x"] = Math["max"](_0x50dbbb["halfExtents"]["x"], _0x22c8a8), _0x50dbbb["halfExtents"]["y"] = Math["max"](_0x50dbbb["halfExtents"]["y"], _0x452b5c);
    }
    return _0x50dbbb["orientation"]["x"] = Math["atan2"](_0x2c71f1[0][1], _0x2c71f1[0][0]), _0x50dbbb["orientation"]["y"] = Math["atan2"](_0x2c71f1[1][1], _0x2c71f1[1][0]), _0x50dbbb;
  }
  function getAngleVectors(_0x49100d) {
    let _0x11d754 = _0x49100d * Math["PI"] / 180, _0xee2a3e = Math["cos"](_0x11d754), _0xef2309 = Math["sin"](_0x11d754), _0x420a98 = -_0xef2309, _0x38fcac = _0xee2a3e;
    return [[_0xee2a3e, _0xef2309], [_0x420a98, _0x38fcac]];
  }
  const getProjection = (_0x13a341, _0x23c563) => {
    const { x: _0x3c0d71, y: _0x5b8dab } = _0x13a341, _0x1771e6 = getAngleVectors(_0x23c563), _0x4a5193 = _0x3c0d71 * _0x1771e6[0][0] + _0x5b8dab * _0x1771e6[0][1], _0x2d924d = _0x3c0d71 * _0x1771e6[1][0] + _0x5b8dab * _0x1771e6[1][1];
    return { "xLength": _0x4a5193, "yLength": _0x2d924d };
  };
  function computeOBB(_0x18592a, _0xe4e6ba) {
    let _0x3f9628 = computeCentroid(_0x18592a), _0x55f3bf = getAngleVectors(_0xe4e6ba), { center: _0x18032d, halfExtents: _0x1f23c4 } = buildOBB(_0x18592a, _0x3f9628, _0x55f3bf);
    const _0x4ce766 = { "x": _0x18032d["x"] - _0x1f23c4["x"], "y": _0x18032d["y"] - _0x1f23c4["y"], "w": _0x1f23c4["x"] * 2, "h": _0x1f23c4["y"] * 2, "angle": _0xe4e6ba };
    return _0x4ce766;
  }
  const getPathStr = (_0x2f41b9) => _0x2f41b9["reduce"]((_0x289d63, _0x19cf43) => {
    const _0x227b62 = _0x19cf43[0];
    return _0x289d63 + (_0x227b62 + " " + _0x19cf43["slice"](1)["join"](" ") + " ");
  }, "");
  function cubicBezierBoundingBox(_0x5e99d3, _0x319a99, _0x457293, _0xc75091, _0x3a204c, _0x4e9279, _0x36d0c7, _0x50c8a6) {
    const _0xa6e357 = findBezierExtrema(_0x5e99d3, _0x457293, _0x3a204c, _0x36d0c7)["concat"](findBezierExtrema(_0x319a99, _0xc75091, _0x4e9279, _0x50c8a6)), _0xc71430 = _0xa6e357["map"]((_0x1e08e6) => bezierPoint(_0x5e99d3, _0x319a99, _0x457293, _0xc75091, _0x3a204c, _0x4e9279, _0x36d0c7, _0x50c8a6, _0x1e08e6));
    _0xc71430["push"]([_0x5e99d3, _0x319a99], [_0x36d0c7, _0x50c8a6]);
    const _0x23f410 = _0xc71430["map"]((_0x2d39cb) => _0x2d39cb[0]), _0x352dc3 = _0xc71430["map"]((_0xc8c620) => _0xc8c620[1]);
    return { "minX": Math["min"](..._0x23f410), "minY": Math["min"](..._0x352dc3), "maxX": Math["max"](..._0x23f410), "maxY": Math["max"](..._0x352dc3) };
  }
  function bezierPoint(_0x39a931, _0xd18ef9, _0x964684, _0x546f67, _0x30bd1b, _0xa00a5d, _0x425cbe, _0x3f3959, _0x168808) {
    const _0x1a013f = 1 - _0x168808, _0x8425d9 = __pow(_0x1a013f, 3) * _0x39a931 + 3 * __pow(_0x1a013f, 2) * _0x168808 * _0x964684 + 3 * _0x1a013f * __pow(_0x168808, 2) * _0x30bd1b + __pow(_0x168808, 3) * _0x425cbe, _0x5ad56a = __pow(_0x1a013f, 3) * _0xd18ef9 + 3 * __pow(_0x1a013f, 2) * _0x168808 * _0x546f67 + 3 * _0x1a013f * __pow(_0x168808, 2) * _0xa00a5d + __pow(_0x168808, 3) * _0x3f3959;
    return [_0x8425d9, _0x5ad56a];
  }
  function findBezierExtrema(_0x1a6368, _0x2feb81, _0x36d8b9, _0xac69ff) {
    const _0x33d442 = -_0x1a6368 + 3 * _0x2feb81 - 3 * _0x36d8b9 + _0xac69ff, _0x3d4ba0 = 2 * (_0x1a6368 - 2 * _0x2feb81 + _0x36d8b9), _0x2a83ba = -_0x1a6368 + _0x2feb81, _0x761162 = __pow(_0x3d4ba0, 2) - 4 * _0x33d442 * _0x2a83ba;
    if (_0x761162 < 0)
      return [];
    if (_0x33d442 === 0)
      return _0x3d4ba0 === 0 ? [] : [-_0x2a83ba / _0x3d4ba0]["filter"]((_0x55dd86) => _0x55dd86 >= 0 && _0x55dd86 <= 1);
    const _0x589580 = (-_0x3d4ba0 + Math["sqrt"](_0x761162)) / (2 * _0x33d442), _0x1a72b9 = (-_0x3d4ba0 - Math["sqrt"](_0x761162)) / (2 * _0x33d442);
    return [_0x589580, _0x1a72b9]["filter"]((_0xd10013) => _0xd10013 >= 0 && _0xd10013 <= 1);
  }
  const getPathBoundingBox = (_0x3973f5) => {
    let _0x59b3b8 = Infinity, _0x1ea790 = Infinity, _0x455a73 = -Infinity, _0x455294 = -Infinity, _0x461203 = 0, _0xa6e1b9 = 0;
    return _0x3973f5["forEach"]((_0x408a8d) => {
      const _0x3c69ca = _0x408a8d[0], _0x6c5c87 = _0x408a8d["slice"](1);
      switch (_0x3c69ca) {
        case "M":
          _0x461203 = _0x6c5c87[0], _0xa6e1b9 = _0x6c5c87[1];
          break;
        case "L":
          _0x6c5c87["forEach"]((_0xad69cb, _0x1695a1) => {
            _0x1695a1 % 2 === 0 ? _0x461203 = _0xad69cb : _0xa6e1b9 = _0xad69cb, _0x59b3b8 = Math["min"](_0x59b3b8, _0x461203), _0x1ea790 = Math["min"](_0x1ea790, _0xa6e1b9), _0x455a73 = Math["max"](_0x455a73, _0x461203), _0x455294 = Math["max"](_0x455294, _0xa6e1b9);
          });
          break;
        case "C":
          for (let _0x4bc3ec = 0; _0x4bc3ec < _0x6c5c87["length"]; _0x4bc3ec += 6) {
            const _0x496745 = _0x461203, _0x49e0c9 = _0xa6e1b9, [_0x89d27d, _0x952fe6, _0x374ab5, _0x1f354a, _0x14c48e, _0x21defd] = _0x6c5c87["slice"](_0x4bc3ec, _0x4bc3ec + 6), _0x2f96d6 = cubicBezierBoundingBox(_0x496745, _0x49e0c9, _0x89d27d, _0x952fe6, _0x374ab5, _0x1f354a, _0x14c48e, _0x21defd);
            _0x59b3b8 = Math["min"](_0x59b3b8, _0x2f96d6["minX"]), _0x1ea790 = Math["min"](_0x1ea790, _0x2f96d6["minY"]), _0x455a73 = Math["max"](_0x455a73, _0x2f96d6["maxX"]), _0x455294 = Math["max"](_0x455294, _0x2f96d6["maxY"]), _0x461203 = _0x14c48e, _0xa6e1b9 = _0x21defd;
          }
          break;
      }
    }), { "x": _0x59b3b8, "y": _0x1ea790, "width": _0x455a73 - _0x59b3b8, "height": _0x455294 - _0x1ea790 };
  };
  const isPointOnBezierCurve = (_0x293313, _0x6524f2, _0x2581e9, _0x5a9b65, _0x2dd6a5, _0x1d8538, _0x5e203a, _0x2051b0, _0x4e36ea, _0x105bec, _0x2cabf9 = 2.5) => {
    let _0x434cda = null;
    for (let _0x2aaafe = 0; _0x2aaafe <= 1; _0x2aaafe += 2e-3) {
      let [_0x105b37, _0x44b09e] = bezierPoint(_0x2581e9, _0x5a9b65, _0x2dd6a5, _0x1d8538, _0x5e203a, _0x2051b0, _0x4e36ea, _0x105bec, _0x2aaafe);
      if (Math["abs"](_0x105b37 - _0x293313) < _0x2cabf9 && Math["abs"](_0x44b09e - _0x6524f2) < _0x2cabf9) {
        _0x434cda = { "x": _0x105b37, "y": _0x44b09e, "t": _0x2aaafe };
        break;
      }
    }
    return _0x434cda;
  };
  const isPointArroundPath = (_0x2b36b6, _0x1e71c0, _0x3d6348) => {
    let _0x3c9d5c = null;
    for (let _0x2d9304 = 0; _0x2d9304 < _0x1e71c0["length"] - 1; _0x2d9304++) {
      const _0x2b4e31 = _0x1e71c0[_0x2d9304], _0x3e9fba = _0x1e71c0[_0x2d9304 + 1];
      let _0x40feb4 = [_0x2b36b6["x"], _0x2b36b6["y"]];
      _0x40feb4 = _0x40feb4["concat"](_0x2d9304 === 0 ? [_0x2b4e31[1], _0x2b4e31[2]] : [_0x2b4e31[5], _0x2b4e31[6]]), _0x40feb4 = _0x40feb4["concat"](_0x3e9fba["slice"](1)), _0x40feb4["push"](_0x3d6348);
      const _0x327e83 = isPointOnBezierCurve["apply"](null, _0x40feb4);
      if (_0x327e83) {
        _0x3c9d5c = { "index": _0x2d9304 + 1, "x": _0x327e83["x"], "y": _0x327e83["y"], "t": _0x327e83["t"] };
        break;
      }
    }
    return _0x3c9d5c;
  };
  const splitBezierCurve = (_0x1b3b69, _0x50696a, _0x2ae8a5, _0x5ef558, _0x55a2cc) => {
    const _0x5d2b67 = lerp(_0x1b3b69, _0x50696a, _0x55a2cc), _0x12e37d = lerp(_0x50696a, _0x2ae8a5, _0x55a2cc), _0x544921 = lerp(_0x2ae8a5, _0x5ef558, _0x55a2cc), _0x2da42a = lerp(_0x5d2b67, _0x12e37d, _0x55a2cc), _0x15f639 = lerp(_0x12e37d, _0x544921, _0x55a2cc), _0x38e80e = lerp(_0x2da42a, _0x15f639, _0x55a2cc);
    return [[_0x1b3b69, _0x5d2b67, _0x2da42a, _0x38e80e], [_0x38e80e, _0x15f639, _0x544921, _0x5ef558]];
  };
  const lerp = (_0x35bd1f, _0x57c6f8, _0x407d78) => {
    return { "x": _0x35bd1f["x"] + (_0x57c6f8["x"] - _0x35bd1f["x"]) * _0x407d78, "y": _0x35bd1f["y"] + (_0x57c6f8["y"] - _0x35bd1f["y"]) * _0x407d78 };
  };
  const getDistance = (_0x262616, _0x4aeb61) => {
    let _0x58d7e5 = _0x262616["x"] - _0x4aeb61["x"], _0x208d9f = _0x262616["y"] - _0x4aeb61["y"];
    return Math["sqrt"](_0x58d7e5 * _0x58d7e5 + _0x208d9f * _0x208d9f);
  };
  const isPointArroundPolyline = (_0x19e4a7, _0x440b65, _0x17185e = 1) => {
    const { x: _0x1e4e35, y: _0x252cff } = _0x440b65, _0xd19a22 = (_0x16b6db, _0x1848a1) => {
      let { x: _0x16b604, y: _0x20846c } = _0x16b6db, { x: _0x6fe562, y: _0x11e62f } = _0x1848a1, _0x37661d = _0x1e4e35 - _0x16b604, _0x192159 = _0x252cff - _0x20846c, _0x3312d7 = _0x6fe562 - _0x16b604, _0x31dba5 = _0x11e62f - _0x20846c, _0x1e8c8b = _0x37661d * _0x3312d7 + _0x192159 * _0x31dba5, _0x4d1f9e = _0x3312d7 * _0x3312d7 + _0x31dba5 * _0x31dba5, _0x2872e6 = -1;
      _0x4d1f9e !== 0 && (_0x2872e6 = _0x1e8c8b / _0x4d1f9e);
      let _0x56c241, _0x243d91;
      if (_0x2872e6 < 0)
        _0x56c241 = _0x16b604, _0x243d91 = _0x20846c;
      else
        _0x2872e6 > 1 ? (_0x56c241 = _0x6fe562, _0x243d91 = _0x11e62f) : (_0x56c241 = _0x16b604 + _0x2872e6 * _0x3312d7, _0x243d91 = _0x20846c + _0x2872e6 * _0x31dba5);
      let _0x59e0db = _0x1e4e35 - _0x56c241, _0x23afdd = _0x252cff - _0x243d91;
      return Math["sqrt"](_0x59e0db * _0x59e0db + _0x23afdd * _0x23afdd);
    };
    let [_0x10b316, _0x40030b, _0x56f355] = [![], { "x": 0, "y": 0 }, -1];
    for (let _0x3bf7c0 = 0; _0x3bf7c0 < _0x19e4a7["length"] - 1; _0x3bf7c0++) {
      const _0xaf32bc = _0xd19a22(_0x19e4a7[_0x3bf7c0], _0x19e4a7[_0x3bf7c0 + 1]);
      if (_0xaf32bc <= _0x17185e) {
        _0x10b316 = !![], _0x40030b = { "x": (_0x19e4a7[_0x3bf7c0]["x"] + _0x19e4a7[_0x3bf7c0 + 1]["x"]) / 2, "y": (_0x19e4a7[_0x3bf7c0]["y"] + _0x19e4a7[_0x3bf7c0 + 1]["y"]) / 2 }, _0x56f355 = _0x3bf7c0 + 1;
        break;
      }
    }
    return { "isArround": _0x10b316, "x": _0x40030b["x"], "y": _0x40030b["y"], "index": _0x56f355 };
  };
  const resetGroupSubsSize = (_0x1d2564, _0x5d8815) => {
    const _0x578bf0 = _0x1d2564["w"] / _0x5d8815["w"], _0x5c89d2 = _0x1d2564["h"] / _0x5d8815["h"];
    _0x1d2564["objects"]["forEach"]((_0x5bb8cf) => {
      const _0x123707 = { "w": _0x5bb8cf["w"], "h": _0x5bb8cf["h"] }, _0x48c483 = getCoords(_0x5bb8cf);
      Object["values"](_0x48c483)["forEach"]((_0x8b80ca) => {
        _0x8b80ca["x"] = _0x8b80ca["x"] * _0x578bf0, _0x8b80ca["y"] = _0x8b80ca["y"] * _0x5c89d2;
      });
      const { x: _0x2c5d6b, y: _0x33abce, w: _0x5dd155, h: _0x3909dd } = getPositionFromCoords(_0x48c483, _0x5bb8cf["angle"]);
      _0x5bb8cf["x"] = _0x2c5d6b, _0x5bb8cf["y"] = _0x33abce, _0x5bb8cf["w"] = _0x5dd155, _0x5bb8cf["h"] = _0x3909dd;
      if (_0x5bb8cf["type"] === "polyline") {
        const _0x51791b = _0x5bb8cf["points"];
        _0x5bb8cf["points"]["forEach"]((_0x5a5795, _0x219940) => {
          _0x5a5795["x"] = _0x51791b[_0x219940]["x"] * _0x578bf0, _0x5a5795["y"] = _0x51791b[_0x219940]["y"] * _0x5c89d2;
        });
      } else {
        if (_0x5bb8cf["type"] === "bezierCurve") {
          const _0x482d41 = _0x5bb8cf["path"];
          _0x5bb8cf["path"]["forEach"]((_0x12538a, _0x48e95a) => {
            _0x12538a["forEach"]((_0x309edd, _0x3a7f6e) => {
              if (_0x3a7f6e > 0) {
                const _0x554cdc = _0x482d41[_0x48e95a][_0x3a7f6e];
                _0x12538a[_0x3a7f6e] = _0x3a7f6e % 2 === 0 ? _0x554cdc * _0x5c89d2 : _0x554cdc * _0x578bf0;
              }
            });
          });
        }
      }
      _0x5bb8cf["type"] === "group" && resetGroupSubsSize(_0x5bb8cf, _0x123707);
    });
  };
  const resetGroupPosition = (_0x598807) => {
    if (_0x598807["objects"]["length"]) {
      const { x: _0x169663, y: _0x33ecd5, w: _0x47fb9d, h: _0x6474ec, angle: _0x111dca } = _0x598807["editor"]["calcGroupPositionBySubs"](_0x598807);
      let [_0x479e8d, _0x14774f] = [_0x598807["x"] - _0x169663, _0x598807["y"] - _0x33ecd5];
      const _0x13d051 = { "x": _0x598807["x"], "y": _0x598807["y"] }, _0xb8a06a = { "x": _0x598807["x"] + _0x598807["w"] / 2, "y": _0x598807["y"] + _0x598807["h"] / 2 }, _0x5a8004 = { "x": _0x169663 + _0x47fb9d / 2, "y": _0x33ecd5 + _0x6474ec / 2 }, _0x56b996 = { "x": _0x169663, "y": _0x33ecd5 }, _0x546bcb = rotatePoint(_0x13d051, _0xb8a06a, _0x111dca), _0x2d28c7 = rotatePoint(_0x56b996, _0x5a8004, _0x111dca);
      _0x479e8d = _0x546bcb["x"] - _0x2d28c7["x"], _0x14774f = _0x546bcb["y"] - _0x2d28c7["y"];
      const { xLength: _0x49a70c, yLength: _0x3d1948 } = getProjection({ "x": _0x479e8d, "y": _0x14774f }, _0x598807["angle"]);
      _0x479e8d = _0x49a70c, _0x14774f = _0x3d1948, _0x598807["objects"]["forEach"]((_0x234f68) => {
        _0x234f68["x"] += _0x479e8d, _0x234f68["y"] += _0x14774f;
      }), _0x598807["x"] = _0x169663, _0x598807["y"] = _0x33ecd5, _0x598807["w"] = _0x47fb9d, _0x598807["h"] = _0x6474ec, _0x598807["angle"] = _0x111dca, _0x598807["group"] && resetGroupPosition(_0x598807["group"]);
    } else
      _0x598807["w"] = 0, _0x598807["h"] = 0;
  };
  var commonjsGlobal = typeof globalThis !== "undefined" ? globalThis : typeof window !== "undefined" ? window : typeof global !== "undefined" ? global : typeof self !== "undefined" ? self : {};
  function getDefaultExportFromCjs(x) {
    return x && x.__esModule && Object.prototype.hasOwnProperty.call(x, "default") ? x["default"] : x;
  }
  function commonjsRequire(path) {
    throw new Error('Could not dynamically require "' + path + '". Please configure the dynamicRequireTargets or/and ignoreDynamicRequires option of @rollup/plugin-commonjs appropriately for this require call to work.');
  }
  var localforage = { exports: {} };
  /*!
      localForage -- Offline Storage, Improved
      Version 1.10.0
      https://localforage.github.io/localForage
      (c) 2013-2017 Mozilla, Apache License 2.0
  */
  (function(module2, exports3) {
    (function(f) {
      {
        module2.exports = f();
      }
    })(function() {
      return function e(t, n, r) {
        function s(o2, u) {
          if (!n[o2]) {
            if (!t[o2]) {
              var a = typeof commonjsRequire == "function" && commonjsRequire;
              if (!u && a)
                return a(o2, true);
              if (i)
                return i(o2, true);
              var f = new Error("Cannot find module '" + o2 + "'");
              throw f.code = "MODULE_NOT_FOUND", f;
            }
            var l = n[o2] = { exports: {} };
            t[o2][0].call(l.exports, function(e2) {
              var n2 = t[o2][1][e2];
              return s(n2 ? n2 : e2);
            }, l, l.exports, e, t, n, r);
          }
          return n[o2].exports;
        }
        var i = typeof commonjsRequire == "function" && commonjsRequire;
        for (var o = 0; o < r.length; o++)
          s(r[o]);
        return s;
      }({ 1: [function(_dereq_, module3, exports4) {
        (function(global2) {
          var Mutation = global2.MutationObserver || global2.WebKitMutationObserver;
          var scheduleDrain;
          {
            if (Mutation) {
              var called = 0;
              var observer = new Mutation(nextTick);
              var element = global2.document.createTextNode("");
              observer.observe(element, {
                characterData: true
              });
              scheduleDrain = function() {
                element.data = called = ++called % 2;
              };
            } else if (!global2.setImmediate && typeof global2.MessageChannel !== "undefined") {
              var channel = new global2.MessageChannel();
              channel.port1.onmessage = nextTick;
              scheduleDrain = function() {
                channel.port2.postMessage(0);
              };
            } else if ("document" in global2 && "onreadystatechange" in global2.document.createElement("script")) {
              scheduleDrain = function() {
                var scriptEl = global2.document.createElement("script");
                scriptEl.onreadystatechange = function() {
                  nextTick();
                  scriptEl.onreadystatechange = null;
                  scriptEl.parentNode.removeChild(scriptEl);
                  scriptEl = null;
                };
                global2.document.documentElement.appendChild(scriptEl);
              };
            } else {
              scheduleDrain = function() {
                setTimeout(nextTick, 0);
              };
            }
          }
          var draining;
          var queue = [];
          function nextTick() {
            draining = true;
            var i, oldQueue;
            var len = queue.length;
            while (len) {
              oldQueue = queue;
              queue = [];
              i = -1;
              while (++i < len) {
                oldQueue[i]();
              }
              len = queue.length;
            }
            draining = false;
          }
          module3.exports = immediate;
          function immediate(task) {
            if (queue.push(task) === 1 && !draining) {
              scheduleDrain();
            }
          }
        }).call(this, typeof commonjsGlobal !== "undefined" ? commonjsGlobal : typeof self !== "undefined" ? self : typeof window !== "undefined" ? window : {});
      }, {}], 2: [function(_dereq_, module3, exports4) {
        var immediate = _dereq_(1);
        function INTERNAL() {
        }
        var handlers = {};
        var REJECTED = ["REJECTED"];
        var FULFILLED = ["FULFILLED"];
        var PENDING = ["PENDING"];
        module3.exports = Promise2;
        function Promise2(resolver) {
          if (typeof resolver !== "function") {
            throw new TypeError("resolver must be a function");
          }
          this.state = PENDING;
          this.queue = [];
          this.outcome = void 0;
          if (resolver !== INTERNAL) {
            safelyResolveThenable(this, resolver);
          }
        }
        Promise2.prototype["catch"] = function(onRejected) {
          return this.then(null, onRejected);
        };
        Promise2.prototype.then = function(onFulfilled, onRejected) {
          if (typeof onFulfilled !== "function" && this.state === FULFILLED || typeof onRejected !== "function" && this.state === REJECTED) {
            return this;
          }
          var promise = new this.constructor(INTERNAL);
          if (this.state !== PENDING) {
            var resolver = this.state === FULFILLED ? onFulfilled : onRejected;
            unwrap(promise, resolver, this.outcome);
          } else {
            this.queue.push(new QueueItem(promise, onFulfilled, onRejected));
          }
          return promise;
        };
        function QueueItem(promise, onFulfilled, onRejected) {
          this.promise = promise;
          if (typeof onFulfilled === "function") {
            this.onFulfilled = onFulfilled;
            this.callFulfilled = this.otherCallFulfilled;
          }
          if (typeof onRejected === "function") {
            this.onRejected = onRejected;
            this.callRejected = this.otherCallRejected;
          }
        }
        QueueItem.prototype.callFulfilled = function(value) {
          handlers.resolve(this.promise, value);
        };
        QueueItem.prototype.otherCallFulfilled = function(value) {
          unwrap(this.promise, this.onFulfilled, value);
        };
        QueueItem.prototype.callRejected = function(value) {
          handlers.reject(this.promise, value);
        };
        QueueItem.prototype.otherCallRejected = function(value) {
          unwrap(this.promise, this.onRejected, value);
        };
        function unwrap(promise, func, value) {
          immediate(function() {
            var returnValue;
            try {
              returnValue = func(value);
            } catch (e) {
              return handlers.reject(promise, e);
            }
            if (returnValue === promise) {
              handlers.reject(promise, new TypeError("Cannot resolve promise with itself"));
            } else {
              handlers.resolve(promise, returnValue);
            }
          });
        }
        handlers.resolve = function(self2, value) {
          var result = tryCatch(getThen, value);
          if (result.status === "error") {
            return handlers.reject(self2, result.value);
          }
          var thenable = result.value;
          if (thenable) {
            safelyResolveThenable(self2, thenable);
          } else {
            self2.state = FULFILLED;
            self2.outcome = value;
            var i = -1;
            var len = self2.queue.length;
            while (++i < len) {
              self2.queue[i].callFulfilled(value);
            }
          }
          return self2;
        };
        handlers.reject = function(self2, error) {
          self2.state = REJECTED;
          self2.outcome = error;
          var i = -1;
          var len = self2.queue.length;
          while (++i < len) {
            self2.queue[i].callRejected(error);
          }
          return self2;
        };
        function getThen(obj) {
          var then = obj && obj.then;
          if (obj && (typeof obj === "object" || typeof obj === "function") && typeof then === "function") {
            return function appyThen() {
              then.apply(obj, arguments);
            };
          }
        }
        function safelyResolveThenable(self2, thenable) {
          var called = false;
          function onError(value) {
            if (called) {
              return;
            }
            called = true;
            handlers.reject(self2, value);
          }
          function onSuccess(value) {
            if (called) {
              return;
            }
            called = true;
            handlers.resolve(self2, value);
          }
          function tryToUnwrap() {
            thenable(onSuccess, onError);
          }
          var result = tryCatch(tryToUnwrap);
          if (result.status === "error") {
            onError(result.value);
          }
        }
        function tryCatch(func, value) {
          var out = {};
          try {
            out.value = func(value);
            out.status = "success";
          } catch (e) {
            out.status = "error";
            out.value = e;
          }
          return out;
        }
        Promise2.resolve = resolve;
        function resolve(value) {
          if (value instanceof this) {
            return value;
          }
          return handlers.resolve(new this(INTERNAL), value);
        }
        Promise2.reject = reject;
        function reject(reason) {
          var promise = new this(INTERNAL);
          return handlers.reject(promise, reason);
        }
        Promise2.all = all;
        function all(iterable) {
          var self2 = this;
          if (Object.prototype.toString.call(iterable) !== "[object Array]") {
            return this.reject(new TypeError("must be an array"));
          }
          var len = iterable.length;
          var called = false;
          if (!len) {
            return this.resolve([]);
          }
          var values = new Array(len);
          var resolved = 0;
          var i = -1;
          var promise = new this(INTERNAL);
          while (++i < len) {
            allResolver(iterable[i], i);
          }
          return promise;
          function allResolver(value, i2) {
            self2.resolve(value).then(resolveFromAll, function(error) {
              if (!called) {
                called = true;
                handlers.reject(promise, error);
              }
            });
            function resolveFromAll(outValue) {
              values[i2] = outValue;
              if (++resolved === len && !called) {
                called = true;
                handlers.resolve(promise, values);
              }
            }
          }
        }
        Promise2.race = race;
        function race(iterable) {
          var self2 = this;
          if (Object.prototype.toString.call(iterable) !== "[object Array]") {
            return this.reject(new TypeError("must be an array"));
          }
          var len = iterable.length;
          var called = false;
          if (!len) {
            return this.resolve([]);
          }
          var i = -1;
          var promise = new this(INTERNAL);
          while (++i < len) {
            resolver(iterable[i]);
          }
          return promise;
          function resolver(value) {
            self2.resolve(value).then(function(response) {
              if (!called) {
                called = true;
                handlers.resolve(promise, response);
              }
            }, function(error) {
              if (!called) {
                called = true;
                handlers.reject(promise, error);
              }
            });
          }
        }
      }, { "1": 1 }], 3: [function(_dereq_, module3, exports4) {
        (function(global2) {
          if (typeof global2.Promise !== "function") {
            global2.Promise = _dereq_(2);
          }
        }).call(this, typeof commonjsGlobal !== "undefined" ? commonjsGlobal : typeof self !== "undefined" ? self : typeof window !== "undefined" ? window : {});
      }, { "2": 2 }], 4: [function(_dereq_, module3, exports4) {
        var _typeof = typeof Symbol === "function" && typeof Symbol.iterator === "symbol" ? function(obj) {
          return typeof obj;
        } : function(obj) {
          return obj && typeof Symbol === "function" && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj;
        };
        function _classCallCheck(instance, Constructor) {
          if (!(instance instanceof Constructor)) {
            throw new TypeError("Cannot call a class as a function");
          }
        }
        function getIDB() {
          try {
            if (typeof indexedDB !== "undefined") {
              return indexedDB;
            }
            if (typeof webkitIndexedDB !== "undefined") {
              return webkitIndexedDB;
            }
            if (typeof mozIndexedDB !== "undefined") {
              return mozIndexedDB;
            }
            if (typeof OIndexedDB !== "undefined") {
              return OIndexedDB;
            }
            if (typeof msIndexedDB !== "undefined") {
              return msIndexedDB;
            }
          } catch (e) {
            return;
          }
        }
        var idb = getIDB();
        function isIndexedDBValid() {
          try {
            if (!idb || !idb.open) {
              return false;
            }
            var isSafari = typeof openDatabase !== "undefined" && /(Safari|iPhone|iPad|iPod)/.test(navigator.userAgent) && !/Chrome/.test(navigator.userAgent) && !/BlackBerry/.test(navigator.platform);
            var hasFetch = typeof fetch === "function" && fetch.toString().indexOf("[native code") !== -1;
            return (!isSafari || hasFetch) && typeof indexedDB !== "undefined" && // some outdated implementations of IDB that appear on Samsung
            // and HTC Android devices <4.4 are missing IDBKeyRange
            // See: https://github.com/mozilla/localForage/issues/128
            // See: https://github.com/mozilla/localForage/issues/272
            typeof IDBKeyRange !== "undefined";
          } catch (e) {
            return false;
          }
        }
        function createBlob(parts, properties) {
          parts = parts || [];
          properties = properties || {};
          try {
            return new Blob(parts, properties);
          } catch (e) {
            if (e.name !== "TypeError") {
              throw e;
            }
            var Builder = typeof BlobBuilder !== "undefined" ? BlobBuilder : typeof MSBlobBuilder !== "undefined" ? MSBlobBuilder : typeof MozBlobBuilder !== "undefined" ? MozBlobBuilder : WebKitBlobBuilder;
            var builder = new Builder();
            for (var i = 0; i < parts.length; i += 1) {
              builder.append(parts[i]);
            }
            return builder.getBlob(properties.type);
          }
        }
        if (typeof Promise === "undefined") {
          _dereq_(3);
        }
        var Promise$12 = Promise;
        function executeCallback(promise, callback) {
          if (callback) {
            promise.then(function(result) {
              callback(null, result);
            }, function(error) {
              callback(error);
            });
          }
        }
        function executeTwoCallbacks(promise, callback, errorCallback) {
          if (typeof callback === "function") {
            promise.then(callback);
          }
          if (typeof errorCallback === "function") {
            promise["catch"](errorCallback);
          }
        }
        function normalizeKey(key2) {
          if (typeof key2 !== "string") {
            console.warn(key2 + " used as a key, but it is not a string.");
            key2 = String(key2);
          }
          return key2;
        }
        function getCallback() {
          if (arguments.length && typeof arguments[arguments.length - 1] === "function") {
            return arguments[arguments.length - 1];
          }
        }
        var DETECT_BLOB_SUPPORT_STORE = "local-forage-detect-blob-support";
        var supportsBlobs = void 0;
        var dbContexts = {};
        var toString2 = Object.prototype.toString;
        var READ_ONLY = "readonly";
        var READ_WRITE = "readwrite";
        function _binStringToArrayBuffer(bin) {
          var length2 = bin.length;
          var buf = new ArrayBuffer(length2);
          var arr = new Uint8Array(buf);
          for (var i = 0; i < length2; i++) {
            arr[i] = bin.charCodeAt(i);
          }
          return buf;
        }
        function _checkBlobSupportWithoutCaching(idb2) {
          return new Promise$12(function(resolve) {
            var txn = idb2.transaction(DETECT_BLOB_SUPPORT_STORE, READ_WRITE);
            var blob = createBlob([""]);
            txn.objectStore(DETECT_BLOB_SUPPORT_STORE).put(blob, "key");
            txn.onabort = function(e) {
              e.preventDefault();
              e.stopPropagation();
              resolve(false);
            };
            txn.oncomplete = function() {
              var matchedChrome = navigator.userAgent.match(/Chrome\/(\d+)/);
              var matchedEdge = navigator.userAgent.match(/Edge\//);
              resolve(matchedEdge || !matchedChrome || parseInt(matchedChrome[1], 10) >= 43);
            };
          })["catch"](function() {
            return false;
          });
        }
        function _checkBlobSupport(idb2) {
          if (typeof supportsBlobs === "boolean") {
            return Promise$12.resolve(supportsBlobs);
          }
          return _checkBlobSupportWithoutCaching(idb2).then(function(value) {
            supportsBlobs = value;
            return supportsBlobs;
          });
        }
        function _deferReadiness(dbInfo) {
          var dbContext = dbContexts[dbInfo.name];
          var deferredOperation = {};
          deferredOperation.promise = new Promise$12(function(resolve, reject) {
            deferredOperation.resolve = resolve;
            deferredOperation.reject = reject;
          });
          dbContext.deferredOperations.push(deferredOperation);
          if (!dbContext.dbReady) {
            dbContext.dbReady = deferredOperation.promise;
          } else {
            dbContext.dbReady = dbContext.dbReady.then(function() {
              return deferredOperation.promise;
            });
          }
        }
        function _advanceReadiness(dbInfo) {
          var dbContext = dbContexts[dbInfo.name];
          var deferredOperation = dbContext.deferredOperations.pop();
          if (deferredOperation) {
            deferredOperation.resolve();
            return deferredOperation.promise;
          }
        }
        function _rejectReadiness(dbInfo, err) {
          var dbContext = dbContexts[dbInfo.name];
          var deferredOperation = dbContext.deferredOperations.pop();
          if (deferredOperation) {
            deferredOperation.reject(err);
            return deferredOperation.promise;
          }
        }
        function _getConnection(dbInfo, upgradeNeeded) {
          return new Promise$12(function(resolve, reject) {
            dbContexts[dbInfo.name] = dbContexts[dbInfo.name] || createDbContext();
            if (dbInfo.db) {
              if (upgradeNeeded) {
                _deferReadiness(dbInfo);
                dbInfo.db.close();
              } else {
                return resolve(dbInfo.db);
              }
            }
            var dbArgs = [dbInfo.name];
            if (upgradeNeeded) {
              dbArgs.push(dbInfo.version);
            }
            var openreq = idb.open.apply(idb, dbArgs);
            if (upgradeNeeded) {
              openreq.onupgradeneeded = function(e) {
                var db = openreq.result;
                try {
                  db.createObjectStore(dbInfo.storeName);
                  if (e.oldVersion <= 1) {
                    db.createObjectStore(DETECT_BLOB_SUPPORT_STORE);
                  }
                } catch (ex) {
                  if (ex.name === "ConstraintError") {
                    console.warn('The database "' + dbInfo.name + '" has been upgraded from version ' + e.oldVersion + " to version " + e.newVersion + ', but the storage "' + dbInfo.storeName + '" already exists.');
                  } else {
                    throw ex;
                  }
                }
              };
            }
            openreq.onerror = function(e) {
              e.preventDefault();
              reject(openreq.error);
            };
            openreq.onsuccess = function() {
              var db = openreq.result;
              db.onversionchange = function(e) {
                e.target.close();
              };
              resolve(db);
              _advanceReadiness(dbInfo);
            };
          });
        }
        function _getOriginalConnection(dbInfo) {
          return _getConnection(dbInfo, false);
        }
        function _getUpgradedConnection(dbInfo) {
          return _getConnection(dbInfo, true);
        }
        function _isUpgradeNeeded(dbInfo, defaultVersion) {
          if (!dbInfo.db) {
            return true;
          }
          var isNewStore = !dbInfo.db.objectStoreNames.contains(dbInfo.storeName);
          var isDowngrade = dbInfo.version < dbInfo.db.version;
          var isUpgrade = dbInfo.version > dbInfo.db.version;
          if (isDowngrade) {
            if (dbInfo.version !== defaultVersion) {
              console.warn('The database "' + dbInfo.name + `" can't be downgraded from version ` + dbInfo.db.version + " to version " + dbInfo.version + ".");
            }
            dbInfo.version = dbInfo.db.version;
          }
          if (isUpgrade || isNewStore) {
            if (isNewStore) {
              var incVersion = dbInfo.db.version + 1;
              if (incVersion > dbInfo.version) {
                dbInfo.version = incVersion;
              }
            }
            return true;
          }
          return false;
        }
        function _encodeBlob(blob) {
          return new Promise$12(function(resolve, reject) {
            var reader = new FileReader();
            reader.onerror = reject;
            reader.onloadend = function(e) {
              var base64 = btoa(e.target.result || "");
              resolve({
                __local_forage_encoded_blob: true,
                data: base64,
                type: blob.type
              });
            };
            reader.readAsBinaryString(blob);
          });
        }
        function _decodeBlob(encodedBlob) {
          var arrayBuff = _binStringToArrayBuffer(atob(encodedBlob.data));
          return createBlob([arrayBuff], { type: encodedBlob.type });
        }
        function _isEncodedBlob(value) {
          return value && value.__local_forage_encoded_blob;
        }
        function _fullyReady(callback) {
          var self2 = this;
          var promise = self2._initReady().then(function() {
            var dbContext = dbContexts[self2._dbInfo.name];
            if (dbContext && dbContext.dbReady) {
              return dbContext.dbReady;
            }
          });
          executeTwoCallbacks(promise, callback, callback);
          return promise;
        }
        function _tryReconnect(dbInfo) {
          _deferReadiness(dbInfo);
          var dbContext = dbContexts[dbInfo.name];
          var forages = dbContext.forages;
          for (var i = 0; i < forages.length; i++) {
            var forage = forages[i];
            if (forage._dbInfo.db) {
              forage._dbInfo.db.close();
              forage._dbInfo.db = null;
            }
          }
          dbInfo.db = null;
          return _getOriginalConnection(dbInfo).then(function(db) {
            dbInfo.db = db;
            if (_isUpgradeNeeded(dbInfo)) {
              return _getUpgradedConnection(dbInfo);
            }
            return db;
          }).then(function(db) {
            dbInfo.db = dbContext.db = db;
            for (var i2 = 0; i2 < forages.length; i2++) {
              forages[i2]._dbInfo.db = db;
            }
          })["catch"](function(err) {
            _rejectReadiness(dbInfo, err);
            throw err;
          });
        }
        function createTransaction(dbInfo, mode, callback, retries) {
          if (retries === void 0) {
            retries = 1;
          }
          try {
            var tx = dbInfo.db.transaction(dbInfo.storeName, mode);
            callback(null, tx);
          } catch (err) {
            if (retries > 0 && (!dbInfo.db || err.name === "InvalidStateError" || err.name === "NotFoundError")) {
              return Promise$12.resolve().then(function() {
                if (!dbInfo.db || err.name === "NotFoundError" && !dbInfo.db.objectStoreNames.contains(dbInfo.storeName) && dbInfo.version <= dbInfo.db.version) {
                  if (dbInfo.db) {
                    dbInfo.version = dbInfo.db.version + 1;
                  }
                  return _getUpgradedConnection(dbInfo);
                }
              }).then(function() {
                return _tryReconnect(dbInfo).then(function() {
                  createTransaction(dbInfo, mode, callback, retries - 1);
                });
              })["catch"](callback);
            }
            callback(err);
          }
        }
        function createDbContext() {
          return {
            // Running localForages sharing a database.
            forages: [],
            // Shared database.
            db: null,
            // Database readiness (promise).
            dbReady: null,
            // Deferred operations on the database.
            deferredOperations: []
          };
        }
        function _initStorage(options) {
          var self2 = this;
          var dbInfo = {
            db: null
          };
          if (options) {
            for (var i in options) {
              dbInfo[i] = options[i];
            }
          }
          var dbContext = dbContexts[dbInfo.name];
          if (!dbContext) {
            dbContext = createDbContext();
            dbContexts[dbInfo.name] = dbContext;
          }
          dbContext.forages.push(self2);
          if (!self2._initReady) {
            self2._initReady = self2.ready;
            self2.ready = _fullyReady;
          }
          var initPromises = [];
          function ignoreErrors() {
            return Promise$12.resolve();
          }
          for (var j = 0; j < dbContext.forages.length; j++) {
            var forage = dbContext.forages[j];
            if (forage !== self2) {
              initPromises.push(forage._initReady()["catch"](ignoreErrors));
            }
          }
          var forages = dbContext.forages.slice(0);
          return Promise$12.all(initPromises).then(function() {
            dbInfo.db = dbContext.db;
            return _getOriginalConnection(dbInfo);
          }).then(function(db) {
            dbInfo.db = db;
            if (_isUpgradeNeeded(dbInfo, self2._defaultConfig.version)) {
              return _getUpgradedConnection(dbInfo);
            }
            return db;
          }).then(function(db) {
            dbInfo.db = dbContext.db = db;
            self2._dbInfo = dbInfo;
            for (var k = 0; k < forages.length; k++) {
              var forage2 = forages[k];
              if (forage2 !== self2) {
                forage2._dbInfo.db = dbInfo.db;
                forage2._dbInfo.version = dbInfo.version;
              }
            }
          });
        }
        function getItem(key2, callback) {
          var self2 = this;
          key2 = normalizeKey(key2);
          var promise = new Promise$12(function(resolve, reject) {
            self2.ready().then(function() {
              createTransaction(self2._dbInfo, READ_ONLY, function(err, transaction) {
                if (err) {
                  return reject(err);
                }
                try {
                  var store = transaction.objectStore(self2._dbInfo.storeName);
                  var req = store.get(key2);
                  req.onsuccess = function() {
                    var value = req.result;
                    if (value === void 0) {
                      value = null;
                    }
                    if (_isEncodedBlob(value)) {
                      value = _decodeBlob(value);
                    }
                    resolve(value);
                  };
                  req.onerror = function() {
                    reject(req.error);
                  };
                } catch (e) {
                  reject(e);
                }
              });
            })["catch"](reject);
          });
          executeCallback(promise, callback);
          return promise;
        }
        function iterate(iterator, callback) {
          var self2 = this;
          var promise = new Promise$12(function(resolve, reject) {
            self2.ready().then(function() {
              createTransaction(self2._dbInfo, READ_ONLY, function(err, transaction) {
                if (err) {
                  return reject(err);
                }
                try {
                  var store = transaction.objectStore(self2._dbInfo.storeName);
                  var req = store.openCursor();
                  var iterationNumber = 1;
                  req.onsuccess = function() {
                    var cursor = req.result;
                    if (cursor) {
                      var value = cursor.value;
                      if (_isEncodedBlob(value)) {
                        value = _decodeBlob(value);
                      }
                      var result = iterator(value, cursor.key, iterationNumber++);
                      if (result !== void 0) {
                        resolve(result);
                      } else {
                        cursor["continue"]();
                      }
                    } else {
                      resolve();
                    }
                  };
                  req.onerror = function() {
                    reject(req.error);
                  };
                } catch (e) {
                  reject(e);
                }
              });
            })["catch"](reject);
          });
          executeCallback(promise, callback);
          return promise;
        }
        function setItem(key2, value, callback) {
          var self2 = this;
          key2 = normalizeKey(key2);
          var promise = new Promise$12(function(resolve, reject) {
            var dbInfo;
            self2.ready().then(function() {
              dbInfo = self2._dbInfo;
              if (toString2.call(value) === "[object Blob]") {
                return _checkBlobSupport(dbInfo.db).then(function(blobSupport) {
                  if (blobSupport) {
                    return value;
                  }
                  return _encodeBlob(value);
                });
              }
              return value;
            }).then(function(value2) {
              createTransaction(self2._dbInfo, READ_WRITE, function(err, transaction) {
                if (err) {
                  return reject(err);
                }
                try {
                  var store = transaction.objectStore(self2._dbInfo.storeName);
                  if (value2 === null) {
                    value2 = void 0;
                  }
                  var req = store.put(value2, key2);
                  transaction.oncomplete = function() {
                    if (value2 === void 0) {
                      value2 = null;
                    }
                    resolve(value2);
                  };
                  transaction.onabort = transaction.onerror = function() {
                    var err2 = req.error ? req.error : req.transaction.error;
                    reject(err2);
                  };
                } catch (e) {
                  reject(e);
                }
              });
            })["catch"](reject);
          });
          executeCallback(promise, callback);
          return promise;
        }
        function removeItem(key2, callback) {
          var self2 = this;
          key2 = normalizeKey(key2);
          var promise = new Promise$12(function(resolve, reject) {
            self2.ready().then(function() {
              createTransaction(self2._dbInfo, READ_WRITE, function(err, transaction) {
                if (err) {
                  return reject(err);
                }
                try {
                  var store = transaction.objectStore(self2._dbInfo.storeName);
                  var req = store["delete"](key2);
                  transaction.oncomplete = function() {
                    resolve();
                  };
                  transaction.onerror = function() {
                    reject(req.error);
                  };
                  transaction.onabort = function() {
                    var err2 = req.error ? req.error : req.transaction.error;
                    reject(err2);
                  };
                } catch (e) {
                  reject(e);
                }
              });
            })["catch"](reject);
          });
          executeCallback(promise, callback);
          return promise;
        }
        function clear(callback) {
          var self2 = this;
          var promise = new Promise$12(function(resolve, reject) {
            self2.ready().then(function() {
              createTransaction(self2._dbInfo, READ_WRITE, function(err, transaction) {
                if (err) {
                  return reject(err);
                }
                try {
                  var store = transaction.objectStore(self2._dbInfo.storeName);
                  var req = store.clear();
                  transaction.oncomplete = function() {
                    resolve();
                  };
                  transaction.onabort = transaction.onerror = function() {
                    var err2 = req.error ? req.error : req.transaction.error;
                    reject(err2);
                  };
                } catch (e) {
                  reject(e);
                }
              });
            })["catch"](reject);
          });
          executeCallback(promise, callback);
          return promise;
        }
        function length(callback) {
          var self2 = this;
          var promise = new Promise$12(function(resolve, reject) {
            self2.ready().then(function() {
              createTransaction(self2._dbInfo, READ_ONLY, function(err, transaction) {
                if (err) {
                  return reject(err);
                }
                try {
                  var store = transaction.objectStore(self2._dbInfo.storeName);
                  var req = store.count();
                  req.onsuccess = function() {
                    resolve(req.result);
                  };
                  req.onerror = function() {
                    reject(req.error);
                  };
                } catch (e) {
                  reject(e);
                }
              });
            })["catch"](reject);
          });
          executeCallback(promise, callback);
          return promise;
        }
        function key(n, callback) {
          var self2 = this;
          var promise = new Promise$12(function(resolve, reject) {
            if (n < 0) {
              resolve(null);
              return;
            }
            self2.ready().then(function() {
              createTransaction(self2._dbInfo, READ_ONLY, function(err, transaction) {
                if (err) {
                  return reject(err);
                }
                try {
                  var store = transaction.objectStore(self2._dbInfo.storeName);
                  var advanced = false;
                  var req = store.openKeyCursor();
                  req.onsuccess = function() {
                    var cursor = req.result;
                    if (!cursor) {
                      resolve(null);
                      return;
                    }
                    if (n === 0) {
                      resolve(cursor.key);
                    } else {
                      if (!advanced) {
                        advanced = true;
                        cursor.advance(n);
                      } else {
                        resolve(cursor.key);
                      }
                    }
                  };
                  req.onerror = function() {
                    reject(req.error);
                  };
                } catch (e) {
                  reject(e);
                }
              });
            })["catch"](reject);
          });
          executeCallback(promise, callback);
          return promise;
        }
        function keys2(callback) {
          var self2 = this;
          var promise = new Promise$12(function(resolve, reject) {
            self2.ready().then(function() {
              createTransaction(self2._dbInfo, READ_ONLY, function(err, transaction) {
                if (err) {
                  return reject(err);
                }
                try {
                  var store = transaction.objectStore(self2._dbInfo.storeName);
                  var req = store.openKeyCursor();
                  var keys3 = [];
                  req.onsuccess = function() {
                    var cursor = req.result;
                    if (!cursor) {
                      resolve(keys3);
                      return;
                    }
                    keys3.push(cursor.key);
                    cursor["continue"]();
                  };
                  req.onerror = function() {
                    reject(req.error);
                  };
                } catch (e) {
                  reject(e);
                }
              });
            })["catch"](reject);
          });
          executeCallback(promise, callback);
          return promise;
        }
        function dropInstance(options, callback) {
          callback = getCallback.apply(this, arguments);
          var currentConfig = this.config();
          options = typeof options !== "function" && options || {};
          if (!options.name) {
            options.name = options.name || currentConfig.name;
            options.storeName = options.storeName || currentConfig.storeName;
          }
          var self2 = this;
          var promise;
          if (!options.name) {
            promise = Promise$12.reject("Invalid arguments");
          } else {
            var isCurrentDb = options.name === currentConfig.name && self2._dbInfo.db;
            var dbPromise = isCurrentDb ? Promise$12.resolve(self2._dbInfo.db) : _getOriginalConnection(options).then(function(db) {
              var dbContext = dbContexts[options.name];
              var forages = dbContext.forages;
              dbContext.db = db;
              for (var i = 0; i < forages.length; i++) {
                forages[i]._dbInfo.db = db;
              }
              return db;
            });
            if (!options.storeName) {
              promise = dbPromise.then(function(db) {
                _deferReadiness(options);
                var dbContext = dbContexts[options.name];
                var forages = dbContext.forages;
                db.close();
                for (var i = 0; i < forages.length; i++) {
                  var forage = forages[i];
                  forage._dbInfo.db = null;
                }
                var dropDBPromise = new Promise$12(function(resolve, reject) {
                  var req = idb.deleteDatabase(options.name);
                  req.onerror = function() {
                    var db2 = req.result;
                    if (db2) {
                      db2.close();
                    }
                    reject(req.error);
                  };
                  req.onblocked = function() {
                    console.warn('dropInstance blocked for database "' + options.name + '" until all open connections are closed');
                  };
                  req.onsuccess = function() {
                    var db2 = req.result;
                    if (db2) {
                      db2.close();
                    }
                    resolve(db2);
                  };
                });
                return dropDBPromise.then(function(db2) {
                  dbContext.db = db2;
                  for (var i2 = 0; i2 < forages.length; i2++) {
                    var _forage = forages[i2];
                    _advanceReadiness(_forage._dbInfo);
                  }
                })["catch"](function(err) {
                  (_rejectReadiness(options, err) || Promise$12.resolve())["catch"](function() {
                  });
                  throw err;
                });
              });
            } else {
              promise = dbPromise.then(function(db) {
                if (!db.objectStoreNames.contains(options.storeName)) {
                  return;
                }
                var newVersion = db.version + 1;
                _deferReadiness(options);
                var dbContext = dbContexts[options.name];
                var forages = dbContext.forages;
                db.close();
                for (var i = 0; i < forages.length; i++) {
                  var forage = forages[i];
                  forage._dbInfo.db = null;
                  forage._dbInfo.version = newVersion;
                }
                var dropObjectPromise = new Promise$12(function(resolve, reject) {
                  var req = idb.open(options.name, newVersion);
                  req.onerror = function(err) {
                    var db2 = req.result;
                    db2.close();
                    reject(err);
                  };
                  req.onupgradeneeded = function() {
                    var db2 = req.result;
                    db2.deleteObjectStore(options.storeName);
                  };
                  req.onsuccess = function() {
                    var db2 = req.result;
                    db2.close();
                    resolve(db2);
                  };
                });
                return dropObjectPromise.then(function(db2) {
                  dbContext.db = db2;
                  for (var j = 0; j < forages.length; j++) {
                    var _forage2 = forages[j];
                    _forage2._dbInfo.db = db2;
                    _advanceReadiness(_forage2._dbInfo);
                  }
                })["catch"](function(err) {
                  (_rejectReadiness(options, err) || Promise$12.resolve())["catch"](function() {
                  });
                  throw err;
                });
              });
            }
          }
          executeCallback(promise, callback);
          return promise;
        }
        var asyncStorage = {
          _driver: "asyncStorage",
          _initStorage,
          _support: isIndexedDBValid(),
          iterate,
          getItem,
          setItem,
          removeItem,
          clear,
          length,
          key,
          keys: keys2,
          dropInstance
        };
        function isWebSQLValid() {
          return typeof openDatabase === "function";
        }
        var BASE_CHARS = "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789+/";
        var BLOB_TYPE_PREFIX = "~~local_forage_type~";
        var BLOB_TYPE_PREFIX_REGEX = /^~~local_forage_type~([^~]+)~/;
        var SERIALIZED_MARKER = "__lfsc__:";
        var SERIALIZED_MARKER_LENGTH = SERIALIZED_MARKER.length;
        var TYPE_ARRAYBUFFER = "arbf";
        var TYPE_BLOB = "blob";
        var TYPE_INT8ARRAY = "si08";
        var TYPE_UINT8ARRAY = "ui08";
        var TYPE_UINT8CLAMPEDARRAY = "uic8";
        var TYPE_INT16ARRAY = "si16";
        var TYPE_INT32ARRAY = "si32";
        var TYPE_UINT16ARRAY = "ur16";
        var TYPE_UINT32ARRAY = "ui32";
        var TYPE_FLOAT32ARRAY = "fl32";
        var TYPE_FLOAT64ARRAY = "fl64";
        var TYPE_SERIALIZED_MARKER_LENGTH = SERIALIZED_MARKER_LENGTH + TYPE_ARRAYBUFFER.length;
        var toString$1 = Object.prototype.toString;
        function stringToBuffer(serializedString) {
          var bufferLength = serializedString.length * 0.75;
          var len = serializedString.length;
          var i;
          var p = 0;
          var encoded1, encoded2, encoded3, encoded4;
          if (serializedString[serializedString.length - 1] === "=") {
            bufferLength--;
            if (serializedString[serializedString.length - 2] === "=") {
              bufferLength--;
            }
          }
          var buffer = new ArrayBuffer(bufferLength);
          var bytes = new Uint8Array(buffer);
          for (i = 0; i < len; i += 4) {
            encoded1 = BASE_CHARS.indexOf(serializedString[i]);
            encoded2 = BASE_CHARS.indexOf(serializedString[i + 1]);
            encoded3 = BASE_CHARS.indexOf(serializedString[i + 2]);
            encoded4 = BASE_CHARS.indexOf(serializedString[i + 3]);
            bytes[p++] = encoded1 << 2 | encoded2 >> 4;
            bytes[p++] = (encoded2 & 15) << 4 | encoded3 >> 2;
            bytes[p++] = (encoded3 & 3) << 6 | encoded4 & 63;
          }
          return buffer;
        }
        function bufferToString(buffer) {
          var bytes = new Uint8Array(buffer);
          var base64String = "";
          var i;
          for (i = 0; i < bytes.length; i += 3) {
            base64String += BASE_CHARS[bytes[i] >> 2];
            base64String += BASE_CHARS[(bytes[i] & 3) << 4 | bytes[i + 1] >> 4];
            base64String += BASE_CHARS[(bytes[i + 1] & 15) << 2 | bytes[i + 2] >> 6];
            base64String += BASE_CHARS[bytes[i + 2] & 63];
          }
          if (bytes.length % 3 === 2) {
            base64String = base64String.substring(0, base64String.length - 1) + "=";
          } else if (bytes.length % 3 === 1) {
            base64String = base64String.substring(0, base64String.length - 2) + "==";
          }
          return base64String;
        }
        function serialize(value, callback) {
          var valueType = "";
          if (value) {
            valueType = toString$1.call(value);
          }
          if (value && (valueType === "[object ArrayBuffer]" || value.buffer && toString$1.call(value.buffer) === "[object ArrayBuffer]")) {
            var buffer;
            var marker = SERIALIZED_MARKER;
            if (value instanceof ArrayBuffer) {
              buffer = value;
              marker += TYPE_ARRAYBUFFER;
            } else {
              buffer = value.buffer;
              if (valueType === "[object Int8Array]") {
                marker += TYPE_INT8ARRAY;
              } else if (valueType === "[object Uint8Array]") {
                marker += TYPE_UINT8ARRAY;
              } else if (valueType === "[object Uint8ClampedArray]") {
                marker += TYPE_UINT8CLAMPEDARRAY;
              } else if (valueType === "[object Int16Array]") {
                marker += TYPE_INT16ARRAY;
              } else if (valueType === "[object Uint16Array]") {
                marker += TYPE_UINT16ARRAY;
              } else if (valueType === "[object Int32Array]") {
                marker += TYPE_INT32ARRAY;
              } else if (valueType === "[object Uint32Array]") {
                marker += TYPE_UINT32ARRAY;
              } else if (valueType === "[object Float32Array]") {
                marker += TYPE_FLOAT32ARRAY;
              } else if (valueType === "[object Float64Array]") {
                marker += TYPE_FLOAT64ARRAY;
              } else {
                callback(new Error("Failed to get type for BinaryArray"));
              }
            }
            callback(marker + bufferToString(buffer));
          } else if (valueType === "[object Blob]") {
            var fileReader = new FileReader();
            fileReader.onload = function() {
              var str = BLOB_TYPE_PREFIX + value.type + "~" + bufferToString(this.result);
              callback(SERIALIZED_MARKER + TYPE_BLOB + str);
            };
            fileReader.readAsArrayBuffer(value);
          } else {
            try {
              callback(JSON.stringify(value));
            } catch (e) {
              console.error("Couldn't convert value into a JSON string: ", value);
              callback(null, e);
            }
          }
        }
        function deserialize(value) {
          if (value.substring(0, SERIALIZED_MARKER_LENGTH) !== SERIALIZED_MARKER) {
            return JSON.parse(value);
          }
          var serializedString = value.substring(TYPE_SERIALIZED_MARKER_LENGTH);
          var type = value.substring(SERIALIZED_MARKER_LENGTH, TYPE_SERIALIZED_MARKER_LENGTH);
          var blobType;
          if (type === TYPE_BLOB && BLOB_TYPE_PREFIX_REGEX.test(serializedString)) {
            var matcher = serializedString.match(BLOB_TYPE_PREFIX_REGEX);
            blobType = matcher[1];
            serializedString = serializedString.substring(matcher[0].length);
          }
          var buffer = stringToBuffer(serializedString);
          switch (type) {
            case TYPE_ARRAYBUFFER:
              return buffer;
            case TYPE_BLOB:
              return createBlob([buffer], { type: blobType });
            case TYPE_INT8ARRAY:
              return new Int8Array(buffer);
            case TYPE_UINT8ARRAY:
              return new Uint8Array(buffer);
            case TYPE_UINT8CLAMPEDARRAY:
              return new Uint8ClampedArray(buffer);
            case TYPE_INT16ARRAY:
              return new Int16Array(buffer);
            case TYPE_UINT16ARRAY:
              return new Uint16Array(buffer);
            case TYPE_INT32ARRAY:
              return new Int32Array(buffer);
            case TYPE_UINT32ARRAY:
              return new Uint32Array(buffer);
            case TYPE_FLOAT32ARRAY:
              return new Float32Array(buffer);
            case TYPE_FLOAT64ARRAY:
              return new Float64Array(buffer);
            default:
              throw new Error("Unkown type: " + type);
          }
        }
        var localforageSerializer = {
          serialize,
          deserialize,
          stringToBuffer,
          bufferToString
        };
        function createDbTable(t, dbInfo, callback, errorCallback) {
          t.executeSql("CREATE TABLE IF NOT EXISTS " + dbInfo.storeName + " (id INTEGER PRIMARY KEY, key unique, value)", [], callback, errorCallback);
        }
        function _initStorage$1(options) {
          var self2 = this;
          var dbInfo = {
            db: null
          };
          if (options) {
            for (var i in options) {
              dbInfo[i] = typeof options[i] !== "string" ? options[i].toString() : options[i];
            }
          }
          var dbInfoPromise = new Promise$12(function(resolve, reject) {
            try {
              dbInfo.db = openDatabase(dbInfo.name, String(dbInfo.version), dbInfo.description, dbInfo.size);
            } catch (e) {
              return reject(e);
            }
            dbInfo.db.transaction(function(t) {
              createDbTable(t, dbInfo, function() {
                self2._dbInfo = dbInfo;
                resolve();
              }, function(t2, error) {
                reject(error);
              });
            }, reject);
          });
          dbInfo.serializer = localforageSerializer;
          return dbInfoPromise;
        }
        function tryExecuteSql(t, dbInfo, sqlStatement, args, callback, errorCallback) {
          t.executeSql(sqlStatement, args, callback, function(t2, error) {
            if (error.code === error.SYNTAX_ERR) {
              t2.executeSql("SELECT name FROM sqlite_master WHERE type='table' AND name = ?", [dbInfo.storeName], function(t3, results) {
                if (!results.rows.length) {
                  createDbTable(t3, dbInfo, function() {
                    t3.executeSql(sqlStatement, args, callback, errorCallback);
                  }, errorCallback);
                } else {
                  errorCallback(t3, error);
                }
              }, errorCallback);
            } else {
              errorCallback(t2, error);
            }
          }, errorCallback);
        }
        function getItem$1(key2, callback) {
          var self2 = this;
          key2 = normalizeKey(key2);
          var promise = new Promise$12(function(resolve, reject) {
            self2.ready().then(function() {
              var dbInfo = self2._dbInfo;
              dbInfo.db.transaction(function(t) {
                tryExecuteSql(t, dbInfo, "SELECT * FROM " + dbInfo.storeName + " WHERE key = ? LIMIT 1", [key2], function(t2, results) {
                  var result = results.rows.length ? results.rows.item(0).value : null;
                  if (result) {
                    result = dbInfo.serializer.deserialize(result);
                  }
                  resolve(result);
                }, function(t2, error) {
                  reject(error);
                });
              });
            })["catch"](reject);
          });
          executeCallback(promise, callback);
          return promise;
        }
        function iterate$1(iterator, callback) {
          var self2 = this;
          var promise = new Promise$12(function(resolve, reject) {
            self2.ready().then(function() {
              var dbInfo = self2._dbInfo;
              dbInfo.db.transaction(function(t) {
                tryExecuteSql(t, dbInfo, "SELECT * FROM " + dbInfo.storeName, [], function(t2, results) {
                  var rows = results.rows;
                  var length2 = rows.length;
                  for (var i = 0; i < length2; i++) {
                    var item = rows.item(i);
                    var result = item.value;
                    if (result) {
                      result = dbInfo.serializer.deserialize(result);
                    }
                    result = iterator(result, item.key, i + 1);
                    if (result !== void 0) {
                      resolve(result);
                      return;
                    }
                  }
                  resolve();
                }, function(t2, error) {
                  reject(error);
                });
              });
            })["catch"](reject);
          });
          executeCallback(promise, callback);
          return promise;
        }
        function _setItem(key2, value, callback, retriesLeft) {
          var self2 = this;
          key2 = normalizeKey(key2);
          var promise = new Promise$12(function(resolve, reject) {
            self2.ready().then(function() {
              if (value === void 0) {
                value = null;
              }
              var originalValue = value;
              var dbInfo = self2._dbInfo;
              dbInfo.serializer.serialize(value, function(value2, error) {
                if (error) {
                  reject(error);
                } else {
                  dbInfo.db.transaction(function(t) {
                    tryExecuteSql(t, dbInfo, "INSERT OR REPLACE INTO " + dbInfo.storeName + " (key, value) VALUES (?, ?)", [key2, value2], function() {
                      resolve(originalValue);
                    }, function(t2, error2) {
                      reject(error2);
                    });
                  }, function(sqlError) {
                    if (sqlError.code === sqlError.QUOTA_ERR) {
                      if (retriesLeft > 0) {
                        resolve(_setItem.apply(self2, [key2, originalValue, callback, retriesLeft - 1]));
                        return;
                      }
                      reject(sqlError);
                    }
                  });
                }
              });
            })["catch"](reject);
          });
          executeCallback(promise, callback);
          return promise;
        }
        function setItem$1(key2, value, callback) {
          return _setItem.apply(this, [key2, value, callback, 1]);
        }
        function removeItem$1(key2, callback) {
          var self2 = this;
          key2 = normalizeKey(key2);
          var promise = new Promise$12(function(resolve, reject) {
            self2.ready().then(function() {
              var dbInfo = self2._dbInfo;
              dbInfo.db.transaction(function(t) {
                tryExecuteSql(t, dbInfo, "DELETE FROM " + dbInfo.storeName + " WHERE key = ?", [key2], function() {
                  resolve();
                }, function(t2, error) {
                  reject(error);
                });
              });
            })["catch"](reject);
          });
          executeCallback(promise, callback);
          return promise;
        }
        function clear$1(callback) {
          var self2 = this;
          var promise = new Promise$12(function(resolve, reject) {
            self2.ready().then(function() {
              var dbInfo = self2._dbInfo;
              dbInfo.db.transaction(function(t) {
                tryExecuteSql(t, dbInfo, "DELETE FROM " + dbInfo.storeName, [], function() {
                  resolve();
                }, function(t2, error) {
                  reject(error);
                });
              });
            })["catch"](reject);
          });
          executeCallback(promise, callback);
          return promise;
        }
        function length$1(callback) {
          var self2 = this;
          var promise = new Promise$12(function(resolve, reject) {
            self2.ready().then(function() {
              var dbInfo = self2._dbInfo;
              dbInfo.db.transaction(function(t) {
                tryExecuteSql(t, dbInfo, "SELECT COUNT(key) as c FROM " + dbInfo.storeName, [], function(t2, results) {
                  var result = results.rows.item(0).c;
                  resolve(result);
                }, function(t2, error) {
                  reject(error);
                });
              });
            })["catch"](reject);
          });
          executeCallback(promise, callback);
          return promise;
        }
        function key$1(n, callback) {
          var self2 = this;
          var promise = new Promise$12(function(resolve, reject) {
            self2.ready().then(function() {
              var dbInfo = self2._dbInfo;
              dbInfo.db.transaction(function(t) {
                tryExecuteSql(t, dbInfo, "SELECT key FROM " + dbInfo.storeName + " WHERE id = ? LIMIT 1", [n + 1], function(t2, results) {
                  var result = results.rows.length ? results.rows.item(0).key : null;
                  resolve(result);
                }, function(t2, error) {
                  reject(error);
                });
              });
            })["catch"](reject);
          });
          executeCallback(promise, callback);
          return promise;
        }
        function keys$1(callback) {
          var self2 = this;
          var promise = new Promise$12(function(resolve, reject) {
            self2.ready().then(function() {
              var dbInfo = self2._dbInfo;
              dbInfo.db.transaction(function(t) {
                tryExecuteSql(t, dbInfo, "SELECT key FROM " + dbInfo.storeName, [], function(t2, results) {
                  var keys3 = [];
                  for (var i = 0; i < results.rows.length; i++) {
                    keys3.push(results.rows.item(i).key);
                  }
                  resolve(keys3);
                }, function(t2, error) {
                  reject(error);
                });
              });
            })["catch"](reject);
          });
          executeCallback(promise, callback);
          return promise;
        }
        function getAllStoreNames(db) {
          return new Promise$12(function(resolve, reject) {
            db.transaction(function(t) {
              t.executeSql("SELECT name FROM sqlite_master WHERE type='table' AND name <> '__WebKitDatabaseInfoTable__'", [], function(t2, results) {
                var storeNames = [];
                for (var i = 0; i < results.rows.length; i++) {
                  storeNames.push(results.rows.item(i).name);
                }
                resolve({
                  db,
                  storeNames
                });
              }, function(t2, error) {
                reject(error);
              });
            }, function(sqlError) {
              reject(sqlError);
            });
          });
        }
        function dropInstance$1(options, callback) {
          callback = getCallback.apply(this, arguments);
          var currentConfig = this.config();
          options = typeof options !== "function" && options || {};
          if (!options.name) {
            options.name = options.name || currentConfig.name;
            options.storeName = options.storeName || currentConfig.storeName;
          }
          var self2 = this;
          var promise;
          if (!options.name) {
            promise = Promise$12.reject("Invalid arguments");
          } else {
            promise = new Promise$12(function(resolve) {
              var db;
              if (options.name === currentConfig.name) {
                db = self2._dbInfo.db;
              } else {
                db = openDatabase(options.name, "", "", 0);
              }
              if (!options.storeName) {
                resolve(getAllStoreNames(db));
              } else {
                resolve({
                  db,
                  storeNames: [options.storeName]
                });
              }
            }).then(function(operationInfo) {
              return new Promise$12(function(resolve, reject) {
                operationInfo.db.transaction(function(t) {
                  function dropTable(storeName) {
                    return new Promise$12(function(resolve2, reject2) {
                      t.executeSql("DROP TABLE IF EXISTS " + storeName, [], function() {
                        resolve2();
                      }, function(t2, error) {
                        reject2(error);
                      });
                    });
                  }
                  var operations = [];
                  for (var i = 0, len = operationInfo.storeNames.length; i < len; i++) {
                    operations.push(dropTable(operationInfo.storeNames[i]));
                  }
                  Promise$12.all(operations).then(function() {
                    resolve();
                  })["catch"](function(e) {
                    reject(e);
                  });
                }, function(sqlError) {
                  reject(sqlError);
                });
              });
            });
          }
          executeCallback(promise, callback);
          return promise;
        }
        var webSQLStorage = {
          _driver: "webSQLStorage",
          _initStorage: _initStorage$1,
          _support: isWebSQLValid(),
          iterate: iterate$1,
          getItem: getItem$1,
          setItem: setItem$1,
          removeItem: removeItem$1,
          clear: clear$1,
          length: length$1,
          key: key$1,
          keys: keys$1,
          dropInstance: dropInstance$1
        };
        function isLocalStorageValid() {
          try {
            return typeof localStorage !== "undefined" && "setItem" in localStorage && // in IE8 typeof localStorage.setItem === 'object'
            !!localStorage.setItem;
          } catch (e) {
            return false;
          }
        }
        function _getKeyPrefix(options, defaultConfig) {
          var keyPrefix = options.name + "/";
          if (options.storeName !== defaultConfig.storeName) {
            keyPrefix += options.storeName + "/";
          }
          return keyPrefix;
        }
        function checkIfLocalStorageThrows() {
          var localStorageTestKey = "_localforage_support_test";
          try {
            localStorage.setItem(localStorageTestKey, true);
            localStorage.removeItem(localStorageTestKey);
            return false;
          } catch (e) {
            return true;
          }
        }
        function _isLocalStorageUsable() {
          return !checkIfLocalStorageThrows() || localStorage.length > 0;
        }
        function _initStorage$2(options) {
          var self2 = this;
          var dbInfo = {};
          if (options) {
            for (var i in options) {
              dbInfo[i] = options[i];
            }
          }
          dbInfo.keyPrefix = _getKeyPrefix(options, self2._defaultConfig);
          if (!_isLocalStorageUsable()) {
            return Promise$12.reject();
          }
          self2._dbInfo = dbInfo;
          dbInfo.serializer = localforageSerializer;
          return Promise$12.resolve();
        }
        function clear$2(callback) {
          var self2 = this;
          var promise = self2.ready().then(function() {
            var keyPrefix = self2._dbInfo.keyPrefix;
            for (var i = localStorage.length - 1; i >= 0; i--) {
              var key2 = localStorage.key(i);
              if (key2.indexOf(keyPrefix) === 0) {
                localStorage.removeItem(key2);
              }
            }
          });
          executeCallback(promise, callback);
          return promise;
        }
        function getItem$2(key2, callback) {
          var self2 = this;
          key2 = normalizeKey(key2);
          var promise = self2.ready().then(function() {
            var dbInfo = self2._dbInfo;
            var result = localStorage.getItem(dbInfo.keyPrefix + key2);
            if (result) {
              result = dbInfo.serializer.deserialize(result);
            }
            return result;
          });
          executeCallback(promise, callback);
          return promise;
        }
        function iterate$2(iterator, callback) {
          var self2 = this;
          var promise = self2.ready().then(function() {
            var dbInfo = self2._dbInfo;
            var keyPrefix = dbInfo.keyPrefix;
            var keyPrefixLength = keyPrefix.length;
            var length2 = localStorage.length;
            var iterationNumber = 1;
            for (var i = 0; i < length2; i++) {
              var key2 = localStorage.key(i);
              if (key2.indexOf(keyPrefix) !== 0) {
                continue;
              }
              var value = localStorage.getItem(key2);
              if (value) {
                value = dbInfo.serializer.deserialize(value);
              }
              value = iterator(value, key2.substring(keyPrefixLength), iterationNumber++);
              if (value !== void 0) {
                return value;
              }
            }
          });
          executeCallback(promise, callback);
          return promise;
        }
        function key$2(n, callback) {
          var self2 = this;
          var promise = self2.ready().then(function() {
            var dbInfo = self2._dbInfo;
            var result;
            try {
              result = localStorage.key(n);
            } catch (error) {
              result = null;
            }
            if (result) {
              result = result.substring(dbInfo.keyPrefix.length);
            }
            return result;
          });
          executeCallback(promise, callback);
          return promise;
        }
        function keys$2(callback) {
          var self2 = this;
          var promise = self2.ready().then(function() {
            var dbInfo = self2._dbInfo;
            var length2 = localStorage.length;
            var keys3 = [];
            for (var i = 0; i < length2; i++) {
              var itemKey = localStorage.key(i);
              if (itemKey.indexOf(dbInfo.keyPrefix) === 0) {
                keys3.push(itemKey.substring(dbInfo.keyPrefix.length));
              }
            }
            return keys3;
          });
          executeCallback(promise, callback);
          return promise;
        }
        function length$2(callback) {
          var self2 = this;
          var promise = self2.keys().then(function(keys3) {
            return keys3.length;
          });
          executeCallback(promise, callback);
          return promise;
        }
        function removeItem$2(key2, callback) {
          var self2 = this;
          key2 = normalizeKey(key2);
          var promise = self2.ready().then(function() {
            var dbInfo = self2._dbInfo;
            localStorage.removeItem(dbInfo.keyPrefix + key2);
          });
          executeCallback(promise, callback);
          return promise;
        }
        function setItem$2(key2, value, callback) {
          var self2 = this;
          key2 = normalizeKey(key2);
          var promise = self2.ready().then(function() {
            if (value === void 0) {
              value = null;
            }
            var originalValue = value;
            return new Promise$12(function(resolve, reject) {
              var dbInfo = self2._dbInfo;
              dbInfo.serializer.serialize(value, function(value2, error) {
                if (error) {
                  reject(error);
                } else {
                  try {
                    localStorage.setItem(dbInfo.keyPrefix + key2, value2);
                    resolve(originalValue);
                  } catch (e) {
                    if (e.name === "QuotaExceededError" || e.name === "NS_ERROR_DOM_QUOTA_REACHED") {
                      reject(e);
                    }
                    reject(e);
                  }
                }
              });
            });
          });
          executeCallback(promise, callback);
          return promise;
        }
        function dropInstance$2(options, callback) {
          callback = getCallback.apply(this, arguments);
          options = typeof options !== "function" && options || {};
          if (!options.name) {
            var currentConfig = this.config();
            options.name = options.name || currentConfig.name;
            options.storeName = options.storeName || currentConfig.storeName;
          }
          var self2 = this;
          var promise;
          if (!options.name) {
            promise = Promise$12.reject("Invalid arguments");
          } else {
            promise = new Promise$12(function(resolve) {
              if (!options.storeName) {
                resolve(options.name + "/");
              } else {
                resolve(_getKeyPrefix(options, self2._defaultConfig));
              }
            }).then(function(keyPrefix) {
              for (var i = localStorage.length - 1; i >= 0; i--) {
                var key2 = localStorage.key(i);
                if (key2.indexOf(keyPrefix) === 0) {
                  localStorage.removeItem(key2);
                }
              }
            });
          }
          executeCallback(promise, callback);
          return promise;
        }
        var localStorageWrapper = {
          _driver: "localStorageWrapper",
          _initStorage: _initStorage$2,
          _support: isLocalStorageValid(),
          iterate: iterate$2,
          getItem: getItem$2,
          setItem: setItem$2,
          removeItem: removeItem$2,
          clear: clear$2,
          length: length$2,
          key: key$2,
          keys: keys$2,
          dropInstance: dropInstance$2
        };
        var sameValue = function sameValue2(x, y) {
          return x === y || typeof x === "number" && typeof y === "number" && isNaN(x) && isNaN(y);
        };
        var includes = function includes2(array, searchElement) {
          var len = array.length;
          var i = 0;
          while (i < len) {
            if (sameValue(array[i], searchElement)) {
              return true;
            }
            i++;
          }
          return false;
        };
        var isArray2 = Array.isArray || function(arg) {
          return Object.prototype.toString.call(arg) === "[object Array]";
        };
        var DefinedDrivers = {};
        var DriverSupport = {};
        var DefaultDrivers = {
          INDEXEDDB: asyncStorage,
          WEBSQL: webSQLStorage,
          LOCALSTORAGE: localStorageWrapper
        };
        var DefaultDriverOrder = [DefaultDrivers.INDEXEDDB._driver, DefaultDrivers.WEBSQL._driver, DefaultDrivers.LOCALSTORAGE._driver];
        var OptionalDriverMethods = ["dropInstance"];
        var LibraryMethods = ["clear", "getItem", "iterate", "key", "keys", "length", "removeItem", "setItem"].concat(OptionalDriverMethods);
        var DefaultConfig = {
          description: "",
          driver: DefaultDriverOrder.slice(),
          name: "localforage",
          // Default DB size is _JUST UNDER_ 5MB, as it's the highest size
          // we can use without a prompt.
          size: 4980736,
          storeName: "keyvaluepairs",
          version: 1
        };
        function callWhenReady(localForageInstance, libraryMethod) {
          localForageInstance[libraryMethod] = function() {
            var _args = arguments;
            return localForageInstance.ready().then(function() {
              return localForageInstance[libraryMethod].apply(localForageInstance, _args);
            });
          };
        }
        function extend() {
          for (var i = 1; i < arguments.length; i++) {
            var arg = arguments[i];
            if (arg) {
              for (var _key in arg) {
                if (arg.hasOwnProperty(_key)) {
                  if (isArray2(arg[_key])) {
                    arguments[0][_key] = arg[_key].slice();
                  } else {
                    arguments[0][_key] = arg[_key];
                  }
                }
              }
            }
          }
          return arguments[0];
        }
        var LocalForage = function() {
          function LocalForage2(options) {
            _classCallCheck(this, LocalForage2);
            for (var driverTypeKey in DefaultDrivers) {
              if (DefaultDrivers.hasOwnProperty(driverTypeKey)) {
                var driver = DefaultDrivers[driverTypeKey];
                var driverName = driver._driver;
                this[driverTypeKey] = driverName;
                if (!DefinedDrivers[driverName]) {
                  this.defineDriver(driver);
                }
              }
            }
            this._defaultConfig = extend({}, DefaultConfig);
            this._config = extend({}, this._defaultConfig, options);
            this._driverSet = null;
            this._initDriver = null;
            this._ready = false;
            this._dbInfo = null;
            this._wrapLibraryMethodsWithReady();
            this.setDriver(this._config.driver)["catch"](function() {
            });
          }
          LocalForage2.prototype.config = function config(options) {
            if ((typeof options === "undefined" ? "undefined" : _typeof(options)) === "object") {
              if (this._ready) {
                return new Error("Can't call config() after localforage has been used.");
              }
              for (var i in options) {
                if (i === "storeName") {
                  options[i] = options[i].replace(/\W/g, "_");
                }
                if (i === "version" && typeof options[i] !== "number") {
                  return new Error("Database version must be a number.");
                }
                this._config[i] = options[i];
              }
              if ("driver" in options && options.driver) {
                return this.setDriver(this._config.driver);
              }
              return true;
            } else if (typeof options === "string") {
              return this._config[options];
            } else {
              return this._config;
            }
          };
          LocalForage2.prototype.defineDriver = function defineDriver(driverObject, callback, errorCallback) {
            var promise = new Promise$12(function(resolve, reject) {
              try {
                var driverName = driverObject._driver;
                var complianceError = new Error("Custom driver not compliant; see https://mozilla.github.io/localForage/#definedriver");
                if (!driverObject._driver) {
                  reject(complianceError);
                  return;
                }
                var driverMethods = LibraryMethods.concat("_initStorage");
                for (var i = 0, len = driverMethods.length; i < len; i++) {
                  var driverMethodName = driverMethods[i];
                  var isRequired = !includes(OptionalDriverMethods, driverMethodName);
                  if ((isRequired || driverObject[driverMethodName]) && typeof driverObject[driverMethodName] !== "function") {
                    reject(complianceError);
                    return;
                  }
                }
                var configureMissingMethods = function configureMissingMethods2() {
                  var methodNotImplementedFactory = function methodNotImplementedFactory2(methodName) {
                    return function() {
                      var error = new Error("Method " + methodName + " is not implemented by the current driver");
                      var promise2 = Promise$12.reject(error);
                      executeCallback(promise2, arguments[arguments.length - 1]);
                      return promise2;
                    };
                  };
                  for (var _i = 0, _len = OptionalDriverMethods.length; _i < _len; _i++) {
                    var optionalDriverMethod = OptionalDriverMethods[_i];
                    if (!driverObject[optionalDriverMethod]) {
                      driverObject[optionalDriverMethod] = methodNotImplementedFactory(optionalDriverMethod);
                    }
                  }
                };
                configureMissingMethods();
                var setDriverSupport = function setDriverSupport2(support) {
                  if (DefinedDrivers[driverName]) {
                    console.info("Redefining LocalForage driver: " + driverName);
                  }
                  DefinedDrivers[driverName] = driverObject;
                  DriverSupport[driverName] = support;
                  resolve();
                };
                if ("_support" in driverObject) {
                  if (driverObject._support && typeof driverObject._support === "function") {
                    driverObject._support().then(setDriverSupport, reject);
                  } else {
                    setDriverSupport(!!driverObject._support);
                  }
                } else {
                  setDriverSupport(true);
                }
              } catch (e) {
                reject(e);
              }
            });
            executeTwoCallbacks(promise, callback, errorCallback);
            return promise;
          };
          LocalForage2.prototype.driver = function driver() {
            return this._driver || null;
          };
          LocalForage2.prototype.getDriver = function getDriver(driverName, callback, errorCallback) {
            var getDriverPromise = DefinedDrivers[driverName] ? Promise$12.resolve(DefinedDrivers[driverName]) : Promise$12.reject(new Error("Driver not found."));
            executeTwoCallbacks(getDriverPromise, callback, errorCallback);
            return getDriverPromise;
          };
          LocalForage2.prototype.getSerializer = function getSerializer(callback) {
            var serializerPromise = Promise$12.resolve(localforageSerializer);
            executeTwoCallbacks(serializerPromise, callback);
            return serializerPromise;
          };
          LocalForage2.prototype.ready = function ready(callback) {
            var self2 = this;
            var promise = self2._driverSet.then(function() {
              if (self2._ready === null) {
                self2._ready = self2._initDriver();
              }
              return self2._ready;
            });
            executeTwoCallbacks(promise, callback, callback);
            return promise;
          };
          LocalForage2.prototype.setDriver = function setDriver(drivers, callback, errorCallback) {
            var self2 = this;
            if (!isArray2(drivers)) {
              drivers = [drivers];
            }
            var supportedDrivers = this._getSupportedDrivers(drivers);
            function setDriverToConfig() {
              self2._config.driver = self2.driver();
            }
            function extendSelfWithDriver(driver) {
              self2._extend(driver);
              setDriverToConfig();
              self2._ready = self2._initStorage(self2._config);
              return self2._ready;
            }
            function initDriver(supportedDrivers2) {
              return function() {
                var currentDriverIndex = 0;
                function driverPromiseLoop() {
                  while (currentDriverIndex < supportedDrivers2.length) {
                    var driverName = supportedDrivers2[currentDriverIndex];
                    currentDriverIndex++;
                    self2._dbInfo = null;
                    self2._ready = null;
                    return self2.getDriver(driverName).then(extendSelfWithDriver)["catch"](driverPromiseLoop);
                  }
                  setDriverToConfig();
                  var error = new Error("No available storage method found.");
                  self2._driverSet = Promise$12.reject(error);
                  return self2._driverSet;
                }
                return driverPromiseLoop();
              };
            }
            var oldDriverSetDone = this._driverSet !== null ? this._driverSet["catch"](function() {
              return Promise$12.resolve();
            }) : Promise$12.resolve();
            this._driverSet = oldDriverSetDone.then(function() {
              var driverName = supportedDrivers[0];
              self2._dbInfo = null;
              self2._ready = null;
              return self2.getDriver(driverName).then(function(driver) {
                self2._driver = driver._driver;
                setDriverToConfig();
                self2._wrapLibraryMethodsWithReady();
                self2._initDriver = initDriver(supportedDrivers);
              });
            })["catch"](function() {
              setDriverToConfig();
              var error = new Error("No available storage method found.");
              self2._driverSet = Promise$12.reject(error);
              return self2._driverSet;
            });
            executeTwoCallbacks(this._driverSet, callback, errorCallback);
            return this._driverSet;
          };
          LocalForage2.prototype.supports = function supports(driverName) {
            return !!DriverSupport[driverName];
          };
          LocalForage2.prototype._extend = function _extend(libraryMethodsAndProperties) {
            extend(this, libraryMethodsAndProperties);
          };
          LocalForage2.prototype._getSupportedDrivers = function _getSupportedDrivers(drivers) {
            var supportedDrivers = [];
            for (var i = 0, len = drivers.length; i < len; i++) {
              var driverName = drivers[i];
              if (this.supports(driverName)) {
                supportedDrivers.push(driverName);
              }
            }
            return supportedDrivers;
          };
          LocalForage2.prototype._wrapLibraryMethodsWithReady = function _wrapLibraryMethodsWithReady() {
            for (var i = 0, len = LibraryMethods.length; i < len; i++) {
              callWhenReady(this, LibraryMethods[i]);
            }
          };
          LocalForage2.prototype.createInstance = function createInstance(options) {
            return new LocalForage2(options);
          };
          return LocalForage2;
        }();
        var localforage_js = new LocalForage();
        module3.exports = localforage_js;
      }, { "3": 3 }] }, {}, [4])(4);
    });
  })(localforage);
  var localforageExports = localforage.exports;
  const _0x43842a = /* @__PURE__ */ getDefaultExportFromCjs(localforageExports);
  const mod360 = (_0x206f4f) => {
    return (_0x206f4f + 360) % 360;
  };
  const calculateBoundingBox = (_0x375f00) => {
    const { x: _0x597b8f, y: _0x476ff2, w: _0x294af6, h: _0x21cd48, angle: _0x55b4fc } = _0x375f00, _0x2f9c28 = _0x55b4fc * Math["PI"] / 180, _0x37691b = Math["cos"](_0x2f9c28), _0x17beb9 = Math["sin"](_0x2f9c28), _0x301ce3 = _0x597b8f + _0x294af6 / 2, _0x22b409 = _0x476ff2 + _0x21cd48 / 2, _0x50a0ca = _0x294af6 / 2, _0x2ac9f6 = _0x21cd48 / 2, _0x59818f = (_0x25162b, _0x3c2c1c) => ({ "x": _0x301ce3 + (_0x25162b * _0x37691b - _0x3c2c1c * _0x17beb9), "y": _0x22b409 + (_0x25162b * _0x17beb9 + _0x3c2c1c * _0x37691b) }), _0x4593a0 = _0x59818f(-_0x50a0ca, -_0x2ac9f6), _0x3b0e0f = _0x59818f(_0x50a0ca, -_0x2ac9f6), _0xc0e118 = _0x59818f(_0x50a0ca, _0x2ac9f6), _0x30ba92 = _0x59818f(-_0x50a0ca, _0x2ac9f6), _0x5f11fc = Math["min"](_0x4593a0["x"], _0x3b0e0f["x"], _0xc0e118["x"], _0x30ba92["x"]), _0x5a6495 = Math["max"](_0x4593a0["x"], _0x3b0e0f["x"], _0xc0e118["x"], _0x30ba92["x"]), _0x18566c = Math["min"](_0x4593a0["y"], _0x3b0e0f["y"], _0xc0e118["y"], _0x30ba92["y"]), _0x1cc694 = Math["max"](_0x4593a0["y"], _0x3b0e0f["y"], _0xc0e118["y"], _0x30ba92["y"]);
    return { "x": _0x5f11fc, "y": _0x18566c, "w": _0x5a6495 - _0x5f11fc, "h": _0x1cc694 - _0x18566c, "angle": _0x55b4fc };
  };
  const calculateOuterBoundingBox = (_0x536e98) => {
    let _0x527fb7 = Number["MAX_VALUE"], _0x405710 = Number["MAX_VALUE"], _0x443d52 = Number["MIN_VALUE"], _0x37eb5b = Number["MIN_VALUE"];
    _0x536e98["forEach"]((_0x423272) => {
      const _0xa6adc0 = calculateBoundingBox(_0x423272);
      _0x527fb7 = Math["min"](_0x527fb7, _0xa6adc0["x"]), _0x405710 = Math["min"](_0x405710, _0xa6adc0["y"]), _0x443d52 = Math["max"](_0x443d52, _0xa6adc0["x"] + _0xa6adc0["w"]), _0x37eb5b = Math["max"](_0x37eb5b, _0xa6adc0["y"] + _0xa6adc0["h"]);
    });
    const _0x4d68bf = _0x443d52 - _0x527fb7, _0x43c31f = _0x37eb5b - _0x405710;
    return { "x": _0x527fb7, "y": _0x405710, "w": _0x4d68bf, "h": _0x43c31f };
  };
  const getGridSize = (_0x230ff8) => {
    if (_0x230ff8 <= 0.25)
      return 40;
    if (_0x230ff8 <= 0.5)
      return 20;
    if (_0x230ff8 <= 1)
      return 10;
    if (_0x230ff8 <= 2)
      return 5;
    if (_0x230ff8 <= 4)
      return 2;
    return 1;
  }, FONT_SCALE = 0.83, shadowSize = 8 / 8;
  const drawHorizontalRuler = ({ ctx: _0x254a04, start: _0x2e415d, shadow: _0x4485f0, config: _0x300b92, colorConfig: _0xdb566e }) => {
    const { scale: _0x5e6bf2, width: _0x5dbfae, height: _0x128b64, ratio: _0x34039b } = _0x300b92, { bgColor: _0x21830d, fontColor: _0x5e9dfe, shadowColor: _0x78e315, shadowFontColor: _0x56e8a1, longfgColor: _0x57abc1, shortfgColor: _0x22f4dd } = _0xdb566e;
    _0x254a04["scale"](_0x34039b, _0x34039b), _0x254a04["clearRect"](0, 0, _0x5dbfae, _0x128b64), _0x254a04["fillStyle"] = _0x21830d, _0x254a04["fillRect"](0, 0, _0x5dbfae, _0x128b64);
    if (_0x4485f0["enable"]) {
      const _0x3e5a50 = (_0x4485f0["x"] - _0x2e415d) * _0x5e6bf2, _0x1e7a73 = _0x4485f0["width"] * _0x5e6bf2;
      _0x254a04["fillStyle"] = _0x78e315, _0x254a04["fillRect"](_0x3e5a50, 0, _0x1e7a73, _0x128b64 * shadowSize);
    }
    const _0x3d331e = getGridSize(_0x5e6bf2), _0x4b2ed3 = _0x3d331e * _0x5e6bf2, _0x2153c2 = _0x3d331e * 10, _0x458402 = _0x2153c2 * _0x5e6bf2, _0x4ac674 = Math["floor"](_0x2e415d / _0x3d331e) * _0x3d331e, _0x4ea4a4 = Math["floor"](_0x2e415d / _0x2153c2) * _0x2153c2, _0x490805 = (_0x4ac674 - _0x2e415d) / _0x3d331e * _0x4b2ed3, _0xe60d72 = (_0x4ea4a4 - _0x2e415d) / _0x2153c2 * _0x458402, _0x437fdd = _0x2e415d + Math["ceil"](_0x5dbfae / _0x5e6bf2);
    _0x254a04["beginPath"](), _0x254a04["fillStyle"] = _0x5e9dfe, _0x254a04["strokeStyle"] = _0x57abc1;
    for (let _0x1cb108 = _0x4ea4a4, _0x3e6c70 = 0; _0x1cb108 < _0x437fdd; _0x1cb108 += _0x2153c2, _0x3e6c70++) {
      const _0x16171c = _0xe60d72 + _0x3e6c70 * _0x458402 + 0.5;
      _0x254a04["moveTo"](_0x16171c, 0), _0x254a04["save"](), _0x254a04["translate"](_0x16171c, _0x128b64 * 0.4), _0x254a04["scale"](FONT_SCALE / _0x34039b, FONT_SCALE / _0x34039b), _0x254a04["fillText"](_0x1cb108, 4 * _0x34039b, 7 * _0x34039b), _0x254a04["restore"](), _0x254a04["lineTo"](_0x16171c, _0x128b64 * 9 / 16);
    }
    _0x254a04["stroke"](), _0x254a04["closePath"](), _0x254a04["beginPath"](), _0x254a04["strokeStyle"] = _0x22f4dd;
    for (let _0x5d142f = _0x4ac674, _0x416350 = 0; _0x5d142f < _0x437fdd; _0x5d142f += _0x3d331e, _0x416350++) {
      const _0x2c9271 = _0x490805 + _0x416350 * _0x4b2ed3 + 0.5;
      _0x254a04["moveTo"](_0x2c9271, 0), _0x5d142f % _0x2153c2 !== 0 && _0x254a04["lineTo"](_0x2c9271, _0x128b64 * 1 / 4);
    }
    _0x254a04["stroke"](), _0x254a04["closePath"]();
    if (_0x4485f0["enable"]) {
      const _0x314605 = (_0x4485f0["x"] - _0x2e415d) * _0x5e6bf2, _0x435913 = _0x4485f0["width"] * _0x5e6bf2;
      _0x254a04["fillStyle"] = _0x56e8a1;
      if (_0x435913 > 0) {
        const _0x2ea111 = Number(_0x4485f0["x"])["toFixed"](0), _0x28a2db = Number(_0x4485f0["x"] + _0x4485f0["width"])["toFixed"](0), _0x24f131 = _0x254a04["measureText"](_0x2ea111);
        _0x254a04["fillText"](_0x2ea111, _0x314605 - _0x24f131["width"] - 3, _0x128b64 * 10 / 16), _0x254a04["fillText"](_0x28a2db, _0x314605 + _0x435913 + 2, _0x128b64 * 10 / 16);
      }
    }
    _0x254a04["setTransform"](1, 0, 0, 1, 0, 0);
  };
  const drawVerticalRuler = ({ ctx: _0xfccbe4, start: _0x24b95b, shadow: _0x32671d, config: _0x46b1d4, colorConfig: _0x299041 }) => {
    const { scale: _0x3cb8a7, width: _0x57eec9, height: _0x2d6bed, ratio: _0x2db9de } = _0x46b1d4, { bgColor: _0x593e2b, fontColor: _0x1fedf1, shadowColor: _0x2bae46, shadowFontColor: _0x595d33, longfgColor: _0x5d3a8c, shortfgColor: _0x345b3c } = _0x299041;
    _0xfccbe4["scale"](_0x2db9de, _0x2db9de), _0xfccbe4["clearRect"](0, 0, _0x57eec9, _0x2d6bed), _0xfccbe4["fillStyle"] = _0x593e2b, _0xfccbe4["fillRect"](0, 0, _0x57eec9, _0x2d6bed);
    if (_0x32671d["enable"]) {
      const _0x5e4870 = (_0x32671d["y"] - _0x24b95b) * _0x3cb8a7, _0x1631dc = _0x32671d["height"] * _0x3cb8a7;
      _0xfccbe4["fillStyle"] = _0x2bae46, _0xfccbe4["fillRect"](0, _0x5e4870, _0x57eec9 * shadowSize, _0x1631dc);
    }
    const _0x544622 = getGridSize(_0x3cb8a7), _0x2bc05a = _0x544622 * _0x3cb8a7, _0x4f51a4 = _0x544622 * 10, _0x13467a = _0x4f51a4 * _0x3cb8a7, _0x58b443 = Math["floor"](_0x24b95b / _0x544622) * _0x544622, _0x536873 = Math["floor"](_0x24b95b / _0x4f51a4) * _0x4f51a4, _0x20a83d = (_0x58b443 - _0x24b95b) / _0x544622 * _0x2bc05a, _0x4a80e8 = (_0x536873 - _0x24b95b) / _0x4f51a4 * _0x13467a, _0x352fab = _0x24b95b + Math["ceil"](_0x2d6bed / _0x3cb8a7);
    _0xfccbe4["beginPath"](), _0xfccbe4["fillStyle"] = _0x1fedf1, _0xfccbe4["strokeStyle"] = _0x5d3a8c;
    for (let _0x2983cb = _0x536873, _0x576f88 = 0; _0x2983cb < _0x352fab; _0x2983cb += _0x4f51a4, _0x576f88++) {
      const _0x19d7b0 = _0x4a80e8 + _0x576f88 * _0x13467a + 0.5;
      _0xfccbe4["moveTo"](0, _0x19d7b0), _0xfccbe4["save"](), _0xfccbe4["translate"](_0x57eec9 * 0.4, _0x19d7b0), _0xfccbe4["rotate"](-Math["PI"] / 2), _0xfccbe4["scale"](FONT_SCALE / _0x2db9de, FONT_SCALE / _0x2db9de), _0xfccbe4["fillText"](_0x2983cb, 4 * _0x2db9de, 7 * _0x2db9de), _0xfccbe4["restore"](), _0xfccbe4["lineTo"](_0x57eec9 * 9 / 16, _0x19d7b0);
    }
    _0xfccbe4["stroke"](), _0xfccbe4["closePath"](), _0xfccbe4["beginPath"](), _0xfccbe4["strokeStyle"] = _0x345b3c;
    for (let _0x241953 = _0x58b443, _0x323057 = 0; _0x241953 < _0x352fab; _0x241953 += _0x544622, _0x323057++) {
      const _0xa988b = _0x20a83d + _0x323057 * _0x2bc05a + 0.5;
      _0xfccbe4["moveTo"](0, _0xa988b), _0x241953 % _0x4f51a4 !== 0 && _0xfccbe4["lineTo"](_0x57eec9 * 1 / 4, _0xa988b);
    }
    _0xfccbe4["stroke"](), _0xfccbe4["closePath"]();
    if (_0x32671d["enable"]) {
      const _0x3218e9 = (_0x32671d["y"] - _0x24b95b) * _0x3cb8a7, _0x2e4ad4 = _0x32671d["height"] * _0x3cb8a7;
      _0xfccbe4["fillStyle"] = _0x595d33;
      if (_0x2e4ad4 > 0) {
        _0xfccbe4["save"]();
        const _0x7e6443 = Number(_0x32671d["y"])["toFixed"](0), _0xad9cfc = Number(_0x32671d["y"] + _0x32671d["height"])["toFixed"](0);
        _0xfccbe4["translate"](0, _0x3218e9), _0xfccbe4["rotate"](-Math["PI"] / 2), _0xfccbe4["fillText"](_0x7e6443, 2, _0x57eec9 * 9 / 16), _0xfccbe4["restore"](), _0xfccbe4["save"]();
        const _0x4316a8 = _0xfccbe4["measureText"](_0x7e6443);
        _0xfccbe4["translate"](0, _0x3218e9 + _0x2e4ad4 + _0x4316a8["width"] + 10), _0xfccbe4["rotate"](-Math["PI"] / 2), _0xfccbe4["fillText"](_0xad9cfc, 2, _0x57eec9 * 9 / 16);
      }
    }
    _0xfccbe4["setTransform"](1, 0, 0, 1, 0, 0);
  };
  const editorUtil = { "nanoid": nanoid, "sortBy": sortBy$1, "find": find$1, "cloneDeep": cloneDeep, "findIndex": findIndex, "updateSvgElement": updateSvgElement, "componentMerge": componentMerge, "localforage": _0x43842a, "treeToList": treeToList, "calculateBoundingBox": calculateBoundingBox, "calculateOuterBoundingBox": calculateOuterBoundingBox, "mod360": mod360, "composeMatrix": composeMatrix, "decomposeMatrix": decomposeMatrix, "getBoundingRect": getBoundingRect, "rotatePoint": rotatePoint, "getObjectCenter": getObjectCenter, "getCoords": getCoords, "getAngle": getAngle, "isPointInside": isPointInside, "getPositionFromCoords": getPositionFromCoords, "multiplyMatrix": multiplyMatrix, "createSvgElement": createSvgElement, "getPositionCenter": getPositionCenter, "getPositionRect": getPositionRect, "getBBox": getBBox, "isRectIntersect": isRectIntersect, "getTotalMatrix": getTotalMatrix, "applyMatrix": applyMatrix, "getObjMatrix": getObjMatrix, "getApplyMatrixPosition": getApplyMatrixPosition, "computeOBB": computeOBB, "getAngleVectors": getAngleVectors, "getProjection": getProjection, "getPathStr": getPathStr, "getPathBoundingBox": getPathBoundingBox, "isPointOnBezierCurve": isPointOnBezierCurve, "isPointArroundPath": isPointArroundPath, "splitBezierCurve": splitBezierCurve, "isPointArroundPolyline": isPointArroundPolyline, "setAttributes": setAttributes, "hideDoms": hideDoms, "showDoms": showDoms, "getDistance": getDistance, "traverse": traverse, "logError": logError, "logWarning": logWarning, "resetGroupSubsSize": resetGroupSubsSize, "resetGroupPosition": resetGroupPosition, "getRelativeBoundingRect": getRelativeBoundingRect };
  class ElementHandler {
    constructor(_0x26d7e1) {
      this["editor"] = _0x26d7e1, this["classNamePrefix"] = _0x26d7e1["config"]["classNamePrefix"] || "DATAVIS", this["initialize"]();
    }
    ["initialize"]() {
      this["initEditorDom"](), this["initCanvasDom"]();
    }
    ["initLayers"]() {
      this["initOverLayer"](), this["initControlLayer"](), this["initDrawLayer"]();
    }
    ["initEditorDom"]() {
      const { editor: _0x5f4043 } = this;
      _0x5f4043["editorDom"] = document["querySelector"](_0x5f4043["containerId"]);
      const _0x3d8791 = (_0xd90b47) => {
        _0x5f4043["fire"]("editor:mousemove", { "e": _0xd90b47 });
      }, _0x240dd9 = (_0x5a28ac) => {
        _0x5f4043["fire"]("editor:mouseup", { "e": _0x5a28ac }), document["removeEventListener"]("mousemove", _0x3d8791), document["removeEventListener"]("mouseup", _0x240dd9);
      };
      _0x5f4043["editorDom"]["addEventListener"]("mousedown", (_0x47f32a) => {
        let _0x5967cd = _0x5f4043["findTarget"](_0x47f32a);
        _0x5f4043["fire"]("editor:mousedown", { "e": _0x47f32a, "target": _0x5967cd }), document["addEventListener"]("mousemove", _0x3d8791), document["addEventListener"]("mouseup", _0x240dd9);
      });
    }
    ["initCanvasDom"]() {
      const { editor: _0x32e8b8 } = this;
      _0x32e8b8["canvasDom"] = document["querySelector"](_0x32e8b8["config"]["canvas"]), _0x32e8b8["canvasDom"]["style"]["transformOrigin"] = "left top";
    }
    ["initOverLayer"]() {
      const { editor: _0xc2e076 } = this, _0xb5705a = document["createElement"]("div");
      _0xb5705a["className"] = this["classNamePrefix"] + "-over-layer", _0xc2e076["overLayer"] = _0xb5705a, _0xc2e076["editorDom"]["appendChild"](_0xb5705a);
    }
    ["initDrawLayer"]() {
      const { editor: _0x3e3e27 } = this, _0x3f8657 = editorUtil["createSvgElement"]("svg", { "class": this["classNamePrefix"] + "-draw-layer" });
      _0x3e3e27["drawLayer"] = _0x3f8657, _0x3e3e27["canvasDom"]["appendChild"](_0x3f8657);
    }
    ["initControlLayer"]() {
      const { editor: _0x433dd8 } = this, _0x4372f2 = editorUtil["createSvgElement"]("svg", { "class": this["classNamePrefix"] + "-control-layer" }, { "width": "100%", "height": "100%", "overflow": "visible" });
      _0x433dd8["controlLayer"] = _0x4372f2, _0x433dd8["editorDom"]["appendChild"](_0x4372f2);
    }
  }
  var alignEnum = ((_0x40d352) => {
    return _0x40d352["left"] = "left", _0x40d352["right"] = "right", _0x40d352["centerX"] = "centerX", _0x40d352["top"] = "top", _0x40d352["bottom"] = "bottom", _0x40d352["centerY"] = "centerY", _0x40d352["horizontalUniform"] = "horizontalUniform", _0x40d352["verticalUniform"] = "verticalUniform", _0x40d352["horizontalDistance"] = "horizontalDistance", _0x40d352["verticalDistance"] = "verticalDistance", _0x40d352;
  })(alignEnum || {});
  class AlignHandler {
    constructor(_0x45fe7f) {
      this["distance"] = 0, this["editor"] = _0x45fe7f;
    }
    ["align"](_0x1543e4, _0x575080 = 0) {
      const _0x3a3fc3 = this["editor"], _0xbe77e4 = _0x3a3fc3["config"];
      this["distance"] = +_0x575080;
      const _0x567886 = _0x3a3fc3["util"]["calculateBoundingBox"], _0x3637ed = _0x3a3fc3["util"]["calculateOuterBoundingBox"], _0x1570ca = (_0x43fa80) => {
        let _0x1bbde1 = { "x": 0 };
        _0x43fa80["length"] > 1 && (_0x1bbde1 = _0x3637ed(_0x43fa80));
        const _0x960170 = _0x1bbde1["x"];
        _0x43fa80["forEach"]((_0x6419c5) => {
          const _0x2daf50 = _0x567886(_0x6419c5), _0xb0710d = _0x2daf50["x"], _0x12ca36 = _0x960170 - _0xb0710d;
          _0x6419c5["x"] += _0x12ca36;
        });
      }, _0x520bfa = (_0x61fa45) => {
        let _0x2dfd5e = { "x": 0, "w": _0xbe77e4["width"] };
        _0x61fa45["length"] > 1 && (_0x2dfd5e = _0x3637ed(_0x61fa45));
        const _0x450d1 = _0x2dfd5e["x"] + _0x2dfd5e["w"];
        _0x61fa45["forEach"]((_0x1cf9d8) => {
          const _0x262902 = _0x567886(_0x1cf9d8), _0x310160 = _0x262902["x"] + _0x262902["w"], _0x40727c = _0x450d1 - _0x310160;
          _0x1cf9d8["x"] += _0x40727c;
        });
      }, _0x5b5bb5 = (_0x12d732) => {
        let _0x554093 = { "x": 0, "w": _0xbe77e4["width"] };
        _0x12d732["length"] > 1 && (_0x554093 = _0x3637ed(_0x12d732));
        const _0x58c0de = _0x554093["x"] + _0x554093["w"] / 2;
        _0x12d732["forEach"]((_0x59fb66) => {
          const _0xfb8f09 = _0x567886(_0x59fb66), _0x126178 = _0xfb8f09["x"] + _0xfb8f09["w"] / 2, _0x32de00 = _0x58c0de - _0x126178;
          _0x59fb66["x"] += _0x32de00;
        });
      }, _0xfbc63f = (_0x5ec5d3) => {
        let _0x3b7efe = { "y": 0 };
        _0x5ec5d3["length"] > 1 && (_0x3b7efe = _0x3637ed(_0x5ec5d3));
        const _0x143b3b = _0x3b7efe["y"];
        _0x5ec5d3["forEach"]((_0x337600) => {
          const _0xe91dce = _0x567886(_0x337600), _0x64a14e = _0xe91dce["y"], _0x4b0100 = _0x143b3b - _0x64a14e;
          _0x337600["y"] += _0x4b0100;
        });
      }, _0x35d0c9 = (_0x46c9f5) => {
        let _0x45f29b = { "y": 0, "h": _0xbe77e4["height"] };
        _0x46c9f5["length"] > 1 && (_0x45f29b = _0x3637ed(_0x46c9f5));
        const _0x31be35 = _0x45f29b["y"] + _0x45f29b["h"] / 2;
        _0x46c9f5["forEach"]((_0x1b890f) => {
          const _0x2cdd45 = _0x567886(_0x1b890f), _0x2d48a7 = _0x2cdd45["y"] + _0x2cdd45["h"] / 2, _0xf533f = _0x31be35 - _0x2d48a7;
          _0x1b890f["y"] += _0xf533f;
        });
      }, _0x190371 = (_0x35a1d1) => {
        let _0x96bcbb = { "y": 0, "h": _0xbe77e4["height"] };
        _0x35a1d1["length"] > 1 && (_0x96bcbb = _0x3637ed(_0x35a1d1));
        const _0x27b719 = _0x96bcbb["y"] + _0x96bcbb["h"];
        _0x35a1d1["forEach"]((_0x5d6962) => {
          const _0x3aaa8e = _0x567886(_0x5d6962), _0x407236 = _0x3aaa8e["y"] + _0x3aaa8e["h"], _0x2e4edd = _0x27b719 - _0x407236;
          _0x5d6962["y"] += _0x2e4edd;
        });
      }, _0xde0dca = (_0x5105b1) => {
        const _0x324327 = _0x3637ed(_0x5105b1), _0x48f0b6 = _0x324327["w"], _0x2c03aa = _0x5105b1["reduce"]((_0x1cda86, _0x251530) => {
          const _0x298fa0 = _0x567886(_0x251530);
          return _0x1cda86 + _0x298fa0["w"];
        }, 0), _0x1c5a2b = this["distance"] || (_0x48f0b6 - _0x2c03aa) / (_0x5105b1["length"] - 1);
        _0x5105b1["sort"]((_0x300be8, _0x1679a4) => {
          const _0x1060bf = _0x567886(_0x300be8), _0x50e117 = _0x567886(_0x1679a4);
          return _0x1060bf["x"] - _0x50e117["x"];
        });
        const _0x43e826 = _0x324327["x"];
        let _0x1e5125 = _0x43e826;
        _0x5105b1["forEach"]((_0x489bd0, _0xc75fad) => {
          const _0x38afa2 = _0x567886(_0x489bd0);
          if (_0xc75fad > 0 && _0xc75fad < _0x5105b1["length"] - 1) {
            const _0x47ea4d = _0x1e5125 + _0x38afa2["w"] / 2, _0x327a71 = _0x47ea4d - (_0x489bd0["x"] + _0x38afa2["w"] / 2);
            _0x489bd0["x"] += _0x327a71;
          }
          _0x1e5125 += _0x38afa2["w"] + _0x1c5a2b;
        });
        const _0x52eb11 = _0x1e5125 - _0x1c5a2b, _0x456bed = _0x324327["x"] + _0x48f0b6 - _0x52eb11;
        _0x456bed > 0 && _0x5105b1["forEach"]((_0x4d5c9b, _0x309aaf) => {
          _0x309aaf < _0x5105b1["length"] - 1 && (_0x4d5c9b["x"] += _0x456bed);
        });
      }, _0x5cf3bf = (_0x4f8543) => {
        const _0x396fce = _0x3637ed(_0x4f8543), _0x128fd8 = _0x396fce["h"], _0x191840 = _0x4f8543["reduce"]((_0x1c41da, _0x37e49c) => {
          const _0x459bca = _0x567886(_0x37e49c);
          return _0x1c41da + _0x459bca["h"];
        }, 0), _0x2ff53e = this["distance"] || (_0x128fd8 - _0x191840) / (_0x4f8543["length"] - 1);
        _0x4f8543["sort"]((_0x5b6735, _0x4b1c61) => {
          const _0x42683d = _0x567886(_0x5b6735), _0x5c749d = _0x567886(_0x4b1c61);
          return _0x42683d["y"] - _0x5c749d["y"];
        });
        const _0x40f73a = _0x396fce["y"];
        let _0x1f0832 = _0x40f73a;
        _0x4f8543["forEach"]((_0x4b67ac, _0x56854a) => {
          const _0x1536d6 = _0x567886(_0x4b67ac);
          if (_0x56854a > 0 && _0x56854a < _0x4f8543["length"] - 1) {
            const _0x5bba70 = _0x1f0832 + _0x1536d6["h"] / 2, _0x4357fe = _0x5bba70 - (_0x4b67ac["y"] + _0x1536d6["h"] / 2);
            _0x4b67ac["y"] += _0x4357fe;
          }
          _0x1f0832 += _0x1536d6["h"] + _0x2ff53e;
        });
        const _0x404c05 = _0x1f0832 - _0x2ff53e, _0x70c3a2 = _0x396fce["y"] + _0x128fd8 - _0x404c05;
        _0x70c3a2 > 0 && _0x4f8543["forEach"]((_0x1af3be, _0x3e9fa9) => {
          _0x3e9fa9 < _0x4f8543["length"] - 1 && (_0x1af3be["y"] += _0x70c3a2);
        });
      }, _0xff1326 = (_0x2368ed) => {
        _0x2368ed["sort"]((_0x1fd631, _0x145f22) => {
          const _0x542068 = _0x567886(_0x1fd631), _0x3e2e67 = _0x567886(_0x145f22);
          return _0x542068["x"] - _0x3e2e67["x"];
        });
        const _0x114863 = this["distance"];
        for (let _0x4097d4 = 1; _0x4097d4 < _0x2368ed["length"]; _0x4097d4++) {
          const _0x51abdd = _0x2368ed[_0x4097d4 - 1], _0x5b7813 = _0x2368ed[_0x4097d4], _0x121639 = _0x567886(_0x51abdd), _0x4a6a36 = _0x121639["x"] + _0x121639["w"] + _0x114863;
          _0x5b7813["x"] = _0x4a6a36;
        }
      }, _0x27c0ed = (_0x4f576d) => {
        _0x4f576d["sort"]((_0x3e4c51, _0x542f6d) => {
          const _0x109466 = _0x567886(_0x3e4c51), _0x280904 = _0x567886(_0x542f6d);
          return _0x109466["y"] - _0x280904["y"];
        });
        const _0x30ee8c = this["distance"];
        for (let _0x40453a = 1; _0x40453a < _0x4f576d["length"]; _0x40453a++) {
          const _0x1b4bb5 = _0x4f576d[_0x40453a - 1], _0x587677 = _0x4f576d[_0x40453a], _0x42cd79 = _0x567886(_0x1b4bb5), _0x3ff618 = _0x42cd79["y"] + _0x42cd79["h"] + _0x30ee8c;
          _0x587677["y"] = _0x3ff618;
        }
      }, _0x206662 = _0x3a3fc3["getActiveObjects"]();
      if (!(_0x206662 == null ? void 0 : _0x206662["length"]))
        return;
      switch (_0x1543e4) {
        case "left":
          _0x1570ca(_0x206662);
          break;
        case "right":
          _0x520bfa(_0x206662);
          break;
        case "centerX":
          _0x5b5bb5(_0x206662);
          break;
        case "top":
          _0xfbc63f(_0x206662);
          break;
        case "centerY":
          _0x35d0c9(_0x206662);
          break;
        case "bottom":
          _0x190371(_0x206662);
          break;
        case "horizontalUniform":
          _0xde0dca(_0x206662);
          break;
        case "verticalUniform":
          _0x5cf3bf(_0x206662);
          break;
        case "horizontalDistance":
          _0xff1326(_0x206662);
          break;
        case "verticalDistance":
          _0x27c0ed(_0x206662);
          break;
      }
      return _0x3a3fc3["setActiveObjects"](_0x206662), Promise["resolve"]("");
    }
  }
  var HistoryTypesEnum = ((_0x69c7d2) => {
    return _0x69c7d2["attrs"] = "attrs", _0x69c7d2["inversion"] = "inversion", _0x69c7d2["add"] = "add", _0x69c7d2["delete"] = "delete", _0x69c7d2["config"] = "config", _0x69c7d2;
  })(HistoryTypesEnum || {});
  var ObjectAttrsEnum = ((_0x5e09e9) => {
    return _0x5e09e9["position"] = "position", _0x5e09e9["all"] = "all", _0x5e09e9;
  })(ObjectAttrsEnum || {});
  class HistoryHandler {
    constructor(_0xe5482e) {
      this["undoList"] = [], this["redoList"] = [], this["opLoding"] = ![], this["editor"] = _0xe5482e, this["editorMount"]();
    }
    ["editorMount"]() {
      this["editor"]["undo"] = this["undo"]["bind"](this), this["editor"]["redo"] = this["redo"]["bind"](this), this["editor"]["emitStatus"] = this["emitStatus"]["bind"](this), this["editor"]["getStatus"] = this["getStatus"]["bind"](this), this["editor"]["store"] = this["store"]["bind"](this), this["editor"]["handleRestoreAttrs"] = this["handleRestoreInversion"]["bind"](this), this["editor"]["handleRestoreInversion"] = this["handleRestoreInversion"]["bind"](this), this["editor"]["handleRestoreAdd"] = this["handleRestoreAdd"]["bind"](this), this["editor"]["handleRestoreDelete"] = this["handleRestoreDelete"]["bind"](this), this["editor"]["handleRestoreConfig"] = this["handleRestoreConfig"]["bind"](this), this["editor"]["handleRestore"] = this["handleRestore"]["bind"](this);
    }
    ["undo"]() {
      const { undoList: _0x55b2ac, redoList: _0x71739e, editor: _0xc4702e } = this;
      if (this["opLoding"])
        return editorUtil["logWarning"]("please wait for the operation to complete.");
      this["opLoding"] = !![], _0xc4702e["fire"]("history:before:operation", "undo");
      try {
        if (_0x55b2ac["length"]) {
          const _0x58dd00 = _0x55b2ac["pop"]();
          this["operation"] = _0x58dd00, _0x58dd00 && this["handleRestore"](_0x58dd00, _0x71739e);
        }
      } catch (_0x3cf305) {
        editorUtil["logError"](_0x3cf305);
      } finally {
        this["opLoding"] = ![];
      }
    }
    ["redo"]() {
      const { undoList: _0x263194, redoList: _0x58469a, editor: _0x3549ac } = this;
      if (this["opLoding"])
        return editorUtil["logWarning"]("please wait for the operation to complete.");
      this["opLoding"] = !![], _0x3549ac["fire"]("history:before:operation", "redo");
      try {
        if (_0x58469a["length"]) {
          const _0x1ad798 = _0x58469a["pop"]();
          this["operation"] = _0x1ad798, _0x1ad798 && this["handleRestore"](_0x1ad798, _0x263194);
        }
      } catch (_0x454954) {
        editorUtil["logError"](_0x454954);
      } finally {
        this["opLoding"] = ![];
      }
    }
    ["emitStatus"]() {
      const _0x657525 = this["editor"];
      _0x657525["fire"]("history:changed", this["getStatus"]());
    }
    ["getStatus"]() {
      return { "canUndo": this["undoList"]["length"] > 0, "canRedo": this["redoList"]["length"] > 0, "opLoding": this["opLoding"] };
    }
    ["store"](_0x2d5a2f) {
      this["undoList"]["push"](_0x2d5a2f), this["redoList"] = [];
    }
    ["handleRestoreAttrs"](_0x1ec8cc, _0x4838d6) {
      const { editor: _0x585783 } = this, { from: _0x1befc8, to: _0x47f209 } = _0x1ec8cc, _0x80148a = [], _0xa8dc8c = {};
      let _0x884026 = ["w", "h"], _0x2d1a2f = ["x", "y"];
      _0x1befc8["data"]["forEach"]((_0x212397) => {
        const { id: _0x1d605f } = _0x212397["data"];
        Reflect["set"](_0xa8dc8c, _0x1d605f, _0x212397["data"]), _0x80148a["push"](_0x1d605f);
      });
      const _0x63e5da = _0x585783["getObjectsByCondition"]((_0x5391ae) => _0x80148a["includes"](_0x5391ae["id"])), _0x1370c1 = [];
      _0x63e5da["forEach"]((_0x4a6e2d) => {
        const _0x477851 = _0xa8dc8c[_0x4a6e2d["id"]], _0xe43864 = { "w": _0x4a6e2d["w"], "h": _0x4a6e2d["h"] };
        _0x4a6e2d["set"](_0x477851);
        const _0x1f3862 = Object["keys"](_0x477851);
        _0x1f3862["some"]((_0x593718) => _0x884026["includes"](_0x593718)) && (_0x4a6e2d["handleSizeChange"] && _0x4a6e2d["handleSizeChange"](_0xe43864)), _0x1f3862["some"]((_0x2a8c47) => _0x2d1a2f["includes"](_0x2a8c47)) && (_0x4a6e2d["group"] && !_0x1370c1["find"]((_0x3bca52) => _0x3bca52["id"] === _0x4a6e2d["group"]["id"]) && _0x1370c1["push"](_0x4a6e2d["group"]));
      }), _0x1370c1["forEach"]((_0x2e222e) => {
        editorUtil["resetGroupPosition"](_0x2e222e);
      }), _0x585783["setActiveObjectsWithPosition"](_0x63e5da, _0x1befc8["activeSelection"]), _0x4838d6["push"]({ "type": HistoryTypesEnum["attrs"], "from": _0x47f209, "to": _0x1befc8 });
    }
    ["handleRestoreInversion"](_0x47eed7, _0x2f106f) {
      const { editor: _0x43af21 } = this, { from: _0x45efde, to: _0x335d23 } = _0x47eed7, _0x3ca589 = _0x335d23["data"]["map"]((_0x58a816) => _0x58a816["data"]["id"]), _0x8c5784 = _0x43af21["getObjectsByCondition"]((_0x46c07a) => _0x3ca589["includes"](_0x46c07a["id"]));
      _0x8c5784["forEach"]((_0x2f23a3) => {
        const _0x4380cf = _0x2f23a3["group"] || _0x43af21, _0x2e4790 = _0x4380cf["objects"]["findIndex"]((_0x27ce36) => _0x27ce36["id"] === _0x2f23a3["id"]);
        _0x2e4790 > -1 && _0x4380cf["objects"]["splice"](_0x2e4790, 1);
      });
      const _0x12b8eb = [], _0x1c4ec4 = [];
      _0x45efde["groupPositions"] && _0x45efde["groupPositions"]["forEach"]((_0x46b6c1) => {
        const _0x1b03d7 = _0x43af21["getObjectById"](_0x46b6c1["id"]), _0x428ac3 = _0x1b03d7["x"] - _0x46b6c1["x"], _0x3f9ae7 = _0x1b03d7["y"] - _0x46b6c1["y"];
        _0x1b03d7["set"](_0x46b6c1), _0x1b03d7["objects"]["forEach"]((_0x3af080) => {
          _0x3af080["x"] += _0x428ac3, _0x3af080["y"] += _0x3f9ae7;
        });
      }), _0x45efde["data"]["forEach"]((_0x47b0af, _0x3b28ed) => {
        const _0x56d309 = _0x43af21["plainObjectToClass"](_0x47b0af["data"]), { parentId: _0x20a1a0, index: _0x1b3a30 } = _0x45efde["data"][_0x3b28ed], _0x4ee099 = (_0x20a1a0 ? _0x43af21["getObjectById"](_0x20a1a0) : null) || _0x43af21;
        _0x4ee099 && _0x4ee099["type"] === "group" && (_0x56d309["group"] = _0x4ee099, !_0x1c4ec4["find"]((_0x4aaea2) => _0x4aaea2["id"] === _0x4ee099["id"]) && _0x1c4ec4["push"](_0x4ee099)), _0x4ee099["objects"]["splice"](_0x1b3a30, 0, _0x56d309), _0x12b8eb["push"](_0x56d309);
      }), _0x1c4ec4["forEach"]((_0x1c7395) => {
        editorUtil["resetGroupPosition"](_0x1c7395);
      }), _0x43af21["setActiveObjectsWithPosition"](_0x12b8eb, _0x45efde["activeSelection"]), _0x2f106f["push"]({ "type": _0x47eed7["type"], "from": _0x335d23, "to": _0x45efde });
    }
    ["handleRestoreAdd"](_0x3543ae, _0x56fc82) {
      const { editor: _0x2de3cf } = this, { from: _0x434d4d, to: _0x55699b } = _0x3543ae, _0x3005b4 = _0x55699b["data"]["map"]((_0x4a3291) => _0x4a3291["data"]["id"]), _0x175680 = _0x2de3cf["getObjectsByCondition"]((_0x28ddc1) => _0x3005b4["includes"](_0x28ddc1["id"]));
      _0x175680["sort"]((_0xe2e75b, _0x1403e4) => {
        const _0x87179 = _0x3005b4["indexOf"](_0xe2e75b["id"]), _0x28ed10 = _0x3005b4["indexOf"](_0x1403e4["id"]);
        return _0x28ed10 - _0x87179;
      }), _0x2de3cf["objectHandler"]["remove"](_0x175680);
      const _0x3506cc = _0x434d4d["data"]["map"]((_0x3ce8fa) => _0x3ce8fa["data"]["id"]), _0x4f5bd8 = _0x2de3cf["getObjectsByCondition"]((_0x52b08e) => _0x3506cc["includes"](_0x52b08e["id"]));
      _0x2de3cf["setActiveObjectsWithPosition"](_0x4f5bd8, _0x434d4d["activeSelection"]), _0x56fc82["push"]({ "type": HistoryTypesEnum["delete"], "from": _0x55699b, "to": _0x434d4d });
    }
    ["handleRestoreDelete"](_0x5c1aad, _0x2e6ed6) {
      const { editor: _0x2cc599 } = this, { from: _0x2807f1, to: _0x7fb356 } = _0x5c1aad, _0x357f12 = [];
      _0x2807f1["data"]["forEach"]((_0x32c053, _0x487e04) => {
        const _0x2c03db = _0x2cc599["plainObjectToClass"](_0x32c053["data"]), { parentId: _0x4467e0, index: _0x19c426 } = _0x2807f1["data"][_0x487e04], _0x2b4bc4 = _0x4467e0 ? _0x2cc599["getObjectById"](_0x4467e0) : _0x2cc599;
        _0x4467e0 && (_0x2c03db["group"] = _0x2b4bc4), _0x2b4bc4["objects"]["splice"](_0x19c426, 0, _0x2c03db), _0x357f12["push"](_0x2c03db);
      }), _0x2cc599["setActiveObjectsWithPosition"](_0x357f12, _0x2807f1["activeSelection"]), _0x2e6ed6["push"]({ "type": HistoryTypesEnum["add"], "from": _0x7fb356, "to": _0x2807f1 });
    }
    ["handleRestoreConfig"](_0x32e33a, _0x43075e) {
      const { editor: _0x4f29e5 } = this, { from: _0x5ccee8, to: _0x5abb3f } = _0x32e33a;
      Object["assign"](_0x4f29e5["config"], _0x5ccee8), _0x43075e["push"]({ "type": HistoryTypesEnum["config"], "from": _0x5abb3f, "to": _0x5ccee8 });
    }
    ["handleRestore"](_0x1d119a, _0x388d7d) {
      const { editor: _0x590fc8 } = this;
      switch (_0x1d119a["type"]) {
        case HistoryTypesEnum["attrs"]:
          this["handleRestoreAttrs"](_0x1d119a, _0x388d7d);
          break;
        case HistoryTypesEnum["inversion"]:
          this["handleRestoreInversion"](_0x1d119a, _0x388d7d);
          break;
        case HistoryTypesEnum["add"]:
          this["handleRestoreAdd"](_0x1d119a, _0x388d7d);
          break;
        case HistoryTypesEnum["delete"]:
          this["handleRestoreDelete"](_0x1d119a, _0x388d7d);
          break;
        case HistoryTypesEnum["config"]:
          this["handleRestoreConfig"](_0x1d119a, _0x388d7d);
          break;
      }
      _0x590fc8["layerChange"](), this["emitStatus"]();
    }
  }
  const angleCursorList = [{ "cursor": "n", "list": [[23, 68]] }, { "cursor": "ne", "list": [[23, 113]] }, { "cursor": "e", "list": [[113, 158]] }, { "cursor": "se", "list": [[158, 203]] }, { "cursor": "s", "list": [[203, 248]] }, { "cursor": "sw", "list": [[248, 293]] }, { "cursor": "w", "list": [[293, 338]] }, { "cursor": "nw", "list": [[338, 360], [0, 23]] }], initialAngle = { "tl": 0, "t": 45, "tr": 90, "r": 135, "br": 180, "b": 225, "bl": 270, "l": 315 }, controlMap = { "tl": "br", "tr": "bl", "bl": "tr", "br": "tl", "l": "r", "r": "l", "t": "b", "b": "t" }, lnflectionPointList = ["tl", "tr", "bl", "br"], handleResize = (_0x590ce6 = { "x": 0, "y": 0 }, _0x1c9b8d, _0x1b7990, _0xc9be19, _0x8243b6) => {
    const _0x5c8ae0 = _0x1b7990["getActiveObject"](), _0x55003d = _0x8243b6["get"](_0x5c8ae0["id"]);
    _0x55003d["groupId"] && (_0x590ce6 = convertMousePoint(_0x590ce6, _0x55003d["groupId"], _0x8243b6));
    const _0x2c1823 = _0x8243b6["get"](_0x5c8ae0["id"]), _0x1caffc = editorUtil["getCoords"](_0x2c1823);
    let _0x3582c2 = _0x1caffc[controlMap[_0x1c9b8d]];
    const _0x51e488 = { "x": _0x2c1823["x"] + _0x2c1823["w"] / 2, "y": _0x2c1823["y"] + _0x2c1823["h"] / 2 };
    _0x51e488["x"] = +_0x51e488["x"]["toFixed"](4), _0x51e488["y"] = +_0x51e488["y"]["toFixed"](4), _0x3582c2["x"] = +_0x3582c2["x"]["toFixed"](4), _0x3582c2["y"] = +_0x3582c2["y"]["toFixed"](4);
    let _0x1543ec = (_0x51e488["y"] - _0x3582c2["y"]) / (_0x51e488["x"] - _0x3582c2["x"]);
    const _0x20ecf9 = _0x1543ec === Infinity || _0x1543ec === -Infinity;
    ["l", "r", "t", "b"]["includes"](_0x1c9b8d) && (_0x20ecf9 ? _0x590ce6["x"] = _0x3582c2["x"] : _0x590ce6["y"] = (_0x590ce6["x"] - _0x3582c2["x"]) * _0x1543ec + _0x3582c2["y"]);
    let [_0x5883a2, _0x271683, _0x17c717, _0x5b8244] = [0, 0, 0, 0];
    const _0x41cf26 = /t/["test"](_0x1c9b8d), _0x2b2408 = /b/["test"](_0x1c9b8d), _0x420053 = /l/["test"](_0x1c9b8d), _0x585a78 = /r/["test"](_0x1c9b8d), _0x4edd4e = lnflectionPointList["find"]((_0x55cad2) => _0x55cad2 === _0x1c9b8d), _0x16b0a2 = _0x5c8ae0["isRatioScale"], _0x32ef29 = _0x5c8ae0["y"], _0xf209e0 = _0x5c8ae0["w"], _0x2ed7d6 = _0x5c8ae0["h"];
    let _0x468c04 = { "x": (_0x3582c2["x"] + _0x590ce6["x"]) / 2, "y": (_0x3582c2["y"] + _0x590ce6["y"]) / 2 };
    const _0x30d677 = editorUtil["rotatePoint"](_0x3582c2, _0x468c04, -_0x2c1823["angle"]), _0x92b03b = editorUtil["rotatePoint"](_0x590ce6, _0x468c04, -_0x2c1823["angle"]);
    _0x17c717 = Math["abs"](_0x30d677["x"] - _0x92b03b["x"]), _0x5b8244 = Math["abs"](_0x30d677["y"] - _0x92b03b["y"]), _0x5883a2 = _0x468c04["x"] - _0x17c717 / 2, _0x271683 = _0x468c04["y"] - _0x5b8244 / 2;
    if (_0x16b0a2 || _0xc9be19["shiftKey"]) {
      _0x17c717 = _0x17c717 < 10 ? 10 : _0x17c717, _0x5b8244 = _0x5b8244 < 10 ? 10 : _0x5b8244;
      let _0x389624 = _0x17c717 / _0xf209e0;
      if (_0x4edd4e) {
        const _0x505ef8 = _0x2ed7d6 * _0x389624;
        _0x5b8244 = Math["round"](_0x505ef8), ["tl", "tr"]["find"]((_0x4cf489) => _0x4cf489 === _0x1c9b8d) && (_0x271683 = _0x32ef29 - Math["round"](_0x505ef8 - _0x2ed7d6));
      } else
        (_0x420053 || _0x585a78) && (_0x389624 = _0x17c717 / _0xf209e0, _0x5b8244 = Math["round"](_0x2ed7d6 * _0x389624), _0x271683 = _0x2c1823["y"]), (_0x41cf26 || _0x2b2408) && (_0x389624 = _0x5b8244 / _0x2ed7d6, _0x17c717 = Math["round"](_0xf209e0 * _0x389624), _0x5883a2 = _0x2c1823["x"]);
    } else {
      if (["t", "b"]["includes"](_0x1c9b8d))
        _0x17c717 = _0x2c1823["w"], _0x5883a2 = _0x468c04["x"] - _0x17c717 / 2;
      else
        ["l", "r"]["includes"](_0x1c9b8d) && (_0x5b8244 = _0x2c1823["h"], _0x271683 = _0x468c04["y"] - _0x5b8244 / 2);
    }
    const _0x439983 = { "x": _0x5883a2, "y": _0x271683, "w": _0x17c717, "h": _0x5b8244, "angle": _0x2c1823["angle"] }, _0xacea8c = { "w": _0x5c8ae0["w"], "h": _0x5c8ae0["h"] };
    Object["assign"](_0x5c8ae0, _0x439983), _0x5c8ae0["type"] === "activeSelection" ? setActiveSelectionObjsPosition(_0x5c8ae0, _0x8243b6) : _0x5c8ae0["handleSizeChange"] && _0x5c8ae0["handleSizeChange"](_0xacea8c), _0x1b7990["fire"]("object:resizing", { "target": _0x5c8ae0 });
  }, setActiveSelectionObjsPosition = (_0x1c4001, _0x4f96fc) => {
    const _0x169583 = _0x4f96fc["get"](_0x1c4001["id"]), _0x2d979b = _0x1c4001["w"] / _0x169583["w"], _0x366da9 = _0x1c4001["h"] / _0x169583["h"], _0x35b1df = { "x": _0x169583["x"] + _0x169583["w"] / 2, "y": _0x169583["y"] + _0x169583["h"] / 2 };
    _0x1c4001["objects"]["forEach"]((_0x22793b) => {
      const _0x23fbc8 = _0x4f96fc["get"](_0x22793b["id"]);
      let _0x353c2d = { "x": _0x23fbc8["x"] + _0x23fbc8["w"] / 2, "y": _0x23fbc8["y"] + _0x23fbc8["h"] / 2 };
      _0x353c2d = editorUtil["rotatePoint"](_0x353c2d, _0x35b1df, -_0x169583["angle"]);
      let _0x3515a2 = _0x353c2d["x"] - _0x23fbc8["w"] / 2 - _0x169583["x"], _0x477ac7 = _0x353c2d["y"] - _0x23fbc8["h"] / 2 - _0x169583["y"], _0x24d8de = _0x23fbc8["angle"] - _0x169583["angle"];
      const _0x59337d = { "x": _0x3515a2, "y": _0x477ac7, "w": _0x23fbc8["w"], "h": _0x23fbc8["h"], "angle": _0x24d8de }, _0x2abbd9 = { "w": _0x22793b["w"], "h": _0x22793b["h"] }, _0xe9f521 = editorUtil["getCoords"](_0x59337d);
      Object["values"](_0xe9f521)["forEach"]((_0x3cec19) => {
        _0x3cec19["x"] = _0x3cec19["x"] * _0x2d979b, _0x3cec19["y"] = _0x3cec19["y"] * _0x366da9;
      });
      let { tl: _0x45661e, br: _0x15bb2f } = _0xe9f521;
      const _0x7c0ae4 = { "x": (_0x45661e["x"] + _0x15bb2f["x"]) / 2, "y": (_0x45661e["y"] + _0x15bb2f["y"]) / 2 }, _0xfd0a46 = _0x23fbc8["w"] * _0x2d979b, _0x285865 = _0x23fbc8["h"] * _0x366da9, _0x53f3da = _0x7c0ae4["x"] - _0xfd0a46 / 2 + _0x1c4001["x"], _0xbf1536 = _0x7c0ae4["y"] - _0x285865 / 2 + _0x1c4001["y"];
      _0x22793b["x"] = _0x53f3da, _0x22793b["y"] = _0xbf1536, _0x22793b["w"] = _0xfd0a46, _0x22793b["h"] = _0x285865, _0x22793b["handleSizeChange"] && _0x22793b["handleSizeChange"](_0x2abbd9);
    });
  }, convertMousePoint = (_0x3598d3, _0x98955, _0x2a9c58) => {
    let _0x27ba2a = _0x3598d3 || { "x": 0, "y": 0 };
    const _0x143c96 = (_0x1ac0cf) => {
      const _0x1cbd22 = _0x2a9c58["get"](_0x1ac0cf), { x: _0xfd5407, y: _0x50995c, angle: _0x1bfe4f } = _0x1cbd22, _0x27ba02 = editorUtil["composeMatrix"]({ "tx": _0xfd5407, "ty": _0x50995c, "angle": _0x1bfe4f }), _0x268d5f = inverse(_0x27ba02);
      _0x27ba2a = applyToPoint(_0x268d5f, _0x27ba2a), _0x1cbd22["groupId"] && _0x143c96(_0x1cbd22["groupId"]);
    };
    return _0x143c96(_0x98955), _0x27ba2a;
  }, handleRotate = (_0x3c425d, _0xe105e0) => {
    const _0x5af9b8 = _0xe105e0["getActiveObject"]();
    let _0x28934a = _0x5af9b8["getGlobalPosition"]();
    const _0x5cd698 = { "x": _0x28934a["x"] + _0x28934a["w"] / 2, "y": _0x28934a["y"] + _0x28934a["h"] / 2 }, _0x460576 = editorUtil["getAngle"](_0x3c425d, _0x5cd698), _0x5894f6 = _0x460576 - _0x28934a["angle"];
    _0x5af9b8["angle"] = _0x460576, _0x5af9b8["type"] === "activeSelection" && _0x5af9b8["objects"]["forEach"]((_0x2770a3) => {
      const { x: _0x427688, y: _0x429195, w: _0x12f06f, h: _0xce655a, angle: _0xe916df } = _0x2770a3["getGlobalPosition"](), _0x152b7e = _0x427688 + _0x12f06f / 2, _0x3aaddc = _0x429195 + _0xce655a / 2, _0x2d4c82 = editorUtil["rotatePoint"]({ "x": _0x152b7e, "y": _0x3aaddc }, _0x5cd698, _0x5894f6);
      _0x2770a3["x"] = _0x2d4c82["x"] - _0x12f06f / 2 - (_0x2770a3["group"] ? _0x2770a3["group"]["getGlobalPosition"]()["x"] : 0), _0x2770a3["y"] = _0x2d4c82["y"] - _0xce655a / 2 - (_0x2770a3["group"] ? _0x2770a3["group"]["getGlobalPosition"]()["y"] : 0), _0x2770a3["angle"] = _0xe916df + _0x5894f6;
    }), _0xe105e0["fire"]("object:rotating", { "target": _0x5af9b8 });
  };
  class RectControls {
    constructor(_0xe04d74, _0x22673e) {
      this["controls"] = { "t": { "visible": !![] }, "b": { "visible": !![] }, "l": { "visible": !![] }, "r": { "visible": !![] }, "tl": { "visible": !![] }, "tr": { "visible": !![] }, "bl": { "visible": !![] }, "br": { "visible": !![] }, "rotate": { "visible": !![] } }, this["controlDomList"] = [], this["controlGroupDom"] = null, this["activeSelectionDomList"] = [], this["editor"] = _0xe04d74, this["target"] = _0x22673e;
      const { controlLayer: _0xa7237b } = _0xe04d74;
      _0xa7237b["innerHTML"] = "", _0xa7237b["setAttribute"]("data-id", _0x22673e["id"]);
      const _0x25423b = (_0x259cef, _0x448f82) => {
        let [_0x25638a, _0x27a74f] = [0, 0], _0x57626e, _0x5b7088 = /* @__PURE__ */ new Map(), _0x57c1aa = ![];
        _0x259cef["addEventListener"]("mousedown", (_0x57c0a3) => {
          _0x57c0a3["stopPropagation"] && _0x57c0a3["stopPropagation"](), _0x57c0a3["preventDefault"] && _0x57c0a3["preventDefault"]();
          if (this["target"]["locked"] && _0x448f82 === "rotate")
            return _0xe04d74["shortcutHandler"]["handleLock"](![]);
          _0x5b7088 = _0xe04d74["getPositionMap"](), _0x25638a = _0x57c0a3["clientX"], _0x27a74f = _0x57c0a3["clientY"], _0x57626e = _0xe04d74["getActiveObjectPositionState"](), document["addEventListener"]("mousemove", _0x5abcc6), document["addEventListener"]("mouseup", _0x13e50c);
        });
        const _0x5abcc6 = (_0x1c87c9) => {
          !_0x57c1aa && (_0x57c1aa = !![], _0xe04d74["zoomHandler"]["setHighPerformance"](!![]));
          const _0x19e200 = _0xe04d74["getMouseInnerPosition"](_0x1c87c9);
          _0x448f82 === "rotate" ? handleRotate(_0x19e200, _0xe04d74) : handleResize(_0x19e200, _0x448f82, _0xe04d74, _0x1c87c9, _0x5b7088), this["updateControlsPosition"]();
        }, _0x13e50c = (_0x19666d) => {
          _0x57c1aa = ![], _0xe04d74["zoomHandler"]["setHighPerformance"](![]), _0x25638a !== _0x19666d["clientX"] && _0x27a74f !== _0x19666d["clientY"] && (_0xe04d74["historyHandler"]["store"]({ "type": HistoryTypesEnum["attrs"], "from": _0x57626e, "to": _0xe04d74["getActiveObjectPositionState"]() }), _0x448f82 === "rotate" ? _0xe04d74["fire"]("object:rotate:end", { "target": _0x22673e }) : _0xe04d74["fire"]("object:resize:end", { "target": _0x22673e })), document["removeEventListener"]("mousemove", _0x5abcc6), document["removeEventListener"]("mouseup", _0x13e50c);
        };
      };
      if (_0x22673e["type"] === "activeSelection") {
        const _0x1cd49e = editorUtil["createSvgElement"]("g");
        _0x22673e["objects"]["forEach"]((_0x338caa) => {
          const _0x345762 = editorUtil["createSvgElement"]("rect", { "x": 0, "y": 0, "width": 0, "height": 0, "class": "sub-border-rect" }, { "fill": "transparent", "stroke": "#2c83fb", "stroke-width": 2, "stroke-dasharray": "2 2" });
          _0x1cd49e["appendChild"](_0x345762), this["activeSelectionDomList"]["push"]({ "item": _0x338caa, "itemRect": _0x345762 });
        }), _0xa7237b["appendChild"](_0x1cd49e);
      }
      const _0x5384ea = editorUtil["createSvgElement"]("g");
      _0xa7237b["appendChild"](_0x5384ea), this["controlGroupDom"] = _0x5384ea;
      const _0x179c71 = editorUtil["createSvgElement"]("rect", { "x": 0, "y": 0, "width": 0, "height": 0, "class": "border-rect" });
      _0x5384ea["appendChild"](_0x179c71), Object["keys"](this["controls"])["forEach"]((_0x358f28) => {
        if (_0x358f28 !== "rotate") {
          const _0x1245fd = editorUtil["createSvgElement"]("circle", { "cx": 0, "cy": 0, "r": 5, "fill": "#ffffff", "stroke": "#2c83fb" }), _0x319aeb = (initialAngle[_0x358f28] + _0x22673e["angle"]) % 360, _0x26dd40 = angleCursorList["find"]((_0x3d7426) => {
            return !!_0x3d7426["list"]["find"]((_0x158b32) => _0x158b32[0] <= _0x319aeb && _0x158b32[1] >= _0x319aeb);
          }) || { "cursor": "" };
          Object["assign"](_0x1245fd["style"], { "cursor": _0x26dd40["cursor"] + "-resize", "pointerEvents": "auto" }), _0x5384ea["appendChild"](_0x1245fd), _0x25423b(_0x1245fd, _0x358f28), this["controlDomList"]["push"]({ "dom": _0x1245fd, "key": _0x358f28 });
        } else {
          const _0x4e9bb3 = editorUtil["createSvgElement"]("g", {});
          _0x4e9bb3["innerHTML"] = '<foreignObject width="20" height="20" class="rotate-point"><div></div></foreignObject>', Object["assign"](_0x4e9bb3["style"], { "cursor": "move", "pointerEvents": "auto" }), _0x25423b(_0x4e9bb3, _0x358f28), this["controlDomList"]["push"]({ "dom": _0x4e9bb3, "key": _0x358f28 }), _0x5384ea["appendChild"](_0x4e9bb3);
        }
      });
      if (_0x22673e["type"] === "activeSelection")
        _0x22673e["objects"]["forEach"]((_0x36aae5) => {
        });
      else {
        const _0x136a70 = editorUtil["createSvgElement"]("rect", { "x": 0, "y": 0, "width": 0, "height": 0, "class": "group-rect" }, { "stroke": "#2c83fb", "stroke-width": "1px", "fill": "transparent", "stroke-dasharray": "2 2" });
        _0xa7237b["appendChild"](_0x136a70);
      }
      this["updateControlsPosition"]();
    }
    ["updateControlsPosition"]() {
      const { editor: _0x2452a4, target: _0x3d5cc7, controlGroupDom: _0x37273d } = this, { controlLayer: _0x11715e } = _0x2452a4, { x: _0x30c214, y: _0x4af9fb, w: _0x329a3b, h: _0x4fc1d3, angle: _0x244f4d } = _0x3d5cc7["getContainerPosition"]();
      _0x3d5cc7["locked"] ? _0x11715e["classList"]["add"]("locked") : _0x11715e["classList"]["remove"]("locked");
      const _0x14831b = _0x37273d["querySelector"](".border-rect");
      editorUtil["updateSvgElement"](_0x14831b, { "width": _0x329a3b, "height": _0x4fc1d3 }, { "pointerEvents": _0x3d5cc7["editing"] ? "none" : "auto" });
      const _0x4c5ad4 = { "transform": "rotate(" + _0x244f4d + "deg) translate(" + _0x30c214 + "px, " + _0x4af9fb + "px)", "transformOrigin": _0x30c214 + _0x329a3b / 2 + "px " + (_0x4af9fb + _0x4fc1d3 / 2) + "px" };
      Object["assign"](this["controlGroupDom"]["style"], _0x4c5ad4), this["controlDomList"]["forEach"]((_0x543145) => {
        const { dom: _0x266061, key: _0x1985f2 } = _0x543145;
        let [_0xc736a2, _0x1bc6e2] = [0, 0];
        switch (_0x1985f2) {
          case "t":
            _0xc736a2 = _0x329a3b / 2;
            break;
          case "b":
            _0xc736a2 = _0x329a3b / 2, _0x1bc6e2 = _0x4fc1d3;
            break;
          case "l":
            _0x1bc6e2 = _0x4fc1d3 / 2;
            break;
          case "r":
            _0xc736a2 = _0x329a3b, _0x1bc6e2 = _0x4fc1d3 / 2;
            break;
          case "tl":
            break;
          case "tr":
            _0xc736a2 = _0x329a3b;
            break;
          case "bl":
            _0x1bc6e2 = _0x4fc1d3;
            break;
          case "br":
            _0xc736a2 = _0x329a3b, _0x1bc6e2 = _0x4fc1d3;
            break;
          case "rotate":
            _0xc736a2 = _0x329a3b / 2 - 10, _0x1bc6e2 = -30;
            break;
        }
        const _0x1d63c4 = { "x": _0xc736a2, "y": _0x1bc6e2 };
        _0x1985f2 === "rotate" ? _0x266061["style"]["transform"] = "translate(" + _0x1d63c4["x"] + "px, " + _0x1d63c4["y"] + "px)" : (_0x266061["setAttribute"]("cx", _0x1d63c4["x"]), _0x266061["setAttribute"]("cy", _0x1d63c4["y"]));
      });
      _0x3d5cc7["type"] === "activeSelection" && this["activeSelectionDomList"]["forEach"]((_0x3ff813) => {
        const { item: _0x436658, itemRect: _0x3771d2 } = _0x3ff813, { x: _0x3b2fda, y: _0x5a26b7, w: _0x2ecb1e, h: _0xbf5650, angle: _0x29c886 } = _0x436658["getContainerPosition"]();
        editorUtil["updateSvgElement"](_0x3771d2, { "width": _0x2ecb1e, "height": _0xbf5650 }, { "transform": "rotate(" + _0x29c886 + "deg) translate(" + _0x3b2fda + "px, " + _0x5a26b7 + "px)", "transformOrigin": _0x3b2fda + _0x2ecb1e / 2 + "px " + (_0x5a26b7 + _0xbf5650 / 2) + "px" });
      });
      const _0x53d312 = _0x11715e["querySelector"](".group-rect");
      if (_0x53d312) {
        if (_0x3d5cc7["group"]) {
          const { x: _0x4bf5b3, y: _0x171516, w: _0x28f9a2, h: _0x438338, angle: _0x23155a } = _0x2452a4["calcGroupContainerPositionBySubs"](_0x3d5cc7["group"]);
          editorUtil["updateSvgElement"](_0x53d312, { "width": _0x28f9a2, "height": _0x438338 }, { "transform": "rotate(" + _0x23155a + "deg) translate(" + _0x4bf5b3 + "px, " + _0x171516 + "px)", "transformOrigin": _0x4bf5b3 + _0x28f9a2 / 2 + "px " + (_0x171516 + _0x438338 / 2) + "px", "display": "block" });
        }
      }
    }
    ["disposeControls"]() {
      const { editor: _0xcba567 } = this;
      _0xcba567["controlLayer"]["innerHTML"] = "";
    }
  }
  const constructHistory$2 = (_0x2959e6) => {
    const { id: _0x1a37cf, x: _0x3dae1a, y: _0x1c6ce5, x1: _0x516b52, x2: _0x159c7c, y1: _0x4deb03, y2: _0x37dd58, w: _0x365528, h: _0x290729 } = _0x2959e6, _0x56ffc2 = _0x2959e6["group"] || _0x2959e6["editor"];
    return { "activeSelection": null, "data": [{ "data": { "id": _0x1a37cf, "x": _0x3dae1a, "y": _0x1c6ce5, "x1": _0x516b52, "x2": _0x159c7c, "y1": _0x4deb03, "y2": _0x37dd58, "w": _0x365528, "h": _0x290729 }, "index": _0x56ffc2["objects"]["findIndex"]((_0x1da5e6) => _0x1da5e6["id"] === _0x2959e6["id"]), "parentId": _0x2959e6["group"] ? _0x2959e6["group"]["id"] : null }] };
  };
  class LineControls {
    constructor(_0x46469c, _0x1574b9) {
      this["controls"] = { "p1": { "visible": !![] }, "p2": { "visible": !![] } }, this["pointDomList"] = [], this["editor"] = _0x46469c, this["target"] = _0x1574b9;
      const { controlLayer: _0xa42a2 } = _0x46469c, { locked: _0x1b4e30 } = _0x1574b9;
      _0xa42a2["innerHTML"] = "", _0xa42a2["setAttribute"]("data-id", _0x1574b9["id"]), _0x1b4e30 ? _0xa42a2["classList"]["add"]("locked") : _0xa42a2["classList"]["remove"]("locked"), this["initlialize"]();
    }
    ["initlialize"]() {
      this["createControls"](), this["updateControlsPosition"]();
    }
    ["createControlPoint"]() {
    }
    ["createControls"]() {
      const { editor: _0x3040a9, target: _0xa56d42 } = this, { controlLayer: _0x528f06 } = _0x3040a9, _0x254ffe = (_0x4b451b, _0x4fb720) => {
        let [_0x2e13fc, _0x9386de] = [0, 0], _0x244d38;
        _0x4b451b["addEventListener"]("mousedown", (_0x1e3a57) => {
          _0x1e3a57["stopPropagation"] && _0x1e3a57["stopPropagation"](), _0x1e3a57["preventDefault"] && _0x1e3a57["preventDefault"](), _0x2e13fc = _0x1e3a57["clientX"], _0x9386de = _0x1e3a57["clientY"], _0x244d38 = constructHistory$2(_0xa56d42), document["addEventListener"]("mousemove", _0x48c193), document["addEventListener"]("mouseup", _0x2d5cc5);
        });
        const _0x48c193 = (_0x1ea186) => {
          const _0x4c089f = _0x3040a9["getMousePositionInObject"](_0x1ea186, _0xa56d42);
          let { x: _0x362fa1, y: _0x551ed2 } = _0x4c089f;
          if (_0x1ea186["shiftKey"]) {
            const _0x9ab528 = _0x4fb720 === "p1" ? _0xa56d42["x2"] : _0xa56d42["x1"], _0x2f04a2 = _0x4fb720 === "p1" ? _0xa56d42["y2"] : _0xa56d42["y1"], _0x4ede8d = Math["abs"](_0x9ab528 - _0x362fa1), _0x8910c2 = Math["abs"](_0x2f04a2 - _0x551ed2);
            _0x4ede8d > _0x8910c2 ? _0x551ed2 = _0x2f04a2 : _0x362fa1 = _0x9ab528;
          }
          _0x4fb720 === "p1" ? _0xa56d42["set"]({ "x1": _0x362fa1, "y1": _0x551ed2 }) : _0xa56d42["set"]({ "x2": _0x362fa1, "y2": _0x551ed2 }), this["updateControlsPosition"]();
        }, _0x2d5cc5 = (_0x56d92c) => {
          if (_0x2e13fc !== _0x56d92c["clientX"] && _0x9386de !== _0x56d92c["clientY"]) {
            let { x: _0x3d0564, y: _0x4a7171, x1: _0x13b0aa, y1: _0x60762d, x2: _0x2b588d, y2: _0x374730 } = _0xa56d42;
            const _0x4370e3 = Math["abs"](_0x2b588d - _0x13b0aa), _0x31a349 = Math["abs"](_0x374730 - _0x60762d);
            let _0x57fdf9 = Math["min"](_0x13b0aa, _0x2b588d), _0xf6b43d = Math["min"](_0x60762d, _0x374730);
            _0x13b0aa -= _0x57fdf9, _0x2b588d -= _0x57fdf9, _0x3d0564 += _0x57fdf9, _0x60762d -= _0xf6b43d, _0x374730 -= _0xf6b43d, _0x4a7171 += _0xf6b43d, _0xa56d42["set"]({ "x": _0x3d0564, "y": _0x4a7171, "x1": _0x13b0aa, "y1": _0x60762d, "x2": _0x2b588d, "y2": _0x374730, "w": _0x4370e3, "h": _0x31a349 }), _0x3040a9["historyHandler"]["store"]({ "type": HistoryTypesEnum["attrs"], "from": _0x244d38, "to": constructHistory$2(_0xa56d42) });
          }
          document["removeEventListener"]("mousemove", _0x48c193), document["removeEventListener"]("mouseup", _0x2d5cc5);
        };
      }, _0x190b09 = editorUtil["createSvgElement"]("rect", { "x": 0, "y": 0, "width": 0, "height": 0, "class": "border-rect" });
      _0x528f06["appendChild"](_0x190b09), Object["keys"](this["controls"])["forEach"]((_0x21bfa0) => {
        const _0x209945 = editorUtil["createSvgElement"]("circle", { "stroke": "#1ab394", "strokeWidth": "1", "r": "5", "fill": "#1ab394" }, { "pointerEvents": "auto", "cursor": "move" });
        _0x528f06["appendChild"](_0x209945), _0x254ffe(_0x209945, _0x21bfa0), this["pointDomList"]["push"]({ "dom": _0x209945, "key": _0x21bfa0 });
      });
    }
    ["updateControlsPosition"]() {
      const { editor: _0x46d83d, target: _0x2ac741 } = this, { controlLayer: _0x5c1575 } = _0x46d83d, _0x3e0acd = editorUtil["getTotalMatrix"](_0x2ac741, !![], !![]), _0x22fc17 = _0x5c1575["querySelector"](".border-rect");
      let [_0xbc43b2, _0x3f1b9c, _0x48e945, _0x72f53a] = [0, 0, 0, 0];
      this["pointDomList"]["forEach"]((_0x1e9f95, _0x457a0d) => {
        const { dom: _0x451046, key: _0xdb98c3 } = _0x1e9f95, { x1: _0x273f46, y1: _0x351197, x2: _0x2eefef, y2: _0x502c9b } = _0x2ac741, _0x5bc00f = _0xdb98c3 == "p1" ? { "x": _0x273f46, "y": _0x351197 } : { "x": _0x2eefef, "y": _0x502c9b }, _0xdad10a = applyToPoint(_0x3e0acd, _0x5bc00f);
        _0x457a0d === 0 ? (_0xbc43b2 = _0x48e945 = _0xdad10a["x"], _0x3f1b9c = _0x72f53a = _0xdad10a["y"]) : (_0xbc43b2 = Math["min"](_0xbc43b2, _0xdad10a["x"]), _0x3f1b9c = Math["min"](_0x3f1b9c, _0xdad10a["y"]), _0x48e945 = Math["max"](_0x48e945, _0xdad10a["x"]), _0x72f53a = Math["max"](_0x72f53a, _0xdad10a["y"])), editorUtil["updateSvgElement"](_0x451046, { "cx": _0xdad10a["x"], "cy": _0xdad10a["y"] }, { "display": _0x2ac741["locked"] ? "none" : "block" });
      }), editorUtil["updateSvgElement"](_0x22fc17, { "x": _0xbc43b2, "y": _0x3f1b9c, "width": _0x48e945 - _0xbc43b2, "height": _0x72f53a - _0x3f1b9c }, { "stroke": _0x2ac741["locked"] ? "#ff0000" : _0x46d83d["controlConfig"]["line"]["stroke"] });
    }
  }
  const constructHistory$1 = (_0x430dc5) => {
    const { id: _0x4b5d3f, x: _0x10a9eb, y: _0x56e921, w: _0x486ae4, h: _0x271023, points: _0x58c9cc } = _0x430dc5, _0x2a4845 = _0x430dc5["group"] || _0x430dc5["editor"];
    return { "activeSelection": null, "data": [{ "data": cloneDeep({ "id": _0x4b5d3f, "x": _0x10a9eb, "y": _0x56e921, "w": _0x486ae4, "h": _0x271023, "points": _0x58c9cc }), "index": _0x2a4845["objects"]["findIndex"]((_0x528966) => _0x528966["id"] === _0x430dc5["id"]), "parentId": _0x430dc5["group"] ? _0x430dc5["group"]["id"] : null }] };
  };
  class PolylineControls {
    constructor(_0x3832d8, _0x51a56d) {
      this["toAddPoint"] = { "index": -1, "x": 0, "y": 0 }, this["activePoint"] = null, this["pointDomList"] = [], this["editor"] = _0x3832d8, this["target"] = _0x51a56d;
      const { controlLayer: _0xdce39e } = _0x3832d8;
      _0xdce39e["innerHTML"] = "", _0xdce39e["setAttribute"]("data-id", _0x51a56d["id"]), this["initlialize"]();
    }
    ["initlialize"]() {
      this["createControls"](), this["updateControlsPosition"]();
    }
    ["resetBounding"]() {
      const { target: _0x402b95 } = this, { points: _0x3c2206 } = _0x402b95, _0x482165 = _0x3c2206[0], { minX: _0x217312, minY: _0x57a06f, maxX: _0x2d43d1, maxY: _0x274616 } = _0x3c2206["reduce"]((_0x4e14f5, _0x588427) => {
        return _0x4e14f5["minX"] = Math["min"](_0x4e14f5["minX"], _0x588427["x"]), _0x4e14f5["minY"] = Math["min"](_0x4e14f5["minY"], _0x588427["y"]), _0x4e14f5["maxX"] = Math["max"](_0x4e14f5["maxX"], _0x588427["x"]), _0x4e14f5["maxY"] = Math["max"](_0x4e14f5["maxY"], _0x588427["y"]), _0x4e14f5;
      }, { "minX": _0x482165["x"], "minY": _0x482165["y"], "maxX": _0x482165["x"], "maxY": _0x482165["y"] }), [_0xcacc2f, _0x4e758f] = [_0x2d43d1 - _0x217312, _0x274616 - _0x57a06f];
      _0x3c2206["forEach"]((_0x499d4c) => {
        _0x499d4c["x"] -= _0x217312, _0x499d4c["y"] -= _0x57a06f;
      }), _0x402b95["set"]({ "x": _0x402b95["x"] + _0x217312, "y": _0x402b95["y"] + _0x57a06f, "w": _0xcacc2f, "h": _0x4e758f, "points": _0x3c2206 });
    }
    ["createControlPoint"](_0x2c9735) {
      const { editor: _0x598aca, target: _0x437798 } = this, { controlLayer: _0x3e09a9 } = _0x598aca;
      let _0x421665, [_0x44541f, _0x70b854] = [0, 0];
      const _0x1aee16 = editorUtil["createSvgElement"]("circle", { "stroke": "#2c83fb", "stroke-width": 1, "r": "5", "fill": "#ffffff", "class": "control-point" }, { "pointerEvents": "auto", "cursor": "move" });
      _0x1aee16["addEventListener"]("mousedown", (_0x14bec0) => {
        _0x14bec0["stopPropagation"] && _0x14bec0["stopPropagation"](), _0x14bec0["preventDefault"] && _0x14bec0["preventDefault"](), _0x44541f = _0x14bec0["clientX"], _0x70b854 = _0x14bec0["clientY"], _0x421665 = constructHistory$1(_0x437798), this["activePoint"] = _0x2c9735, this["updateControlsPosition"]();
        const _0x8d20c4 = (_0x40a0df) => {
          const _0x3ac24a = _0x598aca["getMousePositionInObject"](_0x40a0df, _0x437798), { x: _0x1e7f5a, y: _0x35a091 } = _0x3ac24a;
          _0x2c9735["x"] = _0x1e7f5a, _0x2c9735["y"] = _0x35a091, this["updateControlsPosition"]();
        }, _0x209a02 = (_0x2357a2) => {
          _0x44541f !== _0x2357a2["clientX"] && _0x70b854 !== _0x2357a2["clientY"] && (this["resetBounding"](), _0x598aca["historyHandler"]["store"]({ "type": HistoryTypesEnum["attrs"], "from": _0x421665, "to": constructHistory$1(_0x437798) }), this["updateControlsPosition"]()), document["removeEventListener"]("mousemove", _0x8d20c4), document["removeEventListener"]("mouseup", _0x209a02);
        };
        document["addEventListener"]("mousemove", _0x8d20c4), document["addEventListener"]("mouseup", _0x209a02);
      }), _0x3e09a9["appendChild"](_0x1aee16), this["pointDomList"]["push"]({ "dom": _0x1aee16, "point": _0x2c9735 });
    }
    ["deleteActiveControlPoint"]() {
      if (this["activePoint"]) {
        const _0x204c1d = constructHistory$1(this["target"]), _0x5a5c7a = this["target"]["points"]["findIndex"]((_0x1f7fab) => _0x1f7fab === this["activePoint"]), _0x3edbd8 = this["pointDomList"]["findIndex"]((_0x16895e) => _0x16895e["point"] === this["activePoint"]);
        return this["pointDomList"][_0x3edbd8]["dom"]["remove"](), this["target"]["points"]["splice"](_0x5a5c7a, 1), this["pointDomList"]["splice"](_0x3edbd8, 1), this["activePoint"] = null, this["resetBounding"](), this["editor"]["historyHandler"]["store"]({ "type": HistoryTypesEnum["attrs"], "from": _0x204c1d, "to": constructHistory$1(this["target"]) }), this["updateControlsPosition"](), !![];
      }
      return ![];
    }
    ["createControls"]() {
      const { editor: _0x387fc4, target: _0xaa0b2 } = this, { controlLayer: _0x1025ea } = _0x387fc4, _0x21391a = editorUtil["createSvgElement"]("rect", { "x": 0, "y": 0, "width": 0, "height": 0, "class": "border-rect" });
      _0x1025ea["appendChild"](_0x21391a);
      const _0x127cbe = _0xaa0b2["points"] || [];
      _0x127cbe["forEach"]((_0x2693b2) => {
        this["createControlPoint"](_0x2693b2);
      });
      const _0x4f1e02 = editorUtil["createSvgElement"]("circle", { "stroke": "#2c83fb", "strokeWidth": "1", "r": "5", "fill": "#ffffff", "class": "to-add-point" }, { "pointerEvents": "auto", "cursor": "copy", "display": "none" });
      _0x4f1e02["addEventListener"]("mousedown", () => {
        let _0x375bd1 = constructHistory$1(_0xaa0b2);
        const { x: _0x5d1331, y: _0x38ec90, index: _0x5ced3f } = this["toAddPoint"];
        _0xaa0b2["points"]["splice"](_0x5ced3f, 0, { "x": _0x5d1331, "y": _0x38ec90 }), _0xaa0b2["set"]({ "points": _0x127cbe }), _0x387fc4["historyHandler"]["store"]({ "type": HistoryTypesEnum["attrs"], "from": _0x375bd1, "to": constructHistory$1(_0xaa0b2) }), this["createControlPoint"](_0xaa0b2["points"][_0x5ced3f]), this["updateControlsPosition"]();
      }), _0x1025ea["appendChild"](_0x4f1e02), this["mouseMoveFun"] = this["onMouseMove"]["bind"](this), document["addEventListener"]("mousemove", this["mouseMoveFun"]);
    }
    ["updateControlsPosition"]() {
      const { editor: _0x238f5e, target: _0xf64948 } = this, { controlLayer: _0xa00745 } = _0x238f5e, _0x46daaa = _0xa00745["querySelector"](".border-rect"), _0x2c2c5e = _0xf64948["getContainerPosition"]();
      editorUtil["updateSvgElement"](_0x46daaa, { "x": _0x2c2c5e["x"], "y": _0x2c2c5e["y"], "width": _0x2c2c5e["w"], "height": _0x2c2c5e["h"] });
      if (_0xf64948["locked"]) {
        _0xa00745["classList"]["add"]("locked");
        return;
      } else
        _0xa00745["classList"]["remove"]("locked");
      const _0x2d58f5 = editorUtil["getTotalMatrix"](_0xf64948, !![], !![]);
      this["pointDomList"]["forEach"]((_0x202eb5) => {
        const { point: _0x266ee2, dom: _0x1e8ee1 } = _0x202eb5, { x: _0x4fe64f, y: _0x41ade7 } = _0x266ee2, _0x3b384f = applyToPoint(_0x2d58f5, { "x": _0x4fe64f, "y": _0x41ade7 });
        _0x1e8ee1["setAttribute"]("cx", _0x3b384f["x"]), _0x1e8ee1["setAttribute"]("cy", _0x3b384f["y"]), _0x1e8ee1["setAttribute"]("fill", this["activePoint"] === _0x266ee2 ? "#00ff00" : "#ffffff");
      });
    }
    ["onMouseMove"](_0x3f0c0d) {
      const { editor: _0x2a9365, target: _0x475125 } = this, _0x283b5c = _0x475125["points"] || [], _0x3ffedf = _0x2a9365["getMousePositionInObject"](_0x3f0c0d, _0x475125), _0xc1a820 = _0x475125["strokeWidth"] || 1, _0x25c05f = _0xc1a820 / 2 + 2, _0x3723ab = editorUtil["isPointArroundPolyline"](_0x283b5c, _0x3ffedf, _0x25c05f), { controlLayer: _0x32dcbc } = _0x2a9365, _0x444c21 = _0x32dcbc["querySelector"](".to-add-point");
      if (_0x3f0c0d["target"]["classList"]["contains"]("control-point")) {
        _0x444c21["style"]["display"] = "none";
        return;
      }
      if (_0x3723ab["isArround"]) {
        const { x: _0x3f0268, y: _0x57f5c5, index: _0x5dec6c } = _0x3723ab, _0xdbc129 = editorUtil["getTotalMatrix"](_0x475125, !![], !![]), _0x3511db = applyToPoint(_0xdbc129, { "x": _0x3f0268, "y": _0x57f5c5 });
        this["toAddPoint"] = { "x": _0x3f0268, "y": _0x57f5c5, "index": _0x5dec6c }, _0x444c21["setAttribute"]("cx", _0x3511db["x"]), _0x444c21["setAttribute"]("cy", _0x3511db["y"]), _0x444c21["style"]["display"] = "block";
      } else
        this["toAddPoint"] = { "x": 0, "y": 0, "index": -1 }, _0x444c21["style"]["display"] = "none";
    }
    ["dispose"]() {
      const { editor: _0x3a9090 } = this;
      document["removeEventListener"]("mousemove", this["mouseMoveFun"]), this["mouseMoveFun"] = null, _0x3a9090["controlLayer"]["innerHTML"] = "";
    }
  }
  const constructHistory = (_0x55b99d) => {
    const { id: _0x3b5525, x: _0xf6d40c, y: _0x4e98f9, w: _0x57d1fe, h: _0x68de41, path: _0x146c6e } = _0x55b99d, _0x5d9510 = _0x55b99d["group"] || _0x55b99d["editor"];
    return { "activeSelection": null, "data": [{ "data": cloneDeep({ "id": _0x3b5525, "x": _0xf6d40c, "y": _0x4e98f9, "w": _0x57d1fe, "h": _0x68de41, "path": _0x146c6e }), "index": _0x5d9510["objects"]["findIndex"]((_0x4b3bb7) => _0x4b3bb7["id"] === _0x55b99d["id"]), "parentId": _0x55b99d["group"] ? _0x55b99d["group"]["id"] : null }] };
  };
  class BezierCurveControls {
    constructor(_0x429949, _0xef979f) {
      this["toAddPoint"] = null, this["pathDomList"] = [], this["activePath"] = null, this["editor"] = _0x429949, this["target"] = _0xef979f;
      const { controlLayer: _0x4a1647 } = _0x429949;
      _0x4a1647["innerHTML"] = "", _0x4a1647["setAttribute"]("data-id", _0xef979f["id"]), this["initlialize"]();
    }
    ["initlialize"]() {
      this["createControls"](), this["updateControlsPosition"]();
    }
    ["resetBounding"]() {
      const { target: _0x2a68fc } = this, { width: _0x2712ee, height: _0x1695bf, x: _0x98c8cf, y: _0x17ff5f } = editorUtil["getPathBoundingBox"](_0x2a68fc["path"]);
      _0x2a68fc["path"]["forEach"]((_0x5544f4) => {
        _0x5544f4["forEach"]((_0xf3d676, _0x33d9d3) => {
          _0x33d9d3 > 0 && (_0x5544f4[_0x33d9d3] = _0x33d9d3 % 2 === 0 ? _0xf3d676 - _0x17ff5f : _0xf3d676 - _0x98c8cf);
        });
      }), _0x2a68fc["set"]({ "x": _0x2a68fc["x"] + _0x98c8cf, "y": _0x2a68fc["y"] + _0x17ff5f, "w": _0x2712ee, "h": _0x1695bf });
    }
    ["createPathPoint"](_0x22ea29) {
      const { editor: _0x395b52, target: _0x7e9f1a } = this, { controlLayer: _0x530158, controlConfig: _0x442f6c } = _0x395b52;
      let _0xf90780, [_0x1bcc54, _0x462944] = [0, 0];
      const _0x35a8d5 = editorUtil["createSvgElement"]("circle", __spreadProps(__spreadValues({}, _0x442f6c["circle"]), { "class": "path-point" }), { "pointerEvents": "auto", "cursor": "move" });
      _0x35a8d5["addEventListener"]("mousedown", (_0x11ec48) => {
        _0x11ec48["stopPropagation"] && _0x11ec48["stopPropagation"](), _0x11ec48["preventDefault"] && _0x11ec48["preventDefault"](), [_0x1bcc54, _0x462944] = [_0x11ec48["clientX"], _0x11ec48["clientY"]], _0xf90780 = constructHistory(_0x7e9f1a), this["activePath"] = _0x22ea29, this["updateControlsPosition"]();
        const _0x4a447c = (_0xc341b) => {
          const _0x15cad6 = _0x395b52["getMousePositionInObject"](_0xc341b, _0x7e9f1a), { x: _0x4cb2e6, y: _0x559747 } = _0x15cad6, _0x402f9a = _0x7e9f1a["path"]["findIndex"]((_0xff57b2) => _0xff57b2 === _0x22ea29);
          if (_0x402f9a === 0)
            _0x22ea29[1] = _0x4cb2e6, _0x22ea29[2] = _0x559747;
          else {
            const _0x22ce04 = _0x4cb2e6 - _0x22ea29[5], _0x4bdc65 = _0x559747 - _0x22ea29[6];
            _0x22ea29[3] += _0x22ce04, _0x22ea29[4] += _0x4bdc65, _0x22ea29[5] = _0x4cb2e6, _0x22ea29[6] = _0x559747;
            const _0x197d33 = _0x7e9f1a["path"][_0x402f9a + 1];
            _0x402f9a < _0x7e9f1a["path"]["length"] - 1 && _0x197d33[0] !== "Z" && (_0x197d33[1] = 2 * _0x22ea29[5] - _0x22ea29[3], _0x197d33[2] = 2 * _0x22ea29[6] - _0x22ea29[4]);
          }
          this["updateControlsPosition"]();
        }, _0x1b2943 = (_0x1c1875) => {
          _0x1bcc54 !== _0x1c1875["clientX"] && _0x462944 !== _0x1c1875["clientY"] && (this["resetBounding"](), this["saveHistory"](_0xf90780), this["updateControlsPosition"]()), document["removeEventListener"]("mousemove", _0x4a447c), document["removeEventListener"]("mouseup", _0x1b2943);
        };
        document["addEventListener"]("mousemove", _0x4a447c), document["addEventListener"]("mouseup", _0x1b2943);
      }), _0x530158["appendChild"](_0x35a8d5), this["pathDomList"]["push"]({ "dom": _0x35a8d5, "path": _0x22ea29 });
    }
    ["saveHistory"](_0x14d945) {
      const { editor: _0x2a308a, target: _0x5c5051 } = this;
      _0x2a308a["historyHandler"]["store"]({ "type": HistoryTypesEnum["attrs"], "from": _0x14d945, "to": constructHistory(_0x5c5051) });
    }
    ["deleteActiveControlPoint"]() {
      if (this["activePath"]) {
        const _0xd36962 = constructHistory(this["target"]), _0x2845f8 = this["target"]["path"]["findIndex"]((_0x17e833) => _0x17e833 === this["activePath"]), _0x3de457 = this["target"]["path"][_0x2845f8 - 1], _0x184383 = this["target"]["path"][_0x2845f8 + 1];
        return _0x2845f8 === 0 && (this["target"]["path"][_0x2845f8 + 1] = ["M", _0x184383[5], _0x184383[6]]), _0x184383 && _0x3de457 && (_0x3de457[5] ? (_0x184383[1] = 2 * _0x3de457[5] - _0x3de457[3], _0x184383[2] = 2 * _0x3de457[6] - _0x3de457[4]) : (_0x184383[1] = _0x3de457[1], _0x184383[2] = _0x3de457[2])), this["target"]["path"]["splice"](_0x2845f8, 1), this["activePath"] = null, this["resetBounding"](), this["saveHistory"](_0xd36962), this["createControls"](), this["updateControlsPosition"](), !![];
      }
      return ![];
    }
    ["createControlPoint"]() {
      const { editor: _0x50f8a2, target: _0xb0cc24 } = this, { controlLayer: _0x48d444 } = _0x50f8a2, _0x580e6b = _0x50f8a2["controlConfig"], _0x398317 = ["control-p1", "control-p2"];
      _0x398317["forEach"]((_0x4aed85) => {
        const _0x863921 = editorUtil["createSvgElement"]("circle", __spreadProps(__spreadValues({}, _0x580e6b["circle"]), { "class": "control-point " + _0x4aed85 }), { "pointerEvents": "auto", "cursor": "move" });
        let _0x4a628e = { "x": 0, "y": 0 }, _0x4d150a;
        _0x863921["addEventListener"]("mousedown", (_0x3d9a56) => {
          _0x3d9a56["preventDefault"] && _0x3d9a56["preventDefault"](), _0x3d9a56["stopPropagation"] && _0x3d9a56["stopPropagation"](), _0x4a628e = { "x": _0x3d9a56["clientX"], "y": _0x3d9a56["clientY"] }, _0x4d150a = constructHistory(_0xb0cc24);
          const _0x5d86a2 = (_0x25f235) => {
            const _0x4791c6 = _0x50f8a2["getMousePositionInObject"](_0x25f235, _0xb0cc24), _0xf2629a = _0xb0cc24["path"]["findIndex"]((_0x2eba70) => _0x2eba70 === this["activePath"]), _0x19b0d9 = _0xb0cc24["path"][_0xf2629a + 1];
            _0x4aed85 === "control-p1" ? (this["activePath"][3] = _0x4791c6["x"], this["activePath"][4] = _0x4791c6["y"], _0x19b0d9 && (_0x19b0d9[1] = 2 * this["activePath"][5] - _0x4791c6["x"], _0x19b0d9[2] = 2 * this["activePath"][6] - _0x4791c6["y"])) : (this["activePath"][3] = 2 * this["activePath"][5] - _0x4791c6["x"], this["activePath"][4] = 2 * this["activePath"][6] - _0x4791c6["y"], _0x19b0d9 && (_0x19b0d9[1] = _0x4791c6["x"], _0x19b0d9[2] = _0x4791c6["y"])), this["updateControlsPosition"]();
          }, _0x47ffeb = (_0x24eb48) => {
            document["removeEventListener"]("mousemove", _0x5d86a2), document["removeEventListener"]("mouseup", _0x47ffeb), _0x24eb48["clientX"] !== _0x4a628e["x"] && _0x24eb48["clientY"] !== _0x4a628e["y"] && (this["resetBounding"](), this["saveHistory"](_0x4d150a), this["updateControlsPosition"]());
          };
          document["addEventListener"]("mousemove", _0x5d86a2), document["addEventListener"]("mouseup", _0x47ffeb);
        }), _0x48d444["appendChild"](_0x863921);
      });
    }
    ["createControls"]() {
      const { editor: _0x4c4f2d, target: _0x8ca956 } = this, { controlLayer: _0x3af573 } = _0x4c4f2d, _0x5e473f = _0x4c4f2d["controlConfig"] || {};
      this["dispose"]();
      const _0x504339 = editorUtil["createSvgElement"]("rect", { "x": 0, "y": 0, "width": 100, "height": 100, "class": "border-rect" });
      _0x3af573["appendChild"](_0x504339);
      const _0x3b90d6 = _0x8ca956["path"] || [];
      _0x3b90d6["forEach"]((_0x585ce2) => {
        _0x585ce2[0] !== "Z" && this["createPathPoint"](_0x585ce2);
      }), this["createControlPoint"]();
      const _0x25a9a9 = editorUtil["createSvgElement"]("line", __spreadProps(__spreadValues({}, _0x5e473f["line"]), { "class": "control-line" }));
      _0x3af573["prepend"](_0x25a9a9);
      const _0x18d090 = editorUtil["createSvgElement"]("circle", __spreadProps(__spreadValues({}, _0x5e473f["circle"]), { "class": "to-add-point" }), { "display": "none" });
      _0x3af573["appendChild"](_0x18d090), this["mouseDownFun"] = this["globalMouseDown"]["bind"](this), this["mouseMoveFun"] = this["globalMouseMove"]["bind"](this), _0x4c4f2d["editorDom"]["addEventListener"]("mousedown", this["mouseDownFun"]), _0x4c4f2d["editorDom"]["addEventListener"]("mousemove", this["mouseMoveFun"]);
    }
    ["updateControlsPosition"]() {
      const { editor: _0x616b54, target: _0x4168bc, activePath: _0x130b6c } = this, { controlLayer: _0x57411e, controlConfig: _0x464765 } = _0x616b54, _0x595afc = _0x57411e["querySelector"](".border-rect"), _0x5727fc = _0x4168bc["getContainerPosition"]();
      editorUtil["updateSvgElement"](_0x595afc, { "x": _0x5727fc["x"], "y": _0x5727fc["y"], "width": _0x5727fc["w"], "height": _0x5727fc["h"] });
      if (_0x4168bc["locked"]) {
        _0x57411e["classList"]["add"]("locked");
        return;
      } else
        _0x57411e["classList"]["remove"]("locked");
      const _0x30cf6b = editorUtil["getTotalMatrix"](_0x4168bc, !![], !![]);
      this["pathDomList"]["forEach"]((_0x2b9b58) => {
        const { path: _0x49cdbb, dom: _0x14d2be } = _0x2b9b58, _0x34477d = _0x49cdbb[_0x49cdbb["length"] - 2], _0x1278f0 = _0x49cdbb[_0x49cdbb["length"] - 1], _0x241192 = applyToPoint(_0x30cf6b, { "x": _0x34477d, "y": _0x1278f0 }), _0x57b73 = _0x49cdbb === _0x130b6c ? _0x464765["activeCircle"] : _0x464765["circle"];
        _0x14d2be["setAttribute"]("fill", _0x57b73["fill"]), editorUtil["updateSvgElement"](_0x14d2be, { "cx": _0x241192["x"], "cy": _0x241192["y"] });
      });
      const _0x2c03b1 = _0x57411e["querySelector"](".control-p1"), _0x1d409f = _0x57411e["querySelector"](".control-p2"), _0x50c6ee = _0x57411e["querySelector"](".control-line");
      if (_0x130b6c) {
        const _0x5d9221 = _0x130b6c, _0x456c40 = _0x4168bc["path"]["findIndex"]((_0x2e88cf) => _0x2e88cf === _0x130b6c);
        if (_0x456c40 === 0 || _0x456c40 === _0x4168bc["path"]["length"] - 1)
          editorUtil["hideDoms"]([_0x2c03b1, _0x1d409f, _0x50c6ee]);
        else {
          const _0x279f66 = { "x": _0x5d9221[3], "y": _0x5d9221[4] }, _0x23cd68 = { "x": 2 * _0x5d9221[5] - _0x5d9221[3], "y": 2 * _0x5d9221[6] - _0x5d9221[4] }, _0x5d08a5 = applyToPoint(_0x30cf6b, _0x279f66), _0x2aa030 = applyToPoint(_0x30cf6b, _0x23cd68);
          editorUtil["setAttributes"](_0x2c03b1, { "cx": _0x5d08a5["x"], "cy": _0x5d08a5["y"] }), editorUtil["setAttributes"](_0x1d409f, { "cx": _0x2aa030["x"], "cy": _0x2aa030["y"] }), editorUtil["setAttributes"](_0x50c6ee, { "x1": _0x5d08a5["x"], "y1": _0x5d08a5["y"], "x2": _0x2aa030["x"], "y2": _0x2aa030["y"] }), editorUtil["showDoms"]([_0x2c03b1, _0x1d409f, _0x50c6ee]);
        }
      } else
        editorUtil["hideDoms"]([_0x2c03b1, _0x1d409f, _0x50c6ee]);
    }
    ["globalMouseMove"](_0x15d83c) {
      const { editor: _0x1a11f6, target: _0x4bc1e5 } = this, { controlLayer: _0x5a7ed1 } = _0x1a11f6, _0x5974e0 = _0x5a7ed1["querySelector"](".to-add-point"), _0x236f33 = _0x5a7ed1["querySelector"](".border-rect");
      if (_0x15d83c["target"]["classList"]["contains"]("path-point")) {
        _0x5974e0["style"]["display"] = "none";
        return;
      }
      const _0x1239ed = _0x1a11f6["getMousePositionInObject"](_0x15d83c, _0x4bc1e5), _0xa6b500 = editorUtil["isPointArroundPath"](_0x1239ed, _0x4bc1e5["path"], 2.5);
      this["toAddPoint"] = _0xa6b500;
      if (_0xa6b500) {
        _0x236f33["style"]["pointerEvents"] = "none", _0x5974e0["style"]["display"] = "block", document["body"]["style"]["cursor"] = "copy";
        const _0x4f1af0 = editorUtil["getTotalMatrix"](_0x4bc1e5, !![], !![]), _0xdf8a6a = applyToPoint(_0x4f1af0, { "x": _0xa6b500["x"], "y": _0xa6b500["y"] });
        editorUtil["setAttributes"](_0x5974e0, { "cx": _0xdf8a6a["x"], "cy": _0xdf8a6a["y"] });
      } else
        _0x236f33["style"]["pointerEvents"] = "auto", _0x5974e0["style"]["display"] = "none", document["body"]["style"]["cursor"] = "";
    }
    ["globalMouseDown"]() {
      const { target: _0x86593, toAddPoint: _0x59fa04 } = this;
      if (_0x59fa04) {
        this["toAddPoint"] = null;
        const _0x43676d = constructHistory(_0x86593), { x: _0x2ed90d, y: _0x34d831, index: _0xb2b53d, t: _0x5a0a49 } = _0x59fa04, _0x343805 = _0x86593["path"][_0xb2b53d - 1], _0x4cfd41 = _0x86593["path"][_0xb2b53d], _0x37b36d = { "x": _0x343805[_0x343805["length"] - 2], "y": _0x343805[_0x343805["length"] - 1] }, _0x46ccde = { "x": _0x4cfd41[1], "y": _0x4cfd41[2] }, _0x2ac8e1 = { "x": _0x4cfd41[3], "y": _0x4cfd41[4] }, _0x3cb468 = { "x": _0x4cfd41[5], "y": _0x4cfd41[6] }, [_0x67eae7, _0x55e5d5] = editorUtil["splitBezierCurve"](_0x37b36d, _0x46ccde, _0x2ac8e1, _0x3cb468, _0x5a0a49), _0x3bd2b7 = ["C", _0x67eae7[1]["x"], _0x67eae7[1]["y"], _0x67eae7[2]["x"], _0x67eae7[2]["y"], _0x2ed90d, _0x34d831];
        _0x4cfd41[1] = _0x55e5d5[1]["x"], _0x4cfd41[2] = _0x55e5d5[1]["y"], _0x4cfd41[3] = _0x55e5d5[2]["x"], _0x4cfd41[4] = _0x55e5d5[2]["y"], _0x86593["path"]["splice"](_0xb2b53d, 0, _0x3bd2b7), this["saveHistory"](_0x43676d), this["createPathPoint"](_0x86593["path"][_0xb2b53d]), this["updateControlsPosition"]();
      }
    }
    ["dispose"]() {
      const { editor: _0x2d9132 } = this;
      _0x2d9132["editorDom"]["removeEventListener"]("mousedown", this["mouseDownFun"]), _0x2d9132["editorDom"]["removeEventListener"]("mousemove", this["mouseMoveFun"]), this["mouseMoveFun"] = null, this["mouseMoveFun"] = null, _0x2d9132["controlLayer"]["innerHTML"] = "";
    }
  }
  class ControlsFactory {
    static ["getInstance"](_0x2429d3, _0x2581b7) {
      switch (_0x2581b7["type"]) {
        case "line":
          return new LineControls(_0x2429d3, _0x2581b7);
        case "polyline":
          return new PolylineControls(_0x2429d3, _0x2581b7);
        case "bezierCurve":
          return new BezierCurveControls(_0x2429d3, _0x2581b7);
        default:
          return new RectControls(_0x2429d3, _0x2581b7);
      }
    }
  }
  const ignoreKeys = ["emitter", "controls", "editor", "group"];
  class BaseObject {
    constructor(_0x393ac7, _0x4629d7) {
      this["id"] = editorUtil["nanoid"](8), this["name"] = "", this["type"] = "object", this["component"] = { "name": "", "title": "" }, this["stateIndex"] = 0, this["states"] = [], this["x"] = 0, this["y"] = 0, this["w"] = 0, this["h"] = 0, this["angle"] = 0, this["locked"] = ![], this["visible"] = !![], this["controls"] = null, this["emitter"] = _0x39ca4c(), this["editor"] = null, _0x4629d7 = _0x4629d7 || {}, this["editor"] = _0x393ac7, Object["keys"](_0x4629d7)["forEach"]((_0x336c62) => {
        !ignoreKeys["includes"](_0x336c62) && (this[_0x336c62] = _0x4629d7[_0x336c62]);
      });
    }
    ["set"](_0x2d5318, _0x111e98) {
      typeof _0x2d5318 === "object" ? Object["keys"](_0x2d5318)["forEach"]((_0x1d6b7b) => {
        this[_0x1d6b7b] = _0x2d5318[_0x1d6b7b];
      }) : this[_0x2d5318] = _0x111e98;
    }
    ["on"](_0x109644, _0x46a3c7) {
      typeof _0x109644 === "object" ? Object["keys"](_0x109644)["forEach"]((_0x4bfec2) => {
        this["emitter"]["on"](_0x4bfec2, _0x109644[_0x4bfec2]);
      }) : this["emitter"]["on"](_0x109644, _0x46a3c7);
    }
    ["off"](_0x209869, _0x24f5bd) {
      typeof _0x209869 === "object" ? Object["keys"](_0x209869)["forEach"]((_0xfd625e) => {
        this["emitter"]["off"](_0xfd625e, _0x209869[_0xfd625e]);
      }) : this["emitter"]["off"](_0x209869, _0x24f5bd);
    }
    ["emit"](_0x50c0f6, _0x2aba99) {
      this["emitter"]["emit"](_0x50c0f6, _0x2aba99);
    }
    ["getState"]() {
      return this["states"][this["stateIndex"]];
    }
    ["createControls"]() {
      this["controls"] = ControlsFactory["getInstance"](this["editor"], this);
    }
    ["disposeControls"]() {
      const { editor: _0x2ecb72, controls: _0x12d421 } = this;
      _0x12d421 && _0x12d421["dispose"] && _0x12d421["dispose"](), _0x2ecb72["controlLayer"]["innerHTML"] = "", this["controls"] = null;
    }
    ["updateControlsPosition"]() {
      this["controls"] && this["controls"]["updateControlsPosition"]();
    }
    ["toJSON"]() {
      const _0x57d9e8 = (_0x2f202c) => {
        const _0x3f9475 = {};
        return Object["keys"](_0x2f202c)["forEach"]((_0x8c1b55) => {
          if (!ignoreKeys["includes"](_0x8c1b55) && typeof _0x2f202c[_0x8c1b55] !== "function" && !_0x8c1b55["startsWith"]("__")) {
            if (_0x8c1b55 === "objects") {
              const _0x5a4fde = [];
              for (let _0x5e29c3 = 0; _0x5e29c3 < _0x2f202c["objects"]["length"]; _0x5e29c3++) {
                _0x5a4fde["push"](_0x57d9e8(_0x2f202c["objects"][_0x5e29c3]));
              }
              Reflect["set"](_0x3f9475, "objects", _0x5a4fde);
            } else
              Reflect["set"](_0x3f9475, _0x8c1b55, cloneDeep(_0x2f202c[_0x8c1b55]));
          }
        }), _0x3f9475;
      }, _0x390937 = _0x57d9e8(this);
      return _0x390937;
    }
    ["getPosition"]() {
      const { id: _0x490883, x: _0x291297, y: _0x13abed, w: _0x21c2f2, h: _0x5b2c66, angle: _0xe3e4f5 } = this;
      return { "id": _0x490883, "x": _0x291297, "y": _0x13abed, "w": _0x21c2f2, "h": _0x5b2c66, "angle": _0xe3e4f5 };
    }
    ["clone"]() {
      const _0x4b25da = this["toJSON"]();
      return this["editor"]["plainObjectToClass"](_0x4b25da);
    }
    ["getGlobalPosition"]() {
      let _0xfa5c65 = editorUtil["getObjectCenter"](this), _0x56c03e = this["angle"];
      const _0x563f4e = (_0x448986) => {
        if (_0x448986["group"]) {
          const { group: _0x226d1f } = _0x448986, _0x5975f7 = editorUtil["getObjectCenter"](_0x226d1f);
          _0xfa5c65["x"] += _0x226d1f["x"], _0xfa5c65["y"] += _0x226d1f["y"], _0xfa5c65 = editorUtil["rotatePoint"](_0xfa5c65, _0x5975f7, _0x226d1f["angle"]), _0x56c03e += _0x226d1f["angle"], _0x563f4e(_0x226d1f);
        }
      };
      _0x563f4e(this);
      const { w: _0xeb2c3b, h: _0x1aff09 } = this, _0x5bb0f5 = _0xfa5c65["x"] - _0xeb2c3b / 2, _0x99076d = _0xfa5c65["y"] - _0x1aff09 / 2, _0x30c9b2 = { "x": _0x5bb0f5, "y": _0x99076d, "w": _0xeb2c3b, "h": _0x1aff09, "angle": _0x56c03e };
      return _0x30c9b2;
    }
    ["getContainerPosition"]() {
      const { x: _0x1144cb, y: _0x3abd1f, w: _0x4e3537, h: _0x243f70, angle: _0x97a4e } = this["getGlobalPosition"](), { tx: _0x5dba41, ty: _0x30af31, sx: _0x593c2a, sy: _0x33354b } = editorUtil["decomposeMatrix"](this["editor"]["viewportTransform"]);
      return { "x": _0x1144cb * _0x593c2a + _0x5dba41, "y": _0x3abd1f * _0x33354b + _0x30af31, "w": _0x4e3537 * _0x593c2a, "h": _0x243f70 * _0x33354b, "angle": _0x97a4e };
    }
    ["getCoords"](_0x47bbbc = ![]) {
      let _0x1711cd = _0x47bbbc ? this["getGlobalPosition"]() : this["getPosition"]();
      const { x: _0x54bda5, y: _0x2e8e61, w: _0x1d8630, h: _0x21051d, angle = 0 } = _0x1711cd, _0x4d81d0 = { "x": _0x54bda5 + _0x1d8630 / 2, "y": _0x2e8e61 + _0x21051d / 2 };
      let [_0x3ca31d, _0x517deb, _0x299aca, _0x509116] = [{ "x": _0x54bda5, "y": _0x2e8e61 }, { "x": _0x54bda5 + _0x1d8630, "y": _0x2e8e61 }, { "x": _0x54bda5, "y": _0x2e8e61 + _0x21051d }, { "x": _0x54bda5 + _0x1d8630, "y": _0x2e8e61 + _0x21051d }];
      [_0x3ca31d, _0x517deb, _0x299aca, _0x509116] = [editorUtil["rotatePoint"](_0x3ca31d, _0x4d81d0, angle), editorUtil["rotatePoint"](_0x517deb, _0x4d81d0, angle), editorUtil["rotatePoint"](_0x299aca, _0x4d81d0, angle), editorUtil["rotatePoint"](_0x509116, _0x4d81d0, angle)];
      const [_0x58afa6, _0x2d04ab, _0x282bc3, _0x536525] = [{ "x": (_0x3ca31d["x"] + _0x299aca["x"]) / 2, "y": (_0x3ca31d["y"] + _0x299aca["y"]) / 2 }, { "x": (_0x517deb["x"] + _0x509116["x"]) / 2, "y": (_0x517deb["y"] + _0x509116["y"]) / 2 }, { "x": (_0x3ca31d["x"] + _0x517deb["x"]) / 2, "y": (_0x3ca31d["y"] + _0x517deb["y"]) / 2 }, { "x": (_0x299aca["x"] + _0x509116["x"]) / 2, "y": (_0x299aca["y"] + _0x509116["y"]) / 2 }];
      return { "tl": _0x3ca31d, "tr": _0x517deb, "bl": _0x299aca, "br": _0x509116, "l": _0x58afa6, "r": _0x2d04ab, "t": _0x282bc3, "b": _0x536525 };
    }
  }
  class Group extends BaseObject {
    constructor(_0x22e57b, _0x207cd5) {
      const _0x41fed3 = cloneDeep(_0x207cd5);
      super(_0x22e57b, _0x41fed3), this["type"] = "group", this["subEventTrigger"] = ![], this["objects"] = [];
      const _0x17778f = (_0xd27639, _0x309082) => {
        _0xd27639 = _0xd27639 || [];
        for (let _0x5500c9 = 0; _0x5500c9 < _0xd27639["length"]; _0x5500c9++) {
          _0xd27639[_0x5500c9] = _0x1deaa8["getInstance"](_0x22e57b, _0xd27639[_0x5500c9]), _0xd27639[_0x5500c9]["group"] = _0x309082, _0x17778f(_0xd27639[_0x5500c9]["objects"], _0xd27639[_0x5500c9]);
        }
      };
      _0x17778f(_0x41fed3["objects"], this), this["objects"] = _0x41fed3["objects"] || [];
    }
    ["handleSizeChange"](_0x5a64df) {
      editorUtil["resetGroupSubsSize"](this, _0x5a64df);
    }
  }
  class ActiveSelection extends BaseObject {
    constructor(_0x490bed, _0x149271) {
      super(_0x490bed, _0x149271), this["type"] = "activeSelection", this["objects"] = [], this["objects"] = _0x149271["objects"] || [];
    }
  }
  class Rect extends BaseObject {
    constructor(_0x3ade20, _0x19ae43) {
      super(_0x3ade20, _0x19ae43), this["type"] = "rect";
    }
  }
  class Line extends BaseObject {
    constructor(_0x46d596, _0x55cb36) {
      super(_0x46d596, _0x55cb36), this["type"] = "line", this["x1"] = 0, this["y1"] = 0, this["x2"] = 0, this["y2"] = 0, this["stroke"] = "#000000", this["fill"] = "#ffffff00", this["strokeWidth"] = 1, Object["assign"](this, _0x55cb36);
    }
  }
  class Polyline extends BaseObject {
    constructor(_0x310d41, _0x1fba86) {
      super(_0x310d41, _0x1fba86), this["type"] = "polyline", this["points"] = [{ "x": 0, "y": 0 }], this["stroke"] = "#000000", this["fill"] = "#ffffff00", this["strokeWidth"] = 1, Object["assign"](this, _0x1fba86);
    }
    ["handleSizeChange"](_0x221c82) {
      const _0x3d19cf = this["w"] / _0x221c82["w"], _0x4a6a2a = this["h"] / _0x221c82["h"];
      this["points"]["forEach"]((_0xd9b102, _0x9be2d9) => {
        _0xd9b102["x"] = this["points"][_0x9be2d9]["x"] * _0x3d19cf, _0xd9b102["y"] = this["points"][_0x9be2d9]["y"] * _0x4a6a2a;
      });
    }
  }
  class BezierCurve extends BaseObject {
    constructor(_0x24c80c, _0x5bbec7) {
      super(_0x24c80c, _0x5bbec7), this["type"] = "bezierCurve", this["path"] = [["M", 0, 0], ["C", -25, 0, -25, 100, 0, 100]], this["stroke"] = "#000000", this["fill"] = "#ffffff00", this["strokeWidth"] = 1, Object["assign"](this, _0x5bbec7);
    }
    ["handleSizeChange"](_0x5107eb) {
      const _0x160a6d = this["w"] / _0x5107eb["w"], _0xc8f270 = this["h"] / _0x5107eb["h"];
      this["path"]["forEach"]((_0x13150a, _0x2b6aec) => {
        _0x13150a["forEach"]((_0x4e67ae, _0x33cbac) => {
          _0x33cbac > 0 && (_0x13150a[_0x33cbac] = _0x33cbac % 2 === 0 ? _0x13150a[_0x33cbac] * _0xc8f270 : _0x13150a[_0x33cbac] * _0x160a6d);
        });
      });
    }
  }
  class Factory {
    static ["getInstance"](_0x504c76, _0x5196f7) {
      switch (_0x5196f7["type"]) {
        case "group":
          return new Group(_0x504c76, _0x5196f7);
        case "activeSelection":
          return new ActiveSelection(_0x504c76, _0x5196f7);
        case "rect":
          return new Rect(_0x504c76, _0x5196f7);
        case "line":
          return new Line(_0x504c76, _0x5196f7);
        case "polyline":
          return new Polyline(_0x504c76, _0x5196f7);
        case "bezierCurve":
          return new BezierCurve(_0x504c76, _0x5196f7);
        default:
          return new BaseObject(_0x504c76, _0x5196f7);
      }
    }
  }
  const _0x1deaa8 = Factory;
  class ObjectHandler {
    constructor(_0x4c09fc) {
      this["editor"] = _0x4c09fc;
    }
    ["attribute"](_0x340a45 = {}) {
      const { editor: _0xa90dd4 } = this;
      return new Promise((_0x535517, _0x498dbb) => {
        const _0x446422 = _0x340a45["map"]((_0x332731) => _0x332731["id"]), _0x118cf2 = _0xa90dd4["getObjectsByCondition"]((_0x2781b6) => _0x446422["includes"](_0x2781b6["id"]));
        if (!_0x118cf2["length"])
          _0x498dbb("no target");
        else {
          const _0x248317 = ["w", "h"];
          _0x118cf2["forEach"]((_0x367106) => {
            const _0x283428 = _0x340a45["find"]((_0x3abb15) => _0x3abb15["id"] === _0x367106["id"]), _0x2202d4 = { "w": _0x367106["w"], "h": _0x367106["h"] };
            _0x367106["set"](_0x283428);
            const _0x1f1d9f = Object["keys"](_0x283428);
            _0x1f1d9f["some"]((_0x33c46e) => _0x248317["includes"](_0x33c46e)) && (_0x367106["handleSizeChange"] && _0x367106["handleSizeChange"](_0x2202d4));
          }), _0x535517("");
        }
      });
    }
    ["move"](_0x10eac5, _0x369010) {
      const { editor: _0x2f2b92 } = this;
      return new Promise((_0x573e37, _0x1df14f) => {
        const _0x35aa87 = _0x2f2b92["getActiveObject"]();
        if (_0x35aa87) {
          if (_0x35aa87["locked"])
            return _0x1df14f("object is locked.");
          let _0x3ed811 = "";
          switch (_0x10eac5) {
            case "top":
              _0x3ed811 = "y";
              break;
            case "left":
              _0x3ed811 = "x";
              break;
          }
          _0x35aa87[_0x3ed811] += _0x369010, _0x35aa87["type"] === "activeSelection" && _0x35aa87["objects"]["forEach"]((_0xdadd77) => {
            _0xdadd77[_0x3ed811] += _0x369010;
          }), _0x35aa87["updateControlsPosition"](), _0x573e37("");
        } else
          _0x1df14f("no active object.");
      });
    }
    ["copy"](_0xe13a2d = ![]) {
      const { editor: _0x43608e } = this;
      return new Promise((_0x29d815, _0x41cfab) => __async(this, null, function* () {
        const { copyKey: _0x99fea4 } = _0x43608e["config"], _0x148f88 = _0x43608e["getActiveObject"]();
        if (_0x148f88) {
          const _0x37d725 = _0x148f88["toJSON"]();
          if (_0x43608e["enableCustomPaste"] && navigator && navigator["clipboard"]) {
            const _0x5937f5 = JSON["stringify"]({ "datavisCopy": !![], "content": _0x37d725 });
            yield navigator["clipboard"]["writeText"](_0x5937f5);
          } else {
            const _0x516d24 = JSON["stringify"](_0x37d725);
            yield _0x43608e["util"]["localforage"]["setItem"](_0x99fea4, _0x516d24);
          }
          if (_0xe13a2d) {
            const _0x4f1f2a = _0x43608e["objects"];
            if (_0x148f88["type"] === "activeSelection")
              _0x148f88["objects"]["forEach"]((_0x5d4563) => {
                const _0x560e25 = _0x4f1f2a["findIndex"]((_0x518d24) => _0x518d24["id"] === _0x5d4563["id"]);
                _0x560e25 > -1 && _0x4f1f2a["splice"](_0x560e25, 1);
              });
            else {
              const _0x3301d1 = _0x4f1f2a["findIndex"]((_0x5f058d) => _0x5f058d["id"] === _0x148f88["id"]);
              _0x3301d1 > -1 && _0x4f1f2a["splice"](_0x3301d1, 1);
            }
            _0x43608e["discardActiveObject"]();
          }
          _0x29d815("");
        } else
          _0x41cfab("no active object");
      }));
    }
    ["cut"]() {
      return this["copy"](!![]);
    }
    ["paste"]() {
      return __async(this, null, function* () {
        const { editor: _0x282b31 } = this;
        return new Promise((_0x53522d, _0x22fbd3) => __async(this, null, function* () {
          const { copyKey: _0x3617ac } = _0x282b31["config"], _0x5499ba = yield _0x282b31["util"]["localforage"]["getItem"](_0x3617ac);
          if (!_0x5499ba)
            return _0x22fbd3("no data to paste");
          const _0x4ee99a = JSON["parse"](_0x5499ba);
          let _0x76c861 = _0x4ee99a["type"] === "activeSelection" ? _0x4ee99a["objects"] : [_0x4ee99a];
          _0x76c861 = _0x282b31["parseObjects"](_0x76c861);
          const _0x5d2741 = _0x282b31["getNamesMap"]();
          editorUtil["traverse"](_0x76c861, "objects", (_0x292bdf) => {
            _0x292bdf["id"] = editorUtil["nanoid"](8);
          }), _0x76c861["forEach"]((_0x197354) => {
            const { prefix: _0x4a1161 } = _0x282b31["analysisName"](_0x197354["name"]);
            !_0x5d2741[_0x4a1161] && (_0x5d2741[_0x4a1161] = 0), _0x197354["name"] = _0x4a1161 + "_" + ++_0x5d2741[_0x4a1161];
          });
          let _0xd8e360 = _0x282b31["objects"]["length"];
          const _0x5e3c81 = _0x282b31["getActiveObjects"](), { startX: _0x2a8e49, startY: _0xd099a9, centerX: _0x1353e1, centerY: _0x1b372b, width: _0x3fc6f9, height: _0x1f62d8 } = _0x282b31["getEditorBounding"](), _0x2b201e = editorUtil["getBoundingRect"](_0x76c861), _0x2eb6d1 = { "x": _0x2a8e49, "y": _0xd099a9, "w": _0x3fc6f9, "h": _0x1f62d8 }, _0x2d8b6b = editorUtil["isRectIntersect"](_0x2b201e, _0x2eb6d1);
          if (!_0x2d8b6b) {
            const _0x3bc703 = _0x1353e1 - _0x4ee99a["x"] - _0x4ee99a["w"] / 2, _0x5cbd87 = _0x1b372b - _0x4ee99a["y"] - _0x4ee99a["h"] / 2;
            _0x76c861["forEach"]((_0x420bf1) => {
              _0x420bf1["x"] += _0x3bc703, _0x420bf1["y"] += _0x5cbd87;
            });
          }
          _0x282b31["discardActiveObject"]();
          _0x5e3c81["length"] && (_0xd8e360 = _0x5e3c81["reduce"]((_0x5e2aa1, _0x3ee2fd) => {
            const _0x550535 = _0x282b31["objects"]["findIndex"]((_0x1d0100) => _0x1d0100["id"] === _0x3ee2fd["id"]);
            return _0x550535 > _0x5e2aa1 ? _0x550535 : _0x5e2aa1;
          }, 0) + 1);
          this["add"](_0x76c861, _0xd8e360);
          if (_0x4ee99a["type"] === "activeSelection") {
            const _0x1781df = editorUtil["getBoundingRect"](_0x76c861, _0x4ee99a["angle"]);
            _0x282b31["setActiveObjectsWithPosition"](_0x76c861, _0x1781df);
          } else
            _0x282b31["setActiveObjects"](_0x76c861);
          _0x53522d("ok");
        }));
      });
    }
    ["multiplex"](_0x416b9a) {
      const { editor: _0x297271 } = this;
      let _0x35698e = [];
      const _0x422776 = _0x297271["getNamesMap"]();
      _0x416b9a["type"] === "activeSelection" ? _0x35698e = _0x416b9a["objects"]["map"]((_0x51b079) => _0x51b079["clone"]()) : _0x35698e = [_0x416b9a["clone"]()];
      _0x35698e["forEach"]((_0x3703a0) => {
        const { prefix: _0x13fbcd } = _0x297271["analysisName"](_0x3703a0["name"]);
        !_0x422776[_0x13fbcd] && (_0x422776[_0x13fbcd] = 0), _0x3703a0["name"] = _0x13fbcd + "_" + ++_0x422776[_0x13fbcd];
      }), editorUtil["traverse"](_0x35698e, "objects", (_0x341ff9) => {
        _0x341ff9["id"] = editorUtil["nanoid"](8);
      });
      let _0x2789fc = _0x297271["objects"]["length"];
      const { startX: _0x2f3b0c, startY: _0x4c4000, centerX: _0x515a4c, centerY: _0x558012, width: _0x3cd114, height: _0x214c79 } = _0x297271["getEditorBounding"](), _0x1f5059 = editorUtil["getBoundingRect"](_0x35698e), _0x57d9f1 = { "x": _0x2f3b0c, "y": _0x4c4000, "w": _0x3cd114, "h": _0x214c79 }, _0x289ab1 = _0x297271["getActiveObjects"]();
      _0x289ab1["length"] && (_0x2789fc = _0x289ab1["reduce"]((_0x293a5f, _0x3d8aa8) => {
        const _0x30ade8 = _0x297271["objects"]["findIndex"]((_0x20129a) => _0x20129a["id"] === _0x3d8aa8["id"]);
        return _0x30ade8 > _0x293a5f ? _0x30ade8 : _0x293a5f;
      }, 0) + 1);
      const _0x45da5f = editorUtil["isRectIntersect"](_0x1f5059, _0x57d9f1);
      if (!_0x45da5f) {
        const _0x5534fc = _0x515a4c - _0x416b9a["x"] - _0x416b9a["w"] / 2, _0x485dca = _0x558012 - _0x416b9a["y"] - _0x416b9a["h"] / 2;
        _0x35698e["forEach"]((_0x1d5007) => {
          _0x1d5007["x"] += _0x5534fc, _0x1d5007["y"] += _0x485dca;
        });
      }
      this["add"](_0x35698e, _0x2789fc);
      if (_0x416b9a["type"] === "activeSelection") {
        let { x: _0x135a80, y: _0x782aca, w: _0x17c9c4, h: _0x525918, angle: _0x3c1c2a } = _0x416b9a;
        _0x297271["setActiveObjectsWithPosition"](_0x35698e, { "x": _0x135a80, "y": _0x782aca, "w": _0x17c9c4, "h": _0x525918, "angle": _0x3c1c2a });
      } else
        _0x297271["setActiveObjects"](_0x35698e);
      return Promise["resolve"]("ok");
    }
    ["group"]() {
      const { editor: _0x3fe04c } = this, { groupAttrs: _0x371a24 } = _0x3fe04c["config"];
      return new Promise((_0x23ce03, _0x5ed033) => {
        const _0x128b70 = _0x3fe04c["getActiveObject"]();
        if (_0x128b70 && _0x128b70["type"] === "activeSelection") {
          const _0x137f0f = _0x128b70["objects"] || [], _0x25f60c = _0x3fe04c["getObjectsParentRelationship"](_0x137f0f);
          _0x25f60c["sort"]((_0x16c625, _0x240060) => _0x240060["path"] - _0x16c625["path"]);
          let _0x48cd0a = _0x25f60c["reduce"]((_0x531286, _0x5b470f) => {
            return _0x531286["push"](..._0x5b470f["parentIdList"]), _0x531286;
          }, []);
          _0x48cd0a = [...new Set(_0x48cd0a)];
          const _0x57addf = _0x137f0f["map"]((_0x53a31a) => _0x53a31a["id"]);
          if (_0x48cd0a["some"]((_0xc3ebfe) => _0x57addf["includes"](_0xc3ebfe)))
            return _0x5ed033("cannot operate parent and children at the same time");
          const _0x3be1f2 = _0x25f60c[0]["target"]["group"] || _0x3fe04c, _0x2b2171 = _0x25f60c[0]["parentId"];
          let _0x1fc8cf = _0x25f60c["filter"]((_0x276f91) => _0x276f91["parentId"] === _0x2b2171)["reduce"]((_0x2f4bfa, _0x11df52) => {
            return Math["min"](_0x2f4bfa, _0x11df52["index"]);
          }, _0x25f60c[0]["index"]);
          const { x: _0x32d49b, y: _0x22082a, w: _0x4f0f54, h: _0x4333f, angle: _0x669170 } = editorUtil["getBoundingRect"](_0x137f0f), _0x266348 = _0x137f0f["map"]((_0x30b7b4) => {
            return __spreadValues({ "id": _0x30b7b4["id"] }, _0x30b7b4["getGlobalPosition"]());
          });
          _0x25f60c["forEach"]((_0x5301a4) => {
            const { index: _0x438afa, target: _0x4d6a59 } = _0x5301a4, _0x4f80c6 = _0x4d6a59["group"] || _0x3fe04c;
            _0x4f80c6["objects"]["splice"](_0x438afa, 1), delete _0x4d6a59["group"];
            const _0x174dbe = _0x266348["find"]((_0x2e204f) => _0x2e204f["id"] === _0x4d6a59["id"]);
            Object["assign"](_0x4d6a59, _0x174dbe);
          });
          const _0x1f4d27 = _0x1deaa8["getInstance"](_0x3fe04c, __spreadProps(__spreadValues({ "type": "group" }, cloneDeep(_0x371a24)), { "x": _0x32d49b, "y": _0x22082a, "w": _0x4f0f54, "h": _0x4333f, "angle": _0x669170 })), _0x11599d = editorUtil["getTotalMatrix"](_0x1f4d27, ![], !![]);
          _0x137f0f["forEach"]((_0x270399) => {
            editorUtil["applyMatrix"](_0x270399, inverse(_0x11599d)), _0x270399["group"] = _0x1f4d27, _0x1f4d27["objects"]["push"](_0x270399);
          }), _0x1f4d27["name"] = _0x3fe04c["getTypeCountName"](_0x1f4d27);
          if (_0x3be1f2["type"] === "group") {
            const _0xc6b099 = editorUtil["getTotalMatrix"](_0x3be1f2, ![], !![]);
            editorUtil["applyMatrix"](_0x1f4d27, inverse(_0xc6b099)), _0x1f4d27["group"] = _0x3be1f2;
          }
          _0x3be1f2["objects"]["splice"](_0x1fc8cf, 0, _0x1f4d27), _0x3fe04c["setActiveObjects"]([_0x1f4d27]), _0x23ce03("");
        } else
          _0x5ed033("no need to group");
      });
    }
    ["ungroup"]() {
      const { editor: _0x5c14d9 } = this;
      return new Promise((_0x558905, _0x2173b7) => {
        const _0x26773d = _0x5c14d9["getActiveObjects"]();
        if (_0x26773d["every"]((_0x10854b) => _0x10854b["type"] === "group")) {
          const _0x49d64e = _0x5c14d9["getObjectsParentRelationship"](_0x26773d);
          _0x49d64e["sort"]((_0x90204c, _0x4758ef) => _0x4758ef["path"] - _0x90204c["path"]);
          const _0x13d9b7 = [];
          _0x49d64e["forEach"]((_0x127f7a) => {
            const { index: _0x3ca5a4, target: _0x411da3 } = _0x127f7a, _0x198881 = _0x411da3["group"] || _0x5c14d9, { x: _0xf2d0f0, y: _0x210b06, angle: _0x36449b } = _0x411da3, _0x166cf9 = _0x411da3["objects"] || [], _0x27c275 = editorUtil["getObjectCenter"](_0x411da3);
            _0x166cf9["forEach"]((_0xe74ce1) => {
              let _0x221304 = editorUtil["getObjectCenter"](_0xe74ce1);
              _0x221304["x"] += _0xf2d0f0, _0x221304["y"] += _0x210b06;
              const _0x2fb4c0 = _0x411da3["objects"]["findIndex"]((_0x544908) => _0x544908["id"] === _0xe74ce1["id"]);
              _0x221304 = editorUtil["rotatePoint"](_0x221304, _0x27c275, _0x36449b), _0xe74ce1["x"] = _0x221304["x"] - _0xe74ce1["w"] / 2, _0xe74ce1["y"] = _0x221304["y"] - _0xe74ce1["h"] / 2, _0xe74ce1["angle"] = _0xe74ce1["angle"] + _0x36449b, _0x198881["type"] === "group" ? _0xe74ce1["group"] = _0x198881 : delete _0xe74ce1["group"], _0x198881["objects"]["splice"](_0x2fb4c0 + _0x3ca5a4, 0, _0xe74ce1), _0x13d9b7["push"](_0xe74ce1);
            });
            const _0x3e846f = _0x198881["objects"]["findIndex"]((_0xd248a7) => _0xd248a7["id"] === _0x411da3["id"]);
            _0x198881["objects"]["splice"](_0x3e846f, 1);
          }), _0x5c14d9["setActiveObjects"](_0x13d9b7), _0x558905("");
        } else
          _0x2173b7("no need to ungroup");
      });
    }
    ["lock"](_0x1e50d2) {
      const { editor: _0x57b624 } = this;
      return new Promise((_0x38c44c, _0x10dfa6) => {
        const _0x411466 = _0x57b624["getActiveObject"]();
        _0x411466 && _0x411466["type"] !== "activeSelection" ? (_0x411466["locked"] = _0x1e50d2, _0x411466["updateControlsPosition"](), _0x38c44c("")) : _0x10dfa6("lock/unlock failed");
      });
    }
    ["layer"](_0x23f3b2) {
      const { editor: _0x5198ca } = this;
      return new Promise((_0x4f3787, _0xb8dbb0) => {
        const _0x236045 = _0x5198ca["getActiveObject"]();
        if (!_0x236045)
          return _0xb8dbb0("no active object");
        if (_0x236045["type"] === "activeSelection")
          return _0xb8dbb0("activeSelection have not layer operations");
        const _0x10ff00 = _0x236045["group"] || _0x5198ca, _0x45531d = _0x10ff00["objects"]["findIndex"]((_0x117973) => _0x117973["id"] === _0x236045["id"]), _0x4d8017 = _0x10ff00["objects"];
        switch (_0x23f3b2) {
          case "bringForward":
            _0x45531d < _0x4d8017["length"] - 1 ? (_0x4d8017["splice"](_0x45531d + 1, 0, _0x4d8017["splice"](_0x45531d, 1)[0]), _0x4f3787("")) : _0xb8dbb0("could not bring forward");
            break;
          case "sendBackwards":
            _0x45531d > 0 ? (_0x4d8017["splice"](_0x45531d - 1, 0, _0x4d8017["splice"](_0x45531d, 1)[0]), _0x4f3787("")) : _0xb8dbb0("could not bring send backwards");
            break;
          case "bringToFront":
            _0x45531d < _0x4d8017["length"] - 1 ? (_0x4d8017["splice"](_0x4d8017["length"] - 1, 0, _0x4d8017["splice"](_0x45531d, 1)[0]), _0x4f3787("")) : _0xb8dbb0("could not bring to front");
            break;
          case "sendToBack":
            _0x45531d > 0 ? (_0x4d8017["splice"](0, 0, _0x4d8017["splice"](_0x45531d, 1)[0]), _0x4f3787("")) : _0xb8dbb0("could not send to back");
            break;
          default:
            _0xb8dbb0("unrecognized layer action");
            break;
        }
      });
    }
    ["remove"](_0x30a017 = []) {
      const { editor: _0x264469 } = this;
      for (let _0x156eba = 0; _0x156eba < _0x30a017["length"]; _0x156eba++) {
        const _0x1896ef = _0x30a017[_0x156eba], _0x259b70 = _0x1896ef["group"] || _0x264469, _0x1293e1 = _0x259b70["objects"]["findIndex"]((_0x4d4fef) => _0x4d4fef["id"] === _0x1896ef["id"]);
        _0x1293e1 > -1 && _0x259b70["objects"]["splice"](_0x1293e1, 1);
      }
      return _0x264469["discardActiveObject"](), Promise["resolve"]("ok");
    }
    ["exitGroup"]() {
      const { editor: _0x219586 } = this;
      _0x219586["group"] && (editorUtil["resetGroupPosition"](_0x219586["group"]), _0x219586["group"] = null);
    }
    ["add"](_0x204b89, _0x14d673) {
      const { editor: _0x354dc1 } = this;
      _0x354dc1["objects"]["splice"](_0x14d673, 0, ..._0x204b89);
    }
  }
  class ZoomHandler {
    constructor(_0x317967) {
      this["limit"] = { "min": 0.2, "max": 4 }, this["thumbnailNumber"] = 2, this["blankDistance"] = 100, this["dragY"] = { "dragging": ![], "clientY": 0 }, this["dragX"] = { "dragging": ![], "clientX": 0 }, this["clientX"] = 0, this["clientY"] = 0, this["rightDom"] = null, this["rightBarDom"] = null, this["bottomDom"] = null, this["bottomBarDom"] = null, this["editor"] = _0x317967, this["initialize"]();
    }
    ["initialize"]() {
      this["initEvent"](), this["initScrollBar"](), this["initRightEvent"](), this["initBottomEvent"](), this["zoomFitView"]();
    }
    ["setHighPerformance"](_0x319644) {
      const { editor: _0x115091 } = this;
      _0x115091["canvasDom"]["style"]["willChange"] = _0x319644 ? "transform" : "";
    }
    ["initEvent"]() {
      const _0x2c8360 = this["editor"], _0x93e9ae = _0x2c8360["getEditorDom"]();
      let _0xad3791 = null;
      _0x93e9ae["addEventListener"]("mousewheel", (_0x519e24) => {
        clearTimeout(_0xad3791), this["setHighPerformance"](!![]), _0x519e24["preventDefault"]();
        if (_0x519e24["ctrlKey"] || _0x519e24["metaKey"])
          this["zoomToPoint"](_0x519e24);
        else {
          const { wheelDeltaX: _0x20d885, wheelDeltaY: _0x20731a } = _0x519e24;
          _0x519e24["shiftKey"] ? this["addOffset"](_0x20731a / 2, 0) : this["addOffset"](_0x20d885 / 2, _0x20731a / 2);
        }
        _0xad3791 = setTimeout(() => {
          this["setHighPerformance"](![]);
        }, 50);
      }), _0x93e9ae["addEventListener"]("DOMMouseScroll", (_0x40b2b3) => {
        if (_0x40b2b3["ctrlKey"] || _0x40b2b3["metaKey"]) {
          _0x40b2b3["preventDefault"](), this["zoomToPoint"](_0x40b2b3);
          return;
        }
        if (_0x40b2b3["shiftKey"]) {
          this["addOffset"](-_0x40b2b3["detail"], 0);
          return;
        }
        this["addOffset"](0, -_0x40b2b3["detail"]);
      }), setTimeout(() => {
        _0x2c8360["fire"]("editor:mounted");
      }, 100);
    }
    ["initScrollBar"]() {
      const _0x411646 = this["editor"], _0x1040db = _0x411646["classNamePrefix"], _0x181ea0 = _0x411646["overLayer"], _0xc06e6a = document["createElement"]("div");
      _0xc06e6a["className"] = _0x1040db + "-scroll-right", this["rightDom"] = _0xc06e6a;
      const _0x4b23e5 = document["createElement"]("div");
      _0x4b23e5["className"] = _0x1040db + "-scroll-right-bar", this["rightBarDom"] = _0x4b23e5, _0xc06e6a["appendChild"](this["rightBarDom"]), _0x181ea0["appendChild"](this["rightDom"]);
      const _0x10e5f2 = document["createElement"]("div");
      _0x10e5f2["className"] = _0x1040db + "-scroll-bottom", this["bottomDom"] = _0x10e5f2;
      const _0x3fc899 = document["createElement"]("div");
      _0x3fc899["className"] = _0x1040db + "-scroll-bottom-bar", this["bottomBarDom"] = _0x3fc899, _0x10e5f2["appendChild"](this["bottomBarDom"]), _0x181ea0["appendChild"](this["bottomDom"]);
    }
    ["initRightEvent"]() {
      const _0x316696 = this["editor"], { viewportTransform: _0xc23fe7 } = _0x316696, _0x555dad = _0x316696["config"];
      this["rightBarDom"]["addEventListener"]("mousedown", (_0x52ff77) => {
        _0x52ff77["stopPropagation"](), _0x52ff77["preventDefault"](), this["dragY"]["dragging"] = !![], this["dragY"]["clientY"] = _0x52ff77["clientY"];
        const _0x25e919 = (_0x1e11af) => {
          _0x1e11af["preventDefault"]();
          if (this["dragY"]["dragging"]) {
            const { sx: _0x384de2 } = editorUtil["decomposeMatrix"](_0xc23fe7), { height: _0x2911c0 } = _0x316696["getEditorBoundingClientRect"](), _0x32e3f9 = this["thumbnailNumber"] * _0x2911c0 + _0x555dad["height"] * _0x384de2, _0x50e2ba = (this["dragY"]["clientY"] - _0x1e11af["clientY"]) * _0x32e3f9 / (_0x2911c0 - 20);
            this["dragY"]["clientY"] = _0x1e11af["clientY"], this["addOffsetY"](_0x50e2ba);
          }
        }, _0x2223c5 = (_0x15ab2a) => {
          _0x15ab2a["preventDefault"](), this["dragY"]["dragging"] = ![], document["removeEventListener"]("mousemove", _0x25e919), document["removeEventListener"]("mouseup", _0x2223c5);
        };
        document["addEventListener"]("mousemove", _0x25e919), document["addEventListener"]("mouseup", _0x2223c5);
      });
    }
    ["setRightBar"]() {
      const { editor: _0x519839 } = this, { ty: _0x5c4fa7, sx: _0x202867 } = editorUtil["decomposeMatrix"](_0x519839["viewportTransform"]), { height: _0x340790 } = _0x519839["getEditorBoundingClientRect"](), _0x4d705c = _0x519839["config"]["height"], _0x48a91d = this["thumbnailNumber"] * _0x340790 + _0x4d705c * _0x202867, _0x77961 = Math["round"](_0x340790 * (_0x340790 - 20) / _0x48a91d) + "px", _0x9e9f5b = Math["round"]((_0x340790 - _0x5c4fa7) * (_0x340790 - 20) / _0x48a91d) + "px";
      this["rightBarDom"]["style"]["top"] = _0x9e9f5b, this["rightBarDom"]["style"]["height"] = _0x77961;
    }
    ["initBottomEvent"]() {
      const { editor: _0x442bab } = this, { config: _0x1e7731 } = _0x442bab;
      this["bottomBarDom"]["addEventListener"]("mousedown", (_0x507d2c) => {
        _0x507d2c["stopPropagation"](), _0x507d2c["preventDefault"](), this["dragX"]["dragging"] = !![], this["dragX"]["clientX"] = _0x507d2c["clientX"];
        const _0x899709 = (_0x1891f6) => {
          _0x1891f6["preventDefault"]();
          if (this["dragX"]["dragging"]) {
            const { sx: _0x574af1 } = editorUtil["decomposeMatrix"](_0x442bab["viewportTransform"]), { width: _0x1bb3de } = _0x442bab["getEditorBoundingClientRect"](), _0x282a07 = this["thumbnailNumber"] * _0x1bb3de + _0x1e7731["width"] * _0x574af1, _0x5058c7 = (this["dragX"]["clientX"] - _0x1891f6["clientX"]) * _0x282a07 / (_0x1bb3de - 20);
            this["dragX"]["clientX"] = _0x1891f6["clientX"], this["addOffsetX"](_0x5058c7);
          }
        }, _0x54e90c = (_0x550fbd) => {
          _0x550fbd["preventDefault"](), this["dragX"]["dragging"] = ![], document["removeEventListener"]("mousemove", _0x899709), document["removeEventListener"]("mouseup", _0x54e90c);
        };
        document["addEventListener"]("mousemove", _0x899709), document["addEventListener"]("mouseup", _0x54e90c);
      });
    }
    ["setBottomBar"]() {
      const _0xdac905 = this["editor"], { tx: _0x200a82, sx: _0xe92a8e } = editorUtil["decomposeMatrix"](_0xdac905["viewportTransform"]), { width: _0x1dff91 } = _0xdac905["getEditorBoundingClientRect"](), _0x509461 = _0xdac905["config"]["width"], _0x4500af = this["thumbnailNumber"] * _0x1dff91 + _0x509461 * _0xe92a8e, _0x39f2ce = Math["round"](_0x1dff91 * (_0x1dff91 - 20) / _0x4500af) + "px", _0x5b7770 = Math["round"]((_0x1dff91 - _0x200a82) * (_0x1dff91 - 20) / _0x4500af) + "px";
      this["bottomBarDom"]["style"]["left"] = _0x5b7770, this["bottomBarDom"]["style"]["width"] = _0x39f2ce;
    }
    ["handleViewportTransform"]() {
      const { editor: _0x4a8979 } = this, { sx: _0x4fda41, tx: _0xc1287b, ty: _0x1932f5 } = editorUtil["decomposeMatrix"](_0x4a8979["viewportTransform"]), _0x2cbadc = _0x4a8979["config"], _0x4e0405 = Math["round"](_0x2cbadc["width"]) + "px", _0x380058 = Math["round"](_0x2cbadc["height"]) + "px", _0x1004b4 = "matrix(" + _0x4fda41 + ", 0, 0, " + _0x4fda41 + ", " + _0xc1287b + ", " + _0x1932f5 + ")";
      _0x4a8979["canvasDom"]["style"]["width"] = _0x4e0405, _0x4a8979["canvasDom"]["style"]["height"] = _0x380058, _0x4a8979["canvasDom"]["style"]["transform"] = _0x1004b4, this["fireEvent"]();
    }
    ["zoomFitView"]() {
      const { editor: _0x21d97d } = this, { width: _0x32a35a, height: _0x3b54ab } = _0x21d97d["getEditorBoundingClientRect"](), { width: _0x310395, height: _0x1baa22 } = _0x21d97d["config"], _0x3fbba1 = _0x21d97d["config"]["zoom"] || {}, _0x3ce5b3 = _0x3fbba1["spaceH"] || 0, _0x390963 = _0x3fbba1["spaceV"] || 0, _0x36106c = (_0x32a35a - 2 * _0x3ce5b3) / _0x310395, _0x5e8bcc = (_0x3b54ab - 2 * _0x390963) / _0x1baa22, _0x435b68 = Math["min"](_0x36106c, _0x5e8bcc), [_0x3de3fc, _0x3686d4] = [_0x435b68, _0x435b68], _0x5f4782 = Math["round"](_0x32a35a / 2 - _0x310395 / 2 * _0x435b68), _0x42c376 = Math["round"](_0x3b54ab / 2 - _0x1baa22 / 2 * _0x435b68);
      _0x21d97d["viewportTransform"] = editorUtil["composeMatrix"]({ "sx": _0x3de3fc, "sy": _0x3686d4, "tx": _0x5f4782, "ty": _0x42c376 }), this["setRightBar"](), this["setBottomBar"](), this["handleViewportTransform"]();
    }
    ["zoomIn"]() {
      const { editor: _0x21d998 } = this, { viewportTransform: _0x2f7d51 } = _0x21d998;
      let { a: _0x61e45c } = _0x2f7d51;
      _0x61e45c += 0.1, _0x61e45c = Math["min"](_0x61e45c, this["limit"]["max"]), _0x2f7d51["a"] = _0x2f7d51["d"] = _0x61e45c, this["setRightBar"](), this["setBottomBar"](), this["handleViewportTransform"]();
    }
    ["zoomOut"]() {
      const { editor: _0x5016df } = this, { viewportTransform: _0x4bdd81 } = _0x5016df;
      let { a: _0x448ec8 } = _0x4bdd81;
      _0x448ec8 -= 0.1, _0x448ec8 = Math["max"](_0x448ec8, this["limit"]["min"]), _0x4bdd81["a"] = _0x4bdd81["d"] = _0x448ec8, this["setRightBar"](), this["setBottomBar"](), this["handleViewportTransform"]();
    }
    ["zoomToReset"]() {
      const { viewportTransform: _0x462423 } = this["editor"];
      _0x462423["e"] = _0x462423["f"] = 0, this["setRightBar"](), this["setBottomBar"](), this["handleViewportTransform"]();
    }
    ["zoomToRatio"](_0x37ae3c) {
      const { viewportTransform: _0x258b8a } = this["editor"];
      _0x258b8a["a"] = _0x258b8a["d"] = _0x37ae3c, this["setRightBar"](), this["setBottomBar"](), this["handleViewportTransform"]();
    }
    ["setZoom"](_0x3f9cbe) {
      switch (_0x3f9cbe["type"]) {
        case "ratio":
          this["zoomToRatio"](_0x3f9cbe["value"]);
          break;
        case "fitView":
          this["zoomFitView"]();
          break;
        case "zoomIn":
          this["zoomIn"]();
          break;
        case "zoomOut":
          this["zoomOut"]();
          break;
        case "reset":
          this["zoomToReset"]();
          break;
      }
    }
    ["zoomToPoint"](_0x40073b) {
      const { editor: _0x1006b1, blankDistance: _0x496144 } = this, { viewportTransform: _0x29217a } = _0x1006b1;
      let _0x68c9bd = 0;
      _0x40073b["detail"] && (_0x68c9bd = _0x40073b["detail"] > 0 ? -10 : 10);
      _0x40073b["wheelDelta"] && (_0x68c9bd = +(_0x40073b["wheelDelta"] / 1e3)["toFixed"](2));
      _0x40073b["preventDefault"]();
      const { sx: _0x47454e, tx: _0x3954a6, ty: _0x6c605b } = editorUtil["decomposeMatrix"](_0x29217a), { width: _0x35cf8a, height: _0x495a06 } = _0x1006b1["getEditorBoundingClientRect"]();
      let _0x4f4e3f = _0x47454e + _0x68c9bd;
      const _0x384ab1 = _0x1006b1["getEditorBoundingClientRect"]();
      _0x4f4e3f = Math["min"](_0x4f4e3f, this["limit"]["max"]), _0x4f4e3f = Math["max"](_0x4f4e3f, this["limit"]["min"]);
      if (_0x40073b) {
        const _0x36c794 = _0x1006b1["config"], _0x1a21c1 = _0x36c794["width"], _0x507678 = _0x36c794["height"], _0x57d5fc = _0x40073b["clientX"] - _0x384ab1["left"], _0x52494b = _0x40073b["clientY"] - _0x384ab1["top"], _0x2742d5 = Math["round"](_0x1a21c1 * _0x47454e);
        let _0xe9cc0f = Math["round"](_0x57d5fc - _0x4f4e3f / _0x47454e * (_0x57d5fc - _0x3954a6));
        const _0x547b35 = _0x496144 * _0x47454e, _0x5468f3 = _0x2742d5 <= _0x547b35, _0x8284ac = _0x5468f3 ? 0 : -_0x2742d5 + _0x547b35, _0x1fc8de = _0x5468f3 ? _0x35cf8a - _0x2742d5 : _0x35cf8a - _0x547b35;
        _0xe9cc0f < 0 && _0xe9cc0f < _0x8284ac && (_0xe9cc0f = _0x8284ac);
        _0xe9cc0f > 0 && _0xe9cc0f > _0x1fc8de && (_0xe9cc0f = _0x1fc8de);
        _0x29217a["e"] = _0xe9cc0f;
        const _0x49ffb9 = Math["round"](_0x507678 * _0x47454e);
        let _0x3f6bb9 = Math["round"](_0x52494b - _0x4f4e3f / _0x47454e * (_0x52494b - _0x6c605b));
        const _0x39398f = _0x49ffb9 <= _0x547b35, _0x26b2a7 = _0x39398f ? 0 : -_0x49ffb9 + _0x547b35, _0x3cf581 = _0x39398f ? _0x495a06 - _0x49ffb9 : _0x495a06 - _0x547b35;
        _0x3f6bb9 < 0 && _0x3f6bb9 < _0x26b2a7 && (_0x3f6bb9 = _0x26b2a7), _0x3f6bb9 > 0 && _0x3f6bb9 > _0x3cf581 && (_0x3f6bb9 = _0x3cf581), _0x29217a["f"] = _0x3f6bb9;
      }
      _0x29217a["a"] = _0x29217a["d"] = _0x4f4e3f, this["setBottomBar"](), this["setRightBar"](), this["handleViewportTransform"]();
    }
    ["fireEvent"]() {
      const { editor: _0xea1c56 } = this;
      _0xea1c56["editorPanzoom"](_0xea1c56["viewportTransform"]);
    }
    ["addOffset"](_0x5c53be, _0x9275cf) {
      const { editor: _0x3f1634, blankDistance: _0x41d2d1 } = this, { viewportTransform: _0x43990f } = _0x3f1634, { sx: _0x49080c, tx: _0x16780c, ty: _0x5cf3dc } = editorUtil["decomposeMatrix"](_0x43990f), { width: _0x223c4e, height: _0x2f6be8 } = _0x3f1634["getEditorBoundingClientRect"]();
      let _0x2ab004 = _0x16780c + _0x5c53be, _0x13f3ba = _0x5cf3dc + _0x9275cf;
      const _0x3ce29b = _0x3f1634["config"]["width"], _0x4c1b30 = _0x3f1634["config"]["height"], _0x4badba = Math["round"](_0x3ce29b * _0x49080c), _0xc86f1a = Math["round"](_0x4c1b30 * _0x49080c), _0x414792 = _0x41d2d1 * _0x49080c, _0x2ee3b9 = _0x4badba <= _0x414792, _0x2867cb = _0x2ee3b9 ? 0 : -_0x4badba + _0x414792, _0x30aa5a = _0x2ee3b9 ? _0x223c4e - _0x4badba : _0x223c4e - _0x414792;
      _0x2ab004 < 0 && _0x2ab004 < _0x2867cb && (_0x2ab004 = _0x2867cb);
      _0x2ab004 > 0 && _0x2ab004 > _0x30aa5a && (_0x2ab004 = _0x30aa5a);
      const _0x5109ff = _0xc86f1a <= _0x414792, _0x124867 = _0x5109ff ? 0 : -_0xc86f1a + _0x414792, _0x427997 = _0x5109ff ? _0x2f6be8 - _0xc86f1a : _0x2f6be8 - _0x414792;
      _0x13f3ba < 0 && _0x13f3ba < _0x124867 && (_0x13f3ba = _0x124867), _0x13f3ba > 0 && _0x13f3ba > _0x427997 && (_0x13f3ba = _0x427997), _0x43990f["e"] = _0x2ab004, _0x43990f["f"] = _0x13f3ba, this["setBottomBar"](), this["setRightBar"](), this["handleViewportTransform"]();
    }
    ["addOffsetX"](_0x44c3f2) {
      const { editor: _0x1141c1, blankDistance: _0x4890db } = this, { viewportTransform: _0x21a19b } = _0x1141c1, { sx: _0x3236b4, tx: _0x429d12 } = editorUtil["decomposeMatrix"](_0x21a19b), { width: _0x4d251b } = _0x1141c1["getEditorBoundingClientRect"](), _0x110c34 = _0x1141c1["config"]["width"], _0x4e12da = Math["round"](_0x110c34 * _0x3236b4);
      let _0x2b6c0c = _0x429d12 + _0x44c3f2;
      const _0x3b845e = _0x4890db * _0x3236b4, _0x3f2fbd = _0x4e12da <= _0x3b845e, _0x5c2c37 = _0x3f2fbd ? 0 : -_0x4e12da + _0x3b845e, _0x44640b = _0x3f2fbd ? _0x4d251b - _0x4e12da : _0x4d251b - _0x3b845e;
      _0x2b6c0c < 0 && _0x2b6c0c < _0x5c2c37 && (_0x2b6c0c = _0x5c2c37), _0x2b6c0c > 0 && _0x2b6c0c > _0x44640b && (_0x2b6c0c = _0x44640b), _0x21a19b["e"] = _0x2b6c0c, this["setBottomBar"](), this["handleViewportTransform"]();
    }
    ["addOffsetY"](_0x18fe21) {
      const { editor: _0xe54c57, blankDistance: _0x4fb5e8 } = this, { viewportTransform: _0x6c8654 } = _0xe54c57, { sx: _0xde1ced, ty: _0x2fedb6 } = editorUtil["decomposeMatrix"](_0x6c8654), { height: _0x198364 } = _0xe54c57["getEditorBoundingClientRect"](), _0x193d91 = _0xe54c57["config"]["height"], _0x4a7777 = Math["round"](_0x193d91 * _0xde1ced);
      let _0x436c29 = _0x2fedb6 + _0x18fe21;
      const _0x1d60f1 = _0x4fb5e8 * _0xde1ced, _0x57b401 = _0x4a7777 <= _0x1d60f1, _0x437be2 = _0x57b401 ? 0 : -_0x4a7777 + _0x1d60f1, _0x2783d6 = _0x57b401 ? _0x198364 - _0x4a7777 : _0x198364 - _0x1d60f1;
      _0x436c29 < 0 && _0x436c29 < _0x437be2 && (_0x436c29 = _0x437be2), _0x436c29 > 0 && _0x436c29 > _0x2783d6 && (_0x436c29 = _0x2783d6), _0x6c8654["f"] = _0x436c29, this["setRightBar"](), this["handleViewportTransform"]();
    }
    ["zoomMoveTo"](_0xaec394) {
      const { editor: _0x3bdf5e, blankDistance: _0x2e7a1f } = this;
      if (!_0x3bdf5e["grabing"])
        return;
      const { viewportTransform: _0x20935e } = _0x3bdf5e;
      this["clientY"] = _0xaec394["clientY"], this["clientX"] = _0xaec394["clientX"], this["setHighPerformance"](!![]);
      const _0x2b3976 = (_0x1edcd2) => {
        const _0x4afeef = this["clientX"] ? _0x1edcd2["clientX"] - this["clientX"] : 0, _0x38425d = this["clientY"] ? _0x1edcd2["clientY"] - this["clientY"] : 0;
        this["clientX"] = _0x1edcd2["clientX"], this["clientY"] = _0x1edcd2["clientY"];
        const { sx: _0x236ba9 } = editorUtil["decomposeMatrix"](_0x20935e), { width: _0x4ead8e, height: _0x4c127b } = _0x3bdf5e["getEditorBoundingClientRect"]();
        let _0x23b0fb = _0x20935e["e"] + _0x4afeef, _0x5058f0 = _0x20935e["f"] + _0x38425d;
        const _0x22c92c = _0x3bdf5e["config"]["width"], _0x4a84ee = _0x3bdf5e["config"]["height"], _0xee860a = Math["round"](_0x22c92c * _0x236ba9), _0x412cb1 = Math["round"](_0x4a84ee * _0x236ba9), _0x4ceeb = _0x2e7a1f * _0x236ba9, _0x39d199 = _0xee860a <= _0x4ceeb, _0x4422f4 = _0x39d199 ? 0 : -_0xee860a + _0x4ceeb, _0x7b991 = _0x39d199 ? _0x4ead8e - _0xee860a : _0x4ead8e - _0x4ceeb;
        _0x23b0fb < 0 && _0x23b0fb < _0x4422f4 && (_0x23b0fb = _0x4422f4);
        _0x23b0fb > 0 && _0x23b0fb > _0x7b991 && (_0x23b0fb = _0x7b991);
        const _0x345675 = _0x412cb1 <= _0x4ceeb, _0x1d17a6 = _0x345675 ? 0 : -_0x412cb1 + _0x4ceeb, _0x5e810e = _0x345675 ? _0x4c127b - _0x412cb1 : _0x4c127b - _0x4ceeb;
        _0x5058f0 < 0 && _0x5058f0 < _0x1d17a6 && (_0x5058f0 = _0x1d17a6), _0x5058f0 > 0 && _0x5058f0 > _0x5e810e && (_0x5058f0 = _0x5e810e), _0x20935e["e"] = _0x23b0fb, _0x20935e["f"] = _0x5058f0, this["setRightBar"](), this["setBottomBar"](), this["handleViewportTransform"]();
      }, _0x50b2f1 = () => {
        this["clientX"] = 0, this["clientY"] = 0, this["handleViewportTransform"](), this["setHighPerformance"](![]), document["removeEventListener"]("mousemove", _0x2b3976), document["removeEventListener"]("mouseup", _0x50b2f1);
      };
      document["addEventListener"]("mousemove", _0x2b3976), document["addEventListener"]("mouseup", _0x50b2f1);
    }
  }
  class RulerAdsorbHandler {
    constructor(_0x2e655d) {
      this["aligningLineMargin"] = 3, this["lines"] = { "v": [], "h": [] }, this["editor"] = _0x2e655d, this["initEvent"]();
    }
    ["initEvent"]() {
      const _0x59fd3a = this["editor"], _0x5021da = this;
      _0x59fd3a["on"]({ "object:moving": function(_0x30e5a2) {
        _0x5021da["adsorption"]();
      } });
    }
    ["setLines"](_0x277e6a) {
      this["lines"] = _0x277e6a;
    }
    ["adsorption"]() {
      const _0x31f355 = this["editor"], _0x5ff765 = _0x31f355["config"]["sorption"], _0x5002c0 = _0x5ff765["enable"], _0x58be7e = _0x5ff765["offset"];
      if (!_0x5002c0)
        return;
      const _0x54e7c9 = _0x31f355["getActiveObject"](), _0x30ce67 = this["lines"];
      if (!_0x54e7c9)
        return;
      if (_0x54e7c9["parentId"])
        return;
      const _0x27e6a8 = (_0x57450f) => {
        const { x: _0x1a14a1, y: _0x1200db, w: _0x17b524, h: _0x5bed7f } = editorUtil["getBoundingRect"]([_0x57450f]);
        return { "angle": 0, "width": _0x17b524, "height": _0x5bed7f, "left": _0x1a14a1, "top": _0x1200db, "right": _0x1a14a1 + _0x17b524, "bottom": _0x1200db + _0x5bed7f, "centerX": _0x1a14a1 + _0x17b524 / 2, "centerY": _0x1200db + _0x5bed7f / 2 };
      }, _0x483920 = (_0x3ebe15, _0x1bf2af) => {
        _0x3ebe15 = Math["round"](_0x3ebe15), _0x1bf2af = Math["round"](_0x1bf2af);
        for (let _0x26a906 = _0x3ebe15 - _0x58be7e, _0x1e3aa6 = _0x3ebe15 + _0x58be7e; _0x26a906 <= _0x1e3aa6; _0x26a906++) {
          if (_0x26a906 === _0x1bf2af)
            return !![];
        }
        return ![];
      }, _0x273f50 = _0x30ce67["h"] || [];
      for (const _0x422efc of _0x273f50) {
        const _0x49077b = _0x27e6a8(_0x54e7c9);
        if (_0x483920(_0x49077b["left"], _0x422efc)) {
          const _0x2408ec = editorUtil["getBoundingRect"]([_0x54e7c9]), _0x4bca79 = _0x2408ec["x"], _0xb93588 = _0x422efc - _0x4bca79;
          _0x54e7c9["x"] += _0xb93588;
        }
        if (_0x483920(_0x49077b["centerX"], _0x422efc)) {
          const _0x5ef9ac = editorUtil["getBoundingRect"]([_0x54e7c9]), _0x35cb0e = _0x5ef9ac["x"] + _0x5ef9ac["w"] / 2, _0x318099 = _0x422efc - _0x35cb0e;
          _0x54e7c9["x"] += _0x318099;
        }
        if (_0x483920(_0x49077b["right"], _0x422efc)) {
          const _0x2e04c4 = editorUtil["getBoundingRect"]([_0x54e7c9]), _0x24d514 = _0x2e04c4["x"] + _0x2e04c4["w"], _0x496a9d = _0x422efc - _0x24d514;
          _0x54e7c9["x"] += _0x496a9d;
        }
      }
      const _0xd18ebb = _0x30ce67["v"] || [];
      for (const _0x3fc82b of _0xd18ebb) {
        const _0x4ace85 = _0x27e6a8(_0x54e7c9);
        if (_0x483920(_0x4ace85["top"], _0x3fc82b)) {
          const _0x26438e = editorUtil["getBoundingRect"]([_0x54e7c9]), _0x5653c1 = _0x26438e["y"], _0x111fce = _0x3fc82b - _0x5653c1;
          _0x54e7c9["y"] += _0x111fce;
        }
        if (_0x483920(_0x4ace85["centerY"], _0x3fc82b)) {
          const _0x373947 = editorUtil["getBoundingRect"]([_0x54e7c9]), _0x395b2c = _0x373947["y"] + _0x373947["h"] / 2, _0x11f4bb = _0x3fc82b - _0x395b2c;
          _0x54e7c9["y"] += _0x11f4bb;
        }
        if (_0x483920(_0x4ace85["bottom"], _0x3fc82b)) {
          const _0x3b6ec5 = editorUtil["getBoundingRect"]([_0x54e7c9]), _0x1343a9 = _0x3b6ec5["y"] + _0x3b6ec5["h"], _0x555caf = _0x3fc82b - _0x1343a9;
          _0x54e7c9["y"] += _0x555caf;
        }
        _0x5002c0 && _0x31f355["fire"]("object:sorption");
      }
    }
    ["initRulerAdsorb"](_0x1bde5e) {
      const _0x4d1e48 = this["editor"], _0x3f7fde = _0x4d1e48["getActiveObject"]();
      if (!_0x3f7fde)
        return;
      if (_0x3f7fde["parentId"])
        return;
      const _0x1599f4 = (_0x540f54, _0x216c7c) => {
        return Math["abs"](_0x540f54 - _0x216c7c) <= this["aligningLineMargin"];
      }, _0x523254 = _0x3f7fde && _0x3f7fde ? _0x3f7fde : {}, _0x2fc782 = _0x523254["w"], _0x19348a = _0x523254["h"];
      _0x3f7fde["setPosition"] = (_0x487dc2, _0x5c1c45) => {
        _0x3f7fde["x"] = _0x487dc2, _0x3f7fde["y"] = _0x5c1c45;
      };
      const _0x17ba0c = _0x523254["x"], _0x2945f = _0x17ba0c + _0x2fc782 / 2, _0x291085 = _0x17ba0c + _0x2fc782, _0x3471a2 = _0x523254["y"], _0x350108 = _0x3471a2 + _0x19348a / 2, _0x178440 = _0x3471a2 + _0x19348a, _0x189cb3 = _0x1bde5e["h"] || [];
      for (let _0x385860 of _0x189cb3) {
        _0x385860 += _0x385860, _0x1599f4(_0x17ba0c, _0x385860) && _0x3f7fde["setPosition"](_0x385860, _0x3471a2), _0x1599f4(_0x2945f, _0x385860) && _0x3f7fde["setPosition"](_0x385860 - _0x2fc782 / 2, _0x3471a2), _0x1599f4(_0x291085, _0x385860) && _0x3f7fde["setPosition"](_0x385860 - _0x2fc782, _0x3471a2);
      }
      const _0x3313b5 = _0x1bde5e["v"] || [];
      for (let _0x259aa9 of _0x3313b5) {
        _0x1599f4(_0x3471a2, _0x259aa9) && _0x3f7fde["setPosition"](_0x17ba0c, _0x259aa9), _0x1599f4(_0x350108, _0x259aa9) && _0x3f7fde["setPosition"](_0x17ba0c, _0x259aa9 - _0x19348a / 2), _0x1599f4(_0x178440, _0x259aa9) && _0x3f7fde["setPosition"](_0x17ba0c, _0x259aa9 - _0x19348a);
      }
    }
  }
  class GuidelineHandler {
    constructor(_0x193b1c) {
      this["guidelineDom"] = null, this["horizontalList"] = [], this["verticalList"] = [], this["guideGapDom"] = null, this["gapHorizontalList"] = [], this["gapVerticalList"] = [], this["boundingList"] = [], this["editor"] = _0x193b1c, this["initGuidlineDom"](), this["initguideGapDom"](), this["initEvent"]();
    }
    ["initEvent"]() {
      const _0x501c4c = this, _0x3b593f = this["editor"];
      _0x3b593f["on"]({ "object:moving": function(_0x259fd2) {
        if (_0x3b593f["config"]["sorption"] && !_0x3b593f["config"]["sorption"]["enabled"])
          return;
        else {
          if (_0x259fd2["e"]["shiftKey"] || _0x259fd2["e"]["altKey"]) {
            _0x501c4c["clearGuidelines"](), _0x501c4c["clearGuideGap"]();
            return;
          }
        }
        !_0x501c4c["boundingList"]["length"] && (_0x501c4c["boundingList"] = _0x501c4c["getBoundingList"](_0x3b593f)), _0x501c4c["createGuideLines"](), _0x501c4c["createGuideGap"]();
      }, "editor:panzoom": function(_0x470441) {
        (_0x501c4c["horizontalList"]["length"] || _0x501c4c["verticalList"]["length"]) && (_0x501c4c["boundingList"] = _0x501c4c["getBoundingList"](_0x3b593f), _0x501c4c["createGuideLines"](), _0x501c4c["createGuideGap"]());
      }, "editor:mouseup": function(_0x9d60cd) {
        _0x501c4c["boundingList"] = [], _0x501c4c["clearGuidelines"](), _0x501c4c["clearGuideGap"]();
      } });
    }
    ["isInRange"](_0x345f74, _0x60fb5e, _0x120dff = 1) {
      _0x345f74 = Math["round"](_0x345f74), _0x60fb5e = Math["round"](_0x60fb5e);
      for (let _0x1e8e55 = _0x345f74 - _0x120dff, _0x441540 = _0x345f74 + _0x120dff; _0x1e8e55 <= _0x441540; _0x1e8e55++) {
        if (_0x1e8e55 === _0x60fb5e)
          return !![];
      }
      return ![];
    }
    ["getBoundingList"](_0x50d7c6) {
      const _0x36b1cc = _0x50d7c6["group"] ? _0x50d7c6["group"]["objects"] : _0x50d7c6["objects"], _0x517718 = _0x50d7c6["getActiveObject"](), _0xa629d2 = [];
      for (let _0xb6f976 = 0; _0xb6f976 < _0x36b1cc["length"]; _0xb6f976++) {
        const _0x785f61 = _0x36b1cc[_0xb6f976];
        if (_0x785f61["id"] !== _0x517718["id"]) {
          const _0x3c0d2c = _0x785f61["getContainerPosition"]();
          _0x3c0d2c["id"] = _0x785f61["id"];
          const _0x5a64e5 = getPosition(_0x3c0d2c);
          _0xa629d2["push"](_0x5a64e5);
        }
      }
      return _0xa629d2;
    }
    ["initGuidlineDom"]() {
      const _0x25b0eb = this["editor"], _0x54a6bc = editorUtil["createSvgElement"]("svg", { "class": "guide-line-dom" }, { "pointerEvents": "none", "position": "absolute", "width": "100%", "height": "100%", "left": "0px", "top": "0px", "overflow": "visible" });
      this["guidelineDom"] = _0x54a6bc;
      const _0x286b02 = _0x25b0eb["overLayer"];
      setTimeout(() => {
        _0x286b02["appendChild"](this["guidelineDom"]);
      }, 300);
    }
    ["clearGuidelines"]() {
      this["horizontalList"] = this["verticalList"] = [], this["guidelineDom"]["innerHTML"] = null;
    }
    ["drawLines"]() {
      const { editor: _0x3271cd, guidelineDom: _0x18f8f9, horizontalList: _0xfeb7d9, verticalList: _0x2b7229 } = this, { color: _0x39257c, width: _0x18ea17 } = _0x3271cd["config"]["guideline"];
      let _0x5c29eb = "";
      _0xfeb7d9["forEach"]((_0x4d0684) => {
        const { x1: _0x5f22cb, x2: _0x4fa670, y1: _0x36299c, y2: _0x469123 } = _0x4d0684;
        _0x5c29eb += '<line\n      x1="' + _0x5f22cb + '"\n      y1="' + _0x36299c + '"\n      x2="' + _0x4fa670 + '"\n      y2="' + _0x469123 + '"\n      stroke-width="' + _0x18ea17 + '"\n      stroke="' + _0x39257c + '"\n    />';
      });
      let _0x55411c = "";
      _0x2b7229["forEach"]((_0x479e61) => {
        const { x1: _0x47a9c4, x2: _0x2cc80c, y1: _0x87a503, y2: _0x55ff89 } = _0x479e61;
        _0x55411c += '<line\n      x1="' + _0x47a9c4 + '"\n      y1="' + _0x87a503 + '"\n      x2="' + _0x2cc80c + '"\n      y2="' + _0x55ff89 + '"\n      stroke-width="' + _0x18ea17 + '"\n      stroke="' + _0x39257c + '"\n    />';
      }), _0x18f8f9["innerHTML"] = "<g>" + _0x5c29eb + " " + _0x55411c + "</g>";
    }
    ["createGuideLines"]() {
      const { editor: _0x265ea5 } = this, { offset: _0x1fdbb3 } = _0x265ea5["config"]["sorption"], _0x52578f = _0x265ea5["getActiveObject"]();
      if (!_0x52578f || _0x52578f["type"] === "activeSelection")
        return;
      const _0x322cc3 = _0x265ea5["getZoom"](), _0x2cad2c = (_0x30ccea, _0x2e0a21 = "horizontal", _0x141091 = "left", _0x46b833 = "left") => {
        const { left: _0x33ee62, top: _0x42424b, right: _0x1a385b, bottom: _0x52816f } = _0x30ccea, _0x182c63 = getPosition(_0xe82f7d);
        if (!this["isInRange"](_0x30ccea[_0x141091], _0x182c63[_0x46b833], _0x1fdbb3))
          return;
        const _0x403760 = (_0x30ccea[_0x141091] - _0x182c63[_0x46b833]) / _0x322cc3;
        let [_0x303518, _0x1cbd6a, _0x25d83b, _0x3ef539] = [0, 0, 0, 0];
        _0x2e0a21 === "horizontal" ? (_0x303518 = Math["min"](_0x33ee62, _0x182c63["left"]), _0x1cbd6a = Math["max"](_0x1a385b, _0x182c63["right"]), _0x25d83b = _0x3ef539 = _0x30ccea[_0x141091]) : (_0x303518 = _0x1cbd6a = _0x30ccea[_0x141091], _0x25d83b = Math["min"](_0x42424b, _0x182c63["top"]), _0x3ef539 = Math["max"](_0x52816f, _0x182c63["bottom"]));
        const _0x21699e = { "x": _0x303518, "y": _0x25d83b }, _0x259d73 = { "x": _0x1cbd6a, "y": _0x3ef539 }, _0xeba6bd = { "x1": +_0x21699e["x"]["toFixed"](2), "y1": +_0x21699e["y"]["toFixed"](2), "x2": +_0x259d73["x"]["toFixed"](2), "y2": +_0x259d73["y"]["toFixed"](2) };
        _0x2e0a21 === "horizontal" ? !_0x25eb7c ? (_0x25eb7c = !![], _0x52578f["y"] += _0x403760, _0xe82f7d["y"] += _0x403760, _0x23ca01["push"](_0xeba6bd)) : _0x25d83b["toFixed"](2) === _0x182c63[_0x46b833]["toFixed"](2) && _0x23ca01["push"](_0xeba6bd) : !_0x2a458c ? (_0x2a458c = !![], _0x52578f["x"] += _0x403760, _0xe82f7d["x"] += _0x403760, _0x2af934["push"](_0xeba6bd)) : _0x303518["toFixed"](2) === _0x182c63[_0x46b833]["toFixed"](2) && _0x2af934["push"](_0xeba6bd);
      }, _0xe82f7d = _0x52578f["getContainerPosition"](), _0x2af934 = [], _0x23ca01 = [];
      let _0x25eb7c = ![], _0x2a458c = ![];
      for (let _0x5af7b1 = 0; _0x5af7b1 < this["boundingList"]["length"]; _0x5af7b1++) {
        const _0x50f7cf = this["boundingList"][_0x5af7b1];
        _0x2cad2c(_0x50f7cf, "vertical", "left", "left"), _0x2cad2c(_0x50f7cf, "vertical", "centerX", "left"), _0x2cad2c(_0x50f7cf, "vertical", "right", "left"), _0x2cad2c(_0x50f7cf, "vertical", "left", "centerX"), _0x2cad2c(_0x50f7cf, "vertical", "centerX", "centerX"), _0x2cad2c(_0x50f7cf, "vertical", "right", "centerX"), _0x2cad2c(_0x50f7cf, "vertical", "left", "right"), _0x2cad2c(_0x50f7cf, "vertical", "centerX", "right"), _0x2cad2c(_0x50f7cf, "vertical", "right", "right"), _0x2cad2c(_0x50f7cf, "horizontal", "top", "top"), _0x2cad2c(_0x50f7cf, "horizontal", "centerY", "top"), _0x2cad2c(_0x50f7cf, "horizontal", "bottom", "top"), _0x2cad2c(_0x50f7cf, "horizontal", "top", "centerY"), _0x2cad2c(_0x50f7cf, "horizontal", "centerY", "centerY"), _0x2cad2c(_0x50f7cf, "horizontal", "bottom", "centerY"), _0x2cad2c(_0x50f7cf, "horizontal", "top", "bottom"), _0x2cad2c(_0x50f7cf, "horizontal", "centerY", "bottom"), _0x2cad2c(_0x50f7cf, "horizontal", "bottom", "bottom");
      }
      this["verticalList"] = Object["values"](groupBy(_0x2af934, "x1"))["map"]((_0x248a92) => {
        const _0x2577c0 = _0x248a92[0];
        let [_0x37783e, _0x3fd021] = [_0x2577c0["y1"], _0x2577c0["y2"]];
        return _0x248a92["forEach"]((_0x3d0bc9) => {
          _0x37783e = Math["min"](_0x3d0bc9["y1"], _0x3d0bc9["y2"], _0x37783e), _0x3fd021 = Math["max"](_0x3d0bc9["y1"], _0x3d0bc9["y2"], _0x3fd021);
        }), { "x1": _0x2577c0["x1"], "y1": _0x37783e, "x2": _0x2577c0["x2"], "y2": _0x3fd021 };
      }), this["horizontalList"] = Object["values"](groupBy(_0x23ca01, "y1"))["map"]((_0x205dff) => {
        const _0x3b5e1f = _0x205dff[0];
        let [_0x5db10b, _0x11473d] = [_0x3b5e1f["x1"], _0x3b5e1f["x2"]];
        return _0x205dff["forEach"]((_0x147beb) => {
          _0x5db10b = Math["min"](_0x147beb["x1"], _0x147beb["x2"], _0x5db10b), _0x11473d = Math["max"](_0x147beb["x1"], _0x147beb["x2"], _0x11473d);
        }), { "x1": _0x5db10b, "y1": _0x3b5e1f["y1"], "x2": _0x11473d, "y2": _0x3b5e1f["y2"] };
      }), this["drawLines"]();
    }
    ["initguideGapDom"]() {
      const _0x3039e2 = this["editor"], _0x58887e = editorUtil["createSvgElement"]("svg", { "class": "guide-gap-dom" }, { "pointerEvents": "none", "position": "absolute", "width": "100%", "height": "100%", "left": "0px", "top": "0px", "overflow": "visible" });
      this["guideGapDom"] = _0x58887e;
      const _0x172327 = _0x3039e2["overLayer"];
      setTimeout(() => {
        _0x172327["appendChild"](this["guideGapDom"]);
      }, 300);
    }
    ["clearGuideGap"]() {
      this["guideGapDom"]["innerHTML"] = null;
    }
    ["createGuideGap"]() {
      const { editor: _0x3c042f } = this, _0x2f5a58 = _0x3c042f["getActiveObject"]();
      if (!_0x2f5a58 || _0x2f5a58["type"] === "activeSelection")
        return;
      const { offset: _0x5c152e } = _0x3c042f["config"]["sorption"], _0x1a0e19 = _0x3c042f["getZoom"]();
      this["gapVerticalList"] = this["gapHorizontalList"] = [];
      const _0x2157cf = [], _0x1ad926 = [], _0x3282ea = getPosition(_0x2f5a58["getContainerPosition"]());
      _0x3282ea["id"] = _0x2f5a58["id"];
      const _0x3063c7 = [...this["boundingList"], _0x3282ea], _0x5b6fc6 = cloneDeep(_0x3063c7)["sort"]((_0x247986, _0x183bd6) => _0x247986["top"] - _0x183bd6["top"])["filter"]((_0x3a983c) => !(_0x3a983c["left"] > _0x3282ea["right"] || _0x3a983c["right"] < _0x3282ea["left"])), _0x4f124f = _0x5b6fc6["findIndex"]((_0x1cb71b) => _0x1cb71b["id"] === _0x2f5a58["id"]), _0x24ae13 = _0x5b6fc6[_0x4f124f], _0x4ec791 = _0x5b6fc6[_0x4f124f - 1], _0x7f6a30 = _0x5b6fc6[_0x4f124f + 1], _0x29f471 = /* @__PURE__ */ new Map();
      for (let _0x4854d4 = 0; _0x4854d4 < _0x5b6fc6["length"]; _0x4854d4++) {
        const _0x4ef4b9 = _0x5b6fc6[_0x4854d4], _0x7f07b3 = _0x5b6fc6[_0x4854d4 + 1];
        if (_0x4ef4b9["id"] !== _0x2f5a58["id"] && _0x7f07b3 && _0x7f07b3["id"] !== _0x2f5a58["id"]) {
          const _0x76ee80 = +(_0x7f07b3["top"] - _0x4ef4b9["bottom"])["toFixed"](0);
          if (_0x76ee80 > 0) {
            const _0xd0d3b2 = _0x29f471["get"](_0x76ee80);
            let _0x5e34f4 = { "x": Math["min"](_0x4ef4b9["left"], _0x7f07b3["left"]), "y": _0x4ef4b9["bottom"], "w": Math["max"](_0x4ef4b9["right"], _0x7f07b3["right"]) - Math["min"](_0x4ef4b9["left"], _0x7f07b3["left"]), "h": _0x76ee80, "value": +(_0x76ee80 / _0x1a0e19)["toFixed"](0) };
            _0xd0d3b2 ? _0xd0d3b2["push"](_0x5e34f4) : _0x29f471["set"](_0x76ee80, [_0x5e34f4]);
          }
        }
      }
      const _0x19ec73 = Array["from"](_0x29f471["keys"]());
      _0x19ec73["sort"]();
      let _0x5212df = ![];
      if (_0x4ec791) {
        const _0x106d34 = +(_0x24ae13["top"] - _0x4ec791["bottom"])["toFixed"](0);
        for (let _0x2cf9de = 0; _0x2cf9de < _0x19ec73["length"]; _0x2cf9de++) {
          const _0x2b34f6 = _0x19ec73[_0x2cf9de];
          if (this["isInRange"](_0x2b34f6, _0x106d34, _0x5c152e)) {
            const _0x1358aa = _0x2b34f6 - _0x106d34, _0x263ff6 = _0x1358aa / _0x1a0e19, _0x31c177 = _0x29f471["get"](_0x2b34f6);
            _0x31c177["push"]({ "x": Math["min"](_0x24ae13["left"], _0x4ec791["left"]), "y": _0x4ec791["bottom"], "w": Math["max"](_0x24ae13["right"], _0x4ec791["right"]) - Math["min"](_0x24ae13["left"], _0x4ec791["left"]), "h": _0x2b34f6, "value": +(_0x2b34f6 / _0x1a0e19)["toFixed"](0), "isSelf": !![] }), _0x2f5a58["set"]({ "y": _0x2f5a58["y"] + _0x263ff6 }), _0x5212df = !![];
            break;
          }
        }
      }
      if (_0x7f6a30) {
        const _0x4f091c = +(_0x7f6a30["top"] - _0x24ae13["bottom"])["toFixed"](0);
        for (let _0x218691 = 0; _0x218691 < _0x19ec73["length"]; _0x218691++) {
          const _0x1b5614 = _0x19ec73[_0x218691];
          if (this["isInRange"](_0x1b5614, _0x4f091c, _0x5c152e)) {
            const _0x85dc07 = _0x1b5614 - _0x4f091c, _0x337897 = _0x85dc07 / _0x1a0e19, _0x4c6e3c = _0x29f471["get"](_0x1b5614);
            _0x4c6e3c["push"]({ "x": Math["min"](_0x24ae13["left"], _0x7f6a30["left"]), "y": _0x7f6a30["top"] - _0x1b5614, "w": Math["max"](_0x24ae13["right"], _0x7f6a30["right"]) - Math["min"](_0x24ae13["left"], _0x7f6a30["left"]), "h": _0x1b5614, "value": +(_0x1b5614 / _0x1a0e19)["toFixed"](0), "isSelf": !![] });
            !_0x5212df && _0x2f5a58["set"]({ "y": _0x2f5a58["y"] - _0x337897 });
            break;
          }
        }
      }
      if (!_0x5212df && _0x4ec791 && _0x7f6a30) {
        const _0x4b51de = (_0x7f6a30["top"] + _0x4ec791["bottom"]) / 2;
        if (this["isInRange"](_0x4b51de, _0x24ae13["centerY"], _0x5c152e)) {
          const _0x382dfa = _0x4b51de - _0x24ae13["centerY"], _0x7e0d7d = _0x382dfa / _0x1a0e19, _0x2adfe4 = +((_0x7f6a30["top"] - _0x4ec791["bottom"] - _0x24ae13["h"]) / 2)["toFixed"](0), _0x24e574 = _0x29f471["get"](_0x2adfe4);
          if (_0x2adfe4 > 0) {
            const _0x1b17df = [{ "x": Math["min"](_0x24ae13["left"], _0x4ec791["left"]), "y": _0x4ec791["bottom"], "w": Math["max"](_0x24ae13["right"], _0x4ec791["right"]) - Math["min"](_0x24ae13["left"], _0x4ec791["left"]), "h": _0x2adfe4, "value": +(_0x2adfe4 / _0x1a0e19)["toFixed"](0), "isSelf": !![] }, { "x": Math["min"](_0x24ae13["left"], _0x7f6a30["left"]), "y": _0x7f6a30["top"] - _0x2adfe4, "w": Math["max"](_0x24ae13["right"], _0x7f6a30["right"]) - Math["min"](_0x24ae13["left"], _0x7f6a30["left"]), "h": _0x2adfe4, "value": +(_0x2adfe4 / _0x1a0e19)["toFixed"](0) }];
            _0x24e574 ? _0x24e574["push"](..._0x1b17df) : _0x29f471["set"](_0x2adfe4, _0x1b17df), _0x2f5a58["set"]({ "y": _0x2f5a58["y"] + _0x7e0d7d });
          }
        }
      }
      _0x29f471["forEach"]((_0x1efd15) => {
        _0x1efd15["length"] > 1 && _0x1efd15["some"]((_0x54f7a5) => _0x54f7a5["isSelf"]) && _0x2157cf["push"](..._0x1efd15);
      }), this["gapHorizontalList"] = _0x2157cf;
      if (!_0x5212df) {
        const _0x49f87d = cloneDeep(_0x3063c7)["sort"]((_0x24b5df, _0x3f3518) => _0x24b5df["left"] - _0x3f3518["left"])["filter"]((_0x427863) => !(_0x427863["top"] > _0x3282ea["bottom"] || _0x427863["bottom"] < _0x3282ea["top"])), _0x287c37 = _0x49f87d["findIndex"]((_0x22dcba) => _0x22dcba["id"] === _0x2f5a58["id"]), _0x11fb1e = _0x49f87d[_0x287c37], _0x5ef9f0 = _0x49f87d[_0x287c37 - 1], _0xea4321 = _0x49f87d[_0x287c37 + 1], _0x3a2eae = /* @__PURE__ */ new Map();
        for (let _0x4e5233 = 0; _0x4e5233 < _0x49f87d["length"]; _0x4e5233++) {
          const _0x5c097f = _0x49f87d[_0x4e5233], _0x286b38 = _0x49f87d[_0x4e5233 + 1];
          if (_0x5c097f["id"] !== _0x2f5a58["id"] && _0x286b38 && _0x286b38["id"] !== _0x2f5a58["id"]) {
            const _0x4261ad = +(_0x286b38["left"] - _0x5c097f["right"])["toFixed"](0);
            if (_0x4261ad > 0) {
              const _0x234f67 = _0x3a2eae["get"](_0x4261ad);
              let _0x1f72f7 = { "x": _0x5c097f["right"], "y": Math["min"](_0x5c097f["top"], _0x286b38["top"]), "w": _0x4261ad, "h": Math["max"](_0x5c097f["bottom"], _0x286b38["bottom"]) - Math["min"](_0x5c097f["top"], _0x286b38["top"]), "value": +(_0x4261ad / _0x1a0e19)["toFixed"](0) };
              _0x234f67 ? _0x234f67["push"](_0x1f72f7) : _0x3a2eae["set"](_0x4261ad, [_0x1f72f7]);
            }
          }
        }
        const _0x3dbbd1 = Array["from"](_0x3a2eae["keys"]());
        _0x3dbbd1["sort"]();
        let _0x1c047f = ![];
        if (_0x5ef9f0) {
          const _0x2e03ca = +(_0x11fb1e["left"] - _0x5ef9f0["right"])["toFixed"](0);
          for (let _0x359fd1 = 0; _0x359fd1 < _0x3dbbd1["length"]; _0x359fd1++) {
            const _0x2ba3bf = _0x3dbbd1[_0x359fd1];
            if (this["isInRange"](_0x2ba3bf, _0x2e03ca, _0x5c152e)) {
              const _0x15b57a = _0x2ba3bf - _0x2e03ca, _0x4243f7 = _0x15b57a / _0x1a0e19, _0x47f84d = _0x3a2eae["get"](_0x2ba3bf);
              _0x47f84d["push"]({ "x": _0x5ef9f0["right"], "y": Math["min"](_0x11fb1e["top"], _0x5ef9f0["top"]), "w": _0x2ba3bf, "h": Math["max"](_0x11fb1e["bottom"], _0x5ef9f0["bottom"]) - Math["min"](_0x11fb1e["top"], _0x5ef9f0["top"]), "value": +(_0x2ba3bf / _0x1a0e19)["toFixed"](0), "isSelf": !![] }), _0x2f5a58["set"]({ "x": _0x2f5a58["x"] + _0x4243f7 }), _0x1c047f = !![];
              break;
            }
          }
        }
        if (_0xea4321) {
          const _0x88a24e = +(_0xea4321["left"] - _0x11fb1e["right"])["toFixed"](0);
          for (let _0x1a17b1 = 0; _0x1a17b1 < _0x3dbbd1["length"]; _0x1a17b1++) {
            const _0xf48a47 = _0x3dbbd1[_0x1a17b1];
            if (this["isInRange"](_0xf48a47, _0x88a24e, _0x5c152e)) {
              const _0x454c5e = _0xf48a47 - _0x88a24e, _0x5161be = _0x454c5e / _0x1a0e19, _0x4d5111 = _0x3a2eae["get"](_0xf48a47);
              _0x4d5111["push"]({ "x": _0xea4321["left"] - _0xf48a47, "y": Math["min"](_0x11fb1e["top"], _0xea4321["top"]), "w": _0xf48a47, "h": Math["max"](_0x11fb1e["bottom"], _0xea4321["bottom"]) - Math["min"](_0x11fb1e["top"], _0xea4321["top"]), "value": +(_0xf48a47 / _0x1a0e19)["toFixed"](0), "isSelf": !![] }), !_0x1c047f && _0x2f5a58["set"]({ "x": _0x2f5a58["x"] - _0x5161be });
            }
          }
        }
        if (!_0x1c047f && _0x5ef9f0 && _0xea4321) {
          const _0x56f804 = (_0xea4321["left"] + _0x5ef9f0["right"]) / 2;
          if (this["isInRange"](_0x56f804, _0x11fb1e["centerX"], _0x5c152e)) {
            const _0x2c16ab = _0x56f804 - _0x11fb1e["centerX"], _0x2f48cb = _0x2c16ab / _0x1a0e19, _0x2a262d = +((_0xea4321["left"] - _0x5ef9f0["right"] - _0x11fb1e["w"]) / 2)["toFixed"](0);
            if (_0x2a262d > 0) {
              const _0x4af1a4 = _0x3a2eae["get"](_0x2a262d), _0x3d9b0d = [{ "x": _0x5ef9f0["right"], "y": Math["min"](_0x11fb1e["top"], _0x5ef9f0["top"]), "w": _0x2a262d, "h": Math["max"](_0x11fb1e["bottom"], _0x5ef9f0["bottom"]) - Math["min"](_0x11fb1e["top"], _0x5ef9f0["top"]), "value": +(_0x2a262d / _0x1a0e19)["toFixed"](0), "isSelf": !![] }, { "x": _0xea4321["left"] - _0x2a262d, "y": Math["min"](_0x11fb1e["top"], _0xea4321["top"]), "w": _0x2a262d, "h": Math["max"](_0x11fb1e["bottom"], _0xea4321["bottom"]) - Math["min"](_0x11fb1e["top"], _0xea4321["top"]), "value": +(_0x2a262d / _0x1a0e19)["toFixed"](0) }];
              _0x4af1a4 ? _0x4af1a4["push"](..._0x3d9b0d) : _0x3a2eae["set"](_0x2a262d, _0x3d9b0d), _0x2f5a58["set"]({ "x": _0x2f5a58["x"] + _0x2f48cb });
            }
          }
        }
        _0x3a2eae["forEach"]((_0x1ed559) => {
          _0x1ed559["length"] > 1 && _0x1ed559["some"]((_0x136be6) => _0x136be6["isSelf"]) && _0x1ad926["push"](..._0x1ed559);
        }), this["gapVerticalList"] = _0x1ad926;
      }
      this["drawGap"]();
    }
    ["drawGap"]() {
      const { guideGapDom: _0x1fad5f, gapHorizontalList: _0x20d65b, gapVerticalList: _0x15e2be } = this;
      let _0x5304e8 = "";
      const _0x187355 = ({ x: _0x41a6ec, y: _0x56ce40, w: _0x1f398b, h: _0x31caf4 }) => {
        return '<rect\n      x="' + _0x41a6ec + '"\n      y="' + _0x56ce40 + '"\n      width="' + _0x1f398b + '"\n      height="' + _0x31caf4 + '"\n      stroke="none"\n      fill="rgba(242, 61, 209, 0.3)"\n    />';
      };
      _0x20d65b["forEach"]((_0x324935) => {
        const { x: _0x54dbd2, y: _0x1662c1, h: _0x2e87ca, value: _0x1d1c70 } = _0x324935;
        _0x5304e8 += _0x187355(_0x324935), _0x5304e8 += ' <text x="' + (_0x54dbd2 - 16) + '" y="' + (_0x1662c1 + _0x2e87ca / 2 + 3) + '" text-anchor="right" fill="rgba(242, 61, 209)" font-size="10" style="user-select:none">' + _0x1d1c70 + "</text>\n    ";
      }), _0x15e2be["forEach"]((_0x4d0d83) => {
        const { x: _0x523718, y: _0xd5f8a1, w: _0x280619, value: _0x1b9d49 } = _0x4d0d83;
        _0x5304e8 += _0x187355(_0x4d0d83), _0x5304e8 += ' <text x="' + (_0x523718 + _0x280619 / 2) + '" y="' + (_0xd5f8a1 - 6) + '" text-anchor="middle" fill="rgba(242, 61, 209)" font-size="10" style="user-select:none">' + _0x1b9d49 + "</text>\n    ";
      }), _0x1fad5f["innerHTML"] = "<g>" + _0x5304e8 + "</g>";
    }
  }
  const getPosition = (_0x24d8b5) => {
    const { x: _0x146053, y: _0x312923, w: _0x16818e, h: _0x474868, id: _0x4d7f69 } = _0x24d8b5;
    return { "id": _0x4d7f69, "left": _0x146053, "right": _0x146053 + _0x16818e, "top": _0x312923, "bottom": _0x312923 + _0x474868, "centerX": _0x146053 + _0x16818e / 2, "centerY": _0x312923 + _0x474868 / 2, "w": _0x16818e, "h": _0x474868 };
  };
  class SelectionHandler {
    constructor(_0x2d5b01) {
      this["selectAreaDom"] = null, this["position"] = { "width": 0, "height": 0, "startX": 0, "startY": 0 }, this["editor"] = _0x2d5b01, this["initialize"]();
    }
    ["initialize"]() {
      this["initselectAreaDom"](), this["initEvent"]();
    }
    ["initEvent"]() {
      const _0x10d33a = this, { editor: _0x15c815 } = _0x10d33a, _0x261146 = _0x15c815["getEditorDom"](), { selectionBackground: _0x4a6a53, selectionBorderColor: _0xfca97f } = _0x15c815["config"];
      _0x15c815["on"]("editor:mousedown", (_0x452394) => {
        const { e: _0x9ac6c0, target: _0x56664f } = _0x452394;
        if (_0x15c815["grabing"] || _0x9ac6c0["button"] === 2) {
          _0x15c815["zoomHandler"]["zoomMoveTo"](_0x9ac6c0);
          return;
        }
        if (!_0x15c815["selection"] || _0x15c815["mode"] === "draw")
          return;
        let _0xb5890e = ![], _0x3ad0ff, _0x4435fd = ![];
        const { x: _0x3a0ad4, y: _0x25dc91 } = _0x15c815["getMousePosition"](_0x9ac6c0), _0x462271 = _0x15c815["getActiveObject"]();
        if (_0x56664f) {
          if (_0x9ac6c0["altKey"])
            _0x4435fd = !![], _0x3ad0ff = _0x15c815["getActiveObjectPositionState"](ObjectAttrsEnum["all"]), _0x15c815["objectHandler"]["multiplex"](_0x56664f)["then"](() => {
              _0x15c815["layerChange"]();
            });
          else {
            if (_0x462271 && _0x462271["id"] !== _0x56664f["id"] || !_0x462271) {
              let _0xf6bb27 = [];
              if (_0x9ac6c0["ctrlKey"] || _0x9ac6c0["metaKey"] || _0x9ac6c0["shiftKey"]) {
                const _0x31b3b1 = _0x15c815["getActiveObjects"](), _0x32fada = _0x31b3b1["findIndex"]((_0x647286) => _0x647286["id"] === _0x56664f["id"]);
                _0x32fada > -1 ? _0xf6bb27 = _0x31b3b1["slice"](0, _0x32fada)["concat"](_0x31b3b1["slice"](_0x32fada + 1)) : _0xf6bb27 = _0x31b3b1["concat"]([_0x56664f]), _0x15c815["setActiveObjects"](_0xf6bb27);
              } else
                _0x15c815["setActiveObjects"]([_0x56664f]);
            }
          }
        } else
          _0x462271 && _0x15c815["discardActiveObject"]();
        let [_0x357ab5, _0x17ad42] = [_0x3a0ad4, _0x25dc91];
        const _0x314fc6 = _0x15c815["getActiveObject"]();
        _0x314fc6 && !_0x4435fd && (_0x3ad0ff = _0x15c815["getActiveObjectPositionState"]());
        const _0x34ecb3 = _0x15c815["getPositionMap"](), _0x460b39 = (_0x4c64ff) => {
          let _0x2793eb = 0;
          const _0xb7b7c7 = (_0x21b54d) => {
            _0x21b54d["group"] && (_0x2793eb += _0x21b54d["group"]["angle"], _0xb7b7c7(_0x21b54d["group"]));
          };
          return _0xb7b7c7(_0x4c64ff), _0x2793eb;
        }, _0x26d264 = (_0x3562df) => {
          if (!_0x3562df["ctrlKey"] && _0x15c815["mode"] !== "draw") {
            const _0x5a6fcd = _0x15c815["getMousePosition"](_0x3562df);
            _0x357ab5 = _0x5a6fcd["x"], _0x17ad42 = _0x5a6fcd["y"];
            const _0x4ddfd1 = _0x15c815["getActiveObject"]();
            if (_0x4ddfd1) {
              const _0x508aac = _0x4ddfd1["locked"] || _0x314fc6["editing"] || _0x3a0ad4 === _0x357ab5 && _0x25dc91 === _0x17ad42;
              if (!_0x508aac) {
                const { a: _0x7078f1 } = _0x15c815["viewportTransform"], _0x367772 = _0x460b39(_0x4ddfd1), _0x640a45 = _0x34ecb3["get"](_0x4ddfd1["id"]);
                let [_0x2eb76, _0x5f3b2f] = [(_0x357ab5 - _0x3a0ad4) / _0x7078f1, (_0x17ad42 - _0x25dc91) / _0x7078f1];
                const { xLength: _0x341b4b, yLength: _0xbdf07a } = editorUtil["getProjection"]({ "x": _0x2eb76, "y": _0x5f3b2f }, _0x367772);
                _0x2eb76 = _0x341b4b, _0x5f3b2f = _0xbdf07a;
                if (_0x3562df["shiftKey"] || _0x3562df["altKey"]) {
                  const _0x2e3cf0 = Math["abs"](_0x2eb76) > Math["abs"](_0x5f3b2f);
                  _0x2e3cf0 ? _0x5f3b2f = 0 : _0x2eb76 = 0;
                }
                _0x4ddfd1["x"] = _0x640a45["x"] + _0x2eb76, _0x4ddfd1["y"] = _0x640a45["y"] + _0x5f3b2f, _0x4ddfd1["type"] === "activeSelection" && _0x4ddfd1["objects"]["forEach"]((_0x3aeb36) => {
                  const _0x5e1250 = _0x34ecb3["get"](_0x3aeb36["id"]);
                  _0x3aeb36["x"] = _0x5e1250["x"] + _0x2eb76, _0x3aeb36["y"] = _0x5e1250["y"] + _0x5f3b2f;
                }), _0x15c815["zoomHandler"]["setHighPerformance"](!![]), _0x15c815["fire"]("object:moving", { "e": _0x3562df, "target": _0x4ddfd1 }), _0x4ddfd1["updateControlsPosition"]();
              }
            } else {
              if (!_0x15c815["group"]) {
                const [_0x469f1e, _0x186468] = [Math["abs"](_0x3a0ad4 - _0x357ab5), Math["abs"](_0x25dc91 - _0x17ad42)];
                if (_0x469f1e > 5 || _0x186468 > 5) {
                  const _0x234024 = { "x": (_0x3a0ad4 + _0x357ab5) / 2, "y": (_0x25dc91 + _0x17ad42) / 2 }, [_0x223a78, _0x4a136b] = [_0x234024["x"] - _0x469f1e / 2, _0x234024["y"] - _0x186468 / 2];
                  _0x10d33a["position"] = { "startX": _0x223a78, "startY": _0x4a136b, "width": _0x469f1e, "height": _0x186468 }, _0xb5890e = !![], _0x10d33a["selectAreaDom"]["innerHTML"] = '\n            <path\n              fill="' + (_0x4a6a53 || "rgba(44, 131, 251, 0.1)") + '"\n              stroke="' + (_0xfca97f || "rgba(44, 131, 251, 1)") + '"\n              d="M ' + _0x223a78 + "," + _0x4a136b + "\n              L " + _0x223a78 + "," + (_0x4a136b + _0x186468) + "\n              L " + (_0x223a78 + _0x469f1e) + "," + (_0x4a136b + _0x186468) + "\n              L " + (_0x223a78 + _0x469f1e) + "," + _0x4a136b + ' Z"\n              style="stroke-width: 1;"\n            />\n          ';
                }
              }
            }
          }
        }, _0x1888b8 = (_0x84266b) => {
          if (_0x15c815["mode"] !== "draw") {
            if (_0xb5890e) {
              const _0x5acbb = inverse(_0x15c815["viewportTransform"]), { startX: _0x180de9, startY: _0x540b15, width: _0x497e59, height: _0x3196fd } = _0x10d33a["position"], _0xe78bf0 = applyToPoint(_0x5acbb, { "x": _0x180de9, "y": _0x540b15 }), _0x5c3316 = applyToPoint(_0x5acbb, { "x": _0x180de9 + _0x497e59, "y": _0x540b15 + _0x3196fd }), _0x3f898a = { "x": _0xe78bf0["x"], "y": _0xe78bf0["y"], "w": _0x5c3316["x"] - _0xe78bf0["x"], "h": _0x5c3316["y"] - _0xe78bf0["y"] }, _0x33d5d5 = _0x15c815["getIntersectObjs"](_0x3f898a, _0x15c815["objects"]);
              _0x15c815["setActiveObjects"](_0x33d5d5);
            }
            _0x10d33a["position"]["width"] = 0, _0x10d33a["position"]["height"] = 0, _0x10d33a["selectAreaDom"]["innerHTML"] = null;
            if (!_0xb5890e && (_0x357ab5 !== _0x3a0ad4 || _0x17ad42 !== _0x25dc91)) {
              const _0x5d57df = _0x15c815["getActiveObject"]();
              _0x5d57df && !_0x5d57df["editing"] && (_0x15c815["zoomHandler"]["setHighPerformance"](![]), _0x15c815["fire"]("object:move:end", { "e": _0x84266b, "target": _0x5d57df }), _0x3ad0ff && (_0x4435fd ? _0x15c815["historyHandler"]["store"]({ "type": HistoryTypesEnum["add"], "from": _0x3ad0ff, "to": _0x15c815["getActiveObjectPositionState"](ObjectAttrsEnum["all"]) }) : _0x15c815["historyHandler"]["store"]({ "type": HistoryTypesEnum["attrs"], "from": _0x3ad0ff, "to": _0x15c815["getActiveObjectPositionState"]() })));
            }
          }
          document["removeEventListener"]("mousemove", _0x26d264), document["removeEventListener"]("mouseup", _0x1888b8);
        };
        document["addEventListener"]("mousemove", _0x26d264), document["addEventListener"]("mouseup", _0x1888b8);
      }), _0x261146["addEventListener"]("dblclick", (_0x3432b4) => {
        const _0x48d993 = _0x15c815["findTarget"](_0x3432b4);
        if (_0x48d993 && _0x48d993["type"] === "group") {
          _0x15c815["group"] = _0x48d993;
          const _0x1f4490 = _0x15c815["findTarget"](_0x3432b4);
          _0x1f4490 ? _0x15c815["setActiveObjects"]([_0x1f4490]) : _0x15c815["discardActiveObject"]();
        } else {
          if (_0x48d993 && !_0x3432b4["ctrlKey"])
            _0x48d993["emitter"]["emit"]("dblclick", { "e": _0x3432b4 }), _0x48d993["updateControlsPosition"]();
          else
            !_0x48d993 && _0x15c815["group"] && _0x15c815["shortcutHandler"]["handleEsc"]();
        }
      }), _0x261146["addEventListener"]("contextmenu", (_0x9a4ebb) => {
        let _0x52ee98 = _0x15c815["findTarget"](_0x9a4ebb, !![]);
        const _0x3e555d = _0x52ee98 && _0x52ee98["type"] === "activeSelection" ? _0x52ee98["objects"] : [_0x52ee98];
        _0x15c815["setActiveObjects"](_0x3e555d), _0x15c815["fire"]("mouse:contextmenu", { "e": _0x9a4ebb, "target": _0x52ee98 });
      });
    }
    ["initselectAreaDom"]() {
      const { editor: _0x2000fc } = this, _0x3c13f5 = editorUtil["createSvgElement"]("svg", {}, { "pointerEvents": "none", "position": "absolute", "width": "100%", "height": "100%", "left": "0px", "top": "0px", "overflow": "visible" });
      this["selectAreaDom"] = _0x3c13f5;
      const _0x32e037 = _0x2000fc["overLayer"];
      _0x32e037["appendChild"](this["selectAreaDom"]);
    }
  }
  var mousetrap = { exports: {} };
  (function(module2) {
    (function(window2, document2, undefined$1) {
      if (!window2) {
        return;
      }
      var _MAP = {
        8: "backspace",
        9: "tab",
        13: "enter",
        16: "shift",
        17: "ctrl",
        18: "alt",
        20: "capslock",
        27: "esc",
        32: "space",
        33: "pageup",
        34: "pagedown",
        35: "end",
        36: "home",
        37: "left",
        38: "up",
        39: "right",
        40: "down",
        45: "ins",
        46: "del",
        91: "meta",
        93: "meta",
        224: "meta"
      };
      var _KEYCODE_MAP = {
        106: "*",
        107: "+",
        109: "-",
        110: ".",
        111: "/",
        186: ";",
        187: "=",
        188: ",",
        189: "-",
        190: ".",
        191: "/",
        192: "`",
        219: "[",
        220: "\\",
        221: "]",
        222: "'"
      };
      var _SHIFT_MAP = {
        "~": "`",
        "!": "1",
        "@": "2",
        "#": "3",
        "$": "4",
        "%": "5",
        "^": "6",
        "&": "7",
        "*": "8",
        "(": "9",
        ")": "0",
        "_": "-",
        "+": "=",
        ":": ";",
        '"': "'",
        "<": ",",
        ">": ".",
        "?": "/",
        "|": "\\"
      };
      var _SPECIAL_ALIASES = {
        "option": "alt",
        "command": "meta",
        "return": "enter",
        "escape": "esc",
        "plus": "+",
        "mod": /Mac|iPod|iPhone|iPad/.test(navigator.platform) ? "meta" : "ctrl"
      };
      var _REVERSE_MAP;
      for (var i = 1; i < 20; ++i) {
        _MAP[111 + i] = "f" + i;
      }
      for (i = 0; i <= 9; ++i) {
        _MAP[i + 96] = i.toString();
      }
      function _addEvent(object, type, callback) {
        if (object.addEventListener) {
          object.addEventListener(type, callback, false);
          return;
        }
        object.attachEvent("on" + type, callback);
      }
      function _characterFromEvent(e) {
        if (e.type == "keypress") {
          var character = String.fromCharCode(e.which);
          if (!e.shiftKey) {
            character = character.toLowerCase();
          }
          return character;
        }
        if (_MAP[e.which]) {
          return _MAP[e.which];
        }
        if (_KEYCODE_MAP[e.which]) {
          return _KEYCODE_MAP[e.which];
        }
        return String.fromCharCode(e.which).toLowerCase();
      }
      function _modifiersMatch(modifiers1, modifiers2) {
        return modifiers1.sort().join(",") === modifiers2.sort().join(",");
      }
      function _eventModifiers(e) {
        var modifiers = [];
        if (e.shiftKey) {
          modifiers.push("shift");
        }
        if (e.altKey) {
          modifiers.push("alt");
        }
        if (e.ctrlKey) {
          modifiers.push("ctrl");
        }
        if (e.metaKey) {
          modifiers.push("meta");
        }
        return modifiers;
      }
      function _preventDefault(e) {
        if (e.preventDefault) {
          e.preventDefault();
          return;
        }
        e.returnValue = false;
      }
      function _stopPropagation(e) {
        if (e.stopPropagation) {
          e.stopPropagation();
          return;
        }
        e.cancelBubble = true;
      }
      function _isModifier(key) {
        return key == "shift" || key == "ctrl" || key == "alt" || key == "meta";
      }
      function _getReverseMap() {
        if (!_REVERSE_MAP) {
          _REVERSE_MAP = {};
          for (var key in _MAP) {
            if (key > 95 && key < 112) {
              continue;
            }
            if (_MAP.hasOwnProperty(key)) {
              _REVERSE_MAP[_MAP[key]] = key;
            }
          }
        }
        return _REVERSE_MAP;
      }
      function _pickBestAction(key, modifiers, action) {
        if (!action) {
          action = _getReverseMap()[key] ? "keydown" : "keypress";
        }
        if (action == "keypress" && modifiers.length) {
          action = "keydown";
        }
        return action;
      }
      function _keysFromString(combination) {
        if (combination === "+") {
          return ["+"];
        }
        combination = combination.replace(/\+{2}/g, "+plus");
        return combination.split("+");
      }
      function _getKeyInfo(combination, action) {
        var keys2;
        var key;
        var i2;
        var modifiers = [];
        keys2 = _keysFromString(combination);
        for (i2 = 0; i2 < keys2.length; ++i2) {
          key = keys2[i2];
          if (_SPECIAL_ALIASES[key]) {
            key = _SPECIAL_ALIASES[key];
          }
          if (action && action != "keypress" && _SHIFT_MAP[key]) {
            key = _SHIFT_MAP[key];
            modifiers.push("shift");
          }
          if (_isModifier(key)) {
            modifiers.push(key);
          }
        }
        action = _pickBestAction(key, modifiers, action);
        return {
          key,
          modifiers,
          action
        };
      }
      function _belongsTo(element, ancestor) {
        if (element === null || element === document2) {
          return false;
        }
        if (element === ancestor) {
          return true;
        }
        return _belongsTo(element.parentNode, ancestor);
      }
      function Mousetrap(targetElement) {
        var self2 = this;
        targetElement = targetElement || document2;
        if (!(self2 instanceof Mousetrap)) {
          return new Mousetrap(targetElement);
        }
        self2.target = targetElement;
        self2._callbacks = {};
        self2._directMap = {};
        var _sequenceLevels = {};
        var _resetTimer;
        var _ignoreNextKeyup = false;
        var _ignoreNextKeypress = false;
        var _nextExpectedAction = false;
        function _resetSequences(doNotReset) {
          doNotReset = doNotReset || {};
          var activeSequences = false, key;
          for (key in _sequenceLevels) {
            if (doNotReset[key]) {
              activeSequences = true;
              continue;
            }
            _sequenceLevels[key] = 0;
          }
          if (!activeSequences) {
            _nextExpectedAction = false;
          }
        }
        function _getMatches(character, modifiers, e, sequenceName, combination, level) {
          var i2;
          var callback;
          var matches = [];
          var action = e.type;
          if (!self2._callbacks[character]) {
            return [];
          }
          if (action == "keyup" && _isModifier(character)) {
            modifiers = [character];
          }
          for (i2 = 0; i2 < self2._callbacks[character].length; ++i2) {
            callback = self2._callbacks[character][i2];
            if (!sequenceName && callback.seq && _sequenceLevels[callback.seq] != callback.level) {
              continue;
            }
            if (action != callback.action) {
              continue;
            }
            if (action == "keypress" && !e.metaKey && !e.ctrlKey || _modifiersMatch(modifiers, callback.modifiers)) {
              var deleteCombo = !sequenceName && callback.combo == combination;
              var deleteSequence = sequenceName && callback.seq == sequenceName && callback.level == level;
              if (deleteCombo || deleteSequence) {
                self2._callbacks[character].splice(i2, 1);
              }
              matches.push(callback);
            }
          }
          return matches;
        }
        function _fireCallback(callback, e, combo, sequence) {
          if (self2.stopCallback(e, e.target || e.srcElement, combo, sequence)) {
            return;
          }
          if (callback(e, combo) === false) {
            _preventDefault(e);
            _stopPropagation(e);
          }
        }
        self2._handleKey = function(character, modifiers, e) {
          var callbacks = _getMatches(character, modifiers, e);
          var i2;
          var doNotReset = {};
          var maxLevel = 0;
          var processedSequenceCallback = false;
          for (i2 = 0; i2 < callbacks.length; ++i2) {
            if (callbacks[i2].seq) {
              maxLevel = Math.max(maxLevel, callbacks[i2].level);
            }
          }
          for (i2 = 0; i2 < callbacks.length; ++i2) {
            if (callbacks[i2].seq) {
              if (callbacks[i2].level != maxLevel) {
                continue;
              }
              processedSequenceCallback = true;
              doNotReset[callbacks[i2].seq] = 1;
              _fireCallback(callbacks[i2].callback, e, callbacks[i2].combo, callbacks[i2].seq);
              continue;
            }
            if (!processedSequenceCallback) {
              _fireCallback(callbacks[i2].callback, e, callbacks[i2].combo);
            }
          }
          var ignoreThisKeypress = e.type == "keypress" && _ignoreNextKeypress;
          if (e.type == _nextExpectedAction && !_isModifier(character) && !ignoreThisKeypress) {
            _resetSequences(doNotReset);
          }
          _ignoreNextKeypress = processedSequenceCallback && e.type == "keydown";
        };
        function _handleKeyEvent(e) {
          if (typeof e.which !== "number") {
            e.which = e.keyCode;
          }
          var character = _characterFromEvent(e);
          if (!character) {
            return;
          }
          if (e.type == "keyup" && _ignoreNextKeyup === character) {
            _ignoreNextKeyup = false;
            return;
          }
          self2.handleKey(character, _eventModifiers(e), e);
        }
        function _resetSequenceTimer() {
          clearTimeout(_resetTimer);
          _resetTimer = setTimeout(_resetSequences, 1e3);
        }
        function _bindSequence(combo, keys2, callback, action) {
          _sequenceLevels[combo] = 0;
          function _increaseSequence(nextAction) {
            return function() {
              _nextExpectedAction = nextAction;
              ++_sequenceLevels[combo];
              _resetSequenceTimer();
            };
          }
          function _callbackAndReset(e) {
            _fireCallback(callback, e, combo);
            if (action !== "keyup") {
              _ignoreNextKeyup = _characterFromEvent(e);
            }
            setTimeout(_resetSequences, 10);
          }
          for (var i2 = 0; i2 < keys2.length; ++i2) {
            var isFinal = i2 + 1 === keys2.length;
            var wrappedCallback = isFinal ? _callbackAndReset : _increaseSequence(action || _getKeyInfo(keys2[i2 + 1]).action);
            _bindSingle(keys2[i2], wrappedCallback, action, combo, i2);
          }
        }
        function _bindSingle(combination, callback, action, sequenceName, level) {
          self2._directMap[combination + ":" + action] = callback;
          combination = combination.replace(/\s+/g, " ");
          var sequence = combination.split(" ");
          var info;
          if (sequence.length > 1) {
            _bindSequence(combination, sequence, callback, action);
            return;
          }
          info = _getKeyInfo(combination, action);
          self2._callbacks[info.key] = self2._callbacks[info.key] || [];
          _getMatches(info.key, info.modifiers, { type: info.action }, sequenceName, combination, level);
          self2._callbacks[info.key][sequenceName ? "unshift" : "push"]({
            callback,
            modifiers: info.modifiers,
            action: info.action,
            seq: sequenceName,
            level,
            combo: combination
          });
        }
        self2._bindMultiple = function(combinations, callback, action) {
          for (var i2 = 0; i2 < combinations.length; ++i2) {
            _bindSingle(combinations[i2], callback, action);
          }
        };
        _addEvent(targetElement, "keypress", _handleKeyEvent);
        _addEvent(targetElement, "keydown", _handleKeyEvent);
        _addEvent(targetElement, "keyup", _handleKeyEvent);
      }
      Mousetrap.prototype.bind = function(keys2, callback, action) {
        var self2 = this;
        keys2 = keys2 instanceof Array ? keys2 : [keys2];
        self2._bindMultiple.call(self2, keys2, callback, action);
        return self2;
      };
      Mousetrap.prototype.unbind = function(keys2, action) {
        var self2 = this;
        return self2.bind.call(self2, keys2, function() {
        }, action);
      };
      Mousetrap.prototype.trigger = function(keys2, action) {
        var self2 = this;
        if (self2._directMap[keys2 + ":" + action]) {
          self2._directMap[keys2 + ":" + action]({}, keys2);
        }
        return self2;
      };
      Mousetrap.prototype.reset = function() {
        var self2 = this;
        self2._callbacks = {};
        self2._directMap = {};
        return self2;
      };
      Mousetrap.prototype.stopCallback = function(e, element) {
        var self2 = this;
        if ((" " + element.className + " ").indexOf(" mousetrap ") > -1) {
          return false;
        }
        if (_belongsTo(element, self2.target)) {
          return false;
        }
        if ("composedPath" in e && typeof e.composedPath === "function") {
          var initialEventTarget = e.composedPath()[0];
          if (initialEventTarget !== e.target) {
            element = initialEventTarget;
          }
        }
        return element.tagName == "INPUT" || element.tagName == "SELECT" || element.tagName == "TEXTAREA" || element.isContentEditable;
      };
      Mousetrap.prototype.handleKey = function() {
        var self2 = this;
        return self2._handleKey.apply(self2, arguments);
      };
      Mousetrap.addKeycodes = function(object) {
        for (var key in object) {
          if (object.hasOwnProperty(key)) {
            _MAP[key] = object[key];
          }
        }
        _REVERSE_MAP = null;
      };
      Mousetrap.init = function() {
        var documentMousetrap = Mousetrap(document2);
        for (var method in documentMousetrap) {
          if (method.charAt(0) !== "_") {
            Mousetrap[method] = /* @__PURE__ */ function(method2) {
              return function() {
                return documentMousetrap[method2].apply(documentMousetrap, arguments);
              };
            }(method);
          }
        }
      };
      Mousetrap.init();
      window2.Mousetrap = Mousetrap;
      if (module2.exports) {
        module2.exports = Mousetrap;
      }
      if (typeof undefined$1 === "function" && undefined$1.amd) {
        undefined$1(function() {
          return Mousetrap;
        });
      }
    })(typeof window !== "undefined" ? window : null, typeof window !== "undefined" ? document : null);
  })(mousetrap);
  var mousetrapExports = mousetrap.exports;
  const _0x56be68 = /* @__PURE__ */ getDefaultExportFromCjs(mousetrapExports);
  var operationTypes = ((_0x1b9106) => {
    return _0x1b9106["selectAll"] = "selectAll", _0x1b9106["group"] = "group", _0x1b9106["ungroup"] = "ungroup", _0x1b9106["arrowLeft"] = "arrowLeft", _0x1b9106["arrowRight"] = "arrowRight", _0x1b9106["arrowUp"] = "arrowUp", _0x1b9106["arrowDown"] = "arrowDown", _0x1b9106["copy"] = "copy", _0x1b9106["paste"] = "paste", _0x1b9106["cut"] = "cut", _0x1b9106["reuse"] = "reuse", _0x1b9106["esc"] = "esc", _0x1b9106["add"] = "add", _0x1b9106["delete"] = "delete", _0x1b9106["bringForward"] = "bringForward", _0x1b9106["sendBackwards"] = "sendBackwards", _0x1b9106["bringToFront"] = "bringToFront", _0x1b9106["sendToBack"] = "sendToBack", _0x1b9106["undo"] = "undo", _0x1b9106["redo"] = "redo", _0x1b9106["align"] = "align", _0x1b9106["lock"] = "lock", _0x1b9106["unlock"] = "unlock", _0x1b9106["visible"] = "visible", _0x1b9106["attribute"] = "attribute", _0x1b9106["updateLayer"] = "updateLayer", _0x1b9106["setZoom"] = "setZoom", _0x1b9106["zoomToFit"] = "zoomToFit", _0x1b9106["editorConfig"] = "editorConfig", _0x1b9106["discard"] = "discard", _0x1b9106["zoomIn"] = "zoomIn", _0x1b9106["zoomOut"] = "zoomOut", _0x1b9106["zoomToReset"] = "zoomToReset", _0x1b9106["alignEqual"] = "alignEqual", _0x1b9106["setSelection"] = "setSelection", _0x1b9106;
  })(operationTypes || {});
  class ShortcutHandler {
    constructor(_0xe2a94b) {
      this["editor"] = _0xe2a94b, this["initEvent"]();
    }
    ["initEvent"]() {
      const _0x564f5b = this, _0x48ab6f = [{ "repeat": ![], "shortcut": "mod+c", "method": this["handleCopy"], "preventDefault": ![], "params": [] }, { "repeat": ![], "shortcut": "mod+v", "method": this["handlePaste"], "preventDefault": ![], "params": [] }, { "repeat": ![], "shortcut": "mod+x", "method": this["handleCut"], "preventDefault": ![], "params": [] }, { "repeat": ![], "shortcut": "mod+z", "method": this["handleUndo"], "preventDefault": !![], "params": [] }, { "repeat": ![], "shortcut": "mod+y", "method": this["handleRedo"], "preventDefault": !![], "params": [] }, { "repeat": ![], "shortcut": "mod+a", "method": this["handleSelectAll"], "preventDefault": !![], "params": [] }, { "repeat": ![], "shortcut": "mod+g", "method": this["handleGroup"], "preventDefault": !![], "params": [] }, { "repeat": ![], "shortcut": "mod+shift+g", "method": this["handleUngroup"], "preventDefault": !![], "params": [] }, { "repeat": ![], "shortcut": "mod+l", "method": this["handleLock"], "preventDefault": !![], "params": [!![]] }, { "repeat": ![], "shortcut": "mod+shift+l", "method": this["handleLock"], "preventDefault": !![], "params": [![]] }, { "repeat": !![], "shortcut": "left", "method": this["handleShortcutPosition"], "preventDefault": !![], "params": ["x", -1] }, { "repeat": !![], "shortcut": "shift+left", "method": this["handleShortcutPosition"], "preventDefault": !![], "params": ["x", -10] }, { "repeat": !![], "shortcut": "right", "method": this["handleShortcutPosition"], "preventDefault": !![], "params": ["x", 1] }, { "repeat": !![], "shortcut": "shift+right", "method": this["handleShortcutPosition"], "preventDefault": !![], "params": ["x", 10] }, { "repeat": !![], "shortcut": "up", "method": this["handleShortcutPosition"], "preventDefault": !![], "params": ["y", -1] }, { "repeat": !![], "shortcut": "shift+up", "method": this["handleShortcutPosition"], "preventDefault": !![], "params": ["y", -10] }, { "repeat": !![], "shortcut": "down", "method": this["handleShortcutPosition"], "preventDefault": !![], "params": ["y", 1] }, { "repeat": !![], "shortcut": "shift+down", "method": this["handleShortcutPosition"], "preventDefault": !![], "params": ["y", 10] }, { "repeat": ![], "shortcut": "mod+e", "method": this["handleReuse"], "preventDefault": !![], "params": [] }, { "repeat": ![], "shortcut": "mod+d", "method": this["handleDiscard"], "preventDefault": !![], "params": [] }, { "repeat": ![], "shortcut": "mod+h", "method": this["handleVisible"], "preventDefault": !![], "params": [![]] }, { "repeat": ![], "shortcut": "mod+shift+h", "method": this["handleVisible"], "preventDefault": !![], "params": [!![]] }, { "repeat": ![], "shortcut": ["mod++", "mod+="], "method": this["handleSetZoom"], "preventDefault": !![], "params": [{ "type": "zoomIn" }] }, { "repeat": ![], "shortcut": "mod+-", "method": this["handleSetZoom"], "preventDefault": !![], "params": [{ "type": "zoomOut" }] }, { "repeat": ![], "shortcut": "mod+1", "method": this["handleSetZoom"], "preventDefault": !![], "params": [{ "type": "fitView" }] }, { "repeat": ![], "shortcut": "mod+0", "method": this["handleSetZoom"], "preventDefault": !![], "params": [{ "type": "reset" }] }, { "repeat": ![], "shortcut": ["del", "backspace"], "method": this["handleDelete"], "preventDefault": !![], "params": [] }, { "repeat": ![], "shortcut": "mod+alt+up", "method": this["handleLayer"], "preventDefault": !![], "params": ["bringForward"] }, { "repeat": ![], "shortcut": "mod+alt+down", "method": this["handleLayer"], "preventDefault": !![], "params": ["sendBackwards"] }, { "repeat": ![], "shortcut": "mod+shift+up", "method": this["handleLayer"], "preventDefault": !![], "params": ["bringToFront"] }, { "repeat": ![], "shortcut": "mod+shift+down", "method": this["handleLayer"], "preventDefault": !![], "params": ["sendToBack"] }, { "repeat": ![], "shortcut": "esc", "method": this["handleEsc"], "preventDefault": !![], "params": [] }];
      let _0x293945;
      _0x48ab6f["forEach"]((_0x5cb5a3) => {
        const { repeat: _0x5ceef8, shortcut: _0x59dda2, method: _0x5dd6fd, preventDefault: _0xe3f6ba, params = [] } = _0x5cb5a3;
        _0x56be68["bind"](_0x59dda2, function(_0x368add) {
          const _0x893b4a = _0x293945 === _0x59dda2 && !_0x5ceef8;
          if (_0x893b4a)
            return;
          _0xe3f6ba && _0x368add["preventDefault"](), _0x293945 = _0x59dda2, _0x5dd6fd["apply"](_0x564f5b, params);
        }, "keydown");
      }), document["addEventListener"]("keyup", (_0x243aab) => {
        const _0x2b3505 = _0x48ab6f["find"]((_0x409978) => _0x409978["shortcut"] === _0x293945);
        _0x2b3505 && _0x2b3505["repeat"] && _0x2b3505["method"]["apply"](_0x564f5b, [..._0x2b3505["params"], !![]]), _0x293945 = "";
      });
    }
    ["handleOperation"]({ action: _0x5febdc, param: _0x4a1f71, value: _0x683310 }) {
      switch (_0x5febdc) {
        case "selectAll":
          this["handleSelectAll"]();
          break;
        case "group":
          this["handleGroup"]();
          break;
        case "ungroup":
          this["handleUngroup"]();
          break;
        case "arrowLeft":
        case "arrowRight":
          this["handleMoveHorizontal"](_0x4a1f71);
          break;
        case "arrowUp":
        case "arrowDown":
          this["handleMoveVertical"](_0x4a1f71);
          break;
        case "copy":
          this["handleCopy"]();
          break;
        case "paste":
          this["handlePaste"](_0x4a1f71);
          break;
        case "cut":
          this["handleCut"]();
          break;
        case "reuse":
          this["handleReuse"]();
          break;
        case "esc":
          this["handleEsc"]();
          break;
        case "add":
          this["handleAddObject"](_0x4a1f71);
          break;
        case "delete":
          this["handleDelete"]();
          break;
        case "bringForward":
        case "sendBackwards":
        case "bringToFront":
        case "sendToBack":
          this["handleLayer"](_0x5febdc);
          break;
        case "undo":
          this["handleUndo"]();
          break;
        case "redo":
          this["handleRedo"]();
          break;
        case "align":
          this["handleAlign"](_0x4a1f71);
          break;
        case "lock":
          this["handleLock"](!![]);
          break;
        case "unlock":
          this["handleLock"](![]);
          break;
        case "attribute":
          this["handleAttribute"](_0x4a1f71);
          break;
        case "updateLayer":
          this["handleUpdateLayer"](_0x4a1f71);
          break;
        case "setZoom":
          this["handleSetZoom"](_0x4a1f71);
          break;
        case "zoomToFit":
          this["handleZoomToFit"]();
          break;
        case "editorConfig":
          this["handleEditorConfig"](_0x4a1f71);
          break;
        case "visible":
          this["handleVisible"](_0x4a1f71);
          break;
        case "alignEqual":
          this["handleAlignEqual"](_0x4a1f71, _0x683310);
          break;
        case "setSelection":
          this["handleSetSelection"](_0x4a1f71);
          break;
      }
    }
    ["handleLock"](_0x5d5f6b) {
      const { editor: _0x53e0cc } = this, _0x39d46b = _0x53e0cc["getActiveObjects"](), _0x44480d = _0x53e0cc["getActiveSelectionPosition"]();
      let _0x2523d4 = [], _0x34703d = [];
      _0x39d46b["forEach"]((_0xfa86b6) => {
        const { id: _0x3eafaf } = _0xfa86b6;
        _0x2523d4["push"]({ "data": { "id": _0x3eafaf, "locked": _0x5d5f6b } }), _0x34703d["push"]({ "data": { "id": _0x3eafaf, "locked": !_0x5d5f6b } });
      });
      const _0x58c0ce = { "type": HistoryTypesEnum["attrs"], "to": { "activeSelection": _0x44480d, "data": _0x2523d4 }, "from": { "activeSelection": _0x44480d, "data": _0x34703d } };
      this["handleAttribute"](_0x58c0ce);
    }
    ["handleUndo"]() {
      const { editor: _0x47a75d } = this;
      _0x47a75d["historyHandler"]["undo"]();
    }
    ["handleRedo"]() {
      const { editor: _0x2d38a3 } = this;
      _0x2d38a3["historyHandler"]["redo"]();
    }
    ["handleLayer"](_0x40c0a9) {
      const { editor: _0x3161c7 } = this, _0x5bc002 = _0x3161c7["getActiveObjects"]();
      if (_0x5bc002["length"]) {
        const _0x5017f1 = _0x5bc002[0], _0x24a546 = _0x5017f1["group"] || _0x3161c7, _0x5ebe4d = _0x5017f1["group"] ? _0x5017f1["group"]["id"] : "", _0x4a7db1 = _0x24a546["objects"]["length"];
        if (_0x5bc002["some"]((_0x6487c7) => {
          const _0x1255b1 = _0x6487c7["group"] ? _0x6487c7["group"]["id"] : "";
          return _0x5ebe4d !== _0x1255b1;
        }))
          return editorUtil["logError"]("can not operate different group object");
        if (_0x4a7db1 === _0x5bc002["length"])
          return editorUtil["logError"]("dont operate all object in same level");
        const _0x2f3272 = _0x3161c7["getObjectsParentRelationship"](_0x5bc002);
        _0x2f3272["sort"]((_0x2362b8, _0x2b9a6b) => _0x2362b8["path"] - _0x2b9a6b["path"]);
        const _0x10d1be = _0x2f3272[0]["index"];
        let _0x5a5ff2 = 0;
        switch (_0x40c0a9) {
          case "bringForward":
            _0x5a5ff2 = _0x10d1be + _0x2f3272["length"] + 1;
            if (_0x5a5ff2 > _0x4a7db1)
              return;
            break;
          case "sendBackwards":
            _0x5a5ff2 = _0x10d1be - 1;
            if (_0x5a5ff2 < 0)
              return;
            break;
          case "bringToFront":
            _0x5a5ff2 = _0x4a7db1;
            break;
          case "sendToBack":
            _0x5a5ff2 = 0;
            break;
        }
        const _0x30ca20 = { "idList": _0x5bc002["map"]((_0x15d70b) => _0x15d70b["id"]), "parentId": _0x5ebe4d, "index": _0x5a5ff2 };
        this["handleUpdateLayer"](_0x30ca20);
      }
    }
    ["handleDelete"]() {
      const { editor: _0x43a955 } = this, _0x41dc22 = _0x43a955["getActiveObjects"](), _0x5ad071 = _0x43a955["getActiveObject"]();
      let _0x507f85 = ![];
      _0x5ad071 && _0x5ad071["controls"] && _0x5ad071["controls"]["deleteActiveControlPoint"] && (_0x507f85 = _0x5ad071["controls"]["deleteActiveControlPoint"]());
      if (!_0x507f85) {
        if (_0x41dc22["length"]) {
          const _0x38b6c0 = _0x43a955["getActiveObjectPositionState"](ObjectAttrsEnum["all"]);
          _0x43a955["objectHandler"]["remove"](_0x41dc22), _0x43a955["historyHandler"]["store"]({ "type": HistoryTypesEnum["delete"], "from": _0x38b6c0, "to": { "activeSelection": null, "data": [] } }), _0x43a955["layerChange"]();
        }
      }
    }
    ["handleEsc"]() {
      const { editor: _0x81e6c } = this;
      if (_0x81e6c["group"]) {
        const { group: _0x24e271 } = _0x81e6c, { x: _0x103289, y: _0x19b73f, w: _0x46a794, h: _0x223b83, angle: _0x574ee2 } = _0x81e6c["calcGroupPositionBySubs"](_0x24e271);
        let [_0xb7ee94, _0x557413] = [_0x24e271["x"] - _0x103289, _0x24e271["y"] - _0x19b73f];
        const _0x54e0c9 = { "x": _0x24e271["x"], "y": _0x24e271["y"] }, _0x51127f = { "x": _0x24e271["x"] + _0x24e271["w"] / 2, "y": _0x24e271["y"] + _0x24e271["h"] / 2 }, _0x2b98a0 = { "x": _0x103289 + _0x46a794 / 2, "y": _0x19b73f + _0x223b83 / 2 }, _0x3f33da = { "x": _0x103289, "y": _0x19b73f }, _0xc2f307 = editorUtil["rotatePoint"](_0x54e0c9, _0x51127f, _0x574ee2), _0x31c216 = editorUtil["rotatePoint"](_0x3f33da, _0x2b98a0, _0x574ee2);
        _0xb7ee94 = _0xc2f307["x"] - _0x31c216["x"], _0x557413 = _0xc2f307["y"] - _0x31c216["y"];
        const { xLength: _0x16e913, yLength: _0x10b0e8 } = editorUtil["getProjection"]({ "x": _0xb7ee94, "y": _0x557413 }, _0x574ee2);
        _0xb7ee94 = _0x16e913, _0x557413 = _0x10b0e8, _0x24e271["objects"]["forEach"]((_0x2b7717) => {
          _0x2b7717["x"] += _0xb7ee94, _0x2b7717["y"] += _0x557413;
        }), _0x24e271["x"] = _0x103289, _0x24e271["y"] = _0x19b73f, _0x24e271["w"] = _0x46a794, _0x24e271["h"] = _0x223b83, _0x24e271["angle"] = _0x574ee2, _0x81e6c["group"] = _0x24e271["group"] || null, _0x81e6c["setActiveObjects"]([_0x24e271]);
      }
    }
    ["handleCopy"]() {
      const { editor: _0x5ae37b } = this;
      _0x5ae37b["objectHandler"]["copy"](![]);
    }
    ["handleCut"]() {
      const { editor: _0x37a41b } = this, _0x5d4a7d = _0x37a41b["getActiveObjectPositionState"](ObjectAttrsEnum["all"]);
      _0x37a41b["objectHandler"]["copy"](!![])["then"](() => {
        const _0x465d69 = _0x37a41b["getActiveObjectPositionState"]();
        _0x37a41b["historyHandler"]["store"]({ "type": HistoryTypesEnum["delete"], "from": _0x5d4a7d, "to": _0x465d69 }), _0x37a41b["layerChange"]();
      });
    }
    ["handleReuse"]() {
      const { editor: _0x44827f } = this, _0x1bbdaf = _0x44827f["getActiveObject"]();
      if (_0x1bbdaf) {
        const _0x346ab2 = _0x44827f["getActiveObjectPositionState"](ObjectAttrsEnum["all"]);
        _0x44827f["objectHandler"]["multiplex"](_0x1bbdaf)["then"](() => {
          const _0x276e41 = _0x44827f["getActiveObjectPositionState"](ObjectAttrsEnum["all"]);
          _0x44827f["historyHandler"]["store"]({ "type": HistoryTypesEnum["add"], "from": _0x346ab2, "to": _0x276e41 }), _0x44827f["layerChange"]();
        });
      }
    }
    ["handlePaste"]() {
      const { editor: _0x1168c1 } = this;
      if (_0x1168c1["enableCustomPaste"])
        return;
      const _0x179d9e = _0x1168c1["getActiveObjectPositionState"](ObjectAttrsEnum["all"]);
      _0x1168c1["objectHandler"]["paste"]()["then"](() => {
        const _0x195917 = { "type": HistoryTypesEnum["add"], "from": _0x179d9e, "to": _0x1168c1["getActiveObjectPositionState"](ObjectAttrsEnum["all"]) };
        _0x1168c1["historyHandler"]["store"](_0x195917), _0x1168c1["layerChange"]();
      });
    }
    ["handleMoveHorizontal"](_0x18dc25) {
      const { editor: _0x3e90c7 } = this, _0x1a245a = _0x3e90c7["getActiveObjectPositionState"]();
      _0x3e90c7["objectHandler"]["move"]("left", _0x18dc25)["then"](() => {
        _0x3e90c7["historyHandler"]["store"]({ "type": HistoryTypesEnum["attrs"], "from": _0x1a245a, "to": _0x3e90c7["getActiveObjectPositionState"]() });
      });
    }
    ["handleMoveVertical"](_0x26d86f) {
      const { editor: _0x11b59a } = this, _0xf4ecc7 = _0x11b59a["getActiveObjectPositionState"]();
      _0x11b59a["objectHandler"]["move"]("top", _0x26d86f)["then"](() => {
        _0x11b59a["historyHandler"]["store"]({ "type": HistoryTypesEnum["attrs"], "from": _0xf4ecc7, "to": _0x11b59a["getActiveObjectPositionState"]() });
      });
    }
    ["handleGroup"]() {
      const { editor: _0x1b2b91 } = this, _0x451a57 = _0x1b2b91["getActiveObjectPositionState"](ObjectAttrsEnum["all"]);
      _0x1b2b91["objectHandler"]["group"]()["then"](() => {
        _0x1b2b91["historyHandler"]["store"]({ "type": HistoryTypesEnum["inversion"], "from": _0x451a57, "to": _0x1b2b91["getActiveObjectPositionState"](ObjectAttrsEnum["all"]) }), _0x1b2b91["layerChange"]();
      });
    }
    ["handleUngroup"]() {
      const { editor: _0x1c100a } = this, _0x40a952 = _0x1c100a["getActiveObjectPositionState"](ObjectAttrsEnum["all"]);
      _0x1c100a["objectHandler"]["ungroup"]()["then"](() => {
        _0x1c100a["historyHandler"]["store"]({ "type": HistoryTypesEnum["inversion"], "from": _0x40a952, "to": _0x1c100a["getActiveObjectPositionState"](ObjectAttrsEnum["all"]) }), _0x1c100a["layerChange"]();
      });
    }
    ["handleSelectAll"]() {
      const { editor: _0x143ec5 } = this;
      let _0x5f36c6 = [];
      _0x143ec5["group"] ? _0x5f36c6 = _0x143ec5["group"]["objects"] : _0x5f36c6 = _0x143ec5["objects"]["filter"]((_0x5ae891) => !_0x5ae891["locked"] && _0x5ae891["visible"]), _0x143ec5["setActiveObjects"](_0x5f36c6);
    }
    ["handleAlign"](_0x3953b8) {
      const { editor: _0x592f39 } = this, _0x53ed0b = _0x592f39["getActiveObjectPositionState"]();
      _0x592f39["alignHandler"]["align"](_0x3953b8)["then"](() => {
        _0x592f39["historyHandler"]["store"]({ "type": HistoryTypesEnum["attrs"], "from": _0x53ed0b, "to": _0x592f39["getActiveObjectPositionState"]() });
      });
    }
    ["handleAttribute"](_0x26346a = { "from": {}, "to": {} }) {
      const { editor: _0x5d76f9 } = this, { from: _0x2fbcde, to: _0x4bf993 } = _0x26346a, _0x5c17c0 = _0x4bf993["data"]["map"]((_0x50b492) => _0x50b492["data"]);
      _0x5d76f9["objectHandler"]["attribute"](_0x5c17c0)["then"](() => {
        const _0x56f508 = _0x5c17c0[0], _0x315180 = Object["keys"](_0x56f508), _0x5e2f6b = _0x5d76f9["getActiveObject"](), _0x5131aa = ["locked", "visible"], _0x4e1338 = ["x", "y", "w", "h", "angle"];
        _0x315180["some"]((_0x34d3e0) => _0x5131aa["includes"](_0x34d3e0)) && (_0x5d76f9["layerChange"](), _0x5e2f6b["updateControlsPosition"]()), _0x315180["some"]((_0x1509cf) => _0x4e1338["includes"](_0x1509cf)) && (_0x5e2f6b["type"] === "activeSelection" && _0x5d76f9["setActiveObjects"](_0x5e2f6b["objects"])), _0x2fbcde && _0x5d76f9["historyHandler"]["store"]({ "type": HistoryTypesEnum["attrs"], "from": _0x2fbcde, "to": _0x4bf993 });
      });
    }
    ["handleUpdateLayer"]({ idList = [], parentId = "", index = 0 }) {
      const { editor: _0x2659dc } = this, _0x22e669 = parentId ? _0x2659dc["getObjectById"](parentId) : _0x2659dc, _0x582b91 = _0x2659dc["getObjectsByCondition"]((_0x4c2c56) => idList["includes"](_0x4c2c56["id"]));
      if (!_0x582b91["length"])
        return editorUtil["logError"]("no object found");
      const _0x23d673 = _0x2659dc["getObjectsParentRelationship"](_0x582b91);
      _0x23d673["sort"]((_0x3a2b8f, _0x4a3920) => _0x3a2b8f["path"] - _0x4a3920["path"]);
      let _0x217b53 = _0x23d673["reduce"]((_0xcb5d3d, _0x4cfde0) => {
        return _0xcb5d3d["push"](..._0x4cfde0["parentIdList"]), _0xcb5d3d;
      }, []);
      _0x217b53 = [...new Set(_0x217b53)];
      if (_0x217b53["some"]((_0x5b3cc4) => idList["includes"](_0x5b3cc4)))
        return editorUtil["logError"]("cannot operate parent and children at the same time");
      let _0x4dc950 = !![], _0xb6dd5a = !![];
      for (let _0x537e07 = _0x23d673["length"] - 1; _0x537e07 >= 0; _0x537e07--) {
        const _0x51ef8c = _0x23d673[_0x537e07];
        _0x51ef8c["parentId"] === parentId && _0x51ef8c["index"] < index && index--;
        _0x51ef8c["parentId"] !== parentId && (_0x4dc950 = ![]);
        if (_0x537e07 > 0) {
          const _0x304b04 = _0x23d673[_0x537e07 - 1];
          _0x51ef8c["index"] - _0x304b04["index"] !== 1 && (_0xb6dd5a = ![]);
        }
      }
      if (_0x4dc950 && _0xb6dd5a && index === _0x23d673[0]["index"])
        return editorUtil["logError"]("no need to move");
      const _0x228900 = _0x2659dc["getActiveObjectPositionState"](ObjectAttrsEnum["all"]), _0x5eb074 = _0x582b91["map"]((_0x1b6056) => {
        return __spreadValues({ "id": _0x1b6056["id"] }, _0x1b6056["getGlobalPosition"]());
      });
      _0x582b91["forEach"]((_0x20a9cf) => {
        removeObject(_0x20a9cf);
        const _0x1c2ad3 = _0x5eb074["find"]((_0x4c5d53) => _0x4c5d53["id"] === _0x20a9cf["id"]);
        Object["assign"](_0x20a9cf, _0x1c2ad3);
      });
      const _0x3affb4 = [];
      _0x582b91["forEach"]((_0x4219c6, _0x7d6314) => {
        if (_0x22e669["type"] === "group") {
          const _0x8d97bd = editorUtil["getTotalMatrix"](_0x22e669, ![], !![]);
          editorUtil["applyMatrix"](_0x4219c6, inverse(_0x8d97bd)), _0x4219c6["group"] = _0x22e669, !_0x3affb4["find"]((_0x25c2e1) => _0x25c2e1["id"] === _0x22e669["id"]) && _0x3affb4["push"](_0x22e669);
        }
        _0x22e669["objects"]["splice"](index + _0x7d6314, 0, _0x4219c6);
      }), _0x3affb4["forEach"]((_0x20e248) => {
        editorUtil["resetGroupPosition"](_0x20e248);
      }), _0x2659dc["setActiveObjects"](_0x582b91), _0x2659dc["historyHandler"]["store"]({ "type": HistoryTypesEnum["inversion"], "from": _0x228900, "to": _0x2659dc["getActiveObjectPositionState"](ObjectAttrsEnum["all"]) }), _0x2659dc["layerChange"]();
    }
    ["handleAddObject"](_0x3fafb4) {
      const { editor: _0x554ef3 } = this, _0x59656a = _0x554ef3["getActiveObjectPositionState"](ObjectAttrsEnum["all"]), _0x50771b = Array["isArray"](_0x3fafb4) ? _0x3fafb4 : [_0x3fafb4];
      _0x554ef3["add"](_0x50771b)["then"](() => {
        _0x554ef3["setActiveObjects"](_0x50771b), _0x554ef3["historyHandler"]["store"]({ "type": HistoryTypesEnum["add"], "from": _0x59656a, "to": _0x554ef3["getActiveObjectPositionState"](ObjectAttrsEnum["all"]) }), _0x554ef3["layerChange"]();
      });
    }
    ["handleSetZoom"](_0x29c283) {
      const { editor: _0x421f87 } = this;
      _0x421f87["zoomHandler"]["setZoom"](_0x29c283);
    }
    ["handleZoomToFit"]() {
      const { editor: _0x43c8bd } = this;
      _0x43c8bd["zoomHandler"]["zoomFitView"]();
    }
    ["handleEditorConfig"](_0x4d2cfb = { "from": {}, "to": {} }) {
      const { editor: _0x352c7f } = this, { from: _0x402e54, to: _0x7c1ca5 } = _0x4d2cfb;
      Object["assign"](_0x352c7f["config"], _0x7c1ca5), _0x402e54 && _0x352c7f["historyHandler"]["store"]({ "type": HistoryTypesEnum["config"], "from": _0x402e54, "to": _0x7c1ca5 });
    }
    ["handleVisible"](_0x5db713) {
      const { editor: _0x22b681 } = this, _0x3ebcfc = _0x22b681["getActiveObjects"](), _0x40cfcd = _0x22b681["getActiveSelectionPosition"]();
      let _0x1b7aa6 = [], _0xceaee5 = [];
      _0x3ebcfc["forEach"]((_0x1eb788) => {
        const { id: _0x304a33 } = _0x1eb788;
        _0x1b7aa6["push"]({ "data": { "id": _0x304a33, "visible": _0x5db713 } }), _0xceaee5["push"]({ "data": { "id": _0x304a33, "visible": !_0x5db713 } });
      });
      const _0x490a23 = { "type": HistoryTypesEnum["attrs"], "to": { "activeSelection": _0x40cfcd, "data": _0x1b7aa6 }, "from": { "activeSelection": _0x40cfcd, "data": _0xceaee5 } };
      this["handleAttribute"](_0x490a23);
    }
    ["handleDiscard"]() {
      const { editor: _0x3a2914 } = this;
      _0x3a2914["discardActiveObject"]();
    }
    ["handleShortcutPosition"](_0x4a1684, _0x4be5fa, _0x480165) {
      const { editor: _0x5c76de } = this, _0x2293c3 = _0x5c76de["getActiveSelectionPosition"]();
      let _0x4e86ca = [], _0x496a40 = [];
      const _0x13edae = _0x5c76de["getActiveObjects"](), _0x32a9bd = _0x13edae["some"]((_0x512ae3) => _0x512ae3["locked"]);
      if (_0x32a9bd)
        return;
      _0x13edae["forEach"]((_0x59f5bf) => {
        const _0x4e8ad5 = Reflect["get"](_0x59f5bf, _0x4a1684), _0x3eef56 = Reflect["get"](_0x59f5bf, "__" + _0x4a1684);
        _0x3eef56 === void 0 && Reflect["set"](_0x59f5bf, "__" + _0x4a1684, _0x4e8ad5);
        const { id: _0x564bab } = _0x59f5bf, _0x273b97 = { "id": _0x564bab };
        Reflect["set"](_0x273b97, _0x4a1684, _0x480165 ? _0x4e8ad5 : _0x4e8ad5 + _0x4be5fa), _0x4e86ca["push"]({ "data": _0x273b97 });
        if (_0x480165) {
          const _0x503e5c = { "id": _0x564bab };
          Reflect["set"](_0x503e5c, _0x4a1684, _0x3eef56), _0x496a40["push"]({ "data": _0x503e5c }), Reflect["deleteProperty"](_0x59f5bf, "__" + _0x4a1684);
        }
      });
      const _0x5a4469 = { "type": HistoryTypesEnum["attrs"], "to": { "activeSelection": _0x2293c3, "data": _0x4e86ca } };
      _0x480165 && Reflect["set"](_0x5a4469, "from", { "activeSelection": _0x2293c3, "data": _0x496a40 }), this["handleAttribute"](_0x5a4469), _0x5c76de["fire"]("object:modified", { "target": _0x5c76de["getActiveObject"]() });
    }
    ["handleAlignEqual"](_0x167e0a, _0x184b35) {
      const { editor: _0x508d4c } = this, _0x4411c9 = _0x508d4c["getActiveObjectPositionState"](ObjectAttrsEnum["position"]);
      let _0x14285e = !![];
      switch (_0x167e0a) {
        case "width":
          this["handleEqualSize"]("width");
          break;
        case "height":
          this["handleEqualSize"]("height");
          break;
        case "widthAndHeight":
          this["handleEqualSize"]("widthAndHeight");
          break;
        case "horizontalDistance":
          this["handleEqualDistance"]("horizontalDistance", _0x184b35);
          break;
        case "verticalDistance":
          this["handleEqualDistance"]("verticalDistance", _0x184b35);
          break;
        default:
          _0x14285e = ![];
          break;
      }
      if (_0x14285e) {
        const _0x1af678 = _0x508d4c["getActiveObjectPositionState"](ObjectAttrsEnum["position"]);
        JSON["stringify"](_0x4411c9) !== JSON["stringify"](_0x1af678) && _0x508d4c["historyHandler"]["store"]({ "type": HistoryTypesEnum["attrs"], "from": _0x4411c9, "to": _0x1af678 });
      }
    }
    ["handleEqualSize"](_0x5551bf) {
      const { editor: _0x32eb29 } = this, _0x47bded = _0x32eb29["getActiveObjects"]();
      if (!_0x47bded || _0x47bded["length"] === 0)
        return;
      let _0x1172a8 = null;
      _0x47bded["sort"]((_0xf14081, _0x4506a5) => _0xf14081["x"] - _0x4506a5["x"]), _0x47bded["forEach"]((_0x490b33) => {
        if (_0x1172a8 === null)
          _0x1172a8 = _0x490b33;
        else
          switch (_0x5551bf) {
            case "widthAndHeight":
              _0x1172a8 = _0x490b33["x"] < _0x1172a8["x"] && _0x490b33["y"] < _0x1172a8["y"] ? _0x490b33 : _0x1172a8;
              break;
            case "width":
              _0x1172a8 = _0x490b33["x"] < _0x1172a8["x"] ? _0x490b33 : _0x1172a8;
              break;
            case "height":
              _0x1172a8 = _0x490b33["y"] < _0x1172a8["y"] ? _0x490b33 : _0x1172a8;
              break;
          }
      });
      const { id: _0x3f83ec, w: _0x40c438, h: _0x2f5427 } = _0x1172a8;
      let _0x17cf42 = {};
      switch (_0x5551bf) {
        case "widthAndHeight":
          _0x17cf42 = { "w": _0x40c438, "h": _0x2f5427 };
          break;
        case "width":
          _0x17cf42 = { "w": _0x40c438 };
          break;
        case "height":
          _0x17cf42 = { "h": _0x2f5427 };
          break;
      }
      _0x47bded["forEach"]((_0x362380) => {
        _0x362380["id"] !== _0x3f83ec && _0x362380["set"] && _0x362380["set"](_0x17cf42);
      }), _0x32eb29["setActiveObjects"](_0x47bded);
    }
    ["handleEqualDistance"](_0x3fb58d, _0x2b276d) {
      this["editor"]["alignHandler"]["align"](_0x3fb58d, _0x2b276d);
    }
    ["handleSetSelection"](_0x426527 = []) {
      const _0xf4f1ef = this["editor"]["getObjectsByCondition"]((_0x5dd3f2) => _0x426527["includes"](_0x5dd3f2["id"]));
      this["editor"]["setActiveObjects"](_0xf4f1ef);
    }
  }
  const removeObject = (_0x5e49c7) => {
    const _0x4cb4e9 = _0x5e49c7["group"] || _0x5e49c7["editor"], _0x35f9a2 = _0x4cb4e9["objects"]["findIndex"]((_0x576e2f) => _0x576e2f["id"] === _0x5e49c7["id"]);
    _0x35f9a2 > -1 && _0x4cb4e9["objects"]["splice"](_0x35f9a2, 1), delete _0x5e49c7["group"];
  };
  const drawLine = (_0x32978f, _0x2ff488 = {}, _0x8300fa) => {
    return new Promise((_0x2ed94c) => {
      const _0x336df8 = [], _0x6c6845 = _0x2ff488["fill"] || "rgba(0,0,0,0)", _0x211c96 = _0x2ff488["stroke"] || "#000", _0x1f06b9 = _0x2ff488["strokeWidth"] || 2;
      let _0x4550c3 = null;
      const _0x252536 = _0x32978f["getEditorDom"]();
      _0x32978f["mode"] = "draw", _0x32978f["discardActiveObject"]();
      const _0x1a8a43 = (_0x1dc365) => {
        const { x: _0x3d507e, y: _0x4d2df0 } = _0x32978f["getMouseInnerPosition"](_0x1dc365);
        _0x336df8["push"]({ "x": _0x3d507e, "y": _0x4d2df0 });
        const _0x3073e5 = editorUtil["createSvgElement"]("line", { "stroke": _0x211c96, "stroke-width": _0x1f06b9, "x1": _0x3d507e, "y1": _0x4d2df0, "x2": _0x3d507e, "y2": _0x4d2df0 });
        _0x4550c3 = _0x3073e5, _0x32978f["drawLayer"]["innerHTML"] = "", _0x32978f["drawLayer"]["appendChild"](_0x3073e5), document["addEventListener"]("mousemove", _0x23bfe2), document["addEventListener"]("mouseup", _0x4b9e68);
      }, _0x23bfe2 = (_0x726ce4) => {
        let { x: _0x4c97c4, y: _0xb578c3 } = _0x32978f["getMouseInnerPosition"](_0x726ce4);
        if (_0x726ce4["shiftKey"]) {
          const _0x206c63 = Math["abs"](_0x4c97c4 - _0x336df8[0]["x"]), _0x3a711e = Math["abs"](_0xb578c3 - _0x336df8[0]["y"]);
          if (_0x206c63 > _0x3a711e)
            _0xb578c3 = _0x336df8[0]["y"];
          else
            _0x4c97c4 = _0x336df8[0]["x"];
        }
        _0x4550c3["setAttribute"]("x2", _0x4c97c4), _0x4550c3["setAttribute"]("y2", _0xb578c3);
      }, _0x4b9e68 = (_0x56ff4c) => {
        const { x: _0x165ad6, y: _0x10f941 } = _0x336df8[0], { x: _0x31bb75, y: _0x523490 } = _0x32978f["getMouseInnerPosition"](_0x56ff4c), _0x42c00b = Math["abs"](_0x165ad6 - _0x31bb75), _0x17c684 = Math["abs"](_0x10f941 - _0x523490), _0x2eb7e6 = Math["min"](_0x165ad6, _0x31bb75), _0x5492cd = Math["min"](_0x10f941, _0x523490);
        _0x189025(), _0x2ed94c({ "type": "line", "x": _0x2eb7e6, "y": _0x5492cd, "w": _0x42c00b, "h": _0x17c684, "x1": _0x165ad6 - _0x2eb7e6, "y1": _0x10f941 - _0x5492cd, "x2": _0x31bb75 - _0x2eb7e6, "y2": _0x523490 - _0x5492cd, "fill": _0x6c6845, "stroke": _0x211c96, "strokeWidth": _0x1f06b9 });
      }, _0x189025 = () => {
        _0x252536["removeEventListener"]("mousedown", _0x1a8a43), document["removeEventListener"]("mousemove", _0x23bfe2), document["removeEventListener"]("mouseup", _0x4b9e68), _0x32978f["mode"] = "select", _0x32978f["drawLayer"]["innerHTML"] = "";
      };
      _0x252536["addEventListener"]("mousedown", _0x1a8a43), typeof _0x8300fa === "function" && _0x8300fa({ "disposeEvents": _0x189025 });
    });
  };
  const drawRect = (_0x2d4521, _0x300396 = {}, _0x29593d) => {
    return new Promise((_0x3b09b7) => {
      const _0x412d1d = [], _0x3d57b0 = _0x300396["fill"] || "rgba(0,0,0,0)", _0x319bcf = _0x300396["stroke"] || "#000", _0x167d29 = _0x300396["strokeWidth"] || 2;
      let _0x19f4fa = null;
      const _0x3d153b = _0x2d4521["getEditorDom"]();
      _0x2d4521["mode"] = "draw", _0x2d4521["discardActiveObject"]();
      const _0x5728b2 = (_0x10b904) => {
        const { x: _0xaff260, y: _0x22d75c } = _0x2d4521["getMouseInnerPosition"](_0x10b904), [_0x1afa5a, _0x31e707] = ["0", "0", "0", "0"];
        _0x412d1d["push"]({ "x": _0xaff260, "y": _0x22d75c });
        const _0x309406 = editorUtil["createSvgElement"]("rect", { "fill": _0x3d57b0, "stroke": _0x319bcf, "stroke-width": _0x167d29, "x": _0xaff260, "y": _0x22d75c, "width": _0x1afa5a, "height": _0x31e707 });
        _0x19f4fa = _0x309406, _0x2d4521["drawLayer"]["innerHTML"] = "", _0x2d4521["drawLayer"]["appendChild"](_0x309406), document["addEventListener"]("mousemove", _0x3d1006), document["addEventListener"]("mouseup", _0x176e44);
      }, _0x3d1006 = (_0x85bc0c) => {
        const { x: _0x546c59, y: _0x3f5458 } = _0x2d4521["getMouseInnerPosition"](_0x85bc0c), { x: _0x5a7079, y: _0x34245a } = _0x412d1d[0], _0x4c1c33 = Math["abs"](_0x5a7079 - _0x546c59), _0x2adeee = Math["abs"](_0x34245a - _0x3f5458), _0x28561e = Math["min"](_0x5a7079, _0x546c59), _0x461772 = Math["min"](_0x34245a, _0x3f5458);
        _0x19f4fa["setAttribute"]("x", _0x28561e), _0x19f4fa["setAttribute"]("y", _0x461772), _0x19f4fa["setAttribute"]("width", _0x4c1c33), _0x19f4fa["setAttribute"]("height", _0x2adeee);
      }, _0x176e44 = (_0x32983f) => {
        const { x: _0x3bedb5, y: _0x2a181b } = _0x412d1d[0], { x: _0x3afcea, y: _0x54449f } = _0x2d4521["getMouseInnerPosition"](_0x32983f), _0x7cc284 = Math["abs"](_0x3bedb5 - _0x3afcea), _0x516497 = Math["abs"](_0x2a181b - _0x54449f), _0x47d70f = Math["min"](_0x3bedb5, _0x3afcea), _0x551f13 = Math["min"](_0x2a181b, _0x54449f);
        _0xaef792(), _0x3b09b7({ "type": "rect", "x": _0x47d70f, "y": _0x551f13, "w": _0x7cc284, "h": _0x516497, "fill": _0x3d57b0, "stroke": _0x319bcf, "strokeWidth": _0x167d29 });
      }, _0xaef792 = () => {
        _0x3d153b["removeEventListener"]("mousedown", _0x5728b2), document["removeEventListener"]("mousemove", _0x3d1006), document["removeEventListener"]("mouseup", _0x176e44), _0x2d4521["mode"] = "select", _0x2d4521["drawLayer"]["innerHTML"] = "";
      };
      _0x3d153b["addEventListener"]("mousedown", _0x5728b2), typeof _0x29593d === "function" && _0x29593d({ "disposeEvents": _0xaef792 });
    });
  };
  const object2String = (_0x485890) => {
    let _0x420e0e = "";
    return Object["keys"](_0x485890)["forEach"]((_0x1a7a5f) => {
      const _0x362b20 = _0x1a7a5f["replace"](/([A-Z])/g, "-$1")["toLowerCase"]();
      _0x485890[_0x1a7a5f] && (typeof _0x485890[_0x1a7a5f] === "number" ? _0x420e0e += _0x362b20 + ":" + _0x485890[_0x1a7a5f] + "px;" : _0x420e0e += _0x362b20 + ":" + _0x485890[_0x1a7a5f] + ";");
    }), _0x420e0e;
  };
  const drawText = (_0x469197, _0x2cc14b = {}, _0x3ae3d4) => {
    return new Promise((_0x3eba1d) => {
      const _0x22419f = { "fontFamily": "", "backgroundColor": "rgba(0,0,0,0)", "fontSize": 28, "color": "#ffffff", "alignItems": "center", "justifyContent": "flex-start", "lineHeight": 32, "letterSpacing": 0, "textDecoration": "none", "fontWeight": "normal", "fontStyle": "normal", "paddingLeft": 6, "paddingRight": 6 };
      Object["assign"](_0x22419f, _0x2cc14b);
      const _0x513077 = _0x469197["getEditorDom"]();
      _0x469197["mode"] = "draw", _0x469197["discardActiveObject"]();
      const _0x4a1357 = (_0x2560e3) => {
        const { x: _0x815856, y: _0x398b40 } = _0x469197["getMouseInnerPosition"](_0x2560e3);
        const _0x445991 = editorUtil["createSvgElement"]("g", { "transform": "translate(" + _0x815856 + ", " + _0x398b40 + ")" }, { "pointerEvents": "auto" });
        _0x445991["innerHTML"] = '<foreignObject style="overflow: visible;">\n                        <div contenteditable="true" class="editable-text" style="' + object2String(_0x22419f) + '">输入文本</div>\n                       </foreignObject>', _0x469197["drawLayer"]["innerHTML"] = "", _0x469197["drawLayer"]["appendChild"](_0x445991);
        const _0x34af75 = _0x469197["drawLayer"]["querySelector"](".editable-text");
        setTimeout(() => {
          const _0x210748 = () => {
            const _0x4349db = document["createRange"]();
            _0x4349db["selectNodeContents"](_0x34af75);
            const _0x23b136 = window["getSelection"]();
            _0x23b136["removeAllRanges"](), _0x23b136["addRange"](_0x4349db);
          };
          _0x34af75["onpaste"] = function(_0x11b66a) {
            _0x11b66a["preventDefault"]();
            const _0x395efc = _0x11b66a["clipboardData"]["getData"]("text");
            _0x34af75["innerHTML"] = _0x395efc, _0x210748();
          }, _0x210748(), _0x34af75["addEventListener"]("blur", () => {
            const { width: _0x169994, height: _0x50fcac } = _0x34af75["getBoundingClientRect"](), { innerText: _0x3517c6 } = _0x34af75;
            _0x358e8();
            const { a: _0x1b1cc4 } = _0x469197["viewportTransform"];
            _0x3eba1d({ "type": "object", "x": _0x815856, "y": _0x398b40, "w": _0x169994 / _0x1b1cc4, "h": _0x50fcac / _0x1b1cc4, "text": _0x3517c6, "style": _0x22419f });
          });
        }, 0), _0x513077["removeEventListener"]("mousedown", _0x4a1357);
      }, _0x358e8 = () => {
        _0x513077["removeEventListener"]("mousedown", _0x4a1357), _0x469197["mode"] = "select", _0x469197["drawLayer"]["innerHTML"] = "";
      };
      _0x513077["addEventListener"]("mousedown", _0x4a1357), typeof _0x3ae3d4 === "function" && _0x3ae3d4({ "disposeEvents": _0x358e8 });
    });
  };
  const getPointsStr = (_0x313b27) => _0x313b27["map"]((_0x1010fc) => _0x1010fc["x"] + "," + _0x1010fc["y"])["join"](" ");
  const drawPolyline = (_0x37268c, _0x41f7de = {}, _0x1840e8) => {
    return new Promise((_0x48ff2f) => {
      const _0x51cacf = [], _0x2afd09 = _0x41f7de["fill"] || "rgba(0,0,0,0)", _0x4a0d26 = _0x41f7de["stroke"] || "#000", _0x4528d2 = _0x41f7de["strokeWidth"] || 2, _0x3b7fdd = _0x37268c["getEditorDom"]();
      _0x37268c["mode"] = "draw", _0x37268c["discardActiveObject"]();
      const _0x210402 = editorUtil["createSvgElement"]("polyline", { "fill": _0x2afd09, "stroke": _0x4a0d26, "stroke-width": _0x4528d2 });
      _0x37268c["drawLayer"]["innerHTML"] = "", _0x37268c["drawLayer"]["appendChild"](_0x210402);
      const _0x58bfdf = (_0xf20bd5) => {
        const { x: _0x494cbd, y: _0xa6610c } = _0x37268c["getMouseInnerPosition"](_0xf20bd5);
        _0x51cacf["push"]({ "x": _0x494cbd, "y": _0xa6610c }), _0x210402["setAttribute"]("points", getPointsStr(_0x51cacf)), document["addEventListener"]("mousemove", _0x45d21f), document["addEventListener"]("keydown", _0x2c5261);
      }, _0x45d21f = (_0x3f5fa7) => {
        const { x: _0x2c2956, y: _0x5404ac } = _0x37268c["getMouseInnerPosition"](_0x3f5fa7);
        _0x210402["setAttribute"]("points", getPointsStr(_0x51cacf["concat"]([{ "x": _0x2c2956, "y": _0x5404ac }])));
      }, _0x2c5261 = (_0x59f79f) => {
        _0x59f79f["key"] === "Escape" && _0x244d76();
      }, _0x244d76 = () => {
        const { minX: _0x37ff58, minY: _0x2c1530, maxX: _0x2a0187, maxY: _0x852fa2 } = _0x51cacf["reduce"]((_0x23e766, _0x20949f) => {
          return _0x23e766["minX"] = Math["min"](_0x23e766["minX"], _0x20949f["x"]), _0x23e766["minY"] = Math["min"](_0x23e766["minY"], _0x20949f["y"]), _0x23e766["maxX"] = Math["max"](_0x23e766["maxX"], _0x20949f["x"]), _0x23e766["maxY"] = Math["max"](_0x23e766["maxY"], _0x20949f["y"]), _0x23e766;
        }, { "minX": _0x51cacf[0]["x"], "minY": _0x51cacf[0]["y"], "maxX": _0x51cacf[0]["x"], "maxY": _0x51cacf[0]["y"] }), _0xd4fa58 = _0x2a0187 - _0x37ff58, _0x3f658d = _0x852fa2 - _0x2c1530;
        _0x51cacf["forEach"]((_0x27298f) => {
          _0x27298f["x"] -= _0x37ff58, _0x27298f["y"] -= _0x2c1530;
        }), _0x1ec060(), _0x48ff2f({ "type": "polyline", "x": _0x37ff58, "y": _0x2c1530, "w": _0xd4fa58, "h": _0x3f658d, "points": _0x51cacf, "fill": _0x2afd09, "stroke": _0x4a0d26, "strokeWidth": _0x4528d2 });
      }, _0x1ec060 = () => {
        _0x3b7fdd["removeEventListener"]("mousedown", _0x58bfdf), document["removeEventListener"]("mousemove", _0x45d21f), document["removeEventListener"]("keydown", _0x2c5261), _0x37268c["mode"] = "select", _0x37268c["drawLayer"]["innerHTML"] = "";
      };
      _0x3b7fdd["addEventListener"]("mousedown", _0x58bfdf), typeof _0x1840e8 === "function" && _0x1840e8({ "disposeEvents": _0x1ec060 });
    });
  };
  const drawBezierCurve = (_0xb86b77, _0x2b51ce = {}, _0x3c3465) => {
    return new Promise((_0x59edad) => {
      const _0x40f843 = [], _0xcce82c = _0x2b51ce["fill"] || "rgba(0,0,0,0)", _0x5682ce = _0x2b51ce["stroke"] || "#000", _0x2ba2f5 = _0x2b51ce["strokeWidth"] || 2;
      let _0x11ea74 = ![];
      const _0x154966 = _0xb86b77["getEditorDom"]();
      _0xb86b77["mode"] = "draw", _0xb86b77["discardActiveObject"]();
      const _0x56b7dd = editorUtil["createSvgElement"]("path", { "fill": _0xcce82c, "stroke": _0x5682ce, "stroke-width": _0x2ba2f5 });
      _0xb86b77["drawLayer"]["innerHTML"] = "", _0xb86b77["drawLayer"]["appendChild"](_0x56b7dd);
      const _0x6187bb = (_0x7fdc2a) => {
        _0x11ea74 = !![];
        const { x: _0x3d34fe, y: _0x4b0f1f } = _0xb86b77["getMouseInnerPosition"](_0x7fdc2a);
        if (_0x40f843["length"] === 0)
          _0x40f843["push"](["M", _0x3d34fe, _0x4b0f1f], ["C", _0x3d34fe, _0x4b0f1f, _0x3d34fe, _0x4b0f1f, _0x3d34fe, _0x4b0f1f]);
        else {
          const _0x544051 = editorUtil["getDistance"]({ "x": _0x40f843[0][1], "y": _0x40f843[0][2] }, { "x": _0x3d34fe, "y": _0x4b0f1f });
          if (_0x544051 < 3) {
            _0x40f843["pop"](), _0x40f843["push"](["Z"]), _0x4cbfbe();
            return;
          }
          const _0x605ab8 = _0x40f843[_0x40f843["length"] - 1], _0x132868 = ["C", 2 * _0x605ab8[5] - _0x605ab8[3], 2 * _0x605ab8[6] - _0x605ab8[4], _0x3d34fe, _0x4b0f1f, _0x3d34fe, _0x4b0f1f];
          _0x40f843["push"](_0x132868);
        }
        _0x56b7dd["setAttribute"]("d", editorUtil["getPathStr"](_0x40f843)), document["addEventListener"]("mousemove", _0xcd478d), document["addEventListener"]("mouseup", _0x47fe9a), document["addEventListener"]("keydown", _0x26ff8c);
      }, _0xcd478d = (_0x3fc166) => {
        let { x: _0x4e8234, y: _0x3b8942 } = _0xb86b77["getMouseInnerPosition"](_0x3fc166);
        const _0x3334eb = _0x40f843[_0x40f843["length"] - 2][0];
        for (let _0x3abd1f = 0; _0x3abd1f < _0x40f843["length"] - 1; _0x3abd1f++) {
          const _0x5b9cf9 = _0x40f843[_0x3abd1f], [_0x2ee1b7, _0x326706] = [_0x5b9cf9[_0x5b9cf9["length"] - 2], _0x5b9cf9[_0x5b9cf9["length"] - 1]], _0x37a0fd = editorUtil["getDistance"]({ "x": _0x4e8234, "y": _0x3b8942 }, { "x": _0x2ee1b7, "y": _0x326706 });
          if (_0x37a0fd < 5) {
            _0x4e8234 = _0x2ee1b7, _0x3b8942 = _0x326706;
            break;
          }
        }
        if (_0x11ea74)
          switch (_0x3334eb) {
            case "M":
              break;
            case "C":
              _0x40f843[_0x40f843["length"] - 1][1] = _0x4e8234, _0x40f843[_0x40f843["length"] - 1][2] = _0x3b8942, _0x40f843[_0x40f843["length"] - 2][3] = 2 * _0x40f843[_0x40f843["length"] - 2][5] - _0x4e8234, _0x40f843[_0x40f843["length"] - 2][4] = 2 * _0x40f843[_0x40f843["length"] - 2][6] - _0x3b8942;
          }
        _0x40f843[_0x40f843["length"] - 1][3] = _0x4e8234, _0x40f843[_0x40f843["length"] - 1][4] = _0x3b8942, _0x40f843[_0x40f843["length"] - 1][5] = _0x4e8234, _0x40f843[_0x40f843["length"] - 1][6] = _0x3b8942, _0x56b7dd["setAttribute"]("d", editorUtil["getPathStr"](_0x40f843));
      }, _0x26ff8c = (_0xd1d664) => {
        _0xd1d664["key"] === "Escape" && (_0x40f843["pop"](), _0x4cbfbe());
      }, _0x47fe9a = () => {
        _0x11ea74 = ![];
      }, _0x4cbfbe = () => {
        const { x: _0x310d0d, y: _0x1e9cfb, width: _0x1cc2c8, height: _0x356107 } = editorUtil["getPathBoundingBox"](_0x40f843);
        _0x40f843["forEach"]((_0x2cf0ea) => {
          _0x2cf0ea["forEach"]((_0x4cf7ed, _0x12e8a6) => {
            _0x12e8a6 > 0 && (_0x2cf0ea[_0x12e8a6] = _0x12e8a6 % 2 === 0 ? _0x4cf7ed - _0x1e9cfb : _0x4cf7ed - _0x310d0d);
          });
        }), _0x4a7ece(), _0x59edad({ "type": "bezierCurve", "x": _0x310d0d, "y": _0x1e9cfb, "w": _0x1cc2c8, "h": _0x356107, "path": _0x40f843, "fill": _0xcce82c, "stroke": _0x5682ce, "strokeWidth": _0x2ba2f5 });
      }, _0x4a7ece = () => {
        _0x154966["removeEventListener"]("mousedown", _0x6187bb), document["removeEventListener"]("mousemove", _0xcd478d), document["removeEventListener"]("mouseup", _0x47fe9a), document["removeEventListener"]("keydown", _0x26ff8c), _0xb86b77["mode"] = "select", _0xb86b77["drawLayer"]["innerHTML"] = "";
      };
      _0x154966["addEventListener"]("mousedown", _0x6187bb), typeof _0x3c3465 === "function" && _0x3c3465({ "disposeEvents": _0x4a7ece });
    });
  };
  const drawCircle = (_0x34eb65, _0x4ea61d = {}, _0x7fb3cf) => {
    return new Promise((_0x2009c3) => {
      const _0x1a3604 = [], _0x59556c = _0x4ea61d["fill"] || "rgba(0,0,0,0)", _0x283931 = _0x4ea61d["stroke"] || "#000", _0x3a43e7 = _0x4ea61d["strokeWidth"] || 2;
      let _0x5ecc44 = null;
      _0x34eb65["mode"] = "draw", _0x34eb65["discardActiveObject"]();
      const _0x200bba = (_0xf433a1) => {
        const { x: _0x24936c, y: _0x3e033d } = _0x34eb65["getMouseInnerPosition"](_0xf433a1["e"]);
        console["log"](_0x24936c, _0x3e033d), _0x1a3604["push"]({ "x": _0x24936c, "y": _0x3e033d });
        const _0x4637b5 = editorUtil["createSvgElement"]("circle", { "stroke": _0x283931, "fill": _0x59556c, "stroke-width": _0x3a43e7, "cx": _0x24936c, "cy": _0x3e033d, "r": 0 });
        _0x5ecc44 = _0x4637b5, _0x34eb65["drawLayer"]["innerHTML"] = "", _0x34eb65["drawLayer"]["appendChild"](_0x4637b5);
      }, _0x56b787 = (_0x4372d2) => {
        if (_0x1a3604["length"]) {
          let { x: _0x13a5ae, y: _0x28649a } = _0x34eb65["getMouseInnerPosition"](_0x4372d2["e"]);
          const _0x548401 = Math["abs"](_0x13a5ae - _0x1a3604[0]["x"]) - _0x3a43e7 / 2, _0x335167 = Math["abs"](_0x28649a - _0x1a3604[0]["y"]) - _0x3a43e7 / 2;
          _0x5ecc44["setAttribute"]("r", Math["max"](0, _0x548401, _0x335167));
        }
      }, _0x29810d = (_0x597767) => {
        const { x: _0x35ff57, y: _0x5095bb } = _0x34eb65["getMouseInnerPosition"](_0x597767["e"]), _0x2506cb = Math["abs"](_0x35ff57 - _0x1a3604[0]["x"]) - _0x3a43e7 / 2, _0x41f86b = Math["abs"](_0x5095bb - _0x1a3604[0]["y"]) - _0x3a43e7 / 2, _0x1aa5c5 = Math["max"](0, _0x2506cb, _0x41f86b);
        _0x143736(), _0x2009c3({ "type": "circle", "x": _0x1a3604[0]["x"] - _0x1aa5c5 - _0x3a43e7 / 2, "y": _0x1a3604[0]["y"] - _0x1aa5c5 - _0x3a43e7 / 2, "w": _0x1aa5c5 * 2 + _0x3a43e7, "h": _0x1aa5c5 * 2 + _0x3a43e7, "r": _0x1aa5c5, "fill": _0x59556c, "stroke": _0x283931, "strokeWidth": _0x3a43e7 });
      }, _0x4f77bc = ({ isDispose = ![] }) => {
        const _0x2b8021 = isDispose ? "off" : "on";
        _0x34eb65[_0x2b8021]("editor:mousedown", _0x200bba), _0x34eb65[_0x2b8021]("editor:mousemove", _0x56b787), _0x34eb65[_0x2b8021]("editor:mouseup", _0x29810d);
      }, _0x143736 = () => {
        _0x4f77bc({ "isDispose": !![] }), _0x34eb65["mode"] = "select", _0x34eb65["drawLayer"]["innerHTML"] = "";
      };
      _0x4f77bc({ "isDispose": ![] }), typeof _0x7fb3cf === "function" && _0x7fb3cf({ "disposeEvents": _0x143736 });
    });
  };
  const _0x4dd40c = { "drawLine": drawLine, "drawRect": drawRect, "drawText": drawText, "drawPolyline": drawPolyline, "drawBezierCurve": drawBezierCurve, "drawCircle": drawCircle };
  const firstKeyUpperCase = (_0x4279f5) => _0x4279f5["slice"](0, 1)["toUpperCase"]() + _0x4279f5["slice"](1);
  class DrawHandler {
    constructor(_0x48aa0d) {
      this["editor"] = _0x48aa0d;
    }
    ["draw"](_0x3dead1, _0x3d83fa) {
      const _0x2f5af3 = "draw" + firstKeyUpperCase(_0x3dead1), _0x1c41a1 = _0x4dd40c[_0x2f5af3];
      if (!_0x1c41a1)
        return null;
      return _0x1c41a1(this["editor"], _0x3d83fa, (_0x6695bd) => {
        this["target"] = _0x6695bd;
      });
    }
    ["cacelDraw"]() {
      this["target"] && this["target"]["disposeEvents"] && this["target"]["disposeEvents"](), this["target"] = null;
    }
  }
  class RulerHandler {
    constructor(_0x1852b1) {
      this["classNamePrefix"] = "", this["isDragging"] = ![], this["config"] = { "enable": ![], "shadowEnable": ![], "width": 0, "height": 0, "scale": 1, "startX": 0, "startY": 0, "thick": 21, "select": { "x": 0, "y": 0, "w": 0, "h": 0 }, "ratio": window["devicePixelRatio"] || 1 }, this["style"] = { "bgColor": "rgb(225,225,225)", "longfgColor": "#BABBBC", "shortfgColor": "#C8CDD0", "fontColor": "#7D8694", "shadowColor": "#f9f9f9", "shadowFontColor": "#f00", "lineColor": "#EB5648", "lineNormalColor": "#f00", "lineActiveColor": "#246dff", "borderColor": "#DADADC", "cornerActiveColor": "rgb(225,225,225)" }, this["styleDark"] = { "bgColor": "#0E0E0E", "longfgColor": "#3D3D3E", "shortfgColor": "#3D3D3E", "fontColor": "#999999", "shadowColor": "orange", "shadowFontColor": "#f00", "lineColor": "orange", "lineNormalColor": "#f00", "lineActiveColor": "#246dff", "borderColor": "transparent", "cornerActiveColor": "#B2C7DB" }, this["lines"] = { "v": [], "h": [] }, this["rulerDom"] = null, this["canvasDom"] = null, this["lineDom"] = null, this["editor"] = _0x1852b1, this["classNamePrefix"] = _0x1852b1["classNamePrefix"], Object["assign"](this["config"], _0x1852b1["config"]["ruler"]);
      if (!_0x1852b1["config"]["ruler"] || !_0x1852b1["config"]["ruler"]["enable"])
        return;
      _0x1852b1["config"]["ruler"]["lines"] && Object["assign"](this["lines"], _0x1852b1["config"]["ruler"]["lines"]), _0x1852b1["config"]["ruler"]["style"] && Object["assign"](this["style"], _0x1852b1["config"]["ruler"]["style"]), this["initialize"]();
    }
    ["initialize"]() {
      this["initSize"](), this["initRulerDom"](), this["initEvent"]();
    }
    ["initEvent"]() {
      const { editor: _0x56036e } = this;
      _0x56036e["on"]({ "editor:panzoom": (_0x41d26b) => {
        this["initTransform"](_0x41d26b), this["changeRuler"]();
      }, "selection:updated": () => {
        const _0x51f511 = _0x56036e["getActiveObject"]();
        this["initRulerActiveShadow"](_0x51f511);
      }, "object:moving": (_0x22d162) => {
        const _0x5382e3 = _0x56036e["getActiveObject"]();
        this["initRulerActiveShadow"](_0x5382e3);
      }, "object:resizing": (_0x1f8970) => {
        const _0x196a7c = _0x56036e["getActiveObject"]();
        this["initRulerActiveShadow"](_0x196a7c);
      }, "object:rotating": (_0x3a0be0) => {
        const _0x3b59c2 = _0x56036e["getActiveObject"]();
        this["initRulerActiveShadow"](_0x3b59c2);
      }, "object:modified": (_0x4e04cd) => {
        const _0x524486 = _0x56036e["getActiveObject"]();
        this["initRulerActiveShadow"](_0x524486);
      } });
    }
    ["initSize"]() {
      const { editor: _0x1c9998 } = this, _0x290b39 = _0x1c9998["getEditorBoundingClientRect"]();
      this["config"]["width"] = _0x290b39["width"], this["config"]["height"] = _0x290b39["height"], this["initTransform"](_0x1c9998["viewportTransform"]);
    }
    ["initTransform"](_0x286ae8) {
      const { thick: _0x4e6ca5 } = this["config"];
      this["config"]["startX"] = -(_0x286ae8["e"] - _0x4e6ca5) / _0x286ae8["a"], this["config"]["startY"] = -(_0x286ae8["f"] - _0x4e6ca5) / _0x286ae8["a"], this["config"]["scale"] = _0x286ae8["a"];
    }
    ["initRulerActiveShadow"](_0x138708) {
      this["config"]["select"] = { "x": 0, "y": 0, "w": 0, "h": 0 };
      if (_0x138708) {
        const { x: _0x296f78, y: _0x33b5a9, w: _0x29cd8e, h: _0x1e222c } = editorUtil["getBoundingRect"]([_0x138708]);
        this["config"]["select"] = { "x": _0x296f78, "y": _0x33b5a9, "w": _0x29cd8e, "h": _0x1e222c };
      }
      this["drawRulerDivision"]();
    }
    ["toggleRuler"]() {
      const { editor: _0x218fb8 } = this, _0x40895c = _0x218fb8["overLayer"];
      return this["config"]["enable"] = !this["config"]["enable"], this["config"]["enable"] ? this["initialize"]() : _0x40895c["removeChild"](this["rulerDom"]), this["config"]["enable"];
    }
    ["setStyle"](_0x25a472, _0x4d8055) {
      if (typeof _0x4d8055 === "object")
        for (const _0x16b4d9 in _0x4d8055) {
          _0x25a472["style"]["setProperty"](_0x16b4d9, _0x4d8055[_0x16b4d9]);
        }
    }
    ["initRulerDom"]() {
      const { editor: _0x3e2b31, classNamePrefix: _0x5e1462 } = this, _0x3a32ee = _0x3e2b31["overLayer"], _0x3f5e30 = document["createElement"]("div");
      _0x3f5e30["className"] = _0x5e1462 + "-ruler", this["rulerDom"] = _0x3f5e30;
      const _0x31dcf6 = { "--datavis--r-bgColor": this["style"]["bgColor"], "--datavis--r-lineColor": this["style"]["lineColor"], "--datavis--r-lineNormalColor": this["style"]["lineNormalColor"], "--datavis--r-lineActiveColor": this["style"]["lineActiveColor"], "--datavis--r-longfgColor": this["style"]["longfgColor"], "--datavis--r-shortfgColor": this["style"]["shortfgColor"], "--datavis--r-fontColor": this["style"]["fontColor"], "--datavis--r-shadowColor": this["style"]["shadowColor"], "--datavis--r-shadowFontColor": this["style"]["shadowFontColor"], "--datavis--r-borderColor": this["style"]["borderColor"], "--datavis--r-cornerActiveColor": this["style"]["cornerActiveColor"], "--datavis--r-thick": this["config"]["thick"] + "px" };
      this["setStyle"](_0x3f5e30, _0x31dcf6), _0x3a32ee["appendChild"](this["rulerDom"]), this["initRulerCanvas"](), this["initRulerLine"]();
    }
    ["initRulerCanvas"]() {
      const { classNamePrefix: _0x3424ca } = this, _0x5dc1d4 = document["createElement"]("div");
      _0x5dc1d4["className"] = _0x3424ca + "-ruler-canvas-container", this["canvasDom"] = _0x5dc1d4, this["rulerDom"]["appendChild"](this["canvasDom"]), this["initRulerConer"](), this["drawRulerDivision"]();
    }
    ["initRulerConer"]() {
      const { classNamePrefix: _0x10aef2 } = this, _0xa319d9 = document["createElement"]("div");
      _0xa319d9["className"] = _0x10aef2 + "-ruler-corner", this["rulerDom"]["appendChild"](_0xa319d9);
    }
    ["changeRuler"]() {
      this["drawRulerDivision"](), this["updateRulerLines"]();
    }
    ["drawRulerDivision"]() {
      if (!this["canvasDom"])
        return;
      this["canvasDom"]["innerHTML"] = "", this["initRulerDivision"](), this["initRulerDivision"]("vertical");
    }
    ["initRulerDivision"](_0x131273) {
      const { editor: _0x3c8fda, config: _0x5796ec, style: _0x523cf8 } = this, _0x3bdc69 = _0x3c8fda["classNamePrefix"], _0x224866 = document["createElement"]("canvas");
      _0x224866["className"] = _0x3bdc69 + "-ruler-canvas-division " + (_0x131273 || "");
      let _0x5a6b16 = _0x5796ec["width"], _0x7c1dde = _0x5796ec["height"], _0x276c5c = _0x224866["getContext"]("2d");
      if (_0x131273) {
        let _0x3f93b0 = _0x5796ec["thick"], _0x2d81cd = _0x5796ec["height"] - _0x5796ec["thick"];
        _0x224866["width"] = _0x3f93b0 * _0x5796ec["ratio"], _0x224866["height"] = _0x2d81cd * _0x5796ec["ratio"], drawVerticalRuler({ "ctx": _0x276c5c, "start": _0x5796ec["startY"], "shadow": { "enable": _0x5796ec["shadowEnable"], "y": _0x5796ec["select"]["y"], "height": _0x5796ec["select"]["h"] }, "config": { "width": _0x5796ec["thick"] * _0x5796ec["ratio"], "height": _0x7c1dde * _0x5796ec["ratio"], "scale": _0x5796ec["scale"], "ratio": _0x5796ec["ratio"] }, "colorConfig": this["style"] });
      } else {
        let _0xc7d612 = _0x5796ec["width"] - _0x5796ec["thick"], _0x408173 = _0x5796ec["thick"];
        _0x224866["width"] = _0xc7d612 * _0x5796ec["ratio"], _0x224866["height"] = _0x408173 * _0x5796ec["ratio"], drawHorizontalRuler({ "ctx": _0x276c5c, "start": _0x5796ec["startX"], "shadow": { "enable": _0x5796ec["shadowEnable"], "x": _0x5796ec["select"]["x"], "width": _0x5796ec["select"]["w"] }, "config": { "width": _0x5a6b16 * _0x5796ec["ratio"], "height": _0x5796ec["thick"] * _0x5796ec["ratio"], "scale": _0x5796ec["scale"], "ratio": _0x5796ec["ratio"] }, "colorConfig": this["style"] });
      }
      _0x224866["addEventListener"]("mousedown", (_0x1722fa) => {
        _0x1722fa["preventDefault"](), _0x1722fa["stopPropagation"]();
        let _0x1d239e = null;
        const { x: _0x125ca7, y: _0x4577d6 } = _0x3c8fda["getMouseInnerPosition"](_0x1722fa);
        _0x131273 ? (_0x1d239e = { "x": _0x125ca7, "y": 0 }, this["createRulerLine"](_0x1d239e, this["lines"]["v"]["length"], "vertical"), this["lines"]["v"]["push"](_0x1d239e)) : (_0x1d239e = { "x": 0, "y": _0x4577d6 }, this["createRulerLine"](_0x1d239e, this["lines"]["h"]["length"], ""), this["lines"]["h"]["push"](_0x1d239e));
        _0x1d239e["refDOM"]["classList"]["add"]("active");
        const _0x37c358 = (_0x4e7a17) => {
          this["isDragging"] = !![], _0x1722fa["preventDefault"](), _0x1722fa["stopPropagation"]();
          const { x: _0x4b0ff1, y: _0x3a7ee4 } = _0x3c8fda["getMouseInnerPosition"](_0x4e7a17);
          _0x131273 ? _0x1d239e["x"] = _0x4b0ff1 : _0x1d239e["y"] = _0x3a7ee4, this["updateRulerLine"](_0x1d239e), this["setActiveLineValue"](_0x1d239e);
        }, _0x4e31c3 = () => {
          this["isDragging"] = ![], _0x1d239e["refDOM"]["classList"]["remove"]("active"), this["judgeDeleteRuleLine"]({ "line": _0x1d239e }), document["removeEventListener"]("mousemove", _0x37c358), document["removeEventListener"]("mouseup", _0x4e31c3);
        };
        document["addEventListener"]("mousemove", _0x37c358), document["addEventListener"]("mouseup", _0x4e31c3);
      }), this["canvasDom"]["appendChild"](_0x224866);
    }
    ["initRulerLine"]() {
      const { classNamePrefix: _0x160936 } = this, _0x29c7e3 = document["createElement"]("div");
      _0x29c7e3["className"] = _0x160936 + "-ruler-line-container", this["lineDom"] = _0x29c7e3, this["rulerDom"]["appendChild"](this["lineDom"]), this["drawRulerLine"]();
    }
    ["setActiveLineValue"](_0x491f30) {
      const { type: _0x26e1d0, x: _0x2649bd, y: _0x38f21e, refDOM: _0x498c84 } = _0x491f30, _0x1c5e35 = _0x26e1d0 === "vertical" ? _0x2649bd : _0x38f21e;
      _0x498c84["innerHTML"] = '<span class="action_value">' + Number(_0x1c5e35)["toFixed"](0) + "</span>";
    }
    ["setActiveLine"]({ line: _0x153ba3 }) {
      const { type: _0x331807, refDOM: _0x40d193 } = _0x153ba3, _0x2c7d79 = (_0x2d88db) => {
        this["isDragging"] = !![];
        const _0x1be701 = this["editor"]["getMousePosition"](_0x2d88db), _0x5346c0 = inverse(this["editor"]["viewportTransform"]), _0x315136 = applyToPoint(_0x5346c0, _0x1be701);
        _0x331807 === "vertical" ? _0x153ba3["x"] = _0x315136["x"] : _0x153ba3["y"] = _0x315136["y"], this["updateRulerLine"](_0x153ba3), this["setActiveLineValue"](_0x153ba3);
      }, _0xa6568f = () => {
        this["isDragging"] = ![], _0x40d193["classList"]["remove"]("active"), this["judgeDeleteRuleLine"]({ "line": _0x153ba3 }), document["removeEventListener"]("mousemove", _0x2c7d79), document["removeEventListener"]("mouseup", _0xa6568f);
      };
      _0x40d193["classList"]["add"]("active"), document["addEventListener"]("mousemove", _0x2c7d79), document["addEventListener"]("mouseup", _0xa6568f);
    }
    ["updateRulerLine"](_0x31b53c) {
      const { x: _0x123820, y: _0x215bac } = this["transform2ContainerPoint"](_0x31b53c), _0x41ad2d = _0x31b53c["type"] === "vertical" ? "translateX(" + _0x123820 + "px)" : "translateY(" + _0x215bac + "px)";
      _0x31b53c["refDOM"]["style"]["transform"] = _0x41ad2d;
    }
    ["updateRulerLines"]() {
      if (!this["lineDom"])
        return;
      const { lines: _0xe930d2 } = this;
      _0xe930d2["v"] && _0xe930d2["v"]["length"] && _0xe930d2["v"]["forEach"]((_0x3ba136) => {
        this["updateRulerLine"](_0x3ba136);
      }), _0xe930d2["h"] && _0xe930d2["h"]["length"] && _0xe930d2["h"]["forEach"]((_0x3c4d12) => {
        this["updateRulerLine"](_0x3c4d12);
      });
    }
    ["transform2ContainerPoint"](_0x41828d) {
      const { editor: _0x4de7ac } = this;
      return applyToPoint(_0x4de7ac["viewportTransform"], _0x41828d);
    }
    ["createRulerLine"](_0x3adaab, _0x515fa1, _0x46e42b = "") {
      const { classNamePrefix: _0x2670f3 } = this, _0x9c6fbf = document["createElement"]("div");
      return _0x9c6fbf["className"] = _0x2670f3 + "-ruler-line " + _0x46e42b, _0x3adaab["index"] = _0x515fa1, _0x3adaab["type"] = _0x46e42b, _0x3adaab["refDOM"] = _0x9c6fbf, this["lineDom"]["appendChild"](_0x9c6fbf), this["updateRulerLine"](_0x3adaab), _0x9c6fbf["addEventListener"]("mouseenter", () => {
        !this["isDragging"] && (_0x9c6fbf["classList"]["add"]("active"), this["setActiveLineValue"](_0x3adaab));
      }), _0x9c6fbf["addEventListener"]("mouseleave", () => {
        !this["isDragging"] && _0x9c6fbf["classList"]["remove"]("active");
      }), _0x9c6fbf["addEventListener"]("mousedown", (_0x3e3597) => {
        _0x3e3597["preventDefault"](), _0x3e3597["stopPropagation"](), this["setActiveLine"]({ "line": _0x3adaab });
      }), _0x3adaab;
    }
    ["drawRulerLine"]() {
      if (!this["lineDom"])
        return;
      const { lines: _0x2d7c2c } = this;
      this["lineDom"]["innerHTML"] = "", _0x2d7c2c["v"] && _0x2d7c2c["v"]["length"] && _0x2d7c2c["v"]["forEach"]((_0x21d369, _0x5ce3b6) => {
        this["createRulerLine"](_0x21d369, _0x5ce3b6, "vertical");
      }), _0x2d7c2c["h"] && _0x2d7c2c["h"]["length"] && _0x2d7c2c["h"]["forEach"]((_0x5b598e, _0x52674b) => {
        this["createRulerLine"](_0x5b598e, _0x52674b, "");
      });
    }
    ["judgeDeleteRuleLine"]({ line: _0x2e0ed6 }) {
      const _0x52ccdb = this["transform2ContainerPoint"](_0x2e0ed6);
      let _0x4d2779 = _0x2e0ed6["type"] === "vertical" ? this["lines"]["v"] : this["lines"]["h"], _0x2d28b5 = -1;
      _0x2e0ed6["type"] === "vertical" ? _0x52ccdb["x"] < this["config"]["thick"] && (_0x2d28b5 = _0x4d2779["findIndex"]((_0x3fb75a) => _0x3fb75a["index"] === _0x2e0ed6["index"])) : _0x52ccdb["y"] < this["config"]["thick"] && (_0x2d28b5 = this["lines"]["h"]["findIndex"]((_0x1c7397) => _0x1c7397["index"] === _0x2e0ed6["index"]));
      if (_0x2d28b5 > -1) {
        _0x4d2779["splice"](_0x2d28b5, 1);
        for (let _0x2f5708 = 0; _0x2f5708 < this["lineDom"]["children"]["length"]; _0x2f5708++) {
          const _0x58a980 = this["lineDom"]["children"][_0x2f5708];
          if (_0x58a980 === _0x2e0ed6["refDOM"]) {
            this["lineDom"]["removeChild"](_0x58a980);
            break;
          }
        }
      }
    }
  }
  var ModeType = ((_0x45e795) => {
    return _0x45e795["full"] = "full", _0x45e795["fit"] = "fit", _0x45e795["standard"] = "standard", _0x45e795;
  })(ModeType || {});
  class RenderHandler {
    constructor(_0x3d06b5) {
      this["wheelTimer"] = null, this["backgroundLayerDom"] = null, this["contentLayerDom"] = null, this["editor"] = _0x3d06b5, _0x3d06b5["config"]["type"] === "render" && (this["initContentLayer"](), this["initBackgroundLayer"](), this["initEvent"]());
    }
    ["setRenderMode"](_0x52fd1a) {
      const _0x29a45b = this["editor"], _0x206b33 = _0x29a45b["config"], { mode: _0x3eb9f1 } = _0x52fd1a, _0x69224a = this["setEditorStyle"](_0x206b33, _0x3eb9f1);
      for (let _0x5946c1 in _0x69224a) {
        _0x29a45b["editorDom"]["style"][_0x5946c1] = _0x69224a[_0x5946c1];
      }
      const { canvasStyle: _0x27016d, backgroundLayerStyle: _0x3d0e5f, contentStyle: _0x378250, viewportTransform: _0x56a0de } = this["handleStyle"](_0x206b33, _0x3eb9f1);
      Object["assign"](_0x29a45b["canvasDom"]["style"], _0x27016d), Object["assign"](this["backgroundLayerDom"]["style"], _0x3d0e5f), Object["assign"](this["contentLayerDom"]["style"], _0x378250), _0x29a45b["viewportTransform"] = _0x56a0de;
    }
    ["setEditorStyle"](_0xc19ff4, _0x37266f) {
      const { background: _0xd346ff } = _0xc19ff4, _0x4e6722 = { "backgroundColor": _0xd346ff };
      switch (_0x37266f) {
        case "standard":
          _0x4e6722["overflow"] = "auto", _0x4e6722["backgroundImage"] = "";
          break;
        case "full":
          _0x4e6722["overflow"] = "hidden", _0x4e6722["backgroundImage"] = "";
          break;
        case "fit":
          _0x4e6722["overflow"] = "hidden";
          break;
        default:
          _0x4e6722["overflow"] = "auto", _0x4e6722["backgroundImage"] = "";
          break;
      }
      return _0x4e6722;
    }
    ["handleStyle"](_0x4eff8a, _0xcdcac) {
      const { width: _0x3fbf1e, height: _0x4d0de7, filter: _0x537f42, background: _0x31e9af, backgroundImage: _0x1abd2f, backgroundFilter: _0x4e57c3 } = _0x4eff8a, _0x47beec = { "width": _0x3fbf1e + "px", "height": _0x4d0de7 + "px" }, _0x57be64 = { "width": _0x3fbf1e + "px", "height": _0x4d0de7 + "px", "backgroundColor": _0x31e9af }, _0x342508 = {};
      if (_0x537f42) {
        const { enable: _0x1dd99f, hueRotate: _0x563854, contrast: _0x4c9b67, saturate: _0x47a714, brightness: _0x30f0de, grayscale: _0x4ebffe } = _0x537f42;
        if (_0x1dd99f) {
          let _0x2297e3 = "";
          if (_0x563854)
            _0x2297e3 += " hue-rotate(" + _0x563854 + "deg)";
          if (_0x4c9b67)
            _0x2297e3 += " contrast(" + _0x4c9b67 + "%)";
          if (_0x47a714)
            _0x2297e3 += " saturate(" + _0x47a714 + "%)";
          if (_0x30f0de)
            _0x2297e3 += " brightness(" + _0x30f0de + "%)";
          if (_0x4ebffe)
            _0x2297e3 += " grayscale(" + _0x4ebffe + "%)";
          _0x342508["filter"] = _0x2297e3;
        }
      }
      _0x1abd2f && (_0x57be64["backgroundImage"] = "url(" + encodeURI(_0x1abd2f) + ")", _0x57be64["backgroundRepeat"] = "no-repeat");
      if (_0x4e57c3) {
        const { enable: _0x391980, hueRotate: _0xc6a57, contrast: _0x348425, saturate: _0x596506, brightness: _0x47e93f, grayscale: _0x50ccca } = _0x4e57c3;
        if (_0x391980) {
          let _0x145879 = "";
          if (_0xc6a57)
            _0x145879 += " hue-rotate(" + _0xc6a57 + "deg)";
          if (_0x348425)
            _0x145879 += " contrast(" + _0x348425 + "%)";
          if (_0x596506)
            _0x145879 += " saturate(" + _0x596506 + "%)";
          if (_0x47e93f)
            _0x145879 += " brightness(" + _0x47e93f + "%)";
          if (_0x50ccca)
            _0x145879 += " grayscale(" + _0x50ccca + "%)";
          _0x57be64["filter"] = _0x145879;
        }
      }
      const _0x203b98 = this["editor"]["editorDom"], _0x22389a = _0x203b98["getBoundingClientRect"](), _0xcea42f = _0x22389a["width"], _0x54daf4 = _0x22389a["height"], _0x6106ef = _0xcea42f / _0x3fbf1e, _0x11122f = _0x54daf4 / _0x4d0de7;
      let _0x421f65 = { "a": 1, "b": 0, "c": 0, "d": 1, "e": 0, "f": 0 };
      switch (_0xcdcac) {
        case "standard":
          _0x47beec["backgroundSize"] = "cover", _0x47beec["backgroundPosition"] = "center center", _0x47beec["overflow"] = "hidden";
          break;
        case "full":
          _0x47beec["backgroundSize"] = "100% 100%", _0x47beec["transformOrigin"] = "left top", _0x47beec["transform"] = "scale(" + _0x6106ef + ", " + _0x11122f + ")", _0x421f65 = { "a": _0x6106ef, "b": 0, "c": 0, "d": _0x11122f, "e": 0, "f": 0 };
          break;
        case "fit":
          _0x47beec["backgroundSize"] = "100% 100%", _0x47beec["transformOrigin"] = "left top";
          const _0x28c524 = _0x6106ef > _0x11122f ? "y" : "x", _0x5b1e92 = Math["min"](_0x6106ef, _0x11122f), _0x59d387 = _0xcea42f - _0x3fbf1e * _0x5b1e92, _0x1e08bb = _0x54daf4 - _0x4d0de7 * _0x5b1e92, _0x34e134 = _0x28c524 === "x" ? 0 : _0x59d387 * 0.5, _0x4879a2 = _0x28c524 === "y" ? 0 : _0x1e08bb * 0.5;
          _0x47beec["transform"] = "matrix(" + _0x5b1e92 + ", 0, 0, " + _0x5b1e92 + ", " + _0x34e134 + ", " + _0x4879a2 + ")", _0x421f65 = { "a": _0x5b1e92, "b": 0, "c": 0, "d": _0x5b1e92, "e": _0x34e134, "f": _0x4879a2 };
          break;
      }
      return { "canvasStyle": _0x47beec, "backgroundLayerStyle": _0x57be64, "contentStyle": _0x342508, "viewportTransform": _0x421f65 };
    }
    ["initEvent"]() {
      const { editor: _0x2ce727 } = this, _0x31bc2d = _0x2ce727["getEditorDom"]();
      _0x31bc2d["addEventListener"]("mousewheel", (_0x28497b) => {
        if (_0x2ce727["config"]["type"] !== "standard" && _0x2ce727["config"]["panzoom"] && _0x2ce727["config"]["panzoom"]["enable"]) {
          clearTimeout(this["wheelTimer"]), _0x2ce727["canvasDom"]["style"]["willChange"] = "transform";
          const _0x2ae1e5 = _0x28497b["wheelDelta"] > 0;
          let _0x182c86 = _0x2ae1e5 ? 0.1 : -0.1;
          const _0x5dcae2 = _0x2ce727["getMouseInnerPosition"](_0x28497b), _0x1667fd = _0x5dcae2["x"] * _0x182c86, _0x45b012 = _0x5dcae2["y"] * _0x182c86;
          _0x2ce727["viewportTransform"]["a"] += _0x182c86, _0x2ce727["viewportTransform"]["d"] += _0x182c86, _0x2ce727["viewportTransform"]["e"] -= _0x1667fd, _0x2ce727["viewportTransform"]["f"] -= _0x45b012;
          const { a: _0xe79736, b: _0x1983d8, c: _0x443d50, d: _0x48b253, e: _0xb747f3, f: _0xc92711 } = _0x2ce727["viewportTransform"];
          _0x2ce727["canvasDom"]["style"]["transform"] = "matrix(" + [_0xe79736, _0x1983d8, _0x443d50, _0x48b253, _0xb747f3, _0xc92711]["join"](",") + ")", this["wheelTimer"] = setTimeout(() => {
            clearTimeout(this["wheelTimer"]), this["wheelTimer"] = null, delete _0x2ce727["canvasDom"]["style"]["willChange"];
          }, 100);
        }
      }), _0x2ce727["on"]("editor:mousedown", (_0x32eb9a) => {
        if (_0x2ce727["config"]["type"] !== "standard" && _0x2ce727["config"]["panzoom"] && _0x2ce727["config"]["panzoom"]["enable"]) {
          const { e: _0x9b024 } = _0x32eb9a, { x: _0x58995b, y: _0x2d611f } = _0x2ce727["getMousePosition"](_0x9b024), { e: _0x2c4d13, f: _0xddf9c1 } = _0x2ce727["viewportTransform"];
          _0x2ce727["canvasDom"]["style"]["willChange"] = "transform";
          const _0x9d0c63 = (_0x52f843) => {
            const _0x4876d6 = _0x2ce727["getMousePosition"](_0x52f843), _0xe913f5 = _0x4876d6["x"] - _0x58995b, _0x4a1f46 = _0x4876d6["y"] - _0x2d611f;
            _0x2ce727["viewportTransform"]["e"] = _0x2c4d13 + _0xe913f5, _0x2ce727["viewportTransform"]["f"] = _0xddf9c1 + _0x4a1f46;
            const { a: _0x2f188e, b: _0x454e00, c: _0x4eae74, d: _0x1eff54, e: _0x2a891b, f: _0x1c7f26 } = _0x2ce727["viewportTransform"];
            _0x2ce727["canvasDom"]["style"]["transform"] = "matrix(" + [_0x2f188e, _0x454e00, _0x4eae74, _0x1eff54, _0x2a891b, _0x1c7f26]["join"](",") + ")";
          }, _0x47ae68 = () => {
            delete _0x2ce727["canvasDom"]["style"]["willChange"], document["removeEventListener"]("mousemove", _0x9d0c63), document["removeEventListener"]("mouseup", _0x47ae68);
          };
          document["addEventListener"]("mousemove", _0x9d0c63), document["addEventListener"]("mouseup", _0x47ae68);
        }
      });
    }
    ["initContentLayer"]() {
      const { editor: _0x33a090 } = this;
      this["contentLayerDom"] = _0x33a090["canvasDom"]["querySelector"]("svg");
    }
    ["initBackgroundLayer"]() {
      const { editor: _0x1b9556 } = this, _0x538869 = editorUtil["createSvgElement"]("svg", { "class": "datavis-render-background-layer" }, { "position": "absolute", "left": "0px", "top": "0px", "width": "100%", "height": "100%", "pointerEvents": "none", "zIndex": -1 });
      _0x1b9556["canvasDom"]["prepend"](_0x538869), this["backgroundLayerDom"] = _0x538869;
    }
  }
  class DatavisEngine {
    constructor(_0x4cda0a, _0x2ab88e) {
      this["config"] = { "canvas": "", "width": 100, "height": 100, "copyKey": "datavis-copy-data", "sorption": { "enabled": !![], "offset": 1 }, "guideline": { "width": 0.5, "color": "#f00" }, "selectionMode": "intersection", "groupAttrs": { "component": { "name": "visWidgetGroup", "title": "组合" } } }, this["viewportTransform"] = { "a": 1, "b": 0, "c": 0, "d": 1, "e": 0, "f": 0 }, this["id"] = editorUtil["nanoid"](8), this["objects"] = [], this["_activeObject"] = null, this["_activeObjects"] = [], this["selection"] = !![], this["grabing"] = ![], this["editorDom"] = null, this["canvasDom"] = null, this["classNamePrefix"] = "DATAVIS", this["mode"] = "select", this["overLayer"] = null, this["drawLayer"] = null, this["controlLayer"] = null, this["group"] = null, this["extraProps"] = [], this["pasteCount"] = 0, this["enableCustomPaste"] = ![], this["util"] = editorUtil, this["controlConfig"] = { "circle": { "r": 5, "fill": "#ffffff", "stroke": "#2c83fb", "strokeWidth": 1 }, "activeCircle": { "r": 5, "fill": "#00ff00", "stroke": "#2c83fb", "strokeWidth": 1 }, "line": { "stroke": "#2c83fb", "strokeWidth": 1 } }, this["typeCounts"] = {}, this["containerId"] = _0x4cda0a, Object["assign"](this["config"], _0x2ab88e), this["emitter"] = _0x39ca4c(), this["elementHandler"] = new ElementHandler(this), this["elementHandler"]["initLayers"](), this["initRenderMode"]();
    }
    ["setConfig"](_0x101349) {
      Object["assign"](this["config"], _0x101349);
    }
    ["changeSorption"](_0x51c939) {
      this["config"]["sorption"] = _0x51c939;
    }
    ["changeSelectionMode"](_0x179f32) {
      this["config"]["selectionMode"] = _0x179f32;
    }
    ["initRenderMode"]() {
      this["renderHandler"] = new RenderHandler(this);
    }
    ["setRenderMode"](_0x34054b) {
      this["renderHandler"] && this["renderHandler"]["setRenderMode"](_0x34054b);
    }
    ["enableSelection"]() {
      this["selection"] = !![], this["grabing"] = ![];
    }
    ["disableSelection"]() {
      this["selection"] = ![], this["grabing"] = !![];
    }
    ["setDimensions"]({ width: _0x3e4db8, height: _0x1f7144 }) {
      this["config"]["width"] = Number(_0x3e4db8), this["config"]["height"] = Number(_0x1f7144);
    }
    ["initializeHandler"]() {
      this["alignHandler"] = new AlignHandler(this), this["historyHandler"] = new HistoryHandler(this), this["objectHandler"] = new ObjectHandler(this), this["rulerAdsorbHandler"] = new RulerAdsorbHandler(this), this["guidelineHandler"] = new GuidelineHandler(this), this["zoomHandler"] = new ZoomHandler(this), this["selectionHandler"] = new SelectionHandler(this), this["shortcutHandler"] = new ShortcutHandler(this), this["drawHandler"] = new DrawHandler(this), this["rulerHandler"] = new RulerHandler(this);
    }
    ["getEditorDom"]() {
      return document["querySelector"](this["containerId"]);
    }
    ["getEditorBoundingClientRect"]() {
      const _0x1b9fed = this["editorDom"];
      return _0x1b9fed["getBoundingClientRect"]();
    }
    ["setObjects"](_0x83c863) {
      this["objects"] = _0x83c863, this["layerChange"]();
    }
    ["getObjects"]() {
      return this["objects"];
    }
    ["getActiveObject"]() {
      return this["_activeObject"];
    }
    ["getActiveSelectionPosition"]() {
      const _0x4118e7 = this["getActiveObject"]();
      return _0x4118e7 && _0x4118e7["type"] === "activeSelection" ? _0x4118e7["getPosition"]() : null;
    }
    ["setActiveObjects"](_0x48a602) {
      document["activeElement"] instanceof HTMLInputElement && document["activeElement"]["blur"]();
      this["_activeObjects"] = _0x48a602;
      this["_activeObject"] && this["_activeObject"]["disposeControls"]();
      this["group"] && _0x48a602["some"]((_0x489f69) => {
        var _a;
        return ((_a = _0x489f69["group"]) == null ? void 0 : _a["id"]) !== this["group"]["id"];
      }) && this["objectHandler"]["exitGroup"]();
      if (!_0x48a602["length"])
        this["discardActiveObject"]();
      else {
        if (_0x48a602["length"] === 1)
          this["_activeObject"] = _0x48a602[0], this["group"] = this["_activeObject"]["group"] || null;
        else {
          _0x48a602["sort"]((_0x35fc12, _0x49f9e9) => {
            const _0x24a3b6 = this["objects"]["findIndex"]((_0x1dbc8d) => _0x1dbc8d["id"] === _0x35fc12["id"]), _0x20629a = this["objects"]["findIndex"]((_0x25b267) => _0x25b267["id"] === _0x49f9e9["id"]);
            return _0x24a3b6 - _0x20629a;
          });
          const { x: _0x7e4b72, y: _0x1a656e, w: _0x307318, h: _0x1b2b5b } = editorUtil["getBoundingRect"](_0x48a602);
          this["_activeObject"] = _0x1deaa8["getInstance"](this, { "type": "activeSelection", "x": _0x7e4b72, "y": _0x1a656e, "w": _0x307318, "h": _0x1b2b5b, "objects": _0x48a602 });
        }
        this["_activeObject"]["createControls"](), this["selectionUpdated"]();
      }
    }
    ["setActiveObjectsWithPosition"](_0x105d4e, _0x38345f) {
      this["_activeObject"] && this["_activeObject"]["disposeControls"]();
      this["_activeObjects"] = _0x105d4e;
      if (_0x105d4e["length"]) {
        if (_0x105d4e["length"] > 1) {
          let _0x193663 = _0x38345f;
          !_0x38345f && (_0x193663 = editorUtil["getBoundingRect"](_0x105d4e));
          const { x: _0x1e68b8, y: _0x2130b5, w: _0x3f48fe, h: _0x437cdd, angle: _0x2d3869 } = _0x193663;
          this["_activeObject"] = _0x1deaa8["getInstance"](this, { "type": "activeSelection", "x": _0x1e68b8, "y": _0x2130b5, "w": _0x3f48fe, "h": _0x437cdd, "angle": _0x2d3869, "objects": _0x105d4e });
        } else
          this["_activeObject"] = _0x105d4e[0];
        this["_activeObject"]["createControls"](), this["selectionUpdated"]();
      } else
        this["discardActiveObject"]();
    }
    ["getPositionMap"]() {
      const _0x3d3ff3 = /* @__PURE__ */ new Map(), _0xf831f6 = (_0x58da2d) => {
        const { x: _0x3cab9a, y: _0x4b858e, w: _0x51d905, h: _0x36b1c3, angle: _0x347f33, id: _0xfd3701, group: _0x2b9749 } = _0x58da2d;
        _0x3d3ff3["set"](_0xfd3701, { "x": _0x3cab9a, "y": _0x4b858e, "w": _0x51d905, "h": _0x36b1c3, "angle": _0x347f33, "id": _0xfd3701, "groupId": _0x2b9749 ? _0x2b9749["id"] : "" }), _0x2b9749 && _0xf831f6(_0x2b9749);
      }, _0x5804df = (_0x2bc524) => {
        _0x2bc524["forEach"]((_0x1f8be3) => {
          const { x: _0x530fd7, y: _0x2d15b6, w: _0x335b54, h: _0xfc4e88, angle: _0x507273, id: _0x476000, group: _0x3d8083, points: _0x4f86a1, path: _0x3b3fff } = _0x1f8be3;
          _0x3d3ff3["set"](_0x1f8be3["id"], { "x": _0x530fd7, "y": _0x2d15b6, "w": _0x335b54, "h": _0xfc4e88, "angle": _0x507273, "id": _0x476000, "groupId": _0x3d8083 ? _0x3d8083["id"] : "", "points": cloneDeep(_0x4f86a1), "path": cloneDeep(_0x3b3fff) }), _0x1f8be3["objects"] && _0x1f8be3["objects"]["length"] && _0x5804df(_0x1f8be3["objects"]);
        });
      }, _0x160805 = this["getActiveObject"](), _0x1ac355 = [];
      if (_0x160805) {
        if (_0x160805["group"])
          _0x1ac355["push"](..._0x160805["group"]["objects"]), _0xf831f6(_0x160805["group"]);
        else {
          if (_0x160805["type"] === "activeSelection") {
            _0x1ac355["push"](..._0x160805["objects"]);
            const { id: _0x462b86, x: _0x16d1fb, y: _0xef9abb, w: _0x3a2deb, h: _0x5cdba6, angle: _0x20e2ba } = _0x160805;
            _0x3d3ff3["set"](_0x462b86, { "x": _0x16d1fb, "y": _0xef9abb, "w": _0x3a2deb, "h": _0x5cdba6, "angle": _0x20e2ba, "id": _0x462b86, "groupId": "" });
          } else
            _0x1ac355["push"](_0x160805);
        }
      }
      return _0x5804df(_0x1ac355), _0x3d3ff3;
    }
    ["getActiveObjects"]() {
      return this["_activeObjects"];
    }
    ["getObjectById"](_0x45239f) {
      const _0x34e4c9 = this["getObjects"]();
      let _0x1c655f;
      const _0x46b2db = (_0x28c9b8) => {
        for (let _0x574969 = 0; _0x574969 < _0x28c9b8["length"]; _0x574969++) {
          if (_0x1c655f)
            return;
          const _0x54a9b9 = _0x28c9b8[_0x574969];
          _0x54a9b9["id"] === _0x45239f && (_0x1c655f = _0x54a9b9), _0x54a9b9["objects"] && _0x54a9b9["objects"]["length"] && _0x46b2db(_0x54a9b9["objects"]);
        }
      };
      return _0x46b2db(_0x34e4c9), _0x1c655f;
    }
    ["getObjectsByCondition"](_0x44185f) {
      const _0x59f8cf = this["getObjects"](), _0x235120 = [], _0x3f5f38 = (_0x413d95) => {
        for (let _0x4fbb65 = 0; _0x4fbb65 < _0x413d95["length"]; _0x4fbb65++) {
          const _0x5b8fcd = _0x413d95[_0x4fbb65];
          _0x44185f(_0x5b8fcd) && _0x235120["push"](_0x5b8fcd), _0x5b8fcd["objects"] && _0x5b8fcd["objects"]["length"] && _0x3f5f38(_0x5b8fcd["objects"]);
        }
      };
      return _0x3f5f38(_0x59f8cf), _0x235120;
    }
    ["discardActiveObject"]() {
      this["_activeObject"] && this["_activeObject"]["disposeControls"](), this["_activeObject"] = null, this["_activeObjects"] = [], this["group"] && this["objectHandler"]["exitGroup"](), this["selectionUpdated"]();
    }
    ["selectionUpdated"]() {
      const _0x1e9ffa = this["getActiveObjects"]();
      this["fire"]("selection:updated", _0x1e9ffa);
    }
    ["initTypeCount"]() {
      this["typeCounts"] = {};
      const _0x557e42 = (_0x5b2816) => {
        _0x5b2816["forEach"]((_0x307f94) => {
          const _0x5df16e = _0x307f94["component"]["name"];
          this["typeCounts"][_0x5df16e] = (this["typeCounts"][_0x5df16e] || 0) + 1;
          if (_0x307f94["objects"] && _0x307f94["objects"]["length"])
            _0x557e42(_0x307f94["objects"]);
        });
      };
      _0x557e42(this["objects"]);
    }
    ["getTypeCountName"](_0x23c327) {
      this["updateTypeCount"](_0x23c327);
      const _0x52eb9a = _0x23c327["component"], _0x144506 = _0x52eb9a["name"], _0x31738a = _0x52eb9a["title"], _0x85fa5f = _0x31738a + "_" + this["typeCounts"][_0x144506];
      return _0x85fa5f;
    }
    ["updateTypeCount"](_0x269a48) {
      const _0x17589b = _0x269a48["component"], _0x30cc52 = _0x17589b["name"];
      this["typeCounts"][_0x30cc52] = (this["typeCounts"][_0x30cc52] || 0) + 1;
    }
    ["deleteTypeCount"](_0x58757e) {
      const _0x2141f2 = _0x58757e["component"], _0x37c300 = _0x2141f2["name"];
      this["typeCounts"][_0x37c300] && (this["typeCounts"][_0x37c300] === 0 && delete this["typeCounts"][_0x37c300]);
    }
    ["add"](_0x16d92c) {
      for (let _0x1f0cb7 = 0; _0x1f0cb7 < _0x16d92c["length"]; _0x1f0cb7++) {
        const _0xedd5cc = _0x16d92c[_0x1f0cb7];
        if (!_0xedd5cc["name"]) {
          const _0x41f129 = this["getTypeCountName"](_0xedd5cc);
          _0xedd5cc["name"] = _0x41f129;
        }
        this["objects"]["push"](_0xedd5cc);
      }
      return Promise["resolve"]("ok");
    }
    ["calcGroupPositionBySubs"](_0x327842) {
      const _0x7e79aa = [], _0x1f344f = editorUtil["getObjectCenter"](_0x327842);
      _0x327842["objects"]["forEach"]((_0x1df8e4) => {
        let _0x436c1e = editorUtil["getObjectCenter"](_0x1df8e4);
        _0x436c1e["x"] += _0x327842["x"], _0x436c1e["y"] += _0x327842["y"], _0x436c1e = editorUtil["rotatePoint"](_0x436c1e, _0x1f344f, _0x327842["angle"]);
        const _0x23b85f = { "x": _0x436c1e["x"] - _0x1df8e4["w"] / 2, "y": _0x436c1e["y"] - _0x1df8e4["h"] / 2, "w": _0x1df8e4["w"], "h": _0x1df8e4["h"], "angle": _0x1df8e4["angle"] + _0x327842["angle"] }, { tl: _0x407818, tr: _0x390330, bl: _0x35eb63, br: _0x263265 } = editorUtil["getCoords"](_0x23b85f);
        _0x7e79aa["push"](_0x407818, _0x390330, _0x35eb63, _0x263265);
      });
      const _0x304260 = editorUtil["computeOBB"](_0x7e79aa, _0x327842["angle"]);
      return _0x304260;
    }
    ["calcGroupContainerPositionBySubs"](_0x285224) {
      const _0x242404 = this["calcGroupPositionBySubs"](_0x285224), _0x1f71e8 = editorUtil["composeMatrix"]({ "tx": _0x242404["x"], "ty": _0x242404["y"], "angle": _0x242404["angle"] }), _0x239227 = [], _0x41014c = (_0x2f627d) => {
        if (_0x2f627d["group"]) {
          const _0x2a5c44 = editorUtil["getObjMatrix"](_0x2f627d["group"]);
          _0x239227["push"](_0x2a5c44), _0x41014c(_0x2f627d["group"]);
        }
      };
      _0x41014c(_0x285224);
      const _0x5c085f = editorUtil["multiplyMatrix"]([_0x285224["editor"]["viewportTransform"], ..._0x239227, _0x1f71e8]), { tx: _0x24ca84, ty: _0x83c1f7, sx: _0x49c3b8, sy: _0x4b89ae, angle: _0x26377b } = editorUtil["decomposeMatrix"](_0x5c085f), _0x2bffb0 = { "x": _0x24ca84, "y": _0x83c1f7, "w": _0x242404["w"] * _0x49c3b8, "h": _0x242404["h"] * _0x4b89ae, "angle": _0x26377b };
      return _0x2bffb0;
    }
    ["emit"](_0xa2f32d, _0x12bc1c) {
      this["emitter"]["emit"](_0xa2f32d, _0x12bc1c || this);
    }
    ["fire"](_0x1336ea, _0x201713) {
      this["emitter"]["emit"](_0x1336ea, _0x201713 || this);
    }
    ["off"](_0x29f0fc, _0x445ebc) {
      typeof _0x29f0fc === "object" ? Object["keys"](_0x29f0fc)["forEach"]((_0xd26d85) => {
        this["emitter"]["off"](_0xd26d85, _0x29f0fc[_0xd26d85]);
      }) : this["emitter"]["off"](_0x29f0fc, _0x445ebc);
    }
    ["on"](_0x15bd53, _0x20b007) {
      typeof _0x15bd53 === "object" ? Object["keys"](_0x15bd53)["forEach"]((_0x303373) => {
        this["emitter"]["on"](_0x303373, _0x15bd53[_0x303373]);
      }) : this["emitter"]["on"](_0x15bd53, _0x20b007);
    }
    ["importData"](_0x30d91f) {
      const { objects: _0x3e8d3d, viewportTransform: _0x589a4c } = _0x30d91f, _0x50ce8b = this["dataEnlivenObjects"](_0x3e8d3d);
      return this["viewportTransform"] = _0x589a4c, this["zoomHandler"]["setRightBar"](), this["zoomHandler"]["setBottomBar"](), this["zoomHandler"]["handleViewportTransform"](), this["setObjects"](_0x50ce8b), this["group"] && (this["group"] = this["getObjectById"](this["group"]["id"])), this["discardActiveObject"](), this["initTypeCount"](), Promise["resolve"]("");
    }
    ["setLines"](_0x36e9c9) {
      this["rulerAdsorbHandler"]["setLines"](_0x36e9c9);
    }
    ["layerChange"]() {
      this["fire"]("layer:change", this["objects"]);
    }
    ["editorPanzoom"](_0x3b150f) {
      this["fire"]("editor:panzoom", _0x3b150f);
      const _0x155f97 = this["getActiveObject"]();
      _0x155f97 && _0x155f97["updateControlsPosition"]();
      if (this["mode"] === "draw")
        ;
    }
    ["getMousePosition"](_0x2e65ce) {
      const _0x65fc42 = document["querySelector"](this["containerId"]), { left: _0x531115, top: _0x5eda97 } = _0x65fc42["getBoundingClientRect"](), { scrollLeft: _0x2a602c, scrollTop: _0x9a0e8 } = _0x65fc42;
      let _0xe31672 = { "x": _0x2e65ce["clientX"] - _0x531115 + _0x2a602c, "y": _0x2e65ce["clientY"] - _0x5eda97 + _0x9a0e8 };
      return _0xe31672;
    }
    ["getMouseInnerPosition"](_0x114bd6) {
      const _0x7d0af4 = inverse(this["viewportTransform"]);
      let _0x446c71 = this["getMousePosition"](_0x114bd6);
      return _0x446c71 = applyToPoint(_0x7d0af4, _0x446c71), _0x446c71;
    }
    ["getMousePositionInObject"](_0x5222e9, _0x404c0a) {
      const _0xce6c22 = editorUtil["getTotalMatrix"](_0x404c0a, !![], !![]), _0x4ac2e1 = inverse(_0xce6c22);
      let _0x3cf127 = this["getMousePosition"](_0x5222e9);
      return _0x3cf127 = applyToPoint(_0x4ac2e1, _0x3cf127), _0x3cf127;
    }
    ["getEditorBounding"]() {
      const { offsetWidth: _0x58b7d8, offsetHeight: _0x11fe0c } = this["editorDom"], { viewportTransform: { a: _0x3baaaa, e: _0x1fedbf, f: _0x29b230 } } = this, _0x19dc19 = _0x58b7d8 / _0x3baaaa, _0x56a0e4 = _0x11fe0c / _0x3baaaa, _0x9be727 = -_0x1fedbf / _0x3baaaa, _0x239c3d = -_0x29b230 / _0x3baaaa;
      return { "startX": _0x9be727, "startY": _0x239c3d, "centerX": _0x9be727 + _0x19dc19 / 2, "centerY": _0x239c3d + _0x56a0e4 / 2, "width": _0x19dc19, "height": _0x56a0e4 };
    }
    ["findTarget"](_0x323ff5, _0x218348 = ![]) {
      const _0x3a3d8d = this["getMouseInnerPosition"](_0x323ff5), _0x224100 = this["getActiveObject"]();
      if (_0x224100 && _0x224100["type"] === "activeSelection" && !(_0x323ff5["ctrlKey"] || _0x323ff5["metaKey"] || _0x323ff5["shiftKey"])) {
        const _0x3c92ee = editorUtil["isPointInside"](_0x3a3d8d, _0x224100);
        if (_0x3c92ee)
          return _0x224100;
      }
      const _0x5dd544 = this["group"] ? this["group"]["objects"] : this["objects"];
      for (let _0x4f2b31 = _0x5dd544["length"] - 1; _0x4f2b31 >= 0; _0x4f2b31--) {
        const _0x371309 = _0x5dd544[_0x4f2b31], _0x40b30b = _0x218348 ? !![] : !_0x371309["locked"];
        if (_0x371309["visible"] && _0x40b30b && editorUtil["isPointInside"](_0x3a3d8d, _0x371309["getGlobalPosition"]()))
          return _0x371309;
      }
      return null;
    }
    ["toJSON"]() {
      const _0x4c29a1 = this["objects"]["map"]((_0x187184) => _0x187184["toJSON"]()), { viewportTransform: _0x1fcd14 } = this;
      return { "viewportTransform": _0x1fcd14, "objects": _0x4c29a1 };
    }
    ["getIntersectObjs"](_0x498fdd, _0x10dd7f) {
      const _0x3bb712 = [], _0x59489a = this["config"]["selectionMode"] == "complete";
      return _0x10dd7f["forEach"]((_0x33d062) => {
        let _0x35995c = ![];
        if (!_0x33d062["locked"] && _0x33d062["visible"]) {
          const _0x26fe09 = _0x33d062["getGlobalPosition"](), _0x242bd7 = editorUtil["getBBox"](_0x26fe09);
          if (!editorUtil["isRectIntersect"](_0x498fdd, _0x242bd7, _0x59489a))
            _0x35995c = ![];
          else {
            if (_0x26fe09["angle"] % 90 === 0)
              _0x35995c = !![];
            else {
              const _0x1561fc = editorUtil["getPositionCenter"](_0x26fe09), { x: _0x8dafa7, y: _0xb62f76, w: _0x84db75, h: _0x57ab9c } = _0x498fdd, { angle: _0x4bf2ad } = _0x26fe09, _0x25de94 = editorUtil["rotatePoint"]({ "x": _0x8dafa7, "y": _0xb62f76 }, _0x1561fc, -_0x4bf2ad), _0x4a6485 = editorUtil["rotatePoint"]({ "x": _0x8dafa7 + _0x84db75, "y": _0xb62f76 }, _0x1561fc, -_0x4bf2ad), _0x22d31a = editorUtil["rotatePoint"]({ "x": _0x8dafa7, "y": _0xb62f76 + _0x57ab9c }, _0x1561fc, -_0x4bf2ad), _0x351e70 = editorUtil["rotatePoint"]({ "x": _0x8dafa7 + _0x84db75, "y": _0xb62f76 + _0x57ab9c }, _0x1561fc, -_0x4bf2ad), _0x37058d = Math["min"](_0x25de94["x"], _0x4a6485["x"], _0x22d31a["x"], _0x351e70["x"]), _0x312812 = Math["min"](_0x25de94["y"], _0x4a6485["y"], _0x22d31a["y"], _0x351e70["y"]), _0x2fb00e = Math["max"](_0x25de94["x"], _0x4a6485["x"], _0x22d31a["x"], _0x351e70["x"]) - _0x37058d, _0x1c18ea = Math["max"](_0x25de94["y"], _0x4a6485["y"], _0x22d31a["y"], _0x351e70["y"]) - _0x312812, _0x4d3fcf = { "x": _0x37058d, "y": _0x312812, "w": _0x2fb00e, "h": _0x1c18ea };
              _0x35995c = editorUtil["isRectIntersect"](_0x4d3fcf, _0x26fe09, _0x59489a);
            }
          }
        }
        _0x35995c && _0x3bb712["push"](_0x33d062);
      }), _0x3bb712;
    }
    ["plainObjectToClass"](_0x2d5fc4) {
      return _0x1deaa8["getInstance"](this, _0x2d5fc4);
    }
    ["parseObjects"](_0x42c8ac) {
      const _0x8f15bd = _0x42c8ac ? Array["isArray"](_0x42c8ac) ? _0x42c8ac : [_0x42c8ac] : [];
      return _0x8f15bd["map"]((_0x2c635e) => this["plainObjectToClass"](_0x2c635e));
    }
    ["dataEnlivenObjects"](_0x35bbfe) {
      let _0x2db280 = [];
      return (_0x35bbfe == null ? void 0 : _0x35bbfe["length"]) && _0x35bbfe["forEach"]((_0x3f8cec) => {
        const _0x17a9ab = this["plainObjectToClass"](_0x3f8cec);
        _0x2db280["push"](_0x17a9ab);
      }), _0x2db280;
    }
    ["jsonObjectsToGroup"](_0x40fa26 = []) {
      const _0x353554 = (_0x39ecaf) => {
        _0x39ecaf["forEach"]((_0x3f3732) => {
          _0x3f3732["id"] = editorUtil["nanoid"](8), _0x3f3732["objects"] && _0x3f3732["objects"]["length"] && _0x353554(_0x3f3732["objects"]);
        });
      }, _0x5a115e = this["dataEnlivenObjects"](_0x40fa26);
      _0x353554(_0x5a115e);
      const { groupAttrs: _0x3d98eb } = this["config"], { x: _0x53e754, y: _0x4db412, w: _0x3c6ff0, h: _0x507925 } = editorUtil["getBoundingRect"](_0x5a115e), _0x3c4b75 = _0x1deaa8["getInstance"](this, __spreadProps(__spreadValues({ "type": "group" }, cloneDeep(_0x3d98eb)), { "x": _0x53e754, "y": _0x4db412, "w": _0x3c6ff0, "h": _0x507925, "angle": 0 }));
      return _0x5a115e["forEach"]((_0x7d3a5a) => {
        _0x7d3a5a["id"] = editorUtil["nanoid"](8), _0x7d3a5a["x"] -= _0x53e754, _0x7d3a5a["y"] -= _0x4db412, _0x7d3a5a["group"] = _0x3c4b75, _0x3c4b75["objects"]["push"](_0x7d3a5a);
      }), _0x3c4b75;
    }
    ["getActiveObjectJSON"]() {
      const _0x1d3c1c = this["getActiveObject"]();
      return _0x1d3c1c ? _0x1d3c1c["toJSON"]() : null;
    }
    ["getActiveObjectPositionState"](_0x174999 = ObjectAttrsEnum["position"]) {
      const _0x3e4d11 = this["getActiveObjects"](), _0x594026 = [], _0x3070a8 = [];
      return _0x3e4d11["forEach"]((_0xbb2c43) => {
        const _0x3edcf1 = _0xbb2c43["group"] || this, _0x595e45 = _0x3edcf1["objects"]["findIndex"]((_0x1ddc3b) => _0x1ddc3b["id"] === _0xbb2c43["id"]), _0x456955 = _0xbb2c43["group"] ? _0xbb2c43["group"]["id"] : null;
        _0x3070a8["push"]({ "data": _0x174999 === ObjectAttrsEnum["position"] ? _0xbb2c43["getPosition"]() : _0xbb2c43["toJSON"](), "index": _0x595e45, "parentId": _0x456955 }), _0x456955 && _0x594026["push"](_0x3edcf1["getPosition"]());
      }), { "activeSelection": this["getActiveSelectionPosition"](), "data": _0x3070a8, "groupPositions": _0x594026 };
    }
    ["getZoom"]() {
      const { viewportTransform: _0x4a1f22 } = this;
      return _0x4a1f22["a"];
    }
    ["getObjectsParentRelationship"](_0x94c975) {
      const _0x5c63ce = [], _0x322b84 = (_0x541a8d) => {
        let _0x3456ea = "", _0x48ea25 = [];
        const _0x597a23 = (_0x15c94c) => {
          const _0x27dce9 = _0x15c94c["group"] || _0x15c94c["editor"], _0x2a97a8 = _0x27dce9["objects"]["findIndex"]((_0x33396b) => _0x33396b["id"] === _0x15c94c["id"]);
          _0x3456ea = "" + _0x2a97a8 + _0x3456ea, _0x27dce9 && _0x27dce9["type"] === "group" && (_0x48ea25["push"](_0x27dce9["id"]), _0x597a23(_0x27dce9));
        };
        return _0x597a23(_0x541a8d), { "path": _0x3456ea, "parentIdList": _0x48ea25 };
      };
      return _0x94c975 = _0x94c975 || [], _0x94c975["forEach"]((_0x2f1ab2) => {
        const _0x54a6da = _0x2f1ab2["group"] || _0x2f1ab2["editor"];
        _0x5c63ce["push"](__spreadValues({ "parentId": _0x2f1ab2["group"] ? _0x2f1ab2["group"]["id"] : "", "index": _0x54a6da["objects"]["findIndex"]((_0x5032d7) => _0x5032d7["id"] === _0x2f1ab2["id"]), "target": _0x2f1ab2 }, _0x322b84(_0x2f1ab2)));
      }), _0x5c63ce;
    }
    ["analysisName"](_0x838221) {
      _0x838221 = _0x838221 || "";
      let _0x2d3f8d = "", _0xdeb6ad = 0;
      const _0x250d58 = _0x838221["split"]("_"), _0x2a34d3 = _0x250d58[_0x250d58["length"] - 1];
      return isNaN(+_0x2a34d3) ? _0x2d3f8d = _0x838221 : (_0x2d3f8d = _0x250d58["slice"](0, _0x250d58["length"] - 1)["join"]("_"), _0xdeb6ad = +_0x2a34d3), { "prefix": _0x2d3f8d, "index": _0xdeb6ad };
    }
    ["getNamesMap"]() {
      const _0x4d7d96 = {};
      return editorUtil["traverse"](this["getObjects"](), "objects", (_0x5942ca) => {
        const _0x46f597 = _0x5942ca["name"] || "", { prefix: _0x5dce7d, index: _0x349076 } = this["analysisName"](_0x46f597);
        _0x4d7d96[_0x5dce7d] ? _0x4d7d96[_0x5dce7d] = Math["max"](_0x4d7d96[_0x5dce7d], _0x349076) : _0x4d7d96[_0x5dce7d] = _0x349076;
      }), _0x4d7d96;
    }
    ["generateUniqueName"](_0x79aaf8) {
      _0x79aaf8 = _0x79aaf8 || "";
      const _0x18bbb1 = {};
      editorUtil["traverse"](this["getObjects"](), "objects", (_0x33c873) => {
        const _0xc6abcb = _0x33c873["name"] || "";
        if (_0xc6abcb["startsWith"](_0x79aaf8)) {
          const { prefix: _0x5c1f30, index: _0x4f56d0 } = this["analysisName"](_0xc6abcb);
          _0x18bbb1[_0x5c1f30] ? _0x18bbb1[_0x5c1f30] = Math["max"](_0x18bbb1[_0x5c1f30], _0x4f56d0) : _0x18bbb1[_0x5c1f30] = _0x4f56d0;
        }
      });
      const { prefix: _0x3cabe3 } = this["analysisName"](_0x79aaf8);
      return _0x18bbb1[_0x3cabe3] ? _0x3cabe3 + "_" + (_0x18bbb1[_0x3cabe3] + 1) : _0x79aaf8;
    }
    ["destroy"]() {
      this["watermarkHandler"] && this["watermarkHandler"]["destroy"]();
    }
  }
  const appConfig = { "version": "core-v0.0.1", "name": "datavis-core", "description": "核心库" };
  const version = appConfig["version"];
  exports2.datavisCore = DatavisEngine;
  exports2.default = DatavisEngine;
  exports2.editorUtil = editorUtil;
  exports2.version = version;
  Object.defineProperties(exports2, { __esModule: { value: true }, [Symbol.toStringTag]: { value: "Module" } });
});
