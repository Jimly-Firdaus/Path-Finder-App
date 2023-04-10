import { AreaData } from '.';

export const ALUN_ALUN_BANDUNG: AreaData = {
  numLocations: 7,
  locations: [
    {
      name: 'alun_alun_kota_bandung',
      coordinates: [-6.921767539223663, 107.60702959037364],
    },
    {
      name: 'museum_kaa',
      coordinates: [-6.921050678990393, 107.60962132542737],
    },
    {
      name: 'braga',
      coordinates: [-6.920450293141001, 107.60993113662552],
    },
    {
      name: 'asia_afrika',
      coordinates: [-6.921227295783017, 107.60781740532646],
    },
    {
      name: 'otto_iskandar',
      coordinates: [-6.921509473854025, 107.60403904889502],
    },
    {
      name: 'cibadak',
      coordinates: [-6.921959463430162, 107.60306272491884],
    },
    {
      name: 'sudirman',
      coordinates: [-6.920624159450902, 107.60292903329082],
    },
  ],
  adjacencyMatrix: [
    [0, 0, 0, 1, 1, 1, 0],
    [1, 0, 1, 1, 0, 0, 0],
    [0, 1, 0, 0, 0, 0, 0],
    [1, 1, 1, 0, 1, 1, 1],
    [0, 0, 0, 1, 0, 1, 1],
    [0, 0, 0, 0, 1, 0, 0],
    [0, 0, 0, 0, 1, 0, 0],
  ],
};

export const BUAH_BATU: AreaData = {
  numLocations: 5,
  locations: [
    {
      name: 'Jalan_Jupiter_Bar_XXVI',
      coordinates: [-6.9436504662246294, 107.65810128992533],
    },
    {
      name: 'Pintu_Mobil_MTC_Selatan',
      coordinates: [-6.943781147404399, 107.65997219287672],
    },
    {
      name: 'Jalan_Yupiter_Barat_16',
      coordinates: [-6.94485576472777, 107.65990272667972],
    },
    {
      name: 'Jalan_Jupiter_Barat_Utama_I',
      coordinates: [-6.944111241985184, 107.66128751204344],
    },
    {
      name: 'Jalan_Jupiter_Barat',
      coordinates: [-6.943643092075255, 107.66158566552635],
    },
  ],
  adjacencyMatrix: [
    [0, 1, 0, 0, 0],
    [1, 0, 1, 1, 0],
    [0, 1, 0, 0, 0],
    [0, 1, 0, 0, 1],
    [0, 0, 0, 1, 0],
  ],
};

export const ITB: AreaData = {
  numLocations: 12,
  locations: [
    {
      name: 'Gerbang_Depan_ITB',
      coordinates: [-6.892665, 107.610446],
    },
    {
      name: 'Parkiran_Lapangan_SR',
      coordinates: [-6.892523, 107.611721],
    },
    {
      name: 'Parkiran_Lapangan_Sipil',
      coordinates: [-6.892661, 107.608715],
    },
    {
      name: 'Labtek_V',
      coordinates: [-6.890653, 107.609884],
    },
    {
      name: 'TVST',
      coordinates: [-6.889561, 107.6102],
    },
    {
      name: 'Perpustaka_ITB',
      coordinates: [-6.888395, 107.610645],
    },
    {
      name: 'Kantin_Saraga',
      coordinates: [-6.886603, 107.609626],
    },
    {
      name: 'Sabuga',
      coordinates: [-6.886342, 107.607825],
    },
    {
      name: 'Nasjep_Naskor',
      coordinates: [-6.892084, 107.611945],
    },
    {
      name: 'GKUB',
      coordinates: [-6.890576, 107.60871],
    },
    {
      name: 'GKUT',
      coordinates: [-6.89044, 107.611654],
    },
    {
      name: 'Labtek_I',
      coordinates: [-6.889385, 107.611368],
    },
  ],
  adjacencyMatrix: [
    [0, 1, 1, 0, 0, 0, 0, 0, 0, 0, 0, 0],
    [1, 0, 0, 0, 0, 0, 0, 0, 1, 0, 0, 0],
    [1, 0, 0, 0, 0, 0, 0, 0, 0, 1, 0, 0],
    [1, 0, 0, 0, 1, 0, 0, 0, 0, 0, 0, 1],
    [0, 0, 0, 1, 0, 1, 0, 0, 0, 0, 0, 1],
    [0, 0, 0, 0, 1, 0, 1, 0, 0, 0, 0, 0],
    [0, 0, 0, 0, 0, 1, 0, 1, 0, 0, 0, 0],
    [0, 0, 0, 0, 0, 0, 1, 0, 0, 0, 0, 0],
    [0, 1, 0, 0, 0, 0, 0, 0, 0, 0, 1, 0],
    [0, 0, 1, 1, 0, 0, 0, 0, 0, 0, 0, 0],
    [0, 0, 0, 0, 0, 0, 0, 0, 1, 0, 0, 1],
    [0, 0, 0, 1, 1, 0, 0, 0, 0, 0, 1, 0],
  ],
};

export const MEDAN: AreaData = {
  numLocations: 10,
  locations: [
    {
      name: 'JW_Marriott_Hotel_Medan',
      coordinates: [3.5968500773295684, 98.67580480057798],
    },
    {
      name: 'K3_Mart_Merdeka',
      coordinates: [3.5941429383171632, 98.67842977952893],
    },
    {
      name: 'Grand_Mercure_Maha_Cipta_Medan_Angkasa',
      coordinates: [3.5984219608088233, 98.68201725076192],
    },
    {
      name: 'Grand_Sakura',
      coordinates: [3.5966712950620394, 98.68577715534367],
    },
    {
      name: 'Universitas_HKBP_Nommensen',
      coordinates: [3.5970549550721858, 98.68115477206669],
    },
    {
      name: 'Kantor_Wilayah_Kementrian_Hukum',
      coordinates: [3.5944825020982707, 98.67646141580896],
    },
    {
      name: 'OYO_1820_Baba_Home',
      coordinates: [3.5990161961780327, 98.6741299382518],
    },
    {
      name: 'Methodist_3',
      coordinates: [3.5992212659485077, 98.68783307345053],
    },
    {
      name: 'GEMA_Toast',
      coordinates: [3.5970323034476, 98.68360358771208],
    },
    {
      name: 'Polrestabes_Medan',
      coordinates: [3.600266856712594, 98.68367265702722],
    },
  ],
  adjacencyMatrix: [
    [0, 1, 1, 0, 1, 1, 1, 0, 0, 0],
    [1, 0, 0, 1, 0, 1, 0, 0, 1, 0],
    [1, 0, 0, 0, 1, 0, 0, 1, 1, 1],
    [0, 1, 0, 0, 0, 0, 0, 1, 1, 0],
    [1, 0, 1, 0, 0, 0, 0, 0, 1, 0],
    [1, 1, 0, 0, 0, 0, 0, 0, 0, 0],
    [1, 0, 0, 0, 0, 0, 0, 0, 0, 0],
    [0, 0, 1, 1, 0, 0, 0, 0, 0, 1],
    [0, 1, 1, 1, 1, 0, 0, 0, 0, 1],
    [0, 0, 1, 0, 0, 0, 0, 1, 0, 0],
  ],
};

export const dataToString = (data: AreaData) => {
  let result = data.numLocations + '\n';
  for (const location of data.locations) {
    result += location.name + '\n';
    result += location.coordinates.join(' ') + '\n';
  }
  for (const row of data.adjacencyMatrix) {
    result += row.join(' ') + '\n';
  }
  return result;
};
