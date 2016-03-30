
/**
 * IIF
 */
(function(SCRAPERCONFIG){

	//store map of visited pages
	var data = {};

	function loadScript(url, callback)
	{
	    var script = document.createElement('script');
	    script.type = 'text/javascript';
	    script.src = url;
	    script.onreadystatechange = callback;
	    script.onload = callback;
	    document.getElementsByTagName('head')[0].appendChild(script);
	}

	function logx(txt){
		console.log('SCRAPER> ' + txt);
	}

	function save(){
		localStorage.setItem(SCRAPERCONFIG.LSKEY || 'scraper', JSON.stringify(data));
	}
	
	function scan(){
		var count = 0;
		var arr = [].slice.call(document.getElementsByTagName('a')).forEach(function(i, link){
					count+=1;
					var uri = i.href;
					var valid = true;
					if (SCRAPERCONFIG.BLACKLIST_URIs){
						SCRAPERCONFIG.BLACKLIST_URIs.forEach(function(word){
							if (valid) {
								valid = uri.indexOf(word) === -1;
							}
						})
					}
					
					if (uri && (uri[0] === '/' || uri.indexOf(location.hostname) > -1 && valid)){
						//console.log(uri);
						if (typeof data[uri] === 'undefined'){
							data[uri] = 0;
							
						}
						
					}
				});
		save();		
		logx('Scanning complete. URLs found: ' + count);	
	}

	function url2filename(){
		var d = new Date();
		return d.getFullYear() + '-' +
			('0'+(d.getMonth()+1)).substr(-2) + '-' + 
			('0'+d.getDate()).substr(-2) + '_' +
			('0'+d.getHours()).substr(-2) + '-' +
			('0'+d.getMinutes()).substr(-2) + 
			'h-' + location.host + location.pathname.split('/').join('_') + '.png';
	}
	
	/**
	* Start next target for scraping
	*/
	function next(){
		if (data && typeof halt === 'undefined'){
			for (var x in data){
				if (data[x] === 0){
					logx('Next target: ' + x);
					setTimeout(function() {
						localStorage.setItem('scraper_target', x);
						location.href = x;
					}, 1000);
					break;
				}
			}
		} else {
			logx('Stopped: ', data, halt);
		}
	}

	
	
	window.reset = function(){
		data = {};
		save();
	}
	
	
	logx('Chrome Web Scrapper v0.2');
	logx('Stop scraper by typing "halt=1" into console.');
	
	var dataStaging = localStorage.getItem(SCRAPERCONFIG.LSKEY || 'scraper');
	if (dataStaging){
		dataStaging = JSON.parse(dataStaging);
		data = dataStaging;
	}
	logx('Loading data: ' + Object.keys(data).length);
	
	if (typeof data[location.href] === 'undefined'){
		data[location.href] = 0;
	}
	
	scan();
	
	//handle evil redirects
	var lastTarget = localStorage.getItem('scraper_target');
	if (lastTarget){
		if (lastTarget !== location.href){
			logx('Redirect found: marked as done: ' + lastTarget);
			data[lastTarget] = 1;
			save();
		}
	}

	
	var js1 = 'https://cdnjs.cloudflare.com/ajax/libs/html2canvas/0.4.1/html2canvas.min.js';
	
	loadScript(js1, function(){
		
		window.snap = function(force){
			html2canvas(document.body, {
			onrendered: function(canvas) {
				logx('Render complete...');
				if (data[location.href] === 0 || force){
					logx('Creating screenshot...');
					//var screenshot = canvas.toDataURL();
					
					if (SCRAPERCONFIG.PRINT_IN_IMG){
						var ctx = canvas.getContext("2d");
						function drawStroked(text, x, y) {
							ctx.font = "15px Sans-serif"
							ctx.strokeStyle = 'white';
							ctx.lineWidth = 8;
							ctx.strokeText(text, x, y);
							ctx.fillStyle = 'black';
							ctx.fillText(text, x, y);
						}
						
						drawStroked(new Date(), 20, 50);
						drawStroked(location.href, 20, 80);
					}
					
					var ajax = new XMLHttpRequest();
					ajax.open("POST",SCRAPERCONFIG.ENDPOINT + url2filename(),false);
					ajax.setRequestHeader('Content-Type', 'application/upload');
					ajax.onreadystatechange = function () {
						logx('Screenshot complete!');
						if (ajax.readyState == 4) {
							data[location.href] = 1;
							save();
							next();
						}
					};			
					ajax.send(canvas.toDataURL("image/png"));
				} else {
					logx('Already captured.');
					next();
				}
			}
			});
		}
		window.snap();
	});


})(SCRAPERCONFIG);
