/**
 * This jQuery plugin displays pagination links inside the selected elements.
 * 
 * This plugin needs at least jQuery 1.4.2
 *
 * @author Gabriel Birke (birke *at* d-scribe *dot* de)
 * @version 2.0rc
 * @param {int} maxentries Number of entries to paginate
 * @param {Object} opts Several options (see README for documentation)
 * @return {Object} jQuery Object
 */
 (function ($) {
     /**
     * @class Class for calculating pagination values
     */
     $.PaginationCalculator = function (maxentries, opts) {
         this.maxentries = maxentries;
         this.opts = opts;
     }

     $.extend($.PaginationCalculator.prototype, {
         /**
         * Calculate the maximum number of pages
         * @method
         * @returns {Number}
         */
         numPages: function () {
             return Math.ceil(this.maxentries / this.opts.items_per_page);
         },
         /**
         * Calculate start and end point of pagination links depending on 
         * current_page and num_display_entries.
         * @returns {Array}
         */
         getInterval: function (current_page) {
             var ne_half = Math.ceil(this.opts.num_display_entries / 2);
             var np = this.numPages();
             var upper_limit = np - this.opts.num_display_entries;
             var start = current_page > ne_half ? Math.max(Math.min(current_page - ne_half, upper_limit), 0) : 0;
             var end = current_page > ne_half ? Math.min(current_page + ne_half, np) : Math.min(this.opts.num_display_entries, np);
             return { start: start, end: end };
         }
     });

     // Initialize jQuery object container for pagination renderers
     $.PaginationRenderers = {}

     /**
     * @class Default renderer for rendering pagination links
     */
     $.PaginationRenderers.defaultRenderer = function (maxentries, opts) {
         this.maxentries = maxentries;
         this.opts = opts;
         this.pc = new $.PaginationCalculator(maxentries, opts);
     }
     $.extend($.PaginationRenderers.defaultRenderer.prototype, {
         //check if there are two arguments in the arguments list
         format: function (text, arguments) {
             if (arguments == null || arguments.length == 0) {
                 return text;
             }
             //decrement to move to the second argument in the array

             for (var token = 0; token < arguments.length; token++) {
                 //iterate through the tokens and replace their placeholders from the original text in order
                 text = text.replace(new RegExp("\\{" + token + "\\}", "gi"), arguments[token]);
             }
             return text;
         },
         /**
         * Helper function for generating a single link (or a span tag if it's the current page)
         * @param {Number} page_id The page id for the new item
         * @param {Number} current_page 
         * @param {Object} appendopts Options for the new item: text and classes
         * @returns {jQuery} jQuery object containing the link
         */
         createLink: function (page_id, current_page, appendopts) {
             var lnk, np = this.pc.numPages();
             page_id = page_id < 0 ? 0 : (page_id < np ? page_id : np - 1); // Normalize page id to sane value
             appendopts = $.extend({ text: page_id + 1, classes: "" }, appendopts || {});
             if (page_id == current_page) {
                 lnk = $("<span class='current'>" + appendopts.text + "</span>");
             }
             else {
                 lnk = $("<a>" + appendopts.text + "</a>")
					.attr('href', this.opts.link_to.replace(/__id__/, page_id));
             }
             if (appendopts.classes) { lnk.addClass(appendopts.classes); }
             lnk.data('page_id', page_id);
             return lnk;
         },
         // Generate a range of numeric links 
         appendRange: function (container, current_page, start, end) {
             var i;
             for (i = start; i < end; i++) {
                 this.createLink(i, current_page).appendTo(container);
             }
         },
         getLinks: function (current_page, eventHandler) {
             var begin, end,
				interval = this.pc.getInterval(current_page),
				np = this.pc.numPages(),
				fragment = $("<div class='pagination'></div>");

             // Pagina X de Y
             if (this.opts.page_x_of_y_show_always) {
                 fragment.append($(this.format("<span class='current prev'>" + this.opts.page_x_of_y_text + "</span>", [current_page + 1, this.pc.numPages()])));
             }
             // Primeiro
             if (this.opts.first_text && (current_page > 0 || this.opts.first_show_always)) {
                 fragment.append(this.createLink(0, current_page, { text: this.opts.first_text, classes: "prev" }));
             }


             // Generate "Previous"-Link
             if (this.opts.prev_text && (current_page > 0 || this.opts.prev_show_always)) {
                 fragment.append(this.createLink(current_page - 1, current_page, { text: this.opts.prev_text, classes: "prev" }));
             }
             // Generate starting points
             if (interval.start > 0 && this.opts.num_edge_entries > 0) {
                 end = Math.min(this.opts.num_edge_entries, interval.start);
                 this.appendRange(fragment, current_page, 0, end);
                 if (this.opts.num_edge_entries < interval.start && this.opts.ellipse_text) {
                     jQuery("<span>" + this.opts.ellipse_text + "</span>").appendTo(fragment);
                 }
             }
             // Generate interval links
             this.appendRange(fragment, current_page, interval.start, interval.end);
             // Generate ending points
             if (interval.end < np && this.opts.num_edge_entries > 0) {
                 if (np - this.opts.num_edge_entries > interval.end && this.opts.ellipse_text) {
                     jQuery("<span>" + this.opts.ellipse_text + "</span>").appendTo(fragment);
                 }
                 begin = Math.max(np - this.opts.num_edge_entries, interval.end);
                 this.appendRange(fragment, current_page, begin, np);

             }
             // Generate "Next"-Link
             if (this.opts.next_text && (current_page < np - 1 || this.opts.next_show_always)) {
                 fragment.append(this.createLink(current_page + 1, current_page, { text: this.opts.next_text, classes: "next" }));
             }



             // Ultimo
             if (this.opts.last_text && (current_page < np - 1 || this.opts.last_show_always)) {
                 fragment.append(this.createLink(this.maxentries, current_page, { text: this.opts.last_text, classes: "next" }));
             }




             $('a', fragment).click(eventHandler);
             return fragment;
         }
     });

     // Extend jQuery
     $.fn.pagination = function (maxentries, opts) {

         // Initialize options with default values
         opts = jQuery.extend({
             items_per_page: 10,
             num_display_entries: 10,
             current_page: 0,
             num_edge_entries: 0,
             link_to: "#",
             page_x_of_y_text: "Page {0} of {1}",
             first_text: "First",
             last_text: "Last",
             prev_text: "Prev",
             next_text: "Next",
             ellipse_text: "...",
             page_x_of_y_show_always: true,
             first_show_always: true,
             last_show_always: true,
             prev_show_always: true,
             next_show_always: true,
             renderer: "defaultRenderer",
             contentPlaceholder: null,
             dataSourceUrl: "",
             templateUrl: "",
             filterSet: new HashSet(),
             filterContainerId: "#filtro-container",
             containers: this,
             maxentries: 0,
             callback: defaultCallback

         }, opts || {});
         opts.maxentries = maxentries;
         opts.filterSet.opts = opts;
         var containers = this,
		 renderer, links, current_page;


         /**
         * This is the event handling function for the pagination links. 
         * @param {int} page_id The new page number
         */
         function pageSelected(evt) {
             evt.preventDefault();
             var links, current_page = $(evt.target).data('page_id');
             containers.data('current_page', current_page);
             links = renderer.getLinks(current_page, pageSelected);
             containers.empty();
             links.appendTo(containers);
             var continuePropagation = opts.callback(opts, current_page, containers);

             if (!continuePropagation) {
                 if (evt.stopPropagation) {
                     evt.stopPropagation();
                 }
                 else {
                     evt.cancelBubble = true;
                 }
             }
             return continuePropagation;
         }

         current_page = opts.current_page;
         containers.data('current_page', current_page);
         // Create a sane value for maxentries and items_per_page
         maxentries = (!maxentries || maxentries < 0) ? 1 : maxentries;
         opts.items_per_page = (!opts.items_per_page || opts.items_per_page < 0) ? 1 : opts.items_per_page;

         if (!$.PaginationRenderers[opts.renderer]) {
             throw new ReferenceError("Pagination renderer '" + opts.renderer + "' was not found in jQuery.PaginationRenderers object.");
         }
         renderer = new $.PaginationRenderers[opts.renderer](maxentries, opts);

         containers.each(function () {
             // Attach control functions to the DOM element 
             this.selectPage = function (page_id) { pageSelected(page_id); }
             this.prevPage = function () {
                 var current_page = containers.data('current_page');
                 if (current_page > 0) {
                     pageSelected(current_page - 1);
                     return true;
                 }
                 else {
                     return false;
                 }
             }
             this.nextPage = function () {
                 var current_page = containers.data('current_page');
                 if (current_page < numPages() - 1) {
                     pageSelected(current_page + 1);
                     return true;
                 }
                 else {
                     return false;
                 }
             }
         });
         // When all initialisation is done, draw the links
         links = renderer.getLinks(current_page, pageSelected);
         containers.empty();
         links.appendTo(containers);
         // call callback function
         opts.callback(opts, current_page, containers);

     }

 })(jQuery);






 // Personalizacao PORTAL ********************************************
 function defaultCallback(opts, current_page, containers) {

     $.ajax({
         url: opts.templateUrl,
         cache: false,
         context: document.body,
         success: function (htmlTemplate) {
             $.ajax({
                 url: opts.dataSourceUrl + "?filtro=" + opts.filterSet.toString(),
                 cache: false,
                 dataType: "json",
                 success: function (jSonDS) {
                     var template = jsontemplate.Template(htmlTemplate, { more_formatters: JSON.stringify });
                     var html = template.expand(jSonDS);
                     opts.contentPlaceholder.html(html);
                     opts.filterSet.container = $(opts.filterContainerId);
                     opts.filterSet.render();
                     AddEvents(opts);
                 }
             });
             /*
             $.getJSON(
             opts.dataSourceUrl + "?filter=" + opts.filterSet.toString(),
             function (jSonDS) {
             template = jsontemplate.Template(htmlTemplate, { more_formatters: JSON.stringify });
             html = template.expand(jSonDS);
             opts.contentPlaceholder.html(html);
             opts.filterSet.container = $(opts.filterContainerId);
             opts.filterSet.render();
             AddEvents(opts);
             }
             );*/
         }
     });
     return false;
 }



 if (!Array.indexOf) {
     Array.prototype.indexOf = function (obj) {
         for (var i = 0; i < this.length; i++) {
             if (this[i] == obj) {
                 return i;
             }
         }
         return -1;
     }
     
 }
 function HashSet(container) {
     this.opts = null;
     this.container = container;
     this._arr = new Array();
     this._value = new Array();
     
 }

 HashSet.prototype.get = function (i) {
     return this._value[this._arr[i]];
 }
 HashSet.prototype.getKey = function (i) {
     return this._arr[i];
 }

 HashSet.prototype.exists = function (key) {
     var arr = this._arr;
     var i = arr.indexOf(key);
     return (i != -1);
 }
 HashSet.prototype.getValueOfKey = function (key) {
     return this._value[key];
 }

 HashSet.prototype.size = function (i) {
     return this._arr.length;
 }


 HashSet.prototype.toString = function () {
     var ret = "";
     for (var i = 0; i < this.size(); i++) {
         var key = this.getKey(i);
         ret += ("{" + key + ":" + this.getValueOfKey(key) + "}");
     }
     //     return this._arr.join(',');
     return ret;
 }



 HashSet.prototype.render = function () {
     this.container.html("&nbsp;");
     if (this.size() > 0) {
         this.container.html("Filtrado por: ");
         for (var i = 0; i < this.size(); i++) {
             var key = this.getKey(i);

             var removeLink = $("<a href='#' title=" + key + ">X</a>");
             var _this = this;
             removeLink.click(function (e) {
                 _this.remove($(this).attr("title"));
                 _this.opts.containers.pagination(_this.opts.maxentries, _this.opts);
                 e.preventDefault();
             });

             var filterFragment = $("<span></span>");
             filterFragment.append(key.charAt(0).toUpperCase() + key.slice(1));
             filterFragment.append(removeLink);

             this.container.append("&nbsp;");
             this.container.append(filterFragment);
         }

     }
 }

 HashSet.prototype.remove = function (e) {
     var arr = this._arr;
     var value = this._value;
     var i = arr.indexOf(e);
     if (i != -1) {
         delete value[arr[e]];
         arr.splice(i, 1);
         this.render();
     }
 }
 HashSet.prototype.add = function (key, value) {
     var arr = this._arr;
     var i = arr.indexOf(key);
     if (i == -1) {
         arr.push(key);
         this.render();
     }
     this._value[key] = value;
 }


 

