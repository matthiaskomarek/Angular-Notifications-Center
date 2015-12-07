/**
 * @ngdoc object
 * @name mk.notifications.services.NotificationCenter
 * @requires NotificationConstants
 * @description
 *
 * An angular service to handle the notifications displayed.
 * The service can add, remove and group different notifications.
 *
 */

(function () {
	'use strict';

	angular
		.module('mk.notifications.services.NotificationCenter', [])
		.constant('NotificationConstants', {
			CATEGORY: {
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

	NotificationCenter.$inject = ['NotificationConstants'];

	/* @ngInject */
	function NotificationCenter(NotificationConstants) {

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

		/**
		 * @ngdoc function
		 * @name add
		 * @methodOf mk.notifications.services.NotificationCenter
		 * @description
		 * Adds a new notification to the notification list.
		 * If max amount reached, oldest notifications get grouped.
		 * @example {header: 'test header', content: 'test content'}
		 * @param {object} notification the notification to add
		 * @returns {void} nothing
		 */
		function add(notification) {
			var notificationBase = {
				id: index++
			};
			var newNotification = angular.extend({}, notificationBase, notification);
			newNotification.cssClass = getClassForCategory(newNotification.category);

			// check if max visible notifications are reached
			if (isMaxLengthReached()) {
				// move oldes notification to grouped
				var oldNotification = notifications.shift();
				groupedNotifications.push(oldNotification);
			}

			notifications.push(newNotification);
		}

		/**
		 * @ngdoc function
		 * @name remove
		 * @methodOf mk.notifications.services.NotificationCenter
		 * @description
		 * Removes a notification from the visible notification list.
		 * If grouped notifications are available, it will move newest grouped notification to visible notification
		 * list.
		 * @param {number} notificationId the id of the notification which should be removed
		 * @returns {void} nothing
		 */
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

		/**
		 * @ngdoc function
		 * @name findNotification
		 * @methodOf mk.notifications.services.NotificationCenter
		 * @description
		 * Finds and returns a notification from the visible notification list for id
		 * @param {number} notificationId the id of the notification
		 * @returns {object} notification
		 */
		function findNotification(notificationId) {
			for (var i = 0; i < notifications.length; i++) {
				if(notifications[i].id === notificationId) {
					return notifications[i];
				}
			}
		}

		/**
		 * @ngdoc function
		 * @name getVisibleNotifications
		 * @methodOf mk.notifications.services.NotificationCenter
		 * @description
		 * Returns all visible notifications as array
		 * @returns {Array} array with notifications as objects
		 */
		function getVisibleNotifications() {
			return notifications;
		}

		/**
		 * @ngdoc function
		 * @name getGroupedNotifications
		 * @methodOf mk.notifications.services.NotificationCenter
		 * @description
		 * Returns all grouped notifications as array
		 * @returns {Array} array with notifications as objects
		 */
		function getGroupedNotifications() {
			return groupedNotifications;
		}

		/**
		 * @ngdoc function
		 * @name getClassForCategory
		 * @methodOf mk.notifications.services.NotificationCenter
		 * @description
		 * Returns a css class as string for notification category.
		 * Defaults to category info if no category is specified
		 * @params {string} category to get css class for
		 * @returns {string} css class as string
		 */
		function getClassForCategory(category) {
			switch (category) {
				case 'info':
					return NotificationConstants.CATEGORY.INFO;

				case 'warning':
					return NotificationConstants.CATEGORY.WARNING;

				case 'error':
					return NotificationConstants.CATEGORY.ERROR;

				default:
					return NotificationConstants.CATEGORY.INFO;
			}
		}

		/**
		 * @ngdoc function
		 * @name isMaxLengthReached
		 * @methodOf mk.notifications.services.NotificationCenter
		 * @description
		 * Checks if max allowed amount of visible notifications are reached.
		 * @returns {boolean} is reached or not
		 */
		function isMaxLengthReached() {
			return notifications.length >= NotificationConstants.CONFIG.MAX_VISIBLE;
		}
	}
})();

