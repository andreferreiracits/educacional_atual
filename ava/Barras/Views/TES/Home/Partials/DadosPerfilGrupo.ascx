<%@ Control Language="C#" Inherits="System.Web.Mvc.ViewUserControl<Grupo.Models.Grupos>" %>

<%
    string strNome = Model.strNome;
    string strFoto = Model.strFoto;
    int idGrupo = Model.id;
    bool ehMediador = Convert.ToBoolean(ViewData["ehMediador"]);   
%>
<header>
    <a class="" href="javascript: void(0);">
        <img height="170" width="170" src="<%=strFoto%>">
    </a>
    <a class="" href="javascript: void(0);">
        <h1 class="blokletters"><%=strNome%></h1>
    </a>                
</header>

<ul>
    <li><a href="/AVA/Mural"><div class="icon_li mural"></div> Início</a></li>
    <li><a href="/AVA/Grupo"><div class="icon_li grupos"></div> Grupos</a></li>
    <% 
    if (Convert.ToBoolean(ViewData["temAcesso"]))
    {
        %>
        <li>
            <a href="javascript: void(0);" onclick="abreInfoGrupo()"><span>Sobre</span></a>
            <div class="boxSobre" style="display: none;">
			    <span class="setaBoxSobre"></span>
			    <h2><%=strNome%></h2>
			    <p><%=Model.strDescricao%></p>
			    <a href="javascript: void(0)" class="btn_cinza right" id="fecharInfoGrupo">Fechar</a>
		    </div>
        </li>
        <%
        if (ehMediador)
        {
            %>
            <li><a href="/AVA/Grupo/Home/EditarGrupo/<%=idGrupo%>" id="ava_editar_grupo" class="fancybox.ajax">Editar</a></li>    
            <%
        }                
    }
    %>
</ul>
