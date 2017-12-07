import './index.less';

const DOO = {
    bindings: {
        data: '<',
        rows: '<'
    },
    template: require('./index.html'),
};

export default angular
    .module('app.component.timeline', [])
    .component('timeline', DOO)
    .name;
