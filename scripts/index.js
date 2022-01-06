function showDieTables() {
    console.log("showDieTables()");
    //hide all other categories
    hideCoffeeTables();
    hideDesks();
    hideBedFrames();
    hideShelving();
    var dieTables = document.getElementsByClassName("die_tables");
    for(var i = 0; i < dieTables.length; i++) {
        dieTables[i].style.display = "block";
    }
    
}
function showCoffeeTables() {
    console.log("showCoffeeTables()");
    //hide all other categories
    hideDieTables();
    hideDesks();
    hideBedFrames();
    hideShelving();
    var coffeeTables = document.getElementsByClassName("coffee_tables");
    for(var i = 0; i < coffeeTables.length; i++) {
        coffeeTables[i].style.display = "block";
    }
}
function showDesks() {
    console.log("showDesks()");
    //hide all other categories
    hideDieTables();
    hideCoffeeTables();
    hideBedFrames();
    hideShelving();
    var desks = document.getElementsByClassName("desks");
    for(var i = 0; i < desks.length; i++) {
        desks[i].style.display = "block";
    }
}
function showBedFrames() {
    console.log("showBedFrames()");
    //hide all other categories
    hideDieTables();
    hideCoffeeTables();
    hideDesks();
    hideShelving();
    var bedFrames = document.getElementsByClassName("bed_frames");
    for(var i = 0; i < bedFrames.length; i++) {
        bedFrames[i].style.display = "block";
    }
}
function showShelving() {
    console.log("showShelving()");
    //hide all other categories
    hideDieTables();
    hideCoffeeTables();
    hideDesks();
    hideBedFrames();
    var shelving = document.getElementsByClassName("shelving");
    for(var i = 0; i < shelving.length; i++) {
        shelving[i].style.display = "block";
    }
}
function hideDieTables() {
    var dieTables = document.getElementsByClassName("die_tables");
    for(var i = 0; i < dieTables.length; i++) {
        dieTables[i].style.display = "none";
    }
}

function hideCoffeeTables() {
    var coffeeTables = document.getElementsByClassName("coffee_tables");
    for(var i = 0; i < coffeeTables.length; i++) {
        coffeeTables[i].style.display = "none";
    }
}

function hideDesks() {
    var desks = document.getElementsByClassName("desks");
    for(var i = 0; i < desks.length; i++) {
        desks[i].style.display = "none";
    }
}

function hideBedFrames() {
    var bedFrames = document.getElementsByClassName("bed_frames");
    for(var i = 0; i < bedFrames.length; i++) {
        bedFrames[i].style.display = "none";
    }
}

function hideShelving() {
    var shelving = document.getElementsByClassName("shelving");
    for(var i = 0; i < shelving.length; i++) {
        shelving[i].style.display = "none";
    }
}

//cart managment
function addToCart(id) {
    console.log("addToCart(" + id + ")");
    var id_quantity = sessionStorage.getItem(id);
    if(id_quantity == null) {
        id_quantity = 1;
        sessionStorage.setItem(id, id_quantity);
    } else {
        id_quantity = parseInt(id_quantity) + 1;   
    }
    sessionStorage.setItem(id, id_quantity);
    console.log("added "+ id_quantity + " " + id + " to cart");
}