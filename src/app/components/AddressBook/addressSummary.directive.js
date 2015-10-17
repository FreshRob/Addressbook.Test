(function(){
	angular.module('tn.address')
	.directive('addressSummary', function(){
		return{
			scope: { address: '=',
					  editAddress: '&',
					  deleteAddress: '&'},
			restrict: 'EA',
			templateUrl: '/src/app/components/AddressBook/addressSummary.template.html',
			controller: function(){
				var vm = this;
			},
			controllerAs: 'ai',
        	bindToController: true
		}
	});
})();