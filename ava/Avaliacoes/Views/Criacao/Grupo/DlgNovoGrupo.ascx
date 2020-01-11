<%@ Control Language="C#" Inherits="System.Web.Mvc.ViewUserControl<dynamic>" %>

<div id="dlgAgrupamento" title="Criar agrupamento" class="popup SEC02511">
        <div class="popupConteudo">
            
            <% using (Html.BeginForm("SalvarGrupo", "Criacao", FormMethod.Post, new { @id = "frmAgrupamento" }))
               { %>
                
            <% }%>
            
            <div class="clear"></div>
            <div class="popupBotoes pBtnCriacao">
                
                <div class="btnEspacament direita">
                    <a id="btnFecharAgrupamento" href="javascript:void(0)" class="btnNav">Fechar</a>
                </div>
                <div class="btnEspacamento">
                    <a id="btnCancelarAgrupamento" href="javascript:void(0)" class="btnNav">Cancelar</a>
                </div>
                <div class="btnEspacamento direita">
                    <a id="btnSalvarAgrupamento" href="javascript:void(0)" class="btnNav">Salvar</a>
                    
                </div>
            </div>
        </div>

    </div>