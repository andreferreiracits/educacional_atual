<%@ Control Language="C#" Inherits="System.Web.Mvc.ViewUserControl<System.Collections.Generic.IList<Grupo.Models.Grupos>>" %>

<link rel="stylesheet" type="text/css" media="screen" href="/AVA/StaticContent/Content/TES/css/grupos_3.2.0.css<%=Url.TimeStampLink() %>" />
<script type="text/javascript" src="/AVA/StaticContent/Common/Scripts/grupos_4.2.11.js<%=Url.TimeStampLink() %>"></script>

<% 
int tot_reg = ViewData["tot_reg"] != null ? (int)ViewData["tot_reg"] : 0;
string strTot_Reg = ViewData["tot_reg"] == null ? "" : (tot_reg > 99 ? "+99" : tot_reg.ToString());
//int idUsuarioLogado = Convert.ToInt32(ViewData["idUsuarioLogado"]);
%>
<header>
    <h1 class="thumbs_lists">
    <a href="#" id="A1" class="fancybox.ajax">
        Grupos
        <span><%= strTot_Reg %></span>
    </a> 
    <a class="verTodosGrupos" href="/AVA/Grupo">Ver Todos</a>
</header>

<ul class="clearfix">
    <ul>
    <%
        if (Model.Count == 0)
        {
    %>
        <span class="avisonulo">Nenhum grupo encontrado.</span>           
    <%
        }
        else 
        {     
            int cont = 0;
            foreach (var grupo in Model)
            {
                string link = "/AVA/Grupo/Home/PerfilGrupo/" + grupo.strLinkPermanente;

                cont++;
                if(cont <= 2)
                {
                    %>
                    <li>
                        <div class="white_shadow"></div>
                        <a href="<%=link%>">
                            <img width="33" height="33" title="" alt="" src="<%=grupo.strFoto%>" border="0" />
                            <span><%=grupo.strNome%></span>
                        </a>
                    </li>
                    <%
                }
            }
        }
       %>
    </ul>

    <a href="/AVA/Grupo/Home/CriarGrupo" id="btCriarGrupo" class="btn_cinza btCriarGrupo_mural right fancybox.ajax">Criar</a>

    <div class="itensGrupo" id="boxCriarGrupo">
        <!-- <%Html.RenderPartial("Partials/ListarGruposDisponiveis", Model, new ViewDataDictionary { { "idUsuarioLogado", 6998399 }, { "qtdRegistroPorPagina", 5 } });%> -->
    </div>
</ul>