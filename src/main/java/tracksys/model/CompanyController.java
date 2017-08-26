package tracksys.model;

import java.util.ArrayList;
import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.MediaType;
import org.springframework.http.ResponseEntity;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestMethod;
import org.springframework.web.bind.annotation.ResponseBody;

/**
 * A class to test interactions with the MySQL database using the UserDao class.
 *
 * @author netgloo
 */
@Controller
@RequestMapping("/company")
public class CompanyController {

	  @RequestMapping(value ="/create",method = RequestMethod.POST)
	  
	  public @ResponseBody Company  create(@RequestBody Company company) {

		  boolean isCompanyExists = companyRepository.exists(company.getId());
		  company =  companyRepository.save(company);

		  if(!isCompanyExists){		//Create Company 
			  Iterable<User> users = userRepostory.findAll(); 
			  List<Previliges> prevList = new ArrayList<Previliges>();
			  Previliges previliges = null;
			  for(User user : users){
				  previliges = new Previliges();
				  previliges.setUser(user);
				  previliges.setCompany(company);
				  previliges.setConfiguration("false");
				  previliges.setAccountinfo("false");
				  previliges.setInventoryinfo("false");
				  previliges.setReports("false");
				  previliges.setTransactions("false");
				  prevList.add(previliges);
			  }
			  userPreviligeReposotory.save(prevList);

			  List<AccGroup> accGroupList = new ArrayList<AccGroup>();
			  accGroupList.add( new AccGroup("Sundry Creditors", company,1));
			  accGroupList.add( new AccGroup("Sundry Debtors", company,1));
			  accGroupList.add( new AccGroup("Purchases", company,1));
			  accGroupList.add( new AccGroup("Sales", company,1));
			  accGroupList.add( new AccGroup("Cash", company,1));
			  accGroupList.add( new AccGroup("Bank", company,1));
			  accGroupRepository.save(accGroupList);
		  }

		  return company;
	  }
	  
	  @RequestMapping(value ="/getAll",method = RequestMethod.GET)
	  public ResponseEntity<Iterable<Company>> getAllCompanies() {
		  Iterable<Company> companyList = null;
	    try {
	    	companyList = companyRepository.findAll();
	    }
	    catch (Exception ex) {
		      return new ResponseEntity<>(HttpStatus.BAD_REQUEST);
		    }
		    return new ResponseEntity<Iterable<Company>>(companyList, HttpStatus.OK);
		  }  
	  
	  @RequestMapping(value ="/get/{companyId}",method = RequestMethod.GET)
	  public ResponseEntity<Company> findCompany(@PathVariable("companyId") String companyId) {
		  Company company = null;
		  try {
			  company = companyRepository.findOne(Integer.valueOf(companyId));
		  }
		  catch (Exception ex) {
			  return new ResponseEntity<>(HttpStatus.BAD_REQUEST);
		  }
		  return new ResponseEntity<Company>(company, HttpStatus.OK);
	  } 
	  
	  @RequestMapping(value ="/find-by-userid/{userId}",method = RequestMethod.GET)
	  public @ResponseBody List<Company> findCompany(@PathVariable("userId") int userId) {
		  List<Company> companyList = new ArrayList<>();
		 // return companyRepository.findAllByUsers_Id(userId);
		  List<Previliges> previliges = userPreviligeReposotory.findAllByUser_Id(userId);
		  for(Previliges previlige : previliges){
			  if(Boolean.valueOf(previlige.getConfiguration()) || Boolean.valueOf(previlige.getAccountinfo()) || Boolean.valueOf(previlige.getInventoryinfo()) 
					  || Boolean.valueOf(previlige.getReports()) || Boolean.valueOf(previlige.getTransactions())){
				  companyList.add(previlige.getCompany()) ;
			  }
		  }
		  return companyList;
	  } 	  
	  
	  
	  @RequestMapping(value ="/{companyId}",method = RequestMethod.DELETE)
	  public ResponseEntity<Boolean> deleteCompany(@PathVariable("companyId") int companyId) {
		  try {
			  companyRepository.delete(companyId);
			  return new ResponseEntity<Boolean>(true, HttpStatus.OK);
		  } catch (Exception ex) {
			  return new ResponseEntity<>(HttpStatus.INTERNAL_SERVER_ERROR);
		  }

	  } 	  
	  
	  @Autowired
	  private CompanyRepository companyRepository;

	  @Autowired
	  private UserPreviligeReposotory userPreviligeReposotory;
	  
	  @Autowired
	  private UserRepostory userRepostory;	
	  
	  @Autowired
	  private AccGroupRepository accGroupRepository;
}
