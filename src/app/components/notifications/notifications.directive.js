/**
 * @name
 * @author Matthias Komarek matthias@mkomarek.de
 * @copyright Matthias Komarek 2015
 * @date 06.12.15 19:18
 */

(function () {
	'use strict';

	angular
		.module('mk.notifications.directives.Notification', [
			'mk.notifications.services.NotificationCenter'
		])
		.directive('notification', notification);

	notification.$inject = ['NotificationCenter', '$timeout'];

	/* @ngInject */
	function notification(NotificationCenter, $timeout) {
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
					'<div class="notification-title">{{::vm.notification.title}}</div>',
					'<div class="notification-message">{{::vm.notification.message}}</div>',
				'</div>'
			].join(' ')
		};
		return directive;

		function link(scope, element) {
			var closeTimeout;

			/**
			 * cancel
			 */
			var cancelTimeout = function() {
				$timeout.cancel(closeTimeout);
			};

			var createTimeout = function() {
				closeTimeout = $timeout(function() {
					NotificationCenter.remove(scope.vm.notification.id);
				}, 90000);
			};

			element.on('mouseenter', function() {
				if(closeTimeout) {
					cancelTimeout();
				}
			});

			element.on('mouseleave', function() {
				createTimeout();
			});

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

