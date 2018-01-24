//basic app setup
requirejs.config({
  //By default load any module IDs from src
  "baseUrl": "dev",
  "paths": {
      "d3": ["//d3js.org/d3.v4.min"],
      "chance": ["//cdnjs.cloudflare.com/ajax/libs/chance/1.0.8/chance.min"],
      "jquery" : ["//cdnjs.cloudflare.com/ajax/libs/jquery/3.3.1/jquery.min"],
      "popper" : ["//cdnjs.cloudflare.com/ajax/libs/popper.js/1.11.0/umd/popper.min"],
      "bootstrap" :  ["//maxcdn.bootstrapcdn.com/bootstrap/4.0.0-beta.2/js/bootstrap.min"],
      "vue" :  ["//cdnjs.cloudflare.com/ajax/libs/vue/2.5.2/vue"],
      "localforage" : ["//cdnjs.cloudflare.com/ajax/libs/localforage/1.5.0/localforage.min"],
      "simplex" : ["//cdnjs.cloudflare.com/ajax/libs/simplex-noise/2.3.0/simplex-noise.min"],
      "Noty": ["//cdnjs.cloudflare.com/ajax/libs/noty/3.1.2/noty.min"],
      "rot" : ["//cdnjs.cloudflare.com/ajax/libs/rot.js/0.6.0/rot.min.js"],
  },
  "shim": {
    "bootstrap" : { "deps" :['jquery','popper'] },
  },
});

// Load the main app module to start the app
requirejs(["main"]);
