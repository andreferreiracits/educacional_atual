<%@ Control Language="C#" Inherits="System.Web.Mvc.ViewUserControl<int>" %>
<%@ Import Namespace="ProvaColegiada.TabelaViews "%>
<%@ Import Namespace="ProvaColegiada.TabelaViews.Shared "%>
<div id="modelos">
    <input type="hidden" name="hidEmbaralhar" value="1" />
    <p>Selecione qual modelo você deseja imprimir agora:<a href="javascript:void(0);" class="fechar"></a></p>
    <ul>
    <% for (int i = 1; i <= Model; i++ )
       {  %>
       
           <li>
           <a href="javascript:void(0);" onclick="imprimirAvaliacaoHtml()" class="btnNav">Modelo <%=i%></button>
           <!--%= Html.ActionLink("Imprimir", "ImprimirHtml", "Criacao", new { @onclick = "imprimirAvaliacaoHtml()", @class = "btnNav" })%-->
           <!--a href="< %=String.Format("{0}?{1}", arquivo.Caminho, DateTime.Now.ToString("hhMMss") ) %>" class="btn">download</a-->
           </li>
        
    <% } %>
    </ul>
    
</div>