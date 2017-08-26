package tracksys.model;

import java.util.List;

import org.springframework.data.repository.CrudRepository;

public interface LedgerRepository extends CrudRepository<Ledger, Integer> {

	List<Ledger> findByAccGroup_Company(Company company);
}
