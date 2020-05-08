// Update the relevant fields with the new data.
const setDOMInfo = info => {
  document.getElementById('totalCss').textContent = info.totalCss;
  document.getElementById('totalJs').textContent = info.totalJs;
  document.getElementById('totalHtml').textContent = info.totalHtml;
  document.getElementById('totalMeta').textContent = info.totalMeta;
  document.getElementById('totalForms').textContent = info.totalForms;
  //document.getElementById('totalHtml').textContent = info.totalHtml;
  //document.getElementById('totalHtml').textContent = info.totalHtml;
  //document.getElementById('totalHtml').textContent = info.totalHtml;
};

// Once the DOM is ready...
window.addEventListener('DOMContentLoaded', () => {
  // ...query for the active tab...
  chrome.tabs.query({
    active: true,
    currentWindow: true
  }, tabs => {
    // ...and send a request for the DOM info...
    chrome.tabs.sendMessage(
        tabs[0].id,
        {from: 'popup', subject: 'DOMInfo'},
        // ...also specifying a callback to be called 
        //    from the receiving end (content script).
        setDOMInfo);
  });
});