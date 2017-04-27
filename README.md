# Html5 IndexedDB NodeJS

This project is a proof of concept (POC).  
It's purpose is to demonstrate an implementation of IndexedDB to make local data persistence and to synchronize it to a remote SQLite database using a NodeJS REST API.

- Server Application : A NodeJS REST API using SQLite as a database (sqlite.db). The code is written in ES6 and uses Promises.

- Client Application (Not working yet !) : A Web interface using IndexedDB as a database (using Dexie library).  
Views are served by VueJS.

For more details, see the [Technological Plan](https://github.com/so-technology-watch/html5-indexeddb-nodejs/blob/master/public/ressources/TechnologicalPlan.pptx).

## Installation :

1. Clone this repository : `git clone https://github.com/so-technology-watch/html5-indexeddb-nodejs.git`  
2. Then install its dependencies : `npm install`

## Requirements :

- [NodeJS](https://nodejs.org/en/).
- [Npm](https://www.npmjs.com/).
- A Web Browser to test the Client Application.
- [Postman](https://www.getpostman.com/) if you just want to test the API.

## Getting started :

0. Install this application (See Installation).
1. Start the server with : `node Server.js`
2. Start your Web Browser and go to `http://localhost:3000`   
Or connect Postman to the API at : `http://localhost:3000`
3. Try the different "Cars" and "Drivers" web pages.  
And the different routes of the API.

Alternatively, you can use `node Server.js YOUR_PORT_NUMBER` to start the server with a specific port.  
For more details, see the [Wiki documentation](https://github.com/so-technology-watch/html5-indexeddb-nodejs/wiki).

## Credits

- Laurent Guerin, creator of [Telosys Tools](https://sites.google.com/site/telosystools/).
- Evan You, creator of VueJS.
- David Fahlander, creator of Dexie.js.

## License

This project uses the LGPL v3 License (See the LICENSE file in this repository).