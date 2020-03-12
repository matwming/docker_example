
CREATE TABLE keywords (id INT PRIMARY KEY AUTO_INCREMENT NOT NULL,name VARCHAR(255), uid VARCHAR(255));

CREATE TABLE sites (id INT PRIMARY KEY AUTO_INCREMENT NOT NULL,name VARCHAR(255), uid VARCHAR(255));

CREATE TABLE settings (id INT PRIMARY KEY AUTO_INCREMENT, uid VARCHAR(255),browser_info VARCHAR(255),wait VARCHAR(255),is_visit INT,pages INT, visit_site VARCHAR(255),after_wait VARCHAR(255),target_site INT,target_wait INT,reset_num INT,other_phone_setting VARCHAR(255),other_browser_setting VARCHAR(255));

INSERT INTO keywords (id,name,uid) VALUES (1,"Shoes","1");

INSERT INTO sites (id,name,uid) VALUES (1,"www.docker.com","1");

INSERT INTO settings (id,uid,browser_info,wait,is_visit,pages,visit_site,after_wait,target_site,target_wait,reset_num,other_phone_setting,other_browser_setting)
VALUES (1,"1","Explorer,0","40,55",0,1,"30,50","5,10",10,20,1,"Phone Reset,Mobile Data","Remove Cookies,Data Saving Mode,Analytics Protection");
