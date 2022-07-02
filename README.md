# moving-vue

## Pour démarrer front dans 1ere console

```
npm run serve
```

## Pour démarrer front dans 2eme console

```
sass src/assets/css/scss/main.scss src/assets/css/main.css --watch 
```

### Si souci démarrage front

Set-ExecutionPolicy Unrestricted -Scope CurrentUser -Force

### Si souci CORS

**Extension chrome** http://ome.google.com/webstore/detail/cors-unblock/lfhmikememgdcahcdlaciloancbhjino?hl=fr

**Configuration vuejs** https://cli.vuejs.org/config/#devserver-proxy

```
module.exports = {
  devServer: {
    proxy: 'http://moving-forward.local'
  }
}
```