export interface Path {
  latitude: number;
  longitude: number;
}

export interface AreaData {
  numLocations: number;
  locations: {name: string, coordinates: number[]}[];
  adjacencyMatrix: number[][]
}
