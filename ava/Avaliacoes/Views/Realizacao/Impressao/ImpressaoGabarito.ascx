<%@ Control Language="C#" Inherits="System.Web.Mvc.ViewUserControl<ProvaColegiada.TabelaViews.ImpressaoRealizada>" %>
<%@ Import Namespace="ProvaColegiada.TabelaViews "%>
<%@ Import Namespace="ProvaColegiada.TabelaViews.Shared "%>
<%@ Import Namespace="ProvaColegiada.Models.Question "%>

<table class="gabarito">
    <tr>
        <td class="gabaritoLinhaRecorte"><img src="data:image/gif;base64,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" /></td>
    </tr>
    <tr>
        <td> </td>
    </tr>
    <tr>
        <td class="gabaritoTitulo">Gabarito</td>
    </tr>
    <tr>
        <td>
            <table>
            <%
                int indice = 1;
                foreach (GrupoQuestaoRealizada grupo in Model.GruposRealizadas)
                {
                    //Html.RenderPartial(grupo.ViewCapa, grupo);
                    foreach (QuestaoRealizada questao in grupo.Questoes)
                    {
                        

                            
                        
                        %>
                <tr>
                    <td class="gabaritoContent">
                        Questão <%=indice%> - 
                        <% 
                        if (questao.Anulada == QuestaoAnulada.TipoAnulada.Nao)
                        {
                            QuestaoPrint questaoP = Model.QuestaoPrint(questao);
                            Html.RenderPartial(questaoP.ViewPrintGabaritoQuestao, questaoP);
                        }
                        else
                        {
                            Response.Write("Anulada");
                        }
                        %>
                    </td>
                </tr>
            <%

                        indice++;
                    }
                }
                %>
            </table>
        </td>
    </tr>
</table>





