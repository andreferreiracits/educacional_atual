(function(a){a.fn.pajinate=function(b){function o(d){new_page=parseInt(e.data(c))-1;if(a(d).siblings(".active_page").prev(".page_link").length==true){s(d,new_page);q(new_page)}else if(b.wrap_around){q(k-1)}}function p(d){new_page=parseInt(e.data(c))+1;if(a(d).siblings(".active_page").next(".page_link").length==true){r(d,new_page);q(new_page)}else if(b.wrap_around){q(0)}}function q(a){var f=parseInt(e.data(d));var g=false;start_from=a*f;end_on=start_from+f;var j=i.hide().slice(start_from,end_on);j.show();h.find(b.nav_panel_id).children(".page_link[longdesc="+a+"]").addClass("active_page "+m).siblings(".active_page").removeClass("active_page "+m);e.data(c,a);h.find(b.nav_info_id).html(b.nav_label_info.replace("{0}",start_from+1).replace("{1}",start_from+j.length).replace("{2}",i.length));t();u()}function r(c,d){var e=d;var f=a(c).siblings(".active_page");if(f.siblings(".page_link[longdesc="+e+"]").css("display")=="none"){j.each(function(){a(this).children(".page_link").hide().slice(parseInt(e-b.num_page_links_to_display+1),e+1).show()})}}function s(c,d){var e=d;var f=a(c).siblings(".active_page");if(f.siblings(".page_link[longdesc="+e+"]").css("display")=="none"){j.each(function(){a(this).children(".page_link").hide().slice(e,e+parseInt(b.num_page_links_to_display)).show()})}}function t(){if(!j.children(".page_link:visible").hasClass("last")){j.children(".more").show()}else{j.children(".more").hide()}if(!j.children(".page_link:visible").hasClass("first")){j.children(".less").show()}else{j.children(".less").hide()}}function u(){if(j.children(".last").hasClass("active_page")){j.children(".next_link").add(".last_link").addClass("no_more "+n)}else{j.children(".next_link").add(".last_link").removeClass("no_more "+n)}if(j.children(".first").hasClass("active_page")){j.children(".previous_link").add(".first_link").addClass("no_more "+n)}else{j.children(".previous_link").add(".first_link").removeClass("no_more "+n)}}var c="current_page";var d="items_per_page";var e;var f={item_container_id:".content",items_per_page:10,nav_panel_id:".page_navigation",nav_info_id:".info_text",num_page_links_to_display:20,start_page:0,wrap_around:false,nav_label_first:"First",nav_label_prev:"Prev",nav_label_next:"Next",nav_label_last:"Last",nav_order:["first","prev","num","next","last"],nav_label_info:"Showing {0}-{1} of {2} results",show_first_last:true,abort_on_small_lists:false,jquery_ui:false,jquery_ui_active:"ui-state-highlight",jquery_ui_default:"ui-state-default",jquery_ui_disabled:"ui-state-disabled"};var b=a.extend(f,b);var g;var h;var i;var j;var k;var l=b.jquery_ui?b.jquery_ui_default:"";var m=b.jquery_ui?b.jquery_ui_active:"";var n=b.jquery_ui?b.jquery_ui_disabled:"";return this.each(function(){h=a(this);g=a(this).find(b.item_container_id);i=h.find(b.item_container_id).children();if(b.abort_on_small_lists&&b.items_per_page>=i.size())return h;e=h;e.data(c,0);e.data(d,b.items_per_page);var f=g.children().size();var n=Math.ceil(f/b.items_per_page);var v='<span class="ellipse more">...</span>';var w='<span class="ellipse less">...</span>';var x=!b.show_first_last?"":'<a class="first_link '+l+'" href="">'+b.nav_label_first+"</a>";var y=!b.show_first_last?"":'<a class="last_link '+l+'" href="">'+b.nav_label_last+"</a>";var z="";for(var A=0;A<b.nav_order.length;A++){switch(b.nav_order[A]){case"first":z+=x;break;case"last":z+=y;break;case"next":z+='<a class="next_link '+l+'" href="">'+b.nav_label_next+"</a>";break;case"prev":z+='<a class="previous_link '+l+'" href="">'+b.nav_label_prev+"</a>";break;case"num":z+=w;var B=0;while(n>B){z+='<a class="page_link '+l+'" href="" longdesc="'+B+'">'+(B+1)+"</a>";B++}z+=v;break;default:break}}j=h.find(b.nav_panel_id);j.html(z).each(function(){a(this).find(".page_link:first").addClass("first");a(this).find(".page_link:last").addClass("last")});j.children(".ellipse").hide();j.find(".previous_link").next().next().addClass("active_page "+m);i.hide();i.slice(0,e.data(d)).show();k=h.children(b.nav_panel_id+":first").children(".page_link").size();b.num_page_links_to_display=Math.min(b.num_page_links_to_display,k);j.children(".page_link").hide();j.each(function(){a(this).children(".page_link").slice(0,b.num_page_links_to_display).show()});h.find(".first_link").click(function(b){b.preventDefault();s(a(this),0);q(0)});h.find(".last_link").click(function(b){b.preventDefault();var c=k-1;r(a(this),c);q(c)});h.find(".previous_link").click(function(b){b.preventDefault();o(a(this))});h.find(".next_link").click(function(b){b.preventDefault();p(a(this))});h.find(".page_link").click(function(b){b.preventDefault();q(a(this).attr("longdesc"))});q(parseInt(b.start_page));t();if(!b.wrap_around)u()});}})(jQuery)