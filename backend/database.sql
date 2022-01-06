
/**********************************************************************
 * NAME: Brennan Longstreth
 * CLASS: CPSC 321
 * DATE: 10/28/2021
 * HOMEWORK: Final Project
 * DESCRIPTION: 


    DANGER: DO NOT RUN UNLESS YOU WISH TO RESET THE DATABASE!!!!!


 **********************************************************************/
/*UNCOMMENT TO RESET WHOLE DATABASE
DROP TABLE Order_Addon;
DROP TABLE Product_Addon;
DROP TABLE Orders;
DROP TABLE Status_Options;
DROP TABLE Products;
DROP TABLE Type_Options;
DROP TABLE Addons;
*/

/*UNCOMMENT TO UPDATE NON CUSTOMER DATA
DROP TABLE Product_Addon;
DROP TABLE Status_Options;
DROP TABLE Products;
DROP TABLE Type_Options;
DROP TABLE Addons;
*/

-- TODO: add create table statements
CREATE TABLE Addons (
    addon_id INT PRIMARY KEY,
    addon_name TEXT NOT NULL,
    addon_price DECIMAL(6,2) NOT NULL
);

CREATE TABLE Type_Options (
    option_id INT PRIMARY KEY,
    option_name VARCHAR(50) NOT NULL
);

CREATE TABLE Products (
    product_id INT PRIMARY KEY,
    product_name TEXT NOT NULL,
    product_sku VARCHAR(50),
    product_type INT NOT NULL,
    product_price DECIMAL(6,2) NOT NULL,
    CONSTRAINT fk_product_type
        FOREIGN KEY (product_type)
        REFERENCES Type_Options(option_id)
);

CREATE TABLE Status_Options (
    status_id TINYINT PRIMARY KEY,
    status_text VARCHAR(25) NOT NULL
);


/* orders */
CREATE TABLE Orders (
    order_id INT NOT NULL AUTO_INCREMENT PRIMARY KEY,
    order_name TEXT NOT NULL,
    order_address TEXT NOT NULL,
    order_email TEXT,
    order_phone VARCHAR(10), /* phone number in the format*/
    order_date DATE NOT NULL,
    order_delivery_date DATE NOT NULL,
    order_product_id INTEGER NOT NULL,
    order_status TINYINT NOT NULL,
    order_price DECIMAL(6,2) NOT NULL,
    order_instructions TEXT,
    CONSTRAINT fk_prodID_product 
        FOREIGN KEY (order_product_id) 
        REFERENCES Products(product_id),
    CONSTRAINT fk_os_status
        FOREIGN KEY (order_status)
        REFERENCES Status_Options(status_id)
);

CREATE TABLE Product_Addon (
    product_id INT NOT NULL,
    addon_id INT,
    CONSTRAINT pk_productID_addonID
        PRIMARY KEY (product_id,addon_id),
    CONSTRAINT fk_pa_product
        FOREIGN KEY (product_id) 
        REFERENCES Products(product_id)
        ON DELETE CASCADE,
    CONSTRAINT fk_pa_addon
        FOREIGN KEY (addon_id)
        REFERENCES Addons(addon_id)
        ON DELETE CASCADE
);



CREATE TABLE Order_Addon (
    order_id INT NOT NULL,
    addon_id INT NOT NULL,
    CONSTRAINT pk_orderID_addonID
        PRIMARY KEY (order_id,addon_id),
    CONSTRAINT fk_oa_order 
        FOREIGN KEY (order_id) 
        REFERENCES Orders(order_id) 
        ON DELETE CASCADE,
    CONSTRAINT fk_oa_addon
        FOREIGN KEY (addon_id) 
        REFERENCES Addons(addon_id) 
);


-- DO NOT TOUCH
INSERT INTO Status_Options 
VALUES (0, 'PENDING'),
       (1, 'PAID'),
       (2, 'BUYING PARTS'),
       (3, 'IN-PROGRESS'),
       (4, 'FINISHING TOUCHES'),
       (5, 'READY FOR DELIVERY'),
       (6, 'DELIVERED');
-- END DO NOT TOUCH


-- AVAILABLE PRODUCTS
INSERT INTO Type_Options
VALUES (9100,    'DIE TABLE'),
       (9101,    'END TABLE'),
       (9102,    'COFFEE TABLE'),

       (9200,    'BED FRAME'),
       (9201,    'NIGHTSTAND'),

       (9300,    'DESK'),
       
       (9900,    'SHELVING');
-- END AVAILABLE PRODUCTS



-- AVAILABLE ADDONS
INSERT INTO Addons (addon_id, addon_name, addon_price) 
VALUES (2100, 'OSB Top',     40.00), /* tops for die tables */
       (2101, 'Ply Top',     60.00),
       (2102, 'Sanded Top',  80.00),

       (2150, 'Bonus Shelf', 5.00 ),
       (2151, 'End Shelf',   15.00),

       (2200, 'Primed',      60.00),
       (2201, 'Painted',     40.00);
-- END AVAILABLE ADDONS

-- AVAILABLE PRODUCTS (id, name, sku, type_id, price)
INSERT INTO Products 
VALUES (1000,   'Light Base',       NULL,           9100,   90),
       (1010,   'Untreated Base',   'SCREWS',       9100,   200),
       (1011,   'Untreated Base',   'JOINERY',      9100,   200),
       (1020,   'Treated Base',     'SCREWS',       9100,   240),
       (1021,   'Treated Base',     'JOINERY',      9100,   240);
-- END AVAILABLE PRODUCTS

-- PRODUCT ADDONS (prod_id, addon_id)
INSERT INTO Product_Addon
VALUES (1000,   2100),
       (1000,   2101),
       (1000,   2102),
       (1000,   2150),
       (1000,   2151),
       (1000,   2200),
       (1000,   2201),  

       (1010,   2100),
       (1010,   2101),
       (1010,   2102),
       (1010,   2200),
       (1010,   2201), 

       (1011,   2100),
       (1011,   2101),
       (1011,   2102),
       (1011,   2200),
       (1011,   2201), 

       (1020,   2100),
       (1020,   2101),
       (1020,   2102),
       (1020,   2200),
       (1020,   2201), 

       (1021,   2100),
       (1021,   2101),
       (1021,   2102),
       (1021,   2200),
       (1021,   2201);  
-- END PRODUCT ADDONS


-- TODO: add select statements (to print tables)
\! echo "Product Types";
SELECT * FROM Type_Options;
\! echo "Order Statuses";
SELECT * FROM Status_Options;
\! echo "Orders";
SELECT * FROM Orders;
\! echo "Addons per order";
SELECT * FROM Order_Addon;
\! echo "Products";
SELECT * FROM Products;
\! echo "Available addons per product";
SELECT * FROM Product_Addon;
\! echo "All Addons";
SELECT * FROM Addons;


