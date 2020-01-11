<%@ Control Language="C#" Inherits="System.Web.Mvc.ViewUserControl<UsuarioAVA.Models.Perseguicao>" %>

<% 
    bool bolUrlMural = Convert.ToBoolean(ViewData["bolUrlMural"]);
    string strURL = ViewData["URL"].ToString();
    string strURLEscola = ViewData["URLEscola"].ToString();
    int intAdmRede = Convert.ToInt32(ViewData["admRede"]);
    bool bolCarregaMensagemTurmaAnoErrado = (bool)ViewData["bolCarregaMensagemTurmaAnoErrado"];
    string possuiLinks = ViewData["links"].ToString();
    bool bolWebmail = ViewData["bolWebmail"] != null ? (bool)ViewData["bolWebmail"] : false;
%>
<script type="text/javascript">

    var ava_submenu;

    jQuery("document").ready(function () {

        jQuery(".hvr_nav").mouseover(function () {
            clearTimeout(ava_submenu);
            jQuery(".menu_cascata").addClass("expandir");
            jQuery(".hvr_nav").children("ul").hide();
            jQuery(this).children("ul").show();
        });

        jQuery(".hvr_nav").mouseout(function () {
            ava_submenu = setTimeout(function () {
                jQuery(".hvr_nav").children("ul").hide();
                jQuery(".menu_cascata").removeClass("expandir");
            }, 1000);
        });
    });
		
    jQuery(function ($) {

        // carrega os filhos no menu após o mouseover
        $('.menu_item_filhos').mouseover(function () {
            $strloginPai = $("#strLoginMenu").val();
            if (!$('.subnav').find('div').hasClass('filho_item')) {
                $('.menu_item_filhos').find('div.mask').html("<img src='/AVA/StaticContent/Common/img/geral/ajax-loader.gif' border='0' />");
                $.ajax({
                    url: "/AVA/Barras/Home/MenuFilhos/",
                    data: { "strLogin": $strloginPai },
                    cache: false,
                    success: function (data) {
                        $(".menu_item_filhos").find('div.mask').html(data);
                    },
                    error: function (data) {
                        if (data.status == 0) {
                            $(".menu_item_filhos").find('div.mask').empty();
                        } else {
                            listaFilhosValue = "erro ao buscar filhos";
                            $(".menu_item_filhos").find('div.mask').html(listaFilhosValue);
                        }
                    }
                });
            }
        });
        // carrega os links no menu após o mouseover
        $('.menu_item_links').mouseover(function () {
            if (!$('.subnav').find('li').hasClass('link_item')) {
                $('.menu_item_links').find('div.mask').html("<img src='/AVA/StaticContent/Common/img/geral/ajax-loader.gif' border='0' />");
                $.ajax({
                    url: "/AVA/Barras/Home/MenuLinks/",
                    //data: { "strLogin": idUsuarioPublico },
                    cache: false,
                    success: function (data) {
                        $(".menu_item_links").find('div.mask').html(data);
                    },
                    error: function (data) {
                        if (data.status == 0) {
                            $(".menu_item_links").find('div.mask').empty();
                        } else {
                            listaFilhosValue = "erro ao buscar links";
                            $(".menu_item_links").find('div.mask').html(listaFilhosValue);
                        }
                    }
                });
            }
        });

    });

