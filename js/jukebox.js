(function(){
    
    // class like object
    var Jukebox = function(positionRef, playlistRef, SC){
        //store a reference to this object
         
        
        this.currentlyPlayingSound;
        this.currentlyPlayingIndex;
        this.position = $(positionRef);
        this.playlist = $(playlistRef);
        this.sc = SC;
        
        //
    }
        //play next song
    Jukebox.prototype.playNext = function(){
        currentlyPlayingIndex ++;
         console.log(currentlyPlayingIndex, this.playlist.children().length  );
            // make sure there is a next song
            if(currentlyPlayingIndex < this.playlist.children().length ){
                console.log('Hey!')
                var nextElement = this.playlist.find('li').eq(currentlyPlayingIndex);
                $('#txtNow').html(" "+nextElement.html() );
                //console.log(nextElement);
                this.playSong(nextElement.data("trackID"));
               
            }
        
    }
    //play a song
    Jukebox.prototype.playSong = function playSong(trackID){
        var me = this;
        if(this.currentlyPlayingSound){
            //if it does stop
            this.currentlyPlayingSound.stop();
        }
        SC.stream("/tracks/"+trackID,function(sound){
            me.currentlyPlayingSound = sound;
            sound.play({
            whileplaying: function() {
                
                me.position.val(this.position / this.duration);
            },
                onfinish: function() {me.playNext();
                                    }
                     
                
            });
        });
    }
    
    //stop a currently playing song
    Jukebox.prototype.stop = function(){
        //console.log(this.currentlyPlayingSound);
        if(this.currentlyPlayingSound){
            this.currentlyPlayingSound.stop();
        }
    }
    
    //pause a currently playing song
        Jukebox.prototype.pause = function(){
        console.log(this.currentlyPlayingSound);
        if(this.currentlyPlayingSound){
            this.currentlyPlayingSound.pause();
        }
    }
    //play a paused song?
      Jukebox.prototype.play = function(){
        console.log(this.currentlyPlayingSound);
        if(this.currentlyPlayingSound){
            this.currentlyPlayingSound.play();
        }
    }  
        
    
    
    
    
    //export jukebox 
    window.Jukebox = Jukebox;


})()