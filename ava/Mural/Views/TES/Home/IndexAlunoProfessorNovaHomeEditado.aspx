<%@ Page Language="C#" MasterPageFile="~/Views/TES/Shared/Mural.Master" Inherits="PositivoFramework.Web.Mvc.Theme.ThemedViewPage<Mural.Models.MainPerfilPrivado>" %>

<asp:Content ContentPlaceHolderID="PageJsArea" ID="PageJsArea" runat="server">
    <%
        bool bolmenuSecretaria = ViewData["bolmenuSecretaria"] != null ? (bool)ViewData["bolmenuSecretaria"] : false;
        bool bolmenuAdministracao = ViewData["bolmenuAdministracao"] != null ? (bool)ViewData["bolmenuAdministracao"] : false;
        string param = "";
        string turmaAluno = "";
        string idUsuarioCript = "";
        //string sessionSecrePai = "";




        string bolAVAPuroAux = "";
        var strLajotinhaTodos = "";
        int bolAVAPuro = 0;
        
        var objPapelUsuario = (UsuarioAVA.Models.PapelUsuario)ViewData["objPapelUsuario"];
        var escolaEmRede = (bool)ViewData["escolaEmRede"];
        var escolaUnidade = (bool)ViewData["escolaUnidade"];
        int idUsuarioPublico = (System.Int32) ViewData["idUsuarioPublico"] ;
        
        var isAluno = Model.bolAluno;

        if (objPapelUsuario.bolAluno)
        {
            strLajotinhaTodos = "Pode ser visto por seus colegas de turma, pais, responsáveis e seguidores.";
        }
        else if (objPapelUsuario.bolCoordenador || objPapelUsuario.admRedeSocial)
        {
            strLajotinhaTodos = "Pode ser visto por todos da sua escola.";
            if (escolaEmRede)
                strLajotinhaTodos = "Pode ser visto por toda rede de escolas.";
            else if (escolaUnidade)
                strLajotinhaTodos = "Pode ser visto por todas as unidades da escola.";
        }
        else
        {
            strLajotinhaTodos = "Pode ser visto por suas turmas, pais e responsáveis dos alunos das suas turmas, professores da sua escola e seguidores.";
        }
        
        if (Model.bolEducador)
        {
            param = "educador";
        }
        else if (Model.bolAluno)
        {
            param = "aluno";
            turmaAluno = Session["Serie"].ToString(); //Model.strTurma;
            
        }
        else
        {
            param = "pai";
        }

        idUsuarioCript = ViewData["idUsuarioCript"].ToString();
        //sessionSecrePai = ViewData["sessionSecrePai"].ToString();
        bolAVAPuroAux = ViewData["bolAVAPuro"].ToString();
        if (bolAVAPuroAux == "" || bolAVAPuroAux == "null")
        {
            bolAVAPuroAux = "0";
        }
        bolAVAPuro = Convert.ToInt32(bolAVAPuro);    

    %>    
    <script type="text/javascript" src="/AVA/StaticContent/Common/Scripts/jquery.AvaSelectorNovaHome_3.2.21.js<%=Url.TimeStampLink() %>"></script>
    <script type="text/javascript" src="/AVA/StaticContent/Common/Scripts/jquery.seletorAVA_3.0.2.js<%=Url.TimeStampLink() %>"></script>
    <script src="/AVA/StaticContent/Common/Scripts/timeline_3.2.0.js<%=Url.TimeStampLink() %>"
        type="text/javascript"></script>
    <script src="/AVA/StaticContent/Common/Scripts/ajaxfileupload(1).js<%=Url.TimeStampLink() %>"
        type="text/javascript"></script>
		
    <script defer src="<%=Url.CDNLink("/Common/Scripts/paginationmuralatividadeshoje_2.0.0.js") %><%=Url.TimeStampLink() %>"></script>
    <link rel="stylesheet" type="text/css" href="<%=Url.CDNLink("/Common/Scripts/pagination_2.0.0.css")%><%=Url.TimeStampLink() %>" />

	<script type="text/javascript">
    var seletorCurr = 0;
    var idUsuarioCriptTL = "<%=idUsuarioCript %>";
    var isAluno = "<%=isAluno %>";

    var instanciaSeletorMural = false;
    var instanciaSeletorMuralTarefa = false;
    
    var varHtml = '';
    var varAux = '';
    var varSources = [];

    function carregaAtividades() {
    

      if(isAluno.indexOf('True') >= 0 )
      {
            console.log(' Não BUgou');


            $('.atividadesdodia-card').hide();

            var idUser = "<%= idUsuarioPublico %>";

            // localStorage.setItem("idUser",null);

            // localStorage.setItem("idUser",idUser);

            var curr = new Date; 
            var first = curr.getDate() - curr.getDay(); 
            var last = first + 6; 

            var firstday = new Date(curr.setDate(first));
            var lastday = new Date(curr.setDate(last));
           

            var deliveryDate = lastday.getTime(), history = 0, startDate = firstday.getTime()  ;


            var atividadeAprimora = {     "idRotaAgendamento": 0,
                                          "strTitulo": "",
                                          "idAvaliacao": 0,
                                          "intOrdemAgendamento": 0,
                                          "dtmInicio": null,
                                          "dtmFim": null,
                                          "intSituacao": 1,
                                          "bolEncerrou": false,
                                          "strTipo": "",
                                          "strTurma": "",
                                          "idPessoa": "",
                                          "strNomePessoa": "",
                                          "strLogin": "",
                                          "strFoto": "",
                                          "idRota": 0,
                                          "strDtmInicio": "6/7/2018",
                                          "strDtmFim": "6/7/2018",
                                          "idResponsavel": 0,
                                          "base64":"",
                                          "aprimora":true,
                                          "evaluationTypeId":0

            };

            var listaApr = [];

            var container = $('#pagination-demo1');
            
            idUser = localStorage.getItem('idUser');

            var tka = localStorage.getItem('tka');

            var aprLista = [];

            var token = localStorage.getItem('Token');

        //     // function () {
        //       // var result = [];
        //       //   result.push(srtHtml);
        //       // return result;
        //     // }();
            
            var dateToday = new Date();

            $.ajax({
                url: "https://apr.educacional.com.br/API/user/v1/task//listGroup?requestData.deliveryDate="+deliveryDate+"&requestData.history="+history+"&requestData.startDate="+startDate+"",
                async: false,
                cache: false, dataType: "json" ,type:'GET' ,
                contentType: 'application/json; charset=utf-8' ,
                //data: JSON.stringify(queryData)    ,
                headers: {"Token": token},
                
                success: function (retorno){

                         

                        // console.log(  JSON.stringify(retorno)  );

                          $.each(  retorno.Tasks, function(ix, item) {



                            if( item.HomeworkTypeId != 3  && item.Expired == false){


                                var epochStartDate = new Date( item.StartDate ) ;
                                var epochEndDate = new Date ( item.EndDate ) ;

                                var dateStart = epochStartDate.getDate()+'/'+(epochStartDate.getMonth()+1)+'/'+epochStartDate.getFullYear() ;
                                var dateEnd =  epochEndDate.getDate()+'/'+(epochEndDate.getMonth()+1)+'/'+epochEndDate.getFullYear() ;
                                var dateStartTime = epochStartDate.getHours()+':'+(epochStartDate.getMinutes());
                                var dateEndTime = epochEndDate.getHours()+':'+(epochEndDate.getMinutes()); 


                                if(   (   (dateToday.getDate()   ==  epochEndDate.getDate()  ) || ( dateToday.getDate()+1   ==  epochEndDate.getDate() )     )     && ( dateToday.getMonth()+1 ==  epochEndDate.getMonth()+1 ) && (  dateToday.getFullYear() ==  epochEndDate.getFullYear() )          ){

                                    atividadeAprimora.idRotaAgendamento= 0;
                                    atividadeAprimora.strTitulo= item.Message;
                                    atividadeAprimora.idAvaliacao= 0;
                                    atividadeAprimora.intOrdemAgendamento= 0;
                                    atividadeAprimora.dtmInicio= null;
                                    atividadeAprimora.dtmFim= null;
                                    atividadeAprimora.intSituacao= 1;
                                    atividadeAprimora.bolEncerrou= false;
                                    atividadeAprimora.strTipo= "";
                                    atividadeAprimora.strTurma= "";
                                    atividadeAprimora.idPessoa= "";
                                    atividadeAprimora.strNomePessoa= item.TeacherName;
                                    atividadeAprimora.strLogin= "";
                                    atividadeAprimora.strFoto= "";
                                    atividadeAprimora.idRota= 0,
                                    atividadeAprimora.strDtmInicio= dateStart;
                                    atividadeAprimora.strDtmFim= dateEndTime;
                                    atividadeAprimora.idResponsavel= 0 ;
                                    atividadeAprimora.base64= item.Nodes[0].Base64;
                                    atividadeAprimora.evaluationTypeId =item.Nodes[0].EvaluationTypeId;

                                    aprLista.push( 
                                        { "idRotaAgendamento": 0,
                                          "strTitulo": item.Message,
                                          "idAvaliacao": 0,
                                          "intOrdemAgendamento": 0,
                                          "dtmInicio": dateStart,
                                          "dtmFim": dateEndTime,
                                          "intSituacao": 1,
                                          "bolEncerrou": false,
                                          "strTipo": "",
                                          "strTurma": "",
                                          "idPessoa": "",
                                          "strNomePessoa": item.TeacherName,
                                          "strLogin": "",
                                          "strFoto": "",
                                          "idRota": 0,
                                          "strDtmInicio": dateStart,
                                          "strDtmFim": dateEnd,
                                          "idResponsavel": 0,
                                          "base64":item.Nodes[0].Base64,
                                          "aprimora":true,
                                          "evaluationTypeId":item.Nodes[0].EvaluationTypeId,
                                          "disciplineCode":item.DisciplineCode

                                    });
                                }

                            }                            


                        });
                    
                    
                    carregaAtividadesBreve(aprLista,idUser);

                },
                error: function (errorRetorno){

                    // alert('Error no Token');

                }

            });
        
        }
        else{

            console.log('BUgou');
            $('#atividadesDia').hide();

            // $('.atividadesdodia-conteudo').show();
        }
        

    }

    function retornoSeletorAVA(){
        if(seletorCurr==1){
            $('.selecao_personas').find('li[ident=seguidores]').hide();
            $('.selecao_personas').find('li[ident=professores]').hide();
            $('.compartilhamento').find('.todos').find('a:first').text('Minhas turmas ');
        }
    }



     function AbrirAtividade( base ){


       

            // var token =  localStorage.getItem('Token');


            // var strUrl = 'https://aprimoraweb.educacional.com.br/#/main/module/question?data='+encodeURIComponent(token)+'&tk='+encodeURIComponent(token)+'&dat='+encodeURIComponent(base)+'&l=false'+'&ver=4.1.0&acs=&prx=true'+'&usr='+encodeURIComponent(token);


            // window.open(strUrl);

            alert("Aprimoraaa");
        

    }

    function abrirQuestaoEducacional(strUrl){
        

        // window.open(strUrl);
        alert('Educacionaaallll');

    }


    function compare(a,b) {
          if (a.last_nom < b.last_nom)
            return -1;
          if (a.last_nom > b.last_nom)
            return 1;
          return 0;
    }

	if(bolEstaNoMural)
	{
		$.jStorage.deleteKey("timeline" + idUsuarioCriptTL);
	}

    function carregaAtividadesBreve(aprLista,idUser){

        var turmaNome  = '';


        $.ajax({
            url: "/AVA/Barras/Home/ListaAtividadesTipoNovaHomeJson/"+idUser,
            async: true,
            cache: false, dataType: "json", type: 'GET',
            contentType: 'application/json; charset=utf-8',
            success: function (retorno) {
               
                     // turmaNome = retorno.Result[0].strTurma;
                     console.log(JSON.stringify(retorno));

                        $.each(aprLista, function (i, apr) {
                            
                            apr.strFoto = "/userData/ava/repositorio/11337/11337399/Imagens/logo_thumb_apr.jpg";
                            
                            retorno.Result.push(apr);
                        });
                        

                        // retorno.Result.sort(compare);
                

                if(retorno.Result.length > 0){

                    $.each(retorno.Result, function (ix, item) {


                        if( item.bolEncerrou != true  ){

                            if(item.evaluationTypeId == 0){
                                var srtHtml = ' <div onclick="abrirQuestaoEducacional(\'/AVA/Caminhos/Home/Player/'+item.idRotaAgendamento+'/'+item.idRota+'\')"  id="atividadesdodia" class="atividadesdodia-card">  ';  
                            }
                            else{
                                var srtHtml = ' <div onclick="AbrirAtividade(\''+item.base64+'\')"  id="atividadesdodia" class="atividadesdodia-card">  ';  
                            }

                                srtHtml +='<div id="icon-sys" class="icon-sys">'+
                                    '<img src="'+item.strFoto+'" width="55" height="auto" />'+
                                    ' <h3 id="atividadeNome"><strong> <a href="/AVA/Caminhos/Home/Player/'+item.idRotaAgendamento+'/'+item.idRota+'" > '+item.strTitulo+'</strong></a> </h3>  '+ 

                                    '  <div class="atividade-conteudo" id="atividade-conteudo" >'+
                                    '   <a href="/AVA/Perfil/Home/Index/'+item.strLogin+'"><label id="atividadesdodia_professor">Prof:'+item.strNomePessoa+'  </label></a>';
                                    



                                if(item.evaluationTypeId != 0){
                                   srtHtml += '  <a href="https://aprimorasmart.educacional.com.br/#/login"> <label  id="systemNome">#Aprimora</label></a>'+
                                   ' </div>';

                                }
                                else{
                                    srtHtml +=   '<label  id="systemNome">#Tarefa</label>'+
                                    ' </div>';

                                }

                            srtHtml +=                                
                                
                                ' </div>'+
                                ' <div  class="atividade-conteudo-duracao" >'+
                                    '   <h4 id="data_entrega">'+item.strDtmFim+'  </h4>'+
                                    '<label id="atividadesdodia-conteudo-duracao"> '+addZeros(item.dtmFim)+'  </label>'+

                                '</div>'+
                                
                                
                            '</div><hr>';
                            // varSources.push(srtHtml);
                            
                            $('.atividadesdodia-conteudo').append(srtHtml);

                        }
                   
                    });

                    //$.('.atividadesdodia-conteudo').show();



                }
                else{
                    var srtHtml = ' <h1>Não existem atividades para hoje</h1>'

                    $('.atividadesdodia-conteudo').append(srtHtml);


                    

                    



                }


            // var options = {
            //   dataSource: varSources,
            //   callback: function (response, pagination) {  
                
            //     var dataHtml = '<ul>';

            //     $.each(response, function (index, item) {

            //       dataHtml += '<li>' + item + '</li>';
            //     });
            //     dataHtml += '</ul>';

            //     $('#pagination-mural-atividadehoje').prev().html(dataHtml);
            //   }
            // };

           

            // $('#pagination-mural-atividadehoje').paginationatividadehoje(options);



            }
            ,
            error: function (data) {
                // alert(JSON.stringify(data));
            }
        });
    }
	

    function addZeros(date){
        
        var aux = date ;

        var max = date.length;
        
        var pontos = date.indexOf(':');
        var positionInitial = aux.substring(0, pontos);

        
        var positionFinal = date.substring(pontos+1,max);

        

        if (parseInt(positionFinal) < 10  )  {

            date = positionInitial + ":" + "0"+positionFinal
        

        }        





        return date ;
    }

    function preparaAvaSelector(){
        if (!($("#seletorMuralDigaLa").AvaSelector("bolInstanciado"))) {
                
            $("#seletorMuralDigaLa").AvaSelector({
                bolProfessor: <%=Model.bolAluno ? "false" : "true"%>, 
                bolLajota: true,
                bolSeguidores: true,
                bolAluno : true,
                bolAdminCoordDiretor : <%=Model.bolAluno ? "false" : "true"%>,
                bolResponsavel : <%=Model.bolAluno ? "false" : "true"%>,
                botaoConclusao : $("#compartilhar"),
                strTitulo : "Compartilhar com:",
                btnTextoConclusao : "Adicionar",
                btnTextoBotaoConclusaoSeletor : "Adicionar",
                bolEscondeTituloExterno : true,
                bolCoordenador : true,
                insertLajota : function(u, g, seletor){                            
                    validaMensagemRapida(u, g);                            
                },
                strLajotinhaTodos: '<%=strLajotinhaTodos%>'
            });
        }
    }

    $(function(){

        if ("<%=bolmenuAdministracao%>" == "True")
        {
           var este = $(this);
            $.ajax({
                url: "/AVA/Barras/Home/Administracao/",
                async: true,
                contentType: "application/x-www-form-urlencoded; charset=iso-8859-1",
                cache: false,
                success: function (data) {
                    $("#ava_mural_geral").html(data);

                    //Carrega menu administracao
                    $.ajax({
                        url: "/rede/barra_administracao_ava001.asp",
                        async: true,
                        contentType: "application/x-www-form-urlencoded; charset=iso-8859-1",
                        cache: false,
                        success: function (data) {

                            document.getElementById('div_cont_administra').innerHTML = data;
                            $("ul.css-tabs").fpTabs("div.css-panes > div");

                            $("#dadosPerfil ul li").removeClass("current");
                            este.parent().addClass("current");

                            $("#tabs").tabs();
                            $("#accordion").accordion();


                        },
                        error: function (data) {
                            console.debug(data.status);
                        }
                    });

                },
                error: function (data) {
                    console.debug(data.status);
                }
            });
        }

        if ("<%=bolmenuSecretaria%>" == "True")
        {
        /*var este = $(this);
        $.ajax({
            url: "/AVA/Barras/Home/Secretaria/",
            async: true,
            contentType: "application/x-www-form-urlencoded; charset=iso-8859-1",
            cache: false,
            success: function (data) {
                $("#ava_mural_geral").html(data);
                $('.loader').css('display', 'none');
                //Carrega secretaria
                $.ajax({
                    url: "/rede/barra_secretaria_ava001.asp",
                    async: true,
                    contentType: "application/x-www-form-urlencoded; charset=iso-8859-1",
                    cache: false,
                    success: function (data) {
                        document.getElementById('div_cont_secre').innerHTML = data;
                        $("ul.css-tabs").fpTabs("div.css-panes > div");
                        $("#dadosPerfil ul li").removeClass("current");
                        este.parent().addClass("current");

                        $("#tabs").tabs();
                        $("#accordion").accordion();
                    },
                    error: function (data) {
                        console.debug(data.status);
                    }
                });
            },
            error: function (data) {
                alert(data.status);
            }
        });*/
			/*var dadosSecretaria = $.jStorage.get("dadosSecretaria" + idUsuarioPublico);
			if (dadosSecretaria) {
				bloco.empty();
				bloco.html(dadosSecretaria);                    
				$("ul.css-tabs").fpTabs("div.css-panes > div");                 

				$("#dadosPerfil ul li").removeClass("current");
				if($(este) != undefined)
					$(este).parent().addClass("current");

				$("#tabs").tabs();
				$("#accordion").accordion();

			} else {                
				var cacheSecretaria = "";

				bloco.find('.loader').show();
				$.ajax({
					url: "/AVA/Barras/Home/Secretaria/",
					async: true,
					contentType: "application/x-www-form-urlencoded; charset=utf-8",
					cache: false,
					success: function (data) {
						bloco.html(data);

						//Carrega secretaria
						mostraSecretaria($(".bloco_secretaria"));
						bloco.find('.loader').hide();
						bloco.find('#div_cont_secre').empty();
						bloco.find('#div_cont_secre').append(data);
						
						//cacheSecretaria = bloco.html();

						$("ul.css-tabs").fpTabs("div.css-panes > div");
						$("#dadosPerfil ul li").removeClass("current");                                 

						$("#tabs").tabs();
						$("#accordion").accordion();
						
						//$.jStorage.set("dadosSecretaria" + idUsuarioPublico, cacheSecretaria);
						//$.jStorage.setTTL("dadosSecretaria" + idUsuarioPublico, 1800000); // expires in 3 minutos

					},
					error: function (data) {
						alert(data.status);
					}
				});
			//}*/
			//$(".a_secretaria").trigger("click");
			clickBloco('#menu_secretaria', '.bloco_secretaria');
        }
        

        $('.dialogo > .blokletters').on('click', function(){
            if($(this).attr('pos') == 1){
                $('.selecao_personas').find('.todos').find('.p-a-default').click();
                $('.selecao_personas').find('li[ident=seguidores]').hide();
                $('.selecao_personas').find('li[ident=professores]').hide();
                $('.compartilhamento').find('.todos').find('a:first').text('Minhas turmas ');
                seletorCurr=1;
               
            }else{
                $('.selecao_personas').find('.todos').find('.p-a-default').click();
                $('.selecao_personas').find('li[ident=seguidores]').show();
                $('.selecao_personas').find('li[ident=professores]').show();
                $('.compartilhamento').find('.todos').find('a:first').text('Todos ');
                seletorCurr=0;
                $('.troca_persona').text("Selecionar");
            }
        });
           
        
        //mostra elementos de compartilhamento
        $('#txtInput').focus(function () {
                            
            $("#dialogo_acoes").show();
			$("#seletorMuralDigaLa").show();
			preparaAvaSelector();
			
			$('#compartilhar').show();
            $("#btnCancelarFerramentaMural").show();
            $("#btnCancelarFerramentaMural").prop("disabled", false).removeClass("disable");

            var strLinkVideo = "";

            if ($("#txtLinkVideoMensagem").val() != undefined) {
                strLinkVideo = $("#txtLinkVideoMensagem").val();
            }

            if (strLinkVideo.length > 0) {                
                if ($('#container_preview_video').find('iframe').attr('src') != undefined) {
                    if ($('#container_preview_video').find('iframe').attr('src').replace(/\s/g, '') != "") {
                        $('#compartilhar').removeClass('disable').prop("disabled", false);
                    }else {
                        $('#compartilhar').addClass('disable').prop("disabled", true);
                    }   
                }
            } else {
                var bolBlock = false;
                if($(this).val().length <= 0 && objetoImagens !== undefined && objetoImagens != null && objetoImagens.imagens != null && objetoImagens.imagens.length == 0){
                    bolBlock = true;
                } else {
                    bolBlock = false;
                }
                if(bolBlock && $(this).val().length <= 0 && objetoArquivos !== undefined && objetoArquivos != null && objetoArquivos.arquivos != null && objetoArquivos.arquivos.length == 0){
                     bolBlock = true;
                } else {
                    bolBlock = false;
                }
                if(bolBlock){
                    $('#compartilhar').addClass('disable').prop("disabled", true);
                }
            }
        });

        $('#compartilhar').click(function(){
            if(!($(this).hasClass('disable'))){
                //validaMensagemRapida();
            }
        });

    });
    
    //Após ler todo o documento, chama a função abaixo
    $( document ).ready( function(){

        carregaAtividades();    


    });


    $(function (){

         // $('#atVlegenda').on('click', function(){            
         // });

         $('#atvSeta').click( function(){            
         
            if(  $('.atividadesdodia-conteudo').hasClass('ativo')   ){


                // $('.atividadesdodia-conteudo').hide();
                $('.atividadesdodia-conteudo').removeClass('ativo');

                $('.atividadesdodia-conteudo').slideDown();

                $('#atvSeta').removeClass('setaAgendaDown');
                $('#atvSeta').addClass('setaAgendaUp');

            }
            else{

                // $('.atividadesdodia-conteudo').show();
                $('.atividadesdodia-conteudo').addClass('ativo');

                $('.atividadesdodia-conteudo').slideUp();

                $('#atvSeta').removeClass('setaAgendaUp');
                $('#atvSeta').addClass('setaAgendaDown');
                

            }

         });

    });


 






    $(function () {

            

        $('#ava_fluxoarticles').on('click','.vejaMais_MR', see_more);

        /********************************************************************
        * Carrega tip de opções de mensagens rápidas
        ********************************************************************/
        $('.ava_opcoesTimeline').cluetip({ width: '60px', dropShadow: false, sticky: true, ajaxCache: false, arrows: false, positionBy: 'bottomTop', topOffset: 4, showTitle: false });
            
        /********************************************************************
        * Esconde o texto default do Diga-la
        ********************************************************************/
        $('#txtInput').live('focus', function () {
            if ($(this).text() == "Olá! Compartilhe aqui a sua ideia ou link...") {
                $(this).text("");
            }
        }).blur(function () {
            if(navigator.userAgent.toLowerCase().search("android") > -1 || navigator.userAgent.toLowerCase().search("tb07sta") > -1){

            } else {
                if ($(this).text() == "") {
                    $(this).text("Olá! Compartilhe aqui a sua ideia ou link...");
                }
            }

        });
    });

        /********************************************************************
        * Valida o post da mensagem rapida
        ********************************************************************/
        var strMensagemPadrao = "Olá! Compartilhe aqui a sua ideia ou link...";

        $('#txtInput').live('keyup', function () {
            var strMensagem = $(this).val().trim();
            
            var strLinkVideo = "";

            if ($("#txtLinkVideoMensagem").val() != undefined) {
                strLinkVideo = $("#txtLinkVideoMensagem").val();
            }
            
            if (strMensagem == '' || strMensagem == strMensagemPadrao) {
                if (strLinkVideo != "" && strLinkVideo != undefined) {
                    if ($('#container_preview_video').find('iframe').attr('src') != undefined) {
                        if ($('#container_preview_video').find('iframe').attr('src').replace(/\s/g, '') != "") {
                            $('#compartilhar').removeClass('disable').prop("disabled", false);
                            $("#btnCancelarFerramentaMural").prop("disabled", false).removeClass("disable");
                        }else {
                            $('#compartilhar').addClass('disable').prop("disabled", true);
                            $("#btnCancelarFerramentaMural").prop("disabled", true).addClass("disable");
                        }
                    }
                
                } else {
                    
                    var bolBlock = false;
                    if(objetoImagens !== undefined && objetoImagens != null && objetoImagens.imagens != null && objetoImagens.imagens.length == 0){
                        bolBlock = true;
                    } else {
                        bolBlock = false;
                    }
                    if(bolBlock && objetoArquivos !== undefined && objetoArquivos != null && objetoArquivos.arquivos != null && objetoArquivos.arquivos.length == 0){
                         bolBlock = true;
                    } else {
                        bolBlock = false;
                    }
                    if(bolBlock){
                        $('#compartilhar').addClass('disable').prop("disabled", true);
                    }
                    
                }
            } else {
               $("#btnCancelarFerramentaMural").prop("disabled", false).removeClass("disable");
               if (timeout == undefined || timeout != null) {
                    if (strLinkVideo != "" && strLinkVideo != undefined) {
                        if ($('#container_preview_video').find('iframe').attr('src') != undefined) {
                            if ($('#container_preview_video').find('iframe').attr('src').replace(/\s/g, '') != "") {
                            $('#compartilhar').removeClass('disable').prop("disabled", false);
                            }else {
                                $('#compartilhar').addClass('disable').prop("disabled", true);
                            }
                        }
                    } else {
                        $('#compartilhar').removeClass('disable').prop("disabled", false);
                    }
                }
            }

        });



        function validaMensagemRapidaDigala(usuario, grupo) {
            var inputSelected = $('#txtInput').val().trim();

            var strLinkVideo = "";

            if ($('#container_preview_video').find('iframe').attr('src') != undefined && $('#container_preview_video').find('iframe').attr('src') != "") {
                strLinkVideo = removerListUrlYoutube($("#urlVideoOriginal").val());            
            }
            
            if((inputSelected != strMensagemPadrao && inputSelected != "") || (strLinkVideo != undefined && strLinkVideo != "") || (objetoImagens !== undefined && objetoImagens != null && objetoImagens.imagens.length > 0) || (objetoArquivos !== undefined && objetoArquivos != null && objetoArquivos.arquivos.length > 0)){
                
                if (inputSelected == strMensagemPadrao) {
                    inputSelected = "";
                }

                inputSelected = inputSelected.replace(/\r?\n|\r/g, "<br>"); 
                
                $.jStorage.deleteKey("timeline" + idUsuarioCriptTL);
                //$.jStorage.deleteKey("timelineFiltro" + idUsuarioCript);
                //Não deleta o cache de filtro por que está tratando o post e tarefa rapida.
                console.log("/AVA/Mural/Home/SaveMensagemNovaHome ==== ");
               
                $.ajax({
                    url: '/AVA/Mural/Home/SaveMensagemNovaHome',
                    type: 'POST',
                    contentType: "application/x-www-form-urlencoded; charset=UTF-8",
                    data: { 
                        "usuario" : JSON.stringify(usuario),
                        "grupo" : JSON.stringify(grupo),
                        "mensagem" : inputSelected,
                        "video" : strLinkVideo,
                        "imagens" : JSON.stringify(objetoImagens.imagens),
                        "arquivos" : JSON.stringify(objetoArquivos.arquivos)
                    },
                    success: function (data) {
                        <%="var bolEducador = " + ((Model.bolEducador) ? "true" : "false") + ";"%>
                        var timelineFiltroValueH = $('#hTipoDePostMural').val();

                        $('#txtInput').val('');
                        $("#seletorMuralDigaLa").AvaSelector("limparUsuarios");
                        $("#seletorMuralDigaLa").hide();
                        $('.sep_digala').hide();
                        $('#compartilhar').hide();
                        $('#compartilhar').addClass('disable').prop("disabled", true);

                        //Diminuir tamanho do text area após envio de msg concluída
                        $('#txtInput').css("height","48px");
                        $('#txtInput').siblings(":last").html('');

                        //remove o vídeo
                        $("#container_preview_video").fadeOut('slow', function () {
                            
                            //correção do bug do vimeo no IE
                            $(this).find("iframe").attr('src', '');
                            setTimeout(function () {
                                $(this).find("iframe").remove();
                                $(this).html("");
                            }, 500);
                            
                            $('.enviar_video').hide();

                            $("#txtLinkVideoMensagem").val("");
                        });
                        $("#btnCancelarFerramentaMural").prop("disabled", true).addClass("disable");
                        $("#btnCancelarFerramentaMural").hide();
                        $(".mensagem_multimidia").show();
                        if ($(".dialogo .dialogo_box .preview_post.imagens").is(":visible")){
                            $(".dialogo .dialogo_box .preview_post.imagens").hide();
                        }
                        if ($(".dialogo .dialogo_box .preview_post.arquivos").is(":visible")){
                            $(".dialogo .dialogo_box .preview_post.arquivos").hide();
                        }
                        //Limpa preview de imagem

                        limpaPreviewImagemMensagemRapida();
                        limpaArrayImagensTimeLine();
                        limpaPreviewArquivosMensagemRapida();
                        limpaArrayArquivosTimeLine();
                        
                        limpaPreviewImagemVideoArquivosDigaLa();
                        
                        if((bolEducador && (timelineFiltroValueH == 0 || timelineFiltroValueH == 1 || timelineFiltroValueH == 4)) 
                            || (!bolEducador && timelineFiltroValueH == 0)) {                       
    
                            $('#ava_fluxoarticles').prepend(data).find('article:first')<%if (Model.bolEducador){%>.addClass('highlight')<%} %>.slideDown(1000);
                            $("#ava_fluxoarticles article:first p.post_texto:first").expander({
                                slicePoint: 500,
                                window: 2,
                                expandText: ' leia mais',
                                expandPrefix: '...',
                                userCollapseText: 'menos',
                                preserveWords: true,
                                expandEffect: 'fadeIn',
                                collapseEffect: 'fadeOut'
                            });
                            $('.compartilhado:first').booleTip(booleTipOptions);

                            $("#ava_fluxoarticles article:first .iframeVideoVimeo").on('load', function () {
                                var playerVimeo = $f(this);
                                var playerVimeoStarted = false;                                
                                playerVimeo.api('pause');
                                playerVimeo.addEvent('ready', function () {                                    
                                    playerVimeo.addEvent('play', function () {
                                        if (!playerVimeoStarted) {
                                            playerVimeoStarted = true;
                                            playerVimeo.api('pause');                                            
                                        }
                                    });
                                });
                            });
                        
                            $("#ava_fluxoarticles").find("article:first").find('.thumbs_mural').each(function () {
                                var $este = $(this);
                                var totalImg = 0;
                                var todosCarregados = 0;
                                $(this).find('a').each(function(e){
                                    if($(this).css("display") != "none"){
                                        totalImg++;
                                        $(this).find("img").one("load", function(){
                                            todosCarregados++;
                                            //var menorAltura = $(this).find('img:first').height();
                                            var maiorAltura = $(this).height();

                                            if(todosCarregados == totalImg){

                                                $este.find('img:visible').each(function (i) {

                                                    var img = $(this);

                                                    var alturaCorrente = img.height();

                                                    if (alturaCorrente > maiorAltura) {
                                                        maiorAltura = alturaCorrente;
                                                    }

                                                    if (i == (totalImg - 1)) {
                                                        $este.closest('div').css('height', maiorAltura);
                                                        $este.find("img").css({"height": maiorAltura, "width" : 217});
                                                    }

                                                });
                                            }
                                
                                        }).each(function(){
                                            if(this.complete) 
                                                $(this).load();
                                        });
                                    }
                                });
            
                            });                        
                        
                            $("#ava_fluxoarticles").find("article:first").find(".imagens_mural").GaleriaAva();
                            $('#ava_fluxoarticles article:first .conteudo_post p.post_texto a').addClass('post_link');
                            $('#ava_fluxoarticles article:first .conteudo_post .banner_mural').next('.post_texto').find('a').removeClass('post_link');
                        } else {
                            //Recarrega mural
                            $('#hTipoDePostMural').val(0);
                            $('#ava_fluxoarticles').html('');
                            $('#cbTipoDePostMural input[type=checkbox]').removeAttr("checked");
                            $('#cbTipoDePostMural li[filtrotipo=0] input[type=checkbox]').attr("checked", "checked");     
                            var txtTextoMural = 'Todos os posts <span class="caret">';
                            $('#txtTipoDePostMural').html(txtTextoMural);                       
                            $('#loader_timeline').fadeIn("fast", function () {
                                carregaTimeLine(1);
                            });
                        }
                        bloqueiaOutrosDigaLa();
                    },
                    error: function (data) {
                        if(data.status != 0){
                            console.debug("Ocorreu um erro no banco de dados.");
                        }
                        $('#compartilhar').removeClass('disable').prop("disabled", true);
                        bloqueiaOutrosDigaLa();
                    }
                }); 
                $('#compartilhar').addClass('disable').prop("disabled", true);
            } else {
                return false;
            }
        }


        function SalvarMensagemRapidaNew(usuario){
            var idTurmas = [];
            for(var i=0; i < usuario.length; i++ ){
                if(usuario[i].isTurma != undefined && usuario[i].isTurma ){
                    idTurmas.push(usuario[i].idTurma);
                }
            }

            var inputSelectedNew = $('#txtInput').val().trim();

            if(idTurmas.length > 0){
                console.log("1");
                //::: chamar o publicar em turmas
                if((inputSelectedNew != strMensagemPadrao && inputSelectedNew != "") || (strLinkVideo != undefined && strLinkVideo != "") || (objetoImagens !== undefined && objetoImagens != null && objetoImagens.imagens.length > 0) || (objetoArquivos !== undefined && objetoArquivos != null && objetoArquivos.arquivos.length > 0)){
                    if (inputSelectedNew == strMensagemPadrao) {
                        inputSelectedNew = "";
                    }
                }

                var strLinkVideo = "";
                console.log("===== 2.1");
                    /*if ($('#container_preview_video').find('iframe').attr('src') != undefined && $('#container_preview_video').find('iframe').attr('src') != "") {
                        console.log("entrou no if 1222");
                        console.log($("#urlVideoOriginal").html());
                        strLinkVideo = removerListUrlYoutube($("#urlVideoOriginal").val()); 
                        console.log("saiu no if 1222");         
                    }
                    //inputSelected = inputSelected.replace(/\r?\n|\r/g, "<br>"); 
                    console.log("3 inputSelected" + inputSelected);
                    */
                for(var i=0; i < idTurmas.length; i++){
                    var idGrupo = idTurmas[i];
                    console.log("grupo idTurmas[i] = " + idGrupo);                
                    $.ajax({
                            type: "POST",
                            url: "/AVA/Turma/Home/SalvarMensagemRapidaNew",
                            data: {
                                strTexto: inputSelectedNew,                        
                                idAssunto: 0,//$("#hAssuntoPost").val(),
                                strLinkVideo: "",//strLinkVideo,
                                imagens: JSON.stringify(objetoImagens.imagens),
                                arquivos: JSON.stringify(objetoArquivos.arquivos),                        
                                idGrupo: idGrupo,
                                idMateria: 0,
                                idFerramentaTipo: 1
                            },
                            async: !0,
                            success: function (o) {
                            console.log("publicação na turma realizada com sucesso.");
                            },
                            error: function () {
                                console.log("erro ao realizar a publicação na turma.");
                        }
                    })
                }
            }            
        }

        function validaMensagemRapida(usuario, grupo) {
            var urlPagina = document.location.href.toLowerCase();
            var indexOfUrl = urlPagina.indexOf('/ava/mural');
            var idTurmas = [];

            if (indexOfUrl > 0) {
                validaMensagemRapidaDigala(usuario, grupo);
                //::: incluir a chamada ao metodo que publica na turma 
                //SalvarMensagemRapidaNew         
                //SalvarMensagemRapidaNew(usuario);   
            }
            else {
                console.log(" else ");
                //Identificar se está no tablet ou no Computador
                var inputSelected = "";
                /*if(navigator.userAgent.toLowerCase().search("android") > -1 || navigator.userAgent.toLowerCase().search("tb07sta") > -1){
                    inputSelected = $("#txtInput").next().html();
                } else {
                 */   
                inputSelected = $('#txtInput').val().trim();
                //}

                var strLinkVideo = "";

                if ($('#container_preview_video').find('iframe').attr('src') != undefined && $('#container_preview_video').find('iframe').attr('src') != "") {
                    //strLinkVideo = $('#container_preview_video').find('iframe').attr('src').replace("//", "");
                    strLinkVideo = removerListUrlYoutube($("#urlVideoOriginal").val());            
                }
            
                if((inputSelected != strMensagemPadrao && inputSelected != "") || (strLinkVideo != undefined && strLinkVideo != "") || (objetoImagens !== undefined && objetoImagens != null && objetoImagens.imagens.length > 0) || (objetoArquivos !== undefined && objetoArquivos != null && objetoArquivos.arquivos.length > 0)){
                
                    if (inputSelected == strMensagemPadrao) {
                        inputSelected = "";
                    }

                    inputSelected = inputSelected.replace(/\r?\n|\r/g, "<br>"); 
                
                    $.jStorage.deleteKey("timeline" + idUsuarioCriptTL);
                    //$.jStorage.deleteKey("timelineFiltro" + idUsuarioCript);
                    //Não deleta o cache de filtro por que está tratando o post e tarefa rapida.
               
                    $.ajax({
                        url: '/AVA/Mural/Home/SaveMensagem',
                        type: 'POST',
                        contentType: "application/x-www-form-urlencoded; charset=UTF-8",
                        data: { 
                            "usuario" : JSON.stringify(usuarios),
                            "grupo" : JSON.stringify(grupo),
                            "mensagem" : inputSelected,
                            "video" : strLinkVideo,
                            "imagens" : JSON.stringify(objetoImagens.imagens),
                            "arquivos" : JSON.stringify(objetoArquivos.arquivos)
                        },
                        success: function (data) {
                            <%="var bolEducador = " + ((Model.bolEducador) ? "true" : "false") + ";"%>
                            var timelineFiltroValueH = $('#hTipoDePostMural').val();

                            $('#txtInput').val('');
                            $("#seletorMuralDigaLa").AvaSelector("limparUsuarios");
                            $("#seletorMuralDigaLa").hide();
                            $('.sep_digala').hide();
                            $('#compartilhar').hide();
                            $('#compartilhar').addClass('disable').prop("disabled", true);

                            //Diminuir tamanho do text area após envio de msg concluída
                            $('#txtInput').css("height","48px");
                            $('#txtInput').siblings(":last").html('');

                            //remove o vídeo
                            $("#container_preview_video").fadeOut('slow', function () {
                            
                                //correção do bug do vimeo no IE
                                $(this).find("iframe").attr('src', '');
                                setTimeout(function () {
                                    $(this).find("iframe").remove();
                                    $(this).html("");
                                }, 500);
                            
                                $('.enviar_video').hide();

                                $("#txtLinkVideoMensagem").val("");
                            });
                            $("#btnCancelarFerramentaMural").prop("disabled", true).addClass("disable");
                            $("#btnCancelarFerramentaMural").hide();
                            $(".mensagem_multimidia").show();
                            if ($(".dialogo .dialogo_box .preview_post.imagens").is(":visible")){
                                $(".dialogo .dialogo_box .preview_post.imagens").hide();
                            }
                            if ($(".dialogo .dialogo_box .preview_post.arquivos").is(":visible")){
                                $(".dialogo .dialogo_box .preview_post.arquivos").hide();
                            }
                            //Limpa preview de imagem

                            limpaPreviewImagemMensagemRapida();
                            limpaArrayImagensTimeLine();
                            limpaPreviewArquivosMensagemRapida();
                            limpaArrayArquivosTimeLine();
                        
                            if((bolEducador && (timelineFiltroValueH == 0 || timelineFiltroValueH == 1 || timelineFiltroValueH == 4)) 
                                || (!bolEducador && timelineFiltroValueH == 0)) {                       
    
                                $('#ava_fluxoarticles').prepend(data).find('article:first')<%if (Model.bolEducador){%>.addClass('highlight')<%} %>.slideDown(1000);
                                $("#ava_fluxoarticles article:first p.post_texto:first").expander({
                                    slicePoint: 500,
                                    window: 2,
                                    expandText: ' Leia mais',
                                    expandPrefix: '...',
                                    userCollapseText: 'Mostrar menos',
                                    preserveWords: true,
                                    expandEffect: 'fadeIn',
                                    collapseEffect: 'fadeOut',
                                    moreClass: 'leia_mais',
                                    lessClass: 'continua_post'
                                });
                                $('.compartilhado:first').booleTip(booleTipOptions);

                                $("#ava_fluxoarticles article:first .iframeVideoVimeo").on('load', function () {
                                    var playerVimeo = $f(this);
                                    var playerVimeoStarted = false;                                
                                    playerVimeo.api('pause');
                                    playerVimeo.addEvent('ready', function () {                                    
                                        playerVimeo.addEvent('play', function () {
                                            if (!playerVimeoStarted) {
                                                playerVimeoStarted = true;
                                                playerVimeo.api('pause');                                            
                                            }
                                        });
                                    });
                                });
                        
                                $("#ava_fluxoarticles").find("article:first").find('.thumbs_mural').each(function () {
                                    var $este = $(this);
                                    var totalImg = 0;
                                    var todosCarregados = 0;
                                    $(this).find('a').each(function(e){
                                        if($(this).css("display") != "none"){
                                            totalImg++;
                                            $(this).find("img").one("load", function(){
                                                todosCarregados++;
                                                //var menorAltura = $(this).find('img:first').height();
                                                var maiorAltura = $(this).height();

                                                if(todosCarregados == totalImg){

                                                    $este.find('img:visible').each(function (i) {

                                                        var img = $(this);

                                                        var alturaCorrente = img.height();

                                                        if (alturaCorrente > maiorAltura) {
                                                            maiorAltura = alturaCorrente;
                                                        }

                                                        if (i == (totalImg - 1)) {
                                                            $este.closest('div').css('height', maiorAltura);
                                                            $este.find("img").css({"height": maiorAltura, "width" : 217});
                                                        }

                                                    });
                                                }
                                
                                            }).each(function(){
                                                if(this.complete) 
                                                    $(this).load();
                                            });
                                        }
                                    });
            
                                });                        
                        
                                $("#ava_fluxoarticles").find("article:first").find(".imagens_mural").GaleriaAva();                            
                            } else {
                                //Recarrega mural
                                $('#hTipoDePostMural').val(0);
                                $('#ava_fluxoarticles').html('');
                                $('#cbTipoDePostMural input[type=checkbox]').removeAttr("checked");
                                $('#cbTipoDePostMural li[filtrotipo=0] input[type=checkbox]').attr("checked", "checked");     
                                var txtTextoMural = 'Todos os posts <span class="caret">';
                                $('#txtTipoDePostMural').html(txtTextoMural);                       
                                $('#loader_timeline').fadeIn("fast", function () {
                                    carregaTimeLine(1);
                                });
                            }
                        },
                        error: function (data) {
                            if(data.status != 0){
                                console.debug("Ocorreu um erro no banco de dados.");
                            }
                            $('#compartilhar').removeClass('disable').prop("disabled", true);
                        }
                    }); 
                    $('#compartilhar').addClass('disable').prop("disabled", true);
               } else {
                    return false;
               }
           }
        }

        function mycarousel_initCallback(carousel)
	    {
		    // Disable autoscrolling if the user clicks the prev or next button.
		    carousel.buttonNext.bind('click', function() {
			    carousel.startAuto(0);
		    });

		    carousel.buttonPrev.bind('click', function() {
			    carousel.startAuto(0);
		    });

		    // Pause autoscrolling if the user moves with the cursor over the clip.
		    carousel.clip.hover(function() {
			    carousel.stopAuto();
		    }, function() {
			    carousel.startAuto();
		    });
	    };

        var bolAlunoNovo = '<%=Session["bolAlunoNovo"]%>'.toLowerCase();
        
        //TIMELINE               
        if (idUsuarioCriptTL != 0) {
            try {
                var timelineValue = $.jStorage.get("timeline" + idUsuarioCriptTL);
            } catch (err) {
                var timelineValue = '';
            }

            if (!timelineValue) {
                carregaTimeLine(1);                
            }else{       
                window.setTimeout(executaCarregamentoTL, 500);
            }   
        }else{
            carregaTimeLine(0);
        }
        
        //Tratando filtro mural quando recarrega a pagina
        $(document).ready(function(){
            var timelineFiltroValue = $.jStorage.get("timelineFiltro" + idUsuarioCriptTL);
            var timelineFiltroValueH = $('#hTipoDePostMural').val();
            
            if(timelineFiltroValue)
            {
                timelineFiltroValueH = timelineFiltroValue;
                $('#hTipoDePostMural').val(timelineFiltroValueH);
            }else{
                $('#cbTipoDePostMural input[type=checkbox]').removeAttr("checked");
                $('#cbTipoDePostMural li[filtrotipo=0] input[type=checkbox]').attr("checked", "checked");
                $('#hTipoDePostMural').val(0);
            }

            if(timelineFiltroValueH > 0)
            {
                $('#cbTipoDePostMural input[type=checkbox]').removeAttr("checked");
                var liFiltroSelecionadoSeletor = '#cbTipoDePostMural li[filtrotipo=' + ($('#hTipoDePostMural').val()) + ']';
                $('input[type=checkbox]', liFiltroSelecionadoSeletor).attr("checked", "checked");
                var txtTextoMural = $.trim($(liFiltroSelecionadoSeletor).text()) + '<span class="caret">';
                $('#txtTipoDePostMural').html(txtTextoMural);
            }
        });
        //Fim tratamento cache filtro mural                



