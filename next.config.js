module.exports = {
    env: {
        API_URI: process.env.NEXT_API_URI,
        PUBLIC_URI : process.env.NEXT_PUBLIC_URI,
    },
    images: {
      domains: ['localhost', 'newstoday-server.herokuapp.com']
    }
}
