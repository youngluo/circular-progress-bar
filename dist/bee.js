var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

var Progress = function () {
    function Progress() {
        _classCallCheck(this, Progress);

        this.rightRotate = -135;
        this.leftRotate = -135;
        this.step = 180 / 50;
    }

    _createClass(Progress, [{
        key: "$onChanges",
        value: function $onChanges(changes) {
            var _changes$percent$curr = changes.percent.currentValue,
                currentValue = _changes$percent$curr === undefined ? 0 : _changes$percent$curr;


            if (currentValue === 0) {
                this.rightRotate = -135;
                this.leftRotate = -135;
            }

            if (currentValue <= 50 && this.rightRotate < 45) {
                this.rightRotate = currentValue * this.step - 135;
            } else if (currentValue <= 100 && this.leftRotate < 45) {
                this.rightRotate = 45;
                this.leftRotate = (currentValue - 50) * this.step - 135;
            }
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

var progress = {
  bindings: {
    percent: '<'
  },
  transclude: true,
  template: require('./index.html'),
  controller: Progress
};

var timeline = {
  bindings: {
    data: '<',
    rows: '<'
  },
  template: require('./index.html')
};

var index = angular.module('bee-ui', []).component('timeline', timeline).component('progress', progress);

export default index;
