(() => { var e = { 36: (e, t, n) => { "use strict";
                    n.r(t), n.d(t, { SandpackClient: () => f, addPackageJSONIfNeeded: () => l, createPackageJSON: () => d, extractErrorDetails: () => u }); var r = n(770),
                        i = n(307),
                        o = n.n(i); const a = () => Math.floor(1e6 * Math.random() + 1e6 * Math.random());
                    class s { constructor(e, t, n) { this.type = e, this.handleMessage = t, this.target = n, this.outgoingMessages = new Set, this._messageListener = async e => { const { data: t } = e; if (t.$type !== this.getTypeId()) return; if (this.outgoingMessages.has(t.$id)) return; const n = await this.handleMessage(t.$data),
                                    r = { $originId: this.internalId, $type: this.getTypeId(), $data: n, $id: t.$id };
                                e.source ? e.source.postMessage(r, "*") : this._postMessage(r) }, this.createConnection(), this.internalId = a(), this.isWorker = "Worker" === (e => { try { return e.constructor.name } catch (e) { return "" } })(n) }
                        getTypeId() { return `p-${this.type}` }
                        createConnection() { self.addEventListener("message", this._messageListener) }
                        dispose() { self.removeEventListener("message", this._messageListener) }
                        sendMessage(e) { return new Promise((t => { const n = a(),
                                    r = { $originId: this.internalId, $type: this.getTypeId(), $data: e, $id: n };
                                this.outgoingMessages.add(n); const i = e => { const { data: r } = e;
                                    r.$type === this.getTypeId() && r.$id === n && r.$originId !== this.internalId && (t(r.$data), self.removeEventListener("message", i)) };
                                self.addEventListener("message", i), this._postMessage(r) })) }
                        _postMessage(e) { this.isWorker || "undefined" != typeof DedicatedWorkerGlobalScope && this.target instanceof DedicatedWorkerGlobalScope ? this.target.postMessage(e) : this.target.postMessage(e, "*") } }
                    class c { constructor(e, t) { this.globalListeners = {}, this.globalListenersCount = 0, this.channelListeners = {}, this.channelListenersCount = 0, this.channelId = Math.floor(1e6 * Math.random()), this.frameWindow = e.contentWindow, this.origin = t, this.globalListeners = [], this.channelListeners = [], this.eventListener = this.eventListener.bind(this), "undefined" != typeof window && window.addEventListener("message", this.eventListener) }
                        cleanup() { window.removeEventListener("message", this.eventListener), this.globalListeners = {}, this.channelListeners = {}, this.globalListenersCount = 0, this.channelListenersCount = 0 }
                        register() { this.frameWindow && this.frameWindow.postMessage({ type: "register-frame", origin: document.location.origin, id: this.channelId }, this.origin) }
                        dispatch(e) { this.frameWindow && this.frameWindow.postMessage({ $id: this.channelId, codesandbox: !0, ...e }, this.origin) }
                        globalListen(e) { if ("function" != typeof e) return () => {}; const t = this.globalListenersCount; return this.globalListeners[t] = e, this.globalListenersCount++, () => { delete this.globalListeners[t] } }
                        channelListen(e) { if ("function" != typeof e) return () => {}; const t = this.channelListenersCount; return this.channelListeners[t] = e, this.channelListenersCount++, () => { delete this.channelListeners[t] } }
                        eventListener(e) { e.data.codesandbox && (Object.values(this.globalListeners).forEach((t => t(e.data))), e.data.$id === this.channelId && Object.values(this.channelListeners).forEach((t => t(e.data)))) } }

                    function d(e = {}, t = "/index.js") { return JSON.stringify({ name: "sandpack-project", main: t, dependencies: e }, null, 2) }

                    function l(e, t, n) { const r = {...e }; if (!r["/package.json"]) { if (!t) throw new Error("No dependencies specified, please specify either a package.json or dependencies."); if (!n) throw new Error("Missing 'entry' parameter. Either specify an entry point, or pass in a package.json with the 'main' field set.");
                            r["/package.json"] = { code: d(t, n) } } return r }

                    function u(e) { if ("SyntaxError" === e.title) { const { title: t, path: n, message: r, line: i, column: o } = e; return { title: t, path: n, message: r, line: i, column: o } } const t = function(e) { if (e) return e.find((e => !!e._originalFileName)) }(e.payload.frames); if (!t) return { message: e.message }; const n = function(e) { const t = e._originalScriptCode[e._originalScriptCode.length - 1].lineNumber.toString().length,
                                    n = 2 + t + 3 + e._originalColumnNumber; return e._originalScriptCode.reduce(((e, r) => { const i = r.highlight ? ">" : " ",
                                        o = r.lineNumber.toString().length === t ? `${r.lineNumber}` : ` ${r.lineNumber}`,
                                        a = r.highlight ? "\n" + " ".repeat(n) + "^" : ""; return e + "\n" + i + " " + o + " | " + r.content + a }), "") }(t),
                            r = (i = t) ? ` (${i._originalLineNumber}:${i._originalColumnNumber})` : ""; var i; return { message: function(e, t, n, r) { return `${e}: ${t}${n}\n${r}` }(t._originalFileName, e.message, r, n), title: e.title, path: t._originalFileName, line: t._originalLineNumber, column: t._originalColumnNumber } } const h = "development" === n(155).env.CODESANDBOX_ENV ? "http://localhost:3000/" : `https://${"0.1.11".replace(/\./g,"-")}-sandpack.codesandbox.io/`;
                    class f { constructor(e, t, n = {}) { if (this.getTranspilerContext = () => new Promise((e => { const t = this.listen((n => { "transpiler-context" === n.type && (e(n.data), t()) }));
                                    this.dispatch({ type: "get-transpiler-context" }) })), this.options = n, this.sandboxInfo = t, this.bundlerURL = n.bundlerURL || h, this.bundlerState = void 0, this.errors = [], this.status = "initializing", "string" == typeof e) { this.selector = e; const t = document.querySelector(e); if (!t) throw new Error(`No element found for selector '${e}'`);
                                this.element = t, this.iframe = document.createElement("iframe"), this.initializeElement() } else this.element = e, this.iframe = e;
                            this.iframe.getAttribute("sandbox") || this.iframe.setAttribute("sandbox", "allow-forms allow-modals allow-popups allow-presentation allow-same-origin allow-scripts"), this.iframe.src = n.startRoute ? new URL(n.startRoute, this.bundlerURL).toString() : this.bundlerURL, this.iframeProtocol = new c(this.iframe, this.bundlerURL), this.unsubscribeGlobalListener = this.iframeProtocol.globalListen((e => { "initialized" === e.type && this.iframe.contentWindow && (this.iframeProtocol.register(), this.options.fileResolver && (this.fileResolverProtocol = new s("file-resolver", (async e => "isFile" === e.m ? this.options.fileResolver.isFile(e.p) : this.options.fileResolver.readFile(e.p)), this.iframe.contentWindow)), this.updatePreview(this.sandboxInfo, !0)) })), this.unsubscribeChannelListener = this.iframeProtocol.channelListen((e => { switch (e.type) {
                                    case "start":
                                        this.errors = []; break;
                                    case "status":
                                        this.status = e.status; break;
                                    case "action":
                                        "show-error" === e.action && (this.errors = [...this.errors, u(e)]); break;
                                    case "state":
                                        this.bundlerState = e.state } })) }
                        cleanup() { this.unsubscribeChannelListener(), this.unsubscribeGlobalListener(), this.iframeProtocol.cleanup() }
                        updateOptions(e) { o()(this.options, e) || (this.options = e, this.updatePreview()) }
                        updatePreview(e = this.sandboxInfo, t) { var n, i, o;
                            this.sandboxInfo = e; const a = this.getFiles(),
                                s = Object.keys(a).reduce(((e, t) => ({...e, [t]: { code: a[t].code, path: t } })), {}); let c = JSON.parse(d(this.sandboxInfo.dependencies, this.sandboxInfo.entry)); try { c = JSON.parse(a["/package.json"].code) } catch (e) { console.error("Could not parse package.json file: " + e.message) } const l = Object.keys(a).reduce(((e, t) => ({...e, [t]: { content: a[t].code, path: t } })), {});
                            this.dispatch({ type: "compile", codesandbox: !0, version: 3, isInitializationCompile: t, modules: s, externalResources: [], hasFileResolver: Boolean(this.options.fileResolver), disableDependencyPreprocessing: this.sandboxInfo.disableDependencyPreprocessing, template: this.sandboxInfo.template || (0, r.t4)(c, l), showOpenInCodeSandbox: null === (n = this.options.showOpenInCodeSandbox) || void 0 === n || n, showErrorScreen: null === (i = this.options.showErrorScreen) || void 0 === i || i, showLoadingScreen: null === (o = this.options.showLoadingScreen) || void 0 === o || o, skipEval: this.options.skipEval || !1, clearConsoleDisabled: !this.options.clearConsoleOnFirstCompile }) }
                        dispatch(e) { this.iframeProtocol.dispatch(e) }
                        listen(e) { return this.iframeProtocol.channelListen(e) }
                        getCodeSandboxURL() { const e = this.getFiles(),
                                t = Object.keys(e).reduce(((t, n) => ({...t, [n.replace("/", "")]: { content: e[n].code, isBinary: !1 } })), {}); return fetch("https://codesandbox.io/api/v1/sandboxes/define?json=1", { method: "POST", body: JSON.stringify({ files: t }), headers: { Accept: "application/json", "Content-Type": "application/json" } }).then((e => e.json())).then((e => ({ sandboxId: e.sandbox_id, editorUrl: `https://codesandbox.io/s/${e.sandbox_id}`, embedUrl: `https://codesandbox.io/embed/${e.sandbox_id}` }))) }
                        getFiles() { const { sandboxInfo: e } = this; return void 0 === e.files["/package.json"] ? l(e.files, e.dependencies, e.entry) : this.sandboxInfo.files }
                        initializeElement() { if (this.iframe.style.border = "0", this.iframe.style.width = this.options.width || "100%", this.iframe.style.height = this.options.height || "100%", this.iframe.style.overflow = "hidden", !this.element.parentNode) throw new Error("Given element does not have a parent.");
                            this.element.parentNode.replaceChild(this.iframe, this.element) } } }, 770: (e, t) => { "use strict"; var n = "sandbox.config.json";
                    t.t4 = function(e, t) { var r = t[n] || t["/" + n]; if (r) try { var i = JSON.parse(r.content); if (i.template) return i.template } catch (e) {}
                        var o = e.dependencies,
                            a = void 0 === o ? {} : o,
                            s = e.devDependencies,
                            c = void 0 === s ? {} : s,
                            d = Object.keys(a).concat(Object.keys(c)),
                            l = ["nuxt", "nuxt-edge"]; if (d.some((function(e) { return l.indexOf(e) > -1 }))) return "nuxt"; if (d.indexOf("next") > -1) return "next"; var u = ["apollo-server", "apollo-server-express", "apollo-server-hapi", "apollo-server-koa", "apollo-server-lambda", "apollo-server-micro"]; if (d.some((function(e) { return u.indexOf(e) > -1 }))) return "apollo"; if (d.indexOf("ember-cli") > -1) return "ember"; if (d.indexOf("sapper") > -1) return "sapper"; var h = Object.keys(t); if (h.some((function(e) { return e.endsWith(".vue") }))) return "vue-cli"; if (h.some((function(e) { return e.endsWith(".re") }))) return "reason"; if (d.indexOf("gatsby") > -1) return "gatsby"; if (d.indexOf("parcel-bundler") > -1) return "parcel"; if (d.indexOf("react-scripts") > -1) return "create-react-app"; if (d.indexOf("react-scripts-ts") > -1) return "create-react-app-typescript"; if (d.indexOf("@angular/core") > -1) return "angular-cli"; if (d.indexOf("preact-cli") > -1) return "preact-cli"; if (d.indexOf("svelte") > -1) return "svelte"; if (d.indexOf("vue") > -1) return "vue-cli"; var f = ["@dojo/core", "@dojo/framework"]; return d.some((function(e) { return f.indexOf(e) > -1 })) ? "@dojo/cli-create-app" : d.indexOf("cx") > -1 ? "cxjs" : d.indexOf("@nestjs/core") > -1 || d.indexOf("@nestjs/common") > -1 ? "nest" : void 0 } }, 307: (e, t, n) => { e = n.nmd(e); var r = "__lodash_hash_undefined__",
                        i = 9007199254740991,
                        o = "[object Arguments]",
                        a = "[object Array]",
                        s = "[object Boolean]",
                        c = "[object Date]",
                        d = "[object Error]",
                        l = "[object Function]",
                        u = "[object Map]",
                        h = "[object Number]",
                        f = "[object Object]",
                        p = "[object Promise]",
                        b = "[object RegExp]",
                        g = "[object Set]",
                        v = "[object String]",
                        m = "[object WeakMap]",
                        y = "[object ArrayBuffer]",
                        x = "[object DataView]",
                        w = /^\[object .+?Constructor\]$/,
                        S = /^(?:0|[1-9]\d*)$/,
                        _ = {};
                    _["[object Float32Array]"] = _["[object Float64Array]"] = _["[object Int8Array]"] = _["[object Int16Array]"] = _["[object Int32Array]"] = _["[object Uint8Array]"] = _["[object Uint8ClampedArray]"] = _["[object Uint16Array]"] = _["[object Uint32Array]"] = !0, _[o] = _[a] = _[y] = _[s] = _[x] = _[c] = _[d] = _[l] = _[u] = _[h] = _[f] = _[b] = _[g] = _[v] = _[m] = !1; var j = "object" == typeof n.g && n.g && n.g.Object === Object && n.g,
                        k = "object" == typeof self && self && self.Object === Object && self,
                        C = j || k || Function("return this")(),
                        O = t && !t.nodeType && t,
                        L = O && e && !e.nodeType && e,
                        E = L && L.exports === O,
                        A = E && j.process,
                        $ = function() { try { return A && A.binding && A.binding("util") } catch (e) {} }(),
                        I = $ && $.isTypedArray;

                    function N(e, t) { for (var n = -1, r = null == e ? 0 : e.length; ++n < r;)
                            if (t(e[n], n, e)) return !0;
                        return !1 }

                    function P(e) { var t = -1,
                            n = Array(e.size); return e.forEach((function(e, r) { n[++t] = [r, e] })), n }

                    function T(e) { var t = -1,
                            n = Array(e.size); return e.forEach((function(e) { n[++t] = e })), n } var M, z, F, D = Array.prototype,
                        B = Function.prototype,
                        U = Object.prototype,
                        R = C["__core-js_shared__"],
                        W = B.toString,
                        J = U.hasOwnProperty,
                        G = (M = /[^.]+$/.exec(R && R.keys && R.keys.IE_PROTO || "")) ? "Symbol(src)_1." + M : "",
                        q = U.toString,
                        H = RegExp("^" + W.call(J).replace(/[\\^$.*+?()[\]{}|]/g, "\\$&").replace(/hasOwnProperty|(function).*?(?=\\\()| for .+?(?=\\\])/g, "$1.*?") + "$"),
                        V = E ? C.Buffer : void 0,
                        Y = C.Symbol,
                        X = C.Uint8Array,
                        K = U.propertyIsEnumerable,
                        Q = D.splice,
                        Z = Y ? Y.toStringTag : void 0,
                        ee = Object.getOwnPropertySymbols,
                        te = V ? V.isBuffer : void 0,
                        ne = (z = Object.keys, F = Object, function(e) { return z(F(e)) }),
                        re = Le(C, "DataView"),
                        ie = Le(C, "Map"),
                        oe = Le(C, "Promise"),
                        ae = Le(C, "Set"),
                        se = Le(C, "WeakMap"),
                        ce = Le(Object, "create"),
                        de = Ie(re),
                        le = Ie(ie),
                        ue = Ie(oe),
                        he = Ie(ae),
                        fe = Ie(se),
                        pe = Y ? Y.prototype : void 0,
                        be = pe ? pe.valueOf : void 0;

                    function ge(e) { var t = -1,
                            n = null == e ? 0 : e.length; for (this.clear(); ++t < n;) { var r = e[t];
                            this.set(r[0], r[1]) } }

                    function ve(e) { var t = -1,
                            n = null == e ? 0 : e.length; for (this.clear(); ++t < n;) { var r = e[t];
                            this.set(r[0], r[1]) } }

                    function me(e) { var t = -1,
                            n = null == e ? 0 : e.length; for (this.clear(); ++t < n;) { var r = e[t];
                            this.set(r[0], r[1]) } }

                    function ye(e) { var t = -1,
                            n = null == e ? 0 : e.length; for (this.__data__ = new me; ++t < n;) this.add(e[t]) }

                    function xe(e) { var t = this.__data__ = new ve(e);
                        this.size = t.size }

                    function we(e, t) { for (var n = e.length; n--;)
                            if (Ne(e[n][0], t)) return n;
                        return -1 }

                    function Se(e) { return null == e ? void 0 === e ? "[object Undefined]" : "[object Null]" : Z && Z in Object(e) ? function(e) { var t = J.call(e, Z),
                                n = e[Z]; try { e[Z] = void 0; var r = !0 } catch (e) {} var i = q.call(e); return r && (t ? e[Z] = n : delete e[Z]), i }(e) : function(e) { return q.call(e) }(e) }

                    function _e(e) { return Be(e) && Se(e) == o }

                    function je(e, t, n, r, i) { return e === t || (null == e || null == t || !Be(e) && !Be(t) ? e != e && t != t : function(e, t, n, r, i, l) { var p = Te(e),
                                m = Te(t),
                                w = p ? a : Ae(e),
                                S = m ? a : Ae(t),
                                _ = (w = w == o ? f : w) == f,
                                j = (S = S == o ? f : S) == f,
                                k = w == S; if (k && Me(e)) { if (!Me(t)) return !1;
                                p = !0, _ = !1 } if (k && !_) return l || (l = new xe), p || Ue(e) ? ke(e, t, n, r, i, l) : function(e, t, n, r, i, o, a) { switch (n) {
                                    case x:
                                        if (e.byteLength != t.byteLength || e.byteOffset != t.byteOffset) return !1;
                                        e = e.buffer, t = t.buffer;
                                    case y:
                                        return !(e.byteLength != t.byteLength || !o(new X(e), new X(t)));
                                    case s:
                                    case c:
                                    case h:
                                        return Ne(+e, +t);
                                    case d:
                                        return e.name == t.name && e.message == t.message;
                                    case b:
                                    case v:
                                        return e == t + "";
                                    case u:
                                        var l = P;
                                    case g:
                                        var f = 1 & r; if (l || (l = T), e.size != t.size && !f) return !1; var p = a.get(e); if (p) return p == t;
                                        r |= 2, a.set(e, t); var m = ke(l(e), l(t), r, i, o, a); return a.delete(e), m;
                                    case "[object Symbol]":
                                        if (be) return be.call(e) == be.call(t) } return !1 }(e, t, w, n, r, i, l); if (!(1 & n)) { var C = _ && J.call(e, "__wrapped__"),
                                    O = j && J.call(t, "__wrapped__"); if (C || O) { var L = C ? e.value() : e,
                                        E = O ? t.value() : t; return l || (l = new xe), i(L, E, n, r, l) } } return !!k && (l || (l = new xe), function(e, t, n, r, i, o) { var a = 1 & n,
                                    s = Ce(e),
                                    c = s.length; if (c != Ce(t).length && !a) return !1; for (var d = c; d--;) { var l = s[d]; if (!(a ? l in t : J.call(t, l))) return !1 } var u = o.get(e); if (u && o.get(t)) return u == t; var h = !0;
                                o.set(e, t), o.set(t, e); for (var f = a; ++d < c;) { var p = e[l = s[d]],
                                        b = t[l]; if (r) var g = a ? r(b, p, l, t, e, o) : r(p, b, l, e, t, o); if (!(void 0 === g ? p === b || i(p, b, n, r, o) : g)) { h = !1; break }
                                    f || (f = "constructor" == l) } if (h && !f) { var v = e.constructor,
                                        m = t.constructor;
                                    v == m || !("constructor" in e) || !("constructor" in t) || "function" == typeof v && v instanceof v && "function" == typeof m && m instanceof m || (h = !1) } return o.delete(e), o.delete(t), h }(e, t, n, r, i, l)) }(e, t, n, r, je, i)) }

                    function ke(e, t, n, r, i, o) { var a = 1 & n,
                            s = e.length,
                            c = t.length; if (s != c && !(a && c > s)) return !1; var d = o.get(e); if (d && o.get(t)) return d == t; var l = -1,
                            u = !0,
                            h = 2 & n ? new ye : void 0; for (o.set(e, t), o.set(t, e); ++l < s;) { var f = e[l],
                                p = t[l]; if (r) var b = a ? r(p, f, l, t, e, o) : r(f, p, l, e, t, o); if (void 0 !== b) { if (b) continue;
                                u = !1; break } if (h) { if (!N(t, (function(e, t) { if (a = t, !h.has(a) && (f === e || i(f, e, n, r, o))) return h.push(t); var a }))) { u = !1; break } } else if (f !== p && !i(f, p, n, r, o)) { u = !1; break } } return o.delete(e), o.delete(t), u }

                    function Ce(e) { return function(e, t, n) { var r = t(e); return Te(e) ? r : function(e, t) { for (var n = -1, r = t.length, i = e.length; ++n < r;) e[i + n] = t[n]; return e }(r, n(e)) }(e, Re, Ee) }

                    function Oe(e, t) { var n, r, i = e.__data__; return ("string" == (r = typeof(n = t)) || "number" == r || "symbol" == r || "boolean" == r ? "__proto__" !== n : null === n) ? i["string" == typeof t ? "string" : "hash"] : i.map }

                    function Le(e, t) { var n = function(e, t) { return null == e ? void 0 : e[t] }(e, t); return function(e) { return !(!De(e) || function(e) { return !!G && G in e }(e)) && (ze(e) ? H : w).test(Ie(e)) }(n) ? n : void 0 }
                    ge.prototype.clear = function() { this.__data__ = ce ? ce(null) : {}, this.size = 0 }, ge.prototype.delete = function(e) { var t = this.has(e) && delete this.__data__[e]; return this.size -= t ? 1 : 0, t }, ge.prototype.get = function(e) { var t = this.__data__; if (ce) { var n = t[e]; return n === r ? void 0 : n } return J.call(t, e) ? t[e] : void 0 }, ge.prototype.has = function(e) { var t = this.__data__; return ce ? void 0 !== t[e] : J.call(t, e) }, ge.prototype.set = function(e, t) { var n = this.__data__; return this.size += this.has(e) ? 0 : 1, n[e] = ce && void 0 === t ? r : t, this }, ve.prototype.clear = function() { this.__data__ = [], this.size = 0 }, ve.prototype.delete = function(e) { var t = this.__data__,
                            n = we(t, e); return !(n < 0 || (n == t.length - 1 ? t.pop() : Q.call(t, n, 1), --this.size, 0)) }, ve.prototype.get = function(e) { var t = this.__data__,
                            n = we(t, e); return n < 0 ? void 0 : t[n][1] }, ve.prototype.has = function(e) { return we(this.__data__, e) > -1 }, ve.prototype.set = function(e, t) { var n = this.__data__,
                            r = we(n, e); return r < 0 ? (++this.size, n.push([e, t])) : n[r][1] = t, this }, me.prototype.clear = function() { this.size = 0, this.__data__ = { hash: new ge, map: new(ie || ve), string: new ge } }, me.prototype.delete = function(e) { var t = Oe(this, e).delete(e); return this.size -= t ? 1 : 0, t }, me.prototype.get = function(e) { return Oe(this, e).get(e) }, me.prototype.has = function(e) { return Oe(this, e).has(e) }, me.prototype.set = function(e, t) { var n = Oe(this, e),
                            r = n.size; return n.set(e, t), this.size += n.size == r ? 0 : 1, this }, ye.prototype.add = ye.prototype.push = function(e) { return this.__data__.set(e, r), this }, ye.prototype.has = function(e) { return this.__data__.has(e) }, xe.prototype.clear = function() { this.__data__ = new ve, this.size = 0 }, xe.prototype.delete = function(e) { var t = this.__data__,
                            n = t.delete(e); return this.size = t.size, n }, xe.prototype.get = function(e) { return this.__data__.get(e) }, xe.prototype.has = function(e) { return this.__data__.has(e) }, xe.prototype.set = function(e, t) { var n = this.__data__; if (n instanceof ve) { var r = n.__data__; if (!ie || r.length < 199) return r.push([e, t]), this.size = ++n.size, this;
                            n = this.__data__ = new me(r) } return n.set(e, t), this.size = n.size, this }; var Ee = ee ? function(e) { return null == e ? [] : (e = Object(e), function(t, n) { for (var r = -1, i = null == t ? 0 : t.length, o = 0, a = []; ++r < i;) { var s = t[r];
                                    c = s, K.call(e, c) && (a[o++] = s) } var c; return a }(ee(e))) } : function() { return [] },
                        Ae = Se;

                    function $e(e, t) { return !!(t = null == t ? i : t) && ("number" == typeof e || S.test(e)) && e > -1 && e % 1 == 0 && e < t }

                    function Ie(e) { if (null != e) { try { return W.call(e) } catch (e) {} try { return e + "" } catch (e) {} } return "" }

                    function Ne(e, t) { return e === t || e != e && t != t }(re && Ae(new re(new ArrayBuffer(1))) != x || ie && Ae(new ie) != u || oe && Ae(oe.resolve()) != p || ae && Ae(new ae) != g || se && Ae(new se) != m) && (Ae = function(e) { var t = Se(e),
                            n = t == f ? e.constructor : void 0,
                            r = n ? Ie(n) : ""; if (r) switch (r) {
                            case de:
                                return x;
                            case le:
                                return u;
                            case ue:
                                return p;
                            case he:
                                return g;
                            case fe:
                                return m }
                        return t }); var Pe = _e(function() { return arguments }()) ? _e : function(e) { return Be(e) && J.call(e, "callee") && !K.call(e, "callee") },
                        Te = Array.isArray,
                        Me = te || function() { return !1 };

                    function ze(e) { if (!De(e)) return !1; var t = Se(e); return t == l || "[object GeneratorFunction]" == t || "[object AsyncFunction]" == t || "[object Proxy]" == t }

                    function Fe(e) { return "number" == typeof e && e > -1 && e % 1 == 0 && e <= i }

                    function De(e) { var t = typeof e; return null != e && ("object" == t || "function" == t) }

                    function Be(e) { return null != e && "object" == typeof e } var Ue = I ? function(e) { return function(t) { return e(t) } }(I) : function(e) { return Be(e) && Fe(e.length) && !!_[Se(e)] };

                    function Re(e) { return null != (t = e) && Fe(t.length) && !ze(t) ? function(e, t) { var n = Te(e),
                                r = !n && Pe(e),
                                i = !n && !r && Me(e),
                                o = !n && !r && !i && Ue(e),
                                a = n || r || i || o,
                                s = a ? function(e, t) { for (var n = -1, r = Array(e); ++n < e;) r[n] = t(n); return r }(e.length, String) : [],
                                c = s.length; for (var d in e) !t && !J.call(e, d) || a && ("length" == d || i && ("offset" == d || "parent" == d) || o && ("buffer" == d || "byteLength" == d || "byteOffset" == d) || $e(d, c)) || s.push(d); return s }(e) : function(e) { if (n = (t = e) && t.constructor, t !== ("function" == typeof n && n.prototype || U)) return ne(e); var t, n, r = []; for (var i in Object(e)) J.call(e, i) && "constructor" != i && r.push(i); return r }(e); var t }
                    e.exports = function(e, t) { return je(e, t) } }, 155: e => { var t, n, r = e.exports = {};

                    function i() { throw new Error("setTimeout has not been defined") }

                    function o() { throw new Error("clearTimeout has not been defined") }

                    function a(e) { if (t === setTimeout) return setTimeout(e, 0); if ((t === i || !t) && setTimeout) return t = setTimeout, setTimeout(e, 0); try { return t(e, 0) } catch (n) { try { return t.call(null, e, 0) } catch (n) { return t.call(this, e, 0) } } }! function() { try { t = "function" == typeof setTimeout ? setTimeout : i } catch (e) { t = i } try { n = "function" == typeof clearTimeout ? clearTimeout : o } catch (e) { n = o } }(); var s, c = [],
                        d = !1,
                        l = -1;

                    function u() { d && s && (d = !1, s.length ? c = s.concat(c) : l = -1, c.length && h()) }

                    function h() { if (!d) { var e = a(u);
                            d = !0; for (var t = c.length; t;) { for (s = c, c = []; ++l < t;) s && s[l].run();
                                l = -1, t = c.length }
                            s = null, d = !1,
                                function(e) { if (n === clearTimeout) return clearTimeout(e); if ((n === o || !n) && clearTimeout) return n = clearTimeout, clearTimeout(e); try { n(e) } catch (t) { try { return n.call(null, e) } catch (t) { return n.call(this, e) } } }(e) } }

                    function f(e, t) { this.fun = e, this.array = t }

                    function p() {}
                    r.nextTick = function(e) { var t = new Array(arguments.length - 1); if (arguments.length > 1)
                            for (var n = 1; n < arguments.length; n++) t[n - 1] = arguments[n];
                        c.push(new f(e, t)), 1 !== c.length || d || a(h) }, f.prototype.run = function() { this.fun.apply(null, this.array) }, r.title = "browser", r.browser = !0, r.env = {}, r.argv = [], r.version = "", r.versions = {}, r.on = p, r.addListener = p, r.once = p, r.off = p, r.removeListener = p, r.removeAllListeners = p, r.emit = p, r.prependListener = p, r.prependOnceListener = p, r.listeners = function(e) { return [] }, r.binding = function(e) { throw new Error("process.binding is not supported") }, r.cwd = function() { return "/" }, r.chdir = function(e) { throw new Error("process.chdir is not supported") }, r.umask = function() { return 0 } }, 191: (e, t, n) => { "use strict";
                    Object.defineProperty(t, "__esModule", { value: !0 }), t.SNBComponentSandboxEngine = t.SNBSandboxMessageStatus = void 0; const r = n(36),
                        i = n(687),
                        o = n(969),
                        a = n(633),
                        s = n(339); var c;! function(e) { e.unknown = "unknown", e.initializing = "initializing", e.installingDependencies = "installingDependencies", e.transpiling = "transpiling", e.evaluating = "evaluating", e.done = "done", e.error = "error" }(c = t.SNBSandboxMessageStatus || (t.SNBSandboxMessageStatus = {})), t.SNBComponentSandboxEngine = class { constructor() { this.updateSandboxCodeDebounced = this.debounce(((e, t) => this.updateSandboxCodeInternal(e, t))), this.trackedSandboxes = new Map, this.trackedConfigurations = new Map }
                        setObserver(e) { this.listener = e }
                        buildSandbox(e) { this.buildSandboxWithPageTarget(e) }
                        buildSandboxStartingWith(e) { this.buildSandboxesForTargetsWithPattern(`[id^="${e}"]`) }
                        buildSandboxEndingWith(e) { this.buildSandboxesForTargetsWithPattern(`[id$="${e}]`) }
                        buildSandboxesForTargetsWithPattern(e) { document.querySelectorAll(e).forEach((e => { this.buildSandboxWithPageTarget(e.id) })) }
                        buildSandboxWithPageTarget(e) { try { if (this.trackedSandboxes.get(e)) throw new Error(`Sandbox for id ${e} was already created. You can only create one tracked sandbox per target`); let t = document.querySelector(`#${e}`); if (!t) throw new Error(`Can't build sandbox with target ${e} as there is no such target in the current context`); if ("div" !== t.nodeName.toLowerCase() && "iframe" !== t.nodeName.toLowerCase()) throw new Error("Sandbox can only be created on element types of div or iframe (div is preferred)"); let n = this.validateConstructDataFromElement(t),
                                    i = { showErrorScreen: !0, showLoadingScreen: !1, showOpenInCodeSandbox: !1 },
                                    o = new r.SandpackClient(`#${e}`, n.payload, i);
                                this.trackedSandboxes.set(e, o), this.trackedConfigurations.set(e, n.decodedConfiguration), this.listener && o.listen((t => { let n, r = c.unknown; switch (t.type) {
                                        case "start":
                                            r = c.initializing; break;
                                        case "status":
                                            switch (t.status) {
                                                case "evaluating":
                                                    r = c.evaluating; break;
                                                case "installing-dependencies":
                                                    r = c.installingDependencies; break;
                                                case "transpiling":
                                                    r = c.transpiling } break;
                                        case "success":
                                            r = c.done; break;
                                        case "action":
                                            "show-error" === t.action && (r = c.error, n = t.message) }
                                    r !== c.unknown && this.listener({ details: t, status: r, sandboxId: e, error: n }) })) } catch (t) { this.listener && this.listener({ error: t.message, status: c.error, sandboxId: e }) } }
                        updateSandbox(e, t) { if (!this.trackedSandboxes.get(e)) throw new Error(`Sandbox ${e} can't be updated because it wasn't created yet`); let n = this.trackedSandboxes.get(e),
                                r = this.validateConstructDataFromEncodedData(t);
                            n.updatePreview(r.payload), this.trackedConfigurations.set(e, r.decodedConfiguration) }
                        updateSandboxCode(e, t) { this.updateSandboxCodeDebounced(e, t) }
                        updateSandboxCodeInternal(e, t) { if (!this.trackedSandboxes.get(e) || !this.trackedConfigurations.get(e)) throw new Error(`Sandbox ${e} can't be updated because it wasn't created yet`); let n = this.trackedSandboxes.get(e),
                                r = this.trackedConfigurations.get(e);
                            r.code = t; let i = this.createBundledData(r);
                            n.updatePreview(i), this.trackedConfigurations.set(e, r) }
                        debounce(e, t = 300) { let n; return (...r) => { clearTimeout(n), n = setTimeout((() => { e.apply(this, r) }), t) } }
                        async openInSandbox(e) { if (!this.trackedSandboxes.get(e) || !this.trackedConfigurations.get(e)) throw new Error(`Sandbox ${e} can't be updated because it wasn't created yet`); let t = this.trackedSandboxes.get(e),
                                n = await t.getCodeSandboxURL(); return window.open(n.editorUrl, "_blank"), n.editorUrl }
                        createBundledData(e) { var t; let n; switch (e.type) {
                                case i.SandboxMode.react:
                                    n = new a.SNBReactBundler(e.code, e.packageJSON, null !== (t = e.visual) && void 0 !== t ? t : {}); break;
                                default:
                                    throw new Error(`Unsupported bundler type ${e.type}`) } return { files: n.buildSandboxPayload() } }
                        getCodeForSandboxId(e) { if (!this.trackedConfigurations.get(e)) throw new Error(`Unknown code sandbox for id ${e}`); return this.trackedConfigurations.get(e).code }
                        encodeSandboxData(e, t, n, r, i) { let a = o.SandboxContentAlignment.center; if (r) switch (r) {
                                case "left":
                                    a = o.SandboxContentAlignment.start; break;
                                case "center":
                                    a = o.SandboxContentAlignment.center; break;
                                case "right":
                                    a = o.SandboxContentAlignment.end }
                            let c = { type: e, code: t, packageJSON: n, visual: { horizontalAlignment: a, verticalAlignment: o.SandboxContentAlignment.center, backgroundHex: null != i ? i : void 0, showSandbox: !1 } }; return s.btoaUnicode(JSON.stringify(c)) }
                        setSandboxDataBeforeLoad(e, t) { let n = document.querySelector(`#${e}`); if (!n) throw new Error("Can't inject sandbox data to target. This usually means that you are trying to update sandbox that was already created - this is no-op, use updateSandbox instead.");
                            n.setAttribute("sn-sandbox-data", t) }
                        validateConstructDataFromElement(e) { let t = e.getAttribute("sn-sandbox-data"); if (!t || 0 === t.length) throw new Error("Sandbox doesn't provide any valid data"); return this.validateConstructDataFromEncodedData(t) }
                        validateConstructDataFromEncodedData(e) { let t; try { const n = s.atobUnicode(e);
                                t = JSON.parse(n) } catch (e) { throw new Error("Provided sandbox data corrupted") } if (!t.code || !t.packageJSON || !t.type) throw new Error("Provided sandbox data incomplete"); if (!Object.values(i.SandboxMode).includes(t.type)) throw new Error(`Unsupported sandbox type ${t.type}`); return { payload: this.createBundledData(t), decodedConfiguration: t } } } }, 687: (e, t) => { "use strict";
                    Object.defineProperty(t, "__esModule", { value: !0 }), t.SandboxMode = void 0, (t.SandboxMode || (t.SandboxMode = {})).react = "react" }, 969: (e, t) => { "use strict"; var n;
                    Object.defineProperty(t, "__esModule", { value: !0 }), t.SNBBundler = t.SandboxContentAlignment = void 0, (n = t.SandboxContentAlignment || (t.SandboxContentAlignment = {})).start = "start", n.center = "center", n.end = "end", t.SNBBundler = class { constructor(e, t, n) { this.code = e, this.packageJSON = t, this.visualSettings = n }
                        buildSandboxPayload() { throw new Error("Unable to use generic bundler, please provide type-specific implementation") } } }, 633: (e, t, n) => { "use strict";
                        Object.defineProperty(t, "__esModule", { value: !0 }), t.SNBReactBundler = void 0; const r = n(969);
                        class i extends r.SNBBundler { buildSandboxPayload() { return { "/public/index.html": { code: this.buildIndexFile() }, "/src/App.js": { code: this.buildAppJS() }, "/src/index.js": { code: this.buildIndexJS() }, "/package.json": { code: this.buildPackageJSON() } } }
                                buildIndexFile() { return '\n        <!DOCTYPE html>\n        <html lang="en">\n        <head>\n            <meta charset="utf-8">\n            <meta name="viewport" content="width=device-width, initial-scale=1, shrink-to-fit=no">\n            <meta name="theme-color" content="#000000">\n            <title>Supernova Sandbox App</title>\n        </head>\n        <div id="root"></div>\n        </body>\n\n        </html>' }
                                alignmentToFlexString(e) { switch (e) {
                                        case r.SandboxContentAlignment.start:
                                            return "flex-start";
                                        case r.SandboxContentAlignment.center:
                                            return "center";
                                        case r.SandboxContentAlignment.end:
                                            return "flex-end" } }
                                buildAppJS() { return this.code }
                                buildIndexJS() { var e, t; return `\n        import ReactDOM from "react-dom";\n        import React from "react";\n        import App from "./App";\n\n        /* Configure body style */\n        document.body.style.margin = "0px";\n\n        ReactDOM.render(\n            <div style={{\n                height: "100vh",\n                display: "flex",\n                justifyContent: "${this.alignmentToFlexString(null!==(e=this.visualSettings.horizontalAlignment)&&void 0!==e?e:r.SandboxContentAlignment.center)}",\n                alignItems: "${this.alignmentToFlexString(null!==(t=this.visualSettings.verticalAlignment)&&void 0!==t?t:r.SandboxContentAlignment.center)}",\n                background: "${this.visualSettings.backgroundHex?`#${this.visualSettings.backgroundHex}`:"transparent"}"\n            }}>\n                <App />\n            </div>,\n            document.getElementById("root")\n        );`}buildPackageJSON(){return this.packageJSON}}t.SNBReactBundler=i},339:(e,t)=>{"use strict";Object.defineProperty(t,"__esModule",{value:!0}),t.atobUnicode=t.btoaUnicode=void 0,t.btoaUnicode=function(e){return btoa(encodeURIComponent(e).replace(/%([0-9A-F]{2})/g,(function(e,t){return String.fromCharCode(parseInt(t,16))})))},t.atobUnicode=function(e){return decodeURIComponent(Array.prototype.map.call(atob(e),(function(e){return"%"+("00"+e.charCodeAt(0).toString(16)).slice(-2)})).join(""))}}},t={};function n(r){var i=t[r];if(void 0!==i)return i.exports;var o=t[r]={id:r,loaded:!1,exports:{}};return e[r](o,o.exports,n),o.loaded=!0,o.exports}n.n=e=>{var t=e&&e.__esModule?()=>e.default:()=>e;return n.d(t,{a:t}),t},n.d=(e,t)=>{for(var r in t)n.o(t,r)&&!n.o(e,r)&&Object.defineProperty(e,r,{enumerable:!0,get:t[r]})},n.g=function(){if("object"==typeof globalThis)return globalThis;try{return this||new Function("return this")()}catch(e){if("object"==typeof window)return window}}(),n.o=(e,t)=>Object.prototype.hasOwnProperty.call(e,t),n.r=e=>{"undefined"!=typeof Symbol&&Symbol.toStringTag&&Object.defineProperty(e,Symbol.toStringTag,{value:"Module"}),Object.defineProperty(e,"__esModule",{value:!0})},n.nmd=e=>(e.paths=[],e.children||(e.children=[]),e),(()=>{"use strict";const e=n(191);window.sandboxEngine=new e.SNBComponentSandboxEngine})()})();
//# sourceMappingURL=rtcp-core.js.map