<!--%@ Page Title="" Language="C#" MasterPageFile="~/Views/Shared/Site.Master" Inherits="System.Web.Mvc.ViewPage<Avaliacoes.Framework.Utils.Erros.IErro>" %-->
<%@ Page Title="" Language="C#" Inherits="System.Web.Mvc.ViewPage<Avaliacoes.Framework.Utils.Mensagem.MensagemErro>" %>


	<div id="conteudo" data-render="avl_msg">
	    <div class="caixa">
            <!--% Html.RenderPartial("MenuConteudo"); %-->
            <div id="caixaConteudo" class="caixaConteudo">
            
                <img src="<%=Html.ConteudoPath("Content/imgcss/404.png")%>" class="img-right" />
                <p class="fontePadrao"><%= Model.Mensagem %></p>
	            <br />
                <a href="javascript:history.back()" class="btn">Voltar à página anterior</a>
                <a href="#" class="btn">Voltar ao portal</a>
                <div class="clear"></div>
            </div>

        </div>
    </div>

