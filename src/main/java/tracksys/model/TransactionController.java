package tracksys.model;

import java.util.ArrayList;
import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestMethod;
import org.springframework.web.bind.annotation.ResponseBody;

@Controller
@RequestMapping("/transactions")
public class TransactionController {

	@RequestMapping(value ="/create",method = RequestMethod.POST)
	public @ResponseBody Transaction createTransaction
	(@RequestBody Transaction transaction) {
		
		updateLedgers(transaction);
		
		updateTransactionItems(transaction);
		
		return transactionRepository.save(transaction);
	}
	
	private void updateLedgers(Transaction transaction){
		Ledger fromLedger = ledgerRepository.findOne(transaction.getFromledger().getId());
		Ledger toLedger = ledgerRepository.findOne(transaction.getLedger().getId());
		if(transaction.getType() == 1 || transaction.getType() == 2){
			fromLedger.setCurbal(fromLedger.getCurbal() - (transaction.getRate()));
			toLedger.setCurbal(toLedger.getCurbal() + (transaction.getRate()));				
		}else{
			fromLedger.setCurbal(fromLedger.getCurbal() + (transaction.getRate()));
			toLedger.setCurbal(toLedger.getCurbal() - (transaction.getRate()));			
		}
		transaction.setLedger(toLedger);
		transaction.setFromledger(fromLedger);
	}
	
	private void updateTransactionItems(Transaction transaction){
		List<TrasactionItem> TrasactionItemList = transaction.getTrasactionItems();
		Item item = null;
		for(TrasactionItem trasactionItem : TrasactionItemList){
			item = itemRepository.findOne(trasactionItem.getItem().getId());
			if(transaction.getType() == 1 || transaction.getType() == 4){
				item.setCurqundty(item.getCurqundty() + trasactionItem.getQuandity());
			}else{
				item.setCurqundty(item.getCurqundty() - trasactionItem.getQuandity());
			}
			item = itemRepository.save(item);
			updateTransactionItemDtls(transaction.getType(), trasactionItem, item);
			trasactionItem.setTransaction(transaction);
		}
	}
	
	private void updateTransactionItemDtls(int transType, TrasactionItem trasactionItem,Item item){
		List<ItemDetails> itemDtls = trasactionItem.getItem().getItemDtls();
		trasactionItem.setTransactionDetails(new ArrayList<TransactionDetails>());
		ItemDetails tempItemDtl = null;
		TransactionDetails transactionDetails = null;
		if(itemDtls != null){
			for(ItemDetails itemDetail : itemDtls){
				switch(transType){
				case 1:  
					tempItemDtl = itemDetail;
					tempItemDtl.setCurqundty(itemDetail.getQuandity());
					tempItemDtl.setCurpices(itemDetail.getPices());
					tempItemDtl.setItem(item);
					break;
				case 2:  
					tempItemDtl = itemDtlsRepo.findOne(itemDetail.getId());
					tempItemDtl.setCurqundty(tempItemDtl.getCurqundty() - itemDetail.getCurqundty());
					//tempItemDtl.setCurpices(tempItemDtl.getCurpices()- itemDetail.getCurpices());
					break;
				case 3:  
					tempItemDtl = itemDtlsRepo.findOne(itemDetail.getId());
					tempItemDtl.setCurqundty(tempItemDtl.getCurqundty() - itemDetail.getCurqundty());
					//tempItemDtl.setCurpices(tempItemDtl.getCurpices()- itemDetail.getCurpices());
					break;					
				case 4:  
					tempItemDtl = itemDtlsRepo.findOne(itemDetail.getId());
					tempItemDtl.setCurqundty(tempItemDtl.getCurqundty() + itemDetail.getCurqundty());
					//tempItemDtl.setCurpices(tempItemDtl.getCurpices() + itemDetail.getCurpices());
					break;
				}				
				tempItemDtl = itemDtlsRepo.save(tempItemDtl);
				transactionDetails = new TransactionDetails();
				transactionDetails.setItemDetails(tempItemDtl);
				transactionDetails.setQuandity(itemDetail.getCurqundty() * itemDetail.getCurpices());
				transactionDetails.setTrasactionItem(trasactionItem);
				trasactionItem.getTransactionDetails().add(transactionDetails);
			}
		}	
		
		trasactionItem.setItem(item);
		
	}
	
	@RequestMapping(value ="/getAll",method = RequestMethod.GET)
	public  @ResponseBody Iterable<Transaction> getAllTrsactions() {
		return transactionRepository.findAll();
	}	
	
	@RequestMapping(value ="/findAll-by-type/{companyId}/{type}",method = RequestMethod.GET)
	public  @ResponseBody Iterable<Transaction> findAllTRsacionByType(@PathVariable("companyId") int companyId, @PathVariable("type") int type) {
		return transactionRepository.findAllByType_Company(companyId, type);
	}	
	
	@RequestMapping(value ="/find-by-id/{transId}",method = RequestMethod.GET)
	public  @ResponseBody Transaction getById(@PathVariable("companyId") int transId) {
		return transactionRepository.findOne(transId);
	}	
	
	@Autowired
	private ItemRepository itemRepository;	
	
	@Autowired
	private ItemDtlsRepo itemDtlsRepo;
	
	@Autowired
	private TransactionRepository transactionRepository;
	
	@Autowired
	private LedgerRepository ledgerRepository;
}
