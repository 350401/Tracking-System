app.controller('usersController', function($scope,$rootScope,$location,$http) {

    $rootScope.users = [];
	$http.get(hostname+'/user/findAll').
			then(function(response) {
				$rootScope.users = response.data;
				$rootScope.curTab = 'userTab';
	});	
	
	$scope.user ={}; 
	
	$scope.createUser = function(){
		$rootScope.currentPage = 'createUser';
		$location.path("create-user");
	}
	$scope.editUser = function(user){
		$rootScope.currentPage = 'editUser';
		console.log( " Edit User");
		$location.path("edit-user");
		$rootScope.user = user ;
	}
	
	$scope.performAction = function(user){
		$rootScope.currentPage = 'performAction';
		$rootScope.user = user;
		$location.path("perform-action");
	}
	$rootScope.curTab = 'userTab';
	console.log("   User Tab ");
	$rootScope.currentPage = "userList";
	console.log("   currentPage :  " + $rootScope.currentPage);
});

app.controller('createUserController', function($scope,$rootScope,$location,$http,UserPrevService) {
	$scope.user ={}; 
	$scope.user.previliges = {};
	$scope.user.previliges.accountinfo = "true";
	$scope.user.previliges.configuration = "true";
	$scope.user.previliges.inventoryinfo = "true";
	$scope.optType = "create";
	$scope.submitclick = false;
	
	
	$http.get(hostname+'/company/getAll').
			then(function(response) {
			
			    $scope.previliges = [];
				var count = 0;
				angular.forEach(response.data, function (company){
					var previlige = {};
					previlige.company = company;
					previlige.accountinfo = true;
					previlige.configuration = true;
					previlige.inventoryinfo = true;
					previlige.transactions = true;
					previlige.reports = true;
					$scope.previliges[count++] = previlige;
				});
				
				
	});			
	
	$scope.createUser = function(user){
		if(!$scope.userform.$valid){
			$scope.submitclick = true;
			return;
		}

			var dataObj = JSON.stringify(user);
			$http.post(hostname+'/user/create', dataObj, {
			  headers: {
				'Content-Type': 'application/json; charset=UTF-8'
			  },
			}).success(function(responseData) {
				  try {
					console.log(JSON.stringify(responseData));
					//$rootScope.currentPage = 'userList';
					$rootScope.users.push(user);
					
					 console.log(" User Data : " + responseData);
					angular.forEach($scope.previliges, function (previlige){
						previlige.user = responseData;
						previlige.user['@id'] = responseData.id;
						previlige.accountinfo = previlige.accountinfo ? true : false;
						previlige.configuration = previlige.configuration ? true : false;
						previlige.inventoryinfo = previlige.inventoryinfo ? true : false;
						previlige.transactions = previlige.transactions ? true : false;
						previlige.reports = previlige.reports ? true : false;						
					});
					console.log( $scope.previliges );
					 UserPrevService.updateUserPrev($scope.previliges, function(response){
					  console.log(" User Prev Response " + JSON.stringify(response));
				   });					
					
					//$location.path("/show-user");
					
					$scope.user ={}; 
					$scope.user.previliges = {};
					$scope.user.previliges.accountinfo = "true";
					$scope.user.previliges.configuration = "true";
					$scope.user.previliges.inventoryinfo = "true";
					$scope.optType = "create";
					$scope.submitclick = false;					
					$scope.optStatus = 'Success';
				  } catch (err) {
					alert(JSON.stringify(err));
					$scope.optStatus = 'Failed';
				  }
			 }).error(function(data, status, headers, config) {
				console.log(JSON.stringify(data) +" headers : "+ JSON.stringify(headers) +"  status : " + status);
				$scope.optStatus = 'Failed';
			  });		
	}
	
});


