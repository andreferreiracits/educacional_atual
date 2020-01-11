<%@ Page Language="C#" MasterPageFile="~/Views/TES/Shared/BarraDireita.Master" Inherits="PositivoFramework.Web.Mvc.Theme.ThemedViewPage<IList<Mural.Models.Jogos>>" %>

<asp:Content ContentPlaceHolderID="ContentArea" ID="ContentArea" runat="server">
    
    <!-- CARROSSEL -->

            <div class="banner jogos">
				<div class="anterior"></div>
				<div class="slider">
					 <a href="http://www.educacional.com.br/mdcEducacional/home_mdc_ava.asp" target="_blank">
						<img src="/userData/ava/avinha/jogos/img_01B.jpg" alt="" width="735" height="272"/>
						<ul class="mini">
							
						</ul>
					</a>
					<a href="http://www.educacional.com.br/bichosdafloresta/indiceRedirect.asp" target="_blank">
						<img src="/userData/ava/avinha/jogos/img_02B.jpg" alt="" width="735" height="272"/>
					</a>
					<a target="_blank" href="http://www.educacional.com.br/bibliotecainfantil/" >
					   <img src="/AVA/StaticContent/Common/img/avinha/jogos/banner_ed_inf_bau.jpg" alt="" width="735" height="272"/>
					</a>
				</div>
				<div class="proximo"></div>
				<div class="nav">
					<a href="#" rel='1'></a>
					<a href="#" rel='2'></a>
					<a href="#" rel='3'></a>
				</div>
			</div>    <!-- CARROSSEL -->
    <h1 class="titulo_criancada">Criançada</h1>
    <!-- LISTA DE MATERIAIS -->
        <section class="lista_atividades_ei">
	    
        <a class="botao_categoria atividades_ei ativo"  id="3" href="javascript:void(0);"><span>Atividades</span></a>
		<a class="botao_categoria mundocrianca_ei"      id="1" href="javascript:void(0);"><span>Mundo da Criança</span></a>
		<a class="botao_categoria bichofloresta_ei"     id="2" href="javascript:void(0);"><span>Bichos da Floresta</span></a>

		<div class="class_idade">
			<ul>
				<%
                for (int i = 3; i <= 7; i++) 
                {
                    if (i == 3)
                    {
                        %>
                             <li><a href="javascript:;" class="muda_jogo <% if( i== (int) ViewData["intIdade"] ){ Response.Write("ativo"); } %>" id="<%=i %>"><%=i%> <span>anos</span></a></li>
                        <%
                    }else { 
                        %>
                            | <li><a href="javascript:;" class="muda_jogo <% if( i== (int) ViewData["intIdade"] ){ Response.Write("ativo"); } %>" id="<%=i %>"><%=i %> <span>anos <% if (i == 7) { Response.Write("ou +"); } %></span></a></li>
                        <%
                    }
                }
                %>
			</ul>
		</div>
        
        <!--h2 class="atividades_ei">Atividades</h2>
	    <div class="class_idade">
          <ul>
            <%
                for (int i = 3; i <= 7; i++) 
                {
                    if (i == 3)
                    {
                        %>
                             <li><a href="javascript:;" class="muda_jogo" <% if( i== (int) ViewData["intIdade"] ){ Response.Write("style='color: #e46814';"); } %> id="<%=i %>"><%=i%> <span>anos</span></a></li>
                        <%
                    }else { 
                        %>
                            | <li><a href="javascript:;" class="muda_jogo" <% if( i== (int) ViewData["intIdade"] ){ Response.Write("style='color: #e46814';"); } %> id="<%=i %>"><%=i %> <span>anos</span></a></li>
                        <%
                    }
                }
            %>
		    </ul>
	    </div-->
        
	    <ul class="ulJogos">
            <%
                if (Model != null) {
                    
                    foreach (Mural.Models.Jogos j in Model) 
                    {
                        string target;
                        if (j.strLink.ToLower().IndexOf("javascript") > 0)
                        {
                            target = "_self";
                        }
                        else 
                        {
                            target = "_blank";
                        }

                        
                        if (j.bolNovo == 1) { 
                        %>
                            <li><a href='<%= j.strLink %>' target='<%= target %>' class="tooltip_title" title="<%= j.strJogo %>"><img src="<%= j.strThumb %>" width="114" height="82" /></a><span></span></li>
                        <%
                        }
                        else
                        {
                        %>
                            <li><a href='<%= j.strLink %>' target='<%= target %>' class="tooltip_title" title="<%= j.strJogo %>"><img src="<%= j.strThumb %>" width="114" height="82" /></a></li>
                        <%    
                        }
                        
                    }
                }else{
                    %>
                        <span>Nenhum jogo encontrado.</span>
                    <%
                }
            %>
	    </ul>
    </section>
        <%//if(Model.Count >= 25){ %>
        <footer class="veja_mais_ei_mural">
		    <!-- incite a riot: http://24ways.org/2009/incite-a-riot -->
		    <a href="javascript:;" class="btnVejaMaisJogos"></a>
	    </footer>
        <%//} %>
    <!-- LISTA DE MATERIAIS -->
    <script language="javascript">
    
    var intIdadeInicial = parseInt(<%=ViewData["intIdade"]%>);
    if(intIdadeInicial == '3'){
        $('.btnVejaMaisJogos').hide();
    }
    $('.muda_jogo').click(function () {
     
    var idCategoria     = parseInt($('.botao_categoria.ativo').attr('id'));
    var idadeClicada    = parseInt($(this).attr('id'));
    var intIdadeAtual   = parseInt(<%=ViewData["intIdade"] %>);
    var novoIdSerie     = '';
    
    $('.muda_jogo').removeClass('ativo');
    $(this).addClass('ativo');

    $(".veja_mais_ei_mural").show();
    
    var bolInativo = false;
    if (idadeClicada == 3) {
        bolInativo = true;
    }    
    
        //faz ajax dos jogos.
        //Mudo a variável global;
        intIdadeInicial = idadeClicada;

        switch (idadeClicada) {
            case 3:
                novoIdSerie = '12';
                break;
            case 4:
                novoIdSerie = '13';
                break;
            case 5:
                novoIdSerie = '14';
                break;
            case 6:
                novoIdSerie = '15,16,27,9';
                break;
            case 7:
                novoIdSerie = '1';
                break;
            default:
                novoIdSerie = '1';
        }
        
        //$(".ulJogos").html("<img src='/AVA/StaticContent/Common/img/perfil/carregando.gif' class='loader_jogos' border='0' />");

      /*  $.ajax({
            url: "/AVA/Mural/Home/BuscaJogosPorSerie",*/

        $.ajax({
            url: "/AVA/Mural/Home/GetMateriaisPaginandoPorSerie",
            data: { 'idade': parseInt(idadeClicada),'intInicio': '1','intFim': '25', 'idCategoria': idCategoria },
            async: true,
            dataType: "json",
            contentType: "application/x-www-form-urlencoded; charset=iso-8859-1",
            success: function (data) {

                if (data.Total > 0) {
                    $(".ulJogos").empty();
                    $('.loader_jogos').hide();
                    $(data.materiais).each(function (i, e) {
                     

                        // Validação para caso seja uma url com javascript, pra abrir na mesma janela, se não, em nova janela.
                        var target = '';
                        if (e.strLink.toLowerCase().indexOf("javascript") > -1) {
                            target = '_self';
                        } else {
                            target = '_blank';
                        }

                        if(e.bolNovo == 1){
                            var html = "<li style=\"display:none;\"><a target='" + target + "' href='" + e.strLink + "' class=\"tooltip_title\" title=\"" + e.strJogo + "\"><img src=\"" + e.strThumb + "\" width=\"114\" height=\"82\" alt=\"\"></a><span></span></li>";
                        }else{
                            var html = "<li style=\"display:none;\"><a target='" + target + "' href='" + e.strLink + "' class=\"tooltip_title\" title=\"" + e.strJogo + "\"><img src=\"" + e.strThumb + "\" width=\"114\" height=\"82\" alt=\"\"></a></li>";
                        }
                        
                        $(".ulJogos").append(html);
                        $(".ulJogos li:last").fadeIn();

                         if(intIdadeInicial == '3'){
                            $('.btnVejaMaisJogos').hide();
                         }else{
                            $('.btnVejaMaisJogos').show();
                        }
                        
                        $(".tooltip_title").each(function () {
                            $(this).tooltip({
                                offset: [-10, 0],
                                opacity: 0.9,
                                style: {
                                    background: '#A2D959'
                                }
                            });
                        });
                    });
                }else{
                    $('.loader_jogos').hide();
                }
            }
        });
        
        BuscarMaisVistos(novoIdSerie);
        if(bolInativo){
            $(this).addClass('inativo');
        }
    
    
    });
    

        $(document).ready(function(){
		    $(".b_tooltip_right").each(function(){
			    $(this).tooltip({
				    offset: [0, -40],
				    opacity: 1,
				    position: 'top right',
				    effect: 'slide',
				    relative: true
			    });		
		    });

	    });
	
	    $(document).ready(function(){
		    $(".b_tooltip_left").each(function(){
			    $(this).tooltip({
				    offset: [0, 40],
				    opacity: 1,
				    position: 'top left',
				    effect: 'slide',
				    relative: true
			    });		
		    });

	    });
	
	    $(document).ready(function(){
		    $(".tooltip_title").tooltip({
			    offset: [-10, 0],
			    opacity: 0.9,
			
		    });
	    });

        //Paginacao por categoria
        $(document).ready(function(){
            $(".botao_categoria").click(function(){
                $(".veja_mais_ei_mural").show();
                var categoriaClicada    = $(this);
                $(".botao_categoria").removeClass('ativo');
                $(categoriaClicada).addClass('ativo');
                
                var idCategoriaClicada  = parseInt($('.botao_categoria.ativo').attr('id'));
                var idadeSelecionada    = $('.muda_jogo.ativo').attr('id');

                  //alert('idCategoria: '+idCategoriaClicada+' / idade '+idadeSelecionada);
               //   $(".ulJogos").html("<img src='/AVA/StaticContent/Common/img/perfil/carregando.gif' class='loader_jogos' border='0' />");
                  $.ajax({
                    url: "/AVA/Mural/Home/GetMateriaisPaginandoPorSerie",
                    data: { 'idade': idadeSelecionada,'intInicio': '1','intFim': '25', 'idCategoria': idCategoriaClicada },
                    async: true,
                    dataType: "json",
                    contentType: "application/x-www-form-urlencoded; charset=iso-8859-1",
                    success: function (data) {
                         
                         //if
                         if (data.Total > 0) {
                            $(".ulJogos").empty();
                            $(data.materiais).each(function (i, e) {
                            $('.loader_jogos').hide();

                                // Validação para caso seja uma url com javascript, pra abrir na mesma janela, se não, em nova janela.
                                var target = '';
                                if (e.strLink.toLowerCase().indexOf("javascript") > -1) {
                                    target = '_self';
                                } else {
                                    target = '_blank';
                                }
                                if(e.bolNovo == 1){
                                    var html = "<li style=\"display:none;\"><a target='" + target + "' href='" + e.strLink + "' class=\"tooltip_title\" title=\"" + e.strJogo + "\"><img src=\"" + e.strThumb + "\" width=\"114\" height=\"82\" alt=\"\"></a><span></span></li>";

                                }else{
                                    var html = "<li style=\"display:none;\"><a target='" + target + "' href='" + e.strLink + "' class=\"tooltip_title\" title=\"" + e.strJogo + "\"><img src=\"" + e.strThumb + "\" width=\"114\" height=\"82\" alt=\"\"></a></li>";
                                }

                              $(".ulJogos").append(html);
                              $(".ulJogos li:last").fadeIn();

                            });
                            
                                $(".tooltip_title").each(function () {
                                    $(this).tooltip({
                                        offset: [-10, 0],
                                        opacity: 0.9,
                                        style: {
                                            background: '#A2D959'
                                        }
                                    });
                                });
                            if(data.materiais.length < 25 ){
                             $(".veja_mais_ei_mural").hide();
                            }
                        }else{
                            $(".veja_mais_ei_mural").hide();
                            $('.loader_jogos').hide();
                        }
                        // fim do if
                    },
                    error: function (data) {
                        //alert(data.status);
                    }
                });

            });
        });

        //Paginação dos materiais
        $(document).ready(function(){
             $(".btnVejaMaisJogos").click(function(){
                 var intInicio       = parseInt($(".ulJogos li").size()+1);
                 var intFim          = parseInt(intInicio + 24);
                 var idCategoria     = parseInt($('.botao_categoria.ativo').attr('id'));
                 $.ajax({
                    url: "/AVA/Mural/Home/GetMateriaisPaginandoPorSerie",
                    data: { 'idade': parseInt(intIdadeInicial),'intInicio': intInicio,'intFim': intFim, 'idCategoria': idCategoria },
                    async: true,
                    dataType: "json",
                    contentType: "application/x-www-form-urlencoded; charset=iso-8859-1",
                    success: function (data) {
                         
                         //if
                         if (data.Total > 0) {
                            $(data.materiais).each(function (i, e) {

                                // Validação para caso seja uma url com javascript, pra abrir na mesma janela, se não, em nova janela.
                                var target = '';
                                if (e.strLink.toLowerCase().indexOf("javascript") > -1) {
                                    target = '_self';
                                } else {
                                    target = '_blank';
                                }
                                if(e.bolNovo == 1){
                                    var html = "<li style=\"display:none;\"><a target='" + target + "' href='" + e.strLink + "' class=\"tooltip_title\" title=\"" + e.strJogo + "\"><img src=\"" + e.strThumb + "\" width=\"114\" height=\"82\" alt=\"\"></a><span></span></li>";

                                }else{
                                    var html = "<li style=\"display:none;\"><a target='" + target + "' href='" + e.strLink + "' class=\"tooltip_title\" title=\"" + e.strJogo + "\"><img src=\"" + e.strThumb + "\" width=\"114\" height=\"82\" alt=\"\"></a></li>";
                                }
                                // $(html).hide().appendTo(".ulJogos").fadeIn(2000);
                                $(".ulJogos").append(html);
                                $(".ulJogos li:last").fadeIn();

                            });
                            
                                $(".tooltip_title").each(function () {
                                    $(this).tooltip({
                                        offset: [-10, 0],
                                        opacity: 0.9,
                                        style: {
                                            background: '#A2D959'
                                        }
                                    });
                                });
                            if(data.materiais.length < 25 ){
                             $(".veja_mais_ei_mural").hide();
                            }
                        }else{
                            $(".veja_mais_ei_mural").hide();
                        }
                        // fim do if
                    },
                    error: function (data) {
                        //alert(data.status);
                    }
                });
             });
        });

        switch (<%=ViewData["intIdade"]%>) {
            case 3:
                novoIdSerie = '12';
                break;
            case 4:
                novoIdSerie = '13';
                break;
            case 5:
                novoIdSerie = '14';
                break;
            case 6:
                novoIdSerie = '15,16,27,9';
                break;
            case 7:
                novoIdSerie = '1';
                break;
            default:
                novoIdSerie = '1';
        }
        BuscarMaisVistos(novoIdSerie);

        
           $('.carrousel_ei_jogos').jcarousel({
               scroll: 1,
               initCallback: mycarousel_initCallback,
               auto: 6,
               wrap: 'circular'
           });

		function mycarousel_initCallback(carousel) {
		    jQuery('.jcarousel-control a').bind('click', function () {
		        carousel.scroll(jQuery.jcarousel.intval(jQuery(this).data('id')));
		        return false;
		    });
		}

    </script>
</asp:Content>