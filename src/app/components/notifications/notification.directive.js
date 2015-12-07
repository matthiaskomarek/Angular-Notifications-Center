/**
 * @ngdoc directive
 * @name mk.notifications.directives.Notification:notification
 * @restrict 'AE'
 * @element ANY
 * @scope
 * @requires mk.notifications.services.NotificationCenter
 * @requires $timeout
 * @required NotificationConstants
 * @param {object} notification as object to display
 * @description
 *
 * A angular directive to display header, content and category (in different colors) of a notification.
 * Adds a close button to the notification to dismiss the notification.
 * Adds a timeout to the notification, to auto-dismiss the notification after 90s.
 * Duration can be specified in mk.notifications.services.NotificationCenter.NotificationConstants
 *
 * Timeout gets removed on 'mouseenter' event of the notification.
 * Timeout gets added again on 'mouseleave' event of the notification.
 *
 * `<div notification="{header: 'test title', content: 'test content', category: 'error'}"></div>`
 * @example
 *
 */

(function () {
	'use strict';

	angular
		.module('mk.notifications.directives.Notification', [
			'mk.notifications.services.NotificationCenter'
		])
		.directive('notification', notification);

	notification.$inject = ['NotificationCenter', '$timeout', 'NotificationConstants'];

	/* @ngInject */
	function notification(NotificationCenter, $timeout, NotificationConstants) {
		var directive = {
			bindToController: true,
			controller: NotificationDirectiveController,
			controllerAs: 'vm',
			link: link,
			restrict: 'AE',
			scope: {
				notification: '='
			},
			replace: true,
			template: [
				'<div class="notification" ng-class="::vm.notification.cssClass">',
					'<a class="notification-close-button" ng-click="vm.close()">&times;</a>',
					'<div class="notification-title">{{::vm.notification.header}}</div>',
					'<div class="notification-message">{{::vm.notification.content}}</div>',
				'</div>'
			].join(' ')
		};
		return directive;

		function link(scope, element) {
			var closeTimeout;

			/**
			 * cancels the current timeout for the auto-dismiss function
			 */
			var cancelTimeout = function() {
				$timeout.cancel(closeTimeout);
			};

			/**
			 * creates a timeout for the auto-dismiss function
			 */
			var createTimeout = function() {
				closeTimeout = $timeout(function() {
					NotificationCenter.remove(scope.vm.notification.id);
				}, NotificationConstants.CONFIG.SHOW_DURATION);
			};

			/**
			 * Add Event to element to trigger cancelTimeout function
			 */
			element.on('mouseenter', function() {
				if(closeTimeout) {
					cancelTimeout();
				}
			});

			/**
			 * Add event to element to trigger createTimeout function
			 */
			element.on('mouseleave', function() {
				createTimeout();
			});

			// initial set timeout for auto-dismiss
			createTimeout();

		}
	}

	NotificationDirectiveController.$inject = ['NotificationCenter'];

	/* @ngInject */
	function NotificationDirectiveController(NotificationCenter) {
		var vm = this;
		vm.close = function() {
			NotificationCenter.remove(vm.notification.id);
		};
	}

})();

