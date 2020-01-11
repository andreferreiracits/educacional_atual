<%@ Control Language="C#" Inherits="System.Web.Mvc.ViewUserControl<ProvaColegiada.TabelaViews.ClassificacaoView>" %>
<%@ Import namespace="ProvaColegiada.Models.Question" %>
<%@ Import namespace="ProvaColegiada.Models.Classificacao" %>
<%@ Import namespace="ProvaColegiada.TabelaViews" %>

<table class="tabela tamQuestao <%=Model.hideTipoClassificacao(EnumTipoClassificacao.Enem) %>" cellpadding="0" cellspacing="0">
    <thead>
        <tr>
            <td style="width: 480px;">Enem</td>
        </tr>
    </thead>
    <tbody>
    <%
        List<AbstractClassificacao> lista = Model.Lista.listByTipo(EnumTipoClassificacao.Enem);
        foreach (Enem enem in lista)
            {
            %>
                    <tr>
                        <td width="50%">
                            <a class="lnk"><%= enem.NomeCompleto%></a>
                        </td>
                    </tr>
            <%
            }

            %>
    </tbody>
</table>



