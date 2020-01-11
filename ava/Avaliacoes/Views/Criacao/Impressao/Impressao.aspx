<%@ Page Language="C#" Inherits="System.Web.Mvc.ViewPage<ProvaColegiada.TabelaViews.ImpressaoProva>" %>

<%@ Import Namespace="ProvaColegiada.TabelaViews "%>
<%@ Import Namespace="ProvaColegiada.TabelaViews.Shared "%>

<!DOCTYPE html PUBLIC "-//W3C//DTD XHTML 1.0 Transitional//EN" "http://www.w3.org/TR/xhtml1/DTD/xhtml1-transitional.dtd">
<html xmlns="http://www.w3.org/1999/xhtml">
    <head>
        <meta http-equiv="Content-Type" content="text/html; charset=iso8859-1" />
        <meta http-equiv="imagetoolbar" content="no" />

        <title>Impressão - Prova</title>
    
        <% Html.RenderPartial("Impressao/ImpressaoCss", Model); %>

        <style>
            .btnImprimir{
                margin: 0px;
                padding: 5px 10px;
                font-size: 15px;
                text-align: center;
                text-decoration: none;
                display: inline-block;
                color: #FFFFFF;
                background-color: #197DB8;
                -webkit-border-radius: 5px;
                -moz-border-radius: 5px;
                border-radius: 5px;
                text-shadow: 1px 1px 0px #666;
                cursor: pointer;
                border: 0px;
                margin-bottom: 10px;
                float: right;
                clear: both;
            }
            .btnImprimir:hover {
                background-color: #166FA3;
            }
        </style>
        <style media="print">
            .btnImprimir
            {
                display: none;
            }
        </style>
    </head>
    <body onload="window.print()">
    <button onclick="window.print()" class="btnImprimir">Imprimir</button>
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
    <% if(Model.Questoes.Count > 0){
            indice = 1;
            foreach (ProvaGrupoPrint grupo in Model.Grupos)
            {
                Html.RenderPartial(grupo.ViewCapa, grupo);
                foreach (QuestaoPrint questao in grupo.Questoes)
                {
                    //teste se imprime a capa do grupo
                %>
                <table>
                    <tr>
                        <td class="questaoIndice">Questão <%=indice%> -&nbsp;</td>
                        <td class="questaoInfo"><%=Impressao.CabecalhoQuestao(questao)%></td>
                        <td class="questaoNota"><% Html.RenderPartial(Model.ViewNotaQuestao, Model.NotaQuestao(questao)); %></td>
                    </tr>
                
                <% if (Model.TemReferenciaMultiploEnunciadoBase(questao))
                   { %>
                    <tr><td class="questaoBase" colspan="3">Leia o enunciado base <%=Model.ReferenciaMultiploEnunciadoBase(questao)%> antes de responder</td></tr>
                <% } %>
                    <tr><td class="questaoConteudo" colspan="3"> 
                        <% Html.RenderPartial(questao.ViewPrintQuestao, questao); %>
                    </td></tr>
                </table>
            <%
                indice++;
                }
            }
     } %>
     <br />
     <% if(Model.Questoes.Count > 0){ %>
            <table><tr><td class="linhasFinal">
           <% foreach(QuestaoPrint questao in Model.Questoes){
                if (questao.ViewLinhasFinal != "Vazia")
                { 
                %>
                <% Html.RenderPartial(questao.ViewLinhasFinal, questao); %>
                <br />
                <%
                }
          } %>
          </td>
          </tr>
          </table>
     <% } %>


     <% Html.RenderPartial(Model.ViewFinal, Model); %>
     
     <br />

     <% Html.RenderPartial(Model.ViewGabarito, Model); %>

     <button onclick="window.print()" class="btnImprimir">Imprimir</button>
    </body>
</html>
