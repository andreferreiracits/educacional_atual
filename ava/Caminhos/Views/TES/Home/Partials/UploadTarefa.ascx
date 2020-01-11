<%@ Control Language="C#" Inherits="System.Web.Mvc.ViewUserControl<dynamic>" %>

<% 
int idUsuario = Convert.ToInt32(ViewData["idUsuario"]);
int idEtapa = Convert.ToInt32(ViewData["idEtapa"]);
int idCaminho = Convert.ToInt32(ViewData["idCaminho"]);       
%>
<div class="ava_lightheader">
    <h2 class="blokletters">Inserir material de apoio</h2>
</div>

<div class="ava_lightcontainer">
    <div id="countt_1">
    
        <script type="text/javascript">
            $("#idCaminho").val('<%=idCaminho%>');
            $("#idEtapa").val('<%=idEtapa%>');
            abrirUploadArquivo(<%=idUsuario%>, <%=idEtapa%>, 15, true, 1, "<%=Request.Browser.Browser.ToString()%>", false)
        </script>
    
    </div>
    <div class="light_bts">
        <a class="large awesome awesome-color" style="cursor: pointer;" id="btnFinalizarMaterialApoio"><span></span>OK</a>
    </div>
</div>

                       