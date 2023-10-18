const http = require("http")
const fs = require("fs")
const server = http.createServer()

server.listen(8000, () => {
    console.log("SERVER IS LISTENING ON PORT 5000")
})

server.on("request", (req, res) => {
    if (req.url === "/") {
        res.end("Welcome to our home page")
    }
    else if (req.url === "/about" && req.method === "GET") {
        fs.readFile("about.html", (err, data) => {
            if (err) {
                console.log(err)
                res.end("File not found")
            }
            else {
                res.statusCode = 200
                res.setHeader("Content-Type", "text/html")
                res.end(data)
            }
        })
    }
    if (req.url === '/streamc') {
        let total = 10
        let i = 0
        res.setHeader('Content-Type', 'text/event-stream');
        res.setHeader('Cache-Control', 'no-cache');

        // Send a new message to the client every second
        const interval = setInterval(() => {
            i += 1
            res.write(`data: ${new Date().toISOString()}\n\n`);
            if (i === total) {
                clearInterval(interval);
                res.end();
            }
        }, 1000);

        // End the response when the client disconnects
        req.on('close', () => {
            clearInterval(interval);
            res.end();
        });
    }
    if (req.url === "/stream") {
        if (req.method === "POST") {

        }
        else if (req.method === "GET") {
            let count = 0
            let finalCount = 30
            res.setHeader('Content-Type', 'text/event-stream');
            res.setHeader('Cache-Control', 'no-cache');
            let intervaId = setInterval(() => {
                let date = new Date()
                let time = date.toTimeString()
                count += 1
                res.statusCode = 206
                res.write(time)
                console.log(count)
                if (count === finalCount) {
                    clearInterval(intervaId)
                    res.statusCode = 200
                    res.end()
                }
            }, 2000)

        }
    }
    if (req.url === "/contact") {
        res.end("Welcome to our contact page")
    }
})

