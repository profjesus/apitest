const express = require('express')
const request = require('request');
const xpath = require('xpath')
  , dom = require('xmldom').DOMParser;

const app = express();
const port = 3000;

app.use(express.static('public'));

app.get('/predicion/:vila', (req, resp) => {
  request('http://servizos.meteogalicia.gal/rss/predicion/rssLocalidades.action?idZona=' + req.params.vila
    + '&dia=-1&request_locale=gl', (err, res, body) => {
    if (err) { return console.log(err); }
    var doc = new dom().parseFromString(body);
    var nodes = xpath.select("/rss/channel/item[1]/description", doc);
    resp.send(nodes[0].firstChild.data);
  });
});

app.listen(port, () => console.log(`Example app listening on port ${port}!`));
