// Just Dance Connect Core
// v2.0 (DEVLAB_35969486-e94d-47ef-99f4-7a20be886e5c)
// This server code is private and is never meant to be used in another mod. 

const express = require("express");
const fs = require("fs");
const https = require("https");
const app = express();
app.use(express.json());
app.use(require("express-useragent").express());



const CustomDB = require("./DATABASE/COLLECTABLES.json");
const Quest = require("./DATABASE/QUESTDB.json");
const Bosses = require("./DATABASE/wdf/bosses.json");
const QJSONCarousel = require("./DATABASE/quest.json");
const v1 = require("./v1/config.json");
const v2 = require("./v2/services.json");
const v3 = require("./V3/users/0/user.json");
const DM = require("./DATABASE/DM_BLOCK.json");
const SKUConstants = require("./SKU/sku-constant.json");
const WDF = require("./DATABASE/wdf/room-asign.json");
const Ping = require("./DATABASE/PINGNOTIF.json");

const upsell = require("./DATABASE/upsell-video.json");
const CarouselPackages = require("./DATABASE/carpack.json");
const RoomPC = require("./DATABASE/wdf/jd2017pc_room.json");
const Time = require("./DATABASE/server-time.json");
const Subs = require("./V3/users/0/subs.json");
const Avatars = require("./DATABASE/avatars.json");

var room = require("./DATABASE/wdf/rooms.json").alignroom;
var prodwsurl = "https://jmcs-prod.just-dance.com";
var bosses = require("./DATABASE/wdf/bosses.json");
var XMLHttpRequest = require("xmlhttprequest").XMLHttpRequest;

const Tiles = require('./home/v1/tiles.json');
const AliasDB = require('./aliasdb/v1/aliases.json');

var Cat1 = [];
var Cat2 = [];
var Cat3 = [];
var Cat4 = [];

var arraybeta = [];

