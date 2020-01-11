<%@ Control Language="C#" Inherits="System.Web.Mvc.ViewUserControl<IList<ProvaColegiada.TabelaViews.Filtro>>" %>

<thead>
    <tr>
        <td>
<%
    StringBuilder texto = new StringBuilder("[");
    if (Model != null && Model.Count > 0)
    {
%>
        <span class="areaBotoesFiltros">
            <span class="textoFiltros">Filtrado por:</span>
        
<%
        foreach (ProvaColegiada.TabelaViews.Filtro filtro in Model) {
            texto.Append(filtro.ToString()).Append(",");
%>
        
            <span class="botaoFiltro" title="<%=Html.Encode(filtro.Nome)%>">
                <input type="hidden" name="filtroCampo" value="<%=filtro.Campo%>" />
                <input type="hidden" name="filtroValor" value="<%=filtro.Valor%>" />
			    <span><%=Html.Encode(filtro.Nome) %></span>
			    <a class="botaoFechar" href="#">x</a>
		    </span>
<%          
        }
        texto.Remove(texto.Length-1, 1);
%>
        </span>
<%            
    }
    else
    {
%>
        <!--<span class="textoFiltros">Sem filtros</span>-->
<%  
    }
    texto.Append("]");
%>
        <!--%= Html.Hidden("txtFiltros", texto.ToString(), new { @id = "txtFiltros" }) %-->
        </td>
    </tr>
</thead>