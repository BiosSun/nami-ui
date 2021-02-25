/*! For license information please see 21.d5ecf00b.js.LICENSE.txt */
  export default function _typeof(obj) {
    "@babel/helpers - typeof";

    if (typeof Symbol === "function" && typeof Symbol.iterator === "symbol") {
      _typeof = function (obj) { return typeof obj; };
    } else {
      _typeof = function (obj) {
        return obj && typeof Symbol === "function" && obj.constructor === Symbol && obj !== Symbol.prototype
          ? "symbol"
          : typeof obj;
      };
    }

    return _typeof(obj);
  }
`,s.jsx=a("7.0.0-beta.0")`
  var REACT_ELEMENT_TYPE;

  export default function _createRawReactElement(type, props, key, children) {
    if (!REACT_ELEMENT_TYPE) {
      REACT_ELEMENT_TYPE = (
        typeof Symbol === "function" && Symbol["for"] && Symbol["for"]("react.element")
      ) || 0xeac7;
    }

    var defaultProps = type && type.defaultProps;
    var childrenLength = arguments.length - 3;

    if (!props && childrenLength !== 0) {
      // If we're going to assign props.children, we create a new object now
      // to avoid mutating defaultProps.
      props = {
        children: void 0,
      };
    }

    if (childrenLength === 1) {
      props.children = children;
    } else if (childrenLength > 1) {
      var childArray = new Array(childrenLength);
      for (var i = 0; i < childrenLength; i++) {
        childArray[i] = arguments[i + 3];
      }
      props.children = childArray;
    }

    if (props && defaultProps) {
      for (var propName in defaultProps) {
        if (props[propName] === void 0) {
          props[propName] = defaultProps[propName];
        }
      }
    } else if (!props) {
      props = defaultProps || {};
    }

    return {
      $$typeof: REACT_ELEMENT_TYPE,
      type: type,
      key: key === undefined ? null : '' + key,
      ref: null,
      props: props,
      _owner: null,
    };
  }
`,s.asyncIterator=a("7.0.0-beta.0")`
  export default function _asyncIterator(iterable) {
    var method
    if (typeof Symbol !== "undefined") {
      if (Symbol.asyncIterator) {
        method = iterable[Symbol.asyncIterator]
        if (method != null) return method.call(iterable);
      }
      if (Symbol.iterator) {
        method = iterable[Symbol.iterator]
        if (method != null) return method.call(iterable);
      }
    }
    throw new TypeError("Object is not async iterable");
  }
`,s.AwaitValue=a("7.0.0-beta.0")`
  export default function _AwaitValue(value) {
    this.wrapped = value;
  }
`,s.AsyncGenerator=a("7.0.0-beta.0")`
  import AwaitValue from "AwaitValue";

  export default function AsyncGenerator(gen) {
    var front, back;

    function send(key, arg) {
      return new Promise(function (resolve, reject) {
        var request = {
          key: key,
          arg: arg,
          resolve: resolve,
          reject: reject,
          next: null,
        };

        if (back) {
          back = back.next = request;
        } else {
          front = back = request;
          resume(key, arg);
        }
      });
    }

    function resume(key, arg) {
      try {
        var result = gen[key](arg)
        var value = result.value;
        var wrappedAwait = value instanceof AwaitValue;

        Promise.resolve(wrappedAwait ? value.wrapped : value).then(
          function (arg) {
            if (wrappedAwait) {
              resume(key === "return" ? "return" : "next", arg);
              return
            }

            settle(result.done ? "return" : "normal", arg);
          },
          function (err) { resume("throw", err); });
      } catch (err) {
        settle("throw", err);
      }
    }

    function settle(type, value) {
      switch (type) {
        case "return":
          front.resolve({ value: value, done: true });
          break;
        case "throw":
          front.reject(value);
          break;
        default:
          front.resolve({ value: value, done: false });
          break;
      }

      front = front.next;
      if (front) {
        resume(front.key, front.arg);
      } else {
        back = null;
      }
    }

    this._invoke = send;

    // Hide "return" method if generator return is not supported
    if (typeof gen.return !== "function") {
      this.return = undefined;
    }
  }

  if (typeof Symbol === "function" && Symbol.asyncIterator) {
    AsyncGenerator.prototype[Symbol.asyncIterator] = function () { return this; };
  }

  AsyncGenerator.prototype.next = function (arg) { return this._invoke("next", arg); };
  AsyncGenerator.prototype.throw = function (arg) { return this._invoke("throw", arg); };
  AsyncGenerator.prototype.return = function (arg) { return this._invoke("return", arg); };
`,s.wrapAsyncGenerator=a("7.0.0-beta.0")`
  import AsyncGenerator from "AsyncGenerator";

  export default function _wrapAsyncGenerator(fn) {
    return function () {
      return new AsyncGenerator(fn.apply(this, arguments));
    };
  }
`,s.awaitAsyncGenerator=a("7.0.0-beta.0")`
  import AwaitValue from "AwaitValue";

  export default function _awaitAsyncGenerator(value) {
    return new AwaitValue(value);
  }
`,s.asyncGeneratorDelegate=a("7.0.0-beta.0")`
  export default function _asyncGeneratorDelegate(inner, awaitWrap) {
    var iter = {}, waiting = false;

    function pump(key, value) {
      waiting = true;
      value = new Promise(function (resolve) { resolve(inner[key](value)); });
      return { done: false, value: awaitWrap(value) };
    };

    if (typeof Symbol === "function" && Symbol.iterator) {
      iter[Symbol.iterator] = function () { return this; };
    }

    iter.next = function (value) {
      if (waiting) {
        waiting = false;
        return value;
      }
      return pump("next", value);
    };

    if (typeof inner.throw === "function") {
      iter.throw = function (value) {
        if (waiting) {
          waiting = false;
          throw value;
        }
        return pump("throw", value);
      };
    }

    if (typeof inner.return === "function") {
      iter.return = function (value) {
        if (waiting) {
          waiting = false;
          return value;
        }
        return pump("return", value);
      };
    }

    return iter;
  }
