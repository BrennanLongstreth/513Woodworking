# Project Name: 513 Woodworking 
URL: localhost/html/index.html  

## Descrption:
This project is meant to function as the website for the currently fictional but likely real in the future company 513 Woodworking. This website will allow users to browse products and gather information on how each piece is crafted. This website also allows users to order their own wonder made in my backyard.

## Table of Contents
* [Usage](#usage)
* [Contributing](#contributing)
* [Credits](#credits)
* [License](#license)
* [Future Plans](#FuturePlans)


## Usage 
Currently this website is for private use and should not be available in any form on the internet.
Everything in this github repo is required for full functionality minus the github related files. The landing page is index.html. All other pages can be navigated to from this main page or any other page. 
Steps for building:
1. Make sure your LAMP stack is installed and ready to use.
1. Navigate to the backend folder and open "config.php"
2. Change $dbuser and $adminuser to your desired user for the database on your computer (likely "root")
3. Change $pass and $adminpass to the passwords for their respective accounts (likely "")
4. save the file
5. log in to your mysql terminal as root from within the backend folder
6. run "CREATE DATABASE 513Woodworking;"
7. run "USE 513Woodworking;"
8. run "SOURCE database.sql;"
9. navigate using a browser to "localhost" 
10. you are now ready to use the website, if you would like to access the admin page; use: "localhost/html/admin.html"  

For more data, run "SOURCE testdata.sql" in your mysql terminal. 

Files not used in this project but there for future implementations: reciept.php

## Contributing:
I (Brennan Longstreth) Am the only contributor at the current time to this project, all images (aside from the stock image in the gallary page) are my own creation. If you would liek to contact me please do so at example@zagmail.gonzaga.edu (would rather not get spammed yet, ill create another email for this when the site goes live).

## Credits:
3D Art: Brennan Longstreth
Web Design: Brennan Longstreth
Database Architect: Brennan Longstreth
Full stack devloper: Brennan Longstreth

## License:
GNU General Public License v3.0

## Future Plans:
I will be adding full paypal implementation to this website soon, unfortunately I found out how it works a little bit too late to use it in the website. In the current build, payement will be handled via email or sms using paypal that way. 