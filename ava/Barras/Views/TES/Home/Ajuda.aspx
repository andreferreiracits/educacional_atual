<%@ Page Language="C#" MasterPageFile="~/Views/TES/Shared/SiteMeio.Master" Inherits="PositivoFramework.Web.Mvc.Theme.ThemedViewPage<dynamic>" %>

<asp:Content ContentPlaceHolderID="ContentPlaceHolderDadosMeio" ID="ContentPlaceHolder" runat="server">
    <script type="text/javascript" src="/AVA/StaticContent/Common/Scripts/AC_RunActiveContent.js<%=Url.TimeStampLink() %>"></script>    
    <script type="text/javascript">
        jQuery(function () {
            var _this = $('.containerVideo');
            var o = {
                autoSize: false,
                width: 670,
                type : "ajax",
                height: 510,
                helpers: {
                    overlay: {
                        locked: false
                    }
                }
                
            };
            lightBoxAVA(_this, o);

        });

        
    </script>
    
    <section id="ava_container" class="as1">
        <!--Player Atividades-->
		<div class="topo_titulo" id="Hcaminhos">
			<h1 class="blokletters">Ajuda</h1>
			<h2 class="blokletters">Conheça melhor o novo portal assistindo aos vídeos tutoriais.</h2>
		</div>
		<div class="videosAjuda">
			<a class="containerVideo" href="/AVA/Barras/Home/AjudaVideos/ava-intro2">
				<div id="div_player">                  
                    <img src="/AVA/StaticContent/Common/Videos/ava-intro2.png" width="285" height="195" />
				</div>
                <div class="descricaoVideo" style="padding:10px;">
					<h3>Conheça o portal da sua escola</h3>
					<p>Faça um tour pelos principais recursos do novo ambiente.</p>
				</div>				
			</a>			
			<a class="containerVideo" href="/AVA/Barras/Home/AjudaVideos/ava-tarefas-caminhos2">
				<div id="div_player">
                    <img src="/AVA/StaticContent/Common/Videos/ava-tarefas-caminhos2.png" width="285" height="195" />
				</div>
                <div class="descricaoVideo" style="padding:10px;">
					<h3>Tarefas e caminhos de aprendizagem</h3>
					<p>Veja como os professores podem criar tarefas e caminhos para seus alunos.</p>
				</div>
				
			</a>
            <a class="containerVideo" href="/AVA/Barras/Home/AjudaVideos/ava-admin2">
				<div id="div1">
                    <img src="/AVA/StaticContent/Common/Videos/ava-admin2.png" width="285" height="195" />
				</div>
                <div class="descricaoVideo" style="padding:10px;">
					<h3>Administração do ambiente</h3>
					<p>Conheça os recursos dos administradores para acompanhar a atividade dos usuários no portal.</p>
				</div>				
			</a>
		</div>
       
    </section>
</asp:Content>