var jdconnect = {
  interactiveconfig: {
	  playerseason: {
		  isseasonactive: true,
		  seasonnumber: 2,
		  seasonname: "Versus",
		  seasonplaylist: ["Finesse","BubblePop","BlackWidow"]
	  },
    wdfoverwrite: {
      wdfoverwriteenabled: false,
      wdfoverwritehappyhour: '{"__class":"HappyHoursInfo","start":1615651200,"end":1615653000,"running":false}',
      wdfoverwritelist: ["BlackWidow","Finesse"],
    },
	  contentdelivery: {
		  iscdnenabled: false,
		  publiccdn: "",
		  privatecdn: ""
	  }
  },
  core : {
	currenauths: [],
	currentbeta: [],
	
	// DO NOT MODIFY THIS LINE WITHOUT PERMISSION
	beta_uplayers: ["cupcakkeLuv","justdancingsam","litenitee","MeowMeowMeyo","liorandron123","NicolasPlayz","AlexPokeguy4","StevenSBJD1702","justAJdance","itayblanka"],
	
    requestcheck: function(request) {
	 // PC, Switch, Switch, Switch, WiiU, WiiU
     if(request.useragent.source == "UbiServices_SDK_HTTP_Client_4.2.9_PC32_ansi_static" || request.useragent.source == "UbiServices_SDK_HTTP_Client_4.2.21_NNX64" || request.useragent.source == "UbiServices_SDK_HTTP_Client_2017.Final.4_SWITCH64" || request.useragent.source == "UbiServices_SDK_2017.Final.28_SWITCH64" || request.useragent.source == "UbiServices_SDK_HTTP_Client_2017.Final.4_WIIU" || request.useragent.source == "UbiServices_SDK_2017.Final.28_WIIU" || request.useragent.source == "UbiServices_SDK_HTTP_Client_4.2.9_WIIU" && request.header("Authorization")) {
         return true;
     } else { 
       return 403;
       console.log(request.getRemoteAddr() + " tried to get into " + request.url + " (403 UAGE)")
     }
    },
    getskuid: function(request) {
      if (request.header("X-SkuId")) {
        return request.header("X-SkuId");
      } else {
        return false;
      }
    },
	interactivemanagement: {
		checkplayer: function(auth) {
			if(jdconnect.core.currentbeta[auth] == undefined) {
				return false;
			} else {
				return true;
			}
		}
	}
  },
  Carousel: {
    getsearchrequest: function(responsecarousel,request) {
    },
    returncatalog: function() {
      party = null
      coop = null
      sweat = null
	  search = null
      Cat1 = [];
      Cat2 = [];
      Cat3 = [];
      Cat4 = [];
    
      var songdb = null;
      songdb = require("./DATABASE/Platforms/jd2017-pc-ww/SONGDBS.json")
      var array = [];
	  
	 var songnum = 0
		for (var song in songdb) {
    // skip loop if the property is from prototype
    var obj = songdb[song];
	songnum = songnum + 1
	if (obj.tags["betaSong"] == undefined) {
		array.push(obj.mapName)
	} else {
		array.push(obj.mapName)
		arraybeta.push(obj.mapName)
	}
}
var songnumnx = 0
		//for (var song in require("./DATABASE/Platforms/jd2019-nx-all/SONGDBS.json")) {
           // skip loop if the property is from prototype
	    //   songnumnx = songnumnx + 1
      //  }
		var songnumwu = 0
		//for (var song in require("./DATABASE/Platforms/jd2019-wiiu-noa/SONGDBS.json")) {
           // skip loop if the property is from prototype
	       //songnumwu = songnumwu + 1
       // }
		console.log("JDConnect now has " + songnum + " songs on PC!")
		console.log("JDConnect now has " + songnumnx + " songs on NX!")
		console.log("JDConnect now has " + songnumwu + " songs on WiiU!")
		
      array.forEach(function(arrayItem) {
        if (songdb[arrayItem] != null) {
        var firstletter = songdb[arrayItem].title.charAt(0);
        if (
          firstletter == "A" ||
          firstletter == "a" ||
          firstletter == "B" ||
          firstletter == "b" ||
          firstletter == "C" ||
          firstletter == "c" ||
          firstletter == "D" ||
          firstletter == "d" ||
          firstletter == "E" ||
          firstletter == "e"
        ) {
          Cat1.push(arrayItem);
        }
        if (
          firstletter == "F" ||
          firstletter == "f" ||
          firstletter == "G" ||
          firstletter == "g" ||
          firstletter == "H" ||
          firstletter == "h" ||
          firstletter == "I" ||
          firstletter == "i" ||
          firstletter == "ı" ||
          firstletter == "J" ||
          firstletter == "j"
        ) {
          Cat2.push(arrayItem);
        }
        if (
          firstletter == "K" ||
          firstletter == "k" ||
          firstletter == "L" ||
          firstletter == "l" ||
          firstletter == "M" ||
          firstletter == "m" ||
          firstletter == "N" ||
          firstletter == "n" ||
          firstletter == "O" ||
          firstletter == "o" ||
          firstletter == "P" ||
          firstletter == "p" ||
          firstletter == "Q" ||
          firstletter == "q" ||
          firstletter == "R" ||
          firstletter == "r"
        ) {
          Cat3.push(arrayItem);
        }
        if (
          firstletter == "S" ||
          firstletter == "s" ||
          firstletter == "T" ||
          firstletter == "t" ||
          firstletter == "U" ||
          firstletter == "u" ||
          firstletter == "V" ||
          firstletter == "v" ||
          firstletter == "W" ||
          firstletter == "w" ||
          firstletter == "X" ||
          firstletter == "x" ||
          firstletter == "Y" ||
          firstletter == "y" ||
          firstletter == "Z" ||
          firstletter == "z"
        ) {
          Cat4.push(arrayItem);
        }
      }
      });
      var partyoff3 = null;
      partyoff3 = require("./DATABASE/partyoff.json");
      var partyoff = partyoff3;
      var catalog = null;
      var items = null;
      catalog = partyoff.categories;
      Cat1.forEach(function(arrayItem) {
        items = null;
        items = catalog[19].items;
        var obj =
          '{"__class":"Item","isc":"grp_cover","act":"ui_component_base","components":[{"__class":"JD_CarouselContentComponent_Song","mapName":"' +
          arrayItem +
          '"}],"actionList":"partyMap"}';
        items.push(JSON.parse(obj));
      });
      Cat2.forEach(function(arrayItem) {
        var items2 = null;
        items2 = catalog[20].items;
        var obj =
          '{"__class":"Item","isc":"grp_cover","act":"ui_component_base","components":[{"__class":"JD_CarouselContentComponent_Song","mapName":"' +
          arrayItem +
          '"}],"actionList":"partyMap"}';
        items2.push(JSON.parse(obj));
      });
      Cat3.forEach(function(arrayItem) {
        var items3 = null;
        items3 = catalog[21].items;
        var obj =
          '{"__class":"Item","isc":"grp_cover","act":"ui_component_base","components":[{"__class":"JD_CarouselContentComponent_Song","mapName":"' +
          arrayItem +
          '"}],"actionList":"partyMap"}';
        items3.push(JSON.parse(obj));
      });
      Cat4.forEach(function(arrayItem) {
        var items4 = null;
        items4 = catalog[22].items;
        var obj =
          '{"__class":"Item","isc":"grp_cover","act":"ui_component_base","components":[{"__class":"JD_CarouselContentComponent_Song","mapName":"' +
          arrayItem +
          '"}],"actionList":"partyMap"}';
        items4.push(JSON.parse(obj));
      });
	  if (jdconnect.interactiveconfig.playerseason.isseasonactive == true){
	  catalog[23].title = "[SEASON " + jdconnect.interactiveconfig.playerseason.seasonnumber + "] " + jdconnect.interactiveconfig.playerseason.seasonname;
	  jdconnect.interactiveconfig.playerseason.seasonplaylist.forEach(function(arrayItem) {
        var items4 = null;
        items4 = catalog[23].items;
        var obj =
          '{"__class":"Item","isc":"grp_cover","act":"ui_component_base","components":[{"__class":"JD_CarouselContentComponent_Song","mapName":"' +
          arrayItem +
          '"}],"actionList":"partyMap"}';
        items4.push(JSON.parse(obj));
      });
	  };
      party = JSON.stringify(partyoff);
	  
	  
          var partyoff3 = null;
      partyoff3 = require("./DATABASE/searchoff.json");
      var partyoff = partyoff3;
      var catalog = null;
      var items = null;
      catalog = partyoff.categories;
      Cat1.forEach(function(arrayItem) {
        items = null;
        items = catalog[19].items;
        var obj =
          '{"__class":"Item","isc":"grp_cover","act":"ui_component_base","components":[{"__class":"JD_CarouselContentComponent_Song","mapName":"' +
          arrayItem +
          '"}],"actionList":"partyMap"}';
        items.push(JSON.parse(obj));
      });
      Cat2.forEach(function(arrayItem) {
        var items2 = null;
        items2 = catalog[20].items;
        var obj =
          '{"__class":"Item","isc":"grp_cover","act":"ui_component_base","components":[{"__class":"JD_CarouselContentComponent_Song","mapName":"' +
          arrayItem +
          '"}],"actionList":"partyMap"}';
        items2.push(JSON.parse(obj));
      });
      Cat3.forEach(function(arrayItem) {
        var items3 = null;
        items3 = catalog[21].items;
        var obj =
          '{"__class":"Item","isc":"grp_cover","act":"ui_component_base","components":[{"__class":"JD_CarouselContentComponent_Song","mapName":"' +
          arrayItem +
          '"}],"actionList":"partyMap"}';
        items3.push(JSON.parse(obj));
      });
      Cat4.forEach(function(arrayItem) {
        var items4 = null;
        items4 = catalog[22].items;
        var obj =
          '{"__class":"Item","isc":"grp_cover","act":"ui_component_base","components":[{"__class":"JD_CarouselContentComponent_Song","mapName":"' +
          arrayItem +
          '"}],"actionList":"partyMap"}';
        items4.push(JSON.parse(obj));
      });
      search = JSON.stringify(partyoff);
	
      var partyoff4 = null;
      partyoff4 = require("./DATABASE/sweatoff.json");
      partyoff = partyoff4;
      catalog = null;
      items = null;
      catalog = partyoff.categories;
      Cat1.forEach(function(arrayItem) {
        items = catalog[13].items;
        var obj =
          '{"__class":"Item","isc":"grp_cover","act":"ui_component_base","components":[{"__class":"JD_CarouselContentComponent_Song","mapName":"' +
          arrayItem +
          '"}],"actionList":"partyMap"}';
        items.push(JSON.parse(obj));
      });
      Cat2.forEach(function(arrayItem) {
        var items2 = null;
        items2 = catalog[14].items;
        var obj =
          '{"__class":"Item","isc":"grp_cover","act":"ui_component_base","components":[{"__class":"JD_CarouselContentComponent_Song","mapName":"' +
          arrayItem +
          '"}],"actionList":"partyMap"}';
        items2.push(JSON.parse(obj));
      });
      Cat3.forEach(function(arrayItem) {
        var items3 = null;
        items3 = catalog[15].items;
        var obj =
          '{"__class":"Item","isc":"grp_cover","act":"ui_component_base","components":[{"__class":"JD_CarouselContentComponent_Song","mapName":"' +
          arrayItem +
          '"}],"actionList":"partyMap"}';
        items3.push(JSON.parse(obj));
      });
      Cat4.forEach(function(arrayItem) {
        var items4 = null;
        items4 = catalog[16].items;
        var obj =
          '{"__class":"Item","isc":"grp_cover","act":"ui_component_base","components":[{"__class":"JD_CarouselContentComponent_Song","mapName":"' +
          arrayItem +
          '"}],"actionList":"partyMap"}';
        items4.push(JSON.parse(obj));
      });
      sweat = JSON.stringify(partyoff);
    
      var partyoff4 = null;
      partyoff4 = require("./DATABASE/coopoff.json");
      partyoff = partyoff4;
      catalog = null;
      items = null;
      catalog = partyoff.categories;
      Cat1.forEach(function(arrayItem) {
        items = null;
        items = catalog[13].items;
        var obj =
          '{"__class":"Item","isc":"grp_cover","act":"ui_component_base","components":[{"__class":"JD_CarouselContentComponent_Song","mapName":"' +
          arrayItem +
          '"}],"actionList":"partyMap"}';
        items.push(JSON.parse(obj));
      });
      Cat2.forEach(function(arrayItem) {
        var items2 = null;
        items2 = catalog[14].items;
        var obj =
          '{"__class":"Item","isc":"grp_cover","act":"ui_component_base","components":[{"__class":"JD_CarouselContentComponent_Song","mapName":"' +
          arrayItem +
          '"}],"actionList":"partyMap"}';
        items2.push(JSON.parse(obj));
      });
      Cat3.forEach(function(arrayItem) {
        var items3 = null;
        items3 = catalog[15].items;
        var obj =
          '{"__class":"Item","isc":"grp_cover","act":"ui_component_base","components":[{"__class":"JD_CarouselContentComponent_Song","mapName":"' +
          arrayItem +
          '"}],"actionList":"partyMap"}';
        items3.push(JSON.parse(obj));
      });
      Cat4.forEach(function(arrayItem) {
        var items4 = null;
        items4 = catalog[16].items;
        var obj =
          '{"__class":"Item","isc":"grp_cover","act":"ui_component_base","components":[{"__class":"JD_CarouselContentComponent_Song","mapName":"' +
          arrayItem +
          '"}],"actionList":"partyMap"}';
        items4.push(JSON.parse(obj));
      });
      coop = JSON.stringify(partyoff);
    
    }
  }
}

