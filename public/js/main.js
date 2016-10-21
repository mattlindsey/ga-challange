// Get the page elements that will be required
var movieElem = document.getElementById('movieInput');
var btnElem = document.getElementById('submitBtn');
var resultElem = document.getElementById('resultArea');

// Create our XMLHttpRequest object through which we make the AJAX request
var request = new XMLHttpRequest();

// Write the function that will run when the server sends back the response data. The XMLHttpRequest object has the onreadystatechange property which stores this function. Every time the state of the request changes, this callback function is executed.
request.onreadystatechange = function() {
  // Monitor a few other properties of the XMLHttpRequest object. First, the readyState property specifies the state of our request. Throughout the AJAX call its value changes and can receive values from 0 to 4 (e.g. the value 4 means that the response data is available to us). Second, the status property indicates whether the request is successful or not (e.g. the value 200 defines a successful request). In this example, assuming that we retrieve the response data and the AJAX call is successful, we update the content of the target element. Otherwise, we display a message with information extracted from the XMLHttpRequest object.
  if(request.readyState === 4) {
    resultElem.style.border = '1px solid #e8e8e8';
    if(request.status === 200) {
      resultObj = JSON.parse(request.responseText);

      // Loop through the array of ojects returned, appending each field to a string
      var str = '';
      for (i = 0; i < resultObj.Search.length; i++) {
        for (item in resultObj.Search[i]) {
          str += item + ": " + resultObj.Search[i][item] + '<br>';
        }
        str += '<br>';
      }

      // OR, a little more fancy below:
      //var str = '';
      //resultObj.Search.forEach(forFunction);
      //function forFunction (item, index) {
      //  for( var key in item ) {
      //    str += key + ": " + item[key] + '<br>';
      //  }
      //  str += '<br>';
      //}

      resultElem.innerHTML += str;
    } else {
      resultElem.innerHTML = 'An error occurred during your request: ' +  request.status + ' ' + request.statusText;
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
  request.open('GET', 'http://www.omdbapi.com/?s=' + movieElem.value); //'https://s3-us-west-2.amazonaws.com/s.cdpn.io/162656/Bio.txt');

  //this.style.display = 'none';
  request.send();
});
