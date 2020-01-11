<%@ Control Language="C#" Inherits="System.Web.Mvc.ViewUserControl<System.Collections.Generic.IList<AdminAVA.Models.EscolaAVABarraAvisos>>"%>

<script>
    /*
    jQuery(function ($) {

        $.ajax({
            type: "POST",
            url: "/AVA/adminava/avisos/ListaSegmentacaoSerie",
            cache: false,
            async: true,
            contentType: "application/x-www-form-urlencoded; charset=UTF-8",
            success: function (data) {

                $("#segSerie").html(data);

            },
            error: function (data) {
                //alert(data.status);
                console.debug(data.status);
            }
        });

    });
    */
</script>
 
 <%
     DateTime dataAtual = DateTime.Now;
 %>


<section id="ava_container">


        <h2>Criar novo aviso</h2>
        <p>
            <span>Título:</span>
            <input type="text" name="strMensagem" id="strMensagem" maxlength="50" size="55" class="sombra_form" />
        </p>
        <span>Período:</span>
        <input type="text" size="8" id="dtmInicio" name="dtmInicio" class="sombra_form" value="<%=dataAtual.ToString("dd/MM/yyyy") %>" />
        <input type="text" size="6" id="horaInicio" name="horaInicio" class="sombra_form" value="00:00" />
        até
        <input type="text" size="8" id="dtmFim" name="dtmFim" class="sombra_form" value="<%=dataAtual.ToString("dd/MM/yyyy") %>" />
        <input type="text" size="6" id="horaFim" name="horaFim" class="sombra_form" value="23:59" />
        <p><span>Para:</span></p>

        <div id="segSerie">
            <% Html.RenderAction("ListaSegmentacaoSerie"); %>
        </div>

        <input type="submit" value="Publicar" onclick="gravaAviso()" id="bt_gravaAviso" class="medium awesome awesome-green"/>
        <input type="button" value="cancelar" onclick="parent.$.fancybox.close();" class="medium awesome awesome-green"/>
        
        <input type="hidden" id="idBAviso" name="idBAviso" value="0" />
        <input type="hidden" id="bolExcluido" name="bolExcluido" value="0" />

        <div id="alerta_mostra_aviso"></div>


</section>