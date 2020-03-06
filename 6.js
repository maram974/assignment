// CPCS 324 Algorithms & Data Structures 2
// Graph data structure demo - First Edge Object
// 2016, Dr. Muhammad Al-Hashimi
// -----------------------------------------------------------------------
// simple graph object with linked-list edge implementation and minimal fields
// extra vertex and edge property fields to be added later as needed
//
var _v = [],
    _e = []; // globals used by standard graph reader method
    

// -----------------------------------------------------------------------
// graph caller function - sort of main() for caller page
// called directly, or on load success event of some input file

function main_graph() {
    // create a graph (default undirected)
    var g = new Graph();

    // set graph properties
    g.label = "Figure 3.10 (Levitin, 3rd edition)";
    g.weighted = true;

    // use global input arrays _v and _e to initialize its internal data structures
    g.read_graph(_v, _e);

    // use print_graph() method to check graph
    g.print_graph();

    // report connectivity status if available
    var con = g.connectedComp;
    if (con == 0) {
        document.write("<p>no connectivity info</p>")
    } else {
        document.write("<p>DISCONNECTED ", con, "</p");
    }
	
	// list vertices	
    g.list_vert();
	
    // perform depth-first search and output stored result
    g.topoSearch();
    document.write("<p>", "dfs_push: ", g.dfs_push, "</p>");

    // report connectivity status if available
    con = g.connectedComp;
    con==0? document.write("<p>no connectivity info") :  document.write("DISCONNECTED ", con);
    
    g.topoCounter++;
    // perform breadth-first search and output stored result
    g.topoSearch();
    document.write("<p>", "bfs_out: ", g.bfs_out, "</p>");

    // output the graph adjacency matrix
    g.makeAdjMatrix();
    document.write("<p>", "first row matrix: ", g.adjMatrix[0], "</p>");
    document.write("<p>", "last row matrix: ", g.adjMatrix[g.nv - 1], "</p>");

}


// -----------------------------------------------------------------------
// Vertex object constructor

function Vertex(v) {
    // user input fields
    this.label = v.label; // vertex can have label, example: a, v1, jeddah

    // more fields to initialize internally
    this.visit = false; // vertex can be marked visited (useful for traversals)
    this.adjacent = new List(); // head pointer of adjacency linked list

    // --------------------
    // member methods use functions defined below
    this.adjacentByID = adjacentByID;


}

// -----------------------------------------------------------------------
// Edge object constructor
function Edge() {
    this.target_v;
    this.weight;
}


// -----------------------------------------------------------------------
// Graph object constructor

function Graph() {
    this.vert = new Array(); // vertex list: array of Vertex objects
    this.nv; // number of vertices
    this.ne; // number of edges
    this.digraph = false; // true if digraph, false otherwise (default undirected)
    this.dfs_push = []; // DFS traversal order output array
    this.bfs_out = []; // BFS traversal order output array
    this.label = ""; // identification string to label graph
    this.connectedComp = 0; // number of connected comps set by DFS; 0 for no info
    this.adjMatrix = []; // graph adjacency matrix to be created on demand
    this.weighted = false; // true if weighted, false otherwise (default unweighted)
    
    // --------------------
    // student property fields next

    // --------------------
    // member methods use functions defined below

    this.read_graph = better_input; // default input reader method   

    this.add_edge = add_edge2;
    this.print_graph = print_graph;
    this.list_vert = list_vert;
    this.makeAdjMatrix = makeAdjMatrix;

    // --------------------
    // student methods next; actual functions in student code section at end

    this.topoSearch = topoSearch; // perform a topological search  
    this.topoCounter = 1;
    this.dfs = dfs; // DFS a connected component
    this.bfs = bfs; // BFS a connected component

}


// -----------------------------------------------------------------------
// functions used by methods of Graph object
// similar to other functions but use object member fields and methods depending
// on which object is passed by method call through "this"
//

function add_edge2(u_i, v_i, w) {
    // fetch vertices using their id, where u: edge source vertex, v: target vertex
    var u = this.vert[u_i];
    var v = this.vert[v_i];

    // insert (u,v), i.e., insert v in adjacency list of u
    // (first create edge object using v_i as target, then pass edge object)
    var edge = new Edge();
    edge.target_v = v_i; edge.weight = w;
    u.adjacent.insert(edge);

    // insert (v,u) if undirected graph (repeat above but reverse vertex order)
    if (!this.digraph) {
        edge = new Edge();
        edge.target_v = u_i; edge.weight = w;
        v.adjacent.insert(edge);
    }

}