`,s.asyncToGenerator=a("7.0.0-beta.0")`
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

  export default function _asyncToGenerator(fn) {
    return function () {
      var self = this, args = arguments;
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
`,s.classCallCheck=a("7.0.0-beta.0")`
  export default function _classCallCheck(instance, Constructor) {
    if (!(instance instanceof Constructor)) {
      throw new TypeError("Cannot call a class as a function");
    }
  }
`,s.createClass=a("7.0.0-beta.0")`
  function _defineProperties(target, props) {
    for (var i = 0; i < props.length; i ++) {
      var descriptor = props[i];
      descriptor.enumerable = descriptor.enumerable || false;
      descriptor.configurable = true;
      if ("value" in descriptor) descriptor.writable = true;
      Object.defineProperty(target, descriptor.key, descriptor);
    }
  }

  export default function _createClass(Constructor, protoProps, staticProps) {
    if (protoProps) _defineProperties(Constructor.prototype, protoProps);
    if (staticProps) _defineProperties(Constructor, staticProps);
    return Constructor;
  }
`,s.defineEnumerableProperties=a("7.0.0-beta.0")`
  export default function _defineEnumerableProperties(obj, descs) {
    for (var key in descs) {
      var desc = descs[key];
      desc.configurable = desc.enumerable = true;
      if ("value" in desc) desc.writable = true;
      Object.defineProperty(obj, key, desc);
    }

    // Symbols are not enumerated over by for-in loops. If native
    // Symbols are available, fetch all of the descs object's own
    // symbol properties and define them on our target object too.
    if (Object.getOwnPropertySymbols) {
      var objectSymbols = Object.getOwnPropertySymbols(descs);
      for (var i = 0; i < objectSymbols.length; i++) {
        var sym = objectSymbols[i];
        var desc = descs[sym];
        desc.configurable = desc.enumerable = true;
        if ("value" in desc) desc.writable = true;
        Object.defineProperty(obj, sym, desc);
      }
    }
    return obj;
  }
`,s.defaults=a("7.0.0-beta.0")`
  export default function _defaults(obj, defaults) {
    var keys = Object.getOwnPropertyNames(defaults);
    for (var i = 0; i < keys.length; i++) {
      var key = keys[i];
      var value = Object.getOwnPropertyDescriptor(defaults, key);
      if (value && value.configurable && obj[key] === undefined) {
        Object.defineProperty(obj, key, value);
      }
    }
    return obj;
  }
`,s.defineProperty=a("7.0.0-beta.0")`
  export default function _defineProperty(obj, key, value) {
    // Shortcircuit the slow defineProperty path when possible.
    // We are trying to avoid issues where setters defined on the
    // prototype cause side effects under the fast path of simple
    // assignment. By checking for existence of the property with
    // the in operator, we can optimize most of this overhead away.
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
`,s.extends=a("7.0.0-beta.0")`
  export default function _extends() {
    _extends = Object.assign || function (target) {
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

    return _extends.apply(this, arguments);
  }
`,s.objectSpread=a("7.0.0-beta.0")`
  import defineProperty from "defineProperty";

  export default function _objectSpread(target) {
    for (var i = 1; i < arguments.length; i++) {
      var source = (arguments[i] != null) ? Object(arguments[i]) : {};
      var ownKeys = Object.keys(source);
      if (typeof Object.getOwnPropertySymbols === 'function') {
        ownKeys = ownKeys.concat(Object.getOwnPropertySymbols(source).filter(function(sym) {
          return Object.getOwnPropertyDescriptor(source, sym).enumerable;
        }));
      }
      ownKeys.forEach(function(key) {
        defineProperty(target, key, source[key]);
      });
    }
    return target;
  }
`,s.objectSpread2=a("7.5.0")`
  import defineProperty from "defineProperty";

  // This function is different to "Reflect.ownKeys". The enumerableOnly
  // filters on symbol properties only. Returned string properties are always
  // enumerable. It is good to use in objectSpread.

  function ownKeys(object, enumerableOnly) {
    var keys = Object.keys(object);
    if (Object.getOwnPropertySymbols) {
      var symbols = Object.getOwnPropertySymbols(object);
      if (enumerableOnly) symbols = symbols.filter(function (sym) {
        return Object.getOwnPropertyDescriptor(object, sym).enumerable;
      });
      keys.push.apply(keys, symbols);
    }
    return keys;
  }

  export default function _objectSpread2(target) {
    for (var i = 1; i < arguments.length; i++) {
      var source = (arguments[i] != null) ? arguments[i] : {};
      if (i % 2) {
        ownKeys(Object(source), true).forEach(function (key) {
          defineProperty(target, key, source[key]);
        });
      } else if (Object.getOwnPropertyDescriptors) {
        Object.defineProperties(target, Object.getOwnPropertyDescriptors(source));
      } else {
        ownKeys(Object(source)).forEach(function (key) {
          Object.defineProperty(
            target,
            key,
            Object.getOwnPropertyDescriptor(source, key)
          );
        });
      }
    }
    return target;
  }
`,s.inherits=a("7.0.0-beta.0")`
  import setPrototypeOf from "setPrototypeOf";

  export default function _inherits(subClass, superClass) {
    if (typeof superClass !== "function" && superClass !== null) {
      throw new TypeError("Super expression must either be null or a function");
    }
    subClass.prototype = Object.create(superClass && superClass.prototype, {
      constructor: {
        value: subClass,
        writable: true,
        configurable: true
      }
    });
    if (superClass) setPrototypeOf(subClass, superClass);
  }
`,s.inheritsLoose=a("7.0.0-beta.0")`
  import setPrototypeOf from "setPrototypeOf";

  export default function _inheritsLoose(subClass, superClass) {
    subClass.prototype = Object.create(superClass.prototype);
    subClass.prototype.constructor = subClass;
    setPrototypeOf(subClass, superClass);
  }
`,s.getPrototypeOf=a("7.0.0-beta.0")`
  export default function _getPrototypeOf(o) {
    _getPrototypeOf = Object.setPrototypeOf
      ? Object.getPrototypeOf
      : function _getPrototypeOf(o) {
          return o.__proto__ || Object.getPrototypeOf(o);
        };
    return _getPrototypeOf(o);
  }
`,s.setPrototypeOf=a("7.0.0-beta.0")`
  export default function _setPrototypeOf(o, p) {
    _setPrototypeOf = Object.setPrototypeOf || function _setPrototypeOf(o, p) {
      o.__proto__ = p;
      return o;
    };
    return _setPrototypeOf(o, p);
  }
`,s.isNativeReflectConstruct=a("7.9.0")`
  export default function _isNativeReflectConstruct() {
    if (typeof Reflect === "undefined" || !Reflect.construct) return false;

    // core-js@3
    if (Reflect.construct.sham) return false;

    // Proxy can't be polyfilled. Every browser implemented
    // proxies before or at the same time as Reflect.construct,
    // so if they support Proxy they also support Reflect.construct.
    if (typeof Proxy === "function") return true;

    // Since Reflect.construct can't be properly polyfilled, some
    // implementations (e.g. core-js@2) don't set the correct internal slots.
    // Those polyfills don't allow us to subclass built-ins, so we need to
    // use our fallback implementation.
    try {
      // If the internal slots aren't set, this throws an error similar to
      //   TypeError: this is not a Date object.
      Date.prototype.toString.call(Reflect.construct(Date, [], function() {}));
      return true;
    } catch (e) {
      return false;
    }
  }
`,s.construct=a("7.0.0-beta.0")`
  import setPrototypeOf from "setPrototypeOf";
  import isNativeReflectConstruct from "isNativeReflectConstruct";

  export default function _construct(Parent, args, Class) {
    if (isNativeReflectConstruct()) {
      _construct = Reflect.construct;
    } else {
      // NOTE: If Parent !== Class, the correct __proto__ is set *after*
      //       calling the constructor.
      _construct = function _construct(Parent, args, Class) {
        var a = [null];
        a.push.apply(a, args);
        var Constructor = Function.bind.apply(Parent, a);
        var instance = new Constructor();
        if (Class) setPrototypeOf(instance, Class.prototype);
        return instance;
      };
    }
    // Avoid issues with Class being present but undefined when it wasn't
    // present in the original call.
    return _construct.apply(null, arguments);
  }
`,s.isNativeFunction=a("7.0.0-beta.0")`
  export default function _isNativeFunction(fn) {
    // Note: This function returns "true" for core-js functions.
    return Function.toString.call(fn).indexOf("[native code]") !== -1;
  }
`,s.wrapNativeSuper=a("7.0.0-beta.0")`
  import getPrototypeOf from "getPrototypeOf";
  import setPrototypeOf from "setPrototypeOf";
  import isNativeFunction from "isNativeFunction";
  import construct from "construct";

  export default function _wrapNativeSuper(Class) {
    var _cache = typeof Map === "function" ? new Map() : undefined;

    _wrapNativeSuper = function _wrapNativeSuper(Class) {
      if (Class === null || !isNativeFunction(Class)) return Class;
      if (typeof Class !== "function") {
        throw new TypeError("Super expression must either be null or a function");
      }
      if (typeof _cache !== "undefined") {
        if (_cache.has(Class)) return _cache.get(Class);
        _cache.set(Class, Wrapper);
      }
      function Wrapper() {
        return construct(Class, arguments, getPrototypeOf(this).constructor)
      }
      Wrapper.prototype = Object.create(Class.prototype, {
        constructor: {
          value: Wrapper,
          enumerable: false,
          writable: true,
          configurable: true,
        }
      });

      return setPrototypeOf(Wrapper, Class);
    }

    return _wrapNativeSuper(Class)
  }
`,s.instanceof=a("7.0.0-beta.0")`
  export default function _instanceof(left, right) {
    if (right != null && typeof Symbol !== "undefined" && right[Symbol.hasInstance]) {
      return !!right[Symbol.hasInstance](left);
    } else {
      return left instanceof right;
    }
  }
`,s.interopRequireDefault=a("7.0.0-beta.0")`
  export default function _interopRequireDefault(obj) {
    return obj && obj.__esModule ? obj : { default: obj };
  }
`,s.interopRequireWildcard=a("7.0.0-beta.0")`
  function _getRequireWildcardCache() {
    if (typeof WeakMap !== "function") return null;

    var cache = new WeakMap();
    _getRequireWildcardCache = function () { return cache; };
    return cache;
  }

  export default function _interopRequireWildcard(obj) {
    if (obj && obj.__esModule) {
      return obj;
    }

    if (obj === null || (typeof obj !== "object" && typeof obj !== "function")) {
      return { default: obj }
    }

    var cache = _getRequireWildcardCache();
    if (cache && cache.has(obj)) {
      return cache.get(obj);
    }

    var newObj = {};
    var hasPropertyDescriptor = Object.defineProperty && Object.getOwnPropertyDescriptor;
    for (var key in obj) {
      if (Object.prototype.hasOwnProperty.call(obj, key)) {
        var desc = hasPropertyDescriptor
          ? Object.getOwnPropertyDescriptor(obj, key)
          : null;
        if (desc && (desc.get || desc.set)) {
          Object.defineProperty(newObj, key, desc);
        } else {
          newObj[key] = obj[key];
        }
      }
    }
    newObj.default = obj;
    if (cache) {
      cache.set(obj, newObj);
    }
    return newObj;
  }
`,s.newArrowCheck=a("7.0.0-beta.0")`
  export default function _newArrowCheck(innerThis, boundThis) {
    if (innerThis !== boundThis) {
      throw new TypeError("Cannot instantiate an arrow function");
    }
  }
`,s.objectDestructuringEmpty=a("7.0.0-beta.0")`
  export default function _objectDestructuringEmpty(obj) {
    if (obj == null) throw new TypeError("Cannot destructure undefined");
  }
`,s.objectWithoutPropertiesLoose=a("7.0.0-beta.0")`
  export default function _objectWithoutPropertiesLoose(source, excluded) {
    if (source == null) return {};

    var target = {};
    var sourceKeys = Object.keys(source);
    var key, i;

    for (i = 0; i < sourceKeys.length; i++) {
      key = sourceKeys[i];
      if (excluded.indexOf(key) >= 0) continue;
      target[key] = source[key];
    }

    return target;
  }
`,s.objectWithoutProperties=a("7.0.0-beta.0")`
  import objectWithoutPropertiesLoose from "objectWithoutPropertiesLoose";

  export default function _objectWithoutProperties(source, excluded) {
    if (source == null) return {};

    var target = objectWithoutPropertiesLoose(source, excluded);
    var key, i;

    if (Object.getOwnPropertySymbols) {
      var sourceSymbolKeys = Object.getOwnPropertySymbols(source);
      for (i = 0; i < sourceSymbolKeys.length; i++) {
        key = sourceSymbolKeys[i];
        if (excluded.indexOf(key) >= 0) continue;
        if (!Object.prototype.propertyIsEnumerable.call(source, key)) continue;
        target[key] = source[key];
      }
    }

    return target;
  }
`,s.assertThisInitialized=a("7.0.0-beta.0")`
  export default function _assertThisInitialized(self) {
    if (self === void 0) {
      throw new ReferenceError("this hasn't been initialised - super() hasn't been called");
    }
    return self;
  }
`,s.possibleConstructorReturn=a("7.0.0-beta.0")`
  import assertThisInitialized from "assertThisInitialized";

  export default function _possibleConstructorReturn(self, call) {
    if (call && (typeof call === "object" || typeof call === "function")) {
      return call;
    }
    return assertThisInitialized(self);
  }
`,s.createSuper=a("7.9.0")`
  import getPrototypeOf from "getPrototypeOf";
  import isNativeReflectConstruct from "isNativeReflectConstruct";
  import possibleConstructorReturn from "possibleConstructorReturn";

  export default function _createSuper(Derived) {
    var hasNativeReflectConstruct = isNativeReflectConstruct();

    return function _createSuperInternal() {
      var Super = getPrototypeOf(Derived), result;
      if (hasNativeReflectConstruct) {
        // NOTE: This doesn't work if this.__proto__.constructor has been modified.
        var NewTarget = getPrototypeOf(this).constructor;
        result = Reflect.construct(Super, arguments, NewTarget);
      } else {
        result = Super.apply(this, arguments);
      }
      return possibleConstructorReturn(this, result);
    }
  }
 `,s.superPropBase=a("7.0.0-beta.0")`
  import getPrototypeOf from "getPrototypeOf";

  export default function _superPropBase(object, property) {
    // Yes, this throws if object is null to being with, that's on purpose.
    while (!Object.prototype.hasOwnProperty.call(object, property)) {
      object = getPrototypeOf(object);
      if (object === null) break;
    }
    return object;
  }
`,s.get=a("7.0.0-beta.0")`
  import superPropBase from "superPropBase";

  export default function _get(target, property, receiver) {
    if (typeof Reflect !== "undefined" && Reflect.get) {
      _get = Reflect.get;
    } else {
      _get = function _get(target, property, receiver) {
        var base = superPropBase(target, property);

        if (!base) return;

        var desc = Object.getOwnPropertyDescriptor(base, property);
        if (desc.get) {
          return desc.get.call(receiver);
        }

        return desc.value;
      };
    }
    return _get(target, property, receiver || target);
  }
`,s.set=a("7.0.0-beta.0")`
  import superPropBase from "superPropBase";
  import defineProperty from "defineProperty";

  function set(target, property, value, receiver) {
    if (typeof Reflect !== "undefined" && Reflect.set) {
      set = Reflect.set;
    } else {
      set = function set(target, property, value, receiver) {
        var base = superPropBase(target, property);
        var desc;

        if (base) {
          desc = Object.getOwnPropertyDescriptor(base, property);
          if (desc.set) {
            desc.set.call(receiver, value);
            return true;
          } else if (!desc.writable) {
            // Both getter and non-writable fall into this.
            return false;
          }
        }

        // Without a super that defines the property, spec boils down to
        // "define on receiver" for some reason.
        desc = Object.getOwnPropertyDescriptor(receiver, property);
        if (desc) {
          if (!desc.writable) {
            // Setter, getter, and non-writable fall into this.
            return false;
          }

          desc.value = value;
          Object.defineProperty(receiver, property, desc);
        } else {
          // Avoid setters that may be defined on Sub's prototype, but not on
          // the instance.
          defineProperty(receiver, property, value);
        }

        return true;
      };
    }

    return set(target, property, value, receiver);
  }

  export default function _set(target, property, value, receiver, isStrict) {
    var s = set(target, property, value, receiver || target);
    if (!s && isStrict) {
      throw new Error('failed to set property');
    }

    return value;
  }
`,s.taggedTemplateLiteral=a("7.0.0-beta.0")`
  export default function _taggedTemplateLiteral(strings, raw) {
    if (!raw) { raw = strings.slice(0); }
    return Object.freeze(Object.defineProperties(strings, {
        raw: { value: Object.freeze(raw) }
    }));
  }
`,s.taggedTemplateLiteralLoose=a("7.0.0-beta.0")`
  export default function _taggedTemplateLiteralLoose(strings, raw) {
    if (!raw) { raw = strings.slice(0); }
    strings.raw = raw;
    return strings;
  }
`,s.readOnlyError=a("7.0.0-beta.0")`
  export default function _readOnlyError(name) {
    throw new TypeError("\\"" + name + "\\" is read-only");
  }
`,s.writeOnlyError=a("7.12.13")`
  export default function _writeOnlyError(name) {
    throw new TypeError("\\"" + name + "\\" is write-only");
  }
`,s.classNameTDZError=a("7.0.0-beta.0")`
  export default function _classNameTDZError(name) {
    throw new Error("Class \\"" + name + "\\" cannot be referenced in computed property keys.");
  }
`,s.temporalUndefined=a("7.0.0-beta.0")`
  // This function isn't mean to be called, but to be used as a reference.
  // We can't use a normal object because it isn't hoisted.
  export default function _temporalUndefined() {}
`,s.tdz=a("7.5.5")`
  export default function _tdzError(name) {
    throw new ReferenceError(name + " is not defined - temporal dead zone");
  }
`,s.temporalRef=a("7.0.0-beta.0")`
  import undef from "temporalUndefined";
  import err from "tdz";

  export default function _temporalRef(val, name) {
    return val === undef ? err(name) : val;
  }
`,s.slicedToArray=a("7.0.0-beta.0")`
  import arrayWithHoles from "arrayWithHoles";
  import iterableToArrayLimit from "iterableToArrayLimit";
  import unsupportedIterableToArray from "unsupportedIterableToArray";
  import nonIterableRest from "nonIterableRest";

  export default function _slicedToArray(arr, i) {
    return (
      arrayWithHoles(arr) ||
      iterableToArrayLimit(arr, i) ||
      unsupportedIterableToArray(arr, i) ||
      nonIterableRest()
    );
  }
`,s.slicedToArrayLoose=a("7.0.0-beta.0")`
  import arrayWithHoles from "arrayWithHoles";
  import iterableToArrayLimitLoose from "iterableToArrayLimitLoose";
  import unsupportedIterableToArray from "unsupportedIterableToArray";
  import nonIterableRest from "nonIterableRest";

  export default function _slicedToArrayLoose(arr, i) {
    return (
      arrayWithHoles(arr) ||
      iterableToArrayLimitLoose(arr, i) ||
      unsupportedIterableToArray(arr, i) ||
      nonIterableRest()
    );
  }
`,s.toArray=a("7.0.0-beta.0")`
  import arrayWithHoles from "arrayWithHoles";
  import iterableToArray from "iterableToArray";
  import unsupportedIterableToArray from "unsupportedIterableToArray";
  import nonIterableRest from "nonIterableRest";

  export default function _toArray(arr) {
    return (
      arrayWithHoles(arr) ||
      iterableToArray(arr) ||
      unsupportedIterableToArray(arr) ||
      nonIterableRest()
    );
  }
`,s.toConsumableArray=a("7.0.0-beta.0")`
  import arrayWithoutHoles from "arrayWithoutHoles";
  import iterableToArray from "iterableToArray";
  import unsupportedIterableToArray from "unsupportedIterableToArray";
  import nonIterableSpread from "nonIterableSpread";

  export default function _toConsumableArray(arr) {
    return (
      arrayWithoutHoles(arr) ||
      iterableToArray(arr) ||
      unsupportedIterableToArray(arr) ||
      nonIterableSpread()
    );
  }
`,s.arrayWithoutHoles=a("7.0.0-beta.0")`
  import arrayLikeToArray from "arrayLikeToArray";

  export default function _arrayWithoutHoles(arr) {
    if (Array.isArray(arr)) return arrayLikeToArray(arr);
  }
`,s.arrayWithHoles=a("7.0.0-beta.0")`
  export default function _arrayWithHoles(arr) {
    if (Array.isArray(arr)) return arr;
  }
`,s.maybeArrayLike=a("7.9.0")`
  import arrayLikeToArray from "arrayLikeToArray";

  export default function _maybeArrayLike(next, arr, i) {
    if (arr && !Array.isArray(arr) && typeof arr.length === "number") {
      var len = arr.length;
      return arrayLikeToArray(arr, i !== void 0 && i < len ? i : len);
    }
    return next(arr, i);
  }
`,s.iterableToArray=a("7.0.0-beta.0")`
  export default function _iterableToArray(iter) {
    if (typeof Symbol !== "undefined" && Symbol.iterator in Object(iter)) return Array.from(iter);
  }
`,s.iterableToArrayLimit=a("7.0.0-beta.0")`
  export default function _iterableToArrayLimit(arr, i) {
    // this is an expanded form of \`for...of\` that properly supports abrupt completions of
    // iterators etc. variable names have been minimised to reduce the size of this massive
    // helper. sometimes spec compliance is annoying :(
    //
    // _n = _iteratorNormalCompletion
    // _d = _didIteratorError
    // _e = _iteratorError
    // _i = _iterator
    // _s = _step

    if (typeof Symbol === "undefined" || !(Symbol.iterator in Object(arr))) return;

    var _arr = [];
    var _n = true;
    var _d = false;
    var _e = undefined;
    try {
      for (var _i = arr[Symbol.iterator](), _s; !(_n = (_s = _i.next()).done); _n = true) {
        _arr.push(_s.value);
        if (i && _arr.length === i) break;
      }
    } catch (err) {
      _d = true;
      _e = err;
    } finally {
      try {
        if (!_n && _i["return"] != null) _i["return"]();
      } finally {
        if (_d) throw _e;
      }
    }
    return _arr;
  }
`,s.iterableToArrayLimitLoose=a("7.0.0-beta.0")`
  export default function _iterableToArrayLimitLoose(arr, i) {
    if (typeof Symbol === "undefined" || !(Symbol.iterator in Object(arr))) return;

    var _arr = [];
    for (var _iterator = arr[Symbol.iterator](), _step; !(_step = _iterator.next()).done;) {
      _arr.push(_step.value);
      if (i && _arr.length === i) break;
    }
    return _arr;
  }
`,s.unsupportedIterableToArray=a("7.9.0")`
  import arrayLikeToArray from "arrayLikeToArray";

  export default function _unsupportedIterableToArray(o, minLen) {
    if (!o) return;
    if (typeof o === "string") return arrayLikeToArray(o, minLen);
    var n = Object.prototype.toString.call(o).slice(8, -1);
    if (n === "Object" && o.constructor) n = o.constructor.name;
    if (n === "Map" || n === "Set") return Array.from(o);
    if (n === "Arguments" || /^(?:Ui|I)nt(?:8|16|32)(?:Clamped)?Array$/.test(n))
      return arrayLikeToArray(o, minLen);
  }
`,s.arrayLikeToArray=a("7.9.0")`
  export default function _arrayLikeToArray(arr, len) {
    if (len == null || len > arr.length) len = arr.length;
    for (var i = 0, arr2 = new Array(len); i < len; i++) arr2[i] = arr[i];
    return arr2;
  }
`,s.nonIterableSpread=a("7.0.0-beta.0")`
  export default function _nonIterableSpread() {
    throw new TypeError(
      "Invalid attempt to spread non-iterable instance.\\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method."
    );
  }
`,s.nonIterableRest=a("7.0.0-beta.0")`
  export default function _nonIterableRest() {
    throw new TypeError(
      "Invalid attempt to destructure non-iterable instance.\\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method."
    );
  }
`,s.createForOfIteratorHelper=a("7.9.0")`
  import unsupportedIterableToArray from "unsupportedIterableToArray";

  // s: start (create the iterator)
  // n: next
  // e: error (called whenever something throws)
  // f: finish (always called at the end)

  export default function _createForOfIteratorHelper(o, allowArrayLike) {
    var it;
    if (typeof Symbol === "undefined" || o[Symbol.iterator] == null) {
      // Fallback for engines without symbol support
      if (
        Array.isArray(o) ||
        (it = unsupportedIterableToArray(o)) ||
        (allowArrayLike && o && typeof o.length === "number")
      ) {
        if (it) o = it;
        var i = 0;
        var F = function(){};
        return {
          s: F,
          n: function() {
            if (i >= o.length) return { done: true };
            return { done: false, value: o[i++] };
          },
          e: function(e) { throw e; },
          f: F,
        };
      }

      throw new TypeError("Invalid attempt to iterate non-iterable instance.\\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method.");
    }

    var normalCompletion = true, didErr = false, err;

    return {
      s: function() {
        it = o[Symbol.iterator]();
      },
      n: function() {
        var step = it.next();
        normalCompletion = step.done;
        return step;
      },
      e: function(e) {
        didErr = true;
        err = e;
      },
      f: function() {
        try {
          if (!normalCompletion && it.return != null) it.return();
        } finally {
          if (didErr) throw err;
        }
      }
    };
  }
`,s.createForOfIteratorHelperLoose=a("7.9.0")`
  import unsupportedIterableToArray from "unsupportedIterableToArray";

  export default function _createForOfIteratorHelperLoose(o, allowArrayLike) {
    var it;

    if (typeof Symbol === "undefined" || o[Symbol.iterator] == null) {
      // Fallback for engines without symbol support
      if (
        Array.isArray(o) ||
        (it = unsupportedIterableToArray(o)) ||
        (allowArrayLike && o && typeof o.length === "number")
      ) {
        if (it) o = it;
        var i = 0;
        return function() {
          if (i >= o.length) return { done: true };
          return { done: false, value: o[i++] };
        }
      }

      throw new TypeError("Invalid attempt to iterate non-iterable instance.\\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method.");
    }

    it = o[Symbol.iterator]();
    return it.next.bind(it);
  }
`,s.skipFirstGeneratorNext=a("7.0.0-beta.0")`
  export default function _skipFirstGeneratorNext(fn) {
    return function () {
      var it = fn.apply(this, arguments);
      it.next();
      return it;
    }
  }
`,s.toPrimitive=a("7.1.5")`
  export default function _toPrimitive(
    input,
    hint /*: "default" | "string" | "number" | void */
  ) {
    if (typeof input !== "object" || input === null) return input;
    var prim = input[Symbol.toPrimitive];
    if (prim !== undefined) {
      var res = prim.call(input, hint || "default");
      if (typeof res !== "object") return res;
      throw new TypeError("@@toPrimitive must return a primitive value.");
    }
    return (hint === "string" ? String : Number)(input);
  }
`,s.toPropertyKey=a("7.1.5")`
  import toPrimitive from "toPrimitive";

  export default function _toPropertyKey(arg) {
    var key = toPrimitive(arg, "string");
    return typeof key === "symbol" ? key : String(key);
  }
`,s.initializerWarningHelper=a("7.0.0-beta.0")`
    export default function _initializerWarningHelper(descriptor, context){
        throw new Error(
          'Decorating class property failed. Please ensure that ' +
          'proposal-class-properties is enabled and runs after the decorators transform.'
        );
    }
`,s.initializerDefineProperty=a("7.0.0-beta.0")`
    export default function _initializerDefineProperty(target, property, descriptor, context){
        if (!descriptor) return;

        Object.defineProperty(target, property, {
            enumerable: descriptor.enumerable,
            configurable: descriptor.configurable,
            writable: descriptor.writable,
            value: descriptor.initializer ? descriptor.initializer.call(context) : void 0,
        });
    }
`,s.applyDecoratedDescriptor=a("7.0.0-beta.0")`
    export default function _applyDecoratedDescriptor(target, property, decorators, descriptor, context){
        var desc = {};
        Object.keys(descriptor).forEach(function(key){
            desc[key] = descriptor[key];
        });
        desc.enumerable = !!desc.enumerable;
        desc.configurable = !!desc.configurable;
        if ('value' in desc || desc.initializer){
            desc.writable = true;
        }

        desc = decorators.slice().reverse().reduce(function(desc, decorator){
            return decorator(target, property, desc) || desc;
        }, desc);

        if (context && desc.initializer !== void 0){
            desc.value = desc.initializer ? desc.initializer.call(context) : void 0;
            desc.initializer = undefined;
        }

        if (desc.initializer === void 0){
            Object.defineProperty(target, property, desc);
            desc = null;
        }

        return desc;
    }
`,s.classPrivateFieldLooseKey=a("7.0.0-beta.0")`
  var id = 0;
  export default function _classPrivateFieldKey(name) {
    return "__private_" + (id++) + "_" + name;
  }
`,s.classPrivateFieldLooseBase=a("7.0.0-beta.0")`
  export default function _classPrivateFieldBase(receiver, privateKey) {
    if (!Object.prototype.hasOwnProperty.call(receiver, privateKey)) {
      throw new TypeError("attempted to use private field on non-instance");
    }
    return receiver;
  }
`,s.classPrivateFieldGet=a("7.0.0-beta.0")`
  export default function _classPrivateFieldGet(receiver, privateMap) {
    var descriptor = privateMap.get(receiver);
    if (!descriptor) {
      throw new TypeError("attempted to get private field on non-instance");
    }
    if (descriptor.get) {
      return descriptor.get.call(receiver);
    }
    return descriptor.value;
  }
`,s.classPrivateFieldSet=a("7.0.0-beta.0")`
  export default function _classPrivateFieldSet(receiver, privateMap, value) {
    var descriptor = privateMap.get(receiver);
    if (!descriptor) {
      throw new TypeError("attempted to set private field on non-instance");
    }
    if (descriptor.set) {
      descriptor.set.call(receiver, value);
    } else {
      if (!descriptor.writable) {
        // This should only throw in strict mode, but class bodies are
        // always strict and private fields can only be used inside
        // class bodies.
        throw new TypeError("attempted to set read only private field");
      }

      descriptor.value = value;
    }

    return value;
  }
`,s.classPrivateFieldDestructureSet=a("7.4.4")`
  export default function _classPrivateFieldDestructureSet(receiver, privateMap) {
    if (!privateMap.has(receiver)) {
      throw new TypeError("attempted to set private field on non-instance");
    }
    var descriptor = privateMap.get(receiver);
    if (descriptor.set) {
      if (!("__destrObj" in descriptor)) {
        descriptor.__destrObj = {
          set value(v) {
            descriptor.set.call(receiver, v)
          },
        };
      }
      return descriptor.__destrObj;
    } else {
      if (!descriptor.writable) {
        // This should only throw in strict mode, but class bodies are
        // always strict and private fields can only be used inside
        // class bodies.
        throw new TypeError("attempted to set read only private field");
      }

      return descriptor;
    }
  }
`,s.classStaticPrivateFieldSpecGet=a("7.0.2")`
  export default function _classStaticPrivateFieldSpecGet(receiver, classConstructor, descriptor) {
    if (receiver !== classConstructor) {
      throw new TypeError("Private static access of wrong provenance");
    }
    if (descriptor.get) {
      return descriptor.get.call(receiver);
    }
    return descriptor.value;
  }
`,s.classStaticPrivateFieldSpecSet=a("7.0.2")`
  export default function _classStaticPrivateFieldSpecSet(receiver, classConstructor, descriptor, value) {
    if (receiver !== classConstructor) {
      throw new TypeError("Private static access of wrong provenance");
    }
    if (descriptor.set) {
      descriptor.set.call(receiver, value);
    } else {
      if (!descriptor.writable) {
        // This should only throw in strict mode, but class bodies are
        // always strict and private fields can only be used inside
        // class bodies.
        throw new TypeError("attempted to set read only private field");
      }
      descriptor.value = value;
    }

    return value;
  }
`,s.classStaticPrivateMethodGet=a("7.3.2")`
  export default function _classStaticPrivateMethodGet(receiver, classConstructor, method) {
    if (receiver !== classConstructor) {
      throw new TypeError("Private static access of wrong provenance");
    }
    return method;
  }
`,s.classStaticPrivateMethodSet=a("7.3.2")`
  export default function _classStaticPrivateMethodSet() {
    throw new TypeError("attempted to set read only static private field");
  }
`,s.decorate=a("7.1.5")`
  import toArray from "toArray";
  import toPropertyKey from "toPropertyKey";

  // These comments are stripped by @babel/template
  /*::
  type PropertyDescriptor =
    | {
        value: any,
        writable: boolean,
        configurable: boolean,
        enumerable: boolean,
      }
    | {
        get?: () => any,
        set?: (v: any) => void,
        configurable: boolean,
        enumerable: boolean,
      };

  type FieldDescriptor ={
    writable: boolean,
    configurable: boolean,
    enumerable: boolean,
  };

  type Placement = "static" | "prototype" | "own";
  type Key = string | symbol; // PrivateName is not supported yet.

  type ElementDescriptor =
    | {
        kind: "method",
        key: Key,
        placement: Placement,
        descriptor: PropertyDescriptor
      }
    | {
        kind: "field",
        key: Key,
        placement: Placement,
        descriptor: FieldDescriptor,
        initializer?: () => any,
      };

  // This is exposed to the user code
  type ElementObjectInput = ElementDescriptor & {
    [@@toStringTag]?: "Descriptor"
  };

  // This is exposed to the user code
  type ElementObjectOutput = ElementDescriptor & {
    [@@toStringTag]?: "Descriptor"
    extras?: ElementDescriptor[],
    finisher?: ClassFinisher,
  };

  // This is exposed to the user code
  type ClassObject = {
    [@@toStringTag]?: "Descriptor",
    kind: "class",
    elements: ElementDescriptor[],
  };

  type ElementDecorator = (descriptor: ElementObjectInput) => ?ElementObjectOutput;
  type ClassDecorator = (descriptor: ClassObject) => ?ClassObject;
  type ClassFinisher = <A, B>(cl: Class<A>) => Class<B>;

  // Only used by Babel in the transform output, not part of the spec.
  type ElementDefinition =
    | {
        kind: "method",
        value: any,
        key: Key,
        static?: boolean,
        decorators?: ElementDecorator[],
      }
    | {
        kind: "field",
        value: () => any,
        key: Key,
        static?: boolean,
        decorators?: ElementDecorator[],
    };

  declare function ClassFactory<C>(initialize: (instance: C) => void): {
    F: Class<C>,
    d: ElementDefinition[]
  }

  */

  /*::
  // Various combinations with/without extras and with one or many finishers

  type ElementFinisherExtras = {
    element: ElementDescriptor,
    finisher?: ClassFinisher,
    extras?: ElementDescriptor[],
  };

  type ElementFinishersExtras = {
    element: ElementDescriptor,
    finishers: ClassFinisher[],
    extras: ElementDescriptor[],
  };

  type ElementsFinisher = {
    elements: ElementDescriptor[],
    finisher?: ClassFinisher,
  };

  type ElementsFinishers = {
    elements: ElementDescriptor[],
    finishers: ClassFinisher[],
  };

  */

  /*::

  type Placements = {
    static: Key[],
    prototype: Key[],
    own: Key[],
  };

  */

  // ClassDefinitionEvaluation (Steps 26-*)
  export default function _decorate(
    decorators /*: ClassDecorator[] */,
    factory /*: ClassFactory */,
    superClass /*: ?Class<*> */,
    mixins /*: ?Array<Function> */,
  ) /*: Class<*> */ {
    var api = _getDecoratorsApi();
    if (mixins) {
      for (var i = 0; i < mixins.length; i++) {
        api = mixins[i](api);
      }
    }

    var r = factory(function initialize(O) {
      api.initializeInstanceElements(O, decorated.elements);
    }, superClass);
    var decorated = api.decorateClass(
      _coalesceClassElements(r.d.map(_createElementDescriptor)),
      decorators,
    );

    api.initializeClassElements(r.F, decorated.elements);

    return api.runClassFinishers(r.F, decorated.finishers);
  }

  function _getDecoratorsApi() {
    _getDecoratorsApi = function() {
      return api;
    };

    var api = {
      elementsDefinitionOrder: [["method"], ["field"]],

      // InitializeInstanceElements
      initializeInstanceElements: function(
        /*::<C>*/ O /*: C */,
        elements /*: ElementDescriptor[] */,
      ) {
        ["method", "field"].forEach(function(kind) {
          elements.forEach(function(element /*: ElementDescriptor */) {
            if (element.kind === kind && element.placement === "own") {
              this.defineClassElement(O, element);
            }
          }, this);
        }, this);
      },

      // InitializeClassElements
      initializeClassElements: function(
        /*::<C>*/ F /*: Class<C> */,
        elements /*: ElementDescriptor[] */,
      ) {
        var proto = F.prototype;

        ["method", "field"].forEach(function(kind) {
          elements.forEach(function(element /*: ElementDescriptor */) {
            var placement = element.placement;
            if (
              element.kind === kind &&
              (placement === "static" || placement === "prototype")
            ) {
              var receiver = placement === "static" ? F : proto;
              this.defineClassElement(receiver, element);
            }
          }, this);
        }, this);
      },

      // DefineClassElement
      defineClassElement: function(
        /*::<C>*/ receiver /*: C | Class<C> */,
        element /*: ElementDescriptor */,
      ) {
        var descriptor /*: PropertyDescriptor */ = element.descriptor;
        if (element.kind === "field") {
          var initializer = element.initializer;
          descriptor = {
            enumerable: descriptor.enumerable,
            writable: descriptor.writable,
            configurable: descriptor.configurable,
            value: initializer === void 0 ? void 0 : initializer.call(receiver),
          };
        }
        Object.defineProperty(receiver, element.key, descriptor);
      },

      // DecorateClass
      decorateClass: function(
        elements /*: ElementDescriptor[] */,
        decorators /*: ClassDecorator[] */,
      ) /*: ElementsFinishers */ {
        var newElements /*: ElementDescriptor[] */ = [];
        var finishers /*: ClassFinisher[] */ = [];
        var placements /*: Placements */ = {
          static: [],
          prototype: [],
          own: [],
        };

        elements.forEach(function(element /*: ElementDescriptor */) {
          this.addElementPlacement(element, placements);
        }, this);

        elements.forEach(function(element /*: ElementDescriptor */) {
          if (!_hasDecorators(element)) return newElements.push(element);

          var elementFinishersExtras /*: ElementFinishersExtras */ = this.decorateElement(
            element,
            placements,
          );
          newElements.push(elementFinishersExtras.element);
          newElements.push.apply(newElements, elementFinishersExtras.extras);
          finishers.push.apply(finishers, elementFinishersExtras.finishers);
        }, this);

        if (!decorators) {
          return { elements: newElements, finishers: finishers };
        }

        var result /*: ElementsFinishers */ = this.decorateConstructor(
          newElements,
          decorators,
        );
        finishers.push.apply(finishers, result.finishers);
        result.finishers = finishers;

        return result;
      },

      // AddElementPlacement
      addElementPlacement: function(
        element /*: ElementDescriptor */,
        placements /*: Placements */,
        silent /*: boolean */,
      ) {
        var keys = placements[element.placement];
        if (!silent && keys.indexOf(element.key) !== -1) {
          throw new TypeError("Duplicated element (" + element.key + ")");
        }
        keys.push(element.key);
      },

      // DecorateElement
      decorateElement: function(
        element /*: ElementDescriptor */,
        placements /*: Placements */,
      ) /*: ElementFinishersExtras */ {
        var extras /*: ElementDescriptor[] */ = [];
        var finishers /*: ClassFinisher[] */ = [];

        for (
          var decorators = element.decorators, i = decorators.length - 1;
          i >= 0;
          i--
        ) {
          // (inlined) RemoveElementPlacement
          var keys = placements[element.placement];
          keys.splice(keys.indexOf(element.key), 1);

          var elementObject /*: ElementObjectInput */ = this.fromElementDescriptor(
            element,
          );
          var elementFinisherExtras /*: ElementFinisherExtras */ = this.toElementFinisherExtras(
            (0, decorators[i])(elementObject) /*: ElementObjectOutput */ ||
              elementObject,
          );

          element = elementFinisherExtras.element;
          this.addElementPlacement(element, placements);

          if (elementFinisherExtras.finisher) {
            finishers.push(elementFinisherExtras.finisher);
          }

          var newExtras /*: ElementDescriptor[] | void */ =
            elementFinisherExtras.extras;
          if (newExtras) {
            for (var j = 0; j < newExtras.length; j++) {
              this.addElementPlacement(newExtras[j], placements);
            }
            extras.push.apply(extras, newExtras);
          }
        }

        return { element: element, finishers: finishers, extras: extras };
      },

      // DecorateConstructor
      decorateConstructor: function(
        elements /*: ElementDescriptor[] */,
        decorators /*: ClassDecorator[] */,
      ) /*: ElementsFinishers */ {
        var finishers /*: ClassFinisher[] */ = [];

        for (var i = decorators.length - 1; i >= 0; i--) {
          var obj /*: ClassObject */ = this.fromClassDescriptor(elements);
          var elementsAndFinisher /*: ElementsFinisher */ = this.toClassDescriptor(
            (0, decorators[i])(obj) /*: ClassObject */ || obj,
          );

          if (elementsAndFinisher.finisher !== undefined) {
            finishers.push(elementsAndFinisher.finisher);
          }

          if (elementsAndFinisher.elements !== undefined) {
            elements = elementsAndFinisher.elements;

            for (var j = 0; j < elements.length - 1; j++) {
              for (var k = j + 1; k < elements.length; k++) {
                if (
                  elements[j].key === elements[k].key &&
                  elements[j].placement === elements[k].placement
                ) {
                  throw new TypeError(
                    "Duplicated element (" + elements[j].key + ")",
                  );
                }
              }
            }
          }
        }

        return { elements: elements, finishers: finishers };
      },

      // FromElementDescriptor
      fromElementDescriptor: function(
        element /*: ElementDescriptor */,
      ) /*: ElementObject */ {
        var obj /*: ElementObject */ = {
          kind: element.kind,
          key: element.key,
          placement: element.placement,
          descriptor: element.descriptor,
        };

        var desc = {
          value: "Descriptor",
          configurable: true,
        };
        Object.defineProperty(obj, Symbol.toStringTag, desc);

        if (element.kind === "field") obj.initializer = element.initializer;

        return obj;
      },

      // ToElementDescriptors
      toElementDescriptors: function(
        elementObjects /*: ElementObject[] */,
      ) /*: ElementDescriptor[] */ {
        if (elementObjects === undefined) return;
        return toArray(elementObjects).map(function(elementObject) {
          var element = this.toElementDescriptor(elementObject);
          this.disallowProperty(elementObject, "finisher", "An element descriptor");
          this.disallowProperty(elementObject, "extras", "An element descriptor");
          return element;
        }, this);
      },

      // ToElementDescriptor
      toElementDescriptor: function(
        elementObject /*: ElementObject */,
      ) /*: ElementDescriptor */ {
        var kind = String(elementObject.kind);
        if (kind !== "method" && kind !== "field") {
          throw new TypeError(
            'An element descriptor\\'s .kind property must be either "method" or' +
              ' "field", but a decorator created an element descriptor with' +
              ' .kind "' +
              kind +
              '"',
          );
        }

        var key = toPropertyKey(elementObject.key);

        var placement = String(elementObject.placement);
        if (
          placement !== "static" &&
          placement !== "prototype" &&
          placement !== "own"
        ) {
          throw new TypeError(
            'An element descriptor\\'s .placement property must be one of "static",' +
              ' "prototype" or "own", but a decorator created an element descriptor' +
              ' with .placement "' +
              placement +
              '"',
          );
        }

        var descriptor /*: PropertyDescriptor */ = elementObject.descriptor;

        this.disallowProperty(elementObject, "elements", "An element descriptor");

        var element /*: ElementDescriptor */ = {
          kind: kind,
          key: key,
          placement: placement,
          descriptor: Object.assign({}, descriptor),
        };

        if (kind !== "field") {
          this.disallowProperty(elementObject, "initializer", "A method descriptor");
        } else {
          this.disallowProperty(
            descriptor,
            "get",
            "The property descriptor of a field descriptor",
          );
          this.disallowProperty(
            descriptor,
            "set",
            "The property descriptor of a field descriptor",
          );
          this.disallowProperty(
            descriptor,
            "value",
            "The property descriptor of a field descriptor",
          );

          element.initializer = elementObject.initializer;
        }

        return element;
      },

      toElementFinisherExtras: function(
        elementObject /*: ElementObject */,
      ) /*: ElementFinisherExtras */ {
        var element /*: ElementDescriptor */ = this.toElementDescriptor(
          elementObject,
        );
        var finisher /*: ClassFinisher */ = _optionalCallableProperty(
          elementObject,
          "finisher",
        );
        var extras /*: ElementDescriptors[] */ = this.toElementDescriptors(
          elementObject.extras,
        );

        return { element: element, finisher: finisher, extras: extras };
      },

      // FromClassDescriptor
      fromClassDescriptor: function(
        elements /*: ElementDescriptor[] */,
      ) /*: ClassObject */ {
        var obj = {
          kind: "class",
          elements: elements.map(this.fromElementDescriptor, this),
        };

        var desc = { value: "Descriptor", configurable: true };
        Object.defineProperty(obj, Symbol.toStringTag, desc);

        return obj;
      },

      // ToClassDescriptor
      toClassDescriptor: function(
        obj /*: ClassObject */,
      ) /*: ElementsFinisher */ {
        var kind = String(obj.kind);
        if (kind !== "class") {
          throw new TypeError(
            'A class descriptor\\'s .kind property must be "class", but a decorator' +
              ' created a class descriptor with .kind "' +
              kind +
              '"',
          );
        }

        this.disallowProperty(obj, "key", "A class descriptor");
        this.disallowProperty(obj, "placement", "A class descriptor");
        this.disallowProperty(obj, "descriptor", "A class descriptor");
        this.disallowProperty(obj, "initializer", "A class descriptor");
        this.disallowProperty(obj, "extras", "A class descriptor");

        var finisher = _optionalCallableProperty(obj, "finisher");
        var elements = this.toElementDescriptors(obj.elements);

        return { elements: elements, finisher: finisher };
      },

      // RunClassFinishers
      runClassFinishers: function(
        constructor /*: Class<*> */,
        finishers /*: ClassFinisher[] */,
      ) /*: Class<*> */ {
        for (var i = 0; i < finishers.length; i++) {
          var newConstructor /*: ?Class<*> */ = (0, finishers[i])(constructor);
          if (newConstructor !== undefined) {
            // NOTE: This should check if IsConstructor(newConstructor) is false.
            if (typeof newConstructor !== "function") {
              throw new TypeError("Finishers must return a constructor.");
            }
            constructor = newConstructor;
          }
        }
        return constructor;
      },

      disallowProperty: function(obj, name, objectType) {
        if (obj[name] !== undefined) {
          throw new TypeError(objectType + " can't have a ." + name + " property.");
        }
      }
    };

    return api;
  }

  // ClassElementEvaluation
  function _createElementDescriptor(
    def /*: ElementDefinition */,
  ) /*: ElementDescriptor */ {
    var key = toPropertyKey(def.key);

    var descriptor /*: PropertyDescriptor */;
    if (def.kind === "method") {
      descriptor = {
        value: def.value,
        writable: true,
        configurable: true,
        enumerable: false,
      };
    } else if (def.kind === "get") {
      descriptor = { get: def.value, configurable: true, enumerable: false };
    } else if (def.kind === "set") {
      descriptor = { set: def.value, configurable: true, enumerable: false };
    } else if (def.kind === "field") {
      descriptor = { configurable: true, writable: true, enumerable: true };
    }

    var element /*: ElementDescriptor */ = {
      kind: def.kind === "field" ? "field" : "method",
      key: key,
      placement: def.static
        ? "static"
        : def.kind === "field"
        ? "own"
        : "prototype",
      descriptor: descriptor,
    };
    if (def.decorators) element.decorators = def.decorators;
    if (def.kind === "field") element.initializer = def.value;

    return element;
  }

  // CoalesceGetterSetter
  function _coalesceGetterSetter(
    element /*: ElementDescriptor */,
    other /*: ElementDescriptor */,
  ) {
    if (element.descriptor.get !== undefined) {
      other.descriptor.get = element.descriptor.get;
    } else {
      other.descriptor.set = element.descriptor.set;
    }
  }

  // CoalesceClassElements
  function _coalesceClassElements(
    elements /*: ElementDescriptor[] */,
  ) /*: ElementDescriptor[] */ {
    var newElements /*: ElementDescriptor[] */ = [];

    var isSameElement = function(
      other /*: ElementDescriptor */,
    ) /*: boolean */ {
      return (
        other.kind === "method" &&
        other.key === element.key &&
        other.placement === element.placement
      );
    };

    for (var i = 0; i < elements.length; i++) {
      var element /*: ElementDescriptor */ = elements[i];
      var other /*: ElementDescriptor */;

      if (
        element.kind === "method" &&
        (other = newElements.find(isSameElement))
      ) {
        if (
          _isDataDescriptor(element.descriptor) ||
          _isDataDescriptor(other.descriptor)
        ) {
          if (_hasDecorators(element) || _hasDecorators(other)) {
            throw new ReferenceError(
              "Duplicated methods (" + element.key + ") can't be decorated.",
            );
          }
          other.descriptor = element.descriptor;
        } else {
          if (_hasDecorators(element)) {
            if (_hasDecorators(other)) {
              throw new ReferenceError(
                "Decorators can't be placed on different accessors with for " +
                  "the same property (" +
                  element.key +
                  ").",
              );
            }
            other.decorators = element.decorators;
          }
          _coalesceGetterSetter(element, other);
        }
      } else {
        newElements.push(element);
      }
    }

    return newElements;
  }

  function _hasDecorators(element /*: ElementDescriptor */) /*: boolean */ {
    return element.decorators && element.decorators.length;
  }

  function _isDataDescriptor(desc /*: PropertyDescriptor */) /*: boolean */ {
    return (
      desc !== undefined &&
      !(desc.value === undefined && desc.writable === undefined)
    );
  }

  function _optionalCallableProperty /*::<T>*/(
    obj /*: T */,
    name /*: $Keys<T> */,
  ) /*: ?Function */ {
    var value = obj[name];
    if (value !== undefined && typeof value !== "function") {
      throw new TypeError("Expected '" + name + "' to be a function");
    }
    return value;
  }

`,s.classPrivateMethodGet=a("7.1.6")`
  export default function _classPrivateMethodGet(receiver, privateSet, fn) {
    if (!privateSet.has(receiver)) {
      throw new TypeError("attempted to get private field on non-instance");
    }
    return fn;
  }
`,s.classPrivateMethodSet=a("7.1.6")`
    export default function _classPrivateMethodSet() {
      throw new TypeError("attempted to reassign private method");
    }
  `,s.wrapRegExp=a("7.2.6")`
  import wrapNativeSuper from "wrapNativeSuper";
  import getPrototypeOf from "getPrototypeOf";
  import possibleConstructorReturn from "possibleConstructorReturn";
  import inherits from "inherits";

  export default function _wrapRegExp(re, groups) {
    _wrapRegExp = function(re, groups) {
      return new BabelRegExp(re, undefined, groups);
    };

    var _RegExp = wrapNativeSuper(RegExp);
    var _super = RegExp.prototype;
    var _groups = new WeakMap();

    function BabelRegExp(re, flags, groups) {
      var _this = _RegExp.call(this, re, flags);
      // if the regex is recreated with 'g' flag
      _groups.set(_this, groups || _groups.get(re));
      return _this;
    }
    inherits(BabelRegExp, _RegExp);

    BabelRegExp.prototype.exec = function(str) {
      var result = _super.exec.call(this, str);
      if (result) result.groups = buildGroups(result, this);
      return result;
    };
    BabelRegExp.prototype[Symbol.replace] = function(str, substitution) {
      if (typeof substitution === "string") {
        var groups = _groups.get(this);
        return _super[Symbol.replace].call(
          this,
          str,
          substitution.replace(/\\$<([^>]+)>/g, function(_, name) {
            return "$" + groups[name];
          })
        );
      } else if (typeof substitution === "function") {
        var _this = this;
        return _super[Symbol.replace].call(
          this,
          str,
          function() {
            var args = [];
            args.push.apply(args, arguments);
            if (typeof args[args.length - 1] !== "object") {
              // Modern engines already pass result.groups as the last arg.
              args.push(buildGroups(args, _this));
            }
            return substitution.apply(this, args);
          }
        );
      } else {
        return _super[Symbol.replace].call(this, str, substitution);
      }
    }

    function buildGroups(result, re) {
      // NOTE: This function should return undefined if there are no groups,
      // but in that case Babel doesn't add the wrapper anyway.

      var g = _groups.get(re);
      return Object.keys(g).reduce(function(groups, name) {
        groups[name] = result[g[name]];
        return groups;
      }, Object.create(null));
    }

    return _wrapRegExp.apply(this, arguments);
  }
`},function(e,t,r){"use strict";Object.defineProperty(t,"__esModule",{value:!0}),t.rewriteModuleStatementsAndPrepareHeader=function(e,{exportName:t,strict:r,allowTopLevelThis:p,strictMode:f,loose:d,noInterop:h,lazy:m,esNamespaceOnly:g}){(0,n.default)((0,a.isModule)(e),"Cannot process module statements in a script"),e.node.sourceType="script";const v=(0,c.default)(e,t,{noInterop:h,loose:d,lazy:m,esNamespaceOnly:g});p||(0,u.default)(e);if((0,l.default)(e,v),!1!==f){e.node.directives.some(e=>"use strict"===e.value.value)||e.unshiftContainer("directives",i.directive(i.directiveLiteral("use strict")))}const E=[];(0,c.hasExports)(v)&&!r&&E.push(function(e,t=!1){return(t?s.default.statement`
        EXPORTS.__esModule = true;
      `:s.default.statement`
        Object.defineProperty(EXPORTS, "__esModule", {
          value: true,
        });
      `)({EXPORTS:e.exportName})}(v,d));const x=function(e,t){const r=Object.create(null);for(const i of t.local.values())for(const e of i.names)r[e]=!0;let n=!1;for(const i of t.source.values()){for(const e of i.reexports.keys())r[e]=!0;for(const e of i.reexportNamespace)r[e]=!0;n=n||i.reexportAll}if(!n||0===Object.keys(r).length)return null;const s=e.scope.generateUidIdentifier("exportNames");return delete r.default,{name:s.name,statement:i.variableDeclaration("var",[i.variableDeclarator(s,i.valueToNode(r))])}}(e,v);x&&(v.exportNameListName=x.name,E.push(x.statement));return E.push(...function(e,t,r=!1){const n=[],s=[];for(const[o,a]of t.local)"import"===a.kind||("hoisted"===a.kind?n.push(b(t,a.names,i.identifier(o))):s.push(...a.names));for(const i of t.source.values()){r||n.push(...y(t,i,r));for(const e of i.reexportNamespace)s.push(e)}return n.push(...(0,o.default)(s,100).map(r=>b(t,r,e.scope.buildUndefinedNode()))),n}(e,v,d)),{meta:v,headers:E}},t.ensureStatementsHoisted=function(e){e.forEach(e=>{e._blockHoist=3})},t.wrapInterop=function(e,t,r){if("none"===r)return null;let n;if("default"===r)n="interopRequireDefault";else{if("namespace"!==r)throw new Error("Unknown interop: "+r);n="interopRequireWildcard"}return i.callExpression(e.hub.addHelper(n),[t])},t.buildNamespaceInitStatements=function(e,t,r=!1){const n=[];let o=i.identifier(t.name);t.lazy&&(o=i.callExpression(o,[]));for(const a of t.importsNamespace)a!==t.name&&n.push(s.default.statement`var NAME = SOURCE;`({NAME:a,SOURCE:i.cloneNode(o)}));r&&n.push(...y(e,t,r));for(const a of t.reexportNamespace)n.push((t.lazy?s.default.statement`
            Object.defineProperty(EXPORTS, "NAME", {
              enumerable: true,
              get: function() {
                return NAMESPACE;
              }
            });
          `:s.default.statement`EXPORTS.NAME = NAMESPACE;`)({EXPORTS:e.exportName,NAME:a,NAMESPACE:i.cloneNode(o)}));if(t.reexportAll){const a=function(e,t,r){return(r?s.default.statement`
        Object.keys(NAMESPACE).forEach(function(key) {
          if (key === "default" || key === "__esModule") return;
          VERIFY_NAME_LIST;
          if (key in EXPORTS && EXPORTS[key] === NAMESPACE[key]) return;

          EXPORTS[key] = NAMESPACE[key];
        });
      `:s.default.statement`
        Object.keys(NAMESPACE).forEach(function(key) {
          if (key === "default" || key === "__esModule") return;
          VERIFY_NAME_LIST;
          if (key in EXPORTS && EXPORTS[key] === NAMESPACE[key]) return;

          Object.defineProperty(EXPORTS, key, {
            enumerable: true,
            get: function() {
              return NAMESPACE[key];
            },
          });
        });
    `)({NAMESPACE:t,EXPORTS:e.exportName,VERIFY_NAME_LIST:e.exportNameListName?s.default`
            if (Object.prototype.hasOwnProperty.call(EXPORTS_LIST, key)) return;
          `({EXPORTS_LIST:e.exportNameListName}):null})}(e,i.cloneNode(o),r);a.loc=t.reexportAll.loc,n.push(a)}return n},Object.defineProperty(t,"isModule",{enumerable:!0,get:function(){return a.isModule}}),Object.defineProperty(t,"rewriteThis",{enumerable:!0,get:function(){return u.default}}),Object.defineProperty(t,"hasExports",{enumerable:!0,get:function(){return c.hasExports}}),Object.defineProperty(t,"isSideEffectImport",{enumerable:!0,get:function(){return c.isSideEffectImport}}),Object.defineProperty(t,"getModuleName",{enumerable:!0,get:function(){return p.default}});var n=h(r(110)),i=d(r(92)),s=h(r(123)),o=h(r(702)),a=r(312),u=h(r(708)),l=h(r(712)),c=d(r(714)),p=h(r(715));function f(){if("function"!=typeof WeakMap)return null;var e=new WeakMap;return f=function(){return e},e}function d(e){if(e&&e.__esModule)return e;if(null===e||"object"!=typeof e&&"function"!=typeof e)return{default:e};var t=f();if(t&&t.has(e))return t.get(e);var r={},n=Object.defineProperty&&Object.getOwnPropertyDescriptor;for(var i in e)if(Object.prototype.hasOwnProperty.call(e,i)){var s=n?Object.getOwnPropertyDescriptor(e,i):null;s&&(s.get||s.set)?Object.defineProperty(r,i,s):r[i]=e[i]}return r.default=e,t&&t.set(e,r),r}function h(e){return e&&e.__esModule?e:{default:e}}const m={loose:s.default.statement`EXPORTS.EXPORT_NAME = NAMESPACE_IMPORT;`,looseComputed:s.default.statement`EXPORTS["EXPORT_NAME"] = NAMESPACE_IMPORT;`,spec:s.default`
    Object.defineProperty(EXPORTS, "EXPORT_NAME", {
      enumerable: true,
      get: function() {
        return NAMESPACE_IMPORT;
      },
    });
    `},y=(e,t,r)=>{const n=t.lazy?i.callExpression(i.identifier(t.name),[]):i.identifier(t.name),{stringSpecifiers:s}=e;return Array.from(t.reexports,([t,o])=>{let a;a=s.has(o)?i.memberExpression(i.cloneNode(n),i.stringLiteral(o),!0):a=i.memberExpression(i.cloneNode(n),i.identifier(o));const u={EXPORTS:e.exportName,EXPORT_NAME:t,NAMESPACE_IMPORT:a};return r?s.has(t)?m.looseComputed(u):m.loose(u):m.spec(u)})};const g={computed:s.default.expression`EXPORTS["NAME"] = VALUE`,default:s.default.expression`EXPORTS.NAME = VALUE`};function b(e,t,r){const{stringSpecifiers:n,exportName:s}=e;return i.expressionStatement(t.reduce((e,t)=>{const r={EXPORTS:s,NAME:t,VALUE:e};return n.has(t)?g.computed(r):g.default(r)},r))}},function(e,t,r){var n=r(703),i=r(311),s=r(704),o=Math.ceil,a=Math.max;e.exports=function(e,t,r){t=(r?i(e,t,r):void 0===t)?1:a(s(t),0);var u=null==e?0:e.length;if(!u||t<1)return[];for(var l=0,c=0,p=Array(o(u/t));l<u;)p[c++]=n(e,l,l+=t);return p}},function(e,t){e.exports=function(e,t,r){var n=-1,i=e.length;t<0&&(t=-t>i?0:i+t),(r=r>i?i:r)<0&&(r+=i),i=t>r?0:r-t>>>0,t>>>=0;for(var s=Array(i);++n<i;)s[n]=e[n+t];return s}},function(e,t,r){var n=r(705);e.exports=function(e){var t=n(e),r=t%1;return t==t?r?t-r:t:0}},function(e,t,r){var n=r(244);e.exports=function(e){return e?(e=n(e))===1/0||e===-1/0?17976931348623157e292*(e<0?-1:1):e==e?e:0:0===e?e:0}},function(e,t,r){"use strict";Object.defineProperty(t,"__esModule",{value:!0}),t.default=void 0;var n=u(r(110)),i=function(e){if(e&&e.__esModule)return e;if(null===e||"object"!=typeof e&&"function"!=typeof e)return{default:e};var t=a();if(t&&t.has(e))return t.get(e);var r={},n=Object.defineProperty&&Object.getOwnPropertyDescriptor;for(var i in e)if(Object.prototype.hasOwnProperty.call(e,i)){var s=n?Object.getOwnPropertyDescriptor(e,i):null;s&&(s.get||s.set)?Object.defineProperty(r,i,s):r[i]=e[i]}r.default=e,t&&t.set(e,r);return r}(r(92)),s=u(r(707)),o=u(r(313));function a(){if("function"!=typeof WeakMap)return null;var e=new WeakMap;return a=function(){return e},e}function u(e){return e&&e.__esModule?e:{default:e}}t.default=class{constructor(e,t,r){this._defaultOpts={importedSource:null,importedType:"commonjs",importedInterop:"babel",importingInterop:"babel",ensureLiveReference:!1,ensureNoContext:!1,importPosition:"before"};const n=e.find(e=>e.isProgram());this._programPath=n,this._programScope=n.scope,this._hub=n.hub,this._defaultOpts=this._applyDefaults(t,r,!0)}addDefault(e,t){return this.addNamed("default",e,t)}addNamed(e,t,r){return(0,n.default)("string"==typeof e),this._generateImport(this._applyDefaults(t,r),e)}addNamespace(e,t){return this._generateImport(this._applyDefaults(e,t),null)}addSideEffect(e,t){return this._generateImport(this._applyDefaults(e,t),!1)}_applyDefaults(e,t,r=!1){const i=[];"string"==typeof e?(i.push({importedSource:e}),i.push(t)):((0,n.default)(!t,"Unexpected secondary arguments."),i.push(e));const s=Object.assign({},this._defaultOpts);for(const n of i)n&&(Object.keys(s).forEach(e=>{void 0!==n[e]&&(s[e]=n[e])}),r||(void 0!==n.nameHint&&(s.nameHint=n.nameHint),void 0!==n.blockHoist&&(s.blockHoist=n.blockHoist)));return s}_generateImport(e,t){const r="default"===t,n=!!t&&!r,a=null===t,{importedSource:u,importedType:l,importedInterop:c,importingInterop:p,ensureLiveReference:f,ensureNoContext:d,nameHint:h,importPosition:m,blockHoist:y}=e;let g=h||t;const b=(0,o.default)(this._programPath),v=b&&"node"===p,E=b&&"babel"===p;if("after"===m&&!b)throw new Error('"importPosition": "after" is only supported in modules');const x=new s.default(u,this._programScope,this._hub);if("es6"===l){if(!v&&!E)throw new Error("Cannot import an ES6 module from CommonJS");x.import(),a?x.namespace(h||u):(r||n)&&x.named(g,t)}else{if("commonjs"!==l)throw new Error(`Unexpected interopType "${l}"`);if("babel"===c)if(v){g="default"!==g?g:u;const e=u+"$es6Default";x.import(),a?x.default(e).var(g||u).wildcardInterop():r?f?x.default(e).var(g||u).defaultInterop().read("default"):x.default(e).var(g).defaultInterop().prop(t):n&&x.default(e).read(t)}else E?(x.import(),a?x.namespace(g||u):(r||n)&&x.named(g,t)):(x.require(),a?x.var(g||u).wildcardInterop():(r||n)&&f?r?(g="default"!==g?g:u,x.var(g).read(t),x.defaultInterop()):x.var(u).read(t):r?x.var(g).defaultInterop().prop(t):n&&x.var(g).prop(t));else if("compiled"===c)v?(x.import(),a?x.default(g||u):(r||n)&&x.default(u).read(g)):E?(x.import(),a?x.namespace(g||u):(r||n)&&x.named(g,t)):(x.require(),a?x.var(g||u):(r||n)&&(f?x.var(u).read(g):x.prop(t).var(g)));else{if("uncompiled"!==c)throw new Error(`Unknown importedInterop "${c}".`);if(r&&f)throw new Error("No live reference for commonjs default");v?(x.import(),a?x.default(g||u):r?x.default(g):n&&x.default(u).read(g)):E?(x.import(),a?x.default(g||u):r?x.default(g):n&&x.named(g,t)):(x.require(),a?x.var(g||u):r?x.var(g):n&&(f?x.var(u).read(g):x.var(g).prop(t)))}}const{statements:S,resultName:T}=x.done();return this._insertStatements(S,m,y),(r||n)&&d&&"Identifier"!==T.type?i.sequenceExpression([i.numericLiteral(0),T]):T}_insertStatements(e,t="before",r=3){const n=this._programPath.get("body");if("after"===t){for(let i=n.length-1;i>=0;i--)if(n[i].isImportDeclaration())return void n[i].insertAfter(e)}else{e.forEach(e=>{e._blockHoist=r});const t=n.find(e=>{const t=e.node._blockHoist;return Number.isFinite(t)&&t<4});if(t)return void t.insertBefore(e)}this._programPath.unshiftContainer("body",e)}}},function(e,t,r){"use strict";Object.defineProperty(t,"__esModule",{value:!0}),t.default=void 0;var n,i=(n=r(110))&&n.__esModule?n:{default:n},s=function(e){if(e&&e.__esModule)return e;if(null===e||"object"!=typeof e&&"function"!=typeof e)return{default:e};var t=o();if(t&&t.has(e))return t.get(e);var r={},n=Object.defineProperty&&Object.getOwnPropertyDescriptor;for(var i in e)if(Object.prototype.hasOwnProperty.call(e,i)){var s=n?Object.getOwnPropertyDescriptor(e,i):null;s&&(s.get||s.set)?Object.defineProperty(r,i,s):r[i]=e[i]}r.default=e,t&&t.set(e,r);return r}(r(92));function o(){if("function"!=typeof WeakMap)return null;var e=new WeakMap;return o=function(){return e},e}t.default=class{constructor(e,t,r){this._statements=[],this._resultName=null,this._scope=null,this._hub=null,this._scope=t,this._hub=r,this._importedSource=e}done(){return{statements:this._statements,resultName:this._resultName}}import(){return this._statements.push(s.importDeclaration([],s.stringLiteral(this._importedSource))),this}require(){return this._statements.push(s.expressionStatement(s.callExpression(s.identifier("require"),[s.stringLiteral(this._importedSource)]))),this}namespace(e="namespace"){e=this._scope.generateUidIdentifier(e);const t=this._statements[this._statements.length-1];return(0,i.default)("ImportDeclaration"===t.type),(0,i.default)(0===t.specifiers.length),t.specifiers=[s.importNamespaceSpecifier(e)],this._resultName=s.cloneNode(e),this}default(e){e=this._scope.generateUidIdentifier(e);const t=this._statements[this._statements.length-1];return(0,i.default)("ImportDeclaration"===t.type),(0,i.default)(0===t.specifiers.length),t.specifiers=[s.importDefaultSpecifier(e)],this._resultName=s.cloneNode(e),this}named(e,t){if("default"===t)return this.default(e);e=this._scope.generateUidIdentifier(e);const r=this._statements[this._statements.length-1];return(0,i.default)("ImportDeclaration"===r.type),(0,i.default)(0===r.specifiers.length),r.specifiers=[s.importSpecifier(e,s.identifier(t))],this._resultName=s.cloneNode(e),this}var(e){e=this._scope.generateUidIdentifier(e);let t=this._statements[this._statements.length-1];return"ExpressionStatement"!==t.type&&((0,i.default)(this._resultName),t=s.expressionStatement(this._resultName),this._statements.push(t)),this._statements[this._statements.length-1]=s.variableDeclaration("var",[s.variableDeclarator(e,t.expression)]),this._resultName=s.cloneNode(e),this}defaultInterop(){return this._interop(this._hub.addHelper("interopRequireDefault"))}wildcardInterop(){return this._interop(this._hub.addHelper("interopRequireWildcard"))}_interop(e){const t=this._statements[this._statements.length-1];return"ExpressionStatement"===t.type?t.expression=s.callExpression(e,[t.expression]):"VariableDeclaration"===t.type?((0,i.default)(1===t.declarations.length),t.declarations[0].init=s.callExpression(e,[t.declarations[0].init])):i.default.fail("Unexpected type."),this}prop(e){const t=this._statements[this._statements.length-1];return"ExpressionStatement"===t.type?t.expression=s.memberExpression(t.expression,s.identifier(e)):"VariableDeclaration"===t.type?((0,i.default)(1===t.declarations.length),t.declarations[0].init=s.memberExpression(t.declarations[0].init,s.identifier(e))):i.default.fail("Unexpected type:"+t.type),this}read(e){this._resultName=s.memberExpression(this._resultName,s.identifier(e))}}},function(e,t,r){"use strict";Object.defineProperty(t,"__esModule",{value:!0}),t.default=function(e){(0,s.default)(e.node,Object.assign({},u,{noScope:!0}))};var n,i=r(709),s=(n=r(103))&&n.__esModule?n:{default:n},o=function(e){if(e&&e.__esModule)return e;if(null===e||"object"!=typeof e&&"function"!=typeof e)return{default:e};var t=a();if(t&&t.has(e))return t.get(e);var r={},n=Object.defineProperty&&Object.getOwnPropertyDescriptor;for(var i in e)if(Object.prototype.hasOwnProperty.call(e,i)){var s=n?Object.getOwnPropertyDescriptor(e,i):null;s&&(s.get||s.set)?Object.defineProperty(r,i,s):r[i]=e[i]}r.default=e,t&&t.set(e,r);return r}(r(92));function a(){if("function"!=typeof WeakMap)return null;var e=new WeakMap;return a=function(){return e},e}const u=s.default.visitors.merge([i.environmentVisitor,{ThisExpression(e){e.replaceWith(o.unaryExpression("void",o.numericLiteral(0),!0))}}])},function(e,t,r){"use strict";Object.defineProperty(t,"__esModule",{value:!0}),t.skipAllButComputedKey=c,t.default=t.environmentVisitor=void 0;var n=u(r(103)),i=u(r(710)),s=u(r(711)),o=function(e){if(e&&e.__esModule)return e;if(null===e||"object"!=typeof e&&"function"!=typeof e)return{default:e};var t=a();if(t&&t.has(e))return t.get(e);var r={},n=Object.defineProperty&&Object.getOwnPropertyDescriptor;for(var i in e)if(Object.prototype.hasOwnProperty.call(e,i)){var s=n?Object.getOwnPropertyDescriptor(e,i):null;s&&(s.get||s.set)?Object.defineProperty(r,i,s):r[i]=e[i]}r.default=e,t&&t.set(e,r);return r}(r(92));function a(){if("function"!=typeof WeakMap)return null;var e=new WeakMap;return a=function(){return e},e}function u(e){return e&&e.__esModule?e:{default:e}}function l(e,t,r,n){e=o.cloneNode(e);const i=t||n?e:o.memberExpression(e,o.identifier("prototype"));return o.callExpression(r.addHelper("getPrototypeOf"),[i])}function c(e){if(!e.node.computed)return void e.skip();const t=o.VISITOR_KEYS[e.type];for(const r of t)"key"!==r&&e.skipKey(r)}const p={[(o.staticBlock?"StaticBlock|":"")+"ClassPrivateProperty|TypeAnnotation"](e){e.skip()},Function(e){e.isMethod()||e.isArrowFunctionExpression()||e.skip()},"Method|ClassProperty"(e){c(e)}};t.environmentVisitor=p;const f=n.default.visitors.merge([p,{Super(e,t){const{node:r,parentPath:n}=e;n.isMemberExpression({object:r})&&t.handle(n)}}]),d=n.default.visitors.merge([p,{Scopable(e,{refName:t}){const r=e.scope.getOwnBinding(t);r&&r.identifier.name===t&&e.scope.rename(t)}}]),h={memoise(e,t){const{scope:r,node:n}=e,{computed:i,property:s}=n;if(!i)return;const o=r.maybeGenerateMemoised(s);o&&this.memoiser.set(s,o,t)},prop(e){const{computed:t,property:r}=e.node;return this.memoiser.has(r)?o.cloneNode(this.memoiser.get(r)):t?o.cloneNode(r):o.stringLiteral(r.name)},get(e){return this._get(e,this._getThisRefs())},_get(e,t){const r=l(this.getObjectRef(),this.isStatic,this.file,this.isPrivateMethod);return o.callExpression(this.file.addHelper("get"),[t.memo?o.sequenceExpression([t.memo,r]):r,this.prop(e),t.this])},_getThisRefs(){if(!this.isDerivedConstructor)return{this:o.thisExpression()};const e=this.scope.generateDeclaredUidIdentifier("thisSuper");return{memo:o.assignmentExpression("=",e,o.thisExpression()),this:o.cloneNode(e)}},set(e,t){const r=this._getThisRefs(),n=l(this.getObjectRef(),this.isStatic,this.file,this.isPrivateMethod);return o.callExpression(this.file.addHelper("set"),[r.memo?o.sequenceExpression([r.memo,n]):n,this.prop(e),t,r.this,o.booleanLiteral(e.isInStrictMode())])},destructureSet(e){throw e.buildCodeFrameError("Destructuring to a super field is not supported yet.")},call(e,t){const r=this._getThisRefs();return(0,s.default)(this._get(e,r),o.cloneNode(r.this),t,!1)},optionalCall(e,t){const r=this._getThisRefs();return(0,s.default)(this._get(e,r),o.cloneNode(r.this),t,!0)}},m=Object.assign({},h,{prop(e){const{property:t}=e.node;return this.memoiser.has(t)?o.cloneNode(this.memoiser.get(t)):o.cloneNode(t)},get(e){const{isStatic:t,superRef:r}=this,{computed:n}=e.node,i=this.prop(e);let s;return s=t?r?o.cloneNode(r):o.memberExpression(o.identifier("Function"),o.identifier("prototype")):r?o.memberExpression(o.cloneNode(r),o.identifier("prototype")):o.memberExpression(o.identifier("Object"),o.identifier("prototype")),o.memberExpression(s,i,n)},set(e,t){const{computed:r}=e.node,n=this.prop(e);return o.assignmentExpression("=",o.memberExpression(o.thisExpression(),n,r),t)},destructureSet(e){const{computed:t}=e.node,r=this.prop(e);return o.memberExpression(o.thisExpression(),r,t)},call(e,t){return(0,s.default)(this.get(e),o.thisExpression(),t,!1)},optionalCall(e,t){return(0,s.default)(this.get(e),o.thisExpression(),t,!0)}});t.default=class{constructor(e){const t=e.methodPath;this.methodPath=t,this.isDerivedConstructor=t.isClassMethod({kind:"constructor"})&&!!e.superRef,this.isStatic=t.isObjectMethod()||t.node.static,this.isPrivateMethod=t.isPrivate()&&t.isMethod(),this.file=e.file,this.superRef=e.superRef,this.isLoose=e.isLoose,this.opts=e}getObjectRef(){return o.cloneNode(this.opts.objectRef||this.opts.getObjectRef())}replace(){this.opts.refToPreserve&&this.methodPath.traverse(d,{refName:this.opts.refToPreserve.name});const e=this.isLoose?m:h;(0,i.default)(this.methodPath,f,Object.assign({file:this.file,scope:this.methodPath.scope,isDerivedConstructor:this.isDerivedConstructor,isStatic:this.isStatic,isPrivateMethod:this.isPrivateMethod,getObjectRef:this.getObjectRef.bind(this),superRef:this.superRef},e))}}},function(e,t,r){"use strict";Object.defineProperty(t,"__esModule",{value:!0});var n=r(92);class i{constructor(){this._map=new WeakMap}has(e){return this._map.has(e)}get(e){if(!this.has(e))return;const t=this._map.get(e),{value:r}=t;return t.count--,0===t.count?n.assignmentExpression("=",r,e):r}set(e,t,r){return this._map.set(e,{count:r,value:t})}}function s(e,t){const{node:r}=e;if(e.isOptionalMemberExpression())return n.memberExpression(t,r.property,r.computed);if(e.isOptionalCallExpression()){const i=e.get("callee");if(e.node.optional&&i.isOptionalMemberExpression()){const{object:s}=i.node,o=e.scope.maybeGenerateMemoised(s)||s;return i.get("object").replaceWith(n.assignmentExpression("=",o,s)),n.callExpression(n.memberExpression(t,n.identifier("call")),[o,...r.arguments])}return n.callExpression(t,r.arguments)}return e.node}const o={memoise(){},handle(e){const{node:t,parent:r,parentPath:i,scope:o}=e;if(e.isOptionalMemberExpression()){if(function(e){for(;e&&!e.isProgram();){const{parentPath:t,container:r,listKey:n}=e,i=t.node;if(n){if(r!==i[n])return!0}else if(r!==i)return!0;e=t}return!1}(e))return;const a=e.find(({node:t,parent:r,parentPath:n})=>n.isOptionalMemberExpression()?r.optional||r.object!==t:!n.isOptionalCallExpression()||(t!==e.node&&r.optional||r.callee!==t));if(o.path.isPattern())return void a.replaceWith(n.callExpression(n.arrowFunctionExpression([],a.node),[]));const u=function e(t){const r=t,{node:n,parentPath:i}=r;if(i.isLogicalExpression()){const{operator:t,right:r}=i.node;if("&&"===t||"||"===t||"??"===t&&n===r)return e(i)}if(i.isSequenceExpression()){const{expressions:t}=i.node;return t[t.length-1]!==n||e(i)}return i.isConditional({test:n})||i.isUnaryExpression({operator:"!"})||i.isLoop({test:n})}(a),l=a.parentPath;if(l.isUpdateExpression({argument:t})||l.isAssignmentExpression({left:t}))throw e.buildCodeFrameError("can't handle assignment");const c=l.isUnaryExpression({operator:"delete"});if(c&&a.isOptionalMemberExpression()&&a.get("property").isPrivateName())throw e.buildCodeFrameError("can't delete a private class element");let p=e;for(;;)if(p.isOptionalMemberExpression()){if(p.node.optional)break;p=p.get("object")}else{if(!p.isOptionalCallExpression())throw new Error("Internal error: unexpected "+p.node.type);if(p.node.optional)break;p=p.get("callee")}const f=p.isOptionalMemberExpression()?"object":"callee",d=p.node[f],h=o.maybeGenerateMemoised(d),m=null!=h?h:d,y=i.isOptionalCallExpression({callee:t}),g=i.isCallExpression({callee:t});p.replaceWith(s(p,m)),y?r.optional?i.replaceWith(this.optionalCall(e,r.arguments)):i.replaceWith(this.call(e,r.arguments)):g?e.replaceWith(this.boundGet(e)):e.replaceWith(this.get(e));let b,v=e.node;for(let t=e;t!==a;){const{parentPath:e}=t;if(e===a&&y&&r.optional){v=e.node;break}v=s(e,v),t=e}const E=a.parentPath;if(n.isMemberExpression(v)&&E.isOptionalCallExpression({callee:a.node,optional:!0})){const{object:t}=v;b=e.scope.maybeGenerateMemoised(t),b&&(v.object=n.assignmentExpression("=",b,t))}let x=a;if(c&&(x=E,v=E.node),u){const e=n.logicalExpression("&&",n.binaryExpression("!==",h?n.assignmentExpression("=",n.cloneNode(m),n.cloneNode(d)):n.cloneNode(m),n.nullLiteral()),n.binaryExpression("!==",n.cloneNode(m),o.buildUndefinedNode()));x.replaceWith(n.logicalExpression("&&",e,v))}else{const e=n.logicalExpression("||",n.binaryExpression("===",h?n.assignmentExpression("=",n.cloneNode(m),n.cloneNode(d)):n.cloneNode(m),n.nullLiteral()),n.binaryExpression("===",n.cloneNode(m),o.buildUndefinedNode()));x.replaceWith(n.conditionalExpression(e,c?n.booleanLiteral(!0):o.buildUndefinedNode(),v))}if(b){const e=E.node;E.replaceWith(n.optionalCallExpression(n.optionalMemberExpression(e.callee,n.identifier("call"),!1,!0),[n.cloneNode(b),...e.arguments],!1))}}else if(i.isUpdateExpression({argument:t})){if(this.simpleSet)return void e.replaceWith(this.simpleSet(e));const{operator:s,prefix:o}=r;this.memoise(e,2);const a=n.binaryExpression(s[0],n.unaryExpression("+",this.get(e)),n.numericLiteral(1));if(o)i.replaceWith(this.set(e,a));else{const{scope:r}=e,s=r.generateUidIdentifierBasedOnNode(t);r.push({id:s}),a.left=n.assignmentExpression("=",n.cloneNode(s),a.left),i.replaceWith(n.sequenceExpression([this.set(e,a),n.cloneNode(s)]))}}else if(i.isAssignmentExpression({left:t})){if(this.simpleSet)return void e.replaceWith(this.simpleSet(e));const{operator:t,right:s}=r;if("="===t)i.replaceWith(this.set(e,s));else{const r=t.slice(0,-1);n.LOGICAL_OPERATORS.includes(r)?(this.memoise(e,1),i.replaceWith(n.logicalExpression(r,this.get(e),this.set(e,s)))):(this.memoise(e,2),i.replaceWith(this.set(e,n.binaryExpression(r,this.get(e),s))))}}else{if(!i.isCallExpression({callee:t}))return i.isOptionalCallExpression({callee:t})?o.path.isPattern()?void i.replaceWith(n.callExpression(n.arrowFunctionExpression([],i.node),[])):void i.replaceWith(this.optionalCall(e,r.arguments)):void(i.isForXStatement({left:t})||i.isObjectProperty({value:t})&&i.parentPath.isObjectPattern()||i.isAssignmentPattern({left:t})&&i.parentPath.isObjectProperty({value:r})&&i.parentPath.parentPath.isObjectPattern()||i.isArrayPattern()||i.isAssignmentPattern({left:t})&&i.parentPath.isArrayPattern()||i.isRestElement()?e.replaceWith(this.destructureSet(e)):e.replaceWith(this.get(e)));i.replaceWith(this.call(e,r.arguments))}}};t.default=function(e,t,r){e.traverse(t,Object.assign({},o,r,{memoiser:new i}))}},function(e,t,r){"use strict";Object.defineProperty(t,"__esModule",{value:!0}),t.default=function(e,t,r,i){return 1===r.length&&n.isSpreadElement(r[0])&&n.isIdentifier(r[0].argument,{name:"arguments"})?i?n.optionalCallExpression(n.optionalMemberExpression(e,n.identifier("apply"),!1,!0),[t,r[0].argument],!1):n.callExpression(n.memberExpression(e,n.identifier("apply")),[t,r[0].argument]):i?n.optionalCallExpression(n.optionalMemberExpression(e,n.identifier("call"),!1,!0),[t,...r],!1):n.callExpression(n.memberExpression(e,n.identifier("call")),[t,...r])};var n=function(e){if(e&&e.__esModule)return e;if(null===e||"object"!=typeof e&&"function"!=typeof e)return{default:e};var t=i();if(t&&t.has(e))return t.get(e);var r={},n=Object.defineProperty&&Object.getOwnPropertyDescriptor;for(var s in e)if(Object.prototype.hasOwnProperty.call(e,s)){var o=n?Object.getOwnPropertyDescriptor(e,s):null;o&&(o.get||o.set)?Object.defineProperty(r,s,o):r[s]=e[s]}r.default=e,t&&t.set(e,r);return r}(r(92));function i(){if("function"!=typeof WeakMap)return null;var e=new WeakMap;return i=function(){return e},e}},function(e,t,r){"use strict";Object.defineProperty(t,"__esModule",{value:!0}),t.default=function(e,t){const r=new Map,n=new Map,s=t=>{e.requeue(t)};for(const[i,o]of t.source){for(const[e,t]of o.imports)r.set(e,[i,t,null]);for(const e of o.importsNamespace)r.set(e,[i,null,e])}for(const[i,o]of t.local){let e=n.get(i);e||(e=[],n.set(i,e)),e.push(...o.names)}e.traverse(l,{metadata:t,requeueInParent:s,scope:e.scope,exported:n}),(0,o.default)(e,new Set([...Array.from(r.keys()),...Array.from(n.keys())])),e.traverse(f,{seen:new WeakSet,metadata:t,requeueInParent:s,scope:e.scope,imported:r,exported:n,buildImportReference:([e,r,n],s)=>{const o=t.source.get(e);if(n)return o.lazy&&(s=i.callExpression(s,[])),s;let a=i.identifier(o.name);o.lazy&&(a=i.callExpression(a,[]));const u=t.stringSpecifiers.has(r);return i.memberExpression(a,u?i.stringLiteral(r):i.identifier(r),u)}})};var n=u(r(110)),i=function(e){if(e&&e.__esModule)return e;if(null===e||"object"!=typeof e&&"function"!=typeof e)return{default:e};var t=a();if(t&&t.has(e))return t.get(e);var r={},n=Object.defineProperty&&Object.getOwnPropertyDescriptor;for(var i in e)if(Object.prototype.hasOwnProperty.call(e,i)){var s=n?Object.getOwnPropertyDescriptor(e,i):null;s&&(s.get||s.set)?Object.defineProperty(r,i,s):r[i]=e[i]}r.default=e,t&&t.set(e,r);return r}(r(92)),s=u(r(123)),o=u(r(713));function a(){if("function"!=typeof WeakMap)return null;var e=new WeakMap;return a=function(){return e},e}function u(e){return e&&e.__esModule?e:{default:e}}const l={Scope(e){e.skip()},ClassDeclaration(e){const{requeueInParent:t,exported:r,metadata:n}=this,{id:s}=e.node;if(!s)throw new Error("Expected class to have a name");const o=s.name,a=r.get(o)||[];if(a.length>0){const r=i.expressionStatement(c(n,a,i.identifier(o)));r._blockHoist=e.node._blockHoist,t(e.insertAfter(r)[0])}},VariableDeclaration(e){const{requeueInParent:t,exported:r,metadata:n}=this;Object.keys(e.getOuterBindingIdentifiers()).forEach(s=>{const o=r.get(s)||[];if(o.length>0){const r=i.expressionStatement(c(n,o,i.identifier(s)));r._blockHoist=e.node._blockHoist,t(e.insertAfter(r)[0])}})}},c=(e,t,r)=>(t||[]).reduce((t,r)=>{const{stringSpecifiers:n}=e,s=n.has(r);return i.assignmentExpression("=",i.memberExpression(i.identifier(e.exportName),s?i.stringLiteral(r):i.identifier(r),s),t)},r),p=e=>s.default.expression.ast`
    (function() {
      throw new Error('"' + '${e}' + '" is read-only.');
    })()
  `,f={ReferencedIdentifier(e){const{seen:t,buildImportReference:r,scope:n,imported:s,requeueInParent:o}=this;if(t.has(e.node))return;t.add(e.node);const a=e.node.name,u=s.get(a);if(u){const t=e.scope.getBinding(a);if(n.getBinding(a)!==t)return;const s=r(u,e.node);if(s.loc=e.node.loc,(e.parentPath.isCallExpression({callee:e.node})||e.parentPath.isOptionalCallExpression({callee:e.node})||e.parentPath.isTaggedTemplateExpression({tag:e.node}))&&i.isMemberExpression(s))e.replaceWith(i.sequenceExpression([i.numericLiteral(0),s]));else if(e.isJSXIdentifier()&&i.isMemberExpression(s)){const{object:t,property:r}=s;e.replaceWith(i.JSXMemberExpression(i.JSXIdentifier(t.name),i.JSXIdentifier(r.name)))}else e.replaceWith(s);o(e),e.skip()}},AssignmentExpression:{exit(e){const{scope:t,seen:r,imported:s,exported:o,requeueInParent:a,buildImportReference:u}=this;if(r.has(e.node))return;r.add(e.node);const l=e.get("left");if(!l.isMemberExpression())if(l.isIdentifier()){const r=l.node.name;if(t.getBinding(r)!==e.scope.getBinding(r))return;const f=o.get(r),d=s.get(r);if((null==f?void 0:f.length)>0||d){(0,n.default)("="===e.node.operator,"Path was not simplified");const t=e.node;d&&(t.left=u(d,t.left),t.right=i.sequenceExpression([t.right,p(r)])),e.replaceWith(c(this.metadata,f,t)),a(e)}}else{const r=l.getOuterBindingIdentifiers(),n=Object.keys(r).filter(r=>t.getBinding(r)===e.scope.getBinding(r)),u=n.find(e=>s.has(e));u&&(e.node.right=i.sequenceExpression([e.node.right,p(u)]));const f=[];if(n.forEach(e=>{const t=o.get(e)||[];t.length>0&&f.push(c(this.metadata,t,i.identifier(e)))}),f.length>0){let t=i.sequenceExpression(f);e.parentPath.isExpressionStatement()&&(t=i.expressionStatement(t),t._blockHoist=e.parentPath.node._blockHoist);a(e.insertAfter(t)[0])}}}},"ForOfStatement|ForInStatement"(e){const{scope:t,node:r}=e,{left:n}=r,{exported:s,scope:o}=this;if(!i.isVariableDeclaration(n)){let r=!1;const a=e.get("body"),u=a.scope;for(const e of Object.keys(i.getOuterBindingIdentifiers(n)))s.get(e)&&o.getBinding(e)===t.getBinding(e)&&(r=!0,u.hasOwnBinding(e)&&u.rename(e));if(!r)return;const l=t.generateUidIdentifierBasedOnNode(n);a.unshiftContainer("body",i.expressionStatement(i.assignmentExpression("=",n,l))),e.get("left").replaceWith(i.variableDeclaration("let",[i.variableDeclarator(i.cloneNode(l))])),t.registerDeclaration(e.get("left"))}}}},function(e,t,r){"use strict";Object.defineProperty(t,"__esModule",{value:!0}),t.default=function(e,t){e.traverse(s,{scope:e.scope,bindingNames:t,seen:new WeakSet})};var n=function(e){if(e&&e.__esModule)return e;if(null===e||"object"!=typeof e&&"function"!=typeof e)return{default:e};var t=i();if(t&&t.has(e))return t.get(e);var r={},n=Object.defineProperty&&Object.getOwnPropertyDescriptor;for(var s in e)if(Object.prototype.hasOwnProperty.call(e,s)){var o=n?Object.getOwnPropertyDescriptor(e,s):null;o&&(o.get||o.set)?Object.defineProperty(r,s,o):r[s]=e[s]}r.default=e,t&&t.set(e,r);return r}(r(92));function i(){if("function"!=typeof WeakMap)return null;var e=new WeakMap;return i=function(){return e},e}const s={UpdateExpression:{exit(e){const{scope:t,bindingNames:r}=this,i=e.get("argument");if(!i.isIdentifier())return;const s=i.node.name;if(r.has(s)&&t.getBinding(s)===e.scope.getBinding(s))if(e.parentPath.isExpressionStatement()&&!e.isCompletionRecord()){const t="++"==e.node.operator?"+=":"-=";e.replaceWith(n.assignmentExpression(t,i.node,n.numericLiteral(1)))}else if(e.node.prefix)e.replaceWith(n.assignmentExpression("=",n.identifier(s),n.binaryExpression(e.node.operator[0],n.unaryExpression("+",i.node),n.numericLiteral(1))));else{const t=e.scope.generateUidIdentifierBasedOnNode(i.node,"old"),r=t.name;e.scope.push({id:t});const s=n.binaryExpression(e.node.operator[0],n.identifier(r),n.numericLiteral(1));e.replaceWith(n.sequenceExpression([n.assignmentExpression("=",n.identifier(r),n.unaryExpression("+",i.node)),n.assignmentExpression("=",n.cloneNode(i.node),s),n.identifier(r)]))}}},AssignmentExpression:{exit(e){const{scope:t,seen:r,bindingNames:i}=this;if("="===e.node.operator)return;if(r.has(e.node))return;r.add(e.node);const s=e.get("left");if(!s.isIdentifier())return;const o=s.node.name;i.has(o)&&t.getBinding(o)===e.scope.getBinding(o)&&(e.node.right=n.binaryExpression(e.node.operator.slice(0,-1),n.cloneNode(e.node.left),e.node.right),e.node.operator="=")}}}},function(e,t,r){"use strict";Object.defineProperty(t,"__esModule",{value:!0}),t.hasExports=function(e){return e.hasExports},t.isSideEffectImport=a,t.default=function(e,t,{noInterop:r=!1,loose:n=!1,lazy:s=!1,esNamespaceOnly:l=!1}={}){t||(t=e.scope.generateUidIdentifier("exports").name);const c=new Set;!function(e){e.get("body").forEach(e=>{e.isExportDefaultDeclaration()&&(0,o.default)(e)})}(e);const{local:p,source:f,hasExports:d}=function(e,{loose:t,lazy:r},n){const s=function(e,t,r){const n=new Map;e.get("body").forEach(e=>{let r;if(e.isImportDeclaration())r="import";else{if(e.isExportDefaultDeclaration()&&(e=e.get("declaration")),e.isExportNamedDeclaration())if(e.node.declaration)e=e.get("declaration");else if(t&&e.node.source&&e.get("source").isStringLiteral())return void e.node.specifiers.forEach(e=>{n.set(e.local.name,"block")});if(e.isFunctionDeclaration())r="hoisted";else if(e.isClassDeclaration())r="block";else if(e.isVariableDeclaration({kind:"var"}))r="var";else{if(!e.isVariableDeclaration())return;r="block"}}Object.keys(e.getOuterBindingIdentifiers()).forEach(e=>{n.set(e,r)})});const i=new Map,s=e=>{const t=e.node.name;let r=i.get(t);if(!r){const s=n.get(t);if(void 0===s)throw e.buildCodeFrameError(`Exporting local "${t}", which is not declared.`);r={names:[],kind:s},i.set(t,r)}return r};return e.get("body").forEach(e=>{if(!e.isExportNamedDeclaration()||!t&&e.node.source){if(e.isExportDefaultDeclaration()){const t=e.get("declaration");if(!t.isFunctionDeclaration()&&!t.isClassDeclaration())throw t.buildCodeFrameError("Unexpected default expression export.");s(t.get("id")).names.push("default")}}else if(e.node.declaration){const t=e.get("declaration"),r=t.getOuterBindingIdentifierPaths();Object.keys(r).forEach(e=>{if("__esModule"===e)throw t.buildCodeFrameError('Illegal export "__esModule".');s(r[e]).names.push(e)})}else e.get("specifiers").forEach(e=>{const t=e.get("local"),n=e.get("exported"),i=s(t),o=u(n,r);if("__esModule"===o)throw n.buildCodeFrameError('Illegal export "__esModule".');i.names.push(o)})}),i}(e,t,n),o=new Map,l=t=>{const r=t.value;let n=o.get(r);return n||(n={name:e.scope.generateUidIdentifier((0,i.basename)(r,(0,i.extname)(r))).name,interop:"none",loc:null,imports:new Map,importsNamespace:new Set,reexports:new Map,reexportNamespace:new Set,reexportAll:null,lazy:!1},o.set(r,n)),n};let c=!1;e.get("body").forEach(e=>{if(e.isImportDeclaration()){const t=l(e.node.source);t.loc||(t.loc=e.node.loc),e.get("specifiers").forEach(e=>{if(e.isImportDefaultSpecifier()){const r=e.get("local").node.name;t.imports.set(r,"default");const n=s.get(r);n&&(s.delete(r),n.names.forEach(e=>{t.reexports.set(e,"default")}))}else if(e.isImportNamespaceSpecifier()){const r=e.get("local").node.name;t.importsNamespace.add(r);const n=s.get(r);n&&(s.delete(r),n.names.forEach(e=>{t.reexportNamespace.add(e)}))}else if(e.isImportSpecifier()){const r=u(e.get("imported"),n),i=e.get("local").node.name;t.imports.set(i,r);const o=s.get(i);o&&(s.delete(i),o.names.forEach(e=>{t.reexports.set(e,r)}))}})}else if(e.isExportAllDeclaration()){c=!0;const t=l(e.node.source);t.loc||(t.loc=e.node.loc),t.reexportAll={loc:e.node.loc}}else if(e.isExportNamedDeclaration()&&e.node.source){c=!0;const t=l(e.node.source);t.loc||(t.loc=e.node.loc),e.get("specifiers").forEach(e=>{if(!e.isExportSpecifier())throw e.buildCodeFrameError("Unexpected export specifier type");const r=u(e.get("local"),n),i=u(e.get("exported"),n);if(t.reexports.set(i,r),"__esModule"===i)throw i.buildCodeFrameError('Illegal export "__esModule".')})}else(e.isExportNamedDeclaration()||e.isExportDefaultDeclaration())&&(c=!0)});for(const i of o.values()){let e=!1,t=!1;i.importsNamespace.size>0&&(e=!0,t=!0),i.reexportAll&&(t=!0);for(const r of i.imports.values())"default"===r?e=!0:t=!0;for(const r of i.reexports.values())"default"===r?e=!0:t=!0;e&&t?i.interop="namespace":e&&(i.interop="default")}for(const[i,u]of o)if(!1!==r&&!a(u)&&!u.reexportAll)if(!0===r)u.lazy=!/\./.test(i);else if(Array.isArray(r))u.lazy=-1!==r.indexOf(i);else{if("function"!=typeof r)throw new Error(".lazy must be a boolean, string array, or function");u.lazy=r(i)}return{hasExports:c,local:s,source:o}}(e,{loose:n,lazy:s},c);!function(e){e.get("body").forEach(e=>{if(e.isImportDeclaration())e.remove();else if(e.isExportNamedDeclaration())e.node.declaration?(e.node.declaration._blockHoist=e.node._blockHoist,e.replaceWith(e.node.declaration)):e.remove();else if(e.isExportDefaultDeclaration()){const t=e.get("declaration");if(!t.isFunctionDeclaration()&&!t.isClassDeclaration())throw t.buildCodeFrameError("Unexpected default expression export.");t._blockHoist=e.node._blockHoist,e.replaceWith(t)}else e.isExportAllDeclaration()&&e.remove()})}(e);for(const[,i]of f)i.importsNamespace.size>0&&(i.name=i.importsNamespace.values().next().value),r?i.interop="none":l&&"namespace"===i.interop&&(i.interop="default");return{exportName:t,exportNameListName:null,hasExports:d,local:p,source:f,stringSpecifiers:c}};var n,i=r(106),s=r(141),o=(n=r(302))&&n.__esModule?n:{default:n};function a(e){return 0===e.imports.size&&0===e.importsNamespace.size&&0===e.reexports.size&&0===e.reexportNamespace.size&&!e.reexportAll}function u(e,t){if(e.isIdentifier())return e.node.name;if(e.isStringLiteral()){const r=e.node.value;return(0,s.isIdentifierName)(r)||t.add(r),r}throw new Error("Expected export specifier to be either Identifier or StringLiteral, got "+e.node.type)}},function(e,t,r){"use strict";Object.defineProperty(t,"__esModule",{value:!0}),t.default=function(e,t){var r,n,i;const{filename:s,filenameRelative:o=s,sourceRoot:a=(null!=(r=t.moduleRoot)?r:e.moduleRoot)}=e,{moduleId:u=e.moduleId,moduleIds:l=(null!=(n=e.moduleIds)?n:!!u),getModuleId:c=e.getModuleId,moduleRoot:p=(null!=(i=e.moduleRoot)?i:a)}=t;if(!l)return null;if(null!=u&&!c)return u;let f=null!=p?p+"/":"";if(o){const e=null!=a?new RegExp("^"+a+"/?"):"";f+=o.replace(e,"").replace(/\.(\w*?)$/,"")}return f=f.replace(/\\/g,"/"),c&&c(f)||f}},function(e,t,r){"use strict";function n(){const e=c(r(310));return n=function(){return e},e}function i(){const e=u(r(170));return i=function(){return e},e}function s(){const e=u(r(123));return s=function(){return e},e}function o(){const e=c(r(92));return o=function(){return e},e}Object.defineProperty(t,"__esModule",{value:!0}),t.default=function(e,t="global"){let r;const n={global:p,module:f,umd:d,var:h}[t];if(!n)throw new Error("Unsupported output type "+t);r=n(e);return(0,i().default)(r).code};var a=u(r(213));function u(e){return e&&e.__esModule?e:{default:e}}function l(){if("function"!=typeof WeakMap)return null;var e=new WeakMap;return l=function(){return e},e}function c(e){if(e&&e.__esModule)return e;if(null===e||"object"!=typeof e&&"function"!=typeof e)return{default:e};var t=l();if(t&&t.has(e))return t.get(e);var r={},n=Object.defineProperty&&Object.getOwnPropertyDescriptor;for(var i in e)if(Object.prototype.hasOwnProperty.call(e,i)){var s=n?Object.getOwnPropertyDescriptor(e,i):null;s&&(s.get||s.set)?Object.defineProperty(r,i,s):r[i]=e[i]}return r.default=e,t&&t.set(e,r),r}function p(e){const t=o().identifier("babelHelpers"),r=[],n=o().functionExpression(null,[o().identifier("global")],o().blockStatement(r)),i=o().program([o().expressionStatement(o().callExpression(n,[o().conditionalExpression(o().binaryExpression("===",o().unaryExpression("typeof",o().identifier("global")),o().stringLiteral("undefined")),o().identifier("self"),o().identifier("global"))]))]);return r.push(o().variableDeclaration("var",[o().variableDeclarator(t,o().assignmentExpression("=",o().memberExpression(o().identifier("global"),t),o().objectExpression([])))])),m(r,t,e),i}function f(e){const t=[],r=m(t,null,e);return t.unshift(o().exportNamedDeclaration(null,Object.keys(r).map(e=>o().exportSpecifier(o().cloneNode(r[e]),o().identifier(e))))),o().program(t,[],"module")}function d(e){const t=o().identifier("babelHelpers"),r=[];return r.push(o().variableDeclaration("var",[o().variableDeclarator(t,o().identifier("global"))])),m(r,t,e),o().program([(n={FACTORY_PARAMETERS:o().identifier("global"),BROWSER_ARGUMENTS:o().assignmentExpression("=",o().memberExpression(o().identifier("root"),t),o().objectExpression([])),COMMON_ARGUMENTS:o().identifier("exports"),AMD_ARGUMENTS:o().arrayExpression([o().stringLiteral("exports")]),FACTORY_BODY:r,UMD_ROOT:o().identifier("this")},s().default`
    (function (root, factory) {
      if (typeof define === "function" && define.amd) {
        define(AMD_ARGUMENTS, factory);
      } else if (typeof exports === "object") {
        factory(COMMON_ARGUMENTS);
      } else {
        factory(BROWSER_ARGUMENTS);
      }
    })(UMD_ROOT, function (FACTORY_PARAMETERS) {
      FACTORY_BODY
    });
  `(n))]);var n}function h(e){const t=o().identifier("babelHelpers"),r=[];r.push(o().variableDeclaration("var",[o().variableDeclarator(t,o().objectExpression([]))]));const n=o().program(r);return m(r,t,e),r.push(o().expressionStatement(t)),n}function m(e,t,r){const i=e=>t?o().memberExpression(t,o().identifier(e)):o().identifier("_"+e),s={};return n().list.forEach((function(t){if(r&&r.indexOf(t)<0)return;const o=s[t]=i(t);n().ensure(t,a.default);const{nodes:u}=n().get(t,i,o);e.push(...u)})),s}},function(e,t,r){"use strict";function n(){const e=g(r(121));return n=function(){return e},e}Object.defineProperty(t,"__esModule",{value:!0}),t.default=void 0;var i=r(316),s=r(214),o=function(e){if(e&&e.__esModule)return e;if(null===e||"object"!=typeof e&&"function"!=typeof e)return{default:e};var t=y();if(t&&t.has(e))return t.get(e);var r={},n=Object.defineProperty&&Object.getOwnPropertyDescriptor;for(var i in e)if(Object.prototype.hasOwnProperty.call(e,i)){var s=n?Object.getOwnPropertyDescriptor(e,i):null;s&&(s.get||s.set)?Object.defineProperty(r,i,s):r[i]=e[i]}r.default=e,t&&t.set(e,r);return r}(r(134)),a=g(r(215)),u=r(172),l=r(317);function c(){const e=g(r(103));return c=function(){return e},e}var p=r(173),f=r(216),d=r(724),h=g(r(725)),m=g(r(321));function y(){if("function"!=typeof WeakMap)return null;var e=new WeakMap;return y=function(){return e},e}function g(e){return e&&e.__esModule?e:{default:e}}var b=(0,n().default)((function*(e){const t=yield*(0,m.default)(e);if(!t)return null;const{options:r,context:n,fileHandling:i}=t;if("ignored"===i)return null;const o={},{plugins:a,presets:l}=r;if(!a||!l)throw new Error("Assertion failure - plugins and presets exist");const c=e=>{const t=(0,u.getItemDescriptor)(e);if(!t)throw new Error("Assertion failure - must be config item");return t},p=l.map(c),d=a.map(c),h=[[]],y=[];if(yield*v(n,(function*e(t,r){const i=[];for(let s=0;s<t.length;s++){const e=t[s];if(!1!==e.options)try{e.ownPass?i.push({preset:yield*A(e,n),pass:[]}):i.unshift({preset:yield*A(e,n),pass:r})}catch(a){throw"BABEL_UNKNOWN_OPTION"===a.code&&(0,f.checkNoUnwrappedItemOptionPairs)(t,s,"preset",a),a}}if(i.length>0){h.splice(1,0,...i.map(e=>e.pass).filter(e=>e!==r));for(const{preset:t,pass:r}of i){if(!t)return!0;r.push(...t.plugins);if(yield*e(t.presets,r))return!0;t.options.forEach(e=>{(0,s.mergeOptions)(o,e)})}}}))(p,h[0]))return null;const g=o;return(0,s.mergeOptions)(g,r),yield*v(n,(function*(){h[0].unshift(...d);for(const t of h){const r=[];y.push(r);for(let i=0;i<t.length;i++){const s=t[i];if(!1!==s.options)try{r.push(yield*x(s,n))}catch(e){throw"BABEL_UNKNOWN_PLUGIN_PROPERTY"===e.code&&(0,f.checkNoUnwrappedItemOptionPairs)(t,i,"plugin",e),e}}}}))(),g.plugins=y[0],g.presets=y.slice(1).filter(e=>e.length>0).map(e=>({plugins:e})),g.passPerPreset=g.presets.length>0,{options:g,passes:y}}));function v(e,t){return function*(r,n){try{return yield*t(r,n)}catch(i){throw/^\[BABEL\]/.test(i.message)||(i.message=`[BABEL] ${e.filename||"unknown"}: ${i.message}`),i}}}t.default=b;const E=(0,p.makeWeakCache)((function*({value:e,options:t,dirname:r,alias:n},i){if(!1===t)throw new Error("Assertion failure");t=t||{};let s=e;if("function"==typeof e){const u=Object.assign({},o,(0,h.default)(i));try{s=e(u,t,r)}catch(a){throw n&&(a.message+=` (While processing: ${JSON.stringify(n)})`),a}}if(!s||"object"!=typeof s)throw new Error("Plugin/Preset did not return an object.");if("function"==typeof s.then)throw yield*[],new Error("You appear to be using an async plugin, which your current version of Babel does not support. If you're using a published plugin, you may need to upgrade your @babel/core version.");return{value:s,options:t,dirname:r,alias:n}}));function*x(e,t){if(e.value instanceof a.default){if(e.options)throw new Error("Passed options to an existing Plugin instance will not work.");return e.value}return yield*S(yield*E(e,t),t)}const S=(0,p.makeWeakCache)((function*({value:e,options:t,dirname:r,alias:n},s){const o=(0,d.validatePluginObject)(e),u=Object.assign({},o);if(u.visitor&&(u.visitor=c().default.explode(Object.assign({},u.visitor))),u.inherits){const e={name:void 0,alias:n+"$inherits",value:u.inherits,options:t,dirname:r},o=yield*(0,i.forwardAsync)(x,t=>s.invalidate(r=>t(e,r)));u.pre=P(o.pre,u.pre),u.post=P(o.post,u.post),u.manipulateOptions=P(o.manipulateOptions,u.manipulateOptions),u.visitor=c().default.visitors.merge([o.visitor||{},u.visitor||{}])}return new a.default(u,t,n)})),T=(e,t)=>{if(e.test||e.include||e.exclude){const e=t.name?`"${t.name}"`:"/* your preset */";throw new Error([`Preset ${e} requires a filename to be set when babel is called directly,`,"```",`babel.transform(code, { filename: 'file.ts', presets: [${e}] });`,"```","See https://babeljs.io/docs/en/options#filename for more information."].join("\n"))}};function*A(e,t){const r=D(yield*E(e,t));return((e,t,r)=>{if(!t.filename){const{options:t}=e;T(t,r),t.overrides&&t.overrides.forEach(e=>T(e,r))}})(r,t,e),yield*(0,l.buildPresetChain)(r,t)}const D=(0,p.makeWeakCacheSync)(({value:e,dirname:t,alias:r})=>({options:(0,f.validate)("preset",e),alias:r,dirname:t}));function P(e,t){const r=[e,t].filter(Boolean);return r.length<=1?r[0]:function(...e){for(const t of r)t.apply(this,e)}}},function(e,t,r){"use strict";Object.defineProperty(t,"__esModule",{value:!0}),t.default=void 0;t.default={auxiliaryComment:{message:"Use `auxiliaryCommentBefore` or `auxiliaryCommentAfter`"},blacklist:{message:"Put the specific transforms you want in the `plugins` option"},breakConfig:{message:"This is not a necessary option in Babel 6"},experimental:{message:"Put the specific transforms you want in the `plugins` option"},externalHelpers:{message:"Use the `external-helpers` plugin instead. Check out http://babeljs.io/docs/plugins/external-helpers/"},extra:{message:""},jsxPragma:{message:"use the `pragma` option in the `react-jsx` plugin. Check out http://babeljs.io/docs/plugins/transform-react-jsx/"},loose:{message:"Specify the `loose` option for the relevant plugin you are using or use a preset that sets the option."},metadataUsedHelpers:{message:"Not required anymore as this is enabled by default"},modules:{message:"Use the corresponding module transform plugin in the `plugins` option. Check out http://babeljs.io/docs/plugins/#modules"},nonStandard:{message:"Use the `react-jsx` and `flow-strip-types` plugins to support JSX and Flow. Also check out the react preset http://babeljs.io/docs/plugins/preset-react/"},optional:{message:"Put the specific transforms you want in the `plugins` option"},sourceMapName:{message:"The `sourceMapName` option has been removed because it makes more sense for the tooling that calls Babel to assign `map.file` themselves."},stage:{message:"Check out the corresponding stage-x presets http://babeljs.io/docs/plugins/#presets"},whitelist:{message:"Put the specific transforms you want in the `plugins` option"},resolveModuleSource:{version:6,message:"Use `babel-plugin-module-resolver@3`'s 'resolvePath' options"},metadata:{version:6,message:"Generated plugin metadata is always included in the output result"},sourceMapTarget:{version:6,message:"The `sourceMapTarget` option has been removed because it makes more sense for the tooling that calls Babel to assign `map.file` themselves."}}},function(e,t,r){"use strict";function n(){const e=s(r(106));return n=function(){return e},e}Object.defineProperty(t,"__esModule",{value:!0}),t.default=function(e,t){const r=n().default.resolve(t,e).split(n().default.sep);return new RegExp(["^",...r.map((e,t)=>{const n=t===r.length-1;return"**"===e?n?f:p:"*"===e?n?c:l:0===e.indexOf("*.")?u+(0,i.default)(e.slice(1))+(n?a:o):(0,i.default)(e)+(n?a:o)})].join(""))};var i=s(r(720));function s(e){return e&&e.__esModule?e:{default:e}}const o="\\"+n().default.sep,a=`(?:${o}|$)`,u=`[^${o}]+`,l=`(?:${u}${o})`,c=`(?:${u}${a})`,p=l+"*?",f=`${l}*?${c}?`},function(e,t,r){"use strict";e.exports=r(721)},function(e,t,r){var n=r(319),i=/[\\^$.*+?()[\]{}|]/g,s=RegExp(i.source);e.exports=function(e){return(e=n(e))&&s.test(e)?e.replace(i,"\\$&"):e}},function(e,t,r){var n=r(130),i=r(320),s=r(105),o=r(139),a=n?n.prototype:void 0,u=a?a.toString:void 0;e.exports=function e(t){if("string"==typeof t)return t;if(s(t))return i(t,e)+"";if(o(t))return u?u.call(t):"";var r=t+"";return"0"==r&&1/t==-1/0?"-0":r}},function(e,t,r){"use strict";Object.defineProperty(t,"__esModule",{value:!0}),t.ConfigPrinter=t.ChainFormatter=void 0;const n={Programmatic:0,Config:1};t.ChainFormatter=n;const i={title(e,t,r){let i="";return e===n.Programmatic?(i="programmatic options",t&&(i+=" from "+t)):i="config "+r,i},loc(e,t){let r="";return null!=e&&(r+=`.overrides[${e}]`),null!=t&&(r+=`.env["${t}"]`),r},optionsAndDescriptors(e){const t=Object.assign({},e.options);delete t.overrides,delete t.env;const r=[...e.plugins()];r.length&&(t.plugins=r.map(e=>s(e)));const n=[...e.presets()];return n.length&&(t.presets=[...n].map(e=>s(e))),JSON.stringify(t,void 0,2)}};function s(e){var t;let r=null==(t=e.file)?void 0:t.request;return null==r&&("object"==typeof e.value?r=e.value:"function"==typeof e.value&&(r=`[Function: ${e.value.toString().substr(0,50)} ... ]`)),null==r&&(r="[Unknown]"),void 0===e.options?r:null==e.name?[r,e.options]:[r,e.options,e.name]}class o{constructor(){this._stack=[]}configure(e,t,{callerName:r,filepath:n}){return e?(e,i,s)=>{this._stack.push({type:t,callerName:r,filepath:n,content:e,index:i,envName:s})}:()=>{}}static format(e){let t=i.title(e.type,e.callerName,e.filepath);const r=i.loc(e.index,e.envName);r&&(t+=" "+r);return`${t}\n${i.optionsAndDescriptors(e.content)}`}output(){return 0===this._stack.length?"":this._stack.map(e=>o.format(e)).join("\n\n")}}t.ConfigPrinter=o},function(e,t,r){"use strict";Object.defineProperty(t,"__esModule",{value:!0}),t.validatePluginObject=function(e){const t={type:"root",source:"plugin"};return Object.keys(e).forEach(r=>{const n=i[r];if(!n){const e=new Error(`.${r} is not a valid Plugin property`);throw e.code="BABEL_UNKNOWN_PLUGIN_PROPERTY",e}n({type:"option",name:r,parent:t},e[r])}),e};var n=r(318);const i={name:n.assertString,manipulateOptions:n.assertFunction,pre:n.assertFunction,post:n.assertFunction,inherits:n.assertFunction,visitor:function(e,t){const r=(0,n.assertObject)(e,t);if(r&&(Object.keys(r).forEach(e=>function(e,t){if(t&&"object"==typeof t)Object.keys(t).forEach(t=>{if("enter"!==t&&"exit"!==t)throw new Error(`.visitor["${e}"] may only have .enter and/or .exit handlers.`)});else if("function"!=typeof t)throw new Error(`.visitor["${e}"] must be a function`);return t}(e,r[e])),r.enter||r.exit))throw new Error((0,n.msg)(e)+' cannot contain catch-all "enter" or "exit" handlers. Please target individual nodes.');return r},parserOverride:n.assertFunction,generatorOverride:n.assertFunction}},function(e,t,r){"use strict";function n(){const e=(t=r(207))&&t.__esModule?t:{default:t};var t;return n=function(){return e},e}Object.defineProperty(t,"__esModule",{value:!0}),t.default=function(e){return{version:i.version,cache:e.simple(),env:t=>e.using(e=>void 0===t?e.envName:"function"==typeof t?(0,s.assertSimpleType)(t(e.envName)):(Array.isArray(t)||(t=[t]),t.some(t=>{if("string"!=typeof t)throw new Error("Unexpected non-string value");return t===e.envName}))),async:()=>!1,caller:t=>e.using(e=>(0,s.assertSimpleType)(t(e.caller))),assertVersion:o}};var i=r(134),s=r(173);function o(e){if("number"==typeof e){if(!Number.isInteger(e))throw new Error("Expected string or integer value.");e=`^${e}.0.0-0`}if("string"!=typeof e)throw new Error("Expected string or integer value.");if(n().default.satisfies(i.version,e))return;const t=Error.stackTraceLimit;"number"==typeof t&&t<25&&(Error.stackTraceLimit=25);const r=new Error(`Requires Babel "${e}", but was loaded with "${i.version}". If you are sure you have a compatible version of @babel/core, it is likely that something in your build process is loading the wrong version. Inspect the stack trace of this error to look for the first entry that doesn't mention "@babel/core" or "babel-core" to see what is calling Babel.`);throw"number"==typeof t&&(Error.stackTraceLimit=t),Object.assign(r,{code:"BABEL_VERSION_UNSUPPORTED",version:i.version,range:e})}},function(e,t,r){"use strict";function n(){const e=o(r(121));return n=function(){return e},e}Object.defineProperty(t,"__esModule",{value:!0}),t.transformAsync=t.transformSync=t.transform=void 0;var i=o(r(149)),s=r(322);function o(e){return e&&e.__esModule?e:{default:e}}const a=(0,n().default)((function*(e,t){const r=yield*(0,i.default)(t);return null===r?null:yield*(0,s.run)(r,e)}));t.transform=function(e,t,r){if("function"==typeof t&&(r=t,t=void 0),void 0===r)return a.sync(e,t);a.errback(e,t,r)};const u=a.sync;t.transformSync=u;const l=a.async;t.transformAsync=l},function(e,t,r){"use strict";Object.defineProperty(t,"__esModule",{value:!0}),t.default=void 0;t.default=class{constructor(e,t,r){this._map=new Map,this.key=void 0,this.file=void 0,this.opts=void 0,this.cwd=void 0,this.filename=void 0,this.key=t,this.file=e,this.opts=r||{},this.cwd=e.opts.cwd,this.filename=e.opts.filename}set(e,t){this._map.set(e,t)}get(e){return this._map.get(e)}availableHelper(e,t){return this.file.availableHelper(e,t)}addHelper(e){return this.file.addHelper(e)}addImport(){return this.file.addImport()}getModuleName(){return this.file.getModuleName()}buildCodeFrameError(e,t,r){return this.file.buildCodeFrameError(e,t,r)}}},function(e,t,r){"use strict";function n(){const e=s(r(729));return n=function(){return e},e}Object.defineProperty(t,"__esModule",{value:!0}),t.default=function(){if(!o){const e=i.default.sync({babelrc:!1,configFile:!1,plugins:[a]});if(o=e?e.passes[0][0]:void 0,!o)throw new Error("Assertion failure")}return o};var i=s(r(149));function s(e){return e&&e.__esModule?e:{default:e}}let o;const a={name:"internal.blockHoist",visitor:{Block:{exit({node:e}){let t=!1;for(let r=0;r<e.body.length;r++){const n=e.body[r];if(null!=(null==n?void 0:n._blockHoist)){t=!0;break}}t&&(e.body=(0,n().default)(e.body,(function(e){let t=null==e?void 0:e._blockHoist;return null==t&&(t=1),!0===t&&(t=2),-1*t})))}}}}},function(e,t,r){var n=r(730),i=r(732),s=r(767),o=r(311),a=s((function(e,t){if(null==e)return[];var r=t.length;return r>1&&o(e,t[0],t[1])?t=[]:r>2&&o(t[0],t[1],t[2])&&(t=[t[0]]),i(e,n(t,1),[])}));e.exports=a},function(e,t,r){var n=r(199),i=r(731);e.exports=function e(t,r,s,o,a){var u=-1,l=t.length;for(s||(s=i),a||(a=[]);++u<l;){var c=t[u];r>0&&s(c)?r>1?e(c,r-1,s,o,a):n(a,c):o||(a[a.length]=c)}return a}},function(e,t,r){var n=r(130),i=r(192),s=r(105),o=n?n.isConcatSpreadable:void 0;e.exports=function(e){return s(e)||i(e)||!!(o&&e&&e[o])}},function(e,t,r){var n=r(320),i=r(217),s=r(736),o=r(758),a=r(764),u=r(144),l=r(765),c=r(175),p=r(105);e.exports=function(e,t,r){t=t.length?n(t,(function(e){return p(e)?function(t){return i(t,1===e.length?e[0]:e)}:e})):[c];var f=-1;t=n(t,u(s));var d=o(e,(function(e,r,i){return{criteria:n(t,(function(t){return t(e)})),index:++f,value:e}}));return a(d,(function(e,t){return l(e,t,r)}))}},function(e,t,r){var n=r(734),i=/[^.[\]]+|\[(?:(-?\d+(?:\.\d+)?)|(["'])((?:(?!\2)[^\\]|\\.)*?)\2)\]|(?=(?:\.|\[\])(?:\.|\[\]|$))/g,s=/\\(\\)?/g,o=n((function(e){var t=[];return 46===e.charCodeAt(0)&&t.push(""),e.replace(i,(function(e,r,n,i){t.push(n?i.replace(s,"$1"):r||e)})),t}));e.exports=o},function(e,t,r){var n=r(735);e.exports=function(e){var t=n(e,(function(e){return 500===r.size&&r.clear(),e})),r=t.cache;return t}},function(e,t,r){var n=r(191);function i(e,t){if("function"!=typeof e||null!=t&&"function"!=typeof t)throw new TypeError("Expected a function");var r=function(){var n=arguments,i=t?t.apply(this,n):n[0],s=r.cache;if(s.has(i))return s.get(i);var o=e.apply(this,n);return r.cache=s.set(i,o)||s,o};return r.cache=new(i.Cache||n),r}i.Cache=n,e.exports=i},function(e,t,r){var n=r(737),i=r(750),s=r(175),o=r(105),a=r(755);e.exports=function(e){return"function"==typeof e?e:null==e?s:"object"==typeof e?o(e)?i(e[0],e[1]):n(e):a(e)}},function(e,t,r){var n=r(738),i=r(749),s=r(327);e.exports=function(e){var t=i(e);return 1==t.length&&t[0][2]?s(t[0][0],t[0][1]):function(r){return r===e||n(r,e,t)}}},function(e,t,r){var n=r(189),i=r(324);e.exports=function(e,t,r,s){var o=r.length,a=o,u=!s;if(null==e)return!a;for(e=Object(e);o--;){var l=r[o];if(u&&l[2]?l[1]!==e[l[0]]:!(l[0]in e))return!1}for(;++o<a;){var c=(l=r[o])[0],p=e[c],f=l[1];if(u&&l[2]){if(void 0===p&&!(c in e))return!1}else{var d=new n;if(s)var h=s(p,f,c,e,t,d);if(!(void 0===h?i(f,p,3,s,d):h))return!1}}return!0}},function(e,t,r){var n=r(189),i=r(325),s=r(745),o=r(748),a=r(166),u=r(105),l=r(193),c=r(257),p="[object Object]",f=Object.prototype.hasOwnProperty;e.exports=function(e,t,r,d,h,m){var y=u(e),g=u(t),b=y?"[object Array]":a(e),v=g?"[object Array]":a(t),E=(b="[object Arguments]"==b?p:b)==p,x=(v="[object Arguments]"==v?p:v)==p,S=b==v;if(S&&l(e)){if(!l(t))return!1;y=!0,E=!1}if(S&&!E)return m||(m=new n),y||c(e)?i(e,t,r,d,h,m):s(e,t,b,r,d,h,m);if(!(1&r)){var T=E&&f.call(e,"__wrapped__"),A=x&&f.call(t,"__wrapped__");if(T||A){var D=T?e.value():e,P=A?t.value():t;return m||(m=new n),h(D,P,r,d,m)}}return!!S&&(m||(m=new n),o(e,t,r,d,h,m))}},function(e,t,r){var n=r(191),i=r(741),s=r(742);function o(e){var t=-1,r=null==e?0:e.length;for(this.__data__=new n;++t<r;)this.add(e[t])}o.prototype.add=o.prototype.push=i,o.prototype.has=s,e.exports=o},function(e,t){e.exports=function(e){return this.__data__.set(e,"__lodash_hash_undefined__"),this}},function(e,t){e.exports=function(e){return this.__data__.has(e)}},function(e,t){e.exports=function(e,t){for(var r=-1,n=null==e?0:e.length;++r<n;)if(t(e[r],r,e))return!0;return!1}},function(e,t){e.exports=function(e,t){return e.has(t)}},function(e,t,r){var n=r(130),i=r(263),s=r(161),o=r(325),a=r(746),u=r(747),l=n?n.prototype:void 0,c=l?l.valueOf:void 0;e.exports=function(e,t,r,n,l,p,f){switch(r){case"[object DataView]":if(e.byteLength!=t.byteLength||e.byteOffset!=t.byteOffset)return!1;e=e.buffer,t=t.buffer;case"[object ArrayBuffer]":return!(e.byteLength!=t.byteLength||!p(new i(e),new i(t)));case"[object Boolean]":case"[object Date]":case"[object Number]":return s(+e,+t);case"[object Error]":return e.name==t.name&&e.message==t.message;case"[object RegExp]":case"[object String]":return e==t+"";case"[object Map]":var d=a;case"[object Set]":var h=1&n;if(d||(d=u),e.size!=t.size&&!h)return!1;var m=f.get(e);if(m)return m==t;n|=2,f.set(e,t);var y=o(d(e),d(t),n,l,p,f);return f.delete(e),y;case"[object Symbol]":if(c)return c.call(e)==c.call(t)}return!1}},function(e,t){e.exports=function(e){var t=-1,r=Array(e.size);return e.forEach((function(e,n){r[++t]=[n,e]})),r}},function(e,t){e.exports=function(e){var t=-1,r=Array(e.size);return e.forEach((function(e){r[++t]=e})),r}},function(e,t,r){var n=r(261),i=Object.prototype.hasOwnProperty;e.exports=function(e,t,r,s,o,a){var u=1&r,l=n(e),c=l.length;if(c!=n(t).length&&!u)return!1;for(var p=c;p--;){var f=l[p];if(!(u?f in t:i.call(t,f)))return!1}var d=a.get(e),h=a.get(t);if(d&&h)return d==t&&h==e;var m=!0;a.set(e,t),a.set(t,e);for(var y=u;++p<c;){var g=e[f=l[p]],b=t[f];if(s)var v=u?s(b,g,f,t,e,a):s(g,b,f,e,t,a);if(!(void 0===v?g===b||o(g,b,r,s,a):v)){m=!1;break}y||(y="constructor"==f)}if(m&&!y){var E=e.constructor,x=t.constructor;E==x||!("constructor"in e)||!("constructor"in t)||"function"==typeof E&&E instanceof E&&"function"==typeof x&&x instanceof x||(m=!1)}return a.delete(e),a.delete(t),m}},function(e,t,r){var n=r(326),i=r(143);e.exports=function(e){for(var t=i(e),r=t.length;r--;){var s=t[r],o=e[s];t[r]=[s,o,n(o)]}return t}},function(e,t,r){var n=r(324),i=r(751),s=r(752),o=r(218),a=r(326),u=r(327),l=r(174);e.exports=function(e,t){return o(e)&&a(t)?u(l(e),t):function(r){var o=i(r,e);return void 0===o&&o===t?s(r,e):n(t,o,3)}}},function(e,t,r){var n=r(217);e.exports=function(e,t,r){var i=null==e?void 0:n(e,t);return void 0===i?r:i}},function(e,t,r){var n=r(753),i=r(754);e.exports=function(e,t){return null!=e&&i(e,t,n)}},function(e,t){e.exports=function(e,t){return null!=e&&t in Object(e)}},function(e,t,r){var n=r(323),i=r(192),s=r(105),o=r(194),a=r(195),u=r(174);e.exports=function(e,t,r){for(var l=-1,c=(t=n(t,e)).length,p=!1;++l<c;){var f=u(t[l]);if(!(p=null!=e&&r(e,f)))break;e=e[f]}return p||++l!=c?p:!!(c=null==e?0:e.length)&&a(c)&&o(f,c)&&(s(e)||i(e))}},function(e,t,r){var n=r(756),i=r(757),s=r(218),o=r(174);e.exports=function(e){return s(e)?n(o(e)):i(e)}},function(e,t){e.exports=function(e){return function(t){return null==t?void 0:t[e]}}},function(e,t,r){var n=r(217);e.exports=function(e){return function(t){return n(t,e)}}},function(e,t,r){var n=r(759),i=r(145);e.exports=function(e,t){var r=-1,s=i(e)?Array(e.length):[];return n(e,(function(e,n,i){s[++r]=t(e,n,i)})),s}},function(e,t,r){var n=r(760),i=r(763)(n);e.exports=i},function(e,t,r){var n=r(761),i=r(143);e.exports=function(e,t){return e&&n(e,t,i)}},function(e,t,r){var n=r(762)();e.exports=n},function(e,t){e.exports=function(e){return function(t,r,n){for(var i=-1,s=Object(t),o=n(t),a=o.length;a--;){var u=o[e?a:++i];if(!1===r(s[u],u,s))break}return t}}},function(e,t,r){var n=r(145);e.exports=function(e,t){return function(r,i){if(null==r)return r;if(!n(r))return e(r,i);for(var s=r.length,o=t?s:-1,a=Object(r);(t?o--:++o<s)&&!1!==i(a[o],o,a););return r}}},function(e,t){e.exports=function(e,t){var r=e.length;for(e.sort(t);r--;)e[r]=e[r].value;return e}},function(e,t,r){var n=r(766);e.exports=function(e,t,r){for(var i=-1,s=e.criteria,o=t.criteria,a=s.length,u=r.length;++i<a;){var l=n(s[i],o[i]);if(l)return i>=u?l:l*("desc"==r[i]?-1:1)}return e.index-t.index}},function(e,t,r){var n=r(139);e.exports=function(e,t){if(e!==t){var r=void 0!==e,i=null===e,s=e==e,o=n(e),a=void 0!==t,u=null===t,l=t==t,c=n(t);if(!u&&!c&&!o&&e>t||o&&a&&l&&!u&&!c||i&&a&&l||!r&&l||!s)return 1;if(!i&&!o&&!c&&e<t||c&&r&&s&&!i&&!o||u&&r&&s||!a&&s||!l)return-1}return 0}},function(e,t,r){var n=r(175),i=r(768),s=r(770);e.exports=function(e,t){return s(i(e,t,n),e+"")}},function(e,t,r){var n=r(769),i=Math.max;e.exports=function(e,t,r){return t=i(void 0===t?e.length-1:t,0),function(){for(var s=arguments,o=-1,a=i(s.length-t,0),u=Array(a);++o<a;)u[o]=s[t+o];o=-1;for(var l=Array(t+1);++o<t;)l[o]=s[o];return l[t]=r(u),n(e,this,l)}}},function(e,t){e.exports=function(e,t,r){switch(r.length){case 0:return e.call(t);case 1:return e.call(t,r[0]);case 2:return e.call(t,r[0],r[1]);case 3:return e.call(t,r[0],r[1],r[2])}return e.apply(t,r)}},function(e,t,r){var n=r(771),i=r(773)(n);e.exports=i},function(e,t,r){var n=r(772),i=r(255),s=r(175),o=i?function(e,t){return i(e,"toString",{configurable:!0,enumerable:!1,value:n(t),writable:!0})}:s;e.exports=o},function(e,t){e.exports=function(e){return function(){return e}}},function(e,t){var r=Date.now;e.exports=function(e){var t=0,n=0;return function(){var i=r(),s=16-(i-n);if(n=i,s>0){if(++t>=800)return arguments[0]}else t=0;return e.apply(void 0,arguments)}}},function(e,t,r){"use strict";function n(){const e=f(r(775));return n=function(){return e},e}function i(){const e=f(r(106));return i=function(){return e},e}function s(){const e=f(r(212));return s=function(){return e},e}function o(){const e=f(r(776));return o=function(){return e},e}function a(){const e=function(e){if(e&&e.__esModule)return e;if(null===e||"object"!=typeof e&&"function"!=typeof e)return{default:e};var t=p();if(t&&t.has(e))return t.get(e);var r={},n=Object.defineProperty&&Object.getOwnPropertyDescriptor;for(var i in e)if(Object.prototype.hasOwnProperty.call(e,i)){var s=n?Object.getOwnPropertyDescriptor(e,i):null;s&&(s.get||s.set)?Object.defineProperty(r,i,s):r[i]=e[i]}r.default=e,t&&t.set(e,r);return r}(r(92));return a=function(){return e},e}function u(){const e=f(r(329));return u=function(){return e},e}Object.defineProperty(t,"__esModule",{value:!0}),t.default=function*(e,t,r,s){if(r=""+(r||""),s){if("Program"===s.type)s=a().file(s,[],[]);else if("File"!==s.type)throw new Error("AST root must be a Program or File node");const{cloneInputAst:e}=t;e&&(s=(0,o().default)(s))}else s=yield*(0,c.default)(e,t,r);let p=null;if(!1!==t.inputSourceMap){if("object"==typeof t.inputSourceMap&&(p=u().default.fromObject(t.inputSourceMap)),!p){const e=g(h,s);if(e)try{p=u().default.fromComment(e)}catch(f){d("discarding unknown inline input sourcemap",f)}}if(!p){const e=g(m,s);if("string"==typeof t.filename&&e)try{const r=m.exec(e),s=n().default.readFileSync(i().default.resolve(i().default.dirname(t.filename),r[1]));s.length>1e6?d("skip merging input map > 1 MB"):p=u().default.fromJSON(s)}catch(f){d("discarding unknown file input sourcemap",f)}else e&&d("discarding un-loadable file input sourcemap")}}return new l.default(t,{code:r,ast:s,inputMap:p})};var l=f(r(213)),c=f(r(330));function p(){if("function"!=typeof WeakMap)return null;var e=new WeakMap;return p=function(){return e},e}function f(e){return e&&e.__esModule?e:{default:e}}const d=(0,s().default)("babel:transform:file");const h=/^[@#]\s+sourceMappingURL=data:(?:application|text)\/json;(?:charset[:=]\S+?;)?base64,(?:.*)$/,m=/^[@#][ \t]+sourceMappingURL=([^\s'"`]+)[ \t]*$/;function y(e,t,r){return t&&(t=t.filter(({value:t})=>!e.test(t)||(r=t,!1))),[t,r]}function g(e,t){let r=null;return a().traverseFast(t,t=>{[t.leadingComments,r]=y(e,t.leadingComments,r),[t.innerComments,r]=y(e,t.innerComments,r),[t.trailingComments,r]=y(e,t.trailingComments,r)}),r}},function(e,t){},function(e,t,r){var n=r(250);e.exports=function(e){return n(e,5)}},,function(e,t,r){var n=r(309),i=n.Buffer;function s(e,t){for(var r in e)t[r]=e[r]}function o(e,t,r){return i(e,t,r)}i.from&&i.alloc&&i.allocUnsafe&&i.allocUnsafeSlow?e.exports=n:(s(n,t),t.Buffer=o),s(i,o),o.from=function(e,t,r){if("number"==typeof e)throw new TypeError("Argument must not be a number");return i(e,t,r)},o.alloc=function(e,t,r){if("number"!=typeof e)throw new TypeError("Argument must be a number");var n=i(e);return void 0!==t?"string"==typeof r?n.fill(t,r):n.fill(t):n.fill(0),n},o.allocUnsafe=function(e){if("number"!=typeof e)throw new TypeError("Argument must be a number");return i(e)},o.allocUnsafeSlow=function(e){if("number"!=typeof e)throw new TypeError("Argument must be a number");return n.SlowBuffer(e)}},function(e,t,r){"use strict";Object.defineProperty(t,"__esModule",{value:!0}),t.default=function(e,t,r){let s=`Support for the experimental syntax '${e}' isn't currently enabled (${t.line}:${t.column+1}):\n\n`+r;const o=n[e];if(o){const{syntax:e,transform:t}=o;if(e){const r=i(e);if(t){const e=i(t),n=t.name.startsWith("@babel/plugin")?"plugins":"presets";s+=`\n\nAdd ${e} to the '${n}' section of your Babel config to enable transformation.\nIf you want to leave it as-is, add ${r} to the 'plugins' section to enable parsing.`}else s+=`\n\nAdd ${r} to the 'plugins' section of your Babel config to enable parsing.`}}return s};const n={classProperties:{syntax:{name:"@babel/plugin-syntax-class-properties",url:"https://git.io/vb4yQ"},transform:{name:"@babel/plugin-proposal-class-properties",url:"https://git.io/vb4SL"}},classPrivateProperties:{syntax:{name:"@babel/plugin-syntax-class-properties",url:"https://git.io/vb4yQ"},transform:{name:"@babel/plugin-proposal-class-properties",url:"https://git.io/vb4SL"}},classPrivateMethods:{syntax:{name:"@babel/plugin-syntax-class-properties",url:"https://git.io/vb4yQ"},transform:{name:"@babel/plugin-proposal-private-methods",url:"https://git.io/JvpRG"}},classStaticBlock:{syntax:{name:"@babel/plugin-syntax-class-static-block",url:"https://git.io/JTLB6"},transform:{name:"@babel/plugin-proposal-class-static-block",url:"https://git.io/JTLBP"}},decimal:{syntax:{name:"@babel/plugin-syntax-decimal",url:"https://git.io/JfKOH"}},decorators:{syntax:{name:"@babel/plugin-syntax-decorators",url:"https://git.io/vb4y9"},transform:{name:"@babel/plugin-proposal-decorators",url:"https://git.io/vb4ST"}},doExpressions:{syntax:{name:"@babel/plugin-syntax-do-expressions",url:"https://git.io/vb4yh"},transform:{name:"@babel/plugin-proposal-do-expressions",url:"https://git.io/vb4S3"}},dynamicImport:{syntax:{name:"@babel/plugin-syntax-dynamic-import",url:"https://git.io/vb4Sv"}},exportDefaultFrom:{syntax:{name:"@babel/plugin-syntax-export-default-from",url:"https://git.io/vb4SO"},transform:{name:"@babel/plugin-proposal-export-default-from",url:"https://git.io/vb4yH"}},exportNamespaceFrom:{syntax:{name:"@babel/plugin-syntax-export-namespace-from",url:"https://git.io/vb4Sf"},transform:{name:"@babel/plugin-proposal-export-namespace-from",url:"https://git.io/vb4SG"}},flow:{syntax:{name:"@babel/plugin-syntax-flow",url:"https://git.io/vb4yb"},transform:{name:"@babel/preset-flow",url:"https://git.io/JfeDn"}},functionBind:{syntax:{name:"@babel/plugin-syntax-function-bind",url:"https://git.io/vb4y7"},transform:{name:"@babel/plugin-proposal-function-bind",url:"https://git.io/vb4St"}},functionSent:{syntax:{name:"@babel/plugin-syntax-function-sent",url:"https://git.io/vb4yN"},transform:{name:"@babel/plugin-proposal-function-sent",url:"https://git.io/vb4SZ"}},importMeta:{syntax:{name:"@babel/plugin-syntax-import-meta",url:"https://git.io/vbKK6"}},jsx:{syntax:{name:"@babel/plugin-syntax-jsx",url:"https://git.io/vb4yA"},transform:{name:"@babel/preset-react",url:"https://git.io/JfeDR"}},importAssertions:{syntax:{name:"@babel/plugin-syntax-import-assertions",url:"https://git.io/JUbkv"}},moduleStringNames:{syntax:{name:"@babel/plugin-syntax-module-string-names",url:"https://git.io/JTL8G"}},numericSeparator:{syntax:{name:"@babel/plugin-syntax-numeric-separator",url:"https://git.io/vb4Sq"},transform:{name:"@babel/plugin-proposal-numeric-separator",url:"https://git.io/vb4yS"}},optionalChaining:{syntax:{name:"@babel/plugin-syntax-optional-chaining",url:"https://git.io/vb4Sc"},transform:{name:"@babel/plugin-proposal-optional-chaining",url:"https://git.io/vb4Sk"}},pipelineOperator:{syntax:{name:"@babel/plugin-syntax-pipeline-operator",url:"https://git.io/vb4yj"},transform:{name:"@babel/plugin-proposal-pipeline-operator",url:"https://git.io/vb4SU"}},privateIn:{syntax:{name:"@babel/plugin-syntax-private-property-in-object",url:"https://git.io/JfK3q"},transform:{name:"@babel/plugin-proposal-private-property-in-object",url:"https://git.io/JfK3O"}},recordAndTuple:{syntax:{name:"@babel/plugin-syntax-record-and-tuple",url:"https://git.io/JvKp3"}},throwExpressions:{syntax:{name:"@babel/plugin-syntax-throw-expressions",url:"https://git.io/vb4SJ"},transform:{name:"@babel/plugin-proposal-throw-expressions",url:"https://git.io/vb4yF"}},typescript:{syntax:{name:"@babel/plugin-syntax-typescript",url:"https://git.io/vb4SC"},transform:{name:"@babel/preset-typescript",url:"https://git.io/JfeDz"}},asyncGenerators:{syntax:{name:"@babel/plugin-syntax-async-generators",url:"https://git.io/vb4SY"},transform:{name:"@babel/plugin-proposal-async-generator-functions",url:"https://git.io/vb4yp"}},logicalAssignment:{syntax:{name:"@babel/plugin-syntax-logical-assignment-operators",url:"https://git.io/vAlBp"},transform:{name:"@babel/plugin-proposal-logical-assignment-operators",url:"https://git.io/vAlRe"}},nullishCoalescingOperator:{syntax:{name:"@babel/plugin-syntax-nullish-coalescing-operator",url:"https://git.io/vb4yx"},transform:{name:"@babel/plugin-proposal-nullish-coalescing-operator",url:"https://git.io/vb4Se"}},objectRestSpread:{syntax:{name:"@babel/plugin-syntax-object-rest-spread",url:"https://git.io/vb4y5"},transform:{name:"@babel/plugin-proposal-object-rest-spread",url:"https://git.io/vb4Ss"}},optionalCatchBinding:{syntax:{name:"@babel/plugin-syntax-optional-catch-binding",url:"https://git.io/vb4Sn"},transform:{name:"@babel/plugin-proposal-optional-catch-binding",url:"https://git.io/vb4SI"}}};n.privateIn.syntax=n.privateIn.transform;const i=({name:e,url:t})=>`${e} (${t})`},function(e,t,r){"use strict";function n(){const e=o(r(329));return n=function(){return e},e}function i(){const e=o(r(170));return i=function(){return e},e}Object.defineProperty(t,"__esModule",{value:!0}),t.default=function(e,t){const{opts:r,ast:o,code:a,inputMap:u}=t,l=[];for(const n of e)for(const e of n){const{generatorOverride:t}=e;if(t){const e=t(o,r.generatorOpts,a,i().default);void 0!==e&&l.push(e)}}let c;if(0===l.length)c=(0,i().default)(o,r.generatorOpts,a);else{if(1!==l.length)throw new Error("More than one plugin attempted to override codegen.");if(c=l[0],"function"==typeof c.then)throw new Error("You appear to be using an async codegen plugin, which your current version of Babel does not support. If you're using a published plugin, you may need to upgrade your @babel/core version.")}let{code:p,map:f}=c;f&&u&&(f=(0,s.default)(u.toObject(),f));"inline"!==r.sourceMaps&&"both"!==r.sourceMaps||(p+="\n"+n().default.fromObject(f).toComment());"inline"===r.sourceMaps&&(f=null);return{outputCode:p,outputMap:f}};var s=o(r(781));function o(e){return e&&e.__esModule?e:{default:e}}},function(e,t,r){"use strict";function n(){const e=(t=r(782))&&t.__esModule?t:{default:t};var t;return n=function(){return e},e}function i(e){return`${e.line}/${e.columnStart}`}function s(e){const t=new(n().default.SourceMapConsumer)(Object.assign({},e,{sourceRoot:null})),r=new Map,i=new Map;let s=null;return t.computeColumnSpans(),t.eachMapping(e=>{if(null===e.originalLine)return;let n=r.get(e.source);n||(n={path:e.source,content:t.sourceContentFor(e.source,!0)},r.set(e.source,n));let o=i.get(n);o||(o={source:n,mappings:[]},i.set(n,o));const a={line:e.originalLine,columnStart:e.originalColumn,columnEnd:1/0,name:e.name};s&&s.source===n&&s.mapping.line===e.originalLine&&(s.mapping.columnEnd=e.originalColumn),s={source:n,mapping:a},o.mappings.push({original:a,generated:t.allGeneratedPositionsFor({source:e.source,line:e.originalLine,column:e.originalColumn}).map(e=>({line:e.line,columnStart:e.column,columnEnd:e.lastColumn+1}))})},null,n().default.SourceMapConsumer.ORIGINAL_ORDER),{file:e.file,sourceRoot:e.sourceRoot,sources:Array.from(i.values())}}Object.defineProperty(t,"__esModule",{value:!0}),t.default=function(e,t){const r=s(e),o=s(t),a=new(n().default.SourceMapGenerator);for(const{source:n}of r.sources)"string"==typeof n.content&&a.setSourceContent(n.path,n.content);if(1===o.sources.length){const e=o.sources[0],t=new Map;!function(e,t){for(const{source:r,mappings:n}of e.sources)for(const{original:e,generated:i}of n)for(const n of i)t(n,e,r)}(r,(r,n,s)=>{!function(e,t,r){const n=function({mappings:e},{line:t,columnStart:r,columnEnd:n}){return function(e,t){const r=function(e,t){let r=0,n=e.length;for(;r<n;){const i=Math.floor((r+n)/2),s=e[i],o=t(s);if(0===o){r=i;break}o>=0?n=i:r=i+1}let i=r;if(i<e.length){for(;i>=0&&t(e[i])>=0;)i--;return i+1}return i}(e,t),n=[];for(let i=r;i<e.length&&0===t(e[i]);i++)n.push(e[i]);return n}(e,({original:e})=>t>e.line?-1:t<e.line?1:r>=e.columnEnd?-1:n<=e.columnStart?1:0)}(e,t);for(const{generated:i}of n)for(const e of i)r(e)}(e,r,e=>{const r=i(e);t.has(r)||(t.set(r,e),a.addMapping({source:s.path,original:{line:n.line,column:n.columnStart},generated:{line:e.line,column:e.columnStart},name:n.name}))})});for(const r of t.values()){if(r.columnEnd===1/0)continue;const e={line:r.line,columnStart:r.columnEnd},n=i(e);t.has(n)||a.addMapping({generated:{line:e.line,column:e.columnStart}})}}const u=a.toJSON();"string"==typeof r.sourceRoot&&(u.sourceRoot=r.sourceRoot);return u}},function(e,t,r){t.SourceMapGenerator=r(331).SourceMapGenerator,t.SourceMapConsumer=r(785).SourceMapConsumer,t.SourceNode=r(788).SourceNode},function(e,t){var r="ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789+/".split("");t.encode=function(e){if(0<=e&&e<r.length)return r[e];throw new TypeError("Must be between 0 and 63: "+e)},t.decode=function(e){return 65<=e&&e<=90?e-65:97<=e&&e<=122?e-97+26:48<=e&&e<=57?e-48+52:43==e?62:47==e?63:-1}},function(e,t,r){var n=r(150);function i(){this._array=[],this._sorted=!0,this._last={generatedLine:-1,generatedColumn:0}}i.prototype.unsortedForEach=function(e,t){this._array.forEach(e,t)},i.prototype.add=function(e){var t,r,i,s,o,a;t=this._last,r=e,i=t.generatedLine,s=r.generatedLine,o=t.generatedColumn,a=r.generatedColumn,s>i||s==i&&a>=o||n.compareByGeneratedPositionsInflated(t,r)<=0?(this._last=e,this._array.push(e)):(this._sorted=!1,this._array.push(e))},i.prototype.toArray=function(){return this._sorted||(this._array.sort(n.compareByGeneratedPositionsInflated),this._sorted=!0),this._array},t.MappingList=i},function(e,t,r){var n=r(150),i=r(786),s=r(333).ArraySet,o=r(332),a=r(787).quickSort;function u(e){var t=e;return"string"==typeof e&&(t=JSON.parse(e.replace(/^\)\]\}'/,""))),null!=t.sections?new p(t):new l(t)}function l(e){var t=e;"string"==typeof e&&(t=JSON.parse(e.replace(/^\)\]\}'/,"")));var r=n.getArg(t,"version"),i=n.getArg(t,"sources"),o=n.getArg(t,"names",[]),a=n.getArg(t,"sourceRoot",null),u=n.getArg(t,"sourcesContent",null),l=n.getArg(t,"mappings"),c=n.getArg(t,"file",null);if(r!=this._version)throw new Error("Unsupported version: "+r);i=i.map(String).map(n.normalize).map((function(e){return a&&n.isAbsolute(a)&&n.isAbsolute(e)?n.relative(a,e):e})),this._names=s.fromArray(o.map(String),!0),this._sources=s.fromArray(i,!0),this.sourceRoot=a,this.sourcesContent=u,this._mappings=l,this.file=c}function c(){this.generatedLine=0,this.generatedColumn=0,this.source=null,this.originalLine=null,this.originalColumn=null,this.name=null}function p(e){var t=e;"string"==typeof e&&(t=JSON.parse(e.replace(/^\)\]\}'/,"")));var r=n.getArg(t,"version"),i=n.getArg(t,"sections");if(r!=this._version)throw new Error("Unsupported version: "+r);this._sources=new s,this._names=new s;var o={line:-1,column:0};this._sections=i.map((function(e){if(e.url)throw new Error("Support for url field in sections not implemented.");var t=n.getArg(e,"offset"),r=n.getArg(t,"line"),i=n.getArg(t,"column");if(r<o.line||r===o.line&&i<o.column)throw new Error("Section offsets must be ordered and non-overlapping.");return o=t,{generatedOffset:{generatedLine:r+1,generatedColumn:i+1},consumer:new u(n.getArg(e,"map"))}}))}u.fromSourceMap=function(e){return l.fromSourceMap(e)},u.prototype._version=3,u.prototype.__generatedMappings=null,Object.defineProperty(u.prototype,"_generatedMappings",{get:function(){return this.__generatedMappings||this._parseMappings(this._mappings,this.sourceRoot),this.__generatedMappings}}),u.prototype.__originalMappings=null,Object.defineProperty(u.prototype,"_originalMappings",{get:function(){return this.__originalMappings||this._parseMappings(this._mappings,this.sourceRoot),this.__originalMappings}}),u.prototype._charIsMappingSeparator=function(e,t){var r=e.charAt(t);return";"===r||","===r},u.prototype._parseMappings=function(e,t){throw new Error("Subclasses must implement _parseMappings")},u.GENERATED_ORDER=1,u.ORIGINAL_ORDER=2,u.GREATEST_LOWER_BOUND=1,u.LEAST_UPPER_BOUND=2,u.prototype.eachMapping=function(e,t,r){var i,s=t||null;switch(r||u.GENERATED_ORDER){case u.GENERATED_ORDER:i=this._generatedMappings;break;case u.ORIGINAL_ORDER:i=this._originalMappings;break;default:throw new Error("Unknown order of iteration.")}var o=this.sourceRoot;i.map((function(e){var t=null===e.source?null:this._sources.at(e.source);return null!=t&&null!=o&&(t=n.join(o,t)),{source:t,generatedLine:e.generatedLine,generatedColumn:e.generatedColumn,originalLine:e.originalLine,originalColumn:e.originalColumn,name:null===e.name?null:this._names.at(e.name)}}),this).forEach(e,s)},u.prototype.allGeneratedPositionsFor=function(e){var t=n.getArg(e,"line"),r={source:n.getArg(e,"source"),originalLine:t,originalColumn:n.getArg(e,"column",0)};if(null!=this.sourceRoot&&(r.source=n.relative(this.sourceRoot,r.source)),!this._sources.has(r.source))return[];r.source=this._sources.indexOf(r.source);var s=[],o=this._findMapping(r,this._originalMappings,"originalLine","originalColumn",n.compareByOriginalPositions,i.LEAST_UPPER_BOUND);if(o>=0){var a=this._originalMappings[o];if(void 0===e.column)for(var u=a.originalLine;a&&a.originalLine===u;)s.push({line:n.getArg(a,"generatedLine",null),column:n.getArg(a,"generatedColumn",null),lastColumn:n.getArg(a,"lastGeneratedColumn",null)}),a=this._originalMappings[++o];else for(var l=a.originalColumn;a&&a.originalLine===t&&a.originalColumn==l;)s.push({line:n.getArg(a,"generatedLine",null),column:n.getArg(a,"generatedColumn",null),lastColumn:n.getArg(a,"lastGeneratedColumn",null)}),a=this._originalMappings[++o]}return s},t.SourceMapConsumer=u,l.prototype=Object.create(u.prototype),l.prototype.consumer=u,l.fromSourceMap=function(e){var t=Object.create(l.prototype),r=t._names=s.fromArray(e._names.toArray(),!0),i=t._sources=s.fromArray(e._sources.toArray(),!0);t.sourceRoot=e._sourceRoot,t.sourcesContent=e._generateSourcesContent(t._sources.toArray(),t.sourceRoot),t.file=e._file;for(var o=e._mappings.toArray().slice(),u=t.__generatedMappings=[],p=t.__originalMappings=[],f=0,d=o.length;f<d;f++){var h=o[f],m=new c;m.generatedLine=h.generatedLine,m.generatedColumn=h.generatedColumn,h.source&&(m.source=i.indexOf(h.source),m.originalLine=h.originalLine,m.originalColumn=h.originalColumn,h.name&&(m.name=r.indexOf(h.name)),p.push(m)),u.push(m)}return a(t.__originalMappings,n.compareByOriginalPositions),t},l.prototype._version=3,Object.defineProperty(l.prototype,"sources",{get:function(){return this._sources.toArray().map((function(e){return null!=this.sourceRoot?n.join(this.sourceRoot,e):e}),this)}}),l.prototype._parseMappings=function(e,t){for(var r,i,s,u,l,p=1,f=0,d=0,h=0,m=0,y=0,g=e.length,b=0,v={},E={},x=[],S=[];b<g;)if(";"===e.charAt(b))p++,b++,f=0;else if(","===e.charAt(b))b++;else{for((r=new c).generatedLine=p,u=b;u<g&&!this._charIsMappingSeparator(e,u);u++);if(s=v[i=e.slice(b,u)])b+=i.length;else{for(s=[];b<u;)o.decode(e,b,E),l=E.value,b=E.rest,s.push(l);if(2===s.length)throw new Error("Found a source, but no line and column");if(3===s.length)throw new Error("Found a source and line, but no column");v[i]=s}r.generatedColumn=f+s[0],f=r.generatedColumn,s.length>1&&(r.source=m+s[1],m+=s[1],r.originalLine=d+s[2],d=r.originalLine,r.originalLine+=1,r.originalColumn=h+s[3],h=r.originalColumn,s.length>4&&(r.name=y+s[4],y+=s[4])),S.push(r),"number"==typeof r.originalLine&&x.push(r)}a(S,n.compareByGeneratedPositionsDeflated),this.__generatedMappings=S,a(x,n.compareByOriginalPositions),this.__originalMappings=x},l.prototype._findMapping=function(e,t,r,n,s,o){if(e[r]<=0)throw new TypeError("Line must be greater than or equal to 1, got "+e[r]);if(e[n]<0)throw new TypeError("Column must be greater than or equal to 0, got "+e[n]);return i.search(e,t,s,o)},l.prototype.computeColumnSpans=function(){for(var e=0;e<this._generatedMappings.length;++e){var t=this._generatedMappings[e];if(e+1<this._generatedMappings.length){var r=this._generatedMappings[e+1];if(t.generatedLine===r.generatedLine){t.lastGeneratedColumn=r.generatedColumn-1;continue}}t.lastGeneratedColumn=1/0}},l.prototype.originalPositionFor=function(e){var t={generatedLine:n.getArg(e,"line"),generatedColumn:n.getArg(e,"column")},r=this._findMapping(t,this._generatedMappings,"generatedLine","generatedColumn",n.compareByGeneratedPositionsDeflated,n.getArg(e,"bias",u.GREATEST_LOWER_BOUND));if(r>=0){var i=this._generatedMappings[r];if(i.generatedLine===t.generatedLine){var s=n.getArg(i,"source",null);null!==s&&(s=this._sources.at(s),null!=this.sourceRoot&&(s=n.join(this.sourceRoot,s)));var o=n.getArg(i,"name",null);return null!==o&&(o=this._names.at(o)),{source:s,line:n.getArg(i,"originalLine",null),column:n.getArg(i,"originalColumn",null),name:o}}}return{source:null,line:null,column:null,name:null}},l.prototype.hasContentsOfAllSources=function(){return!!this.sourcesContent&&(this.sourcesContent.length>=this._sources.size()&&!this.sourcesContent.some((function(e){return null==e})))},l.prototype.sourceContentFor=function(e,t){if(!this.sourcesContent)return null;if(null!=this.sourceRoot&&(e=n.relative(this.sourceRoot,e)),this._sources.has(e))return this.sourcesContent[this._sources.indexOf(e)];var r;if(null!=this.sourceRoot&&(r=n.urlParse(this.sourceRoot))){var i=e.replace(/^file:\/\//,"");if("file"==r.scheme&&this._sources.has(i))return this.sourcesContent[this._sources.indexOf(i)];if((!r.path||"/"==r.path)&&this._sources.has("/"+e))return this.sourcesContent[this._sources.indexOf("/"+e)]}if(t)return null;throw new Error('"'+e+'" is not in the SourceMap.')},l.prototype.generatedPositionFor=function(e){var t=n.getArg(e,"source");if(null!=this.sourceRoot&&(t=n.relative(this.sourceRoot,t)),!this._sources.has(t))return{line:null,column:null,lastColumn:null};var r={source:t=this._sources.indexOf(t),originalLine:n.getArg(e,"line"),originalColumn:n.getArg(e,"column")},i=this._findMapping(r,this._originalMappings,"originalLine","originalColumn",n.compareByOriginalPositions,n.getArg(e,"bias",u.GREATEST_LOWER_BOUND));if(i>=0){var s=this._originalMappings[i];if(s.source===r.source)return{line:n.getArg(s,"generatedLine",null),column:n.getArg(s,"generatedColumn",null),lastColumn:n.getArg(s,"lastGeneratedColumn",null)}}return{line:null,column:null,lastColumn:null}},t.BasicSourceMapConsumer=l,p.prototype=Object.create(u.prototype),p.prototype.constructor=u,p.prototype._version=3,Object.defineProperty(p.prototype,"sources",{get:function(){for(var e=[],t=0;t<this._sections.length;t++)for(var r=0;r<this._sections[t].consumer.sources.length;r++)e.push(this._sections[t].consumer.sources[r]);return e}}),p.prototype.originalPositionFor=function(e){var t={generatedLine:n.getArg(e,"line"),generatedColumn:n.getArg(e,"column")},r=i.search(t,this._sections,(function(e,t){var r=e.generatedLine-t.generatedOffset.generatedLine;return r||e.generatedColumn-t.generatedOffset.generatedColumn})),s=this._sections[r];return s?s.consumer.originalPositionFor({line:t.generatedLine-(s.generatedOffset.generatedLine-1),column:t.generatedColumn-(s.generatedOffset.generatedLine===t.generatedLine?s.generatedOffset.generatedColumn-1:0),bias:e.bias}):{source:null,line:null,column:null,name:null}},p.prototype.hasContentsOfAllSources=function(){return this._sections.every((function(e){return e.consumer.hasContentsOfAllSources()}))},p.prototype.sourceContentFor=function(e,t){for(var r=0;r<this._sections.length;r++){var n=this._sections[r].consumer.sourceContentFor(e,!0);if(n)return n}if(t)return null;throw new Error('"'+e+'" is not in the SourceMap.')},p.prototype.generatedPositionFor=function(e){for(var t=0;t<this._sections.length;t++){var r=this._sections[t];if(-1!==r.consumer.sources.indexOf(n.getArg(e,"source"))){var i=r.consumer.generatedPositionFor(e);if(i)return{line:i.line+(r.generatedOffset.generatedLine-1),column:i.column+(r.generatedOffset.generatedLine===i.line?r.generatedOffset.generatedColumn-1:0)}}}return{line:null,column:null}},p.prototype._parseMappings=function(e,t){this.__generatedMappings=[],this.__originalMappings=[];for(var r=0;r<this._sections.length;r++)for(var i=this._sections[r],s=i.consumer._generatedMappings,o=0;o<s.length;o++){var u=s[o],l=i.consumer._sources.at(u.source);null!==i.consumer.sourceRoot&&(l=n.join(i.consumer.sourceRoot,l)),this._sources.add(l),l=this._sources.indexOf(l);var c=i.consumer._names.at(u.name);this._names.add(c),c=this._names.indexOf(c);var p={source:l,generatedLine:u.generatedLine+(i.generatedOffset.generatedLine-1),generatedColumn:u.generatedColumn+(i.generatedOffset.generatedLine===u.generatedLine?i.generatedOffset.generatedColumn-1:0),originalLine:u.originalLine,originalColumn:u.originalColumn,name:c};this.__generatedMappings.push(p),"number"==typeof p.originalLine&&this.__originalMappings.push(p)}a(this.__generatedMappings,n.compareByGeneratedPositionsDeflated),a(this.__originalMappings,n.compareByOriginalPositions)},t.IndexedSourceMapConsumer=p},function(e,t){t.GREATEST_LOWER_BOUND=1,t.LEAST_UPPER_BOUND=2,t.search=function(e,r,n,i){if(0===r.length)return-1;var s=function e(r,n,i,s,o,a){var u=Math.floor((n-r)/2)+r,l=o(i,s[u],!0);return 0===l?u:l>0?n-u>1?e(u,n,i,s,o,a):a==t.LEAST_UPPER_BOUND?n<s.length?n:-1:u:u-r>1?e(r,u,i,s,o,a):a==t.LEAST_UPPER_BOUND?u:r<0?-1:r}(-1,r.length,e,r,n,i||t.GREATEST_LOWER_BOUND);if(s<0)return-1;for(;s-1>=0&&0===n(r[s],r[s-1],!0);)--s;return s}},function(e,t){function r(e,t,r){var n=e[t];e[t]=e[r],e[r]=n}function n(e,t,i,s){if(i<s){var o=i-1;r(e,(c=i,p=s,Math.round(c+Math.random()*(p-c))),s);for(var a=e[s],u=i;u<s;u++)t(e[u],a)<=0&&r(e,o+=1,u);r(e,o+1,u);var l=o+1;n(e,t,i,l-1),n(e,t,l+1,s)}var c,p}t.quickSort=function(e,t){n(e,t,0,e.length-1)}},function(e,t,r){var n=r(331).SourceMapGenerator,i=r(150),s=/(\r?\n)/,o="$$$isSourceNode$$$";function a(e,t,r,n,i){this.children=[],this.sourceContents={},this.line=null==e?null:e,this.column=null==t?null:t,this.source=null==r?null:r,this.name=null==i?null:i,this[o]=!0,null!=n&&this.add(n)}a.fromStringWithSourceMap=function(e,t,r){var n=new a,o=e.split(s),u=0,l=function(){return e()+(e()||"");function e(){return u<o.length?o[u++]:void 0}},c=1,p=0,f=null;return t.eachMapping((function(e){if(null!==f){if(!(c<e.generatedLine)){var t=(r=o[u]).substr(0,e.generatedColumn-p);return o[u]=r.substr(e.generatedColumn-p),p=e.generatedColumn,d(f,t),void(f=e)}d(f,l()),c++,p=0}for(;c<e.generatedLine;)n.add(l()),c++;if(p<e.generatedColumn){var r=o[u];n.add(r.substr(0,e.generatedColumn)),o[u]=r.substr(e.generatedColumn),p=e.generatedColumn}f=e}),this),u<o.length&&(f&&d(f,l()),n.add(o.splice(u).join(""))),t.sources.forEach((function(e){var s=t.sourceContentFor(e);null!=s&&(null!=r&&(e=i.join(r,e)),n.setSourceContent(e,s))})),n;function d(e,t){if(null===e||void 0===e.source)n.add(t);else{var s=r?i.join(r,e.source):e.source;n.add(new a(e.originalLine,e.originalColumn,s,t,e.name))}}},a.prototype.add=function(e){if(Array.isArray(e))e.forEach((function(e){this.add(e)}),this);else{if(!e[o]&&"string"!=typeof e)throw new TypeError("Expected a SourceNode, string, or an array of SourceNodes and strings. Got "+e);e&&this.children.push(e)}return this},a.prototype.prepend=function(e){if(Array.isArray(e))for(var t=e.length-1;t>=0;t--)this.prepend(e[t]);else{if(!e[o]&&"string"!=typeof e)throw new TypeError("Expected a SourceNode, string, or an array of SourceNodes and strings. Got "+e);this.children.unshift(e)}return this},a.prototype.walk=function(e){for(var t,r=0,n=this.children.length;r<n;r++)(t=this.children[r])[o]?t.walk(e):""!==t&&e(t,{source:this.source,line:this.line,column:this.column,name:this.name})},a.prototype.join=function(e){var t,r,n=this.children.length;if(n>0){for(t=[],r=0;r<n-1;r++)t.push(this.children[r]),t.push(e);t.push(this.children[r]),this.children=t}return this},a.prototype.replaceRight=function(e,t){var r=this.children[this.children.length-1];return r[o]?r.replaceRight(e,t):"string"==typeof r?this.children[this.children.length-1]=r.replace(e,t):this.children.push("".replace(e,t)),this},a.prototype.setSourceContent=function(e,t){this.sourceContents[i.toSetString(e)]=t},a.prototype.walkSourceContents=function(e){for(var t=0,r=this.children.length;t<r;t++)this.children[t][o]&&this.children[t].walkSourceContents(e);var n=Object.keys(this.sourceContents);for(t=0,r=n.length;t<r;t++)e(i.fromSetString(n[t]),this.sourceContents[n[t]])},a.prototype.toString=function(){var e="";return this.walk((function(t){e+=t})),e},a.prototype.toStringWithSourceMap=function(e){var t={code:"",line:1,column:0},r=new n(e),i=!1,s=null,o=null,a=null,u=null;return this.walk((function(e,n){t.code+=e,null!==n.source&&null!==n.line&&null!==n.column?(s===n.source&&o===n.line&&a===n.column&&u===n.name||r.addMapping({source:n.source,original:{line:n.line,column:n.column},generated:{line:t.line,column:t.column},name:n.name}),s=n.source,o=n.line,a=n.column,u=n.name,i=!0):i&&(r.addMapping({generated:{line:t.line,column:t.column}}),s=null,i=!1);for(var l=0,c=e.length;l<c;l++)10===e.charCodeAt(l)?(t.line++,t.column=0,l+1===c?(s=null,i=!1):i&&r.addMapping({source:n.source,original:{line:n.line,column:n.column},generated:{line:t.line,column:t.column},name:n.name})):t.column++})),this.walkSourceContents((function(e,t){r.setSourceContent(e,t)})),{code:t.code,map:r}},t.SourceNode=a},function(e,t,r){"use strict";Object.defineProperty(t,"__esModule",{value:!0}),t.transformFileSync=function(){throw new Error("Transforming files is not supported in browsers")},t.transformFileAsync=function(){return Promise.reject(new Error("Transforming files is not supported in browsers"))},t.transformFile=void 0;t.transformFile=function(e,t,r){"function"==typeof t&&(r=t),r(new Error("Transforming files is not supported in browsers"),null)}},function(e,t,r){"use strict";function n(){const e=o(r(121));return n=function(){return e},e}Object.defineProperty(t,"__esModule",{value:!0}),t.transformFromAstAsync=t.transformFromAstSync=t.transformFromAst=void 0;var i=o(r(149)),s=r(322);function o(e){return e&&e.__esModule?e:{default:e}}const a=(0,n().default)((function*(e,t,r){const n=yield*(0,i.default)(r);if(null===n)return null;if(!e)throw new Error("No AST given");return yield*(0,s.run)(n,t,e)}));t.transformFromAst=function(e,t,r,n){if("function"==typeof r&&(n=r,r=void 0),void 0===n)return a.sync(e,t,r);a.errback(e,t,r,n)};const u=a.sync;t.transformFromAstSync=u;const l=a.async;t.transformFromAstAsync=l},function(e,t,r){"use strict";function n(){const e=a(r(121));return n=function(){return e},e}Object.defineProperty(t,"__esModule",{value:!0}),t.parseAsync=t.parseSync=t.parse=void 0;var i=a(r(149)),s=a(r(330)),o=a(r(328));function a(e){return e&&e.__esModule?e:{default:e}}const u=(0,n().default)((function*(e,t){const r=yield*(0,i.default)(t);return null===r?null:yield*(0,s.default)(r.passes,(0,o.default)(r),e)}));t.parse=function(e,t,r){if("function"==typeof t&&(r=t,t=void 0),void 0===r)return u.sync(e,t);u.errback(e,t,r)};const l=u.sync;t.parseSync=l;const c=u.async;t.parseAsync=c},function(e,t,r){"use strict";Object.defineProperty(t,"__esModule",{value:!0}),t.default=void 0;var n=r(151),i=u(r(793)),s=u(r(795)),o=u(r(797)),a=u(r(798));function u(e){return e&&e.__esModule?e:{default:e}}var l=(0,n.declare)((e,t)=>{e.assertVersion(7);let{pragma:r,pragmaFrag:n,development:u=!1}=t;const{pure:l,throwIfNamespace:c=!0,runtime:p="classic",importSource:f}=t;if("classic"===p&&(r=r||"React.createElement",n=n||"React.Fragment"),u=!!u,"boolean"!=typeof u)throw new Error("@babel/preset-react 'development' option must be a boolean.");return{plugins:[[u?s.default:i.default,{importSource:f,pragma:r,pragmaFrag:n,runtime:p,throwIfNamespace:c,pure:l,useBuiltIns:!!t.useBuiltIns,useSpread:t.useSpread}],o.default,!1!==l&&a.default].filter(Boolean)}});t.default=l},function(e,t,r){"use strict";var n;Object.defineProperty(t,"__esModule",{value:!0}),t.default=void 0;var i=(0,((n=r(334))&&n.__esModule?n:{default:n}).default)({name:"transform-react-jsx",development:!1});t.default=i},function(e,t,r){"use strict";Object.defineProperty(t,"__esModule",{value:!0}),t.default=void 0;var n=(0,r(151).declare)(e=>(e.assertVersion(7),{name:"syntax-jsx",manipulateOptions(e,t){t.plugins.some(e=>"typescript"===(Array.isArray(e)?e[0]:e))||t.plugins.push("jsx")}}));t.default=n},function(e,t,r){"use strict";Object.defineProperty(t,"__esModule",{value:!0}),Object.defineProperty(t,"default",{enumerable:!0,get:function(){return i.default}});var n,i=(n=r(796))&&n.__esModule?n:{default:n}},function(e,t,r){"use strict";var n;Object.defineProperty(t,"__esModule",{value:!0}),t.default=void 0;var i=(0,((n=r(334))&&n.__esModule?n:{default:n}).default)({name:"transform-react-jsx/development",development:!0});t.default=i},function(e,t,r){"use strict";Object.defineProperty(t,"__esModule",{value:!0}),t.default=void 0;var n,i=r(151),s=(n=r(106))&&n.__esModule?n:{default:n},o=r(134);var a=(0,i.declare)(e=>{function t(e,t){const r=t.arguments[0].properties;let n=!0;for(let i=0;i<r.length;i++){const e=r[i],t=o.types.toComputedKey(e);if(o.types.isLiteral(t,{value:"displayName"})){n=!1;break}}n&&r.unshift(o.types.objectProperty(o.types.identifier("displayName"),o.types.stringLiteral(e)))}e.assertVersion(7);const r=o.types.buildMatchMemberExpression("React.createClass");function n(e){if(!e||!o.types.isCallExpression(e))return!1;if(!r(e.callee)&&"createReactClass"!==e.callee.name)return!1;const t=e.arguments;if(1!==t.length)return!1;const n=t[0];return!!o.types.isObjectExpression(n)}return{name:"transform-react-display-name",visitor:{ExportDefaultDeclaration({node:e},r){if(n(e.declaration)){const n=r.filename||"unknown";let i=s.default.basename(n,s.default.extname(n));"index"===i&&(i=s.default.basename(s.default.dirname(n))),t(i,e.declaration)}},CallExpression(e){const{node:r}=e;if(!n(r))return;let i;e.find((function(e){if(e.isAssignmentExpression())i=e.node.left;else if(e.isObjectProperty())i=e.node.key;else if(e.isVariableDeclarator())i=e.node.id;else if(e.isStatement())return!0;if(i)return!0})),i&&(o.types.isMemberExpression(i)&&(i=i.property),o.types.isIdentifier(i)&&t(i.name,r))}}}});t.default=a},function(e,t,r){"use strict";Object.defineProperty(t,"__esModule",{value:!0}),t.default=void 0;var n,i=r(151),s=(n=r(335))&&n.__esModule?n:{default:n},o=r(134);const a=new Map([["react",["cloneElement","createContext","createElement","createFactory","createRef","forwardRef","isValidElement","memo","lazy"]],["react-dom",["createPortal"]]]);var u=(0,i.declare)(e=>(e.assertVersion(7),{name:"transform-react-pure-annotations",visitor:{CallExpression(e){(function(e){if(!o.types.isMemberExpression(e.node.callee)){const t=e.get("callee");for(const[e,r]of a)for(const n of r)if(t.referencesImport(e,n))return!0;return!1}for(const[t,r]of a){const n=e.get("callee.object");if(n.referencesImport(t,"default")||n.referencesImport(t,"*")){for(const t of r)if(o.types.isIdentifier(e.node.callee.property,{name:t}))return!0;return!1}}return!1})(e)&&(0,s.default)(e)}}}));t.default=u},function(e,t,r){"use strict";(function(e){Object.defineProperty(t,"__esModule",{value:!0});var n=Object.assign||function(e){for(var t=1;t<arguments.length;t++){var r=arguments[t];for(var n in r)Object.prototype.hasOwnProperty.call(r,n)&&(e[n]=r[n])}return e},i=function(){function e(e,t){for(var r=0;r<t.length;r++){var n=t[r];n.enumerable=n.enumerable||!1,n.configurable=!0,"value"in n&&(n.writable=!0),Object.defineProperty(e,n.key,n)}}return function(t,r,n){return r&&e(t.prototype,r),n&&e(t,n),t}}(),s=function(e){if(e&&e.__esModule)return e;var t={};if(null!=e)for(var r in e)Object.prototype.hasOwnProperty.call(e,r)&&(t[r]=e[r]);return t.default=e,t}(r(0));function o(e,t){if(!(e instanceof t))throw new TypeError("Cannot call a class as a function")}function a(e,t){if(!e)throw new ReferenceError("this hasn't been initialised - super() hasn't been called");return!t||"object"!=typeof t&&"function"!=typeof t?e:t}var u="navigator"in e&&/Win/i.test(navigator.platform),l="navigator"in e&&/(Mac|iPhone|iPod|iPad)/i.test(navigator.platform),c="npm__react-simple-code-editor__textarea",p=function(e){function t(){var e,r,i;o(this,t);for(var s=arguments.length,c=Array(s),p=0;p<s;p++)c[p]=arguments[p];return r=i=a(this,(e=t.__proto__||Object.getPrototypeOf(t)).call.apply(e,[this].concat(c))),i.state={capture:!0},i._recordCurrentState=function(){var e=i._input;if(e){var t=e.value,r=e.selectionStart,n=e.selectionEnd;i._recordChange({value:t,selectionStart:r,selectionEnd:n})}},i._getLines=function(e,t){return e.substring(0,t).split("\n")},i._recordChange=function(e){var t=arguments.length>1&&void 0!==arguments[1]&&arguments[1],r=i._history,s=r.stack,o=r.offset;if(s.length&&o>-1){i._history.stack=s.slice(0,o+1);var a=i._history.stack.length;if(a>100){var u=a-100;i._history.stack=s.slice(u,a),i._history.offset=Math.max(i._history.offset-u,0)}}var l=Date.now();if(t){var c=i._history.stack[i._history.offset];if(c&&l-c.timestamp<3e3){var p=/[^a-z0-9]([a-z0-9]+)$/i,f=i._getLines(c.value,c.selectionStart).pop().match(p),d=i._getLines(e.value,e.selectionStart).pop().match(p);if(f&&d&&d[1].startsWith(f[1]))return void(i._history.stack[i._history.offset]=n({},e,{timestamp:l}))}}i._history.stack.push(n({},e,{timestamp:l})),i._history.offset++},i._updateInput=function(e){var t=i._input;t&&(t.value=e.value,t.selectionStart=e.selectionStart,t.selectionEnd=e.selectionEnd,i.props.onValueChange(e.value))},i._applyEdits=function(e){var t=i._input,r=i._history.stack[i._history.offset];r&&t&&(i._history.stack[i._history.offset]=n({},r,{selectionStart:t.selectionStart,selectionEnd:t.selectionEnd})),i._recordChange(e),i._updateInput(e)},i._undoEdit=function(){var e=i._history,t=e.stack,r=e.offset,n=t[r-1];n&&(i._updateInput(n),i._history.offset=Math.max(r-1,0))},i._redoEdit=function(){var e=i._history,t=e.stack,r=e.offset,n=t[r+1];n&&(i._updateInput(n),i._history.offset=Math.min(r+1,t.length-1))},i._handleKeyDown=function(e){var t=i.props,r=t.tabSize,n=t.insertSpaces,s=t.ignoreTabKey,o=t.onKeyDown;if(!o||(o(e),!e.defaultPrevented)){27===e.keyCode&&e.target.blur();var a=e.target,c=a.value,p=a.selectionStart,f=a.selectionEnd,d=(n?" ":"\t").repeat(r);if(9===e.keyCode&&!s&&i.state.capture)if(e.preventDefault(),e.shiftKey){var h=i._getLines(c,p),m=h.length-1,y=i._getLines(c,f).length-1,g=c.split("\n").map((function(e,t){return t>=m&&t<=y&&e.startsWith(d)?e.substring(d.length):e})).join("\n");if(c!==g){var b=h[m];i._applyEdits({value:g,selectionStart:b.startsWith(d)?p-d.length:p,selectionEnd:f-(c.length-g.length)})}}else if(p!==f){var v=i._getLines(c,p),E=v.length-1,x=i._getLines(c,f).length-1,S=v[E];i._applyEdits({value:c.split("\n").map((function(e,t){return t>=E&&t<=x?d+e:e})).join("\n"),selectionStart:/\S/.test(S)?p+d.length:p,selectionEnd:f+d.length*(x-E+1)})}else{var T=p+d.length;i._applyEdits({value:c.substring(0,p)+d+c.substring(f),selectionStart:T,selectionEnd:T})}else if(8===e.keyCode){var A=p!==f;if(c.substring(0,p).endsWith(d)&&!A){e.preventDefault();var D=p-d.length;i._applyEdits({value:c.substring(0,p-d.length)+c.substring(f),selectionStart:D,selectionEnd:D})}}else if(13===e.keyCode){if(p===f){var P=i._getLines(c,p).pop().match(/^\s+/);if(P&&P[0]){e.preventDefault();var w="\n"+P[0],C=p+w.length;i._applyEdits({value:c.substring(0,p)+w+c.substring(f),selectionStart:C,selectionEnd:C})}}}else if(57===e.keyCode||219===e.keyCode||222===e.keyCode||192===e.keyCode){var O=void 0;57===e.keyCode&&e.shiftKey?O=["(",")"]:219===e.keyCode?O=e.shiftKey?["{","}"]:["[","]"]:222===e.keyCode?O=e.shiftKey?['"','"']:["'","'"]:192!==e.keyCode||e.shiftKey||(O=["`","`"]),p!==f&&O&&(e.preventDefault(),i._applyEdits({value:c.substring(0,p)+O[0]+c.substring(p,f)+O[1]+c.substring(f),selectionStart:p,selectionEnd:f+2}))}else!(l?e.metaKey&&90===e.keyCode:e.ctrlKey&&90===e.keyCode)||e.shiftKey||e.altKey?(l?e.metaKey&&90===e.keyCode&&e.shiftKey:u?e.ctrlKey&&89===e.keyCode:e.ctrlKey&&90===e.keyCode&&e.shiftKey)&&!e.altKey?(e.preventDefault(),i._redoEdit()):77!==e.keyCode||!e.ctrlKey||l&&!e.shiftKey||(e.preventDefault(),i.setState((function(e){return{capture:!e.capture}}))):(e.preventDefault(),i._undoEdit())}},i._handleChange=function(e){var t=e.target,r=t.value,n=t.selectionStart,s=t.selectionEnd;i._recordChange({value:r,selectionStart:n,selectionEnd:s},!0),i.props.onValueChange(r)},i._history={stack:[],offset:-1},a(i,r)}return function(e,t){if("function"!=typeof t&&null!==t)throw new TypeError("Super expression must either be null or a function, not "+typeof t);e.prototype=Object.create(t&&t.prototype,{constructor:{value:e,enumerable:!1,writable:!0,configurable:!0}}),t&&(Object.setPrototypeOf?Object.setPrototypeOf(e,t):e.__proto__=t)}(t,e),i(t,[{key:"componentDidMount",value:function(){this._recordCurrentState()}},{key:"render",value:function(){var e=this,t=this.props,r=t.value,i=t.style,o=t.padding,a=t.highlight,u=t.textareaId,l=t.autoFocus,p=t.disabled,d=t.form,h=t.maxLength,m=t.minLength,y=t.name,g=t.placeholder,b=t.readOnly,v=t.required,E=t.onClick,x=t.onFocus,S=t.onBlur,T=t.onKeyUp,A=(t.onKeyDown,t.onValueChange,t.tabSize,t.insertSpaces,t.ignoreTabKey,function(e,t){var r={};for(var n in e)t.indexOf(n)>=0||Object.prototype.hasOwnProperty.call(e,n)&&(r[n]=e[n]);return r}(t,["value","style","padding","highlight","textareaId","autoFocus","disabled","form","maxLength","minLength","name","placeholder","readOnly","required","onClick","onFocus","onBlur","onKeyUp","onKeyDown","onValueChange","tabSize","insertSpaces","ignoreTabKey"])),D={paddingTop:o,paddingRight:o,paddingBottom:o,paddingLeft:o},P=a(r);return s.createElement("div",n({},A,{style:n({},f.container,i)}),s.createElement("textarea",{ref:function(t){return e._input=t},style:n({},f.editor,f.textarea,D),className:c,id:u,value:r,onChange:this._handleChange,onKeyDown:this._handleKeyDown,onClick:E,onKeyUp:T,onFocus:x,onBlur:S,disabled:p,form:d,maxLength:h,minLength:m,name:y,placeholder:g,readOnly:b,required:v,autoFocus:l,autoCapitalize:"off",autoComplete:"off",autoCorrect:"off",spellCheck:!1,"data-gramm":!1}),s.createElement("pre",n({"aria-hidden":"true",style:n({},f.editor,f.highlight,D)},"string"==typeof P?{dangerouslySetInnerHTML:{__html:P+"<br />"}}:{children:P})),s.createElement("style",{type:"text/css",dangerouslySetInnerHTML:{__html:"\n/**\n * Reset the text fill color so that placeholder is visible\n */\n.npm__react-simple-code-editor__textarea:empty {\n  -webkit-text-fill-color: inherit !important;\n}\n\n/**\n * Hack to apply on some CSS on IE10 and IE11\n */\n@media all and (-ms-high-contrast: none), (-ms-high-contrast: active) {\n  /**\n    * IE doesn't support '-webkit-text-fill-color'\n    * So we use 'color: transparent' to make the text transparent on IE\n    * Unlike other browsers, it doesn't affect caret color in IE\n    */\n  .npm__react-simple-code-editor__textarea {\n    color: transparent !important;\n  }\n\n  .npm__react-simple-code-editor__textarea::selection {\n    background-color: #accef7 !important;\n    color: transparent !important;\n  }\n}\n"}}))}},{key:"session",get:function(){return{history:this._history}},set:function(e){this._history=e.history}}]),t}(s.Component);p.defaultProps={tabSize:2,insertSpaces:!0,ignoreTabKey:!1,padding:0},t.default=p;var f={container:{position:"relative",textAlign:"left",boxSizing:"border-box",padding:0,overflow:"hidden"},textarea:{position:"absolute",top:0,left:0,height:"100%",width:"100%",resize:"none",color:"inherit",overflow:"hidden",MozOsxFontSmoothing:"grayscale",WebkitFontSmoothing:"antialiased",WebkitTextFillColor:"transparent"},highlight:{position:"relative",pointerEvents:"none"},editor:{margin:0,border:0,background:"none",boxSizing:"inherit",display:"inherit",fontFamily:"inherit",fontSize:"inherit",fontStyle:"inherit",fontVariantLigatures:"inherit",fontWeight:"inherit",letterSpacing:"inherit",lineHeight:"inherit",tabSize:"inherit",textIndent:"inherit",textRendering:"inherit",textTransform:"inherit",whiteSpace:"pre-wrap",wordBreak:"keep-all",overflowWrap:"break-word"}}}).call(this,r(24))},function(e,t,r){"use strict";var n,i=this&&this.__extends||(n=function(e,t){return(n=Object.setPrototypeOf||{__proto__:[]}instanceof Array&&function(e,t){e.__proto__=t}||function(e,t){for(var r in t)t.hasOwnProperty(r)&&(e[r]=t[r])})(e,t)},function(e,t){function r(){this.constructor=e}n(e,t),e.prototype=null===t?Object.create(t):(r.prototype=t.prototype,new r)});Object.defineProperty(t,"__esModule",{value:!0});var s=r(0),o=r(25),a=r(336),u=r(801);t.ArrowContainer=u.ArrowContainer;var l=r(802),c=r(803),p=function(e){function t(t){var r=e.call(this,t)||this;return r.target=null,r.targetRect=null,r.targetPositionIntervalHandler=null,r.popoverDiv=null,r.positionOrder=null,r.willUnmount=!1,r.willMount=!1,r.onResize=function(e){r.renderPopover()},r.onClick=function(e){var t=r.props,n=t.onClickOutside,i=t.isOpen;r.willUnmount||r.willMount||r.popoverDiv.contains(e.target)||r.target.contains(e.target)||!n||!i||n(e)},r.state={popoverInfo:null},r.willUnmount=!1,r.willMount=!0,r}return i(t,e),t.prototype.componentDidMount=function(){var e=this;window.setTimeout((function(){return e.willMount=!1}));var t=this.props,r=t.position,n=t.isOpen;this.target=o.findDOMNode(this),this.positionOrder=this.getPositionPriorityOrder(r),this.updatePopover(n)},t.prototype.componentDidUpdate=function(e){null==this.target&&(this.target=o.findDOMNode(this));var t=e.isOpen,r=e.position,n=e.content,i=this.props,s=i.isOpen,a=i.content,u=i.position;this.positionOrder=this.getPositionPriorityOrder(this.props.position);var l=e.contentDestination!==this.props.contentDestination;(t!==s||n!==a||r!==u||l)&&(l&&(this.removePopover(),this.popoverDiv&&this.popoverDiv.remove()),this.updatePopover(s))},t.prototype.componentWillUnmount=function(){this.willUnmount=!0,this.removePopover()},t.prototype.render=function(){var e,t=this.props.content,r=this.state.popoverInfo,n=null;if(this.props.isOpen&&this.popoverDiv&&r){n=s.createElement(l.Portal,{element:this.popoverDiv,container:this.props.contentDestination||window.document.body},(e=r,"function"==typeof t?t(e):t))}return s.createElement(s.Fragment,null,this.props.children,n)},t.prototype.updatePopover=function(e){if(e&&null!=this.target){if(!this.popoverDiv||!this.popoverDiv.parentNode){var t=this.props.transitionDuration;this.popoverDiv=this.createContainer(),this.popoverDiv.style.opacity="0",this.popoverDiv.style.transition="opacity "+(t||a.Constants.FADE_TRANSITION)+"s"}window.addEventListener("resize",this.onResize),window.addEventListener("click",this.onClick),this.renderPopover()}else this.popoverDiv&&this.popoverDiv.parentNode&&this.removePopover()},t.prototype.renderPopover=function(e){var t=this;void 0===e&&(e=0),e>=this.positionOrder.length?this.removePopover():this.renderWithPosition({position:this.positionOrder[e],targetRect:this.target.getBoundingClientRect()},(function(r,n){var i,s=t.props,o=s.disableReposition,a=s.contentLocation;if(r&&!o&&"object"!=typeof a)t.renderPopover(e+1);else{var u=t.props,l=u.contentLocation,c=u.align,p=t.getNudgedPopoverPosition(n),f=p.top,d=p.left,h=n.top,m=n.left,y=t.positionOrder[e],g=o?{top:h,left:m}:{top:f,left:d},b=g.top,v=g.left;if(l){var E=t.target.getBoundingClientRect(),x=t.popoverDiv.getBoundingClientRect();b=(i="function"==typeof l?l({targetRect:E,popoverRect:x,position:y,align:c,nudgedLeft:d,nudgedTop:f}):l).top,v=i.left,t.popoverDiv.style.left=v.toFixed()+"px",t.popoverDiv.style.top=b.toFixed()+"px"}else{var S=0,T=0;if(t.props.contentDestination){var A=t.props.contentDestination.getBoundingClientRect();S=-A.top,T=-A.left}var D=[b+window.pageYOffset,v+window.pageXOffset],P=D[1]+S,w=D[0]+T;t.popoverDiv.style.left=P.toFixed()+"px",t.popoverDiv.style.top=w.toFixed()+"px"}t.popoverDiv.style.width=null,t.popoverDiv.style.height=null,t.renderWithPosition({position:y,nudgedTop:f-n.top,nudgedLeft:d-n.left,targetRect:t.target.getBoundingClientRect(),popoverRect:t.popoverDiv.getBoundingClientRect()},(function(){t.startTargetPositionListener(10),"1"!==t.popoverDiv.style.opacity&&(t.popoverDiv.style.opacity="1")}))}}))},t.prototype.startTargetPositionListener=function(e){var t=this;null===this.targetPositionIntervalHandler&&(this.targetPositionIntervalHandler=window.setInterval((function(){var e=t.target.getBoundingClientRect();t.targetPositionHasChanged(t.targetRect,e)&&t.renderPopover(),t.targetRect=e}),e))},t.prototype.renderWithPosition=function(e,t){var r=this,n=e.position,i=e.nudgedLeft,s=void 0===i?0:i,o=e.nudgedTop,u=void 0===o?0:o,l=e.targetRect,p=void 0===l?a.Constants.EMPTY_CLIENT_RECT:l,f=e.popoverRect,d=void 0===f?a.Constants.EMPTY_CLIENT_RECT:f,h=this.props,m=h.windowBorderPadding,y=(h.content,h.align),g={position:n,nudgedLeft:s,nudgedTop:u,targetRect:p,popoverRect:d,align:y};c.isEqual(this.state.popoverInfo,g)||this.setState({popoverInfo:g},(function(){if(!r.willUnmount){p=r.target.getBoundingClientRect(),d=r.popoverDiv.getBoundingClientRect();var e=r.getLocationForPosition(n,p,d),i=e.top,s=e.left;t("top"===n&&i<m||"left"===n&&s<m||"right"===n&&s+d.width>window.innerWidth-m||"bottom"===n&&i+d.height>window.innerHeight-m,{width:d.width,height:d.height,top:i,left:s})}}))},t.prototype.getNudgedPopoverPosition=function(e){var t=e.top,r=e.left,n=e.width,i=e.height,s=this.props.windowBorderPadding;return{top:t=(t=t<s?s:t)+i>window.innerHeight-s?window.innerHeight-s-i:t,left:r=(r=r<s?s:r)+n>window.innerWidth-s?window.innerWidth-s-n:r}},t.prototype.removePopover=function(){var e=this;if(this.popoverDiv){var t=this.props.transitionDuration;this.popoverDiv.style.opacity="0";var r=function(){!e.willUnmount&&e.props.isOpen&&e.popoverDiv.parentNode||(window.clearInterval(e.targetPositionIntervalHandler),window.removeEventListener("resize",e.onResize),window.removeEventListener("click",e.onClick),e.targetPositionIntervalHandler=null)};this.willUnmount?r():window.setTimeout(r,1e3*(t||a.Constants.FADE_TRANSITION))}},t.prototype.getPositionPriorityOrder=function(e){if(e&&"string"!=typeof e){if(a.Constants.DEFAULT_POSITIONS.every((function(t){return void 0!==e.find((function(e){return e===t}))})))return a.arrayUnique(e);var t=a.Constants.DEFAULT_POSITIONS.filter((function(t){return void 0===e.find((function(e){return e===t}))}));return a.arrayUnique(e.concat(t))}if(e&&"string"==typeof e){t=a.Constants.DEFAULT_POSITIONS.filter((function(t){return t!==e}));return a.arrayUnique([e].concat(t))}},t.prototype.createContainer=function(){var e=this.props,t=e.containerStyle,r=e.containerClassName,n=window.document.createElement("div");return n.style.overflow="hidden",t&&Object.keys(t).forEach((function(e){return n.style[e]=t[e]})),n.className=r,n.style.position="absolute",n.style.top="0",n.style.left="0",n},t.prototype.getLocationForPosition=function(e,t,r){var n,i,s=this.props,o=s.padding,a=s.align,u=t.left+t.width/2,l=t.top+t.height/2;switch(e){case"top":n=t.top-r.height-o,i=u-r.width/2,"start"===a&&(i=t.left),"end"===a&&(i=t.right-r.width);break;case"left":n=l-r.height/2,i=t.left-o-r.width,"start"===a&&(n=t.top),"end"===a&&(n=t.bottom-r.height);break;case"bottom":n=t.bottom+o,i=u-r.width/2,"start"===a&&(i=t.left),"end"===a&&(i=t.right-r.width);break;case"right":n=l-r.height/2,i=t.right+o,"start"===a&&(n=t.top),"end"===a&&(n=t.bottom-r.height)}return{top:n,left:i}},t.prototype.targetPositionHasChanged=function(e,t){return null===e||e.left!==t.left||e.top!==t.top||e.width!==t.width||e.height!==t.height},t.defaultProps={padding:a.Constants.DEFAULT_PADDING,windowBorderPadding:a.Constants.DEFAULT_WINDOW_PADDING,position:["top","right","left","bottom"],align:"center",containerClassName:a.Constants.POPOVER_CONTAINER_CLASS_NAME},t}(s.Component);t.default=p},function(e,t,r){"use strict";var n=this&&this.__assign||function(){return(n=Object.assign||function(e){for(var t,r=1,n=arguments.length;r<n;r++)for(var i in t=arguments[r])Object.prototype.hasOwnProperty.call(t,i)&&(e[i]=t[i]);return e}).apply(this,arguments)};Object.defineProperty(t,"__esModule",{value:!0});var i=r(0),s=r(336);t.ArrowContainer=function(e){var t=e.position,r=e.children,o=e.style,a=e.arrowColor,u=void 0===a?s.Constants.DEFAULT_ARROW_COLOR:a,l=e.arrowSize,c=void 0===l?10:l,p=e.arrowStyle,f=e.popoverRect,d=e.targetRect;return i.createElement("div",{style:n({paddingLeft:"right"===t?c:0,paddingTop:"bottom"===t?c:0,paddingBottom:"top"===t?c:0,paddingRight:"left"===t?c:0},o)},i.createElement("div",{style:n({position:"absolute"},function(){var e=2*c,r=d.top-f.top+d.height/2-e/2,n=d.left-f.left+d.width/2-e/2;switch(n=(n=n<0?0:n)+e>f.width?f.width-e:n,r=(r=r<0?0:r)+e>f.height?f.height-e:r,t){case"right":return{borderTop:c+"px solid transparent",borderBottom:c+"px solid transparent",borderRight:c+"px solid "+u,left:0,top:r};case"left":return{borderTop:c+"px solid transparent",borderBottom:c+"px solid transparent",borderLeft:c+"px solid "+u,right:0,top:r};case"bottom":return{borderLeft:c+"px solid transparent",borderRight:c+"px solid transparent",borderBottom:c+"px solid "+u,top:0,left:n};case"top":default:return{borderLeft:c+"px solid transparent",borderRight:c+"px solid transparent",borderTop:c+"px solid "+u,bottom:0,left:n}}}(),p)}),r)}},function(e,t,r){"use strict";var n,i=this&&this.__extends||(n=function(e,t){return(n=Object.setPrototypeOf||{__proto__:[]}instanceof Array&&function(e,t){e.__proto__=t}||function(e,t){for(var r in t)t.hasOwnProperty(r)&&(e[r]=t[r])})(e,t)},function(e,t){function r(){this.constructor=e}n(e,t),e.prototype=null===t?Object.create(t):(r.prototype=t.prototype,new r)});Object.defineProperty(t,"__esModule",{value:!0});var s=r(0),o=r(25),a=function(e){function t(t){return e.call(this,t)||this}return i(t,e),t.prototype.componentDidMount=function(){this.props.container.appendChild(this.props.element)},t.prototype.componentWillUnmount=function(){this.props.container.removeChild(this.props.element)},t.prototype.render=function(){var e=this.props.children;return o.createPortal(e,this.props.element)},t}(s.PureComponent);t.Portal=a},function(e,t,r){"use strict";r.r(t),r.d(t,"default",(function(){return Er})),r.d(t,"VERSION",(function(){return i.e})),r.d(t,"restArguments",(function(){return s})),r.d(t,"isObject",(function(){return o})),r.d(t,"isNull",(function(){return a})),r.d(t,"isUndefined",(function(){return u})),r.d(t,"isBoolean",(function(){return l})),r.d(t,"isElement",(function(){return c})),r.d(t,"isString",(function(){return f})),r.d(t,"isNumber",(function(){return d})),r.d(t,"isDate",(function(){return h})),r.d(t,"isRegExp",(function(){return m})),r.d(t,"isError",(function(){return y})),r.d(t,"isSymbol",(function(){return g})),r.d(t,"isArrayBuffer",(function(){return b})),r.d(t,"isDataView",(function(){return P})),r.d(t,"isArray",(function(){return w})),r.d(t,"isFunction",(function(){return x})),r.d(t,"isArguments",(function(){return _})),r.d(t,"isFinite",(function(){return j})),r.d(t,"isNaN",(function(){return k})),r.d(t,"isTypedArray",(function(){return R})),r.d(t,"isEmpty",(function(){return K})),r.d(t,"isMatch",(function(){return q})),r.d(t,"isEqual",(function(){return $})),r.d(t,"isMap",(function(){return ne})),r.d(t,"isWeakMap",(function(){return ie})),r.d(t,"isSet",(function(){return se})),r.d(t,"isWeakSet",(function(){return oe})),r.d(t,"keys",(function(){return W})),r.d(t,"allKeys",(function(){return z})),r.d(t,"values",(function(){return ae})),r.d(t,"pairs",(function(){return ue})),r.d(t,"invert",(function(){return le})),r.d(t,"functions",(function(){return ce})),r.d(t,"methods",(function(){return ce})),r.d(t,"extend",(function(){return fe})),r.d(t,"extendOwn",(function(){return de})),r.d(t,"assign",(function(){return de})),r.d(t,"defaults",(function(){return he})),r.d(t,"create",(function(){return ye})),r.d(t,"clone",(function(){return ge})),r.d(t,"tap",(function(){return be})),r.d(t,"get",(function(){return Se})),r.d(t,"has",(function(){return Te})),r.d(t,"mapObject",(function(){return je})),r.d(t,"identity",(function(){return Ae})),r.d(t,"constant",(function(){return F})),r.d(t,"noop",(function(){return ke})),r.d(t,"toPath",(function(){return ve})),r.d(t,"property",(function(){return Pe})),r.d(t,"propertyOf",(function(){return Fe})),r.d(t,"matcher",(function(){return De})),r.d(t,"matches",(function(){return De})),r.d(t,"times",(function(){return Ne})),r.d(t,"random",(function(){return Ie})),r.d(t,"now",(function(){return Me})),r.d(t,"escape",(function(){return Re})),r.d(t,"unescape",(function(){return Ue})),r.d(t,"templateSettings",(function(){return Ve})),r.d(t,"template",(function(){return Je})),r.d(t,"result",(function(){return Xe})),r.d(t,"uniqueId",(function(){return ze})),r.d(t,"chain",(function(){return Ye})),r.d(t,"iteratee",(function(){return Oe})),r.d(t,"partial",(function(){return Ze})),r.d(t,"bind",(function(){return et})),r.d(t,"bindAll",(function(){return nt})),r.d(t,"memoize",(function(){return it})),r.d(t,"delay",(function(){return st})),r.d(t,"defer",(function(){return ot})),r.d(t,"throttle",(function(){return at})),r.d(t,"debounce",(function(){return ut})),r.d(t,"wrap",(function(){return lt})),r.d(t,"negate",(function(){return ct})),r.d(t,"compose",(function(){return pt})),r.d(t,"after",(function(){return ft})),r.d(t,"before",(function(){return dt})),r.d(t,"once",(function(){return ht})),r.d(t,"findKey",(function(){return mt})),r.d(t,"findIndex",(function(){return gt})),r.d(t,"findLastIndex",(function(){return bt})),r.d(t,"sortedIndex",(function(){return vt})),r.d(t,"indexOf",(function(){return xt})),r.d(t,"lastIndexOf",(function(){return St})),r.d(t,"find",(function(){return Tt})),r.d(t,"detect",(function(){return Tt})),r.d(t,"findWhere",(function(){return At})),r.d(t,"each",(function(){return Dt})),r.d(t,"forEach",(function(){return Dt})),r.d(t,"map",(function(){return Pt})),r.d(t,"collect",(function(){return Pt})),r.d(t,"reduce",(function(){return Ct})),r.d(t,"foldl",(function(){return Ct})),r.d(t,"inject",(function(){return Ct})),r.d(t,"reduceRight",(function(){return Ot})),r.d(t,"foldr",(function(){return Ot})),r.d(t,"filter",(function(){return _t})),r.d(t,"select",(function(){return _t})),r.d(t,"reject",(function(){return jt})),r.d(t,"every",(function(){return kt})),r.d(t,"all",(function(){return kt})),r.d(t,"some",(function(){return Ft})),r.d(t,"any",(function(){return Ft})),r.d(t,"contains",(function(){return Nt})),r.d(t,"includes",(function(){return Nt})),r.d(t,"include",(function(){return Nt})),r.d(t,"invoke",(function(){return It})),r.d(t,"pluck",(function(){return Mt})),r.d(t,"where",(function(){return Bt})),r.d(t,"max",(function(){return Lt})),r.d(t,"min",(function(){return Rt})),r.d(t,"shuffle",(function(){return Vt})),r.d(t,"sample",(function(){return Ut})),r.d(t,"sortBy",(function(){return Wt})),r.d(t,"groupBy",(function(){return qt})),r.d(t,"indexBy",(function(){return Gt})),r.d(t,"countBy",(function(){return Jt})),r.d(t,"partition",(function(){return Xt})),r.d(t,"toArray",(function(){return zt})),r.d(t,"size",(function(){return Yt})),r.d(t,"pick",(function(){return Qt})),r.d(t,"omit",(function(){return Zt})),r.d(t,"first",(function(){return tr})),r.d(t,"head",(function(){return tr})),r.d(t,"take",(function(){return tr})),r.d(t,"initial",(function(){return er})),r.d(t,"last",(function(){return nr})),r.d(t,"rest",(function(){return rr})),r.d(t,"tail",(function(){return rr})),r.d(t,"drop",(function(){return rr})),r.d(t,"compact",(function(){return ir})),r.d(t,"flatten",(function(){return sr})),r.d(t,"without",(function(){return ar})),r.d(t,"uniq",(function(){return ur})),r.d(t,"unique",(function(){return ur})),r.d(t,"union",(function(){return lr})),r.d(t,"intersection",(function(){return cr})),r.d(t,"difference",(function(){return or})),r.d(t,"unzip",(function(){return pr})),r.d(t,"transpose",(function(){return pr})),r.d(t,"zip",(function(){return fr})),r.d(t,"object",(function(){return dr})),r.d(t,"range",(function(){return hr})),r.d(t,"chunk",(function(){return mr})),r.d(t,"mixin",(function(){return gr}));var n={};r.r(n),r.d(n,"VERSION",(function(){return i.e})),r.d(n,"restArguments",(function(){return s})),r.d(n,"isObject",(function(){return o})),r.d(n,"isNull",(function(){return a})),r.d(n,"isUndefined",(function(){return u})),r.d(n,"isBoolean",(function(){return l})),r.d(n,"isElement",(function(){return c})),r.d(n,"isString",(function(){return f})),r.d(n,"isNumber",(function(){return d})),r.d(n,"isDate",(function(){return h})),r.d(n,"isRegExp",(function(){return m})),r.d(n,"isError",(function(){return y})),r.d(n,"isSymbol",(function(){return g})),r.d(n,"isArrayBuffer",(function(){return b})),r.d(n,"isDataView",(function(){return P})),r.d(n,"isArray",(function(){return w})),r.d(n,"isFunction",(function(){return x})),r.d(n,"isArguments",(function(){return _})),r.d(n,"isFinite",(function(){return j})),r.d(n,"isNaN",(function(){return k})),r.d(n,"isTypedArray",(function(){return R})),r.d(n,"isEmpty",(function(){return K})),r.d(n,"isMatch",(function(){return q})),r.d(n,"isEqual",(function(){return $})),r.d(n,"isMap",(function(){return ne})),r.d(n,"isWeakMap",(function(){return ie})),r.d(n,"isSet",(function(){return se})),r.d(n,"isWeakSet",(function(){return oe})),r.d(n,"keys",(function(){return W})),r.d(n,"allKeys",(function(){return z})),r.d(n,"values",(function(){return ae})),r.d(n,"pairs",(function(){return ue})),r.d(n,"invert",(function(){return le})),r.d(n,"functions",(function(){return ce})),r.d(n,"methods",(function(){return ce})),r.d(n,"extend",(function(){return fe})),r.d(n,"extendOwn",(function(){return de})),r.d(n,"assign",(function(){return de})),r.d(n,"defaults",(function(){return he})),r.d(n,"create",(function(){return ye})),r.d(n,"clone",(function(){return ge})),r.d(n,"tap",(function(){return be})),r.d(n,"get",(function(){return Se})),r.d(n,"has",(function(){return Te})),r.d(n,"mapObject",(function(){return je})),r.d(n,"identity",(function(){return Ae})),r.d(n,"constant",(function(){return F})),r.d(n,"noop",(function(){return ke})),r.d(n,"toPath",(function(){return ve})),r.d(n,"property",(function(){return Pe})),r.d(n,"propertyOf",(function(){return Fe})),r.d(n,"matcher",(function(){return De})),r.d(n,"matches",(function(){return De})),r.d(n,"times",(function(){return Ne})),r.d(n,"random",(function(){return Ie})),r.d(n,"now",(function(){return Me})),r.d(n,"escape",(function(){return Re})),r.d(n,"unescape",(function(){return Ue})),r.d(n,"templateSettings",(function(){return Ve})),r.d(n,"template",(function(){return Je})),r.d(n,"result",(function(){return Xe})),r.d(n,"uniqueId",(function(){return ze})),r.d(n,"chain",(function(){return Ye})),r.d(n,"iteratee",(function(){return Oe})),r.d(n,"partial",(function(){return Ze})),r.d(n,"bind",(function(){return et})),r.d(n,"bindAll",(function(){return nt})),r.d(n,"memoize",(function(){return it})),r.d(n,"delay",(function(){return st})),r.d(n,"defer",(function(){return ot})),r.d(n,"throttle",(function(){return at})),r.d(n,"debounce",(function(){return ut})),r.d(n,"wrap",(function(){return lt})),r.d(n,"negate",(function(){return ct})),r.d(n,"compose",(function(){return pt})),r.d(n,"after",(function(){return ft})),r.d(n,"before",(function(){return dt})),r.d(n,"once",(function(){return ht})),r.d(n,"findKey",(function(){return mt})),r.d(n,"findIndex",(function(){return gt})),r.d(n,"findLastIndex",(function(){return bt})),r.d(n,"sortedIndex",(function(){return vt})),r.d(n,"indexOf",(function(){return xt})),r.d(n,"lastIndexOf",(function(){return St})),r.d(n,"find",(function(){return Tt})),r.d(n,"detect",(function(){return Tt})),r.d(n,"findWhere",(function(){return At})),r.d(n,"each",(function(){return Dt})),r.d(n,"forEach",(function(){return Dt})),r.d(n,"map",(function(){return Pt})),r.d(n,"collect",(function(){return Pt})),r.d(n,"reduce",(function(){return Ct})),r.d(n,"foldl",(function(){return Ct})),r.d(n,"inject",(function(){return Ct})),r.d(n,"reduceRight",(function(){return Ot})),r.d(n,"foldr",(function(){return Ot})),r.d(n,"filter",(function(){return _t})),r.d(n,"select",(function(){return _t})),r.d(n,"reject",(function(){return jt})),r.d(n,"every",(function(){return kt})),r.d(n,"all",(function(){return kt})),r.d(n,"some",(function(){return Ft})),r.d(n,"any",(function(){return Ft})),r.d(n,"contains",(function(){return Nt})),r.d(n,"includes",(function(){return Nt})),r.d(n,"include",(function(){return Nt})),r.d(n,"invoke",(function(){return It})),r.d(n,"pluck",(function(){return Mt})),r.d(n,"where",(function(){return Bt})),r.d(n,"max",(function(){return Lt})),r.d(n,"min",(function(){return Rt})),r.d(n,"shuffle",(function(){return Vt})),r.d(n,"sample",(function(){return Ut})),r.d(n,"sortBy",(function(){return Wt})),r.d(n,"groupBy",(function(){return qt})),r.d(n,"indexBy",(function(){return Gt})),r.d(n,"countBy",(function(){return Jt})),r.d(n,"partition",(function(){return Xt})),r.d(n,"toArray",(function(){return zt})),r.d(n,"size",(function(){return Yt})),r.d(n,"pick",(function(){return Qt})),r.d(n,"omit",(function(){return Zt})),r.d(n,"first",(function(){return tr})),r.d(n,"head",(function(){return tr})),r.d(n,"take",(function(){return tr})),r.d(n,"initial",(function(){return er})),r.d(n,"last",(function(){return nr})),r.d(n,"rest",(function(){return rr})),r.d(n,"tail",(function(){return rr})),r.d(n,"drop",(function(){return rr})),r.d(n,"compact",(function(){return ir})),r.d(n,"flatten",(function(){return sr})),r.d(n,"without",(function(){return ar})),r.d(n,"uniq",(function(){return ur})),r.d(n,"unique",(function(){return ur})),r.d(n,"union",(function(){return lr})),r.d(n,"intersection",(function(){return cr})),r.d(n,"difference",(function(){return or})),r.d(n,"unzip",(function(){return pr})),r.d(n,"transpose",(function(){return pr})),r.d(n,"zip",(function(){return fr})),r.d(n,"object",(function(){return dr})),r.d(n,"range",(function(){return hr})),r.d(n,"chunk",(function(){return mr})),r.d(n,"mixin",(function(){return gr})),r.d(n,"default",(function(){return br}));var i=r(95);function s(e,t){return t=null==t?e.length-1:+t,function(){for(var r=Math.max(arguments.length-t,0),n=Array(r),i=0;i<r;i++)n[i]=arguments[i+t];switch(t){case 0:return e.call(this,n);case 1:return e.call(this,arguments[0],n);case 2:return e.call(this,arguments[0],arguments[1],n)}var s=Array(t+1);for(i=0;i<t;i++)s[i]=arguments[i];return s[t]=n,e.apply(this,s)}}function o(e){var t=typeof e;return"function"===t||"object"===t&&!!e}function a(e){return null===e}function u(e){return void 0===e}function l(e){return!0===e||!1===e||"[object Boolean]"===i.t.call(e)}function c(e){return!(!e||1!==e.nodeType)}function p(e){var t="[object "+e+"]";return function(e){return i.t.call(e)===t}}var f=p("String"),d=p("Number"),h=p("Date"),m=p("RegExp"),y=p("Error"),g=p("Symbol"),b=p("ArrayBuffer"),v=p("Function"),E=i.p.document&&i.p.document.childNodes;"object"!=typeof Int8Array&&"function"!=typeof E&&(v=function(e){return"function"==typeof e||!1});var x=v,S=p("Object"),T=i.s&&S(new DataView(new ArrayBuffer(8))),A="undefined"!=typeof Map&&S(new Map),D=p("DataView");var P=T?function(e){return null!=e&&x(e.getInt8)&&b(e.buffer)}:D,w=i.k||p("Array");function C(e,t){return null!=e&&i.i.call(e,t)}var O=p("Arguments");!function(){O(arguments)||(O=function(e){return C(e,"callee")})}();var _=O;function j(e){return!g(e)&&Object(i.f)(e)&&!isNaN(parseFloat(e))}function k(e){return d(e)&&Object(i.g)(e)}function F(e){return function(){return e}}function N(e){return function(t){var r=e(t);return"number"==typeof r&&r>=0&&r<=i.b}}function I(e){return function(t){return null==t?void 0:t[e]}}var M=I("byteLength"),B=N(M),L=/\[object ((I|Ui)nt(8|16|32)|Float(32|64)|Uint8Clamped|Big(I|Ui)nt64)Array\]/;var R=i.r?function(e){return i.l?Object(i.l)(e)&&!P(e):B(e)&&L.test(i.t.call(e))}:F(!1),U=I("length");function V(e,t){t=function(e){for(var t={},r=e.length,n=0;n<r;++n)t[e[n]]=!0;return{contains:function(e){return t[e]},push:function(r){return t[r]=!0,e.push(r)}}}(t);var r=i.n.length,n=e.constructor,s=x(n)&&n.prototype||i.c,o="constructor";for(C(e,o)&&!t.contains(o)&&t.push(o);r--;)(o=i.n[r])in e&&e[o]!==s[o]&&!t.contains(o)&&t.push(o)}function W(e){if(!o(e))return[];if(i.m)return Object(i.m)(e);var t=[];for(var r in e)C(e,r)&&t.push(r);return i.h&&V(e,t),t}function K(e){if(null==e)return!0;var t=U(e);return"number"==typeof t&&(w(e)||f(e)||_(e))?0===t:0===U(W(e))}function q(e,t){var r=W(t),n=r.length;if(null==e)return!n;for(var i=Object(e),s=0;s<n;s++){var o=r[s];if(t[o]!==i[o]||!(o in i))return!1}return!0}function G(e){return e instanceof G?e:this instanceof G?void(this._wrapped=e):new G(e)}function J(e){return new Uint8Array(e.buffer||e,e.byteOffset||0,M(e))}G.VERSION=i.e,G.prototype.value=function(){return this._wrapped},G.prototype.valueOf=G.prototype.toJSON=G.prototype.value,G.prototype.toString=function(){return String(this._wrapped)};function X(e,t,r,n){if(e===t)return 0!==e||1/e==1/t;if(null==e||null==t)return!1;if(e!=e)return t!=t;var s=typeof e;return("function"===s||"object"===s||"object"==typeof t)&&function e(t,r,n,s){t instanceof G&&(t=t._wrapped);r instanceof G&&(r=r._wrapped);var o=i.t.call(t);if(o!==i.t.call(r))return!1;if(T&&"[object Object]"==o&&P(t)){if(!P(r))return!1;o="[object DataView]"}switch(o){case"[object RegExp]":case"[object String]":return""+t==""+r;case"[object Number]":return+t!=+t?+r!=+r:0==+t?1/+t==1/r:+t==+r;case"[object Date]":case"[object Boolean]":return+t==+r;case"[object Symbol]":return i.d.valueOf.call(t)===i.d.valueOf.call(r);case"[object ArrayBuffer]":case"[object DataView]":return e(J(t),J(r),n,s)}var a="[object Array]"===o;if(!a&&R(t)){if(M(t)!==M(r))return!1;if(t.buffer===r.buffer&&t.byteOffset===r.byteOffset)return!0;a=!0}if(!a){if("object"!=typeof t||"object"!=typeof r)return!1;var u=t.constructor,l=r.constructor;if(u!==l&&!(x(u)&&u instanceof u&&x(l)&&l instanceof l)&&"constructor"in t&&"constructor"in r)return!1}s=s||[];var c=(n=n||[]).length;for(;c--;)if(n[c]===t)return s[c]===r;if(n.push(t),s.push(r),a){if((c=t.length)!==r.length)return!1;for(;c--;)if(!X(t[c],r[c],n,s))return!1}else{var p,f=W(t);if(c=f.length,W(r).length!==c)return!1;for(;c--;)if(p=f[c],!C(r,p)||!X(t[p],r[p],n,s))return!1}return n.pop(),s.pop(),!0}(e,t,r,n)}function $(e,t){return X(e,t)}function z(e){if(!o(e))return[];var t=[];for(var r in e)t.push(r);return i.h&&V(e,t),t}function Y(e){var t=U(e);return function(r){if(null==r)return!1;var n=z(r);if(U(n))return!1;for(var i=0;i<t;i++)if(!x(r[e[i]]))return!1;return e!==te||!x(r[H])}}var H="forEach",Q=["clear","delete"],Z=["get","has","set"],ee=Q.concat(H,Z),te=Q.concat(Z),re=["add"].concat(Q,H,"has"),ne=A?Y(ee):p("Map"),ie=A?Y(te):p("WeakMap"),se=A?Y(re):p("Set"),oe=p("WeakSet");function ae(e){for(var t=W(e),r=t.length,n=Array(r),i=0;i<r;i++)n[i]=e[t[i]];return n}function ue(e){for(var t=W(e),r=t.length,n=Array(r),i=0;i<r;i++)n[i]=[t[i],e[t[i]]];return n}function le(e){for(var t={},r=W(e),n=0,i=r.length;n<i;n++)t[e[r[n]]]=r[n];return t}function ce(e){var t=[];for(var r in e)x(e[r])&&t.push(r);return t.sort()}function pe(e,t){return function(r){var n=arguments.length;if(t&&(r=Object(r)),n<2||null==r)return r;for(var i=1;i<n;i++)for(var s=arguments[i],o=e(s),a=o.length,u=0;u<a;u++){var l=o[u];t&&void 0!==r[l]||(r[l]=s[l])}return r}}var fe=pe(z),de=pe(W),he=pe(z,!0);function me(e){if(!o(e))return{};if(i.j)return Object(i.j)(e);var t=function(){};t.prototype=e;var r=new t;return t.prototype=null,r}function ye(e,t){var r=me(e);return t&&de(r,t),r}function ge(e){return o(e)?w(e)?e.slice():fe({},e):e}function be(e,t){return t(e),e}function ve(e){return w(e)?e:[e]}function Ee(e){return G.toPath(e)}function xe(e,t){for(var r=t.length,n=0;n<r;n++){if(null==e)return;e=e[t[n]]}return r?e:void 0}function Se(e,t,r){var n=xe(e,Ee(t));return u(n)?r:n}function Te(e,t){for(var r=(t=Ee(t)).length,n=0;n<r;n++){var i=t[n];if(!C(e,i))return!1;e=e[i]}return!!r}function Ae(e){return e}function De(e){return e=de({},e),function(t){return q(t,e)}}function Pe(e){return e=Ee(e),function(t){return xe(t,e)}}function we(e,t,r){if(void 0===t)return e;switch(null==r?3:r){case 1:return function(r){return e.call(t,r)};case 3:return function(r,n,i){return e.call(t,r,n,i)};case 4:return function(r,n,i,s){return e.call(t,r,n,i,s)}}return function(){return e.apply(t,arguments)}}function Ce(e,t,r){return null==e?Ae:x(e)?we(e,t,r):o(e)&&!w(e)?De(e):Pe(e)}function Oe(e,t){return Ce(e,t,1/0)}function _e(e,t,r){return G.iteratee!==Oe?G.iteratee(e,t):Ce(e,t,r)}function je(e,t,r){t=_e(t,r);for(var n=W(e),i=n.length,s={},o=0;o<i;o++){var a=n[o];s[a]=t(e[a],a,e)}return s}function ke(){}function Fe(e){return null==e?ke:function(t){return Se(e,t)}}function Ne(e,t,r){var n=Array(Math.max(0,e));t=we(t,r,1);for(var i=0;i<e;i++)n[i]=t(i);return n}function Ie(e,t){return null==t&&(t=e,e=0),e+Math.floor(Math.random()*(t-e+1))}G.toPath=ve,G.iteratee=Oe;var Me=Date.now||function(){return(new Date).getTime()};function Be(e){var t=function(t){return e[t]},r="(?:"+W(e).join("|")+")",n=RegExp(r),i=RegExp(r,"g");return function(e){return e=null==e?"":""+e,n.test(e)?e.replace(i,t):e}}var Le={"&":"&amp;","<":"&lt;",">":"&gt;",'"':"&quot;","'":"&#x27;","`":"&#x60;"},Re=Be(Le),Ue=Be(le(Le)),Ve=G.templateSettings={evaluate:/<%([\s\S]+?)%>/g,interpolate:/<%=([\s\S]+?)%>/g,escape:/<%-([\s\S]+?)%>/g},We=/(.)^/,Ke={"'":"'","\\":"\\","\r":"r","\n":"n","\u2028":"u2028","\u2029":"u2029"},qe=/\\|'|\r|\n|\u2028|\u2029/g;function Ge(e){return"\\"+Ke[e]}function Je(e,t,r){!t&&r&&(t=r),t=he({},t,G.templateSettings);var n,i=RegExp([(t.escape||We).source,(t.interpolate||We).source,(t.evaluate||We).source].join("|")+"|$","g"),s=0,o="__p+='";e.replace(i,(function(t,r,n,i,a){return o+=e.slice(s,a).replace(qe,Ge),s=a+t.length,r?o+="'+\n((__t=("+r+"))==null?'':_.escape(__t))+\n'":n?o+="'+\n((__t=("+n+"))==null?'':__t)+\n'":i&&(o+="';\n"+i+"\n__p+='"),t})),o+="';\n",t.variable||(o="with(obj||{}){\n"+o+"}\n"),o="var __t,__p='',__j=Array.prototype.join,print=function(){__p+=__j.call(arguments,'');};\n"+o+"return __p;\n";try{n=new Function(t.variable||"obj","_",o)}catch(l){throw l.source=o,l}var a=function(e){return n.call(this,e,G)},u=t.variable||"obj";return a.source="function("+u+"){\n"+o+"}",a}function Xe(e,t,r){var n=(t=Ee(t)).length;if(!n)return x(r)?r.call(e):r;for(var i=0;i<n;i++){var s=null==e?void 0:e[t[i]];void 0===s&&(s=r,i=n),e=x(s)?s.call(e):s}return e}var $e=0;function ze(e){var t=++$e+"";return e?e+t:t}function Ye(e){var t=G(e);return t._chain=!0,t}function He(e,t,r,n,i){if(!(n instanceof t))return e.apply(r,i);var s=me(e.prototype),a=e.apply(s,i);return o(a)?a:s}var Qe=s((function(e,t){var r=Qe.placeholder,n=function(){for(var i=0,s=t.length,o=Array(s),a=0;a<s;a++)o[a]=t[a]===r?arguments[i++]:t[a];for(;i<arguments.length;)o.push(arguments[i++]);return He(e,n,this,this,o)};return n}));Qe.placeholder=G;var Ze=Qe,et=s((function(e,t,r){if(!x(e))throw new TypeError("Bind must be called on a function");var n=s((function(i){return He(e,n,t,this,r.concat(i))}));return n})),tt=N(U);function rt(e,t,r,n){if(n=n||[],t||0===t){if(t<=0)return n.concat(e)}else t=1/0;for(var i=n.length,s=0,o=U(e);s<o;s++){var a=e[s];if(tt(a)&&(w(a)||_(a)))if(t>1)rt(a,t-1,r,n),i=n.length;else for(var u=0,l=a.length;u<l;)n[i++]=a[u++];else r||(n[i++]=a)}return n}var nt=s((function(e,t){var r=(t=rt(t,!1,!1)).length;if(r<1)throw new Error("bindAll must be passed function names");for(;r--;){var n=t[r];e[n]=et(e[n],e)}return e}));function it(e,t){var r=function(n){var i=r.cache,s=""+(t?t.apply(this,arguments):n);return C(i,s)||(i[s]=e.apply(this,arguments)),i[s]};return r.cache={},r}var st=s((function(e,t,r){return setTimeout((function(){return e.apply(null,r)}),t)})),ot=Ze(st,G,1);function at(e,t,r){var n,i,s,o,a=0;r||(r={});var u=function(){a=!1===r.leading?0:Me(),n=null,o=e.apply(i,s),n||(i=s=null)},l=function(){var l=Me();a||!1!==r.leading||(a=l);var c=t-(l-a);return i=this,s=arguments,c<=0||c>t?(n&&(clearTimeout(n),n=null),a=l,o=e.apply(i,s),n||(i=s=null)):n||!1===r.trailing||(n=setTimeout(u,c)),o};return l.cancel=function(){clearTimeout(n),a=0,n=i=s=null},l}function ut(e,t,r){var n,i,o=function(t,r){n=null,r&&(i=e.apply(t,r))},a=s((function(s){if(n&&clearTimeout(n),r){var a=!n;n=setTimeout(o,t),a&&(i=e.apply(this,s))}else n=st(o,t,this,s);return i}));return a.cancel=function(){clearTimeout(n),n=null},a}function lt(e,t){return Ze(t,e)}function ct(e){return function(){return!e.apply(this,arguments)}}function pt(){var e=arguments,t=e.length-1;return function(){for(var r=t,n=e[t].apply(this,arguments);r--;)n=e[r].call(this,n);return n}}function ft(e,t){return function(){if(--e<1)return t.apply(this,arguments)}}function dt(e,t){var r;return function(){return--e>0&&(r=t.apply(this,arguments)),e<=1&&(t=null),r}}var ht=Ze(dt,2);function mt(e,t,r){t=_e(t,r);for(var n,i=W(e),s=0,o=i.length;s<o;s++)if(t(e[n=i[s]],n,e))return n}function yt(e){return function(t,r,n){r=_e(r,n);for(var i=U(t),s=e>0?0:i-1;s>=0&&s<i;s+=e)if(r(t[s],s,t))return s;return-1}}var gt=yt(1),bt=yt(-1);function vt(e,t,r,n){for(var i=(r=_e(r,n,1))(t),s=0,o=U(e);s<o;){var a=Math.floor((s+o)/2);r(e[a])<i?s=a+1:o=a}return s}function Et(e,t,r){return function(n,s,o){var a=0,u=U(n);if("number"==typeof o)e>0?a=o>=0?o:Math.max(o+u,a):u=o>=0?Math.min(o+1,u):o+u+1;else if(r&&o&&u)return n[o=r(n,s)]===s?o:-1;if(s!=s)return(o=t(i.q.call(n,a,u),k))>=0?o+a:-1;for(o=e>0?a:u-1;o>=0&&o<u;o+=e)if(n[o]===s)return o;return-1}}var xt=Et(1,gt,vt),St=Et(-1,bt);function Tt(e,t,r){var n=(tt(e)?gt:mt)(e,t,r);if(void 0!==n&&-1!==n)return e[n]}function At(e,t){return Tt(e,De(t))}function Dt(e,t,r){var n,i;if(t=we(t,r),tt(e))for(n=0,i=e.length;n<i;n++)t(e[n],n,e);else{var s=W(e);for(n=0,i=s.length;n<i;n++)t(e[s[n]],s[n],e)}return e}function Pt(e,t,r){t=_e(t,r);for(var n=!tt(e)&&W(e),i=(n||e).length,s=Array(i),o=0;o<i;o++){var a=n?n[o]:o;s[o]=t(e[a],a,e)}return s}function wt(e){var t=function(t,r,n,i){var s=!tt(t)&&W(t),o=(s||t).length,a=e>0?0:o-1;for(i||(n=t[s?s[a]:a],a+=e);a>=0&&a<o;a+=e){var u=s?s[a]:a;n=r(n,t[u],u,t)}return n};return function(e,r,n,i){var s=arguments.length>=3;return t(e,we(r,i,4),n,s)}}var Ct=wt(1),Ot=wt(-1);function _t(e,t,r){var n=[];return t=_e(t,r),Dt(e,(function(e,r,i){t(e,r,i)&&n.push(e)})),n}function jt(e,t,r){return _t(e,ct(_e(t)),r)}function kt(e,t,r){t=_e(t,r);for(var n=!tt(e)&&W(e),i=(n||e).length,s=0;s<i;s++){var o=n?n[s]:s;if(!t(e[o],o,e))return!1}return!0}function Ft(e,t,r){t=_e(t,r);for(var n=!tt(e)&&W(e),i=(n||e).length,s=0;s<i;s++){var o=n?n[s]:s;if(t(e[o],o,e))return!0}return!1}function Nt(e,t,r,n){return tt(e)||(e=ae(e)),("number"!=typeof r||n)&&(r=0),xt(e,t,r)>=0}var It=s((function(e,t,r){var n,i;return x(t)?i=t:(t=Ee(t),n=t.slice(0,-1),t=t[t.length-1]),Pt(e,(function(e){var s=i;if(!s){if(n&&n.length&&(e=xe(e,n)),null==e)return;s=e[t]}return null==s?s:s.apply(e,r)}))}));function Mt(e,t){return Pt(e,Pe(t))}function Bt(e,t){return _t(e,De(t))}function Lt(e,t,r){var n,i,s=-1/0,o=-1/0;if(null==t||"number"==typeof t&&"object"!=typeof e[0]&&null!=e)for(var a=0,u=(e=tt(e)?e:ae(e)).length;a<u;a++)null!=(n=e[a])&&n>s&&(s=n);else t=_e(t,r),Dt(e,(function(e,r,n){((i=t(e,r,n))>o||i===-1/0&&s===-1/0)&&(s=e,o=i)}));return s}function Rt(e,t,r){var n,i,s=1/0,o=1/0;if(null==t||"number"==typeof t&&"object"!=typeof e[0]&&null!=e)for(var a=0,u=(e=tt(e)?e:ae(e)).length;a<u;a++)null!=(n=e[a])&&n<s&&(s=n);else t=_e(t,r),Dt(e,(function(e,r,n){((i=t(e,r,n))<o||i===1/0&&s===1/0)&&(s=e,o=i)}));return s}function Ut(e,t,r){if(null==t||r)return tt(e)||(e=ae(e)),e[Ie(e.length-1)];var n=tt(e)?ge(e):ae(e),i=U(n);t=Math.max(Math.min(t,i),0);for(var s=i-1,o=0;o<t;o++){var a=Ie(o,s),u=n[o];n[o]=n[a],n[a]=u}return n.slice(0,t)}function Vt(e){return Ut(e,1/0)}function Wt(e,t,r){var n=0;return t=_e(t,r),Mt(Pt(e,(function(e,r,i){return{value:e,index:n++,criteria:t(e,r,i)}})).sort((function(e,t){var r=e.criteria,n=t.criteria;if(r!==n){if(r>n||void 0===r)return 1;if(r<n||void 0===n)return-1}return e.index-t.index})),"value")}function Kt(e,t){return function(r,n,i){var s=t?[[],[]]:{};return n=_e(n,i),Dt(r,(function(t,i){var o=n(t,i,r);e(s,t,o)})),s}}var qt=Kt((function(e,t,r){C(e,r)?e[r].push(t):e[r]=[t]})),Gt=Kt((function(e,t,r){e[r]=t})),Jt=Kt((function(e,t,r){C(e,r)?e[r]++:e[r]=1})),Xt=Kt((function(e,t,r){e[r?0:1].push(t)}),!0),$t=/[^\ud800-\udfff]|[\ud800-\udbff][\udc00-\udfff]|[\ud800-\udfff]/g;function zt(e){return e?w(e)?i.q.call(e):f(e)?e.match($t):tt(e)?Pt(e,Ae):ae(e):[]}function Yt(e){return null==e?0:tt(e)?e.length:W(e).length}function Ht(e,t,r){return t in r}var Qt=s((function(e,t){var r={},n=t[0];if(null==e)return r;x(n)?(t.length>1&&(n=we(n,t[1])),t=z(e)):(n=Ht,t=rt(t,!1,!1),e=Object(e));for(var i=0,s=t.length;i<s;i++){var o=t[i],a=e[o];n(a,o,e)&&(r[o]=a)}return r})),Zt=s((function(e,t){var r,n=t[0];return x(n)?(n=ct(n),t.length>1&&(r=t[1])):(t=Pt(rt(t,!1,!1),String),n=function(e,r){return!Nt(t,r)}),Qt(e,n,r)}));function er(e,t,r){return i.q.call(e,0,Math.max(0,e.length-(null==t||r?1:t)))}function tr(e,t,r){return null==e||e.length<1?null==t||r?void 0:[]:null==t||r?e[0]:er(e,e.length-t)}function rr(e,t,r){return i.q.call(e,null==t||r?1:t)}function nr(e,t,r){return null==e||e.length<1?null==t||r?void 0:[]:null==t||r?e[e.length-1]:rr(e,Math.max(0,e.length-t))}function ir(e){return _t(e,Boolean)}function sr(e,t){return rt(e,t,!1)}var or=s((function(e,t){return t=rt(t,!0,!0),_t(e,(function(e){return!Nt(t,e)}))})),ar=s((function(e,t){return or(e,t)}));function ur(e,t,r,n){l(t)||(n=r,r=t,t=!1),null!=r&&(r=_e(r,n));for(var i=[],s=[],o=0,a=U(e);o<a;o++){var u=e[o],c=r?r(u,o,e):u;t&&!r?(o&&s===c||i.push(u),s=c):r?Nt(s,c)||(s.push(c),i.push(u)):Nt(i,u)||i.push(u)}return i}var lr=s((function(e){return ur(rt(e,!0,!0))}));function cr(e){for(var t=[],r=arguments.length,n=0,i=U(e);n<i;n++){var s=e[n];if(!Nt(t,s)){var o;for(o=1;o<r&&Nt(arguments[o],s);o++);o===r&&t.push(s)}}return t}function pr(e){for(var t=e&&Lt(e,U).length||0,r=Array(t),n=0;n<t;n++)r[n]=Mt(e,n);return r}var fr=s(pr);function dr(e,t){for(var r={},n=0,i=U(e);n<i;n++)t?r[e[n]]=t[n]:r[e[n][0]]=e[n][1];return r}function hr(e,t,r){null==t&&(t=e||0,e=0),r||(r=t<e?-1:1);for(var n=Math.max(Math.ceil((t-e)/r),0),i=Array(n),s=0;s<n;s++,e+=r)i[s]=e;return i}function mr(e,t){if(null==t||t<1)return[];for(var r=[],n=0,s=e.length;n<s;)r.push(i.q.call(e,n,n+=t));return r}function yr(e,t){return e._chain?G(t).chain():t}function gr(e){return Dt(ce(e),(function(t){var r=G[t]=e[t];G.prototype[t]=function(){var e=[this._wrapped];return i.o.apply(e,arguments),yr(this,r.apply(G,e))}})),G}Dt(["pop","push","reverse","shift","sort","splice","unshift"],(function(e){var t=i.a[e];G.prototype[e]=function(){var r=this._wrapped;return null!=r&&(t.apply(r,arguments),"shift"!==e&&"splice"!==e||0!==r.length||delete r[0]),yr(this,r)}})),Dt(["concat","join","slice"],(function(e){var t=i.a[e];G.prototype[e]=function(){var e=this._wrapped;return null!=e&&(e=t.apply(e,arguments)),yr(this,e)}}));var br=G,vr=gr(n);vr._=vr;var Er=vr},,function(e,t,r){"use strict";var n=r(0),i=r.n(n),s=r(134),o=r(792),a=r.n(o),u=r(169),l=r(131);const c=(e,t,r,n)=>((e,t)=>{class r extends i.a.Component{componentDidCatch(e){t(e)}render(){return void 0===e?null:"function"==typeof e?i.a.createElement(e,null):e}}return r})(((e,t,r)=>{const n=Object(s.transformFromAstSync)(e,void 0,{presets:r?[a.a,...r]:[a.a],inputSourceMap:!1,sourceMaps:!1,comments:!1,filename:"file.tsx"}),o=n?n.code:"",u=Object.keys(t),l=Object.values(t);return new Function("React",...u,"return "+o)(i.a,...l)})(e,t,n),r);t.a=i.a.memo(({scope:e,code:t,setError:r,transformations:n,placeholder:s,minHeight:o,presets:a,className:p})=>{const[f,d]=i.a.useState({component:null});i.a.useEffect(()=>{((e,t,r,n,i,s)=>{try{const o=t.reduce((e,t)=>t(e),Object(u.a)(e));n({component:c(o,r,e=>{i(e.toString())},s)}),i(null)}catch(o){i(o.toString())}})(t,n,e,d,r,a)},[t]);const h=f.component,m=s;return i.a.createElement("div",Object.assign({},Object(l.f)({display:"flex",justifyContent:"center",alignItems:"baseline",flexWrap:"wrap",minHeight:(o||0)+"px",paddingTop:o?"16px":0,paddingBottom:o?"16px":0},p)),h?i.a.createElement(h,null):m?i.a.createElement(m,{height:o||32}):null)},(e,t)=>e.code===t.code)},function(e,t,r){"use strict";var n=r(0),i=r(800),s=r.n(i),o=r(131);const a=({enabled:e,children:t})=>e?n.createElement(s.a,{isOpen:e,position:"bottom",content:n.createElement("div",null,t)},n.createElement("div",null)):n.createElement(n.Fragment,null,t);t.a=({msg:e,code:t,isPopup:r,className:i})=>null===e?null:n.createElement(a,{enabled:Boolean(r)},n.createElement("div",Object.assign({},Object(o.f)({borderRadius:"5px",backgroundColor:"#892C21",whiteSpace:"pre",fontSize:"11px",fontFamily:"Consolas, Monaco, 'Andale Mono', 'Ubuntu Mono', monospace",color:"#FFF",padding:"16px",margin:(r?4:8)+"px 0px",overflowX:"scroll"},i)),t?Object(o.e)(e,t):Object(o.d)(e)))},function(e,t,r){"use strict";var n=r(0),i=r(452),s=r.n(i),o=r(454),a=r.n(o),u=r(169),l=r(247),c=r(131),p=r(187);const f=(e,t)=>{e({type:p.a.UpdateCode,payload:t})},d=(e,t,r,n,i,s)=>{const o={},{parsedProps:a,parsedProvider:l}=Object(u.b)(t,r,i);Object.keys(n).forEach(e=>{if(o[e]=n[e].value,s&&s[e]&&s[e].parse)o[e]=s[e].parse(a[e],n);else if(n[e].type===p.b.Date){const t=a[e].match(/^new\s*Date\(\s*"([0-9-T:.Z]+)"\s*\)$/);o[e]=t?t[1]:a[e]}else o[e]=a[e]}),e({type:p.a.Update,payload:{code:t,updatedPropValues:o,providerValue:l}})},h=(e,t,r,n)=>{e({type:p.a.UpdatePropsAndCode,payload:{code:t,updatedPropValues:{[r]:n}}})},m=(e,t,r)=>{e({type:p.a.UpdateProps,payload:{[t]:r}})};function y(e,t){switch(t.type){case p.a.UpdateCode:return Object.assign(Object.assign({},e),{code:t.payload,codeNoRecompile:""});case p.a.UpdateCodeAndProvider:return Object.assign(Object.assign({},e),{code:t.payload.code,providerValue:t.payload.providerValue,codeNoRecompile:""});case p.a.Update:return Object.assign(Object.assign({},e),{code:t.payload.code,providerValue:t.payload.providerValue,codeNoRecompile:"",props:Object(c.b)(e.props,t.payload.updatedPropValues)});case p.a.UpdatePropsAndCodeNoRecompile:return Object.assign(Object.assign({},e),{codeNoRecompile:t.payload.codeNoRecompile,props:Object(c.b)(e.props,t.payload.updatedPropValues)});case p.a.UpdateProps:return Object.assign(Object.assign({},e),{codeNoRecompile:"",props:Object(c.b)(e.props,t.payload)});case p.a.UpdatePropsAndCode:return Object.assign(Object.assign({},e),{code:t.payload.code,codeNoRecompile:"",props:Object(c.b)(e.props,t.payload.updatedPropValues)});case p.a.Reset:return Object.assign(Object.assign({},e),{code:t.payload.code,codeNoRecompile:"",props:t.payload.props,providerValue:t.payload.providerValue});default:return Object(c.a)()}}t.a=(e={})=>{const t=e.componentName?e.componentName:"",r=e.props?e.props:{},i=e.scope?e.scope:{},o=e.imports?e.imports:{},g=e.provider?e.provider:{value:void 0,parse:()=>{},generate:(e,t)=>t,imports:{}},b=e.onUpdate?e.onUpdate:()=>{},v=e.customProps?e.customProps:{},E=e.initialCode,[x,S]=Object(n.useState)(!1),[T,A]=Object(n.useState)({where:"",msg:null}),[D,P]=Object(n.useReducer)(y,{code:E||Object(l.d)({props:r,componentName:t,provider:g,providerValue:g.value,importsConfig:o,customProps:v}),codeNoRecompile:"",props:r,providerValue:g?g.value:void 0});Object(n.useEffect)(()=>{if(E&&!x){S(!0);try{d(P,E,t,r,g?g.parse:void 0,v)}catch(e){}}},[E]);const w=a()((e,r)=>{!x&&S(!0);const n=Object(l.d)({props:Object(c.b)(D.props,{[r]:e}),componentName:t,provider:g,providerValue:D.providerValue,importsConfig:o,customProps:v});((e,t,r,n)=>{e({type:p.a.UpdatePropsAndCodeNoRecompile,payload:{codeNoRecompile:t,updatedPropValues:{[r]:n}}})})(P,n,r,e),b({code:n})},200);return{compilerProps:{code:D.code,setError:e=>A({where:"__compiler",msg:e}),transformations:[e=>Object(u.c)(e,t,r)],scope:Object.assign(Object.assign({},i),{__reactViewOnChange:w})},knobProps:{state:D.props,error:T,set:(e,r)=>{try{!x&&S(!0);const n=Object(l.d)({props:Object(c.b)(D.props,{[r]:e}),componentName:t,provider:g,providerValue:D.providerValue,importsConfig:o,customProps:v});A({where:"",msg:null}),""!==D.codeNoRecompile?(f(P,D.codeNoRecompile),setTimeout(()=>{h(P,n,r,e),b({code:n})},0)):(h(P,n,r,e),b({code:n}))}catch(n){m(P,r,e),A({where:r,msg:n.toString()})}}},providerValue:D.providerValue,editorProps:{code:""!==D.codeNoRecompile?D.codeNoRecompile:D.code,onChange:e=>{try{d(P,e,t,r,g?g.parse:void 0,v),b({code:e})}catch(n){f(P,e)}}},errorProps:{msg:"__compiler"===T.where?T.msg:null,code:D.code},actions:{formatCode:()=>{f(P,Object(l.b)(D.code))},copyCode:()=>{s()(D.code)},copyUrl:()=>{s()(window.location.href)},reset:()=>{const e=0===Object.keys(r).length,n=g?g.value:void 0,i=e?E:Object(l.d)({props:r,componentName:t,provider:g,providerValue:n,importsConfig:o,customProps:v});((e,t,r,n)=>{e({type:p.a.Reset,payload:{code:t,props:n,providerValue:r}})})(P,i,n,r),b({code:i})},updateProvider:e=>{const r=Object(l.d)({props:Object(c.b)(D.props,{}),componentName:t,provider:g,providerValue:e,importsConfig:o,customProps:v});((e,t,r)=>{e({type:p.a.UpdateCodeAndProvider,payload:{code:t,providerValue:r}})})(P,r,e)},updateProp:(e,r)=>{try{const n=Object(l.d)({props:Object(c.b)(D.props,{[e]:r}),componentName:t,provider:g,providerValue:D.providerValue,importsConfig:o,customProps:v});A({where:"",msg:null}),h(P,n,e,r)}catch(n){m(P,e,r),A({where:e,msg:n.toString()})}}}}}},function(e,t,r){"use strict";var n=r(0),i=r(799),s=r.n(i),o=r(340),a=r(26);var u={plain:{fontSize:"14px",color:"#333",backgroundColor:"rgb(253, 253, 253)",fontFamily:"Consolas, Monaco, 'Andale Mono', 'Ubuntu Mono', monospace",margin:0},styles:[{types:["comment","punctuation"],style:{color:"rgb(170, 170, 170)"}},{types:["operator"],style:{color:"rgb(119, 119, 119)"}},{types:["builtin","variable","constant","number","char","symbol"],style:{color:"rgb(156, 93, 39)"}},{types:["function"],style:{color:"rgb(170, 55, 49)"}},{types:["string"],style:{color:"rgb(68, 140, 39)"}},{types:["tag"],style:{color:"rgb(75, 105, 198)"}},{types:["attr-name"],style:{color:"rgb(129, 144, 160)"}},{types:["selector"],style:{color:"rgb(122, 62, 157)"}},{types:["keyword"],style:{}},{types:["changed"],style:{color:"rgb(0, 0, 0)",backgroundColor:"rgb(255, 255, 221)"}},{types:["deleted"],style:{color:"rgb(0, 0, 0)",backgroundColor:"rgb(255, 221, 221)"}},{types:["inserted"],style:{color:"rgb(0, 0, 0)",backgroundColor:"rgb(221, 255, 221)"}}]},l=r(131);t.a=({code:e,transformToken:t,onChange:r,placeholder:i,language:c,theme:p,"data-testid":f,className:d})=>{const[h,m]=n.useState(!1),y=Object.assign(Object.assign({},p||u),{plain:Object.assign({whiteSpace:"break-spaces"},(p||u).plain)}),[g,b]=Object(l.g)(e,r);return n.createElement("div",Object.assign({"data-testid":f},Object(l.f)({boxSizing:"border-box",paddingLeft:"4px",paddingRight:"4px",maxWidth:"auto",overflow:"hidden",border:h?"1px solid #276EF1":"1px solid #CCC",borderRadius:"5px"},d)),n.createElement("style",{dangerouslySetInnerHTML:{__html:".npm__react-simple-code-editor__textarea { outline: none !important }"}}),n.createElement(s.a,{value:g||"",placeholder:i,highlight:e=>(({code:e,theme:t,transformToken:r,language:i})=>n.createElement(o.a,{Prism:a.a,code:e,theme:t,language:i||"jsx"},({tokens:e,getLineProps:t,getTokenProps:i})=>n.createElement(n.Fragment,null,e.map((e,s)=>n.createElement("div",Object.assign({key:s},t({line:e,key:s})),e.map((e,t)=>{const s=i({token:e,key:t});return r?r(s):n.createElement("span",Object.assign({key:t},s))}))))))({code:e,theme:y,transformToken:t,language:c}),onValueChange:e=>b(e),onFocus:()=>m(!0),onBlur:()=>m(!1),padding:8,style:y.plain}))}}])]);