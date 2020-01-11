<%@ Control Language="C#" Inherits="System.Web.Mvc.ViewUserControl<dynamic>" %>

<div class="ava_lightbox_alert">
    <p><h4><%=ViewData["strMensagem"]%></h4></p>
    <a id="fecharLightBox" href="javascript:void(0);" class="large awesome awesome-color "><span></span>OK</a>
</div>
