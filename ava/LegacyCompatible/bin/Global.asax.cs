using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;
using System.Web.Mvc;
using System.Web.Routing;
using PositivoFramework.Web.Mvc.Theme;
using System.Globalization;
using System.Threading;

namespace PositivoLMS.Apps.LegacyCompatible
{
    // Note: For instructions on enabling IIS6 or IIS7 classic mode, 
    // visit http://go.microsoft.com/?LinkId=9394801

    public class MvcApplication : System.Web.HttpApplication
    {
        public static void RegisterRoutes(RouteCollection routes)
        {
            routes.IgnoreRoute("{resource}.axd/{*pathInfo}");

            routes.MapRoute(
                "Default", // Route name
                "{controller}/{action}/{id}", // URL with parameters
                new { area = "LegacyCompatible", controller = "Home", action = "Index", id = UrlParameter.Optional }, // Parameter defaults
                new string[] { "PositivoLMS.Apps.LegacyCompatible.Controllers" }
            );

        }

        protected void Application_Start()
        {
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
    }
}