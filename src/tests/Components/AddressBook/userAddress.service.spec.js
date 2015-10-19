describe('UserAddress Service Tests', function(){
	var userAddressService, $rootScope, userId=1;
	beforeEach(module('tn.address'));
	beforeEach(inject(function(_userAddressService_, _$rootScope_){
		userAddressService = _userAddressService_;
		$rootScope = _$rootScope_;
	}));
	afterEach(function(){
		destroyStore();
	})

	describe("getAddresses", function(){

		it("Return empty array if no reuslts founds for the user", function(){
				var result = userAddressService.getAddresses(userId);				
				result.then(function(result){
					expect(result.length).toBe(0)
					expect(Array.isArray(result)).toBeTruthy();
				})		
				$rootScope.$digest();	
		});

		it("Return results from storage", function(){
			    setupStore([1,2,3]);
				var result = userAddressService.getAddresses(userId);
				result.then(function(result){
					expect(result.length).toBe(3)
					expect(result[0]).toBe(1)
					expect(Array.isArray(result)).toBeTruthy();
				})	
				$rootScope.$digest();
		});    	        
    });

	describe("addAddress", function(){

		it("Return adress with Id present", function(){
				var address = { name: 'hello'};
				var result = userAddressService.addAddress(userId, address);
				result.then(function(result){
					expect(result.address.name).toBe(address.name)
					expect(result.address.id).toBe(0)
				});
				$rootScope.$digest();			
				var getAddresses = userAddressService.getAddresses(userId);	
				getAddresses.then(function(result){			
					expect(result[0].id).toBe(0);
				});
				$rootScope.$digest();
		});	        
    });

	describe("deleteAddress", function(){
		it("Return adress with Id present", function(){
				var addressID = 3;
				setupStore([{id: addressID}]);				
				var result = userAddressService.deleteAddress(userId, addressID);	
				$rootScope.$digest();		
					var getAddresses2 = userAddressService.getAddresses(userId);
					getAddresses2.then(function(getAddresses2){
						expect(getAddresses2.length).toBe(0);
					})	
				$rootScope.$digest();												
		});	        
    });

    describe("editAddress", function(){
		it("Chnage an addedd which exists", function(){
				var addressID = 3;
				setupStore([{id: addressID}]);
				var addressChange = {id: addressID, name: 'hello' }				
				var result = userAddressService.editAddress(userId, addressChange);
				$rootScope.$digest();
				var getAddresses = userAddressService.getAddresses(userId);
				
				getAddresses.then(function(result){
					expect(result.length).toBe(1);
					expect(result[0].name).toBe(addressChange.name);
				});		
				$rootScope.$digest();	
				
		});	        
    });

	function setupStore(object){
    	localStorage.setItem(getAddressId(), JSON.stringify(object))
    }

    function destroyStore(){
    	localStorage.removeItem(getAddressId())
    }
	function getAddressId(){
		return 'address-' + userId;
	}		

});