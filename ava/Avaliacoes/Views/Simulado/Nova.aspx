<%@ Page Language="C#" validateRequest="false" MasterPageFile="~/Views/Shared/Site.Master" Inherits="System.Web.Mvc.ViewPage<ProvaColegiada.TabelaViews.SimuladoView>" %>
<%@ Import Namespace="ProvaColegiada.TabelaViews.Shared "%>
<asp:Content ID="JsArea" ContentPlaceHolderID="JsArea" runat="server">

    <script src="<%= UtilView.Url("/Scripts/class/Aba.js") %>" type="text/javascript"></script>
    <script src="<%= UtilView.Url("/Scripts/class/AnularQuestao.js") %>" type="text/javascript"></script>
    <%=Html.BundleScript(Avaliacoes.Framework.Web.Bundle.Bundle.Tipo.Sem, "Scripts/view/novaSimulado.1.{0.0}.js")%>
    <script src="<%= UtilView.Url("/Scripts/util/jquery.hoverIntent.js") %>" type="text/javascript"></script>
    <script src="<%= UtilView.Url("/Scripts/util/jquery.ui.datepicker-pt-BR.js") %>" type="text/javascript"></script>
    <script src="<%= UtilView.Url("/Scripts/util/jquery.timePicker.min.js") %>" type="text/javascript"></script>
</asp:Content>

<asp:Content ID="CssArea" ContentPlaceHolderID="CssArea" runat="server">
        <link rel="stylesheet" type="text/css" href="<%= UtilView.Url("/Content/css/anularquestao.css") %>" />
        <link href="<%= UtilView.Url("/Content/css/simulado.css") %>" rel="stylesheet" type="text/css" />
        <link href="<%= UtilView.Url("/Content/css/timePicker.css") %>" rel="stylesheet" type="text/css" />
</asp:Content>


<asp:Content ID="ContentArea" ContentPlaceHolderID="ContentArea" runat="server">
    <div id="conteudo">
	    <div class="caixa">
		    <% Html.RenderPartial("MenuConteudo"); %>
		    <div id="caixaConteudo" class="caixaConteudo">

                <div id="infoSimulado">
                    <div class="cxaTituloPagina">
                        <h3 class="tituloStatus">Cadastro de simulado</h3>
                        <%= Html.ActionLink("« Voltar a listagem dos simulados", "Index", "Simulado", new { @class = "linkPadrao" })%>
                    </div>
                    
                    <div id="avisoStatus">
        	            <div class="bordaEsq"></div>
                        <div class="bordaMeio SEC02511_texto">
            	            Estado do simulado: <span id="statusQuestao" class="status"><%= Model.Estado%></span>
                        </div>
        	            <div class="bordaDir"></div>
                    </div>
                    
                     <%Html.RenderPartial(Model.FluxoEstadoView, Model.UltimaTrocaEstado);%>

                    <% Html.RenderPartial("MenuNavegacaoSimulado"); %>
                    
                    <div id="alerta" class="mensagem comBotao"></div>
                    
<%                  using (Html.BeginForm("SalvarSimulado", "Simulado", FormMethod.Post, new { @id = "frmSimulado" }))
                    {
                        Response.Write(Html.Hidden("idSimuladoSalvar", Model.Id));
                    }
%>
                    <div id="cxaConfiguracao"></div>
                    <div id="cxaAvaliacoes"></div>
                    <div id="cxaResumo"></div>
                </div>
            </div>
        </div>
    </div>

    <% Html.RenderPartial("../Agendamento/DlgAnularQuestao"); %>

</asp:Content>