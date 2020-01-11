<%@ Page Language="C#" MasterPageFile="~/Views/TES/Shared/Reduzido.Master" Inherits="PositivoFramework.Web.Mvc.Theme.ThemedViewPage<Perfil.Models.MainPerfilPrivado>" %>
<asp:Content ContentPlaceHolderID="ContentArea" ID="ContentArea" runat="server">
<% 
    var bolPodeDenunciar = Model.idVisitante != Model.idUsuario && Model.intComunicacaoPermissao != -2;

    var bolPapelProfessor = ViewData["bolPapelProfessor"] != null ? (bool)ViewData["bolPapelProfessor"] : false;
    var bolPapelCoordernador = ViewData["bolPapelCoordernador"] != null ? (bool)ViewData["bolPapelCoordernador"] : false;

    string strEscola = ViewData["strEscola"].ToString();
    string strCidade = ViewData["strCidade"].ToString();
    string strUF = ViewData["strUF"].ToString();
    string strFoto = ViewData["strFoto"].ToString();

    string strApelido = String.IsNullOrEmpty(Model.strApelido) ? "" : Model.strApelido;
    if (strApelido == Model.strNome)
        strApelido = "";  
%>
    <script type="text/javascript">
        jQuery(function ($) {

            //Inicia fancybox denunciar
            var u = {
                afterShow: callBackDenunciaMensagem,
                helpers: {
                    overlay: {
                        closeClick: false,
                        locked: false
                    }
                },
                type: 'ajax',
                fitToView: false
            };

            lightBoxAVA($("a#ava_denunciar"), u);
        });
    </script>
    <input type="hidden" id="strNomeLogado" value="<%=Model.strNome%>" />
    <input type="hidden" id="strLoginLogado" value="<%=Model.strLogin%>" />
    <input type="hidden" id="strEmailLogado" value="<%=Model.strEmail %>" />
    <input type="hidden" id="strURLCorrente" value="<%=HttpContext.Current.Request.Url.AbsoluteUri%>"/>
    <div class="dadosPerfilreduzido">
		<div class="box_perfil">
			<div class="imgPerfilReduzido">
				<img src="<%=strFoto%>" alt="Avatar"/>
			</div>
				 
            <% if(bolPodeDenunciar) { %>
			    <span class="mi_actions">
				    <a alt="Denunciar Perfil" id="ava_denunciar" href="/rede/conteudo_denuncia.asp" class="btn_cinza denunciar_perfil"><span class="denunciar_icone"></span>Denunciar</a>
			    </span>
                <h2 class="comItem"><%=Model.strNome%><%=!String.IsNullOrEmpty(strApelido) ? "<span class=\"apelidoPerfil\"> ("+strApelido+")</span>" : ""%></h2>
            <% } else { %>
                <h2><%=Model.strNome%><%=!String.IsNullOrEmpty(strApelido) ? "<span class=\"apelidoPerfil\"> ("+strApelido+")</span>" : ""%></h2>
            <% } %>	

            <% if(bolPapelProfessor) { %>
                <div class="dados_professor">
                <div class="imgMaisDescricao">
                    <div class="imgSvgApple">
					    <svg version="1.1" id="Camada_1" xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink" x="0px" y="0px"
							    width="12px" height="14.912px" viewBox="0 0 12 14.912" enable-background="new 0 0 12 14.912" xml:space="preserve">
					    <g>
						    <path fill="#b6babb" d="M11.916,7.566c-0.06-0.34-0.207-0.665-0.354-0.984c-0.224-0.481-0.544-0.925-0.966-1.295
							    C10.28,5.009,9.906,4.775,9.483,4.633c-0.572-0.19-1.191-0.329-1.799-0.292C7.012,4.384,6.511,4.782,6.11,4.45
							    c-0.163-0.134-0.089-0.393-0.2-0.697C5.878,3.699,5.777,3.612,5.685,3.617C5.51,3.624,5.411,3.589,5.507,3.819
							    C5.528,3.874,5.551,3.914,5.563,3.94c0.067,0.14,0.142,0.368-0.035,0.503c-0.732,0.56-1.347-0.13-2.479,0.165
							    C2.02,4.877,1.212,5.513,0.678,6.312c-1.189,1.778-0.667,3.758,0.441,5.46c0.168,0.26,0.349,0.512,0.537,0.76
							    c0.44,0.579,0.787,1.193,1.41,1.651c0.339,0.249,0.73,0.444,1.153,0.567c0.24,0.07,0.466,0.159,0.718,0.185
							    c0.272,0.024,0.636-0.094,0.89-0.045c0.001,0,2.565,0.5,3.992-1.712c0.029-0.044,0.073-0.083,0.107-0.124
							    c0.534-0.632,0.994-1.315,1.369-2.025c0.311-0.586,0.67-1.191,0.693-1.839C12.01,8.624,12.01,8.101,11.916,7.566z"/>
						    <path fill="#b6babb" d="M1.925,0.052C1.265-0.611,0.173,5.294,5.112,4.361C5.542,4.28,5.716,4.18,5.963,4.199
							    C5.726,3.968,5.811,3.896,5.717,3.295C5.32,0.73,4.475,2.612,1.925,0.052z"/>
						    <path fill="#b6babb" d="M8.301,1.518c0.391-0.372,0.557,3.474-2.246,2.629c-0.242-0.073-0.42-0.135-0.563-0.139
							    C5.643,3.889,5.68,3.835,5.77,3.493C6.153,2.034,7.845,1.948,8.301,1.518z"/>
					    </g>
					    </svg>
				    </div>                
                    <span class="professor">Professor(a)<br></span>
                </div>
            <% }else if(Model.bolAluno) { %>
                <div class="dados_AlunoEscolaDiferente">
                <%=!String.IsNullOrEmpty(Model.strTurma) ? "<span class=\"fontello turma\">Turma "+Model.strTurma+"<br></span>" : "" %>
            <% } else { %>
                <div class="dados_pais">
            <% } %>
            	<span class="fontello nomedaEscola"><%=strEscola%><br /></span>
				<span class="fontello cidade"><%=strCidade + "/" + strUF%><br /></span>
			</div>
		</div>
        <% if(!String.IsNullOrEmpty(Model.strTexto)) { %>
		<div class="box_sobremim">
			<h4>Sobre mim</h4>
			<p><%=Model.strTexto %></p>
		</div>
        <% } %>
	</div>
    <section class="divulga">

    </section>
</asp:Content>