function setSessionSecre() {

     $.ajax({
        url: "/AVA/Mural/Home/SetSessionSecretaria",
        async: true,
        contentType: "application/x-www-form-urlencoded; charset=iso-8859-1",
        cache: false,
        success: function (data) {

        },
        error: function (data) {
            console.debug(data.status);
        }
     });

}
        
var intInicioMsgPublica = 2;
function see_more(e) {
    _this = $(this);
    _this.removeAttr('href');
        $('#ava_fluxoarticles').off('click','.vejaMais_MR', see_more);
                
    e.preventDefault();
    //busca o id do hidden no final da view
    var id = $('#id').val();

    //carrega o loader
    $('.vejaMais_MR').html("<img src='/AVA/StaticContent/Common/img/geral/ajax-loader.gif' border='0' />");

    //Verifica se está filtrando
    var strTipoFiltro = $('#hTipoDePostMural').val();
    if(strTipoFiltro > 0)
        strTipoFiltro = '&tipoFiltro=' + strTipoFiltro;
    else
        strTipoFiltro = '';

    //posta a requisicao
    $.post("/AVA/Mural/Home/TimeLinePrivado?id=" + id + "&intInicio=" + intInicioMsgPublica + strTipoFiltro, function (data) {

        var $resultadoTimeline = null;

        $('#ava_fluxoarticles').on('click','.vejaMais_MR', see_more);
        _this.parent().remove();
        //sem nao tem msgs
        if (data.indexOf('semMsgsRapidas') > -1) {
            $('#ava_footervejamais').hide();
        }
        //se tem menos de 10 na requisicao
        else if (data.indexOf('poucasMsgsRapidas') > 0) {
            var _intPos = data.indexOf('poucasMsgsRapidas');
            var _append = data.substring(0, _intPos);
            $resultadoTimeline = $(_append);

            $('#ava_fluxoarticles').append($resultadoTimeline);
            $('#ava_footervejamais').hide();            
        }
        //se retorno as 10
        else {
            $resultadoTimeline = $(data);
            $('#ava_fluxoarticles').append($resultadoTimeline);
            intInicioMsgPublica += 1;
            $('.vejaMais_MR').html("Veja mais");            
        }
        $('.thumbs_mural').each(function () {
            var $este = $(this);
            var totalImg = 0;
            var todosCarregados = 0;
            $(this).find('a').each(function(e){
                if($(this).css("display") != "none"){
                    totalImg++;
                    $(this).find("img").one("load", function(){
                        todosCarregados++;
                        
                        var maiorAltura = $(this).height();

                        if(todosCarregados == totalImg){

                            $este.find('img:visible').each(function (i) {

                                var img = $(this);

                                var alturaCorrente = img.height();

                                if (alturaCorrente > maiorAltura) {
                                    maiorAltura = alturaCorrente;
                                }

                                if (i == (totalImg - 1)) {
                                    $este.closest('div').css('height', maiorAltura);
                                    $este.find("img").css({"height": maiorAltura, "width" : 217});
                                }

                            });
                        }
                                
                    }).each(function(){
                        if(this.complete) 
                            $(this).load();
                    });
                }
            });
            
        });
        if($resultadoTimeline != null)
        {
            $('.banner_mural img', $resultadoTimeline).one('load', function () {
                var tamanhoBanner = $(this).width();                
                if (tamanhoBanner > 300) {                    
                    $(this).parent().parent().width('100%');
                }                    
            });
            $('.compartilhado', $resultadoTimeline).booleTip(booleTipOptions);
        }
        $(".imagens_mural").GaleriaAva();

    });

    //remove o foco do veja mais
    $(this).blur();
}

