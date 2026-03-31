/**
 * DONNÉES JOUEURS — Sélection Belge Mondial 2026
 * ================================================
 * CE FICHIER EST LE SEUL À MODIFIER pour mettre à jour la liste de joueurs.
 *
 * Instructions :
 * 1. Modifiez les noms, clubs et photos ci-dessous
 * 2. Déposez les photos dans assets/players-cropped/ (nommées par nom : prenom_nom.jpg)
 * 3. Redéployez le site
 *
 * Structure d'un joueur :
 * {
 *   id: "gk_01",              // ID unique (préfixé par poste : gk_, def_, mil_, att_)
 *   name: "Prénom Nom",       // Nom complet du joueur
 *   club: "Nom du Club",      // Club actuel
 *   photo: "assets/players-cropped/prenom_nom.jpg",  // Chemin vers la photo
 *   position: "Gardien"       // "Gardien", "Défenseur", "Milieu" ou "Attaquant"
 * }
 */

const PLAYERS = [
  // ─── GARDIENS (6) ──────────────────────────────────────────
  { id: "gk_01", name: "Thibaut Courtois",     club: "Real Madrid",          photo: "assets/players-cropped/thibaut_courtois.jpg",    position: "Gardien" },
  { id: "gk_02", name: "Senne Lammens",        club: "Manchester United",    photo: "assets/players-cropped/senne_lammens.jpg",       position: "Gardien" },
  { id: "gk_03", name: "Mike Penders",          club: "RC Strasbourg",        photo: "assets/players-cropped/mike_penders.jpg",        position: "Gardien" },
  { id: "gk_04", name: "Matz Sels",             club: "Nottingham Forest FC", photo: "assets/players-cropped/matz_sels.jpg",           position: "Gardien" },
  { id: "gk_05", name: "Arnaud Bodart",         club: "LOSC Lille",           photo: "assets/players-cropped/arnaud_bodart.jpg",       position: "Gardien" },
  { id: "gk_06", name: "Maarten Vandevoordt",   club: "RB Leipzig",           photo: "assets/players-cropped/maarten_vandevoordt.jpg", position: "Gardien" },

  // ─── DÉFENSEURS (14) ───────────────────────────────────────
  { id: "def_01", name: "Zeno Debast",          club: "Sporting Portugal",    photo: "assets/players-cropped/zeno_debast.jpg",         position: "Défenseur" },
  { id: "def_02", name: "Arthur Theate",        club: "Eintracht Frankfurt",  photo: "assets/players-cropped/arthur_theate.jpg",       position: "Défenseur" },
  { id: "def_03", name: "Nathan Ngoy",          club: "LOSC Lille",           photo: "assets/players-cropped/nathan_ngoy.jpg",         position: "Défenseur" },
  { id: "def_04", name: "Brandon Mechele",      club: "Club Brugge",          photo: "assets/players-cropped/brandon_mechele.jpg",     position: "Défenseur" },
  { id: "def_05", name: "Wout Faes",            club: "AS Monaco",            photo: "assets/players-cropped/wout_faes.jpg",           position: "Défenseur" },
  { id: "def_06", name: "Koni De Winter",       club: "AC Milan",             photo: "assets/players-cropped/koni_de_winter.jpg",      position: "Défenseur" },
  { id: "def_07", name: "Matte Smets",          club: "KRC Genk",             photo: "assets/players-cropped/matte_smets.jpg",         position: "Défenseur" },
  { id: "def_08", name: "Sebastiaan Bornauw",   club: "Leeds United",         photo: "assets/players-cropped/sebastiaan_bornauw.jpg",  position: "Défenseur" },
  { id: "def_09", name: "Maxim De Cuyper",      club: "Brighton FC",          photo: "assets/players-cropped/maxim_de_cuyper.jpg",     position: "Défenseur" },
  { id: "def_10", name: "Joaquin Seys",         club: "Club Brugge",          photo: "assets/players-cropped/joaquin_seys.jpg",        position: "Défenseur" },
  { id: "def_11", name: "Timothy Castagne",     club: "Fulham FC",            photo: "assets/players-cropped/timothy_castagne.jpg",    position: "Défenseur" },
  { id: "def_12", name: "Kyriani Sabbe",        club: "Club Brugge",          photo: "assets/players-cropped/kyriani_sabbe.jpg",       position: "Défenseur" },
  { id: "def_13", name: "Thomas Meunier",       club: "LOSC Lille",           photo: "assets/players-cropped/thomas_meunier.jpg",      position: "Défenseur" },
  { id: "def_14", name: "Killian Sardella",     club: "RSC Anderlecht",       photo: "assets/players-cropped/killian_sardella.jpg",    position: "Défenseur" },

  // ─── MILIEUX (16) ──────────────────────────────────────────
  { id: "mil_01", name: "Mandela Keita",        club: "Parma FC",                  photo: "assets/players-cropped/mandela_keita.jpg",       position: "Milieu" },
  { id: "mil_02", name: "Youri Tielemans",      club: "Aston Villa",               photo: "assets/players-cropped/youri_tielemans.jpg",     position: "Milieu" },
  { id: "mil_03", name: "Amadou Onana",         club: "Aston Villa",               photo: "assets/players-cropped/amadou_onana.jpg",        position: "Milieu" },
  { id: "mil_04", name: "Nathan De Cat",        club: "RSC Anderlecht",            photo: "assets/players-cropped/nathan_de_cat.jpg",       position: "Milieu" },
  { id: "mil_05", name: "Roméo Lavia",          club: "Chelsea FC",                photo: "assets/players-cropped/romeo_lavia.jpg",         position: "Milieu" },
  { id: "mil_06", name: "Arthur Vermeeren",     club: "Olympique de Marseille",    photo: "assets/players-cropped/arthur_vermeeren.jpg",    position: "Milieu" },
  { id: "mil_07", name: "Arne Engels",          club: "Celtic Glasgow",            photo: "assets/players-cropped/arne_engels.jpg",         position: "Milieu" },
  { id: "mil_08", name: "Nicolas Raskin",       club: "Glasgow Rangers",           photo: "assets/players-cropped/nicolas_raskin.jpg",      position: "Milieu" },
  { id: "mil_09", name: "Jorthy Mokio",         club: "Ajax Amsterdam",            photo: "assets/players-cropped/jorty_mokio.jpg",         position: "Milieu" },
  { id: "mil_10", name: "Mathias Delorge",      club: "KAA Gent",                  photo: "assets/players-cropped/mathias_delorge.jpg",     position: "Milieu" },
  { id: "mil_11", name: "Kevin De Bruyne",      club: "SSC Napoli",                photo: "assets/players-cropped/kevin_de_bruyne.jpg",     position: "Milieu" },
  { id: "mil_12", name: "Hans Vanaken",         club: "Club Brugge",               photo: "assets/players-cropped/hans_vanaken.jpg",       position: "Milieu" },
  { id: "mil_13", name: "Axel Witsel",          club: "Girona FC",                 photo: "assets/players-cropped/axel_witsel.jpg",         position: "Milieu" },
  { id: "mil_14", name: "Bryan Heynen",         club: "KRC Genk",                  photo: "assets/players-cropped/bryan_heynen.jpg",       position: "Milieu" },
  { id: "mil_15", name: "Charles Vanhoutte",    club: "OGC Nice",                  photo: "assets/players-cropped/charles_vanhoutte.jpg",   position: "Milieu" },
  { id: "mil_16", name: "Diego Moreira",        club: "RC Strasbourg",             photo: "assets/players-cropped/diego_moreira.jpg",       position: "Milieu" },

  // ─── ATTAQUANTS (15) ───────────────────────────────────────
  { id: "att_01", name: "Jérémy Doku",          club: "Manchester City",           photo: "assets/players-cropped/jeremy_doku.jpg",         position: "Attaquant" },
  { id: "att_02", name: "Mika Godts",           club: "Ajax Amsterdam",            photo: "assets/players-cropped/mika_godts.jpg",          position: "Attaquant" },
  { id: "att_03", name: "Leandro Trossard",     club: "Arsenal FC",                photo: "assets/players-cropped/leandro_trossard.jpg",    position: "Attaquant" },
  { id: "att_04", name: "Dodi Lukébakio",       club: "SL Benfica",                photo: "assets/players-cropped/dodi_lukebakio.jpg",      position: "Attaquant" },
  { id: "att_05", name: "Johan Bakayoko",       club: "RB Leipzig",                photo: "assets/players-cropped/johan_bakayoko.jpg",      position: "Attaquant" },
  { id: "att_06", name: "Malick Fofana",        club: "Olympique Lyonnais",        photo: "assets/players-cropped/malick_fofana.jpg",       position: "Attaquant" },
  { id: "att_07", name: "Yannick Carrasco",     club: "Al-Shabab FC",              photo: "assets/players-cropped/yannick_carrasco.jpg",    position: "Attaquant" },
  { id: "att_08", name: "Romelu Lukaku",        club: "SSC Napoli",                photo: "assets/players-cropped/romelu_lukaku.jpg",       position: "Attaquant" },
  { id: "att_09", name: "Loïs Openda",          club: "Juventus FC",               photo: "assets/players-cropped/lois_openda.jpg",         position: "Attaquant" },
  { id: "att_10", name: "Lucas Stassin",        club: "AS Saint-Étienne",          photo: "assets/players-cropped/lucas_stassin.jpg",       position: "Attaquant" },
  { id: "att_11", name: "Romeo Vermant",        club: "Club Brugge",               photo: "assets/players-cropped/romeo_vermant.jpg",       position: "Attaquant" },
  { id: "att_12", name: "Charles De Ketelaere",  club: "Atalanta Bergame",          photo: "assets/players-cropped/charles_de_ketelaere.jpg", position: "Attaquant" },
  { id: "att_13", name: "Michy Batshuayi",      club: "Eintracht Frankfurt",       photo: "assets/players-cropped/michy_bastshuayi.jpg",    position: "Attaquant" },
  { id: "att_14", name: "Hugo Cuypers",         club: "Chicago Fire FC",           photo: "assets/players-cropped/hugo_cuypers.jpg",       position: "Attaquant" },
  { id: "att_15", name: "Alexis Saelemaekers",  club: "AC Milan",                  photo: "assets/players-cropped/alexis_saelemaekers.jpg", position: "Attaquant" }
];

/**
 * Configuration des étapes de sélection
 * Modifiez 'required' pour changer le nombre de joueurs à sélectionner par poste
 */
const STEPS_CONFIG = [
  { key: "Gardien",    label: "Gardiens",    required: 3, param: "gardiens"    },
  { key: "Défenseur",  label: "Défenseurs",  required: 9, param: "defenseurs"  },
  { key: "Milieu",     label: "Milieux",     required: 7, param: "milieux"     },
  { key: "Attaquant",  label: "Attaquants",  required: 7, param: "attaquants"  }
];
