var TestCase_1 = require("TestCase_1");
var TestCase_2 = require("TestCase_2");

function TestThree(){
  const url = "https://www.hollandandbarrett.com/en-au/"
  TestCase_1.OpenWebBrowserUrl(url);
  TestCase_1.HandlePopup();
  // wait for user to login
  TestCase_1.Login();
  
  // Add any 2 Vitamin C products from 'Vitamins & Supplements' to the basket
  TestCase_2.SearchProduct("vitamin c");
  AddOneOrMoreProductsToBasket("2");
  
  // Add any 3 Vegan Chocolate products from 'Vegan' to the basket 
  TestCase_2.SearchProduct("vegan");
  AddOneOrMoreProductsToBasket("3");
  
  // navigate to basket
  Aliases.browser.pageVitaminCTabletsSupplementsSh.linkBasket.textnodeBasket.Click();
  
  // Verify all the products are added to the basket
  TestCase_2.VerifyNoOfProductsInBasket("5");
  
  // Verify the subtotal of the products (quantity * price) and total of the basket
  
  
  TestCase_1.CloseBrowser();
}

function AddOneOrMoreProductsToBasket(num){
  let productToAdd1 = browser.pageVitaminCTabletsSupplementsSh.linkBuy1Get1HalfPrice;
  productToAdd1.buttonAddToBasket.Click();
 
  if(num>1){
    for(var i=2;i<=num;i++){
      productToAdd1.buttonAddToBasket+i.Click();
    }
  }
}