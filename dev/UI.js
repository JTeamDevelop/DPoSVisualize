define(function(require) {
  const Vue = require("vue")
    , //character pool
  pool = 'abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789';

  return (App)=>{

    //creates the VUE js instance
    let UI = new Vue({
      el: "#app",
      data: {
        netLink: "https://ark.io/",
        netName: "Ark.io Network"
      },
    })

    return UI;

  }
})
