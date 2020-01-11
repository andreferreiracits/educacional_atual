<%@ Control Language="C#" Inherits="System.Web.Mvc.ViewUserControl<IList<ProvaColegiada.TabelaViews.ImpressaoProva.ImprimirArquivoView>>" %>
<%@ Import Namespace="ProvaColegiada.TabelaViews "%>
<%@ Import Namespace="ProvaColegiada.TabelaViews.Shared "%>
<div id="modelos">
    <p>Selecione qual modelo você deseja imprimir agora:<a href="javascript:void(0);" class="fechar"></a></p>
    <ul>
    <% foreach (ImpressaoProva.ImprimirArquivoView arquivo in Model)
       {  %>
       
           <li><span>Modelo <%=arquivo.Modelo%></span><br />
           <a href="<%=String.Format("{0}?{1}", arquivo.Caminho, DateTime.Now.ToString("hhMMss") ) %>" class="btn">download</a>
           </li>
        
    <% } %>
    </ul>
    
</div>