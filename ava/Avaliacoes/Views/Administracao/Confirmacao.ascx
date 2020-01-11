<%@ Control Language="C#" Inherits="System.Web.Mvc.ViewUserControl<ProvaColegiada.TabelaViews.BancoQuestaoView>" %>
<%@ Import Namespace="ProvaColegiada.TabelaViews.Shared"%>
<%@ Import Namespace="ProvaColegiada.TabelaViews"%>
<%@ Import Namespace="ProvaColegiada.Models" %>

<div class="areaConfiguracao">
<%  
    using (Html.BeginForm("ConfirmacaoBanco", "Administracao", FormMethod.Post, new { @id = "frmConfirmacaoBanco" }))
    {
%>

    <div class="areaConfiguracoesAdministracao">
        <div class="divisaoQuestao">
            <div class="tituloDivisao">Informações</div>
            <div class="textoDivisao">Dados básicos do banco.</div>
            <a class="btn direita btnConfirmacaoEditarConfiguracao" >Editar</a>
        </div>

        <div class="linhaImpar">
            <label class="questao">Nome:</label>
            <span class="SEC02511_texto"><%= Model.Nome%></span>
        </div>
        <div class="linhaImpar">
            <label class="questao">Descrição:</label>
            <span class="SEC02511_texto"><%= Model.Descricao%></span>
        </div>

        <div class="divisaoQuestao">
            <div class="tituloDivisao">Tipo</div>
            <div class="textoDivisao">Tipo do banco.</div>
            <a class="btn direita btnConfirmacaoEditarConfiguracao" >Editar</a>
        </div>
        <div class="linhaImpar">
            <label class="questao">Tipo:</label>
            <span class="SEC02511_texto"><%= Model.TipoBanco%></span>
        </div>

        <div class="divisaoQuestao">
            <div class="tituloDivisao">Fluxo</div>
            <div class="textoDivisao">Papéis permitidos para os usuários deste novo banco</div>
            <a class="btn direita btnConfirmacaoEditarConfiguracao" >Editar</a>
        </div>
        <div class="linhaImpar">
            <label class="questao">Tipo:</label>
            <span class="SEC02511_texto"><%= Model.Fluxo%></span>
        </div>

        <div class="divisaoQuestao">
            <div class="tituloDivisao">Visibilidade</div>
            <div class="textoDivisao">Defina se a visibilidade do novo banco será habilitada ou não na seção de Avaliações</div>
            <a class="btn direita btnConfirmacaoEditarConfiguracao" >Editar</a>
        </div>
        <div class="linhaImpar">
            <label class="questao">Tipo de visibilidade:</label>
            <span class="SEC02511_texto"><%= Model.Visibilidade%></span>
        </div>

        <div class="divisaoQuestao">
            <div class="tituloDivisao">Portais</div>
            <div class="textoDivisao">Quais portais terão acesso ao banco</div>
            <a class="btn direita btnConfirmacaoEditarConfiguracao" >Editar</a>
        </div>
        <div class="linhaPar">
		    <div class="dadosCriacao">
			    <%
                    IList<SelectListItem> tipos = (IList<SelectListItem>)ViewData["Portais"];
                    foreach (SelectListItem tipo in tipos)
                {
                    if (tipo.Selected)
                    { 
                    %>
                    <div class="textoDivisao"><%=tipo.Text%></div>
                    <%
                    }
                }
                %>
		    </div>
        </div>

        <% Html.RenderPartial(Model.viewConfirmacaoPermissao, Model); %>

    </div>
<%  } %>

    <div class="navegacaoBotoes">
        <div class="btnEspacamento">
            <%= Html.ActionLink("Cancelar", "Index", "Administracao", new { @class = "btnCancelar" })%>
        </div>
        <div class="btnEspacamento direita">
            <a id="btnVoltarConfirmacao" class="btnNav">&laquo; Voltar</a>
            <a id="btnSalvarConfirmacao" class="btnNav">Salvar</a>
        </div>
    </div>
</div>
