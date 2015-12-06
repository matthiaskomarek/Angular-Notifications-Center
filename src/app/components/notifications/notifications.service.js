/**
 * @name
 * @author Matthias Komarek matthias@m-komarek.de
 * @copyright Matthias Komarek 2015
 * @date 06.12.15 19:18
 */

(function () {
	'use strict';

	angular
		.module('mk.notifications')
		.constant('NotificationConstants', {
			TYPE: {
				INFO: 'notification-info',
				ERROR: 'notification-error',
				WARNING: 'notification-warning'
			},
			CONFIG: {
				SHOW_DURATION: 90000,
				MAX_VISIBLE: 5
			}
		})
		.factory('NotificationCenter', NotificationCenter);

	NotificationCenter.$inject = ['$log', 'NotificationConstants'];

	/* @ngInject */
	function NotificationCenter($log, NotificationConstants) {

		var notifications = [];
		var groupedNotifications = [];
		var index = 0;

		/**
		 * API
		 */
		var service = {
			add: add,
			remove: remove,
			getGroupedNotifications: getGroupedNotifications,
			getVisibleNotifications: getVisibleNotifications
		};

		return service;

		////////////////

		function add(title, message, type) {
			var notification = {
				id: index++,
				title: title,
				message: message,
				type: type,
				cssClass: getClassForType(type)
			};

			// check if max visible notifications are reached
			if (isMaxLengthReached()) {
				// move oldes notification to grouped
				var oldNotification = notifications.shift();
				groupedNotifications.push(oldNotification);
			}

			notifications.push(notification);
		}

		function remove(notificationId) {
			var notification = findNotification(notificationId);

			if(notification) {
				var index = notifications.indexOf(notification);
				notifications.splice(index, 1);

				// check if grouped notifications are available and maxLength not reached
				if(groupedNotifications.length > 0 && !isMaxLengthReached()) {
					var oldNotification = groupedNotifications.pop();
					notifications.unshift(oldNotification);
				}
			}
		}

		function findNotification(notificationId) {
			for (var i = 0; i < notifications.length; i++) {
				if(notifications[i].id === notificationId) {
					return notifications[i];
				}
			}
		}

		function getVisibleNotifications() {
			return notifications;
		}

		function getGroupedNotifications() {
			return groupedNotifications;
		}

		function getClassForType(type) {
			switch (type) {
				case 'info':
					return NotificationConstants.TYPE.INFO;

				case 'warning':
					return NotificationConstants.TYPE.WARNING;

				case 'error':
					return NotificationConstants.TYPE.ERROR;

				default:
					return NotificationConstants.TYPE.INFO;
			}
		}

		function isMaxLengthReached() {
			return notifications.length >= NotificationConstants.CONFIG.MAX_VISIBLE;
		}
	}
})();

