import numpy as np
from math import radians, sin, cos, sqrt, atan2

def parse_file(text: str):
    lines = text.splitlines()
    total_nodes = int(lines[0])
    nodes = []
    for i in range(1, total_nodes * 2 + 1, 2):
        name = lines[i].strip()
        coord = tuple(map(float, lines[i + 1].strip().split()))
        nodes.append((name, coord))
    adjacency_matrix = np.array([list(map(int, line.strip().split())) for line in lines[total_nodes * 2 + 1:]])
    return total_nodes, nodes, adjacency_matrix

def d_haversine (latitude_1, longitude_1, latitude_2, longitude_2):
    earth_rad = 6371

    # conversion
    lat1, lon1, lat2, lon2 = map(radians, [latitude_1, longitude_1, latitude_2, longitude_2])

    # find d
    d_latitude = lat2 - lat1
    d_longitude = lon2 - lon1

    # harversine distance
    haversine = sin(d_latitude / 2) ** 2 + cos(lat1) * cos(lat2) * sin(d_longitude / 2) ** 2
    central_angle = 2 * atan2(sqrt(haversine), sqrt(1 - haversine))
    haversine_distance = earth_rad * central_angle
    return haversine_distance
