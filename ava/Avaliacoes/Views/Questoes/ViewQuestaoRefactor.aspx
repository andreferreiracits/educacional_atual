<%@ Page Language="C#" Inherits="System.Web.Mvc.ViewPage<ProvaColegiada.TabelaViews.QuestaoView>" %>

<!DOCTYPE html PUBLIC "-//W3C//DTD XHTML 1.0 Transitional//EN" "http://www.w3.org/TR/xhtml1/DTD/xhtml1-transitional.dtd">

<html xmlns="http://www.w3.org/1999/xhtml" >
<head runat="server">
    <title>Visualizar Questão</title>
    <%=Html.BundleCss(
        "Content/css/principal.css",
        "Content/css/tabela.css",
        "Content/css/mceView.css",
        "Content/css/questaoresumo.css"
    )%>
    <style>
        body
        {
            margin: 0;
        }
        table.tabela tbody tr:hover {
            background-color: #FFF;
        }
    </style>
</head>
<body>
    <div id="MainAvaliacoes" class="SEC02511">
    <table class="tabela">
        <tbody><tr>
        <td>
        <%Html.RenderPartial(Model.TooltipQuestao, Model); %>
        </td>
            </tr>
        </tbody>
    </table>
    </div>
</body>
</html>
