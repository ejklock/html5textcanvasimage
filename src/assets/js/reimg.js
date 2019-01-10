"use strict";
var _typeof =
  "function" == typeof Symbol && "symbol" == typeof Symbol.iterator
    ? function(b) {
        return typeof b;
      }
    : function(b) {
        return b &&
          "function" == typeof Symbol &&
          b.constructor === Symbol &&
          b !== Symbol.prototype
          ? "symbol"
          : typeof b;
      };
(ReImg = {
  OutputProcessor: function OutputProcessor(b, c) {
    var d = function() {
        return 0 === b.indexOf("data:image/png");
      },
      e = function(f, g) {
        var h = document.createElement("a");
        (h.href = f), (h.download = g), document.body.appendChild(h), h.click();
      };
    return {
      toBase64: function toBase64() {
        return b;
      },
      toImg: function toImg() {
        var f = document.createElement("img");
        return (f.src = b), f;
      },
      toCanvas: function toCanvas(f) {
        var g = document.createElement("canvas"),
          h = c.getBoundingClientRect();
        (g.width = h.width), (g.height = h.height);
        var i = g.getContext("2d"),
          j = this.toImg();
        j.onload = function() {
          i.drawImage(j, 0, 0), f(g);
        };
      },
      toPng: function toPng() {
        if (d()) {
          var f = document.createElement("img");
          return (f.src = b), f;
        }
        this.toCanvas(function(g) {
          var h = document.createElement("img");
          return (h.src = g.toDataURL()), h;
        });
      },
      toJpeg: function toJpeg(f) {
        (f = f || 1),
          (function(g) {
            this.toCanvas(function(h) {
              var i = document.createElement("img");
              return (i.src = h.toDataURL("image/jpeg", g)), i;
            });
          })(f);
      },
      downloadPng: function downloadPng(f) {
        return (
          (f = f || "image.png"),
          d()
            ? void e(b, f)
            : void this.toCanvas(function(g) {
                e(g.toDataURL(), f);
              })
        );
      }
    };
  },
  fromSvg: function fromSvg(b) {
    var c = new XMLSerializer().serializeToString(b);
    return new this.OutputProcessor(
      "data:image/svg+xml;base64," + window.btoa(c),
      b
    );
  },
  fromCanvas: function fromCanvas(b) {
    var c = b.toDataURL();
    return new this.OutputProcessor(c);
  }
}),
  "object" ===
    ("undefined" == typeof exports ? "undefined" : _typeof(exports)) &&
  void 0 !== ("undefined" == typeof module ? "undefined" : _typeof(module))
    ? (module.exports = { ReImg: ReImg })
    : (window.ReImg = ReImg);
