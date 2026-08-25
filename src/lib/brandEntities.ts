export interface BrandEntityInfo {
  name: string;
  wikidataUrl?: string;
  wikipediaUrl?: string;
  officialUrl?: string;
  knowsAbout?: string[];
}

export const BRAND_ENTITIES: Record<string, BrandEntityInfo> = {
  hp: {
    name: 'HP Inc.',
    wikidataUrl: 'https://www.wikidata.org/wiki/Q80978',
    wikipediaUrl: 'https://en.wikipedia.org/wiki/HP_Inc.',
    officialUrl: 'https://www.hp.com',
    knowsAbout: ['HP LaserJet Printers', 'HP OfficeJet Pro', 'HP Smart App', 'PageWide Array', 'DeskJet Series'],
  },
  canon: {
    name: 'Canon Inc.',
    wikidataUrl: 'https://www.wikidata.org/wiki/Q6478',
    wikipediaUrl: 'https://en.wikipedia.org/wiki/Canon_Inc.',
    officialUrl: 'https://www.usa.canon.com',
    knowsAbout: ['Canon PIXMA Inkjets', 'Canon MAXIFY GX', 'imageCLASS Laser', 'FINE Printhead Cartridges', 'SELPHY Photo'],
  },
  epson: {
    name: 'Seiko Epson Corporation',
    wikidataUrl: 'https://www.wikidata.org/wiki/Q161044',
    wikipediaUrl: 'https://en.wikipedia.org/wiki/Seiko_Epson',
    officialUrl: 'https://www.epson.com',
    knowsAbout: ['Micro Piezo Heat-Free Technology', 'EcoTank Continuous Ink', 'WorkForce Pro', 'SureColor', 'WIC Reset Protocol'],
  },
  brother: {
    name: 'Brother Industries, Ltd.',
    wikidataUrl: 'https://www.wikidata.org/wiki/Q660081',
    wikipediaUrl: 'https://en.wikipedia.org/wiki/Brother_Industries',
    officialUrl: 'https://www.brother-usa.com',
    knowsAbout: ['Brother MFC Laser Multifunction', 'Brother HL Series', 'P-touch Label Printers', 'Maintenance Mode Diagnostics'],
  },
  kodak: {
    name: 'Eastman Kodak Company',
    wikidataUrl: 'https://www.wikidata.org/wiki/Q483120',
    wikipediaUrl: 'https://en.wikipedia.org/wiki/Eastman_Kodak',
    officialUrl: 'https://www.kodak.com',
    knowsAbout: ['Kodak Step Instant Printers', 'Kodak Dock Plus', 'Kodak HERO Series', 'Kodak ESP Series', 'Mini 2 Retro'],
  },
  xerox: {
    name: 'Xerox Corporation',
    wikidataUrl: 'https://www.wikidata.org/wiki/Q147424',
    wikipediaUrl: 'https://en.wikipedia.org/wiki/Xerox',
    officialUrl: 'https://www.xerox.com',
    knowsAbout: ['Xerox VersaLink', 'Xerox AltaLink', 'Phaser Color Lasers', 'Fuser & Drum Cartridges'],
  },
  'zebra-technologies': {
    name: 'Zebra Technologies',
    wikidataUrl: 'https://www.wikidata.org/wiki/Q8068305',
    wikipediaUrl: 'https://en.wikipedia.org/wiki/Zebra_Technologies',
    officialUrl: 'https://www.zebra.com',
    knowsAbout: ['Zebra ZPL Programming', 'Direct Thermal Barcode Printers', 'GK420d Series', 'Thermal Transfer Ribbons'],
  },
  dymo: {
    name: 'DYMO (Newell Brands)',
    wikidataUrl: 'https://www.wikidata.org/wiki/Q5318625',
    wikipediaUrl: 'https://en.wikipedia.org/wiki/Dymo_Corporation',
    officialUrl: 'https://www.dymo.com',
    knowsAbout: ['DYMO LabelWriter 450/550', 'DYMO Connect Web Service', 'Thermal Label Calibration'],
  },
  lexmark: {
    name: 'Lexmark International',
    wikidataUrl: 'https://www.wikidata.org/wiki/Q1472506',
    wikipediaUrl: 'https://en.wikipedia.org/wiki/Lexmark',
    officialUrl: 'https://www.lexmark.com',
    knowsAbout: ['Lexmark CS/CX Series', 'Fuser Error 920 Codes', 'Unison Toner Systems', 'Standard Bin Full Sensors'],
  },
  fujifilm: {
    name: 'Fujifilm Corporation',
    wikidataUrl: 'https://www.wikidata.org/wiki/Q164746',
    wikipediaUrl: 'https://en.wikipedia.org/wiki/Fujifilm',
    officialUrl: 'https://www.fujifilm.com',
    knowsAbout: ['instax SHARE Printers', 'instax mini Link', 'ApeosPort Laser Multifunction'],
  },
  polaroid: {
    name: 'Polaroid Corporation',
    wikidataUrl: 'https://www.wikidata.org/wiki/Q494389',
    wikipediaUrl: 'https://en.wikipedia.org/wiki/Polaroid_Corporation',
    officialUrl: 'https://www.polaroid.com',
    knowsAbout: ['Polaroid Hi-Print 2x3', 'Polaroid Lab', 'ZINK Zero Ink Paper Jams'],
  },
  'star-micronics': {
    name: 'Star Micronics Co., Ltd.',
    wikidataUrl: 'https://www.wikidata.org/wiki/Q7600812',
    wikipediaUrl: 'https://en.wikipedia.org/wiki/Star_Micronics',
    officialUrl: 'https://www.starmicronics.com',
    knowsAbout: ['Star TSP143 Series', 'Star POS Thermal Receipt Printers', 'Memory Switch Hex Settings'],
  },
  'citizen-systems': {
    name: 'Citizen Systems (Citizen Watch Co.)',
    wikidataUrl: 'https://www.wikidata.org/wiki/Q1093414',
    wikipediaUrl: 'https://en.wikipedia.org/wiki/Citizen_Watch',
    officialUrl: 'https://www.citizen-systems.com',
    knowsAbout: ['Citizen CT-S601 POS Printers', 'Citizen CL-S621 Barcode Printers', 'Cutter Lock & Memory Switches'],
  },
  'seiko-instruments': {
    name: 'Seiko Instruments Inc.',
    wikidataUrl: 'https://www.wikidata.org/wiki/Q2266971',
    wikipediaUrl: 'https://en.wikipedia.org/wiki/Seiko_Instruments',
    officialUrl: 'https://www.sii.co.jp',
    knowsAbout: ['Seiko Smart Label Printer SLP 650', 'SLP Manager Software', 'Direct Thermal Label Indexing'],
  },
  pantum: {
    name: 'Pantum International',
    wikidataUrl: 'https://www.wikidata.org/wiki/Q111950488',
    officialUrl: 'https://www.pantum.com',
    knowsAbout: ['Pantum Monochrome Lasers', 'TL-410 Toner Cartridge Chips', 'Internal Error Codes'],
  },
  bixolon: {
    name: 'Bixolon Co., Ltd.',
    wikidataUrl: 'https://www.wikidata.org/wiki/Q12599763',
    officialUrl: 'https://www.bixolon.com',
    knowsAbout: ['Bixolon SRP-350 Thermal POS', 'SLP-DX420 Label Printers', 'Virtual COM Port Drivers'],
  },
  munbyn: {
    name: 'Munbyn Technologies',
    officialUrl: 'https://www.munbyn.com',
    knowsAbout: ['Munbyn ITPP941 Shipping Label Printers', 'Automatic Label Gap Calibration'],
  },
  rollo: {
    name: 'Rollo (Newt Logistics)',
    officialUrl: 'https://www.rollo.com',
    knowsAbout: ['Rollo Wireless Shipping Label Printer', 'AirPrint Direct Thermal Protocol'],
  },
  phomemo: {
    name: 'Phomemo Technologies',
    officialUrl: 'https://www.phomemo.com',
    knowsAbout: ['Phomemo M110 Portable Label Makers', 'Bluetooth BLE Pairing Protocols'],
  },
  niimbot: {
    name: 'Wuhan Jingchen Intelligent Identification Technology (NIIMBOT)',
    officialUrl: 'https://www.niimbot.net',
    knowsAbout: ['NIIMBOT D11/B21 Smart Label Printers', 'RFID Smart Label Recognition'],
  },
  nelko: {
    name: 'Nelko Direct Thermal',
    officialUrl: 'https://www.nelkoprinter.com',
    knowsAbout: ['Nelko PL70e Shipping Label Printers', 'Thermal Printhead Glaze Cleaning'],
  },
  'primera-technology': {
    name: 'Primera Technology, Inc.',
    wikidataUrl: 'https://www.wikidata.org/wiki/Q7243468',
    wikipediaUrl: 'https://en.wikipedia.org/wiki/Primera_Technology',
    officialUrl: 'https://www.primera.com',
    knowsAbout: ['Primera LX-Series Color Label Printers', 'Bravo Disc Publishers', 'PTPublisher Software', 'PTStatus Monitor'],
  },
  dascom: {
    name: 'Dascom Europe & Americas',
    officialUrl: 'https://www.dascom.com',
    knowsAbout: ['Dascom Tally Dot Matrix Printers', 'Heavy Duty Industrial Tractor Feed Systems'],
  },
};

export function getBrandEntity(slug?: string | null): BrandEntityInfo | undefined {
  if (!slug) return undefined;
  return BRAND_ENTITIES[slug.toLowerCase()];
}
