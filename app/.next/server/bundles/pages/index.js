module.exports =
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
/******/ 		var threw = true;
/******/ 		try {
/******/ 			modules[moduleId].call(module.exports, module, module.exports, __webpack_require__);
/******/ 			threw = false;
/******/ 		} finally {
/******/ 			if(threw) delete installedModules[moduleId];
/******/ 		}
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
/******/ 	return __webpack_require__(__webpack_require__.s = 3);
/******/ })
/************************************************************************/
/******/ ({

/***/ "./components/DesktopContainer.js":
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0_react__ = __webpack_require__("react");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0_react___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_0_react__);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1_semantic_ui_react__ = __webpack_require__("semantic-ui-react");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1_semantic_ui_react___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_1_semantic_ui_react__);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2_next_head__ = __webpack_require__("next/head");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2_next_head___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_2_next_head__);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_3_next_link__ = __webpack_require__("next/link");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_3_next_link___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_3_next_link__);
var _jsxFileName = "/home/marco/nodejs/sci-ui-service-full-ethereum/app/components/DesktopContainer.js";

function _typeof(obj) { if (typeof Symbol === "function" && typeof Symbol.iterator === "symbol") { _typeof = function _typeof(obj) { return typeof obj; }; } else { _typeof = function _typeof(obj) { return obj && typeof Symbol === "function" && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj; }; } return _typeof(obj); }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } }

function _createClass(Constructor, protoProps, staticProps) { if (protoProps) _defineProperties(Constructor.prototype, protoProps); if (staticProps) _defineProperties(Constructor, staticProps); return Constructor; }

function _possibleConstructorReturn(self, call) { if (call && (_typeof(call) === "object" || typeof call === "function")) { return call; } return _assertThisInitialized(self); }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function"); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

function _assertThisInitialized(self) { if (self === void 0) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return self; }





/* Heads up!
 * Neither Semantic UI nor Semantic UI React offer a responsive navbar, however, it can be implemented easily.
 * It can be more complicated, but you can create really flexible markup.
 */

