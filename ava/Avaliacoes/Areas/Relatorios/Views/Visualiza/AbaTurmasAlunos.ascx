<%@ Control Language="C#" Inherits="System.Web.Mvc.ViewUserControl<dynamic>" %>
<%@ Import Namespace="Avaliacoes.Servicos.Relatorios.Imp" %>
<div class="slc menuTipoGrafico" data-tipo="menutipografico" data-destino="#sec025conteudoTipoGrafico">
    <a class="nome slcLarga">Selecione um tipo de gráfico</a>
    <div class="opcoes">
        <ul>
            <li><label><%=Html.RadioButton("Consulta[Tipo]", TipoConsulta.AcertoErro.Id, false, new { @id = "" })%> Acertos x acerto parciais x erros</label></li>
            <li><label><%=Html.RadioButton("Consulta[Tipo]", TipoConsulta.HabilidadeCompencia.Id, new { @id = "" })%> Competências e habilidades</label></li>
            <li><label><%=Html.RadioButton("Consulta[Tipo]", TipoConsulta.AreaAssunto.Id, new { @id = "" })%> Áreas e assuntos</label></li>
        </ul>
    </div>
</div>
<div id="sec025conteudoTipoGrafico" class="sec025carregando"> </div>


