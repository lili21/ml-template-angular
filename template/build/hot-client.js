var hot = require('webpack-hot-middleware/client?noInfo=true&reload=true')

hot.subscribe(function (event) {
  if (event.action === 'reload') {
    window.location.reload()
  } else {}
})
