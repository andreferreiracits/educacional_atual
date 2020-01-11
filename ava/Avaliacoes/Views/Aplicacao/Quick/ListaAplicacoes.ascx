<%@ Control Language="C#" Inherits="System.Web.Mvc.ViewUserControl<IList<ProvaColegiada.TabelaViews.AplicacaoVOView>>" %>
<%@ Import namespace="ProvaColegiada.ValueObjects" %>
<%@ Import namespace="ProvaColegiada.Models.Exam" %>
<div id="AA_Mask"></div>
<div id="AA_Main">
<p class="titulo">Edite as configurações da atividade ou crie uma nova configuração</p>
    <table class="cnfg_aplicador_tblAplicacao tabela" cellspacing="0">
        <thead>
            	<tr>
					<td>Configurações</td>
					<td></td>
					<td class="cnfg_borderRight"></td>
					<td class="cnfg_borderLeft_Right">Editar</td>
					<td class="cnfg_borderLeft">Excluir</td>
				</tr>
        </thead>
        <tbody>
    <%
        if (Model != null &&  Model.Count > 0) {
            foreach (var linha in Model) {
    %>
    			    <tr>
					    <td><%= (linha.TamanhoTitulo == 0) ? ("<em class=\"semEnunciado\">" + linha.Titulo + "</em>") : Html.Encode(linha.Titulo)%></td>
					    <td><span><%= Html.Encode(linha.RealizacaoInicio)%></span></td>
					    <td class="cnfg_borderRight"><span><%= Html.Encode(linha.RealizacaoFim)%></span></td>
					    <td class="cnfg_borderLeft_Right"><a class="cnfg_aplicador_btnEditar  btn btnEditar"  href="<%=linha.IdLink%>"></a></td>
					    <td class="cnfg_borderLeft"><a class="cnfg_aplicador_btnExcluir btn btnExcluir" href="<%=linha.IdLink%>"></a></td>
				    </tr>
    <%
            }
        } else {
    %>
            <tr class="vazio">
                <td colspan="2">Nenhuma prova encontrada.</td>
            </tr>
    <%
        }
    %>
        </tbody>
    </table>
    <div id="cnfg_aplicador_botoes">
	    <a id="btnCriarNovaConfiguracao" class="btnNav">Nova Configuração</a>
    </div>
</div>