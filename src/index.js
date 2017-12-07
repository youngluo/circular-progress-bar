import progress from './components/progress/index';
import timeline from './components/timeline/index';

export default angular
  .module('bee-ui', [])
  .component('timeline', timeline)
  .component('progress', progress);
