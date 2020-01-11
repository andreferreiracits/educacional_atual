<%@ Page Title="" Language="C#" MasterPageFile="~/Views/Shared/Site.Master" Inherits="System.Web.Mvc.ViewPage" %>
<%@ Import Namespace="ProvaColegiada.TabelaViews.Shared "%>
<%@ Import namespace="ProvaColegiada.Models" %>

<asp:Content ID="JsArea" ContentPlaceHolderID="JsArea" runat="server">
    <%=Html.BundleScript(Avaliacoes.Framework.Web.Bundle.Bundle.Tipo.Sem, "Scripts/view/criacaoProvaCadastro.1.{0.0}.js")%>
    <script src="<%= UtilView.Url("/Scripts/util/jquery.ui.datepicker-pt-BR.js") %>" type="text/javascript"></script>
    <script type="text/javascript" src="<%= UtilView.Url("/Scripts/class/Ajuda.js") %>"></script>
</asp:Content>

<asp:Content ID="CssArea" ContentPlaceHolderID="CssArea" runat="server">
        <link rel="stylesheet" type="text/css" href="<%= UtilView.Url("/Content/css/arvore.css") %>" />

    <!--link href="< %= UtilView.Url("/Content/css/criacao.css") %>" rel="stylesheet" type="text/css" /-->
    <%=Html.BundleCss(Avaliacoes.Framework.Web.Bundle.Bundle.Tipo.Sem, "Content/css/criacao.1.{0.0}.css")%>
        <link rel="stylesheet" type="text/css" href="<%= UtilView.Url("/Content/css/ajudaView.css") %>" />
</asp:Content>


<asp:Content ID="ContentArea" ContentPlaceHolderID="ContentArea" runat="server">
    <div id="conteudo">
	    <div class="caixa">
            <% Html.RenderPartial("MenuConteudo"); %>
			<div id="caixaConteudo" class="caixaConteudo">
			    <div class="clear"></div>
			    
                <% Html.RenderPartial(ViewData["ViewBotaoCriar"].ToString()); %>
                
			    <div id="alerta" class="mensagem comBotao"></div>
			    
            <!-- #region Formulário da Tabela de Questao -->
                <% using (Html.BeginForm("CarregarProvaCadastro", "Criacao", FormMethod.Post, new { @id = "frmTabela", @class = "tbl" }))
                { %>
                <% Html.RenderPartial("NovoFiltroCadastro"); %>
			    <div class="ferramentas hide">
			        <div class="funcao">
			            <div id="acao" class="slc">
		                    <a class="nome">Ações</a>
		                    <div class="opcoes acao">
                                <% foreach (SelectListItem item in (IEnumerable<SelectListItem>)ViewData["UpdateStatus"])
                                   {
                                       if (Convert.ToInt32(item.Value) < 0)
                                           continue;
                                %>
                                    <a class="opcao statusMassa"><%=String.Format("Alterar estado para {0}", item.Text)%><input type="radio" value="<%=item.Value %>" name="hidStatus" /></a>
                                <% } %>
                                <hr />
                                <% if (!((ProvaColegiada.Controllers.BaseController)this.ViewContext.Controller).Usuario.AdministradorPortal && !((ProvaColegiada.Controllers.BaseController)this.ViewContext.Controller).Usuario.PermissaoExtra)
                                   { 
                                %> <%--      if (((ProvaColegiada.Controllers.BaseController)this.ViewContext.Controller).Usuario.TipoPortal != EnumTipoPortal.Positivo)
                                   { --%>
                                <a class="opcao compartilharMassa"><%=String.Format("Alterar compartilhamento para {0}", "Privado")%><input type="radio" value="0" name="hidCompartilhar" /></a>
                                <a class="opcao compartilharMassa"><%=String.Format("Alterar compartilhamento para {0}", "Escola")%><input type="radio" value="1" name="hidCompartilhar" /></a>
                                <%--  } --%>
                                <%  } %>
                                <hr />
		                        <%= Html.ActionLink("Excluir", "ExcluirProva", "Criacao", new { acao = "apagar" }, new { @id = "apagar", @class = "opcao" })%>
		                    </div>
	                    </div>
			            <!--% Html.RenderPartial("oldFiltroCadastro"); %-->
                    </div>
					<div class="filtros"></div>
					<div class="paginacao"></div>
				</div>
				<div class="clear"></div>
				<table id="tblProvas" class="tabela" width="100%">
	                <thead>
		                <tr>
                            
			                <td class="selecionar" style="width: 20px;"><input type="checkbox" id="chkProva" name="chkProva" /></td>
			                <td style="width: 35%;"><%= Html.ActionLink("Título", "Ordenar", new { @ordem = "nome" })%></td>
                            <td style="width: 20%;"><%= Html.ActionLink("Identificador", "Ordenar", new { @ordem = "identificador" })%></td>
                            <td style="width: 20%;"><%= Html.ActionLink("Autor", "Ordenar", new { @ordem = "autor" })%></td>
			                <td style="width: 20%;"><%= Html.ActionLink("Estado", "Ordenar", new { @ordem = "status" })%></td>
                            <td style="width: 20%;"><%= Html.ActionLink("Modificado", "Ordenar", new { @ordem = "modificado" }, new { @class = "crescente" })%></td>
			                <td style="width: 1%;"><%= Html.ActionLink("Questões", "Ordenar", new { @ordem = "nquetoes" })%></td>
		                </tr>
	                </thead>
	                <tbody></tbody>
                </table>
				<div class="ferramentas">
				    <div class="resultado"></div>
					<div class="paginacao"></div>
				</div>
                <% } %>
            <!-- #end region Formulário da Tabela de Questao -->
            
            </div>
		</div>
    </div>

<% Html.RenderPartial("Impressao/DlgImpressao"); %>

</asp:Content>
