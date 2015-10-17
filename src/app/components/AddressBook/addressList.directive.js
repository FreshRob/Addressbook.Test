(function(){
	angular.module('tn.address')
	.directive('addressList', ['userAddressService', function(userAddressService){
		return{
			scope: {},
			restrict: 'E',
			templateUrl: '/src/app/components/AddressBook/addressList.template.html',
			controller: function(){
				var vm = this;
				vm.loaded = false;
				vm.showAddressForm = false;
				vm.addresses = []
				userAddressService.getAddresses('1').then(function(result){
						vm.addresses = result
						vm.loaded = true;
				});
				vm.newAddress = function(){
					vm.addressToEdit = undefined;
					vm.showAddressForm = true;
				}
				vm.editAddress = function(address){					
					vm.addressToEdit = address;
					console.log('edit me' + address)
					vm.showAddressForm = true;
				}
				vm.deleteAddress = function(address){	
					userAddressService.deleteAddress('1', address.id).then(function(){
						for(var i = 0; i < vm.addresses.length; i++){
						if(address.id === vm.addresses[i].id){
							vm.addresses.splice(i, 1)
							break;
						}
					}
					});
				}
				vm.setNameStartsWith = function(range){
					if(!range || typeof range != "string" || range.indexOf('-') < 0){
						nameStartsWithRegex = undefined;
						return;
					}

					nameStartsWithRegex = new RegExp('^[' + range.toLowerCase() + ']', 'i');
				}	

				var nameStartsWithRegex = undefined;				

				vm.nameCharacterRangeFilterList = [
					"All",
					"A-E",
					"F-K",
					"L-P",
					"Q-V",
					"W-Z"
				];

				vm.nameStartsWith = function(item){
					if(typeof nameStartsWithRegex === "undefined" || !nameStartsWithRegex){
						return true;
					}

					return nameStartsWithRegex.test(item.firstName) || nameStartsWithRegex.test(item.lastName)
				}	
			
				vm.newRecordCreated = function(address){
					vm.addresses.push(address)
				}
			},
			controllerAs: 'vm',
        	bindToController: true
		}
	}]);
})();