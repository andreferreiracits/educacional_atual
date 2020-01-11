using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;
using System.Web.Mvc;
using System.Web.Routing;
using PositivoFramework.Web.Mvc.Theme;
using System.Globalization;
using System.Threading;
using Elmah;
using PositivoFramework.Web.Mvc;
using Microsoft.Web.Mvc;

namespace PositivoLMS.Apps.MVCConfig
{

    // TODO Alterar o namespace padrao do projeto em propriedades do projeto -> Application -> Default Namespace.
    // TODO Alterar o nome do assembly que será gerado em propriedades do projeto -> Application -> Assembly name.
    // TODO Alterar o web.config de cada ambiente loggingConfiguration/listeners/add para aponte para o diretório e nome de log para a aplicação.
    // TODO Alterar o web.config (elmah/errorLog) para apontar para o caminho correto de log.
    // TODO Alterar o web.config (elmah/errorMail) para os dados corretos do e-mail de erro.


    // Note: For instructions on enabling IIS6 or IIS7 classic mode, 
    // visit http://go.microsoft.com/?LinkId=9394801

    public class MvcApplication : System.Web.HttpApplication
    {
        public static void RegisterRoutes(RouteCollection routes)
        {
            routes.IgnoreRoute("{resource}.axd/{*pathInfo}");

            routes.MapRoute(
              "grupo",
              "{controller}/{action}/{linkPermanente}",
              new { controller = "Grupo", action = "Index" }
              );

            routes.MapRoute(
                "Default",
                "{controller}/{action}/{id}",
                new { controller = "Home", action = "Index", id = UrlParameter.Optional }
            );            

            routes.MapRoute(
                "escola",
                "{controller}/{action}/{css}/{idEscola}",
                new { controller = "Escola", action = "Index" }

                );           

            routes.MapRoute(
               "agendaExternaDataJson",
               "{controller}/{action}/{idEscola}/{dataInicio}/{dataFim}/{categorias}",
               new { controller = "Escola", action = "GetJsonAgendaEscolaByData" }
            );

            routes.MapRoute(
                "agendaExternaMesJson",
                "{controller}/{action}/{idEscola}/{mesAno}/{categorias}",
                new { controller = "Escola", action = "GetJsonAgendaEscolaByMes" }
            );
            
            //routes.MapRoute(
            //    "MensagemRapida",
            //    "{controller}/{action}/{id}",
            //    new { controller = "MensagemRapida", action = "Index", id = UrlParameter.Optional });

        }

        protected void Application_Start()
        {
            ControllerBuilder.Current.SetControllerFactory(new MvcDynamicSessionControllerFactory());

            AreaRegistration.RegisterAllAreas();
            ViewEngines.Engines.Clear();
            ViewEngines.Engines.Add(new ThemedViewEngine());
            RegisterRoutes(RouteTable.Routes);

        }


        protected void Application_BeginRequest(object sender, EventArgs e)
        {
            if ((Request.UserLanguages != null) && (Request.UserLanguages.Length > 0))
            {
                CultureInfo culture = CultureInfo.CreateSpecificCulture(Request.UserLanguages[0]);
                Thread.CurrentThread.CurrentCulture = culture;
                Thread.CurrentThread.CurrentUICulture = culture;
            }
        }


        void ErrorLog_Logged(object sender, ErrorLoggedEventArgs args)
        {
            PositivoErrorDetail detail = new PositivoErrorDetail();
            detail.HandleElmahEvent(System.Web.HttpContext.Current, sender, args);
        }
    }
}