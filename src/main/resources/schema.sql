---- LOGIN -------
DROP TABLE IF EXISTS users;
CREATE TABLE users
(
	`id` INT NOT NULL AUTO_INCREMENT PRIMARY KEY,
	usr_name VARCHAR2(50) NOT NULL,
	usr_psw VARCHAR2(50) NOT NULL,
	address VARCHAR2(50) NOT NULL,
	phone BIGINT NOT NULL,
	email VARCHAR2(50) NOT NULL,
	usertype VARCHAR2(50) NOT NULL,
);

DROP TABLE IF EXISTS previliges;
CREATE TABLE previliges
(
	`id` INT NOT NULL AUTO_INCREMENT PRIMARY KEY,
	userid INT NOT NULL, 
	configuration VARCHAR2(50) NOT NULL,
	accountinfo VARCHAR2(50) NOT NULL,
	inventoryinfo VARCHAR2(50) NOT NULL,
	transactions VARCHAR2(50) NOT NULL,
	reports VARCHAR2(50) NOT NULL,
);
ALTER TABLE previliges ADD FOREIGN KEY ( userid ) REFERENCES users( id ) ;

---- COMPANY -------

DROP TABLE IF EXISTS company;
CREATE TABLE company
(
	`id` INT NOT NULL AUTO_INCREMENT PRIMARY KEY,
	name VARCHAR2(50) NOT NULL,
	mailingname VARCHAR2(50) NOT NULL,
	address VARCHAR2(100) NOT NULL,
	country INT NOT NULL,
	companystate INT NOT NULL,
	pincode INT NOT NULL,
	phone INT NOT NULL,
	email VARCHAR2(100) NOT NULL,
	currencesymbol VARCHAR2(100),
	creationdate VARCHAR2(100) NOT NULL,
	yearstart VARCHAR2(100) NOT NULL,
	booksstart VARCHAR2(100) NOT NULL,
);

DROP TABLE IF EXISTS company_user_previliges;
CREATE TABLE company_user_previliges
(
	`id` INT NOT NULL AUTO_INCREMENT PRIMARY KEY,
	companyid INT NOT NULL,
	userid INT NOT NULL,
	configuration VARCHAR2(50) NOT NULL,
	accountinfo VARCHAR2(50) NOT NULL,
	inventoryinfo VARCHAR2(50) NOT NULL,
	transactions VARCHAR2(50) NOT NULL,
	reports VARCHAR2(50) NOT NULL	
);
ALTER TABLE company_user_previliges ADD FOREIGN KEY ( companyid ) REFERENCES company( id ) ;
ALTER TABLE company_user_previliges ADD FOREIGN KEY ( userid ) REFERENCES users( id ) ;


---- Inventory Info -------
DROP TABLE IF EXISTS stock_group_dtl;
CREATE TABLE stock_group_dtl( `id` INT NOT NULL AUTO_INCREMENT PRIMARY KEY, name VARCHAR2(50) NOT NULL, companyid INT NOT NULL, parentid INT);

ALTER TABLE stock_group_dtl ADD FOREIGN KEY ( companyid ) REFERENCES company( id ) ;
ALTER TABLE stock_group_dtl ADD FOREIGN KEY ( parentid ) REFERENCES stock_group_dtl( id ) ;

DROP TABLE IF EXISTS item_dtl;
CREATE TABLE item_dtl( `id` INT NOT NULL AUTO_INCREMENT PRIMARY KEY, name VARCHAR2(50) NOT NULL, groupid INT NOT NULL,shade VARCHAR2(50) NOT NULL,description VARCHAR2(50) NOT NULL,uom VARCHAR2(50) NOT NULL,initqundty INT,curqundty INT,rate INT,purcrate INT);
ALTER TABLE item_dtl ADD FOREIGN KEY (groupid) REFERENCES stock_group_dtl(id) ;
DROP TABLE IF EXISTS item_dtl_trans;
CREATE TABLE item_dtl_trans( `id` INT NOT NULL AUTO_INCREMENT PRIMARY KEY, name VARCHAR2(50) NOT NULL,itemid INT,quandity INT,curqundty INT, pices INT,curpices INT);
ALTER TABLE item_dtl_trans ADD FOREIGN KEY (itemid) REFERENCES item_dtl(id) ;

---- Accounting INFO -------
DROP TABLE IF EXISTS acc_group_dtl;
CREATE TABLE acc_group_dtl( `id` INT NOT NULL AUTO_INCREMENT PRIMARY KEY, name VARCHAR2(50) NOT NULL, companyid INT NOT NULL, parentid INT);

