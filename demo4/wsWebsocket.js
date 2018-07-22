var ws = require("nodejs-websocket")

var port = 3000

var clientCount = 0

// Scream server example: "hi" -> "HI!!!"
var server = ws.createServer(function (conn) {
  console.log("New connection")
  clientCount++
  conn.nickName = "user" + clientCount
  var mes = {}
  mes.type = "enter"
  mes.data = conn.nickName + " comes in"
  broadcast(JSON.stringify(mes))
	conn.on("text", function (str) {
    console.log("Received "+str)
    var mes = {}
    mes.type = "message"
    mes.data = conn.nickName + " says: " + str
		broadcast(JSON.stringify(mes))
	})
	conn.on("close", function (code, reason) {
    console.log("Connection closed")
    var mes = {}
    mes.type = "leave"
    mes.data = conn.nickName + " left"
		broadcast(JSON.stringify(mes))
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