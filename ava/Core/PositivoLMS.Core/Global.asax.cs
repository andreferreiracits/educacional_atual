using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;
using System.Web.Mvc;
using System.Web.Routing;
using PositivoFramework.Web.Mvc;
using System.Globalization;
using System.Threading;
using Elmah;
using PositivoFramework.Infrastructure;
using System.Web.Configuration;
using Microsoft.Web.Mvc;

namespace PositivoLMS.Core
{
    // Note: For instructions on enabling IIS6 or IIS7 classic mode, 
    // visit http://go.microsoft.com/?LinkId=9394801

    public class MvcApplication : System.Web.HttpApplication
    {
        public static void RegisterRoutes(RouteCollection routes)
        {
            routes.IgnoreRoute("{resource}.axd/{*pathInfo}");

            routes.MapRoute(
                "DefaultFoto", // Route name
                "{controller}/{action}/{IdUsuario}", // URL with parameters
                new { controller = "Usuario", action = "Foto", IdUsuario = "0" }, // Parameter defaults
                new { IdUsuario = @"[0123456789abcdef]+" }
            );
            

            routes.MapRoute(
                "Default", // Route name
                "{controller}/{action}/{id}", // URL with parameters
                new { controller = "Home", action = "Index", id = UrlParameter.Optional } // Parameter defaults
            );

        }

      



        private void SetupViewEngine()
        {
            // usar view engine que suporta temas
            ViewEngines.Engines.Clear();
            ViewEngines.Engines.Add(new PositivoFramework.Web.Mvc.Theme.ThemedViewEngine());
        }

        private void SetupValueProviders()
        {
            ValueProviderFactories
                .Factories
                .Insert(0, new PositivoValueProviderFactory());
        }

        protected void Application_Start()
        {
            Log.LogDebug("PositivoFramework.Instrumentation", "Core Application_Start");

            AreaRegistration.RegisterAllAreas();

            RegisterRoutes(RouteTable.Routes);

            SetupViewEngine();

            SetupValueProviders();

            ControllerBuilder.Current.SetControllerFactory(new MvcDynamicSessionControllerFactory());
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
            detail.HandleElmahEvent(HttpContext.Current, sender, args);
            /*
            string fileFormat = @"error-{0:yyyy-MM-ddHHmmssZ}-{1}.xml";
            DateTime timeStamp = (args.Entry.Error.Time > DateTime.MinValue ? args.Entry.Error.Time : DateTime.Now);

            string fileName = string.Format(CultureInfo.InvariantCulture,
                                fileFormat,
            timeStamp.ToUniversalTime(),
            args.Entry.Id);
            

            HttpCookie cookie = new HttpCookie("LastErrorId", fileName);
            Response.Cookies.Add(cookie);
            */
        }



    }
}