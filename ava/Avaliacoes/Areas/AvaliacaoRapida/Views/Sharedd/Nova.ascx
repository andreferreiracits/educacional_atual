<%@ Control Language="C#" Inherits="System.Web.Mvc.ViewUserControl<dynamic>" %>
<div class="conteudo">
<form id="avRapidaNovaAvaliacao">
    <input type="hidden" id="strPathFiles" value="/UserData/avaliacoes/20/92200001/8835644/Prova/182032">

    <div class="areaConfiguracoesProva">       
        <input type="hidden" name="Id"   value="0" />
        <input type="hidden" name="Tipo" value="1"  />
        <input type="hidden" name="Embaralhar" value="true"  />
        <input type="hidden" name="IdBanco" value="<%:ViewData["IdBanco"] %>"  />
        <input type="hidden" name="listagemId" value="" />

        <div class="linhaPar">
            <label class="SEC02511_texto"><b>Título:</b><span class="obrigatorio">*</span></label>
            <span class="SEC02511_texto">
                <input type="text" id="txtNome" name="Titulo" class="txt" maxlength="80" value="" />
            </span>
        </div>


        <input type="hidden" name="Compartilhada" value="0"  />
        <input type="hidden" name="Estado" value="2"  />

        <div class="divisaoTopicos">
            <div class="tituloDivisao">Texto introdutório:</div>
            <div class="textoDivisao">Será exibido quando o respondente abrir a avaliação.</div>
        </div>

        <textarea class="txtareaEnunciado html" cols="166" id="txtIntroducao" maxchar="5000" maxcharmsg="O texto da alternativa deve ter no máximo 5000 caracteres." name="IntroducaoConteudo" rows="12" aria-hidden="true" style="display: block;"></textarea>
        <input type="hidden" name="EhHtmlIntroducao" value="true" />
        
    </div>
</form>
</div>