<%@ Control Language="C#" Inherits="System.Web.Mvc.ViewUserControl<System.Collections.Generic.IList<Conteudos.Models.ConteudoMultimidia>>"%>
<script>
jQuery(function ($) {

    $('#paginacao_conteudos').pajinate({
        items_per_page: 9,
        wrap_around: false,
        show_first_last: false,
        nav_label_prev: 'Anterior',
        nav_label_next: 'Próxima'
    });

});
</script>
<%
    if (Model.Count > 0)
    {
        %>
            <div class="content">
        <%
        foreach (var item in Model)
        {
            
%>
                <a class="item" href="javascript:void(0);" data-idpublicacao="<%=item.idPublicacao %>" data-idcategoria="<%= item.idCategoria%>" data-iversao="<%=item.iVersao %>" data-url="<%=item.strUrl %>">
				    <img src="<%=item.strPathImg %>" height="220" width="220"/>
				    <div class="infoConteudos">
					    <h4><%=item.strTitulo %></h4>
					    <p>
                        <%
                            if (item.strTexto.Length > 140)
                            {
                                string strAuxTexto = "";

                                strAuxTexto = item.strTexto.Substring(0, 139);
                                strAuxTexto = strAuxTexto + "...";
                
                                Response.Write(strAuxTexto);
                            }
                            else
                            {
                                Response.Write(item.strTexto);
                            }

                        %>

                        </p>
				    </div>
			    </a>

<% 
        }
        %>
        </div>
        <% if (Model.Count > 9)
           {
        %>
            <div class="clearfix"></div>
            <div class="page_navigation"></div>
        <%
           }
    }
    else
    {
%>
        Nada encontrado.
<%
    }
%>

