<%@ Page Title="" Language="C#" MasterPageFile="~/Views/Shared/Site.Master" Inherits="System.Web.Mvc.ViewPage<dynamic>" %>
<asp:Content ID="TitleArea" ContentPlaceHolderID="TitleArea" runat="server">
    <link href="../../Content/css/questao.css" rel="stylesheet" type="text/css" />
    <link href="../../Content/css/mceView.css" rel="stylesheet" type="text/css" />
</asp:Content>

<asp:Content ID="ContentArea" ContentPlaceHolderID="ContentArea" runat="server">
    <div id="conteudo">
	    <div class="caixa">
            <% Html.RenderPartial("MenuConteudo"); %>
			<div id="caixaConteudo" class="caixaConteudo">
			    <% Html.RenderPartial("BancoSelecionado"); %>
                <div class="cxaTituloPagina">
    	            <h3 class="tituloStatus">Relatórios da Aplicação</h3>
                 	<%= Html.ActionLink("« Voltar a listagem dos retalórios", "Aplicacao", "Relatorio", new { @class = "linkPadrao" })%>
                </div>
                <% Html.RenderPartial("MenuSubConteudo"); %>

			    <div class="clear"></div>
                <table width="100%" cellspacing="0" cellpadding="0" border="0" style="margin-top: 8px;" class="tabela scroll scrollH420" id="tblQuadroGeral">
                <thead>
                    <tr>
                        <td align="center" style="width: 300px; padding-left: 10px;">Alunos</td>
                        <td align="center" style="width: 250px;">Média</td>
                        <td align="center" style="width: 150px;">Erro Padrão</td>
                        <td align="center" style="width: 100px;">Devio Padrão</td>
                    </tr>
                </thead>
               <tbody>
               	<tr>
                	<td colspan="4">
                    	<div>
                        	<table width="100%">
                            	<tbody>
                                <tr align="center" valign="middle" height="50" class="linhaTabelaQuestoes">
                                    <td align="center" valign="middle" height="40" style="width: 300px;">30 </td>
                                    <td align="center" valign="middle" height="40" style="width: 250px;">56%</td>
                                    <td align="center" valign="middle" height="40" style="width: 150px;">60%</td>
                                    <td align="center" valign="middle" height="40" style="width: 100px;">54%</td>
                                </tr>
                                </tbody>
                            </table>
                        </div>
                    </td>
                </tr>
            </tbody>
            </table>

            </div>
		</div>
    </div>
</asp:Content>
