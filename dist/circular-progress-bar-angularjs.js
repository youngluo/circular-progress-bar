(function (global, factory) {
	typeof exports === 'object' && typeof module !== 'undefined' ? module.exports = factory() :
	typeof define === 'function' && define.amd ? define(factory) :
	(global['circular-progress-bar'] = factory());
}(this, (function () { 'use strict';

var _extends = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; };

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

var Progress = function () {
  function Progress() {
    _classCallCheck(this, Progress);

    this.startRotate = -135;
    this.endRotate = 45;
    this.step = 180 / 50;
    this.reset();
  }

  _createClass(Progress, [{
    key: '$onInit',
    value: function $onInit() {
      this.width = this.width || 130;
      this.strokeWidth = this.strokeWidth || 5;
      this.color = this.color || '#fe6e35';
      this.backgroundColor = this.backgroundColor || '#f3f3f3';
      this.backgroundStyle = {
        border: this.strokeWidth + 'px solid ' + this.backgroundColor
      };
    }
  }, {
    key: '$onChanges',
    value: function $onChanges(changes) {
      var _changes$percent$curr = changes.percent.currentValue,
          currentValue = _changes$percent$curr === undefined ? 0 : _changes$percent$curr;


      if (currentValue === 0) {
        this.reset();
        return;
      }

      if (currentValue <= 50 && this.rightRotate < this.endRotate) {
        this.rightRotate = currentValue * this.step + this.startRotate;
      } else if (currentValue <= 100 && this.leftRotate < this.endRotate) {
        this.rightRotate = this.endRotate;
        this.leftRotate = (currentValue - 50) * this.step + this.startRotate;
      }
    }
  }, {
    key: 'reset',
    value: function reset() {
      this.rightRotate = this.startRotate;
      this.leftRotate = this.startRotate;
    }
  }, {
    key: 'getStyle',
    value: function getStyle(direction) {
      var style = {};

      if (direction === 'left') {
        style.borderBottomColor = this.color;
        style.borderLeftColor = this.color;
        style.transform = 'rotate(' + this.leftRotate + 'deg)';
        style.msTransform = 'rotate(' + this.leftRotate + 'deg)';
      } else {
        style.borderTopColor = this.color;
        style.borderRightColor = this.color;
        style.transform = 'rotate(' + this.rightRotate + 'deg)';
        style.msTransform = 'rotate(' + this.rightRotate + 'deg)';
      }

      return _extends({}, style, {
        borderWidth: this.strokeWidth + 'px'
      });
    }
  }]);

  return Progress;
}();

var template = "<div class=\"circular-progress-bar\" ng-style=\"{width: vm.width + 'px', height: vm.width + 'px'}\"><div class=\"circular-progress-bar-half circular-progress-bar-half-right\"><div class=\"circular-progress-bar-half-container\" ng-style=\"vm.getStyle()\"></div></div><div class=\"circular-progress-bar-half circular-progress-bar-half-left\"><div class=\"circular-progress-bar-half-container\" ng-style=\"vm.getStyle('left')\"></div></div><div class=\"circular-progress-bar-background\" ng-style=\"vm.backgroundStyle\" ng-transclude></div></div>";

var DDO = {
  bindings: {
    percent: '<',
    color: '@',
    width: '<',
    strokeWidth: '<',
    backgroundColor: '@'
  },
  controllerAs: 'vm',
  transclude: true,
  template: template,
  controller: Progress
};

var index = angular.module('circular-progress-bar', []).component('circularProgressBar', DDO).name;

return index;

})));