var DesktopContainer =
/*#__PURE__*/
function (_Component) {
  _inherits(DesktopContainer, _Component);

  function DesktopContainer() {
    var _ref;

    var _temp, _this;

    _classCallCheck(this, DesktopContainer);

    for (var _len = arguments.length, args = new Array(_len), _key = 0; _key < _len; _key++) {
      args[_key] = arguments[_key];
    }

    return _possibleConstructorReturn(_this, (_temp = _this = _possibleConstructorReturn(this, (_ref = DesktopContainer.__proto__ || Object.getPrototypeOf(DesktopContainer)).call.apply(_ref, [this].concat(args))), Object.defineProperty(_assertThisInitialized(_this), "state", {
      configurable: true,
      enumerable: true,
      writable: true,
      value: {}
    }), Object.defineProperty(_assertThisInitialized(_this), "hideFixedMenu", {
      configurable: true,
      enumerable: true,
      writable: true,
      value: function value() {
        return _this.setState({
          fixed: false
        });
      }
    }), Object.defineProperty(_assertThisInitialized(_this), "showFixedMenu", {
      configurable: true,
      enumerable: true,
      writable: true,
      value: function value() {
        return _this.setState({
          fixed: true
        });
      }
    }), _temp));
  }

  _createClass(DesktopContainer, [{
    key: "render",
    value: function render() {
      var children = this.props.children;
      var fixed = this.state.fixed;
      return __WEBPACK_IMPORTED_MODULE_0_react___default.a.createElement(__WEBPACK_IMPORTED_MODULE_1_semantic_ui_react__["Responsive"], {
        minWidth: __WEBPACK_IMPORTED_MODULE_1_semantic_ui_react__["Responsive"].onlyTablet.minWidth,
        __source: {
          fileName: _jsxFileName,
          lineNumber: 31
        }
      }, __WEBPACK_IMPORTED_MODULE_0_react___default.a.createElement(__WEBPACK_IMPORTED_MODULE_1_semantic_ui_react__["Visibility"], {
        once: false,
        onBottomPassed: this.showFixedMenu,
        onBottomPassedReverse: this.hideFixedMenu,
        __source: {
          fileName: _jsxFileName,
          lineNumber: 32
        }
      }, __WEBPACK_IMPORTED_MODULE_0_react___default.a.createElement(__WEBPACK_IMPORTED_MODULE_1_semantic_ui_react__["Segment"], {
        inverted: true,
        textAlign: "center",
        style: {
          minHeight: 80,
          padding: '1em 0em'
        },
        vertical: true,
        __source: {
          fileName: _jsxFileName,
          lineNumber: 37
        }
      }, __WEBPACK_IMPORTED_MODULE_0_react___default.a.createElement(__WEBPACK_IMPORTED_MODULE_1_semantic_ui_react__["Menu"], {
        fixed: fixed ? 'top' : null,
        inverted: !fixed,
        pointing: !fixed,
        secondary: !fixed,
        size: "large",
        __source: {
          fileName: _jsxFileName,
          lineNumber: 43
        }
      }, __WEBPACK_IMPORTED_MODULE_0_react___default.a.createElement(__WEBPACK_IMPORTED_MODULE_1_semantic_ui_react__["Container"], {
        __source: {
          fileName: _jsxFileName,
          lineNumber: 50
        }
      }, __WEBPACK_IMPORTED_MODULE_0_react___default.a.createElement(__WEBPACK_IMPORTED_MODULE_3_next_link___default.a, {
        href: "/",
        __source: {
          fileName: _jsxFileName,
          lineNumber: 51
        }
      }, __WEBPACK_IMPORTED_MODULE_0_react___default.a.createElement(__WEBPACK_IMPORTED_MODULE_1_semantic_ui_react__["Menu"].Item, {
        as: "a",
        active: this.props.pathname === "/" ? true : false,
        __source: {
          fileName: _jsxFileName,
          lineNumber: 52
        }
      }, "Home")), __WEBPACK_IMPORTED_MODULE_0_react___default.a.createElement(__WEBPACK_IMPORTED_MODULE_3_next_link___default.a, {
        href: "/contratos/novo",
        __source: {
          fileName: _jsxFileName,
          lineNumber: 56
        }
      }, __WEBPACK_IMPORTED_MODULE_0_react___default.a.createElement(__WEBPACK_IMPORTED_MODULE_1_semantic_ui_react__["Menu"].Item, {
        as: "a",
        active: this.props.pathname === "/contratos/novo" ? true : false,
        __source: {
          fileName: _jsxFileName,
          lineNumber: 57
        }
      }, "Criar um novo contrato")), __WEBPACK_IMPORTED_MODULE_0_react___default.a.createElement(__WEBPACK_IMPORTED_MODULE_3_next_link___default.a, {
        href: "/contratos/existentes",
        __source: {
          fileName: _jsxFileName,
          lineNumber: 61
        }
      }, __WEBPACK_IMPORTED_MODULE_0_react___default.a.createElement(__WEBPACK_IMPORTED_MODULE_1_semantic_ui_react__["Menu"].Item, {
        as: "a",
        active: this.props.pathname === "/contratos/existentes" ? true : false,
        __source: {
          fileName: _jsxFileName,
          lineNumber: 62
        }
      }, "Participar de um contrato existente")), __WEBPACK_IMPORTED_MODULE_0_react___default.a.createElement(__WEBPACK_IMPORTED_MODULE_3_next_link___default.a, {
        href: "/contratos/meus",
        __source: {
          fileName: _jsxFileName,
          lineNumber: 66
        }
      }, __WEBPACK_IMPORTED_MODULE_0_react___default.a.createElement(__WEBPACK_IMPORTED_MODULE_1_semantic_ui_react__["Menu"].Item, {
        as: "a",
        active: this.props.pathname === "/contratos/meus" ? true : false,
        __source: {
          fileName: _jsxFileName,
          lineNumber: 67
        }
      }, "Administrar meus contratos")))))), children, __WEBPACK_IMPORTED_MODULE_0_react___default.a.createElement(__WEBPACK_IMPORTED_MODULE_1_semantic_ui_react__["Segment"], {
        inverted: true,
        vertical: true,
        style: {
          padding: '5em 0em'
        },
        __source: {
          fileName: _jsxFileName,
          lineNumber: 78
        }
      }, __WEBPACK_IMPORTED_MODULE_0_react___default.a.createElement(__WEBPACK_IMPORTED_MODULE_1_semantic_ui_react__["Container"], {
        __source: {
          fileName: _jsxFileName,
          lineNumber: 79
        }
      }, __WEBPACK_IMPORTED_MODULE_0_react___default.a.createElement(__WEBPACK_IMPORTED_MODULE_1_semantic_ui_react__["Grid"], {
        divided: true,
        inverted: true,
        stackable: true,
        __source: {
          fileName: _jsxFileName,
          lineNumber: 80
        }
      }, __WEBPACK_IMPORTED_MODULE_0_react___default.a.createElement(__WEBPACK_IMPORTED_MODULE_1_semantic_ui_react__["Grid"].Row, {
        __source: {
          fileName: _jsxFileName,
          lineNumber: 81
        }
      }, __WEBPACK_IMPORTED_MODULE_0_react___default.a.createElement(__WEBPACK_IMPORTED_MODULE_1_semantic_ui_react__["Grid"].Column, {
        width: 6,
        __source: {
          fileName: _jsxFileName,
          lineNumber: 82
        }
      }, __WEBPACK_IMPORTED_MODULE_0_react___default.a.createElement(__WEBPACK_IMPORTED_MODULE_1_semantic_ui_react__["List"], {
        link: true,
        inverted: true,
        __source: {
          fileName: _jsxFileName,
          lineNumber: 83
        }
      }, __WEBPACK_IMPORTED_MODULE_0_react___default.a.createElement(__WEBPACK_IMPORTED_MODULE_1_semantic_ui_react__["List"].Item, {
        as: "a",
        __source: {
          fileName: _jsxFileName,
          lineNumber: 84
        }
      }, "Home"), __WEBPACK_IMPORTED_MODULE_0_react___default.a.createElement(__WEBPACK_IMPORTED_MODULE_1_semantic_ui_react__["List"].Item, {
        as: "a",
        __source: {
          fileName: _jsxFileName,
          lineNumber: 85
        }
      }, "Criar um novo contrato"), __WEBPACK_IMPORTED_MODULE_0_react___default.a.createElement(__WEBPACK_IMPORTED_MODULE_1_semantic_ui_react__["List"].Item, {
        as: "a",
        __source: {
          fileName: _jsxFileName,
          lineNumber: 86
        }
      }, "Participar de um contrato existente"), __WEBPACK_IMPORTED_MODULE_0_react___default.a.createElement(__WEBPACK_IMPORTED_MODULE_1_semantic_ui_react__["List"].Item, {
        as: "a",
        __source: {
          fileName: _jsxFileName,
          lineNumber: 87
        }
      }, "Administrar meus contratos"))), __WEBPACK_IMPORTED_MODULE_0_react___default.a.createElement(__WEBPACK_IMPORTED_MODULE_1_semantic_ui_react__["Grid"].Column, {
        width: 10,
        __source: {
          fileName: _jsxFileName,
          lineNumber: 90
        }
      }, __WEBPACK_IMPORTED_MODULE_0_react___default.a.createElement(__WEBPACK_IMPORTED_MODULE_1_semantic_ui_react__["Header"], {
        as: "h4",
        inverted: true,
        __source: {
          fileName: _jsxFileName,
          lineNumber: 91
        }
      }, "Disclaimer"), __WEBPACK_IMPORTED_MODULE_0_react___default.a.createElement("p", {
        __source: {
          fileName: _jsxFileName,
          lineNumber: 94
        }
      }, "Esta aplica\xE7\xE3o n\xE3o deve ser utilizada para fins comerciais. Ela foi feita como parte de trabalho de conclus\xE3o de curso de Engenharia de Computa\xE7\xE3o."))), __WEBPACK_IMPORTED_MODULE_0_react___default.a.createElement(__WEBPACK_IMPORTED_MODULE_1_semantic_ui_react__["Divider"], {
        __source: {
          fileName: _jsxFileName,
          lineNumber: 99
        }
      }), __WEBPACK_IMPORTED_MODULE_0_react___default.a.createElement(__WEBPACK_IMPORTED_MODULE_1_semantic_ui_react__["Grid"].Row, {
        __source: {
          fileName: _jsxFileName,
          lineNumber: 100
        }
      }, __WEBPACK_IMPORTED_MODULE_0_react___default.a.createElement(__WEBPACK_IMPORTED_MODULE_1_semantic_ui_react__["Grid"].Column, {
        width: 16,
        __source: {
          fileName: _jsxFileName,
          lineNumber: 101
        }
      }, __WEBPACK_IMPORTED_MODULE_0_react___default.a.createElement(__WEBPACK_IMPORTED_MODULE_1_semantic_ui_react__["Container"], {
        __source: {
          fileName: _jsxFileName,
          lineNumber: 102
        }
      }, __WEBPACK_IMPORTED_MODULE_0_react___default.a.createElement("p", {
        style: {
          textAlign: "center"
        },
        __source: {
          fileName: _jsxFileName,
          lineNumber: 103
        }
      }, "Feito por Marco Aur\xE9lio Prado dos Santos Vidoca (marco.pdsv@gmail.com)"))))))));
    }
  }]);

  return DesktopContainer;
}(__WEBPACK_IMPORTED_MODULE_0_react__["Component"]);

