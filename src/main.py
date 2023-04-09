from src.algorithm.util.Utility import parse_file
from src.algorithm.AStar import AStar
from src.algorithm.UCS import UCS

def main(text: str, src: str, dest: str, solver: str):
    total_nodes, nodes, adjacency_matrix = parse_file(text)
    print(f'Total nodes: {total_nodes}')
    print('Nodes:')
    for name, coord in nodes:
        print(f'  {name}: {coord}')
    print('Adjacency matrix:')
    print(adjacency_matrix)

    if (solver == "UCS"):
        path, cost = UCS(adjacency_matrix, total_nodes, nodes, src, dest)
        return (cost, path)
    else:
        print("Solve for A Star")
        a_star = AStar(adjacency_matrix, total_nodes, nodes)
        a_star.solve(src, dest)
        return a_star.get_result_route()

