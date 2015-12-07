/**
 * @name
 * @author Matthias Komarek matthias@m-komarek.de
 * @copyright Matthias Komarek 2015
 * @date 07.12.15 00:14
 */
(function () {
	'use strict';

	angular
		.module('mk.notifications.directives.NotificationContainer', [
			'mk.notifications.directives.Notification'
		])
		.directive('notificationContainer', notificationContainer);

	function notificationContainer() {
		var directive = {
			bindToController: true,
			controller: NotificationContainerDirectiveController,
			controllerAs: 'vm',
			restrict: 'AE',
			scope: {},
			template: [
				'<div id="notifications-container" ng-if="vm.visibleNotifications.length > 0">',
					'<div class="notification-group" ng-show="vm.groupedNotifications.length > 0">',
						'<div class="notification-group-title">',
							'{{vm.groupedNotifications.length}} grouped notifications',
						'</div>',
					'</div>',
					'<div ng-repeat="entry in vm.visibleNotifications" notification="entry"></div>',
				'</div>'
			].join(' ')
		};
		return directive;

	}

	NotificationContainerDirectiveController.$inject = ['NotificationCenter'];

	/* @ngInject */
	function NotificationContainerDirectiveController(NotificationCenter) {
		var vm = this;
		vm.groupedNotifications = NotificationCenter.getGroupedNotifications();
		vm.visibleNotifications = NotificationCenter.getVisibleNotifications();
	}

})();