/* harmony default export */ __webpack_exports__["a"] = (DesktopContainer);

/***/ }),

/***/ "./pages/index.js":
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
Object.defineProperty(__webpack_exports__, "__esModule", { value: true });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__babel_runtime_regenerator__ = __webpack_require__("@babel/runtime/regenerator");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__babel_runtime_regenerator___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_0__babel_runtime_regenerator__);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1_react__ = __webpack_require__("react");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1_react___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_1_react__);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2_semantic_ui_react__ = __webpack_require__("semantic-ui-react");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2_semantic_ui_react___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_2_semantic_ui_react__);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_3__components_DesktopContainer__ = __webpack_require__("./components/DesktopContainer.js");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_4_next_link__ = __webpack_require__("next/link");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_4_next_link___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_4_next_link__);

var _jsxFileName = "/home/marco/nodejs/sci-ui-service-full-ethereum/app/pages/index.js";

function _typeof(obj) { if (typeof Symbol === "function" && typeof Symbol.iterator === "symbol") { _typeof = function _typeof(obj) { return typeof obj; }; } else { _typeof = function _typeof(obj) { return obj && typeof Symbol === "function" && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj; }; } return _typeof(obj); }

function _asyncToGenerator(fn) { return function () { var self = this, args = arguments; return new Promise(function (resolve, reject) { var gen = fn.apply(self, args); function step(key, arg) { try { var info = gen[key](arg); var value = info.value; } catch (error) { reject(error); return; } if (info.done) { resolve(value); } else { Promise.resolve(value).then(_next, _throw); } } function _next(value) { step("next", value); } function _throw(err) { step("throw", err); } _next(); }); }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } }

function _createClass(Constructor, protoProps, staticProps) { if (protoProps) _defineProperties(Constructor.prototype, protoProps); if (staticProps) _defineProperties(Constructor, staticProps); return Constructor; }

function _possibleConstructorReturn(self, call) { if (call && (_typeof(call) === "object" || typeof call === "function")) { return call; } return _assertThisInitialized(self); }

