<%@ Control Language="C#" Inherits="System.Web.Mvc.ViewUserControl<ProvaColegiada.TabelaViews.VisualizacaoProvaView>" %>


<div id="realizar" tipos="<%=Model.ArrayStringTipoResposta%>">
<% Html.RenderPartial("../Realizacao/ListaQuestoesTmpl"); %>
<div id="AR_conteudo">	
	<div class="barraPrincipal">
		<div id="boxTitulo" class="fundo">
			<div class="areaTexto">
				<div class="campoTexto"><%= Model.Nome %></div>
				<div class="bordaEsq">&nbsp;</div>
			</div>
		</div>
		
	</div>
    <div class="barraPrincipalSombra"></div>

	<div id="msgAlerta" class="msgAlerta hide"></div>
        
        <div id="boxAreaRealizacao">
	    <div class="areaPaginacao">
            <!--% Html.RenderPartial(Model.BoxPaginacao, Model.Paginacao); %-->
	    </div>
        <div class="btnPaginacaoSuperiorSombra"></div>
        <% Html.RenderPartial(Model.BoxListaQuestoes, Model);%>
        <% Html.RenderPartial(Model.BoxAreaQuestao, Model);%>
    </div>
    <!--% Html.RenderPartial(Model.BoxEncerrar, Model);%-->
    </div>

			

    </div>
</div>