<%@ Control Language="C#"  Inherits="System.Web.Mvc.ViewUserControl<ProvaColegiada.TabelaViews.SimuladoRankingView>" %>

<%@ Import namespace="ProvaColegiada.TabelaViews" %>
<%@ Import namespace="ProvaColegiada.Models.Classificacao" %>


<p><%=Model.NomeSimulado %></p>
<input type="hidden" name="status" value="<%=Model.Estado %>" />
<input type="hidden" name="IdSimulado" value="<%=Model.IdSimulado %>" />
<input type="hidden" name="etapa" value="visualizar" />
<table id="tblVisualizarRanking" class="tabela">
	<thead>
		<tr>
			<td>Usuario</td>
			<td>Escola</td>
            <td>Série</td>
            <td>Turma</td>
            <td>Pos. Nacional</td>
			<td>Pos. Escola</td>
            <td>Pos. Serie</td>
            <td>Pos. Turma</td>
            <td>Nota</td>
            <td>Media Nacional</td>
			<td>Media Escola</td>
            <td>Media Turma</td>
            <td>Media Serie</td>
		</tr>
	</thead>
	<tbody></tbody>
</table>


