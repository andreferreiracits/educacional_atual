<%@ Control Language="C#" Inherits="System.Web.Mvc.ViewUserControl<ProvaColegiada.TabelaViews.ClassificacaoView>" %>
<%@ Import namespace="ProvaColegiada.Models.Question" %>
<%@ Import namespace="ProvaColegiada.Models.Classificacao" %>
<%@ Import namespace="ProvaColegiada.TabelaViews" %>

<table class="tabela tamQuestao <%=Model.hideTipoClassificacao(EnumTipoClassificacao.Habile) %>" cellpadding="0" cellspacing="0">
    <thead>
        <tr>
            <td >Matriz</td>
            <td >Competência</td>
            <td >Eixo</td>
            <td >Habilidade</td>
            <td >Processo Cognitivo</td>
            <td >Situação de Uso</td>            
        </tr>
    </thead>
    <tbody>
    <%
        List<AbstractClassificacao> lista = Model.Lista.listByTipo(EnumTipoClassificacao.Habile);
        foreach (HabileClassificacao Habile in lista)
            {
            %>
                    <tr>
                        <td ><%= Habile.Matriz.Nome%></td>
                        <td ><%= Habile.Competencia.Nome%></td>
                        <td ><%= Habile.Habilidade.Eixos.FirstOrDefault().Nome%></td>
                        <td ><%= Habile.Habilidade.Codigo + " - " + Habile.Habilidade.Descricao%></td>                        
                        <td ><%= Habile.Habilidade.ProcessosCognitivos.FirstOrDefault().Nome%></td>
                        <td ><%= Habile.SituacoesUso.FirstOrDefault().Nome%></td>
                    </tr>
            <%
            }

            %>
    </tbody>
</table>
