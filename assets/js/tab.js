function initTabs(container) {
  const tablist = container.querySelector("[role='tablist']");
  const tabs = Array.from(tablist.querySelectorAll("[role='tab']"));
  const loadMoreBtn = container.querySelector(".btn-skin");
  const CARDS_PER_LOAD = 3;

  // 1. Setup CSS once
  if (!document.getElementById("tab-card-style")) {
    const style = document.createElement("style");
    style.id = "tab-card-style";
    style.textContent = `.tab-single-card.hidden-card { display: none !important; }`;
    document.head.appendChild(style);
  }

  // 2. Helper: Update visibility and Button state
  function updateTabDisplay(tabpanelID, isReset = false) {
    const panel = document.getElementById(tabpanelID);
    const cards = Array.from(panel.querySelectorAll(".tab-single-card"));

    // Get or set current count
    let visibleCount = isReset ? 0 : parseInt(panel.dataset.visibleCount || 0);
    const totalCount = cards.length;

    // Calculate new target count
    const targetCount = isReset
      ? Math.min(CARDS_PER_LOAD, totalCount)
      : Math.min(visibleCount + CARDS_PER_LOAD, totalCount);

    // Toggle classes
    cards.forEach((card, index) => {
      card.classList.toggle("hidden-card", index >= targetCount);
    });

    // Save state back to the DOM element
    panel.dataset.visibleCount = targetCount;

    // Update Button UI
    const isFinished = targetCount >= totalCount;
    loadMoreBtn.disabled = isFinished;
    loadMoreBtn.style.opacity = isFinished ? "0.5" : "1";
    loadMoreBtn.style.cursor = isFinished ? "not-allowed" : "pointer";
    loadMoreBtn.setAttribute("aria-disabled", isFinished);
    loadMoreBtn.title = isFinished ? "تم عرض جميع المشاريع" : "";
  }

  // 3. Tab Switching Logic
  function activateTab(selectedTab) {
    const targetID = selectedTab.getAttribute("aria-controls");

    tabs.forEach((tab) => {
      const isSelected = tab === selectedTab;
      const panelID = tab.getAttribute("aria-controls");
      const panel = document.getElementById(panelID);

      // Update ARIA states
      tab.setAttribute("aria-selected", isSelected);
      tab.setAttribute("tabindex", isSelected ? "0" : "-1");

      // Toggle panel visibility (optional, usually handled by CSS but good for logic)
      panel.hidden = !isSelected;
      if (isSelected) panel.setAttribute("tabindex", "0");
    });

    // Reset card count for the newly opened tab
    updateTabDisplay(targetID, true);
  }

  // 4. Initialize
  function init() {
    // Hide all cards initially
    container
      .querySelectorAll(".tab-single-card")
      .forEach((c) => c.classList.add("hidden-card"));

    // Tab Clicks
    tablist.addEventListener("click", (e) => {
      const tab = e.target.closest('[role="tab"]');
      if (tab) activateTab(tab);
    });

    // Load More Click
    loadMoreBtn.addEventListener("click", (e) => {
      if (loadMoreBtn.disabled) return;
      const activeTab = tablist.querySelector('[aria-selected="true"]');
      if (activeTab) updateTabDisplay(activeTab.getAttribute("aria-controls"));
    });

    // Set first tab active
    const firstTab = tabs[0];
    if (firstTab) activateTab(firstTab);
  }

  init();
}

// Global Init
document.querySelectorAll(".tabs").forEach(initTabs);