app.use((req, res, next) => {
   res.set('Cache-Control', 'no-store')
   if (req.url !== "/wdf/v1/api/rooms" && req.url.includes("/jmcs") !== true){
     if (jdconnect.core.requestcheck(req) == true) {
        next()
	 } else {
     return res.sendStatus(jdconnect.core.requestcheck(req))
	}
  } else {
	  next()
  }
})

var uuid = require("uuid-random");

var transactionid = null;
var transactiondate = null;

var party = null;
var sweat = null;
var coop = null;

var fullurl = null;

app.get("/jmcs/public/map/:codename/:file/*", (request,response) => {
	  var md5w = request.url.split('/').pop()
	  var md5 = md5w.replace('.webm', '')
	  response.send(md5.toString())
})
app.get("/jmcs/css/:file", (req,res)=> {
  res.sendFile(process.cwd() + "/jmcs/css/" + req.params.file)
})
app.get("/jmcs/*", (req,res)=> {
  res.sendFile(process.cwd() + "/jmcs/jmcs.html")
})

app.post('/profile/v2/filter-players', function(request, response) {
  response.send('["00000000-0000-0000-0000-000000000000","00000000-0000-0000-0000-000000000000","00000000-0000-0000-0000-000000000000","00000000-0000-0000-0000-000000000000","00000000-0000-0000-0000-000000000000","00000000-0000-0000-0000-000000000000","00000000-0000-0000-0000-000000000000","00000000-0000-0000-0000-000000000000","00000000-0000-0000-0000-000000000000"]')
})

var requestCountry = require('request-country');
app.get('/profile/v2/country', function(request, response) {
   var country = requestCountry(request);
   if (country == false) { country = "TR"; }
  response.send('{ "country": "' + country + '" }')
})

app.get('/playlistdb/v1/playlists', function(request,response) {
  response.send(require('./playlistdb/v1/playlists.json'))
})



app.get("/packages/:version/sku-packages", function(request, response) {
  if (jdconnect.core.requestcheck(request) == true) {
	  if (request.useragent.source == "UbiServices_SDK_2017.Final.28_SWITCH64" || request.header('X-SkuId') == "jd2018-nx-all" || request.header("X-SkuId") == "jd2017-nx-all") {
    response.send(require("./DATABASE/Platforms/jd2019-nx-all/sku-packages.json"))
	  } else {
		if (request.useragent.source == "UbiServices_SDK_HTTP_Client_2017.Final.4_WIIU" || request.useragent.source == "UbiServices_SDK_2017.Final.28_WIIU" || request.useragent.source == "UbiServices_SDK_HTTP_Client_4.2.9_WIIU") {
		    response.send(require("./DATABASE/Platforms/jd2019-wiiu-noa/sku-packages.json"));
		}
		if (request.useragent.source == "UbiServices_SDK_HTTP_Client_4.2.9_PC32_ansi_static") {
		    response.send(require("./DATABASE/Platforms/jd2017-pc-ww/sku-packages.json"));
		}
	  }
    } else {
      response.sendStatus(jdconnect.core.requestcheck(request))
    }
});

app.get("/songdb/:version/songs", function(request, response) {
  if (jdconnect.core.requestcheck(request) == true) {
	  console.log("Accessed songdb " + request.params.version)
	  if (request.useragent.source == "UbiServices_SDK_2017.Final.28_SWITCH64" || request.header('X-SkuId') == "jd2018-nx-all" || request.header("X-SkuId") == "jd2017-nx-all") {
        response.send(require("./DATABASE/Platforms/jd2019-nx-all/SONGDBS.json"))
	  }
		if (request.useragent.source == "UbiServices_SDK_HTTP_Client_2017.Final.4_WIIU" || request.useragent.source == "UbiServices_SDK_2017.Final.28_WIIU" || request.useragent.source == "UbiServices_SDK_HTTP_Client_4.2.9_WIIU") {
		    response.send(require("./DATABASE/Platforms/jd2019-wiiu-noa/SONGDBS.json"));
		}
		if (request.useragent.source == "UbiServices_SDK_HTTP_Client_4.2.9_PC32_ansi_static") {
			if (request.header("X-SkuId") !== "jd2021-pc-custom") { 
				response.send(require("./DATABASE/Platforms/jd2017-pc-ww/SONGDBS.json")); 
			} else {
				songdb = require("./DATABASE/Platforms/jd2017-pc-ww/SONGDBS.json");
				for (var song in songdb) {
					// skip loop if the property is from prototype
					var obj = songdb[song];
					if(obj.assets == undefined) {
					} else {
						obj.assets["banner_bkgImageUrl"] = obj.assets["map_bkgImageUrl"]
					}
				}
				response.send(songdb)
		    }
	  }
    } else {
      response.sendStatus(jdconnect.core.requestcheck(request))
    }
});
app.get('/session-quest/v1/', function(request, response) {
  response.send('{ "__class": "SessionQuestService::QuestData", "newReleases": [] }')
})

app.get('/leaderboard/v1/maps/:map/dancer-of-the-week', function(request,response) {
  if (jdconnect.core.requestcheck(request)) {
    var xhr = new XMLHttpRequest();
    var ticket = request.header("Authorization")
    var appid = request.header("X-SkuId")
    xhr.open('GET', prodwsurl + '/leaderboard/v1/maps/' + request.params.map + '/dancer-of-the-week', false);
    xhr.setRequestHeader('Content-Type', 'application/json');
    xhr.setRequestHeader('X-SkuId', appid);
    xhr.setRequestHeader('Authorization', ticket);
    xhr.send();
    response.send(xhr.responseText);
  } else {
    response.send(jdconnect.core.requestcheck(request));
  }
})

app.get('/aliasdb/v1/aliases', function(request, response) {
  response.send(AliasDB)
})

app.post('/home/v1/tiles', function(request, response) {
  response.send(Tiles)
})

app.get("/dance-machine/v1/blocks", function(request, response) {
  response.send(DM);
});
app.get("/community-remix/v1/active-contest", function(request, response) {
  response.send({});
});

app.post("/carousel/v2/pages/quests", function(request, response) {
  response.send(QJSONCarousel);
});


app.post("/carousel/v2/pages/party", (request, response) => {
  if (jdconnect.core.requestcheck(request) == true) {
	  if (request.body.searchString == "") {
      response.send(party);
	  } else {
            
		
		var songdb = require("./DATABASE/Platforms/jd2017-pc-ww/SONGDBS.json")
		var query = request.body.searchString.toString().toUpperCase();
		console.log(query + " is searched")
		
		var matches = []
		for (var song in songdb) {
            // skip loop if the property is from prototype

            var obj = songdb[song];
	        
			
			var title = obj.title.toString().toUpperCase();
			var artist = obj.artist.toString().toUpperCase();
			var mapname = obj.mapName.toString().toUpperCase();
			var jdversion = obj.originalJDVersion.toString();
			var jdversion2 = "JUST DANCE " + obj.originalJDVersion.toString();
			var jdversion3 = "JD" + obj.originalJDVersion.toString();
			
			if ( title.includes(query) == true || jdversion.includes(query) == true || jdversion2.includes(query) == true || jdversion3.includes(query) == true || artist.includes(query) == true || mapname.includes(query) == true) {
			  matches.push(obj.mapName.toString())
			}
		}
			
			var carresponse = JSON.parse(search)
			carresponse.categories[18].title = "[icon:SEARCH_RESULT] " + request.body.searchString.toString()
			matches.forEach(function(arrayItem) {
                var obj = '{"__class":"Item","isc":"grp_cover","act":"ui_component_base","components":[{"__class":"JD_CarouselContentComponent_Song","mapName":"' + arrayItem + '"}],"actionList":"partyMap"}';
                carresponse.categories[18].items.push(JSON.parse(obj));
            });
			response.send(carresponse)
	  }
    } else {
      response.sendStatus(jdconnect.core.requestcheck(request))
    }

  
});

