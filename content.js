document.addEventListener('keyup', function (event) { // keyup may seem less intuitive but it's already the standard in breeze-like scripts and it prevents holding down a key spamming the server
	if (event.shiftKey || event.ctrlKey || event.altKey || document.activeElement.tagName == 'INPUT' || document.activeElement.tagName == 'TEXTAREA') { // locks you out of the script while you're holding down a modifier key or typing in an input
		return;
	} else {
		switch (event.code) { // event.code is the key that was pressed
			case 'KeyA': // reload page
				window.location.reload();
				break;
			case 'KeyT': // CUSTOM: Set template-overall to none
				if (window.location.href.includes("template-overall=none")) {
					window.location.reload();
				} else { 
					window.location.href = window.location.href + "/template-overall=none";
				}
				break;
			case 'KeyQ': // go back
				window.history.back();
				break;
			case 'KeyG': // check if you updated
				window.location.assign("https://www.nationstates.net/page=reports/view=self/filter=change/template-overall=none");
				break;
			case 'KeyS': // endorse nation - NOT toggle endorsement! Together with my tampermonkey DidIEndo.js script, this should make endo confusion a thing of the past.
				if (window.location.href.includes("nation=")) {
					if (document.getElementsByClassName("endorse button icon wa danger").length == 0) { //Is the button to endorse, or does it have the unendo warning? If the latter, skip. Otherwise, endo
						document.getElementsByClassName('endorse button icon wa')[0].click();
					}
				}
				break;
			case 'KeyL': // It's rare we need to explicitly unendo, I'm okay with putting it on the other side of the keyboard
				if (window.location.href.includes("nation=")) {
					document.getElementsByClassName('endorse button icon wa danger')[0].click(); //NOT endorse, ONLY unendorse has the danger modifier
				}
				break;
			case 'KeyO': // ban nation
				if (window.location.href.includes("nation=")) {
					document.getElementsByName('ban')[0].click();
				}
				break;
			case 'KeyK': // eject nation
				if (window.location.href.includes("nation=")) {
					document.getElementsByName('eject')[0].click();
				}
				break;
			case 'KeyR': // confirm wa join
				if (window.location.href.includes("page=join_WA")) {
					var NationURL = document.getElementsByTagName("form")[1].getElementsByClassName("nlink")[0].href;
					navigator.clipboard.writeText(NationURL);
					document.getElementsByClassName('button primary icon approve big')[0].click();
				}
				break;
			case 'KeyF': // move to region whose page you're currently on
				// From Notaname
                if (window.location.href.includes("region=")) {
                    if (document.getElementsByName('move_region').length == 0) window.location.reload();
                    else document.getElementsByName('move_region')[0].click();
                } else if (window.location.href.includes("change_region")) {
                    document.getElementsByClassName('rlink')[0].click();
                }
                break;

				/*
				if (window.location.href.includes("region=")) {
					document.getElementsByName('move_region')[0].click();
				}
				break;
				*/
			case 'KeyB': // move to suspicious
				if (window.location.href == "https://www.nationstates.net/region=suspicious") {
					document.getElementsByName('move_region')[0].click();
				} else {
					window.location.assign("https://www.nationstates.net/region=suspicious");
				}
				break;
			case 'KeyE': // resign from WA, courtesy of NotAName
				if (window.location.href.includes("https://www.nationstates.net/page=un")) {
					if (document.getElementsByTagName("form")[1].getElementsByTagName("button")[0].textContent.includes("Apply to Join")) { 
						document.getElementsByTagName("form")[1].getElementsByTagName("button")[0].click() // Apply to join
					} else {  // Nota's absolutely villainous, devious trick
						var chk = document.getElementsByName('chk')[0].value;
						window.location.assign(`https://www.nationstates.net/page=UN_status?action=leave_un&submit=1&chk=${chk}`);
					}
				} else {
					window.location.assign("https://www.nationstates.net/page=un");
				}
				break;
			case 'KeyZ': // go to current region page
				// document.getElementById("panelregionbar").children[0].href 
				if (window.location.href == "https://www.nationstates.net/page=change_region") { // if on post-relocation page
					document.getElementsByClassName('info')[0].getElementsByClassName('rlink')[0].click(); // click the region link on the relocation page
				} else { // otherwise just click the region link through the sidebar
//					document.getElementById('panelregionbar').querySelector('a').click();
					window.location.href = document.getElementById("panelregionbar").children[0].href 
				}
				break;
			case 'KeyX': // Copy the current nation to the clipboard
				// If we are looking at the WA application page, grab the link from the application we're looking at instead of our current nation
				// I've had issues where I hit X too quickly and it gives me the puppet I just switched off of - this should fix that.
				
				//Safety net, since I can't test WA right now - make sure we have a second form to query.
				if (window.location.href.includes("https://www.nationstates.net/page=join_WA?nation=") && document.getElementsByTagName("form").length > 1) { 
					// First form is login banner - second form is application. Isolate the nation link and copy to clipboard. 
					var NationURL = document.getElementsByTagName("form")[1].getElementsByClassName("nlink")[0].href; 
				} else { 
					var NationLink = document.getElementsByClassName("bellink quietlink");
					var NationURL = NationLink[0].href;
				}
				navigator.clipboard.writeText(NationURL);
				break;
			case 'KeyD': // appoint yourself as and/or deappoint ROs
				// TODO: automatic round-robin RO dismissal options
				// This should be done AFTER the automatic appointing

//				var current_nation = document.getElementById("loggedin").getAttribute("data-nname");
				var current_nation = document.body.dataset.nname;
				
				// Assume user is logged in, but in template=none mode following a refresh/relocation
				// In this case, go to the region control panel anyway.
				if (!current_nation) { 
					window.location.assign("https://www.nationstates.net/page=region_control");
				}
				
				// If on the regional control page, open own regional officer page
				else if (window.location.href == "https://www.nationstates.net/page=region_control") {
					window.location.assign("https://www.nationstates.net/page=regional_officer/nation=" + current_nation);
				}
				// If on on own regional officer page, assign officer role
				else if (window.location.href == "https://www.nationstates.net/page=regional_officer/nation=" + current_nation) {
					// TODO: This is where custom naming comes in
					document.getElementsByName("office_name")[0].value = "Supreme Overlord";
					document.getElementsByName("authority_A")[0].checked = true;
					document.getElementsByName("authority_C")[0].checked = true;
					document.getElementsByName("authority_E")[0].checked = true;
					document.getElementsByName("authority_P")[0].checked = true;
//					window.alert(document.getElementsByName("office_name")[0].value);
					document.getElementsByName('editofficer')[0].click();
				}
				// If on someone else's regional officer page, dismiss them (or strip permissions if successor)
				else if (window.location.href.includes("regional_officer")) {
					if(document.getElementsByName("authority_S")[0].checked) { // If has succession authority, remove all other permissions, since successors cannot be removed by exec WA. Thanks Nota!
						document.getElementsByName("authority_A")[0].checked = false;
						document.getElementsByName("authority_B")[0].checked = false;
						document.getElementsByName("authority_C")[0].checked = false;
						document.getElementsByName("authority_E")[0].checked = false;
						document.getElementsByName("authority_P")[0].checked = false;
						document.getElementsByName('editofficer')[0].click();						
					} else { 
						document.getElementsByName('abolishofficer')[0].click();
					}
				}
				// If on none of these pages, open regional control page
				else {
					window.location.assign("https://www.nationstates.net/page=region_control");
				}
				break;
		} // end switch
	} // end else
}); // end event listener
