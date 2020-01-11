<%@ Control Language="C#" Inherits="System.Web.Mvc.ViewUserControl<dynamic>" %>
<%@ Import Namespace="Avaliacoes.Servicos.Relatorios.Imp" %>
<div style="display: none;">
    <div class="slc menuTipoGrafico" data-tipo="menutipografico" data-destino="#sec025conteudoTipoGrafico" data-tipografico-naopermetidodestino="#sec025conteudoTipoGraficoNaoPermetido" data-tipografico-naopermetidos="4">
        <a class="nome slcLarga">Selecione um tipo de gráfico</a>
        <div class="opcoes">
            <ul>
                <li><label><%=Html.RadioButton("Consulta[Tipo]", TipoConsulta.RelatorioQuestoesPorAlternativa.Id, false, new { @id = "" })%> Número de respostas por alternativa</label></li>
            </ul>
        </div>
    </div>
</div>
<div id="sec025conteudoTipoGrafico" class="conteudoAbaQuestao"></div>
<div id="sec025conteudoTipoGraficoNaoPermetido" class="conteudoAbaQuestao">
    <div class="grafico semDados"> <%: ViewData["TipoAvaliacaoSemGrafico"] %> </div>
</div>

<%=Html.ActionLink("Exportar Completo", "Exportar", new RouteValueDictionary(new { id = Model }), new Dictionary<string, object> {{"id","exportarPesquisa"}, { "class", "btnNav" } })%>
<script type="text/javascript">
    function exportarRelatorio($a) {
        var novoBotao = $("#exportarPesquisa");
        var link = novoBotao.attr('href');
        var path = window.location.href.toString().split('/')
        var idRelatorio = path[path.length - 1];
        link = link + "/" + idRelatorio;
        var formOrigem = $a.closest('form');
        novoBotao.click(function (evt) {
            evt.preventDefault();
            var parseFom = formOrigem.serializeObject();
            parseFom.Consulta.Tipo = <%=TipoConsulta.RelatorioCompletoPesquisaOpiniao.Id%>;
            var data = JSON.stringify(parseFom);
            
            var formPost = $('<form></form>');
            formPost.attr('method', 'post');
            formPost.attr('action', link);
            formPost.attr('target', '_blank');
            var input = $('<input name="datajson"/>')
            input.val(data);
            formPost.append(input);
            $('body').append(formPost);
            formPost.submit();
            $('#formExport').remove();
        }).attr('href', 'javascript:void(0);');
        novoBotao.insertBefore($a);
    };
    exportarRelatorio($('a[data-tipo="btnexportar"]'))
</script>

