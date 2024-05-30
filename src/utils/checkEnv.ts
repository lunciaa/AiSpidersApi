const required_variables = [
  'SSL_KEY', 'SSL_CERT', 'COOKIES_SECRET', 'CSRF_SECRET', 'REFRESH_TOKEN_SECRET', 'ACCESS_TOKEN_SECRET'
]

export default () => {
  try {
    for(let env of required_variables) {
      if(!process.env[env])
        throw Error(`No process.env.${env}`)
    }
  } catch(err) {
    console.error(err)
    process.exit(1)
  }

}