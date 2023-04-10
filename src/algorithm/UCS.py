#NIM: 13521102, 13521140
#Nama: Jimly Firdaus, Ryan Samuel Chandra
#Mata Kuliah: IF2211 Strategi Algoritma
#Topik: Tugas Kecil 3
#Tanggal: Jumat, 7 April 2023

#Program PathFindingUCS
#Spesifikasi: Menemukan lintasan dengan cost

#DEKLARASI LIBRARY
from util.Utility import *


#DEKALRASI DAN IMPLEMENTASI FUNGSI
def UCS(adjacency_matrix, total_nodes, nodes_data, start_node, _goal_node):
    #Fungsi untuk ...
#KAMUS LOKAL
    #...
#ALGORITME
    visited = []
    for i in range(total_nodes):
        visited.append(False)
    
    # search start node data
    starting_node = 0
    for name, pos in nodes_data:
        if (name == str(start_node)):
            break
        starting_node += 1

    # search goal node data
    finish_node = 0
    for name, pos in nodes_data:
        if (name == str(_goal_node)):
            break
        finish_node += 1

    simpul_hidup = {str(starting_node) : 0}
    while (bool(simpul_hidup) == True):
        sorted_simpul_hidup = sorted(simpul_hidup.items(), key=lambda x:x[1])
        sorted_simpul_hidup = dict(sorted_simpul_hidup)
        check = next(iter(sorted_simpul_hidup))
        list_check = check.split("-")
        simpul_ekspan = int(list_check[len(list_check)-1])
        visited[simpul_ekspan] = True

        for i in range (len(adjacency_matrix[simpul_ekspan])):
            if (adjacency_matrix[simpul_ekspan][i] == 1):
                if (visited[i] == False):
                    distance_now = d_haversine(nodes_data[simpul_ekspan][1][0], nodes_data[simpul_ekspan][1][1], nodes_data[i][1][0], nodes_data[i][1][1])
                    simpul_hidup[check+"-"+str(i)] = simpul_hidup[check] + distance_now

        if (visited[finish_node] == True):
            return (check, sorted_simpul_hidup[check])
        else:
            del simpul_hidup[check]


#TESTING
total_nodes, nodes, adjacency_matrix = parse_file('test/test_parser.txt')
print(f'Total nodes: {total_nodes}')
print('Nodes:')
for name, coord in nodes:
    # print (type(name))
    # print (type(coord))
    print(f'  {name}: {coord}')
print('Adjacency matrix:')
print(adjacency_matrix)
print("\n")

path, cost = UCS (adjacency_matrix, total_nodes, nodes, "dest_1", "dest_5")
print("\nJalur yang ditempuh: " + str(path))
print("Biaya: " + str(cost)) 

#REFERENCES
# footballers_goals = {'Eusebio': 120, 'Cruyff': 104, 'Pele': 150, 'Ronaldo': 132, 'Messi': 125}
# sorted_footballers_by_goals = sorted(footballers_goals.items(), key=lambda x:x[1])
# print(sorted_footballers_by_goals)
# converted_dict = dict(sorted_footballers_by_goals)
# print(converted_dict)