<%@ Control Language="C#" Inherits="System.Web.Mvc.ViewUserControl<ProvaColegiada.TabelaViews.ClassificacaoView>" %>
<%@ Import namespace="ProvaColegiada.Models.Question" %>
<%@ Import namespace="ProvaColegiada.Models.Classificacao" %>
<%@ Import namespace="ProvaColegiada.TabelaViews" %>

<table class="tabela tamQuestao <%=Model.hideTipoClassificacao(EnumTipoClassificacao.SPE) %>" cellpadding="0" cellspacing="0">
    <thead>
        <tr>
            <td style="width: 10%;">Coleção</td>
            <td style="width: 10%;">Edição</td>
            <td style="width: 18%;">Disciplina</td>
            <td style="width: 16%;">Ano</td>
            <td style="width: 16%;">Volume</td>
            <td style="width: 15%;">Unidade</td>
            <td style="width: 15%;">Tipo</td>            
        </tr>
    </thead>
    <tbody>
    <%
        List<AbstractClassificacao> lista = Model.Lista.listByTipo(EnumTipoClassificacao.SPE);
        foreach (SPE SPE in lista)
            {
            %>
                    <tr>
                        <td width="10%"><%= SPE.colecao.colecao %></td>
                        <td width="10%"><%= SPE.edicao.edicao %></td>
                        <td width="18%"><%= SPE.disciplina.disciplina %></td>
                        <td width="16%"><%= SPE.ano.ano %></td>
                        <td width="16%"><%= SPE.volume.volume %></td>
                        <td width="15%"><%= SPE.unidade.unidade %></td>
                        <td width="15%"><%= SPE.tipo.tipo %></td>
                    </tr>
            <%
            }

            %>
    </tbody>
</table>
