<%@ Control Language="C#" Inherits="System.Web.Mvc.ViewUserControl<dynamic>" %>
<form>
    <input type="hidden" id="strPathFiles" value="/dados/avaliacoes/2/1/30154567/Questoes/13285" />
    <div class="areaConfiguracoesQuestao">
        <input type="hidden" name="Id" value="0" />
	    <input type="hidden" name="Tipo" value="2" />
        <input type="hidden" name="IdBanco" value="<%:ViewData["IdBanco"] %>" />

        <input type="hidden" name="Estado" value="1" />
    </div>
    <div class="areaEnunciado">
	    <div class="divisaoTopicos">
		    <div class="tituloDivisao">Enunciado <span class="obrigatorio">*</span></div>
		    <div class="textoDivisao">Digite o enunciado da questão no campo abaixo.</div>                 
	    </div>
        <div id="areaEnunciado">
            <textarea class="txtareaEnunciado html" cols="106" id="txtEnunciado" maxchar="5000" maxcharmsg="O texto da alternativa deve ter no máximo 5000 caracteres." name="Enunciado" rows="12" aria-hidden="true" style="display: block;"></textarea>
            <input type="hidden" name="EhHtmlEnunciado" value="true" />
        </div>            
    </div>
    <div id="areaRespostas" class="areaRespostas">
        <div class="divisaoTopicos">
            <div class="tituloDivisao">Alternativas</div>
            <div class="textoDivisao">Digite o texto de cada alternativa e marque quais são corretas.</div>
        </div>
        <ul class="itensResposta"> 
            <li class="Modelo hide">
                <div class="opcaoLetra">(<span></span>)</div> 
                <div class="opcaoCampo">
                    <textarea class="txtareaResposta html" cols="106" name="Alternativa" rows="12" maxchar="5000" maxcharmsg="O texto da alternativa deve ter no máximo 5000 caracteres."></textarea>
                    <input type="hidden" name="EhHtml" value="false" />
                    <ul class="opcoesAdicionais">                
                        <li class="altResposta">        	    
                            <label>
                                <input type="checkbox" name="Correta" value=""/>
                                Alternativa correta
                            </label>
                        </li>				
                        <li class="localBtnRemover">
                            <a class="btn btnRemover"> <span class="icoRemover"></span> remover alternativa </a>
                        </li>
                    </ul>
                </div>
                <div class="clear"></div>
            </li>

            <li class="Alternativa">
                <div class="opcaoLetra">(<span>A</span>)</div> 
                <div class="opcaoCampo">
                    <textarea class="txtareaResposta html" cols="106" name="Alternativa" rows="12" maxchar="5000" maxcharmsg="O texto da alternativa deve ter no máximo 5000 caracteres."></textarea>
                    <input type="hidden" name="EhHtml" value="false" />
                    <ul class="opcoesAdicionais">                
                        <li class="altResposta">        	    
                            <label>
                                <input type="checkbox" name="Correta" value="A"/>
                                Alternativa correta
                            </label>
                        </li>				
                        <li class="localBtnRemover">
                            <a class="btn btnRemover"> <span class="icoRemover"></span> remover alternativa </a>
                        </li>
                    </ul>
                </div>
                <div class="clear"></div>
            </li>

            <li class="Alternativa">
                <div class="opcaoLetra">(<span>B</span>)</div> 
                <div class="opcaoCampo">
                    <textarea class="txtareaResposta html" cols="106" name="Alternativa" rows="12" maxchar="5000" maxcharmsg="O texto da alternativa deve ter no máximo 5000 caracteres."></textarea>
                    <input type="hidden" name="EhHtml" value="false" />
                    <ul class="opcoesAdicionais">                
                        <li class="altResposta">        	    
                            <label>
                                <input type="checkbox" name="Correta" value="B"/>
                                Alternativa correta
                            </label>
                        </li>				
                        <li class="localBtnRemover">
                            <a class="btn btnRemover"> <span class="icoRemover"></span> remover alternativa </a>
                        </li>
                    </ul>
                </div>
                <div class="clear"></div>
            </li>

            <li class="Alternativa">
                <div class="opcaoLetra">(<span>C</span>)</div> 
                <div class="opcaoCampo">
                    <textarea class="txtareaResposta html" cols="106" name="Alternativa" rows="12" maxchar="5000" maxcharmsg="O texto da alternativa deve ter no máximo 5000 caracteres."></textarea>
                    <input type="hidden" name="EhHtml" value="false" />
                    <ul class="opcoesAdicionais">                
                        <li class="altResposta">        	    
                            <label>
                                <input type="checkbox" name="Correta" value="C"/>
                                Alternativa correta
                            </label>
                        </li>				
                        <li class="localBtnRemover">
                            <a class="btn btnRemover"> <span class="icoRemover"></span> remover alternativa </a>
                        </li>
                    </ul>
                </div>
                <div class="clear"></div>
            </li>

        </ul>
    </div>
    <div id="cxaAdicionarAlternativa" class="">
        <a class="btn btnAdicione">
            <span class="icoAdicionar"></span> adicionar alternativa
        </a>
    </div>
</form>