var __create = Object.create;
var __defProp = Object.defineProperty;
var __getOwnPropDesc = Object.getOwnPropertyDescriptor;
var __getOwnPropNames = Object.getOwnPropertyNames;
var __getProtoOf = Object.getPrototypeOf;
var __hasOwnProp = Object.prototype.hasOwnProperty;
var __commonJS = (cb, mod) => function __require() {
  try {
    return mod || (0, cb[__getOwnPropNames(cb)[0]])((mod = { exports: {} }).exports, mod), mod.exports;
  } catch (e) {
    throw mod = 0, e;
  }
};
var __export = (target, all) => {
  for (var name in all)
    __defProp(target, name, { get: all[name], enumerable: true });
};
var __copyProps = (to, from2, except, desc) => {
  if (from2 && typeof from2 === "object" || typeof from2 === "function") {
    for (let key of __getOwnPropNames(from2))
      if (!__hasOwnProp.call(to, key) && key !== except)
        __defProp(to, key, { get: () => from2[key], enumerable: !(desc = __getOwnPropDesc(from2, key)) || desc.enumerable });
  }
  return to;
};
var __toESM = (mod, isNodeMode, target) => (target = mod != null ? __create(__getProtoOf(mod)) : {}, __copyProps(
  // If the importer is in node compatibility mode or this is not an ESM
  // file that has been converted to a CommonJS file using a Babel-
  // compatible transform (i.e. "__esModule" has not been set), then set
  // "default" to the CommonJS "module.exports" for node compatibility.
  isNodeMode || !mod || !mod.__esModule ? __defProp(target, "default", { value: mod, enumerable: true }) : target,
  mod
));

// node_modules/eventemitter3/index.js
var require_eventemitter3 = __commonJS({
  "node_modules/eventemitter3/index.js"(exports, module) {
    "use strict";
    var has = Object.prototype.hasOwnProperty;
    var prefix = "~";
    function Events() {
    }
    if (Object.create) {
      Events.prototype = /* @__PURE__ */ Object.create(null);
      if (!new Events().__proto__) prefix = false;
    }
    function EE(fn, context, once) {
      this.fn = fn;
      this.context = context;
      this.once = once || false;
    }
    function addListener(emitter, event, fn, context, once) {
      if (typeof fn !== "function") {
        throw new TypeError("The listener must be a function");
      }
      var listener = new EE(fn, context || emitter, once), evt = prefix ? prefix + event : event;
      if (!emitter._events[evt]) emitter._events[evt] = listener, emitter._eventsCount++;
      else if (!emitter._events[evt].fn) emitter._events[evt].push(listener);
      else emitter._events[evt] = [emitter._events[evt], listener];
      return emitter;
    }
    function clearEvent(emitter, evt) {
      if (--emitter._eventsCount === 0) emitter._events = new Events();
      else delete emitter._events[evt];
    }
    function EventEmitter2() {
      this._events = new Events();
      this._eventsCount = 0;
    }
    EventEmitter2.prototype.eventNames = function eventNames() {
      var names = [], events, name;
      if (this._eventsCount === 0) return names;
      for (name in events = this._events) {
        if (has.call(events, name)) names.push(prefix ? name.slice(1) : name);
      }
      if (Object.getOwnPropertySymbols) {
        return names.concat(Object.getOwnPropertySymbols(events));
      }
      return names;
    };
    EventEmitter2.prototype.listeners = function listeners(event) {
      var evt = prefix ? prefix + event : event, handlers = this._events[evt];
      if (!handlers) return [];
      if (handlers.fn) return [handlers.fn];
      for (var i = 0, l = handlers.length, ee = new Array(l); i < l; i++) {
        ee[i] = handlers[i].fn;
      }
      return ee;
    };
    EventEmitter2.prototype.listenerCount = function listenerCount(event) {
      var evt = prefix ? prefix + event : event, listeners = this._events[evt];
      if (!listeners) return 0;
      if (listeners.fn) return 1;
      return listeners.length;
    };
    EventEmitter2.prototype.emit = function emit(event, a1, a2, a3, a4, a5) {
      var evt = prefix ? prefix + event : event;
      if (!this._events[evt]) return false;
      var listeners = this._events[evt], len = arguments.length, args, i;
      if (listeners.fn) {
        if (listeners.once) this.removeListener(event, listeners.fn, void 0, true);
        switch (len) {
          case 1:
            return listeners.fn.call(listeners.context), true;
          case 2:
            return listeners.fn.call(listeners.context, a1), true;
          case 3:
            return listeners.fn.call(listeners.context, a1, a2), true;
          case 4:
            return listeners.fn.call(listeners.context, a1, a2, a3), true;
          case 5:
            return listeners.fn.call(listeners.context, a1, a2, a3, a4), true;
          case 6:
            return listeners.fn.call(listeners.context, a1, a2, a3, a4, a5), true;
        }
        for (i = 1, args = new Array(len - 1); i < len; i++) {
          args[i - 1] = arguments[i];
        }
        listeners.fn.apply(listeners.context, args);
      } else {
        var length = listeners.length, j;
        for (i = 0; i < length; i++) {
          if (listeners[i].once) this.removeListener(event, listeners[i].fn, void 0, true);
          switch (len) {
            case 1:
              listeners[i].fn.call(listeners[i].context);
              break;
            case 2:
              listeners[i].fn.call(listeners[i].context, a1);
              break;
            case 3:
              listeners[i].fn.call(listeners[i].context, a1, a2);
              break;
            case 4:
              listeners[i].fn.call(listeners[i].context, a1, a2, a3);
              break;
            default:
              if (!args) for (j = 1, args = new Array(len - 1); j < len; j++) {
                args[j - 1] = arguments[j];
              }
              listeners[i].fn.apply(listeners[i].context, args);
          }
        }
      }
      return true;
    };
    EventEmitter2.prototype.on = function on(event, fn, context) {
      return addListener(this, event, fn, context, false);
    };
    EventEmitter2.prototype.once = function once(event, fn, context) {
      return addListener(this, event, fn, context, true);
    };
    EventEmitter2.prototype.removeListener = function removeListener(event, fn, context, once) {
      var evt = prefix ? prefix + event : event;
      if (!this._events[evt]) return this;
      if (!fn) {
        clearEvent(this, evt);
        return this;
      }
      var listeners = this._events[evt];
      if (listeners.fn) {
        if (listeners.fn === fn && (!once || listeners.once) && (!context || listeners.context === context)) {
          clearEvent(this, evt);
        }
      } else {
        for (var i = 0, events = [], length = listeners.length; i < length; i++) {
          if (listeners[i].fn !== fn || once && !listeners[i].once || context && listeners[i].context !== context) {
            events.push(listeners[i]);
          }
        }
        if (events.length) this._events[evt] = events.length === 1 ? events[0] : events;
        else clearEvent(this, evt);
      }
      return this;
    };
    EventEmitter2.prototype.removeAllListeners = function removeAllListeners(event) {
      var evt;
      if (event) {
        evt = prefix ? prefix + event : event;
        if (this._events[evt]) clearEvent(this, evt);
      } else {
        this._events = new Events();
        this._eventsCount = 0;
      }
      return this;
    };
    EventEmitter2.prototype.off = EventEmitter2.prototype.removeListener;
    EventEmitter2.prototype.addListener = EventEmitter2.prototype.on;
    EventEmitter2.prefixed = prefix;
    EventEmitter2.EventEmitter = EventEmitter2;
    if ("undefined" !== typeof module) {
      module.exports = EventEmitter2;
    }
  }
});

// node_modules/base64-js/index.js
var require_base64_js = __commonJS({
  "node_modules/base64-js/index.js"(exports) {
    "use strict";
    exports.byteLength = byteLength;
    exports.toByteArray = toByteArray;
    exports.fromByteArray = fromByteArray;
    var lookup = [];
    var revLookup = [];
    var Arr = typeof Uint8Array !== "undefined" ? Uint8Array : Array;
    var code = "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789+/";
    for (i = 0, len = code.length; i < len; ++i) {
      lookup[i] = code[i];
      revLookup[code.charCodeAt(i)] = i;
    }
    var i;
    var len;
    revLookup["-".charCodeAt(0)] = 62;
    revLookup["_".charCodeAt(0)] = 63;
    function getLens(b64) {
      var len2 = b64.length;
      if (len2 % 4 > 0) {
        throw new Error("Invalid string. Length must be a multiple of 4");
      }
      var validLen = b64.indexOf("=");
      if (validLen === -1) validLen = len2;
      var placeHoldersLen = validLen === len2 ? 0 : 4 - validLen % 4;
      return [validLen, placeHoldersLen];
    }
    function byteLength(b64) {
      var lens = getLens(b64);
      var validLen = lens[0];
      var placeHoldersLen = lens[1];
      return (validLen + placeHoldersLen) * 3 / 4 - placeHoldersLen;
    }
    function _byteLength(b64, validLen, placeHoldersLen) {
      return (validLen + placeHoldersLen) * 3 / 4 - placeHoldersLen;
    }
    function toByteArray(b64) {
      var tmp;
      var lens = getLens(b64);
      var validLen = lens[0];
      var placeHoldersLen = lens[1];
      var arr = new Arr(_byteLength(b64, validLen, placeHoldersLen));
      var curByte = 0;
      var len2 = placeHoldersLen > 0 ? validLen - 4 : validLen;
      var i2;
      for (i2 = 0; i2 < len2; i2 += 4) {
        tmp = revLookup[b64.charCodeAt(i2)] << 18 | revLookup[b64.charCodeAt(i2 + 1)] << 12 | revLookup[b64.charCodeAt(i2 + 2)] << 6 | revLookup[b64.charCodeAt(i2 + 3)];
        arr[curByte++] = tmp >> 16 & 255;
        arr[curByte++] = tmp >> 8 & 255;
        arr[curByte++] = tmp & 255;
      }
      if (placeHoldersLen === 2) {
        tmp = revLookup[b64.charCodeAt(i2)] << 2 | revLookup[b64.charCodeAt(i2 + 1)] >> 4;
        arr[curByte++] = tmp & 255;
      }
      if (placeHoldersLen === 1) {
        tmp = revLookup[b64.charCodeAt(i2)] << 10 | revLookup[b64.charCodeAt(i2 + 1)] << 4 | revLookup[b64.charCodeAt(i2 + 2)] >> 2;
        arr[curByte++] = tmp >> 8 & 255;
        arr[curByte++] = tmp & 255;
      }
      return arr;
    }
    function tripletToBase64(num) {
      return lookup[num >> 18 & 63] + lookup[num >> 12 & 63] + lookup[num >> 6 & 63] + lookup[num & 63];
    }
    function encodeChunk(uint82, start, end) {
      var tmp;
      var output2 = [];
      for (var i2 = start; i2 < end; i2 += 3) {
        tmp = (uint82[i2] << 16 & 16711680) + (uint82[i2 + 1] << 8 & 65280) + (uint82[i2 + 2] & 255);
        output2.push(tripletToBase64(tmp));
      }
      return output2.join("");
    }
    function fromByteArray(uint82) {
      var tmp;
      var len2 = uint82.length;
      var extraBytes = len2 % 3;
      var parts = [];
      var maxChunkLength = 16383;
      for (var i2 = 0, len22 = len2 - extraBytes; i2 < len22; i2 += maxChunkLength) {
        parts.push(encodeChunk(uint82, i2, i2 + maxChunkLength > len22 ? len22 : i2 + maxChunkLength));
      }
      if (extraBytes === 1) {
        tmp = uint82[len2 - 1];
        parts.push(
          lookup[tmp >> 2] + lookup[tmp << 4 & 63] + "=="
        );
      } else if (extraBytes === 2) {
        tmp = (uint82[len2 - 2] << 8) + uint82[len2 - 1];
        parts.push(
          lookup[tmp >> 10] + lookup[tmp >> 4 & 63] + lookup[tmp << 2 & 63] + "="
        );
      }
      return parts.join("");
    }
  }
});

// node_modules/ieee754/index.js
var require_ieee754 = __commonJS({
  "node_modules/ieee754/index.js"(exports) {
    exports.read = function(buffer, offset, isLE, mLen, nBytes) {
      var e, m;
      var eLen = nBytes * 8 - mLen - 1;
      var eMax = (1 << eLen) - 1;
      var eBias = eMax >> 1;
      var nBits = -7;
      var i = isLE ? nBytes - 1 : 0;
      var d = isLE ? -1 : 1;
      var s = buffer[offset + i];
      i += d;
      e = s & (1 << -nBits) - 1;
      s >>= -nBits;
      nBits += eLen;
      for (; nBits > 0; e = e * 256 + buffer[offset + i], i += d, nBits -= 8) {
      }
      m = e & (1 << -nBits) - 1;
      e >>= -nBits;
      nBits += mLen;
      for (; nBits > 0; m = m * 256 + buffer[offset + i], i += d, nBits -= 8) {
      }
      if (e === 0) {
        e = 1 - eBias;
      } else if (e === eMax) {
        return m ? NaN : (s ? -1 : 1) * Infinity;
      } else {
        m = m + Math.pow(2, mLen);
        e = e - eBias;
      }
      return (s ? -1 : 1) * m * Math.pow(2, e - mLen);
    };
    exports.write = function(buffer, value, offset, isLE, mLen, nBytes) {
      var e, m, c;
      var eLen = nBytes * 8 - mLen - 1;
      var eMax = (1 << eLen) - 1;
      var eBias = eMax >> 1;
      var rt = mLen === 23 ? Math.pow(2, -24) - Math.pow(2, -77) : 0;
      var i = isLE ? 0 : nBytes - 1;
      var d = isLE ? 1 : -1;
      var s = value < 0 || value === 0 && 1 / value < 0 ? 1 : 0;
      value = Math.abs(value);
      if (isNaN(value) || value === Infinity) {
        m = isNaN(value) ? 1 : 0;
        e = eMax;
      } else {
        e = Math.floor(Math.log(value) / Math.LN2);
        if (value * (c = Math.pow(2, -e)) < 1) {
          e--;
          c *= 2;
        }
        if (e + eBias >= 1) {
          value += rt / c;
        } else {
          value += rt * Math.pow(2, 1 - eBias);
        }
        if (value * c >= 2) {
          e++;
          c /= 2;
        }
        if (e + eBias >= eMax) {
          m = 0;
          e = eMax;
        } else if (e + eBias >= 1) {
          m = (value * c - 1) * Math.pow(2, mLen);
          e = e + eBias;
        } else {
          m = value * Math.pow(2, eBias - 1) * Math.pow(2, mLen);
          e = 0;
        }
      }
      for (; mLen >= 8; buffer[offset + i] = m & 255, i += d, m /= 256, mLen -= 8) {
      }
      e = e << mLen | m;
      eLen += mLen;
      for (; eLen > 0; buffer[offset + i] = e & 255, i += d, e /= 256, eLen -= 8) {
      }
      buffer[offset + i - d] |= s * 128;
    };
  }
});

// node_modules/buffer/index.js
var require_buffer = __commonJS({
  "node_modules/buffer/index.js"(exports) {
    "use strict";
    var base64 = require_base64_js();
    var ieee754 = require_ieee754();
    var customInspectSymbol = typeof Symbol === "function" && typeof Symbol["for"] === "function" ? Symbol["for"]("nodejs.util.inspect.custom") : null;
    exports.Buffer = Buffer8;
    exports.SlowBuffer = SlowBuffer;
    exports.INSPECT_MAX_BYTES = 50;
    var K_MAX_LENGTH = 2147483647;
    exports.kMaxLength = K_MAX_LENGTH;
    Buffer8.TYPED_ARRAY_SUPPORT = typedArraySupport();
    if (!Buffer8.TYPED_ARRAY_SUPPORT && typeof console !== "undefined" && typeof console.error === "function") {
      console.error(
        "This browser lacks typed array (Uint8Array) support which is required by `buffer` v5.x. Use `buffer` v4.x if you require old browser support."
      );
    }
    function typedArraySupport() {
      try {
        const arr = new Uint8Array(1);
        const proto = { foo: function() {
          return 42;
        } };
        Object.setPrototypeOf(proto, Uint8Array.prototype);
        Object.setPrototypeOf(arr, proto);
        return arr.foo() === 42;
      } catch (e) {
        return false;
      }
    }
    Object.defineProperty(Buffer8.prototype, "parent", {
      enumerable: true,
      get: function() {
        if (!Buffer8.isBuffer(this)) return void 0;
        return this.buffer;
      }
    });
    Object.defineProperty(Buffer8.prototype, "offset", {
      enumerable: true,
      get: function() {
        if (!Buffer8.isBuffer(this)) return void 0;
        return this.byteOffset;
      }
    });
    function createBuffer(length) {
      if (length > K_MAX_LENGTH) {
        throw new RangeError('The value "' + length + '" is invalid for option "size"');
      }
      const buf = new Uint8Array(length);
      Object.setPrototypeOf(buf, Buffer8.prototype);
      return buf;
    }
    function Buffer8(arg, encodingOrOffset, length) {
      if (typeof arg === "number") {
        if (typeof encodingOrOffset === "string") {
          throw new TypeError(
            'The "string" argument must be of type string. Received type number'
          );
        }
        return allocUnsafe(arg);
      }
      return from2(arg, encodingOrOffset, length);
    }
    Buffer8.poolSize = 8192;
    function from2(value, encodingOrOffset, length) {
      if (typeof value === "string") {
        return fromString(value, encodingOrOffset);
      }
      if (ArrayBuffer.isView(value)) {
        return fromArrayView(value);
      }
      if (value == null) {
        throw new TypeError(
          "The first argument must be one of type string, Buffer, ArrayBuffer, Array, or Array-like Object. Received type " + typeof value
        );
      }
      if (isInstance(value, ArrayBuffer) || value && isInstance(value.buffer, ArrayBuffer)) {
        return fromArrayBuffer(value, encodingOrOffset, length);
      }
      if (typeof SharedArrayBuffer !== "undefined" && (isInstance(value, SharedArrayBuffer) || value && isInstance(value.buffer, SharedArrayBuffer))) {
        return fromArrayBuffer(value, encodingOrOffset, length);
      }
      if (typeof value === "number") {
        throw new TypeError(
          'The "value" argument must not be of type number. Received type number'
        );
      }
      const valueOf = value.valueOf && value.valueOf();
      if (valueOf != null && valueOf !== value) {
        return Buffer8.from(valueOf, encodingOrOffset, length);
      }
      const b = fromObject(value);
      if (b) return b;
      if (typeof Symbol !== "undefined" && Symbol.toPrimitive != null && typeof value[Symbol.toPrimitive] === "function") {
        return Buffer8.from(value[Symbol.toPrimitive]("string"), encodingOrOffset, length);
      }
      throw new TypeError(
        "The first argument must be one of type string, Buffer, ArrayBuffer, Array, or Array-like Object. Received type " + typeof value
      );
    }
    Buffer8.from = function(value, encodingOrOffset, length) {
      return from2(value, encodingOrOffset, length);
    };
    Object.setPrototypeOf(Buffer8.prototype, Uint8Array.prototype);
    Object.setPrototypeOf(Buffer8, Uint8Array);
    function assertSize(size) {
      if (typeof size !== "number") {
        throw new TypeError('"size" argument must be of type number');
      } else if (size < 0) {
        throw new RangeError('The value "' + size + '" is invalid for option "size"');
      }
    }
    function alloc(size, fill, encoding) {
      assertSize(size);
      if (size <= 0) {
        return createBuffer(size);
      }
      if (fill !== void 0) {
        return typeof encoding === "string" ? createBuffer(size).fill(fill, encoding) : createBuffer(size).fill(fill);
      }
      return createBuffer(size);
    }
    Buffer8.alloc = function(size, fill, encoding) {
      return alloc(size, fill, encoding);
    };
    function allocUnsafe(size) {
      assertSize(size);
      return createBuffer(size < 0 ? 0 : checked(size) | 0);
    }
    Buffer8.allocUnsafe = function(size) {
      return allocUnsafe(size);
    };
    Buffer8.allocUnsafeSlow = function(size) {
      return allocUnsafe(size);
    };
    function fromString(string, encoding) {
      if (typeof encoding !== "string" || encoding === "") {
        encoding = "utf8";
      }
      if (!Buffer8.isEncoding(encoding)) {
        throw new TypeError("Unknown encoding: " + encoding);
      }
      const length = byteLength(string, encoding) | 0;
      let buf = createBuffer(length);
      const actual = buf.write(string, encoding);
      if (actual !== length) {
        buf = buf.slice(0, actual);
      }
      return buf;
    }
    function fromArrayLike(array2) {
      const length = array2.length < 0 ? 0 : checked(array2.length) | 0;
      const buf = createBuffer(length);
      for (let i = 0; i < length; i += 1) {
        buf[i] = array2[i] & 255;
      }
      return buf;
    }
    function fromArrayView(arrayView) {
      if (isInstance(arrayView, Uint8Array)) {
        const copy = new Uint8Array(arrayView);
        return fromArrayBuffer(copy.buffer, copy.byteOffset, copy.byteLength);
      }
      return fromArrayLike(arrayView);
    }
    function fromArrayBuffer(array2, byteOffset, length) {
      if (byteOffset < 0 || array2.byteLength < byteOffset) {
        throw new RangeError('"offset" is outside of buffer bounds');
      }
      if (array2.byteLength < byteOffset + (length || 0)) {
        throw new RangeError('"length" is outside of buffer bounds');
      }
      let buf;
      if (byteOffset === void 0 && length === void 0) {
        buf = new Uint8Array(array2);
      } else if (length === void 0) {
        buf = new Uint8Array(array2, byteOffset);
      } else {
        buf = new Uint8Array(array2, byteOffset, length);
      }
      Object.setPrototypeOf(buf, Buffer8.prototype);
      return buf;
    }
    function fromObject(obj) {
      if (Buffer8.isBuffer(obj)) {
        const len = checked(obj.length) | 0;
        const buf = createBuffer(len);
        if (buf.length === 0) {
          return buf;
        }
        obj.copy(buf, 0, 0, len);
        return buf;
      }
      if (obj.length !== void 0) {
        if (typeof obj.length !== "number" || numberIsNaN(obj.length)) {
          return createBuffer(0);
        }
        return fromArrayLike(obj);
      }
      if (obj.type === "Buffer" && Array.isArray(obj.data)) {
        return fromArrayLike(obj.data);
      }
    }
    function checked(length) {
      if (length >= K_MAX_LENGTH) {
        throw new RangeError("Attempt to allocate Buffer larger than maximum size: 0x" + K_MAX_LENGTH.toString(16) + " bytes");
      }
      return length | 0;
    }
    function SlowBuffer(length) {
      if (+length != length) {
        length = 0;
      }
      return Buffer8.alloc(+length);
    }
    Buffer8.isBuffer = function isBuffer(b) {
      return b != null && b._isBuffer === true && b !== Buffer8.prototype;
    };
    Buffer8.compare = function compare(a, b) {
      if (isInstance(a, Uint8Array)) a = Buffer8.from(a, a.offset, a.byteLength);
      if (isInstance(b, Uint8Array)) b = Buffer8.from(b, b.offset, b.byteLength);
      if (!Buffer8.isBuffer(a) || !Buffer8.isBuffer(b)) {
        throw new TypeError(
          'The "buf1", "buf2" arguments must be one of type Buffer or Uint8Array'
        );
      }
      if (a === b) return 0;
      let x = a.length;
      let y = b.length;
      for (let i = 0, len = Math.min(x, y); i < len; ++i) {
        if (a[i] !== b[i]) {
          x = a[i];
          y = b[i];
          break;
        }
      }
      if (x < y) return -1;
      if (y < x) return 1;
      return 0;
    };
    Buffer8.isEncoding = function isEncoding(encoding) {
      switch (String(encoding).toLowerCase()) {
        case "hex":
        case "utf8":
        case "utf-8":
        case "ascii":
        case "latin1":
        case "binary":
        case "base64":
        case "ucs2":
        case "ucs-2":
        case "utf16le":
        case "utf-16le":
          return true;
        default:
          return false;
      }
    };
    Buffer8.concat = function concat(list2, length) {
      if (!Array.isArray(list2)) {
        throw new TypeError('"list" argument must be an Array of Buffers');
      }
      if (list2.length === 0) {
        return Buffer8.alloc(0);
      }
      let i;
      if (length === void 0) {
        length = 0;
        for (i = 0; i < list2.length; ++i) {
          length += list2[i].length;
        }
      }
      const buffer = Buffer8.allocUnsafe(length);
      let pos = 0;
      for (i = 0; i < list2.length; ++i) {
        let buf = list2[i];
        if (isInstance(buf, Uint8Array)) {
          if (pos + buf.length > buffer.length) {
            if (!Buffer8.isBuffer(buf)) buf = Buffer8.from(buf);
            buf.copy(buffer, pos);
          } else {
            Uint8Array.prototype.set.call(
              buffer,
              buf,
              pos
            );
          }
        } else if (!Buffer8.isBuffer(buf)) {
          throw new TypeError('"list" argument must be an Array of Buffers');
        } else {
          buf.copy(buffer, pos);
        }
        pos += buf.length;
      }
      return buffer;
    };
    function byteLength(string, encoding) {
      if (Buffer8.isBuffer(string)) {
        return string.length;
      }
      if (ArrayBuffer.isView(string) || isInstance(string, ArrayBuffer)) {
        return string.byteLength;
      }
      if (typeof string !== "string") {
        throw new TypeError(
          'The "string" argument must be one of type string, Buffer, or ArrayBuffer. Received type ' + typeof string
        );
      }
      const len = string.length;
      const mustMatch = arguments.length > 2 && arguments[2] === true;
      if (!mustMatch && len === 0) return 0;
      let loweredCase = false;
      for (; ; ) {
        switch (encoding) {
          case "ascii":
          case "latin1":
          case "binary":
            return len;
          case "utf8":
          case "utf-8":
            return utf8ToBytes(string).length;
          case "ucs2":
          case "ucs-2":
          case "utf16le":
          case "utf-16le":
            return len * 2;
          case "hex":
            return len >>> 1;
          case "base64":
            return base64ToBytes(string).length;
          default:
            if (loweredCase) {
              return mustMatch ? -1 : utf8ToBytes(string).length;
            }
            encoding = ("" + encoding).toLowerCase();
            loweredCase = true;
        }
      }
    }
    Buffer8.byteLength = byteLength;
    function slowToString(encoding, start, end) {
      let loweredCase = false;
      if (start === void 0 || start < 0) {
        start = 0;
      }
      if (start > this.length) {
        return "";
      }
      if (end === void 0 || end > this.length) {
        end = this.length;
      }
      if (end <= 0) {
        return "";
      }
      end >>>= 0;
      start >>>= 0;
      if (end <= start) {
        return "";
      }
      if (!encoding) encoding = "utf8";
      while (true) {
        switch (encoding) {
          case "hex":
            return hexSlice(this, start, end);
          case "utf8":
          case "utf-8":
            return utf8Slice(this, start, end);
          case "ascii":
            return asciiSlice(this, start, end);
          case "latin1":
          case "binary":
            return latin1Slice(this, start, end);
          case "base64":
            return base64Slice(this, start, end);
          case "ucs2":
          case "ucs-2":
          case "utf16le":
          case "utf-16le":
            return utf16leSlice(this, start, end);
          default:
            if (loweredCase) throw new TypeError("Unknown encoding: " + encoding);
            encoding = (encoding + "").toLowerCase();
            loweredCase = true;
        }
      }
    }
    Buffer8.prototype._isBuffer = true;
    function swap(b, n, m) {
      const i = b[n];
      b[n] = b[m];
      b[m] = i;
    }
    Buffer8.prototype.swap16 = function swap16() {
      const len = this.length;
      if (len % 2 !== 0) {
        throw new RangeError("Buffer size must be a multiple of 16-bits");
      }
      for (let i = 0; i < len; i += 2) {
        swap(this, i, i + 1);
      }
      return this;
    };
    Buffer8.prototype.swap32 = function swap32() {
      const len = this.length;
      if (len % 4 !== 0) {
        throw new RangeError("Buffer size must be a multiple of 32-bits");
      }
      for (let i = 0; i < len; i += 4) {
        swap(this, i, i + 3);
        swap(this, i + 1, i + 2);
      }
      return this;
    };
    Buffer8.prototype.swap64 = function swap64() {
      const len = this.length;
      if (len % 8 !== 0) {
        throw new RangeError("Buffer size must be a multiple of 64-bits");
      }
      for (let i = 0; i < len; i += 8) {
        swap(this, i, i + 7);
        swap(this, i + 1, i + 6);
        swap(this, i + 2, i + 5);
        swap(this, i + 3, i + 4);
      }
      return this;
    };
    Buffer8.prototype.toString = function toString() {
      const length = this.length;
      if (length === 0) return "";
      if (arguments.length === 0) return utf8Slice(this, 0, length);
      return slowToString.apply(this, arguments);
    };
    Buffer8.prototype.toLocaleString = Buffer8.prototype.toString;
    Buffer8.prototype.equals = function equals(b) {
      if (!Buffer8.isBuffer(b)) throw new TypeError("Argument must be a Buffer");
      if (this === b) return true;
      return Buffer8.compare(this, b) === 0;
    };
    Buffer8.prototype.inspect = function inspect() {
      let str = "";
      const max = exports.INSPECT_MAX_BYTES;
      str = this.toString("hex", 0, max).replace(/(.{2})/g, "$1 ").trim();
      if (this.length > max) str += " ... ";
      return "<Buffer " + str + ">";
    };
    if (customInspectSymbol) {
      Buffer8.prototype[customInspectSymbol] = Buffer8.prototype.inspect;
    }
    Buffer8.prototype.compare = function compare(target, start, end, thisStart, thisEnd) {
      if (isInstance(target, Uint8Array)) {
        target = Buffer8.from(target, target.offset, target.byteLength);
      }
      if (!Buffer8.isBuffer(target)) {
        throw new TypeError(
          'The "target" argument must be one of type Buffer or Uint8Array. Received type ' + typeof target
        );
      }
      if (start === void 0) {
        start = 0;
      }
      if (end === void 0) {
        end = target ? target.length : 0;
      }
      if (thisStart === void 0) {
        thisStart = 0;
      }
      if (thisEnd === void 0) {
        thisEnd = this.length;
      }
      if (start < 0 || end > target.length || thisStart < 0 || thisEnd > this.length) {
        throw new RangeError("out of range index");
      }
      if (thisStart >= thisEnd && start >= end) {
        return 0;
      }
      if (thisStart >= thisEnd) {
        return -1;
      }
      if (start >= end) {
        return 1;
      }
      start >>>= 0;
      end >>>= 0;
      thisStart >>>= 0;
      thisEnd >>>= 0;
      if (this === target) return 0;
      let x = thisEnd - thisStart;
      let y = end - start;
      const len = Math.min(x, y);
      const thisCopy = this.slice(thisStart, thisEnd);
      const targetCopy = target.slice(start, end);
      for (let i = 0; i < len; ++i) {
        if (thisCopy[i] !== targetCopy[i]) {
          x = thisCopy[i];
          y = targetCopy[i];
          break;
        }
      }
      if (x < y) return -1;
      if (y < x) return 1;
      return 0;
    };
    function bidirectionalIndexOf(buffer, val, byteOffset, encoding, dir) {
      if (buffer.length === 0) return -1;
      if (typeof byteOffset === "string") {
        encoding = byteOffset;
        byteOffset = 0;
      } else if (byteOffset > 2147483647) {
        byteOffset = 2147483647;
      } else if (byteOffset < -2147483648) {
        byteOffset = -2147483648;
      }
      byteOffset = +byteOffset;
      if (numberIsNaN(byteOffset)) {
        byteOffset = dir ? 0 : buffer.length - 1;
      }
      if (byteOffset < 0) byteOffset = buffer.length + byteOffset;
      if (byteOffset >= buffer.length) {
        if (dir) return -1;
        else byteOffset = buffer.length - 1;
      } else if (byteOffset < 0) {
        if (dir) byteOffset = 0;
        else return -1;
      }
      if (typeof val === "string") {
        val = Buffer8.from(val, encoding);
      }
      if (Buffer8.isBuffer(val)) {
        if (val.length === 0) {
          return -1;
        }
        return arrayIndexOf(buffer, val, byteOffset, encoding, dir);
      } else if (typeof val === "number") {
        val = val & 255;
        if (typeof Uint8Array.prototype.indexOf === "function") {
          if (dir) {
            return Uint8Array.prototype.indexOf.call(buffer, val, byteOffset);
          } else {
            return Uint8Array.prototype.lastIndexOf.call(buffer, val, byteOffset);
          }
        }
        return arrayIndexOf(buffer, [val], byteOffset, encoding, dir);
      }
      throw new TypeError("val must be string, number or Buffer");
    }
    function arrayIndexOf(arr, val, byteOffset, encoding, dir) {
      let indexSize = 1;
      let arrLength = arr.length;
      let valLength = val.length;
      if (encoding !== void 0) {
        encoding = String(encoding).toLowerCase();
        if (encoding === "ucs2" || encoding === "ucs-2" || encoding === "utf16le" || encoding === "utf-16le") {
          if (arr.length < 2 || val.length < 2) {
            return -1;
          }
          indexSize = 2;
          arrLength /= 2;
          valLength /= 2;
          byteOffset /= 2;
        }
      }
      function read2(buf, i2) {
        if (indexSize === 1) {
          return buf[i2];
        } else {
          return buf.readUInt16BE(i2 * indexSize);
        }
      }
      let i;
      if (dir) {
        let foundIndex = -1;
        for (i = byteOffset; i < arrLength; i++) {
          if (read2(arr, i) === read2(val, foundIndex === -1 ? 0 : i - foundIndex)) {
            if (foundIndex === -1) foundIndex = i;
            if (i - foundIndex + 1 === valLength) return foundIndex * indexSize;
          } else {
            if (foundIndex !== -1) i -= i - foundIndex;
            foundIndex = -1;
          }
        }
      } else {
        if (byteOffset + valLength > arrLength) byteOffset = arrLength - valLength;
        for (i = byteOffset; i >= 0; i--) {
          let found = true;
          for (let j = 0; j < valLength; j++) {
            if (read2(arr, i + j) !== read2(val, j)) {
              found = false;
              break;
            }
          }
          if (found) return i;
        }
      }
      return -1;
    }
    Buffer8.prototype.includes = function includes(val, byteOffset, encoding) {
      return this.indexOf(val, byteOffset, encoding) !== -1;
    };
    Buffer8.prototype.indexOf = function indexOf(val, byteOffset, encoding) {
      return bidirectionalIndexOf(this, val, byteOffset, encoding, true);
    };
    Buffer8.prototype.lastIndexOf = function lastIndexOf(val, byteOffset, encoding) {
      return bidirectionalIndexOf(this, val, byteOffset, encoding, false);
    };
    function hexWrite(buf, string, offset, length) {
      offset = Number(offset) || 0;
      const remaining = buf.length - offset;
      if (!length) {
        length = remaining;
      } else {
        length = Number(length);
        if (length > remaining) {
          length = remaining;
        }
      }
      const strLen = string.length;
      if (length > strLen / 2) {
        length = strLen / 2;
      }
      let i;
      for (i = 0; i < length; ++i) {
        const parsed = parseInt(string.substr(i * 2, 2), 16);
        if (numberIsNaN(parsed)) return i;
        buf[offset + i] = parsed;
      }
      return i;
    }
    function utf8Write(buf, string, offset, length) {
      return blitBuffer(utf8ToBytes(string, buf.length - offset), buf, offset, length);
    }
    function asciiWrite(buf, string, offset, length) {
      return blitBuffer(asciiToBytes(string), buf, offset, length);
    }
    function base64Write(buf, string, offset, length) {
      return blitBuffer(base64ToBytes(string), buf, offset, length);
    }
    function ucs2Write(buf, string, offset, length) {
      return blitBuffer(utf16leToBytes(string, buf.length - offset), buf, offset, length);
    }
    Buffer8.prototype.write = function write2(string, offset, length, encoding) {
      if (offset === void 0) {
        encoding = "utf8";
        length = this.length;
        offset = 0;
      } else if (length === void 0 && typeof offset === "string") {
        encoding = offset;
        length = this.length;
        offset = 0;
      } else if (isFinite(offset)) {
        offset = offset >>> 0;
        if (isFinite(length)) {
          length = length >>> 0;
          if (encoding === void 0) encoding = "utf8";
        } else {
          encoding = length;
          length = void 0;
        }
      } else {
        throw new Error(
          "Buffer.write(string, encoding, offset[, length]) is no longer supported"
        );
      }
      const remaining = this.length - offset;
      if (length === void 0 || length > remaining) length = remaining;
      if (string.length > 0 && (length < 0 || offset < 0) || offset > this.length) {
        throw new RangeError("Attempt to write outside buffer bounds");
      }
      if (!encoding) encoding = "utf8";
      let loweredCase = false;
      for (; ; ) {
        switch (encoding) {
          case "hex":
            return hexWrite(this, string, offset, length);
          case "utf8":
          case "utf-8":
            return utf8Write(this, string, offset, length);
          case "ascii":
          case "latin1":
          case "binary":
            return asciiWrite(this, string, offset, length);
          case "base64":
            return base64Write(this, string, offset, length);
          case "ucs2":
          case "ucs-2":
          case "utf16le":
          case "utf-16le":
            return ucs2Write(this, string, offset, length);
          default:
            if (loweredCase) throw new TypeError("Unknown encoding: " + encoding);
            encoding = ("" + encoding).toLowerCase();
            loweredCase = true;
        }
      }
    };
    Buffer8.prototype.toJSON = function toJSON() {
      return {
        type: "Buffer",
        data: Array.prototype.slice.call(this._arr || this, 0)
      };
    };
    function base64Slice(buf, start, end) {
      if (start === 0 && end === buf.length) {
        return base64.fromByteArray(buf);
      } else {
        return base64.fromByteArray(buf.slice(start, end));
      }
    }
    function utf8Slice(buf, start, end) {
      end = Math.min(buf.length, end);
      const res = [];
      let i = start;
      while (i < end) {
        const firstByte = buf[i];
        let codePoint = null;
        let bytesPerSequence = firstByte > 239 ? 4 : firstByte > 223 ? 3 : firstByte > 191 ? 2 : 1;
        if (i + bytesPerSequence <= end) {
          let secondByte, thirdByte, fourthByte, tempCodePoint;
          switch (bytesPerSequence) {
            case 1:
              if (firstByte < 128) {
                codePoint = firstByte;
              }
              break;
            case 2:
              secondByte = buf[i + 1];
              if ((secondByte & 192) === 128) {
                tempCodePoint = (firstByte & 31) << 6 | secondByte & 63;
                if (tempCodePoint > 127) {
                  codePoint = tempCodePoint;
                }
              }
              break;
            case 3:
              secondByte = buf[i + 1];
              thirdByte = buf[i + 2];
              if ((secondByte & 192) === 128 && (thirdByte & 192) === 128) {
                tempCodePoint = (firstByte & 15) << 12 | (secondByte & 63) << 6 | thirdByte & 63;
                if (tempCodePoint > 2047 && (tempCodePoint < 55296 || tempCodePoint > 57343)) {
                  codePoint = tempCodePoint;
                }
              }
              break;
            case 4:
              secondByte = buf[i + 1];
              thirdByte = buf[i + 2];
              fourthByte = buf[i + 3];
              if ((secondByte & 192) === 128 && (thirdByte & 192) === 128 && (fourthByte & 192) === 128) {
                tempCodePoint = (firstByte & 15) << 18 | (secondByte & 63) << 12 | (thirdByte & 63) << 6 | fourthByte & 63;
                if (tempCodePoint > 65535 && tempCodePoint < 1114112) {
                  codePoint = tempCodePoint;
                }
              }
          }
        }
        if (codePoint === null) {
          codePoint = 65533;
          bytesPerSequence = 1;
        } else if (codePoint > 65535) {
          codePoint -= 65536;
          res.push(codePoint >>> 10 & 1023 | 55296);
          codePoint = 56320 | codePoint & 1023;
        }
        res.push(codePoint);
        i += bytesPerSequence;
      }
      return decodeCodePointsArray(res);
    }
    var MAX_ARGUMENTS_LENGTH = 4096;
    function decodeCodePointsArray(codePoints) {
      const len = codePoints.length;
      if (len <= MAX_ARGUMENTS_LENGTH) {
        return String.fromCharCode.apply(String, codePoints);
      }
      let res = "";
      let i = 0;
      while (i < len) {
        res += String.fromCharCode.apply(
          String,
          codePoints.slice(i, i += MAX_ARGUMENTS_LENGTH)
        );
      }
      return res;
    }
    function asciiSlice(buf, start, end) {
      let ret = "";
      end = Math.min(buf.length, end);
      for (let i = start; i < end; ++i) {
        ret += String.fromCharCode(buf[i] & 127);
      }
      return ret;
    }
    function latin1Slice(buf, start, end) {
      let ret = "";
      end = Math.min(buf.length, end);
      for (let i = start; i < end; ++i) {
        ret += String.fromCharCode(buf[i]);
      }
      return ret;
    }
    function hexSlice(buf, start, end) {
      const len = buf.length;
      if (!start || start < 0) start = 0;
      if (!end || end < 0 || end > len) end = len;
      let out = "";
      for (let i = start; i < end; ++i) {
        out += hexSliceLookupTable[buf[i]];
      }
      return out;
    }
    function utf16leSlice(buf, start, end) {
      const bytes = buf.slice(start, end);
      let res = "";
      for (let i = 0; i < bytes.length - 1; i += 2) {
        res += String.fromCharCode(bytes[i] + bytes[i + 1] * 256);
      }
      return res;
    }
    Buffer8.prototype.slice = function slice(start, end) {
      const len = this.length;
      start = ~~start;
      end = end === void 0 ? len : ~~end;
      if (start < 0) {
        start += len;
        if (start < 0) start = 0;
      } else if (start > len) {
        start = len;
      }
      if (end < 0) {
        end += len;
        if (end < 0) end = 0;
      } else if (end > len) {
        end = len;
      }
      if (end < start) end = start;
      const newBuf = this.subarray(start, end);
      Object.setPrototypeOf(newBuf, Buffer8.prototype);
      return newBuf;
    };
    function checkOffset(offset, ext, length) {
      if (offset % 1 !== 0 || offset < 0) throw new RangeError("offset is not uint");
      if (offset + ext > length) throw new RangeError("Trying to access beyond buffer length");
    }
    Buffer8.prototype.readUintLE = Buffer8.prototype.readUIntLE = function readUIntLE(offset, byteLength2, noAssert) {
      offset = offset >>> 0;
      byteLength2 = byteLength2 >>> 0;
      if (!noAssert) checkOffset(offset, byteLength2, this.length);
      let val = this[offset];
      let mul = 1;
      let i = 0;
      while (++i < byteLength2 && (mul *= 256)) {
        val += this[offset + i] * mul;
      }
      return val;
    };
    Buffer8.prototype.readUintBE = Buffer8.prototype.readUIntBE = function readUIntBE(offset, byteLength2, noAssert) {
      offset = offset >>> 0;
      byteLength2 = byteLength2 >>> 0;
      if (!noAssert) {
        checkOffset(offset, byteLength2, this.length);
      }
      let val = this[offset + --byteLength2];
      let mul = 1;
      while (byteLength2 > 0 && (mul *= 256)) {
        val += this[offset + --byteLength2] * mul;
      }
      return val;
    };
    Buffer8.prototype.readUint8 = Buffer8.prototype.readUInt8 = function readUInt8(offset, noAssert) {
      offset = offset >>> 0;
      if (!noAssert) checkOffset(offset, 1, this.length);
      return this[offset];
    };
    Buffer8.prototype.readUint16LE = Buffer8.prototype.readUInt16LE = function readUInt16LE(offset, noAssert) {
      offset = offset >>> 0;
      if (!noAssert) checkOffset(offset, 2, this.length);
      return this[offset] | this[offset + 1] << 8;
    };
    Buffer8.prototype.readUint16BE = Buffer8.prototype.readUInt16BE = function readUInt16BE(offset, noAssert) {
      offset = offset >>> 0;
      if (!noAssert) checkOffset(offset, 2, this.length);
      return this[offset] << 8 | this[offset + 1];
    };
    Buffer8.prototype.readUint32LE = Buffer8.prototype.readUInt32LE = function readUInt32LE(offset, noAssert) {
      offset = offset >>> 0;
      if (!noAssert) checkOffset(offset, 4, this.length);
      return (this[offset] | this[offset + 1] << 8 | this[offset + 2] << 16) + this[offset + 3] * 16777216;
    };
    Buffer8.prototype.readUint32BE = Buffer8.prototype.readUInt32BE = function readUInt32BE(offset, noAssert) {
      offset = offset >>> 0;
      if (!noAssert) checkOffset(offset, 4, this.length);
      return this[offset] * 16777216 + (this[offset + 1] << 16 | this[offset + 2] << 8 | this[offset + 3]);
    };
    Buffer8.prototype.readBigUInt64LE = defineBigIntMethod(function readBigUInt64LE(offset) {
      offset = offset >>> 0;
      validateNumber(offset, "offset");
      const first = this[offset];
      const last = this[offset + 7];
      if (first === void 0 || last === void 0) {
        boundsError(offset, this.length - 8);
      }
      const lo = first + this[++offset] * 2 ** 8 + this[++offset] * 2 ** 16 + this[++offset] * 2 ** 24;
      const hi = this[++offset] + this[++offset] * 2 ** 8 + this[++offset] * 2 ** 16 + last * 2 ** 24;
      return BigInt(lo) + (BigInt(hi) << BigInt(32));
    });
    Buffer8.prototype.readBigUInt64BE = defineBigIntMethod(function readBigUInt64BE(offset) {
      offset = offset >>> 0;
      validateNumber(offset, "offset");
      const first = this[offset];
      const last = this[offset + 7];
      if (first === void 0 || last === void 0) {
        boundsError(offset, this.length - 8);
      }
      const hi = first * 2 ** 24 + this[++offset] * 2 ** 16 + this[++offset] * 2 ** 8 + this[++offset];
      const lo = this[++offset] * 2 ** 24 + this[++offset] * 2 ** 16 + this[++offset] * 2 ** 8 + last;
      return (BigInt(hi) << BigInt(32)) + BigInt(lo);
    });
    Buffer8.prototype.readIntLE = function readIntLE(offset, byteLength2, noAssert) {
      offset = offset >>> 0;
      byteLength2 = byteLength2 >>> 0;
      if (!noAssert) checkOffset(offset, byteLength2, this.length);
      let val = this[offset];
      let mul = 1;
      let i = 0;
      while (++i < byteLength2 && (mul *= 256)) {
        val += this[offset + i] * mul;
      }
      mul *= 128;
      if (val >= mul) val -= Math.pow(2, 8 * byteLength2);
      return val;
    };
    Buffer8.prototype.readIntBE = function readIntBE(offset, byteLength2, noAssert) {
      offset = offset >>> 0;
      byteLength2 = byteLength2 >>> 0;
      if (!noAssert) checkOffset(offset, byteLength2, this.length);
      let i = byteLength2;
      let mul = 1;
      let val = this[offset + --i];
      while (i > 0 && (mul *= 256)) {
        val += this[offset + --i] * mul;
      }
      mul *= 128;
      if (val >= mul) val -= Math.pow(2, 8 * byteLength2);
      return val;
    };
    Buffer8.prototype.readInt8 = function readInt8(offset, noAssert) {
      offset = offset >>> 0;
      if (!noAssert) checkOffset(offset, 1, this.length);
      if (!(this[offset] & 128)) return this[offset];
      return (255 - this[offset] + 1) * -1;
    };
    Buffer8.prototype.readInt16LE = function readInt16LE(offset, noAssert) {
      offset = offset >>> 0;
      if (!noAssert) checkOffset(offset, 2, this.length);
      const val = this[offset] | this[offset + 1] << 8;
      return val & 32768 ? val | 4294901760 : val;
    };
    Buffer8.prototype.readInt16BE = function readInt16BE(offset, noAssert) {
      offset = offset >>> 0;
      if (!noAssert) checkOffset(offset, 2, this.length);
      const val = this[offset + 1] | this[offset] << 8;
      return val & 32768 ? val | 4294901760 : val;
    };
    Buffer8.prototype.readInt32LE = function readInt32LE(offset, noAssert) {
      offset = offset >>> 0;
      if (!noAssert) checkOffset(offset, 4, this.length);
      return this[offset] | this[offset + 1] << 8 | this[offset + 2] << 16 | this[offset + 3] << 24;
    };
    Buffer8.prototype.readInt32BE = function readInt32BE(offset, noAssert) {
      offset = offset >>> 0;
      if (!noAssert) checkOffset(offset, 4, this.length);
      return this[offset] << 24 | this[offset + 1] << 16 | this[offset + 2] << 8 | this[offset + 3];
    };
    Buffer8.prototype.readBigInt64LE = defineBigIntMethod(function readBigInt64LE(offset) {
      offset = offset >>> 0;
      validateNumber(offset, "offset");
      const first = this[offset];
      const last = this[offset + 7];
      if (first === void 0 || last === void 0) {
        boundsError(offset, this.length - 8);
      }
      const val = this[offset + 4] + this[offset + 5] * 2 ** 8 + this[offset + 6] * 2 ** 16 + (last << 24);
      return (BigInt(val) << BigInt(32)) + BigInt(first + this[++offset] * 2 ** 8 + this[++offset] * 2 ** 16 + this[++offset] * 2 ** 24);
    });
    Buffer8.prototype.readBigInt64BE = defineBigIntMethod(function readBigInt64BE(offset) {
      offset = offset >>> 0;
      validateNumber(offset, "offset");
      const first = this[offset];
      const last = this[offset + 7];
      if (first === void 0 || last === void 0) {
        boundsError(offset, this.length - 8);
      }
      const val = (first << 24) + // Overflow
      this[++offset] * 2 ** 16 + this[++offset] * 2 ** 8 + this[++offset];
      return (BigInt(val) << BigInt(32)) + BigInt(this[++offset] * 2 ** 24 + this[++offset] * 2 ** 16 + this[++offset] * 2 ** 8 + last);
    });
    Buffer8.prototype.readFloatLE = function readFloatLE(offset, noAssert) {
      offset = offset >>> 0;
      if (!noAssert) checkOffset(offset, 4, this.length);
      return ieee754.read(this, offset, true, 23, 4);
    };
    Buffer8.prototype.readFloatBE = function readFloatBE(offset, noAssert) {
      offset = offset >>> 0;
      if (!noAssert) checkOffset(offset, 4, this.length);
      return ieee754.read(this, offset, false, 23, 4);
    };
    Buffer8.prototype.readDoubleLE = function readDoubleLE(offset, noAssert) {
      offset = offset >>> 0;
      if (!noAssert) checkOffset(offset, 8, this.length);
      return ieee754.read(this, offset, true, 52, 8);
    };
    Buffer8.prototype.readDoubleBE = function readDoubleBE(offset, noAssert) {
      offset = offset >>> 0;
      if (!noAssert) checkOffset(offset, 8, this.length);
      return ieee754.read(this, offset, false, 52, 8);
    };
    function checkInt(buf, value, offset, ext, max, min) {
      if (!Buffer8.isBuffer(buf)) throw new TypeError('"buffer" argument must be a Buffer instance');
      if (value > max || value < min) throw new RangeError('"value" argument is out of bounds');
      if (offset + ext > buf.length) throw new RangeError("Index out of range");
    }
    Buffer8.prototype.writeUintLE = Buffer8.prototype.writeUIntLE = function writeUIntLE(value, offset, byteLength2, noAssert) {
      value = +value;
      offset = offset >>> 0;
      byteLength2 = byteLength2 >>> 0;
      if (!noAssert) {
        const maxBytes = Math.pow(2, 8 * byteLength2) - 1;
        checkInt(this, value, offset, byteLength2, maxBytes, 0);
      }
      let mul = 1;
      let i = 0;
      this[offset] = value & 255;
      while (++i < byteLength2 && (mul *= 256)) {
        this[offset + i] = value / mul & 255;
      }
      return offset + byteLength2;
    };
    Buffer8.prototype.writeUintBE = Buffer8.prototype.writeUIntBE = function writeUIntBE(value, offset, byteLength2, noAssert) {
      value = +value;
      offset = offset >>> 0;
      byteLength2 = byteLength2 >>> 0;
      if (!noAssert) {
        const maxBytes = Math.pow(2, 8 * byteLength2) - 1;
        checkInt(this, value, offset, byteLength2, maxBytes, 0);
      }
      let i = byteLength2 - 1;
      let mul = 1;
      this[offset + i] = value & 255;
      while (--i >= 0 && (mul *= 256)) {
        this[offset + i] = value / mul & 255;
      }
      return offset + byteLength2;
    };
    Buffer8.prototype.writeUint8 = Buffer8.prototype.writeUInt8 = function writeUInt8(value, offset, noAssert) {
      value = +value;
      offset = offset >>> 0;
      if (!noAssert) checkInt(this, value, offset, 1, 255, 0);
      this[offset] = value & 255;
      return offset + 1;
    };
    Buffer8.prototype.writeUint16LE = Buffer8.prototype.writeUInt16LE = function writeUInt16LE(value, offset, noAssert) {
      value = +value;
      offset = offset >>> 0;
      if (!noAssert) checkInt(this, value, offset, 2, 65535, 0);
      this[offset] = value & 255;
      this[offset + 1] = value >>> 8;
      return offset + 2;
    };
    Buffer8.prototype.writeUint16BE = Buffer8.prototype.writeUInt16BE = function writeUInt16BE(value, offset, noAssert) {
      value = +value;
      offset = offset >>> 0;
      if (!noAssert) checkInt(this, value, offset, 2, 65535, 0);
      this[offset] = value >>> 8;
      this[offset + 1] = value & 255;
      return offset + 2;
    };
    Buffer8.prototype.writeUint32LE = Buffer8.prototype.writeUInt32LE = function writeUInt32LE(value, offset, noAssert) {
      value = +value;
      offset = offset >>> 0;
      if (!noAssert) checkInt(this, value, offset, 4, 4294967295, 0);
      this[offset + 3] = value >>> 24;
      this[offset + 2] = value >>> 16;
      this[offset + 1] = value >>> 8;
      this[offset] = value & 255;
      return offset + 4;
    };
    Buffer8.prototype.writeUint32BE = Buffer8.prototype.writeUInt32BE = function writeUInt32BE(value, offset, noAssert) {
      value = +value;
      offset = offset >>> 0;
      if (!noAssert) checkInt(this, value, offset, 4, 4294967295, 0);
      this[offset] = value >>> 24;
      this[offset + 1] = value >>> 16;
      this[offset + 2] = value >>> 8;
      this[offset + 3] = value & 255;
      return offset + 4;
    };
    function wrtBigUInt64LE(buf, value, offset, min, max) {
      checkIntBI(value, min, max, buf, offset, 7);
      let lo = Number(value & BigInt(4294967295));
      buf[offset++] = lo;
      lo = lo >> 8;
      buf[offset++] = lo;
      lo = lo >> 8;
      buf[offset++] = lo;
      lo = lo >> 8;
      buf[offset++] = lo;
      let hi = Number(value >> BigInt(32) & BigInt(4294967295));
      buf[offset++] = hi;
      hi = hi >> 8;
      buf[offset++] = hi;
      hi = hi >> 8;
      buf[offset++] = hi;
      hi = hi >> 8;
      buf[offset++] = hi;
      return offset;
    }
    function wrtBigUInt64BE(buf, value, offset, min, max) {
      checkIntBI(value, min, max, buf, offset, 7);
      let lo = Number(value & BigInt(4294967295));
      buf[offset + 7] = lo;
      lo = lo >> 8;
      buf[offset + 6] = lo;
      lo = lo >> 8;
      buf[offset + 5] = lo;
      lo = lo >> 8;
      buf[offset + 4] = lo;
      let hi = Number(value >> BigInt(32) & BigInt(4294967295));
      buf[offset + 3] = hi;
      hi = hi >> 8;
      buf[offset + 2] = hi;
      hi = hi >> 8;
      buf[offset + 1] = hi;
      hi = hi >> 8;
      buf[offset] = hi;
      return offset + 8;
    }
    Buffer8.prototype.writeBigUInt64LE = defineBigIntMethod(function writeBigUInt64LE(value, offset = 0) {
      return wrtBigUInt64LE(this, value, offset, BigInt(0), BigInt("0xffffffffffffffff"));
    });
    Buffer8.prototype.writeBigUInt64BE = defineBigIntMethod(function writeBigUInt64BE(value, offset = 0) {
      return wrtBigUInt64BE(this, value, offset, BigInt(0), BigInt("0xffffffffffffffff"));
    });
    Buffer8.prototype.writeIntLE = function writeIntLE(value, offset, byteLength2, noAssert) {
      value = +value;
      offset = offset >>> 0;
      if (!noAssert) {
        const limit = Math.pow(2, 8 * byteLength2 - 1);
        checkInt(this, value, offset, byteLength2, limit - 1, -limit);
      }
      let i = 0;
      let mul = 1;
      let sub = 0;
      this[offset] = value & 255;
      while (++i < byteLength2 && (mul *= 256)) {
        if (value < 0 && sub === 0 && this[offset + i - 1] !== 0) {
          sub = 1;
        }
        this[offset + i] = (value / mul >> 0) - sub & 255;
      }
      return offset + byteLength2;
    };
    Buffer8.prototype.writeIntBE = function writeIntBE(value, offset, byteLength2, noAssert) {
      value = +value;
      offset = offset >>> 0;
      if (!noAssert) {
        const limit = Math.pow(2, 8 * byteLength2 - 1);
        checkInt(this, value, offset, byteLength2, limit - 1, -limit);
      }
      let i = byteLength2 - 1;
      let mul = 1;
      let sub = 0;
      this[offset + i] = value & 255;
      while (--i >= 0 && (mul *= 256)) {
        if (value < 0 && sub === 0 && this[offset + i + 1] !== 0) {
          sub = 1;
        }
        this[offset + i] = (value / mul >> 0) - sub & 255;
      }
      return offset + byteLength2;
    };
    Buffer8.prototype.writeInt8 = function writeInt8(value, offset, noAssert) {
      value = +value;
      offset = offset >>> 0;
      if (!noAssert) checkInt(this, value, offset, 1, 127, -128);
      if (value < 0) value = 255 + value + 1;
      this[offset] = value & 255;
      return offset + 1;
    };
    Buffer8.prototype.writeInt16LE = function writeInt16LE(value, offset, noAssert) {
      value = +value;
      offset = offset >>> 0;
      if (!noAssert) checkInt(this, value, offset, 2, 32767, -32768);
      this[offset] = value & 255;
      this[offset + 1] = value >>> 8;
      return offset + 2;
    };
    Buffer8.prototype.writeInt16BE = function writeInt16BE(value, offset, noAssert) {
      value = +value;
      offset = offset >>> 0;
      if (!noAssert) checkInt(this, value, offset, 2, 32767, -32768);
      this[offset] = value >>> 8;
      this[offset + 1] = value & 255;
      return offset + 2;
    };
    Buffer8.prototype.writeInt32LE = function writeInt32LE(value, offset, noAssert) {
      value = +value;
      offset = offset >>> 0;
      if (!noAssert) checkInt(this, value, offset, 4, 2147483647, -2147483648);
      this[offset] = value & 255;
      this[offset + 1] = value >>> 8;
      this[offset + 2] = value >>> 16;
      this[offset + 3] = value >>> 24;
      return offset + 4;
    };
    Buffer8.prototype.writeInt32BE = function writeInt32BE(value, offset, noAssert) {
      value = +value;
      offset = offset >>> 0;
      if (!noAssert) checkInt(this, value, offset, 4, 2147483647, -2147483648);
      if (value < 0) value = 4294967295 + value + 1;
      this[offset] = value >>> 24;
      this[offset + 1] = value >>> 16;
      this[offset + 2] = value >>> 8;
      this[offset + 3] = value & 255;
      return offset + 4;
    };
    Buffer8.prototype.writeBigInt64LE = defineBigIntMethod(function writeBigInt64LE(value, offset = 0) {
      return wrtBigUInt64LE(this, value, offset, -BigInt("0x8000000000000000"), BigInt("0x7fffffffffffffff"));
    });
    Buffer8.prototype.writeBigInt64BE = defineBigIntMethod(function writeBigInt64BE(value, offset = 0) {
      return wrtBigUInt64BE(this, value, offset, -BigInt("0x8000000000000000"), BigInt("0x7fffffffffffffff"));
    });
    function checkIEEE754(buf, value, offset, ext, max, min) {
      if (offset + ext > buf.length) throw new RangeError("Index out of range");
      if (offset < 0) throw new RangeError("Index out of range");
    }
    function writeFloat(buf, value, offset, littleEndian, noAssert) {
      value = +value;
      offset = offset >>> 0;
      if (!noAssert) {
        checkIEEE754(buf, value, offset, 4, 34028234663852886e22, -34028234663852886e22);
      }
      ieee754.write(buf, value, offset, littleEndian, 23, 4);
      return offset + 4;
    }
    Buffer8.prototype.writeFloatLE = function writeFloatLE(value, offset, noAssert) {
      return writeFloat(this, value, offset, true, noAssert);
    };
    Buffer8.prototype.writeFloatBE = function writeFloatBE(value, offset, noAssert) {
      return writeFloat(this, value, offset, false, noAssert);
    };
    function writeDouble(buf, value, offset, littleEndian, noAssert) {
      value = +value;
      offset = offset >>> 0;
      if (!noAssert) {
        checkIEEE754(buf, value, offset, 8, 17976931348623157e292, -17976931348623157e292);
      }
      ieee754.write(buf, value, offset, littleEndian, 52, 8);
      return offset + 8;
    }
    Buffer8.prototype.writeDoubleLE = function writeDoubleLE(value, offset, noAssert) {
      return writeDouble(this, value, offset, true, noAssert);
    };
    Buffer8.prototype.writeDoubleBE = function writeDoubleBE(value, offset, noAssert) {
      return writeDouble(this, value, offset, false, noAssert);
    };
    Buffer8.prototype.copy = function copy(target, targetStart, start, end) {
      if (!Buffer8.isBuffer(target)) throw new TypeError("argument should be a Buffer");
      if (!start) start = 0;
      if (!end && end !== 0) end = this.length;
      if (targetStart >= target.length) targetStart = target.length;
      if (!targetStart) targetStart = 0;
      if (end > 0 && end < start) end = start;
      if (end === start) return 0;
      if (target.length === 0 || this.length === 0) return 0;
      if (targetStart < 0) {
        throw new RangeError("targetStart out of bounds");
      }
      if (start < 0 || start >= this.length) throw new RangeError("Index out of range");
      if (end < 0) throw new RangeError("sourceEnd out of bounds");
      if (end > this.length) end = this.length;
      if (target.length - targetStart < end - start) {
        end = target.length - targetStart + start;
      }
      const len = end - start;
      if (this === target && typeof Uint8Array.prototype.copyWithin === "function") {
        this.copyWithin(targetStart, start, end);
      } else {
        Uint8Array.prototype.set.call(
          target,
          this.subarray(start, end),
          targetStart
        );
      }
      return len;
    };
    Buffer8.prototype.fill = function fill(val, start, end, encoding) {
      if (typeof val === "string") {
        if (typeof start === "string") {
          encoding = start;
          start = 0;
          end = this.length;
        } else if (typeof end === "string") {
          encoding = end;
          end = this.length;
        }
        if (encoding !== void 0 && typeof encoding !== "string") {
          throw new TypeError("encoding must be a string");
        }
        if (typeof encoding === "string" && !Buffer8.isEncoding(encoding)) {
          throw new TypeError("Unknown encoding: " + encoding);
        }
        if (val.length === 1) {
          const code = val.charCodeAt(0);
          if (encoding === "utf8" && code < 128 || encoding === "latin1") {
            val = code;
          }
        }
      } else if (typeof val === "number") {
        val = val & 255;
      } else if (typeof val === "boolean") {
        val = Number(val);
      }
      if (start < 0 || this.length < start || this.length < end) {
        throw new RangeError("Out of range index");
      }
      if (end <= start) {
        return this;
      }
      start = start >>> 0;
      end = end === void 0 ? this.length : end >>> 0;
      if (!val) val = 0;
      let i;
      if (typeof val === "number") {
        for (i = start; i < end; ++i) {
          this[i] = val;
        }
      } else {
        const bytes = Buffer8.isBuffer(val) ? val : Buffer8.from(val, encoding);
        const len = bytes.length;
        if (len === 0) {
          throw new TypeError('The value "' + val + '" is invalid for argument "value"');
        }
        for (i = 0; i < end - start; ++i) {
          this[i + start] = bytes[i % len];
        }
      }
      return this;
    };
    var errors = {};
    function E(sym, getMessage, Base) {
      errors[sym] = class NodeError extends Base {
        constructor() {
          super();
          Object.defineProperty(this, "message", {
            value: getMessage.apply(this, arguments),
            writable: true,
            configurable: true
          });
          this.name = `${this.name} [${sym}]`;
          this.stack;
          delete this.name;
        }
        get code() {
          return sym;
        }
        set code(value) {
          Object.defineProperty(this, "code", {
            configurable: true,
            enumerable: true,
            value,
            writable: true
          });
        }
        toString() {
          return `${this.name} [${sym}]: ${this.message}`;
        }
      };
    }
    E(
      "ERR_BUFFER_OUT_OF_BOUNDS",
      function(name) {
        if (name) {
          return `${name} is outside of buffer bounds`;
        }
        return "Attempt to access memory outside buffer bounds";
      },
      RangeError
    );
    E(
      "ERR_INVALID_ARG_TYPE",
      function(name, actual) {
        return `The "${name}" argument must be of type number. Received type ${typeof actual}`;
      },
      TypeError
    );
    E(
      "ERR_OUT_OF_RANGE",
      function(str, range, input) {
        let msg = `The value of "${str}" is out of range.`;
        let received = input;
        if (Number.isInteger(input) && Math.abs(input) > 2 ** 32) {
          received = addNumericalSeparator(String(input));
        } else if (typeof input === "bigint") {
          received = String(input);
          if (input > BigInt(2) ** BigInt(32) || input < -(BigInt(2) ** BigInt(32))) {
            received = addNumericalSeparator(received);
          }
          received += "n";
        }
        msg += ` It must be ${range}. Received ${received}`;
        return msg;
      },
      RangeError
    );
    function addNumericalSeparator(val) {
      let res = "";
      let i = val.length;
      const start = val[0] === "-" ? 1 : 0;
      for (; i >= start + 4; i -= 3) {
        res = `_${val.slice(i - 3, i)}${res}`;
      }
      return `${val.slice(0, i)}${res}`;
    }
    function checkBounds(buf, offset, byteLength2) {
      validateNumber(offset, "offset");
      if (buf[offset] === void 0 || buf[offset + byteLength2] === void 0) {
        boundsError(offset, buf.length - (byteLength2 + 1));
      }
    }
    function checkIntBI(value, min, max, buf, offset, byteLength2) {
      if (value > max || value < min) {
        const n = typeof min === "bigint" ? "n" : "";
        let range;
        if (byteLength2 > 3) {
          if (min === 0 || min === BigInt(0)) {
            range = `>= 0${n} and < 2${n} ** ${(byteLength2 + 1) * 8}${n}`;
          } else {
            range = `>= -(2${n} ** ${(byteLength2 + 1) * 8 - 1}${n}) and < 2 ** ${(byteLength2 + 1) * 8 - 1}${n}`;
          }
        } else {
          range = `>= ${min}${n} and <= ${max}${n}`;
        }
        throw new errors.ERR_OUT_OF_RANGE("value", range, value);
      }
      checkBounds(buf, offset, byteLength2);
    }
    function validateNumber(value, name) {
      if (typeof value !== "number") {
        throw new errors.ERR_INVALID_ARG_TYPE(name, "number", value);
      }
    }
    function boundsError(value, length, type) {
      if (Math.floor(value) !== value) {
        validateNumber(value, type);
        throw new errors.ERR_OUT_OF_RANGE(type || "offset", "an integer", value);
      }
      if (length < 0) {
        throw new errors.ERR_BUFFER_OUT_OF_BOUNDS();
      }
      throw new errors.ERR_OUT_OF_RANGE(
        type || "offset",
        `>= ${type ? 1 : 0} and <= ${length}`,
        value
      );
    }
    var INVALID_BASE64_RE = /[^+/0-9A-Za-z-_]/g;
    function base64clean(str) {
      str = str.split("=")[0];
      str = str.trim().replace(INVALID_BASE64_RE, "");
      if (str.length < 2) return "";
      while (str.length % 4 !== 0) {
        str = str + "=";
      }
      return str;
    }
    function utf8ToBytes(string, units) {
      units = units || Infinity;
      let codePoint;
      const length = string.length;
      let leadSurrogate = null;
      const bytes = [];
      for (let i = 0; i < length; ++i) {
        codePoint = string.charCodeAt(i);
        if (codePoint > 55295 && codePoint < 57344) {
          if (!leadSurrogate) {
            if (codePoint > 56319) {
              if ((units -= 3) > -1) bytes.push(239, 191, 189);
              continue;
            } else if (i + 1 === length) {
              if ((units -= 3) > -1) bytes.push(239, 191, 189);
              continue;
            }
            leadSurrogate = codePoint;
            continue;
          }
          if (codePoint < 56320) {
            if ((units -= 3) > -1) bytes.push(239, 191, 189);
            leadSurrogate = codePoint;
            continue;
          }
          codePoint = (leadSurrogate - 55296 << 10 | codePoint - 56320) + 65536;
        } else if (leadSurrogate) {
          if ((units -= 3) > -1) bytes.push(239, 191, 189);
        }
        leadSurrogate = null;
        if (codePoint < 128) {
          if ((units -= 1) < 0) break;
          bytes.push(codePoint);
        } else if (codePoint < 2048) {
          if ((units -= 2) < 0) break;
          bytes.push(
            codePoint >> 6 | 192,
            codePoint & 63 | 128
          );
        } else if (codePoint < 65536) {
          if ((units -= 3) < 0) break;
          bytes.push(
            codePoint >> 12 | 224,
            codePoint >> 6 & 63 | 128,
            codePoint & 63 | 128
          );
        } else if (codePoint < 1114112) {
          if ((units -= 4) < 0) break;
          bytes.push(
            codePoint >> 18 | 240,
            codePoint >> 12 & 63 | 128,
            codePoint >> 6 & 63 | 128,
            codePoint & 63 | 128
          );
        } else {
          throw new Error("Invalid code point");
        }
      }
      return bytes;
    }
    function asciiToBytes(str) {
      const byteArray = [];
      for (let i = 0; i < str.length; ++i) {
        byteArray.push(str.charCodeAt(i) & 255);
      }
      return byteArray;
    }
    function utf16leToBytes(str, units) {
      let c, hi, lo;
      const byteArray = [];
      for (let i = 0; i < str.length; ++i) {
        if ((units -= 2) < 0) break;
        c = str.charCodeAt(i);
        hi = c >> 8;
        lo = c % 256;
        byteArray.push(lo);
        byteArray.push(hi);
      }
      return byteArray;
    }
    function base64ToBytes(str) {
      return base64.toByteArray(base64clean(str));
    }
    function blitBuffer(src, dst, offset, length) {
      let i;
      for (i = 0; i < length; ++i) {
        if (i + offset >= dst.length || i >= src.length) break;
        dst[i + offset] = src[i];
      }
      return i;
    }
    function isInstance(obj, type) {
      return obj instanceof type || obj != null && obj.constructor != null && obj.constructor.name != null && obj.constructor.name === type.name;
    }
    function numberIsNaN(obj) {
      return obj !== obj;
    }
    var hexSliceLookupTable = (function() {
      const alphabet = "0123456789abcdef";
      const table = new Array(256);
      for (let i = 0; i < 16; ++i) {
        const i16 = i * 16;
        for (let j = 0; j < 16; ++j) {
          table[i16 + j] = alphabet[i] + alphabet[j];
        }
      }
      return table;
    })();
    function defineBigIntMethod(fn) {
      return typeof BigInt === "undefined" ? BufferBigIntNotDefined : fn;
    }
    function BufferBigIntNotDefined() {
      throw new Error("BigInt not supported");
    }
  }
});

// node_modules/readable-stream/lib/ours/primordials.js
var require_primordials = __commonJS({
  "node_modules/readable-stream/lib/ours/primordials.js"(exports, module) {
    "use strict";
    var AggregateError = class extends Error {
      constructor(errors) {
        if (!Array.isArray(errors)) {
          throw new TypeError(`Expected input to be an Array, got ${typeof errors}`);
        }
        let message = "";
        for (let i = 0; i < errors.length; i++) {
          message += `    ${errors[i].stack}
`;
        }
        super(message);
        this.name = "AggregateError";
        this.errors = errors;
      }
    };
    module.exports = {
      AggregateError,
      ArrayIsArray(self2) {
        return Array.isArray(self2);
      },
      ArrayPrototypeIncludes(self2, el) {
        return self2.includes(el);
      },
      ArrayPrototypeIndexOf(self2, el) {
        return self2.indexOf(el);
      },
      ArrayPrototypeJoin(self2, sep) {
        return self2.join(sep);
      },
      ArrayPrototypeMap(self2, fn) {
        return self2.map(fn);
      },
      ArrayPrototypePop(self2, el) {
        return self2.pop(el);
      },
      ArrayPrototypePush(self2, el) {
        return self2.push(el);
      },
      ArrayPrototypeSlice(self2, start, end) {
        return self2.slice(start, end);
      },
      Error,
      FunctionPrototypeCall(fn, thisArgs, ...args) {
        return fn.call(thisArgs, ...args);
      },
      FunctionPrototypeSymbolHasInstance(self2, instance) {
        return Function.prototype[Symbol.hasInstance].call(self2, instance);
      },
      MathFloor: Math.floor,
      Number,
      NumberIsInteger: Number.isInteger,
      NumberIsNaN: Number.isNaN,
      NumberMAX_SAFE_INTEGER: Number.MAX_SAFE_INTEGER,
      NumberMIN_SAFE_INTEGER: Number.MIN_SAFE_INTEGER,
      NumberParseInt: Number.parseInt,
      ObjectDefineProperties(self2, props) {
        return Object.defineProperties(self2, props);
      },
      ObjectDefineProperty(self2, name, prop) {
        return Object.defineProperty(self2, name, prop);
      },
      ObjectGetOwnPropertyDescriptor(self2, name) {
        return Object.getOwnPropertyDescriptor(self2, name);
      },
      ObjectKeys(obj) {
        return Object.keys(obj);
      },
      ObjectSetPrototypeOf(target, proto) {
        return Object.setPrototypeOf(target, proto);
      },
      Promise,
      PromisePrototypeCatch(self2, fn) {
        return self2.catch(fn);
      },
      PromisePrototypeThen(self2, thenFn, catchFn) {
        return self2.then(thenFn, catchFn);
      },
      PromiseReject(err2) {
        return Promise.reject(err2);
      },
      PromiseResolve(val) {
        return Promise.resolve(val);
      },
      ReflectApply: Reflect.apply,
      RegExpPrototypeTest(self2, value) {
        return self2.test(value);
      },
      SafeSet: Set,
      String,
      StringPrototypeSlice(self2, start, end) {
        return self2.slice(start, end);
      },
      StringPrototypeToLowerCase(self2) {
        return self2.toLowerCase();
      },
      StringPrototypeToUpperCase(self2) {
        return self2.toUpperCase();
      },
      StringPrototypeTrim(self2) {
        return self2.trim();
      },
      Symbol,
      SymbolFor: Symbol.for,
      SymbolAsyncIterator: Symbol.asyncIterator,
      SymbolHasInstance: Symbol.hasInstance,
      SymbolIterator: Symbol.iterator,
      SymbolDispose: Symbol.dispose || /* @__PURE__ */ Symbol("Symbol.dispose"),
      SymbolAsyncDispose: Symbol.asyncDispose || /* @__PURE__ */ Symbol("Symbol.asyncDispose"),
      TypedArrayPrototypeSet(self2, buf, len) {
        return self2.set(buf, len);
      },
      Boolean,
      Uint8Array
    };
  }
});

// node_modules/readable-stream/lib/ours/util/inspect.js
var require_inspect = __commonJS({
  "node_modules/readable-stream/lib/ours/util/inspect.js"(exports, module) {
    "use strict";
    module.exports = {
      format(format3, ...args) {
        return format3.replace(/%([sdifj])/g, function(...[_unused, type]) {
          const replacement = args.shift();
          if (type === "f") {
            return replacement.toFixed(6);
          } else if (type === "j") {
            return JSON.stringify(replacement);
          } else if (type === "s" && typeof replacement === "object") {
            const ctor = replacement.constructor !== Object ? replacement.constructor.name : "";
            return `${ctor} {}`.trim();
          } else {
            return replacement.toString();
          }
        });
      },
      inspect(value) {
        switch (typeof value) {
          case "string":
            if (value.includes("'")) {
              if (!value.includes('"')) {
                return `"${value}"`;
              } else if (!value.includes("`") && !value.includes("${")) {
                return `\`${value}\``;
              }
            }
            return `'${value}'`;
          case "number":
            if (isNaN(value)) {
              return "NaN";
            } else if (Object.is(value, -0)) {
              return String(value);
            }
            return value;
          case "bigint":
            return `${String(value)}n`;
          case "boolean":
          case "undefined":
            return String(value);
          case "object":
            return "{}";
        }
      }
    };
  }
});

// node_modules/readable-stream/lib/ours/errors.js
var require_errors = __commonJS({
  "node_modules/readable-stream/lib/ours/errors.js"(exports, module) {
    "use strict";
    var { format: format3, inspect } = require_inspect();
    var { AggregateError: CustomAggregateError } = require_primordials();
    var AggregateError = globalThis.AggregateError || CustomAggregateError;
    var kIsNodeError = /* @__PURE__ */ Symbol("kIsNodeError");
    var kTypes = [
      "string",
      "function",
      "number",
      "object",
      // Accept 'Function' and 'Object' as alternative to the lower cased version.
      "Function",
      "Object",
      "boolean",
      "bigint",
      "symbol"
    ];
    var classRegExp = /^([A-Z][a-z0-9]*)+$/;
    var nodeInternalPrefix = "__node_internal_";
    var codes = {};
    function assert(value, message) {
      if (!value) {
        throw new codes.ERR_INTERNAL_ASSERTION(message);
      }
    }
    function addNumericalSeparator(val) {
      let res = "";
      let i = val.length;
      const start = val[0] === "-" ? 1 : 0;
      for (; i >= start + 4; i -= 3) {
        res = `_${val.slice(i - 3, i)}${res}`;
      }
      return `${val.slice(0, i)}${res}`;
    }
    function getMessage(key, msg, args) {
      if (typeof msg === "function") {
        assert(
          msg.length <= args.length,
          // Default options do not count.
          `Code: ${key}; The provided arguments length (${args.length}) does not match the required ones (${msg.length}).`
        );
        return msg(...args);
      }
      const expectedLength = (msg.match(/%[dfijoOs]/g) || []).length;
      assert(
        expectedLength === args.length,
        `Code: ${key}; The provided arguments length (${args.length}) does not match the required ones (${expectedLength}).`
      );
      if (args.length === 0) {
        return msg;
      }
      return format3(msg, ...args);
    }
    function E(code, message, Base) {
      if (!Base) {
        Base = Error;
      }
      class NodeError extends Base {
        constructor(...args) {
          super(getMessage(code, message, args));
        }
        toString() {
          return `${this.name} [${code}]: ${this.message}`;
        }
      }
      Object.defineProperties(NodeError.prototype, {
        name: {
          value: Base.name,
          writable: true,
          enumerable: false,
          configurable: true
        },
        toString: {
          value() {
            return `${this.name} [${code}]: ${this.message}`;
          },
          writable: true,
          enumerable: false,
          configurable: true
        }
      });
      NodeError.prototype.code = code;
      NodeError.prototype[kIsNodeError] = true;
      codes[code] = NodeError;
    }
    function hideStackFrames(fn) {
      const hidden = nodeInternalPrefix + fn.name;
      Object.defineProperty(fn, "name", {
        value: hidden
      });
      return fn;
    }
    function aggregateTwoErrors(innerError, outerError) {
      if (innerError && outerError && innerError !== outerError) {
        if (Array.isArray(outerError.errors)) {
          outerError.errors.push(innerError);
          return outerError;
        }
        const err2 = new AggregateError([outerError, innerError], outerError.message);
        err2.code = outerError.code;
        return err2;
      }
      return innerError || outerError;
    }
    var AbortError = class extends Error {
      constructor(message = "The operation was aborted", options = void 0) {
        if (options !== void 0 && typeof options !== "object") {
          throw new codes.ERR_INVALID_ARG_TYPE("options", "Object", options);
        }
        super(message, options);
        this.code = "ABORT_ERR";
        this.name = "AbortError";
      }
    };
    E("ERR_ASSERTION", "%s", Error);
    E(
      "ERR_INVALID_ARG_TYPE",
      (name, expected, actual) => {
        assert(typeof name === "string", "'name' must be a string");
        if (!Array.isArray(expected)) {
          expected = [expected];
        }
        let msg = "The ";
        if (name.endsWith(" argument")) {
          msg += `${name} `;
        } else {
          msg += `"${name}" ${name.includes(".") ? "property" : "argument"} `;
        }
        msg += "must be ";
        const types4 = [];
        const instances = [];
        const other = [];
        for (const value of expected) {
          assert(typeof value === "string", "All expected entries have to be of type string");
          if (kTypes.includes(value)) {
            types4.push(value.toLowerCase());
          } else if (classRegExp.test(value)) {
            instances.push(value);
          } else {
            assert(value !== "object", 'The value "object" should be written as "Object"');
            other.push(value);
          }
        }
        if (instances.length > 0) {
          const pos = types4.indexOf("object");
          if (pos !== -1) {
            types4.splice(types4, pos, 1);
            instances.push("Object");
          }
        }
        if (types4.length > 0) {
          switch (types4.length) {
            case 1:
              msg += `of type ${types4[0]}`;
              break;
            case 2:
              msg += `one of type ${types4[0]} or ${types4[1]}`;
              break;
            default: {
              const last = types4.pop();
              msg += `one of type ${types4.join(", ")}, or ${last}`;
            }
          }
          if (instances.length > 0 || other.length > 0) {
            msg += " or ";
          }
        }
        if (instances.length > 0) {
          switch (instances.length) {
            case 1:
              msg += `an instance of ${instances[0]}`;
              break;
            case 2:
              msg += `an instance of ${instances[0]} or ${instances[1]}`;
              break;
            default: {
              const last = instances.pop();
              msg += `an instance of ${instances.join(", ")}, or ${last}`;
            }
          }
          if (other.length > 0) {
            msg += " or ";
          }
        }
        switch (other.length) {
          case 0:
            break;
          case 1:
            if (other[0].toLowerCase() !== other[0]) {
              msg += "an ";
            }
            msg += `${other[0]}`;
            break;
          case 2:
            msg += `one of ${other[0]} or ${other[1]}`;
            break;
          default: {
            const last = other.pop();
            msg += `one of ${other.join(", ")}, or ${last}`;
          }
        }
        if (actual == null) {
          msg += `. Received ${actual}`;
        } else if (typeof actual === "function" && actual.name) {
          msg += `. Received function ${actual.name}`;
        } else if (typeof actual === "object") {
          var _actual$constructor;
          if ((_actual$constructor = actual.constructor) !== null && _actual$constructor !== void 0 && _actual$constructor.name) {
            msg += `. Received an instance of ${actual.constructor.name}`;
          } else {
            const inspected = inspect(actual, {
              depth: -1
            });
            msg += `. Received ${inspected}`;
          }
        } else {
          let inspected = inspect(actual, {
            colors: false
          });
          if (inspected.length > 25) {
            inspected = `${inspected.slice(0, 25)}...`;
          }
          msg += `. Received type ${typeof actual} (${inspected})`;
        }
        return msg;
      },
      TypeError
    );
    E(
      "ERR_INVALID_ARG_VALUE",
      (name, value, reason = "is invalid") => {
        let inspected = inspect(value);
        if (inspected.length > 128) {
          inspected = inspected.slice(0, 128) + "...";
        }
        const type = name.includes(".") ? "property" : "argument";
        return `The ${type} '${name}' ${reason}. Received ${inspected}`;
      },
      TypeError
    );
    E(
      "ERR_INVALID_RETURN_VALUE",
      (input, name, value) => {
        var _value$constructor;
        const type = value !== null && value !== void 0 && (_value$constructor = value.constructor) !== null && _value$constructor !== void 0 && _value$constructor.name ? `instance of ${value.constructor.name}` : `type ${typeof value}`;
        return `Expected ${input} to be returned from the "${name}" function but got ${type}.`;
      },
      TypeError
    );
    E(
      "ERR_MISSING_ARGS",
      (...args) => {
        assert(args.length > 0, "At least one arg needs to be specified");
        let msg;
        const len = args.length;
        args = (Array.isArray(args) ? args : [args]).map((a) => `"${a}"`).join(" or ");
        switch (len) {
          case 1:
            msg += `The ${args[0]} argument`;
            break;
          case 2:
            msg += `The ${args[0]} and ${args[1]} arguments`;
            break;
          default:
            {
              const last = args.pop();
              msg += `The ${args.join(", ")}, and ${last} arguments`;
            }
            break;
        }
        return `${msg} must be specified`;
      },
      TypeError
    );
    E(
      "ERR_OUT_OF_RANGE",
      (str, range, input) => {
        assert(range, 'Missing "range" argument');
        let received;
        if (Number.isInteger(input) && Math.abs(input) > 2 ** 32) {
          received = addNumericalSeparator(String(input));
        } else if (typeof input === "bigint") {
          received = String(input);
          const limit = BigInt(2) ** BigInt(32);
          if (input > limit || input < -limit) {
            received = addNumericalSeparator(received);
          }
          received += "n";
        } else {
          received = inspect(input);
        }
        return `The value of "${str}" is out of range. It must be ${range}. Received ${received}`;
      },
      RangeError
    );
    E("ERR_MULTIPLE_CALLBACK", "Callback called multiple times", Error);
    E("ERR_METHOD_NOT_IMPLEMENTED", "The %s method is not implemented", Error);
    E("ERR_STREAM_ALREADY_FINISHED", "Cannot call %s after a stream was finished", Error);
    E("ERR_STREAM_CANNOT_PIPE", "Cannot pipe, not readable", Error);
    E("ERR_STREAM_DESTROYED", "Cannot call %s after a stream was destroyed", Error);
    E("ERR_STREAM_NULL_VALUES", "May not write null values to stream", TypeError);
    E("ERR_STREAM_PREMATURE_CLOSE", "Premature close", Error);
    E("ERR_STREAM_PUSH_AFTER_EOF", "stream.push() after EOF", Error);
    E("ERR_STREAM_UNSHIFT_AFTER_END_EVENT", "stream.unshift() after end event", Error);
    E("ERR_STREAM_WRITE_AFTER_END", "write after end", Error);
    E("ERR_UNKNOWN_ENCODING", "Unknown encoding: %s", TypeError);
    module.exports = {
      AbortError,
      aggregateTwoErrors: hideStackFrames(aggregateTwoErrors),
      hideStackFrames,
      codes
    };
  }
});

// node_modules/abort-controller/browser.js
var require_browser = __commonJS({
  "node_modules/abort-controller/browser.js"(exports, module) {
    "use strict";
    var { AbortController, AbortSignal } = typeof self !== "undefined" ? self : typeof window !== "undefined" ? window : (
      /* otherwise */
      void 0
    );
    module.exports = AbortController;
    module.exports.AbortSignal = AbortSignal;
    module.exports.default = AbortController;
  }
});

// node_modules/events/events.js
var require_events = __commonJS({
  "node_modules/events/events.js"(exports, module) {
    "use strict";
    var R = typeof Reflect === "object" ? Reflect : null;
    var ReflectApply = R && typeof R.apply === "function" ? R.apply : function ReflectApply2(target, receiver, args) {
      return Function.prototype.apply.call(target, receiver, args);
    };
    var ReflectOwnKeys;
    if (R && typeof R.ownKeys === "function") {
      ReflectOwnKeys = R.ownKeys;
    } else if (Object.getOwnPropertySymbols) {
      ReflectOwnKeys = function ReflectOwnKeys2(target) {
        return Object.getOwnPropertyNames(target).concat(Object.getOwnPropertySymbols(target));
      };
    } else {
      ReflectOwnKeys = function ReflectOwnKeys2(target) {
        return Object.getOwnPropertyNames(target);
      };
    }
    function ProcessEmitWarning(warning) {
      if (console && console.warn) console.warn(warning);
    }
    var NumberIsNaN = Number.isNaN || function NumberIsNaN2(value) {
      return value !== value;
    };
    function EventEmitter2() {
      EventEmitter2.init.call(this);
    }
    module.exports = EventEmitter2;
    module.exports.once = once;
    EventEmitter2.EventEmitter = EventEmitter2;
    EventEmitter2.prototype._events = void 0;
    EventEmitter2.prototype._eventsCount = 0;
    EventEmitter2.prototype._maxListeners = void 0;
    var defaultMaxListeners = 10;
    function checkListener(listener) {
      if (typeof listener !== "function") {
        throw new TypeError('The "listener" argument must be of type Function. Received type ' + typeof listener);
      }
    }
    Object.defineProperty(EventEmitter2, "defaultMaxListeners", {
      enumerable: true,
      get: function() {
        return defaultMaxListeners;
      },
      set: function(arg) {
        if (typeof arg !== "number" || arg < 0 || NumberIsNaN(arg)) {
          throw new RangeError('The value of "defaultMaxListeners" is out of range. It must be a non-negative number. Received ' + arg + ".");
        }
        defaultMaxListeners = arg;
      }
    });
    EventEmitter2.init = function() {
      if (this._events === void 0 || this._events === Object.getPrototypeOf(this)._events) {
        this._events = /* @__PURE__ */ Object.create(null);
        this._eventsCount = 0;
      }
      this._maxListeners = this._maxListeners || void 0;
    };
    EventEmitter2.prototype.setMaxListeners = function setMaxListeners(n) {
      if (typeof n !== "number" || n < 0 || NumberIsNaN(n)) {
        throw new RangeError('The value of "n" is out of range. It must be a non-negative number. Received ' + n + ".");
      }
      this._maxListeners = n;
      return this;
    };
    function _getMaxListeners(that) {
      if (that._maxListeners === void 0)
        return EventEmitter2.defaultMaxListeners;
      return that._maxListeners;
    }
    EventEmitter2.prototype.getMaxListeners = function getMaxListeners() {
      return _getMaxListeners(this);
    };
    EventEmitter2.prototype.emit = function emit(type) {
      var args = [];
      for (var i = 1; i < arguments.length; i++) args.push(arguments[i]);
      var doError = type === "error";
      var events = this._events;
      if (events !== void 0)
        doError = doError && events.error === void 0;
      else if (!doError)
        return false;
      if (doError) {
        var er;
        if (args.length > 0)
          er = args[0];
        if (er instanceof Error) {
          throw er;
        }
        var err2 = new Error("Unhandled error." + (er ? " (" + er.message + ")" : ""));
        err2.context = er;
        throw err2;
      }
      var handler = events[type];
      if (handler === void 0)
        return false;
      if (typeof handler === "function") {
        ReflectApply(handler, this, args);
      } else {
        var len = handler.length;
        var listeners = arrayClone(handler, len);
        for (var i = 0; i < len; ++i)
          ReflectApply(listeners[i], this, args);
      }
      return true;
    };
    function _addListener(target, type, listener, prepend) {
      var m;
      var events;
      var existing;
      checkListener(listener);
      events = target._events;
      if (events === void 0) {
        events = target._events = /* @__PURE__ */ Object.create(null);
        target._eventsCount = 0;
      } else {
        if (events.newListener !== void 0) {
          target.emit(
            "newListener",
            type,
            listener.listener ? listener.listener : listener
          );
          events = target._events;
        }
        existing = events[type];
      }
      if (existing === void 0) {
        existing = events[type] = listener;
        ++target._eventsCount;
      } else {
        if (typeof existing === "function") {
          existing = events[type] = prepend ? [listener, existing] : [existing, listener];
        } else if (prepend) {
          existing.unshift(listener);
        } else {
          existing.push(listener);
        }
        m = _getMaxListeners(target);
        if (m > 0 && existing.length > m && !existing.warned) {
          existing.warned = true;
          var w = new Error("Possible EventEmitter memory leak detected. " + existing.length + " " + String(type) + " listeners added. Use emitter.setMaxListeners() to increase limit");
          w.name = "MaxListenersExceededWarning";
          w.emitter = target;
          w.type = type;
          w.count = existing.length;
          ProcessEmitWarning(w);
        }
      }
      return target;
    }
    EventEmitter2.prototype.addListener = function addListener(type, listener) {
      return _addListener(this, type, listener, false);
    };
    EventEmitter2.prototype.on = EventEmitter2.prototype.addListener;
    EventEmitter2.prototype.prependListener = function prependListener(type, listener) {
      return _addListener(this, type, listener, true);
    };
    function onceWrapper() {
      if (!this.fired) {
        this.target.removeListener(this.type, this.wrapFn);
        this.fired = true;
        if (arguments.length === 0)
          return this.listener.call(this.target);
        return this.listener.apply(this.target, arguments);
      }
    }
    function _onceWrap(target, type, listener) {
      var state = { fired: false, wrapFn: void 0, target, type, listener };
      var wrapped = onceWrapper.bind(state);
      wrapped.listener = listener;
      state.wrapFn = wrapped;
      return wrapped;
    }
    EventEmitter2.prototype.once = function once2(type, listener) {
      checkListener(listener);
      this.on(type, _onceWrap(this, type, listener));
      return this;
    };
    EventEmitter2.prototype.prependOnceListener = function prependOnceListener(type, listener) {
      checkListener(listener);
      this.prependListener(type, _onceWrap(this, type, listener));
      return this;
    };
    EventEmitter2.prototype.removeListener = function removeListener(type, listener) {
      var list2, events, position, i, originalListener;
      checkListener(listener);
      events = this._events;
      if (events === void 0)
        return this;
      list2 = events[type];
      if (list2 === void 0)
        return this;
      if (list2 === listener || list2.listener === listener) {
        if (--this._eventsCount === 0)
          this._events = /* @__PURE__ */ Object.create(null);
        else {
          delete events[type];
          if (events.removeListener)
            this.emit("removeListener", type, list2.listener || listener);
        }
      } else if (typeof list2 !== "function") {
        position = -1;
        for (i = list2.length - 1; i >= 0; i--) {
          if (list2[i] === listener || list2[i].listener === listener) {
            originalListener = list2[i].listener;
            position = i;
            break;
          }
        }
        if (position < 0)
          return this;
        if (position === 0)
          list2.shift();
        else {
          spliceOne(list2, position);
        }
        if (list2.length === 1)
          events[type] = list2[0];
        if (events.removeListener !== void 0)
          this.emit("removeListener", type, originalListener || listener);
      }
      return this;
    };
    EventEmitter2.prototype.off = EventEmitter2.prototype.removeListener;
    EventEmitter2.prototype.removeAllListeners = function removeAllListeners(type) {
      var listeners, events, i;
      events = this._events;
      if (events === void 0)
        return this;
      if (events.removeListener === void 0) {
        if (arguments.length === 0) {
          this._events = /* @__PURE__ */ Object.create(null);
          this._eventsCount = 0;
        } else if (events[type] !== void 0) {
          if (--this._eventsCount === 0)
            this._events = /* @__PURE__ */ Object.create(null);
          else
            delete events[type];
        }
        return this;
      }
      if (arguments.length === 0) {
        var keys = Object.keys(events);
        var key;
        for (i = 0; i < keys.length; ++i) {
          key = keys[i];
          if (key === "removeListener") continue;
          this.removeAllListeners(key);
        }
        this.removeAllListeners("removeListener");
        this._events = /* @__PURE__ */ Object.create(null);
        this._eventsCount = 0;
        return this;
      }
      listeners = events[type];
      if (typeof listeners === "function") {
        this.removeListener(type, listeners);
      } else if (listeners !== void 0) {
        for (i = listeners.length - 1; i >= 0; i--) {
          this.removeListener(type, listeners[i]);
        }
      }
      return this;
    };
    function _listeners(target, type, unwrap) {
      var events = target._events;
      if (events === void 0)
        return [];
      var evlistener = events[type];
      if (evlistener === void 0)
        return [];
      if (typeof evlistener === "function")
        return unwrap ? [evlistener.listener || evlistener] : [evlistener];
      return unwrap ? unwrapListeners(evlistener) : arrayClone(evlistener, evlistener.length);
    }
    EventEmitter2.prototype.listeners = function listeners(type) {
      return _listeners(this, type, true);
    };
    EventEmitter2.prototype.rawListeners = function rawListeners(type) {
      return _listeners(this, type, false);
    };
    EventEmitter2.listenerCount = function(emitter, type) {
      if (typeof emitter.listenerCount === "function") {
        return emitter.listenerCount(type);
      } else {
        return listenerCount.call(emitter, type);
      }
    };
    EventEmitter2.prototype.listenerCount = listenerCount;
    function listenerCount(type) {
      var events = this._events;
      if (events !== void 0) {
        var evlistener = events[type];
        if (typeof evlistener === "function") {
          return 1;
        } else if (evlistener !== void 0) {
          return evlistener.length;
        }
      }
      return 0;
    }
    EventEmitter2.prototype.eventNames = function eventNames() {
      return this._eventsCount > 0 ? ReflectOwnKeys(this._events) : [];
    };
    function arrayClone(arr, n) {
      var copy = new Array(n);
      for (var i = 0; i < n; ++i)
        copy[i] = arr[i];
      return copy;
    }
    function spliceOne(list2, index) {
      for (; index + 1 < list2.length; index++)
        list2[index] = list2[index + 1];
      list2.pop();
    }
    function unwrapListeners(arr) {
      var ret = new Array(arr.length);
      for (var i = 0; i < ret.length; ++i) {
        ret[i] = arr[i].listener || arr[i];
      }
      return ret;
    }
    function once(emitter, name) {
      return new Promise(function(resolve4, reject) {
        function errorListener(err2) {
          emitter.removeListener(name, resolver);
          reject(err2);
        }
        function resolver() {
          if (typeof emitter.removeListener === "function") {
            emitter.removeListener("error", errorListener);
          }
          resolve4([].slice.call(arguments));
        }
        ;
        eventTargetAgnosticAddListener(emitter, name, resolver, { once: true });
        if (name !== "error") {
          addErrorHandlerIfEventEmitter(emitter, errorListener, { once: true });
        }
      });
    }
    function addErrorHandlerIfEventEmitter(emitter, handler, flags) {
      if (typeof emitter.on === "function") {
        eventTargetAgnosticAddListener(emitter, "error", handler, flags);
      }
    }
    function eventTargetAgnosticAddListener(emitter, name, listener, flags) {
      if (typeof emitter.on === "function") {
        if (flags.once) {
          emitter.once(name, listener);
        } else {
          emitter.on(name, listener);
        }
      } else if (typeof emitter.addEventListener === "function") {
        emitter.addEventListener(name, function wrapListener(arg) {
          if (flags.once) {
            emitter.removeEventListener(name, wrapListener);
          }
          listener(arg);
        });
      } else {
        throw new TypeError('The "emitter" argument must be of type EventEmitter. Received type ' + typeof emitter);
      }
    }
  }
});

// node_modules/readable-stream/lib/ours/util.js
var require_util = __commonJS({
  "node_modules/readable-stream/lib/ours/util.js"(exports, module) {
    "use strict";
    var bufferModule = require_buffer();
    var { format: format3, inspect } = require_inspect();
    var {
      codes: { ERR_INVALID_ARG_TYPE }
    } = require_errors();
    var { kResistStopPropagation, AggregateError, SymbolDispose } = require_primordials();
    var AbortSignal = globalThis.AbortSignal || require_browser().AbortSignal;
    var AbortController = globalThis.AbortController || require_browser().AbortController;
    var AsyncFunction = Object.getPrototypeOf(async function() {
    }).constructor;
    var Blob2 = globalThis.Blob || bufferModule.Blob;
    var isBlob = typeof Blob2 !== "undefined" ? function isBlob2(b) {
      return b instanceof Blob2;
    } : function isBlob2(b) {
      return false;
    };
    var validateAbortSignal = (signal, name) => {
      if (signal !== void 0 && (signal === null || typeof signal !== "object" || !("aborted" in signal))) {
        throw new ERR_INVALID_ARG_TYPE(name, "AbortSignal", signal);
      }
    };
    var validateFunction = (value, name) => {
      if (typeof value !== "function") {
        throw new ERR_INVALID_ARG_TYPE(name, "Function", value);
      }
    };
    module.exports = {
      AggregateError,
      kEmptyObject: Object.freeze({}),
      once(callback) {
        let called = false;
        return function(...args) {
          if (called) {
            return;
          }
          called = true;
          callback.apply(this, args);
        };
      },
      createDeferredPromise: function() {
        let resolve4;
        let reject;
        const promise = new Promise((res, rej) => {
          resolve4 = res;
          reject = rej;
        });
        return {
          promise,
          resolve: resolve4,
          reject
        };
      },
      promisify(fn) {
        return new Promise((resolve4, reject) => {
          fn((err2, ...args) => {
            if (err2) {
              return reject(err2);
            }
            return resolve4(...args);
          });
        });
      },
      debuglog() {
        return function() {
        };
      },
      format: format3,
      inspect,
      types: {
        isAsyncFunction(fn) {
          return fn instanceof AsyncFunction;
        },
        isArrayBufferView(arr) {
          return ArrayBuffer.isView(arr);
        }
      },
      isBlob,
      deprecate(fn, message) {
        return fn;
      },
      addAbortListener: require_events().addAbortListener || function addAbortListener(signal, listener) {
        if (signal === void 0) {
          throw new ERR_INVALID_ARG_TYPE("signal", "AbortSignal", signal);
        }
        validateAbortSignal(signal, "signal");
        validateFunction(listener, "listener");
        let removeEventListener;
        if (signal.aborted) {
          queueMicrotask(() => listener());
        } else {
          signal.addEventListener("abort", listener, {
            __proto__: null,
            once: true,
            [kResistStopPropagation]: true
          });
          removeEventListener = () => {
            signal.removeEventListener("abort", listener);
          };
        }
        return {
          __proto__: null,
          [SymbolDispose]() {
            var _removeEventListener;
            (_removeEventListener = removeEventListener) === null || _removeEventListener === void 0 ? void 0 : _removeEventListener();
          }
        };
      },
      AbortSignalAny: AbortSignal.any || function AbortSignalAny(signals) {
        if (signals.length === 1) {
          return signals[0];
        }
        const ac = new AbortController();
        const abort = () => ac.abort();
        signals.forEach((signal) => {
          validateAbortSignal(signal, "signals");
          signal.addEventListener("abort", abort, {
            once: true
          });
        });
        ac.signal.addEventListener(
          "abort",
          () => {
            signals.forEach((signal) => signal.removeEventListener("abort", abort));
          },
          {
            once: true
          }
        );
        return ac.signal;
      }
    };
    module.exports.promisify.custom = /* @__PURE__ */ Symbol.for("nodejs.util.promisify.custom");
  }
});

// node_modules/readable-stream/lib/internal/validators.js
var require_validators = __commonJS({
  "node_modules/readable-stream/lib/internal/validators.js"(exports, module) {
    "use strict";
    var {
      ArrayIsArray,
      ArrayPrototypeIncludes,
      ArrayPrototypeJoin,
      ArrayPrototypeMap,
      NumberIsInteger,
      NumberIsNaN,
      NumberMAX_SAFE_INTEGER,
      NumberMIN_SAFE_INTEGER,
      NumberParseInt,
      ObjectPrototypeHasOwnProperty,
      RegExpPrototypeExec,
      String: String2,
      StringPrototypeToUpperCase,
      StringPrototypeTrim
    } = require_primordials();
    var {
      hideStackFrames,
      codes: { ERR_SOCKET_BAD_PORT, ERR_INVALID_ARG_TYPE, ERR_INVALID_ARG_VALUE, ERR_OUT_OF_RANGE, ERR_UNKNOWN_SIGNAL }
    } = require_errors();
    var { normalizeEncoding } = require_util();
    var { isAsyncFunction, isArrayBufferView } = require_util().types;
    var signals = {};
    function isInt32(value) {
      return value === (value | 0);
    }
    function isUint32(value) {
      return value === value >>> 0;
    }
    var octalReg = /^[0-7]+$/;
    var modeDesc = "must be a 32-bit unsigned integer or an octal string";
    function parseFileMode(value, name, def) {
      if (typeof value === "undefined") {
        value = def;
      }
      if (typeof value === "string") {
        if (RegExpPrototypeExec(octalReg, value) === null) {
          throw new ERR_INVALID_ARG_VALUE(name, value, modeDesc);
        }
        value = NumberParseInt(value, 8);
      }
      validateUint322(value, name);
      return value;
    }
    var validateInteger = hideStackFrames((value, name, min = NumberMIN_SAFE_INTEGER, max = NumberMAX_SAFE_INTEGER) => {
      if (typeof value !== "number") throw new ERR_INVALID_ARG_TYPE(name, "number", value);
      if (!NumberIsInteger(value)) throw new ERR_OUT_OF_RANGE(name, "an integer", value);
      if (value < min || value > max) throw new ERR_OUT_OF_RANGE(name, `>= ${min} && <= ${max}`, value);
    });
    var validateInt32 = hideStackFrames((value, name, min = -2147483648, max = 2147483647) => {
      if (typeof value !== "number") {
        throw new ERR_INVALID_ARG_TYPE(name, "number", value);
      }
      if (!NumberIsInteger(value)) {
        throw new ERR_OUT_OF_RANGE(name, "an integer", value);
      }
      if (value < min || value > max) {
        throw new ERR_OUT_OF_RANGE(name, `>= ${min} && <= ${max}`, value);
      }
    });
    var validateUint322 = hideStackFrames((value, name, positive = false) => {
      if (typeof value !== "number") {
        throw new ERR_INVALID_ARG_TYPE(name, "number", value);
      }
      if (!NumberIsInteger(value)) {
        throw new ERR_OUT_OF_RANGE(name, "an integer", value);
      }
      const min = positive ? 1 : 0;
      const max = 4294967295;
      if (value < min || value > max) {
        throw new ERR_OUT_OF_RANGE(name, `>= ${min} && <= ${max}`, value);
      }
    });
    function validateString(value, name) {
      if (typeof value !== "string") throw new ERR_INVALID_ARG_TYPE(name, "string", value);
    }
    function validateNumber(value, name, min = void 0, max) {
      if (typeof value !== "number") throw new ERR_INVALID_ARG_TYPE(name, "number", value);
      if (min != null && value < min || max != null && value > max || (min != null || max != null) && NumberIsNaN(value)) {
        throw new ERR_OUT_OF_RANGE(
          name,
          `${min != null ? `>= ${min}` : ""}${min != null && max != null ? " && " : ""}${max != null ? `<= ${max}` : ""}`,
          value
        );
      }
    }
    var validateOneOf = hideStackFrames((value, name, oneOf) => {
      if (!ArrayPrototypeIncludes(oneOf, value)) {
        const allowed = ArrayPrototypeJoin(
          ArrayPrototypeMap(oneOf, (v) => typeof v === "string" ? `'${v}'` : String2(v)),
          ", "
        );
        const reason = "must be one of: " + allowed;
        throw new ERR_INVALID_ARG_VALUE(name, value, reason);
      }
    });
    function validateBoolean(value, name) {
      if (typeof value !== "boolean") throw new ERR_INVALID_ARG_TYPE(name, "boolean", value);
    }
    function getOwnPropertyValueOrDefault(options, key, defaultValue) {
      return options == null || !ObjectPrototypeHasOwnProperty(options, key) ? defaultValue : options[key];
    }
    var validateObject = hideStackFrames((value, name, options = null) => {
      const allowArray = getOwnPropertyValueOrDefault(options, "allowArray", false);
      const allowFunction = getOwnPropertyValueOrDefault(options, "allowFunction", false);
      const nullable = getOwnPropertyValueOrDefault(options, "nullable", false);
      if (!nullable && value === null || !allowArray && ArrayIsArray(value) || typeof value !== "object" && (!allowFunction || typeof value !== "function")) {
        throw new ERR_INVALID_ARG_TYPE(name, "Object", value);
      }
    });
    var validateDictionary = hideStackFrames((value, name) => {
      if (value != null && typeof value !== "object" && typeof value !== "function") {
        throw new ERR_INVALID_ARG_TYPE(name, "a dictionary", value);
      }
    });
    var validateArray = hideStackFrames((value, name, minLength = 0) => {
      if (!ArrayIsArray(value)) {
        throw new ERR_INVALID_ARG_TYPE(name, "Array", value);
      }
      if (value.length < minLength) {
        const reason = `must be longer than ${minLength}`;
        throw new ERR_INVALID_ARG_VALUE(name, value, reason);
      }
    });
    function validateStringArray(value, name) {
      validateArray(value, name);
      for (let i = 0; i < value.length; i++) {
        validateString(value[i], `${name}[${i}]`);
      }
    }
    function validateBooleanArray(value, name) {
      validateArray(value, name);
      for (let i = 0; i < value.length; i++) {
        validateBoolean(value[i], `${name}[${i}]`);
      }
    }
    function validateAbortSignalArray(value, name) {
      validateArray(value, name);
      for (let i = 0; i < value.length; i++) {
        const signal = value[i];
        const indexedName = `${name}[${i}]`;
        if (signal == null) {
          throw new ERR_INVALID_ARG_TYPE(indexedName, "AbortSignal", signal);
        }
        validateAbortSignal(signal, indexedName);
      }
    }
    function validateSignalName(signal, name = "signal") {
      validateString(signal, name);
      if (signals[signal] === void 0) {
        if (signals[StringPrototypeToUpperCase(signal)] !== void 0) {
          throw new ERR_UNKNOWN_SIGNAL(signal + " (signals must use all capital letters)");
        }
        throw new ERR_UNKNOWN_SIGNAL(signal);
      }
    }
    var validateBuffer = hideStackFrames((buffer, name = "buffer") => {
      if (!isArrayBufferView(buffer)) {
        throw new ERR_INVALID_ARG_TYPE(name, ["Buffer", "TypedArray", "DataView"], buffer);
      }
    });
    function validateEncoding(data, encoding) {
      const normalizedEncoding = normalizeEncoding(encoding);
      const length = data.length;
      if (normalizedEncoding === "hex" && length % 2 !== 0) {
        throw new ERR_INVALID_ARG_VALUE("encoding", encoding, `is invalid for data of length ${length}`);
      }
    }
    function validatePort(port, name = "Port", allowZero = true) {
      if (typeof port !== "number" && typeof port !== "string" || typeof port === "string" && StringPrototypeTrim(port).length === 0 || +port !== +port >>> 0 || port > 65535 || port === 0 && !allowZero) {
        throw new ERR_SOCKET_BAD_PORT(name, port, allowZero);
      }
      return port | 0;
    }
    var validateAbortSignal = hideStackFrames((signal, name) => {
      if (signal !== void 0 && (signal === null || typeof signal !== "object" || !("aborted" in signal))) {
        throw new ERR_INVALID_ARG_TYPE(name, "AbortSignal", signal);
      }
    });
    var validateFunction = hideStackFrames((value, name) => {
      if (typeof value !== "function") throw new ERR_INVALID_ARG_TYPE(name, "Function", value);
    });
    var validatePlainFunction = hideStackFrames((value, name) => {
      if (typeof value !== "function" || isAsyncFunction(value)) throw new ERR_INVALID_ARG_TYPE(name, "Function", value);
    });
    var validateUndefined = hideStackFrames((value, name) => {
      if (value !== void 0) throw new ERR_INVALID_ARG_TYPE(name, "undefined", value);
    });
    function validateUnion(value, name, union) {
      if (!ArrayPrototypeIncludes(union, value)) {
        throw new ERR_INVALID_ARG_TYPE(name, `('${ArrayPrototypeJoin(union, "|")}')`, value);
      }
    }
    var linkValueRegExp = /^(?:<[^>]*>)(?:\s*;\s*[^;"\s]+(?:=(")?[^;"\s]*\1)?)*$/;
    function validateLinkHeaderFormat(value, name) {
      if (typeof value === "undefined" || !RegExpPrototypeExec(linkValueRegExp, value)) {
        throw new ERR_INVALID_ARG_VALUE(
          name,
          value,
          'must be an array or string of format "</styles.css>; rel=preload; as=style"'
        );
      }
    }
    function validateLinkHeaderValue(hints) {
      if (typeof hints === "string") {
        validateLinkHeaderFormat(hints, "hints");
        return hints;
      } else if (ArrayIsArray(hints)) {
        const hintsLength = hints.length;
        let result = "";
        if (hintsLength === 0) {
          return result;
        }
        for (let i = 0; i < hintsLength; i++) {
          const link5 = hints[i];
          validateLinkHeaderFormat(link5, "hints");
          result += link5;
          if (i !== hintsLength - 1) {
            result += ", ";
          }
        }
        return result;
      }
      throw new ERR_INVALID_ARG_VALUE(
        "hints",
        hints,
        'must be an array or string of format "</styles.css>; rel=preload; as=style"'
      );
    }
    module.exports = {
      isInt32,
      isUint32,
      parseFileMode,
      validateArray,
      validateStringArray,
      validateBooleanArray,
      validateAbortSignalArray,
      validateBoolean,
      validateBuffer,
      validateDictionary,
      validateEncoding,
      validateFunction,
      validateInt32,
      validateInteger,
      validateNumber,
      validateObject,
      validateOneOf,
      validatePlainFunction,
      validatePort,
      validateSignalName,
      validateString,
      validateUint32: validateUint322,
      validateUndefined,
      validateUnion,
      validateAbortSignal,
      validateLinkHeaderValue
    };
  }
});

// node_modules/process/browser.js
var require_browser2 = __commonJS({
  "node_modules/process/browser.js"(exports, module) {
    var process = module.exports = {};
    var cachedSetTimeout;
    var cachedClearTimeout;
    function defaultSetTimout() {
      throw new Error("setTimeout has not been defined");
    }
    function defaultClearTimeout() {
      throw new Error("clearTimeout has not been defined");
    }
    (function() {
      try {
        if (typeof setTimeout === "function") {
          cachedSetTimeout = setTimeout;
        } else {
          cachedSetTimeout = defaultSetTimout;
        }
      } catch (e) {
        cachedSetTimeout = defaultSetTimout;
      }
      try {
        if (typeof clearTimeout === "function") {
          cachedClearTimeout = clearTimeout;
        } else {
          cachedClearTimeout = defaultClearTimeout;
        }
      } catch (e) {
        cachedClearTimeout = defaultClearTimeout;
      }
    })();
    function runTimeout(fun) {
      if (cachedSetTimeout === setTimeout) {
        return setTimeout(fun, 0);
      }
      if ((cachedSetTimeout === defaultSetTimout || !cachedSetTimeout) && setTimeout) {
        cachedSetTimeout = setTimeout;
        return setTimeout(fun, 0);
      }
      try {
        return cachedSetTimeout(fun, 0);
      } catch (e) {
        try {
          return cachedSetTimeout.call(null, fun, 0);
        } catch (e2) {
          return cachedSetTimeout.call(this, fun, 0);
        }
      }
    }
    function runClearTimeout(marker) {
      if (cachedClearTimeout === clearTimeout) {
        return clearTimeout(marker);
      }
      if ((cachedClearTimeout === defaultClearTimeout || !cachedClearTimeout) && clearTimeout) {
        cachedClearTimeout = clearTimeout;
        return clearTimeout(marker);
      }
      try {
        return cachedClearTimeout(marker);
      } catch (e) {
        try {
          return cachedClearTimeout.call(null, marker);
        } catch (e2) {
          return cachedClearTimeout.call(this, marker);
        }
      }
    }
    var queue = [];
    var draining = false;
    var currentQueue;
    var queueIndex = -1;
    function cleanUpNextTick() {
      if (!draining || !currentQueue) {
        return;
      }
      draining = false;
      if (currentQueue.length) {
        queue = currentQueue.concat(queue);
      } else {
        queueIndex = -1;
      }
      if (queue.length) {
        drainQueue();
      }
    }
    function drainQueue() {
      if (draining) {
        return;
      }
      var timeout = runTimeout(cleanUpNextTick);
      draining = true;
      var len = queue.length;
      while (len) {
        currentQueue = queue;
        queue = [];
        while (++queueIndex < len) {
          if (currentQueue) {
            currentQueue[queueIndex].run();
          }
        }
        queueIndex = -1;
        len = queue.length;
      }
      currentQueue = null;
      draining = false;
      runClearTimeout(timeout);
    }
    process.nextTick = function(fun) {
      var args = new Array(arguments.length - 1);
      if (arguments.length > 1) {
        for (var i = 1; i < arguments.length; i++) {
          args[i - 1] = arguments[i];
        }
      }
      queue.push(new Item(fun, args));
      if (queue.length === 1 && !draining) {
        runTimeout(drainQueue);
      }
    };
    function Item(fun, array2) {
      this.fun = fun;
      this.array = array2;
    }
    Item.prototype.run = function() {
      this.fun.apply(null, this.array);
    };
    process.title = "browser";
    process.browser = true;
    process.env = {};
    process.argv = [];
    process.version = "";
    process.versions = {};
    function noop() {
    }
    process.on = noop;
    process.addListener = noop;
    process.once = noop;
    process.off = noop;
    process.removeListener = noop;
    process.removeAllListeners = noop;
    process.emit = noop;
    process.prependListener = noop;
    process.prependOnceListener = noop;
    process.listeners = function(name) {
      return [];
    };
    process.binding = function(name) {
      throw new Error("process.binding is not supported");
    };
    process.cwd = function() {
      return "/";
    };
    process.chdir = function(dir) {
      throw new Error("process.chdir is not supported");
    };
    process.umask = function() {
      return 0;
    };
  }
});

// node_modules/readable-stream/lib/internal/streams/utils.js
var require_utils = __commonJS({
  "node_modules/readable-stream/lib/internal/streams/utils.js"(exports, module) {
    "use strict";
    var { SymbolAsyncIterator, SymbolIterator, SymbolFor } = require_primordials();
    var kIsDestroyed = SymbolFor("nodejs.stream.destroyed");
    var kIsErrored = SymbolFor("nodejs.stream.errored");
    var kIsReadable = SymbolFor("nodejs.stream.readable");
    var kIsWritable = SymbolFor("nodejs.stream.writable");
    var kIsDisturbed = SymbolFor("nodejs.stream.disturbed");
    var kIsClosedPromise = SymbolFor("nodejs.webstream.isClosedPromise");
    var kControllerErrorFunction = SymbolFor("nodejs.webstream.controllerErrorFunction");
    function isReadableNodeStream(obj, strict = false) {
      var _obj$_readableState;
      return !!(obj && typeof obj.pipe === "function" && typeof obj.on === "function" && (!strict || typeof obj.pause === "function" && typeof obj.resume === "function") && (!obj._writableState || ((_obj$_readableState = obj._readableState) === null || _obj$_readableState === void 0 ? void 0 : _obj$_readableState.readable) !== false) && // Duplex
      (!obj._writableState || obj._readableState));
    }
    function isWritableNodeStream(obj) {
      var _obj$_writableState;
      return !!(obj && typeof obj.write === "function" && typeof obj.on === "function" && (!obj._readableState || ((_obj$_writableState = obj._writableState) === null || _obj$_writableState === void 0 ? void 0 : _obj$_writableState.writable) !== false));
    }
    function isDuplexNodeStream(obj) {
      return !!(obj && typeof obj.pipe === "function" && obj._readableState && typeof obj.on === "function" && typeof obj.write === "function");
    }
    function isNodeStream(obj) {
      return obj && (obj._readableState || obj._writableState || typeof obj.write === "function" && typeof obj.on === "function" || typeof obj.pipe === "function" && typeof obj.on === "function");
    }
    function isReadableStream(obj) {
      return !!(obj && !isNodeStream(obj) && typeof obj.pipeThrough === "function" && typeof obj.getReader === "function" && typeof obj.cancel === "function");
    }
    function isWritableStream(obj) {
      return !!(obj && !isNodeStream(obj) && typeof obj.getWriter === "function" && typeof obj.abort === "function");
    }
    function isTransformStream(obj) {
      return !!(obj && !isNodeStream(obj) && typeof obj.readable === "object" && typeof obj.writable === "object");
    }
    function isWebStream(obj) {
      return isReadableStream(obj) || isWritableStream(obj) || isTransformStream(obj);
    }
    function isIterable(obj, isAsync) {
      if (obj == null) return false;
      if (isAsync === true) return typeof obj[SymbolAsyncIterator] === "function";
      if (isAsync === false) return typeof obj[SymbolIterator] === "function";
      return typeof obj[SymbolAsyncIterator] === "function" || typeof obj[SymbolIterator] === "function";
    }
    function isDestroyed(stream) {
      if (!isNodeStream(stream)) return null;
      const wState = stream._writableState;
      const rState = stream._readableState;
      const state = wState || rState;
      return !!(stream.destroyed || stream[kIsDestroyed] || state !== null && state !== void 0 && state.destroyed);
    }
    function isWritableEnded(stream) {
      if (!isWritableNodeStream(stream)) return null;
      if (stream.writableEnded === true) return true;
      const wState = stream._writableState;
      if (wState !== null && wState !== void 0 && wState.errored) return false;
      if (typeof (wState === null || wState === void 0 ? void 0 : wState.ended) !== "boolean") return null;
      return wState.ended;
    }
    function isWritableFinished(stream, strict) {
      if (!isWritableNodeStream(stream)) return null;
      if (stream.writableFinished === true) return true;
      const wState = stream._writableState;
      if (wState !== null && wState !== void 0 && wState.errored) return false;
      if (typeof (wState === null || wState === void 0 ? void 0 : wState.finished) !== "boolean") return null;
      return !!(wState.finished || strict === false && wState.ended === true && wState.length === 0);
    }
    function isReadableEnded(stream) {
      if (!isReadableNodeStream(stream)) return null;
      if (stream.readableEnded === true) return true;
      const rState = stream._readableState;
      if (!rState || rState.errored) return false;
      if (typeof (rState === null || rState === void 0 ? void 0 : rState.ended) !== "boolean") return null;
      return rState.ended;
    }
    function isReadableFinished(stream, strict) {
      if (!isReadableNodeStream(stream)) return null;
      const rState = stream._readableState;
      if (rState !== null && rState !== void 0 && rState.errored) return false;
      if (typeof (rState === null || rState === void 0 ? void 0 : rState.endEmitted) !== "boolean") return null;
      return !!(rState.endEmitted || strict === false && rState.ended === true && rState.length === 0);
    }
    function isReadable(stream) {
      if (stream && stream[kIsReadable] != null) return stream[kIsReadable];
      if (typeof (stream === null || stream === void 0 ? void 0 : stream.readable) !== "boolean") return null;
      if (isDestroyed(stream)) return false;
      return isReadableNodeStream(stream) && stream.readable && !isReadableFinished(stream);
    }
    function isWritable(stream) {
      if (stream && stream[kIsWritable] != null) return stream[kIsWritable];
      if (typeof (stream === null || stream === void 0 ? void 0 : stream.writable) !== "boolean") return null;
      if (isDestroyed(stream)) return false;
      return isWritableNodeStream(stream) && stream.writable && !isWritableEnded(stream);
    }
    function isFinished(stream, opts) {
      if (!isNodeStream(stream)) {
        return null;
      }
      if (isDestroyed(stream)) {
        return true;
      }
      if ((opts === null || opts === void 0 ? void 0 : opts.readable) !== false && isReadable(stream)) {
        return false;
      }
      if ((opts === null || opts === void 0 ? void 0 : opts.writable) !== false && isWritable(stream)) {
        return false;
      }
      return true;
    }
    function isWritableErrored(stream) {
      var _stream$_writableStat, _stream$_writableStat2;
      if (!isNodeStream(stream)) {
        return null;
      }
      if (stream.writableErrored) {
        return stream.writableErrored;
      }
      return (_stream$_writableStat = (_stream$_writableStat2 = stream._writableState) === null || _stream$_writableStat2 === void 0 ? void 0 : _stream$_writableStat2.errored) !== null && _stream$_writableStat !== void 0 ? _stream$_writableStat : null;
    }
    function isReadableErrored(stream) {
      var _stream$_readableStat, _stream$_readableStat2;
      if (!isNodeStream(stream)) {
        return null;
      }
      if (stream.readableErrored) {
        return stream.readableErrored;
      }
      return (_stream$_readableStat = (_stream$_readableStat2 = stream._readableState) === null || _stream$_readableStat2 === void 0 ? void 0 : _stream$_readableStat2.errored) !== null && _stream$_readableStat !== void 0 ? _stream$_readableStat : null;
    }
    function isClosed(stream) {
      if (!isNodeStream(stream)) {
        return null;
      }
      if (typeof stream.closed === "boolean") {
        return stream.closed;
      }
      const wState = stream._writableState;
      const rState = stream._readableState;
      if (typeof (wState === null || wState === void 0 ? void 0 : wState.closed) === "boolean" || typeof (rState === null || rState === void 0 ? void 0 : rState.closed) === "boolean") {
        return (wState === null || wState === void 0 ? void 0 : wState.closed) || (rState === null || rState === void 0 ? void 0 : rState.closed);
      }
      if (typeof stream._closed === "boolean" && isOutgoingMessage(stream)) {
        return stream._closed;
      }
      return null;
    }
    function isOutgoingMessage(stream) {
      return typeof stream._closed === "boolean" && typeof stream._defaultKeepAlive === "boolean" && typeof stream._removedConnection === "boolean" && typeof stream._removedContLen === "boolean";
    }
    function isServerResponse(stream) {
      return typeof stream._sent100 === "boolean" && isOutgoingMessage(stream);
    }
    function isServerRequest(stream) {
      var _stream$req;
      return typeof stream._consuming === "boolean" && typeof stream._dumped === "boolean" && ((_stream$req = stream.req) === null || _stream$req === void 0 ? void 0 : _stream$req.upgradeOrConnect) === void 0;
    }
    function willEmitClose(stream) {
      if (!isNodeStream(stream)) return null;
      const wState = stream._writableState;
      const rState = stream._readableState;
      const state = wState || rState;
      return !state && isServerResponse(stream) || !!(state && state.autoDestroy && state.emitClose && state.closed === false);
    }
    function isDisturbed(stream) {
      var _stream$kIsDisturbed;
      return !!(stream && ((_stream$kIsDisturbed = stream[kIsDisturbed]) !== null && _stream$kIsDisturbed !== void 0 ? _stream$kIsDisturbed : stream.readableDidRead || stream.readableAborted));
    }
    function isErrored(stream) {
      var _ref, _ref2, _ref3, _ref4, _ref5, _stream$kIsErrored, _stream$_readableStat3, _stream$_writableStat3, _stream$_readableStat4, _stream$_writableStat4;
      return !!(stream && ((_ref = (_ref2 = (_ref3 = (_ref4 = (_ref5 = (_stream$kIsErrored = stream[kIsErrored]) !== null && _stream$kIsErrored !== void 0 ? _stream$kIsErrored : stream.readableErrored) !== null && _ref5 !== void 0 ? _ref5 : stream.writableErrored) !== null && _ref4 !== void 0 ? _ref4 : (_stream$_readableStat3 = stream._readableState) === null || _stream$_readableStat3 === void 0 ? void 0 : _stream$_readableStat3.errorEmitted) !== null && _ref3 !== void 0 ? _ref3 : (_stream$_writableStat3 = stream._writableState) === null || _stream$_writableStat3 === void 0 ? void 0 : _stream$_writableStat3.errorEmitted) !== null && _ref2 !== void 0 ? _ref2 : (_stream$_readableStat4 = stream._readableState) === null || _stream$_readableStat4 === void 0 ? void 0 : _stream$_readableStat4.errored) !== null && _ref !== void 0 ? _ref : (_stream$_writableStat4 = stream._writableState) === null || _stream$_writableStat4 === void 0 ? void 0 : _stream$_writableStat4.errored));
    }
    module.exports = {
      isDestroyed,
      kIsDestroyed,
      isDisturbed,
      kIsDisturbed,
      isErrored,
      kIsErrored,
      isReadable,
      kIsReadable,
      kIsClosedPromise,
      kControllerErrorFunction,
      kIsWritable,
      isClosed,
      isDuplexNodeStream,
      isFinished,
      isIterable,
      isReadableNodeStream,
      isReadableStream,
      isReadableEnded,
      isReadableFinished,
      isReadableErrored,
      isNodeStream,
      isWebStream,
      isWritable,
      isWritableNodeStream,
      isWritableStream,
      isWritableEnded,
      isWritableFinished,
      isWritableErrored,
      isServerRequest,
      isServerResponse,
      willEmitClose,
      isTransformStream
    };
  }
});

// node_modules/readable-stream/lib/internal/streams/end-of-stream.js
var require_end_of_stream = __commonJS({
  "node_modules/readable-stream/lib/internal/streams/end-of-stream.js"(exports, module) {
    "use strict";
    var process = require_browser2();
    var { AbortError, codes } = require_errors();
    var { ERR_INVALID_ARG_TYPE, ERR_STREAM_PREMATURE_CLOSE } = codes;
    var { kEmptyObject, once } = require_util();
    var { validateAbortSignal, validateFunction, validateObject, validateBoolean } = require_validators();
    var { Promise: Promise2, PromisePrototypeThen, SymbolDispose } = require_primordials();
    var {
      isClosed,
      isReadable,
      isReadableNodeStream,
      isReadableStream,
      isReadableFinished,
      isReadableErrored,
      isWritable,
      isWritableNodeStream,
      isWritableStream,
      isWritableFinished,
      isWritableErrored,
      isNodeStream,
      willEmitClose: _willEmitClose,
      kIsClosedPromise
    } = require_utils();
    var addAbortListener;
    function isRequest(stream) {
      return stream.setHeader && typeof stream.abort === "function";
    }
    var nop2 = () => {
    };
    function eos(stream, options, callback) {
      var _options$readable, _options$writable;
      if (arguments.length === 2) {
        callback = options;
        options = kEmptyObject;
      } else if (options == null) {
        options = kEmptyObject;
      } else {
        validateObject(options, "options");
      }
      validateFunction(callback, "callback");
      validateAbortSignal(options.signal, "options.signal");
      callback = once(callback);
      if (isReadableStream(stream) || isWritableStream(stream)) {
        return eosWeb(stream, options, callback);
      }
      if (!isNodeStream(stream)) {
        throw new ERR_INVALID_ARG_TYPE("stream", ["ReadableStream", "WritableStream", "Stream"], stream);
      }
      const readable = (_options$readable = options.readable) !== null && _options$readable !== void 0 ? _options$readable : isReadableNodeStream(stream);
      const writable = (_options$writable = options.writable) !== null && _options$writable !== void 0 ? _options$writable : isWritableNodeStream(stream);
      const wState = stream._writableState;
      const rState = stream._readableState;
      const onlegacyfinish = () => {
        if (!stream.writable) {
          onfinish();
        }
      };
      let willEmitClose = _willEmitClose(stream) && isReadableNodeStream(stream) === readable && isWritableNodeStream(stream) === writable;
      let writableFinished = isWritableFinished(stream, false);
      const onfinish = () => {
        writableFinished = true;
        if (stream.destroyed) {
          willEmitClose = false;
        }
        if (willEmitClose && (!stream.readable || readable)) {
          return;
        }
        if (!readable || readableFinished) {
          callback.call(stream);
        }
      };
      let readableFinished = isReadableFinished(stream, false);
      const onend = () => {
        readableFinished = true;
        if (stream.destroyed) {
          willEmitClose = false;
        }
        if (willEmitClose && (!stream.writable || writable)) {
          return;
        }
        if (!writable || writableFinished) {
          callback.call(stream);
        }
      };
      const onerror = (err2) => {
        callback.call(stream, err2);
      };
      let closed = isClosed(stream);
      const onclose = () => {
        closed = true;
        const errored = isWritableErrored(stream) || isReadableErrored(stream);
        if (errored && typeof errored !== "boolean") {
          return callback.call(stream, errored);
        }
        if (readable && !readableFinished && isReadableNodeStream(stream, true)) {
          if (!isReadableFinished(stream, false)) return callback.call(stream, new ERR_STREAM_PREMATURE_CLOSE());
        }
        if (writable && !writableFinished) {
          if (!isWritableFinished(stream, false)) return callback.call(stream, new ERR_STREAM_PREMATURE_CLOSE());
        }
        callback.call(stream);
      };
      const onclosed = () => {
        closed = true;
        const errored = isWritableErrored(stream) || isReadableErrored(stream);
        if (errored && typeof errored !== "boolean") {
          return callback.call(stream, errored);
        }
        callback.call(stream);
      };
      const onrequest = () => {
        stream.req.on("finish", onfinish);
      };
      if (isRequest(stream)) {
        stream.on("complete", onfinish);
        if (!willEmitClose) {
          stream.on("abort", onclose);
        }
        if (stream.req) {
          onrequest();
        } else {
          stream.on("request", onrequest);
        }
      } else if (writable && !wState) {
        stream.on("end", onlegacyfinish);
        stream.on("close", onlegacyfinish);
      }
      if (!willEmitClose && typeof stream.aborted === "boolean") {
        stream.on("aborted", onclose);
      }
      stream.on("end", onend);
      stream.on("finish", onfinish);
      if (options.error !== false) {
        stream.on("error", onerror);
      }
      stream.on("close", onclose);
      if (closed) {
        process.nextTick(onclose);
      } else if (wState !== null && wState !== void 0 && wState.errorEmitted || rState !== null && rState !== void 0 && rState.errorEmitted) {
        if (!willEmitClose) {
          process.nextTick(onclosed);
        }
      } else if (!readable && (!willEmitClose || isReadable(stream)) && (writableFinished || isWritable(stream) === false)) {
        process.nextTick(onclosed);
      } else if (!writable && (!willEmitClose || isWritable(stream)) && (readableFinished || isReadable(stream) === false)) {
        process.nextTick(onclosed);
      } else if (rState && stream.req && stream.aborted) {
        process.nextTick(onclosed);
      }
      const cleanup = () => {
        callback = nop2;
        stream.removeListener("aborted", onclose);
        stream.removeListener("complete", onfinish);
        stream.removeListener("abort", onclose);
        stream.removeListener("request", onrequest);
        if (stream.req) stream.req.removeListener("finish", onfinish);
        stream.removeListener("end", onlegacyfinish);
        stream.removeListener("close", onlegacyfinish);
        stream.removeListener("finish", onfinish);
        stream.removeListener("end", onend);
        stream.removeListener("error", onerror);
        stream.removeListener("close", onclose);
      };
      if (options.signal && !closed) {
        const abort = () => {
          const endCallback = callback;
          cleanup();
          endCallback.call(
            stream,
            new AbortError(void 0, {
              cause: options.signal.reason
            })
          );
        };
        if (options.signal.aborted) {
          process.nextTick(abort);
        } else {
          addAbortListener = addAbortListener || require_util().addAbortListener;
          const disposable = addAbortListener(options.signal, abort);
          const originalCallback = callback;
          callback = once((...args) => {
            disposable[SymbolDispose]();
            originalCallback.apply(stream, args);
          });
        }
      }
      return cleanup;
    }
    function eosWeb(stream, options, callback) {
      let isAborted = false;
      let abort = nop2;
      if (options.signal) {
        abort = () => {
          isAborted = true;
          callback.call(
            stream,
            new AbortError(void 0, {
              cause: options.signal.reason
            })
          );
        };
        if (options.signal.aborted) {
          process.nextTick(abort);
        } else {
          addAbortListener = addAbortListener || require_util().addAbortListener;
          const disposable = addAbortListener(options.signal, abort);
          const originalCallback = callback;
          callback = once((...args) => {
            disposable[SymbolDispose]();
            originalCallback.apply(stream, args);
          });
        }
      }
      const resolverFn = (...args) => {
        if (!isAborted) {
          process.nextTick(() => callback.apply(stream, args));
        }
      };
      PromisePrototypeThen(stream[kIsClosedPromise].promise, resolverFn, resolverFn);
      return nop2;
    }
    function finished2(stream, opts) {
      var _opts;
      let autoCleanup = false;
      if (opts === null) {
        opts = kEmptyObject;
      }
      if ((_opts = opts) !== null && _opts !== void 0 && _opts.cleanup) {
        validateBoolean(opts.cleanup, "cleanup");
        autoCleanup = opts.cleanup;
      }
      return new Promise2((resolve4, reject) => {
        const cleanup = eos(stream, opts, (err2) => {
          if (autoCleanup) {
            cleanup();
          }
          if (err2) {
            reject(err2);
          } else {
            resolve4();
          }
        });
      });
    }
    module.exports = eos;
    module.exports.finished = finished2;
  }
});

// node_modules/readable-stream/lib/internal/streams/destroy.js
var require_destroy = __commonJS({
  "node_modules/readable-stream/lib/internal/streams/destroy.js"(exports, module) {
    "use strict";
    var process = require_browser2();
    var {
      aggregateTwoErrors,
      codes: { ERR_MULTIPLE_CALLBACK },
      AbortError
    } = require_errors();
    var { Symbol: Symbol2 } = require_primordials();
    var { kIsDestroyed, isDestroyed, isFinished, isServerRequest } = require_utils();
    var kDestroy = Symbol2("kDestroy");
    var kConstruct = Symbol2("kConstruct");
    function checkError(err2, w, r) {
      if (err2) {
        err2.stack;
        if (w && !w.errored) {
          w.errored = err2;
        }
        if (r && !r.errored) {
          r.errored = err2;
        }
      }
    }
    function destroy(err2, cb) {
      const r = this._readableState;
      const w = this._writableState;
      const s = w || r;
      if (w !== null && w !== void 0 && w.destroyed || r !== null && r !== void 0 && r.destroyed) {
        if (typeof cb === "function") {
          cb();
        }
        return this;
      }
      checkError(err2, w, r);
      if (w) {
        w.destroyed = true;
      }
      if (r) {
        r.destroyed = true;
      }
      if (!s.constructed) {
        this.once(kDestroy, function(er) {
          _destroy(this, aggregateTwoErrors(er, err2), cb);
        });
      } else {
        _destroy(this, err2, cb);
      }
      return this;
    }
    function _destroy(self2, err2, cb) {
      let called = false;
      function onDestroy(err3) {
        if (called) {
          return;
        }
        called = true;
        const r = self2._readableState;
        const w = self2._writableState;
        checkError(err3, w, r);
        if (w) {
          w.closed = true;
        }
        if (r) {
          r.closed = true;
        }
        if (typeof cb === "function") {
          cb(err3);
        }
        if (err3) {
          process.nextTick(emitErrorCloseNT, self2, err3);
        } else {
          process.nextTick(emitCloseNT, self2);
        }
      }
      try {
        self2._destroy(err2 || null, onDestroy);
      } catch (err3) {
        onDestroy(err3);
      }
    }
    function emitErrorCloseNT(self2, err2) {
      emitErrorNT(self2, err2);
      emitCloseNT(self2);
    }
    function emitCloseNT(self2) {
      const r = self2._readableState;
      const w = self2._writableState;
      if (w) {
        w.closeEmitted = true;
      }
      if (r) {
        r.closeEmitted = true;
      }
      if (w !== null && w !== void 0 && w.emitClose || r !== null && r !== void 0 && r.emitClose) {
        self2.emit("close");
      }
    }
    function emitErrorNT(self2, err2) {
      const r = self2._readableState;
      const w = self2._writableState;
      if (w !== null && w !== void 0 && w.errorEmitted || r !== null && r !== void 0 && r.errorEmitted) {
        return;
      }
      if (w) {
        w.errorEmitted = true;
      }
      if (r) {
        r.errorEmitted = true;
      }
      self2.emit("error", err2);
    }
    function undestroy() {
      const r = this._readableState;
      const w = this._writableState;
      if (r) {
        r.constructed = true;
        r.closed = false;
        r.closeEmitted = false;
        r.destroyed = false;
        r.errored = null;
        r.errorEmitted = false;
        r.reading = false;
        r.ended = r.readable === false;
        r.endEmitted = r.readable === false;
      }
      if (w) {
        w.constructed = true;
        w.destroyed = false;
        w.closed = false;
        w.closeEmitted = false;
        w.errored = null;
        w.errorEmitted = false;
        w.finalCalled = false;
        w.prefinished = false;
        w.ended = w.writable === false;
        w.ending = w.writable === false;
        w.finished = w.writable === false;
      }
    }
    function errorOrDestroy(stream, err2, sync) {
      const r = stream._readableState;
      const w = stream._writableState;
      if (w !== null && w !== void 0 && w.destroyed || r !== null && r !== void 0 && r.destroyed) {
        return this;
      }
      if (r !== null && r !== void 0 && r.autoDestroy || w !== null && w !== void 0 && w.autoDestroy)
        stream.destroy(err2);
      else if (err2) {
        err2.stack;
        if (w && !w.errored) {
          w.errored = err2;
        }
        if (r && !r.errored) {
          r.errored = err2;
        }
        if (sync) {
          process.nextTick(emitErrorNT, stream, err2);
        } else {
          emitErrorNT(stream, err2);
        }
      }
    }
    function construct(stream, cb) {
      if (typeof stream._construct !== "function") {
        return;
      }
      const r = stream._readableState;
      const w = stream._writableState;
      if (r) {
        r.constructed = false;
      }
      if (w) {
        w.constructed = false;
      }
      stream.once(kConstruct, cb);
      if (stream.listenerCount(kConstruct) > 1) {
        return;
      }
      process.nextTick(constructNT, stream);
    }
    function constructNT(stream) {
      let called = false;
      function onConstruct(err2) {
        if (called) {
          errorOrDestroy(stream, err2 !== null && err2 !== void 0 ? err2 : new ERR_MULTIPLE_CALLBACK());
          return;
        }
        called = true;
        const r = stream._readableState;
        const w = stream._writableState;
        const s = w || r;
        if (r) {
          r.constructed = true;
        }
        if (w) {
          w.constructed = true;
        }
        if (s.destroyed) {
          stream.emit(kDestroy, err2);
        } else if (err2) {
          errorOrDestroy(stream, err2, true);
        } else {
          process.nextTick(emitConstructNT, stream);
        }
      }
      try {
        stream._construct((err2) => {
          process.nextTick(onConstruct, err2);
        });
      } catch (err2) {
        process.nextTick(onConstruct, err2);
      }
    }
    function emitConstructNT(stream) {
      stream.emit(kConstruct);
    }
    function isRequest(stream) {
      return (stream === null || stream === void 0 ? void 0 : stream.setHeader) && typeof stream.abort === "function";
    }
    function emitCloseLegacy(stream) {
      stream.emit("close");
    }
    function emitErrorCloseLegacy(stream, err2) {
      stream.emit("error", err2);
      process.nextTick(emitCloseLegacy, stream);
    }
    function destroyer(stream, err2) {
      if (!stream || isDestroyed(stream)) {
        return;
      }
      if (!err2 && !isFinished(stream)) {
        err2 = new AbortError();
      }
      if (isServerRequest(stream)) {
        stream.socket = null;
        stream.destroy(err2);
      } else if (isRequest(stream)) {
        stream.abort();
      } else if (isRequest(stream.req)) {
        stream.req.abort();
      } else if (typeof stream.destroy === "function") {
        stream.destroy(err2);
      } else if (typeof stream.close === "function") {
        stream.close();
      } else if (err2) {
        process.nextTick(emitErrorCloseLegacy, stream, err2);
      } else {
        process.nextTick(emitCloseLegacy, stream);
      }
      if (!stream.destroyed) {
        stream[kIsDestroyed] = true;
      }
    }
    module.exports = {
      construct,
      destroyer,
      destroy,
      undestroy,
      errorOrDestroy
    };
  }
});

// node_modules/readable-stream/lib/internal/streams/legacy.js
var require_legacy = __commonJS({
  "node_modules/readable-stream/lib/internal/streams/legacy.js"(exports, module) {
    "use strict";
    var { ArrayIsArray, ObjectSetPrototypeOf } = require_primordials();
    var { EventEmitter: EE } = require_events();
    function Stream(opts) {
      EE.call(this, opts);
    }
    ObjectSetPrototypeOf(Stream.prototype, EE.prototype);
    ObjectSetPrototypeOf(Stream, EE);
    Stream.prototype.pipe = function(dest, options) {
      const source = this;
      function ondata(chunk) {
        if (dest.writable && dest.write(chunk) === false && source.pause) {
          source.pause();
        }
      }
      source.on("data", ondata);
      function ondrain() {
        if (source.readable && source.resume) {
          source.resume();
        }
      }
      dest.on("drain", ondrain);
      if (!dest._isStdio && (!options || options.end !== false)) {
        source.on("end", onend);
        source.on("close", onclose);
      }
      let didOnEnd = false;
      function onend() {
        if (didOnEnd) return;
        didOnEnd = true;
        dest.end();
      }
      function onclose() {
        if (didOnEnd) return;
        didOnEnd = true;
        if (typeof dest.destroy === "function") dest.destroy();
      }
      function onerror(er) {
        cleanup();
        if (EE.listenerCount(this, "error") === 0) {
          this.emit("error", er);
        }
      }
      prependListener(source, "error", onerror);
      prependListener(dest, "error", onerror);
      function cleanup() {
        source.removeListener("data", ondata);
        dest.removeListener("drain", ondrain);
        source.removeListener("end", onend);
        source.removeListener("close", onclose);
        source.removeListener("error", onerror);
        dest.removeListener("error", onerror);
        source.removeListener("end", cleanup);
        source.removeListener("close", cleanup);
        dest.removeListener("close", cleanup);
      }
      source.on("end", cleanup);
      source.on("close", cleanup);
      dest.on("close", cleanup);
      dest.emit("pipe", source);
      return dest;
    };
    function prependListener(emitter, event, fn) {
      if (typeof emitter.prependListener === "function") return emitter.prependListener(event, fn);
      if (!emitter._events || !emitter._events[event]) emitter.on(event, fn);
      else if (ArrayIsArray(emitter._events[event])) emitter._events[event].unshift(fn);
      else emitter._events[event] = [fn, emitter._events[event]];
    }
    module.exports = {
      Stream,
      prependListener
    };
  }
});

// node_modules/readable-stream/lib/internal/streams/add-abort-signal.js
var require_add_abort_signal = __commonJS({
  "node_modules/readable-stream/lib/internal/streams/add-abort-signal.js"(exports, module) {
    "use strict";
    var { SymbolDispose } = require_primordials();
    var { AbortError, codes } = require_errors();
    var { isNodeStream, isWebStream, kControllerErrorFunction } = require_utils();
    var eos = require_end_of_stream();
    var { ERR_INVALID_ARG_TYPE } = codes;
    var addAbortListener;
    var validateAbortSignal = (signal, name) => {
      if (typeof signal !== "object" || !("aborted" in signal)) {
        throw new ERR_INVALID_ARG_TYPE(name, "AbortSignal", signal);
      }
    };
    module.exports.addAbortSignal = function addAbortSignal(signal, stream) {
      validateAbortSignal(signal, "signal");
      if (!isNodeStream(stream) && !isWebStream(stream)) {
        throw new ERR_INVALID_ARG_TYPE("stream", ["ReadableStream", "WritableStream", "Stream"], stream);
      }
      return module.exports.addAbortSignalNoValidate(signal, stream);
    };
    module.exports.addAbortSignalNoValidate = function(signal, stream) {
      if (typeof signal !== "object" || !("aborted" in signal)) {
        return stream;
      }
      const onAbort = isNodeStream(stream) ? () => {
        stream.destroy(
          new AbortError(void 0, {
            cause: signal.reason
          })
        );
      } : () => {
        stream[kControllerErrorFunction](
          new AbortError(void 0, {
            cause: signal.reason
          })
        );
      };
      if (signal.aborted) {
        onAbort();
      } else {
        addAbortListener = addAbortListener || require_util().addAbortListener;
        const disposable = addAbortListener(signal, onAbort);
        eos(stream, disposable[SymbolDispose]);
      }
      return stream;
    };
  }
});

// node_modules/readable-stream/lib/internal/streams/buffer_list.js
var require_buffer_list = __commonJS({
  "node_modules/readable-stream/lib/internal/streams/buffer_list.js"(exports, module) {
    "use strict";
    var { StringPrototypeSlice, SymbolIterator, TypedArrayPrototypeSet, Uint8Array: Uint8Array2 } = require_primordials();
    var { Buffer: Buffer8 } = require_buffer();
    var { inspect } = require_util();
    module.exports = class BufferList {
      constructor() {
        this.head = null;
        this.tail = null;
        this.length = 0;
      }
      push(v) {
        const entry = {
          data: v,
          next: null
        };
        if (this.length > 0) this.tail.next = entry;
        else this.head = entry;
        this.tail = entry;
        ++this.length;
      }
      unshift(v) {
        const entry = {
          data: v,
          next: this.head
        };
        if (this.length === 0) this.tail = entry;
        this.head = entry;
        ++this.length;
      }
      shift() {
        if (this.length === 0) return;
        const ret = this.head.data;
        if (this.length === 1) this.head = this.tail = null;
        else this.head = this.head.next;
        --this.length;
        return ret;
      }
      clear() {
        this.head = this.tail = null;
        this.length = 0;
      }
      join(s) {
        if (this.length === 0) return "";
        let p = this.head;
        let ret = "" + p.data;
        while ((p = p.next) !== null) ret += s + p.data;
        return ret;
      }
      concat(n) {
        if (this.length === 0) return Buffer8.alloc(0);
        const ret = Buffer8.allocUnsafe(n >>> 0);
        let p = this.head;
        let i = 0;
        while (p) {
          TypedArrayPrototypeSet(ret, p.data, i);
          i += p.data.length;
          p = p.next;
        }
        return ret;
      }
      // Consumes a specified amount of bytes or characters from the buffered data.
      consume(n, hasStrings) {
        const data = this.head.data;
        if (n < data.length) {
          const slice = data.slice(0, n);
          this.head.data = data.slice(n);
          return slice;
        }
        if (n === data.length) {
          return this.shift();
        }
        return hasStrings ? this._getString(n) : this._getBuffer(n);
      }
      first() {
        return this.head.data;
      }
      *[SymbolIterator]() {
        for (let p = this.head; p; p = p.next) {
          yield p.data;
        }
      }
      // Consumes a specified amount of characters from the buffered data.
      _getString(n) {
        let ret = "";
        let p = this.head;
        let c = 0;
        do {
          const str = p.data;
          if (n > str.length) {
            ret += str;
            n -= str.length;
          } else {
            if (n === str.length) {
              ret += str;
              ++c;
              if (p.next) this.head = p.next;
              else this.head = this.tail = null;
            } else {
              ret += StringPrototypeSlice(str, 0, n);
              this.head = p;
              p.data = StringPrototypeSlice(str, n);
            }
            break;
          }
          ++c;
        } while ((p = p.next) !== null);
        this.length -= c;
        return ret;
      }
      // Consumes a specified amount of bytes from the buffered data.
      _getBuffer(n) {
        const ret = Buffer8.allocUnsafe(n);
        const retLen = n;
        let p = this.head;
        let c = 0;
        do {
          const buf = p.data;
          if (n > buf.length) {
            TypedArrayPrototypeSet(ret, buf, retLen - n);
            n -= buf.length;
          } else {
            if (n === buf.length) {
              TypedArrayPrototypeSet(ret, buf, retLen - n);
              ++c;
              if (p.next) this.head = p.next;
              else this.head = this.tail = null;
            } else {
              TypedArrayPrototypeSet(ret, new Uint8Array2(buf.buffer, buf.byteOffset, n), retLen - n);
              this.head = p;
              p.data = buf.slice(n);
            }
            break;
          }
          ++c;
        } while ((p = p.next) !== null);
        this.length -= c;
        return ret;
      }
      // Make sure the linked list only shows the minimal necessary information.
      [/* @__PURE__ */ Symbol.for("nodejs.util.inspect.custom")](_, options) {
        return inspect(this, {
          ...options,
          // Only inspect one level.
          depth: 0,
          // It should not recurse.
          customInspect: false
        });
      }
    };
  }
});

// node_modules/readable-stream/lib/internal/streams/state.js
var require_state = __commonJS({
  "node_modules/readable-stream/lib/internal/streams/state.js"(exports, module) {
    "use strict";
    var { MathFloor, NumberIsInteger } = require_primordials();
    var { validateInteger } = require_validators();
    var { ERR_INVALID_ARG_VALUE } = require_errors().codes;
    var defaultHighWaterMarkBytes = 16 * 1024;
    var defaultHighWaterMarkObjectMode = 16;
    function highWaterMarkFrom(options, isDuplex, duplexKey) {
      return options.highWaterMark != null ? options.highWaterMark : isDuplex ? options[duplexKey] : null;
    }
    function getDefaultHighWaterMark(objectMode) {
      return objectMode ? defaultHighWaterMarkObjectMode : defaultHighWaterMarkBytes;
    }
    function setDefaultHighWaterMark(objectMode, value) {
      validateInteger(value, "value", 0);
      if (objectMode) {
        defaultHighWaterMarkObjectMode = value;
      } else {
        defaultHighWaterMarkBytes = value;
      }
    }
    function getHighWaterMark(state, options, duplexKey, isDuplex) {
      const hwm = highWaterMarkFrom(options, isDuplex, duplexKey);
      if (hwm != null) {
        if (!NumberIsInteger(hwm) || hwm < 0) {
          const name = isDuplex ? `options.${duplexKey}` : "options.highWaterMark";
          throw new ERR_INVALID_ARG_VALUE(name, hwm);
        }
        return MathFloor(hwm);
      }
      return getDefaultHighWaterMark(state.objectMode);
    }
    module.exports = {
      getHighWaterMark,
      getDefaultHighWaterMark,
      setDefaultHighWaterMark
    };
  }
});

// node_modules/safe-buffer/index.js
var require_safe_buffer = __commonJS({
  "node_modules/safe-buffer/index.js"(exports, module) {
    var buffer = require_buffer();
    var Buffer8 = buffer.Buffer;
    function copyProps(src, dst) {
      for (var key in src) {
        dst[key] = src[key];
      }
    }
    if (Buffer8.from && Buffer8.alloc && Buffer8.allocUnsafe && Buffer8.allocUnsafeSlow) {
      module.exports = buffer;
    } else {
      copyProps(buffer, exports);
      exports.Buffer = SafeBuffer;
    }
    function SafeBuffer(arg, encodingOrOffset, length) {
      return Buffer8(arg, encodingOrOffset, length);
    }
    SafeBuffer.prototype = Object.create(Buffer8.prototype);
    copyProps(Buffer8, SafeBuffer);
    SafeBuffer.from = function(arg, encodingOrOffset, length) {
      if (typeof arg === "number") {
        throw new TypeError("Argument must not be a number");
      }
      return Buffer8(arg, encodingOrOffset, length);
    };
    SafeBuffer.alloc = function(size, fill, encoding) {
      if (typeof size !== "number") {
        throw new TypeError("Argument must be a number");
      }
      var buf = Buffer8(size);
      if (fill !== void 0) {
        if (typeof encoding === "string") {
          buf.fill(fill, encoding);
        } else {
          buf.fill(fill);
        }
      } else {
        buf.fill(0);
      }
      return buf;
    };
    SafeBuffer.allocUnsafe = function(size) {
      if (typeof size !== "number") {
        throw new TypeError("Argument must be a number");
      }
      return Buffer8(size);
    };
    SafeBuffer.allocUnsafeSlow = function(size) {
      if (typeof size !== "number") {
        throw new TypeError("Argument must be a number");
      }
      return buffer.SlowBuffer(size);
    };
  }
});

// node_modules/string_decoder/lib/string_decoder.js
var require_string_decoder = __commonJS({
  "node_modules/string_decoder/lib/string_decoder.js"(exports) {
    "use strict";
    var Buffer8 = require_safe_buffer().Buffer;
    var isEncoding = Buffer8.isEncoding || function(encoding) {
      encoding = "" + encoding;
      switch (encoding && encoding.toLowerCase()) {
        case "hex":
        case "utf8":
        case "utf-8":
        case "ascii":
        case "binary":
        case "base64":
        case "ucs2":
        case "ucs-2":
        case "utf16le":
        case "utf-16le":
        case "raw":
          return true;
        default:
          return false;
      }
    };
    function _normalizeEncoding(enc) {
      if (!enc) return "utf8";
      var retried;
      while (true) {
        switch (enc) {
          case "utf8":
          case "utf-8":
            return "utf8";
          case "ucs2":
          case "ucs-2":
          case "utf16le":
          case "utf-16le":
            return "utf16le";
          case "latin1":
          case "binary":
            return "latin1";
          case "base64":
          case "ascii":
          case "hex":
            return enc;
          default:
            if (retried) return;
            enc = ("" + enc).toLowerCase();
            retried = true;
        }
      }
    }
    function normalizeEncoding(enc) {
      var nenc = _normalizeEncoding(enc);
      if (typeof nenc !== "string" && (Buffer8.isEncoding === isEncoding || !isEncoding(enc))) throw new Error("Unknown encoding: " + enc);
      return nenc || enc;
    }
    exports.StringDecoder = StringDecoder;
    function StringDecoder(encoding) {
      this.encoding = normalizeEncoding(encoding);
      var nb;
      switch (this.encoding) {
        case "utf16le":
          this.text = utf16Text;
          this.end = utf16End;
          nb = 4;
          break;
        case "utf8":
          this.fillLast = utf8FillLast;
          nb = 4;
          break;
        case "base64":
          this.text = base64Text;
          this.end = base64End;
          nb = 3;
          break;
        default:
          this.write = simpleWrite;
          this.end = simpleEnd;
          return;
      }
      this.lastNeed = 0;
      this.lastTotal = 0;
      this.lastChar = Buffer8.allocUnsafe(nb);
    }
    StringDecoder.prototype.write = function(buf) {
      if (buf.length === 0) return "";
      var r;
      var i;
      if (this.lastNeed) {
        r = this.fillLast(buf);
        if (r === void 0) return "";
        i = this.lastNeed;
        this.lastNeed = 0;
      } else {
        i = 0;
      }
      if (i < buf.length) return r ? r + this.text(buf, i) : this.text(buf, i);
      return r || "";
    };
    StringDecoder.prototype.end = utf8End;
    StringDecoder.prototype.text = utf8Text;
    StringDecoder.prototype.fillLast = function(buf) {
      if (this.lastNeed <= buf.length) {
        buf.copy(this.lastChar, this.lastTotal - this.lastNeed, 0, this.lastNeed);
        return this.lastChar.toString(this.encoding, 0, this.lastTotal);
      }
      buf.copy(this.lastChar, this.lastTotal - this.lastNeed, 0, buf.length);
      this.lastNeed -= buf.length;
    };
    function utf8CheckByte(byte) {
      if (byte <= 127) return 0;
      else if (byte >> 5 === 6) return 2;
      else if (byte >> 4 === 14) return 3;
      else if (byte >> 3 === 30) return 4;
      return byte >> 6 === 2 ? -1 : -2;
    }
    function utf8CheckIncomplete(self2, buf, i) {
      var j = buf.length - 1;
      if (j < i) return 0;
      var nb = utf8CheckByte(buf[j]);
      if (nb >= 0) {
        if (nb > 0) self2.lastNeed = nb - 1;
        return nb;
      }
      if (--j < i || nb === -2) return 0;
      nb = utf8CheckByte(buf[j]);
      if (nb >= 0) {
        if (nb > 0) self2.lastNeed = nb - 2;
        return nb;
      }
      if (--j < i || nb === -2) return 0;
      nb = utf8CheckByte(buf[j]);
      if (nb >= 0) {
        if (nb > 0) {
          if (nb === 2) nb = 0;
          else self2.lastNeed = nb - 3;
        }
        return nb;
      }
      return 0;
    }
    function utf8CheckExtraBytes(self2, buf, p) {
      if ((buf[0] & 192) !== 128) {
        self2.lastNeed = 0;
        return "\uFFFD";
      }
      if (self2.lastNeed > 1 && buf.length > 1) {
        if ((buf[1] & 192) !== 128) {
          self2.lastNeed = 1;
          return "\uFFFD";
        }
        if (self2.lastNeed > 2 && buf.length > 2) {
          if ((buf[2] & 192) !== 128) {
            self2.lastNeed = 2;
            return "\uFFFD";
          }
        }
      }
    }
    function utf8FillLast(buf) {
      var p = this.lastTotal - this.lastNeed;
      var r = utf8CheckExtraBytes(this, buf, p);
      if (r !== void 0) return r;
      if (this.lastNeed <= buf.length) {
        buf.copy(this.lastChar, p, 0, this.lastNeed);
        return this.lastChar.toString(this.encoding, 0, this.lastTotal);
      }
      buf.copy(this.lastChar, p, 0, buf.length);
      this.lastNeed -= buf.length;
    }
    function utf8Text(buf, i) {
      var total = utf8CheckIncomplete(this, buf, i);
      if (!this.lastNeed) return buf.toString("utf8", i);
      this.lastTotal = total;
      var end = buf.length - (total - this.lastNeed);
      buf.copy(this.lastChar, 0, end);
      return buf.toString("utf8", i, end);
    }
    function utf8End(buf) {
      var r = buf && buf.length ? this.write(buf) : "";
      if (this.lastNeed) return r + "\uFFFD";
      return r;
    }
    function utf16Text(buf, i) {
      if ((buf.length - i) % 2 === 0) {
        var r = buf.toString("utf16le", i);
        if (r) {
          var c = r.charCodeAt(r.length - 1);
          if (c >= 55296 && c <= 56319) {
            this.lastNeed = 2;
            this.lastTotal = 4;
            this.lastChar[0] = buf[buf.length - 2];
            this.lastChar[1] = buf[buf.length - 1];
            return r.slice(0, -1);
          }
        }
        return r;
      }
      this.lastNeed = 1;
      this.lastTotal = 2;
      this.lastChar[0] = buf[buf.length - 1];
      return buf.toString("utf16le", i, buf.length - 1);
    }
    function utf16End(buf) {
      var r = buf && buf.length ? this.write(buf) : "";
      if (this.lastNeed) {
        var end = this.lastTotal - this.lastNeed;
        return r + this.lastChar.toString("utf16le", 0, end);
      }
      return r;
    }
    function base64Text(buf, i) {
      var n = (buf.length - i) % 3;
      if (n === 0) return buf.toString("base64", i);
      this.lastNeed = 3 - n;
      this.lastTotal = 3;
      if (n === 1) {
        this.lastChar[0] = buf[buf.length - 1];
      } else {
        this.lastChar[0] = buf[buf.length - 2];
        this.lastChar[1] = buf[buf.length - 1];
      }
      return buf.toString("base64", i, buf.length - n);
    }
    function base64End(buf) {
      var r = buf && buf.length ? this.write(buf) : "";
      if (this.lastNeed) return r + this.lastChar.toString("base64", 0, 3 - this.lastNeed);
      return r;
    }
    function simpleWrite(buf) {
      return buf.toString(this.encoding);
    }
    function simpleEnd(buf) {
      return buf && buf.length ? this.write(buf) : "";
    }
  }
});

// node_modules/readable-stream/lib/internal/streams/from.js
var require_from = __commonJS({
  "node_modules/readable-stream/lib/internal/streams/from.js"(exports, module) {
    "use strict";
    var process = require_browser2();
    var { PromisePrototypeThen, SymbolAsyncIterator, SymbolIterator } = require_primordials();
    var { Buffer: Buffer8 } = require_buffer();
    var { ERR_INVALID_ARG_TYPE, ERR_STREAM_NULL_VALUES } = require_errors().codes;
    function from2(Readable2, iterable, opts) {
      let iterator;
      if (typeof iterable === "string" || iterable instanceof Buffer8) {
        return new Readable2({
          objectMode: true,
          ...opts,
          read() {
            this.push(iterable);
            this.push(null);
          }
        });
      }
      let isAsync;
      if (iterable && iterable[SymbolAsyncIterator]) {
        isAsync = true;
        iterator = iterable[SymbolAsyncIterator]();
      } else if (iterable && iterable[SymbolIterator]) {
        isAsync = false;
        iterator = iterable[SymbolIterator]();
      } else {
        throw new ERR_INVALID_ARG_TYPE("iterable", ["Iterable"], iterable);
      }
      const readable = new Readable2({
        objectMode: true,
        highWaterMark: 1,
        // TODO(ronag): What options should be allowed?
        ...opts
      });
      let reading = false;
      readable._read = function() {
        if (!reading) {
          reading = true;
          next();
        }
      };
      readable._destroy = function(error2, cb) {
        PromisePrototypeThen(
          close2(error2),
          () => process.nextTick(cb, error2),
          // nextTick is here in case cb throws
          (e) => process.nextTick(cb, e || error2)
        );
      };
      async function close2(error2) {
        const hadError = error2 !== void 0 && error2 !== null;
        const hasThrow = typeof iterator.throw === "function";
        if (hadError && hasThrow) {
          const { value, done } = await iterator.throw(error2);
          await value;
          if (done) {
            return;
          }
        }
        if (typeof iterator.return === "function") {
          const { value } = await iterator.return();
          await value;
        }
      }
      async function next() {
        for (; ; ) {
          try {
            const { value, done } = isAsync ? await iterator.next() : iterator.next();
            if (done) {
              readable.push(null);
            } else {
              const res = value && typeof value.then === "function" ? await value : value;
              if (res === null) {
                reading = false;
                throw new ERR_STREAM_NULL_VALUES();
              } else if (readable.push(res)) {
                continue;
              } else {
                reading = false;
              }
            }
          } catch (err2) {
            readable.destroy(err2);
          }
          break;
        }
      }
      return readable;
    }
    module.exports = from2;
  }
});

// node_modules/readable-stream/lib/internal/streams/readable.js
var require_readable = __commonJS({
  "node_modules/readable-stream/lib/internal/streams/readable.js"(exports, module) {
    "use strict";
    var process = require_browser2();
    var {
      ArrayPrototypeIndexOf,
      NumberIsInteger,
      NumberIsNaN,
      NumberParseInt,
      ObjectDefineProperties,
      ObjectKeys,
      ObjectSetPrototypeOf,
      Promise: Promise2,
      SafeSet,
      SymbolAsyncDispose,
      SymbolAsyncIterator,
      Symbol: Symbol2
    } = require_primordials();
    module.exports = Readable2;
    Readable2.ReadableState = ReadableState;
    var { EventEmitter: EE } = require_events();
    var { Stream, prependListener } = require_legacy();
    var { Buffer: Buffer8 } = require_buffer();
    var { addAbortSignal } = require_add_abort_signal();
    var eos = require_end_of_stream();
    var debug2 = require_util().debuglog("stream", (fn) => {
      debug2 = fn;
    });
    var BufferList = require_buffer_list();
    var destroyImpl = require_destroy();
    var { getHighWaterMark, getDefaultHighWaterMark } = require_state();
    var {
      aggregateTwoErrors,
      codes: {
        ERR_INVALID_ARG_TYPE,
        ERR_METHOD_NOT_IMPLEMENTED,
        ERR_OUT_OF_RANGE,
        ERR_STREAM_PUSH_AFTER_EOF,
        ERR_STREAM_UNSHIFT_AFTER_END_EVENT
      },
      AbortError
    } = require_errors();
    var { validateObject } = require_validators();
    var kPaused = Symbol2("kPaused");
    var { StringDecoder } = require_string_decoder();
    var from2 = require_from();
    ObjectSetPrototypeOf(Readable2.prototype, Stream.prototype);
    ObjectSetPrototypeOf(Readable2, Stream);
    var nop2 = () => {
    };
    var { errorOrDestroy } = destroyImpl;
    var kObjectMode = 1 << 0;
    var kEnded = 1 << 1;
    var kEndEmitted = 1 << 2;
    var kReading = 1 << 3;
    var kConstructed = 1 << 4;
    var kSync = 1 << 5;
    var kNeedReadable = 1 << 6;
    var kEmittedReadable = 1 << 7;
    var kReadableListening = 1 << 8;
    var kResumeScheduled = 1 << 9;
    var kErrorEmitted = 1 << 10;
    var kEmitClose = 1 << 11;
    var kAutoDestroy = 1 << 12;
    var kDestroyed = 1 << 13;
    var kClosed = 1 << 14;
    var kCloseEmitted = 1 << 15;
    var kMultiAwaitDrain = 1 << 16;
    var kReadingMore = 1 << 17;
    var kDataEmitted = 1 << 18;
    function makeBitMapDescriptor(bit) {
      return {
        enumerable: false,
        get() {
          return (this.state & bit) !== 0;
        },
        set(value) {
          if (value) this.state |= bit;
          else this.state &= ~bit;
        }
      };
    }
    ObjectDefineProperties(ReadableState.prototype, {
      objectMode: makeBitMapDescriptor(kObjectMode),
      ended: makeBitMapDescriptor(kEnded),
      endEmitted: makeBitMapDescriptor(kEndEmitted),
      reading: makeBitMapDescriptor(kReading),
      // Stream is still being constructed and cannot be
      // destroyed until construction finished or failed.
      // Async construction is opt in, therefore we start as
      // constructed.
      constructed: makeBitMapDescriptor(kConstructed),
      // A flag to be able to tell if the event 'readable'/'data' is emitted
      // immediately, or on a later tick.  We set this to true at first, because
      // any actions that shouldn't happen until "later" should generally also
      // not happen before the first read call.
      sync: makeBitMapDescriptor(kSync),
      // Whenever we return null, then we set a flag to say
      // that we're awaiting a 'readable' event emission.
      needReadable: makeBitMapDescriptor(kNeedReadable),
      emittedReadable: makeBitMapDescriptor(kEmittedReadable),
      readableListening: makeBitMapDescriptor(kReadableListening),
      resumeScheduled: makeBitMapDescriptor(kResumeScheduled),
      // True if the error was already emitted and should not be thrown again.
      errorEmitted: makeBitMapDescriptor(kErrorEmitted),
      emitClose: makeBitMapDescriptor(kEmitClose),
      autoDestroy: makeBitMapDescriptor(kAutoDestroy),
      // Has it been destroyed.
      destroyed: makeBitMapDescriptor(kDestroyed),
      // Indicates whether the stream has finished destroying.
      closed: makeBitMapDescriptor(kClosed),
      // True if close has been emitted or would have been emitted
      // depending on emitClose.
      closeEmitted: makeBitMapDescriptor(kCloseEmitted),
      multiAwaitDrain: makeBitMapDescriptor(kMultiAwaitDrain),
      // If true, a maybeReadMore has been scheduled.
      readingMore: makeBitMapDescriptor(kReadingMore),
      dataEmitted: makeBitMapDescriptor(kDataEmitted)
    });
    function ReadableState(options, stream, isDuplex) {
      if (typeof isDuplex !== "boolean") isDuplex = stream instanceof require_duplex();
      this.state = kEmitClose | kAutoDestroy | kConstructed | kSync;
      if (options && options.objectMode) this.state |= kObjectMode;
      if (isDuplex && options && options.readableObjectMode) this.state |= kObjectMode;
      this.highWaterMark = options ? getHighWaterMark(this, options, "readableHighWaterMark", isDuplex) : getDefaultHighWaterMark(false);
      this.buffer = new BufferList();
      this.length = 0;
      this.pipes = [];
      this.flowing = null;
      this[kPaused] = null;
      if (options && options.emitClose === false) this.state &= ~kEmitClose;
      if (options && options.autoDestroy === false) this.state &= ~kAutoDestroy;
      this.errored = null;
      this.defaultEncoding = options && options.defaultEncoding || "utf8";
      this.awaitDrainWriters = null;
      this.decoder = null;
      this.encoding = null;
      if (options && options.encoding) {
        this.decoder = new StringDecoder(options.encoding);
        this.encoding = options.encoding;
      }
    }
    function Readable2(options) {
      if (!(this instanceof Readable2)) return new Readable2(options);
      const isDuplex = this instanceof require_duplex();
      this._readableState = new ReadableState(options, this, isDuplex);
      if (options) {
        if (typeof options.read === "function") this._read = options.read;
        if (typeof options.destroy === "function") this._destroy = options.destroy;
        if (typeof options.construct === "function") this._construct = options.construct;
        if (options.signal && !isDuplex) addAbortSignal(options.signal, this);
      }
      Stream.call(this, options);
      destroyImpl.construct(this, () => {
        if (this._readableState.needReadable) {
          maybeReadMore(this, this._readableState);
        }
      });
    }
    Readable2.prototype.destroy = destroyImpl.destroy;
    Readable2.prototype._undestroy = destroyImpl.undestroy;
    Readable2.prototype._destroy = function(err2, cb) {
      cb(err2);
    };
    Readable2.prototype[EE.captureRejectionSymbol] = function(err2) {
      this.destroy(err2);
    };
    Readable2.prototype[SymbolAsyncDispose] = function() {
      let error2;
      if (!this.destroyed) {
        error2 = this.readableEnded ? null : new AbortError();
        this.destroy(error2);
      }
      return new Promise2((resolve4, reject) => eos(this, (err2) => err2 && err2 !== error2 ? reject(err2) : resolve4(null)));
    };
    Readable2.prototype.push = function(chunk, encoding) {
      return readableAddChunk(this, chunk, encoding, false);
    };
    Readable2.prototype.unshift = function(chunk, encoding) {
      return readableAddChunk(this, chunk, encoding, true);
    };
    function readableAddChunk(stream, chunk, encoding, addToFront) {
      debug2("readableAddChunk", chunk);
      const state = stream._readableState;
      let err2;
      if ((state.state & kObjectMode) === 0) {
        if (typeof chunk === "string") {
          encoding = encoding || state.defaultEncoding;
          if (state.encoding !== encoding) {
            if (addToFront && state.encoding) {
              chunk = Buffer8.from(chunk, encoding).toString(state.encoding);
            } else {
              chunk = Buffer8.from(chunk, encoding);
              encoding = "";
            }
          }
        } else if (chunk instanceof Buffer8) {
          encoding = "";
        } else if (Stream._isUint8Array(chunk)) {
          chunk = Stream._uint8ArrayToBuffer(chunk);
          encoding = "";
        } else if (chunk != null) {
          err2 = new ERR_INVALID_ARG_TYPE("chunk", ["string", "Buffer", "Uint8Array"], chunk);
        }
      }
      if (err2) {
        errorOrDestroy(stream, err2);
      } else if (chunk === null) {
        state.state &= ~kReading;
        onEofChunk(stream, state);
      } else if ((state.state & kObjectMode) !== 0 || chunk && chunk.length > 0) {
        if (addToFront) {
          if ((state.state & kEndEmitted) !== 0) errorOrDestroy(stream, new ERR_STREAM_UNSHIFT_AFTER_END_EVENT());
          else if (state.destroyed || state.errored) return false;
          else addChunk(stream, state, chunk, true);
        } else if (state.ended) {
          errorOrDestroy(stream, new ERR_STREAM_PUSH_AFTER_EOF());
        } else if (state.destroyed || state.errored) {
          return false;
        } else {
          state.state &= ~kReading;
          if (state.decoder && !encoding) {
            chunk = state.decoder.write(chunk);
            if (state.objectMode || chunk.length !== 0) addChunk(stream, state, chunk, false);
            else maybeReadMore(stream, state);
          } else {
            addChunk(stream, state, chunk, false);
          }
        }
      } else if (!addToFront) {
        state.state &= ~kReading;
        maybeReadMore(stream, state);
      }
      return !state.ended && (state.length < state.highWaterMark || state.length === 0);
    }
    function addChunk(stream, state, chunk, addToFront) {
      if (state.flowing && state.length === 0 && !state.sync && stream.listenerCount("data") > 0) {
        if ((state.state & kMultiAwaitDrain) !== 0) {
          state.awaitDrainWriters.clear();
        } else {
          state.awaitDrainWriters = null;
        }
        state.dataEmitted = true;
        stream.emit("data", chunk);
      } else {
        state.length += state.objectMode ? 1 : chunk.length;
        if (addToFront) state.buffer.unshift(chunk);
        else state.buffer.push(chunk);
        if ((state.state & kNeedReadable) !== 0) emitReadable(stream);
      }
      maybeReadMore(stream, state);
    }
    Readable2.prototype.isPaused = function() {
      const state = this._readableState;
      return state[kPaused] === true || state.flowing === false;
    };
    Readable2.prototype.setEncoding = function(enc) {
      const decoder2 = new StringDecoder(enc);
      this._readableState.decoder = decoder2;
      this._readableState.encoding = this._readableState.decoder.encoding;
      const buffer = this._readableState.buffer;
      let content = "";
      for (const data of buffer) {
        content += decoder2.write(data);
      }
      buffer.clear();
      if (content !== "") buffer.push(content);
      this._readableState.length = content.length;
      return this;
    };
    var MAX_HWM = 1073741824;
    function computeNewHighWaterMark(n) {
      if (n > MAX_HWM) {
        throw new ERR_OUT_OF_RANGE("size", "<= 1GiB", n);
      } else {
        n--;
        n |= n >>> 1;
        n |= n >>> 2;
        n |= n >>> 4;
        n |= n >>> 8;
        n |= n >>> 16;
        n++;
      }
      return n;
    }
    function howMuchToRead(n, state) {
      if (n <= 0 || state.length === 0 && state.ended) return 0;
      if ((state.state & kObjectMode) !== 0) return 1;
      if (NumberIsNaN(n)) {
        if (state.flowing && state.length) return state.buffer.first().length;
        return state.length;
      }
      if (n <= state.length) return n;
      return state.ended ? state.length : 0;
    }
    Readable2.prototype.read = function(n) {
      debug2("read", n);
      if (n === void 0) {
        n = NaN;
      } else if (!NumberIsInteger(n)) {
        n = NumberParseInt(n, 10);
      }
      const state = this._readableState;
      const nOrig = n;
      if (n > state.highWaterMark) state.highWaterMark = computeNewHighWaterMark(n);
      if (n !== 0) state.state &= ~kEmittedReadable;
      if (n === 0 && state.needReadable && ((state.highWaterMark !== 0 ? state.length >= state.highWaterMark : state.length > 0) || state.ended)) {
        debug2("read: emitReadable", state.length, state.ended);
        if (state.length === 0 && state.ended) endReadable(this);
        else emitReadable(this);
        return null;
      }
      n = howMuchToRead(n, state);
      if (n === 0 && state.ended) {
        if (state.length === 0) endReadable(this);
        return null;
      }
      let doRead = (state.state & kNeedReadable) !== 0;
      debug2("need readable", doRead);
      if (state.length === 0 || state.length - n < state.highWaterMark) {
        doRead = true;
        debug2("length less than watermark", doRead);
      }
      if (state.ended || state.reading || state.destroyed || state.errored || !state.constructed) {
        doRead = false;
        debug2("reading, ended or constructing", doRead);
      } else if (doRead) {
        debug2("do read");
        state.state |= kReading | kSync;
        if (state.length === 0) state.state |= kNeedReadable;
        try {
          this._read(state.highWaterMark);
        } catch (err2) {
          errorOrDestroy(this, err2);
        }
        state.state &= ~kSync;
        if (!state.reading) n = howMuchToRead(nOrig, state);
      }
      let ret;
      if (n > 0) ret = fromList(n, state);
      else ret = null;
      if (ret === null) {
        state.needReadable = state.length <= state.highWaterMark;
        n = 0;
      } else {
        state.length -= n;
        if (state.multiAwaitDrain) {
          state.awaitDrainWriters.clear();
        } else {
          state.awaitDrainWriters = null;
        }
      }
      if (state.length === 0) {
        if (!state.ended) state.needReadable = true;
        if (nOrig !== n && state.ended) endReadable(this);
      }
      if (ret !== null && !state.errorEmitted && !state.closeEmitted) {
        state.dataEmitted = true;
        this.emit("data", ret);
      }
      return ret;
    };
    function onEofChunk(stream, state) {
      debug2("onEofChunk");
      if (state.ended) return;
      if (state.decoder) {
        const chunk = state.decoder.end();
        if (chunk && chunk.length) {
          state.buffer.push(chunk);
          state.length += state.objectMode ? 1 : chunk.length;
        }
      }
      state.ended = true;
      if (state.sync) {
        emitReadable(stream);
      } else {
        state.needReadable = false;
        state.emittedReadable = true;
        emitReadable_(stream);
      }
    }
    function emitReadable(stream) {
      const state = stream._readableState;
      debug2("emitReadable", state.needReadable, state.emittedReadable);
      state.needReadable = false;
      if (!state.emittedReadable) {
        debug2("emitReadable", state.flowing);
        state.emittedReadable = true;
        process.nextTick(emitReadable_, stream);
      }
    }
    function emitReadable_(stream) {
      const state = stream._readableState;
      debug2("emitReadable_", state.destroyed, state.length, state.ended);
      if (!state.destroyed && !state.errored && (state.length || state.ended)) {
        stream.emit("readable");
        state.emittedReadable = false;
      }
      state.needReadable = !state.flowing && !state.ended && state.length <= state.highWaterMark;
      flow(stream);
    }
    function maybeReadMore(stream, state) {
      if (!state.readingMore && state.constructed) {
        state.readingMore = true;
        process.nextTick(maybeReadMore_, stream, state);
      }
    }
    function maybeReadMore_(stream, state) {
      while (!state.reading && !state.ended && (state.length < state.highWaterMark || state.flowing && state.length === 0)) {
        const len = state.length;
        debug2("maybeReadMore read 0");
        stream.read(0);
        if (len === state.length)
          break;
      }
      state.readingMore = false;
    }
    Readable2.prototype._read = function(n) {
      throw new ERR_METHOD_NOT_IMPLEMENTED("_read()");
    };
    Readable2.prototype.pipe = function(dest, pipeOpts) {
      const src = this;
      const state = this._readableState;
      if (state.pipes.length === 1) {
        if (!state.multiAwaitDrain) {
          state.multiAwaitDrain = true;
          state.awaitDrainWriters = new SafeSet(state.awaitDrainWriters ? [state.awaitDrainWriters] : []);
        }
      }
      state.pipes.push(dest);
      debug2("pipe count=%d opts=%j", state.pipes.length, pipeOpts);
      const doEnd = (!pipeOpts || pipeOpts.end !== false) && dest !== process.stdout && dest !== process.stderr;
      const endFn = doEnd ? onend : unpipe;
      if (state.endEmitted) process.nextTick(endFn);
      else src.once("end", endFn);
      dest.on("unpipe", onunpipe);
      function onunpipe(readable, unpipeInfo) {
        debug2("onunpipe");
        if (readable === src) {
          if (unpipeInfo && unpipeInfo.hasUnpiped === false) {
            unpipeInfo.hasUnpiped = true;
            cleanup();
          }
        }
      }
      function onend() {
        debug2("onend");
        dest.end();
      }
      let ondrain;
      let cleanedUp = false;
      function cleanup() {
        debug2("cleanup");
        dest.removeListener("close", onclose);
        dest.removeListener("finish", onfinish);
        if (ondrain) {
          dest.removeListener("drain", ondrain);
        }
        dest.removeListener("error", onerror);
        dest.removeListener("unpipe", onunpipe);
        src.removeListener("end", onend);
        src.removeListener("end", unpipe);
        src.removeListener("data", ondata);
        cleanedUp = true;
        if (ondrain && state.awaitDrainWriters && (!dest._writableState || dest._writableState.needDrain)) ondrain();
      }
      function pause() {
        if (!cleanedUp) {
          if (state.pipes.length === 1 && state.pipes[0] === dest) {
            debug2("false write response, pause", 0);
            state.awaitDrainWriters = dest;
            state.multiAwaitDrain = false;
          } else if (state.pipes.length > 1 && state.pipes.includes(dest)) {
            debug2("false write response, pause", state.awaitDrainWriters.size);
            state.awaitDrainWriters.add(dest);
          }
          src.pause();
        }
        if (!ondrain) {
          ondrain = pipeOnDrain(src, dest);
          dest.on("drain", ondrain);
        }
      }
      src.on("data", ondata);
      function ondata(chunk) {
        debug2("ondata");
        const ret = dest.write(chunk);
        debug2("dest.write", ret);
        if (ret === false) {
          pause();
        }
      }
      function onerror(er) {
        debug2("onerror", er);
        unpipe();
        dest.removeListener("error", onerror);
        if (dest.listenerCount("error") === 0) {
          const s = dest._writableState || dest._readableState;
          if (s && !s.errorEmitted) {
            errorOrDestroy(dest, er);
          } else {
            dest.emit("error", er);
          }
        }
      }
      prependListener(dest, "error", onerror);
      function onclose() {
        dest.removeListener("finish", onfinish);
        unpipe();
      }
      dest.once("close", onclose);
      function onfinish() {
        debug2("onfinish");
        dest.removeListener("close", onclose);
        unpipe();
      }
      dest.once("finish", onfinish);
      function unpipe() {
        debug2("unpipe");
        src.unpipe(dest);
      }
      dest.emit("pipe", src);
      if (dest.writableNeedDrain === true) {
        pause();
      } else if (!state.flowing) {
        debug2("pipe resume");
        src.resume();
      }
      return dest;
    };
    function pipeOnDrain(src, dest) {
      return function pipeOnDrainFunctionResult() {
        const state = src._readableState;
        if (state.awaitDrainWriters === dest) {
          debug2("pipeOnDrain", 1);
          state.awaitDrainWriters = null;
        } else if (state.multiAwaitDrain) {
          debug2("pipeOnDrain", state.awaitDrainWriters.size);
          state.awaitDrainWriters.delete(dest);
        }
        if ((!state.awaitDrainWriters || state.awaitDrainWriters.size === 0) && src.listenerCount("data")) {
          src.resume();
        }
      };
    }
    Readable2.prototype.unpipe = function(dest) {
      const state = this._readableState;
      const unpipeInfo = {
        hasUnpiped: false
      };
      if (state.pipes.length === 0) return this;
      if (!dest) {
        const dests = state.pipes;
        state.pipes = [];
        this.pause();
        for (let i = 0; i < dests.length; i++)
          dests[i].emit("unpipe", this, {
            hasUnpiped: false
          });
        return this;
      }
      const index = ArrayPrototypeIndexOf(state.pipes, dest);
      if (index === -1) return this;
      state.pipes.splice(index, 1);
      if (state.pipes.length === 0) this.pause();
      dest.emit("unpipe", this, unpipeInfo);
      return this;
    };
    Readable2.prototype.on = function(ev, fn) {
      const res = Stream.prototype.on.call(this, ev, fn);
      const state = this._readableState;
      if (ev === "data") {
        state.readableListening = this.listenerCount("readable") > 0;
        if (state.flowing !== false) this.resume();
      } else if (ev === "readable") {
        if (!state.endEmitted && !state.readableListening) {
          state.readableListening = state.needReadable = true;
          state.flowing = false;
          state.emittedReadable = false;
          debug2("on readable", state.length, state.reading);
          if (state.length) {
            emitReadable(this);
          } else if (!state.reading) {
            process.nextTick(nReadingNextTick, this);
          }
        }
      }
      return res;
    };
    Readable2.prototype.addListener = Readable2.prototype.on;
    Readable2.prototype.removeListener = function(ev, fn) {
      const res = Stream.prototype.removeListener.call(this, ev, fn);
      if (ev === "readable") {
        process.nextTick(updateReadableListening, this);
      }
      return res;
    };
    Readable2.prototype.off = Readable2.prototype.removeListener;
    Readable2.prototype.removeAllListeners = function(ev) {
      const res = Stream.prototype.removeAllListeners.apply(this, arguments);
      if (ev === "readable" || ev === void 0) {
        process.nextTick(updateReadableListening, this);
      }
      return res;
    };
    function updateReadableListening(self2) {
      const state = self2._readableState;
      state.readableListening = self2.listenerCount("readable") > 0;
      if (state.resumeScheduled && state[kPaused] === false) {
        state.flowing = true;
      } else if (self2.listenerCount("data") > 0) {
        self2.resume();
      } else if (!state.readableListening) {
        state.flowing = null;
      }
    }
    function nReadingNextTick(self2) {
      debug2("readable nexttick read 0");
      self2.read(0);
    }
    Readable2.prototype.resume = function() {
      const state = this._readableState;
      if (!state.flowing) {
        debug2("resume");
        state.flowing = !state.readableListening;
        resume(this, state);
      }
      state[kPaused] = false;
      return this;
    };
    function resume(stream, state) {
      if (!state.resumeScheduled) {
        state.resumeScheduled = true;
        process.nextTick(resume_, stream, state);
      }
    }
    function resume_(stream, state) {
      debug2("resume", state.reading);
      if (!state.reading) {
        stream.read(0);
      }
      state.resumeScheduled = false;
      stream.emit("resume");
      flow(stream);
      if (state.flowing && !state.reading) stream.read(0);
    }
    Readable2.prototype.pause = function() {
      debug2("call pause flowing=%j", this._readableState.flowing);
      if (this._readableState.flowing !== false) {
        debug2("pause");
        this._readableState.flowing = false;
        this.emit("pause");
      }
      this._readableState[kPaused] = true;
      return this;
    };
    function flow(stream) {
      const state = stream._readableState;
      debug2("flow", state.flowing);
      while (state.flowing && stream.read() !== null) ;
    }
    Readable2.prototype.wrap = function(stream) {
      let paused = false;
      stream.on("data", (chunk) => {
        if (!this.push(chunk) && stream.pause) {
          paused = true;
          stream.pause();
        }
      });
      stream.on("end", () => {
        this.push(null);
      });
      stream.on("error", (err2) => {
        errorOrDestroy(this, err2);
      });
      stream.on("close", () => {
        this.destroy();
      });
      stream.on("destroy", () => {
        this.destroy();
      });
      this._read = () => {
        if (paused && stream.resume) {
          paused = false;
          stream.resume();
        }
      };
      const streamKeys = ObjectKeys(stream);
      for (let j = 1; j < streamKeys.length; j++) {
        const i = streamKeys[j];
        if (this[i] === void 0 && typeof stream[i] === "function") {
          this[i] = stream[i].bind(stream);
        }
      }
      return this;
    };
    Readable2.prototype[SymbolAsyncIterator] = function() {
      return streamToAsyncIterator(this);
    };
    Readable2.prototype.iterator = function(options) {
      if (options !== void 0) {
        validateObject(options, "options");
      }
      return streamToAsyncIterator(this, options);
    };
    function streamToAsyncIterator(stream, options) {
      if (typeof stream.read !== "function") {
        stream = Readable2.wrap(stream, {
          objectMode: true
        });
      }
      const iter = createAsyncIterator(stream, options);
      iter.stream = stream;
      return iter;
    }
    async function* createAsyncIterator(stream, options) {
      let callback = nop2;
      function next(resolve4) {
        if (this === stream) {
          callback();
          callback = nop2;
        } else {
          callback = resolve4;
        }
      }
      stream.on("readable", next);
      let error2;
      const cleanup = eos(
        stream,
        {
          writable: false
        },
        (err2) => {
          error2 = err2 ? aggregateTwoErrors(error2, err2) : null;
          callback();
          callback = nop2;
        }
      );
      try {
        while (true) {
          const chunk = stream.destroyed ? null : stream.read();
          if (chunk !== null) {
            yield chunk;
          } else if (error2) {
            throw error2;
          } else if (error2 === null) {
            return;
          } else {
            await new Promise2(next);
          }
        }
      } catch (err2) {
        error2 = aggregateTwoErrors(error2, err2);
        throw error2;
      } finally {
        if ((error2 || (options === null || options === void 0 ? void 0 : options.destroyOnReturn) !== false) && (error2 === void 0 || stream._readableState.autoDestroy)) {
          destroyImpl.destroyer(stream, null);
        } else {
          stream.off("readable", next);
          cleanup();
        }
      }
    }
    ObjectDefineProperties(Readable2.prototype, {
      readable: {
        __proto__: null,
        get() {
          const r = this._readableState;
          return !!r && r.readable !== false && !r.destroyed && !r.errorEmitted && !r.endEmitted;
        },
        set(val) {
          if (this._readableState) {
            this._readableState.readable = !!val;
          }
        }
      },
      readableDidRead: {
        __proto__: null,
        enumerable: false,
        get: function() {
          return this._readableState.dataEmitted;
        }
      },
      readableAborted: {
        __proto__: null,
        enumerable: false,
        get: function() {
          return !!(this._readableState.readable !== false && (this._readableState.destroyed || this._readableState.errored) && !this._readableState.endEmitted);
        }
      },
      readableHighWaterMark: {
        __proto__: null,
        enumerable: false,
        get: function() {
          return this._readableState.highWaterMark;
        }
      },
      readableBuffer: {
        __proto__: null,
        enumerable: false,
        get: function() {
          return this._readableState && this._readableState.buffer;
        }
      },
      readableFlowing: {
        __proto__: null,
        enumerable: false,
        get: function() {
          return this._readableState.flowing;
        },
        set: function(state) {
          if (this._readableState) {
            this._readableState.flowing = state;
          }
        }
      },
      readableLength: {
        __proto__: null,
        enumerable: false,
        get() {
          return this._readableState.length;
        }
      },
      readableObjectMode: {
        __proto__: null,
        enumerable: false,
        get() {
          return this._readableState ? this._readableState.objectMode : false;
        }
      },
      readableEncoding: {
        __proto__: null,
        enumerable: false,
        get() {
          return this._readableState ? this._readableState.encoding : null;
        }
      },
      errored: {
        __proto__: null,
        enumerable: false,
        get() {
          return this._readableState ? this._readableState.errored : null;
        }
      },
      closed: {
        __proto__: null,
        get() {
          return this._readableState ? this._readableState.closed : false;
        }
      },
      destroyed: {
        __proto__: null,
        enumerable: false,
        get() {
          return this._readableState ? this._readableState.destroyed : false;
        },
        set(value) {
          if (!this._readableState) {
            return;
          }
          this._readableState.destroyed = value;
        }
      },
      readableEnded: {
        __proto__: null,
        enumerable: false,
        get() {
          return this._readableState ? this._readableState.endEmitted : false;
        }
      }
    });
    ObjectDefineProperties(ReadableState.prototype, {
      // Legacy getter for `pipesCount`.
      pipesCount: {
        __proto__: null,
        get() {
          return this.pipes.length;
        }
      },
      // Legacy property for `paused`.
      paused: {
        __proto__: null,
        get() {
          return this[kPaused] !== false;
        },
        set(value) {
          this[kPaused] = !!value;
        }
      }
    });
    Readable2._fromList = fromList;
    function fromList(n, state) {
      if (state.length === 0) return null;
      let ret;
      if (state.objectMode) ret = state.buffer.shift();
      else if (!n || n >= state.length) {
        if (state.decoder) ret = state.buffer.join("");
        else if (state.buffer.length === 1) ret = state.buffer.first();
        else ret = state.buffer.concat(state.length);
        state.buffer.clear();
      } else {
        ret = state.buffer.consume(n, state.decoder);
      }
      return ret;
    }
    function endReadable(stream) {
      const state = stream._readableState;
      debug2("endReadable", state.endEmitted);
      if (!state.endEmitted) {
        state.ended = true;
        process.nextTick(endReadableNT, state, stream);
      }
    }
    function endReadableNT(state, stream) {
      debug2("endReadableNT", state.endEmitted, state.length);
      if (!state.errored && !state.closeEmitted && !state.endEmitted && state.length === 0) {
        state.endEmitted = true;
        stream.emit("end");
        if (stream.writable && stream.allowHalfOpen === false) {
          process.nextTick(endWritableNT, stream);
        } else if (state.autoDestroy) {
          const wState = stream._writableState;
          const autoDestroy = !wState || wState.autoDestroy && // We don't expect the writable to ever 'finish'
          // if writable is explicitly set to false.
          (wState.finished || wState.writable === false);
          if (autoDestroy) {
            stream.destroy();
          }
        }
      }
    }
    function endWritableNT(stream) {
      const writable = stream.writable && !stream.writableEnded && !stream.destroyed;
      if (writable) {
        stream.end();
      }
    }
    Readable2.from = function(iterable, opts) {
      return from2(Readable2, iterable, opts);
    };
    var webStreamsAdapters;
    function lazyWebStreams() {
      if (webStreamsAdapters === void 0) webStreamsAdapters = {};
      return webStreamsAdapters;
    }
    Readable2.fromWeb = function(readableStream, options) {
      return lazyWebStreams().newStreamReadableFromReadableStream(readableStream, options);
    };
    Readable2.toWeb = function(streamReadable, options) {
      return lazyWebStreams().newReadableStreamFromStreamReadable(streamReadable, options);
    };
    Readable2.wrap = function(src, options) {
      var _ref, _src$readableObjectMo;
      return new Readable2({
        objectMode: (_ref = (_src$readableObjectMo = src.readableObjectMode) !== null && _src$readableObjectMo !== void 0 ? _src$readableObjectMo : src.objectMode) !== null && _ref !== void 0 ? _ref : true,
        ...options,
        destroy(err2, callback) {
          destroyImpl.destroyer(src, err2);
          callback(err2);
        }
      }).wrap(src);
    };
  }
});

// node_modules/readable-stream/lib/internal/streams/writable.js
var require_writable = __commonJS({
  "node_modules/readable-stream/lib/internal/streams/writable.js"(exports, module) {
    "use strict";
    var process = require_browser2();
    var {
      ArrayPrototypeSlice,
      Error: Error2,
      FunctionPrototypeSymbolHasInstance,
      ObjectDefineProperty,
      ObjectDefineProperties,
      ObjectSetPrototypeOf,
      StringPrototypeToLowerCase,
      Symbol: Symbol2,
      SymbolHasInstance
    } = require_primordials();
    module.exports = Writable2;
    Writable2.WritableState = WritableState;
    var { EventEmitter: EE } = require_events();
    var Stream = require_legacy().Stream;
    var { Buffer: Buffer8 } = require_buffer();
    var destroyImpl = require_destroy();
    var { addAbortSignal } = require_add_abort_signal();
    var { getHighWaterMark, getDefaultHighWaterMark } = require_state();
    var {
      ERR_INVALID_ARG_TYPE,
      ERR_METHOD_NOT_IMPLEMENTED,
      ERR_MULTIPLE_CALLBACK,
      ERR_STREAM_CANNOT_PIPE,
      ERR_STREAM_DESTROYED,
      ERR_STREAM_ALREADY_FINISHED,
      ERR_STREAM_NULL_VALUES,
      ERR_STREAM_WRITE_AFTER_END,
      ERR_UNKNOWN_ENCODING
    } = require_errors().codes;
    var { errorOrDestroy } = destroyImpl;
    ObjectSetPrototypeOf(Writable2.prototype, Stream.prototype);
    ObjectSetPrototypeOf(Writable2, Stream);
    function nop2() {
    }
    var kOnFinished = Symbol2("kOnFinished");
    function WritableState(options, stream, isDuplex) {
      if (typeof isDuplex !== "boolean") isDuplex = stream instanceof require_duplex();
      this.objectMode = !!(options && options.objectMode);
      if (isDuplex) this.objectMode = this.objectMode || !!(options && options.writableObjectMode);
      this.highWaterMark = options ? getHighWaterMark(this, options, "writableHighWaterMark", isDuplex) : getDefaultHighWaterMark(false);
      this.finalCalled = false;
      this.needDrain = false;
      this.ending = false;
      this.ended = false;
      this.finished = false;
      this.destroyed = false;
      const noDecode = !!(options && options.decodeStrings === false);
      this.decodeStrings = !noDecode;
      this.defaultEncoding = options && options.defaultEncoding || "utf8";
      this.length = 0;
      this.writing = false;
      this.corked = 0;
      this.sync = true;
      this.bufferProcessing = false;
      this.onwrite = onwrite.bind(void 0, stream);
      this.writecb = null;
      this.writelen = 0;
      this.afterWriteTickInfo = null;
      resetBuffer(this);
      this.pendingcb = 0;
      this.constructed = true;
      this.prefinished = false;
      this.errorEmitted = false;
      this.emitClose = !options || options.emitClose !== false;
      this.autoDestroy = !options || options.autoDestroy !== false;
      this.errored = null;
      this.closed = false;
      this.closeEmitted = false;
      this[kOnFinished] = [];
    }
    function resetBuffer(state) {
      state.buffered = [];
      state.bufferedIndex = 0;
      state.allBuffers = true;
      state.allNoop = true;
    }
    WritableState.prototype.getBuffer = function getBuffer() {
      return ArrayPrototypeSlice(this.buffered, this.bufferedIndex);
    };
    ObjectDefineProperty(WritableState.prototype, "bufferedRequestCount", {
      __proto__: null,
      get() {
        return this.buffered.length - this.bufferedIndex;
      }
    });
    function Writable2(options) {
      const isDuplex = this instanceof require_duplex();
      if (!isDuplex && !FunctionPrototypeSymbolHasInstance(Writable2, this)) return new Writable2(options);
      this._writableState = new WritableState(options, this, isDuplex);
      if (options) {
        if (typeof options.write === "function") this._write = options.write;
        if (typeof options.writev === "function") this._writev = options.writev;
        if (typeof options.destroy === "function") this._destroy = options.destroy;
        if (typeof options.final === "function") this._final = options.final;
        if (typeof options.construct === "function") this._construct = options.construct;
        if (options.signal) addAbortSignal(options.signal, this);
      }
      Stream.call(this, options);
      destroyImpl.construct(this, () => {
        const state = this._writableState;
        if (!state.writing) {
          clearBuffer(this, state);
        }
        finishMaybe(this, state);
      });
    }
    ObjectDefineProperty(Writable2, SymbolHasInstance, {
      __proto__: null,
      value: function(object) {
        if (FunctionPrototypeSymbolHasInstance(this, object)) return true;
        if (this !== Writable2) return false;
        return object && object._writableState instanceof WritableState;
      }
    });
    Writable2.prototype.pipe = function() {
      errorOrDestroy(this, new ERR_STREAM_CANNOT_PIPE());
    };
    function _write(stream, chunk, encoding, cb) {
      const state = stream._writableState;
      if (typeof encoding === "function") {
        cb = encoding;
        encoding = state.defaultEncoding;
      } else {
        if (!encoding) encoding = state.defaultEncoding;
        else if (encoding !== "buffer" && !Buffer8.isEncoding(encoding)) throw new ERR_UNKNOWN_ENCODING(encoding);
        if (typeof cb !== "function") cb = nop2;
      }
      if (chunk === null) {
        throw new ERR_STREAM_NULL_VALUES();
      } else if (!state.objectMode) {
        if (typeof chunk === "string") {
          if (state.decodeStrings !== false) {
            chunk = Buffer8.from(chunk, encoding);
            encoding = "buffer";
          }
        } else if (chunk instanceof Buffer8) {
          encoding = "buffer";
        } else if (Stream._isUint8Array(chunk)) {
          chunk = Stream._uint8ArrayToBuffer(chunk);
          encoding = "buffer";
        } else {
          throw new ERR_INVALID_ARG_TYPE("chunk", ["string", "Buffer", "Uint8Array"], chunk);
        }
      }
      let err2;
      if (state.ending) {
        err2 = new ERR_STREAM_WRITE_AFTER_END();
      } else if (state.destroyed) {
        err2 = new ERR_STREAM_DESTROYED("write");
      }
      if (err2) {
        process.nextTick(cb, err2);
        errorOrDestroy(stream, err2, true);
        return err2;
      }
      state.pendingcb++;
      return writeOrBuffer(stream, state, chunk, encoding, cb);
    }
    Writable2.prototype.write = function(chunk, encoding, cb) {
      return _write(this, chunk, encoding, cb) === true;
    };
    Writable2.prototype.cork = function() {
      this._writableState.corked++;
    };
    Writable2.prototype.uncork = function() {
      const state = this._writableState;
      if (state.corked) {
        state.corked--;
        if (!state.writing) clearBuffer(this, state);
      }
    };
    Writable2.prototype.setDefaultEncoding = function setDefaultEncoding(encoding) {
      if (typeof encoding === "string") encoding = StringPrototypeToLowerCase(encoding);
      if (!Buffer8.isEncoding(encoding)) throw new ERR_UNKNOWN_ENCODING(encoding);
      this._writableState.defaultEncoding = encoding;
      return this;
    };
    function writeOrBuffer(stream, state, chunk, encoding, callback) {
      const len = state.objectMode ? 1 : chunk.length;
      state.length += len;
      const ret = state.length < state.highWaterMark;
      if (!ret) state.needDrain = true;
      if (state.writing || state.corked || state.errored || !state.constructed) {
        state.buffered.push({
          chunk,
          encoding,
          callback
        });
        if (state.allBuffers && encoding !== "buffer") {
          state.allBuffers = false;
        }
        if (state.allNoop && callback !== nop2) {
          state.allNoop = false;
        }
      } else {
        state.writelen = len;
        state.writecb = callback;
        state.writing = true;
        state.sync = true;
        stream._write(chunk, encoding, state.onwrite);
        state.sync = false;
      }
      return ret && !state.errored && !state.destroyed;
    }
    function doWrite(stream, state, writev2, len, chunk, encoding, cb) {
      state.writelen = len;
      state.writecb = cb;
      state.writing = true;
      state.sync = true;
      if (state.destroyed) state.onwrite(new ERR_STREAM_DESTROYED("write"));
      else if (writev2) stream._writev(chunk, state.onwrite);
      else stream._write(chunk, encoding, state.onwrite);
      state.sync = false;
    }
    function onwriteError(stream, state, er, cb) {
      --state.pendingcb;
      cb(er);
      errorBuffer(state);
      errorOrDestroy(stream, er);
    }
    function onwrite(stream, er) {
      const state = stream._writableState;
      const sync = state.sync;
      const cb = state.writecb;
      if (typeof cb !== "function") {
        errorOrDestroy(stream, new ERR_MULTIPLE_CALLBACK());
        return;
      }
      state.writing = false;
      state.writecb = null;
      state.length -= state.writelen;
      state.writelen = 0;
      if (er) {
        er.stack;
        if (!state.errored) {
          state.errored = er;
        }
        if (stream._readableState && !stream._readableState.errored) {
          stream._readableState.errored = er;
        }
        if (sync) {
          process.nextTick(onwriteError, stream, state, er, cb);
        } else {
          onwriteError(stream, state, er, cb);
        }
      } else {
        if (state.buffered.length > state.bufferedIndex) {
          clearBuffer(stream, state);
        }
        if (sync) {
          if (state.afterWriteTickInfo !== null && state.afterWriteTickInfo.cb === cb) {
            state.afterWriteTickInfo.count++;
          } else {
            state.afterWriteTickInfo = {
              count: 1,
              cb,
              stream,
              state
            };
            process.nextTick(afterWriteTick, state.afterWriteTickInfo);
          }
        } else {
          afterWrite(stream, state, 1, cb);
        }
      }
    }
    function afterWriteTick({ stream, state, count, cb }) {
      state.afterWriteTickInfo = null;
      return afterWrite(stream, state, count, cb);
    }
    function afterWrite(stream, state, count, cb) {
      const needDrain = !state.ending && !stream.destroyed && state.length === 0 && state.needDrain;
      if (needDrain) {
        state.needDrain = false;
        stream.emit("drain");
      }
      while (count-- > 0) {
        state.pendingcb--;
        cb();
      }
      if (state.destroyed) {
        errorBuffer(state);
      }
      finishMaybe(stream, state);
    }
    function errorBuffer(state) {
      if (state.writing) {
        return;
      }
      for (let n = state.bufferedIndex; n < state.buffered.length; ++n) {
        var _state$errored;
        const { chunk, callback } = state.buffered[n];
        const len = state.objectMode ? 1 : chunk.length;
        state.length -= len;
        callback(
          (_state$errored = state.errored) !== null && _state$errored !== void 0 ? _state$errored : new ERR_STREAM_DESTROYED("write")
        );
      }
      const onfinishCallbacks = state[kOnFinished].splice(0);
      for (let i = 0; i < onfinishCallbacks.length; i++) {
        var _state$errored2;
        onfinishCallbacks[i](
          (_state$errored2 = state.errored) !== null && _state$errored2 !== void 0 ? _state$errored2 : new ERR_STREAM_DESTROYED("end")
        );
      }
      resetBuffer(state);
    }
    function clearBuffer(stream, state) {
      if (state.corked || state.bufferProcessing || state.destroyed || !state.constructed) {
        return;
      }
      const { buffered, bufferedIndex, objectMode } = state;
      const bufferedLength = buffered.length - bufferedIndex;
      if (!bufferedLength) {
        return;
      }
      let i = bufferedIndex;
      state.bufferProcessing = true;
      if (bufferedLength > 1 && stream._writev) {
        state.pendingcb -= bufferedLength - 1;
        const callback = state.allNoop ? nop2 : (err2) => {
          for (let n = i; n < buffered.length; ++n) {
            buffered[n].callback(err2);
          }
        };
        const chunks = state.allNoop && i === 0 ? buffered : ArrayPrototypeSlice(buffered, i);
        chunks.allBuffers = state.allBuffers;
        doWrite(stream, state, true, state.length, chunks, "", callback);
        resetBuffer(state);
      } else {
        do {
          const { chunk, encoding, callback } = buffered[i];
          buffered[i++] = null;
          const len = objectMode ? 1 : chunk.length;
          doWrite(stream, state, false, len, chunk, encoding, callback);
        } while (i < buffered.length && !state.writing);
        if (i === buffered.length) {
          resetBuffer(state);
        } else if (i > 256) {
          buffered.splice(0, i);
          state.bufferedIndex = 0;
        } else {
          state.bufferedIndex = i;
        }
      }
      state.bufferProcessing = false;
    }
    Writable2.prototype._write = function(chunk, encoding, cb) {
      if (this._writev) {
        this._writev(
          [
            {
              chunk,
              encoding
            }
          ],
          cb
        );
      } else {
        throw new ERR_METHOD_NOT_IMPLEMENTED("_write()");
      }
    };
    Writable2.prototype._writev = null;
    Writable2.prototype.end = function(chunk, encoding, cb) {
      const state = this._writableState;
      if (typeof chunk === "function") {
        cb = chunk;
        chunk = null;
        encoding = null;
      } else if (typeof encoding === "function") {
        cb = encoding;
        encoding = null;
      }
      let err2;
      if (chunk !== null && chunk !== void 0) {
        const ret = _write(this, chunk, encoding);
        if (ret instanceof Error2) {
          err2 = ret;
        }
      }
      if (state.corked) {
        state.corked = 1;
        this.uncork();
      }
      if (err2) {
      } else if (!state.errored && !state.ending) {
        state.ending = true;
        finishMaybe(this, state, true);
        state.ended = true;
      } else if (state.finished) {
        err2 = new ERR_STREAM_ALREADY_FINISHED("end");
      } else if (state.destroyed) {
        err2 = new ERR_STREAM_DESTROYED("end");
      }
      if (typeof cb === "function") {
        if (err2 || state.finished) {
          process.nextTick(cb, err2);
        } else {
          state[kOnFinished].push(cb);
        }
      }
      return this;
    };
    function needFinish(state) {
      return state.ending && !state.destroyed && state.constructed && state.length === 0 && !state.errored && state.buffered.length === 0 && !state.finished && !state.writing && !state.errorEmitted && !state.closeEmitted;
    }
    function callFinal(stream, state) {
      let called = false;
      function onFinish(err2) {
        if (called) {
          errorOrDestroy(stream, err2 !== null && err2 !== void 0 ? err2 : ERR_MULTIPLE_CALLBACK());
          return;
        }
        called = true;
        state.pendingcb--;
        if (err2) {
          const onfinishCallbacks = state[kOnFinished].splice(0);
          for (let i = 0; i < onfinishCallbacks.length; i++) {
            onfinishCallbacks[i](err2);
          }
          errorOrDestroy(stream, err2, state.sync);
        } else if (needFinish(state)) {
          state.prefinished = true;
          stream.emit("prefinish");
          state.pendingcb++;
          process.nextTick(finish, stream, state);
        }
      }
      state.sync = true;
      state.pendingcb++;
      try {
        stream._final(onFinish);
      } catch (err2) {
        onFinish(err2);
      }
      state.sync = false;
    }
    function prefinish(stream, state) {
      if (!state.prefinished && !state.finalCalled) {
        if (typeof stream._final === "function" && !state.destroyed) {
          state.finalCalled = true;
          callFinal(stream, state);
        } else {
          state.prefinished = true;
          stream.emit("prefinish");
        }
      }
    }
    function finishMaybe(stream, state, sync) {
      if (needFinish(state)) {
        prefinish(stream, state);
        if (state.pendingcb === 0) {
          if (sync) {
            state.pendingcb++;
            process.nextTick(
              (stream2, state2) => {
                if (needFinish(state2)) {
                  finish(stream2, state2);
                } else {
                  state2.pendingcb--;
                }
              },
              stream,
              state
            );
          } else if (needFinish(state)) {
            state.pendingcb++;
            finish(stream, state);
          }
        }
      }
    }
    function finish(stream, state) {
      state.pendingcb--;
      state.finished = true;
      const onfinishCallbacks = state[kOnFinished].splice(0);
      for (let i = 0; i < onfinishCallbacks.length; i++) {
        onfinishCallbacks[i]();
      }
      stream.emit("finish");
      if (state.autoDestroy) {
        const rState = stream._readableState;
        const autoDestroy = !rState || rState.autoDestroy && // We don't expect the readable to ever 'end'
        // if readable is explicitly set to false.
        (rState.endEmitted || rState.readable === false);
        if (autoDestroy) {
          stream.destroy();
        }
      }
    }
    ObjectDefineProperties(Writable2.prototype, {
      closed: {
        __proto__: null,
        get() {
          return this._writableState ? this._writableState.closed : false;
        }
      },
      destroyed: {
        __proto__: null,
        get() {
          return this._writableState ? this._writableState.destroyed : false;
        },
        set(value) {
          if (this._writableState) {
            this._writableState.destroyed = value;
          }
        }
      },
      writable: {
        __proto__: null,
        get() {
          const w = this._writableState;
          return !!w && w.writable !== false && !w.destroyed && !w.errored && !w.ending && !w.ended;
        },
        set(val) {
          if (this._writableState) {
            this._writableState.writable = !!val;
          }
        }
      },
      writableFinished: {
        __proto__: null,
        get() {
          return this._writableState ? this._writableState.finished : false;
        }
      },
      writableObjectMode: {
        __proto__: null,
        get() {
          return this._writableState ? this._writableState.objectMode : false;
        }
      },
      writableBuffer: {
        __proto__: null,
        get() {
          return this._writableState && this._writableState.getBuffer();
        }
      },
      writableEnded: {
        __proto__: null,
        get() {
          return this._writableState ? this._writableState.ending : false;
        }
      },
      writableNeedDrain: {
        __proto__: null,
        get() {
          const wState = this._writableState;
          if (!wState) return false;
          return !wState.destroyed && !wState.ending && wState.needDrain;
        }
      },
      writableHighWaterMark: {
        __proto__: null,
        get() {
          return this._writableState && this._writableState.highWaterMark;
        }
      },
      writableCorked: {
        __proto__: null,
        get() {
          return this._writableState ? this._writableState.corked : 0;
        }
      },
      writableLength: {
        __proto__: null,
        get() {
          return this._writableState && this._writableState.length;
        }
      },
      errored: {
        __proto__: null,
        enumerable: false,
        get() {
          return this._writableState ? this._writableState.errored : null;
        }
      },
      writableAborted: {
        __proto__: null,
        enumerable: false,
        get: function() {
          return !!(this._writableState.writable !== false && (this._writableState.destroyed || this._writableState.errored) && !this._writableState.finished);
        }
      }
    });
    var destroy = destroyImpl.destroy;
    Writable2.prototype.destroy = function(err2, cb) {
      const state = this._writableState;
      if (!state.destroyed && (state.bufferedIndex < state.buffered.length || state[kOnFinished].length)) {
        process.nextTick(errorBuffer, state);
      }
      destroy.call(this, err2, cb);
      return this;
    };
    Writable2.prototype._undestroy = destroyImpl.undestroy;
    Writable2.prototype._destroy = function(err2, cb) {
      cb(err2);
    };
    Writable2.prototype[EE.captureRejectionSymbol] = function(err2) {
      this.destroy(err2);
    };
    var webStreamsAdapters;
    function lazyWebStreams() {
      if (webStreamsAdapters === void 0) webStreamsAdapters = {};
      return webStreamsAdapters;
    }
    Writable2.fromWeb = function(writableStream, options) {
      return lazyWebStreams().newStreamWritableFromWritableStream(writableStream, options);
    };
    Writable2.toWeb = function(streamWritable) {
      return lazyWebStreams().newWritableStreamFromStreamWritable(streamWritable);
    };
  }
});

// node_modules/readable-stream/lib/internal/streams/duplexify.js
var require_duplexify = __commonJS({
  "node_modules/readable-stream/lib/internal/streams/duplexify.js"(exports, module) {
    var process = require_browser2();
    var bufferModule = require_buffer();
    var {
      isReadable,
      isWritable,
      isIterable,
      isNodeStream,
      isReadableNodeStream,
      isWritableNodeStream,
      isDuplexNodeStream,
      isReadableStream,
      isWritableStream
    } = require_utils();
    var eos = require_end_of_stream();
    var {
      AbortError,
      codes: { ERR_INVALID_ARG_TYPE, ERR_INVALID_RETURN_VALUE }
    } = require_errors();
    var { destroyer } = require_destroy();
    var Duplex = require_duplex();
    var Readable2 = require_readable();
    var Writable2 = require_writable();
    var { createDeferredPromise } = require_util();
    var from2 = require_from();
    var Blob2 = globalThis.Blob || bufferModule.Blob;
    var isBlob = typeof Blob2 !== "undefined" ? function isBlob2(b) {
      return b instanceof Blob2;
    } : function isBlob2(b) {
      return false;
    };
    var AbortController = globalThis.AbortController || require_browser().AbortController;
    var { FunctionPrototypeCall } = require_primordials();
    var Duplexify = class extends Duplex {
      constructor(options) {
        super(options);
        if ((options === null || options === void 0 ? void 0 : options.readable) === false) {
          this._readableState.readable = false;
          this._readableState.ended = true;
          this._readableState.endEmitted = true;
        }
        if ((options === null || options === void 0 ? void 0 : options.writable) === false) {
          this._writableState.writable = false;
          this._writableState.ending = true;
          this._writableState.ended = true;
          this._writableState.finished = true;
        }
      }
    };
    module.exports = function duplexify(body, name) {
      if (isDuplexNodeStream(body)) {
        return body;
      }
      if (isReadableNodeStream(body)) {
        return _duplexify({
          readable: body
        });
      }
      if (isWritableNodeStream(body)) {
        return _duplexify({
          writable: body
        });
      }
      if (isNodeStream(body)) {
        return _duplexify({
          writable: false,
          readable: false
        });
      }
      if (isReadableStream(body)) {
        return _duplexify({
          readable: Readable2.fromWeb(body)
        });
      }
      if (isWritableStream(body)) {
        return _duplexify({
          writable: Writable2.fromWeb(body)
        });
      }
      if (typeof body === "function") {
        const { value, write: write2, final, destroy } = fromAsyncGen(body);
        if (isIterable(value)) {
          return from2(Duplexify, value, {
            // TODO (ronag): highWaterMark?
            objectMode: true,
            write: write2,
            final,
            destroy
          });
        }
        const then2 = value === null || value === void 0 ? void 0 : value.then;
        if (typeof then2 === "function") {
          let d;
          const promise = FunctionPrototypeCall(
            then2,
            value,
            (val) => {
              if (val != null) {
                throw new ERR_INVALID_RETURN_VALUE("nully", "body", val);
              }
            },
            (err2) => {
              destroyer(d, err2);
            }
          );
          return d = new Duplexify({
            // TODO (ronag): highWaterMark?
            objectMode: true,
            readable: false,
            write: write2,
            final(cb) {
              final(async () => {
                try {
                  await promise;
                  process.nextTick(cb, null);
                } catch (err2) {
                  process.nextTick(cb, err2);
                }
              });
            },
            destroy
          });
        }
        throw new ERR_INVALID_RETURN_VALUE("Iterable, AsyncIterable or AsyncFunction", name, value);
      }
      if (isBlob(body)) {
        return duplexify(body.arrayBuffer());
      }
      if (isIterable(body)) {
        return from2(Duplexify, body, {
          // TODO (ronag): highWaterMark?
          objectMode: true,
          writable: false
        });
      }
      if (isReadableStream(body === null || body === void 0 ? void 0 : body.readable) && isWritableStream(body === null || body === void 0 ? void 0 : body.writable)) {
        return Duplexify.fromWeb(body);
      }
      if (typeof (body === null || body === void 0 ? void 0 : body.writable) === "object" || typeof (body === null || body === void 0 ? void 0 : body.readable) === "object") {
        const readable = body !== null && body !== void 0 && body.readable ? isReadableNodeStream(body === null || body === void 0 ? void 0 : body.readable) ? body === null || body === void 0 ? void 0 : body.readable : duplexify(body.readable) : void 0;
        const writable = body !== null && body !== void 0 && body.writable ? isWritableNodeStream(body === null || body === void 0 ? void 0 : body.writable) ? body === null || body === void 0 ? void 0 : body.writable : duplexify(body.writable) : void 0;
        return _duplexify({
          readable,
          writable
        });
      }
      const then = body === null || body === void 0 ? void 0 : body.then;
      if (typeof then === "function") {
        let d;
        FunctionPrototypeCall(
          then,
          body,
          (val) => {
            if (val != null) {
              d.push(val);
            }
            d.push(null);
          },
          (err2) => {
            destroyer(d, err2);
          }
        );
        return d = new Duplexify({
          objectMode: true,
          writable: false,
          read() {
          }
        });
      }
      throw new ERR_INVALID_ARG_TYPE(
        name,
        [
          "Blob",
          "ReadableStream",
          "WritableStream",
          "Stream",
          "Iterable",
          "AsyncIterable",
          "Function",
          "{ readable, writable } pair",
          "Promise"
        ],
        body
      );
    };
    function fromAsyncGen(fn) {
      let { promise, resolve: resolve4 } = createDeferredPromise();
      const ac = new AbortController();
      const signal = ac.signal;
      const value = fn(
        (async function* () {
          while (true) {
            const _promise = promise;
            promise = null;
            const { chunk, done, cb } = await _promise;
            process.nextTick(cb);
            if (done) return;
            if (signal.aborted)
              throw new AbortError(void 0, {
                cause: signal.reason
              });
            ({ promise, resolve: resolve4 } = createDeferredPromise());
            yield chunk;
          }
        })(),
        {
          signal
        }
      );
      return {
        value,
        write(chunk, encoding, cb) {
          const _resolve = resolve4;
          resolve4 = null;
          _resolve({
            chunk,
            done: false,
            cb
          });
        },
        final(cb) {
          const _resolve = resolve4;
          resolve4 = null;
          _resolve({
            done: true,
            cb
          });
        },
        destroy(err2, cb) {
          ac.abort();
          cb(err2);
        }
      };
    }
    function _duplexify(pair) {
      const r = pair.readable && typeof pair.readable.read !== "function" ? Readable2.wrap(pair.readable) : pair.readable;
      const w = pair.writable;
      let readable = !!isReadable(r);
      let writable = !!isWritable(w);
      let ondrain;
      let onfinish;
      let onreadable;
      let onclose;
      let d;
      function onfinished(err2) {
        const cb = onclose;
        onclose = null;
        if (cb) {
          cb(err2);
        } else if (err2) {
          d.destroy(err2);
        }
      }
      d = new Duplexify({
        // TODO (ronag): highWaterMark?
        readableObjectMode: !!(r !== null && r !== void 0 && r.readableObjectMode),
        writableObjectMode: !!(w !== null && w !== void 0 && w.writableObjectMode),
        readable,
        writable
      });
      if (writable) {
        eos(w, (err2) => {
          writable = false;
          if (err2) {
            destroyer(r, err2);
          }
          onfinished(err2);
        });
        d._write = function(chunk, encoding, callback) {
          if (w.write(chunk, encoding)) {
            callback();
          } else {
            ondrain = callback;
          }
        };
        d._final = function(callback) {
          w.end();
          onfinish = callback;
        };
        w.on("drain", function() {
          if (ondrain) {
            const cb = ondrain;
            ondrain = null;
            cb();
          }
        });
        w.on("finish", function() {
          if (onfinish) {
            const cb = onfinish;
            onfinish = null;
            cb();
          }
        });
      }
      if (readable) {
        eos(r, (err2) => {
          readable = false;
          if (err2) {
            destroyer(r, err2);
          }
          onfinished(err2);
        });
        r.on("readable", function() {
          if (onreadable) {
            const cb = onreadable;
            onreadable = null;
            cb();
          }
        });
        r.on("end", function() {
          d.push(null);
        });
        d._read = function() {
          while (true) {
            const buf = r.read();
            if (buf === null) {
              onreadable = d._read;
              return;
            }
            if (!d.push(buf)) {
              return;
            }
          }
        };
      }
      d._destroy = function(err2, callback) {
        if (!err2 && onclose !== null) {
          err2 = new AbortError();
        }
        onreadable = null;
        ondrain = null;
        onfinish = null;
        if (onclose === null) {
          callback(err2);
        } else {
          onclose = callback;
          destroyer(w, err2);
          destroyer(r, err2);
        }
      };
      return d;
    }
  }
});

// node_modules/readable-stream/lib/internal/streams/duplex.js
var require_duplex = __commonJS({
  "node_modules/readable-stream/lib/internal/streams/duplex.js"(exports, module) {
    "use strict";
    var {
      ObjectDefineProperties,
      ObjectGetOwnPropertyDescriptor,
      ObjectKeys,
      ObjectSetPrototypeOf
    } = require_primordials();
    module.exports = Duplex;
    var Readable2 = require_readable();
    var Writable2 = require_writable();
    ObjectSetPrototypeOf(Duplex.prototype, Readable2.prototype);
    ObjectSetPrototypeOf(Duplex, Readable2);
    {
      const keys = ObjectKeys(Writable2.prototype);
      for (let i = 0; i < keys.length; i++) {
        const method = keys[i];
        if (!Duplex.prototype[method]) Duplex.prototype[method] = Writable2.prototype[method];
      }
    }
    function Duplex(options) {
      if (!(this instanceof Duplex)) return new Duplex(options);
      Readable2.call(this, options);
      Writable2.call(this, options);
      if (options) {
        this.allowHalfOpen = options.allowHalfOpen !== false;
        if (options.readable === false) {
          this._readableState.readable = false;
          this._readableState.ended = true;
          this._readableState.endEmitted = true;
        }
        if (options.writable === false) {
          this._writableState.writable = false;
          this._writableState.ending = true;
          this._writableState.ended = true;
          this._writableState.finished = true;
        }
      } else {
        this.allowHalfOpen = true;
      }
    }
    ObjectDefineProperties(Duplex.prototype, {
      writable: {
        __proto__: null,
        ...ObjectGetOwnPropertyDescriptor(Writable2.prototype, "writable")
      },
      writableHighWaterMark: {
        __proto__: null,
        ...ObjectGetOwnPropertyDescriptor(Writable2.prototype, "writableHighWaterMark")
      },
      writableObjectMode: {
        __proto__: null,
        ...ObjectGetOwnPropertyDescriptor(Writable2.prototype, "writableObjectMode")
      },
      writableBuffer: {
        __proto__: null,
        ...ObjectGetOwnPropertyDescriptor(Writable2.prototype, "writableBuffer")
      },
      writableLength: {
        __proto__: null,
        ...ObjectGetOwnPropertyDescriptor(Writable2.prototype, "writableLength")
      },
      writableFinished: {
        __proto__: null,
        ...ObjectGetOwnPropertyDescriptor(Writable2.prototype, "writableFinished")
      },
      writableCorked: {
        __proto__: null,
        ...ObjectGetOwnPropertyDescriptor(Writable2.prototype, "writableCorked")
      },
      writableEnded: {
        __proto__: null,
        ...ObjectGetOwnPropertyDescriptor(Writable2.prototype, "writableEnded")
      },
      writableNeedDrain: {
        __proto__: null,
        ...ObjectGetOwnPropertyDescriptor(Writable2.prototype, "writableNeedDrain")
      },
      destroyed: {
        __proto__: null,
        get() {
          if (this._readableState === void 0 || this._writableState === void 0) {
            return false;
          }
          return this._readableState.destroyed && this._writableState.destroyed;
        },
        set(value) {
          if (this._readableState && this._writableState) {
            this._readableState.destroyed = value;
            this._writableState.destroyed = value;
          }
        }
      }
    });
    var webStreamsAdapters;
    function lazyWebStreams() {
      if (webStreamsAdapters === void 0) webStreamsAdapters = {};
      return webStreamsAdapters;
    }
    Duplex.fromWeb = function(pair, options) {
      return lazyWebStreams().newStreamDuplexFromReadableWritablePair(pair, options);
    };
    Duplex.toWeb = function(duplex) {
      return lazyWebStreams().newReadableWritablePairFromDuplex(duplex);
    };
    var duplexify;
    Duplex.from = function(body) {
      if (!duplexify) {
        duplexify = require_duplexify();
      }
      return duplexify(body, "body");
    };
  }
});

// node_modules/readable-stream/lib/internal/streams/transform.js
var require_transform = __commonJS({
  "node_modules/readable-stream/lib/internal/streams/transform.js"(exports, module) {
    "use strict";
    var { ObjectSetPrototypeOf, Symbol: Symbol2 } = require_primordials();
    module.exports = Transform;
    var { ERR_METHOD_NOT_IMPLEMENTED } = require_errors().codes;
    var Duplex = require_duplex();
    var { getHighWaterMark } = require_state();
    ObjectSetPrototypeOf(Transform.prototype, Duplex.prototype);
    ObjectSetPrototypeOf(Transform, Duplex);
    var kCallback = Symbol2("kCallback");
    function Transform(options) {
      if (!(this instanceof Transform)) return new Transform(options);
      const readableHighWaterMark = options ? getHighWaterMark(this, options, "readableHighWaterMark", true) : null;
      if (readableHighWaterMark === 0) {
        options = {
          ...options,
          highWaterMark: null,
          readableHighWaterMark,
          // TODO (ronag): 0 is not optimal since we have
          // a "bug" where we check needDrain before calling _write and not after.
          // Refs: https://github.com/nodejs/node/pull/32887
          // Refs: https://github.com/nodejs/node/pull/35941
          writableHighWaterMark: options.writableHighWaterMark || 0
        };
      }
      Duplex.call(this, options);
      this._readableState.sync = false;
      this[kCallback] = null;
      if (options) {
        if (typeof options.transform === "function") this._transform = options.transform;
        if (typeof options.flush === "function") this._flush = options.flush;
      }
      this.on("prefinish", prefinish);
    }
    function final(cb) {
      if (typeof this._flush === "function" && !this.destroyed) {
        this._flush((er, data) => {
          if (er) {
            if (cb) {
              cb(er);
            } else {
              this.destroy(er);
            }
            return;
          }
          if (data != null) {
            this.push(data);
          }
          this.push(null);
          if (cb) {
            cb();
          }
        });
      } else {
        this.push(null);
        if (cb) {
          cb();
        }
      }
    }
    function prefinish() {
      if (this._final !== final) {
        final.call(this);
      }
    }
    Transform.prototype._final = final;
    Transform.prototype._transform = function(chunk, encoding, callback) {
      throw new ERR_METHOD_NOT_IMPLEMENTED("_transform()");
    };
    Transform.prototype._write = function(chunk, encoding, callback) {
      const rState = this._readableState;
      const wState = this._writableState;
      const length = rState.length;
      this._transform(chunk, encoding, (err2, val) => {
        if (err2) {
          callback(err2);
          return;
        }
        if (val != null) {
          this.push(val);
        }
        if (wState.ended || // Backwards compat.
        length === rState.length || // Backwards compat.
        rState.length < rState.highWaterMark) {
          callback();
        } else {
          this[kCallback] = callback;
        }
      });
    };
    Transform.prototype._read = function() {
      if (this[kCallback]) {
        const callback = this[kCallback];
        this[kCallback] = null;
        callback();
      }
    };
  }
});

// node_modules/readable-stream/lib/internal/streams/passthrough.js
var require_passthrough = __commonJS({
  "node_modules/readable-stream/lib/internal/streams/passthrough.js"(exports, module) {
    "use strict";
    var { ObjectSetPrototypeOf } = require_primordials();
    module.exports = PassThrough;
    var Transform = require_transform();
    ObjectSetPrototypeOf(PassThrough.prototype, Transform.prototype);
    ObjectSetPrototypeOf(PassThrough, Transform);
    function PassThrough(options) {
      if (!(this instanceof PassThrough)) return new PassThrough(options);
      Transform.call(this, options);
    }
    PassThrough.prototype._transform = function(chunk, encoding, cb) {
      cb(null, chunk);
    };
  }
});

// node_modules/readable-stream/lib/internal/streams/pipeline.js
var require_pipeline = __commonJS({
  "node_modules/readable-stream/lib/internal/streams/pipeline.js"(exports, module) {
    var process = require_browser2();
    var { ArrayIsArray, Promise: Promise2, SymbolAsyncIterator, SymbolDispose } = require_primordials();
    var eos = require_end_of_stream();
    var { once } = require_util();
    var destroyImpl = require_destroy();
    var Duplex = require_duplex();
    var {
      aggregateTwoErrors,
      codes: {
        ERR_INVALID_ARG_TYPE,
        ERR_INVALID_RETURN_VALUE,
        ERR_MISSING_ARGS,
        ERR_STREAM_DESTROYED,
        ERR_STREAM_PREMATURE_CLOSE
      },
      AbortError
    } = require_errors();
    var { validateFunction, validateAbortSignal } = require_validators();
    var {
      isIterable,
      isReadable,
      isReadableNodeStream,
      isNodeStream,
      isTransformStream,
      isWebStream,
      isReadableStream,
      isReadableFinished
    } = require_utils();
    var AbortController = globalThis.AbortController || require_browser().AbortController;
    var PassThrough;
    var Readable2;
    var addAbortListener;
    function destroyer(stream, reading, writing) {
      let finished2 = false;
      stream.on("close", () => {
        finished2 = true;
      });
      const cleanup = eos(
        stream,
        {
          readable: reading,
          writable: writing
        },
        (err2) => {
          finished2 = !err2;
        }
      );
      return {
        destroy: (err2) => {
          if (finished2) return;
          finished2 = true;
          destroyImpl.destroyer(stream, err2 || new ERR_STREAM_DESTROYED("pipe"));
        },
        cleanup
      };
    }
    function popCallback(streams) {
      validateFunction(streams[streams.length - 1], "streams[stream.length - 1]");
      return streams.pop();
    }
    function makeAsyncIterable(val) {
      if (isIterable(val)) {
        return val;
      } else if (isReadableNodeStream(val)) {
        return fromReadable(val);
      }
      throw new ERR_INVALID_ARG_TYPE("val", ["Readable", "Iterable", "AsyncIterable"], val);
    }
    async function* fromReadable(val) {
      if (!Readable2) {
        Readable2 = require_readable();
      }
      yield* Readable2.prototype[SymbolAsyncIterator].call(val);
    }
    async function pumpToNode(iterable, writable, finish, { end }) {
      let error2;
      let onresolve = null;
      const resume = (err2) => {
        if (err2) {
          error2 = err2;
        }
        if (onresolve) {
          const callback = onresolve;
          onresolve = null;
          callback();
        }
      };
      const wait = () => new Promise2((resolve4, reject) => {
        if (error2) {
          reject(error2);
        } else {
          onresolve = () => {
            if (error2) {
              reject(error2);
            } else {
              resolve4();
            }
          };
        }
      });
      writable.on("drain", resume);
      const cleanup = eos(
        writable,
        {
          readable: false
        },
        resume
      );
      try {
        if (writable.writableNeedDrain) {
          await wait();
        }
        for await (const chunk of iterable) {
          if (!writable.write(chunk)) {
            await wait();
          }
        }
        if (end) {
          writable.end();
          await wait();
        }
        finish();
      } catch (err2) {
        finish(error2 !== err2 ? aggregateTwoErrors(error2, err2) : err2);
      } finally {
        cleanup();
        writable.off("drain", resume);
      }
    }
    async function pumpToWeb(readable, writable, finish, { end }) {
      if (isTransformStream(writable)) {
        writable = writable.writable;
      }
      const writer = writable.getWriter();
      try {
        for await (const chunk of readable) {
          await writer.ready;
          writer.write(chunk).catch(() => {
          });
        }
        await writer.ready;
        if (end) {
          await writer.close();
        }
        finish();
      } catch (err2) {
        try {
          await writer.abort(err2);
          finish(err2);
        } catch (err3) {
          finish(err3);
        }
      }
    }
    function pipeline(...streams) {
      return pipelineImpl(streams, once(popCallback(streams)));
    }
    function pipelineImpl(streams, callback, opts) {
      if (streams.length === 1 && ArrayIsArray(streams[0])) {
        streams = streams[0];
      }
      if (streams.length < 2) {
        throw new ERR_MISSING_ARGS("streams");
      }
      const ac = new AbortController();
      const signal = ac.signal;
      const outerSignal = opts === null || opts === void 0 ? void 0 : opts.signal;
      const lastStreamCleanup = [];
      validateAbortSignal(outerSignal, "options.signal");
      function abort() {
        finishImpl(new AbortError());
      }
      addAbortListener = addAbortListener || require_util().addAbortListener;
      let disposable;
      if (outerSignal) {
        disposable = addAbortListener(outerSignal, abort);
      }
      let error2;
      let value;
      const destroys = [];
      let finishCount = 0;
      function finish(err2) {
        finishImpl(err2, --finishCount === 0);
      }
      function finishImpl(err2, final) {
        var _disposable;
        if (err2 && (!error2 || error2.code === "ERR_STREAM_PREMATURE_CLOSE")) {
          error2 = err2;
        }
        if (!error2 && !final) {
          return;
        }
        while (destroys.length) {
          destroys.shift()(error2);
        }
        ;
        (_disposable = disposable) === null || _disposable === void 0 ? void 0 : _disposable[SymbolDispose]();
        ac.abort();
        if (final) {
          if (!error2) {
            lastStreamCleanup.forEach((fn) => fn());
          }
          process.nextTick(callback, error2, value);
        }
      }
      let ret;
      for (let i = 0; i < streams.length; i++) {
        const stream = streams[i];
        const reading = i < streams.length - 1;
        const writing = i > 0;
        const end = reading || (opts === null || opts === void 0 ? void 0 : opts.end) !== false;
        const isLastStream = i === streams.length - 1;
        if (isNodeStream(stream)) {
          let onError2 = function(err2) {
            if (err2 && err2.name !== "AbortError" && err2.code !== "ERR_STREAM_PREMATURE_CLOSE") {
              finish(err2);
            }
          };
          var onError = onError2;
          if (end) {
            const { destroy, cleanup } = destroyer(stream, reading, writing);
            destroys.push(destroy);
            if (isReadable(stream) && isLastStream) {
              lastStreamCleanup.push(cleanup);
            }
          }
          stream.on("error", onError2);
          if (isReadable(stream) && isLastStream) {
            lastStreamCleanup.push(() => {
              stream.removeListener("error", onError2);
            });
          }
        }
        if (i === 0) {
          if (typeof stream === "function") {
            ret = stream({
              signal
            });
            if (!isIterable(ret)) {
              throw new ERR_INVALID_RETURN_VALUE("Iterable, AsyncIterable or Stream", "source", ret);
            }
          } else if (isIterable(stream) || isReadableNodeStream(stream) || isTransformStream(stream)) {
            ret = stream;
          } else {
            ret = Duplex.from(stream);
          }
        } else if (typeof stream === "function") {
          if (isTransformStream(ret)) {
            var _ret;
            ret = makeAsyncIterable((_ret = ret) === null || _ret === void 0 ? void 0 : _ret.readable);
          } else {
            ret = makeAsyncIterable(ret);
          }
          ret = stream(ret, {
            signal
          });
          if (reading) {
            if (!isIterable(ret, true)) {
              throw new ERR_INVALID_RETURN_VALUE("AsyncIterable", `transform[${i - 1}]`, ret);
            }
          } else {
            var _ret2;
            if (!PassThrough) {
              PassThrough = require_passthrough();
            }
            const pt = new PassThrough({
              objectMode: true
            });
            const then = (_ret2 = ret) === null || _ret2 === void 0 ? void 0 : _ret2.then;
            if (typeof then === "function") {
              finishCount++;
              then.call(
                ret,
                (val) => {
                  value = val;
                  if (val != null) {
                    pt.write(val);
                  }
                  if (end) {
                    pt.end();
                  }
                  process.nextTick(finish);
                },
                (err2) => {
                  pt.destroy(err2);
                  process.nextTick(finish, err2);
                }
              );
            } else if (isIterable(ret, true)) {
              finishCount++;
              pumpToNode(ret, pt, finish, {
                end
              });
            } else if (isReadableStream(ret) || isTransformStream(ret)) {
              const toRead = ret.readable || ret;
              finishCount++;
              pumpToNode(toRead, pt, finish, {
                end
              });
            } else {
              throw new ERR_INVALID_RETURN_VALUE("AsyncIterable or Promise", "destination", ret);
            }
            ret = pt;
            const { destroy, cleanup } = destroyer(ret, false, true);
            destroys.push(destroy);
            if (isLastStream) {
              lastStreamCleanup.push(cleanup);
            }
          }
        } else if (isNodeStream(stream)) {
          if (isReadableNodeStream(ret)) {
            finishCount += 2;
            const cleanup = pipe(ret, stream, finish, {
              end
            });
            if (isReadable(stream) && isLastStream) {
              lastStreamCleanup.push(cleanup);
            }
          } else if (isTransformStream(ret) || isReadableStream(ret)) {
            const toRead = ret.readable || ret;
            finishCount++;
            pumpToNode(toRead, stream, finish, {
              end
            });
          } else if (isIterable(ret)) {
            finishCount++;
            pumpToNode(ret, stream, finish, {
              end
            });
          } else {
            throw new ERR_INVALID_ARG_TYPE(
              "val",
              ["Readable", "Iterable", "AsyncIterable", "ReadableStream", "TransformStream"],
              ret
            );
          }
          ret = stream;
        } else if (isWebStream(stream)) {
          if (isReadableNodeStream(ret)) {
            finishCount++;
            pumpToWeb(makeAsyncIterable(ret), stream, finish, {
              end
            });
          } else if (isReadableStream(ret) || isIterable(ret)) {
            finishCount++;
            pumpToWeb(ret, stream, finish, {
              end
            });
          } else if (isTransformStream(ret)) {
            finishCount++;
            pumpToWeb(ret.readable, stream, finish, {
              end
            });
          } else {
            throw new ERR_INVALID_ARG_TYPE(
              "val",
              ["Readable", "Iterable", "AsyncIterable", "ReadableStream", "TransformStream"],
              ret
            );
          }
          ret = stream;
        } else {
          ret = Duplex.from(stream);
        }
      }
      if (signal !== null && signal !== void 0 && signal.aborted || outerSignal !== null && outerSignal !== void 0 && outerSignal.aborted) {
        process.nextTick(abort);
      }
      return ret;
    }
    function pipe(src, dst, finish, { end }) {
      let ended = false;
      dst.on("close", () => {
        if (!ended) {
          finish(new ERR_STREAM_PREMATURE_CLOSE());
        }
      });
      src.pipe(dst, {
        end: false
      });
      if (end) {
        let endFn2 = function() {
          ended = true;
          dst.end();
        };
        var endFn = endFn2;
        if (isReadableFinished(src)) {
          process.nextTick(endFn2);
        } else {
          src.once("end", endFn2);
        }
      } else {
        finish();
      }
      eos(
        src,
        {
          readable: true,
          writable: false
        },
        (err2) => {
          const rState = src._readableState;
          if (err2 && err2.code === "ERR_STREAM_PREMATURE_CLOSE" && rState && rState.ended && !rState.errored && !rState.errorEmitted) {
            src.once("end", finish).once("error", finish);
          } else {
            finish(err2);
          }
        }
      );
      return eos(
        dst,
        {
          readable: false,
          writable: true
        },
        finish
      );
    }
    module.exports = {
      pipelineImpl,
      pipeline
    };
  }
});

// node_modules/readable-stream/lib/internal/streams/compose.js
var require_compose = __commonJS({
  "node_modules/readable-stream/lib/internal/streams/compose.js"(exports, module) {
    "use strict";
    var { pipeline } = require_pipeline();
    var Duplex = require_duplex();
    var { destroyer } = require_destroy();
    var {
      isNodeStream,
      isReadable,
      isWritable,
      isWebStream,
      isTransformStream,
      isWritableStream,
      isReadableStream
    } = require_utils();
    var {
      AbortError,
      codes: { ERR_INVALID_ARG_VALUE, ERR_MISSING_ARGS }
    } = require_errors();
    var eos = require_end_of_stream();
    module.exports = function compose(...streams) {
      if (streams.length === 0) {
        throw new ERR_MISSING_ARGS("streams");
      }
      if (streams.length === 1) {
        return Duplex.from(streams[0]);
      }
      const orgStreams = [...streams];
      if (typeof streams[0] === "function") {
        streams[0] = Duplex.from(streams[0]);
      }
      if (typeof streams[streams.length - 1] === "function") {
        const idx = streams.length - 1;
        streams[idx] = Duplex.from(streams[idx]);
      }
      for (let n = 0; n < streams.length; ++n) {
        if (!isNodeStream(streams[n]) && !isWebStream(streams[n])) {
          continue;
        }
        if (n < streams.length - 1 && !(isReadable(streams[n]) || isReadableStream(streams[n]) || isTransformStream(streams[n]))) {
          throw new ERR_INVALID_ARG_VALUE(`streams[${n}]`, orgStreams[n], "must be readable");
        }
        if (n > 0 && !(isWritable(streams[n]) || isWritableStream(streams[n]) || isTransformStream(streams[n]))) {
          throw new ERR_INVALID_ARG_VALUE(`streams[${n}]`, orgStreams[n], "must be writable");
        }
      }
      let ondrain;
      let onfinish;
      let onreadable;
      let onclose;
      let d;
      function onfinished(err2) {
        const cb = onclose;
        onclose = null;
        if (cb) {
          cb(err2);
        } else if (err2) {
          d.destroy(err2);
        } else if (!readable && !writable) {
          d.destroy();
        }
      }
      const head = streams[0];
      const tail = pipeline(streams, onfinished);
      const writable = !!(isWritable(head) || isWritableStream(head) || isTransformStream(head));
      const readable = !!(isReadable(tail) || isReadableStream(tail) || isTransformStream(tail));
      d = new Duplex({
        // TODO (ronag): highWaterMark?
        writableObjectMode: !!(head !== null && head !== void 0 && head.writableObjectMode),
        readableObjectMode: !!(tail !== null && tail !== void 0 && tail.readableObjectMode),
        writable,
        readable
      });
      if (writable) {
        if (isNodeStream(head)) {
          d._write = function(chunk, encoding, callback) {
            if (head.write(chunk, encoding)) {
              callback();
            } else {
              ondrain = callback;
            }
          };
          d._final = function(callback) {
            head.end();
            onfinish = callback;
          };
          head.on("drain", function() {
            if (ondrain) {
              const cb = ondrain;
              ondrain = null;
              cb();
            }
          });
        } else if (isWebStream(head)) {
          const writable2 = isTransformStream(head) ? head.writable : head;
          const writer = writable2.getWriter();
          d._write = async function(chunk, encoding, callback) {
            try {
              await writer.ready;
              writer.write(chunk).catch(() => {
              });
              callback();
            } catch (err2) {
              callback(err2);
            }
          };
          d._final = async function(callback) {
            try {
              await writer.ready;
              writer.close().catch(() => {
              });
              onfinish = callback;
            } catch (err2) {
              callback(err2);
            }
          };
        }
        const toRead = isTransformStream(tail) ? tail.readable : tail;
        eos(toRead, () => {
          if (onfinish) {
            const cb = onfinish;
            onfinish = null;
            cb();
          }
        });
      }
      if (readable) {
        if (isNodeStream(tail)) {
          tail.on("readable", function() {
            if (onreadable) {
              const cb = onreadable;
              onreadable = null;
              cb();
            }
          });
          tail.on("end", function() {
            d.push(null);
          });
          d._read = function() {
            while (true) {
              const buf = tail.read();
              if (buf === null) {
                onreadable = d._read;
                return;
              }
              if (!d.push(buf)) {
                return;
              }
            }
          };
        } else if (isWebStream(tail)) {
          const readable2 = isTransformStream(tail) ? tail.readable : tail;
          const reader = readable2.getReader();
          d._read = async function() {
            while (true) {
              try {
                const { value, done } = await reader.read();
                if (!d.push(value)) {
                  return;
                }
                if (done) {
                  d.push(null);
                  return;
                }
              } catch {
                return;
              }
            }
          };
        }
      }
      d._destroy = function(err2, callback) {
        if (!err2 && onclose !== null) {
          err2 = new AbortError();
        }
        onreadable = null;
        ondrain = null;
        onfinish = null;
        if (onclose === null) {
          callback(err2);
        } else {
          onclose = callback;
          if (isNodeStream(tail)) {
            destroyer(tail, err2);
          }
        }
      };
      return d;
    };
  }
});

// node_modules/readable-stream/lib/internal/streams/operators.js
var require_operators = __commonJS({
  "node_modules/readable-stream/lib/internal/streams/operators.js"(exports, module) {
    "use strict";
    var AbortController = globalThis.AbortController || require_browser().AbortController;
    var {
      codes: { ERR_INVALID_ARG_VALUE, ERR_INVALID_ARG_TYPE, ERR_MISSING_ARGS, ERR_OUT_OF_RANGE },
      AbortError
    } = require_errors();
    var { validateAbortSignal, validateInteger, validateObject } = require_validators();
    var kWeakHandler = require_primordials().Symbol("kWeak");
    var kResistStopPropagation = require_primordials().Symbol("kResistStopPropagation");
    var { finished: finished2 } = require_end_of_stream();
    var staticCompose = require_compose();
    var { addAbortSignalNoValidate } = require_add_abort_signal();
    var { isWritable, isNodeStream } = require_utils();
    var { deprecate } = require_util();
    var {
      ArrayPrototypePush,
      Boolean: Boolean2,
      MathFloor,
      Number: Number2,
      NumberIsNaN,
      Promise: Promise2,
      PromiseReject,
      PromiseResolve,
      PromisePrototypeThen,
      Symbol: Symbol2
    } = require_primordials();
    var kEmpty = Symbol2("kEmpty");
    var kEof = Symbol2("kEof");
    function compose(stream, options) {
      if (options != null) {
        validateObject(options, "options");
      }
      if ((options === null || options === void 0 ? void 0 : options.signal) != null) {
        validateAbortSignal(options.signal, "options.signal");
      }
      if (isNodeStream(stream) && !isWritable(stream)) {
        throw new ERR_INVALID_ARG_VALUE("stream", stream, "must be writable");
      }
      const composedStream = staticCompose(this, stream);
      if (options !== null && options !== void 0 && options.signal) {
        addAbortSignalNoValidate(options.signal, composedStream);
      }
      return composedStream;
    }
    function map(fn, options) {
      if (typeof fn !== "function") {
        throw new ERR_INVALID_ARG_TYPE("fn", ["Function", "AsyncFunction"], fn);
      }
      if (options != null) {
        validateObject(options, "options");
      }
      if ((options === null || options === void 0 ? void 0 : options.signal) != null) {
        validateAbortSignal(options.signal, "options.signal");
      }
      let concurrency = 1;
      if ((options === null || options === void 0 ? void 0 : options.concurrency) != null) {
        concurrency = MathFloor(options.concurrency);
      }
      let highWaterMark = concurrency - 1;
      if ((options === null || options === void 0 ? void 0 : options.highWaterMark) != null) {
        highWaterMark = MathFloor(options.highWaterMark);
      }
      validateInteger(concurrency, "options.concurrency", 1);
      validateInteger(highWaterMark, "options.highWaterMark", 0);
      highWaterMark += concurrency;
      return async function* map2() {
        const signal = require_util().AbortSignalAny(
          [options === null || options === void 0 ? void 0 : options.signal].filter(Boolean2)
        );
        const stream = this;
        const queue = [];
        const signalOpt = {
          signal
        };
        let next;
        let resume;
        let done = false;
        let cnt = 0;
        function onCatch() {
          done = true;
          afterItemProcessed();
        }
        function afterItemProcessed() {
          cnt -= 1;
          maybeResume();
        }
        function maybeResume() {
          if (resume && !done && cnt < concurrency && queue.length < highWaterMark) {
            resume();
            resume = null;
          }
        }
        async function pump() {
          try {
            for await (let val of stream) {
              if (done) {
                return;
              }
              if (signal.aborted) {
                throw new AbortError();
              }
              try {
                val = fn(val, signalOpt);
                if (val === kEmpty) {
                  continue;
                }
                val = PromiseResolve(val);
              } catch (err2) {
                val = PromiseReject(err2);
              }
              cnt += 1;
              PromisePrototypeThen(val, afterItemProcessed, onCatch);
              queue.push(val);
              if (next) {
                next();
                next = null;
              }
              if (!done && (queue.length >= highWaterMark || cnt >= concurrency)) {
                await new Promise2((resolve4) => {
                  resume = resolve4;
                });
              }
            }
            queue.push(kEof);
          } catch (err2) {
            const val = PromiseReject(err2);
            PromisePrototypeThen(val, afterItemProcessed, onCatch);
            queue.push(val);
          } finally {
            done = true;
            if (next) {
              next();
              next = null;
            }
          }
        }
        pump();
        try {
          while (true) {
            while (queue.length > 0) {
              const val = await queue[0];
              if (val === kEof) {
                return;
              }
              if (signal.aborted) {
                throw new AbortError();
              }
              if (val !== kEmpty) {
                yield val;
              }
              queue.shift();
              maybeResume();
            }
            await new Promise2((resolve4) => {
              next = resolve4;
            });
          }
        } finally {
          done = true;
          if (resume) {
            resume();
            resume = null;
          }
        }
      }.call(this);
    }
    function asIndexedPairs(options = void 0) {
      if (options != null) {
        validateObject(options, "options");
      }
      if ((options === null || options === void 0 ? void 0 : options.signal) != null) {
        validateAbortSignal(options.signal, "options.signal");
      }
      return async function* asIndexedPairs2() {
        let index = 0;
        for await (const val of this) {
          var _options$signal;
          if (options !== null && options !== void 0 && (_options$signal = options.signal) !== null && _options$signal !== void 0 && _options$signal.aborted) {
            throw new AbortError({
              cause: options.signal.reason
            });
          }
          yield [index++, val];
        }
      }.call(this);
    }
    async function some(fn, options = void 0) {
      for await (const unused of filter.call(this, fn, options)) {
        return true;
      }
      return false;
    }
    async function every(fn, options = void 0) {
      if (typeof fn !== "function") {
        throw new ERR_INVALID_ARG_TYPE("fn", ["Function", "AsyncFunction"], fn);
      }
      return !await some.call(
        this,
        async (...args) => {
          return !await fn(...args);
        },
        options
      );
    }
    async function find(fn, options) {
      for await (const result of filter.call(this, fn, options)) {
        return result;
      }
      return void 0;
    }
    async function forEach(fn, options) {
      if (typeof fn !== "function") {
        throw new ERR_INVALID_ARG_TYPE("fn", ["Function", "AsyncFunction"], fn);
      }
      async function forEachFn(value, options2) {
        await fn(value, options2);
        return kEmpty;
      }
      for await (const unused of map.call(this, forEachFn, options)) ;
    }
    function filter(fn, options) {
      if (typeof fn !== "function") {
        throw new ERR_INVALID_ARG_TYPE("fn", ["Function", "AsyncFunction"], fn);
      }
      async function filterFn(value, options2) {
        if (await fn(value, options2)) {
          return value;
        }
        return kEmpty;
      }
      return map.call(this, filterFn, options);
    }
    var ReduceAwareErrMissingArgs = class extends ERR_MISSING_ARGS {
      constructor() {
        super("reduce");
        this.message = "Reduce of an empty stream requires an initial value";
      }
    };
    async function reduce(reducer, initialValue, options) {
      var _options$signal2;
      if (typeof reducer !== "function") {
        throw new ERR_INVALID_ARG_TYPE("reducer", ["Function", "AsyncFunction"], reducer);
      }
      if (options != null) {
        validateObject(options, "options");
      }
      if ((options === null || options === void 0 ? void 0 : options.signal) != null) {
        validateAbortSignal(options.signal, "options.signal");
      }
      let hasInitialValue = arguments.length > 1;
      if (options !== null && options !== void 0 && (_options$signal2 = options.signal) !== null && _options$signal2 !== void 0 && _options$signal2.aborted) {
        const err2 = new AbortError(void 0, {
          cause: options.signal.reason
        });
        this.once("error", () => {
        });
        await finished2(this.destroy(err2));
        throw err2;
      }
      const ac = new AbortController();
      const signal = ac.signal;
      if (options !== null && options !== void 0 && options.signal) {
        const opts = {
          once: true,
          [kWeakHandler]: this,
          [kResistStopPropagation]: true
        };
        options.signal.addEventListener("abort", () => ac.abort(), opts);
      }
      let gotAnyItemFromStream = false;
      try {
        for await (const value of this) {
          var _options$signal3;
          gotAnyItemFromStream = true;
          if (options !== null && options !== void 0 && (_options$signal3 = options.signal) !== null && _options$signal3 !== void 0 && _options$signal3.aborted) {
            throw new AbortError();
          }
          if (!hasInitialValue) {
            initialValue = value;
            hasInitialValue = true;
          } else {
            initialValue = await reducer(initialValue, value, {
              signal
            });
          }
        }
        if (!gotAnyItemFromStream && !hasInitialValue) {
          throw new ReduceAwareErrMissingArgs();
        }
      } finally {
        ac.abort();
      }
      return initialValue;
    }
    async function toArray(options) {
      if (options != null) {
        validateObject(options, "options");
      }
      if ((options === null || options === void 0 ? void 0 : options.signal) != null) {
        validateAbortSignal(options.signal, "options.signal");
      }
      const result = [];
      for await (const val of this) {
        var _options$signal4;
        if (options !== null && options !== void 0 && (_options$signal4 = options.signal) !== null && _options$signal4 !== void 0 && _options$signal4.aborted) {
          throw new AbortError(void 0, {
            cause: options.signal.reason
          });
        }
        ArrayPrototypePush(result, val);
      }
      return result;
    }
    function flatMap(fn, options) {
      const values = map.call(this, fn, options);
      return async function* flatMap2() {
        for await (const val of values) {
          yield* val;
        }
      }.call(this);
    }
    function toIntegerOrInfinity(number) {
      number = Number2(number);
      if (NumberIsNaN(number)) {
        return 0;
      }
      if (number < 0) {
        throw new ERR_OUT_OF_RANGE("number", ">= 0", number);
      }
      return number;
    }
    function drop(number, options = void 0) {
      if (options != null) {
        validateObject(options, "options");
      }
      if ((options === null || options === void 0 ? void 0 : options.signal) != null) {
        validateAbortSignal(options.signal, "options.signal");
      }
      number = toIntegerOrInfinity(number);
      return async function* drop2() {
        var _options$signal5;
        if (options !== null && options !== void 0 && (_options$signal5 = options.signal) !== null && _options$signal5 !== void 0 && _options$signal5.aborted) {
          throw new AbortError();
        }
        for await (const val of this) {
          var _options$signal6;
          if (options !== null && options !== void 0 && (_options$signal6 = options.signal) !== null && _options$signal6 !== void 0 && _options$signal6.aborted) {
            throw new AbortError();
          }
          if (number-- <= 0) {
            yield val;
          }
        }
      }.call(this);
    }
    function take(number, options = void 0) {
      if (options != null) {
        validateObject(options, "options");
      }
      if ((options === null || options === void 0 ? void 0 : options.signal) != null) {
        validateAbortSignal(options.signal, "options.signal");
      }
      number = toIntegerOrInfinity(number);
      return async function* take2() {
        var _options$signal7;
        if (options !== null && options !== void 0 && (_options$signal7 = options.signal) !== null && _options$signal7 !== void 0 && _options$signal7.aborted) {
          throw new AbortError();
        }
        for await (const val of this) {
          var _options$signal8;
          if (options !== null && options !== void 0 && (_options$signal8 = options.signal) !== null && _options$signal8 !== void 0 && _options$signal8.aborted) {
            throw new AbortError();
          }
          if (number-- > 0) {
            yield val;
          }
          if (number <= 0) {
            return;
          }
        }
      }.call(this);
    }
    module.exports.streamReturningOperators = {
      asIndexedPairs: deprecate(asIndexedPairs, "readable.asIndexedPairs will be removed in a future version."),
      drop,
      filter,
      flatMap,
      map,
      take,
      compose
    };
    module.exports.promiseReturningOperators = {
      every,
      forEach,
      reduce,
      toArray,
      some,
      find
    };
  }
});

// node_modules/readable-stream/lib/stream/promises.js
var require_promises = __commonJS({
  "node_modules/readable-stream/lib/stream/promises.js"(exports, module) {
    "use strict";
    var { ArrayPrototypePop, Promise: Promise2 } = require_primordials();
    var { isIterable, isNodeStream, isWebStream } = require_utils();
    var { pipelineImpl: pl } = require_pipeline();
    var { finished: finished2 } = require_end_of_stream();
    require_stream();
    function pipeline(...streams) {
      return new Promise2((resolve4, reject) => {
        let signal;
        let end;
        const lastArg = streams[streams.length - 1];
        if (lastArg && typeof lastArg === "object" && !isNodeStream(lastArg) && !isIterable(lastArg) && !isWebStream(lastArg)) {
          const options = ArrayPrototypePop(streams);
          signal = options.signal;
          end = options.end;
        }
        pl(
          streams,
          (err2, value) => {
            if (err2) {
              reject(err2);
            } else {
              resolve4(value);
            }
          },
          {
            signal,
            end
          }
        );
      });
    }
    module.exports = {
      finished: finished2,
      pipeline
    };
  }
});

// node_modules/readable-stream/lib/stream.js
var require_stream = __commonJS({
  "node_modules/readable-stream/lib/stream.js"(exports, module) {
    "use strict";
    var { Buffer: Buffer8 } = require_buffer();
    var { ObjectDefineProperty, ObjectKeys, ReflectApply } = require_primordials();
    var {
      promisify: { custom: customPromisify }
    } = require_util();
    var { streamReturningOperators, promiseReturningOperators } = require_operators();
    var {
      codes: { ERR_ILLEGAL_CONSTRUCTOR }
    } = require_errors();
    var compose = require_compose();
    var { setDefaultHighWaterMark, getDefaultHighWaterMark } = require_state();
    var { pipeline } = require_pipeline();
    var { destroyer } = require_destroy();
    var eos = require_end_of_stream();
    var promises = require_promises();
    var utils = require_utils();
    var Stream = module.exports = require_legacy().Stream;
    Stream.isDestroyed = utils.isDestroyed;
    Stream.isDisturbed = utils.isDisturbed;
    Stream.isErrored = utils.isErrored;
    Stream.isReadable = utils.isReadable;
    Stream.isWritable = utils.isWritable;
    Stream.Readable = require_readable();
    for (const key of ObjectKeys(streamReturningOperators)) {
      let fn = function(...args) {
        if (new.target) {
          throw ERR_ILLEGAL_CONSTRUCTOR();
        }
        return Stream.Readable.from(ReflectApply(op, this, args));
      };
      const op = streamReturningOperators[key];
      ObjectDefineProperty(fn, "name", {
        __proto__: null,
        value: op.name
      });
      ObjectDefineProperty(fn, "length", {
        __proto__: null,
        value: op.length
      });
      ObjectDefineProperty(Stream.Readable.prototype, key, {
        __proto__: null,
        value: fn,
        enumerable: false,
        configurable: true,
        writable: true
      });
    }
    for (const key of ObjectKeys(promiseReturningOperators)) {
      let fn = function(...args) {
        if (new.target) {
          throw ERR_ILLEGAL_CONSTRUCTOR();
        }
        return ReflectApply(op, this, args);
      };
      const op = promiseReturningOperators[key];
      ObjectDefineProperty(fn, "name", {
        __proto__: null,
        value: op.name
      });
      ObjectDefineProperty(fn, "length", {
        __proto__: null,
        value: op.length
      });
      ObjectDefineProperty(Stream.Readable.prototype, key, {
        __proto__: null,
        value: fn,
        enumerable: false,
        configurable: true,
        writable: true
      });
    }
    Stream.Writable = require_writable();
    Stream.Duplex = require_duplex();
    Stream.Transform = require_transform();
    Stream.PassThrough = require_passthrough();
    Stream.pipeline = pipeline;
    var { addAbortSignal } = require_add_abort_signal();
    Stream.addAbortSignal = addAbortSignal;
    Stream.finished = eos;
    Stream.destroy = destroyer;
    Stream.compose = compose;
    Stream.setDefaultHighWaterMark = setDefaultHighWaterMark;
    Stream.getDefaultHighWaterMark = getDefaultHighWaterMark;
    ObjectDefineProperty(Stream, "promises", {
      __proto__: null,
      configurable: true,
      enumerable: true,
      get() {
        return promises;
      }
    });
    ObjectDefineProperty(pipeline, customPromisify, {
      __proto__: null,
      enumerable: true,
      get() {
        return promises.pipeline;
      }
    });
    ObjectDefineProperty(eos, customPromisify, {
      __proto__: null,
      enumerable: true,
      get() {
        return promises.finished;
      }
    });
    Stream.Stream = Stream;
    Stream._isUint8Array = function isUint8Array(value) {
      return value instanceof Uint8Array;
    };
    Stream._uint8ArrayToBuffer = function _uint8ArrayToBuffer(chunk) {
      return Buffer8.from(chunk.buffer, chunk.byteOffset, chunk.byteLength);
    };
  }
});

// node_modules/readable-stream/lib/ours/browser.js
var require_browser3 = __commonJS({
  "node_modules/readable-stream/lib/ours/browser.js"(exports, module) {
    "use strict";
    var CustomStream = require_stream();
    var promises = require_promises();
    var originalDestroy = CustomStream.Readable.destroy;
    module.exports = CustomStream.Readable;
    module.exports._uint8ArrayToBuffer = CustomStream._uint8ArrayToBuffer;
    module.exports._isUint8Array = CustomStream._isUint8Array;
    module.exports.isDisturbed = CustomStream.isDisturbed;
    module.exports.isErrored = CustomStream.isErrored;
    module.exports.isReadable = CustomStream.isReadable;
    module.exports.Readable = CustomStream.Readable;
    module.exports.Writable = CustomStream.Writable;
    module.exports.Duplex = CustomStream.Duplex;
    module.exports.Transform = CustomStream.Transform;
    module.exports.PassThrough = CustomStream.PassThrough;
    module.exports.addAbortSignal = CustomStream.addAbortSignal;
    module.exports.finished = CustomStream.finished;
    module.exports.destroy = CustomStream.destroy;
    module.exports.destroy = originalDestroy;
    module.exports.pipeline = CustomStream.pipeline;
    module.exports.compose = CustomStream.compose;
    Object.defineProperty(CustomStream, "promises", {
      configurable: true,
      enumerable: true,
      get() {
        return promises;
      }
    });
    module.exports.Stream = CustomStream.Stream;
    module.exports.default = module.exports;
  }
});

// node_modules/utilium/dist/buffer.js
function extendBuffer(buffer, newByteLength) {
  if (buffer.byteLength >= newByteLength)
    return buffer;
  if (ArrayBuffer.isView(buffer)) {
    const newBuffer = extendBuffer(buffer.buffer, newByteLength);
    return new buffer.constructor(newBuffer, buffer.byteOffset, newByteLength);
  }
  const isShared = typeof SharedArrayBuffer !== "undefined" && buffer instanceof SharedArrayBuffer;
  if (buffer.maxByteLength > newByteLength) {
    isShared ? buffer.grow(newByteLength) : buffer.resize(newByteLength);
    return buffer;
  }
  if (isShared) {
    const newBuffer = new SharedArrayBuffer(newByteLength);
    new Uint8Array(newBuffer).set(new Uint8Array(buffer));
    return newBuffer;
  }
  try {
    return buffer.transfer(newByteLength);
  } catch {
    const newBuffer = new ArrayBuffer(newByteLength);
    new Uint8Array(newBuffer).set(new Uint8Array(buffer));
    return newBuffer;
  }
}
var BufferView = class extends DataView {
  constructor(_buffer, _byteOffset, _byteLength) {
    const { buffer, byteOffset, byteLength } = new Uint8Array(_buffer, _byteOffset, _byteLength);
    super(buffer, byteOffset, byteLength);
  }
};
for (const key of Object.getOwnPropertyNames(DataView.prototype)) {
  if (!key.startsWith("get") && !key.startsWith("set"))
    continue;
  Object.defineProperty(BufferView.prototype, key, {
    value: () => {
      throw new ReferenceError("Do not use DataView methods on a BufferView.");
    },
    writable: false,
    enumerable: false,
    configurable: false
  });
}

// node_modules/utilium/dist/cache.js
var Resource = class {
  id;
  _size;
  options;
  /** Regions used to reduce unneeded allocations. Think of sparse arrays. */
  regions = [];
  /** The full size of the resource */
  get size() {
    return this._size;
  }
  set size(value) {
    if (value >= this._size) {
      this._size = value;
      return;
    }
    this._size = value;
    for (let i = this.regions.length - 1; i >= 0; i--) {
      const region = this.regions[i];
      if (region.offset >= value) {
        this.regions.splice(i, 1);
        continue;
      }
      const maxLength = value - region.offset;
      if (region.data.byteLength > maxLength) {
        region.data = region.data.subarray(0, maxLength);
      }
      region.ranges = region.ranges.filter((range) => range.start < value).map((range) => {
        if (range.end > value) {
          return { start: range.start, end: value };
        }
        return range;
      });
    }
  }
  constructor(id, _size, options, resources) {
    this.id = id;
    this._size = _size;
    this.options = options;
    options.sparse ??= true;
    if (!options.sparse)
      this.regions.push({ offset: 0, data: new Uint8Array(_size), ranges: [] });
    resources?.set(id, this);
  }
  /** Combines adjacent regions and combines adjacent ranges within a region */
  collect() {
    if (!this.options.sparse)
      return;
    const { regionGapThreshold = 4095 } = this.options;
    for (let i = 0; i < this.regions.length - 1; ) {
      const current = this.regions[i];
      const next = this.regions[i + 1];
      if (next.offset - (current.offset + current.data.byteLength) > regionGapThreshold) {
        i++;
        continue;
      }
      current.ranges.push(...next.ranges);
      current.ranges.sort((a, b) => a.start - b.start);
      current.ranges = current.ranges.reduce((acc, range) => {
        if (!acc.length || acc.at(-1).end < range.start) {
          acc.push(range);
        } else {
          acc.at(-1).end = Math.max(acc.at(-1).end, range.end);
        }
        return acc;
      }, []);
      current.data = extendBuffer(current.data, next.offset + next.data.byteLength - current.offset);
      current.data.set(next.data, next.offset - current.offset);
      this.regions.splice(i + 1, 1);
    }
  }
  /** Takes an initial range and finds the sub-ranges that are not in the cache */
  missing(start, end) {
    const missingRanges = [];
    for (const region of this.regions) {
      if (region.offset >= end)
        break;
      for (const range of region.ranges) {
        if (range.end <= start)
          continue;
        if (range.start >= end)
          break;
        if (range.start > start) {
          missingRanges.push({ start, end: Math.min(range.start, end) });
        }
        if (range.end > start)
          start = Math.max(start, range.end);
        if (start >= end)
          break;
      }
      if (start >= end)
        break;
    }
    if (start < end)
      missingRanges.push({ start, end });
    return missingRanges;
  }
  /**
   * Get the cached sub-ranges of an initial range.
   * This is conceptually the inverse of `missing`.
   */
  cached(start, end) {
    const cachedRanges = [];
    for (const region of this.regions) {
      if (region.offset >= end)
        break;
      for (const range of region.ranges) {
        if (range.end <= start)
          continue;
        if (range.start >= end)
          break;
        cachedRanges.push({
          start: Math.max(start, range.start),
          end: Math.min(end, range.end)
        });
      }
    }
    cachedRanges.sort((a, b) => a.start - b.start);
    const merged = [];
    for (const curr of cachedRanges) {
      const last = merged.at(-1);
      if (last && curr.start <= last.end) {
        last.end = Math.max(last.end, curr.end);
      } else {
        merged.push(curr);
      }
    }
    return merged;
  }
  /** Get the region who's ranges include an offset */
  regionAt(offset) {
    if (!this.regions.length)
      return;
    for (const region of this.regions) {
      if (region.offset > offset)
        break;
      if (offset >= region.offset && offset < region.offset + region.data.byteLength)
        return region;
    }
  }
  /** Add new data to the cache at given specified offset */
  add(data, offset) {
    const end = offset + data.byteLength;
    const region = this.regionAt(offset);
    if (region) {
      region.data = extendBuffer(region.data, end - region.offset);
      region.data.set(data, offset - region.offset);
      region.ranges.push({ start: offset, end });
      region.ranges.sort((a, b) => a.start - b.start);
      this.collect();
      return this;
    }
    const newRegion = { data, offset, ranges: [{ start: offset, end }] };
    const insertIndex = this.regions.findIndex((region2) => region2.offset > offset);
    if (insertIndex == -1) {
      this.regions.push(newRegion);
    } else {
      this.regions.splice(insertIndex, 0, newRegion);
    }
    this.collect();
    return this;
  }
};

// node_modules/utilium/dist/checksum.js
var crc32cTable = new Uint32Array(256);
for (let i = 0; i < 256; i++) {
  let value = i;
  for (let j = 0; j < 8; j++) {
    value = value & 1 ? 2197175160 ^ value >>> 1 : value >>> 1;
  }
  crc32cTable[i] = value;
}
function crc32c(data) {
  let crc = 4294967295;
  for (let i = 0; i < data.length; i++) {
    crc = crc >>> 8 ^ crc32cTable[(crc ^ data[i]) & 255];
  }
  return (crc ^ 4294967295) >>> 0;
}

// node_modules/eventemitter3/index.mjs
var import_index = __toESM(require_eventemitter3(), 1);

// node_modules/utilium/dist/list.js
var List = class extends import_index.default {
  [Symbol.toStringTag] = "List";
  constructor(values) {
    super();
    if (values) {
      this.push(...values);
    }
  }
  data = /* @__PURE__ */ new Set();
  toSet() {
    return new Set(this.data);
  }
  toArray() {
    return Array.from(this.data);
  }
  toJSON() {
    return Array.from(this.data);
  }
  toString() {
    return this.join(",");
  }
  _set(index, value, _delete = false) {
    if (Math.abs(index) > this.data.size) {
      throw new ReferenceError("Can not set an element outside the bounds of the list");
    }
    const data = Array.from(this.data);
    data.splice(index, +_delete, value);
    this.data = new Set(data);
    this.emit("update");
  }
  set(index, value) {
    this._set(index, value, true);
  }
  deleteAt(index) {
    if (Math.abs(index) > this.data.size) {
      throw new ReferenceError("Can not delete an element outside the bounds of the list");
    }
    this.delete(Array.from(this.data).at(index));
  }
  insert(value, index = this.data.size) {
    this._set(index, value, false);
  }
  // Array methods
  at(index) {
    if (Math.abs(index) > this.data.size) {
      throw new ReferenceError("Can not access an element outside the bounds of the list");
    }
    return Array.from(this.data).at(index);
  }
  pop() {
    const item = Array.from(this.data).pop();
    if (item !== void 0) {
      this.delete(item);
    }
    return item;
  }
  push(...items) {
    for (const item of items) {
      this.add(item);
    }
    return this.data.size;
  }
  join(separator) {
    return Array.from(this.data).join(separator);
  }
  splice(start, deleteCount, ...items) {
    if (Math.abs(start) > this.data.size) {
      throw new ReferenceError("Can not splice elements outside the bounds of the list");
    }
    const data = Array.from(this.data);
    const deleted = data.splice(start, deleteCount, ...items);
    this.data = new Set(data);
    this.emit("update");
    return deleted;
  }
  // Set methods
  add(value) {
    this.data.add(value);
    this.emit("update");
    this.emit("add", value);
    return this;
  }
  clear() {
    this.data.clear();
    this.emit("update");
  }
  delete(value) {
    const success = this.data.delete(value);
    this.emit("update");
    return success;
  }
  has(value) {
    return this.data.has(value);
  }
  get size() {
    return this.data.size;
  }
  // Iteration
  entries() {
    return this.toArray().entries();
  }
  keys() {
    return this.toArray().keys();
  }
  values() {
    return this.data.values();
  }
  [Symbol.iterator]() {
    return this.data[Symbol.iterator]();
  }
};

// node_modules/utilium/dist/objects.js
function filterObject(object, predicate) {
  const entries2 = Object.entries(object);
  return Object.fromEntries(entries2.filter(([key, value]) => predicate(key, value)));
}
function pick(object, ...keys) {
  const picked = {};
  for (const key of keys.flat()) {
    picked[key] = object[key];
  }
  return picked;
}
function omit(object, ...keys) {
  return filterObject(object, (key) => !keys.flat().includes(key));
}
function isJSON(str) {
  try {
    JSON.parse(str);
    return true;
  } catch {
    return false;
  }
}
function resolveConstructors(object) {
  const constructors = [];
  for (let prototype = object; prototype && !["Function", "Object"].includes(prototype.constructor.name); prototype = Object.getPrototypeOf(prototype)) {
    constructors.push(prototype.constructor.name);
  }
  return constructors;
}
function bindFunctions(fns, thisValue) {
  return Object.fromEntries(Object.entries(fns).map(([k, v]) => [k, typeof v == "function" ? v.bind(thisValue) : v]));
}

// node_modules/utilium/dist/misc.js
function canary(error2 = new Error()) {
  const timeout = setTimeout(() => {
    throw error2;
  }, 5e3);
  return () => clearTimeout(timeout);
}
function _throw(e) {
  if (e && typeof e == "object" && resolveConstructors(e).includes("Error"))
    Error?.captureStackTrace(e, _throw);
  throw e;
}
function memoize(value, context) {
  if (!["getter", "accessor"].includes(context.kind))
    throw new Error("@memoize can only be used on getters and auto-accessors");
  const cache = /* @__PURE__ */ new WeakMap();
  function get4() {
    if (cache.has(this))
      return cache.get(this);
    const result = typeof value === "function" ? value.call(this) : value.get.call(this);
    cache.set(this, result);
    return result;
  }
  switch (context.kind) {
    case "getter":
      return get4;
    case "accessor":
      return { ...value, get: get4 };
  }
}

// node_modules/utilium/dist/numbers.js
var __formatter = Intl.NumberFormat("en", { notation: "compact" });
var formatCompact = __formatter.format.bind(__formatter);

// node_modules/utilium/dist/random.js
function randomInt(min = 0, max = 1) {
  return Math.round(Math.random() * (max - min) + min);
}

// node_modules/utilium/dist/string.js
function capitalize(value) {
  return value.at(0).toUpperCase() + value.slice(1);
}
var encoder = new TextEncoder();
function encodeUTF8(input) {
  return encoder.encode(input);
}
var decoder = new TextDecoder();
function decodeUTF8(input) {
  if (!input)
    return "";
  if (input.buffer instanceof ArrayBuffer && !input.buffer.resizable)
    return decoder.decode(input);
  const buffer = new Uint8Array(input.byteLength);
  buffer.set(input);
  return decoder.decode(buffer);
}
function encodeASCII(input) {
  const data = new Uint8Array(input.length);
  for (let i = 0; i < input.length; i++) {
    data[i] = input.charCodeAt(i);
  }
  return data;
}
function decodeASCII(input) {
  let output2 = "";
  for (let i = 0; i < input.length; i++) {
    output2 += String.fromCharCode(input[i]);
  }
  return output2;
}
function encodeUUID(uuid) {
  const hex2 = uuid.replace(/-/g, "");
  const data = new Uint8Array(16);
  for (let i = 0; i < 16; i++) {
    data[i] = parseInt(hex2.slice(i * 2, i * 2 + 2), 16);
  }
  return data;
}

// node_modules/kerium/dist/error.js
var Errno;
(function(Errno2) {
  Errno2[Errno2["EPERM"] = 1] = "EPERM";
  Errno2[Errno2["ENOENT"] = 2] = "ENOENT";
  Errno2[Errno2["ESRCH"] = 3] = "ESRCH";
  Errno2[Errno2["EINTR"] = 4] = "EINTR";
  Errno2[Errno2["EIO"] = 5] = "EIO";
  Errno2[Errno2["ENXIO"] = 6] = "ENXIO";
  Errno2[Errno2["E2BIG"] = 7] = "E2BIG";
  Errno2[Errno2["ENOEXEC"] = 8] = "ENOEXEC";
  Errno2[Errno2["EBADF"] = 9] = "EBADF";
  Errno2[Errno2["ECHILD"] = 10] = "ECHILD";
  Errno2[Errno2["EAGAIN"] = 11] = "EAGAIN";
  Errno2[Errno2["ENOMEM"] = 12] = "ENOMEM";
  Errno2[Errno2["EACCES"] = 13] = "EACCES";
  Errno2[Errno2["EFAULT"] = 14] = "EFAULT";
  Errno2[Errno2["ENOTBLK"] = 15] = "ENOTBLK";
  Errno2[Errno2["EBUSY"] = 16] = "EBUSY";
  Errno2[Errno2["EEXIST"] = 17] = "EEXIST";
  Errno2[Errno2["EXDEV"] = 18] = "EXDEV";
  Errno2[Errno2["ENODEV"] = 19] = "ENODEV";
  Errno2[Errno2["ENOTDIR"] = 20] = "ENOTDIR";
  Errno2[Errno2["EISDIR"] = 21] = "EISDIR";
  Errno2[Errno2["EINVAL"] = 22] = "EINVAL";
  Errno2[Errno2["ENFILE"] = 23] = "ENFILE";
  Errno2[Errno2["EMFILE"] = 24] = "EMFILE";
  Errno2[Errno2["ETXTBSY"] = 26] = "ETXTBSY";
  Errno2[Errno2["EFBIG"] = 27] = "EFBIG";
  Errno2[Errno2["ENOSPC"] = 28] = "ENOSPC";
  Errno2[Errno2["ESPIPE"] = 29] = "ESPIPE";
  Errno2[Errno2["EROFS"] = 30] = "EROFS";
  Errno2[Errno2["EMLINK"] = 31] = "EMLINK";
  Errno2[Errno2["EPIPE"] = 32] = "EPIPE";
  Errno2[Errno2["EDOM"] = 33] = "EDOM";
  Errno2[Errno2["ERANGE"] = 34] = "ERANGE";
  Errno2[Errno2["EDEADLK"] = 35] = "EDEADLK";
  Errno2[Errno2["ENAMETOOLONG"] = 36] = "ENAMETOOLONG";
  Errno2[Errno2["ENOLCK"] = 37] = "ENOLCK";
  Errno2[Errno2["ENOSYS"] = 38] = "ENOSYS";
  Errno2[Errno2["ENOTEMPTY"] = 39] = "ENOTEMPTY";
  Errno2[Errno2["ELOOP"] = 40] = "ELOOP";
  Errno2[Errno2["ENOMSG"] = 42] = "ENOMSG";
  Errno2[Errno2["EIDRM"] = 43] = "EIDRM";
  Errno2[Errno2["ECHRNG"] = 44] = "ECHRNG";
  Errno2[Errno2["EL2NSYNC"] = 45] = "EL2NSYNC";
  Errno2[Errno2["EL3HLT"] = 46] = "EL3HLT";
  Errno2[Errno2["EL3RST"] = 47] = "EL3RST";
  Errno2[Errno2["ENRNG"] = 48] = "ENRNG";
  Errno2[Errno2["EUNATCH"] = 49] = "EUNATCH";
  Errno2[Errno2["ECSI"] = 50] = "ECSI";
  Errno2[Errno2["EL2HLT"] = 51] = "EL2HLT";
  Errno2[Errno2["EBADE"] = 52] = "EBADE";
  Errno2[Errno2["EBADR"] = 53] = "EBADR";
  Errno2[Errno2["EXFULL"] = 54] = "EXFULL";
  Errno2[Errno2["ENOANO"] = 55] = "ENOANO";
  Errno2[Errno2["EBADRQC"] = 56] = "EBADRQC";
  Errno2[Errno2["EBADSLT"] = 57] = "EBADSLT";
  Errno2[Errno2["EBFONT"] = 59] = "EBFONT";
  Errno2[Errno2["ENOSTR"] = 60] = "ENOSTR";
  Errno2[Errno2["ENODATA"] = 61] = "ENODATA";
  Errno2[Errno2["ETIME"] = 62] = "ETIME";
  Errno2[Errno2["ENOSR"] = 63] = "ENOSR";
  Errno2[Errno2["ENONET"] = 64] = "ENONET";
  Errno2[Errno2["ENOPKG"] = 65] = "ENOPKG";
  Errno2[Errno2["EREMOTE"] = 66] = "EREMOTE";
  Errno2[Errno2["ENOLINK"] = 67] = "ENOLINK";
  Errno2[Errno2["EADV"] = 68] = "EADV";
  Errno2[Errno2["ESRMNT"] = 69] = "ESRMNT";
  Errno2[Errno2["ECOMM"] = 70] = "ECOMM";
  Errno2[Errno2["EPROTO"] = 71] = "EPROTO";
  Errno2[Errno2["EMULTIHOP"] = 72] = "EMULTIHOP";
  Errno2[Errno2["EDOTDOT"] = 73] = "EDOTDOT";
  Errno2[Errno2["EBADMSG"] = 74] = "EBADMSG";
  Errno2[Errno2["EOVERFLOW"] = 75] = "EOVERFLOW";
  Errno2[Errno2["ENOTUNIQ"] = 76] = "ENOTUNIQ";
  Errno2[Errno2["EBADFD"] = 77] = "EBADFD";
  Errno2[Errno2["EREMCHG"] = 78] = "EREMCHG";
  Errno2[Errno2["ELIBACC"] = 79] = "ELIBACC";
  Errno2[Errno2["ELIBBAD"] = 80] = "ELIBBAD";
  Errno2[Errno2["ELIBSCN"] = 81] = "ELIBSCN";
  Errno2[Errno2["ELIBMAX"] = 82] = "ELIBMAX";
  Errno2[Errno2["ELIBEXEC"] = 83] = "ELIBEXEC";
  Errno2[Errno2["EILSEQ"] = 84] = "EILSEQ";
  Errno2[Errno2["ERESTART"] = 85] = "ERESTART";
  Errno2[Errno2["ESTRPIPE"] = 86] = "ESTRPIPE";
  Errno2[Errno2["EUSERS"] = 87] = "EUSERS";
  Errno2[Errno2["ENOTSOCK"] = 88] = "ENOTSOCK";
  Errno2[Errno2["EDESTADDRREQ"] = 89] = "EDESTADDRREQ";
  Errno2[Errno2["EMSGSIZE"] = 90] = "EMSGSIZE";
  Errno2[Errno2["EPROTOTYPE"] = 91] = "EPROTOTYPE";
  Errno2[Errno2["ENOPROTOOPT"] = 92] = "ENOPROTOOPT";
  Errno2[Errno2["EPROTONOSUPPORT"] = 93] = "EPROTONOSUPPORT";
  Errno2[Errno2["ESOCKTNOSUPPORT"] = 94] = "ESOCKTNOSUPPORT";
  Errno2[Errno2["ENOTSUP"] = 95] = "ENOTSUP";
  Errno2[Errno2["EPFNOSUPPORT"] = 96] = "EPFNOSUPPORT";
  Errno2[Errno2["EAFNOSUPPORT"] = 97] = "EAFNOSUPPORT";
  Errno2[Errno2["EADDRINUSE"] = 98] = "EADDRINUSE";
  Errno2[Errno2["EADDRNOTAVAIL"] = 99] = "EADDRNOTAVAIL";
  Errno2[Errno2["ENETDOWN"] = 100] = "ENETDOWN";
  Errno2[Errno2["ENETUNREACH"] = 101] = "ENETUNREACH";
  Errno2[Errno2["ENETRESET"] = 102] = "ENETRESET";
  Errno2[Errno2["ECONNABORTED"] = 103] = "ECONNABORTED";
  Errno2[Errno2["ECONNRESET"] = 104] = "ECONNRESET";
  Errno2[Errno2["ENOBUFS"] = 105] = "ENOBUFS";
  Errno2[Errno2["EISCONN"] = 106] = "EISCONN";
  Errno2[Errno2["ENOTCONN"] = 107] = "ENOTCONN";
  Errno2[Errno2["ESHUTDOWN"] = 108] = "ESHUTDOWN";
  Errno2[Errno2["ETOOMANYREFS"] = 109] = "ETOOMANYREFS";
  Errno2[Errno2["ETIMEDOUT"] = 110] = "ETIMEDOUT";
  Errno2[Errno2["ECONNREFUSED"] = 111] = "ECONNREFUSED";
  Errno2[Errno2["EHOSTDOWN"] = 112] = "EHOSTDOWN";
  Errno2[Errno2["EHOSTUNREACH"] = 113] = "EHOSTUNREACH";
  Errno2[Errno2["EALREADY"] = 114] = "EALREADY";
  Errno2[Errno2["EINPROGRESS"] = 115] = "EINPROGRESS";
  Errno2[Errno2["ESTALE"] = 116] = "ESTALE";
  Errno2[Errno2["EEUCLEAN"] = 117] = "EEUCLEAN";
  Errno2[Errno2["ENOTNAM"] = 118] = "ENOTNAM";
  Errno2[Errno2["ENAVAIL"] = 119] = "ENAVAIL";
  Errno2[Errno2["EISNAM"] = 120] = "EISNAM";
  Errno2[Errno2["EREMOTEIO"] = 121] = "EREMOTEIO";
  Errno2[Errno2["EDQUOT"] = 122] = "EDQUOT";
  Errno2[Errno2["ENOMEDIUM"] = 123] = "ENOMEDIUM";
  Errno2[Errno2["EMEDIUMTYPE"] = 124] = "EMEDIUMTYPE";
  Errno2[Errno2["ECANCELED"] = 125] = "ECANCELED";
  Errno2[Errno2["ENOKEY"] = 126] = "ENOKEY";
  Errno2[Errno2["EKEYEXPIRED"] = 127] = "EKEYEXPIRED";
  Errno2[Errno2["EKEYREVOKED"] = 128] = "EKEYREVOKED";
  Errno2[Errno2["EKEYREJECTED"] = 129] = "EKEYREJECTED";
  Errno2[Errno2["EOWNERDEAD"] = 130] = "EOWNERDEAD";
  Errno2[Errno2["ENOTRECOVERABLE"] = 131] = "ENOTRECOVERABLE";
  Errno2[Errno2["ERFKILL"] = 132] = "ERFKILL";
  Errno2[Errno2["EHWPOISON"] = 133] = "EHWPOISON";
})(Errno || (Errno = {}));
var errnoMessages = {
  [Errno.EPERM]: "operation not permitted",
  [Errno.ENOENT]: "no such file or directory",
  [Errno.ESRCH]: "no such process",
  [Errno.EINTR]: "interrupted system call",
  [Errno.EIO]: "i/o error",
  [Errno.ENXIO]: "no such device or address",
  [Errno.E2BIG]: "argument list too long",
  [Errno.ENOEXEC]: "exec format error",
  [Errno.EBADF]: "bad file descriptor",
  [Errno.ECHILD]: "no child processes",
  [Errno.EAGAIN]: "resource temporarily unavailable",
  [Errno.ENOMEM]: "not enough memory",
  [Errno.EACCES]: "permission denied",
  [Errno.EFAULT]: "bad address in system call argument",
  [Errno.ENOTBLK]: "block device required",
  [Errno.EBUSY]: "resource busy or locked",
  [Errno.EEXIST]: "file already exists",
  [Errno.EXDEV]: "cross-device link not permitted",
  [Errno.ENODEV]: "no such device",
  [Errno.ENOTDIR]: "not a directory",
  [Errno.EISDIR]: "illegal operation on a directory",
  [Errno.EINVAL]: "invalid argument",
  [Errno.ENFILE]: "file table overflow",
  [Errno.EMFILE]: "too many open files",
  [Errno.ETXTBSY]: "text file is busy",
  [Errno.EFBIG]: "file too large",
  [Errno.ENOSPC]: "no space left on device",
  [Errno.ESPIPE]: "invalid seek",
  [Errno.EROFS]: "read-only file system",
  [Errno.EMLINK]: "too many links",
  [Errno.EPIPE]: "broken pipe",
  [Errno.EDOM]: "numerical argument out of domain",
  [Errno.ERANGE]: "result too large",
  [Errno.EDEADLK]: "resource deadlock would occur",
  [Errno.ENAMETOOLONG]: "name too long",
  [Errno.ENOLCK]: "no locks available",
  [Errno.ENOSYS]: "function not implemented",
  [Errno.ENOTEMPTY]: "directory not empty",
  [Errno.ELOOP]: "too many symbolic links encountered",
  [Errno.ENOMSG]: "no message of desired type",
  [Errno.EIDRM]: "identifier removed",
  [Errno.ECHRNG]: "channel number out of range",
  [Errno.EL2NSYNC]: "level 2 not synchronized",
  [Errno.EL3HLT]: "level 3 halted",
  [Errno.EL3RST]: "level 3 reset",
  [Errno.ENRNG]: "link number out of range",
  [Errno.EUNATCH]: "protocol driver not attached",
  [Errno.ECSI]: "no CSI structure available",
  [Errno.EL2HLT]: "level 2 halted",
  [Errno.EBADE]: "invalid exchange",
  [Errno.EBADR]: "invalid request descriptor",
  [Errno.EXFULL]: "exchange full",
  [Errno.ENOANO]: "no anode",
  [Errno.EBADRQC]: "invalid request code",
  [Errno.EBADSLT]: "invalid slot",
  [Errno.EBFONT]: "bad font file format",
  [Errno.ENOSTR]: "device not a stream",
  [Errno.ENODATA]: "no data available",
  [Errno.ETIME]: "timer expired",
  [Errno.ENOSR]: "out of streams resources",
  [Errno.ENONET]: "machine is not on the network",
  [Errno.ENOPKG]: "package not installed",
  [Errno.EREMOTE]: "object is remote",
  [Errno.ENOLINK]: "link has been severed",
  [Errno.EADV]: "advertise error",
  [Errno.ESRMNT]: "srmount error",
  [Errno.ECOMM]: "communication error on send",
  [Errno.EPROTO]: "protocol error",
  [Errno.EMULTIHOP]: "multihop attempted",
  [Errno.EDOTDOT]: "rFS specific error",
  [Errno.EBADMSG]: "bad message",
  [Errno.EOVERFLOW]: "value too large for defined data type",
  [Errno.ENOTUNIQ]: "name not unique on network",
  [Errno.EBADFD]: "file descriptor in bad state",
  [Errno.EREMCHG]: "remote address changed",
  [Errno.ELIBACC]: "can not access a needed shared library",
  [Errno.ELIBBAD]: "accessing a corrupted shared library",
  [Errno.ELIBSCN]: ".lib section in a.out corrupted",
  [Errno.ELIBMAX]: "attempting to link in too many shared libraries",
  [Errno.ELIBEXEC]: "cannot exec a shared library directly",
  [Errno.EILSEQ]: "illegal byte sequence",
  [Errno.ERESTART]: "interrupted system call should be restarted",
  [Errno.ESTRPIPE]: "streams pipe error",
  [Errno.EUSERS]: "too many users",
  [Errno.ENOTSOCK]: "socket operation on non-socket",
  [Errno.EDESTADDRREQ]: "destination address required",
  [Errno.EMSGSIZE]: "message too long",
  [Errno.EPROTOTYPE]: "protocol wrong type for socket",
  [Errno.ENOPROTOOPT]: "protocol not available",
  [Errno.EPROTONOSUPPORT]: "protocol not supported",
  [Errno.ESOCKTNOSUPPORT]: "socket type not supported",
  [Errno.ENOTSUP]: "operation not supported on socket",
  [Errno.EPFNOSUPPORT]: "protocol family not supported",
  [Errno.EAFNOSUPPORT]: "address family not supported",
  [Errno.EADDRINUSE]: "address already in use",
  [Errno.EADDRNOTAVAIL]: "address not available",
  [Errno.ENETDOWN]: "network is down",
  [Errno.ENETUNREACH]: "network is unreachable",
  [Errno.ENETRESET]: "network dropped connection on reset",
  [Errno.ECONNABORTED]: "software caused connection abort",
  [Errno.ECONNRESET]: "connection reset by peer",
  [Errno.ENOBUFS]: "no buffer space available",
  [Errno.EISCONN]: "socket is already connected",
  [Errno.ENOTCONN]: "socket is not connected",
  [Errno.ESHUTDOWN]: "cannot send after transport endpoint shutdown",
  [Errno.ETOOMANYREFS]: "too many references: cannot splice",
  [Errno.ETIMEDOUT]: "connection timed out",
  [Errno.ECONNREFUSED]: "connection refused",
  [Errno.EHOSTDOWN]: "host is down",
  [Errno.EHOSTUNREACH]: "host is unreachable",
  [Errno.EALREADY]: "connection already in progress",
  [Errno.EINPROGRESS]: "operation now in progress",
  [Errno.ESTALE]: "stale file handle",
  [Errno.EEUCLEAN]: "structure needs cleaning",
  [Errno.ENOTNAM]: "not a XENIX named type file",
  [Errno.ENAVAIL]: "no XENIX semaphores available",
  [Errno.EISNAM]: "is a named type file",
  [Errno.EREMOTEIO]: "remote I/O error",
  [Errno.EDQUOT]: "disk quota exceeded",
  [Errno.ENOMEDIUM]: "no medium found",
  [Errno.EMEDIUMTYPE]: "wrong medium type",
  [Errno.ECANCELED]: "operation canceled",
  [Errno.ENOKEY]: "required key not available",
  [Errno.EKEYEXPIRED]: "key has expired",
  [Errno.EKEYREVOKED]: "key has been revoked",
  [Errno.EKEYREJECTED]: "key was rejected by service",
  [Errno.EOWNERDEAD]: "owner died",
  [Errno.ENOTRECOVERABLE]: "state not recoverable",
  [Errno.ERFKILL]: "operation not possible due to RF-kill",
  [Errno.EHWPOISON]: "memory page has hardware error"
};
function setUVMessage(ex) {
  let message = `${ex.code}: ${errnoMessages[ex.errno]}, ${ex.syscall}`;
  if (ex.path)
    message += ` '${ex.path}'`;
  if (ex.dest)
    message += ` -> '${ex.dest}'`;
  const isDefault = ex.message.startsWith(errnoMessages[ex.errno]) || /^E[A-Z0-9]+: /.test(ex.message);
  if (ex.message && !isDefault)
    message += ` (${ex.message})`;
  ex.message = message;
  return ex;
}
var Exception = class _Exception extends Error {
  errno;
  code;
  path;
  dest;
  syscall;
  constructor(errno, message, ctx = {}) {
    const code = Errno[errno];
    super(message || "");
    this.errno = errno;
    this.code = code;
    Object.assign(this, omit(ctx, "message"));
    if (!message)
      setUVMessage(this);
    Error.captureStackTrace?.(this, this.constructor);
  }
  toString() {
    return this.message;
  }
  toJSON() {
    const json = {
      errno: this.errno,
      code: this.code,
      stack: this.stack,
      message: this.message
    };
    if (this.path)
      json.path = this.path;
    if (this.dest)
      json.dest = this.dest;
    if (this.syscall)
      json.syscall = this.syscall;
    return json;
  }
  static fromJSON(json) {
    const err2 = json.syscall ? new _Exception(json.errno, false, json) : new _Exception(json.errno, json.message);
    err2.stack = json.stack;
    return err2;
  }
};
function UV(code, context, path, dest) {
  if (typeof context === "string")
    context = { syscall: context, path, dest };
  const err2 = new Exception(Errno[code], false, context ?? {});
  Error.captureStackTrace?.(err2, UV);
  return err2;
}
function withErrno(code, message) {
  const err2 = new Exception(Errno[code], message ?? errnoMessages[Errno[code]]);
  Error.captureStackTrace?.(err2, withErrno);
  return err2;
}
function rethrow(extra, path, dest) {
  const ctx = typeof extra === "string" ? { syscall: extra } : extra;
  if (path)
    ctx.path = path;
  if (dest)
    ctx.dest = dest;
  return function(e) {
    Object.assign(e, ctx);
    setUVMessage(e);
    throw e;
  };
}

// node_modules/kerium/dist/log.js
var log_exports = {};
__export(log_exports, {
  Level: () => Level,
  alert: () => alert,
  configure: () => configure,
  crit: () => crit,
  debug: () => debug,
  deprecated: () => deprecated,
  emerg: () => emerg,
  entries: () => entries,
  err: () => err,
  fancy: () => fancy,
  format: () => format,
  info: () => info,
  isEnabled: () => isEnabled,
  levelOf: () => levelOf,
  levels: () => levels,
  log: () => log,
  notice: () => notice,
  warn: () => warn
});
var Level;
(function(Level2) {
  Level2[Level2["EMERG"] = 0] = "EMERG";
  Level2[Level2["ALERT"] = 1] = "ALERT";
  Level2[Level2["CRIT"] = 2] = "CRIT";
  Level2[Level2["ERR"] = 3] = "ERR";
  Level2[Level2["WARN"] = 4] = "WARN";
  Level2[Level2["NOTICE"] = 5] = "NOTICE";
  Level2[Level2["INFO"] = 6] = "INFO";
  Level2[Level2["DEBUG"] = 7] = "DEBUG";
})(Level || (Level = {}));
var levels = [
  "emergency",
  "alert",
  "critical",
  "error",
  "warning",
  "notice",
  "info",
  "debug"
];
function levelOf(value) {
  return levels.indexOf(value);
}
var entries = new List();
function log(level, message) {
  if (!isEnabled)
    return;
  const entry = {
    level,
    message,
    timestamp: /* @__PURE__ */ new Date(),
    elapsedMs: performance.now()
  };
  entries.add(entry);
  output(entry);
}
function _shortcut(level) {
  return function(message) {
    log(level, message.toString());
    return message;
  };
}
var emerg = _shortcut(Level.EMERG);
var alert = _shortcut(Level.ALERT);
var crit = _shortcut(Level.CRIT);
var err = _shortcut(Level.ERR);
var warn = _shortcut(Level.WARN);
var notice = _shortcut(Level.NOTICE);
var info = _shortcut(Level.INFO);
var debug = _shortcut(Level.DEBUG);
function deprecated(symbol) {
  log(Level.WARN, symbol + " is deprecated and should not be used.");
}
function ansi(text, format3) {
  return `\x1B[${format3}m${text}\x1B[0m`;
}
function timestamp(entry) {
  return "[" + (entry.elapsedMs / 1e3).toFixed(3).padStart(10) + "] ";
}
var levelColor = {
  ansi: {
    [Level.EMERG]: "1;4;37;41",
    [Level.ALERT]: "1;37;41",
    [Level.CRIT]: "1;35",
    [Level.ERR]: "1;31",
    [Level.WARN]: "1;33",
    [Level.NOTICE]: "1;36",
    [Level.INFO]: "1;37",
    [Level.DEBUG]: "0;2;37"
  },
  css: {
    [Level.EMERG]: "font-weight: bold; text-decoration: underline; color: white; background-color: red;",
    [Level.ALERT]: "font-weight: bold; color: white; background-color: red;",
    [Level.CRIT]: "font-weight: bold; color: magenta;",
    [Level.ERR]: "font-weight: bold; color: red;",
    [Level.WARN]: "font-weight: bold; color: yellow;",
    [Level.NOTICE]: "font-weight: bold; color: cyan;",
    [Level.INFO]: "font-weight: bold; color: white;",
    [Level.DEBUG]: "opacity: 0.8; color: white;"
  }
};
var messageColor = {
  ansi: {
    [Level.EMERG]: "1;31",
    [Level.ALERT]: "1;31",
    [Level.CRIT]: "1;31",
    [Level.ERR]: "31",
    [Level.WARN]: "33",
    [Level.NOTICE]: "1;37",
    [Level.INFO]: "37",
    [Level.DEBUG]: "2;37"
  },
  css: {
    [Level.EMERG]: "font-weight: bold; color: red;",
    [Level.ALERT]: "font-weight: bold; color: red;",
    [Level.CRIT]: "font-weight: bold; color: red;",
    [Level.ERR]: "color: red;",
    [Level.WARN]: "color: yellow;",
    [Level.NOTICE]: "font-weight: bold; color: white;",
    [Level.INFO]: "color: white;",
    [Level.DEBUG]: "opacity: 0.8; color: white;"
  }
};
function fancy({ style, colorize }) {
  return function* (entry) {
    if (style == "css")
      yield colorize == "level" ? "%c%s %c%s" : "%c%s %c%s%s %c%s";
    yield* style == "ansi" ? [ansi(timestamp(entry), "2;37")] : ["opacity: 0.8; color: white;", timestamp(entry)];
    const levelText = style == "ansi" ? [ansi(levels[entry.level].toUpperCase(), levelColor.ansi[entry.level])] : [levelColor.css[entry.level], levels[entry.level].toUpperCase()];
    if (colorize == "level") {
      yield* levelText;
      yield entry.message;
      return;
    }
    if (entry.level < Level.CRIT)
      yield* levelText;
    if (style == "ansi")
      yield ansi(entry.message, messageColor.ansi[entry.level]);
    else
      yield* [messageColor.css[entry.level], entry.message];
  };
}
var _format = (entry) => [timestamp(entry), entry.message];
function format(entry) {
  const formatted = _format(entry);
  return typeof formatted == "string" ? [formatted] : Array.from(formatted);
}
var _output = console.error;
function output(entry) {
  if (entry.level > minLevel)
    return;
  _output(...format(entry));
}
var minLevel = Level.ALERT;
var includeStack = false;
var isEnabled = true;
function configure(options) {
  _format = options.format ?? _format;
  _output = options.output ?? _output;
  minLevel = typeof options.level == "string" ? levelOf(options.level) : options.level ?? minLevel;
  isEnabled = options.enabled ?? isEnabled;
  includeStack = options.stack ?? includeStack;
  if (!options.dumpBacklog)
    return;
  for (const entry of entries) {
    output(entry);
  }
}

// node_modules/@zenfs/core/dist/backends/backend.js
function isBackend(arg) {
  return arg != null && typeof arg == "object" && "create" in arg && typeof arg.create == "function";
}
function _isClass(func) {
  if (!(func && func.constructor === Function) || func.prototype === void 0)
    return false;
  if (Function.prototype !== Object.getPrototypeOf(func))
    return true;
  return Object.getOwnPropertyNames(func.prototype).length > 1;
}
function checkOptions(backend, options) {
  if (typeof options != "object" || options === null) {
    throw err(withErrno("EINVAL", "Invalid options"));
  }
  for (const [optName, opt] of Object.entries(backend.options)) {
    const value = options?.[optName];
    if (value === void 0 || value === null) {
      if (!opt.required) {
        debug("Using default for option: " + optName);
        continue;
      }
      throw err(withErrno("EINVAL", "Missing required option: " + optName));
    }
    const isType2 = (type2, _ = value) => typeof type2 == "function" ? _isClass(type2) ? value instanceof type2 : type2(value) : typeof value === type2 || value?.constructor?.name === type2;
    if (Array.isArray(opt.type) ? opt.type.some((v) => isType2(v)) : isType2(opt.type))
      continue;
    const type = typeof value == "object" && "constructor" in value ? value.constructor.name : typeof value;
    const name = (type2) => typeof type2 == "function" ? type2.name != "type" ? type2.name : type2.toString() : type2;
    const expected = Array.isArray(opt.type) ? `one of ${opt.type.map(name).join(", ")}` : name(opt.type);
    throw err(withErrno("EINVAL", `Incorrect type for "${optName}": ${type} (expected ${expected})`));
  }
}
function isBackendConfig(arg) {
  return arg != null && typeof arg == "object" && "backend" in arg && isBackend(arg.backend);
}

// node_modules/@zenfs/core/dist/internal/credentials.js
function createCredentials(source) {
  return {
    suid: source.uid,
    sgid: source.gid,
    euid: source.uid,
    egid: source.gid,
    groups: [],
    ...source
  };
}
function credentialsAllowRoot(cred) {
  if (!cred)
    return false;
  return !cred.uid || !cred.gid || !cred.euid || !cred.egid || cred.groups.some((gid) => !gid);
}

// node_modules/@zenfs/core/dist/internal/contexts.js
var kIsContext = /* @__PURE__ */ Symbol("ZenFSContext");
function isContext(obj) {
  return typeof obj === "object" && obj !== null && kIsContext in obj;
}
function assertContext(ctx) {
  if (!isContext(ctx))
    throw warn(withErrno("EINVAL", "Invalid context provided"));
}
var defaultContext = {
  [kIsContext]: true,
  id: 0,
  root: "/",
  pwd: "/",
  credentials: createCredentials({ uid: 0, gid: 0 }),
  descriptors: /* @__PURE__ */ new Map(),
  parent: null,
  children: []
};
function contextOf($) {
  return isContext($) ? $ : defaultContext;
}

// node_modules/@zenfs/core/dist/constants.js
var constants_exports = {};
__export(constants_exports, {
  COPYFILE_EXCL: () => COPYFILE_EXCL,
  COPYFILE_FICLONE: () => COPYFILE_FICLONE,
  COPYFILE_FICLONE_FORCE: () => COPYFILE_FICLONE_FORCE,
  F_OK: () => F_OK,
  O_APPEND: () => O_APPEND,
  O_CREAT: () => O_CREAT,
  O_DIRECT: () => O_DIRECT,
  O_DIRECTORY: () => O_DIRECTORY,
  O_DSYNC: () => O_DSYNC,
  O_EXCL: () => O_EXCL,
  O_NOATIME: () => O_NOATIME,
  O_NOCTTY: () => O_NOCTTY,
  O_NOFOLLOW: () => O_NOFOLLOW,
  O_NONBLOCK: () => O_NONBLOCK,
  O_RDONLY: () => O_RDONLY,
  O_RDWR: () => O_RDWR,
  O_SYMLINK: () => O_SYMLINK,
  O_SYNC: () => O_SYNC,
  O_TRUNC: () => O_TRUNC,
  O_WRONLY: () => O_WRONLY,
  R_OK: () => R_OK,
  S_IFBLK: () => S_IFBLK,
  S_IFCHR: () => S_IFCHR,
  S_IFDIR: () => S_IFDIR,
  S_IFIFO: () => S_IFIFO,
  S_IFLNK: () => S_IFLNK,
  S_IFMT: () => S_IFMT,
  S_IFREG: () => S_IFREG,
  S_IFSOCK: () => S_IFSOCK,
  S_IRGRP: () => S_IRGRP,
  S_IROTH: () => S_IROTH,
  S_IRUSR: () => S_IRUSR,
  S_IRWXG: () => S_IRWXG,
  S_IRWXO: () => S_IRWXO,
  S_IRWXU: () => S_IRWXU,
  S_ISGID: () => S_ISGID,
  S_ISUID: () => S_ISUID,
  S_ISVTX: () => S_ISVTX,
  S_IWGRP: () => S_IWGRP,
  S_IWOTH: () => S_IWOTH,
  S_IWUSR: () => S_IWUSR,
  S_IXGRP: () => S_IXGRP,
  S_IXOTH: () => S_IXOTH,
  S_IXUSR: () => S_IXUSR,
  UV_FS_O_FILEMAP: () => UV_FS_O_FILEMAP,
  W_OK: () => W_OK,
  X_OK: () => X_OK,
  size_max: () => size_max
});
var F_OK = 0;
var R_OK = 4;
var W_OK = 2;
var X_OK = 1;
var COPYFILE_EXCL = 1;
var COPYFILE_FICLONE = 2;
var COPYFILE_FICLONE_FORCE = 4;
var O_RDONLY = 0;
var O_WRONLY = 1;
var O_RDWR = 2;
var O_CREAT = 64;
var O_EXCL = 128;
var O_NOCTTY = 256;
var O_TRUNC = 512;
var O_APPEND = 1024;
var O_DIRECTORY = 65536;
var O_NOATIME = 262144;
var O_NOFOLLOW = 131072;
var O_SYNC = 1052672;
var O_DSYNC = 4096;
var O_SYMLINK = 32768;
var O_DIRECT = 16384;
var O_NONBLOCK = 2048;
var S_IFMT = 61440;
var S_IFSOCK = 49152;
var S_IFLNK = 40960;
var S_IFREG = 32768;
var S_IFBLK = 24576;
var S_IFDIR = 16384;
var S_IFCHR = 8192;
var S_IFIFO = 4096;
var S_ISUID = 2048;
var S_ISGID = 1024;
var S_ISVTX = 512;
var S_IRWXU = 448;
var S_IRUSR = 256;
var S_IWUSR = 128;
var S_IXUSR = 64;
var S_IRWXG = 56;
var S_IRGRP = 32;
var S_IWGRP = 16;
var S_IXGRP = 8;
var S_IRWXO = 7;
var S_IROTH = 4;
var S_IWOTH = 2;
var S_IXOTH = 1;
var UV_FS_O_FILEMAP = 0;
var size_max = 4294967295;

// node_modules/memium/dist/types.js
function isArrayType(type) {
  return "__isArrayType" in type && type.__isArrayType === true;
}
function isType(type) {
  if (typeof type != "object" && typeof type != "function" || type === null || type === void 0)
    return false;
  if (isArrayType(type))
    return isType(type.type);
  return "name" in type && "size" in type && "get" in type && "set" in type && typeof type.name == "string" && typeof type.size == "number" && typeof type.get == "function" && typeof type.set == "function" && typeRegistry.has(type.name) && typeRegistry.get(type.name)?.name === type.name;
}
var typeRegistry = /* @__PURE__ */ new Map();
function registerType(t) {
  if (typeRegistry.has(t.name))
    throw new ReferenceError(`Type is already registered: ${t.name}`);
  typeRegistry.set(t.name, t);
}

// node_modules/memium/dist/primitives.js
var __view__ = /* @__PURE__ */ Symbol("DataView");
function view(buffer) {
  buffer[__view__] ??= new DataView(buffer);
  return buffer[__view__];
}
var int8 = {
  name: "int8",
  size: 1,
  array: Int8Array,
  get: (buffer, offset) => view(buffer).getInt8(offset),
  set: (buffer, offset, value) => view(buffer).setInt8(offset, value)
};
var uint8 = {
  name: "uint8",
  size: 1,
  array: Uint8Array,
  get: (buffer, offset) => view(buffer).getUint8(offset),
  set: (buffer, offset, value) => view(buffer).setUint8(offset, value)
};
var int16 = {
  name: "int16",
  size: 2,
  array: Int16Array,
  get: (buffer, offset) => view(buffer).getInt16(offset, true),
  set: (buffer, offset, value) => view(buffer).setInt16(offset, value, true)
};
var uint16 = {
  name: "uint16",
  size: 2,
  array: Uint16Array,
  get: (buffer, offset) => view(buffer).getUint16(offset, true),
  set: (buffer, offset, value) => view(buffer).setUint16(offset, value, true)
};
var int32 = {
  name: "int32",
  size: 4,
  array: Int32Array,
  get: (buffer, offset) => view(buffer).getInt32(offset, true),
  set: (buffer, offset, value) => view(buffer).setInt32(offset, value, true)
};
var uint32 = {
  name: "uint32",
  size: 4,
  array: Uint32Array,
  get: (buffer, offset) => view(buffer).getUint32(offset, true),
  set: (buffer, offset, value) => view(buffer).setUint32(offset, value, true)
};
var int64 = {
  name: "int64",
  size: 8,
  array: BigInt64Array,
  get: (buffer, offset) => view(buffer).getBigInt64(offset, true),
  set: (buffer, offset, value) => view(buffer).setBigInt64(offset, value, true)
};
var uint64 = {
  name: "uint64",
  size: 8,
  array: BigUint64Array,
  get: (buffer, offset) => view(buffer).getBigUint64(offset, true),
  set: (buffer, offset, value) => view(buffer).setBigUint64(offset, value, true)
};
var float32 = {
  name: "float32",
  size: 4,
  array: Float32Array,
  get: (buffer, offset) => view(buffer).getFloat32(offset, true),
  set: (buffer, offset, value) => view(buffer).setFloat32(offset, value, true)
};
var float64 = {
  name: "float64",
  size: 8,
  array: Float64Array,
  get: (buffer, offset) => view(buffer).getFloat64(offset, true),
  set: (buffer, offset, value) => view(buffer).setFloat64(offset, value, true)
};
var types = {
  int8,
  uint8,
  int16,
  uint16,
  int32,
  uint32,
  int64,
  uint64,
  float32,
  float64
};
var typeNames = Object.keys(types);
for (const t of Object.values(types))
  registerType(t);
var rawTypes = {
  ...types,
  ...Object.fromEntries(typeNames.map((t) => [capitalize(t), types[t]])),
  char: uint8
};
var validNames = Object.keys(rawTypes);
function isValid(type) {
  return validNames.includes(type.toString());
}
function checkValid(type) {
  if (!isValid(type))
    throw withErrno("EINVAL", "Not a valid primitive type: " + type);
}
function normalize(type) {
  return type == "char" ? "uint8" : type.toLowerCase();
}

// node_modules/memium/dist/fields.internal.js
function _isBuilder(init2) {
  return (typeof init2 == "object" || typeof init2 == "function") && init2 !== null && "toInit" in init2 && typeof init2.toInit == "function";
}
function _parseConfig(init2) {
  if (_isBuilder(init2))
    return init2.toInit();
  if (isType(init2))
    return { type: init2 };
  return init2;
}
function init(_name, init2, extraOpts = {}) {
  if (!_name)
    throw withErrno("EINVAL", "Invalid name for struct field");
  if (typeof _name == "symbol")
    console.warn("Symbol used for struct field name will be coerced to string: " + _name.toString());
  const name = _name.toString();
  const opt = Object.assign(_parseConfig(init2), extraOpts);
  if (!isType(opt.type))
    throw withErrno("EINVAL", `Invalid type for struct field "${name}"`);
  const countedBy = !opt.countedBy ? "" : ` counted_by(${typeof opt.countedBy == "string" ? opt.countedBy : "<function>"})`;
  return {
    name,
    offset: 0,
    type: opt.type,
    countedBy: opt.countedBy,
    alignment: opt.align ?? opt.type.size,
    decl: isArrayType(opt.type) ? `${opt.typeName ?? opt.type.type.name} ${name}[${opt.type.length}]${countedBy}` : `${opt.typeName ?? opt.type.name} ${name}`,
    littleEndian: !opt.bigEndian
  };
}
function __fault(err2, offset) {
  if (!(err2 instanceof Error) || err2.message.toLowerCase() !== "offset is outside the bounds of the dataview")
    throw err2;
  const ex = withErrno("EFAULT", `Segmentation fault (at 0x${offset.toString(16)})`);
  Error.captureStackTrace(ex, __fault);
  throw ex;
}
function isDynamicArray(instance, field2) {
  return isArrayType(field2.type) && field2.type.length == 0 && field2.countedBy?.length && instance.constructor.isDynamic;
}
function _count(instance, field2) {
  let value = typeof field2.countedBy == "function" ? field2.countedBy(instance) : instance[field2.countedBy];
  if (typeof value == "bigint") {
    if (value > BigInt(Number.MAX_SAFE_INTEGER)) {
      throw withErrno("EOVERFLOW", "countedBy field value exceeds max safe integer");
    }
    value = Number(value);
  }
  if (typeof value != "number")
    throw withErrno("EINVAL", "countedBy field value is not a number");
  return value;
}
function dynamicArraySize(instance, field2) {
  let size = field2.type.type.size * _count(instance, field2);
  if (isStructConstructor(field2.type.type) && field2.type.type.isDynamic) {
    for (const item of instance[field2.name]) {
      size += dynamicStructSize(item);
    }
  }
  return size;
}
var kOffsets = /* @__PURE__ */ Symbol("kOffsets");
var kStaticLayout = /* @__PURE__ */ Symbol("kStaticLayout");
function hasStaticLayout(struct3) {
  if (struct3[kStaticLayout] !== void 0)
    return struct3[kStaticLayout];
  let isStatic = !struct3.isDynamic;
  if (isStatic)
    for (const field2 of struct3.fields) {
      const base = isArrayType(field2.type) ? field2.type.baseType : field2.type;
      if (isStructConstructor(base) && base.isDynamic) {
        isStatic = false;
        break;
      }
    }
  Object.defineProperty(struct3, kStaticLayout, { value: isStatic, configurable: true });
  return isStatic;
}
var kFixedFields = /* @__PURE__ */ Symbol("kFixedFields");
function fixedFields(struct3) {
  if (Object.hasOwn(struct3, kFixedFields))
    return struct3[kFixedFields];
  const fixed = /* @__PURE__ */ new Set();
  if (!struct3.isUnion)
    for (const field2 of struct3.fields) {
      fixed.add(field2.name);
      if (isArrayType(field2.type) && !field2.type.length && field2.countedBy)
        break;
      const base = isArrayType(field2.type) ? field2.type.baseType : field2.type;
      if (isStructConstructor(base) && base.isDynamic)
        break;
    }
  Object.defineProperty(struct3, kFixedFields, { value: fixed, configurable: true });
  return fixed;
}
function offsetOf(instance, targetField, cache) {
  if (hasStaticLayout(instance.constructor))
    return targetField.offset;
  if (fixedFields(instance.constructor).has(targetField.name))
    return targetField.offset;
  let { offset, name } = targetField;
  instance[kOffsets] ||= /* @__PURE__ */ Object.create(null);
  const offsetCache = instance[kOffsets];
  if (offsetCache[name] !== void 0) {
    if (cache)
      return offsetCache[name];
    else
      delete offsetCache[name];
  }
  const { fields } = instance.constructor;
  const index = fields.indexOf(targetField);
  for (const field2 of fields.slice(0, index)) {
    if (isDynamicArray(instance, field2)) {
      offset += dynamicArraySize(instance, field2);
    }
    const value = instance[field2.name];
    if (isStructInstance(value) && value.constructor.isDynamic) {
      offset += dynamicStructSize(value);
    }
  }
  if (cache)
    offsetCache[name] = offset;
  else {
    for (const field2 of fields.slice(index))
      if (offsetCache[field2.name] !== void 0)
        delete offsetCache[field2.name];
  }
  return offset;
}
function set(instance, field2, value, index) {
  if (typeof value == "string")
    value = value.charCodeAt(0);
  const offset = instance.byteOffset + offsetOf(instance, field2, false) + (index ?? 0) * field2.type.size;
  try {
    field2.type.set(instance.buffer, offset, value);
    return;
  } catch (err2) {
    __fault(err2, offset);
  }
}
var kDescriptors = /* @__PURE__ */ Symbol("kDescriptors");
function descriptorsOf(struct3) {
  if (Object.hasOwn(struct3, kDescriptors))
    return struct3[kDescriptors];
  const descriptors = {};
  for (const field2 of struct3.fields) {
    descriptors[field2.name] = {
      enumerable: true,
      configurable: true,
      get() {
        return get(this, field2);
      },
      set(value) {
        set(this, field2, value);
      }
    };
  }
  Object.defineProperty(struct3, kDescriptors, { value: descriptors, configurable: true });
  return descriptors;
}
function definePrototypeFields(struct3) {
  Object.defineProperties(struct3.prototype, descriptorsOf(struct3));
}
var kViews = /* @__PURE__ */ Symbol("kViews");
function get(instance, field2) {
  let type = field2.type;
  const dynamic = isDynamicArray(instance, field2);
  if (dynamic) {
    const inner = field2.type.type;
    type = ArrayType.for(inner, _count(instance, field2));
  }
  const cacheable = !dynamic && (isArrayType(type) || isStructConstructor(type)) && hasStaticLayout(instance.constructor);
  if (cacheable) {
    const views = instance[kViews] ??= /* @__PURE__ */ Object.create(null);
    if (views[field2.name] !== void 0)
      return views[field2.name];
  }
  const offset = instance.byteOffset + offsetOf(instance, field2, true);
  try {
    const value = type.get(instance.buffer, offset);
    if (cacheable)
      instance[kViews][field2.name] = value;
    return value;
  } catch (err2) {
    __fault(err2, offset);
  }
}

// node_modules/memium/dist/structs.shared.js
function isStructInstance(arg) {
  return typeof arg == "object" && arg !== null && "constructor" in arg && isStructConstructor(arg.constructor);
}
function isStructConstructor(arg) {
  return typeof arg == "function" && "prototype" in arg && "fields" in arg && typeof arg.fields == "object" && isType(arg);
}
function dynamicStructSize(instance) {
  let size = 0;
  for (const field2 of instance.constructor.fields) {
    const value = instance[field2.name];
    if (isDynamicArray(instance, field2)) {
      size += dynamicArraySize(instance, field2);
    }
    if (isStructInstance(value) && value.constructor.isDynamic) {
      size += dynamicStructSize(value);
    }
  }
  return size;
}

// node_modules/memium/dist/misc.js
function static_sizeof(type) {
  if (isType(type))
    return type.size;
  if (type === void 0 || type === null)
    return 0;
  if (typeof type == "object" && isType(type.constructor))
    return type.constructor.size;
  if (Array.isArray(type)) {
    let size = 0;
    for (let i = 0; i < type.length; i++)
      size += static_sizeof(type[i]);
    return size;
  }
  if (typeof type == "string") {
    checkValid(type);
    return types[normalize(type)].size;
  }
  throw new TypeError(`Unable to resolve size of \`${type.toString()}\``);
}
function sizeof(type) {
  const size = static_sizeof(type);
  if (isStructInstance(type) && type.constructor.isDynamic) {
    return size + dynamicStructSize(type);
  }
  return size;
}
function offsetof(type, fieldName) {
  let constructor;
  if (isStructConstructor(type)) {
    if (type.isDynamic)
      throw withErrno("EINVAL", "Cannot get offset of field in dynamic struct from the constructor");
    constructor = type;
  } else if (isStructInstance(type))
    constructor = type.constructor;
  else
    throw withErrno("EINVAL", "Type is not a struct or struct constructor");
  const { fields } = constructor;
  const field2 = fields.find((f) => f.name === fieldName);
  if (!field2)
    throw withErrno("EINVAL", "Struct does not have field: " + fieldName);
  return isStructConstructor(type) ? field2.offset : offsetOf(type, field2, true);
}

// node_modules/memium/dist/array.js
var __runInitializers = function(thisArg, initializers, value) {
  var useValue = arguments.length > 2;
  for (var i = 0; i < initializers.length; i++) {
    value = useValue ? initializers[i].call(thisArg, value) : initializers[i].call(thisArg);
  }
  return useValue ? value : void 0;
};
var __esDecorate = function(ctor, descriptorIn, decorators, contextIn, initializers, extraInitializers) {
  function accept(f) {
    if (f !== void 0 && typeof f !== "function") throw new TypeError("Function expected");
    return f;
  }
  var kind = contextIn.kind, key = kind === "getter" ? "get" : kind === "setter" ? "set" : "value";
  var target = !descriptorIn && ctor ? contextIn["static"] ? ctor : ctor.prototype : null;
  var descriptor = descriptorIn || (target ? Object.getOwnPropertyDescriptor(target, contextIn.name) : {});
  var _, done = false;
  for (var i = decorators.length - 1; i >= 0; i--) {
    var context = {};
    for (var p in contextIn) context[p] = p === "access" ? {} : contextIn[p];
    for (var p in contextIn.access) context.access[p] = contextIn.access[p];
    context.addInitializer = function(f) {
      if (done) throw new TypeError("Cannot add initializers after decoration has completed");
      extraInitializers.push(accept(f || null));
    };
    var result = (0, decorators[i])(kind === "accessor" ? { get: descriptor.get, set: descriptor.set } : descriptor[key], context);
    if (kind === "accessor") {
      if (result === void 0) continue;
      if (result === null || typeof result !== "object") throw new TypeError("Object expected");
      if (_ = accept(result.get)) descriptor.get = _;
      if (_ = accept(result.set)) descriptor.set = _;
      if (_ = accept(result.init)) initializers.unshift(_);
    } else if (_ = accept(result)) {
      if (kind === "field") initializers.unshift(_);
      else descriptor[key] = _;
    }
  }
  if (target) Object.defineProperty(target, contextIn.name, descriptor);
  done = true;
};
var _strictIndexes = false;
function StructArray(type, __length) {
  class StructArray2 extends DataView {
    length;
    type = type;
    *[Symbol.iterator]() {
      for (let i = 0; i < this.length; i++)
        yield this[i];
    }
    _offsets = [0];
    offsetOf(index) {
      if (!type.isDynamic)
        return index * type.size;
      if (index < this._offsets.length)
        return this._offsets[index];
      for (let i = this._offsets.length; i <= index; i++) {
        this._offsets[i] = this._offsets[i - 1] + sizeof(type.get(this.buffer, this.byteOffset + this._offsets[i - 1]));
      }
      return this._offsets[index];
    }
    constructor(lengthOrBuffer, byteOffset, byteLength) {
      const buffer = typeof lengthOrBuffer === "object" ? lengthOrBuffer : new ArrayBuffer((lengthOrBuffer ?? 0) * type.size);
      super(buffer, byteOffset, byteLength);
      this.length = typeof lengthOrBuffer === "number" ? lengthOrBuffer : type.isDynamic ? __length ?? _throw(`Unknown length of StructArray<${type.name}>`) : Math.floor(this.byteLength / type.size);
      const offset = (i) => this.byteOffset + this.offsetOf(i);
      const views = _isStructConstructor(type) && !type.isDynamic ? [] : void 0;
      return new Proxy(this, {
        get(target, index) {
          if (index in target)
            return target[index];
          const i = parseInt(index.toString());
          if (!Number.isSafeInteger(i))
            if (_strictIndexes)
              throw withErrno("EINVAL", "Invalid index: " + index.toString());
            else
              return void 0;
          if (!views)
            return type.get(target.buffer, offset(i));
          return views[i] ??= type.get(target.buffer, offset(i));
        },
        set(target, index, value) {
          const i = parseInt(index.toString());
          if (!Number.isSafeInteger(i))
            if (_strictIndexes)
              throw withErrno("EINVAL", "Invalid index: " + index.toString());
            else
              return false;
          type.set(target.buffer, offset(i), value);
          return true;
        }
      });
    }
  }
  for (const key of Object.getOwnPropertyNames(DataView.prototype)) {
    if (!key.startsWith("get") && !key.startsWith("set"))
      continue;
    Object.defineProperty(StructArray2.prototype, key, {
      enumerable: false,
      configurable: false,
      writable: false,
      value: void 0
    });
  }
  return StructArray2;
}
function _isStructConstructor(arg) {
  return typeof arg == "function" && "prototype" in arg && "fields" in arg && typeof arg.fields == "object" && isType(arg);
}
var ArrayType = (() => {
  let _instanceExtraInitializers = [];
  let _get___structArray_decorators;
  let _get___arrayType_decorators;
  let _get_array_decorators;
  return class ArrayType2 {
    static {
      const _metadata = typeof Symbol === "function" && Symbol.metadata ? /* @__PURE__ */ Object.create(null) : void 0;
      _get___structArray_decorators = [memoize];
      _get___arrayType_decorators = [memoize];
      _get_array_decorators = [memoize];
      __esDecorate(this, null, _get___structArray_decorators, { kind: "getter", name: "__structArray", static: false, private: false, access: { has: (obj) => "__structArray" in obj, get: (obj) => obj.__structArray }, metadata: _metadata }, null, _instanceExtraInitializers);
      __esDecorate(this, null, _get___arrayType_decorators, { kind: "getter", name: "__arrayType", static: false, private: false, access: { has: (obj) => "__arrayType" in obj, get: (obj) => obj.__arrayType }, metadata: _metadata }, null, _instanceExtraInitializers);
      __esDecorate(this, null, _get_array_decorators, { kind: "getter", name: "array", static: false, private: false, access: { has: (obj) => "array" in obj, get: (obj) => obj.array }, metadata: _metadata }, null, _instanceExtraInitializers);
      if (_metadata) Object.defineProperty(this, Symbol.metadata, { enumerable: true, configurable: true, writable: true, value: _metadata });
    }
    type = __runInitializers(this, _instanceExtraInitializers);
    length;
    name;
    size;
    // Defining a `StructArray` class is expensive, and most array types never need one
    get __structArray() {
      return StructArray(this.type, this.length);
    }
    get __arrayType() {
      return this.type.array ? this.type.array : this.__structArray;
    }
    /** @internal @hidden */
    __isArrayType = true;
    /**
     * The "root" type of the array.
     * For example, `uint8` for `uint8[x][y]`
     */
    baseType;
    /**
     * Use `ArrayType.for()` instead!
     * @todo [breaking] make this protected
     * @internal
     */
    constructor(type, length) {
      this.type = type;
      this.length = length;
      this.name = `${type.name}[${length}]`;
      this.size = type.size * length;
      this.baseType = type;
      while (isArrayType(this.baseType))
        this.baseType = this.baseType.type;
    }
    /** Array types are immutable and fully described by their name, so they can be shared. */
    static _cache = /* @__PURE__ */ new Map();
    /** Get the array type for an element type and length, reusing an existing one when possible. */
    static for(type, length) {
      const name = `${type.name}[${length}]`;
      let arrayType = this._cache.get(name);
      if (!arrayType)
        this._cache.set(name, arrayType = new ArrayType2(type, length));
      return arrayType;
    }
    get = (buffer, offset) => {
      if (isValid(this.type.name) && offset % this.type.size !== 0) {
        return new this.__structArray(buffer, offset, this.size);
      }
      return new this.__arrayType(buffer, offset, this.size);
    };
    set = (buffer, offset, value) => {
      if (this.length)
        for (let i = 0; i < this.length; i++) {
          this.type.set(buffer, offset + i * this.type.size, value[i]);
        }
      else {
        let pointer = offset;
        for (let i = 0; i < value.length; i++) {
          this.type.set(buffer, pointer, value[i]);
          pointer += _isStructConstructor(this.type) && this.type.isDynamic ? sizeof(value[i]) : this.type.size;
        }
      }
    };
    /**
     * This is for an array of this array
     */
    get array() {
      return StructArray(this);
    }
  };
})();

// node_modules/memium/dist/decorators.js
Symbol.metadata ??= /* @__PURE__ */ Symbol.for("Symbol.metadata");
function initMetadata(context) {
  context.metadata ??= {};
  const existing = context.metadata.structInit ?? {};
  context.metadata.structInit = {
    fields: [...existing.fields ?? []]
  };
  return context.metadata.structInit;
}
function struct(...options) {
  const opts = options.reduce((acc, opt) => ({ ...acc, ...opt }), {});
  if (typeof this == "object")
    Object.assign(opts, this);
  return function __decorateStruct(target, context) {
    const init2 = initMetadata(context);
    let fieldAlignment = 1;
    const fields = [];
    let size = 0;
    const align = (to) => {
      size = Math.ceil(size / to) * to;
    };
    for (const field2 of init2.fields) {
      if (!opts.isPacked)
        align(field2.alignment);
      if (opts.isUnion)
        size = Math.max(size, field2.type.size);
      else {
        field2.offset = size;
        size += field2.type.size;
      }
      fields.push(field2);
      fieldAlignment = Math.max(fieldAlignment, field2.alignment);
    }
    opts.alignment ??= fieldAlignment;
    if (!opts.isPacked)
      align(opts.alignment);
    class _struct extends target {
      static name = target.name;
      static size = size;
      static alignment = opts.alignment;
      static isUnion = !!opts.isUnion;
      static isDynamic = !!opts.isDynamic;
      static fields = fields;
      static get(buffer, offset) {
        return new this(buffer, offset);
      }
      static set(buffer, offset, value) {
        const source = new Uint8Array(value.buffer, value.byteOffset, this.size);
        const target2 = new Uint8Array(buffer, offset, this.size);
        if (value.buffer === buffer && value.byteOffset === offset)
          return;
        for (let i = 0; i < this.size; i++)
          target2[i] = source[i];
      }
      static [Symbol.toStringTag] = `[struct ${target.name}]`;
      constructor(...args) {
        if (!args.length)
          args = [new ArrayBuffer(size), 0, size];
        super(...args);
        if (!opts.fastFields)
          Object.defineProperties(this, descriptorsOf(this.constructor));
      }
    }
    definePrototypeFields(_struct);
    context.addInitializer(function() {
      Object.defineProperty(_struct, "name", { value: target.name });
      registerType(_struct);
    });
    return _struct;
  };
}
struct.packed = struct.bind({ isPacked: true });
struct.align = function(alignment) {
  return struct.bind({ alignment });
};
function field(type, opt = {}) {
  return function __decorateField(value, context) {
    if (context.kind != "accessor")
      throw withErrno("EINVAL", "Field must be an accessor");
    const init2 = initMetadata(context);
    const field2 = init(context.name, type, opt);
    init2.fields.push(field2);
    return {
      get() {
        return get(this, field2);
      },
      set(value2) {
        set(this, field2, value2);
      }
    };
  };
}
function _shortcut2(typeName) {
  const type = types[normalize(typeName)];
  function __decoratePrimitiveField(valueOrLength, context) {
    return typeof valueOrLength == "number" ? field(new ArrayType(type, valueOrLength), { typeName, ...context }) : field(type, { typeName })(valueOrLength, context && "name" in context ? context : _throw(withErrno("EINVAL", "Invalid decorator context object")));
  }
  return __decoratePrimitiveField;
}
var types2 = Object.fromEntries(validNames.map((t) => [t, _shortcut2(t)]));
function $from(t) {
  return t;
}
$from.typed = function(t) {
  return t;
};

// node_modules/memium/dist/fields.js
var FieldBuilder = class _FieldBuilder {
  type;
  init;
  constructor(type, init2) {
    this.type = type;
    this.init = init2;
    const _toArray = ((length) => {
      return new _FieldBuilder(new ArrayType(type, length), init2);
    });
    Object.setPrototypeOf(_toArray, new.target.prototype);
    Object.assign(_toArray, { type, init: init2 });
    return _toArray;
  }
  /**
   * Align the field to a given byte boundary.
   */
  align(align) {
    return new _FieldBuilder(this.type, { ...this.init, align });
  }
  countedBy(countedBy) {
    return new _FieldBuilder(this.type, { ...this.init, countedBy });
  }
  /**
   * Set the field to big-endian.
   */
  bigEndian() {
    return new _FieldBuilder(this.type, { ...this.init, bigEndian: true });
  }
  toInit() {
    return { type: this.type, ...this.init };
  }
  /**
   * Override the typescript type of the field's value, for example to override `number` with an enum type.
   * This does not have any runtime effects.
   */
  $type() {
    return new _FieldBuilder(this.type, this.init);
  }
};
function array(type, length = 0) {
  return new FieldBuilder(new ArrayType(type, length), {});
}

// node_modules/memium/dist/structs.js
function struct2(structName, fieldDecls, ...options) {
  const opts = options.reduce((acc, opt) => ({ ...acc, ...opt }), {});
  if (typeof this == "object")
    Object.assign(opts, this);
  let fieldAlignment = 1;
  let size = 0;
  const align = (to) => {
    size = Math.ceil(size / to) * to;
  };
  const fields = [];
  for (const [name, init2] of Object.entries(fieldDecls)) {
    if (typeof name == "number")
      throw new TypeError("Field names can not be numbers");
    const field2 = init(name, init2);
    if (!opts.isPacked)
      align(field2.alignment);
    if (opts.isUnion)
      size = Math.max(size, field2.type.size);
    else {
      field2.offset = size;
      size += field2.type.size;
    }
    fields.push(field2);
    fieldAlignment = Math.max(fieldAlignment, field2.alignment);
  }
  opts.alignment ??= fieldAlignment;
  if (!opts.isPacked)
    align(opts.alignment);
  class _struct extends DataView {
    static name = structName;
    static size = size;
    static alignment = opts.alignment;
    static isUnion = !!opts.isUnion;
    static isDynamic = !!opts.isDynamic;
    static fields = fields;
    static get(buffer, offset) {
      return new this(buffer, offset);
    }
    static set(buffer, offset, value) {
      const source = new Uint8Array(value.buffer, value.byteOffset, this.size);
      const target = new Uint8Array(buffer, offset, this.size);
      if (value.buffer === buffer && value.byteOffset === offset)
        return;
      for (let i = 0; i < this.size; i++)
        target[i] = source[i];
    }
    static [Symbol.toStringTag] = `[struct ${structName}]`;
    constructor(buffer = new ArrayBuffer(size), byteOffset, byteLength) {
      super(buffer, byteOffset, byteLength ?? buffer.byteLength - (byteOffset ?? 0));
      if (!opts.fastFields)
        Object.defineProperties(this, descriptorsOf(this.constructor));
    }
  }
  for (const key of Object.getOwnPropertyNames(DataView.prototype)) {
    if (!key.startsWith("get") && !key.startsWith("set"))
      continue;
    Object.defineProperty(_struct.prototype, key, {
      enumerable: false,
      configurable: false,
      writable: false,
      value: void 0
    });
  }
  definePrototypeFields(_struct);
  registerType(_struct);
  return _struct;
}
struct2.extend = function(base, structName, fieldDecls, ...options) {
  const opts = options.reduce((acc, opt) => ({ ...acc, ...opt }), {});
  if (typeof this == "object")
    Object.assign(opts, this);
  let fieldAlignment = 1;
  let size = base.size;
  const align = (to) => {
    size = Math.ceil(size / to) * to;
  };
  const fields = [...base.fields];
  for (const [name, init2] of Object.entries(fieldDecls)) {
    if (typeof name == "number")
      throw new TypeError("Field names can not be numbers");
    const field2 = init(name, init2);
    if (!opts.isPacked)
      align(field2.alignment);
    if (opts.isUnion)
      size = Math.max(size, field2.type.size);
    else {
      field2.offset = size;
      size += field2.type.size;
    }
    fields.push(field2);
    fieldAlignment = Math.max(fieldAlignment, field2.alignment);
  }
  opts.alignment ??= fieldAlignment;
  if (!opts.isPacked)
    align(opts.alignment);
  class _struct extends base {
    static name = structName;
    static size = size;
    static alignment = opts.alignment;
    static isUnion = !!opts.isUnion;
    static isDynamic = !!opts.isDynamic;
    static fields = fields;
    static [Symbol.toStringTag] = `[struct ${structName}]`;
  }
  definePrototypeFields(_struct);
  registerType(_struct);
  return _struct;
};
struct2.packed = struct2.bind({ isPacked: true });
struct2.align = function(alignment) {
  return struct2.bind({ alignment });
};
struct2.dynamic = struct2.bind({ isDynamic: true });
var types3 = Object.fromEntries(Object.entries(rawTypes).map(([typeName, type]) => [typeName, new FieldBuilder(type, { typeName })]));

// node_modules/@zenfs/core/dist/utils.js
function decodeDirListing(data) {
  return JSON.parse(decodeUTF8(data), (k, v) => k == "" ? v : typeof v == "string" ? BigInt(v).toString(16).slice(0, Math.min(v.length, 8)) : v);
}
function encodeDirListing(data) {
  return encodeUTF8(JSON.stringify(data));
}
function normalizeMode(mode, def) {
  if (typeof mode == "number")
    return mode;
  if (typeof mode == "string") {
    const parsed = parseInt(mode, 8);
    if (!isNaN(parsed)) {
      return parsed;
    }
  }
  if (typeof def == "number")
    return def;
  throw withErrno("EINVAL", "Invalid mode: " + mode?.toString());
}
var fd_max = 2147483647;
function validateFD(fd) {
  if (Number.isInteger(fd) && fd >= 0 && fd <= fd_max)
    return;
  throw Object.assign(new RangeError(`The value of "fd" is out of range. It must be >= 0 && <= ${fd_max}. Received ${fd}`), {
    code: "ERR_OUT_OF_RANGE"
  });
}
function _isNoEntry(e) {
  const { code } = e ?? {};
  return code == "ENOENT" || code == "ENOTDIR";
}
function normalizeTime(time) {
  if (time instanceof Date)
    return time.getTime();
  const seconds = Number(time);
  if (!Number.isFinite(seconds))
    throw withErrno("EINVAL", "Invalid time.");
  return seconds < 0 ? Date.now() : seconds * 1e3;
}
function normalizePath(p, noResolve = false) {
  if (p instanceof URL) {
    if (p.protocol != "file:")
      throw withErrno("EINVAL", "URLs must use the file: protocol");
    p = p.pathname;
  }
  p = p.toString();
  if (p.startsWith("file://"))
    p = p.slice("file://".length);
  if (p.includes("\0"))
    throw withErrno("EINVAL", "Path can not contain null character");
  if (p.length == 0)
    throw withErrno("EINVAL", "Path can not be empty");
  p = p.replaceAll(/[/\\]+/g, "/");
  return noResolve ? p : resolve.call(this, p);
}
function normalizeOptions(options, encoding = "utf8", flag, mode = 0) {
  if (typeof options != "object" || options === null) {
    return {
      encoding: typeof options == "string" ? options : encoding ?? null,
      flag,
      mode
    };
  }
  return {
    encoding: typeof options?.encoding == "string" ? options.encoding : encoding ?? null,
    flag: typeof options?.flag == "string" ? options.flag : flag,
    mode: normalizeMode("mode" in options ? options?.mode : null, mode)
  };
}
function globToRegex(pattern2) {
  const GLOBSTAR = "\0GS\0";
  const STAR = "\0S\0";
  pattern2 = pattern2.replace(/\*\*/g, GLOBSTAR).replace(/\*/g, STAR).replace(/[.+^$(){}|[\]\\]/g, "\\$&").replace(/\?/g, ".").replaceAll("/" + GLOBSTAR + "/", "(?:/.*)?/").replaceAll(GLOBSTAR, ".*").replaceAll(STAR, "[^/]*");
  return new RegExp(`^${pattern2}$`);
}
function _tempDirName(prefix) {
  return `${normalizePath(prefix, true)}${Date.now()}-${Math.random().toString(36).slice(2)}`;
}
function _temporal() {
  if ("Temporal" in globalThis && typeof globalThis.Temporal !== "undefined")
    return globalThis.Temporal;
  throw withErrno("ENOTSUP", "Temporal is not supported by this runtime");
}

// node_modules/@zenfs/core/dist/path.js
function normalizeString(path, allowAboveRoot) {
  let res = "";
  let lastSegmentLength = 0;
  let lastSlash = -1;
  let dots = 0;
  let char = "\0";
  for (let i = 0; i <= path.length; ++i) {
    if (i < path.length) {
      char = path[i];
    } else if (char == "/") {
      break;
    } else {
      char = "/";
    }
    if (char == "/") {
      if (lastSlash === i - 1 || dots === 1) {
      } else if (dots === 2) {
        if (res.length < 2 || lastSegmentLength !== 2 || res.at(-1) !== "." || res.at(-2) !== ".") {
          if (res.length > 2) {
            const lastSlashIndex = res.lastIndexOf("/");
            if (lastSlashIndex === -1) {
              res = "";
              lastSegmentLength = 0;
            } else {
              res = res.slice(0, lastSlashIndex);
              lastSegmentLength = res.length - 1 - res.lastIndexOf("/");
            }
            lastSlash = i;
            dots = 0;
            continue;
          } else if (res.length !== 0) {
            res = "";
            lastSegmentLength = 0;
            lastSlash = i;
            dots = 0;
            continue;
          }
        }
        if (allowAboveRoot) {
          res += res.length > 0 ? "/.." : "..";
          lastSegmentLength = 2;
        }
      } else {
        if (res.length > 0)
          res += "/" + path.slice(lastSlash + 1, i);
        else
          res = path.slice(lastSlash + 1, i);
        lastSegmentLength = i - lastSlash - 1;
      }
      lastSlash = i;
      dots = 0;
    } else if (char === "." && dots !== -1) {
      ++dots;
    } else {
      dots = -1;
    }
  }
  return res;
}
function resolve(...parts) {
  let resolved = "";
  for (const part of [...parts.reverse(), contextOf(this).pwd]) {
    if (!part?.length)
      continue;
    resolved = `${part}/${resolved}`;
    if (part.startsWith("/")) {
      break;
    }
  }
  const absolute = resolved.startsWith("/");
  resolved = normalizeString(resolved, !absolute);
  if (absolute) {
    return `/${resolved}`;
  }
  return resolved.length ? resolved : "/";
}
function normalize2(path) {
  if (!path.length)
    return ".";
  const isAbsolute = path[0] === "/";
  const trailingSeparator = path.at(-1) === "/";
  path = normalizeString(path, !isAbsolute);
  if (!path.length) {
    if (isAbsolute)
      return "/";
    return trailingSeparator ? "./" : ".";
  }
  if (trailingSeparator)
    path += "/";
  return isAbsolute ? `/${path}` : path;
}
function join(...parts) {
  if (!parts.length)
    return ".";
  const joined = parts.filter((p) => p).join("/");
  if (!joined?.length)
    return ".";
  return normalize2(joined);
}
function relative(from2, to) {
  if (from2 === to)
    return "";
  from2 = resolve.call(this, from2);
  to = resolve.call(this, to);
  if (from2 === to)
    return "";
  const fromStart = 1;
  const fromEnd = from2.length;
  const fromLen = fromEnd - fromStart;
  const toStart = 1;
  const toLen = to.length - toStart;
  const length = fromLen < toLen ? fromLen : toLen;
  let lastCommonSep = -1;
  let i = 0;
  for (; i < length; i++) {
    const fromCode = from2[fromStart + i];
    if (fromCode !== to[toStart + i])
      break;
    else if (fromCode === "/")
      lastCommonSep = i;
  }
  if (i === length) {
    if (toLen > length) {
      if (to[toStart + i] === "/") {
        return to.slice(toStart + i + 1);
      }
      if (i === 0) {
        return to.slice(toStart + i);
      }
    } else if (fromLen > length) {
      if (from2[fromStart + i] === "/") {
        lastCommonSep = i;
      } else if (i === 0) {
        lastCommonSep = 0;
      }
    }
  }
  let out = "";
  for (i = fromStart + lastCommonSep + 1; i <= fromEnd; ++i) {
    if (i === fromEnd || from2[i] === "/") {
      out += out.length === 0 ? ".." : "/..";
    }
  }
  return `${out}${to.slice(toStart + lastCommonSep)}`;
}
function dirname(path) {
  if (path.length === 0)
    return ".";
  const hasRoot = path[0] === "/";
  let end = -1;
  let matchedSlash = true;
  for (let i = path.length - 1; i >= 1; --i) {
    if (path[i] === "/") {
      if (!matchedSlash) {
        end = i;
        break;
      }
    } else {
      matchedSlash = false;
    }
  }
  if (end === -1)
    return hasRoot ? "/" : ".";
  if (hasRoot && end === 1)
    return "//";
  return path.slice(0, end);
}
function basename(path, suffix) {
  let start = 0;
  let end = -1;
  let matchedSlash = true;
  if (suffix !== void 0 && suffix.length > 0 && suffix.length <= path.length) {
    if (suffix === path)
      return "";
    let extIdx = suffix.length - 1;
    let firstNonSlashEnd = -1;
    for (let i = path.length - 1; i >= 0; --i) {
      if (path[i] === "/") {
        if (!matchedSlash) {
          start = i + 1;
          break;
        }
      } else {
        if (firstNonSlashEnd === -1) {
          matchedSlash = false;
          firstNonSlashEnd = i + 1;
        }
        if (extIdx >= 0) {
          if (path[i] === suffix[extIdx]) {
            if (--extIdx === -1) {
              end = i;
            }
          } else {
            extIdx = -1;
            end = firstNonSlashEnd;
          }
        }
      }
    }
    if (start === end)
      end = firstNonSlashEnd;
    else if (end === -1)
      end = path.length;
    return path.slice(start, end);
  }
  for (let i = path.length - 1; i >= 0; --i) {
    if (path[i] === "/") {
      if (!matchedSlash) {
        start = i + 1;
        break;
      }
    } else if (end === -1) {
      matchedSlash = false;
      end = i + 1;
    }
  }
  if (end === -1)
    return "";
  return path.slice(start, end);
}
function parse(path) {
  const isAbsolute = path[0] === "/";
  const ret = { root: isAbsolute ? "/" : "", dir: "", base: "", ext: "", name: "" };
  if (path.length === 0)
    return ret;
  const start = isAbsolute ? 1 : 0;
  let startDot = -1;
  let startPart = 0;
  let end = -1;
  let matchedSlash = true;
  let i = path.length - 1;
  let preDotState = 0;
  for (; i >= start; --i) {
    if (path[i] === "/") {
      if (!matchedSlash) {
        startPart = i + 1;
        break;
      }
      continue;
    }
    if (end === -1) {
      matchedSlash = false;
      end = i + 1;
    }
    if (path[i] === ".") {
      if (startDot === -1)
        startDot = i;
      else if (preDotState !== 1)
        preDotState = 1;
    } else if (startDot !== -1) {
      preDotState = -1;
    }
  }
  if (end !== -1) {
    const start2 = startPart === 0 && isAbsolute ? 1 : startPart;
    if (startDot === -1 || preDotState === 0 || preDotState === 1 && startDot === end - 1 && startDot === startPart + 1) {
      ret.base = ret.name = path.slice(start2, end);
    } else {
      ret.name = path.slice(start2, startDot);
      ret.base = path.slice(start2, end);
      ret.ext = path.slice(startDot, end);
    }
  }
  if (startPart > 0)
    ret.dir = path.slice(0, startPart - 1);
  else if (isAbsolute)
    ret.dir = "/";
  return ret;
}
function matchesGlob(pattern2, str) {
  return globToRegex(pattern2).test(str);
}

// node_modules/@zenfs/core/dist/node/stats.js
var _nsMultiplier = BigInt(1e6);
var StatsCommon = class {
  _convert(arg) {
    return this._isBigint ? BigInt(arg) : Number(arg);
  }
  get blocks() {
    return this._convert(Math.ceil(Number(this.size) / 512));
  }
  set blocks(value) {
  }
  /**
   * Unix-style file mode (e.g. 0o644) that includes the type of the item.
   */
  mode;
  /**
   * ID of device containing file
   */
  dev = this._convert(0);
  /**
   * Inode number
   */
  ino = this._convert(0);
  /**
   * Device ID (if special file)
   */
  rdev = this._convert(0);
  /**
   * Number of hard links
   */
  nlink = this._convert(1);
  /**
   * Block size for file system I/O
   */
  blksize = this._convert(4096);
  /**
   * User ID of owner
   */
  uid = this._convert(0);
  /**
   * Group ID of owner
   */
  gid = this._convert(0);
  /**
   * Time of last access, since epoch
   */
  atimeMs;
  get atime() {
    return new Date(Number(this.atimeMs));
  }
  set atime(value) {
    this.atimeMs = this._convert(value.getTime());
  }
  get atimeInstant() {
    return _temporal().Instant.fromEpochMilliseconds(Number(this.atimeMs));
  }
  set atimeInstant(value) {
    this.atimeMs = this._convert(value.epochMilliseconds);
  }
  /**
   * Time of last modification, since epoch
   */
  mtimeMs;
  get mtime() {
    return new Date(Number(this.mtimeMs));
  }
  set mtime(value) {
    this.mtimeMs = this._convert(value.getTime());
  }
  get mtimeInstant() {
    return _temporal().Instant.fromEpochMilliseconds(Number(this.mtimeMs));
  }
  set mtimeInstant(value) {
    this.mtimeMs = this._convert(value.epochMilliseconds);
  }
  /**
   * Time of last time file status was changed, since epoch
   */
  ctimeMs;
  get ctime() {
    return new Date(Number(this.ctimeMs));
  }
  set ctime(value) {
    this.ctimeMs = this._convert(value.getTime());
  }
  get ctimeInstant() {
    return _temporal().Instant.fromEpochMilliseconds(Number(this.ctimeMs));
  }
  set ctimeInstant(value) {
    this.ctimeMs = this._convert(value.epochMilliseconds);
  }
  /**
   * Time of file creation, since epoch
   */
  birthtimeMs;
  get birthtime() {
    return new Date(Number(this.birthtimeMs));
  }
  set birthtime(value) {
    this.birthtimeMs = this._convert(value.getTime());
  }
  get birthtimeInstant() {
    return _temporal().Instant.fromEpochMilliseconds(Number(this.birthtimeMs));
  }
  set birthtimeInstant(value) {
    this.birthtimeMs = this._convert(value.epochMilliseconds);
  }
  /**
   * Size of the item in bytes.
   * For directories/symlinks, this is normally the size of the struct that represents the item.
   */
  size;
  /**
   * @internal Used by inodes
   */
  data;
  /**
   * @internal Used by inodes
   */
  flags;
  /**
   * @internal Used by inodes
   */
  version;
  /**
   * Creates a new stats instance from a stats-like object. Can be used to copy stats (note)
   */
  constructor({ atimeMs, mtimeMs, ctimeMs, birthtimeMs, uid, gid, size, mode, ino, ...rest } = {}) {
    const now = Date.now();
    this.atimeMs = this._convert(atimeMs ?? now);
    this.mtimeMs = this._convert(mtimeMs ?? now);
    this.ctimeMs = this._convert(ctimeMs ?? now);
    this.birthtimeMs = this._convert(birthtimeMs ?? now);
    this.uid = this._convert(uid ?? 0);
    this.gid = this._convert(gid ?? 0);
    this.size = this._convert(size ?? 0);
    this.ino = this._convert(ino ?? 0);
    this.mode = this._convert(mode ?? 420 & S_IFREG);
    if ((this.mode & S_IFMT) == 0) {
      this.mode = this.mode | this._convert(S_IFREG);
    }
    Object.assign(this, rest);
  }
  isFile() {
    return (this.mode & S_IFMT) === S_IFREG;
  }
  isDirectory() {
    return (this.mode & S_IFMT) === S_IFDIR;
  }
  isSymbolicLink() {
    return (this.mode & S_IFMT) === S_IFLNK;
  }
  isSocket() {
    return (this.mode & S_IFMT) === S_IFSOCK;
  }
  isBlockDevice() {
    return (this.mode & S_IFMT) === S_IFBLK;
  }
  isCharacterDevice() {
    return (this.mode & S_IFMT) === S_IFCHR;
  }
  isFIFO() {
    return (this.mode & S_IFMT) === S_IFIFO;
  }
  toJSON() {
    return pick(this, _inode_fields);
  }
  /**
   * Checks if a given user/group has access to this item
   * @param mode The requested access, combination of W_OK, R_OK, and X_OK
   * @returns True if the request has access, false if the request does not
   * @internal
   */
  hasAccess(mode, context) {
    return hasAccess(context, this._isBigint ? new Stats(this) : this, mode);
  }
  get atimeNs() {
    return BigInt(this.atimeMs) * _nsMultiplier;
  }
  get mtimeNs() {
    return BigInt(this.mtimeMs) * _nsMultiplier;
  }
  get ctimeNs() {
    return BigInt(this.ctimeMs) * _nsMultiplier;
  }
  get birthtimeNs() {
    return BigInt(this.birthtimeMs) * _nsMultiplier;
  }
};
var Stats = class extends StatsCommon {
  _isBigint = false;
};
var BigIntStats = class extends StatsCommon {
  _isBigint = true;
};
function isStatsEqual(left, right) {
  return left.size == right.size && +left.atime == +right.atime && +left.mtime == +right.mtime && +left.ctime == +right.ctime && left.mode == right.mode;
}
var StatsFs = class {
  /** Type of file system. */
  type = 525687744115;
  /**  Optimal transfer block size. */
  bsize = 4096;
  /**  Total data blocks in file system. */
  blocks = 0;
  /** Free blocks in file system. */
  bfree = 0;
  /** Available blocks for unprivileged users */
  bavail = 0;
  /** Total file nodes in file system. */
  files = size_max;
  /** Fundamental file system block size. */
  frsize = 4096;
  /** Free file nodes in file system. */
  ffree = size_max;
};
var BigIntStatsFs = class {
  /** Type of file system. */
  type = BigInt("0x7a656e6673");
  /**  Optimal transfer block size. */
  bsize = BigInt(4096);
  /**  Total data blocks in file system. */
  blocks = BigInt(0);
  /** Free blocks in file system. */
  bfree = BigInt(0);
  /** Available blocks for unprivileged users */
  bavail = BigInt(0);
  /** Total file nodes in file system. */
  files = BigInt(size_max);
  /** Fundamental file system block size. */
  frsize = BigInt(4096);
  /** Free file nodes in file system. */
  ffree = BigInt(size_max);
};

// node_modules/@zenfs/core/dist/internal/inode.js
var __esDecorate2 = function(ctor, descriptorIn, decorators, contextIn, initializers, extraInitializers) {
  function accept(f) {
    if (f !== void 0 && typeof f !== "function") throw new TypeError("Function expected");
    return f;
  }
  var kind = contextIn.kind, key = kind === "getter" ? "get" : kind === "setter" ? "set" : "value";
  var target = !descriptorIn && ctor ? contextIn["static"] ? ctor : ctor.prototype : null;
  var descriptor = descriptorIn || (target ? Object.getOwnPropertyDescriptor(target, contextIn.name) : {});
  var _, done = false;
  for (var i = decorators.length - 1; i >= 0; i--) {
    var context = {};
    for (var p in contextIn) context[p] = p === "access" ? {} : contextIn[p];
    for (var p in contextIn.access) context.access[p] = contextIn.access[p];
    context.addInitializer = function(f) {
      if (done) throw new TypeError("Cannot add initializers after decoration has completed");
      extraInitializers.push(accept(f || null));
    };
    var result = (0, decorators[i])(kind === "accessor" ? { get: descriptor.get, set: descriptor.set } : descriptor[key], context);
    if (kind === "accessor") {
      if (result === void 0) continue;
      if (result === null || typeof result !== "object") throw new TypeError("Object expected");
      if (_ = accept(result.get)) descriptor.get = _;
      if (_ = accept(result.set)) descriptor.set = _;
      if (_ = accept(result.init)) initializers.unshift(_);
    } else if (_ = accept(result)) {
      if (kind === "field") initializers.unshift(_);
      else descriptor[key] = _;
    }
  }
  if (target) Object.defineProperty(target, contextIn.name, descriptor);
  done = true;
};
var __runInitializers2 = function(thisArg, initializers, value) {
  var useValue = arguments.length > 2;
  for (var i = 0; i < initializers.length; i++) {
    value = useValue ? initializers[i].call(thisArg, value) : initializers[i].call(thisArg);
  }
  return useValue ? value : void 0;
};
var rootIno = 0;
var maxDynamicData = 3968;
var Attribute = (() => {
  var _a, _b;
  let _classDecorators = [struct.packed()];
  let _classDescriptor;
  let _classExtraInitializers = [];
  let _classThis;
  let _classSuper = $from.typed(Uint8Array);
  let _keySize_decorators;
  let _keySize_initializers = [];
  let _keySize_extraInitializers = [];
  let _valueSize_decorators;
  let _valueSize_initializers = [];
  let _valueSize_extraInitializers = [];
  var Attribute2 = class extends _classSuper {
    static {
      _classThis = this;
    }
    static {
      const _metadata = typeof Symbol === "function" && Symbol.metadata ? Object.create(_classSuper[Symbol.metadata] ?? null) : void 0;
      _keySize_decorators = [(_a = types2).uint32.bind(_a)];
      _valueSize_decorators = [(_b = types2).uint32.bind(_b)];
      __esDecorate2(this, null, _keySize_decorators, { kind: "accessor", name: "keySize", static: false, private: false, access: { has: (obj) => "keySize" in obj, get: (obj) => obj.keySize, set: (obj, value) => {
        obj.keySize = value;
      } }, metadata: _metadata }, _keySize_initializers, _keySize_extraInitializers);
      __esDecorate2(this, null, _valueSize_decorators, { kind: "accessor", name: "valueSize", static: false, private: false, access: { has: (obj) => "valueSize" in obj, get: (obj) => obj.valueSize, set: (obj, value) => {
        obj.valueSize = value;
      } }, metadata: _metadata }, _valueSize_initializers, _valueSize_extraInitializers);
      __esDecorate2(null, _classDescriptor = { value: _classThis }, _classDecorators, { kind: "class", name: _classThis.name, metadata: _metadata }, null, _classExtraInitializers);
      Attribute2 = _classThis = _classDescriptor.value;
      if (_metadata) Object.defineProperty(_classThis, Symbol.metadata, { enumerable: true, configurable: true, writable: true, value: _metadata });
    }
    static name = "Attribute";
    #keySize_accessor_storage = __runInitializers2(this, _keySize_initializers, void 0);
    get keySize() {
      return this.#keySize_accessor_storage;
    }
    set keySize(value) {
      this.#keySize_accessor_storage = value;
    }
    #valueSize_accessor_storage = (__runInitializers2(this, _keySize_extraInitializers), __runInitializers2(this, _valueSize_initializers, void 0));
    get valueSize() {
      return this.#valueSize_accessor_storage;
    }
    set valueSize(value) {
      this.#valueSize_accessor_storage = value;
    }
    get name() {
      return decodeUTF8(this.subarray(8, 8 + this.keySize));
    }
    /**
     * Note that this does not handle moving the data.
     * Changing the name after setting the value is undefined behavior and will lead to corruption.
     * This should only be used when creating a new attribute.
     */
    set name(value) {
      const buf = encodeUTF8(value);
      if (8 + buf.length + this.valueSize > maxDynamicData)
        throw withErrno("EOVERFLOW");
      this.set(buf, 8);
      this.keySize = buf.length;
    }
    get value() {
      return this.subarray(8 + this.keySize, this.size);
    }
    set value(value) {
      if (8 + this.keySize + value.length > maxDynamicData)
        throw withErrno("EOVERFLOW");
      this.valueSize = value.length;
      this.set(value, 8 + this.keySize);
    }
    get size() {
      return 8 + this.keySize + this.valueSize;
    }
    constructor() {
      super(...arguments);
      __runInitializers2(this, _valueSize_extraInitializers);
    }
    static {
      __runInitializers2(_classThis, _classExtraInitializers);
    }
  };
  return Attribute2 = _classThis;
})();
var Attributes = (() => {
  var _a;
  let _classDecorators = [struct.packed()];
  let _classDescriptor;
  let _classExtraInitializers = [];
  let _classThis;
  let _classSuper = $from(BufferView);
  let _size_decorators;
  let _size_initializers = [];
  let _size_extraInitializers = [];
  var Attributes2 = class extends _classSuper {
    static {
      _classThis = this;
    }
    static {
      const _metadata = typeof Symbol === "function" && Symbol.metadata ? Object.create(_classSuper[Symbol.metadata] ?? null) : void 0;
      _size_decorators = [(_a = types2).uint32.bind(_a)];
      __esDecorate2(this, null, _size_decorators, { kind: "accessor", name: "size", static: false, private: false, access: { has: (obj) => "size" in obj, get: (obj) => obj.size, set: (obj, value) => {
        obj.size = value;
      } }, metadata: _metadata }, _size_initializers, _size_extraInitializers);
      __esDecorate2(null, _classDescriptor = { value: _classThis }, _classDecorators, { kind: "class", name: _classThis.name, metadata: _metadata }, null, _classExtraInitializers);
      Attributes2 = _classThis = _classDescriptor.value;
      if (_metadata) Object.defineProperty(_classThis, Symbol.metadata, { enumerable: true, configurable: true, writable: true, value: _metadata });
    }
    static name = "Attributes";
    #size_accessor_storage = __runInitializers2(this, _size_initializers, void 0);
    get size() {
      return this.#size_accessor_storage;
    }
    set size(value) {
      this.#size_accessor_storage = value;
    }
    get byteSize() {
      let offset = this.byteOffset + sizeof(this);
      for (let i = 0; i < this.size; i++) {
        const entry = new Attribute(this.buffer, offset);
        offset += entry.size;
      }
      return offset;
    }
    has(name) {
      let offset = this.byteOffset + sizeof(this);
      for (let i = 0; i < this.size; i++) {
        const entry = new Attribute(this.buffer, offset);
        if (entry.name == name)
          return true;
        offset += entry.size;
      }
      return false;
    }
    get(name) {
      let offset = this.byteOffset + sizeof(this);
      for (let i = 0; i < this.size; i++) {
        const entry = new Attribute(this.buffer, offset);
        if (entry.name == name)
          return entry.value;
        offset += entry.size;
      }
    }
    set(name, value) {
      let offset = this.byteOffset + sizeof(this);
      let remove3;
      for (let i = 0; i < this.size; i++) {
        const entry = new Attribute(this.buffer, offset);
        if (entry.name == name)
          remove3 = [offset, entry.size];
        offset += entry.size;
      }
      const buf = new Uint8Array(this.buffer);
      if (remove3) {
        const [start, size] = remove3;
        offset -= size;
        buf.copyWithin(start, start + size, offset + size);
        buf.fill(0, offset, offset + size);
        this.size--;
      }
      const attr = new Attribute(this.buffer, offset);
      attr.name = name;
      attr.value = value;
      this.size++;
    }
    remove(name) {
      let offset = this.byteOffset + sizeof(this);
      let remove3;
      for (let i = 0; i < this.size; i++) {
        const entry = new Attribute(this.buffer, offset);
        if (entry.name == name)
          remove3 = [offset, entry.size];
        offset += entry.size;
      }
      if (!remove3)
        return false;
      const [start, size] = remove3;
      const buf = new Uint8Array(this.buffer);
      buf.copyWithin(start, start + size, offset);
      buf.fill(0, offset - size, offset);
      this.size--;
      return true;
    }
    copyFrom(other) {
      const { byteSize } = other;
      new Uint8Array(this.buffer, this.byteOffset, byteSize).set(new Uint8Array(other.buffer, other.byteOffset, byteSize));
    }
    *keys() {
      let offset = this.byteOffset + sizeof(this);
      for (let i = 0; i < this.size; i++) {
        const entry = new Attribute(this.buffer, offset);
        yield entry.name;
        offset += entry.size;
      }
    }
    *values() {
      let offset = this.byteOffset + sizeof(this);
      for (let i = 0; i < this.size; i++) {
        const entry = new Attribute(this.buffer, offset);
        yield entry.value;
        offset += entry.size;
      }
    }
    *entries() {
      let offset = this.byteOffset + sizeof(this);
      for (let i = 0; i < this.size; i++) {
        const entry = new Attribute(this.buffer, offset);
        yield [entry.name, entry.value];
        offset += entry.size;
      }
    }
    constructor() {
      super(...arguments);
      __runInitializers2(this, _size_extraInitializers);
    }
    static {
      __runInitializers2(_classThis, _classExtraInitializers);
    }
  };
  return Attributes2 = _classThis;
})();
var _inode_fields = [
  "ino",
  "data",
  "size",
  "mode",
  "flags",
  "nlink",
  "uid",
  "gid",
  "atimeMs",
  "birthtimeMs",
  "mtimeMs",
  "ctimeMs",
  "version"
];
var _inode_version = 5;
var InodeFlags;
(function(InodeFlags2) {
  InodeFlags2[InodeFlags2["Sync"] = 1] = "Sync";
  InodeFlags2[InodeFlags2["NoAtime"] = 2] = "NoAtime";
  InodeFlags2[InodeFlags2["Append"] = 4] = "Append";
  InodeFlags2[InodeFlags2["Immutable"] = 8] = "Immutable";
  InodeFlags2[InodeFlags2["Dead"] = 16] = "Dead";
  InodeFlags2[InodeFlags2["NoQuota"] = 32] = "NoQuota";
  InodeFlags2[InodeFlags2["Dirsync"] = 64] = "Dirsync";
  InodeFlags2[InodeFlags2["NoCMtime"] = 128] = "NoCMtime";
  InodeFlags2[InodeFlags2["SwapFile"] = 256] = "SwapFile";
  InodeFlags2[InodeFlags2["Private"] = 512] = "Private";
  InodeFlags2[InodeFlags2["IMA"] = 1024] = "IMA";
  InodeFlags2[InodeFlags2["AutoMount"] = 2048] = "AutoMount";
  InodeFlags2[InodeFlags2["NoSec"] = 4096] = "NoSec";
  InodeFlags2[InodeFlags2["DAX"] = 8192] = "DAX";
  InodeFlags2[InodeFlags2["Encrypted"] = 16384] = "Encrypted";
  InodeFlags2[InodeFlags2["CaseFold"] = 32768] = "CaseFold";
  InodeFlags2[InodeFlags2["Verity"] = 65536] = "Verity";
  InodeFlags2[InodeFlags2["KernelFile"] = 131072] = "KernelFile";
})(InodeFlags || (InodeFlags = {}));
var Inode = (() => {
  var _a, _b, _c, _d, _e, _f, _g, _h, _j, _k, _l, _m, _o, _p, _q, _r;
  let _classDecorators = [struct.packed()];
  let _classDescriptor;
  let _classExtraInitializers = [];
  let _classThis;
  let _classSuper = $from(BufferView);
  let _data_decorators;
  let _data_initializers = [];
  let _data_extraInitializers = [];
  let ___data_old_decorators;
  let ___data_old_initializers = [];
  let ___data_old_extraInitializers = [];
  let _size_decorators;
  let _size_initializers = [];
  let _size_extraInitializers = [];
  let _mode_decorators;
  let _mode_initializers = [];
  let _mode_extraInitializers = [];
  let _nlink_decorators;
  let _nlink_initializers = [];
  let _nlink_extraInitializers = [];
  let _uid_decorators;
  let _uid_initializers = [];
  let _uid_extraInitializers = [];
  let _gid_decorators;
  let _gid_initializers = [];
  let _gid_extraInitializers = [];
  let _atimeMs_decorators;
  let _atimeMs_initializers = [];
  let _atimeMs_extraInitializers = [];
  let _birthtimeMs_decorators;
  let _birthtimeMs_initializers = [];
  let _birthtimeMs_extraInitializers = [];
  let _mtimeMs_decorators;
  let _mtimeMs_initializers = [];
  let _mtimeMs_extraInitializers = [];
  let _ctimeMs_decorators;
  let _ctimeMs_initializers = [];
  let _ctimeMs_extraInitializers = [];
  let _ino_decorators;
  let _ino_initializers = [];
  let _ino_extraInitializers = [];
  let ___ino_old_decorators;
  let ___ino_old_initializers = [];
  let ___ino_old_extraInitializers = [];
  let _flags_decorators;
  let _flags_initializers = [];
  let _flags_extraInitializers = [];
  let ___after_flags_decorators;
  let ___after_flags_initializers = [];
  let ___after_flags_extraInitializers = [];
  let _version_decorators;
  let _version_initializers = [];
  let _version_extraInitializers = [];
  let ___padding_decorators;
  let ___padding_initializers = [];
  let ___padding_extraInitializers = [];
  let _attributes_decorators;
  let _attributes_initializers = [];
  let _attributes_extraInitializers = [];
  let ___data_decorators;
  let ___data_initializers = [];
  let ___data_extraInitializers = [];
  var Inode2 = class extends _classSuper {
    static {
      _classThis = this;
    }
    static {
      const _metadata = typeof Symbol === "function" && Symbol.metadata ? Object.create(_classSuper[Symbol.metadata] ?? null) : void 0;
      _data_decorators = [(_a = types2).uint32.bind(_a)];
      ___data_old_decorators = [(_b = types2).uint32.bind(_b)];
      _size_decorators = [(_c = types2).uint32.bind(_c)];
      _mode_decorators = [(_d = types2).uint16.bind(_d)];
      _nlink_decorators = [(_e = types2).uint32.bind(_e)];
      _uid_decorators = [(_f = types2).uint32.bind(_f)];
      _gid_decorators = [(_g = types2).uint32.bind(_g)];
      _atimeMs_decorators = [(_h = types2).float64.bind(_h)];
      _birthtimeMs_decorators = [(_j = types2).float64.bind(_j)];
      _mtimeMs_decorators = [(_k = types2).float64.bind(_k)];
      _ctimeMs_decorators = [(_l = types2).float64.bind(_l)];
      _ino_decorators = [(_m = types2).uint32.bind(_m)];
      ___ino_old_decorators = [(_o = types2).uint32.bind(_o)];
      _flags_decorators = [(_p = types2).uint32.bind(_p)];
      ___after_flags_decorators = [(_q = types2).uint16.bind(_q)];
      _version_decorators = [(_r = types2).uint32.bind(_r)];
      ___padding_decorators = [types2.uint8(48)];
      _attributes_decorators = [field(Attributes)];
      ___data_decorators = [types2.uint8(maxDynamicData)];
      __esDecorate2(this, null, _data_decorators, { kind: "accessor", name: "data", static: false, private: false, access: { has: (obj) => "data" in obj, get: (obj) => obj.data, set: (obj, value) => {
        obj.data = value;
      } }, metadata: _metadata }, _data_initializers, _data_extraInitializers);
      __esDecorate2(this, null, ___data_old_decorators, { kind: "accessor", name: "__data_old", static: false, private: false, access: { has: (obj) => "__data_old" in obj, get: (obj) => obj.__data_old, set: (obj, value) => {
        obj.__data_old = value;
      } }, metadata: _metadata }, ___data_old_initializers, ___data_old_extraInitializers);
      __esDecorate2(this, null, _size_decorators, { kind: "accessor", name: "size", static: false, private: false, access: { has: (obj) => "size" in obj, get: (obj) => obj.size, set: (obj, value) => {
        obj.size = value;
      } }, metadata: _metadata }, _size_initializers, _size_extraInitializers);
      __esDecorate2(this, null, _mode_decorators, { kind: "accessor", name: "mode", static: false, private: false, access: { has: (obj) => "mode" in obj, get: (obj) => obj.mode, set: (obj, value) => {
        obj.mode = value;
      } }, metadata: _metadata }, _mode_initializers, _mode_extraInitializers);
      __esDecorate2(this, null, _nlink_decorators, { kind: "accessor", name: "nlink", static: false, private: false, access: { has: (obj) => "nlink" in obj, get: (obj) => obj.nlink, set: (obj, value) => {
        obj.nlink = value;
      } }, metadata: _metadata }, _nlink_initializers, _nlink_extraInitializers);
      __esDecorate2(this, null, _uid_decorators, { kind: "accessor", name: "uid", static: false, private: false, access: { has: (obj) => "uid" in obj, get: (obj) => obj.uid, set: (obj, value) => {
        obj.uid = value;
      } }, metadata: _metadata }, _uid_initializers, _uid_extraInitializers);
      __esDecorate2(this, null, _gid_decorators, { kind: "accessor", name: "gid", static: false, private: false, access: { has: (obj) => "gid" in obj, get: (obj) => obj.gid, set: (obj, value) => {
        obj.gid = value;
      } }, metadata: _metadata }, _gid_initializers, _gid_extraInitializers);
      __esDecorate2(this, null, _atimeMs_decorators, { kind: "accessor", name: "atimeMs", static: false, private: false, access: { has: (obj) => "atimeMs" in obj, get: (obj) => obj.atimeMs, set: (obj, value) => {
        obj.atimeMs = value;
      } }, metadata: _metadata }, _atimeMs_initializers, _atimeMs_extraInitializers);
      __esDecorate2(this, null, _birthtimeMs_decorators, { kind: "accessor", name: "birthtimeMs", static: false, private: false, access: { has: (obj) => "birthtimeMs" in obj, get: (obj) => obj.birthtimeMs, set: (obj, value) => {
        obj.birthtimeMs = value;
      } }, metadata: _metadata }, _birthtimeMs_initializers, _birthtimeMs_extraInitializers);
      __esDecorate2(this, null, _mtimeMs_decorators, { kind: "accessor", name: "mtimeMs", static: false, private: false, access: { has: (obj) => "mtimeMs" in obj, get: (obj) => obj.mtimeMs, set: (obj, value) => {
        obj.mtimeMs = value;
      } }, metadata: _metadata }, _mtimeMs_initializers, _mtimeMs_extraInitializers);
      __esDecorate2(this, null, _ctimeMs_decorators, { kind: "accessor", name: "ctimeMs", static: false, private: false, access: { has: (obj) => "ctimeMs" in obj, get: (obj) => obj.ctimeMs, set: (obj, value) => {
        obj.ctimeMs = value;
      } }, metadata: _metadata }, _ctimeMs_initializers, _ctimeMs_extraInitializers);
      __esDecorate2(this, null, _ino_decorators, { kind: "accessor", name: "ino", static: false, private: false, access: { has: (obj) => "ino" in obj, get: (obj) => obj.ino, set: (obj, value) => {
        obj.ino = value;
      } }, metadata: _metadata }, _ino_initializers, _ino_extraInitializers);
      __esDecorate2(this, null, ___ino_old_decorators, { kind: "accessor", name: "__ino_old", static: false, private: false, access: { has: (obj) => "__ino_old" in obj, get: (obj) => obj.__ino_old, set: (obj, value) => {
        obj.__ino_old = value;
      } }, metadata: _metadata }, ___ino_old_initializers, ___ino_old_extraInitializers);
      __esDecorate2(this, null, _flags_decorators, { kind: "accessor", name: "flags", static: false, private: false, access: { has: (obj) => "flags" in obj, get: (obj) => obj.flags, set: (obj, value) => {
        obj.flags = value;
      } }, metadata: _metadata }, _flags_initializers, _flags_extraInitializers);
      __esDecorate2(this, null, ___after_flags_decorators, { kind: "accessor", name: "__after_flags", static: false, private: false, access: { has: (obj) => "__after_flags" in obj, get: (obj) => obj.__after_flags, set: (obj, value) => {
        obj.__after_flags = value;
      } }, metadata: _metadata }, ___after_flags_initializers, ___after_flags_extraInitializers);
      __esDecorate2(this, null, _version_decorators, { kind: "accessor", name: "version", static: false, private: false, access: { has: (obj) => "version" in obj, get: (obj) => obj.version, set: (obj, value) => {
        obj.version = value;
      } }, metadata: _metadata }, _version_initializers, _version_extraInitializers);
      __esDecorate2(this, null, ___padding_decorators, { kind: "accessor", name: "__padding", static: false, private: false, access: { has: (obj) => "__padding" in obj, get: (obj) => obj.__padding, set: (obj, value) => {
        obj.__padding = value;
      } }, metadata: _metadata }, ___padding_initializers, ___padding_extraInitializers);
      __esDecorate2(this, null, _attributes_decorators, { kind: "accessor", name: "attributes", static: false, private: false, access: { has: (obj) => "attributes" in obj, get: (obj) => obj.attributes, set: (obj, value) => {
        obj.attributes = value;
      } }, metadata: _metadata }, _attributes_initializers, _attributes_extraInitializers);
      __esDecorate2(this, null, ___data_decorators, { kind: "accessor", name: "__data", static: false, private: false, access: { has: (obj) => "__data" in obj, get: (obj) => obj.__data, set: (obj, value) => {
        obj.__data = value;
      } }, metadata: _metadata }, ___data_initializers, ___data_extraInitializers);
      __esDecorate2(null, _classDescriptor = { value: _classThis }, _classDecorators, { kind: "class", name: _classThis.name, metadata: _metadata }, null, _classExtraInitializers);
      Inode2 = _classThis = _classDescriptor.value;
      if (_metadata) Object.defineProperty(_classThis, Symbol.metadata, { enumerable: true, configurable: true, writable: true, value: _metadata });
    }
    static name = "Inode";
    constructor(...args) {
      let data = {};
      if (typeof args[0] === "object" && args[0] !== null && !ArrayBuffer.isView(args[0])) {
        data = args[0];
        args = [sizeof(Inode2)];
      }
      if (args[0] instanceof Inode2) {
        args = [new Uint8Array(args[0].buffer, args[0].byteOffset, args[0].byteLength)];
      }
      super(...args);
      __runInitializers2(this, ___data_extraInitializers);
      if (this.byteLength < sizeof(Inode2)) {
        throw crit(withErrno("EIO", `Buffer is too small to create an inode (${this.byteLength} bytes)`));
      }
      Object.assign(this, data);
      this.atimeMs ||= Date.now();
      this.mtimeMs ||= Date.now();
      this.ctimeMs ||= Date.now();
      this.birthtimeMs ||= Date.now();
      if (this.ino && !this.nlink) {
        warn(`Inode ${this.ino} has an nlink of 0`);
      }
    }
    #data_accessor_storage = __runInitializers2(this, _data_initializers, void 0);
    get data() {
      return this.#data_accessor_storage;
    }
    set data(value) {
      this.#data_accessor_storage = value;
    }
    #__data_old_accessor_storage = (__runInitializers2(this, _data_extraInitializers), __runInitializers2(this, ___data_old_initializers, void 0));
    /** For future use */
    get __data_old() {
      return this.#__data_old_accessor_storage;
    }
    set __data_old(value) {
      this.#__data_old_accessor_storage = value;
    }
    #size_accessor_storage = (__runInitializers2(this, ___data_old_extraInitializers), __runInitializers2(this, _size_initializers, void 0));
    get size() {
      return this.#size_accessor_storage;
    }
    set size(value) {
      this.#size_accessor_storage = value;
    }
    #mode_accessor_storage = (__runInitializers2(this, _size_extraInitializers), __runInitializers2(this, _mode_initializers, void 0));
    get mode() {
      return this.#mode_accessor_storage;
    }
    set mode(value) {
      this.#mode_accessor_storage = value;
    }
    #nlink_accessor_storage = (__runInitializers2(this, _mode_extraInitializers), __runInitializers2(this, _nlink_initializers, void 0));
    get nlink() {
      return this.#nlink_accessor_storage;
    }
    set nlink(value) {
      this.#nlink_accessor_storage = value;
    }
    #uid_accessor_storage = (__runInitializers2(this, _nlink_extraInitializers), __runInitializers2(this, _uid_initializers, void 0));
    get uid() {
      return this.#uid_accessor_storage;
    }
    set uid(value) {
      this.#uid_accessor_storage = value;
    }
    #gid_accessor_storage = (__runInitializers2(this, _uid_extraInitializers), __runInitializers2(this, _gid_initializers, void 0));
    get gid() {
      return this.#gid_accessor_storage;
    }
    set gid(value) {
      this.#gid_accessor_storage = value;
    }
    #atimeMs_accessor_storage = (__runInitializers2(this, _gid_extraInitializers), __runInitializers2(this, _atimeMs_initializers, void 0));
    get atimeMs() {
      return this.#atimeMs_accessor_storage;
    }
    set atimeMs(value) {
      this.#atimeMs_accessor_storage = value;
    }
    #birthtimeMs_accessor_storage = (__runInitializers2(this, _atimeMs_extraInitializers), __runInitializers2(this, _birthtimeMs_initializers, void 0));
    get birthtimeMs() {
      return this.#birthtimeMs_accessor_storage;
    }
    set birthtimeMs(value) {
      this.#birthtimeMs_accessor_storage = value;
    }
    #mtimeMs_accessor_storage = (__runInitializers2(this, _birthtimeMs_extraInitializers), __runInitializers2(this, _mtimeMs_initializers, void 0));
    get mtimeMs() {
      return this.#mtimeMs_accessor_storage;
    }
    set mtimeMs(value) {
      this.#mtimeMs_accessor_storage = value;
    }
    #ctimeMs_accessor_storage = (__runInitializers2(this, _mtimeMs_extraInitializers), __runInitializers2(this, _ctimeMs_initializers, void 0));
    /**
     * The time the inode was changed.
     *
     * This is automatically updated whenever changed are made using `update()`.
     */
    get ctimeMs() {
      return this.#ctimeMs_accessor_storage;
    }
    set ctimeMs(value) {
      this.#ctimeMs_accessor_storage = value;
    }
    #ino_accessor_storage = (__runInitializers2(this, _ctimeMs_extraInitializers), __runInitializers2(this, _ino_initializers, void 0));
    get ino() {
      return this.#ino_accessor_storage;
    }
    set ino(value) {
      this.#ino_accessor_storage = value;
    }
    #__ino_old_accessor_storage = (__runInitializers2(this, _ino_extraInitializers), __runInitializers2(this, ___ino_old_initializers, void 0));
    /** For future use */
    get __ino_old() {
      return this.#__ino_old_accessor_storage;
    }
    set __ino_old(value) {
      this.#__ino_old_accessor_storage = value;
    }
    #flags_accessor_storage = (__runInitializers2(this, ___ino_old_extraInitializers), __runInitializers2(this, _flags_initializers, void 0));
    get flags() {
      return this.#flags_accessor_storage;
    }
    set flags(value) {
      this.#flags_accessor_storage = value;
    }
    #__after_flags_accessor_storage = (__runInitializers2(this, _flags_extraInitializers), __runInitializers2(this, ___after_flags_initializers, void 0));
    /** For future use */
    get __after_flags() {
      return this.#__after_flags_accessor_storage;
    }
    set __after_flags(value) {
      this.#__after_flags_accessor_storage = value;
    }
    #version_accessor_storage = (__runInitializers2(this, ___after_flags_extraInitializers), __runInitializers2(this, _version_initializers, void 0));
    /**
     * The "version" of the inode/data.
     * Unrelated to the inode format!
     */
    get version() {
      return this.#version_accessor_storage;
    }
    set version(value) {
      this.#version_accessor_storage = value;
    }
    #__padding_accessor_storage = (__runInitializers2(this, _version_extraInitializers), __runInitializers2(this, ___padding_initializers, void 0));
    /**
     * Padding up to 128 bytes.
     * This ensures there is enough room for expansion without breaking the ABI.
     * @internal
     */
    get __padding() {
      return this.#__padding_accessor_storage;
    }
    set __padding(value) {
      this.#__padding_accessor_storage = value;
    }
    #attributes_accessor_storage = (__runInitializers2(this, ___padding_extraInitializers), __runInitializers2(this, _attributes_initializers, void 0));
    get attributes() {
      return this.#attributes_accessor_storage;
    }
    set attributes(value) {
      this.#attributes_accessor_storage = value;
    }
    #__data_accessor_storage = (__runInitializers2(this, _attributes_extraInitializers), __runInitializers2(this, ___data_initializers, void 0));
    /**
     * Since the attribute data uses dynamic arrays,
     * it is necessary to add this so attributes can be added.
     * @internal @hidden
     */
    get __data() {
      return this.#__data_accessor_storage;
    }
    set __data(value) {
      this.#__data_accessor_storage = value;
    }
    toString() {
      return `<Inode ${this.ino}>`;
    }
    toJSON() {
      return {
        ...pick(this, _inode_fields),
        attributes: this.attributes
      };
    }
    /**
     * Handy function that converts the Inode to a Node Stats object.
     * @deprecated Use `new Stats(inode)` instead.
     */
    toStats() {
      return new Stats(this);
    }
    /**
     * Updates the Inode using information from the stats object. Used by file
     * systems at sync time, e.g.:
     * - Program opens file and gets a File object.
     * - Program mutates file. File object is responsible for maintaining
     *   metadata changes locally -- typically in a Stats object.
     * - Program closes file. File object's metadata changes are synced with the
     *   file system.
     * @returns whether any changes have occurred.
     */
    update(data) {
      if (!data)
        return false;
      let hasChanged = false;
      for (const key of _inode_fields) {
        if (data[key] === void 0)
          continue;
        if (key == "ino" || key == "data")
          continue;
        if (this[key] === data[key])
          continue;
        if (key == "atimeMs" && this.flags & InodeFlags.NoAtime)
          continue;
        this[key] = data[key];
        hasChanged = true;
      }
      if (data.attributes) {
        this.attributes.copyFrom(data.attributes);
        hasChanged = true;
      }
      if (hasChanged)
        this.ctimeMs = Date.now();
      return hasChanged;
    }
    static {
      __runInitializers2(_classThis, _classExtraInitializers);
    }
  };
  return Inode2 = _classThis;
})();
function isFile(metadata) {
  return (metadata.mode & S_IFMT) === S_IFREG;
}
function isDirectory(metadata) {
  return (metadata.mode & S_IFMT) === S_IFDIR;
}
function isSymbolicLink(metadata) {
  return (metadata.mode & S_IFMT) === S_IFLNK;
}
function isBlockDevice(metadata) {
  return (metadata.mode & S_IFMT) === S_IFBLK;
}
function isCharacterDevice(metadata) {
  return (metadata.mode & S_IFMT) === S_IFCHR;
}
function hasAccess($, inode, access3) {
  const { credentials } = contextOf($);
  if (isSymbolicLink(inode) || credentials.euid === 0 || credentials.egid === 0)
    return true;
  let perm = 0;
  if (credentials.uid === inode.uid) {
    if (inode.mode & S_IRUSR)
      perm |= R_OK;
    if (inode.mode & S_IWUSR)
      perm |= W_OK;
    if (inode.mode & S_IXUSR)
      perm |= X_OK;
  }
  if (credentials.gid === inode.gid || credentials.groups.includes(Number(inode.gid))) {
    if (inode.mode & S_IRGRP)
      perm |= R_OK;
    if (inode.mode & S_IWGRP)
      perm |= W_OK;
    if (inode.mode & S_IXGRP)
      perm |= X_OK;
  }
  if (inode.mode & S_IROTH)
    perm |= R_OK;
  if (inode.mode & S_IWOTH)
    perm |= W_OK;
  if (inode.mode & S_IXOTH)
    perm |= X_OK;
  return (perm & access3) === access3;
}
function _chown(stats, uid, gid) {
  let valid = true;
  if (!isNaN(uid) && uid >= 0 && uid < size_max)
    stats.uid = uid;
  else
    valid = false;
  if (!isNaN(gid) && gid >= 0 && gid < size_max)
    stats.gid = gid;
  else
    valid = false;
  return valid;
}

// node_modules/@zenfs/core/dist/internal/file_index.js
var version = 1;
var Index = class _Index extends Map {
  maxSize = size_max;
  /**
   * Converts the index to JSON
   */
  toJSON() {
    return {
      version,
      maxSize: this.maxSize,
      entries: Object.fromEntries([...this].map(([k, v]) => [k, v.toJSON()]))
    };
  }
  /**
   * Converts the index to a string
   */
  toString() {
    return JSON.stringify(this.toJSON());
  }
  /**
   * Get the size in bytes of the index (including the size reported for each entry)
   */
  get byteSize() {
    let size = this.size * sizeof(Inode);
    for (const entry of this.values())
      size += entry.size;
    return size;
  }
  usage() {
    return {
      totalSpace: this.maxSize,
      freeSpace: this.maxSize - this.byteSize
    };
  }
  pathOf(id) {
    for (const [path, inode] of this) {
      if (inode.ino == id || inode.data == id)
        return path;
    }
  }
  getByID(id) {
    return this.entryByID(id)?.inode;
  }
  entryByID(id) {
    for (const [path, inode] of this) {
      if (inode.ino == id || inode.data == id)
        return { path, inode };
    }
  }
  directoryEntries(path) {
    const node = this.get(path);
    if (!node)
      throw withErrno("ENOENT");
    if ((node.mode & S_IFMT) != S_IFDIR)
      throw withErrno("ENOTDIR");
    const entries2 = {};
    for (const entry of this.keys()) {
      if (dirname(entry) == path && entry != path) {
        entries2[basename(entry)] = this.get(entry).ino;
      }
    }
    return entries2;
  }
  /**
   * Get the next available ID in the index
   * @internal
   */
  _alloc() {
    return Math.max(...[...this.values()].flatMap((i) => [i.ino, i.data])) + 1;
  }
  /**
   * Gets a list of entries for each directory in the index.
   * Use
   */
  directories() {
    const dirs = /* @__PURE__ */ new Map();
    for (const [path, node] of this) {
      if ((node.mode & S_IFMT) != S_IFDIR)
        continue;
      const entries2 = {};
      for (const entry of this.keys()) {
        if (dirname(entry) == path && entry != path)
          entries2[basename(entry)] = this.get(entry).ino;
      }
      dirs.set(path, entries2);
    }
    return dirs;
  }
  /**
   * Loads the index from JSON data
   */
  fromJSON(json) {
    if (json.version != version)
      throw withErrno("EINVAL", "Index version mismatch");
    this.clear();
    for (const [path, node] of Object.entries(json.entries)) {
      node.data ??= randomInt(1, size_max);
      if (path == "/")
        node.ino = 0;
      this.set(path, new Inode(node));
    }
    return this;
  }
  /**
   * Parses an index from a string
   */
  static parse(data) {
    if (!isJSON(data))
      throw withErrno("EINVAL", "Invalid JSON");
    const json = JSON.parse(data);
    const index = new _Index();
    index.fromJSON(json);
    return index;
  }
};

// node_modules/@zenfs/core/dist/internal/filesystem.js
var _chunkSize = 4096;
var FileSystem = class _FileSystem {
  type;
  name;
  label;
  /**
   * The last place this file system was mounted
   * @internal @protected
   */
  _mountPoint;
  /**
   * The UUID of the file system.
   * @privateRemarks This is only used by `ioctl`
   * @internal @protected
   */
  _uuid = crypto.randomUUID();
  get uuid() {
    return this._uuid;
  }
  /**
   * @see FileSystemAttributes
   */
  attributes = /* @__PURE__ */ new Map();
  constructor(type, name) {
    this.type = type;
    this.name = name;
    if (this.streamRead === _FileSystem.prototype.streamRead)
      this.attributes.set("default_stream_read");
    if (this.streamWrite === _FileSystem.prototype.streamWrite)
      this.attributes.set("default_stream_write");
  }
  toString() {
    return `${this.name} ${this.label ? JSON.stringify(this.label) : ""} (${this._mountPoint ? "mounted on " + this._mountPoint : "unmounted"})`;
  }
  /**
   * Default implementation.
   * @todo Implement
   * @experimental
   */
  usage() {
    return {
      totalSpace: 0,
      freeSpace: 0
    };
  }
  async ready() {
  }
  readySync() {
    if (this.ready !== _FileSystem.prototype.ready)
      throw withErrno("EAGAIN");
  }
  /**
   * Test whether or not `path` exists.
   */
  async exists(path) {
    try {
      await this.stat(path);
      return true;
    } catch (e) {
      return e.code != "ENOENT";
    }
  }
  /**
   * Test whether or not `path` exists.
   */
  existsSync(path) {
    try {
      this.statSync(path);
      return true;
    } catch (e) {
      return e.code != "ENOENT";
    }
  }
  /**
   * Read a file using a stream.
   * @privateRemarks The default implementation of `streamRead` uses "chunked" `read`s
   */
  streamRead(path, options) {
    return new ReadableStream({
      start: async (controller) => {
        const { size } = await this.stat(path);
        const { start = 0, end = size } = options;
        for (let offset = start; offset < end; offset += _chunkSize) {
          const bytesRead = offset + _chunkSize > end ? end - offset : _chunkSize;
          const buffer = new Uint8Array(bytesRead);
          await this.read(path, buffer, offset, offset + bytesRead).catch(controller.error.bind(controller));
          controller.enqueue(buffer);
        }
        controller.close();
      },
      type: "bytes"
    });
  }
  /**
   * Write a file using stream.
   * @privateRemarks The default implementation of `streamWrite` uses "chunked" `write`s
   */
  streamWrite(path, options) {
    let position = options.start ?? 0;
    return new WritableStream({
      write: async (chunk, controller) => {
        let err2 = false;
        const _err = (ex) => {
          err2 = true;
          controller.error(ex);
        };
        const { size } = await this.stat(path);
        await this.write(path, chunk, position).catch(_err);
        if (err2)
          return;
        position += chunk.byteLength;
        await this.touch(path, { mtimeMs: Date.now(), size: Math.max(size, position) }).catch(_err);
      }
    });
  }
};

// node_modules/@zenfs/core/dist/polyfills.js
Promise.withResolvers ??= (warn("Using a polyfill of Promise.withResolvers"), function() {
  let _resolve, _reject;
  const promise = new Promise((resolve4, reject) => {
    _resolve = resolve4;
    _reject = reject;
  });
  return { promise, resolve: _resolve, reject: _reject };
});
Symbol["dispose"] ??= (warn("Using a polyfill of Symbol.dispose"), /* @__PURE__ */ Symbol("Symbol.dispose"));
Symbol["asyncDispose"] ??= (warn("Using a polyfill of Symbol.asyncDispose"), /* @__PURE__ */ Symbol("Symbol.asyncDispose"));
globalThis.crypto.randomUUID ??= (warn("Using a polyfill of crypto.randomUUID"), function randomUUID() {
  const bytes = crypto.getRandomValues(new Uint8Array(16));
  bytes[6] = bytes[6] & 15 | 64;
  bytes[8] = bytes[8] & 63 | 128;
  const hex2 = [...bytes].map((b) => b.toString(16).padStart(2, "0")).join("");
  return `${hex2.slice(0, 8)}-${hex2.slice(8, 12)}-${hex2.slice(12, 16)}-${hex2.slice(16, 20)}-${hex2.slice(20)}`;
});
Uint8Array.prototype.toBase64 ??= (warn("Using a polyfill of Uint8Array.prototype.toBase64"), function toBase64() {
  return btoa(String.fromCharCode(...this));
});
Uint8Array.fromBase64 ??= (warn("Using a polyfill of Uint8Array.fromBase64"), function fromBase64(base64) {
  const binaryString = atob(base64);
  const bytes = new Uint8Array(binaryString.length);
  for (let i = 0; i < binaryString.length; i++) {
    bytes[i] = binaryString.charCodeAt(i);
  }
  return bytes;
});
Uint8Array.prototype.toHex ??= (warn("Using a polyfill of Uint8Array.prototype.toHex"), function toHex() {
  return [...this].map((b) => b.toString(16).padStart(2, "0")).join("");
});
Uint8Array.fromHex ??= (warn("Using a polyfill of Uint8Array.fromHex"), function fromHex(hex2) {
  const bytes = new Uint8Array(hex2.length / 2);
  for (let i = 0; i < hex2.length; i += 2) {
    bytes[i / 2] = parseInt(hex2.slice(i, i + 2), 16);
  }
  return bytes;
});

// node_modules/@zenfs/core/dist/backends/store/store.js
var Transaction = class {
  store;
  constructor(store) {
    this.store = store;
  }
};
var SyncTransaction = class extends Transaction {
  /* eslint-disable @typescript-eslint/require-await */
  async get(id, offset, end) {
    return this.getSync(id, offset, end);
  }
  async set(id, data, offset) {
    return this.setSync(id, data, offset);
  }
  async remove(id) {
    return this.removeSync(id);
  }
};
var AsyncTransaction = class extends Transaction {
  asyncDone = Promise.resolve();
  /**
   * Run a asynchronous operation from a sync context. Not magic and subject to (race) conditions.
   * @internal
   */
  async(promise) {
    this.asyncDone = this.asyncDone.then(() => promise);
  }
  /**
   * Gets a cache resource
   * If `info` is set and the resource doesn't exist, it will be created
   * @internal
   */
  _cached(id, info2) {
    this.store.cache ??= /* @__PURE__ */ new Map();
    const resource = this.store.cache.get(id);
    if (!resource)
      return !info2 ? void 0 : new Resource(id, info2.size, {}, this.store.cache);
    if (info2)
      resource.size = info2.size;
    return resource;
  }
  getSync(id, offset, end) {
    const resource = this._cached(id);
    if (!resource)
      return;
    end ??= resource.size;
    const missing = resource.missing(offset, end);
    for (const { start, end: end2 } of missing) {
      this.async(this.get(id, start, end2));
    }
    if (missing.length)
      throw withErrno("EAGAIN");
    const region = resource.regionAt(offset);
    if (!region) {
      warn("Missing cache region for " + id);
      return;
    }
    return region.data.subarray(offset - region.offset, end - region.offset);
  }
  setSync(id, data, offset) {
    this.async(this.set(id, data, offset));
  }
  removeSync(id) {
    this.async(this.remove(id));
    this.store.cache?.delete(id);
  }
};
var WrappedTransaction = class {
  raw;
  fs;
  /**
   * Whether the transaction was committed or aborted
   */
  done = false;
  flag(flag) {
    return this.raw.store.flags?.includes(flag) ?? false;
  }
  constructor(raw, fs) {
    this.raw = raw;
    this.fs = fs;
  }
  /**
   * Stores data in the keys we modify prior to modifying them.
   * Allows us to roll back commits.
   */
  originalData = /* @__PURE__ */ new Map();
  /**TransactionEntry
   * List of keys modified in this transaction, if any.
   */
  modifiedKeys = /* @__PURE__ */ new Set();
  keys() {
    return this.raw.keys();
  }
  async get(id, offset = 0, end) {
    const data = await this.raw.get(id, offset, end);
    this.stash(id);
    return data;
  }
  getSync(id, offset = 0, end) {
    const data = this.raw.getSync(id, offset, end);
    this.stash(id);
    return data;
  }
  async set(id, view2, offset = 0) {
    await this.markModified(id, offset, view2.byteLength);
    const buffer = view2 instanceof Uint8Array ? view2 : new Uint8Array(view2.buffer, view2.byteOffset, view2.byteLength);
    await this.raw.set(id, buffer, offset);
  }
  setSync(id, view2, offset = 0) {
    this.markModifiedSync(id, offset, view2.byteLength);
    const buffer = view2 instanceof Uint8Array ? view2 : new Uint8Array(view2.buffer, view2.byteOffset, view2.byteLength);
    this.raw.setSync(id, buffer, offset);
  }
  async remove(id) {
    await this.markModified(id, 0, void 0);
    await this.raw.remove(id);
  }
  removeSync(id) {
    this.markModifiedSync(id, 0, void 0);
    this.raw.removeSync(id);
  }
  commit() {
    this.done = true;
    return Promise.resolve();
  }
  commitSync() {
    this.done = true;
  }
  async abort() {
    if (this.done)
      return;
    for (const [id, entries2] of this.originalData) {
      if (!this.modifiedKeys.has(id))
        continue;
      if (entries2.some((ent) => !ent.data)) {
        await this.raw.remove(id);
        this.fs._remove(id);
        continue;
      }
      for (const entry of entries2.reverse()) {
        await this.raw.set(id, entry.data, entry.offset);
      }
    }
    this.done = true;
  }
  abortSync() {
    if (this.done)
      return;
    for (const [id, entries2] of this.originalData) {
      if (!this.modifiedKeys.has(id))
        continue;
      if (entries2.some((ent) => !ent.data)) {
        this.raw.removeSync(id);
        this.fs._remove(id);
        continue;
      }
      for (const entry of entries2.reverse()) {
        this.raw.setSync(id, entry.data, entry.offset);
      }
    }
    this.done = true;
  }
  async [Symbol.asyncDispose]() {
    if (this.done)
      return;
    await this.abort();
  }
  [Symbol.dispose]() {
    if (this.done)
      return;
    this.abortSync();
  }
  /**
   * Stashes given key value pair into `originalData` if it doesn't already exist.
   * Allows us to stash values the program is requesting anyway to
   * prevent needless `get` requests if the program modifies the data later
   * on during the transaction.
   */
  stash(id, data, offset = 0) {
    if (!this.originalData.has(id))
      this.originalData.set(id, []);
    this.originalData.get(id).push({ data, offset });
  }
  /**
   * Marks an id as modified, and stashes its value if it has not been stashed already.
   */
  async markModified(id, offset, length) {
    this.modifiedKeys.add(id);
    const end = length ? offset + length : void 0;
    try {
      this.stash(id, await this.raw.get(id, offset, end), offset);
    } catch (e) {
      if (!(this.raw instanceof AsyncTransaction))
        throw e;
      const tx = this.raw;
      const resource = tx._cached(id);
      if (!resource)
        throw e;
      for (const range of resource.cached(offset, end ?? offset)) {
        this.stash(id, await this.raw.get(id, range.start, range.end), range.start);
      }
    }
  }
  /**
   * Marks an id as modified, and stashes its value if it has not been stashed already.
   */
  markModifiedSync(id, offset, length) {
    this.modifiedKeys.add(id);
    const end = length ? offset + length : void 0;
    try {
      this.stash(id, this.raw.getSync(id, offset, end), offset);
    } catch (e) {
      if (!(this.raw instanceof AsyncTransaction))
        throw e;
      const tx = this.raw;
      const resource = tx._cached(id);
      if (!resource)
        throw e;
      for (const range of resource.cached(offset, end ?? offset)) {
        this.stash(id, this.raw.getSync(id, range.start, range.end), range.start);
      }
    }
  }
};

// node_modules/@zenfs/core/dist/backends/store/fs.js
var __addDisposableResource = function(env, value, async) {
  if (value !== null && value !== void 0) {
    if (typeof value !== "object" && typeof value !== "function") throw new TypeError("Object expected.");
    var dispose, inner;
    if (async) {
      if (!Symbol.asyncDispose) throw new TypeError("Symbol.asyncDispose is not defined.");
      dispose = value[Symbol.asyncDispose];
    }
    if (dispose === void 0) {
      if (!Symbol.dispose) throw new TypeError("Symbol.dispose is not defined.");
      dispose = value[Symbol.dispose];
      if (async) inner = dispose;
    }
    if (typeof dispose !== "function") throw new TypeError("Object not disposable.");
    if (inner) dispose = function() {
      try {
        inner.call(this);
      } catch (e) {
        return Promise.reject(e);
      }
    };
    env.stack.push({ value, dispose, async });
  } else if (async) {
    env.stack.push({ async: true });
  }
  return value;
};
var __disposeResources = /* @__PURE__ */ (function(SuppressedError2) {
  return function(env) {
    function fail(e) {
      env.error = env.hasError ? new SuppressedError2(e, env.error, "An error was suppressed during disposal.") : e;
      env.hasError = true;
    }
    var r, s = 0;
    function next() {
      while (r = env.stack.pop()) {
        try {
          if (!r.async && s === 1) return s = 0, env.stack.push(r), Promise.resolve().then(next);
          if (r.dispose) {
            var result = r.dispose.call(r.value);
            if (r.async) return s |= 2, Promise.resolve(result).then(next, function(e) {
              fail(e);
              return next();
            });
          } else s |= 1;
        } catch (e) {
          fail(e);
        }
      }
      if (s === 1) return env.hasError ? Promise.reject(env.error) : Promise.resolve();
      if (env.hasError) throw env.error;
    }
    return next();
  };
})(typeof SuppressedError === "function" ? SuppressedError : function(error2, suppressed, message) {
  var e = new Error(message);
  return e.name = "SuppressedError", e.error = error2, e.suppressed = suppressed, e;
});
var StoreFS = class extends FileSystem {
  store;
  /**
   * A map of paths to inode IDs
   * @internal @hidden
   */
  _ids = /* @__PURE__ */ new Map([["/", 0]]);
  /**
   * A map of inode IDs to paths
   * @internal @hidden
   */
  _paths = /* @__PURE__ */ new Map([[0, new Set("/")]]);
  /**
   * Gets the first path associated with an inode
   */
  _path(id) {
    const [path] = this._paths.get(id) ?? [];
    return path;
  }
  /**
   * Add a inode/path pair
   */
  _add(ino, path) {
    if (!this._paths.has(ino))
      this._paths.set(ino, /* @__PURE__ */ new Set());
    this._paths.get(ino).add(path);
    this._ids.set(path, ino);
  }
  /**
   * Remove a inode/path pair
   */
  _remove(ino) {
    for (const path of this._paths.get(ino) ?? []) {
      this._ids.delete(path);
    }
    this._paths.delete(ino);
  }
  /**
   * Move paths in the tables
   */
  _move(from2, to) {
    const toMove = [];
    for (const [path, ino] of this._ids) {
      const rel = relative(from2, path);
      if (rel.startsWith(".."))
        continue;
      let newKey = join(to, rel);
      if (newKey.endsWith("/"))
        newKey = newKey.slice(0, -1);
      toMove.push({ oldKey: path, newKey, ino });
    }
    for (const { oldKey, newKey, ino } of toMove) {
      this._ids.delete(oldKey);
      this._ids.set(newKey, ino);
      const p = this._paths.get(ino);
      if (!p) {
        warn("Missing paths in table for ino " + ino);
        continue;
      }
      p.delete(oldKey);
      p.add(newKey);
    }
  }
  _initialized = false;
  async ready() {
    if (this._initialized)
      return;
    if (!this.attributes.has("no_async_preload")) {
      this.checkRootSync();
    }
    await this.checkRoot();
    await this._populate();
    this._initialized = true;
  }
  readySync() {
    if (this._initialized)
      return;
    if (!this.attributes.has("no_async_preload")) {
      this.checkRootSync();
    }
    this.checkRootSync();
    this._populateSync();
    this._initialized = true;
  }
  constructor(store) {
    super(store.type ?? 1802921587, store.name);
    this.store = store;
    store.fs = this;
    this._uuid = store.uuid ?? this.uuid;
    this.label = store.label;
    debug(this.name + ": supports features: " + this.store.flags?.join(", "));
  }
  /**
   * @experimental
   */
  usage() {
    return this.store.usage?.() || {
      totalSpace: 0,
      freeSpace: 0
    };
  }
  /**
   * Load an index into the StoreFS.
   * You *must* manually add non-directory files
   */
  async loadIndex(index) {
    const env_1 = { stack: [], error: void 0, hasError: false };
    try {
      const tx = __addDisposableResource(env_1, this.transaction(), true);
      const dirs = index.directories();
      for (const [path, inode] of index) {
        this._add(inode.ino, path);
        await tx.set(inode.ino, inode);
        if (dirs.has(path))
          await tx.set(inode.data, encodeDirListing(dirs.get(path)));
      }
      await tx.commit();
    } catch (e_1) {
      env_1.error = e_1;
      env_1.hasError = true;
    } finally {
      const result_1 = __disposeResources(env_1);
      if (result_1)
        await result_1;
    }
  }
  /**
   * Load an index into the StoreFS.
   * You *must* manually add non-directory files
   */
  loadIndexSync(index) {
    const env_2 = { stack: [], error: void 0, hasError: false };
    try {
      const tx = __addDisposableResource(env_2, this.transaction(), false);
      const dirs = index.directories();
      for (const [path, inode] of index) {
        this._add(inode.ino, path);
        tx.setSync(inode.ino, inode);
        if (dirs.has(path))
          tx.setSync(inode.data, encodeDirListing(dirs.get(path)));
      }
      tx.commitSync();
    } catch (e_2) {
      env_2.error = e_2;
      env_2.hasError = true;
    } finally {
      __disposeResources(env_2);
    }
  }
  async createIndex() {
    const env_3 = { stack: [], error: void 0, hasError: false };
    try {
      const index = new Index();
      const tx = __addDisposableResource(env_3, this.transaction(), true);
      const queue = [["/", 0]];
      const silence = canary(withErrno("EDEADLK"));
      while (queue.length) {
        const [path, ino] = queue.shift();
        const inode = new Inode(await tx.get(ino));
        index.set(path, inode);
        if (inode.mode & S_IFDIR) {
          const dir = decodeDirListing(await tx.get(inode.data) ?? _throw(withErrno("ENODATA")));
          for (const [name, id] of Object.entries(dir)) {
            queue.push([join(path, name), id]);
          }
        }
      }
      silence();
      return index;
    } catch (e_3) {
      env_3.error = e_3;
      env_3.hasError = true;
    } finally {
      const result_2 = __disposeResources(env_3);
      if (result_2)
        await result_2;
    }
  }
  createIndexSync() {
    const env_4 = { stack: [], error: void 0, hasError: false };
    try {
      const index = new Index();
      const tx = __addDisposableResource(env_4, this.transaction(), false);
      const queue = [["/", 0]];
      const silence = canary(withErrno("EDEADLK"));
      while (queue.length) {
        const [path, ino] = queue.shift();
        const inode = new Inode(tx.getSync(ino));
        index.set(path, inode);
        if (inode.mode & S_IFDIR) {
          const dir = decodeDirListing(tx.getSync(inode.data) ?? _throw(withErrno("ENODATA")));
          for (const [name, id] of Object.entries(dir)) {
            queue.push([join(path, name), id]);
          }
        }
      }
      silence();
      return index;
    } catch (e_4) {
      env_4.error = e_4;
      env_4.hasError = true;
    } finally {
      __disposeResources(env_4);
    }
  }
  /**
   * @todo Make rename compatible with the cache.
   */
  async rename(oldPath, newPath) {
    const env_5 = { stack: [], error: void 0, hasError: false };
    try {
      const tx = __addDisposableResource(env_5, this.transaction(), true);
      const _old = parse(oldPath), _new = parse(newPath), oldDirNode = await this.findInode(tx, _old.dir), oldDirList = decodeDirListing(await tx.get(oldDirNode.data) ?? _throw(withErrno("ENODATA")));
      if (!oldDirList[_old.base])
        throw withErrno("ENOENT");
      const ino = oldDirList[_old.base];
      if (ino != this._ids.get(oldPath))
        err(`Ino mismatch while renaming ${oldPath} to ${newPath}`);
      delete oldDirList[_old.base];
      if ((_new.dir + "/").startsWith(oldPath + "/"))
        throw withErrno("EBUSY");
      const sameParent = _new.dir == _old.dir;
      const newDirNode = sameParent ? oldDirNode : await this.findInode(tx, _new.dir);
      const newDirList = sameParent ? oldDirList : decodeDirListing(await tx.get(newDirNode.data) ?? _throw(withErrno("ENODATA")));
      if (newDirList[_new.base]) {
        const existing = new Inode(await tx.get(newDirList[_new.base]) ?? _throw(withErrno("ENOENT")));
        if (!isFile(existing))
          throw withErrno("EISDIR");
        await tx.remove(existing.data);
        await tx.remove(newDirList[_new.base]);
      }
      newDirList[_new.base] = ino;
      await tx.set(oldDirNode.data, encodeDirListing(oldDirList));
      await tx.set(newDirNode.data, encodeDirListing(newDirList));
      await tx.commit();
      this._move(oldPath, newPath);
    } catch (e_5) {
      env_5.error = e_5;
      env_5.hasError = true;
    } finally {
      const result_3 = __disposeResources(env_5);
      if (result_3)
        await result_3;
    }
  }
  renameSync(oldPath, newPath) {
    const env_6 = { stack: [], error: void 0, hasError: false };
    try {
      const tx = __addDisposableResource(env_6, this.transaction(), false);
      const _old = parse(oldPath), _new = parse(newPath), oldDirNode = this.findInodeSync(tx, _old.dir), oldDirList = decodeDirListing(tx.getSync(oldDirNode.data) ?? _throw(withErrno("ENODATA")));
      if (!oldDirList[_old.base])
        throw withErrno("ENOENT");
      const ino = oldDirList[_old.base];
      if (ino != this._ids.get(oldPath))
        err(`Ino mismatch while renaming ${oldPath} to ${newPath}`);
      delete oldDirList[_old.base];
      if ((_new.dir + "/").startsWith(oldPath + "/"))
        throw withErrno("EBUSY");
      const sameParent = _new.dir === _old.dir;
      const newDirNode = sameParent ? oldDirNode : this.findInodeSync(tx, _new.dir);
      const newDirList = sameParent ? oldDirList : decodeDirListing(tx.getSync(newDirNode.data) ?? _throw(withErrno("ENODATA")));
      if (newDirList[_new.base]) {
        const existing = new Inode(tx.getSync(newDirList[_new.base]) ?? _throw(withErrno("ENOENT")));
        if (!isFile(existing))
          throw withErrno("EISDIR");
        tx.removeSync(existing.data);
        tx.removeSync(newDirList[_new.base]);
      }
      newDirList[_new.base] = ino;
      tx.setSync(oldDirNode.data, encodeDirListing(oldDirList));
      tx.setSync(newDirNode.data, encodeDirListing(newDirList));
      tx.commitSync();
      this._move(oldPath, newPath);
    } catch (e_6) {
      env_6.error = e_6;
      env_6.hasError = true;
    } finally {
      __disposeResources(env_6);
    }
  }
  async stat(path) {
    const env_7 = { stack: [], error: void 0, hasError: false };
    try {
      const tx = __addDisposableResource(env_7, this.transaction(), true);
      return await this.findInode(tx, path);
    } catch (e_7) {
      env_7.error = e_7;
      env_7.hasError = true;
    } finally {
      const result_4 = __disposeResources(env_7);
      if (result_4)
        await result_4;
    }
  }
  statSync(path) {
    const env_8 = { stack: [], error: void 0, hasError: false };
    try {
      const tx = __addDisposableResource(env_8, this.transaction(), false);
      return this.findInodeSync(tx, path);
    } catch (e_8) {
      env_8.error = e_8;
      env_8.hasError = true;
    } finally {
      __disposeResources(env_8);
    }
  }
  async touch(path, metadata) {
    const env_9 = { stack: [], error: void 0, hasError: false };
    try {
      const tx = __addDisposableResource(env_9, this.transaction(), true);
      const inode = await this.findInode(tx, path);
      if (inode.update(metadata)) {
        this._add(inode.ino, path);
        tx.setSync(inode.ino, inode);
      }
      await tx.commit();
    } catch (e_9) {
      env_9.error = e_9;
      env_9.hasError = true;
    } finally {
      const result_5 = __disposeResources(env_9);
      if (result_5)
        await result_5;
    }
  }
  touchSync(path, metadata) {
    const env_10 = { stack: [], error: void 0, hasError: false };
    try {
      const tx = __addDisposableResource(env_10, this.transaction(), false);
      const inode = this.findInodeSync(tx, path);
      if (inode.update(metadata)) {
        this._add(inode.ino, path);
        tx.setSync(inode.ino, inode);
      }
      tx.commitSync();
    } catch (e_10) {
      env_10.error = e_10;
      env_10.hasError = true;
    } finally {
      __disposeResources(env_10);
    }
  }
  async createFile(path, options) {
    return await this.commitNew(path, { ...options, mode: options.mode | S_IFREG }, new Uint8Array());
  }
  createFileSync(path, options) {
    return this.commitNewSync(path, { ...options, mode: options.mode | S_IFREG }, new Uint8Array());
  }
  async unlink(path) {
    return this.remove(path, false);
  }
  unlinkSync(path) {
    this.removeSync(path, false);
  }
  async rmdir(path) {
    if ((await this.readdir(path)).length)
      throw withErrno("ENOTEMPTY");
    await this.remove(path, true);
  }
  rmdirSync(path) {
    if (this.readdirSync(path).length)
      throw withErrno("ENOTEMPTY");
    this.removeSync(path, true);
  }
  async mkdir(path, options) {
    return await this.commitNew(path, { ...options, mode: options.mode | S_IFDIR }, encodeUTF8("{}"));
  }
  mkdirSync(path, options) {
    return this.commitNewSync(path, { ...options, mode: options.mode | S_IFDIR }, encodeUTF8("{}"));
  }
  async readdir(path) {
    const env_11 = { stack: [], error: void 0, hasError: false };
    try {
      const tx = __addDisposableResource(env_11, this.transaction(), true);
      const node = await this.findInode(tx, path);
      return Object.keys(decodeDirListing(await tx.get(node.data) ?? _throw(withErrno("ENOENT"))));
    } catch (e_11) {
      env_11.error = e_11;
      env_11.hasError = true;
    } finally {
      const result_6 = __disposeResources(env_11);
      if (result_6)
        await result_6;
    }
  }
  readdirSync(path) {
    const env_12 = { stack: [], error: void 0, hasError: false };
    try {
      const tx = __addDisposableResource(env_12, this.transaction(), false);
      const node = this.findInodeSync(tx, path);
      return Object.keys(decodeDirListing(tx.getSync(node.data) ?? _throw(withErrno("ENOENT"))));
    } catch (e_12) {
      env_12.error = e_12;
      env_12.hasError = true;
    } finally {
      __disposeResources(env_12);
    }
  }
  /**
   * Updated the inode and data node at `path`
   */
  async sync() {
  }
  /**
   * Updated the inode and data node at `path`
   */
  syncSync() {
  }
  async link(target, link5) {
    const env_13 = { stack: [], error: void 0, hasError: false };
    try {
      const tx = __addDisposableResource(env_13, this.transaction(), true);
      const newDir = dirname(link5), newDirNode = await this.findInode(tx, newDir), listing = decodeDirListing(await tx.get(newDirNode.data) ?? _throw(withErrno("ENOENT")));
      const inode = await this.findInode(tx, target);
      inode.nlink++;
      listing[basename(link5)] = inode.ino;
      this._add(inode.ino, link5);
      await tx.set(inode.ino, inode);
      await tx.set(newDirNode.data, encodeDirListing(listing));
      await tx.commit();
    } catch (e_13) {
      env_13.error = e_13;
      env_13.hasError = true;
    } finally {
      const result_7 = __disposeResources(env_13);
      if (result_7)
        await result_7;
    }
  }
  linkSync(target, link5) {
    const env_14 = { stack: [], error: void 0, hasError: false };
    try {
      const tx = __addDisposableResource(env_14, this.transaction(), false);
      const newDir = dirname(link5), newDirNode = this.findInodeSync(tx, newDir), listing = decodeDirListing(tx.getSync(newDirNode.data) ?? _throw(withErrno("ENOENT")));
      const inode = this.findInodeSync(tx, target);
      inode.nlink++;
      listing[basename(link5)] = inode.ino;
      this._add(inode.ino, link5);
      tx.setSync(inode.ino, inode);
      tx.setSync(newDirNode.data, encodeDirListing(listing));
      tx.commitSync();
    } catch (e_14) {
      env_14.error = e_14;
      env_14.hasError = true;
    } finally {
      __disposeResources(env_14);
    }
  }
  async read(path, buffer, offset, end) {
    const env_15 = { stack: [], error: void 0, hasError: false };
    try {
      const tx = __addDisposableResource(env_15, this.transaction(), true);
      const inode = await this.findInode(tx, path);
      if (inode.size == 0)
        return;
      const data = await tx.get(inode.data, offset, end) ?? _throw(withErrno("ENODATA"));
      const _ = tx.flag("partial") ? data : data.subarray(offset, end);
      if (_.byteLength > buffer.byteLength)
        err(`Trying to place ${_.byteLength} bytes into a ${buffer.byteLength} byte buffer on read`);
      buffer.set(_);
    } catch (e_15) {
      env_15.error = e_15;
      env_15.hasError = true;
    } finally {
      const result_8 = __disposeResources(env_15);
      if (result_8)
        await result_8;
    }
  }
  readSync(path, buffer, offset, end) {
    const env_16 = { stack: [], error: void 0, hasError: false };
    try {
      const tx = __addDisposableResource(env_16, this.transaction(), false);
      const inode = this.findInodeSync(tx, path);
      if (inode.size == 0)
        return;
      const data = tx.getSync(inode.data, offset, end) ?? _throw(withErrno("ENODATA"));
      const _ = tx.flag("partial") ? data : data.subarray(offset, end);
      if (_.byteLength > buffer.byteLength)
        err(`Trying to place ${_.byteLength} bytes into a ${buffer.byteLength} byte buffer on read`);
      buffer.set(_);
    } catch (e_16) {
      env_16.error = e_16;
      env_16.hasError = true;
    } finally {
      __disposeResources(env_16);
    }
  }
  async write(path, data, offset) {
    const env_17 = { stack: [], error: void 0, hasError: false };
    try {
      const tx = __addDisposableResource(env_17, this.transaction(), true);
      const inode = await this.findInode(tx, path);
      const end = offset + data.byteLength;
      let buffer = data;
      if (!tx.flag("partial")) {
        buffer = extendBuffer(await tx.get(inode.data) ?? new Uint8Array(), end);
        buffer.set(data, offset);
        offset = 0;
      }
      await tx.set(inode.data, buffer, offset);
      inode.update({ size: Math.max(inode.size, end), mtimeMs: Date.now() });
      await tx.set(inode.ino, inode);
      this._add(inode.ino, path);
      await tx.commit();
    } catch (e_17) {
      env_17.error = e_17;
      env_17.hasError = true;
    } finally {
      const result_9 = __disposeResources(env_17);
      if (result_9)
        await result_9;
    }
  }
  writeSync(path, data, offset) {
    const env_18 = { stack: [], error: void 0, hasError: false };
    try {
      const tx = __addDisposableResource(env_18, this.transaction(), false);
      const inode = this.findInodeSync(tx, path);
      const end = offset + data.byteLength;
      let buffer = data;
      if (!tx.flag("partial")) {
        buffer = extendBuffer(tx.getSync(inode.data) ?? new Uint8Array(), end);
        buffer.set(data, offset);
        offset = 0;
      }
      tx.setSync(inode.data, buffer, offset);
      inode.update({ size: Math.max(inode.size, end), mtimeMs: Date.now() });
      tx.setSync(inode.ino, inode);
      this._add(inode.ino, path);
      tx.commitSync();
    } catch (e_18) {
      env_18.error = e_18;
      env_18.hasError = true;
    } finally {
      __disposeResources(env_18);
    }
  }
  /**
   * Wraps a transaction
   * @internal @hidden
   */
  transaction() {
    return new WrappedTransaction(this.store.transaction(), this);
  }
  /**
   * Checks if the root directory exists. Creates it if it doesn't.
   */
  async checkRoot() {
    const env_19 = { stack: [], error: void 0, hasError: false };
    try {
      const tx = __addDisposableResource(env_19, this.transaction(), true);
      if (await tx.get(rootIno))
        return;
      const inode = new Inode({ ino: rootIno, data: 1, mode: 511 | S_IFDIR });
      await tx.set(inode.data, encodeUTF8("{}"));
      this._add(rootIno, "/");
      await tx.set(rootIno, inode);
      await tx.commit();
    } catch (e_19) {
      env_19.error = e_19;
      env_19.hasError = true;
    } finally {
      const result_10 = __disposeResources(env_19);
      if (result_10)
        await result_10;
    }
  }
  /**
   * Checks if the root directory exists. Creates it if it doesn't.
   */
  checkRootSync() {
    const env_20 = { stack: [], error: void 0, hasError: false };
    try {
      const tx = __addDisposableResource(env_20, this.transaction(), false);
      if (tx.getSync(rootIno))
        return;
      const inode = new Inode({ ino: rootIno, data: 1, mode: 511 | S_IFDIR });
      tx.setSync(inode.data, encodeUTF8("{}"));
      this._add(rootIno, "/");
      tx.setSync(rootIno, inode);
      tx.commitSync();
    } catch (e_20) {
      env_20.error = e_20;
      env_20.hasError = true;
    } finally {
      __disposeResources(env_20);
    }
  }
  /**
   * Populates the `_ids` and `_paths` maps with all existing files stored in the underlying `Store`.
   */
  async _populate() {
    const env_21 = { stack: [], error: void 0, hasError: false };
    try {
      if (this._initialized) {
        warn("Attempted to populate tables after initialization");
        return;
      }
      debug("Populating tables with existing store metadata");
      const tx = __addDisposableResource(env_21, this.transaction(), true);
      const rootData = await tx.get(rootIno);
      if (!rootData) {
        notice("Store does not have a root inode");
        const inode = new Inode({ ino: rootIno, data: 1, mode: 511 | S_IFDIR });
        await tx.set(inode.data, encodeUTF8("{}"));
        this._add(rootIno, "/");
        await tx.set(rootIno, inode);
        await tx.commit();
        return;
      }
      if (rootData.length < sizeof(Inode)) {
        crit("Store contains an invalid root inode. Refusing to populate tables");
        return;
      }
      const visitedDirectories = /* @__PURE__ */ new Set();
      let i = 0;
      const queue = [["/", rootIno]];
      while (queue.length > 0) {
        i++;
        const [path, ino] = queue.shift();
        this._add(ino, path);
        const inodeData = await tx.get(ino);
        if (!inodeData) {
          warn("Store is missing data for inode: " + ino);
          continue;
        }
        if (inodeData.length < sizeof(Inode)) {
          warn(`Invalid inode size for ino ${ino}: ${inodeData.length}`);
          continue;
        }
        const inode = new Inode(inodeData);
        if ((inode.mode & S_IFDIR) != S_IFDIR || visitedDirectories.has(ino)) {
          continue;
        }
        visitedDirectories.add(ino);
        const dirData = await tx.get(inode.data);
        if (!dirData) {
          warn("Store is missing directory data: " + inode.data);
          continue;
        }
        const dirListing = decodeDirListing(dirData);
        for (const [entryName, childIno] of Object.entries(dirListing)) {
          queue.push([join(path, entryName), childIno]);
        }
      }
      debug(`Added ${i} existing inode(s) from store`);
    } catch (e_21) {
      env_21.error = e_21;
      env_21.hasError = true;
    } finally {
      const result_11 = __disposeResources(env_21);
      if (result_11)
        await result_11;
    }
  }
  _populateSync() {
    const env_22 = { stack: [], error: void 0, hasError: false };
    try {
      if (this._initialized) {
        warn("Attempted to populate tables after initialization");
        return;
      }
      debug("Populating tables with existing store metadata");
      const tx = __addDisposableResource(env_22, this.transaction(), false);
      const rootData = tx.getSync(rootIno);
      if (!rootData) {
        notice("Store does not have a root inode");
        const inode = new Inode({ ino: rootIno, data: 1, mode: 511 | S_IFDIR });
        tx.setSync(inode.data, encodeUTF8("{}"));
        this._add(rootIno, "/");
        tx.setSync(rootIno, inode);
        tx.commitSync();
        return;
      }
      if (rootData.length < sizeof(Inode)) {
        crit("Store contains an invalid root inode. Refusing to populate tables");
        return;
      }
      const visitedDirectories = /* @__PURE__ */ new Set();
      let i = 0;
      const queue = [["/", rootIno]];
      while (queue.length > 0) {
        i++;
        const [path, ino] = queue.shift();
        this._add(ino, path);
        const inodeData = tx.getSync(ino);
        if (!inodeData) {
          warn("Store is missing data for inode: " + ino);
          continue;
        }
        if (inodeData.length < sizeof(Inode)) {
          warn(`Invalid inode size for ino ${ino}: ${inodeData.length}`);
          continue;
        }
        const inode = new Inode(inodeData);
        if ((inode.mode & S_IFDIR) != S_IFDIR || visitedDirectories.has(ino)) {
          continue;
        }
        visitedDirectories.add(ino);
        const dirData = tx.getSync(inode.data);
        if (!dirData) {
          warn("Store is missing directory data: " + inode.data);
          continue;
        }
        const dirListing = decodeDirListing(dirData);
        for (const [entryName, childIno] of Object.entries(dirListing)) {
          queue.push([join(path, entryName), childIno]);
        }
      }
      debug(`Added ${i} existing inode(s) from store`);
    } catch (e_22) {
      env_22.error = e_22;
      env_22.hasError = true;
    } finally {
      __disposeResources(env_22);
    }
  }
  /**
   * Find an inode without using the ID tables
   */
  async _findInode(tx, path, visited = /* @__PURE__ */ new Set()) {
    if (visited.has(path))
      throw crit(withErrno("EIO", "Infinite loop detected while finding inode"));
    visited.add(path);
    if (path == "/")
      return new Inode(await tx.get(rootIno) ?? _throw(withErrno("ENODATA")));
    const { dir: parent, base: filename } = parse(path);
    const inode = await this._findInode(tx, parent, visited);
    const dirList = decodeDirListing(await tx.get(inode.data) ?? _throw(withErrno("ENODATA")));
    if (!(filename in dirList))
      throw withErrno("ENOENT");
    return new Inode(await tx.get(dirList[filename]) ?? _throw(withErrno("ENODATA")));
  }
  /**
   * Find an inode without using the ID tables
   */
  _findInodeSync(tx, path, visited = /* @__PURE__ */ new Set()) {
    if (visited.has(path))
      throw crit(withErrno("EIO", "Infinite loop detected while finding inode"));
    visited.add(path);
    if (path == "/")
      return new Inode(tx.getSync(rootIno) ?? _throw(withErrno("ENOENT")));
    const { dir: parent, base: filename } = parse(path);
    const inode = this._findInodeSync(tx, parent, visited);
    const dir = decodeDirListing(tx.getSync(inode.data) ?? _throw(withErrno("ENODATA")));
    if (!(filename in dir))
      throw withErrno("ENOENT");
    return new Inode(tx.getSync(dir[filename]) ?? _throw(withErrno("ENODATA")));
  }
  /**
   * Finds the Inode of `path`.
   * @param path The path to look up.
   * @todo memoize/cache
   */
  async findInode(tx, path) {
    if (this.attributes.has("no_id_tables"))
      return await this._findInode(tx, path);
    const ino = this._ids.get(path);
    if (ino === void 0)
      throw withErrno("ENOENT");
    return new Inode(await tx.get(ino) ?? _throw(withErrno("ENOENT")));
  }
  /**
   * Finds the Inode of `path`.
   * @param path The path to look up.
   * @return The Inode of the path p.
   * @todo memoize/cache
   */
  findInodeSync(tx, path) {
    if (this.attributes.has("no_id_tables"))
      return this._findInodeSync(tx, path);
    const ino = this._ids.get(path);
    if (ino === void 0)
      throw withErrno("ENOENT");
    return new Inode(tx.getSync(ino) ?? _throw(withErrno("ENOENT")));
  }
  _lastID;
  /** Allocates a new ID and adds the ID/path */
  allocNew(path) {
    this._lastID ??= Math.max(...this._paths.keys());
    this._lastID += 2;
    const id = this._lastID;
    if (id > size_max)
      throw err(withErrno("ENOSPC", "No IDs available"));
    this._add(id, path);
    return id;
  }
  /**
   * Commits a new file (well, a FILE or a DIRECTORY) to the file system with `mode`.
   * Note: This will commit the transaction.
   * @param path The path to the new file.
   * @param options The options to create the new file with.
   * @param data The data to store at the file's data node.
   */
  async commitNew(path, options, data) {
    const env_23 = { stack: [], error: void 0, hasError: false };
    try {
      if (path == "/")
        throw withErrno("EEXIST");
      const tx = __addDisposableResource(env_23, this.transaction(), true);
      const { dir: parentPath, base: fname } = parse(path);
      const parent = await this.findInode(tx, parentPath);
      const listing = decodeDirListing(await tx.get(parent.data) ?? _throw(withErrno("ENOENT")));
      if (listing[fname])
        throw withErrno("EEXIST");
      const id = this.allocNew(path);
      const inode = new Inode({
        ...options,
        ino: id,
        data: id + 1,
        size: data.byteLength,
        nlink: 1
      });
      await tx.set(inode.ino, inode);
      await tx.set(inode.data, data);
      listing[fname] = inode.ino;
      await tx.set(parent.data, encodeDirListing(listing));
      await tx.commit();
      return inode;
    } catch (e_23) {
      env_23.error = e_23;
      env_23.hasError = true;
    } finally {
      const result_12 = __disposeResources(env_23);
      if (result_12)
        await result_12;
    }
  }
  /**
   * Commits a new file (well, a FILE or a DIRECTORY) to the file system with `mode`.
   * Note: This will commit the transaction.
   * @param path The path to the new file.
   * @param options The options to create the new file with.
   * @param data The data to store at the file's data node.
   * @return The Inode for the new file.
   */
  commitNewSync(path, options, data) {
    const env_24 = { stack: [], error: void 0, hasError: false };
    try {
      if (path == "/")
        throw withErrno("EEXIST");
      const tx = __addDisposableResource(env_24, this.transaction(), false);
      const { dir: parentPath, base: fname } = parse(path);
      const parent = this.findInodeSync(tx, parentPath);
      const listing = decodeDirListing(tx.getSync(parent.data) ?? _throw(withErrno("ENOENT")));
      if (listing[fname])
        throw withErrno("EEXIST");
      const id = this.allocNew(path);
      const inode = new Inode({
        ...options,
        ino: id,
        data: id + 1,
        size: data.byteLength,
        nlink: 1
      });
      tx.setSync(inode.ino, inode);
      tx.setSync(inode.data, data);
      listing[fname] = inode.ino;
      tx.setSync(parent.data, encodeDirListing(listing));
      tx.commitSync();
      return inode;
    } catch (e_24) {
      env_24.error = e_24;
      env_24.hasError = true;
    } finally {
      __disposeResources(env_24);
    }
  }
  /**
   * Remove all traces of `path` from the file system.
   * @param path The path to remove from the file system.
   * @param isDir Does the path belong to a directory, or a file?
   */
  async remove(path, isDir) {
    const env_25 = { stack: [], error: void 0, hasError: false };
    try {
      const tx = __addDisposableResource(env_25, this.transaction(), true);
      const { dir: parent, base: fileName } = parse(path), parentNode = await this.findInode(tx, parent), listing = decodeDirListing(await tx.get(parentNode.data) ?? _throw(withErrno("ENOENT")));
      if (!listing[fileName])
        throw withErrno("ENOENT");
      const ino = listing[fileName];
      const inode = new Inode(await tx.get(ino) ?? _throw(withErrno("ENOENT")));
      delete listing[fileName];
      if (!isDir && isDirectory(inode))
        throw withErrno("EISDIR");
      await tx.set(parentNode.data, encodeDirListing(listing));
      if (inode.nlink > 1) {
        inode.update({ nlink: inode.nlink - 1 });
        await tx.set(inode.ino, inode);
      } else {
        await tx.remove(inode.data);
        await tx.remove(ino);
        this._remove(ino);
      }
      await tx.commit();
    } catch (e_25) {
      env_25.error = e_25;
      env_25.hasError = true;
    } finally {
      const result_13 = __disposeResources(env_25);
      if (result_13)
        await result_13;
    }
  }
  /**
   * Remove all traces of `path` from the file system.
   * @param path The path to remove from the file system.
   * @param isDir Does the path belong to a directory, or a file?
   */
  removeSync(path, isDir) {
    const env_26 = { stack: [], error: void 0, hasError: false };
    try {
      const tx = __addDisposableResource(env_26, this.transaction(), false);
      const { dir: parent, base: fileName } = parse(path), parentNode = this.findInodeSync(tx, parent), listing = decodeDirListing(tx.getSync(parentNode.data) ?? _throw(withErrno("ENOENT"))), ino = listing[fileName];
      if (!ino)
        throw withErrno("ENOENT");
      const inode = new Inode(tx.getSync(ino) ?? _throw(withErrno("ENOENT")));
      delete listing[fileName];
      if (!isDir && isDirectory(inode))
        throw withErrno("EISDIR");
      tx.setSync(parentNode.data, encodeDirListing(listing));
      if (inode.nlink > 1) {
        inode.update({ nlink: inode.nlink - 1 });
        tx.setSync(inode.ino, inode);
      } else {
        tx.removeSync(inode.data);
        tx.removeSync(ino);
        this._remove(ino);
      }
      tx.commitSync();
    } catch (e_26) {
      env_26.error = e_26;
      env_26.hasError = true;
    } finally {
      __disposeResources(env_26);
    }
  }
};

// node_modules/@zenfs/core/dist/backends/store/map.js
var SyncMapTransaction = class extends SyncTransaction {
  // eslint-disable-next-line @typescript-eslint/require-await
  async keys() {
    return this.store.keys();
  }
  async get(id) {
    return await (this.store.getAsync?.(id) ?? this.store.get(id));
  }
  getSync(id) {
    return this.store.get(id);
  }
  setSync(id, data) {
    this.store.set(id, data);
  }
  removeSync(id) {
    this.store.delete(id);
  }
};

// node_modules/@zenfs/core/dist/backends/memory.js
var InMemoryStore = class extends Map {
  maxSize;
  label;
  flags = [];
  name = "tmpfs";
  constructor(maxSize = size_max, label) {
    super();
    this.maxSize = maxSize;
    this.label = label;
  }
  async sync() {
  }
  transaction() {
    return new SyncMapTransaction(this);
  }
  get bytes() {
    let size = this.size * 4;
    for (const data of this.values())
      size += data.byteLength;
    return size;
  }
  usage() {
    return {
      totalSpace: this.maxSize,
      freeSpace: this.maxSize - this.bytes
    };
  }
};
var _InMemory = {
  name: "InMemory",
  options: {
    maxSize: { type: "number", required: false },
    label: { type: "string", required: false }
  },
  create({ maxSize, label }) {
    const fs = new StoreFS(new InMemoryStore(maxSize, label));
    fs.checkRootSync();
    return fs;
  }
};
var InMemory = _InMemory;

// node_modules/@zenfs/core/dist/internal/devices.js
var DeviceFS = class extends StoreFS {
  devices = /* @__PURE__ */ new Map();
  devicesWithDriver(driver, forceIdentity) {
    if (forceIdentity && typeof driver == "string") {
      throw err(withErrno("EINVAL", "Can not fetch devices using only a driver name"));
    }
    const devs = [];
    for (const device of this.devices.values()) {
      if (forceIdentity && device.driver != driver)
        continue;
      const name = typeof driver == "string" ? driver : driver.name;
      if (name == device.driver.name)
        devs.push(device);
    }
    return devs;
  }
  /**
   * @internal
   */
  _createDevice(driver, options = {}) {
    let ino = 1;
    const lastDev = Array.from(this.devices.values()).at(-1);
    while (this.store.has(ino) || lastDev?.inode.ino == ino)
      ino++;
    const init2 = driver.init?.(ino, options);
    const dev = {
      data: {},
      minor: 0,
      major: 0,
      ...omit(init2 ?? {}, "metadata"),
      driver,
      inode: new Inode({
        mode: S_IFCHR | 438,
        ...init2?.metadata
      })
    };
    const path = "/" + (dev.name || driver.name) + (driver.singleton ? "" : this.devicesWithDriver(driver).length);
    if (this.existsSync(path))
      throw withErrno("EEXIST");
    this.devices.set(path, dev);
    info("Initialized device: " + this._mountPoint + path);
    return dev;
  }
  /**
   * Adds default devices
   */
  addDefaults() {
    this._createDevice(nullDevice);
    this._createDevice(zeroDevice);
    this._createDevice(fullDevice);
    this._createDevice(randomDevice);
    this._createDevice(consoleDevice);
    debug("Added default devices");
  }
  constructor() {
    super(new InMemoryStore(16777216, "devfs"));
  }
  async rename(oldPath, newPath) {
    if (this.devices.has(oldPath))
      throw withErrno("EPERM");
    if (this.devices.has(newPath))
      throw withErrno("EEXIST");
    return super.rename(oldPath, newPath);
  }
  renameSync(oldPath, newPath) {
    if (this.devices.has(oldPath))
      throw withErrno("EPERM");
    if (this.devices.has(newPath))
      throw withErrno("EEXIST");
    return super.renameSync(oldPath, newPath);
  }
  async stat(path) {
    const dev = this.devices.get(path);
    if (dev)
      return dev.inode;
    return super.stat(path);
  }
  statSync(path) {
    const dev = this.devices.get(path);
    if (dev)
      return dev.inode;
    return super.statSync(path);
  }
  async touch(path, metadata) {
    const dev = this.devices.get(path);
    if (dev)
      dev.inode.update(metadata);
    else
      await super.touch(path, metadata);
  }
  touchSync(path, metadata) {
    const dev = this.devices.get(path);
    if (dev)
      dev.inode.update(metadata);
    else
      super.touchSync(path, metadata);
  }
  async createFile(path, options) {
    if (this.devices.has(path))
      throw withErrno("EEXIST");
    return super.createFile(path, options);
  }
  createFileSync(path, options) {
    if (this.devices.has(path))
      throw withErrno("EEXIST");
    return super.createFileSync(path, options);
  }
  async unlink(path) {
    if (this.devices.has(path))
      throw withErrno("EPERM");
    return super.unlink(path);
  }
  unlinkSync(path) {
    if (this.devices.has(path))
      throw withErrno("EPERM");
    return super.unlinkSync(path);
  }
  async rmdir(path) {
    return super.rmdir(path);
  }
  rmdirSync(path) {
    return super.rmdirSync(path);
  }
  async mkdir(path, options) {
    if (this.devices.has(path))
      throw withErrno("EEXIST");
    return super.mkdir(path, options);
  }
  mkdirSync(path, options) {
    if (this.devices.has(path))
      throw withErrno("EEXIST");
    return super.mkdirSync(path, options);
  }
  async readdir(path) {
    const entries2 = await super.readdir(path);
    for (const dev of this.devices.keys()) {
      if (dirname(dev) == path) {
        entries2.push(basename(dev));
      }
    }
    return entries2;
  }
  readdirSync(path) {
    const entries2 = super.readdirSync(path);
    for (const dev of this.devices.keys()) {
      if (dirname(dev) == path) {
        entries2.push(basename(dev));
      }
    }
    return entries2;
  }
  async link(target, link5) {
    if (this.devices.has(target))
      throw withErrno("EPERM");
    if (this.devices.has(link5))
      throw withErrno("EEXIST");
    return super.link(target, link5);
  }
  linkSync(target, link5) {
    if (this.devices.has(target))
      throw withErrno("EPERM");
    if (this.devices.has(link5))
      throw withErrno("EEXIST");
    return super.linkSync(target, link5);
  }
  async sync() {
    for (const device of this.devices.values()) {
      device.driver.sync?.(device);
    }
    return super.sync();
  }
  syncSync() {
    for (const device of this.devices.values()) {
      device.driver.sync?.(device);
    }
    return super.syncSync();
  }
  async read(path, buffer, offset, end) {
    const device = this.devices.get(path);
    if (!device) {
      await super.read(path, buffer, offset, end);
      return;
    }
    device.driver.read(device, buffer, offset, end);
  }
  readSync(path, buffer, offset, end) {
    const device = this.devices.get(path);
    if (!device) {
      super.readSync(path, buffer, offset, end);
      return;
    }
    device.driver.read(device, buffer, offset, end);
  }
  async write(path, data, offset) {
    const device = this.devices.get(path);
    if (!device) {
      return await super.write(path, data, offset);
    }
    device.driver.write(device, data, offset);
  }
  writeSync(path, data, offset) {
    const device = this.devices.get(path);
    if (!device) {
      return super.writeSync(path, data, offset);
    }
    device.driver.write(device, data, offset);
  }
};
var emptyBuffer = new Uint8Array();
var nullDevice = {
  name: "null",
  singleton: true,
  init() {
    return { major: 1, minor: 3 };
  },
  read() {
    return emptyBuffer;
  },
  write() {
    return;
  }
};
var zeroDevice = {
  name: "zero",
  singleton: true,
  init() {
    return { major: 1, minor: 5 };
  },
  read(device, buffer, offset, end) {
    buffer.fill(0, offset, end);
  },
  write() {
    return;
  }
};
var fullDevice = {
  name: "full",
  singleton: true,
  init() {
    return { major: 1, minor: 7 };
  },
  read(device, buffer, offset, end) {
    buffer.fill(0, offset, end);
  },
  write() {
    throw withErrno("ENOSPC");
  }
};
var randomDevice = {
  name: "random",
  singleton: true,
  init() {
    return { major: 1, minor: 8 };
  },
  read(device, buffer) {
    for (let i = 0; i < buffer.length; i++) {
      buffer[i] = Math.floor(Math.random() * 256);
    }
  },
  write() {
    return;
  }
};
var consoleDevice = {
  name: "console",
  singleton: true,
  init(ino, { output: output2 = (text) => console.log(text) } = {}) {
    return { major: 5, minor: 1, data: { output: output2 } };
  },
  read() {
    return emptyBuffer;
  },
  write(device, buffer, offset) {
    const text = decodeUTF8(buffer);
    device.data.output(text, offset);
  }
};

// node_modules/@zenfs/core/dist/node/promises.js
var promises_exports = {};
__export(promises_exports, {
  FileHandle: () => FileHandle,
  access: () => access,
  appendFile: () => appendFile,
  chmod: () => chmod,
  chown: () => chown,
  constants: () => constants_exports,
  copyFile: () => copyFile,
  cp: () => cp,
  exists: () => exists,
  glob: () => glob,
  lchmod: () => lchmod,
  lchown: () => lchown,
  link: () => link3,
  lstat: () => lstat,
  lutimes: () => lutimes,
  mkdir: () => mkdir3,
  mkdtemp: () => mkdtemp,
  mkdtempDisposable: () => mkdtempDisposable,
  open: () => open3,
  opendir: () => opendir,
  readFile: () => readFile,
  readdir: () => readdir2,
  readlink: () => readlink3,
  realpath: () => realpath,
  rename: () => rename3,
  rm: () => rm,
  rmdir: () => rmdir,
  stat: () => stat3,
  statfs: () => statfs,
  symlink: () => symlink,
  truncate: () => truncate,
  unlink: () => unlink,
  utimes: () => utimes,
  watch: () => watch,
  writeFile: () => writeFile
});
var import_buffer6 = __toESM(require_buffer(), 1);

// node_modules/@zenfs/core/dist/vfs/config.js
var checkAccess = true;
function _setAccessChecks(value) {
  checkAccess = value;
}

// node_modules/@zenfs/core/dist/vfs/dir.js
var DirType;
(function(DirType2) {
  DirType2[DirType2["UNKNOWN"] = 0] = "UNKNOWN";
  DirType2[DirType2["FIFO"] = 1] = "FIFO";
  DirType2[DirType2["CHR"] = 2] = "CHR";
  DirType2[DirType2["DIR"] = 4] = "DIR";
  DirType2[DirType2["BLK"] = 6] = "BLK";
  DirType2[DirType2["REG"] = 8] = "REG";
  DirType2[DirType2["LNK"] = 10] = "LNK";
  DirType2[DirType2["SOCK"] = 12] = "SOCK";
  DirType2[DirType2["WHT"] = 14] = "WHT";
})(DirType || (DirType = {}));
function ifToDt(mode) {
  return (mode & 61440) >> 12;
}
var Dirent = class {
  ino;
  type;
  path;
  name;
};

// node_modules/kerium/dist/locks.js
var __runInitializers3 = function(thisArg, initializers, value) {
  var useValue = arguments.length > 2;
  for (var i = 0; i < initializers.length; i++) {
    value = useValue ? initializers[i].call(thisArg, value) : initializers[i].call(thisArg);
  }
  return useValue ? value : void 0;
};
var __esDecorate3 = function(ctor, descriptorIn, decorators, contextIn, initializers, extraInitializers) {
  function accept(f) {
    if (f !== void 0 && typeof f !== "function") throw new TypeError("Function expected");
    return f;
  }
  var kind = contextIn.kind, key = kind === "getter" ? "get" : kind === "setter" ? "set" : "value";
  var target = !descriptorIn && ctor ? contextIn["static"] ? ctor : ctor.prototype : null;
  var descriptor = descriptorIn || (target ? Object.getOwnPropertyDescriptor(target, contextIn.name) : {});
  var _, done = false;
  for (var i = decorators.length - 1; i >= 0; i--) {
    var context = {};
    for (var p in contextIn) context[p] = p === "access" ? {} : contextIn[p];
    for (var p in contextIn.access) context.access[p] = contextIn.access[p];
    context.addInitializer = function(f) {
      if (done) throw new TypeError("Cannot add initializers after decoration has completed");
      extraInitializers.push(accept(f || null));
    };
    var result = (0, decorators[i])(kind === "accessor" ? { get: descriptor.get, set: descriptor.set } : descriptor[key], context);
    if (kind === "accessor") {
      if (result === void 0) continue;
      if (result === null || typeof result !== "object") throw new TypeError("Object expected");
      if (_ = accept(result.get)) descriptor.get = _;
      if (_ = accept(result.set)) descriptor.set = _;
      if (_ = accept(result.init)) initializers.unshift(_);
    } else if (_ = accept(result)) {
      if (kind === "field") initializers.unshift(_);
      else descriptor[key] = _;
    }
  }
  if (target) Object.defineProperty(target, contextIn.name, descriptor);
  done = true;
};
var RwLock = class {
  /** Release promises for every currently held or queued acquisition */
  pending = /* @__PURE__ */ new Set();
  /** This is the *last queued* writer */
  lastWriter;
  /** The current accepted write state of the lock */
  writeState = 0;
  /** Number of currently accepted readers */
  readers = 0;
  syncReaders = 0;
  /** Actually take the lock */
  take(mode, sync, resolve4) {
    if (mode == "rw") {
      this.writeState = sync ? 2 : 1;
    } else {
      this.readers++;
      if (sync)
        this.syncReaders++;
    }
    let released = false;
    const release = () => {
      if (released)
        return;
      released = true;
      if (mode == "rw") {
        this.writeState = 0;
      } else {
        this.readers--;
        if (sync)
          this.syncReaders--;
      }
      resolve4();
    };
    release[Symbol.dispose] = release;
    return release;
  }
  /** Queue the reader or writer */
  queue(mode) {
    const { promise, resolve: resolve4 } = Promise.withResolvers();
    this.pending.add(promise);
    if (mode == "rw")
      this.lastWriter = promise;
    void promise.then(() => {
      this.pending.delete(promise);
      if (this.lastWriter == promise)
        delete this.lastWriter;
    });
    return resolve4;
  }
  /**
   * Acquire a lock asynchronously
   */
  async acquire(mode) {
    const allReleased = mode == "ro" ? this.lastWriter : Promise.all(this.pending);
    const resolve4 = this.queue(mode);
    await allReleased;
    return this.take(mode, false, resolve4);
  }
  /**
   * Acquire a lock synchronously. Does not support waiting for existing locks.
   * @throws EDEADLK for rw if there is an existing synchronous holder (it is in the current call chain)
   * @throws EAGAIN for rw if there is an existing asynchronous holder
   */
  acquireSync(mode) {
    if (this.writeState == 2 || mode == "rw" && this.syncReaders)
      throw withErrno("EDEADLK");
    if (this.writeState || mode == "rw" && this.readers)
      throw withErrno("EAGAIN");
    return this.take(mode, true, this.queue(mode));
  }
  /** Whether a synchronous lock can be acquired for the given mode */
  isAvailable(mode) {
    return (mode != "rw" || !this.readers) && !this.writeState;
  }
  /** Whether the lock is currently free. This value may be invalid after an `await` */
  get isFree() {
    return !this.writeState && !this.readers;
  }
  /** How the lock is currently being used. This value may be invalid after an `await` */
  get mode() {
    if (this.writeState)
      return "rw";
    if (this.readers)
      return "ro";
    return null;
  }
};
var RwLockable = (() => {
  let _instanceExtraInitializers = [];
  let _get_lock_decorators;
  let _get_lockSync_decorators;
  return class RwLockable {
    static {
      const _metadata = typeof Symbol === "function" && Symbol.metadata ? /* @__PURE__ */ Object.create(null) : void 0;
      _get_lock_decorators = [memoize];
      _get_lockSync_decorators = [memoize];
      __esDecorate3(this, null, _get_lock_decorators, { kind: "getter", name: "lock", static: false, private: false, access: { has: (obj) => "lock" in obj, get: (obj) => obj.lock }, metadata: _metadata }, null, _instanceExtraInitializers);
      __esDecorate3(this, null, _get_lockSync_decorators, { kind: "getter", name: "lockSync", static: false, private: false, access: { has: (obj) => "lockSync" in obj, get: (obj) => obj.lockSync }, metadata: _metadata }, null, _instanceExtraInitializers);
      if (_metadata) Object.defineProperty(this, Symbol.metadata, { enumerable: true, configurable: true, writable: true, value: _metadata });
    }
    _rwLock = (__runInitializers3(this, _instanceExtraInitializers), new RwLock());
    get lock() {
      return this._rwLock.acquire.bind(this._rwLock);
    }
    get lockSync() {
      return this._rwLock.acquireSync.bind(this._rwLock);
    }
    get isLocked() {
      return !this._rwLock.isFree;
    }
    get lockMode() {
      return this._rwLock.mode;
    }
  };
})();

// node_modules/@zenfs/core/dist/vfs/vnode.js
var VNode = class extends RwLockable {
  fs;
  inode;
  /** Cached file data. This is a page cache, but with byte granularity */
  data;
  /** Ranges of `data` that have been written but not yet synced to the backend */
  dirtyRanges = [];
  /** The smallest size this vnode has been truncated to since the last sync, if it has been truncated */
  truncatedTo;
  /** Whether `inode` has changes that have not been synced to the backend */
  metadataDirty = false;
  /** The number of active references: open handles and in-progress VFS operations */
  refs = 0;
  /** Paths on `fs` that refer to this vnode. Multiple paths refer to the same vnode with hard links */
  paths = /* @__PURE__ */ new Set();
  /** Fallback for when the last path is removed (i.e. the file is unlinked while open) */
  _lastPath;
  constructor(fs, path, inode) {
    super();
    this.fs = fs;
    this.inode = inode;
    this.paths.add(path);
    this._lastPath = path;
    this.data = new Resource(inode.ino, inode.size, { sparse: true });
  }
  get ino() {
    return this.inode.ino;
  }
  /** A path that can be used to address the backend */
  get path() {
    const [path] = this.paths;
    if (path !== void 0)
      this._lastPath = path;
    return path ?? this._lastPath;
  }
  /** Whether this vnode has data or metadata that has not been synced to the backend */
  get dirty() {
    return this.metadataDirty || this.dirtyRanges.length > 0;
  }
  /** Character and block devices bypass the data cache */
  get bypassCache() {
    return isCharacterDevice(this.inode) || isBlockDevice(this.inode) || !!(this.inode.flags & InodeFlags.DAX);
  }
  /** Add a range to `dirtyRanges`, merging overlapping and adjacent ranges */
  markDirty(start, end) {
    this.dirtyRanges.push({ start, end });
    this.dirtyRanges.sort((a, b) => a.start - b.start);
    const merged = [];
    for (const range of this.dirtyRanges) {
      const last = merged.at(-1);
      if (last && range.start <= last.end)
        last.end = Math.max(last.end, range.end);
      else
        merged.push(range);
    }
    this.dirtyRanges = merged;
  }
  /**
   * Copy `[start, end)` from the cache into `buffer`.
   * Uncached spans are holes (e.g. from an extending truncate) and are zero-filled.
   */
  copyFromCache(buffer, start, end) {
    let pos = start;
    for (const region of this.data.regions) {
      const regionEnd = region.offset + region.data.byteLength;
      if (regionEnd <= pos)
        continue;
      if (region.offset >= end)
        break;
      if (region.offset > pos) {
        buffer.fill(0, pos - start, region.offset - start);
        pos = region.offset;
      }
      const copyEnd = Math.min(end, regionEnd);
      buffer.set(region.data.subarray(pos - region.offset, copyEnd - region.offset), pos - start);
      pos = copyEnd;
    }
    if (pos < end)
      buffer.fill(0, pos - start, end - start);
  }
  /**
   * Read `[start, end)` into `buffer`, fetching any missing ranges from the backend.
   */
  async read(buffer, start, end) {
    if (this.bypassCache)
      return await this.fs.read(this.path, buffer, start, end);
    for (const { start: rangeStart, end: rangeEnd } of this.data.missing(start, end)) {
      const chunk = new Uint8Array(rangeEnd - rangeStart);
      await this.fs.read(this.path, chunk, rangeStart, rangeEnd);
      this.data.add(chunk, rangeStart);
    }
    this.copyFromCache(buffer, start, end);
  }
  readSync(buffer, start, end) {
    if (this.bypassCache)
      return this.fs.readSync(this.path, buffer, start, end);
    for (const { start: rangeStart, end: rangeEnd } of this.data.missing(start, end)) {
      const chunk = new Uint8Array(rangeEnd - rangeStart);
      this.fs.readSync(this.path, chunk, rangeStart, rangeEnd);
      this.data.add(chunk, rangeStart);
    }
    this.copyFromCache(buffer, start, end);
  }
  /**
   * Write `data` at `offset` into the cache and update metadata.
   * The backend is not written to until `sync`, except for devices, which bypass the cache.
   */
  async write(data, offset) {
    if (this.bypassCache)
      await this.fs.write(this.path, data, offset);
    else
      this._writeCached(data, offset);
    this._writeMetadata(offset + data.byteLength);
  }
  writeSync(data, offset) {
    if (this.bypassCache)
      this.fs.writeSync(this.path, data, offset);
    else
      this._writeCached(data, offset);
    this._writeMetadata(offset + data.byteLength);
  }
  _writeCached(data, offset) {
    const end = offset + data.byteLength;
    this.data.add(data.slice(), offset);
    if (end > this.data.size)
      this.data.size = end;
    this.markDirty(offset, end);
  }
  _writeMetadata(end) {
    if (!this.bypassCache && end > this.inode.size)
      this.inode.size = end;
    this.inode.mtimeMs = Date.now();
    this.inode.ctimeMs = Date.now();
    this.metadataDirty = true;
  }
  /**
   * Change the size of the file.
   * Note an extending truncate creates a hole, which reads as zeroes.
   */
  truncate(length) {
    this.truncatedTo = Math.min(this.truncatedTo ?? length, length);
    this.data.size = length;
    this.dirtyRanges = this.dirtyRanges.filter((range) => range.start < length).map((range) => range.end > length ? { start: range.start, end: length } : range);
    this.inode.size = length;
    this.inode.mtimeMs = Date.now();
    this.inode.ctimeMs = Date.now();
    this.metadataDirty = true;
  }
  /**
   * Whether the backend has to be told about a truncation before the dirty data is written.
   */
  get needsPreTruncate() {
    return !this.bypassCache && this.truncatedTo !== void 0 && this.truncatedTo < this.inode.size && !this.fs.attributes.has("no_write");
  }
  /** Write all unsynced data to the backend, then metadata */
  async sync() {
    if (this.needsPreTruncate)
      await this.fs.touch(this.path, { size: this.truncatedTo });
    this.truncatedTo = void 0;
    for (const range of this.dirtyRanges) {
      for (let pos = range.start; pos < range.end; ) {
        const region = this.data.regionAt(pos);
        if (!region)
          break;
        const end = Math.min(range.end, region.offset + region.data.byteLength);
        await this.fs.write(this.path, region.data.subarray(pos - region.offset, end - region.offset), pos);
        pos = end;
      }
    }
    this.dirtyRanges = [];
    if (!this.metadataDirty)
      return;
    if (!this.fs.attributes.has("no_write"))
      await this.fs.touch(this.path, this.inode);
    this.metadataDirty = false;
  }
  syncSync() {
    if (this.needsPreTruncate)
      this.fs.touchSync(this.path, { size: this.truncatedTo });
    this.truncatedTo = void 0;
    for (const range of this.dirtyRanges) {
      for (let pos = range.start; pos < range.end; ) {
        const region = this.data.regionAt(pos);
        if (!region)
          break;
        const end = Math.min(range.end, region.offset + region.data.byteLength);
        this.fs.writeSync(this.path, region.data.subarray(pos - region.offset, end - region.offset), pos);
        pos = end;
      }
    }
    this.dirtyRanges = [];
    if (!this.metadataDirty)
      return;
    if (!this.fs.attributes.has("no_write"))
      this.fs.touchSync(this.path, this.inode);
    this.metadataDirty = false;
  }
};

// node_modules/@zenfs/core/dist/vfs/vcache.js
var __addDisposableResource2 = function(env, value, async) {
  if (value !== null && value !== void 0) {
    if (typeof value !== "object" && typeof value !== "function") throw new TypeError("Object expected.");
    var dispose, inner;
    if (async) {
      if (!Symbol.asyncDispose) throw new TypeError("Symbol.asyncDispose is not defined.");
      dispose = value[Symbol.asyncDispose];
    }
    if (dispose === void 0) {
      if (!Symbol.dispose) throw new TypeError("Symbol.dispose is not defined.");
      dispose = value[Symbol.dispose];
      if (async) inner = dispose;
    }
    if (typeof dispose !== "function") throw new TypeError("Object not disposable.");
    if (inner) dispose = function() {
      try {
        inner.call(this);
      } catch (e) {
        return Promise.reject(e);
      }
    };
    env.stack.push({ value, dispose, async });
  } else if (async) {
    env.stack.push({ async: true });
  }
  return value;
};
var __disposeResources2 = /* @__PURE__ */ (function(SuppressedError2) {
  return function(env) {
    function fail(e) {
      env.error = env.hasError ? new SuppressedError2(e, env.error, "An error was suppressed during disposal.") : e;
      env.hasError = true;
    }
    var r, s = 0;
    function next() {
      while (r = env.stack.pop()) {
        try {
          if (!r.async && s === 1) return s = 0, env.stack.push(r), Promise.resolve().then(next);
          if (r.dispose) {
            var result = r.dispose.call(r.value);
            if (r.async) return s |= 2, Promise.resolve(result).then(next, function(e) {
              fail(e);
              return next();
            });
          } else s |= 1;
        } catch (e) {
          fail(e);
        }
      }
      if (s === 1) return env.hasError ? Promise.reject(env.error) : Promise.resolve();
      if (env.hasError) throw env.error;
    }
    return next();
  };
})(typeof SuppressedError === "function" ? SuppressedError : function(error2, suppressed, message) {
  var e = new Error(message);
  return e.name = "SuppressedError", e.error = error2, e.suppressed = suppressed, e;
});
var VCache = class {
  fs;
  byIno = /* @__PURE__ */ new Map();
  byPath = /* @__PURE__ */ new Map();
  constructor(fs) {
    this.fs = fs;
  }
  /** Get the vnode for a path, if one is cached. Note paths are relative to the FS root, not the VFS root */
  get(path) {
    return this.byPath.get(path);
  }
  /**
   * Get or create the vnode for `path`, incrementing its reference count.
   * Callers must `unref` the vnode when done with it.
   */
  ref(path, inode) {
    let node = this.byIno.get(inode.ino);
    if (!node) {
      node = new VNode(this.fs, path, inode);
      this.byIno.set(inode.ino, node);
    } else {
      node.paths.add(path);
      if (!node.dirty && inode !== node.inode)
        Object.assign(node.inode, inode);
    }
    this.byPath.set(path, node);
    node.refs++;
    return node;
  }
  /** Release a reference to a vnode, evicting it if it is unreferenced and clean */
  unref(node) {
    node.refs--;
    if (node.refs > 0 || node.dirty)
      return;
    this.evict(node);
  }
  evict(node) {
    this.byIno.delete(node.ino);
    for (const path of node.paths)
      this.byPath.delete(path);
  }
  /** Update cached paths for a rename. Handles directories, whose descendants' paths change too */
  rename(oldPath, newPath) {
    for (const [path, node] of this.byPath) {
      if (path != oldPath && !path.startsWith(oldPath + "/"))
        continue;
      const moved = newPath + path.slice(oldPath.length);
      this.byPath.delete(path);
      this.byPath.set(moved, node);
      node.paths.delete(path);
      node.paths.add(moved);
    }
  }
  /** Add a path for a newly created hard link, if the target is cached */
  link(targetPath, linkPath) {
    const node = this.byPath.get(targetPath);
    if (!node)
      return;
    node.paths.add(linkPath);
    this.byPath.set(linkPath, node);
  }
  /** Remove a path for an unlink/rmdir. The vnode is kept if other paths (hard links) refer to it */
  remove(path) {
    const node = this.byPath.get(path);
    if (!node)
      return;
    this.byPath.delete(path);
    node.paths.delete(path);
    if (!node.paths.size && !node.refs)
      this.evict(node);
  }
  /** Sync all dirty vnodes to the backend */
  async sync() {
    for (const node of this.byIno.values()) {
      const env_1 = { stack: [], error: void 0, hasError: false };
      try {
        if (!node.dirty)
          continue;
        const _ = __addDisposableResource2(env_1, await node.lock("rw"), false);
        await node.sync();
        if (!node.refs)
          this.evict(node);
      } catch (e_1) {
        env_1.error = e_1;
        env_1.hasError = true;
      } finally {
        __disposeResources2(env_1);
      }
    }
  }
  /** Sync all dirty vnodes to the backend synchronously */
  syncSync() {
    for (const node of this.byIno.values()) {
      const env_2 = { stack: [], error: void 0, hasError: false };
      try {
        if (!node.dirty)
          continue;
        const _ = __addDisposableResource2(env_2, node.lockSync("rw"), false);
        node.syncSync();
        if (!node.refs)
          this.evict(node);
      } catch (e_2) {
        env_2.error = e_2;
        env_2.hasError = true;
      } finally {
        __disposeResources2(env_2);
      }
    }
  }
};
var caches = /* @__PURE__ */ new Map();
function cacheOf(fs) {
  let cache = caches.get(fs.uuid);
  if (!cache) {
    cache = new VCache(fs);
    caches.set(fs.uuid, cache);
  }
  return cache;
}
async function lockPath(fs, path, mode, inode) {
  const cache = cacheOf(fs);
  inode ??= cache.get(path)?.inode ?? await fs.stat(path);
  const node = cache.ref(path, inode);
  const unlock = await node.lock(mode);
  let released = false;
  const release = () => {
    if (released)
      return;
    released = true;
    unlock();
    cache.unref(node);
  };
  release[Symbol.dispose] = release;
  return release;
}
function lockPathSync(fs, path, mode, inode) {
  const cache = cacheOf(fs);
  inode ??= cache.get(path)?.inode ?? fs.statSync(path);
  const node = cache.ref(path, inode);
  let unlock;
  try {
    unlock = node.lockSync(mode);
  } catch (e) {
    cache.unref(node);
    throw e;
  }
  let released = false;
  const release = () => {
    if (released)
      return;
    released = true;
    unlock();
    cache.unref(node);
  };
  release[Symbol.dispose] = release;
  return release;
}

// node_modules/@zenfs/core/dist/vfs/file.js
var __runInitializers4 = function(thisArg, initializers, value) {
  var useValue = arguments.length > 2;
  for (var i = 0; i < initializers.length; i++) {
    value = useValue ? initializers[i].call(thisArg, value) : initializers[i].call(thisArg);
  }
  return useValue ? value : void 0;
};
var __esDecorate4 = function(ctor, descriptorIn, decorators, contextIn, initializers, extraInitializers) {
  function accept(f) {
    if (f !== void 0 && typeof f !== "function") throw new TypeError("Function expected");
    return f;
  }
  var kind = contextIn.kind, key = kind === "getter" ? "get" : kind === "setter" ? "set" : "value";
  var target = !descriptorIn && ctor ? contextIn["static"] ? ctor : ctor.prototype : null;
  var descriptor = descriptorIn || (target ? Object.getOwnPropertyDescriptor(target, contextIn.name) : {});
  var _, done = false;
  for (var i = decorators.length - 1; i >= 0; i--) {
    var context = {};
    for (var p in contextIn) context[p] = p === "access" ? {} : contextIn[p];
    for (var p in contextIn.access) context.access[p] = contextIn.access[p];
    context.addInitializer = function(f) {
      if (done) throw new TypeError("Cannot add initializers after decoration has completed");
      extraInitializers.push(accept(f || null));
    };
    var result = (0, decorators[i])(kind === "accessor" ? { get: descriptor.get, set: descriptor.set } : descriptor[key], context);
    if (kind === "accessor") {
      if (result === void 0) continue;
      if (result === null || typeof result !== "object") throw new TypeError("Object expected");
      if (_ = accept(result.get)) descriptor.get = _;
      if (_ = accept(result.set)) descriptor.set = _;
      if (_ = accept(result.init)) initializers.unshift(_);
    } else if (_ = accept(result)) {
      if (kind === "field") initializers.unshift(_);
      else descriptor[key] = _;
    }
  }
  if (target) Object.defineProperty(target, contextIn.name, descriptor);
  done = true;
};
var __addDisposableResource3 = function(env, value, async) {
  if (value !== null && value !== void 0) {
    if (typeof value !== "object" && typeof value !== "function") throw new TypeError("Object expected.");
    var dispose, inner;
    if (async) {
      if (!Symbol.asyncDispose) throw new TypeError("Symbol.asyncDispose is not defined.");
      dispose = value[Symbol.asyncDispose];
    }
    if (dispose === void 0) {
      if (!Symbol.dispose) throw new TypeError("Symbol.dispose is not defined.");
      dispose = value[Symbol.dispose];
      if (async) inner = dispose;
    }
    if (typeof dispose !== "function") throw new TypeError("Object not disposable.");
    if (inner) dispose = function() {
      try {
        inner.call(this);
      } catch (e) {
        return Promise.reject(e);
      }
    };
    env.stack.push({ value, dispose, async });
  } else if (async) {
    env.stack.push({ async: true });
  }
  return value;
};
var __disposeResources3 = /* @__PURE__ */ (function(SuppressedError2) {
  return function(env) {
    function fail(e) {
      env.error = env.hasError ? new SuppressedError2(e, env.error, "An error was suppressed during disposal.") : e;
      env.hasError = true;
    }
    var r, s = 0;
    function next() {
      while (r = env.stack.pop()) {
        try {
          if (!r.async && s === 1) return s = 0, env.stack.push(r), Promise.resolve().then(next);
          if (r.dispose) {
            var result = r.dispose.call(r.value);
            if (r.async) return s |= 2, Promise.resolve(result).then(next, function(e) {
              fail(e);
              return next();
            });
          } else s |= 1;
        } catch (e) {
          fail(e);
        }
      }
      if (s === 1) return env.hasError ? Promise.reject(env.error) : Promise.resolve();
      if (env.hasError) throw env.error;
    }
    return next();
  };
})(typeof SuppressedError === "function" ? SuppressedError : function(error2, suppressed, message) {
  var e = new Error(message);
  return e.name = "SuppressedError", e.error = error2, e.suppressed = suppressed, e;
});
var streamChunkSize = 4096;
var Handle = (() => {
  let _instanceExtraInitializers = [];
  let _get_inode_decorators;
  let _get_fs_decorators;
  return class Handle {
    static {
      const _metadata = typeof Symbol === "function" && Symbol.metadata ? /* @__PURE__ */ Object.create(null) : void 0;
      __esDecorate4(this, null, _get_inode_decorators, { kind: "getter", name: "inode", static: false, private: false, access: { has: (obj) => "inode" in obj, get: (obj) => obj.inode }, metadata: _metadata }, null, _instanceExtraInitializers);
      __esDecorate4(this, null, _get_fs_decorators, { kind: "getter", name: "fs", static: false, private: false, access: { has: (obj) => "fs" in obj, get: (obj) => obj.fs }, metadata: _metadata }, null, _instanceExtraInitializers);
      if (_metadata) Object.defineProperty(this, Symbol.metadata, { enumerable: true, configurable: true, writable: true, value: _metadata });
    }
    context = __runInitializers4(this, _instanceExtraInitializers);
    path;
    internalPath;
    flag;
    vnode;
    /**
     * Current position
     */
    _position = 0;
    /**
     * Get the current file position.
     *
     * We emulate the following bug mentioned in the Node documentation:
     *
     * On Linux, positional writes don't work when the file is opened in append mode.
     * The kernel ignores the position argument and always appends the data to the end of the file.
     * @returns The current file position.
     */
    get position() {
      return this.flag & O_APPEND ? this.inode.size : this._position;
    }
    set position(value) {
      this._position = value;
    }
    /**
     * The inode for the file. This is shared between all handles for the file via the vnode.
     */
    get inode() {
      return this.vnode.inode;
    }
    get fs() {
      return this.vnode.fs;
    }
    /**
     * Whether the file has changes which have not been written to the FS
     */
    get dirty() {
      return this.vnode.dirty;
    }
    /**
     * Whether the file is open or closed
     */
    closed = false;
    get isClosed() {
      return this.closed;
    }
    /**
     * Creates a file handle for the vnode.
     */
    constructor(context, path, internalPath, flag, vnode) {
      this.context = context;
      this.path = path;
      this.internalPath = internalPath;
      this.flag = flag;
      this.vnode = vnode;
    }
    get _isSync() {
      return !!(this.flag & O_SYNC || this.inode.flags & InodeFlags.Sync || this.fs.attributes.has("sync"));
    }
    [(_get_inode_decorators = [memoize], _get_fs_decorators = [memoize], Symbol.dispose)]() {
      this.closeSync();
    }
    syncSync() {
      const env_1 = { stack: [], error: void 0, hasError: false };
      try {
        if (this.closed)
          throw UV("EBADF", "sync", this.path);
        if (!this.dirty)
          return;
        const _ = __addDisposableResource3(env_1, this.vnode.lockSync("rw"), false);
        this.vnode.syncSync();
      } catch (e_1) {
        env_1.error = e_1;
        env_1.hasError = true;
      } finally {
        __disposeResources3(env_1);
      }
    }
    /**
     * Default implementation maps to `syncSync`.
     */
    datasyncSync() {
      return this.syncSync();
    }
    closeSync() {
      if (this.closed)
        throw UV("EBADF", "close", this.path);
      this.syncSync();
      this.disposeSync(true);
    }
    /**
     * Cleans up. This will *not* sync the file data to the FS
     */
    disposeSync(force) {
      if (this.closed)
        throw UV("EBADF", "close", this.path);
      if (this.dirty && !force)
        throw UV("EBUSY", "close", this.path);
      this.closed = true;
      cacheOf(this.fs).unref(this.vnode);
    }
    truncateSync(length) {
      const env_2 = { stack: [], error: void 0, hasError: false };
      try {
        if (length < 0)
          throw UV("EINVAL", "truncate", this.path);
        if (this.closed)
          throw UV("EBADF", "truncate", this.path);
        if (!(this.flag & O_WRONLY || this.flag & O_RDWR))
          throw UV("EBADF", "truncate", this.path);
        if (this.fs.attributes.has("readonly"))
          throw UV("EROFS", "truncate", this.path);
        if (this.inode.flags & InodeFlags.Immutable)
          throw UV("EPERM", "truncate", this.path);
        const _ = __addDisposableResource3(env_2, this.vnode.lockSync("rw"), false);
        this.vnode.truncate(length);
        if (this._isSync)
          this.vnode.syncSync();
      } catch (e_2) {
        env_2.error = e_2;
        env_2.hasError = true;
      } finally {
        __disposeResources3(env_2);
      }
    }
    /**
     * Write buffer to the file.
     * @param buffer Uint8Array containing the data to write to the file.
     * @param offset Offset in the buffer to start reading data from.
     * @param length The amount of bytes to write to the file.
     * @param position Offset from the beginning of the file where this data should be written.
     * If position is null, the data will be written at  the current position.
     * @returns bytes written
     */
    writeSync(buffer, offset = 0, length = buffer.byteLength - offset, position = this.position) {
      const env_3 = { stack: [], error: void 0, hasError: false };
      try {
        if (this.closed)
          throw UV("EBADF", "write", this.path);
        if (!(this.flag & O_WRONLY || this.flag & O_RDWR))
          throw UV("EBADF", "write", this.path);
        if (this.fs.attributes.has("readonly"))
          throw UV("EROFS", "write", this.path);
        if (this.inode.flags & InodeFlags.Immutable)
          throw UV("EPERM", "write", this.path);
        const _ = __addDisposableResource3(env_3, this.vnode.lockSync("rw"), false);
        const slice = buffer.subarray(offset, offset + length);
        this.vnode.writeSync(slice, position);
        this._position = position + slice.byteLength;
        if (this._isSync)
          this.vnode.syncSync();
        return slice.byteLength;
      } catch (e_3) {
        env_3.error = e_3;
        env_3.hasError = true;
      } finally {
        __disposeResources3(env_3);
      }
    }
    /**
     * Read data from the file.
     * @param buffer The buffer that the data will be written to.
     * @param offset The offset within the buffer where writing will start.
     * @param length An integer specifying the number of bytes to read.
     * @param position An integer specifying where to begin reading from in the file.
     * If position is null, data will be read from the current file position.
     * @returns number of bytes written
     */
    readSync(buffer, offset = 0, length = buffer.byteLength - offset, position = this.position) {
      const env_4 = { stack: [], error: void 0, hasError: false };
      try {
        if (this.closed)
          throw UV("EBADF", "read", this.path);
        if (this.flag & O_WRONLY)
          throw UV("EBADF", "read", this.path);
        const _ = __addDisposableResource3(env_4, this.vnode.lockSync("ro"), false);
        if (!(this.inode.flags & InodeFlags.NoAtime) && !this.fs.attributes.has("no_atime")) {
          this.vnode.metadataDirty = true;
          this.inode.atimeMs = Date.now();
        }
        let end = position + length;
        if (!isCharacterDevice(this.inode) && !isBlockDevice(this.inode) && end > this.inode.size) {
          end = position + Math.max(this.inode.size - position, 0);
        }
        this._position = end;
        const uint82 = new Uint8Array(buffer.buffer, buffer.byteOffset, buffer.byteLength);
        this.vnode.readSync(uint82.subarray(offset, offset + length), position, end);
        if (this._isSync)
          this.vnode.syncSync();
        return end - position;
      } catch (e_4) {
        env_4.error = e_4;
        env_4.hasError = true;
      } finally {
        __disposeResources3(env_4);
      }
    }
    chmodSync(mode) {
      const env_5 = { stack: [], error: void 0, hasError: false };
      try {
        if (this.closed)
          throw UV("EBADF", "chmod", this.path);
        const _ = __addDisposableResource3(env_5, this.vnode.lockSync("rw"), false);
        this.vnode.metadataDirty = true;
        this.inode.mode = this.inode.mode & (mode > S_IFMT ? ~S_IFMT : S_IFMT) | mode;
        if (this._isSync || mode > S_IFMT)
          this.vnode.syncSync();
      } catch (e_5) {
        env_5.error = e_5;
        env_5.hasError = true;
      } finally {
        __disposeResources3(env_5);
      }
    }
    chownSync(uid, gid) {
      const env_6 = { stack: [], error: void 0, hasError: false };
      try {
        if (this.closed)
          throw UV("EBADF", "chmod", this.path);
        const _ = __addDisposableResource3(env_6, this.vnode.lockSync("rw"), false);
        this.vnode.metadataDirty = true;
        _chown(this.inode, uid, gid);
        if (this._isSync)
          this.vnode.syncSync();
      } catch (e_6) {
        env_6.error = e_6;
        env_6.hasError = true;
      } finally {
        __disposeResources3(env_6);
      }
    }
    /**
     * Change the file timestamps of the file.
     */
    utimesSync(atime, mtime) {
      const env_7 = { stack: [], error: void 0, hasError: false };
      try {
        if (this.closed)
          throw UV("EBADF", "utimes", this.path);
        const _ = __addDisposableResource3(env_7, this.vnode.lockSync("rw"), false);
        this.vnode.metadataDirty = true;
        this.inode.atimeMs = atime;
        this.inode.mtimeMs = mtime;
        if (this._isSync)
          this.vnode.syncSync();
      } catch (e_7) {
        env_7.error = e_7;
        env_7.hasError = true;
      } finally {
        __disposeResources3(env_7);
      }
    }
    async [Symbol.asyncDispose]() {
      await this.close();
    }
    async sync() {
      const env_8 = { stack: [], error: void 0, hasError: false };
      try {
        if (this.closed)
          throw UV("EBADF", "sync", this.path);
        if (!this.dirty)
          return;
        const _ = __addDisposableResource3(env_8, await this.vnode.lock("rw"), false);
        await this.vnode.sync();
      } catch (e_8) {
        env_8.error = e_8;
        env_8.hasError = true;
      } finally {
        __disposeResources3(env_8);
      }
    }
    /**
     * Default implementation maps to `sync`.
     */
    datasync() {
      return this.sync();
    }
    async close() {
      if (this.closed)
        throw UV("EBADF", "close", this.path);
      await this.sync();
      this.dispose(true);
    }
    /**
     * Cleans up. This will *not* sync the file data to the FS
     */
    dispose(force) {
      if (this.closed)
        throw UV("EBADF", "close", this.path);
      if (this.dirty && !force)
        throw UV("EBUSY", "close", this.path);
      this.closed = true;
      cacheOf(this.fs).unref(this.vnode);
    }
    stat() {
      if (this.closed)
        throw UV("EBADF", "stat", this.path);
      return this.inode;
    }
    async truncate(length) {
      const env_9 = { stack: [], error: void 0, hasError: false };
      try {
        if (length < 0)
          throw UV("EINVAL", "truncate", this.path);
        if (this.closed)
          throw UV("EBADF", "truncate", this.path);
        if (!(this.flag & O_WRONLY || this.flag & O_RDWR))
          throw UV("EBADF", "truncate", this.path);
        if (this.fs.attributes.has("readonly"))
          throw UV("EROFS", "truncate", this.path);
        if (this.inode.flags & InodeFlags.Immutable)
          throw UV("EPERM", "truncate", this.path);
        const _ = __addDisposableResource3(env_9, await this.vnode.lock("rw"), false);
        this.vnode.truncate(length);
        if (this._isSync)
          await this.vnode.sync();
      } catch (e_9) {
        env_9.error = e_9;
        env_9.hasError = true;
      } finally {
        __disposeResources3(env_9);
      }
    }
    /**
     * Write buffer to the file.
     * @param buffer Uint8Array containing the data to write to the file.
     * @param offset Offset in the buffer to start reading data from.
     * @param length The amount of bytes to write to the file.
     * @param position Offset from the beginning of the file where this data should be written.
     * If position is null, the data will be written at  the current position.
     * @returns bytes written
     */
    async write(buffer, offset = 0, length = buffer.byteLength - offset, position = this.position) {
      const env_10 = { stack: [], error: void 0, hasError: false };
      try {
        if (this.closed)
          throw UV("EBADF", "write", this.path);
        if (!(this.flag & O_WRONLY || this.flag & O_RDWR))
          throw UV("EBADF", "write", this.path);
        if (this.fs.attributes.has("readonly"))
          throw UV("EROFS", "write", this.path);
        if (this.inode.flags & InodeFlags.Immutable)
          throw UV("EPERM", "write", this.path);
        const _ = __addDisposableResource3(env_10, await this.vnode.lock("rw"), false);
        const slice = buffer.subarray(offset, offset + length);
        await this.vnode.write(slice, position);
        this._position = position + slice.byteLength;
        if (this._isSync)
          await this.vnode.sync();
        return slice.byteLength;
      } catch (e_10) {
        env_10.error = e_10;
        env_10.hasError = true;
      } finally {
        __disposeResources3(env_10);
      }
    }
    /**
     * Read data from the file.
     * @param buffer The buffer that the data will be written to.
     * @param offset The offset within the buffer where writing will start.
     * @param length An integer specifying the number of bytes to read.
     * @param position An integer specifying where to begin reading from in the file.
     * If position is null, data will be read from the current file position.
     * @returns number of bytes written
     */
    async read(buffer, offset = 0, length = buffer.byteLength - offset, position = this.position) {
      const env_11 = { stack: [], error: void 0, hasError: false };
      try {
        if (this.closed)
          throw UV("EBADF", "read", this.path);
        if (this.flag & O_WRONLY)
          throw UV("EBADF", "read", this.path);
        const _ = __addDisposableResource3(env_11, await this.vnode.lock("ro"), false);
        if (!(this.inode.flags & InodeFlags.NoAtime) && !this.fs.attributes.has("no_atime")) {
          this.vnode.metadataDirty = true;
          this.inode.atimeMs = Date.now();
        }
        let end = position + length;
        if (!isCharacterDevice(this.inode) && !isBlockDevice(this.inode) && end > this.inode.size) {
          end = position + Math.max(this.inode.size - position, 0);
        }
        this._position = end;
        const uint82 = new Uint8Array(buffer.buffer, buffer.byteOffset, buffer.byteLength);
        await this.vnode.read(uint82.subarray(offset, offset + length), position, end);
        if (this._isSync)
          await this.vnode.sync();
        return end - position;
      } catch (e_11) {
        env_11.error = e_11;
        env_11.hasError = true;
      } finally {
        __disposeResources3(env_11);
      }
    }
    async chmod(mode) {
      const env_12 = { stack: [], error: void 0, hasError: false };
      try {
        if (this.closed)
          throw UV("EBADF", "chmod", this.path);
        const _ = __addDisposableResource3(env_12, await this.vnode.lock("rw"), false);
        this.vnode.metadataDirty = true;
        this.inode.mode = this.inode.mode & (mode > S_IFMT ? ~S_IFMT : S_IFMT) | mode;
        if (this._isSync || mode > S_IFMT)
          await this.vnode.sync();
      } catch (e_12) {
        env_12.error = e_12;
        env_12.hasError = true;
      } finally {
        __disposeResources3(env_12);
      }
    }
    async chown(uid, gid) {
      const env_13 = { stack: [], error: void 0, hasError: false };
      try {
        if (this.closed)
          throw UV("EBADF", "chown", this.path);
        const _ = __addDisposableResource3(env_13, await this.vnode.lock("rw"), false);
        this.vnode.metadataDirty = true;
        _chown(this.inode, uid, gid);
        if (this._isSync)
          await this.vnode.sync();
      } catch (e_13) {
        env_13.error = e_13;
        env_13.hasError = true;
      } finally {
        __disposeResources3(env_13);
      }
    }
    /**
     * Change the file timestamps of the file.
     */
    async utimes(atime, mtime) {
      const env_14 = { stack: [], error: void 0, hasError: false };
      try {
        if (this.closed)
          throw UV("EBADF", "utimes", this.path);
        const _ = __addDisposableResource3(env_14, await this.vnode.lock("rw"), false);
        this.vnode.metadataDirty = true;
        this.inode.atimeMs = atime;
        this.inode.mtimeMs = mtime;
        if (this._isSync)
          await this.vnode.sync();
      } catch (e_14) {
        env_14.error = e_14;
        env_14.hasError = true;
      } finally {
        __disposeResources3(env_14);
      }
    }
    /**
     * Create a stream for reading the file.
     * @todo Don't repeat ourselves with the implementation in `FileSystem`
     */
    streamRead(options) {
      if (this.closed)
        throw UV("EBADF", "streamRead", this.path);
      const { vnode } = this;
      return new ReadableStream({
        async start(controller) {
          const env_15 = { stack: [], error: void 0, hasError: false };
          try {
            const _ = __addDisposableResource3(env_15, await vnode.lock("ro"), false);
            const { start = 0, end = vnode.inode.size } = options;
            for (let offset = start; offset < end; offset += streamChunkSize) {
              const bytesRead = offset + streamChunkSize > end ? end - offset : streamChunkSize;
              const buffer = new Uint8Array(bytesRead);
              await vnode.read(buffer, offset, offset + bytesRead).catch(controller.error.bind(controller));
              controller.enqueue(buffer);
            }
            controller.close();
          } catch (e_15) {
            env_15.error = e_15;
            env_15.hasError = true;
          } finally {
            __disposeResources3(env_15);
          }
        },
        type: "bytes"
      });
    }
    /**
     * Create a stream for writing the file.
     * Chunks are written to the vnode's cache, then synced when the stream is closed.
     * @todo Don't repeat ourselves with the implementation in `FileSystem`
     */
    streamWrite(options) {
      if (this.closed)
        throw UV("EBADF", "write", this.path);
      if (this.inode.flags & InodeFlags.Immutable)
        throw UV("EPERM", "write", this.path);
      if (this.fs.attributes.has("readonly"))
        throw UV("EROFS", "write", this.path);
      const { vnode } = this;
      let position = options.start ?? 0;
      return new WritableStream({
        async write(chunk, controller) {
          const env_16 = { stack: [], error: void 0, hasError: false };
          try {
            const _ = __addDisposableResource3(env_16, await vnode.lock("rw"), false);
            await vnode.write(chunk, position).catch(controller.error.bind(controller));
            position += chunk.byteLength;
          } catch (e_16) {
            env_16.error = e_16;
            env_16.hasError = true;
          } finally {
            __disposeResources3(env_16);
          }
        },
        async close() {
          const env_17 = { stack: [], error: void 0, hasError: false };
          try {
            const _ = __addDisposableResource3(env_17, await vnode.lock("rw"), false);
            await vnode.sync();
          } catch (e_17) {
            env_17.error = e_17;
            env_17.hasError = true;
          } finally {
            __disposeResources3(env_17);
          }
        }
      });
    }
  };
})();
function toFD(file) {
  const map = contextOf(file.context).descriptors;
  const fd = Math.max(map.size ? Math.max(...map.keys()) + 1 : 0, 4);
  map.set(fd, file);
  return fd;
}
function fromFD($, fd) {
  validateFD(fd);
  const map = contextOf($).descriptors;
  const value = map.get(fd);
  if (!value)
    throw withErrno("EBADF");
  return value;
}
function deleteFD($, fd) {
  return contextOf($).descriptors.delete(fd);
}

// node_modules/@zenfs/core/dist/vfs/flags.js
var pattern = /[rwasx]{1,2}\+?/;
function parse2(flag) {
  if (typeof flag == "number")
    return flag;
  if (!pattern.test(flag)) {
    throw withErrno("EINVAL", "Invalid flag string: " + flag);
  }
  return toNumber(flag);
}
function toNumber(flag) {
  if (!flag.includes("r") && !flag.includes("w") && !flag.includes("a")) {
    throw withErrno("EINVAL", "Invalid flag string: " + flag);
  }
  let n = flag.includes("r") ? O_RDONLY : O_CREAT;
  if (flag.includes("w"))
    n |= O_TRUNC;
  if (flag.includes("a"))
    n |= O_APPEND;
  if (flag.includes("+"))
    n |= O_RDWR;
  else if (!flag.includes("r"))
    n |= O_WRONLY;
  if (flag.includes("s"))
    n |= O_SYNC;
  if (flag.includes("x"))
    n |= O_EXCL;
  return n;
}
function toMode(flag) {
  let mode = 0;
  if (!(flag & O_WRONLY))
    mode |= R_OK;
  if (flag & O_WRONLY || flag & O_RDWR)
    mode |= W_OK;
  return mode;
}

// node_modules/@zenfs/core/dist/internal/error.js
function wrap(fs, prop, path, dest) {
  const extra = typeof path === "string" ? { path, dest, syscall: prop.endsWith("Sync") ? prop.slice(0, -4) : prop } : path;
  const fn = fs[prop];
  if (typeof fn !== "function")
    throw new TypeError(`${prop} is not a function`);
  return function(...args) {
    try {
      return fn.call(fs, ...args);
    } catch (e) {
      throw setUVMessage(Object.assign(e, extra));
    }
  };
}
function withExceptionContext(fs, context) {
  return new Proxy(fs, {
    get(target, prop) {
      const value = Reflect.get(target, prop);
      if (typeof value != "function")
        return value;
      return function __withContext(...args) {
        try {
          const result = value.apply(target, args);
          if (!(result instanceof Promise))
            return result;
          return result.catch((e) => {
            if ("code" in e)
              throw setUVMessage(Object.assign(e, context));
            if (e in Errno) {
              const ex = UV(e, context);
              Error.captureStackTrace(ex, __withContext);
            }
            throw e;
          });
        } catch (e) {
          throw setUVMessage(Object.assign(e, context));
        }
      };
    }
  });
}

// node_modules/@zenfs/core/dist/vfs/shared.js
var mounts = /* @__PURE__ */ new Map();
mount("/", InMemory.create({ label: "root" }));
function mount(mountPoint, fs) {
  if (mountPoint[0] != "/")
    mountPoint = "/" + mountPoint;
  mountPoint = resolve.call(this, mountPoint);
  if (mounts.has(mountPoint))
    throw err(withErrno("EINVAL", "Mount point is already in use: " + mountPoint));
  fs._mountPoint = mountPoint;
  mounts.set(mountPoint, fs);
  if (!caches.has(fs.uuid))
    caches.set(fs.uuid, new VCache(fs));
  info(`Mounted ${fs.name} on ${mountPoint}`);
  debug(`${fs.name} attributes: ${[...fs.attributes].map(([k, v]) => v !== void 0 && v !== null ? k + "=" + v : k).join(", ")}`);
}
function umount(mountPoint) {
  if (mountPoint[0] != "/")
    mountPoint = "/" + mountPoint;
  mountPoint = resolve.call(this, mountPoint);
  const fs = mounts.get(mountPoint);
  if (!fs) {
    warn(mountPoint + " is already unmounted");
    return;
  }
  const _done = () => {
    caches.delete(fs.uuid);
    info("Synced all changes to " + mountPoint);
  };
  try {
    caches.get(fs.uuid)?.syncSync();
    _done();
  } catch {
    warn(`Could not flush to ${mountPoint} synchronously.`);
    void caches.get(fs.uuid)?.sync().then(_done);
  }
  mounts.delete(mountPoint);
  notice("Unmounted " + mountPoint);
}
function resolveMount(path, ctx, extra) {
  const { root } = contextOf(ctx);
  const _exceptionContext = { path, ...extra };
  path = normalizePath(join(root, path), true);
  path = resolve.call(ctx, path);
  const sortedMounts = [...mounts].sort((a, b) => a[0].length > b[0].length ? -1 : 1);
  for (const [mountPoint, fs] of sortedMounts) {
    if (!_isParentOf(mountPoint, path))
      continue;
    path = path.slice(mountPoint.length > 1 ? mountPoint.length : 0);
    if (path === "")
      path = "/";
    const case_fold = fs.attributes.get("case_fold");
    if (case_fold === "lower")
      path = path.toLowerCase();
    if (case_fold === "upper")
      path = path.toUpperCase();
    return { fs: withExceptionContext(fs, _exceptionContext), path, mountPoint, root };
  }
  throw alert(new Exception(Errno.EIO, "No file system for " + path));
}
function _statfs(fs, bigint) {
  const md = fs.usage();
  const bs = md.blockSize || 4096;
  const type = bigint ? BigInt : Number;
  return {
    type: type(fs.type),
    bsize: type(bs),
    frsize: type(bs),
    ffree: type(md.freeNodes || size_max),
    files: type(md.totalNodes || size_max),
    bavail: type(md.freeSpace / bs),
    bfree: type(md.freeSpace / bs),
    blocks: type(md.totalSpace / bs)
  };
}
function chroot(path) {
  const $ = contextOf(this);
  if (!credentialsAllowRoot($.credentials))
    throw withErrno("EPERM", "Can not chroot() as non-root user");
  $.root ??= "/";
  const newRoot = join($.root, path);
  for (const handle of $.descriptors?.values() ?? []) {
    if (!handle.path.startsWith($.root))
      throw UV("EBUSY", "chroot", handle.path);
    handle.path = handle.path.slice($.root.length);
  }
  if (newRoot.length > $.root.length)
    throw withErrno("EPERM", "Can not chroot() outside of current root");
  $.root = newRoot;
}
function _isParentOf(parent, child) {
  if (parent === "/" || parent === child)
    return true;
  if (!parent.endsWith("/"))
    parent += "/";
  return child.startsWith(parent);
}

// node_modules/@zenfs/core/dist/node/sync.js
var import_buffer5 = __toESM(require_buffer(), 1);

// node_modules/@zenfs/core/dist/vfs/sync.js
var __addDisposableResource4 = function(env, value, async) {
  if (value !== null && value !== void 0) {
    if (typeof value !== "object" && typeof value !== "function") throw new TypeError("Object expected.");
    var dispose, inner;
    if (async) {
      if (!Symbol.asyncDispose) throw new TypeError("Symbol.asyncDispose is not defined.");
      dispose = value[Symbol.asyncDispose];
    }
    if (dispose === void 0) {
      if (!Symbol.dispose) throw new TypeError("Symbol.dispose is not defined.");
      dispose = value[Symbol.dispose];
      if (async) inner = dispose;
    }
    if (typeof dispose !== "function") throw new TypeError("Object not disposable.");
    if (inner) dispose = function() {
      try {
        inner.call(this);
      } catch (e) {
        return Promise.reject(e);
      }
    };
    env.stack.push({ value, dispose, async });
  } else if (async) {
    env.stack.push({ async: true });
  }
  return value;
};
var __disposeResources4 = /* @__PURE__ */ (function(SuppressedError2) {
  return function(env) {
    function fail(e) {
      env.error = env.hasError ? new SuppressedError2(e, env.error, "An error was suppressed during disposal.") : e;
      env.hasError = true;
    }
    var r, s = 0;
    function next() {
      while (r = env.stack.pop()) {
        try {
          if (!r.async && s === 1) return s = 0, env.stack.push(r), Promise.resolve().then(next);
          if (r.dispose) {
            var result = r.dispose.call(r.value);
            if (r.async) return s |= 2, Promise.resolve(result).then(next, function(e) {
              fail(e);
              return next();
            });
          } else s |= 1;
        } catch (e) {
          fail(e);
        }
      }
      if (s === 1) return env.hasError ? Promise.reject(env.error) : Promise.resolve();
      if (env.hasError) throw env.error;
    }
    return next();
  };
})(typeof SuppressedError === "function" ? SuppressedError : function(error2, suppressed, message) {
  var e = new Error(message);
  return e.name = "SuppressedError", e.error = error2, e.suppressed = suppressed, e;
});
function resolve2($, path, preserveSymlinks, extra) {
  path = resolve.call($, path);
  try {
    const resolved2 = resolveMount(path, $);
    const stats2 = cacheOf(resolved2.fs).get(resolved2.path)?.inode ?? resolved2.fs.statSync(resolved2.path);
    if (!isSymbolicLink(stats2) || preserveSymlinks) {
      return { ...resolved2, fullPath: path, stats: stats2 };
    }
    const target2 = resolve.call($, dirname(path), readlink.call($, path));
    return resolve2($, target2, preserveSymlinks, extra);
  } catch (e) {
    setUVMessage(Object.assign(e, { syscall: "stat", path, ...extra }));
    if (preserveSymlinks)
      throw e;
  }
  const { base, dir } = parse(path);
  const realDir = dir == "/" ? "/" : resolve2($, dir, false, extra).fullPath;
  const maybePath = join(realDir, base);
  const resolved = resolveMount(maybePath, $);
  let stats;
  try {
    stats = cacheOf(resolved.fs).get(resolved.path)?.inode ?? resolved.fs.statSync(resolved.path);
  } catch (e) {
    if (e.code === "ENOENT")
      return { ...resolved, fullPath: maybePath };
    throw setUVMessage(Object.assign(e, { syscall: "stat", path: maybePath, ...extra }));
  }
  if (!isSymbolicLink(stats)) {
    return { ...resolved, fullPath: maybePath, stats };
  }
  const target = resolve.call($, realDir, readlink.call($, maybePath));
  return resolve2($, target, false, extra);
}
function open(path, opt) {
  path = normalizePath(path);
  const mode = normalizeMode(opt.mode, 420), flag = parse2(opt.flag);
  path = opt.preserveSymlinks ? path : resolve2(this, path).fullPath;
  const { fs, path: resolved } = resolveMount(path, this);
  let stats;
  try {
    stats = fs.statSync(resolved);
  } catch {
  }
  if (!stats) {
    const env_1 = { stack: [], error: void 0, hasError: false };
    try {
      if (!(flag & O_CREAT)) {
        throw UV("ENOENT", "open", path);
      }
      const parentPath = dirname(resolved);
      const parentStats = fs.statSync(parentPath);
      if (checkAccess && !hasAccess(this, parentStats, W_OK)) {
        throw UV("EACCES", "open", path);
      }
      if (!isDirectory(parentStats)) {
        throw UV("ENOTDIR", "open", path);
      }
      if (!opt.allowDirectory && mode & S_IFDIR)
        throw UV("EISDIR", "open", path);
      const _ = __addDisposableResource4(env_1, lockPathSync(fs, parentPath, "rw", parentStats), false);
      const { euid: uid, egid: gid } = contextOf(this).credentials;
      const inode = fs.createFileSync(resolved, {
        mode,
        uid: parentStats.mode & S_ISUID ? parentStats.uid : uid,
        gid: parentStats.mode & S_ISGID ? parentStats.gid : gid
      });
      emitChange(this, "rename", path);
      return new Handle(this, path, resolved, flag, cacheOf(fs).ref(resolved, inode));
    } catch (e_1) {
      env_1.error = e_1;
      env_1.hasError = true;
    } finally {
      __disposeResources4(env_1);
    }
  }
  if (checkAccess && (!hasAccess(this, stats, mode) || !hasAccess(this, stats, toMode(flag)))) {
    throw UV("EACCES", "open", path);
  }
  if (flag & O_EXCL)
    throw UV("EEXIST", "open", path);
  if (!opt.allowDirectory && stats.mode & S_IFDIR)
    throw UV("EISDIR", "open", path);
  const file = new Handle(this, path, resolved, flag, cacheOf(fs).ref(resolved, stats));
  if (flag & O_TRUNC)
    file.truncateSync(0);
  return file;
}
function readlink(path) {
  path = normalizePath(path);
  const { fs, stats, path: resolved } = resolve2(this, path, true, { syscall: "readlink" });
  if (!stats)
    throw UV("ENOENT", "readlink", path);
  if (checkAccess && !hasAccess(this, stats, R_OK))
    throw UV("EACCES", "readlink", path);
  if (!isSymbolicLink(stats))
    throw UV("EINVAL", "readlink", path);
  const size = stats.size;
  const data = new Uint8Array(size);
  fs.readSync(resolved, data, 0, size);
  return decodeUTF8(data);
}
function mkdir(path, options = {}) {
  const original = normalizePath(path);
  const $ex = { syscall: "mkdir", path: original };
  const { fullPath: realParent } = resolve2(this, dirname(original), false, $ex);
  const { fs, path: target } = resolveMount(join(realParent, basename(original)), this, $ex);
  const followed = realParent != dirname(original);
  const { euid: uid, egid: gid } = contextOf(this).credentials;
  const { mode = 511, recursive } = options;
  let firstCreated;
  const __create2 = (path2, resolved) => {
    const env_2 = { stack: [], error: void 0, hasError: false };
    try {
      const parentPath = dirname(resolved);
      const parent = recursive && parentPath != "/" ? __create2(dirname(path2), parentPath) : fs.statSync(parentPath);
      if (recursive) {
        let existing;
        try {
          existing = cacheOf(fs).get(resolved)?.inode ?? fs.statSync(resolved);
        } catch {
        }
        if (existing) {
          const stats = isSymbolicLink(existing) ? resolve2(this, path2, false, $ex).stats : existing;
          if (!stats)
            throw UV("ENOENT", $ex);
          if (!isDirectory(stats))
            throw UV(resolved == target ? "EEXIST" : "ENOTDIR", $ex);
          return existing;
        }
        if (followed && fs.existsSync(join(parentPath, basename(path2))))
          throw UV("ENOENT", $ex);
      }
      if (checkAccess && !hasAccess(this, parent, W_OK))
        throw UV("EACCES", "mkdir", path2);
      const _ = __addDisposableResource4(env_2, lockPathSync(fs, parentPath, "rw", parent), false);
      const inode = wrap(fs, "mkdirSync", { path: path2, syscall: "mkdir" })(resolved, {
        mode,
        uid: parent.mode & S_ISUID ? parent.uid : uid,
        gid: parent.mode & S_ISGID ? parent.gid : gid
      });
      if (recursive)
        firstCreated ??= path2;
      emitChange(this, "rename", path2);
      return inode;
    } catch (e_2) {
      env_2.error = e_2;
      env_2.hasError = true;
    } finally {
      __disposeResources4(env_2);
    }
  };
  __create2(original, target);
  return firstCreated;
}
function readdir(path, options = {}) {
  path = normalizePath(path);
  const { fs, path: resolved } = resolve2(this, path);
  const stats = cacheOf(fs).get(resolved)?.inode ?? wrap(fs, "statSync", { path, syscall: "scandir" })(resolved);
  if (checkAccess && !hasAccess(this, stats, R_OK))
    throw UV("EACCES", "scandir", path);
  if (!isDirectory(stats))
    throw UV("ENOTDIR", "scandir", path);
  let entries2;
  {
    const env_3 = { stack: [], error: void 0, hasError: false };
    try {
      const _ = __addDisposableResource4(env_3, lockPathSync(fs, resolved, "ro", stats), false);
      entries2 = fs.readdirSync(resolved);
    } catch (e_3) {
      env_3.error = e_3;
      env_3.hasError = true;
    } finally {
      __disposeResources4(env_3);
    }
  }
  const values = [];
  const addEntry = (entry) => {
    let entryStat;
    try {
      entryStat = fs.statSync(join(resolved, entry));
    } catch (e) {
      if (e.code == "ENOENT")
        return;
      throw e;
    }
    const ent = new Dirent();
    ent.ino = entryStat.ino;
    ent.type = ifToDt(entryStat.mode);
    ent.path = entry;
    ent.name = basename(entry);
    values.push(ent);
    if (!isDirectory(entryStat) || !options?.recursive)
      return;
    const children = fs.readdirSync(join(resolved, entry));
    for (const child of children)
      addEntry(join(entry, child));
  };
  for (const entry of entries2)
    addEntry(entry);
  return values;
}
function rename(oldPath, newPath) {
  const env_4 = { stack: [], error: void 0, hasError: false };
  try {
    oldPath = normalizePath(oldPath);
    newPath = normalizePath(newPath);
    const $ex = { syscall: "rename", path: oldPath, dest: newPath };
    const src = resolve2(this, oldPath, true, $ex);
    const dst = resolveMount(newPath, this, $ex);
    if (src.fs.uuid !== dst.fs.uuid)
      throw UV("EXDEV", $ex);
    if (dst.path.startsWith(src.path + "/"))
      throw UV("EINVAL", $ex);
    if (!src.stats)
      throw UV("ENOENT", $ex);
    const fs = src.fs;
    const oldParent = fs.statSync(dirname(src.path));
    const newParent = fs.statSync(dirname(dst.path));
    let newStats;
    try {
      newStats = fs.statSync(dst.path);
    } catch (e) {
      if (e.code != "ENOENT")
        throw e;
    }
    if (checkAccess && (!hasAccess(this, oldParent, R_OK) || !hasAccess(this, newParent, W_OK)))
      throw UV("EACCES", $ex);
    if (newStats && !isDirectory(src.stats) && isDirectory(newStats))
      throw UV("EISDIR", $ex);
    if (newStats && isDirectory(src.stats) && !isDirectory(newStats))
      throw UV("ENOTDIR", $ex);
    const srcDir = dirname(src.path);
    const dstDir = dirname(dst.path);
    const parents = [
      [srcDir, oldParent],
      [dstDir, newParent]
    ];
    if (oldParent.ino > newParent.ino)
      parents.reverse();
    const _first = __addDisposableResource4(env_4, lockPathSync(fs, parents[0][0], "rw", parents[0][1]), false);
    const _second = __addDisposableResource4(env_4, oldParent.ino == newParent.ino ? null : lockPathSync(fs, parents[1][0], "rw", parents[1][1]), false);
    src.fs.renameSync(src.path, dst.path);
    cacheOf(fs).rename(src.path, dst.path);
    emitChange(this, "rename", oldPath);
    emitChange(this, "rename", newPath);
  } catch (e_4) {
    env_4.error = e_4;
    env_4.hasError = true;
  } finally {
    __disposeResources4(env_4);
  }
}
function link(target, link5) {
  const env_5 = { stack: [], error: void 0, hasError: false };
  try {
    target = normalizePath(target);
    link5 = normalizePath(link5);
    const $ex = { syscall: "link", path: target, dest: link5 };
    const { fs, path: resolved } = resolveMount(target, this, $ex);
    const dst = resolveMount(link5, this, $ex);
    if (fs.uuid !== dst.fs.uuid)
      throw UV("EXDEV", $ex);
    const stats = fs.statSync(resolved);
    if (checkAccess) {
      if (!hasAccess(this, stats, R_OK))
        throw UV("EACCES", $ex);
      const dirStats = fs.statSync(dirname(resolved));
      if (!hasAccess(this, dirStats, R_OK))
        throw UV("EACCES", $ex);
      const destStats = fs.statSync(dirname(dst.path));
      if (!hasAccess(this, destStats, W_OK))
        throw UV("EACCES", $ex);
    }
    const _ = __addDisposableResource4(env_5, lockPathSync(fs, dirname(dst.path), "rw"), false);
    fs.linkSync(resolved, dst.path);
    cacheOf(fs).link(resolved, dst.path);
  } catch (e_5) {
    env_5.error = e_5;
    env_5.hasError = true;
  } finally {
    __disposeResources4(env_5);
  }
}
function stat(path, lstat3) {
  path = normalizePath.call(this, path);
  const extra = { syscall: lstat3 ? "lstat" : "stat", path };
  let stats;
  if (!lstat3)
    stats = resolve2(this, path, false, extra).stats;
  else {
    const { base, dir } = parse(path);
    const { fs, path: parent } = resolve2(this, dir, false, extra);
    try {
      const target = base ? join(parent, base) : parent;
      stats = cacheOf(fs).get(target)?.inode ?? fs.statSync(target);
    } catch (e) {
      setUVMessage(Object.assign(e, extra));
      throw e;
    }
  }
  if (!stats)
    throw UV("ENOENT", extra);
  if (checkAccess && !hasAccess(this, stats, R_OK))
    throw UV("EACCES", extra);
  return stats;
}

// node_modules/@zenfs/core/dist/node/dir.js
var import_buffer4 = __toESM(require_buffer(), 1);
var Dirent2 = class _Dirent {
  ino;
  type;
  _name;
  get name() {
    const name = import_buffer4.Buffer.from(this._name);
    return this._encoding == "buffer" ? name : name.toString(this._encoding);
  }
  /**
   * @internal @protected
   */
  _encoding;
  /**
   * @internal @protected
   */
  _parentPath;
  get parentPath() {
    return this._parentPath;
  }
  /**
   * @deprecated Removed in Node v24, use `parentPath` instead.
   */
  get path() {
    warn("Dirent.path was removed in Node v24, use parentPath instead");
    return this._parentPath;
  }
  /**
   * `vfs.path` is relative to the directory that was read,
   * so `parentPath` is resolved against it— like Node does.
   * @internal
   */
  static from(vfs, encoding, parentPath = ".") {
    const dirent = new _Dirent();
    const { base, dir } = parse(vfs.path);
    dirent._parentPath = join(parentPath, dir);
    dirent._name = base;
    dirent.ino = vfs.ino;
    dirent.type = vfs.type;
    dirent._encoding = encoding;
    return dirent;
  }
  isFile() {
    return this.type === DirType.REG;
  }
  isDirectory() {
    return this.type === DirType.DIR;
  }
  isBlockDevice() {
    return this.type === DirType.BLK;
  }
  isCharacterDevice() {
    return this.type === DirType.CHR;
  }
  isSymbolicLink() {
    return this.type === DirType.LNK;
  }
  isFIFO() {
    return this.type === DirType.FIFO;
  }
  isSocket() {
    return this.type === DirType.SOCK;
  }
};
function dirClosed() {
  return Object.assign(new Error("Directory handle was closed"), { code: "ERR_DIR_CLOSED" });
}
var Dir = class {
  path;
  context;
  closed = false;
  checkClosed() {
    if (this.closed)
      throw dirClosed();
  }
  _entries;
  constructor(path, context) {
    this.path = path;
    this.context = context;
  }
  close(cb) {
    if (this.closed) {
      const error2 = dirClosed();
      if (!cb)
        return Promise.reject(error2);
      cb(error2);
      return;
    }
    this.closed = true;
    if (!cb) {
      return Promise.resolve();
    }
    cb(null);
  }
  /**
   * Synchronously close the directory's underlying resource handle.
   * Subsequent reads will result in errors.
   */
  closeSync() {
    if (this.closed)
      throw dirClosed();
    this.closed = true;
  }
  async _read() {
    this.checkClosed();
    this._entries ??= await readdir2.call(this.context, this.path, {
      withFileTypes: true
    });
    if (!this._entries.length)
      return null;
    return this._entries.shift() ?? null;
  }
  read(cb) {
    if (!cb) {
      return this._read();
    }
    void this._read().then((value) => cb(null, value));
  }
  /**
   * Synchronously read the next directory entry via `readdir(3)` as a `Dirent`.
   * If there are no more directory entries to read, null will be returned.
   * Directory entries returned by this function are in no particular order as provided by the operating system's underlying directory mechanisms.
   */
  readSync() {
    this.checkClosed();
    this._entries ??= readdirSync.call(this.context, this.path, { withFileTypes: true });
    if (!this._entries.length)
      return null;
    return this._entries.shift() ?? null;
  }
  async next() {
    const value = await this._read();
    if (value) {
      return { done: false, value };
    }
    await this.close();
    return { done: true, value: void 0 };
  }
  /**
   * Asynchronously iterates over the directory via `readdir(3)` until all entries have been read.
   */
  [Symbol.asyncIterator]() {
    return this;
  }
  [Symbol.dispose]() {
    if (this.closed)
      return;
    this.closeSync();
  }
  async [Symbol.asyncDispose]() {
    if (this.closed)
      return;
    await this.close();
  }
};

// node_modules/@zenfs/core/dist/node/sync.js
var __addDisposableResource5 = function(env, value, async) {
  if (value !== null && value !== void 0) {
    if (typeof value !== "object" && typeof value !== "function") throw new TypeError("Object expected.");
    var dispose, inner;
    if (async) {
      if (!Symbol.asyncDispose) throw new TypeError("Symbol.asyncDispose is not defined.");
      dispose = value[Symbol.asyncDispose];
    }
    if (dispose === void 0) {
      if (!Symbol.dispose) throw new TypeError("Symbol.dispose is not defined.");
      dispose = value[Symbol.dispose];
      if (async) inner = dispose;
    }
    if (typeof dispose !== "function") throw new TypeError("Object not disposable.");
    if (inner) dispose = function() {
      try {
        inner.call(this);
      } catch (e) {
        return Promise.reject(e);
      }
    };
    env.stack.push({ value, dispose, async });
  } else if (async) {
    env.stack.push({ async: true });
  }
  return value;
};
var __disposeResources5 = /* @__PURE__ */ (function(SuppressedError2) {
  return function(env) {
    function fail(e) {
      env.error = env.hasError ? new SuppressedError2(e, env.error, "An error was suppressed during disposal.") : e;
      env.hasError = true;
    }
    var r, s = 0;
    function next() {
      while (r = env.stack.pop()) {
        try {
          if (!r.async && s === 1) return s = 0, env.stack.push(r), Promise.resolve().then(next);
          if (r.dispose) {
            var result = r.dispose.call(r.value);
            if (r.async) return s |= 2, Promise.resolve(result).then(next, function(e) {
              fail(e);
              return next();
            });
          } else s |= 1;
        } catch (e) {
          fail(e);
        }
      }
      if (s === 1) return env.hasError ? Promise.reject(env.error) : Promise.resolve();
      if (env.hasError) throw env.error;
    }
    return next();
  };
})(typeof SuppressedError === "function" ? SuppressedError : function(error2, suppressed, message) {
  var e = new Error(message);
  return e.name = "SuppressedError", e.error = error2, e.suppressed = suppressed, e;
});
function renameSync(oldPath, newPath) {
  return rename.call(this, oldPath, newPath);
}
function existsSync(path) {
  path = normalizePath(path);
  try {
    const { fs, path: resolvedPath } = resolve2(this, path);
    return fs.existsSync(resolvedPath);
  } catch (e) {
    if (e.errno == Errno.ENOENT)
      return false;
    throw e;
  }
}
function statSync(path, options) {
  let stats;
  try {
    stats = stat.call(this, path, false);
  } catch (e) {
    if (options?.throwIfNoEntry === false && _isNoEntry(e))
      return;
    throw e;
  }
  return options?.bigint ? new BigIntStats(stats) : new Stats(stats);
}
function lstatSync(path, options) {
  let stats;
  try {
    stats = stat.call(this, path, true);
  } catch (e) {
    if (options?.throwIfNoEntry === false && _isNoEntry(e))
      return;
    throw e;
  }
  return options?.bigint ? new BigIntStats(stats) : new Stats(stats);
}
function truncateSync(path, len = 0) {
  const env_1 = { stack: [], error: void 0, hasError: false };
  try {
    const file = __addDisposableResource5(env_1, open.call(this, path, { flag: "r+" }), false);
    len ||= 0;
    if (len < 0)
      throw UV("EINVAL", "truncate", path.toString());
    file.truncateSync(len);
  } catch (e_1) {
    env_1.error = e_1;
    env_1.hasError = true;
  } finally {
    __disposeResources5(env_1);
  }
}
function unlinkSync(path) {
  path = normalizePath(path);
  const { fs, path: resolved } = resolveMount(path, this);
  try {
    const env_2 = { stack: [], error: void 0, hasError: false };
    try {
      if (checkAccess && !hasAccess(this, fs.statSync(resolved), W_OK)) {
        throw UV("EACCES", "unlink");
      }
      const _ = __addDisposableResource5(env_2, lockPathSync(fs, dirname(resolved), "rw"), false);
      fs.unlinkSync(resolved);
      cacheOf(fs).remove(resolved);
    } catch (e_2) {
      env_2.error = e_2;
      env_2.hasError = true;
    } finally {
      __disposeResources5(env_2);
    }
  } catch (e) {
    throw setUVMessage(Object.assign(e, { syscall: "unlink", path }));
  }
  emitChange(this, "rename", path.toString());
}
function openSync(path, flag, mode = F_OK) {
  return toFD(open.call(this, path, { flag, mode }));
}
function lopenSync(path, flag, mode) {
  return toFD(open.call(this, path, { flag, mode, preserveSymlinks: true }));
}
function readFileSync(path, _options = {}) {
  const env_3 = { stack: [], error: void 0, hasError: false };
  try {
    const options = normalizeOptions(_options, null, "r", 420);
    const flag = parse2(options.flag);
    if (flag & O_WRONLY)
      throw UV("EBADF", "read", path.toString());
    const file = __addDisposableResource5(env_3, typeof path == "number" ? fromFD(this, path) : open.call(this, path.toString(), { flag: options.flag, mode: 420, preserveSymlinks: false }), false);
    const { size } = file.stat();
    const data = import_buffer5.Buffer.alloc(size);
    file.readSync(data, 0, size, 0);
    return options.encoding ? data.toString(options.encoding) : data;
  } catch (e_3) {
    env_3.error = e_3;
    env_3.hasError = true;
  } finally {
    __disposeResources5(env_3);
  }
}
function writeFileSync(path, data, _options = {}) {
  const env_4 = { stack: [], error: void 0, hasError: false };
  try {
    const options = normalizeOptions(_options, "utf8", "w+", 420);
    const flag = parse2(options.flag);
    if (!(flag & O_WRONLY || flag & O_RDWR)) {
      throw new Exception(Errno.EINVAL, "Flag passed to writeFile must allow for writing");
    }
    if (typeof data != "string" && !options.encoding) {
      throw new Exception(Errno.EINVAL, "Encoding not specified");
    }
    const encodedData = typeof data == "string" ? import_buffer5.Buffer.from(data, options.encoding) : new Uint8Array(data.buffer, data.byteOffset, data.byteLength);
    if (!encodedData) {
      throw new Exception(Errno.EINVAL, "Data not specified");
    }
    const file = __addDisposableResource5(env_4, typeof path == "number" ? fromFD(this, path) : open.call(this, path.toString(), {
      flag,
      mode: options.mode
    }), false);
    file.writeSync(encodedData, 0, encodedData.byteLength, 0);
    emitChange(this, "change", path.toString());
  } catch (e_4) {
    env_4.error = e_4;
    env_4.hasError = true;
  } finally {
    __disposeResources5(env_4);
  }
}
function appendFileSync(filename, data, _options = {}) {
  const options = normalizeOptions(_options, "utf8", "a+", 420);
  const flag = parse2(options.flag);
  if (!(flag & O_APPEND)) {
    throw new Exception(Errno.EINVAL, "Flag passed to appendFile must allow for appending");
  }
  if (typeof data != "string" && !options.encoding) {
    throw new Exception(Errno.EINVAL, "Encoding not specified");
  }
  const encodedData = typeof data == "string" ? import_buffer5.Buffer.from(data, options.encoding) : new Uint8Array(data.buffer, data.byteOffset, data.byteLength);
  const file = typeof filename == "number" ? fromFD(this, filename) : open.call(this, normalizePath(filename), {
    flag,
    mode: options.mode
  });
  file.writeSync(encodedData, 0, encodedData.byteLength);
  if (typeof file != "number")
    file.closeSync();
}
function fstatSync(fd, options) {
  const stats = fromFD(this, fd).stat();
  return options?.bigint ? new BigIntStats(stats) : new Stats(stats);
}
function closeSync(fd) {
  fromFD(this, fd).closeSync();
  deleteFD(this, fd);
}
function ftruncateSync(fd, len = 0) {
  len ||= 0;
  if (len < 0) {
    throw new Exception(Errno.EINVAL);
  }
  fromFD(this, fd).truncateSync(len);
}
function fsyncSync(fd) {
  fromFD(this, fd).syncSync();
}
function fdatasyncSync(fd) {
  fromFD(this, fd).datasyncSync();
}
function writeSync(fd, data, posOrOff, lenOrEnc, pos) {
  let buffer, offset, length, position;
  if (typeof data === "string") {
    position = typeof posOrOff === "number" ? posOrOff : null;
    const encoding = typeof lenOrEnc === "string" ? lenOrEnc : "utf8";
    offset = 0;
    buffer = import_buffer5.Buffer.from(data, encoding);
    length = buffer.byteLength;
  } else {
    buffer = new Uint8Array(data.buffer, data.byteOffset, data.byteLength);
    offset = posOrOff;
    length = lenOrEnc;
    position = typeof pos === "number" ? pos : null;
  }
  const file = fromFD(this, fd);
  position ??= file.position;
  const bytesWritten = file.writeSync(buffer, offset, length, position);
  emitChange(this, "change", file.path);
  return bytesWritten;
}
function readSync(fd, buffer, options, length, position) {
  const file = fromFD(this, fd);
  const offset = typeof options == "object" ? options.offset : options;
  if (typeof options == "object") {
    length = options.length;
    position = options.position;
  }
  if (position && position > Number.MAX_SAFE_INTEGER)
    throw UV("EINVAL");
  if (typeof position == "bigint")
    position = Number(position);
  position = Number.isSafeInteger(position) ? position : file.position;
  return file.readSync(buffer, offset, length, position);
}
function fchownSync(fd, uid, gid) {
  fromFD(this, fd).chownSync(uid, gid);
}
function fchmodSync(fd, mode) {
  const numMode = normalizeMode(mode, -1);
  if (numMode < 0) {
    throw new Exception(Errno.EINVAL, `Invalid mode.`);
  }
  fromFD(this, fd).chmodSync(numMode);
}
function futimesSync(fd, atime, mtime) {
  fromFD(this, fd).utimesSync(normalizeTime(atime), normalizeTime(mtime));
}
function rmdirSync(path) {
  const env_5 = { stack: [], error: void 0, hasError: false };
  try {
    path = normalizePath(path);
    const { fs, path: resolved } = resolve2(this, path);
    const stats = wrap(fs, "statSync", { path, syscall: "rmdir" })(resolved);
    if (!isDirectory(stats))
      throw UV("ENOTDIR", "rmdir", path);
    if (checkAccess && !hasAccess(this, stats, W_OK))
      throw UV("EACCES", "rmdir", path);
    const _ = __addDisposableResource5(env_5, lockPathSync(fs, dirname(resolved), "rw"), false);
    wrap(fs, "rmdirSync", path)(resolved);
    cacheOf(fs).remove(resolved);
    emitChange(this, "rename", path.toString());
  } catch (e_5) {
    env_5.error = e_5;
    env_5.hasError = true;
  } finally {
    __disposeResources5(env_5);
  }
}
function mkdirSync(path, options) {
  options = typeof options === "object" ? options : { mode: options };
  const mode = normalizeMode(options?.mode, 511);
  return mkdir.call(this, path, { ...options, mode });
}
function readdirSync(path, options) {
  options = typeof options === "object" ? options : { encoding: options };
  path = normalizePath(path);
  const entries2 = [];
  const rawEntries = readdir.call(this, path, options ?? void 0);
  for (const raw of rawEntries) {
    if (options?.withFileTypes) {
      entries2.push(Dirent2.from(raw, options.encoding, path));
    } else if (options?.encoding == "buffer") {
      entries2.push(import_buffer5.Buffer.from(raw.path));
    } else {
      entries2.push(raw.path);
    }
  }
  return entries2;
}
function linkSync(targetPath, linkPath) {
  return link.call(this, targetPath, linkPath);
}
function symlinkSync(target, path, type = "file") {
  const env_6 = { stack: [], error: void 0, hasError: false };
  try {
    if (!["file", "dir", "junction"].includes(type))
      throw new TypeError("Invalid symlink type: " + type);
    path = normalizePath(path);
    const file = __addDisposableResource5(env_6, open.call(this, path, { flag: "wx", mode: 420 }), false);
    file.writeSync(encodeUTF8(normalizePath(target, true)));
    file.chmodSync(S_IFLNK);
  } catch (e_6) {
    env_6.error = e_6;
    env_6.hasError = true;
  } finally {
    __disposeResources5(env_6);
  }
}
function readlinkSync(path, options) {
  const buf = import_buffer5.Buffer.from(readlink.call(this, path));
  const encoding = typeof options == "object" ? options?.encoding : options;
  if (encoding == "buffer") {
    return buf;
  }
  return buf.toString(encoding ?? "utf-8");
}
function chownSync(path, uid, gid) {
  const env_7 = { stack: [], error: void 0, hasError: false };
  try {
    const handle = __addDisposableResource5(env_7, open.call(this, path, { flag: "r+", mode: F_OK }), false);
    handle.chownSync(uid, gid);
  } catch (e_7) {
    env_7.error = e_7;
    env_7.hasError = true;
  } finally {
    __disposeResources5(env_7);
  }
}
function lchownSync(path, uid, gid) {
  const fd = lopenSync.call(this, path, "r+");
  fchownSync.call(this, fd, uid, gid);
  closeSync.call(this, fd);
}
function chmodSync(path, mode) {
  let fd;
  try {
    fd = openSync.call(this, path, "r+");
  } catch (e) {
    throw setUVMessage(Object.assign(e, { syscall: "chmod", path: normalizePath(path) }));
  }
  fchmodSync.call(this, fd, mode);
  closeSync.call(this, fd);
}
function lchmodSync(path, mode) {
  const fd = lopenSync.call(this, path, "r+");
  fchmodSync.call(this, fd, mode);
  closeSync.call(this, fd);
}
function utimesSync(path, atime, mtime) {
  const fd = openSync.call(this, path, "r+");
  futimesSync.call(this, fd, atime, mtime);
  closeSync.call(this, fd);
}
function lutimesSync(path, atime, mtime) {
  const fd = lopenSync.call(this, path, "r+");
  futimesSync.call(this, fd, atime, mtime);
  closeSync.call(this, fd);
}
function realpathSync(path, options) {
  const encoding = typeof options == "string" ? options : options?.encoding ?? "utf8";
  path = normalizePath(path, true);
  const { fullPath } = resolve2(this, path);
  if (encoding == "utf8" || encoding == "utf-8")
    return fullPath;
  const buf = import_buffer5.Buffer.from(fullPath, "utf-8");
  if (encoding == "buffer")
    return buf;
  return buf.toString(encoding);
}
function accessSync(path, mode = 384) {
  if (!checkAccess)
    return;
  if (!hasAccess(this, statSync.call(this, path), mode)) {
    throw new Exception(Errno.EACCES);
  }
}
function rmSync(path, options) {
  path = normalizePath(path);
  let stats;
  try {
    stats = lstatSync.bind(this)(path);
  } catch (error2) {
    if (error2.code != "ENOENT" || !options?.force)
      throw error2;
  }
  if (!stats)
    return;
  switch (stats.mode & S_IFMT) {
    case S_IFDIR:
      if (options?.recursive) {
        for (const entry of readdirSync.call(this, path)) {
          rmSync.call(this, join(path, entry), options);
        }
      }
      rmdirSync.call(this, path);
      break;
    case S_IFREG:
    case S_IFLNK:
    case S_IFBLK:
    case S_IFCHR:
      unlinkSync.call(this, path);
      break;
    case S_IFIFO:
    case S_IFSOCK:
    default:
      throw UV("ENOSYS", "rm", path);
  }
}
function mkdtempSync(prefix, options) {
  const encoding = typeof options === "object" ? options?.encoding : options || "utf8";
  const path = _tempDirName(prefix);
  mkdirSync.call(this, path);
  return encoding == "buffer" ? import_buffer5.Buffer.from(path) : path;
}
function mkdtempDisposableSync(prefix, options) {
  const path = _tempDirName(prefix);
  mkdirSync.call(this, path);
  const remove3 = () => rmSync(path, { recursive: true, force: true });
  return { path, remove: remove3, [Symbol.dispose]: remove3 };
}
function copyFileSync(source, destination, flags) {
  source = normalizePath(source);
  destination = normalizePath(destination);
  if (flags && flags & COPYFILE_EXCL && existsSync.call(this, destination))
    throw UV("EEXIST", "copyFile", destination);
  writeFileSync.call(this, destination, readFileSync.call(this, source));
  emitChange(this, "rename", destination.toString());
}
function readvSync(fd, buffers, position) {
  const file = fromFD(this, fd);
  let bytesRead = 0;
  for (const buffer of buffers) {
    bytesRead += file.readSync(buffer, 0, buffer.byteLength, position + bytesRead);
  }
  return bytesRead;
}
function writevSync(fd, buffers, position) {
  const file = fromFD(this, fd);
  let bytesWritten = 0;
  for (const buffer of buffers) {
    bytesWritten += file.writeSync(new Uint8Array(buffer.buffer), 0, buffer.byteLength, position + bytesWritten);
  }
  return bytesWritten;
}
function opendirSync(path, options) {
  path = normalizePath(path);
  return new Dir(path, this);
}
function cpSync(source, destination, opts) {
  source = normalizePath(source);
  destination = normalizePath(destination);
  const srcStats = lstatSync.call(this, source);
  if (opts?.errorOnExist && existsSync.call(this, destination))
    throw UV("EEXIST", "cp", destination);
  switch (srcStats.mode & S_IFMT) {
    case S_IFDIR:
      if (!opts?.recursive)
        throw UV("EISDIR", "cp", source);
      mkdirSync.call(this, destination, { recursive: true });
      for (const dirent of readdirSync.call(this, source, { withFileTypes: true })) {
        if (opts.filter && !opts.filter(join(source, dirent.name), join(destination, dirent.name))) {
          continue;
        }
        cpSync.call(this, join(source, dirent.name), join(destination, dirent.name), opts);
      }
      break;
    case S_IFLNK:
      if (opts?.dereference) {
        copyFileSync.call(this, source, destination);
      } else {
        const link5 = readlinkSync.call(this, source, "utf8");
        symlinkSync.call(this, opts?.verbatimSymlinks ? link5 : resolve.call(this, dirname(source), link5), destination);
      }
      break;
    case S_IFREG:
      copyFileSync.call(this, source, destination);
      break;
    case S_IFBLK:
    case S_IFCHR:
    case S_IFIFO:
    case S_IFSOCK:
    default:
      throw UV("ENOSYS", "cp", source);
  }
  if (opts?.preserveTimestamps) {
    utimesSync.call(this, destination, srcStats.atime, srcStats.mtime);
  }
}
function statfsSync(path, options) {
  path = normalizePath(path);
  const { fs } = resolveMount(path, this);
  return _statfs(fs, options?.bigint);
}
function globSync(pattern2, options = {}) {
  pattern2 = Array.isArray(pattern2) ? pattern2 : [pattern2];
  const $ = contextOf(this);
  const { cwd = $.pwd, withFileTypes = false, exclude = () => false, followSymlinks = false } = options;
  const base = resolve.call($, cwd instanceof URL ? cwd.pathname : cwd);
  const normalizedPatterns = pattern2.map((p) => p.startsWith("/") ? relative.call($, base, p) : p);
  const hasGlobStar = normalizedPatterns.some((p) => p.includes("**"));
  const patternBases = normalizedPatterns.map((p) => {
    const firstGlob = p.search(/[*?[\]{]/);
    if (firstGlob === -1)
      return p;
    const lastSlash = p.lastIndexOf("/", firstGlob);
    return lastSlash === -1 ? "" : p.slice(0, lastSlash);
  });
  const regexPatterns = normalizedPatterns.map(globToRegex);
  function shouldDescend(path, relativePath) {
    const isNamed = patternBases.some((base2) => relativePath === base2 || base2.startsWith(relativePath + "/"));
    const inScope = hasGlobStar || isNamed;
    const stats = lstatSync.call($, path);
    if (!stats.isSymbolicLink())
      return inScope && stats.isDirectory();
    return inScope && (followSymlinks || isNamed) && !!statSync.call($, path, { throwIfNoEntry: false })?.isDirectory();
  }
  const results = [];
  function recursiveList(dir) {
    const entries2 = readdirSync.call($, dir, { withFileTypes, encoding: "utf8" });
    for (const entry of entries2) {
      const fullPath = join(dir, withFileTypes ? entry.name : entry);
      const relPath = relative.call($, base, fullPath);
      if (typeof exclude != "function" ? exclude.some((p) => matchesGlob(p, relPath)) : exclude(withFileTypes ? entry : relPath))
        continue;
      if (shouldDescend(fullPath, relPath))
        recursiveList(fullPath);
      if (regexPatterns.some((rx) => rx.test(relPath))) {
        results.push(withFileTypes ? entry : relPath);
      }
    }
  }
  recursiveList(base);
  return results;
}

// node_modules/@zenfs/core/dist/vfs/watchers.js
var _statSync = statSync;
var Watcher = class extends import_index.default {
  _context;
  path;
  off(event, fn, context, once) {
    return super.off(event, fn, context, once);
  }
  removeListener(event, fn, context, once) {
    return super.removeListener(event, fn, context, once);
  }
  constructor(_context, path) {
    super();
    this._context = _context;
    this.path = path;
  }
  setMaxListeners() {
    throw UV("ENOSYS", "Watcher.setMaxListeners");
  }
  getMaxListeners() {
    throw UV("ENOSYS", "Watcher.getMaxListeners");
  }
  prependListener() {
    throw UV("ENOSYS", "Watcher.prependListener");
  }
  prependOnceListener() {
    throw UV("ENOSYS", "Watcher.prependOnceListener");
  }
  rawListeners() {
    throw UV("ENOSYS", "Watcher.rawListeners");
  }
  ref() {
    return this;
  }
  unref() {
    return this;
  }
};
var FSWatcher = class extends Watcher {
  options;
  realpath;
  constructor(context, path, options) {
    const $ = contextOf(context);
    super($, path);
    this.options = options;
    this.realpath = join($.root, path);
    addWatcher(this.realpath, this);
  }
  close() {
    super.emit("close");
    removeWatcher(this.realpath, this);
  }
  [Symbol.dispose]() {
    this.close();
  }
};
var StatWatcher = class extends Watcher {
  options;
  intervalId;
  previous;
  constructor(context, path, options) {
    super(context, path);
    this.options = options;
    this.start();
  }
  onInterval() {
    try {
      const current = _statSync.call(this._context, this.path);
      if (!isStatsEqual(this.previous, current)) {
        this.emit("change", current, this.previous);
        this.previous = current;
      }
    } catch (e) {
      this.emit("error", e);
    }
  }
  start() {
    const interval = this.options.interval || 5e3;
    try {
      this.previous = _statSync.call(this._context, this.path);
    } catch (e) {
      this.emit("error", e);
      return;
    }
    this.intervalId = setInterval(this.onInterval.bind(this), interval);
    if (!this.options.persistent && typeof this.intervalId == "object") {
      this.intervalId.unref();
    }
  }
  /**
   * @internal
   */
  stop() {
    if (this.intervalId) {
      clearInterval(this.intervalId);
      this.intervalId = void 0;
    }
    this.removeAllListeners();
  }
};
var watchers = /* @__PURE__ */ new Map();
function addWatcher(path, watcher) {
  const normalizedPath = normalizePath(path);
  if (!watchers.has(normalizedPath)) {
    watchers.set(normalizedPath, /* @__PURE__ */ new Set());
  }
  watchers.get(normalizedPath).add(watcher);
}
function removeWatcher(path, watcher) {
  const normalizedPath = normalizePath(path);
  if (watchers.has(normalizedPath)) {
    watchers.get(normalizedPath).delete(watcher);
    if (watchers.get(normalizedPath).size === 0) {
      watchers.delete(normalizedPath);
    }
  }
}
function emitChange(context, eventType, filename) {
  const $ = contextOf(context);
  if ($)
    filename = join($.root ?? "/", filename);
  filename = normalizePath(filename);
  for (let path = filename; ; path = dirname(path)) {
    const watchersForPath = watchers.get(path);
    if (watchersForPath) {
      for (const watcher of watchersForPath) {
        watcher.emit("change", eventType, relative.call(watcher._context, path, filename) || basename(filename));
      }
    }
    if (path === "/")
      break;
  }
}

// node_modules/@zenfs/core/dist/vfs/async.js
var __addDisposableResource6 = function(env, value, async) {
  if (value !== null && value !== void 0) {
    if (typeof value !== "object" && typeof value !== "function") throw new TypeError("Object expected.");
    var dispose, inner;
    if (async) {
      if (!Symbol.asyncDispose) throw new TypeError("Symbol.asyncDispose is not defined.");
      dispose = value[Symbol.asyncDispose];
    }
    if (dispose === void 0) {
      if (!Symbol.dispose) throw new TypeError("Symbol.dispose is not defined.");
      dispose = value[Symbol.dispose];
      if (async) inner = dispose;
    }
    if (typeof dispose !== "function") throw new TypeError("Object not disposable.");
    if (inner) dispose = function() {
      try {
        inner.call(this);
      } catch (e) {
        return Promise.reject(e);
      }
    };
    env.stack.push({ value, dispose, async });
  } else if (async) {
    env.stack.push({ async: true });
  }
  return value;
};
var __disposeResources6 = /* @__PURE__ */ (function(SuppressedError2) {
  return function(env) {
    function fail(e) {
      env.error = env.hasError ? new SuppressedError2(e, env.error, "An error was suppressed during disposal.") : e;
      env.hasError = true;
    }
    var r, s = 0;
    function next() {
      while (r = env.stack.pop()) {
        try {
          if (!r.async && s === 1) return s = 0, env.stack.push(r), Promise.resolve().then(next);
          if (r.dispose) {
            var result = r.dispose.call(r.value);
            if (r.async) return s |= 2, Promise.resolve(result).then(next, function(e) {
              fail(e);
              return next();
            });
          } else s |= 1;
        } catch (e) {
          fail(e);
        }
      }
      if (s === 1) return env.hasError ? Promise.reject(env.error) : Promise.resolve();
      if (env.hasError) throw env.error;
    }
    return next();
  };
})(typeof SuppressedError === "function" ? SuppressedError : function(error2, suppressed, message) {
  var e = new Error(message);
  return e.name = "SuppressedError", e.error = error2, e.suppressed = suppressed, e;
});
async function resolve3($, path, preserveSymlinks, extra) {
  path = resolve.call($, path);
  if (preserveSymlinks) {
    const resolved2 = resolveMount(path, $, extra);
    const stats2 = cacheOf(resolved2.fs).get(resolved2.path)?.inode ?? await resolved2.fs.stat(resolved2.path).catch(() => void 0);
    return { ...resolved2, fullPath: path, stats: stats2 };
  }
  try {
    const resolved2 = resolveMount(path, $);
    const stats2 = cacheOf(resolved2.fs).get(resolved2.path)?.inode ?? await resolved2.fs.stat(resolved2.path);
    if (!isSymbolicLink(stats2)) {
      return { ...resolved2, fullPath: path, stats: stats2 };
    }
    const target2 = resolve.call($, dirname(path), await readlink2.call($, path));
    return await resolve3($, target2, preserveSymlinks, extra);
  } catch {
  }
  const { base, dir } = parse(path);
  const realDir = dir == "/" ? "/" : (await resolve3($, dir, false, extra)).fullPath;
  const maybePath = join(realDir, base);
  const resolved = resolveMount(maybePath, $);
  const stats = cacheOf(resolved.fs).get(resolved.path)?.inode ?? await resolved.fs.stat(resolved.path).catch((e) => {
    if (e.code == "ENOENT")
      return;
    throw setUVMessage(Object.assign(e, { syscall: "stat", path: maybePath, ...extra }));
  });
  if (!stats)
    return { ...resolved, fullPath: maybePath };
  if (!isSymbolicLink(stats)) {
    return { ...resolved, fullPath: maybePath, stats };
  }
  const target = resolve.call($, realDir, await readlink2.call($, maybePath));
  return await resolve3($, target, false, extra);
}
async function open2($, path, opt) {
  path = normalizePath(path);
  const mode = normalizeMode(opt.mode, 420), flag = parse2(opt.flag);
  const $ex = { syscall: "open", path };
  let { fs, path: resolved, stats } = await resolve3($, path, opt.preserveSymlinks, $ex);
  if (!stats) {
    const env_1 = { stack: [], error: void 0, hasError: false };
    try {
      if (!(flag & O_CREAT))
        throw UV("ENOENT", $ex);
      const parentPath = dirname(resolved);
      const parentStats = await fs.stat(parentPath);
      if (checkAccess && !hasAccess($, parentStats, W_OK))
        throw UV("EACCES", "open", dirname(path));
      if (!isDirectory(parentStats))
        throw UV("ENOTDIR", "open", dirname(path));
      if (!opt.allowDirectory && mode & S_IFDIR)
        throw UV("EISDIR", "open", path);
      const _ = __addDisposableResource6(env_1, await lockPath(fs, parentPath, "rw", parentStats), false);
      stats = cacheOf(fs).get(resolved)?.inode ?? await fs.stat(resolved).catch(() => void 0);
      if (!stats) {
        const { euid: uid, egid: gid } = contextOf($).credentials;
        const inode = await fs.createFile(resolved, {
          mode,
          uid: parentStats.mode & S_ISUID ? parentStats.uid : uid,
          gid: parentStats.mode & S_ISGID ? parentStats.gid : gid
        });
        emitChange($, "rename", path);
        return new Handle($, path, resolved, flag, cacheOf(fs).ref(resolved, inode));
      }
    } catch (e_1) {
      env_1.error = e_1;
      env_1.hasError = true;
    } finally {
      __disposeResources6(env_1);
    }
  }
  if (checkAccess && !hasAccess($, stats, toMode(flag)))
    throw UV("EACCES", $ex);
  if (flag & O_EXCL)
    throw UV("EEXIST", $ex);
  if (!opt.allowDirectory && mode & S_IFDIR)
    throw UV("EISDIR", "open", path);
  const handle = new Handle($, path, resolved, flag, cacheOf(fs).ref(resolved, stats));
  if (flag & O_TRUNC)
    await handle.truncate(0);
  return handle;
}
async function readlink2(path) {
  path = normalizePath(path);
  const $ex = { syscall: "readlink", path };
  const { fs, stats, path: resolved } = await resolve3(this, path, true, $ex);
  if (!stats)
    throw UV("ENOENT", $ex);
  if (checkAccess && !hasAccess(this, stats, R_OK))
    throw UV("EACCES", $ex);
  if (!isSymbolicLink(stats))
    throw UV("EINVAL", $ex);
  const size = stats.size;
  const data = new Uint8Array(size);
  await fs.read(resolved, data, 0, size);
  return decodeUTF8(data);
}
async function mkdir2(path, options = {}) {
  const original = normalizePath(path);
  const { euid: uid, egid: gid } = contextOf(this).credentials;
  const { mode = 511, recursive } = options;
  const $ex = { syscall: "mkdir", path: original };
  const { fullPath: realParent } = await resolve3(this, dirname(original), false, $ex);
  const { fs, path: target } = resolveMount(join(realParent, basename(original)), this, $ex);
  const followed = realParent != dirname(original);
  let firstCreated;
  const __create2 = async (path2, resolved) => {
    const env_2 = { stack: [], error: void 0, hasError: false };
    try {
      const parentPath = dirname(resolved);
      const parent = recursive && parentPath != "/" ? await __create2(dirname(path2), parentPath) : await fs.stat(parentPath);
      const _ = __addDisposableResource6(env_2, await lockPath(fs, parentPath, "rw", parent), false);
      if (recursive) {
        const existing = cacheOf(fs).get(resolved)?.inode ?? await fs.stat(resolved).catch(() => null);
        if (existing) {
          const stats = isSymbolicLink(existing) ? (await resolve3(this, path2, false, $ex)).stats : existing;
          if (!stats)
            throw UV("ENOENT", $ex);
          if (!isDirectory(stats))
            throw UV(resolved == target ? "EEXIST" : "ENOTDIR", $ex);
          return existing;
        }
        if (followed && await fs.exists(join(parentPath, basename(path2))))
          throw UV("ENOTDIR", "mkdir", path2);
      }
      if (checkAccess && !hasAccess(this, parent, W_OK))
        throw UV("EACCES", "mkdir", path2);
      const inode = await fs.mkdir(resolved, {
        mode,
        uid: parent.mode & S_ISUID ? parent.uid : uid,
        gid: parent.mode & S_ISGID ? parent.gid : gid
      }).catch(rethrow({ syscall: "mkdir", path: path2 }));
      if (recursive)
        firstCreated ??= path2;
      emitChange(this, "rename", path2);
      return inode;
    } catch (e_2) {
      env_2.error = e_2;
      env_2.hasError = true;
    } finally {
      __disposeResources6(env_2);
    }
  };
  await __create2(original, target);
  return firstCreated;
}
async function readdir3(path, options = {}) {
  path = normalizePath(path);
  const $ex = { syscall: "scandir", path };
  const { fs, path: resolved, stats } = await resolve3(this, path, false, $ex);
  if (!stats)
    throw UV("ENOENT", $ex);
  if (checkAccess && !hasAccess(this, stats, R_OK))
    throw UV("EACCES", $ex);
  if (!isDirectory(stats))
    throw UV("ENOTDIR", $ex);
  let entries2;
  {
    const env_3 = { stack: [], error: void 0, hasError: false };
    try {
      const _ = __addDisposableResource6(env_3, await lockPath(fs, resolved, "ro", stats), false);
      entries2 = await fs.readdir(resolved);
    } catch (e_3) {
      env_3.error = e_3;
      env_3.hasError = true;
    } finally {
      __disposeResources6(env_3);
    }
  }
  const values = [];
  const addEntry = async (entry) => {
    const entryStats = await fs.stat(join(resolved, entry)).catch((e) => {
      if (e.code == "ENOENT")
        return;
      throw e;
    });
    if (!entryStats)
      return;
    const ent = new Dirent();
    ent.ino = entryStats.ino;
    ent.type = ifToDt(entryStats.mode);
    ent.path = entry;
    ent.name = basename(entry);
    values.push(ent);
    if (!options.recursive || !isDirectory(entryStats))
      return;
    const children = await fs.readdir(join(resolved, entry));
    for (const child of children)
      await addEntry(join(entry, child));
  };
  await Promise.all(entries2.map(addEntry));
  return values;
}
async function rename2(oldPath, newPath) {
  const env_4 = { stack: [], error: void 0, hasError: false };
  try {
    oldPath = normalizePath(oldPath);
    newPath = normalizePath(newPath);
    const $ex = { syscall: "rename", path: oldPath, dest: newPath };
    const src = await resolve3(this, oldPath, true, $ex);
    const dst = resolveMount(newPath, this, $ex);
    if (src.fs.uuid !== dst.fs.uuid)
      throw UV("EXDEV", $ex);
    if (dst.path.startsWith(src.path + "/"))
      throw UV("EINVAL", $ex);
    if (!src.stats)
      throw UV("ENOENT", $ex);
    const fs = src.fs;
    const oldParent = await fs.stat(dirname(src.path));
    const newParent = await fs.stat(dirname(dst.path));
    const newStats = await fs.stat(dst.path).catch((e) => {
      if (e.code == "ENOENT")
        return null;
      throw e;
    });
    if (checkAccess && (!hasAccess(this, oldParent, R_OK) || !hasAccess(this, newParent, W_OK)))
      throw UV("EACCES", $ex);
    if (newStats && !isDirectory(src.stats) && isDirectory(newStats))
      throw UV("EISDIR", $ex);
    if (newStats && isDirectory(src.stats) && !isDirectory(newStats))
      throw UV("ENOTDIR", $ex);
    const srcDir = dirname(src.path);
    const dstDir = dirname(dst.path);
    const parents = [
      [srcDir, oldParent],
      [dstDir, newParent]
    ];
    if (oldParent.ino > newParent.ino)
      parents.reverse();
    const _first = __addDisposableResource6(env_4, await lockPath(fs, parents[0][0], "rw", parents[0][1]), false);
    const _second = __addDisposableResource6(env_4, oldParent.ino == newParent.ino ? null : await lockPath(fs, parents[1][0], "rw", parents[1][1]), false);
    await src.fs.rename(src.path, dst.path);
    cacheOf(fs).rename(src.path, dst.path);
    emitChange(this, "rename", oldPath);
    emitChange(this, "rename", newPath);
  } catch (e_4) {
    env_4.error = e_4;
    env_4.hasError = true;
  } finally {
    __disposeResources6(env_4);
  }
}
async function link2(target, link5) {
  const env_5 = { stack: [], error: void 0, hasError: false };
  try {
    target = normalizePath(target);
    link5 = normalizePath(link5);
    const $ex = { syscall: "link", path: target, dest: link5 };
    const { fs, path: resolved } = resolveMount(target, this, $ex);
    const dst = resolveMount(link5, this, $ex);
    if (fs.uuid != dst.fs.uuid)
      throw UV("EXDEV", $ex);
    const stats = await fs.stat(resolved);
    if (checkAccess) {
      if (!hasAccess(this, stats, R_OK))
        throw UV("EACCES", $ex);
      const dirStats = await fs.stat(dirname(resolved));
      if (!hasAccess(this, dirStats, R_OK))
        throw UV("EACCES", $ex);
      const destStats = await fs.stat(dirname(dst.path));
      if (!hasAccess(this, destStats, W_OK))
        throw UV("EACCES", $ex);
    }
    const _ = __addDisposableResource6(env_5, await lockPath(fs, dirname(dst.path), "rw"), false);
    await fs.link(resolved, dst.path);
    cacheOf(fs).link(resolved, dst.path);
  } catch (e_5) {
    env_5.error = e_5;
    env_5.hasError = true;
  } finally {
    __disposeResources6(env_5);
  }
}
async function stat2(path, lstat3) {
  path = normalizePath.call(this, path);
  const extra = { syscall: lstat3 ? "lstat" : "stat", path };
  let stats;
  if (!lstat3)
    stats = (await resolve3(this, path, false, extra)).stats;
  else {
    const { base, dir } = parse(path);
    const { fs, path: parent } = await resolve3(this, dir, false, extra);
    const target = base ? join(parent, base) : parent;
    stats = cacheOf(fs).get(target)?.inode ?? await fs.stat(target).catch(rethrow(extra));
  }
  if (!stats)
    throw UV("ENOENT", extra);
  if (checkAccess && !hasAccess(this, stats, R_OK))
    throw UV("EACCES", extra);
  return stats;
}

// node_modules/@zenfs/core/dist/node/readline.js
var Interface = class extends import_index.default {
  input;
  output;
  terminal;
  line = "";
  _cursor = 0;
  get cursor() {
    return this._cursor;
  }
  _buffer = "";
  _closed = false;
  _paused = false;
  _prompt = "";
  _history = [];
  _historyIndex = -1;
  _currentLine = "";
  constructor(input, output2, completer, terminal = false) {
    super();
    this.input = input;
    this.output = output2;
    this.terminal = terminal;
    this.input.on("data", this._onData);
    this.input.on("end", this.close.bind(this));
    this.input.on("close", this.close.bind(this));
  }
  _onData = (data) => {
    if (this._paused || this._closed)
      return;
    this._buffer += typeof data === "string" ? data : data.toString("utf8");
    for (let lineEnd = this._buffer.indexOf("\n"); lineEnd >= 0; lineEnd = this._buffer.indexOf("\n")) {
      let line = this._buffer.substring(0, lineEnd);
      if (line.endsWith("\r")) {
        line = line.substring(0, line.length - 1);
      }
      this._buffer = this._buffer.substring(lineEnd + 1);
      this.line = line;
      if (line.trim() && !line.trim().match(/^\s*$/) && this._history.at(-1) != line) {
        this._history.push(line);
        this._historyIndex = this._history.length;
        this.emit("history", this._history);
      }
      this.emit("line", line);
    }
  };
  /**
   * Closes the interface and removes all event listeners
   */
  close() {
    if (this._closed)
      return;
    this._closed = true;
    this.input?.removeAllListeners?.();
    if (this._buffer.length) {
      const line = this._buffer;
      this._buffer = "";
      this.line = line;
      this.emit("line", line);
    }
    this.emit("history", this._history);
    this.emit("close");
    this.removeAllListeners();
  }
  /**
   * Pauses the input stream
   */
  pause() {
    if (this._paused)
      return this;
    this._paused = true;
    if ("pause" in this.input)
      this.input.pause();
    this.emit("pause");
    return this;
  }
  /**
   * Resumes the input stream
   */
  resume() {
    if (!this._paused)
      return this;
    this._paused = false;
    if ("resume" in this.input)
      this.input.resume();
    this.emit("resume");
    return this;
  }
  /**
   * Sets the prompt text
   */
  setPrompt(prompt) {
    this._prompt = prompt;
  }
  /**
   * Gets the current prompt text
   */
  getPrompt() {
    return this._prompt;
  }
  /**
   * Displays the prompt to the user
   */
  prompt(preserveCursor) {
    if (!this.output)
      return;
    if (!preserveCursor) {
      this.output.write(this._prompt);
      return;
    }
    const { cols } = this.getCursorPos();
    this.output.write(this._prompt);
    this._cursor = cols;
  }
  /**
   * Writes data to the interface and handles key events
   */
  write(data, key) {
    if (this._closed)
      return;
    if (data) {
      const str = typeof data === "string" ? data : data.toString("utf8");
      this._onData(str);
    }
    if (!key || !this.terminal)
      return;
    switch ((key.ctrl ? "^" : "") + key.name) {
      case "^c":
        this.emit("SIGINT");
        break;
      case "^z":
        this.emit("SIGTSTP");
        break;
      case "^q":
        this.emit("SIGCONT");
        break;
      case "home":
      case "^a":
        if (!this.output)
          return;
        moveCursor(this.output, -this._cursor, 0);
        this._cursor = 0;
        this._cursor = 0;
        break;
      case "^e":
      case "end": {
        if (!this.output)
          return;
        const dx = this.line.length - this._cursor;
        if (!dx)
          return;
        moveCursor(this.output, dx, 0);
        this._cursor = this.line.length;
        this._cursor = this.line.length;
        break;
      }
      case "^k": {
        if (!this.output)
          return;
        if (this._cursor >= this.line.length)
          return;
        const newLine = this.line.slice(0, this._cursor);
        clearLine(this.output, 1);
        this.line = newLine;
        break;
      }
      case "^u": {
        if (!this.output || !this._cursor)
          return;
        const newLine = this.line.slice(this._cursor);
        clearLine(this.output, 0);
        moveCursor(this.output, 0, 0);
        this.output.write(this._prompt + newLine);
        this.line = newLine;
        this._cursor = 0;
        this._cursor = 0;
        break;
      }
      case "^w": {
        if (!this.output || !this._cursor)
          return;
        let i = this._cursor - 1;
        while (i >= 0 && this.line[i] === " ")
          i--;
        while (i >= 0 && this.line[i] !== " ")
          i--;
        const newLine = this.line.slice(0, i + 1) + this.line.slice(this._cursor);
        const newCursorPos = i + 1;
        this._renderLine(newLine);
        this._cursor = newCursorPos;
        this._cursor = newCursorPos;
        moveCursor(this.output, -newLine.length, 0);
        moveCursor(this.output, newCursorPos, 0);
        break;
      }
      case "^return":
      case "^enter":
        this._onData("\n");
        break;
      case "return":
      case "enter":
        this._onData((!data ? "" : typeof data == "string" ? data : data.toString("utf8")) + "\n");
        break;
      case "up":
      case "down": {
        if (!this.output || !this._history.length)
          return;
        if (this._historyIndex === this._history.length) {
          this._currentLine = this.line || "";
        }
        if (key.name == "up" && this._historyIndex > 0) {
          this._historyIndex--;
        } else if (key.name == "down" && this._historyIndex < this._history.length - 1) {
          this._historyIndex++;
        } else if (key.name == "down" && this._historyIndex == this._history.length - 1) {
          this._historyIndex = this._history.length;
          this._renderLine(this._currentLine);
          return;
        } else {
          return;
        }
        const historyItem = this._history[this._historyIndex];
        this._renderLine(historyItem);
        break;
      }
      case "left":
      case "right": {
        const dx = key.name == "left" ? -1 : 1;
        if (!this.output)
          return;
        const newPos = Math.max(0, Math.min(this.line.length, this._cursor + dx));
        if (newPos == this._cursor)
          return;
        moveCursor(this.output, dx, 0);
        this._cursor = newPos;
        this._cursor = newPos;
        break;
      }
      case "backspace": {
        if (!this.output || !this._cursor)
          return;
        const newLine = this.line.slice(0, this._cursor - 1) + this.line.slice(this._cursor);
        this._renderLine(newLine);
        this._cursor = --this._cursor;
        if (this._cursor > 0) {
          moveCursor(this.output, -this._cursor, 0);
          moveCursor(this.output, this._cursor, 0);
        }
        break;
      }
      case "delete": {
        if (!this.output)
          return;
        if (this._cursor >= this.line.length)
          return;
        const newLine = this.line.slice(0, this._cursor) + this.line.slice(this._cursor + 1);
        clearLine(this.output, 0);
        moveCursor(this.output, 0, 0);
        this.output.write(this._prompt + newLine);
        this.line = newLine;
        moveCursor(this.output, -newLine.length, 0);
        moveCursor(this.output, this._cursor, 0);
        break;
      }
    }
  }
  _renderLine(text) {
    if (!this.output)
      return;
    clearLine(this.output, 0);
    moveCursor(this.output, 0, 0);
    this.output.write(this._prompt + text);
    this.line = text;
    this._cursor = text.length;
    this._cursor = text.length;
  }
  question(query, optionsOrCallback, maybeCallback) {
    const callback = typeof optionsOrCallback === "function" ? optionsOrCallback : maybeCallback;
    if (this._closed || !this.output) {
      callback("");
      return;
    }
    this.output.write(query);
    this.once("line", callback);
  }
  /**
   * Gets the current cursor position
   */
  getCursorPos() {
    return { rows: 0, cols: this.cursor };
  }
  /**
   * Prepends a listener for the specified event
   */
  prependListener(event, listener) {
    const listeners = this.listeners(event);
    this.removeAllListeners(event);
    this.on(event, listener);
    listeners.forEach(this.on.bind(this, event));
    return this;
  }
  /**
   * Prepends a one-time listener for the specified event
   */
  prependOnceListener(event, listener) {
    const listeners = this.listeners(event);
    this.removeAllListeners(event);
    this.once(event, listener);
    listeners.forEach(this.on.bind(this, event));
    return this;
  }
  /**
   * Sets the maximum number of listeners
   */
  setMaxListeners() {
    warn("Interface.prototype.setMaxListeners is not supported");
    return this;
  }
  /**
   * Gets the maximum number of listeners
   */
  getMaxListeners() {
    warn("Interface.prototype.getMaxListeners is not supported");
    return 10;
  }
  [Symbol.asyncIterator]() {
    let done = false;
    return {
      next: async () => {
        if (done)
          return { done, value: void 0 };
        const { resolve: resolve4, promise } = Promise.withResolvers();
        this.once("line", (line) => resolve4({ value: line, done: false }));
        this.once("close", () => {
          done = true;
          resolve4({ value: void 0, done });
        });
        return promise;
      },
      return: async (value) => {
        if (done)
          return { done, value };
        done = true;
        this.close();
        return { done, value };
      },
      throw: async (error2) => {
        if (!done) {
          done = true;
          this.close();
        }
        throw error2;
      },
      [Symbol.asyncIterator]() {
        return this;
      },
      [Symbol.asyncDispose]: async () => {
        if (done)
          return;
        done = true;
        this.close();
      }
    };
  }
  [Symbol.dispose]() {
    this.close();
  }
  async [Symbol.asyncDispose]() {
    if (this._closed)
      return;
    const { resolve: resolve4, promise } = Promise.withResolvers();
    this.once("close", () => resolve4());
    this.close();
    await promise;
  }
  rawListeners(event) {
    return this.listeners(event);
  }
};
function createInterface(input, output2, completer, terminal) {
  return "input" in input ? new Interface(input.input, input.output, input.completer, input.terminal) : new Interface(input, output2, completer, terminal);
}
function clearLine(stream, dir) {
  stream.write(dir >= 0 ? "\r\x1B[K" : "\x1B[K");
  return true;
}
function moveCursor(stream, dx, dy) {
  if (!stream.write)
    return false;
  let cmd = "";
  if (dx < 0) {
    cmd += `\x1B[${-dx}D`;
  } else if (dx > 0) {
    cmd += `\x1B[${dx}C`;
  }
  if (dy < 0) {
    cmd += `\x1B[${-dy}A`;
  } else if (dy > 0) {
    cmd += `\x1B[${dy}B`;
  }
  if (cmd)
    stream.write(cmd);
  return true;
}

// node_modules/@zenfs/core/dist/node/streams.js
var import_readable_stream = __toESM(require_browser3(), 1);
var ReadStream = class extends import_readable_stream.Readable {
  pending = true;
  _path = "<unknown>";
  _bytesRead = 0;
  reader;
  ready;
  constructor(opts = {}, handleOrPromise) {
    super({ ...opts, encoding: opts.encoding ?? void 0 });
    this.ready = Promise.resolve(handleOrPromise).then((handle) => {
      this._path = handle["vfs"].path;
      const internal = handle.readableWebStream({ start: opts.start, end: opts.end === void 0 ? void 0 : opts.end + 1 });
      this.reader = internal.getReader();
      this.pending = false;
    }).catch((err2) => {
      this.destroy(err2);
    });
  }
  async _read() {
    try {
      await this.ready;
      if (!this.reader)
        return;
      const { done, value } = await this.reader.read();
      if (done) {
        this.push(null);
        return;
      }
      this._bytesRead += value.byteLength;
      this.push(value);
    } catch (err2) {
      this.destroy(new Exception(Errno.EIO, err2.toString()));
    }
  }
  /**
   * Like Node, the callback is invoked once the stream is closed.
   * Closing before the stream has finished reports `ERR_STREAM_PREMATURE_CLOSE`.
   */
  close(callback = () => null) {
    (0, import_readable_stream.finished)(this, (error2) => callback(error2 ?? null));
    this.destroy();
  }
  get path() {
    return this._path;
  }
  get bytesRead() {
    return this._bytesRead;
  }
  wrap(oldStream) {
    super.wrap(oldStream);
    return this;
  }
};
var WriteStream = class extends import_readable_stream.Writable {
  pending = true;
  _path = "<unknown>";
  _bytesWritten = 0;
  writer;
  ready;
  constructor(opts = {}, handleOrPromise) {
    super(opts);
    this.ready = Promise.resolve(handleOrPromise).then((handle) => {
      this._path = handle["vfs"].path;
      const internal = handle.writableWebStream({ start: opts.start });
      this.writer = internal.getWriter();
      this.pending = false;
    }).catch((err2) => this.destroy(err2));
  }
  async _write(chunk, encoding, callback) {
    await this.ready;
    if (!this.writer)
      return callback(warn(UV("EAGAIN", "write", this._path)));
    if (encoding != "buffer")
      return callback(warn(UV("ENOTSUP", "write", this._path)));
    const data = new Uint8Array(chunk.buffer, chunk.byteOffset, chunk.byteLength);
    try {
      await this.writer.write(data);
      this._bytesWritten += chunk.byteLength;
      callback();
    } catch (error2) {
      callback(new Exception(Errno.EIO, error2.toString()));
    }
  }
  async _final(callback) {
    await this.ready;
    if (!this.writer)
      return callback();
    try {
      await this.writer.close();
      callback();
    } catch (error2) {
      callback(new Exception(Errno.EIO, error2.toString()));
    }
  }
  close(callback = () => null) {
    try {
      this.destroy();
      this.emit("close");
      callback(null);
    } catch (error2) {
      callback(new Exception(Errno.EIO, error2.toString()));
    }
  }
  get path() {
    return this._path;
  }
  get bytesWritten() {
    return this._bytesWritten;
  }
};

// node_modules/@zenfs/core/dist/node/promises.js
var __addDisposableResource7 = function(env, value, async) {
  if (value !== null && value !== void 0) {
    if (typeof value !== "object" && typeof value !== "function") throw new TypeError("Object expected.");
    var dispose, inner;
    if (async) {
      if (!Symbol.asyncDispose) throw new TypeError("Symbol.asyncDispose is not defined.");
      dispose = value[Symbol.asyncDispose];
    }
    if (dispose === void 0) {
      if (!Symbol.dispose) throw new TypeError("Symbol.dispose is not defined.");
      dispose = value[Symbol.dispose];
      if (async) inner = dispose;
    }
    if (typeof dispose !== "function") throw new TypeError("Object not disposable.");
    if (inner) dispose = function() {
      try {
        inner.call(this);
      } catch (e) {
        return Promise.reject(e);
      }
    };
    env.stack.push({ value, dispose, async });
  } else if (async) {
    env.stack.push({ async: true });
  }
  return value;
};
var __disposeResources7 = /* @__PURE__ */ (function(SuppressedError2) {
  return function(env) {
    function fail(e) {
      env.error = env.hasError ? new SuppressedError2(e, env.error, "An error was suppressed during disposal.") : e;
      env.hasError = true;
    }
    var r, s = 0;
    function next() {
      while (r = env.stack.pop()) {
        try {
          if (!r.async && s === 1) return s = 0, env.stack.push(r), Promise.resolve().then(next);
          if (r.dispose) {
            var result = r.dispose.call(r.value);
            if (r.async) return s |= 2, Promise.resolve(result).then(next, function(e) {
              fail(e);
              return next();
            });
          } else s |= 1;
        } catch (e) {
          fail(e);
        }
      }
      if (s === 1) return env.hasError ? Promise.reject(env.error) : Promise.resolve();
      if (env.hasError) throw env.error;
    }
    return next();
  };
})(typeof SuppressedError === "function" ? SuppressedError : function(error2, suppressed, message) {
  var e = new Error(message);
  return e.name = "SuppressedError", e.error = error2, e.suppressed = suppressed, e;
});
async function* normalizeTransformResult(result) {
  if (result == null)
    return;
  if (typeof result == "string") {
    yield encodeUTF8(result);
    return;
  }
  if (result instanceof Uint8Array) {
    yield result;
    return;
  }
  if (ArrayBuffer.isView(result)) {
    yield new Uint8Array(result.buffer, result.byteOffset, result.byteLength);
    return;
  }
  if (result instanceof ArrayBuffer || typeof SharedArrayBuffer != "undefined" && result instanceof SharedArrayBuffer) {
    yield new Uint8Array(result);
    return;
  }
  if (typeof result[Symbol.asyncIterator] == "function" || typeof result[Symbol.iterator] == "function") {
    for await (const part of result)
      yield* normalizeTransformResult(part);
    return;
  }
  throw new TypeError("Invalid transform result");
}
async function* applyTransform(source, transform, signal) {
  const options = { signal };
  if (typeof transform == "function") {
    for await (const chunks of source) {
      signal?.throwIfAborted();
      const out2 = [];
      for await (const chunk of normalizeTransformResult(await transform(chunks, options)))
        out2.push(chunk);
      if (out2.length)
        yield out2;
    }
    const out = [];
    for await (const chunk of normalizeTransformResult(await transform(null, options)))
      out.push(chunk);
    if (out.length)
      yield out;
    return;
  }
  async function* withFlush() {
    for await (const chunks of source)
      yield chunks;
    yield null;
  }
  for await (const result of transform.transform(withFlush(), options)) {
    signal?.throwIfAborted();
    const out = [];
    for await (const chunk of normalizeTransformResult(result))
      out.push(chunk);
    if (out.length)
      yield out;
  }
}
var FileHandle = class {
  context;
  vfs;
  _fd;
  /** The file descriptor, or -1 once the handle has been closed */
  get fd() {
    return this._fd;
  }
  constructor(context, fd) {
    this.context = context;
    this._fd = fd;
    this.vfs = fromFD(context, fd);
  }
  _emitChange() {
    emitChange(this.context, "change", this.vfs.path);
  }
  /**
   * Asynchronous fchown(2) - Change ownership of a file.
   */
  async chown(uid, gid) {
    await this.vfs.chown(uid, gid);
    this._emitChange();
  }
  /**
   * Asynchronous fchmod(2) - Change permissions of a file.
   * @param mode A file mode. If a string is passed, it is parsed as an octal integer.
   */
  async chmod(mode) {
    const numMode = normalizeMode(mode, -1);
    if (numMode < 0)
      throw UV("EINVAL", "chmod", this.vfs.path);
    await this.vfs.chmod(numMode);
    this._emitChange();
  }
  /**
   * Asynchronous fdatasync(2) - synchronize a file's in-core state with storage device.
   */
  datasync() {
    return this.sync();
  }
  /**
   * Asynchronous fsync(2) - synchronize a file's in-core state with the underlying storage device.
   */
  async sync() {
    await this.vfs.sync();
  }
  /**
   * Asynchronous ftruncate(2) - Truncate a file to a specified length.
   * @param length If not specified, defaults to `0`.
   */
  async truncate(length = 0) {
    await this.vfs.truncate(length);
    this._emitChange();
  }
  /**
   * Asynchronously change file timestamps of the file.
   * @param atime The last access time. If a string is provided, it will be coerced to number.
   * @param mtime The last modified time. If a string is provided, it will be coerced to number.
   */
  async utimes(atime, mtime) {
    atime = normalizeTime(atime);
    mtime = normalizeTime(mtime);
    await this.vfs.utimes(atime, mtime);
    this._emitChange();
  }
  /**
   * Asynchronously append data to a file, creating the file if it does not exist. The underlying file will _not_ be closed automatically.
   * The `FileHandle` must have been opened for appending.
   * @param data The data to write. If something other than a `Buffer` or `Uint8Array` is provided, the value is coerced to a string.
   * @param _options Either the encoding for the file, or an object optionally specifying the encoding, file mode, and flag.
   * - `encoding` defaults to `'utf8'`.
   * - `mode` defaults to `0o666`.
   * - `flag` defaults to `'a'`.
   */
  async appendFile(data, _options = {}) {
    const options = normalizeOptions(_options, "utf8", "a", 420);
    const flag = parse2(options.flag);
    if (!(flag & O_APPEND))
      throw UV("EBADF", "write", this.vfs.path);
    const encodedData = typeof data == "string" ? import_buffer6.Buffer.from(data, options.encoding) : data;
    await this.vfs.write(encodedData, 0, encodedData.length);
    this._emitChange();
  }
  async read(buffer, offset, length, position) {
    if (typeof offset == "object" && offset != null) {
      position = offset.position;
      length = offset.length;
      offset = offset.offset;
    }
    if (!ArrayBuffer.isView(buffer) && typeof buffer == "object") {
      position = buffer.position;
      length = buffer.length;
      offset = buffer.offset;
      buffer = buffer.buffer;
    }
    if (position && position > Number.MAX_SAFE_INTEGER)
      throw UV("EINVAL");
    if (typeof position == "bigint")
      position = Number(position);
    position = Number.isSafeInteger(position) ? position : this.vfs.position;
    buffer ||= new Uint8Array(this.vfs.inode.size);
    offset ??= 0;
    const bytesRead = await this.vfs.read(buffer, offset, length ?? buffer.byteLength - offset, position);
    return { bytesRead, buffer };
  }
  async readFile(_options) {
    const options = normalizeOptions(_options, null, "r", 292);
    const flag = parse2(options.flag);
    if (flag & O_WRONLY)
      throw UV("EBADF", "read", this.vfs.path);
    const { size } = await this.stat();
    const data = new Uint8Array(size);
    await this.vfs.read(data, 0, size, 0);
    const buffer = import_buffer6.Buffer.from(data);
    return options.encoding ? buffer.toString(options.encoding) : buffer;
  }
  /**
   * Read file data using a `ReadableStream`.
   * The handle will not be closed automatically.
   */
  readableWebStream(options = {}) {
    if (this.vfs.isClosed)
      throw UV("EBADF", "readableWebStream", this.vfs.path);
    return this.vfs.streamRead(options);
  }
  /**
   * Not part of the Node.js API!
   *
   * Write file data using a `WritableStream`.
   * The handle will not be closed automatically.
   * @internal
   */
  writableWebStream(options = {}) {
    if (this.vfs.isClosed)
      throw UV("EBADF", "writableWebStream", this.vfs.path);
    if (this.vfs.inode.flags & InodeFlags.Immutable)
      throw UV("EPERM", "writableWebStream", this.vfs.path);
    return this.vfs.streamWrite(options);
  }
  /**
   * Creates a readline Interface object that allows reading the file line by line
   * @param options Options for creating a read stream
   * @returns A readline interface for reading the file line by line
   */
  readLines(options) {
    if (this.vfs.isClosed || this.vfs.flag & O_WRONLY)
      throw UV("EBADF", "read", this.vfs.path);
    return createInterface({ input: this.createReadStream(options), crlfDelay: Infinity });
  }
  [Symbol.asyncDispose]() {
    return this.close();
  }
  async stat(opts) {
    if (this.vfs.isClosed)
      throw UV("EBADF", "stat", this.vfs.path);
    if (checkAccess && !hasAccess(this.context, this.vfs.inode, R_OK))
      throw UV("EACCES", "stat", this.vfs.path);
    return opts?.bigint ? new BigIntStats(this.vfs.inode) : new Stats(this.vfs.inode);
  }
  /**
   * Asynchronously writes `string` to the file.
   * The `FileHandle` must have been opened for writing.
   * It is unsafe to call `write()` multiple times on the same file without waiting for the `Promise`
   * to be resolved (or rejected). For this scenario, `createWriteStream` is strongly recommended.
   */
  async write(data, options, lenOrEnc, position) {
    let buffer, offset, length;
    if (typeof options == "object" && options != null) {
      lenOrEnc = options.length;
      position = options.position;
      options = options.offset;
    }
    if (typeof data === "string") {
      position = typeof options === "number" ? options : null;
      offset = 0;
      buffer = import_buffer6.Buffer.from(data, typeof lenOrEnc === "string" ? lenOrEnc : "utf8");
      length = buffer.length;
    } else {
      buffer = new Uint8Array(data.buffer, data.byteOffset, data.byteLength);
      offset = options ?? 0;
      length = typeof lenOrEnc == "number" ? lenOrEnc : buffer.byteLength;
      position = typeof position === "number" ? position : null;
    }
    position ??= this.vfs.position;
    const bytesWritten = await this.vfs.write(buffer, offset, length, position);
    this._emitChange();
    return { buffer: data, bytesWritten };
  }
  /**
   * Asynchronously writes data to a file, replacing the file if it already exists. The underlying file will _not_ be closed automatically.
   * The `FileHandle` must have been opened for writing.
   * It is unsafe to call `writeFile()` multiple times on the same file without waiting for the `Promise` to be resolved (or rejected).
   * @param data The data to write. If something other than a `Buffer` or `Uint8Array` is provided, the value is coerced to a string.
   * @param _options Either the encoding for the file, or an object optionally specifying the encoding, file mode, and flag.
   * - `encoding` defaults to `'utf8'`.
   * - `mode` defaults to `0o666`.
   * - `flag` defaults to `'w'`.
   */
  async writeFile(data, _options = {}) {
    const options = normalizeOptions(_options, "utf8", "w", 420);
    const flag = parse2(options.flag);
    if (!(flag & O_WRONLY || flag & O_RDWR))
      throw UV("EBADF", "writeFile", this.vfs.path);
    const encodedData = typeof data == "string" ? import_buffer6.Buffer.from(data, options.encoding) : data;
    await this.vfs.write(encodedData, 0, encodedData.length, 0);
    this._emitChange();
  }
  /**
   * Asynchronous close(2) - close a `FileHandle`.
   */
  async close() {
    await this.vfs.close();
    deleteFD(this.context, this._fd);
    this._fd = -1;
  }
  /**
   * Asynchronous `writev`. Writes from multiple buffers.
   * @param buffers An array of Uint8Array buffers.
   * @param position The position in the file where to begin writing.
   * @returns The number of bytes written.
   */
  async writev(buffers, position) {
    if (typeof position == "number")
      this.vfs.position = position;
    let bytesWritten = 0;
    for (const buffer of buffers) {
      bytesWritten += (await this.write(buffer)).bytesWritten;
    }
    return { bytesWritten, buffers };
  }
  /**
   * Asynchronous `readv`. Reads into multiple buffers.
   * @param buffers An array of Uint8Array buffers.
   * @param position The position in the file where to begin reading.
   * @returns The number of bytes read.
   */
  async readv(buffers, position) {
    if (typeof position == "number")
      this.vfs.position = position;
    let bytesRead = 0;
    for (const buffer of buffers) {
      bytesRead += (await this.read(buffer)).bytesRead;
    }
    return { bytesRead, buffers };
  }
  /**
   * Creates a stream for reading from the file.
   * @param options Options for the readable stream
   */
  createReadStream(options = {}) {
    validateFD(this._fd);
    if (this.vfs.isClosed || this.vfs.flag & O_WRONLY)
      throw UV("EBADF", "createReadStream", this.vfs.path);
    return new ReadStream(options, this);
  }
  /**
   * Creates a stream for writing to the file.
   * @param options Options for the writeable stream.
   */
  createWriteStream(options = {}) {
    validateFD(this._fd);
    if (this.vfs.isClosed)
      throw UV("EBADF", "createWriteStream", this.vfs.path);
    if (this.vfs.inode.flags & InodeFlags.Immutable)
      throw UV("EPERM", "createWriteStream", this.vfs.path);
    if (this.vfs.fs.attributes.has("readonly"))
      throw UV("EROFS", "createWriteStream", this.vfs.path);
    return new WriteStream(options, this);
  }
  pull(...args) {
    if (this.vfs.isClosed || this.vfs.flag & O_WRONLY)
      throw UV("EBADF", "read", this.vfs.path);
    const last = args.at(-1);
    const hasOptions = last != null && typeof last == "object" && typeof last.transform != "function";
    const options = hasOptions ? args.pop() : {};
    const transforms = args;
    const { autoClose, start, limit, chunkSize = 131072, signal } = options;
    const handle = this;
    async function* source() {
      let position = typeof start == "number" ? start : 0;
      let remaining = typeof limit == "number" ? limit : Infinity;
      try {
        while (remaining > 0) {
          signal?.throwIfAborted();
          const size = Math.min(chunkSize, remaining);
          const buffer = new Uint8Array(size);
          const bytesRead = await handle.vfs.read(buffer, 0, size, position);
          if (bytesRead <= 0)
            break;
          position += bytesRead;
          remaining -= bytesRead;
          yield [buffer.subarray(0, bytesRead)];
        }
      } finally {
        if (autoClose)
          await handle.close();
      }
    }
    let stream = source();
    for (const transform of transforms)
      stream = applyTransform(stream, transform, signal);
    return stream;
  }
  /**
   * Return a `node:stream/iter` writer backed by this file handle.
   * @experimental
   */
  writer(options = {}) {
    if (this.vfs.isClosed)
      throw UV("EBADF", "write", this.vfs.path);
    if (this.vfs.inode.flags & InodeFlags.Immutable)
      throw UV("EPERM", "write", this.vfs.path);
    if (this.vfs.fs.attributes.has("readonly"))
      throw UV("EROFS", "write", this.vfs.path);
    const { autoClose, start, limit, chunkSize = 131072 } = options;
    const handle = this;
    let position = typeof start == "number" ? start : handle.vfs.position;
    let written = 0;
    let failed = false;
    let done = false;
    async function finish() {
      if (done)
        return;
      done = true;
      if (autoClose)
        await handle.close();
    }
    const toBuffer = (chunk) => typeof chunk == "string" ? import_buffer6.Buffer.from(chunk, "utf8") : new Uint8Array(chunk.buffer, chunk.byteOffset, chunk.byteLength);
    async function writeChunk(chunk) {
      const buffer = toBuffer(chunk);
      if (typeof limit == "number" && written + buffer.byteLength > limit) {
        throw new RangeError(`Writer limit of ${limit} bytes exceeded`);
      }
      const bytesWritten = await handle.vfs.write(buffer, 0, buffer.byteLength, position);
      position += bytesWritten;
      written += bytesWritten;
      handle._emitChange();
    }
    return {
      get desiredSize() {
        if (failed)
          return null;
        return typeof limit == "number" ? Math.max(0, limit - written) : chunkSize;
      },
      async write(chunk, opts) {
        opts?.signal?.throwIfAborted();
        await writeChunk(chunk);
      },
      async writev(chunks, opts) {
        opts?.signal?.throwIfAborted();
        for (const chunk of chunks)
          await writeChunk(chunk);
      },
      writeSync() {
        throw UV("ENOSYS", "writeSync", handle.vfs.path);
      },
      writevSync() {
        throw UV("ENOSYS", "writevSync", handle.vfs.path);
      },
      async end() {
        await finish();
        return written;
      },
      endSync() {
        throw UV("ENOSYS", "endSync", handle.vfs.path);
      },
      fail() {
        failed = true;
        void finish();
      },
      [Symbol.dispose]() {
        failed = true;
        void finish();
      },
      async [Symbol.asyncDispose]() {
        await finish();
      }
    };
  }
};
async function rename3(oldPath, newPath) {
  await rename2.call(this, oldPath, newPath);
}
async function exists(path) {
  path = normalizePath(path);
  try {
    const { fs, path: resolved } = await resolve3(this, path);
    return await fs.exists(resolved);
  } catch (e) {
    if (e instanceof Exception && e.code == "ENOENT") {
      return false;
    }
    throw e;
  }
}
async function stat3(path, options) {
  let stats;
  try {
    stats = await stat2.call(this, path, false);
  } catch (e) {
    if (options?.throwIfNoEntry === false && _isNoEntry(e))
      return;
    throw e;
  }
  return options?.bigint ? new BigIntStats(stats) : new Stats(stats);
}
async function lstat(path, options) {
  const stats = await stat2.call(this, path, true);
  return options?.bigint ? new BigIntStats(stats) : new Stats(stats);
}
async function truncate(path, len = 0) {
  const env_1 = { stack: [], error: void 0, hasError: false };
  try {
    const handle = __addDisposableResource7(env_1, await open3.call(this, path, "r+"), true);
    await handle.truncate(len);
  } catch (e_1) {
    env_1.error = e_1;
    env_1.hasError = true;
  } finally {
    const result_1 = __disposeResources7(env_1);
    if (result_1)
      await result_1;
  }
}
async function unlink(path) {
  const env_2 = { stack: [], error: void 0, hasError: false };
  try {
    path = normalizePath(path);
    const { fs, path: resolved } = resolveMount(path, this);
    const $ex = { syscall: "unlink", path };
    const stats = await fs.stat(resolved).catch(rethrow($ex));
    if (checkAccess && !hasAccess(this, stats, W_OK))
      throw UV("EACCES", $ex);
    const _ = __addDisposableResource7(env_2, await lockPath(fs, dirname(resolved), "rw"), false);
    await fs.unlink(resolved).catch(rethrow($ex));
    cacheOf(fs).remove(resolved);
    emitChange(this, "rename", path.toString());
  } catch (e_2) {
    env_2.error = e_2;
    env_2.hasError = true;
  } finally {
    __disposeResources7(env_2);
  }
}
async function open3(path, flag = "r", mode = 420) {
  const handle = await open2(this, path, { flag, mode });
  return new FileHandle(this, toFD(handle));
}
async function readFile(path, _options) {
  const env_3 = { stack: [], error: void 0, hasError: false };
  try {
    const options = normalizeOptions(_options, null, "r", 292);
    const handle = __addDisposableResource7(env_3, typeof path == "object" && "fd" in path ? path : await open3.call(this, path, options.flag, options.mode), true);
    return await handle.readFile(options);
  } catch (e_3) {
    env_3.error = e_3;
    env_3.hasError = true;
  } finally {
    const result_2 = __disposeResources7(env_3);
    if (result_2)
      await result_2;
  }
}
async function writeFile(path, data, _options) {
  const env_4 = { stack: [], error: void 0, hasError: false };
  try {
    const options = normalizeOptions(_options, "utf8", "w+", 420);
    const handle = __addDisposableResource7(env_4, path instanceof FileHandle ? path : await open3.call(this, path.toString(), options.flag, options.mode), true);
    const _data = typeof data == "string" ? data : data instanceof DataView ? new Uint8Array(data.buffer, data.byteOffset, data.byteLength) : data;
    if (typeof _data != "string" && !(_data instanceof Uint8Array))
      throw new TypeError('The "data" argument must be of type string or an instance of Buffer, TypedArray, or DataView. Received ' + typeof data);
    await handle.writeFile(_data, options);
  } catch (e_4) {
    env_4.error = e_4;
    env_4.hasError = true;
  } finally {
    const result_3 = __disposeResources7(env_4);
    if (result_3)
      await result_3;
  }
}
async function appendFile(path, data, _options) {
  const env_5 = { stack: [], error: void 0, hasError: false };
  try {
    const options = normalizeOptions(_options, "utf8", "a", 420);
    const flag = parse2(options.flag);
    const $ex = { syscall: "write", path: path instanceof FileHandle ? path["vfs"].path : path.toString() };
    if (!(flag & O_APPEND))
      throw UV("EBADF", $ex);
    if (typeof data != "string" && !ArrayBuffer.isView(data))
      throw new TypeError('The "data" argument must be of type string or an instance of Buffer, TypedArray, or DataView. Received ' + typeof data);
    const encodedData = typeof data == "string" ? import_buffer6.Buffer.from(data, options.encoding) : new Uint8Array(data.buffer, data.byteOffset, data.byteLength);
    const handle = __addDisposableResource7(env_5, typeof path == "object" && "fd" in path ? path : await open3.call(this, path, options.flag, options.mode), true);
    await handle.appendFile(encodedData, options);
  } catch (e_5) {
    env_5.error = e_5;
    env_5.hasError = true;
  } finally {
    const result_4 = __disposeResources7(env_5);
    if (result_4)
      await result_4;
  }
}
async function rmdir(path) {
  const env_6 = { stack: [], error: void 0, hasError: false };
  try {
    path = normalizePath(path);
    const { fs, path: resolved } = await resolve3(this, path);
    const $ex = { syscall: "rmdir", path };
    const stats = await fs.stat(resolved).catch(rethrow($ex));
    if (!stats)
      throw UV("ENOENT", $ex);
    if (!isDirectory(stats))
      throw UV("ENOTDIR", $ex);
    if (checkAccess && !hasAccess(this, stats, W_OK))
      throw UV("EACCES", $ex);
    const _ = __addDisposableResource7(env_6, await lockPath(fs, dirname(resolved), "rw"), false);
    await fs.rmdir(resolved).catch(rethrow($ex));
    cacheOf(fs).remove(resolved);
    emitChange(this, "rename", path.toString());
  } catch (e_6) {
    env_6.error = e_6;
    env_6.hasError = true;
  } finally {
    __disposeResources7(env_6);
  }
}
async function mkdir3(path, options) {
  options = typeof options === "object" ? options : { mode: options };
  const mode = normalizeMode(options?.mode, 511);
  return await mkdir2.call(this, path, { ...options, mode });
}
async function readdir2(path, options) {
  path = normalizePath(path);
  const opt = typeof options === "object" && options != null ? options : { encoding: options, withFileTypes: false, recursive: false };
  const rawEntries = await readdir3.call(this, path, opt);
  const values = [];
  for (const entry of rawEntries) {
    if (opt.withFileTypes) {
      values.push(Dirent2.from(entry, opt.encoding, path));
    } else if (opt.encoding == "buffer") {
      values.push(import_buffer6.Buffer.from(entry.path));
    } else {
      values.push(entry.path);
    }
  }
  return values;
}
async function link3(path, dest) {
  return await link2.call(this, path, dest);
}
async function symlink(dest, path, type = "file") {
  const env_7 = { stack: [], error: void 0, hasError: false };
  try {
    if (!["file", "dir", "junction"].includes(type))
      throw new TypeError("Invalid symlink type: " + type);
    path = normalizePath(path);
    if (await exists.call(this, path))
      throw UV("EEXIST", "symlink", path);
    const handle = __addDisposableResource7(env_7, await open2(this, path, { flag: "w+", mode: 420, preserveSymlinks: true }), true);
    const encoded = encodeUTF8(normalizePath(dest, true));
    await handle.write(encoded, 0, encoded.length, 0);
    await handle.chmod(S_IFLNK);
  } catch (e_7) {
    env_7.error = e_7;
    env_7.hasError = true;
  } finally {
    const result_5 = __disposeResources7(env_7);
    if (result_5)
      await result_5;
  }
}
async function readlink3(path, options) {
  path = normalizePath(path);
  const buf = import_buffer6.Buffer.from(await readlink2.call(this, path), "utf-8");
  const encoding = typeof options == "object" ? options?.encoding : options;
  return encoding == "buffer" ? buf : buf.toString(encoding ?? "utf-8");
}
async function chown(path, uid, gid) {
  const env_8 = { stack: [], error: void 0, hasError: false };
  try {
    const handle = __addDisposableResource7(env_8, await open3.call(this, path, "r+"), true);
    await handle.chown(uid, gid);
  } catch (e_8) {
    env_8.error = e_8;
    env_8.hasError = true;
  } finally {
    const result_6 = __disposeResources7(env_8);
    if (result_6)
      await result_6;
  }
}
async function lchown(path, uid, gid) {
  const env_9 = { stack: [], error: void 0, hasError: false };
  try {
    const handle = __addDisposableResource7(env_9, await open2(this, path, {
      flag: "r+",
      mode: 420,
      preserveSymlinks: true,
      allowDirectory: true
    }), true);
    await handle.chown(uid, gid);
  } catch (e_9) {
    env_9.error = e_9;
    env_9.hasError = true;
  } finally {
    const result_7 = __disposeResources7(env_9);
    if (result_7)
      await result_7;
  }
}
async function chmod(path, mode) {
  const env_10 = { stack: [], error: void 0, hasError: false };
  try {
    const handle = __addDisposableResource7(env_10, await open3.call(this, path, "r+").catch(rethrow({ syscall: "chmod", path: normalizePath(path) })), true);
    await handle.chmod(mode);
  } catch (e_10) {
    env_10.error = e_10;
    env_10.hasError = true;
  } finally {
    const result_8 = __disposeResources7(env_10);
    if (result_8)
      await result_8;
  }
}
async function lchmod(path, mode) {
  const env_11 = { stack: [], error: void 0, hasError: false };
  try {
    mode = normalizeMode(mode);
    const handle = __addDisposableResource7(env_11, await open2(this, path, {
      flag: "r+",
      mode: 420,
      preserveSymlinks: true,
      allowDirectory: true
    }), true);
    await handle.chmod(mode);
  } catch (e_11) {
    env_11.error = e_11;
    env_11.hasError = true;
  } finally {
    const result_9 = __disposeResources7(env_11);
    if (result_9)
      await result_9;
  }
}
async function utimes(path, atime, mtime) {
  const env_12 = { stack: [], error: void 0, hasError: false };
  try {
    const handle = __addDisposableResource7(env_12, await open2(this, path, {
      flag: "r+",
      allowDirectory: true
    }), true);
    await handle.utimes(normalizeTime(atime), normalizeTime(mtime));
  } catch (e_12) {
    env_12.error = e_12;
    env_12.hasError = true;
  } finally {
    const result_10 = __disposeResources7(env_12);
    if (result_10)
      await result_10;
  }
}
async function lutimes(path, atime, mtime) {
  const env_13 = { stack: [], error: void 0, hasError: false };
  try {
    const handle = __addDisposableResource7(env_13, await open2(this, path, {
      flag: "r+",
      mode: 420,
      preserveSymlinks: true,
      allowDirectory: true
    }), true);
    await handle.utimes(normalizeTime(atime), normalizeTime(mtime));
  } catch (e_13) {
    env_13.error = e_13;
    env_13.hasError = true;
  } finally {
    const result_11 = __disposeResources7(env_13);
    if (result_11)
      await result_11;
  }
}
async function realpath(path, options) {
  const encoding = typeof options == "string" ? options : options?.encoding ?? "utf8";
  path = normalizePath(path);
  const { fullPath } = await resolve3(this, path);
  if (encoding == "utf8" || encoding == "utf-8")
    return fullPath;
  const buf = import_buffer6.Buffer.from(fullPath, "utf-8");
  if (encoding == "buffer")
    return buf;
  return buf.toString(encoding);
}
function watch(filename, options = {}) {
  const opts = typeof options !== "string" ? options : { encoding: options };
  const watcher = new FSWatcher(this, filename.toString(), opts);
  const eventQueue = [];
  let done = false;
  watcher.on("change", (eventType, filename2) => {
    eventQueue.shift()?.({ value: { eventType, filename: filename2 }, done: false });
  });
  function cleanup() {
    done = true;
    watcher.close();
    opts.signal?.removeEventListener("abort", cleanup);
    for (const resolve4 of eventQueue) {
      resolve4({ value: null, done });
    }
    eventQueue.length = 0;
    return Promise.resolve({ value: void 0, done: true });
  }
  if (opts.signal?.aborted)
    void cleanup();
  else
    opts.signal?.addEventListener("abort", cleanup, { once: true });
  return {
    async next() {
      if (done)
        return Promise.resolve({ value: void 0, done });
      const { promise, resolve: resolve4 } = Promise.withResolvers();
      eventQueue.push(resolve4);
      return promise;
    },
    return: cleanup,
    throw: cleanup,
    async [Symbol.asyncDispose]() {
      await cleanup();
    },
    [Symbol.asyncIterator]() {
      return this;
    }
  };
}
async function access(path, mode = F_OK) {
  if (!checkAccess)
    return;
  const stats = await stat3.call(this, path);
  if (!stats.hasAccess(mode, this))
    throw UV("EACCES", "access", path.toString());
}
async function rm(path, options) {
  path = normalizePath(path);
  const stats = await lstat.call(this, path).catch((error2) => {
    if (error2.code == "ENOENT" && options?.force)
      return void 0;
    throw error2;
  });
  if (!stats)
    return;
  switch (stats.mode & S_IFMT) {
    case S_IFDIR:
      if (options?.recursive) {
        for (const entry of await readdir2.call(this, path)) {
          await rm.call(this, join(path, entry), options);
        }
      }
      await rmdir.call(this, path);
      break;
    case S_IFREG:
    case S_IFLNK:
    case S_IFBLK:
    case S_IFCHR:
      await unlink.call(this, path);
      break;
    case S_IFIFO:
    case S_IFSOCK:
    default:
      throw UV("ENOSYS", "rm", path);
  }
}
async function mkdtemp(prefix, options) {
  const encoding = typeof options === "object" ? options?.encoding : options || "utf8";
  const path = _tempDirName(prefix);
  await mkdir3.call(this, path);
  return encoding == "buffer" ? import_buffer6.Buffer.from(path) : path;
}
async function mkdtempDisposable(prefix, options) {
  const path = _tempDirName(prefix);
  await mkdir3.call(this, path);
  const remove3 = () => rm(path, { recursive: true, force: true });
  return { path, remove: remove3, [Symbol.asyncDispose]: remove3 };
}
async function copyFile(src, dest, mode) {
  src = normalizePath(src);
  dest = normalizePath(dest);
  if (mode && mode & COPYFILE_EXCL && await exists.call(this, dest))
    throw UV("EEXIST", "copyFile", dest);
  await writeFile.call(this, dest, await readFile.call(this, src));
  emitChange(this, "rename", dest.toString());
}
function opendir(path, options) {
  path = normalizePath(path);
  return Promise.resolve(new Dir(path, this));
}
async function cp(source, destination, opts) {
  source = normalizePath(source);
  destination = normalizePath(destination);
  const srcStats = await lstat.call(this, source);
  if (opts?.errorOnExist && await exists.call(this, destination))
    throw UV("EEXIST", "cp", destination);
  switch (srcStats.mode & S_IFMT) {
    case S_IFDIR: {
      if (!opts?.recursive)
        throw UV("EISDIR", "cp", source);
      const [entries2] = await Promise.all(
        [
          readdir2.call(this, source, { withFileTypes: true }),
          mkdir3.call(this, destination, { recursive: true })
        ]
        // Ensure the destination directory exists
      );
      const _cp = async (dirent) => {
        if (opts.filter && !opts.filter(join(source, dirent.name), join(destination, dirent.name))) {
          return;
        }
        await cp.call(this, join(source, dirent.name), join(destination, dirent.name), opts);
      };
      await Promise.all(entries2.map(_cp));
      break;
    }
    case S_IFLNK:
      if (opts?.dereference) {
        await copyFile.call(this, source, destination);
      } else {
        const link5 = await readlink3.call(this, source);
        await symlink.call(this, opts?.verbatimSymlinks ? link5 : resolve.call(this, dirname(source), link5), destination);
      }
      break;
    case S_IFREG:
      await copyFile.call(this, source, destination);
      break;
    case S_IFBLK:
    case S_IFCHR:
    case S_IFIFO:
    case S_IFSOCK:
    default:
      throw UV("ENOSYS", "cp", source);
  }
  if (opts?.preserveTimestamps) {
    await utimes.call(this, destination, srcStats.atime, srcStats.mtime);
  }
}
async function statfs(path, opts) {
  path = normalizePath(path);
  const { fs } = resolveMount(path, this);
  return Promise.resolve(_statfs(fs, opts?.bigint));
}
function glob(pattern2, opt) {
  pattern2 = Array.isArray(pattern2) ? pattern2 : [pattern2];
  const $ = contextOf(this);
  const { cwd = $.pwd, withFileTypes = false, exclude = () => false, followSymlinks = false } = opt || {};
  const base = resolve.call($, cwd instanceof URL ? cwd.pathname : cwd);
  const normalizedPatterns = pattern2.map((p) => p.startsWith("/") ? relative.call($, base, p) : p);
  const hasGlobStar = normalizedPatterns.some((p) => p.includes("**"));
  const patternBases = normalizedPatterns.map((p) => {
    const firstGlob = p.search(/[*?[\]{]/);
    if (firstGlob === -1)
      return p;
    const lastSlash = p.lastIndexOf("/", firstGlob);
    return lastSlash === -1 ? "" : p.slice(0, lastSlash);
  });
  const regexPatterns = normalizedPatterns.map(globToRegex);
  async function shouldDescend(path, relativePath) {
    const isNamed = patternBases.some((base2) => relativePath === base2 || base2.startsWith(relativePath + "/"));
    const inScope = hasGlobStar || isNamed;
    const stats = await lstat.call($, path);
    if (!stats.isSymbolicLink())
      return inScope && stats.isDirectory();
    return inScope && (followSymlinks || isNamed) && !!(await stat3.call($, path, { throwIfNoEntry: false }))?.isDirectory();
  }
  async function* recursiveList(dir) {
    const entries2 = await readdir2.call($, dir, { withFileTypes, encoding: "utf8" });
    for (const entry of entries2) {
      const fullPath = join(dir, withFileTypes ? entry.name : entry);
      const relPath = relative.call($, base, fullPath);
      if (typeof exclude != "function" ? exclude.some((p) => matchesGlob(p, relPath)) : exclude(withFileTypes ? entry : relPath))
        continue;
      if (await shouldDescend(fullPath, relPath))
        yield* recursiveList(fullPath);
      if (regexPatterns.some((rx) => rx.test(relPath))) {
        yield withFileTypes ? entry : relPath;
      }
    }
  }
  return recursiveList(base);
}

// node_modules/@zenfs/core/dist/config.js
function configureFileSystem(fs, config) {
  if (config.disableAsyncCache)
    fs.attributes.set("no_async_preload");
  if (config.caseFold)
    fs.attributes.set("case_fold", config.caseFold);
}
function isMountConfig(arg) {
  return isBackendConfig(arg) || isBackend(arg) || arg instanceof FileSystem;
}
async function resolveMountConfig(configuration, _depth = 0) {
  if (typeof configuration !== "object" || configuration == null) {
    throw log_exports.err(withErrno("EINVAL", "Invalid options on mount configuration"));
  }
  if (!isMountConfig(configuration)) {
    throw log_exports.err(withErrno("EINVAL", "Invalid mount configuration"));
  }
  if (configuration instanceof FileSystem) {
    await configuration.ready();
    return configuration;
  }
  if (isBackend(configuration)) {
    configuration = { backend: configuration };
  }
  for (const [key, value] of Object.entries(configuration)) {
    if (key == "backend")
      continue;
    if (!isMountConfig(value))
      continue;
    log_exports.info("Resolving nested mount configuration: " + key);
    if (_depth > 10) {
      throw log_exports.err(withErrno("EINVAL", "Invalid configuration, too deep and possibly infinite"));
    }
    configuration[key] = await resolveMountConfig(value, ++_depth);
  }
  const { backend } = configuration;
  if (typeof backend.isAvailable == "function" && !await backend.isAvailable(configuration)) {
    throw log_exports.err(withErrno("EPERM", "Backend not available: " + backend.name));
  }
  checkOptions(backend, configuration);
  const mount2 = await backend.create(configuration);
  configureFileSystem(mount2, configuration);
  await mount2.ready();
  return mount2;
}
async function mountWithMkdir(path, fs) {
  if (path == "/") {
    mount(path, fs);
    return;
  }
  const stats = await stat3(path).catch(() => null);
  if (!stats) {
    await mkdir3(path, { recursive: true });
  } else if (!stats.isDirectory()) {
    throw withErrno("ENOTDIR", "Missing directory at mount point: " + path);
  }
  mount(path, fs);
}
var _defaultDirectories = ["/tmp", "/var", "/etc"];
async function configure2(configuration) {
  Object.assign(defaultContext.credentials, createCredentials({
    uid: configuration.uid || 0,
    gid: configuration.gid || 0
  }));
  _setAccessChecks(!configuration.disableAccessChecks);
  if (configuration.log)
    log_exports.configure(configuration.log);
  if (configuration.mounts) {
    for (const [_point, mountConfig] of Object.entries(configuration.mounts).sort(([a], [b]) => a.length > b.length ? 1 : -1)) {
      const point = _point.startsWith("/") ? _point : "/" + _point;
      if (isBackendConfig(mountConfig)) {
        mountConfig.disableAsyncCache ??= configuration.disableAsyncCache || false;
        mountConfig.caseFold ??= configuration.caseFold;
      }
      if (point == "/")
        umount("/");
      await mountWithMkdir(point, await resolveMountConfig(mountConfig));
    }
  }
  for (const fs of mounts.values()) {
    configureFileSystem(fs, configuration);
  }
  if (configuration.addDevices && !mounts.has("/dev")) {
    const devfs = new DeviceFS();
    devfs.addDefaults();
    await devfs.ready();
    await mountWithMkdir("/dev", devfs);
  }
  if (configuration.defaultDirectories) {
    for (const dir of _defaultDirectories) {
      if (await exists(dir)) {
        const stats = await stat3(dir);
        if (!stats.isDirectory())
          log_exports.warn("Default directory exists but is not a directory: " + dir);
      } else
        await mkdir3(dir);
    }
  }
}

// node_modules/@zenfs/core/dist/backends/cow.js
var journalOperations = /* @__PURE__ */ new Set(["delete"]);
var maxOpLength = Math.max(...[...journalOperations].map((op) => op.length));

// node_modules/@zenfs/core/dist/internal/index_fs.js
var IndexFS = class extends FileSystem {
  index;
  constructor(id, name, index = new Index()) {
    super(id, name);
    this.index = index;
  }
  usage() {
    return this.index.usage();
  }
  /**
   * Finds all the paths in the index that need to be moved for a rename
   */
  pathsForRename(oldPath, newPath) {
    if (!this.index.has(oldPath))
      throw withErrno("ENOENT");
    if ((dirname(newPath) + "/").startsWith(oldPath + "/"))
      throw withErrno("EBUSY");
    const toRename = [];
    for (const [from2, inode] of this.index.entries()) {
      const rel = relative(oldPath, from2);
      if (rel.startsWith(".."))
        continue;
      let to = join(newPath, rel);
      if (to.endsWith("/"))
        to = to.slice(0, -1);
      toRename.push({ from: from2, to, inode });
    }
    toRename.sort((a, b) => b.from.length - a.from.length);
    return toRename;
  }
  async rename(oldPath, newPath) {
    if (oldPath == newPath)
      return;
    const toRename = this.pathsForRename(oldPath, newPath);
    const contents = /* @__PURE__ */ new Map();
    for (const { from: from2, to, inode } of toRename) {
      const data = new Uint8Array(inode.size);
      await this.read(from2, data, 0, inode.size);
      contents.set(to, data);
      this.index.delete(from2);
      await this.remove(from2);
      if (this.index.has(to))
        await this.remove(to);
    }
    toRename.reverse();
    for (const { to, inode } of toRename) {
      const data = contents.get(to);
      this.index.set(to, inode);
      if ((inode.mode & S_IFMT) == S_IFDIR)
        await this._mkdir?.(to, inode);
      else
        await this.write(to, data, 0);
    }
  }
  renameSync(oldPath, newPath) {
    if (oldPath == newPath)
      return;
    const toRename = this.pathsForRename(oldPath, newPath);
    const contents = /* @__PURE__ */ new Map();
    for (const { from: from2, to, inode } of toRename) {
      const data = new Uint8Array(inode.size);
      this.readSync(from2, data, 0, inode.size);
      contents.set(to, data);
      this.index.delete(from2);
      this.removeSync(from2);
      if (this.index.has(to))
        this.removeSync(to);
    }
    toRename.reverse();
    for (const { to, inode } of toRename) {
      const data = contents.get(to);
      this.index.set(to, inode);
      if ((inode.mode & S_IFMT) == S_IFDIR)
        this._mkdirSync?.(to, inode);
      else
        this.writeSync(to, data, 0);
    }
  }
  async stat(path) {
    const inode = this.index.get(path);
    if (!inode)
      throw withErrno("ENOENT");
    return new Inode(inode);
  }
  statSync(path) {
    const inode = this.index.get(path);
    if (!inode)
      throw withErrno("ENOENT");
    return new Inode(inode);
  }
  async touch(path, metadata) {
    const inode = this.index.get(path) ?? _throw(withErrno("ENOENT"));
    inode.update(metadata);
  }
  touchSync(path, metadata) {
    const inode = this.index.get(path) ?? _throw(withErrno("ENOENT"));
    inode.update(metadata);
  }
  _remove(path, isUnlink) {
    const inode = this.index.get(path);
    if (!inode)
      throw withErrno("ENOENT");
    const isDir = (inode.mode & S_IFMT) == S_IFDIR;
    if (!isDir && !isUnlink)
      throw withErrno("ENOTDIR");
    if (isDir && isUnlink)
      throw withErrno("EISDIR");
    if (!isDir)
      this.index.delete(path);
  }
  async unlink(path) {
    this._remove(path, true);
    await this.remove(path);
  }
  unlinkSync(path) {
    this._remove(path, true);
    this.removeSync(path);
  }
  async rmdir(path) {
    this._remove(path, false);
    const entries2 = await this.readdir(path);
    if (entries2.length)
      throw withErrno("ENOTEMPTY");
    this.index.delete(path);
    await this.remove(path);
  }
  rmdirSync(path) {
    this._remove(path, false);
    if (this.readdirSync(path).length)
      throw withErrno("ENOTEMPTY");
    this.index.delete(path);
    this.removeSync(path);
  }
  create(path, options) {
    if (this.index.has(path))
      throw withErrno("EEXIST");
    const parent = this.index.get(dirname(path));
    if (!parent)
      throw withErrno("ENOENT");
    const id = this.index._alloc();
    const inode = new Inode({
      ino: id,
      data: id + 1,
      mode: options.mode,
      size: 0,
      uid: parent.mode & S_ISUID ? parent.uid : options.uid,
      gid: parent.mode & S_ISGID ? parent.gid : options.gid,
      nlink: 1
    });
    this.index.set(path, inode);
    return inode;
  }
  async createFile(path, options) {
    return this.create(path, { ...options, mode: options.mode | S_IFREG });
  }
  createFileSync(path, options) {
    return this.create(path, { ...options, mode: options.mode | S_IFREG });
  }
  async mkdir(path, options) {
    options = { ...options, mode: options.mode | S_IFDIR };
    const inode = this.create(path, options);
    await this._mkdir?.(path, options);
    return inode;
  }
  mkdirSync(path, options) {
    options = { ...options, mode: options.mode | S_IFDIR };
    const inode = this.create(path, options);
    this._mkdirSync?.(path, options);
    return inode;
  }
  link(target, link5) {
    throw withErrno("ENOSYS");
  }
  linkSync(target, link5) {
    throw withErrno("ENOSYS");
  }
  async readdir(path) {
    return Object.keys(this.index.directoryEntries(path));
  }
  readdirSync(path) {
    return Object.keys(this.index.directoryEntries(path));
  }
  async sync() {
  }
  syncSync() {
  }
};

// node_modules/@zenfs/core/dist/internal/rpc.js
function isPort(port) {
  return port != null && typeof port == "object" && "channel" in port && "send" in port && "addHandler" in port && "removeHandler" in port;
}
function fromWeb(port) {
  const _handlers = /* @__PURE__ */ new Map();
  return {
    channel: port,
    send: port.postMessage.bind(port),
    addHandler(handler) {
      const _handler = (event) => handler(event.data);
      _handlers.set(handler, _handler);
      port.addEventListener("message", _handler);
    },
    removeHandler(handler) {
      port.removeEventListener("message", _handlers.get(handler));
    }
  };
}
function fromNode(port) {
  return {
    channel: port,
    send: port.postMessage.bind(port),
    addHandler: port.on.bind(port, "message"),
    removeHandler: port.off.bind(port, "message")
  };
}
function fromWebSocket(ws) {
  return {
    channel: ws,
    send(message) {
      ws.send(encodeMessage(message));
    },
    addHandler(handler) {
      ws.addEventListener("message", (event) => {
        handler(decodeMessage(event.data));
      });
    },
    removeHandler(handler) {
      ws.removeEventListener("message", (event) => {
        handler(decodeMessage(event.data));
      });
    }
  };
}
function from(port) {
  if (isPort(port))
    return port;
  if (port instanceof WebSocket)
    return fromWebSocket(port);
  if ("on" in port)
    return fromNode(port);
  if ("addEventListener" in port)
    return fromWeb(port);
  throw err(withErrno("EINVAL", "Invalid port type"));
}
var encodingVersion = 1;
function encodeMessage(message) {
  return `Z${encodingVersion}${JSON.stringify(message, (key, value) => {
    if (key == "_zenfs")
      return;
    return value instanceof Uint8Array ? "$" + value.toBase64() : value;
  })}`;
}
function decodeMessage(message) {
  if (!message.startsWith("Z"))
    return {};
  message = message.slice(1);
  const v = parseInt(message);
  if (isNaN(v)) {
    warn("Ignoring encoded message with missing version");
    return {};
  }
  message = message.slice(v.toString().length);
  if (!isJSON(message)) {
    warn("Ignoring encoded message with invalid JSON");
    return {};
  }
  if (v != encodingVersion)
    throw err(withErrno("EPROTONOSUPPORT", `Version mismatch in RPC message encoding (got ${v}, expected ${encodingVersion})`));
  return {
    ...JSON.parse(message, (key, value) => typeof value == "string" && value.startsWith("$") ? Uint8Array.fromBase64(value.slice(1)) : value),
    _zenfs: true
  };
}
function isMessage(arg) {
  return typeof arg == "object" && arg != null && "_zenfs" in arg && !!arg._zenfs;
}
function disposeExecutors(id) {
  const executor = executors.get(id);
  if (!executor)
    return;
  if (executor.timeout) {
    clearTimeout(executor.timeout);
    if (typeof executor.timeout == "object")
      executor.timeout.unref();
  }
  executors.delete(id);
}
var executors = /* @__PURE__ */ new Map();
function request(request2, { port, timeout: ms = 1e3, fs }) {
  const stack = "\n" + new Error().stack.slice("Error:".length);
  if (!port)
    throw err(withErrno("EINVAL", "Can not make an RPC request without a port"));
  const { resolve: resolve4, reject, promise } = Promise.withResolvers();
  const id = Math.random().toString(16).slice(5);
  const timeout = setTimeout(() => {
    const error2 = err(withErrno("ETIMEDOUT", "RPC request timed out"));
    error2.stack += stack;
    disposeExecutors(id);
    reject(error2);
  }, ms);
  const executor = { resolve: resolve4, reject, promise, fs, timeout };
  executors.set(id, executor);
  port.send({ ...request2, _zenfs: true, id, stack });
  return promise;
}
function __responseMethod(res, ...t) {
  return t.includes(res.method);
}
function handleResponse(response) {
  if (!isMessage(response))
    return;
  if (!executors.has(response.id)) {
    const error2 = err(withErrno("EIO", "Invalid RPC id: " + response.id));
    error2.stack += response.stack;
    throw error2;
  }
  const { resolve: resolve4, reject } = executors.get(response.id);
  if (response.error) {
    const e = Exception.fromJSON({ code: "EIO", errno: Errno.EIO, ...response.error });
    e.stack += response.stack;
    disposeExecutors(response.id);
    reject(e);
    return;
  }
  disposeExecutors(response.id);
  resolve4(__responseMethod(response, "stat", "createFile", "mkdir") ? new Inode(response.value) : response.value);
  return;
}
function attach(port, handler) {
  if (!port)
    throw err(withErrno("EINVAL", "Cannot attach to non-existent port"));
  info("Attached handler to port: " + handler.name);
  port.addHandler(handler);
}

// node_modules/@zenfs/core/dist/mixins/shared.js
var _asyncFSKeys = [
  "rename",
  "stat",
  "touch",
  "createFile",
  "unlink",
  "rmdir",
  "mkdir",
  "readdir",
  "exists",
  "link",
  "sync",
  "read",
  "write"
];

// node_modules/@zenfs/core/dist/mixins/async.js
function Async(FS) {
  class AsyncFS extends FS {
    /**
     * @deprecated Use {@link sync | `sync`} instead
     */
    async done() {
      return this.sync();
    }
    /**
     * @deprecated Use {@link sync | `sync`} instead
     */
    queueDone() {
      return this.sync();
    }
    _promise = Promise.resolve();
    _async(thunk) {
      this._promise = this._promise.finally(() => thunk());
    }
    _isInitialized = false;
    /** Tracks how many updates to the sync. cache we skipped during initialization */
    _skippedCacheUpdates = 0;
    constructor(...args) {
      super(...args);
      this._patchAsync();
    }
    async ready() {
      await super.ready();
      if (this._isInitialized || this.attributes.has("no_async_preload"))
        return;
      await this._promise;
      this.checkSync();
      await this._sync.ready();
      if (this._sync instanceof StoreFS && this instanceof StoreFS) {
        const sync = this._sync.transaction();
        const async = this.transaction();
        const promises = [];
        for (const key of await async.keys()) {
          promises.push(async.get(key).then((data) => sync.setSync(key, data)));
        }
        await Promise.all(promises);
        this._isInitialized = true;
        return;
      }
      try {
        await this.crossCopy("/");
        debug(`Skipped ${this._skippedCacheUpdates} updates to the sync cache during initialization`);
        this._isInitialized = true;
      } catch (e) {
        this._isInitialized = false;
        throw crit(e);
      }
    }
    checkSync() {
      if (this.attributes.has("no_async_preload")) {
        throw withErrno("ENOTSUP", "Sync preloading has been disabled for this async file system");
      }
      if (!this._sync) {
        throw crit(withErrno("ENOTSUP", "No sync cache is attached to this async file system"));
      }
    }
    renameSync(oldPath, newPath) {
      this.checkSync();
      this._sync.renameSync(oldPath, newPath);
      this._async(() => this.rename(oldPath, newPath));
    }
    statSync(path) {
      this.checkSync();
      return this._sync.statSync(path);
    }
    touchSync(path, metadata) {
      this.checkSync();
      this._sync.touchSync(path, metadata);
      this._async(() => this.touch(path, metadata));
    }
    createFileSync(path, options) {
      this.checkSync();
      const result = this._sync.createFileSync(path, options);
      this._async(() => this.createFile(path, options));
      return result;
    }
    unlinkSync(path) {
      this.checkSync();
      this._sync.unlinkSync(path);
      this._async(() => this.unlink(path));
    }
    rmdirSync(path) {
      this.checkSync();
      this._sync.rmdirSync(path);
      this._async(() => this.rmdir(path));
    }
    mkdirSync(path, options) {
      this.checkSync();
      const result = this._sync.mkdirSync(path, options);
      this._async(() => this.mkdir(path, options));
      return result;
    }
    readdirSync(path) {
      this.checkSync();
      return this._sync.readdirSync(path);
    }
    linkSync(srcpath, dstpath) {
      this.checkSync();
      this._sync.linkSync(srcpath, dstpath);
      this._async(() => this.link(srcpath, dstpath));
    }
    async sync() {
      if (!this.attributes.has("no_async_preload") && this._sync)
        this._sync.syncSync();
      await this._promise.catch(() => {
      });
    }
    syncSync() {
      this.checkSync();
      this._sync.syncSync();
    }
    existsSync(path) {
      this.checkSync();
      return this._sync.existsSync(path);
    }
    readSync(path, buffer, offset, end) {
      this.checkSync();
      this._sync.readSync(path, buffer, offset, end);
    }
    writeSync(path, buffer, offset) {
      this.checkSync();
      this._sync.writeSync(path, buffer, offset);
      this._async(() => this.write(path, buffer, offset));
    }
    streamWrite(path, options) {
      this.checkSync();
      const sync = this._sync.streamWrite(path, options).getWriter();
      const async = super.streamWrite(path, options).getWriter();
      return new WritableStream({
        async write(chunk, controller) {
          await Promise.all([sync.write(chunk), async.write(chunk)]).catch(controller.error.bind(controller));
        },
        async close() {
          await Promise.all([sync.close(), async.close()]);
        },
        async abort(reason) {
          await Promise.all([sync.abort(reason), async.abort(reason)]);
        }
      });
    }
    /**
     * @internal
     */
    async crossCopy(path) {
      this.checkSync();
      const stats = await this.stat(path);
      if (!isDirectory(stats)) {
        this._sync.createFileSync(path, stats);
        const buffer = new Uint8Array(stats.size);
        await this.read(path, buffer, 0, stats.size);
        this._sync.writeSync(path, buffer, 0);
        this._sync.touchSync(path, stats);
        return;
      }
      if (path !== "/") {
        this._sync.mkdirSync(path, stats);
        this._sync.touchSync(path, stats);
      }
      const promises = [];
      for (const file of await this.readdir(path)) {
        promises.push(this.crossCopy(join(path, file)));
      }
      await Promise.all(promises);
    }
    /**
     * @internal
     * Patch all async methods to also call their synchronous counterparts unless called from themselves (either sync or async)
     */
    _patchAsync() {
      const noPatch = ["read", "readdir", "stat", "exists"];
      const toPatch = _asyncFSKeys.filter((key) => !noPatch.includes(key));
      for (const key of toPatch) {
        let isInLoop = function(depth, error2) {
          if (!error2) {
            error2 = new Error();
            Error.captureStackTrace(error2, isInLoop);
          }
          if (!error2.stack)
            return false;
          const stack = error2.stack.split("\n").slice(depth).join("\n");
          return stack.includes(`at <computed> [as ${key}]`) || stack.includes(`at async <computed> [as ${key}]`) || stack.includes(`${key}Sync `);
        };
        const originalMethod = this[key].bind(this);
        this[key] = async (...args) => {
          const result = await originalMethod(...args);
          if (isInLoop(2))
            return result;
          if (!this._isInitialized) {
            this._skippedCacheUpdates++;
            return result;
          }
          try {
            this._sync?.[`${key}Sync`]?.(...args);
          } catch (e) {
            if (isInLoop(3, e))
              return result;
            e.message += " (Out of sync!)";
            throw err(e);
          }
          return result;
        };
      }
      debug(`Async: patched ${toPatch.length} methods`);
    }
  }
  return AsyncFS;
}

// node_modules/@zenfs/core/dist/backends/port.js
var PortFS = class extends Async(FileSystem) {
  channel;
  timeout;
  port;
  /**
   * @hidden
   */
  _sync = InMemory.create({ label: "tmpfs:port" });
  /**
   * Constructs a new PortFS instance that connects with the FS running on `options.port`.
   */
  constructor(channel, timeout = 250) {
    super(1886351988, "portfs");
    this.channel = channel;
    this.timeout = timeout;
    this.port = from(channel);
    attach(this.port, handleResponse);
  }
  rpc(method, ...args) {
    return request({ method, args }, {
      port: this.port,
      timeout: this.timeout,
      fs: this
    });
  }
  async ready() {
    await this.rpc("ready");
    await super.ready();
  }
  rename(oldPath, newPath) {
    return this.rpc("rename", oldPath, newPath);
  }
  async stat(path) {
    const result = await this.rpc("stat", path);
    return result instanceof Inode ? result : new Inode(result);
  }
  async touch(path, metadata) {
    const inode = metadata instanceof Inode ? metadata : new Inode(metadata);
    await this.rpc("touch", path, new Uint8Array(inode.buffer, inode.byteOffset, inode.byteLength));
  }
  async sync() {
    await super.sync();
    await this.rpc("sync");
  }
  async createFile(path, options) {
    if (options instanceof Inode)
      options = options.toJSON();
    const result = await this.rpc("createFile", path, options);
    return result instanceof Inode ? result : new Inode(result);
  }
  unlink(path) {
    return this.rpc("unlink", path);
  }
  rmdir(path) {
    return this.rpc("rmdir", path);
  }
  async mkdir(path, options) {
    if (options instanceof Inode)
      options = options.toJSON();
    const result = await this.rpc("mkdir", path, options);
    return result instanceof Inode ? result : new Inode(result);
  }
  readdir(path) {
    return this.rpc("readdir", path);
  }
  exists(path) {
    return this.rpc("exists", path);
  }
  link(srcpath, dstpath) {
    return this.rpc("link", srcpath, dstpath);
  }
  async read(path, buffer, start, end) {
    buffer.set(await this.rpc("read", path, buffer, start, end));
  }
  write(path, buffer, offset) {
    return this.rpc("write", path, buffer, offset);
  }
};

// node_modules/@zenfs/core/dist/backends/single_buffer.js
var __esDecorate5 = function(ctor, descriptorIn, decorators, contextIn, initializers, extraInitializers) {
  function accept(f) {
    if (f !== void 0 && typeof f !== "function") throw new TypeError("Function expected");
    return f;
  }
  var kind = contextIn.kind, key = kind === "getter" ? "get" : kind === "setter" ? "set" : "value";
  var target = !descriptorIn && ctor ? contextIn["static"] ? ctor : ctor.prototype : null;
  var descriptor = descriptorIn || (target ? Object.getOwnPropertyDescriptor(target, contextIn.name) : {});
  var _, done = false;
  for (var i = decorators.length - 1; i >= 0; i--) {
    var context = {};
    for (var p in contextIn) context[p] = p === "access" ? {} : contextIn[p];
    for (var p in contextIn.access) context.access[p] = contextIn.access[p];
    context.addInitializer = function(f) {
      if (done) throw new TypeError("Cannot add initializers after decoration has completed");
      extraInitializers.push(accept(f || null));
    };
    var result = (0, decorators[i])(kind === "accessor" ? { get: descriptor.get, set: descriptor.set } : descriptor[key], context);
    if (kind === "accessor") {
      if (result === void 0) continue;
      if (result === null || typeof result !== "object") throw new TypeError("Object expected");
      if (_ = accept(result.get)) descriptor.get = _;
      if (_ = accept(result.set)) descriptor.set = _;
      if (_ = accept(result.init)) initializers.unshift(_);
    } else if (_ = accept(result)) {
      if (kind === "field") initializers.unshift(_);
      else descriptor[key] = _;
    }
  }
  if (target) Object.defineProperty(target, contextIn.name, descriptor);
  done = true;
};
var __runInitializers5 = function(thisArg, initializers, value) {
  var useValue = arguments.length > 2;
  for (var i = 0; i < initializers.length; i++) {
    value = useValue ? initializers[i].call(thisArg, value) : initializers[i].call(thisArg);
  }
  return useValue ? value : void 0;
};
var hex = (value) => "0x" + value.toString(16).padStart(8, "0");
var { format: format2 } = new Intl.NumberFormat("en-US", {
  notation: "compact",
  maximumFractionDigits: 2,
  unit: "byte",
  unitDisplay: "narrow"
});
var MetadataEntry = (() => {
  var _a, _b, _c, _d;
  let _classDecorators = [struct.packed()];
  let _classDescriptor;
  let _classExtraInitializers = [];
  let _classThis;
  let _classSuper = $from(BufferView);
  let _id_decorators;
  let _id_initializers = [];
  let _id_extraInitializers = [];
  let _offset__decorators;
  let _offset__initializers = [];
  let _offset__extraInitializers = [];
  let _offset_decorators;
  let _offset_initializers = [];
  let _offset_extraInitializers = [];
  let _size_decorators;
  let _size_initializers = [];
  let _size_extraInitializers = [];
  var MetadataEntry2 = class extends _classSuper {
    static {
      _classThis = this;
    }
    static {
      const _metadata = typeof Symbol === "function" && Symbol.metadata ? Object.create(_classSuper[Symbol.metadata] ?? null) : void 0;
      _id_decorators = [(_a = types2).uint32.bind(_a)];
      _offset__decorators = [(_b = types2).uint32.bind(_b)];
      _offset_decorators = [(_c = types2).uint32.bind(_c)];
      _size_decorators = [(_d = types2).uint32.bind(_d)];
      __esDecorate5(this, null, _id_decorators, { kind: "accessor", name: "id", static: false, private: false, access: { has: (obj) => "id" in obj, get: (obj) => obj.id, set: (obj, value) => {
        obj.id = value;
      } }, metadata: _metadata }, _id_initializers, _id_extraInitializers);
      __esDecorate5(this, null, _offset__decorators, { kind: "accessor", name: "offset_", static: false, private: false, access: { has: (obj) => "offset_" in obj, get: (obj) => obj.offset_, set: (obj, value) => {
        obj.offset_ = value;
      } }, metadata: _metadata }, _offset__initializers, _offset__extraInitializers);
      __esDecorate5(this, null, _offset_decorators, { kind: "accessor", name: "offset", static: false, private: false, access: { has: (obj) => "offset" in obj, get: (obj) => obj.offset, set: (obj, value) => {
        obj.offset = value;
      } }, metadata: _metadata }, _offset_initializers, _offset_extraInitializers);
      __esDecorate5(this, null, _size_decorators, { kind: "accessor", name: "size", static: false, private: false, access: { has: (obj) => "size" in obj, get: (obj) => obj.size, set: (obj, value) => {
        obj.size = value;
      } }, metadata: _metadata }, _size_initializers, _size_extraInitializers);
      __esDecorate5(null, _classDescriptor = { value: _classThis }, _classDecorators, { kind: "class", name: _classThis.name, metadata: _metadata }, null, _classExtraInitializers);
      MetadataEntry2 = _classThis = _classDescriptor.value;
      if (_metadata) Object.defineProperty(_classThis, Symbol.metadata, { enumerable: true, configurable: true, writable: true, value: _metadata });
    }
    static name = "MetadataEntry";
    #id_accessor_storage = __runInitializers5(this, _id_initializers, void 0);
    /** Inode or data ID */
    get id() {
      return this.#id_accessor_storage;
    }
    set id(value) {
      this.#id_accessor_storage = value;
    }
    #offset__accessor_storage = (__runInitializers5(this, _id_extraInitializers), __runInitializers5(this, _offset__initializers, void 0));
    /** Reserved for 64-bit offset expansion */
    get offset_() {
      return this.#offset__accessor_storage;
    }
    set offset_(value) {
      this.#offset__accessor_storage = value;
    }
    #offset_accessor_storage = (__runInitializers5(this, _offset__extraInitializers), __runInitializers5(this, _offset_initializers, void 0));
    /** Offset into the buffer the data is stored at. */
    get offset() {
      return this.#offset_accessor_storage;
    }
    set offset(value) {
      this.#offset_accessor_storage = value;
    }
    #size_accessor_storage = (__runInitializers5(this, _offset_extraInitializers), __runInitializers5(this, _size_initializers, void 0));
    /** The size of the data */
    get size() {
      return this.#size_accessor_storage;
    }
    set size(value) {
      this.#size_accessor_storage = value;
    }
    toString() {
      return `<MetadataEntry @ ${hex(this.byteOffset)}>`;
    }
    constructor() {
      super(...arguments);
      __runInitializers5(this, _size_extraInitializers);
    }
    static {
      __runInitializers5(_classThis, _classExtraInitializers);
    }
  };
  return MetadataEntry2 = _classThis;
})();
var entries_per_block = 255;
var max_lock_attempts = 5;
var MetadataBlock = (() => {
  var _a, _b, _c, _d;
  let _classDecorators = [struct.packed()];
  let _classDescriptor;
  let _classExtraInitializers = [];
  let _classThis;
  let _classSuper = $from.typed(Int32Array);
  let _checksum_decorators;
  let _checksum_initializers = [];
  let _checksum_extraInitializers = [];
  let _timestamp_decorators;
  let _timestamp_initializers = [];
  let _timestamp_extraInitializers = [];
  let _previous_offset_decorators;
  let _previous_offset_initializers = [];
  let _previous_offset_extraInitializers = [];
  let _items_decorators;
  let _items_initializers = [];
  let _items_extraInitializers = [];
  let _locked_decorators;
  let _locked_initializers = [];
  let _locked_extraInitializers = [];
  var MetadataBlock2 = class extends _classSuper {
    static {
      _classThis = this;
    }
    static {
      const _metadata = typeof Symbol === "function" && Symbol.metadata ? Object.create(_classSuper[Symbol.metadata] ?? null) : void 0;
      _checksum_decorators = [(_a = types2).uint32.bind(_a)];
      _timestamp_decorators = [(_b = types2).uint64.bind(_b)];
      _previous_offset_decorators = [(_c = types2).uint32.bind(_c)];
      _items_decorators = [field(array(MetadataEntry, entries_per_block))];
      _locked_decorators = [(_d = types2).int32.bind(_d)];
      __esDecorate5(this, null, _checksum_decorators, { kind: "accessor", name: "checksum", static: false, private: false, access: { has: (obj) => "checksum" in obj, get: (obj) => obj.checksum, set: (obj, value) => {
        obj.checksum = value;
      } }, metadata: _metadata }, _checksum_initializers, _checksum_extraInitializers);
      __esDecorate5(this, null, _timestamp_decorators, { kind: "accessor", name: "timestamp", static: false, private: false, access: { has: (obj) => "timestamp" in obj, get: (obj) => obj.timestamp, set: (obj, value) => {
        obj.timestamp = value;
      } }, metadata: _metadata }, _timestamp_initializers, _timestamp_extraInitializers);
      __esDecorate5(this, null, _previous_offset_decorators, { kind: "accessor", name: "previous_offset", static: false, private: false, access: { has: (obj) => "previous_offset" in obj, get: (obj) => obj.previous_offset, set: (obj, value) => {
        obj.previous_offset = value;
      } }, metadata: _metadata }, _previous_offset_initializers, _previous_offset_extraInitializers);
      __esDecorate5(this, null, _items_decorators, { kind: "accessor", name: "items", static: false, private: false, access: { has: (obj) => "items" in obj, get: (obj) => obj.items, set: (obj, value) => {
        obj.items = value;
      } }, metadata: _metadata }, _items_initializers, _items_extraInitializers);
      __esDecorate5(this, null, _locked_decorators, { kind: "accessor", name: "locked", static: false, private: false, access: { has: (obj) => "locked" in obj, get: (obj) => obj.locked, set: (obj, value) => {
        obj.locked = value;
      } }, metadata: _metadata }, _locked_initializers, _locked_extraInitializers);
      __esDecorate5(null, _classDescriptor = { value: _classThis }, _classDecorators, { kind: "class", name: _classThis.name, metadata: _metadata }, null, _classExtraInitializers);
      MetadataBlock2 = _classThis = _classDescriptor.value;
      if (_metadata) Object.defineProperty(_classThis, Symbol.metadata, { enumerable: true, configurable: true, writable: true, value: _metadata });
    }
    static name = "MetadataBlock";
    static lockIndex;
    #checksum_accessor_storage = __runInitializers5(this, _checksum_initializers, void 0);
    /**
     * The crc32c checksum for the metadata block.
     * @privateRemarks Keep this first!
     */
    get checksum() {
      return this.#checksum_accessor_storage;
    }
    set checksum(value) {
      this.#checksum_accessor_storage = value;
    }
    #timestamp_accessor_storage = (__runInitializers5(this, _checksum_extraInitializers), __runInitializers5(this, _timestamp_initializers, BigInt(Date.now())));
    /** The (last) time this metadata block was updated */
    get timestamp() {
      return this.#timestamp_accessor_storage;
    }
    set timestamp(value) {
      this.#timestamp_accessor_storage = value;
    }
    #previous_offset_accessor_storage = (__runInitializers5(this, _timestamp_extraInitializers), __runInitializers5(this, _previous_offset_initializers, void 0));
    /** Offset to the previous metadata block */
    get previous_offset() {
      return this.#previous_offset_accessor_storage;
    }
    set previous_offset(value) {
      this.#previous_offset_accessor_storage = value;
    }
    _previous = __runInitializers5(this, _previous_offset_extraInitializers);
    get previous() {
      if (!this.previous_offset)
        return;
      this._previous ??= new MetadataBlock2(this.buffer, this.previous_offset);
      return this._previous;
    }
    #items_accessor_storage = __runInitializers5(this, _items_initializers, void 0);
    /** Metadata entries. */
    get items() {
      return this.#items_accessor_storage;
    }
    set items(value) {
      this.#items_accessor_storage = value;
    }
    toString(long = false) {
      if (!long)
        return `<MetadataBlock @ ${hex(this.byteOffset)}>`;
      let text = [
        `---- Metadata block at ${hex(this.byteOffset)} ----`,
        `Checksum: ${hex(this.checksum)}`,
        `Last updated: ${new Date(Number(this.timestamp)).toLocaleString()}`,
        `Previous block: ${hex(this.previous_offset)}`,
        "Entries:"
      ].join("\n");
      for (const entry of this.items) {
        if (!entry.offset)
          continue;
        text += `
	${hex(entry.id)}: ${format2(entry.size).padStart(5)} at ${hex(entry.offset)}`;
      }
      return text;
    }
    #locked_accessor_storage = (__runInitializers5(this, _items_extraInitializers), __runInitializers5(this, _locked_initializers, void 0));
    /**
     * If non-zero, this block is locked for writing.
     * Note a int32 is used for `Atomics.wait`
     */
    get locked() {
      return this.#locked_accessor_storage;
    }
    set locked(value) {
      this.#locked_accessor_storage = value;
    }
    /**
     * Wait for the block to be unlocked.
     */
    waitUnlocked(depth = 0) {
      if (depth > max_lock_attempts)
        throw crit(withErrno("EBUSY", `sbfs: exceeded max attempts waiting for metadata block at ${hex(this.byteOffset)} to be unlocked`));
      if (!Atomics.load(this, MetadataBlock2.lockIndex))
        return;
      switch (Atomics.wait(this, MetadataBlock2.lockIndex, 1)) {
        case "ok":
          break;
        case "not-equal":
          depth++;
          err(`sbfs: waiting for metadata block at ${hex(this.byteOffset)} to be unlocked (${depth}/${max_lock_attempts})`);
          return this.waitUnlocked(depth);
        case "timed-out":
          throw crit(withErrno("EBUSY", `sbfs: timed out waiting for metadata block at ${hex(this.byteOffset)} to be unlocked`));
      }
    }
    lock() {
      this.waitUnlocked();
      Atomics.store(this, MetadataBlock2.lockIndex, 1);
      const release = () => {
        Atomics.store(this, MetadataBlock2.lockIndex, 0);
        Atomics.notify(this, MetadataBlock2.lockIndex, 1);
      };
      release[Symbol.dispose] = release;
      return release;
    }
    constructor() {
      super(...arguments);
      __runInitializers5(this, _locked_extraInitializers);
    }
    static {
      __runInitializers5(_classThis, _classExtraInitializers);
    }
  };
  return MetadataBlock2 = _classThis;
})();
Object.assign(MetadataBlock, { lockIndex: offsetof(MetadataBlock, "locked") / Int32Array.BYTES_PER_ELEMENT });
var sb_magic = 1651715706;
var kUsedBytes = 2;
var SuperBlock = (() => {
  var _a, _b, _c, _d, _e, _f, _g, _h, _j, _k;
  let _classDecorators = [struct.packed()];
  let _classDescriptor;
  let _classExtraInitializers = [];
  let _classThis;
  let _classSuper = $from.typed(BigUint64Array);
  let _checksum_decorators;
  let _checksum_initializers = [];
  let _checksum_extraInitializers = [];
  let _magic_decorators;
  let _magic_initializers = [];
  let _magic_extraInitializers = [];
  let _version_decorators;
  let _version_initializers = [];
  let _version_extraInitializers = [];
  let _inode_format_decorators;
  let _inode_format_initializers = [];
  let _inode_format_extraInitializers = [];
  let _flags_decorators;
  let _flags_initializers = [];
  let _flags_extraInitializers = [];
  let _used_bytes_decorators;
  let _used_bytes_initializers = [];
  let _used_bytes_extraInitializers = [];
  let _total_bytes_decorators;
  let _total_bytes_initializers = [];
  let _total_bytes_extraInitializers = [];
  let _uuid_decorators;
  let _uuid_initializers = [];
  let _uuid_extraInitializers = [];
  let _metadata_block_size_decorators;
  let _metadata_block_size_initializers = [];
  let _metadata_block_size_extraInitializers = [];
  let _metadata_offset__decorators;
  let _metadata_offset__initializers = [];
  let _metadata_offset__extraInitializers = [];
  let _metadata_offset_decorators;
  let _metadata_offset_initializers = [];
  let _metadata_offset_extraInitializers = [];
  let _label_decorators;
  let _label_initializers = [];
  let _label_extraInitializers = [];
  let __padding_decorators;
  let __padding_initializers = [];
  let __padding_extraInitializers = [];
  var SuperBlock2 = class extends _classSuper {
    static {
      _classThis = this;
    }
    static {
      const _metadata = typeof Symbol === "function" && Symbol.metadata ? Object.create(_classSuper[Symbol.metadata] ?? null) : void 0;
      _checksum_decorators = [(_a = types2).uint32.bind(_a)];
      _magic_decorators = [(_b = types2).uint32.bind(_b)];
      _version_decorators = [(_c = types2).uint16.bind(_c)];
      _inode_format_decorators = [(_d = types2).uint16.bind(_d)];
      _flags_decorators = [(_e = types2).uint32.bind(_e)];
      _used_bytes_decorators = [(_f = types2).uint64.bind(_f)];
      _total_bytes_decorators = [(_g = types2).uint64.bind(_g)];
      _uuid_decorators = [types2.uint8(16)];
      _metadata_block_size_decorators = [(_h = types2).uint32.bind(_h)];
      _metadata_offset__decorators = [(_j = types2).uint32.bind(_j)];
      _metadata_offset_decorators = [(_k = types2).uint32.bind(_k)];
      _label_decorators = [types2.char(64)];
      __padding_decorators = [types2.char(132)];
      __esDecorate5(this, null, _checksum_decorators, { kind: "accessor", name: "checksum", static: false, private: false, access: { has: (obj) => "checksum" in obj, get: (obj) => obj.checksum, set: (obj, value) => {
        obj.checksum = value;
      } }, metadata: _metadata }, _checksum_initializers, _checksum_extraInitializers);
      __esDecorate5(this, null, _magic_decorators, { kind: "accessor", name: "magic", static: false, private: false, access: { has: (obj) => "magic" in obj, get: (obj) => obj.magic, set: (obj, value) => {
        obj.magic = value;
      } }, metadata: _metadata }, _magic_initializers, _magic_extraInitializers);
      __esDecorate5(this, null, _version_decorators, { kind: "accessor", name: "version", static: false, private: false, access: { has: (obj) => "version" in obj, get: (obj) => obj.version, set: (obj, value) => {
        obj.version = value;
      } }, metadata: _metadata }, _version_initializers, _version_extraInitializers);
      __esDecorate5(this, null, _inode_format_decorators, { kind: "accessor", name: "inode_format", static: false, private: false, access: { has: (obj) => "inode_format" in obj, get: (obj) => obj.inode_format, set: (obj, value) => {
        obj.inode_format = value;
      } }, metadata: _metadata }, _inode_format_initializers, _inode_format_extraInitializers);
      __esDecorate5(this, null, _flags_decorators, { kind: "accessor", name: "flags", static: false, private: false, access: { has: (obj) => "flags" in obj, get: (obj) => obj.flags, set: (obj, value) => {
        obj.flags = value;
      } }, metadata: _metadata }, _flags_initializers, _flags_extraInitializers);
      __esDecorate5(this, null, _used_bytes_decorators, { kind: "accessor", name: "used_bytes", static: false, private: false, access: { has: (obj) => "used_bytes" in obj, get: (obj) => obj.used_bytes, set: (obj, value) => {
        obj.used_bytes = value;
      } }, metadata: _metadata }, _used_bytes_initializers, _used_bytes_extraInitializers);
      __esDecorate5(this, null, _total_bytes_decorators, { kind: "accessor", name: "total_bytes", static: false, private: false, access: { has: (obj) => "total_bytes" in obj, get: (obj) => obj.total_bytes, set: (obj, value) => {
        obj.total_bytes = value;
      } }, metadata: _metadata }, _total_bytes_initializers, _total_bytes_extraInitializers);
      __esDecorate5(this, null, _uuid_decorators, { kind: "accessor", name: "uuid", static: false, private: false, access: { has: (obj) => "uuid" in obj, get: (obj) => obj.uuid, set: (obj, value) => {
        obj.uuid = value;
      } }, metadata: _metadata }, _uuid_initializers, _uuid_extraInitializers);
      __esDecorate5(this, null, _metadata_block_size_decorators, { kind: "accessor", name: "metadata_block_size", static: false, private: false, access: { has: (obj) => "metadata_block_size" in obj, get: (obj) => obj.metadata_block_size, set: (obj, value) => {
        obj.metadata_block_size = value;
      } }, metadata: _metadata }, _metadata_block_size_initializers, _metadata_block_size_extraInitializers);
      __esDecorate5(this, null, _metadata_offset__decorators, { kind: "accessor", name: "metadata_offset_", static: false, private: false, access: { has: (obj) => "metadata_offset_" in obj, get: (obj) => obj.metadata_offset_, set: (obj, value) => {
        obj.metadata_offset_ = value;
      } }, metadata: _metadata }, _metadata_offset__initializers, _metadata_offset__extraInitializers);
      __esDecorate5(this, null, _metadata_offset_decorators, { kind: "accessor", name: "metadata_offset", static: false, private: false, access: { has: (obj) => "metadata_offset" in obj, get: (obj) => obj.metadata_offset, set: (obj, value) => {
        obj.metadata_offset = value;
      } }, metadata: _metadata }, _metadata_offset_initializers, _metadata_offset_extraInitializers);
      __esDecorate5(this, null, _label_decorators, { kind: "accessor", name: "label", static: false, private: false, access: { has: (obj) => "label" in obj, get: (obj) => obj.label, set: (obj, value) => {
        obj.label = value;
      } }, metadata: _metadata }, _label_initializers, _label_extraInitializers);
      __esDecorate5(this, null, __padding_decorators, { kind: "accessor", name: "_padding", static: false, private: false, access: { has: (obj) => "_padding" in obj, get: (obj) => obj._padding, set: (obj, value) => {
        obj._padding = value;
      } }, metadata: _metadata }, __padding_initializers, __padding_extraInitializers);
      __esDecorate5(null, _classDescriptor = { value: _classThis }, _classDecorators, { kind: "class", name: _classThis.name, metadata: _metadata }, null, _classExtraInitializers);
      SuperBlock2 = _classThis = _classDescriptor.value;
      if (_metadata) Object.defineProperty(_classThis, Symbol.metadata, { enumerable: true, configurable: true, writable: true, value: _metadata });
    }
    static name = "SuperBlock";
    constructor(...args) {
      super(...args);
      __runInitializers5(this, __padding_extraInitializers);
      if (this.magic != sb_magic) {
        warn("sbfs: Invalid magic value, assuming this is a fresh super block");
        const md = new MetadataBlock(this.buffer, sizeof(SuperBlock2));
        Object.assign(this, {
          metadata: md,
          metadata_offset: md.byteOffset,
          used_bytes: BigInt(sizeof(SuperBlock2) + sizeof(MetadataBlock)),
          total_bytes: BigInt(this.buffer.byteLength),
          magic: sb_magic,
          version: 1,
          inode_format: _inode_version,
          metadata_block_size: sizeof(MetadataBlock),
          uuid: encodeUUID(crypto.randomUUID())
        });
        _update(this);
        _update(md);
        return;
      }
      if (this.checksum !== checksum(this))
        throw crit(withErrno("EIO", "sbfs: checksum mismatch for super block"));
      this.metadata = new MetadataBlock(this.buffer, this.metadata_offset);
      if (this.metadata.checksum !== checksum(this.metadata))
        throw crit(withErrno("EIO", `sbfs: checksum mismatch for metadata block (saved ${hex(this.metadata.checksum)}, computed ${hex(checksum(this.metadata))})`));
      if (this.inode_format != _inode_version)
        throw crit(withErrno("EIO", "sbfs: inode format mismatch"));
      if (this.metadata_block_size != sizeof(MetadataBlock))
        throw crit(withErrno("EIO", "sbfs: metadata block size mismatch"));
    }
    #checksum_accessor_storage = __runInitializers5(this, _checksum_initializers, void 0);
    /**
     * The crc32c checksum for the super block.
     * @privateRemarks Keep this first!
     */
    get checksum() {
      return this.#checksum_accessor_storage;
    }
    set checksum(value) {
      this.#checksum_accessor_storage = value;
    }
    #magic_accessor_storage = (__runInitializers5(this, _checksum_extraInitializers), __runInitializers5(this, _magic_initializers, void 0));
    /** Signature for the superblock. */
    get magic() {
      return this.#magic_accessor_storage;
    }
    set magic(value) {
      this.#magic_accessor_storage = value;
    }
    #version_accessor_storage = (__runInitializers5(this, _magic_extraInitializers), __runInitializers5(this, _version_initializers, void 0));
    /** The version of the on-disk format */
    get version() {
      return this.#version_accessor_storage;
    }
    set version(value) {
      this.#version_accessor_storage = value;
    }
    #inode_format_accessor_storage = (__runInitializers5(this, _version_extraInitializers), __runInitializers5(this, _inode_format_initializers, void 0));
    /** Which format of `Inode` is used */
    get inode_format() {
      return this.#inode_format_accessor_storage;
    }
    set inode_format(value) {
      this.#inode_format_accessor_storage = value;
    }
    #flags_accessor_storage = (__runInitializers5(this, _inode_format_extraInitializers), __runInitializers5(this, _flags_initializers, void 0));
    /** Flags for the file system. Currently unused */
    get flags() {
      return this.#flags_accessor_storage;
    }
    set flags(value) {
      this.#flags_accessor_storage = value;
    }
    #used_bytes_accessor_storage = (__runInitializers5(this, _flags_extraInitializers), __runInitializers5(this, _used_bytes_initializers, void 0));
    /** The number of used bytes, including the super block and metadata */
    get used_bytes() {
      return this.#used_bytes_accessor_storage;
    }
    set used_bytes(value) {
      this.#used_bytes_accessor_storage = value;
    }
    #total_bytes_accessor_storage = (__runInitializers5(this, _used_bytes_extraInitializers), __runInitializers5(this, _total_bytes_initializers, void 0));
    /** The total size of the entire file system, including the super block and metadata */
    get total_bytes() {
      return this.#total_bytes_accessor_storage;
    }
    set total_bytes(value) {
      this.#total_bytes_accessor_storage = value;
    }
    #uuid_accessor_storage = (__runInitializers5(this, _total_bytes_extraInitializers), __runInitializers5(this, _uuid_initializers, void 0));
    /** A UUID for this file system */
    get uuid() {
      return this.#uuid_accessor_storage;
    }
    set uuid(value) {
      this.#uuid_accessor_storage = value;
    }
    #metadata_block_size_accessor_storage = (__runInitializers5(this, _uuid_extraInitializers), __runInitializers5(this, _metadata_block_size_initializers, void 0));
    /**
     * The size in bytes of a metadata block.
     * Not currently configurable.
     */
    get metadata_block_size() {
      return this.#metadata_block_size_accessor_storage;
    }
    set metadata_block_size(value) {
      this.#metadata_block_size_accessor_storage = value;
    }
    #metadata_offset__accessor_storage = (__runInitializers5(this, _metadata_block_size_extraInitializers), __runInitializers5(this, _metadata_offset__initializers, void 0));
    /** Reserved for 64-bit offset expansion */
    get metadata_offset_() {
      return this.#metadata_offset__accessor_storage;
    }
    set metadata_offset_(value) {
      this.#metadata_offset__accessor_storage = value;
    }
    #metadata_offset_accessor_storage = (__runInitializers5(this, _metadata_offset__extraInitializers), __runInitializers5(this, _metadata_offset_initializers, void 0));
    /** Offset of the current metadata block */
    get metadata_offset() {
      return this.#metadata_offset_accessor_storage;
    }
    set metadata_offset(value) {
      this.#metadata_offset_accessor_storage = value;
    }
    metadata = __runInitializers5(this, _metadata_offset_extraInitializers);
    #label_accessor_storage = __runInitializers5(this, _label_initializers, void 0);
    /** An optional label for the file system */
    get label() {
      return this.#label_accessor_storage;
    }
    set label(value) {
      this.#label_accessor_storage = value;
    }
    #_padding_accessor_storage = (__runInitializers5(this, _label_extraInitializers), __runInitializers5(this, __padding_initializers, void 0));
    /** Padded to 256 bytes */
    get _padding() {
      return this.#_padding_accessor_storage;
    }
    set _padding(value) {
      this.#_padding_accessor_storage = value;
    }
    /**
     * Rotate out the current metadata block.
     * Allocates a new metadata block, moves the current one to backup,
     * and updates used_bytes accordingly.
     * @returns the new metadata block
     */
    rotateMetadata() {
      const alignment = BigInt(Int32Array.BYTES_PER_ELEMENT), blockSize = BigInt(sizeof(MetadataBlock));
      let used = Atomics.load(this, kUsedBytes), offset;
      for (; ; ) {
        const padding = (alignment - used % alignment) % alignment;
        offset = used + padding;
        const next = offset + blockSize;
        if (next > this.total_bytes)
          throw err(withErrno("ENOSPC", "sbfs: not enough space for a new metadata block"));
        const observed = Atomics.compareExchange(this, kUsedBytes, used, next);
        if (observed === used)
          break;
        used = observed;
      }
      const metadata = new MetadataBlock(this.buffer, Number(offset));
      const offsets = new Uint32Array(this.buffer, this.byteOffset, sizeof(SuperBlock2) / Uint32Array.BYTES_PER_ELEMENT);
      let previous = Atomics.load(offsets, kMetadataOffset);
      for (; ; ) {
        metadata.previous_offset = previous;
        _update(metadata);
        const observed = Atomics.compareExchange(offsets, kMetadataOffset, previous, metadata.byteOffset);
        if (observed === previous)
          break;
        previous = observed;
      }
      this.metadata = metadata;
      _update(this);
      debug(`sbfs: rotated metadata block at ${hex(metadata.previous_offset)} with new block at ${hex(metadata.byteOffset)}`);
      return metadata;
    }
    /**
     * Checks to see if `length` bytes are unused, starting at `offset`.
     * @internal Not for external use!
     */
    isUnused(offset, length) {
      if (!length)
        return true;
      if (offset + length > this.total_bytes || offset < sizeof(SuperBlock2))
        return false;
      for (let block = this.metadata; block; block = block.previous) {
        if (offset < block.byteOffset + sizeof(MetadataBlock) && offset + length > block.byteOffset)
          return false;
        for (const entry of block.items) {
          if (!entry.offset)
            continue;
          if (offset >= entry.offset && offset < entry.offset + entry.size || offset + length > entry.offset && offset + length <= entry.offset + entry.size || offset <= entry.offset && offset + length >= entry.offset + entry.size) {
            return false;
          }
        }
      }
      return true;
    }
    static {
      __runInitializers5(_classThis, _classExtraInitializers);
    }
  };
  return SuperBlock2 = _classThis;
})();
var kMetadataOffset = offsetof(SuperBlock, "metadata_offset") / Uint32Array.BYTES_PER_ELEMENT;
function checksum(value) {
  let length = sizeof(value) - 4;
  if (value instanceof MetadataBlock)
    length -= Int32Array.BYTES_PER_ELEMENT;
  return crc32c(new Uint8Array(value.buffer, value.byteOffset + 4, length));
}
function _update(value) {
  if (value instanceof MetadataBlock)
    value.timestamp = BigInt(Date.now());
  value.checksum = checksum(value);
}

// node_modules/@zenfs/core/dist/node/async.js
var import_buffer8 = __toESM(require_buffer(), 1);
var nop = () => {
};
async function collectAsyncIterator(it) {
  const results = [];
  for await (const result of it) {
    results.push(result);
  }
  return results;
}
function rename4(oldPath, newPath, cb = nop) {
  rename3.call(this, oldPath, newPath).then(() => cb(null)).catch(cb);
}
function exists2(path, cb = nop) {
  exists.call(this, path).then(cb).catch(() => cb(false));
}
function stat4(path, options, callback = nop) {
  callback = typeof options == "function" ? options : callback;
  stat3.call(this, path, typeof options != "function" ? options : {}).then((stats) => callback(null, stats)).catch(callback);
}
function lstat2(path, options, callback = nop) {
  callback = typeof options == "function" ? options : callback;
  lstat.call(this, path, typeof options != "function" ? options : {}).then((stats) => callback(null, stats)).catch(callback);
}
function truncate2(path, cbLen = 0, cb = nop) {
  cb = typeof cbLen === "function" ? cbLen : cb;
  const len = typeof cbLen === "number" ? cbLen : 0;
  truncate.call(this, path, len).then(() => cb(null)).catch(cb);
}
function unlink2(path, cb = nop) {
  unlink.call(this, path).then(() => cb(null)).catch(cb);
}
function open4(path, flag, cbMode, cb = nop) {
  const mode = normalizeMode(cbMode, 420);
  cb = typeof cbMode === "function" ? cbMode : cb;
  open3.call(this, path, flag, mode).then((handle) => cb(null, handle.fd)).catch(cb);
}
function readFile2(filename, options, cb = nop) {
  cb = typeof options === "function" ? options : cb;
  readFile.call(this, filename, typeof options === "function" ? null : options).then((data) => cb(null, data)).catch(cb);
}
function writeFile2(filename, data, cbEncOpts, cb = nop) {
  cb = typeof cbEncOpts === "function" ? cbEncOpts : cb;
  writeFile.call(this, filename, data, typeof cbEncOpts != "function" ? cbEncOpts : null).then(() => cb(null)).catch(cb);
}
function appendFile2(filename, data, cbEncOpts, cb = nop) {
  const optionsOrEncoding = typeof cbEncOpts != "function" ? cbEncOpts : void 0;
  cb = typeof cbEncOpts === "function" ? cbEncOpts : cb;
  appendFile.call(this, filename, data, optionsOrEncoding).then(() => cb(null)).catch(cb);
}
function fstat(fd, options, cb = nop) {
  cb = typeof options == "function" ? options : cb;
  new FileHandle(this, fd).stat().then((stats) => cb(null, typeof options == "object" && options?.bigint ? new BigIntStats(stats) : stats)).catch(cb);
}
function close(fd, cb = nop) {
  new FileHandle(this, fd).close().then(() => cb(null)).catch(cb);
}
function ftruncate(fd, lenOrCB, cb = nop) {
  const length = typeof lenOrCB === "number" ? lenOrCB : 0;
  cb = typeof lenOrCB === "function" ? lenOrCB : cb;
  const file = new FileHandle(this, fd);
  if (length < 0)
    throw withErrno("EINVAL");
  file.truncate(length).then(() => cb(null)).catch(cb);
}
function fsync(fd, cb = nop) {
  new FileHandle(this, fd).sync().then(() => cb(null)).catch(cb);
}
function fdatasync(fd, cb = nop) {
  new FileHandle(this, fd).datasync().then(() => cb(null)).catch(cb);
}
function write(fd, data, cbPosOff, cbLenEnc, cbPosEnc, cb = nop) {
  let buffer, offset, length, position, encoding;
  const handle = new FileHandle(this, fd);
  const _cb = [cbPosOff, cbLenEnc, cbPosEnc].find((arg) => typeof arg === "function") ?? cb;
  if (typeof data === "string") {
    position = typeof cbPosOff === "number" ? cbPosOff : null;
    encoding = typeof cbLenEnc === "string" ? cbLenEnc : "utf8";
    buffer = import_buffer8.Buffer.from(data, encoding);
    offset = 0;
    length = buffer.byteLength;
  } else {
    buffer = import_buffer8.Buffer.from(data.buffer, data.byteOffset, data.byteLength);
    offset = typeof cbPosOff === "number" ? cbPosOff : 0;
    length = typeof cbLenEnc === "number" ? cbLenEnc : buffer.byteLength - offset;
    position = typeof cbPosEnc === "number" ? cbPosEnc : null;
  }
  handle.write(buffer, offset, length, position).then(({ bytesWritten }) => _cb(null, bytesWritten, typeof data === "string" ? data : buffer)).catch(_cb);
}
function read(fd, buffer, offset, length, position, cb = nop) {
  new FileHandle(this, fd).read(buffer, offset, length, position).then(({ bytesRead, buffer: buffer2 }) => cb(null, bytesRead, buffer2)).catch(cb);
}
function fchown(fd, uid, gid, cb = nop) {
  new FileHandle(this, fd).chown(uid, gid).then(() => cb(null)).catch(cb);
}
function fchmod(fd, mode, cb) {
  new FileHandle(this, fd).chmod(mode).then(() => cb(null)).catch(cb);
}
function futimes(fd, atime, mtime, cb = nop) {
  new FileHandle(this, fd).utimes(atime, mtime).then(() => cb(null)).catch(cb);
}
function rmdir2(path, cb = nop) {
  rmdir.call(this, path).then(() => cb(null)).catch(cb);
}
function mkdir4(path, mode, cb = nop) {
  mkdir3.call(this, path, mode).then(() => cb(null)).catch(cb);
}
function readdir4(path, _options, cb = nop) {
  cb = typeof _options == "function" ? _options : cb;
  const options = typeof _options != "function" ? _options : {};
  readdir2.call(this, path, options).then((entries2) => cb(null, entries2)).catch(cb);
}
function link4(existing, newpath, cb = nop) {
  link3.call(this, existing, newpath).then(() => cb(null)).catch(cb);
}
function symlink2(target, path, typeOrCB, cb = nop) {
  const type = typeof typeOrCB === "string" ? typeOrCB : "file";
  cb = typeof typeOrCB === "function" ? typeOrCB : cb;
  symlink.call(this, target, path, type).then(() => cb(null)).catch(cb);
}
function readlink4(path, options, callback = nop) {
  callback = typeof options == "function" ? options : callback;
  readlink3.call(this, path).then((result) => callback(null, result)).catch(callback);
}
function chown2(path, uid, gid, cb = nop) {
  chown.call(this, path, uid, gid).then(() => cb(null)).catch(cb);
}
function lchown2(path, uid, gid, cb = nop) {
  lchown.call(this, path, uid, gid).then(() => cb(null)).catch(cb);
}
function chmod2(path, mode, cb = nop) {
  chmod.call(this, path, mode).then(() => cb(null)).catch(cb);
}
function lchmod2(path, mode, cb = nop) {
  lchmod.call(this, path, mode).then(() => cb(null)).catch(cb);
}
function utimes2(path, atime, mtime, cb = nop) {
  utimes.call(this, path, atime, mtime).then(() => cb(null)).catch(cb);
}
function lutimes2(path, atime, mtime, cb = nop) {
  lutimes.call(this, path, atime, mtime).then(() => cb(null)).catch(cb);
}
function realpath2(path, arg2, cb = nop) {
  cb = typeof arg2 === "function" ? arg2 : cb;
  realpath.call(this, path, typeof arg2 === "function" ? null : arg2).then((result) => cb(null, result)).catch(cb);
}
function access2(path, cbMode, cb = nop) {
  const mode = typeof cbMode === "number" ? cbMode : R_OK;
  cb = typeof cbMode === "function" ? cbMode : cb;
  access.call(this, path, mode).then(() => cb(null)).catch(cb);
}
var statWatchers = /* @__PURE__ */ new Map();
function watchFile(path, options, listener) {
  const normalizedPath = normalizePath(path);
  const opts = typeof options != "function" ? options : {};
  if (typeof options == "function") {
    listener = options;
  }
  if (!listener)
    throw UV("EINVAL", "watch", path.toString());
  if (statWatchers.has(normalizedPath)) {
    const entry = statWatchers.get(normalizedPath);
    if (entry) {
      entry.listeners.add(listener);
    }
    return;
  }
  const watcher = new StatWatcher(this, normalizedPath, opts);
  watcher.on("change", (curr, prev) => {
    const entry = statWatchers.get(normalizedPath);
    if (!entry) {
      return;
    }
    for (const listener2 of entry.listeners) {
      listener2(curr, prev);
    }
  });
  statWatchers.set(normalizedPath, { watcher, listeners: /* @__PURE__ */ new Set([listener]) });
}
function unwatchFile(path, listener = nop) {
  const normalizedPath = normalizePath(path);
  const entry = statWatchers.get(normalizedPath);
  if (entry) {
    if (listener && listener !== nop) {
      entry.listeners.delete(listener);
    } else {
      entry.listeners.clear();
    }
    if (entry.listeners.size === 0) {
      entry.watcher.stop();
      statWatchers.delete(normalizedPath);
    }
  }
}
function watch2(path, options, listener) {
  const watcher = new FSWatcher(this, normalizePath(path), typeof options == "object" ? options : {});
  listener = typeof options == "function" ? options : listener;
  watcher.on("change", listener || nop);
  return watcher;
}
function createReadStream(path, options) {
  options = typeof options == "object" ? options : { encoding: options };
  const _handle = open3.call(this, path, "r", options?.mode);
  return new ReadStream({ ...options, autoClose: true }, _handle);
}
function createWriteStream(path, options) {
  options = typeof options == "object" ? options : { encoding: options };
  const _handle = open3.call(this, path, "w", options?.mode);
  return new WriteStream(options, _handle);
}
function rm2(path, options, callback = nop) {
  callback = typeof options === "function" ? options : callback;
  rm.call(this, path, typeof options === "function" ? void 0 : options).then(() => callback(null)).catch(callback);
}
function mkdtemp2(prefix, options, callback = nop) {
  callback = typeof options === "function" ? options : callback;
  mkdtemp.call(this, prefix, typeof options != "function" ? options : null).then((result) => callback(null, result)).catch(callback);
}
function copyFile2(src, dest, flags, callback = nop) {
  callback = typeof flags === "function" ? flags : callback;
  copyFile.call(this, src, dest, typeof flags === "function" ? void 0 : flags).then(() => callback(null)).catch(callback);
}
function readv(fd, buffers, position, cb = nop) {
  cb = typeof position === "function" ? position : cb;
  new FileHandle(this, fd).readv(buffers, typeof position === "function" ? void 0 : position).then(({ buffers: buffers2, bytesRead }) => cb(null, bytesRead, buffers2)).catch(cb);
}
function writev(fd, buffers, position, cb = nop) {
  cb = typeof position === "function" ? position : cb;
  new FileHandle(this, fd).writev(buffers, typeof position === "function" ? void 0 : position).then(({ buffers: buffers2, bytesWritten }) => cb(null, bytesWritten, buffers2)).catch(cb);
}
function opendir2(path, options, cb = nop) {
  cb = typeof options === "function" ? options : cb;
  opendir.call(this, path, typeof options === "function" ? void 0 : options).then((result) => cb(null, result)).catch(cb);
}
function cp2(source, destination, opts, callback = nop) {
  callback = typeof opts === "function" ? opts : callback;
  cp.call(this, source, destination, typeof opts === "function" ? void 0 : opts).then(() => callback(null)).catch(callback);
}
function statfs2(path, options, callback = nop) {
  callback = typeof options === "function" ? options : callback;
  statfs.call(this, path, typeof options === "function" ? void 0 : options).then((result) => callback(null, result)).catch(callback);
}
async function openAsBlob(path, options) {
  const handle = await open3.call(this, path.toString(), "r");
  const buffer = await handle.readFile();
  await handle.close();
  return new Blob([buffer], options);
}
function glob2(pattern2, options, callback = nop) {
  callback = typeof options == "function" ? options : callback;
  const it = glob.call(this, pattern2, typeof options === "function" ? void 0 : options);
  collectAsyncIterator(it).then((results) => callback(null, results ?? [])).catch((e) => callback(e));
}

// node_modules/@zenfs/core/dist/node/utf8stream.js
var import_buffer9 = __toESM(require_buffer(), 1);
function error(code, message) {
  return Object.assign(new Error(message), { code });
}
function invalidArgType(name, expected, value) {
  return error("ERR_INVALID_ARG_TYPE", `The "${name}" argument must be of type ${expected}. Received ${typeof value}`);
}
function invalidState(message) {
  return error("ERR_INVALID_STATE", "Invalid state: " + message);
}
function validateUint32(value, name) {
  if (typeof value != "number")
    throw invalidArgType(name, "number", value);
  if (!Number.isInteger(value) || value < 0 || value > 4294967295)
    throw error("ERR_OUT_OF_RANGE", `The value of "${name}" is out of range. It must be an integer >= 0 and <= 4294967295. Received ${value}`);
}
var maxWriteDefault = 16 * 1024;
var busyWriteTimeout = 100;
var emptyBuffer2 = import_buffer9.Buffer.alloc(0);
var _utf8StreamFS = { open: open4, openSync, close, write, writeSync, fsync, fsyncSync, mkdir: mkdir4, mkdirSync };
function _release(writingBuf, len, n) {
  if (typeof writingBuf == "string") {
    const byteLength = import_buffer9.Buffer.byteLength(writingBuf);
    if (byteLength === n) {
      n = writingBuf.length;
    } else {
      const buf = import_buffer9.Buffer.from(writingBuf);
      while (n > 0 && (buf[n] & 192) === 128)
        n--;
      n = buf.subarray(0, n).toString().length;
    }
  }
  return { writingBuf: writingBuf.slice(n), len: Math.max(len - n, 0) };
}
function _mergeBuffers(bufs, len) {
  if (!bufs.length)
    return emptyBuffer2;
  if (bufs.length == 1)
    return bufs[0];
  return import_buffer9.Buffer.concat(bufs, len);
}
var kUtf8StreamFS = /* @__PURE__ */ Symbol("Utf8StreamFS");
var Utf8Stream = class _Utf8Stream extends import_index.default {
  #len = 0;
  #fd = -1;
  /** Pending chunks. Strings when `contentMode` is `utf8`, groups of buffers when it is `buffer`. */
  #bufs = [];
  /** The byte length of each group in `#bufs`. Only used when `contentMode` is `buffer`. */
  #lens = [];
  #writing = false;
  #ending = false;
  #reopening = false;
  #asyncDrainScheduled = false;
  #flushPending = false;
  /** 16 KB */
  #hwm = 16387;
  #file = null;
  #destroyed = false;
  #minLength = 0;
  #maxLength = 0;
  #maxWrite = maxWriteDefault;
  #opening = false;
  #periodicFlush = 0;
  #periodicFlushTimer;
  #sync = false;
  #fsync = false;
  #append = true;
  #mode;
  #retryEAGAIN = () => true;
  #mkdir = false;
  #contentMode;
  #writingBuf = "";
  #fs;
  static [kUtf8StreamFS] = _utf8StreamFS;
  /** @hidden @internal */
  static _withContext(ctx) {
    assertContext(ctx);
    class $Utf8Stream extends _Utf8Stream {
      static [kUtf8StreamFS] = bindFunctions(_utf8StreamFS, ctx);
    }
    return $Utf8Stream;
  }
  constructor(options = {}) {
    if (typeof options != "object" || options === null)
      throw invalidArgType("options", "object", options);
    const {
      dest,
      minLength,
      maxLength,
      maxWrite,
      periodicFlush,
      sync,
      append = true,
      mkdir: mkdir5,
      retryEAGAIN,
      fsync: fsync2,
      contentMode = "utf8",
      mode,
      // Provides for a custom fs implementation. Mostly useful for testing.
      fs: overrideFS = {}
    } = options;
    super();
    const fd = options.fd ?? dest;
    if (typeof overrideFS != "object" || overrideFS === null)
      throw invalidArgType("options.fs", "object", overrideFS);
    this.#fs = { ...this.constructor[kUtf8StreamFS], ...overrideFS };
    const _fs = this.#fs;
    for (const key of ["write", "writeSync", "fsync", "fsyncSync", "close", "open", "mkdir", "mkdirSync"]) {
      if (typeof _fs[key] != "function")
        throw invalidArgType(`options.fs.${key}`, "function", _fs[key]);
    }
    this.#hwm = Math.max(minLength || 0, this.#hwm);
    this.#minLength = minLength || 0;
    this.#maxLength = maxLength || 0;
    this.#maxWrite = maxWrite || maxWriteDefault;
    this.#periodicFlush = periodicFlush || 0;
    this.#sync = sync || false;
    this.#fsync = fsync2 || false;
    this.#append = append || false;
    this.#mode = mode;
    this.#retryEAGAIN = retryEAGAIN || (() => true);
    this.#mkdir = mkdir5 || false;
    validateUint32(this.#hwm, "options.hwm");
    validateUint32(this.#minLength, "options.minLength");
    validateUint32(this.#maxLength, "options.maxLength");
    validateUint32(this.#maxWrite, "options.maxWrite");
    validateUint32(this.#periodicFlush, "options.periodicFlush");
    for (const [key, value] of [
      ["sync", this.#sync],
      ["fsync", this.#fsync],
      ["append", this.#append],
      ["mkdir", this.#mkdir]
    ]) {
      if (typeof value != "boolean")
        throw invalidArgType(`options.${key}`, "boolean", value);
    }
    if (typeof this.#retryEAGAIN != "function")
      throw invalidArgType("options.retryEAGAIN", "function", this.#retryEAGAIN);
    if (contentMode != "buffer" && contentMode != "utf8")
      throw error("ERR_INVALID_ARG_VALUE", `The property 'options.contentMode' must be one of: 'buffer', 'utf8'. Received ${JSON.stringify(contentMode)}`);
    this.#contentMode = contentMode;
    this.#writingBuf = contentMode == "buffer" ? emptyBuffer2 : "";
    if (typeof fd == "number") {
      this.#fd = fd;
      queueMicrotask(() => this.emit("ready"));
    } else if (typeof fd == "string") {
      this.#openFile(fd);
    } else {
      throw invalidArgType("fd", "number or string", fd);
    }
    if (this.#minLength >= this.#maxWrite)
      throw error("ERR_INVALID_ARG_VALUE", `The argument 'minLength' should be smaller than maxWrite (${this.#maxWrite}). Received ${this.#minLength}`);
    if (this.#periodicFlush !== 0) {
      this.#periodicFlushTimer = setInterval(() => this.flush(), this.#periodicFlush);
      this.#periodicFlushTimer.unref?.();
    }
  }
  /**
   * When `contentMode` is `utf8`, `data` must be a string. When it is `buffer`, `data` must be a `Buffer`.
   * @returns Whether the internal buffer is below the high water mark
   */
  write(data) {
    if (this.#destroyed)
      throw invalidState("Utf8Stream is destroyed");
    if (this.#contentMode == "buffer") {
      if (!import_buffer9.Buffer.isBuffer(data))
        throw invalidArgType("data", "Buffer", data);
    } else if (typeof data != "string") {
      throw invalidArgType("data", "string", data);
    }
    const len = this.#len + data.length;
    if (this.#maxLength && len > this.#maxLength) {
      this.emit("drop", data);
      return this.#len < this.#hwm;
    }
    const last = this.#bufs.length - 1;
    if (this.#contentMode == "buffer") {
      const bufs = this.#bufs;
      if (!bufs.length || this.#lens[last] + data.length > this.#maxWrite) {
        bufs.push([data]);
        this.#lens.push(data.length);
      } else {
        bufs[last].push(data);
        this.#lens[last] += data.length;
      }
    } else {
      const bufs = this.#bufs;
      if (!bufs.length || bufs[last].length + data.length > this.#maxWrite)
        bufs.push(data);
      else
        bufs[last] += data;
    }
    this.#len = len;
    if (!this.#writing && this.#len >= this.#minLength)
      this.#actualWrite();
    return this.#len < this.#hwm;
  }
  /**
   * Writes the current buffer to the file if a write was not in progress.
   * Does nothing if `minLength` is zero or if it is already writing.
   */
  flush(cb) {
    if (cb !== void 0 && cb !== null && typeof cb != "function")
      throw invalidArgType("cb", "function", cb);
    if (this.#destroyed) {
      const error2 = invalidState("Utf8Stream is destroyed");
      if (!cb)
        throw error2;
      cb(error2);
      return;
    }
    if (this.#minLength <= 0) {
      cb?.(null);
      return;
    }
    if (cb)
      this.#callFlushCallbackOnDrain(cb);
    if (this.#writing)
      return;
    if (!this.#bufs.length) {
      this.#bufs.push(this.#contentMode == "buffer" ? [] : "");
      if (this.#contentMode == "buffer")
        this.#lens.push(0);
    }
    this.#actualWrite();
  }
  /**
   * Flushes the buffered data synchronously. This is a costly operation.
   */
  flushSync() {
    if (this.#destroyed)
      throw invalidState("Utf8Stream is destroyed");
    if (this.#fd < 0)
      throw invalidState("Invalid file descriptor");
    if (this.#contentMode == "buffer")
      this.#flushSyncBuffer();
    else
      this.#flushSyncUtf8();
  }
  #flushSyncBuffer() {
    const bufs = this.#bufs;
    if (!this.#writing && this.#writingBuf.length > 0) {
      bufs.unshift([this.#writingBuf]);
      this.#writingBuf = emptyBuffer2;
    }
    let buf = emptyBuffer2;
    while (bufs.length || buf.length) {
      if (buf.length <= 0)
        buf = _mergeBuffers(bufs[0], this.#lens[0]);
      const n = this.#fs.writeSync(this.#fd, buf);
      buf = buf.subarray(n);
      this.#len = Math.max(this.#len - n, 0);
      if (buf.length <= 0) {
        bufs.shift();
        this.#lens.shift();
      }
    }
  }
  #flushSyncUtf8() {
    const bufs = this.#bufs;
    if (!this.#writing && this.#writingBuf.length > 0) {
      bufs.unshift(this.#writingBuf);
      this.#writingBuf = "";
    }
    let buf = "";
    while (bufs.length || buf) {
      if (buf.length <= 0)
        buf = bufs[0];
      const n = this.#fs.writeSync(this.#fd, buf, "utf8");
      const released = _release(buf, this.#len, n);
      buf = released.writingBuf;
      this.#len = released.len;
      if (buf.length <= 0)
        bufs.shift();
    }
    try {
      this.#fs.fsyncSync(this.#fd);
    } catch {
    }
  }
  /**
   * Reopen the file in place, useful for log rotation.
   */
  reopen(file) {
    if (this.#destroyed)
      throw invalidState("Utf8Stream is destroyed");
    if (this.#opening) {
      this.once("ready", () => this.reopen(file));
      return;
    }
    if (this.#ending)
      return;
    if (!this.#file)
      throw error("ERR_OPERATION_FAILED", "Unable to reopen a file descriptor, you must pass a file to Utf8Stream");
    if (file)
      this.#file = file.toString();
    this.#reopening = true;
    if (this.#writing)
      return;
    const fd = this.#fd;
    this.once("ready", () => {
      if (fd === this.#fd)
        return;
      this.#fs.close(fd, (err2) => {
        if (err2)
          this.emit("error", err2);
      });
    });
    this.#openFile(this.#file);
  }
  /**
   * Close the stream gracefully, flushing the internal buffer before closing.
   */
  end() {
    if (this.#destroyed)
      throw invalidState("Utf8Stream is destroyed");
    if (this.#opening) {
      this.once("ready", () => this.end());
      return;
    }
    if (this.#ending)
      return;
    this.#ending = true;
    if (this.#writing)
      return;
    if (this.#len > 0 && this.#fd >= 0)
      this.#actualWrite();
    else
      this.#actualClose();
  }
  /**
   * Close the stream immediately, without flushing the internal buffer.
   */
  destroy() {
    if (this.#destroyed)
      return;
    this.#actualClose();
  }
  /** The mode of the file that is being written to */
  get mode() {
    return this.#mode;
  }
  /** The file that is being written to */
  get file() {
    return this.#file;
  }
  /** The file descriptor that is being written to */
  get fd() {
    return this.#fd;
  }
  /** The minimum length of the internal buffer that is required to be full before flushing */
  get minLength() {
    return this.#minLength;
  }
  /**
   * The maximum length of the internal buffer.
   * If a write would cause the buffer to exceed this, the data is dropped and a `drop` event is emitted with it.
   */
  get maxLength() {
    return this.#maxLength;
  }
  /** Whether the stream is currently writing data to the file */
  get writing() {
    return this.#writing;
  }
  /** Whether the stream is writing synchronously or asynchronously */
  get sync() {
    return this.#sync;
  }
  /** Whether the stream performs a `fsyncSync` after every write */
  get fsync() {
    return this.#fsync;
  }
  /** Whether the stream is appending to the file or truncating it */
  get append() {
    return this.#append;
  }
  /** The number of milliseconds between flushes. `0` means no periodic flushes are performed. */
  get periodicFlush() {
    return this.#periodicFlush;
  }
  /** The type of data that can be written to the stream */
  get contentMode() {
    return this.#contentMode;
  }
  /** Whether the directory for `file` is created if it does not exist */
  get mkdir() {
    return this.#mkdir;
  }
  [Symbol.dispose]() {
    this.destroy();
  }
  #emitDrain() {
    if (!this.listenerCount("drain"))
      return;
    this.#asyncDrainScheduled = false;
    this.emit("drain");
  }
  #released(err2, n = 0) {
    if (err2) {
      if (!this.#sync && (err2.code === "EAGAIN" || err2.code === "EBUSY") && this.#retryEAGAIN(err2, this.#writingBuf.length, this.#len - this.#writingBuf.length)) {
        setTimeout(() => this.#writeToFS(), busyWriteTimeout);
      } else {
        this.#writing = false;
        this.emit("error", err2);
      }
      return;
    }
    this.emit("write", n);
    const released = _release(this.#writingBuf, this.#len, n);
    this.#len = released.len;
    this.#writingBuf = released.writingBuf;
    if (this.#writingBuf.length) {
      if (!this.#sync) {
        this.#writeToFS();
        return;
      }
      try {
        do {
          const written = this.#writeToFSSync();
          const released2 = _release(this.#writingBuf, this.#len, written);
          this.#len = released2.len;
          this.#writingBuf = released2.writingBuf;
        } while (this.#writingBuf.length);
      } catch (e) {
        this.#released(e);
        return;
      }
    }
    if (this.#fsync)
      this.#fs.fsyncSync(this.#fd);
    const len = this.#len;
    if (this.#reopening) {
      this.#writing = false;
      this.#reopening = false;
      this.reopen();
    } else if (len > this.#minLength) {
      this.#actualWrite();
    } else if (this.#ending) {
      if (len > 0) {
        this.#actualWrite();
      } else {
        this.#writing = false;
        this.#actualClose();
      }
    } else {
      this.#writing = false;
      if (!this.#sync) {
        this.emit("drain");
      } else if (!this.#asyncDrainScheduled) {
        this.#asyncDrainScheduled = true;
        queueMicrotask(() => this.#emitDrain());
      }
    }
  }
  #writeToFS() {
    if (this.#contentMode == "buffer")
      this.#fs.write(this.#fd, this.#writingBuf, (err2, n) => this.#released(err2, n));
    else
      this.#fs.write(this.#fd, this.#writingBuf, "utf8", (err2, n) => this.#released(err2, n));
  }
  #writeToFSSync() {
    return this.#contentMode == "buffer" ? this.#fs.writeSync(this.#fd, this.#writingBuf) : this.#fs.writeSync(this.#fd, this.#writingBuf, "utf8");
  }
  #openFile(file) {
    this.#opening = true;
    this.#writing = true;
    this.#asyncDrainScheduled = false;
    const fileOpened = (err2, fd = -1) => {
      if (err2) {
        this.#reopening = false;
        this.#writing = false;
        this.#opening = false;
        if (!this.#sync)
          this.emit("error", err2);
        else
          queueMicrotask(() => void (this.listenerCount("error") && this.emit("error", err2)));
        return;
      }
      const reopening = this.#reopening;
      this.#fd = fd;
      this.#file = file;
      this.#reopening = false;
      this.#opening = false;
      this.#writing = false;
      if (!this.#sync)
        this.emit("ready");
      else
        queueMicrotask(() => this.emit("ready"));
      if (this.#destroyed)
        return;
      if (!this.#writing && this.#len > this.#minLength || this.#flushPending)
        this.#actualWrite();
      else if (reopening)
        queueMicrotask(() => this.emit("drain"));
    };
    const flags = this.#append ? "a" : "w";
    const mode = this.#mode ?? 438;
    if (this.#sync) {
      try {
        if (this.#mkdir)
          this.#fs.mkdirSync(dirname(file), { recursive: true });
        fileOpened(null, this.#fs.openSync(file, flags, mode));
      } catch (e) {
        fileOpened(e);
        throw e;
      }
    } else if (this.#mkdir) {
      this.#fs.mkdir(dirname(file), { recursive: true }, (err2) => {
        if (err2)
          return fileOpened(err2);
        this.#fs.open(file, flags, mode, fileOpened);
      });
    } else {
      this.#fs.open(file, flags, mode, fileOpened);
    }
  }
  #actualClose() {
    if (this.#fd === -1) {
      this.once("ready", () => this.#actualClose());
      return;
    }
    if (this.#periodicFlushTimer !== void 0)
      clearInterval(this.#periodicFlushTimer);
    this.#destroyed = true;
    this.#bufs = [];
    this.#lens = [];
    const done = (err2) => {
      if (err2) {
        this.emit("error", err2);
        return;
      }
      if (this.#ending && !this.#writing)
        this.emit("finish");
      this.emit("close");
    };
    const closeWrapped = () => {
      if (this.#fd !== 1 && this.#fd !== 2)
        this.#fs.close(this.#fd, done);
      else
        done(null);
    };
    try {
      this.#fs.fsync(this.#fd, closeWrapped);
    } catch {
    }
  }
  #actualWrite() {
    this.#writing = true;
    if (this.#contentMode == "buffer") {
      this.#writingBuf = this.#writingBuf.length ? this.#writingBuf : _mergeBuffers(this.#bufs.shift() ?? [], this.#lens.shift() ?? 0);
    } else {
      this.#writingBuf ||= this.#bufs.shift() || "";
    }
    if (!this.#sync) {
      this.#writeToFS();
      return;
    }
    try {
      this.#released(null, this.#writeToFSSync());
    } catch (e) {
      this.#released(e);
    }
  }
  #callFlushCallbackOnDrain(cb) {
    this.#flushPending = true;
    const onDrain = () => {
      if (this.#fsync || this.#destroyed) {
        this.#flushPending = false;
        cb(null);
      } else {
        try {
          this.#fs.fsync(this.#fd, (err2) => {
            this.#flushPending = false;
            cb(err2?.code == "EBADF" ? null : err2);
          });
        } catch (e) {
          this.#flushPending = false;
          cb(e);
        }
      }
      this.off("error", onError);
    };
    const onError = (err2) => {
      this.#flushPending = false;
      cb(err2);
      this.off("drain", onDrain);
    };
    this.once("drain", onDrain);
    this.once("error", onError);
  }
  // Node relies on the `newListener` event to know when a `drain` listener is added.
  // `eventemitter3` does not have it, so the listener methods are patched instead.
  on(event, fn, context) {
    if (event === "drain")
      this.#asyncDrainScheduled = false;
    return super.on(event, fn, context);
  }
  addListener(event, fn, context) {
    return this.on(event, fn, context);
  }
  once(event, fn, context) {
    if (event === "drain")
      this.#asyncDrainScheduled = false;
    return super.once(event, fn, context);
  }
  off(event, fn, context, once) {
    return super.off(event, fn, context, once);
  }
  removeListener(event, fn, context, once) {
    return super.removeListener(event, fn, context, once);
  }
  setMaxListeners() {
    throw UV("ENOSYS", "Utf8Stream.setMaxListeners");
  }
  getMaxListeners() {
    throw UV("ENOSYS", "Utf8Stream.getMaxListeners");
  }
  prependListener() {
    throw UV("ENOSYS", "Utf8Stream.prependListener");
  }
  prependOnceListener() {
    throw UV("ENOSYS", "Utf8Stream.prependOnceListener");
  }
  rawListeners() {
    throw UV("ENOSYS", "Utf8Stream.rawListeners");
  }
};

// node_modules/@zenfs/core/dist/vfs/xattr.js
var xattr_exports = {};
__export(xattr_exports, {
  get: () => get3,
  getSync: () => getSync,
  list: () => list,
  listSync: () => listSync,
  remove: () => remove2,
  removeSync: () => removeSync,
  set: () => set3,
  setSync: () => setSync
});
var import_buffer10 = __toESM(require_buffer(), 1);
var _allowedRestrictedNames = [];
function checkName($, name, path, syscall) {
  if (!name.startsWith("user.") && !_allowedRestrictedNames.includes(name))
    throw UV("ENOTSUP", syscall, path);
}
async function get3(path, name, opt = {}) {
  path = normalizePath(path);
  const { fs, path: resolved } = resolveMount(path, this);
  checkName(this, name, path, "xattr.get");
  const inode = await fs.stat(resolved).catch(rethrow("xattr.get", path));
  if (checkAccess && !hasAccess(this, inode, R_OK))
    throw UV("EACCES", "xattr.get", path);
  inode.attributes ??= new Attributes();
  const value = inode.attributes.get(name);
  if (!value)
    throw UV("ENODATA", "xattr.get", path);
  const buffer = import_buffer10.Buffer.from(value);
  return opt.encoding == "buffer" || !opt.encoding ? buffer : buffer.toString(opt.encoding);
}
function getSync(path, name, opt = {}) {
  path = normalizePath(path);
  checkName(this, name, path, "xattr.get");
  const { fs, path: resolved } = resolveMount(path, this);
  let inode;
  try {
    inode = fs.statSync(resolved);
  } catch (e) {
    throw setUVMessage(Object.assign(e, { path }));
  }
  if (checkAccess && !hasAccess(this, inode, R_OK))
    throw UV("EACCES", "xattr.get", path);
  inode.attributes ??= new Attributes();
  const value = inode.attributes.get(name);
  if (!value)
    throw UV("ENODATA", "xattr.get", path);
  const buffer = import_buffer10.Buffer.from(value);
  return opt.encoding == "buffer" || !opt.encoding ? buffer : buffer.toString(opt.encoding);
}
async function set3(path, name, value, opt = {}) {
  path = normalizePath(path);
  const { fs, path: resolved } = resolveMount(path, this);
  checkName(this, name, path, "xattr.set");
  const inode = await fs.stat(resolved).catch(rethrow("xattr.set", path));
  if (checkAccess && !hasAccess(this, inode, W_OK))
    throw UV("EACCES", "xattr.set", path);
  inode.attributes ??= new Attributes();
  const attr = inode.attributes.get(name);
  if (opt.create && attr)
    throw UV("EEXIST", "xattr.set", path);
  if (opt.replace && !attr)
    throw UV("ENODATA", "xattr.set", path);
  inode.attributes.set(name, import_buffer10.Buffer.from(value));
  await fs.touch(resolved, inode).catch(rethrow("xattr.set", path));
}
function setSync(path, name, value, opt = {}) {
  path = normalizePath(path);
  const { fs, path: resolved } = resolveMount(path, this);
  checkName(this, name, path, "xattr.set");
  let inode;
  try {
    inode = fs.statSync(resolved);
  } catch (e) {
    throw setUVMessage(Object.assign(e, { path }));
  }
  if (checkAccess && !hasAccess(this, inode, W_OK))
    throw UV("EACCES", "xattr.set", path);
  inode.attributes ??= new Attributes();
  const attr = inode.attributes.get(name);
  if (opt.create && attr)
    throw UV("EEXIST", "xattr.set", path);
  if (opt.replace && !attr)
    throw UV("ENODATA", "xattr.set", path);
  inode.attributes.set(name, import_buffer10.Buffer.from(value));
  try {
    fs.touchSync(resolved, inode);
  } catch (e) {
    throw setUVMessage(Object.assign(e, { path }));
  }
}
async function remove2(path, name) {
  path = normalizePath(path);
  const { fs, path: resolved } = resolveMount(path, this);
  checkName(this, name, path, "xattr.remove");
  const inode = await fs.stat(resolved).catch(rethrow("xattr.remove", path));
  if (checkAccess && !hasAccess(this, inode, W_OK))
    throw UV("EACCES", "xattr.remove", path);
  inode.attributes ??= new Attributes();
  const attr = inode.attributes.get(name);
  if (!attr)
    throw UV("ENODATA", "xattr.remove", path);
  inode.attributes.remove(name);
  await fs.touch(resolved, inode);
}
function removeSync(path, name) {
  path = normalizePath(path);
  const { fs, path: resolved } = resolveMount(path, this);
  checkName(this, name, path, "xattr.remove");
  let inode;
  try {
    inode = fs.statSync(resolved);
  } catch (e) {
    throw setUVMessage(Object.assign(e, { path }));
  }
  if (checkAccess && !hasAccess(this, inode, W_OK))
    throw UV("EACCES", "xattr.remove", path);
  inode.attributes ??= new Attributes();
  const attr = inode.attributes.get(name);
  if (!attr)
    throw UV("ENODATA", "xattr.remove", path);
  inode.attributes.remove(name);
  try {
    fs.touchSync(resolved, inode);
  } catch (e) {
    throw setUVMessage(Object.assign(e, { path }));
  }
}
async function list(path) {
  path = normalizePath(path);
  const { fs, path: resolved } = resolveMount(path, this);
  const inode = await fs.stat(resolved).catch(rethrow("xattr.list", path));
  if (!inode.attributes)
    return [];
  return [...inode.attributes.keys()];
}
function listSync(path) {
  path = normalizePath(path);
  const { fs, path: resolved } = resolveMount(path, this);
  let inode;
  try {
    inode = fs.statSync(resolved);
  } catch (e) {
    throw setUVMessage(Object.assign(e, { path }));
  }
  if (!inode.attributes)
    return [];
  return [...inode.attributes.keys()];
}

// node_modules/@zenfs/core/dist/mixins/sync.js
function Sync(FS) {
  class SyncFS extends FS {
    async exists(path) {
      return this.existsSync(path);
    }
    async rename(oldPath, newPath) {
      return this.renameSync(oldPath, newPath);
    }
    async stat(path) {
      return this.statSync(path);
    }
    async touch(path, metadata) {
      return this.touchSync(path, metadata);
    }
    async createFile(path, options) {
      return this.createFileSync(path, options);
    }
    async unlink(path) {
      return this.unlinkSync(path);
    }
    async rmdir(path) {
      return this.rmdirSync(path);
    }
    async mkdir(path, options) {
      return this.mkdirSync(path, options);
    }
    async readdir(path) {
      return this.readdirSync(path);
    }
    async link(srcpath, dstpath) {
      return this.linkSync(srcpath, dstpath);
    }
    async sync() {
      return this.syncSync();
    }
    async read(path, buffer, offset, end) {
      return this.readSync(path, buffer, offset, end);
    }
    async write(path, buffer, offset) {
      return this.writeSync(path, buffer, offset);
    }
  }
  return SyncFS;
}

// node_modules/@zenfs/core/dist/node/compat.js
var compat_exports = {};
__export(compat_exports, {
  BigIntStatsFs: () => BigIntStatsFs,
  Dir: () => Dir,
  Dirent: () => Dirent2,
  IOC: () => IOC,
  IOC32: () => IOC32,
  ReadStream: () => ReadStream,
  Stats: () => Stats,
  StatsFs: () => StatsFs,
  Utf8Stream: () => Utf8Stream,
  WriteStream: () => WriteStream,
  _version: () => _version,
  access: () => access2,
  accessSync: () => accessSync,
  appendFile: () => appendFile2,
  appendFileSync: () => appendFileSync,
  chmod: () => chmod2,
  chmodSync: () => chmodSync,
  chown: () => chown2,
  chownSync: () => chownSync,
  chroot: () => chroot,
  close: () => close,
  closeSync: () => closeSync,
  constants: () => constants_exports,
  copyFile: () => copyFile2,
  copyFileSync: () => copyFileSync,
  cp: () => cp2,
  cpSync: () => cpSync,
  createReadStream: () => createReadStream,
  createWriteStream: () => createWriteStream,
  exists: () => exists2,
  existsSync: () => existsSync,
  fchmod: () => fchmod,
  fchmodSync: () => fchmodSync,
  fchown: () => fchown,
  fchownSync: () => fchownSync,
  fdatasync: () => fdatasync,
  fdatasyncSync: () => fdatasyncSync,
  fstat: () => fstat,
  fstatSync: () => fstatSync,
  fsync: () => fsync,
  fsyncSync: () => fsyncSync,
  ftruncate: () => ftruncate,
  ftruncateSync: () => ftruncateSync,
  futimes: () => futimes,
  futimesSync: () => futimesSync,
  glob: () => glob2,
  globSync: () => globSync,
  ioctl: () => ioctl,
  ioctlSync: () => ioctlSync,
  lchmod: () => lchmod2,
  lchmodSync: () => lchmodSync,
  lchown: () => lchown2,
  lchownSync: () => lchownSync,
  link: () => link4,
  linkSync: () => linkSync,
  lopenSync: () => lopenSync,
  lstat: () => lstat2,
  lstatSync: () => lstatSync,
  lutimes: () => lutimes2,
  lutimesSync: () => lutimesSync,
  mkdir: () => mkdir4,
  mkdirSync: () => mkdirSync,
  mkdtemp: () => mkdtemp2,
  mkdtempDisposableSync: () => mkdtempDisposableSync,
  mkdtempSync: () => mkdtempSync,
  mount: () => mount,
  open: () => open4,
  openAsBlob: () => openAsBlob,
  openSync: () => openSync,
  opendir: () => opendir2,
  opendirSync: () => opendirSync,
  promises: () => promises_exports,
  read: () => read,
  readFile: () => readFile2,
  readFileSync: () => readFileSync,
  readSync: () => readSync,
  readdir: () => readdir4,
  readdirSync: () => readdirSync,
  readlink: () => readlink4,
  readlinkSync: () => readlinkSync,
  readv: () => readv,
  readvSync: () => readvSync,
  realpath: () => realpath2,
  realpathSync: () => realpathSync,
  rename: () => rename4,
  renameSync: () => renameSync,
  rm: () => rm2,
  rmSync: () => rmSync,
  rmdir: () => rmdir2,
  rmdirSync: () => rmdirSync,
  stat: () => stat4,
  statSync: () => statSync,
  statfs: () => statfs2,
  statfsSync: () => statfsSync,
  symlink: () => symlink2,
  symlinkSync: () => symlinkSync,
  truncate: () => truncate2,
  truncateSync: () => truncateSync,
  umount: () => umount,
  unlink: () => unlink2,
  unlinkSync: () => unlinkSync,
  unwatchFile: () => unwatchFile,
  utimes: () => utimes2,
  utimesSync: () => utimesSync,
  watch: () => watch2,
  watchFile: () => watchFile,
  write: () => write,
  writeFile: () => writeFile2,
  writeFileSync: () => writeFileSync,
  writeSync: () => writeSync,
  writev: () => writev,
  writevSync: () => writevSync,
  xattr: () => xattr_exports
});

// node_modules/@zenfs/core/dist/vfs/ioctl.js
var __esDecorate6 = function(ctor, descriptorIn, decorators, contextIn, initializers, extraInitializers) {
  function accept(f) {
    if (f !== void 0 && typeof f !== "function") throw new TypeError("Function expected");
    return f;
  }
  var kind = contextIn.kind, key = kind === "getter" ? "get" : kind === "setter" ? "set" : "value";
  var target = !descriptorIn && ctor ? contextIn["static"] ? ctor : ctor.prototype : null;
  var descriptor = descriptorIn || (target ? Object.getOwnPropertyDescriptor(target, contextIn.name) : {});
  var _, done = false;
  for (var i = decorators.length - 1; i >= 0; i--) {
    var context = {};
    for (var p in contextIn) context[p] = p === "access" ? {} : contextIn[p];
    for (var p in contextIn.access) context.access[p] = contextIn.access[p];
    context.addInitializer = function(f) {
      if (done) throw new TypeError("Cannot add initializers after decoration has completed");
      extraInitializers.push(accept(f || null));
    };
    var result = (0, decorators[i])(kind === "accessor" ? { get: descriptor.get, set: descriptor.set } : descriptor[key], context);
    if (kind === "accessor") {
      if (result === void 0) continue;
      if (result === null || typeof result !== "object") throw new TypeError("Object expected");
      if (_ = accept(result.get)) descriptor.get = _;
      if (_ = accept(result.set)) descriptor.set = _;
      if (_ = accept(result.init)) initializers.unshift(_);
    } else if (_ = accept(result)) {
      if (kind === "field") initializers.unshift(_);
      else descriptor[key] = _;
    }
  }
  if (target) Object.defineProperty(target, contextIn.name, descriptor);
  done = true;
};
var __runInitializers6 = function(thisArg, initializers, value) {
  var useValue = arguments.length > 2;
  for (var i = 0; i < initializers.length; i++) {
    value = useValue ? initializers[i].call(thisArg, value) : initializers[i].call(thisArg);
  }
  return useValue ? value : void 0;
};
var XFlag;
(function(XFlag2) {
  XFlag2[XFlag2["RealTime"] = 1] = "RealTime";
  XFlag2[XFlag2["PreAlloc"] = 2] = "PreAlloc";
  XFlag2[XFlag2["Immutable"] = 8] = "Immutable";
  XFlag2[XFlag2["Append"] = 16] = "Append";
  XFlag2[XFlag2["Sync"] = 32] = "Sync";
  XFlag2[XFlag2["NoAtime"] = 64] = "NoAtime";
  XFlag2[XFlag2["NoDump"] = 128] = "NoDump";
  XFlag2[XFlag2["RtInherit"] = 256] = "RtInherit";
  XFlag2[XFlag2["ProjInherit"] = 512] = "ProjInherit";
  XFlag2[XFlag2["NoSymlinks"] = 1024] = "NoSymlinks";
  XFlag2[XFlag2["ExtSize"] = 2048] = "ExtSize";
  XFlag2[XFlag2["ExtSzInherit"] = 4096] = "ExtSzInherit";
  XFlag2[XFlag2["NoDefrag"] = 8192] = "NoDefrag";
  XFlag2[XFlag2["FileStream"] = 16384] = "FileStream";
  XFlag2[XFlag2["Dax"] = 32768] = "Dax";
  XFlag2[XFlag2["CowExtSize"] = 65536] = "CowExtSize";
  XFlag2[XFlag2["HasAttr"] = 2147483648] = "HasAttr";
})(XFlag || (XFlag = {}));
var fsxattr = (() => {
  var _a, _b, _c, _d, _e;
  let _classDecorators = [struct()];
  let _classDescriptor;
  let _classExtraInitializers = [];
  let _classThis;
  let _classSuper = $from(BufferView);
  let _xflags_decorators;
  let _xflags_initializers = [];
  let _xflags_extraInitializers = [];
  let _extsize_decorators;
  let _extsize_initializers = [];
  let _extsize_extraInitializers = [];
  let _nextents_decorators;
  let _nextents_initializers = [];
  let _nextents_extraInitializers = [];
  let _projid_decorators;
  let _projid_initializers = [];
  let _projid_extraInitializers = [];
  let _cowextsize_decorators;
  let _cowextsize_initializers = [];
  let _cowextsize_extraInitializers = [];
  let _pad_decorators;
  let _pad_initializers = [];
  let _pad_extraInitializers = [];
  var fsxattr2 = class extends _classSuper {
    static {
      _classThis = this;
    }
    static {
      const _metadata = typeof Symbol === "function" && Symbol.metadata ? Object.create(_classSuper[Symbol.metadata] ?? null) : void 0;
      _xflags_decorators = [(_a = types2).uint32.bind(_a)];
      _extsize_decorators = [(_b = types2).uint32.bind(_b)];
      _nextents_decorators = [(_c = types2).uint32.bind(_c)];
      _projid_decorators = [(_d = types2).uint32.bind(_d)];
      _cowextsize_decorators = [(_e = types2).uint32.bind(_e)];
      _pad_decorators = [types2.char(8)];
      __esDecorate6(this, null, _xflags_decorators, { kind: "accessor", name: "xflags", static: false, private: false, access: { has: (obj) => "xflags" in obj, get: (obj) => obj.xflags, set: (obj, value) => {
        obj.xflags = value;
      } }, metadata: _metadata }, _xflags_initializers, _xflags_extraInitializers);
      __esDecorate6(this, null, _extsize_decorators, { kind: "accessor", name: "extsize", static: false, private: false, access: { has: (obj) => "extsize" in obj, get: (obj) => obj.extsize, set: (obj, value) => {
        obj.extsize = value;
      } }, metadata: _metadata }, _extsize_initializers, _extsize_extraInitializers);
      __esDecorate6(this, null, _nextents_decorators, { kind: "accessor", name: "nextents", static: false, private: false, access: { has: (obj) => "nextents" in obj, get: (obj) => obj.nextents, set: (obj, value) => {
        obj.nextents = value;
      } }, metadata: _metadata }, _nextents_initializers, _nextents_extraInitializers);
      __esDecorate6(this, null, _projid_decorators, { kind: "accessor", name: "projid", static: false, private: false, access: { has: (obj) => "projid" in obj, get: (obj) => obj.projid, set: (obj, value) => {
        obj.projid = value;
      } }, metadata: _metadata }, _projid_initializers, _projid_extraInitializers);
      __esDecorate6(this, null, _cowextsize_decorators, { kind: "accessor", name: "cowextsize", static: false, private: false, access: { has: (obj) => "cowextsize" in obj, get: (obj) => obj.cowextsize, set: (obj, value) => {
        obj.cowextsize = value;
      } }, metadata: _metadata }, _cowextsize_initializers, _cowextsize_extraInitializers);
      __esDecorate6(this, null, _pad_decorators, { kind: "accessor", name: "pad", static: false, private: false, access: { has: (obj) => "pad" in obj, get: (obj) => obj.pad, set: (obj, value) => {
        obj.pad = value;
      } }, metadata: _metadata }, _pad_initializers, _pad_extraInitializers);
      __esDecorate6(null, _classDescriptor = { value: _classThis }, _classDecorators, { kind: "class", name: _classThis.name, metadata: _metadata }, null, _classExtraInitializers);
      fsxattr2 = _classThis = _classDescriptor.value;
      if (_metadata) Object.defineProperty(_classThis, Symbol.metadata, { enumerable: true, configurable: true, writable: true, value: _metadata });
    }
    static name = "fsxattr";
    #xflags_accessor_storage = __runInitializers6(this, _xflags_initializers, void 0);
    /** xflags field value */
    get xflags() {
      return this.#xflags_accessor_storage;
    }
    set xflags(value) {
      this.#xflags_accessor_storage = value;
    }
    #extsize_accessor_storage = (__runInitializers6(this, _xflags_extraInitializers), __runInitializers6(this, _extsize_initializers, void 0));
    /** extsize field value */
    get extsize() {
      return this.#extsize_accessor_storage;
    }
    set extsize(value) {
      this.#extsize_accessor_storage = value;
    }
    #nextents_accessor_storage = (__runInitializers6(this, _extsize_extraInitializers), __runInitializers6(this, _nextents_initializers, void 0));
    /** nextents field value */
    get nextents() {
      return this.#nextents_accessor_storage;
    }
    set nextents(value) {
      this.#nextents_accessor_storage = value;
    }
    #projid_accessor_storage = (__runInitializers6(this, _nextents_extraInitializers), __runInitializers6(this, _projid_initializers, void 0));
    /** project identifier */
    get projid() {
      return this.#projid_accessor_storage;
    }
    set projid(value) {
      this.#projid_accessor_storage = value;
    }
    #cowextsize_accessor_storage = (__runInitializers6(this, _projid_extraInitializers), __runInitializers6(this, _cowextsize_initializers, void 0));
    /** CoW extsize field value */
    get cowextsize() {
      return this.#cowextsize_accessor_storage;
    }
    set cowextsize(value) {
      this.#cowextsize_accessor_storage = value;
    }
    #pad_accessor_storage = (__runInitializers6(this, _cowextsize_extraInitializers), __runInitializers6(this, _pad_initializers, []));
    get pad() {
      return this.#pad_accessor_storage;
    }
    set pad(value) {
      this.#pad_accessor_storage = value;
    }
    constructor(inode = _throw(new Exception(Errno.EINVAL, "fsxattr must be initialized with an inode"))) {
      super(new ArrayBuffer(sizeof(fsxattr2)));
      __runInitializers6(this, _pad_extraInitializers);
      this.extsize = inode.size;
      this.nextents = 1;
      this.projid = inode.uid;
      this.cowextsize = inode.size;
      for (const name of Object.keys(InodeFlags)) {
        if (!(inode.flags & InodeFlags[name]))
          continue;
        if (name in XFlag)
          this.xflags |= XFlag[name];
      }
    }
    static {
      __runInitializers6(_classThis, _classExtraInitializers);
    }
  };
  return fsxattr2 = _classThis;
})();
var FileFlag;
(function(FileFlag2) {
  FileFlag2[FileFlag2["SecureRm"] = 1] = "SecureRm";
  FileFlag2[FileFlag2["Undelete"] = 2] = "Undelete";
  FileFlag2[FileFlag2["Compress"] = 4] = "Compress";
  FileFlag2[FileFlag2["Sync"] = 8] = "Sync";
  FileFlag2[FileFlag2["Immutable"] = 16] = "Immutable";
  FileFlag2[FileFlag2["Append"] = 32] = "Append";
  FileFlag2[FileFlag2["NoDump"] = 64] = "NoDump";
  FileFlag2[FileFlag2["NoAtime"] = 128] = "NoAtime";
  FileFlag2[FileFlag2["Dirty"] = 256] = "Dirty";
  FileFlag2[FileFlag2["CompressBlk"] = 512] = "CompressBlk";
  FileFlag2[FileFlag2["NoCompress"] = 1024] = "NoCompress";
  FileFlag2[FileFlag2["Encrypt"] = 2048] = "Encrypt";
  FileFlag2[FileFlag2["Btree"] = 4096] = "Btree";
  FileFlag2[FileFlag2["Index"] = 4096] = "Index";
  FileFlag2[FileFlag2["IMagic"] = 8192] = "IMagic";
  FileFlag2[FileFlag2["JournalData"] = 16384] = "JournalData";
  FileFlag2[FileFlag2["NoTail"] = 32768] = "NoTail";
  FileFlag2[FileFlag2["DirSync"] = 65536] = "DirSync";
  FileFlag2[FileFlag2["TopDir"] = 131072] = "TopDir";
  FileFlag2[FileFlag2["HugeFile"] = 262144] = "HugeFile";
  FileFlag2[FileFlag2["Extent"] = 524288] = "Extent";
  FileFlag2[FileFlag2["Verity"] = 1048576] = "Verity";
  FileFlag2[FileFlag2["EaInode"] = 2097152] = "EaInode";
  FileFlag2[FileFlag2["EofBlocks"] = 4194304] = "EofBlocks";
  FileFlag2[FileFlag2["NoCow"] = 8388608] = "NoCow";
  FileFlag2[FileFlag2["Dax"] = 33554432] = "Dax";
  FileFlag2[FileFlag2["InlineData"] = 268435456] = "InlineData";
  FileFlag2[FileFlag2["ProjInherit"] = 536870912] = "ProjInherit";
  FileFlag2[FileFlag2["CaseFold"] = 1073741824] = "CaseFold";
  FileFlag2[FileFlag2["Reserved"] = 2147483648] = "Reserved";
})(FileFlag || (FileFlag = {}));
var IOC;
(function(IOC2) {
  IOC2[IOC2["GetFlags"] = 2148034049] = "GetFlags";
  IOC2[IOC2["SetFlags"] = 1074292226] = "SetFlags";
  IOC2[IOC2["GetVersion"] = 2148038145] = "GetVersion";
  IOC2[IOC2["SetVersion"] = 1074296322] = "SetVersion";
  IOC2[IOC2["Fiemap"] = 3223348747] = "Fiemap";
  IOC2[IOC2["GetXattr"] = 2149341215] = "GetXattr";
  IOC2[IOC2["SetXattr"] = 1075599392] = "SetXattr";
  IOC2[IOC2["GetLabel"] = 2164298801] = "GetLabel";
  IOC2[IOC2["SetLabel"] = 1090556978] = "SetLabel";
  IOC2[IOC2["GetUUID"] = 2148603136] = "GetUUID";
  IOC2[IOC2["GetSysfsPath"] = 2155943169] = "GetSysfsPath";
})(IOC || (IOC = {}));
var IOC32;
(function(IOC322) {
  IOC322[IOC322["GetFlags"] = 2147771905] = "GetFlags";
  IOC322[IOC322["SetFlags"] = 1074030082] = "SetFlags";
  IOC322[IOC322["GetVersion"] = 2147776001] = "GetVersion";
  IOC322[IOC322["SetVersion"] = 1074034178] = "SetVersion";
})(IOC32 || (IOC32 = {}));
async function ioctl(path, command, ...args) {
  path = normalizePath(path);
  const { fs, path: resolved } = resolveMount(path, this);
  try {
    const inode = new Inode(await fs.stat(resolved));
    switch (command) {
      case IOC.GetFlags:
      case IOC32.GetFlags:
        return inode.flags;
      case IOC.SetFlags:
      case IOC32.SetFlags:
        inode.flags = args[0];
        await fs.touch(resolved, inode);
        return void 0;
      case IOC.GetVersion:
      case IOC32.GetVersion:
        return inode.version;
      case IOC.SetVersion:
      case IOC32.SetVersion:
        inode.version = args[0];
        await fs.touch(resolved, inode);
        return void 0;
      case IOC.Fiemap:
        break;
      case IOC.GetXattr:
        return new fsxattr(inode);
      case IOC.SetXattr:
        break;
      case IOC.GetLabel:
        return fs.label;
      case IOC.SetLabel:
        fs.label = args[0];
        return void 0;
      case IOC.GetUUID:
        return fs.uuid;
      case IOC.GetSysfsPath:
        return `/sys/fs/${fs.name}/${fs.uuid}`;
    }
  } catch (e) {
    throw setUVMessage(Object.assign(e, { syscall: "ioctl", path }));
  }
  throw UV("ENOTSUP", "ioctl", path);
}
function ioctlSync(path, command, ...args) {
  path = normalizePath(path);
  const { fs, path: resolved } = resolveMount(path, this);
  try {
    const inode = new Inode(fs.statSync(resolved));
    switch (command) {
      case IOC.GetFlags:
      case IOC32.GetFlags:
        return inode.flags;
      case IOC.SetFlags:
      case IOC32.SetFlags:
        inode.flags = args[0];
        fs.touchSync(resolved, inode);
        return void 0;
      case IOC.GetVersion:
      case IOC32.GetVersion:
        return inode.version;
      case IOC.SetVersion:
      case IOC32.SetVersion:
        inode.version = args[0];
        fs.touchSync(resolved, inode);
        return void 0;
      case IOC.Fiemap:
        break;
      case IOC.GetXattr:
        return new fsxattr(inode);
      case IOC.SetXattr:
        break;
      case IOC.GetLabel:
        return fs.label;
      case IOC.SetLabel:
        fs.label = args[0];
        return void 0;
      case IOC.GetUUID:
        return fs.uuid;
      case IOC.GetSysfsPath:
        return `/sys/fs/${fs.name}/${fs.uuid}`;
    }
  } catch (e) {
    throw setUVMessage(Object.assign(e, { syscall: "ioctl", path }));
  }
  throw UV("ENOTSUP", "ioctl", path);
}

// node_modules/@zenfs/core/package.json
var package_default = {
  name: "@zenfs/core",
  version: "2.6.3",
  description: "A filesystem, anywhere",
  funding: {
    type: "individual",
    url: "https://github.com/sponsors/james-pre"
  },
  main: "dist/index.js",
  types: "dist/index.d.ts",
  keywords: [
    "filesystem",
    "node",
    "storage"
  ],
  bin: {
    "make-index": "scripts/make-index.js",
    "zenfs-test": "scripts/test.js",
    zci: "scripts/ci-cli.js"
  },
  files: [
    "dist",
    "tests",
    "types",
    "license.md",
    "eslint.shared.js"
  ],
  type: "module",
  homepage: "https://zenfs.dev/core",
  author: "James Prevett <jp@jamespre.dev> (https://jamespre.dev)",
  contributors: [
    "John Vilk <jvilk@cs.umass.edu>"
  ],
  license: "LGPL-3.0-or-later",
  repository: {
    type: "git",
    url: "git+https://github.com/zen-fs/core.git"
  },
  bugs: {
    url: "https://github.com/zen-fs/core/issues"
  },
  engines: {
    node: ">= 18"
  },
  exports: {
    ".": "./dist/index.js",
    "./*": "./dist/*",
    "./emulation/*": "./dist/node/*",
    "./promises": "./dist/node/promises.js",
    "./readline": "./dist/node/readline.js",
    "./constants": "./dist/constants.js",
    "./path": "./dist/path.js",
    "./eslint": "./eslint.shared.js",
    "./tests/*": "./tests/*",
    "./types/*": "./types/*"
  },
  publishConfig: {
    access: "public",
    provenance: true
  },
  scripts: {
    format: "prettier --write .",
    "format:check": "prettier --check .",
    "spdx:check": "npx lice -a src tests/*.ts tests/**/*.test.ts",
    "spdx:fix": "npx lice -aw src tests/*.ts tests/**/*.test.ts",
    lint: "eslint src tests",
    test: "npx --silent zenfs-test --clean; npx --silent zenfs-test -abcp; tests/fetch/run.sh; npx --silent zenfs-test --report",
    build: "tsc -p tsconfig.json",
    "build:docs": "typedoc",
    dev: "tsc -p tsconfig.json --watch",
    prepublishOnly: "npm run build"
  },
  dependencies: {
    "@types/node": "^26.0.0",
    buffer: "^6.0.3",
    eventemitter3: "^5.0.1",
    kerium: "^1.4.2",
    memium: "^1.0.0",
    "readable-stream": "^4.5.2",
    utilium: "^3.0.0"
  },
  devDependencies: {
    "@eslint/js": "^10.0.1",
    "@octokit/action": "^8.0.4",
    c8: "^12.0.0",
    eslint: "^10.1.0",
    globals: "^17.3.0",
    prettier: "^3.2.5",
    tsx: "^4.19.1",
    typedoc: "^0.28.18",
    typescript: "^6.0.0",
    "typescript-eslint": "^8.58.0"
  },
  allowScripts: {
    esbuild: true
  }
};

// node_modules/@zenfs/core/dist/node/compat.js
var _version = package_default.version;

// node_modules/@zenfs/core/dist/index.js
globalThis.__zenfs__ = Object.create(compat_exports);

// node_modules/@zenfs/dom/dist/utils.js
function errnoForDOMException(ex) {
  switch (ex.name) {
    case "TypeMismatchError":
      return "EPERM";
    case "IndexSizeError":
    case "HierarchyRequestError":
    case "InvalidCharacterError":
    case "InvalidStateError":
    case "SyntaxError":
    case "NamespaceError":
    case "ConstraintError":
    case "VersionError":
    case "URLMismatchError":
    case "InvalidNodeTypeError":
      return "EINVAL";
    case "WrongDocumentError":
      return "EXDEV";
    case "NoModificationAllowedError":
    case "InvalidModificationError":
    case "InvalidAccessError":
    case "SecurityError":
    case "NotAllowedError":
      return "EACCES";
    case "NotFoundError":
      return "ENOENT";
    case "NotSupportedError":
      return "ENOTSUP";
    case "InUseAttributeError":
      return "EBUSY";
    case "NetworkError":
      return "ENETDOWN";
    case "AbortError":
      return "EINTR";
    case "QuotaExceededError":
      return "ENOSPC";
    case "TimeoutError":
      return "ETIMEDOUT";
    case "ReadOnlyError":
      return "EROFS";
    case "DataCloneError":
    case "EncodingError":
    case "NotReadableError":
    case "DataError":
    case "TransactionInactiveError":
    case "OperationError":
    case "UnknownError":
    default:
      return "EIO";
  }
}
function convertException(ex, path) {
  if (ex instanceof Exception)
    return ex;
  const code = ex instanceof DOMException ? Errno[errnoForDOMException(ex)] : Errno.EIO;
  const error2 = new Exception(code, ex.message);
  error2.stack = ex.stack;
  Error.captureStackTrace?.(error2, convertException);
  error2.cause = ex.cause;
  return error2;
}

// node_modules/@zenfs/dom/dist/access.js
function _isShared(buffer) {
  return typeof buffer == "object" && buffer !== null && buffer.constructor.name == "SharedArrayBuffer";
}
function isResizable(buffer) {
  if (buffer instanceof ArrayBuffer)
    return buffer.resizable;
  if (_isShared(buffer))
    return buffer.growable;
  return false;
}
function isKind(handle, kind) {
  return handle.kind == kind;
}
var WebAccessFS = class extends Async(IndexFS) {
  /**
   * Loads all of the handles.
   * @internal @hidden
   */
  async _loadHandles(path, handle) {
    for await (const [key, child] of handle.entries()) {
      const p = join(path, key);
      this._handles.set(p, child);
      if (isKind(child, "directory"))
        await this._loadHandles(p, child);
    }
  }
  /**
   * Loads metadata
   * @internal @hidden
   */
  async _loadMetadata(metadataPath) {
    this._handles.set("/", this.root);
    await this._loadHandles("/", this.root);
    if (metadataPath) {
      const handle = await this.get("file", metadataPath);
      const file = await handle.getFile();
      const raw = await file.text();
      const data = JSON.parse(raw);
      this.index.fromJSON(data);
      return;
    }
    for (const [path, handle] of this._handles) {
      if (isKind(handle, "file")) {
        const { lastModified, size } = await handle.getFile();
        this.index.set(path, new Inode({ mode: 420 | constants_exports.S_IFREG, size, mtimeMs: lastModified }));
        continue;
      }
      if (!isKind(handle, "directory"))
        throw withErrno("EIO", "Invalid handle");
      this.index.set(path, new Inode({ mode: 511 | constants_exports.S_IFDIR, size: 0 }));
    }
  }
  constructor(root, disableHandleCache = false) {
    super(2003133025, "webaccessfs");
    this.root = root;
    this.disableHandleCache = disableHandleCache;
    this._handles = /* @__PURE__ */ new Map();
    this._sync = InMemory.create({ label: "accessfs-cache" });
    this.attributes.set("no_buffer_resize", true);
    if (disableHandleCache)
      this.attributes.set("no_handle_cache", true);
  }
  async stat(path) {
    try {
      return await super.stat(path);
    } catch (ex) {
      if (ex.code != "ENOENT")
        throw ex;
      const handle = await this.get(null, path);
      const inode = new Inode();
      if (isKind(handle, "file")) {
        const file = await handle.getFile();
        inode.update({
          mode: 420 | constants_exports.S_IFREG,
          size: file.size,
          mtimeMs: file.lastModified
        });
      } else {
        inode.update({
          mode: constants_exports.S_IFDIR | 511,
          size: 0
        });
      }
      this.index.set(path, inode);
      return inode;
    }
  }
  async readdir(path) {
    const dirHandle = await this.get("directory", path);
    return await Array.fromAsync(dirHandle.keys());
  }
  async remove(path) {
    const handle = await this.get("directory", dirname(path));
    for (const p of this._handles.keys())
      if (dirname(p) == path)
        this._handles.delete(p);
    this._handles.delete(path);
    await handle.removeEntry(basename(path), { recursive: true }).catch((ex) => _throw(convertException(ex, path)));
  }
  removeSync() {
    throw log_exports.crit(withErrno("ENOSYS"));
  }
  async read(path, buffer, offset, end) {
    if (end <= offset)
      return;
    const handle = await this.get("file", path);
    const file = await handle.getFile();
    const data = await file.arrayBuffer();
    if (data.byteLength < end - offset)
      throw alert(withErrno("EIO", [
        "Unexpected mismatch in file data size. This should not happen.",
        `tried to read ${end - offset} bytes but the file is ${data.byteLength} bytes.`,
        `path: ${path}`
      ].join("\n" + " ".repeat(24))));
    buffer.set(new Uint8Array(data, offset, end - offset));
  }
  async write(path, buffer, offset) {
    if (isResizable(buffer.buffer) || _isShared(buffer.buffer)) {
      const newBuffer = new Uint8Array(new ArrayBuffer(buffer.byteLength), buffer.byteOffset, buffer.byteLength);
      newBuffer.set(buffer);
      buffer = newBuffer;
    }
    const inode = this.index.get(path);
    if (!inode)
      throw withErrno("ENOENT");
    const isDir = (inode.mode & constants_exports.S_IFMT) == constants_exports.S_IFDIR;
    let handle;
    try {
      handle = await this.get(isDir ? "directory" : "file", path);
    } catch {
      const parent = await this.get("directory", dirname(path));
      handle = await parent[isDir ? "getDirectoryHandle" : "getFileHandle"](basename(path), { create: true }).catch((ex) => _throw(convertException(ex, path)));
      if (!this.disableHandleCache)
        this._handles.set(path, handle);
    }
    if (isDir)
      return;
    if (isKind(handle, "directory")) {
      log_exports.crit(withErrno("EIO", "Mismatch in entry kind on write"));
      return;
    }
    const writable = await handle.createWritable({ keepExistingData: true });
    if (offset) {
      try {
        await writable.seek(offset);
      } catch {
        await writable.write({ type: "seek", position: offset });
      }
    }
    await writable.write(buffer);
    await writable.close();
    const { size, lastModified } = await handle.getFile();
    inode.update({ size, mtimeMs: lastModified });
    this.index.set(path, inode);
  }
  /**
   * Do not use!
   * @deprecated @internal @hidden
   */
  async writeFile(path, data) {
    return this.write(path, data, 0);
  }
  async _mkdir(path) {
    const handle = await this.get("directory", dirname(path));
    const dir = await handle.getDirectoryHandle(basename(path), { create: true }).catch((ex) => _throw(convertException(ex, path)));
    if (!this.disableHandleCache)
      this._handles.set(path, dir);
  }
  async get(kind = null, path) {
    const maybeHandle = this._handles.get(path);
    if (!this.disableHandleCache && maybeHandle) {
      if (kind && !isKind(maybeHandle, kind))
        throw withErrno(kind == "directory" ? "ENOTDIR" : "EISDIR");
      return maybeHandle;
    }
    if (path == "/")
      return this.root;
    const parts = path.slice(1).split("/");
    let dir = this.root;
    for (let i = 0; i < parts.length - 1; ++i) {
      dir = await dir.getDirectoryHandle(parts[i]).catch((ex) => _throw(convertException(ex, path)));
    }
    try {
      const handle = await dir[kind == "file" ? "getFileHandle" : "getDirectoryHandle"](parts.at(-1));
      if (!this.disableHandleCache)
        this._handles.set(path, handle);
      return handle;
    } catch (ex) {
      if (ex.name != "TypeMismatchError")
        throw convertException(ex, path);
      else if (kind === null) {
        const handle = await dir.getFileHandle(parts.at(-1)).catch((ex2) => _throw(convertException(ex2, path)));
        if (!this.disableHandleCache)
          this._handles.set(path, handle);
        return handle;
      } else
        throw withErrno(kind == "file" ? "EISDIR" : "ENOTDIR");
    }
  }
};

// node_modules/@zenfs/dom/dist/IndexedDB.js
function wrap2(request2) {
  return new Promise((resolve4, reject) => {
    request2.onsuccess = () => resolve4(request2.result);
    request2.onerror = (e) => {
      e.preventDefault();
      reject(convertException(request2.error));
    };
  });
}
var IndexedDBTransaction = class extends Transaction {
  /**
   * Run a asynchronous operation from a sync context. Not magic and subject to (race) conditions.
   * @internal
   */
  async(promise) {
    this.asyncDone = this.asyncDone.then(() => promise);
  }
  constructor(tx, store) {
    super(store);
    this.tx = tx;
    this.store = store;
    this.asyncDone = Promise.resolve();
    this._idb = tx.objectStore(store.name);
  }
  async keys() {
    return (await wrap2(this._idb.getAllKeys())).map(Number);
  }
  async get(id) {
    const data = await wrap2(this._idb.get(id));
    if (data)
      this.store.cache.set(id, new Uint8Array(data));
    return data;
  }
  getSync(id, offset, end) {
    if (!this.store.cache.has(id))
      return;
    const data = new Uint8Array(this.store.cache.get(id));
    end ?? (end = data.byteLength);
    return data.subarray(offset, end);
  }
  async set(id, data) {
    this.store.cache.set(id, new Uint8Array(data));
    await wrap2(this._idb.put(data, id));
  }
  setSync(id, data) {
    this.async(this.set(id, data));
  }
  remove(id) {
    this.store.cache.delete(id);
    return wrap2(this._idb.delete(id));
  }
  removeSync(id) {
    this.store.cache.delete(id);
    this.async(this.remove(id));
  }
  async commit() {
    await this.asyncDone;
    const { promise, resolve: resolve4, reject } = Promise.withResolvers();
    this.tx.oncomplete = () => resolve4();
    this.tx.onerror = () => reject(convertException(this.tx.error));
    this.tx.commit();
    return promise;
  }
  async abort() {
    await this.asyncDone;
    const { promise, resolve: resolve4, reject } = Promise.withResolvers();
    this.tx.onabort = () => resolve4();
    this.tx.onerror = () => reject(convertException(this.tx.error));
    this.tx.abort();
    return promise;
  }
};
async function createDB(name, indexedDB = globalThis.indexedDB) {
  const req = indexedDB.open(name);
  req.onupgradeneeded = () => {
    const db = req.result;
    if (db.objectStoreNames.contains(name)) {
      log_exports.warn("Found unexpected object store: " + name);
      db.deleteObjectStore(name);
    }
    db.createObjectStore(name);
  };
  return await wrap2(req);
}
var IndexedDBStore = class {
  constructor(db) {
    this.db = db;
    this.cache = /* @__PURE__ */ new Map();
  }
  sync() {
    return Promise.resolve();
  }
  get name() {
    return this.db.name;
  }
  transaction() {
    const tx = this.db.transaction(this.name, "readwrite");
    return new IndexedDBTransaction(tx, this);
  }
};
var idbTests = /* @__PURE__ */ new WeakMap();
async function testAvailability(idbFactory) {
  if (!(idbFactory instanceof IDBFactory))
    return false;
  try {
    const req = idbFactory.open("__zenfs_test");
    const db = await wrap2(req);
    db.close();
    return true;
  } catch {
    return false;
  } finally {
    idbFactory?.deleteDatabase("__zenfs_test");
  }
}
var _IndexedDB = {
  name: "IndexedDB",
  options: {
    storeName: { type: "string", required: false },
    idbFactory: { type: "object", required: false }
  },
  async isAvailable({ idbFactory = globalThis.indexedDB }) {
    if (idbTests.has(idbFactory))
      return idbTests.get(idbFactory);
    const result = testAvailability(idbFactory);
    idbTests.set(idbFactory, result);
    return result;
  },
  async create(options) {
    const db = await createDB(options.storeName || "zenfs", options.idbFactory);
    const store = new IndexedDBStore(db);
    const fs = new StoreFS(store);
    if (options?.disableAsyncCache) {
      log_exports.notice("Async preloading disabled for IndexedDB");
      return fs;
    }
    const tx = store.transaction();
    for (const id of await tx.keys()) {
      await tx.get(id);
    }
    return fs;
  }
};
var IndexedDB = _IndexedDB;

// node_modules/@zenfs/dom/dist/xml.js
function get_stats(node) {
  const stats = {};
  for (const key of _inode_fields) {
    const value = node.getAttribute(key);
    if (value !== null && value !== void 0)
      stats[key] = parseInt(value, 16);
  }
  return new Inode(stats);
}
function set_stats(node, stats) {
  for (const key of Object.keys(stats)) {
    if (!(key in _inode_fields) || stats[key] === void 0)
      continue;
    node.setAttribute(key, stats[key].toString(16));
  }
}
function get_paths(node, contents = false) {
  let paths;
  try {
    const raw = contents ? node.textContent : node.getAttribute("paths");
    paths = JSON.parse(raw || "[]");
  } catch {
    paths = [];
  }
  return paths;
}
var XMLFS = class extends Sync(FileSystem) {
  constructor(root = new DOMParser().parseFromString("<fs></fs>", "application/xml").documentElement) {
    super(544763244, "xmltmpfs");
    this.root = root;
    try {
      this.mkdirSync("/", { uid: 0, gid: 0, mode: 511 });
    } catch (e) {
      const error2 = e;
      if (error2.code != "EEXIST")
        throw error2;
    }
  }
  renameSync(oldPath, newPath) {
    const node = this.get("rename", oldPath);
    this.remove("rename", node, oldPath);
    this.add("rename", node, newPath);
  }
  statSync(path) {
    return get_stats(this.get("stat", path));
  }
  createFileSync(path, options) {
    const parent = this.statSync(dirname(path));
    const inode = new Inode({
      mode: options.mode | constants_exports.S_IFREG,
      uid: parent.mode & constants_exports.S_ISUID ? parent.uid : options.uid,
      gid: parent.mode & constants_exports.S_ISGID ? parent.gid : options.gid
    });
    this.create("createFile", path, inode);
    return inode;
  }
  unlinkSync(path) {
    const node = this.get("unlink", path);
    if (get_stats(node).mode & constants_exports.S_IFDIR)
      throw withErrno("EISDIR");
    this.remove("unlink", node, path);
  }
  rmdirSync(path) {
    const node = this.get("rmdir", path);
    if (node.textContent?.length)
      throw withErrno("ENOTEMPTY");
    if (!(get_stats(node).mode & constants_exports.S_IFDIR))
      throw withErrno("ENOTDIR");
    this.remove("rmdir", node, path);
  }
  mkdirSync(path, options) {
    const parent = this.statSync(dirname(path));
    const inode = new Inode({
      mode: options.mode | constants_exports.S_IFDIR,
      uid: parent.mode & constants_exports.S_ISUID ? parent.uid : options.uid,
      gid: parent.mode & constants_exports.S_ISGID ? parent.gid : options.gid
    });
    this.create("mkdir", path, inode).textContent = "[]";
    return inode;
  }
  readdirSync(path) {
    const node = this.get("readdir", path);
    if (!(get_stats(node).mode & constants_exports.S_IFDIR))
      throw withErrno("ENOTDIR");
    try {
      return JSON.parse(node.textContent);
    } catch (e) {
      throw withErrno("EIO", "Invalid directory listing: " + e);
    }
  }
  linkSync(target, link5) {
    const node = this.get("link", target);
    this.add("link", node, link5);
  }
  touchSync(path, metadata) {
    const node = this.get("touch", path);
    set_stats(node, metadata);
  }
  syncSync() {
  }
  readSync(path, buffer, offset, end) {
    const node = this.get("read", path);
    const raw = encodeASCII(node.textContent.slice(offset, end));
    buffer.set(raw);
  }
  writeSync(path, buffer, offset) {
    const node = this.get("write", path);
    const data = decodeASCII(buffer);
    const after = node.textContent.slice(offset + data.length);
    node.textContent = node.textContent.slice(0, offset) + data + after;
  }
  toString() {
    return new XMLSerializer().serializeToString(this.root);
  }
  get(syscall, path) {
    const nodes = this.root.children;
    if (!nodes)
      throw withErrno("EIO");
    for (let i = 0; i < nodes.length; i++) {
      if (get_paths(nodes[i]).includes(path))
        return nodes[i];
    }
    throw withErrno("ENOENT");
  }
  create(syscall, path, stats) {
    if (this.existsSync(path))
      throw withErrno("EEXIST");
    const node = document.createElement("file");
    this.add(syscall, node, path);
    set_stats(node, new Inode({
      ...stats,
      uid: stats.mode
    }));
    this.root.append(node);
    return node;
  }
  add(syscall, node, path, contents = false) {
    const paths = get_paths(node, contents);
    paths.push(path);
    if (contents) {
      node.textContent = JSON.stringify(paths);
      return;
    }
    node.setAttribute("paths", JSON.stringify(paths));
    node.setAttribute("nlink", paths.length.toString(16));
    if (path != "/") {
      const parent = this.get(syscall, dirname(path));
      this.add(syscall, parent, basename(path), true);
    }
  }
  remove(syscall, node, path, contents = false) {
    const paths = get_paths(node, contents);
    const i = paths.indexOf(path);
    if (i == -1)
      return;
    paths.splice(i, 1);
    if (contents) {
      node.textContent = JSON.stringify(paths);
      return;
    }
    if (!paths.length) {
      node.remove();
    } else {
      node.setAttribute("paths", JSON.stringify(paths));
      node.setAttribute("nlink", paths.length.toString(16));
    }
    if (path != "/") {
      const parent = this.get(syscall, dirname(path));
      this.remove(syscall, parent, basename(path), true);
    }
  }
};
export {
  InMemory,
  IndexedDB,
  configure2 as configure,
  compat_exports as fs
};
/*! Bundled license information:

ieee754/index.js:
  (*! ieee754. BSD-3-Clause License. Feross Aboukhadijeh <https://feross.org/opensource> *)

buffer/index.js:
  (*!
   * The buffer module from node.js, for the browser.
   *
   * @author   Feross Aboukhadijeh <https://feross.org>
   * @license  MIT
   *)

safe-buffer/index.js:
  (*! safe-buffer. MIT License. Feross Aboukhadijeh <https://feross.org/opensource> *)

@zenfs/core/dist/index.js:
  (*!
   * @zenfs/core — https://npmjs.com/package/@zenfs/core
   * Copyright © James Prevett and other ZenFS contributors.
   * SPDX-License-Identifier: LGPL-3.0-or-later
   *)
*/