app.post("/carousel/v2/pages/dancerprofile", (request, response) => {
  var json = JSON.stringify(request.body);
  const httpsopts = {
    hostname: "public-ubiservices.ubi.com",
    port: 443,
    path: "/v2/profiles/sessions",
    method: "POST",
    headers: {
      "User-Agent":
        "Mozilla/5.0 (Windows NT 10.0; Win64; x64; Xbox; Xbox One) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/70.0.3538.102 Safari/537.36 Edge/18.19022",
      Authorization: require("./DATABASE/ubiticket.json").AuthXBOX,
      "Content-Type": "application/json",
      "Ubi-AppId": "7df3c817-cde1-4bf9-9b37-ceb9d06c4b96",
      Host: "public-ubiservices.ubi.com",
      "Content-Length": "0"
    }
  };
  redirect(httpsopts, "", function(redResponse) {
    var responsepar = JSON.parse(redResponse);
    var auth = "Ubi_v1 " + responsepar["ticket"];
    const httpsopts2 = {
      hostname: "jmcs-prod.just-dance.com",
      port: 443,
      path: "/carousel/v2/pages/dancerprofile",
      method: "POST",
      headers: {
        Accept: "*/*",
        Authorization: auth,
        "Content-Type": "application/json",
        "X-SkuId": "jd2020-xone-all"
      }
    };
    redirect(httpsopts2, json, function(redResponse) {
      response.send(JSON.parse(redResponse));
    });
  });
});

app.post("/carousel/v2/pages/jd2019-playlists", (request, response) => {
   response.send(require("./DATABASE/Platforms/jd2019-nx-all/jd2019-playlists.json"))
});

app.post("/carousel/v2/pages/jdtv", (request, response) => {
	  var ticket = request.header("Authorization")
    var xhr = new XMLHttpRequest();
    xhr.open('POST', prodwsurl + "/carousel/v2/pages/jdtv", true);
    xhr.setRequestHeader('X-SkuId', "jd2017-pc-ww");
    xhr.setRequestHeader('Authorization', ticket);
    xhr.setRequestHeader('Content-Type', 'application/json');
    xhr.send(JSON.stringify(request.body), null, 2);
    xhr.addEventListener("load", function() {
      if(xhr.readyState == 4) {
        response.send(JSON.parse(xhr.responseText))
      }
    });
});
app.post("/carousel/v2/pages/recap-autodance", (req, res) => {
  if (jdconnect.core.requestcheck(req)) {
    var xhr = new XMLHttpRequest();
    var ticket = req.header("Authorization")
    var appid = req.header("X-SkuId")
    xhr.open('POST', 'https://' + prodwsurl + '/carousel/v2/pages/recap-autodance', false);
    xhr.setRequestHeader('Content-Type', 'application/json');
    xhr.setRequestHeader('X-SkuId', appid);
    xhr.setRequestHeader('Authorization', ticket);
    xhr.send();
    res.send(xhr.responseText);
  } else {
    res.send(jdconnect.core.requestcheck(req));
  }
});
app.post("/ugc/v2/ugcs/*", (req,res) => {
  	var ticket = req.header("Authorization")
    var xhr = new XMLHttpRequest();
    xhr.open('POST', prodwsurl + req.url, true);
    xhr.setRequestHeader('X-SkuId', "jd2017-pc-ww");
    xhr.setRequestHeader('Authorization', ticket);
    xhr.setRequestHeader('Content-Type', 'application/json');
    xhr.send(JSON.stringify(req.body), null, 2);
    xhr.addEventListener("load", function() {
      if(xhr.readyState == 4) {
        res.send(JSON.parse(xhr.responseText))
      }
    });
})
app.put("/ugc/v2/ugcs/*", (req,res) => {
  	var ticket = req.header("Authorization")
    var xhr = new XMLHttpRequest();
    xhr.open('PUT', prodwsurl + req.url, true);
    xhr.setRequestHeader('X-SkuId', "jd2017-pc-ww");
    xhr.setRequestHeader('Authorization', ticket);
    xhr.setRequestHeader('Content-Type', 'application/json');
    xhr.send(JSON.stringify(req.body), null, 2);
    xhr.addEventListener("load", function() {
      if(xhr.readyState == 4) {
        res.send(JSON.parse(xhr.responseText))
      }
    });
})

app.post("/carousel/v2/pages/friend-dancerprofile", (req, res) => {
  res.send("test")
});

app.get("/questdb/v1/quests", function(request, response) {
  response.send(Quest);
});

app.get("/status/v1/ping", function(request, response) {
  if (jdconnect.core.requestcheck(request) == true) {
    var ticket = request.header("Authorization")
    var xhr = new XMLHttpRequest();
    xhr.open('GET', prodwsurl + '/status/v1/ping', true);
    xhr.setRequestHeader('X-SkuId', request.header("X-SkuId"));
    xhr.setRequestHeader('Authorization', ticket);
    xhr.setRequestHeader('Content-Type', 'application/json');
    xhr.send(JSON.stringify(request.body, null, 2));
    response.send(xhr.responseText);
  } else {
    response.send(jdconnect.core.requestcheck(request));
  }
});

app.get("/customizable-itemdb/v1/items", function(request, response) {
  response.send(CustomDB);
});

app.get("/constant-provider/v1/sku-constants", (req, res) => {
  res.send(SKUConstants);
});

app.post("/carousel/v2/pages/upsell-videos", function(request, response) {
  response.send(upsell);
});

app.post("/subscription/v1/refresh", function(request, response) {
  response.send(
    '{"validity": true, "errorCode": "", "timeLeft": 99999999999, "expiryTimeStamp": "99999999999", "platformId": "4b93827a-01c6-405b-b4b3-67590ef4b47b", "trialActivated": false, "consoleHasTrial": true, "trialTimeLeft": 0, "trialDuration": "90", "trialIsActive": false, "needEshopLink": false, "autoRefresh": false}'
  );
});

var useragent = require("express-useragent");

app.get("/content-authorization/v1/maps/:map", function(request, response) {
if (jdconnect.core.requestcheck(request) == true) {
  var mapcodename = request.params.map;
var path = require('path');
  if (require('fs').existsSync(path.dirname(require.main.filename || process.mainModule.filename) + "/DATABASE/MAPJSON/" + mapcodename + ".json") == false) {
      if(arraybeta[mapcodename] == undefined) {
	  var json = JSON.stringify(request.body);
      const httpsopts = {
        hostname: "public-ubiservices.ubi.com",
        port: 443,
        path: "/v2/profiles/sessions",
        method: "POST",
        headers: {
          "User-Agent":
            "Mozilla/5.0 (Windows NT 10.0; Win64; x64; Xbox; Xbox One) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/70.0.3538.102 Safari/537.36 Edge/18.19022",
          Authorization: require("./DATABASE/ubiticket.json").AuthXBOXALT,
          "Content-Type": "application/json",
          "Ubi-AppId": "f78cbbdb-72eb-47f4-af54-91618c1eecd0",
          Host: "public-ubiservices.ubi.com",
          "Content-Length": "0"
        }
      };
      redirect(httpsopts, "", function(redResponse) {
        var responsepar = JSON.parse(redResponse);
        var auth = "Ubi_v1 " + responsepar["ticket"];
        const httpsopts2 = {
          hostname: "jmcs-prod.just-dance.com",
          port: 443,
          path: "/content-authorization/v1/maps/" + mapcodename,
          method: "GET",
          headers: {
            Accept: "*/*",
            Authorization: auth,
            "Content-Type": "application/json",
            "X-SkuId": "jd2021-xone-all"
          }
        };
        redirect(httpsopts2, json, function(redResponse) {
          response.send(redResponse.toString());
      });
	  });
	  } else {
		  if(jdconnect.core.interactivemanagement.checkplayer(request.header("Authorization")) == true) {
			  
		  } else {
			  response.send("You are not registered to be a beta tester.")
		  }
	  }
  } else {
	  if(arraybeta[mapcodename] == undefined) {
	  response.send(require("./DATABASE/MAPJSON/" + mapcodename + ".json"))
	  } else {
	  if(jdconnect.core.interactivemanagement.checkplayer(request.header("Authorization")) == true) {
			  response.send(require("./DATABASE/MAPJSON/" + mapcodename + ".json"))
	  } else {
			  response.send("You are not registered to be a beta tester.")
	  }
	  }
  }
} else {
  response.sendStatus(jdconnect.core.requestcheck(request))
}
});

