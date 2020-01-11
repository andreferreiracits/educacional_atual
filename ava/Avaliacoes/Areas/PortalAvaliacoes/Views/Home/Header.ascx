<%@ Control Language="C#" Inherits="System.Web.Mvc.ViewUserControl<Avaliacoes.Componentes.PortalAvaliacoes.Models.ILogadoView>" %>
<header>

    <h1>
        <a href="<%=Url.Content("~/Home")%>">
            <img src="<%=Model.Logo %>" alt="<%:Model.Escola %>" title="<%:Model.Escola %>"  />
        </a>
    </h1>

    <section id="avl_perfil" data-render="avl_perfil">
        <header>
            <figure>
                <img src="<%:Model.Icone%>" alt="<%:Model.Nome%>" title="<%:Model.Nome%>" width="25" height="25" />
                <figcaption class="SEC02511-nome-controle" title="<%:Model.Nome%>"><%:Model.Nome%><div class="SEC02511-seta-baixo"></div></figcaption>
            </figure>
        </header>
        <section>
            <ul>
                <li class="avl_perfil_item_edit"><a title="Editar perfil" href="/rede/alterarfoto_popup.asp" target="AlteracaodeFoto" data-action="avl_popup" data-avl_popup-setting="height=320,width=470,scrollbars=1, resizable=1">Perfil</a></li>
                <li class="avl_perfil_item_sair"><a title="Sair" href="/login/logout.asp">Sair</a></li>
            </ul>
        </section>
    </section>

</header>