</script>

    <ul class="topnav">
        <li class="menu_item_perfil"><a href="<%=strURL%>/AVA/Perfil/MeuPerfil">PERFIL</a></li>

        <% if (ViewData["PaginasComunicador"] != null) {
            foreach (var pc in (List<Pagina.Models.PaginaEducacional>)ViewData["PaginasComunicador"])
            {
                if (pc.bolComunicador || (bool)ViewData["PaginaEscolaTemPost"])
                {
                    %>
                    <li class="menu_item_escola"><a href="<%=strURL%>/AVA/Pagina/<%=pc.strLink %>">PÁGINA <%=pc.idPagina > 2 ? "DA ESCOLA" : pc.strTitulo.ToUpper()%></a></li>
                    <%    
                }
            }       
        } %>
        
        <!--
            <li class="menu_item_grupos"><a href="<%=strURL%>/AVA/Grupo">GRUPOS</a></li>   
            <% if (Model.bolEducador && Model.intTipoPerfil != -2 && Convert.ToInt32(ViewData["bolAVAPuro"]) == 0)
            {%>
                <li class="menu_item_blog"><a href="<%=strURL%>/blog/wp/novaHome.asp">BLOG</a></li>
            <%}%>
        -->
        
        <% if (Model.bolResponsavel) {%>
        <li class="menu_item_filhos hvr_nav">
            <input type="hidden" id="strLoginMenu" value="<%=Model.strLogin %>" />
		    <a href="javascript:void(0);" >Filhos</a>
		    <ul class="subnav" style="display: ;">
			    <div class="mask">
			    </div>
		    </ul>
	    </li>            
         <%}%>

         <%
        if (Convert.ToInt32(ViewData["bolAVAPuro"]) == 0) { 
        %>
            <% 
            if (Model.bolAluno)
            {
            %> 
               <!-- <li class="menu_item_portfolio"><a href="<%=strURL%>/AVA/Portfolio/" >PORTFÓLIO</a></li> -->
            <%} %>
            
            <%//if (!bolCarregaMensagemTurmaAnoErrado)
              //{
                  if (Model.bolAluno && ViewData["idTurma"] != "")
                  { %>
                     <li class="menu_item_turma">
                        <a idTurma="<%:ViewData["idTurma"]%>" href="<%=ViewData["UrlGrupo"] %>" class="vertodosturma fancybox.ajax">
                        MINHA TURMA</a>
                    </li>
            <%}
                  else if (Model.bolEducador && ViewData["ProfTurmas"] == "Turmas")
                  {
                      string strLabelTurma = "MINHAS TURMAS";
                      if (intAdmRede == 1)
                      {
                          strLabelTurma = "TURMAS";
                      }%>
                        <li class="menu_item_turma">
                            <!--<a class="vertodosEscola" href="/AVA/Barras/Home/RetornaViewPerseguicaoCompleta/?deonde=7">-->
                            <a class="vertodosEscola" href="javascript:void(0);" onclick="retornaProfessoresTurma('<%:Model.strLogin%>', <%:intAdmRede%>)">                    
                            <%:strLabelTurma%></a>
                        </li>
            <%}
              //}%>
            <% 
            if (Model.bolAluno && ViewData["idTurma"] != "")//professores do aluno
            {
            %> 
               <li class="menu_item_professores"><a class="vertodoseducadoresMenu" href="javascript:void(0);" onclick="retornaProcurarProfessoresAluno('<%:Model.strLogin%>')">PROFESSORES</a></li>
            <%} %>


        <%
        } else if (Convert.ToInt32(ViewData["bolAVAPuro"]) == 1) {
        %>
            <%
            //if (!bolCarregaMensagemTurmaAnoErrado)
            //{
                if (Model.bolAluno && ViewData["idTurma"] != "")
                { %>
                <li class="menu_item_turma">
                    <a idTurma="<%:ViewData["idTurma"]%>" href="<%=ViewData["UrlGrupo"] %>" class="vertodosturma fancybox.ajax">
                    MINHA TURMA</a>
                </li>
            <%}
                else if (Model.bolEducador && ViewData["ProfTurmas"] == "Turmas")
                {
                    string strLabelTurma = "MINHAS TURMAS";
                    if (intAdmRede == 1)
                    {
                        strLabelTurma = "TURMAS";
                    }%>
                    <li class="menu_item_turma">
                        <a class="vertodosEscola" href="javascript:void(0);" onclick="retornaProfessoresTurma('<%:Model.strLogin%>', <%:intAdmRede%>)">                    
                        <%:strLabelTurma%></a>
                    </li>
            <%}
            //}%>
            <% 
            if (Model.bolAluno && ViewData["idTurma"] != "")//professores do aluno
            {
            %> 
               <li class="menu_item_professores"><a class="vertodoseducadoresMenu" href="javascript:void(0);" onclick="retornaProcurarProfessoresAluno('<%:Model.strLogin%>')">PROFESSORES</a></li>
            <%} %>

        <%    
        }
            if (Convert.ToInt32(ViewData["bolAVAPuro"]) == 1 && Convert.ToInt32(ViewData["admRede"]) == 1)
        { 
        %>
            <li class="menu_item_secretaria"><a href="javascript:void(0);" onclick="linkAdministracao()">ADMINISTRAÇÃO</a>
        
                <div id="Div1">
               
                </div>
            </li>
        <%
        } 
        %>
        <%
        if (Convert.ToInt32(ViewData["bolAVAPuro"]) == 0)
        { 
        %>
        <li class="menu_item_secretaria"><a class="" href="javascript:void(0);" onclick="linkSecretaria()">SECRETARIA</a>
                <div id="secre_links">
                </div>
        </li>
        <%
        }
        %>
        <%if (possuiLinks == "comLinks")
          { %>
        <li class="menu_item_links hvr_nav">
			<a href="javascript:void(0);">LINKS</a>
			<ul class="subnav" style="display: ;">
				<div class="mask">
				</div>
			</ul>
		</li>
        <%} %>                            

        <%if (bolWebmail)
          { %>
            <li class="menu_item_webmail"><a href="<%=strURL%>/webmail/webmail.asp">WEBMAIL</a></li>
        <%} %>                            

    <hr>
        <li class="menu_item_home"><a href="<%=strURL%>/rd/gravar.asp?servidor=<%=strURLEscola%>&url=/default.asp">HOME DA ESCOLA</a></li>
        <li class="menu_item_central"><a target="_blank" href="https://positivote.zendesk.com/hc/pt-br/categories/360000878631-Educacional">CENTRAL DE AJUDA</a></li>
        <!-- <li class="menu_item_central"><a target="_blank" href="<%=strURL%>/centraldeajuda">CENTRAL DE AJUDA</a></li> -->

        <% 
            bool alunoSemTurma = Model.bolAluno && ViewData["idTurma"] == "";
            if (!alunoSemTurma)
            {
        %> 
            <li class="menu_item_procurar"><a id="abrebuscapessoas"  href="javascript:void(0);" onclick="retornaProcurarPessoas()">Procurar pessoas</a></li>
        <% 
            }
        %> 

    </ul>