// profile/v2/

app.put("/profile/v2/favorites/maps/:map", function(req,res) {
  if (jdconnect.core.requestcheck(req)) {
    var ticket = req.header("Authorization")
    var xhr = new XMLHttpRequest();
    xhr.open('PUT', prodwsurl + '/profile/v2/favorites/maps/' + req.params.map, true);
    xhr.setRequestHeader('X-SkuId', "jd2017-pc-ww");
    xhr.setRequestHeader('Authorization', ticket);
    xhr.setRequestHeader('Content-Type', 'application/json');
    xhr.send(JSON.stringify(req.body, null, 2));
    res.send(xhr.responseText);
  } else {
    res.send(jdconnect.core.requestcheck(req));
  }
})
app.delete("/profile/v2/favorites/maps/:map", function(req,res) {
  if (jdconnect.core.requestcheck(req)) {
    var ticket = req.header("Authorization")
    var xhr = new XMLHttpRequest();
    xhr.open('DELETE', prodwsurl + '/profile/v2/favorites/maps/' + req.params.map, true);
    xhr.setRequestHeader('X-SkuId', "jd2017-pc-ww");
    xhr.setRequestHeader('Authorization', ticket);
    xhr.setRequestHeader('Content-Type', 'application/json');
    xhr.send(JSON.stringify(req.body, null, 2));
    res.send(xhr.responseText);
  } else {
    res.send(jdconnect.core.requestcheck(req));
  }
})

app.get("/profile/v2/profiles", (req, response) => {
  	var ticket = req.header("Authorization")
    var xhr33 = new XMLHttpRequest();
    xhr33.open(req.method, prodwsurl + req.url, true);
    xhr33.setRequestHeader('X-SkuId', "jd2017-pc-ww");
    xhr33.setRequestHeader('Authorization', ticket);
    xhr33.setRequestHeader('Content-Type', 'application/json');
    xhr33.send(JSON.stringify(req.body), null, 2);
    xhr33.addEventListener("load", function() {
      if(xhr33.readyState == 4) {
        response.send(xhr33.responseText.toString())
      }
    });
});
app.post("/profile/v2/profiles", (req, response) => {
    const httpsopts2 = {
      hostname: "jmcs-prod.just-dance.com",
      port: 443,
      path: req.url,
      method: "POST",
      headers: {
        Accept: "*/*",
        Authorization: req.header("Authorization"),
        "Content-Type": "application/json",
        "X-SkuId": "jd2017-pc-ww"
      }
    };
    redirect(httpsopts2, JSON.stringify(req.body), function(redResponse) {
      response.send(JSON.parse(redResponse));
    });
});

// video challenge
app.all("/carousel/v2/pages/*", function(req, res) {
  	var ticket = req.header("Authorization")
    var xhr3 = new XMLHttpRequest();
    xhr3.open(req.method, prodwsurl + req.url, true);
    xhr3.setRequestHeader('X-SkuId', "jd2017-pc-ww");
    xhr3.setRequestHeader('Authorization', ticket);
    xhr3.setRequestHeader('Content-Type', 'application/json');
    xhr3.send(JSON.stringify(req.body), null, 2);
    xhr3.addEventListener("load", function() {
      if(xhr3.readyState == 4) {
        res.send(xhr3.responseText.toString())
      }
    });
});

app.all("/challenge-match/*", function(req, res) {
  	var ticket = req.header("Authorization")
    var xhr4 = new XMLHttpRequest();
    xhr4.open(req.method, prodwsurl + req.url, true);
    xhr4.setRequestHeader('X-SkuId', "jd2017-pc-ww");
    xhr4.setRequestHeader('Authorization', ticket);
    xhr4.setRequestHeader('Content-Type', 'application/json');
    xhr4.send(JSON.stringify(req.body), null, 2);
    xhr4.addEventListener("load", function() {
      if(xhr4.readyState == 4) {
        res.send(xhr4.responseText.toString())
      }
    });
});

// v1
app.get("/v1/applications/:game/configuration", function(request, response) {
  if (jdconnect.core.requestcheck(request) == true) {
  response.send(v1);
  } else {
    response.sendStatus(jdconnect.core.requestcheck(request))
  }
});

// v2
app.get("/v2/spaces/:spaceid/entities", function(request, response) {
  if (jdconnect.core.requestcheck(request) == true) {
    response.send(v2);
    } else {
      response.sendStatus(jdconnect.core.requestcheck(request))
    }
});

// v3
app.get("/v3/users/:user", (req, res) => {
  var auth = req.header("Authorization");
  var sessionid = req.header("Ubi-SessionId");
  const httpsopts = {
    hostname: "public-ubiservices.ubi.com",
    port: 443,
    path: "/v3/users/" + req.params.user,
    method: "GET",
    headers: {
      "User-Agent": "UbiServices_SDK_HTTP_Client_4.2.9_PC32_ansi_static",
      Accept: "*/*",
      Authorization: auth,
      "Content-Type": "application/json",
      "ubi-appbuildid": "BUILDID_259645",
      "Ubi-AppId": "341789d4-b41f-4f40-ac79-e2bc4c94ead4",
      "Ubi-localeCode": "en-us",
      "Ubi-Populations": "US_EMPTY_VALUE",
      "Ubi-SessionId": sessionid
    }
  };
  redirect(httpsopts, "", function(redResponse) {
    res.send(JSON.parse(redResponse));
  });
});

app.get("/leaderboard/v1/coop_points/mine", (req, res) => {
  res.send("")
});

// packages
app.post("/carousel/v2/packages", function(request, response) {
  response.send(CarouselPackages);
});

app.post("/v3/users/:user", (req, res) => {
  var json = JSON.stringify(req.body);
  const httpsopts = {
    hostname: "public-ubiservices.ubi.com",
    port: 443,
    path: "/v2/profiles/sessions",
    method: "POST",
    headers: {
      "User-Agent":
        "Mozilla/5.0 (Windows NT 10.0; Win64; x64; Xbox; Xbox One) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/70.0.3538.102 Safari/537.36 Edge/18.19022",
      Authorization: require("./DATABASE/ubiticket.json").AuthXBOX,
      "Content-Type": "application/json",
      "Ubi-AppId": "155d58d0-94ae-4de2-b8f9-64ed5f299545",
      Host: "public-ubiservices.ubi.com",
      "Content-Length": "0"
    }
  };
  redirect(httpsopts, "", function(redResponse) {
    var responsepar = JSON.parse(redResponse);
    var auth = "Ubi_v1 " + responsepar["ticket"];
    const httpsopts2 = {
      hostname: "jmcs-prod.just-dance.com",
      port: 443,
      path: "/v3/users/" + req.params.user,
      method: "POST",
      headers: {
        Accept: "*/*",
        Authorization: auth,
        "Content-Type": "application/json",
        "X-SkuId": "jd2017-xone-emea"
      }
    };
    redirect(httpsopts2, json, function(redResponse) {
      res.send(JSON.parse(redResponse));
    });
  });
});

