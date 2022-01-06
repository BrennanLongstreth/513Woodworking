/* file so i dont have to keep looking up the user commmands */


/* list users */
SELECT User, Host FROM mysql.user;

/* show grants */
SHOW GRANTS FOR '513Client'@'%';

/* add permissions to user 
GRANT SELECT ON 513Woodworking.Addons TO '513Client'@'%';
*/
