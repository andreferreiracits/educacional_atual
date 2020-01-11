<%@ Control Language="C#" Inherits="System.Web.Mvc.ViewUserControl<Avaliacoes.Framework.Utils.Mensagem.MensagemErro>" %>

<div data-render="avl_msg" class="SEC025-11_erro" title="<%=Model.Titulo %>" data-id="<%=Model.Id %>" data-acao="<%=Model.Acao %>"><p><%=Model.Mensagem %></p></div>