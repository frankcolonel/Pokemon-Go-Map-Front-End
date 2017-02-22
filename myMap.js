var map_manager = {
    "map" : null,
    "map_items" : []
}

map_manager.map_items = [
    {
        "pokemon_id" : 12,
        "expire": 1476589403,
        "longitude": -77.1006083,
        "latitude": 38.953875
    }
]

function loadMapScenario() {
    map = new Microsoft.Maps.Map(document.getElementById('myMap'), {
        credentials: 'AmHTausU0zBuURc-tzizmzm9xcZ_fanvm6ZieKdi5_86YA3CQnfl4QPR1FtxqPKw'
    });
    add_pokemon_layer();   
}


// 1. Define pokemon data format, create mock pokemon data. Test Map api
function get_count_down_time_from_expire_epoch(epoch) {
    var now_time = new Date().getTime() / 1000;
    var time_left = epoch - now_time; // unit : second
    var second = Math.floor(time_left % 60);
    var minute = Math.floor(time_left / 60);
    return minute + ":" +  second;
}


// 2. Create pokemon image on map. 
function get_pokemon_layer_from_map_items(map_manager.map_items) {
    var layer = new Microsoft.Maps.Layer();
    var pushpins = [];
    
    for (var i in map_manager.map_items) {
        var map_item = map_manager.map_items[i];
        var pushpin = new Microsoft.Maps.Pushpin(new Microsoft.Maps.Location(map_item["latitude"], map_item["longitude"]),
                                                { icon: 'images/pushpin_images/pokemon/' + map_item['pokemon_id'] + '.png' ,
                                                  title: get_count_down_time_from_expire_epoch(map_item['expire']) });
        pushpins.push(pushpin);
    }
    layer.add(pushpins);
    return layer;
}


function add_pokemon_layer() {
    var pokemon_layer = get_pokemon_layer_from_map_items(map_manager.map_items);
    map.layers.insert(pokemon_layer);
}


// 3. Add pokemon count down refresh
function refresh_pokemon_layer() {
    // Prepare new layer
    var pokemon_layer = get_pokemon_layer_from_map_items(map_manager.map_items);
    // Remove old layer
    map.layers.clear();
    // Add new layer
    map.layers.insert(pokemon_layer);
}




// 4. Connect with REST api
function refresh_pokemon_data() {
    var apigClient = apigClientFactory.newClient();
    // Get boundary of current map view
    var bounds = map_manager.map.getBounds();
    
    var params = {
        //This is where any header, path, or querystring request params go. The key is the parameter named as defined in the API
        east: bounds.getEast(),
        north: bounds.getNorth(),
        west: bounds.getWest(),
        south: bounds.getSouth()
    };
    
    var additionalParams = {};

    apigClient.mapPokemonsGet(params, body, additionalParams)
        .then(function(result){
            //This is where you would put a success callback
            console.log(result);
        }).catch( function(result){
            //This is where you would put an error callback
            console.log(result);
        });
}

              

window.setInterval(refresh_pokemon_layer, 1000);

                
