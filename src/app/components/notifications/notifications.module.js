/**
 * @name
 * @author Matthias Komarek matthias@mkomarek.de
 * @copyright Matthias Komarek 2015
 * @date 06.12.15 18:28
 */

(function() {
	'use strict';

	angular
		.module('mk.notifications', [
			'ngAnimate',
			'mk.notifications.services.NotificationCenter',
			'mk.notifications.directives.Notification',
			'mk.notifications.directives.NotificationContainer'
		]);
})();
