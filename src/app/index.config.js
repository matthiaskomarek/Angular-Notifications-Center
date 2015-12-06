(function() {
	'use strict';

    angular
		.module('myApp')
	    .config(config);

    /** @ngInject */
    function config($logProvider) {
        // Enable log
        $logProvider.debugEnabled(true);
    }
})();
