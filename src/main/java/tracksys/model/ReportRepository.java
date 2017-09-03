package tracksys.model;

import org.springframework.data.repository.CrudRepository;
import java.util.List;

public interface ReportRepository extends CrudRepository<Report, Integer> {

	//Agent findByName(String name);
	public List<Report> findAllByType(int type);
}
