<%@ Control Language="C#" Inherits="System.Web.Mvc.ViewUserControl<dynamic>" %>
<div class="conteudo">
    <ul class="menuTemplate">
        <li> 
            <label>
                <div>
                    <input type="checkbox" name="rdoTemplate" value="1" id="rdoTemplateQuestao1" data-pos="0">
                    <span>Pesquisar questões existentes</span>
                    <p>Busque questões armazenadas no banco.</p>
                </div>
            </label>
        </li>
        <li>
            <label>
                <div>
                    <input type="checkbox" name="rdoTemplate" value="2" id="rdoTemplateQuestao2" data-pos="1">
                    <span>Criar questão | Simples escolha</span>
                    <p>Várias alternativas em que apenas uma é correta.</p>
                </div>
            </label>
        </li>
        <li>
            <label>
                <div>
                    <input type="checkbox" name="rdoTemplate" value="3" id="rdoTemplateQuestao3" data-pos="1">
                    <span>Criar questão | Múltipla escolha</span>
                    <p>Várias alternativas em que mais de uma pode ser correta.</p>
                </div>
            </label>
        </li>
    </ul>
<div id="questoesDaProva" class="hide"><div class="texto">Questões inseridas na avaliação:</div><span class="count">0</span> <a class="btn btnVerQuestoes" href="javascript:void(0)">ver questões »</a><a href="javascript:void(0)" id="helpQstProva" class="btn">?</a> </div>

<div class="hide" id="listaQuestoesAddProva"></div>
<div class="templateDivQ hide" id="listaQuestoesProcurarProva"></div>
<div class="templateDivQ hide" id="areaCriarQuestao"></div>


</div>