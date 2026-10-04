// Palindrome Logic needs to occur in Server Side
const http = require('http');
const fs = require('fs')
const url = require('url');
const querystring = require('querystring');
const figlet = require('figlet');

const server = http.createServer(function (req, res) {
  const page = url.parse(req.url).pathname;
  const params = querystring.parse(url.parse(req.url).query);
  console.log(page);

  if (page == '/') {
    fs.readFile('index.html', function (err, data) {
      res.writeHead(200, { 'Content-Type': 'text/html' });
      res.write(data);
      res.end();
    });
  }

  else if (page == '/api') {
    if ('wordToBeCheckedForPalindrome' in params) {
      res.writeHead(200, { 'Content-Type': 'application/json' });
      // take what the query parameter is equal to and store it in a variable, to then work with
      const wordFromUser = params['wordToBeCheckedForPalindrome']
      // Palindrome Logic:
      let wordBackwards = ''
      let message = ''
      // Reverse the word:
      for (let i = wordFromUser.length - 1; i >= 0; i--) {
        wordBackwards += wordFromUser[i]
      }
      // Check if the word is a palindrome
      if (wordBackwards == params['wordToBeCheckedForPalindrome']) {
        message = 'This is a palindrome!'
        const objToJson = {
          yourWord: `You entered: ${wordFromUser}`,
          palindromeWord: `The word backwards: ${wordBackwards}`,
          messageToPrint: 'You have a palindrome!'
        }
        res.end(JSON.stringify(objToJson));
      } else {
        message = 'This is not a palindrome'
        const objToJson = {
          yourWord: `You entered: ${wordFromUser}`,
          palindromeWord: `The word backwards: ${wordBackwards}`,
          messageToPrint: 'You do not have a palindrome!'
        }
        res.end(JSON.stringify(objToJson));
      }
    }
  }

  // other website load
  else if (page == '/css/style.css') {
    fs.readFile('css/style.css', function (err, data) {
      res.write(data);
      res.end();
    });
  } else if (page == '/css/images.jpeg') {
    fs.readFile('css/images.jpeg', function (err, data) {
      res.write(data);
      res.end();
    });
  } else if (page == '/js/main.js') {
    fs.readFile('js/main.js', function (err, data) {
      res.writeHead(200, { 'Content-Type': 'text/javascript' });
      res.write(data);
      res.end();
    });
  } else {
    figlet('404!!', function (err, data) {
      if (err) {
        console.log('Something went wrong...');
        console.dir(err);
        return;
      }
      res.write(data);
      res.end();
    });
  }
});

server.listen(8000);
