
// toFix四舍五入不准确问题
if (!Number.prototype._toFixed) {
  Number.prototype._toFixed = Number.prototype.toFixed
}
Number.prototype.toFixed = function (n) {
  return (this + 1e-14)._toFixed(n)
}

if (window.NodeList && !NodeList.prototype.forEach) {
  NodeList.prototype.forEach = function (callback, thisArg) {
    thisArg = thisArg || window
    for (var i = 0; i < this.length; i++) {
      callback.call(thisArg, this[i], i, this)
    }
  }
}
