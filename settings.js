function saveOptions(e) {
  e.preventDefault();
  if (document.querySelector("#mainnation").value == "") { 
	alert("main nation is a required parameter");
	return;
  }

  browser.storage.sync.set({ 
	main_nation: document.querySelector("#mainnation").value,
  	ro: document.querySelector("#ro").value,
  	gov: document.querySelector("#gov").value,
  	suc: document.querySelector("#suc").value,
  	jp: document.querySelector("#jp").value.toLowerCase().replace(/ /gi,"_"), //Set region, all lowercase, underscores instead of spaces
  });
}

function restoreOptions() {
  function setCurrentChoice(result) {
	document.querySelector("#mainnation").value = result.main_nation || "";
	document.querySelector("#ro").value = result.ro || "Supreme Overlord";
	document.querySelector("#gov").value = result.gov || "Maintain A";
	document.querySelector("#suc").value = result.suc || "Task Failed Successorly";
	document.querySelector("#jp").value = result.jp || "suspicious";
  }

  function onError(error) {
	console.error(`Oh nyo: ${error}`);
  }

  let getting = browser.storage.sync.get();
  getting.then(setCurrentChoice, onError);

}

document.addEventListener("DOMContentLoaded", restoreOptions);
document.querySelector("form").addEventListener("submit", saveOptions);