app.controller('editUserController', function($scope,$rootScope,$location,$http,UserPrevService) {

    $scope.optType = "edit";
 	$scope.submitclick = false;
	
	
	$http.get(hostname+'/user/findAllPrev/'+$rootScope.user.id).
			then(function(response) {
			    //$scope.previliges = response.data;
				$scope.previliges = [];
					angular.forEach(response.data, function (previlige){
						previlige.accountinfo = previlige.accountinfo == 'true'  ? true : false;
						previlige.configuration = previlige.configuration == 'true'  ? true : false;
						previlige.inventoryinfo = previlige.inventoryinfo == 'true'? true : false;
						previlige.transactions = previlige.transactions == 'true'? true : false;
						previlige.reports = previlige.reports == 'true' ? true : false;
						$scope.previliges.push(previlige);						
					});				
				
	});		
	

	$scope.editUser = function(user){
		
		if(!$scope.userform.$valid){
			$scope.submitclick = true;
			return;
		}		
			var dataObj = JSON.stringify(user);
			$http.post(hostname + '/user/create', dataObj, {
			  headers: {
				'Content-Type': 'application/json; charset=UTF-8'
			  },
			}).success(function(responseData) {
				
					angular.forEach($scope.previliges, function (previlige){
						previlige.user = user;
						previlige.accountinfo = previlige.accountinfo ? true : false;
						previlige.configuration = previlige.configuration ? true : false;
						previlige.inventoryinfo = previlige.inventoryinfo ? true : false;
						previlige.transactions = previlige.transactions ? true : false;
						previlige.reports = previlige.reports ? true : false;						
					});
					console.log( $scope.previliges );
					 UserPrevService.updateUserPrev($scope.previliges, function(response){
					  console.log(" User Prev Update Response " + JSON.stringify(response));
				   });	
				   
				  try {
					console.log(JSON.stringify(responseData));
					//$rootScope.currentPage = 'companyList';
					$rootScope.users.push(user);
					
					//$location.path("/show-user");
					$scope.optStatus = 'Success';
					$scope.submitclick = false;
					
				  } catch (err) {
					alert(JSON.stringify(err));
					$scope.optStatus = 'Failed';
				  }
			 }).error(function(data, status, headers, config) {
				console.log(JSON.stringify(data) +" headers : "+ JSON.stringify(headers) +"  status : " + status);
				$scope.optStatus = 'Failed';
			  });
	}
	
});