var ajaxCarregaTimeLine = null;

function carregaTimeLine(storage){
    
    intInicioMsgPublica = 2;
    var strTipoFiltro = $('#hTipoDePostMural').val();
    if(!(strTipoFiltro > 0))
        strTipoFiltro = 0;

    if(ajaxCarregaTimeLine != null)
    {
        ajaxCarregaTimeLine.abort(); 
        $('#ava_fluxoarticles .container_error').remove();
        $('#loader_timeline').show();           
    }

    ajaxCarregaTimeLine = $.ajax({
        url: "/AVA/Mural/Home/TimeLineNovaHome",       
        async: true,
        data: { tipoFiltro:strTipoFiltro },
        success: function (data) { 


            $('#loader_timeline').hide();

            var $resultadoTimeline = $(data);



            $('#ava_fluxoarticles').hide().html('').append($resultadoTimeline).fadeIn("fast", function(){
                
                 $('.thumbs_mural').each(function () {
                    var $este = $(this);
                    var totalImg = 0;
                    var todosCarregados = 0;
                    $(this).find('a').each(function(e){
                        if($(this).css("display") != "none"){
                            totalImg++;
                            $(this).find("img").one("load", function(){
                                todosCarregados++;
                                //var menorAltura = $(this).find('img:first').height();
                                var maiorAltura = $(this).height();

                                if(todosCarregados == totalImg){

                                    $este.find('img:visible').each(function (i) {

                                        var img = $(this);

                                        var alturaCorrente = img.height();

                                        if (alturaCorrente > maiorAltura) {
                                            maiorAltura = alturaCorrente;
                                        }

                                        if (i == (totalImg - 1)) {
                                            $este.closest('div').css('height', maiorAltura);
                                            $este.find("img").css({"height": maiorAltura, "width" : 217});
                                        }

                                    });
                                }
                                
                            }).each(function(){
                                if(this.complete) 
                                    $(this).load();
                            });
                        }
                    });
            
                });
            });
            $('#loader_dialogo').remove();
            $('#txtInput').css('display','block');
            $('.banner_mural img', $resultadoTimeline).one('load', function () {
                var tamanhoBanner = $(this).width();                
                if (tamanhoBanner > 300) {                    
                    $(this).parent().parent().width('100%');
                }                    
            });

            $('.compartilhado', $resultadoTimeline).booleTip(booleTipOptions);

            $('#ava_fluxoarticles article .conteudo_post p.post_texto a').addClass('post_link');
            $('#ava_fluxoarticles article .conteudo_post .banner_mural').next('.post_texto').find('a').removeClass('post_link');
            
            if(storage == 1){
                try {
                    $.jStorage.set("timeline" + idUsuarioCriptTL, data);
                    $.jStorage.setTTL("timeline" + idUsuarioCriptTL, 180000); // expires in 3 minutos
                    $.jStorage.set("timelineFiltro" + idUsuarioCriptTL, strTipoFiltro);
                    $.jStorage.setTTL("timelineFiltro" + idUsuarioCriptTL, 180000); // expires in 3 minutos
                } catch (err) {
                }
            }

            $(".imagens_mural").GaleriaAva();

        },
        error: function (dataError) {

            if(dataError.statusText != 'abort'){
                
                $htmlErro = '<div class="container_error clearfix" style="padding: 15px;">';
                $htmlErro += '<h1 class="blokletters">Ops!</h1>';
                $htmlErro += '<h3>Aconteceu um erro inesperado. Por favor tente novamente em alguns instantes.</h3>';
                $htmlErro += '</div>';

                $Erro = "Aconteceu um erro inesperado. Por favor tente novamente em alguns instantes."

                $('#loader_timeline').hide();
                $('#ava_fluxoarticles').hide().append($htmlErro).fadeIn();

                $('#loader_dialogo').remove();
                $('#txtInput').html($Erro);
                $('#txtInput').css('font-weight','bold');
                $('#txtInput').css('display','block');
                 
                $('#txtInput').focus(function () {
                    $('.compartilhamento').hide();
                    $('#compartilhar').hide();
                });

            }
        }
    });
    

}

