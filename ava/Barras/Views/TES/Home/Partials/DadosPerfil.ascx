<meta http-equiv="Content-Type" content="text/html;charset=utf-8" />
<%@ Control Language="C#" Inherits="System.Web.Mvc.ViewUserControl<UsuarioAVA.Models.Perseguicao>" %>

<%
    List<Barras.Models.LinkRapidoCategoria> listaLinksRapido = (List<Barras.Models.LinkRapidoCategoria>)ViewData["links"];
    var nome =  ViewData["nome_completo"];
    var nomeEscola = ViewData["nome_escola"]  ;
    string msg = "";
    int totalTurmas = 0 ;

    var isAluno = Model.bolAluno;

    var turmaLink = ViewData["UrlGrupo"];

    
    var turmas =  (IList<UsuarioAVA.Models.TurmaPerfilAluno>)ViewData["turmas"];

    var serie =  string.Empty;
    var turma = string.Empty;

    if(ViewData["turmas"] != null ){

        try{
            serie = "" + turmas.FirstOrDefault().strSerie  ;
            turma = "" + turmas.FirstOrDefault().strTurma ;
        }
        catch(Exception e){
            serie = "";
            turma = "";
        }

    }

%>

    <header>
        <div class="cart_mural clearfix">
            <div class="carteirinha_mural">
                <span class="ava_clips"></span>
                <a href="/AVA/Perfil/MeuPerfil">
                    <div class="avatar_55" style="background:url(<%=Model.strFoto%>)no-repeat;background-size: cover;" >
                        <img width="100" height="100" src="/ava/StaticContent/Common/img/perfil/sombrafoto_55.png" alt="">
                    </div>                    
         
                </a> 
            </div>
        </div>
    </header>
    <div class="resumoUsuario">
            
        <h2 class="blokletters1"><%=nome %></h2>
        <p class="blokletters2"><%=nomeEscola %></p>
        
        <%
            
            
            
            %>

            <%  if(Model.bolAluno)
                {
            %>
            
                <p class="blokletters3"> Ano: <%=serie %>  - Turma: <%=turma %>   
            <%
                }
            %>
        
            


    </div>
    
    <ul>
        <li class="current"><a href="/AVA/Mural"><div class="icon_li mural"></div><p class="btnName">In&iacute;cio</p></a></li>
        <li><a href="/AVA/Perfil/MeuPerfil"><div class="icon_li perfi"></div><p class="btnName">Perfil</p></a></li>

        <% if(Model.bolAluno){ %>
            
        <li>
            <a href="<%=ViewData["UrlGrupo"]%>"><div class="icon_li FontAwesome ico_turma"></div><p class="btnName">Turma</p></a></li>
                    <!-- <a class="opcao_vertodos vertodosEscola" href="/AVA/Barras/Home/RetornaViewPerseguicaoCompleta/?deonde=7">Veja todas</a> -->
            <% }%>

            <% else{ %>
            
        <li>

        <% if(!Model.bolResponsavel){ %>
            <a class="opcao_vertodos vertodosEscola" href="/AVA/Barras/Home/RetornaViewPerseguicaoCompletaTurmas/?deonde=7"><div class="icon_li FontAwesome ico_turma"></div><p class="btnName">Turmas</p></a></li>
                    <!-- <a class="opcao_vertodos vertodosEscola" href="/AVA/Barras/Home/RetornaViewPerseguicaoCompleta/?deonde=7">Veja todas</a> -->
        <% }%>

            <% }%>
        

        <% if (Convert.ToInt32(ViewData["bolAVAPuro"]) == 0 && ViewData["PaginasComunicador"] != null) {
            foreach (var pc in (List<Pagina.Models.PaginaEducacional>)ViewData["PaginasComunicador"])
            {
                if (pc.bolComunicador || (bool)ViewData["PaginaEscolaTemPost"])
                {
                    %>
                    <!-- <li><a href="/AVA/Pagina/<%=pc.strLink %>"><div class="icon_li pagEducacional"></div>Página <%=pc.idPagina > 2 ? "DA ESCOLA" : pc.strTitulo%></a></li> -->
                    <%    
                }
            }       
        } %>


        


        <!-- <li><a href="/AVA/Grupo"><div class="icon_li grupos"></div> Grupos</a></li>    -->
            
         <%
        if (Convert.ToInt32(ViewData["bolAVAPuro"]) == 0) { 
        %>
            <% 
            if (Model.bolEducador)
            {%>
             <!--    <li id="meus_blogs_ava">
                    <a href="#"><div class="icon_li blog_"></div> Blog</a>                
                </li> -->
            <%
            }
            if (Model.bolAluno)
            {
            %> 
                <!-- <li><a href="/AVA/Portfolio/" class="port_"><div class="icon_li port_"></div><p class="btnName">Portfólio</p></a></li> -->
            <%} %>
            <!-- <li><a href="javascript:void(0);" onclick="linkSecretaria()" class="action_secre"><div class="icon_li secre"></div>Secretaria</a>
        
                <div id="secre_links">
               
                </div>
            </li> -->
            
            
        <%
        }
        else if (Convert.ToInt32(ViewData["admRede"]) == 1)
        { 
        %>
            <li><a href="javascript:void(0);" class="action_administracao"><div class="icon_li secre"></div><p class="btnName">Administração</p></a>
        
                <div id="Div1">
               
                </div>
            </li>
        <%
        } 
        %>
        <li class="seguirSeguindo">
        <%
        if(Model.id != Model.idSeguidor){
            if(Model.bolSigoAuto){
            %>
                <a class="s_IdoForever" href="javascript:void(0);">
                    <div class="fontello icoSeguindoBloqueado"></div>
                    <span class="txtSeguindoBloqueado">Seguindo</span>
                </a>
            <%
            }
            else if(Model.bolPossoSeguir && !Model.bolEstouSeguindo)
            {
            %>
                <a id="btseguir_perfil_<%= Model.id %>" href="javascript: seguir(<%= Model.idSeguidor %>, <%= Model.id %>)">
                    <div class="fontello icoSeguir"></div>
                    seguir
                </a>
            <%
            }
            else
            {
            %>
                <a class="segue_seguenot" id="btseguir_perfil_<%= Model.id %>" href="javascript: parardeseguir(<%= Model.idSeguidor %>, <%= Model.id %>)">
                    <span class="segue_span">
                        <div class="fontello icoSeguindo"></div>
                        Seguindo
                    </span>
                    <span class="seguenot_span">
                        <div class="fontello icoPararSeguir"></div>
                        Parar de seguir
                    </span>
                </a>
            <%
            }                
        }                        
        %>
        </li>
        <%
            if (listaLinksRapido != null && listaLinksRapido.Count > 0)
            {
        %>
        <li>
            <!-- <a href="javascript:void(0);"><div class="icon_li linksRapidos"></div> Links<span class="FontAwesome seta_dir_p"></span></a> -->
            <ul class="drop">
                <%
            if (listaLinksRapido != null)
            {
                foreach (Barras.Models.LinkRapidoCategoria lrc in listaLinksRapido)
                {
                    if (!lrc.bolPadrao) // Não padrão, possui link dentro
                    {
                        if (lrc.listaLinkRapido != null && lrc.listaLinkRapido.Count > 0)
                        {
                                
                                %>
                                <li>
                                    <a href="javascript:void(0);"><%=lrc.strCategoria%> <span class="FontAwesome seta_dir_p"></span></a>
                                    <ul>
                                        <%
                                        if (lrc.listaLinkRapido != null && lrc.listaLinkRapido.Count > 0)
                                        {
                                            foreach (Barras.Models.LinkRapido lr in lrc.listaLinkRapido)
                                            {
                                                       
                                                %>
                                                <li>
                                                    <!-- <a href="<%=lr.strLink %>" target="_blank"><%=lr.strTitulo%></a> -->
                                                </li>
                                                <%
                                            }
                                        }
                                    /*else
                                    { 
                                                
                                            <li>Sem Link Cadastrado</li>
                                                
                                        }*/
                                                %>
                                            </ul>
                                        </li>
                                        <%
                        }
                    }
                    else // Padrão, mostrar direto
                    {
                        if (lrc.listaLinkRapido != null && lrc.listaLinkRapido.Count > 0)
                        {
                            foreach (Barras.Models.LinkRapido lr in lrc.listaLinkRapido)
                            {
                                        %>
                                        <li>
                                            <!-- <a href="<%=lr.strLink %>" target="_blank"><%=lr.strTitulo%></a> -->
                                        </li>
                                        <%
                            }
                        }
                    }
                }
            }
            else
            {
                        %>
                        <li>
                            <a href="#"><div class="icon_li linksRapidos"></div> Sem link cadastrado<span class="FontAwesome seta_dir_p"></span></a> <!-- Com links -->
                        </li>
                        <%
            }
                %>
                <!--<li>
                    <a href="#"><div class="icon_li linksRapidos"></div> Links Rápidos<span class="FontAwesome seta_dir_p"></span></a> <!-- Com links --
                </li>-->
            </ul>
        </li>
       
        <% 
            }        
        %>
    </ul>


<script type="text/javascript">
    
    $(document).ready(function() {

        // alert(<%=msg%>);

    });


</script>
