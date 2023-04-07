from algorithm.AStar import AStar
from algorithm.util.Utility import parse_file

def main():
    total_nodes, nodes, adjacency_matrix = parse_file('test_parser.txt')
    print(f'Total nodes: {total_nodes}')
    print('Nodes:')
    for name, coord in nodes:
        print(f'  {name}: {coord}')
    print('Adjacency matrix:')
    print(adjacency_matrix)

if __name__ == '__main__':
    main()