// var filterSet = new HashSet($("#filtro-container"));
 function AddEvents(opts) {
     var zindex = 900;
     var delay = 200;
     /*
     $("#acoes-em-massa").hide();
     $('.acoes-em-massa').toggle(
            function (e) {
                $("#filtros").hide(delay);

                var target = $("#acoes-em-massa");
                var _this = $(this);
                $('#acoes-em-massa-fechar').unbind("click");
                $('#acoes-em-massa-fechar').click(function (e) { _this.click(); e.preventDefault(); });

                
                var pos = $(this).offset();
                var height = $(this).height();
                //show the menu directly over the placeholder
                target.css({ 'z-index': zindex });
                target.css({ "left": (pos.left) + "px", "top": pos.top + height + "px" });
                target.show(delay);
                e.preventDefault();
            },
            function (e) {
                var target = $("#acoes-em-massa");
                target.hide(delay);
                e.preventDefault();
            }
        );

    $("#filtros").hide();
    $('.filtros').toggle(
            function (e) {
                $("#acoes-em-massa").hide(delay);

                var target = $("#filtros");
                var _this = $(this);
                $('#filtros-fechar').unbind("click");
                $('#filtros-fechar').click(function (e) { _this.click(); e.preventDefault(); });


                $(".items-filtro").each(function (index) {
                    if (opts.filterSet.exists(this.name)) {
                        this.value = opts.filterSet.getValueOfKey(this.name);
                    }
                    else {
                        this.value = "default";
                    }
                });

                var pos = $(this).offset();
                var height = $(this).height();
                //show the menu directly over the placeholder
                target.css({ 'z-index': zindex });
                target.css({ "left": (pos.left) + "px", "top": pos.top + height + "px" });
                target.show(delay);
                e.preventDefault();
            },
            function (e) {
                var target = $("#filtros");
                target.hide(delay);
                e.preventDefault();
            }
        );
        */
         
         $(".janela-configuracoes").position({
             "my": "left top",       //  Horizontal then vertical, missing values default to center
             "at": "left bottom",     //  Horizontal then vertical, missing values default to center
             "of": $("#filtro-container")     //  Element to position against
             //"offset": "-20 5"
         });

       $(".janela-configuracoes").hide();
       $('.show-window').toggle(
            function (e) {
                $(".janela-configuracoes").each(function () {
                    if ($(this).is(':visible')) {
                        //$(this).find(".close-window").click();
                        $(this).hide(0);
                    }
                });


                var strTarget = "#" + $(this).attr("title");
                var target = $(strTarget);
                //var pos = $(this).offset();
                //var height = $(this).height();

                
                var _this = $(this);
                $(strTarget + ' .close-window').unbind("click");
                $(strTarget + ' .close-window').click(function (e) { _this.click(); e.preventDefault(); });


                $(".items-filtro").each(function (index) {
                    if (opts.filterSet.exists(this.name)) {
                        this.value = opts.filterSet.getValueOfKey(this.name);
                    } else {
                        this.value = "default";
                    }
                });


                //show the menu directly over the placeholder
                //target.css({ 'z-index': zindex });
                //target.css({ "left": (pos.left) + "px", "top": pos.top + height + "px" });
                //target.show(delay);
                //target.offset({ top: pos.top + height, left: pos.left });
                target.css({ 'z-index': zindex });
                target.show(delay);
                target.position({
                    "my": "left top",       //  Horizontal then vertical, missing values default to center
                    "at": "left bottom",     //  Horizontal then vertical, missing values default to center
                    "of": _this     //  Element to position against
                    //"offset": "-20 5"
                });


                e.preventDefault();
            },
            function (e) {
                var strTarget = "#" + $(this).attr("title");
                var target = $(strTarget);
                target.hide(delay);
                e.preventDefault();
            }
        );
            

     $(".selecionar-todos").click(function (e) {
         $(".lista-selecionavel").attr('checked', true);
         e.preventDefault(); 
     });
     $(".selecionar-nenhum").click(function (e) {
         $(".lista-selecionavel").attr('checked', false);
         e.preventDefault(); 
     });


     $("#filtros .bt-enviar").click(function (e) {
         $(".items-filtro").each(function (index) {
             if (this.value != "default") {
                 opts.filterSet.add(this.name, this.value);
             } else {
                 opts.filterSet.remove(this.name);
             }

         });
         opts.containers.pagination(opts.maxentries, opts);
         $('#filtros-fechar').click();
         e.preventDefault();
     });


     $("#filtros .bt-cancelar").click(function (e) {
         $('#filtros-fechar').click();
         e.preventDefault();
     });

     
     return false;
 }






















 
 
 // Personalizacao PORTAL ********************************************


 