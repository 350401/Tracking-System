package tracksys.model;
import javax.persistence.CascadeType;
import javax.persistence.Column;
import javax.persistence.Entity;
import javax.persistence.GeneratedValue;
import javax.persistence.GenerationType;
import javax.persistence.Id;
import javax.persistence.JoinColumn;
import javax.persistence.ManyToOne;
import javax.persistence.Table;
import javax.persistence.Transient;
import javax.validation.constraints.NotNull;
import javax.validation.constraints.Size;

import com.fasterxml.jackson.annotation.JsonIdentityInfo;
import com.fasterxml.jackson.annotation.JsonInclude;
import com.fasterxml.jackson.annotation.ObjectIdGenerators;

@Entity
@Table(name="item_dtl_trans")
//@JsonIdentityInfo(generator=ObjectIdGenerators.IntSequenceGenerator.class, property="@id")
public class ItemDetails {

	@Id
	@GeneratedValue(strategy = GenerationType.IDENTITY)
	private int id;
	
	@NotNull
	@Size(min = 3, max = 100)
	@Column(name = "name", nullable = false)
	private String name;	
	
	@ManyToOne(cascade=CascadeType.ALL)  
	@JoinColumn(name = "itemid", nullable = false)
	private Item item;
	
	@Column(name = "quandity", nullable = false)
	private int quandity;
	
	@NotNull
	@Column(name = "curqundty", nullable = false)
	private int curqundty;		
	
	@Column(name = "pices", nullable = false)
	private int pices;
	@Column(name = "curpices", nullable = false)
	private int curpices;	
	
	@JsonInclude()
	@Transient
	private int inputqundty;	

	public int getId() {
		return id;
	}

	public void setId(int id) {
		this.id = id;
	}

	public String getName() {
		return name;
	}

	public void setName(String name) {
		this.name = name;
	}

	public Item getItem() {
		return item;
	}

	public void setItem(Item item) {
		this.item = item;
	}

	public int getQuandity() {
		return quandity;
	}

	public void setQuandity(int quandity) {
		this.quandity = quandity;
	}

	public int getPices() {
		return pices;
	}

	public void setPices(int pices) {
		this.pices = pices;
	}

	public int getCurqundty() {
		return curqundty;
	}

	public void setCurqundty(int curqundty) {
		this.curqundty = curqundty;
	}

	public int getCurpices() {
		return curpices;
	}

	public void setCurpices(int curpices) {
		this.curpices = curpices;
	}

	public int getInputqundty() {
		return inputqundty;
	}

	public void setInputqundty(int inputqundty) {
		this.inputqundty = inputqundty;
	}
	
}
