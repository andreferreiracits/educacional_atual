<%@ Page Language="C#" Inherits="System.Web.Mvc.ViewPage<dynamic>" MasterPageFile="~/Views/Shared/Site.Master" %>

<asp:Content ID="ContentArea" ContentPlaceHolderID="ContentArea" runat="server">



    <div>
    <br/>
    <a href="/Migrador">Voltar</a>
    <br/>
    <br/>

<%
   
    foreach (var obj in Model) { 
    
   %>
   <br>
   <br>
   <b>---------------> Dados da escola: <% Response.Write(obj.idEscolaMIgrada); %></b>
    <br>

    Total de Provas com Agendamento:
    <b>
    <% 
        Response.Write(obj.qtdProvaComAgendament); 
     %>
     </b>
     <br/>
     Total de Agendamentos (Aplicações):
     <b>
    <% 
        Response.Write(obj.qtdAplicTotal); 
     %>
     </b>
     <br/>
     <br/>
     <b>Aplicações</b>
     <br/>
     Criadas: 
     <b style="color:Blue">     
    <% 
        Response.Write(obj.qtdAplicCriadas); 
     %>
     </b>
     <br/>
     Erro: 
     <b style="color:Red">
    <% 
        Response.Write(obj.qtdAplicERRO); 
     %>
     </b>
     <br/>
     <br/>
     <b>Configuração</b>
     <br/>
     Criadas: 
     <b style="color:Blue">
    <% 
        Response.Write(obj.qtdConfigApliCriadas); 
     %>
     </b>
     <br/>
     Erro: 
     <b style="color:Red">
    <% 
        Response.Write(obj.qtdConfigAplicERRO); 
     %>
     </b>
<% 
    }
     
 %>
    </div>
</asp:Content>
