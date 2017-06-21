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

This is a Node application that periodically makes HTTP requests for each website in a list. Its architecture consists of a Node thread that serves the application, another that does the monitoring and a web application that shows the monitoring data.

## `//TODO` list

- [X] Worker thread to monitor websites.
- [X] Server thread to serve the application and manage the list of websites for monitoring.
- [ ] Webapp to provide a graphical user interface.
- [ ] Realtime updates with websocket.
- [ ] Change sample time and fast time (100 ms) parameters through the app.
- [ ] Add another HTTP methods.
- [ ] Set HTTP headers through the app.