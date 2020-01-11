<%@ Page Language="C#" ValidateRequest="false" Inherits="System.Web.Mvc.ViewPage<dynamic>" %>
<%@ Import Namespace="ProvaColegiada.TabelaViews.Shared "%>

<!DOCTYPE html PUBLIC "-//W3C//DTD XHTML 1.0 Transitional//EN" "http://www.w3.org/TR/xhtml1/DTD/xhtml1-transitional.dtd">

<html xmlns="http://www.w3.org/1999/xhtml">
<head runat="server">
    <title>AnexarImagem</title>
    <link rel="Stylesheet" type="text/css" href="<%= UtilView.Url("/Content/css/jquery-ui-1.8.4.custom.css") %>" />
    <link rel="Stylesheet" type="text/css" href="<%= UtilView.Url("/Content/css/principal.css") %>" />
    <link rel="Stylesheet" type="text/css" href="<%= UtilView.Url("/Content/css/form.css") %>" />
    
    <script type="text/javascript" src="<%= UtilView.Url("/Scripts/jquery-1.4.2.min.js") %>"></script>
    <script type="text/javascript" src="<%= UtilView.Url("/Scripts/jquery.ui.widget.js") %>"></script>
    <script type="text/javascript" src="<%= UtilView.Url("/Scripts/util/jquery-ui-1.8.5.custom.min.js") %>"></script>
    <script type="text/javascript" src="<%= UtilView.Url("/Scripts/util/css_browser_selector.js") %>"></script>
    <script type="text/javascript" src="<%= UtilView.Url("/Scripts/util/jquery.ui.mensagem.js") %>"></script>
    <script type="text/javascript" src="<%= UtilView.Url("/Scripts/class/Carregando.js") %>"></script>
    <script type="text/javascript" src="<%= UtilView.Url("/Scripts/class/Arquivo.js") %>"></script>
    <script type="text/javascript" src="<%= UtilView.Url("/Scripts/class/Mensagem.js") %>"></script>
    <script type="text/javascript" src="<%= UtilView.Url("/Scripts/view/popupImagemAnexo.js") %>"></script>
</head>
<body>
    <div class="popupImagem">
	    <div class="SEC02511_texto">Anexar imagem</div>
        <div id="alertaAnexo" class="mensagem"></div>
    <%  using (Html.BeginForm("SalvarImagemAnexo", "Aplicacao", FormMethod.Post, new { @id = "frmSalvarImagem", @enctype = "multipart/form-data" }))
        { %>
            <div id="anexar">
                <label for="txtArquivoAnexo">Arquivo:</label> 
                <input type="file" id="txtArquivoAnexo" name="txtArquivoAnexo" class="upload arquivo" />
                <div class="textoUpload">Envie somente arquivos das extensões .jpg, .gif, .png com no máximo 5MB</div>
                <input type="hidden" id="txtIdAplicacao" name="txtIdAplicacao" value="<%=ViewData["IdAplicacao"] %>" />
                <a id="addImagemAnexo" class="btn">Adicionar</a>
            </div>
    <%  } %>
        <iframe id="ifrSalvarAnexo" name="ifrSalvarAnexo" width="100" height="100"></iframe>
    </div>
</body>
</html>
