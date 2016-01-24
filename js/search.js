jQuery(document).ready(function($) {
	$('#search-button').click(function(event) {
		event.preventDefault();



		// add some information

		// load api
		gapi.client.load('youtube', 'v3').then(function() {
			// get musics list
			var query    = $('#query').val();
			var musics   = query.trim().split(/\s*[\r\n]+\s*/g);

			// add loading info
			$('#search-loading .number').html('1/' + musics.length);
			$('#search-loading').css('display', 'block');

			// get template
			var template = $('#youtube-row').html();
			Mustache.parse(template);

			// empty current results
			$('#search-container').html('');

			// search in Youtube API
			var error = '';
			for (var i = 0; i < musics.length; i++) {
				// check if the title hasn't been searched before
				if (musics.indexOf(musics[i]) == i) {
					var request = gapi.client.youtube.search.list({
						type: 'video',
						q: musics[i],
						part: 'snippet'
					});

					request.execute(function(response) {
						// we check if there's an error
						if (!response.hasOwnProperty('error')) {
							var youtubeMusics = response.result;

							var rendered = Mustache.render(template, {
								'id': youtubeMusics.items[0].id.videoId,
								'thumbnail': youtubeMusics.items[0].snippet.thumbnails.default.url,
								'title': youtubeMusics.items[0].snippet.title,
								'author': youtubeMusics.items[0].snippet.channelTitle
							});

							// render tpl + add lightbox
							$('#search-container').append(rendered);
							$("a[rel^='prettyPhoto']").prettyPhoto({social_tools: ''});
						}
						else {
							// just log the error
							error = 'Error ' + response.code + ': ' + response.message;
							console.log(error);
						}

						// increase number loading or hide loading block
						if (musics.length > i) {
							$('#search-loading .number').html((i+1) + '/' + musics.length);
						} else {
							$('#search-loading').css('display', 'none');
						}
					});
				}
			}
		});
	});
	
});