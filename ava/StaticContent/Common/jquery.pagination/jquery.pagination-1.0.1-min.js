﻿(function(a){a.PaginationCalculator=function(b,c){this.maxentries=b;this.opts=c};a.extend(a.PaginationCalculator.prototype,{numPages:function(){return Math.ceil(this.maxentries/this.opts.items_per_page)},getInterval:function(f){var d=Math.floor(this.opts.num_display_entries/2);var e=this.numPages();var c=e-this.opts.num_display_entries;var g=f>d?Math.max(Math.min(f-d,c),0):0;var b=f>d?Math.min(f+d+(this.opts.num_display_entries%2),e):Math.min(this.opts.num_display_entries,e);return{start:g,end:b}}});a.PaginationRenderers={};a.PaginationRenderers.defaultRenderer=function(b,c){this.maxentries=b;this.opts=c;this.pc=new a.PaginationCalculator(b,c)};a.extend(a.PaginationRenderers.defaultRenderer.prototype,{createLink:function(b,e,d){var f,c=this.pc.numPages();b=b<0?0:(b<c?b:c-1);d=a.extend({text:b+1,classes:""},d||{});if(b==e){f=a("<span class='current'>"+d.text+"</span>")}else{f=a("<a>"+d.text+"</a>").attr("href",this.opts.link_to.replace(/__id__/,b))}if(d.classes){f.addClass(d.classes)}f.data("page_id",b);return f},appendRange:function(c,f,g,b,e){var d;for(d=g;d<b;d++){this.createLink(d,f,e).appendTo(c)}},getLinks:function(h,e){var f,b,c=this.pc.getInterval(h),g=this.pc.numPages(),d=a("<div class='pagination'></div>");if(this.opts.prev_text&&(h>0||this.opts.prev_show_always)){d.append(this.createLink(h-1,h,{text:this.opts.prev_text,classes:"prev"}))}if(c.start>0&&this.opts.num_edge_entries>0){b=Math.min(this.opts.num_edge_entries,c.start);this.appendRange(d,h,0,b,{classes:"sp"});if(this.opts.num_edge_entries<c.start&&this.opts.ellipse_text){jQuery("<span>"+this.opts.ellipse_text+"</span>").appendTo(d)}}this.appendRange(d,h,c.start,c.end);if(c.end<g&&this.opts.num_edge_entries>0){if(g-this.opts.num_edge_entries>c.end&&this.opts.ellipse_text){jQuery("<span>"+this.opts.ellipse_text+"</span>").appendTo(d)}f=Math.max(g-this.opts.num_edge_entries,c.end);this.appendRange(d,h,f,g,{classes:"ep"})}if(this.opts.next_text&&(h<g-1||this.opts.next_show_always)){d.append(this.createLink(h+1,h,{text:this.opts.next_text,classes:"next"}))}a("a",d).click(e);return d}});a.fn.pagination=function(i,b){b=jQuery.extend({items_per_page:6,num_display_entries:4,current_page:0,num_edge_entries:0,link_to:"#",page_x_of_y_text:"P�gina {0} de {1}",first_text:"Primeira",last_text:"�ltima",prev_text:"<<",next_text:">>",ellipse_text:"...",page_x_of_y_show_always:true,first_show_always:true,last_show_always:true,prev_show_always:true,next_show_always:true,renderer:"defaultRenderer",callback:function(){return false}},b||{});var c=this,f,k,e;function d(m){var n,l=a(m.target).data("page_id"),o=g(l);if(!o){m.stopPropagation()}return o}function g(l){c.data("current_page",l);k=f.getLinks(l,d);c.empty();k.appendTo(c);var m=b.callback(l,c);return m}e=b.current_page;c.data("current_page",e);i=(!i||i<0)?1:i;b.items_per_page=(!b.items_per_page||b.items_per_page<0)?1:b.items_per_page;if(!a.PaginationRenderers[b.renderer]){throw new ReferenceError("Pagination renderer '"+b.renderer+"' was not found in jQuery.PaginationRenderers object.")}f=new a.PaginationRenderers[b.renderer](i,b);var h=new a.PaginationCalculator(i,b);var j=h.numPages();c.bind("setPage",{numPages:j},function(m,l){if(l>=0&&l<m.data.numPages){g(l);return false}});c.bind("prevPage",function(l){var m=a(this).data("current_page");if(m>0){g(m-1)}return false});c.bind("nextPage",{numPages:j},function(l){var m=a(this).data("current_page");if(m<l.data.numPages-1){g(m+1)}return false});c.bind("currentPage",function(l){return a(this).data("current_page")});k=f.getLinks(e,d);c.empty();k.appendTo(c);b.callback(e,c)}})(jQuery);