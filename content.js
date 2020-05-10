function CountCSS(){
    let totalCss = document.querySelectorAll('style').length;
    
    let nodeList = document.querySelectorAll('link');    
  
    for (let i = 0; i < nodeList.length; i++) {
  
      const element = nodeList[i];
  
      if(element.rel == "stylesheet"){
        
        totalCss++;
      }      
      
    }

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

function GetJSContent(){

  let nodeList = document.querySelectorAll('script');
  let jsList = [];

  for (let i = 0; i < nodeList.length; i++) {
    const element = nodeList[i];

    jsList.push(element.src.trim());
    
  }

  return jsList;
}

function GetCSSContent(){

  let nodeList = document.querySelectorAll('link');
  let cssList = [];

  for (let i = 0; i < nodeList.length; i++) {

    const element = nodeList[i];

    if(element.rel == "stylesheet"){

      cssList.push(element.href);
    }
    
    
  }

  return cssList;
}

function CountOnclickEvents(){

  let ocCount = document.querySelectorAll('[onclick]').length;

  return ocCount;
}

function GetformsInfo(){

  let nodeList = document.querySelectorAll('form');
  let formInfoList = [];
  let formInfo = '';

  for (let i = 0; i < nodeList.length; i++) {

    const element = nodeList[i];  
    
    formInfo = formInfo.concat('Form ID: ', element.id, ' | Action: ', element.action,
                    ' | Method: ', element.method, ' | Autocomplete: ', element.autocomplete);

    formInfoList.push(formInfo);
  }

  return formInfoList;

}

function GetSizeOfPage(){

  let htmlLength = document.getElementsByTagName('HTML')[0].outerHTML.length;

  let size = Math.ceil(htmlLength / 1024) + " KB";

  return size;
}

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
        jsContent: GetJSContent(),
        cssContent: GetCSSContent(),
        totalOnClick: CountOnclickEvents(),
        formInfo: GetformsInfo(),
        pageSize: GetSizeOfPage(),
      };

      response(expose);
    }
  });