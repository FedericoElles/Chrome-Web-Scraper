# Chrome-Web-Scraper
Using html2canvas and a simple PHP endpoint, you can scrape full size screenshots with your browser - node.js not needed.

## Prerequisites

### Browser

Install for Chrome **CustomJS**
https://chrome.google.com/webstore/detail/custom-javascript-for-web/poakhlngfciodnhlhhgnaaelnpjljija  
or for Firefox **Greasemonkey**
https://addons.mozilla.org/de/firefox/addon/greasemonkey/

### Endpoint to store images

Add save.php to your server and remember the url



## Usage

Add a new script to the website you wand to scrape
    
    var SCRAPERCONFIG = {
    	LSKEY: 'scraper',
    	MAX: 1000,
    	PRINT_IN_IMG: true,
    	BLACKLIST_URIs: ['/paywall/', '/evil/'],
    	ENDPOINT: 'http://my.domain/save.php?name=''
    };
    
    (function(){var s=document.createElement('script');s.type='text/javascript';s.src='https://rawgit.com/FedericoElles/Chrome-Web-Scraper/master/scraper.js';document.getElementsByTagName('head')[0].appendChild(s);})();
