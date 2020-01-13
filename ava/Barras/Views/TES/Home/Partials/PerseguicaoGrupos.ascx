<%@ Control Language="C#" Inherits="System.Web.Mvc.ViewUserControl<System.Collections.Generic.IList<Grupo.Models.Grupos>>" %>

<!-- <link rel="stylesheet" type="text/css" media="screen" href="/AVA/StaticContent/Content/TES/css/grupos_3.2.0.css<%=Url.TimeStampLink() %>" /> -->
<script type="text/javascript" src="/AVA/StaticContent/Common/Scripts/grupos_4.2.11.js<%=Url.TimeStampLink() %>"></script>
<style>
    /*Configurar Grupo*/
    .config {
    display: none;
    }
    .config h1 {
    border-bottom: 1px solid #e9e9e9;
    color: #444;
    font-size: 25px;
    font-weight: normal;
    margin: 0;
    padding: 20px 35px;
    }
    .config .envolto {
    border-bottom: 1px solid #e9e9e9;
    padding: 35px;
    /*Ativo e Inativo*/

    /*Fim Ativo e Inativo*/

    }
    .config .envolto .publico,
    .config .envolto .privado {
    background: #f9f9f9;
    border: 1px solid #d5d5d5;
    color: #666;
    cursor: pointer;
    float: left;
    height: 221px;
    padding: 15px;
    width: 320px;
    }
    .config .envolto .publico h2,
    .config .envolto .privado h2 {
    color: #666;
    font-size: 16px;
    margin-top: 0;
    }
    .config .envolto .publico p,
    .config .envolto .privado p {
    color: #666;
    }
    .config .envolto .publico {
    line-height: 18px;
    margin-right: 25px;
    }
    .config .envolto form {
    display: none;
    }
    .config .envolto form > span {
    display: block;
    margin-bottom: 5px;
    }
    .config .envolto form input[type="text"],
    .config .envolto form textarea {
    border: 1px solid #ccc;
    color: #666;
    margin-bottom: 9px;
    padding: 5px;
    width: 310px;
    }
    .config .envolto form textarea {
    font-family: arial;
    height: 55px;
    resize: none;
    }
    .config .envolto form .styleRadio {
    margin-right: 20px;
    }
    .config .envolto .publico.config_ativo {
    height: 380px;
    }
    .config .envolto .privado.config_ativo {
    height: 280px;
    }
    .config .envolto .config_ativo > p {
    display: none;
    }
    .config .envolto .config_ativo form {
    display: block;
    }
    .config .envolto .config_inativo p,
    .config .envolto .config_inativo h2 {
    color: #bbb;
    }
    .config div.botoes {
    margin: 0px 35px 20px 25px;
    }
    .config div.botoes .btn_cor {
    margin: 20px 0 0 10px;
    }
    /**Fim configurar grupo**/

</style>

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
        if (Model == null || Model.Count == 0)
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
</ul>