app.post("/profile/v2/filter-players", (request, response) => {
  var json = JSON.stringify(request.body);
  const httpsopts = {
    hostname: "public-ubiservices.ubi.com",
    port: 443,
    path: "/v2/profiles/sessions",
    method: "POST",
    headers: {
      "User-Agent":
        "Mozilla/5.0 (Windows NT 10.0; Win64; x64; Xbox; Xbox One) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/70.0.3538.102 Safari/537.36 Edge/18.19022",
      Authorization: require("./DATABASE/ubiticket.json").AuthXBOX,
      "Content-Type": "application/json",
      "Ubi-AppId": "7df3c817-cde1-4bf9-9b37-ceb9d06c4b96",
      Host: "public-ubiservices.ubi.com",
      "Content-Length": "0"
    }
  };
  redirect(httpsopts, "", function(redResponse) {
    var responsepar = JSON.parse(redResponse);
    var auth = "Ubi_v1 " + responsepar["ticket"];
    const httpsopts2 = {
      hostname: "jmcs-prod.just-dance.com",
      port: 443,
      path: "/profile/v2/filter-players",
      method: "POST",
      headers: {
        Accept: "*/*",
        Authorization: auth,
        "Content-Type": "application/json",
        "X-SkuId": "jd2020-xone-all"
      }
    };
    redirect(httpsopts2, json, function(redResponse) {
      response.send(JSON.parse(redResponse));
    });
  });
});

app.get("/wdf/v1/api/rooms", (req,res) => {
  res.send(require("./DATABASE/wdf/rooms.json"))
})

app.post("/wdf/v1/assign-room", (req, res) => {
  res.send('{ "room": "' + require("./DATABASE/wdf/rooms.json").alignroom + '" }')
});

app.post("/wdf/v1/rooms/" + room + "/sessions", (req, res) => {
    var ticket = req.header("Authorization")
  var xhr = new XMLHttpRequest();
  xhr.open('POST', prodwsurl + "/wdf/v1/rooms/MainJD2017/session", false);
  xhr.setRequestHeader('X-SkuId', "jd2017-pc-ww");
  xhr.setRequestHeader('Authorization', ticket);
  xhr.setRequestHeader('Content-Type', 'application/json');
  xhr.send(JSON.stringify(req.body), null, 2);
  
    var json = JSON.stringify(req.body);
  const httpsopts = {
    hostname: "public-ubiservices.ubi.com",
    port: 443,
    path: "/v2/profiles/sessions",
    method: "POST",
    headers: {
      "User-Agent":
        "Mozilla/5.0 (Windows NT 10.0; Win64; x64; Xbox; Xbox One) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/70.0.3538.102 Safari/537.36 Edge/18.19022",
      Authorization: require("./DATABASE/ubiticket.json").AuthXBOX,
      "Content-Type": "application/json",
      "Ubi-AppId": "f78cbbdb-72eb-47f4-af54-91618c1eecd0",
      Host: "public-ubiservices.ubi.com",
      "Content-Length": "0"
    }
  };
  redirect(httpsopts, "", function(redResponse) {
    var responsepar = JSON.parse(redResponse);
    var auth = "Ubi_v1 " + responsepar["ticket"];
    const httpsopts2 = {
      hostname: "jmcs-prod.just-dance.com",
      port: 443,
      path: "/wdf/v1/rooms/HardMainJD2021/session",
      method: "POST",
      headers: {
        Accept: "*/*",
        Authorization: auth,
        "Content-Type": "application/json",
        "X-SkuId": "jd2021-xone-all"
      }
    };
    redirect(httpsopts2, json, function(redResponse) {
    });
  });
  
  res.sendStatus(200)
});

app.delete("/wdf/v1/rooms/" + room + "/session", (req, res) => {
      var ticket = req.header("Authorization")
  var xhr = new XMLHttpRequest();
  xhr.open('DELETE', prodwsurl + "/wdf/v1/rooms/MainJD2017/session", false);
  xhr.setRequestHeader('X-SkuId', "jd2017-pc-ww");
  xhr.setRequestHeader('Authorization', ticket);
  xhr.setRequestHeader('Content-Type', 'application/json');
  xhr.send(JSON.stringify(req.body), null, 2);
  
    var json = JSON.stringify(req.body);
  const httpsopts = {
    hostname: "public-ubiservices.ubi.com",
    port: 443,
    path: "/v2/profiles/sessions",
    method: "POST",
    headers: {
      "User-Agent":
        "Mozilla/5.0 (Windows NT 10.0; Win64; x64; Xbox; Xbox One) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/70.0.3538.102 Safari/537.36 Edge/18.19022",
      Authorization: require("./DATABASE/ubiticket.json").AuthXBOX,
      "Content-Type": "application/json",
      "Ubi-AppId": "f78cbbdb-72eb-47f4-af54-91618c1eecd0",
      Host: "public-ubiservices.ubi.com",
      "Content-Length": "0"
    }
  };
  redirect(httpsopts, "", function(redResponse) {
    var responsepar = JSON.parse(redResponse);
    var auth = "Ubi_v1 " + responsepar["ticket"];
    const httpsopts2 = {
      hostname: "jmcs-prod.just-dance.com",
      port: 443,
      path: "/wdf/v1/rooms/HardMainJD2021/session",
      method: "DELETE",
      headers: {
        Accept: "*/*",
        Authorization: auth,
        "Content-Type": "application/json",
        "X-SkuId": "jd2021-xone-all"
      }
    };
    redirect(httpsopts2, json, function(redResponse) {
    });
  });
  
  res.sendStatus(200)
});


app.post("/wdf/v1/rooms/" + room + "/screens", (req, res) => {
  var json = JSON.stringify(req.body);
  const httpsopts = {
    hostname: "public-ubiservices.ubi.com",
    port: 443,
    path: "/v2/profiles/sessions",
    method: "POST",
    headers: {
      "User-Agent":
        "Mozilla/5.0 (Windows NT 10.0; Win64; x64; Xbox; Xbox One) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/70.0.3538.102 Safari/537.36 Edge/18.19022",
      Authorization: require("./DATABASE/ubiticket.json").AuthXBOX,
      "Content-Type": "application/json",
      "Ubi-AppId": "f78cbbdb-72eb-47f4-af54-91618c1eecd0",
      Host: "public-ubiservices.ubi.com",
      "Content-Length": "0"
    }
  };
  redirect(httpsopts, "", function(redResponse) {
    var responsepar = JSON.parse(redResponse);
    var auth = "Ubi_v1 " + responsepar["ticket"];
    const httpsopts2 = {
      hostname: "jmcs-prod.just-dance.com",
      port: 443,
      path: "/wdf/v1/rooms/HardMainJD2021/screens",
      method: "POST",
      headers: {
        Accept: "*/*",
        Authorization: auth,
        "Content-Type": "application/json",
        "X-SkuId": "jd2021-xone-all"
      }
    };
    redirect(httpsopts2, json, function(redResponse) {
      var response = JSON.parse(redResponse)
      response.screens.forEach(function(object) {
        object.schedule.theme = "RegularTournament"
        require("./DATABASE/wdf/jd2021pc_replace.json").codenames.forEach(function(object2){
          if (object.mapName == object2.Codename) {
            object.mapName = object2.replace
          } 
        })
        if(jdconnect.interactiveconfig.wdfoverwrite.wdfoverwriteenabled == true) {

          var happyhour = JSON.parse(jdconnect.interactiveconfig.wdfoverwrite.wdfoverwritehappyhour)
          var songdb = require("./DATABASE/Platforms/jd2017-pc-ww/SONGDBS.json")
          var totallength = happyhour.start
          
          jdconnect.interactiveconfig.wdfoverwrite.wdfoverwritelist.forEach(function(object) {
            totallength = totallength + songdb[object].mapLength
          })
          
          if (Math.floor(+new Date() / 1000) < totallength && Math.floor(+new Date() / 1000) > happyhour.start) {
            var mapnum = 0
            response.screens.forEach(function(screen) {
              if (screen.mapName != undefined) {
                mapnum = mapnum + 1
                screen.mapName = jdconnect.interactiveconfig.wdfoverwrite.wdfoverwritelist[mapnum]
              }
            })
          }
        }
      })
      res.send(response)
    });
  });
});

