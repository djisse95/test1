const puppeteer = require('puppeteer');




(async () => {
  const browser = await puppeteer.launch();
  const page = await browser.newPage();
  await page.goto('http://sousdeycambodia.com');
  const pageTitle = await page.title();
  console.log(pageTitle);
  var contentPage = await page.$eval('*', (el) => el.innerText);
    //console.log(contentPage);

	var foundEmails =[];
	var foundPhones=[];
	var foundSocials=[];

	var emailRegex = /(([^<>()[\]\\.,;:\s@\"]+(\.[^<>()[\]\\.,;:\s@\"]+)*)|(\".+\"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))/;
	var numReg=/[\+]?\d{10- }|\(\d{3}\)\s?-\d{6}/


	var fbReg=/(?:https?:\/\/)?(?:www\.)?(?:facebook|fb|m\.facebook)\.(?:com|me)/i

	var gotcha;

	while (match = numReg.exec(contentPage)){
		foundPhones.push(match[0]);
		console.log(match[0]);

		contentPage= contentPage.replace(match[0],"");
	}

	console.log('Phones: ' + foundPhones);

	while (match = emailRegex.exec(contentPage)){
		foundEmails.push(match[0]);
		console.log(match[0]);
		contentPage= contentPage.replace(match[0],"");
	}
  	console.log('Emails: ' + foundEmails);


  	const hrefs1 = await page.evaluate(
      () => Array.from(
        document.querySelectorAll('a[href]'),
        a => a.getAttribute('href')
      )

    );

    //console.log(hrefs1);
    for(var i=0;i<hrefs1.length;i++){
    	if(hrefs1[i].includes("facebook"))
    		foundSocials.push(hrefs1[i])
    	else if(hrefs1[i].includes("instagram"))
    		foundSocials.push(hrefs1[i])
    	else if(hrefs1[i].includes("twitter"))
    		foundSocials.push(hrefs1[i])
    	else if(hrefs1[i].includes("pinterest"))
    		foundSocials.push(hrefs1[i])
    	else if(hrefs1[i].includes("linkedin"))
    		foundSocials.push(hrefs1[i])
    }
    console.log('Socials: ' + foundSocials);

  await page.screenshot({ path: 'example.png' });

  await browser.close();
})();
