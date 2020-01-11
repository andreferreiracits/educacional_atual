<%@ Page Language="C#" MasterPageFile="~/Views/TES/Shared/SiteMeio.Master" debug="true" Inherits="PositivoFramework.Web.Mvc.Theme.ThemedViewPage<List<Grupo.Models.Grupos>>" %>


<asp:Content ContentPlaceHolderID="ContentPlaceHolderDadosMeio" ID="ContentPlaceHolderDadosMeio" runat="server">

<%
  
List<Grupo.Models.Grupos> meusGruposModerados = ViewData["meusGruposModerados"] != null ? (List<Grupo.Models.Grupos>)ViewData["meusGruposModerados"] : null;
List<Grupo.Models.Grupos> meusGrupos = ViewData["meusGrupos"] != null ? (List<Grupo.Models.Grupos>)ViewData["meusGrupos"] : null;
List<Grupo.Models.Grupos> meusGruposConvitesPendentes = ViewData["meusGruposConvitesPendentes"] != null ? (List<Grupo.Models.Grupos>)ViewData["meusGruposConvitesPendentes"] : null;
List<Grupo.Models.Grupos> GruposNovos = ViewData["GruposNovos"] != null ? (List<Grupo.Models.Grupos>)ViewData["GruposNovos"] : null;
List<Grupo.Models.Grupos> desativados = ViewData["desativados"] != null ? (List<Grupo.Models.Grupos>)ViewData["desativados"] : null;
bool criarGrupo = (bool)ViewData["criarGrupo"];

string mensagemSemGrupo = ViewData["strMensagemSemGrupo"].ToString();

bool bolTemGrupo = true;

if (meusGruposModerados == null && meusGrupos == null && meusGruposConvitesPendentes == null && GruposNovos == null & desativados == null)
{
    bolTemGrupo = false;    
}

int intIdPapel = Convert.ToInt32(Session["idPapel"]);

%>



<% if(intIdPapel != 1000001)
{
%>
<script type="text/javascript" id="ze-snippet"  src="https://static.zdassets.com/ekr/snippet.js?key=d8a33bde-29a4-4292-b1df-1cd55b2df997"/> 

<script type="text/javascript">
  
</script>


<script type="text/javascript" src="<%=Url.CDNLink("/Common/zenDesk/zenDesk.js") %><%=Url.TimeStampLink() %>"></script>  



<script>

    zenDeskLoad();

</script>

<%
}
%>

<link rel="stylesheet" type="text/css" media="screen" href="/ava/staticcontent/content/tes/css/grupos_3.2.0.css<%=Url.TimeStampLink() %>" />

<script type="text/javascript" src="/ava/staticcontent/common/scripts/grupos_4.2.11.js<%=Url.TimeStampLink() %>"></script>
<script type="text/javascript" src="<%=Url.CDNLink("/Common/Scripts/jquery-limit.min.js") %><%=Url.TimeStampLink() %>"></script>
<script type="text/javascript" src="<%=Url.CDNLink("/Common/scripts/radiocheckbox/jquery.styleRadioCheckbox.js") %><%=Url.TimeStampLink() %>"></script>

