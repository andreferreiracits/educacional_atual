<%@ Control Language="C#" Inherits="System.Web.Mvc.ViewUserControl" %>
<%@ Import Namespace="ProvaColegiada.Models" %>

<ul id="menuSubConteudoInterno" class="abaSubConteudo">
    <% 
        object atributos = new { @class = "umaLinha" };
        string submenu = ViewContext.Controller.ValueProvider.GetValue("action").RawValue.ToString();
        //PermissaoEfetiva permissao = (PermissaoEfetiva)ViewData["Permissao"];
        //TODO: reimplementar esta página
    %>

    
    <!--% if (permissao.PodeCadastrarQuestoes)
       { %>
            <li class="< %= (submenu.Equals("Cadastro")) ? "selecionado" : "" %>">
                < %= String.Format(Html.ActionLink("Cadastro de questões", "Cadastro", "Questoes", atributos).ToHtmlString(), "<br />")%>
            </li>
    < % }
        
       if (permissao.PodeValidar)
       { %>
        <li class="< %= (submenu.Equals("Validacao")) ? "selecionado" : "" %>">
            < %= String.Format(Html.ActionLink("Validação de questões", "Validacao", "Questoes", atributos).ToHtmlString(), "<br />")%>
        </li>
    < % } %-->
    <!--li class="< %= (submenu.Equals("Questoes")) ? "selecionado" : "" %>">
        < %= String.Format(Html.ActionLink("Questões do banco", "Questoes", "Questoes", atributos).ToHtmlString(), "<br />")%>
    </li-->
    
<!--    
    <li class="< %= (submenu.Equals("Relatorios")) ? "selecionado" : "" %>">
        < %= String.Format(Html.ActionLink("Graficos e relatórios", "Relatorios", "Questoes", atributos).ToHtmlString(), "<br />")%>
    </li>
-->
</ul>