# HTTP Watchdog
A website availability monitoring application.

## Quick start

### 1. Make sure that you have installed in your machine:
 * [Node and NPM](https://nodejs.org/en/)
 * [MongoDB](https://docs.mongodb.com/manual/installation/) (check if it's already running)

### 2. Clone or download this project

### 3. Enter the folder

```
cd HTTPWatchdog
```

### 4. Install

```
npm install
```

### 5. Run it

```
npm start
```

### 6. Open [http://localhost:3000](http://localhost:3000) in your browser

## About

This is a Node application that periodically makes HTTP requests for each website in a list. Its architecture consists of a Node process that serves the application (REST and socket server), another that does the monitoring (HTTP client worker) and a web application that shows the monitoring data. Node was chosen mainly because it is non-blocking IO, that means HTTP requests measures have less interference one with each other. The worker process is child of the server process, which allows measurements to be made almost independently of the demand of HTTP Watchdog clients.

The data is stored in a non-relational database, MongoDB. Its a good solution for scalable and low complexity database projects. The URLs of the monitored websites as well as the service level objectives (SLO) and service level indicators (SLI) are stored for the percentage of fast responses (`<= 100 ms`) and the percentage of successful responses (`200 < = status <= 499`).

The server process implements the basic REST services for the websites: list, read, create, update and delete. Meanwhile, the worker process updates the SLI's in the database and sends this updated data to the server process, which in turn broadcasts to the clients via websocket. Using websockets helps to save bandwidth in a real-time data application.

The web application is a SPA (single-page application) developed with AngularJS, which is a great choice for a fast and responsive web user interface. There are also build automation scripts and dependency management using NPM and Webpack that supports the development workflow.

## `//TODO` list

- [X] Worker process to monitor websites.
- [X] Server process to serve the application and manage the list of websites for monitoring.
- [X] Webapp to provide a graphical user interface.
- [X] Real-time updates with websocket.
- [ ] Change sample time and fast time (100 ms) parameters through the app.
- [ ] Save measurements history.
- [ ] Add another HTTP methods.
- [ ] Set HTTP headers through the app.

