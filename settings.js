function saveOptions(e) {
  e.preventDefault();

  chrome.storage.sync.set({ 
  	ro: document.querySelector("#ro").value,
  	gov: document.querySelector("#gov").value,
  	suc: document.querySelector("#suc").value,
  });
}

function restoreOptions() {
  function setCurrentChoice(result) {
	document.querySelector("#ro").value = result.ro || "Supreme Overlord";
	document.querySelector("#gov").value = result.gov || "Maintain A";
	document.querySelector("#suc").value = result.suc || "Task Failed Successorly";
  }

  function onError(error) {
	console.error(`Oh nyo: ${error}`);
  }

  let getting = chrome.storage.sync.get();
  getting.then(setCurrentChoice, onError);

}

document.addEventListener("DOMContentLoaded", restoreOptions);
document.querySelector("form").addEventListener("submit", saveOptions);
