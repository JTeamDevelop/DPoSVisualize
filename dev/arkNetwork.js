//Load Web App JavaScript Dependencies/Plugins
define(function(require) {
  let node = "https://api.arknode.net/api"
    , nethash = "6e84d08bd299ed97c212c886c98a57e36545c8f5d645ca7eeae63a8bd62d8988"
    , version = "1.0.1"
    , port = 4001;

  let Delegates = []
    , updated = false;

  const arkVoterCall = (D)=>{
    return new Promise((resolve,reject)=>{
      $.get(node + "/delegates/voters", {
        publicKey: D.publicKey,
        nethash: nethash,
        version: version,
        port: port,
      }).done(function(data) {
        updated = true;
        //filter for 0 
        D.children = data.accounts.filter((a)=>{
          a.balance = Number(a.balance)
          if (a.balance > 0) {
            //balance is the area - compute the radius
            a.value = Math.sqrt(a.balance / Math.PI)
          }
          return a.balance > 0
        }
        )
      })
    }
    )
  }

  const arkDelegateCall = (offset)=>{
    return new Promise((resolve,reject)=>{
      $.get(node + "/delegates", {
        nethash: nethash,
        version: version,
        port: port,
        limit: 50,
        offset: offset
      }).done(function(data) {
        Delegates = Delegates.concat(data.delegates)
        resolve(data)
      })
    }
    )
  }

  const allArkVoters = ()=>{
    Delegates.forEach((D,i)=>{
      //don't overload the server
      setTimeout(function() {
        arkVoterCall(D).then((data)=>{}
        )
      }, i * 100)
    }
    )
  }

  const allArkDelegates = ()=>{
    let count = 0
      , total = 0;

    arkDelegateCall(0).then((data)=>{
      updated = true
      //update total
      total = data.totalCount
      //update count 
      count += 50
      //loop to get all
      for (let i = count; i < total; i += 50) {
        //don't overload the server
        setTimeout(function() {
          arkDelegateCall(i).then((data)=>{
            //log
            if (i + 50 > total) {
              //pull all the voters
              allArkVoters()
            }
          }
          )
        }, i * 10);
      }
    }
    )
  }

  return {
    init: allArkDelegates,
    get data() {
      return Delegates
    },
    get updated() {
      return updated
    },
    set updated(val) {
      updated = val
    }
  }
})