function executaCarregamentoTL(){
    $('#loader_timeline').hide();  
    
    var $resultadoTimeline = $(timelineValue)
      
    $('#ava_fluxoarticles').hide().append($resultadoTimeline).fadeIn("fast", function(){
         $('.thumbs_mural').each(function () {
            var $este = $(this);
            var totalImg = 0;
            var todosCarregados = 0;
            $(this).find('a').each(function(e){
                if($(this).css("display") != "none"){
                    totalImg++;
                    $(this).find("img").one("load", function(){
                        todosCarregados++;
                        
                        var maiorAltura = $(this).height();

                        if(todosCarregados == totalImg){

                            $este.find('img:visible').each(function (i) {

                                var img = $(this);

                                var alturaCorrente = img.height();

                                if (alturaCorrente > maiorAltura) {
                                    maiorAltura = alturaCorrente;
                                }

                                if (i == (totalImg - 1)) {
                                    $este.closest('div').css('height', maiorAltura);
                                    $este.find("img").css({"height": maiorAltura, "width" : 217});
                                }

                            });
                        }
                                
                    }).each(function(){
                        if(this.complete) 
                            $(this).load();
                    });
                }
            });
            
        });
    });    
    $('.banner_mural img', $resultadoTimeline).one('load', function () {
        var tamanhoBanner = $(this).width();                
        if (tamanhoBanner > 300) {                    
            $(this).parent().parent().width('100%');
        }                    
    });
    $('.compartilhado', $resultadoTimeline).booleTip(booleTipOptions);
    $('#loader_dialogo').remove();
    $('#txtInput').css('display','block');
    $(".imagens_mural").GaleriaAva();
                   
}

    </script>
