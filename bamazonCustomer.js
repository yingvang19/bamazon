var mysql = require("mysql");
var inquirer = require("inquirer");

// create connections to Mysql database
var connection = mysql.createConnection({

host: "localhost",
port: 3306,
user: "root",
password: "",
database: "bamazon"

});

connection.connect(function(err){
    //if error throw error catch if not start the connection
if(err) throw err; 

 readProducts();
 start();
});

function readProducts() {
    console.log("Choose from these products...\n");
    var queryStr1 = "Select item_id, product_name, price, stock_quantity from products;";
    connection.query(queryStr1, function(err, result) {
      if (err) throw err;
      // Log all results of the SELECT statement
      // console.log(result);
      for(var i =0; i<result.length; i++){
        // console.log("==========================");
        // console.log(i);
        console.log("\nItem ID:",result[i].item_id);
        console.log("Product Name:",result[i].product_name);
        console.log("Price:$",result[i].price);
        console.log("Stock Quantity:",result[i].stock_quantity);
        console.log("==========================\n\n\n");
      }
     
    });
  }

  // function which prompts the user for what action they should take
function start() {
  inquirer
    .prompt(
	{
     
      name: "yesOrNo",
      type: "list",
      message: "\nChoose [Yes] To buy items.\nChoose [No] Exit store.",
      choices: ["Yes", "No"]
    })
    .then(function(answer) {
      // based on their answer, either Yes to buy or No to not buy and display  the buy or the post functions
      /*
      The app should then prompt users with two messages.
      The first should ask them the ID of the product they would like to buy.
      The second message should ask how many units of the product they would like to buy. */
      if (answer.yesOrNo === "Yes") {
        // postAuction();  // this function lets the user choose what product to buy
        buyItems();
      }
      else{
        console.log("Thanks for shopping with us and have a great day!");
        connection.end(); 
       
      }
    });
}

function buyItems() {
	

	// Prompt the user to select an item
	inquirer.prompt([
		{
			name: "item_id",
			type: "input",
			message: "Please enter the Item ID.",
		},
		{
			name: "quantity",
			type: "input",
			message: "How many do you need?",
		}
	]).then(function(input) {
		// console.log("Customer has selected: \n   
		// item_id = "  + input.item_id + "\n    quantity = " + input.quantity);

		var item = input.item_id;
		var quantity = input.quantity;

		// Query db to confirm that the given item ID exists in the desired quantity
		var queryStr2 = "SELECT * FROM products WHERE ?";

		connection.query(queryStr2, {item_id: item}, function(err, result) {
			if (err) throw err;

		
			// cannot use floats, negative, or strings error catch
			if (result.length === 0 || quantity < 0) {
				console.log("Please Select correct ID item");
				buyItems();

			} else {
				var choosenResult = result[0];

			
				// If the quantity requested by the user is in stock
				if (quantity <= choosenResult.stock_quantity) {
					console.log("The product you have choosen is in stock!");

					// Construct the updating query string
          var queryStr3 = "UPDATE products SET stock_quantity = " + (choosenResult.stock_quantity - quantity)
           + " WHERE item_id = " + item;
					// console.log("updateQueryStr = " + updateQueryStr);

					// Update the inventory
					connection.query(queryStr3, function(err, result) {
						if (err) throw err;
            console.log("Product item:",choosenResult.product_name, );
						console.log("Your total price is $" + (choosenResult.price * quantity).toFixed(2));
						console.log("Thanks for shopping with us and have a great day!");
						console.log("\n==========================\n");
						// End the database connection
						connection.end();
					})
				} else {
					console.log("Insufficient Quantity! Sorry, there is not enough product in stock.");
					console.log("Please choose again.");
					console.log("\n==========================\n");
      			    readProducts();
					buyItems();
				}
			}
		})// end of data base
	})// end of promise
}//end of promptUserPurchase()




