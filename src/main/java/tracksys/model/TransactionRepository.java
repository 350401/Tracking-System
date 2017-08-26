package tracksys.model;

import java.util.List;

import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.CrudRepository;

public interface TransactionRepository extends CrudRepository<Transaction, Integer> {
	public List<Transaction> findAllByType(int type);
	public Transaction findByVoucher(String voucher);
	
	@Query(value = "select trans.* from transactions trans JOIN ledger ledg on ledg.id = trans.ledgerid"
			+ "  JOIN acc_group_dtl grpdtl on grpdtl.id=ledg.groupid JOIN company com on com.id = grpdtl.companyid  "
			+ "where com.id = ?1 and trans.transtype=?2", nativeQuery = true)
	public List<Transaction> findAllByType_Company(int companyid,int type);
}

