(function(){
	angular.module('tn.address')
	.directive('addressList', ['userAddressService', function(userAddressService){
		return{
			scope: {},
			restrict: 'E',
			template: '<div> <button ng-click="vm.newAddress()"> Create New address </button> <address-form show-form="vm.showAddressForm" edit-address="vm.addressToEdit" on-new-record="vm.newRecordCreated"></address-form><div ng-if="!vm.loaded">Loading</div><ul ng-if="vm.loaded"><li ng-repeat="address in vm.addresses track by address.id" address-summary="" address="address" delete-address="vm.deleteAddress(address)" edit-address="vm.editAddress(address)"></li></ul> </div>',
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
				vm.newRecordCreated = function(address){
					vm.addresses.push(address)
				}
			},
			controllerAs: 'vm',
        	bindToController: true
		}
	}]);
})();