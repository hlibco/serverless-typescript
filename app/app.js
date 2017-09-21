/**
 * HELPER: HTTP POST REQUEST
 */
function post (url, token, target) {
  document.getElementById(target).textContent = '';

  var xhr = new XMLHttpRequest();
  xhr.open("POST", url, true);
  xhr.setRequestHeader('Content-Type', 'application/json');
  xhr.setRequestHeader('Authorization', 'Bearer ' + token);
  xhr.send(JSON.stringify({
      from: 'JS Client'
  }));

  xhr.onload = function () {
    console.log('>> ', this.responseText);
    var data = JSON.parse(this.responseText);
    console.log(data);

    // Set output
    document.getElementById(target).textContent = this.responseText;
  }
}

/**
 * HELPER: HTTP GET REQUEST
 */
function get (url, target, callback) {
  document.getElementById(target).textContent = '';

  var xhr = new XMLHttpRequest();
  xhr.onreadystatechange = function () {
    if (this.readyState != 4) {
      return;
    }

    if (this.status === 200) {
      console.log('>> ', this.responseText);
      var data = JSON.parse(this.responseText);
      console.log(data);

      // Set output
      document.getElementById(target).textContent = this.responseText;

      if (callback) {
        callback(data);
      }
    }
    // end of state change: it can be after some time (async)
  };
  xhr.open('GET', url, true);
  xhr.send();
}


/**
 * CALL PUBLIC ENDPOINT
 */
function callPublicEndpoint (target) {
  var url = document.getElementById('api_url_public').value;

  get(url, target);
}

/**
 * CALL TOKEN ENDPOINT
 */
function callTokenEndpoint (target) {
  var url = document.getElementById('api_url_token').value;

  var callback = function (response) {
    var body = JSON.parse(response.body);
    console.log('>> ', body.token);
    document.getElementById('token').value = body.token;
  };
  var response = get(url, target, callback);
}

/**
 * CALL PRIVATE ENDPOINT
 */
function callPrivateEndpoint (target, useToken) {
  var url = document.getElementById('api_url_private').value;

  // This is a hidden field
  var token = document.getElementById('token').value;

  if (useToken && !token) {
    alert('No token provided. Call the token endpoint first.');
  }

  post(url, useToken ? token : null, target);
}
