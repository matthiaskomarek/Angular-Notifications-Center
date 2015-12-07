(function() {
	'use strict';

	describe('Notification Container Directive', function () {

		var element,
			isoScope,
			$scope,
			$rootScope;

		beforeEach(module(
			'mk.notifications.directives.NotificationContainer'
		));

		beforeEach(inject(function(_$rootScope_) {
			$rootScope = _$rootScope_;
			$scope = $rootScope.$new();
		}));

		beforeEach(inject(function($compile) {
			element = angular.element('<div notification-container></div>');
			$compile(element)($scope);
			$scope.$digest();
			isoScope = element.isolateScope();
		}));

		it('should load available notifications', function() {
			expect(angular.isArray(isoScope.vm.groupedNotifications)).toBe(true);
			expect(angular.isArray(isoScope.vm.visibleNotifications)).toBe(true);
		});

	});
})();
