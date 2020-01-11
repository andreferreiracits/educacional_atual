<%@ Control Language="C#" Inherits="System.Web.Mvc.ViewUserControl<Avaliacaoes.Componentes.Relatorios.Models.Entidades.Consulta.RelatorioNotaDadosView>" %>
<%@ Import Namespace="Avaliacaoes.Componentes.Relatorios.Models.Entidades.Consulta" %>
<%@ Import Namespace="Avaliacoes.Servicos.Relatorios.Imp.Entidade.Consulta" %>
<%@ Import Namespace="Avaliacoes.Framework.Utils.Entidades" %>
<%
    int totalHead = 3;
    List<int> listaOrdem = (List<int>)ViewData["ordemLista"];
    var listaDadosItemView = Model.Itens.ToView<RelatorioNotaDadosItemView, RelatorioNotaDadosItem>();
    var firstItem          = listaDadosItemView.First();
%>
<table data-tipo="tabelapaginada" data-forpaginacao="#oiTabelaPaginacao" data-form="form" cellpadding="0" cellspacing="0">
    <thead>
        <tr>
            <th class="fixed columnA">Aluno</th>
            <th class="fixed columnB">Turma/Grupo</th>
            <% foreach ( int idConfig in listaOrdem ) {
                   var item1 = firstItem.Provas.FirstOrDefault(t => t.IdConfiguracao == idConfig);
                   item1 = item1 != null ? item1 : firstItem.Provas.FirstOrDefault(t => t.IdConfiguracao == 0);
                if ( item1 != null ) {  %>
                    <th class="columnX"><%:"Avaliação" %> <span class="fundoNumeros"></span> <input type="hidden" name="avaliacaoFundoTabela" value="<%: item1.Prova %>" /> </th>
                <%}%>
            <%} %>
            <th class="fixed columnC"><%:"Média"%><span class="obrigatorio vermelho">*</span></th>
        </tr>
    </thead>
    <tbody>
        <% foreach (RelatorioNotaDadosItemView item in listaDadosItemView) { 
            
               %>
        <tr>
            <td class="fixed columnA" title="<%:item.Usuario%>">&nbsp;<%:item.Usuario%></td>
            <td class="fixed columnB br" title="<%:(item.Turma.Length <= 0 ? item.Grupo : item.Turma)%>">&nbsp;<%:(item.Turma.Length <= 0 ? item.Grupo : item.Turma)%></td>
            <%-- <% foreach (RelatorioNotaDadosItemRealizacaoView prova in item.Provas.Cast<IToView>().ToList().ToView<RelatorioNotaDadosItemRealizacaoView>()) { %>
                    <td class="columnX" title="<%=prova.Nota %>">&nbsp;<%:prova.Nota %></td>  
            <% } %>--%>
            <% IEnumerable<RelatorioNotaDadosItemRealizacaoView> provas = item.Provas.Cast<IToView>().ToList().ToView<RelatorioNotaDadosItemRealizacaoView>();
               foreach ( int idConfig in listaOrdem ) {
                   var prova = provas.FirstOrDefault(t => t.IdConfiguracao == idConfig);
                   prova = prova != null ? prova : provas.FirstOrDefault(t => t.IdConfiguracao == 0);
                   if ( prova != null ) {  %>
                    <td class="columnX" title="<%=prova.Nota %>">&nbsp;
                        <span class="<%: prova.Estado %>"><%:prova.Nota %></span>
                        <% if (item.Realizacao[prova.Prova].IdRealizacao != 0 && item.Realizacao[prova.Prova].Estado != RelatorioNotaDadosItemEstado.NaoEncerrada)
                           { %>
                            <span class="botoes">
                                <a data-tipo="linkpopup" data-width="1000" data-height="550"   href="javascript:void(0)" data-link="<%=Url.Content(String.Format("~/Realizacao/VisualizarRealizada/{0}", item.Realizacao[prova.Prova].IdRealizacao))%>">Ver</a>
                                <a data-tipo="modalpopup" data-popseletor="#dlgRelatorio" href="javascript:void(0)" data-link="<%=Url.Content(String.Format("~/Agendamento/Auditoria/{0}/{1}/{2}",item.IdUsuario, item.Realizacao[prova.Prova].IdRealizacao, item.Realizacao[prova.Prova].IdAplicacao))%>">Auditoria</a>
                            </span>
                        <%} %>
                    </td>
                <%}%>
            <% } %>
            <td class="fixed columnC bl" title="<%=item.Media%>">&nbsp;<%=item.Media%></td>
        </tr>
        <% } %>
    </tbody>
</table>

<div id="dlgRelatorio" title="Auditoria da avaliação" class="popup SEC02511 auditoria"></div>