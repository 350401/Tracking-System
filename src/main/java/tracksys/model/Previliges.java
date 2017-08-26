package tracksys.model;

import javax.persistence.CascadeType;
import javax.persistence.Entity;
import javax.persistence.GeneratedValue;
import javax.persistence.GenerationType;
import javax.persistence.Id;
import javax.persistence.JoinColumn;
import javax.persistence.ManyToOne;
import javax.persistence.OneToOne;
import javax.persistence.Table;

import com.fasterxml.jackson.annotation.JsonIdentityInfo;
import com.fasterxml.jackson.annotation.ObjectIdGenerators;

@Entity
@Table(name="company_user_previliges")
@JsonIdentityInfo(generator=ObjectIdGenerators.IntSequenceGenerator.class, property="@id")
public class Previliges {

	@Id
	@GeneratedValue(strategy = GenerationType.IDENTITY)
	private int id;
	
	private String configuration;
	
	private String accountinfo;
	
	private String inventoryinfo;
	
	private String transactions;
	
	private String reports;
	
	@OneToOne(cascade=CascadeType.ALL)  
	@JoinColumn(name = "userid", nullable = false)	
	private User user;
	
	@OneToOne(cascade=CascadeType.ALL)  
	@JoinColumn(name = "companyid", nullable = false)	
	private Company company;	

	public int getId() {
		return id;
	}

	public void setId(int id) {
		this.id = id;
	}

	public String getAccountinfo() {
		return accountinfo;
	}

	public void setAccountinfo(String accountinfo) {
		this.accountinfo = accountinfo;
	}

	public String getInventoryinfo() {
		return inventoryinfo;
	}

	public void setInventoryinfo(String inventoryinfo) {
		this.inventoryinfo = inventoryinfo;
	}

	public String getTransactions() {
		return transactions;
	}

	public void setTransactions(String transactions) {
		this.transactions = transactions;
	}

	public String getReports() {
		return reports;
	}

	public void setReports(String reports) {
		this.reports = reports;
	}

	public User getUser() {
		return user;
	}

	public void setUser(User user) {
		this.user = user;
	}

	public Company getCompany() {
		return company;
	}

	public void setCompany(Company company) {
		this.company = company;
	}

	public String getConfiguration() {
		return configuration;
	}

	public void setConfiguration(String configuration) {
		this.configuration = configuration;
	}
	


}
