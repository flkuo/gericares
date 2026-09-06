// Shared site-search UI logic. Reads window.SEARCH_INDEX (from search-data.js)
// and window.SITE_ROOT (declared inline per-page before this script loads).

function siteSearchRun(query, resultsEl) {
  query = (query || "").trim().toLowerCase();
  resultsEl.innerHTML = "";
  if (!query) { resultsEl.classList.remove("show"); return; }
  const hits = (window.SEARCH_INDEX || []).filter(item => (item.title + " " + item.kw).toLowerCase().includes(query)).slice(0, 10);
  if (hits.length === 0) {
    resultsEl.innerHTML = '<div class="no-match">沒有符合「' + query.replace(/</g,"&lt;") + '」的結果</div>';
  } else {
    hits.forEach(h => {
      const a = document.createElement("a");
      a.href = (window.SITE_ROOT || "") + h.url;
      a.textContent = h.title;
      resultsEl.appendChild(a);
    });
  }
  resultsEl.classList.add("show");
}

function handleSiteSearch(ev, formEl) {
  ev.preventDefault();
  const input = formEl.querySelector("input[type=search]");
  const resultsEl = formEl.parentElement.querySelector(".search-results");
  const hits = (window.SEARCH_INDEX || []).filter(item => (item.title + " " + item.kw).toLowerCase().includes(input.value.trim().toLowerCase()));
  if (hits.length > 0) { window.location.href = (window.SITE_ROOT || "") + hits[0].url; }
  else { siteSearchRun(input.value, resultsEl); }
  return false;
}

function handleSiteSearchInput(ev, inputEl) {
  const resultsEl = inputEl.closest(".search-wrap").querySelector(".search-results");
  siteSearchRun(inputEl.value, resultsEl);
}

document.addEventListener("click", function (e) {
  document.querySelectorAll(".search-results.show").forEach(el => {
    if (!el.parentElement.contains(e.target)) el.classList.remove("show");
  });
});
