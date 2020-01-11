<%@ Control Language="C#" Inherits="System.Web.Mvc.ViewUserControl<ProvaColegiada.TabelaViews.ClassificacaoView>" %>
<%@ Import namespace="ProvaColegiada.Models.Question" %>
<%@ Import namespace="ProvaColegiada.Models.Classificacao" %>
<%@ Import namespace="ProvaColegiada.TabelaViews" %>

<table class="tabela tamQuestao <%=Model.hideTipoClassificacao(EnumTipoClassificacao.NivelEnsino) %>" cellpadding="0" cellspacing="0">
    <thead>
        <tr>
            <td style="width: 480px;">Nível de ensino</td>
            <td style="width: 480px;">Série/Ano</td>
        </tr>
    </thead>
    <tbody>
    <%
        List<AbstractClassificacao> lista = Model.Lista.listByTipo(EnumTipoClassificacao.NivelEnsino);
        foreach (NivelEnsino nivelensino in lista)
            {
            %>
                    <tr>
                        <td width="50%">
                            <a class="lnk"><%= nivelensino.Pai.Nome%></a>
                        </td>
                        <td width="50%"><%=nivelensino.RepresentaRaiz ? "" : nivelensino.Nome%></td>
                    </tr>
            <%
            }

            %>

    </tbody>
</table>



