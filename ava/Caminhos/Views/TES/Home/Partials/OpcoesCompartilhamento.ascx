<%@ Control Language="C#" Inherits="System.Web.Mvc.ViewUserControl<dynamic>" %>

<%
int idEscola = Convert.ToInt32(ViewData["idEscola"]);
int intStatus = Convert.ToInt32(ViewData["intStatus"]);
int controle = Convert.ToInt32(ViewData["cont"]);
int idCaminho = Convert.ToInt32(ViewData["idCaminho"]);
int idDono = Convert.ToInt32(ViewData["idDono"]);
int idUsuarioAtual = Convert.ToInt32(ViewData["idUsuarioAtual"]);
int intTipo = Convert.ToInt32(ViewData["intTipo"]);
    
bool ehPOL = false;
string strDisabledStatus = "";

if (idEscola == 3760001)
{
    ehPOL = true;
}

if (idDono != idUsuarioAtual && !ehPOL )
{
    strDisabledStatus = "disabled";
}
else if (idDono != idUsuarioAtual && (intStatus == 1 || intStatus == 2 || intStatus == 3))
{
    strDisabledStatus = "disabled";
}

string strComplementoAtividade = " a tarefa";

if (intTipo == 1) //caminhos
{
    strComplementoAtividade = " o caminho";
}


