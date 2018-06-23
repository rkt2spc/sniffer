var browser = browser || chrome;
var extensionID = browser.runtime.id;
var ingestURL = 'http://localhost:8080/records'

function isOwnRequest(request) {
  if (request.initiator && request.initiator.includes(extensionID)) return true;
  if (request.url && request.url.includes(ingestURL)) return true;
  return false;
}

function sendHTTPRequest(method, url, headers, data) {
  const xhr = new XMLHttpRequest();
  xhr.open(method, url, true);

  for (var key in headers) {
    if (headers.hasOwnProperty(key)) xhr.setRequestHeader(key, headers[key]);
  }

  xhr.send(data);
}

const store = {};

browser.webRequest.onBeforeRequest.addListener((request) => {
  if (isOwnRequest(request)) return;

  const storedRequest = store[request.requestId];
  if (!storedRequest) store[request.requestId] = request;
  else Object.assign(storedRequest, request);

}, { urls: ['<all_urls>'] }, ['requestBody']);

browser.webRequest.onSendHeaders.addListener((request) => {
  if (isOwnRequest(request)) return;

  const storedRequest = store[request.requestId];
  if (!storedRequest) store[request.requestId] = request;
  else Object.assign(storedRequest, request);

}, { urls: ['<all_urls>'] }, ['requestHeaders']);

browser.webRequest.onCompleted.addListener((request) => {
  if (isOwnRequest(request)) return;

  const storedRequest = store[request.requestId];
  if (!storedRequest) store[request.requestId] = request;
  else Object.assign(storedRequest, request);

  sendHTTPRequest('POST', ingestURL, { 'Content-Type': 'application/json' }, JSON.stringify(storedRequest));
  delete store[request.requestId];
}, { urls: ['<all_urls>'] }, ['responseHeaders']);


