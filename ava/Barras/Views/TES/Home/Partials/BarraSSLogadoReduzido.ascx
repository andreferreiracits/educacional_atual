<%@ Control Language="C#" Inherits="System.Web.Mvc.ViewUserControl<UsuarioAVA.Models.Usuario>" %>
<%@ OutputCache VaryByParam="None" Duration="1" %>
<% 
string strURL = ViewData["URL"].ToString();
string strURLEscola = ViewData["URLEscola"].ToString();
int escolaID = (int)ViewData["EscolaID"];
string loginID = ViewData["LoginID"].ToString();
string link = "/ava/avaliacoes";
int intTipoPortal = (ViewData["intTipoPortal"].ToString() == null || ViewData["intTipoPortal"].ToString() == "") ? 999999 : Convert.ToInt32(ViewData["intTipoPortal"].ToString());
int bolModular = Convert.ToInt32(ViewData["bolModular"]);
int bolAVAPuro = Convert.ToInt32(ViewData["bolAVAPuro"]);
int bolCP = Convert.ToInt32(ViewData["bolCP"]);
bool bolCPPuro = (bool)Session["bolCPPuro"];
int bolAvaliacoes = Convert.ToInt32(ViewData["bolAvaliacoes"]);
int intSerie = Convert.ToInt32(ViewData["intSerie"].ToString());
bool bolResponsavel = (bool)ViewData["bolResponsavel"];
bool responsavelVeLip = (bool)ViewData["responsavelVeLip"];
bool lip = Convert.ToBoolean(ViewData["bolAcessoLIP"]);
var bolMural = (bool)ViewData["bolMural"];
var bolAvinha = (bool)ViewData["bolAvinha"];
bool bolLegado = (bool)ViewData["bolLegado"];
string strLogoEscola = (string)ViewData["strLogoEscola"];
bool bolPesquisa = Convert.ToBoolean(ViewData["bolPesquisa"]);
bool bolCarregaMensagemTurmaAnoErrado = (bool)ViewData["bolCarregaMensagemTurmaAnoErrado"];
string strMiniFoto = (string)ViewData["strMiniFoto"];
bool bolWebmail = Convert.ToBoolean(ViewData["bolWebmail"]);
string poderSPE = (string)ViewData["poderSPE"];
string poderPenseMat = (string)ViewData["poderPenseMat"];
string poderAprimora = (string)ViewData["poderAprimora"];


int idpapel = Convert.ToInt32(Session["IdPapel"]);

bool bolUsuarioSemTurma = Convert.ToBoolean(Session["bolUsuarioSemTurma"]);
bool bolFilhoSemTurma = (bool)ViewData["filhoSemTurma"];
bool bolMaisDeUmFilho = (bool)ViewData["maisDeUmFilho"];
string filhos = (string)ViewData["filhos"];
bool bolMenuGerenciadorCP = (bool)ViewData["bolMenuGerenciadorCP"];

%>
<style>

    li.agenda-edu img {
        height: 20px;
    }

    
    .fa-size{
        font-size: 20px;

    }

</style>

 <script>
      $(document).ready(function(){        

       
    if(<%= idpapel %> == 2000001){
/*            var aprimoraIcon = document.getElementsByClassName("menu_smart");*/
            //var divisorIcon1 = document.getElementsByClassName("dividir_icons");
/*            var penseIcon = document.getElementsByClassName("menu_pense");*/
            $(".menu_smart").hide();
            $(".menu_pense").hide();
                
            console.log('TESTE DE ENTRADA3!!');
            
            //if (poderSPE != "liberaSPE")
            //{  
            
                //$(".dividir_icons").hide();
            
            //} 
            

            //aprimoraIcon.style.display = 'none';
            //divisorIcon1.style.display = 'none';
            //penseIcon.style.display = 'none';

    }else{
        return 0;
    }

        });




</script>





<%


if (bolCarregaMensagemTurmaAnoErrado && !bolMural) 
{    
    %>
    <div class="aviso_barrass_ava" style="display:none;"><p>Suas turmas ainda estão com o cadastro do ano passado. Aguarde a atualização para realizar atividades com elas.<a href="javascript:void(0);"><i class="fontello icon_close"></i></a></p></div>
    <% 
}


//temporario até o home pages passar a utilizar o sistema Auth
string urlRedirectHomePages = (string)ViewData["urlRedirectHomePage"];
if (!string.IsNullOrWhiteSpace(urlRedirectHomePages))
{ 
    %>
    <script>
        var urlredirect = "<%=urlRedirectHomePages%>";
        window.location = urlredirect;</script>
    <%
}    
%>
  

<script type="text/javascript">
    jQuery(function ($) {
        $(".menu_atividades").mouseover(function () {
            if ($(".menu_atividades").hasClass("desativado")) {
                $("#alunoSemTurmaMenu").css('display', 'block');
            }
        });

        $(".menu_atividades").mouseout(function () {
            $("#alunoSemTurmaMenu").css('display', 'none');
        });
    });

</script>

<!--script language="JavaScript" src="/edhtml/upload.js<%=Url.TimeStampLink() %>"></script-->
<script type="text/javascript" src="/edhtml/upload.js?v1"></script>


