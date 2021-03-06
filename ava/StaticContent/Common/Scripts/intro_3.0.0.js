(function(a, b) {
    if (typeof exports === "object") {
        b(exports)
    } else {
        if (typeof define === "function" && define.amd) {
            define(["exports"], b)
        } else {
            b(a)
        }
    }
}(this, function(y) {
    var n = "1.1.1";

    function g(z) {
        this._targetElement = z;
        this._options = {
            nextLabel: "Next &rarr;",
            prevLabel: "&larr; Back",
            skipLabel: "Skip",
            doneLabel: "Done",
            tooltipPosition: "bottom",
            tooltipClass: "",
            highlightClass: "",
            exitOnEsc: true,
            exitOnOverlayClick: true,
            showStepNumbers: true,
            keyboardNavigation: true,
            showButtons: true,
            showBullets: true,
            showProgress: false,
            scrollToElement: true,
            overlayOpacity: 0.3,
            positionPrecedence: ["bottom", "top", "right", "left"],
            disableInteraction: false
        }
    }

    function o(K) {
        var B = [],
            O = this;
        if (this._options.steps) {
            for (var F = 0, M = this._options.steps.length; F < M; F++) {
                var L = p(this._options.steps[F]);
                L.step = B.length + 1;
                if (typeof(L.element) === "string") {
                    L.element = document.querySelector(L.element)
                }
                if (typeof(L.element) === "undefined" || L.element == null) {
                    var P = document.querySelector(".introjsFloatingElement");
                    if (P == null) {
                        P = document.createElement("div");
                        P.className = "introjsFloatingElement";
                        document.body.appendChild(P)
                    }
                    L.element = P;
                    L.position = "floating"
                }
                if (L.element != null) {
                    B.push(L)
                }
            }
        } else {
            var G = K.querySelectorAll("*[data-intro]");
            if (G.length < 1) {
                return false
            }
            for (var F = 0, C = G.length; F < C; F++) {
                var H = G[F];
                var A = parseInt(H.getAttribute("data-step"), 10);
                if (A > 0) {
                    B[A - 1] = {
                        element: H,
                        intro: H.getAttribute("data-intro"),
                        step: parseInt(H.getAttribute("data-step"), 10),
                        tooltipClass: H.getAttribute("data-tooltipClass"),
                        highlightClass: H.getAttribute("data-highlightClass"),
                        position: H.getAttribute("data-position") || this._options.tooltipPosition
                    }
                }
            }
            var D = 0;
            for (var F = 0, C = G.length; F < C; F++) {
                var H = G[F];
                if (H.getAttribute("data-step") == null) {
                    while (true) {
                        if (typeof B[D] == "undefined") {
                            break
                        } else {
                            D++
                        }
                    }
                    B[D] = {
                        element: H,
                        intro: H.getAttribute("data-intro"),
                        step: D + 1,
                        tooltipClass: H.getAttribute("data-tooltipClass"),
                        highlightClass: H.getAttribute("data-highlightClass"),
                        position: H.getAttribute("data-position") || this._options.tooltipPosition
                    }
                }
            }
        }
        var J = [];
        for (var I = 0; I < B.length; I++) {
            B[I] && J.push(B[I])
        }
        B = J;
        B.sort(function(Q, z) {
            return Q.step - z.step
        });
        O._introItems = B;
        if (m.call(O, K)) {
            x.call(O);
            var N = K.querySelector(".introjs-skipbutton"),
                E = K.querySelector(".introjs-nextbutton");
            O._onKeyDown = function(Q) {
                if (Q.keyCode === 27 && O._options.exitOnEsc == true) {
                    if (O._introExitCallback != undefined) {
                        O._introExitCallback.call(O)
                    }
                    q.call(O, K)
                } else {
                    if (Q.keyCode === 37) {
                        i.call(O)
                    } else {
                        if (Q.keyCode === 39) {
                            x.call(O)
                        } else {
                            if (Q.keyCode === 13) {
                                var z = Q.target || Q.srcElement;
                                if (z && z.className.indexOf("introjs-prevbutton") > 0) {
                                    i.call(O)
                                } else {
                                    if (z && z.className.indexOf("introjs-skipbutton") > 0) {
                                        if (O._introItems.length - 1 == O._currentStep && typeof(O._introCompleteCallback) === "function") {
                                            O._introCompleteCallback.call(O)
                                        }
                                        if (O._introExitCallback != undefined) {
                                            O._introExitCallback.call(O)
                                        }
                                        q.call(O, K)
                                    } else {
                                        x.call(O)
                                    }
                                }
                                if (Q.preventDefault) {
                                    Q.preventDefault()
                                } else {
                                    Q.returnValue = false
                                }
                            }
                        }
                    }
                }
            };
            O._onResize = function(z) {
                d.call(O, document.querySelector(".introjs-helperLayer"));
                d.call(O, document.querySelector(".introjs-tooltipReferenceLayer"))
            };
            if (window.addEventListener) {
                if (this._options.keyboardNavigation) {
                    window.addEventListener("keydown", O._onKeyDown, true)
                }
                window.addEventListener("resize", O._onResize, true)
            } else {
                if (document.attachEvent) {
                    if (this._options.keyboardNavigation) {
                        document.attachEvent("onkeydown", O._onKeyDown)
                    }
                    document.attachEvent("onresize", O._onResize)
                }
            }
        }
        return false
    }

    function p(A) {
        if (A == null || typeof(A) != "object" || typeof(A.nodeType) != "undefined") {
            return A
        }
        var z = {};
        for (var B in A) {
            if (typeof(jQuery) != "undefined" && A[B] instanceof jQuery) {
                z[B] = A[B]
            } else {
                z[B] = p(A[B])
            }
        }
        return z
    }

    function k(z) {
        this._currentStep = z - 2;
        if (typeof(this._introItems) !== "undefined") {
            x.call(this)
        }
    }

    function x() {
        this._direction = "forward";
        if (typeof(this._currentStep) === "undefined") {
            this._currentStep = 0
        } else {
            ++this._currentStep
        }
        if ((this._introItems.length) <= this._currentStep) {
            if (typeof(this._introCompleteCallback) === "function") {
                this._introCompleteCallback.call(this)
            }
            q.call(this, this._targetElement);
            return
        }
        var z = this._introItems[this._currentStep];
        if (typeof(this._introBeforeChangeCallback) !== "undefined") {
            this._introBeforeChangeCallback.call(this, z.element)
        }
        s.call(this, z)
    }

    function i() {
        this._direction = "backward";
        if (this._currentStep === 0) {
            return false
        }
        var z = this._introItems[--this._currentStep];
        if (typeof(this._introBeforeChangeCallback) !== "undefined") {
            this._introBeforeChangeCallback.call(this, z.element)
        }
        s.call(this, z)
    }

    function q(F) {
        var H = F.querySelector(".introjs-overlay");
        if (H == null) {
            return
        }
        H.style.opacity = 0;
        setTimeout(function() {
            if (H.parentNode) {
                H.parentNode.removeChild(H)
            }
        }, 500);
        var z = F.querySelector(".introjs-helperLayer");
        if (z) {
            z.parentNode.removeChild(z)
        }
        var G = F.querySelector(".introjs-tooltipReferenceLayer");
        if (G) {
            G.parentNode.removeChild(G)
        }
        var E = F.querySelector(".introjs-disableInteraction");
        if (E) {
            E.parentNode.removeChild(E)
        }
        var A = document.querySelector(".introjsFloatingElement");
        if (A) {
            A.parentNode.removeChild(A)
        }
        var B = document.querySelector(".introjs-showElement");
        if (B) {
            B.className = B.className.replace(/introjs-[a-zA-Z]+/g, "").replace(/^\s+|\s+$/g, "")
        }
        var C = document.querySelectorAll(".introjs-fixParent");
        if (C && C.length > 0) {
            for (var D = C.length - 1; D >= 0; D--) {
                C[D].className = C[D].className.replace(/introjs-fixParent/g, "").replace(/^\s+|\s+$/g, "")
            }
        }
        if (window.removeEventListener) {
            window.removeEventListener("keydown", this._onKeyDown, true)
        } else {
            if (document.detachEvent) {
                document.detachEvent("onkeydown", this._onKeyDown)
            }
        }
        this._currentStep = undefined
    }

    function e(D, K, I, H) {
        var A = "",
            E, F, L, G, B;
        K.style.top = null;
        K.style.right = null;
        K.style.bottom = null;
        K.style.left = null;
        K.style.marginLeft = null;
        K.style.marginTop = null;
        I.style.display = "inherit";
        if (typeof(H) != "undefined" && H != null) {
            H.style.top = null;
            H.style.left = null
        }
        if (!this._introItems[this._currentStep]) {
            return
        }
        E = this._introItems[this._currentStep];
        if (typeof(E.tooltipClass) === "string") {
            A = E.tooltipClass
        } else {
            A = this._options.tooltipClass
        }
        K.className = ("introjs-tooltip " + A).replace(/^\s+|\s+$/g, "");
        B = this._introItems[this._currentStep].position;
        if ((B == "auto" || this._options.tooltipPosition == "auto")) {
            if (B != "floating") {
                B = a.call(this, D, K, B)
            }
        }
        L = h(D);
        F = h(K);
        G = u();
        switch (B) {
            case "top":
                I.className = "introjs-arrow bottom";
                var C = 15;
                j(L, C, F, G, K);
                K.style.bottom = (L.height + 20) + "px";
                break;
            case "right":
                K.style.left = (L.width + 20) + "px";
                if (L.top + F.height > G.height) {
                    I.className = "introjs-arrow left-bottom";
                    K.style.top = "-" + (F.height - L.height - 20) + "px"
                } else {
                    I.className = "introjs-arrow left"
                }
                break;
            case "left":
                if (this._options.showStepNumbers == true) {
                    K.style.top = "15px"
                }
                if (L.top + F.height > G.height) {
                    K.style.top = "-" + (F.height - L.height - 20) + "px";
                    I.className = "introjs-arrow right-bottom"
                } else {
                    I.className = "introjs-arrow right"
                }
                K.style.right = (L.width + 20) + "px";
                break;
            case "floating":
                I.style.display = "none";
                K.style.left = "50%";
                K.style.top = "50%";
                K.style.marginLeft = "-" + (F.width / 2) + "px";
                // K.style.marginTop = "-" + (F.height / 2) + "px";
                if (typeof(H) != "undefined" && H != null) {
                    H.style.left = "-" + ((F.width / 2) + 18) + "px";
                    H.style.top = "-" + (10) + "px"
                }


                var obj = this._introItems[this._currentStep].intro ;
             
                obj = obj.substring( obj.indexOf(  "alt="  )+5, obj.indexOf(  "></header"   ) -1 ).trim();

                console.log(obj);

                var x = "Conclusão de Módulo no Aprimora";

                if( obj.indexOf( "dulo no Aprimora"  ) > 0   ){
                    H.style.left = "-" + 10 + "px";
                }


                break;
            case "bottom-right-aligned":
                I.className = "introjs-arrow top-right";
                var J = 0;
                v(L, J, F, K);
                K.style.top = (L.height + 20) + "px";
                break;
            case "bottom-middle-aligned":
                I.className = "introjs-arrow top-middle";
                var z = L.width / 2 - F.width / 2;
                if (v(L, z, F, K)) {
                    K.style.right = null;
                    j(L, z, F, G, K)
                }
                K.style.top = (L.height + 20) + "px";
                break;
            case "bottom-left-aligned":
            case "bottom":
            default:
                I.className = "introjs-arrow top";
                var C = 0;
                j(L, C, F, G, K);
                K.style.top = (L.height + 20) + "px";
                break
        }
    }

    function j(D, B, C, z, A) {
        if (D.left + B + C.width > z.width) {
            A.style.left = (z.width - C.width - D.left) + "px";
            return false
        }
        A.style.left = B + "px";
        return true
    }

    function v(C, A, B, z) {
        if (C.left + C.width - A - B.width < 0) {
            z.style.left = (-C.left) + "px";
            return false
        }
        z.style.right = A + "px";
        return true
    }

    function a(C, F, D) {
        var A = this._options.positionPrecedence.slice();
        var E = u();
        var G = h(F).height + 10;
        var B = h(F).width + 20;
        var H = h(C);
        var z = "floating";
        if (H.left + B > E.width || ((H.left + (H.width / 2)) - B) < 0) {
            w(A, "bottom");
            w(A, "top")
        } else {
            if ((H.height + H.top + G) > E.height) {
                w(A, "bottom")
            }
            if (H.top - G < 0) {
                w(A, "top")
            }
        }
        if (H.width + H.left + B > E.width) {
            w(A, "right")
        }
        if (H.left - B < 0) {
            w(A, "left")
        }
        if (A.length > 0) {
            z = A[0]
        }
        if (D && D != "auto") {
            if (A.indexOf(D) > -1) {
                z = D
            }
        }
        return z
    }

    function w(z, A) {
        if (z.indexOf(A) > -1) {
            z.splice(z.indexOf(A), 1)
        }
    }

    function d(z) {
        if (z) {
            if (!this._introItems[this._currentStep]) {
                return
            }
            var A = this._introItems[this._currentStep],
                B = h(A.element),
                C = 10;
            if (A.position == "floating") {
                C = 0
            }
            z.setAttribute("style", "width: " + (B.width + C) + "px; height:" + (B.height + C) + "px; top:" + (B.top - 5) + "px;left: " + (B.left - 5) + "px;")
        }
    }

    function c() {
        var z = document.querySelector(".introjs-disableInteraction");
        if (z === null) {
            z = document.createElement("div");
            z.className = "introjs-disableInteraction";
            this._targetElement.appendChild(z)
        }
        d.call(this, z)
    }

    function s(D) {
        if (typeof(this._introChangeCallback) !== "undefined") {
            this._introChangeCallback.call(this, D.element)
        }
        var M = this,
            aa = document.querySelector(".introjs-helperLayer"),
            Z = document.querySelector(".introjs-tooltipReferenceLayer"),
            af = "introjs-helperLayer",
            ab = h(D.element);
        if (typeof(D.highlightClass) === "string") {
            af += (" " + D.highlightClass)
        }
        if (typeof(this._options.highlightClass) === "string") {
            af += (" " + this._options.highlightClass)
        }
        if (aa != null) {
            var am = Z.querySelector(".introjs-helperNumberLayer"),
                ah = Z.querySelector(".introjs-tooltiptext"),
                K = Z.querySelector(".introjs-arrow"),
                aj = Z.querySelector(".introjs-tooltip"),
                ae = Z.querySelector(".introjs-skipbutton"),
                A = Z.querySelector(".introjs-prevbutton"),
                F = Z.querySelector(".introjs-nextbutton");
            aa.className = af;
            aj.style.opacity = 0;
            aj.style.display = "none";
            if (am != null) {
                var H = this._introItems[(D.step - 2 >= 0 ? D.step - 2 : 0)];
                if (H != null && (this._direction == "forward" && H.position == "floating") || (this._direction == "backward" && D.position == "floating")) {
                    am.style.opacity = 0
                }
            }
            d.call(M, aa);
            d.call(M, Z);
            var C = document.querySelectorAll(".introjs-fixParent");
            if (C && C.length > 0) {
                for (var ak = C.length - 1; ak >= 0; ak--) {
                    C[ak].className = C[ak].className.replace(/introjs-fixParent/g, "").replace(/^\s+|\s+$/g, "")
                }
            }
            var L = document.querySelector(".introjs-showElement");
            L.className = L.className.replace(/introjs-[a-zA-Z]+/g, "").replace(/^\s+|\s+$/g, "");
            if (M._lastShowElementTimer) {
                clearTimeout(M._lastShowElementTimer)
            }
            M._lastShowElementTimer = setTimeout(function() {
                if (am != null) {
                    am.innerHTML = D.step
                }
                ah.innerHTML = D.intro;
                aj.style.display = "block";
                e.call(M, D.element, aj, K, am);
                Z.querySelector(".introjs-bullets li > a.active").className = "";
                Z.querySelector('.introjs-bullets li > a[data-stepnumber="' + D.step + '"]').className = "active";
                Z.querySelector(".introjs-progress .introjs-progressbar").setAttribute("style", "width:" + b.call(M) + "%;");
                aj.style.opacity = 1;
                if (am) {
                    am.style.opacity = 1
                }
                if (F.tabIndex === -1) {
                    ae.focus()
                } else {
                    F.focus()
                }
            }, 350)
        } else {
            var E = document.createElement("div"),
                V = document.createElement("div"),
                J = document.createElement("div"),
                B = document.createElement("div"),
                Q = document.createElement("div"),
                ad = document.createElement("div"),
                ag = document.createElement("div"),
                W = document.createElement("div");
            E.className = af;
            V.className = "introjs-tooltipReferenceLayer";
            d.call(M, E);
            d.call(M, V);
            this._targetElement.appendChild(E);
            this._targetElement.appendChild(V);
            J.className = "introjs-arrow";
            Q.className = "introjs-tooltiptext";
            Q.innerHTML = D.intro;
            ad.className = "introjs-bullets";
            if (this._options.showBullets === false) {
                ad.style.display = "none"
            }
            var T = document.createElement("ul");
            for (var ak = 0, N = this._introItems.length; ak < N; ak++) {
                var O = document.createElement("li");
                var G = document.createElement("a");
                G.onclick = function() {
                    M.goToStep(this.getAttribute("data-stepnumber"))
                };
                if (ak === (D.step - 1)) {
                    G.className = "active"
                }
                G.href = "javascript:void(0);";
                G.innerHTML = "&nbsp;";
                G.setAttribute("data-stepnumber", this._introItems[ak].step);
                O.appendChild(G);
                T.appendChild(O)
            }
            ad.appendChild(T);
            ag.className = "introjs-progress";
            if (this._options.showProgress === false) {
                ag.style.display = "none"
            }
            var Y = document.createElement("div");
            Y.className = "introjs-progressbar";
            Y.setAttribute("style", "width:" + b.call(this) + "%;");
            ag.appendChild(Y);
            W.className = "introjs-tooltipbuttons";
            if (this._options.showButtons === false) {
                W.style.display = "none"
            }
            B.className = "introjs-tooltip";
            B.appendChild(Q);
            B.appendChild(ad);
            B.appendChild(ag);
            if (this._options.showStepNumbers == true) {
                var R = document.createElement("span");
                R.className = "introjs-helperNumberLayer";
                R.innerHTML = D.step;
                V.appendChild(R)
            }
            B.appendChild(J);
            V.appendChild(B);
            var F = document.createElement("a");
            F.onclick = function() {
                if (M._introItems.length - 1 != M._currentStep) {
                    x.call(M)
                }
            };
            F.href = "javascript:void(0);";
            F.innerHTML = this._options.nextLabel;
            var A = document.createElement("a");
            A.onclick = function() {
                if (M._currentStep != 0) {
                    i.call(M)
                }
            };
            A.href = "javascript:void(0);";
            A.innerHTML = this._options.prevLabel;
            var ae = document.createElement("a");
            ae.className = "introjs-button introjs-skipbutton";
            ae.href = "javascript:void(0);";
            ae.innerHTML = this._options.skipLabel;
            ae.onclick = function() {
                if (M._introItems.length - 1 == M._currentStep && typeof(M._introCompleteCallback) === "function") {
                    M._introCompleteCallback.call(M)
                }
                if (M._introItems.length - 1 != M._currentStep && typeof(M._introExitCallback) === "function") {
                    M._introExitCallback.call(M)
                }
                q.call(M, M._targetElement)

            };
            W.appendChild(ae);
            if (this._introItems.length > 1) {
                W.appendChild(A);
                W.appendChild(F)
            }
            B.appendChild(W);
            e.call(M, D.element, B, J, R)
        }
        if (this._options.disableInteraction === true) {
            c.call(M)
        }
        A.removeAttribute("tabIndex");
        F.removeAttribute("tabIndex");
        if (this._currentStep == 0 && this._introItems.length > 1) {
            A.className = "introjs-button introjs-prevbutton introjs-hidden-button";
            A.tabIndex = "-1";
            F.className = "introjs-button introjs-nextbutton";
            ae.innerHTML = this._options.skipLabel
            $('.introjs-skipbutton').removeAttr("style");
            
        } else {
            if (this._introItems.length - 1 == this._currentStep || this._introItems.length == 1) {
                ae.innerHTML = this._options.doneLabel;
                A.className = "introjs-button introjs-prevbutton introjs-tooltip-btn-border-right";
                F.className = "introjs-button introjs-nextbutton introjs-hidden-button";

                F.tabIndex = "-1"
                $('.introjs-skipbutton').css("float", "right");
            } else {
                A.className = "introjs-button introjs-prevbutton";
                F.className = "introjs-button introjs-nextbutton";
                ae.innerHTML = this._options.skipLabel
                $('.introjs-skipbutton').removeAttr("style");
                
            }
        }
        F.focus();
        D.element.className += " introjs-showElement";
        var S = r(D.element, "position");
        if (S !== "absolute" && S !== "relative") {
            D.element.className += " introjs-relativePosition"
        }
        var ai = D.element.parentNode;
        while (ai != null) {
            if (ai.tagName.toLowerCase() === "body") {
                break
            }
            var P = r(ai, "z-index");
            var al = parseFloat(r(ai, "opacity"));
            var U = r(ai, "transform") || r(ai, "-webkit-transform") || r(ai, "-moz-transform") || r(ai, "-ms-transform") || r(ai, "-o-transform");
            if (/[0-9]+/.test(P) || al < 1 || (U !== "none" && U !== undefined)) {
                ai.className += " introjs-fixParent"
            }
            ai = ai.parentNode
        }
        var X = D.element.getBoundingClientRect(),
            ac = u().height,
            I = X.bottom - (X.bottom - X.top),
            z = X.bottom - ac;
        if (!l(D.element)) {
            var X = D.element.getBoundingClientRect(),
                ac = u().height,
                I = X.bottom - (X.bottom - X.top),
                z = X.bottom - ac;
            if (I < 0 || D.element.clientHeight < ac) {
                window.scrollBy(0, I - 200)
            } else {
                window.scrollBy(0, z + 200)
            }
        }
        if (typeof(this._introAfterChangeCallback) !== "undefined") {
            this._introAfterChangeCallback.call(this, D.element)
        }
    }

    function r(z, A) {
        var B = "";
        if (z.currentStyle) {
            B = z.currentStyle[A]
        } else {
            if (document.defaultView && document.defaultView.getComputedStyle) {
                B = document.defaultView.getComputedStyle(z, null).getPropertyValue(A)
            }
        }
        if (B && B.toLowerCase) {
            return B.toLowerCase()
        } else {
            return B
        }
    }

    function u() {
        if (window.innerWidth != undefined) {
            return {
                width: window.innerWidth,
                height: window.innerHeight
            }
        } else {
            var z = document.documentElement;
            return {
                width: z.clientWidth,
                height: z.clientHeight
            }
        }
    }

    function l(z) {
        var A = z.getBoundingClientRect();
        return (A.top >= 0 && A.left >= 0 && (A.bottom + 80) <= window.innerHeight && A.right <= window.innerWidth)
    }

    function m(C) {
        var z = document.createElement("div"),
            D = "",
            A = this;
        z.className = "introjs-overlay";
        if (C.tagName.toLowerCase() === "body") {
            D += "top: 0;bottom: 0; left: 0;right: 0;position: fixed;";
            z.setAttribute("style", D)
        } else {
            var B = h(C);
            if (B) {
                D += "width: " + B.width + "px; height:" + B.height + "px; top:" + B.top + "px;left: " + B.left + "px;";
                z.setAttribute("style", D)
            }
        }
        C.appendChild(z);
        z.onclick = function() {
            if (A._options.exitOnOverlayClick == true) {
                if (A._introExitCallback != undefined) {
                    A._introExitCallback.call(A)
                }
                q.call(A, C)
            }
        };
        setTimeout(function() {
            D += "opacity: " + A._options.overlayOpacity.toString() + ";";
            z.setAttribute("style", D)
        }, 10);
        return true
    }

    function h(B) {
        var C = {};
        C.width = B.offsetWidth;
        C.height = B.offsetHeight;
        var A = 0;
        var z = 0;
        while (B && !isNaN(B.offsetLeft) && !isNaN(B.offsetTop)) {
            A += B.offsetLeft;
            z += B.offsetTop;
            B = B.offsetParent
        }
        C.top = z;
        C.left = A;
        return C
    }

    function b() {
        var z = parseInt((this._currentStep + 1), 10);
        return ((z / this._introItems.length) * 100)
    }

    function f(C, B) {
        var A = {};
        for (var z in C) {
            A[z] = C[z]
        }
        for (var z in B) {
            A[z] = B[z]
        }
        return A
    }
    var t = function(A) {
        if (typeof(A) === "object") {
            return new g(A)
        } else {
            if (typeof(A) === "string") {
                var z = document.querySelector(A);
                if (z) {
                    return new g(z)
                } else {
                    throw new Error("There is no element with given selector.")
                }
            } else {
                return new g(document.body)
            }
        }
    };
    t.version = n;
    t.fn = g.prototype = {
        clone: function() {
            return new g(this)
        },
        setOption: function(z, A) {
            this._options[z] = A;
            return this
        },
        setOptions: function(z) {
            this._options = f(this._options, z);
            return this
        },
        start: function() {
            o.call(this, this._targetElement);
            return this
        },
        goToStep: function(z) {
            k.call(this, z);
            return this
        },
        nextStep: function() {
            x.call(this);
            return this
        },
        previousStep: function() {
            i.call(this);
            return this
        },
        exit: function() {
            q.call(this, this._targetElement);
            return this
        },
        refresh: function() {
            d.call(this, document.querySelector(".introjs-helperLayer"));
            d.call(this, document.querySelector(".introjs-tooltipReferenceLayer"));
            return this
        },
        onbeforechange: function(z) {
            if (typeof(z) === "function") {
                this._introBeforeChangeCallback = z
            } else {
                throw new Error("Provided callback for onbeforechange was not a function")
            }
            return this
        },
        onchange: function(z) {
            if (typeof(z) === "function") {
                this._introChangeCallback = z
            } else {
                throw new Error("Provided callback for onchange was not a function.")
            }
            return this
        },
        onafterchange: function(z) {
            if (typeof(z) === "function") {
                this._introAfterChangeCallback = z
            } else {
                throw new Error("Provided callback for onafterchange was not a function")
            }
            return this
        },
        oncomplete: function(z) {
            if (typeof(z) === "function") {
                this._introCompleteCallback = z
            } else {
                throw new Error("Provided callback for oncomplete was not a function.")
            }
            return this
        },
        onexit: function(z) {
            if (typeof(z) === "function") {
                this._introExitCallback = z
            } else {
                throw new Error("Provided callback for onexit was not a function.")
            }
            return this
        }
    };
    y.introJs = t;
    return t
}));