<section id="ava_container" class="hs1">
	<div id="wrapper">
        <header id="headerGrupo">
        		<div class="topo_titulo left">
        			<h1> <span class="FontAwesome ico_grupos" aria-hidden="true"></span> GRUPOS</h1>
                    <%
                        if (criarGrupo)
                        {
                            %>
                            <a href="<%=Url.Action("CriarGrupo", "Home")%>" id="btCriarGrupo" class="btn_cor fancybox.ajax">Criar grupo</a>
                            <%
                        }
                    %>
                    
        			
        		</div>
        		<div class="filtroGrupo right">
        			
        			<form>
        				<div class="bootstrap">
        			        <div class="btn-group">
        			            <button data-toggle="dropdown" class="btn btn-small dropdown-toggle "> <span class="FontAwesome"></span> Todos os grupos <span class="caret"></span></button>
        			            <ul class="dropdown-menu">
        			                <li><input type="radio" id="tc2_" name="filtroGrupo" value="1" checked="checked"><label for="tc2_">Todos os grupos</label></li>
        			                <li class="divider"></li>
        			                <li><input type="radio" id="tc2_0" name="filtroGrupo" value="2"><label for="tc2_0">Convites pendentes</label></li>
        			                <li><input type="radio" id="tc2_1" name="filtroGrupo" value="3"><label for="tc2_1">Moderados por você</label></li>
        			                <li><input type="radio" id="tc2_2" name="filtroGrupo" value="4"><label for="tc2_2">Grupos de que você participa</label></li>
        			                <li><input type="radio" id="tc2_3" name="filtroGrupo" value="5"><label for="tc2_3">Grupos do portal</label></li>
        			                <li><input type="radio" id="tc2_4" name="filtroGrupo" value="6"><label for="tc2_4">Grupos da escola</label></li>
        			                <li><input type="radio" id="tc2_5" name="filtroGrupo" value="7"><label for="tc2_5">Desativados</label></li>
        			            </ul>  
        			        </div>
        			    </div>	
        				<div class="nomePesquisaGrupo">
        					<span class="FontAwesome"></span>
        					<input type="text" placeholder="Pesquisar por grupos" id="txtPesquisaGrupo">
        				</div>	
        				<input type="submit" value="Pesquisar" id="btnPesquisarGrupo" class="btn_cor">
        			</form>
        		</div>
                </header>

        		<span class="clearfix"></span>
                <div class="feedback_grupo com_termo" style="display: none;">
        			<p>Ops! Não há grupo com o termo <span></span>.<br />Verifique se usou a grafia correta ou utilize um sinônimo.<br />
                    <%
                    if (GruposNovos != null)
                    {
                        %>
                        <br />Você também pode aproveitar para conhecer os grupos do portal e da sua comunidade escolar!</p>
                        <%      
                    } 
                    %>
                    <a href="javascript:resetarPesquisa();">Exibir todos os grupos</a>
        		</div>
                <div class="feedback_grupo com_categoria" style="display: none;">
        			<p>Ops! Não há resultados para a sua pesquisa.<br />
                    <%
                    if (GruposNovos != null)
                    {
                        %>
                        Aproveite para conhecer os grupos do portal e da sua comunidade escolar!</p>
                        <%      
                    } 
                    %>            
        			<a href="javascript:resetarPesquisa();">Exibir todos os grupos</a>
        		</div>
                <div class="feedback_grupo sem_grupo_filtro" style="display: none;">
        			<p><%=mensagemSemGrupo%></p>
        		</div> 

                <% 
                if (!bolTemGrupo)
                {
                   %>
                   <div class="feedback_grupo sem_grupo">
        			    <p><%=mensagemSemGrupo%></p>
        		   </div>    
                   <%     
                }    
                %>

                <p class="resultado_pesquisa_grupo" style="display: none;">Resultado(s) para pesquisa por <span></span> <a href="javascript:resetarPesquisa();"><span class="FontAwesome"></span>Limpar pesquisa</a></p>
                <%
                if (meusGruposConvitesPendentes != null)
                {
                    Html.RenderPartial("Partials/carregaGrupos", meusGruposConvitesPendentes, new ViewDataDictionary { { "titulo", "Convites pendentes" }, { "class", "convite_pendente" } });
                }
                
                if (meusGruposModerados != null)
                {
                    Html.RenderPartial("Partials/carregaGrupos", meusGruposModerados, new ViewDataDictionary { { "titulo", "Moderados por você" }, { "class", "moderado_por_voce" } });
                }
                
                if (meusGrupos != null)
                {
                    Html.RenderPartial("Partials/carregaGrupos", meusGrupos, new ViewDataDictionary { { "titulo", "Grupos de que você participa" }, { "class", "voce_participa" } });
                }

                //Html.RenderPartial("Partials/carregaGrupos", desativados, new ViewDataDictionary { { "titulo", "Desativados" }, { "class", "desativados" }, { "mostra", false } });
                
                if (GruposNovos != null)
                {
                    Html.RenderPartial("Partials/carregaGrupos", GruposNovos, new ViewDataDictionary { { "titulo", "Descubra novos grupos" }, { "class", "descubra_novos_grupos" } });
                }
                %>	
        		
	</div>	
</section>
</asp:Content>
