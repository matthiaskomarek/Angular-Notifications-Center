/**
 * @ngdoc directive
 * @name mk.notifications.directives.NotificationContainer:notificationContainer
 * @restrict 'AE'
 * @element ANY
 * @scope
 * @requires mk.notifications.directives.Notification:notification
 * @description
 *
 * An angular directive to create a container for all notifications on the top right corner of the screen.
 * Fetches all grouped and visible notifications and displays them on the screen.
 *
 * @example
 * <div notification-container></div>
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
		// fetch all notifications from NotificationCenter
		vm.groupedNotifications = NotificationCenter.getGroupedNotifications();
		vm.visibleNotifications = NotificationCenter.getVisibleNotifications();
	}

})();

