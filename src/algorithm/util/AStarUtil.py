from src.algorithm.util.Utility import d_haversine

class AStarNode:
    def __init__(self, path_to_current_node, total_cost_to_this_node, node_pos, current_node_number, reliased_cost):
        self.path_to_node = path_to_current_node
        self.node_total_cost = total_cost_to_this_node
        self.latitude = node_pos[0]
        self.longitude = node_pos[1]
        self.current_node_number = current_node_number
        self.reliased_cost = reliased_cost
    
    #  Heuristic for A* algorithm.
    #  @param goal_node_position (floating point, latitude & longitude).
    #  @return total cost from node-to-goal
    def find_cost_to_goal(self, goal_node_position):
        return d_haversine(self.latitude, self.longitude, goal_node_position[0], goal_node_position[1])

    #  Heuristic for A* algorithm.
    #  @param x_goal x coordinate (integer).
    #  @param y_goal y coordinate (integer).
    #  @return total cost from root-to-node-to-goal
    def find_total_cost(self, x_goal, y_goal):
        return self.node_total_cost + self.find_cost_to_goal(self, x_goal, y_goal)

    # heuristic here
    def __lt__(self, other):
        return self.node_total_cost < other.node_total_cost
    
    def get_history_route(self):
        return self.path_to_node
    
    def get_cost_to_this_node(self):
        return self.reliased_cost
    
    def get_node_position(self):
        return (self.latitude, self.longitude)
    
    def get_node_number(self):
        return self.current_node_number
