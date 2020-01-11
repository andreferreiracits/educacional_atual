<%@ Page Language="C#" Inherits="System.Web.Mvc.ViewPage<ProvaColegiada.TabelaViews.ImpressaoRealizada>" %>

<%@ Import Namespace="ProvaColegiada.TabelaViews "%>
<%@ Import Namespace="ProvaColegiada.TabelaViews.Shared "%>
<%@ Import Namespace="ProvaColegiada.Models.Question "%>


<!DOCTYPE html PUBLIC "-//W3C//DTD XHTML 1.0 Transitional//EN" "http://www.w3.org/TR/xhtml1/DTD/xhtml1-transitional.dtd">
<html xmlns="http://www.w3.org/1999/xhtml">
    <head>
        <meta http-equiv="Content-Type" content="text/html; charset=iso8859-1" />
        <meta http-equiv="imagetoolbar" content="no" />

        <title>Impressão - Prova</title>
    
        <% Html.RenderPartial("../Criacao/Impressao/ImpressaoCss", Model); %>
    </head>
    <body>
    
    <% Html.RenderPartial("Impressao/ImpressaoCabecalho", Model); %>
    <br />
    <% Html.RenderPartial(Model.ViewIntroducao, Model); %>

    <% int indice = 0;
        if(Model.MultiploEnunciadoBase.Count > 0){
        indice = 1; %>
    <table>
        <% foreach (QuestaoPrint questao in Model.MultiploEnunciadoBase){ %>
            <tr>
            <td class="enunciadobaseTitulo">Enunciado base <%=indice %>- Atenção! Este enunciado comtempla as questões <%=Model.EnunciadoBaseMultiplaReferencia(questao.Id)%></td>
            </tr>
            <tr><td class="enunciadobaseConteudo"><%=UtilView.ResolvePathImgPrint(questao.Enunciado.Texto.TextoView)%></td></tr>
        <%  indice++;
            } %>
    </table>
    <br />
    <% } %>

    <% 
        
            indice = 1;
            foreach (GrupoQuestaoRealizada grupo in Model.GruposRealizadas)
            {
                //Html.RenderPartial(grupo.ViewCapa, grupo);
                if (grupo.Grupo.Capa && !String.IsNullOrWhiteSpace(grupo.Grupo.Conteudo))
                {
                    %>
                    <div style="page-break-before: always;"></div>
                    <%=grupo.Grupo.Conteudo%>
                    <div style="page-break-before: always;"></div>
                    <%
                }
                foreach (QuestaoRealizada questao in grupo.Questoes)
                {
                    //Html.RenderPartial("Impressao/QuestaoRealizadaPrint", Model.QuestaoPrintRealizada(questao, indice));
                    QuestaoRealizadaPrint questaoRealizadaPrint = Model.QuestaoPrintRealizada(questao, indice);
                    QuestaoPrint questaoPrint = Model.QuestaoPrint(questao);

                    if (questao.Anulada == QuestaoAnulada.TipoAnulada.Nao)
                    { 
                    
                    %>
                    <table>
                        <tr>
                            <td class="questaoIndice">Questão <%=questaoRealizadaPrint.Indice%> -&nbsp;</td>
                            <td class="questaoInfo"><%=questaoRealizadaPrint.CabecalhoQuestao%></td>
                            <td class="questaoNota"><% Html.RenderPartial(questaoRealizadaPrint.ViewValorQuestao, questaoRealizadaPrint); %></td>
                        </tr>

                    <% if (Model.TemReferenciaMultiploEnunciadoBase(questaoPrint))
                       { %>
                        <tr><td class="questaoBase" colspan="3">Leia o enunciado base <%=Model.ReferenciaMultiploEnunciadoBase(questaoPrint)%> antes de responder</td></tr>
                    <% } %>
                        <tr><td class="questaoConteudo" colspan="3"> 

                            <% Html.RenderPartial(questaoRealizadaPrint.ViewTipoRealizadaPrint, questaoRealizadaPrint.TipoRealizada); %>
                        </td></tr>
                    </table>

                    <%
                    }
                    else
                    {
                        %>
                    <table>
                        <tr>
                            <td class="questaoIndice">Questão <%=questaoRealizadaPrint.Indice%></td>
                        </tr>
                        <tr><td class="questaoConteudo" colspan="3" style="vertical-align:middle; text-align:center;">
                            <img src="<%=UtilView.UrlPrint(Request) + "/Content/imgcss/1.0.2/print-anulada.gif"%>" align="middle"   /> 
                            <% 
                        if (questao.Anulada == QuestaoAnulada.TipoAnulada.ComNota) {
                        %>
                            Todos que realizaram a avaliação vão receber o valor(<%=questao.Valor.ToString("0.00") %>) correspondente à questão anulada.
                        <%
                        }
                        else if (questao.Anulada == QuestaoAnulada.TipoAnulada.SemNota)
                        {
                            %>
                            O valor (<%=questao.Valor.ToString("0.00") %>) coreespondente a esta questão foi removido da avaliação.
                            <%
                        
                        }
                            %>
                        </td></tr>
                    </table>
                        <%
                    }
                    indice++;
                }
            }
      %>
     <br />
     
     <% Html.RenderPartial(Model.ViewFinal, Model); %>
     
     <br />

     <% Html.RenderPartial(Model.ViewGabarito, Model); %>


    </body>
</html>