app.get("/wdf/v1/rooms/" + room + "/next-happyhours", (req, res) => {
  var json = JSON.stringify(req.body);
  const httpsopts = {
    hostname: "public-ubiservices.ubi.com",
    port: 443,
    path: "/v2/profiles/sessions",
    method: "POST",
    headers: {
      "User-Agent":
        "Mozilla/5.0 (Windows NT 10.0; Win64; x64; Xbox; Xbox One) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/70.0.3538.102 Safari/537.36 Edge/18.19022",
      Authorization: require("./DATABASE/ubiticket.json").AuthXBOX,
      "Content-Type": "application/json",
      "Ubi-AppId": "f78cbbdb-72eb-47f4-af54-91618c1eecd0",
      Host: "public-ubiservices.ubi.com",
      "Content-Length": "0"
    }
  };
  redirect(httpsopts, "", function(redResponse) {
    var responsepar = JSON.parse(redResponse);
    var auth = "Ubi_v1 " + responsepar["ticket"];
    const httpsopts2 = {
      hostname: "jmcs-prod.just-dance.com",
      port: 443,
      path: "/wdf/v1/rooms/HardMainJD2021/next-happyhours",
      method: "GET",
      headers: {
        Accept: "*/*",
        Authorization: auth,
        "Content-Type": "application/json",
        "X-SkuId": "jd2021-xone-all"
      }
    };
    redirect(httpsopts2, json, function(redResponse) {
      res.send(JSON.parse(redResponse))
    });
  });
});

app.get("/wdf/v1/rooms/" + room + "/newsfeed", (req, res) => {
    var json = JSON.stringify(req.body);
  const httpsopts = {
    hostname: "public-ubiservices.ubi.com",
    port: 443,
    path: "/v2/profiles/sessions",
    method: "POST",
    headers: {
      "User-Agent":
        "Mozilla/5.0 (Windows NT 10.0; Win64; x64; Xbox; Xbox One) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/70.0.3538.102 Safari/537.36 Edge/18.19022",
      Authorization: require("./DATABASE/ubiticket.json").AuthXBOX,
      "Content-Type": "application/json",
      "Ubi-AppId": "f78cbbdb-72eb-47f4-af54-91618c1eecd0",
      Host: "public-ubiservices.ubi.com",
      "Content-Length": "0"
    }
  };
  redirect(httpsopts, "", function(redResponse) {
    var responsepar = JSON.parse(redResponse);
    var auth = "Ubi_v1 " + responsepar["ticket"];
    const httpsopts2 = {
      hostname: "jmcs-prod.just-dance.com",
      port: 443,
      path: "/wdf/v1/rooms/HardMainJD2021/newsfeed",
      method: "GET",
      headers: {
        Accept: "*/*",
        Authorization: auth,
        "Content-Type": "application/json",
        "X-SkuId": "jd2021-xone-all"
      }
    };
    redirect(httpsopts2, json, function(redResponse) {
      res.send(JSON.parse(redResponse))
    });
  });
});

app.get("/wdf/v1/rooms/" + room + "/notification", (req, res) => {
    res.send("{}")
});

app.get("/wdf/v1/rooms/" + room + "/ccu", (req, res) => {
    var json = JSON.stringify(req.body);
  const httpsopts = {
    hostname: "public-ubiservices.ubi.com",
    port: 443,
    path: "/v2/profiles/sessions",
    method: "POST",
    headers: {
      "User-Agent":
        "Mozilla/5.0 (Windows NT 10.0; Win64; x64; Xbox; Xbox One) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/70.0.3538.102 Safari/537.36 Edge/18.19022",
      Authorization: require("./DATABASE/ubiticket.json").AuthXBOX,
      "Content-Type": "application/json",
      "Ubi-AppId": "f78cbbdb-72eb-47f4-af54-91618c1eecd0",
      Host: "public-ubiservices.ubi.com",
      "Content-Length": "0"
    }
  };
  redirect(httpsopts, "", function(redResponse) {
    var responsepar = JSON.parse(redResponse);
    var auth = "Ubi_v1 " + responsepar["ticket"];
    const httpsopts2 = {
      hostname: "jmcs-prod.just-dance.com",
      port: 443,
      path: "/wdf/v1/rooms/HardMainJD2021/ccu",
      method: "GET",
      headers: {
        Accept: "*/*",
        Authorization: auth,
        "Content-Type": "application/json",
        "X-SkuId": "jd2021-xone-all"
      }
    };
    redirect(httpsopts2, json, function(redResponse) {
      res.send(redResponse.toString())
    });
  });
  
});

app.get("/wdf/v1/rooms/" + room + "/themes/tournament/score-recap", (req, res) => {
       var json = JSON.stringify(req.body);
  const httpsopts = {
    hostname: "public-ubiservices.ubi.com",
    port: 443,
    path: "/v2/profiles/sessions",
    method: "POST",
    headers: {
      "User-Agent":
        "Mozilla/5.0 (Windows NT 10.0; Win64; x64; Xbox; Xbox One) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/70.0.3538.102 Safari/537.36 Edge/18.19022",
      Authorization: require("./DATABASE/ubiticket.json").AuthXBOX,
      "Content-Type": "application/json",
      "Ubi-AppId": "f78cbbdb-72eb-47f4-af54-91618c1eecd0",
      Host: "public-ubiservices.ubi.com",
      "Content-Length": "0"
    }
  };
  redirect(httpsopts, "", function(redResponse) {
    var responsepar = JSON.parse(redResponse);
    var auth = "Ubi_v1 " + responsepar["ticket"];
    const httpsopts2 = {
      hostname: "jmcs-prod.just-dance.com",
      port: 443,
      path: "/wdf/v1/rooms/HardMainJD2021/themes/tournament/score-recap",
      method: "GET",
      headers: {
        Accept: "*/*",
        Authorization: auth,
        "Content-Type": "application/json",
        "X-SkuId": "jd2021-xone-all"
      }
    };
    redirect(httpsopts2, json, function(redResponse) {
      var recap = JSON.parse(redResponse)
      recap.recapEntries.forEach(function(object) {
        object.avatar = Math.floor(Math.random() * 600 + 1).toString();
        object.skin = Math.floor(Math.random() * 86) + 1;
      })
      res.send(recap)
    });
  });
});

app.post("/wdf/v1/rooms/" + room + "/themes/tournament/update-scores", (req, res) => {
  var ticket = req.header("Authorization")
  var xhr = new XMLHttpRequest();
  xhr.open('POST', prodwsurl + "/wdf/v1/rooms/MainJD2017/themes/tournament/update-scores", false);
  xhr.setRequestHeader('X-SkuId', "jd2017-pc-ww");
  xhr.setRequestHeader('Authorization', ticket);
  xhr.setRequestHeader('Content-Type', 'application/json');
  xhr.send(JSON.stringify(req.body), null, 2);
  
  res.send(JSON.parse(xhr.responseText))
});

app.get("/wdf/v1/server-time", (req, res) => {
  res.send('{ "time": ' + Math.floor(+new Date() / 1000) + ' }')
});

app.get("/wdf/v1/online-bosses", (req, res) => {
  res.send(bosses);
});

app.get("/leaderboard/v1/maps/*", (req, res) => {
  var ticket = req.header("Authorization")
  var xhr = new XMLHttpRequest();
  var n = req.url.lastIndexOf('/');
  var result = req.url.substr(0)
  xhr.open('GET', prodwsurl + result, false);
  xhr.setRequestHeader('X-SkuId', "jd2017-pc-ww");
  xhr.setRequestHeader('Authorization', ticket);
  xhr.setRequestHeader('Content-Type', 'application/json');
  xhr.send();
  res.send(xhr.responseText);
});

app.post("/leaderboard/v1/maps/*", (req, res) => {
  var ticket = req.header("Authorization")
  var xhr = new XMLHttpRequest();
  var n = req.url.lastIndexOf('/');
  var result = req.url.substr(0)
  xhr.open('POST', prodwsurl + result, false);
  xhr.setRequestHeader('X-SkuId', "jd2017-pc-ww");
  xhr.setRequestHeader('Authorization', ticket);
  xhr.setRequestHeader('Content-Type', 'application/json');
  xhr.send(JSON.stringify(req.body, null, 2));
  res.send(xhr.responseText);
});
// v2/profiles/sessions

