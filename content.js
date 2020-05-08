//TODO
/*
  int countCSS = expose.CountCSSAsync(); OK
  int countJS = expose.CountJSAsync(); OK
  int countHtmlElements = CountHtmlElementsAsync(); OK
  int countMetaTags = expose.CountMetaAsync(); OK
  HashSet<string> hsJS = expose.GetJSContentAsync();
  HashSet<String> hsCSS =  expose.GetCSSContentAsync();
  int countOnclickEvents = expose.CountOnclickEventsAsync();
  int countForms = expose.CountFormsAsync(); OK
  Dictionary<string,string> dicFormInfo = expose.FormsInfoAsync();
  long? pageSize = expose.GetSizeOfPageAsync();
  string report = expose.GetReportAsync();
  bool hasAjaxCall = expose.HasAjaxCallAsync();
*/
let head = document.getElementsByTagName('head');
let body = document.getElementsByTagName('body');


function CountCSS(){
    let totalCss = document.querySelectorAll('style').length; 

  return totalCss;
  
}

function CountJS(){
    let totalJs = document.querySelectorAll('script').length; 
    
      return totalJs;
}

function CountHtmlElements(){
    let countHtml = document.querySelectorAll('*').length;
    
    return countHtml;
}

function CountMetaElements(){
  let countMeta = document.querySelectorAll('meta').length;

  return countMeta;

}

function CountFormsElements(){
  let countForms = document.querySelectorAll('form').length;

  return countForms;
}

//console.log('HTML -> '+CountHtmlElements());

chrome.runtime.sendMessage({
    from: 'content',
    subject: 'showPageAction',
  });
  
  
  chrome.runtime.onMessage.addListener((msg, sender, response) => {
    
    if ((msg.from === 'popup') && (msg.subject === 'DOMInfo')) {     

      var expose = {
        totalCss: CountCSS(),
        totalJs: CountJS(),
        totalHtml: CountHtmlElements(),
        totalMeta: CountMetaElements(),
        totalForms: CountFormsElements(),
      };

      response(expose);
    }
  });