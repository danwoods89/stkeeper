/*
 * ATTENTION: The "eval" devtool has been used (maybe by default in mode: "development").
 * This devtool is neither made for production nor for readable output files.
 * It uses "eval()" calls to create a separate source file in the browser devtools.
 * If you are trying to read the output file, select a different devtool (https://webpack.js.org/configuration/devtool/)
 * or disable the default devtool with "devtool: false".
 * If you are looking for production-ready output files, see mode: "production" (https://webpack.js.org/configuration/mode/).
 */
/******/ (() => { // webpackBootstrap
/******/ 	var __webpack_modules__ = ({

/***/ "./node_modules/electron-is-dev/index.js":
/*!***********************************************!*\
  !*** ./node_modules/electron-is-dev/index.js ***!
  \***********************************************/
/***/ ((module, __unused_webpack_exports, __webpack_require__) => {

"use strict";
eval("\nconst electron = __webpack_require__(/*! electron */ \"electron\");\n\nif (typeof electron === 'string') {\n\tthrow new TypeError('Not running in an Electron environment!');\n}\n\nconst isEnvSet = 'ELECTRON_IS_DEV' in process.env;\nconst getFromEnv = Number.parseInt(process.env.ELECTRON_IS_DEV, 10) === 1;\n\nmodule.exports = isEnvSet ? getFromEnv : !electron.app.isPackaged;\n\n\n//# sourceURL=webpack://stkeeper/./node_modules/electron-is-dev/index.js?");

/***/ }),

/***/ "./node_modules/graceful-fs/clone.js":
/*!*******************************************!*\
  !*** ./node_modules/graceful-fs/clone.js ***!
  \*******************************************/
/***/ ((module) => {

"use strict";
eval("\n\nmodule.exports = clone\n\nvar getPrototypeOf = Object.getPrototypeOf || function (obj) {\n  return obj.__proto__\n}\n\nfunction clone (obj) {\n  if (obj === null || typeof obj !== 'object')\n    return obj\n\n  if (obj instanceof Object)\n    var copy = { __proto__: getPrototypeOf(obj) }\n  else\n    var copy = Object.create(null)\n\n  Object.getOwnPropertyNames(obj).forEach(function (key) {\n    Object.defineProperty(copy, key, Object.getOwnPropertyDescriptor(obj, key))\n  })\n\n  return copy\n}\n\n\n//# sourceURL=webpack://stkeeper/./node_modules/graceful-fs/clone.js?");

/***/ }),

/***/ "./node_modules/graceful-fs/graceful-fs.js":
/*!*************************************************!*\
  !*** ./node_modules/graceful-fs/graceful-fs.js ***!
  \*************************************************/
/***/ ((module, __unused_webpack_exports, __webpack_require__) => {

eval("var fs = __webpack_require__(/*! fs */ \"fs\")\nvar polyfills = __webpack_require__(/*! ./polyfills.js */ \"./node_modules/graceful-fs/polyfills.js\")\nvar legacy = __webpack_require__(/*! ./legacy-streams.js */ \"./node_modules/graceful-fs/legacy-streams.js\")\nvar clone = __webpack_require__(/*! ./clone.js */ \"./node_modules/graceful-fs/clone.js\")\n\nvar util = __webpack_require__(/*! util */ \"util\")\n\n/* istanbul ignore next - node 0.x polyfill */\nvar gracefulQueue\nvar previousSymbol\n\n/* istanbul ignore else - node 0.x polyfill */\nif (typeof Symbol === 'function' && typeof Symbol.for === 'function') {\n  gracefulQueue = Symbol.for('graceful-fs.queue')\n  // This is used in testing by future versions\n  previousSymbol = Symbol.for('graceful-fs.previous')\n} else {\n  gracefulQueue = '___graceful-fs.queue'\n  previousSymbol = '___graceful-fs.previous'\n}\n\nfunction noop () {}\n\nfunction publishQueue(context, queue) {\n  Object.defineProperty(context, gracefulQueue, {\n    get: function() {\n      return queue\n    }\n  })\n}\n\nvar debug = noop\nif (util.debuglog)\n  debug = util.debuglog('gfs4')\nelse if (/\\bgfs4\\b/i.test(process.env.NODE_DEBUG || ''))\n  debug = function() {\n    var m = util.format.apply(util, arguments)\n    m = 'GFS4: ' + m.split(/\\n/).join('\\nGFS4: ')\n    console.error(m)\n  }\n\n// Once time initialization\nif (!fs[gracefulQueue]) {\n  // This queue can be shared by multiple loaded instances\n  var queue = global[gracefulQueue] || []\n  publishQueue(fs, queue)\n\n  // Patch fs.close/closeSync to shared queue version, because we need\n  // to retry() whenever a close happens *anywhere* in the program.\n  // This is essential when multiple graceful-fs instances are\n  // in play at the same time.\n  fs.close = (function (fs$close) {\n    function close (fd, cb) {\n      return fs$close.call(fs, fd, function (err) {\n        // This function uses the graceful-fs shared queue\n        if (!err) {\n          retry()\n        }\n\n        if (typeof cb === 'function')\n          cb.apply(this, arguments)\n      })\n    }\n\n    Object.defineProperty(close, previousSymbol, {\n      value: fs$close\n    })\n    return close\n  })(fs.close)\n\n  fs.closeSync = (function (fs$closeSync) {\n    function closeSync (fd) {\n      // This function uses the graceful-fs shared queue\n      fs$closeSync.apply(fs, arguments)\n      retry()\n    }\n\n    Object.defineProperty(closeSync, previousSymbol, {\n      value: fs$closeSync\n    })\n    return closeSync\n  })(fs.closeSync)\n\n  if (/\\bgfs4\\b/i.test(process.env.NODE_DEBUG || '')) {\n    process.on('exit', function() {\n      debug(fs[gracefulQueue])\n      __webpack_require__(/*! assert */ \"assert\").equal(fs[gracefulQueue].length, 0)\n    })\n  }\n}\n\nif (!global[gracefulQueue]) {\n  publishQueue(global, fs[gracefulQueue]);\n}\n\nmodule.exports = patch(clone(fs))\nif (process.env.TEST_GRACEFUL_FS_GLOBAL_PATCH && !fs.__patched) {\n    module.exports = patch(fs)\n    fs.__patched = true;\n}\n\nfunction patch (fs) {\n  // Everything that references the open() function needs to be in here\n  polyfills(fs)\n  fs.gracefulify = patch\n\n  fs.createReadStream = createReadStream\n  fs.createWriteStream = createWriteStream\n  var fs$readFile = fs.readFile\n  fs.readFile = readFile\n  function readFile (path, options, cb) {\n    if (typeof options === 'function')\n      cb = options, options = null\n\n    return go$readFile(path, options, cb)\n\n    function go$readFile (path, options, cb) {\n      return fs$readFile(path, options, function (err) {\n        if (err && (err.code === 'EMFILE' || err.code === 'ENFILE'))\n          enqueue([go$readFile, [path, options, cb]])\n        else {\n          if (typeof cb === 'function')\n            cb.apply(this, arguments)\n          retry()\n        }\n      })\n    }\n  }\n\n  var fs$writeFile = fs.writeFile\n  fs.writeFile = writeFile\n  function writeFile (path, data, options, cb) {\n    if (typeof options === 'function')\n      cb = options, options = null\n\n    return go$writeFile(path, data, options, cb)\n\n    function go$writeFile (path, data, options, cb) {\n      return fs$writeFile(path, data, options, function (err) {\n        if (err && (err.code === 'EMFILE' || err.code === 'ENFILE'))\n          enqueue([go$writeFile, [path, data, options, cb]])\n        else {\n          if (typeof cb === 'function')\n            cb.apply(this, arguments)\n          retry()\n        }\n      })\n    }\n  }\n\n  var fs$appendFile = fs.appendFile\n  if (fs$appendFile)\n    fs.appendFile = appendFile\n  function appendFile (path, data, options, cb) {\n    if (typeof options === 'function')\n      cb = options, options = null\n\n    return go$appendFile(path, data, options, cb)\n\n    function go$appendFile (path, data, options, cb) {\n      return fs$appendFile(path, data, options, function (err) {\n        if (err && (err.code === 'EMFILE' || err.code === 'ENFILE'))\n          enqueue([go$appendFile, [path, data, options, cb]])\n        else {\n          if (typeof cb === 'function')\n            cb.apply(this, arguments)\n          retry()\n        }\n      })\n    }\n  }\n\n  var fs$copyFile = fs.copyFile\n  if (fs$copyFile)\n    fs.copyFile = copyFile\n  function copyFile (src, dest, flags, cb) {\n    if (typeof flags === 'function') {\n      cb = flags\n      flags = 0\n    }\n    return fs$copyFile(src, dest, flags, function (err) {\n      if (err && (err.code === 'EMFILE' || err.code === 'ENFILE'))\n        enqueue([fs$copyFile, [src, dest, flags, cb]])\n      else {\n        if (typeof cb === 'function')\n          cb.apply(this, arguments)\n        retry()\n      }\n    })\n  }\n\n  var fs$readdir = fs.readdir\n  fs.readdir = readdir\n  function readdir (path, options, cb) {\n    var args = [path]\n    if (typeof options !== 'function') {\n      args.push(options)\n    } else {\n      cb = options\n    }\n    args.push(go$readdir$cb)\n\n    return go$readdir(args)\n\n    function go$readdir$cb (err, files) {\n      if (files && files.sort)\n        files.sort()\n\n      if (err && (err.code === 'EMFILE' || err.code === 'ENFILE'))\n        enqueue([go$readdir, [args]])\n\n      else {\n        if (typeof cb === 'function')\n          cb.apply(this, arguments)\n        retry()\n      }\n    }\n  }\n\n  function go$readdir (args) {\n    return fs$readdir.apply(fs, args)\n  }\n\n  if (process.version.substr(0, 4) === 'v0.8') {\n    var legStreams = legacy(fs)\n    ReadStream = legStreams.ReadStream\n    WriteStream = legStreams.WriteStream\n  }\n\n  var fs$ReadStream = fs.ReadStream\n  if (fs$ReadStream) {\n    ReadStream.prototype = Object.create(fs$ReadStream.prototype)\n    ReadStream.prototype.open = ReadStream$open\n  }\n\n  var fs$WriteStream = fs.WriteStream\n  if (fs$WriteStream) {\n    WriteStream.prototype = Object.create(fs$WriteStream.prototype)\n    WriteStream.prototype.open = WriteStream$open\n  }\n\n  Object.defineProperty(fs, 'ReadStream', {\n    get: function () {\n      return ReadStream\n    },\n    set: function (val) {\n      ReadStream = val\n    },\n    enumerable: true,\n    configurable: true\n  })\n  Object.defineProperty(fs, 'WriteStream', {\n    get: function () {\n      return WriteStream\n    },\n    set: function (val) {\n      WriteStream = val\n    },\n    enumerable: true,\n    configurable: true\n  })\n\n  // legacy names\n  var FileReadStream = ReadStream\n  Object.defineProperty(fs, 'FileReadStream', {\n    get: function () {\n      return FileReadStream\n    },\n    set: function (val) {\n      FileReadStream = val\n    },\n    enumerable: true,\n    configurable: true\n  })\n  var FileWriteStream = WriteStream\n  Object.defineProperty(fs, 'FileWriteStream', {\n    get: function () {\n      return FileWriteStream\n    },\n    set: function (val) {\n      FileWriteStream = val\n    },\n    enumerable: true,\n    configurable: true\n  })\n\n  function ReadStream (path, options) {\n    if (this instanceof ReadStream)\n      return fs$ReadStream.apply(this, arguments), this\n    else\n      return ReadStream.apply(Object.create(ReadStream.prototype), arguments)\n  }\n\n  function ReadStream$open () {\n    var that = this\n    open(that.path, that.flags, that.mode, function (err, fd) {\n      if (err) {\n        if (that.autoClose)\n          that.destroy()\n\n        that.emit('error', err)\n      } else {\n        that.fd = fd\n        that.emit('open', fd)\n        that.read()\n      }\n    })\n  }\n\n  function WriteStream (path, options) {\n    if (this instanceof WriteStream)\n      return fs$WriteStream.apply(this, arguments), this\n    else\n      return WriteStream.apply(Object.create(WriteStream.prototype), arguments)\n  }\n\n  function WriteStream$open () {\n    var that = this\n    open(that.path, that.flags, that.mode, function (err, fd) {\n      if (err) {\n        that.destroy()\n        that.emit('error', err)\n      } else {\n        that.fd = fd\n        that.emit('open', fd)\n      }\n    })\n  }\n\n  function createReadStream (path, options) {\n    return new fs.ReadStream(path, options)\n  }\n\n  function createWriteStream (path, options) {\n    return new fs.WriteStream(path, options)\n  }\n\n  var fs$open = fs.open\n  fs.open = open\n  function open (path, flags, mode, cb) {\n    if (typeof mode === 'function')\n      cb = mode, mode = null\n\n    return go$open(path, flags, mode, cb)\n\n    function go$open (path, flags, mode, cb) {\n      return fs$open(path, flags, mode, function (err, fd) {\n        if (err && (err.code === 'EMFILE' || err.code === 'ENFILE'))\n          enqueue([go$open, [path, flags, mode, cb]])\n        else {\n          if (typeof cb === 'function')\n            cb.apply(this, arguments)\n          retry()\n        }\n      })\n    }\n  }\n\n  return fs\n}\n\nfunction enqueue (elem) {\n  debug('ENQUEUE', elem[0].name, elem[1])\n  fs[gracefulQueue].push(elem)\n}\n\nfunction retry () {\n  var elem = fs[gracefulQueue].shift()\n  if (elem) {\n    debug('RETRY', elem[0].name, elem[1])\n    elem[0].apply(null, elem[1])\n  }\n}\n\n\n//# sourceURL=webpack://stkeeper/./node_modules/graceful-fs/graceful-fs.js?");

/***/ }),

/***/ "./node_modules/graceful-fs/legacy-streams.js":
/*!****************************************************!*\
  !*** ./node_modules/graceful-fs/legacy-streams.js ***!
  \****************************************************/
/***/ ((module, __unused_webpack_exports, __webpack_require__) => {

eval("var Stream = __webpack_require__(/*! stream */ \"stream\").Stream\n\nmodule.exports = legacy\n\nfunction legacy (fs) {\n  return {\n    ReadStream: ReadStream,\n    WriteStream: WriteStream\n  }\n\n  function ReadStream (path, options) {\n    if (!(this instanceof ReadStream)) return new ReadStream(path, options);\n\n    Stream.call(this);\n\n    var self = this;\n\n    this.path = path;\n    this.fd = null;\n    this.readable = true;\n    this.paused = false;\n\n    this.flags = 'r';\n    this.mode = 438; /*=0666*/\n    this.bufferSize = 64 * 1024;\n\n    options = options || {};\n\n    // Mixin options into this\n    var keys = Object.keys(options);\n    for (var index = 0, length = keys.length; index < length; index++) {\n      var key = keys[index];\n      this[key] = options[key];\n    }\n\n    if (this.encoding) this.setEncoding(this.encoding);\n\n    if (this.start !== undefined) {\n      if ('number' !== typeof this.start) {\n        throw TypeError('start must be a Number');\n      }\n      if (this.end === undefined) {\n        this.end = Infinity;\n      } else if ('number' !== typeof this.end) {\n        throw TypeError('end must be a Number');\n      }\n\n      if (this.start > this.end) {\n        throw new Error('start must be <= end');\n      }\n\n      this.pos = this.start;\n    }\n\n    if (this.fd !== null) {\n      process.nextTick(function() {\n        self._read();\n      });\n      return;\n    }\n\n    fs.open(this.path, this.flags, this.mode, function (err, fd) {\n      if (err) {\n        self.emit('error', err);\n        self.readable = false;\n        return;\n      }\n\n      self.fd = fd;\n      self.emit('open', fd);\n      self._read();\n    })\n  }\n\n  function WriteStream (path, options) {\n    if (!(this instanceof WriteStream)) return new WriteStream(path, options);\n\n    Stream.call(this);\n\n    this.path = path;\n    this.fd = null;\n    this.writable = true;\n\n    this.flags = 'w';\n    this.encoding = 'binary';\n    this.mode = 438; /*=0666*/\n    this.bytesWritten = 0;\n\n    options = options || {};\n\n    // Mixin options into this\n    var keys = Object.keys(options);\n    for (var index = 0, length = keys.length; index < length; index++) {\n      var key = keys[index];\n      this[key] = options[key];\n    }\n\n    if (this.start !== undefined) {\n      if ('number' !== typeof this.start) {\n        throw TypeError('start must be a Number');\n      }\n      if (this.start < 0) {\n        throw new Error('start must be >= zero');\n      }\n\n      this.pos = this.start;\n    }\n\n    this.busy = false;\n    this._queue = [];\n\n    if (this.fd === null) {\n      this._open = fs.open;\n      this._queue.push([this._open, this.path, this.flags, this.mode, undefined]);\n      this.flush();\n    }\n  }\n}\n\n\n//# sourceURL=webpack://stkeeper/./node_modules/graceful-fs/legacy-streams.js?");

/***/ }),

/***/ "./node_modules/graceful-fs/polyfills.js":
/*!***********************************************!*\
  !*** ./node_modules/graceful-fs/polyfills.js ***!
  \***********************************************/
/***/ ((module, __unused_webpack_exports, __webpack_require__) => {

eval("var constants = __webpack_require__(/*! constants */ \"constants\")\n\nvar origCwd = process.cwd\nvar cwd = null\n\nvar platform = process.env.GRACEFUL_FS_PLATFORM || process.platform\n\nprocess.cwd = function() {\n  if (!cwd)\n    cwd = origCwd.call(process)\n  return cwd\n}\ntry {\n  process.cwd()\n} catch (er) {}\n\n// This check is needed until node.js 12 is required\nif (typeof process.chdir === 'function') {\n  var chdir = process.chdir\n  process.chdir = function (d) {\n    cwd = null\n    chdir.call(process, d)\n  }\n  if (Object.setPrototypeOf) Object.setPrototypeOf(process.chdir, chdir)\n}\n\nmodule.exports = patch\n\nfunction patch (fs) {\n  // (re-)implement some things that are known busted or missing.\n\n  // lchmod, broken prior to 0.6.2\n  // back-port the fix here.\n  if (constants.hasOwnProperty('O_SYMLINK') &&\n      process.version.match(/^v0\\.6\\.[0-2]|^v0\\.5\\./)) {\n    patchLchmod(fs)\n  }\n\n  // lutimes implementation, or no-op\n  if (!fs.lutimes) {\n    patchLutimes(fs)\n  }\n\n  // https://github.com/isaacs/node-graceful-fs/issues/4\n  // Chown should not fail on einval or eperm if non-root.\n  // It should not fail on enosys ever, as this just indicates\n  // that a fs doesn't support the intended operation.\n\n  fs.chown = chownFix(fs.chown)\n  fs.fchown = chownFix(fs.fchown)\n  fs.lchown = chownFix(fs.lchown)\n\n  fs.chmod = chmodFix(fs.chmod)\n  fs.fchmod = chmodFix(fs.fchmod)\n  fs.lchmod = chmodFix(fs.lchmod)\n\n  fs.chownSync = chownFixSync(fs.chownSync)\n  fs.fchownSync = chownFixSync(fs.fchownSync)\n  fs.lchownSync = chownFixSync(fs.lchownSync)\n\n  fs.chmodSync = chmodFixSync(fs.chmodSync)\n  fs.fchmodSync = chmodFixSync(fs.fchmodSync)\n  fs.lchmodSync = chmodFixSync(fs.lchmodSync)\n\n  fs.stat = statFix(fs.stat)\n  fs.fstat = statFix(fs.fstat)\n  fs.lstat = statFix(fs.lstat)\n\n  fs.statSync = statFixSync(fs.statSync)\n  fs.fstatSync = statFixSync(fs.fstatSync)\n  fs.lstatSync = statFixSync(fs.lstatSync)\n\n  // if lchmod/lchown do not exist, then make them no-ops\n  if (!fs.lchmod) {\n    fs.lchmod = function (path, mode, cb) {\n      if (cb) process.nextTick(cb)\n    }\n    fs.lchmodSync = function () {}\n  }\n  if (!fs.lchown) {\n    fs.lchown = function (path, uid, gid, cb) {\n      if (cb) process.nextTick(cb)\n    }\n    fs.lchownSync = function () {}\n  }\n\n  // on Windows, A/V software can lock the directory, causing this\n  // to fail with an EACCES or EPERM if the directory contains newly\n  // created files.  Try again on failure, for up to 60 seconds.\n\n  // Set the timeout this long because some Windows Anti-Virus, such as Parity\n  // bit9, may lock files for up to a minute, causing npm package install\n  // failures. Also, take care to yield the scheduler. Windows scheduling gives\n  // CPU to a busy looping process, which can cause the program causing the lock\n  // contention to be starved of CPU by node, so the contention doesn't resolve.\n  if (platform === \"win32\") {\n    fs.rename = (function (fs$rename) { return function (from, to, cb) {\n      var start = Date.now()\n      var backoff = 0;\n      fs$rename(from, to, function CB (er) {\n        if (er\n            && (er.code === \"EACCES\" || er.code === \"EPERM\")\n            && Date.now() - start < 60000) {\n          setTimeout(function() {\n            fs.stat(to, function (stater, st) {\n              if (stater && stater.code === \"ENOENT\")\n                fs$rename(from, to, CB);\n              else\n                cb(er)\n            })\n          }, backoff)\n          if (backoff < 100)\n            backoff += 10;\n          return;\n        }\n        if (cb) cb(er)\n      })\n    }})(fs.rename)\n  }\n\n  // if read() returns EAGAIN, then just try it again.\n  fs.read = (function (fs$read) {\n    function read (fd, buffer, offset, length, position, callback_) {\n      var callback\n      if (callback_ && typeof callback_ === 'function') {\n        var eagCounter = 0\n        callback = function (er, _, __) {\n          if (er && er.code === 'EAGAIN' && eagCounter < 10) {\n            eagCounter ++\n            return fs$read.call(fs, fd, buffer, offset, length, position, callback)\n          }\n          callback_.apply(this, arguments)\n        }\n      }\n      return fs$read.call(fs, fd, buffer, offset, length, position, callback)\n    }\n\n    // This ensures `util.promisify` works as it does for native `fs.read`.\n    if (Object.setPrototypeOf) Object.setPrototypeOf(read, fs$read)\n    return read\n  })(fs.read)\n\n  fs.readSync = (function (fs$readSync) { return function (fd, buffer, offset, length, position) {\n    var eagCounter = 0\n    while (true) {\n      try {\n        return fs$readSync.call(fs, fd, buffer, offset, length, position)\n      } catch (er) {\n        if (er.code === 'EAGAIN' && eagCounter < 10) {\n          eagCounter ++\n          continue\n        }\n        throw er\n      }\n    }\n  }})(fs.readSync)\n\n  function patchLchmod (fs) {\n    fs.lchmod = function (path, mode, callback) {\n      fs.open( path\n             , constants.O_WRONLY | constants.O_SYMLINK\n             , mode\n             , function (err, fd) {\n        if (err) {\n          if (callback) callback(err)\n          return\n        }\n        // prefer to return the chmod error, if one occurs,\n        // but still try to close, and report closing errors if they occur.\n        fs.fchmod(fd, mode, function (err) {\n          fs.close(fd, function(err2) {\n            if (callback) callback(err || err2)\n          })\n        })\n      })\n    }\n\n    fs.lchmodSync = function (path, mode) {\n      var fd = fs.openSync(path, constants.O_WRONLY | constants.O_SYMLINK, mode)\n\n      // prefer to return the chmod error, if one occurs,\n      // but still try to close, and report closing errors if they occur.\n      var threw = true\n      var ret\n      try {\n        ret = fs.fchmodSync(fd, mode)\n        threw = false\n      } finally {\n        if (threw) {\n          try {\n            fs.closeSync(fd)\n          } catch (er) {}\n        } else {\n          fs.closeSync(fd)\n        }\n      }\n      return ret\n    }\n  }\n\n  function patchLutimes (fs) {\n    if (constants.hasOwnProperty(\"O_SYMLINK\")) {\n      fs.lutimes = function (path, at, mt, cb) {\n        fs.open(path, constants.O_SYMLINK, function (er, fd) {\n          if (er) {\n            if (cb) cb(er)\n            return\n          }\n          fs.futimes(fd, at, mt, function (er) {\n            fs.close(fd, function (er2) {\n              if (cb) cb(er || er2)\n            })\n          })\n        })\n      }\n\n      fs.lutimesSync = function (path, at, mt) {\n        var fd = fs.openSync(path, constants.O_SYMLINK)\n        var ret\n        var threw = true\n        try {\n          ret = fs.futimesSync(fd, at, mt)\n          threw = false\n        } finally {\n          if (threw) {\n            try {\n              fs.closeSync(fd)\n            } catch (er) {}\n          } else {\n            fs.closeSync(fd)\n          }\n        }\n        return ret\n      }\n\n    } else {\n      fs.lutimes = function (_a, _b, _c, cb) { if (cb) process.nextTick(cb) }\n      fs.lutimesSync = function () {}\n    }\n  }\n\n  function chmodFix (orig) {\n    if (!orig) return orig\n    return function (target, mode, cb) {\n      return orig.call(fs, target, mode, function (er) {\n        if (chownErOk(er)) er = null\n        if (cb) cb.apply(this, arguments)\n      })\n    }\n  }\n\n  function chmodFixSync (orig) {\n    if (!orig) return orig\n    return function (target, mode) {\n      try {\n        return orig.call(fs, target, mode)\n      } catch (er) {\n        if (!chownErOk(er)) throw er\n      }\n    }\n  }\n\n\n  function chownFix (orig) {\n    if (!orig) return orig\n    return function (target, uid, gid, cb) {\n      return orig.call(fs, target, uid, gid, function (er) {\n        if (chownErOk(er)) er = null\n        if (cb) cb.apply(this, arguments)\n      })\n    }\n  }\n\n  function chownFixSync (orig) {\n    if (!orig) return orig\n    return function (target, uid, gid) {\n      try {\n        return orig.call(fs, target, uid, gid)\n      } catch (er) {\n        if (!chownErOk(er)) throw er\n      }\n    }\n  }\n\n  function statFix (orig) {\n    if (!orig) return orig\n    // Older versions of Node erroneously returned signed integers for\n    // uid + gid.\n    return function (target, options, cb) {\n      if (typeof options === 'function') {\n        cb = options\n        options = null\n      }\n      function callback (er, stats) {\n        if (stats) {\n          if (stats.uid < 0) stats.uid += 0x100000000\n          if (stats.gid < 0) stats.gid += 0x100000000\n        }\n        if (cb) cb.apply(this, arguments)\n      }\n      return options ? orig.call(fs, target, options, callback)\n        : orig.call(fs, target, callback)\n    }\n  }\n\n  function statFixSync (orig) {\n    if (!orig) return orig\n    // Older versions of Node erroneously returned signed integers for\n    // uid + gid.\n    return function (target, options) {\n      var stats = options ? orig.call(fs, target, options)\n        : orig.call(fs, target)\n      if (stats.uid < 0) stats.uid += 0x100000000\n      if (stats.gid < 0) stats.gid += 0x100000000\n      return stats;\n    }\n  }\n\n  // ENOSYS means that the fs doesn't support the op. Just ignore\n  // that, because it doesn't matter.\n  //\n  // if there's no getuid, or if getuid() is something other\n  // than 0, and the error is EINVAL or EPERM, then just ignore\n  // it.\n  //\n  // This specific case is a silent failure in cp, install, tar,\n  // and most other unix tools that manage permissions.\n  //\n  // When running as root, or if other types of errors are\n  // encountered, then it's strict.\n  function chownErOk (er) {\n    if (!er)\n      return true\n\n    if (er.code === \"ENOSYS\")\n      return true\n\n    var nonroot = !process.getuid || process.getuid() !== 0\n    if (nonroot) {\n      if (er.code === \"EINVAL\" || er.code === \"EPERM\")\n        return true\n    }\n\n    return false\n  }\n}\n\n\n//# sourceURL=webpack://stkeeper/./node_modules/graceful-fs/polyfills.js?");

/***/ }),

/***/ "./src/main.ts":
/*!*********************!*\
  !*** ./src/main.ts ***!
  \*********************/
/***/ (function(__unused_webpack_module, exports, __webpack_require__) {

"use strict";
eval("\r\nvar __importDefault = (this && this.__importDefault) || function (mod) {\r\n    return (mod && mod.__esModule) ? mod : { \"default\": mod };\r\n};\r\nObject.defineProperty(exports, \"__esModule\", ({ value: true }));\r\nvar electron_1 = __webpack_require__(/*! electron */ \"electron\");\r\nvar electron_is_dev_1 = __importDefault(__webpack_require__(/*! electron-is-dev */ \"./node_modules/electron-is-dev/index.js\"));\r\nvar graceful_fs_1 = __importDefault(__webpack_require__(/*! graceful-fs */ \"./node_modules/graceful-fs/graceful-fs.js\"));\r\nvar createWindow = function () {\r\n    var win = new electron_1.BrowserWindow({\r\n        width: 800,\r\n        height: 600,\r\n        webPreferences: {\r\n            nodeIntegration: true,\r\n            contextIsolation: false\r\n        }\r\n    });\r\n    console.log(electron_is_dev_1.default);\r\n    win.loadURL(electron_is_dev_1.default\r\n        ? 'http://localhost:3000'\r\n        : \"file://\" + electron_1.app.getAppPath() + \"/index.html\");\r\n};\r\nelectron_1.app.on('ready', function () {\r\n    createWindow();\r\n    electron_1.ipcMain.on('save', function (_event, arg) {\r\n        graceful_fs_1.default.writeFile('C:\\\\Users\\\\Dan\\\\Documents\\\\Home.txt', arg.home, function (error) { if (error)\r\n            console.log(error); });\r\n        graceful_fs_1.default.writeFile('C:\\\\Users\\\\Dan\\\\Documents\\\\HomeScore.txt', arg.homeScore.toString(), function (error) { if (error)\r\n            console.log(error); });\r\n        graceful_fs_1.default.writeFile('C:\\\\Users\\\\Dan\\\\Documents\\\\Away.txt', arg.away, function (error) { if (error)\r\n            console.log(error); });\r\n        graceful_fs_1.default.writeFile('C:\\\\Users\\\\Dan\\\\Documents\\\\AwayScore.txt', arg.awayScore.toString(), function (error) { if (error)\r\n            console.log(error); });\r\n    });\r\n});\r\n\n\n//# sourceURL=webpack://stkeeper/./src/main.ts?");

/***/ }),

/***/ "assert":
/*!*************************!*\
  !*** external "assert" ***!
  \*************************/
/***/ ((module) => {

"use strict";
module.exports = require("assert");

/***/ }),

/***/ "constants":
/*!****************************!*\
  !*** external "constants" ***!
  \****************************/
/***/ ((module) => {

"use strict";
module.exports = require("constants");

/***/ }),

/***/ "electron":
/*!***************************!*\
  !*** external "electron" ***!
  \***************************/
/***/ ((module) => {

"use strict";
module.exports = require("electron");

/***/ }),

/***/ "fs":
/*!*********************!*\
  !*** external "fs" ***!
  \*********************/
/***/ ((module) => {

"use strict";
module.exports = require("fs");

/***/ }),

/***/ "stream":
/*!*************************!*\
  !*** external "stream" ***!
  \*************************/
/***/ ((module) => {

"use strict";
module.exports = require("stream");

/***/ }),

/***/ "util":
/*!***********************!*\
  !*** external "util" ***!
  \***********************/
/***/ ((module) => {

"use strict";
module.exports = require("util");

/***/ })

/******/ 	});
/************************************************************************/
/******/ 	// The module cache
/******/ 	var __webpack_module_cache__ = {};
/******/ 	
/******/ 	// The require function
/******/ 	function __webpack_require__(moduleId) {
/******/ 		// Check if module is in cache
/******/ 		var cachedModule = __webpack_module_cache__[moduleId];
/******/ 		if (cachedModule !== undefined) {
/******/ 			return cachedModule.exports;
/******/ 		}
/******/ 		// Create a new module (and put it into the cache)
/******/ 		var module = __webpack_module_cache__[moduleId] = {
/******/ 			// no module.id needed
/******/ 			// no module.loaded needed
/******/ 			exports: {}
/******/ 		};
/******/ 	
/******/ 		// Execute the module function
/******/ 		__webpack_modules__[moduleId].call(module.exports, module, module.exports, __webpack_require__);
/******/ 	
/******/ 		// Return the exports of the module
/******/ 		return module.exports;
/******/ 	}
/******/ 	
/************************************************************************/
/******/ 	
/******/ 	// startup
/******/ 	// Load entry module and return exports
/******/ 	// This entry module is referenced by other modules so it can't be inlined
/******/ 	var __webpack_exports__ = __webpack_require__("./src/main.ts");
/******/ 	
/******/ })()
;