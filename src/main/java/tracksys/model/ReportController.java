package tracksys.model;

import javax.persistence.EntityManager;
import javax.persistence.PersistenceContext;
import javax.transaction.Transactional;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestMethod;
import org.springframework.web.bind.annotation.ResponseBody;
import java.util.List;


@Controller
@RequestMapping("/reportController")
public class ReportController {

	@Autowired
	private ReportRepository reportRepository;
	
	//@PersistenceContext
	//private EntityManager entityMng;

/*	
	@RequestMapping(value ="/create",method = RequestMethod.POST)
	public @ResponseBody Report  create(@RequestBody Report report) {
		return reportRepository.save(report);
	}	
	
	@RequestMapping(value ="/update",method = RequestMethod.POST)
	@Transactional
	public @ResponseBody Report  update(@RequestBody Report report) {
		return reportRepository.save(entityMng.merge(report));
	}		
	
	@RequestMapping(value ="/delete/{agentId}",method = RequestMethod.DELETE)
	@Transactional
	public @ResponseBody boolean  delete(@PathVariable("agentId") int agentId) {
		reportRepository.delete(agentId);
		return true;
	}		
	
	
	@RequestMapping(value ="/find/{agentId}",method = RequestMethod.GET)
	public @ResponseBody Report findbyId(@PathVariable("agentId") int agentId) {
		return reportRepository.findOne(agentId);
	}
	*/	
	//	public List<Report> findAllTransType(int optType);
	
	@RequestMapping(value ="/findAllTransType/{optType}",method = RequestMethod.GET)
	  public @ResponseBody List<Report> findAllTransType(@PathVariable("optType") int optType) {
		List<Report> reportList = null;
		//if(optType.equals("P")){
			reportList = reportRepository.findAllByType(optType);//new ArrayList<>();
		//} else {
			//reportList = reportRepository.findAllTransType(2);//new ArrayList<>();
		//}
		
		return reportList; 		

	  } 	  
	
		
		
		
		
		
	@RequestMapping(value ="/findAll",method = RequestMethod.GET)
	public @ResponseBody Iterable<Report> findAll() {
		return reportRepository.findAll();
	}
	
}
