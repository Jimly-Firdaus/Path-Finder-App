from abc import ABC, abstractmethod

class IAStar:
    @abstractmethod
    def solve(self, matrix):
        pass    
    @abstractmethod
    def get_final_route(self):
        pass
    @abstractmethod
    def get_steps_taken(self):
        pass
