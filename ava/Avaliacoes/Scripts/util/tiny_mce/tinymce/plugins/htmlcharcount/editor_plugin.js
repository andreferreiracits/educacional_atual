/**
* $Id: editor_plugin_src.js 201 2007-02-12 15:56:56Z spocke $
*
* @author Chad Killingsworth, Missouri State University
*/

(function() {
    tinymce.create('tinymce.plugins.HTMLCharCount', {		
		// ALTERADO - JAMAICA 091029 - Contagem do texto com HTML ou SOMENTE TEXTO PURO
        _CountText: false,

        _MaxLength: 0,
        _CharsString: '',
        _RemainString: '',

        init: function(ed, url) {
            var t = this;
            t._MaxLength = ed.getParam('htmlcharcount_maxchars', 0);
            t._CountText = ed.getParam('htmlcharcount_countText', false);

            if(ed.getParam('theme', '') != 'advanced')
                return;

						if (!t._CountText){
							t._CharsString = ' ' + ed.getLang('htmlcharcount.chars', 'caracteres HTML');
							t._RemainString = ' ' + ed.getLang('htmlcharcount.remaining', 'caracteres HTML restantes');
						}
						else{
							t._CharsString = ' caracteres';
							t._RemainString = ' caracteres restantes';
						}

            ed.onPostRender.add(function(ed, cm) {
               	var PathTableRow = document.getElementById(ed.id + "_path_row").parentNode;
                tinymce.DOM.add(PathTableRow, 'div', { 'style': 'float: right', 'id': ed.id + '_charCounter' });
            });


            ed.onNodeChange.add(t._updateCount, t);
            ed.onKeyUp.add(t._updateCount, t);
        },

        _updateCount: function(ed, o) {
            document.getElementById(ed.id + '_charCounter').innerHTML = this._getPluginContent(ed);
        },

        _getPluginContent: function(ed) {
            //var currCount = ed.getContent().length;
            var currCount;

            if (!this._CountText){
							currCount = ed.getContent().length;
						}
						else{
							//currCount = ed.contentDocument.documentElement.textContent.length;
							try{
								//innerText so funciona no IE
								currCount = ed.contentDocument.documentElement.innerText.length;
							}catch(e){
								try{
									//textContent so funciona no FF
									currCount = ed.contentDocument.documentElement.textContent.length;
								}catch(e){currCount = ed.getContent().length;}
							}
						}

            if (this._MaxLength < 1)
                return currCount + this._CharsString;

            if (this._MaxLength > currCount)
                return (this._MaxLength - currCount) + this._RemainString;

            return "<span style='color: red'>" + (this._MaxLength - currCount) + this._RemainString + '</span>';
        },

        getInfo: function() {
            return {
                longname: 'HTML Character Counter plugin',
                author: 'Chad Killingsworth, Missouri State University',
                authorurl: 'http://www.missouristate.edu/web/',
                version: "1.0"
            };
        }
    });

    // Register plugin
    tinymce.PluginManager.add('htmlcharcount', tinymce.plugins.HTMLCharCount);
})();