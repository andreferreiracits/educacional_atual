<%@ Control Language="C#" Inherits="System.Web.Mvc.ViewUserControl<ProvaColegiada.TabelaViews.AplicacaoView>" %>
   
        <table id="tblQuestoes" class="tabela scroll scrollH420" cellpadding="0" cellspacing="0" border="0" style="margin-top:8px;" width="100%">
            <thead>
                <tr>
                    <!--td style="width:50px;">&nbsp;</td-->
                    <td style="width:300px; padding-left:10px;">Nome</td>
                    <td style="width:250px;">Autor</td>
                    <td style="width:150px;">Modificado</td>
                    <td style="width:100px;">Tipo</td>
                </tr>
            </thead>
            <tbody>
        <tr>
            <td colspan="4">
                <div>
                    <table width="100%">
                        <tbody>                   
<%
if (Model != null &&  Model.Prova.Questoes.Count > 0)
{
    foreach (var questao in Model.Prova.Questoes)
    {
%>
    <tr height="50" valign="middle" class="linhaTabelaQuestoes">
        <td valign="middle" height="40" style="padding-left:5px;"><input type="checkbox" name="chkHidQuestao" value="<%=questao.Id %>" <%=Model.CheckQuestaoOculta(questao.Id) %> /></td>
        <td valign="middle" height="40" style="padding-left:5px;">
            <a class="lnk"><%= (questao.Enunciado.Plano.Length < 40) ? Html.Encode(questao.Enunciado.Plano) : Html.Encode(questao.Enunciado.Plano.Substring(0, 40) + "...")%></a>
        </td>
        <td valign="middle" height="40"><%= Html.Encode(questao.Autor)%></td>
        <td valign="middle" height="40"><%= Html.Encode(questao.UltimaModificacao)%></td>
        <td valign="middle" height="40"><%= Html.Encode(questao.TipoResposta.ToString())%></td>
    </tr>
<%
    }
}
else
{
%>
    <tr class="vazio">
        <td colspan="4">Nenhuma questão encontrada.</td>
    </tr>
<%
}
%>

                        </tbody>
                    </table>
                </div>
            </td>
        </tr>
    </tbody>
    </table>
        