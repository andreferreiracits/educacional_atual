<%@ Control Language="C#" Inherits="System.Web.Mvc.ViewUserControl<Avaliacaoes.Componentes.Relatorios.Models.Entidades.Consulta.RelatorioNotaDadosView>" %>
<%@ Import Namespace="Avaliacaoes.Componentes.Relatorios.Models.Entidades.Consulta" %>
<%@ Import Namespace="Avaliacoes.Servicos.Relatorios.Imp.Entidade.Consulta" %>
<%@ Import Namespace="Avaliacoes.Framework.Utils.Entidades" %>
<%
    int totalHead = 3;
    List<int> listaOrdem = (List<int>)ViewData["ordemLista"];
    var listaDadosItemView = Model.Itens.ToView<RelatorioNotaDadosItemView, RelatorioNotaDadosItem>();
    var firstItem          = listaDadosItemView.FirstOrDefault();
%>

<% if ( firstItem == null ) { %>
    <table>
        <thead>
            <tr>
                <th><%:"Não há dados para gerar o relatório."%></th>
            </tr>
        </thead>
    </table>
<% } else { %>
<table data-tipo="tabelapaginada" data-forpaginacao="#oiTabelaPaginacao" data-form="form" cellpadding="0" cellspacing="0">
    <thead>
        <tr>
            <th class="fixed columnA">Aluno</th>
            <th class="fixed columnA">Login</th>
            <th class="fixed columnB">Turma/Grupo</th>
            <% foreach ( int idConfig in listaOrdem ) {
                var item1 = firstItem.Provas.FirstOrDefault(t => t.IdConfiguracao == idConfig);
                item1 = item1 != null ? item1 : firstItem.Provas.FirstOrDefault(t => t.IdConfiguracao == 0);
                if ( item1 != null ) {  %>
                    <th class="columnX"> <%: item1.TituloProva %> </th>
                <%}%>
            <%} %>1
            <th class="fixed columnC"><%:"Média"%><span class="obrigatorio vermelho">*</span></th>
        </tr>
    </thead>
    <tbody>
        <% foreach (RelatorioNotaDadosItemView item in listaDadosItemView) { %>
        <tr>
            <td class="fixed columnA" title="<%:item.Usuario%>">&nbsp;<%:item.Usuario%></td>
            <td class="fixed columnA" title="<%:item.LoginUsuario%>">&nbsp;<%:item.LoginUsuario%></td>
            <td class="fixed columnB br" title="<%:(item.Turma.Length <= 0 ? item.Grupo : item.Turma)%>">&nbsp;<%:(item.Turma.Length <= 0 ? item.Grupo : item.Turma)%></td>
            <%-- <% foreach (RelatorioNotaDadosItemRealizacaoView prova in item.Provas.Cast<IToView>().ToList().ToView<RelatorioNotaDadosItemRealizacaoView>()) { %>
                    <td class="columnX" title="<%=prova.Nota %>">&nbsp;<%:prova.Nota %></td>  
            <% } %>--%>
            <% IEnumerable<RelatorioNotaDadosItemRealizacaoView> provas = item.Provas.Cast<IToView>().ToList().ToView<RelatorioNotaDadosItemRealizacaoView>();
               foreach ( int idConfig in listaOrdem ) {
                   var prova = provas.FirstOrDefault(t => t.IdConfiguracao == idConfig);
                   prova = prova != null ? prova : provas.FirstOrDefault(t => t.IdConfiguracao == 0);
                   if ( prova != null ) {  %>
                    <td class="columnX" title="<%=prova.Nota %>"><span class="<%: prova.Estado %>"><%:prova.Nota%></span></td>
                <%}%>
            <% } %>
            <td class="fixed columnC bl" title="<%=item.Media%>"><%=item.Media%></td>
        </tr>
        <% } %>
    </tbody>
</table>
<% } %>