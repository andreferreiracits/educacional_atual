/**
 * $Id: editor_plugin_src.js 652 2008-02-29 13:09:46Z spocke $
 *
 * @author Moxiecode
 * @copyright Copyright © 2004-2008, Moxiecode Systems AB, All rights reserved.
 */
aURLSim = '';
(function() {
		  
	tinymce.create('tinymce.plugins.simulador', {
		init : function(ed, url) {
			var t = this;
			
			aURLSim = url
			
			t.editor = ed;
			
					// Register commands
			ed.addCommand('mceSimulador', t._abreSimulador, t);
			
			
			ed.addButton('simulador', {title : 'Simulador', image: url+'/simulador.gif', cmd : 'mceSimulador'});
			
			
			function isSimuladorElm(n) {
				return /^(mceSimulador)$/.test(n.className);
			};
			
			ed.onNodeChange.add(function(ed, cm, n) {
				cm.setActive('image', false);
				cm.setActive('simulador', n.nodeName == 'IMG' && isSimuladorElm(n));
				
			});

			ed.onInit.add(function() {
				if (ed.settings.content_css !== false)
					ed.dom.loadCSS(url + "/css/content.css");
				
			});
			
			ed.onBeforeSetContent.add(t._scriptToIMG, t);
			
			function getAttr(s, n) {
				n = new RegExp(n + '=\"([^\"]+)\"', 'g').exec(s);

				return n ? ed.dom.decode(n[1]) : '';
			};

			
			ed.onPostProcess.add(function(ed, o) {
				o.content = o.content.replace(/<img[^>]+>/g, function(im) {
					
					var cl = getAttr(im, 'class');
					if (/^(mceSimulador)$/.test(cl)) {	
							
							var atr = getAttr(im, 'title');
						
							im = '<script type="text/javascript">writeSimulador({'+atr+'});</script>';
								
					}
						return im;
				});
				
			});
			
		},

		_abreSimulador : function(url) {
			window.open (aURLSim + "/simuladores.asp","mywindowsim","menubar=1,resizable=0,width=450,height=350,scrollbars=1");
		},
		
		_scriptToIMG : function(ed, o) {
			var t = this, h = o.content;
			
			h = h.replace(/<script[^>]*>\s*write(Simulador)\(\{([^\)]*)\}\);\s*<\/script>/gi, function(a, b, c) {
							
				
				
				ppar = tinymce.util.JSON.parse('{' + c + '}');
				
				
				
				hContent = '<img src="tinymce/jscripts/tiny_mce/plugins/simulador/participe_icone.gif"' ;
				hContent += ' class="mceSimulador"';
				hContent += ' title="'+ed.dom.encode(c)+'"';
				hContent += ' width="' + ppar.x + '"';
				hContent += ' height="' + ppar.y + '"';
				hContent += ' align="' + 'center' + '"';
				hContent += ' />';
				
				return hContent;
				
			});
	
			o.content = h;
		},
		
		_parse : function(s) {
			return tinymce.util.JSON.parse('{' + s + '}');
		}
		
	});
	
	// Register plugin
	tinymce.PluginManager.add('simulador', tinymce.plugins.simulador);
})();