switch (intStatus)
{
    case 1: //compartilhado para todos da escola
        if (ehPOL) //POL
	    {
	       %>
	       <p><span class="publica"></span><input <%=strDisabledStatus%> type="radio" idCaminho="<%=idCaminho%>" value="3" class="ops" id="PubPortal_<%=controle%>" name="rTipo_<%=controle%>"><label for="PubPortal_<%=controle%>"><strong>Compartilhado para POL</strong></label></p>
	       <p><span class="privada"></span><input <%=strDisabledStatus%> type="radio" idCaminho="<%=idCaminho%>" idCaminho="<%=idCaminho%>" value="4" class="ops" id="EmRev_<%=controle%>" name="rTipo_<%=controle%>"><label for="EmRev_<%=controle%>"><strong>Em revisão</strong></label></p>
	       <%
	    }
	    %>
	    <p><span class="privada"></span><input <%=strDisabledStatus%> type="radio" idCaminho="<%=idCaminho%>" value="2" class="ops " id="Pri_<%=controle%>" name="rTipo_<%=controle%>"><label for="Pri_<%=controle%>"><strong>Privado</strong> (só você pode ver e agendar <%=strComplementoAtividade%>)</label></p>
	    <p><span class="publica"></span><input <%=strDisabledStatus%> type="radio" idCaminho="<%=idCaminho%>" value="1" class="ops " id="Pub_<%=controle%>" name="rTipo_<%=controle%>" checked><label for="Pub_<%=controle%>"><strong>Compartilhado</strong> (professores da sua escola podem ver e copiar <%=strComplementoAtividade%>).</label></p>
	    <%
        break;
    case 2: //privado
        if (ehPOL) //POL
	    {
            %>
		    <p><span class="publica"></span><input <%=strDisabledStatus%> type="radio" idCaminho="<%=idCaminho%>" value="3" class="ops" id="PubPortal_<%=controle%>" name="rTipo_<%=controle%>"><label for="PubPortal_<%=controle%>"><strong>Compartilhado para POL</strong></label></p>
		    <p><span class="privada"></span><input <%=strDisabledStatus%> type="radio" idCaminho="<%=idCaminho%>" value="4" class="ops" id="EmRev_<%=controle%>" name="rTipo_<%=controle%>"><label for="EmRev_<%=controle%>"><strong>Em revisão</strong></label></p>
		    <%
	    }
	    %>
	    <p><span class="privada"></span><input <%=strDisabledStatus%> type="radio" idCaminho="<%=idCaminho%>" value="2" class="ops " id="Pri_<%=controle%>" name="rTipo_<%=controle%>" checked><label for="Pri_<%=controle%>"><strong>Privado</strong> (só você pode ver e agendar <%=strComplementoAtividade%>)</label></p>
	    <p><span class="publica"></span><input <%=strDisabledStatus%> type="radio" idCaminho="<%=idCaminho%>" value="1" class="ops " id="Pub_<%=controle%>" name="rTipo_<%=controle%>"><label for="Pub_<%=controle%>"><strong>Compartilhado</strong> (professores da sua escola podem ver e copiar <%=strComplementoAtividade%>).</label></p>
	    <% 
        break;
    case 3: //compartilhado para POL
        %>
		<p><span class="publica"></span><input <%=strDisabledStatus%> type="radio" idCaminho="<%=idCaminho%>" value="3" class="ops" id="PubPortal_<%=controle%>" name="rTipo_<%=controle%>" checked><label for="PubPortal_<%=controle%>"><strong>Compartilhado para POL</strong></label></p>
		<p><span class="privada"></span><input <%=strDisabledStatus%> type="radio" idCaminho="<%=idCaminho%>" value="4" class="ops" id="EmRev_<%=controle%>" name="rTipo_<%=controle%>"><label for="EmRev_<%=controle%>"><strong>Em revisão</strong></label></p>
		<p><span class="privada"></span><input <%=strDisabledStatus%> type="radio" idCaminho="<%=idCaminho%>" value="2" class="ops " id="Pri_<%=controle%>" name="rTipo_<%=controle%>"><label for="Pri_<%=controle%>"><strong>Privado</strong> (só você pode ver e agendar <%=strComplementoAtividade%>)</label></p>
		<p><span class="publica"></span><input <%=strDisabledStatus%> type="radio" idCaminho="<%=idCaminho%>" value="1" class="ops " id="Pub_<%=controle%>" name="rTipo_<%=controle%>"><label for="Pub_<%=controle%>"><strong>Compartilhado</strong> (professores da sua escola podem ver e copiar <%=strComplementoAtividade%>).</label></p>
		<%
        break;
    case 4: //em revisão
        %>
		<p><span class="publica"></span><input <%=strDisabledStatus%> type="radio" idCaminho="<%=idCaminho%>" value="3" class="ops" id="PubPortal_<%=controle%>" name="rTipo_<%=controle%>"><label for="PubPortal_<%=controle%>"><strong>Compartilhado para POL</strong></label></p>
		<p><span class="privada"></span><input <%=strDisabledStatus%> type="radio" idCaminho="<%=idCaminho%>" value="4" class="ops" id="EmRev_<%=controle%>" name="rTipo_<%=controle%>" checked><label for="EmRev_<%=controle%>"><strong>Em revisão</strong></label></p>
		<p><span class="privada"></span><input <%=strDisabledStatus%> type="radio" idCaminho="<%=idCaminho%>" value="2" class="ops " id="Pri_<%=controle%>" name="rTipo_<%=controle%>"><label for="Pri_<%=controle%>"><strong>Privado</strong> (só você pode ver e agendar <%=strComplementoAtividade%>)</label></p>
		<p><span class="publica"></span><input <%=strDisabledStatus%> type="radio" idCaminho="<%=idCaminho%>" value="1" class="ops " id="Pub_<%=controle%>" name="rTipo_<%=controle%>"><label for="Pub_<%=controle%>"><strong>Compartilhado</strong> (professores da sua escola podem ver e copiar <%=strComplementoAtividade%>).</label></p>
		<%
        break;
    default:
        if (ehPOL) //POL
	    {
		    %>
		    <p><span class="privada"></span><input <%=strDisabledStatus%> type="radio" idCaminho="<%=idCaminho%>" value="4" class="ops" id="EmRev_<%=controle%>" name="rTipo_<%=controle%>"><label for="EmRev_<%=controle%>"><strong>Em revisão</strong></label></p>
		    <p><span class="publica"></span><input <%=strDisabledStatus%> type="radio" idCaminho="<%=idCaminho%>" value="3" class="ops" id="PubPortal_<%=controle%>" name="rTipo_<%=controle%>"><label for="PubPortal_<%=controle%>"><strong>Compartilhado para POL</strong></label></p>
		    <p><span class="privada"></span><input <%=strDisabledStatus%> type="radio" idCaminho="<%=idCaminho%>" value="2" class="ops " id="Pri_<%=controle%>" name="rTipo_<%=controle%>" checked><label for="Pri_<%=controle%>"><strong>Privado</strong> (só você pode ver e agendar <%=strComplementoAtividade%>)</label></p>
		    <p><span class="publica"></span><input <%=strDisabledStatus%> type="radio" idCaminho="<%=idCaminho%>" value="1" class="ops " id="Pub_<%=controle%>" name="rTipo_<%=controle%>"><label for="Pub_<%=controle%>"><strong>Compartilhado</strong> (professores da sua escola podem ver e copiar <%=strComplementoAtividade%>).</label></p>
		    <%
	    }
	    else
	    {
		    %>
		    <p><span class="privada"></span><input <%=strDisabledStatus%> type="radio" idCaminho="<%=idCaminho%>" value="2" class="ops " id="Pri_<%=controle%>" name="rTipo_<%=controle%>" checked><label for="Pri_<%=controle%>"><strong>Privado</strong> (só você pode ver e agendar <%=strComplementoAtividade%>)</label></p>
		    <p><span class="publica"></span><input <%=strDisabledStatus%> type="radio" idCaminho="<%=idCaminho%>" value="1" class="ops " id="Pub_<%=controle%>" name="rTipo_<%=controle%>"><label for="Pub_<%=controle%>"><strong>Compartilhado</strong> (professores da sua escola podem ver e copiar <%=strComplementoAtividade%>).</label></p>
		    <%
	    }
        break;
}  
%>

