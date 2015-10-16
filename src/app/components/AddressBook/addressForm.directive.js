(function(){
	angular.module('tn.address')
	.directive('addressForm', ['userAddressService', function(userAddressService){
		return{
			scope: { editAddress: '=', onNewRecord: '=', showForm: '='},
			restrict: 'EA',
			template: '<form ng-if="frm.showForm"> <input type="text" ng-model="frm.model.firstName" required/> <button ng-click="frm.saveForm()">Save</button></form>',
			controller: ['$scope', function($scope){
				var vm = this;
				vm.model = populateFormModel(vm.editAddress);
				vm.saveForm = function(){

					if(typeof vm.model.id  == 'number' && vm.model.id > -1){
						userAddressService.editAddress(1, vm.model).then(function(result){
							Object.keys(result.address).forEach(function(key){
								vm.editAddress[key] = result.address[key];
							})
							vm.showForm = false;
						});
						return;
					}

					userAddressService.addAddress(1, vm.model).then(function(result){
							vm.onNewRecord(result.address);
							vm.model = populateFormModel(vm.editAddress);
							vm.showForm = false;
					});

				}
				$scope.$watch('frm.editAddress', function(newRecord, oldRecord){
						vm.model = populateFormModel(vm.editAddress);
				}, true)
			}],
			controllerAs: 'frm',
        	bindToController: true
		}

		function populateFormModel(editAddress){
			if(editAddress){
				return angular.copy(editAddress);
			}
			return {
				firstName: '',
				lastName: '',
			}
		}
	}]);
})();