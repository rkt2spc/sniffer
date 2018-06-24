if (!XMLHttpRequest.prototype.open.patched) {
  var originalOpen = XMLHttpRequest.prototype.open;
  XMLHttpRequest.prototype.open = function() {

    originalOpen.apply(this, arguments);
  };
  XMLHttpRequest.prototype.open.patched = true;
}

