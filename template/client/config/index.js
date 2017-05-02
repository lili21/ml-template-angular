// $ENV, faas_testing | faas_beta | faas_production
var env = (window.$ENV || localStorage.getItem('env') || 'development').split('_').pop()

const config = require('./' + env).default

export default config
// module.exports = config
