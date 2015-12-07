(function() {
	'use strict';

	angular
		.module('myApp')
		.controller('MainController', MainController);

	/** @ngInject */
	function MainController(NotificationCenter) {
		var vm = this;

		vm.newNotification = {
			header: 'Test Title',
			content: 'Test Message',
			category: 'info'
		};

		vm.createNotification = function() {
			NotificationCenter.add(vm.newNotification);
		}
	}
})();
