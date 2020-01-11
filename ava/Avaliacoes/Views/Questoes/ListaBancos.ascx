<%@ Control Language="C#" Inherits="System.Web.Mvc.ViewUserControl<IList<ProvaColegiada.TabelaViews.FiltroBancoQuestao>>" %>
<%@ Import Namespace="ProvaColegiada.TabelaViews" %>
<% 
    int nLinha = 1;
%>
<%
    foreach (FiltroBancoQuestao filtro in Model)
    {
       %>
       <div class="tblListaBancos <%= nLinha % 2 == 0 ? "par" : "" %>">
           <label>
               <input name="<%=filtro.Name %>" id="<%= filtro.Id %>" value="<%= filtro.Value %>" type="checkbox" checked="checked"/>
               <span> <%= filtro.Texto %></span>
           </label>
       </div>
       <%
       nLinha++;
    }
%>