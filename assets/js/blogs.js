function setupTabs(wrapper) {
  const tablist = wrapper.querySelector("[data-role='tablist']");
  const tabs = Array.from(tablist.querySelectorAll("[data-role='tab']"));

  function selectTab(tab) {
    const panelID = tab.getAttribute("data-controls");
    const panel = document.getElementById(panelID);

    tab.setAttribute("aria-selected", "true");
    tab.removeAttribute("tabindex");
    panel.setAttribute("tabindex", "0");

    document
      .querySelectorAll('[data-role="tab"], [data-role="panel"]')
      .forEach((el) => {
        if (el !== tab && el !== panel) {
          if (el.matches('[data-role="tab"]')) {
            el.setAttribute("aria-selected", "false");
            el.setAttribute("tabindex", "-1");
          } else {
            el.removeAttribute("tabindex");
          }
        }
      });
  }

  function handleClick(e) {
    const { target } = e;
    if (target.matches('[data-role="tab"]')) {
      selectTab(target);
    }
  }

  tablist.addEventListener("click", handleClick);
}

const tabWrappers = document.querySelectorAll(".navigation-tabs");
tabWrappers.forEach(setupTabs);
