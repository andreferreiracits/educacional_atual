<%@ Control Language="C#" Inherits="System.Web.Mvc.ViewUserControl<ProvaColegiada.TabelaViews.EnunciadoView>" %>

<input type="hidden" id="hidTemHtmlEnunciado_<%=Model.Id %>" name="hidTemHtmlEnunciado" value="<%= (Model.Texto.TemHtml || Model.Texto.Plano == "" ) ? "1" : "0" %>" />

<%= Html.TextArea("txtEnunciado", (Model.Texto.TemHtml) ? Model.Texto.Html : Model.Texto.Plano, new { @id = "txtEnunciado_" + Model.Id, @cols = "74", @rows = "18", @class = "txtareaEnunciado " + Model.Estilo, @maxchar = Model.Limite, @maxcharmsg = String.Format(Model.MsgLimiteChar, Model.Limite) })%>

<ul class="opcoesAdicionais">
    <li class="editorTxt"><a title="Permite apenas texto puro sem formatação. A formatação atual será perdida.">Editor texto</a></li>
    <li class="editorHtml"><a title="Permite a formatação do texto (negrito. itálico, etc.) e a inclusão de recursos como imagens, simuladores e fórmulas matemáticas.">Editor HTML</a></li>
    <li class="comentAluno"><a>(Inserir|Exibir|Ocultar) Comentário</a></li>
    <li class="comentDica"><a>(Inserir|Exibir|Ocultar) Dica</a></li>
    <li class="comentProf"><a>(Inserir|Exibir|Ocultar) Sugestão para professor</a></li>
</ul>
<%
    Html.RenderPartial("Comentario", Model.Comentario);
%>