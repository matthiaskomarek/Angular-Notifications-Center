(function() {
    'use strict';

    angular
        .module('myApp')
        .controller('MainController', MainController);

    /** @ngInject */
    function MainController(NotificationCenter) {
        var vm = this;

	    vm.newNotification = {
		    title: 'Test Title',
		    message: 'Test Message',
		    type: 'info'
	    };

	    NotificationCenter.add('Test title', 'messager wer gwerdwe wwerg wergwer', 'error');

	    vm.createNotification = function() {
		    NotificationCenter.add(vm.newNotification.title, vm.newNotification.message, vm.newNotification.type);
	    }
    }
})();
