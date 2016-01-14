/**
 * @ngdoc overview
 * @name mk.notifications
 * @description
 *
 * # mk.notifications
 * The mk.notifications module provides a service to display notification messages in front of the user.
 * Notifications are placed on the top right corner of the screen and are visible for 90s.
 * Notifications are also dismissable by close button
 * Notifications get stacked up until the max amount is reached (Default: 5). The service will group older notifications
 * into a group so that the max amount is satisfied again.
 * If a visible notification gets dismissed, the newest grouped notification gets visible again.
 * The ngAnimate module is optional, if you include it you will get some transitions for new notifications.
 */

(function() {
	'use strict';

	angular
		.module('mk.notifications', [
			'mk.notifications.services.NotificationCenter',
			'mk.notifications.directives.Notification',
			'mk.notifications.directives.NotificationContainer'
		]);
})();
