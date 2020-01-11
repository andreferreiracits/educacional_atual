<%@ Control Language="C#" Inherits="System.Web.Mvc.ViewUserControl<ProvaColegiada.TabelaViews.ClassificacaoView>" %>
<%@ Import namespace="ProvaColegiada.Models.Question" %>
<%@ Import namespace="ProvaColegiada.Models.Classificacao" %>
<%@ Import namespace="ProvaColegiada.TabelaViews" %>

<table class="tabela tamQuestao <%=Model.hideTipoClassificacao(EnumTipoClassificacao.AssuntoPesquisaOpniao) %>" cellpadding="0" cellspacing="0">
    <thead>
        <tr>
            <td style="width: 480px;">Área</td>
            <td style="width: 480px;">Assunto</td>
        </tr>
    </thead>
    <tbody>
    <%
        List<AbstractClassificacao> lista = Model.Lista.listByTipo(EnumTipoClassificacao.AssuntoPesquisaOpniao);
        foreach (AssuntoPesquisaOpniao assunto in lista)
            {
            %>
                    <tr>
                        <td width="50%">
                            <a class="lnk"><%= assunto.Area.Nome%></a>
                        </td>
                        <td width="50%"><%= assunto.Nome%></td>
                    </tr>
            <%
            }

            %>

    </tbody>
</table>



