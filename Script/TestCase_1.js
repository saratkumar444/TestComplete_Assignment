﻿function TestOne(){
  const url = "https://www.hollandandbarrett.com/en-au/"
  OpenWebBrowserUrl(url);
  HandlePopup();
  
  let page = Aliases.browser.pageDashboard; 

  // Click on Rewards section
  var rewardsLink = page.sectionMyAccount.linkRewards.textnodeRewards;
  rewardsLink.Click(); // Wait for the Rewards section to load
  page.wait();
  
  // start Account creation by clicking on SignUp
  page = Aliases.browser.pageSignup;
  let article = page.articleBack;
  let section = article.signupForm;
  
  aqObject.CheckProperty(article.linkSignUp, "contentText", cmpEqual, "Sign up");
  article.linkSignUp.Click();  // Wait for the registration page to load
  page.Wait();

  // Register for an account, please update the details
  EnterFormDetails();
  section.labelEmailMeAbout.checkboxConsentemail.ClickChecked(true);;
  section.labelIAgreeToTheRewardsForLife.checkboxTerms.ClickChecked(true);
  section.buttonCreateAnAccount.ClickButton(); // Wait for the registration process to complete
  page.Wait();
  
  // Verify account creation
  var verificationMessage = page.FindElement("TextContent", "Account created successfully");
  if (verificationMessage.Exists) {
      Log.Message("Account created successfully!");
      aqObject.CheckProperty(article.textnodeAccountCreated, "contentText", cmpEqual, "Account created");
      aqObject.CheckProperty(article.textnode, "contentText", cmpEqual, "Your account and Rewards For Life membership are ready. Sign in to your account and start browsing.");
   } else {
      Log.Warning("Account creation verification failed.");
   }
  
  // navigate to LoginPage
  let link = article.linkSignIn;
  aqObject.CheckProperty(link, "ObjectLabel", cmpEqual, "Sign in");
  link.Click();
 
  // Close the browser
  CloseBrowser();
}

function EnterFormDetails(){
 // Fill in registration details
  section.textboxFirstName.SetText("Sarat");
  section.textboxLastName.SetText("kumar");
  section.emailinputEmailAddress.SetText("address11@gmail.com");
  section.emailinputConfirmEmailAddress.SetText("address11@gmail.com");
  // Scroll the page down using the "Page Down" key
  page.Keys("^v");  
  section.passwordboxCreateAPassword.SetText("Sample123"); 
}

function HandlePopup(){
  var acceptButton = page.FindChild("ObjectIdentifier", "AcceptButtonID", 1000);
  if (acceptButton.Exists) {
      acceptButton.Click();
    }
}
function CloseBrowser(){
  Sys.Browser().BrowserWindow(0).Close();
}

function OpenWebBrowserUrl(url){
  Browsers.Item("chrome").Run(url);
}
