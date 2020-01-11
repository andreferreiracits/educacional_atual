<%@ Page Language="C#" MasterPageFile="~/Views/TES/Shared/Caminhos.Master" Inherits="PositivoFramework.Web.Mvc.Theme.ThemedViewPage<Caminhos.Models.CaminhoUsuario>" %>

<asp:Content ContentPlaceHolderID="ContentPlaceHolderPrincipal" ID="ContentPlaceHolder" runat="server">
 
    <section id="ava_container" class="as1">
        
        <header id="Hcaminhos">        
            <h1 class="blokletters">Atividades</h1>                          
        </header>
        
        <div class="container_error clearfix">
            <h3>A atividade <%=Model.Caminho.titulo%> que estava agendada para a data <%=Model.dtmInicio.ToString("dd/MM/yyyy HH:mm")%> foi cancelada.</h3>
            <a href="/ava/mural" class="large awesome awesome-color">Voltar para a página inicial</a>
        </div>

    </section>

</asp:content>
