var map;
function loadMapScenario() {
    map = new Microsoft.Maps.Map(document.getElementById('myMap'), {
        credentials: 'AmHTausU0zBuURc-tzizmzm9xcZ_fanvm6ZieKdi5_86YA3CQnfl4QPR1FtxqPKw'
    });
    add_pokemon_layer();   
}


// 1. Define pokemon data format, create mock pokemon data. Test Map api
map_items = [
    {
        "pokemon_id" : 12,
        "expire": 1234567,
        "longitude": -77.1006083,
        "latitude": 38.953875
    }
]


// 2. Create pokemon image on map. 
function get_pokemon_layer_from_map_items(map_items) {
    var layer = new Microsoft.Maps.Layer();
    
    
    for (var i in map_items) {
        var map_item = map_items[i];
        var pushpin = new Microsoft.Maps.Pushpin(new Microsoft.Maps.Location(map_item["latitude"], map_item["longitude"]),
                                                { icon: 'https://www.bingmapsportal.com/Content/images/poi_custom.png' });
        pushpins.push(pushpin);
    }
    layer.add(pushpins);
    return layer;
}


function add_pokemon_layer() {
    var pokemon_layer = get_pokemon_layer_from_map_items(map_items);
    map.layers.insert(pokemon_layer);
}



// 3. Add pokemon count down refresh




// 4. Connect with REST api


                
                