// --------------------
function print_graph() {
    document.write("<p>GRAPH {", this.label, "} ", this.weighted?"":"UN", "WEIGHTED, ", this.digraph ? "" : "UN", "DIRECTED - ", this.nv, " VERTICES, ",
        this.ne, " EDGES:</p>");

}

// --------------------
function list_vert() {
    var i, v; // local vars
    for (i = 0; i < this.nv; i++) {
        v = this.vert[i];
        document.write("VERTEX: ", i, " {", v.label, "} - VISIT: ", v.visit,
            " - ADJACENCY: ", v.adjacentByID(), "<br>");
    }
}

// --------------------
function better_input(v, e ) // default graph input method
{
    // set number of vertices and edges fields
    this.nv = v.length;
    this.ne = e.length;

    // read vertices into internal vertex list (array)
    for (i = 0; i < this.nv; i++) {
        this.vert[i] = new Vertex(v[i]);
    }

    // add edges using vertex pairs from edge list input array
    // remember to pass vertex ids to add_edge() 
    for (i = 0; i < this.ne; i++) {
        this.add_edge(e[i].u, e[i].v, e[i].w);
    }
    // double edge count if graph undirected 
    if (!this.digraph) {
        this.ne = e.length * 2;
    }
}

// -----------------------------------------------------------------------
// utility functions used by Graph object method functions
function adjacentByID() {
    var adjacent_id = [];
    var edge_obj = this.adjacent.traverse();
    for (var i = 0; i < edge_obj.length; i++) {
        adjacent_id[i] = edge_obj[i].target_v;
    }
    return adjacent_id;
}

// -----------------------------------------------------------------------
// -----------------------------------------------------------------------
// --- begin student code section ----------------------------------------
function topoSearch() {
    // mark all vertices unvisited
    for (var i = 0; i < this.nv; i++) {
        this.vert[i].visit = false;
    }
    // traverse a connected component 	
    for (i = 0; i < this.nv; i++) {
        if (!this.vert[i].visit) {
        	this.topoCounter == 1 ?  (this.connectedComp++, this.dfs(i)) :  this.bfs(i);      
        }
    }
}

// --------------------
function dfs(v_i) {
    // process vertex
    var v = this.vert[v_i];
    v.visit = true;
    this.dfs_push[this.dfs_push.length] = v_i;

    // recursively traverse its unvisited adjacent vertices 
    var w = v.adjacentByID();
    for (var i = 0; i < w.length; i++) {
        if (!this.vert[w[i]].visit) {
            this.dfs(w[i]);
        }
    }
}

// --------------------
function bfs(v_i) {
    // process v (using its id)
    var v = this.vert[v_i];
    v.visit = true;
    this.bfs_out[this.bfs_out.length] = v_i;

    // initialize queue with v
    var queue = new Queue();
    queue.enqueue(v);

    // while queue not empty
    while (!queue.isEmpty()) {
        // dequeue and process a vertex, u
        var u = queue.dequeue();

        // queue unvisited vertices adjacent to u
        var w = u.adjacentByID();
        for (var i = 0; i < w.length; i++) {
            if (!this.vert[w[i]].visit) {
                this.vert[w[i]].visit = true;
                queue.enqueue(this.vert[w[i]]);
                this.bfs_out[this.bfs_out.length] = w[i];
            }
        }
    }
}

// --------------------
function makeAdjMatrix() {
    // initially create row elements and zero the adjacncy matrix
    for (var i = 0; i < this.nv; i++) {
        this.adjMatrix[i] = [];

        for (var j = 0; j < this.nv; j++) {
            this.adjMatrix[i][j] = 0;
        }

		var v = this.vert[i];
		var w = v.adjacentByID(); 
        //weight of adjacency vertices 
        var weight_obj = v.adjacent.traverse();
        
        // for each vertex, set 1 for each adjacency      
        for (var k = 0; k < w.length; k++) {
        	!this.weighted? this.adjMatrix[i][w[k]] = 1 : this.adjMatrix[i][w[k]] = weight_obj[k].weight;
        }

    }

}