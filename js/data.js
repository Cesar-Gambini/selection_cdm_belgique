/**
 * DONNÉES JOUEURS — Sélection Belge Mondial 2026
 * ================================================
 * CE FICHIER EST LE SEUL À MODIFIER pour mettre à jour la liste de joueurs.
 *
 * Instructions :
 * 1. Modifiez les noms, clubs et photos ci-dessous
 * 2. Déposez les photos dans assets/players-webp/ (nommées par nom : prenom_nom.jpg)
 * 3. Redéployez le site
 *
 * Structure d'un joueur :
 * {
 *   id: "gk_01",              // ID unique (préfixé par poste : gk_, def_, mil_, att_)
 *   name: "Prénom Nom",       // Nom complet du joueur
 *   club: "Nom du Club",      // Club actuel
 *   photo: "assets/players-webp/prenom_nom.webp",  // Chemin vers la photo
 *   position: "Gardien"       // "Gardien", "Défenseur", "Milieu" ou "Attaquant"
 * }
 */

const PLAYERS = [
  // ─── GARDIENS (6) ──────────────────────────────────────────
  { id: "gk_01", name: "Thibaut Courtois",     club: "Real Madrid",          photo: "assets/players-webp/thibaut_courtois.webp",    position: "Gardien" },
  { id: "gk_02", name: "Senne Lammens",        club: "Manchester United",    photo: "assets/players-webp/senne_lammens.webp",       position: "Gardien" },
  { id: "gk_03", name: "Mike Penders",          club: "RC Strasbourg",        photo: "assets/players-webp/mike_penders.webp",        position: "Gardien" },
  { id: "gk_04", name: "Matz Sels",             club: "Nottingham Forest FC", photo: "assets/players-webp/matz_sels.webp",           position: "Gardien" },
  { id: "gk_05", name: "Arnaud Bodart",         club: "LOSC Lille",           photo: "assets/players-webp/arnaud_bodart.webp",       position: "Gardien" },
  { id: "gk_06", name: "Maarten Vandevoordt",   club: "RB Leipzig",           photo: "assets/players-webp/maarten_vandevoordt.webp", position: "Gardien" },

  // ─── DÉFENSEURS (14) ───────────────────────────────────────
  { id: "def_01", name: "Zeno Debast",          club: "Sporting Portugal",    photo: "assets/players-webp/zeno_debast.webp",         position: "Défenseur" },
  { id: "def_02", name: "Arthur Theate",        club: "Eintracht Frankfurt",  photo: "assets/players-webp/arthur_theate.webp",       position: "Défenseur" },
  { id: "def_03", name: "Nathan Ngoy",          club: "LOSC Lille",           photo: "assets/players-webp/nathan_ngoy.webp",         position: "Défenseur" },
  { id: "def_04", name: "Brandon Mechele",      club: "Club Brugge",          photo: "assets/players-webp/brandon_mechele.webp",     position: "Défenseur" },
  { id: "def_05", name: "Wout Faes",            club: "AS Monaco",            photo: "assets/players-webp/wout_faes.webp",           position: "Défenseur" },
  { id: "def_06", name: "Koni De Winter",       club: "AC Milan",             photo: "assets/players-webp/koni_de_winter.webp",      position: "Défenseur" },
  { id: "def_07", name: "Matte Smets",          club: "KRC Genk",             photo: "assets/players-webp/matte_smets.webp",         position: "Défenseur" },
  { id: "def_08", name: "Sebastiaan Bornauw",   club: "Leeds United",         photo: "assets/players-webp/sebastiaan_bornauw.webp",  position: "Défenseur" },
  { id: "def_09", name: "Maxim De Cuyper",      club: "Brighton FC",          photo: "assets/players-webp/maxim_de_cuyper.webp",     position: "Défenseur" },
  { id: "def_10", name: "Joaquin Seys",         club: "Club Brugge",          photo: "assets/players-webp/joaquin_seys.webp",        position: "Défenseur" },
  { id: "def_11", name: "Timothy Castagne",     club: "Fulham FC",            photo: "assets/players-webp/timothy_castagne.webp",    position: "Défenseur" },
  { id: "def_12", name: "Kyriani Sabbe",        club: "Club Brugge",          photo: "assets/players-webp/kyriani_sabbe.webp",       position: "Défenseur" },
  { id: "def_13", name: "Thomas Meunier",       club: "LOSC Lille",           photo: "assets/players-webp/thomas_meunier.webp",      position: "Défenseur" },
  { id: "def_14", name: "Killian Sardella",     club: "RSC Anderlecht",       photo: "assets/players-webp/killian_sardella.webp",    position: "Défenseur" },

  // ─── MILIEUX (16) ──────────────────────────────────────────
  { id: "mil_01", name: "Mandela Keita",        club: "Parma FC",                  photo: "assets/players-webp/mandela_keita.webp",       position: "Milieu" },
  { id: "mil_02", name: "Youri Tielemans",      club: "Aston Villa",               photo: "assets/players-webp/youri_tielemans.webp",     position: "Milieu" },
  { id: "mil_03", name: "Amadou Onana",         club: "Aston Villa",               photo: "assets/players-webp/amadou_onana.webp",        position: "Milieu" },
  { id: "mil_04", name: "Nathan De Cat",        club: "RSC Anderlecht",            photo: "assets/players-webp/nathan_de_cat.webp",       position: "Milieu" },
  { id: "mil_05", name: "Roméo Lavia",          club: "Chelsea FC",                photo: "assets/players-webp/romeo_lavia.webp",         position: "Milieu" },
  { id: "mil_06", name: "Arthur Vermeeren",     club: "Olympique de Marseille",    photo: "assets/players-webp/arthur_vermeeren.webp",    position: "Milieu" },
  { id: "mil_07", name: "Arne Engels",          club: "Celtic Glasgow",            photo: "assets/players-webp/arne_engels.webp",         position: "Milieu" },
  { id: "mil_08", name: "Nicolas Raskin",       club: "Glasgow Rangers",           photo: "assets/players-webp/nicolas_raskin.webp",      position: "Milieu" },
  { id: "mil_09", name: "Jorthy Mokio",         club: "Ajax Amsterdam",            photo: "assets/players-webp/jorty_mokio.webp",         position: "Milieu" },
  { id: "mil_10", name: "Mathias Delorge",      club: "KAA Gent",                  photo: "assets/players-webp/mathias_delorge.webp",     position: "Milieu" },
  { id: "mil_11", name: "Kevin De Bruyne",      club: "SSC Napoli",                photo: "assets/players-webp/kevin_de_bruyne.webp",     position: "Milieu" },
  { id: "mil_12", name: "Hans Vanaken",         club: "Club Brugge",               photo: "assets/players-webp/hans_vanaken.webp",       position: "Milieu" },
  { id: "mil_13", name: "Axel Witsel",          club: "Girona FC",                 photo: "assets/players-webp/axel_witsel.webp",         position: "Milieu" },
  { id: "mil_14", name: "Bryan Heynen",         club: "KRC Genk",                  photo: "assets/players-webp/bryan_heynen.webp",       position: "Milieu" },
  { id: "mil_15", name: "Charles Vanhoutte",    club: "OGC Nice",                  photo: "assets/players-webp/charles_vanhoutte.webp",   position: "Milieu" },
  { id: "mil_16", name: "Diego Moreira",        club: "RC Strasbourg",             photo: "assets/players-webp/diego_moreira.webp",       position: "Milieu" },

  // ─── ATTAQUANTS (15) ───────────────────────────────────────
  { id: "att_01", name: "Jérémy Doku",          club: "Manchester City",           photo: "assets/players-webp/jeremy_doku.webp",         position: "Attaquant" },
  { id: "att_02", name: "Mika Godts",           club: "Ajax Amsterdam",            photo: "assets/players-webp/mika_godts.webp",          position: "Attaquant" },
  { id: "att_03", name: "Leandro Trossard",     club: "Arsenal FC",                photo: "assets/players-webp/leandro_trossard.webp",    position: "Attaquant" },
  { id: "att_04", name: "Dodi Lukébakio",       club: "SL Benfica",                photo: "assets/players-webp/dodi_lukebakio.webp",      position: "Attaquant" },
  { id: "att_05", name: "Johan Bakayoko",       club: "RB Leipzig",                photo: "assets/players-webp/johan_bakayoko.webp",      position: "Attaquant" },
  { id: "att_06", name: "Malick Fofana",        club: "Olympique Lyonnais",        photo: "assets/players-webp/malick_fofana.webp",       position: "Attaquant" },
  { id: "att_07", name: "Yannick Carrasco",     club: "Al-Shabab FC",              photo: "assets/players-webp/yannick_carrasco.webp",    position: "Attaquant" },
  { id: "att_08", name: "Romelu Lukaku",        club: "SSC Napoli",                photo: "assets/players-webp/romelu_lukaku.webp",       position: "Attaquant" },
  { id: "att_09", name: "Loïs Openda",          club: "Juventus FC",               photo: "assets/players-webp/lois_openda.webp",         position: "Attaquant" },
  { id: "att_10", name: "Lucas Stassin",        club: "AS Saint-Étienne",          photo: "assets/players-webp/lucas_stassin.webp",       position: "Attaquant" },
  { id: "att_11", name: "Romeo Vermant",        club: "Club Brugge",               photo: "assets/players-webp/romeo_vermant.webp",       position: "Attaquant" },
  { id: "att_12", name: "Charles De Ketelaere",  club: "Atalanta Bergame",          photo: "assets/players-webp/charles_de_ketelaere.webp", position: "Attaquant" },
  { id: "att_13", name: "Michy Batshuayi",      club: "Eintracht Frankfurt",       photo: "assets/players-webp/michy_bastshuayi.webp",    position: "Attaquant" },
  { id: "att_14", name: "Hugo Cuypers",         club: "Chicago Fire FC",           photo: "assets/players-webp/hugo_cuypers.webp",       position: "Attaquant" },
  { id: "att_15", name: "Alexis Saelemaekers",  club: "AC Milan",                  photo: "assets/players-webp/alexis_saelemaekers.webp", position: "Attaquant" }
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