app.controller('assignUsersController', function($scope,$rootScope,$location,$http) {


	$scope.assignedUsers = [];
	$scope.availableUsers = [];
	$scope.selectLeftAll = false;
	$scope.selectRightAll = false;
	$http.get(hostname+'/user/findAll').
			then(function(response) {
				$scope.assignedUsers = $scope.company.users;
				console.log(" assignedUsers " + JSON.stringify($scope.assignedUsers));
				$scope.availableUsers = response.data.filter(function(user) {
				  for (var i in $scope.assignedUsers) {
					if (user.id === $scope.assignedUsers[i].id) { return false; }
				  };
				  return true;
				});
	});	

	$scope.toggleClick = function(user){
		console.log(" toggleClick " + user.selected);
		user.selected = (user.selected === false || user.selected == null ) ? true: false;
		console.log(" toggleClick " + user.selected);
	}
	
	$scope.selectAll = function(listSide){
		console.log(" listSide : "+ listSide );
		if(listSide == 'right'){
			 console.log(" assignedUsers : "+ $scope.assignedUsers.length  +" $scope.selectRightAll " + $scope.selectRightAll);
			angular.forEach($scope.assignedUsers, function (user){
				user.selected = !$scope.selectRightAll;
			});
		}else{
			 console.log(" availableUsers : "+ $scope.availableUsers.length );
			angular.forEach($scope.availableUsers, function (user){
				user.selected = !$scope.selectLeftAll;
			});			
		}
	}
	
	$scope.moveItem = function(listSide){
	  console.log(" listSide : "+ listSide );
	 $scope.selectLeftAll = false;
	 $scope.selectRightAll = false;
	  if(listSide == 'right'){
		  console.log(" availableUsers : "+ $scope.availableUsers.length );
		 /*angular.forEach($scope.availableUsers, function (user) 
		{
			console.log("  User : " + user.username);
			if(user.selected){
			    var index = $scope.availableUsers.indexOf(user);
			    console.log( " remove index : " + index);
				var selUser = $scope.availableUsers.splice(index, 1);
				selUser[0].selected = false;
				console.log( " selUser : " + JSON.stringify(selUser));
				$scope.assignedUsers.push(selUser[0]);
			}
		});	*/
		
		for(var i = $scope.availableUsers.length - 1; i >= 0; i--){
			if($scope.availableUsers[i].selected){
				var selUser = $scope.availableUsers.splice(i,1);
				selUser[0].selected = false;
				$scope.assignedUsers.push(selUser[0]);
			}
		}		
		
	  }else{
		  console.log(" assignedUsers : "+ $scope.assignedUsers.length );
			for(var i = $scope.assignedUsers.length - 1; i >= 0; i--){
				if($scope.assignedUsers[i].selected){
					var selUser = $scope.assignedUsers.splice(i,1);
					selUser[0].selected = false;
					$scope.availableUsers.push(selUser[0]);
				}
			}		  
	  }
		
	}
	
	$scope.save = function(){
		$scope.company.users = [];
		angular.forEach($scope.assignedUsers, function (user) {
			console.log( " @id " + user['@id']);
             user['@id'] = user.id;
			 user.previliges = null;
			 console.log( " After @id " + user['@id']);
			 $scope.company.users.push(user);
		});
		
		    //$scope.company.users = $scope.assignedUsers;
			console.log( " users : " + JSON.stringify($scope.company.users));
 			
			var dataObj = JSON.stringify($scope.company);
			console.log( " Save : " + dataObj);
			
			$http.post(hostname + '/company/create', dataObj, {
			  headers: {
				'Content-Type': 'application/json; charset=UTF-8'
			  },
			}).success(function(responseData) {
				  try {
					console.log(JSON.stringify(responseData));
					$rootScope.currentPage = 'companyList';
					$location.path("/view-company");
				  } catch (err) {
					alert(JSON.stringify(err));
				  }
			 }).error(function(data, status, headers, config) {
				console.log(JSON.stringify(data) +" headers : "+ JSON.stringify(headers) +"  status : " + status);
			  });		
	}
});

       $(function () {

            $('body').on('click', '.list-group .list-group-item', function () {
                //$(this).toggleClass('active');
            });
            $('.list-arrows button').click(function () {
				console.log(" list-arrows button cicked");
                var $button = $(this), actives = '';
                if ($button.hasClass('move-left')) {
                    actives = $('.list-right ul li.active');
                    actives.clone().appendTo('.list-left ul');
                    actives.remove();
                } else if ($button.hasClass('move-right')) {
                    actives = $('.list-left ul li.active');
                    actives.clone().appendTo('.list-right ul');
                    actives.remove();
                }
            });
            $('.dual-list .selector').click(function () {
                var $checkBox = $(this);
                if (!$checkBox.hasClass('selected')) {
                    $checkBox.addClass('selected').closest('.well').find('ul li:not(.active)').addClass('active');
                    $checkBox.children('i').removeClass('glyphicon-unchecked').addClass('glyphicon-check');
                } else {
                    $checkBox.removeClass('selected').closest('.well').find('ul li.active').removeClass('active');
                    $checkBox.children('i').removeClass('glyphicon-check').addClass('glyphicon-unchecked');
                }
            });
            $('[name="SearchDualList"]').keyup(function (e) {
                var code = e.keyCode || e.which;
                if (code == '9') return;
                if (code == '27') $(this).val(null);
                var $rows = $(this).closest('.dual-list').find('.list-group li');
                var val = $.trim($(this).val()).replace(/ +/g, ' ').toLowerCase();
                $rows.show().filter(function () {
                    var text = $(this).text().replace(/\s+/g, ' ').toLowerCase();
                    return !~text.indexOf(val);
                }).hide();
            });

        });	  
