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
    var atvfechadas;
    atvfechadas = 0;

   
    var instanciaSeletorMural = false;
    var instanciaSeletorMuralTarefa = false;

    var varHtml = '';
    var varAux = '';
    var varSources = [];

    var inputSelected = "";
    var strLinkVideo = "";

     var listaEdu = [];

    var bolAcessoAprimora = '<%=ViewData["bolAcessoAprimora"]%>' == 'True' ? true : false;

    console.log('OLHAA  '+bolAcessoAprimora);


    $(document).ready(function(){

        carregaAtividadesEmBreve();

    });


    function carregaAtividadesEmBreve() {


        if(isAluno.indexOf('True') >= 0 ){

              setTimeout( function(){


                if(isAluno.indexOf('True') >= 0 )
                {

                    $('.atividadesdodia-card').hide();

                    var idUser = "<%= idUsuarioPublico %>";

                    //var idUser = 12231686;

                    localStorage.setItem("idUser",null);

                    localStorage.setItem("idUser",idUser);

                    var curr = new Date;
                    var first = curr.getDate() - curr.getDay();
                    var last = first + 6;

                    var firstday = new Date(curr.setDate(first));
                    var lastday = new Date(curr.setDate(last));
                    lastday.setMonth(lastday.getMonth() + 1);


                    var deliveryDate = lastday.getTime(), history = 0, startDate = firstday.getTime();


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
                                                "nameModule":"",
                                                "evaluationTypeId":0,
                                                "nivelModulo":0,
                                                "NodeId":0
                    };

                    var listaApr = [];

                    var container = $('#pagination-demo1');


                    // var tka = localStorage.getItem('tka');

                    var aprLista = [];

                    // var token = localStorage.getItem('Token');


                    // var usuarioId = 11808720;

                    //Para teste ctrl + k + c
                    usuarioId = localStorage.getItem('idUser');



                    var dateToday = new Date();

                    //Checka se é DEV ou COM
                    var strUrl = "";

                    var currentUrl = window.location.href;

                    if( currentUrl.indexOf('dev') > 0  ){

                        console.log('Entrou no DEV');

                        strUrl = "http://dev.apr.educacional.net/API/user/v1/task-integration//listgroup-integration?requestData.UserEducationalId="+usuarioId+"&requestData.deliveryDate="+deliveryDate+"&requestData.history="+history+"&requestData.startDate="+startDate+"&requestData.IsEducacional="+false+"";

                    }
                    else{

                    //O end-point abaixo possui uma particularidade, o boolean "IsEducacional" se VERDEIRO, traz as atividades que ainda vão encerrar ou que já estão abertas.
                    //Caso seja FALSO, as atividades que são trazidas serão as que encerram em breve ( Mas isso é tratado no arquivo IndexAlunoProfessorNovaHome do Mural )

                        strUrl = "https://apr.educacional.com.br/API/user/v1/task-integration//listgroup-integration?requestData.UserEducationalId="+usuarioId+"&requestData.deliveryDate="+deliveryDate+"&requestData.history="+history+"&requestData.startDate="+startDate+"&requestData.IsEducacional="+false+"";

                    }

                    $.ajax({
                        url: strUrl,
                        async: false,
                        cache: false, dataType: "json" ,type:'GET' ,
                        contentType: 'application/json; charset=utf-8' ,
                        //data: JSON.stringify(queryData)    ,
                        // headers: {"Token": token},

                        success: function (retorno){
                                    console.log("ENTROU");
                                    console.log(retorno.Tasks);


                                $.each(  retorno.Tasks, function(ix, item) {

                                    if( item.HomeworkTypeId != 3  && item.Expired != true){


                                        var epochStartDate = new Date( item.StartDate ) ;
                                        var epochEndDate = new Date ( item.EndDate ) ;

                                        var dateStart = epochStartDate.getDate()+'/'+(epochStartDate.getMonth()+1)+'/'+epochStartDate.getFullYear() ;
                                        var dateEnd =  epochEndDate.getDate()+'/'+(epochEndDate.getMonth()+1)+'/'+epochEndDate.getFullYear() ;
                                        var dateStartTime = epochStartDate.getHours()+':'+(epochStartDate.getMinutes());
                                        var dateEndTime = epochEndDate.getHours()+':'+(epochEndDate.getMinutes());
                                        var teste = true;

                                        var datacompleta = dateStart.split("/");
                                        var datacompletafim = dateEnd.split("/");
                                        if(datacompleta[0]< 10){

                                        	datacompleta[0] = "0" + datacompleta[0];
                                        }

                                        if(datacompleta[1]< 10){

                                        	datacompleta[1] = "0" + datacompleta[1];
                                        }

                                       	dateStart = datacompleta[0]+ "/" +datacompleta[1]+ "/" + datacompleta[2];


                                        if(datacompletafim[0]< 10){

                                        	datacompletafim[0] = "0" + datacompletafim[0];
                                        }

                                        if(datacompletafim[1]< 10){

                                        	datacompletafim[1] = "0" + datacompletafim[1];
                                        }

                                       	dateEnd = datacompletafim[0]+"/"+ datacompletafim[1]+"/"+datacompletafim[2];





                                         if(((dateToday.getDate()   ==  epochEndDate.getDate()  ) || ( dateToday.getDate()+1   ==  epochEndDate.getDate() )     )     && ( dateToday.getMonth()+1 ==  epochEndDate.getMonth()+1 ) && (  dateToday.getFullYear() ==  epochEndDate.getFullYear())){


                                            $.each(  item.Nodes, function(i, atv) {

                                            	var completed;
                                                var cont;
                                                cont++;

                                                if(atv.Completed == undefined || atv.completed == false){
                                                	completed = false;
  
                                                }else{
                                                	completed = true;
                                                }

                                                if(  atv.completed == undefined || atv.completed == false){

                                                    var atividadeAprimora = {     
                                                    						"tipoproduto": "aprimora",
                                                    						"idRotaAgendamento": 0,
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
                                                                            "nameModule":"",
                                                                            "evaluationTypeId":0,
                                                                            "boolcompleto":false,
                                                                            "nivelModulo":0,
                                                                            "NodeId":0
                                                    };

                                                    atividadeAprimora.tipoproduto = "aprimora";
                                                    atividadeAprimora.idRotaAgendamento= 0;
                                                    atividadeAprimora.strTitulo= item.Name;
                                                    atividadeAprimora.idAvaliacao= 0;
                                                    atividadeAprimora.intOrdemAgendamento= 0;
                                                    atividadeAprimora.dtmInicio= dateStartTime;
                                                    atividadeAprimora.dtmFim= dateEndTime;
                                                    atividadeAprimora.intSituacao= 1;
                                                    atividadeAprimora.bolEncerrou= false;
                                                    atividadeAprimora.strTipo= "";
                                                    atividadeAprimora.strTurma= "";
                                                    atividadeAprimora.idPessoa= "";
                                                    atividadeAprimora.strNomePessoa= item.TeacherName;
                                                    atividadeAprimora.strLogin= "";
                                                    atividadeAprimora.strFoto= "/ava/StaticContent/Common/img/geral/atividade_ico_apr.png";
                                                    atividadeAprimora.idRota= 0,
                                                    atividadeAprimora.strDtmInicio= dateStart;
                                                    atividadeAprimora.strDtmFim= dateEnd;
                                                    atividadeAprimora.idResponsavel= 0 ;
                                                    atividadeAprimora.base64= atv.Base64;
                                                    atividadeAprimora.nameModule = atv.Name;
                                                    atividadeAprimora.evaluationTypeId =atv.EvaluationTypeId;
                                                    atividadeAprimora.boolcompleto = completed;
                                                    atividadeAprimora.nivelModulo = atv.LevelModule;
                                                    atividadeAprimora.NodeId = atv.NodeId; 

                                                    listaApr.push(atividadeAprimora);

                                                }

                                            });

                                        }

                                    }

                                });

                                // if(listaApr.length > 1){
                                //     listaApr.sort(compareForAnotherData);
                                // }

                                carregaAtividadesBreve(listaApr,usuarioId);

                        },
                        error: function (errorRetorno){

                            carregaAtividadesBreve(listaApr,usuarioId);


                        }

                    });

                }

                else{

                    console.log('BUgou');
                    $('#atividadesDia').hide();

                    // $('.atividadesdodia-conteudo').show();
                }


                }, 3000);

        }
        else{
            $('#atividadesDia').hide();

        }






    }

    function retornoSeletorAVA(){
        if(seletorCurr==1){
            $('.selecao_personas').find('li[ident=seguidores]').hide();
            $('.selecao_personas').find('li[ident=professores]').hide();
            $('.compartilhamento').find('.todos').find('a:first').text('Minhas turmas ');
        }
    }



     function AbrirAtividade( base,type ){



    //    if( disponivel.indexOf('true') >= 0 ){

              //var id =   12231686;
            var id =  localStorage.getItem('idUser');

            var b = encodeURIComponent(base);

            loginSmartAprimora(id,base,type);

        // var strUrl = 'https://aprimoraweb.educacional.com.br/#/main/module/question?data='+encodeURIComponent(token)+'&tk='+encodeURIComponent(token)+'&dat='+encodeURIComponent(base)+'&l=false'+'&ver=4.1.0&acs=&prx=true'+'&usr='+encodeURIComponent(token);

        // var strUrl = 'https://aprimoraweb.educacional.com.br/#/main/module/question?data='+encodeURIComponent(token)+'&tk='+encodeURIComponent(token)+'&dat='+encodeURIComponent(base)+'&l=false'+'&ver=4.1.0&acs=&prx=true'+'&usr='+encodeURIComponent(token);


        // location.href = strUrl;
        // window.open(strUrl);function abrirQuestao( base ,disponivel){

        // if( disponivel.indexOf('true') >= 0 ){


        // var id =  localStorage.getItem('idUser');


        // loginSmartAprimora(id,base);

        // var strUrl = 'https://aprimoraweb.educacional.com.br/#/main/module/question?data='+encodeURIComponent(token)+'&tk='+encodeURIComponent(token)+'&dat='+encodeURIComponent(base)+'&l=false'+'&ver=4.1.0&acs=&prx=true'+'&usr='+encodeURIComponent(token);

        // var strUrl = 'https://aprimoraweb.educacional.com.br/#/main/module/question?data='+encodeURIComponent(token)+'&tk='+encodeURIComponent(token)+'&dat='+encodeURIComponent(base)+'&l=false'+'&ver=4.1.0&acs=&prx=true'+'&usr='+encodeURIComponent(token);


        // location.href = strUrl;
        // window.open(strUrl);
        // }
        // else{
        // // alert('Atividade ainda não está disponível');
        // }



    }

    function abrirQuestaoEducacional(strUrl){


        if( !eAluno   ){

            strUrl = "/ava/Caminhos/";

            location.href = strUrl;

        }
        else{

            location.href = strUrl;
        }

    }


    //  function abrirQuestao( base ,disponivel){




    //      if( disponivel.indexOf('true') >= 0 ){


    //         var token =  localStorage.getItem('Token');


    //         var strUrl = 'https://aprimoraweb.educacional.com.br/#/main/module/question?data='+encodeURIComponent(token)+'&tk='+encodeURIComponent(token)+'&dat='+encodeURIComponent(base)+'&l=false'+'&ver=4.1.0&acs=&prx=true'+'&usr='+encodeURIComponent(token);


    //         location.href = strUrl;
    //     }
    //     else{
    //         // alert('Atividade ainda não está disponível');
    //     }

    // }


    // function abrirQuestaoEducacional(strUrl){


    //         location.href = strUrl;



    // }


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

        var srtHtml = '';

       if(!bolAcessoAprimora){

                aprLista = [];
             
            }

        $.ajax({
            url: "/AVA/Barras/Home/ListaAtividadesTipoNovaHomeJson/"+idUser,
            async: true,
            cache: false, dataType: "json", type: 'GET',
            contentType: 'application/json; charset=utf-8',
            success: function (retorno) {

                console.log(retorno.Result);
            	listaCompleta = [];
            	listaCompleta = aprLista;



                $.each(retorno.Result, function (ix, item) {
                    var dtmFinalaux = item.strDtmFim +" "+ item.dtmFim; //hora_fim
                    var dtmInicioaux = item.dtmInicio; // hora_inicio
              
                	var datehourFinal = dtmFinalaux.split(" ");
                	var datehoraInicio = dtmInicioaux.split(" ");
                	var strDtmFim = datehourFinal[0]; //data_fim
                    var strDtmInicio = datehoraInicio[0]; //data_Inicio
                	var dtmFinal = datehourFinal[1];
                	var dtmInicio = datehoraInicio[1];

                    var dtmFinalCon = strDtmFim.split("/");
                    dtmFinalCon = dtmFinalCon[1] + "-" + dtmFinalCon[0] +"-" + dtmFinalCon[2] + " " + dtmFinal;
                    var dtmFinalConvertida  = new Date(dtmFinalCon);
                    var datadia = new Date();

                    var dtmInicialCon = strDtmInicio.split("/");
                    dtmInicialCon = dtmInicialCon[1] + "-" + dtmInicialCon[0] +"-" + dtmInicialCon[2] + " " + dtmInicio;
                    var dtmInicialConvertida  = new Date(dtmInicialCon);


                    var dataservidor = new Date();
                                         dataservidor = dataservidor.toLocaleString("pt-BR", {timeZone: "America/Sao_Paulo"});
                                            var dataserv = dataservidor.split(" ");
                                            var dataaux = dataserv[0].split("/");
                                        dataaux = dataaux[1] + "-" + dataaux[0] + "-"+ dataaux[2];
                                        var datafinalCompleta = dataaux + " " + dataserv[1];
                                        var dataAgoraEduc = new Date(datafinalCompleta);


                    var diff = dtmFinalConvertida.getTime() - datadia.getTime(); // diferença entre o dia final de atividade e dia Atual

                    var dayAtual = datadia.getDate();
                    var dayFinal = dtmFinalConvertida.getDate();
                    var diffday = parseInt(dayFinal) - parseInt(dayAtual);

                    if(dtmInicialConvertida<=dataAgoraEduc && item.bolEncerrou != true){

                        var atvAtiva = true;

                    }else{
                        var atvAtiva = false;
                    }



                    if((diff <= 86400000 || datadia.getFullYear() == dtmFinalConvertida.getFullYear() && datadia.getMonth() == dtmFinalConvertida.getMonth() && diffday == 1) && atvAtiva == true){  //verifica se o tempo para fim da atividade é menor ou igual a 24h // P = 24h = 86400000
                        var acabando = true;
                    }else{
                        var acabando = false;
                    }




                     var atividadeEducacional = {     
                                                    						"tipoproduto":"educacional",
                                                    						"idRotaAgendamento": 0,
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
                                                                            "nameModule":"",
                                                                            "acabando":"",

                                                    };

                                                    atividadeEducacional.tipoproduto = "educacional";
                                                    atividadeEducacional.idRotaAgendamento= item.idRotaAgendamento;
                                                    atividadeEducacional.strTitulo= item.strTitulo;
                                                    atividadeEducacional.idAvaliacao= 0;
                                                    atividadeEducacional.intOrdemAgendamento= 0;
                                                    atividadeEducacional.dtmInicio= dtmInicio;
                                                    atividadeEducacional.dtmFim= item.strDtmFim;
                                                    atividadeEducacional.intSituacao= item.intSituacao;
                                                    atividadeEducacional.bolEncerrou= false;
                                                    atividadeEducacional.strTipo= "";
                                                    atividadeEducacional.strTurma= "";
                                                    atividadeEducacional.idPessoa= "";
                                                    atividadeEducacional.strNomePessoa= item.strNomePessoa;
                                                    atividadeEducacional.strLogin= "";
                                                    atividadeEducacional.strFoto= "/AVA/StaticContent/Common/img/geral/tarefa_55.jpg";
                                                    atividadeEducacional.idRota= item.idRota;
                                                    atividadeEducacional.strDtmInicio= strDtmInicio;
                                                    atividadeEducacional.strDtmFim= item.dtmFim;
                                                    atividadeEducacional.idResponsavel= 0 ;
                                                    atividadeEducacional.nameModule = "";
                                                    atividadeEducacional.acabando = acabando;
                   		 							listaCompleta.push(atividadeEducacional); 		
                   		 							 							

                });

                try{
                    listaCompleta.sort(compareForData);
                }
                catch(err){

                }

                if(listaCompleta.length > 0){
                	console.log(listaCompleta);

                    $.each(listaCompleta, function (ix, item) {

                 if(item.tipoproduto == "aprimora"){
                        var dtmFinal = item.dtmFim;
                        var aux8 = item.strDtmFim.split("/");

                        var aux = item.strDtmFim.split("/");
                        var aux2 = aux[1] + "-" + aux[0] + "-" + aux[2];
                        var horaMinutes = dtmFinal.split(":");

                      if(horaMinutes[0]<10){
                            horaMinutes[0] = "0" + horaMinutes[0];
                        }
                        if(horaMinutes[1]<10){
                        		horaMinutes[1] = "0" + horaMinutes[1];

                        }

                        var aux3 = horaMinutes[0]+":" +horaMinutes[1] +":"+ "00";
                        var aux4 = aux2 + " " + aux3;
                        var dataConvertidaFinal = new Date(aux4);
                        var dataAtual = new Date();
                        
                        var tamanhoCaracteres = item.nameModule.length;
                        tamanhoCaracteres = tamanhoCaracteres + 8 + 3;
                        //var name = item.nameModule.substring(0, 25) + "...";
                        if(tamanhoCaracteres>40){
                        	var name = item.nameModule.substring(0, 29) + "...";
                        }else{
							var name = item.nameModule;
                        }


                        var terminouTempo;
                        var boolexibemensagemfinal;


                        if(dataAtual < dataConvertidaFinal){
                        	terminouTempo = false;
                        }else{
							terminouTempo = true;
							atvfechadas = atvfechadas + 1;
                        }




		                if(item.boolcompleto == true && terminouTempo == false){
								atvfechadas = atvfechadas + 1;
							}


						if( item.bolEncerrou != true){
                        	
                        	if(terminouTempo != true && item.boolcompleto != true){

                                <%-- "abrirQuestao(\''+item.base64+'\',\''+verificaDisp+'\',\''+item.nivelModulo+'\')" --%>

	                           
	                                srtHtml = ' <div onclick="AbrirAtividade(\''+item.base64+'\',\''+item.nivelModulo+'\')"  id="atividadesdodia" class="atividadesdodia-card">  ';

	                                srtHtml +='<div id="icon-sys" class="icon-sys">'+
	                                    '<img src="'+item.strFoto+'" width="55" height="auto" />'+
	                                    ' <h3 id="atividadeNome" style = "margin-bottom: 5px;"><strong>  '+item.strTitulo+'</strong> </h3>  '+


	                                    '  <div class="atividade-conteudo" id="atividade-conteudo" >'+
	                                    '   <label id="atividadesdodia_professor">Prof:'+item.strNomePessoa+'  </label>';

	                                 srtHtml += '   <label  id="systemNome">#Aprimora</label>'+
	                                   ' </div>';

	                                srtHtml +=
	                                ' <h4 id="atividadeNome">M&oacute;dulo: '+name+'</h4>  ';


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
                    	}

                    }else{

                    	if(item.tipoproduto == "educacional"){

		                    	var dtmFinal = item.strDtmFim;
		                    	var aux6 = item.strDtmFim.split(":");
		                    	var horafinal = aux6[0] + ":" + aux6[1];
		                        var aux = item.strDtmFim.split("/");
		                        var aux2 = aux[1] + "-" + aux[0] + "-" + aux[2];
		                        var horaMinutes = item.strDtmFim.split(":");
		                        var tamanhoCaracteres = item.strTitulo.length;
		                        tamanhoCaracteres = tamanhoCaracteres + 8 + 3;
		                        //var name = item.nameModule.substring(0, 25) + "...";
		                        if(tamanhoCaracteres>40){
		                        	var name = item.strTitulo.substring(0, 29) + "...";
		                        }else{
									var name = item.strTitulo;
		                        }
		                      if(horaMinutes[0]<10){
		                            horaMinutes[0] = "0" + horaMinutes[0];
		                        }
		                        if(horaMinutes[1]<10){
		                        		horaMinutes[1] = "0" + horaMinutes[1];

		                        }

		                        var aux3 = horaMinutes[0]+":" +horaMinutes[1] +":"+ "00";
		                        var aux4 = aux2 + " " + aux3;
		                        var dataConvertidaFinal = new Date(aux4);
		                        var dataservidor = new Date();
		                        dataservidor = dataservidor.toLocaleString("pt-BR", {timeZone: "America/Sao_Paulo"});
								var dataserv = dataservidor.split(" ");
								var dataaux = dataserv[0].split("/");
								dataaux = dataaux[1] + "-" + dataaux[0] + "-"+ dataaux[2];
								var datafinalCompleta = dataaux + " " + dataserv[1];
								var dataAtual = new Date(datafinalCompleta);

			
									



		                        var terminouTempo;
		                        var boolexibemensagemfinal;



		                        if(dataAtual < dataConvertidaFinal){
		                        	terminouTempo = false;
		                        }else{
									terminouTempo = true;
									atvfechadas = atvfechadas + 1;
		                        }

		                        if(item.intSituacao == 3 && terminouTempo == false){
										atvfechadas = atvfechadas + 1;
		                        }

							if( item.bolEncerrou != true){
                        	
		                        	// if(terminouTempo != true && item.intSituacao != 3 && item.acabando == true){
		                        	if(item.intSituacao != 3 ){
                                        //atividade não iniciada, porém com menos de 24h
                                        if(item.acabando == false){

                                                srtHtml = ' <div  id="atividadesdodia" class="atividadesdodia-card">  ';
                                        

                                            srtHtml +='<div id="icon-sys" class="icon-sys">'+
                                                '<img src="'+item.strFoto+'" width="55" height="auto" />'+
                                                ' <h3 id="atividadeNome" style = "margin-bottom: 5px;"><strong>  '+"Tarefa"+'</strong> </h3>  '+


                                                '  <div class="atividade-conteudo" id="atividade-conteudo" >'+
                                                '   <label id="atividadesdodia_professor">Prof:'+item.strNomePessoa+'  </label>';


                                                srtHtml +=   '<label  id="systemNome">#Tarefa</label>'+
                                                ' </div>';

                                                srtHtml +=
                                                ' <h4 id="atividadeNome">Tarefa: '+name+'</h4>  ';                                                

                                        srtHtml +=
                                            ' </div>'+

                                            ' <div  class="atividade-conteudo-duracao" >'+
                                                '   <h4 id="data_entrega">'+item.dtmFim+'  </h4>'+
                                                '<label id="atividadesdodia-conteudo-duracao"> '+horafinal+'  </label>'+

                                            '</div>'+


                                        '</div><hr>';
                                        // varSources.push(srtHtml);

                                        $('.atividadesdodia-conteudo').append(srtHtml);

                                        }else{



			                                
			                                srtHtml = ' <div onclick="abrirQuestaoEducacional(\'/AVA/Caminhos/Home/Player/'+item.idRotaAgendamento+'/'+item.idRota+'\')"  id="atividadesdodia" class="atividadesdodia-card">  ';
			                            

			                                srtHtml +='<div id="icon-sys" class="icon-sys">'+
			                                    '<img src="'+item.strFoto+'" width="55" height="auto" />'+
			                                    ' <h3 id="atividadeNome" style = "margin-bottom: 5px;"><strong>  '+"Tarefa"+'</strong> </h3>  '+


			                                    '  <div class="atividade-conteudo" id="atividade-conteudo" >'+
			                                    '   <label id="atividadesdodia_professor">Prof:'+item.strNomePessoa+'  </label>';


			                                    srtHtml +=   '<label  id="systemNome">#Tarefa</label>'+
			                                    ' </div>';

				                                srtHtml +=
				                                ' <h4 id="atividadeNome">Tarefa: '+name+'</h4>  ';			                                    

			                            srtHtml +=
			                                ' </div>'+

			                                ' <div  class="atividade-conteudo-duracao" >'+
			                                    '   <h4 id="data_entrega">'+item.dtmFim+'  </h4>'+
			                                    '<label id="atividadesdodia-conteudo-duracao"> '+horafinal+'  </label>'+

			                                '</div>'+


			                            '</div><hr>';
			                            // varSources.push(srtHtml);

			                            $('.atividadesdodia-conteudo').append(srtHtml);

			                        	}
		                    		}

                                     }

		                    	}
                    }

                    });

                    //$.('.atividadesdodia-conteudo').show();
						if(listaCompleta.length == 0){
						// if(atvfechadas == listaCompleta.length){

							
			                	srtHtml = ' <h1>N&atilde;o existem atividades para hoje</h1>';
			                    $('.atividadesdodia-conteudo').append(srtHtml);
                        }




                }else{


                	srtHtml = ' <h1>N&atilde;o existem atividades para hoje</h1>';

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


function compareForData(a,b) {
          if (a.strDtmFim < b.strDtmFim)
            return -1;
          if (a.strDtmFim > b.strDtmFim)
            return 1;
          return 0;
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
        
        console.log("entrou preparaAvaSelector ");
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
                    console.log("preparaAvaSelector == grupo " + JSON.stringify(g));
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
            console.log("entrou no txtInput");
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
               console.log("entrou no IndexAlunoProfessorNovaHome.aspx ");
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

        function criarMensagemNaTurma(listaGrupo, strTexto, idAssunto, strLinkVideo, imagens, arquivos, disciplina ){
            console.log("Before For");
            console.log('Linha 913');
            console.log("listaGrupo " + listaGrupo);
            console.log("listaGrupo " + JSON.stringify(listaGrupo));

            if(listaGrupo.length > 0){
                for(var i = 0; i < listaGrupo.length; i++){
                    console.log("INside");
                    var idGrupo = listaGrupo[i];
                    console.log("Value "+idGrupo);
                    if(undefined != idGrupo ){
                        publicaMensagemNaTurma(idGrupo, strTexto, idAssunto, strLinkVideo, imagens, arquivos, disciplina )
                    }
                }
            }
            console.log("After For");
        }

        function publicaMensagemNaTurma(idGrupo, strTexto, idAssunto, strLinkVideo, imagens, arquivos, disciplina){

            $.ajax({
                    type: "POST",
                    url: "/AVA/Turma/Home/SalvarMensagemRapida",
                    data: {

                        strTexto: encodeURIComponent(strTexto),
                        idAssunto: idAssunto,
                        strLinkVideo: strLinkVideo,
                        imagens: JSON.stringify(imagens),
                        arquivos: JSON.stringify(arquivos),
                        idGrupo : idGrupo,
                        idMateria: disciplina
                    },
                    success: function (data) {

                        console.log(JSON.stringify(data));

                    },
                    error: function (data) {
                        if(data.status != 0){
                            console.debug("Ocorreu um erro no banco de dados.");
                        }
                    }
                });

        }

        function SalvarMensagemGrupo(idTurma, strTexto, idAssunto, strLinkVideo){
            console.log(" function SalvarMensagemGrupo(idTurma, strTexto, idAssunto, strLinkVideo)");
            //(string strTexto, int idAssunto, string strLinkVideo, string imagens, string arquivos, int idTurma, int idMateria)
            $.ajax({
                type: "POST",
                url: "/AVA/Turma/Home/SalvarMensagemRapidaGrupo",
                data: {
                    strTexto: encodeURIComponent(strTexto),
                    idAssunto: 0,
                    strLinkVideo: strLinkVideo,
                    imagens: JSON.stringify(objetoImagens.imagens),
                    arquivos: JSON.stringify(objetoArquivos.arquivos),
                    idTurma: idTurma,
                    idMateria: 0
                },
                async: !0,
                success: function (o) {
                    console.log("mensagem publicada com sucesso no grupo");

                },
                error: function () {
                    console.log("Ocorreu um erro ao salvar mensagem")
                }
            });

        }



        function publicarDigala(usuario, grupo, inputSelected, strLinkVideo ){

            console.log('Linha 972');

            if(g_arrayMensagemRapida != undefined){

                if(g_arrayMensagemRapida.length > 0){


                    $.each( g_arrayMensagemRapida, function(index , item){

                        objetoImagens.imagens.push(item);

                    });

                }
            }

            if(g_arrayMensagemRapidaFile != undefined){

                if(g_arrayMensagemRapidaFile.length > 0){

                    $.each( g_arrayMensagemRapidaFile, function(  index, item  ){

                        objetoArquivos.arquivos.push(item);
                    });

                }
            }

            console.log("objetoImagens.imagens = "+objetoImagens.imagens);
            console.log("objetoImagens.arquivos = "+objetoArquivos.arquivos);

            console.log("JSON.stringify(objetoImagens.imagens) = "+JSON.stringify(objetoImagens.imagens));
            console.log("JSON.stringify(objetoArquivos.arquivos) = "+JSON.stringify(objetoArquivos.arquivos));

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

                        try {
                            galleryUploader.reset();

                        }catch (e) {
                            console.log("ocorreu um erro ao chamar galleryUploader.reset()");
                        }



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
                        //realiza a publicação na turma
                        //var listaGrupos = new Array();
                        //console.log(" GRUPOS SELECIONADOS "+ JSON.stringify(grupo));
                        //listaGrupos.push(282786);
                        //criarMensagemNaTurma(listaGrupos, inputSelected, 27950, strLinkVideo, objetoImagens.imagens, objetoArquivos.arquivos, 0);

                        console.log('O que tem em usuários');
                        console.log(usuario);

                        try{
                            if(grupos == []){
                                listaGrupos = [];
                            }
                        }
                        catch(err){
                            var listaGrupos = [];
                        }

                        criarMensagemNaTurma( listaGrupos, inputSelected, 0, strLinkVideo, objetoImagens.imagens, objetoArquivos.arquivos, 0);


                    },
                    error: function (data) {
                        if(data.status != 0){
                            console.debug("Ocorreu um erro no banco de dados.");
                        }
                        $('#compartilhar').removeClass('disable').prop("disabled", true);
                        bloqueiaOutrosDigaLa();
                    }
                });

                g_arrayMensagemRapida = [];
                g_arrayMensagemRapidaFile = [];
        }




        function validaMensagemRapidaDigala(usuario, grupo) {



            console.log("validaMensagemRapidaDigala");

            var inputSelected = $('#txtInput').val().trim();
            var strLinkVideo = "";

            var users = JSON.stringify(usuario) ;


            if ($('#container_preview_video').find('iframe').attr('src') != undefined && $('#container_preview_video').find('iframe').attr('src') != "") {
                strLinkVideo = removerListUrlYoutube($("#urlVideoOriginal").val());
            }

            if((inputSelected != strMensagemPadrao && inputSelected != "") || (strLinkVideo != undefined && strLinkVideo != "") || (objetoImagens !== undefined && objetoImagens != null && objetoImagens.imagens.length > 0) || (objetoArquivos !== undefined && objetoArquivos != null && objetoArquivos.arquivos.length > 0 ) ||
            (g_arrayMensagemRapida !== undefined && g_arrayMensagemRapida != null && g_arrayMensagemRapida.length > 0 ) || (g_arrayMensagemRapidaFile !== undefined && g_arrayMensagemRapidaFile != null && g_arrayMensagemRapidaFile.length > 0 ) ){


                if (inputSelected == strMensagemPadrao) {
                    inputSelected = "";
                }
                inputSelected = inputSelected.replace(/\r?\n|\r/g, "<br>");

                console.log("Usuario 1....");
                console.log(users);

                $.jStorage.deleteKey("timeline" + idUsuarioCriptTL);
                //Não deleta o cache de filtro por que está tratando o post e tarefa rapida.

                console.log("Usuario 2....");
                console.log(users);

                publicarDigala(JSON.parse(users), grupo, inputSelected, strLinkVideo );

                //TODO incluir a publicação na turma
                console.log("entrou no publicar turma ====================================");
                for(var i = 0; i < grupo.length; i++ ){
                    console.log("publicou na turma " + JSON.stringify(grupo));
                    var idTurma = grupo[0].idTurma
                    console.log("publicou na turma " + idTurma);
                    if(idTurma > 0){
                        console.log("**********SalvarMensagemGrupo(idTurma, inputSelected, 0, strLinkVideo)");
                        SalvarMensagemGrupo(idTurma, inputSelected, 0, strLinkVideo);
                    }
                }


                $('#compartilhar').addClass('disable').prop("disabled", true);

                var parametros = {
                                    inputSelected: inputSelected,
                                    strLinkVideo: strLinkVideo,
                                    ok: true
                                 };

                return parametros;

            }


            else {
                var parametros = {
                                    inputSelected: inputSelected,
                                    strLinkVideo: strLinkVideo,
                                    ok: false
                                };

                return parametros;
            }
        }


        function validaMensagemRapida(usuario, grupo) {
            console.log('ISMAEL');
            console.log(usuario);
            console.log(grupo);
            var urlPagina = document.location.href.toLowerCase();
            var indexOfUrl = urlPagina.indexOf('/ava/mural');
            var grupos = [];
            var users = [];
            if(grupo.length > 0){
                users = grupo[0].usuarios;
            }

            ///:::claudemir
            for (var x = 0; x < users.length; x++){
                grupos.push(users[x].idGrupo);
            }

            if (indexOfUrl > 0) {
                console.log('Antes da valida');
                var parametros = validaMensagemRapidaDigala(usuario, grupo);
                if(parametros.ok){
                    // publicarDigala(usuario, grupo, inputSelected, strLinkVideo);
                    console.log('Mostrando users');
                    console.log(usuario);
                    console.log('Mostrando grupos');
                    console.log(grupo);

                    toastr.options = {
                        "closeButton": true,
                        "debug": false,
                        "newestOnTop": false,
                        "progressBar": true,
                        "positionClass": "toast-top-center",
                        "preventDuplicates": false,
                        "onclick": null,
                        "showDuration": "900",
                        "hideDuration": "1000",
                        "timeOut": "9000",
                        "extendedTimeOut": "9000",
                        "showEasing": "swing",
                        "hideEasing": "linear",
                        "showMethod": "fadeIn",
                        "hideMethod": "fadeOut"
                    }
                    Command: toastr["success"]("Diga l&aacute; criada com sucesso.", "Sucesso");

                    var listagemGrupos = [];
                    for(var i =0; i < usuario.length; i++){
                        if(usuario[i].isTurma){
                            listagemGrupos.push(usuario[i].idGrupo);
                        }
                    }
                    try {
                        for(var y =0; y < grupo.length; y++){
                            //if (grupo[y].usuarios.length
                            for(var x =0; x < grupo[y].usuarios.length; x++){
                                if(grupo[y].usuarios[x].isTurma){
                                    listagemGrupos.push(grupo[y].usuarios[x].idGrupo);
                                }
                            }
                        }

                    } catch(err) {
                        console.log("eroooooo");

                    }
                    if (listagemGrupos.length > 0 ){
                        criarMensagemNaTurma(listagemGrupos, parametros.inputSelected, 0, parametros.strLinkVideo, objetoImagens.imagens, objetoArquivos.arquivos, 0);
                    }

                }
                console.log('Saiu');

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
                  <h3>O ano est&#225; come&#231;ando!</h3>
                  <p>O seu cadastro est&#225; sendo realizado e, quando for conclu&#237;do, a sua rede social voltar&#225; ao normal.</p>
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
                  <h3>F&#233;rias! Aproveite para descansar.</h3>
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
                Voc&#234; est&#225; impedido de enviar mensagens de
                <b><%:dataIni.ToString(format) %></b> até <b><%:dataFim.ToString(format)%></b>
            </p>
            <p class="motivo">
                Motivo:
                <%
                if (Model.strJustificativaSuspenso == "")
                {
                %>
                    N&#227;o declarado.
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
                            <label for="ckfiltroTipo4">Diga l&aacute;..</label>
                        </li>
                        <%
                            if (!bolCPPuro)
                            {
                        %>
                        <li filtrotipo="5" class="sub_item_filtro" onClick="filtraTimeline(this); return false;">
                            <input type="checkbox" id="ckfiltroTipo5">
                            <label for="ckfiltroTipo5">Recomenda&ccedil;&otilde;es</label>
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


