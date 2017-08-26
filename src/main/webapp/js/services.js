app.factory('CompanyService',function ($http){
var factory = {};
   
   factory.getAllCompanies = function(user,callback){
	   
	  var URL =  user.type == 'admin' ? hostname+'/company/getAll' : hostname+'/company/find-by-userid/'+user.id;
	  console.log('Company Fetch URL : ' + URL);
     $http.get(URL)
	 .success(function (response) {
         callback(response);
      });
   }

   
   return factory;
});

app.factory('StockGrpSrvc',function ($http){
var factory = {};
   
   factory.getAllGroups = function(companyid,callback){
	   
	  var URL =  hostname + '/stockgroup/find-by-company/'+ companyid;
	  console.log('Stockgroup Fetch URL : ' + URL);
     $http.get(URL)
	 .success(function (response) {
         callback(response);
      });
   }
   
   return factory;
});
	


app.factory('UserPrevService',function ($http){
var factory = {};
   
   factory.updateUserPrev = function(previliges,callback){
	   
			var dataObj = JSON.stringify(previliges);
			$http.post(hostname+'/user/createprev', dataObj, {
			  headers: {
				'Content-Type': 'application/json; charset=UTF-8'
			  },
			}).success(function(responseData) {
				  try {
					console.log(JSON.stringify(responseData));
					callback(responseData);
				  } catch (err) {
					alert(JSON.stringify(err));
				  }
			 }).error(function(data, status, headers, config) {
				console.log(JSON.stringify(data) +" headers : "+ JSON.stringify(headers) +"  status : " + status);
			  });
	   
	   
   }

   
   return factory;
});

app.factory('ItemService',function ($http){
var factory = {};
   
   factory.getAllItems = function(companyId,callback){
	   
	  var URL =  hostname+'/item/find-by-company/'+companyId ;
     $http.get(URL)
	 .success(function (response) {
         callback(response);
      });
   }
   
   factory.getItemDetails = function(itemid,callback){
	   
	  var URL =  hostname+'/item/find-by-id/'+itemid ;
     $http.get(URL)
	 .success(function (response) {
         callback(response);
      });
   }   
  
   return factory;
});

app.factory('AccGroupService',function ($http){
var factory = {};
   
   factory.getAllGroupsByCompanyId = function(companyid,callback){
	   
	  var URL =  hostname+'/accgroup/find-by-company/'+ companyid ;
     $http.get(URL)
	 .success(function (response) {
         callback(response);
      });
   }
  
   return factory;
});

app.factory('GenericSrvc',function ($http){
var factory = {};
   
   factory.getAll = function(URL,callback){
	   
	  console.log('Stockgroup Fetch URL : ' + URL);
     $http.get(hostname + URL)
	 .success(function (response) {
         callback(response);
      });
   }
   
   return factory;
});