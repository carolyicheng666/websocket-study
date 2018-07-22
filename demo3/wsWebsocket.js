var ws = require("nodejs-websocket")

var port = 3000

var clientCount = 0

// Scream server example: "hi" -> "HI!!!"
var server = ws.createServer(function (conn) {
  console.log("New connection")
  clientCount++
  conn.nickName = "user" + clientCount
  broadcast(conn.nickName + " comes in")
	conn.on("text", function (str) {
		console.log("Received "+str)
		broadcast(str)
	})
	conn.on("close", function (code, reason) {
    console.log("Connection closed")
    broadcast(conn.nickName + " left")
  })
  conn.on("error", function (err) {
    console.log("error:" + err)
  })
}).listen(port)

console.log("websocket server listening on port: " + port)

var broadcast = function(str) {
  server.connections.forEach(function(connection) {
    connection.sendText(str)
  })
}