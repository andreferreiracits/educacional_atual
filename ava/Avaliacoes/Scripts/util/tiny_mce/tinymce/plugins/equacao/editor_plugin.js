/**
 * $Id: editor_plugin_src.js 652 2008-02-29 13:09:46Z spocke $
 *
 * @author Moxiecode
 * @copyright Copyright © 2004-2008, Moxiecode Systems AB, All rights reserved.
 */
aURL = '';
oEditorEquacao = '';

(function() {
		  
	tinymce.create('tinymce.plugins.equacao', {
		init : function(ed, url) {
			var t = this;
			
			aURL = url
			
			t.editor = ed;
			oEditorEquacao = ed;
			
			// Register commands
			//ed.addCommand('mceEquacao',function(){
												  	//var eqtSel = ed.selection.getNode().title;
													//window.open (aURL + "/equacao.asp?textEqt="+eqtSel,"mywindowEQ","menubar=1,resizable=0,resizable=1,width=540,height=578,scrollbars=1");
												//}, t);
			// Register commands
			ed.addCommand('mceEquacao', function() {
				var eqtSel = ed.selection.getNode().title;								 
				ed.windowManager.open({
					file : aURL + "/equacao.asp?textEqt="+eqtSel,
					width : 540 + parseInt(ed.getLang('media.delta_width', 0)),
					height : 578 + parseInt(ed.getLang('media.delta_height', 0)),
					inline : 1,
					scrollbars : "yes"
				});
			});
			
			ed.addButton('equacao', {title : 'Editor de Equações', image: url+'/equacoes2.gif', cmd : 'mceEquacao'});

			function isEquacaoElm(n) {
				return /^(mceEquacao)$/.test(n.className);
			};
			
			ed.onNodeChange.add(function(ed, cm, n) {
				cm.setActive('equacao', n.nodeName == 'IMG' && isEquacaoElm(n));
			});
			

			ed.onInit.add(function() {
				
			});
			
			ed.onBeforeSetContent.add(t._scriptToIMG, t);
			
			function getAttr(s, n) {
				n = new RegExp(n + '=\"([^\"]+)\"', 'g').exec(s);

				return n ? ed.dom.decode(n[1]) : '';
			};

			
			ed.onPostProcess.add(function(ed, o) {
				//o.content = o.content.replace(/<imgi[^>]+>/g, function(im) {
					
					//if (/^(mceEquacao)$/.test(cl)) {		
						//var cl = getAttr(im, 'class');
						//var atr = getAttr(im, 'title');
						
						/*im = '<script type="text/javascript">writeEquacao({'+atr+'});</script>';*/
					//}
						
						//return im;
				//});
				
			});
			
		},

		//_abreEquacao : function() {
			
			//var eqtSel = oEditorEquacao.selection.getNode().title;
			//alert(eqtSel)
			//window.open (aURL + "/equacao.asp?textEqt="+eqtSel,"mywindowEQ","menubar=1,resizable=0,width=540,height=578,scrollbars=1");
		//},
		
		_scriptToIMG : function(ed, o) {
			var t = this, h = o.content;
			
			h = h.replace(/<script[^>]*>\s*write(Simulador)\(\{([^\)]*)\}\);\s*<\/script>/gi, function(a, b, c) {
							
				
				hContent = '<img src="tinymce/jscripts/tiny_mce/plugins/simulador/participe_icone.gif"' ;
				hContent += ' class="mceSimulador"';
				hContent += ' title="'+ed.dom.encode(c)+'"';
				hContent += ' width="' + '100' + '"';
				hContent += ' height="' + '100' + '"';
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
	tinymce.PluginManager.add('equacao', tinymce.plugins.equacao);
})();