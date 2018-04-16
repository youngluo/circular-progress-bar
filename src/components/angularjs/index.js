import controller from './controller';
import template from './index.html';

const name = 'circular-progress-bar';
const DDO = {
  bindings: {
    percent: '<',
    color: '@',
    size: '<',
    width: '<',
    backgroundColor: '@'
  },
  transclude: true,
  template,
  controller
};

export default angular
  .module(name, [])
  .component(name, DDO)
  .name;
