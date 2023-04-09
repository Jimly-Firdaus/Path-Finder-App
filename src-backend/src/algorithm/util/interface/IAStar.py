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
    #  @return path to goal
    @abstractmethod
    def get_final_route(self):
        pass

    #  Get total steps taken from A* solution.
    #  @return total steps taken
    @abstractmethod
    def get_steps_taken(self):
        pass