
var hackTask = (function () {

  //Cache dom
  var body = document.querySelector('body');
  body.className = "list-group";

  function _render(posts) {
    var newPostsArray = JSON.parse(posts);
    var i = 0;
    var postsLength = newPostsArray.length;
    var post;
    for (; i < postsLength; i++) {
      post = new _Post(newPostsArray[i]);
      body.appendChild(post.postContainer);
    }
  }

  function _xhrRequest(method, url, callback) {
    var xhttp = new XMLHttpRequest();
    xhttp.onreadystatechange = function () {
      if (this.readyState == 4 && this.status == 200) {
        callback(xhttp.responseText);
      }
    };
    xhttp.open(method, url, true);
    xhttp.send();
  }

  function _createElement(tagName, text, className) {
    var element = document.createElement(tagName);
    if (text) {
      element.appendChild(document.createTextNode(text));
    } else if (className) {
      element.className = className;
    }
    return element;
  }

  function init() {
    _xhrRequest("GET", "https://jsonplaceholder.typicode.com/posts/", _render);
  }

  var _Post = function (post) {
    //define properties
    this.bodyText = post.body;

    //create container and title
    this.postContainer = _createElement("div", null, "list-group-item");
    this.titleElement = _createElement("h2", "Title: " + post.title, "list-group-item");

    //assemble initial post view
    this.postContainer.appendChild(this.titleElement);

    //bind function and events
    this.showBody = this.showBody.bind(this);
    this.titleElement.addEventListener("click", this.showBody);

  }

  _Post.prototype.showBody = function (event) {
    if (this.postContainer.childNodes.length === 1) {
      var bodyElement = _createElement("p", "Description: " + this.bodyText);
      this.postContainer.appendChild(bodyElement);
    } else {
      event.target.nextSibling.classList.toggle("hide");
    }
  }

  return {
    init: init
  }

})()

hackTask.init();




