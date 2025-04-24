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

  function mitt(n) {
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
  var INFINITY$3 = 1 / 0;
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
    return result == "0" && 1 / value == -INFINITY$3 ? "-0" : result;
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
  var INFINITY$2 = 1 / 0, MAX_INTEGER = 17976931348623157e292;
  function toFinite(value) {
    if (!value) {
      return value === 0 ? value : 0;
    }
    value = toNumber(value);
    if (value === INFINITY$2 || value === -INFINITY$2) {
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
  function noop() {
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
  function baseIsNaN(value) {
    return value !== value;
  }
  function strictIndexOf(array, value, fromIndex) {
    var index = fromIndex - 1, length = array.length;
    while (++index < length) {
      if (array[index] === value) {
        return index;
      }
    }
    return -1;
  }
  function baseIndexOf(array, value, fromIndex) {
    return value === value ? strictIndexOf(array, value, fromIndex) : baseFindIndex(array, baseIsNaN, fromIndex);
  }
  function arrayIncludes(array, value) {
    var length = array == null ? 0 : array.length;
    return !!length && baseIndexOf(array, value, 0) > -1;
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
  var INFINITY$1 = 1 / 0;
  function toKey(value) {
    if (typeof value == "string" || isSymbol(value)) {
      return value;
    }
    var result = value + "";
    return result == "0" && 1 / value == -INFINITY$1 ? "-0" : result;
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
  var LARGE_ARRAY_SIZE$2 = 200;
  function stackSet(key, value) {
    var data = this.__data__;
    if (data instanceof ListCache) {
      var pairs = data.__data__;
      if (!Map$1 || pairs.length < LARGE_ARRAY_SIZE$2 - 1) {
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
  function arrayIncludesWith(array, value, comparator) {
    var index = -1, length = array == null ? 0 : array.length;
    while (++index < length) {
      if (comparator(value, array[index])) {
        return true;
      }
    }
    return false;
  }
  var LARGE_ARRAY_SIZE$1 = 200;
  function baseDifference(array, values, iteratee, comparator) {
    var index = -1, includes = arrayIncludes, isCommon = true, length = array.length, result = [], valuesLength = values.length;
    if (!length) {
      return result;
    }
    if (iteratee) {
      values = arrayMap(values, baseUnary(iteratee));
    }
    if (comparator) {
      includes = arrayIncludesWith;
      isCommon = false;
    } else if (values.length >= LARGE_ARRAY_SIZE$1) {
      includes = cacheHas;
      isCommon = false;
      values = new SetCache(values);
    }
    outer:
      while (++index < length) {
        var value = array[index], computed = iteratee == null ? value : iteratee(value);
        value = comparator || value !== 0 ? value : 0;
        if (isCommon && computed === computed) {
          var valuesIndex = valuesLength;
          while (valuesIndex--) {
            if (values[valuesIndex] === computed) {
              continue outer;
            }
          }
          result.push(value);
        } else if (!includes(values, computed, comparator)) {
          result.push(value);
        }
      }
    return result;
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
  var INFINITY = 1 / 0;
  var createSet = !(Set$1 && 1 / setToArray(new Set$1([, -0]))[1] == INFINITY) ? noop : function(values) {
    return new Set$1(values);
  };
  var LARGE_ARRAY_SIZE = 200;
  function baseUniq(array, iteratee, comparator) {
    var index = -1, includes = arrayIncludes, length = array.length, isCommon = true, result = [], seen = result;
    if (comparator) {
      isCommon = false;
      includes = arrayIncludesWith;
    } else if (length >= LARGE_ARRAY_SIZE) {
      var set = iteratee ? null : createSet(array);
      if (set) {
        return setToArray(set);
      }
      isCommon = false;
      includes = cacheHas;
      seen = new SetCache();
    } else {
      seen = iteratee ? [] : result;
    }
    outer:
      while (++index < length) {
        var value = array[index], computed = iteratee ? iteratee(value) : value;
        value = comparator || value !== 0 ? value : 0;
        if (isCommon && computed === computed) {
          var seenIndex = seen.length;
          while (seenIndex--) {
            if (seen[seenIndex] === computed) {
              continue outer;
            }
          }
          if (iteratee) {
            seen.push(computed);
          }
          result.push(value);
        } else if (!includes(seen, computed, comparator)) {
          if (seen !== result) {
            seen.push(computed);
          }
          result.push(value);
        }
      }
    return result;
  }
  function baseXor(arrays, iteratee, comparator) {
    var length = arrays.length;
    if (length < 2) {
      return length ? baseUniq(arrays[0]) : [];
    }
    var index = -1, result = Array(length);
    while (++index < length) {
      var array = arrays[index], othIndex = -1;
      while (++othIndex < length) {
        if (othIndex != index) {
          result[index] = baseDifference(result[index] || array, arrays[othIndex], iteratee, comparator);
        }
      }
    }
    return baseUniq(baseFlatten(result, 1), iteratee, comparator);
  }
  var xor = baseRest(function(arrays) {
    return baseXor(arrayFilter(arrays, isArrayLikeObject));
  });
  const nanoStr = "1234567890abcdefghijklmnopqrstuvwxyz";
  const nanoid = customAlphabet(nanoStr, 8);
  const treeToList = (treeData, childField) => {
    let queen = [];
    const out = [];
    if (!treeData || treeData.length === 0) {
      return out;
    }
    queen = queen.concat(treeData);
    while (queen.length) {
      const first = queen.shift();
      if (first[childField]) {
        queen = queen.concat(first[childField]);
      }
      out.push(first);
    }
    return out;
  };
  const componentMerge = (object, sources, notComponent = false) => {
    if (notComponent)
      return merge(object, sources);
    const option = sources.option;
    if (!option)
      return merge(object, sources);
    sources.option = void 0;
    if (option) {
      return __spreadProps(__spreadValues({}, merge(object, sources)), {
        option
      });
    }
  };
  const setAttributes = (el, attrs) => {
    for (const key in attrs) {
      el.setAttribute(key, attrs[key]);
    }
  };
  const hideDoms = (doms) => {
    doms.forEach((dom) => {
      dom.style.display = "none";
    });
  };
  const showDoms = (doms, display = "block") => {
    doms.forEach((dom) => {
      dom.style.display = display;
    });
  };
  const traverse = (arr, childField, callback) => {
    arr = arr || [];
    arr.forEach((item) => {
      callback(item);
      const children = item[childField];
      if (children) {
        traverse(children, childField, callback);
      }
    });
  };
  const logError = (str) => {
    return console.error(str);
  };
  const logWarning = (str) => {
    return console.warn(str);
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
  const getBBox = (rect) => {
    const { tl, tr, bl, br } = getCoords(rect);
    const xArr = [tl.x, tr.x, bl.x, br.x];
    const yArr = [tl.y, tr.y, bl.y, br.y];
    let minX = Math.min(...xArr);
    let minY = Math.min(...yArr);
    let maxX = Math.max(...xArr);
    let maxY = Math.max(...yArr);
    return {
      x: minX,
      y: minY,
      w: maxX - minX,
      h: maxY - minY
    };
  };
  const isRectIntersect = (rect1, rect2, isComplete = false) => {
    const { x: x1, y: y1, w: w1, h: h1 } = rect1;
    const { x: x2, y: y2, w: w2, h: h2 } = rect2;
    let flag = x1 <= x2 + w2 && x1 + w1 >= x2 && y1 <= y2 + h2 && y1 + h1 >= y2;
    if (isComplete) {
      flag = x1 <= x2 && x1 + w1 >= x2 + w2 && y1 <= y2 && y1 + h1 >= y2 + h2;
    }
    return flag;
  };
  const rotatePoint = (p1 = { x: 0, y: 0 }, p2 = { x: 0, y: 0 }, angle) => {
    const dx = p1.x - p2.x;
    const dy = p1.y - p2.y;
    const theta = angle * (Math.PI / 180);
    const newX = dx * Math.cos(theta) - dy * Math.sin(theta) + p2.x;
    const newY = dx * Math.sin(theta) + dy * Math.cos(theta) + p2.y;
    return { x: newX, y: newY };
  };
  const getCoords = (obj = { x: 0, y: 0, w: 0, h: 0, angle: 0 }) => {
    const { x, y, w, h, angle = 0 } = obj;
    const centerPoint = { x: x + w / 2, y: y + h / 2 };
    let [tl, tr, bl, br] = [
      { x, y },
      { x: x + w, y },
      { x, y: y + h },
      { x: x + w, y: y + h }
    ];
    [tl, tr, bl, br] = [
      rotatePoint(tl, centerPoint, angle),
      rotatePoint(tr, centerPoint, angle),
      rotatePoint(bl, centerPoint, angle),
      rotatePoint(br, centerPoint, angle)
    ];
    const [l, r, t, b] = [
      { x: (tl.x + bl.x) / 2, y: (tl.y + bl.y) / 2 },
      { x: (tr.x + br.x) / 2, y: (tr.y + br.y) / 2 },
      { x: (tl.x + tr.x) / 2, y: (tl.y + tr.y) / 2 },
      { x: (bl.x + br.x) / 2, y: (bl.y + br.y) / 2 }
    ];
    return { tl, tr, bl, br, l, r, t, b };
  };
  const getBoundingRect = (objs, angle = 0) => {
    const xArr = [];
    const yArr = [];
    const points = [];
    objs.forEach((obj) => {
      const worldPos = obj.getGlobalPosition();
      const { tl, tr, bl, br } = getCoords(worldPos);
      xArr.push(tl.x, tr.x, bl.x, br.x);
      yArr.push(tl.y, tr.y, bl.y, br.y);
      points.push(tl, tr, bl, br);
    });
    let minX = Math.min(...xArr);
    let minY = Math.min(...yArr);
    let maxX = Math.max(...xArr);
    let maxY = Math.max(...yArr);
    if (angle) {
      return computeOBB(points, angle);
    }
    return {
      x: minX,
      y: minY,
      w: maxX - minX,
      h: maxY - minY,
      angle: 0
    };
  };
  const getRelativeBoundingRect = (objs, angle = 0) => {
    const xArr = [];
    const yArr = [];
    const points = [];
    objs.forEach((obj) => {
      const { tl, tr, bl, br } = getCoords(obj);
      xArr.push(tl.x, tr.x, bl.x, br.x);
      yArr.push(tl.y, tr.y, bl.y, br.y);
      points.push(tl, tr, bl, br);
    });
    let minX = Math.min(...xArr);
    let minY = Math.min(...yArr);
    let maxX = Math.max(...xArr);
    let maxY = Math.max(...yArr);
    if (angle) {
      return computeOBB(points, angle);
    }
    return {
      x: minX,
      y: minY,
      w: maxX - minX,
      h: maxY - minY,
      angle: 0
    };
  };
  const getPositionRect = (objs) => {
    const xArr = [];
    const yArr = [];
    objs.forEach((obj) => {
      const { tl, tr, bl, br } = getCoords(obj);
      xArr.push(tl.x, tr.x, bl.x, br.x);
      yArr.push(tl.y, tr.y, bl.y, br.y);
    });
    let minX = Math.min(...xArr);
    let minY = Math.min(...yArr);
    let maxX = Math.max(...xArr);
    let maxY = Math.max(...yArr);
    return {
      x: minX,
      y: minY,
      w: maxX - minX,
      h: maxY - minY
    };
  };
  const getDOMMatrix = (obj) => {
    const { a, b, c, d, e, f } = obj;
    return new DOMMatrix([a, b, c, d, e, f]);
  };
  const multiplyMatrix = (matrixList) => {
    let matrix = getDOMMatrix(matrixList[0]);
    for (let i = 1; i < matrixList.length; i++) {
      const matrix2 = getDOMMatrix(matrixList[i]);
      matrix = matrix.multiply(matrix2);
    }
    const { a, b, c, d, e, f } = matrix;
    return { a, b, c, d, e, f };
  };
  const getObjectCenter = (obj) => {
    const { x, y, w, h } = obj;
    return {
      x: x + w / 2,
      y: y + h / 2
    };
  };
  const getPositionCenter = (position) => {
    const { x, y, w, h } = position;
    return {
      x: x + w / 2,
      y: y + h / 2
    };
  };
  const composeMatrix = ({ tx = 0, ty = 0, sx = 1, sy = 1, angle = 0 }) => {
    const radians = angle * Math.PI / 180;
    const cosValue = Math.cos(radians);
    const sinValue = Math.sin(radians);
    return {
      a: sx * cosValue,
      b: sinValue,
      c: -sinValue,
      d: sy * cosValue,
      e: tx,
      f: ty
    };
  };
  const decomposeMatrix = (matrix) => {
    const {
      rotation,
      scale: { sx, sy },
      translate: { tx, ty }
    } = decomposeTSR(matrix);
    const angle = rotation.angle * 180 / Math.PI;
    return { tx, ty, sx, sy, angle };
  };
  const getAngle = (p1 = { x: 0, y: 0 }, p2 = { x: 0, y: 0 }) => {
    const [deltaX, deltaY] = [p2.x - p1.x, p2.y - p1.y];
    const radians = Math.atan2(deltaY, deltaX);
    const angle = radians * (180 / Math.PI);
    return (angle - 90 + 360) % 360;
  };
  const isPointInside = (point, position) => {
    const { tl, tr, bl, br } = getCoords(position);
    const { x: rx, y: ry } = point;
    let rectVertices = [
      { x: tl.x, y: tl.y },
      { x: tr.x, y: tr.y },
      { x: br.x, y: br.y },
      { x: bl.x, y: bl.y }
    ];
    let inside = false;
    for (let i = 0, j = rectVertices.length - 1; i < rectVertices.length; j = i++) {
      if (rectVertices[i].y > ry != rectVertices[j].y > ry && rx < (rectVertices[j].x - rectVertices[i].x) * (ry - rectVertices[i].y) / (rectVertices[j].y - rectVertices[i].y) + rectVertices[i].x) {
        inside = !inside;
      }
    }
    return inside;
  };
  const getPositionFromCoords = (coords, angle) => {
    let { tl, br, tr } = coords;
    const newCenter = { x: (tl.x + br.x) / 2, y: (tl.y + br.y) / 2 };
    const newtl = rotatePoint(tl, newCenter, -angle);
    const newtr = rotatePoint(tr, newCenter, -angle);
    const newbr = rotatePoint(br, newCenter, -angle);
    const w = newtr.x - newtl.x;
    const h = newbr.y - newtr.y;
    const x = newCenter.x - w / 2;
    const y = newCenter.y - h / 2;
    return {
      x,
      y,
      w,
      h,
      angle
    };
  };
  const getTotalMatrix = (obj, includeEditorMatrix = true, includeOneself = false) => {
    const matrixList = [];
    if (includeEditorMatrix) {
      matrixList.push(obj.editor.viewportTransform);
    }
    if (includeOneself) {
      const { x, y, angle } = obj;
      matrixList.push(composeMatrix({ tx: x, ty: y, angle }));
    }
    const recursion = (item) => {
      if (item.group) {
        const { x, y, angle } = item.group;
        const matrix = composeMatrix({ tx: x, ty: y, angle });
        matrixList.push(matrix);
        recursion(item.group);
      }
    };
    recursion(obj);
    if (!matrixList.length) {
      return { a: 1, b: 0, c: 0, d: 1, e: 0, f: 0 };
    }
    return multiplyMatrix(matrixList);
  };
  const getObjMatrix = (obj) => {
    const { x: tx, y: ty, angle } = obj;
    return composeMatrix({ tx, ty, angle });
  };
  const applyMatrix = (obj, matrix) => {
    const objMatrix = getObjMatrix(obj);
    const { tx, ty, angle } = decomposeMatrix(multiplyMatrix([objMatrix, matrix]));
    obj.x = tx;
    obj.y = ty;
    obj.angle = angle;
    return obj;
  };
  const getApplyMatrixPosition = (obj, matrix) => {
    const objMatrix = getObjMatrix(obj);
    const deMatrix = decomposeMatrix(matrix);
    const { tx, ty, angle } = decomposeMatrix(multiplyMatrix([objMatrix, matrix]));
    const position = {
      x: tx,
      y: ty,
      angle,
      w: obj.w * deMatrix.sx,
      h: obj.h * deMatrix.sy
    };
    return position;
  };
  const createSvgElement = (tagName, attrs = {}, style = {}) => {
    const element = document.createElementNS("http://www.w3.org/2000/svg", tagName);
    if (attrs) {
      Object.keys(attrs).forEach((key) => {
        element.setAttribute(key, attrs[key]);
      });
    }
    if (style) {
      Object.assign(element.style, style);
    }
    return element;
  };
  const updateSvgElement = (svgDom, attrs = {}, style) => {
    Object.keys(attrs).forEach((key) => {
      svgDom.setAttribute(key, attrs[key]);
    });
    if (style) {
      Object.assign(svgDom.style, style);
    }
  };
  function computeCentroid(points) {
    let [minX, maxX, minY, maxY] = [points[0].x, points[0].x, points[0].y, points[0].y];
    for (let point of points) {
      minX = Math.min(minX, point.x);
      maxX = Math.max(maxX, point.x);
      minY = Math.min(minY, point.y);
      maxY = Math.max(maxY, point.y);
    }
    return {
      x: (minX + maxX) / 2,
      y: (minY + maxY) / 2
    };
  }
  function buildOBB(points, centroid, eigenVectors) {
    let obb = {
      center: centroid,
      halfExtents: { x: 0, y: 0 },
      orientation: { x: 0, y: 0 }
    };
    for (let point of points) {
      let dx = point.x - centroid.x;
      let dy = point.y - centroid.y;
      let xLength = Math.abs(dx * eigenVectors[0][0] + dy * eigenVectors[0][1]);
      let yLength = Math.abs(dx * eigenVectors[1][0] + dy * eigenVectors[1][1]);
      obb.halfExtents.x = Math.max(obb.halfExtents.x, xLength);
      obb.halfExtents.y = Math.max(obb.halfExtents.y, yLength);
    }
    obb.orientation.x = Math.atan2(eigenVectors[0][1], eigenVectors[0][0]);
    obb.orientation.y = Math.atan2(eigenVectors[1][1], eigenVectors[1][0]);
    return obb;
  }
  function getAngleVectors(angle) {
    let radians = angle * Math.PI / 180;
    let x1 = Math.cos(radians);
    let y1 = Math.sin(radians);
    let x2 = -y1;
    let y2 = x1;
    return [
      [x1, y1],
      [x2, y2]
    ];
  }
  const getProjection = (point, angle) => {
    const { x, y } = point;
    const vector = getAngleVectors(angle);
    const xLength = x * vector[0][0] + y * vector[0][1];
    const yLength = x * vector[1][0] + y * vector[1][1];
    return { xLength, yLength };
  };
  function computeOBB(points, angle) {
    let centroid = computeCentroid(points);
    let eigenVectors = getAngleVectors(angle);
    let { center, halfExtents } = buildOBB(points, centroid, eigenVectors);
    const obj = { x: center.x - halfExtents.x, y: center.y - halfExtents.y, w: halfExtents.x * 2, h: halfExtents.y * 2, angle };
    return obj;
  }
  const getPathStr = (path) => path.reduce((pre, cur) => {
    const command = cur[0];
    return pre + `${command} ${cur.slice(1).join(" ")} `;
  }, "");
  function cubicBezierBoundingBox(x0, y0, x1, y1, x2, y2, x3, y3) {
    const tValues = findBezierExtrema(x0, x1, x2, x3).concat(findBezierExtrema(y0, y1, y2, y3));
    const points = tValues.map((t) => bezierPoint(x0, y0, x1, y1, x2, y2, x3, y3, t));
    points.push([x0, y0], [x3, y3]);
    const xs = points.map((p) => p[0]);
    const ys = points.map((p) => p[1]);
    return {
      minX: Math.min(...xs),
      minY: Math.min(...ys),
      maxX: Math.max(...xs),
      maxY: Math.max(...ys)
    };
  }
  function bezierPoint(x0, y0, x1, y1, x2, y2, x3, y3, t) {
    const u = 1 - t;
    const x = __pow(u, 3) * x0 + 3 * __pow(u, 2) * t * x1 + 3 * u * __pow(t, 2) * x2 + __pow(t, 3) * x3;
    const y = __pow(u, 3) * y0 + 3 * __pow(u, 2) * t * y1 + 3 * u * __pow(t, 2) * y2 + __pow(t, 3) * y3;
    return [x, y];
  }
  function findBezierExtrema(p0, p1, p2, p3) {
    const a = -p0 + 3 * p1 - 3 * p2 + p3;
    const b = 2 * (p0 - 2 * p1 + p2);
    const c = -p0 + p1;
    const discriminant = __pow(b, 2) - 4 * a * c;
    if (discriminant < 0)
      return [];
    if (a === 0)
      return b === 0 ? [] : [-c / b].filter((t) => t >= 0 && t <= 1);
    const t1 = (-b + Math.sqrt(discriminant)) / (2 * a);
    const t2 = (-b - Math.sqrt(discriminant)) / (2 * a);
    return [t1, t2].filter((t) => t >= 0 && t <= 1);
  }
  const getPathBoundingBox = (path) => {
    let minX = Infinity, minY = Infinity, maxX = -Infinity, maxY = -Infinity;
    let currentX = 0, currentY = 0;
    path.forEach((segment) => {
      const type = segment[0];
      const points = segment.slice(1);
      switch (type) {
        case "M":
          currentX = points[0];
          currentY = points[1];
          break;
        case "L":
          points.forEach((p, i) => {
            if (i % 2 === 0) {
              currentX = p;
            } else {
              currentY = p;
            }
            minX = Math.min(minX, currentX);
            minY = Math.min(minY, currentY);
            maxX = Math.max(maxX, currentX);
            maxY = Math.max(maxY, currentY);
          });
          break;
        case "C":
          for (let i = 0; i < points.length; i += 6) {
            const x0 = currentX, y0 = currentY;
            const [x1, y1, x2, y2, x3, y3] = points.slice(i, i + 6);
            const bbox = cubicBezierBoundingBox(x0, y0, x1, y1, x2, y2, x3, y3);
            minX = Math.min(minX, bbox.minX);
            minY = Math.min(minY, bbox.minY);
            maxX = Math.max(maxX, bbox.maxX);
            maxY = Math.max(maxY, bbox.maxY);
            currentX = x3;
            currentY = y3;
          }
          break;
      }
    });
    return {
      x: minX,
      y: minY,
      width: maxX - minX,
      height: maxY - minY
    };
  };
  const isPointOnBezierCurve = (x, y, x0, y0, x1, y1, x2, y2, x3, y3, distance = 2.5) => {
    let obj = null;
    for (let t = 0; t <= 1; t += 2e-3) {
      let [pointX, pointY] = bezierPoint(x0, y0, x1, y1, x2, y2, x3, y3, t);
      if (Math.abs(pointX - x) < distance && Math.abs(pointY - y) < distance) {
        obj = {
          x: pointX,
          y: pointY,
          t
        };
        break;
      }
    }
    return obj;
  };
  const isPointArroundPath = (point, path, distance) => {
    let toAddPoint = null;
    for (let i = 0; i < path.length - 1; i++) {
      const path1 = path[i];
      const path2 = path[i + 1];
      let arr = [point.x, point.y];
      arr = arr.concat(i === 0 ? [path1[1], path1[2]] : [path1[5], path1[6]]);
      arr = arr.concat(path2.slice(1));
      arr.push(distance);
      const obj = isPointOnBezierCurve.apply(null, arr);
      if (obj) {
        toAddPoint = {
          index: i + 1,
          x: obj.x,
          y: obj.y,
          t: obj.t
        };
        break;
      }
    }
    return toAddPoint;
  };
  const splitBezierCurve = (p1, p2, p3, p4, t) => {
    const a = lerp(p1, p2, t);
    const b = lerp(p2, p3, t);
    const c = lerp(p3, p4, t);
    const d = lerp(a, b, t);
    const e = lerp(b, c, t);
    const f = lerp(d, e, t);
    return [
      [p1, a, d, f],
      [f, e, c, p4]
    ];
  };
  const lerp = (p1, p2, t) => {
    return {
      x: p1.x + (p2.x - p1.x) * t,
      y: p1.y + (p2.y - p1.y) * t
    };
  };
  const getDistance = (p1, p2) => {
    let dx = p1.x - p2.x;
    let dy = p1.y - p2.y;
    return Math.sqrt(dx * dx + dy * dy);
  };
  const isPointArroundPolyline = (points, point, arroundDistance = 1) => {
    const { x, y } = point;
    const judgePoint = (p1, p2) => {
      let { x: x1, y: y1 } = p1;
      let { x: x2, y: y2 } = p2;
      let A = x - x1;
      let B = y - y1;
      let C = x2 - x1;
      let D = y2 - y1;
      let dot = A * C + B * D;
      let len_sq = C * C + D * D;
      let param = -1;
      if (len_sq !== 0) {
        param = dot / len_sq;
      }
      let xx, yy;
      if (param < 0) {
        xx = x1;
        yy = y1;
      } else if (param > 1) {
        xx = x2;
        yy = y2;
      } else {
        xx = x1 + param * C;
        yy = y1 + param * D;
      }
      let dx = x - xx;
      let dy = y - yy;
      return Math.sqrt(dx * dx + dy * dy);
    };
    let [isArround, centerPoint, index] = [false, { x: 0, y: 0 }, -1];
    for (let i = 0; i < points.length - 1; i++) {
      const distance = judgePoint(points[i], points[i + 1]);
      if (distance <= arroundDistance) {
        isArround = true;
        centerPoint = { x: (points[i].x + points[i + 1].x) / 2, y: (points[i].y + points[i + 1].y) / 2 };
        index = i + 1;
        break;
      }
    }
    return { isArround, x: centerPoint.x, y: centerPoint.y, index };
  };
  const resetGroupSubsSize = (group, oldSize) => {
    const ratioW = group.w / oldSize.w;
    const ratioH = group.h / oldSize.h;
    group.objects.forEach((obj) => {
      const objSize = { w: obj.w, h: obj.h };
      const coords = getCoords(obj);
      Object.values(coords).forEach((e) => {
        e.x = e.x * ratioW;
        e.y = e.y * ratioH;
      });
      const { x, y, w, h } = getPositionFromCoords(coords, obj.angle);
      obj.x = x;
      obj.y = y;
      obj.w = w;
      obj.h = h;
      if (obj.type === "polyline") {
        const oldPoints = obj.points;
        obj.points.forEach((item, index) => {
          item.x = oldPoints[index].x * ratioW;
          item.y = oldPoints[index].y * ratioH;
        });
      } else if (obj.type === "bezierCurve") {
        const oldPath = obj.path;
        obj.path.forEach((p, pIndex) => {
          p.forEach((item, index) => {
            if (index > 0) {
              const oldItem = oldPath[pIndex][index];
              p[index] = index % 2 === 0 ? oldItem * ratioH : oldItem * ratioW;
            }
          });
        });
      }
      if (obj.type === "group") {
        resetGroupSubsSize(obj, objSize);
      }
    });
  };
  const resetGroupPosition = (group) => {
    if (group.objects.length) {
      const { x, y, w, h, angle } = group.editor.calcGroupPositionBySubs(group);
      let [diffX, diffY] = [group.x - x, group.y - y];
      const groupOldLeftTop = { x: group.x, y: group.y };
      const groupOldCenter = { x: group.x + group.w / 2, y: group.y + group.h / 2 };
      const groupNewCenter = { x: x + w / 2, y: y + h / 2 };
      const groupNewLeftTop = { x, y };
      const p1 = rotatePoint(groupOldLeftTop, groupOldCenter, angle);
      const p2 = rotatePoint(groupNewLeftTop, groupNewCenter, angle);
      diffX = p1.x - p2.x;
      diffY = p1.y - p2.y;
      const { xLength, yLength } = getProjection({ x: diffX, y: diffY }, group.angle);
      diffX = xLength;
      diffY = yLength;
      group.objects.forEach((item) => {
        item.x += diffX;
        item.y += diffY;
      });
      group.x = x;
      group.y = y;
      group.w = w;
      group.h = h;
      group.angle = angle;
      if (group.group) {
        resetGroupPosition(group.group);
      }
    } else {
      group.w = 0;
      group.h = 0;
    }
  };
  var commonjsGlobal = typeof globalThis !== "undefined" ? globalThis : typeof window !== "undefined" ? window : typeof global !== "undefined" ? global : typeof self !== "undefined" ? self : {};
  function getDefaultExportFromCjs(x) {
    return x && x.__esModule && Object.prototype.hasOwnProperty.call(x, "default") ? x["default"] : x;
  }
  function commonjsRequire(path) {
    throw new Error('Could not dynamically require "' + path + '". Please configure the dynamicRequireTargets or/and ignoreDynamicRequires option of @rollup/plugin-commonjs appropriately for this require call to work.');
  }
  var localforage$1 = { exports: {} };
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
  })(localforage$1);
  var localforageExports = localforage$1.exports;
  const localforage = /* @__PURE__ */ getDefaultExportFromCjs(localforageExports);
  const mod360 = (deg) => {
    return (deg + 360) % 360;
  };
  const calculateBoundingBox = (obj) => {
    const { x, y, w, h, angle } = obj;
    const radians = angle * Math.PI / 180;
    const cosA = Math.cos(radians);
    const sinA = Math.sin(radians);
    const centerX = x + w / 2;
    const centerY = y + h / 2;
    const offsetX = w / 2;
    const offsetY = h / 2;
    const rotatePoint2 = (offsetX2, offsetY2) => ({
      x: centerX + (offsetX2 * cosA - offsetY2 * sinA),
      y: centerY + (offsetX2 * sinA + offsetY2 * cosA)
    });
    const rotatedP1 = rotatePoint2(-offsetX, -offsetY);
    const rotatedP2 = rotatePoint2(offsetX, -offsetY);
    const rotatedP3 = rotatePoint2(offsetX, offsetY);
    const rotatedP4 = rotatePoint2(-offsetX, offsetY);
    const minX = Math.min(rotatedP1.x, rotatedP2.x, rotatedP3.x, rotatedP4.x);
    const maxX = Math.max(rotatedP1.x, rotatedP2.x, rotatedP3.x, rotatedP4.x);
    const minY = Math.min(rotatedP1.y, rotatedP2.y, rotatedP3.y, rotatedP4.y);
    const maxY = Math.max(rotatedP1.y, rotatedP2.y, rotatedP3.y, rotatedP4.y);
    return {
      x: minX,
      y: minY,
      w: maxX - minX,
      h: maxY - minY,
      angle
    };
  };
  const calculateOuterBoundingBox = (rectangles) => {
    let minX = Number.MAX_VALUE;
    let minY = Number.MAX_VALUE;
    let maxX = Number.MIN_VALUE;
    let maxY = Number.MIN_VALUE;
    rectangles.forEach((item) => {
      const attr = calculateBoundingBox(item);
      minX = Math.min(minX, attr.x);
      minY = Math.min(minY, attr.y);
      maxX = Math.max(maxX, attr.x + attr.w);
      maxY = Math.max(maxY, attr.y + attr.h);
    });
    const width = maxX - minX;
    const height = maxY - minY;
    return {
      x: minX,
      y: minY,
      w: width,
      h: height
    };
  };
  const getGridSize = (scale2) => {
    if (scale2 <= 0.25)
      return 40;
    if (scale2 <= 0.5)
      return 20;
    if (scale2 <= 1)
      return 10;
    if (scale2 <= 2)
      return 5;
    if (scale2 <= 4)
      return 2;
    return 1;
  };
  const FONT_SCALE = 0.83;
  const shadowSize = 8 / 8;
  const drawHorizontalRuler = ({ ctx, start, shadow, config, colorConfig }) => {
    const { scale: scale2, width, height, ratio } = config;
    const { bgColor, fontColor, shadowColor, shadowFontColor, longfgColor, shortfgColor } = colorConfig;
    ctx.scale(ratio, ratio);
    ctx.clearRect(0, 0, width, height);
    ctx.fillStyle = bgColor;
    ctx.fillRect(0, 0, width, height);
    if (shadow.enable) {
      const shadowX = (shadow.x - start) * scale2;
      const shadowWidth = shadow.width * scale2;
      ctx.fillStyle = shadowColor;
      ctx.fillRect(shadowX, 0, shadowWidth, height * shadowSize);
    }
    const gridSize = getGridSize(scale2);
    const gridPixel = gridSize * scale2;
    const gridSize_10 = gridSize * 10;
    const gridPixel_10 = gridSize_10 * scale2;
    const startValue = Math.floor(start / gridSize) * gridSize;
    const startValue_10 = Math.floor(start / gridSize_10) * gridSize_10;
    const offsetX = (startValue - start) / gridSize * gridPixel;
    const offsetX_10 = (startValue_10 - start) / gridSize_10 * gridPixel_10;
    const endValue = start + Math.ceil(width / scale2);
    ctx.beginPath();
    ctx.fillStyle = fontColor;
    ctx.strokeStyle = longfgColor;
    for (let value = startValue_10, count = 0; value < endValue; value += gridSize_10, count++) {
      const x = offsetX_10 + count * gridPixel_10 + 0.5;
      ctx.moveTo(x, 0);
      ctx.save();
      ctx.translate(x, height * 0.4);
      ctx.scale(FONT_SCALE / ratio, FONT_SCALE / ratio);
      ctx.fillText(value, 4 * ratio, 7 * ratio);
      ctx.restore();
      ctx.lineTo(x, height * 9 / 16);
    }
    ctx.stroke();
    ctx.closePath();
    ctx.beginPath();
    ctx.strokeStyle = shortfgColor;
    for (let value = startValue, count = 0; value < endValue; value += gridSize, count++) {
      const x = offsetX + count * gridPixel + 0.5;
      ctx.moveTo(x, 0);
      if (value % gridSize_10 !== 0) {
        ctx.lineTo(x, height * 1 / 4);
      }
    }
    ctx.stroke();
    ctx.closePath();
    if (shadow.enable) {
      const shadowX = (shadow.x - start) * scale2;
      const shadowWidth = shadow.width * scale2;
      ctx.fillStyle = shadowFontColor;
      if (shadowWidth > 0) {
        const startNumber = Number(shadow.x).toFixed(0);
        const endNumber = Number(shadow.x + shadow.width).toFixed(0);
        const textMetrics = ctx.measureText(startNumber);
        ctx.fillText(startNumber, shadowX - textMetrics.width - 3, height * 10 / 16);
        ctx.fillText(endNumber, shadowX + shadowWidth + 2, height * 10 / 16);
      }
    }
    ctx.setTransform(1, 0, 0, 1, 0, 0);
  };
  const drawVerticalRuler = ({ ctx, start, shadow, config, colorConfig }) => {
    const { scale: scale2, width, height, ratio } = config;
    const { bgColor, fontColor, shadowColor, shadowFontColor, longfgColor, shortfgColor } = colorConfig;
    ctx.scale(ratio, ratio);
    ctx.clearRect(0, 0, width, height);
    ctx.fillStyle = bgColor;
    ctx.fillRect(0, 0, width, height);
    if (shadow.enable) {
      const shadowY = (shadow.y - start) * scale2;
      const shadowHeight = shadow.height * scale2;
      ctx.fillStyle = shadowColor;
      ctx.fillRect(0, shadowY, width * shadowSize, shadowHeight);
    }
    const gridSize = getGridSize(scale2);
    const gridPixel = gridSize * scale2;
    const gridSize_10 = gridSize * 10;
    const gridPixel_10 = gridSize_10 * scale2;
    const startValue = Math.floor(start / gridSize) * gridSize;
    const startValue_10 = Math.floor(start / gridSize_10) * gridSize_10;
    const offsetY = (startValue - start) / gridSize * gridPixel;
    const offsetY_10 = (startValue_10 - start) / gridSize_10 * gridPixel_10;
    const endValue = start + Math.ceil(height / scale2);
    ctx.beginPath();
    ctx.fillStyle = fontColor;
    ctx.strokeStyle = longfgColor;
    for (let value = startValue_10, count = 0; value < endValue; value += gridSize_10, count++) {
      const y = offsetY_10 + count * gridPixel_10 + 0.5;
      ctx.moveTo(0, y);
      ctx.save();
      ctx.translate(width * 0.4, y);
      ctx.rotate(-Math.PI / 2);
      ctx.scale(FONT_SCALE / ratio, FONT_SCALE / ratio);
      ctx.fillText(value, 4 * ratio, 7 * ratio);
      ctx.restore();
      ctx.lineTo(width * 9 / 16, y);
    }
    ctx.stroke();
    ctx.closePath();
    ctx.beginPath();
    ctx.strokeStyle = shortfgColor;
    for (let value = startValue, count = 0; value < endValue; value += gridSize, count++) {
      const y = offsetY + count * gridPixel + 0.5;
      ctx.moveTo(0, y);
      if (value % gridSize_10 !== 0) {
        ctx.lineTo(width * 1 / 4, y);
      }
    }
    ctx.stroke();
    ctx.closePath();
    if (shadow.enable) {
      const shadowY = (shadow.y - start) * scale2;
      const shadowHeight = shadow.height * scale2;
      ctx.fillStyle = shadowFontColor;
      if (shadowHeight > 0) {
        ctx.save();
        const startNumber = Number(shadow.y).toFixed(0);
        const endNumber = Number(shadow.y + shadow.height).toFixed(0);
        ctx.translate(0, shadowY);
        ctx.rotate(-Math.PI / 2);
        ctx.fillText(startNumber, 2, width * 9 / 16);
        ctx.restore();
        ctx.save();
        const textMetrics = ctx.measureText(startNumber);
        ctx.translate(0, shadowY + shadowHeight + textMetrics.width + 10);
        ctx.rotate(-Math.PI / 2);
        ctx.fillText(endNumber, 2, width * 9 / 16);
      }
    }
    ctx.setTransform(1, 0, 0, 1, 0, 0);
  };
  const editorUtil = {
    nanoid,
    sortBy: sortBy$1,
    find: find$1,
    cloneDeep,
    findIndex,
    updateSvgElement,
    componentMerge,
    localforage,
    treeToList,
    calculateBoundingBox,
    calculateOuterBoundingBox,
    mod360,
    composeMatrix,
    decomposeMatrix,
    getBoundingRect,
    rotatePoint,
    getObjectCenter,
    getCoords,
    getAngle,
    isPointInside,
    getPositionFromCoords,
    multiplyMatrix,
    createSvgElement,
    getPositionCenter,
    getPositionRect,
    getBBox,
    isRectIntersect,
    getTotalMatrix,
    applyMatrix,
    getObjMatrix,
    getApplyMatrixPosition,
    computeOBB,
    getAngleVectors,
    getProjection,
    getPathStr,
    getPathBoundingBox,
    isPointOnBezierCurve,
    isPointArroundPath,
    splitBezierCurve,
    isPointArroundPolyline,
    setAttributes,
    hideDoms,
    showDoms,
    getDistance,
    traverse,
    logError,
    logWarning,
    resetGroupSubsSize,
    resetGroupPosition,
    getRelativeBoundingRect
  };
  class ElementHandler {
    constructor(editor) {
      this.editor = editor;
      this.classNamePrefix = editor.config.classNamePrefix || "DATAVIS";
      this.initialize();
    }
    initialize() {
      this.initEditorDom();
      this.initCanvasDom();
    }
    initLayers() {
      this.initOverLayer();
      this.initControlLayer();
      this.initDrawLayer();
    }
    // 获取 编辑器dom
    initEditorDom() {
      const { editor } = this;
      editor.editorDom = document.querySelector(editor.containerId);
      const handleMouseMove = (e) => {
        editor.fire("editor:mousemove", { e });
      };
      const handleMouseUp = (e) => {
        editor.fire("editor:mouseup", { e });
        document.removeEventListener("mousemove", handleMouseMove);
        document.removeEventListener("mouseup", handleMouseUp);
      };
      editor.editorDom.addEventListener("mousedown", (e) => {
        let target = editor.findTarget(e);
        editor.fire("editor:mousedown", { e, target });
        document.addEventListener("mousemove", handleMouseMove);
        document.addEventListener("mouseup", handleMouseUp);
      });
    }
    // 画布区dom
    initCanvasDom() {
      const { editor } = this;
      editor.canvasDom = document.querySelector(editor.config.canvas);
      editor.canvasDom.style.transformOrigin = "left top";
    }
    // 初始化 辅助层 dom
    initOverLayer() {
      const { editor } = this;
      const overLayerElement = document.createElement("div");
      overLayerElement.className = `${this.classNamePrefix}-over-layer`;
      editor.overLayer = overLayerElement;
      editor.editorDom.appendChild(overLayerElement);
    }
    // 初始化绘制层 (采用svg)
    initDrawLayer() {
      const { editor } = this;
      const svg = editorUtil.createSvgElement("svg", { class: `${this.classNamePrefix}-draw-layer` });
      editor.drawLayer = svg;
      editor.canvasDom.appendChild(svg);
    }
    // 初始化控制点层 (采用svg)
    initControlLayer() {
      const { editor } = this;
      const layer = editorUtil.createSvgElement(
        "svg",
        { class: `${this.classNamePrefix}-control-layer` },
        { width: "100%", height: "100%", overflow: "visible" }
      );
      editor.controlLayer = layer;
      editor.editorDom.appendChild(layer);
    }
  }
  class AlignHandler {
    constructor(editor) {
      this.distance = 0;
      this.editor = editor;
    }
    align(type, distance = 0) {
      const editor = this.editor;
      const config = editor.config;
      this.distance = +distance;
      const calculateBoundingBox2 = editor.util.calculateBoundingBox;
      const calculateOuterBoundingBox2 = editor.util.calculateOuterBoundingBox;
      const alignLeft = (rectangles) => {
        let outerBoundingBox = {
          x: 0
        };
        if (rectangles.length > 1) {
          outerBoundingBox = calculateOuterBoundingBox2(rectangles);
        }
        const outerLeftX = outerBoundingBox.x;
        rectangles.forEach((item) => {
          const innerBoundingBox = calculateBoundingBox2(item);
          const innerLeftX = innerBoundingBox.x;
          const moveDistanceX = outerLeftX - innerLeftX;
          item.x += moveDistanceX;
        });
      };
      const alignRight = (rectangles) => {
        let outerBoundingBox = {
          x: 0,
          w: config.width
        };
        if (rectangles.length > 1) {
          outerBoundingBox = calculateOuterBoundingBox2(rectangles);
        }
        const outerRightX = outerBoundingBox.x + outerBoundingBox.w;
        rectangles.forEach((item) => {
          const innerBoundingBox = calculateBoundingBox2(item);
          const innerRightX = innerBoundingBox.x + innerBoundingBox.w;
          const moveDistanceX = outerRightX - innerRightX;
          item.x += moveDistanceX;
        });
      };
      const alignCenterX = (rectangles) => {
        let outerBoundingBox = {
          x: 0,
          w: config.width
        };
        if (rectangles.length > 1) {
          outerBoundingBox = calculateOuterBoundingBox2(rectangles);
        }
        const outerCenterX = outerBoundingBox.x + outerBoundingBox.w / 2;
        rectangles.forEach((item) => {
          const innerBoundingBox = calculateBoundingBox2(item);
          const innerCenterX = innerBoundingBox.x + innerBoundingBox.w / 2;
          const moveDistanceX = outerCenterX - innerCenterX;
          item.x += moveDistanceX;
        });
      };
      const alignTop = (rectangles) => {
        let outerBoundingBox = {
          y: 0
        };
        if (rectangles.length > 1) {
          outerBoundingBox = calculateOuterBoundingBox2(rectangles);
        }
        const outerTopY = outerBoundingBox.y;
        rectangles.forEach((item) => {
          const innerBoundingBox = calculateBoundingBox2(item);
          const innerTopY = innerBoundingBox.y;
          const moveDistanceY = outerTopY - innerTopY;
          item.y += moveDistanceY;
        });
      };
      const alignCenterY = (rectangles) => {
        let outerBoundingBox = {
          y: 0,
          h: config.height
        };
        if (rectangles.length > 1) {
          outerBoundingBox = calculateOuterBoundingBox2(rectangles);
        }
        const outerCenter = outerBoundingBox.y + outerBoundingBox.h / 2;
        rectangles.forEach((item) => {
          const innerBoundingBox = calculateBoundingBox2(item);
          const innerCenter = innerBoundingBox.y + innerBoundingBox.h / 2;
          const moveDistance = outerCenter - innerCenter;
          item.y += moveDistance;
        });
      };
      const alignBottom = (rectangles) => {
        let outerBoundingBox = {
          y: 0,
          h: config.height
        };
        if (rectangles.length > 1) {
          outerBoundingBox = calculateOuterBoundingBox2(rectangles);
        }
        const outerTopY = outerBoundingBox.y + outerBoundingBox.h;
        rectangles.forEach((item) => {
          const innerBoundingBox = calculateBoundingBox2(item);
          const innerTopY = innerBoundingBox.y + innerBoundingBox.h;
          const moveDistanceY = outerTopY - innerTopY;
          item.y += moveDistanceY;
        });
      };
      const distributeHorizontally = (rectangles) => {
        const outerBoundingBox = calculateOuterBoundingBox2(rectangles);
        const outerWidth = outerBoundingBox.w;
        const totalInnerWidth = rectangles.reduce((total, item) => {
          const innerBoundingBox = calculateBoundingBox2(item);
          return total + innerBoundingBox.w;
        }, 0);
        const spaceBetween = this.distance || (outerWidth - totalInnerWidth) / (rectangles.length - 1);
        rectangles.sort((a, b) => {
          const boxA = calculateBoundingBox2(a);
          const boxB = calculateBoundingBox2(b);
          return boxA.x - boxB.x;
        });
        const leftBoundary = outerBoundingBox.x;
        let currentX = leftBoundary;
        rectangles.forEach((item, index) => {
          const innerBoundingBox = calculateBoundingBox2(item);
          if (index > 0 && index < rectangles.length - 1) {
            const targetX = currentX + innerBoundingBox.w / 2;
            const moveDistanceX = targetX - (item.x + innerBoundingBox.w / 2);
            item.x += moveDistanceX;
          }
          currentX += innerBoundingBox.w + spaceBetween;
        });
        const rightBoundary = currentX - spaceBetween;
        const rightOffset = outerBoundingBox.x + outerWidth - rightBoundary;
        if (rightOffset > 0) {
          rectangles.forEach((item, index) => {
            if (index < rectangles.length - 1) {
              item.x += rightOffset;
            }
          });
        }
      };
      const distributeVertically = (rectangles) => {
        const outerBoundingBox = calculateOuterBoundingBox2(rectangles);
        const outerHeight = outerBoundingBox.h;
        const totalInnerHeight = rectangles.reduce((total, item) => {
          const innerBoundingBox = calculateBoundingBox2(item);
          return total + innerBoundingBox.h;
        }, 0);
        const spaceBetween = this.distance || (outerHeight - totalInnerHeight) / (rectangles.length - 1);
        rectangles.sort((a, b) => {
          const boxA = calculateBoundingBox2(a);
          const boxB = calculateBoundingBox2(b);
          return boxA.y - boxB.y;
        });
        const topBoundary = outerBoundingBox.y;
        let currentY = topBoundary;
        rectangles.forEach((item, index) => {
          const innerBoundingBox = calculateBoundingBox2(item);
          if (index > 0 && index < rectangles.length - 1) {
            const targetY = currentY + innerBoundingBox.h / 2;
            const moveDistanceY = targetY - (item.y + innerBoundingBox.h / 2);
            item.y += moveDistanceY;
          }
          currentY += innerBoundingBox.h + spaceBetween;
        });
        const bottomBoundary = currentY - spaceBetween;
        const bottomOffset = outerBoundingBox.y + outerHeight - bottomBoundary;
        if (bottomOffset > 0) {
          rectangles.forEach((item, index) => {
            if (index < rectangles.length - 1) {
              item.y += bottomOffset;
            }
          });
        }
      };
      const horizontalDistance = (rectangles) => {
        rectangles.sort((a, b) => {
          const boxA = calculateBoundingBox2(a);
          const boxB = calculateBoundingBox2(b);
          return boxA.x - boxB.x;
        });
        const distance2 = this.distance;
        for (let i = 1; i < rectangles.length; i++) {
          const prevRect = rectangles[i - 1];
          const currentRect = rectangles[i];
          const prevRectBox = calculateBoundingBox2(prevRect);
          const targetX = prevRectBox.x + prevRectBox.w + distance2;
          currentRect.x = targetX;
        }
      };
      const verticalDistance = (rectangles) => {
        rectangles.sort((a, b) => {
          const boxA = calculateBoundingBox2(a);
          const boxB = calculateBoundingBox2(b);
          return boxA.y - boxB.y;
        });
        const distance2 = this.distance;
        for (let i = 1; i < rectangles.length; i++) {
          const prevRect = rectangles[i - 1];
          const currentRect = rectangles[i];
          const prevRectBox = calculateBoundingBox2(prevRect);
          const targetY = prevRectBox.y + prevRectBox.h + distance2;
          currentRect.y = targetY;
        }
      };
      const selectedWidgets = editor.getActiveObjects();
      if (!(selectedWidgets == null ? void 0 : selectedWidgets.length))
        return;
      switch (type) {
        case "left":
          alignLeft(selectedWidgets);
          break;
        case "right":
          alignRight(selectedWidgets);
          break;
        case "centerX":
          alignCenterX(selectedWidgets);
          break;
        case "top":
          alignTop(selectedWidgets);
          break;
        case "centerY":
          alignCenterY(selectedWidgets);
          break;
        case "bottom":
          alignBottom(selectedWidgets);
          break;
        case "horizontalUniform":
          distributeHorizontally(selectedWidgets);
          break;
        case "verticalUniform":
          distributeVertically(selectedWidgets);
          break;
        case "horizontalDistance":
          horizontalDistance(selectedWidgets);
          break;
        case "verticalDistance":
          verticalDistance(selectedWidgets);
          break;
      }
      editor.setActiveObjects(selectedWidgets);
      return Promise.resolve("");
    }
  }
  var HistoryTypesEnum = /* @__PURE__ */ ((HistoryTypesEnum2) => {
    HistoryTypesEnum2["attrs"] = "attrs";
    HistoryTypesEnum2["inversion"] = "inversion";
    HistoryTypesEnum2["add"] = "add";
    HistoryTypesEnum2["delete"] = "delete";
    HistoryTypesEnum2["config"] = "config";
    return HistoryTypesEnum2;
  })(HistoryTypesEnum || {});
  var ObjectAttrsEnum = /* @__PURE__ */ ((ObjectAttrsEnum2) => {
    ObjectAttrsEnum2["position"] = "position";
    ObjectAttrsEnum2["all"] = "all";
    return ObjectAttrsEnum2;
  })(ObjectAttrsEnum || {});
  class HistoryHandler {
    constructor(editor) {
      this.undoList = [];
      this.redoList = [];
      this.opLoding = false;
      this.editor = editor;
      this.editorMount();
    }
    editorMount() {
      this.editor.undo = this.undo.bind(this);
      this.editor.redo = this.redo.bind(this);
      this.editor.emitStatus = this.emitStatus.bind(this);
      this.editor.getStatus = this.getStatus.bind(this);
      this.editor.store = this.store.bind(this);
      this.editor.handleRestoreAttrs = this.handleRestoreInversion.bind(this);
      this.editor.handleRestoreInversion = this.handleRestoreInversion.bind(this);
      this.editor.handleRestoreAdd = this.handleRestoreAdd.bind(this);
      this.editor.handleRestoreDelete = this.handleRestoreDelete.bind(this);
      this.editor.handleRestoreConfig = this.handleRestoreConfig.bind(this);
      this.editor.handleRestore = this.handleRestore.bind(this);
    }
    /**
     * 撤销
     */
    undo() {
      const { undoList, redoList, editor } = this;
      if (this.opLoding) {
        return editorUtil.logWarning("please wait for the operation to complete.");
      }
      this.opLoding = true;
      editor.fire("history:before:operation", "undo");
      try {
        if (undoList.length) {
          const item = undoList.pop();
          this.operation = item;
          if (item) {
            this.handleRestore(item, redoList);
          }
        }
      } catch (error) {
        editorUtil.logError(error);
      } finally {
        this.opLoding = false;
      }
    }
    /**
     * 重做
     */
    redo() {
      const { undoList, redoList, editor } = this;
      if (this.opLoding) {
        return editorUtil.logWarning("please wait for the operation to complete.");
      }
      this.opLoding = true;
      editor.fire("history:before:operation", "redo");
      try {
        if (redoList.length) {
          const item = redoList.pop();
          this.operation = item;
          if (item) {
            this.handleRestore(item, undoList);
          }
        }
      } catch (error) {
        editorUtil.logError(error);
      } finally {
        this.opLoding = false;
      }
    }
    /**
     * 提交状态
     */
    emitStatus() {
      const editor = this.editor;
      editor.fire("history:changed", this.getStatus());
    }
    /**
     * 获取状态
     * @returns
     */
    getStatus() {
      return {
        canUndo: this.undoList.length > 0,
        canRedo: this.redoList.length > 0,
        opLoding: this.opLoding
      };
    }
    /**
     * 保存历史纪录
     *
     * @param data
     */
    store(data) {
      this.undoList.push(data);
      this.redoList = [];
    }
    /**
     * 从属性变化中恢复上一次的属性
     * @param data 数据
     * @param list 撤销/重做列表
     */
    handleRestoreAttrs(data, list) {
      const { editor } = this;
      const { from, to } = data;
      const idList = [];
      const attrsMap = {};
      let sizeAttrsList = ["w", "h"];
      let positionAttrsList = ["x", "y"];
      from.data.forEach((item) => {
        const { id } = item.data;
        Reflect.set(attrsMap, id, item.data);
        idList.push(id);
      });
      const objs = editor.getObjectsByCondition((a) => idList.includes(a.id));
      const groupList = [];
      objs.forEach((item) => {
        const attrs = attrsMap[item.id];
        const oldSize = { w: item.w, h: item.h };
        item.set(attrs);
        const keys2 = Object.keys(attrs);
        if (keys2.some((a) => sizeAttrsList.includes(a))) {
          item.handleSizeChange && item.handleSizeChange(oldSize);
        }
        if (keys2.some((a) => positionAttrsList.includes(a))) {
          if (item.group && !groupList.find((a) => a.id === item.group.id)) {
            groupList.push(item.group);
          }
        }
      });
      groupList.forEach((group) => {
        editorUtil.resetGroupPosition(group);
      });
      editor.setActiveObjectsWithPosition(objs, from.activeSelection);
      list.push({
        type: HistoryTypesEnum.attrs,
        from: to,
        to: from
      });
    }
    /**
     * 粗暴的互逆，from和to状态调换（先删掉from里的数据，再添加to里的数据）
     * @param data 数据
     * @param list 撤销/重做列表
     */
    handleRestoreInversion(data, list) {
      const { editor } = this;
      const { from, to } = data;
      const toRemoveIdList = to.data.map((a) => a.data.id);
      const toRemoveList = editor.getObjectsByCondition((a) => toRemoveIdList.includes(a.id));
      toRemoveList.forEach((item) => {
        const parent = item.group || editor;
        const findIndex2 = parent.objects.findIndex((a) => a.id === item.id);
        if (findIndex2 > -1) {
          parent.objects.splice(findIndex2, 1);
        }
      });
      const toAddList = [];
      const toResetGroupList = [];
      if (from.groupPositions) {
        from.groupPositions.forEach((item) => {
          const group = editor.getObjectById(item.id);
          const diffX = group.x - item.x;
          const diffY = group.y - item.y;
          group.set(item);
          group.objects.forEach((object) => {
            object.x += diffX;
            object.y += diffY;
          });
        });
      }
      from.data.forEach((item, index) => {
        const instance = editor.plainObjectToClass(item.data);
        const { parentId, index: realIndex } = from.data[index];
        const parent = (parentId ? editor.getObjectById(parentId) : null) || editor;
        if (parent && parent.type === "group") {
          instance.group = parent;
          if (!toResetGroupList.find((a) => a.id === parent.id)) {
            toResetGroupList.push(parent);
          }
        }
        parent.objects.splice(realIndex, 0, instance);
        toAddList.push(instance);
      });
      toResetGroupList.forEach((item) => {
        editorUtil.resetGroupPosition(item);
      });
      editor.setActiveObjectsWithPosition(toAddList, from.activeSelection);
      list.push({
        type: data.type,
        from: to,
        to: from
      });
    }
    /**
     * 处理新增对象。逆向操作，将to中的对象删除，并设置选中from中的对象
     * from标识新增之前的状态，to标识新增之后的状态，to中是新增的对象
     * @param data
     * @param list
     */
    handleRestoreAdd(data, list) {
      const { editor } = this;
      const { from, to } = data;
      const toRemoveIdList = to.data.map((a) => a.data.id);
      const toRemoveList = editor.getObjectsByCondition((a) => toRemoveIdList.includes(a.id));
      toRemoveList.sort((a, b) => {
        const aIndex = toRemoveIdList.indexOf(a.id);
        const bIndex = toRemoveIdList.indexOf(b.id);
        return bIndex - aIndex;
      });
      editor.objectHandler.remove(toRemoveList);
      const fromIdList = from.data.map((a) => a.data.id);
      const objs = editor.getObjectsByCondition((a) => fromIdList.includes(a.id));
      editor.setActiveObjectsWithPosition(objs, from.activeSelection);
      list.push({
        type: HistoryTypesEnum.delete,
        from: to,
        to: from
      });
    }
    /**
     * 处理删除对象。逆向操作，添加from中的对象并选中
     * from标识删除之前的状态，to标识删除之后的状态，被删除了，to里的数据就是空的
     * @param data
     * @param list
     */
    handleRestoreDelete(data, list) {
      const { editor } = this;
      const { from, to } = data;
      const toAddList = [];
      from.data.forEach((item, index) => {
        const instance = editor.plainObjectToClass(item.data);
        const { parentId, index: realIndex } = from.data[index];
        const parent = parentId ? editor.getObjectById(parentId) : editor;
        if (parentId) {
          instance.group = parent;
        }
        parent.objects.splice(realIndex, 0, instance);
        toAddList.push(instance);
      });
      editor.setActiveObjectsWithPosition(toAddList, from.activeSelection);
      list.push({
        type: HistoryTypesEnum.add,
        from: to,
        to: from
      });
    }
    handleRestoreConfig(data, list) {
      const { editor } = this;
      const { from, to } = data;
      Object.assign(editor.config, from);
      list.push({
        type: HistoryTypesEnum.config,
        from: to,
        to: from
      });
    }
    /**
     * 根据操作类型，进行数据恢复
     * @param data 数据
     * @param list 撤销/重做列表
     */
    handleRestore(data, list) {
      const { editor } = this;
      switch (data.type) {
        case HistoryTypesEnum.attrs:
          this.handleRestoreAttrs(data, list);
          break;
        case HistoryTypesEnum.inversion:
          this.handleRestoreInversion(data, list);
          break;
        case HistoryTypesEnum.add:
          this.handleRestoreAdd(data, list);
          break;
        case HistoryTypesEnum.delete:
          this.handleRestoreDelete(data, list);
          break;
        case HistoryTypesEnum.config:
          this.handleRestoreConfig(data, list);
          break;
      }
      editor.layerChange();
      this.emitStatus();
    }
  }
  const angleCursorList = [
    { cursor: "n", list: [[23, 68]] },
    { cursor: "ne", list: [[23, 113]] },
    { cursor: "e", list: [[113, 158]] },
    { cursor: "se", list: [[158, 203]] },
    { cursor: "s", list: [[203, 248]] },
    { cursor: "sw", list: [[248, 293]] },
    { cursor: "w", list: [[293, 338]] },
    {
      cursor: "nw",
      list: [
        [338, 360],
        [0, 23]
      ]
    }
  ];
  const initialAngle = {
    // 每个点对应的初始角度
    tl: 0,
    t: 45,
    tr: 90,
    r: 135,
    br: 180,
    b: 225,
    bl: 270,
    l: 315
  };
  const controlMap = {
    // 控制点的对角面或对面
    tl: "br",
    tr: "bl",
    bl: "tr",
    br: "tl",
    l: "r",
    r: "l",
    t: "b",
    b: "t"
  };
  const lnflectionPointList = ["tl", "tr", "bl", "br"];
  const handleResize = (mousePoint = { x: 0, y: 0 }, controlPoint, editor, ev, positionMap) => {
    const target = editor.getActiveObject();
    const objPos = positionMap.get(target.id);
    if (objPos.groupId) {
      mousePoint = convertMousePoint(mousePoint, objPos.groupId, positionMap);
    }
    const objAttr = positionMap.get(target.id);
    const coord = editorUtil.getCoords(objAttr);
    let p1 = coord[controlMap[controlPoint]];
    const objCenter = { x: objAttr.x + objAttr.w / 2, y: objAttr.y + objAttr.h / 2 };
    objCenter.x = +objCenter.x.toFixed(4);
    objCenter.y = +objCenter.y.toFixed(4);
    p1.x = +p1.x.toFixed(4);
    p1.y = +p1.y.toFixed(4);
    let slope = (objCenter.y - p1.y) / (objCenter.x - p1.x);
    const isInfinity = slope === Infinity || slope === -Infinity;
    if (["l", "r", "t", "b"].includes(controlPoint)) {
      if (isInfinity) {
        mousePoint.x = p1.x;
      } else {
        mousePoint.y = (mousePoint.x - p1.x) * slope + p1.y;
      }
    }
    let [x, y, w, h] = [0, 0, 0, 0];
    const isTop = /t/.test(controlPoint);
    const isBottom = /b/.test(controlPoint);
    const isLeft = /l/.test(controlPoint);
    const isRight = /r/.test(controlPoint);
    const isInflection = lnflectionPointList.find((item) => item === controlPoint);
    const isRatioScale = target.isRatioScale;
    const itemY = target.y;
    const itemW = target.w;
    const itemH = target.h;
    let newCenter = { x: (p1.x + mousePoint.x) / 2, y: (p1.y + mousePoint.y) / 2 };
    const newP1 = editorUtil.rotatePoint(p1, newCenter, -objAttr.angle);
    const newP2 = editorUtil.rotatePoint(mousePoint, newCenter, -objAttr.angle);
    w = Math.abs(newP1.x - newP2.x);
    h = Math.abs(newP1.y - newP2.y);
    x = newCenter.x - w / 2;
    y = newCenter.y - h / 2;
    if (isRatioScale || ev.shiftKey) {
      w = w < 10 ? 10 : w;
      h = h < 10 ? 10 : h;
      let zoomVal = w / itemW;
      if (isInflection) {
        const afterH = itemH * zoomVal;
        h = Math.round(afterH);
        if (["tl", "tr"].find((item) => item === controlPoint)) {
          y = itemY - Math.round(afterH - itemH);
        }
      } else {
        if (isLeft || isRight) {
          zoomVal = w / itemW;
          h = Math.round(itemH * zoomVal);
          y = objAttr.y;
        }
        if (isTop || isBottom) {
          zoomVal = h / itemH;
          w = Math.round(itemW * zoomVal);
          x = objAttr.x;
        }
      }
    } else {
      if (["t", "b"].includes(controlPoint)) {
        w = objAttr.w;
        x = newCenter.x - w / 2;
      } else if (["l", "r"].includes(controlPoint)) {
        h = objAttr.h;
        y = newCenter.y - h / 2;
      }
    }
    const finalAttr = { x, y, w, h, angle: objAttr.angle };
    const oldSize = { w: target.w, h: target.h };
    Object.assign(target, finalAttr);
    if (target.type === "activeSelection") {
      setActiveSelectionObjsPosition(target, positionMap);
    } else {
      target.handleSizeChange && target.handleSizeChange(oldSize);
    }
    editor.fire("object:resizing", { target });
  };
  const setActiveSelectionObjsPosition = (group, positionMap) => {
    const originGroup = positionMap.get(group.id);
    const ratioW = group.w / originGroup.w;
    const ratioH = group.h / originGroup.h;
    const originGroupCenter = { x: originGroup.x + originGroup.w / 2, y: originGroup.y + originGroup.h / 2 };
    group.objects.forEach((obj) => {
      const attr = positionMap.get(obj.id);
      let objCenter = { x: attr.x + attr.w / 2, y: attr.y + attr.h / 2 };
      objCenter = editorUtil.rotatePoint(objCenter, originGroupCenter, -originGroup.angle);
      let objX = objCenter.x - attr.w / 2 - originGroup.x;
      let objY = objCenter.y - attr.h / 2 - originGroup.y;
      let objAngle = attr.angle - originGroup.angle;
      const item = { x: objX, y: objY, w: attr.w, h: attr.h, angle: objAngle };
      const oldSize = { w: obj.w, h: obj.h };
      const coords = editorUtil.getCoords(item);
      Object.values(coords).forEach((e) => {
        e.x = e.x * ratioW;
        e.y = e.y * ratioH;
      });
      let { tl, br } = coords;
      const newCenter = { x: (tl.x + br.x) / 2, y: (tl.y + br.y) / 2 };
      const w = attr.w * ratioW;
      const h = attr.h * ratioH;
      const x = newCenter.x - w / 2 + group.x;
      const y = newCenter.y - h / 2 + group.y;
      obj.x = x;
      obj.y = y;
      obj.w = w;
      obj.h = h;
      obj.handleSizeChange && obj.handleSizeChange(oldSize);
    });
  };
  const convertMousePoint = (point, groupId, positionMap) => {
    let p = point || { x: 0, y: 0 };
    const recursion = (e) => {
      const group = positionMap.get(e);
      const { x, y, angle } = group;
      const groupMatrix = editorUtil.composeMatrix({ tx: x, ty: y, angle });
      const inverseMatrix = inverse(groupMatrix);
      p = applyToPoint(inverseMatrix, p);
      if (group.groupId) {
        recursion(group.groupId);
      }
    };
    recursion(groupId);
    return p;
  };
  const handleRotate = (mousePoint, editor) => {
    const target = editor.getActiveObject();
    let position = target.getGlobalPosition();
    const center = { x: position.x + position.w / 2, y: position.y + position.h / 2 };
    const curAngle = editorUtil.getAngle(mousePoint, center);
    const diffAngle = curAngle - position.angle;
    target.angle = curAngle;
    if (target.type === "activeSelection") {
      target.objects.forEach((item) => {
        const { x, y, w, h, angle } = item.getGlobalPosition();
        const cx = x + w / 2;
        const cy = y + h / 2;
        const p2 = editorUtil.rotatePoint({ x: cx, y: cy }, center, diffAngle);
        item.x = p2.x - w / 2 - (item.group ? item.group.getGlobalPosition().x : 0);
        item.y = p2.y - h / 2 - (item.group ? item.group.getGlobalPosition().y : 0);
        item.angle = angle + diffAngle;
      });
    }
    editor.fire("object:rotating", { target });
  };
  class RectControls {
    // 选中框容器，activeSelection要把子用虚框框起来。目前rectControls有些庞大了，逻辑复杂，后续要重构 2025/02/25 lqn
    constructor(editor, target) {
      this.controls = {
        t: { visible: true },
        b: { visible: true },
        l: { visible: true },
        r: { visible: true },
        tl: { visible: true },
        tr: { visible: true },
        bl: { visible: true },
        br: { visible: true },
        rotate: { visible: true }
      };
      this.controlDomList = [];
      this.controlGroupDom = null;
      this.activeSelectionDomList = [];
      this.editor = editor;
      this.target = target;
      const { controlLayer } = editor;
      controlLayer.innerHTML = "";
      controlLayer.setAttribute("data-id", target.id);
      const controlActionHandler = (dom, type) => {
        let [mouseX, mouseY] = [0, 0];
        let activePositionState;
        let positionMap = /* @__PURE__ */ new Map();
        let isHighPerformance = false;
        dom.addEventListener("mousedown", (e) => {
          e.stopPropagation && e.stopPropagation();
          e.preventDefault && e.preventDefault();
          if (this.target.locked && type === "rotate") {
            return editor.shortcutHandler.handleLock(false);
          }
          positionMap = editor.getPositionMap();
          mouseX = e.clientX;
          mouseY = e.clientY;
          activePositionState = editor.getActiveObjectPositionState();
          document.addEventListener("mousemove", handleMouseMove);
          document.addEventListener("mouseup", handleMouseUp);
        });
        const handleMouseMove = (moveEvent) => {
          if (!isHighPerformance) {
            isHighPerformance = true;
            editor.zoomHandler.setHighPerformance(true);
          }
          const mousePoint = editor.getMouseInnerPosition(moveEvent);
          if (type === "rotate") {
            handleRotate(mousePoint, editor);
          } else {
            handleResize(mousePoint, type, editor, moveEvent, positionMap);
          }
          this.updateControlsPosition();
        };
        const handleMouseUp = (e) => {
          isHighPerformance = false;
          editor.zoomHandler.setHighPerformance(false);
          if (mouseX !== e.clientX && mouseY !== e.clientY) {
            editor.historyHandler.store({
              type: HistoryTypesEnum.attrs,
              from: activePositionState,
              to: editor.getActiveObjectPositionState()
            });
            if (type === "rotate") {
              editor.fire("object:rotate:end", { target });
            } else {
              editor.fire("object:resize:end", { target });
            }
          }
          document.removeEventListener("mousemove", handleMouseMove);
          document.removeEventListener("mouseup", handleMouseUp);
        };
      };
      if (target.type === "activeSelection") {
        const activeSelectionDom = editorUtil.createSvgElement("g");
        target.objects.forEach((item) => {
          const itemRect = editorUtil.createSvgElement(
            "rect",
            { x: 0, y: 0, width: 0, height: 0, class: "sub-border-rect" },
            { fill: "transparent", stroke: "#2c83fb", "stroke-width": 2, "stroke-dasharray": "2 2" }
          );
          activeSelectionDom.appendChild(itemRect);
          this.activeSelectionDomList.push({ item, itemRect });
        });
        controlLayer.appendChild(activeSelectionDom);
      }
      const groupDom = editorUtil.createSvgElement("g");
      controlLayer.appendChild(groupDom);
      this.controlGroupDom = groupDom;
      const rect = editorUtil.createSvgElement("rect", { x: 0, y: 0, width: 0, height: 0, class: "border-rect" });
      groupDom.appendChild(rect);
      Object.keys(this.controls).forEach((key) => {
        if (key !== "rotate") {
          const dom = editorUtil.createSvgElement("circle", { cx: 0, cy: 0, r: 5, fill: "#ffffff", stroke: "#2c83fb" });
          const angle = (initialAngle[key] + target.angle) % 360;
          const findObj = angleCursorList.find((a) => {
            return !!a.list.find((b) => b[0] <= angle && b[1] >= angle);
          }) || { cursor: "" };
          Object.assign(dom.style, { cursor: findObj.cursor + "-resize", pointerEvents: "auto" });
          groupDom.appendChild(dom);
          controlActionHandler(dom, key);
          this.controlDomList.push({ dom, key });
        } else {
          const dom = editorUtil.createSvgElement("g", {});
          dom.innerHTML = '<foreignObject width="20" height="20" class="rotate-point"><div></div></foreignObject>';
          Object.assign(dom.style, { cursor: "move", pointerEvents: "auto" });
          controlActionHandler(dom, key);
          this.controlDomList.push({ dom, key });
          groupDom.appendChild(dom);
        }
      });
      if (target.type === "activeSelection") {
        target.objects.forEach((element) => {
        });
      } else {
        const groupRect = editorUtil.createSvgElement(
          "rect",
          { x: 0, y: 0, width: 0, height: 0, class: "group-rect" },
          { stroke: "#2c83fb", "stroke-width": "1px", fill: "transparent", "stroke-dasharray": "2 2" }
        );
        controlLayer.appendChild(groupRect);
      }
      this.updateControlsPosition();
    }
    updateControlsPosition() {
      const { editor, target, controlGroupDom } = this;
      const { controlLayer } = editor;
      const { x, y, w, h, angle } = target.getContainerPosition();
      target.locked ? controlLayer.classList.add("locked") : controlLayer.classList.remove("locked");
      const rect = controlGroupDom.querySelector(".border-rect");
      editorUtil.updateSvgElement(rect, { width: w, height: h }, { pointerEvents: target.editing ? "none" : "auto" });
      const groupStyle = {
        transform: `rotate(${angle}deg) translate(${x}px, ${y}px)`,
        transformOrigin: `${x + w / 2}px ${y + h / 2}px`
      };
      Object.assign(this.controlGroupDom.style, groupStyle);
      this.controlDomList.forEach((item) => {
        const { dom, key } = item;
        let [cx, cy] = [0, 0];
        switch (key) {
          case "t":
            cx = w / 2;
            break;
          case "b":
            cx = w / 2;
            cy = h;
            break;
          case "l":
            cy = h / 2;
            break;
          case "r":
            cx = w;
            cy = h / 2;
            break;
          case "tl":
            break;
          case "tr":
            cx = w;
            break;
          case "bl":
            cy = h;
            break;
          case "br":
            cx = w;
            cy = h;
            break;
          case "rotate":
            cx = w / 2 - 10;
            cy = -30;
            break;
        }
        const finalPoint = { x: cx, y: cy };
        if (key === "rotate") {
          dom.style.transform = `translate(${finalPoint.x}px, ${finalPoint.y}px)`;
        } else {
          dom.setAttribute("cx", finalPoint.x);
          dom.setAttribute("cy", finalPoint.y);
        }
      });
      if (target.type === "activeSelection") {
        this.activeSelectionDomList.forEach((obj) => {
          const { item, itemRect } = obj;
          const { x: x2, y: y2, w: w2, h: h2, angle: angle2 } = item.getContainerPosition();
          editorUtil.updateSvgElement(
            itemRect,
            {
              width: w2,
              height: h2
            },
            {
              transform: `rotate(${angle2}deg) translate(${x2}px, ${y2}px)`,
              transformOrigin: `${x2 + w2 / 2}px ${y2 + h2 / 2}px`
            }
          );
        });
      }
      const groupRect = controlLayer.querySelector(".group-rect");
      if (groupRect) {
        if (target.group) {
          const { x: x2, y: y2, w: w2, h: h2, angle: angle2 } = editor.calcGroupContainerPositionBySubs(target.group);
          editorUtil.updateSvgElement(
            groupRect,
            {
              width: w2,
              height: h2
            },
            {
              transform: `rotate(${angle2}deg) translate(${x2}px, ${y2}px)`,
              transformOrigin: `${x2 + w2 / 2}px ${y2 + h2 / 2}px`,
              display: "block"
            }
          );
        }
      }
    }
    /**
     * 销毁控制点
     */
    disposeControls() {
      const { editor } = this;
      editor.controlLayer.innerHTML = "";
    }
  }
  const constructHistory$2 = (target) => {
    const { id, x, y, x1, x2, y1, y2, w, h } = target;
    const parent = target.group || target.editor;
    return {
      activeSelection: null,
      data: [
        {
          data: { id, x, y, x1, x2, y1, y2, w, h },
          index: parent.objects.findIndex((a) => a.id === target.id),
          parentId: target.group ? target.group.id : null
        }
      ]
    };
  };
  class LineControls {
    // 点位对应的dom列表
    constructor(editor, target) {
      this.controls = {
        p1: { visible: true },
        p2: { visible: true }
      };
      this.pointDomList = [];
      this.editor = editor;
      this.target = target;
      const { controlLayer } = editor;
      const { locked } = target;
      controlLayer.innerHTML = "";
      controlLayer.setAttribute("data-id", target.id);
      locked ? controlLayer.classList.add("locked") : controlLayer.classList.remove("locked");
      this.initlialize();
    }
    initlialize() {
      this.createControls();
      this.updateControlsPosition();
    }
    createControlPoint() {
    }
    // 创建控制点
    createControls() {
      const { editor, target } = this;
      const { controlLayer } = editor;
      const controlActionHandler = (dom, type) => {
        let [mouseX, mouseY] = [0, 0];
        let activePositionState;
        dom.addEventListener("mousedown", (e) => {
          e.stopPropagation && e.stopPropagation();
          e.preventDefault && e.preventDefault();
          mouseX = e.clientX;
          mouseY = e.clientY;
          activePositionState = constructHistory$2(target);
          document.addEventListener("mousemove", handleMouseMove);
          document.addEventListener("mouseup", handleMouseUp);
        });
        const handleMouseMove = (e) => {
          const mousePoint = editor.getMousePositionInObject(e, target);
          let { x, y } = mousePoint;
          if (e.shiftKey) {
            const px = type === "p1" ? target.x2 : target.x1;
            const py = type === "p1" ? target.y2 : target.y1;
            const diffX = Math.abs(px - x);
            const diffY = Math.abs(py - y);
            if (diffX > diffY) {
              y = py;
            } else {
              x = px;
            }
          }
          if (type === "p1") {
            target.set({
              x1: x,
              y1: y
            });
          } else {
            target.set({
              x2: x,
              y2: y
            });
          }
          this.updateControlsPosition();
        };
        const handleMouseUp = (e) => {
          if (mouseX !== e.clientX && mouseY !== e.clientY) {
            let { x, y, x1, y1, x2, y2 } = target;
            const w = Math.abs(x2 - x1);
            const h = Math.abs(y2 - y1);
            let minX = Math.min(x1, x2);
            let minY = Math.min(y1, y2);
            x1 -= minX;
            x2 -= minX;
            x += minX;
            y1 -= minY;
            y2 -= minY;
            y += minY;
            target.set({ x, y, x1, y1, x2, y2, w, h });
            editor.historyHandler.store({
              type: HistoryTypesEnum.attrs,
              from: activePositionState,
              to: constructHistory$2(target)
            });
          }
          document.removeEventListener("mousemove", handleMouseMove);
          document.removeEventListener("mouseup", handleMouseUp);
        };
      };
      const rect = editorUtil.createSvgElement("rect", { x: 0, y: 0, width: 0, height: 0, class: "border-rect" });
      controlLayer.appendChild(rect);
      Object.keys(this.controls).forEach((key) => {
        const dom = editorUtil.createSvgElement(
          "circle",
          { stroke: "#1ab394", strokeWidth: "1", r: "5", fill: "#1ab394" },
          { pointerEvents: "auto", cursor: "move" }
        );
        controlLayer.appendChild(dom);
        controlActionHandler(dom, key);
        this.pointDomList.push({ dom, key });
      });
    }
    updateControlsPosition() {
      const { editor, target } = this;
      const { controlLayer } = editor;
      const matrix = editorUtil.getTotalMatrix(target, true, true);
      const rect = controlLayer.querySelector(".border-rect");
      let [minX, minY, maxX, maxY] = [0, 0, 0, 0];
      this.pointDomList.forEach((item, index) => {
        const { dom, key } = item;
        const { x1, y1, x2, y2 } = target;
        const point = key == "p1" ? { x: x1, y: y1 } : { x: x2, y: y2 };
        const applyPoint = applyToPoint(matrix, point);
        if (index === 0) {
          minX = maxX = applyPoint.x;
          minY = maxY = applyPoint.y;
        } else {
          minX = Math.min(minX, applyPoint.x);
          minY = Math.min(minY, applyPoint.y);
          maxX = Math.max(maxX, applyPoint.x);
          maxY = Math.max(maxY, applyPoint.y);
        }
        editorUtil.updateSvgElement(dom, { cx: applyPoint.x, cy: applyPoint.y }, { display: target.locked ? "none" : "block" });
      });
      editorUtil.updateSvgElement(
        rect,
        { x: minX, y: minY, width: maxX - minX, height: maxY - minY },
        { stroke: target.locked ? "#ff0000" : editor.controlConfig.line.stroke }
      );
    }
  }
  const constructHistory$1 = (target) => {
    const { id, x, y, w, h, points } = target;
    const parent = target.group || target.editor;
    return {
      activeSelection: null,
      data: [
        {
          data: cloneDeep({ id, x, y, w, h, points }),
          index: parent.objects.findIndex((a) => a.id === target.id),
          parentId: target.group ? target.group.id : null
        }
      ]
    };
  };
  class PolylineControls {
    // 要想成功移除document上的事件，必须使用与添加时完全相同的事件处理函数，而事件处理函数采用bind动态绑定了this，因此将事件处理函数赋予临时变量mouseMoveFun
    constructor(editor, target) {
      this.toAddPoint = {
        // 待添加的点
        index: -1,
        // 插入位置
        x: 0,
        y: 0
      };
      this.activePoint = null;
      this.pointDomList = [];
      this.editor = editor;
      this.target = target;
      const { controlLayer } = editor;
      controlLayer.innerHTML = "";
      controlLayer.setAttribute("data-id", target.id);
      this.initlialize();
    }
    initlialize() {
      this.createControls();
      this.updateControlsPosition();
    }
    // 重新设置包围盒
    resetBounding() {
      const { target } = this;
      const { points } = target;
      const firstPoint = points[0];
      const { minX, minY, maxX, maxY } = points.reduce(
        (pre, cur) => {
          pre.minX = Math.min(pre.minX, cur.x);
          pre.minY = Math.min(pre.minY, cur.y);
          pre.maxX = Math.max(pre.maxX, cur.x);
          pre.maxY = Math.max(pre.maxY, cur.y);
          return pre;
        },
        {
          minX: firstPoint.x,
          minY: firstPoint.y,
          maxX: firstPoint.x,
          maxY: firstPoint.y
        }
      );
      const [w, h] = [maxX - minX, maxY - minY];
      points.forEach((item) => {
        item.x -= minX;
        item.y -= minY;
      });
      target.set({ x: target.x + minX, y: target.y + minY, w, h, points });
    }
    // 创建控制点
    createControlPoint(point) {
      const { editor, target } = this;
      const { controlLayer } = editor;
      let activePositionState;
      let [mouseX, mouseY] = [0, 0];
      const dom = editorUtil.createSvgElement(
        "circle",
        { stroke: "#2c83fb", "stroke-width": 1, r: "5", fill: "#ffffff", class: "control-point" },
        { pointerEvents: "auto", cursor: "move" }
      );
      dom.addEventListener("mousedown", (e) => {
        e.stopPropagation && e.stopPropagation();
        e.preventDefault && e.preventDefault();
        mouseX = e.clientX;
        mouseY = e.clientY;
        activePositionState = constructHistory$1(target);
        this.activePoint = point;
        this.updateControlsPosition();
        const handleMouseMove = (moveEvent) => {
          const mousePoint = editor.getMousePositionInObject(moveEvent, target);
          const { x, y } = mousePoint;
          point.x = x;
          point.y = y;
          this.updateControlsPosition();
        };
        const handleMouseUp = (upEvent) => {
          if (mouseX !== upEvent.clientX && mouseY !== upEvent.clientY) {
            this.resetBounding();
            editor.historyHandler.store({
              type: HistoryTypesEnum.attrs,
              from: activePositionState,
              to: constructHistory$1(target)
            });
            this.updateControlsPosition();
          }
          document.removeEventListener("mousemove", handleMouseMove);
          document.removeEventListener("mouseup", handleMouseUp);
        };
        document.addEventListener("mousemove", handleMouseMove);
        document.addEventListener("mouseup", handleMouseUp);
      });
      controlLayer.appendChild(dom);
      this.pointDomList.push({ dom, point });
    }
    // 删除当前激活的控制点
    deleteActiveControlPoint() {
      if (this.activePoint) {
        const fromState = constructHistory$1(this.target);
        const index = this.target.points.findIndex((item) => item === this.activePoint);
        const domIndex = this.pointDomList.findIndex((item) => item.point === this.activePoint);
        this.pointDomList[domIndex].dom.remove();
        this.target.points.splice(index, 1);
        this.pointDomList.splice(domIndex, 1);
        this.activePoint = null;
        this.resetBounding();
        this.editor.historyHandler.store({
          type: HistoryTypesEnum.attrs,
          from: fromState,
          to: constructHistory$1(this.target)
        });
        this.updateControlsPosition();
        return true;
      }
      return false;
    }
    // 创建控制点
    createControls() {
      const { editor, target } = this;
      const { controlLayer } = editor;
      const rect = editorUtil.createSvgElement("rect", { x: 0, y: 0, width: 0, height: 0, class: "border-rect" });
      controlLayer.appendChild(rect);
      const points = target.points || [];
      points.forEach((item) => {
        this.createControlPoint(item);
      });
      const domToAddPoint = editorUtil.createSvgElement(
        "circle",
        { stroke: "#2c83fb", strokeWidth: "1", r: "5", fill: "#ffffff", class: "to-add-point" },
        { pointerEvents: "auto", cursor: "copy", display: "none" }
      );
      domToAddPoint.addEventListener("mousedown", () => {
        let activePositionState = constructHistory$1(target);
        const { x, y, index } = this.toAddPoint;
        target.points.splice(index, 0, { x, y });
        target.set({ points });
        editor.historyHandler.store({
          type: HistoryTypesEnum.attrs,
          from: activePositionState,
          to: constructHistory$1(target)
        });
        this.createControlPoint(target.points[index]);
        this.updateControlsPosition();
      });
      controlLayer.appendChild(domToAddPoint);
      this.mouseMoveFun = this.onMouseMove.bind(this);
      document.addEventListener("mousemove", this.mouseMoveFun);
    }
    updateControlsPosition() {
      const { editor, target } = this;
      const { controlLayer } = editor;
      const rect = controlLayer.querySelector(".border-rect");
      const position = target.getContainerPosition();
      editorUtil.updateSvgElement(rect, { x: position.x, y: position.y, width: position.w, height: position.h });
      if (target.locked) {
        controlLayer.classList.add("locked");
        return;
      } else {
        controlLayer.classList.remove("locked");
      }
      const matrix = editorUtil.getTotalMatrix(target, true, true);
      this.pointDomList.forEach((item) => {
        const { point, dom } = item;
        const { x, y } = point;
        const finalPoint = applyToPoint(matrix, { x, y });
        dom.setAttribute("cx", finalPoint.x);
        dom.setAttribute("cy", finalPoint.y);
        dom.setAttribute("fill", this.activePoint === point ? "#00ff00" : "#ffffff");
      });
    }
    onMouseMove(e) {
      const { editor, target } = this;
      const points = target.points || [];
      const point = editor.getMousePositionInObject(e, target);
      const strokeWidth = target.strokeWidth || 1;
      const arroundDistance = strokeWidth / 2 + 2;
      const res = editorUtil.isPointArroundPolyline(points, point, arroundDistance);
      const { controlLayer } = editor;
      const dom = controlLayer.querySelector(".to-add-point");
      if (e.target.classList.contains("control-point")) {
        dom.style.display = "none";
        return;
      }
      if (res.isArround) {
        const { x, y, index } = res;
        const matrix = editorUtil.getTotalMatrix(target, true, true);
        const point2 = applyToPoint(matrix, { x, y });
        this.toAddPoint = { x, y, index };
        dom.setAttribute("cx", point2.x);
        dom.setAttribute("cy", point2.y);
        dom.style.display = "block";
      } else {
        this.toAddPoint = { x: 0, y: 0, index: -1 };
        dom.style.display = "none";
      }
    }
    /**
     * 销毁控制点
     */
    dispose() {
      const { editor } = this;
      document.removeEventListener("mousemove", this.mouseMoveFun);
      this.mouseMoveFun = null;
      editor.controlLayer.innerHTML = "";
    }
  }
  const constructHistory = (target) => {
    const { id, x, y, w, h, path } = target;
    const parent = target.group || target.editor;
    return {
      activeSelection: null,
      data: [
        {
          data: cloneDeep({ id, x, y, w, h, path }),
          index: parent.objects.findIndex((a) => a.id === target.id),
          parentId: target.group ? target.group.id : null
        }
      ]
    };
  };
  class BezierCurveControls {
    // 当前激活的路径
    constructor(editor, target) {
      this.toAddPoint = null;
      this.pathDomList = [];
      this.activePath = null;
      this.editor = editor;
      this.target = target;
      const { controlLayer } = editor;
      controlLayer.innerHTML = "";
      controlLayer.setAttribute("data-id", target.id);
      this.initlialize();
    }
    initlialize() {
      this.createControls();
      this.updateControlsPosition();
    }
    // 重新设置包围盒
    resetBounding() {
      const { target } = this;
      const { width, height, x, y } = editorUtil.getPathBoundingBox(target.path);
      target.path.forEach((p) => {
        p.forEach((item, index) => {
          if (index > 0) {
            p[index] = index % 2 === 0 ? item - y : item - x;
          }
        });
      });
      target.set({
        x: target.x + x,
        y: target.y + y,
        w: width,
        h: height
      });
    }
    // 一段路径的终点控制函数
    createPathPoint(path) {
      const { editor, target } = this;
      const { controlLayer, controlConfig } = editor;
      let fromState;
      let [mouseX, mouseY] = [0, 0];
      const dom = editorUtil.createSvgElement("circle", __spreadProps(__spreadValues({}, controlConfig.circle), { class: "path-point" }), { pointerEvents: "auto", cursor: "move" });
      dom.addEventListener("mousedown", (e) => {
        e.stopPropagation && e.stopPropagation();
        e.preventDefault && e.preventDefault();
        [mouseX, mouseY] = [e.clientX, e.clientY];
        fromState = constructHistory(target);
        this.activePath = path;
        this.updateControlsPosition();
        const handleMouseMove = (moveEvent) => {
          const mousePoint = editor.getMousePositionInObject(moveEvent, target);
          const { x, y } = mousePoint;
          const index = target.path.findIndex((a) => a === path);
          if (index === 0) {
            path[1] = x;
            path[2] = y;
          } else {
            const diffX = x - path[5];
            const diffY = y - path[6];
            path[3] += diffX;
            path[4] += diffY;
            path[5] = x;
            path[6] = y;
            const nextPath = target.path[index + 1];
            if (index < target.path.length - 1 && nextPath[0] !== "Z") {
              nextPath[1] = 2 * path[5] - path[3];
              nextPath[2] = 2 * path[6] - path[4];
            }
          }
          this.updateControlsPosition();
        };
        const handleMouseUp = (upEvent) => {
          if (mouseX !== upEvent.clientX && mouseY !== upEvent.clientY) {
            this.resetBounding();
            this.saveHistory(fromState);
            this.updateControlsPosition();
          }
          document.removeEventListener("mousemove", handleMouseMove);
          document.removeEventListener("mouseup", handleMouseUp);
        };
        document.addEventListener("mousemove", handleMouseMove);
        document.addEventListener("mouseup", handleMouseUp);
      });
      controlLayer.appendChild(dom);
      this.pathDomList.push({ dom, path });
    }
    saveHistory(fromState) {
      const { editor, target } = this;
      editor.historyHandler.store({
        type: HistoryTypesEnum.attrs,
        from: fromState,
        to: constructHistory(target)
      });
    }
    // 删除当前激活的控制点
    deleteActiveControlPoint() {
      if (this.activePath) {
        const fromState = constructHistory(this.target);
        const index = this.target.path.findIndex((item) => item === this.activePath);
        const prePath = this.target.path[index - 1];
        const nextPath = this.target.path[index + 1];
        if (index === 0) {
          this.target.path[index + 1] = ["M", nextPath[5], nextPath[6]];
        }
        if (nextPath && prePath) {
          if (prePath[5]) {
            nextPath[1] = 2 * prePath[5] - prePath[3];
            nextPath[2] = 2 * prePath[6] - prePath[4];
          } else {
            nextPath[1] = prePath[1];
            nextPath[2] = prePath[2];
          }
        }
        this.target.path.splice(index, 1);
        this.activePath = null;
        this.resetBounding();
        this.saveHistory(fromState);
        this.createControls();
        this.updateControlsPosition();
        return true;
      }
      return false;
    }
    // 创建三阶贝塞尔曲线的控制点，以及控制线
    createControlPoint() {
      const { editor, target } = this;
      const { controlLayer } = editor;
      const controlConfig = editor.controlConfig;
      const pointList = ["control-p1", "control-p2"];
      pointList.forEach((className) => {
        const dom = editorUtil.createSvgElement(
          "circle",
          __spreadProps(__spreadValues({}, controlConfig.circle), { class: `control-point ${className}` }),
          { pointerEvents: "auto", cursor: "move" }
        );
        let mouseDownPoint = { x: 0, y: 0 };
        let fromState;
        dom.addEventListener("mousedown", (e) => {
          e.preventDefault && e.preventDefault();
          e.stopPropagation && e.stopPropagation();
          mouseDownPoint = { x: e.clientX, y: e.clientY };
          fromState = constructHistory(target);
          const handleMove = (moveEvent) => {
            const point = editor.getMousePositionInObject(moveEvent, target);
            const pathIndex = target.path.findIndex((a) => a === this.activePath);
            const nextPath = target.path[pathIndex + 1];
            if (className === "control-p1") {
              this.activePath[3] = point.x;
              this.activePath[4] = point.y;
              if (nextPath) {
                nextPath[1] = 2 * this.activePath[5] - point.x;
                nextPath[2] = 2 * this.activePath[6] - point.y;
              }
            } else {
              this.activePath[3] = 2 * this.activePath[5] - point.x;
              this.activePath[4] = 2 * this.activePath[6] - point.y;
              if (nextPath) {
                nextPath[1] = point.x;
                nextPath[2] = point.y;
              }
            }
            this.updateControlsPosition();
          };
          const handleUp = (e2) => {
            document.removeEventListener("mousemove", handleMove);
            document.removeEventListener("mouseup", handleUp);
            if (e2.clientX !== mouseDownPoint.x && e2.clientY !== mouseDownPoint.y) {
              this.resetBounding();
              this.saveHistory(fromState);
              this.updateControlsPosition();
            }
          };
          document.addEventListener("mousemove", handleMove);
          document.addEventListener("mouseup", handleUp);
        });
        controlLayer.appendChild(dom);
      });
    }
    // 创建控制点
    createControls() {
      const { editor, target } = this;
      const { controlLayer } = editor;
      const controlConfig = editor.controlConfig || {};
      this.dispose();
      const rect = editorUtil.createSvgElement("rect", { x: 0, y: 0, width: 100, height: 100, class: "border-rect" });
      controlLayer.appendChild(rect);
      const path = target.path || [];
      path.forEach((item) => {
        if (item[0] !== "Z") {
          this.createPathPoint(item);
        }
      });
      this.createControlPoint();
      const lineDom = editorUtil.createSvgElement("line", __spreadProps(__spreadValues({}, controlConfig.line), { class: "control-line" }));
      controlLayer.prepend(lineDom);
      const domToAddPoint = editorUtil.createSvgElement("circle", __spreadProps(__spreadValues({}, controlConfig.circle), { class: "to-add-point" }), { display: "none" });
      controlLayer.appendChild(domToAddPoint);
      this.mouseDownFun = this.globalMouseDown.bind(this);
      this.mouseMoveFun = this.globalMouseMove.bind(this);
      editor.editorDom.addEventListener("mousedown", this.mouseDownFun);
      editor.editorDom.addEventListener("mousemove", this.mouseMoveFun);
    }
    // 更新控制点位置
    updateControlsPosition() {
      const { editor, target, activePath } = this;
      const { controlLayer, controlConfig } = editor;
      const rect = controlLayer.querySelector(".border-rect");
      const position = target.getContainerPosition();
      editorUtil.updateSvgElement(rect, { x: position.x, y: position.y, width: position.w, height: position.h });
      if (target.locked) {
        controlLayer.classList.add("locked");
        return;
      } else {
        controlLayer.classList.remove("locked");
      }
      const matrix = editorUtil.getTotalMatrix(target, true, true);
      this.pathDomList.forEach((item) => {
        const { path, dom } = item;
        const x = path[path.length - 2];
        const y = path[path.length - 1];
        const finalPoint = applyToPoint(matrix, { x, y });
        const obj = path === activePath ? controlConfig.activeCircle : controlConfig.circle;
        dom.setAttribute("fill", obj.fill);
        editorUtil.updateSvgElement(dom, { cx: finalPoint.x, cy: finalPoint.y });
      });
      const domP1 = controlLayer.querySelector(".control-p1");
      const domP2 = controlLayer.querySelector(".control-p2");
      const domLine = controlLayer.querySelector(".control-line");
      if (activePath) {
        const p = activePath;
        const index = target.path.findIndex((a) => a === activePath);
        if (index === 0 || index === target.path.length - 1) {
          editorUtil.hideDoms([domP1, domP2, domLine]);
        } else {
          const p1 = { x: p[3], y: p[4] };
          const p2 = { x: 2 * p[5] - p[3], y: 2 * p[6] - p[4] };
          const point1 = applyToPoint(matrix, p1);
          const point2 = applyToPoint(matrix, p2);
          editorUtil.setAttributes(domP1, { cx: point1.x, cy: point1.y });
          editorUtil.setAttributes(domP2, { cx: point2.x, cy: point2.y });
          editorUtil.setAttributes(domLine, { x1: point1.x, y1: point1.y, x2: point2.x, y2: point2.y });
          editorUtil.showDoms([domP1, domP2, domLine]);
        }
      } else {
        editorUtil.hideDoms([domP1, domP2, domLine]);
      }
    }
    globalMouseMove(e) {
      const { editor, target } = this;
      const { controlLayer } = editor;
      const dom = controlLayer.querySelector(".to-add-point");
      const rect = controlLayer.querySelector(".border-rect");
      if (e.target.classList.contains("path-point")) {
        dom.style.display = "none";
        return;
      }
      const point = editor.getMousePositionInObject(e, target);
      const obj = editorUtil.isPointArroundPath(point, target.path, 2.5);
      this.toAddPoint = obj;
      if (obj) {
        rect.style.pointerEvents = "none";
        dom.style.display = "block";
        document.body.style.cursor = "copy";
        const matrix = editorUtil.getTotalMatrix(target, true, true);
        const applyPoint = applyToPoint(matrix, { x: obj.x, y: obj.y });
        editorUtil.setAttributes(dom, { cx: applyPoint.x, cy: applyPoint.y });
      } else {
        rect.style.pointerEvents = "auto";
        dom.style.display = "none";
        document.body.style.cursor = "";
      }
    }
    globalMouseDown() {
      const { target, toAddPoint } = this;
      if (toAddPoint) {
        this.toAddPoint = null;
        const fromState = constructHistory(target);
        const { x, y, index, t } = toAddPoint;
        const prePath = target.path[index - 1];
        const nexPath = target.path[index];
        const p1 = { x: prePath[prePath.length - 2], y: prePath[prePath.length - 1] };
        const p2 = { x: nexPath[1], y: nexPath[2] };
        const p3 = { x: nexPath[3], y: nexPath[4] };
        const p4 = { x: nexPath[5], y: nexPath[6] };
        const [segment1, segment2] = editorUtil.splitBezierCurve(p1, p2, p3, p4, t);
        const newPath = ["C", segment1[1].x, segment1[1].y, segment1[2].x, segment1[2].y, x, y];
        nexPath[1] = segment2[1].x;
        nexPath[2] = segment2[1].y;
        nexPath[3] = segment2[2].x;
        nexPath[4] = segment2[2].y;
        target.path.splice(index, 0, newPath);
        this.saveHistory(fromState);
        this.createPathPoint(target.path[index]);
        this.updateControlsPosition();
      }
    }
    /**
     * 销毁控制点
     */
    dispose() {
      const { editor } = this;
      editor.editorDom.removeEventListener("mousedown", this.mouseDownFun);
      editor.editorDom.removeEventListener("mousemove", this.mouseMoveFun);
      this.mouseMoveFun = null;
      this.mouseMoveFun = null;
      editor.controlLayer.innerHTML = "";
    }
  }
  class ControlsFactory {
    static getInstance(editor, target) {
      switch (target.type) {
        case "line":
          return new LineControls(editor, target);
        case "polyline":
          return new PolylineControls(editor, target);
        case "bezierCurve":
          return new BezierCurveControls(editor, target);
        default:
          return new RectControls(editor, target);
      }
    }
  }
  const ignoreKeys = ["emitter", "controls", "editor", "group"];
  class BaseObject {
    constructor(editor, option) {
      this.id = editorUtil.nanoid(8);
      this.name = "";
      this.type = "object";
      this.component = {
        // 组件，用于vue、rect等框架使用
        name: "",
        title: ""
      };
      this.stateIndex = 0;
      this.states = [];
      this.x = 0;
      this.y = 0;
      this.w = 0;
      this.h = 0;
      this.angle = 0;
      this.locked = false;
      this.visible = true;
      this.controls = null;
      this.emitter = mitt();
      this.editor = null;
      option = option || {};
      this.editor = editor;
      Object.keys(option).forEach((key) => {
        if (!ignoreKeys.includes(key)) {
          this[key] = option[key];
        }
      });
    }
    /**
     * 批量设置对象属性
     * @param key 键。如果传入key是对象则遍历该对象赋值
     * @param value 值（如果第一个参数是对象则第二个参数会被忽略）
     */
    set(key, value) {
      if (typeof key === "object") {
        Object.keys(key).forEach((k) => {
          this[k] = key[k];
        });
      } else {
        this[key] = value;
      }
    }
    on(event, callback) {
      if (typeof event === "object") {
        Object.keys(event).forEach((k) => {
          this.emitter.on(k, event[k]);
        });
      } else {
        this.emitter.on(event, callback);
      }
    }
    off(event, callback) {
      if (typeof event === "object") {
        Object.keys(event).forEach((k) => {
          this.emitter.off(k, event[k]);
        });
      } else {
        this.emitter.off(event, callback);
      }
    }
    emit(event, callback) {
      this.emitter.emit(event, callback);
    }
    /**
     * 获取当前状态
     * @returns
     */
    getState() {
      return this.states[this.stateIndex];
    }
    createControls() {
      this.controls = ControlsFactory.getInstance(this.editor, this);
    }
    disposeControls() {
      const { editor, controls } = this;
      controls && controls.dispose && controls.dispose();
      editor.controlLayer.innerHTML = "";
      this.controls = null;
    }
    updateControlsPosition() {
      this.controls && this.controls.updateControlsPosition();
    }
    toJSON() {
      const recursion = (item) => {
        const obj2 = {};
        Object.keys(item).forEach((key) => {
          if (!ignoreKeys.includes(key) && typeof item[key] !== "function" && !key.startsWith("__")) {
            if (key === "objects") {
              const subObjs = [];
              for (let i = 0; i < item.objects.length; i++) {
                subObjs.push(recursion(item.objects[i]));
              }
              Reflect.set(obj2, "objects", subObjs);
            } else {
              Reflect.set(obj2, key, cloneDeep(item[key]));
            }
          }
        });
        return obj2;
      };
      const obj = recursion(this);
      return obj;
    }
    getPosition() {
      const { id, x, y, w, h, angle } = this;
      return { id, x, y, w, h, angle };
    }
    clone() {
      const json = this.toJSON();
      return this.editor.plainObjectToClass(json);
    }
    /**
     * 获取对象的全局坐标位置信息（递归应用所有父级矩阵）
     * @returns
     */
    getGlobalPosition() {
      let objCenter = editorUtil.getObjectCenter(this);
      let itemAngle = this.angle;
      const recurssion = (obj) => {
        if (obj.group) {
          const { group } = obj;
          const groupCenter = editorUtil.getObjectCenter(group);
          objCenter.x += group.x;
          objCenter.y += group.y;
          objCenter = editorUtil.rotatePoint(objCenter, groupCenter, group.angle);
          itemAngle += group.angle;
          recurssion(group);
        }
      };
      recurssion(this);
      const { w, h } = this;
      const itemX = objCenter.x - w / 2;
      const itemY = objCenter.y - h / 2;
      const res = { x: itemX, y: itemY, w, h, angle: itemAngle };
      return res;
    }
    /**
     * 获取对象在容器中的位置（应用画布矩阵）
     * @returns
     */
    getContainerPosition() {
      const { x, y, w, h, angle } = this.getGlobalPosition();
      const { tx, ty, sx, sy } = editorUtil.decomposeMatrix(this.editor.viewportTransform);
      return {
        x: x * sx + tx,
        y: y * sy + ty,
        w: w * sx,
        h: h * sy,
        angle
      };
    }
    /**
     * 获取对象坐标信息（八个控制点坐标）
     * @param isGlobal 是否获取全局坐标位置信息
     * @returns
     */
    getCoords(isGlobal = false) {
      let obj = isGlobal ? this.getGlobalPosition() : this.getPosition();
      const { x, y, w, h, angle = 0 } = obj;
      const centerPoint = { x: x + w / 2, y: y + h / 2 };
      let [tl, tr, bl, br] = [
        { x, y },
        { x: x + w, y },
        { x, y: y + h },
        { x: x + w, y: y + h }
      ];
      [tl, tr, bl, br] = [
        editorUtil.rotatePoint(tl, centerPoint, angle),
        editorUtil.rotatePoint(tr, centerPoint, angle),
        editorUtil.rotatePoint(bl, centerPoint, angle),
        editorUtil.rotatePoint(br, centerPoint, angle)
      ];
      const [l, r, t, b] = [
        { x: (tl.x + bl.x) / 2, y: (tl.y + bl.y) / 2 },
        { x: (tr.x + br.x) / 2, y: (tr.y + br.y) / 2 },
        { x: (tl.x + tr.x) / 2, y: (tl.y + tr.y) / 2 },
        { x: (bl.x + br.x) / 2, y: (bl.y + br.y) / 2 }
      ];
      return { tl, tr, bl, br, l, r, t, b };
    }
  }
  class Group extends BaseObject {
    constructor(editor, option) {
      const cloneOption = cloneDeep(option);
      super(editor, cloneOption);
      this.type = "group";
      this.subEventTrigger = false;
      this.objects = [];
      const recursion = (arr, parent) => {
        arr = arr || [];
        for (let i = 0; i < arr.length; i++) {
          arr[i] = Factory$1.getInstance(editor, arr[i]);
          arr[i].group = parent;
          recursion(arr[i].objects, arr[i]);
        }
      };
      recursion(cloneOption.objects, this);
      this.objects = cloneOption.objects || [];
    }
    // 组合尺寸变化时，更新子对象位置信息
    handleSizeChange(oldSize) {
      editorUtil.resetGroupSubsSize(this, oldSize);
    }
  }
  class ActiveSelection extends BaseObject {
    constructor(editor, option) {
      super(editor, option);
      this.type = "activeSelection";
      this.objects = [];
      this.objects = option.objects || [];
    }
  }
  class Rect extends BaseObject {
    constructor(editor, option) {
      super(editor, option);
      this.type = "rect";
    }
  }
  class Line extends BaseObject {
    constructor(editor, option) {
      super(editor, option);
      this.type = "line";
      this.x1 = 0;
      this.y1 = 0;
      this.x2 = 0;
      this.y2 = 0;
      this.stroke = "#000000";
      this.fill = "#ffffff00";
      this.strokeWidth = 1;
      Object.assign(this, option);
    }
  }
  class Polyline extends BaseObject {
    constructor(editor, option) {
      super(editor, option);
      this.type = "polyline";
      this.points = [{ x: 0, y: 0 }];
      this.stroke = "#000000";
      this.fill = "#ffffff00";
      this.strokeWidth = 1;
      Object.assign(this, option);
    }
    handleSizeChange(oldSize) {
      const ratioW = this.w / oldSize.w;
      const ratioH = this.h / oldSize.h;
      this.points.forEach((item, index) => {
        item.x = this.points[index].x * ratioW;
        item.y = this.points[index].y * ratioH;
      });
    }
  }
  class BezierCurve extends BaseObject {
    constructor(editor, option) {
      super(editor, option);
      this.type = "bezierCurve";
      this.path = [
        ["M", 0, 0],
        ["C", -25, 0, -25, 100, 0, 100]
      ];
      this.stroke = "#000000";
      this.fill = "#ffffff00";
      this.strokeWidth = 1;
      Object.assign(this, option);
    }
    handleSizeChange(oldSize) {
      const ratioW = this.w / oldSize.w;
      const ratioH = this.h / oldSize.h;
      this.path.forEach((p, pIndex) => {
        p.forEach((item, index) => {
          if (index > 0) {
            p[index] = index % 2 === 0 ? p[index] * ratioH : p[index] * ratioW;
          }
        });
      });
    }
  }
  class Factory {
    static getInstance(editor, obj) {
      switch (obj.type) {
        case "group":
          return new Group(editor, obj);
        case "activeSelection":
          return new ActiveSelection(editor, obj);
        case "rect":
          return new Rect(editor, obj);
        case "line":
          return new Line(editor, obj);
        case "polyline":
          return new Polyline(editor, obj);
        case "bezierCurve":
          return new BezierCurve(editor, obj);
        default:
          return new BaseObject(editor, obj);
      }
    }
  }
  const Factory$1 = Factory;
  const recursionSetId = (arr) => {
    arr.forEach((obj) => {
      obj.id = editorUtil.nanoid(8);
      if (obj.objects && obj.objects.length) {
        recursionSetId(obj.objects);
      }
    });
  };
  class ObjectHandler {
    constructor(editor) {
      this.editor = editor;
    }
    attribute(objs = {}) {
      const { editor } = this;
      return new Promise((resolve, reject) => {
        const idList = objs.map((obj) => obj.id);
        const targets = editor.getObjectsByCondition((a) => idList.includes(a.id));
        if (!targets.length) {
          reject("no target");
        } else {
          const sizeAttrsList = ["w", "h"];
          targets.forEach((item) => {
            const attrs = objs.find((a) => a.id === item.id);
            const oldSize = { w: item.w, h: item.h };
            item.set(attrs);
            const keys2 = Object.keys(attrs);
            if (keys2.some((key) => sizeAttrsList.includes(key))) {
              item.handleSizeChange && item.handleSizeChange(oldSize);
            }
          });
          resolve("");
        }
      });
    }
    move(type, distance) {
      const { editor } = this;
      return new Promise((resolve, reject) => {
        const activeObj = editor.getActiveObject();
        if (activeObj) {
          if (activeObj.locked) {
            return reject("object is locked.");
          }
          let key = "";
          switch (type) {
            case "top":
              key = "y";
              break;
            case "left":
              key = "x";
              break;
          }
          activeObj[key] += distance;
          if (activeObj.type === "activeSelection") {
            activeObj.objects.forEach((item) => {
              item[key] += distance;
            });
          }
          activeObj.updateControlsPosition();
          resolve("");
        } else {
          reject("no active object.");
        }
      });
    }
    copy(isCut = false) {
      const editor = this.editor;
      return new Promise((resolve, reject) => {
        const copyKey = editor.config.copyKey;
        editor.pasteCount = 0;
        const activeObj = editor.getActiveObject();
        if (activeObj) {
          const content = activeObj.toJSON();
          editor.util.localforage.setItem(copyKey, JSON.stringify(content)).then(() => {
          });
          if (isCut) {
            const objs = editor.objects;
            if (activeObj.type === "activeSelection") {
              activeObj.objects.forEach((item) => {
                const index = objs.findIndex((a) => a.id === item.id);
                index > -1 && objs.splice(index, 1);
              });
            } else {
              const index = objs.findIndex((a) => a.id === activeObj.id);
              index > -1 && objs.splice(index, 1);
            }
            editor.discardActiveObject();
          }
          resolve("");
        } else {
          reject("no active object");
        }
      });
    }
    cut() {
      return this.copy(true);
    }
    /**
     * 粘贴
     * @param {*} mousePosition 鼠标位置
     */
    paste(mousePosition) {
      const { editor } = this;
      return new Promise((resolve, reject) => {
        editor.pasteCount += 1;
        const { copyKey, pasteOffset } = editor.config;
        const parseHandle = (e) => {
          recursionSetId([e]);
          let diffX = 0;
          let diffY = 0;
          if (mousePosition) {
            let realX = mousePosition.x - e.w / 2;
            let realY = mousePosition.y - e.h / 2;
            diffX = realX - e.x;
            diffY = realY - e.y;
            e.x = realX;
            e.y = realY;
            if (e.type === "activeSelection") {
              e.objects.forEach((item) => {
                item.x += diffX;
                item.y += diffY;
              });
            }
          } else {
            e.x += editor.pasteCount * pasteOffset.x;
            e.y += editor.pasteCount * pasteOffset.y;
          }
          return e;
        };
        console.time("paste");
        console.log("typeCounts", editor.typeCounts);
        editor.util.localforage.getItem(copyKey).then((value) => {
          if (!value) {
            return reject("no data to paste");
          }
          const pasteData = JSON.parse(value);
          const disposeItem = parseHandle(pasteData);
          let objs = disposeItem.type === "activeSelection" ? disposeItem.objects : [disposeItem];
          objs = objs.map((a) => {
            const obj = Factory$1.getInstance(editor, a);
            const name = editor.getTypeCountName(obj);
            obj.name = name;
            return obj;
          });
          let insertIndex = editor.objects.length;
          const activeObjs = editor.getActiveObjects();
          editor.discardActiveObject();
          if (activeObjs.length) {
            insertIndex = activeObjs.reduce((pre, cur) => {
              const index = editor.objects.findIndex((b) => b.id === cur.id);
              return index > pre ? index : pre;
            }, 0) + 1;
          }
          this.add(objs, insertIndex);
          if (disposeItem.type === "activeSelection") {
            const position = editorUtil.getBoundingRect(objs, disposeItem.angle);
            editor.setActiveObjectsWithPosition(objs, position);
          } else {
            editor.setActiveObjects(objs);
          }
          console.timeEnd("paste");
          resolve("");
        });
      });
    }
    /**
     * 复用对象
     * @param target 源对象
     * @param offset 偏移量
     * @returns
     */
    multiplex(target, offset = { x: 0, y: 0 }) {
      const { editor } = this;
      let objs = [];
      if (target.type === "activeSelection") {
        objs = target.objects.map((a) => a.clone());
      } else {
        objs = [target.clone()];
      }
      objs.forEach((item) => {
        item.x += offset.x;
        item.y += offset.y;
      });
      recursionSetId(objs);
      editor.add(objs);
      if (target.type === "activeSelection") {
        let { x, y, w, h, angle } = target;
        x += offset.x;
        y += offset.y;
        editor.setActiveObjectsWithPosition(objs, { x, y, w, h, angle });
      } else {
        editor.setActiveObjects(objs);
      }
      return Promise.resolve("ok");
    }
    /**
     * 组合
     * @returns
     */
    group() {
      const { editor } = this;
      const { groupAttrs } = editor.config;
      return new Promise((resolve, reject) => {
        const activeObject = editor.getActiveObject();
        if (activeObject && activeObject.type === "activeSelection") {
          const objs = activeObject.objects || [];
          const relationship = editor.getObjectsParentRelationship(objs);
          relationship.sort((a, b) => b.path - a.path);
          let parentIdList = relationship.reduce((pre, cur) => {
            pre.push(...cur.parentIdList);
            return pre;
          }, []);
          parentIdList = [...new Set(parentIdList)];
          const idList = objs.map((a) => a.id);
          if (parentIdList.some((a) => idList.includes(a))) {
            return reject("cannot operate parent and children at the same time");
          }
          const insertParent = relationship[0].target.group || editor;
          const insertParentId = relationship[0].parentId;
          let insertIndex = relationship.filter((item) => item.parentId === insertParentId).reduce((pre, cur) => {
            return Math.min(pre, cur.index);
          }, relationship[0].index);
          const { x, y, w, h, angle } = editorUtil.getBoundingRect(objs);
          const objsGlobalPosList = objs.map((a) => {
            return __spreadValues({ id: a.id }, a.getGlobalPosition());
          });
          relationship.forEach((relation) => {
            const { index, target } = relation;
            const parent = target.group || editor;
            parent.objects.splice(index, 1);
            delete target.group;
            const position = objsGlobalPosList.find((a) => a.id === target.id);
            Object.assign(target, position);
          });
          const groupItem = Factory$1.getInstance(editor, __spreadProps(__spreadValues({
            type: "group"
          }, cloneDeep(groupAttrs)), {
            x,
            y,
            w,
            h,
            angle
          }));
          const groupMatrix = editorUtil.getTotalMatrix(groupItem, false, true);
          objs.forEach((item) => {
            editorUtil.applyMatrix(item, inverse(groupMatrix));
            item.group = groupItem;
            groupItem.objects.push(item);
          });
          groupItem.name = editor.getTypeCountName(groupItem);
          if (insertParent.type === "group") {
            const parentMatrix = editorUtil.getTotalMatrix(insertParent, false, true);
            editorUtil.applyMatrix(groupItem, inverse(parentMatrix));
            groupItem.group = insertParent;
          }
          insertParent.objects.splice(insertIndex, 0, groupItem);
          editor.setActiveObjects([groupItem]);
          resolve("");
        } else {
          reject("no need to group");
        }
      });
    }
    ungroup() {
      const { editor } = this;
      return new Promise((resolve, reject) => {
        const objs = editor.getActiveObjects();
        if (objs.every((a) => a.type === "group")) {
          const relationship = editor.getObjectsParentRelationship(objs);
          relationship.sort((a, b) => b.path - a.path);
          const toSelectObjs = [];
          relationship.forEach((element) => {
            const { index, target } = element;
            const parent = target.group || editor;
            const { x, y, angle } = target;
            const chidlren = target.objects || [];
            const groupCenter = editorUtil.getObjectCenter(target);
            chidlren.forEach((item) => {
              let objCenter = editorUtil.getObjectCenter(item);
              objCenter.x += x;
              objCenter.y += y;
              const objIndex = target.objects.findIndex((a) => a.id === item.id);
              objCenter = editorUtil.rotatePoint(objCenter, groupCenter, angle);
              item.x = objCenter.x - item.w / 2;
              item.y = objCenter.y - item.h / 2;
              item.angle = item.angle + angle;
              if (parent.type === "group") {
                item.group = parent;
              } else {
                delete item.group;
              }
              parent.objects.splice(objIndex + index, 0, item);
              toSelectObjs.push(item);
            });
            const groupIndex = parent.objects.findIndex((a) => a.id === target.id);
            parent.objects.splice(groupIndex, 1);
          });
          editor.setActiveObjects(toSelectObjs);
          resolve("");
        } else {
          reject("no need to ungroup");
        }
      });
    }
    /**
     * 锁定/解锁对象
     * @param {*} locked 是否锁定
     */
    lock(locked) {
      const { editor } = this;
      return new Promise((resolve, reject) => {
        const activeObj = editor.getActiveObject();
        if (activeObj && activeObj.type !== "activeSelection") {
          activeObj.locked = locked;
          activeObj.updateControlsPosition();
          resolve("");
        } else {
          reject("lock/unlock failed");
        }
      });
    }
    /**
     * 层级操作
     * @param {String} type。bringForward 上移；sendBackwards 下移；bringToFront 置顶；sendToBack 置底
     * @returns
     */
    layer(type) {
      const { editor } = this;
      return new Promise((resolve, reject) => {
        const activeObj = editor.getActiveObject();
        if (!activeObj) {
          return reject("no active object");
        }
        if (activeObj.type === "activeSelection") {
          return reject("activeSelection have not layer operations");
        }
        const parent = activeObj.group || editor;
        const index = parent.objects.findIndex((a) => a.id === activeObj.id);
        const objs = parent.objects;
        switch (type) {
          case "bringForward":
            if (index < objs.length - 1) {
              objs.splice(index + 1, 0, objs.splice(index, 1)[0]);
              resolve("");
            } else {
              reject("could not bring forward");
            }
            break;
          case "sendBackwards":
            if (index > 0) {
              objs.splice(index - 1, 0, objs.splice(index, 1)[0]);
              resolve("");
            } else {
              reject("could not bring send backwards");
            }
            break;
          case "bringToFront":
            if (index < objs.length - 1) {
              objs.splice(objs.length - 1, 0, objs.splice(index, 1)[0]);
              resolve("");
            } else {
              reject("could not bring to front");
            }
            break;
          case "sendToBack":
            if (index > 0) {
              objs.splice(0, 0, objs.splice(index, 1)[0]);
              resolve("");
            } else {
              reject("could not send to back");
            }
            break;
          default:
            reject("unrecognized layer action");
            break;
        }
      });
    }
    /**
     * 删除对象
     * @param objs 要删除的对象
     * @returns
     */
    remove(objs = []) {
      const { editor } = this;
      for (let i = 0; i < objs.length; i++) {
        const item = objs[i];
        const parent = item.group || editor;
        const findIndex2 = parent.objects.findIndex((a) => a.id === item.id);
        if (findIndex2 > -1) {
          parent.objects.splice(findIndex2, 1);
        }
      }
      editor.discardActiveObject();
      return Promise.resolve("ok");
    }
    /**
     * 向上递归退出组合
     */
    exitGroup() {
      const { editor } = this;
      if (editor.group) {
        editorUtil.resetGroupPosition(editor.group);
        editor.group = null;
      }
    }
    /**
     * 添加对象
     * @param objs 对象数组
     * @param index 要插入的索引
     */
    add(objs, index) {
      const { editor } = this;
      editor.objects.splice(index, 0, ...objs);
    }
  }
  class ZoomHandler {
    constructor(editor) {
      this.limit = {
        min: 0.2,
        max: 4
      };
      this.thumbnailNumber = 2;
      this.blankDistance = 100;
      this.dragY = {
        dragging: false,
        clientY: 0
      };
      this.dragX = {
        dragging: false,
        clientX: 0
      };
      this.clientX = 0;
      this.clientY = 0;
      this.rightDom = null;
      this.rightBarDom = null;
      this.bottomDom = null;
      this.bottomBarDom = null;
      this.editor = editor;
      this.initialize();
    }
    initialize() {
      this.initEvent();
      this.initScrollBar();
      this.initRightEvent();
      this.initBottomEvent();
      this.zoomFitView();
    }
    /**
     * 通过给画布添加will-change开启高性能模式
     * @param enabled 是否开启
     */
    setHighPerformance(enabled) {
      const { editor } = this;
      editor.canvasDom.style.willChange = enabled ? "transform" : "";
    }
    initEvent() {
      const editor = this.editor;
      const editorDom = editor.getEditorDom();
      let timer = null;
      editorDom.addEventListener("mousewheel", (e) => {
        clearTimeout(timer);
        this.setHighPerformance(true);
        e.preventDefault();
        if (e.ctrlKey || e.metaKey) {
          this.zoomToPoint(e);
        } else {
          const { wheelDeltaX, wheelDeltaY } = e;
          if (e.shiftKey) {
            this.addOffset(wheelDeltaY / 2, 0);
          } else {
            this.addOffset(wheelDeltaX / 2, wheelDeltaY / 2);
          }
        }
        timer = setTimeout(() => {
          this.setHighPerformance(false);
        }, 50);
      });
      editorDom.addEventListener("DOMMouseScroll", (e) => {
        if (e.ctrlKey || e.metaKey) {
          e.preventDefault();
          this.zoomToPoint(e);
          return;
        }
        if (e.shiftKey) {
          this.addOffset(-e.detail, 0);
          return;
        }
        this.addOffset(0, -e.detail);
      });
      setTimeout(() => {
        editor.fire("editor:mounted");
      }, 100);
    }
    initScrollBar() {
      const editor = this.editor;
      const classNamePrefix = editor.classNamePrefix;
      const overLayerDom = editor.overLayer;
      const rightElement = document.createElement("div");
      rightElement.className = `${classNamePrefix}-scroll-right`;
      this.rightDom = rightElement;
      const rightBarElement = document.createElement("div");
      rightBarElement.className = `${classNamePrefix}-scroll-right-bar`;
      this.rightBarDom = rightBarElement;
      rightElement.appendChild(this.rightBarDom);
      overLayerDom.appendChild(this.rightDom);
      const bottomElement = document.createElement("div");
      bottomElement.className = `${classNamePrefix}-scroll-bottom`;
      this.bottomDom = bottomElement;
      const bottomBarElement = document.createElement("div");
      bottomBarElement.className = `${classNamePrefix}-scroll-bottom-bar`;
      this.bottomBarDom = bottomBarElement;
      bottomElement.appendChild(this.bottomBarDom);
      overLayerDom.appendChild(this.bottomDom);
    }
    initRightEvent() {
      const editor = this.editor;
      const { viewportTransform } = editor;
      const config = editor.config;
      this.rightBarDom.addEventListener("mousedown", (e) => {
        e.stopPropagation();
        e.preventDefault();
        this.dragY.dragging = true;
        this.dragY.clientY = e.clientY;
        const mousemove = (event) => {
          event.preventDefault();
          if (this.dragY.dragging) {
            const { sx: scale2 } = editorUtil.decomposeMatrix(viewportTransform);
            const { height: clientOff } = editor.getEditorBoundingClientRect();
            const calcOff = this.thumbnailNumber * clientOff + config.height * scale2;
            const offset = (this.dragY.clientY - event.clientY) * calcOff / (clientOff - 20);
            this.dragY.clientY = event.clientY;
            this.addOffsetY(offset);
          }
        };
        const mouseup = (ev) => {
          ev.preventDefault();
          this.dragY.dragging = false;
          document.removeEventListener("mousemove", mousemove);
          document.removeEventListener("mouseup", mouseup);
        };
        document.addEventListener("mousemove", mousemove);
        document.addEventListener("mouseup", mouseup);
      });
    }
    setRightBar() {
      const { editor } = this;
      const { ty: offsetY, sx: scale2 } = editorUtil.decomposeMatrix(editor.viewportTransform);
      const { height: clientHeight } = editor.getEditorBoundingClientRect();
      const configHeight = editor.config.height;
      const calcHeight = this.thumbnailNumber * clientHeight + configHeight * scale2;
      const height = Math.round(clientHeight * (clientHeight - 20) / calcHeight) + "px";
      const top = Math.round((clientHeight - offsetY) * (clientHeight - 20) / calcHeight) + "px";
      this.rightBarDom.style.top = top;
      this.rightBarDom.style.height = height;
    }
    initBottomEvent() {
      const { editor } = this;
      const { config } = editor;
      this.bottomBarDom.addEventListener("mousedown", (e) => {
        e.stopPropagation();
        e.preventDefault();
        this.dragX.dragging = true;
        this.dragX.clientX = e.clientX;
        const mousemove = (event) => {
          event.preventDefault();
          if (this.dragX.dragging) {
            const { sx: scale2 } = editorUtil.decomposeMatrix(editor.viewportTransform);
            const { width: clientOff } = editor.getEditorBoundingClientRect();
            const calcOff = this.thumbnailNumber * clientOff + config.width * scale2;
            const offset = (this.dragX.clientX - event.clientX) * calcOff / (clientOff - 20);
            this.dragX.clientX = event.clientX;
            this.addOffsetX(offset);
          }
        };
        const mouseup = (ev) => {
          ev.preventDefault();
          this.dragX.dragging = false;
          document.removeEventListener("mousemove", mousemove);
          document.removeEventListener("mouseup", mouseup);
        };
        document.addEventListener("mousemove", mousemove);
        document.addEventListener("mouseup", mouseup);
      });
    }
    setBottomBar() {
      const editor = this.editor;
      const { tx: offsetX, sx: scale2 } = editorUtil.decomposeMatrix(editor.viewportTransform);
      const { width: clientWidth } = editor.getEditorBoundingClientRect();
      const configWidth = editor.config.width;
      const calcWidth = this.thumbnailNumber * clientWidth + configWidth * scale2;
      const width = Math.round(clientWidth * (clientWidth - 20) / calcWidth) + "px";
      const left = Math.round((clientWidth - offsetX) * (clientWidth - 20) / calcWidth) + "px";
      this.bottomBarDom.style.left = left;
      this.bottomBarDom.style.width = width;
    }
    handleViewportTransform() {
      const { editor } = this;
      const { sx: scale2, tx: offsetX, ty: offsetY } = editorUtil.decomposeMatrix(editor.viewportTransform);
      const config = editor.config;
      const width = Math.round(config.width) + "px";
      const height = Math.round(config.height) + "px";
      const matrix = `matrix(${scale2}, 0, 0, ${scale2}, ${offsetX}, ${offsetY})`;
      editor.canvasDom.style.width = width;
      editor.canvasDom.style.height = height;
      editor.canvasDom.style.transform = matrix;
      this.fireEvent();
    }
    /**
     * 缩放至适应画布
     */
    zoomFitView() {
      const { editor } = this;
      const { width: editorWidth, height: editorHeight } = editor.getEditorBoundingClientRect();
      const { width: configWidth, height: configHeight } = editor.config;
      const zoomConfig = editor.config.zoom || {};
      const spaceH = zoomConfig.spaceH || 0;
      const spaceV = zoomConfig.spaceV || 0;
      const scaleX = (editorWidth - 2 * spaceH) / configWidth;
      const scaleY = (editorHeight - 2 * spaceV) / configHeight;
      const scale2 = Math.min(scaleX, scaleY);
      const [sx, sy] = [scale2, scale2];
      const tx = Math.round(editorWidth / 2 - configWidth / 2 * scale2);
      const ty = Math.round(editorHeight / 2 - configHeight / 2 * scale2);
      editor.viewportTransform = editorUtil.composeMatrix({ sx, sy, tx, ty });
      this.setRightBar();
      this.setBottomBar();
      this.handleViewportTransform();
    }
    zoomIn() {
      const { editor } = this;
      const { viewportTransform } = editor;
      let { a: scale2 } = viewportTransform;
      scale2 += 0.1;
      scale2 = Math.min(scale2, this.limit.max);
      viewportTransform.a = viewportTransform.d = scale2;
      this.setRightBar();
      this.setBottomBar();
      this.handleViewportTransform();
    }
    zoomOut() {
      const { editor } = this;
      const { viewportTransform } = editor;
      let { a: scale2 } = viewportTransform;
      scale2 -= 0.1;
      scale2 = Math.max(scale2, this.limit.min);
      viewportTransform.a = viewportTransform.d = scale2;
      this.setRightBar();
      this.setBottomBar();
      this.handleViewportTransform();
    }
    zoomToReset() {
      const { viewportTransform } = this.editor;
      viewportTransform.e = viewportTransform.f = 0;
      this.setRightBar();
      this.setBottomBar();
      this.handleViewportTransform();
    }
    /**
     * 以画布中心点作为基点进行缩放
     * @param {Number} zoomRatio 缩放倍数
     */
    zoomToRatio(zoomRatio) {
      const { viewportTransform } = this.editor;
      viewportTransform.a = viewportTransform.d = zoomRatio;
      this.setRightBar();
      this.setBottomBar();
      this.handleViewportTransform();
    }
    setZoom(row) {
      switch (row.type) {
        case "ratio":
          this.zoomToRatio(row.value);
          break;
        case "fitView":
          this.zoomFitView();
          break;
        case "zoomIn":
          this.zoomIn();
          break;
        case "zoomOut":
          this.zoomOut();
          break;
        case "reset":
          this.zoomToReset();
          break;
      }
    }
    /**
     * 以画布中心点作为基点进行缩放
     * @param {Number} zoomRatio 缩放倍数
     */
    zoomToPoint(e) {
      const { editor, blankDistance } = this;
      const { viewportTransform } = editor;
      let direction = 0;
      if (e.detail) {
        direction = e.detail > 0 ? -10 : 10;
      }
      if (e.wheelDelta) {
        direction = +(e.wheelDelta / 1e3).toFixed(2);
      }
      e.preventDefault();
      const { sx: scale2, tx: offsetX, ty: offsetY } = editorUtil.decomposeMatrix(viewportTransform);
      const { width: clientWidth, height: clientHeight } = editor.getEditorBoundingClientRect();
      let ratio = scale2 + direction;
      const dom = editor.getEditorBoundingClientRect();
      ratio = Math.min(ratio, this.limit.max);
      ratio = Math.max(ratio, this.limit.min);
      if (e) {
        const config = editor.config;
        const configWidth = config.width;
        const configHeight = config.height;
        const calcLeft = e.clientX - dom.left;
        const calcTop = e.clientY - dom.top;
        const moveWidth = Math.round(configWidth * scale2);
        let moveX = Math.round(calcLeft - ratio / scale2 * (calcLeft - offsetX));
        const distance = blankDistance * scale2;
        const isMiniSizeW = moveWidth <= distance;
        const minOffsetX = isMiniSizeW ? 0 : -moveWidth + distance;
        const maxOffsetX = isMiniSizeW ? clientWidth - moveWidth : clientWidth - distance;
        if (moveX < 0 && moveX < minOffsetX) {
          moveX = minOffsetX;
        }
        if (moveX > 0 && moveX > maxOffsetX) {
          moveX = maxOffsetX;
        }
        viewportTransform.e = moveX;
        const moveHeight = Math.round(configHeight * scale2);
        let moveY = Math.round(calcTop - ratio / scale2 * (calcTop - offsetY));
        const isMiniSizeH = moveHeight <= distance;
        const minOffsetY = isMiniSizeH ? 0 : -moveHeight + distance;
        const maxOffsetY = isMiniSizeH ? clientHeight - moveHeight : clientHeight - distance;
        if (moveY < 0 && moveY < minOffsetY) {
          moveY = minOffsetY;
        }
        if (moveY > 0 && moveY > maxOffsetY) {
          moveY = maxOffsetY;
        }
        viewportTransform.f = moveY;
      }
      viewportTransform.a = viewportTransform.d = ratio;
      this.setBottomBar();
      this.setRightBar();
      this.handleViewportTransform();
    }
    /**
     * 缩放
     */
    fireEvent() {
      const { editor } = this;
      editor.editorPanzoom(editor.viewportTransform);
    }
    addOffset(x, y) {
      const { editor, blankDistance } = this;
      const { viewportTransform } = editor;
      const { sx: scale2, tx: offsetX, ty: offsetY } = editorUtil.decomposeMatrix(viewportTransform);
      const { width: clientWidth, height: clientHeight } = editor.getEditorBoundingClientRect();
      let calcOffsetX = offsetX + x;
      let calcOffsetY = offsetY + y;
      const configWidth = editor.config.width;
      const configHeight = editor.config.height;
      const calcWidth = Math.round(configWidth * scale2);
      const calcHeight = Math.round(configHeight * scale2);
      const distance = blankDistance * scale2;
      const isMiniSizeW = calcWidth <= distance;
      const minOffsetX = isMiniSizeW ? 0 : -calcWidth + distance;
      const maxOffsetX = isMiniSizeW ? clientWidth - calcWidth : clientWidth - distance;
      if (calcOffsetX < 0 && calcOffsetX < minOffsetX) {
        calcOffsetX = minOffsetX;
      }
      if (calcOffsetX > 0 && calcOffsetX > maxOffsetX) {
        calcOffsetX = maxOffsetX;
      }
      const isMiniSizeH = calcHeight <= distance;
      const minOffsetY = isMiniSizeH ? 0 : -calcHeight + distance;
      const maxOffsetY = isMiniSizeH ? clientHeight - calcHeight : clientHeight - distance;
      if (calcOffsetY < 0 && calcOffsetY < minOffsetY) {
        calcOffsetY = minOffsetY;
      }
      if (calcOffsetY > 0 && calcOffsetY > maxOffsetY) {
        calcOffsetY = maxOffsetY;
      }
      viewportTransform.e = calcOffsetX;
      viewportTransform.f = calcOffsetY;
      this.setBottomBar();
      this.setRightBar();
      this.handleViewportTransform();
    }
    addOffsetX(value) {
      const { editor, blankDistance } = this;
      const { viewportTransform } = editor;
      const { sx: scale2, tx: offsetX } = editorUtil.decomposeMatrix(viewportTransform);
      const { width: clientWidth } = editor.getEditorBoundingClientRect();
      const configWidth = editor.config.width;
      const calcWidth = Math.round(configWidth * scale2);
      let calcOffset = offsetX + value;
      const distance = blankDistance * scale2;
      const isMiniSizeW = calcWidth <= distance;
      const minOffsetX = isMiniSizeW ? 0 : -calcWidth + distance;
      const maxOffsetX = isMiniSizeW ? clientWidth - calcWidth : clientWidth - distance;
      if (calcOffset < 0 && calcOffset < minOffsetX) {
        calcOffset = minOffsetX;
      }
      if (calcOffset > 0 && calcOffset > maxOffsetX) {
        calcOffset = maxOffsetX;
      }
      viewportTransform.e = calcOffset;
      this.setBottomBar();
      this.handleViewportTransform();
    }
    addOffsetY(value) {
      const { editor, blankDistance } = this;
      const { viewportTransform } = editor;
      const { sx: scale2, ty: offsetY } = editorUtil.decomposeMatrix(viewportTransform);
      const { height: clientHeight } = editor.getEditorBoundingClientRect();
      const configHeight = editor.config.height;
      const calcHeight = Math.round(configHeight * scale2);
      let calcOffset = offsetY + value;
      const distance = blankDistance * scale2;
      const isMiniSizeH = calcHeight <= distance;
      const minOffsetY = isMiniSizeH ? 0 : -calcHeight + distance;
      const maxOffsetY = isMiniSizeH ? clientHeight - calcHeight : clientHeight - distance;
      if (calcOffset < 0 && calcOffset < minOffsetY) {
        calcOffset = minOffsetY;
      }
      if (calcOffset > 0 && calcOffset > maxOffsetY) {
        calcOffset = maxOffsetY;
      }
      viewportTransform.f = calcOffset;
      this.setRightBar();
      this.handleViewportTransform();
    }
    // 拖动画布
    zoomMoveTo(e) {
      const { editor, blankDistance } = this;
      if (!editor.grabing)
        return;
      const { viewportTransform } = editor;
      this.clientY = e.clientY;
      this.clientX = e.clientX;
      this.setHighPerformance(true);
      const mousemove = (event) => {
        const offsetX = this.clientX ? event.clientX - this.clientX : 0;
        const offsetY = this.clientY ? event.clientY - this.clientY : 0;
        this.clientX = event.clientX;
        this.clientY = event.clientY;
        const { sx: scale2 } = editorUtil.decomposeMatrix(viewportTransform);
        const { width: clientWidth, height: clientHeight } = editor.getEditorBoundingClientRect();
        let calcOffsetX = viewportTransform.e + offsetX;
        let calcOffsetY = viewportTransform.f + offsetY;
        const configWidth = editor.config.width;
        const configHeight = editor.config.height;
        const calcWidth = Math.round(configWidth * scale2);
        const calcHeight = Math.round(configHeight * scale2);
        const distance = blankDistance * scale2;
        const isMiniSizeW = calcWidth <= distance;
        const minOffsetX = isMiniSizeW ? 0 : -calcWidth + distance;
        const maxOffsetX = isMiniSizeW ? clientWidth - calcWidth : clientWidth - distance;
        if (calcOffsetX < 0 && calcOffsetX < minOffsetX) {
          calcOffsetX = minOffsetX;
        }
        if (calcOffsetX > 0 && calcOffsetX > maxOffsetX) {
          calcOffsetX = maxOffsetX;
        }
        const isMiniSizeH = calcHeight <= distance;
        const minOffsetY = isMiniSizeH ? 0 : -calcHeight + distance;
        const maxOffsetY = isMiniSizeH ? clientHeight - calcHeight : clientHeight - distance;
        if (calcOffsetY < 0 && calcOffsetY < minOffsetY) {
          calcOffsetY = minOffsetY;
        }
        if (calcOffsetY > 0 && calcOffsetY > maxOffsetY) {
          calcOffsetY = maxOffsetY;
        }
        viewportTransform.e = calcOffsetX;
        viewportTransform.f = calcOffsetY;
        this.setRightBar();
        this.setBottomBar();
        this.handleViewportTransform();
      };
      const mouseup = () => {
        this.clientX = 0;
        this.clientY = 0;
        this.handleViewportTransform();
        this.setHighPerformance(false);
        document.removeEventListener("mousemove", mousemove);
        document.removeEventListener("mouseup", mouseup);
      };
      document.addEventListener("mousemove", mousemove);
      document.addEventListener("mouseup", mouseup);
    }
  }
  class RulerAdsorbHandler {
    constructor(editor) {
      this.aligningLineMargin = 3;
      this.lines = {
        v: [],
        h: []
      };
      this.editor = editor;
      this.initEvent();
    }
    initEvent() {
      const editor = this.editor;
      const self2 = this;
      editor.on({
        "object:moving": function(e) {
          self2.adsorption();
        }
      });
    }
    setLines(lines) {
      this.lines = lines;
    }
    adsorption() {
      const editor = this.editor;
      const sorption = editor.config.sorption;
      const isAdsorb = sorption.enable;
      const alignMargin = sorption.offset;
      if (!isAdsorb)
        return;
      const target = editor.getActiveObject();
      const lines = this.lines;
      if (!target)
        return;
      if (target.parentId)
        return;
      const disposePosition = (data) => {
        const { x, y, w, h } = editorUtil.getBoundingRect([data]);
        return {
          angle: 0,
          width: w,
          height: h,
          left: x,
          top: y,
          right: x + w,
          bottom: y + h,
          centerX: x + w / 2,
          // 水平
          centerY: y + h / 2
          // 垂直
        };
      };
      const isInRange = (value1, value2) => {
        value1 = Math.round(value1);
        value2 = Math.round(value2);
        for (let i = value1 - alignMargin, len = value1 + alignMargin; i <= len; i++) {
          if (i === value2) {
            return true;
          }
        }
        return false;
      };
      const hLines = lines.h || [];
      for (const objectLeft of hLines) {
        const objectPositon = disposePosition(target);
        if (isInRange(objectPositon.left, objectLeft)) {
          const boundingBox = editorUtil.getBoundingRect([target]);
          const innerLeft = boundingBox.x;
          const distanceX = objectLeft - innerLeft;
          target.x += distanceX;
        }
        if (isInRange(objectPositon.centerX, objectLeft)) {
          const boundingBox = editorUtil.getBoundingRect([target]);
          const innerCenterX = boundingBox.x + boundingBox.w / 2;
          const distanceX = objectLeft - innerCenterX;
          target.x += distanceX;
        }
        if (isInRange(objectPositon.right, objectLeft)) {
          const boundingBox = editorUtil.getBoundingRect([target]);
          const innerRight = boundingBox.x + boundingBox.w;
          const distanceX = objectLeft - innerRight;
          target.x += distanceX;
        }
      }
      const vLines = lines.v || [];
      for (const objectTop of vLines) {
        const objectPositon = disposePosition(target);
        if (isInRange(objectPositon.top, objectTop)) {
          const boundingBox = editorUtil.getBoundingRect([target]);
          const innerTop = boundingBox.y;
          const distanceY = objectTop - innerTop;
          target.y += distanceY;
        }
        if (isInRange(objectPositon.centerY, objectTop)) {
          const boundingBox = editorUtil.getBoundingRect([target]);
          const innerCenterY = boundingBox.y + boundingBox.h / 2;
          const distanceY = objectTop - innerCenterY;
          target.y += distanceY;
        }
        if (isInRange(objectPositon.bottom, objectTop)) {
          const boundingBox = editorUtil.getBoundingRect([target]);
          const innerRight = boundingBox.y + boundingBox.h;
          const distanceY = objectTop - innerRight;
          target.y += distanceY;
        }
        if (isAdsorb) {
          editor.fire("object:sorption");
        }
      }
    }
    initRulerAdsorb(rulerLines) {
      const editor = this.editor;
      const selectTarget = editor.getActiveObject();
      if (!selectTarget)
        return;
      if (selectTarget.parentId)
        return;
      const isSorption = (selectValue, componentValue) => {
        return Math.abs(selectValue - componentValue) <= this.aligningLineMargin;
      };
      const selectAttr = selectTarget && selectTarget ? selectTarget : {};
      const selectW = selectAttr.w;
      const selectH = selectAttr.h;
      selectTarget.setPosition = (x, y) => {
        selectTarget.x = x;
        selectTarget.y = y;
      };
      const selectLeftX = selectAttr.x;
      const selectHalfX = selectLeftX + selectW / 2;
      const selectRightX = selectLeftX + selectW;
      const selectTopY = selectAttr.y;
      const selectHalfY = selectTopY + selectH / 2;
      const selectBottomY = selectTopY + selectH;
      const horizontalLines = rulerLines.h || [];
      for (let objectLeft of horizontalLines) {
        objectLeft += objectLeft;
        if (isSorption(selectLeftX, objectLeft)) {
          selectTarget.setPosition(objectLeft, selectTopY);
        }
        if (isSorption(selectHalfX, objectLeft)) {
          selectTarget.setPosition(objectLeft - selectW / 2, selectTopY);
        }
        if (isSorption(selectRightX, objectLeft)) {
          selectTarget.setPosition(objectLeft - selectW, selectTopY);
        }
      }
      const verticalLines = rulerLines.v || [];
      for (let objectTop of verticalLines) {
        if (isSorption(selectTopY, objectTop)) {
          selectTarget.setPosition(selectLeftX, objectTop);
        }
        if (isSorption(selectHalfY, objectTop)) {
          selectTarget.setPosition(selectLeftX, objectTop - selectH / 2);
        }
        if (isSorption(selectBottomY, objectTop)) {
          selectTarget.setPosition(selectLeftX, objectTop - selectH);
        }
      }
    }
  }
  class GuidelineHandler {
    // 边界列表（不包含当前移动对象）
    constructor(editor) {
      this.guidelineDom = null;
      this.horizontalList = [];
      this.verticalList = [];
      this.guideGapDom = null;
      this.gapHorizontalList = [];
      this.gapVerticalList = [];
      this.boundingList = [];
      this.editor = editor;
      this.initGuidlineDom();
      this.initguideGapDom();
      this.initEvent();
    }
    initEvent() {
      const self2 = this;
      const editor = this.editor;
      editor.on({
        "object:moving": function(e) {
          if (editor.config.sorption && !editor.config.sorption.enabled) {
            return;
          } else if (e.e.shiftKey || e.e.altKey) {
            self2.clearGuidelines();
            self2.clearGuideGap();
            return;
          }
          if (!self2.boundingList.length) {
            self2.boundingList = self2.getBoundingList(editor);
          }
          self2.createGuideLines();
          self2.createGuideGap();
        },
        "editor:panzoom": function(e) {
          if (self2.horizontalList.length || self2.verticalList.length) {
            self2.boundingList = self2.getBoundingList(editor);
            self2.createGuideLines();
            self2.createGuideGap();
          }
        },
        "editor:mouseup": function(e) {
          self2.boundingList = [];
          self2.clearGuidelines();
          self2.clearGuideGap();
        }
      });
    }
    // 吸附判定，默认改为距离小于1像素才吸附，避免画布元素过多时频繁触发吸附
    isInRange(value1, value2, adsorValue = 1) {
      value1 = Math.round(value1);
      value2 = Math.round(value2);
      for (let i = value1 - adsorValue, len = value1 + adsorValue; i <= len; i++) {
        if (i === value2) {
          return true;
        }
      }
      return false;
    }
    // 获取边界列表
    getBoundingList(editor) {
      const objects = editor.group ? editor.group.objects : editor.objects;
      const target = editor.getActiveObject();
      const list = [];
      for (let i = 0; i < objects.length; i++) {
        const item = objects[i];
        if (item.id !== target.id) {
          const bounding = item.getContainerPosition();
          bounding.id = item.id;
          const position = getPosition(bounding);
          list.push(position);
        }
      }
      return list;
    }
    // 创建对齐线dom
    initGuidlineDom() {
      const editor = this.editor;
      const guidelineDom = editorUtil.createSvgElement(
        "svg",
        { class: "guide-line-dom" },
        {
          pointerEvents: "none",
          position: "absolute",
          width: "100%",
          height: "100%",
          left: "0px",
          top: "0px",
          overflow: "visible"
        }
      );
      this.guidelineDom = guidelineDom;
      const overLayerDom = editor.overLayer;
      setTimeout(() => {
        overLayerDom.appendChild(this.guidelineDom);
      }, 300);
    }
    // 清除对齐线
    clearGuidelines() {
      this.horizontalList = this.verticalList = [];
      this.guidelineDom.innerHTML = null;
    }
    /**
     * 绘制辅助线
     */
    drawLines() {
      const { editor, guidelineDom, horizontalList, verticalList } = this;
      const { color, width } = editor.config.guideline;
      let horizontalStr = "";
      horizontalList.forEach((item) => {
        const { x1, x2, y1, y2 } = item;
        horizontalStr += `<line
      x1="${x1}"
      y1="${y1}"
      x2="${x2}"
      y2="${y2}"
      stroke-width="${width}"
      stroke="${color}"
    />`;
      });
      let verticalStr = "";
      verticalList.forEach((item) => {
        const { x1, x2, y1, y2 } = item;
        verticalStr += `<line
      x1="${x1}"
      y1="${y1}"
      x2="${x2}"
      y2="${y2}"
      stroke-width="${width}"
      stroke="${color}"
    />`;
      });
      guidelineDom.innerHTML = `<g>${horizontalStr} ${verticalStr}</g>`;
    }
    createGuideLines() {
      const { editor } = this;
      const { offset: alignMargin } = editor.config.sorption;
      const target = editor.getActiveObject();
      if (!target || target.type === "activeSelection")
        return;
      const zoom = editor.getZoom();
      const calcSorption = (diffPosition, direction = "horizontal", diffType = "left", type = "left") => {
        const { left, top, right, bottom } = diffPosition;
        const activeObjPosition = getPosition(activeObjBounding);
        if (!this.isInRange(diffPosition[diffType], activeObjPosition[type], alignMargin)) {
          return;
        }
        const diffValue = (diffPosition[diffType] - activeObjPosition[type]) / zoom;
        let [x1, x2, y1, y2] = [0, 0, 0, 0];
        if (direction === "horizontal") {
          x1 = Math.min(left, activeObjPosition.left);
          x2 = Math.max(right, activeObjPosition.right);
          y1 = y2 = diffPosition[diffType];
        } else {
          x1 = x2 = diffPosition[diffType];
          y1 = Math.min(top, activeObjPosition.top);
          y2 = Math.max(bottom, activeObjPosition.bottom);
        }
        const p1 = { x: x1, y: y1 };
        const p2 = { x: x2, y: y2 };
        const obj = { x1: +p1.x.toFixed(2), y1: +p1.y.toFixed(2), x2: +p2.x.toFixed(2), y2: +p2.y.toFixed(2) };
        if (direction === "horizontal") {
          if (!sorptionHorizontal) {
            sorptionHorizontal = true;
            target.y += diffValue;
            activeObjBounding.y += diffValue;
            hList.push(obj);
          } else {
            if (y1.toFixed(2) === activeObjPosition[type].toFixed(2)) {
              hList.push(obj);
            }
          }
        } else {
          if (!sorptionVertical) {
            sorptionVertical = true;
            target.x += diffValue;
            activeObjBounding.x += diffValue;
            vList.push(obj);
          } else {
            if (x1.toFixed(2) === activeObjPosition[type].toFixed(2)) {
              vList.push(obj);
            }
          }
        }
      };
      const activeObjBounding = target.getContainerPosition();
      const vList = [];
      const hList = [];
      let sorptionHorizontal = false;
      let sorptionVertical = false;
      for (let i = 0; i < this.boundingList.length; i++) {
        const position = this.boundingList[i];
        calcSorption(position, "vertical", "left", "left");
        calcSorption(position, "vertical", "centerX", "left");
        calcSorption(position, "vertical", "right", "left");
        calcSorption(position, "vertical", "left", "centerX");
        calcSorption(position, "vertical", "centerX", "centerX");
        calcSorption(position, "vertical", "right", "centerX");
        calcSorption(position, "vertical", "left", "right");
        calcSorption(position, "vertical", "centerX", "right");
        calcSorption(position, "vertical", "right", "right");
        calcSorption(position, "horizontal", "top", "top");
        calcSorption(position, "horizontal", "centerY", "top");
        calcSorption(position, "horizontal", "bottom", "top");
        calcSorption(position, "horizontal", "top", "centerY");
        calcSorption(position, "horizontal", "centerY", "centerY");
        calcSorption(position, "horizontal", "bottom", "centerY");
        calcSorption(position, "horizontal", "top", "bottom");
        calcSorption(position, "horizontal", "centerY", "bottom");
        calcSorption(position, "horizontal", "bottom", "bottom");
      }
      this.verticalList = Object.values(groupBy(vList, "x1")).map((a) => {
        const firstItem = a[0];
        let [minY, maxY] = [firstItem.y1, firstItem.y2];
        a.forEach((b) => {
          minY = Math.min(b.y1, b.y2, minY);
          maxY = Math.max(b.y1, b.y2, maxY);
        });
        return { x1: firstItem.x1, y1: minY, x2: firstItem.x2, y2: maxY };
      });
      this.horizontalList = Object.values(groupBy(hList, "y1")).map((a) => {
        const firstItem = a[0];
        let [minX, maxX] = [firstItem.x1, firstItem.x2];
        a.forEach((b) => {
          minX = Math.min(b.x1, b.x2, minX);
          maxX = Math.max(b.x1, b.x2, maxX);
        });
        return { x1: minX, y1: firstItem.y1, x2: maxX, y2: firstItem.y2 };
      });
      this.drawLines();
    }
    // 初始化辅助间隔dom
    initguideGapDom() {
      const editor = this.editor;
      const guideGapDom = editorUtil.createSvgElement(
        "svg",
        { class: "guide-gap-dom" },
        {
          pointerEvents: "none",
          position: "absolute",
          width: "100%",
          height: "100%",
          left: "0px",
          top: "0px",
          overflow: "visible"
        }
      );
      this.guideGapDom = guideGapDom;
      const overLayerDom = editor.overLayer;
      setTimeout(() => {
        overLayerDom.appendChild(this.guideGapDom);
      }, 300);
    }
    // 清除辅助间隔
    clearGuideGap() {
      this.guideGapDom.innerHTML = null;
    }
    // 绘制辅助间隔，目前此方法300多行代码，但还没抽离出公共逻辑，以后再优化 2025/04/09
    createGuideGap() {
      const { editor } = this;
      const target = editor.getActiveObject();
      if (!target || target.type === "activeSelection")
        return;
      const { offset: alignMargin } = editor.config.sorption;
      const zoom = editor.getZoom();
      this.gapVerticalList = this.gapHorizontalList = [];
      const gapHorizontalList = [];
      const gapVerticalList = [];
      const activeObjBounding = getPosition(target.getContainerPosition());
      activeObjBounding.id = target.id;
      const objs = [...this.boundingList, activeObjBounding];
      const topSortList = cloneDeep(objs).sort((a, b) => a.top - b.top).filter((a) => !(a.left > activeObjBounding.right || a.right < activeObjBounding.left));
      const topCurrentIndex = topSortList.findIndex((item) => item.id === target.id);
      const topCurrentItem = topSortList[topCurrentIndex];
      const topCurrentPreItem = topSortList[topCurrentIndex - 1];
      const topCurrentNextItem = topSortList[topCurrentIndex + 1];
      const topDistanceMap = /* @__PURE__ */ new Map();
      for (let i = 0; i < topSortList.length; i++) {
        const item = topSortList[i];
        const nextItem = topSortList[i + 1];
        if (item.id !== target.id && nextItem && nextItem.id !== target.id) {
          const distance = +(nextItem.top - item.bottom).toFixed(0);
          if (distance > 0) {
            const itemObj = topDistanceMap.get(distance);
            let obj = {
              x: Math.min(item.left, nextItem.left),
              y: item.bottom,
              w: Math.max(item.right, nextItem.right) - Math.min(item.left, nextItem.left),
              h: distance,
              value: +(distance / zoom).toFixed(0)
            };
            if (itemObj) {
              itemObj.push(obj);
            } else {
              topDistanceMap.set(distance, [obj]);
            }
          }
        }
      }
      const topKeys = Array.from(topDistanceMap.keys());
      topKeys.sort();
      let isTopAdsor = false;
      if (topCurrentPreItem) {
        const distance = +(topCurrentItem.top - topCurrentPreItem.bottom).toFixed(0);
        for (let i = 0; i < topKeys.length; i++) {
          const key = topKeys[i];
          if (this.isInRange(key, distance, alignMargin)) {
            const diff = key - distance;
            const realDiff = diff / zoom;
            const item = topDistanceMap.get(key);
            item.push({
              x: Math.min(topCurrentItem.left, topCurrentPreItem.left),
              y: topCurrentPreItem.bottom,
              w: Math.max(topCurrentItem.right, topCurrentPreItem.right) - Math.min(topCurrentItem.left, topCurrentPreItem.left),
              h: key,
              value: +(key / zoom).toFixed(0),
              isSelf: true
            });
            target.set({
              y: target.y + realDiff
            });
            isTopAdsor = true;
            break;
          }
        }
      }
      if (topCurrentNextItem) {
        const distance = +(topCurrentNextItem.top - topCurrentItem.bottom).toFixed(0);
        for (let i = 0; i < topKeys.length; i++) {
          const key = topKeys[i];
          if (this.isInRange(key, distance, alignMargin)) {
            const diff = key - distance;
            const realDiff = diff / zoom;
            const item = topDistanceMap.get(key);
            item.push({
              x: Math.min(topCurrentItem.left, topCurrentNextItem.left),
              y: topCurrentNextItem.top - key,
              w: Math.max(topCurrentItem.right, topCurrentNextItem.right) - Math.min(topCurrentItem.left, topCurrentNextItem.left),
              h: key,
              value: +(key / zoom).toFixed(0),
              isSelf: true
            });
            if (!isTopAdsor) {
              target.set({
                y: target.y - realDiff
              });
            }
            break;
          }
        }
      }
      if (!isTopAdsor && topCurrentPreItem && topCurrentNextItem) {
        const centerY = (topCurrentNextItem.top + topCurrentPreItem.bottom) / 2;
        if (this.isInRange(centerY, topCurrentItem.centerY, alignMargin)) {
          const diff = centerY - topCurrentItem.centerY;
          const realDiff = diff / zoom;
          const key = +((topCurrentNextItem.top - topCurrentPreItem.bottom - topCurrentItem.h) / 2).toFixed(0);
          const item = topDistanceMap.get(key);
          if (key > 0) {
            const objs2 = [
              {
                x: Math.min(topCurrentItem.left, topCurrentPreItem.left),
                y: topCurrentPreItem.bottom,
                w: Math.max(topCurrentItem.right, topCurrentPreItem.right) - Math.min(topCurrentItem.left, topCurrentPreItem.left),
                h: key,
                value: +(key / zoom).toFixed(0),
                isSelf: true
              },
              {
                x: Math.min(topCurrentItem.left, topCurrentNextItem.left),
                y: topCurrentNextItem.top - key,
                w: Math.max(topCurrentItem.right, topCurrentNextItem.right) - Math.min(topCurrentItem.left, topCurrentNextItem.left),
                h: key,
                value: +(key / zoom).toFixed(0)
              }
            ];
            if (item) {
              item.push(...objs2);
            } else {
              topDistanceMap.set(key, objs2);
            }
            target.set({
              y: target.y + realDiff
            });
          }
        }
      }
      topDistanceMap.forEach((item) => {
        if (item.length > 1 && item.some((a) => a.isSelf)) {
          gapHorizontalList.push(...item);
        }
      });
      this.gapHorizontalList = gapHorizontalList;
      if (!isTopAdsor) {
        const leftSortList = cloneDeep(objs).sort((a, b) => a.left - b.left).filter((a) => !(a.top > activeObjBounding.bottom || a.bottom < activeObjBounding.top));
        const leftCurrentIndex = leftSortList.findIndex((item) => item.id === target.id);
        const leftCurrentItem = leftSortList[leftCurrentIndex];
        const leftCurrentPreItem = leftSortList[leftCurrentIndex - 1];
        const leftCurrentNextItem = leftSortList[leftCurrentIndex + 1];
        const leftDistanceMap = /* @__PURE__ */ new Map();
        for (let i = 0; i < leftSortList.length; i++) {
          const item = leftSortList[i];
          const nextItem = leftSortList[i + 1];
          if (item.id !== target.id && nextItem && nextItem.id !== target.id) {
            const distance = +(nextItem.left - item.right).toFixed(0);
            if (distance > 0) {
              const itemObj = leftDistanceMap.get(distance);
              let obj = {
                x: item.right,
                y: Math.min(item.top, nextItem.top),
                w: distance,
                h: Math.max(item.bottom, nextItem.bottom) - Math.min(item.top, nextItem.top),
                value: +(distance / zoom).toFixed(0)
              };
              if (itemObj) {
                itemObj.push(obj);
              } else {
                leftDistanceMap.set(distance, [obj]);
              }
            }
          }
        }
        const leftKeys = Array.from(leftDistanceMap.keys());
        leftKeys.sort();
        let isLeftAdsor = false;
        if (leftCurrentPreItem) {
          const distance = +(leftCurrentItem.left - leftCurrentPreItem.right).toFixed(0);
          for (let i = 0; i < leftKeys.length; i++) {
            const key = leftKeys[i];
            if (this.isInRange(key, distance, alignMargin)) {
              const diff = key - distance;
              const realDiff = diff / zoom;
              const item = leftDistanceMap.get(key);
              item.push({
                x: leftCurrentPreItem.right,
                y: Math.min(leftCurrentItem.top, leftCurrentPreItem.top),
                w: key,
                h: Math.max(leftCurrentItem.bottom, leftCurrentPreItem.bottom) - Math.min(leftCurrentItem.top, leftCurrentPreItem.top),
                value: +(key / zoom).toFixed(0),
                isSelf: true
              });
              target.set({
                x: target.x + realDiff
              });
              isLeftAdsor = true;
              break;
            }
          }
        }
        if (leftCurrentNextItem) {
          const distance = +(leftCurrentNextItem.left - leftCurrentItem.right).toFixed(0);
          for (let i = 0; i < leftKeys.length; i++) {
            const key = leftKeys[i];
            if (this.isInRange(key, distance, alignMargin)) {
              const diff = key - distance;
              const realDiff = diff / zoom;
              const item = leftDistanceMap.get(key);
              item.push({
                x: leftCurrentNextItem.left - key,
                y: Math.min(leftCurrentItem.top, leftCurrentNextItem.top),
                w: key,
                h: Math.max(leftCurrentItem.bottom, leftCurrentNextItem.bottom) - Math.min(leftCurrentItem.top, leftCurrentNextItem.top),
                value: +(key / zoom).toFixed(0),
                isSelf: true
              });
              if (!isLeftAdsor) {
                target.set({
                  x: target.x - realDiff
                });
              }
            }
          }
        }
        if (!isLeftAdsor && leftCurrentPreItem && leftCurrentNextItem) {
          const centerX = (leftCurrentNextItem.left + leftCurrentPreItem.right) / 2;
          if (this.isInRange(centerX, leftCurrentItem.centerX, alignMargin)) {
            const diff = centerX - leftCurrentItem.centerX;
            const realDiff = diff / zoom;
            const key = +((leftCurrentNextItem.left - leftCurrentPreItem.right - leftCurrentItem.w) / 2).toFixed(0);
            if (key > 0) {
              const item = leftDistanceMap.get(key);
              const objs2 = [
                {
                  x: leftCurrentPreItem.right,
                  y: Math.min(leftCurrentItem.top, leftCurrentPreItem.top),
                  w: key,
                  h: Math.max(leftCurrentItem.bottom, leftCurrentPreItem.bottom) - Math.min(leftCurrentItem.top, leftCurrentPreItem.top),
                  value: +(key / zoom).toFixed(0),
                  isSelf: true
                },
                {
                  x: leftCurrentNextItem.left - key,
                  y: Math.min(leftCurrentItem.top, leftCurrentNextItem.top),
                  w: key,
                  h: Math.max(leftCurrentItem.bottom, leftCurrentNextItem.bottom) - Math.min(leftCurrentItem.top, leftCurrentNextItem.top),
                  value: +(key / zoom).toFixed(0)
                }
              ];
              if (item) {
                item.push(...objs2);
              } else {
                leftDistanceMap.set(key, objs2);
              }
              target.set({
                x: target.x + realDiff
              });
            }
          }
        }
        leftDistanceMap.forEach((item) => {
          if (item.length > 1 && item.some((a) => a.isSelf)) {
            gapVerticalList.push(...item);
          }
        });
        this.gapVerticalList = gapVerticalList;
      }
      this.drawGap();
    }
    // 绘制辅助间隔
    drawGap() {
      const { guideGapDom, gapHorizontalList, gapVerticalList } = this;
      let hgap = "";
      const getRectString = ({ x, y, w, h }) => {
        return `<rect
      x="${x}"
      y="${y}"
      width="${w}"
      height="${h}"
      stroke="none"
      fill="rgba(242, 61, 209, 0.3)"
    />`;
      };
      gapHorizontalList.forEach((item) => {
        const { x, y, h, value } = item;
        hgap += getRectString(item);
        hgap += ` <text x="${x - 16}" y="${y + h / 2 + 3}" text-anchor="right" fill="rgba(242, 61, 209)" font-size="10" style="user-select:none">${value}</text>
    `;
      });
      gapVerticalList.forEach((item) => {
        const { x, y, w, value } = item;
        hgap += getRectString(item);
        hgap += ` <text x="${x + w / 2}" y="${y - 6}" text-anchor="middle" fill="rgba(242, 61, 209)" font-size="10" style="user-select:none">${value}</text>
    `;
      });
      guideGapDom.innerHTML = `<g>${hgap}</g>`;
    }
  }
  const getPosition = (bounding) => {
    const { x, y, w, h, id } = bounding;
    return {
      id,
      left: x,
      right: x + w,
      top: y,
      bottom: y + h,
      centerX: x + w / 2,
      centerY: y + h / 2,
      w,
      h
    };
  };
  class SelectionHandler {
    constructor(editor) {
      this.selectAreaDom = null;
      this.position = {
        width: 0,
        height: 0,
        startX: 0,
        startY: 0
      };
      this.editor = editor;
      this.initialize();
    }
    initialize() {
      this.initselectAreaDom();
      this.initEvent();
    }
    initEvent() {
      const self2 = this;
      const { editor } = self2;
      const editorDom = editor.getEditorDom();
      const { selectionBackground, selectionBorderColor } = editor.config;
      editor.on("editor:mousedown", (event) => {
        const { e, target } = event;
        if (editor.grabing || e.button === 2) {
          editor.zoomHandler.zoomMoveTo(e);
          return;
        }
        if (!editor.selection || editor.mode === "draw")
          return;
        let isFrameSelect = false;
        let mousedownState;
        let everAltKey = false;
        const { x: areaStartX, y: areaStartY } = editor.getMousePosition(e);
        const oldTarget = editor.getActiveObject();
        if (target) {
          if (e.altKey) {
            everAltKey = true;
            mousedownState = editor.getActiveObjectPositionState(ObjectAttrsEnum.all);
            editor.objectHandler.multiplex(target).then(() => {
              editor.layerChange();
            });
          } else if (oldTarget && oldTarget.id !== target.id || !oldTarget) {
            let newTargets = [];
            if (e.ctrlKey || e.metaKey || e.shiftKey) {
              const objs = editor.getActiveObjects();
              const index = objs.findIndex((a) => a.id === target.id);
              if (index > -1) {
                newTargets = objs.slice(0, index).concat(objs.slice(index + 1));
              } else {
                newTargets = objs.concat([target]);
              }
              editor.setActiveObjects(newTargets);
            } else {
              editor.setActiveObjects([target]);
            }
          }
        } else if (oldTarget) {
          editor.discardActiveObject();
        }
        let [areaEndX, areaEndY] = [areaStartX, areaStartY];
        const activeObj = editor.getActiveObject();
        if (activeObj && !everAltKey) {
          mousedownState = editor.getActiveObjectPositionState();
        }
        const positionMap = editor.getPositionMap();
        const getTotalAngle = (obj) => {
          let angle = 0;
          const recursion = (item) => {
            if (item.group) {
              angle += item.group.angle;
              recursion(item.group);
            }
          };
          recursion(obj);
          return angle;
        };
        const mousemove = (moveEvent) => {
          if (!moveEvent.ctrlKey && editor.mode !== "draw") {
            const mousePoint = editor.getMousePosition(moveEvent);
            areaEndX = mousePoint.x;
            areaEndY = mousePoint.y;
            const activeObject = editor.getActiveObject();
            if (activeObject) {
              const interrupt = activeObject.locked || activeObj.editing || areaStartX === areaEndX && areaStartY === areaEndY;
              if (!interrupt) {
                const { a: scale2 } = editor.viewportTransform;
                const totalAngle = getTotalAngle(activeObject);
                const origin = positionMap.get(activeObject.id);
                let [diffX, diffY] = [(areaEndX - areaStartX) / scale2, (areaEndY - areaStartY) / scale2];
                const { xLength, yLength } = editorUtil.getProjection({ x: diffX, y: diffY }, totalAngle);
                diffX = xLength;
                diffY = yLength;
                if (moveEvent.shiftKey || moveEvent.altKey) {
                  const isHorizontal = Math.abs(diffX) > Math.abs(diffY);
                  if (isHorizontal) {
                    diffY = 0;
                  } else {
                    diffX = 0;
                  }
                }
                activeObject.x = origin.x + diffX;
                activeObject.y = origin.y + diffY;
                if (activeObject.type === "activeSelection") {
                  activeObject.objects.forEach((item) => {
                    const originItem = positionMap.get(item.id);
                    item.x = originItem.x + diffX;
                    item.y = originItem.y + diffY;
                  });
                }
                editor.zoomHandler.setHighPerformance(true);
                editor.fire("object:moving", { e: moveEvent, target: activeObject });
                activeObject.updateControlsPosition();
              }
            } else if (!editor.group) {
              const [width, height] = [Math.abs(areaStartX - areaEndX), Math.abs(areaStartY - areaEndY)];
              if (width > 5 || height > 5) {
                const center = { x: (areaStartX + areaEndX) / 2, y: (areaStartY + areaEndY) / 2 };
                const [startX, startY] = [center.x - width / 2, center.y - height / 2];
                self2.position = { startX, startY, width, height };
                isFrameSelect = true;
                self2.selectAreaDom.innerHTML = `
            <path
              fill="${selectionBackground || "rgba(44, 131, 251, 0.1)"}"
              stroke="${selectionBorderColor || "rgba(44, 131, 251, 1)"}"
              d="M ${startX},${startY}
              L ${startX},${startY + height}
              L ${startX + width},${startY + height}
              L ${startX + width},${startY} Z"
              style="stroke-width: 1;"
            />
          `;
              }
            }
          }
        };
        const mouseup = (mouseEv) => {
          if (editor.mode !== "draw") {
            if (isFrameSelect) {
              const inverseMatrix = inverse(editor.viewportTransform);
              const { startX, startY, width, height } = self2.position;
              const startPos = applyToPoint(inverseMatrix, { x: startX, y: startY });
              const endPos = applyToPoint(inverseMatrix, { x: startX + width, y: startY + height });
              const box = { x: startPos.x, y: startPos.y, w: endPos.x - startPos.x, h: endPos.y - startPos.y };
              const objs = editor.getIntersectObjs(box, editor.objects);
              editor.setActiveObjects(objs);
            }
            self2.position.width = 0;
            self2.position.height = 0;
            self2.selectAreaDom.innerHTML = null;
            if (!isFrameSelect && (areaEndX !== areaStartX || areaEndY !== areaStartY)) {
              const activeObj2 = editor.getActiveObject();
              if (activeObj2 && !activeObj2.editing) {
                editor.zoomHandler.setHighPerformance(false);
                editor.fire("object:move:end", { e: mouseEv, target: activeObj2 });
                if (mousedownState) {
                  if (everAltKey) {
                    editor.historyHandler.store({
                      type: HistoryTypesEnum.add,
                      from: mousedownState,
                      to: editor.getActiveObjectPositionState(ObjectAttrsEnum.all)
                    });
                  } else {
                    editor.historyHandler.store({
                      type: HistoryTypesEnum.attrs,
                      from: mousedownState,
                      to: editor.getActiveObjectPositionState()
                    });
                  }
                }
              }
            }
          }
          document.removeEventListener("mousemove", mousemove);
          document.removeEventListener("mouseup", mouseup);
        };
        document.addEventListener("mousemove", mousemove);
        document.addEventListener("mouseup", mouseup);
      });
      editorDom.addEventListener("dblclick", (e) => {
        const target = editor.findTarget(e);
        if (target && target.type === "group") {
          editor.group = target;
          const subTarget = editor.findTarget(e);
          if (subTarget) {
            editor.setActiveObjects([subTarget]);
          } else {
            editor.discardActiveObject();
          }
        } else if (target && !e.ctrlKey) {
          target.emitter.emit("dblclick", { e });
          target.updateControlsPosition();
        } else if (!target && editor.group) {
          editor.shortcutHandler.handleEsc();
        }
      });
      editorDom.addEventListener("contextmenu", (e) => {
        let target = editor.findTarget(e, true);
        const objs = target && target.type === "activeSelection" ? target.objects : [target];
        editor.setActiveObjects(objs);
        editor.fire("mouse:contextmenu", { e, target });
      });
    }
    initselectAreaDom() {
      const { editor } = this;
      const selectAreaDom = editorUtil.createSvgElement(
        "svg",
        {},
        {
          pointerEvents: "none",
          position: "absolute",
          width: "100%",
          height: "100%",
          left: "0px",
          top: "0px",
          overflow: "visible"
        }
      );
      this.selectAreaDom = selectAreaDom;
      const overLayerDom = editor.overLayer;
      overLayerDom.appendChild(this.selectAreaDom);
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
      function Mousetrap2(targetElement) {
        var self2 = this;
        targetElement = targetElement || document2;
        if (!(self2 instanceof Mousetrap2)) {
          return new Mousetrap2(targetElement);
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
      Mousetrap2.prototype.bind = function(keys2, callback, action) {
        var self2 = this;
        keys2 = keys2 instanceof Array ? keys2 : [keys2];
        self2._bindMultiple.call(self2, keys2, callback, action);
        return self2;
      };
      Mousetrap2.prototype.unbind = function(keys2, action) {
        var self2 = this;
        return self2.bind.call(self2, keys2, function() {
        }, action);
      };
      Mousetrap2.prototype.trigger = function(keys2, action) {
        var self2 = this;
        if (self2._directMap[keys2 + ":" + action]) {
          self2._directMap[keys2 + ":" + action]({}, keys2);
        }
        return self2;
      };
      Mousetrap2.prototype.reset = function() {
        var self2 = this;
        self2._callbacks = {};
        self2._directMap = {};
        return self2;
      };
      Mousetrap2.prototype.stopCallback = function(e, element) {
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
      Mousetrap2.prototype.handleKey = function() {
        var self2 = this;
        return self2._handleKey.apply(self2, arguments);
      };
      Mousetrap2.addKeycodes = function(object) {
        for (var key in object) {
          if (object.hasOwnProperty(key)) {
            _MAP[key] = object[key];
          }
        }
        _REVERSE_MAP = null;
      };
      Mousetrap2.init = function() {
        var documentMousetrap = Mousetrap2(document2);
        for (var method in documentMousetrap) {
          if (method.charAt(0) !== "_") {
            Mousetrap2[method] = /* @__PURE__ */ function(method2) {
              return function() {
                return documentMousetrap[method2].apply(documentMousetrap, arguments);
              };
            }(method);
          }
        }
      };
      Mousetrap2.init();
      window2.Mousetrap = Mousetrap2;
      if (module2.exports) {
        module2.exports = Mousetrap2;
      }
      if (typeof undefined$1 === "function" && undefined$1.amd) {
        undefined$1(function() {
          return Mousetrap2;
        });
      }
    })(typeof window !== "undefined" ? window : null, typeof window !== "undefined" ? document : null);
  })(mousetrap);
  var mousetrapExports = mousetrap.exports;
  const Mousetrap = /* @__PURE__ */ getDefaultExportFromCjs(mousetrapExports);
  class ShortcutHandler {
    constructor(editor) {
      this.editor = editor;
      this.initEvent();
    }
    initEvent() {
      const self2 = this;
      const shortcutkeysList = [
        // repeat表示长按按键是否重复触发快捷键功能，shortcut表示快捷键，method表示要调用的方法
        // preventDefault表示是否阻止浏览器快捷键，不应该阻止浏览器的复制功能，否则无法复制文本
        // params表示要传递的额外参数
        { repeat: false, shortcut: "mod+c", method: this.handleCopy, preventDefault: false, params: [] },
        // 复制
        { repeat: false, shortcut: "mod+v", method: this.handlePaste, preventDefault: false, params: [] },
        // 粘贴
        { repeat: false, shortcut: "mod+x", method: this.handleCut, preventDefault: false, params: [] },
        // 剪切
        { repeat: false, shortcut: "mod+z", method: this.handleUndo, preventDefault: true, params: [] },
        // 撤销
        { repeat: false, shortcut: "mod+y", method: this.handleRedo, preventDefault: true, params: [] },
        // 重做
        { repeat: false, shortcut: "mod+a", method: this.handleSelectAll, preventDefault: true, params: [] },
        // 全选
        { repeat: false, shortcut: "mod+g", method: this.handleGroup, preventDefault: true, params: [] },
        // 组合
        { repeat: false, shortcut: "mod+shift+g", method: this.handleUngroup, preventDefault: true, params: [] },
        // 取消组合
        { repeat: false, shortcut: "mod+l", method: this.handleLock, preventDefault: true, params: [true] },
        // 锁定
        { repeat: false, shortcut: "mod+shift+l", method: this.handleLock, preventDefault: true, params: [false] },
        // 取消锁定
        { repeat: true, shortcut: "left", method: this.handleShortcutPosition, preventDefault: true, params: ["x", -1] },
        // 左移1像素
        { repeat: true, shortcut: "shift+left", method: this.handleShortcutPosition, preventDefault: true, params: ["x", -10] },
        // 左移10像素
        { repeat: true, shortcut: "right", method: this.handleShortcutPosition, preventDefault: true, params: ["x", 1] },
        // 右移1像素
        { repeat: true, shortcut: "shift+right", method: this.handleShortcutPosition, preventDefault: true, params: ["x", 10] },
        // 右移10像素
        { repeat: true, shortcut: "up", method: this.handleShortcutPosition, preventDefault: true, params: ["y", -1] },
        // 上移1像素
        { repeat: true, shortcut: "shift+up", method: this.handleShortcutPosition, preventDefault: true, params: ["y", -10] },
        // 上移10像素
        { repeat: true, shortcut: "down", method: this.handleShortcutPosition, preventDefault: true, params: ["y", 1] },
        // 下移1像素
        { repeat: true, shortcut: "shift+down", method: this.handleShortcutPosition, preventDefault: true, params: ["y", 10] },
        // 下移10像素
        { repeat: false, shortcut: "mod+e", method: this.handleReuse, preventDefault: true, params: [] },
        // 复用
        { repeat: false, shortcut: "mod+d", method: this.handleDiscard, preventDefault: true, params: [] },
        // 取消选中
        { repeat: false, shortcut: "mod+h", method: this.handleVisible, preventDefault: true, params: [false] },
        // 隐藏
        { repeat: false, shortcut: "mod+shift+h", method: this.handleVisible, preventDefault: true, params: [true] },
        // 显示
        { repeat: false, shortcut: ["mod++", "mod+="], method: this.handleSetZoom, preventDefault: true, params: [{ type: "zoomIn" }] },
        // 放大画布
        { repeat: false, shortcut: "mod+-", method: this.handleSetZoom, preventDefault: true, params: [{ type: "zoomOut" }] },
        // 缩小画布
        { repeat: false, shortcut: "mod+1", method: this.handleSetZoom, preventDefault: true, params: [{ type: "fitView" }] },
        // 适应画布
        { repeat: false, shortcut: "mod+0", method: this.handleSetZoom, preventDefault: true, params: [{ type: "reset" }] },
        // 回到原点
        { repeat: false, shortcut: ["del", "backspace"], method: this.handleDelete, preventDefault: true, params: [] },
        // 删除选中
        { repeat: false, shortcut: "mod+alt+up", method: this.handleLayer, preventDefault: true, params: ["bringForward"] },
        // 上移
        { repeat: false, shortcut: "mod+alt+down", method: this.handleLayer, preventDefault: true, params: ["sendBackwards"] },
        // 下移
        { repeat: false, shortcut: "mod+shift+up", method: this.handleLayer, preventDefault: true, params: ["bringToFront"] },
        // 置顶
        { repeat: false, shortcut: "mod+shift+down", method: this.handleLayer, preventDefault: true, params: ["sendToBack"] },
        // 置底
        { repeat: false, shortcut: "esc", method: this.handleEsc, preventDefault: true, params: [] }
        // 退出编辑
      ];
      let activeShortcutKeys;
      shortcutkeysList.forEach((item) => {
        const { repeat, shortcut, method, preventDefault, params = [] } = item;
        Mousetrap.bind(
          shortcut,
          function(e) {
            const stopFlag = activeShortcutKeys === shortcut && !repeat;
            if (stopFlag) {
              return;
            }
            if (preventDefault) {
              e.preventDefault();
            }
            activeShortcutKeys = shortcut;
            method.apply(self2, params);
          },
          "keydown"
        );
      });
      document.addEventListener("keyup", (e) => {
        const findObj = shortcutkeysList.find((item) => item.shortcut === activeShortcutKeys);
        if (findObj && findObj.repeat) {
          findObj.method.apply(self2, [...findObj.params, true]);
        }
        activeShortcutKeys = "";
      });
    }
    handleOperation({ action, param, value }) {
      switch (action) {
        case "selectAll":
          this.handleSelectAll();
          break;
        case "group":
          this.handleGroup();
          break;
        case "ungroup":
          this.handleUngroup();
          break;
        case "arrowLeft":
        case "arrowRight":
          this.handleMoveHorizontal(param);
          break;
        case "arrowUp":
        case "arrowDown":
          this.handleMoveVertical(param);
          break;
        case "copy":
          this.handleCopy();
          break;
        case "paste":
          this.handlePaste(param);
          break;
        case "cut":
          this.handleCut();
          break;
        case "reuse":
          this.handleReuse();
          break;
        case "esc":
          this.handleEsc();
          break;
        case "add":
          this.handleAddObject(param);
          break;
        case "delete":
          this.handleDelete();
          break;
        case "bringForward":
        case "sendBackwards":
        case "bringToFront":
        case "sendToBack":
          this.handleLayer(action);
          break;
        case "undo":
          this.handleUndo();
          break;
        case "redo":
          this.handleRedo();
          break;
        case "align":
          this.handleAlign(param);
          break;
        case "lock":
          this.handleLock(true);
          break;
        case "unlock":
          this.handleLock(false);
          break;
        case "attribute":
          this.handleAttribute(param);
          break;
        case "updateLayer":
          this.handleUpdateLayer(param);
          break;
        case "setZoom":
          this.handleSetZoom(param);
          break;
        case "zoomToFit":
          this.handleZoomToFit();
          break;
        case "editorConfig":
          this.handleEditorConfig(param);
          break;
        case "visible":
          this.handleVisible(param);
          break;
        case "alignEqual":
          this.handleAlignEqual(param, value);
          break;
        case "setSelection":
          this.handleSetSelection(param);
          break;
      }
    }
    /**
     * 设置对象锁定
     * @param locked 是否锁定
     */
    handleLock(locked) {
      const { editor } = this;
      const objs = editor.getActiveObjects();
      const activeSelection = editor.getActiveSelectionPosition();
      let toData = [];
      let fromData = [];
      objs.forEach((item) => {
        const { id } = item;
        toData.push({ data: { id, locked } });
        fromData.push({ data: { id, locked: !locked } });
      });
      const data = {
        type: HistoryTypesEnum.attrs,
        to: {
          activeSelection,
          data: toData
        },
        from: {
          activeSelection,
          data: fromData
        }
      };
      this.handleAttribute(data);
    }
    handleUndo() {
      const { editor } = this;
      editor.historyHandler.undo();
    }
    handleRedo() {
      const { editor } = this;
      editor.historyHandler.redo();
    }
    /**
     * 层级操作
     * @param {String} type。bringForward 上移；sendBackwards 下移；bringToFront 置顶；sendToBack 置底
     */
    handleLayer(type) {
      const { editor } = this;
      const objs = editor.getActiveObjects();
      if (objs.length) {
        const firstObj = objs[0];
        const parent = firstObj.group || editor;
        const parentId = firstObj.group ? firstObj.group.id : "";
        const sameLevelCount = parent.objects.length;
        if (objs.some((item) => {
          const itemParentId = item.group ? item.group.id : "";
          return parentId !== itemParentId;
        })) {
          return editorUtil.logError("can not operate different group object");
        }
        if (sameLevelCount === objs.length) {
          return editorUtil.logError("dont operate all object in same level");
        }
        const relationship = editor.getObjectsParentRelationship(objs);
        relationship.sort((a, b) => a.path - b.path);
        const firstObjIndex = relationship[0].index;
        let finalIndex = 0;
        switch (type) {
          case "bringForward":
            finalIndex = firstObjIndex + 1;
            if (finalIndex > sameLevelCount) {
              return;
            }
            break;
          case "sendBackwards":
            finalIndex = firstObjIndex - 1;
            if (finalIndex < 0) {
              return;
            }
            break;
          case "bringToFront":
            finalIndex = sameLevelCount;
            break;
          case "sendToBack":
            finalIndex = 0;
            break;
        }
        const data = { idList: objs.map((a) => a.id), parentId, index: finalIndex };
        this.handleUpdateLayer(data);
      }
    }
    handleDelete() {
      const { editor } = this;
      const activeObjs = editor.getActiveObjects();
      const activeObj = editor.getActiveObject();
      let isDeleteControlPoint = false;
      if (activeObj && activeObj.controls && activeObj.controls.deleteActiveControlPoint) {
        isDeleteControlPoint = activeObj.controls.deleteActiveControlPoint();
      }
      if (!isDeleteControlPoint) {
        if (activeObjs.length) {
          const activePositionState = editor.getActiveObjectPositionState(ObjectAttrsEnum.all);
          editor.objectHandler.remove(activeObjs);
          editor.historyHandler.store({
            type: HistoryTypesEnum.delete,
            from: activePositionState,
            to: {
              activeSelection: null,
              data: []
            }
          });
          editor.layerChange();
        }
      }
    }
    /**
     * 退到上一层
     */
    handleEsc() {
      const { editor } = this;
      if (editor.group) {
        const { group } = editor;
        const { x, y, w, h, angle } = editor.calcGroupPositionBySubs(group);
        let [diffX, diffY] = [group.x - x, group.y - y];
        const groupOldLeftTop = { x: group.x, y: group.y };
        const groupOldCenter = { x: group.x + group.w / 2, y: group.y + group.h / 2 };
        const groupNewCenter = { x: x + w / 2, y: y + h / 2 };
        const groupNewLeftTop = { x, y };
        const p1 = editorUtil.rotatePoint(groupOldLeftTop, groupOldCenter, angle);
        const p2 = editorUtil.rotatePoint(groupNewLeftTop, groupNewCenter, angle);
        diffX = p1.x - p2.x;
        diffY = p1.y - p2.y;
        const { xLength, yLength } = editorUtil.getProjection({ x: diffX, y: diffY }, angle);
        diffX = xLength;
        diffY = yLength;
        group.objects.forEach((item) => {
          item.x += diffX;
          item.y += diffY;
        });
        group.x = x;
        group.y = y;
        group.w = w;
        group.h = h;
        group.angle = angle;
        editor.group = group.group || null;
        editor.setActiveObjects([group]);
      }
    }
    handleCopy() {
      const { editor } = this;
      editor.objectHandler.copy(false);
    }
    handleCut() {
      const { editor } = this;
      const activePositionState = editor.getActiveObjectPositionState(ObjectAttrsEnum.all);
      editor.objectHandler.copy(true).then(() => {
        const nowState = editor.getActiveObjectPositionState();
        editor.historyHandler.store({
          type: HistoryTypesEnum.delete,
          from: activePositionState,
          to: nowState
        });
        editor.layerChange();
      });
    }
    handleReuse() {
      const { editor } = this;
      const activeObj = editor.getActiveObject();
      if (activeObj) {
        const activePositionState = editor.getActiveObjectPositionState(ObjectAttrsEnum.all);
        editor.objectHandler.multiplex(activeObj, editor.config.multiplexOffset).then(() => {
          const nowState = editor.getActiveObjectPositionState(ObjectAttrsEnum.all);
          editor.historyHandler.store({
            type: HistoryTypesEnum.add,
            from: activePositionState,
            to: nowState
          });
          editor.layerChange();
        });
      }
    }
    handlePaste(mousePosition) {
      const { editor } = this;
      const activePositionState = editor.getActiveObjectPositionState(ObjectAttrsEnum.all);
      editor.objectHandler.paste(mousePosition).then(() => {
        const data = {
          type: HistoryTypesEnum.add,
          from: activePositionState,
          to: editor.getActiveObjectPositionState(ObjectAttrsEnum.all)
        };
        editor.historyHandler.store(data);
        editor.layerChange();
      });
    }
    handleMoveHorizontal(value) {
      const { editor } = this;
      const activePositionState = editor.getActiveObjectPositionState();
      editor.objectHandler.move("left", value).then(() => {
        editor.historyHandler.store({
          type: HistoryTypesEnum.attrs,
          from: activePositionState,
          to: editor.getActiveObjectPositionState()
        });
      });
    }
    handleMoveVertical(value) {
      const { editor } = this;
      const activePositionState = editor.getActiveObjectPositionState();
      editor.objectHandler.move("top", value).then(() => {
        editor.historyHandler.store({
          type: HistoryTypesEnum.attrs,
          from: activePositionState,
          to: editor.getActiveObjectPositionState()
        });
      });
    }
    handleGroup() {
      const { editor } = this;
      const activePositionState = editor.getActiveObjectPositionState(ObjectAttrsEnum.all);
      editor.objectHandler.group().then(() => {
        editor.historyHandler.store({
          type: HistoryTypesEnum.inversion,
          from: activePositionState,
          to: editor.getActiveObjectPositionState(ObjectAttrsEnum.all)
        });
        editor.layerChange();
      });
    }
    handleUngroup() {
      const { editor } = this;
      const activePositionState = editor.getActiveObjectPositionState(ObjectAttrsEnum.all);
      editor.objectHandler.ungroup().then(() => {
        editor.historyHandler.store({
          type: HistoryTypesEnum.inversion,
          from: activePositionState,
          to: editor.getActiveObjectPositionState(ObjectAttrsEnum.all)
        });
        editor.layerChange();
      });
    }
    handleSelectAll() {
      const { editor } = this;
      let objs = [];
      if (editor.group) {
        objs = editor.group.objects;
      } else {
        objs = editor.objects.filter((a) => !a.locked && a.visible);
      }
      editor.setActiveObjects(objs);
    }
    handleAlign(type) {
      const { editor } = this;
      const activePositionState = editor.getActiveObjectPositionState();
      editor.alignHandler.align(type).then(() => {
        editor.historyHandler.store({
          type: HistoryTypesEnum.attrs,
          from: activePositionState,
          to: editor.getActiveObjectPositionState()
        });
      });
    }
    /**
     * 处理对象属性变化
     * @param from: {activeSelection: null, data:[{index: 0, parentId: null, data:{id: '',x:12,y:0}}]}
     * @param to: {activeSelection: null, data: [index: 0, parentId: null, data:{id: '',x:32,y:9}]}
     *
     */
    handleAttribute(e = { from: {}, to: {} }) {
      const { editor } = this;
      const { from, to } = e;
      const data = to.data.map((a) => a.data);
      editor.objectHandler.attribute(data).then(() => {
        const obj = data[0];
        const keyList = Object.keys(obj);
        const activeObj = editor.getActiveObject();
        const layerTriggerKeys = ["locked", "visible"];
        const positionKeys = ["x", "y", "w", "h", "angle"];
        if (xor(keyList, layerTriggerKeys).length) {
          editor.layerChange();
          activeObj.updateControlsPosition();
        }
        if (xor(keyList, positionKeys).length) {
          if (activeObj.type === "activeSelection") {
            editor.setActiveObjects(activeObj.objects);
          }
        }
        if (from) {
          editor.historyHandler.store({
            type: HistoryTypesEnum.attrs,
            from,
            to
          });
        }
      });
    }
    /**
     * 更新层级
     */
    handleUpdateLayer({ idList = [], parentId = "", index = 0 }) {
      const { editor } = this;
      const parentObj = parentId ? editor.getObjectById(parentId) : editor;
      const objs = editor.getObjectsByCondition((a) => idList.includes(a.id));
      if (!objs.length) {
        return editorUtil.logError("no object found");
      }
      const relationship = editor.getObjectsParentRelationship(objs);
      relationship.sort((a, b) => a.path - b.path);
      let parentIdList = relationship.reduce((pre, cur) => {
        pre.push(...cur.parentIdList);
        return pre;
      }, []);
      parentIdList = [...new Set(parentIdList)];
      if (parentIdList.some((a) => idList.includes(a))) {
        return editorUtil.logError("cannot operate parent and children at the same time");
      }
      let isAllSameParent = true;
      let isEverySameStep = true;
      for (let i = relationship.length - 1; i >= 0; i--) {
        const item = relationship[i];
        if (item.parentId === parentId && item.index < index) {
          index--;
        }
        if (item.parentId !== parentId) {
          isAllSameParent = false;
        }
        if (i > 0) {
          const preItem = relationship[i - 1];
          if (item.index - preItem.index !== 1) {
            isEverySameStep = false;
          }
        }
      }
      if (isAllSameParent && isEverySameStep && index === relationship[0].index) {
        return editorUtil.logError("no need to move");
      }
      const activePositionState = editor.getActiveObjectPositionState(ObjectAttrsEnum.all);
      const objsGlobalPosList = objs.map((a) => {
        return __spreadValues({ id: a.id }, a.getGlobalPosition());
      });
      objs.forEach((item) => {
        removeObject(item);
        const position = objsGlobalPosList.find((a) => a.id === item.id);
        Object.assign(item, position);
      });
      const toResetGroupList = [];
      objs.forEach((item, itemIndex) => {
        if (parentObj.type === "group") {
          const parentMatrix = editorUtil.getTotalMatrix(parentObj, false, true);
          editorUtil.applyMatrix(item, inverse(parentMatrix));
          item.group = parentObj;
          if (!toResetGroupList.find((a) => a.id === parentObj.id)) {
            toResetGroupList.push(parentObj);
          }
        }
        parentObj.objects.splice(index + itemIndex, 0, item);
      });
      toResetGroupList.forEach((item) => {
        editorUtil.resetGroupPosition(item);
      });
      editor.setActiveObjects(objs);
      editor.historyHandler.store({
        type: HistoryTypesEnum.inversion,
        from: activePositionState,
        to: editor.getActiveObjectPositionState(ObjectAttrsEnum.all)
      });
      editor.layerChange();
    }
    handleAddObject(obj) {
      const { editor } = this;
      const activePositionState = editor.getActiveObjectPositionState(ObjectAttrsEnum.all);
      const objList = Array.isArray(obj) ? obj : [obj];
      editor.add(objList).then(() => {
        editor.setActiveObjects(objList);
        editor.historyHandler.store({
          type: HistoryTypesEnum.add,
          from: activePositionState,
          to: editor.getActiveObjectPositionState(ObjectAttrsEnum.all)
        });
        editor.layerChange();
      });
    }
    handleSetZoom(value) {
      const { editor } = this;
      editor.zoomHandler.setZoom(value);
    }
    handleZoomToFit() {
      const { editor } = this;
      editor.zoomHandler.zoomFitView();
    }
    handleEditorConfig(e = { from: {}, to: {} }) {
      const { editor } = this;
      const { from, to } = e;
      Object.assign(editor.config, to);
      if (from) {
        editor.historyHandler.store({
          type: HistoryTypesEnum.config,
          from,
          to
        });
      }
    }
    /**
     * 设置选中对象可见性
     * @param visible 是否可见
     */
    handleVisible(visible) {
      const { editor } = this;
      const objs = editor.getActiveObjects();
      const activeSelection = editor.getActiveSelectionPosition();
      let toData = [];
      let fromData = [];
      objs.forEach((item) => {
        const { id } = item;
        toData.push({ data: { id, visible } });
        fromData.push({ data: { id, visible: !visible } });
      });
      const data = {
        type: HistoryTypesEnum.attrs,
        to: {
          activeSelection,
          data: toData
        },
        from: {
          activeSelection,
          data: fromData
        }
      };
      this.handleAttribute(data);
    }
    /**
     * 丢弃选中
     */
    handleDiscard() {
      const { editor } = this;
      editor.discardActiveObject();
    }
    /**
     * 处理快捷键上下左右移动
     * @param key 对象key
     * @param distance 方位移动距离
     * @param isSaveAction 是否保存到历史记录
     */
    handleShortcutPosition(key, distance, isSaveAction) {
      const { editor } = this;
      const activeSelection = editor.getActiveSelectionPosition();
      let toData = [];
      let fromData = [];
      const objs = editor.getActiveObjects();
      const hasLockedObj = objs.some((item) => item.locked);
      if (hasLockedObj) {
        return;
      }
      objs.forEach((item) => {
        const value = Reflect.get(item, key);
        const tempValue = Reflect.get(item, `__${key}`);
        if (tempValue === void 0) {
          Reflect.set(item, `__${key}`, value);
        }
        const { id } = item;
        const obj = { id };
        Reflect.set(obj, key, isSaveAction ? value : value + distance);
        toData.push({ data: obj });
        if (isSaveAction) {
          const obj2 = { id };
          Reflect.set(obj2, key, tempValue);
          fromData.push({ data: obj2 });
          Reflect.deleteProperty(item, `__${key}`);
        }
      });
      const data = {
        type: HistoryTypesEnum.attrs,
        to: {
          activeSelection,
          data: toData
        }
      };
      if (isSaveAction) {
        Reflect.set(data, "from", { activeSelection, data: fromData });
      }
      this.handleAttribute(data);
      editor.fire("object:modified", { target: editor.getActiveObject() });
    }
    handleAlignEqual(params, value) {
      const { editor } = this;
      const fromState = editor.getActiveObjectPositionState(ObjectAttrsEnum.position);
      let saveFlag = true;
      switch (params) {
        case "width":
          this.handleEqualSize("width");
          break;
        case "height":
          this.handleEqualSize("height");
          break;
        case "widthAndHeight":
          this.handleEqualSize("widthAndHeight");
          break;
        case "horizontalDistance":
          this.handleEqualDistance("horizontalDistance", value);
          break;
        case "verticalDistance":
          this.handleEqualDistance("verticalDistance", value);
          break;
        default:
          saveFlag = false;
          break;
      }
      if (saveFlag) {
        const toState = editor.getActiveObjectPositionState(ObjectAttrsEnum.position);
        if (JSON.stringify(fromState) !== JSON.stringify(toState)) {
          editor.historyHandler.store({
            type: HistoryTypesEnum.attrs,
            from: fromState,
            to: toState
          });
        }
      }
    }
    // 等宽等高。等宽以最左边元素为基准；等高以最上边元素为基准。等宽等高优先判断最左其次判断最上
    handleEqualSize(type) {
      const { editor } = this;
      const objs = editor.getActiveObjects();
      if (!objs || objs.length === 0)
        return;
      let minItem = null;
      objs.sort((a, b) => a.x - b.x);
      objs.forEach((item) => {
        if (minItem === null) {
          minItem = item;
        } else {
          switch (type) {
            case "widthAndHeight":
              minItem = item.x < minItem.x && item.y < minItem.y ? item : minItem;
              break;
            case "width":
              minItem = item.x < minItem.x ? item : minItem;
              break;
            case "height":
              minItem = item.y < minItem.y ? item : minItem;
              break;
          }
        }
      });
      const { id, w, h } = minItem;
      let obj = {};
      switch (type) {
        case "widthAndHeight":
          obj = {
            w,
            h
          };
          break;
        case "width":
          obj = {
            w
          };
          break;
        case "height":
          obj = {
            h
          };
          break;
      }
      objs.forEach((item) => {
        if (item.id !== id && item.set) {
          item.set(obj);
        }
      });
      editor.setActiveObjects(objs);
    }
    // 等距离
    handleEqualDistance(params, distance) {
      this.editor.alignHandler.align(params, distance);
    }
    // 批量设置选中
    handleSetSelection(idList = []) {
      const objs = this.editor.getObjectsByCondition((item) => idList.includes(item.id));
      this.editor.setActiveObjects(objs);
    }
  }
  const removeObject = (obj) => {
    const parent = obj.group || obj.editor;
    const findIndex2 = parent.objects.findIndex((item) => item.id === obj.id);
    if (findIndex2 > -1) {
      parent.objects.splice(findIndex2, 1);
    }
    delete obj.group;
  };
  const drawLine = (editor, option = {}, callback) => {
    return new Promise((resolve) => {
      const points = [];
      const fill = option.fill || "rgba(0,0,0,0)";
      const stroke = option.stroke || "#000";
      const strokeWidth = option.strokeWidth || 2;
      let drawingRefDom = null;
      const editorDom = editor.getEditorDom();
      editor.mode = "draw";
      editor.discardActiveObject();
      const handleMouseDown = (e) => {
        const { x, y } = editor.getMouseInnerPosition(e);
        points.push({ x, y });
        const rect = editorUtil.createSvgElement("line", {
          stroke,
          "stroke-width": strokeWidth,
          x1: x,
          y1: y,
          x2: x,
          y2: y
        });
        drawingRefDom = rect;
        editor.drawLayer.innerHTML = "";
        editor.drawLayer.appendChild(rect);
        document.addEventListener("mousemove", handleMouseMove);
        document.addEventListener("mouseup", handleMouseUp);
      };
      const handleMouseMove = (e) => {
        let { x, y } = editor.getMouseInnerPosition(e);
        if (e.shiftKey) {
          const disX = Math.abs(x - points[0].x);
          const disY = Math.abs(y - points[0].y);
          if (disX > disY)
            y = points[0].y;
          else
            x = points[0].x;
        }
        drawingRefDom.setAttribute("x2", x);
        drawingRefDom.setAttribute("y2", y);
      };
      const handleMouseUp = (e) => {
        const { x: x1, y: y1 } = points[0];
        const { x: x2, y: y2 } = editor.getMouseInnerPosition(e);
        const w = Math.abs(x1 - x2);
        const h = Math.abs(y1 - y2);
        const x = Math.min(x1, x2);
        const y = Math.min(y1, y2);
        disposeEvents();
        resolve({
          type: "line",
          x,
          y,
          w,
          h,
          x1: x1 - x,
          y1: y1 - y,
          x2: x2 - x,
          y2: y2 - y,
          fill,
          stroke,
          strokeWidth
        });
      };
      const disposeEvents = () => {
        editorDom.removeEventListener("mousedown", handleMouseDown);
        document.removeEventListener("mousemove", handleMouseMove);
        document.removeEventListener("mouseup", handleMouseUp);
        editor.mode = "select";
        editor.drawLayer.innerHTML = "";
      };
      editorDom.addEventListener("mousedown", handleMouseDown);
      if (typeof callback === "function") {
        callback({ disposeEvents });
      }
    });
  };
  const drawRect = (editor, option = {}, callback) => {
    return new Promise((resolve) => {
      const points = [];
      const fill = option.fill || "rgba(0,0,0,0)";
      const stroke = option.stroke || "#000";
      const strokeWidth = option.strokeWidth || 2;
      let drawingRefDom = null;
      const editorDom = editor.getEditorDom();
      editor.mode = "draw";
      editor.discardActiveObject();
      const handleMouseDown = (e) => {
        const { x, y } = editor.getMouseInnerPosition(e);
        const [w, h] = ["0", "0", "0", "0"];
        points.push({ x, y });
        const rect = editorUtil.createSvgElement("rect", {
          fill,
          stroke,
          "stroke-width": strokeWidth,
          x,
          y,
          width: w,
          height: h
        });
        drawingRefDom = rect;
        editor.drawLayer.innerHTML = "";
        editor.drawLayer.appendChild(rect);
        document.addEventListener("mousemove", handleMouseMove);
        document.addEventListener("mouseup", handleMouseUp);
      };
      const handleMouseMove = (e) => {
        const { x, y } = editor.getMouseInnerPosition(e);
        const { x: x1, y: y1 } = points[0];
        const w = Math.abs(x1 - x);
        const h = Math.abs(y1 - y);
        const startX = Math.min(x1, x);
        const startY = Math.min(y1, y);
        drawingRefDom.setAttribute("x", startX);
        drawingRefDom.setAttribute("y", startY);
        drawingRefDom.setAttribute("width", w);
        drawingRefDom.setAttribute("height", h);
      };
      const handleMouseUp = (e) => {
        const { x: x1, y: y1 } = points[0];
        const { x: x2, y: y2 } = editor.getMouseInnerPosition(e);
        const w = Math.abs(x1 - x2);
        const h = Math.abs(y1 - y2);
        const x = Math.min(x1, x2);
        const y = Math.min(y1, y2);
        disposeEvents();
        resolve({
          type: "rect",
          x,
          y,
          w,
          h,
          fill,
          stroke,
          strokeWidth
        });
      };
      const disposeEvents = () => {
        editorDom.removeEventListener("mousedown", handleMouseDown);
        document.removeEventListener("mousemove", handleMouseMove);
        document.removeEventListener("mouseup", handleMouseUp);
        editor.mode = "select";
        editor.drawLayer.innerHTML = "";
      };
      editorDom.addEventListener("mousedown", handleMouseDown);
      if (typeof callback === "function") {
        callback({ disposeEvents });
      }
    });
  };
  const object2String = (obj) => {
    let str = "";
    Object.keys(obj).forEach((key) => {
      const newKey = key.replace(/([A-Z])/g, "-$1").toLowerCase();
      if (obj[key]) {
        if (typeof obj[key] === "number") {
          str += `${newKey}:${obj[key]}px;`;
        } else {
          str += `${newKey}:${obj[key]};`;
        }
      }
    });
    return str;
  };
  const drawText = (editor, option = {}, callback) => {
    return new Promise((resolve) => {
      const style = {
        fontFamily: "",
        backgroundColor: "rgba(0,0,0,0)",
        fontSize: 28,
        color: "#ffffff",
        alignItems: "center",
        justifyContent: "flex-start",
        lineHeight: 32,
        letterSpacing: 0,
        textDecoration: "none",
        fontWeight: "normal",
        fontStyle: "normal",
        paddingLeft: 6,
        paddingRight: 6
      };
      Object.assign(style, option);
      const editorDom = editor.getEditorDom();
      editor.mode = "draw";
      editor.discardActiveObject();
      const handleMouseDown = (e) => {
        const { x, y } = editor.getMouseInnerPosition(e);
        const dom = editorUtil.createSvgElement("g", { transform: `translate(${x}, ${y})` }, { pointerEvents: "auto" });
        dom.innerHTML = `<foreignObject style="overflow: visible;">
                        <div contenteditable="true" class="editable-text" style="${object2String(style)}">输入文本</div>
                       </foreignObject>`;
        editor.drawLayer.innerHTML = "";
        editor.drawLayer.appendChild(dom);
        const text = editor.drawLayer.querySelector(".editable-text");
        setTimeout(() => {
          const range = document.createRange();
          range.selectNodeContents(text);
          const selection = window.getSelection();
          selection.removeAllRanges();
          selection.addRange(range);
          text.addEventListener("blur", () => {
            const { width, height } = text.getBoundingClientRect();
            const { innerText } = text;
            disposeEvents();
            const { a: scale2 } = editor.viewportTransform;
            resolve({
              type: "object",
              x,
              y,
              w: width / scale2,
              h: height / scale2,
              text: innerText,
              style
            });
          });
        }, 0);
        editorDom.removeEventListener("mousedown", handleMouseDown);
      };
      const disposeEvents = () => {
        editorDom.removeEventListener("mousedown", handleMouseDown);
        editor.mode = "select";
        editor.drawLayer.innerHTML = "";
      };
      editorDom.addEventListener("mousedown", handleMouseDown);
      if (typeof callback === "function") {
        callback({ disposeEvents });
      }
    });
  };
  const getPointsStr = (points) => points.map((point) => `${point.x},${point.y}`).join(" ");
  const drawPolyline = (editor, option = {}, callback) => {
    return new Promise((resolve) => {
      const points = [];
      const fill = option.fill || "rgba(0,0,0,0)";
      const stroke = option.stroke || "#000";
      const strokeWidth = option.strokeWidth || 2;
      const editorDom = editor.getEditorDom();
      editor.mode = "draw";
      editor.discardActiveObject();
      const drawingRefDom = editorUtil.createSvgElement("polyline", {
        fill,
        stroke,
        "stroke-width": strokeWidth
      });
      editor.drawLayer.innerHTML = "";
      editor.drawLayer.appendChild(drawingRefDom);
      const handleMouseDown = (e) => {
        const { x, y } = editor.getMouseInnerPosition(e);
        points.push({ x, y });
        drawingRefDom.setAttribute("points", getPointsStr(points));
        document.addEventListener("mousemove", handleMouseMove);
        document.addEventListener("keydown", handleKeyDown);
      };
      const handleMouseMove = (e) => {
        const { x, y } = editor.getMouseInnerPosition(e);
        drawingRefDom.setAttribute("points", getPointsStr(points.concat([{ x, y }])));
      };
      const handleKeyDown = (e) => {
        if (e.key === "Escape") {
          finishDraw();
        }
      };
      const finishDraw = () => {
        const { minX, minY, maxX, maxY } = points.reduce(
          (pre, cur) => {
            pre.minX = Math.min(pre.minX, cur.x);
            pre.minY = Math.min(pre.minY, cur.y);
            pre.maxX = Math.max(pre.maxX, cur.x);
            pre.maxY = Math.max(pre.maxY, cur.y);
            return pre;
          },
          { minX: points[0].x, minY: points[0].y, maxX: points[0].x, maxY: points[0].y }
        );
        const w = maxX - minX;
        const h = maxY - minY;
        points.forEach((item) => {
          item.x -= minX;
          item.y -= minY;
        });
        disposeEvents();
        resolve({
          type: "polyline",
          x: minX,
          y: minY,
          w,
          h,
          points,
          fill,
          stroke,
          strokeWidth
        });
      };
      const disposeEvents = () => {
        editorDom.removeEventListener("mousedown", handleMouseDown);
        document.removeEventListener("mousemove", handleMouseMove);
        document.removeEventListener("keydown", handleKeyDown);
        editor.mode = "select";
        editor.drawLayer.innerHTML = "";
      };
      editorDom.addEventListener("mousedown", handleMouseDown);
      if (typeof callback === "function") {
        callback({ disposeEvents });
      }
    });
  };
  const drawBezierCurve = (editor, option = {}, callback) => {
    return new Promise((resolve) => {
      const path = [];
      const fill = option.fill || "rgba(0,0,0,0)";
      const stroke = option.stroke || "#000";
      const strokeWidth = option.strokeWidth || 2;
      let isDragging = false;
      const editorDom = editor.getEditorDom();
      editor.mode = "draw";
      editor.discardActiveObject();
      const drawingRefDom = editorUtil.createSvgElement("path", {
        fill,
        stroke,
        "stroke-width": strokeWidth
      });
      editor.drawLayer.innerHTML = "";
      editor.drawLayer.appendChild(drawingRefDom);
      const handleMouseDown = (e) => {
        isDragging = true;
        const { x, y } = editor.getMouseInnerPosition(e);
        if (path.length === 0) {
          path.push(["M", x, y], ["C", x, y, x, y, x, y]);
        } else {
          const distance = editorUtil.getDistance({ x: path[0][1], y: path[0][2] }, { x, y });
          if (distance < 3) {
            path.pop();
            path.push(["Z"]);
            finishDraw();
            return;
          }
          const last = path[path.length - 1];
          const p = ["C", 2 * last[5] - last[3], 2 * last[6] - last[4], x, y, x, y];
          path.push(p);
        }
        drawingRefDom.setAttribute("d", editorUtil.getPathStr(path));
        document.addEventListener("mousemove", handleMouseMove);
        document.addEventListener("mouseup", handleMouseUp);
        document.addEventListener("keydown", handleKeyDown);
      };
      const handleMouseMove = (e) => {
        let { x, y } = editor.getMouseInnerPosition(e);
        const type = path[path.length - 2][0];
        for (let i = 0; i < path.length - 1; i++) {
          const p = path[i];
          const [lastX, lastY] = [p[p.length - 2], p[p.length - 1]];
          const distance = editorUtil.getDistance({ x, y }, { x: lastX, y: lastY });
          if (distance < 5) {
            x = lastX;
            y = lastY;
            break;
          }
        }
        if (isDragging) {
          switch (type) {
            case "M":
              break;
            case "C":
              path[path.length - 1][1] = x;
              path[path.length - 1][2] = y;
              path[path.length - 2][3] = 2 * path[path.length - 2][5] - x;
              path[path.length - 2][4] = 2 * path[path.length - 2][6] - y;
          }
        }
        path[path.length - 1][3] = x;
        path[path.length - 1][4] = y;
        path[path.length - 1][5] = x;
        path[path.length - 1][6] = y;
        drawingRefDom.setAttribute("d", editorUtil.getPathStr(path));
      };
      const handleKeyDown = (e) => {
        if (e.key === "Escape") {
          path.pop();
          finishDraw();
        }
      };
      const handleMouseUp = () => {
        isDragging = false;
      };
      const finishDraw = () => {
        const { x, y, width, height } = editorUtil.getPathBoundingBox(path);
        path.forEach((p) => {
          p.forEach((item, index) => {
            if (index > 0) {
              p[index] = index % 2 === 0 ? item - y : item - x;
            }
          });
        });
        disposeEvents();
        resolve({
          type: "bezierCurve",
          x,
          y,
          w: width,
          h: height,
          path,
          fill,
          stroke,
          strokeWidth
        });
      };
      const disposeEvents = () => {
        editorDom.removeEventListener("mousedown", handleMouseDown);
        document.removeEventListener("mousemove", handleMouseMove);
        document.removeEventListener("mouseup", handleMouseUp);
        document.removeEventListener("keydown", handleKeyDown);
        editor.mode = "select";
        editor.drawLayer.innerHTML = "";
      };
      editorDom.addEventListener("mousedown", handleMouseDown);
      if (typeof callback === "function") {
        callback({ disposeEvents });
      }
    });
  };
  const drawCircle = (editor, option = {}, callback) => {
    return new Promise((resolve) => {
      const points = [];
      const fill = option.fill || "rgba(0,0,0,0)";
      const stroke = option.stroke || "#000";
      const strokeWidth = option.strokeWidth || 2;
      let drawingRefDom = null;
      editor.mode = "draw";
      editor.discardActiveObject();
      const handleMouseDown = (ev) => {
        const { x, y } = editor.getMouseInnerPosition(ev.e);
        console.log(x, y);
        points.push({ x, y });
        const rect = editorUtil.createSvgElement("circle", {
          stroke,
          fill,
          "stroke-width": strokeWidth,
          cx: x,
          cy: y,
          r: 0
        });
        drawingRefDom = rect;
        editor.drawLayer.innerHTML = "";
        editor.drawLayer.appendChild(rect);
      };
      const handleMouseMove = (ev) => {
        if (points.length) {
          let { x, y } = editor.getMouseInnerPosition(ev.e);
          const r1 = Math.abs(x - points[0].x) - strokeWidth / 2;
          const r2 = Math.abs(y - points[0].y) - strokeWidth / 2;
          drawingRefDom.setAttribute("r", Math.max(0, r1, r2));
        }
      };
      const handleMouseUp = (ev) => {
        const { x, y } = editor.getMouseInnerPosition(ev.e);
        const r1 = Math.abs(x - points[0].x) - strokeWidth / 2;
        const r2 = Math.abs(y - points[0].y) - strokeWidth / 2;
        const r = Math.max(0, r1, r2);
        disposeEvents();
        resolve({
          type: "circle",
          x: points[0].x - r - strokeWidth / 2,
          y: points[0].y - r - strokeWidth / 2,
          w: r * 2 + strokeWidth,
          h: r * 2 + strokeWidth,
          r,
          fill,
          stroke,
          strokeWidth
        });
      };
      const handleEvents = ({ isDispose = false }) => {
        const key = isDispose ? "off" : "on";
        editor[key]("editor:mousedown", handleMouseDown);
        editor[key]("editor:mousemove", handleMouseMove);
        editor[key]("editor:mouseup", handleMouseUp);
      };
      const disposeEvents = () => {
        handleEvents({ isDispose: true });
        editor.mode = "select";
        editor.drawLayer.innerHTML = "";
      };
      handleEvents({ isDispose: false });
      if (typeof callback === "function") {
        callback({ disposeEvents });
      }
    });
  };
  const DrawMethods = {
    drawLine,
    drawRect,
    drawText,
    drawPolyline,
    drawBezierCurve,
    drawCircle
  };
  const firstKeyUpperCase = (str) => str.slice(0, 1).toUpperCase() + str.slice(1);
  class DrawHandler {
    constructor(editor) {
      this.editor = editor;
    }
    /**
     * 绘制图形
     * @param type 绘制类型 bezierCurve、polyline、line、rect、text、circle、ellipse、triangle、polygon
     * @param options 绘制参数
     * @returns
     */
    draw(type, options) {
      const methodKey = `draw${firstKeyUpperCase(type)}`;
      const method = DrawMethods[methodKey];
      if (!method) {
        return null;
      }
      return method(this.editor, options, (e) => {
        this.target = e;
      });
    }
    /**
     * 取消绘制
     */
    cacelDraw() {
      this.target && this.target.disposeEvents && this.target.disposeEvents();
      this.target = null;
    }
  }
  class RulerHandler {
    constructor(editor) {
      this.classNamePrefix = "";
      this.isDragging = false;
      this.config = {
        enable: false,
        shadowEnable: false,
        width: 0,
        height: 0,
        scale: 1,
        startX: 0,
        startY: 0,
        thick: 21,
        select: {
          x: 0,
          y: 0,
          w: 0,
          h: 0
        },
        ratio: window.devicePixelRatio || 1
      };
      this.style = {
        bgColor: "rgb(225,225,225)",
        // ruler bg color
        longfgColor: "#BABBBC",
        // ruler longer mark color
        shortfgColor: "#C8CDD0",
        // ruler shorter mark color
        fontColor: "#7D8694",
        // ruler font color
        shadowColor: "#f9f9f9",
        // ruler shadow color
        shadowFontColor: "#f00",
        // 阴影文字颜色
        lineColor: "#EB5648",
        //对齐线颜色
        lineNormalColor: "#f00",
        lineActiveColor: "#246dff",
        borderColor: "#DADADC",
        // 边框颜色
        cornerActiveColor: "rgb(225,225,225)"
        // ruler corner active color
      };
      this.styleDark = {
        bgColor: "#0E0E0E",
        // ruler bg color
        longfgColor: "#3D3D3E",
        // ruler longer mark color
        shortfgColor: "#3D3D3E",
        // ruler shorter mark color
        fontColor: "#999999",
        // ruler font color
        shadowColor: "orange",
        // ruler shadow color
        shadowFontColor: "#f00",
        // 阴影文字颜色
        lineColor: "orange",
        //对齐线颜色
        lineNormalColor: "#f00",
        lineActiveColor: "#246dff",
        borderColor: "transparent",
        // 边框颜色
        cornerActiveColor: "#B2C7DB"
        // ruler corner active color
      };
      this.lines = {
        v: [],
        h: []
      };
      this.rulerDom = null;
      this.canvasDom = null;
      this.lineDom = null;
      this.editor = editor;
      this.classNamePrefix = editor.classNamePrefix;
      Object.assign(this.config, editor.config.ruler);
      if (!editor.config.ruler || !editor.config.ruler.enable)
        return;
      if (editor.config.ruler.lines) {
        Object.assign(this.lines, editor.config.ruler.lines);
      }
      if (editor.config.ruler.style) {
        Object.assign(this.style, editor.config.ruler.style);
      }
      this.initialize();
    }
    initialize() {
      this.initSize();
      this.initRulerDom();
      this.initEvent();
    }
    initEvent() {
      const { editor } = this;
      editor.on({
        "editor:panzoom": (transform2) => {
          this.initTransform(transform2);
          this.changeRuler();
        },
        "selection:updated": () => {
          const activeObject = editor.getActiveObject();
          this.initRulerActiveShadow(activeObject);
        },
        "object:moving": (e) => {
          const activeObject = editor.getActiveObject();
          this.initRulerActiveShadow(activeObject);
        },
        "object:resizing": (e) => {
          const activeObject = editor.getActiveObject();
          this.initRulerActiveShadow(activeObject);
        },
        "object:rotating": (e) => {
          const activeObject = editor.getActiveObject();
          this.initRulerActiveShadow(activeObject);
        },
        "object:modified": (e) => {
          const activeObject = editor.getActiveObject();
          this.initRulerActiveShadow(activeObject);
        }
      });
    }
    initSize() {
      const { editor } = this;
      const editorRect = editor.getEditorBoundingClientRect();
      this.config.width = editorRect.width;
      this.config.height = editorRect.height;
      this.initTransform(editor.viewportTransform);
    }
    initTransform(transform2) {
      const { thick } = this.config;
      this.config.startX = -(transform2.e - thick) / transform2.a;
      this.config.startY = -(transform2.f - thick) / transform2.a;
      this.config.scale = transform2.a;
    }
    initRulerActiveShadow(row) {
      this.config.select = {
        x: 0,
        y: 0,
        w: 0,
        h: 0
      };
      if (row) {
        const { x, y, w, h } = editorUtil.getBoundingRect([row]);
        this.config.select = {
          x,
          y,
          w,
          h
        };
      }
      this.drawRulerDivision();
    }
    // 切换标尺
    toggleRuler() {
      const { editor } = this;
      const overLayerDom = editor.overLayer;
      this.config.enable = !this.config.enable;
      if (this.config.enable) {
        this.initialize();
      } else {
        overLayerDom.removeChild(this.rulerDom);
      }
      return this.config.enable;
    }
    setStyle(element, style) {
      if (typeof style === "object") {
        for (const key in style) {
          element.style.setProperty(key, style[key]);
        }
      }
    }
    initRulerDom() {
      const { editor, classNamePrefix } = this;
      const overLayerDom = editor.overLayer;
      const createElement = document.createElement("div");
      createElement.className = `${classNamePrefix}-ruler`;
      this.rulerDom = createElement;
      const varObject = {
        "--datavis--r-bgColor": this.style.bgColor,
        "--datavis--r-lineColor": this.style.lineColor,
        "--datavis--r-lineNormalColor": this.style.lineNormalColor,
        "--datavis--r-lineActiveColor": this.style.lineActiveColor,
        "--datavis--r-longfgColor": this.style.longfgColor,
        "--datavis--r-shortfgColor": this.style.shortfgColor,
        "--datavis--r-fontColor": this.style.fontColor,
        "--datavis--r-shadowColor": this.style.shadowColor,
        "--datavis--r-shadowFontColor": this.style.shadowFontColor,
        "--datavis--r-borderColor": this.style.borderColor,
        "--datavis--r-cornerActiveColor": this.style.cornerActiveColor,
        "--datavis--r-thick": `${this.config.thick}px`
      };
      this.setStyle(createElement, varObject);
      overLayerDom.appendChild(this.rulerDom);
      this.initRulerCanvas();
      this.initRulerLine();
    }
    // 标尺容器
    initRulerCanvas() {
      const { classNamePrefix } = this;
      const createElement = document.createElement("div");
      createElement.className = `${classNamePrefix}-ruler-canvas-container`;
      this.canvasDom = createElement;
      this.rulerDom.appendChild(this.canvasDom);
      this.initRulerConer();
      this.drawRulerDivision();
    }
    initRulerConer() {
      const { classNamePrefix } = this;
      const createElement = document.createElement("div");
      createElement.className = `${classNamePrefix}-ruler-corner`;
      this.rulerDom.appendChild(createElement);
    }
    // 修改标尺
    changeRuler() {
      this.drawRulerDivision();
      this.updateRulerLines();
    }
    drawRulerDivision() {
      if (!this.canvasDom)
        return;
      this.canvasDom.innerHTML = "";
      this.initRulerDivision();
      this.initRulerDivision("vertical");
    }
    // 初始化刻度
    initRulerDivision(vertical) {
      const { editor, config, style } = this;
      const classNamePrefix = editor.classNamePrefix;
      const createElement = document.createElement("canvas");
      createElement.className = `${classNamePrefix}-ruler-canvas-division ${vertical || ""}`;
      let width = config.width;
      let height = config.height;
      let canvasContext = createElement.getContext("2d");
      if (vertical) {
        let canvasWidth = config.thick;
        let canvasHeight = config.height - config.thick;
        createElement.width = canvasWidth * config.ratio;
        createElement.height = canvasHeight * config.ratio;
        drawVerticalRuler({
          ctx: canvasContext,
          start: config.startY,
          shadow: {
            enable: config.shadowEnable,
            y: config.select.y,
            height: config.select.h
          },
          config: {
            width: config.thick * config.ratio,
            height: height * config.ratio,
            scale: config.scale,
            ratio: config.ratio
          },
          colorConfig: this.style
        });
      } else {
        let canvasWidth = config.width - config.thick;
        let canvasHeight = config.thick;
        createElement.width = canvasWidth * config.ratio;
        createElement.height = canvasHeight * config.ratio;
        drawHorizontalRuler({
          ctx: canvasContext,
          start: config.startX,
          shadow: {
            enable: config.shadowEnable,
            x: config.select.x,
            width: config.select.w
          },
          config: {
            width: width * config.ratio,
            height: config.thick * config.ratio,
            scale: config.scale,
            ratio: config.ratio
          },
          colorConfig: this.style
        });
      }
      createElement.addEventListener("mousedown", (e) => {
        e.preventDefault();
        e.stopPropagation();
        let line = null;
        const { x, y } = editor.getMouseInnerPosition(e);
        if (vertical) {
          line = { x, y: 0 };
          this.createRulerLine(line, this.lines.v.length, "vertical");
          this.lines.v.push(line);
        } else {
          line = { x: 0, y };
          this.createRulerLine(line, this.lines.h.length, "");
          this.lines.h.push(line);
        }
        line.refDOM.classList.add("active");
        const mousemove = (event) => {
          this.isDragging = true;
          e.preventDefault();
          e.stopPropagation();
          const { x: x2, y: y2 } = editor.getMouseInnerPosition(event);
          if (vertical) {
            line.x = x2;
          } else {
            line.y = y2;
          }
          this.updateRulerLine(line);
          this.setActiveLineValue(line);
        };
        const mouseup = () => {
          this.isDragging = false;
          line.refDOM.classList.remove("active");
          this.judgeDeleteRuleLine({ line });
          document.removeEventListener("mousemove", mousemove);
          document.removeEventListener("mouseup", mouseup);
        };
        document.addEventListener("mousemove", mousemove);
        document.addEventListener("mouseup", mouseup);
      });
      this.canvasDom.appendChild(createElement);
    }
    // 标尺对齐线
    initRulerLine() {
      const { classNamePrefix } = this;
      const createElement = document.createElement("div");
      createElement.className = `${classNamePrefix}-ruler-line-container`;
      this.lineDom = createElement;
      this.rulerDom.appendChild(this.lineDom);
      this.drawRulerLine();
    }
    // 设置激活的辅助线的数值
    setActiveLineValue(line) {
      const { type, x, y, refDOM } = line;
      const value = type === "vertical" ? x : y;
      refDOM.innerHTML = `<span class="action_value">${Number(value).toFixed(0)}</span>`;
    }
    // 设置激活的辅助线
    setActiveLine({ line }) {
      const { type, refDOM } = line;
      const handleMouseMove = (e) => {
        this.isDragging = true;
        const contaienrPos = this.editor.getMousePosition(e);
        const inverseMatrix = inverse(this.editor.viewportTransform);
        const editorPos = applyToPoint(inverseMatrix, contaienrPos);
        if (type === "vertical") {
          line.x = editorPos.x;
        } else {
          line.y = editorPos.y;
        }
        this.updateRulerLine(line);
        this.setActiveLineValue(line);
      };
      const handleMouseUp = () => {
        this.isDragging = false;
        refDOM.classList.remove("active");
        this.judgeDeleteRuleLine({ line });
        document.removeEventListener("mousemove", handleMouseMove);
        document.removeEventListener("mouseup", handleMouseUp);
      };
      refDOM.classList.add("active");
      document.addEventListener("mousemove", handleMouseMove);
      document.addEventListener("mouseup", handleMouseUp);
    }
    // 更新辅助线的位置
    updateRulerLine(line) {
      const { x, y } = this.transform2ContainerPoint(line);
      const transform2 = line.type === "vertical" ? `translateX(${x}px)` : `translateY(${y}px)`;
      line.refDOM.style.transform = transform2;
    }
    // 更新所有辅助线的位置
    updateRulerLines() {
      if (!this.lineDom)
        return;
      const { lines } = this;
      if (lines.v && lines.v.length) {
        lines.v.forEach((line) => {
          this.updateRulerLine(line);
        });
      }
      if (lines.h && lines.h.length) {
        lines.h.forEach((line) => {
          this.updateRulerLine(line);
        });
      }
    }
    // 将画布的点转为容器坐标点
    transform2ContainerPoint(point) {
      const { editor } = this;
      return applyToPoint(editor.viewportTransform, point);
    }
    createRulerLine(line, index, type = "") {
      const { classNamePrefix } = this;
      const refDOM = document.createElement("div");
      refDOM.className = `${classNamePrefix}-ruler-line ${type}`;
      line.index = index;
      line.type = type;
      line.refDOM = refDOM;
      this.lineDom.appendChild(refDOM);
      this.updateRulerLine(line);
      refDOM.addEventListener("mouseenter", () => {
        if (!this.isDragging) {
          refDOM.classList.add("active");
          this.setActiveLineValue(line);
        }
      });
      refDOM.addEventListener("mouseleave", () => {
        if (!this.isDragging) {
          refDOM.classList.remove("active");
        }
      });
      refDOM.addEventListener("mousedown", (e) => {
        e.preventDefault();
        e.stopPropagation();
        this.setActiveLine({ line });
      });
      return line;
    }
    // 绘制标尺辅助线
    drawRulerLine() {
      if (!this.lineDom)
        return;
      const { lines } = this;
      this.lineDom.innerHTML = "";
      if (lines.v && lines.v.length) {
        lines.v.forEach((line, index) => {
          this.createRulerLine(line, index, "vertical");
        });
      }
      if (lines.h && lines.h.length) {
        lines.h.forEach((line, index) => {
          this.createRulerLine(line, index, "");
        });
      }
    }
    // 判断标尺线是否需要删除
    judgeDeleteRuleLine({ line }) {
      const position = this.transform2ContainerPoint(line);
      let list = line.type === "vertical" ? this.lines.v : this.lines.h;
      let index = -1;
      if (line.type === "vertical") {
        if (position.x < this.config.thick) {
          index = list.findIndex((item) => item.index === line.index);
        }
      } else {
        if (position.y < this.config.thick) {
          index = this.lines.h.findIndex((item) => item.index === line.index);
        }
      }
      if (index > -1) {
        list.splice(index, 1);
        for (let i = 0; i < this.lineDom.children.length; i++) {
          const item = this.lineDom.children[i];
          if (item === line.refDOM) {
            this.lineDom.removeChild(item);
            break;
          }
        }
      }
    }
  }
  class RenderHandler {
    // 内容层
    constructor(editor) {
      this.wheelTimer = null;
      this.backgroundLayerDom = null;
      this.contentLayerDom = null;
      this.editor = editor;
      if (editor.config.type === "render") {
        this.initContentLayer();
        this.initBackgroundLayer();
        this.initEvent();
      }
    }
    setRenderMode(modeConfig) {
      const editor = this.editor;
      const canvasConfig = editor.config;
      const { mode } = modeConfig;
      const editorStyle = this.setEditorStyle(canvasConfig, mode);
      for (let key in editorStyle) {
        editor.editorDom.style[key] = editorStyle[key];
      }
      const { canvasStyle, backgroundLayerStyle, contentStyle, viewportTransform } = this.handleStyle(canvasConfig, mode);
      Object.assign(editor.canvasDom.style, canvasStyle);
      Object.assign(this.backgroundLayerDom.style, backgroundLayerStyle);
      Object.assign(this.contentLayerDom.style, contentStyle);
      editor.viewportTransform = viewportTransform;
    }
    // standard 不缩放
    // 设置编辑器
    setEditorStyle(canvasConfig, mode) {
      const { background } = canvasConfig;
      const style = {
        backgroundColor: background
      };
      switch (mode) {
        case "standard":
          style.overflow = "auto";
          style.backgroundImage = "";
          break;
        case "full":
          style.overflow = "hidden";
          style.backgroundImage = "";
          break;
        case "fit":
          style.overflow = "hidden";
          break;
        default:
          style.overflow = "auto";
          style.backgroundImage = "";
          break;
      }
      return style;
    }
    // 设置画布
    handleStyle(canvasConfig, mode) {
      const { width, height, filter, background, backgroundImage, backgroundFilter } = canvasConfig;
      const canvasStyle = {
        width: `${width}px`,
        height: `${height}px`
      };
      const backgroundLayerStyle = {
        width: `${width}px`,
        height: `${height}px`,
        backgroundColor: background
      };
      const contentStyle = {};
      if (filter) {
        const { enable, hueRotate, contrast, saturate, brightness, grayscale } = filter;
        if (enable) {
          let filterStr = "";
          if (hueRotate)
            filterStr += ` hue-rotate(${hueRotate}deg)`;
          if (contrast)
            filterStr += ` contrast(${contrast}%)`;
          if (saturate)
            filterStr += ` saturate(${saturate}%)`;
          if (brightness)
            filterStr += ` brightness(${brightness}%)`;
          if (grayscale)
            filterStr += ` grayscale(${grayscale}%)`;
          contentStyle.filter = filterStr;
        }
      }
      if (backgroundImage) {
        backgroundLayerStyle.backgroundImage = `url(${encodeURI(backgroundImage)})`;
        backgroundLayerStyle.backgroundRepeat = "no-repeat";
      }
      if (backgroundFilter) {
        const { enable, hueRotate, contrast, saturate, brightness, grayscale } = backgroundFilter;
        if (enable) {
          let filterStr = "";
          if (hueRotate)
            filterStr += ` hue-rotate(${hueRotate}deg)`;
          if (contrast)
            filterStr += ` contrast(${contrast}%)`;
          if (saturate)
            filterStr += ` saturate(${saturate}%)`;
          if (brightness)
            filterStr += ` brightness(${brightness}%)`;
          if (grayscale)
            filterStr += ` grayscale(${grayscale}%)`;
          backgroundLayerStyle.filter = filterStr;
        }
      }
      const editorDom = this.editor.editorDom;
      const editorRect = editorDom.getBoundingClientRect();
      const editorWidth = editorRect.width;
      const editorHeight = editorRect.height;
      const scaleX = editorWidth / width;
      const scaleY = editorHeight / height;
      let viewportTransform = { a: 1, b: 0, c: 0, d: 1, e: 0, f: 0 };
      switch (mode) {
        case "standard":
          canvasStyle.backgroundSize = "cover";
          canvasStyle.backgroundPosition = "center center";
          canvasStyle.overflow = "hidden";
          break;
        case "full":
          canvasStyle.backgroundSize = "100% 100%";
          canvasStyle.transformOrigin = "left top";
          canvasStyle.transform = `scale(${scaleX}, ${scaleY})`;
          viewportTransform = { a: scaleX, b: 0, c: 0, d: scaleY, e: 0, f: 0 };
          break;
        case "fit":
          canvasStyle.backgroundSize = "100% 100%";
          canvasStyle.transformOrigin = "left top";
          const scaleVar = scaleX > scaleY ? "y" : "x";
          const minScale = Math.min(scaleX, scaleY);
          const offsetWidth = editorWidth - width * minScale;
          const offsetHeight = editorHeight - height * minScale;
          const offsetX = scaleVar === "x" ? 0 : offsetWidth * 0.5;
          const offsetY = scaleVar === "y" ? 0 : offsetHeight * 0.5;
          canvasStyle.transform = `matrix(${minScale}, 0, 0, ${minScale}, ${offsetX}, ${offsetY})`;
          viewportTransform = { a: minScale, b: 0, c: 0, d: minScale, e: offsetX, f: offsetY };
          break;
      }
      return { canvasStyle, backgroundLayerStyle, contentStyle, viewportTransform };
    }
    initEvent() {
      const { editor } = this;
      const editorDom = editor.getEditorDom();
      editorDom.addEventListener("mousewheel", (event) => {
        if (editor.config.type !== "standard" && editor.config.panzoom && editor.config.panzoom.enable) {
          clearTimeout(this.wheelTimer);
          editor.canvasDom.style.willChange = "transform";
          const isEnlarged = event.wheelDelta > 0;
          let scaleRatio = isEnlarged ? 0.1 : -0.1;
          const position = editor.getMouseInnerPosition(event);
          const diffX = position.x * scaleRatio;
          const diffY = position.y * scaleRatio;
          editor.viewportTransform.a += scaleRatio;
          editor.viewportTransform.d += scaleRatio;
          editor.viewportTransform.e -= diffX;
          editor.viewportTransform.f -= diffY;
          const { a, b, c, d, e, f } = editor.viewportTransform;
          editor.canvasDom.style.transform = `matrix(${[a, b, c, d, e, f].join(",")})`;
          this.wheelTimer = setTimeout(() => {
            clearTimeout(this.wheelTimer);
            this.wheelTimer = null;
            delete editor.canvasDom.style.willChange;
          }, 100);
        }
      });
      editor.on("editor:mousedown", (event) => {
        if (editor.config.type !== "standard" && editor.config.panzoom && editor.config.panzoom.enable) {
          const { e } = event;
          const { x: areaStartX, y: areaStartY } = editor.getMousePosition(e);
          const { e: originX, f: originY } = editor.viewportTransform;
          editor.canvasDom.style.willChange = "transform";
          const mousemove = (moveEv) => {
            const mousePoint = editor.getMousePosition(moveEv);
            const diffX = mousePoint.x - areaStartX;
            const diffY = mousePoint.y - areaStartY;
            editor.viewportTransform.e = originX + diffX;
            editor.viewportTransform.f = originY + diffY;
            const { a, b, c, d, e: e2, f } = editor.viewportTransform;
            editor.canvasDom.style.transform = `matrix(${[a, b, c, d, e2, f].join(",")})`;
          };
          const mouseup = () => {
            delete editor.canvasDom.style.willChange;
            document.removeEventListener("mousemove", mousemove);
            document.removeEventListener("mouseup", mouseup);
          };
          document.addEventListener("mousemove", mousemove);
          document.addEventListener("mouseup", mouseup);
        }
      });
    }
    initContentLayer() {
      const { editor } = this;
      this.contentLayerDom = editor.canvasDom.querySelector("svg");
    }
    initBackgroundLayer() {
      const { editor } = this;
      const element = editorUtil.createSvgElement(
        "svg",
        { class: "datavis-render-background-layer" },
        {
          position: "absolute",
          left: "0px",
          top: "0px",
          width: "100%",
          height: "100%",
          pointerEvents: "none",
          zIndex: -1
        }
      );
      editor.canvasDom.prepend(element);
      this.backgroundLayerDom = element;
    }
  }
  class DatavisEngine {
    constructor(container, config) {
      this.config = {
        canvas: "",
        width: 100,
        height: 100,
        copyKey: "datavis-copy-data",
        sorption: {
          // 吸附
          enabled: true,
          // 是否启用吸附
          offset: 1
          // 吸附距离
        },
        guideline: {
          // 对象吸附时显示的辅助线
          width: 0.5,
          color: "#f00"
        },
        selectionMode: "intersection",
        //complete 包含,  intersection 相交
        multiplexOffset: { x: 30, y: 30 },
        // 复用对象时添加一个偏移量
        pasteOffset: { x: 30, y: 30 },
        // 粘贴对象时添加一个偏移量
        groupAttrs: { component: { name: "visWidgetGroup", title: "组合" } }
        // 组合的默认属性，触发组合操作时这部分属性会被合并到组合中
      };
      this.viewportTransform = { a: 1, b: 0, c: 0, d: 1, e: 0, f: 0 };
      this.id = editorUtil.nanoid(8);
      this.objects = [];
      this._activeObject = null;
      this._activeObjects = [];
      this.selection = true;
      this.grabing = false;
      this.editorDom = null;
      this.canvasDom = null;
      this.classNamePrefix = "DATAVIS";
      this.mode = "select";
      this.overLayer = null;
      this.drawLayer = null;
      this.controlLayer = null;
      this.group = null;
      this.extraProps = [];
      this.pasteCount = 0;
      this.util = editorUtil;
      this.controlConfig = {
        // 控制点配置
        circle: {
          r: 5,
          // 控制点半径
          fill: "#ffffff",
          // 控制点填充色
          stroke: "#2c83fb",
          // 控制点描边色
          strokeWidth: 1
          // 控制点描边宽度
        },
        // 激活的控制点配置
        activeCircle: {
          r: 5,
          // 激活的控制点半径
          fill: "#00ff00",
          // 激活的控制点填充色
          stroke: "#2c83fb",
          // 激活的控制点描边色
          strokeWidth: 1
          // 激活的控制点描边宽度
        },
        // 控制线配置
        line: {
          stroke: "#2c83fb",
          // 控制线描边色
          strokeWidth: 1
          // 控制线描边宽度
        }
      };
      this.typeCounts = {};
      this.containerId = container;
      Object.assign(this.config, config);
      this.emitter = mitt();
      this.elementHandler = new ElementHandler(this);
      this.elementHandler.initLayers();
      this.initRenderMode();
    }
    // 设置config
    setConfig(config) {
      Object.assign(this.config, config);
    }
    // 切换吸附模式
    changeSorption(option) {
      this.config.sorption = option;
    }
    // 切换框选模式
    changeSelectionMode(mode) {
      this.config.selectionMode = mode;
    }
    // 渲染模式
    initRenderMode() {
      this.renderHandler = new RenderHandler(this);
    }
    // 设置渲染模式
    setRenderMode(row) {
      if (this.renderHandler) {
        this.renderHandler.setRenderMode(row);
      }
    }
    enableSelection() {
      this.selection = true;
      this.grabing = false;
    }
    disableSelection() {
      this.selection = false;
      this.grabing = true;
    }
    setDimensions({ width, height }) {
      this.config.width = Number(width);
      this.config.height = Number(height);
    }
    initializeHandler() {
      this.alignHandler = new AlignHandler(this);
      this.historyHandler = new HistoryHandler(this);
      this.objectHandler = new ObjectHandler(this);
      this.rulerAdsorbHandler = new RulerAdsorbHandler(this);
      this.guidelineHandler = new GuidelineHandler(this);
      this.zoomHandler = new ZoomHandler(this);
      this.selectionHandler = new SelectionHandler(this);
      this.shortcutHandler = new ShortcutHandler(this);
      this.drawHandler = new DrawHandler(this);
      this.rulerHandler = new RulerHandler(this);
    }
    getEditorDom() {
      return document.querySelector(this.containerId);
    }
    getEditorBoundingClientRect() {
      const dom = this.editorDom;
      return dom.getBoundingClientRect();
    }
    setObjects(data) {
      this.objects = data;
      this.layerChange();
    }
    getObjects() {
      return this.objects;
    }
    getActiveObject() {
      return this._activeObject;
    }
    /**
     * 获取activeSelection多选对象位置
     * @returns
     */
    getActiveSelectionPosition() {
      const activeObj = this.getActiveObject();
      return activeObj && activeObj.type === "activeSelection" ? activeObj.getPosition() : null;
    }
    /**
     * 设置选中的对象，设置选中对象时自动设置 _activeObject。_activeObject应作为只读使用，不应该直接修改
     * @param {*} objs 选中对象
     */
    setActiveObjects(objs) {
      if (document.activeElement instanceof HTMLInputElement) {
        document.activeElement.blur();
      }
      this._activeObjects = objs;
      if (this._activeObject) {
        this._activeObject.disposeControls();
      }
      if (this.group && objs.some((a) => {
        var _a;
        return ((_a = a.group) == null ? void 0 : _a.id) !== this.group.id;
      })) {
        this.objectHandler.exitGroup();
      }
      if (!objs.length) {
        this.discardActiveObject();
      } else {
        if (objs.length === 1) {
          this._activeObject = objs[0];
          this.group = this._activeObject.group || null;
        } else {
          objs.sort((a, b) => {
            const aIndex = this.objects.findIndex((item) => item.id === a.id);
            const bIndex = this.objects.findIndex((item) => item.id === b.id);
            return aIndex - bIndex;
          });
          const { x, y, w, h } = editorUtil.getBoundingRect(objs);
          this._activeObject = Factory$1.getInstance(this, {
            type: "activeSelection",
            x,
            y,
            w,
            h,
            objects: objs
          });
        }
        this._activeObject.createControls();
        this.selectionUpdated();
      }
    }
    /**
     * 设置选中的对象。为了和 setActiveObjects 区分，此方法多传入一个 position 参数
     * @param objs
     * @param position
     */
    setActiveObjectsWithPosition(objs, position) {
      if (this._activeObject) {
        this._activeObject.disposeControls();
      }
      this._activeObjects = objs;
      if (objs.length) {
        if (objs.length > 1) {
          let pos = position;
          if (!position) {
            pos = editorUtil.getBoundingRect(objs);
          }
          const { x, y, w, h, angle } = pos;
          this._activeObject = Factory$1.getInstance(this, {
            type: "activeSelection",
            x,
            y,
            w,
            h,
            angle,
            objects: objs
          });
        } else {
          this._activeObject = objs[0];
        }
        this._activeObject.createControls();
        this.selectionUpdated();
      } else {
        this.discardActiveObject();
      }
    }
    getPositionMap() {
      const positionMap = /* @__PURE__ */ new Map();
      const recurssionParent = (item) => {
        const { x, y, w, h, angle, id, group } = item;
        positionMap.set(id, { x, y, w, h, angle, id, groupId: group ? group.id : "" });
        if (group) {
          recurssionParent(group);
        }
      };
      const recurssionChildren = (arr) => {
        arr.forEach((item) => {
          const { x, y, w, h, angle, id, group, points, path } = item;
          positionMap.set(item.id, { x, y, w, h, angle, id, groupId: group ? group.id : "", points: cloneDeep(points), path: cloneDeep(path) });
          if (item.objects && item.objects.length) {
            recurssionChildren(item.objects);
          }
        });
      };
      const activeObj = this.getActiveObject();
      const objs = [];
      if (activeObj) {
        if (activeObj.group) {
          objs.push(...activeObj.group.objects);
          recurssionParent(activeObj.group);
        } else if (activeObj.type === "activeSelection") {
          objs.push(...activeObj.objects);
          const { id, x, y, w, h, angle } = activeObj;
          positionMap.set(id, { x, y, w, h, angle, id, groupId: "" });
        } else {
          objs.push(activeObj);
        }
      }
      recurssionChildren(objs);
      return positionMap;
    }
    getActiveObjects() {
      return this._activeObjects;
    }
    /**
     * 通过id获取对象
     * @param {*} id
     * @returns
     */
    getObjectById(id) {
      const objs = this.getObjects();
      let findObj;
      const recurssion = (arr) => {
        for (let i = 0; i < arr.length; i++) {
          if (findObj) {
            return;
          }
          const item = arr[i];
          if (item.id === id) {
            findObj = item;
          }
          if (item.objects && item.objects.length) {
            recurssion(item.objects);
          }
        }
      };
      recurssion(objs);
      return findObj;
    }
    /**
     * 根据条件获取对象
     * @param {Function} callback 递归对象回调函数
     * @returns
     */
    getObjectsByCondition(callback) {
      const objects = this.getObjects();
      const objs = [];
      const recurssion = (arr) => {
        for (let i = 0; i < arr.length; i++) {
          const item = arr[i];
          if (callback(item)) {
            objs.push(item);
          }
          if (item.objects && item.objects.length) {
            recurssion(item.objects);
          }
        }
      };
      recurssion(objects);
      return objs;
    }
    discardActiveObject() {
      this._activeObject && this._activeObject.disposeControls();
      this._activeObject = null;
      this._activeObjects = [];
      this.group && this.objectHandler.exitGroup();
      this.selectionUpdated();
    }
    selectionUpdated() {
      const objects = this.getActiveObjects();
      this.fire("selection:updated", objects);
    }
    // 初始化计数
    initTypeCount() {
      this.typeCounts = {};
      const recursion = (arr) => {
        arr.forEach((item) => {
          const type = item.component.name;
          this.typeCounts[type] = (this.typeCounts[type] || 0) + 1;
          if (item.objects && item.objects.length)
            recursion(item.objects);
        });
      };
      recursion(this.objects);
    }
    getTypeCountName(item) {
      this.updateTypeCount(item);
      const component = item.component;
      const type = component.name;
      const title = component.title;
      const name = `${title}_${this.typeCounts[type]}`;
      return name;
    }
    // 删除计数
    updateTypeCount(item) {
      const component = item.component;
      const type = component.name;
      this.typeCounts[type] = (this.typeCounts[type] || 0) + 1;
    }
    // 删除计数
    deleteTypeCount(item) {
      const component = item.component;
      const type = component.name;
      if (this.typeCounts[type]) {
        if (this.typeCounts[type] === 0) {
          delete this.typeCounts[type];
        }
      }
    }
    add(objs) {
      for (let i = 0; i < objs.length; i++) {
        const item = objs[i];
        if (!item.name) {
          const name = this.getTypeCountName(item);
          item.name = name;
        }
        this.objects.push(item);
      }
      return Promise.resolve("ok");
    }
    /**
     * 根据子对象的位置重新计算组合的包围盒位置信息
     * @param group 组合对象
     * @returns
     */
    calcGroupPositionBySubs(group) {
      const points = [];
      const groupCenter = editorUtil.getObjectCenter(group);
      group.objects.forEach((item) => {
        let objCenter = editorUtil.getObjectCenter(item);
        objCenter.x += group.x;
        objCenter.y += group.y;
        objCenter = editorUtil.rotatePoint(objCenter, groupCenter, group.angle);
        const obj = {
          x: objCenter.x - item.w / 2,
          y: objCenter.y - item.h / 2,
          w: item.w,
          h: item.h,
          angle: item.angle + group.angle
        };
        const { tl, tr, bl, br } = editorUtil.getCoords(obj);
        points.push(tl, tr, bl, br);
      });
      const coords = editorUtil.computeOBB(points, group.angle);
      return coords;
    }
    /**
     * 通过子元素的位置重新计算获取组合的包围盒
     * @param group
     * @returns
     */
    calcGroupContainerPositionBySubs(group) {
      const position = this.calcGroupPositionBySubs(group);
      const mtx = editorUtil.composeMatrix({ tx: position.x, ty: position.y, angle: position.angle });
      const matrixList = [];
      const recursion = (obj) => {
        if (obj.group) {
          const matrix = editorUtil.getObjMatrix(obj.group);
          matrixList.push(matrix);
          recursion(obj.group);
        }
      };
      recursion(group);
      const finalMatrix = editorUtil.multiplyMatrix([group.editor.viewportTransform, ...matrixList, mtx]);
      const { tx, ty, sx, sy, angle } = editorUtil.decomposeMatrix(finalMatrix);
      const finalPosition = {
        x: tx,
        y: ty,
        w: position.w * sx,
        h: position.h * sy,
        angle
      };
      return finalPosition;
    }
    emit(event, callback) {
      this.emitter.emit(event, callback || this);
    }
    fire(event, callback) {
      this.emitter.emit(event, callback || this);
    }
    off(event, callback) {
      if (typeof event === "object") {
        Object.keys(event).forEach((k) => {
          this.emitter.off(k, event[k]);
        });
      } else {
        this.emitter.off(event, callback);
      }
    }
    on(event, callback) {
      if (typeof event === "object") {
        Object.keys(event).forEach((k) => {
          this.emitter.on(k, event[k]);
        });
      } else {
        this.emitter.on(event, callback);
      }
    }
    importData(data) {
      const { objects, viewportTransform } = data;
      const objs = this.dataEnlivenObjects(objects);
      this.viewportTransform = viewportTransform;
      this.zoomHandler.setRightBar();
      this.zoomHandler.setBottomBar();
      this.zoomHandler.handleViewportTransform();
      this.setObjects(objs);
      if (this.group) {
        this.group = this.getObjectById(this.group.id);
      }
      this.discardActiveObject();
      this.initTypeCount();
      return Promise.resolve("");
    }
    setLines(lines) {
      this.rulerAdsorbHandler.setLines(lines);
    }
    layerChange() {
      this.fire("layer:change", this.objects);
    }
    editorPanzoom(row) {
      this.fire("editor:panzoom", row);
      const activeObj = this.getActiveObject();
      if (activeObj) {
        activeObj.updateControlsPosition();
      }
      if (this.mode === "draw")
        ;
    }
    /**
     * 获取鼠标在容器中的位置
     * @param {MouseEvent} e 鼠标事件
     * @returns
     */
    getMousePosition(e) {
      const container = document.querySelector(this.containerId);
      const { left, top } = container.getBoundingClientRect();
      const { scrollLeft, scrollTop } = container;
      let mousePoint = { x: e.clientX - left + scrollLeft, y: e.clientY - top + scrollTop };
      return mousePoint;
    }
    /**
     * 获取鼠标在画布中的位置
     * @param {*} e
     * @returns
     */
    getMouseInnerPosition(e) {
      const inverseMatrix = inverse(this.viewportTransform);
      let mousePoint = this.getMousePosition(e);
      mousePoint = applyToPoint(inverseMatrix, mousePoint);
      return mousePoint;
    }
    /**
     * 获取鼠标在对象内的位置
     * @param e
     * @param obj
     */
    getMousePositionInObject(e, obj) {
      const totalMatrix = editorUtil.getTotalMatrix(obj, true, true);
      const inverseMatrix = inverse(totalMatrix);
      let mousePoint = this.getMousePosition(e);
      mousePoint = applyToPoint(inverseMatrix, mousePoint);
      return mousePoint;
    }
    /**
     * 获取画布的中心点位置
     * @returns
     */
    getEditorCenter() {
      const { width, height } = this.config;
      return {
        x: width / 2,
        y: height / 2
      };
    }
    /**
     * 查找鼠标点中的对象
     * @param {MouseEvent} e 鼠标对象
     * @param {Boolean} includeLocked 锁定的对象是否也可以选中
     * @returns
     */
    findTarget(e, includeLocked = false) {
      const point = this.getMouseInnerPosition(e);
      const activeObject = this.getActiveObject();
      if (activeObject && activeObject.type === "activeSelection" && !(e.ctrlKey || e.metaKey || e.shiftKey)) {
        const isInside = editorUtil.isPointInside(point, activeObject);
        if (isInside) {
          return activeObject;
        }
      }
      const objects = this.group ? this.group.objects : this.objects;
      for (let i = objects.length - 1; i >= 0; i--) {
        const item = objects[i];
        const lockedFlag = includeLocked ? true : !item.locked;
        if (item.visible && lockedFlag && editorUtil.isPointInside(point, item.getGlobalPosition())) {
          return item;
        }
      }
      return null;
    }
    /**
     * 将画布序列化
     * @returns
     */
    toJSON() {
      const cloneData = this.objects.map((item) => item.toJSON());
      const { viewportTransform } = this;
      return {
        viewportTransform,
        objects: cloneData
      };
    }
    /**
     * 获取和矩形选区相交的对象
     * @param rect 矩形选区
     * @param objs 比较对象列表
     */
    getIntersectObjs(rect, objs) {
      const arr = [];
      const isComplete = this.config.selectionMode == "complete";
      objs.forEach((item) => {
        let isSelected = false;
        if (!item.locked && item.visible) {
          const itemWorldPos = item.getGlobalPosition();
          const itemBBox = editorUtil.getBBox(itemWorldPos);
          if (!editorUtil.isRectIntersect(rect, itemBBox, isComplete)) {
            isSelected = false;
          } else {
            if (itemWorldPos.angle % 90 === 0) {
              isSelected = true;
            } else {
              const itemCenter = editorUtil.getPositionCenter(itemWorldPos);
              const { x, y, w, h } = rect;
              const { angle } = itemWorldPos;
              const s1 = editorUtil.rotatePoint({ x, y }, itemCenter, -angle);
              const s2 = editorUtil.rotatePoint({ x: x + w, y }, itemCenter, -angle);
              const s3 = editorUtil.rotatePoint({ x, y: y + h }, itemCenter, -angle);
              const s4 = editorUtil.rotatePoint({ x: x + w, y: y + h }, itemCenter, -angle);
              const minX = Math.min(s1.x, s2.x, s3.x, s4.x);
              const minY = Math.min(s1.y, s2.y, s3.y, s4.y);
              const width = Math.max(s1.x, s2.x, s3.x, s4.x) - minX;
              const height = Math.max(s1.y, s2.y, s3.y, s4.y) - minY;
              const newAABB = { x: minX, y: minY, w: width, h: height };
              isSelected = editorUtil.isRectIntersect(newAABB, itemWorldPos, isComplete);
            }
          }
        }
        if (isSelected) {
          arr.push(item);
        }
      });
      return arr;
    }
    /**
     * 单个对象转换成editor 对象
     * @param data
     * @returns
     */
    plainObjectToClass(data) {
      return Factory$1.getInstance(this, data);
    }
    /**
     * 转换成editor数据对象
     * @param data
     * @returns
     */
    dataEnlivenObjects(data) {
      let parseObjects = [];
      if (data == null ? void 0 : data.length) {
        data.forEach((item) => {
          const parseData = this.plainObjectToClass(item);
          parseObjects.push(parseData);
        });
      }
      return parseObjects;
    }
    /**
     * 将json格式的对象列表组合
     * @param jsonObjects
     * @returns
     */
    jsonObjectsToGroup(jsonObjects = []) {
      const recurssion = (arr) => {
        arr.forEach((obj) => {
          obj.id = editorUtil.nanoid(8);
          if (obj.objects && obj.objects.length) {
            recurssion(obj.objects);
          }
        });
      };
      const objs = this.dataEnlivenObjects(jsonObjects);
      recurssion(objs);
      const { groupAttrs } = this.config;
      const { x, y, w, h } = editorUtil.getBoundingRect(objs);
      const groupItem = Factory$1.getInstance(this, __spreadProps(__spreadValues({
        type: "group"
      }, cloneDeep(groupAttrs)), {
        x,
        y,
        w,
        h,
        angle: 0
      }));
      objs.forEach((item) => {
        item.id = editorUtil.nanoid(8);
        item.x -= x;
        item.y -= y;
        item.group = groupItem;
        groupItem.objects.push(item);
      });
      return groupItem;
    }
    /**
     * 获取当前选中对象的json结构数据
     * @returns
     */
    getActiveObjectJSON() {
      const activeObj = this.getActiveObject();
      return activeObj ? activeObj.toJSON() : null;
    }
    /**
     * 获取选中对象的位置信息
     * @param type 信息类型
     * @returns
     */
    getActiveObjectPositionState(type = ObjectAttrsEnum.position) {
      const objs = this.getActiveObjects();
      const groupPositions = [];
      const data = [];
      objs.forEach((item) => {
        const parent = item.group || this;
        const index = parent.objects.findIndex((a) => a.id === item.id);
        const parentId = item.group ? item.group.id : null;
        data.push({
          data: type === ObjectAttrsEnum.position ? item.getPosition() : item.toJSON(),
          index,
          parentId
        });
        if (parentId) {
          groupPositions.push(parent.getPosition());
        }
      });
      return {
        activeSelection: this.getActiveSelectionPosition(),
        data,
        groupPositions
      };
    }
    /**
     * 获取编辑器缩放倍数
     * @returns
     */
    getZoom() {
      const { viewportTransform } = this;
      return viewportTransform.a;
    }
    /**
     * 获取对象的父节点id、所在索引、所在路径等
     * @param objs
     * @returns
     */
    getObjectsParentRelationship(objs) {
      const list = [];
      const getObjInfo = (obj) => {
        let path = "";
        let parentIdList = [];
        const recursion = (item) => {
          const parent = item.group || item.editor;
          const index = parent.objects.findIndex((a) => a.id === item.id);
          path = `${index}${path}`;
          if (parent && parent.type === "group") {
            parentIdList.push(parent.id);
            recursion(parent);
          }
        };
        recursion(obj);
        return { path, parentIdList };
      };
      objs = objs || [];
      objs.forEach((item) => {
        const parent = item.group || item.editor;
        list.push(__spreadValues({
          parentId: item.group ? item.group.id : "",
          index: parent.objects.findIndex((a) => a.id === item.id),
          target: item
        }, getObjInfo(item)));
      });
      return list;
    }
    /**
     * 销毁事件
     *
     */
    destroy() {
      if (this.watermarkHandler) {
        this.watermarkHandler.destroy();
      }
    }
  }
  const appConfig = {
    version: "core-v0.0.1",
    name: "datavis-core",
    description: "核心库"
  };
  const version = appConfig.version;
  exports2.datavisCore = DatavisEngine;
  exports2.default = DatavisEngine;
  exports2.editorUtil = editorUtil;
  exports2.version = version;
  Object.defineProperties(exports2, { __esModule: { value: true }, [Symbol.toStringTag]: { value: "Module" } });
});
