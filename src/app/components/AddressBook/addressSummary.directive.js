(function(){
	angular.module('tn.address')
	.directive('addressSummary', function(){
		return{
			scope: { address: '=',
					  editAddress: '&',
					  deleteAddress: '&'},
			restrict: 'EA',
			template: '<div> {{ ai.address.firstName }} {{ ai.address.lastName }} <button ng-click="ai.editAddress()">edit</button> <button ng-click="ai.deleteAddress()">delete</button></div>',
			controller: function(){
				var vm = this;
			},
			controllerAs: 'ai',
        	bindToController: true
		}
	});
})();