import controller from './controller';
import template from './index.html';

const DDO = {
  bindings: {
    percent: '<',
    color: '@',
    width: '<',
    strokeWidth: '<',
    backgroundColor: '@'
  },
  controllerAs: 'vm',
  transclude: true,
  template,
  controller
};

export default angular
  .module('circular-progress-bar', [])
  .component('circularProgressBar', DDO)
  .name;
