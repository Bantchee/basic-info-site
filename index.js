const http = require('http');
const fs = require('fs')
const url = require('url');

const port = 8080;

const server = http.createServer((req, res) => {
    const q = url.parse(req.url, true);
    let filename = "." + q.pathname;
    if(filename === "./") {
        filename = "./index.html"
    }

    fs.readFile(filename, (err, data) => {
        if (err) {
            res.writeHead(404, {'Content-Type': 'text/html'});
            return res.end("404 Not Found");
        }
        res.statusCode = 200;
        res.setHeader('Content-Type', "text/html");
        res.write(data);
        return res.end();
    });
});

server.listen(port, () => {
    console.log(`Server running at localhost:${port}`);
})