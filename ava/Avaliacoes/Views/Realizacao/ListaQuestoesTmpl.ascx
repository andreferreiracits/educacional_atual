<%@ Control Language="C#" Inherits="System.Web.Mvc.ViewUserControl<dynamic>" %>

<script id="tmplListaQuestoes" type="text/x-jquery-tmpl">
    <li>
        <div class="imgPaginacao">
            <div class="${estilo}">
                <a href="?in=${indice}" class="btnPaginacao"><div>${nome}</div></a>
            </div>
            <div class="estadoQuestao ${estiloSituacao}"></div>
        </div>
    </li>
</script>