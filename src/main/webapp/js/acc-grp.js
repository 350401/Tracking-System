app.controller('accGroupController', function($scope,$rootScope,$location,$http) {
	$rootScope.currentPage = 'createAccountGroups';
	
	$scope.singlegroups = [];
	$scope.singlegroup ={};
    $scope.singlegroup.newgroup	= "";
	$scope.multigroups =[];	
	//Groups data received from backend
	console.log(" Fetching Account group for Company Id : " + $scope.company.id );
	$http.get(hostname + '/accgroup/find-by-company/'+$scope.company.id).
		then(function(response) 
		{
			$scope.groups = response.data;
			//$scope.groups = response.data;
			console.log(" Groupth Length : " + $scope.groups.length)			
			angular.forEach($scope.groups, function (group) 
			{
				if(group.parent === 1){
				  $scope.singlegroups.push(group);
				}
			});	
		});	
						  



	$scope.setChildrenData = function(selGroup,grplevel){
		$scope.multiGrpMsg = "";
		$scope.singleGrpMsg = "";		
		    var selGrpId = (selGroup != null && selGroup.id != null ) ? selGroup.id : -1;
			var children = [];
			angular.forEach($scope.groups, function (group) {
				 if(group.parent == selGrpId){
					children.push(group);
					//$scope.multigroups[grplevel].children.push(group);
				 }
			});	
			
			console.log(" AccountGRP before : "+ $scope.multigroups.length);
			var tempGrps = [];
			for(i=0;i<grplevel; i++){
				
				if($scope.multigroups[i] != null){
					tempGrps[i]  = $scope.multigroups[i];
				}else{
				 tempGrps[i] = {};
				 tempGrps[i].children = [];
				}
			}
			$scope.multigroups = tempGrps;
			if(selGrpId > 0){
				$scope.multigroups[grplevel] = {};
				$scope.multigroups[grplevel].children = children;
			}
			
			var grpHyrhy = "";
			if($scope.singlegroup.selGroup != null)
				grpHyrhy = $scope.singlegroup.selGroup.name + " > ";
			
			angular.forEach($scope.multigroups, function (multiGrp) {
				 if(multiGrp.selGroup != null)
					 grpHyrhy = grpHyrhy + multiGrp.selGroup.name + " > " ;
			});
			$scope.grpHierarchy = grpHyrhy;
			
		   // $scope.multigroups[grplevel].children.push(children);
			console.log("AccountGRP After  :" + $scope.multigroups.length  +"   "+ children);
	}
	
	$scope.addGroup = function(){
		var newgroup = {};
		var selGroup = $scope.groupName;
		if(selGroup== null || selGroup.length == 0 || $scope.singlegroup.selGroup == null || $scope.singlegroup.selGroup <= 0 ){
			$scope.submitclick = true;
			return;
		}
		newgroup.name = selGroup;
		var grplevel = 0;
		if($scope.singlegroup.selGroup != null)
			grplevel++;
		
		angular.forEach($scope.multigroups, function (multiGrp) {
			 if(multiGrp.selGroup != null)
				 grplevel++;
		});	

		console.log( grplevel );
		console.log( selGroup );
		//newgroup.id = $scope.groups.length;
		newgroup.parent = 1;
		newgroup.company = {};
		newgroup.company.id = $scope.company.id;
		
		if(grplevel == 0){
			//$scope.groups.push(newgroup);
		}else if(grplevel == 1){
			newgroup.parent = $scope.singlegroup.selGroup.id;
		}else{
			newgroup.parent = $scope.multigroups[grplevel-2].selGroup.id;
		}		
		
		var dataObj = JSON.stringify(newgroup);
		console.log(dataObj);
		
		$http.post(hostname + '/accgroup/create', dataObj, {
		  headers: {
			'Content-Type': 'application/json; charset=UTF-8'
		  },
		}).success(function(responseData) {
			console.log("AccountGRP Response : " + responseData.id);
			  try {
                newgroup.id = responseData.id;
					if(grplevel == 0){
						$scope.singlegroups.push(newgroup);
						$scope.groups.push(newgroup);
						$scope.singleGrpMsg = " ' "+ newgroup.name + " ' account created successfully."  ;
					}else if(grplevel == 1){
						$scope.multigroups[0].children.push(newgroup);
						$scope.groups.push(newgroup);	
						$scope.singleGrpMsg = " ' "+ newgroup.name + " ' group created successfully."  ;						
					}else{
						$scope.multigroups[grplevel-1].children.push(newgroup);
						$scope.groups.push(newgroup);
						$scope.singleGrpMsg = " ' "+ newgroup.name + " ' group created successfully."  ;						
					}	

					$scope.groupName = "";
					$scope.grpHierarchy ="";
					$scope.submitclick = false;
					$scope.singlegroup.selGroup = null;
					console.log(" success "+ $scope.singleGrpMsg);
			  } catch (err) {
				console.log(JSON.stringify(err));
			  }
		 }).error(function(data, status, headers, config) {
			console.log(JSON.stringify(data) +" headers : "+ JSON.stringify(headers) +"  status : " + status);
		  });		
	

		console.log(" AccountGRP " + newgroup);
	}
    		
						  
});


app.controller('showAccountGroupsController', function($scope,$rootScope,$location,$http) {
		$rootScope.currentPage = 'showAccountGroups';
		console.log(" AccountGRP company.id "  + $scope.company.id );
	    $http.get(hostname + '/accgroup/find-by-company/'+$scope.company.id).
		then(function(response) 
		{
			$scope.groups = response.data;
			//$scope.groups = response.data;
			console.log(" AccountGRP Length : " + $scope.groups.length)	;
            $rootScope.currentPage = 'showAccountGroups';			
		});	

	$scope.deleteAccGrp = function(accgroup){
		console.log( " delete accgroup");
		$scope.message ='';
		var flag = confirm("Are you sure you want to delete this Account Group ?");
		if(flag){	
			var url = hostname + '/accgroup/delete/'+accgroup.id;
			console.log(url);
			$http.delete(url, '', {
			  headers: {
				'Content-Type': 'application/json; charset=UTF-8'
			  },
			}).success(function(responseData) {
				  try {
					console.log(JSON.stringify(responseData));
					$scope.message = 'Account Group '+accgroup.name + ' deleted successfully.';
					$scope.optStatus = 'Success';

					$http.get(hostname + '/accgroup/find-by-company/'+$scope.company.id).
					then(function(response) 
					{
						$scope.groups = response.data;
					});	
					
				  } catch (err) {
					alert(JSON.stringify(err));
					$scope.optStatus = 'Failed';
					$scope.message = ' Failed to delete Account Group' +accgroup.name ;
				  }
			 }).error(function(data, status, headers, config) {
				console.log(JSON.stringify(data) +" headers : "+ JSON.stringify(headers) +"  status : " + status);
				$scope.optStatus = 'Failed';
				$scope.message = ' Failed to delete Account Group' +accgroup.name ;
			  });			
		}	
	}
		
});