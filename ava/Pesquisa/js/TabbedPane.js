/*
 * TabbedPane.js v1.0.0 -- Dynamic AJAX Tabs for Prototype
 * Copyright (c) 2007-2008 Jesse Farmer <jesse@20bits.com>
 * Licensed under the MIT license.
 */
Hash.prototype.toObject = Hash.prototype.toObject || function() { return Object.clone(this); }

var TabbedPane = function(pane, page_urls, args) {
	var args = $H({asynchronous: true, method: 'get', evalScripts: true}).merge(args).toObject();	
	this.load_page = function(page_id) {
		new Ajax.Updater(pane, page_urls[page_id], args);
	}

	for (page_id in page_urls) {
		Event.observe(page_id, 'click', function(e) {
			if ('function' == typeof(args.onClick))
				args.onClick(e);
			
			for (page_id in page_urls) $(page_id).show();
			
			this.load_page(Event.element(e).hide().id);
			if(Event.element(e).id == "pane1")
			{
				$('pane2_ON').hide();
				$('pane1_ON').show();
			}
			else
			{
				$('pane2_ON').show();
				$('pane1_ON').hide();
			}
			Event.stop(e);
		}.bindAsEventListener(this));
		
		if ($(page_id).hasClassName('active')) { 
			this.load_page(page_id); 
		}
	}
}


	function buscaHTML(pagina)
		{
			var url = 'indice.asp';
			var pars = 'pgAtual='+pagina;
		
			var myAjax = new Ajax.Updater( 'MyPane', url, { method: 'post', parameters: pars });

		}