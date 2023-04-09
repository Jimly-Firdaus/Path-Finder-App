class AStarNode:
    def __init__(self, path_to_current_node, total_cost_to_this_node, node_pos, current_node_number, reliased_cost):
        self.path_to_node = path_to_current_node
        self.node_total_cost = total_cost_to_this_node
        self.latitude = node_pos[0]
        self.longitude = node_pos[1]
        self.current_node_number = current_node_number
        self.reliased_cost = reliased_cost

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
    