</asp:Content>

<asp:Content ContentPlaceHolderID="ContentAreaAdvertencias" ID="ContentAreaAdvertencias" runat="server">
<!-- Comentando para visualizar as advertencias, esse código já está funcional -->
<%
        bool bolAcessoEscreverBloqueado = false;
        bool bolUsuarioSemTurma = Convert.ToBoolean(Session["bolUsuarioSemTurma"]);

        if (Model.segmentacaoBloqueio != null)
        {
            bolAcessoEscreverBloqueado = Model.segmentacaoBloqueio.bolBloqueado;
        }

        if (bolUsuarioSemTurma)
        {
            %>
            <section class="bloco_aviso_aluno bloco bl_1 sem_turma">
               <div class="aviso_conteudo">
                  <h3>O ano está começando!</h3>
                  <p>O seu cadastro está sendo realizado e, quando for concluído, a sua rede social voltará ao normal.</p>
                  <p>Aguarde!</p>
               </div>
            </section>
            <%    
        }
        else if (bolAcessoEscreverBloqueado)
        {
            %>
            <section class="bloco_aviso_aluno bloco bl_1 bloqueio_ferias">
               <div class="aviso_conteudo">
                  <h3>Férias! Aproveite para descansar.</h3>
                  <p><%=Model.segmentacaoBloqueio.strTexto%></p>
               </div>
            </section>
            <%
        }
        else if (Model.bolSuspenso)
        {
            DateTime dataIni = Convert.ToDateTime(Model.dtmInicioSuspensao);
            DateTime dataFim = Convert.ToDateTime(Model.dtmFimSuspensao);
            string format = "dd/MM/yyyy"; 
        %>
        <section class="bloco_aviso_aluno bloco bl_1">

			<p>
                Você está impedido de enviar mensagens de 
                <b><%:dataIni.ToString(format) %></b> até <b><%:dataFim.ToString(format)%></b>
			</p>
			<p class="motivo">
				Motivo:
                <%
                if (Model.strJustificativaSuspenso == "")
                {
                %>
                        Não declarado.
                <%
                }
                else
                {
                %>
                    <%:Model.strJustificativaSuspenso%>
                <%
                }
                %>
			</p>

			<p>Administrador(a): <%:Model.strNomeAdmin %></p>
		</section>
        <%
        }
    %>
