from src.algorithm.util.Utility import parse_file
from src.algorithm.AStar import AStar

def main(text: str):
    total_nodes, nodes, adjacency_matrix = parse_file(text)
    print(f'Total nodes: {total_nodes}')
    print('Nodes:')
    for name, coord in nodes:
        print(f'  {name}: {coord}')
    print('Adjacency matrix:')
    print(adjacency_matrix)

    print("Solve for A Star")
    a_star = AStar(adjacency_matrix, total_nodes, nodes)
    a_star.solve("dest_1", "dest_5")
    return a_star.get_result_route()

