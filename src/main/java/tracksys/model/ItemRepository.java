package tracksys.model;

import java.util.List;

import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.CrudRepository;

public interface ItemRepository extends CrudRepository<Item, Integer> {

	public List<Item> findAllByStockGroup(StockGroup stockGroup);
	public List<Item> findAllByName(String name);
	
	@Query(value = "select itm.* from item_dtl itm JOIN stock_group_dtl grp on itm.groupid = grp.id JOIN company com on com.id = grp.companyid  where grp.companyid = ?1", nativeQuery = true)
	public List<Item> findByStockGroup_Company(int companyid);
}
