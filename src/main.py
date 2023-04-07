# from algorithm.AStar import AStar
from algorithm.util.Utility import parse_file

def main():
    total_nodes, nodes, adjacency_matrix = parse_file('test/test_parser.txt')
    print(f'Total nodes: {total_nodes}')
    print('Nodes:')
    for name, coord in nodes:
        # print (type(name))
        # print (type(coord))
        print(f'  {name}: {coord}')
    print('Adjacency matrix:')
    print(adjacency_matrix)

    x = "AKU "
    y = "ADALAH"
    print (x+y)
    
if __name__ == '__main__':
    main()