<nav class="centerclass">

    <h1 class="ico_home"> 
        <a href="<%=strURL%>/AVA/Mural" title="In&iacute;cio">
            <% if (String.IsNullOrEmpty(strLogoEscola))
               { %>
                <img src="/AVA/StaticContent/Common/img/geral/ico_educacional.png" alt="">
            <%}else{ %>
                <img src="<%=strLogoEscola %>" alt="" />
            <%} %>
        </a>
    </h1>

    <ul class="menu_principal">
        
        <li class="menu ava_li_acessorapido">
            <a href="<%=strURL%>/AVA/Mural" id="ava_acessorapido" class="link_menu menu_ativo"><span> Mural</span></a>
            <!-- <nav id="main_ava" class="<%=bolAVAPuro == 1? "modular" : ""%>" style="display: none;">
                <div class="menu_geral <%=bolAVAPuro == 1 ? "ajx" : ""%>" id="menuava_geral" style="display: none;">
                    <div class="menu_cascata" id="menu_equerda"> </div>
                    <div class="menu_adc" id="menu_direita"> </div>
                </div> 
            </nav> -->
        </li>

        <li class="ava_cont menu_biblioteca">
            
            <a href="/ava/caminhos/home/index/1" class="link_menu" id="item_tarefas" aria-hidden="true">
                <!-- <i class="fa fa-book fa-size"></i> -->
                <span> Tarefas</span>
            </a>
        </li>

        <li class="ava_cont menu_biblioteca">
            <a href="/ava/caminhos/home/index/2" class="link_menu" id="item_caminhos" aria-hidden="true">
                <!-- <i class="fa fa-map-signs fa-size"></i> -->
                <span > Caminhos</span>
            </a>
        </li>

        <li class="ava_cont menu_biblioteca">
            <a href="/AVA/avaliacoes" class="link_menu" id="item_bbl">
                <span> Avaliações</span>
            </a> 
        </li>

        

        <li id="" class="agenda-edu" title="Agenda Edu" onclick="entrarAgendaEdu()">
            <!-- <img src="https://static.agendaedu.com/assets/marca/marca_agendakids_horizontal_colorida-625a6c6d04779495cb0cc9397a0e6af7431792abb43105c7be8011dd559bd742.png" alt=""/> -->
            <a href="javascript:void(0);" class="link_menu" id="item_agendaEdu">
                <!-- <img src="/AVA/StaticContent/Common/img/geral/ico_agendaedu.png" alt="Agenda Edu"/>  -->
                <span> Agenda </span>
            </a>
        </li>

    </ul>


    <ul class="menu_secundario" id="ava_user" ident="<%:Model.id%>">        
        <li class="noti_li notificacao">
            <a class="span_vazio" id="vw_notif" href="javascript:void(0);">
                <span class="noti_quant quantidade" style="display:none;"></span>
            </a>
        </li>
        
        <li class="usuario">
            <a href="<%=strURL%>/AVA/Perfil/MeuPerfil">
                <img width="30" height="30" id="usuarioAlterarThumb" alt="" src="<%=strMiniFoto %>">
                <span id="Span1" class="nome"title= "<%=Model.strNome%>"><%=Model.strNome%></span> 
            </a>
        </li>

        <li class="logout">
            <a href="javascript:logoutAVA();">Sair</a>               
        </li>

    </ul>
 </nav>


<!-- Jogar pro perfil -->
<input type="hidden" id="nova_foto" value="" />
<input type="hidden" id="novo_apelido" value="" />
<input type="hidden" id="novo_sobremim" value="" />


<script>
    
    function modalTema(){

        var imgTema = "<img class='imagemTemaModal' src='/AVA/StaticContent/Common/img/geral/Outubro-Rosa.gif'/>";
        var tituloUm = "<h2>Outubro Rosa</h2>";
        var tituloDois = "<h2>Objetivo do Outubro Rosa</h2>";
        var textoUm = "<p>O Outubro Rosa é uma campanha mundial, realizada anualmente no mês de outubro, que busca a conscientização das mulheres a respeito da prevenção e do diagnóstico precoce do câncer de mama, aumentando as chances de cura e reduzindo a mortalidade. A campanha é simbolizada pelo laço cor-de-rosa.</p>";
        var textoDois = "<p>Durante o mês de outubro, diversas instituições, públicas e privadas, disponibilizam exames gratuitos ou com preço reduzido, a fim de encorajar as mulheres a realizar esses exames e tratar qualquer problema encontrado precocemente, visto que, nos estágios iniciais, o câncer de mama é assintomático  e responde muito melhor aos tratamentos.</p>";
        var textoTres = "<p>O Outubro Rosa têm como objetivo conscientizar as mulheres sobre importância da prevenção e do diagnóstico precoce do câncer de mama, que tem altas chances de cura quando descoberto cedo. Mesmo assim, grande parte dos diagnósticos acabam sendo tardios. Embora seja focado no câncer de mama, muitas instituições aproveitam o mês também para falar sobre outras neoplasias que podem ocorrer no aparelho reprodutor feminino, como o câncer de ovário ou do colo do útero, por exemplo.</p> ";

        $.fancybox.open('<div class="mensagemTema">'+ imgTema + tituloUm + textoUm + textoDois + tituloDois + textoTres + '</div>');
    }

</script>

