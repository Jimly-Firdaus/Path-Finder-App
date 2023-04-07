import numpy as np
from math import radians, sin, cos, sqrt, atan2

def parse_file(filename):
    with open(filename, 'r') as f:
        lines = f.readlines()
        total_nodes = int(lines[0])
        nodes = []
        for i in range(1, total_nodes * 2 + 1, 2):
            name = lines[i].strip()
            coord = tuple(map(float, lines[i + 1].strip().split()))
            nodes.append((name, coord))
        adjacency_matrix = np.array([list(map(int, line.strip().split())) for line in lines[total_nodes * 2 + 1:]])
    return total_nodes, nodes, adjacency_matrix
