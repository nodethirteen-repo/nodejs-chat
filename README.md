# Express JS & Socket.io Integration

## OS Requirements

```bash
sudo apt update
sudo apt upgrade
sudo apt-get install -y git curl build-essential
```

## Install Node JS (for Debian Systems)

```bash
curl -sL https://deb.nodesource.com/setup_10.x | sudo -E bash -
sudo apt-get install -y nodejs
```

## Install Node JS (for MacOS, note brew installation out of scope)

```bash
curl "https://nodejs.org/dist/latest/node-${VERSION:-$(wget -qO- https://nodejs.org/dist/latest/ | sed -nE 's|.*>node-(.*)\.pkg</a>.*|\1|p')}.pkg" > "$HOME/Downloads/node-latest.pkg" && sudo installer -store -pkg "$HOME/Downloads/node-latest.pkg" -target "/"
```

or

```bash
brew install node
```

## Install NodeJS (for Windows note cinst/scoop installation out of scope)

```bash
cinst nodejs.install
```

or

```bash
scoop install nodejs
```

## Check version
```bash
node --version
npm --version
```

## Packages that need to be installed globally

```bash
sudo npm i -g node-gyp
sudo npm i -g express-generator
```

## Create new application

```bash
express --view=pug express-socket
cd express-socket
npm i
npm i --save socket.io
```

## Change bin/www file as mentioned below

```javascript
// ...
var http = require('http');

// ...
server.on('listening', onListening);
// ...
```

### to

```javascript
// ...
var http = require('http');

// Get socket service
var socketHelper = require('../lib/service/socketio');
// ...
server.on('listening', onListening);

// Inject server to the socket service
socketHelper(server);
// ...
```

## Create new file at lib/service/socketio.js

```javascript
module.exports = (server) => {
  var io = require('socket.io')(server);

  io.on('connection', function(socket){
    console.log('a user connected');

    socket.on('chat message', function(msg){
      console.log('message: ' + msg);
      io.emit('chat message', msg);
    });

    socket.on('disconnect', function(){
      console.log('user disconnected');
    });
  });
}
```
## Create new file at public/javascripts/landing-socket.js

```javascript
$(function () {
  var socket = io();

  $('#messages').append($('<li class="list-group-item list-group-item-dark">').text('Welcome!'));
  $('form').submit(function(){
    socket.emit('chat message', $('#m').val());
    $('#m').val('');
    return false;
  });
  socket.on('chat message', function(msg){
    $('#messages').append($('<li class="list-group-item">').text(msg));
  });
});
```

## Change views/layout.pug as mentioned below

```pug
doctype html
html(lang='en')
  head
    meta(charset='utf-8')
    meta(name='viewport', content='width=device-width, initial-scale=1, shrink-to-fit=no')
    title= title
    link(rel='stylesheet', href='https://stackpath.bootstrapcdn.com/bootstrap/4.1.3/css/bootstrap.min.css')
    link(rel='stylesheet', href='/stylesheets/style.css')
  body
    block content
    script(src='/socket.io/socket.io.js')
    script(src='https://ajax.googleapis.com/ajax/libs/jquery/3.3.1/jquery.min.js')
    script(src='https://cdnjs.cloudflare.com/ajax/libs/popper.js/1.14.3/umd/popper.min.js')
    script(src='https://stackpath.bootstrapcdn.com/bootstrap/4.1.3/js/bootstrap.min.js')
    script(src='/javascripts/landing-socket.js')
```

## Change views/index.pug as mentioned below

```pug
extends layout

block content
  .container.landing
    .jumbotron.mt-4
      h1.display-5.m-2.p-2 Express &amp; Socket Integration
      ul.list-group.m-2.p-2#messages
      .row.m-2.p-2
        .col
          form
            .row
              .col-12
                .form-group
                  input.form-control#m(type='text', autocomplete='off', placeholder='Enter your message here')
            .row
              .col-12
                button.btn.btn-primary.btn-lg Send
```

## Change package.json file:

```json
"scripts": {
  "start": "node ./bin/www"
},
```

### to

```json
"scripts": {
  "start": "node ./bin/www",
  "debug-win": "SET DEBUG=express-socket:* & npm start",
  "debug": "DEBUG=express-socket:* npm start"
},
```


## For MacOS or Debian

```bash
npm run debug
```

## For windows

```bash
npm run debug-win
```

## More information could be found at:
1. https://nodejs.org/en/download/package-manager/
2. https://expressjs.com/en/starter/generator.html
3. https://socket.io/docs/ or https://socket.io/get-started/chat/
4. https://getbootstrap.com/docs/4.1/getting-started/introduction/

## Follow us at:
1. http://www.nodethirteen.com
2. http://blog.nodethirteen.com