</asp:Content>

<asp:Content ContentPlaceHolderID="ContentArea" ID="ContentArea" runat="server">
            
            <%
                if (Model.bolAcessoEscrever && !(Model.bolSuspenso) && Model.intComunicacaoPermissao == 1 && (Model.segmentacaoBloqueio == null || !Model.segmentacaoBloqueio.bolBloqueado))
            {
                Html.RenderPartial("Partials/MensagemRapidaNovaHome", Model, new ViewDataDictionary { { "idAlbum", ViewData["idAlbum"] }, { "idArquivoMultimidia", ViewData["idArquivoMultimidia"] }, { "bolConfigImagem", ViewData["bolConfigImagem"] }, { "bolConfigVideo", ViewData["bolConfigVideo"] }, { "bolConfigFile", ViewData["bolConfigFile"] } });
            }
            %> 
</asp:Content>

<asp:Content ContentPlaceHolderID="ContentAreaTimeline" ID="ContentTimeline" runat="server">

    <%
        bool bolCPPuro = Convert.ToBoolean(ViewData["bolCPPuro"]);
        int y1 = Convert.ToInt32( ViewData["y1"] );

    %>
            		
    <section class="mural ajx" >
    <!-- BOX DE ATIVIDADES DO DIA -->
        <div id="atividadesDia" class="bloco post bl_1">
                <header>

                    <div id="ico_atividadeDia">
                        

                    </div> Atividades que encerram em breve
                    <div id="atvSeta" class="fontello setaAgendaUp"></div>
                </header>
        
        <section>
            <div class="atividadesdodia-conteudo">

            </div>

         <!--    <div class="data-container-atividadehoje"></div>
            <div id="pagination-mural-atividadehoje"></div> -->
                                       
        </section> 
               
        </div>

    <!-- FINAL BOX ATIVIDAE DO DIA -->


        <header class="mural_header">                    
            <!-- <h2 class="title">Mural</h2> -->
            <hr class="linhaMural">

            <input type="hidden" value="0" id="hTipoDePostMural" />
            <div class="bootstrap filtros">
                <div class="btn-group">
                    <a href="javascript: void(0);" data-toggle="dropdown" class="btn btn-small dropdown-toggle whiteButton" id="txtTipoDePostMural"> 
                        <span class="FontAwesome"></span>Todos os posts<span class="caret"></span>
                    </a>
                    <ul class="dropdown-menu" id="cbTipoDePostMural">
                        <li filtrotipo="0" onClick="filtraTimeline(this); return false;">
                            <input type="checkbox" id="ckfiltroTipo0" checked="checked">
                            <label for="ckfiltroTipo0">Todos os posts</label>
                        </li>
                        <li class="divider"></li>
                        <li filtrotipo="1" onClick="filtraTimeline(this); return false;">
                            <input type="checkbox" id="ckfiltroTipo1">
                            <label for="ckfiltroTipo1">Posts de professores</label>
                        </li>
                        <%
                            if (!bolCPPuro)
                            {
                        %>
                        <li filtrotipo="2" class="sub_item_filtro" onClick="filtraTimeline(this); return false;">
                            <input type="checkbox" id="ckfiltroTipo2">
                            <label for="ckfiltroTipo2">Atividades</label>
                        </li>
                        <li filtrotipo="3" class="sub_item_filtro" onClick="filtraTimeline(this); return false;">
                            <input type="checkbox" id="ckfiltroTipo3">
                            <label for="ckfiltroTipo3">Blogs</label>
                        </li>
                        <%
                            }
                        %>
                        <li filtrotipo="4" class="sub_item_filtro" onClick="filtraTimeline(this); return false;">
                            <input type="checkbox" id="ckfiltroTipo4">
                            <label for="ckfiltroTipo4">Diga lá</label>
                        </li>
                        <%
                            if (!bolCPPuro)
                            {
                        %>
                        <li filtrotipo="5" class="sub_item_filtro" onClick="filtraTimeline(this); return false;">
                            <input type="checkbox" id="ckfiltroTipo5">
                            <label for="ckfiltroTipo5">Recomendações</label>
                        </li>
                        <%
                            }
                        %>
                    </ul>
                </div>
            </div>                          
        </header>
        <section id="loader_timeline" class="bloco ajx bl_1">
			<div class="loader" style="display: block;"><img src="/AVA/StaticContent/Common/img/geral/ajax-loader.gif"></div>
    	</section>

       <!--INICIO CARD CONQUISTA APRIMORA -->
                <!-- <section id="cardConquistaAprimora" class="bloco ajx bl_1"> -->
                   <!--   <div class="cardscore-aprimora">

                    <div class="cardscore-body">

                        <div class="colun">
                            <div class="badge">
                                <img src="/AVA/StaticContent/Common/img/card-aprimora/bird.png" alt="stars" height="" width="">
                            </div>
                            <div class="level">
                                <h3>Nível</h3>
                                <h1>4</h1>
                            </div>
                        </div>

                        <div class="colun-center">
                            <div class="stars bounceIn">
                                <img src="/AVA/StaticContent/Common/img/card-aprimora/stars.png" alt="stars" height="auto" width="220">
                            </div>
                            <div class="avatar">
                                <div class="photo"><img src="/AVA/StaticContent/Common/img/card-aprimora/ei_crianca_05.jpg" alt="trophy" height="" width=""></div>
                                <div class="element animate"><img src="/AVA/StaticContent/Common/img/card-aprimora/light.png" alt="light" height="" width=""></div>
                            </div>
                        </div>
            
                        <div class="colun">
                            <div class="trophy bounceIn">
                                <img src="/AVA/StaticContent/Common/img/card-aprimora/trophy.png" alt="trophy" height=120"" width="auto">
                            </div>
                            <div class="score">
                                <p>Conquistou +</p>
                                <h1>2000</h1>
                                <h3>Pontos</h3>
                            </div>
                        </div>

                    </div>

                    <div class="cardscore-footer">
                        <div class="discipline">
                            <p>Disciplina</p>
                            <h4>Língua Portuguesa</h4>
                        </div>
                        <div class="module">
                            <p>Módulo</p>
                            <h4>Nomes - Todo mundo tem um nome</h4>
                        </div>
                        <div class="conclusion">
                            <p>Concluiu em</p>
                            <h4>10/10/2018</h4>
                        </div>
                    </div>

                </div> -->
                <!-- </section> -->
<!-- FIM CARD CONQUISTA APRIMORA -->

<!-- CARREGA FEED DO MURAL -->
        <div id="ava_fluxoarticles"></div>

    </section>

<div class="alert alert-success" id="alert-success" style="display: none">
  <p>Tarefa publicada com sucesso!</p>
  <a href="#" class="close" data-dismiss="alert" aria-label="close">&times;</a>
</div>

</asp:Content>


