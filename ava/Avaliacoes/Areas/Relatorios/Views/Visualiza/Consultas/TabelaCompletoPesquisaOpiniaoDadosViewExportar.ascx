<%@ Control Language="C#" Inherits="System.Web.Mvc.ViewUserControl<Avaliacaoes.Componentes.Relatorios.Models.Entidades.Consulta.RelatorioCompletoPesquisaOpiniaoDadosView>" %>
<%@ Import Namespace="Avaliacaoes.Componentes.Relatorios.Models.Entidades.Consulta" %>
<%@ Import Namespace="Avaliacoes.Servicos.Relatorios.Imp.Entidade.Consulta" %>
<%@ Import Namespace="Avaliacoes.Framework.Utils.Entidades" %>
<%@ Import Namespace="Avaliacoes.Servicos.Relatorios.DAO.Consultas" %>

<%
    IList<RelatorioCompletoPesquisaOpiniaoItem> discursivas = Model.Itens.Where(i => String.IsNullOrWhiteSpace(i.Letra)).ToList() ;
    IList<RelatorioCompletoPesquisaOpiniaoItem> escolha = Model.Itens.Where(i => !String.IsNullOrWhiteSpace(i.Letra)).ToList();
    string nome = discursivas.Count(i => !String.IsNullOrWhiteSpace(i.Nome)) > 0 ? "Nome" : "";
%>


<% if (discursivas.Count <= 0 && escolha.Count <= 0)
   { %>
    <table border=1>
        <thead>
            <tr>
                <th><%:"Não há dados para gerar o relatório."%></th>
            </tr>
        </thead>
    </table>
<% } else { %>
<% if (escolha.Count > 0) { %>
<table border=1>
    <thead>
        <tr>
            <th><%:"Título" %></th>
            <th><%:"Questão" %></th>
            <th>Enunciado</th>
            <th>Alternativa</th>
            <th>Total</th>
        </tr>
    </thead>
    <tbody>
        <% foreach (RelatorioCompletoPesquisaOpiniaoItem item in escolha)
           { 
            
               %>
            <tr>
                <td><%:item.Titulo%></td>
                <td><%:item.Ordem%></td>
                <td><%:item.Enunciado%></td>
                <td><%:item.Letra%>) <%:item.Alternativa%></td>
                <td><%=item.Total%></td>
            </tr>
        <% } %>
    </tbody>
</table>
<% } %>
<% if (discursivas.Count > 0)
   { %>
<table border=1>
    <thead>
        <tr>
            <th><%:"Título" %></th>
            <th><%:"Questão" %></th>
            <th>Enunciado</th>
            <th>Resposta</th>
            <th><%:nome%></th>
        </tr>
    </thead>
    <tbody>
        <% foreach (RelatorioCompletoPesquisaOpiniaoItem item in discursivas)
           { 
            
               %>
        <tr>
            <td><%:item.Titulo%></td>
            <td><%:item.Ordem%></td>
            <td><%:item.Enunciado%></td>
            <td><%:Avaliacoes.Framework.Utils.HtmlText.HtmlText.HTMLToPlainText(item.Resposta)%></td>
            <td><%:item.Nome%></td>
        </tr>
        <% } %>
    </tbody>
</table>
<% } %>
<% } %>