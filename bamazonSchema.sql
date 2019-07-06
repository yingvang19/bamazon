/* **Instructions**
Then create a Table inside of that database called products.


The products table should have each of the following columns:


item_id (unique id for each product)


product_name (Name of product)


department_name


price (cost to customer)


stock_quantity (how much of the product is available in stores)

Populate this database with around 10 different products. 
(i.e. Insert "mock" data rows into this database and table).
    
 */
 
 DROP DATABASE IF EXISTS bamazon;

CREATE DATABASE bamazon;

USE bamazon;

CREATE TABLE products (
 item_id INT NOT NULL AUTO_INCREMENT,
 product_name VARCHAR(45) NULL,
 
 department_name VARCHAR(45) NULL,
 price DECIMAL(10,2) NULL,
 stock_quantity INT NULL,

 PRIMARY KEY (item_id)
);

INSERT INTO products (product_name, department_name, price, stock_quantity )
VALUES ("dresses","Macy", 39.99, 5);
INSERT INTO products (product_name, department_name, price, stock_quantity )
VALUES ("blouse","JC Penny", 16.99, 7);
INSERT INTO products (product_name, department_name, price, stock_quantity )
VALUES ("pants","Target", 24.99, 17);
INSERT INTO products (product_name, department_name, price, stock_quantity )
VALUES ("camisoles","Forever 21", 9.99, 8);
INSERT INTO products (product_name, department_name, price, stock_quantity )
VALUES ("sandals","DSW", 49.99, 10);
INSERT INTO products (product_name, department_name, price, stock_quantity )
VALUES ("sweater","Old Navy", 18.00, 4);
INSERT INTO products (product_name, department_name, price, stock_quantity )
VALUES ("purse","Michael Kors", 59.99, 3);
INSERT INTO products (product_name, department_name, price, stock_quantity )
VALUES ("sun glass","Sunglass Hut", 64.99, 1);
INSERT INTO products (product_name, department_name, price, stock_quantity )
VALUES ("ear rings","Kay Jewelers", 24.99, 2);
INSERT INTO products (product_name, department_name, price, stock_quantity )
VALUES ("necklace","Charming Charlie", 15.99, 3);
INSERT INTO products (product_name, department_name, price, stock_quantity )
VALUES ("testZeroStock","Charming Charlie", 15.99, 0);



/* update
UPDATE products SET stock_quantity = 9 WHERE item_id = 1;
 */