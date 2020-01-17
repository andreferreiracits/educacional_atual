<%@ Control Language="C#" Inherits="System.Web.Mvc.ViewUserControl<UsuarioAVA.Models.Perseguicao>" %>
<% 
    string strURL = ViewData["URL"].ToString();
    string strURLEscola = ViewData["URLEscola"].ToString();
%>



<style>
    ul > li.menu_item_procurar > a:before {
        content: "\E80A";
        width: 20px;
        font-size: 16px;
        margin-right: 5px;
        float: left;
        text-align: center;
    }

    ul > li > a:before, ul > li > a:after {
        font-family: "fontello";
    }

    .link-pagina-escola, .link-blog, .link-buscar-pessoas, .link-home-escola {
        color: #3E4F67 !important;
    }

    .img-blog {
        width: 19px !important;
    }

    .icon-wordpress{
        margin: 5px 5px 5px 0px !important;
        font-size: 18px !important;
    }

    .icon-pagina-escola{
        padding-left: 2px !important;
        padding-right: 3px !important;
    }
</style>

<header>
    <h1 class="thumbs_lists">
    <a href="#" id="A1" class="fancybox.ajax">
        Links Rapidos 
    </a>
</header>

<ul class="clearfix">
    <% 
        if (ViewData["PaginasComunicador"] != null) {
            foreach (var pc in (List<Pagina.Models.PaginaEducacional>)ViewData["PaginasComunicador"])
            {
                if (pc.bolComunicador || (bool)ViewData["PaginaEscolaTemPost"] || ((bool)ViewData["admRede"]))
                {
                    %>
                        <li class="menu_item_escola">
                            <a class="link-pagina-escola" href="<%=strURL%>/AVA/Pagina/<%=pc.strLink %>">
                                <i class="fa fa-hospital-o icon-wordpress icon-pagina-escola" aria-hidden="true"></i>
                                Pagina <%=pc.idPagina > 2 ? "da Escola" : pc.strTitulo.ToUpper()%>
                            </a>
                        </li>
                    <%
                }
            }
        }
    %>
    <li class="menu_item_home">
        <a class="link-home-escola" href="<%=strURL%>/rd/gravar.asp?servidor=<%=strURLEscola%>&url=/default.asp">
            <!-- <img class="img-itens" src="/ava/staticContent/common/img/icon/iconsava/ico_home.svg" style=""> -->
            <i class="fa fa-wordpress icon-wordpress" aria-hidden="true"></i>
            Homepage da Escola
        </a>
    </li>
    <% 
        if (Model.bolEducador && Model.intTipoPerfil != -2 && Convert.ToInt32(ViewData["bolAVAPuro"]) == 0)
        {
    %>
        <li class="menu_item_blog">
            <a class="link-blog" href="<%=strURL%>/blog/wp/novaHome.asp">
                <img class="img-blog" src="/ava/staticContent/common/img/icon/iconsava/ico_blog_link.svg">
                Blog
            </a>
        </li>
    <%
        }
    %>
    <li class="menu_item_procurar">
        <a class="link-buscar-pessoas" id="abrebuscapessoas"  href="javascript:void(0);" onclick="retornaProcurarPessoas()">Procurar pessoas</a>
    </li>
</ul>