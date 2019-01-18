var searchYouTube = (options, callback) => {
  $.ajax({
    url: 'https://www.googleapis.com/youtube/v3/search',
    type: 'GET', 
    data: {
      q: options.query,
      maxResults: options.max,
      part: 'snippet',
      key: options.key
    },
    videoEmbeddable: 'true',
    success: function(data) {
      callback(data.items);
    },
    error: function(error) {
      console.log(error);
    }
  });
};

export default searchYouTube;
