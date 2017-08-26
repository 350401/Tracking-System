
insert into users (id, address, email, usr_psw, phone, usertype, usr_name) values (1, 'HYD', 'admin@admin.com', 'admin', 9999999, 'admin', 'admin');
insert into previliges (id, configuration, accountinfo, inventoryinfo, reports, transactions, userid) values (1,'true', 'true', 'true','true', 'true', 1);
insert into users (id, address, email, usr_psw, phone, usertype, usr_name) values (2, 'HYD', 'user@user.com', 'pavan', 9999999, 'user', 'pavan');
insert into previliges (id, configuration,accountinfo, inventoryinfo, reports, transactions, userid) values (2,'true', 'true', 'true','true', 'true', 2);
INSERT INTO company (id ,name,mailingname,address,country,companystate,pincode,phone,email,currencesymbol,creationdate,yearstart,booksstart) VALUES (1, 'IBM','IBM','Mind Space',1,1,12345,912345,'pp@pp.com','Rs.','2017-04-01T15:54:46.083Z','2017-04-01T15:54:46.083Z','2017-04-01T15:54:46.083Z');

insert into company_user_previliges (id, configuration, accountinfo, inventoryinfo, reports, transactions, userid,companyid) values (1,'true', 'true', 'true','true', 'true', 1,1);
insert into company_user_previliges (id, configuration, accountinfo, inventoryinfo, reports, transactions, userid,companyid) values (2,'true', 'false', 'false','false', 'false', 2,1);

INSERT INTO stock_group_dtl(id ,name,companyid) VALUES (1, 'DUMMY',1);
INSERT INTO stock_group_dtl(id ,name,companyid,parentid) VALUES (2, 'Raymonds',1,1);

INSERT INTO acc_group_dtl(id ,name,companyid) VALUES (1, 'DUMMY',1);
--INSERT INTO acc_group_dtl(id ,name,companyid,parentid) VALUES (2,'Current Assets',1,1);
--INSERT INTO acc_group_dtl(id ,name,companyid,parentid) VALUES (3,'Current Liabilities',1,1);

--INSERT INTO acc_group_dtl(id ,name,companyid,parentid) VALUES (4,'Bank Accounts',1,2);
--INSERT INTO acc_group_dtl(id ,name,companyid,parentid) VALUES (5,'Cash-in-hand',1,2);
--INSERT INTO acc_group_dtl(id ,name,companyid,parentid) VALUES (6,'Deposits (Asset)',1,2);
--INSERT INTO acc_group_dtl(id ,name,companyid,parentid) VALUES (7,'Duties & Taxes',1,3);
--INSERT INTO acc_group_dtl(id ,name,companyid,parentid) VALUES (8,'Loans & Advances (Asset)',1,2);
--INSERT INTO acc_group_dtl(id ,name,companyid,parentid) VALUES (9,'Provisions',1,3);
--INSERT INTO acc_group_dtl(id ,name,companyid,parentid) VALUES (10,'Stock-in-hand',1,2);
--INSERT INTO acc_group_dtl(id ,name,companyid,parentid) VALUES (11,'Sundry Creditors',1,3);
--INSERT INTO acc_group_dtl(id ,name,companyid,parentid) VALUES (12,'Sundry Debtors',1,2);

INSERT INTO acc_group_dtl(id ,name,companyid,parentid) VALUES (2,'Sundry Creditors',1,1);
INSERT INTO acc_group_dtl(id ,name,companyid,parentid) VALUES (3,'Sundry Debtors',1,1);
INSERT INTO acc_group_dtl(id ,name,companyid,parentid) VALUES (4,'Purchases',1,1);
INSERT INTO acc_group_dtl(id ,name,companyid,parentid) VALUES (5,'Sales',1,1);
INSERT INTO acc_group_dtl(id ,name,companyid,parentid) VALUES (6,'Cash',1,1);
INSERT INTO acc_group_dtl(id ,name,companyid,parentid) VALUES (7,'Bank',1,1);

INSERT INTO ledger( id, name ,alias , groupid ,mailingname ,mailingaddress ,mailingstate ,saletaxno ,taxpan ,opbal ,curbal )
VALUES (1,'Sundry Creditors Ledger','Sundry Creditors Ledger',2,'dd','dfd','dfd',1234,1234,10000,10000);
INSERT INTO ledger( id, name ,alias , groupid ,mailingname ,mailingaddress ,mailingstate ,saletaxno ,taxpan ,opbal ,curbal )
VALUES (2,'Sundry Debtors Ledger','Sundry Debtors Ledger',3,'dd','dfd','dfd',1234,1234,10000,10000);
INSERT INTO ledger( id, name ,alias , groupid ,mailingname ,mailingaddress ,mailingstate ,saletaxno ,taxpan ,opbal ,curbal )
VALUES (3,'Purchases Ledger','Purchases Ledger',4,'dd','dfd','dfd',1234,1234,10000,10000);
INSERT INTO ledger( id, name ,alias , groupid ,mailingname ,mailingaddress ,mailingstate ,saletaxno ,taxpan ,opbal ,curbal )
VALUES (4,'Sales','Sales',5,'dd','dfd','dfd',1234,1234,10000,10000);

INSERT INTO item_dtl(id,name,groupid,shade,description,uom,initqundty,curqundty,rate,purcrate) values (1,'shirts',2,'Lenin','Lenin Shirts','kgs',100,100,120,100);
INSERT INTO item_dtl_trans(id, name,itemid ,quandity ,curqundty , pices,curpices) values (1,'shirts',1,100,100,1,1);


INSERT INTO agents(id, name,address,phone,email,commission,companyid) values(1,'john','hyd',12345,'john@john.com',10,1);



--------------------- TRACKING SYSTEM ---------------------------------
insert into employees (id, emp_name) values (1, 'pavan kumar');
