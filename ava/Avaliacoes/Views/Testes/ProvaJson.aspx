<%@ Page Language="C#" Inherits="System.Web.Mvc.ViewPage<dynamic>" %>
<%@ Import Namespace="ProvaColegiada.TabelaViews.Shared" %>
<!DOCTYPE html PUBLIC "-//W3C//DTD XHTML 1.0 Transitional//EN" "http://www.w3.org/TR/xhtml1/DTD/xhtml1-transitional.dtd">

<html xmlns="http://www.w3.org/1999/xhtml" >
<head runat="server">
    <title>TesteProvaJson</title>
    <script type="text/javascript" src="<%= UtilView.Url("/Scripts/jquery-1.6.2.min.js") %>"></script>
    <script type="text/javascript">
        $(document).ready(function () {
            $('#frmJson').submit(function (ev) {
                $.ajax({
                    url: $(this).attr("action"),
                    data: $(this).serialize(),
                    type: "POST",
                    success: function (dados, status, xhttp) {

                        $('#retorno').html(JSON.stringify(dados)); 
                    }
                });
                ev.preventDefault();
            });
        });
    </script>
</head>
<body>
    <h1>
    Teste carregamento provas json
    </h1>
    <%  
        using (Html.BeginForm("ListagemAvaliacoes", "Agendamento", FormMethod.Post, new { @id = "frmJson" }))
        {%>
        <h2> Paginação </h2>
        <div><label>Pagina:<input type="text" name="pagina" value="1" /></label></div>
        <div><label>Itens por página:<input type="text" name="tamanho" value="10" /></label></div>
        <div><label>Limite Paginação:<input type="text" name="limite" value="3" /></label></div>
        <h2> Ordenação </h2>
        <div><label>Ordem:<select name="ordem">
                            <option value="nome,0">Nome ASC</option>
                            <option value="modificado,0">Modificado ASC</option>
                            <option value="nome,1">Nome DESC</option>
                            <option value="modificado,1">Modificado DESC</option>
                          </select>

             </label>
        </div>
        <h2> Filtros </h2>
        <div><label>Nome:<input type="text" name="nome" value="" /></label></div>
        <div><label>Inicio:<input type="text" name="datainicio" value="" /></label><label>Fim:<input type="text" name="datafim" value="" /></label></div>
        <div><label>Minhas:<input type="checkbox" name="origem" value="0" /></label><label>Escola:<input type="checkbox" name="origem" value="1" /></label><label>portal:<input type="checkbox" name="origem" value="2" /></label></div>
        <div><button type="submit">Enviar</button></div>         
<%
        }
%>

<div id="retorno">
</div>
</body>
</html>
