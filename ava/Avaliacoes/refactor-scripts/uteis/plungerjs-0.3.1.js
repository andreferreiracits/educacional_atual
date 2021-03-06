﻿(function (P, $) {
	"use strict";

    var internal = {

        init : false,

        events : {
            update:"plungerUpdate"
        },

        chainlist : {},

        callchain : function(strcallback){
            var callback, component = strcallback && internal.chainlist[strcallback];
            if (!component) {
                callback = $.Callbacks();
                component = {
                    fire: function (nextAction, dto) {
                        callback.fire(nextAction, dto);
                    },
                    add: function (action) {
                        callback.empty();
                        callback.add(action);
                    },
                    remove: function(){
                        callback.empty();
                    }
                };
                if (callback) {
                    internal.chainlist[strcallback] = component;
                }
            }
            return component;
        }

    }

	var moduleManager = new (function(){
        
		var modules = {}, ini = [];

		var getAction = function(module, action) {
			$.each(module, function (key, value) {
				if ($.trim(action.toLowerCase()) == $.trim(key.toLowerCase())) {
					action = key;
					return;
				}
			});
			return module[action];
		};

		this.Add = function (name, module) {
			modules[$.trim(name).toLowerCase()] = module;
			if(module.init){
				ini.push(module);
			}
		};

		this.Call = function (params) {
			
			var i, j;
			if (!params.push) {
				var n = [];
				for (i = 0, j = arguments.length; i < j; i++) {
					n.push(arguments[i]);
				}
				params = n;
			}
			var module = this.Component(params[0]);
			if (!module){
				return;
			}
			
			var action = getAction(module, params[1]);
			if(!action){
				return;
			}
			var args = params.splice(2, params.length);
			action.apply(module, args);
		};

        this.ContextElement = function(componente, $element){
            var module = this.Component(componente);
            if(module){
                module.context = (!module.singletron ? $element : module.context) || $element;
                return module.context;
            }
            return undefined;
        };

        this.Component = function(componente){
            return modules[componente.toLowerCase()];
        }
		this.init = function(){
			$.each(ini, function(index, value){
				if(value.init){ 
					value.init();
				}
			});
		};
	});

	$.extend(P, {

		version: "0.2.0",

		base: undefined,

		init: function (auto, base) {
			var caminho = $('script[src*="plungerjs"]').attr("src");
			if (auto && caminho && caminho.toLowerCase().indexOf("init=false") > -1) {
				return;
			}
			if (internal.init) {
				return;
			}
			
			internal.init = true;

			P.base = base || $('body');

			moduleManager.init();
		},

		$ : function(query){
			return P.base.find(query);
		},

        ajax : function(options){
            $.ajax(options);   
        },

        html : function($element, content){
            $element.html(content);
            $(P.base).trigger(internal.events.update, [$element]);
        },

        parse : function(strvalue, tryJson){
            if(!strvalue){
                return undefined;
            }
            var value;
            value = isNaN(strvalue) ? strvalue : parseFloat(strvalue);
            value = value === "false" || value === "true" ? value == "true" : value;
            if(tryJson && typeof(value) == "string"){
                try{
                    var findarray = /^\[.*?\]$/;
                    var bolArray = findarray.test(value)
                    if(bolArray){
                        value = '{"Array":' + value + '}';
                    }
                    var tryparse = $.parseJSON(value.replace(/'/g,"\""));
                    
                    if(tryparse != null){
                        value = bolArray ? tryparse.Array : tryparse;
                    }
                }catch(e){}
            }
            return value;
        },
        
        add : function(name, construtor, extend){
            var base, componente;

            base = new BaseComponent(name);
            construtor.prototype = base
            construtor.prototype.constructor = construtor

            componente = new construtor();
            moduleManager.Add(name, componente);

            if(extend){
                componente.base = moduleManager.Component(extend);
            }

            return componente;
        },
        //credito: http://stackoverflow.com/questions/1184624/convert-form-data-to-js-object-with-jquery
        serializeObject2:function($form) {
          var json = {};
          jQuery.map($form.serializeArray(), function(n, i) {

            var _ = n.name.indexOf('[');
            if (_ > -1) {
              var o = json;
              var _name = n.name.replace(/\]/gi, '').split('[');
              for (var i=0, len=_name.length; i<len; i++) {
                if (i == len-1) {
                  if (o[_name[i]]) {
                    if (typeof o[_name[i]] == 'string') {
                      o[_name[i]] = [o[_name[i]]];
                    }
                    o[_name[i]].push(n.value);
                  }
                  else o[_name[i]] = n.value || '';
                }
                else o = o[_name[i]] = o[_name[i]] || {};
              }
            }
            else {
              if (json[n.name] !== undefined) {
                if (!json[n.name].push) {
                  json[n.name] = [json[n.name]];
                }
                json[n.name].push(n.value || '');
              }
              else json[n.name] = n.value || '';      
            }
          });
          return json;
        },

        serializeObject : function ($form) {

            var self = this,
            json = {},
            push_counters = {},
            patterns = {
                "validate": /^[a-zA-Z][a-zA-Z0-9_]*(?:\[(?:\d*|[a-zA-Z0-9_]+)\])*$/,
                "key": /[a-zA-Z0-9_]+|(?=\[\])/g,
                "push": /^$/,
                "fixed": /^\d+$/,
                "named": /^[a-zA-Z0-9_]+$/
            };


            this.build = function (base, key, value) {
                base[key] = value;
                return base;
            };

            this.push_counter = function (key) {
                if (push_counters[key] === undefined) {
                    push_counters[key] = 0;
                }
                return push_counters[key]++;
            };
            
            $.each($form.serializeArray(), function () {

                // skip invalid keys
                if (!patterns.validate.test(this.name)) {
                    return;
                }


                var k,
                keys = this.name.match(patterns.key),
                reverse_key = this.name;

                var noparse = $form.find('input[name="' + this.name + '"]').attr('data-noparse') == "true";
                var merge = !noparse ? P.parse(this.value, true) : this.value;
                merge = merge == null ? "" : merge;

                while ((k = keys.pop()) !== undefined) {

                    // adjust reverse_key
                    reverse_key = reverse_key.replace(new RegExp("\\[" + k + "\\]$"), '');
                    
                    // push
                    if (k.match(patterns.push)) {
                        merge = self.build([], self.push_counter(reverse_key), merge);
                    }

                    // fixed
                    else if (k.match(patterns.fixed)) {
                        merge = self.build([], k, merge);
                    }

                    // named
                    else if (k.match(patterns.named)) {
                        merge = self.build({}, k, merge);
                    }
                }

                json = $.extend(true, json, merge);
            });

            return json;
        },

        noElement : function(){
            return $('<div id="noElement"></div>');
        }
	});

    function BaseComponent(name){

        var me = this;
        
        this.name = name;
        this.singletron = false; //permitir ou não ter mais de 1 elemento relacionado ao componente
        this.context; //recebe o elemento do contexto atual;
        this.base;

        this.aria = function($e, name, value){
            var field = "aria-" + name;
			return getsetparam($e, field, value);
        };
        
		this.param = function ($e, name, value) {
            var field = 'data-' + this.name + '-' + name;
			return getsetparam($e, field, value);
		};

		this.target = function ($e) {
			var target = $e.attr('target') || $e.data('target');
			return element($e, target);
		};

        this.element = function ($e, name) {
            var value = $e.data("element-" + name);
            return element($e, value);
		};

        this.extra = function(name, value){
            var attr = 'data-' + this.name + '-' + name;

            var search = "[" + attr + (typeof(value) != "undefined" ? "='" + value + "'" : "") + "]";

            return P.$(search) || P.noElement();
        }

        this.chain = {
            add : function($e, chain, action){
                var calls;
                if($e){
                    calls = $e.data("chain-" + chain);
                }else{
                    calls = chain;
                }

                if(calls && $.trim(calls) != ""){
                    internal.callchain(calls).add(function(next, dto){
                        action(next, dto);
                    });
                }
            },
            fire : function($e, chain, next, dto){
                var calls;
                if($e){
                    calls = $e.data("chainfire-" + chain);
                }
                calls = calls || chain;
                if(calls && $.trim(calls) != ""){
                    internal.callchain(calls).fire(next, dto);
                }
            },
            remove : function($e, chain){
                var calls;
                if($e){
                    calls = $e.data("chainfire-" + chain);
                }
                calls = calls || chain;
                if(calls && $.trim(calls) != ""){
                    internal.callchain(calls).remove();
                }
            }
        };

        this.events = {
            listener : function($e, event, action){
                var value = $e.data("listener-" + event);
                if(value){
                    $(P.base).on(value, action);
                    return true;
                }
                return false;
            },
            dispatch : function($e, event, dto){
                var value = $e.data("event-" + event);
                
                if(value){
                    var eventos = value.split(',');
                    for(var i=0, j=eventos.length; i<j; i++){
                        $(P.base).trigger($.trim(eventos[i]),[dto]);
                    }
                }
            }
        };

        var element = function($e, name){
            var $r = P.noElement();
            if(name){
                $r = (name == "_self" ? $e.parent() : P.$(name)) || P.noElement();
            }
            return $r;
        }

        var getsetparam = function($e, field, value){
            if(typeof(value) !== "undefined"){
			    $e.attr(field, value.toString());
                return value;
		    }
            value = $e.attr(field);
		    return P.parse(value, true);
        };

        //credito: http://stackoverflow.com/questions/9106936/cross-browser-getter-and-setter
        var getter_setter = function (obj, name, onGet, onSet) {
            var getFn = function () {
                    return onGet.apply(obj);
                },
                setFn = function (newValue) {
                    onSet.apply(obj, [newValue]);
                };

            if (Object.defineProperty) {
                Object.defineProperty(obj, name, {
                    get: getFn,
                    set: setFn
                });
            } else {
                obj.__defineGetter__(name, getFn);
                obj.__defineSetter__(name, setFn);
            }
        };

    };
    

	$(document).ready(function () {
		P.init(true, $('body'));
	});


	/* principais */
	P.add("render", function () {
		var me = this, _init = false;

        var renderizar = function($element){
            var componentes = $element.data('render').split(' ');

			for(var i = 0, j = componentes.length; i<j; i++){
                moduleManager.ContextElement(componentes[i], $element);
				moduleManager.Call(componentes[i], "render", $element);
			}

        }

        var renderDelay = function($element){
            var delay = $element.data('render-delay');
            if(!delay){
                renderizar($element);
            }else{
                setTimeout(function(){
                    renderizar($element);
                },delay);
            }
        }

		var apply = function ($element, self) {
            var elements = self ? $element.add($element.find('[data-render]')) : $element.find('[data-render]');

			elements.each(function () {
                
                var event_render = $(this).data('render-listener');

                if(!event_render){
				    renderDelay($(this));              
                }else{
                    $(P.base).on(event_render, $(this), (function($e, evento){
                        return function(evt){
                            renderDelay($e);
                        }
                    })($(this), event_render));

                }
			});
		};

		this.init = function () {

			if (_init) {
				return;
			}
			_init = true;

            $(P.base).on(internal.events.update, function(evt, $element, self){
                apply($element, self);
            });

            apply(P.base);
		};

	});

	P.add("route", function () {
		var me = this, _init = false;
		var pathHash, relativePath;

		this.init = function(){

			if (_init) {
				return;
			}
			_init = true;

			$(window).on('hashchange', function () {
				me.CallModule();
			});

			me.CallModule();
		};
		
		this.CallModule = function () {
			ParsePath();
            if(!pathHash){
                return;
            }
			$.each(pathHash, function (index, value) {
				moduleManager.Call(value.split('/'));
			});
		};

		var ParsePath = function() {
			var path = location.href.replace(window.location.origin, "");
			var pattern = /[\w/]+/g;
			var pHash = path.indexOf("#");
			pathHash = pHash >= 0 ? path.substring(pHash).match(pattern) : [];
			var pSubs = pHash >= 0 ? pHash : path.length;
			relativePath = $.trim(path.substring(0, pSubs)) || "/";
		};
		
	});

	P.add("action", function () {
		var me = this, _init = false;
		//TODO: remover este aplicar de evntos, pois pode ser muito "pesado"
		var events = ["click"];
		
		this.init = function() {

			if (_init) {
				return;
			}
			_init = true;
			$.each(events, function(index, eventType){
				attachEvent(eventType);
			});
		};
		var attachEvent = function (eventType) {
			//TODO: registrar muitos eventos talvez pese na página
            
			$(document).on(eventType, '[data-action]', function (evt) {
                var element = $(evt.target)
				var type = element.data('action');
                if(!type){
                    //caso outro elemento interno "capture" o evento (input dentro de um a)
                    element = element.closest('[data-action]');
                    type = element.data('action');
                }
                
				if (type) {
                    var types = type.split(' ');
                    for(var i=0, j=types.length; i<j; i++){
                        moduleManager.ContextElement(types[i], element);
					    moduleManager.Call(types[i], evt.type, element);
                    }
					evt.preventDefault();
					return;
				}
			});
		};

	});

})(window.PlungerJs = window.PlungerJs || {}, jQuery);



/* componentes iniciais */
(function (P, $) {
	"use strict";
	P.add("ajaxlink", function () {
		var me = this;

		this._load = function($a, extra) {
            
            me.events.dispatch($a, 'start');

			var $target = me.target($a);
            var dataType = me.param($a, 'datatype') || 'html';
			var options = {
				type: "GET",
				dataType : dataType,
				url: $a.attr('href') || me.param($a, 'href'),
				cache: me.param($a, "cache"),
				success: function (data, status, xhr) {
					var _data = $('<html />').html(data);
					var content = $(_data).find('body').length > 0 ? $(_data).find('body').html() : data;
                    P.html($target, content);
				},
                complete:function(){
                    me.events.dispatch($a, 'end');
                }
			};
            
			P.ajax($.extend(options,extra));
		};

		this.click = function ($a) {
			me._load($a);
		};

		this.load = function (linkname) {
			
			var $a = P.$('a[data-action="' + me.name + '"][id="' + linkname + '"]');
			
			me._load($a);
		};
		this.render = function($a){
            
			me._load($a);
		}

		return this;

	})

})(PlungerJs, jQuery);