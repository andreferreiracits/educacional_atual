<%@ Control Language="C#" Inherits="System.Web.Mvc.ViewUserControl<ProvaColegiada.TabelaViews.AplicacaoView>" %>
<%@ Import namespace="ProvaColegiada.Models.Exam.Realizador" %>
<div id="AA_Mask"></div>
<div id="AA_Main">
	<ul id="cnfg_aplicador_navegacao">
		<li class="passo1">
			<a>Selecionar participantes</a>
		</li>
		<li class="passo2">
			<a>Configurações</a>
		</li>
		<li class="passo3">
			<a>Resumo</a>
		</li>
	</ul>
    <div class="mensagem comBotao boxMsg"></div>
<% using (Html.BeginForm("QuickSalvar", "Aplicacao", FormMethod.Post, new { @id = "frmSalvarAplicacao" })) { %>
    <%=Html.Hidden("txtIdProva", Model.IdProva) %>
    <%=Html.Hidden("txtIdAplicacao", Model.Id)%>
    <%=Html.Hidden("txtIdConfig", Model.IdConfig)%>
<% } %>    

    <div id="AA_Grupos">
        <% Html.RenderPartial(Model.BoxGrupo, Model); %>
    </div>
<% using (Html.BeginForm("QuickSalvar", "Aplicacao", FormMethod.Post, new { @id = "frmAplicacao" })) { %>
    <% IList<AbstractTipoRealizadores> realizadores = Model.Realizadores(EnumTipoRealizadores.RealizadorGrupo);
       if (realizadores.Count > 0)
       {
           foreach (RealizadoresGrupo realizador in realizadores)
           {  %>
            <input type="hidden" value="<%=realizador.Id %>" name="chkRealizadorGrupo" />
        <% }
       }%>
    <div id="AA_Config"></div>
    <div id="AA_Resumo"></div>
<% } %> 
</div>