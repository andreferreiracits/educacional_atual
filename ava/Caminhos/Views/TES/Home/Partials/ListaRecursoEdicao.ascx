<%@ Control Language="C#" Inherits="System.Web.Mvc.ViewUserControl<Caminhos.Models.Recurso>" %>

<table class="" cellspacing="0" cellpadding="0" border="0" width="100%">
    <thead>
        <tr class="table_selected">
            <td colspan="3">
                <div class="busca_recurso">          
                    <input type="text" id="strPesquisaRecurso" class="campo ph" value="" placeHolder="PESQUISAR RECURSO">
                    <div class="bt_geral"><input type="button" class="okP" value="Buscar" onclick="procurarRecurso(<%=Model.id%>, <%=Model.idCategoriaPublicacao%>)"></div>           
                </div>
                <img height="55" width="55" alt="<%=Model.strRecurso%>" src="<%=Model.strPathThumb%>">
                <span><%=Model.strRecurso.ToUpper()%></span>
                <p><a href="javascript: void(0);" class="bt_normal" onclick="editarEtapa(<%=ViewData["idEtapa"]%>, <%=ViewData["intEtapa"]%>);">voltar</a></p>
            </td>
        </tr>
        <tr class="subheader" id="linha_filtro" style="display: none;">
            <td colspan="3">
                <a href="javascript: void(0)" class="bt_normal transp">Adicionar filtros &#9660;</a>
                <span class="lajotinha">Minhas<span class="lajo_x"><a class="" href="#">x</a></span></span>        
            </td>
        </tr>
        <tr class="tableheader" id="linha_tbl_aval" style="display: none;">
            <td width="63%">&#9660; Avaliações</td>
            <td width="17%">&#9660; Autor</td>
            <td width="20%">&#9660; Data de criação</td>
        </tr>
    </thead>
    <tbody class="tablebody">
        <% 
        if (Convert.ToBoolean(ViewData["bolAvaliacao"]))
        {
        %>
            <tr>
                <td id="tblrecursoitem_ava" colspan="3" class="tablefix">

                </td>
            </tr>
        <%
        }
        else
        {
        %>
           <tr class="table_aberta">
                <td id="recursoitem_ava">

                </td>
            </tr>
            
        <%    
        }
        %>
        
    </tbody>
    <TFOOT>
            <tr>
                <td id="mostraPaginas" colspan="3">
                    <div id="Pagination" class="pagination">
                    </div>
                </td>
            </tr> 
    </TFOOT>  
</table>


