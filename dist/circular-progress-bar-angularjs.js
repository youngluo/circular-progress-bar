(function (global, factory) {
	typeof exports === 'object' && typeof module !== 'undefined' ? module.exports = factory() :
	typeof define === 'function' && define.amd ? define(factory) :
	(global['circular-progress-bar'] = factory());
}(this, (function () { 'use strict';

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

var Progress = function () {
  function Progress() {
    _classCallCheck(this, Progress);
  }

  _createClass(Progress, [{
    key: "$onInit",
    value: function $onInit() {
      this.startRotate = -135;
      this.endRotate = 45;
      this.step = 180 / 50;
      this.reset();
    }
  }, {
    key: "$onChanges",
    value: function $onChanges(changes) {
      var _changes$percent$curr = changes.percent.currentValue,
          currentValue = _changes$percent$curr === undefined ? 0 : _changes$percent$curr;


      if (currentValue === 0) {
        this.reset();
      }

      if (currentValue <= 50 && this.rightRotate < this.endRotate) {
        this.rightRotate = currentValue * this.step + this.startRotate;
      } else if (currentValue <= 100 && this.leftRotate < this.endRotate) {
        this.rightRotate = this.endRotate;
        this.leftRotate = (currentValue - 50) * this.step + this.startRotate;
      }
    }
  }, {
    key: "reset",
    value: function reset() {
      this.rightRotate = this.startRotate;
      this.leftRotate = this.startRotate;
    }
  }, {
    key: "getStyle",
    value: function getStyle(rotate) {
      return {
        transform: "rotate(" + rotate + "deg)",
        webkitTransform: "rotate(" + rotate + "deg)"
      };
    }
  }]);

  return Progress;
}();

var template = "<div class=\"circular-progress-bar\"><div class=\"circular-progress-bar-half circular-progress-bar-half-left\"><div class=\"circular-progress-bar-half-container\" ng-style=\"$ctrl.getStyle($ctrl.rightRotate)\"></div></div><div class=\"circular-progress-bar-half circular-progress-bar-half-right\"><div class=\"circular-progress-bar-half-container\" ng-style=\"$ctrl.getStyle($ctrl.leftRotate)\"></div></div><div class=\"circular-progress-bar-background\" ng-transclude></div></div>";

var name = 'circular-progress-bar';
var DDO = {
  bindings: {
    percent: '<',
    color: '@',
    size: '<',
    width: '<',
    backgroundColor: '@'
  },
  transclude: true,
  template: template,
  controller: Progress
};

var index = angular.module(name, []).component(name, DDO).name;

return index;

})));
