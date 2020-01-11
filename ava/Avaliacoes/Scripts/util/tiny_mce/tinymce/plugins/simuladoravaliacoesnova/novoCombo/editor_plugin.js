/**
 * $Id: editor_plugin_src.js 652 2008-02-29 13:09:46Z spocke $
 *
 * @author Moxiecode
 * @copyright Copyright © 2004-2008, Moxiecode Systems AB, All rights reserved.
 */

(function() {
		
	tinymce.create('tinymce.plugins.novoCombo', {
				   
		init : function(ed, url) {
			

			var t = this;
			
			t.editor = ed;
			
			function isComboElm(n) {
				return /^(mceCombo)$/.test(n.className);
			};
			
					// Register commands
			ed.addCommand('mceCombo', function(){t._insereCombo(ed,url)}, t);
			
			ed.addButton('novoCombo', {title : 'Caixa de opções de texto', image: url+'/combo.gif', cmd : 'mceCombo'});
			
			ed.onPostProcess.add(function(ed, o) {});
			
			ed.onBeforeExecCommand.add(function(ed, cmd, ui, val) {
   				//console.debug('Command is to be executed: ' + cmd);
			});
			
			
      		ed.onClick.add(function(ed, e) {
			
				if (e.target.className == 'mceCombo'){
						ed.windowManager.open({
						close_previous : "yes",
						title : 'Combo',
						url :  url+'/combos.asp',
						width : 475,
						height : 300,
						inline : "yes",
						scrollbars : "yes"
						
						}, {
							editor_id : e.target.id
						});
					
				}
				
      		});
  			
			ed.onPreProcess.add(function(ed, o) {
				if(o.get){
					var cc = 0;
					
					tinymce.each(ed.dom.select('IMG', o.node), function(n,k) {
						if(n.className == 'mceCombo'){
							vals_c_split = tinymce.explode(ed.dom.getAttrib(n.id,'the_vals'),'|');
							vals_c_split.splice(0,1);
							vals_c_split.sort();
							_ob = ed.dom.create('SELECT', {'id':'lacuna_input_'+(cc+1), 'name':'lacuna_input_'+(cc+1), 'class':'mceCombo', 'style':'font-family:verdana;font-size:12px;border:solid 2px #FFCC66'});
							tinymce.each(vals_c_split,function(e,k){
								ed.dom.add(_ob, 'OPTION',{'value':e},e)								   
							})
							
							ed.dom.replace(_ob,n);
							cc++;
						}else if (n.className == 'mceInput'){
							_ob = ed.dom.create('INPUT', {'type':'text','id':'lacuna_input_'+(cc+1), 'name':'lacuna_input_'+(cc+1), 'class':'mceInput', 'style':'font-family:verdana;font-size:12px;border:solid 2px #FFCC66'});
							ed.dom.replace(_ob,n);
							cc++;	
						}
						
					});
					
					
				}
			});
			
			ed.onBeforeSetContent.add(function(ed,o){
				//alert(ed.getParam('valores_mce_input')[0])	
			});
			
			ed.onPreInit.add(function(ed) {
          																				
      		});
			
			ed.onNodeChange.add(function(ed, cm, n) {
				cm.setActive('novoCombo', n.nodeName == 'IMG' && isComboElm(n));
			});
			
			ed.onSetContent.add(function() {
				_b = ed.getBody();
				tinymce.each(ed.dom.select('SELECT,INPUT', _b), function(n,c) {
					
					if (n.tagName == 'INPUT')
						_ob = ed.dom.create('IMG',{id:'lacuna_input_'+(c+1), 'class':'mceInput', src : url+'/input_b.gif','title':'Clique para editar a caixa de texto', 'the_vals' : ed.getParam('valores_mce_input')[c]})
					else if (n.tagName == 'SELECT')
						_ob = ed.dom.create('IMG',{id:'lacuna_input_'+(c+1), 'class':'mceCombo', src : url+'/combo_b.gif','title':'Clique para editar a cortina', 'the_vals' : ed.getParam('valores_mce_input')[c]})											
					ed.dom.replace(_ob,n);
				});
					cont_input = ed.dom.select('IMG.mceCombo,IMG.mceInput').length + 1
					
					
			});
									
		},

		_insereCombo : function(ed,url) {
			
			var _ed = ed
			var _url = url
						
			var el = _ed.dom.create('IMG',{id:'lacuna_input_'+cont_input, 'class':'mceCombo', src :_url+'/combo_b.gif','title':'Clique para editar a cortina','the_vals':'null'});
			_ed.selection.setNode(el);
					
			cont_input++;
					
		},
		
		_parse : function(s) {
			return tinymce.util.JSON.parse('{' + s + '}');
		}
		
		
		
		
	});
	
	// Register plugin
	tinymce.PluginManager.add('novoCombo', tinymce.plugins.novoCombo);
})();