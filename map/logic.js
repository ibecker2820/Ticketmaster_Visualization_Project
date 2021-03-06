function createMap(activities){
    document.getElementById('map-id').innerHTML = "<div id='map' style='width: 100%; height: 100%;'></div>";

    var streetmap = new L.tileLayer("https://api.mapbox.com/styles/v1/{id}/tiles/{z}/{x}/{y}?access_token={accessToken}", {
        attribution: "© <a href='https://www.mapbox.com/about/maps/'>Mapbox</a> © <a href='http://www.openstreetmap.org/copyright'>OpenStreetMap</a> <strong><a href='https://www.mapbox.com/map-feedback/' target='_blank'>Improve this map</a></strong>",
        tileSize: 512,
        maxZoom: 18,
        zoomOffset: -1,
        id: "mapbox/streets-v11",
        accessToken: API_KEY
      });
    var baseMaps = {
        "Street Map": streetmap
    };
    var overlayMaps = {
        "Events": activities
      };
    var map = new L.map("map", {
        center: [40.73, -74.0059],
        zoom: 12,
        layers: [streetmap, activities]
    });
    console.log(map)
    eventLat = map._layers[1]._latlng.lat
    eventLng = map._layers[1]._latlng.lng
    console.log(eventLat)
    console.log(eventLng)
    var latlng = L.latLng(eventLat, eventLng)
    map.setView(latlng, 7)
    L.control.layers(baseMaps, overlayMaps, {
        collapsed: false
    }).addTo(map);
}
function createMarkers(data){
    
    console.log(data)
    // Error Message via SweetAlert
    if (data.page.totalElements == 0){
        swal("There are no events available.", {
            title: "Try Again!",
            closeOnClickOutside: false,
          });
        return;
        
    }else {

    
        var events = data._embedded.events
        var eventMarkers = []

        for (var i = 0; i < events.length; i++){
          eventMarkers[i] = new L.marker([events[i]._embedded.venues[0].location.latitude, events[i]._embedded.venues[0].location.longitude], {
            name: events[i].name,
            startTime: events[i].dates.start.localTime,
            link: events[i].url
          }).on('click', onMarkerClick)
          .bindPopup("<h3>" + events[i].name +"<h3><h3>Start Time: " +
           events[i].dates.start.localTime + "</h3>")}
        createMap(L.layerGroup(eventMarkers))
            }
}


function createUrl(){

    var userTime = document.getElementById("userTime").value
    var state = document.getElementById("inputGroupSelect01").value
    var userTime = userTime.substr(0,11)+"00:00:00Z"
    var endTime = userTime.substr(0,11)+"23:59:00Z"
    // console.log(userTime)
    // console.log(endTime)
    // console.log(state)
    var url = `https://app.ticketmaster.com/discovery/v2/events.json?apikey=ZmIEawYVUQbeMEzMytkLVXUFjgNy3YqT&size=100&stateCode=${state}&startDateTime=${userTime}&endDateTime=${endTime}`
    console.log(url)
    d3.json(url).then(createMarkers)
}

function onMarkerClick(e){
    console.log(e.target.options.name)
    // var node = document.createElement("LI");
    // //   Change the Text to the applicable Info needed, Take from 
    // var textnode = document.createTextNode(e.target.options.name + "\n");
    // node.appendChild(textnode);
    // document.getElementById("myList").appendChild(node);
    
    eventName = e.target.options.name
    eventTime = e.target.options.startTime
    eventUrl = e.target.options.link
    var data = [eventName,eventTime,eventUrl]
    d3.select("ul")
        .selectAll("li")
        .data(data)
        .enter()
        .append("li")
        .text(function(d){
            return d;
        })
}
var header = d3.select("header-row")

var sticky = header.offsetTop

function headerFunction(){
    if (window.pageYOffset > sticky){
        header.classList.add("sticky")
    } else {
        header.classList.remove("sticky")
    }
}
var userTime = document.getElementById("userTime").value
var state = document.getElementById("inputGroupSelect01").value
console.log(userTime)
console.log(state)
function openNav() {
    document.getElementById("mySidenav").style.width = "300px";
    document.getElementById("main").style.marginLeft = "300px";
  }
function closeNav() {
    document.getElementById("mySidenav").style.width = "0";
    document.getElementById("main").style.marginLeft = "0";
}
function myEvents() {
    // console.log(options)
    var node = document.createElement("LI");
  //   Change the Text to the applicable Info needed, Take from 
    var textnode = document.createTextNode('events[i].name' + "\n");
    node.appendChild(textnode);
    document.getElementById("myList").appendChild(node);
  }
  