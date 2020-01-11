<%@ Control Language="C#" Inherits="System.Web.Mvc.ViewUserControl<dynamic>" %>
<div id="filtro" class="slc">
    <a class="nome">Filtros</a>
    <div class="opcoes filtro">
                                
	    <a class="fechar right" href="#fechar">X</a>
                                                
	    <div class="frm">
		    <label class="topico" for="txtPalavraChave">Palavra-chave:</label>
		    <%= Html.TextBox("txtPalavraChave", "", new { maxlength = 60, @class = "txt" })%>
  
		    <div class="clear"></div>

		    <div class="botoes filtro direita">
			    <input type="button" id="btnCancelar" class="btn fechar" value="Cancelar" />
			    <input type="button" id="btnFiltrar" class="btn executar" value="Filtrar" />
		    </div>

	    </div>
    </div>
</div>
