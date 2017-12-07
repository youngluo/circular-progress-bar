import controller from './controller';
import './index.less';

const DOO = {
    bindings: {
        percent: '<',
    },
    transclude: true,
    template: require('./index.html'),
    controller
};

export default angular
    .module('app.component.progress', [])
    .component('fnProgress', DOO)
    .name;
