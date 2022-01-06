var phone_prefered = true; //if false then email was selected
        //regexes for each type of input
        var nREG = /^[\w\s]*$/;
        var pREG = /^\d{10}$/;
        var eREG = ""; //found out that I'm not supposed to validate email addresses 
        var aREG = /^[\w',#-\\/.\s]*$/;
        var iREG = /^[a-zA-Z0-9.]*$/;

        //function to validate the input of the form
        // need to add security for this
        function validateForm() {
            // I realize this validation function violates a lot of security principals but
            // that wasnt brought up as part of the assignment till the end so most of this is just idiot proofing
            console.log("validateForm");
            //name
            var name = document.forms["orderForm"]["name"].value;
            if (name.match(nREG)) {
                
            }else {
                alert("Please enter your name (special chars not allowed)");
                return false;
            }
            //prefered contact method
            if(phone_prefered) {
                var phone = document.forms["orderForm"]["phone"].value;
                if(!phone.match(pREG)) {
                    alert("Please enter your phone number in the form 1234567890");
                    return false;
                }
            }else if(!phone) {
                var email = document.forms["orderForm"]["email"].value;
                //apparently cant be checked with a rejex so just checking that theres an @ and a dot somewhere
                if(email.indexOf("@") == -1 || email.indexOf(".") == -1) {
                    alert("Please enter a valid email address");
                    return false;
                }
            }
            //address
            var address = document.forms["orderForm"]["address"].value;
            if (address == "" || !address.match(aREG)) {
                alert("Please enter a valid address");
                return false;
            }
            //special instructions
            var instructions = document.forms["orderForm"]["special"].value;
            if (!instructions.match(iREG)) {
                alert("There are illegal characters in your instructions.");
                return false;
            }

            //print data to console before submitting query
            console.log("name: " + name);
            console.log("phone: " + phone);
            console.log("email: " + email);
            console.log("address: " + address);
            console.log("special: " + instructions);

            //get price 
            
            //TODO: Set up loop for each product
            var success = false;
            for (const [key, value] of Object.entries(sessionStorage)) {
                //get addons
                a = document.getElementById("hiddenIDs_"+key).innerHTML;
                console.log("Addons: " + a);

                price = parseInt(document.getElementById("price_"+key).innerHTML);
                $.post("../backend/order.php", {
                        'name': name,
                        'product': key, //hard coded for now
                        'phone': phone,
                        'email': email,
                        'address': address,
                        'price': price, //calculated by database
                        'instructions': instructions,
                        'quantity': value,
                        'addons': a
                    }, 
                    function(data) {
                        //order successfully placed
                        //alert(data);
                        success = true;
                    }
                );
            };
            alert("Your order has been placed.");
            console.log("Form Submitted");
        }
        
        //function to update the UI based on the selected item in the prefered contact dropdown

        function updateUI_preferedContact() {
            var x = document.getElementById("contact_type").value;
            var email = document.getElementById("email_div");
            var phone = document.getElementById("phone_div");
            if (x == "email") {
                phone_prefered = false;
                email.style.display = "block";
                phone.style.display = "none";
            } else if (x == "phone") {
                phone_prefered = true;
                email.style.display = "none";
                phone.style.display = "block";
            }
        }

        window.onload = function() {
            //display contents of cart to the console
            for (const [key, value] of Object.entries(sessionStorage)) {
                console.log({key, value});
            };
            
            createTableStructure();
            populateTableFromDatabase();
        }

        function createTableStructure() {
            var table_body = document.getElementById("cart_table_body");
            
            // create table Structure
            for (const [key, value] of Object.entries(sessionStorage)) {
                item_key = key;
                display_string = key.replace(/([A-Z])/g, ' $1').replace(/^./, function(str){ return str.toUpperCase();})
                
                
                //row object for each row
                item_TR = document.createElement("tr");
                item_TR.id = "row_"+item_key;
                table_body.appendChild(item_TR);

                //td for item lable
                item_TD = document.createElement("td");
                item_TD.id = "item_"+item_key;
                item_TD.innerHTML = display_string;
                item_TR.appendChild(item_TD);

                //td for addon list
                addonList_TD = document.createElement("td");
                addonList_TD.id = "addonList_"+item_key;
                item_TR.appendChild(addonList_TD);

                // creates hidden list of IDs for each table row
                addonIDs_hidden = document.createElement("label");
                addonIDs_hidden.id = "hiddenIDs_"+item_key;
                addonIDs_hidden.hidden = true;
                addonList_TD.appendChild(addonIDs_hidden);
                // the inner html is used to store the list of IDs on the form                    
                

                //td for addon dropdown
                addonOption_TD = document.createElement("td");
                addonOption_TD.id = "addonOption_"+item_key;
                item_TR.appendChild(addonOption_TD);

                //td for quantity
                quantity_TD = document.createElement("td");
                quantity_TD.id = "quantity_"+item_key;
                item_TR.appendChild(quantity_TD);
                
                //td for cost
                cost_TD = document.createElement("td");
                cost_TD.id = "price_"+item_key;
                item_TR.appendChild(cost_TD);
            }
            console.log("TABLE: finished building cells")
        }

        function populateTableFromDatabase() {
            for (const [key, value] of Object.entries(sessionStorage)) {
                populateRowFromDatabase(key);
            }
        }

        function populateRowFromDatabase(item_key) {

            // addon dropdown 

            //grab the addon selection td element
            addonOptions_td = document.getElementById("addonOption_"+item_key);
            
            //create new dropdown
            addonOption_select = document.createElement("select");
            addonOption_select.id = "addonselect_"+item_key;
            addonOption_select.classList.add(item_key);

            //get values from database 
            $.get("../backend/getaddons.php", {'key':item_key}, function(data) {
                fillAddons(data);
            });

            //add event listener
            //addonOption_select.addEventListener("change", addonChanged);

            //append it to the addon selection TD
            addonOptions_td.appendChild(addonOption_select);

            //add button for add/delete
            addonADDREMOVE = document.createElement("button");
            addonADDREMOVE.id = "addonbutton_"+item_key;
            addonADDREMOVE.innerHTML = "Add/Remove";
            addonADDREMOVE.classList.add(item_key);
            addonADDREMOVE.addEventListener("click", addonChanged);

            addonOptions_td.appendChild(addonADDREMOVE);
            // quantity dropdown

            //grab the quantity selection td element
            quantity_td = document.getElementById("quantity_"+item_key);
            
            //create new dropdown
            quantity_select = document.createElement("select");
            quantity_select.id = "quantityselect_"+item_key;
            quantity_select.classList.add(item_key);

            //populate dropdown
            for(i = 0; i <= 10; i++) {
                o = document.createElement("option");
                o.value = i;
                o.id = i;
                o.innerHTML = i;
                quantity_select.appendChild(o);
            }

            //get the value from the session storage
            console.log(sessionStorage.getItem(item_key));
            value = sessionStorage.getItem(item_key);

            //set value from table
            quantity_select.value = value;

            //create event listener
            quantity_select.addEventListener('change', quantityChanged);

            //append it to the addon selection TD
            quantity_td.appendChild(quantity_select);

            //add price
            getPrice(item_key,document.getElementById("hiddenIDs_"+item_key).innerHTML);

        }

        function fillAddons(data) {
            //console.log(data);
            //returns in the format "key@json"
            dataTemp = data.split('@');
            key = dataTemp[0];
            data = dataTemp[1];
            //console.log(key + " - " + data);

            //parse data to json object
            jsonObj = JSON.parse(data);

            console.log(jsonObj);
            //get the addon select object
            addonDD = document.getElementById("addonselect_"+key);
            
            //create options
            for(i = 0; i < jsonObj.length; i++) {
                //create option
                o = document.createElement("option");
                o.value = jsonObj[i].addon_id;
                o.innerHTML = jsonObj[i].addon_name + " (+" + jsonObj[i].addon_price + ")";
                addonDD.appendChild(o);
            }
        }

        function quantityChanged(event) {
            // see which one was changed
            item_key = this.classList[0];
            //output to console
            
            //check for 0 to remove
            if(this.value == 0) {
                console.log("CART: removed " + item_key);
                sessionStorage.removeItem(item_key);
                location.reload();
            }else {
                console.log("CART: updated " + this.value + ":" + item_key);
                sessionStorage.setItem(item_key,this.value);
                //location.reload();
            }

            
            price = getPrice(item_key,document.getElementById("hiddenIDs_"+item_key).innerHTML);
            //return for debugging purposes
            //return q;
        }

        function addonChanged(event) {
            item_key = this.classList[0];
            //output to console
            console.log(item_key);
            dd = document.getElementById("addonselect_" + item_key);
            console.log(item_key + ": " + dd.value);
            
            addon_ids = document.getElementById("hiddenIDs_"+item_key);
            addon_list = document.getElementById("addonList_" + item_key);
            if(addon_ids.innerHTML.includes(dd.value)) {
                //check if not first in list
                console.log("found")
                if(addon_ids.innerHTML.includes(("," + dd.value))) {
                    addon_ids.innerHTML = addon_ids.innerHTML.replace("," + dd.value, "");
                    addon_list.innerHTML = addon_list.innerHTML.replace(", " + dd.options[dd.selectedIndex].text, "");
                }else {
                    addon_ids.innerHTML = addon_ids.innerHTML.replace(dd.value, "");
                    addon_list.innerHTML = addon_list.innerHTML.replace(dd.options[dd.selectedIndex].text, "");
                }
                //remove
            } else {
                //add 
                if(addon_ids.innerHTML == "") {
                    addon_ids.innerHTML = addon_ids.innerHTML + dd.value;
                    addon_list.innerHTML = addon_list.innerHTML + dd.options[dd.selectedIndex].text;
                }else {
                    addon_ids.innerHTML = addon_ids.innerHTML + "," + dd.value;
                    addon_list.innerHTML = addon_list.innerHTML + ", " + dd.options[dd.selectedIndex].text
                }
            }
            
            console.log("IDS: " + addon_ids.innerHTML);

            getPrice(item_key,document.getElementById("hiddenIDs_"+item_key).innerHTML);
        }

        function getPrice(key,addons) {
            console.log("PRICE: update with " + key);
            //get hidden list of addon ids
            addon_ids = document.getElementById("hiddenIDs_"+key);
            addons = addon_ids.innerHTML;
            console.log("ADDONS: " + addons);
            $.get("../backend/getprice.php", {'key':key, 'addons':addons}, function(data) {
                q = sessionStorage.getItem(key);
                //console.log(key + ": cost = " + data + " x " + q);
                
                document.getElementById("price_" + key).innerHTML = data * q;
                //console.log(data);
                updateTotals();
            });

            //console.log("finished updating")
        }

        function updateTotals() {
            //update subtotal
            subtotal = 0;
            for (const [key, value] of Object.entries(sessionStorage)) {
                subtotal += parseInt(document.getElementById("price_"+key).innerHTML);
            }
            console.log("Subtotal: " + subtotal);

            var subtotal_display = document.getElementById("subtotal");
            subtotal_display.innerHTML = "Subtotal: $" + (Math.round(subtotal * 100) / 100).toFixed(2);
            //update tax
            //var tax_display = document.getElementById("tax");
            //tax_display.innerHTML = "Tax: $" + (Math.round(subtotal * 0.08)).toFixed(2);
            //update total
            var total_display = document.getElementById("total");
            total_display.innerHTML = "Total: $" + (Math.round(subtotal /*+ subtotal * 0.08*/)).toFixed(2);

        }