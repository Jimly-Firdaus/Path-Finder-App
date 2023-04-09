# Tucil3_13521102_13521140

Pathfinding with UCS and A* algorithm

# Project Description
This project explores the use of two popular pathfinding algorithms: Uniform Cost Search (UCS) and A* (A-star). Both algorithms are used to find the shortest path between two points in a graph, but they use different strategies to achieve this goal.

UCS is a simple algorithm that expands nodes in order of their path cost from the start node. It guarantees to find the shortest path between the start and goal nodes, but it can be slow for large graphs.

A* is a more advanced algorithm that uses a heuristic function to guide its search. This allows it to find the shortest path more quickly than UCS, but it requires a good heuristic function to work effectively.

# Platform
This project is deployed at [Github Pages](https://jimly-firdaus.github.io/#/)
Repository : [Github Pages Repository](https://github.com/Jimly-Firdaus/Jimly-Firdaus.github.io)

Backend webserver: [PythonAnywhere](http://jimlyfirdaus.pythonanywhere.com/)

# How to run locally
To run this project locally you will need to install:
* pip
* node

Clone this repository. Move to the root of this project then,
```bash
npm ci          # for clean install
```
then
```bash
pip install flask
pip install flask_cors
pip install numpy
```
After that on the root of this repository, run:
```bash
quasar dev      # this will open browser at port 9000
```
Then cd to `src-backend` and run:
```bash
flask run       # this will start backend server (port 5000)
```
Change the `axios` post request inside `src/pages/IndexPage.vue` to `http://localhost:5000/solve` if you want to test the backend manually,

# Additional Information
There are 4 test case inside `test` folder that you can use (upload it to the web).

# Author
* 13521102 Jimly Firdaus
* 13521140 Ryan Samuel Chandra
