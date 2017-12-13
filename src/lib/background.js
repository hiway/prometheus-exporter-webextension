browser.tabs.onActivated.addListener(() => {
  var gettingTabs = browser.tabs.query({});
  gettingTabs.then((tabs) => {
    refresh_metrics(tabs);
  });
});

function refresh_metrics(tabs) {
  let tabs_metric = `browser_tabs_open_total ${tabs.length}\n`;
  let headers = new Headers({
    'Content-Type': 'application/x-www-form-urlencoded'
  });
  let url = 'http://127.0.0.1:9091/metrics/job/firefox_open_tabs';
  let payload = {
    method: 'POST',
    headers: headers,
    body: tabs_metric
  };
  let request = new Request(url, payload);
  fetch(request);
}

