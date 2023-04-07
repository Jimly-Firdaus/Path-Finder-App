import numpy as np

class AStarNode:
    def __init__(self, path_to_current_node, total_cost_to_this_node, x_pos, y_pos):
        self.path_to_node = path_to_current_node
        self.node_total_cost = total_cost_to_this_node
        self.x = x_pos
        self.y = y_pos
    
    # heuristic goal
    def find_cost_to_goal(self, x_goal, y_goal):
        p1 = np.array([self.x, self.y])
        p2 = np.array([x_goal, y_goal])
        return np.linalg.norm(p2 - p1)

    def find_total_cost(self, x_goal, y_goal):
        return self.node_total_cost + self.find_cost_to_goal(self, x_goal, y_goal)
