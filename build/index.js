(function(f){if(typeof exports==="object"&&typeof module!=="undefined"){module.exports=f()}else if(typeof define==="function"&&define.amd){define([],f)}else{var g;if(typeof window!=="undefined"){g=window}else if(typeof global!=="undefined"){g=global}else if(typeof self!=="undefined"){g=self}else{g=this}g.HireThumbnailBar = f()}})(function(){var define,module,exports;return (function e(t,n,r){function s(o,u){if(!n[o]){if(!t[o]){var a=typeof require=="function"&&require;if(!u&&a)return a(o,!0);if(i)return i(o,!0);var f=new Error("Cannot find module '"+o+"'");throw f.code="MODULE_NOT_FOUND",f}var l=n[o]={exports:{}};t[o][0].call(l.exports,function(e){var n=t[o][1][e];return s(n?n:e)},l,l.exports,e,t,n,r)}return n[o].exports}var i=typeof require=="function"&&require;for(var o=0;o<r.length;o++)s(r[o]);return s})({1:[function(_dereq_,module,exports){
var inserted = {};

module.exports = function (css, options) {
    if (inserted[css]) return;
    inserted[css] = true;
    
    var elem = document.createElement('style');
    elem.setAttribute('type', 'text/css');

    if ('textContent' in elem) {
      elem.textContent = css;
    } else {
      elem.styleSheet.cssText = css;
    }
    
    var head = document.getElementsByTagName('head')[0];
    if (options && options.prepend) {
        head.insertBefore(elem, head.childNodes[0]);
    } else {
        head.appendChild(elem);
    }
};

},{}],2:[function(_dereq_,module,exports){
"use strict";

Object.defineProperty(exports, "__esModule", {
	value: true
});

var _createClass = (function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; })();

var _get = function get(_x, _x2, _x3) { var _again = true; _function: while (_again) { var object = _x, property = _x2, receiver = _x3; desc = parent = getter = undefined; _again = false; if (object === null) object = Function.prototype; var desc = Object.getOwnPropertyDescriptor(object, property); if (desc === undefined) { var parent = Object.getPrototypeOf(object); if (parent === null) { return undefined; } else { _x = parent; _x2 = property; _x3 = receiver; _again = true; continue _function; } } else if ("value" in desc) { return desc.value; } else { var getter = desc.get; if (getter === undefined) { return undefined; } return getter.call(receiver); } } };

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { "default": obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

var _requestAnimationFrame = _dereq_("./request-animation-frame");

var _insertCss = _dereq_("insert-css");

var _insertCss2 = _interopRequireDefault(_insertCss);

var _react = _dereq_("react");

var _react2 = _interopRequireDefault(_react);



var css = Buffer("LmhpcmUtdGh1bWJuYWlsLWJhciB7Cgl3aWR0aDogMTAwJTsgCgloZWlnaHQ6IDgwcHg7CglvdmVyZmxvdy15OiBoaWRkZW47CglvdmVyZmxvdy14OiBzY3JvbGw7Cn0KCi5oaXJlLXRodW1ibmFpbC1iYXIgPiBkaXYgewoJd2hpdGUtc3BhY2U6IG5vd3JhcDsKfQoKLmhpcmUtdGh1bWJuYWlsLWJhciA+IGRpdiA+IHNwYW4gewoJd2lkdGg6IDEyMHB4OwoJZGlzcGxheTogaW5saW5lLWJsb2NrOwoJdGV4dC1hbGlnbjogY2VudGVyOwoJbWFyZ2luLXJpZ2h0OiAxMnB4Owp9CgouaGlyZS10aHVtYm5haWwtYmFyID4gZGl2ID4gc3Bhbi5zZWxlY3RlZCB7Cglib3JkZXI6IDFweCBzb2xpZCBwdXJwbGU7Cn0KCi5oaXJlLXRodW1ibmFpbC1iYXIgaW1nIHsKCXdpZHRoOiAxMDAlOwoJdmVydGljYWwtYWxpZ246IHRvcDsKCWN1cnNvcjogcG9pbnRlcjsKCXRyYW5zaXRpb246IG9wYWNpdHkgMC40czsKfQoKLmhpcmUtdGh1bWJuYWlsLWJhciBpbWdbZGF0YS1zcmNdIHsKCW9wYWNpdHk6IDA7Cn0KCi5oaXJlLXRodW1ibmFpbC1iYXIgaW1nW3NyY10gewoJb3BhY2l0eTogMTsKfQ==","base64");
(0, _insertCss2["default"])(css, { prepend: true });

var ThumbnailBar = (function (_React$Component) {
	_inherits(ThumbnailBar, _React$Component);

	function ThumbnailBar(props) {
		_classCallCheck(this, ThumbnailBar);

		_get(Object.getPrototypeOf(ThumbnailBar.prototype), "constructor", this).call(this, props);
		this.scrollListener = this.loadVisibleThumbnails.bind(this);
		this.animationFrameListener = this.onAnimationFrame.bind(this);
		this.desiredScrollLeft = -1;
		this.scrollAcceleration = 10;
	}

	_createClass(ThumbnailBar, [{
		key: "componentDidMount",
		value: function componentDidMount() {
			this.loadVisibleThumbnails();
			this.scrollToCurrent();

			_react2["default"].findDOMNode(this).addEventListener("scroll", this.scrollListener);
			(0, _requestAnimationFrame.requestAnimationFrame)(this.animationFrameListener);
			window.addEventListener("resize", this.scrollListener);
		}
	}, {
		key: "componentDidUpdate",
		value: function componentDidUpdate() {
			this.loadVisibleThumbnails();
			this.scrollToCurrent();
		}
	}, {
		key: "componentWillUnmount",
		value: function componentWillUnmount() {
			_react2["default"].findDOMNode(this).removeEventListener("scroll", this.scrollListener);
			window.removeEventListener("resize", this.scrollListener);
		}
	}, {
		key: "onAnimationFrame",
		value: function onAnimationFrame() {
			var me = _react2["default"].findDOMNode(this);
			if (this.desiredScrollLeft > -1) {
				var delta = this.desiredScrollLeft - me.scrollLeft;
				if (delta !== 0) {
					var newLeft = Math.floor(me.scrollLeft + (delta > 0 ? this.scrollAcceleration : -this.scrollAcceleration));
					if (delta > 0 && newLeft > this.desiredScrollLeft || delta < 0 && newLeft < this.desiredScrollLeft) {
						newLeft = this.desiredScrollLeft;
					} else {
						if (delta < 250 && delta > -250 && this.scrollAcceleration > 10) {
							this.scrollAcceleration *= 0.8;
						} else {
							this.scrollAcceleration *= 1.1;
						}
					}
					me.scrollLeft = newLeft;
				} else {
					this.desiredScrollLeft = -1;
					this.scrollAcceleration = 10;
				}
			}
			(0, _requestAnimationFrame.requestAnimationFrame)(this.animationFrameListener);
		}
	}, {
		key: "scrollToCurrent",
		value: function scrollToCurrent() {
			var me = _react2["default"].findDOMNode(this);
			var current = me.querySelector(".selected");
			if (!current) {
				return;
			}
			var rect = me.getBoundingClientRect();
			var rectCurrent = current.getBoundingClientRect();
			var desired = rectCurrent.left - rect.left + me.scrollLeft - Math.floor(rect.width * 0.5) + Math.floor(rectCurrent.width / 2);
			this.desiredScrollLeft = desired < 0 ? 0 : desired;
		}
	}, {
		key: "loadVisibleThumbnails",
		value: function loadVisibleThumbnails() {
			var me = _react2["default"].findDOMNode(this);
			var scrollLeft = me.scrollLeft;
			var thumbs = me.querySelectorAll("img[data-src]");
			var rect = me.getBoundingClientRect();
			for (var i = 0; i < thumbs.length; i++) {
				var left = thumbs[i].parentNode.offsetLeft - scrollLeft - rect.left;
				if (left > 0 && left < rect.width) {
					thumbs[i].setAttribute("src", thumbs[i].getAttribute("data-src"));
					thumbs[i].removeAttribute("data-src");
				}
			}
		}
	}, {
		key: "onSelect",
		value: function onSelect(ev) {
			this.props.onSelect(ev.target.getAttribute("data-id"));
		}
	}, {
		key: "renderThumbnail",
		value: function renderThumbnail(id, i) {
			var src = this.props.thumbnails[id];
			return _react2["default"].createElement(
				"span",
				{ className: "" + id === this.props.id ? "selected" : null },
				_react2["default"].createElement("img", { "data-id": id, "data-src": src, onClick: this.onSelect.bind(this) })
			);
		}
	}, {
		key: "render",
		value: function render() {
			return _react2["default"].createElement(
				"nav",
				{ className: "hire-thumbnail-bar" },
				_react2["default"].createElement(
					"div",
					null,
					this.props.results.ids.map(this.renderThumbnail.bind(this))
				)
			);
		}
	}]);

	return ThumbnailBar;
})(_react2["default"].Component);

ThumbnailBar.propTypes = {
	id: _react2["default"].PropTypes.string,
	onSelect: _react2["default"].PropTypes.func,
	results: _react2["default"].PropTypes.object,
	thumbnails: _react2["default"].PropTypes.object
};

exports["default"] = ThumbnailBar;
module.exports = exports["default"];

},{"./request-animation-frame":3,"insert-css":1,"react":"react"}],3:[function(_dereq_,module,exports){
/*
The MIT License (MIT)

Copyright (c) 2015 Eryk Napierała

Permission is hereby granted, free of charge, to any person obtaining a copy
of this software and associated documentation files (the "Software"), to deal
in the Software without restriction, including without limitation the rights
to use, copy, modify, merge, publish, distribute, sublicense, and/or sell
copies of the Software, and to permit persons to whom the Software is
furnished to do so, subject to the following conditions:

The above copyright notice and this permission notice shall be included in all
copies or substantial portions of the Software.

THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR
IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY,
FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL THE
AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER
LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM,
OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN THE
SOFTWARE.
https://github.com/erykpiast/request-animation-frame-shim/
*/

'use strict';

Object.defineProperty(exports, '__esModule', {
    value: true
});
var requestAnimationFrame = 'function' === typeof global.requestAnimationFrame ? function (cb) {
    return global.requestAnimationFrame(cb);
} : 'function' === typeof global.webkitRequestAnimationFrame ? function (cb) {
    return global.webkitRequestAnimationFrame(cb);
} : 'function' === typeof global.mozRequestAnimationFrame ? function (cb) {
    return global.mozRequestAnimationFrame(cb);
} : undefined;

exports.requestAnimationFrame = requestAnimationFrame;
var cancelAnimationFrame = 'function' === typeof global.cancelAnimationFrame ? function (cb) {
    return global.cancelAnimationFrame(cb);
} : 'function' === typeof global.webkitCancelAnimationFrame ? function (cb) {
    return global.webkitCancelAnimationFrame(cb);
} : 'function' === typeof global.webkitCancelRequestAnimationFrame ? function (cb) {
    return global.webkitCancelRequestAnimationFrame(cb);
} : 'function' === typeof global.mozCancelAnimationFrame ? function (cb) {
    return global.mozCancelAnimationFrame(cb);
} : undefined;
exports.cancelAnimationFrame = cancelAnimationFrame;

},{}]},{},[2])(2)
});