from src.algorithm.util.interface.IAStar import IAStar
from src.algorithm.util.AStarUtil import AStarNode
from src.algorithm.util.Utility import d_haversine
import heapq

class AStar(IAStar):
    def __init__(self, adjacency_matrix, total_nodes, nodes_data):
        self.adjacency_matrix = adjacency_matrix
        self.total_nodes = total_nodes
        self.nodes = nodes_data
    
    def solve(self, start_node, _goal_node):
        # bound index
        max_index = len(self.adjacency_matrix)

        root_position = {
            "latitude": 0,
            "longitude": 0
        }
        goal_position = {
            "latitude": 0,
            "longitude": 0
        }

        # search starting node data
        starting_node = 0
        for name, pos in self.nodes:
            if (name == str(start_node)):
                root_position["latitude"] = pos[0]
                root_position["longitude"] = pos[1]
                break
            starting_node += 1

        # search goal node data
        goal_node = 0
        for name, pos in self.nodes:
            if (name == str(_goal_node)):
                goal_position["latitude"] = pos[0]
                goal_position["longitude"] = pos[1]
                break
            goal_node += 1
        # found the starting, goal data, and starting_node for adjacency matrix
        # start searching
        goal_not_found = True
        
        # initiate starting node
        cost_to_goal = d_haversine(root_position["latitude"], root_position["longitude"], goal_position["latitude"], goal_position["longitude"])
        start_node_data = AStarNode("", cost_to_goal, (root_position["latitude"], root_position["longitude"]), starting_node, 0)
        AStarPQueue = []
        heapq.heappush(AStarPQueue, (cost_to_goal, start_node_data))
        current_node = starting_node
        while (goal_not_found != False):
            # Find all the available path from current node
            # get the cost then push it to Pqueue
            # repeat until found goal
            current_node_data = heapq.heappop(AStarPQueue)
            current_node = current_node_data[1].get_node_number()

            # if found goal
            if (current_node == goal_node):
                goal_not_found = False
                self.result_node = current_node_data[1].get_cost_to_this_node()
                self.final_route = current_node_data[1].get_history_route() + "-" + str(current_node)
                break
            
            for i in range(max_index):
                if (self.adjacency_matrix[current_node][i] == 1):
                    path_to_this_node = current_node_data[1].get_history_route() + "-" + str(current_node)
                    reliased_cost = d_haversine(self.nodes[i][1][0], self.nodes[i][1][1], self.nodes[current_node][1][0], self.nodes[current_node][1][1]) + current_node_data[1].get_cost_to_this_node()
                    
                    #  Heuristic for A* algorithm.
                    cost_to_goal = d_haversine(self.nodes[i][1][0], self.nodes[i][1][1], goal_position
                    ["latitude"], goal_position["longitude"]) + reliased_cost
                    
                    # Enqueue new node
                    new_node_data = AStarNode(path_to_this_node, cost_to_goal, self.nodes[i][1], i, reliased_cost)
                    heapq.heappush(AStarPQueue, (cost_to_goal, new_node_data))

    def get_result_route(self):
        result_route = self.final_route[1:]
        return (str(self.result_node), result_route)
    