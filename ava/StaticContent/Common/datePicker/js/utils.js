(function(g){EYE.extend({getPosition:function(a,b){var c=0,d=0,e=a.style,f=!1;if(b&&"none"==jQuery.curCSS(a,"display")){var g=e.visibility,i=e.position,f=!0;e.visibility="hidden";e.display="block";e.position="absolute"}var h=a;if(h.getBoundingClientRect)d=h.getBoundingClientRect(),c=d.left+Math.max(document.documentElement.scrollLeft,document.body.scrollLeft)-2,d=d.top+Math.max(document.documentElement.scrollTop,document.body.scrollTop)-2;else{c=h.offsetLeft;d=h.offsetTop;h=h.offsetParent;if(a!=h)for(;h;)c+= h.offsetLeft,d+=h.offsetTop,h=h.offsetParent;jQuery.browser.safari&&"absolute"==jQuery.curCSS(a,"position")&&(c-=document.body.offsetLeft,d-=document.body.offsetTop);for(h=a.parentNode;h&&"BODY"!=h.tagName.toUpperCase()&&"HTML"!=h.tagName.toUpperCase();)"inline"!=jQuery.curCSS(h,"display")&&(c-=h.scrollLeft,d-=h.scrollTop),h=h.parentNode}!0==f&&(e.display="none",e.position=i,e.visibility=g);return{x:c,y:d}},getSize:function(a){var b=parseInt(jQuery.curCSS(a,"width"),10),c=parseInt(jQuery.curCSS(a, "height"),10),d=0,e=0;if("none"!=jQuery.curCSS(a,"display"))d=a.offsetWidth,e=a.offsetHeight;else{var f=a.style,g=f.visibility,i=f.position;f.visibility="hidden";f.display="block";f.position="absolute";d=a.offsetWidth;e=a.offsetHeight;f.display="none";f.position=i;f.visibility=g}return{w:b,h:c,wb:d,hb:e}},getClient:function(a){var b;a?(b=a.clientWidth,a=a.clientHeight):(a=document.documentElement,b=window.innerWidth||self.innerWidth||a&&a.clientWidth||document.body.clientWidth,a=window.innerHeight|| self.innerHeight||a&&a.clientHeight||document.body.clientHeight);return{w:b,h:a}},getScroll:function(a){var b=0,c=0,d=0,e=0,f=0,g=0;a&&"body"!=a.nodeName.toLowerCase()?(b=a.scrollTop,c=a.scrollLeft,d=a.scrollWidth,e=a.scrollHeight):(document.documentElement?(b=document.documentElement.scrollTop,c=document.documentElement.scrollLeft,d=document.documentElement.scrollWidth,e=document.documentElement.scrollHeight):document.body&&(b=document.body.scrollTop,c=document.body.scrollLeft,d=document.body.scrollWidth, e=document.body.scrollHeight),"undefined"!=typeof pageYOffset&&(b=pageYOffset,c=pageXOffset),f=self.innerWidth||document.documentElement.clientWidth||document.body.clientWidth||0,g=self.innerHeight||document.documentElement.clientHeight||document.body.clientHeight||0);return{t:b,l:c,w:d,h:e,iw:f,ih:g}},getMargins:function(a,b){var c=jQuery.curCSS(a,"marginTop")||"",d=jQuery.curCSS(a,"marginRight")||"",e=jQuery.curCSS(a,"marginBottom")||"",f=jQuery.curCSS(a,"marginLeft")||"";return b?{t:parseInt(c, 10)||0,r:parseInt(d,10)||0,b:parseInt(e,10)||0,l:parseInt(f,10)}:{t:c,r:d,b:e,l:f}},getPadding:function(a,b){var c=jQuery.curCSS(a,"paddingTop")||"",d=jQuery.curCSS(a,"paddingRight")||"",e=jQuery.curCSS(a,"paddingBottom")||"",f=jQuery.curCSS(a,"paddingLeft")||"";return b?{t:parseInt(c,10)||0,r:parseInt(d,10)||0,b:parseInt(e,10)||0,l:parseInt(f,10)}:{t:c,r:d,b:e,l:f}},getBorder:function(a,b){var c=jQuery.curCSS(a,"borderTopWidth")||"",d=jQuery.curCSS(a,"borderRightWidth")||"",e=jQuery.curCSS(a,"borderBottomWidth")|| "",f=jQuery.curCSS(a,"borderLeftWidth")||"";return b?{t:parseInt(c,10)||0,r:parseInt(d,10)||0,b:parseInt(e,10)||0,l:parseInt(f,10)||0}:{t:c,r:d,b:e,l:f}},traverseDOM:function(a,b){b(a);for(a=a.firstChild;a;)EYE.traverseDOM(a,b),a=a.nextSibling},getInnerWidth:function(a,b){var c=a.offsetWidth;return b?Math.max(a.scrollWidth,c)-c+a.clientWidth:a.clientWidth},getInnerHeight:function(a,b){var c=a.offsetHeight;return b?Math.max(a.scrollHeight,c)-c+a.clientHeight:a.clientHeight},getExtraWidth:function(a){return g.boxModel? (parseInt(g.curCSS(a,"paddingLeft"))||0)+(parseInt(g.curCSS(a,"paddingRight"))||0)+(parseInt(g.curCSS(a,"borderLeftWidth"))||0)+(parseInt(g.curCSS(a,"borderRightWidth"))||0):0},getExtraHeight:function(a){return g.boxModel?(parseInt(g.curCSS(a,"paddingTop"))||0)+(parseInt(g.curCSS(a,"paddingBottom"))||0)+(parseInt(g.curCSS(a,"borderTopWidth"))||0)+(parseInt(g.curCSS(a,"borderBottomWidth"))||0):0},isChildOf:function(a,b,c){if(a==b)return!0;if(!b||!b.nodeType||1!=b.nodeType)return!1;if(a.contains&&!g.browser.safari)return a.contains(b); if(a.compareDocumentPosition)return!!(a.compareDocumentPosition(b)&16);for(b=b.parentNode;b&&b!=c;){if(b==a)return!0;b=b.parentNode}return!1},centerEl:function(a,b){var c=EYE.getScroll(),d=EYE.getSize(a);(!b||"vertically"==b)&&g(a).css({top:c.t+(Math.min(c.h,c.ih)-d.hb)/2+"px"});(!b||"horizontally"==b)&&g(a).css({left:c.l+(Math.min(c.w,c.iw)-d.wb)/2+"px"})}});g.easing.easeout||(g.easing.easeout=function(a,b,c,d,e){return-d*((b=b/e-1)*b*b*b-1)+c})})(jQuery);