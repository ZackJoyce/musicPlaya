var tracklisting = $('#trackListing');
var result;
//var search = prompt();
//var find = $('#look');
var playlist = $("#playlist");
var position = $("#position");
var currentlyPlayingSound;
var currentlyPlayingIndex;

SC.initialize({
    client_id:"2f9a511de0e36a68bfae28dcfe437ad3",
    redirect_url:"http://127.0.0.1"
});
// make a new Jukebox
var jukebox = new Jukebox('#position','#playlist', SC);

$("#btnStop").click(function(){
    jukebox.stop();
});
$("#btnPause").click(function(){
    jukebox.pause();
});
$("#btnPlay").click(function(){
    jukebox.play();
})
$("#btnSearch").click(function(){
    var searchVal = $("#txtSearch").val();
    
    listSongs(searchVal);
});

$("#playlist").on("click","li", function(event){
     var clickED = $(event.target);
    //update what is playing
    currentlyPlayingIndex = clickED.index();
    //get the track of the clicked element
    var trackID = clickED.data("trackID")
    //show the track title for "now Playing"
    console.log(trackID);
   $("#txtNow").html(clickED.html());
    
    jukebox.playSong(trackID);
    
    
});


//respond ti a click ona list item in track listing
//for ANY LIST ITEM regardless of when it was added
$("#trackListing").on("click","li", function(event){
    var clickED = $(event.target);
    //get index of the clicked item
    var arrayIndex = clickED.data('index');
    //get extra data
    var assocData = result[arrayIndex];
    
    var clonedEd = clickED.clone(); 
    
    clonedEd.data("trackID", assocData.id);
    //add the track title to our playlist div
    playlist.append(clonedEd);

});

$("#playlist, #tracklisting").sortable({
    connectWith: ".connect, #trash",
    appendTo: 'body',
    containment: 'window',
    scroll: false,
    helper: 'clone'
}).disableSelection();


    $("#trash").droppable({
      accept: ".connect li",
      drop: function( event, ui ) {
        ui.draggable.remove();
      }
    });
$("#playlist, #trash").draggable();


function listSongs(query){
    SC.get("/tracks",{limit:10, q: query},function(tracks){
    //store result for later
    result = tracks;
    
    //clear out track listing
    tracklisting.empty();
    
    //populate new values
    for(var i in tracks){
        var curTrack = tracks[i];
        
        tracklisting.append("<li data-index='"+i+"'>"+curTrack.title+"</li>");
    }
});
}


