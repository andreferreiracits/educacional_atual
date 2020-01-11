<%@ Control Language="C#" Inherits="System.Web.Mvc.ViewUserControl<ProvaColegiada.TabelaViews.AbstractProvaView>" %>
<div id="realizar" tipos="<%=Model.ArrayStringTipoResposta%>">

<% Html.RenderPartial("../Realizacao/ListaQuestoesTmpl"); %>
<div id="AR_conteudo">
	<div class="barraPrincipal">
		<div id="boxTitulo" class="fundo">
			<div class="areaTexto">
				<div class="logoAvaliacoes"></div><div class="campoTexto" title="<%= Html.Encode(Model.Nome) %>"><%= Html.Encode(Model.Nome) %></div>
				<div class="bordaEsq">&nbsp;</div>
			</div>
            <% Html.RenderPartial(Model.BoxBtnInstrucao);%>
            <% Html.RenderPartial(Model.BoxTempo, Model);%>
		</div>
	</div>
    <div class="barraPrincipalSombra hide"></div>
    <% Html.RenderPartial(Model.BoxListaQuestoes, Model);%>
    <div class="barraSombraNavegacao hide"></div>
    <div class="mensagem comBotao boxMsg"></div>
    <div id="boxAreaRealizacao">
	    <div class="areaPaginacao">
            <%Html.RenderPartial(Model.BoxPaginacao, Model); %>
	    </div>
        <div class="btnPaginacaoSuperiorSombra"></div>
        <% Html.RenderPartial(Model.BoxAreaQuestao, Model);%>
    </div>
    <% Html.RenderPartial(Model.BoxEncerrar, Model);%>
    <% Html.RenderPartial(Model.BoxInstrucao, Model);%>
    <% using (Html.BeginForm("SalvarImagemAnexo", "Realizacao", FormMethod.Post, new { @id = "frmPathFiles" }))
    { 
    %>
        <input type="hidden" id="strPathFiles" value="<%=Model.CaminhoUpload %>" />
    <%  } %>
    
</div>
