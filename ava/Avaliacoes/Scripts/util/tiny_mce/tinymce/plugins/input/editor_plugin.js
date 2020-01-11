/**
 * $Id: editor_plugin_src.js 652 2008-02-29 13:09:46Z spocke $
 *
 * @author Moxiecode
 * @copyright Copyright © 2004-2008, Moxiecode Systems AB, All rights reserved.
 */
cont_input = 1;

(function() {
		
	tinymce.create('tinymce.plugins.input', {
				   
		init : function(ed, url) {
			

			var t = this;
			
			t.editor = ed;
			
			function isInputElm(n) {
				return /^(mceInput)$/.test(n.className);
			};
			
					// Register commands
			ed.addCommand('mceInput', function(){t._insereInput(ed,url)}, t);
			
			ed.addButton('input', {title : 'Caixa de texto', image: url+'/input.gif', cmd : 'mceInput'});
			
			ed.onPostProcess.add(function(ed, o) {});
			
			ed.onBeforeExecCommand.add(function(ed, cmd, ui, val) {
   				//console.debug('Command is to be executed: ' + cmd);
			});
			
			
      		ed.onClick.add(function(ed, e) {
			
				if (e.target.className == 'mceInput'){
						ed.windowManager.open({
						close_previous : "yes",
						title : 'My File Browser',
						url :  url+'/inputs.asp',
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
					
					//tinymce.each(ed.dom.select('IMG', o.node), function(n,k) {
						//if(n.className == 'mceInput'){
							//_ob = ed.dom.create('INPUT', {'type':'text','id':n.id, 'name':n.id, 'class':'mceInput', 'style':'font-family:verdana;font-size:12px;border:solid 2px #FFCC66'});
							//ed.dom.replace(_ob,n);
						//}
					//});
					//MONTA NO COMBO
					
					
				}
			});
			
			ed.onBeforeSetContent.add(function(ed,o){
				//alert(ed.getParam('valores_mce_input')[0])	
			});
			
			ed.onPreInit.add(function(ed) {
          																				
      		});
			
			ed.onNodeChange.add(function(ed, cm, n) {
				cm.setActive('input', n.nodeName == 'IMG' && isInputElm(n));
			});
			
			ed.onSetContent.add(function() {
				//_b = ed.getBody();
				//tinymce.each(ed.dom.select('INPUT', _b), function(n,c) {
					//_ob = ed.dom.create('IMG',{id:'lacuna_input_'+(c+1), 'class':'mceInput', src : url+'/input_b.gif','title':'Clique para editar a caixa de texto', 'the_vals' : ed.getParam('valores_mce_input')[c]})											
					//ed.dom.replace(_ob,n);
				//});
				//MONTA NO COMBO
				
			});
									
		},

		_insereInput : function(ed,url) {
			var _ed = ed
			var _url = url
						
			var el = _ed.dom.create('IMG',{id:'lacuna_input_'+cont_input, 'class':'mceInput', src :_url+'/input_b.gif','title':'Clique para editar a caixa de texto','the_vals':'null'});
			_ed.selection.setNode(el);
					
			cont_input++;
					
		},
		
		_parse : function(s) {
			return tinymce.util.JSON.parse('{' + s + '}');
		}
		
		
		
		
	});
	
	// Register plugin
	tinymce.PluginManager.add('input', tinymce.plugins.input);
})();