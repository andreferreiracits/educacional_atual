<%@ Page Title="" Language="C#" MasterPageFile="~/Views/Shared/Site.Master" Inherits="System.Web.Mvc.ViewPage<dynamic>" %>
<asp:Content ID="TitleArea" ContentPlaceHolderID="TitleArea" runat="server">
    
  <link href="../../Scripts/Graficos/jquery.jqplot.css" rel="stylesheet" type="text/css" />
  <script src="../../Scripts/jquery-1.4.1.js" type="text/javascript"></script>
 
  <script language="javascript" type="text/javascript" src="../../scripts/Graficos/jquery.jqplot.js"></script>
  <script language="javascript" type="text/javascript" src="../../scripts/Graficos/jqplot.barRenderer.js"></script>
  <script language="javascript" type="text/javascript" src="../../scripts/Graficos/jqplot.categoryAxisRenderer.js"></script>

<script class="code" type="text/javascript">    $(document).ready(function () {
        var s1 = [2, 6, 7, 10];
        var ticks = ['a', 'b', 'c', 'd'];

        plot1 = $.jqplot('chart1', [s1], {
            seriesDefaults: {
                renderer: $.jqplot.BarRenderer,
                pointLabels: { show: true }
            },
            axes: {
                xaxis: {
                    renderer: $.jqplot.CategoryAxisRenderer,
                    ticks: ticks
                }
            },
            highlighter: { show: false }
        });

        $('#chart1').bind('jqplotDataClick',
            function (ev, seriesIndex, pointIndex, data) {
                $('#info1').html('series: ' + seriesIndex + ', point: ' + pointIndex + ', data: ' + data);
            }
        );
    });</script>
  
    <script class="code" type="text/javascript">        $(document).ready(function () {
            var s1 = [2, 6, 7, 10];
            var s2 = [7, 5, 3, 2];
            var ticks = ['a', 'b', 'c', 'd'];

            plot2 = $.jqplot('chart2', [s1, s2], {
                seriesDefaults: {
                    renderer: $.jqplot.BarRenderer,
                    pointLabels: { show: true }
                },
                axes: {
                    xaxis: {
                        renderer: $.jqplot.CategoryAxisRenderer,
                        ticks: ticks
                    }
                }
            });

            $('#chart2').bind('jqplotDataHighlight',
            function (ev, seriesIndex, pointIndex, data) {
                $('#info2').html('series: ' + seriesIndex + ', point: ' + pointIndex + ', data: ' + data);
            }
        );

            $('#chart2').bind('jqplotDataUnhighlight',
            function (ev) {
                $('#info2').html('Nothing');
            }
        );
        });</script> 
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

            	<div class="divisaoQuestao">
                	<h2 class="tituloDivisao">Média de aproveitamento dos grupos</h2>
                    <span class="textoDivisao"></span>
                </div>

                <div id="chart2" style="margin-top:20px; margin-left:20px; width:600px; height:300px;"></div>

            	<div class="divisaoQuestao">
                	<h2 class="tituloDivisao">Percentual de notas obtidas por estudantes</h2>
                    <span class="textoDivisao"></span>
                </div>

                <div id="chart1" style="margin-top:20px; margin-left:20px; width:600px; height:300px;"></div>

            </div>
		</div>
    </div>
</asp:Content>
