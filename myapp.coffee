express = require 'express'

module.exports = class MyApp

  constructor:(@graphDb)->
    graphDb = @graphDb

    app = express.createServer express.logger()

    app.configure ->
      app.set 'views', __dirname + '/public'
      app.set 'view options', layout:false
      app.use express.methodOverride()
      app.use express.bodyParser()
      app.use app.router
      app.use express.static(__dirname+'/static')


    indexPromise = graphDb.index.createNodeIndex "myIndex"
    indexPromise.then((index)->
        app.get '/', (request, response)->
          index.query("name:*").then((nodes)->
              response.render 'index.jade', nodes:nodes
          )

        app.post '/', (request, response)->
          name = request.body.name
          node = graphDb.node {name:name}

          index.index(node, "name", name).then(()->
              response.redirect "/"
          )
    )

    app.get('/nodes', (request, response)->
      graphDb.cypher.execute("start n=node(*) return n;").then(
        (res2)->
          console.log "Query Executed"
          console.log res2.data[0]
          nodedata=(ntmp[0]["data"] for ntmp in res2.data)
          response.render 'tester.jade', displaydata:nodedata
      )
    )

    app.get('/arrows', (request, response)->
      graphDb.cypher.execute("start n=rel(*) return n;").then(
        (res2)->
          console.log "Query Executed"
          console.log res2.data[0]
          arrdata=([ntmp[0]["start"],ntmp[0]["end"],ntmp[0]["data"]] for ntmp in res2.data)
          response.render 'tester.jade', displaydata:arrdata
      )
    )

              
    

    port = process.env.PORT || 3000
    app.listen port, -> console.log("Listening on " + port)
