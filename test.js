const axios = require('axios');

// user Auth
const auth = process.env.AUTH
let date = Date.now();
// plus 5 days
date += 5 * 86400000
let aulaUrls = []
// get day aulas
let config = {
  method: 'post',
  maxBodyLength: Infinity,
  url: `https://www.regibox.pt/app/app_nova/php/aulas/aulas.php?valor1=${date}&source=mes&type=&z=${auth}`,
  headers: {
    'accept': 'text/html, */*; q=0.01',
    'accept-language': 'en-US,en;q=0.9,gl;q=0.8,pt;q=0.7',
    'cookie': `PHPSESSID=68aujv9vn063kverqo8658gb71; regybox_boxes=%2A${auth}; regybox_user=${auth}; _ga=GA1.1.1018907428.1718629121; _ga_M0FG753LRM=GS1.1.1718629120.1.0.1718629120.0.0.0; regybox_boxes=%2A${auth}; regybox_user=${auth}`,
    'priority': 'u=0, i',
    'referer': `https://www.regibox.pt/app/app_nova/index.php?z=${auth}&id=12&lang=en&tipo=direct&id_box=12&type=direct`,
    'sec-ch-ua': '"Google Chrome";v="125", "Chromium";v="125", "Not.A/Brand";v="24"',
    'sec-ch-ua-mobile': '?0',
    'sec-ch-ua-platform': '"macOS"',
    'sec-fetch-dest': 'empty',
    'sec-fetch-mode': 'cors',
    'sec-fetch-site': 'same-origin',
    'user-agent': 'Mozilla/5.0 (Macintosh; Intel Mac OS X 10_15_7) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/125.0.0.0 Safari/537.36',
    'x-requested-with': 'XMLHttpRequest'
  }
};
// Book the class

const buttonPattern = /id_aula=(.*?)'/g;
axios.request(config)
.then((response) => {
      const matches = response.data.matchAll(buttonPattern);

 for (const match of matches) {
     aulaUrls.push(match[1]);
 }
 console.log(aulaUrls)
 let configBook = {
   method: 'get',
   maxBodyLength: Infinity,
   //${aulaUrls[0] first class of the day
   url: `https://www.regibox.pt/app/app_nova/php/aulas/marca_aulas.php?id_aula=${aulaUrls[9]}&z=${auth}`,
   headers: {
     'accept': 'text/html,application/xhtml+xml,application/xml;q=0.9,image/avif,image/webp,image/apng,*/*;q=0.8,application/signed-exchange;v=b3;q=0.7',
     'accept-language': 'en-US,en;q=0.9,gl;q=0.8,pt;q=0.7',
     'cookie': `PHPSESSID=68aujv9vn063kverqo8658gb71; regybox_boxes=%2A${auth}; regybox_user=${auth}; _ga=GA1.1.1018907428.1718629121; _ga_M0FG753LRM=GS1.1.1718629120.1.0.1718629120.0.0.0; regybox_boxes=%2A${auth}; regybox_user=${auth}`,
     'priority': 'u=0, i',
     'referer': `https://www.regibox.pt/app/app_nova/index.php?z=${auth}&id=12&lang=en&tipo=direct&id_box=12&type=direct`,
     'sec-ch-ua': '"Google Chrome";v="125", "Chromium";v="125", "Not.A/Brand";v="24"',
     'sec-ch-ua-mobile': '?0',
     'sec-ch-ua-platform': '"macOS"',
     'sec-fetch-dest': 'iframe',
     'sec-fetch-mode': 'navigate',
     'sec-fetch-site': 'same-origin',
     'sec-fetch-user': '?1',
     'upgrade-insecure-requests': '1',
     'user-agent': 'Mozilla/5.0 (Macintosh; Intel Mac OS X 10_15_7) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/125.0.0.0 Safari/537.36'
   }
 };
 axios.request(configBook)
 .then((response) => {
   console.log(JSON.stringify(response.data));
 })
 .catch((error) => {
   console.log(error);
 });

})
.catch((error) => {
  console.log(error);
});

