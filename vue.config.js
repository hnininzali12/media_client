module.exports = {
    publicPath: process.env.NODE_ENV === 'production' ?
        '/my_media_client/' :
        '/'
}