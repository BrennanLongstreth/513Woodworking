/**********************************************************************
 * NAME: Brennan Longstreth
 * CLASS: CPSC 321
 * DATE: 10/28/2021
 * HOMEWORK: Final Project
 * DESCRIPTION: 
    
    FAKE: test data for checking sql database functionality

    WARNING: WILL DELETE ALL USER DATA FROM THE SERVER

**********************************************************************/
/* Commented for safety, will delete all data in user tables
DELETE FROM Orders;
DELETE FROM Order_Addon;
*/
INSERT INTO Orders VALUES (NULL, 'testname1', 'test address1', 'test@email.com', NULL, '2021-01-01', '2021-01-08', 1000, 4, 240.00, NULL);
INSERT INTO Order_Addon VALUES (LAST_INSERT_ID(),2100);
INSERT INTO Order_Addon VALUES (LAST_INSERT_ID(),2200);

INSERT INTO Orders VALUES (NULL, 'testname2', 'test address2', NULL, "2222222222", '2021-02-02', '2021-02-09', 1011, 6, 260.00, NULL);
INSERT INTO Order_Addon VALUES (LAST_INSERT_ID(),2102);
INSERT INTO Order_Addon VALUES (LAST_INSERT_ID(),2200);
INSERT INTO Order_Addon VALUES (LAST_INSERT_ID(),2201);

INSERT INTO Orders VALUES (NULL, 'testname3', 'test address3', NULL, "3333333333", '2021-04-05', '2021-06-07', 1021, 6, 260.00, NULL);
INSERT INTO Order_Addon VALUES (LAST_INSERT_ID(),2102);
INSERT INTO Order_Addon VALUES (LAST_INSERT_ID(),2100);
INSERT INTO Order_Addon VALUES (LAST_INSERT_ID(),2201);