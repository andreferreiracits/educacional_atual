<%@ Control Language="C#" Inherits="System.Web.Mvc.ViewUserControl<Avaliacaoes.Componentes.Relatorios.Models.Entidades.Consulta.RelatorioCompletoPesquisaOpiniaoDadosView>" %>
<%@ Import Namespace="Avaliacaoes.Componentes.Relatorios.Models.Entidades.Consulta" %>
<%@ Import Namespace="Avaliacoes.Servicos.Relatorios.Imp.Entidade.Consulta" %>
<%@ Import Namespace="Avaliacoes.Framework.Utils.Entidades" %>
<%@ Import Namespace="Avaliacoes.Servicos.Relatorios.DAO.Consultas" %>

<table data-tipo="tabelapaginada" data-forpaginacao="#oiTabelaPaginacao" data-form="form" cellpadding="0" cellspacing="0">
    <thead>
        <tr>
            <th>Questao</th>
            <th>Alternativa</th>
            <th>Respostas</th>
        </tr>
    </thead>
    <tbody>
        <% foreach (RelatorioCompletoPesquisaOpiniaoItem item in Model.Itens)
           { 
            
               %>
        <tr>
            <td>&nbsp;<%:item.Ordem%></td>
            <% if(String.IsNullOrWhiteSpace(item.Letra)){ %>
                <td colspan="2">&nbsp;<%=item.Resposta%></td>
            <% }else{ %>
                <td>&nbsp;<%:item.Letra%></td>
                <td>&nbsp;<%=item.Total%></td>
            <% } %>
            
        </tr>
        <% } %>
    </tbody>
</table>
