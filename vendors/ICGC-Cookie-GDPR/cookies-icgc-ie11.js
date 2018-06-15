"use strict";

var _extends = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; };

var _typeof = typeof Symbol === "function" && typeof Symbol.iterator === "symbol" ? function (obj) { return typeof obj; } : function (obj) { return obj && typeof Symbol === "function" && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj; };

(function (f) {
  if ((typeof exports === "undefined" ? "undefined" : _typeof(exports)) === "object" && typeof module !== "undefined") {
    module.exports = f();
  } else if (typeof define === "function" && define.amd) {
    define([], f);
  } else {
    var g;if (typeof window !== "undefined") {
      g = window;
    } else if (typeof global !== "undefined") {
      g = global;
    } else if (typeof self !== "undefined") {
      g = self;
    } else {
      g = this;
    }g.icgc = f();
  }
})(function () {
  var define, module, exports;return function () {
    function r(e, n, t) {
      function o(i, f) {
        if (!n[i]) {
          if (!e[i]) {
            var c = "function" == typeof require && require;if (!f && c) return c(i, !0);if (u) return u(i, !0);var a = new Error("Cannot find module '" + i + "'");throw a.code = "MODULE_NOT_FOUND", a;
          }var p = n[i] = { exports: {} };e[i][0].call(p.exports, function (r) {
            var n = e[i][1][r];return o(n || r);
          }, p, p.exports, r, e, n, t);
        }return n[i].exports;
      }for (var u = "function" == typeof require && require, i = 0; i < t.length; i++) {
        o(t[i]);
      }return o;
    }return r;
  }()({ 1: [function (_dereq_, module, exports) {
      module.exports = { "version": "0.0.1" };
    }, {}], 2: [function (_dereq_, module, exports) {
      "use strict";
      var CookieManager = function CookieManager() {};CookieManager.getCookie = function (e) {
        var o = document.cookie.match("(^|;) ?" + e + "=([^;]*)(;|$)");return o ? o[2] : null;
      }, CookieManager.hasCookie = function (e) {
        return null !== CookieManager.getCookie(e);
      }, CookieManager.setCookie = function (e, o, i, n, t) {
        var a = new Date();a.setTime(a.getTime() + 864e5 * i);var r = e + "=" + o + ";expires=" + a.toGMTString();r += t ? ";path=" + t : ";path=/", n && (r += ";domain=" + n), document.cookie = r;
      }, CookieManager.deleteCookie = function (e, o, i) {
        this.setCookie(e, "", -1, o, i);
      }, CookieManager.getAllCookies = function () {
        var e = {};return document.cookie.split(";").forEach(function (o) {
          var i = o.split("=");e[i[0]] = i[1];
        }), e;
      }, module.exports = CookieManager;
    }, {}], 3: [function (_dereq_, module, exports) {
      "use strict";
      var defaultOptions = _dereq_("./defaultOptions"),
          cookieManager = _dereq_("./cookieManager"),
          Utils = _dereq_("./utils"),
          Popup = _dereq_("./popup"),
          Cookieconsent = function Cookieconsent(t) {
        this.status = { deny: "deny", allow: "allow" }, this.options = defaultOptions, Utils.isPlainObject(t) && _extends(this.options, t), this.options.userAgent = navigator.userAgent, this.options.isMobile = Utils.isMobile(this.options.userAgent);
      };Cookieconsent.prototype.createPopup = function () {
        var t = this;/* TODO DVP Remove not used promise to support Internet Explorer 11 return new Promise(function (o) {*/
          var e = new Popup(t.options);e.setAllowHandler(function () {
            t.setStatus(t.status.allow), e.close();
          }), e.setDenyHandler(function () {
            t.setStatus(t.status.deny), e.close();
          })/*, TODO DVP Remove not used promise to support Internet Explorer 11 o(e);
        });*/
      }, Cookieconsent.prototype.hasAnswered = function () {
        return Object.keys(this.status).indexOf(this.getStatus()) >= 0;
      }, Cookieconsent.prototype.hasConsented = function () {
        return this.getStatus() === this.status.allow;
      }, Cookieconsent.prototype.setStatus = function (t) {
        var o = this.options.cookie,
            e = cookieManager.getCookie(o.name),
            n = Object.keys(this.status).indexOf(e) >= 0;Object.keys(this.status).indexOf(t) >= 0 ? (cookieManager.setCookie(o.name, t, o.expiryDays, o.domain, o.path), this.createConfigButton(), this.options.onStatusChange.call(this, t, n)) : this.clearStatus();
      }, Cookieconsent.prototype.getStatus = function () {
        return cookieManager.getCookie(this.options.cookie.name);
      }, Cookieconsent.prototype.clearStatus = function () {
        var t = this.options.cookie;cookieManager.deleteCookie(t.name, t.domain, t.path);
      }, Cookieconsent.prototype.onInit = function () {
        this.hasAnswered() && this.createConfigButton();
      }, Cookieconsent.prototype.createConfigButton = function () {
        var t = this,
            o = this.options.configBtnSelector,
            e = this.options.configBtn,
            n = document.body,
            i = "config-popup";if ("" !== o.trim()) {
          var s = document.querySelector(o);n = s || document.body, i = "";
        }e = e.replace("{{config-text}}", this.options.content.config), e = e.replace("{{config-class}}", i);var c = document.createElement("div");c.innerHTML = e, n.appendChild(c), document.querySelector(".cc-config").addEventListener("click", function () {
          return t.onResetConfig();
        });
      }, Cookieconsent.prototype.removeConfigButton = function () {
        var t = document.querySelector(".cc-config");t && t.parentNode.remove();
      }, Cookieconsent.prototype.onResetConfig = function () {
        this.removeConfigButton(), this.options.onResetConfig();
      }, module.exports = Cookieconsent;
    }, { "./cookieManager": 2, "./defaultOptions": 5, "./popup": 7, "./utils": 8 }], 4: [function (_dereq_, module, exports) {
      "use strict";
      var CookieConsent = _dereq_("./cookieconsent"),
          CookieManager = _dereq_("./cookieManager"),
          Utils = _dereq_("./utils"),
          defaultOptions = _dereq_("./defaultOptions"),
          CookiesICGC = function CookiesICGC(e, o, i) {
        var n = this,
            s = Utils.deepMerge({}, defaultOptions, i);s.cookie.domain = e, s.onInitialise = function () {
          n.onInit();
        }, s.onStatusChange = function () {
          n.onChange();
        }, s.onResetConfig = function () {
          n.onResetConfig();
        }, this.areCookiesEnabled = !1, this.gaDisablePrefix = "ga-disable-", this.gaIds = o, this.cookiesEnabledHandler = null, this.cookiesDisabledHandler = null, this.cookieConsent = new CookieConsent(s), this.onInit(), this.hasAnswered() || this.cookieConsent.createPopup();
      };CookiesICGC.prototype.onInit = function () {
        this.hasConsented() ? this.enableCookies() : this.disableCookies(), this.cookieConsent.onInit();
      }, CookiesICGC.prototype.onChange = function () {
        this.hasConsented() ? (CookieManager.setCookie("gaEnable", "true", 365), this.enableCookies()) : this.disableCookies();
      }, CookiesICGC.prototype.onResetConfig = function () {
        this.deleteCookies(), this.cookieConsent.createPopup();
      }, CookiesICGC.prototype.hasConsented = function () {
        return this.cookieConsent.hasConsented();
      }, CookiesICGC.prototype.hasAnswered = function () {
        return this.cookieConsent.hasAnswered();
      }, CookiesICGC.prototype.setCookiesEnabledHandler = function (e) {
        this.cookiesEnabledHandler = e;
      }, CookiesICGC.prototype.enableCookies = function () {
        this.areCookiesEnabled = !0, this.enableGA(), this.cookiesEnabledHandler && this.cookiesEnabledHandler();
      }, CookiesICGC.prototype.setCookiesDisabledHandler = function (e) {
        this.cookiesDisabledHandler = e;
      }, CookiesICGC.prototype.deleteCookies = function () {
        var e = CookieManager.getAllCookies();Object.keys(e).forEach(function (e) {
          CookieManager.deleteCookie(e);
        });
      }, CookiesICGC.prototype.disableCookies = function () {
        this.disableGA(), this.areCookiesEnabled = !1, this.cookiesDisabledHandler && this.cookiesDisabledHandler();
      }, CookiesICGC.prototype.areCookiesEnabled = function () {
        return this.areCookiesEnabled;
      }, CookiesICGC.prototype.enableGA = function () {
        this.changeGAStatusToDisabled(!1), CookieManager.setCookie("gaEnable", "true", 365);
      }, CookiesICGC.prototype.disableGA = function () {
        this.changeGAStatusToDisabled(!0), CookieManager.hasCookie("gaEnable") && CookieManager.setCookie("gaEnable", "false", 365);
      }, CookiesICGC.prototype.changeGAStatusToDisabled = function (e) {
        var o = this;this.gaIds.forEach(function (i) {
          window["" + o.gaDisablePrefix + i] = e;
        });
      }, module.exports = CookiesICGC;
    }, { "./cookieManager": 2, "./cookieconsent": 3, "./defaultOptions": 5, "./utils": 8 }], 5: [function (_dereq_, module, exports) {
      "use strict";
      module.exports = { container: null, cookie: { name: "cookieconsentICGC_status", path: "/", domain: "file", expiryDays: 365 }, content: { header: "Cookies utilitzades a la web!", message: "Utilitzem galetes per distingir-vos d'altres usuaris en els nostres webs, per millorar la informació i els serveis que us oferim, i per facilitar-vos l'accés. Per a més informació, consulteu la ", allow: "Acceptar", deny: "Rebutjar", link: "política de galetes", href: "http://www.icgc.cat/L-ICGC/Sobre-l-ICGC/Politiques/Politica-de-proteccio-de-dades-personals/Politica-de-galetes-cookies", close: "&#x274c;", config: "Configurar cookies" }, elements: { header: '<span class="cc-header">{{header}}</span>&nbsp;', message: '<span id="cookieconsent:desc" class="cc-message">{{message}}</span>', messagelink: '<span id="cookieconsent:desc" class="cc-message">{{message}} <a aria-label="learn more about cookies" role=button tabindex="0" class="cc-link" href="{{href}}" rel="noopener noreferrer nofollow" target="_blank">{{link}}</a></span>', allow: '<a aria-label="allow cookies" role=button tabindex="0"  class="cc-btn cc-allow">{{allow}}</a>', deny: '<a aria-label="deny cookies" role=button tabindex="0" class="cc-btn cc-deny">{{deny}}</a>', link: '<a aria-label="learn more about cookies" role=button tabindex="0" class="cc-link" href="{{href}}" target="_blank">{{link}}</a>', close: '<span aria-label="dismiss cookie message" role=button tabindex="0" class="cc-close">{{close}}</span>' }, window: '<div role="dialog" aria-live="polite" aria-label="cookieconsent" aria-describedby="cookieconsent:desc" class="cc-window {{classes}}">\x3c!--googleoff: all--\x3e{{children}}\x3c!--googleon: all--\x3e</div>', configBtn: '<div class="cc-config {{config-class}}"><img src="https://gencat.github.io/ICGC-Cookie-GDPR/dist/cookie-icon-24.png" style="margin-right: 5px;"/>{{config-text}}</div>', configBtnSelector: "", compliance: '<div class="cc-compliance cc-highlight">{{deny}}{{allow}}</div>', layouts: { basic: "{{messagelink}}{{compliance}}", "basic-close": "{{messagelink}}{{compliance}}{{close}}", "basic-header": "{{header}}{{message}}{{link}}{{compliance}}" }, layout: "basic", position: "bottom", theme: "block", palette: { popup: { background: "#222222" }, button: { background: "#00b050" } } };
    }, {}], 6: [function (_dereq_, module, exports) {
      "use strict";
      var version = _dereq_("../package.json").version,
          CookiesICGC = _dereq_("./cookiesIcgc");module.exports = { version: version, CookiesICGC: CookiesICGC };
    }, { "../package.json": 1, "./cookiesIcgc": 4 }], 7: [function (_dereq_, module, exports) {
      "use strict";
      var Utils = _dereq_("./utils"),
          Popup = function Popup(t, e) {
        this.statusList = e, this.allowHandler = null, this.denyHandler = null, this.options && this.destroy(), this.options = t;var o = this.options.window.replace("{{classes}}", this.getPopupClasses().join(" ")).replace("{{children}}", this.getPopupInnerMarkup());this.element = this.appendMarkup(o), this.open();
      };Popup.prototype.destroy = function () {
        document.querySelector(".cc-allow").removeEventListener("click", this.allowHandler), document.querySelector(".cc-deny").removeEventListener("click", this.denyHandler), this.allowHandler = null, this.denyHandler = null, this.element && this.element.parentNode && this.element.parentNode.removeChild(this.element), this.element = null, this.options = null;
      }, Popup.prototype.open = function () {
        if (this.element) return this.isOpen() || (this.element.style.display = "", Utils.removeClass(this.element, "cc-invisible"), this.options.onPopupOpen && this.options.onPopupOpen()), this;
      }, Popup.prototype.close = function () {
        if (this.element) return this.isOpen() && (this.element.style.display = "none", this.options.onPopupClose && this.options.onPopupClose()), this;
      }, Popup.prototype.isOpen = function () {
        return this.element && "" === this.element.style.display && !Utils.hasClass(this.element, "cc-invisible");
      }, Popup.prototype.getPositionClasses = function () {
        var t = this.options.position.split("-"),
            e = [];return t.forEach(function (t) {
          e.push("cc-" + t);
        }), e;
      }, Popup.prototype.getPopupClasses = function () {
        var t = this.options,
            e = "top" === t.position || "bottom" === t.position ? "banner" : "floating";t.isMobile && (e = "floating");var o = ["cc-" + e, "cc-type-opt-in", "cc-theme-" + t.theme];return t.static && o.push("cc-static"), o.push.apply(o, this.getPositionClasses()), this.attachCustomPalette(this.options.palette), this.customStyleSelector && o.push(this.customStyleSelector), o;
      }, Popup.prototype.getPopupInnerMarkup = function () {
        var t = {},
            e = this.options;Object.keys(e.elements).forEach(function (o) {
          t[o] = Utils.interpolateString(e.elements[o], function (t) {
            var o = e.content[t];return t && "string" == typeof o && o.length ? o : "";
          });
        });var o = e.compliance;t.compliance = Utils.interpolateString(o, function (e) {
          return t[e];
        });var n = e.layouts[e.layout];return n || (n = e.layouts.basic), Utils.interpolateString(n, function (e) {
          return t[e];
        });
      }, Popup.prototype.appendMarkup = function (t) {
        var e = this.options,
            o = document.createElement("div"),
            n = e.container && 1 === e.container.nodeType ? e.container : document.body;o.innerHTML = t;var i = o.children[0];return i.style.display = "none", Utils.hasClass(i, "cc-window") && Utils.addClass(i, "cc-invisible"), n.firstChild ? n.insertBefore(i, n.firstChild) : n.appendChild(i), i;
      }, Popup.prototype.setAllowHandler = function (t) {
        document.querySelector(".cc-allow").removeEventListener("click", this.allowHandler), this.allowHandler = t, document.querySelector(".cc-allow").addEventListener("click", t);
      }, Popup.prototype.setDenyHandler = function (t) {
        document.querySelector(".cc-deny").removeEventListener("click", this.denyHandler), this.denyHandler = t, document.querySelector(".cc-deny").addEventListener("click", t);
      }, Popup.prototype.attachCustomPalette = function (t) {
        var e = Utils.hash(JSON.stringify(t)),
            o = "cc-color-override-" + e,
            n = Utils.isPlainObject(t);return this.customStyleSelector = n ? o : null, n && this.addCustomStyle(e, t, "." + o), n;
      }, Popup.prototype.addCustomStyle = function (t, e, o) {
        var n = {},
            i = e.popup,
            r = e.button,
            s = e.highlight;i && (i.text = i.text ? i.text : Utils.getContrast(i.background), i.link = i.link ? i.link : i.text, n[o + ".cc-window"] = ["color: " + i.text, "background-color: " + i.background], n[o + " .cc-link," + o + " .cc-link:active," + o + " .cc-link:visited"] = ["color: " + i.link], r && (r.text = r.text ? r.text : Utils.getContrast(r.background), r.border = r.border ? r.border : "transparent", n[o + " .cc-btn"] = ["color: " + r.text, "border-color: " + r.border, "background-color: " + r.background], "transparent" !== r.background && (n[o + " .cc-btn:hover, " + o + " .cc-btn:focus"] = ["background-color: " + Utils.getHoverColour(r.background)]), s ? (s.text = s.text ? s.text : Utils.getContrast(s.background), s.border = s.border ? s.border : "transparent", n[o + " .cc-highlight .cc-btn:first-child"] = ["color: " + s.text, "border-color: " + s.border, "background-color: " + s.background]) : n[o + " .cc-highlight .cc-btn:first-child"] = ["color: " + i.text]));var l = document.createElement("style");document.head.appendChild(l);var c = -1;for (var p in n) {
          l.sheet.insertRule(p + "{" + n[p].join(";") + "}", ++c);
        }
      }, module.exports = Popup;
    }, { "./utils": 8 }], 8: [function (_dereq_, module, exports) {
      "use strict";
      var Utils = function Utils() {};Utils.escapeRegExp = function (e) {
        return e.replace(/[\-\[\]\/\{\}\(\)\*\+\?\.\\\^\$\|]/g, "\\$&");
      }, Utils.hasClass = function (e, t) {
        var r = " ",
            n = (r + e.className + r).replace(/[\n\t]/g, r).indexOf(r + t + r) >= 0;return e.nodeType === Node.ELEMENT_NODE && n;
      }, Utils.addClass = function (e, t) {
        e.className += " " + t;
      }, Utils.removeClass = function (e, t) {
        var r = new RegExp("\\b" + Utils.escapeRegExp(t) + "\\b");e.className = e.className.replace(r, "");
      }, Utils.interpolateString = function (e, t) {
        var r = /{{([a-z][a-z0-9\-_]*)}}/gi;return e.replace(r, function () {
          return t(arguments[1]) || "";
        });
      }, Utils.hash = function (e) {
        var t,
            r,
            n,
            i = 0;if (0 === e.length) return i;for (t = 0, n = e.length; t < n; ++t) {
          r = e.charCodeAt(t), i = (i << 5) - i + r, i |= 0;
        }return i;
      }, Utils.normaliseHex = function (e) {
        return "#" === e[0] && (e = e.substr(1)), 3 === e.length && (e = e[0] + e[0] + e[1] + e[1] + e[2] + e[2]), e;
      }, Utils.getContrast = function (e) {
        return e = Utils.normaliseHex(e), (299 * parseInt(e.substr(0, 2), 16) + 587 * parseInt(e.substr(2, 2), 16) + 114 * parseInt(e.substr(4, 2), 16)) / 1e3 >= 128 ? "#000" : "#fff";
      }, Utils.getLuminance = function (e) {
        var t = parseInt(Utils.normaliseHex(e), 16),
            r = 38 + (t >> 16),
            n = 38 + (t >> 8 & 255),
            i = 38 + (255 & t);return "#" + (16777216 + 65536 * (r < 255 ? r < 1 ? 0 : r : 255) + 256 * (n < 255 ? n < 1 ? 0 : n : 255) + (i < 255 ? i < 1 ? 0 : i : 255)).toString(16).slice(1);
      }, Utils.getHoverColour = function (e) {
        return e = Utils.normaliseHex(e), "000000" === e ? "#222" : Utils.getLuminance(e);
      }, Utils.isMobile = function (e) {
        return (/Android|webOS|iPhone|iPad|iPod|BlackBerry|IEMobile|Opera Mini/i.test(e)
        );
      }, Utils.isPlainObject = function (e) {
        return "object" == (typeof e === "undefined" ? "undefined" : _typeof(e)) && null !== e && e.constructor === Object;
      }, Utils.arrayContainsMatches = function (e, t) {
        for (var r = 0, n = e.length; r < n; ++r) {
          var i = e[r];if (i instanceof RegExp && i.test(t) || "string" == typeof i && i.length && i === t) return !0;
        }return !1;
      }, Utils.deepMerge = function (e) {
        for (var t = [], r = arguments.length - 1; r-- > 0;) {
          t[r] = arguments[r + 1];
        }var n = e;return Array.prototype.slice.call(arguments, 1).forEach(function (e) {
          n = Utils.singleDeepMerge(n, e);
        }), n;
      }, Utils.singleDeepMerge = function (e, t) {
        for (var r in t) {
          if (t.propertyIsEnumerable(r)) {
            var n = t[r],
                i = e[r];i || (i = {}), Array.isArray(n) ? n = n.slice(0) : "object" != (typeof n === "undefined" ? "undefined" : _typeof(n)) || Array.isArray(i) ? "object" == (typeof n === "undefined" ? "undefined" : _typeof(n)) && Array.isArray(i) && (n = Utils.singleDeepMerge({}, n)) : n = Utils.singleDeepMerge(i, n), e[r] = n;
          }
        }return e;
      }, module.exports = Utils;
    }, {}] }, {}, [6])(6);
});

//# sourceMappingURL=cookies-icgc.js.map
