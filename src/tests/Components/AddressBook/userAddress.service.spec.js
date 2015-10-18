describe('UserAddress Service Tests', function(){
	var userAssressService, $rootScope, userId=1;
	beforeEach(module('tn.address'));
	beforeEach(inject(function(_userAddressService_, _$rootScope_){
		variableApiService = _userAddressService_;
		$rootScope = _$rootScope_;
	}));
	afterEach(function(){
		destroyStore();
	})

	it("getAddresses", function(){

		it("Return empty array if no reuslts founds for the user", function(){
				var result = userAssressService.getAddresses(userId);
				$rootScope.$apply();
				expect(result.length).toBe(0)
				expect(typeof result).toBe("array");
		});

		it("Return results from storage", function(){
			    setupStore([1,2,3]);
				var result = userAssressService.getAddresses(userId);
				$rootScope.$apply();
				expect(result.length).toBe(3)
				expect(result[0]).toBe(1)
				expect(typeof result).toBe("array");
		});
    	        
    });




	function setupStore(object){
    	localStorage.setItem(getAddressId(), JSON.stringify())
    }

    function destroyStore(){
    	localStorage.removeItem(getAddressId())
    }
	function getAddressId(){
		return 'address-' + userId;
	}		

});