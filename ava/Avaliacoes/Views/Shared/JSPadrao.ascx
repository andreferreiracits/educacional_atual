<%@ Control Language="C#" Inherits="System.Web.Mvc.ViewUserControl<dynamic>" %>
<%@ Import Namespace="ProvaColegiada.Models" %>
<%@ Import Namespace="ProvaColegiada.TabelaViews.Shared" %>

<script type="text/javascript">
    var baseAnoMax = "<%= UtilView.AnoMaximo %>";
    var baseAnoMin = "<%= UtilView.AnoMinimo %>";
</script>

<%
    if (((ProvaColegiada.Controllers.BaseController)this.ViewContext.Controller).Usuario.TipoPortal == EnumTipoPortal.Positivo)
    {
        %>
            <script type="text/javascript" src="<%= UtilView.Url("/Scripts/view/recursosPPJs.js") %>"></script>
        <%
    }
    else
    {
        %>
            <script type="text/javascript" src="<%= UtilView.Url("/Scripts/view/recursosJs.js") %>"></script>
        <%
    }
%>
<%
    if (this.Usuario().TipoPortal == EnumTipoPortal.Educacional ||
       this.Usuario().TipoPortal == EnumTipoPortal.EducacionalPositivo ||
       this.Usuario().TipoPortal == EnumTipoPortal.PPParcial ||
       this.Usuario().TipoPortal == EnumTipoPortal.PortalAvaliacoes)
    {
        %>
            <script type="text/javascript" src="<%= UtilView.Url("/Scripts/view/recursosJsEducacional.js") %>"></script>
        <%
    }
%>
<script type="text/javascript" src="<%= UtilView.Url("/Scripts/MicrosoftAjax.js") %>"></script>
<script type="text/javascript" src="<%= UtilView.Url("/Scripts/MicrosoftMvcAjax.js") %>"></script>
<script type="text/javascript" src="<%= UtilView.Url("/Scripts/jquery.ui.widget.js") %>"></script>
<script type="text/javascript" src="<%= UtilView.Url("/Scripts/util/jquery-ui-1.8.5.custom.min.js") %>"></script>
<script type="text/javascript" src="<%= UtilView.Url("/Scripts/util/jquery.ui.mensagem.js") %>"></script>
<script type="text/javascript" src="<%= UtilView.Url("/Scripts/util/jquery.ui.combo.js") %>"></script>
<script type="text/javascript" src="<%= UtilView.Url("/Scripts/util/jquery.ui.selecionar.js") %>"></script>
<script type="text/javascript" src="<%= UtilView.Url("/Scripts/util/css_browser_selector.js") %>"></script>
<script type="text/javascript" src="<%= UtilView.Url("/Scripts/util/jquery.meio.mask.js") %>"></script> 
<script type="text/javascript" src="<%= UtilView.Url("/Scripts/util/jquery.cookie-1.0.0-min.js") %>"></script> 
<script type="text/javascript" src="<%= UtilView.Url("/Scripts/util/jquery.ui.selectcombo.1.0.0.js") %>"></script> 
<script type="text/javascript" src="<%= UtilView.Url("/Scripts/class/Carregando3.0.0.js") %>"></script>
<script type="text/javascript" src="<%= UtilView.Url("/Scripts/class/Ordenacao.js") %>"></script>
<script type="text/javascript" src="<%= UtilView.Url("/Scripts/class/Filtro.js") %>"></script>
<script type="text/javascript" src="<%= UtilView.Url("/Scripts/class/Tabela.js") %>"></script>
<script type="text/javascript" src="<%= UtilView.Url("/Scripts/class/Mensagem3.1.0.js") %>"></script>
<script type="text/javascript" src="<%= UtilView.Url("/Scripts/class/Confirm3.0.0.js") %>"></script>
<script type="text/javascript" src="<%= UtilView.Url("/Scripts/class/DataMode1.0.0.js") %>"></script>
<script type="text/javascript" src="<%= UtilView.Url("/Scripts/class/QuestaoResumo.js") %>"></script>
<script type="text/javascript" src="<%= UtilView.Url("/Scripts/class/Tour.js") %>"></script>
<!--script type="text/javascript" src="<--%= UtilView.Url("/Scripts/view/geral.js") %>"></script-->
<%=Html.BundleScript(Avaliacoes.Framework.Web.Bundle.Bundle.Tipo.Sem, "Scripts/view/geral.1.{0.0}.js")%>
