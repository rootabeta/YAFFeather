// Defaults in case the settings don't load fast enough
// This is especially important for fast switchers
// I *could* solve this with an await, but that introduces unpredictable lag
// Since the only people who will run into these are the fast switchers, 
// That lag is unacceptable. Better to run the risk of a race condition.
let rotitle = "Supreme Overlord";
let suctitle = "Task Failed Successorly";
let govtitle = "Maintain A";

function loadSettings(settings) { 
	console.log("Loaded settings");
	rotitle = rotitle || "Supreme Overlord";
	suctitle = suctitle || "Task Failed Successorly";
	govtitle = govtitle || "Maintain A";
	if (settings.ro) { 
		rotitle = settings.ro
	}

	if (settings.gov) { 
		govtitle = settings.gov
	}

	if (settings.gov) { 
		suctitle = settings.suc
	}
}

function settingsFailed(error) { 
	console.error("YAFFeather: Failed to load settings");
	console.error(error);

	rotitle = rotitle || "Supreme Overlord";
	suctitle = suctitle || "Task Failed Successorly";
	govtitle = govtitle || "Maintain A";
}

const getting = browser.storage.sync.get();
getting.then(loadSettings, settingsFailed);

document.addEventListener('keyup', function (event) { // keyup may seem less intuitive but it's already the standard in breeze-like scripts and it prevents holding down a key spamming the server
	if (event.shiftKey || event.ctrlKey || event.altKey || document.activeElement.tagName == 'INPUT' || document.activeElement.tagName == 'TEXTAREA') { // locks you out of the script while you're holding down a modifier key or typing in an input
		return;
	} else {
		// Wait a second, this is inside an event listener... this is async already! We can just await it!
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
//					var WA_accepted = NationURL; // Experimental prototype to preserve current_nation across pages
					navigator.clipboard.writeText(NationURL);
					document.getElementsByClassName('button primary icon approve big')[0].click();
				}
				break;
			case 'KeyF': // move to region whose page you're currently on
				/*
				// From Notaname
                if (window.location.href.includes("region=")) {
                    if (document.getElementsByName('move_region').length == 0) window.location.reload();
                    else document.getElementsByName('move_region')[0].click();
                } else if (window.location.href.includes("change_region")) {
                    document.getElementsByClassName('rlink')[0].click();
                }
                break;
				*/
				
				if (window.location.href.includes("region=")) {
					document.getElementsByName('move_region')[0].click();
				}
				break;
			case 'KeyB': // move to suspicious
				if (window.location.href == "https://www.nationstates.net/region=suspicious") {
					document.getElementsByName('move_region')[0].click();
				} else {
					window.location.assign("https://www.nationstates.net/region=suspicious");
				}
				break;
			case 'KeyE': // resign from WA, courtesy of NotAName
				// https://www.nationstates.net/page=un/template-overall=none
				if (window.location.href.includes("https://www.nationstates.net/page=un")) {
	
					// Not template=none
					// Button reads "Apply to Join"
					if (!window.location.href.includes("template-overall=none") 
					&& document.getElementsByTagName("form")[1].getElementsByTagName("button")[0].textContent.includes("Apply to Join")) { 

						document.getElementsByTagName("form")[1].getElementsByTagName("button")[0].click() // Apply to join
						 
					// Template=none
					// Button reads "Apply to Join"
					} else if (window.location.href.includes("template-overall=none")
						&& document.getElementsByTagName("form")[0].getElementsByTagName("button")[0].textContent.includes("Apply to Join")) { 

						document.getElementsByTagName("form")[0].getElementsByTagName("button")[0].click() // Apply to join
						
					// If we are here, neither in nor out of template=none does the button read "Apply to Join"
					// Ergo, we must RESIGN
					} else {  // Nota's absolutely villainous, devious trick
						var chk = document.getElementsByName('chk')[0].value;
						//window.location.assign(`https://www.nationstates.net/page=UN_status?action=leave_un&submit=1&chk=${chk}`);
						window.location.href = `https://www.nationstates.net/page=UN_status?action=leave_un&submit=1&chk=${chk}`;
					}
				} else {
					//window.location.assign("https://www.nationstates.net/page=un");
					window.location.href = "https://www.nationstates.net/page=un/template-overall=none";
				}
				break;
			case 'KeyZ': // go to current region page
				// document.getElementById("panelregionbar").children[0].href 
				// Attempted bugfix
				if (window.location.href.includes("/page=change_region")) { // if on post-relocation page
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
//				var current_nation = document.getElementById("loggedin").getAttribute("data-nname");
				var current_nation = document.body.dataset.nname;
				
				// Assume user is logged in, but in template=none mode following a refresh/relocation
				// In this case, go to the region control panel anyway.
				//window.location.assign("https://www.nationstates.net/page=reports/view=self/filter=change/template-overall=none");
				if (!current_nation) { 
					if (window.location.href.includes("/page=reports/view=self/filter=change/template-overall=none")) { 
						// If on the dossier page, we can get our user from that
						current_nation = document.getElementsByTagName("h1")[0].outerText.toLowerCase().replace(/ /gi,"_").split("'")[0];
						window.location.assign("https://www.nationstates.net/page=regional_officer/nation=" + current_nation);
					} else { 
						window.location.assign("https://www.nationstates.net/page=region_control");
					}
				}
				
				// If on the regional control page, open own regional officer page
				// TODO: Check if RO, then de-RO everyone else in rapid order until all is done
				else if (window.location.href.includes("https://www.nationstates.net/page=region_control")) {
					// document.getElementById("rcontrol_officers").tBodies[0].rows[i].children[4].children[0].children[0].href 
					var encounteredSelf = false;
					var other_ros = [];
					// Skip first
					for (i = 1; i < document.getElementById("rcontrol_officers").tBodies[0].rows.length ; i++) { 
						// Check if we are an RO, and build up a list of all non-us ROs who are not the delegate or governor
						if (document.getElementById("rcontrol_officers").tBodies[0].rows[i].children.length == 5) { 
							// Is the RO we're looking at
							// Us
							// Not the Governor
							// Not the Delegate
							// If so, we are an RO, and can move to phase 2.
							// If not, appointing ourselves is priority 1
							if (
								 document.getElementById("rcontrol_officers").tBodies[0].rows[i].children[4].firstChild.firstChild.href.includes(current_nation)  
							 && !document.getElementById("rcontrol_officers").tBodies[0].rows[i].children[4].firstChild.firstChild.href.includes("office=governor")
							 && !document.getElementById("rcontrol_officers").tBodies[0].rows[i].children[4].firstChild.firstChild.href.includes("office=delegate")
							) { 
								encounteredSelf = true;
							}

							// Is the RO we're looking at
							// Not the Governor
							// Not the Delegate
							// Not us
							if (
							    !document.getElementById("rcontrol_officers").tBodies[0].rows[i].children[4].firstChild.firstChild.href.includes("office=governor") 
							 && !document.getElementById("rcontrol_officers").tBodies[0].rows[i].children[4].firstChild.firstChild.href.includes("office=delegate")
							 && !document.getElementById("rcontrol_officers").tBodies[0].rows[i].children[4].firstChild.firstChild.href.includes(current_nation)  
							) { 

								// Better solution - Check for our nation inside of the appointment text
								if (!document.getElementById("rcontrol_officers").tBodies[0].rows[i].children[2].innerHTML.includes(current_nation)) {
									other_ros.push(document.getElementById("rcontrol_officers").tBodies[0].rows[i].children[4].firstChild.firstChild.href);
								}
							}
						}

					}

					// We ARE appointed! Clear to ruin other ROs
					if(encounteredSelf) { 
						console.log("Found self");
						// Another RO exists that we can mess with! Rename/dismiss them
						if (other_ros.length > 0) { 
							console.log(`Dismissing ${other_ros[0]}`);
							window.location.assign("https://www.nationstates.net/page=regional_officer/nation=" + other_ros[0]);
						// No other ROs exist, let's rename the governor!
						} else { 
							console.log("Renaming governor");
							window.location.assign("https://www.nationstates.net/page=regional_officer/office=governor");
						}
					} else { 
						console.log("Missing self");
						// Just in case
						if (!current_nation) { 
							current_nation = document.body.dataset.nname;
						}
						window.location.assign("https://www.nationstates.net/page=regional_officer/nation=" + current_nation);
					}

				}
				// If on governor's page, rename 
				else if (window.location.href.includes("office=governor")) { 
					// TODO: Custom governor name
					document.getElementsByName("office_name")[0].value = govtitle; //"Catgirl :3";
					document.getElementsByName('editofficer')[0].click();
				}
				// If on on own regional officer page, assign officer role
				else if (window.location.href.includes(current_nation) && window.location.href.includes("page=regional_officer")) {
					// TODO: Custom RO name
					document.getElementsByName("office_name")[0].value = rotitle; // "Supreme Overlord";
					document.getElementsByName("authority_A")[0].checked = true;
					document.getElementsByName("authority_C")[0].checked = true;
					document.getElementsByName("authority_E")[0].checked = true;
					document.getElementsByName("authority_P")[0].checked = true;
//					window.alert(document.getElementsByName("office_name")[0].value);
					document.getElementsByName('editofficer')[0].click();
				}
				// If on someone else's regional officer page, dismiss them (or strip permissions if successor)
				else if (window.location.href.includes("regional_officer")) {
					// If has succession authority, remove all other permissions, since successors cannot be removed by exec WA. Thanks Nota!
					if(document.getElementsByName("authority_S")[0].checked) { 
						// TODO: Custom successor name
						document.getElementsByName("office_name")[0].value = suctitle; // "Nya~";
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
					// Go directly to CURRENT RO page
					window.location.assign("https://www.nationstates.net/page=regional_officer/nation=" + current_nation);
					//window.location.assign("https://www.nationstates.net/page=region_control");
				}
				break;
		} // end switch
	} // end else
}); // end event listener
