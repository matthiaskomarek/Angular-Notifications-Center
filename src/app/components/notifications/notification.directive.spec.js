(function() {
	'use strict';

	describe('Notification Directive', function () {

		var element,
			isoScope,
			$scope,
			$rootScope,
			$timeout;

		beforeEach(module(
			'mk.notifications.directives.Notification'
		));

		beforeEach(inject(function(_$rootScope_, _$timeout_) {
			$rootScope = _$rootScope_;
			$scope = $rootScope.$new();
			$timeout = _$timeout_;
		}));

		beforeEach(inject(function($compile) {
			element = angular.element('<div notification="notification"></div>');
			$scope.notification = {
				id: 12,
				title: 'test title',
				message: 'test message'
			};
			$compile(element)($scope);
			$scope.$digest();
			isoScope = element.isolateScope();

			spyOn(isoScope.vm, 'close').and.callThrough();

			spyOn($timeout, 'cancel').and.callThrough();
		}));

		it('should have a close function', function() {
			expect(angular.isFunction(isoScope.vm.close)).toBe(true);
			element.find('a').triggerHandler('click');

			expect(isoScope.vm.close).toHaveBeenCalled();
		});

		it('should cancel timeout on mouseenter event', function() {
			element.triggerHandler('mouseenter');
			expect($timeout.cancel).toHaveBeenCalled();
		});
	});
})();
