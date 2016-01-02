$(window).load(function() {
  $('.box-wrapper').each(function() {
    
    var element = $(this),
      title = element.find('.product-name').text(),
      encodedTitle = encodeURIComponent(title
          .replace(/\([0-9]+\)/, '')
          .replace(/\(Blu-Ray\)/, '')
          .trim()),
      yearStr = title.match(/[0-9]{4}/);

    if (yearStr != null) {
      yearStr = yearStr[0];
    }

    $.get('http://omdbapi.com?s=' + encodedTitle, function(data) {
      var metaDiv = '<div>Metacritic Rating: Not found</div>',
        imdbDiv = '<div>IMDB Rating: Not found</div>'

      if ('Search' in data) {
        var id = data['Search'][0]['imdbID'],
          i = 0;
        for (i = 0; i < data['Search'].length; i++) {
          if (data['Search'][i]['Year'] == yearStr) {
            id = data['Search'][i]['imdbID'];
          }
        }
        
        $.get('http://omdbapi.com?i=' + id, function(data) {
          var imdbRating = data['imdbRating'], 
            metacritic = data['Metascore'];

          metaDiv = '<div>Metacritic Rating: ' + metacritic + '</div>';
          imdbDiv = '<div>IMDB Rating: ' + imdbRating + '</div>';
          
          $(element).find('.product-name').append(metaDiv);
          $(element).find('.product-name').append(imdbDiv);
        });   
      } else {
        $(element).find('.product-name').append(metaDiv);
        $(element).find('.product-name').append(imdbDiv);
      }
    });
  });
});
