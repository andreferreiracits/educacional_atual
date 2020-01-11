<%@ Control Language="C#" Inherits="System.Web.Mvc.ViewUserControl<ProvaColegiada.TabelaViews.BancoQuestaoView>" %>
<%@ Import Namespace="ProvaColegiada.TabelaViews.Shared"%>
<%@ Import Namespace="ProvaColegiada.Models" %>

<div class="areaConfiguracao">
<%  
    using (Html.BeginForm("ConfiguracaoBanco", "Administracao", FormMethod.Post, new { @id = "frmConfiguracaoBanco" }))
    {
%>

    <div class="areaConfiguracoesAdministracao">
        <div class="divisaoQuestao">
            <div class="tituloDivisao">Informações</div>
            <div class="textoDivisao">Informe os dados básicos do banco.</div>
        </div>

        <div class="linhaPar">
            <label class="SEC02511_texto">Nome: <span class="obrigatorio">*</span></label>
            <span class="SEC02511_texto">
                <input type="text" id="txtNome" name="txtNome" class="txt" value="<%= Model.Nome %>" />
            </span>
        </div>

        <div class="linhaImpar">
            <label class="SEC02511_texto">Descrição: </label>
            <span class="SEC02511_texto">
                <input type="text" id="txtDescricao" name="txtDescricao" class="txt" value="<%= Model.Descricao %>" />
            </span>
        </div>

        <div class="divisaoQuestao">
            <div class="tituloDivisao">Tipo</div>
            <div class="textoDivisao">Tipo do banco.</div>
        </div>

        <div class="linhaPar">
            <label class="SEC02511_texto">Tipo: <span class="obrigatorio">*</span></label>
            <span class="SEC02511_texto">
                <%
                    IList<SelectListItem> bancos = (IList<SelectListItem>)ViewData["TiposBanco"];
                %>
                <%= Html.DropDownList("rdoTipoBanco", bancos, new { @class = "slc banco" })%>
            </span>
        </div>

        <div class="divisaoQuestao">
            <div class="tituloDivisao">Fluxo</div>
            <div class="textoDivisao">Defina se o usuário poderá só cadastrar a questão e publicar ou cadastrar utilizando os papéis de cadastro, revisor e editor..</div>
        </div>
        
        <div class="linhaPar">
		    <div class="dadosCriacao">
			    <input id="rdoFluxoSimples" name="rdoFluxo" type="radio" value="<%=(int)BancoQuestao.Fluxo.Simples %>" <%=Model.CheckFluxoSimples %>/>
			    <label for="rdoFluxoSimples">Fluxo simples</label>
								   
			    <input id="rdoFluxoRevisao" name="rdoFluxo" type="radio" value="<%=(int)BancoQuestao.Fluxo.Revisao %>" <%=Model.CheckFluxoRevisao %>/>
			    <label for="rdoFluxoRevisao">Fluxo com revisão</label>
		    </div>
        </div>


        <div class="divisaoQuestao">
            <div class="tituloDivisao">Visibilidade</div>
            <div class="textoDivisao">Defina se a visibilidade do novo banco será habilitada ou não na seção de Avaliações</div>
        </div>
        <div class="linhaPar">
		    <div class="dadosCriacao">
			    <input id="rdoVisibilidadeSemR" name="rdoVisibilidade" type="radio" value="1" <%=Model.CheckSemRestricao %>/>
			    <label for="rdoVisibilidadeSemR">Sem restrições</label>
								   
			    <input id="rdoVisibilidadeComR" name="rdoVisibilidade" type="radio" value="0" <%=Model.CheckComRestricao %>/>
			    <label for="rdoVisibilidadeComR">Com restrições</label>
		    </div>
        </div>

        <div class="divisaoQuestao">
            <div class="tituloDivisao">Portais</div>
            <div class="textoDivisao">Quais portais terão acesso ao banco</div>
        </div>
        <div class="linhaPar">
		    <div class="dadosCriacao">
                <input name="chkTipoPortal" value="0" type="hidden" />
			    <%
                    IList<SelectListItem> tipos = (IList<SelectListItem>)ViewData["Portais"];
                    foreach (SelectListItem tipo in tipos)
                {
                    %>
                    <input name="chkTipoPortal" type="checkbox" value="<%=tipo.Value%>" <%= (tipo.Selected) ? "checked=\"checked\"" : "" %>  />
                    <label for="chkTipoPortal_<%=tipo.Value%>"><%=tipo.Text%></label>
                    <%
                }
                %>
		    </div>
        </div>

        

    </div>
<%  } %>

    <div class="navegacaoBotoes">
        <div class="btnEspacamento">
            <%= Html.ActionLink("Cancelar", "Index", "Administracao", new { @class = "btnCancelar" })%>
        </div>
        <div class="btnEspacamento direita">
            <a id="btnAvancarConfiguracao" class="btnNav">Avançar &raquo;</a>
        </div>
    </div>
</div>
