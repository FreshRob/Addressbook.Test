describe('addressForm Directive Tests', function(){
	var userAddressService, $rootScope, userId=1, html = '<address-form></address-form>', $q, $compile, addAddressSpy, editAddressSpy, directive = "addressForm";
	beforeEach(module('templates'));
	beforeEach(module('tn.address'));
	
	beforeEach(module(function($provide){
		userAddressService = { addAddress : function(){}, editAddress: function(){}}
		$provide.value('userAddressService', userAddressService);
	}));
	beforeEach(inject(function(_$q_, _$rootScope_, _$compile_){
		$q = _$q_;
		$rootScope = _$rootScope_;
		$compile  = _$compile_;
	}));
	beforeEach(function(){
		addAddressSpy = spyOn(userAddressService, 'addAddress')
		editAddressSpy= spyOn(userAddressService, 'editAddress')

		addAddressSpy.and.callFake(function(){
			return $q(function(resolve){
				resolve({ address: { id: 1, firstName: 'hello'}});
			});
		})

		editAddressSpy.and.callFake(function(userId, address){
			return $q(function(resolve){
				resolve({ address: { id: 1, firstName: 'change'}});
			});
		})
	});

	it("populate the vm if an editableAddress has been passed in ", function(){

		$rootScope.address = { firstName: 'me' };
		$rootScope.example = true;
		$rootScope.onNewRecord = function(){};
		var element = angular.element('<address-form show-form="example" edit-address="address" on-new-record="newRecordCreated"></address-form>');  
		$compile(element)($rootScope.$new())  
		$rootScope.$digest();
		var vm = element.controller("addressForm")
		expect(vm.model.firstName).toBe('me');
	});  

	it("reset model when ResetForm is called", function(){

		$rootScope.address = { firstName: 'me' };
		$rootScope.example = true;
		$rootScope.onNewRecord = function(){};
		var element = angular.element('<address-form show-form="example" edit-address="address" on-new-record="newRecordCreated"></address-form>');  
		$compile(element)($rootScope.$new())  
		$rootScope.$digest();
		var vm = element.controller("addressForm")
		vm.model.firstName = 'test';
		expect(vm.model.firstName).toBe('test');
		vm.resetForm()
		expect(vm.model.firstName).toBe('me');
	});  

	it("update when edit-address is present", function(){
		
		$rootScope.address = { id: 1, firstName: 'me' };
		$rootScope.example = true;
		$rootScope.onNewRecord = function(){};
		var element = angular.element('<address-form show-form="example" edit-address="address" on-new-record="newRecordCreated"></address-form>');  
		$compile(element)($rootScope.$new())  
		$rootScope.$digest();
		var vm = element.controller("addressForm")
		vm.model.firstName = 'test';
		vm.saveForm();
		$rootScope.$apply();
		expect(editAddressSpy.calls.count()).toBe(1);
		expect(addAddressSpy.calls.count()).toBe(0);
		expect($rootScope.address.firstName).toBe('change');
	});  

	it("add when edit-address is not present", function(){
				
		$rootScope.example = true;
		$rootScope.newRecordCreated = function(){};
		var onNewRecordSpy = spyOn($rootScope, 'newRecordCreated')
		var element = angular.element('<address-form show-form="example" on-new-record="newRecordCreated"></address-form>');  
		$compile(element)($rootScope.$new())  
		$rootScope.$digest();
		var vm = element.controller("addressForm")
		vm.model.firstName = 'test';
		vm.saveForm();
		$rootScope.$apply();
		expect(editAddressSpy.calls.count()).toBe(0);
		expect(addAddressSpy.calls.count()).toBe(1);
		expect(onNewRecordSpy.calls.count()).toBe(1);
	});  

	it("refresh model when editaddress changes", function(){
				
		$rootScope.address = { id: 1, firstName: 'me' };
		var element = angular.element('<address-form edit-address="address"></address-form>');  
		$compile(element)($rootScope.$new())  
		$rootScope.$digest();
		var vm = element.controller("addressForm")
		expect(vm.model.firstName).toBe('me');
		$rootScope.address.firstName = 'hello';
		$rootScope.$apply();
		expect(vm.model.firstName).toBe('hello');
	});  
});
