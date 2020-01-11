<%@ Control Language="C#" Inherits="System.Web.Mvc.ViewUserControl<Avaliacoes.Framework.Utils.Mensagem.MensagemErro>" %>
<section id="avl_erro">
	<p><%= Model.Mensagem %></p>
	<p>
		<a href="javascript:history.back()">Voltar à página anterior</a>
		<a href="/">Voltar ao portal</a>
	</p>
</section>
