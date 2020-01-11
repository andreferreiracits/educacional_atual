<%@ Page Language="C#" Inherits="System.Web.Mvc.ViewPage<dynamic>" %>
<%@ Import Namespace="ProvaColegiada.TabelaViews.Shared" %>
<!DOCTYPE html PUBLIC "-//W3C//DTD XHTML 1.0 Transitional//EN" "http://www.w3.org/TR/xhtml1/DTD/xhtml1-transitional.dtd">

<html xmlns="http://www.w3.org/1999/xhtml" >
<head id="Head1" runat="server">
    <title>Duplicar</title>
    <script type="text/javascript" src="<%= UtilView.Url("/Scripts/jquery-1.6.2.min.js") %>"></script>
    <script type="text/javascript">
        $(document).ready(function () {
            $('#frmDuplicar').submit(function (ev) {
                $('#retorno').html("");
                $.ajax({
                    url: $(this).attr("action"),
                    data: $(this).serialize(),
                    type: "POST",
                    success: function (dados, status, xhttp) {

                        $('#retorno').html(dados);
                    }
                });
                ev.preventDefault();
            });
        });
    </script>
</head>
<body>
    <h1>
    Duplicar questões
    </h1>
    <%  
        using (Html.BeginForm("DuplicarQuestoes", "Questoes", FormMethod.Post, new { @id = "frmDuplicar" }))
        {%>
        <div><label>Ids questões: <input type="text" name="questoes" value="" /></label><small>(separado por vírgula)</small></div>
        <div><label>Id banco: <input type="text" name="banco" value="" /></label><small>(opcional)</small></div>
        <div><label>Id usuario: <input type="text" name="usuario" value="" /></label><small>(opcional)</small></div>
        <div><button type="submit">Enviar</button></div>         
<%
        }
%>

<div id="retorno">
</div>
</body>
</html>
