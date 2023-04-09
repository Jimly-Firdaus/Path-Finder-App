from abc import ABC, abstractmethod

class IAStar:
    #  Solve for A* algorithm.
    #  @param start_node starting node name (string).
    #  @param goal_node goal node name (string).
    #  @returns path to goal, total steps taken
    @abstractmethod
    def solve(self, start_node, goal_node):
        pass    

    #  Get final route from A* solution.
    #  @return path to goal and cost
    @abstractmethod
    def get_result_route(self):
        pass
