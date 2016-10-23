// Get the page elements that will be required to submit the various XHRs
var btnElem = document.getElementById('submitBtn');
var resultElem = document.getElementById('resultArea');
var movieElem = document.getElementById('movieInput');
var favTable = document.getElementById('favTable');
var btnClear = document.getElementById('truncateBtn');

// Create our XMLHttpRequest object through which we make the search AJAX request
var request = new XMLHttpRequest();

// The function that will run when the server sends back the response data.
// The XMLHttpRequest object has the onreadystatechange property which stores
// this function. Every time the state of the request changes, this callback
// function is executed.
request.onreadystatechange = function() {
  // Monitor a few other properties of the XMLHttpRequest object.
  // First, the readyState property specifies the state of our request.
  // Throughout the AJAX call its value changes and can receive values from 0 to 4
  // (e.g. the value 4 means that the response data is available to us).
  // Second, the status property indicates whether the request is successful or
  // not (e.g. the value 200 defines a successful request).
  // In this example, assuming that we retrieve the response data and the AJAX
  // call is successful, we update the content of the target element.
  // Otherwise, we display a message with information extracted from the XMLHttpRequest object.
  if(request.readyState === XMLHttpRequest.DONE ) {
    resultElem.style.border = '1px solid #e8e8e8';
    if(request.status === 200) {
      resultObj = JSON.parse(request.responseText);

      // Loop through array of ojects returned, appending each field to a string
      var str = 'Total Results: ' + resultObj.totalResults + '<br><ol>';
      for (i = 0; i < resultObj.Search.length; i++) {
        str += '<li><ul>';
        for (item in resultObj.Search[i]) {
          if (item === 'Poster') {
            str += '<li class="greenBtn" onclick=expandPoster(this) data-theurl="'
                + resultObj.Search[i][item] + '">CLICK ME FOR POSTER!</li>';
          } else {
            str += '<li>' + item + ": " + resultObj.Search[i][item] + '</li>';
          }
          if (item === 'Title') {
            str += '<button class="greenBtn favoriteBtn" onclick=saveFavorite(this) data-thename="'
                + resultObj.Search[i][item] + '">Make a Favorite!</button>';
          }
        }
        str += '</ul></li>';
      }
      str += '</ol>'
      // Now we create screen elements by setting the html of the resultArea div
      resultElem.innerHTML += str;
    } else {
      resultElem.innerHTML = 'An error occurred during your request: ' +
        request.status + ' ' + request.statusText;
    }
  }
}

// Submit the request when the button is clicked via the send method.
btnElem.addEventListener('click', function() {
  // Specify the type of the request by using the open method.
  // This method accepts two required parameters and three optional ones.
  // The first required parameter defines the HTTP method (e.g. GET or POST).
  // The second one determines the URL to which we’ll send the request.
  // Optionally, we pass a third boolean parameter which indicates whether
  // the request is asynchronous (i.e. default true value) or synchronous.
  // The other two optional parameters can be used for authentication purposes.
  request.open('GET', 'https://www.omdbapi.com/?s=' + movieElem.value, true);
  request.send();
});

// Create the image of the poster when user clicks on 'CLICK ME FOR POSTER!''
function expandPoster(elem) {
  var poster = document.createElement("img");
  poster.setAttribute("class", "poster");
  poster.src = elem.dataset.theurl;
  elem.innerHTML = "";
  elem.appendChild(poster);
};

// Create our 2nd XMLHttpRequest object through which we make the save request
var requestSave = new XMLHttpRequest();
// When the favorite button is clicked, save & create link on screen of favorite
function saveFavorite(elem) {
  var data = JSON.parse('{\"name\": \"' + elem.dataset.thename + '\"}');
  var str = '{\"name\": \"' + elem.dataset.thename + '\"}';
  console.log(str);
  requestSave.open('POST', '/favorites');
  requestSave.setRequestHeader("Content-Type", "application/json");
  requestSave.send(str);

  var fav = document.createElement("tr");
  fav.innerHTML = '<td>' + elem.dataset.thename + '</td>';
  favTable.appendChild(fav);
};

// Create our 3nd XMLHttpRequest object through which we make the clear request
var requestClear = new XMLHttpRequest();
btnClear.addEventListener('click', function() {
  requestClear.open('DELETE', '/favorites');
  requestClear.send();
});
