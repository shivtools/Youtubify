function loadAnnyang(){
		if(annyang){
		var commands = {
			'show me *term': print,
			'play me *query':searchTrack
		};

		annyang.addCommands(commands);
		annyang.start();
	}
}

document.getElementById('pressButton').onclick = function(){
	loadAnnyang();
}

function print(term){
	document.getElementById('artistName').innerHTML = term;
}

function searchTrack(query){
	 $.ajax({
            url: 'https://api.spotify.com/v1/search',
            data: {
                q: query,
                type: 'track'
            },
            success: function (response) {
            	console.log(response);
                 if (response.tracks.items.length) {
                     var track = response.tracks.items[0]; //get most popular track on Spotify
                     var trackName = track.name;
                     print(trackName);
                     searchYoutube(trackName);
                 }
            }
        });
}

function OnLoadCallback(){
	gapi.client.load('youtube', 'v3');
	gapi.client.setApiKey('AIzaSyD4dd9D7Pa8Bl40MkigCoV1kn5Uy88uaFI');
	console.log("loaded api properly");
}


function searchYoutube(track){
	var q = track;
	var request = gapi.client.youtube.search.list({
		q: q,
		part: 'snippet'
	});

	request.execute(function(response){
		var json = response.result;
		var id = json.items[0].id.videoId;
		loadVideo(id);
	});
}

function loadVideo(id){
	var iframe = document.getElementById('player').src = "http://www.youtube.com/embed/" + id + "?enablejsapi=1";
	
}