# Chrome-Web-Scraper
Using html2canvas and a simple PHP endpoint, you can scrape full size screenshots with your browser - node.js not needed.


## Usage

    
    var SCRAPERCONFIG = {
    	LSKEY: 'scraper',
    	MAX: 1000,
    	PRINT_IN_IMG: true,
    	BLACKLIST_URIs: ['/my/', '/sso/'],
    	ENDPOINT: 'http://dienste.vhb.de/collector/save.php?name='
    }
    
    function loadScript(url, callback)
    {
        var script = document.createElement('script');
        script.type = 'text/javascript';
        script.src = url;
        script.onreadystatechange = callback;
        script.onload = callback;
        document.getElementsByTagName('head')[0].appendChild(script);
    }
    
    
    loadScript('https://rawgit.com/FedericoElles/Chrome-Web-Scraper/master/scraper.js', function(){});
