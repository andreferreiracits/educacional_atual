<%@ Control Language="C#" Inherits="System.Web.Mvc.ViewUserControl<SelectInputModel>" %>
<%@ Import Namespace="Avaliacoes.Framework.Utils.Entidades "%>

<label><input name="Avaliacao[Compartilhada]" type="radio" value="<%=EnumCompartilhamento.Privada %>" checked="checked">Privada</label>
<label><input name="Avaliacao[Compartilhada]" type="radio" value="<%=EnumCompartilhamento.Escola %>">Compartilhada com professores da minha escola</label>


