<%@ Control Language="C#" Inherits="System.Web.Mvc.ViewUserControl<dynamic>" %>
<%@ Import Namespace="ProvaColegiada.TabelaViews "%>
<%@ Import Namespace="ProvaColegiada.TabelaViews.Shared "%>
<%@ Import Namespace="ProvaColegiada.TabelaViews.Classificacao "%>
<%@ Import namespace="ProvaColegiada.Models.Classificacao" %>
<div id="filtro" class="slc">
	<a class="nome">Filtros</a>
	<div class="opcoes filtro">
                                
		<a class="fechar right" href="#fechar">X</a>
        <a id="helpFilCadQuestao" class="btn sec_ajuda" href="javascript:void(0)">?</a>

		<div class="frm">
			<label class="topico" for="txtPalavraChave">Palavra-chave:</label>
			<%= Html.TextBox("txtPalavraChave", "", new { maxlength = 60, @class = "txt" })%>
  
			<div class="clear"></div>

			<label class="topico">Finalidade:</label>
			<span class="SEC02511_texto">
			<%
                Dictionary<int, int[]> tipos = (Dictionary<int, int[]>)ViewData["TiposBanco"];
                int count = 0;
                string idsBancos = "";
				IList<SelectListItem> bancos = (IList<SelectListItem>)ViewData["Bancos"];
				foreach (SelectListItem banco in bancos) {
                    idsBancos = String.Join("=", tipos[count].Select(c => c + "").ToArray());
                %>
					<%=Html.RadioButton("rdoFinalidade", banco.Value, false, new { @id = "rdoFinalidade_" + banco.Value + "=" + idsBancos  })%>
					<%=banco.Text%>

				<% count++;
                }
				%>
                <%=Html.RadioButton("rdoFinalidade", 0, true, new { @id = "rdoFinalidade_0" })%>
                Todos
			</span>
			<div class="clear"></div>

			<label class="topico" >Banco:</label>
			<a class="btn" id="btnAbrirBanco">Selecionar</a>
			<div class="filtros">
				<div class="banco"  id="fitrosBanco">
				</div>
			</div>

			<div class="clear"></div>

			<label class="topico" >Classificação:</label>
				<div class="classificacaoCriterios"><% foreach (string v in EnumClassificacaoView.btnsFiltroClassificacao(tipos)) { Html.RenderPartial(v); } %></div>


			<div class="clear"></div>
			<div id="maisMenos" class="hide">
				<label class="topico" for="slcStatus">Estado:</label>
				<%= Html.DropDownList("slcStatus", (IEnumerable<SelectListItem>)ViewData["Status"], new { @class = "slc" })%>
									
				<div class="clear"></div>
									
				<label class="topico" for="slcTipo">Tipo:</label>
				<%= Html.DropDownList("slcTipo", (IEnumerable<SelectListItem>)ViewData["Tipo"], new { @class = "slc" })%>
									
				<div class="clear"></div>

				<label class="topico" for="txtModificado">Data de criação:</label>
				<%= Html.TextBox("txtModificadoInicial", "", new { @id = "txtModificadoInicial", @size = 14, @maxlength = 20, @class = "txt txtData" })%>
				<span>a</span>
				<%= Html.TextBox("txtModificadoFinal", ViewData["Modificado"], new { @id = "txtModificadoFinal", @size = 14, @maxlength = 20, @class = "txt txtData" })%>
			</div> 
		</div>
		<div class="clear"></div>
		<div class="botoes filtro direita">
			<input type="button" id="btnCancelar" class="btn fechar" value="Cancelar" />
			<input type="button" id="btnFiltrar" class="btn executar" value="Filtrar" />
		</div>
		<div class="botoes direita">
			<a id="qtdOpcao" class="lnk">
				<div class="filtro_down">mais opções</div>|<div class="filtro_up">menos opções</div>
			</a>
		</div>
	</div>
</div>

