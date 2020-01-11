<%@ Control Language="C#" Inherits="System.Web.Mvc.ViewUserControl<Avaliacoes.Componentes.PortalAvaliacoes.Models.ILogadoView>" %>
<header>
    <div>
        <h1>
            <a href="<%=Url.Content("~/Home")%>">
                <img src="<%=Model.Logo %>" alt="<%:Model.Escola %>" title="<%:Model.Escola %>" />
            </a>
        </h1>
       
        <div class="SEC02511-perfil">
         
            <figure>
                    <a href="#">
                    <img src="<%:Model.Icone%>" alt="<%:Model.Nome%>" title="<%:Model.Nome%>" />
                    <figcaption class="SEC02511-nome-controle" title="<%:Model.Nome%>"><%:Model.Nome%><div class="SEC02511-seta-baixo"></div></figcaption>
                </a>
            </figure>
            <div class="SEC02511-pai-caixa">
            <div class="SEC02511-seta-top"></div>
             <ul class="SEC02511-menu-perfil">
             
                <li class="SEC02511-item-perfil"><div class="SEC02511-sprits-icone"></div><a href="/rede/alterarfoto_popup.asp" target="AlteracaodeFoto" data-link="popup" data-setting="height=320,width=470,scrollbars=1, resizable=1">Perfil</a></li>
                <li class="SEC02511-item-sair"><div class="SEC02511-sprits-icone"></div><a href="/login/logout.asp">Sair</a></li>
            </ul>
        </div>
        </div>

        

    </div>
    
</header>
