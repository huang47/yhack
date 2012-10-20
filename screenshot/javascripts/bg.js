var win, menuType, type, dataURL = [];
var tabid, taburl, tabtitle;
var counter, ratio , scrollBar,
	centerW=0, centerH=0;
var currentversion= chrome.app.getDetails().version;	
//localStorage['version'] = '3.3.5';
var tabids = {};
 
chrome.extension.onRequest.addListener(function(request, sender, sendResponse) {
	//get screenshot type
	console.log(menuType,sender);
	if (!sender.tab || sender.tab.id == -1) {
		menuType = request.action;
	}
	console.log(request,menuType);
	switch(request.action) {
		case 'visible':
			if (menuType == 'selected') {
				type = 'visible';
				centerW = request.centerW;
				centerH = request.centerH;
			}
			captureVisible();
			sendRequest('tab',tabid,{action:'restorebar'});
			break;
		case 'selected':
			captureSelected();
			break;
		case 'entire':
			captureEntire();
			break;
		case 'https':
		    alert('For security reason, Capture Selected Area doesn\'t work in https pages! Please try other options.');	
			
		case 'insert_script':
			if (menuType == 'selected') {
				chrome.tabs.executeScript(tabid, {file: 'javascripts/dragresize.js'});
				chrome.tabs.insertCSS(tabid, {file: 'stylesheets/selected.css'});
				console.log("insert");
			}
			
			chrome.tabs.executeScript(tabid, {file: 'javascripts/content_script.js'}, 
				function() {sendRequest('tab', tabid, {action:'init_'+menuType+'_capture'});});
			break;
		case 'script_running':
			sendRequest('tab', tabid, {action:'init_'+type+'_capture'});
			break;
		case 'check_shortcuts':
			updateShortcutsRequest(sender.tab.id);
			break;
		case 'update_shortcuts':
			chrome.tabs.getAllInWindow(null, function(tabs) {
				for (var i=0, len=tabs.length; i<len; i++) {
					var t = tabs[i],
						u = t.url;
					if(!u.match(/https?:\/\/*\/*/gi) || u.match(/https:\/\/chrome.google.com\/extensions/i))
						continue;
					updateShortcutsRequest(t.id);
				}
			});
			break;
		/*case 'init_entire_capture_done':
			saveAndScroll();
			break;*/
		case 'scroll_next_done':
		    sendRequest('tab',tabid,{action:'hidescroll'});
			saveAndScroll();
			sendRequest('tab',tabid,{action:'restorescroll'});
			break;
		case 'entire_capture_done':
			counter = request.counter;
			ratio = request.ratio;
			scrollBar = request.scrollBar;
			type = 'entire';
			if (menuType == 'selected') {
				centerW = request.centerW;
				centerH = request.centerH;
			}
			console.log('newTab');
			sendRequest('tab',tabid,{action:'restorebar'});
			newTab();
			
			//console.log(dataURL.length);
			break;
		case 'ready':
			var image = document.getElementById('test_image');
			function imageOnload() {
				//console.log(77,menuType);
				sendRequest('tab', tabid, {
					menuType:menuType, type:type, data:dataURL, 
					taburl:taburl, tabtitle:tabtitle,
					counter:counter, ratio:ratio, scrollBar:scrollBar,
					centerW:centerW, centerH:centerH,
					w:image.width, h:image.height
				});
				dataURL = [];
				image.src = '';
				image.removeEventListener('onload', imageOnload, false);
				image = null;
			}
			image.onload = imageOnload;
			image.src = dataURL[0];
			break;
		case 'copy':
			chrome.experimental.clipboard.executeCopy(tabid, function() {alert('copied')});
			break;
		case 'exit':
			chrome.tabs.getSelected(null, function(t) { chrome.tabs.remove(t.id); });
			break;
		case 'get_option':
			sendResponse({options:localStorage['msObj']});
			break;
		case 'newtip':
		if(!localStorage['version'] || localStorage['version'] != currentversion){
			var word = {text:""};
			chrome.browserAction.setBadgeText(word);
			count = 1;
			window.open("https://www.diigo.com/awe/new-for-awesome-screenshot.html?v="+currentversion);
			localStorage['version'] = currentversion;
			chrome.extension.sendRequest({action:'shownew'});

			}
			break;	
		
	}
});

// listen tab url change 
chrome.tabs.onUpdated.addListener(function(tabId, changeInfo, tab) { 
	if (changeInfo.url == 'chrome-extension://alelhddbbhepgpmgidjdcjakblofbmce/') {
		chrome.tabs.remove(tab.id);	
		// need store user info
		chrome.extension.sendRequest({name: 'loginByGoogle'});
	}	
});

// close then back
chrome.tabs.onRemoved.addListener(function(tid) {
	if (tabids[tid]) chrome.tabs.update(tabids[tid], {selected: true});
});

//** 3 capture modes
function captureVisible() {
	type = 'visible';
	//dataURL = '';
	getSelectedTab(captureVisibleTab);
	function captureVisibleTab() {
		chrome.tabs.captureVisibleTab(null, {format:'png'}, function(d) {
			dataURL.push(d);
			newTab();
		});
	}
}

function captureSelected() {
	type = 'selected';
	//dataURL = [];
	getSelectedTab(checkContentScript);
}

function captureEntire() {
	type = 'entire';
	//dataURL = [];
	getSelectedTab(checkContentScript);
}



function getSelectedTab(func) {
	chrome.tabs.getSelected(null, function(t) {
		tabid = t.id;
		taburl = t.url;
		tabtitle = t.title;
		
		if (func != null)
			func();
	});
}

function checkContentScript() {
	chrome.tabs.executeScript(tabid, {file: 'javascripts/isload.js'});
}

function saveAndScroll() {
	pushDataURL();
	sendRequest('tab', tabid, {action: 'scroll_next'});
}

function pushDataURL() {
	chrome.tabs.captureVisibleTab(null, {format:'png'}, function(d) {
		dataURL.push(d);
	});
}

function updateShortcutsRequest(id) {
	sendRequest('tab', id, 
		{action:'update_shortcuts', msObj:localStorage['msObj']}
	);
}

//** init 'edit.html'
function newTab() {
	console.log(dataURL instanceof String,dataURL);
	if (dataURL) {
		if (menuType=='selected') sendRequest('tab', tabid, {action:'destroy_selected'});
		chrome.tabs.create({'url':'edit.html'}, function(t){ 
			console.log(tabid+'+'+t.id);
			tabids[t.id] = tabid; //save for close back
			tabid = t.id; 
		});
	}
	else
		alert('Screen Capture Fail!!');
}

function sendRequest(where, to, req) { //to is a int (id)
	switch(where) {
		case 'tab':
			chrome.tabs.sendRequest(to, req);
			break;
		case 'popup':
			chrome.extension.sendRequest(req);
			break;
		//add other request type here, e.g request to other ext
	}
}



// if(!localStorage['promotion'] || localStorage['promotion']<2){
//  			 //window.open(chrome.extension.getURL('ad.html'));
//  			 window.open("https://www.diigo.com/awe/new-for-awesome-screenshot.html");
//  			localStorage['promotion'] =2;
//  			localStorage['version'] = currentversion;
// }
// if(!localStorage['version'] || localStorage['version'] != currentversion){
// chrome.browserAction.setBadgeText({text:"New"});
// }



