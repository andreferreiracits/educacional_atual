using System;
using System.Collections.Generic;
using System.Web;
using System.Web.Mvc;
using PositivoFramework.Web.Mvc;
using Microsoft.Web.Mvc;

namespace PositivoLMS.Core.Controllers
{
    [ControllerSessionState(ControllerSessionState.ReadOnly)]
    public class SiteMapController : CoreController
    {
        private class JsonSiteMapNode
        {
            public JsonSiteMapNode[] ChildNodes { get; set; }
            public string Description { get; set; }
            public string Title { get; set; }
            public string Url { get; set; }
        }

        [PositivoAuthorize]
        [HttpGet]
        public JsonResult Get()
        {
            var retorno = GetChildNodes(SiteMap.RootNode, 0);

            return Json(retorno, JsonRequestBehavior.AllowGet);
        }

        [NonAction]
        private JsonSiteMapNode GetChildNodes(SiteMapNode root, int depth)
        {
            if (depth > 7)
                throw new ArgumentOutOfRangeException("Excedido nível máximo de profundidade do SiteMap", "depth");

            var retorno = new JsonSiteMapNode()
                {
                    Description = root.Description,
                    Title = root.Title,
                    Url = root.Url
                };

            var descendants = new List<JsonSiteMapNode>();
            foreach (SiteMapNode node in root.ChildNodes)
            {
                var child = GetChildNodes(node, depth + 1);
                descendants.Add(child);
            }

            retorno.ChildNodes = descendants.ToArray();

            return retorno;
        }
    }
}
