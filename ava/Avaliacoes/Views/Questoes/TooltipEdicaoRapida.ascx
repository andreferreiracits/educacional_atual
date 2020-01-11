<%@ Control Language="C#" Inherits="System.Web.Mvc.ViewUserControl<ProvaColegiada.TabelaViews.QuestaoView>" %>
<%@ Import namespace="ProvaColegiada.Models.Question" %>
<%@ Import namespace="ProvaColegiada.TabelaViews" %>
<%@ Import namespace="ProvaColegiada.TabelaViews.Classificacao" %>
<div id="edicaorapida" class="slc SEC02511">
<%  using (Html.BeginForm("SalvarEdicaoRapida", "Questoes", FormMethod.Post, new { @id = "frmEdicaoRapida" }))
	{ %>
	<%= Html.Hidden("idQuestaoSalvar", Model.Id)%>
		<div class="opcoes filtro opFiltroQuestao">
			<a class="fechar right" href="#fechar">X</a>
			<div class="frm">
				<% if (Model.btnsAdicionarClassificacao.Length > 0)
				   { %>
				<label class="topico" >Classificação:</label>
				<div class="classificacaoCriterios">
                <% foreach (string v in Model.btnsAdicionarClassificacao)
	   {
		   Html.RenderPartial(v);
	   }
				   }
				%></div>
			
				<div class="clear"></div>

				<label class="topico" for="txtIdentificador">Identificador:</label>
				<input type="text" name="txtIdentificador" id="txtIdentificador" class="txt" value="<%=Model.Identificador %>" maxlength="500" />

				<div class="clear"></div>

				<div class="clear"></div>

					<div class="lnCompartilha">
                        <!--label class="topico">Compartilhamento:</label> 
                        <label class="itenCompartilhada"><input id="rdoCompartilhadaPrivada" name="rdoCompartilhada" type="radio" value="0" < %=Model.CompartilhadaPrivada %>/> Privada</label>
                        <label class="itenCompartilhada"><input id="rdoCompartilhadaEscola" name="rdoCompartilhada" type="radio" value="1" < %=Model.CompartilhadaEscola %>/> Escola</label-->
                        <% Html.RenderPartial(Model.CompartilhamentoView, Model); %> 
                    </div>
                
                <div class="clear"></div>
					<label class="topico" for="slcOrigem">Origem:</label>
					
					 <%= Html.DropDownList("slcOrigem", (IEnumerable<SelectListItem>)Model.Origem, new { @id = "slcOrigem", @class = "slc edicaoRapida" })%>               
					
                    <div class="clear"></div>

                    <label class="topico" for="slcEstado">Status:</label>
					
					 <%= Html.DropDownList("slcEstado", (IEnumerable<SelectListItem>)Model.listaSelectStatus, new { @id = "slcEstado", @class = "slc edicaoRapida" })%>               
					
                    <div class="clear"></div>

					<label class="topico">Ano:</label>
					<input type="text" name="txtAno" id="txtAno" class="txt" value="<%=Model.Ano%>" maxlength="4" />

                    <div class="clear"></div>

                    <% if (((ProvaColegiada.Controllers.BaseController)this.ViewContext.Controller).Usuario.AdministradorPortal || ((ProvaColegiada.Controllers.BaseController)this.ViewContext.Controller).Usuario.PermissaoExtra)
       {
           %>
    
                    <label class="topico">Grau de dificuldade:</label>
                    <%= Html.DropDownList("slcDificuldade", (IEnumerable<SelectListItem>)Model.GrauDificuldade, new { @id = "slcDificuldade", @class = "slc edicaoRapida" })%>

                    <div class="clear"></div>
    <% } %>                
                    <label class="topico">Palavras-chave:</label>
                    

                    <div id="edicaoRapidaF" class="boxTag">
                        <input type="hidden" name="txtTags" id="txtTags" class="txt" value="<%=Model.Tags %>" />
                        <div class="tagInptBox">
                            <input type="text" name="txtEditavel" id="txtEditavel" maxlength="25" class="txt txtTag" value="" />
                        </div>
                    </div>
					
			</div>
			<div class="clear"></div>
			<div class="botoes filtro direita">
				<input type="button" id="btnCancelarRapida" class="btn fechar" value="Cancelar" />
				<input type="button" id="btnAtualizarRapida" class="btn executar" value="Atualizar" />
			</div>
								
		</div>
	</div>
	<%} %>

