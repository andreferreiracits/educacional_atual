<%@ Control Language="C#"  Inherits="System.Web.Mvc.ViewUserControl<ProvaColegiada.TabelaViews.SimuladoRankingView>" %>

<%@ Import namespace="ProvaColegiada.TabelaViews" %>
<%@ Import namespace="ProvaColegiada.Models.Classificacao" %>

<p><%=Model.NomeSimulado %></p>
<input type="hidden" name="status" value="<%=Model.Estado %>" />
<input type="hidden" name="IdSimulado" value="<%=Model.IdSimulado %>" />
<input type="hidden" name="etapa" value="criar" />
<div id="criarRanking">
<div>
<label>Escolas internas: <input type="text" name="strEscolasInternas" class="txt" value="<%=Model.IdsEscolasInternas %>" /></label>
</div>
<div>
<label>Remover alunos: <input type="text" name="idsUsuariosRemover" class="txt" value="<%=Model.IdUsuariosRemover %>" /></label>
</div>
<div class="clear"></div>
<div>
<p>Agrupamentos</p>
<table>
<thead>
    <tr>
        <th>Prova</th>
        <th>Grupo</th>
        <th>Agrupamento</th>
        <th>Nota Agrupamento</th>
    </tr>
</thead>
<% foreach(SimuladoRankingView.RankingProvaGrupoView provas in Model.ProvaGrupo) {

       foreach (int grupo in provas.GruposProva.Keys)
       {
           
       %>
       <tr>
           <td><input type="hidden" name="idProva" value="<%=provas.IdProva %>" /><%=provas.NomeProva%></td>
           <td><input type="hidden" name="idGrupo" value="<%=grupo %>" /><%=String.IsNullOrWhiteSpace(provas.GruposProva[grupo]) ? "<i>Sem grupo</i>" : provas.GruposProva[grupo] %></td>
           <td><input type="text" name="strGrupoRanking" class="txt" value="<%=Model.NomeAgrupamento(provas.IdProva,grupo) %>" /></td>
           <td><%=Model.NotaAgrupamento(provas.IdProva,grupo) %></td>
       </tr>
        

<% }
    
    } %>
</table>
<% if (Model.HasRedacao) { %>

<% } %>
</div>
<div>
<p>Classificações</p>
<% foreach (EnumTipoClassificacao classificacao in (EnumTipoClassificacao[])ViewData["Classificacoes"])
   {%>
   <label><input type="checkbox" value="<%=classificacao.Id %>" name="chkClassificacao" <%=Model.ClassificacaoCheck(classificacao) %> /><%=classificacao.Nome %></label>
<%} %>
</div>

</div>