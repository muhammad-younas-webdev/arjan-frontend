// privacy
function initCustomTabs(container) {
  const tablist = container.querySelector(".tabs-nav-wrapper");
  // Look for your custom role "tablet"
  const tabs = Array.from(tablist.querySelectorAll("[role='tablet']"));
  const panels = Array.from(container.querySelectorAll("[role='tabpanel']"));

  function activateTab(clickedTab) {
    const targetPanelID = clickedTab.getAttribute("aria-controls");
    const targetPanel = container.querySelector(`#${targetPanelID}`);

    tabs.forEach((tab) => {
      tab.setAttribute("aria-selected", "false");
      tab.setAttribute("tabindex", "-1");
    });

    panels.forEach((panel) => {
      panel.removeAttribute("tabindex");
    });

    clickedTab.setAttribute("aria-selected", "true");
    clickedTab.removeAttribute("tabindex");

    if (targetPanel) {
      targetPanel.setAttribute("tabindex", "0");
    }
  }

  function handleClick(e) {
    // FIX: Changed selector from [role="tab"] to [role="tablet"]
    const clickedTab = e.target.closest('[role="tablet"]');

    if (clickedTab && tablist.contains(clickedTab)) {
      activateTab(clickedTab);
    }
  }

  tablist.addEventListener("click", handleClick);
}

const tabContainers2 = document.querySelectorAll(".custom-tabs-container");
tabContainers2.forEach(initCustomTabs);
