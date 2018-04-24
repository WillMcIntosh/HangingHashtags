window.addEventListener("load", function() {
  // store all folder tabs as array
  const folderTabs = document.getElementById("folder-tabs").querySelectorAll("ul.nav-tabs > li");

  function tabClicked(event) {
    event.preventDefault(); // prevent URL from changing

    // remove active class from all tabs
    for (tab of folderTabs) {
      tab.classList.remove("active");
    }

    // give clicked tab the active class
    const clickedTab = event.currentTarget;
    clickedTab.classList.add("active");

    // store all contents in array
    const folderContents = document.getElementById("folder-content").querySelectorAll(".tab-pane");

    // remove active class from all contents
    for (content of folderContents) {
      content.classList.remove("active");
    }

    // add active class to folder corresponding to tab
    const activeFolderId = clickedTab.querySelector("a").getAttribute("href");
    const activeFolder = document.querySelector(activeFolderId);

    activeFolder.classList.add("active");
  }

  for (tab of folderTabs) {
    tab.addEventListener("click", tabClicked);
  }
});
