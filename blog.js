const http = require('http');
const fs = require('fs');

http.createServer((req, res) => {
  getTitles(res);
}).listen(9990, '127.0.0.1');


function getTitles (res) {
  fs.readFile('./titles.json', (err, data) =>{
    if(err){
      hadError(err)
    } else{
      getTemplate(JSON.parse(data.toString()), res);
    }
  })
}

function getTemplate( titles, res ){
  fs.readFile('./template.html', (err, data) =>{
    if(err){
      hadError(err)
    } else{
      formatHtml(titles, data.toString(), res);
    }
  })
}

function formatHtml( titles, tmpl ,res){
  const html = tmpl.replace('%', titles.join('</li><li>'))
  res.writeHead(200, {'Content-Type':'text/html'})
  res.end(html)

}

function hadError(err ,res){
  console.log(err);
  res.end('server err fp')
}