function _assertThisInitialized(self) { if (self === void 0) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function"); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }





/* eslint-disable react/no-multi-comp */

/* Heads up! HomepageHeading uses inline styling, however it's not the best practice. Use CSS or styled components for
 * such things.
 */

var HomepageHeading = function HomepageHeading(_ref) {
  var mobile = _ref.mobile;
  return __WEBPACK_IMPORTED_MODULE_1_react___default.a.createElement(__WEBPACK_IMPORTED_MODULE_2_semantic_ui_react__["Segment"], {
    inverted: true,
    textAlign: "center",
    style: {
      minHeight: 600,
      padding: '1em 0em'
    },
    vertical: true,
    __source: {
      fileName: _jsxFileName,
      lineNumber: 21
    }
  }, __WEBPACK_IMPORTED_MODULE_1_react___default.a.createElement(__WEBPACK_IMPORTED_MODULE_2_semantic_ui_react__["Container"], {
    text: true,
    __source: {
      fileName: _jsxFileName,
      lineNumber: 27
    }
  }, __WEBPACK_IMPORTED_MODULE_1_react___default.a.createElement(__WEBPACK_IMPORTED_MODULE_2_semantic_ui_react__["Header"], {
    as: "h1",
    content: "Seguro Automotivo",
    inverted: true,
    style: {
      fontSize: mobile ? '2em' : '4em',
      fontWeight: 'normal',
      marginBottom: 0,
      marginTop: mobile ? '1.5em' : '2.0em'
    },
    __source: {
      fileName: _jsxFileName,
      lineNumber: 28
    }
  }), __WEBPACK_IMPORTED_MODULE_1_react___default.a.createElement(__WEBPACK_IMPORTED_MODULE_2_semantic_ui_react__["Header"], {
    as: "h2",
    content: "Um seguro automotivo contra furto e roubo baseado em um contrato inteligente na rede Ethereum",
    inverted: true,
    style: {
      fontSize: mobile ? '1.5em' : '1.7em',
      fontWeight: 'normal',
      marginTop: mobile ? '0.5em' : '1.5em'
    },
    __source: {
      fileName: _jsxFileName,
      lineNumber: 39
    }
  }), __WEBPACK_IMPORTED_MODULE_1_react___default.a.createElement(__WEBPACK_IMPORTED_MODULE_4_next_link___default.a, {
    href: "/contratos/existentes",
    __source: {
      fileName: _jsxFileName,
      lineNumber: 49
    }
  }, __WEBPACK_IMPORTED_MODULE_1_react___default.a.createElement(__WEBPACK_IMPORTED_MODULE_2_semantic_ui_react__["Button"], {
    primary: true,
    size: "huge",
    __source: {
      fileName: _jsxFileName,
      lineNumber: 50
    }
  }, "Participar de um contrato existente", __WEBPACK_IMPORTED_MODULE_1_react___default.a.createElement(__WEBPACK_IMPORTED_MODULE_2_semantic_ui_react__["Icon"], {
    name: "right arrow",
    __source: {
      fileName: _jsxFileName,
      lineNumber: 52
    }
  })))));
};

var Index =
/*#__PURE__*/
function (_Component) {
  _inherits(Index, _Component);

  function Index() {
    _classCallCheck(this, Index);

    return _possibleConstructorReturn(this, (Index.__proto__ || Object.getPrototypeOf(Index)).apply(this, arguments));
  }

  _createClass(Index, [{
    key: "render",
    value: function render() {
      return __WEBPACK_IMPORTED_MODULE_1_react___default.a.createElement(__WEBPACK_IMPORTED_MODULE_3__components_DesktopContainer__["a" /* default */], {
        pathname: this.props.pathname,
        __source: {
          fileName: _jsxFileName,
          lineNumber: 66
        }
      }, __WEBPACK_IMPORTED_MODULE_1_react___default.a.createElement(HomepageHeading, {
        __source: {
          fileName: _jsxFileName,
          lineNumber: 67
        }
      }), __WEBPACK_IMPORTED_MODULE_1_react___default.a.createElement(__WEBPACK_IMPORTED_MODULE_2_semantic_ui_react__["Segment"], {
        style: {
          padding: '8em 0em'
        },
        vertical: true,
        __source: {
          fileName: _jsxFileName,
          lineNumber: 68
        }
      }, __WEBPACK_IMPORTED_MODULE_1_react___default.a.createElement(__WEBPACK_IMPORTED_MODULE_2_semantic_ui_react__["Grid"], {
        container: true,
        stackable: true,
        verticalAlign: "middle",
        __source: {
          fileName: _jsxFileName,
          lineNumber: 69
        }
      }, __WEBPACK_IMPORTED_MODULE_1_react___default.a.createElement(__WEBPACK_IMPORTED_MODULE_2_semantic_ui_react__["Grid"].Row, {
        __source: {
          fileName: _jsxFileName,
          lineNumber: 70
        }
      }, __WEBPACK_IMPORTED_MODULE_1_react___default.a.createElement(__WEBPACK_IMPORTED_MODULE_2_semantic_ui_react__["Grid"].Column, {
        width: 10,
        __source: {
          fileName: _jsxFileName,
          lineNumber: 71
        }
      }, __WEBPACK_IMPORTED_MODULE_1_react___default.a.createElement(__WEBPACK_IMPORTED_MODULE_2_semantic_ui_react__["Header"], {
        as: "h3",
        style: {
          fontSize: '2em'
        },
        __source: {
          fileName: _jsxFileName,
          lineNumber: 72
        }
      }, "Um seguro automotivo baseado em um contrato inteligente"), __WEBPACK_IMPORTED_MODULE_1_react___default.a.createElement("p", {
        style: {
          fontSize: '1.33em'
        },
        __source: {
          fileName: _jsxFileName,
          lineNumber: 75
        }
      }, "O seguro automotivo \xE9 baseado em um contrato inteligente hospedado na rede Ethereum. Mensalmente, os segurados devem depositar a taxa mensal estabelecida no contrato para poderem pedir reembolso em caso de roubo ou furto. Com um contrato inteligente voc\xEA tem a garantia de que receber\xE1 o reembolso em caso de um sinistro.")), __WEBPACK_IMPORTED_MODULE_1_react___default.a.createElement(__WEBPACK_IMPORTED_MODULE_2_semantic_ui_react__["Grid"].Column, {
        floated: "right",
        width: 4,
        __source: {
          fileName: _jsxFileName,
          lineNumber: 81
        }
      }, __WEBPACK_IMPORTED_MODULE_1_react___default.a.createElement(__WEBPACK_IMPORTED_MODULE_2_semantic_ui_react__["Image"], {
        rounded: true,
        size: "small",
        src: "/img/contract.png",
        __source: {
          fileName: _jsxFileName,
          lineNumber: 82
        }
      }))), __WEBPACK_IMPORTED_MODULE_1_react___default.a.createElement(__WEBPACK_IMPORTED_MODULE_2_semantic_ui_react__["Divider"], {
        __source: {
          fileName: _jsxFileName,
          lineNumber: 85
        }
      }), __WEBPACK_IMPORTED_MODULE_1_react___default.a.createElement(__WEBPACK_IMPORTED_MODULE_2_semantic_ui_react__["Grid"].Row, {
        __source: {
          fileName: _jsxFileName,
          lineNumber: 86
        }
      }, __WEBPACK_IMPORTED_MODULE_1_react___default.a.createElement(__WEBPACK_IMPORTED_MODULE_2_semantic_ui_react__["Grid"].Column, {
        floated: "right",
        width: 4,
        __source: {
          fileName: _jsxFileName,
          lineNumber: 87
        }
      }, __WEBPACK_IMPORTED_MODULE_1_react___default.a.createElement(__WEBPACK_IMPORTED_MODULE_2_semantic_ui_react__["Image"], {
        rounded: true,
        size: "small",
        src: "/img/gps.png",
        __source: {
          fileName: _jsxFileName,
          lineNumber: 88
        }
      })), __WEBPACK_IMPORTED_MODULE_1_react___default.a.createElement(__WEBPACK_IMPORTED_MODULE_2_semantic_ui_react__["Grid"].Column, {
        width: 10,
        __source: {
          fileName: _jsxFileName,
          lineNumber: 90
        }
      }, __WEBPACK_IMPORTED_MODULE_1_react___default.a.createElement(__WEBPACK_IMPORTED_MODULE_2_semantic_ui_react__["Header"], {
        as: "h3",
        style: {
          fontSize: '2em'
        },
        __source: {
          fileName: _jsxFileName,
          lineNumber: 91
        }
      }, "Um seguro automotivo conectado ao GPS do seu carro e que respeita sua privacidade"), __WEBPACK_IMPORTED_MODULE_1_react___default.a.createElement("p", {
        style: {
          fontSize: '1.33em'
        },
        __source: {
          fileName: _jsxFileName,
          lineNumber: 94
        }
      }, "Todos os carros segurados devem possuir um dispositivo GPS que envia a cada 10 minutos a localiza\xE7\xE3o do carro do segurado. N\xE3o se preocupe com sua privacidade, o dispositivo envia os dados de forma criptografada. N\xE3o conseguiremos ter acesso a sua localiza\xE7\xE3o. Para cada dia, o dispositivo gerar\xE1 uma chave p\xFAblica e privada \xFAnica baseada no dia em quest\xE3o e na sua chave privada master."))), __WEBPACK_IMPORTED_MODULE_1_react___default.a.createElement(__WEBPACK_IMPORTED_MODULE_2_semantic_ui_react__["Divider"], {
        __source: {
          fileName: _jsxFileName,
          lineNumber: 101
        }
      }), __WEBPACK_IMPORTED_MODULE_1_react___default.a.createElement(__WEBPACK_IMPORTED_MODULE_2_semantic_ui_react__["Grid"].Row, {
        __source: {
          fileName: _jsxFileName,
          lineNumber: 102
        }
      }, __WEBPACK_IMPORTED_MODULE_1_react___default.a.createElement(__WEBPACK_IMPORTED_MODULE_2_semantic_ui_react__["Grid"].Column, {
        width: 10,
        __source: {
          fileName: _jsxFileName,
          lineNumber: 103
        }
      }, __WEBPACK_IMPORTED_MODULE_1_react___default.a.createElement(__WEBPACK_IMPORTED_MODULE_2_semantic_ui_react__["Header"], {
        as: "h3",
        style: {
          fontSize: '2em'
        },
        __source: {
          fileName: _jsxFileName,
          lineNumber: 104
        }
      }, "Pedido de reembolso simples e r\xE1pido"), __WEBPACK_IMPORTED_MODULE_1_react___default.a.createElement("p", {
        style: {
          fontSize: '1.33em'
        },
        __source: {
          fileName: _jsxFileName,
          lineNumber: 107
        }
      }, "Em caso de roubo ou furto, o segurado deve registrar um boletim de ocorr\xEAncia informando o local e a hora do sinistro. O segurado tamb\xE9m deve fornecer ao seguro as chaves privadas para descriptografarmos os dados do GPS do carro. Apenas as chaves privadas do dia em que o sinistro ocorreu e do dia anterior ao sinistro devem ser enviadas. Al\xE9m disso, o segurado deve abrir um processo de reembolso em nosso site.")), __WEBPACK_IMPORTED_MODULE_1_react___default.a.createElement(__WEBPACK_IMPORTED_MODULE_2_semantic_ui_react__["Grid"].Column, {
        floated: "right",
        width: 4,
        __source: {
          fileName: _jsxFileName,
          lineNumber: 113
        }
      }, __WEBPACK_IMPORTED_MODULE_1_react___default.a.createElement(__WEBPACK_IMPORTED_MODULE_2_semantic_ui_react__["Image"], {
        rounded: true,
        size: "small",
        src: "/img/money.png",
        __source: {
          fileName: _jsxFileName,
          lineNumber: 114
        }
      }))), __WEBPACK_IMPORTED_MODULE_1_react___default.a.createElement(__WEBPACK_IMPORTED_MODULE_2_semantic_ui_react__["Divider"], {
        __source: {
          fileName: _jsxFileName,
          lineNumber: 117
        }
      }), __WEBPACK_IMPORTED_MODULE_1_react___default.a.createElement(__WEBPACK_IMPORTED_MODULE_2_semantic_ui_react__["Grid"].Row, {
        __source: {
          fileName: _jsxFileName,
          lineNumber: 118
        }
      }, __WEBPACK_IMPORTED_MODULE_1_react___default.a.createElement(__WEBPACK_IMPORTED_MODULE_2_semantic_ui_react__["Grid"].Column, {
        floated: "right",
        width: 4,
        __source: {
          fileName: _jsxFileName,
          lineNumber: 119
        }
      }, __WEBPACK_IMPORTED_MODULE_1_react___default.a.createElement(__WEBPACK_IMPORTED_MODULE_2_semantic_ui_react__["Image"], {
        rounded: true,
        size: "small",
        src: "/img/metamask.png",
        __source: {
          fileName: _jsxFileName,
          lineNumber: 120
        }
      })), __WEBPACK_IMPORTED_MODULE_1_react___default.a.createElement(__WEBPACK_IMPORTED_MODULE_2_semantic_ui_react__["Grid"].Column, {
        width: 10,
        __source: {
          fileName: _jsxFileName,
          lineNumber: 122
        }
      }, __WEBPACK_IMPORTED_MODULE_1_react___default.a.createElement(__WEBPACK_IMPORTED_MODULE_2_semantic_ui_react__["Header"], {
        as: "h3",
        style: {
          fontSize: '2em'
        },
        __source: {
          fileName: _jsxFileName,
          lineNumber: 123
        }
      }, "Sua conta Ethereum segura"), __WEBPACK_IMPORTED_MODULE_1_react___default.a.createElement("p", {
        style: {
          fontSize: '1.33em'
        },
        __source: {
          fileName: _jsxFileName,
          lineNumber: 126
        }
      }, "As chaves privadas de sua conta Ethereum est\xE3o localmente armazenadas no MetaMask. Al\xE9m disso, nenhuma transa\xE7\xE3o ser\xE1 executada sem seu concentimento. Para instalar ou saber mais sobre o MetaMask acesse ", __WEBPACK_IMPORTED_MODULE_1_react___default.a.createElement("a", {
        href: "https://metamask.io/",
        __source: {
          fileName: _jsxFileName,
          lineNumber: 128
        }
      }, "https://metamask.io/"), "."))), __WEBPACK_IMPORTED_MODULE_1_react___default.a.createElement(__WEBPACK_IMPORTED_MODULE_2_semantic_ui_react__["Grid"].Row, {
        __source: {
          fileName: _jsxFileName,
          lineNumber: 132
        }
      }, __WEBPACK_IMPORTED_MODULE_1_react___default.a.createElement(__WEBPACK_IMPORTED_MODULE_2_semantic_ui_react__["Grid"].Column, {
        textAlign: "center",
        __source: {
          fileName: _jsxFileName,
          lineNumber: 133
        }
      }, __WEBPACK_IMPORTED_MODULE_1_react___default.a.createElement(__WEBPACK_IMPORTED_MODULE_4_next_link___default.a, {
        href: "/contratos/novo",
        __source: {
          fileName: _jsxFileName,
          lineNumber: 134
        }
      }, __WEBPACK_IMPORTED_MODULE_1_react___default.a.createElement(__WEBPACK_IMPORTED_MODULE_2_semantic_ui_react__["Button"], {
        size: "huge",
        __source: {
          fileName: _jsxFileName,
          lineNumber: 135
        }
      }, "Criar um novo contrato")))))), __WEBPACK_IMPORTED_MODULE_1_react___default.a.createElement(__WEBPACK_IMPORTED_MODULE_2_semantic_ui_react__["Segment"], {
        style: {
          padding: '0em'
        },
        vertical: true,
        __source: {
          fileName: _jsxFileName,
          lineNumber: 141
        }
      }, __WEBPACK_IMPORTED_MODULE_1_react___default.a.createElement(__WEBPACK_IMPORTED_MODULE_2_semantic_ui_react__["Grid"], {
        celled: "internally",
        columns: "equal",
        stackable: true,
        __source: {
          fileName: _jsxFileName,
          lineNumber: 142
        }
      }, __WEBPACK_IMPORTED_MODULE_1_react___default.a.createElement(__WEBPACK_IMPORTED_MODULE_2_semantic_ui_react__["Grid"].Row, {
        textAlign: "center",
        __source: {
          fileName: _jsxFileName,
          lineNumber: 143
        }
      }, __WEBPACK_IMPORTED_MODULE_1_react___default.a.createElement(__WEBPACK_IMPORTED_MODULE_2_semantic_ui_react__["Grid"].Column, {
        style: {
          paddingBottom: '5em',
          paddingTop: '5em'
        },
        __source: {
          fileName: _jsxFileName,
          lineNumber: 144
        }
      }, __WEBPACK_IMPORTED_MODULE_1_react___default.a.createElement(__WEBPACK_IMPORTED_MODULE_2_semantic_ui_react__["Header"], {
        as: "h3",
        style: {
          fontSize: '2em'
        },
        __source: {
          fileName: _jsxFileName,
          lineNumber: 145
        }
      }, "\"Finalmente eu posso dormir sem medo de ser furtado ou roubado\""), __WEBPACK_IMPORTED_MODULE_1_react___default.a.createElement("p", {
        style: {
          fontSize: '1.33em'
        },
        __source: {
          fileName: _jsxFileName,
          lineNumber: 148
        }
      }, __WEBPACK_IMPORTED_MODULE_1_react___default.a.createElement(__WEBPACK_IMPORTED_MODULE_2_semantic_ui_react__["Image"], {
        avatar: true,
        size: "tiny",
        src: "/img/marco_aurelio.jpg",
        __source: {
          fileName: _jsxFileName,
          lineNumber: 149
        }
      }), "Marco Aur\xE9lio Prado")), __WEBPACK_IMPORTED_MODULE_1_react___default.a.createElement(__WEBPACK_IMPORTED_MODULE_2_semantic_ui_react__["Grid"].Column, {
        style: {
          paddingBottom: '5em',
          paddingTop: '5em'
        },
        __source: {
          fileName: _jsxFileName,
          lineNumber: 153
        }
      }, __WEBPACK_IMPORTED_MODULE_1_react___default.a.createElement(__WEBPACK_IMPORTED_MODULE_2_semantic_ui_react__["Header"], {
        as: "h3",
        style: {
          fontSize: '2em'
        },
        __source: {
          fileName: _jsxFileName,
          lineNumber: 154
        }
      }, "\"Encontrei um seguro automotivo transparente e com um pre\xE7o justo\""), __WEBPACK_IMPORTED_MODULE_1_react___default.a.createElement("p", {
        style: {
          fontSize: '1.33em'
        },
        __source: {
          fileName: _jsxFileName,
          lineNumber: 157
        }
      }, __WEBPACK_IMPORTED_MODULE_1_react___default.a.createElement(__WEBPACK_IMPORTED_MODULE_2_semantic_ui_react__["Image"], {
        avatar: true,
        size: "tiny",
        src: "/img/ludmila.jpg",
        __source: {
          fileName: _jsxFileName,
          lineNumber: 158
        }
      }), "Ludmila Vidoca"))))), __WEBPACK_IMPORTED_MODULE_1_react___default.a.createElement(__WEBPACK_IMPORTED_MODULE_2_semantic_ui_react__["Segment"], {
        style: {
          padding: '8em 0em'
        },
        vertical: true,
        __source: {
          fileName: _jsxFileName,
          lineNumber: 165
        }
      }, __WEBPACK_IMPORTED_MODULE_1_react___default.a.createElement(__WEBPACK_IMPORTED_MODULE_2_semantic_ui_react__["Container"], {
        text: true,
        __source: {
          fileName: _jsxFileName,
          lineNumber: 166
        }
      }, __WEBPACK_IMPORTED_MODULE_1_react___default.a.createElement(__WEBPACK_IMPORTED_MODULE_2_semantic_ui_react__["Header"], {
        as: "h3",
        style: {
          fontSize: '2em'
        },
        __source: {
          fileName: _jsxFileName,
          lineNumber: 167
        }
      }, "Cria\xE7\xE3o do contrato"), __WEBPACK_IMPORTED_MODULE_1_react___default.a.createElement("p", {
        style: {
          fontSize: '1.33em'
        },
        __source: {
          fileName: _jsxFileName,
          lineNumber: 170
        }
      }, "Qualquer pessoa pode criar um contrato de seguro automotivo e convidar outras pessoas a se juntarem ao seguro. Basta clicar no link abaixo e preencher as informa\xE7\xF5es do contrato."), __WEBPACK_IMPORTED_MODULE_1_react___default.a.createElement(__WEBPACK_IMPORTED_MODULE_4_next_link___default.a, {
        href: "/contratos/novo",
        __source: {
          fileName: _jsxFileName,
          lineNumber: 174
        }
      }, __WEBPACK_IMPORTED_MODULE_1_react___default.a.createElement(__WEBPACK_IMPORTED_MODULE_2_semantic_ui_react__["Button"], {
        as: "a",
        size: "large",
        __source: {
          fileName: _jsxFileName,
          lineNumber: 175
        }
      }, "Criar um novo contrato")), __WEBPACK_IMPORTED_MODULE_1_react___default.a.createElement(__WEBPACK_IMPORTED_MODULE_2_semantic_ui_react__["Divider"], {
        __source: {
          fileName: _jsxFileName,
          lineNumber: 179
        }
      }), __WEBPACK_IMPORTED_MODULE_1_react___default.a.createElement(__WEBPACK_IMPORTED_MODULE_2_semantic_ui_react__["Header"], {
        as: "h3",
        style: {
          fontSize: '2em'
        },
        __source: {
          fileName: _jsxFileName,
          lineNumber: 180
        }
      }, "Ades\xE3o a um contrato existente"), __WEBPACK_IMPORTED_MODULE_1_react___default.a.createElement("p", {
        style: {
          fontSize: '1.33em'
        },
        __source: {
          fileName: _jsxFileName,
          lineNumber: 183
        }
      }, "Qualquer pessoa pode se juntar a um contrato existente, basta ela requisitar uma aprova\xE7\xE3o. A partir do momento em que a pessoa \xE9 aprovada para participar daquele contrato, ela deve estar em dia com as obriga\xE7\xF5es do contrato para pedir reembolso com sucesso. As obriga\xE7\xF5es se referem ao pagamento da taxa mensal e ao envio da localiza\xE7\xE3o do carro pelo dispositivo GPS instalado no carro."), __WEBPACK_IMPORTED_MODULE_1_react___default.a.createElement(__WEBPACK_IMPORTED_MODULE_4_next_link___default.a, {
        href: "/contratos/existentes",
        __source: {
          fileName: _jsxFileName,
          lineNumber: 188
        }
      }, __WEBPACK_IMPORTED_MODULE_1_react___default.a.createElement(__WEBPACK_IMPORTED_MODULE_2_semantic_ui_react__["Button"], {
        as: "a",
        size: "large",
        __source: {
          fileName: _jsxFileName,
          lineNumber: 189
        }
      }, "Participar de um contrato existente")), __WEBPACK_IMPORTED_MODULE_1_react___default.a.createElement(__WEBPACK_IMPORTED_MODULE_2_semantic_ui_react__["Divider"], {
        __source: {
          fileName: _jsxFileName,
          lineNumber: 193
        }
      }), __WEBPACK_IMPORTED_MODULE_1_react___default.a.createElement(__WEBPACK_IMPORTED_MODULE_2_semantic_ui_react__["Header"], {
        as: "h3",
        style: {
          fontSize: '2em'
        },
        __source: {
          fileName: _jsxFileName,
          lineNumber: 194
        }
      }, "Administra\xE7\xE3o dos seus contratos"), __WEBPACK_IMPORTED_MODULE_1_react___default.a.createElement("p", {
        style: {
          fontSize: '1.33em'
        },
        __source: {
          fileName: _jsxFileName,
          lineNumber: 197
        }
      }, "Ao criar ou aderir a um contrato voc\xEA pode efetuar algumas a\xE7\xF5es: como aprovar a entrada de novo segurado no contrato ou criar uma requisi\xE7\xE3o de pedido de reembolso."), __WEBPACK_IMPORTED_MODULE_1_react___default.a.createElement(__WEBPACK_IMPORTED_MODULE_4_next_link___default.a, {
        href: "/contratos/meus",
        __source: {
          fileName: _jsxFileName,
          lineNumber: 201
        }
      }, __WEBPACK_IMPORTED_MODULE_1_react___default.a.createElement(__WEBPACK_IMPORTED_MODULE_2_semantic_ui_react__["Button"], {
        as: "a",
        size: "large",
        __source: {
          fileName: _jsxFileName,
          lineNumber: 202
        }
      }, "Administrar meus contratos")))));
    }
  }], [{
    key: "getInitialProps",
    value: function () {
      var _getInitialProps = _asyncToGenerator(
      /*#__PURE__*/
      __WEBPACK_IMPORTED_MODULE_0__babel_runtime_regenerator___default.a.mark(function _callee(_ref2) {
        var pathname;
        return __WEBPACK_IMPORTED_MODULE_0__babel_runtime_regenerator___default.a.wrap(function _callee$(_context) {
          while (1) {
            switch (_context.prev = _context.next) {
              case 0:
                pathname = _ref2.pathname;
                return _context.abrupt("return", {
                  pathname: pathname
                });

              case 2:
              case "end":
                return _context.stop();
            }
          }
        }, _callee, this);
      }));

      return function getInitialProps(_x) {
        return _getInitialProps.apply(this, arguments);
      };
    }()
  }]);

  return Index;
}(__WEBPACK_IMPORTED_MODULE_1_react__["Component"]);

/* harmony default export */ __webpack_exports__["default"] = (Index);

/***/ }),

/***/ 3:
/***/ (function(module, exports, __webpack_require__) {

module.exports = __webpack_require__("./pages/index.js");


/***/ }),

/***/ "@babel/runtime/regenerator":
/***/ (function(module, exports) {

module.exports = require("@babel/runtime/regenerator");

/***/ }),

/***/ "next/head":
/***/ (function(module, exports) {

module.exports = require("next/head");

/***/ }),

/***/ "next/link":
/***/ (function(module, exports) {

module.exports = require("next/link");

/***/ }),

/***/ "react":
/***/ (function(module, exports) {

module.exports = require("react");

/***/ }),

/***/ "semantic-ui-react":
/***/ (function(module, exports) {

module.exports = require("semantic-ui-react");

/***/ })

/******/ });
//# sourceMappingURL=index.js.map