function setUlElements(array){
  var list = document.createElement('dl');

  for (var i = 0; i < array.length; i++) {
      
      var item = document.createElement('dt');      
      
        item.appendChild(document.createTextNode(array[i]));

      list.appendChild(item);
  }

  return list;
}

// Update the relevant fields with the new data.
const setDOMInfo = info => {
  document.getElementById('totalCss').textContent = info.totalCss;
  document.getElementById('totalJs').textContent = info.totalJs;
  document.getElementById('totalHtml').textContent = info.totalHtml;
  document.getElementById('totalMeta').textContent = info.totalMeta;
  document.getElementById('totalForms').textContent = info.totalForms;  
  document.getElementById('jsContent').appendChild(setUlElements(info.jsContent));
  document.getElementById('cssContent').appendChild(setUlElements(info.cssContent));
  document.getElementById('totalOnClick').textContent = info.totalOnClick;
  document.getElementById('formInfo').appendChild(setUlElements(info.formInfo));
  document.getElementById('pageSize').textContent = info.pageSize;
  
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