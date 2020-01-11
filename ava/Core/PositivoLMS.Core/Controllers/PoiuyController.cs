using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;
using System.Web.Mvc;
using PositivoFramework.Web.Mvc;
using PositivoFramework.Infrastructure.Utils;
using System.Text;
using Microsoft.Web.Mvc;

namespace PositivoLMS.Core.Controllers
{
    [ControllerSessionState(ControllerSessionState.ReadOnly)]
    public class PoiuyController : PositivoController
    {

        public ActionResult Erro()
        {
            int um = 1;
            int zero = 0;
            int z;
            z = um / zero;
            return Json(null);
        }
        //
        // GET: /Poiuy/
        static StringBuilder _cacheDummyContent = null;
        string cacheDummyContent { 
            get
            {
                if (_cacheDummyContent == null)
                {
                    _cacheDummyContent = new StringBuilder();
                    for (int i = 1; i <= 2000; i++)
                    {
                        _cacheDummyContent.Append(i);
                    }
                }

                return _cacheDummyContent.ToString();
            }
        }
        
        /*
        private readonly string cacheFormat = "UYTJGGFVEGKKKKKK6532356-{0}";
        public ContentResult Trewq(string token)
        {
            string cacheKey = string.Format(cacheFormat, token);

            ContentResult r = new ContentResult();
            r.ContentType = "text/plain";
            string cacheContent = "";
       

            bool alreadyInCache = PositivoCache.GetCache<string>(cacheKey, out cacheContent, cacheContent);
            if (!alreadyInCache)
            {
                cacheContent = cacheDummyContent;


                PositivoCache.SetCache(cacheKey, cacheContent, 5);
                r.Content = "Put " + cacheKey + "\n\n\n" + cacheContent;
            }else
            {
                r.Content = "Get " + cacheKey + "\n\n\n" + cacheContent;
            }

            return r;
        }
        */

        private readonly string cacheFormat = "UYTJGGFVEGKKKKKK6532356-{0}-{1}";
        public ContentResult Trewq(string token)
        {
            

            ContentResult r = new ContentResult();
            r.ContentType = "text/plain";
            object cacheContent = null;
            colheLaranja();
            StringBuilder returnString = new StringBuilder();

            for (int i = 0; i <= 100; i++)
            {
                string cacheKey = string.Format(cacheFormat, token, i);
                bool alreadyInCache = PositivoCache.GetCache<object>(cacheKey, out cacheContent, cacheContent);
                if (!alreadyInCache)
                {
                    if (i==0){
                        cacheContent = laranjaList;
                    }else{
                        cacheContent = laranjaList[i];
                    }

                    PositivoCache.SetCache(cacheKey, cacheContent, 5);
                    returnString.Append("Put ").Append(cacheKey).Append("\n");
                }
                else
                {
                    returnString.Append("Get ").Append(cacheKey).Append("\n");
                }
            }
            r.Content = returnString.ToString();
            return r;
        }


        static List<Laranja> laranjaList = new List<Laranja>();
        static void colheLaranja()
        {
            if (laranjaList.Count < 1)
            {
                for (int i=0; i<1000; i++)
                {
                    Laranja l = new Laranja();
                    l.IdLaranja = i;
                    l.strDescricao = "Desc_" + i;
                    l.numPeso = i * 2.132134;
                    l.dtmColhida = DateTime.Today.AddMinutes(i * 3);
                    lock (laranjaList)
                    {
                        laranjaList.Add(l);
                    }
                }
            }
        }
        static string getLarajasDesc(List<Laranja> _laranjaList)
        {
            StringBuilder sb = new StringBuilder();
            foreach (Laranja laranja in _laranjaList)
            {
                sb.Append(laranja.ToString()).Append("\n");
            }
            return sb.ToString();
        }

        [Serializable]
        class Laranja
        {
            public int IdLaranja { get; set; }
            public string strDescricao { get; set; }
            public double numPeso { get; set; }
            public DateTime dtmColhida { get; set; }
            public override string ToString()
            {
                StringBuilder sb = new StringBuilder();
                sb  .Append("[ IdLaranja:").Append(this.IdLaranja)
                    .Append(", strDescricao:").Append(this.strDescricao)
                    .Append(", numPeso:").Append(this.numPeso)
                    .Append(", dtmColhida:")
                    .Append(this.dtmColhida).Append(" ]");

                return sb.ToString();
                
            }
        }



    }
}
