const express = require('express')
const app = express()
const morgan = require('morgan');

app.use(morgan);

app.get('/*', function (req, res) {
  res.send(`<!DOCTYPE html>
              <html> 
                <head>
                </head>
                <body ng-app="mathapp">
                    <a ui-sref="hello" ui-sref-active="active">Hello</a>
                    <a ui-sref="about" ui-sref-active="active">About</a>

                    <ui-view></ui-view>
                    <script src='http://localhost:8080/dist/bundle.js'></script>
                </body>
              </html>`)
})

app.listen(3000, function () {
  console.log('Example app listening on port 3000!')
})