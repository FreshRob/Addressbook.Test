(function(){
	angular.module('tn.address').factory('userAddressService', ['$q', function($q){
			return{
				getAddresses: function(userId){
					var storedAddresses = JSON.parse(localStorage.getItem(getAddressId(userId)));
					 return $q(function(resolve){
					 	var addresses = storedAddresses ? storedAddresses : [];
					 	resolve(addresses);
					 });
				},
				addAddress: function(userId, address){
					var addresses = this.getAddresses(userId);
					return $q(function(resolve){
						addresses.then(function(result){
							address.id = result.length;
							result.push(address);
							saveToStorage(userId, result)
							resolve({
								address: address
							});
						});
					});	
				},
				deleteAddress: function(userId, addressId){
					var addresses = this.getAddresses(userId);
					return $q(function(resolve){
						addresses.then(function(result){
						    for(var i = 0; i < result.length; i++){
						    	if(result[i].id === addressId){
						    		result.splice(i)
						    		break;
						    	}
						    }
						    saveToStorage(userId, result)
							resolve({});
						});
					});	
				},
				editAddress: function(userId, address){
					var addresses = this.getAddresses(userId);
					return $q(function(resolve){
						addresses.then(function(result){
						    for(var i = 0; i < result.length; i++){
						    	if(result[i].id === address.id){
						    		result[i] = address;
						    		break;
						    	}
						    }
						    saveToStorage(userId, result)
							resolve({
								address: address
							});
						});
					});	
				}
			}

			function getAddressId(userId)
			{
				return 'address-' + userId;
			}	
			function saveToStorage(userId, addresses){
				localStorage.setItem(getAddressId(userId), JSON.stringify(addresses));
			}
	}]);
})();