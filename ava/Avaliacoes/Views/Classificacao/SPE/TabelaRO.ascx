<%@ Control Language="C#" Inherits="System.Web.Mvc.ViewUserControl<ProvaColegiada.TabelaViews.ClassificacaoView>" %>
<%@ Import namespace="ProvaColegiada.Models.Question" %>
<%@ Import namespace="ProvaColegiada.Models.Classificacao" %>
<%@ Import namespace="ProvaColegiada.TabelaViews" %>

<table class="tabela tamQuestao <%=Model.hideTipoClassificacao(EnumTipoClassificacao.SPE) %>" cellpadding="0" cellspacing="0">
    <thead>
        <tr>
            <td style="width: 20%;">Coleção</td>
            <td style="width: 10%;">Edição</td>
            <td style="width: 16%;">Disciplina</td>
            <td style="width: 14%;">Ano</td>
            <td style="width: 12%;">Volume</td>
            <td style="width: 12%;">Unidade</td>
            <td style="width: 8%;">Tipo</td>
            <td style="width: 8%;">Ordem</td>
            <td style="width: 8%;">Grupo</td>
        </tr>
    </thead>
    <tbody>
    <%
        List<AbstractClassificacao> lista = Model.Lista.listByTipo(EnumTipoClassificacao.SPE);
        foreach (SPE SPE in lista)
            {
            %>
                    <tr>
                        <td width="20%"><%= SPE.colecao.colecao %></td>
                        <td width="10%"><%= SPE.edicao.edicao %></td>
                        <td width="16%"><%= SPE.disciplina.disciplina %></td>
                        <td width="14%"><%= SPE.ano.ano %></td>
                        <td width="12%"><%= SPE.volume.volume %></td>
                        <td width="12%"><%= SPE.unidade.unidade %></td>
                        <td width="8%"><%= SPE.tipo.tipo %></td>
                        <td width="8%"><%= SPE.ordem.ordem %></td>
                        <td width="8%"><%= SPE.grupo.grupo %></td>
                    </tr>
            <%
            }

            %>
    </tbody>
</table>