app.get("/v2/profiles/sessions", (req, res) => {
  if (jdconnect.core.requestcheck(req)) {
    var ticket = req.header("Authorization")
    var xhr = new XMLHttpRequest();
    xhr.open('POST', prodwsurl + '/v2/profiles/sessions', true);
    xhr.setRequestHeader('X-SkuId', req.header("X-SkuId"));
    xhr.setRequestHeader('Authorization', ticket);
    xhr.setRequestHeader('Content-Type', 'application/json');
    xhr.send(JSON.stringify(req.body, null, 2));
    res.send(xhr.responseText);
  } else {
    res.send(jdconnect.core.requestcheck(req));
  }
});


// v3/profiles/sessions
app.post("/v3/profiles/sessions", (req, res) => {
  if (jdconnect.core.requestcheck(req)) {
    var xhr = new XMLHttpRequest();
    var ticket = req.header("Authorization")
    var appid = req.header("Ubi-AppId")
    xhr.open('POST', 'https://public-ubiservices.ubi.com/v3/profiles/sessions', false);
    xhr.setRequestHeader('Content-Type', 'application/json');
    xhr.setRequestHeader('Ubi-AppId', appid);
    xhr.setRequestHeader('Authorization', ticket);
    xhr.send();
    res.send(xhr.responseText);
	  if (jdconnect.core.beta_uplayers[JSON.parse(xhr.responseText).nameOnPLatform] !== undefined) {
		  jdconnect.core.currentbeta.push("Ubi_v1 " + JSON.parse(xhr.responseText).ticket)
	  } 
    var profileid = JSON.parse(xhr.responseText).profileId
    var ticket = "Ubi_v1 " + JSON.parse(xhr.responseText).ticket
    jdconnect.core.currenauths.push(JSON.parse('{ "ProfileId": "' + profileid + '", "Ticket": "' + ticket + '" }'))
  } else {
    res.send(jdconnect.core.requestcheck(req));
  }
});
app.delete("/v3/profiles/sessions", (req, res) => {
  if (jdconnect.core.requestcheck(req)) {
    var xhr = new XMLHttpRequest();
    var ticket = req.header("Authorization")
    var appid = req.header("Ubi-AppId")
    xhr.open('DELETE', 'https://public-ubiservices.ubi.com/v3/profiles/sessions', false);
    xhr.setRequestHeader('Content-Type', 'application/json');
    xhr.setRequestHeader('Ubi-AppId', appid);
    xhr.setRequestHeader('Authorization', ticket);
    xhr.send();
    res.send(xhr.responseText);
	  if (jdconnect.core.currentbeta[ticket] !== undefined) {
		  jdconnect.core.currentbeta.splice(ticket,1)
	  }
    var currentticket = 0
    jdconnect.core.currenauths.forEach(function(object) {
      currentticket = currentticket + 1
      if (object.Ticket == ticket) {
        jdconnect.core.currentbeta.splice(currentticket,1)
      }
    })
  } else {
    res.send(jdconnect.core.requestcheck(req));
  }
});

app.post("/v2/profiles/sessions", (req, res) => {
  if (jdconnect.core.requestcheck(req)) {
    var xhr = new XMLHttpRequest();
    var ticket = req.header("Authorization")
    var appid = req.header("Ubi-AppId")
    xhr.open('POST', 'https://public-ubiservices.ubi.com/v2/profiles/sessions', false);
    xhr.setRequestHeader('Content-Type', 'application/json');
    xhr.setRequestHeader('Ubi-AppId', appid);
    xhr.setRequestHeader('Authorization', ticket);
    xhr.send();
    res.send(xhr.responseText);
  } else {
    res.send(jdconnect.core.requestcheck(req));
  }
});


app.get("/com-video/v1/com-videos-fullscreen", (req, res) => {
  res.send("{}");
});
app.post("/carousel/v2/pages/sweat", (req, res) => {
  res.send(sweat);
});
app.post("/carousel/v2/pages/partycoop", (req, res) => {
  res.send(coop);
});
var requestCountry = require('request-country');
app.get("*", (req, res) => {
  transactiondate = new Date().toISOString();
  transactionid = uuid();
  fullurl = req.protocol + "://" + req.get("host") + req.originalUrl;
  res.send(
    '<pre>{"errorCode":1003,"message":"Resource ' +
    req.url +
      ' not found.","httpCode":404,"errorContext":"GET","moreInfo":"A link to more information will be coming soon. Please contact AleMService for more support.","transactionTime":"' +
      transactiondate +
      '","transactionId":"' +
      transactionid +
      '"}</pre>'
  );
  console.log(req.url + " is not found (GET)");
  console.log("transactionid: " + transactionid);
  console.log("transactiondate: " + transactiondate);
	console.log("useragent: " + req.header("User-Agent"));
	console.log("country: " + requestCountry(req))
});
app.post("*", (req, res) => {
  transactiondate = new Date().toISOString();
  transactionid = uuid();
  fullurl = req.protocol + "://" + req.get("host") + req.originalUrl;
  res.send(
    '<pre>{"errorCode":1003,"message":"Resource ' +
    req.url +
      ' not found.","httpCode":404,"errorContext":"POST","moreInfo":"A link to more information will be coming soon. Please contact AleMService for more support.","transactionTime":"' +
      transactiondate +
      '","transactionId":"' +
      transactionid +
      '"}</pre>'
  );
  console.log(req.url + " is not found (POST)");
  console.log("transactionid: " + transactionid);
  console.log("transactiondate: " + transactiondate);
	console.log("useragent: " + req.header("User-Agent"));
	console.log("country: " + requestCountry(req))
});
app.delete("*", (req, res) => {
  transactiondate = new Date().toISOString();
  transactionid = uuid();
  fullurl = req.protocol + "://" + req.get("host") + req.originalUrl;
  res.send(
    '<pre>{"errorCode":1003,"message":"Resource ' +
    req.url +
      ' not found.","httpCode":404,"errorContext":"DELETE","moreInfo":"A link to more information will be coming soon. Please contact AleMService for more support.","transactionTime":"' +
      transactiondate +
      '","transactionId":"' +
      transactionid +
      '"}</pre>'
  );
  console.log(req.url + " is not found (DELETE)");
  console.log("transactionid: " + transactionid);
  console.log("transactiondate: " + transactiondate);
});
app.put("*", (req, res) => {
  transactiondate = new Date().toISOString();
  transactionid = uuid();
  fullurl = req.protocol + "://" + req.get("host") + req.originalUrl;
  res.send(
    '<pre>{"errorCode":1003,"message":"Resource ' +
    req.url +
      ' not found.","httpCode":404,"errorContext":"PUT","moreInfo":"A link to more information will be coming soon. Please contact AleMService for more support.","transactionTime":"' +
      transactiondate +
      '","transactionId":"' +
      transactionid +
      '"}</pre>'
  );
  console.log(req.url + " is not found (PUT)");
  console.log("transactionid: " + transactionid);
  console.log("transactiondate: " + transactiondate);
});

// listen for requests :)
var port = process.env.PORT || 30000
const listener = app.listen(port, function() {
  jdconnect.Carousel.returncatalog();
  console.log("Your app is listening on port " + listener.address().port);
});

// FunciÃ³n para redireccionar a otros sitios
// Es necesario un options que contiene los detalles de ruta, la manera (GET, POST) y la direcciÃ³n
function redirect(options, write, callback) {
  var Redirect = https.request(options, response => {
    response.on("data", data => {
      callback(data);
    });
  });
  Redirect.on("error", e => {
    console.log(e);
  });
  Redirect.write(write);
  Redirect.end();
}
function get(options, write, callback) {
  var Redirect = https.request(options, response => {
    response.on("data", data => {
      callback(data);
    });
  });
  Redirect.on("error", e => {
    console.log(e);
  });
  Redirect.write(write);
  Redirect.end();
}