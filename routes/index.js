var express = require('express');
var router = express.Router();

/* GET home page. */
router.get('/', function(req, res, next) {
  res.render('index', { title: 'Express' });
});

router.get('/channel.m3u8', async function (req, res, next) {
  res.set('Content-Type', 'text/plain');

  let group_id = req.query.id;
  let streamType = "hls_kr";
  let streamUrl = "https://mfwkweb-api.clarovideo.net/services/player/getmedia?crDomain=https://www.clarovideo.com&device_id=693e9af84d3dfcc71e640e005bdc5e2e&device_category=web&device_model=web&device_type=web&device_so=Chrome&format=json&device_manufacturer=generic&authpn=webclient&authpt=tfg1h3j4k6fd7&api_version=v5.93&region=mexico&HKS=web62f31067e85cc&user_id=26822426&user_hash=Njk4NDY2MTB8MTY2MDE3NDUwNnxjNGMyODNiNGI0YmU2Y2QzZTU0MzFkNjM5Yjc2NzNiODMyMTMzMWQwOTdhN2VlMmU2MQ%3D%3D&preview=0&css=0&startTime=16601724000000000&group_id="
  let groupId = "&preview=0&css=0&startTime=16606944000000000&group_id=" + group_id;
  let payway_token = 'eyJ0eXAiOiJKV1QiLCJhbGciOiJIUzI1NiJ9.eyJleHAiOjE3NTQ2MDQ0ODIsImlzcyI6InBheXdheVwvbGluZWFsY2hhbm5lbHMiLCJwZ3MiOnsidXNlciI6Ijg0NDQ2ODEyIiwicGFyZW50IjoiODQ0NDY4MTIiLCJvZmZlciI6IjE0MzI4NzY0IiwicHVyY2hhc2UiOm51bGwsInByb2R1Y3R0eXBlIjpudWxsLCJwbGF5Ijp7ImVuYWJsZWQiOnRydWUsImRldmljZXMiOjUsInN0cmVhbXMiOjV9LCJkbCI6eyJlbmFibGVkIjpudWxsLCJkZXZpY2VzIjpudWxsLCJleHAiOm51bGx9LCJucHZyIjp7InN0b3JhZ2UiOiIwIiwidGltZXNoaWZ0IjoiMCJ9LCJvYmplY3QiOiI0MDgwIiwiZ3JvdXBzIjpbIjExNTkxNjAiLCIxMTU5MDk3IiwiMTE0NzQyNSIsIjc4MDUyMiIsIjc4MDUwNyIsIjc4MDUwNiJdfX0.v3BIImGYUc2OTRNWFGVyq6wfQdLlizfrBdP5O0qMO2k';

  try {

    const headers = {
      "accept": "application/json, text/plain, */*",
      "accept-language": "es-US,es;q=0.9,en-US;q=0.8,en;q=0.7,es-419;q=0.6,fr;q=0.5",
      "content-type": "multipart/form-data; boundary=----WebKitFormBoundaryEu13c0NxamHmuM6Z",
      "sec-ch-ua": "\"Chromium\";v=\"104\", \" Not A;Brand\";v=\"99\", \"Google Chrome\";v=\"104\"",
      "sec-ch-ua-mobile": "?0",
      "sec-ch-ua-platform": "\"Linux\"",
      "sec-fetch-dest": "empty",
      "sec-fetch-mode": "cors",
      "sec-fetch-site": "cross-site",
      "Referer": "https://www.clarovideo.com/",
      "Referrer-Policy": "strict-origin-when-cross-origin"
    };

    const response = await fetch(streamUrl + "&stream_type="+streamType + groupId, {
      "headers": headers,
      "body": '"------WebKitFormBoundaryEu13c0NxamHmuM6Z\r\nContent-Disposition: form-data; name=\"user_token\"\r\n\r\n"' +
          payway_token + '"\r\n------WebKitFormBoundaryEu13c0NxamHmuM6Z\r\nContent-Disposition: form-data; name=\"payway_token\"\r\n\r\n' +
          payway_token + '\r\n------WebKitFormBoundaryEu13c0NxamHmuM6Z--\r\n"',
      "method": "POST"
    });

    const data = await response.json();
    let url  = data.response?.media?.video_url;

    const urlRes = await fetch(url, {
      "credentials": "omit",
      "headers": headers,
      "method": "GET",
      "mode": "cors"
    });

    const dataResp = await urlRes.text();

    res.send(dataResp);

  } catch (error) {
    console.error('Error fetching data:', error);
    res.status(500).send('Error fetching data');
  }
});

module.exports = router;
