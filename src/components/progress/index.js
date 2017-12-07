import controller from './controller';
import './index.scss';

export default {
  bindings: {
    percent: '<'
  },
  transclude: true,
  template: require('./index.html'),
  controller
};

