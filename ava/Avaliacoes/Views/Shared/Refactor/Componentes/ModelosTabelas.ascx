<%@ Control Language="C#" Inherits="System.Web.Mvc.ViewUserControl<dynamic>" %>


<table class="avl_tbl avl_tbl_view"
data-render="avl_tbl avl_tbl_preview" 
data-chain-edit=""
data-listener-remove=""
data-event-update=""
data-avl_tbl-href=""
data-render-listener=""
data-event-render="">
    <thead>
        <tr>
            <th class="avl_tbl_titulo">Titulo</th>
            <th>Coluna 1</th>
            <th>Coluna 2</th>
            <th>Coluna 3</th>
        </tr>
    </thead>

    <% Html.RenderPartial("Refactor/Tbl/Loader", 4); %>

    <tbody class="avl_tbl_empty" data-avl_tbl-body="empty">
        <tr><td colspan="4"><p>Lista fazia</p></td></tr>
    </tbody>
    <tbody class="avl_tbl_data">
        <tr><td><textarea data-avl_tbl-body="data">
        </textarea>
        </td></tr>
    </tbody>

    <script type="text/x-jquery-tmpl" data-avl_tbl-body="template">
        
    </script>

    <tbody class="avl_tbl_content" data-avl_tbl-body="content">
    </tbody>

    <tfoot>
        <tr> 
            <td></td>
        </tr>
    </tfoot>
</table>



<table class="avl_tbl avl_tbl_view"
data-render="avl_tbl avl_tbl_preview" 
data-chain-edit=""
data-listener-remove=""
data-event-update=""
data-avl_tbl-href=""
data-render-listener=""
data-event-render="">
    <thead>
        <tr>
            <th class="avl_tbl_check"><input type="checkbox" /></th>
            <th class="avl_tbl_titulo">Titulo</th>
            <th>Coluna 1</th>
            <th>Coluna 2</th>
            <th>Coluna 3</th>
        </tr>
    </thead>

    <% Html.RenderPartial("Refactor/Tbl/Loader", 5); %>

    <tbody class="avl_tbl_empty" data-avl_tbl-body="empty">
        <tr><td colspan="5"><p>Lista fazia</p></td></tr>
    </tbody>
    <tbody class="avl_tbl_data">
        <tr><td><textarea data-avl_tbl-body="data">
        </textarea>
        </td></tr>
    </tbody>

    <script type="text/x-jquery-tmpl" data-avl_tbl-body="template">
        
    </script>

    <tbody class="avl_tbl_content" data-avl_tbl-body="content">
    </tbody>

    <tfoot>
        <tr> 
            <td colspan="5"></td>
        </tr>
    </tfoot>
</table>
