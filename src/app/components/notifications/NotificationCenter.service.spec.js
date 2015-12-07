(function() {
	'use strict';

	describe('services', function () {

		var NotificationCenter,
			NotificationConstants;

		beforeEach(module('mk.notifications.services.NotificationCenter'));

		beforeEach(inject(function(_NotificationCenter_, _NotificationConstants_) {
			NotificationCenter = _NotificationCenter_;
			NotificationConstants = _NotificationConstants_;
		}));

		it('should have a specified api', function() {
			expect(angular.isFunction(NotificationCenter.add)).toBe(true);
			expect(angular.isFunction(NotificationCenter.remove)).toBe(true);
			expect(angular.isFunction(NotificationCenter.getGroupedNotifications)).toBe(true);
			expect(angular.isFunction(NotificationCenter.getVisibleNotifications)).toBe(true);

		});

		it('should add a new notification', function() {

			var notification = {
				header: 'Test title',
				content: 'Test Message',
				category: 'error'
			};

			NotificationCenter.add(notification);
			expect(NotificationCenter.getVisibleNotifications().length).toBe(1);

		});

		it('should remove a specified notification', function() {
			var notification = {
				header: 'test title',
				content: 'test message',
				category: 'warning',
				id: 1234
			};

			NotificationCenter.add(notification);
			expect(NotificationCenter.getVisibleNotifications().length).toBe(1);

			NotificationCenter.remove(notification.id);
			expect(NotificationCenter.getVisibleNotifications().length).toBe(0);

		});

		it('should not break if delete id is not present', function() {
			var notification = {
				header: 'test title',
				content: 'test message',
				category: 'warning',
				id: 1234
			};

			NotificationCenter.add(notification);
			NotificationCenter.remove(234);

			expect(NotificationCenter.getVisibleNotifications().length).toBe(1);

		});

		it('should get all grouped notifications', function() {
			expect(NotificationCenter.getGroupedNotifications().length).toBe(0);
		});

		it('should move old notifications to a group if limit is reached', function() {
			var notification = {
				header: 'test title',
				content: 'test message',
				category: 'info'
			};
			for (var i = 0; i < NotificationConstants.CONFIG.MAX_VISIBLE; i++) {
				notification.id = i;
				NotificationCenter.add(notification);
			}

			// add one more notification to trigger move to group
			notification.id = 12345;

			NotificationCenter.add(notification);
			expect(NotificationCenter.getVisibleNotifications().length).toBe(NotificationConstants.CONFIG.MAX_VISIBLE);
			expect(NotificationCenter.getGroupedNotifications().length).toBe(1);

			var groupedNotification = NotificationCenter.getGroupedNotifications()[0];

			expect(groupedNotification.id).toBe(0);

		});

		it('should move a grouped notification from group to visible', function() {
			var notification = {
				header: 'test title',
				content: 'test message',
				category: 'info'
			};
			for (var i = 0; i < NotificationConstants.CONFIG.MAX_VISIBLE; i++) {
				notification.id = i;
				NotificationCenter.add(notification);
			}

			// add one more notification to trigger move to group
			notification.id = 12345;
			NotificationCenter.add(notification);

			// remove a visible notification
			NotificationCenter.remove(12345);

			expect(NotificationCenter.getGroupedNotifications().length).toBe(0);
			expect(NotificationCenter.getVisibleNotifications().length).toBe(NotificationConstants.CONFIG.MAX_VISIBLE);

		});

		it('should set the css class for missing notification category to \'info\' category', function() {
			var notification = {
				header: 'test',
				content: 'test',
				id: 1
			};

			NotificationCenter.add(notification);
			expect(NotificationCenter.getVisibleNotifications()[0].cssClass).toBe(NotificationConstants.CATEGORY.INFO);
		});
	});
})();
