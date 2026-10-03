const base = process.env.NEXT_PUBLIC_BASE_PATH ?? "";

export const strollScene: Record<string, { src: string; alt: string }> = {
  "arrivo-in-piazza": {
    src: `${base}/scenes/lecce-piazza.jpg`,
    alt: "Crepuscolo in una piazza di Lecce: la colonna di pietra, i palazzi caldi, gente che attraversa",
  },
  "il-primo-caffe": {
    src: `${base}/scenes/lecce-bar.jpg`,
    alt: "Un banco di marmo la sera, caffè e pasticciotto in primo piano, clienti al banco",
  },
  "la-vetrina": {
    src: `${base}/scenes/lecce-shop.jpg`,
    alt: "Una vetrina accesa in una via di Lecce, di notte",
  },
  "la-porta-della-chiesa": {
    src: `${base}/scenes/lecce-church.jpg`,
    alt: "La facciata scolpita di una chiesa di Lecce, nell'ultima luce",
  },
  "il-cugino": {
    src: `${base}/scenes/lecce-stairs.jpg`,
    alt: "Una scala di pietra consumata, in un palazzo vecchio di Lecce",
  },
  "la-cena": {
    src: `${base}/scenes/lecce-table.jpg`,
    alt: "Una tavola apparecchiata per la cena, piatti e bicchieri nella luce calda",
  },
  "sotto-i-portici": {
    src: `${base}/scenes/turin-portici.jpg`,
    alt: "Pioggia sotto i portici di Torino, di notte, pietra bagnata e ombrelli",
  },
  "l-aperitivo": {
    src: `${base}/scenes/turin-aperitivo.jpg`,
    alt: "Un tavolo da aperitivo sotto i portici, bicchieri e un piatto piccolo",
  },
  "la-scala-b": {
    src: `${base}/scenes/turin-entry.jpg`,
    alt: "Un ingresso di appartamento a Torino, scale e una porta in fondo al corridoio",
  },
  "il-collega": {
    src: `${base}/scenes/turin-office.jpg`,
    alt: "Un ufficio quieto vicino a Piazza San Carlo, una scrivania accanto a una finestra alta",
  },
  "la-nonna": {
    src: `${base}/scenes/turin-kitchen.jpg`,
    alt: "Una cucina di casa la sera, una pentola sul fuoco e la tavola apparecchiata",
  },
  "il-ritorno": {
    src: `${base}/scenes/turin-return.jpg`,
    alt: "Notte fuori da Porta Nuova, le luci della stazione e la strada bagnata",
  },
};
