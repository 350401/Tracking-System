package tracksys.model;

import java.util.List;

import org.springframework.data.repository.CrudRepository;

public interface AgentRepository extends CrudRepository<Agent, Integer> {

	Agent findByName(String name);
	public List<Agent> findAllByCompany(Company company);
}
