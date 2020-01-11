/**
 * $Id: editor_plugin_src.js 652 2008-02-29 13:09:46Z spocke $
 *
 * @author Moxiecode
 * @copyright Copyright © 2004-2008, Moxiecode Systems AB, All rights reserved.
 */
aURLBI = '';
(function() {
		  
	tinymce.create('tinymce.plugins.banco_imagens', {
		init : function(ed, url) {
			var t = this;
			
			aURLBI = url
			
			t.editor = ed;
			
					// Register commands
			//ed.addCommand('mceBancoImagens', t._abreBI, t);
			
			ed.addButton('banco_imagens', {title : 'Banco de Imagens', image: url+'/imagens.gif', cmd : 'mceBancoImagens'});
			
			// Register commands
			ed.addCommand('mceBancoImagens', function() {
				var eqtSel = ed.selection.getNode().title;								 
				ed.windowManager.open({
					file : aURLBI + "/arvore1.asp?NomeFuncao=recebe",
					width : 630 + parseInt(ed.getLang('media.delta_width', 0)),
					height : 270 + parseInt(ed.getLang('media.delta_height', 0)),
					inline : 1
				}, {
					plugin_url : url
				});
			});
			
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
					if (/^(mceAnimacaoBI)$/.test(cl)) {	
							
							var atr = t._parse(getAttr(im, 'title'));
							atr.width = getAttr(im, 'width');
							atr.height = getAttr(im, 'height');
						
							im = '<script type="text/javascript">writeFlashBI({' + t._serialize(atr) +'});</script>';
							//alert(im);	
					}
						return im;
						
				});
				
			});
			
		},
		

		_abreBI : function(url) {
			window.open (aURLBI + "/arvore1.asp?NomeFuncao=recebe","mywindowbi","menubar=1,resizable=0,width=630,height=270,scrollbars=0");
		},
		
		_scriptToIMG : function(ed, o) {
			var t = this, h = o.content;
			
			h = h.replace(/<script[^>]*>\s*write(FlashBI)\(\{([^\)]*)\}\);\s*<\/script>/gi, function(a, b, c) {
							
				
				
				ppar = tinymce.util.JSON.parse('{' + c + '}');
				
				
				
				hContent = '<img src="tinymce/jscripts/tiny_mce/plugins/simulador/participe_icone.gif"' ;
				hContent += ' class="mceAnimacaoBI"';
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
		},
		
		_serialize : function(o) {
			return tinymce.util.JSON.serialize(o).replace(/[{}]/g, '');
		}
		
	});
	
	// Register plugin
	tinymce.PluginManager.add('banco_imagens', tinymce.plugins.banco_imagens);
})();