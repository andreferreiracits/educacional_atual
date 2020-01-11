<%@ Page Language="C#" Inherits="System.Web.Mvc.ViewPage<dynamic>" %>

<!DOCTYPE html PUBLIC "-//W3C//DTD XHTML 1.0 Transitional//EN" "http://www.w3.org/TR/xhtml1/DTD/xhtml1-transitional.dtd">
<%@ Import Namespace="ProvaColegiada.TabelaViews.Shared" %>
<html xmlns="http://www.w3.org/1999/xhtml" >
<head runat="server">
    <title>Index</title>
     <script type="text/javascript" src="<%= UtilView.Url("/Scripts/jquery-1.7.min.js") %>"></script>
</head>

<script type="text/javascript">
    $(document).ready(function () {
        $.fn.serializeObject = function () {
            var o = {};
            //    var a = this.serializeArray();
            $(this).find('input[type="hidden"], input[type="text"], input[type="password"], input[type="checkbox"]:checked, input[type="radio"]:checked, select').each(function () {
                if ($(this).attr('type') == 'hidden') { //if checkbox is checked do not take the hidden field
                    var $parent = $(this).parent();
                    var $chb = $parent.find('input[type="checkbox"][name="' + this.name.replace(/\[/g, '\[').replace(/\]/g, '\]') + '"]');
                    if ($chb != null) {
                        if ($chb.prop('checked')) return;
                    }
                }
                if (this.name === null || this.name === undefined || this.name === '') return;
                var elemValue = null;
                if ($(this).is('select')) elemValue = $(this).find('option:selected').val();
                else elemValue = this.value;
                if (o[this.name] !== undefined) {
                    if (!o[this.name].push) {
                        o[this.name] = [o[this.name]];
                    }
                    o[this.name].push(elemValue || '');
                } else {
                    o[this.name] = elemValue || '';
                }
            });
            return o;
        }




        $("#ha").submit(function (e) {
            e.preventDefault();
            var form = $(this);

            var objeto = {
                IdTipo: 1,
                Parametros: JSON.stringify(form.serializeObject())
            }

            $.ajax({
                url: form.attr("action"),
                type: "POST",
                data: JSON.stringify(objeto),
                contentType: 'application/json; charset=utf-8',
                dataType: 'json',
                success: function (dados, status, xhttp) {

                }
            });
        });
    });
</script>

<body>
    <div>
        <form id="ha" action="/Avaliacao/Salvar" method="GET">
            
            <input type="text" name="IdTipo" />
            
            <input type="text" name="IdBancoQuestao" placeholder="IdBancoQuestao"/>
            
            <input type="text" name="Nome" placeholder="Titulo" />

            <button type="submit">Enviar</button>
        </form>
    </div>
</body>
</html>
