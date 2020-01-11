<%@ Control Language="C#" Inherits="System.Web.Mvc.ViewUserControl<List<Turma.Models.Participantes>>" %>


<%

	var bolEducador = ViewData["bolEducador"]  == null ? false : (bool)ViewData["bolEducador"];
    var bolPai = ViewData["bolPai"] == null ? false : (bool)ViewData["bolPai"];

%>

<section>
<% if (Model.Count > 0) {

    
    //var strPapelPadrao = (bool)ViewData["strPapelPadrao"];
    //var bolEducador = (bool)ViewData["bolEducador"];
    //var idPapel = (bool)ViewData["idPapel"];



    var bolMostrarAniversario = ViewData["bolMostrarAniversario"] == null ? false : (bool)ViewData["bolMostrarAniversario"];
       
    foreach(var m in Model) { %>
    
    <div id="idProf_turma" class="idProf_turma">

	    	<div id="idProf_turma_idFoto" class="idProf_turma_idFoto">
	        	<img src="<%=m.StrFoto %>" alt="Foto" height="50" width="50"/>
	    	</div>

	    	<div id="idProf_turma_nome" class="idProf_turma_nome">
	        	<span class="nome_usuario"><%=m.BolModerador ? "<i class=\"fontello icon_mediador\"></i>&nbsp;" : ""%><%=m.StrNome %> <% if(bolMostrarAniversario) { %><span class="dataNasc"><%=m.StrDataNascimento%></span><% } %></span>
	        	
	        	<%if (   bolPai == false    ){%>

					<a href="/AVA/Perfil/Home/Index/<%=m.StrLogin%>"><p>Ver perfil</p></a>
					<!-- <button type="button" id="btnProfSeguir">Seguir</button> -->

				<%}%>
	        	
	    	</div>


	</div>

<% } %>

</section>
<div class="clearfix"></div>
<% } else { %><p class="texto-aniv-zero">Turma sem aniversariantes neste mês</p><% } %>


  