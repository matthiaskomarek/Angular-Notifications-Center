(function() {
  'use strict';

  angular
    .module('notifications')
    .run(runBlock);

  /** @ngInject */
  function runBlock($log) {

    $log.debug('runBlock end');
  }

})();
