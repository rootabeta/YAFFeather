function saveOptions(e) {
  e.preventDefault();

  ros = document.querySelector("#ros").value.split(',');
  //Default
  if(ros.length == 0 || ros[0] == "") { 
    ros = ["Supreme Overlord"]
  }

  randcase = document.querySelector("#randcase").checked;
  randbefore = document.querySelector("#randbefore").checked;
  randafter = document.querySelector("#randafter").checked;
  randspace = document.querySelector("#randspace").checked;
  randro = document.querySelector("#randro").checked;

//  window.alert(ros);
//  window.alert(randro);

  browser.storage.sync.set({
	  "ros":ros,
	  "randcase":randcase,
	  "randbefore":randbefore,
	  "randafter":randafter,
	  "randspace":randspace,
	  "randro":randro
  });
}

function restoreOptions() {
  function setCurrentChoice(result) {
    document.querySelector("#ros").value = result.ros;
	document.querySelector("#randcase").checked = result.randcase;
	document.querySelector("#randbefore").checked = result.randbefore;
	document.querySelector("#randafter").checked = result.randafter;
	document.querySelector("#randspace").checked = result.randspace;
	document.querySelector("#randro").checked = result.randro;
  }

  function onError(error) {
    console.log(`Error: ${error}`);
  }

  let getting = browser.storage.sync.get();
  getting.then(setCurrentChoice, onError);

}

document.addEventListener("DOMContentLoaded", restoreOptions);
document.querySelector("form").addEventListener("submit", saveOptions);
