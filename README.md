# Chrome-Web-Scraper
Using html2canvas and a simple PHP endpoint, you can scrape full size screenshots with your browser - node.js not needed.


## Usage

    
    var SCRAPERCONFIG = {
    	LSKEY: 'scraper',
    	MAX: 1000,
    	PRINT_IN_IMG: true,
    	BLACKLIST_URIs: ['/paywall/', '/evil/'],
    	ENDPOINT: 'http://my.domain/save.php?name=''
    };
    
    (function(){var s=document.createElement('script');s.type='text/javascript';s.src='https://rawgit.com/FedericoElles/Chrome-Web-Scraper/master/scraper.js';document.getElementsByTagName('head')[0].appendChild(s);})();
