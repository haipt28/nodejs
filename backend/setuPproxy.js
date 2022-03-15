const { createProxyMiddleware } = require("http-proxy-middleware")

module.exports = app => {
    app.use(
        createProxyMiddleware('/tutorials', {
            target: 'http://localhost:8080/api/tutorials',
            changeOrigin: true
        })
    )
}