//Load Web App JavaScript Dependencies/Plugins
define(function(require) {
  //load bootstrap and jquery
  require("bootstrap")
  //pull required libraries
  const d3 = require("d3")
    , Vue = require("vue")
    //setup the ark network interface
    , arkNetwork = require("./arkNetwork")
    , updated = false;

  let App = {
    UI : require("./UI")(this)
  }

  //create a D3 pack
  const d3PackDisplay = (delegates)=>{
    let root = d3.hierarchy({
      children: delegates
    }).each(function(d) {
      if (d.data.hasOwnProperty("vote")) {
        d.data.vote = Number(d.data.vote)
        //vote is the area - compute the radius
        d.value = Math.sqrt(d.data.vote / Math.PI)

        d.delegate = true
        d.color = parseInt(d.data.publicKey.slice(4, 5), 16)
        d.address = d.data.address
      } else if (d.data.hasOwnProperty("value")) {
        d.value = d.data.value
        d.color = parseInt(d.data.publicKey.slice(4, 5), 16)
        d.address = d.data.address
      } else {
        d.value = 0
        d.color = 0
      }
    });

    let leaves = pack(root).descendants()

    let node = svg.selectAll(".node").data(leaves).enter().append("g").attr("class", "node").attr("transform", function(d) {
      return "translate(" + d.x + "," + d.y + ")";
    });

    node.append("circle").attr("id", function(d) {
      return d.id;
    }).attr("r", function(d) {
      return d.r;
    }).style("fill", function(d) {
      return color(d.color);
    });

    node.append("title").text(function(d) {
      return d.address + " " + Math.pow(d.value, 2) * Math.PI;
    });
  }

  let svg = d3.select("svg")
    , width = +svg.attr("width")
    , height = +svg.attr("height");

  let format = d3.format(",d");

  let color = d3.scaleOrdinal(d3.schemeCategory20c);

  let pack = d3.pack().size([width, height]).padding(1.5);

  //initialize
  arkNetwork.init()
  setInterval(()=>{
    if (arkNetwork.updated) {
      $("svg").empty()
      d3PackDisplay(arkNetwork.data)
      arkNetwork.updated = false
    }
  }
  , 2000)

})
