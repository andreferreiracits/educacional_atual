<%@ Control Language="C#" Inherits="System.Web.Mvc.ViewUserControl<ProvaColegiada.TabelaViews.ClassificacaoView>" %>
<%@ Import namespace="ProvaColegiada.Models.Question" %>
<%@ Import namespace="ProvaColegiada.Models.Classificacao" %>
<%@ Import namespace="ProvaColegiada.TabelaViews" %>

<table class="tabela tamQuestao <%=Model.hideTipoClassificacao(EnumTipoClassificacao.Habilidade) %>" cellpadding="0" cellspacing="0">
    <thead>
        <tr>
            <td style="width: 480px;">Habilidades</td>
            <td style="width: 480px;">Competências</td>
        </tr>
    </thead>
    <tbody>
    <%
        List<AbstractClassificacao> lista = Model.Lista.listByTipo(EnumTipoClassificacao.Habilidade);
        foreach (Habilidade habilidade in lista)
            {
            %>
                    <tr>
                        <td width="50%">
                            <a class="lnk"><%= habilidade.Nome%></a>
                        </td>
                        <td width="50%"><%= habilidade.Competencia.Nome%></td>
                    </tr>
            <%
            }

            %>
    </tbody>
</table>



