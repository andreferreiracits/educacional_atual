<%@ Control Language="C#" Inherits="System.Web.Mvc.ViewUserControl<IList<ProvaColegiada.TabelaViews.ItemRealizacao>>" %>
<%@ Import Namespace="ProvaColegiada.TabelaViews" %>

<div class="btnPaginacaoInferior">
    <div id="paginacao"><ul>
<%  if (Model.Count > 0)
    {
        foreach (ItemRealizacao item in Model)
        {
            if (item.Capa == false)
            {
            %>
             <li>
                <a href="?in=<%= item.Nome%> -1" class="btnPaginacao listaQuestoesCorreta"><%= item.Nome%></a>
                <div class="hide">
                    <span class="<%= (item.Respondida && !item.Revisar) ? item.TipoEstado : "" %>"></span>
                    <span class="<%= (!item.Respondida && !item.Revisar) ? item.TipoEstado : "" %>"></span>
                    <span class="<%= (item.Revisar) ? item.TipoEstado : "" %>"></span>
                </div>
            </li>
<%          }
        }
    } %>
</ul></div>


</div>