ALTER TABLE acc_group_dtl ADD FOREIGN KEY ( companyid ) REFERENCES company( id ) ;
ALTER TABLE acc_group_dtl ADD FOREIGN KEY ( parentid ) REFERENCES acc_group_dtl( id ) ;

DROP TABLE IF EXISTS ledger;
CREATE TABLE ledger( `id` INT NOT NULL AUTO_INCREMENT PRIMARY KEY, name VARCHAR2(100) NOT NULL,alias VARCHAR2(100) NOT NULL, groupid int,mailingname VARCHAR2(100) NOT NULL,mailingaddress VARCHAR2(500) ,mailingstate VARCHAR2(100) ,saletaxno BIGINT,taxpan BIGINT,opbal INT,curbal INT);
ALTER TABLE ledger ADD FOREIGN KEY ( groupid ) REFERENCES acc_group_dtl( id ) ;



DROP TABLE IF EXISTS transactions;
CREATE TABLE transactions( `id` INT NOT NULL AUTO_INCREMENT PRIMARY KEY,transtype INT,description VARCHAR2(50) NOT NULL,fromledger INT,ledgerid INT,quandity INT,rate INT,voucher VARCHAR2(50),transdate VARCHAR2(50));
ALTER TABLE transactions ADD FOREIGN KEY (fromledger) REFERENCES ledger(id) ;
ALTER TABLE transactions ADD FOREIGN KEY (ledgerid) REFERENCES ledger(id) ;

CREATE TABLE transactions_item( `id` INT NOT NULL AUTO_INCREMENT PRIMARY KEY,transid INT, itemid INT,quandity INT,rate INT,purcrate INT);
ALTER TABLE transactions_item ADD FOREIGN KEY (transid) REFERENCES transactions(id) ;
ALTER TABLE transactions_item ADD FOREIGN KEY (itemid) REFERENCES item_dtl(id) ;


CREATE TABLE transactions_item_dtls( `id` INT NOT NULL AUTO_INCREMENT PRIMARY KEY,transitemid INT, itemdtlid INT,quandity INT);
ALTER TABLE transactions_item_dtls ADD FOREIGN KEY (transitemid) REFERENCES transactions_item(id) ;
ALTER TABLE transactions_item_dtls ADD FOREIGN KEY (itemdtlid) REFERENCES item_dtl_trans(id) ;

DROP TABLE IF EXISTS sales;
CREATE TABLE sales( `id` INT NOT NULL AUTO_INCREMENT PRIMARY KEY, description VARCHAR2(50) NOT NULL,itemid INT,quandity INT,rate INT,voucher VARCHAR2(50));
ALTER TABLE sales ADD FOREIGN KEY (itemid) REFERENCES item_dtl(id) ;

DROP TABLE IF EXISTS purchages;
CREATE TABLE purchages( `id` INT NOT NULL AUTO_INCREMENT PRIMARY KEY, description VARCHAR2(50) NOT NULL,itemid INT,quandity INT,rate INT,voucher VARCHAR2(50));
ALTER TABLE purchages ADD FOREIGN KEY (itemid) REFERENCES item_dtl(id) ;

DROP TABLE IF EXISTS item_current_stock;
CREATE TABLE item_current_stock( `id` INT NOT NULL AUTO_INCREMENT PRIMARY KEY, itemid INT,quandity INT);
ALTER TABLE item_current_stock ADD FOREIGN KEY (itemid) REFERENCES item_dtl(id) ;


---- LOGIN -------
DROP TABLE IF EXISTS agents;
CREATE TABLE agents
(
	`id` INT NOT NULL AUTO_INCREMENT PRIMARY KEY,
	name VARCHAR2(50) NOT NULL,
	address VARCHAR2(50) NOT NULL,
	phone BIGINT NOT NULL,
	email VARCHAR2(50) NOT NULL,
	commission INT NOT NULL,
	companyid INT NOT NULL
);
ALTER TABLE agents ADD FOREIGN KEY ( companyid ) REFERENCES company( id ) ;





--------------------- TRACKING SYSTEM ---------------------------------
DROP TABLE IF EXISTS employees;
CREATE TABLE employees
(
	`id` INT NOT NULL AUTO_INCREMENT PRIMARY KEY,
	emp_name VARCHAR2(50) NOT NULL,
);
