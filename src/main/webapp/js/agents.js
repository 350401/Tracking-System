

app.controller('AgentCreateController', function($scope,$rootScope,$location,$http,UserPrevService) {
	$scope.agent ={}; 
	$scope.optType = "create";
	$scope.submitclick = false;
	$rootScope.currentPage ='createAgent';
	
	$scope.createAgent = function(agent){
		if(!$scope.agentform.$valid){
			$scope.submitclick = true;
			return;
		}

		agent.company = {};
		agent.company.id = $scope.company.id;
		
			var dataObj = JSON.stringify(agent);
			$http.post(hostname+'/agent/create', dataObj, {
			  headers: {
				'Content-Type': 'application/json; charset=UTF-8'
			  },
			}).success(function(responseData) {
				  try {
					console.log(JSON.stringify(responseData));
					$scope.optStatus = 'Success';
					$scope.message = 'Agent ' +agent.name + ' creation done successfully.';
					//$location.path("/show-user");
					$scope.agent ={}; 
					//$scope.optStatus = null;
					$scope.submitclick = false;	
				  } catch (err) {
					alert(JSON.stringify(err));
					$scope.optStatus = 'Failed';
					$scope.message = ' Failed to create agent';
				  }
			 }).error(function(data, status, headers, config) {
				console.log(JSON.stringify(data) +" headers : "+ JSON.stringify(headers) +"  status : " + status);
				$scope.optStatus = 'Failed';
				$scope.message = ' Failed to create agent';
			  });		
	}
	
});


app.controller('AgentEditController', function($scope,$rootScope,$location,$http,UserPrevService) {

    $scope.optType = "edit";
 	$scope.submitclick = false;
    $rootScope.currentPage ='editAgent';

	$scope.editAgent = function(agent){
		
		if(!$scope.agentform.$valid){
			$scope.submitclick = true;
			return;
		}		
			var dataObj = JSON.stringify(agent);
			$http.post(hostname + '/agent/update', dataObj, {
			  headers: {
				'Content-Type': 'application/json; charset=UTF-8'
			  },
			}).success(function(responseData) {
				  try {
					console.log(JSON.stringify(responseData));
					$scope.optStatus = 'Success';
					$scope.message = 'Agent '+agent.name + ' edit done successfully.';
					//$location.path("/show-user");
				  } catch (err) {
					alert(JSON.stringify(err));
					$scope.optStatus = 'Failed';
					$scope.message = ' Failed to edit agent';
				  }
			 }).error(function(data, status, headers, config) {
				console.log(JSON.stringify(data) +" headers : "+ JSON.stringify(headers) +"  status : " + status);
				$scope.optStatus = 'Failed';
				$scope.message = ' Failed to edit agent';
			  });
	}
	
	$scope.cancelAgent = function(){
		$rootScope.currentPage ='showAgents';
		console.log("  Cancel Agent");
		$location.path("view-agents");
	}	
	
});

app.controller('AgentsController', function($scope,$rootScope,$location,$http) {

    $rootScope.agents = [];
	$rootScope.currentPage ='showAgents';
	$http.get(hostname+'/agent/find-by-company/'+$scope.company.id).
			then(function(response) {
				$rootScope.agents = response.data;
				//$rootScope.curTab = 'userTab';
	});	
	
	$scope.agent ={}; 
	$scope.message ='';
	$scope.optStatus = null;
	
	$scope.editAgent = function(agent){
		$rootScope.currentPage ='editAgent';
		$scope.message ='';
		console.log( " Edit User");
		$location.path("edit-agent");
		$rootScope.agent = agent ;
	}

	$scope.deleteAgent = function(agent){
		console.log( " delete Agent");
		$scope.message ='';
		var flag = confirm("Are you sure you want to delete this Agent ?");
		if(flag){
			
			
			var dataObj = JSON.stringify(agent);
			var url = hostname + '/agent/delete/'+agent.id;
			console.log(url);
			$http.delete(url, dataObj, {
			  headers: {
				'Content-Type': 'application/json; charset=UTF-8'
			  },
			}).success(function(responseData) {
				  try {
					console.log(JSON.stringify(responseData));
					$scope.message = 'Agent '+agent.name + ' deleted successfully.';
					$scope.optStatus = 'Success';
					$http.get(hostname+'/agent/find-by-company/'+$scope.company.id).
							then(function(response) {
								$rootScope.agents = response.data;
					});	
				  } catch (err) {
					alert(JSON.stringify(err));
					$scope.optStatus = 'Failed';
					$scope.message = ' Failed to delete agent' +agent.name ;
				  }
			 }).error(function(data, status, headers, config) {
				console.log(JSON.stringify(data) +" headers : "+ JSON.stringify(headers) +"  status : " + status);
				$scope.optStatus = 'Failed';
				$scope.message = ' Failed to delete agent' +agent.name ;
			  });			
		}
		
		
	}	
	
	//$rootScope.curTab = 'userTab';
	//console.log("   User Tab ");
	//$rootScope.currentPage = "userList";
	//console.log("   currentPage :  " + $rootScope.currentPage);
});
