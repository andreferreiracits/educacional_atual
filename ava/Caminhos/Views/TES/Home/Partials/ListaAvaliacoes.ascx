<%@ Control Language="C#" Inherits="System.Web.Mvc.ViewUserControl<System.Collections.Generic.IList<Caminhos.Models.RecursoItem>>" %>

<div class="listaAvaliacoes" style="width:100%;">
    <%
        if (Model.Count <= 0)
        {
        %>
            <div style="width:100%;">Nenhuma avaliação encontrada.</div>
        <%
        }
        else
        {
            foreach (var recursoItem in Model)
            {
            %>
                <div class="itemListaAval" style="padding:15px 0; display:table; width:100%; border-bottom:1px solid #ccc;">
                    <div class="avaliacao" style="width:77%; float:left; display:table; padding-left:3%;">
                        <div class="tituloAvaliacao"><%=recursoItem.strTitulo%></div>
                        <div class="e-actions" style="display:none; margin-top:4px;">
                            <a class="bt_normal" href="javascript: void(0);" onclick="simularAvaliacao(<%=recursoItem.idAvaliacao%>)">Simular</a>
                            <a class="bt_normal" href="javascript: void(0);" onClick="incluirAvaliacao(<%=recursoItem.idAvaliacao %>);">Incluir</a>
                        </div>
                    </div>                
                    <div class="dataCriacao" style="width:20%; float:left;"><%=recursoItem.dtmCriacao.ToString("dd/MM/yyyy") %></div>
                </div>
            <%
            }
            
        }      
        %>
</div>

<script type="text/javascript">
    $('.itemListaAval').mouseover(function () {
        $(this).find('.e-actions').show();
    }).mouseout(function () {
        $(this).find('.e-actions').hide();
    });
</script>
