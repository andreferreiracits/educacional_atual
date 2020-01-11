<%@ Control Language="C#" Inherits="System.Web.Mvc.ViewUserControl<ProvaColegiada.TabelaViews.AgendamentoView>" %>
<%@ Import Namespace="ProvaColegiada.TabelaViews.Shared "%>
<p>Você pode refazer esta avaliação <%= Model.NrTentativas %> vezes. Quando finalizar, serão consideradas as respostas da última tentativa.</p>