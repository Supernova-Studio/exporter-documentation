/*! For license information please see sandbox.js.LICENSE.txt */
(()=>{
    var e = {
        342: e=>{
            "use strict";
            var a, n = Object.create, i = Object.defineProperty, o = Object.getOwnPropertyDescriptor, s = Object.getOwnPropertyNames, t = Object.getPrototypeOf, r = Object.prototype.hasOwnProperty, c = (e,a)=>function() {
                return a || (0,
                e[s(e)[0]])((a = {
                    exports: {}
                }).exports, a),
                a.exports
            }
            , p = (e,a,n,t)=>{
                if (a && "object" == typeof a || "function" == typeof a)
                    for (let c of s(a))
                        r.call(e, c) || c === n || i(e, c, {
                            get: ()=>a[c],
                            enumerable: !(t = o(a, c)) || t.enumerable
                        });
                return e
            }
            , l = (e,a,o)=>(o = null != e ? n(t(e)) : {},
            p(!a && e && e.__esModule ? o : i(o, "default", {
                value: e,
                enumerable: !0
            }), e)), u = (e,a,n)=>(((e,a,n)=>{
                a in e ? i(e, a, {
                    enumerable: !0,
                    configurable: !0,
                    writable: !0,
                    value: n
                }) : e[a] = n
            }
            )(e, "symbol" != typeof a ? a + "" : a, n),
            n), d = (e,a,n)=>{
                if (!a.has(e))
                    throw TypeError("Cannot " + n)
            }
            , m = (e,a,n)=>(d(e, a, "read from private field"),
            n ? n.call(e) : a.get(e)), x = (e,a,n)=>{
                if (a.has(e))
                    throw TypeError("Cannot add the same private member more than once");
                a instanceof WeakSet ? a.add(e) : a.set(e, n)
            }
            , v = (e,a,n,i)=>(d(e, a, "write to private field"),
            i ? i.call(e, n) : a.set(e, n),
            n), f = (e,a,n)=>(d(e, a, "access private method"),
            n), h = c({
                "../../node_modules/.pnpm/cuid@2.1.8/node_modules/cuid/lib/pad.js"(e, a) {
                    a.exports = function(e, a) {
                        var n = "000000000" + e;
                        return n.substr(n.length - a)
                    }
                }
            }), b = c({
                "../../node_modules/.pnpm/cuid@2.1.8/node_modules/cuid/lib/fingerprint.browser.js"(e, a) {
                    var n = h()
                      , i = "object" == typeof window ? window : self
                      , o = Object.keys(i).length
                      , s = n(((navigator.mimeTypes ? navigator.mimeTypes.length : 0) + navigator.userAgent.length).toString(36) + o.toString(36), 4);
                    a.exports = function() {
                        return s
                    }
                }
            }), g = c({
                "../../node_modules/.pnpm/cuid@2.1.8/node_modules/cuid/lib/getRandomValue.browser.js"(e, a) {
                    var n, i, o = "undefined" != typeof window && (window.crypto || window.msCrypto) || "undefined" != typeof self && self.crypto;
                    o ? (i = Math.pow(2, 32) - 1,
                    n = function() {
                        return Math.abs(o.getRandomValues(new Uint32Array(1))[0] / i)
                    }
                    ) : n = Math.random,
                    a.exports = n
                }
            }), y = c({
                "../../node_modules/.pnpm/cuid@2.1.8/node_modules/cuid/index.js"(e, a) {
                    var n = b()
                      , i = h()
                      , o = g()
                      , s = 0
                      , t = Math.pow(36, 4);
                    function r() {
                        return i((o() * t << 0).toString(36), 4)
                    }
                    function c() {
                        return s = s < t ? s : 0,
                        ++s - 1
                    }
                    function p() {
                        return "c" + (new Date).getTime().toString(36) + i(c().toString(36), 4) + n() + (r() + r())
                    }
                    p.slug = function() {
                        var e = (new Date).getTime().toString(36)
                          , a = c().toString(36).slice(-4)
                          , i = n().slice(0, 1) + n().slice(-1)
                          , o = r().slice(-2);
                        return e.slice(-2) + a + i + o
                    }
                    ,
                    p.isCuid = function(e) {
                        return "string" == typeof e && !!e.startsWith("c")
                    }
                    ,
                    p.isSlug = function(e) {
                        if ("string" != typeof e)
                            return !1;
                        var a = e.length;
                        return a >= 7 && a <= 10
                    }
                    ,
                    p.fingerprint = n,
                    a.exports = p
                }
            }), w = c({
                "../../node_modules/.pnpm/@open-draft+deferred-promise@2.1.0/node_modules/@open-draft/deferred-promise/build/createDeferredExecutor.js"(e) {
                    Object.defineProperty(e, "__esModule", {
                        value: !0
                    }),
                    e.createDeferredExecutor = void 0,
                    e.createDeferredExecutor = function() {
                        const e = (a,n)=>{
                            e.state = "pending",
                            e.resolve = n=>{
                                if ("pending" === e.state)
                                    return e.result = n,
                                    a(n instanceof Promise ? n : Promise.resolve(n).then((a=>(e.state = "fulfilled",
                                    a))))
                            }
                            ,
                            e.reject = a=>{
                                if ("pending" === e.state)
                                    return queueMicrotask((()=>{
                                        e.state = "rejected"
                                    }
                                    )),
                                    n(e.rejectionReason = a)
                            }
                        }
                        ;
                        return e
                    }
                }
            }), k = c({
                "../../node_modules/.pnpm/@open-draft+deferred-promise@2.1.0/node_modules/@open-draft/deferred-promise/build/DeferredPromise.js"(e) {
                    Object.defineProperty(e, "__esModule", {
                        value: !0
                    }),
                    e.DeferredPromise = void 0;
                    var a, n, i, o = w();
                    a = new WeakMap,
                    n = new WeakSet,
                    i = function(e) {
                        return Object.defineProperties(e, {
                            resolve: {
                                configurable: !0,
                                value: this.resolve
                            },
                            reject: {
                                configurable: !0,
                                value: this.reject
                            }
                        })
                    }
                    ,
                    e.DeferredPromise = class extends Promise {
                        constructor(e=null) {
                            const i = (0,
                            o.createDeferredExecutor)();
                            super(((a,n)=>{
                                i(a, n),
                                e?.(i.resolve, i.reject)
                            }
                            )),
                            x(this, n),
                            x(this, a, void 0),
                            u(this, "resolve"),
                            u(this, "reject"),
                            v(this, a, i),
                            this.resolve = m(this, a).resolve,
                            this.reject = m(this, a).reject
                        }
                        get state() {
                            return m(this, a).state
                        }
                        get rejectionReason() {
                            return m(this, a).rejectionReason
                        }
                        then(e, a) {
                            return f(this, n, i).call(this, super.then(e, a))
                        }
                        catch(e) {
                            return f(this, n, i).call(this, super.catch(e))
                        }
                        finally(e) {
                            return f(this, n, i).call(this, super.finally(e))
                        }
                    }
                }
            }), j = c({
                "../../node_modules/.pnpm/@open-draft+deferred-promise@2.1.0/node_modules/@open-draft/deferred-promise/build/index.js"(e) {
                    var a = e && e.__createBinding || (Object.create ? function(e, a, n, i) {
                        void 0 === i && (i = n);
                        var o = Object.getOwnPropertyDescriptor(a, n);
                        o && !("get"in o ? !a.__esModule : o.writable || o.configurable) || (o = {
                            enumerable: !0,
                            get: function() {
                                return a[n]
                            }
                        }),
                        Object.defineProperty(e, i, o)
                    }
                    : function(e, a, n, i) {
                        void 0 === i && (i = n),
                        e[i] = a[n]
                    }
                    )
                      , n = e && e.__exportStar || function(e, n) {
                        for (var i in e)
                            "default" === i || Object.prototype.hasOwnProperty.call(n, i) || a(n, e, i)
                    }
                    ;
                    Object.defineProperty(e, "__esModule", {
                        value: !0
                    }),
                    n(w(), e),
                    n(k(), e)
                }
            }), _ = c({
                "../../node_modules/.pnpm/strict-event-emitter@0.4.3/node_modules/strict-event-emitter/lib/MemoryLeakError.js"(e) {
                    Object.defineProperty(e, "__esModule", {
                        value: !0
                    }),
                    e.MemoryLeakError = void 0;
                    var a = class extends Error {
                        constructor(e, a, n) {
                            super(`Possible EventEmitter memory leak detected. ${n} ${a.toString()} listeners added. Use emitter.setMaxListeners() to increase limit`),
                            u(this, "emitter"),
                            u(this, "type"),
                            u(this, "count"),
                            this.emitter = e,
                            this.type = a,
                            this.count = n,
                            this.name = "MaxListenersExceededWarning"
                        }
                    }
                    ;
                    e.MemoryLeakError = a
                }
            }), S = c({
                "../../node_modules/.pnpm/strict-event-emitter@0.4.3/node_modules/strict-event-emitter/lib/Emitter.js"(e) {
                    Object.defineProperty(e, "__esModule", {
                        value: !0
                    }),
                    e.Emitter = void 0;
                    var a, n, i, o, s, t, r, c, p, l, d, h = _(), b = class {
                        constructor() {
                            x(this, o),
                            x(this, t),
                            x(this, c),
                            x(this, l),
                            x(this, a, void 0),
                            x(this, n, void 0),
                            x(this, i, void 0),
                            v(this, a, new Map),
                            v(this, n, b.defaultMaxListeners),
                            v(this, i, !1)
                        }
                        static listenerCount(e, a) {
                            return e.listenerCount(a)
                        }
                        setMaxListeners(e) {
                            return v(this, n, e),
                            this
                        }
                        getMaxListeners() {
                            return m(this, n)
                        }
                        eventNames() {
                            return Array.from(m(this, a).keys())
                        }
                        emit(e, ...a) {
                            const n = f(this, o, s).call(this, e);
                            return n.forEach((e=>{
                                e.apply(this, a)
                            }
                            )),
                            n.length > 0
                        }
                        addListener(e, t) {
                            f(this, l, d).call(this, "newListener", e, t);
                            const r = f(this, o, s).call(this, e).concat(t);
                            if (m(this, a).set(e, r),
                            m(this, n) > 0 && this.listenerCount(e) > m(this, n) && !m(this, i)) {
                                v(this, i, !0);
                                const a = new h.MemoryLeakError(this,e,this.listenerCount(e));
                                console.warn(a)
                            }
                            return this
                        }
                        on(e, a) {
                            return this.addListener(e, a)
                        }
                        once(e, a) {
                            return this.addListener(e, f(this, c, p).call(this, e, a))
                        }
                        prependListener(e, n) {
                            const i = f(this, o, s).call(this, e);
                            if (i.length > 0) {
                                const o = [n].concat(i);
                                m(this, a).set(e, o)
                            } else
                                m(this, a).set(e, i.concat(n));
                            return this
                        }
                        prependOnceListener(e, a) {
                            return this.prependListener(e, f(this, c, p).call(this, e, a))
                        }
                        removeListener(e, n) {
                            const i = f(this, o, s).call(this, e);
                            return i.length > 0 && (f(this, t, r).call(this, i, n),
                            m(this, a).set(e, i),
                            f(this, l, d).call(this, "removeListener", e, n)),
                            this
                        }
                        off(e, a) {
                            return this.removeListener(e, a)
                        }
                        removeAllListeners(e) {
                            return e ? m(this, a).delete(e) : m(this, a).clear(),
                            this
                        }
                        listeners(e) {
                            return Array.from(f(this, o, s).call(this, e))
                        }
                        listenerCount(e) {
                            return f(this, o, s).call(this, e).length
                        }
                        rawListeners(e) {
                            return this.listeners(e)
                        }
                    }
                    , g = b;
                    a = new WeakMap,
                    n = new WeakMap,
                    i = new WeakMap,
                    o = new WeakSet,
                    s = function(e) {
                        return m(this, a).get(e) || []
                    }
                    ,
                    t = new WeakSet,
                    r = function(e, a) {
                        const n = e.indexOf(a);
                        return n > -1 && e.splice(n, 1),
                        []
                    }
                    ,
                    c = new WeakSet,
                    p = function(e, a) {
                        const n = (...i)=>{
                            this.removeListener(e, n),
                            a.apply(this, i)
                        }
                        ;
                        return n
                    }
                    ,
                    l = new WeakSet,
                    d = function(e, a, n) {
                        this.emit(e, a, n)
                    }
                    ,
                    u(g, "defaultMaxListeners", 10),
                    e.Emitter = g
                }
            }), E = c({
                "../../node_modules/.pnpm/strict-event-emitter@0.4.3/node_modules/strict-event-emitter/lib/index.js"(e) {
                    var a = e && e.__createBinding || (Object.create ? function(e, a, n, i) {
                        void 0 === i && (i = n);
                        var o = Object.getOwnPropertyDescriptor(a, n);
                        o && !("get"in o ? !a.__esModule : o.writable || o.configurable) || (o = {
                            enumerable: !0,
                            get: function() {
                                return a[n]
                            }
                        }),
                        Object.defineProperty(e, i, o)
                    }
                    : function(e, a, n, i) {
                        void 0 === i && (i = n),
                        e[i] = a[n]
                    }
                    )
                      , n = e && e.__exportStar || function(e, n) {
                        for (var i in e)
                            "default" === i || Object.prototype.hasOwnProperty.call(n, i) || a(n, e, i)
                    }
                    ;
                    Object.defineProperty(e, "__esModule", {
                        value: !0
                    }),
                    n(S(), e),
                    n(_(), e)
                }
            }), O = {};
            ((e,a)=>{
                for (var n in a)
                    i(e, n, {
                        get: a[n],
                        enumerable: !0
                    })
            }
            )(O, {
                INJECT_MESSAGE_TYPE: ()=>H,
                MessageReceiver: ()=>N,
                MessageSender: ()=>q,
                Nodebox: ()=>V,
                PREVIEW_LOADED_MESSAGE_TYPE: ()=>G
            }),
            e.exports = (a = O,
            p(i({}, "__esModule", {
                value: !0
            }), a));
            var P = l(y())
              , C = /(%?)(%([sdjo]))/g;
            function z(e, ...a) {
                if (0 === a.length)
                    return e;
                let n = 0
                  , i = e.replace(C, ((e,i,o,s)=>{
                    const t = function(e, a) {
                        switch (a) {
                        case "s":
                            return e;
                        case "d":
                        case "i":
                            return Number(e);
                        case "j":
                            return JSON.stringify(e);
                        case "o":
                            {
                                if ("string" == typeof e)
                                    return e;
                                const a = JSON.stringify(e);
                                return "{}" === a || "[]" === a || /^\[object .+?\]$/.test(a) ? e : a
                            }
                        }
                    }(a[n], s);
                    return i ? e : (n++,
                    t)
                }
                ));
                return n < a.length && (i += ` ${a.slice(n).join(" ")}`),
                i = i.replace(/%{2,2}/g, "%"),
                i
            }
            var M = class extends Error {
                constructor(e, ...a) {
                    super(e),
                    this.message = e,
                    this.name = "Invariant Violation",
                    this.message = z(e, ...a),
                    function(e) {
                        if (!e.stack)
                            return;
                        const a = e.stack.split("\n");
                        a.splice(1, 2),
                        e.stack = a.join("\n")
                    }(this)
                }
            }
              , T = (e,a,...n)=>{
                if (!e)
                    throw new M(a,...n)
            }
            ;
            T.as = (e,a,n,...i)=>{
                if (!a)
                    throw null != e.prototype.name ? new e(z(n, i)) : e(z(n, i))
            }
            ;
            var I = l(j())
              , L = window.localStorage.CSB_EMULATOR_DEBUG
              , A = "[36;1m"
              , F = {
                preview: "[33;1m",
                emulator: "[35;1m",
                runtime: A,
                bridge: "[34m",
                "runtime:worker": A
            };
            function D(e) {
                return function(a, ...n) {
                    if ("true" === L) {
                        const i = ()=>a.includes("sender") ? "[32;1msender" : a.includes("receiver") ? "[31mreceiver" : ""
                          , o = a.replace(/\[.+\]:/, "");
                        console.debug(`${F[e]}${e}:${i()}[0m:${o}`, ...n)
                    }
                }
            }
            var U = D("emulator")
              , N = class {
                constructor() {
                    u(this, "emitter"),
                    u(this, "senderPort", null),
                    this.emitter = new EventTarget,
                    this.waitForHandshake()
                }
                waitForHandshake() {
                    const e = new I.DeferredPromise
                      , a = e=>{
                        const {data: a} = e;
                        U("[message-receiver]: incoming", e),
                        "internal/handshake" === a.type && (T(e.ports.length > 0, "Failed to confirm a MessageReceiver handshake: received event has no ports"),
                        this.senderPort = e.ports[0],
                        this.addMessageListener(),
                        U("[message-receiver]: handshake received!", this.senderPort),
                        this.send("internal/handshake/done"),
                        U("[message-receiver]: finish handshake"))
                    }
                    ;
                    return window.addEventListener("message", a),
                    e.then((()=>{
                        window.removeEventListener("message", a)
                    }
                    )),
                    window.parent.postMessage({
                        type: "internal/ready"
                    }, "*"),
                    e
                }
                addMessageListener() {
                    T(this.senderPort, "[MessageReceiver] Failed to add a message listener: sender port is not defined. Did you forget to await a handshake?"),
                    this.senderPort.onmessage = e=>{
                        const a = e.data;
                        null != a.type && this.emitter.dispatchEvent(new MessageEvent(a.type,{
                            data: a.payload
                        }))
                    }
                }
                on(e, a, n) {
                    this.emitter.addEventListener(e, (async e=>{
                        if (!(e instanceof MessageEvent))
                            return;
                        const {operationId: n, payload: i} = e.data;
                        try {
                            const e = await a(i);
                            this.send("internal/operation/done", {
                                operationId: n,
                                listenerPayload: e
                            })
                        } catch (e) {
                            e instanceof Error && this.send("internal/operation/failed", {
                                operationId: n,
                                error: e
                            })
                        }
                    }
                    ), n)
                }
                send(e, ...a) {
                    T(this.senderPort, '[MessageReceiver] Failed to send a message "%j": sender port is not defined. Did you forget to await a handshake?', e);
                    const n = a[0] || {};
                    U('[message-receiver]: send "%s"', e, n),
                    this.senderPort.postMessage({
                        type: e,
                        payload: n
                    })
                }
            }
              , q = class {
                constructor(e) {
                    this.target = e,
                    u(this, "emitter"),
                    u(this, "channel"),
                    u(this, "receiverPort"),
                    u(this, "receiverReadyPromise"),
                    this.emitter = new EventTarget,
                    this.channel = new MessageChannel,
                    this.receiverPort = this.channel.port1;
                    const a = new I.DeferredPromise
                      , n = e=>{
                        "internal/ready" === e.data.type && (U("[message-sender]: runtime is ready"),
                        a.resolve())
                    }
                    ;
                    window.addEventListener("message", n),
                    a.then((()=>{
                        window.removeEventListener("message", n)
                    }
                    )),
                    this.receiverReadyPromise = a,
                    this.receiverPort.onmessage = e=>{
                        const a = e.data;
                        null != a.type && (U('[message-sender]: emitting "%s" event...', a.type, a.payload),
                        this.emitter.dispatchEvent(new MessageEvent(a.type,{
                            data: a.payload
                        })))
                    }
                }
                async handshake() {
                    const e = new I.DeferredPromise;
                    await this.receiverReadyPromise,
                    U("[message-sender]: sending handshake"),
                    this.target.postMessage({
                        type: "internal/handshake"
                    }, "*", [this.channel.port2]),
                    this.on("internal/handshake/done", (()=>{
                        e.resolve(),
                        clearTimeout(a)
                    }
                    ));
                    const a = setTimeout((()=>{
                        e.reject(new Error("MessageSender: Handshake timeout"))
                    }
                    ), 5e3);
                    return e
                }
                on(e, a, n) {
                    U('[message-sender]: add listener "%s"', e),
                    this.emitter.addEventListener(e, (e=>{
                        e instanceof MessageEvent && a(e)
                    }
                    ), n)
                }
                off(e, a, n) {
                    this.emitter.removeEventListener(e, a, n)
                }
                async send(e, ...a) {
                    const n = new I.DeferredPromise
                      , i = (0,
                    P.default)()
                      , o = a[0] || {};
                    U('[message-sender]: send "%s" (%s)', e, i, o),
                    this.receiverPort.postMessage({
                        type: e,
                        payload: {
                            operationId: i,
                            payload: o
                        }
                    }),
                    U('[message-sender]: adding done listener for "%s" (%s)', e, i);
                    const s = a=>{
                        const {data: o} = a;
                        if (o.operationId === i) {
                            const a = o.listenerPayload || {};
                            U('[message-sender]: resolving "%s (%s) promise!', e, i),
                            n.resolve({
                                ...a,
                                operationId: o.operationId
                            })
                        }
                    }
                      , t = a=>{
                        const {data: o} = a;
                        o.operationId === i && (U('[message-sender]: rejecting "%s (%s) promise!', e, i),
                        n.reject(o.error))
                    }
                    ;
                    return this.on("internal/operation/done", s),
                    this.on("internal/operation/failed", t),
                    n.finally((()=>{
                        this.emitter.removeEventListener("internal/operation/done", s),
                        this.emitter.removeEventListener("internal/operation/failed", t)
                    }
                    ))
                }
            }
              , R = l(j())
              , B = l(y())
              , W = l(E())
              , $ = l(j())
              , J = D("emulator")
              , V = class {
                constructor(e) {
                    this.options = e,
                    u(this, "channel", null),
                    u(this, "isConnected"),
                    u(this, "url"),
                    u(this, "fileSystemApi", null),
                    u(this, "shellApi", null),
                    u(this, "previewApi", null),
                    T(this.options.iframe, 'Failed to create a Nodebox: expected "iframe" argument to be a reference to an <iframe> element but got %j', this.options.iframe),
                    this.url = this.options.runtimeUrl || "https://nodebox-runtime.codesandbox.io",
                    this.isConnected = !1
                }
                async connect() {
                    const {iframe: e, cdnUrl: a} = this.options;
                    J("[message-sender]: Connecting to node emulator...");
                    const n = new R.DeferredPromise;
                    this.url || n.reject(new Error("Nodebox URL is missing. Did you forget to provide it when creating this Nodebox instance?")),
                    T(e.contentWindow, "Failed to create a MessageChannel with the Nodebox iframe: no content window found"),
                    this.channel = new q(e.contentWindow);
                    const i = new R.DeferredPromise;
                    return e.setAttribute("src", this.url),
                    e.addEventListener("load", (()=>{
                        i.resolve()
                    }
                    ), {
                        once: !0
                    }),
                    e.addEventListener("error", (e=>{
                        i.reject(e.error)
                    }
                    ), {
                        once: !0
                    }),
                    await i,
                    J("[message-sender]: IFrame loaded..."),
                    await this.channel.handshake(),
                    J("[message-sender]: Handshake completed..."),
                    this.channel.send("connect", {
                        cdnUrl: a
                    }),
                    this.channel.on("runtime/ready", (()=>{
                        n.resolve()
                    }
                    )),
                    n.then((()=>{
                        J("[message-sender]: Connected to runtime..."),
                        this.isConnected = !0
                    }
                    ))
                }
                get fs() {
                    return T(this.isConnected, 'Failed to access the File System API: consumer is not connected. Did you forget to run "connect()"?'),
                    this.fileSystemApi || (this.fileSystemApi = new class {
                        constructor(e) {
                            this.channel = e
                        }
                        async init(e) {
                            await this.channel.send("fs/init", {
                                files: e
                            })
                        }
                        async readFile(e, a) {
                            const n = await this.channel.send("fs/readFile", {
                                path: e,
                                encoding: a
                            }).catch((a=>{
                                throw new Error(z('Failed to read file at path "%s"', e),{
                                    cause: a
                                })
                            }
                            ));
                            if (!n)
                                throw new Error("File not found");
                            return n.data
                        }
                        async writeFile(e, a, n) {
                            let i, o = !1;
                            "object" == typeof n ? (i = n.encoding,
                            o = !!n.recursive) : "string" == typeof n && (i = n),
                            await this.channel.send("fs/writeFile", {
                                path: e,
                                content: a,
                                encoding: i,
                                recursive: o
                            }).catch((a=>{
                                throw new Error(z('Failed to write file at path "%s"', e),{
                                    cause: a
                                })
                            }
                            ))
                        }
                        async readdir(e) {
                            const a = await this.channel.send("fs/readdir", {
                                path: e
                            }).catch((a=>{
                                throw new Error(z('Failed to read directory at path "%s"', e),{
                                    cause: a
                                })
                            }
                            ));
                            if (!a)
                                throw new Error("Directory not found");
                            return a.data
                        }
                        async mkdir(e, a) {
                            const n = !!a?.recursive;
                            await this.channel.send("fs/mkdir", {
                                path: e,
                                recursive: n
                            }).catch((a=>{
                                throw new Error(z('Failed to make directory at path "%s"', e),{
                                    cause: a
                                })
                            }
                            ))
                        }
                        async stat(e) {
                            const a = await this.channel.send("fs/stat", {
                                path: e
                            }).catch((a=>{
                                throw new Error(z('Failed to stat file at path "%s"', e),{
                                    cause: a
                                })
                            }
                            ));
                            if (!a)
                                throw new Error("File not found");
                            return a.data
                        }
                        async rm(e, a) {
                            const {force: n, recursive: i} = a || {};
                            await this.channel.send("fs/rm", {
                                path: e,
                                force: n,
                                recursive: i
                            }).catch((a=>{
                                throw new Error(z('Failed to remove file at path "%s"', e),{
                                    cause: a
                                })
                            }
                            ))
                        }
                        async watch(e, a, n) {
                            const i = (0,
                            B.default)();
                            return await this.channel.send("fs/watch", {
                                watcherId: i,
                                includes: e,
                                excludes: a
                            }),
                            this.channel.on("fs/watch-event", (({data: e})=>{
                                if (e.watcherId === i && n) {
                                    const a = {
                                        ...e
                                    };
                                    delete a.watcherId,
                                    n(a)
                                }
                            }
                            )),
                            {
                                dispose: ()=>this.channel.send("fs/unwatch", {
                                    watcherId: i
                                })
                            }
                        }
                    }
                    (this.channel)),
                    this.fileSystemApi
                }
                get shell() {
                    return T(this.isConnected, 'Failed to access the Shell API: consumer is not connected. Did you forget to run "connect()"?'),
                    this.shellApi || (this.shellApi = new class {
                        constructor(e) {
                            this.channel = e
                        }
                        create() {
                            return new class {
                                constructor(e) {
                                    this.channel = e,
                                    u(this, "id"),
                                    u(this, "state"),
                                    u(this, "stdout"),
                                    u(this, "stderr"),
                                    u(this, "stdin"),
                                    this.state = "running",
                                    this.stdout = new W.Emitter,
                                    this.stderr = new W.Emitter,
                                    this.stdin = {
                                        write: e=>{
                                            if (!this.id)
                                                throw new Error("Failed to write to stdin, no process is currently running");
                                            return this.channel.send("shell/stdin", {
                                                data: e,
                                                workerId: this.id
                                            })
                                        }
                                    },
                                    this.forwardStdEvents()
                                }
                                forwardStdEvents() {
                                    this.channel.on("worker/tty", (e=>{
                                        const {data: a} = e;
                                        if (a.workerId === this.id)
                                            switch (a.payload.type) {
                                            case "out":
                                                this.stdout.emit("data", a.payload.data);
                                                break;
                                            case "err":
                                                this.stderr.emit("data", a.payload.data)
                                            }
                                    }
                                    ))
                                }
                                async runCommand(e, a, n={}) {
                                    T(!this.id, 'Failed to run "runCommand" on a ShellProcess: there is already a process running.');
                                    const i = await this.channel.send("shell/runCommand", {
                                        command: e,
                                        args: a,
                                        options: n
                                    });
                                    return T(i, 'Failed to run "runCommand" on a ShellProcess: was not able to retrieve a running process.'),
                                    this.id = i.id,
                                    this.state = "running",
                                    i
                                }
                                async on(e, a) {
                                    switch (e) {
                                    case "progress":
                                        return void this.channel.on("worker/progress", (({data: e})=>{
                                            a(e.status)
                                        }
                                        ));
                                    case "exit":
                                        return void this.channel.on("worker/exit", (({data: e})=>{
                                            e.workerId === this.id && a(e.exitCode, e.error)
                                        }
                                        ))
                                    }
                                }
                                async kill() {
                                    T(this.id, 'Failed to run "kill" on a ShellProcess: there is no process running. Did you forget to run it?'),
                                    this.state = "idle",
                                    await this.channel.send("shell/exit", {
                                        id: this.id
                                    }).catch((e=>{
                                        throw new Error(z('Failed to kill shell with ID "%s"', this.id),{
                                            cause: e
                                        })
                                    }
                                    )),
                                    this.id = void 0
                                }
                            }
                            (this.channel)
                        }
                    }
                    (this.channel)),
                    this.shellApi
                }
                get preview() {
                    return T(this.isConnected, 'Failed to access the Preview API: consumer is not connected. Did you forget to run "connect()"?'),
                    this.previewApi || (this.previewApi = new class {
                        constructor(e) {
                            this.channel = e
                        }
                        async waitFor(e, a, n=2e4) {
                            const i = new $.DeferredPromise
                              , o = setTimeout((()=>{
                                i.reject()
                            }
                            ), n)
                              , s = await this.channel.send("preview/get/info", e).catch((a=>{
                                i.reject(new Error(z('Failed to look up preview information for shell ID "%s" (port: %d)', e.sourceShellId, e.port)))
                            }
                            ))
                              , t = s && a(s);
                            return t && i.resolve({
                                url: s.url,
                                port: s.port,
                                sourceShellId: s.sourceShellId
                            }),
                            this.channel.on("preview/port/ready", (({data: e})=>{
                                !t && a(e) && i.resolve({
                                    url: e.url,
                                    port: e.port,
                                    sourceShellId: e.sourceShellId
                                })
                            }
                            )),
                            i.finally((()=>{
                                clearTimeout(o)
                            }
                            ))
                        }
                        async getByShellId(e, a) {
                            return this.waitFor({
                                sourceShellId: e
                            }, (a=>a.sourceShellId === e), a).catch((a=>{
                                throw new Error(z('Failed to get shell by ID "%s"', e),{
                                    cause: a
                                })
                            }
                            ))
                        }
                        async waitForPort(e, a) {
                            return this.waitFor({
                                port: e
                            }, (a=>a.port === e), a).catch((a=>{
                                throw new Error(z("Failed to await port %d", e),{
                                    cause: a
                                })
                            }
                            ))
                        }
                    }
                    (this.channel)),
                    this.previewApi
                }
            }
              , H = "INJECT_AND_INVOKE"
              , G = "PREVIEW_LOADED"
        }
        ,
        313: (e,a,n)=>{
            "use strict";
            var i = n(487)
              , o = function() {
                function e(e, a, n) {
                    void 0 === n && (n = {}),
                    this.status = "idle",
                    this.options = n,
                    this.sandboxSetup = a,
                    this.iframeSelector = e
                }
                return e.prototype.updateOptions = function(e) {
                    i.dequal(this.options, e) || (this.options = e,
                    this.updateSandbox())
                }
                ,
                e.prototype.updateSandbox = function(e, a) {
                    throw void 0 === e && (e = this.sandboxSetup),
                    Error("Method not implemented")
                }
                ,
                e.prototype.destroy = function() {
                    throw Error("Method not implemented")
                }
                ,
                e.prototype.dispatch = function(e) {
                    throw Error("Method not implemented")
                }
                ,
                e.prototype.listen = function(e) {
                    throw Error("Method not implemented")
                }
                ,
                e
            }();
            a.SandpackClient = o
        }
        ,
        179: (e,a,n)=>{
            "use strict";
            var i, o = n(987), s = n(328), t = function() {
                function e() {
                    this.listeners = {},
                    this.listenersCount = 0,
                    this.channelId = Math.floor(1e6 * Math.random()),
                    this.listeners = []
                }
                return e.prototype.cleanup = function() {
                    this.listeners = {},
                    this.listenersCount = 0
                }
                ,
                e.prototype.dispatch = function(e) {
                    Object.values(this.listeners).forEach((function(a) {
                        return a(e)
                    }
                    ))
                }
                ,
                e.prototype.listener = function(e) {
                    var a = this;
                    if ("function" != typeof e)
                        return function() {}
                        ;
                    var n = this.listenersCount;
                    return this.listeners[n] = e,
                    this.listenersCount++,
                    function() {
                        delete a.listeners[n]
                    }
                }
                ,
                e
            }();
            function r(e) {
                return /[a-zA-Z.]/.test(e)
            }
            function c(e) {
                return /[a-zA-Z]/.test(e)
            }
            function p(e) {
                return /[&|]/.test(e)
            }
            function l(e) {
                return /-/.test(e)
            }
            function u(e) {
                return c(e) && e === e.toUpperCase()
            }
            !function(e) {
                e.OR = "OR",
                e.AND = "AND",
                e.PIPE = "PIPE",
                e.Command = "Command",
                e.Argument = "Argument",
                e.String = "String",
                e.EnvVar = "EnvVar"
            }(i || (i = {}));
            var d = new Map([["&&", {
                type: i.AND
            }], ["||", {
                type: i.OR
            }], ["|", {
                type: i.PIPE
            }], ["-", {
                type: i.Argument
            }]])
              , m = 0
              , x = function(e) {
                return "string" == typeof e ? (new TextEncoder).encode(e) : e
            };
            a.EventEmitter = t,
            a.findStartScriptPackageJson = function(e) {
                var a = {}
                  , n = ["dev", "start"];
                try {
                    a = JSON.parse(e).scripts
                } catch (e) {
                    throw s.createError("Could not parse package.json file: " + e.message)
                }
                o.invariant(a, "Failed to start. Please provide a `start` or `dev` script on the package.json");
                for (var t = function(e) {
                    if (n[e]in a) {
                        var o = a[n[e]]
                          , s = {}
                          , t = ""
                          , m = [];
                        return function(e) {
                            var a, n = 0, o = [];
                            function s() {
                                for (var a = ""; r(e[n]) && n < e.length; )
                                    a += e[n],
                                    n++;
                                return {
                                    type: i.Command,
                                    value: a
                                }
                            }
                            function t() {
                                for (var a = ""; p(e[n]) && n < e.length; )
                                    a += e[n],
                                    n++;
                                return d.get(a)
                            }
                            function m() {
                                for (var a = ""; (l(e[n]) || c(e[n])) && n < e.length; )
                                    a += e[n],
                                    n++;
                                return {
                                    type: i.Argument,
                                    value: a
                                }
                            }
                            function x() {
                                var a = e[n]
                                  , o = e[n];
                                for (n++; e[n] !== a && n < e.length; )
                                    o += e[n],
                                    n++;
                                return o += e[n],
                                n++,
                                {
                                    type: i.String,
                                    value: o
                                }
                            }
                            function v() {
                                for (var a = {}, o = function() {
                                    for (var i = "", o = ""; "=" !== e[n] && n < e.length; )
                                        i += e[n],
                                        n++;
                                    for ("=" === e[n] && n++; " " !== e[n] && n < e.length; )
                                        o += e[n],
                                        n++;
                                    a[i] = o
                                }; u(e[n]) && n < e.length; )
                                    o(),
                                    n++;
                                return {
                                    type: i.EnvVar,
                                    value: a
                                }
                            }
                            for (; n < e.length; ) {
                                var f = e[n];
                                if (/\s/.test(f))
                                    n++;
                                else
                                    switch (!0) {
                                    case u(f):
                                        o.push(v());
                                        break;
                                    case r(f):
                                        o.push(s());
                                        break;
                                    case p(f):
                                        o.push(t());
                                        break;
                                    case l(f):
                                        o.push(m());
                                        break;
                                    case a = f, /["']/.test(a):
                                        o.push(x());
                                        break;
                                    default:
                                        throw new Error("Unknown character: " + f)
                                    }
                            }
                            return o
                        }(o).forEach((function(e) {
                            var a = "" === t;
                            e.type === i.EnvVar && (s = e.value),
                            e.type === i.Command && a && (t = e.value),
                            (e.type === i.Argument || !a && e.type === i.Command) && m.push(e.value)
                        }
                        )),
                        {
                            value: [t, m, {
                                env: s
                            }]
                        }
                    }
                }, m = 0; m < n.length; m++) {
                    var x = t(m);
                    if ("object" == typeof x)
                        return x.value
                }
                throw s.createError("Failed to start. Please provide a `start` or `dev` script on the package.json")
            }
            ,
            a.fromBundlerFilesToFS = function(e) {
                return Object.entries(e).reduce((function(e, a) {
                    var n = a[0]
                      , i = a[1];
                    return e[n] = x(i.code),
                    e
                }
                ), {})
            }
            ,
            a.generateRandomId = function() {
                return (+("" + Date.now() + Math.round(1e4 * Math.random()) + (m += 1))).toString(16)
            }
            ,
            a.getMessageFromError = function(e) {
                return "string" == typeof e ? e : "object" == typeof e && "message"in e ? e.message : s.createError("The server could not be reached. Make sure that the node script is running and that a port has been started.")
            }
            ,
            a.readBuffer = function(e) {
                return "string" == typeof e ? e : (new TextDecoder).decode(e)
            }
            ,
            a.writeBuffer = x
        }
        ,
        295: (e,a,n)=>{
            "use strict";
            var i = n(328)
              , o = n(342)
              , s = n(313)
              , t = n(179);
            function r(e, a) {
                return i.__awaiter(this, void 0, void 0, (function() {
                    var n, o, s;
                    return i.__generator(this, (function(t) {
                        return n = e.contentWindow,
                        i.nullthrows(n, "Failed to await preview iframe: no content window found"),
                        o = 0,
                        [2, new Promise((function(n, t) {
                            var r = function() {
                                var c = function() {
                                    clearTimeout(s),
                                    o = 20,
                                    n(),
                                    e.removeEventListener("load", c)
                                };
                                o >= 20 ? t(i.createError("Could not able to connect to preview.")) : (e.setAttribute("src", a),
                                s = setTimeout((function() {
                                    r(),
                                    e.removeEventListener("load", c)
                                }
                                ), 9e4),
                                o += 1,
                                e.addEventListener("load", c))
                            };
                            e.addEventListener("error", (function() {
                                return t(new Error("Iframe error"))
                            }
                            )),
                            e.addEventListener("abort", (function() {
                                return t(new Error("Aborted"))
                            }
                            )),
                            r()
                        }
                        ))]
                    }
                    ))
                }
                ))
            }
            n(987),
            n(487);
            var c = [{
                code: function(e) {
                    var a = e.scope
                      , n = window.history.__proto__
                      , i = []
                      , o = 0
                      , s = function(e) {
                        parent.postMessage({
                            type: "urlchange",
                            url: e,
                            back: o > 0,
                            forward: o < i.length - 1,
                            channelId: a.channelId
                        }, "*")
                    };
                    Object.assign(window.history, {
                        go: function(e) {
                            var a = o + e;
                            if (a >= 0 && a <= i.length - 1) {
                                var t = i[o = a]
                                  , r = t.url
                                  , c = t.state;
                                n.replaceState.call(window.history, c, "", r);
                                var p = document.location.href;
                                s(p),
                                window.dispatchEvent(new PopStateEvent("popstate",{
                                    state: c
                                }))
                            }
                        },
                        back: function() {
                            window.history.go(-1)
                        },
                        forward: function() {
                            window.history.go(1)
                        },
                        pushState: function(e, a, t) {
                            n.replaceState.call(window.history, e, a, t),
                            function(e, a) {
                                i.splice(o + 1),
                                i.push({
                                    url: e,
                                    state: a
                                }),
                                o = i.length - 1
                            }(t, e),
                            s(document.location.href)
                        },
                        replaceState: function(e, a, t) {
                            n.replaceState.call(window.history, e, a, t),
                            i[o] = {
                                state: e,
                                url: t
                            },
                            s(document.location.href)
                        }
                    }),
                    window.addEventListener("message", (function(e) {
                        var a = e.data;
                        "urlback" === a.type ? history.back() : "urlforward" === a.type ? history.forward() : "refresh" === a.type && document.location.reload()
                    }
                    ))
                }
                .toString(),
                id: "historyListener"
            }, {
                code: 'function consoleHook({ scope }) {var t="undefined"!=typeof globalThis?globalThis:"undefined"!=typeof window?window:"undefined"!=typeof globalThis?globalThis:"undefined"!=typeof self?self:{};function r(t){return t&&t.__esModule&&Object.prototype.hasOwnProperty.call(t,"default")?t.default:t}var e={},n={};!function(t){t.__esModule=!0,t.default=["log","debug","info","warn","error","table","clear","time","timeEnd","count","assert","command","result"]}(n);var a,o={},i={};(a=i).__esModule=!0,a.default=function(){var t=function(){return(65536*(1+Math.random())|0).toString(16).substring(1)};return t()+t()+"-"+t()+"-"+t()+"-"+t()+"-"+t()+"-"+Date.now()};var u={},s={__esModule:!0};s.update=s.state=void 0,s.update=function(t){s.state=t};var f={},c={};!function(r){var e=t&&t.__assign||function(){return e=Object.assign||function(t){for(var r,e=1,n=arguments.length;e<n;e++)for(var a in r=arguments[e])Object.prototype.hasOwnProperty.call(r,a)&&(t[a]=r[a]);return t},e.apply(this,arguments)};r.__esModule=!0,r.initialState=void 0,r.initialState={timings:{},count:{}};var n=function(){return"undefined"!=typeof performance&&performance.now?performance.now():Date.now()};r.default=function(t,a){var o,i,u;switch(void 0===t&&(t=r.initialState),a.type){case"COUNT":var s=t.count[a.name]||0;return e(e({},t),{count:e(e({},t.count),(o={},o[a.name]=s+1,o))});case"TIME_START":return e(e({},t),{timings:e(e({},t.timings),(i={},i[a.name]={start:n()},i))});case"TIME_END":var f=t.timings[a.name],c=n(),l=c-f.start;return e(e({},t),{timings:e(e({},t.timings),(u={},u[a.name]=e(e({},f),{end:c,time:l}),u))});default:return t}}}(c),function(r){var e=t&&t.__importDefault||function(t){return t&&t.__esModule?t:{default:t}};r.__esModule=!0;var n=e(c),a=s;r.default=function(t){a.update(n.default(a.state,t))}}(f);var l={__esModule:!0};l.timeEnd=l.timeStart=l.count=void 0,l.count=function(t){return{type:"COUNT",name:t}},l.timeStart=function(t){return{type:"TIME_START",name:t}},l.timeEnd=function(t){return{type:"TIME_END",name:t}};var d=t&&t.__importDefault||function(t){return t&&t.__esModule?t:{default:t}};u.__esModule=!0,u.stop=u.start=void 0;var p=s,h=d(f),m=l;u.start=function(t){h.default(m.timeStart(t))},u.stop=function(t){var r=null===p.state||void 0===p.state?void 0:p.state.timings[t];return r&&!r.end?(h.default(m.timeEnd(t)),{method:"log",data:[t+": "+p.state.timings[t].time+"ms"]}):{method:"warn",data:["Timer \'"+t+"\' does not exist"]}};var y={},v=t&&t.__importDefault||function(t){return t&&t.__esModule?t:{default:t}};y.__esModule=!0,y.increment=void 0;var _=s,b=v(f),g=l;y.increment=function(t){return b.default(g.count(t)),{method:"log",data:[t+": "+_.state.count[t]]}};var M={},T=t&&t.__spreadArrays||function(){for(var t=0,r=0,e=arguments.length;r<e;r++)t+=arguments[r].length;var n=Array(t),a=0;for(r=0;r<e;r++)for(var o=arguments[r],i=0,u=o.length;i<u;i++,a++)n[a]=o[i];return n};M.__esModule=!0,M.test=void 0,M.test=function(t){for(var r=[],e=1;e<arguments.length;e++)r[e-1]=arguments[e];return!t&&(0===r.length&&r.push("console.assert"),{method:"error",data:T(["Assertion failed:"],r)})},function(r){var e=t&&t.__assign||function(){return e=Object.assign||function(t){for(var r,e=1,n=arguments.length;e<n;e++)for(var a in r=arguments[e])Object.prototype.hasOwnProperty.call(r,a)&&(t[a]=r[a]);return t},e.apply(this,arguments)},n=t&&t.__createBinding||(Object.create?function(t,r,e,n){void 0===n&&(n=e),Object.defineProperty(t,n,{enumerable:!0,get:function(){return r[e]}})}:function(t,r,e,n){void 0===n&&(n=e),t[n]=r[e]}),a=t&&t.__setModuleDefault||(Object.create?function(t,r){Object.defineProperty(t,"default",{enumerable:!0,value:r})}:function(t,r){t.default=r}),o=t&&t.__importStar||function(t){if(t&&t.__esModule)return t;var r={};if(null!=t)for(var e in t)"default"!==e&&Object.prototype.hasOwnProperty.call(t,e)&&n(r,t,e);return a(r,t),r},s=t&&t.__spreadArrays||function(){for(var t=0,r=0,e=arguments.length;r<e;r++)t+=arguments[r].length;var n=Array(t),a=0;for(r=0;r<e;r++)for(var o=arguments[r],i=0,u=o.length;i<u;i++,a++)n[a]=o[i];return n},f=t&&t.__importDefault||function(t){return t&&t.__esModule?t:{default:t}};r.__esModule=!0;var c=f(i),l=o(u),d=o(y),p=o(M);r.default=function(t,r,n){var a=n||c.default();switch(t){case"clear":return{method:t,id:a};case"count":return!!(o="string"==typeof r[0]?r[0]:"default")&&e(e({},d.increment(o)),{id:a});case"time":case"timeEnd":var o;return!!(o="string"==typeof r[0]?r[0]:"default")&&("time"===t?(l.start(o),!1):e(e({},l.stop(o)),{id:a}));case"assert":if(0!==r.length){var i=p.test.apply(p,s([r[0]],r.slice(1)));if(i)return e(e({},i),{id:a})}return!1;case"error":return{method:t,id:a,data:r.map((function(t){try{return t.stack||t}catch(r){return t}}))};default:return{method:t,id:a,data:r}}}}(o);var S={},O={};!function(t){var r;t.__esModule=!0,function(t){t[t.infinity=0]="infinity",t[t.minusInfinity=1]="minusInfinity",t[t.minusZero=2]="minusZero"}(r||(r={})),t.default={type:"Arithmetic",lookup:Number,shouldTransform:function(t,r){return"number"===t&&(r===1/0||r===-1/0||function(t){return 1/t==-1/0}(r))},toSerializable:function(t){return t===1/0?r.infinity:t===-1/0?r.minusInfinity:r.minusZero},fromSerializable:function(t){return t===r.infinity?1/0:t===r.minusInfinity?-1/0:t===r.minusZero?-0:t}}}(O);var w={};!function(t){t.__esModule=!0,t.default={type:"Function",lookup:Function,shouldTransform:function(t,r){return"function"==typeof r},toSerializable:function(t){var r="";try{r=t.toString().substring(r.indexOf("{")+1,r.lastIndexOf("}"))}catch(t){}return{name:t.name,body:r,proto:Object.getPrototypeOf(t).constructor.name}},fromSerializable:function(t){try{var r=function(){};return"string"==typeof t.name&&Object.defineProperty(r,"name",{value:t.name,writable:!1}),"string"==typeof t.body&&Object.defineProperty(r,"body",{value:t.body,writable:!1}),"string"==typeof t.proto&&(r.constructor={name:t.proto}),r}catch(r){return t}}}}(w);var A={};!function(t){var r;function e(t){for(var r={},e=0,n=t.attributes;e<n.length;e++){var a=n[e];r[a.name]=a.value}return r}t.__esModule=!0,t.default={type:"HTMLElement",shouldTransform:function(t,r){return r&&r.children&&"string"==typeof r.innerHTML&&"string"==typeof r.tagName},toSerializable:function(t){return{tagName:t.tagName.toLowerCase(),attributes:e(t),innerHTML:t.innerHTML}},fromSerializable:function(t){try{var e=(r||(r=document.implementation.createHTMLDocument("sandbox"))).createElement(t.tagName);e.innerHTML=t.innerHTML;for(var n=0,a=Object.keys(t.attributes);n<a.length;n++){var o=a[n];try{e.setAttribute(o,t.attributes[o])}catch(t){}}return e}catch(r){return t}}}}(A);var j={};!function(r){var e=t&&t.__assign||function(){return e=Object.assign||function(t){for(var r,e=1,n=arguments.length;e<n;e++)for(var a in r=arguments[e])Object.prototype.hasOwnProperty.call(r,a)&&(t[a]=r[a]);return t},e.apply(this,arguments)};r.__esModule=!0,r.default={type:"Map",shouldTransform:function(t,r){return r&&r.constructor&&"Map"===r.constructor.name},toSerializable:function(t){var r={};return t.forEach((function(t,e){var n="object"==typeof e?JSON.stringify(e):e;r[n]=t})),{name:"Map",body:r,proto:Object.getPrototypeOf(t).constructor.name}},fromSerializable:function(t){var r=t.body,n=e({},r);return"string"==typeof t.proto&&(n.constructor={name:t.proto}),n}}}(j);var z={};!function(t){t.__esModule=!0;var r="@t",e=/^#*@(t|r)$/,n=(0,eval)("this"),a="function"==typeof ArrayBuffer,o="function"==typeof Map,i="function"==typeof Set,u=["Int8Array","Uint8Array","Uint8ClampedArray","Int16Array","Uint16Array","Int32Array","Uint32Array","Float32Array","Float64Array"],s=Array.prototype.slice,f={serialize:function(t){return JSON.stringify(t)},deserialize:function(t){return JSON.parse(t)}},c=function(){function t(t,r){this.references=t,this.transforms=r,this.transformsMap=this._makeTransformsMap(),this.circularCandidates=[],this.circularCandidatesDescrs=[],this.circularRefCount=0}return t._createRefMark=function(t){var r=Object.create(null);return r["@r"]=t,r},t.prototype._createCircularCandidate=function(t,r,e){this.circularCandidates.push(t),this.circularCandidatesDescrs.push({parent:r,key:e,refIdx:-1})},t.prototype._applyTransform=function(t,e,n,a){var o=Object.create(null),i=a.toSerializable(t);return"object"==typeof i&&this._createCircularCandidate(t,e,n),o[r]=a.type,o.data=this._handleValue((function(){return i}),e,n),o},t.prototype._handleArray=function(t){for(var r=[],e=function(e){r[e]=n._handleValue((function(){return t[e]}),r,e)},n=this,a=0;a<t.length;a++)e(a);return r},t.prototype._handlePlainObject=function(t){var r,n,a=Object.create(null),o=function(r){if(Reflect.has(t,r)){var n=e.test(r)?"#"+r:r;a[n]=i._handleValue((function(){return t[r]}),a,n)}},i=this;for(var u in t)o(u);var s=null===(n=null===(r=null==t?void 0:t.__proto__)||void 0===r?void 0:r.constructor)||void 0===n?void 0:n.name;return s&&"Object"!==s&&(a.constructor={name:s}),a},t.prototype._handleObject=function(t,r,e){return this._createCircularCandidate(t,r,e),Array.isArray(t)?this._handleArray(t):this._handlePlainObject(t)},t.prototype._ensureCircularReference=function(r){var e=this.circularCandidates.indexOf(r);if(e>-1){var n=this.circularCandidatesDescrs[e];return-1===n.refIdx&&(n.refIdx=n.parent?++this.circularRefCount:0),t._createRefMark(n.refIdx)}return null},t.prototype._handleValue=function(t,r,e){try{var n=t(),a=typeof n,o="object"===a&&null!==n;if(o){var i=this._ensureCircularReference(n);if(i)return i}var u=this._findTransform(a,n);return u?this._applyTransform(n,r,e,u):o?this._handleObject(n,r,e):n}catch(t){try{return this._handleValue((function(){return t instanceof Error?t:new Error(t)}),r,e)}catch(t){return null}}},t.prototype._makeTransformsMap=function(){if(o){var t=new Map;return this.transforms.forEach((function(r){r.lookup&&t.set(r.lookup,r)})),t}},t.prototype._findTransform=function(t,r){if(o&&r&&r.constructor&&(null==(a=this.transformsMap.get(r.constructor))?void 0:a.shouldTransform(t,r)))return a;for(var e=0,n=this.transforms;e<n.length;e++){var a;if((a=n[e]).shouldTransform(t,r))return a}},t.prototype.transform=function(){for(var r=this,e=[this._handleValue((function(){return r.references}),null,null)],n=0,a=this.circularCandidatesDescrs;n<a.length;n++){var o=a[n];o.refIdx>0&&(e[o.refIdx]=o.parent[o.key],o.parent[o.key]=t._createRefMark(o.refIdx))}return e},t}(),l=function(){function t(t,r){this.activeTransformsStack=[],this.visitedRefs=Object.create(null),this.references=t,this.transformMap=r}return t.prototype._handlePlainObject=function(t){var r=Object.create(null);for(var n in"constructor"in t&&(t.constructor&&"string"==typeof t.constructor.name||(t.constructor={name:"Object"})),t)t.hasOwnProperty(n)&&(this._handleValue(t[n],t,n),e.test(n)&&(r[n.substring(1)]=t[n],delete t[n]));for(var a in r)t[a]=r[a]},t.prototype._handleTransformedObject=function(t,e,n){var a=t[r],o=this.transformMap[a];if(!o)throw new Error("Can\'t find transform for \\""+a+\'" type.\');this.activeTransformsStack.push(t),this._handleValue(t.data,t,"data"),this.activeTransformsStack.pop(),e[n]=o.fromSerializable(t.data)},t.prototype._handleCircularSelfRefDuringTransform=function(t,r,e){var n=this.references;Object.defineProperty(r,e,{val:void 0,configurable:!0,enumerable:!0,get:function(){return void 0===this.val&&(this.val=n[t]),this.val},set:function(t){this.val=t}})},t.prototype._handleCircularRef=function(t,r,e){this.activeTransformsStack.includes(this.references[t])?this._handleCircularSelfRefDuringTransform(t,r,e):(this.visitedRefs[t]||(this.visitedRefs[t]=!0,this._handleValue(this.references[t],this.references,t)),r[e]=this.references[t])},t.prototype._handleValue=function(t,e,n){if("object"==typeof t&&null!==t){var a=t["@r"];if(void 0!==a)this._handleCircularRef(a,e,n);else if(t[r])this._handleTransformedObject(t,e,n);else if(Array.isArray(t))for(var o=0;o<t.length;o++)this._handleValue(t[o],t,o);else this._handlePlainObject(t)}},t.prototype.transform=function(){return this.visitedRefs[0]=!0,this._handleValue(this.references[0],this.references,0),this.references[0]},t}(),d=[{type:"[[NaN]]",shouldTransform:function(t,r){return"number"===t&&isNaN(r)},toSerializable:function(){return""},fromSerializable:function(){return NaN}},{type:"[[undefined]]",shouldTransform:function(t){return"undefined"===t},toSerializable:function(){return""},fromSerializable:function(){}},{type:"[[Date]]",lookup:Date,shouldTransform:function(t,r){return r instanceof Date},toSerializable:function(t){return t.getTime()},fromSerializable:function(t){var r=new Date;return r.setTime(t),r}},{type:"[[RegExp]]",lookup:RegExp,shouldTransform:function(t,r){return r instanceof RegExp},toSerializable:function(t){var r={src:t.source,flags:""};return t.globalThis&&(r.flags+="g"),t.ignoreCase&&(r.flags+="i"),t.multiline&&(r.flags+="m"),r},fromSerializable:function(t){return new RegExp(t.src,t.flags)}},{type:"[[Error]]",lookup:Error,shouldTransform:function(t,r){return r instanceof Error},toSerializable:function(t){var r,e;return t.stack||null===(e=(r=Error).captureStackTrace)||void 0===e||e.call(r,t),{name:t.name,message:t.message,stack:t.stack}},fromSerializable:function(t){var r=new(n[t.name]||Error)(t.message);return r.stack=t.stack,r}},{type:"[[ArrayBuffer]]",lookup:a&&ArrayBuffer,shouldTransform:function(t,r){return a&&r instanceof ArrayBuffer},toSerializable:function(t){var r=new Int8Array(t);return s.call(r)},fromSerializable:function(t){if(a){var r=new ArrayBuffer(t.length);return new Int8Array(r).set(t),r}return t}},{type:"[[TypedArray]]",shouldTransform:function(t,r){if(a)return ArrayBuffer.isView(r)&&!(r instanceof DataView);for(var e=0,o=u;e<o.length;e++){var i=o[e];if("function"==typeof n[i]&&r instanceof n[i])return!0}return!1},toSerializable:function(t){return{ctorName:t.constructor.name,arr:s.call(t)}},fromSerializable:function(t){return"function"==typeof n[t.ctorName]?new n[t.ctorName](t.arr):t.arr}},{type:"[[Map]]",lookup:o&&Map,shouldTransform:function(t,r){return o&&r instanceof Map},toSerializable:function(t){var r=[];return t.forEach((function(t,e){r.push(e),r.push(t)})),r},fromSerializable:function(t){if(o){for(var r=new Map,e=0;e<t.length;e+=2)r.set(t[e],t[e+1]);return r}for(var n=[],a=0;a<t.length;a+=2)n.push([t[e],t[e+1]]);return n}},{type:"[[Set]]",lookup:i&&Set,shouldTransform:function(t,r){return i&&r instanceof Set},toSerializable:function(t){var r=[];return t.forEach((function(t){r.push(t)})),r},fromSerializable:function(t){if(i){for(var r=new Set,e=0;e<t.length;e++)r.add(t[e]);return r}return t}}],p=function(){function t(t){this.transforms=[],this.transformsMap=Object.create(null),this.serializer=t||f,this.addTransforms(d)}return t.prototype.addTransforms=function(t){for(var r=0,e=t=Array.isArray(t)?t:[t];r<e.length;r++){var n=e[r];if(this.transformsMap[n.type])throw new Error(\'Transform with type "\'+n.type+\'" was already added.\');this.transforms.push(n),this.transformsMap[n.type]=n}return this},t.prototype.removeTransforms=function(t){for(var r=0,e=t=Array.isArray(t)?t:[t];r<e.length;r++){var n=e[r],a=this.transforms.indexOf(n);a>-1&&this.transforms.splice(a,1),delete this.transformsMap[n.type]}return this},t.prototype.encode=function(t){var r=new c(t,this.transforms).transform();return this.serializer.serialize(r)},t.prototype.decode=function(t){var r=this.serializer.deserialize(t);return new l(r,this.transformsMap).transform()},t}();t.default=p}(z);var E=t&&t.__importDefault||function(t){return t&&t.__esModule?t:{default:t}};S.__esModule=!0,S.Decode=P=S.Encode=void 0;var k=E(O),C=E(w),D=E(A),I=E(j),N=E(z),R=[D.default,C.default,k.default,I.default],x=new N.default;x.addTransforms(R);var P=S.Encode=function(t){return JSON.parse(x.encode(t))};S.Decode=function(t){return x.decode(JSON.stringify(t))},function(r){var e=t&&t.__importDefault||function(t){return t&&t.__esModule?t:{default:t}};r.__esModule=!0;var a=e(n),i=e(o),u=S;r.default=function(t,r,e){void 0===e&&(e=!0);for(var n=t,o={pointers:{},src:{npm:"https://npmjs.com/package/console-feed",github:"https://github.com/samdenty99/console-feed"}},s=function(t){var a=n[t];n[t]=function(){a.apply(this,arguments);var n=[].slice.call(arguments);setTimeout((function(){var a=i.default(t,n);if(a){var o=a;e&&(o=u.Encode(a)),r(o,a)}}))},o.pointers[t]=a},f=0,c=a.default;f<c.length;f++)s(c[f]);return n.feed=o,n}}(e),r(e)(window.console,(function(t){var r=P(t);parent.postMessage({type:"console",codesandbox:!0,log:Array.isArray(r)?r[0]:r,channelId:scope.channelId},"*")}));\n\n};',
                id: "consoleHook"
            }]
              , p = function(e) {
                function a(a, n, s) {
                    void 0 === s && (s = {});
                    var r = e.call(this, a, n, i.__assign(i.__assign({}, s), {
                        bundlerURL: s.bundlerURL
                    })) || this;
                    return r._modulesCache = new Map,
                    r.messageChannelId = t.generateRandomId(),
                    r._initPromise = null,
                    r.emitter = new t.EventEmitter,
                    r.manageIframes(a),
                    r.emulator = new o.Nodebox({
                        iframe: r.emulatorIframe,
                        runtimeUrl: r.options.bundlerURL
                    }),
                    r.updateSandbox(n),
                    r
                }
                return i.__extends(a, e),
                a.prototype._init = function(e) {
                    return i.__awaiter(this, void 0, void 0, (function() {
                        return i.__generator(this, (function(a) {
                            switch (a.label) {
                            case 0:
                                return [4, this.emulator.connect()];
                            case 1:
                                return a.sent(),
                                [4, this.emulator.fs.init(e)];
                            case 2:
                                return a.sent(),
                                [4, this.globalListeners()];
                            case 3:
                                return a.sent(),
                                [2]
                            }
                        }
                        ))
                    }
                    ))
                }
                ,
                a.prototype.compile = function(e) {
                    return i.__awaiter(this, void 0, void 0, (function() {
                        var a, n;
                        return i.__generator(this, (function(i) {
                            switch (i.label) {
                            case 0:
                                return i.trys.push([0, 5, , 6]),
                                this.status = "initializing",
                                this.dispatch({
                                    type: "start",
                                    firstLoad: !0
                                }),
                                this._initPromise || (this._initPromise = this._init(e)),
                                [4, this._initPromise];
                            case 1:
                                return i.sent(),
                                this.dispatch({
                                    type: "connected"
                                }),
                                [4, this.createShellProcessFromTask(e)];
                            case 2:
                                return a = i.sent().id,
                                [4, this.createPreviewURLFromId(a)];
                            case 3:
                                return i.sent(),
                                [4, this.setLocationURLIntoIFrame()];
                            case 4:
                                return i.sent(),
                                this.dispatchDoneMessage(),
                                [3, 6];
                            case 5:
                                return n = i.sent(),
                                this.dispatch({
                                    type: "action",
                                    action: "notification",
                                    notificationType: "error",
                                    title: t.getMessageFromError(n)
                                }),
                                this.dispatch({
                                    type: "done",
                                    compilatonError: !0
                                }),
                                [3, 6];
                            case 6:
                                return [2]
                            }
                        }
                        ))
                    }
                    ))
                }
                ,
                a.prototype.createShellProcessFromTask = function(e) {
                    return i.__awaiter(this, void 0, void 0, (function() {
                        var a, n, o = this;
                        return i.__generator(this, (function(s) {
                            switch (s.label) {
                            case 0:
                                return a = t.readBuffer(e["/package.json"]),
                                this.emulatorCommand = t.findStartScriptPackageJson(a),
                                this.emulatorShellProcess = this.emulator.shell.create(),
                                [4, this.emulatorShellProcess.on("exit", (function(e) {
                                    o.dispatch({
                                        type: "action",
                                        action: "notification",
                                        notificationType: "error",
                                        title: i.createError("Error: process.exit(" + e + ") called.")
                                    })
                                }
                                ))];
                            case 1:
                                return s.sent(),
                                [4, this.emulatorShellProcess.on("progress", (function(e) {
                                    var a, n;
                                    if ("command_running" === e.state || "starting_command" === e.state)
                                        return o.dispatch({
                                            type: "shell/progress",
                                            data: i.__assign(i.__assign({}, e), {
                                                command: [null === (a = o.emulatorCommand) || void 0 === a ? void 0 : a[0], null === (n = o.emulatorCommand) || void 0 === n ? void 0 : n[1].join(" ")].join(" ")
                                            })
                                        }),
                                        void (o.status = "installing-dependencies");
                                    o.dispatch({
                                        type: "shell/progress",
                                        data: e
                                    })
                                }
                                ))];
                            case 2:
                                return s.sent(),
                                this.emulatorShellProcess.stdout.on("data", (function(e) {
                                    o.dispatch({
                                        type: "stdout",
                                        payload: {
                                            data: e,
                                            type: "out"
                                        }
                                    })
                                }
                                )),
                                this.emulatorShellProcess.stderr.on("data", (function(e) {
                                    o.dispatch({
                                        type: "stdout",
                                        payload: {
                                            data: e,
                                            type: "err"
                                        }
                                    })
                                }
                                )),
                                [4, (n = this.emulatorShellProcess).runCommand.apply(n, this.emulatorCommand)];
                            case 3:
                                return [2, s.sent()]
                            }
                        }
                        ))
                    }
                    ))
                }
                ,
                a.prototype.createPreviewURLFromId = function(e) {
                    return i.__awaiter(this, void 0, void 0, (function() {
                        var a;
                        return i.__generator(this, (function(n) {
                            switch (n.label) {
                            case 0:
                                return this.iframePreviewUrl = void 0,
                                [4, this.emulator.preview.getByShellId(e)];
                            case 1:
                                return a = n.sent().url,
                                this.iframePreviewUrl = a + this.options.startRoute,
                                [2]
                            }
                        }
                        ))
                    }
                    ))
                }
                ,
                a.prototype.manageIframes = function(e) {
                    var a, n, o;
                    if ("string" == typeof e) {
                        var s = document.querySelector(e);
                        i.nullthrows(s, "The element '" + e + "' was not found"),
                        this.iframe = document.createElement("iframe")
                    } else
                        this.iframe = e;
                    n = this.iframe,
                    o = this.options,
                    n.style.border = "0",
                    n.style.width = o.width || "100%",
                    n.style.height = o.height || "100%",
                    n.style.overflow = "hidden",
                    n.allow = "cross-origin-isolated",
                    i.nullthrows(this.iframe.parentNode, "The given iframe does not have a parent."),
                    this.emulatorIframe = document.createElement("iframe"),
                    this.emulatorIframe.classList.add("sp-bridge-frame"),
                    null === (a = this.iframe.parentNode) || void 0 === a || a.appendChild(this.emulatorIframe)
                }
                ,
                a.prototype.setLocationURLIntoIFrame = function() {
                    return i.__awaiter(this, void 0, void 0, (function() {
                        return i.__generator(this, (function(e) {
                            switch (e.label) {
                            case 0:
                                return this.iframePreviewUrl ? [4, r(this.iframe, this.iframePreviewUrl)] : [3, 2];
                            case 1:
                                e.sent(),
                                e.label = 2;
                            case 2:
                                return [2]
                            }
                        }
                        ))
                    }
                    ))
                }
                ,
                a.prototype.dispatchDoneMessage = function() {
                    this.status = "done",
                    this.dispatch({
                        type: "done",
                        compilatonError: !1
                    }),
                    this.iframePreviewUrl && this.dispatch({
                        type: "urlchange",
                        url: this.iframePreviewUrl,
                        back: !1,
                        forward: !1
                    })
                }
                ,
                a.prototype.globalListeners = function() {
                    return i.__awaiter(this, void 0, void 0, (function() {
                        var e = this;
                        return i.__generator(this, (function(a) {
                            switch (a.label) {
                            case 0:
                                return window.addEventListener("message", (function(a) {
                                    var n, i;
                                    a.data.type === o.PREVIEW_LOADED_MESSAGE_TYPE && (n = e.iframe,
                                    i = e.messageChannelId,
                                    c.forEach((function(e) {
                                        var a, s = e.code, t = {
                                            uid: e.id,
                                            type: o.INJECT_MESSAGE_TYPE,
                                            code: "exports.activate = " + s,
                                            scope: {
                                                channelId: i
                                            }
                                        };
                                        null === (a = n.contentWindow) || void 0 === a || a.postMessage(t, "*")
                                    }
                                    ))),
                                    "urlchange" === a.data.type && a.data.channelId === e.messageChannelId ? e.dispatch({
                                        type: "urlchange",
                                        url: a.data.url,
                                        back: a.data.back,
                                        forward: a.data.forward
                                    }) : a.data.channelId === e.messageChannelId && e.dispatch(a.data)
                                }
                                )),
                                [4, this.emulator.fs.watch(["*"], [".next", "node_modules", "build", "dist", "vendor", ".config", ".vuepress"], (function(a) {
                                    return i.__awaiter(e, void 0, void 0, (function() {
                                        var e, n, o, s, r;
                                        return i.__generator(this, (function(i) {
                                            switch (i.label) {
                                            case 0:
                                                return a ? (n = "newPath"in (e = a) ? e.newPath : "path"in e ? e.path : "",
                                                [4, this.emulator.fs.stat(n)]) : [2];
                                            case 1:
                                                if ("file" !== i.sent().type)
                                                    return [2, null];
                                                i.label = 2;
                                            case 2:
                                                switch (i.trys.push([2, 10, , 11]),
                                                e.type) {
                                                case "change":
                                                case "create":
                                                    return [3, 3];
                                                case "remove":
                                                    return [3, 5];
                                                case "rename":
                                                    return [3, 6];
                                                case "close":
                                                    return [3, 8]
                                                }
                                                return [3, 9];
                                            case 3:
                                                return [4, this.emulator.fs.readFile(e.path, "utf8")];
                                            case 4:
                                                return o = i.sent(),
                                                this.dispatch({
                                                    type: "fs/change",
                                                    path: e.path,
                                                    content: o
                                                }),
                                                this._modulesCache.set(e.path, t.writeBuffer(o)),
                                                [3, 9];
                                            case 5:
                                                return this.dispatch({
                                                    type: "fs/remove",
                                                    path: e.path
                                                }),
                                                this._modulesCache.delete(e.path),
                                                [3, 9];
                                            case 6:
                                                return this.dispatch({
                                                    type: "fs/remove",
                                                    path: e.oldPath
                                                }),
                                                this._modulesCache.delete(e.oldPath),
                                                [4, this.emulator.fs.readFile(e.newPath, "utf8")];
                                            case 7:
                                                return s = i.sent(),
                                                this.dispatch({
                                                    type: "fs/change",
                                                    path: e.newPath,
                                                    content: s
                                                }),
                                                this._modulesCache.set(e.newPath, t.writeBuffer(s)),
                                                [3, 9];
                                            case 8:
                                                return [3, 9];
                                            case 9:
                                                return [3, 11];
                                            case 10:
                                                return r = i.sent(),
                                                this.dispatch({
                                                    type: "action",
                                                    action: "notification",
                                                    notificationType: "error",
                                                    title: t.getMessageFromError(r)
                                                }),
                                                [3, 11];
                                            case 11:
                                                return [2]
                                            }
                                        }
                                        ))
                                    }
                                    ))
                                }
                                ))];
                            case 1:
                                return a.sent(),
                                [2]
                            }
                        }
                        ))
                    }
                    ))
                }
                ,
                a.prototype.restartShellProcess = function() {
                    var e;
                    return i.__awaiter(this, void 0, void 0, (function() {
                        return i.__generator(this, (function(a) {
                            switch (a.label) {
                            case 0:
                                return this.emulatorShellProcess && this.emulatorCommand ? (this.dispatch({
                                    type: "start",
                                    firstLoad: !0
                                }),
                                this.status = "initializing",
                                [4, this.emulatorShellProcess.kill()]) : [3, 3];
                            case 1:
                                return a.sent(),
                                null === (e = this.iframe) || void 0 === e || e.removeAttribute("attr"),
                                this.emulator.fs.rm("/node_modules/.vite", {
                                    recursive: !0,
                                    force: !0
                                }),
                                [4, this.compile(Object.fromEntries(this._modulesCache))];
                            case 2:
                                a.sent(),
                                a.label = 3;
                            case 3:
                                return [2]
                            }
                        }
                        ))
                    }
                    ))
                }
                ,
                a.prototype.updateSandbox = function(e) {
                    var a, n = this, i = t.fromBundlerFilesToFS(e.files);
                    "running" !== (null === (a = this.emulatorShellProcess) || void 0 === a ? void 0 : a.state) ? (this.dispatch({
                        codesandbox: !0,
                        modules: i,
                        template: e.template,
                        type: "compile"
                    }),
                    Object.entries(i).forEach((function(e) {
                        var a = e[0]
                          , i = e[1];
                        n._modulesCache.set(a, t.writeBuffer(i))
                    }
                    ))) : Object.entries(i).forEach((function(e) {
                        var a = e[0]
                          , i = e[1];
                        n._modulesCache.get(a) && t.readBuffer(i) === t.readBuffer(n._modulesCache.get(a)) || n.emulator.fs.writeFile(a, i, {
                            recursive: !0
                        })
                    }
                    ))
                }
                ,
                a.prototype.dispatch = function(e) {
                    var a, n;
                    return i.__awaiter(this, void 0, void 0, (function() {
                        return i.__generator(this, (function(i) {
                            switch (i.label) {
                            case 0:
                                switch (e.type) {
                                case "compile":
                                    return [3, 1];
                                case "refresh":
                                    return [3, 2];
                                case "urlback":
                                case "urlforward":
                                    return [3, 4];
                                case "shell/restart":
                                    return [3, 5];
                                case "shell/openPreview":
                                    return [3, 6]
                                }
                                return [3, 7];
                            case 1:
                                return this.compile(e.modules),
                                [3, 8];
                            case 2:
                                return [4, this.setLocationURLIntoIFrame()];
                            case 3:
                                return i.sent(),
                                [3, 8];
                            case 4:
                                return null === (n = null === (a = this.iframe) || void 0 === a ? void 0 : a.contentWindow) || void 0 === n || n.postMessage(e, "*"),
                                [3, 8];
                            case 5:
                                return this.restartShellProcess(),
                                [3, 8];
                            case 6:
                                return window.open(this.iframePreviewUrl, "_blank"),
                                [3, 8];
                            case 7:
                                this.emitter.dispatch(e),
                                i.label = 8;
                            case 8:
                                return [2]
                            }
                        }
                        ))
                    }
                    ))
                }
                ,
                a.prototype.listen = function(e) {
                    return this.emitter.listener(e)
                }
                ,
                a.prototype.destroy = function() {
                    this.emulatorIframe.remove(),
                    this.emitter.cleanup()
                }
                ,
                a
            }(s.SandpackClient);
            a.SandpackNode = p
        }
        ,
        232: (e,a,n)=>{
            "use strict";
            var i = n(328)
              , o = n(487)
              , s = n(313);
            n(987);
            var t = function() {
                function e(e, a, n) {
                    var o = this;
                    this.type = e,
                    this.handleMessage = a,
                    this.protocol = n,
                    this._disposeMessageListener = this.protocol.channelListen((function(e) {
                        return i.__awaiter(o, void 0, void 0, (function() {
                            var a, n, o, s;
                            return i.__generator(this, (function(i) {
                                switch (i.label) {
                                case 0:
                                    if (e.type !== this.getTypeId() || !e.method)
                                        return [3, 4];
                                    a = e,
                                    i.label = 1;
                                case 1:
                                    return i.trys.push([1, 3, , 4]),
                                    [4, this.handleMessage(a)];
                                case 2:
                                    return n = i.sent(),
                                    s = {
                                        type: this.getTypeId(),
                                        msgId: a.msgId,
                                        result: n
                                    },
                                    this.protocol.dispatch(s),
                                    [3, 4];
                                case 3:
                                    return o = i.sent(),
                                    s = {
                                        type: this.getTypeId(),
                                        msgId: a.msgId,
                                        error: {
                                            message: o.message
                                        }
                                    },
                                    this.protocol.dispatch(s),
                                    [3, 4];
                                case 4:
                                    return [2]
                                }
                            }
                            ))
                        }
                        ))
                    }
                    ))
                }
                return e.prototype.getTypeId = function() {
                    return "protocol-" + this.type
                }
                ,
                e.prototype.dispose = function() {
                    this._disposeMessageListener()
                }
                ,
                e
            }()
              , r = function() {
                function e(e, a) {
                    this.globalListeners = {},
                    this.globalListenersCount = 0,
                    this.channelListeners = {},
                    this.channelListenersCount = 0,
                    this.channelId = Math.floor(1e6 * Math.random()),
                    this.frameWindow = e.contentWindow,
                    this.origin = a,
                    this.globalListeners = [],
                    this.channelListeners = [],
                    this.eventListener = this.eventListener.bind(this),
                    "undefined" != typeof window && window.addEventListener("message", this.eventListener)
                }
                return e.prototype.cleanup = function() {
                    window.removeEventListener("message", this.eventListener),
                    this.globalListeners = {},
                    this.channelListeners = {},
                    this.globalListenersCount = 0,
                    this.channelListenersCount = 0
                }
                ,
                e.prototype.register = function() {
                    this.frameWindow && this.frameWindow.postMessage({
                        type: "register-frame",
                        origin: document.location.origin,
                        id: this.channelId
                    }, this.origin)
                }
                ,
                e.prototype.dispatch = function(e) {
                    this.frameWindow && this.frameWindow.postMessage(i.__assign({
                        $id: this.channelId,
                        codesandbox: !0
                    }, e), this.origin)
                }
                ,
                e.prototype.globalListen = function(e) {
                    var a = this;
                    if ("function" != typeof e)
                        return function() {}
                        ;
                    var n = this.globalListenersCount;
                    return this.globalListeners[n] = e,
                    this.globalListenersCount++,
                    function() {
                        delete a.globalListeners[n]
                    }
                }
                ,
                e.prototype.channelListen = function(e) {
                    var a = this;
                    if ("function" != typeof e)
                        return function() {}
                        ;
                    var n = this.channelListenersCount;
                    return this.channelListeners[n] = e,
                    this.channelListenersCount++,
                    function() {
                        delete a.channelListeners[n]
                    }
                }
                ,
                e.prototype.eventListener = function(e) {
                    if (e.source === this.frameWindow) {
                        var a = e.data;
                        a.codesandbox && (Object.values(this.globalListeners).forEach((function(e) {
                            return e(a)
                        }
                        )),
                        a.$id === this.channelId && Object.values(this.channelListeners).forEach((function(e) {
                            return e(a)
                        }
                        )))
                    }
                }
                ,
                e
            }();
            function c(e, a) {
                if (!e)
                    return "static";
                var n = e.dependencies
                  , o = void 0 === n ? {} : n
                  , s = e.devDependencies
                  , t = void 0 === s ? {} : s
                  , r = i.__spreadArray(i.__spreadArray([], Object.keys(o), !0), Object.keys(t), !0)
                  , c = Object.keys(a)
                  , p = ["@adonisjs/framework", "@adonisjs/core"];
                if (r.some((function(e) {
                    return p.indexOf(e) > -1
                }
                )))
                    return "adonis";
                var l = ["nuxt", "nuxt-edge", "nuxt-ts", "nuxt-ts-edge", "nuxt3"];
                if (r.some((function(e) {
                    return l.indexOf(e) > -1
                }
                )))
                    return "nuxt";
                if (r.indexOf("next") > -1)
                    return "next";
                var u = ["apollo-server", "apollo-server-express", "apollo-server-hapi", "apollo-server-koa", "apollo-server-lambda", "apollo-server-micro"];
                if (r.some((function(e) {
                    return u.indexOf(e) > -1
                }
                )))
                    return "apollo";
                if (r.indexOf("mdx-deck") > -1)
                    return "mdx-deck";
                if (r.indexOf("gridsome") > -1)
                    return "gridsome";
                if (r.indexOf("vuepress") > -1)
                    return "vuepress";
                if (r.indexOf("ember-cli") > -1)
                    return "ember";
                if (r.indexOf("sapper") > -1)
                    return "sapper";
                if (r.indexOf("gatsby") > -1)
                    return "gatsby";
                if (r.indexOf("quasar") > -1)
                    return "quasar";
                if (r.indexOf("@docusaurus/core") > -1)
                    return "docusaurus";
                if (r.indexOf("remix") > -1)
                    return "remix";
                if (r.indexOf("astro") > -1)
                    return "node";
                if (c.some((function(e) {
                    return e.endsWith(".re")
                }
                )))
                    return "reason";
                var d = ["parcel-bundler", "parcel"];
                if (r.some((function(e) {
                    return d.indexOf(e) > -1
                }
                )))
                    return "parcel";
                var m = ["@dojo/core", "@dojo/framework"];
                if (r.some((function(e) {
                    return m.indexOf(e) > -1
                }
                )))
                    return "@dojo/cli-create-app";
                if (r.indexOf("@nestjs/core") > -1 || r.indexOf("@nestjs/common") > -1)
                    return "nest";
                if (r.indexOf("react-styleguidist") > -1)
                    return "styleguidist";
                if (r.indexOf("react-scripts") > -1)
                    return "create-react-app";
                if (r.indexOf("react-scripts-ts") > -1)
                    return "create-react-app-typescript";
                if (r.indexOf("@angular/core") > -1)
                    return "angular-cli";
                if (r.indexOf("preact-cli") > -1)
                    return "preact-cli";
                if (r.indexOf("@sveltech/routify") > -1 || r.indexOf("@roxi/routify") > -1)
                    return "node";
                if (r.indexOf("vite") > -1)
                    return "node";
                if (r.indexOf("@frontity/core") > -1)
                    return "node";
                if (r.indexOf("svelte") > -1)
                    return "svelte";
                if (r.indexOf("vue") > -1)
                    return "vue-cli";
                if (r.indexOf("cx") > -1)
                    return "cxjs";
                var x = ["express", "koa", "nodemon", "ts-node", "@tensorflow/tfjs-node", "webpack-dev-server", "snowpack"];
                return r.some((function(e) {
                    return x.indexOf(e) > -1
                }
                )) || Object.keys(o).length >= 50 ? "node" : void 0
            }
            var p = "https://" + (null === "2.6.9" ? void 0 : "2.6.9".replace(/\./g, "-")) + "-sandpack.codesandbox.io/"
              , l = function(e) {
                function a(a, n, o) {
                    void 0 === o && (o = {});
                    var s = e.call(this, a, n, o) || this;
                    if (s.getTranspilerContext = function() {
                        return new Promise((function(e) {
                            var a = s.listen((function(n) {
                                "transpiler-context" === n.type && (e(n.data),
                                a())
                            }
                            ));
                            s.dispatch({
                                type: "get-transpiler-context"
                            })
                        }
                        ))
                    }
                    ,
                    s.bundlerURL = o.bundlerURL || p,
                    o.teamId && (s.bundlerURL = s.bundlerURL.replace("https://", "https://" + o.teamId + "-") + "?cache=" + Date.now()),
                    s.bundlerState = void 0,
                    s.errors = [],
                    s.status = "initializing",
                    "string" == typeof a) {
                        s.selector = a;
                        var c = document.querySelector(a);
                        i.nullthrows(c, "The element '" + a + "' was not found"),
                        s.element = c,
                        s.iframe = document.createElement("iframe"),
                        s.initializeElement()
                    } else
                        s.element = a,
                        s.iframe = a;
                    return s.iframe.getAttribute("sandbox") || (s.iframe.setAttribute("sandbox", "allow-forms allow-modals allow-popups allow-presentation allow-same-origin allow-scripts"),
                    s.iframe.setAttribute("allow", "accelerometer; camera; encrypted-media; geolocation; gyroscope; hid; microphone; midi; clipboard-write;")),
                    s.setLocationURLIntoIFrame(),
                    s.iframeProtocol = new r(s.iframe,s.bundlerURL),
                    s.unsubscribeGlobalListener = s.iframeProtocol.globalListen((function(e) {
                        "initialized" === e.type && s.iframe.contentWindow && (s.iframeProtocol.register(),
                        s.options.fileResolver && (s.fileResolverProtocol = new t("fs",(function(e) {
                            return i.__awaiter(s, void 0, void 0, (function() {
                                return i.__generator(this, (function(a) {
                                    if ("isFile" === e.method)
                                        return [2, this.options.fileResolver.isFile(e.params[0])];
                                    if ("readFile" === e.method)
                                        return [2, this.options.fileResolver.readFile(e.params[0])];
                                    throw new Error("Method not supported")
                                }
                                ))
                            }
                            ))
                        }
                        ),s.iframeProtocol)),
                        s.updateSandbox(s.sandboxSetup, !0))
                    }
                    )),
                    s.unsubscribeChannelListener = s.iframeProtocol.channelListen((function(e) {
                        switch (e.type) {
                        case "start":
                            s.errors = [];
                            break;
                        case "status":
                            s.status = e.status;
                            break;
                        case "action":
                            "show-error" === e.action && (s.errors = i.__spreadArray(i.__spreadArray([], s.errors, !0), [i.extractErrorDetails(e)], !1));
                            break;
                        case "done":
                            s.status = "done";
                            break;
                        case "state":
                            s.bundlerState = e.state
                        }
                    }
                    )),
                    s
                }
                return i.__extends(a, e),
                a.prototype.setLocationURLIntoIFrame = function() {
                    var e, a = this.options.startRoute ? new URL(this.options.startRoute,this.bundlerURL).toString() : this.bundlerURL;
                    null === (e = this.iframe.contentWindow) || void 0 === e || e.location.replace(a),
                    this.iframe.src = a
                }
                ,
                a.prototype.destroy = function() {
                    this.unsubscribeChannelListener(),
                    this.unsubscribeGlobalListener(),
                    this.iframeProtocol.cleanup()
                }
                ,
                a.prototype.updateOptions = function(e) {
                    o.dequal(this.options, e) || (this.options = e,
                    this.updateSandbox())
                }
                ,
                a.prototype.updateSandbox = function(e, a) {
                    var n, o, s, t;
                    void 0 === e && (e = this.sandboxSetup),
                    this.sandboxSetup = i.__assign(i.__assign({}, this.sandboxSetup), e);
                    var r = this.getFiles()
                      , p = Object.keys(r).reduce((function(e, a) {
                        var n;
                        return i.__assign(i.__assign({}, e), ((n = {})[a] = {
                            code: r[a].code,
                            path: a
                        },
                        n))
                    }
                    ), {})
                      , l = JSON.parse(i.createPackageJSON(this.sandboxSetup.dependencies, this.sandboxSetup.devDependencies, this.sandboxSetup.entry));
                    try {
                        l = JSON.parse(r["/package.json"].code)
                    } catch (e) {
                        console.error(i.createError("could not parse package.json file: " + e.message))
                    }
                    var u = Object.keys(r).reduce((function(e, a) {
                        var n;
                        return i.__assign(i.__assign({}, e), ((n = {})[a] = {
                            content: r[a].code,
                            path: a
                        },
                        n))
                    }
                    ), {});
                    this.dispatch({
                        type: "compile",
                        codesandbox: !0,
                        version: 3,
                        isInitializationCompile: a,
                        modules: p,
                        reactDevTools: this.options.reactDevTools,
                        externalResources: this.options.externalResources || [],
                        hasFileResolver: Boolean(this.options.fileResolver),
                        disableDependencyPreprocessing: this.sandboxSetup.disableDependencyPreprocessing,
                        template: this.sandboxSetup.template || c(l, u),
                        showOpenInCodeSandbox: null === (n = this.options.showOpenInCodeSandbox) || void 0 === n || n,
                        showErrorScreen: null === (o = this.options.showErrorScreen) || void 0 === o || o,
                        showLoadingScreen: null !== (s = this.options.showLoadingScreen) && void 0 !== s && s,
                        skipEval: this.options.skipEval || !1,
                        clearConsoleDisabled: !this.options.clearConsoleOnFirstCompile,
                        logLevel: null !== (t = this.options.logLevel) && void 0 !== t ? t : i.SandpackLogLevel.Info,
                        customNpmRegistries: this.options.customNpmRegistries,
                        teamId: this.options.teamId
                    })
                }
                ,
                a.prototype.dispatch = function(e) {
                    "refresh" === e.type && this.setLocationURLIntoIFrame(),
                    this.iframeProtocol.dispatch(e)
                }
                ,
                a.prototype.listen = function(e) {
                    return this.iframeProtocol.channelListen(e)
                }
                ,
                a.prototype.getCodeSandboxURL = function() {
                    var e = this.getFiles()
                      , a = Object.keys(e).reduce((function(a, n) {
                        var o;
                        return i.__assign(i.__assign({}, a), ((o = {})[n.replace("/", "")] = {
                            content: e[n].code,
                            isBinary: !1
                        },
                        o))
                    }
                    ), {});
                    return fetch("https://codesandbox.io/api/v1/sandboxes/define?json=1", {
                        method: "POST",
                        body: JSON.stringify({
                            files: a
                        }),
                        headers: {
                            Accept: "application/json",
                            "Content-Type": "application/json"
                        }
                    }).then((function(e) {
                        return e.json()
                    }
                    )).then((function(e) {
                        return {
                            sandboxId: e.sandbox_id,
                            editorUrl: "https://codesandbox.io/s/" + e.sandbox_id,
                            embedUrl: "https://codesandbox.io/embed/" + e.sandbox_id
                        }
                    }
                    ))
                }
                ,
                a.prototype.getFiles = function() {
                    var e = this.sandboxSetup;
                    return void 0 === e.files["/package.json"] ? i.addPackageJSONIfNeeded(e.files, e.dependencies, e.devDependencies, e.entry) : this.sandboxSetup.files
                }
                ,
                a.prototype.initializeElement = function() {
                    this.iframe.style.border = "0",
                    this.iframe.style.width = this.options.width || "100%",
                    this.iframe.style.height = this.options.height || "100%",
                    this.iframe.style.overflow = "hidden",
                    i.nullthrows(this.element.parentNode, "The given iframe does not have a parent."),
                    this.element.parentNode.replaceChild(this.iframe, this.element)
                }
                ,
                a
            }(s.SandpackClient);
            a.SandpackRuntime = l
        }
        ,
        353: (e,a,n)=>{
            "use strict";
            var i = n(328)
              , o = n(679)
              , s = n(313)
              , t = n(179);
            n(987),
            n(487);
            var r = function(e) {
                return "string" == typeof e ? e : (new TextDecoder).decode(e)
            }
              , c = function(e) {
                function a(a, n, i) {
                    var s;
                    void 0 === i && (i = {});
                    var c = e.call(this, a, n, i) || this;
                    if (c.files = new Map,
                    c.status = "initializing",
                    c.emitter = new t.EventEmitter,
                    c.previewController = new o.PreviewController({
                        baseUrl: null !== (s = i.bundlerURL) && void 0 !== s ? s : "https://preview.sandpack-static-server.codesandbox.io",
                        getFileContent: function(e) {
                            var a = c.files.get(e);
                            if (!a)
                                throw new Error("File not found");
                            if (e.endsWith(".html") || e.endsWith(".htm"))
                                try {
                                    a = function(e) {
                                        var a = r(e)
                                          , n = (new DOMParser).parseFromString(a, "text/html");
                                        return n.documentElement.getAttribute("lang") || n.documentElement.setAttribute("lang", "en"),
                                        "<!DOCTYPE html>\n" + n.documentElement.outerHTML
                                    }(a),
                                    a = c.injectProtocolScript(a),
                                    a = c.injectExternalResources(a, i.externalResources)
                                } catch (e) {
                                    console.error("Runtime injection failed", e)
                                }
                            return a
                        }
                    }),
                    "string" == typeof a) {
                        c.selector = a;
                        var p = document.querySelector(a);
                        c.element = p,
                        c.iframe = document.createElement("iframe")
                    } else
                        c.element = a,
                        c.iframe = a;
                    return c.iframe.getAttribute("sandbox") || (c.iframe.setAttribute("sandbox", "allow-forms allow-modals allow-popups allow-presentation allow-same-origin allow-scripts"),
                    c.iframe.setAttribute("allow", "accelerometer; camera; encrypted-media; geolocation; gyroscope; hid; microphone; midi; clipboard-write;")),
                    c.updateSandbox(),
                    c
                }
                return i.__extends(a, e),
                a.prototype.injectContentIntoHead = function(e, a) {
                    var n;
                    return null !== (n = function(e, a, n) {
                        var i = /<head[^<>]*>/g.exec(a);
                        if (i && i.length >= 1) {
                            var o = i.index + i[0].length;
                            return a.substring(0, o) + n + a.substring(o)
                        }
                    }(0, e = r(e), "\n" + a)) && void 0 !== n ? n : a + "\n" + e
                }
                ,
                a.prototype.injectProtocolScript = function(e) {
                    return this.injectContentIntoHead(e, '<script>\n  window.addEventListener("message", (message) => {\n    if(message.data.type === "refresh") {\n      window.location.reload();\n    }\n  })\n<\/script>')
                }
                ,
                a.prototype.injectExternalResources = function(e, a) {
                    void 0 === a && (a = []);
                    var n = a.map((function(e) {
                        var a = e.match(/\.([^.]*)$/)
                          , n = null == a ? void 0 : a[1];
                        if ("css" === n || e.includes("fonts.googleapis"))
                            return '<link rel="stylesheet" href="' + e + '">';
                        if ("js" === n)
                            return '<script src="' + e + '"><\/script>';
                        throw new Error("Unable to determine file type for external resource: " + e)
                    }
                    )).join("\n");
                    return this.injectContentIntoHead(e, n)
                }
                ,
                a.prototype.updateSandbox = function(e, a) {
                    void 0 === e && (e = this.sandboxSetup);
                    var n = t.fromBundlerFilesToFS(e.files);
                    this.dispatch({
                        codesandbox: !0,
                        modules: n,
                        template: e.template,
                        type: "compile"
                    })
                }
                ,
                a.prototype.compile = function(e) {
                    return i.__awaiter(this, void 0, void 0, (function() {
                        var a;
                        return i.__generator(this, (function(n) {
                            switch (n.label) {
                            case 0:
                                return this.files = new Map(Object.entries(e)),
                                [4, this.previewController.initPreview()];
                            case 1:
                                return a = n.sent(),
                                this.iframe.setAttribute("src", a),
                                this.status = "done",
                                this.dispatch({
                                    type: "done",
                                    compilatonError: !1
                                }),
                                this.dispatch({
                                    type: "urlchange",
                                    url: a,
                                    back: !1,
                                    forward: !1
                                }),
                                [2]
                            }
                        }
                        ))
                    }
                    ))
                }
                ,
                a.prototype.dispatch = function(e) {
                    var a;
                    switch (e.type) {
                    case "compile":
                        this.compile(e.modules);
                        break;
                    default:
                        null === (a = this.iframe.contentWindow) || void 0 === a || a.postMessage(e, "*"),
                        this.emitter.dispatch(e)
                    }
                }
                ,
                a.prototype.listen = function(e) {
                    return this.emitter.listener(e)
                }
                ,
                a.prototype.destroy = function() {
                    this.emitter.cleanup()
                }
                ,
                a
            }(s.SandpackClient);
            a.SandpackStatic = c
        }
        ,
        515: (e,a,n)=>{
            "use strict";
            var i = n(328);
            n(987),
            Object.defineProperty(a, "SandpackLogLevel", {
                enumerable: !0,
                get: function() {
                    return i.SandpackLogLevel
                }
            }),
            a.addPackageJSONIfNeeded = i.addPackageJSONIfNeeded,
            a.createError = i.createError,
            a.createPackageJSON = i.createPackageJSON,
            a.extractErrorDetails = i.extractErrorDetails,
            a.normalizePath = i.normalizePath,
            a.nullthrows = i.nullthrows,
            a.loadSandpackClient = function(e, a, o) {
                var s;
                return void 0 === o && (o = {}),
                i.__awaiter(this, void 0, void 0, (function() {
                    var t;
                    return i.__generator(this, (function(i) {
                        switch (i.label) {
                        case 0:
                            switch (null !== (s = a.template) && void 0 !== s ? s : "parcel") {
                            case "node":
                                return [3, 1];
                            case "static":
                                return [3, 3]
                            }
                            return [3, 5];
                        case 1:
                            return [4, Promise.resolve().then((function() {
                                return n(295)
                            }
                            )).then((function(e) {
                                return e.SandpackNode
                            }
                            ))];
                        case 2:
                            return t = i.sent(),
                            [3, 7];
                        case 3:
                            return [4, Promise.resolve().then((function() {
                                return n(353)
                            }
                            )).then((function(e) {
                                return e.SandpackStatic
                            }
                            ))];
                        case 4:
                            return t = i.sent(),
                            [3, 7];
                        case 5:
                            return [4, Promise.resolve().then((function() {
                                return n(232)
                            }
                            )).then((function(e) {
                                return e.SandpackRuntime
                            }
                            ))];
                        case 6:
                            t = i.sent(),
                            i.label = 7;
                        case 7:
                            return [2, new t(e,a,o)]
                        }
                    }
                    ))
                }
                ))
            }
        }
        ,
        328: (e,a,n)=>{
            "use strict";
            var i = n(987)
              , o = function(e, a) {
                return (o = Object.setPrototypeOf || {
                    __proto__: []
                }instanceof Array && function(e, a) {
                    e.__proto__ = a
                }
                || function(e, a) {
                    for (var n in a)
                        Object.prototype.hasOwnProperty.call(a, n) && (e[n] = a[n])
                }
                )(e, a)
            };
            a.__assign = function() {
                return a.__assign = Object.assign || function(e) {
                    for (var a, n = 1, i = arguments.length; n < i; n++)
                        for (var o in a = arguments[n])
                            Object.prototype.hasOwnProperty.call(a, o) && (e[o] = a[o]);
                    return e
                }
                ,
                a.__assign.apply(this, arguments)
            }
            ;
            var s = function(e) {
                return "[sandpack-client]: " + e
            };
            function t(e, a) {
                return void 0 === a && (a = "Value is nullish"),
                i.invariant(null != e, s(a)),
                e
            }
            var r = '"entry" was not specified - provide either a package.json with the "main" field or an "entry" value';
            function c(e, a, n) {
                return void 0 === e && (e = {}),
                void 0 === a && (a = {}),
                void 0 === n && (n = "/index.js"),
                JSON.stringify({
                    name: "sandpack-project",
                    main: n,
                    dependencies: e,
                    devDependencies: a
                }, null, 2)
            }
            var p, l = function(e) {
                return "string" == typeof e ? e.startsWith("/") ? e : "/" + e : Array.isArray(e) ? e.map((function(e) {
                    return e.startsWith("/") ? e : "/" + e
                }
                )) : "object" == typeof e && null !== e ? Object.entries(e).reduce((function(e, a) {
                    var n = a[0]
                      , i = a[1];
                    return e[n.startsWith("/") ? n : "/" + n] = i,
                    e
                }
                ), {}) : null
            };
            a.SandpackLogLevel = void 0,
            (p = a.SandpackLogLevel || (a.SandpackLogLevel = {}))[p.None = 0] = "None",
            p[p.Error = 10] = "Error",
            p[p.Warning = 20] = "Warning",
            p[p.Info = 30] = "Info",
            p[p.Debug = 40] = "Debug",
            a.__awaiter = function(e, a, n, i) {
                return new (n || (n = Promise))((function(o, s) {
                    function t(e) {
                        try {
                            c(i.next(e))
                        } catch (e) {
                            s(e)
                        }
                    }
                    function r(e) {
                        try {
                            c(i.throw(e))
                        } catch (e) {
                            s(e)
                        }
                    }
                    function c(e) {
                        var a;
                        e.done ? o(e.value) : (a = e.value,
                        a instanceof n ? a : new n((function(e) {
                            e(a)
                        }
                        ))).then(t, r)
                    }
                    c((i = i.apply(e, a || [])).next())
                }
                ))
            }
            ,
            a.__extends = function(e, a) {
                if ("function" != typeof a && null !== a)
                    throw new TypeError("Class extends value " + String(a) + " is not a constructor or null");
                function n() {
                    this.constructor = e
                }
                o(e, a),
                e.prototype = null === a ? Object.create(a) : (n.prototype = a.prototype,
                new n)
            }
            ,
            a.__generator = function(e, a) {
                var n, i, o, s, t = {
                    label: 0,
                    sent: function() {
                        if (1 & o[0])
                            throw o[1];
                        return o[1]
                    },
                    trys: [],
                    ops: []
                };
                return s = {
                    next: r(0),
                    throw: r(1),
                    return: r(2)
                },
                "function" == typeof Symbol && (s[Symbol.iterator] = function() {
                    return this
                }
                ),
                s;
                function r(s) {
                    return function(r) {
                        return function(s) {
                            if (n)
                                throw new TypeError("Generator is already executing.");
                            for (; t; )
                                try {
                                    if (n = 1,
                                    i && (o = 2 & s[0] ? i.return : s[0] ? i.throw || ((o = i.return) && o.call(i),
                                    0) : i.next) && !(o = o.call(i, s[1])).done)
                                        return o;
                                    switch (i = 0,
                                    o && (s = [2 & s[0], o.value]),
                                    s[0]) {
                                    case 0:
                                    case 1:
                                        o = s;
                                        break;
                                    case 4:
                                        return t.label++,
                                        {
                                            value: s[1],
                                            done: !1
                                        };
                                    case 5:
                                        t.label++,
                                        i = s[1],
                                        s = [0];
                                        continue;
                                    case 7:
                                        s = t.ops.pop(),
                                        t.trys.pop();
                                        continue;
                                    default:
                                        if (!((o = (o = t.trys).length > 0 && o[o.length - 1]) || 6 !== s[0] && 2 !== s[0])) {
                                            t = 0;
                                            continue
                                        }
                                        if (3 === s[0] && (!o || s[1] > o[0] && s[1] < o[3])) {
                                            t.label = s[1];
                                            break
                                        }
                                        if (6 === s[0] && t.label < o[1]) {
                                            t.label = o[1],
                                            o = s;
                                            break
                                        }
                                        if (o && t.label < o[2]) {
                                            t.label = o[2],
                                            t.ops.push(s);
                                            break
                                        }
                                        o[2] && t.ops.pop(),
                                        t.trys.pop();
                                        continue
                                    }
                                    s = a.call(e, t)
                                } catch (e) {
                                    s = [6, e],
                                    i = 0
                                } finally {
                                    n = o = 0
                                }
                            if (5 & s[0])
                                throw s[1];
                            return {
                                value: s[0] ? s[1] : void 0,
                                done: !0
                            }
                        }([s, r])
                    }
                }
            }
            ,
            a.__spreadArray = function(e, a, n) {
                if (n || 2 === arguments.length)
                    for (var i, o = 0, s = a.length; o < s; o++)
                        !i && o in a || (i || (i = Array.prototype.slice.call(a, 0, o)),
                        i[o] = a[o]);
                return e.concat(i || Array.prototype.slice.call(a))
            }
            ,
            a.addPackageJSONIfNeeded = function(e, n, i, o) {
                var s, p, u = l(e), d = u["/package.json"];
                if (!d)
                    return t(n, '"dependencies" was not specified - provide either a package.json or a "dependencies" value'),
                    t(o, r),
                    u["/package.json"] = {
                        code: c(n, i, o)
                    },
                    u;
                if (d) {
                    var m = JSON.parse(d.code);
                    t(!(!n && !m.dependencies), r),
                    n && (m.dependencies = a.__assign(a.__assign({}, null !== (s = m.dependencies) && void 0 !== s ? s : {}), null != n ? n : {})),
                    i && (m.devDependencies = a.__assign(a.__assign({}, null !== (p = m.devDependencies) && void 0 !== p ? p : {}), null != i ? i : {})),
                    o && (m.main = o),
                    u["/package.json"] = {
                        code: JSON.stringify(m, null, 2)
                    }
                }
                return u
            }
            ,
            a.createError = s,
            a.createPackageJSON = c,
            a.extractErrorDetails = function(e) {
                var a;
                if ("SyntaxError" === e.title)
                    return {
                        title: e.title,
                        path: e.path,
                        message: e.message,
                        line: e.line,
                        column: e.column
                    };
                var n = function(e) {
                    if (e)
                        return e.find((function(e) {
                            return !!e._originalFileName
                        }
                        ))
                }(null === (a = e.payload) || void 0 === a ? void 0 : a.frames);
                if (!n)
                    return {
                        message: e.message
                    };
                var i, o, s, t = (o = (i = n)._originalScriptCode[i._originalScriptCode.length - 1].lineNumber.toString().length,
                s = 2 + o + 3 + i._originalColumnNumber,
                i._originalScriptCode.reduce((function(e, a) {
                    var n = a.highlight ? ">" : " "
                      , i = a.lineNumber.toString().length === o ? "" + a.lineNumber : " " + a.lineNumber
                      , t = a.highlight ? "\n" + " ".repeat(s) + "^" : "";
                    return e + "\n" + n + " " + i + " | " + a.content + t
                }
                ), "")), r = function(e) {
                    return e ? " (" + e._originalLineNumber + ":" + e._originalColumnNumber + ")" : ""
                }(n);
                return {
                    message: function(e, a, n, i) {
                        return e + ": " + a + n + "\n" + i
                    }(n._originalFileName, e.message, r, t),
                    title: e.title,
                    path: n._originalFileName,
                    line: n._originalLineNumber,
                    column: n._originalColumnNumber
                }
            }
            ,
            a.normalizePath = l,
            a.nullthrows = t
        }
        ,
        487: (e,a)=>{
            var n = Object.prototype.hasOwnProperty;
            function i(e, a, n) {
                for (n of e.keys())
                    if (o(n, a))
                        return n
            }
            function o(e, a) {
                var s, t, r;
                if (e === a)
                    return !0;
                if (e && a && (s = e.constructor) === a.constructor) {
                    if (s === Date)
                        return e.getTime() === a.getTime();
                    if (s === RegExp)
                        return e.toString() === a.toString();
                    if (s === Array) {
                        if ((t = e.length) === a.length)
                            for (; t-- && o(e[t], a[t]); )
                                ;
                        return -1 === t
                    }
                    if (s === Set) {
                        if (e.size !== a.size)
                            return !1;
                        for (t of e) {
                            if ((r = t) && "object" == typeof r && !(r = i(a, r)))
                                return !1;
                            if (!a.has(r))
                                return !1
                        }
                        return !0
                    }
                    if (s === Map) {
                        if (e.size !== a.size)
                            return !1;
                        for (t of e) {
                            if ((r = t[0]) && "object" == typeof r && !(r = i(a, r)))
                                return !1;
                            if (!o(t[1], a.get(r)))
                                return !1
                        }
                        return !0
                    }
                    if (s === ArrayBuffer)
                        e = new Uint8Array(e),
                        a = new Uint8Array(a);
                    else if (s === DataView) {
                        if ((t = e.byteLength) === a.byteLength)
                            for (; t-- && e.getInt8(t) === a.getInt8(t); )
                                ;
                        return -1 === t
                    }
                    if (ArrayBuffer.isView(e)) {
                        if ((t = e.byteLength) === a.byteLength)
                            for (; t-- && e[t] === a[t]; )
                                ;
                        return -1 === t
                    }
                    if (!s || "object" == typeof e) {
                        for (s in t = 0,
                        e) {
                            if (n.call(e, s) && ++t && !n.call(a, s))
                                return !1;
                            if (!(s in a) || !o(e[s], a[s]))
                                return !1
                        }
                        return Object.keys(a).length === t
                    }
                }
                return e != e && a != a
            }
            a.dequal = o
        }
        ,
        987: e=>{
            "use strict";
            var a, n = Object.defineProperty, i = Object.getOwnPropertyDescriptor, o = Object.getOwnPropertyNames, s = Object.prototype.hasOwnProperty, t = {};
            ((e,a)=>{
                for (var i in a)
                    n(e, i, {
                        get: a[i],
                        enumerable: !0
                    })
            }
            )(t, {
                InvariantError: ()=>p,
                format: ()=>c,
                invariant: ()=>l
            }),
            e.exports = (a = t,
            ((e,a,t,r)=>{
                if (a && "object" == typeof a || "function" == typeof a)
                    for (let t of o(a))
                        s.call(e, t) || undefined === t || n(e, t, {
                            get: ()=>a[t],
                            enumerable: !(r = i(a, t)) || r.enumerable
                        });
                return e
            }
            )(n({}, "__esModule", {
                value: !0
            }), a));
            var r = /(%?)(%([sdjo]))/g;
            function c(e, ...a) {
                if (0 === a.length)
                    return e;
                let n = 0
                  , i = e.replace(r, ((e,i,o,s)=>{
                    const t = function(e, a) {
                        switch (a) {
                        case "s":
                            return e;
                        case "d":
                        case "i":
                            return Number(e);
                        case "j":
                            return JSON.stringify(e);
                        case "o":
                            {
                                if ("string" == typeof e)
                                    return e;
                                const a = JSON.stringify(e);
                                return "{}" === a || "[]" === a || /^\[object .+?\]$/.test(a) ? e : a
                            }
                        }
                    }(a[n], s);
                    return i ? e : (n++,
                    t)
                }
                ));
                return n < a.length && (i += ` ${a.slice(n).join(" ")}`),
                i = i.replace(/%{2,2}/g, "%"),
                i
            }
            var p = class extends Error {
                constructor(e, ...a) {
                    super(e),
                    this.message = e,
                    this.name = "Invariant Violation",
                    this.message = c(e, ...a),
                    function(e) {
                        if (!e.stack)
                            return;
                        const a = e.stack.split("\n");
                        a.splice(1, 2),
                        e.stack = a.join("\n")
                    }(this)
                }
            }
              , l = (e,a,...n)=>{
                if (!e)
                    throw new p(a,...n)
            }
            ;
            l.as = (e,a,n,...i)=>{
                if (!a)
                    throw null != e.prototype.name ? new e(c(n, i)) : e(c(n, i))
            }
        }
        ,
        679: e=>{
            "use strict";
            var a, n = Object.create, i = Object.defineProperty, o = Object.getOwnPropertyDescriptor, s = Object.getOwnPropertyNames, t = Object.getPrototypeOf, r = Object.prototype.hasOwnProperty, c = (e,a)=>function() {
                return a || (0,
                e[s(e)[0]])((a = {
                    exports: {}
                }).exports, a),
                a.exports
            }
            , p = (e,a,n,t)=>{
                if (a && "object" == typeof a || "function" == typeof a)
                    for (let c of s(a))
                        r.call(e, c) || c === n || i(e, c, {
                            get: ()=>a[c],
                            enumerable: !(t = o(a, c)) || t.enumerable
                        });
                return e
            }
            , l = c({
                "node_modules/.pnpm/mime-db@1.52.0/node_modules/mime-db/db.json"(e, a) {
                    a.exports = {
                        "application/1d-interleaved-parityfec": {
                            source: "iana"
                        },
                        "application/3gpdash-qoe-report+xml": {
                            source: "iana",
                            charset: "UTF-8",
                            compressible: !0
                        },
                        "application/3gpp-ims+xml": {
                            source: "iana",
                            compressible: !0
                        },
                        "application/3gpphal+json": {
                            source: "iana",
                            compressible: !0
                        },
                        "application/3gpphalforms+json": {
                            source: "iana",
                            compressible: !0
                        },
                        "application/a2l": {
                            source: "iana"
                        },
                        "application/ace+cbor": {
                            source: "iana"
                        },
                        "application/activemessage": {
                            source: "iana"
                        },
                        "application/activity+json": {
                            source: "iana",
                            compressible: !0
                        },
                        "application/alto-costmap+json": {
                            source: "iana",
                            compressible: !0
                        },
                        "application/alto-costmapfilter+json": {
                            source: "iana",
                            compressible: !0
                        },
                        "application/alto-directory+json": {
                            source: "iana",
                            compressible: !0
                        },
                        "application/alto-endpointcost+json": {
                            source: "iana",
                            compressible: !0
                        },
                        "application/alto-endpointcostparams+json": {
                            source: "iana",
                            compressible: !0
                        },
                        "application/alto-endpointprop+json": {
                            source: "iana",
                            compressible: !0
                        },
                        "application/alto-endpointpropparams+json": {
                            source: "iana",
                            compressible: !0
                        },
                        "application/alto-error+json": {
                            source: "iana",
                            compressible: !0
                        },
                        "application/alto-networkmap+json": {
                            source: "iana",
                            compressible: !0
                        },
                        "application/alto-networkmapfilter+json": {
                            source: "iana",
                            compressible: !0
                        },
                        "application/alto-updatestreamcontrol+json": {
                            source: "iana",
                            compressible: !0
                        },
                        "application/alto-updatestreamparams+json": {
                            source: "iana",
                            compressible: !0
                        },
                        "application/aml": {
                            source: "iana"
                        },
                        "application/andrew-inset": {
                            source: "iana",
                            extensions: ["ez"]
                        },
                        "application/applefile": {
                            source: "iana"
                        },
                        "application/applixware": {
                            source: "apache",
                            extensions: ["aw"]
                        },
                        "application/at+jwt": {
                            source: "iana"
                        },
                        "application/atf": {
                            source: "iana"
                        },
                        "application/atfx": {
                            source: "iana"
                        },
                        "application/atom+xml": {
                            source: "iana",
                            compressible: !0,
                            extensions: ["atom"]
                        },
                        "application/atomcat+xml": {
                            source: "iana",
                            compressible: !0,
                            extensions: ["atomcat"]
                        },
                        "application/atomdeleted+xml": {
                            source: "iana",
                            compressible: !0,
                            extensions: ["atomdeleted"]
                        },
                        "application/atomicmail": {
                            source: "iana"
                        },
                        "application/atomsvc+xml": {
                            source: "iana",
                            compressible: !0,
                            extensions: ["atomsvc"]
                        },
                        "application/atsc-dwd+xml": {
                            source: "iana",
                            compressible: !0,
                            extensions: ["dwd"]
                        },
                        "application/atsc-dynamic-event-message": {
                            source: "iana"
                        },
                        "application/atsc-held+xml": {
                            source: "iana",
                            compressible: !0,
                            extensions: ["held"]
                        },
                        "application/atsc-rdt+json": {
                            source: "iana",
                            compressible: !0
                        },
                        "application/atsc-rsat+xml": {
                            source: "iana",
                            compressible: !0,
                            extensions: ["rsat"]
                        },
                        "application/atxml": {
                            source: "iana"
                        },
                        "application/auth-policy+xml": {
                            source: "iana",
                            compressible: !0
                        },
                        "application/bacnet-xdd+zip": {
                            source: "iana",
                            compressible: !1
                        },
                        "application/batch-smtp": {
                            source: "iana"
                        },
                        "application/bdoc": {
                            compressible: !1,
                            extensions: ["bdoc"]
                        },
                        "application/beep+xml": {
                            source: "iana",
                            charset: "UTF-8",
                            compressible: !0
                        },
                        "application/calendar+json": {
                            source: "iana",
                            compressible: !0
                        },
                        "application/calendar+xml": {
                            source: "iana",
                            compressible: !0,
                            extensions: ["xcs"]
                        },
                        "application/call-completion": {
                            source: "iana"
                        },
                        "application/cals-1840": {
                            source: "iana"
                        },
                        "application/captive+json": {
                            source: "iana",
                            compressible: !0
                        },
                        "application/cbor": {
                            source: "iana"
                        },
                        "application/cbor-seq": {
                            source: "iana"
                        },
                        "application/cccex": {
                            source: "iana"
                        },
                        "application/ccmp+xml": {
                            source: "iana",
                            compressible: !0
                        },
                        "application/ccxml+xml": {
                            source: "iana",
                            compressible: !0,
                            extensions: ["ccxml"]
                        },
                        "application/cdfx+xml": {
                            source: "iana",
                            compressible: !0,
                            extensions: ["cdfx"]
                        },
                        "application/cdmi-capability": {
                            source: "iana",
                            extensions: ["cdmia"]
                        },
                        "application/cdmi-container": {
                            source: "iana",
                            extensions: ["cdmic"]
                        },
                        "application/cdmi-domain": {
                            source: "iana",
                            extensions: ["cdmid"]
                        },
                        "application/cdmi-object": {
                            source: "iana",
                            extensions: ["cdmio"]
                        },
                        "application/cdmi-queue": {
                            source: "iana",
                            extensions: ["cdmiq"]
                        },
                        "application/cdni": {
                            source: "iana"
                        },
                        "application/cea": {
                            source: "iana"
                        },
                        "application/cea-2018+xml": {
                            source: "iana",
                            compressible: !0
                        },
                        "application/cellml+xml": {
                            source: "iana",
                            compressible: !0
                        },
                        "application/cfw": {
                            source: "iana"
                        },
                        "application/city+json": {
                            source: "iana",
                            compressible: !0
                        },
                        "application/clr": {
                            source: "iana"
                        },
                        "application/clue+xml": {
                            source: "iana",
                            compressible: !0
                        },
                        "application/clue_info+xml": {
                            source: "iana",
                            compressible: !0
                        },
                        "application/cms": {
                            source: "iana"
                        },
                        "application/cnrp+xml": {
                            source: "iana",
                            compressible: !0
                        },
                        "application/coap-group+json": {
                            source: "iana",
                            compressible: !0
                        },
                        "application/coap-payload": {
                            source: "iana"
                        },
                        "application/commonground": {
                            source: "iana"
                        },
                        "application/conference-info+xml": {
                            source: "iana",
                            compressible: !0
                        },
                        "application/cose": {
                            source: "iana"
                        },
                        "application/cose-key": {
                            source: "iana"
                        },
                        "application/cose-key-set": {
                            source: "iana"
                        },
                        "application/cpl+xml": {
                            source: "iana",
                            compressible: !0,
                            extensions: ["cpl"]
                        },
                        "application/csrattrs": {
                            source: "iana"
                        },
                        "application/csta+xml": {
                            source: "iana",
                            compressible: !0
                        },
                        "application/cstadata+xml": {
                            source: "iana",
                            compressible: !0
                        },
                        "application/csvm+json": {
                            source: "iana",
                            compressible: !0
                        },
                        "application/cu-seeme": {
                            source: "apache",
                            extensions: ["cu"]
                        },
                        "application/cwt": {
                            source: "iana"
                        },
                        "application/cybercash": {
                            source: "iana"
                        },
                        "application/dart": {
                            compressible: !0
                        },
                        "application/dash+xml": {
                            source: "iana",
                            compressible: !0,
                            extensions: ["mpd"]
                        },
                        "application/dash-patch+xml": {
                            source: "iana",
                            compressible: !0,
                            extensions: ["mpp"]
                        },
                        "application/dashdelta": {
                            source: "iana"
                        },
                        "application/davmount+xml": {
                            source: "iana",
                            compressible: !0,
                            extensions: ["davmount"]
                        },
                        "application/dca-rft": {
                            source: "iana"
                        },
                        "application/dcd": {
                            source: "iana"
                        },
                        "application/dec-dx": {
                            source: "iana"
                        },
                        "application/dialog-info+xml": {
                            source: "iana",
                            compressible: !0
                        },
                        "application/dicom": {
                            source: "iana"
                        },
                        "application/dicom+json": {
                            source: "iana",
                            compressible: !0
                        },
                        "application/dicom+xml": {
                            source: "iana",
                            compressible: !0
                        },
                        "application/dii": {
                            source: "iana"
                        },
                        "application/dit": {
                            source: "iana"
                        },
                        "application/dns": {
                            source: "iana"
                        },
                        "application/dns+json": {
                            source: "iana",
                            compressible: !0
                        },
                        "application/dns-message": {
                            source: "iana"
                        },
                        "application/docbook+xml": {
                            source: "apache",
                            compressible: !0,
                            extensions: ["dbk"]
                        },
                        "application/dots+cbor": {
                            source: "iana"
                        },
                        "application/dskpp+xml": {
                            source: "iana",
                            compressible: !0
                        },
                        "application/dssc+der": {
                            source: "iana",
                            extensions: ["dssc"]
                        },
                        "application/dssc+xml": {
                            source: "iana",
                            compressible: !0,
                            extensions: ["xdssc"]
                        },
                        "application/dvcs": {
                            source: "iana"
                        },
                        "application/ecmascript": {
                            source: "iana",
                            compressible: !0,
                            extensions: ["es", "ecma"]
                        },
                        "application/edi-consent": {
                            source: "iana"
                        },
                        "application/edi-x12": {
                            source: "iana",
                            compressible: !1
                        },
                        "application/edifact": {
                            source: "iana",
                            compressible: !1
                        },
                        "application/efi": {
                            source: "iana"
                        },
                        "application/elm+json": {
                            source: "iana",
                            charset: "UTF-8",
                            compressible: !0
                        },
                        "application/elm+xml": {
                            source: "iana",
                            compressible: !0
                        },
                        "application/emergencycalldata.cap+xml": {
                            source: "iana",
                            charset: "UTF-8",
                            compressible: !0
                        },
                        "application/emergencycalldata.comment+xml": {
                            source: "iana",
                            compressible: !0
                        },
                        "application/emergencycalldata.control+xml": {
                            source: "iana",
                            compressible: !0
                        },
                        "application/emergencycalldata.deviceinfo+xml": {
                            source: "iana",
                            compressible: !0
                        },
                        "application/emergencycalldata.ecall.msd": {
                            source: "iana"
                        },
                        "application/emergencycalldata.providerinfo+xml": {
                            source: "iana",
                            compressible: !0
                        },
                        "application/emergencycalldata.serviceinfo+xml": {
                            source: "iana",
                            compressible: !0
                        },
                        "application/emergencycalldata.subscriberinfo+xml": {
                            source: "iana",
                            compressible: !0
                        },
                        "application/emergencycalldata.veds+xml": {
                            source: "iana",
                            compressible: !0
                        },
                        "application/emma+xml": {
                            source: "iana",
                            compressible: !0,
                            extensions: ["emma"]
                        },
                        "application/emotionml+xml": {
                            source: "iana",
                            compressible: !0,
                            extensions: ["emotionml"]
                        },
                        "application/encaprtp": {
                            source: "iana"
                        },
                        "application/epp+xml": {
                            source: "iana",
                            compressible: !0
                        },
                        "application/epub+zip": {
                            source: "iana",
                            compressible: !1,
                            extensions: ["epub"]
                        },
                        "application/eshop": {
                            source: "iana"
                        },
                        "application/exi": {
                            source: "iana",
                            extensions: ["exi"]
                        },
                        "application/expect-ct-report+json": {
                            source: "iana",
                            compressible: !0
                        },
                        "application/express": {
                            source: "iana",
                            extensions: ["exp"]
                        },
                        "application/fastinfoset": {
                            source: "iana"
                        },
                        "application/fastsoap": {
                            source: "iana"
                        },
                        "application/fdt+xml": {
                            source: "iana",
                            compressible: !0,
                            extensions: ["fdt"]
                        },
                        "application/fhir+json": {
                            source: "iana",
                            charset: "UTF-8",
                            compressible: !0
                        },
                        "application/fhir+xml": {
                            source: "iana",
                            charset: "UTF-8",
                            compressible: !0
                        },
                        "application/fido.trusted-apps+json": {
                            compressible: !0
                        },
                        "application/fits": {
                            source: "iana"
                        },
                        "application/flexfec": {
                            source: "iana"
                        },
                        "application/font-sfnt": {
                            source: "iana"
                        },
                        "application/font-tdpfr": {
                            source: "iana",
                            extensions: ["pfr"]
                        },
                        "application/font-woff": {
                            source: "iana",
                            compressible: !1
                        },
                        "application/framework-attributes+xml": {
                            source: "iana",
                            compressible: !0
                        },
                        "application/geo+json": {
                            source: "iana",
                            compressible: !0,
                            extensions: ["geojson"]
                        },
                        "application/geo+json-seq": {
                            source: "iana"
                        },
                        "application/geopackage+sqlite3": {
                            source: "iana"
                        },
                        "application/geoxacml+xml": {
                            source: "iana",
                            compressible: !0
                        },
                        "application/gltf-buffer": {
                            source: "iana"
                        },
                        "application/gml+xml": {
                            source: "iana",
                            compressible: !0,
                            extensions: ["gml"]
                        },
                        "application/gpx+xml": {
                            source: "apache",
                            compressible: !0,
                            extensions: ["gpx"]
                        },
                        "application/gxf": {
                            source: "apache",
                            extensions: ["gxf"]
                        },
                        "application/gzip": {
                            source: "iana",
                            compressible: !1,
                            extensions: ["gz"]
                        },
                        "application/h224": {
                            source: "iana"
                        },
                        "application/held+xml": {
                            source: "iana",
                            compressible: !0
                        },
                        "application/hjson": {
                            extensions: ["hjson"]
                        },
                        "application/http": {
                            source: "iana"
                        },
                        "application/hyperstudio": {
                            source: "iana",
                            extensions: ["stk"]
                        },
                        "application/ibe-key-request+xml": {
                            source: "iana",
                            compressible: !0
                        },
                        "application/ibe-pkg-reply+xml": {
                            source: "iana",
                            compressible: !0
                        },
                        "application/ibe-pp-data": {
                            source: "iana"
                        },
                        "application/iges": {
                            source: "iana"
                        },
                        "application/im-iscomposing+xml": {
                            source: "iana",
                            charset: "UTF-8",
                            compressible: !0
                        },
                        "application/index": {
                            source: "iana"
                        },
                        "application/index.cmd": {
                            source: "iana"
                        },
                        "application/index.obj": {
                            source: "iana"
                        },
                        "application/index.response": {
                            source: "iana"
                        },
                        "application/index.vnd": {
                            source: "iana"
                        },
                        "application/inkml+xml": {
                            source: "iana",
                            compressible: !0,
                            extensions: ["ink", "inkml"]
                        },
                        "application/iotp": {
                            source: "iana"
                        },
                        "application/ipfix": {
                            source: "iana",
                            extensions: ["ipfix"]
                        },
                        "application/ipp": {
                            source: "iana"
                        },
                        "application/isup": {
                            source: "iana"
                        },
                        "application/its+xml": {
                            source: "iana",
                            compressible: !0,
                            extensions: ["its"]
                        },
                        "application/java-archive": {
                            source: "apache",
                            compressible: !1,
                            extensions: ["jar", "war", "ear"]
                        },
                        "application/java-serialized-object": {
                            source: "apache",
                            compressible: !1,
                            extensions: ["ser"]
                        },
                        "application/java-vm": {
                            source: "apache",
                            compressible: !1,
                            extensions: ["class"]
                        },
                        "application/javascript": {
                            source: "iana",
                            charset: "UTF-8",
                            compressible: !0,
                            extensions: ["js", "mjs"]
                        },
                        "application/jf2feed+json": {
                            source: "iana",
                            compressible: !0
                        },
                        "application/jose": {
                            source: "iana"
                        },
                        "application/jose+json": {
                            source: "iana",
                            compressible: !0
                        },
                        "application/jrd+json": {
                            source: "iana",
                            compressible: !0
                        },
                        "application/jscalendar+json": {
                            source: "iana",
                            compressible: !0
                        },
                        "application/json": {
                            source: "iana",
                            charset: "UTF-8",
                            compressible: !0,
                            extensions: ["json", "map"]
                        },
                        "application/json-patch+json": {
                            source: "iana",
                            compressible: !0
                        },
                        "application/json-seq": {
                            source: "iana"
                        },
                        "application/json5": {
                            extensions: ["json5"]
                        },
                        "application/jsonml+json": {
                            source: "apache",
                            compressible: !0,
                            extensions: ["jsonml"]
                        },
                        "application/jwk+json": {
                            source: "iana",
                            compressible: !0
                        },
                        "application/jwk-set+json": {
                            source: "iana",
                            compressible: !0
                        },
                        "application/jwt": {
                            source: "iana"
                        },
                        "application/kpml-request+xml": {
                            source: "iana",
                            compressible: !0
                        },
                        "application/kpml-response+xml": {
                            source: "iana",
                            compressible: !0
                        },
                        "application/ld+json": {
                            source: "iana",
                            compressible: !0,
                            extensions: ["jsonld"]
                        },
                        "application/lgr+xml": {
                            source: "iana",
                            compressible: !0,
                            extensions: ["lgr"]
                        },
                        "application/link-format": {
                            source: "iana"
                        },
                        "application/load-control+xml": {
                            source: "iana",
                            compressible: !0
                        },
                        "application/lost+xml": {
                            source: "iana",
                            compressible: !0,
                            extensions: ["lostxml"]
                        },
                        "application/lostsync+xml": {
                            source: "iana",
                            compressible: !0
                        },
                        "application/lpf+zip": {
                            source: "iana",
                            compressible: !1
                        },
                        "application/lxf": {
                            source: "iana"
                        },
                        "application/mac-binhex40": {
                            source: "iana",
                            extensions: ["hqx"]
                        },
                        "application/mac-compactpro": {
                            source: "apache",
                            extensions: ["cpt"]
                        },
                        "application/macwriteii": {
                            source: "iana"
                        },
                        "application/mads+xml": {
                            source: "iana",
                            compressible: !0,
                            extensions: ["mads"]
                        },
                        "application/manifest+json": {
                            source: "iana",
                            charset: "UTF-8",
                            compressible: !0,
                            extensions: ["webmanifest"]
                        },
                        "application/marc": {
                            source: "iana",
                            extensions: ["mrc"]
                        },
                        "application/marcxml+xml": {
                            source: "iana",
                            compressible: !0,
                            extensions: ["mrcx"]
                        },
                        "application/mathematica": {
                            source: "iana",
                            extensions: ["ma", "nb", "mb"]
                        },
                        "application/mathml+xml": {
                            source: "iana",
                            compressible: !0,
                            extensions: ["mathml"]
                        },
                        "application/mathml-content+xml": {
                            source: "iana",
                            compressible: !0
                        },
                        "application/mathml-presentation+xml": {
                            source: "iana",
                            compressible: !0
                        },
                        "application/mbms-associated-procedure-description+xml": {
                            source: "iana",
                            compressible: !0
                        },
                        "application/mbms-deregister+xml": {
                            source: "iana",
                            compressible: !0
                        },
                        "application/mbms-envelope+xml": {
                            source: "iana",
                            compressible: !0
                        },
                        "application/mbms-msk+xml": {
                            source: "iana",
                            compressible: !0
                        },
                        "application/mbms-msk-response+xml": {
                            source: "iana",
                            compressible: !0
                        },
                        "application/mbms-protection-description+xml": {
                            source: "iana",
                            compressible: !0
                        },
                        "application/mbms-reception-report+xml": {
                            source: "iana",
                            compressible: !0
                        },
                        "application/mbms-register+xml": {
                            source: "iana",
                            compressible: !0
                        },
                        "application/mbms-register-response+xml": {
                            source: "iana",
                            compressible: !0
                        },
                        "application/mbms-schedule+xml": {
                            source: "iana",
                            compressible: !0
                        },
                        "application/mbms-user-service-description+xml": {
                            source: "iana",
                            compressible: !0
                        },
                        "application/mbox": {
                            source: "iana",
                            extensions: ["mbox"]
                        },
                        "application/media-policy-dataset+xml": {
                            source: "iana",
                            compressible: !0,
                            extensions: ["mpf"]
                        },
                        "application/media_control+xml": {
                            source: "iana",
                            compressible: !0
                        },
                        "application/mediaservercontrol+xml": {
                            source: "iana",
                            compressible: !0,
                            extensions: ["mscml"]
                        },
                        "application/merge-patch+json": {
                            source: "iana",
                            compressible: !0
                        },
                        "application/metalink+xml": {
                            source: "apache",
                            compressible: !0,
                            extensions: ["metalink"]
                        },
                        "application/metalink4+xml": {
                            source: "iana",
                            compressible: !0,
                            extensions: ["meta4"]
                        },
                        "application/mets+xml": {
                            source: "iana",
                            compressible: !0,
                            extensions: ["mets"]
                        },
                        "application/mf4": {
                            source: "iana"
                        },
                        "application/mikey": {
                            source: "iana"
                        },
                        "application/mipc": {
                            source: "iana"
                        },
                        "application/missing-blocks+cbor-seq": {
                            source: "iana"
                        },
                        "application/mmt-aei+xml": {
                            source: "iana",
                            compressible: !0,
                            extensions: ["maei"]
                        },
                        "application/mmt-usd+xml": {
                            source: "iana",
                            compressible: !0,
                            extensions: ["musd"]
                        },
                        "application/mods+xml": {
                            source: "iana",
                            compressible: !0,
                            extensions: ["mods"]
                        },
                        "application/moss-keys": {
                            source: "iana"
                        },
                        "application/moss-signature": {
                            source: "iana"
                        },
                        "application/mosskey-data": {
                            source: "iana"
                        },
                        "application/mosskey-request": {
                            source: "iana"
                        },
                        "application/mp21": {
                            source: "iana",
                            extensions: ["m21", "mp21"]
                        },
                        "application/mp4": {
                            source: "iana",
                            extensions: ["mp4s", "m4p"]
                        },
                        "application/mpeg4-generic": {
                            source: "iana"
                        },
                        "application/mpeg4-iod": {
                            source: "iana"
                        },
                        "application/mpeg4-iod-xmt": {
                            source: "iana"
                        },
                        "application/mrb-consumer+xml": {
                            source: "iana",
                            compressible: !0
                        },
                        "application/mrb-publish+xml": {
                            source: "iana",
                            compressible: !0
                        },
                        "application/msc-ivr+xml": {
                            source: "iana",
                            charset: "UTF-8",
                            compressible: !0
                        },
                        "application/msc-mixer+xml": {
                            source: "iana",
                            charset: "UTF-8",
                            compressible: !0
                        },
                        "application/msword": {
                            source: "iana",
                            compressible: !1,
                            extensions: ["doc", "dot"]
                        },
                        "application/mud+json": {
                            source: "iana",
                            compressible: !0
                        },
                        "application/multipart-core": {
                            source: "iana"
                        },
                        "application/mxf": {
                            source: "iana",
                            extensions: ["mxf"]
                        },
                        "application/n-quads": {
                            source: "iana",
                            extensions: ["nq"]
                        },
                        "application/n-triples": {
                            source: "iana",
                            extensions: ["nt"]
                        },
                        "application/nasdata": {
                            source: "iana"
                        },
                        "application/news-checkgroups": {
                            source: "iana",
                            charset: "US-ASCII"
                        },
                        "application/news-groupinfo": {
                            source: "iana",
                            charset: "US-ASCII"
                        },
                        "application/news-transmission": {
                            source: "iana"
                        },
                        "application/nlsml+xml": {
                            source: "iana",
                            compressible: !0
                        },
                        "application/node": {
                            source: "iana",
                            extensions: ["cjs"]
                        },
                        "application/nss": {
                            source: "iana"
                        },
                        "application/oauth-authz-req+jwt": {
                            source: "iana"
                        },
                        "application/oblivious-dns-message": {
                            source: "iana"
                        },
                        "application/ocsp-request": {
                            source: "iana"
                        },
                        "application/ocsp-response": {
                            source: "iana"
                        },
                        "application/octet-stream": {
                            source: "iana",
                            compressible: !1,
                            extensions: ["bin", "dms", "lrf", "mar", "so", "dist", "distz", "pkg", "bpk", "dump", "elc", "deploy", "exe", "dll", "deb", "dmg", "iso", "img", "msi", "msp", "msm", "buffer"]
                        },
                        "application/oda": {
                            source: "iana",
                            extensions: ["oda"]
                        },
                        "application/odm+xml": {
                            source: "iana",
                            compressible: !0
                        },
                        "application/odx": {
                            source: "iana"
                        },
                        "application/oebps-package+xml": {
                            source: "iana",
                            compressible: !0,
                            extensions: ["opf"]
                        },
                        "application/ogg": {
                            source: "iana",
                            compressible: !1,
                            extensions: ["ogx"]
                        },
                        "application/omdoc+xml": {
                            source: "apache",
                            compressible: !0,
                            extensions: ["omdoc"]
                        },
                        "application/onenote": {
                            source: "apache",
                            extensions: ["onetoc", "onetoc2", "onetmp", "onepkg"]
                        },
                        "application/opc-nodeset+xml": {
                            source: "iana",
                            compressible: !0
                        },
                        "application/oscore": {
                            source: "iana"
                        },
                        "application/oxps": {
                            source: "iana",
                            extensions: ["oxps"]
                        },
                        "application/p21": {
                            source: "iana"
                        },
                        "application/p21+zip": {
                            source: "iana",
                            compressible: !1
                        },
                        "application/p2p-overlay+xml": {
                            source: "iana",
                            compressible: !0,
                            extensions: ["relo"]
                        },
                        "application/parityfec": {
                            source: "iana"
                        },
                        "application/passport": {
                            source: "iana"
                        },
                        "application/patch-ops-error+xml": {
                            source: "iana",
                            compressible: !0,
                            extensions: ["xer"]
                        },
                        "application/pdf": {
                            source: "iana",
                            compressible: !1,
                            extensions: ["pdf"]
                        },
                        "application/pdx": {
                            source: "iana"
                        },
                        "application/pem-certificate-chain": {
                            source: "iana"
                        },
                        "application/pgp-encrypted": {
                            source: "iana",
                            compressible: !1,
                            extensions: ["pgp"]
                        },
                        "application/pgp-keys": {
                            source: "iana",
                            extensions: ["asc"]
                        },
                        "application/pgp-signature": {
                            source: "iana",
                            extensions: ["asc", "sig"]
                        },
                        "application/pics-rules": {
                            source: "apache",
                            extensions: ["prf"]
                        },
                        "application/pidf+xml": {
                            source: "iana",
                            charset: "UTF-8",
                            compressible: !0
                        },
                        "application/pidf-diff+xml": {
                            source: "iana",
                            charset: "UTF-8",
                            compressible: !0
                        },
                        "application/pkcs10": {
                            source: "iana",
                            extensions: ["p10"]
                        },
                        "application/pkcs12": {
                            source: "iana"
                        },
                        "application/pkcs7-mime": {
                            source: "iana",
                            extensions: ["p7m", "p7c"]
                        },
                        "application/pkcs7-signature": {
                            source: "iana",
                            extensions: ["p7s"]
                        },
                        "application/pkcs8": {
                            source: "iana",
                            extensions: ["p8"]
                        },
                        "application/pkcs8-encrypted": {
                            source: "iana"
                        },
                        "application/pkix-attr-cert": {
                            source: "iana",
                            extensions: ["ac"]
                        },
                        "application/pkix-cert": {
                            source: "iana",
                            extensions: ["cer"]
                        },
                        "application/pkix-crl": {
                            source: "iana",
                            extensions: ["crl"]
                        },
                        "application/pkix-pkipath": {
                            source: "iana",
                            extensions: ["pkipath"]
                        },
                        "application/pkixcmp": {
                            source: "iana",
                            extensions: ["pki"]
                        },
                        "application/pls+xml": {
                            source: "iana",
                            compressible: !0,
                            extensions: ["pls"]
                        },
                        "application/poc-settings+xml": {
                            source: "iana",
                            charset: "UTF-8",
                            compressible: !0
                        },
                        "application/postscript": {
                            source: "iana",
                            compressible: !0,
                            extensions: ["ai", "eps", "ps"]
                        },
                        "application/ppsp-tracker+json": {
                            source: "iana",
                            compressible: !0
                        },
                        "application/problem+json": {
                            source: "iana",
                            compressible: !0
                        },
                        "application/problem+xml": {
                            source: "iana",
                            compressible: !0
                        },
                        "application/provenance+xml": {
                            source: "iana",
                            compressible: !0,
                            extensions: ["provx"]
                        },
                        "application/prs.alvestrand.titrax-sheet": {
                            source: "iana"
                        },
                        "application/prs.cww": {
                            source: "iana",
                            extensions: ["cww"]
                        },
                        "application/prs.cyn": {
                            source: "iana",
                            charset: "7-BIT"
                        },
                        "application/prs.hpub+zip": {
                            source: "iana",
                            compressible: !1
                        },
                        "application/prs.nprend": {
                            source: "iana"
                        },
                        "application/prs.plucker": {
                            source: "iana"
                        },
                        "application/prs.rdf-xml-crypt": {
                            source: "iana"
                        },
                        "application/prs.xsf+xml": {
                            source: "iana",
                            compressible: !0
                        },
                        "application/pskc+xml": {
                            source: "iana",
                            compressible: !0,
                            extensions: ["pskcxml"]
                        },
                        "application/pvd+json": {
                            source: "iana",
                            compressible: !0
                        },
                        "application/qsig": {
                            source: "iana"
                        },
                        "application/raml+yaml": {
                            compressible: !0,
                            extensions: ["raml"]
                        },
                        "application/raptorfec": {
                            source: "iana"
                        },
                        "application/rdap+json": {
                            source: "iana",
                            compressible: !0
                        },
                        "application/rdf+xml": {
                            source: "iana",
                            compressible: !0,
                            extensions: ["rdf", "owl"]
                        },
                        "application/reginfo+xml": {
                            source: "iana",
                            compressible: !0,
                            extensions: ["rif"]
                        },
                        "application/relax-ng-compact-syntax": {
                            source: "iana",
                            extensions: ["rnc"]
                        },
                        "application/remote-printing": {
                            source: "iana"
                        },
                        "application/reputon+json": {
                            source: "iana",
                            compressible: !0
                        },
                        "application/resource-lists+xml": {
                            source: "iana",
                            compressible: !0,
                            extensions: ["rl"]
                        },
                        "application/resource-lists-diff+xml": {
                            source: "iana",
                            compressible: !0,
                            extensions: ["rld"]
                        },
                        "application/rfc+xml": {
                            source: "iana",
                            compressible: !0
                        },
                        "application/riscos": {
                            source: "iana"
                        },
                        "application/rlmi+xml": {
                            source: "iana",
                            compressible: !0
                        },
                        "application/rls-services+xml": {
                            source: "iana",
                            compressible: !0,
                            extensions: ["rs"]
                        },
                        "application/route-apd+xml": {
                            source: "iana",
                            compressible: !0,
                            extensions: ["rapd"]
                        },
                        "application/route-s-tsid+xml": {
                            source: "iana",
                            compressible: !0,
                            extensions: ["sls"]
                        },
                        "application/route-usd+xml": {
                            source: "iana",
                            compressible: !0,
                            extensions: ["rusd"]
                        },
                        "application/rpki-ghostbusters": {
                            source: "iana",
                            extensions: ["gbr"]
                        },
                        "application/rpki-manifest": {
                            source: "iana",
                            extensions: ["mft"]
                        },
                        "application/rpki-publication": {
                            source: "iana"
                        },
                        "application/rpki-roa": {
                            source: "iana",
                            extensions: ["roa"]
                        },
                        "application/rpki-updown": {
                            source: "iana"
                        },
                        "application/rsd+xml": {
                            source: "apache",
                            compressible: !0,
                            extensions: ["rsd"]
                        },
                        "application/rss+xml": {
                            source: "apache",
                            compressible: !0,
                            extensions: ["rss"]
                        },
                        "application/rtf": {
                            source: "iana",
                            compressible: !0,
                            extensions: ["rtf"]
                        },
                        "application/rtploopback": {
                            source: "iana"
                        },
                        "application/rtx": {
                            source: "iana"
                        },
                        "application/samlassertion+xml": {
                            source: "iana",
                            compressible: !0
                        },
                        "application/samlmetadata+xml": {
                            source: "iana",
                            compressible: !0
                        },
                        "application/sarif+json": {
                            source: "iana",
                            compressible: !0
                        },
                        "application/sarif-external-properties+json": {
                            source: "iana",
                            compressible: !0
                        },
                        "application/sbe": {
                            source: "iana"
                        },
                        "application/sbml+xml": {
                            source: "iana",
                            compressible: !0,
                            extensions: ["sbml"]
                        },
                        "application/scaip+xml": {
                            source: "iana",
                            compressible: !0
                        },
                        "application/scim+json": {
                            source: "iana",
                            compressible: !0
                        },
                        "application/scvp-cv-request": {
                            source: "iana",
                            extensions: ["scq"]
                        },
                        "application/scvp-cv-response": {
                            source: "iana",
                            extensions: ["scs"]
                        },
                        "application/scvp-vp-request": {
                            source: "iana",
                            extensions: ["spq"]
                        },
                        "application/scvp-vp-response": {
                            source: "iana",
                            extensions: ["spp"]
                        },
                        "application/sdp": {
                            source: "iana",
                            extensions: ["sdp"]
                        },
                        "application/secevent+jwt": {
                            source: "iana"
                        },
                        "application/senml+cbor": {
                            source: "iana"
                        },
                        "application/senml+json": {
                            source: "iana",
                            compressible: !0
                        },
                        "application/senml+xml": {
                            source: "iana",
                            compressible: !0,
                            extensions: ["senmlx"]
                        },
                        "application/senml-etch+cbor": {
                            source: "iana"
                        },
                        "application/senml-etch+json": {
                            source: "iana",
                            compressible: !0
                        },
                        "application/senml-exi": {
                            source: "iana"
                        },
                        "application/sensml+cbor": {
                            source: "iana"
                        },
                        "application/sensml+json": {
                            source: "iana",
                            compressible: !0
                        },
                        "application/sensml+xml": {
                            source: "iana",
                            compressible: !0,
                            extensions: ["sensmlx"]
                        },
                        "application/sensml-exi": {
                            source: "iana"
                        },
                        "application/sep+xml": {
                            source: "iana",
                            compressible: !0
                        },
                        "application/sep-exi": {
                            source: "iana"
                        },
                        "application/session-info": {
                            source: "iana"
                        },
                        "application/set-payment": {
                            source: "iana"
                        },
                        "application/set-payment-initiation": {
                            source: "iana",
                            extensions: ["setpay"]
                        },
                        "application/set-registration": {
                            source: "iana"
                        },
                        "application/set-registration-initiation": {
                            source: "iana",
                            extensions: ["setreg"]
                        },
                        "application/sgml": {
                            source: "iana"
                        },
                        "application/sgml-open-catalog": {
                            source: "iana"
                        },
                        "application/shf+xml": {
                            source: "iana",
                            compressible: !0,
                            extensions: ["shf"]
                        },
                        "application/sieve": {
                            source: "iana",
                            extensions: ["siv", "sieve"]
                        },
                        "application/simple-filter+xml": {
                            source: "iana",
                            compressible: !0
                        },
                        "application/simple-message-summary": {
                            source: "iana"
                        },
                        "application/simplesymbolcontainer": {
                            source: "iana"
                        },
                        "application/sipc": {
                            source: "iana"
                        },
                        "application/slate": {
                            source: "iana"
                        },
                        "application/smil": {
                            source: "iana"
                        },
                        "application/smil+xml": {
                            source: "iana",
                            compressible: !0,
                            extensions: ["smi", "smil"]
                        },
                        "application/smpte336m": {
                            source: "iana"
                        },
                        "application/soap+fastinfoset": {
                            source: "iana"
                        },
                        "application/soap+xml": {
                            source: "iana",
                            compressible: !0
                        },
                        "application/sparql-query": {
                            source: "iana",
                            extensions: ["rq"]
                        },
                        "application/sparql-results+xml": {
                            source: "iana",
                            compressible: !0,
                            extensions: ["srx"]
                        },
                        "application/spdx+json": {
                            source: "iana",
                            compressible: !0
                        },
                        "application/spirits-event+xml": {
                            source: "iana",
                            compressible: !0
                        },
                        "application/sql": {
                            source: "iana"
                        },
                        "application/srgs": {
                            source: "iana",
                            extensions: ["gram"]
                        },
                        "application/srgs+xml": {
                            source: "iana",
                            compressible: !0,
                            extensions: ["grxml"]
                        },
                        "application/sru+xml": {
                            source: "iana",
                            compressible: !0,
                            extensions: ["sru"]
                        },
                        "application/ssdl+xml": {
                            source: "apache",
                            compressible: !0,
                            extensions: ["ssdl"]
                        },
                        "application/ssml+xml": {
                            source: "iana",
                            compressible: !0,
                            extensions: ["ssml"]
                        },
                        "application/stix+json": {
                            source: "iana",
                            compressible: !0
                        },
                        "application/swid+xml": {
                            source: "iana",
                            compressible: !0,
                            extensions: ["swidtag"]
                        },
                        "application/tamp-apex-update": {
                            source: "iana"
                        },
                        "application/tamp-apex-update-confirm": {
                            source: "iana"
                        },
                        "application/tamp-community-update": {
                            source: "iana"
                        },
                        "application/tamp-community-update-confirm": {
                            source: "iana"
                        },
                        "application/tamp-error": {
                            source: "iana"
                        },
                        "application/tamp-sequence-adjust": {
                            source: "iana"
                        },
                        "application/tamp-sequence-adjust-confirm": {
                            source: "iana"
                        },
                        "application/tamp-status-query": {
                            source: "iana"
                        },
                        "application/tamp-status-response": {
                            source: "iana"
                        },
                        "application/tamp-update": {
                            source: "iana"
                        },
                        "application/tamp-update-confirm": {
                            source: "iana"
                        },
                        "application/tar": {
                            compressible: !0
                        },
                        "application/taxii+json": {
                            source: "iana",
                            compressible: !0
                        },
                        "application/td+json": {
                            source: "iana",
                            compressible: !0
                        },
                        "application/tei+xml": {
                            source: "iana",
                            compressible: !0,
                            extensions: ["tei", "teicorpus"]
                        },
                        "application/tetra_isi": {
                            source: "iana"
                        },
                        "application/thraud+xml": {
                            source: "iana",
                            compressible: !0,
                            extensions: ["tfi"]
                        },
                        "application/timestamp-query": {
                            source: "iana"
                        },
                        "application/timestamp-reply": {
                            source: "iana"
                        },
                        "application/timestamped-data": {
                            source: "iana",
                            extensions: ["tsd"]
                        },
                        "application/tlsrpt+gzip": {
                            source: "iana"
                        },
                        "application/tlsrpt+json": {
                            source: "iana",
                            compressible: !0
                        },
                        "application/tnauthlist": {
                            source: "iana"
                        },
                        "application/token-introspection+jwt": {
                            source: "iana"
                        },
                        "application/toml": {
                            compressible: !0,
                            extensions: ["toml"]
                        },
                        "application/trickle-ice-sdpfrag": {
                            source: "iana"
                        },
                        "application/trig": {
                            source: "iana",
                            extensions: ["trig"]
                        },
                        "application/ttml+xml": {
                            source: "iana",
                            compressible: !0,
                            extensions: ["ttml"]
                        },
                        "application/tve-trigger": {
                            source: "iana"
                        },
                        "application/tzif": {
                            source: "iana"
                        },
                        "application/tzif-leap": {
                            source: "iana"
                        },
                        "application/ubjson": {
                            compressible: !1,
                            extensions: ["ubj"]
                        },
                        "application/ulpfec": {
                            source: "iana"
                        },
                        "application/urc-grpsheet+xml": {
                            source: "iana",
                            compressible: !0
                        },
                        "application/urc-ressheet+xml": {
                            source: "iana",
                            compressible: !0,
                            extensions: ["rsheet"]
                        },
                        "application/urc-targetdesc+xml": {
                            source: "iana",
                            compressible: !0,
                            extensions: ["td"]
                        },
                        "application/urc-uisocketdesc+xml": {
                            source: "iana",
                            compressible: !0
                        },
                        "application/vcard+json": {
                            source: "iana",
                            compressible: !0
                        },
                        "application/vcard+xml": {
                            source: "iana",
                            compressible: !0
                        },
                        "application/vemmi": {
                            source: "iana"
                        },
                        "application/vividence.scriptfile": {
                            source: "apache"
                        },
                        "application/vnd.1000minds.decision-model+xml": {
                            source: "iana",
                            compressible: !0,
                            extensions: ["1km"]
                        },
                        "application/vnd.3gpp-prose+xml": {
                            source: "iana",
                            compressible: !0
                        },
                        "application/vnd.3gpp-prose-pc3ch+xml": {
                            source: "iana",
                            compressible: !0
                        },
                        "application/vnd.3gpp-v2x-local-service-information": {
                            source: "iana"
                        },
                        "application/vnd.3gpp.5gnas": {
                            source: "iana"
                        },
                        "application/vnd.3gpp.access-transfer-events+xml": {
                            source: "iana",
                            compressible: !0
                        },
                        "application/vnd.3gpp.bsf+xml": {
                            source: "iana",
                            compressible: !0
                        },
                        "application/vnd.3gpp.gmop+xml": {
                            source: "iana",
                            compressible: !0
                        },
                        "application/vnd.3gpp.gtpc": {
                            source: "iana"
                        },
                        "application/vnd.3gpp.interworking-data": {
                            source: "iana"
                        },
                        "application/vnd.3gpp.lpp": {
                            source: "iana"
                        },
                        "application/vnd.3gpp.mc-signalling-ear": {
                            source: "iana"
                        },
                        "application/vnd.3gpp.mcdata-affiliation-command+xml": {
                            source: "iana",
                            compressible: !0
                        },
                        "application/vnd.3gpp.mcdata-info+xml": {
                            source: "iana",
                            compressible: !0
                        },
                        "application/vnd.3gpp.mcdata-payload": {
                            source: "iana"
                        },
                        "application/vnd.3gpp.mcdata-service-config+xml": {
                            source: "iana",
                            compressible: !0
                        },
                        "application/vnd.3gpp.mcdata-signalling": {
                            source: "iana"
                        },
                        "application/vnd.3gpp.mcdata-ue-config+xml": {
                            source: "iana",
                            compressible: !0
                        },
                        "application/vnd.3gpp.mcdata-user-profile+xml": {
                            source: "iana",
                            compressible: !0
                        },
                        "application/vnd.3gpp.mcptt-affiliation-command+xml": {
                            source: "iana",
                            compressible: !0
                        },
                        "application/vnd.3gpp.mcptt-floor-request+xml": {
                            source: "iana",
                            compressible: !0
                        },
                        "application/vnd.3gpp.mcptt-info+xml": {
                            source: "iana",
                            compressible: !0
                        },
                        "application/vnd.3gpp.mcptt-location-info+xml": {
                            source: "iana",
                            compressible: !0
                        },
                        "application/vnd.3gpp.mcptt-mbms-usage-info+xml": {
                            source: "iana",
                            compressible: !0
                        },
                        "application/vnd.3gpp.mcptt-service-config+xml": {
                            source: "iana",
                            compressible: !0
                        },
                        "application/vnd.3gpp.mcptt-signed+xml": {
                            source: "iana",
                            compressible: !0
                        },
                        "application/vnd.3gpp.mcptt-ue-config+xml": {
                            source: "iana",
                            compressible: !0
                        },
                        "application/vnd.3gpp.mcptt-ue-init-config+xml": {
                            source: "iana",
                            compressible: !0
                        },
                        "application/vnd.3gpp.mcptt-user-profile+xml": {
                            source: "iana",
                            compressible: !0
                        },
                        "application/vnd.3gpp.mcvideo-affiliation-command+xml": {
                            source: "iana",
                            compressible: !0
                        },
                        "application/vnd.3gpp.mcvideo-affiliation-info+xml": {
                            source: "iana",
                            compressible: !0
                        },
                        "application/vnd.3gpp.mcvideo-info+xml": {
                            source: "iana",
                            compressible: !0
                        },
                        "application/vnd.3gpp.mcvideo-location-info+xml": {
                            source: "iana",
                            compressible: !0
                        },
                        "application/vnd.3gpp.mcvideo-mbms-usage-info+xml": {
                            source: "iana",
                            compressible: !0
                        },
                        "application/vnd.3gpp.mcvideo-service-config+xml": {
                            source: "iana",
                            compressible: !0
                        },
                        "application/vnd.3gpp.mcvideo-transmission-request+xml": {
                            source: "iana",
                            compressible: !0
                        },
                        "application/vnd.3gpp.mcvideo-ue-config+xml": {
                            source: "iana",
                            compressible: !0
                        },
                        "application/vnd.3gpp.mcvideo-user-profile+xml": {
                            source: "iana",
                            compressible: !0
                        },
                        "application/vnd.3gpp.mid-call+xml": {
                            source: "iana",
                            compressible: !0
                        },
                        "application/vnd.3gpp.ngap": {
                            source: "iana"
                        },
                        "application/vnd.3gpp.pfcp": {
                            source: "iana"
                        },
                        "application/vnd.3gpp.pic-bw-large": {
                            source: "iana",
                            extensions: ["plb"]
                        },
                        "application/vnd.3gpp.pic-bw-small": {
                            source: "iana",
                            extensions: ["psb"]
                        },
                        "application/vnd.3gpp.pic-bw-var": {
                            source: "iana",
                            extensions: ["pvb"]
                        },
                        "application/vnd.3gpp.s1ap": {
                            source: "iana"
                        },
                        "application/vnd.3gpp.sms": {
                            source: "iana"
                        },
                        "application/vnd.3gpp.sms+xml": {
                            source: "iana",
                            compressible: !0
                        },
                        "application/vnd.3gpp.srvcc-ext+xml": {
                            source: "iana",
                            compressible: !0
                        },
                        "application/vnd.3gpp.srvcc-info+xml": {
                            source: "iana",
                            compressible: !0
                        },
                        "application/vnd.3gpp.state-and-event-info+xml": {
                            source: "iana",
                            compressible: !0
                        },
                        "application/vnd.3gpp.ussd+xml": {
                            source: "iana",
                            compressible: !0
                        },
                        "application/vnd.3gpp2.bcmcsinfo+xml": {
                            source: "iana",
                            compressible: !0
                        },
                        "application/vnd.3gpp2.sms": {
                            source: "iana"
                        },
                        "application/vnd.3gpp2.tcap": {
                            source: "iana",
                            extensions: ["tcap"]
                        },
                        "application/vnd.3lightssoftware.imagescal": {
                            source: "iana"
                        },
                        "application/vnd.3m.post-it-notes": {
                            source: "iana",
                            extensions: ["pwn"]
                        },
                        "application/vnd.accpac.simply.aso": {
                            source: "iana",
                            extensions: ["aso"]
                        },
                        "application/vnd.accpac.simply.imp": {
                            source: "iana",
                            extensions: ["imp"]
                        },
                        "application/vnd.acucobol": {
                            source: "iana",
                            extensions: ["acu"]
                        },
                        "application/vnd.acucorp": {
                            source: "iana",
                            extensions: ["atc", "acutc"]
                        },
                        "application/vnd.adobe.air-application-installer-package+zip": {
                            source: "apache",
                            compressible: !1,
                            extensions: ["air"]
                        },
                        "application/vnd.adobe.flash.movie": {
                            source: "iana"
                        },
                        "application/vnd.adobe.formscentral.fcdt": {
                            source: "iana",
                            extensions: ["fcdt"]
                        },
                        "application/vnd.adobe.fxp": {
                            source: "iana",
                            extensions: ["fxp", "fxpl"]
                        },
                        "application/vnd.adobe.partial-upload": {
                            source: "iana"
                        },
                        "application/vnd.adobe.xdp+xml": {
                            source: "iana",
                            compressible: !0,
                            extensions: ["xdp"]
                        },
                        "application/vnd.adobe.xfdf": {
                            source: "iana",
                            extensions: ["xfdf"]
                        },
                        "application/vnd.aether.imp": {
                            source: "iana"
                        },
                        "application/vnd.afpc.afplinedata": {
                            source: "iana"
                        },
                        "application/vnd.afpc.afplinedata-pagedef": {
                            source: "iana"
                        },
                        "application/vnd.afpc.cmoca-cmresource": {
                            source: "iana"
                        },
                        "application/vnd.afpc.foca-charset": {
                            source: "iana"
                        },
                        "application/vnd.afpc.foca-codedfont": {
                            source: "iana"
                        },
                        "application/vnd.afpc.foca-codepage": {
                            source: "iana"
                        },
                        "application/vnd.afpc.modca": {
                            source: "iana"
                        },
                        "application/vnd.afpc.modca-cmtable": {
                            source: "iana"
                        },
                        "application/vnd.afpc.modca-formdef": {
                            source: "iana"
                        },
                        "application/vnd.afpc.modca-mediummap": {
                            source: "iana"
                        },
                        "application/vnd.afpc.modca-objectcontainer": {
                            source: "iana"
                        },
                        "application/vnd.afpc.modca-overlay": {
                            source: "iana"
                        },
                        "application/vnd.afpc.modca-pagesegment": {
                            source: "iana"
                        },
                        "application/vnd.age": {
                            source: "iana",
                            extensions: ["age"]
                        },
                        "application/vnd.ah-barcode": {
                            source: "iana"
                        },
                        "application/vnd.ahead.space": {
                            source: "iana",
                            extensions: ["ahead"]
                        },
                        "application/vnd.airzip.filesecure.azf": {
                            source: "iana",
                            extensions: ["azf"]
                        },
                        "application/vnd.airzip.filesecure.azs": {
                            source: "iana",
                            extensions: ["azs"]
                        },
                        "application/vnd.amadeus+json": {
                            source: "iana",
                            compressible: !0
                        },
                        "application/vnd.amazon.ebook": {
                            source: "apache",
                            extensions: ["azw"]
                        },
                        "application/vnd.amazon.mobi8-ebook": {
                            source: "iana"
                        },
                        "application/vnd.americandynamics.acc": {
                            source: "iana",
                            extensions: ["acc"]
                        },
                        "application/vnd.amiga.ami": {
                            source: "iana",
                            extensions: ["ami"]
                        },
                        "application/vnd.amundsen.maze+xml": {
                            source: "iana",
                            compressible: !0
                        },
                        "application/vnd.android.ota": {
                            source: "iana"
                        },
                        "application/vnd.android.package-archive": {
                            source: "apache",
                            compressible: !1,
                            extensions: ["apk"]
                        },
                        "application/vnd.anki": {
                            source: "iana"
                        },
                        "application/vnd.anser-web-certificate-issue-initiation": {
                            source: "iana",
                            extensions: ["cii"]
                        },
                        "application/vnd.anser-web-funds-transfer-initiation": {
                            source: "apache",
                            extensions: ["fti"]
                        },
                        "application/vnd.antix.game-component": {
                            source: "iana",
                            extensions: ["atx"]
                        },
                        "application/vnd.apache.arrow.file": {
                            source: "iana"
                        },
                        "application/vnd.apache.arrow.stream": {
                            source: "iana"
                        },
                        "application/vnd.apache.thrift.binary": {
                            source: "iana"
                        },
                        "application/vnd.apache.thrift.compact": {
                            source: "iana"
                        },
                        "application/vnd.apache.thrift.json": {
                            source: "iana"
                        },
                        "application/vnd.api+json": {
                            source: "iana",
                            compressible: !0
                        },
                        "application/vnd.aplextor.warrp+json": {
                            source: "iana",
                            compressible: !0
                        },
                        "application/vnd.apothekende.reservation+json": {
                            source: "iana",
                            compressible: !0
                        },
                        "application/vnd.apple.installer+xml": {
                            source: "iana",
                            compressible: !0,
                            extensions: ["mpkg"]
                        },
                        "application/vnd.apple.keynote": {
                            source: "iana",
                            extensions: ["key"]
                        },
                        "application/vnd.apple.mpegurl": {
                            source: "iana",
                            extensions: ["m3u8"]
                        },
                        "application/vnd.apple.numbers": {
                            source: "iana",
                            extensions: ["numbers"]
                        },
                        "application/vnd.apple.pages": {
                            source: "iana",
                            extensions: ["pages"]
                        },
                        "application/vnd.apple.pkpass": {
                            compressible: !1,
                            extensions: ["pkpass"]
                        },
                        "application/vnd.arastra.swi": {
                            source: "iana"
                        },
                        "application/vnd.aristanetworks.swi": {
                            source: "iana",
                            extensions: ["swi"]
                        },
                        "application/vnd.artisan+json": {
                            source: "iana",
                            compressible: !0
                        },
                        "application/vnd.artsquare": {
                            source: "iana"
                        },
                        "application/vnd.astraea-software.iota": {
                            source: "iana",
                            extensions: ["iota"]
                        },
                        "application/vnd.audiograph": {
                            source: "iana",
                            extensions: ["aep"]
                        },
                        "application/vnd.autopackage": {
                            source: "iana"
                        },
                        "application/vnd.avalon+json": {
                            source: "iana",
                            compressible: !0
                        },
                        "application/vnd.avistar+xml": {
                            source: "iana",
                            compressible: !0
                        },
                        "application/vnd.balsamiq.bmml+xml": {
                            source: "iana",
                            compressible: !0,
                            extensions: ["bmml"]
                        },
                        "application/vnd.balsamiq.bmpr": {
                            source: "iana"
                        },
                        "application/vnd.banana-accounting": {
                            source: "iana"
                        },
                        "application/vnd.bbf.usp.error": {
                            source: "iana"
                        },
                        "application/vnd.bbf.usp.msg": {
                            source: "iana"
                        },
                        "application/vnd.bbf.usp.msg+json": {
                            source: "iana",
                            compressible: !0
                        },
                        "application/vnd.bekitzur-stech+json": {
                            source: "iana",
                            compressible: !0
                        },
                        "application/vnd.bint.med-content": {
                            source: "iana"
                        },
                        "application/vnd.biopax.rdf+xml": {
                            source: "iana",
                            compressible: !0
                        },
                        "application/vnd.blink-idb-value-wrapper": {
                            source: "iana"
                        },
                        "application/vnd.blueice.multipass": {
                            source: "iana",
                            extensions: ["mpm"]
                        },
                        "application/vnd.bluetooth.ep.oob": {
                            source: "iana"
                        },
                        "application/vnd.bluetooth.le.oob": {
                            source: "iana"
                        },
                        "application/vnd.bmi": {
                            source: "iana",
                            extensions: ["bmi"]
                        },
                        "application/vnd.bpf": {
                            source: "iana"
                        },
                        "application/vnd.bpf3": {
                            source: "iana"
                        },
                        "application/vnd.businessobjects": {
                            source: "iana",
                            extensions: ["rep"]
                        },
                        "application/vnd.byu.uapi+json": {
                            source: "iana",
                            compressible: !0
                        },
                        "application/vnd.cab-jscript": {
                            source: "iana"
                        },
                        "application/vnd.canon-cpdl": {
                            source: "iana"
                        },
                        "application/vnd.canon-lips": {
                            source: "iana"
                        },
                        "application/vnd.capasystems-pg+json": {
                            source: "iana",
                            compressible: !0
                        },
                        "application/vnd.cendio.thinlinc.clientconf": {
                            source: "iana"
                        },
                        "application/vnd.century-systems.tcp_stream": {
                            source: "iana"
                        },
                        "application/vnd.chemdraw+xml": {
                            source: "iana",
                            compressible: !0,
                            extensions: ["cdxml"]
                        },
                        "application/vnd.chess-pgn": {
                            source: "iana"
                        },
                        "application/vnd.chipnuts.karaoke-mmd": {
                            source: "iana",
                            extensions: ["mmd"]
                        },
                        "application/vnd.ciedi": {
                            source: "iana"
                        },
                        "application/vnd.cinderella": {
                            source: "iana",
                            extensions: ["cdy"]
                        },
                        "application/vnd.cirpack.isdn-ext": {
                            source: "iana"
                        },
                        "application/vnd.citationstyles.style+xml": {
                            source: "iana",
                            compressible: !0,
                            extensions: ["csl"]
                        },
                        "application/vnd.claymore": {
                            source: "iana",
                            extensions: ["cla"]
                        },
                        "application/vnd.cloanto.rp9": {
                            source: "iana",
                            extensions: ["rp9"]
                        },
                        "application/vnd.clonk.c4group": {
                            source: "iana",
                            extensions: ["c4g", "c4d", "c4f", "c4p", "c4u"]
                        },
                        "application/vnd.cluetrust.cartomobile-config": {
                            source: "iana",
                            extensions: ["c11amc"]
                        },
                        "application/vnd.cluetrust.cartomobile-config-pkg": {
                            source: "iana",
                            extensions: ["c11amz"]
                        },
                        "application/vnd.coffeescript": {
                            source: "iana"
                        },
                        "application/vnd.collabio.xodocuments.document": {
                            source: "iana"
                        },
                        "application/vnd.collabio.xodocuments.document-template": {
                            source: "iana"
                        },
                        "application/vnd.collabio.xodocuments.presentation": {
                            source: "iana"
                        },
                        "application/vnd.collabio.xodocuments.presentation-template": {
                            source: "iana"
                        },
                        "application/vnd.collabio.xodocuments.spreadsheet": {
                            source: "iana"
                        },
                        "application/vnd.collabio.xodocuments.spreadsheet-template": {
                            source: "iana"
                        },
                        "application/vnd.collection+json": {
                            source: "iana",
                            compressible: !0
                        },
                        "application/vnd.collection.doc+json": {
                            source: "iana",
                            compressible: !0
                        },
                        "application/vnd.collection.next+json": {
                            source: "iana",
                            compressible: !0
                        },
                        "application/vnd.comicbook+zip": {
                            source: "iana",
                            compressible: !1
                        },
                        "application/vnd.comicbook-rar": {
                            source: "iana"
                        },
                        "application/vnd.commerce-battelle": {
                            source: "iana"
                        },
                        "application/vnd.commonspace": {
                            source: "iana",
                            extensions: ["csp"]
                        },
                        "application/vnd.contact.cmsg": {
                            source: "iana",
                            extensions: ["cdbcmsg"]
                        },
                        "application/vnd.coreos.ignition+json": {
                            source: "iana",
                            compressible: !0
                        },
                        "application/vnd.cosmocaller": {
                            source: "iana",
                            extensions: ["cmc"]
                        },
                        "application/vnd.crick.clicker": {
                            source: "iana",
                            extensions: ["clkx"]
                        },
                        "application/vnd.crick.clicker.keyboard": {
                            source: "iana",
                            extensions: ["clkk"]
                        },
                        "application/vnd.crick.clicker.palette": {
                            source: "iana",
                            extensions: ["clkp"]
                        },
                        "application/vnd.crick.clicker.template": {
                            source: "iana",
                            extensions: ["clkt"]
                        },
                        "application/vnd.crick.clicker.wordbank": {
                            source: "iana",
                            extensions: ["clkw"]
                        },
                        "application/vnd.criticaltools.wbs+xml": {
                            source: "iana",
                            compressible: !0,
                            extensions: ["wbs"]
                        },
                        "application/vnd.cryptii.pipe+json": {
                            source: "iana",
                            compressible: !0
                        },
                        "application/vnd.crypto-shade-file": {
                            source: "iana"
                        },
                        "application/vnd.cryptomator.encrypted": {
                            source: "iana"
                        },
                        "application/vnd.cryptomator.vault": {
                            source: "iana"
                        },
                        "application/vnd.ctc-posml": {
                            source: "iana",
                            extensions: ["pml"]
                        },
                        "application/vnd.ctct.ws+xml": {
                            source: "iana",
                            compressible: !0
                        },
                        "application/vnd.cups-pdf": {
                            source: "iana"
                        },
                        "application/vnd.cups-postscript": {
                            source: "iana"
                        },
                        "application/vnd.cups-ppd": {
                            source: "iana",
                            extensions: ["ppd"]
                        },
                        "application/vnd.cups-raster": {
                            source: "iana"
                        },
                        "application/vnd.cups-raw": {
                            source: "iana"
                        },
                        "application/vnd.curl": {
                            source: "iana"
                        },
                        "application/vnd.curl.car": {
                            source: "apache",
                            extensions: ["car"]
                        },
                        "application/vnd.curl.pcurl": {
                            source: "apache",
                            extensions: ["pcurl"]
                        },
                        "application/vnd.cyan.dean.root+xml": {
                            source: "iana",
                            compressible: !0
                        },
                        "application/vnd.cybank": {
                            source: "iana"
                        },
                        "application/vnd.cyclonedx+json": {
                            source: "iana",
                            compressible: !0
                        },
                        "application/vnd.cyclonedx+xml": {
                            source: "iana",
                            compressible: !0
                        },
                        "application/vnd.d2l.coursepackage1p0+zip": {
                            source: "iana",
                            compressible: !1
                        },
                        "application/vnd.d3m-dataset": {
                            source: "iana"
                        },
                        "application/vnd.d3m-problem": {
                            source: "iana"
                        },
                        "application/vnd.dart": {
                            source: "iana",
                            compressible: !0,
                            extensions: ["dart"]
                        },
                        "application/vnd.data-vision.rdz": {
                            source: "iana",
                            extensions: ["rdz"]
                        },
                        "application/vnd.datapackage+json": {
                            source: "iana",
                            compressible: !0
                        },
                        "application/vnd.dataresource+json": {
                            source: "iana",
                            compressible: !0
                        },
                        "application/vnd.dbf": {
                            source: "iana",
                            extensions: ["dbf"]
                        },
                        "application/vnd.debian.binary-package": {
                            source: "iana"
                        },
                        "application/vnd.dece.data": {
                            source: "iana",
                            extensions: ["uvf", "uvvf", "uvd", "uvvd"]
                        },
                        "application/vnd.dece.ttml+xml": {
                            source: "iana",
                            compressible: !0,
                            extensions: ["uvt", "uvvt"]
                        },
                        "application/vnd.dece.unspecified": {
                            source: "iana",
                            extensions: ["uvx", "uvvx"]
                        },
                        "application/vnd.dece.zip": {
                            source: "iana",
                            extensions: ["uvz", "uvvz"]
                        },
                        "application/vnd.denovo.fcselayout-link": {
                            source: "iana",
                            extensions: ["fe_launch"]
                        },
                        "application/vnd.desmume.movie": {
                            source: "iana"
                        },
                        "application/vnd.dir-bi.plate-dl-nosuffix": {
                            source: "iana"
                        },
                        "application/vnd.dm.delegation+xml": {
                            source: "iana",
                            compressible: !0
                        },
                        "application/vnd.dna": {
                            source: "iana",
                            extensions: ["dna"]
                        },
                        "application/vnd.document+json": {
                            source: "iana",
                            compressible: !0
                        },
                        "application/vnd.dolby.mlp": {
                            source: "apache",
                            extensions: ["mlp"]
                        },
                        "application/vnd.dolby.mobile.1": {
                            source: "iana"
                        },
                        "application/vnd.dolby.mobile.2": {
                            source: "iana"
                        },
                        "application/vnd.doremir.scorecloud-binary-document": {
                            source: "iana"
                        },
                        "application/vnd.dpgraph": {
                            source: "iana",
                            extensions: ["dpg"]
                        },
                        "application/vnd.dreamfactory": {
                            source: "iana",
                            extensions: ["dfac"]
                        },
                        "application/vnd.drive+json": {
                            source: "iana",
                            compressible: !0
                        },
                        "application/vnd.ds-keypoint": {
                            source: "apache",
                            extensions: ["kpxx"]
                        },
                        "application/vnd.dtg.local": {
                            source: "iana"
                        },
                        "application/vnd.dtg.local.flash": {
                            source: "iana"
                        },
                        "application/vnd.dtg.local.html": {
                            source: "iana"
                        },
                        "application/vnd.dvb.ait": {
                            source: "iana",
                            extensions: ["ait"]
                        },
                        "application/vnd.dvb.dvbisl+xml": {
                            source: "iana",
                            compressible: !0
                        },
                        "application/vnd.dvb.dvbj": {
                            source: "iana"
                        },
                        "application/vnd.dvb.esgcontainer": {
                            source: "iana"
                        },
                        "application/vnd.dvb.ipdcdftnotifaccess": {
                            source: "iana"
                        },
                        "application/vnd.dvb.ipdcesgaccess": {
                            source: "iana"
                        },
                        "application/vnd.dvb.ipdcesgaccess2": {
                            source: "iana"
                        },
                        "application/vnd.dvb.ipdcesgpdd": {
                            source: "iana"
                        },
                        "application/vnd.dvb.ipdcroaming": {
                            source: "iana"
                        },
                        "application/vnd.dvb.iptv.alfec-base": {
                            source: "iana"
                        },
                        "application/vnd.dvb.iptv.alfec-enhancement": {
                            source: "iana"
                        },
                        "application/vnd.dvb.notif-aggregate-root+xml": {
                            source: "iana",
                            compressible: !0
                        },
                        "application/vnd.dvb.notif-container+xml": {
                            source: "iana",
                            compressible: !0
                        },
                        "application/vnd.dvb.notif-generic+xml": {
                            source: "iana",
                            compressible: !0
                        },
                        "application/vnd.dvb.notif-ia-msglist+xml": {
                            source: "iana",
                            compressible: !0
                        },
                        "application/vnd.dvb.notif-ia-registration-request+xml": {
                            source: "iana",
                            compressible: !0
                        },
                        "application/vnd.dvb.notif-ia-registration-response+xml": {
                            source: "iana",
                            compressible: !0
                        },
                        "application/vnd.dvb.notif-init+xml": {
                            source: "iana",
                            compressible: !0
                        },
                        "application/vnd.dvb.pfr": {
                            source: "iana"
                        },
                        "application/vnd.dvb.service": {
                            source: "iana",
                            extensions: ["svc"]
                        },
                        "application/vnd.dxr": {
                            source: "iana"
                        },
                        "application/vnd.dynageo": {
                            source: "iana",
                            extensions: ["geo"]
                        },
                        "application/vnd.dzr": {
                            source: "iana"
                        },
                        "application/vnd.easykaraoke.cdgdownload": {
                            source: "iana"
                        },
                        "application/vnd.ecdis-update": {
                            source: "iana"
                        },
                        "application/vnd.ecip.rlp": {
                            source: "iana"
                        },
                        "application/vnd.eclipse.ditto+json": {
                            source: "iana",
                            compressible: !0
                        },
                        "application/vnd.ecowin.chart": {
                            source: "iana",
                            extensions: ["mag"]
                        },
                        "application/vnd.ecowin.filerequest": {
                            source: "iana"
                        },
                        "application/vnd.ecowin.fileupdate": {
                            source: "iana"
                        },
                        "application/vnd.ecowin.series": {
                            source: "iana"
                        },
                        "application/vnd.ecowin.seriesrequest": {
                            source: "iana"
                        },
                        "application/vnd.ecowin.seriesupdate": {
                            source: "iana"
                        },
                        "application/vnd.efi.img": {
                            source: "iana"
                        },
                        "application/vnd.efi.iso": {
                            source: "iana"
                        },
                        "application/vnd.emclient.accessrequest+xml": {
                            source: "iana",
                            compressible: !0
                        },
                        "application/vnd.enliven": {
                            source: "iana",
                            extensions: ["nml"]
                        },
                        "application/vnd.enphase.envoy": {
                            source: "iana"
                        },
                        "application/vnd.eprints.data+xml": {
                            source: "iana",
                            compressible: !0
                        },
                        "application/vnd.epson.esf": {
                            source: "iana",
                            extensions: ["esf"]
                        },
                        "application/vnd.epson.msf": {
                            source: "iana",
                            extensions: ["msf"]
                        },
                        "application/vnd.epson.quickanime": {
                            source: "iana",
                            extensions: ["qam"]
                        },
                        "application/vnd.epson.salt": {
                            source: "iana",
                            extensions: ["slt"]
                        },
                        "application/vnd.epson.ssf": {
                            source: "iana",
                            extensions: ["ssf"]
                        },
                        "application/vnd.ericsson.quickcall": {
                            source: "iana"
                        },
                        "application/vnd.espass-espass+zip": {
                            source: "iana",
                            compressible: !1
                        },
                        "application/vnd.eszigno3+xml": {
                            source: "iana",
                            compressible: !0,
                            extensions: ["es3", "et3"]
                        },
                        "application/vnd.etsi.aoc+xml": {
                            source: "iana",
                            compressible: !0
                        },
                        "application/vnd.etsi.asic-e+zip": {
                            source: "iana",
                            compressible: !1
                        },
                        "application/vnd.etsi.asic-s+zip": {
                            source: "iana",
                            compressible: !1
                        },
                        "application/vnd.etsi.cug+xml": {
                            source: "iana",
                            compressible: !0
                        },
                        "application/vnd.etsi.iptvcommand+xml": {
                            source: "iana",
                            compressible: !0
                        },
                        "application/vnd.etsi.iptvdiscovery+xml": {
                            source: "iana",
                            compressible: !0
                        },
                        "application/vnd.etsi.iptvprofile+xml": {
                            source: "iana",
                            compressible: !0
                        },
                        "application/vnd.etsi.iptvsad-bc+xml": {
                            source: "iana",
                            compressible: !0
                        },
                        "application/vnd.etsi.iptvsad-cod+xml": {
                            source: "iana",
                            compressible: !0
                        },
                        "application/vnd.etsi.iptvsad-npvr+xml": {
                            source: "iana",
                            compressible: !0
                        },
                        "application/vnd.etsi.iptvservice+xml": {
                            source: "iana",
                            compressible: !0
                        },
                        "application/vnd.etsi.iptvsync+xml": {
                            source: "iana",
                            compressible: !0
                        },
                        "application/vnd.etsi.iptvueprofile+xml": {
                            source: "iana",
                            compressible: !0
                        },
                        "application/vnd.etsi.mcid+xml": {
                            source: "iana",
                            compressible: !0
                        },
                        "application/vnd.etsi.mheg5": {
                            source: "iana"
                        },
                        "application/vnd.etsi.overload-control-policy-dataset+xml": {
                            source: "iana",
                            compressible: !0
                        },
                        "application/vnd.etsi.pstn+xml": {
                            source: "iana",
                            compressible: !0
                        },
                        "application/vnd.etsi.sci+xml": {
                            source: "iana",
                            compressible: !0
                        },
                        "application/vnd.etsi.simservs+xml": {
                            source: "iana",
                            compressible: !0
                        },
                        "application/vnd.etsi.timestamp-token": {
                            source: "iana"
                        },
                        "application/vnd.etsi.tsl+xml": {
                            source: "iana",
                            compressible: !0
                        },
                        "application/vnd.etsi.tsl.der": {
                            source: "iana"
                        },
                        "application/vnd.eu.kasparian.car+json": {
                            source: "iana",
                            compressible: !0
                        },
                        "application/vnd.eudora.data": {
                            source: "iana"
                        },
                        "application/vnd.evolv.ecig.profile": {
                            source: "iana"
                        },
                        "application/vnd.evolv.ecig.settings": {
                            source: "iana"
                        },
                        "application/vnd.evolv.ecig.theme": {
                            source: "iana"
                        },
                        "application/vnd.exstream-empower+zip": {
                            source: "iana",
                            compressible: !1
                        },
                        "application/vnd.exstream-package": {
                            source: "iana"
                        },
                        "application/vnd.ezpix-album": {
                            source: "iana",
                            extensions: ["ez2"]
                        },
                        "application/vnd.ezpix-package": {
                            source: "iana",
                            extensions: ["ez3"]
                        },
                        "application/vnd.f-secure.mobile": {
                            source: "iana"
                        },
                        "application/vnd.familysearch.gedcom+zip": {
                            source: "iana",
                            compressible: !1
                        },
                        "application/vnd.fastcopy-disk-image": {
                            source: "iana"
                        },
                        "application/vnd.fdf": {
                            source: "iana",
                            extensions: ["fdf"]
                        },
                        "application/vnd.fdsn.mseed": {
                            source: "iana",
                            extensions: ["mseed"]
                        },
                        "application/vnd.fdsn.seed": {
                            source: "iana",
                            extensions: ["seed", "dataless"]
                        },
                        "application/vnd.ffsns": {
                            source: "iana"
                        },
                        "application/vnd.ficlab.flb+zip": {
                            source: "iana",
                            compressible: !1
                        },
                        "application/vnd.filmit.zfc": {
                            source: "iana"
                        },
                        "application/vnd.fints": {
                            source: "iana"
                        },
                        "application/vnd.firemonkeys.cloudcell": {
                            source: "iana"
                        },
                        "application/vnd.flographit": {
                            source: "iana",
                            extensions: ["gph"]
                        },
                        "application/vnd.fluxtime.clip": {
                            source: "iana",
                            extensions: ["ftc"]
                        },
                        "application/vnd.font-fontforge-sfd": {
                            source: "iana"
                        },
                        "application/vnd.framemaker": {
                            source: "iana",
                            extensions: ["fm", "frame", "maker", "book"]
                        },
                        "application/vnd.frogans.fnc": {
                            source: "iana",
                            extensions: ["fnc"]
                        },
                        "application/vnd.frogans.ltf": {
                            source: "iana",
                            extensions: ["ltf"]
                        },
                        "application/vnd.fsc.weblaunch": {
                            source: "iana",
                            extensions: ["fsc"]
                        },
                        "application/vnd.fujifilm.fb.docuworks": {
                            source: "iana"
                        },
                        "application/vnd.fujifilm.fb.docuworks.binder": {
                            source: "iana"
                        },
                        "application/vnd.fujifilm.fb.docuworks.container": {
                            source: "iana"
                        },
                        "application/vnd.fujifilm.fb.jfi+xml": {
                            source: "iana",
                            compressible: !0
                        },
                        "application/vnd.fujitsu.oasys": {
                            source: "iana",
                            extensions: ["oas"]
                        },
                        "application/vnd.fujitsu.oasys2": {
                            source: "iana",
                            extensions: ["oa2"]
                        },
                        "application/vnd.fujitsu.oasys3": {
                            source: "iana",
                            extensions: ["oa3"]
                        },
                        "application/vnd.fujitsu.oasysgp": {
                            source: "iana",
                            extensions: ["fg5"]
                        },
                        "application/vnd.fujitsu.oasysprs": {
                            source: "iana",
                            extensions: ["bh2"]
                        },
                        "application/vnd.fujixerox.art-ex": {
                            source: "iana"
                        },
                        "application/vnd.fujixerox.art4": {
                            source: "iana"
                        },
                        "application/vnd.fujixerox.ddd": {
                            source: "iana",
                            extensions: ["ddd"]
                        },
                        "application/vnd.fujixerox.docuworks": {
                            source: "iana",
                            extensions: ["xdw"]
                        },
                        "application/vnd.fujixerox.docuworks.binder": {
                            source: "iana",
                            extensions: ["xbd"]
                        },
                        "application/vnd.fujixerox.docuworks.container": {
                            source: "iana"
                        },
                        "application/vnd.fujixerox.hbpl": {
                            source: "iana"
                        },
                        "application/vnd.fut-misnet": {
                            source: "iana"
                        },
                        "application/vnd.futoin+cbor": {
                            source: "iana"
                        },
                        "application/vnd.futoin+json": {
                            source: "iana",
                            compressible: !0
                        },
                        "application/vnd.fuzzysheet": {
                            source: "iana",
                            extensions: ["fzs"]
                        },
                        "application/vnd.genomatix.tuxedo": {
                            source: "iana",
                            extensions: ["txd"]
                        },
                        "application/vnd.gentics.grd+json": {
                            source: "iana",
                            compressible: !0
                        },
                        "application/vnd.geo+json": {
                            source: "iana",
                            compressible: !0
                        },
                        "application/vnd.geocube+xml": {
                            source: "iana",
                            compressible: !0
                        },
                        "application/vnd.geogebra.file": {
                            source: "iana",
                            extensions: ["ggb"]
                        },
                        "application/vnd.geogebra.slides": {
                            source: "iana"
                        },
                        "application/vnd.geogebra.tool": {
                            source: "iana",
                            extensions: ["ggt"]
                        },
                        "application/vnd.geometry-explorer": {
                            source: "iana",
                            extensions: ["gex", "gre"]
                        },
                        "application/vnd.geonext": {
                            source: "iana",
                            extensions: ["gxt"]
                        },
                        "application/vnd.geoplan": {
                            source: "iana",
                            extensions: ["g2w"]
                        },
                        "application/vnd.geospace": {
                            source: "iana",
                            extensions: ["g3w"]
                        },
                        "application/vnd.gerber": {
                            source: "iana"
                        },
                        "application/vnd.globalplatform.card-content-mgt": {
                            source: "iana"
                        },
                        "application/vnd.globalplatform.card-content-mgt-response": {
                            source: "iana"
                        },
                        "application/vnd.gmx": {
                            source: "iana",
                            extensions: ["gmx"]
                        },
                        "application/vnd.google-apps.document": {
                            compressible: !1,
                            extensions: ["gdoc"]
                        },
                        "application/vnd.google-apps.presentation": {
                            compressible: !1,
                            extensions: ["gslides"]
                        },
                        "application/vnd.google-apps.spreadsheet": {
                            compressible: !1,
                            extensions: ["gsheet"]
                        },
                        "application/vnd.google-earth.kml+xml": {
                            source: "iana",
                            compressible: !0,
                            extensions: ["kml"]
                        },
                        "application/vnd.google-earth.kmz": {
                            source: "iana",
                            compressible: !1,
                            extensions: ["kmz"]
                        },
                        "application/vnd.gov.sk.e-form+xml": {
                            source: "iana",
                            compressible: !0
                        },
                        "application/vnd.gov.sk.e-form+zip": {
                            source: "iana",
                            compressible: !1
                        },
                        "application/vnd.gov.sk.xmldatacontainer+xml": {
                            source: "iana",
                            compressible: !0
                        },
                        "application/vnd.grafeq": {
                            source: "iana",
                            extensions: ["gqf", "gqs"]
                        },
                        "application/vnd.gridmp": {
                            source: "iana"
                        },
                        "application/vnd.groove-account": {
                            source: "iana",
                            extensions: ["gac"]
                        },
                        "application/vnd.groove-help": {
                            source: "iana",
                            extensions: ["ghf"]
                        },
                        "application/vnd.groove-identity-message": {
                            source: "iana",
                            extensions: ["gim"]
                        },
                        "application/vnd.groove-injector": {
                            source: "iana",
                            extensions: ["grv"]
                        },
                        "application/vnd.groove-tool-message": {
                            source: "iana",
                            extensions: ["gtm"]
                        },
                        "application/vnd.groove-tool-template": {
                            source: "iana",
                            extensions: ["tpl"]
                        },
                        "application/vnd.groove-vcard": {
                            source: "iana",
                            extensions: ["vcg"]
                        },
                        "application/vnd.hal+json": {
                            source: "iana",
                            compressible: !0
                        },
                        "application/vnd.hal+xml": {
                            source: "iana",
                            compressible: !0,
                            extensions: ["hal"]
                        },
                        "application/vnd.handheld-entertainment+xml": {
                            source: "iana",
                            compressible: !0,
                            extensions: ["zmm"]
                        },
                        "application/vnd.hbci": {
                            source: "iana",
                            extensions: ["hbci"]
                        },
                        "application/vnd.hc+json": {
                            source: "iana",
                            compressible: !0
                        },
                        "application/vnd.hcl-bireports": {
                            source: "iana"
                        },
                        "application/vnd.hdt": {
                            source: "iana"
                        },
                        "application/vnd.heroku+json": {
                            source: "iana",
                            compressible: !0
                        },
                        "application/vnd.hhe.lesson-player": {
                            source: "iana",
                            extensions: ["les"]
                        },
                        "application/vnd.hl7cda+xml": {
                            source: "iana",
                            charset: "UTF-8",
                            compressible: !0
                        },
                        "application/vnd.hl7v2+xml": {
                            source: "iana",
                            charset: "UTF-8",
                            compressible: !0
                        },
                        "application/vnd.hp-hpgl": {
                            source: "iana",
                            extensions: ["hpgl"]
                        },
                        "application/vnd.hp-hpid": {
                            source: "iana",
                            extensions: ["hpid"]
                        },
                        "application/vnd.hp-hps": {
                            source: "iana",
                            extensions: ["hps"]
                        },
                        "application/vnd.hp-jlyt": {
                            source: "iana",
                            extensions: ["jlt"]
                        },
                        "application/vnd.hp-pcl": {
                            source: "iana",
                            extensions: ["pcl"]
                        },
                        "application/vnd.hp-pclxl": {
                            source: "iana",
                            extensions: ["pclxl"]
                        },
                        "application/vnd.httphone": {
                            source: "iana"
                        },
                        "application/vnd.hydrostatix.sof-data": {
                            source: "iana",
                            extensions: ["sfd-hdstx"]
                        },
                        "application/vnd.hyper+json": {
                            source: "iana",
                            compressible: !0
                        },
                        "application/vnd.hyper-item+json": {
                            source: "iana",
                            compressible: !0
                        },
                        "application/vnd.hyperdrive+json": {
                            source: "iana",
                            compressible: !0
                        },
                        "application/vnd.hzn-3d-crossword": {
                            source: "iana"
                        },
                        "application/vnd.ibm.afplinedata": {
                            source: "iana"
                        },
                        "application/vnd.ibm.electronic-media": {
                            source: "iana"
                        },
                        "application/vnd.ibm.minipay": {
                            source: "iana",
                            extensions: ["mpy"]
                        },
                        "application/vnd.ibm.modcap": {
                            source: "iana",
                            extensions: ["afp", "listafp", "list3820"]
                        },
                        "application/vnd.ibm.rights-management": {
                            source: "iana",
                            extensions: ["irm"]
                        },
                        "application/vnd.ibm.secure-container": {
                            source: "iana",
                            extensions: ["sc"]
                        },
                        "application/vnd.iccprofile": {
                            source: "iana",
                            extensions: ["icc", "icm"]
                        },
                        "application/vnd.ieee.1905": {
                            source: "iana"
                        },
                        "application/vnd.igloader": {
                            source: "iana",
                            extensions: ["igl"]
                        },
                        "application/vnd.imagemeter.folder+zip": {
                            source: "iana",
                            compressible: !1
                        },
                        "application/vnd.imagemeter.image+zip": {
                            source: "iana",
                            compressible: !1
                        },
                        "application/vnd.immervision-ivp": {
                            source: "iana",
                            extensions: ["ivp"]
                        },
                        "application/vnd.immervision-ivu": {
                            source: "iana",
                            extensions: ["ivu"]
                        },
                        "application/vnd.ims.imsccv1p1": {
                            source: "iana"
                        },
                        "application/vnd.ims.imsccv1p2": {
                            source: "iana"
                        },
                        "application/vnd.ims.imsccv1p3": {
                            source: "iana"
                        },
                        "application/vnd.ims.lis.v2.result+json": {
                            source: "iana",
                            compressible: !0
                        },
                        "application/vnd.ims.lti.v2.toolconsumerprofile+json": {
                            source: "iana",
                            compressible: !0
                        },
                        "application/vnd.ims.lti.v2.toolproxy+json": {
                            source: "iana",
                            compressible: !0
                        },
                        "application/vnd.ims.lti.v2.toolproxy.id+json": {
                            source: "iana",
                            compressible: !0
                        },
                        "application/vnd.ims.lti.v2.toolsettings+json": {
                            source: "iana",
                            compressible: !0
                        },
                        "application/vnd.ims.lti.v2.toolsettings.simple+json": {
                            source: "iana",
                            compressible: !0
                        },
                        "application/vnd.informedcontrol.rms+xml": {
                            source: "iana",
                            compressible: !0
                        },
                        "application/vnd.informix-visionary": {
                            source: "iana"
                        },
                        "application/vnd.infotech.project": {
                            source: "iana"
                        },
                        "application/vnd.infotech.project+xml": {
                            source: "iana",
                            compressible: !0
                        },
                        "application/vnd.innopath.wamp.notification": {
                            source: "iana"
                        },
                        "application/vnd.insors.igm": {
                            source: "iana",
                            extensions: ["igm"]
                        },
                        "application/vnd.intercon.formnet": {
                            source: "iana",
                            extensions: ["xpw", "xpx"]
                        },
                        "application/vnd.intergeo": {
                            source: "iana",
                            extensions: ["i2g"]
                        },
                        "application/vnd.intertrust.digibox": {
                            source: "iana"
                        },
                        "application/vnd.intertrust.nncp": {
                            source: "iana"
                        },
                        "application/vnd.intu.qbo": {
                            source: "iana",
                            extensions: ["qbo"]
                        },
                        "application/vnd.intu.qfx": {
                            source: "iana",
                            extensions: ["qfx"]
                        },
                        "application/vnd.iptc.g2.catalogitem+xml": {
                            source: "iana",
                            compressible: !0
                        },
                        "application/vnd.iptc.g2.conceptitem+xml": {
                            source: "iana",
                            compressible: !0
                        },
                        "application/vnd.iptc.g2.knowledgeitem+xml": {
                            source: "iana",
                            compressible: !0
                        },
                        "application/vnd.iptc.g2.newsitem+xml": {
                            source: "iana",
                            compressible: !0
                        },
                        "application/vnd.iptc.g2.newsmessage+xml": {
                            source: "iana",
                            compressible: !0
                        },
                        "application/vnd.iptc.g2.packageitem+xml": {
                            source: "iana",
                            compressible: !0
                        },
                        "application/vnd.iptc.g2.planningitem+xml": {
                            source: "iana",
                            compressible: !0
                        },
                        "application/vnd.ipunplugged.rcprofile": {
                            source: "iana",
                            extensions: ["rcprofile"]
                        },
                        "application/vnd.irepository.package+xml": {
                            source: "iana",
                            compressible: !0,
                            extensions: ["irp"]
                        },
                        "application/vnd.is-xpr": {
                            source: "iana",
                            extensions: ["xpr"]
                        },
                        "application/vnd.isac.fcs": {
                            source: "iana",
                            extensions: ["fcs"]
                        },
                        "application/vnd.iso11783-10+zip": {
                            source: "iana",
                            compressible: !1
                        },
                        "application/vnd.jam": {
                            source: "iana",
                            extensions: ["jam"]
                        },
                        "application/vnd.japannet-directory-service": {
                            source: "iana"
                        },
                        "application/vnd.japannet-jpnstore-wakeup": {
                            source: "iana"
                        },
                        "application/vnd.japannet-payment-wakeup": {
                            source: "iana"
                        },
                        "application/vnd.japannet-registration": {
                            source: "iana"
                        },
                        "application/vnd.japannet-registration-wakeup": {
                            source: "iana"
                        },
                        "application/vnd.japannet-setstore-wakeup": {
                            source: "iana"
                        },
                        "application/vnd.japannet-verification": {
                            source: "iana"
                        },
                        "application/vnd.japannet-verification-wakeup": {
                            source: "iana"
                        },
                        "application/vnd.jcp.javame.midlet-rms": {
                            source: "iana",
                            extensions: ["rms"]
                        },
                        "application/vnd.jisp": {
                            source: "iana",
                            extensions: ["jisp"]
                        },
                        "application/vnd.joost.joda-archive": {
                            source: "iana",
                            extensions: ["joda"]
                        },
                        "application/vnd.jsk.isdn-ngn": {
                            source: "iana"
                        },
                        "application/vnd.kahootz": {
                            source: "iana",
                            extensions: ["ktz", "ktr"]
                        },
                        "application/vnd.kde.karbon": {
                            source: "iana",
                            extensions: ["karbon"]
                        },
                        "application/vnd.kde.kchart": {
                            source: "iana",
                            extensions: ["chrt"]
                        },
                        "application/vnd.kde.kformula": {
                            source: "iana",
                            extensions: ["kfo"]
                        },
                        "application/vnd.kde.kivio": {
                            source: "iana",
                            extensions: ["flw"]
                        },
                        "application/vnd.kde.kontour": {
                            source: "iana",
                            extensions: ["kon"]
                        },
                        "application/vnd.kde.kpresenter": {
                            source: "iana",
                            extensions: ["kpr", "kpt"]
                        },
                        "application/vnd.kde.kspread": {
                            source: "iana",
                            extensions: ["ksp"]
                        },
                        "application/vnd.kde.kword": {
                            source: "iana",
                            extensions: ["kwd", "kwt"]
                        },
                        "application/vnd.kenameaapp": {
                            source: "iana",
                            extensions: ["htke"]
                        },
                        "application/vnd.kidspiration": {
                            source: "iana",
                            extensions: ["kia"]
                        },
                        "application/vnd.kinar": {
                            source: "iana",
                            extensions: ["kne", "knp"]
                        },
                        "application/vnd.koan": {
                            source: "iana",
                            extensions: ["skp", "skd", "skt", "skm"]
                        },
                        "application/vnd.kodak-descriptor": {
                            source: "iana",
                            extensions: ["sse"]
                        },
                        "application/vnd.las": {
                            source: "iana"
                        },
                        "application/vnd.las.las+json": {
                            source: "iana",
                            compressible: !0
                        },
                        "application/vnd.las.las+xml": {
                            source: "iana",
                            compressible: !0,
                            extensions: ["lasxml"]
                        },
                        "application/vnd.laszip": {
                            source: "iana"
                        },
                        "application/vnd.leap+json": {
                            source: "iana",
                            compressible: !0
                        },
                        "application/vnd.liberty-request+xml": {
                            source: "iana",
                            compressible: !0
                        },
                        "application/vnd.llamagraphics.life-balance.desktop": {
                            source: "iana",
                            extensions: ["lbd"]
                        },
                        "application/vnd.llamagraphics.life-balance.exchange+xml": {
                            source: "iana",
                            compressible: !0,
                            extensions: ["lbe"]
                        },
                        "application/vnd.logipipe.circuit+zip": {
                            source: "iana",
                            compressible: !1
                        },
                        "application/vnd.loom": {
                            source: "iana"
                        },
                        "application/vnd.lotus-1-2-3": {
                            source: "iana",
                            extensions: ["123"]
                        },
                        "application/vnd.lotus-approach": {
                            source: "iana",
                            extensions: ["apr"]
                        },
                        "application/vnd.lotus-freelance": {
                            source: "iana",
                            extensions: ["pre"]
                        },
                        "application/vnd.lotus-notes": {
                            source: "iana",
                            extensions: ["nsf"]
                        },
                        "application/vnd.lotus-organizer": {
                            source: "iana",
                            extensions: ["org"]
                        },
                        "application/vnd.lotus-screencam": {
                            source: "iana",
                            extensions: ["scm"]
                        },
                        "application/vnd.lotus-wordpro": {
                            source: "iana",
                            extensions: ["lwp"]
                        },
                        "application/vnd.macports.portpkg": {
                            source: "iana",
                            extensions: ["portpkg"]
                        },
                        "application/vnd.mapbox-vector-tile": {
                            source: "iana",
                            extensions: ["mvt"]
                        },
                        "application/vnd.marlin.drm.actiontoken+xml": {
                            source: "iana",
                            compressible: !0
                        },
                        "application/vnd.marlin.drm.conftoken+xml": {
                            source: "iana",
                            compressible: !0
                        },
                        "application/vnd.marlin.drm.license+xml": {
                            source: "iana",
                            compressible: !0
                        },
                        "application/vnd.marlin.drm.mdcf": {
                            source: "iana"
                        },
                        "application/vnd.mason+json": {
                            source: "iana",
                            compressible: !0
                        },
                        "application/vnd.maxar.archive.3tz+zip": {
                            source: "iana",
                            compressible: !1
                        },
                        "application/vnd.maxmind.maxmind-db": {
                            source: "iana"
                        },
                        "application/vnd.mcd": {
                            source: "iana",
                            extensions: ["mcd"]
                        },
                        "application/vnd.medcalcdata": {
                            source: "iana",
                            extensions: ["mc1"]
                        },
                        "application/vnd.mediastation.cdkey": {
                            source: "iana",
                            extensions: ["cdkey"]
                        },
                        "application/vnd.meridian-slingshot": {
                            source: "iana"
                        },
                        "application/vnd.mfer": {
                            source: "iana",
                            extensions: ["mwf"]
                        },
                        "application/vnd.mfmp": {
                            source: "iana",
                            extensions: ["mfm"]
                        },
                        "application/vnd.micro+json": {
                            source: "iana",
                            compressible: !0
                        },
                        "application/vnd.micrografx.flo": {
                            source: "iana",
                            extensions: ["flo"]
                        },
                        "application/vnd.micrografx.igx": {
                            source: "iana",
                            extensions: ["igx"]
                        },
                        "application/vnd.microsoft.portable-executable": {
                            source: "iana"
                        },
                        "application/vnd.microsoft.windows.thumbnail-cache": {
                            source: "iana"
                        },
                        "application/vnd.miele+json": {
                            source: "iana",
                            compressible: !0
                        },
                        "application/vnd.mif": {
                            source: "iana",
                            extensions: ["mif"]
                        },
                        "application/vnd.minisoft-hp3000-save": {
                            source: "iana"
                        },
                        "application/vnd.mitsubishi.misty-guard.trustweb": {
                            source: "iana"
                        },
                        "application/vnd.mobius.daf": {
                            source: "iana",
                            extensions: ["daf"]
                        },
                        "application/vnd.mobius.dis": {
                            source: "iana",
                            extensions: ["dis"]
                        },
                        "application/vnd.mobius.mbk": {
                            source: "iana",
                            extensions: ["mbk"]
                        },
                        "application/vnd.mobius.mqy": {
                            source: "iana",
                            extensions: ["mqy"]
                        },
                        "application/vnd.mobius.msl": {
                            source: "iana",
                            extensions: ["msl"]
                        },
                        "application/vnd.mobius.plc": {
                            source: "iana",
                            extensions: ["plc"]
                        },
                        "application/vnd.mobius.txf": {
                            source: "iana",
                            extensions: ["txf"]
                        },
                        "application/vnd.mophun.application": {
                            source: "iana",
                            extensions: ["mpn"]
                        },
                        "application/vnd.mophun.certificate": {
                            source: "iana",
                            extensions: ["mpc"]
                        },
                        "application/vnd.motorola.flexsuite": {
                            source: "iana"
                        },
                        "application/vnd.motorola.flexsuite.adsi": {
                            source: "iana"
                        },
                        "application/vnd.motorola.flexsuite.fis": {
                            source: "iana"
                        },
                        "application/vnd.motorola.flexsuite.gotap": {
                            source: "iana"
                        },
                        "application/vnd.motorola.flexsuite.kmr": {
                            source: "iana"
                        },
                        "application/vnd.motorola.flexsuite.ttc": {
                            source: "iana"
                        },
                        "application/vnd.motorola.flexsuite.wem": {
                            source: "iana"
                        },
                        "application/vnd.motorola.iprm": {
                            source: "iana"
                        },
                        "application/vnd.mozilla.xul+xml": {
                            source: "iana",
                            compressible: !0,
                            extensions: ["xul"]
                        },
                        "application/vnd.ms-3mfdocument": {
                            source: "iana"
                        },
                        "application/vnd.ms-artgalry": {
                            source: "iana",
                            extensions: ["cil"]
                        },
                        "application/vnd.ms-asf": {
                            source: "iana"
                        },
                        "application/vnd.ms-cab-compressed": {
                            source: "iana",
                            extensions: ["cab"]
                        },
                        "application/vnd.ms-color.iccprofile": {
                            source: "apache"
                        },
                        "application/vnd.ms-excel": {
                            source: "iana",
                            compressible: !1,
                            extensions: ["xls", "xlm", "xla", "xlc", "xlt", "xlw"]
                        },
                        "application/vnd.ms-excel.addin.macroenabled.12": {
                            source: "iana",
                            extensions: ["xlam"]
                        },
                        "application/vnd.ms-excel.sheet.binary.macroenabled.12": {
                            source: "iana",
                            extensions: ["xlsb"]
                        },
                        "application/vnd.ms-excel.sheet.macroenabled.12": {
                            source: "iana",
                            extensions: ["xlsm"]
                        },
                        "application/vnd.ms-excel.template.macroenabled.12": {
                            source: "iana",
                            extensions: ["xltm"]
                        },
                        "application/vnd.ms-fontobject": {
                            source: "iana",
                            compressible: !0,
                            extensions: ["eot"]
                        },
                        "application/vnd.ms-htmlhelp": {
                            source: "iana",
                            extensions: ["chm"]
                        },
                        "application/vnd.ms-ims": {
                            source: "iana",
                            extensions: ["ims"]
                        },
                        "application/vnd.ms-lrm": {
                            source: "iana",
                            extensions: ["lrm"]
                        },
                        "application/vnd.ms-office.activex+xml": {
                            source: "iana",
                            compressible: !0
                        },
                        "application/vnd.ms-officetheme": {
                            source: "iana",
                            extensions: ["thmx"]
                        },
                        "application/vnd.ms-opentype": {
                            source: "apache",
                            compressible: !0
                        },
                        "application/vnd.ms-outlook": {
                            compressible: !1,
                            extensions: ["msg"]
                        },
                        "application/vnd.ms-package.obfuscated-opentype": {
                            source: "apache"
                        },
                        "application/vnd.ms-pki.seccat": {
                            source: "apache",
                            extensions: ["cat"]
                        },
                        "application/vnd.ms-pki.stl": {
                            source: "apache",
                            extensions: ["stl"]
                        },
                        "application/vnd.ms-playready.initiator+xml": {
                            source: "iana",
                            compressible: !0
                        },
                        "application/vnd.ms-powerpoint": {
                            source: "iana",
                            compressible: !1,
                            extensions: ["ppt", "pps", "pot"]
                        },
                        "application/vnd.ms-powerpoint.addin.macroenabled.12": {
                            source: "iana",
                            extensions: ["ppam"]
                        },
                        "application/vnd.ms-powerpoint.presentation.macroenabled.12": {
                            source: "iana",
                            extensions: ["pptm"]
                        },
                        "application/vnd.ms-powerpoint.slide.macroenabled.12": {
                            source: "iana",
                            extensions: ["sldm"]
                        },
                        "application/vnd.ms-powerpoint.slideshow.macroenabled.12": {
                            source: "iana",
                            extensions: ["ppsm"]
                        },
                        "application/vnd.ms-powerpoint.template.macroenabled.12": {
                            source: "iana",
                            extensions: ["potm"]
                        },
                        "application/vnd.ms-printdevicecapabilities+xml": {
                            source: "iana",
                            compressible: !0
                        },
                        "application/vnd.ms-printing.printticket+xml": {
                            source: "apache",
                            compressible: !0
                        },
                        "application/vnd.ms-printschematicket+xml": {
                            source: "iana",
                            compressible: !0
                        },
                        "application/vnd.ms-project": {
                            source: "iana",
                            extensions: ["mpp", "mpt"]
                        },
                        "application/vnd.ms-tnef": {
                            source: "iana"
                        },
                        "application/vnd.ms-windows.devicepairing": {
                            source: "iana"
                        },
                        "application/vnd.ms-windows.nwprinting.oob": {
                            source: "iana"
                        },
                        "application/vnd.ms-windows.printerpairing": {
                            source: "iana"
                        },
                        "application/vnd.ms-windows.wsd.oob": {
                            source: "iana"
                        },
                        "application/vnd.ms-wmdrm.lic-chlg-req": {
                            source: "iana"
                        },
                        "application/vnd.ms-wmdrm.lic-resp": {
                            source: "iana"
                        },
                        "application/vnd.ms-wmdrm.meter-chlg-req": {
                            source: "iana"
                        },
                        "application/vnd.ms-wmdrm.meter-resp": {
                            source: "iana"
                        },
                        "application/vnd.ms-word.document.macroenabled.12": {
                            source: "iana",
                            extensions: ["docm"]
                        },
                        "application/vnd.ms-word.template.macroenabled.12": {
                            source: "iana",
                            extensions: ["dotm"]
                        },
                        "application/vnd.ms-works": {
                            source: "iana",
                            extensions: ["wps", "wks", "wcm", "wdb"]
                        },
                        "application/vnd.ms-wpl": {
                            source: "iana",
                            extensions: ["wpl"]
                        },
                        "application/vnd.ms-xpsdocument": {
                            source: "iana",
                            compressible: !1,
                            extensions: ["xps"]
                        },
                        "application/vnd.msa-disk-image": {
                            source: "iana"
                        },
                        "application/vnd.mseq": {
                            source: "iana",
                            extensions: ["mseq"]
                        },
                        "application/vnd.msign": {
                            source: "iana"
                        },
                        "application/vnd.multiad.creator": {
                            source: "iana"
                        },
                        "application/vnd.multiad.creator.cif": {
                            source: "iana"
                        },
                        "application/vnd.music-niff": {
                            source: "iana"
                        },
                        "application/vnd.musician": {
                            source: "iana",
                            extensions: ["mus"]
                        },
                        "application/vnd.muvee.style": {
                            source: "iana",
                            extensions: ["msty"]
                        },
                        "application/vnd.mynfc": {
                            source: "iana",
                            extensions: ["taglet"]
                        },
                        "application/vnd.nacamar.ybrid+json": {
                            source: "iana",
                            compressible: !0
                        },
                        "application/vnd.ncd.control": {
                            source: "iana"
                        },
                        "application/vnd.ncd.reference": {
                            source: "iana"
                        },
                        "application/vnd.nearst.inv+json": {
                            source: "iana",
                            compressible: !0
                        },
                        "application/vnd.nebumind.line": {
                            source: "iana"
                        },
                        "application/vnd.nervana": {
                            source: "iana"
                        },
                        "application/vnd.netfpx": {
                            source: "iana"
                        },
                        "application/vnd.neurolanguage.nlu": {
                            source: "iana",
                            extensions: ["nlu"]
                        },
                        "application/vnd.nimn": {
                            source: "iana"
                        },
                        "application/vnd.nintendo.nitro.rom": {
                            source: "iana"
                        },
                        "application/vnd.nintendo.snes.rom": {
                            source: "iana"
                        },
                        "application/vnd.nitf": {
                            source: "iana",
                            extensions: ["ntf", "nitf"]
                        },
                        "application/vnd.noblenet-directory": {
                            source: "iana",
                            extensions: ["nnd"]
                        },
                        "application/vnd.noblenet-sealer": {
                            source: "iana",
                            extensions: ["nns"]
                        },
                        "application/vnd.noblenet-web": {
                            source: "iana",
                            extensions: ["nnw"]
                        },
                        "application/vnd.nokia.catalogs": {
                            source: "iana"
                        },
                        "application/vnd.nokia.conml+wbxml": {
                            source: "iana"
                        },
                        "application/vnd.nokia.conml+xml": {
                            source: "iana",
                            compressible: !0
                        },
                        "application/vnd.nokia.iptv.config+xml": {
                            source: "iana",
                            compressible: !0
                        },
                        "application/vnd.nokia.isds-radio-presets": {
                            source: "iana"
                        },
                        "application/vnd.nokia.landmark+wbxml": {
                            source: "iana"
                        },
                        "application/vnd.nokia.landmark+xml": {
                            source: "iana",
                            compressible: !0
                        },
                        "application/vnd.nokia.landmarkcollection+xml": {
                            source: "iana",
                            compressible: !0
                        },
                        "application/vnd.nokia.n-gage.ac+xml": {
                            source: "iana",
                            compressible: !0,
                            extensions: ["ac"]
                        },
                        "application/vnd.nokia.n-gage.data": {
                            source: "iana",
                            extensions: ["ngdat"]
                        },
                        "application/vnd.nokia.n-gage.symbian.install": {
                            source: "iana",
                            extensions: ["n-gage"]
                        },
                        "application/vnd.nokia.ncd": {
                            source: "iana"
                        },
                        "application/vnd.nokia.pcd+wbxml": {
                            source: "iana"
                        },
                        "application/vnd.nokia.pcd+xml": {
                            source: "iana",
                            compressible: !0
                        },
                        "application/vnd.nokia.radio-preset": {
                            source: "iana",
                            extensions: ["rpst"]
                        },
                        "application/vnd.nokia.radio-presets": {
                            source: "iana",
                            extensions: ["rpss"]
                        },
                        "application/vnd.novadigm.edm": {
                            source: "iana",
                            extensions: ["edm"]
                        },
                        "application/vnd.novadigm.edx": {
                            source: "iana",
                            extensions: ["edx"]
                        },
                        "application/vnd.novadigm.ext": {
                            source: "iana",
                            extensions: ["ext"]
                        },
                        "application/vnd.ntt-local.content-share": {
                            source: "iana"
                        },
                        "application/vnd.ntt-local.file-transfer": {
                            source: "iana"
                        },
                        "application/vnd.ntt-local.ogw_remote-access": {
                            source: "iana"
                        },
                        "application/vnd.ntt-local.sip-ta_remote": {
                            source: "iana"
                        },
                        "application/vnd.ntt-local.sip-ta_tcp_stream": {
                            source: "iana"
                        },
                        "application/vnd.oasis.opendocument.chart": {
                            source: "iana",
                            extensions: ["odc"]
                        },
                        "application/vnd.oasis.opendocument.chart-template": {
                            source: "iana",
                            extensions: ["otc"]
                        },
                        "application/vnd.oasis.opendocument.database": {
                            source: "iana",
                            extensions: ["odb"]
                        },
                        "application/vnd.oasis.opendocument.formula": {
                            source: "iana",
                            extensions: ["odf"]
                        },
                        "application/vnd.oasis.opendocument.formula-template": {
                            source: "iana",
                            extensions: ["odft"]
                        },
                        "application/vnd.oasis.opendocument.graphics": {
                            source: "iana",
                            compressible: !1,
                            extensions: ["odg"]
                        },
                        "application/vnd.oasis.opendocument.graphics-template": {
                            source: "iana",
                            extensions: ["otg"]
                        },
                        "application/vnd.oasis.opendocument.image": {
                            source: "iana",
                            extensions: ["odi"]
                        },
                        "application/vnd.oasis.opendocument.image-template": {
                            source: "iana",
                            extensions: ["oti"]
                        },
                        "application/vnd.oasis.opendocument.presentation": {
                            source: "iana",
                            compressible: !1,
                            extensions: ["odp"]
                        },
                        "application/vnd.oasis.opendocument.presentation-template": {
                            source: "iana",
                            extensions: ["otp"]
                        },
                        "application/vnd.oasis.opendocument.spreadsheet": {
                            source: "iana",
                            compressible: !1,
                            extensions: ["ods"]
                        },
                        "application/vnd.oasis.opendocument.spreadsheet-template": {
                            source: "iana",
                            extensions: ["ots"]
                        },
                        "application/vnd.oasis.opendocument.text": {
                            source: "iana",
                            compressible: !1,
                            extensions: ["odt"]
                        },
                        "application/vnd.oasis.opendocument.text-master": {
                            source: "iana",
                            extensions: ["odm"]
                        },
                        "application/vnd.oasis.opendocument.text-template": {
                            source: "iana",
                            extensions: ["ott"]
                        },
                        "application/vnd.oasis.opendocument.text-web": {
                            source: "iana",
                            extensions: ["oth"]
                        },
                        "application/vnd.obn": {
                            source: "iana"
                        },
                        "application/vnd.ocf+cbor": {
                            source: "iana"
                        },
                        "application/vnd.oci.image.manifest.v1+json": {
                            source: "iana",
                            compressible: !0
                        },
                        "application/vnd.oftn.l10n+json": {
                            source: "iana",
                            compressible: !0
                        },
                        "application/vnd.oipf.contentaccessdownload+xml": {
                            source: "iana",
                            compressible: !0
                        },
                        "application/vnd.oipf.contentaccessstreaming+xml": {
                            source: "iana",
                            compressible: !0
                        },
                        "application/vnd.oipf.cspg-hexbinary": {
                            source: "iana"
                        },
                        "application/vnd.oipf.dae.svg+xml": {
                            source: "iana",
                            compressible: !0
                        },
                        "application/vnd.oipf.dae.xhtml+xml": {
                            source: "iana",
                            compressible: !0
                        },
                        "application/vnd.oipf.mippvcontrolmessage+xml": {
                            source: "iana",
                            compressible: !0
                        },
                        "application/vnd.oipf.pae.gem": {
                            source: "iana"
                        },
                        "application/vnd.oipf.spdiscovery+xml": {
                            source: "iana",
                            compressible: !0
                        },
                        "application/vnd.oipf.spdlist+xml": {
                            source: "iana",
                            compressible: !0
                        },
                        "application/vnd.oipf.ueprofile+xml": {
                            source: "iana",
                            compressible: !0
                        },
                        "application/vnd.oipf.userprofile+xml": {
                            source: "iana",
                            compressible: !0
                        },
                        "application/vnd.olpc-sugar": {
                            source: "iana",
                            extensions: ["xo"]
                        },
                        "application/vnd.oma-scws-config": {
                            source: "iana"
                        },
                        "application/vnd.oma-scws-http-request": {
                            source: "iana"
                        },
                        "application/vnd.oma-scws-http-response": {
                            source: "iana"
                        },
                        "application/vnd.oma.bcast.associated-procedure-parameter+xml": {
                            source: "iana",
                            compressible: !0
                        },
                        "application/vnd.oma.bcast.drm-trigger+xml": {
                            source: "iana",
                            compressible: !0
                        },
                        "application/vnd.oma.bcast.imd+xml": {
                            source: "iana",
                            compressible: !0
                        },
                        "application/vnd.oma.bcast.ltkm": {
                            source: "iana"
                        },
                        "application/vnd.oma.bcast.notification+xml": {
                            source: "iana",
                            compressible: !0
                        },
                        "application/vnd.oma.bcast.provisioningtrigger": {
                            source: "iana"
                        },
                        "application/vnd.oma.bcast.sgboot": {
                            source: "iana"
                        },
                        "application/vnd.oma.bcast.sgdd+xml": {
                            source: "iana",
                            compressible: !0
                        },
                        "application/vnd.oma.bcast.sgdu": {
                            source: "iana"
                        },
                        "application/vnd.oma.bcast.simple-symbol-container": {
                            source: "iana"
                        },
                        "application/vnd.oma.bcast.smartcard-trigger+xml": {
                            source: "iana",
                            compressible: !0
                        },
                        "application/vnd.oma.bcast.sprov+xml": {
                            source: "iana",
                            compressible: !0
                        },
                        "application/vnd.oma.bcast.stkm": {
                            source: "iana"
                        },
                        "application/vnd.oma.cab-address-book+xml": {
                            source: "iana",
                            compressible: !0
                        },
                        "application/vnd.oma.cab-feature-handler+xml": {
                            source: "iana",
                            compressible: !0
                        },
                        "application/vnd.oma.cab-pcc+xml": {
                            source: "iana",
                            compressible: !0
                        },
                        "application/vnd.oma.cab-subs-invite+xml": {
                            source: "iana",
                            compressible: !0
                        },
                        "application/vnd.oma.cab-user-prefs+xml": {
                            source: "iana",
                            compressible: !0
                        },
                        "application/vnd.oma.dcd": {
                            source: "iana"
                        },
                        "application/vnd.oma.dcdc": {
                            source: "iana"
                        },
                        "application/vnd.oma.dd2+xml": {
                            source: "iana",
                            compressible: !0,
                            extensions: ["dd2"]
                        },
                        "application/vnd.oma.drm.risd+xml": {
                            source: "iana",
                            compressible: !0
                        },
                        "application/vnd.oma.group-usage-list+xml": {
                            source: "iana",
                            compressible: !0
                        },
                        "application/vnd.oma.lwm2m+cbor": {
                            source: "iana"
                        },
                        "application/vnd.oma.lwm2m+json": {
                            source: "iana",
                            compressible: !0
                        },
                        "application/vnd.oma.lwm2m+tlv": {
                            source: "iana"
                        },
                        "application/vnd.oma.pal+xml": {
                            source: "iana",
                            compressible: !0
                        },
                        "application/vnd.oma.poc.detailed-progress-report+xml": {
                            source: "iana",
                            compressible: !0
                        },
                        "application/vnd.oma.poc.final-report+xml": {
                            source: "iana",
                            compressible: !0
                        },
                        "application/vnd.oma.poc.groups+xml": {
                            source: "iana",
                            compressible: !0
                        },
                        "application/vnd.oma.poc.invocation-descriptor+xml": {
                            source: "iana",
                            compressible: !0
                        },
                        "application/vnd.oma.poc.optimized-progress-report+xml": {
                            source: "iana",
                            compressible: !0
                        },
                        "application/vnd.oma.push": {
                            source: "iana"
                        },
                        "application/vnd.oma.scidm.messages+xml": {
                            source: "iana",
                            compressible: !0
                        },
                        "application/vnd.oma.xcap-directory+xml": {
                            source: "iana",
                            compressible: !0
                        },
                        "application/vnd.omads-email+xml": {
                            source: "iana",
                            charset: "UTF-8",
                            compressible: !0
                        },
                        "application/vnd.omads-file+xml": {
                            source: "iana",
                            charset: "UTF-8",
                            compressible: !0
                        },
                        "application/vnd.omads-folder+xml": {
                            source: "iana",
                            charset: "UTF-8",
                            compressible: !0
                        },
                        "application/vnd.omaloc-supl-init": {
                            source: "iana"
                        },
                        "application/vnd.onepager": {
                            source: "iana"
                        },
                        "application/vnd.onepagertamp": {
                            source: "iana"
                        },
                        "application/vnd.onepagertamx": {
                            source: "iana"
                        },
                        "application/vnd.onepagertat": {
                            source: "iana"
                        },
                        "application/vnd.onepagertatp": {
                            source: "iana"
                        },
                        "application/vnd.onepagertatx": {
                            source: "iana"
                        },
                        "application/vnd.openblox.game+xml": {
                            source: "iana",
                            compressible: !0,
                            extensions: ["obgx"]
                        },
                        "application/vnd.openblox.game-binary": {
                            source: "iana"
                        },
                        "application/vnd.openeye.oeb": {
                            source: "iana"
                        },
                        "application/vnd.openofficeorg.extension": {
                            source: "apache",
                            extensions: ["oxt"]
                        },
                        "application/vnd.openstreetmap.data+xml": {
                            source: "iana",
                            compressible: !0,
                            extensions: ["osm"]
                        },
                        "application/vnd.opentimestamps.ots": {
                            source: "iana"
                        },
                        "application/vnd.openxmlformats-officedocument.custom-properties+xml": {
                            source: "iana",
                            compressible: !0
                        },
                        "application/vnd.openxmlformats-officedocument.customxmlproperties+xml": {
                            source: "iana",
                            compressible: !0
                        },
                        "application/vnd.openxmlformats-officedocument.drawing+xml": {
                            source: "iana",
                            compressible: !0
                        },
                        "application/vnd.openxmlformats-officedocument.drawingml.chart+xml": {
                            source: "iana",
                            compressible: !0
                        },
                        "application/vnd.openxmlformats-officedocument.drawingml.chartshapes+xml": {
                            source: "iana",
                            compressible: !0
                        },
                        "application/vnd.openxmlformats-officedocument.drawingml.diagramcolors+xml": {
                            source: "iana",
                            compressible: !0
                        },
                        "application/vnd.openxmlformats-officedocument.drawingml.diagramdata+xml": {
                            source: "iana",
                            compressible: !0
                        },
                        "application/vnd.openxmlformats-officedocument.drawingml.diagramlayout+xml": {
                            source: "iana",
                            compressible: !0
                        },
                        "application/vnd.openxmlformats-officedocument.drawingml.diagramstyle+xml": {
                            source: "iana",
                            compressible: !0
                        },
                        "application/vnd.openxmlformats-officedocument.extended-properties+xml": {
                            source: "iana",
                            compressible: !0
                        },
                        "application/vnd.openxmlformats-officedocument.presentationml.commentauthors+xml": {
                            source: "iana",
                            compressible: !0
                        },
                        "application/vnd.openxmlformats-officedocument.presentationml.comments+xml": {
                            source: "iana",
                            compressible: !0
                        },
                        "application/vnd.openxmlformats-officedocument.presentationml.handoutmaster+xml": {
                            source: "iana",
                            compressible: !0
                        },
                        "application/vnd.openxmlformats-officedocument.presentationml.notesmaster+xml": {
                            source: "iana",
                            compressible: !0
                        },
                        "application/vnd.openxmlformats-officedocument.presentationml.notesslide+xml": {
                            source: "iana",
                            compressible: !0
                        },
                        "application/vnd.openxmlformats-officedocument.presentationml.presentation": {
                            source: "iana",
                            compressible: !1,
                            extensions: ["pptx"]
                        },
                        "application/vnd.openxmlformats-officedocument.presentationml.presentation.main+xml": {
                            source: "iana",
                            compressible: !0
                        },
                        "application/vnd.openxmlformats-officedocument.presentationml.presprops+xml": {
                            source: "iana",
                            compressible: !0
                        },
                        "application/vnd.openxmlformats-officedocument.presentationml.slide": {
                            source: "iana",
                            extensions: ["sldx"]
                        },
                        "application/vnd.openxmlformats-officedocument.presentationml.slide+xml": {
                            source: "iana",
                            compressible: !0
                        },
                        "application/vnd.openxmlformats-officedocument.presentationml.slidelayout+xml": {
                            source: "iana",
                            compressible: !0
                        },
                        "application/vnd.openxmlformats-officedocument.presentationml.slidemaster+xml": {
                            source: "iana",
                            compressible: !0
                        },
                        "application/vnd.openxmlformats-officedocument.presentationml.slideshow": {
                            source: "iana",
                            extensions: ["ppsx"]
                        },
                        "application/vnd.openxmlformats-officedocument.presentationml.slideshow.main+xml": {
                            source: "iana",
                            compressible: !0
                        },
                        "application/vnd.openxmlformats-officedocument.presentationml.slideupdateinfo+xml": {
                            source: "iana",
                            compressible: !0
                        },
                        "application/vnd.openxmlformats-officedocument.presentationml.tablestyles+xml": {
                            source: "iana",
                            compressible: !0
                        },
                        "application/vnd.openxmlformats-officedocument.presentationml.tags+xml": {
                            source: "iana",
                            compressible: !0
                        },
                        "application/vnd.openxmlformats-officedocument.presentationml.template": {
                            source: "iana",
                            extensions: ["potx"]
                        },
                        "application/vnd.openxmlformats-officedocument.presentationml.template.main+xml": {
                            source: "iana",
                            compressible: !0
                        },
                        "application/vnd.openxmlformats-officedocument.presentationml.viewprops+xml": {
                            source: "iana",
                            compressible: !0
                        },
                        "application/vnd.openxmlformats-officedocument.spreadsheetml.calcchain+xml": {
                            source: "iana",
                            compressible: !0
                        },
                        "application/vnd.openxmlformats-officedocument.spreadsheetml.chartsheet+xml": {
                            source: "iana",
                            compressible: !0
                        },
                        "application/vnd.openxmlformats-officedocument.spreadsheetml.comments+xml": {
                            source: "iana",
                            compressible: !0
                        },
                        "application/vnd.openxmlformats-officedocument.spreadsheetml.connections+xml": {
                            source: "iana",
                            compressible: !0
                        },
                        "application/vnd.openxmlformats-officedocument.spreadsheetml.dialogsheet+xml": {
                            source: "iana",
                            compressible: !0
                        },
                        "application/vnd.openxmlformats-officedocument.spreadsheetml.externallink+xml": {
                            source: "iana",
                            compressible: !0
                        },
                        "application/vnd.openxmlformats-officedocument.spreadsheetml.pivotcachedefinition+xml": {
                            source: "iana",
                            compressible: !0
                        },
                        "application/vnd.openxmlformats-officedocument.spreadsheetml.pivotcacherecords+xml": {
                            source: "iana",
                            compressible: !0
                        },
                        "application/vnd.openxmlformats-officedocument.spreadsheetml.pivottable+xml": {
                            source: "iana",
                            compressible: !0
                        },
                        "application/vnd.openxmlformats-officedocument.spreadsheetml.querytable+xml": {
                            source: "iana",
                            compressible: !0
                        },
                        "application/vnd.openxmlformats-officedocument.spreadsheetml.revisionheaders+xml": {
                            source: "iana",
                            compressible: !0
                        },
                        "application/vnd.openxmlformats-officedocument.spreadsheetml.revisionlog+xml": {
                            source: "iana",
                            compressible: !0
                        },
                        "application/vnd.openxmlformats-officedocument.spreadsheetml.sharedstrings+xml": {
                            source: "iana",
                            compressible: !0
                        },
                        "application/vnd.openxmlformats-officedocument.spreadsheetml.sheet": {
                            source: "iana",
                            compressible: !1,
                            extensions: ["xlsx"]
                        },
                        "application/vnd.openxmlformats-officedocument.spreadsheetml.sheet.main+xml": {
                            source: "iana",
                            compressible: !0
                        },
                        "application/vnd.openxmlformats-officedocument.spreadsheetml.sheetmetadata+xml": {
                            source: "iana",
                            compressible: !0
                        },
                        "application/vnd.openxmlformats-officedocument.spreadsheetml.styles+xml": {
                            source: "iana",
                            compressible: !0
                        },
                        "application/vnd.openxmlformats-officedocument.spreadsheetml.table+xml": {
                            source: "iana",
                            compressible: !0
                        },
                        "application/vnd.openxmlformats-officedocument.spreadsheetml.tablesinglecells+xml": {
                            source: "iana",
                            compressible: !0
                        },
                        "application/vnd.openxmlformats-officedocument.spreadsheetml.template": {
                            source: "iana",
                            extensions: ["xltx"]
                        },
                        "application/vnd.openxmlformats-officedocument.spreadsheetml.template.main+xml": {
                            source: "iana",
                            compressible: !0
                        },
                        "application/vnd.openxmlformats-officedocument.spreadsheetml.usernames+xml": {
                            source: "iana",
                            compressible: !0
                        },
                        "application/vnd.openxmlformats-officedocument.spreadsheetml.volatiledependencies+xml": {
                            source: "iana",
                            compressible: !0
                        },
                        "application/vnd.openxmlformats-officedocument.spreadsheetml.worksheet+xml": {
                            source: "iana",
                            compressible: !0
                        },
                        "application/vnd.openxmlformats-officedocument.theme+xml": {
                            source: "iana",
                            compressible: !0
                        },
                        "application/vnd.openxmlformats-officedocument.themeoverride+xml": {
                            source: "iana",
                            compressible: !0
                        },
                        "application/vnd.openxmlformats-officedocument.vmldrawing": {
                            source: "iana"
                        },
                        "application/vnd.openxmlformats-officedocument.wordprocessingml.comments+xml": {
                            source: "iana",
                            compressible: !0
                        },
                        "application/vnd.openxmlformats-officedocument.wordprocessingml.document": {
                            source: "iana",
                            compressible: !1,
                            extensions: ["docx"]
                        },
                        "application/vnd.openxmlformats-officedocument.wordprocessingml.document.glossary+xml": {
                            source: "iana",
                            compressible: !0
                        },
                        "application/vnd.openxmlformats-officedocument.wordprocessingml.document.main+xml": {
                            source: "iana",
                            compressible: !0
                        },
                        "application/vnd.openxmlformats-officedocument.wordprocessingml.endnotes+xml": {
                            source: "iana",
                            compressible: !0
                        },
                        "application/vnd.openxmlformats-officedocument.wordprocessingml.fonttable+xml": {
                            source: "iana",
                            compressible: !0
                        },
                        "application/vnd.openxmlformats-officedocument.wordprocessingml.footer+xml": {
                            source: "iana",
                            compressible: !0
                        },
                        "application/vnd.openxmlformats-officedocument.wordprocessingml.footnotes+xml": {
                            source: "iana",
                            compressible: !0
                        },
                        "application/vnd.openxmlformats-officedocument.wordprocessingml.numbering+xml": {
                            source: "iana",
                            compressible: !0
                        },
                        "application/vnd.openxmlformats-officedocument.wordprocessingml.settings+xml": {
                            source: "iana",
                            compressible: !0
                        },
                        "application/vnd.openxmlformats-officedocument.wordprocessingml.styles+xml": {
                            source: "iana",
                            compressible: !0
                        },
                        "application/vnd.openxmlformats-officedocument.wordprocessingml.template": {
                            source: "iana",
                            extensions: ["dotx"]
                        },
                        "application/vnd.openxmlformats-officedocument.wordprocessingml.template.main+xml": {
                            source: "iana",
                            compressible: !0
                        },
                        "application/vnd.openxmlformats-officedocument.wordprocessingml.websettings+xml": {
                            source: "iana",
                            compressible: !0
                        },
                        "application/vnd.openxmlformats-package.core-properties+xml": {
                            source: "iana",
                            compressible: !0
                        },
                        "application/vnd.openxmlformats-package.digital-signature-xmlsignature+xml": {
                            source: "iana",
                            compressible: !0
                        },
                        "application/vnd.openxmlformats-package.relationships+xml": {
                            source: "iana",
                            compressible: !0
                        },
                        "application/vnd.oracle.resource+json": {
                            source: "iana",
                            compressible: !0
                        },
                        "application/vnd.orange.indata": {
                            source: "iana"
                        },
                        "application/vnd.osa.netdeploy": {
                            source: "iana"
                        },
                        "application/vnd.osgeo.mapguide.package": {
                            source: "iana",
                            extensions: ["mgp"]
                        },
                        "application/vnd.osgi.bundle": {
                            source: "iana"
                        },
                        "application/vnd.osgi.dp": {
                            source: "iana",
                            extensions: ["dp"]
                        },
                        "application/vnd.osgi.subsystem": {
                            source: "iana",
                            extensions: ["esa"]
                        },
                        "application/vnd.otps.ct-kip+xml": {
                            source: "iana",
                            compressible: !0
                        },
                        "application/vnd.oxli.countgraph": {
                            source: "iana"
                        },
                        "application/vnd.pagerduty+json": {
                            source: "iana",
                            compressible: !0
                        },
                        "application/vnd.palm": {
                            source: "iana",
                            extensions: ["pdb", "pqa", "oprc"]
                        },
                        "application/vnd.panoply": {
                            source: "iana"
                        },
                        "application/vnd.paos.xml": {
                            source: "iana"
                        },
                        "application/vnd.patentdive": {
                            source: "iana"
                        },
                        "application/vnd.patientecommsdoc": {
                            source: "iana"
                        },
                        "application/vnd.pawaafile": {
                            source: "iana",
                            extensions: ["paw"]
                        },
                        "application/vnd.pcos": {
                            source: "iana"
                        },
                        "application/vnd.pg.format": {
                            source: "iana",
                            extensions: ["str"]
                        },
                        "application/vnd.pg.osasli": {
                            source: "iana",
                            extensions: ["ei6"]
                        },
                        "application/vnd.piaccess.application-licence": {
                            source: "iana"
                        },
                        "application/vnd.picsel": {
                            source: "iana",
                            extensions: ["efif"]
                        },
                        "application/vnd.pmi.widget": {
                            source: "iana",
                            extensions: ["wg"]
                        },
                        "application/vnd.poc.group-advertisement+xml": {
                            source: "iana",
                            compressible: !0
                        },
                        "application/vnd.pocketlearn": {
                            source: "iana",
                            extensions: ["plf"]
                        },
                        "application/vnd.powerbuilder6": {
                            source: "iana",
                            extensions: ["pbd"]
                        },
                        "application/vnd.powerbuilder6-s": {
                            source: "iana"
                        },
                        "application/vnd.powerbuilder7": {
                            source: "iana"
                        },
                        "application/vnd.powerbuilder7-s": {
                            source: "iana"
                        },
                        "application/vnd.powerbuilder75": {
                            source: "iana"
                        },
                        "application/vnd.powerbuilder75-s": {
                            source: "iana"
                        },
                        "application/vnd.preminet": {
                            source: "iana"
                        },
                        "application/vnd.previewsystems.box": {
                            source: "iana",
                            extensions: ["box"]
                        },
                        "application/vnd.proteus.magazine": {
                            source: "iana",
                            extensions: ["mgz"]
                        },
                        "application/vnd.psfs": {
                            source: "iana"
                        },
                        "application/vnd.publishare-delta-tree": {
                            source: "iana",
                            extensions: ["qps"]
                        },
                        "application/vnd.pvi.ptid1": {
                            source: "iana",
                            extensions: ["ptid"]
                        },
                        "application/vnd.pwg-multiplexed": {
                            source: "iana"
                        },
                        "application/vnd.pwg-xhtml-print+xml": {
                            source: "iana",
                            compressible: !0
                        },
                        "application/vnd.qualcomm.brew-app-res": {
                            source: "iana"
                        },
                        "application/vnd.quarantainenet": {
                            source: "iana"
                        },
                        "application/vnd.quark.quarkxpress": {
                            source: "iana",
                            extensions: ["qxd", "qxt", "qwd", "qwt", "qxl", "qxb"]
                        },
                        "application/vnd.quobject-quoxdocument": {
                            source: "iana"
                        },
                        "application/vnd.radisys.moml+xml": {
                            source: "iana",
                            compressible: !0
                        },
                        "application/vnd.radisys.msml+xml": {
                            source: "iana",
                            compressible: !0
                        },
                        "application/vnd.radisys.msml-audit+xml": {
                            source: "iana",
                            compressible: !0
                        },
                        "application/vnd.radisys.msml-audit-conf+xml": {
                            source: "iana",
                            compressible: !0
                        },
                        "application/vnd.radisys.msml-audit-conn+xml": {
                            source: "iana",
                            compressible: !0
                        },
                        "application/vnd.radisys.msml-audit-dialog+xml": {
                            source: "iana",
                            compressible: !0
                        },
                        "application/vnd.radisys.msml-audit-stream+xml": {
                            source: "iana",
                            compressible: !0
                        },
                        "application/vnd.radisys.msml-conf+xml": {
                            source: "iana",
                            compressible: !0
                        },
                        "application/vnd.radisys.msml-dialog+xml": {
                            source: "iana",
                            compressible: !0
                        },
                        "application/vnd.radisys.msml-dialog-base+xml": {
                            source: "iana",
                            compressible: !0
                        },
                        "application/vnd.radisys.msml-dialog-fax-detect+xml": {
                            source: "iana",
                            compressible: !0
                        },
                        "application/vnd.radisys.msml-dialog-fax-sendrecv+xml": {
                            source: "iana",
                            compressible: !0
                        },
                        "application/vnd.radisys.msml-dialog-group+xml": {
                            source: "iana",
                            compressible: !0
                        },
                        "application/vnd.radisys.msml-dialog-speech+xml": {
                            source: "iana",
                            compressible: !0
                        },
                        "application/vnd.radisys.msml-dialog-transform+xml": {
                            source: "iana",
                            compressible: !0
                        },
                        "application/vnd.rainstor.data": {
                            source: "iana"
                        },
                        "application/vnd.rapid": {
                            source: "iana"
                        },
                        "application/vnd.rar": {
                            source: "iana",
                            extensions: ["rar"]
                        },
                        "application/vnd.realvnc.bed": {
                            source: "iana",
                            extensions: ["bed"]
                        },
                        "application/vnd.recordare.musicxml": {
                            source: "iana",
                            extensions: ["mxl"]
                        },
                        "application/vnd.recordare.musicxml+xml": {
                            source: "iana",
                            compressible: !0,
                            extensions: ["musicxml"]
                        },
                        "application/vnd.renlearn.rlprint": {
                            source: "iana"
                        },
                        "application/vnd.resilient.logic": {
                            source: "iana"
                        },
                        "application/vnd.restful+json": {
                            source: "iana",
                            compressible: !0
                        },
                        "application/vnd.rig.cryptonote": {
                            source: "iana",
                            extensions: ["cryptonote"]
                        },
                        "application/vnd.rim.cod": {
                            source: "apache",
                            extensions: ["cod"]
                        },
                        "application/vnd.rn-realmedia": {
                            source: "apache",
                            extensions: ["rm"]
                        },
                        "application/vnd.rn-realmedia-vbr": {
                            source: "apache",
                            extensions: ["rmvb"]
                        },
                        "application/vnd.route66.link66+xml": {
                            source: "iana",
                            compressible: !0,
                            extensions: ["link66"]
                        },
                        "application/vnd.rs-274x": {
                            source: "iana"
                        },
                        "application/vnd.ruckus.download": {
                            source: "iana"
                        },
                        "application/vnd.s3sms": {
                            source: "iana"
                        },
                        "application/vnd.sailingtracker.track": {
                            source: "iana",
                            extensions: ["st"]
                        },
                        "application/vnd.sar": {
                            source: "iana"
                        },
                        "application/vnd.sbm.cid": {
                            source: "iana"
                        },
                        "application/vnd.sbm.mid2": {
                            source: "iana"
                        },
                        "application/vnd.scribus": {
                            source: "iana"
                        },
                        "application/vnd.sealed.3df": {
                            source: "iana"
                        },
                        "application/vnd.sealed.csf": {
                            source: "iana"
                        },
                        "application/vnd.sealed.doc": {
                            source: "iana"
                        },
                        "application/vnd.sealed.eml": {
                            source: "iana"
                        },
                        "application/vnd.sealed.mht": {
                            source: "iana"
                        },
                        "application/vnd.sealed.net": {
                            source: "iana"
                        },
                        "application/vnd.sealed.ppt": {
                            source: "iana"
                        },
                        "application/vnd.sealed.tiff": {
                            source: "iana"
                        },
                        "application/vnd.sealed.xls": {
                            source: "iana"
                        },
                        "application/vnd.sealedmedia.softseal.html": {
                            source: "iana"
                        },
                        "application/vnd.sealedmedia.softseal.pdf": {
                            source: "iana"
                        },
                        "application/vnd.seemail": {
                            source: "iana",
                            extensions: ["see"]
                        },
                        "application/vnd.seis+json": {
                            source: "iana",
                            compressible: !0
                        },
                        "application/vnd.sema": {
                            source: "iana",
                            extensions: ["sema"]
                        },
                        "application/vnd.semd": {
                            source: "iana",
                            extensions: ["semd"]
                        },
                        "application/vnd.semf": {
                            source: "iana",
                            extensions: ["semf"]
                        },
                        "application/vnd.shade-save-file": {
                            source: "iana"
                        },
                        "application/vnd.shana.informed.formdata": {
                            source: "iana",
                            extensions: ["ifm"]
                        },
                        "application/vnd.shana.informed.formtemplate": {
                            source: "iana",
                            extensions: ["itp"]
                        },
                        "application/vnd.shana.informed.interchange": {
                            source: "iana",
                            extensions: ["iif"]
                        },
                        "application/vnd.shana.informed.package": {
                            source: "iana",
                            extensions: ["ipk"]
                        },
                        "application/vnd.shootproof+json": {
                            source: "iana",
                            compressible: !0
                        },
                        "application/vnd.shopkick+json": {
                            source: "iana",
                            compressible: !0
                        },
                        "application/vnd.shp": {
                            source: "iana"
                        },
                        "application/vnd.shx": {
                            source: "iana"
                        },
                        "application/vnd.sigrok.session": {
                            source: "iana"
                        },
                        "application/vnd.simtech-mindmapper": {
                            source: "iana",
                            extensions: ["twd", "twds"]
                        },
                        "application/vnd.siren+json": {
                            source: "iana",
                            compressible: !0
                        },
                        "application/vnd.smaf": {
                            source: "iana",
                            extensions: ["mmf"]
                        },
                        "application/vnd.smart.notebook": {
                            source: "iana"
                        },
                        "application/vnd.smart.teacher": {
                            source: "iana",
                            extensions: ["teacher"]
                        },
                        "application/vnd.snesdev-page-table": {
                            source: "iana"
                        },
                        "application/vnd.software602.filler.form+xml": {
                            source: "iana",
                            compressible: !0,
                            extensions: ["fo"]
                        },
                        "application/vnd.software602.filler.form-xml-zip": {
                            source: "iana"
                        },
                        "application/vnd.solent.sdkm+xml": {
                            source: "iana",
                            compressible: !0,
                            extensions: ["sdkm", "sdkd"]
                        },
                        "application/vnd.spotfire.dxp": {
                            source: "iana",
                            extensions: ["dxp"]
                        },
                        "application/vnd.spotfire.sfs": {
                            source: "iana",
                            extensions: ["sfs"]
                        },
                        "application/vnd.sqlite3": {
                            source: "iana"
                        },
                        "application/vnd.sss-cod": {
                            source: "iana"
                        },
                        "application/vnd.sss-dtf": {
                            source: "iana"
                        },
                        "application/vnd.sss-ntf": {
                            source: "iana"
                        },
                        "application/vnd.stardivision.calc": {
                            source: "apache",
                            extensions: ["sdc"]
                        },
                        "application/vnd.stardivision.draw": {
                            source: "apache",
                            extensions: ["sda"]
                        },
                        "application/vnd.stardivision.impress": {
                            source: "apache",
                            extensions: ["sdd"]
                        },
                        "application/vnd.stardivision.math": {
                            source: "apache",
                            extensions: ["smf"]
                        },
                        "application/vnd.stardivision.writer": {
                            source: "apache",
                            extensions: ["sdw", "vor"]
                        },
                        "application/vnd.stardivision.writer-global": {
                            source: "apache",
                            extensions: ["sgl"]
                        },
                        "application/vnd.stepmania.package": {
                            source: "iana",
                            extensions: ["smzip"]
                        },
                        "application/vnd.stepmania.stepchart": {
                            source: "iana",
                            extensions: ["sm"]
                        },
                        "application/vnd.street-stream": {
                            source: "iana"
                        },
                        "application/vnd.sun.wadl+xml": {
                            source: "iana",
                            compressible: !0,
                            extensions: ["wadl"]
                        },
                        "application/vnd.sun.xml.calc": {
                            source: "apache",
                            extensions: ["sxc"]
                        },
                        "application/vnd.sun.xml.calc.template": {
                            source: "apache",
                            extensions: ["stc"]
                        },
                        "application/vnd.sun.xml.draw": {
                            source: "apache",
                            extensions: ["sxd"]
                        },
                        "application/vnd.sun.xml.draw.template": {
                            source: "apache",
                            extensions: ["std"]
                        },
                        "application/vnd.sun.xml.impress": {
                            source: "apache",
                            extensions: ["sxi"]
                        },
                        "application/vnd.sun.xml.impress.template": {
                            source: "apache",
                            extensions: ["sti"]
                        },
                        "application/vnd.sun.xml.math": {
                            source: "apache",
                            extensions: ["sxm"]
                        },
                        "application/vnd.sun.xml.writer": {
                            source: "apache",
                            extensions: ["sxw"]
                        },
                        "application/vnd.sun.xml.writer.global": {
                            source: "apache",
                            extensions: ["sxg"]
                        },
                        "application/vnd.sun.xml.writer.template": {
                            source: "apache",
                            extensions: ["stw"]
                        },
                        "application/vnd.sus-calendar": {
                            source: "iana",
                            extensions: ["sus", "susp"]
                        },
                        "application/vnd.svd": {
                            source: "iana",
                            extensions: ["svd"]
                        },
                        "application/vnd.swiftview-ics": {
                            source: "iana"
                        },
                        "application/vnd.sycle+xml": {
                            source: "iana",
                            compressible: !0
                        },
                        "application/vnd.syft+json": {
                            source: "iana",
                            compressible: !0
                        },
                        "application/vnd.symbian.install": {
                            source: "apache",
                            extensions: ["sis", "sisx"]
                        },
                        "application/vnd.syncml+xml": {
                            source: "iana",
                            charset: "UTF-8",
                            compressible: !0,
                            extensions: ["xsm"]
                        },
                        "application/vnd.syncml.dm+wbxml": {
                            source: "iana",
                            charset: "UTF-8",
                            extensions: ["bdm"]
                        },
                        "application/vnd.syncml.dm+xml": {
                            source: "iana",
                            charset: "UTF-8",
                            compressible: !0,
                            extensions: ["xdm"]
                        },
                        "application/vnd.syncml.dm.notification": {
                            source: "iana"
                        },
                        "application/vnd.syncml.dmddf+wbxml": {
                            source: "iana"
                        },
                        "application/vnd.syncml.dmddf+xml": {
                            source: "iana",
                            charset: "UTF-8",
                            compressible: !0,
                            extensions: ["ddf"]
                        },
                        "application/vnd.syncml.dmtnds+wbxml": {
                            source: "iana"
                        },
                        "application/vnd.syncml.dmtnds+xml": {
                            source: "iana",
                            charset: "UTF-8",
                            compressible: !0
                        },
                        "application/vnd.syncml.ds.notification": {
                            source: "iana"
                        },
                        "application/vnd.tableschema+json": {
                            source: "iana",
                            compressible: !0
                        },
                        "application/vnd.tao.intent-module-archive": {
                            source: "iana",
                            extensions: ["tao"]
                        },
                        "application/vnd.tcpdump.pcap": {
                            source: "iana",
                            extensions: ["pcap", "cap", "dmp"]
                        },
                        "application/vnd.think-cell.ppttc+json": {
                            source: "iana",
                            compressible: !0
                        },
                        "application/vnd.tmd.mediaflex.api+xml": {
                            source: "iana",
                            compressible: !0
                        },
                        "application/vnd.tml": {
                            source: "iana"
                        },
                        "application/vnd.tmobile-livetv": {
                            source: "iana",
                            extensions: ["tmo"]
                        },
                        "application/vnd.tri.onesource": {
                            source: "iana"
                        },
                        "application/vnd.trid.tpt": {
                            source: "iana",
                            extensions: ["tpt"]
                        },
                        "application/vnd.triscape.mxs": {
                            source: "iana",
                            extensions: ["mxs"]
                        },
                        "application/vnd.trueapp": {
                            source: "iana",
                            extensions: ["tra"]
                        },
                        "application/vnd.truedoc": {
                            source: "iana"
                        },
                        "application/vnd.ubisoft.webplayer": {
                            source: "iana"
                        },
                        "application/vnd.ufdl": {
                            source: "iana",
                            extensions: ["ufd", "ufdl"]
                        },
                        "application/vnd.uiq.theme": {
                            source: "iana",
                            extensions: ["utz"]
                        },
                        "application/vnd.umajin": {
                            source: "iana",
                            extensions: ["umj"]
                        },
                        "application/vnd.unity": {
                            source: "iana",
                            extensions: ["unityweb"]
                        },
                        "application/vnd.uoml+xml": {
                            source: "iana",
                            compressible: !0,
                            extensions: ["uoml"]
                        },
                        "application/vnd.uplanet.alert": {
                            source: "iana"
                        },
                        "application/vnd.uplanet.alert-wbxml": {
                            source: "iana"
                        },
                        "application/vnd.uplanet.bearer-choice": {
                            source: "iana"
                        },
                        "application/vnd.uplanet.bearer-choice-wbxml": {
                            source: "iana"
                        },
                        "application/vnd.uplanet.cacheop": {
                            source: "iana"
                        },
                        "application/vnd.uplanet.cacheop-wbxml": {
                            source: "iana"
                        },
                        "application/vnd.uplanet.channel": {
                            source: "iana"
                        },
                        "application/vnd.uplanet.channel-wbxml": {
                            source: "iana"
                        },
                        "application/vnd.uplanet.list": {
                            source: "iana"
                        },
                        "application/vnd.uplanet.list-wbxml": {
                            source: "iana"
                        },
                        "application/vnd.uplanet.listcmd": {
                            source: "iana"
                        },
                        "application/vnd.uplanet.listcmd-wbxml": {
                            source: "iana"
                        },
                        "application/vnd.uplanet.signal": {
                            source: "iana"
                        },
                        "application/vnd.uri-map": {
                            source: "iana"
                        },
                        "application/vnd.valve.source.material": {
                            source: "iana"
                        },
                        "application/vnd.vcx": {
                            source: "iana",
                            extensions: ["vcx"]
                        },
                        "application/vnd.vd-study": {
                            source: "iana"
                        },
                        "application/vnd.vectorworks": {
                            source: "iana"
                        },
                        "application/vnd.vel+json": {
                            source: "iana",
                            compressible: !0
                        },
                        "application/vnd.verimatrix.vcas": {
                            source: "iana"
                        },
                        "application/vnd.veritone.aion+json": {
                            source: "iana",
                            compressible: !0
                        },
                        "application/vnd.veryant.thin": {
                            source: "iana"
                        },
                        "application/vnd.ves.encrypted": {
                            source: "iana"
                        },
                        "application/vnd.vidsoft.vidconference": {
                            source: "iana"
                        },
                        "application/vnd.visio": {
                            source: "iana",
                            extensions: ["vsd", "vst", "vss", "vsw"]
                        },
                        "application/vnd.visionary": {
                            source: "iana",
                            extensions: ["vis"]
                        },
                        "application/vnd.vividence.scriptfile": {
                            source: "iana"
                        },
                        "application/vnd.vsf": {
                            source: "iana",
                            extensions: ["vsf"]
                        },
                        "application/vnd.wap.sic": {
                            source: "iana"
                        },
                        "application/vnd.wap.slc": {
                            source: "iana"
                        },
                        "application/vnd.wap.wbxml": {
                            source: "iana",
                            charset: "UTF-8",
                            extensions: ["wbxml"]
                        },
                        "application/vnd.wap.wmlc": {
                            source: "iana",
                            extensions: ["wmlc"]
                        },
                        "application/vnd.wap.wmlscriptc": {
                            source: "iana",
                            extensions: ["wmlsc"]
                        },
                        "application/vnd.webturbo": {
                            source: "iana",
                            extensions: ["wtb"]
                        },
                        "application/vnd.wfa.dpp": {
                            source: "iana"
                        },
                        "application/vnd.wfa.p2p": {
                            source: "iana"
                        },
                        "application/vnd.wfa.wsc": {
                            source: "iana"
                        },
                        "application/vnd.windows.devicepairing": {
                            source: "iana"
                        },
                        "application/vnd.wmc": {
                            source: "iana"
                        },
                        "application/vnd.wmf.bootstrap": {
                            source: "iana"
                        },
                        "application/vnd.wolfram.mathematica": {
                            source: "iana"
                        },
                        "application/vnd.wolfram.mathematica.package": {
                            source: "iana"
                        },
                        "application/vnd.wolfram.player": {
                            source: "iana",
                            extensions: ["nbp"]
                        },
                        "application/vnd.wordperfect": {
                            source: "iana",
                            extensions: ["wpd"]
                        },
                        "application/vnd.wqd": {
                            source: "iana",
                            extensions: ["wqd"]
                        },
                        "application/vnd.wrq-hp3000-labelled": {
                            source: "iana"
                        },
                        "application/vnd.wt.stf": {
                            source: "iana",
                            extensions: ["stf"]
                        },
                        "application/vnd.wv.csp+wbxml": {
                            source: "iana"
                        },
                        "application/vnd.wv.csp+xml": {
                            source: "iana",
                            compressible: !0
                        },
                        "application/vnd.wv.ssp+xml": {
                            source: "iana",
                            compressible: !0
                        },
                        "application/vnd.xacml+json": {
                            source: "iana",
                            compressible: !0
                        },
                        "application/vnd.xara": {
                            source: "iana",
                            extensions: ["xar"]
                        },
                        "application/vnd.xfdl": {
                            source: "iana",
                            extensions: ["xfdl"]
                        },
                        "application/vnd.xfdl.webform": {
                            source: "iana"
                        },
                        "application/vnd.xmi+xml": {
                            source: "iana",
                            compressible: !0
                        },
                        "application/vnd.xmpie.cpkg": {
                            source: "iana"
                        },
                        "application/vnd.xmpie.dpkg": {
                            source: "iana"
                        },
                        "application/vnd.xmpie.plan": {
                            source: "iana"
                        },
                        "application/vnd.xmpie.ppkg": {
                            source: "iana"
                        },
                        "application/vnd.xmpie.xlim": {
                            source: "iana"
                        },
                        "application/vnd.yamaha.hv-dic": {
                            source: "iana",
                            extensions: ["hvd"]
                        },
                        "application/vnd.yamaha.hv-script": {
                            source: "iana",
                            extensions: ["hvs"]
                        },
                        "application/vnd.yamaha.hv-voice": {
                            source: "iana",
                            extensions: ["hvp"]
                        },
                        "application/vnd.yamaha.openscoreformat": {
                            source: "iana",
                            extensions: ["osf"]
                        },
                        "application/vnd.yamaha.openscoreformat.osfpvg+xml": {
                            source: "iana",
                            compressible: !0,
                            extensions: ["osfpvg"]
                        },
                        "application/vnd.yamaha.remote-setup": {
                            source: "iana"
                        },
                        "application/vnd.yamaha.smaf-audio": {
                            source: "iana",
                            extensions: ["saf"]
                        },
                        "application/vnd.yamaha.smaf-phrase": {
                            source: "iana",
                            extensions: ["spf"]
                        },
                        "application/vnd.yamaha.through-ngn": {
                            source: "iana"
                        },
                        "application/vnd.yamaha.tunnel-udpencap": {
                            source: "iana"
                        },
                        "application/vnd.yaoweme": {
                            source: "iana"
                        },
                        "application/vnd.yellowriver-custom-menu": {
                            source: "iana",
                            extensions: ["cmp"]
                        },
                        "application/vnd.youtube.yt": {
                            source: "iana"
                        },
                        "application/vnd.zul": {
                            source: "iana",
                            extensions: ["zir", "zirz"]
                        },
                        "application/vnd.zzazz.deck+xml": {
                            source: "iana",
                            compressible: !0,
                            extensions: ["zaz"]
                        },
                        "application/voicexml+xml": {
                            source: "iana",
                            compressible: !0,
                            extensions: ["vxml"]
                        },
                        "application/voucher-cms+json": {
                            source: "iana",
                            compressible: !0
                        },
                        "application/vq-rtcpxr": {
                            source: "iana"
                        },
                        "application/wasm": {
                            source: "iana",
                            compressible: !0,
                            extensions: ["wasm"]
                        },
                        "application/watcherinfo+xml": {
                            source: "iana",
                            compressible: !0,
                            extensions: ["wif"]
                        },
                        "application/webpush-options+json": {
                            source: "iana",
                            compressible: !0
                        },
                        "application/whoispp-query": {
                            source: "iana"
                        },
                        "application/whoispp-response": {
                            source: "iana"
                        },
                        "application/widget": {
                            source: "iana",
                            extensions: ["wgt"]
                        },
                        "application/winhlp": {
                            source: "apache",
                            extensions: ["hlp"]
                        },
                        "application/wita": {
                            source: "iana"
                        },
                        "application/wordperfect5.1": {
                            source: "iana"
                        },
                        "application/wsdl+xml": {
                            source: "iana",
                            compressible: !0,
                            extensions: ["wsdl"]
                        },
                        "application/wspolicy+xml": {
                            source: "iana",
                            compressible: !0,
                            extensions: ["wspolicy"]
                        },
                        "application/x-7z-compressed": {
                            source: "apache",
                            compressible: !1,
                            extensions: ["7z"]
                        },
                        "application/x-abiword": {
                            source: "apache",
                            extensions: ["abw"]
                        },
                        "application/x-ace-compressed": {
                            source: "apache",
                            extensions: ["ace"]
                        },
                        "application/x-amf": {
                            source: "apache"
                        },
                        "application/x-apple-diskimage": {
                            source: "apache",
                            extensions: ["dmg"]
                        },
                        "application/x-arj": {
                            compressible: !1,
                            extensions: ["arj"]
                        },
                        "application/x-authorware-bin": {
                            source: "apache",
                            extensions: ["aab", "x32", "u32", "vox"]
                        },
                        "application/x-authorware-map": {
                            source: "apache",
                            extensions: ["aam"]
                        },
                        "application/x-authorware-seg": {
                            source: "apache",
                            extensions: ["aas"]
                        },
                        "application/x-bcpio": {
                            source: "apache",
                            extensions: ["bcpio"]
                        },
                        "application/x-bdoc": {
                            compressible: !1,
                            extensions: ["bdoc"]
                        },
                        "application/x-bittorrent": {
                            source: "apache",
                            extensions: ["torrent"]
                        },
                        "application/x-blorb": {
                            source: "apache",
                            extensions: ["blb", "blorb"]
                        },
                        "application/x-bzip": {
                            source: "apache",
                            compressible: !1,
                            extensions: ["bz"]
                        },
                        "application/x-bzip2": {
                            source: "apache",
                            compressible: !1,
                            extensions: ["bz2", "boz"]
                        },
                        "application/x-cbr": {
                            source: "apache",
                            extensions: ["cbr", "cba", "cbt", "cbz", "cb7"]
                        },
                        "application/x-cdlink": {
                            source: "apache",
                            extensions: ["vcd"]
                        },
                        "application/x-cfs-compressed": {
                            source: "apache",
                            extensions: ["cfs"]
                        },
                        "application/x-chat": {
                            source: "apache",
                            extensions: ["chat"]
                        },
                        "application/x-chess-pgn": {
                            source: "apache",
                            extensions: ["pgn"]
                        },
                        "application/x-chrome-extension": {
                            extensions: ["crx"]
                        },
                        "application/x-cocoa": {
                            source: "nginx",
                            extensions: ["cco"]
                        },
                        "application/x-compress": {
                            source: "apache"
                        },
                        "application/x-conference": {
                            source: "apache",
                            extensions: ["nsc"]
                        },
                        "application/x-cpio": {
                            source: "apache",
                            extensions: ["cpio"]
                        },
                        "application/x-csh": {
                            source: "apache",
                            extensions: ["csh"]
                        },
                        "application/x-deb": {
                            compressible: !1
                        },
                        "application/x-debian-package": {
                            source: "apache",
                            extensions: ["deb", "udeb"]
                        },
                        "application/x-dgc-compressed": {
                            source: "apache",
                            extensions: ["dgc"]
                        },
                        "application/x-director": {
                            source: "apache",
                            extensions: ["dir", "dcr", "dxr", "cst", "cct", "cxt", "w3d", "fgd", "swa"]
                        },
                        "application/x-doom": {
                            source: "apache",
                            extensions: ["wad"]
                        },
                        "application/x-dtbncx+xml": {
                            source: "apache",
                            compressible: !0,
                            extensions: ["ncx"]
                        },
                        "application/x-dtbook+xml": {
                            source: "apache",
                            compressible: !0,
                            extensions: ["dtb"]
                        },
                        "application/x-dtbresource+xml": {
                            source: "apache",
                            compressible: !0,
                            extensions: ["res"]
                        },
                        "application/x-dvi": {
                            source: "apache",
                            compressible: !1,
                            extensions: ["dvi"]
                        },
                        "application/x-envoy": {
                            source: "apache",
                            extensions: ["evy"]
                        },
                        "application/x-eva": {
                            source: "apache",
                            extensions: ["eva"]
                        },
                        "application/x-font-bdf": {
                            source: "apache",
                            extensions: ["bdf"]
                        },
                        "application/x-font-dos": {
                            source: "apache"
                        },
                        "application/x-font-framemaker": {
                            source: "apache"
                        },
                        "application/x-font-ghostscript": {
                            source: "apache",
                            extensions: ["gsf"]
                        },
                        "application/x-font-libgrx": {
                            source: "apache"
                        },
                        "application/x-font-linux-psf": {
                            source: "apache",
                            extensions: ["psf"]
                        },
                        "application/x-font-pcf": {
                            source: "apache",
                            extensions: ["pcf"]
                        },
                        "application/x-font-snf": {
                            source: "apache",
                            extensions: ["snf"]
                        },
                        "application/x-font-speedo": {
                            source: "apache"
                        },
                        "application/x-font-sunos-news": {
                            source: "apache"
                        },
                        "application/x-font-type1": {
                            source: "apache",
                            extensions: ["pfa", "pfb", "pfm", "afm"]
                        },
                        "application/x-font-vfont": {
                            source: "apache"
                        },
                        "application/x-freearc": {
                            source: "apache",
                            extensions: ["arc"]
                        },
                        "application/x-futuresplash": {
                            source: "apache",
                            extensions: ["spl"]
                        },
                        "application/x-gca-compressed": {
                            source: "apache",
                            extensions: ["gca"]
                        },
                        "application/x-glulx": {
                            source: "apache",
                            extensions: ["ulx"]
                        },
                        "application/x-gnumeric": {
                            source: "apache",
                            extensions: ["gnumeric"]
                        },
                        "application/x-gramps-xml": {
                            source: "apache",
                            extensions: ["gramps"]
                        },
                        "application/x-gtar": {
                            source: "apache",
                            extensions: ["gtar"]
                        },
                        "application/x-gzip": {
                            source: "apache"
                        },
                        "application/x-hdf": {
                            source: "apache",
                            extensions: ["hdf"]
                        },
                        "application/x-httpd-php": {
                            compressible: !0,
                            extensions: ["php"]
                        },
                        "application/x-install-instructions": {
                            source: "apache",
                            extensions: ["install"]
                        },
                        "application/x-iso9660-image": {
                            source: "apache",
                            extensions: ["iso"]
                        },
                        "application/x-iwork-keynote-sffkey": {
                            extensions: ["key"]
                        },
                        "application/x-iwork-numbers-sffnumbers": {
                            extensions: ["numbers"]
                        },
                        "application/x-iwork-pages-sffpages": {
                            extensions: ["pages"]
                        },
                        "application/x-java-archive-diff": {
                            source: "nginx",
                            extensions: ["jardiff"]
                        },
                        "application/x-java-jnlp-file": {
                            source: "apache",
                            compressible: !1,
                            extensions: ["jnlp"]
                        },
                        "application/x-javascript": {
                            compressible: !0
                        },
                        "application/x-keepass2": {
                            extensions: ["kdbx"]
                        },
                        "application/x-latex": {
                            source: "apache",
                            compressible: !1,
                            extensions: ["latex"]
                        },
                        "application/x-lua-bytecode": {
                            extensions: ["luac"]
                        },
                        "application/x-lzh-compressed": {
                            source: "apache",
                            extensions: ["lzh", "lha"]
                        },
                        "application/x-makeself": {
                            source: "nginx",
                            extensions: ["run"]
                        },
                        "application/x-mie": {
                            source: "apache",
                            extensions: ["mie"]
                        },
                        "application/x-mobipocket-ebook": {
                            source: "apache",
                            extensions: ["prc", "mobi"]
                        },
                        "application/x-mpegurl": {
                            compressible: !1
                        },
                        "application/x-ms-application": {
                            source: "apache",
                            extensions: ["application"]
                        },
                        "application/x-ms-shortcut": {
                            source: "apache",
                            extensions: ["lnk"]
                        },
                        "application/x-ms-wmd": {
                            source: "apache",
                            extensions: ["wmd"]
                        },
                        "application/x-ms-wmz": {
                            source: "apache",
                            extensions: ["wmz"]
                        },
                        "application/x-ms-xbap": {
                            source: "apache",
                            extensions: ["xbap"]
                        },
                        "application/x-msaccess": {
                            source: "apache",
                            extensions: ["mdb"]
                        },
                        "application/x-msbinder": {
                            source: "apache",
                            extensions: ["obd"]
                        },
                        "application/x-mscardfile": {
                            source: "apache",
                            extensions: ["crd"]
                        },
                        "application/x-msclip": {
                            source: "apache",
                            extensions: ["clp"]
                        },
                        "application/x-msdos-program": {
                            extensions: ["exe"]
                        },
                        "application/x-msdownload": {
                            source: "apache",
                            extensions: ["exe", "dll", "com", "bat", "msi"]
                        },
                        "application/x-msmediaview": {
                            source: "apache",
                            extensions: ["mvb", "m13", "m14"]
                        },
                        "application/x-msmetafile": {
                            source: "apache",
                            extensions: ["wmf", "wmz", "emf", "emz"]
                        },
                        "application/x-msmoney": {
                            source: "apache",
                            extensions: ["mny"]
                        },
                        "application/x-mspublisher": {
                            source: "apache",
                            extensions: ["pub"]
                        },
                        "application/x-msschedule": {
                            source: "apache",
                            extensions: ["scd"]
                        },
                        "application/x-msterminal": {
                            source: "apache",
                            extensions: ["trm"]
                        },
                        "application/x-mswrite": {
                            source: "apache",
                            extensions: ["wri"]
                        },
                        "application/x-netcdf": {
                            source: "apache",
                            extensions: ["nc", "cdf"]
                        },
                        "application/x-ns-proxy-autoconfig": {
                            compressible: !0,
                            extensions: ["pac"]
                        },
                        "application/x-nzb": {
                            source: "apache",
                            extensions: ["nzb"]
                        },
                        "application/x-perl": {
                            source: "nginx",
                            extensions: ["pl", "pm"]
                        },
                        "application/x-pilot": {
                            source: "nginx",
                            extensions: ["prc", "pdb"]
                        },
                        "application/x-pkcs12": {
                            source: "apache",
                            compressible: !1,
                            extensions: ["p12", "pfx"]
                        },
                        "application/x-pkcs7-certificates": {
                            source: "apache",
                            extensions: ["p7b", "spc"]
                        },
                        "application/x-pkcs7-certreqresp": {
                            source: "apache",
                            extensions: ["p7r"]
                        },
                        "application/x-pki-message": {
                            source: "iana"
                        },
                        "application/x-rar-compressed": {
                            source: "apache",
                            compressible: !1,
                            extensions: ["rar"]
                        },
                        "application/x-redhat-package-manager": {
                            source: "nginx",
                            extensions: ["rpm"]
                        },
                        "application/x-research-info-systems": {
                            source: "apache",
                            extensions: ["ris"]
                        },
                        "application/x-sea": {
                            source: "nginx",
                            extensions: ["sea"]
                        },
                        "application/x-sh": {
                            source: "apache",
                            compressible: !0,
                            extensions: ["sh"]
                        },
                        "application/x-shar": {
                            source: "apache",
                            extensions: ["shar"]
                        },
                        "application/x-shockwave-flash": {
                            source: "apache",
                            compressible: !1,
                            extensions: ["swf"]
                        },
                        "application/x-silverlight-app": {
                            source: "apache",
                            extensions: ["xap"]
                        },
                        "application/x-sql": {
                            source: "apache",
                            extensions: ["sql"]
                        },
                        "application/x-stuffit": {
                            source: "apache",
                            compressible: !1,
                            extensions: ["sit"]
                        },
                        "application/x-stuffitx": {
                            source: "apache",
                            extensions: ["sitx"]
                        },
                        "application/x-subrip": {
                            source: "apache",
                            extensions: ["srt"]
                        },
                        "application/x-sv4cpio": {
                            source: "apache",
                            extensions: ["sv4cpio"]
                        },
                        "application/x-sv4crc": {
                            source: "apache",
                            extensions: ["sv4crc"]
                        },
                        "application/x-t3vm-image": {
                            source: "apache",
                            extensions: ["t3"]
                        },
                        "application/x-tads": {
                            source: "apache",
                            extensions: ["gam"]
                        },
                        "application/x-tar": {
                            source: "apache",
                            compressible: !0,
                            extensions: ["tar"]
                        },
                        "application/x-tcl": {
                            source: "apache",
                            extensions: ["tcl", "tk"]
                        },
                        "application/x-tex": {
                            source: "apache",
                            extensions: ["tex"]
                        },
                        "application/x-tex-tfm": {
                            source: "apache",
                            extensions: ["tfm"]
                        },
                        "application/x-texinfo": {
                            source: "apache",
                            extensions: ["texinfo", "texi"]
                        },
                        "application/x-tgif": {
                            source: "apache",
                            extensions: ["obj"]
                        },
                        "application/x-ustar": {
                            source: "apache",
                            extensions: ["ustar"]
                        },
                        "application/x-virtualbox-hdd": {
                            compressible: !0,
                            extensions: ["hdd"]
                        },
                        "application/x-virtualbox-ova": {
                            compressible: !0,
                            extensions: ["ova"]
                        },
                        "application/x-virtualbox-ovf": {
                            compressible: !0,
                            extensions: ["ovf"]
                        },
                        "application/x-virtualbox-vbox": {
                            compressible: !0,
                            extensions: ["vbox"]
                        },
                        "application/x-virtualbox-vbox-extpack": {
                            compressible: !1,
                            extensions: ["vbox-extpack"]
                        },
                        "application/x-virtualbox-vdi": {
                            compressible: !0,
                            extensions: ["vdi"]
                        },
                        "application/x-virtualbox-vhd": {
                            compressible: !0,
                            extensions: ["vhd"]
                        },
                        "application/x-virtualbox-vmdk": {
                            compressible: !0,
                            extensions: ["vmdk"]
                        },
                        "application/x-wais-source": {
                            source: "apache",
                            extensions: ["src"]
                        },
                        "application/x-web-app-manifest+json": {
                            compressible: !0,
                            extensions: ["webapp"]
                        },
                        "application/x-www-form-urlencoded": {
                            source: "iana",
                            compressible: !0
                        },
                        "application/x-x509-ca-cert": {
                            source: "iana",
                            extensions: ["der", "crt", "pem"]
                        },
                        "application/x-x509-ca-ra-cert": {
                            source: "iana"
                        },
                        "application/x-x509-next-ca-cert": {
                            source: "iana"
                        },
                        "application/x-xfig": {
                            source: "apache",
                            extensions: ["fig"]
                        },
                        "application/x-xliff+xml": {
                            source: "apache",
                            compressible: !0,
                            extensions: ["xlf"]
                        },
                        "application/x-xpinstall": {
                            source: "apache",
                            compressible: !1,
                            extensions: ["xpi"]
                        },
                        "application/x-xz": {
                            source: "apache",
                            extensions: ["xz"]
                        },
                        "application/x-zmachine": {
                            source: "apache",
                            extensions: ["z1", "z2", "z3", "z4", "z5", "z6", "z7", "z8"]
                        },
                        "application/x400-bp": {
                            source: "iana"
                        },
                        "application/xacml+xml": {
                            source: "iana",
                            compressible: !0
                        },
                        "application/xaml+xml": {
                            source: "apache",
                            compressible: !0,
                            extensions: ["xaml"]
                        },
                        "application/xcap-att+xml": {
                            source: "iana",
                            compressible: !0,
                            extensions: ["xav"]
                        },
                        "application/xcap-caps+xml": {
                            source: "iana",
                            compressible: !0,
                            extensions: ["xca"]
                        },
                        "application/xcap-diff+xml": {
                            source: "iana",
                            compressible: !0,
                            extensions: ["xdf"]
                        },
                        "application/xcap-el+xml": {
                            source: "iana",
                            compressible: !0,
                            extensions: ["xel"]
                        },
                        "application/xcap-error+xml": {
                            source: "iana",
                            compressible: !0
                        },
                        "application/xcap-ns+xml": {
                            source: "iana",
                            compressible: !0,
                            extensions: ["xns"]
                        },
                        "application/xcon-conference-info+xml": {
                            source: "iana",
                            compressible: !0
                        },
                        "application/xcon-conference-info-diff+xml": {
                            source: "iana",
                            compressible: !0
                        },
                        "application/xenc+xml": {
                            source: "iana",
                            compressible: !0,
                            extensions: ["xenc"]
                        },
                        "application/xhtml+xml": {
                            source: "iana",
                            compressible: !0,
                            extensions: ["xhtml", "xht"]
                        },
                        "application/xhtml-voice+xml": {
                            source: "apache",
                            compressible: !0
                        },
                        "application/xliff+xml": {
                            source: "iana",
                            compressible: !0,
                            extensions: ["xlf"]
                        },
                        "application/xml": {
                            source: "iana",
                            compressible: !0,
                            extensions: ["xml", "xsl", "xsd", "rng"]
                        },
                        "application/xml-dtd": {
                            source: "iana",
                            compressible: !0,
                            extensions: ["dtd"]
                        },
                        "application/xml-external-parsed-entity": {
                            source: "iana"
                        },
                        "application/xml-patch+xml": {
                            source: "iana",
                            compressible: !0
                        },
                        "application/xmpp+xml": {
                            source: "iana",
                            compressible: !0
                        },
                        "application/xop+xml": {
                            source: "iana",
                            compressible: !0,
                            extensions: ["xop"]
                        },
                        "application/xproc+xml": {
                            source: "apache",
                            compressible: !0,
                            extensions: ["xpl"]
                        },
                        "application/xslt+xml": {
                            source: "iana",
                            compressible: !0,
                            extensions: ["xsl", "xslt"]
                        },
                        "application/xspf+xml": {
                            source: "apache",
                            compressible: !0,
                            extensions: ["xspf"]
                        },
                        "application/xv+xml": {
                            source: "iana",
                            compressible: !0,
                            extensions: ["mxml", "xhvml", "xvml", "xvm"]
                        },
                        "application/yang": {
                            source: "iana",
                            extensions: ["yang"]
                        },
                        "application/yang-data+json": {
                            source: "iana",
                            compressible: !0
                        },
                        "application/yang-data+xml": {
                            source: "iana",
                            compressible: !0
                        },
                        "application/yang-patch+json": {
                            source: "iana",
                            compressible: !0
                        },
                        "application/yang-patch+xml": {
                            source: "iana",
                            compressible: !0
                        },
                        "application/yin+xml": {
                            source: "iana",
                            compressible: !0,
                            extensions: ["yin"]
                        },
                        "application/zip": {
                            source: "iana",
                            compressible: !1,
                            extensions: ["zip"]
                        },
                        "application/zlib": {
                            source: "iana"
                        },
                        "application/zstd": {
                            source: "iana"
                        },
                        "audio/1d-interleaved-parityfec": {
                            source: "iana"
                        },
                        "audio/32kadpcm": {
                            source: "iana"
                        },
                        "audio/3gpp": {
                            source: "iana",
                            compressible: !1,
                            extensions: ["3gpp"]
                        },
                        "audio/3gpp2": {
                            source: "iana"
                        },
                        "audio/aac": {
                            source: "iana"
                        },
                        "audio/ac3": {
                            source: "iana"
                        },
                        "audio/adpcm": {
                            source: "apache",
                            extensions: ["adp"]
                        },
                        "audio/amr": {
                            source: "iana",
                            extensions: ["amr"]
                        },
                        "audio/amr-wb": {
                            source: "iana"
                        },
                        "audio/amr-wb+": {
                            source: "iana"
                        },
                        "audio/aptx": {
                            source: "iana"
                        },
                        "audio/asc": {
                            source: "iana"
                        },
                        "audio/atrac-advanced-lossless": {
                            source: "iana"
                        },
                        "audio/atrac-x": {
                            source: "iana"
                        },
                        "audio/atrac3": {
                            source: "iana"
                        },
                        "audio/basic": {
                            source: "iana",
                            compressible: !1,
                            extensions: ["au", "snd"]
                        },
                        "audio/bv16": {
                            source: "iana"
                        },
                        "audio/bv32": {
                            source: "iana"
                        },
                        "audio/clearmode": {
                            source: "iana"
                        },
                        "audio/cn": {
                            source: "iana"
                        },
                        "audio/dat12": {
                            source: "iana"
                        },
                        "audio/dls": {
                            source: "iana"
                        },
                        "audio/dsr-es201108": {
                            source: "iana"
                        },
                        "audio/dsr-es202050": {
                            source: "iana"
                        },
                        "audio/dsr-es202211": {
                            source: "iana"
                        },
                        "audio/dsr-es202212": {
                            source: "iana"
                        },
                        "audio/dv": {
                            source: "iana"
                        },
                        "audio/dvi4": {
                            source: "iana"
                        },
                        "audio/eac3": {
                            source: "iana"
                        },
                        "audio/encaprtp": {
                            source: "iana"
                        },
                        "audio/evrc": {
                            source: "iana"
                        },
                        "audio/evrc-qcp": {
                            source: "iana"
                        },
                        "audio/evrc0": {
                            source: "iana"
                        },
                        "audio/evrc1": {
                            source: "iana"
                        },
                        "audio/evrcb": {
                            source: "iana"
                        },
                        "audio/evrcb0": {
                            source: "iana"
                        },
                        "audio/evrcb1": {
                            source: "iana"
                        },
                        "audio/evrcnw": {
                            source: "iana"
                        },
                        "audio/evrcnw0": {
                            source: "iana"
                        },
                        "audio/evrcnw1": {
                            source: "iana"
                        },
                        "audio/evrcwb": {
                            source: "iana"
                        },
                        "audio/evrcwb0": {
                            source: "iana"
                        },
                        "audio/evrcwb1": {
                            source: "iana"
                        },
                        "audio/evs": {
                            source: "iana"
                        },
                        "audio/flexfec": {
                            source: "iana"
                        },
                        "audio/fwdred": {
                            source: "iana"
                        },
                        "audio/g711-0": {
                            source: "iana"
                        },
                        "audio/g719": {
                            source: "iana"
                        },
                        "audio/g722": {
                            source: "iana"
                        },
                        "audio/g7221": {
                            source: "iana"
                        },
                        "audio/g723": {
                            source: "iana"
                        },
                        "audio/g726-16": {
                            source: "iana"
                        },
                        "audio/g726-24": {
                            source: "iana"
                        },
                        "audio/g726-32": {
                            source: "iana"
                        },
                        "audio/g726-40": {
                            source: "iana"
                        },
                        "audio/g728": {
                            source: "iana"
                        },
                        "audio/g729": {
                            source: "iana"
                        },
                        "audio/g7291": {
                            source: "iana"
                        },
                        "audio/g729d": {
                            source: "iana"
                        },
                        "audio/g729e": {
                            source: "iana"
                        },
                        "audio/gsm": {
                            source: "iana"
                        },
                        "audio/gsm-efr": {
                            source: "iana"
                        },
                        "audio/gsm-hr-08": {
                            source: "iana"
                        },
                        "audio/ilbc": {
                            source: "iana"
                        },
                        "audio/ip-mr_v2.5": {
                            source: "iana"
                        },
                        "audio/isac": {
                            source: "apache"
                        },
                        "audio/l16": {
                            source: "iana"
                        },
                        "audio/l20": {
                            source: "iana"
                        },
                        "audio/l24": {
                            source: "iana",
                            compressible: !1
                        },
                        "audio/l8": {
                            source: "iana"
                        },
                        "audio/lpc": {
                            source: "iana"
                        },
                        "audio/melp": {
                            source: "iana"
                        },
                        "audio/melp1200": {
                            source: "iana"
                        },
                        "audio/melp2400": {
                            source: "iana"
                        },
                        "audio/melp600": {
                            source: "iana"
                        },
                        "audio/mhas": {
                            source: "iana"
                        },
                        "audio/midi": {
                            source: "apache",
                            extensions: ["mid", "midi", "kar", "rmi"]
                        },
                        "audio/mobile-xmf": {
                            source: "iana",
                            extensions: ["mxmf"]
                        },
                        "audio/mp3": {
                            compressible: !1,
                            extensions: ["mp3"]
                        },
                        "audio/mp4": {
                            source: "iana",
                            compressible: !1,
                            extensions: ["m4a", "mp4a"]
                        },
                        "audio/mp4a-latm": {
                            source: "iana"
                        },
                        "audio/mpa": {
                            source: "iana"
                        },
                        "audio/mpa-robust": {
                            source: "iana"
                        },
                        "audio/mpeg": {
                            source: "iana",
                            compressible: !1,
                            extensions: ["mpga", "mp2", "mp2a", "mp3", "m2a", "m3a"]
                        },
                        "audio/mpeg4-generic": {
                            source: "iana"
                        },
                        "audio/musepack": {
                            source: "apache"
                        },
                        "audio/ogg": {
                            source: "iana",
                            compressible: !1,
                            extensions: ["oga", "ogg", "spx", "opus"]
                        },
                        "audio/opus": {
                            source: "iana"
                        },
                        "audio/parityfec": {
                            source: "iana"
                        },
                        "audio/pcma": {
                            source: "iana"
                        },
                        "audio/pcma-wb": {
                            source: "iana"
                        },
                        "audio/pcmu": {
                            source: "iana"
                        },
                        "audio/pcmu-wb": {
                            source: "iana"
                        },
                        "audio/prs.sid": {
                            source: "iana"
                        },
                        "audio/qcelp": {
                            source: "iana"
                        },
                        "audio/raptorfec": {
                            source: "iana"
                        },
                        "audio/red": {
                            source: "iana"
                        },
                        "audio/rtp-enc-aescm128": {
                            source: "iana"
                        },
                        "audio/rtp-midi": {
                            source: "iana"
                        },
                        "audio/rtploopback": {
                            source: "iana"
                        },
                        "audio/rtx": {
                            source: "iana"
                        },
                        "audio/s3m": {
                            source: "apache",
                            extensions: ["s3m"]
                        },
                        "audio/scip": {
                            source: "iana"
                        },
                        "audio/silk": {
                            source: "apache",
                            extensions: ["sil"]
                        },
                        "audio/smv": {
                            source: "iana"
                        },
                        "audio/smv-qcp": {
                            source: "iana"
                        },
                        "audio/smv0": {
                            source: "iana"
                        },
                        "audio/sofa": {
                            source: "iana"
                        },
                        "audio/sp-midi": {
                            source: "iana"
                        },
                        "audio/speex": {
                            source: "iana"
                        },
                        "audio/t140c": {
                            source: "iana"
                        },
                        "audio/t38": {
                            source: "iana"
                        },
                        "audio/telephone-event": {
                            source: "iana"
                        },
                        "audio/tetra_acelp": {
                            source: "iana"
                        },
                        "audio/tetra_acelp_bb": {
                            source: "iana"
                        },
                        "audio/tone": {
                            source: "iana"
                        },
                        "audio/tsvcis": {
                            source: "iana"
                        },
                        "audio/uemclip": {
                            source: "iana"
                        },
                        "audio/ulpfec": {
                            source: "iana"
                        },
                        "audio/usac": {
                            source: "iana"
                        },
                        "audio/vdvi": {
                            source: "iana"
                        },
                        "audio/vmr-wb": {
                            source: "iana"
                        },
                        "audio/vnd.3gpp.iufp": {
                            source: "iana"
                        },
                        "audio/vnd.4sb": {
                            source: "iana"
                        },
                        "audio/vnd.audiokoz": {
                            source: "iana"
                        },
                        "audio/vnd.celp": {
                            source: "iana"
                        },
                        "audio/vnd.cisco.nse": {
                            source: "iana"
                        },
                        "audio/vnd.cmles.radio-events": {
                            source: "iana"
                        },
                        "audio/vnd.cns.anp1": {
                            source: "iana"
                        },
                        "audio/vnd.cns.inf1": {
                            source: "iana"
                        },
                        "audio/vnd.dece.audio": {
                            source: "iana",
                            extensions: ["uva", "uvva"]
                        },
                        "audio/vnd.digital-winds": {
                            source: "iana",
                            extensions: ["eol"]
                        },
                        "audio/vnd.dlna.adts": {
                            source: "iana"
                        },
                        "audio/vnd.dolby.heaac.1": {
                            source: "iana"
                        },
                        "audio/vnd.dolby.heaac.2": {
                            source: "iana"
                        },
                        "audio/vnd.dolby.mlp": {
                            source: "iana"
                        },
                        "audio/vnd.dolby.mps": {
                            source: "iana"
                        },
                        "audio/vnd.dolby.pl2": {
                            source: "iana"
                        },
                        "audio/vnd.dolby.pl2x": {
                            source: "iana"
                        },
                        "audio/vnd.dolby.pl2z": {
                            source: "iana"
                        },
                        "audio/vnd.dolby.pulse.1": {
                            source: "iana"
                        },
                        "audio/vnd.dra": {
                            source: "iana",
                            extensions: ["dra"]
                        },
                        "audio/vnd.dts": {
                            source: "iana",
                            extensions: ["dts"]
                        },
                        "audio/vnd.dts.hd": {
                            source: "iana",
                            extensions: ["dtshd"]
                        },
                        "audio/vnd.dts.uhd": {
                            source: "iana"
                        },
                        "audio/vnd.dvb.file": {
                            source: "iana"
                        },
                        "audio/vnd.everad.plj": {
                            source: "iana"
                        },
                        "audio/vnd.hns.audio": {
                            source: "iana"
                        },
                        "audio/vnd.lucent.voice": {
                            source: "iana",
                            extensions: ["lvp"]
                        },
                        "audio/vnd.ms-playready.media.pya": {
                            source: "iana",
                            extensions: ["pya"]
                        },
                        "audio/vnd.nokia.mobile-xmf": {
                            source: "iana"
                        },
                        "audio/vnd.nortel.vbk": {
                            source: "iana"
                        },
                        "audio/vnd.nuera.ecelp4800": {
                            source: "iana",
                            extensions: ["ecelp4800"]
                        },
                        "audio/vnd.nuera.ecelp7470": {
                            source: "iana",
                            extensions: ["ecelp7470"]
                        },
                        "audio/vnd.nuera.ecelp9600": {
                            source: "iana",
                            extensions: ["ecelp9600"]
                        },
                        "audio/vnd.octel.sbc": {
                            source: "iana"
                        },
                        "audio/vnd.presonus.multitrack": {
                            source: "iana"
                        },
                        "audio/vnd.qcelp": {
                            source: "iana"
                        },
                        "audio/vnd.rhetorex.32kadpcm": {
                            source: "iana"
                        },
                        "audio/vnd.rip": {
                            source: "iana",
                            extensions: ["rip"]
                        },
                        "audio/vnd.rn-realaudio": {
                            compressible: !1
                        },
                        "audio/vnd.sealedmedia.softseal.mpeg": {
                            source: "iana"
                        },
                        "audio/vnd.vmx.cvsd": {
                            source: "iana"
                        },
                        "audio/vnd.wave": {
                            compressible: !1
                        },
                        "audio/vorbis": {
                            source: "iana",
                            compressible: !1
                        },
                        "audio/vorbis-config": {
                            source: "iana"
                        },
                        "audio/wav": {
                            compressible: !1,
                            extensions: ["wav"]
                        },
                        "audio/wave": {
                            compressible: !1,
                            extensions: ["wav"]
                        },
                        "audio/webm": {
                            source: "apache",
                            compressible: !1,
                            extensions: ["weba"]
                        },
                        "audio/x-aac": {
                            source: "apache",
                            compressible: !1,
                            extensions: ["aac"]
                        },
                        "audio/x-aiff": {
                            source: "apache",
                            extensions: ["aif", "aiff", "aifc"]
                        },
                        "audio/x-caf": {
                            source: "apache",
                            compressible: !1,
                            extensions: ["caf"]
                        },
                        "audio/x-flac": {
                            source: "apache",
                            extensions: ["flac"]
                        },
                        "audio/x-m4a": {
                            source: "nginx",
                            extensions: ["m4a"]
                        },
                        "audio/x-matroska": {
                            source: "apache",
                            extensions: ["mka"]
                        },
                        "audio/x-mpegurl": {
                            source: "apache",
                            extensions: ["m3u"]
                        },
                        "audio/x-ms-wax": {
                            source: "apache",
                            extensions: ["wax"]
                        },
                        "audio/x-ms-wma": {
                            source: "apache",
                            extensions: ["wma"]
                        },
                        "audio/x-pn-realaudio": {
                            source: "apache",
                            extensions: ["ram", "ra"]
                        },
                        "audio/x-pn-realaudio-plugin": {
                            source: "apache",
                            extensions: ["rmp"]
                        },
                        "audio/x-realaudio": {
                            source: "nginx",
                            extensions: ["ra"]
                        },
                        "audio/x-tta": {
                            source: "apache"
                        },
                        "audio/x-wav": {
                            source: "apache",
                            extensions: ["wav"]
                        },
                        "audio/xm": {
                            source: "apache",
                            extensions: ["xm"]
                        },
                        "chemical/x-cdx": {
                            source: "apache",
                            extensions: ["cdx"]
                        },
                        "chemical/x-cif": {
                            source: "apache",
                            extensions: ["cif"]
                        },
                        "chemical/x-cmdf": {
                            source: "apache",
                            extensions: ["cmdf"]
                        },
                        "chemical/x-cml": {
                            source: "apache",
                            extensions: ["cml"]
                        },
                        "chemical/x-csml": {
                            source: "apache",
                            extensions: ["csml"]
                        },
                        "chemical/x-pdb": {
                            source: "apache"
                        },
                        "chemical/x-xyz": {
                            source: "apache",
                            extensions: ["xyz"]
                        },
                        "font/collection": {
                            source: "iana",
                            extensions: ["ttc"]
                        },
                        "font/otf": {
                            source: "iana",
                            compressible: !0,
                            extensions: ["otf"]
                        },
                        "font/sfnt": {
                            source: "iana"
                        },
                        "font/ttf": {
                            source: "iana",
                            compressible: !0,
                            extensions: ["ttf"]
                        },
                        "font/woff": {
                            source: "iana",
                            extensions: ["woff"]
                        },
                        "font/woff2": {
                            source: "iana",
                            extensions: ["woff2"]
                        },
                        "image/aces": {
                            source: "iana",
                            extensions: ["exr"]
                        },
                        "image/apng": {
                            compressible: !1,
                            extensions: ["apng"]
                        },
                        "image/avci": {
                            source: "iana",
                            extensions: ["avci"]
                        },
                        "image/avcs": {
                            source: "iana",
                            extensions: ["avcs"]
                        },
                        "image/avif": {
                            source: "iana",
                            compressible: !1,
                            extensions: ["avif"]
                        },
                        "image/bmp": {
                            source: "iana",
                            compressible: !0,
                            extensions: ["bmp"]
                        },
                        "image/cgm": {
                            source: "iana",
                            extensions: ["cgm"]
                        },
                        "image/dicom-rle": {
                            source: "iana",
                            extensions: ["drle"]
                        },
                        "image/emf": {
                            source: "iana",
                            extensions: ["emf"]
                        },
                        "image/fits": {
                            source: "iana",
                            extensions: ["fits"]
                        },
                        "image/g3fax": {
                            source: "iana",
                            extensions: ["g3"]
                        },
                        "image/gif": {
                            source: "iana",
                            compressible: !1,
                            extensions: ["gif"]
                        },
                        "image/heic": {
                            source: "iana",
                            extensions: ["heic"]
                        },
                        "image/heic-sequence": {
                            source: "iana",
                            extensions: ["heics"]
                        },
                        "image/heif": {
                            source: "iana",
                            extensions: ["heif"]
                        },
                        "image/heif-sequence": {
                            source: "iana",
                            extensions: ["heifs"]
                        },
                        "image/hej2k": {
                            source: "iana",
                            extensions: ["hej2"]
                        },
                        "image/hsj2": {
                            source: "iana",
                            extensions: ["hsj2"]
                        },
                        "image/ief": {
                            source: "iana",
                            extensions: ["ief"]
                        },
                        "image/jls": {
                            source: "iana",
                            extensions: ["jls"]
                        },
                        "image/jp2": {
                            source: "iana",
                            compressible: !1,
                            extensions: ["jp2", "jpg2"]
                        },
                        "image/jpeg": {
                            source: "iana",
                            compressible: !1,
                            extensions: ["jpeg", "jpg", "jpe"]
                        },
                        "image/jph": {
                            source: "iana",
                            extensions: ["jph"]
                        },
                        "image/jphc": {
                            source: "iana",
                            extensions: ["jhc"]
                        },
                        "image/jpm": {
                            source: "iana",
                            compressible: !1,
                            extensions: ["jpm"]
                        },
                        "image/jpx": {
                            source: "iana",
                            compressible: !1,
                            extensions: ["jpx", "jpf"]
                        },
                        "image/jxr": {
                            source: "iana",
                            extensions: ["jxr"]
                        },
                        "image/jxra": {
                            source: "iana",
                            extensions: ["jxra"]
                        },
                        "image/jxrs": {
                            source: "iana",
                            extensions: ["jxrs"]
                        },
                        "image/jxs": {
                            source: "iana",
                            extensions: ["jxs"]
                        },
                        "image/jxsc": {
                            source: "iana",
                            extensions: ["jxsc"]
                        },
                        "image/jxsi": {
                            source: "iana",
                            extensions: ["jxsi"]
                        },
                        "image/jxss": {
                            source: "iana",
                            extensions: ["jxss"]
                        },
                        "image/ktx": {
                            source: "iana",
                            extensions: ["ktx"]
                        },
                        "image/ktx2": {
                            source: "iana",
                            extensions: ["ktx2"]
                        },
                        "image/naplps": {
                            source: "iana"
                        },
                        "image/pjpeg": {
                            compressible: !1
                        },
                        "image/png": {
                            source: "iana",
                            compressible: !1,
                            extensions: ["png"]
                        },
                        "image/prs.btif": {
                            source: "iana",
                            extensions: ["btif"]
                        },
                        "image/prs.pti": {
                            source: "iana",
                            extensions: ["pti"]
                        },
                        "image/pwg-raster": {
                            source: "iana"
                        },
                        "image/sgi": {
                            source: "apache",
                            extensions: ["sgi"]
                        },
                        "image/svg+xml": {
                            source: "iana",
                            compressible: !0,
                            extensions: ["svg", "svgz"]
                        },
                        "image/t38": {
                            source: "iana",
                            extensions: ["t38"]
                        },
                        "image/tiff": {
                            source: "iana",
                            compressible: !1,
                            extensions: ["tif", "tiff"]
                        },
                        "image/tiff-fx": {
                            source: "iana",
                            extensions: ["tfx"]
                        },
                        "image/vnd.adobe.photoshop": {
                            source: "iana",
                            compressible: !0,
                            extensions: ["psd"]
                        },
                        "image/vnd.airzip.accelerator.azv": {
                            source: "iana",
                            extensions: ["azv"]
                        },
                        "image/vnd.cns.inf2": {
                            source: "iana"
                        },
                        "image/vnd.dece.graphic": {
                            source: "iana",
                            extensions: ["uvi", "uvvi", "uvg", "uvvg"]
                        },
                        "image/vnd.djvu": {
                            source: "iana",
                            extensions: ["djvu", "djv"]
                        },
                        "image/vnd.dvb.subtitle": {
                            source: "iana",
                            extensions: ["sub"]
                        },
                        "image/vnd.dwg": {
                            source: "iana",
                            extensions: ["dwg"]
                        },
                        "image/vnd.dxf": {
                            source: "iana",
                            extensions: ["dxf"]
                        },
                        "image/vnd.fastbidsheet": {
                            source: "iana",
                            extensions: ["fbs"]
                        },
                        "image/vnd.fpx": {
                            source: "iana",
                            extensions: ["fpx"]
                        },
                        "image/vnd.fst": {
                            source: "iana",
                            extensions: ["fst"]
                        },
                        "image/vnd.fujixerox.edmics-mmr": {
                            source: "iana",
                            extensions: ["mmr"]
                        },
                        "image/vnd.fujixerox.edmics-rlc": {
                            source: "iana",
                            extensions: ["rlc"]
                        },
                        "image/vnd.globalgraphics.pgb": {
                            source: "iana"
                        },
                        "image/vnd.microsoft.icon": {
                            source: "iana",
                            compressible: !0,
                            extensions: ["ico"]
                        },
                        "image/vnd.mix": {
                            source: "iana"
                        },
                        "image/vnd.mozilla.apng": {
                            source: "iana"
                        },
                        "image/vnd.ms-dds": {
                            compressible: !0,
                            extensions: ["dds"]
                        },
                        "image/vnd.ms-modi": {
                            source: "iana",
                            extensions: ["mdi"]
                        },
                        "image/vnd.ms-photo": {
                            source: "apache",
                            extensions: ["wdp"]
                        },
                        "image/vnd.net-fpx": {
                            source: "iana",
                            extensions: ["npx"]
                        },
                        "image/vnd.pco.b16": {
                            source: "iana",
                            extensions: ["b16"]
                        },
                        "image/vnd.radiance": {
                            source: "iana"
                        },
                        "image/vnd.sealed.png": {
                            source: "iana"
                        },
                        "image/vnd.sealedmedia.softseal.gif": {
                            source: "iana"
                        },
                        "image/vnd.sealedmedia.softseal.jpg": {
                            source: "iana"
                        },
                        "image/vnd.svf": {
                            source: "iana"
                        },
                        "image/vnd.tencent.tap": {
                            source: "iana",
                            extensions: ["tap"]
                        },
                        "image/vnd.valve.source.texture": {
                            source: "iana",
                            extensions: ["vtf"]
                        },
                        "image/vnd.wap.wbmp": {
                            source: "iana",
                            extensions: ["wbmp"]
                        },
                        "image/vnd.xiff": {
                            source: "iana",
                            extensions: ["xif"]
                        },
                        "image/vnd.zbrush.pcx": {
                            source: "iana",
                            extensions: ["pcx"]
                        },
                        "image/webp": {
                            source: "apache",
                            extensions: ["webp"]
                        },
                        "image/wmf": {
                            source: "iana",
                            extensions: ["wmf"]
                        },
                        "image/x-3ds": {
                            source: "apache",
                            extensions: ["3ds"]
                        },
                        "image/x-cmu-raster": {
                            source: "apache",
                            extensions: ["ras"]
                        },
                        "image/x-cmx": {
                            source: "apache",
                            extensions: ["cmx"]
                        },
                        "image/x-freehand": {
                            source: "apache",
                            extensions: ["fh", "fhc", "fh4", "fh5", "fh7"]
                        },
                        "image/x-icon": {
                            source: "apache",
                            compressible: !0,
                            extensions: ["ico"]
                        },
                        "image/x-jng": {
                            source: "nginx",
                            extensions: ["jng"]
                        },
                        "image/x-mrsid-image": {
                            source: "apache",
                            extensions: ["sid"]
                        },
                        "image/x-ms-bmp": {
                            source: "nginx",
                            compressible: !0,
                            extensions: ["bmp"]
                        },
                        "image/x-pcx": {
                            source: "apache",
                            extensions: ["pcx"]
                        },
                        "image/x-pict": {
                            source: "apache",
                            extensions: ["pic", "pct"]
                        },
                        "image/x-portable-anymap": {
                            source: "apache",
                            extensions: ["pnm"]
                        },
                        "image/x-portable-bitmap": {
                            source: "apache",
                            extensions: ["pbm"]
                        },
                        "image/x-portable-graymap": {
                            source: "apache",
                            extensions: ["pgm"]
                        },
                        "image/x-portable-pixmap": {
                            source: "apache",
                            extensions: ["ppm"]
                        },
                        "image/x-rgb": {
                            source: "apache",
                            extensions: ["rgb"]
                        },
                        "image/x-tga": {
                            source: "apache",
                            extensions: ["tga"]
                        },
                        "image/x-xbitmap": {
                            source: "apache",
                            extensions: ["xbm"]
                        },
                        "image/x-xcf": {
                            compressible: !1
                        },
                        "image/x-xpixmap": {
                            source: "apache",
                            extensions: ["xpm"]
                        },
                        "image/x-xwindowdump": {
                            source: "apache",
                            extensions: ["xwd"]
                        },
                        "message/cpim": {
                            source: "iana"
                        },
                        "message/delivery-status": {
                            source: "iana"
                        },
                        "message/disposition-notification": {
                            source: "iana",
                            extensions: ["disposition-notification"]
                        },
                        "message/external-body": {
                            source: "iana"
                        },
                        "message/feedback-report": {
                            source: "iana"
                        },
                        "message/global": {
                            source: "iana",
                            extensions: ["u8msg"]
                        },
                        "message/global-delivery-status": {
                            source: "iana",
                            extensions: ["u8dsn"]
                        },
                        "message/global-disposition-notification": {
                            source: "iana",
                            extensions: ["u8mdn"]
                        },
                        "message/global-headers": {
                            source: "iana",
                            extensions: ["u8hdr"]
                        },
                        "message/http": {
                            source: "iana",
                            compressible: !1
                        },
                        "message/imdn+xml": {
                            source: "iana",
                            compressible: !0
                        },
                        "message/news": {
                            source: "iana"
                        },
                        "message/partial": {
                            source: "iana",
                            compressible: !1
                        },
                        "message/rfc822": {
                            source: "iana",
                            compressible: !0,
                            extensions: ["eml", "mime"]
                        },
                        "message/s-http": {
                            source: "iana"
                        },
                        "message/sip": {
                            source: "iana"
                        },
                        "message/sipfrag": {
                            source: "iana"
                        },
                        "message/tracking-status": {
                            source: "iana"
                        },
                        "message/vnd.si.simp": {
                            source: "iana"
                        },
                        "message/vnd.wfa.wsc": {
                            source: "iana",
                            extensions: ["wsc"]
                        },
                        "model/3mf": {
                            source: "iana",
                            extensions: ["3mf"]
                        },
                        "model/e57": {
                            source: "iana"
                        },
                        "model/gltf+json": {
                            source: "iana",
                            compressible: !0,
                            extensions: ["gltf"]
                        },
                        "model/gltf-binary": {
                            source: "iana",
                            compressible: !0,
                            extensions: ["glb"]
                        },
                        "model/iges": {
                            source: "iana",
                            compressible: !1,
                            extensions: ["igs", "iges"]
                        },
                        "model/mesh": {
                            source: "iana",
                            compressible: !1,
                            extensions: ["msh", "mesh", "silo"]
                        },
                        "model/mtl": {
                            source: "iana",
                            extensions: ["mtl"]
                        },
                        "model/obj": {
                            source: "iana",
                            extensions: ["obj"]
                        },
                        "model/step": {
                            source: "iana"
                        },
                        "model/step+xml": {
                            source: "iana",
                            compressible: !0,
                            extensions: ["stpx"]
                        },
                        "model/step+zip": {
                            source: "iana",
                            compressible: !1,
                            extensions: ["stpz"]
                        },
                        "model/step-xml+zip": {
                            source: "iana",
                            compressible: !1,
                            extensions: ["stpxz"]
                        },
                        "model/stl": {
                            source: "iana",
                            extensions: ["stl"]
                        },
                        "model/vnd.collada+xml": {
                            source: "iana",
                            compressible: !0,
                            extensions: ["dae"]
                        },
                        "model/vnd.dwf": {
                            source: "iana",
                            extensions: ["dwf"]
                        },
                        "model/vnd.flatland.3dml": {
                            source: "iana"
                        },
                        "model/vnd.gdl": {
                            source: "iana",
                            extensions: ["gdl"]
                        },
                        "model/vnd.gs-gdl": {
                            source: "apache"
                        },
                        "model/vnd.gs.gdl": {
                            source: "iana"
                        },
                        "model/vnd.gtw": {
                            source: "iana",
                            extensions: ["gtw"]
                        },
                        "model/vnd.moml+xml": {
                            source: "iana",
                            compressible: !0
                        },
                        "model/vnd.mts": {
                            source: "iana",
                            extensions: ["mts"]
                        },
                        "model/vnd.opengex": {
                            source: "iana",
                            extensions: ["ogex"]
                        },
                        "model/vnd.parasolid.transmit.binary": {
                            source: "iana",
                            extensions: ["x_b"]
                        },
                        "model/vnd.parasolid.transmit.text": {
                            source: "iana",
                            extensions: ["x_t"]
                        },
                        "model/vnd.pytha.pyox": {
                            source: "iana"
                        },
                        "model/vnd.rosette.annotated-data-model": {
                            source: "iana"
                        },
                        "model/vnd.sap.vds": {
                            source: "iana",
                            extensions: ["vds"]
                        },
                        "model/vnd.usdz+zip": {
                            source: "iana",
                            compressible: !1,
                            extensions: ["usdz"]
                        },
                        "model/vnd.valve.source.compiled-map": {
                            source: "iana",
                            extensions: ["bsp"]
                        },
                        "model/vnd.vtu": {
                            source: "iana",
                            extensions: ["vtu"]
                        },
                        "model/vrml": {
                            source: "iana",
                            compressible: !1,
                            extensions: ["wrl", "vrml"]
                        },
                        "model/x3d+binary": {
                            source: "apache",
                            compressible: !1,
                            extensions: ["x3db", "x3dbz"]
                        },
                        "model/x3d+fastinfoset": {
                            source: "iana",
                            extensions: ["x3db"]
                        },
                        "model/x3d+vrml": {
                            source: "apache",
                            compressible: !1,
                            extensions: ["x3dv", "x3dvz"]
                        },
                        "model/x3d+xml": {
                            source: "iana",
                            compressible: !0,
                            extensions: ["x3d", "x3dz"]
                        },
                        "model/x3d-vrml": {
                            source: "iana",
                            extensions: ["x3dv"]
                        },
                        "multipart/alternative": {
                            source: "iana",
                            compressible: !1
                        },
                        "multipart/appledouble": {
                            source: "iana"
                        },
                        "multipart/byteranges": {
                            source: "iana"
                        },
                        "multipart/digest": {
                            source: "iana"
                        },
                        "multipart/encrypted": {
                            source: "iana",
                            compressible: !1
                        },
                        "multipart/form-data": {
                            source: "iana",
                            compressible: !1
                        },
                        "multipart/header-set": {
                            source: "iana"
                        },
                        "multipart/mixed": {
                            source: "iana"
                        },
                        "multipart/multilingual": {
                            source: "iana"
                        },
                        "multipart/parallel": {
                            source: "iana"
                        },
                        "multipart/related": {
                            source: "iana",
                            compressible: !1
                        },
                        "multipart/report": {
                            source: "iana"
                        },
                        "multipart/signed": {
                            source: "iana",
                            compressible: !1
                        },
                        "multipart/vnd.bint.med-plus": {
                            source: "iana"
                        },
                        "multipart/voice-message": {
                            source: "iana"
                        },
                        "multipart/x-mixed-replace": {
                            source: "iana"
                        },
                        "text/1d-interleaved-parityfec": {
                            source: "iana"
                        },
                        "text/cache-manifest": {
                            source: "iana",
                            compressible: !0,
                            extensions: ["appcache", "manifest"]
                        },
                        "text/calendar": {
                            source: "iana",
                            extensions: ["ics", "ifb"]
                        },
                        "text/calender": {
                            compressible: !0
                        },
                        "text/cmd": {
                            compressible: !0
                        },
                        "text/coffeescript": {
                            extensions: ["coffee", "litcoffee"]
                        },
                        "text/cql": {
                            source: "iana"
                        },
                        "text/cql-expression": {
                            source: "iana"
                        },
                        "text/cql-identifier": {
                            source: "iana"
                        },
                        "text/css": {
                            source: "iana",
                            charset: "UTF-8",
                            compressible: !0,
                            extensions: ["css"]
                        },
                        "text/csv": {
                            source: "iana",
                            compressible: !0,
                            extensions: ["csv"]
                        },
                        "text/csv-schema": {
                            source: "iana"
                        },
                        "text/directory": {
                            source: "iana"
                        },
                        "text/dns": {
                            source: "iana"
                        },
                        "text/ecmascript": {
                            source: "iana"
                        },
                        "text/encaprtp": {
                            source: "iana"
                        },
                        "text/enriched": {
                            source: "iana"
                        },
                        "text/fhirpath": {
                            source: "iana"
                        },
                        "text/flexfec": {
                            source: "iana"
                        },
                        "text/fwdred": {
                            source: "iana"
                        },
                        "text/gff3": {
                            source: "iana"
                        },
                        "text/grammar-ref-list": {
                            source: "iana"
                        },
                        "text/html": {
                            source: "iana",
                            compressible: !0,
                            extensions: ["html", "htm", "shtml"]
                        },
                        "text/jade": {
                            extensions: ["jade"]
                        },
                        "text/javascript": {
                            source: "iana",
                            compressible: !0
                        },
                        "text/jcr-cnd": {
                            source: "iana"
                        },
                        "text/jsx": {
                            compressible: !0,
                            extensions: ["jsx"]
                        },
                        "text/less": {
                            compressible: !0,
                            extensions: ["less"]
                        },
                        "text/markdown": {
                            source: "iana",
                            compressible: !0,
                            extensions: ["markdown", "md"]
                        },
                        "text/mathml": {
                            source: "nginx",
                            extensions: ["mml"]
                        },
                        "text/mdx": {
                            compressible: !0,
                            extensions: ["mdx"]
                        },
                        "text/mizar": {
                            source: "iana"
                        },
                        "text/n3": {
                            source: "iana",
                            charset: "UTF-8",
                            compressible: !0,
                            extensions: ["n3"]
                        },
                        "text/parameters": {
                            source: "iana",
                            charset: "UTF-8"
                        },
                        "text/parityfec": {
                            source: "iana"
                        },
                        "text/plain": {
                            source: "iana",
                            compressible: !0,
                            extensions: ["txt", "text", "conf", "def", "list", "log", "in", "ini"]
                        },
                        "text/provenance-notation": {
                            source: "iana",
                            charset: "UTF-8"
                        },
                        "text/prs.fallenstein.rst": {
                            source: "iana"
                        },
                        "text/prs.lines.tag": {
                            source: "iana",
                            extensions: ["dsc"]
                        },
                        "text/prs.prop.logic": {
                            source: "iana"
                        },
                        "text/raptorfec": {
                            source: "iana"
                        },
                        "text/red": {
                            source: "iana"
                        },
                        "text/rfc822-headers": {
                            source: "iana"
                        },
                        "text/richtext": {
                            source: "iana",
                            compressible: !0,
                            extensions: ["rtx"]
                        },
                        "text/rtf": {
                            source: "iana",
                            compressible: !0,
                            extensions: ["rtf"]
                        },
                        "text/rtp-enc-aescm128": {
                            source: "iana"
                        },
                        "text/rtploopback": {
                            source: "iana"
                        },
                        "text/rtx": {
                            source: "iana"
                        },
                        "text/sgml": {
                            source: "iana",
                            extensions: ["sgml", "sgm"]
                        },
                        "text/shaclc": {
                            source: "iana"
                        },
                        "text/shex": {
                            source: "iana",
                            extensions: ["shex"]
                        },
                        "text/slim": {
                            extensions: ["slim", "slm"]
                        },
                        "text/spdx": {
                            source: "iana",
                            extensions: ["spdx"]
                        },
                        "text/strings": {
                            source: "iana"
                        },
                        "text/stylus": {
                            extensions: ["stylus", "styl"]
                        },
                        "text/t140": {
                            source: "iana"
                        },
                        "text/tab-separated-values": {
                            source: "iana",
                            compressible: !0,
                            extensions: ["tsv"]
                        },
                        "text/troff": {
                            source: "iana",
                            extensions: ["t", "tr", "roff", "man", "me", "ms"]
                        },
                        "text/turtle": {
                            source: "iana",
                            charset: "UTF-8",
                            extensions: ["ttl"]
                        },
                        "text/ulpfec": {
                            source: "iana"
                        },
                        "text/uri-list": {
                            source: "iana",
                            compressible: !0,
                            extensions: ["uri", "uris", "urls"]
                        },
                        "text/vcard": {
                            source: "iana",
                            compressible: !0,
                            extensions: ["vcard"]
                        },
                        "text/vnd.a": {
                            source: "iana"
                        },
                        "text/vnd.abc": {
                            source: "iana"
                        },
                        "text/vnd.ascii-art": {
                            source: "iana"
                        },
                        "text/vnd.curl": {
                            source: "iana",
                            extensions: ["curl"]
                        },
                        "text/vnd.curl.dcurl": {
                            source: "apache",
                            extensions: ["dcurl"]
                        },
                        "text/vnd.curl.mcurl": {
                            source: "apache",
                            extensions: ["mcurl"]
                        },
                        "text/vnd.curl.scurl": {
                            source: "apache",
                            extensions: ["scurl"]
                        },
                        "text/vnd.debian.copyright": {
                            source: "iana",
                            charset: "UTF-8"
                        },
                        "text/vnd.dmclientscript": {
                            source: "iana"
                        },
                        "text/vnd.dvb.subtitle": {
                            source: "iana",
                            extensions: ["sub"]
                        },
                        "text/vnd.esmertec.theme-descriptor": {
                            source: "iana",
                            charset: "UTF-8"
                        },
                        "text/vnd.familysearch.gedcom": {
                            source: "iana",
                            extensions: ["ged"]
                        },
                        "text/vnd.ficlab.flt": {
                            source: "iana"
                        },
                        "text/vnd.fly": {
                            source: "iana",
                            extensions: ["fly"]
                        },
                        "text/vnd.fmi.flexstor": {
                            source: "iana",
                            extensions: ["flx"]
                        },
                        "text/vnd.gml": {
                            source: "iana"
                        },
                        "text/vnd.graphviz": {
                            source: "iana",
                            extensions: ["gv"]
                        },
                        "text/vnd.hans": {
                            source: "iana"
                        },
                        "text/vnd.hgl": {
                            source: "iana"
                        },
                        "text/vnd.in3d.3dml": {
                            source: "iana",
                            extensions: ["3dml"]
                        },
                        "text/vnd.in3d.spot": {
                            source: "iana",
                            extensions: ["spot"]
                        },
                        "text/vnd.iptc.newsml": {
                            source: "iana"
                        },
                        "text/vnd.iptc.nitf": {
                            source: "iana"
                        },
                        "text/vnd.latex-z": {
                            source: "iana"
                        },
                        "text/vnd.motorola.reflex": {
                            source: "iana"
                        },
                        "text/vnd.ms-mediapackage": {
                            source: "iana"
                        },
                        "text/vnd.net2phone.commcenter.command": {
                            source: "iana"
                        },
                        "text/vnd.radisys.msml-basic-layout": {
                            source: "iana"
                        },
                        "text/vnd.senx.warpscript": {
                            source: "iana"
                        },
                        "text/vnd.si.uricatalogue": {
                            source: "iana"
                        },
                        "text/vnd.sosi": {
                            source: "iana"
                        },
                        "text/vnd.sun.j2me.app-descriptor": {
                            source: "iana",
                            charset: "UTF-8",
                            extensions: ["jad"]
                        },
                        "text/vnd.trolltech.linguist": {
                            source: "iana",
                            charset: "UTF-8"
                        },
                        "text/vnd.wap.si": {
                            source: "iana"
                        },
                        "text/vnd.wap.sl": {
                            source: "iana"
                        },
                        "text/vnd.wap.wml": {
                            source: "iana",
                            extensions: ["wml"]
                        },
                        "text/vnd.wap.wmlscript": {
                            source: "iana",
                            extensions: ["wmls"]
                        },
                        "text/vtt": {
                            source: "iana",
                            charset: "UTF-8",
                            compressible: !0,
                            extensions: ["vtt"]
                        },
                        "text/x-asm": {
                            source: "apache",
                            extensions: ["s", "asm"]
                        },
                        "text/x-c": {
                            source: "apache",
                            extensions: ["c", "cc", "cxx", "cpp", "h", "hh", "dic"]
                        },
                        "text/x-component": {
                            source: "nginx",
                            extensions: ["htc"]
                        },
                        "text/x-fortran": {
                            source: "apache",
                            extensions: ["f", "for", "f77", "f90"]
                        },
                        "text/x-gwt-rpc": {
                            compressible: !0
                        },
                        "text/x-handlebars-template": {
                            extensions: ["hbs"]
                        },
                        "text/x-java-source": {
                            source: "apache",
                            extensions: ["java"]
                        },
                        "text/x-jquery-tmpl": {
                            compressible: !0
                        },
                        "text/x-lua": {
                            extensions: ["lua"]
                        },
                        "text/x-markdown": {
                            compressible: !0,
                            extensions: ["mkd"]
                        },
                        "text/x-nfo": {
                            source: "apache",
                            extensions: ["nfo"]
                        },
                        "text/x-opml": {
                            source: "apache",
                            extensions: ["opml"]
                        },
                        "text/x-org": {
                            compressible: !0,
                            extensions: ["org"]
                        },
                        "text/x-pascal": {
                            source: "apache",
                            extensions: ["p", "pas"]
                        },
                        "text/x-processing": {
                            compressible: !0,
                            extensions: ["pde"]
                        },
                        "text/x-sass": {
                            extensions: ["sass"]
                        },
                        "text/x-scss": {
                            extensions: ["scss"]
                        },
                        "text/x-setext": {
                            source: "apache",
                            extensions: ["etx"]
                        },
                        "text/x-sfv": {
                            source: "apache",
                            extensions: ["sfv"]
                        },
                        "text/x-suse-ymp": {
                            compressible: !0,
                            extensions: ["ymp"]
                        },
                        "text/x-uuencode": {
                            source: "apache",
                            extensions: ["uu"]
                        },
                        "text/x-vcalendar": {
                            source: "apache",
                            extensions: ["vcs"]
                        },
                        "text/x-vcard": {
                            source: "apache",
                            extensions: ["vcf"]
                        },
                        "text/xml": {
                            source: "iana",
                            compressible: !0,
                            extensions: ["xml"]
                        },
                        "text/xml-external-parsed-entity": {
                            source: "iana"
                        },
                        "text/yaml": {
                            compressible: !0,
                            extensions: ["yaml", "yml"]
                        },
                        "video/1d-interleaved-parityfec": {
                            source: "iana"
                        },
                        "video/3gpp": {
                            source: "iana",
                            extensions: ["3gp", "3gpp"]
                        },
                        "video/3gpp-tt": {
                            source: "iana"
                        },
                        "video/3gpp2": {
                            source: "iana",
                            extensions: ["3g2"]
                        },
                        "video/av1": {
                            source: "iana"
                        },
                        "video/bmpeg": {
                            source: "iana"
                        },
                        "video/bt656": {
                            source: "iana"
                        },
                        "video/celb": {
                            source: "iana"
                        },
                        "video/dv": {
                            source: "iana"
                        },
                        "video/encaprtp": {
                            source: "iana"
                        },
                        "video/ffv1": {
                            source: "iana"
                        },
                        "video/flexfec": {
                            source: "iana"
                        },
                        "video/h261": {
                            source: "iana",
                            extensions: ["h261"]
                        },
                        "video/h263": {
                            source: "iana",
                            extensions: ["h263"]
                        },
                        "video/h263-1998": {
                            source: "iana"
                        },
                        "video/h263-2000": {
                            source: "iana"
                        },
                        "video/h264": {
                            source: "iana",
                            extensions: ["h264"]
                        },
                        "video/h264-rcdo": {
                            source: "iana"
                        },
                        "video/h264-svc": {
                            source: "iana"
                        },
                        "video/h265": {
                            source: "iana"
                        },
                        "video/iso.segment": {
                            source: "iana",
                            extensions: ["m4s"]
                        },
                        "video/jpeg": {
                            source: "iana",
                            extensions: ["jpgv"]
                        },
                        "video/jpeg2000": {
                            source: "iana"
                        },
                        "video/jpm": {
                            source: "apache",
                            extensions: ["jpm", "jpgm"]
                        },
                        "video/jxsv": {
                            source: "iana"
                        },
                        "video/mj2": {
                            source: "iana",
                            extensions: ["mj2", "mjp2"]
                        },
                        "video/mp1s": {
                            source: "iana"
                        },
                        "video/mp2p": {
                            source: "iana"
                        },
                        "video/mp2t": {
                            source: "iana",
                            extensions: ["ts"]
                        },
                        "video/mp4": {
                            source: "iana",
                            compressible: !1,
                            extensions: ["mp4", "mp4v", "mpg4"]
                        },
                        "video/mp4v-es": {
                            source: "iana"
                        },
                        "video/mpeg": {
                            source: "iana",
                            compressible: !1,
                            extensions: ["mpeg", "mpg", "mpe", "m1v", "m2v"]
                        },
                        "video/mpeg4-generic": {
                            source: "iana"
                        },
                        "video/mpv": {
                            source: "iana"
                        },
                        "video/nv": {
                            source: "iana"
                        },
                        "video/ogg": {
                            source: "iana",
                            compressible: !1,
                            extensions: ["ogv"]
                        },
                        "video/parityfec": {
                            source: "iana"
                        },
                        "video/pointer": {
                            source: "iana"
                        },
                        "video/quicktime": {
                            source: "iana",
                            compressible: !1,
                            extensions: ["qt", "mov"]
                        },
                        "video/raptorfec": {
                            source: "iana"
                        },
                        "video/raw": {
                            source: "iana"
                        },
                        "video/rtp-enc-aescm128": {
                            source: "iana"
                        },
                        "video/rtploopback": {
                            source: "iana"
                        },
                        "video/rtx": {
                            source: "iana"
                        },
                        "video/scip": {
                            source: "iana"
                        },
                        "video/smpte291": {
                            source: "iana"
                        },
                        "video/smpte292m": {
                            source: "iana"
                        },
                        "video/ulpfec": {
                            source: "iana"
                        },
                        "video/vc1": {
                            source: "iana"
                        },
                        "video/vc2": {
                            source: "iana"
                        },
                        "video/vnd.cctv": {
                            source: "iana"
                        },
                        "video/vnd.dece.hd": {
                            source: "iana",
                            extensions: ["uvh", "uvvh"]
                        },
                        "video/vnd.dece.mobile": {
                            source: "iana",
                            extensions: ["uvm", "uvvm"]
                        },
                        "video/vnd.dece.mp4": {
                            source: "iana"
                        },
                        "video/vnd.dece.pd": {
                            source: "iana",
                            extensions: ["uvp", "uvvp"]
                        },
                        "video/vnd.dece.sd": {
                            source: "iana",
                            extensions: ["uvs", "uvvs"]
                        },
                        "video/vnd.dece.video": {
                            source: "iana",
                            extensions: ["uvv", "uvvv"]
                        },
                        "video/vnd.directv.mpeg": {
                            source: "iana"
                        },
                        "video/vnd.directv.mpeg-tts": {
                            source: "iana"
                        },
                        "video/vnd.dlna.mpeg-tts": {
                            source: "iana"
                        },
                        "video/vnd.dvb.file": {
                            source: "iana",
                            extensions: ["dvb"]
                        },
                        "video/vnd.fvt": {
                            source: "iana",
                            extensions: ["fvt"]
                        },
                        "video/vnd.hns.video": {
                            source: "iana"
                        },
                        "video/vnd.iptvforum.1dparityfec-1010": {
                            source: "iana"
                        },
                        "video/vnd.iptvforum.1dparityfec-2005": {
                            source: "iana"
                        },
                        "video/vnd.iptvforum.2dparityfec-1010": {
                            source: "iana"
                        },
                        "video/vnd.iptvforum.2dparityfec-2005": {
                            source: "iana"
                        },
                        "video/vnd.iptvforum.ttsavc": {
                            source: "iana"
                        },
                        "video/vnd.iptvforum.ttsmpeg2": {
                            source: "iana"
                        },
                        "video/vnd.motorola.video": {
                            source: "iana"
                        },
                        "video/vnd.motorola.videop": {
                            source: "iana"
                        },
                        "video/vnd.mpegurl": {
                            source: "iana",
                            extensions: ["mxu", "m4u"]
                        },
                        "video/vnd.ms-playready.media.pyv": {
                            source: "iana",
                            extensions: ["pyv"]
                        },
                        "video/vnd.nokia.interleaved-multimedia": {
                            source: "iana"
                        },
                        "video/vnd.nokia.mp4vr": {
                            source: "iana"
                        },
                        "video/vnd.nokia.videovoip": {
                            source: "iana"
                        },
                        "video/vnd.objectvideo": {
                            source: "iana"
                        },
                        "video/vnd.radgamettools.bink": {
                            source: "iana"
                        },
                        "video/vnd.radgamettools.smacker": {
                            source: "iana"
                        },
                        "video/vnd.sealed.mpeg1": {
                            source: "iana"
                        },
                        "video/vnd.sealed.mpeg4": {
                            source: "iana"
                        },
                        "video/vnd.sealed.swf": {
                            source: "iana"
                        },
                        "video/vnd.sealedmedia.softseal.mov": {
                            source: "iana"
                        },
                        "video/vnd.uvvu.mp4": {
                            source: "iana",
                            extensions: ["uvu", "uvvu"]
                        },
                        "video/vnd.vivo": {
                            source: "iana",
                            extensions: ["viv"]
                        },
                        "video/vnd.youtube.yt": {
                            source: "iana"
                        },
                        "video/vp8": {
                            source: "iana"
                        },
                        "video/vp9": {
                            source: "iana"
                        },
                        "video/webm": {
                            source: "apache",
                            compressible: !1,
                            extensions: ["webm"]
                        },
                        "video/x-f4v": {
                            source: "apache",
                            extensions: ["f4v"]
                        },
                        "video/x-fli": {
                            source: "apache",
                            extensions: ["fli"]
                        },
                        "video/x-flv": {
                            source: "apache",
                            compressible: !1,
                            extensions: ["flv"]
                        },
                        "video/x-m4v": {
                            source: "apache",
                            extensions: ["m4v"]
                        },
                        "video/x-matroska": {
                            source: "apache",
                            compressible: !1,
                            extensions: ["mkv", "mk3d", "mks"]
                        },
                        "video/x-mng": {
                            source: "apache",
                            extensions: ["mng"]
                        },
                        "video/x-ms-asf": {
                            source: "apache",
                            extensions: ["asf", "asx"]
                        },
                        "video/x-ms-vob": {
                            source: "apache",
                            extensions: ["vob"]
                        },
                        "video/x-ms-wm": {
                            source: "apache",
                            extensions: ["wm"]
                        },
                        "video/x-ms-wmv": {
                            source: "apache",
                            compressible: !1,
                            extensions: ["wmv"]
                        },
                        "video/x-ms-wmx": {
                            source: "apache",
                            extensions: ["wmx"]
                        },
                        "video/x-ms-wvx": {
                            source: "apache",
                            extensions: ["wvx"]
                        },
                        "video/x-msvideo": {
                            source: "apache",
                            extensions: ["avi"]
                        },
                        "video/x-sgi-movie": {
                            source: "apache",
                            extensions: ["movie"]
                        },
                        "video/x-smv": {
                            source: "apache",
                            extensions: ["smv"]
                        },
                        "x-conference/x-cooltalk": {
                            source: "apache",
                            extensions: ["ice"]
                        },
                        "x-shader/x-fragment": {
                            compressible: !0
                        },
                        "x-shader/x-vertex": {
                            compressible: !0
                        }
                    }
                }
            }), u = c({
                "node_modules/.pnpm/mime-db@1.52.0/node_modules/mime-db/index.js"(e, a) {
                    a.exports = l()
                }
            }), d = {};
            ((e,a)=>{
                for (var n in a)
                    i(e, n, {
                        get: a[n],
                        enumerable: !0
                    })
            }
            )(d, {
                PreviewController: ()=>k,
                getExtension: ()=>w,
                joinFilepath: ()=>y,
                normalizeFilepath: ()=>g
            }),
            e.exports = (a = d,
            p(i({}, "__esModule", {
                value: !0
            }), a));
            var m = "$CSB_RELAY"
              , x = ((e,a,o)=>(o = null != e ? n(t(e)) : {},
            p(e && e.__esModule ? o : i(o, "default", {
                value: e,
                enumerable: !0
            }), e)))(u())
              , v = new Map
              , f = Object.entries(x.default);
            for (const [e,a] of f) {
                const n = a.extensions;
                if (n?.length)
                    for (const a of n)
                        v.set(a, e)
            }
            var h = v
              , b = 0;
            function g(e) {
                return "/" + e.split("/").filter(Boolean).join("/")
            }
            function y(e, a) {
                return g(e + "/" + a)
            }
            function w(e) {
                const a = e.split(".");
                return a.length <= 1 ? "" : a[a.length - 1]
            }
            var k = class {
                constructor(e) {
                    this.initPromise = null,
                    this.baseUrl = new URL(e.baseUrl),
                    this.getFileContent = e.getFileContent,
                    this.indexFiles = e.indexFiles ?? ["index.html", "index.html"]
                }
                async getIndexAtPath(e) {
                    for (const a of this.indexFiles)
                        try {
                            return await this.getFileContent(y(e, a))
                        } catch (e) {}
                    throw new Error("No index file not found")
                }
                async handleWorkerRequest(e) {
                    if (!this.initPromise)
                        throw new Error("Init promise is null");
                    const [a,n] = await this.initPromise;
                    try {
                        const i = g(new URL(e.url,a).pathname);
                        let o = null;
                        const s = {};
                        try {
                            o = await this.getFileContent(i)
                        } catch (e) {}
                        if (null == o && (o = await this.getIndexAtPath(i),
                        s["Content-Type"] = "text/html; charset=utf-8"),
                        null == o)
                            throw new Error("File not found");
                        if (!s["Content-Type"]) {
                            const e = w(i)
                              , a = h.get(e);
                            a && (s["Content-Type"] = a)
                        }
                        const t = {
                            $channel: m,
                            $type: "preview/response",
                            id: e.id,
                            headers: s,
                            status: 200,
                            body: o
                        };
                        n.postMessage(t)
                    } catch (a) {
                        const i = {
                            $channel: m,
                            $type: "preview/response",
                            id: e.id,
                            headers: {
                                "Content-Type": "text/html; charset=utf-8"
                            },
                            status: 404,
                            body: "File not found"
                        };
                        n.postMessage(i)
                    }
                }
                getRelayUrl(e) {
                    const a = new URL(e);
                    return a.pathname = "/__csb_relay/",
                    a.toString()
                }
                async _initPreview() {
                    const e = (+`${Date.now()}${Math.round(1e4 * Math.random())}${b += 1}`).toString(16)
                      , a = new URL(this.baseUrl);
                    a.hostname = e + "-" + a.hostname,
                    a.pathname = "/";
                    const n = this.getRelayUrl(a.toString())
                      , i = document.createElement("iframe");
                    i.setAttribute("src", n.toString()),
                    i.style.display = "none",
                    document.body.appendChild(i);
                    const o = new MessageChannel
                      , s = i.contentWindow;
                    if (!s)
                        throw new Error("Could not get iframe contentWindow");
                    return new Promise((e=>{
                        const n = o.port1;
                        n.onmessage = o=>{
                            if ("object" == typeof o.data && o.data.$channel === m)
                                switch (o.data.$type) {
                                case "preview/ready":
                                    e([a.toString(), n, i]);
                                    break;
                                case "preview/request":
                                    this.handleWorkerRequest(o.data)
                                }
                        }
                        ,
                        i.onload = ()=>{
                            const e = {
                                $channel: m,
                                $type: "preview/init"
                            };
                            s.postMessage(e, "*", [o.port2])
                        }
                    }
                    ))
                }
                initPreview() {
                    return this.initPromise || (this.initPromise = this._initPreview()),
                    this.initPromise.then((e=>e[0]))
                }
                destroy() {
                    this.initPromise && (this.initPromise.then((e=>{
                        e[1].close();
                        const a = this.getRelayUrl(e[0]);
                        document.body.querySelectorAll(`src="${a}"`).forEach((e=>e.remove()))
                    }
                    )),
                    this.initPromise = null)
                }
            }
        }
        ,
        191: (e,a,n)=>{
            "use strict";
            Object.defineProperty(a, "__esModule", {
                value: !0
            }),
            a.SNBComponentSandboxEngine = a.SNBSandboxMessageStatus = void 0;
            const i = n(515)
              , o = n(687)
              , s = n(969)
              , t = n(633)
              , r = n(339);
            var c;
            !function(e) {
                e.unknown = "unknown",
                e.initializing = "initializing",
                e.installingDependencies = "installingDependencies",
                e.transpiling = "transpiling",
                e.evaluating = "evaluating",
                e.done = "done",
                e.error = "error"
            }(c = a.SNBSandboxMessageStatus || (a.SNBSandboxMessageStatus = {})),
            a.SNBComponentSandboxEngine = class {
                constructor() {
                    this.updateSandboxCodeDebounced = this.debounce(((e,a)=>this.updateSandboxCodeInternal(e, a))),
                    this.trackedSandboxes = new Map,
                    this.trackedConfigurations = new Map,
                    this.trackedInitialStates = new Map
                }
                setObserver(e) {
                    this.listener = e
                }
                async getSessionAuthorizationToken(e) {
                    try {
                        let a = await fetch(e, {
                            method: "GET",
                            cache: "no-cache",
                            headers: {
                                "Content-Type": "application/json"
                            }
                        })
                          , n = await a.json();
                        const i = null == n ? void 0 : n.accessToken;
                        return "string" == typeof i ? i : null
                    } catch (e) {
                        return null
                    }
                }
                async buildSandboxesSessionAuthorized(e, a) {
                    let n = await this.getSessionAuthorizationToken(a);
                    this.buildSandboxesTokenAuthorized(e, n)
                }
                async buildSandboxesTokenAuthorized(e, a) {
                    const n = e.map((e=>this.buildSandboxWithPageTarget(e, a)));
                    await Promise.all(n)
                }
                async buildSandboxesAnonymous(e) {
                    const a = e.map((e=>this.buildSandboxWithPageTarget(e, null)));
                    await Promise.all(a)
                }
                getSandboxTargetsStartingWith(e) {
                    const a = `[id^="${e}"]`;
                    var n = document.querySelectorAll(a);
                    return Array.from(n).map((e=>e.id))
                }
                getSandboxTargetsEndingWith(e) {
                    const a = `[id$="${e}]`;
                    var n = document.querySelectorAll(a);
                    return Array.from(n).map((e=>e.id))
                }
                async buildSandboxWithPageTarget(e, a) {
                    try {
                        if (this.trackedSandboxes.get(e))
                            throw new Error(`Sandbox for id ${e} was already created. You can only create one tracked sandbox per target`);
                        let n = document.querySelector(`#${e}`);
                        if (!n)
                            throw new Error(`Can't build sandbox with target ${e} as there is no such target in the current context`);
                        if ("div" !== n.nodeName.toLowerCase() && "iframe" !== n.nodeName.toLowerCase())
                            throw new Error("Sandbox can only be created on element types of div or iframe (div is preferred)");
                        let o = this.validateConstructDataFromElement(n)
                          , s = [];
                        o.decodedConfiguration.registry && (s = [{
                            enabledScopes: o.decodedConfiguration.registry.enabledScopes,
                            limitToScopes: !0,
                            registryUrl: o.decodedConfiguration.registry.proxyUrl,
                            proxyEnabled: !1,
                            registryAuthToken: null != a ? a : void 0
                        }]);
                        let t = {
                            showErrorScreen: !0,
                            showLoadingScreen: !1,
                            showOpenInCodeSandbox: !1,
                            customNpmRegistries: s
                        };
                        console.log(t);
                        let r = await i.loadSandpackClient(`#${e}`, o.payload, t);
                        this.trackedSandboxes.set(e, r),
                        this.trackedConfigurations.set(e, o.decodedConfiguration),
                        this.trackedInitialStates.set(e, o.decodedConfiguration.code),
                        this.listener && r.listen((a=>{
                            let n, i = c.unknown;
                            switch (a.type) {
                            case "start":
                                i = c.initializing;
                                break;
                            case "status":
                                switch (a.status) {
                                case "evaluating":
                                    i = c.evaluating;
                                    break;
                                case "installing-dependencies":
                                    i = c.installingDependencies;
                                    break;
                                case "transpiling":
                                    i = c.transpiling
                                }
                                break;
                            case "success":
                                i = c.done;
                                break;
                            case "action":
                                "show-error" === a.action && (i = c.error,
                                n = a.message)
                            }
                            i !== c.unknown && this.listener({
                                details: a,
                                status: i,
                                sandboxId: e,
                                error: n
                            })
                        }
                        ))
                    } catch (a) {
                        this.listener && this.listener({
                            error: a.message,
                            status: c.error,
                            sandboxId: e
                        })
                    }
                }
                updateSandbox(e, a) {
                    if (!this.trackedSandboxes.get(e))
                        throw new Error(`Sandbox ${e} can't be updated because it wasn't created yet`);
                    let n = this.trackedSandboxes.get(e)
                      , i = this.validateConstructDataFromEncodedData(a);
                    n.updateSandbox(i.payload),
                    this.trackedConfigurations.set(e, i.decodedConfiguration)
                }
                getSandboxCode(e) {
                    if (!this.trackedSandboxes.get(e) || !this.trackedConfigurations.get(e))
                        throw new Error(`Sandbox ${e} can't be updated because it wasn't created yet`);
                    return this.trackedConfigurations.get(e).code
                }
                updateSandboxCode(e, a) {
                    this.updateSandboxCodeDebounced(e, a)
                }
                updateSandboxCodeInternal(e, a) {
                    if (!this.trackedSandboxes.get(e) || !this.trackedConfigurations.get(e))
                        throw new Error(`Sandbox ${e} can't be updated because it wasn't created yet`);
                    let n = this.trackedSandboxes.get(e)
                      , i = this.trackedConfigurations.get(e);
                    i.code = a;
                    let o = this.createBundledData(i);
                    n.updateSandbox(o),
                    this.trackedConfigurations.set(e, i)
                }
                debounce(e, a=300) {
                    let n;
                    return (...i)=>{
                        clearTimeout(n),
                        n = setTimeout((()=>{
                            e.apply(this, i)
                        }
                        ), a)
                    }
                }
                async openInSandbox(e) {
                    if (!this.trackedSandboxes.get(e) || !this.trackedConfigurations.get(e))
                        throw new Error(`Sandbox ${e} can't be updated because it wasn't created yet`);
                    let a = this.trackedSandboxes.get(e)
                      , n = await await a.getCodeSandboxURL();
                    return window.open(n.editorUrl, "_blank"),
                    n.editorUrl
                }
                createBundledData(e) {
                    var a;
                    let n;
                    switch (e.type) {
                    case o.SandboxMode.react:
                        n = new t.SNBReactBundler(e.code,e.packageJSON,null !== (a = e.visual) && void 0 !== a ? a : {});
                        break;
                    default:
                        throw new Error(`Unsupported bundler type ${e.type}`)
                    }
                    return {
                        files: n.buildSandboxPayload()
                    }
                }
                getCodeForSandboxId(e) {
                    if (!this.trackedConfigurations.get(e))
                        throw new Error(`Unknown code sandbox for id ${e}`);
                    return this.trackedConfigurations.get(e).code
                }
                resetSandboxToInitial(e) {
                    if (!this.trackedConfigurations.get(e))
                        throw new Error(`Unknown code sandbox for id ${e}`);
                    let a = this.trackedInitialStates.get(e);
                    this.updateSandboxCodeInternal(e, a)
                }
                encodeSandboxData(e, a, n, i, o, t) {
                    let c = s.SandboxContentAlignment.center;
                    if (i)
                        switch (i) {
                        case "left":
                            c = s.SandboxContentAlignment.start;
                            break;
                        case "center":
                            c = s.SandboxContentAlignment.center;
                            break;
                        case "right":
                            c = s.SandboxContentAlignment.end
                        }
                    let p = {
                        type: e,
                        code: a,
                        packageJSON: n,
                        visual: {
                            horizontalAlignment: c,
                            verticalAlignment: s.SandboxContentAlignment.center,
                            backgroundHex: null != o ? o : void 0,
                            showSandbox: !1
                        },
                        registry: t
                    };
                    return r.btoaUnicode(JSON.stringify(p))
                }
                setSandboxDataBeforeLoad(e, a) {
                    let n = document.querySelector(`#${e}`);
                    if (!n)
                        throw new Error("Can't inject sandbox data to target. This usually means that you are trying to update sandbox that was already created - this is no-op, use updateSandbox instead.");
                    n.setAttribute("sn-sandbox-data", a)
                }
                validateConstructDataFromElement(e) {
                    let a = e.getAttribute("sn-sandbox-data");
                    if (!a || 0 === a.length)
                        throw new Error("Sandbox doesn't provide any valid data");
                    return this.validateConstructDataFromEncodedData(a)
                }
                validateConstructDataFromEncodedData(e) {
                    let a;
                    try {
                        const n = r.atobUnicode(e);
                        a = JSON.parse(n)
                    } catch (e) {
                        throw new Error("Provided sandbox data corrupted")
                    }
                    if (!a.code || !a.packageJSON || !a.type)
                        throw new Error("Provided sandbox data incomplete");
                    if (!Object.values(o.SandboxMode).includes(a.type))
                        throw new Error(`Unsupported sandbox type ${a.type}`);
                    return {
                        payload: this.createBundledData(a),
                        decodedConfiguration: a
                    }
                }
            }
        }
        ,
        687: (e,a)=>{
            "use strict";
            Object.defineProperty(a, "__esModule", {
                value: !0
            }),
            a.SandboxMode = void 0,
            (a.SandboxMode || (a.SandboxMode = {})).react = "react"
        }
        ,
        969: (e,a)=>{
            "use strict";
            var n;
            Object.defineProperty(a, "__esModule", {
                value: !0
            }),
            a.SNBBundler = a.SandboxContentAlignment = void 0,
            (n = a.SandboxContentAlignment || (a.SandboxContentAlignment = {})).start = "start",
            n.center = "center",
            n.end = "end",
            a.SNBBundler = class {
                constructor(e, a, n) {
                    this.code = e,
                    this.packageJSON = a,
                    this.visualSettings = n
                }
                buildSandboxPayload() {
                    throw new Error("Unable to use generic bundler, please provide type-specific implementation")
                }
            }
        }
        ,
        633: (e,a,n)=>{
            "use strict";
            Object.defineProperty(a, "__esModule", {
                value: !0
            }),
            a.SNBReactBundler = void 0;
            const i = n(969);
            class o extends i.SNBBundler {
                buildSandboxPayload() {
                    return {
                        "/public/index.html": {
                            code: this.buildIndexFile()
                        },
                        "/src/App.js": {
                            code: this.buildAppJS()
                        },
                        "/src/index.js": {
                            code: this.buildIndexJS()
                        },
                        "/package.json": {
                            code: this.buildPackageJSON()
                        }
                    }
                }
                buildIndexFile() {
                    return '\n        <!DOCTYPE html>\n        <html lang="en">\n        <head>\n            <meta charset="utf-8">\n            <meta name="viewport" content="width=device-width, initial-scale=1, shrink-to-fit=no">\n            <meta name="theme-color" content="#000000">\n            <title>Supernova Sandbox App</title>\n        </head>\n        <div id="root"></div>\n        </body>\n\n        </html>'
                }
                alignmentToFlexString(e) {
                    switch (e) {
                    case i.SandboxContentAlignment.start:
                        return "flex-start";
                    case i.SandboxContentAlignment.center:
                        return "center";
                    case i.SandboxContentAlignment.end:
                        return "flex-end"
                    }
                }
                buildAppJS() {
                    return this.code
                }
                buildIndexJS() {
                    var e, a;
                    return `\n        import ReactDOM from "react-dom";\n        import React from "react";\n        import App from "./App";\n\n        /* Configure body style */\n        document.body.style.margin = "0px";\n\n        ReactDOM.render(\n            <div style={{\n                height: "100vh",\n                display: "flex",\n                justifyContent: "${this.alignmentToFlexString(null !== (e = this.visualSettings.horizontalAlignment) && void 0 !== e ? e : i.SandboxContentAlignment.center)}",\n                alignItems: "${this.alignmentToFlexString(null !== (a = this.visualSettings.verticalAlignment) && void 0 !== a ? a : i.SandboxContentAlignment.center)}",\n                background: "${this.visualSettings.backgroundHex ? `#${this.visualSettings.backgroundHex}` : "transparent"}"\n            }}>\n                <App />\n            </div>,\n            document.getElementById("root")\n        );`
                }
                buildPackageJSON() {
                    return this.packageJSON
                }
            }
            a.SNBReactBundler = o
        }
        ,
        339: (e,a)=>{
            "use strict";
            Object.defineProperty(a, "__esModule", {
                value: !0
            }),
            a.atobUnicode = a.btoaUnicode = void 0,
            a.btoaUnicode = function(e) {
                return btoa(encodeURIComponent(e).replace(/%([0-9A-F]{2})/g, (function(e, a) {
                    return String.fromCharCode(parseInt(a, 16))
                }
                )))
            }
            ,
            a.atobUnicode = function(e) {
                return decodeURIComponent(Array.prototype.map.call(atob(e), (function(e) {
                    return "%" + ("00" + e.charCodeAt(0).toString(16)).slice(-2)
                }
                )).join(""))
            }
        }
    }
      , a = {};
    function n(i) {
        var o = a[i];
        if (void 0 !== o)
            return o.exports;
        var s = a[i] = {
            exports: {}
        };
        return e[i](s, s.exports, n),
        s.exports
    }
    (()=>{
        "use strict";
        const e = n(191);
        window.sandboxEngine = new e.SNBComponentSandboxEngine
    }
    )()
}
)();
//# sourceMappingURL=sandbox.js.map
