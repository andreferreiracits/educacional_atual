<%@ Control Language="C#" Inherits="System.Web.Mvc.ViewUserControl<dynamic>" %>

<!doctype html>
<html>
	<head>
		<title>Agenda Escola</title>
		<link rel="stylesheet" type="text/css" media="screen" href="/ava/StaticContent/Common/Fancybox/jquery.fancybox-1.3.4.css<%=Url.TimeStampLink() %>" />
		<link rel="stylesheet" type="text/css" media="screen" href="/ava/StaticContent/Common/wijmo/jquery-wijmo.css<%=Url.TimeStampLink() %>"/>  
		<link rel="stylesheet" type="text/css" media="screen" href="/ava/StaticContent/Common/jquery-ui-1.8.2.custom/css/cinza-theme/jquery-ui-1.8.16.custom.css<%=Url.TimeStampLink() %>"/>
		<link rel="stylesheet" type="text/css" media="screen" href="/AVA/StaticContent/Common/malihu-scrollbar-plugin/jquery.mCustomScrollbar.css<%=Url.TimeStampLink() %>">
		<link rel="stylesheet" href="/AVA/StaticContent/Content/TES/css/fontface_ava_3.0.3(1).css?<%=Url.TimeStampLink() %>">

		<link rel="stylesheet" type="text/css" media="screen" href="/AVA/StaticContent/Content/TES/css/css_agenda_externa/agenda_externa_<%=ViewData["css"].ToString() %>_3.0.0.css<%=Url.TimeStampLink() %>" />
		<script type="text/javascript">
            /* Variáveis */
            var idEscola = <%=(int)ViewData["idEscola"] %>;
        </script>
        <script type="text/javascript" src="/ava/StaticContent/Common/jquery-ui-1.8.2.custom/development-bundle/jquery-1.7.js<%=Url.TimeStampLink() %>"></script>
        <script type="text/javascript" src="/ava/StaticContent/Common/jquery-ui-1.8.2.custom/js/jquery-ui-1.8.2.custom.min.js<%=Url.TimeStampLink() %>"></script> 
		<script type="text/javascript" src="/ava/StaticContent/Common/wijmo/jquery.glob.min.js<%=Url.TimeStampLink() %>"></script>
        <script type="text/javascript" src="/ava/StaticContent/Common/wijmo/jquery.glob.all.min.js<%=Url.TimeStampLink() %>"></script>        
        <script type="text/javascript" src="/ava/StaticContent/Common/wijmo/jquery.wijmo.wijcalendar.escola.js<%=Url.TimeStampLink() %>"></script>
		<script type="text/javascript" src="/ava/StaticContent/Common/scripts/agendaEscola_3.0.0.js<%=Url.TimeStampLink() %>"></script>
        <script type="text/javascript" src="/AVA/StaticContent/Common/malihu-scrollbar-plugin/jquery.mCustomScrollbar.js?<%=Url.TimeStampLink() %>"></script>
        <script type="text/javascript" src="/AVA/StaticContent/Common/malihu-scrollbar-plugin/jquery.mousewheel.min.js?<%=Url.TimeStampLink() %>"></script>
        
	</head>
	<body style="margin: 0;">
        <div id="eventos"></div>                
        <div id="calendar1"></div>
            
    </body>
</html>       
            
            
            
                     
				<!--<div class="box_agenda visualizar_evento">
					<a href="/" title="Dia anterior" class="anterior_dia_agenda"></a>
					<h2>Eventos do dia 99/99</h2>
					<a href="/" title="Proximo dia" class="proximo_dia_agenda"></a>
					<form>
						<ul class="filtro_agenda_eventos">
							<strong>Filtrar por &#9660;</strong>
							<li>	
								<input type="checkbox" id="filtroPortal">
								<label for="filtroPortal">Portal</label>
							</li>
							<li>	
								<input type="checkbox" id="filtroEscola">
								<label for="filtroEscola">Escola</label>
							</li>
						</ul>
					</form>
					<ul>
						<li>
							<span class="bullet_cor"></span>
							<span>Simulado</span>
							<small>Duração: 12/11 a 16/11, das 12:00 às 17:00</small>
							<p>Lorem ipsum dolor sit amet, consectetuer adipiscing elit, sed diam nonummy nibh euismod tincidunt ut laoreet dolore</p>
						</li>
						<li>
							<span class="bullet_cor"></span>
							<span>Simulado</span>
							<small>Duração: 12/11 a 16/11, das 12:00 às 17:00</small>
							<p>Lorem ipsum dolor sit amet, consectetuer adipiscing elit, sed diam nonummy nibh euismod tincidunt ut laoreet dolore</p>
						</li>
						<li>
							<span class="bullet_cor"></span>
							<span>Simulado</span>
							<small>Duração: 12/11 a 16/11, das 12:00 às 17:00</small>
							<p>Lorem ipsum dolor sit amet, consectetuer adipiscing elit, sed diam nonummy nibh euismod tincidunt ut laoreet dolore</p>
						</li>
						
					</ul>
					<a href="javascript:void(0);" class="btn_cinza">Fechar</a>
				</div>-->