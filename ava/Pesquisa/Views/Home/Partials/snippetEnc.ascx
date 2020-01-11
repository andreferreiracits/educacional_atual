<%@ Control Language="C#" Inherits="System.Web.Mvc.ViewUserControl<Pesquisa.Business.Models.Publicacao>" %>

<h5> <a target="_new" href="/enciclopedia/renciclopedia.asp?idpag=1&id=<%:Model.idPublicacao%>&strtitulo=<%:Model.strTitulo%>"><%:Model.strTitulo%></a></h5>
<p><%=Model.strTexto%></p>
