<%@ Control Language="C#" Inherits="System.Web.Mvc.ViewUserControl<string>" %>
<%
    string msg = Model;
    string tipo = "Confirm";
%>
<div data-render="avl_msg">
	<section data-avl_msg-tipo="<%=tipo%>">
        <header>
            <h1>Avaliações</h1>
            <button type="button" data-avl_msg-btn_close="true">fechar</button>
        </header>
        <h2 class="avl_msg_ico"><%=tipo%></h2>
        <p><%=msg%></p>
        <footer>
            <button type="button" class="avl_msg_btn_sim" data-avl_msg-btn_confirm="true">Sim</button>
            <button type="button" class="avl_msg_btn_nao" data-avl_msg-btn_close="true">Não</button>
        </footer>
    </section>
</div>
