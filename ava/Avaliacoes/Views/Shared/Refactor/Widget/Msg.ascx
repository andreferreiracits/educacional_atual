<%@ Control Language="C#" Inherits="System.Web.Mvc.ViewUserControl<dynamic>" %>
<div id="avl_msg" data-render="avl_msg" 
data-avl_msg-inesperado="{ 'Tipo': 'Erro', 'Mensagem' : 'Aconteceu um erro inesperado. Vamos verificar.' }" 
data-avl_msg-legado="#caixaConteudo #mensagem, .erro #mensagem" >
	<section data-avl_msg-tipo="${Tipo}">
        <header>
            <h1>Avaliações</h1>
            <button type="button" data-avl_msg-btn_close="true">fechar</button>
        </header>
        <h2 class="avl_msg_ico">${Tipo}</h2>
        <p>{{html Mensagem}}</p>
        <footer>
            <button type="button" class="avl_msg_btn_ok" data-avl_msg-btn_close="true">Ok</button>
            <button type="button" class="avl_msg_btn_sim" data-avl_msg-btn_confirm="true">Sim</button>
            <button type="button" class="avl_msg_btn_nao" data-avl_msg-btn_close="true">Não</button>
        </footer>
    </section>
</div>