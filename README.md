# HTTP Watchdog
A website availability monitoring application.

## Quick start

### 1. Make sure that you have installed in your machine:
 * [Node and NPM](https://nodejs.org/en/).
 * [MongoDB](https://docs.mongodb.com/manual/installation/)

### 2. Install

```
npm install
```

### 3. Run it

```
npm start
```

### 4. Open [http://localhost:3000](http://localhost:3000) in your browser

## About

This is a Node application that periodically makes HTTP requests for each website in a list. Its architecture consists of a Node thread that serves the application, another that does the monitoring and a web application that shows the monitoring data.

## `//TODO` list

- [ ] Server thread to serve the application and manage the list of websites for monitoring.
- [ ] Worker thread to monitor websites.
- [ ] Webapp to provide a graphical user interface.