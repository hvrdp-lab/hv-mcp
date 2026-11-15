// Cloudflare Worker entry — serves the MCP endpoint at /mcp
// High Valyrian Translators — MCP core (transport-agnostic)
// Works in Cloudflare Workers (fetch) and Node (server.mjs).
// Data: the site's attested 400-entry High Valyrian dictionary ONLY.
// The server never invents translations: unmatched queries get an honest
// "not in the attested dictionary" answer plus closest real matches.

const dictionary = [
 {
  "word": "Aderktirī",
  "pos": "noun",
  "meaning": "(to dragons) Faster!",
  "pronunciation": "/aˈderktiriː/"
 },
 {
  "word": "Aderves",
  "pos": "noun",
  "meaning": "smoothness, sleekness; slipperiness; quickness, fastness",
  "pronunciation": "/aˈderves/"
 },
 {
  "word": "Aemond",
  "pos": "proper noun",
  "meaning": "a male given name",
  "pronunciation": "/ˈaemond/"
 },
 {
  "word": "Aemondi",
  "pos": "noun",
  "meaning": "Alternative form of Aemond",
  "pronunciation": "/aeˈmondi/"
 },
 {
  "word": "Aena",
  "pos": "noun",
  "meaning": "accommodating; supportive; reliable",
  "pronunciation": "/ˈaena/"
 },
 {
  "word": "Aenoqitta",
  "pos": "noun",
  "meaning": "unsafe",
  "pronunciation": "/aenoˈqitta/"
 },
 {
  "word": "Ahylio",
  "pos": "noun",
  "meaning": "tentacle",
  "pronunciation": "/aˈhylio/"
 },
 {
  "word": "Ajomemēbagon",
  "pos": "noun",
  "meaning": "(of things) to rage on",
  "pronunciation": "/aɟomeˈmeːbagon/"
 },
 {
  "word": "Albie",
  "pos": "noun",
  "meaning": "bright, resplendent, shining, shiny, brilliant",
  "pronunciation": "/ˈalbie/"
 },
 {
  "word": "Albijos",
  "pos": "noun",
  "meaning": "best part, highlight",
  "pronunciation": "/ˈalbiɟos/"
 },
 {
  "word": "Alysanne",
  "pos": "proper noun",
  "meaning": "a female given name",
  "pronunciation": "/alyˈsanne/"
 },
 {
  "word": "Ambigon",
  "pos": "verb",
  "meaning": "to struggle",
  "pronunciation": "/ˈambigon/"
 },
 {
  "word": "Ambir",
  "pos": "noun",
  "meaning": "salmon",
  "pronunciation": "/ˈambir/"
 },
 {
  "word": "Amāzigon",
  "pos": "noun",
  "meaning": "(of things) to come, to arrive",
  "pronunciation": "/aˈmaːzigon/"
 },
 {
  "word": "Anne",
  "pos": "noun",
  "meaning": "horse",
  "pronunciation": "/ˈanne/"
 },
 {
  "word": "Baela",
  "pos": "proper noun",
  "meaning": "a female given name",
  "pronunciation": "/ˈbaela/"
 },
 {
  "word": "Baelio",
  "pos": "noun",
  "meaning": "acolyte",
  "pronunciation": "/ˈbaelio/"
 },
 {
  "word": "Baelor",
  "pos": "proper noun",
  "meaning": "a male given name",
  "pronunciation": "/ˈbaelor/"
 },
 {
  "word": "Baragon",
  "pos": "verb",
  "meaning": "to mark, to smudge, to demarcate; to indicate, to refer to, to point out",
  "pronunciation": "/baˈragon/"
 },
 {
  "word": "Bardulion",
  "pos": "noun",
  "meaning": "school",
  "pronunciation": "/ˈbardulion/"
 },
 {
  "word": "Bartanna",
  "pos": "noun",
  "meaning": "skull",
  "pronunciation": "/barˈtanna/"
 },
 {
  "word": "Barītsos",
  "pos": "noun",
  "meaning": "dot, point; dot used in the High Valyrian orthography (e.g. to indicate a different reading of a glyph, such as a logographic one instead of an abjadic one)",
  "pronunciation": "/baˈriːtsos/"
 },
 {
  "word": "Beka",
  "pos": "noun",
  "meaning": "regular, normal, usual",
  "pronunciation": "/ˈbeka/"
 },
 {
  "word": "Bianor",
  "pos": "noun",
  "meaning": "ewe, female sheep",
  "pronunciation": "/ˈbianor/"
 },
 {
  "word": "Biare Arlie Jēdari",
  "pos": "phrase",
  "meaning": "Happy New Year!",
  "pronunciation": "/ˈbiare ˈarlie ˈɟeːdari/"
 },
 {
  "word": "Biarver aōt",
  "pos": "phrase",
  "meaning": "Cheers! (said to a single person)",
  "pronunciation": "/ˈbiarver ˈaoːt/"
 },
 {
  "word": "Biarvo urnekio",
  "pos": "phrase",
  "meaning": "fortune teller",
  "pronunciation": "/ˈbiarvo ˈurnekio/"
 },
 {
  "word": "Biarvose",
  "pos": "noun",
  "meaning": "you're welcome",
  "pronunciation": "/ˈbiarvose/"
 },
 {
  "word": "Bisa",
  "pos": "noun",
  "meaning": "this (for animates)",
  "pronunciation": "/ˈbisa/"
 },
 {
  "word": "Biāllaodio",
  "pos": "proper noun",
  "meaning": "a dragon given name",
  "pronunciation": "/biaːlˈlaodio/"
 },
 {
  "word": "Blākuata Rāshi",
  "pos": "phrase",
  "meaning": "Blackwater Rush (a river)",
  "pronunciation": "/ˈblaːkuata ˈraːʃi/"
 },
 {
  "word": "Blēnon",
  "pos": "noun",
  "meaning": "mountain",
  "pronunciation": "/ˈbleːnon/"
 },
 {
  "word": "Boter",
  "pos": "noun",
  "meaning": "suffering",
  "pronunciation": "/ˈboter/"
 },
 {
  "word": "Botose",
  "pos": "noun",
  "meaning": "hard, effortfully",
  "pronunciation": "/boˈtose/"
 },
 {
  "word": "Daema",
  "pos": "noun",
  "meaning": "violet",
  "pronunciation": "/ˈdaema/"
 },
 {
  "word": "Dakones",
  "pos": "noun",
  "meaning": "footrace, race where one runs on foot; race, racing competition",
  "pronunciation": "/daˈkones/"
 },
 {
  "word": "Dakonon",
  "pos": "noun",
  "meaning": "running",
  "pronunciation": "/daˈkonon/"
 },
 {
  "word": "Daomior",
  "pos": "noun",
  "meaning": "rainy season; rain, rains",
  "pronunciation": "/ˈdaomior/"
 },
 {
  "word": "Daor",
  "pos": "noun",
  "meaning": "not; no",
  "pronunciation": "/daor/"
 },
 {
  "word": "Daorion",
  "pos": "noun",
  "meaning": "no place, nowhere",
  "pronunciation": "/ˈdaorion/"
 },
 {
  "word": "Davābagon",
  "pos": "verb",
  "meaning": "to rain",
  "pronunciation": "/daˈvaːbagon/"
 },
 {
  "word": "Dekligon",
  "pos": "verb",
  "meaning": "to kick",
  "pronunciation": "/deˈkligon/"
 },
 {
  "word": "Dekurūbagon",
  "pos": "verb",
  "meaning": "to walk, to go on foot",
  "pronunciation": "/dekuˈruːbagon/"
 },
 {
  "word": "Derēbagon",
  "pos": "verb",
  "meaning": "to gather, to collect; to choose, to select",
  "pronunciation": "/deˈreːbagon/"
 },
 {
  "word": "Dija",
  "pos": "noun",
  "meaning": "hot, warm (internally, referring to a state one feels or is in); aroused, horny",
  "pronunciation": "/ˈdiɟa/"
 },
 {
  "word": "Dijemion",
  "pos": "noun",
  "meaning": "warming chamber (for hatching dragon eggs)",
  "pronunciation": "/diˈɟemion/"
 },
 {
  "word": "Dokelire",
  "pos": "noun",
  "meaning": "endless",
  "pronunciation": "/dokeˈlire/"
 },
 {
  "word": "Dorolvie",
  "pos": "noun",
  "meaning": "few, not many, not much, not a lot",
  "pronunciation": "/doˈrolvie/"
 },
 {
  "word": "Dorrīza",
  "pos": "noun",
  "meaning": "basilisk",
  "pronunciation": "/dorˈriːza/"
 },
 {
  "word": "Dorzālty",
  "pos": "noun",
  "meaning": "the Unburnt (title of Daenerys Targaryen in the universe of A Song of Ice and Fire)",
  "pronunciation": "/dorˈzaːlty/"
 },
 {
  "word": "Dovaogēdyr",
  "pos": "noun",
  "meaning": "the Unsullied (as a group)",
  "pronunciation": "/dovaoˈgeːdyr/"
 },
 {
  "word": "Drakaryr",
  "pos": "noun",
  "meaning": "dragonpower",
  "pronunciation": "/draˈkaryr/"
 },
 {
  "word": "Driftmāki",
  "pos": "noun",
  "meaning": "Driftmark (an island)",
  "pronunciation": "/driftˈmaːki/"
 },
 {
  "word": "Drījī",
  "pos": "noun",
  "meaning": "so (intensifier)",
  "pronunciation": "/ˈdriːɟiː/"
 },
 {
  "word": "Eglia",
  "pos": "noun",
  "meaning": "ancestor",
  "pronunciation": "/ˈeglia/"
 },
 {
  "word": "Egros",
  "pos": "noun",
  "meaning": "edge; blade, sword",
  "pronunciation": "/ˈegros/"
 },
 {
  "word": "Eleks",
  "pos": "noun",
  "meaning": "ear",
  "pronunciation": "/ˈeleks/"
 },
 {
  "word": "Elrion",
  "pos": "noun",
  "meaning": "chalcedony",
  "pronunciation": "/ˈelrion/"
 },
 {
  "word": "Elēdrar",
  "pos": "noun",
  "meaning": "tides; ocean; time, passage of time",
  "pronunciation": "/eˈleːdrar/"
 },
 {
  "word": "Elēdris",
  "pos": "noun",
  "meaning": "era, epoch, time, times, (generic) day",
  "pronunciation": "/eˈleːdris/"
 },
 {
  "word": "Elēnagon",
  "pos": "verb",
  "meaning": "to swing, to sway, to oscillate, to swerve, to move back and forth, to twist in the breeze; (aviation) to bank, to incline laterally in order to turn",
  "pronunciation": "/eˈleːnagon/"
 },
 {
  "word": "Elēnin",
  "pos": "noun",
  "meaning": "performance (generally music accompanied by dance)",
  "pronunciation": "/eˈleːnin/"
 },
 {
  "word": "Emagon",
  "pos": "verb",
  "meaning": "to have",
  "pronunciation": "/eˈmagon/"
 },
 {
  "word": "Gadbag",
  "pos": "noun",
  "meaning": "Alternative form of gadbagi",
  "pronunciation": "/ˈgadbag/"
 },
 {
  "word": "Galryr",
  "pos": "noun",
  "meaning": "industry; construction",
  "pronunciation": "/ˈgalryr/"
 },
 {
  "word": "Gaomor",
  "pos": "noun",
  "meaning": "verb",
  "pronunciation": "/ˈgaomor/"
 },
 {
  "word": "Gaos",
  "pos": "noun",
  "meaning": "nadir; underside; animal belly, animal stomach",
  "pronunciation": "/gaos/"
 },
 {
  "word": "Garaktys",
  "pos": "noun",
  "meaning": "vulture",
  "pronunciation": "/gaˈraktys/"
 },
 {
  "word": "Geltion",
  "pos": "noun",
  "meaning": "roof",
  "pronunciation": "/ˈgeltion/"
 },
 {
  "word": "Geltiros",
  "pos": "noun",
  "meaning": "cover, one which covers",
  "pronunciation": "/ˈgeltiros/"
 },
 {
  "word": "Gerosilas",
  "pos": "noun",
  "meaning": "goodbye, bye, farewell",
  "pronunciation": "/geroˈsilas/"
 },
 {
  "word": "Gierūlnon",
  "pos": "noun",
  "meaning": "assembly, gathering, congregation; audience; crowd",
  "pronunciation": "/gieˈruːlnon/"
 },
 {
  "word": "Gisagon",
  "pos": "verb",
  "meaning": "to scrape",
  "pronunciation": "/giˈsagon/"
 },
 {
  "word": "Giēñagon",
  "pos": "verb",
  "meaning": "to heal, to be healed, to become healed, to become healthy, to recover",
  "pronunciation": "/ˈgieːɲagon/"
 },
 {
  "word": "Giēñemagon",
  "pos": "verb",
  "meaning": "to heal, to treat, to cure",
  "pronunciation": "/gieːɲeˈmagon/"
 },
 {
  "word": "Giēñēbagon",
  "pos": "verb",
  "meaning": "to recuperate",
  "pronunciation": "/gieːˈɲeːbagon/"
 },
 {
  "word": "Glaesa",
  "pos": "noun",
  "meaning": "alive; true, real",
  "pronunciation": "/ˈglaesa/"
 },
 {
  "word": "Glaesenka",
  "pos": "noun",
  "meaning": "lifelike",
  "pronunciation": "/glaeˈseŋka/"
 },
 {
  "word": "Grevenka",
  "pos": "noun",
  "meaning": "round",
  "pronunciation": "/greˈveŋka/"
 },
 {
  "word": "Grevion",
  "pos": "noun",
  "meaning": "waist; circumference",
  "pronunciation": "/ˈgrevion/"
 },
 {
  "word": "Grevy",
  "pos": "noun",
  "meaning": "wheel",
  "pronunciation": "/ˈgrevy/"
 },
 {
  "word": "Grozilla",
  "pos": "noun",
  "meaning": "boundary, border, bound, limit",
  "pronunciation": "/groˈzilla/"
 },
 {
  "word": "Grozion",
  "pos": "noun",
  "meaning": "furrow, ditch, trench",
  "pronunciation": "/ˈgrozion/"
 },
 {
  "word": "Hae hunē kirine",
  "pos": "phrase",
  "meaning": "content, satisfied (literally \"happy as a rabbit\")",
  "pronunciation": "/hae ˈhuneː kiˈrine/"
 },
 {
  "word": "Haerēbagon",
  "pos": "noun",
  "meaning": "(of things) to travel",
  "pronunciation": "/haeˈreːbagon/"
 },
 {
  "word": "Hakossiarza",
  "pos": "noun",
  "meaning": "crazy, insane, mad, addled",
  "pronunciation": "/hakosˈsiarza/"
 },
 {
  "word": "Harris",
  "pos": "noun",
  "meaning": "while, duration; indefinite amount of time that varies based on the activity referred to; appropriate amount of time that an activity ought to last",
  "pronunciation": "/ˈharris/"
 },
 {
  "word": "Harrī",
  "pos": "noun",
  "meaning": "while, during (co-occurs with a noun in the genitive or a full phrase in the indicative)",
  "pronunciation": "/ˈharriː/"
 },
 {
  "word": "Havon",
  "pos": "noun",
  "meaning": "bread",
  "pronunciation": "/ˈhavon/"
 },
 {
  "word": "Hegharys",
  "pos": "noun",
  "meaning": "carcass (of an animal)",
  "pronunciation": "/heˈɣarys/"
 },
 {
  "word": "Hegnīr",
  "pos": "noun",
  "meaning": "like that; (to dragons) Good!; so, so that",
  "pronunciation": "/ˈhegniːr/"
 },
 {
  "word": "Heksīr",
  "pos": "noun",
  "meaning": "like this; in this way",
  "pronunciation": "/ˈheksiːr/"
 },
 {
  "word": "Hembār",
  "pos": "noun",
  "meaning": "next",
  "pronunciation": "/ˈhembaːr/"
 },
 {
  "word": "Henumāzigon",
  "pos": "verb",
  "meaning": "to come from something (dative, or optionally genitive for a singular object directly before the verb)",
  "pronunciation": "/henuˈmaːzigon/"
 },
 {
  "word": "Henumīdēmagon",
  "pos": "verb",
  "meaning": "to spend time away from  something (dative, or optionally genitive for a singular object directly before the verb)",
  "pronunciation": "/henumiːˈdeːmagon/"
 },
 {
  "word": "Heptegon",
  "pos": "verb",
  "meaning": "to accede (to a throne or other office)",
  "pronunciation": "/ˈheptegon/"
 },
 {
  "word": "Heptenon",
  "pos": "noun",
  "meaning": "accession, acceding",
  "pronunciation": "/ˈheptenon/"
 },
 {
  "word": "Heqo",
  "pos": "noun",
  "meaning": "insect; fly",
  "pronunciation": "/ˈheqo/"
 },
 {
  "word": "Hilmio",
  "pos": "noun",
  "meaning": "fist, grip",
  "pronunciation": "/ˈhilmio/"
 },
 {
  "word": "Hinikagon",
  "pos": "verb",
  "meaning": "to put outside, to put out of doors, to turn out; to expose; to risk, to put in danger",
  "pronunciation": "/hiniˈkagon/"
 },
 {
  "word": "Hisagon",
  "pos": "verb",
  "meaning": "to slice",
  "pronunciation": "/hiˈsagon/"
 },
 {
  "word": "Hobrero ñellyr",
  "pos": "phrase",
  "meaning": "goatskin",
  "pronunciation": "/hoˈbrero ˈɲellyr/"
 },
 {
  "word": "Hontes",
  "pos": "noun",
  "meaning": "bird",
  "pronunciation": "/ˈhontes/"
 },
 {
  "word": "Iambigon",
  "pos": "verb",
  "meaning": "to struggle with, to fight  something (accusative)",
  "pronunciation": "/ˈiambigon/"
 },
 {
  "word": "Iderennes",
  "pos": "noun",
  "meaning": "trial",
  "pronunciation": "/ideˈrennes/"
 },
 {
  "word": "Iderennon",
  "pos": "noun",
  "meaning": "choice; decision; selection",
  "pronunciation": "/ideˈrennon/"
 },
 {
  "word": "Ienkagon",
  "pos": "verb",
  "meaning": "to owe  something (accusative)",
  "pronunciation": "/ˈieŋkagon/"
 },
 {
  "word": "Igron",
  "pos": "noun",
  "meaning": "sack, bag, pouch",
  "pronunciation": "/ˈigron/"
 },
 {
  "word": "Ihepty",
  "pos": "noun",
  "meaning": "crow’s nest",
  "pronunciation": "/iˈhepty/"
 },
 {
  "word": "Ihulagon",
  "pos": "verb",
  "meaning": "to pour out",
  "pronunciation": "/ihuˈlagon/"
 },
 {
  "word": "Ilnītsos",
  "pos": "noun",
  "meaning": "rest, nap",
  "pronunciation": "/ilˈniːtsos/"
 },
 {
  "word": "Ilvos",
  "pos": "noun",
  "meaning": "bed",
  "pronunciation": "/ˈilvos/"
 },
 {
  "word": "Ilzȳnagon",
  "pos": "verb",
  "meaning": "to cultivate, to engender; to encourage to grow, to cause to grow",
  "pronunciation": "/ilˈzyːnagon/"
 },
 {
  "word": "Ilībagon",
  "pos": "verb",
  "meaning": "to lie (in a horizontal position), to be prostrate",
  "pronunciation": "/iˈliːbagon/"
 },
 {
  "word": "Ilībōños",
  "pos": "noun",
  "meaning": "whoreson, bastard; bitch, slut; generic insult or curse used towards any gender",
  "pronunciation": "/iliːˈboːɲos/"
 },
 {
  "word": "Imunnon",
  "pos": "noun",
  "meaning": "sympathy, commiseration",
  "pronunciation": "/iˈmunnon/"
 },
 {
  "word": "Indirarion",
  "pos": "noun",
  "meaning": "reason, motive, cause, purpose",
  "pronunciation": "/indiˈrarion/"
 },
 {
  "word": "Indirys",
  "pos": "noun",
  "meaning": "rival",
  "pronunciation": "/ˈindirys/"
 },
 {
  "word": "Inkon",
  "pos": "noun",
  "meaning": "back; back part, back side",
  "pronunciation": "/ˈiŋkon/"
 },
 {
  "word": "Ioje",
  "pos": "noun",
  "meaning": "Alternative form of iosre",
  "pronunciation": "/ˈioɟe/"
 },
 {
  "word": "Iotāpagon",
  "pos": "verb",
  "meaning": "to think of, to think about; to suspect",
  "pronunciation": "/ioˈtaːpagon/"
 },
 {
  "word": "Jaedria",
  "pos": "noun",
  "meaning": "the Summer Isles (an archipelago south of Westeros and Essos)",
  "pronunciation": "/ˈɟaedria/"
 },
 {
  "word": "Jaehaelor",
  "pos": "proper noun",
  "meaning": "a male given name",
  "pronunciation": "/ɟaeˈhaelor/"
 },
 {
  "word": "Jaehenka",
  "pos": "noun",
  "meaning": "godlike",
  "pronunciation": "/ɟaeˈheŋka/"
 },
 {
  "word": "Jaerēbagon",
  "pos": "verb",
  "meaning": "to travel for",
  "pronunciation": "/ɟaeˈreːbagon/"
 },
 {
  "word": "Jaos",
  "pos": "noun",
  "meaning": "dog",
  "pronunciation": "/ɟaos/"
 },
 {
  "word": "Jelmio",
  "pos": "noun",
  "meaning": "wind",
  "pronunciation": "/ˈɟelmio/"
 },
 {
  "word": "Jelmor",
  "pos": "noun",
  "meaning": "north",
  "pronunciation": "/ˈɟelmor/"
 },
 {
  "word": "Jelmāzma",
  "pos": "noun",
  "meaning": "storm; violent wind",
  "pronunciation": "/ɟelˈmaːzma/"
 },
 {
  "word": "Jelmāzmo",
  "pos": "noun",
  "meaning": "Stormborn (title of Daenerys Targaryen in the universe of A Song of Ice and Fire)",
  "pronunciation": "/ɟelˈmaːzmo/"
 },
 {
  "word": "Jelmōñe",
  "pos": "noun",
  "meaning": "north, northern",
  "pronunciation": "/ɟelˈmoːɲe/"
 },
 {
  "word": "Jelo",
  "pos": "noun",
  "meaning": "lemon",
  "pronunciation": "/ˈɟelo/"
 },
 {
  "word": "Jenenka",
  "pos": "noun",
  "meaning": "made of glass, glass; glassy",
  "pronunciation": "/ɟeˈneŋka/"
 },
 {
  "word": "Jentys",
  "pos": "noun",
  "meaning": "leader; ruler; commander",
  "pronunciation": "/ˈɟentys/"
 },
 {
  "word": "Jepagon",
  "pos": "noun",
  "meaning": "Nonstandard form of iepagon.",
  "pronunciation": "/ɟeˈpagon/"
 },
 {
  "word": "Jerde",
  "pos": "noun",
  "meaning": "cherry",
  "pronunciation": "/ˈɟerde/"
 },
 {
  "word": "Jesuragon",
  "pos": "verb",
  "meaning": "to sprinkle with powder or dust, to pour dust or powder on, to powder, to dust  with something (instrumental)",
  "pronunciation": "/ɟesuˈragon/"
 },
 {
  "word": "Jeva",
  "pos": "noun",
  "meaning": "your; second-person plural possessive adjective",
  "pronunciation": "/ˈɟeva/"
 },
 {
  "word": "Jiōrion",
  "pos": "noun",
  "meaning": "reception hall, receiving room; audience chamber; chamber, chambers",
  "pronunciation": "/ˈɟioːrion/"
 },
 {
  "word": "Jiōrnon",
  "pos": "noun",
  "meaning": "welcome",
  "pronunciation": "/ˈɟioːrnon/"
 },
 {
  "word": "Jodakogon",
  "pos": "verb",
  "meaning": "to attack, to assail, to have at",
  "pronunciation": "/ɟodaˈkogon/"
 },
 {
  "word": "Jokōrȳdragon",
  "pos": "verb",
  "meaning": "to gossip",
  "pronunciation": "/ɟokoːˈryːdragon/"
 },
 {
  "word": "Jollōrion",
  "pos": "noun",
  "meaning": "place for studying, place for investigation",
  "pronunciation": "/ɟolˈloːrion/"
 },
 {
  "word": "Kaerys",
  "pos": "noun",
  "meaning": "boyfriend, girlfriend; significant other",
  "pronunciation": "/ˈkaerys/"
 },
 {
  "word": "Kara",
  "pos": "noun",
  "meaning": "great, magnificent, excellent",
  "pronunciation": "/ˈkara/"
 },
 {
  "word": "Kastāmiri",
  "pos": "noun",
  "meaning": "Castamere, a castle",
  "pronunciation": "/kasˈtaːmiri/"
 },
 {
  "word": "Kastūljapos",
  "pos": "noun",
  "meaning": "bloom",
  "pronunciation": "/kasˈtuːʎapos/"
 },
 {
  "word": "Kekepa",
  "pos": "noun",
  "meaning": "father's father, paternal grandfather, grandfather",
  "pronunciation": "/keˈkepa/"
 },
 {
  "word": "Keliemagon",
  "pos": "verb",
  "meaning": "to stop, to keep from",
  "pronunciation": "/kelieˈmagon/"
 },
 {
  "word": "Keligon",
  "pos": "verb",
  "meaning": "to cease, to stop, to come to a stop, to halt, to end",
  "pronunciation": "/keˈligon/"
 },
 {
  "word": "Kempa",
  "pos": "noun",
  "meaning": "heavy, weighty; impressive",
  "pronunciation": "/ˈkempa/"
 },
 {
  "word": "Kepo Tubis Biare",
  "pos": "phrase",
  "meaning": "Happy Father's Day!",
  "pronunciation": "/ˈkepo ˈtubis ˈbiare/"
 },
 {
  "word": "Kerilla",
  "pos": "noun",
  "meaning": "soup, stew",
  "pronunciation": "/keˈrilla/"
 },
 {
  "word": "Keskydoso",
  "pos": "noun",
  "meaning": "in the same way; likewise",
  "pronunciation": "/keskyˈdoso/"
 },
 {
  "word": "Kesrio syt",
  "pos": "phrase",
  "meaning": "because, for",
  "pronunciation": "/ˈkesrio syt/"
 },
 {
  "word": "Kesy",
  "pos": "noun",
  "meaning": "this one, this (for inanimate, concrete, countable entities)",
  "pronunciation": "/ˈkesy/"
 },
 {
  "word": "Kesīr drējī jiōrilāks",
  "pos": "phrase",
  "meaning": "You are very welcome here.",
  "pronunciation": "/ˈkesiːr ˈdreːɟiː ˈɟioːrilaːks/"
 },
 {
  "word": "Kinvara",
  "pos": "proper noun",
  "meaning": "a female given name",
  "pronunciation": "/ˈkinvara/"
 },
 {
  "word": "Kipio",
  "pos": "noun",
  "meaning": "rider",
  "pronunciation": "/ˈkipio/"
 },
 {
  "word": "Kirimves",
  "pos": "noun",
  "meaning": "happiness, joy",
  "pronunciation": "/kiˈrimves/"
 },
 {
  "word": "Kirimvose avy rytsuran",
  "pos": "phrase",
  "meaning": "thank you, I thank you",
  "pronunciation": "/kiˈrimvose ˈavy ryˈtsuran/"
 },
 {
  "word": "Kisalbar",
  "pos": "noun",
  "meaning": "feast, banquet",
  "pronunciation": "/kiˈsalbar/"
 },
 {
  "word": "Kiōs",
  "pos": "noun",
  "meaning": "spring (season)",
  "pronunciation": "/kioːs/"
 },
 {
  "word": "Kona",
  "pos": "noun",
  "meaning": "that (for inanimates)",
  "pronunciation": "/ˈkona/"
 },
 {
  "word": "Laehurlion",
  "pos": "noun",
  "meaning": "face",
  "pronunciation": "/laeˈhurlion/"
 },
 {
  "word": "Laehurloqitta",
  "pos": "noun",
  "meaning": "faceless",
  "pronunciation": "/laehurloˈqitta/"
 },
 {
  "word": "Laehurloqitta Vala",
  "pos": "phrase",
  "meaning": "Faceless Man, member of the Faceless Men (a religious organization of assassins from Braavos in the universe of A Song of Ice and Fire)",
  "pronunciation": "/laehurloˈqitta ˈvala/"
 },
 {
  "word": "Landir",
  "pos": "noun",
  "meaning": "footwear",
  "pronunciation": "/ˈlandir/"
 },
 {
  "word": "Landis",
  "pos": "noun",
  "meaning": "boot, shoe",
  "pronunciation": "/ˈlandis/"
 },
 {
  "word": "Lannister",
  "pos": "noun",
  "meaning": "A surname&#8203;.",
  "pronunciation": "/ˈlannister/"
 },
 {
  "word": "Lanta",
  "pos": "adjective",
  "meaning": "two (2)",
  "pronunciation": "/ˈlanta/"
 },
 {
  "word": "Lantīblie",
  "pos": "adjective",
  "meaning": "twentieth (20th)",
  "pronunciation": "/lanˈtiːblie/"
 },
 {
  "word": "Laodikio",
  "pos": "noun",
  "meaning": "thief, cutpurse; robber; plunderer",
  "pronunciation": "/ˈlaodikio/"
 },
 {
  "word": "Larīdion",
  "pos": "noun",
  "meaning": "diamond",
  "pronunciation": "/laˈriːdion/"
 },
 {
  "word": "Lenagon",
  "pos": "verb",
  "meaning": "to build, to construct",
  "pronunciation": "/leˈnagon/"
 },
 {
  "word": "Lentot",
  "pos": "noun",
  "meaning": "civil, domestic, at home, home, within a place(to dragons) Go home!",
  "pronunciation": "/ˈlentot/"
 },
 {
  "word": "Lentun",
  "pos": "noun",
  "meaning": "community",
  "pronunciation": "/ˈlentun/"
 },
 {
  "word": "Lentāzma",
  "pos": "noun",
  "meaning": "home",
  "pronunciation": "/lenˈtaːzma/"
 },
 {
  "word": "Lo",
  "pos": "noun",
  "meaning": "if; when; just as",
  "pronunciation": "/lo/"
 },
 {
  "word": "Lo sīr",
  "pos": "phrase",
  "meaning": "now that",
  "pronunciation": "/lo siːr/"
 },
 {
  "word": "Majaqagon",
  "pos": "verb",
  "meaning": "to admire",
  "pronunciation": "/maɟaˈqagon/"
 },
 {
  "word": "Mana kekepa",
  "pos": "phrase",
  "meaning": "paternal great-grandfather, paternal grandparent's father, father's parent's father",
  "pronunciation": "/ˈmana keˈkepa/"
 },
 {
  "word": "Mana mumuña",
  "pos": "phrase",
  "meaning": "maternal great-grandmother, maternal grandparent's mother, mother's parent's mother",
  "pronunciation": "/ˈmana muˈmuɲa/"
 },
 {
  "word": "Mana muñāzmar",
  "pos": "phrase",
  "meaning": "paternal great-grandparents, father's grandparents",
  "pronunciation": "/ˈmana muˈɲaːzmar/"
 },
 {
  "word": "Mandirī",
  "pos": "noun",
  "meaning": "courteously, kindly; deferentially",
  "pronunciation": "/ˈmandiriː/"
 },
 {
  "word": "Manengagon",
  "pos": "verb",
  "meaning": "to scoop, to ladle",
  "pronunciation": "/maˈneŋgagon/"
 },
 {
  "word": "Marta",
  "pos": "noun",
  "meaning": "symmetrical, balanced",
  "pronunciation": "/ˈmarta/"
 },
 {
  "word": "Massigon",
  "pos": "verb",
  "meaning": "to happen, to occur",
  "pronunciation": "/ˈmassigon/"
 },
 {
  "word": "Massinon",
  "pos": "noun",
  "meaning": "occurrence, event",
  "pronunciation": "/ˈmassinon/"
 },
 {
  "word": "Massirys",
  "pos": "noun",
  "meaning": "present, the present times",
  "pronunciation": "/ˈmassirys/"
 },
 {
  "word": "Masynnon",
  "pos": "noun",
  "meaning": "suspicion, hunch",
  "pronunciation": "/maˈsynnon/"
 },
 {
  "word": "Mazumbagon",
  "pos": "verb",
  "meaning": "to settle, to settle down; to join up  with a group (comitative)",
  "pronunciation": "/maˈzumbagon/"
 },
 {
  "word": "Mazumbilla",
  "pos": "noun",
  "meaning": "nest, roost; cradle",
  "pronunciation": "/mazumˈbilla/"
 },
 {
  "word": "Mazvestragon",
  "pos": "verb",
  "meaning": "to speak",
  "pronunciation": "/mazˈvestragon/"
 },
 {
  "word": "Melos",
  "pos": "noun",
  "meaning": "ruby",
  "pronunciation": "/ˈmelos/"
 },
 {
  "word": "Melvar",
  "pos": "noun",
  "meaning": "pear tree",
  "pronunciation": "/ˈmelvar/"
 },
 {
  "word": "Melvo",
  "pos": "noun",
  "meaning": "pear",
  "pronunciation": "/ˈmelvo/"
 },
 {
  "word": "Memēbagon",
  "pos": "verb",
  "meaning": "to march",
  "pronunciation": "/meˈmeːbagon/"
 },
 {
  "word": "Mentys",
  "pos": "noun",
  "meaning": "soldier",
  "pronunciation": "/ˈmentys/"
 },
 {
  "word": "Mirrion",
  "pos": "noun",
  "meaning": "some place, somewhere; any place, anywhere",
  "pronunciation": "/ˈmirrion/"
 },
 {
  "word": "Mirriot",
  "pos": "noun",
  "meaning": "somewhere; anywhere",
  "pronunciation": "/ˈmirriot/"
 },
 {
  "word": "Mirror",
  "pos": "noun",
  "meaning": "whatever",
  "pronunciation": "/ˈmirror/"
 },
 {
  "word": "Mittagon",
  "pos": "verb",
  "meaning": "to stammer, to stutter",
  "pronunciation": "/ˈmittagon/"
 },
 {
  "word": "Mittire",
  "pos": "noun",
  "meaning": "idiotic, foolish, imbecilic",
  "pronunciation": "/ˈmittire/"
 },
 {
  "word": "Molry",
  "pos": "noun",
  "meaning": "horn",
  "pronunciation": "/ˈmolry/"
 },
 {
  "word": "Naejon",
  "pos": "noun",
  "meaning": "front; torso",
  "pronunciation": "/ˈnaeɟon/"
 },
 {
  "word": "Naejītsos",
  "pos": "noun",
  "meaning": "forehead",
  "pronunciation": "/naeˈɟiːtsos/"
 },
 {
  "word": "Naena",
  "pos": "noun",
  "meaning": "many, multitude; horde",
  "pronunciation": "/ˈnaena/"
 },
 {
  "word": "Naenākogon",
  "pos": "verb",
  "meaning": "to multiply (with locative); to increase",
  "pronunciation": "/naeˈnaːkogon/"
 },
 {
  "word": "Nekesse Valyrio",
  "pos": "phrase",
  "meaning": "Valyrian writing system, Valyrian glyphs (the writing system used to write the High Valyrian language)",
  "pronunciation": "/neˈkesse vaˈlyrio/"
 },
 {
  "word": "Nekkisio",
  "pos": "noun",
  "meaning": "shark",
  "pronunciation": "/ˈnekkisio/"
 },
 {
  "word": "Nektogon",
  "pos": "verb",
  "meaning": "to cut, to slice, to slash",
  "pronunciation": "/ˈnektogon/"
 },
 {
  "word": "Nerny",
  "pos": "noun",
  "meaning": "door; mouth (of a cave)",
  "pronunciation": "/ˈnerny/"
 },
 {
  "word": "Nevegon",
  "pos": "verb",
  "meaning": "to carry",
  "pronunciation": "/neˈvegon/"
 },
 {
  "word": "Nine",
  "pos": "noun",
  "meaning": "palm",
  "pronunciation": "/ˈnine/"
 },
 {
  "word": "Ninkiot",
  "pos": "noun",
  "meaning": "outside; (to dragons) Land!",
  "pronunciation": "/ˈniŋkiot/"
 },
 {
  "word": "Nābēmagon",
  "pos": "verb",
  "meaning": "to unfasten, to unleash, to loose, to loosen; to shoot, to throw, to launch, to fire (a siege engine)",
  "pronunciation": "/naːˈbeːmagon/"
 },
 {
  "word": "Obar",
  "pos": "noun",
  "meaning": "curve, bend, arc, arch; slope",
  "pronunciation": "/ˈobar/"
 },
 {
  "word": "Obītsos",
  "pos": "noun",
  "meaning": "nipple",
  "pronunciation": "/oˈbiːtsos/"
 },
 {
  "word": "Odinge",
  "pos": "noun",
  "meaning": "lungwort (plant)",
  "pronunciation": "/oˈdiŋge/"
 },
 {
  "word": "Ohīlion",
  "pos": "noun",
  "meaning": "talon",
  "pronunciation": "/oˈhiːlion/"
 },
 {
  "word": "Ojehiknon",
  "pos": "noun",
  "meaning": "blessing",
  "pronunciation": "/oɟeˈhiknon/"
 },
 {
  "word": "Ojeñāzma",
  "pos": "noun",
  "meaning": "lust",
  "pronunciation": "/oɟeˈɲaːzma/"
 },
 {
  "word": "Oktio",
  "pos": "adjective",
  "meaning": "civic, urban, of the city",
  "pronunciation": "/ˈoktio/"
 },
 {
  "word": "Oktion",
  "pos": "noun",
  "meaning": "city",
  "pronunciation": "/ˈoktion/"
 },
 {
  "word": "Oktior",
  "pos": "noun",
  "meaning": "civilization",
  "pronunciation": "/ˈoktior/"
 },
 {
  "word": "Olvie",
  "pos": "noun",
  "meaning": "many, much, a lot of",
  "pronunciation": "/ˈolvie/"
 },
 {
  "word": "Ondossi",
  "pos": "noun",
  "meaning": "by, at the hand of (used with passive verbs to mark a plural agent; co-occurs with a noun in the genitive)",
  "pronunciation": "/onˈdossi/"
 },
 {
  "word": "Onga",
  "pos": "noun",
  "meaning": "crooked, gnarled; wrinkled",
  "pronunciation": "/ˈoŋga/"
 },
 {
  "word": "Onjapos",
  "pos": "noun",
  "meaning": "carrot",
  "pronunciation": "/ˈoɲɟapos/"
 },
 {
  "word": "Paghy",
  "pos": "noun",
  "meaning": "breath",
  "pronunciation": "/ˈpaɣy/"
 },
 {
  "word": "Parklon",
  "pos": "noun",
  "meaning": "meat",
  "pronunciation": "/ˈparklon/"
 },
 {
  "word": "Parklor",
  "pos": "noun",
  "meaning": "meal",
  "pronunciation": "/ˈparklor/"
 },
 {
  "word": "Parmenka",
  "pos": "noun",
  "meaning": "grass",
  "pronunciation": "/parˈmeŋka/"
 },
 {
  "word": "Parmon",
  "pos": "noun",
  "meaning": "grass",
  "pronunciation": "/ˈparmon/"
 },
 {
  "word": "Parmot",
  "pos": "noun",
  "meaning": "(to dragons) Land!",
  "pronunciation": "/ˈparmot/"
 },
 {
  "word": "Pelelagon",
  "pos": "verb",
  "meaning": "to reflect",
  "pronunciation": "/peleˈlagon/"
 },
 {
  "word": "Pelelvos",
  "pos": "noun",
  "meaning": "mirror",
  "pronunciation": "/peˈlelvos/"
 },
 {
  "word": "Perzītsos",
  "pos": "noun",
  "meaning": "little flame",
  "pronunciation": "/perˈziːtsos/"
 },
 {
  "word": "Piktys",
  "pos": "noun",
  "meaning": "sycophant, lickspittle",
  "pronunciation": "/ˈpiktys/"
 },
 {
  "word": "Pikībagon",
  "pos": "verb",
  "meaning": "to read",
  "pronunciation": "/piˈkiːbagon/"
 },
 {
  "word": "Pikībarys",
  "pos": "noun",
  "meaning": "knowledge",
  "pronunciation": "/piˈkiːbarys/"
 },
 {
  "word": "Pirtiapos",
  "pos": "noun",
  "meaning": "joke",
  "pronunciation": "/ˈpirtiapos/"
 },
 {
  "word": "Pirtirī",
  "pos": "noun",
  "meaning": "wrong, wrongly, the wrong way",
  "pronunciation": "/ˈpirtiriː/"
 },
 {
  "word": "Pirtrirzi",
  "pos": "noun",
  "meaning": "under false pretense, deceitfully",
  "pronunciation": "/pirˈtrirzi/"
 },
 {
  "word": "Pogry",
  "pos": "noun",
  "meaning": "nail, claw",
  "pronunciation": "/ˈpogry/"
 },
 {
  "word": "Pragralbar",
  "pos": "noun",
  "meaning": "hull",
  "pronunciation": "/praˈgralbar/"
 },
 {
  "word": "Qelbar",
  "pos": "noun",
  "meaning": "river",
  "pronunciation": "/ˈqelbar/"
 },
 {
  "word": "Qelbria",
  "pos": "noun",
  "meaning": "the Riverlands (a region of Westeros)",
  "pronunciation": "/ˈqelbria/"
 },
 {
  "word": "Qeldlion",
  "pos": "noun",
  "meaning": "amber",
  "pronunciation": "/ˈqeldlion/"
 },
 {
  "word": "Qepagon",
  "pos": "verb",
  "meaning": "to pound, to flatten, to tamp",
  "pronunciation": "/qeˈpagon/"
 },
 {
  "word": "Qeragon",
  "pos": "verb",
  "meaning": "to drain, to empty; to dissolve",
  "pronunciation": "/qeˈragon/"
 },
 {
  "word": "Qintir",
  "pos": "noun",
  "meaning": "turtle",
  "pronunciation": "/ˈqintir/"
 },
 {
  "word": "Qlādugon",
  "pos": "verb",
  "meaning": "to drag (on the ground or behind one)",
  "pronunciation": "/ˈqlaːdugon/"
 },
 {
  "word": "Qlādīlluragon",
  "pos": "verb",
  "meaning": "to stripe, to put stripes on",
  "pronunciation": "/qlaːdiːlluˈragon/"
 },
 {
  "word": "Qogrion",
  "pos": "noun",
  "meaning": "agate",
  "pronunciation": "/ˈqogrion/"
 },
 {
  "word": "Qogror",
  "pos": "noun",
  "meaning": "ranks; group, grouping (in rows); class, type, gender",
  "pronunciation": "/ˈqogror/"
 },
 {
  "word": "Qopsa",
  "pos": "noun",
  "meaning": "rigid, stiff; difficult, hard",
  "pronunciation": "/ˈqopsa/"
 },
 {
  "word": "Qrillaodikio",
  "pos": "noun",
  "meaning": "marauder",
  "pronunciation": "/qrilˈlaodikio/"
 },
 {
  "word": "Qrimbrōsta",
  "pos": "noun",
  "meaning": "cursed",
  "pronunciation": "/qrimˈbroːsta/"
 },
 {
  "word": "Qrimbrōzvos",
  "pos": "noun",
  "meaning": "curse",
  "pronunciation": "/qrimˈbroːzvos/"
 },
 {
  "word": "Qrimbughegon",
  "pos": "verb",
  "meaning": "to drown",
  "pronunciation": "/qrimbuˈɣegon/"
 },
 {
  "word": "Qrimmajēbagon",
  "pos": "verb",
  "meaning": "to infiltrate",
  "pronunciation": "/qrimmaˈɟeːbagon/"
 },
 {
  "word": "Qrimpālekio",
  "pos": "noun",
  "meaning": "traitor, turncoat, double-crosser",
  "pronunciation": "/qrimˈpaːlekio/"
 },
 {
  "word": "Rakellar",
  "pos": "noun",
  "meaning": "experience",
  "pronunciation": "/raˈkellar/"
 },
 {
  "word": "Raqagon",
  "pos": "verb",
  "meaning": "to like, to love; to appreciate, to enjoy",
  "pronunciation": "/raˈqagon/"
 },
 {
  "word": "Raqiros",
  "pos": "noun",
  "meaning": "friend",
  "pronunciation": "/raˈqiros/"
 },
 {
  "word": "Raqnon",
  "pos": "noun",
  "meaning": "love, loves; appreciation; passion",
  "pronunciation": "/ˈraqnon/"
 },
 {
  "word": "Raqnoso",
  "pos": "noun",
  "meaning": "By friendship! (a greeting)",
  "pronunciation": "/ˈraqnoso/"
 },
 {
  "word": "Raqītsos",
  "pos": "noun",
  "meaning": "love (said of a person), beloved, loved one",
  "pronunciation": "/raˈqiːtsos/"
 },
 {
  "word": "Rhaenagon",
  "pos": "verb",
  "meaning": "to meet; to find, to encounter, to discover; to begin, to start (an event or a time period)",
  "pronunciation": "/ˈr̥aenagon/"
 },
 {
  "word": "Rhakilion",
  "pos": "noun",
  "meaning": "loom",
  "pronunciation": "/r̥aˈkilion/"
 },
 {
  "word": "Rhakitegon",
  "pos": "verb",
  "meaning": "to understand",
  "pronunciation": "/r̥akiˈtegon/"
 },
 {
  "word": "Rhottio",
  "pos": "noun",
  "meaning": "adult man",
  "pronunciation": "/ˈr̥ottio/"
 },
 {
  "word": "Rhova",
  "pos": "noun",
  "meaning": "loud",
  "pronunciation": "/ˈr̥ova/"
 },
 {
  "word": "Rhovio",
  "pos": "noun",
  "meaning": "thunder, thunderclap, thunderstrike",
  "pronunciation": "/ˈr̥ovio/"
 },
 {
  "word": "Rhovior",
  "pos": "noun",
  "meaning": "thunder (the phenomenon)",
  "pronunciation": "/ˈr̥ovior/"
 },
 {
  "word": "Rhupagon",
  "pos": "verb",
  "meaning": "to hack, to chip, to split",
  "pronunciation": "/r̥uˈpagon/"
 },
 {
  "word": "Rijare",
  "pos": "noun",
  "meaning": "adulatory, laudatory, flattering",
  "pronunciation": "/riˈɟare/"
 },
 {
  "word": "Rijnor",
  "pos": "noun",
  "meaning": "praise",
  "pronunciation": "/ˈriɟnor/"
 },
 {
  "word": "Rikon",
  "pos": "proper noun",
  "meaning": "a male given name",
  "pronunciation": "/ˈrikon/"
 },
 {
  "word": "Ripo",
  "pos": "noun",
  "meaning": "core; pit of a fruit, stone of a fruit; meat of a nut",
  "pronunciation": "/ˈripo/"
 },
 {
  "word": "Riāzma",
  "pos": "noun",
  "meaning": "canyon",
  "pronunciation": "/ˈriaːzma/"
 },
 {
  "word": "Roberti",
  "pos": "proper noun",
  "meaning": "a male given name",
  "pronunciation": "/roˈberti/"
 },
 {
  "word": "Rola",
  "pos": "noun",
  "meaning": "squirrel",
  "pronunciation": "/ˈrola/"
 },
 {
  "word": "Rongenka",
  "pos": "noun",
  "meaning": "leather",
  "pronunciation": "/roŋˈgeŋka/"
 },
 {
  "word": "Rongon",
  "pos": "noun",
  "meaning": "hide, animal skin; leather",
  "pronunciation": "/ˈroŋgon/"
 },
 {
  "word": "Sambranna",
  "pos": "noun",
  "meaning": "omen",
  "pronunciation": "/samˈbranna/"
 },
 {
  "word": "Septon",
  "pos": "noun",
  "meaning": "septon (a priest of the Faith of the Seven in the universe of A Song of Ice and Fire)",
  "pronunciation": "/ˈsepton/"
 },
 {
  "word": "Sesīr",
  "pos": "noun",
  "meaning": "also, even, and also; now, even now; and now, and so, and",
  "pronunciation": "/ˈsesiːr/"
 },
 {
  "word": "Sigligon",
  "pos": "verb",
  "meaning": "to bear again, to give birth to again; to reinstantiate, to reinitiate, to restart, to reboot; to reignite",
  "pronunciation": "/siˈgligon/"
 },
 {
  "word": "Sikarys",
  "pos": "noun",
  "meaning": "placenta, afterbirth",
  "pronunciation": "/siˈkarys/"
 },
 {
  "word": "Sikio",
  "pos": "noun",
  "meaning": "culprit, perpetrator",
  "pronunciation": "/ˈsikio/"
 },
 {
  "word": "Sindilion",
  "pos": "noun",
  "meaning": "market, marketplace",
  "pronunciation": "/ˈsindilion/"
 },
 {
  "word": "Sindity",
  "pos": "noun",
  "meaning": "purchase, bought thing; bought one, one who is bought",
  "pronunciation": "/ˈsindity/"
 },
 {
  "word": "Siñon",
  "pos": "noun",
  "meaning": "birth",
  "pronunciation": "/ˈsiɲon/"
 },
 {
  "word": "Skeligon",
  "pos": "verb",
  "meaning": "to cease, to stop, to come to a stop, to end",
  "pronunciation": "/skeˈligon/"
 },
 {
  "word": "Skorio syt",
  "pos": "phrase",
  "meaning": "why, on account of what?",
  "pronunciation": "/ˈskorio syt/"
 },
 {
  "word": "Skorion",
  "pos": "noun",
  "meaning": "what, what place, where? (for abstract or uncountable inanimate entities, including places)",
  "pronunciation": "/ˈskorion/"
 },
 {
  "word": "Skoroso jemēle brōzāt",
  "pos": "phrase",
  "meaning": "What are your (plural) names?",
  "pronunciation": "/skoˈroso ɟeˈmeːle ˈbroːzaːt/"
 },
 {
  "word": "Skorȳso",
  "pos": "adverb",
  "meaning": "why?; because (properly used in this sense only in response to a question)",
  "pronunciation": "/skoˈryːso/"
 },
 {
  "word": "Solion",
  "pos": "noun",
  "meaning": "voyage",
  "pronunciation": "/ˈsolion/"
 },
 {
  "word": "Soljagon",
  "pos": "verb",
  "meaning": "to sail; to steer, to pilot; to guide",
  "pronunciation": "/soˈʎagon/"
 },
 {
  "word": "Sparion",
  "pos": "pronoun",
  "meaning": "who? (for abstract or uncountable animate entities)",
  "pronunciation": "/ˈsparion/"
 },
 {
  "word": "Sparos",
  "pos": "pronoun",
  "meaning": "who? (for animate, concrete, countable entities)",
  "pronunciation": "/ˈsparos/"
 },
 {
  "word": "Statagon",
  "pos": "verb",
  "meaning": "to execute&#91;7&#93;",
  "pronunciation": "/staˈtagon/"
 },
 {
  "word": "Sylutegon",
  "pos": "verb",
  "meaning": "to taste",
  "pronunciation": "/syluˈtegon/"
 },
 {
  "word": "Sylvia",
  "pos": "noun",
  "meaning": "wisdom",
  "pronunciation": "/ˈsylvia/"
 },
 {
  "word": "Sylvie",
  "pos": "noun",
  "meaning": "wise",
  "pronunciation": "/ˈsylvie/"
 },
 {
  "word": "Syrio",
  "pos": "proper noun",
  "meaning": "a male given name",
  "pronunciation": "/ˈsyrio/"
 },
 {
  "word": "Talannar",
  "pos": "noun",
  "meaning": "grandchildren",
  "pronunciation": "/taˈlannar/"
 },
 {
  "word": "Tatagon",
  "pos": "verb",
  "meaning": "to finish, to be over",
  "pronunciation": "/taˈtagon/"
 },
 {
  "word": "Tegōñe",
  "pos": "adjective",
  "meaning": "terrestrial, relating to the earth; terrestrial class, terrestrial",
  "pronunciation": "/teˈgoːɲe/"
 },
 {
  "word": "Tepilla",
  "pos": "noun",
  "meaning": "mercy, compassion, generosity",
  "pronunciation": "/teˈpilla/"
 },
 {
  "word": "Terragon",
  "pos": "verb",
  "meaning": "to uproot, to unearth, to dig up",
  "pronunciation": "/ˈterragon/"
 },
 {
  "word": "Tessagon",
  "pos": "verb",
  "meaning": "to rip",
  "pronunciation": "/ˈtessagon/"
 },
 {
  "word": "Teta",
  "pos": "noun",
  "meaning": "complete, total; absolute; finished, done",
  "pronunciation": "/ˈteta/"
 },
 {
  "word": "Thoros",
  "pos": "proper noun",
  "meaning": "a male given name",
  "pronunciation": "/ˈθoros/"
 },
 {
  "word": "Tije",
  "pos": "noun",
  "meaning": "wooden",
  "pronunciation": "/ˈtiɟe/"
 },
 {
  "word": "Tolije",
  "pos": "noun",
  "meaning": "last, final, ultimate",
  "pronunciation": "/toˈliɟe/"
 },
 {
  "word": "Tolijos",
  "pos": "noun",
  "meaning": "last man, last one, last thing",
  "pronunciation": "/toˈliɟos/"
 },
 {
  "word": "Tolion",
  "pos": "noun",
  "meaning": "something else, another, another one, the other, the other one (for inanimate entities)",
  "pronunciation": "/ˈtolion/"
 },
 {
  "word": "Tolvys",
  "pos": "noun",
  "meaning": "everyone, everybody (for animate entities)",
  "pronunciation": "/ˈtolvys/"
 },
 {
  "word": "Tolālion",
  "pos": "noun",
  "meaning": "environs, environment; wilderness",
  "pronunciation": "/toˈlaːlion/"
 },
 {
  "word": "Toron",
  "pos": "noun",
  "meaning": "brick",
  "pronunciation": "/ˈtoron/"
 },
 {
  "word": "Trēsanna",
  "pos": "noun",
  "meaning": "grandson",
  "pronunciation": "/treːˈsanna/"
 },
 {
  "word": "Trūma",
  "pos": "noun",
  "meaning": "deep",
  "pronunciation": "/ˈtruːma/"
 },
 {
  "word": "Trūmirī",
  "pos": "noun",
  "meaning": "deeply",
  "pronunciation": "/ˈtruːmiriː/"
 },
 {
  "word": "Trūmālion",
  "pos": "noun",
  "meaning": "well",
  "pronunciation": "/truːˈmaːlion/"
 },
 {
  "word": "Udekuragon",
  "pos": "verb",
  "meaning": "to near, to approach, to step towards (with dative)",
  "pronunciation": "/udekuˈragon/"
 },
 {
  "word": "Udir",
  "pos": "noun",
  "meaning": "word, news",
  "pronunciation": "/ˈudir/"
 },
 {
  "word": "Udligon",
  "pos": "verb",
  "meaning": "to respond, to answer, to reply",
  "pronunciation": "/uˈdligon/"
 },
 {
  "word": "Udrimmi",
  "pos": "noun",
  "meaning": "witty, clever, quick-witted, always having the right word at the right moment",
  "pronunciation": "/uˈdrimmi/"
 },
 {
  "word": "Udrin",
  "pos": "noun",
  "meaning": "phrase; saying; aphorism",
  "pronunciation": "/ˈudrin/"
 },
 {
  "word": "Uela",
  "pos": "noun",
  "meaning": "cedar",
  "pronunciation": "/ˈuela/"
 },
 {
  "word": "Ulōragon",
  "pos": "verb",
  "meaning": "to investigate  something (dative)",
  "pronunciation": "/uˈloːragon/"
 },
 {
  "word": "Va mōriot",
  "pos": "phrase",
  "meaning": "always, forever, to the end",
  "pronunciation": "/va ˈmoːriot/"
 },
 {
  "word": "Vagar",
  "pos": "proper noun",
  "meaning": "Vhagar (a Valyrian deity); a dragon given name",
  "pronunciation": "/ˈvagar/"
 },
 {
  "word": "Vajiñagon",
  "pos": "noun",
  "meaning": "Alternative form of vasriñagon",
  "pronunciation": "/vaɟiˈɲagon/"
 },
 {
  "word": "Valar morghūlis",
  "pos": "phrase",
  "meaning": "All men must die.",
  "pronunciation": "/ˈvalar morˈɣuːlis/"
 },
 {
  "word": "Valdrīzes",
  "pos": "noun",
  "meaning": "sphinx, Valyrian sphinx, dragon with a human face",
  "pronunciation": "/valˈdriːzes/"
 },
 {
  "word": "Valenka",
  "pos": "noun",
  "meaning": "male",
  "pronunciation": "/vaˈleŋka/"
 },
 {
  "word": "Valyrīha",
  "pos": "adjective",
  "meaning": "Valyrian, of Valyria",
  "pronunciation": "/valyˈriːha/"
 },
 {
  "word": "Valzȳrys",
  "pos": "noun",
  "meaning": "husband",
  "pronunciation": "/valˈzyːrys/"
 },
 {
  "word": "Vamiot",
  "pos": "noun",
  "meaning": "near, nearby; near, close to (co-occurs with a noun in the genitive)",
  "pronunciation": "/ˈvamiot/"
 },
 {
  "word": "Vaodekuragon",
  "pos": "verb",
  "meaning": "to near, to approach, to step towards  something (dative, or optionally genitive for a singular object directly before the verb)",
  "pronunciation": "/vaodekuˈragon/"
 },
 {
  "word": "Vaogenka",
  "pos": "noun",
  "meaning": "dirty, muddy",
  "pronunciation": "/vaoˈgeŋka/"
 },
 {
  "word": "Varys",
  "pos": "proper noun",
  "meaning": "a male given name",
  "pronunciation": "/ˈvarys/"
 },
 {
  "word": "Vasrie",
  "pos": "noun",
  "meaning": "thin",
  "pronunciation": "/ˈvasrie/"
 },
 {
  "word": "Vasrie pragres",
  "pos": "phrase",
  "meaning": "mussel",
  "pronunciation": "/ˈvasrie ˈpragres/"
 },
 {
  "word": "Vasriñagon",
  "pos": "verb",
  "meaning": "to thin, to become thin; to lessen, to become less",
  "pronunciation": "/vasriˈɲagon/"
 },
 {
  "word": "Vele",
  "pos": "noun",
  "meaning": "buoy",
  "pronunciation": "/ˈvele/"
 },
 {
  "word": "Velkrys",
  "pos": "noun",
  "meaning": "stag, male deer",
  "pronunciation": "/ˈvelkrys/"
 },
 {
  "word": "Vellaros",
  "pos": "noun",
  "meaning": "trousers, pants",
  "pronunciation": "/ˈvellaros/"
 },
 {
  "word": "Velmanna",
  "pos": "noun",
  "meaning": "father's older sister's child, cross cousin by paternal aunt older than father, cousin",
  "pronunciation": "/velˈmanna/"
 },
 {
  "word": "Verdligon",
  "pos": "verb",
  "meaning": "to remake, to recreate",
  "pronunciation": "/ˈverdligon/"
 },
 {
  "word": "Vesteros",
  "pos": "noun",
  "meaning": "Westeros (the westernmost continent of the Known World in A Song of Ice and Fire)",
  "pronunciation": "/ˈvesteros/"
 },
 {
  "word": "Vestriarzir",
  "pos": "noun",
  "meaning": "story, tale, narrative, history",
  "pronunciation": "/vesˈtriarzir/"
 },
 {
  "word": "Vestriros",
  "pos": "noun",
  "meaning": "storyteller, oral historian, professional speaker",
  "pronunciation": "/ˈvestriros/"
 },
 {
  "word": "Vilagon",
  "pos": "verb",
  "meaning": "to be, to lie, to rest  somewhere (dative, or optionally genitive for a singular object directly before the verb)",
  "pronunciation": "/viˈlagon/"
 },
 {
  "word": "Yn",
  "pos": "noun",
  "meaning": "but, however; while, but while, even if; yet",
  "pronunciation": "/yn/"
 },
 {
  "word": "Zaldrīzerme",
  "pos": "noun",
  "meaning": "all-powerful, indestructible, invincible",
  "pronunciation": "/zaldriːˈzerme/"
 },
 {
  "word": "Zaldrīzes buzdari iksos daor",
  "pos": "phrase",
  "meaning": "A dragon is not a slave.",
  "pronunciation": "/zalˈdriːzes buzˈdari ˈiksos daor/"
 },
 {
  "word": "Zdēmagon",
  "pos": "noun",
  "meaning": "(of things) to sit",
  "pronunciation": "/ˈzdeːmagon/"
 },
 {
  "word": "Zgiēñagon",
  "pos": "verb",
  "meaning": "to heal, to be healed, to become healed, to become healthy",
  "pronunciation": "/ˈzgieːɲagon/"
 },
 {
  "word": "Ziry",
  "pos": "noun",
  "meaning": "she, he, it; her, him; third-person singular lunar/solar personal pronoun, nominative/accusative case",
  "pronunciation": "/ˈziry/"
 },
 {
  "word": "Zokla",
  "pos": "noun",
  "meaning": "wolf",
  "pronunciation": "/ˈzokla/"
 },
 {
  "word": "Zoklītsos",
  "pos": "noun",
  "meaning": "little wolf",
  "pronunciation": "/zoˈkliːtsos/"
 },
 {
  "word": "Zubon",
  "pos": "noun",
  "meaning": "garlic",
  "pronunciation": "/ˈzubon/"
 },
 {
  "word": "Zāeres",
  "pos": "noun",
  "meaning": "crystal, gem",
  "pronunciation": "/ˈzaːeres/"
 },
 {
  "word": "Zākenka",
  "pos": "noun",
  "meaning": "fresh",
  "pronunciation": "/zaːˈkeŋka/"
 },
 {
  "word": "Zākon",
  "pos": "noun",
  "meaning": "mint",
  "pronunciation": "/ˈzaːkon/"
 },
 {
  "word": "Ñaka",
  "pos": "noun",
  "meaning": "brain",
  "pronunciation": "/ˈɲaka/"
 },
 {
  "word": "Ñallie",
  "pos": "adjective",
  "meaning": "twelfth (12th)",
  "pronunciation": "/ˈɲallie/"
 },
 {
  "word": "Ñelliapos",
  "pos": "noun",
  "meaning": "surface",
  "pronunciation": "/ˈɲelliapos/"
 },
 {
  "word": "Ñellyr",
  "pos": "noun",
  "meaning": "skin, flesh",
  "pronunciation": "/ˈɲellyr/"
 },
 {
  "word": "Ñuho prūmiā iksā",
  "pos": "phrase",
  "meaning": "You are in my heart.",
  "pronunciation": "/ˈɲuho ˈpruːmiaː ˈiksaː/"
 },
 {
  "word": "Ñuqenka",
  "pos": "noun",
  "meaning": "dirty",
  "pronunciation": "/ɲuˈqeŋka/"
 },
 {
  "word": "Ñuqir",
  "pos": "noun",
  "meaning": "ash, ashes, cinder",
  "pronunciation": "/ˈɲuqir/"
 },
 {
  "word": "Ñurion",
  "pos": "noun",
  "meaning": "flour",
  "pronunciation": "/ˈɲurion/"
 },
 {
  "word": "Ābrar",
  "pos": "noun",
  "meaning": "humanity, all people; life; fertility",
  "pronunciation": "/ˈaːbrar/"
 },
 {
  "word": "Ābrenka",
  "pos": "noun",
  "meaning": "female",
  "pronunciation": "/aːˈbreŋka/"
 },
 {
  "word": "Ābrāzma",
  "pos": "noun",
  "meaning": "lady",
  "pronunciation": "/aːˈbraːzma/"
 },
 {
  "word": "Āeksion",
  "pos": "noun",
  "meaning": "gold",
  "pronunciation": "/ˈaːeksion/"
 },
 {
  "word": "Āganna",
  "pos": "noun",
  "meaning": "hood",
  "pronunciation": "/aːˈganna/"
 },
 {
  "word": "Āgugon",
  "pos": "verb",
  "meaning": "to swallow, to gulp",
  "pronunciation": "/ˈaːgugon/"
 },
 {
  "word": "Āhibnītsos",
  "pos": "noun",
  "meaning": "test",
  "pronunciation": "/aːhibˈniːtsos/"
 },
 {
  "word": "Ēdrulion",
  "pos": "noun",
  "meaning": "dreamland",
  "pronunciation": "/ˈeːdrulion/"
 },
 {
  "word": "Ēdrunon",
  "pos": "noun",
  "meaning": "sleep",
  "pronunciation": "/ˈeːdrunon/"
 },
 {
  "word": "Ēlie",
  "pos": "adjective",
  "meaning": "first (1st); primary",
  "pronunciation": "/ˈeːlie/"
 },
 {
  "word": "Ēlio ono gō",
  "pos": "phrase",
  "meaning": "ages ago, long ago (literally \"before the first dawn\")",
  "pronunciation": "/ˈeːlio ˈono goː/"
 },
 {
  "word": "Īby",
  "pos": "noun",
  "meaning": "bone",
  "pronunciation": "/ˈiːby/"
 },
 {
  "word": "Īlinon",
  "pos": "noun",
  "meaning": "crossing (in general); cross (the geometric figure); cross (reified, where someone is crucified)",
  "pronunciation": "/ˈiːlinon/"
 },
 {
  "word": "Ōdres",
  "pos": "noun",
  "meaning": "pain; damage",
  "pronunciation": "/ˈoːdres/"
 },
 {
  "word": "Ōghrar",
  "pos": "noun",
  "meaning": "hair",
  "pronunciation": "/ˈoːɣrar/"
 },
 {
  "word": "Ōregon",
  "pos": "verb",
  "meaning": "to hold",
  "pronunciation": "/ˈoːregon/"
 },
 {
  "word": "Ūbrie",
  "pos": "noun",
  "meaning": "ripe, mature, ready (to be used)",
  "pronunciation": "/ˈuːbrie/"
 },
 {
  "word": "Ūbryr",
  "pos": "noun",
  "meaning": "flora, plantlife, plants (in general)",
  "pronunciation": "/ˈuːbryr/"
 },
 {
  "word": "Ūliapos",
  "pos": "noun",
  "meaning": "key",
  "pronunciation": "/ˈuːliapos/"
 },
 {
  "word": "Ȳdrajos",
  "pos": "noun",
  "meaning": "speaker (of a language)",
  "pronunciation": "/ˈyːdraɟos/"
 }
];

const SITE = "https://highvalyriantranslators.com";
const DICT_URL = SITE + "/high-valyrian-dictionary/";

function norm(s) {
  return (s || "")
    .toLowerCase()
    .normalize("NFD")
    .replace(/[̀-ͯ]/g, "")
    .replace(/[^a-z0-9 ]/g, " ")
    .replace(/\s+/g, " ")
    .trim();
}

const ENTRIES = dictionary.map((e) => ({
  ...e,
  _w: norm(e.word),
  _m: norm(e.meaning),
}));

function fmt(e) {
  return `${e.word} (${e.pos}) — ${e.meaning} — pronounced ${e.pronunciation}`;
}

function search(query, limit = 5) {
  const q = norm(query);
  if (!q) return [];
  const exact = ENTRIES.filter((e) => e._w === q || e._m === q);
  const starts = ENTRIES.filter(
    (e) => e._w.startsWith(q) || e._m.startsWith(q)
  );
  const contains = ENTRIES.filter(
    (e) => e._w.includes(q) || e._m.includes(q)
  );
  const STOP = new Set(["with", "want", "what", "this", "that", "have", "from", "your", "please", "extra", "some", "about"]);
  const words = q.split(" ").filter((w) => !STOP.has(w));
  const token = ENTRIES.filter((e) =>
    words.some((w) => w.length > 3 && (e._w.includes(w) || e._m.includes(w)))
  );
  const seen = new Set();
  const out = [];
  for (const list of [exact, starts, contains, token]) {
    for (const e of list) {
      if (!seen.has(e.word)) {
        seen.add(e.word);
        out.push(e);
      }
      if (out.length >= limit) return out;
    }
  }
  return out;
}

const TOOLS = [
  {
    name: "lookup_word",
    title: "Look up a High Valyrian word",
    description:
      "Look up a word in the attested High Valyrian dictionary from highvalyriantranslators.com. Accepts a High Valyrian word or an English meaning and returns matching entries with part of speech, meaning and pronunciation. Only real attested entries are returned; nothing is invented.",
    inputSchema: {
      type: "object",
      properties: {
        query: {
          type: "string",
          description: "A High Valyrian word (e.g. 'zaldrīzes') or an English meaning (e.g. 'dragon', 'wolf', 'fire').",
        },
      },
      required: ["query"],
      additionalProperties: false,
    },
    annotations: { readOnlyHint: true, destructiveHint: false, openWorldHint: false },
  },
  {
    name: "lookup_phrase",
    title: "Look up an attested High Valyrian phrase",
    description:
      "Look up a famous attested High Valyrian phrase such as 'Valar morghulis' or its English meaning such as 'all men must die'. Only phrases attested in the dictionary are returned. If a phrase is not attested, the tool says so honestly and offers the closest attested words instead of inventing a translation.",
    inputSchema: {
      type: "object",
      properties: {
        query: {
          type: "string",
          description: "A High Valyrian phrase or its English meaning.",
        },
      },
      required: ["query"],
      additionalProperties: false,
    },
    annotations: { readOnlyHint: true, destructiveHint: false, openWorldHint: false },
  },
  {
    name: "word_of_the_day",
    title: "High Valyrian word of the day",
    description:
      "Returns one real High Valyrian dictionary word for today (deterministic by date), with its meaning and pronunciation.",
    inputSchema: { type: "object", properties: {}, additionalProperties: false },
    annotations: { readOnlyHint: true, destructiveHint: false, openWorldHint: false },
  },
];

function toolResult(text, structured) {
  const r = { content: [{ type: "text", text }] };
  if (structured) r.structuredContent = structured;
  return r;
}

function callTool(name, args) {
  if (name === "lookup_word") {
    let hits = search(args?.query || "", 5).filter((e) => e.pos !== "phrase");
    if (!hits.length) {
      // e.g. "zaldrīzes" (dragon) is attested as the head of a famous phrase
      const q = norm(args?.query || "");
      hits = ENTRIES.filter((e) => e.pos === "phrase" && e._w.startsWith(q)).slice(0, 3);
    }
    if (!hits.length) {
      return toolResult(
        `No attested dictionary entry found for "${args?.query || ""}". This dictionary only contains real, attested High Valyrian words, so nothing was invented. Browse the full dictionary: ${DICT_URL}`,
        { found: false, query: args?.query || "" }
      );
    }
    return toolResult(
      hits.map(fmt).join("\n") + `\nSource: High Valyrian Dictionary — ${DICT_URL}`,
      { found: true, results: hits.map(({ word, pos, meaning, pronunciation }) => ({ word, pos, meaning, pronunciation })) }
    );
  }
  if (name === "lookup_phrase") {
    const hits = search(args?.query || "", 5).filter((e) => e.pos === "phrase");
    if (!hits.length) {
      const words = search(args?.query || "", 3).filter((e) => e.pos !== "phrase");
      const extra = words.length
        ? `\nClosest attested words:\n` + words.map(fmt).join("\n")
        : "";
      return toolResult(
        `"${args?.query || ""}" is not an attested phrase in the High Valyrian dictionary, so no translation was invented.${extra}\nSource: High Valyrian Dictionary — ${DICT_URL}`,
        { found: false, query: args?.query || "" }
      );
    }
    return toolResult(
      hits.map(fmt).join("\n") + `\nSource: High Valyrian Dictionary — ${DICT_URL}`,
      { found: true, results: hits.map(({ word, pos, meaning, pronunciation }) => ({ word, pos, meaning, pronunciation })) }
    );
  }
  if (name === "word_of_the_day") {
    const day = Math.floor(Date.now() / 86400000);
    const e = ENTRIES[day % ENTRIES.length];
    return toolResult(
      `High Valyrian word of the day: ${fmt(e)}\nLearn more: ${DICT_URL}`,
      { word: e.word, pos: e.pos, meaning: e.meaning, pronunciation: e.pronunciation }
    );
  }
  return null;
}

function handleMcp(body) {
  const { id, method, params } = body || {};
  const reply = (result) => ({ jsonrpc: "2.0", id, result });
  const error = (code, message) => ({ jsonrpc: "2.0", id, error: { code, message } });

  if (id === undefined || id === null) return null; // notification, no response

  switch (method) {
    case "initialize":
      return reply({
        protocolVersion: params?.protocolVersion || "2025-03-26",
        capabilities: { tools: {} },
        serverInfo: { name: "high-valyrian-translators", version: "1.0.0" },
      });
    case "ping":
      return reply({});
    case "tools/list":
      return reply({ tools: TOOLS });
    case "tools/call": {
      const out = callTool(params?.name, params?.arguments || {});
      if (!out) return error(-32602, `Unknown tool: ${params?.name}`);
      return reply(out);
    }
    default:
      return error(-32601, `Method not found: ${method}`);
  }
}

const SERVER_INFO = {
  name: "High Valyrian Translators",
  tools: TOOLS.map((t) => t.name),
  entries: ENTRIES.length,
};


export default {
  async fetch(request) {
    const url = new URL(request.url);

    if (url.pathname === "/" || url.pathname === "/health") {
      return Response.json({ ok: true, ...SERVER_INFO });
    }

    if (url.pathname === "/mcp") {
      if (request.method === "GET") {
        return Response.json({ ok: true, transport: "streamable-http", ...SERVER_INFO });
      }
      if (request.method !== "POST") {
        return new Response("Method Not Allowed", { status: 405 });
      }
      let body;
      try {
        body = await request.json();
      } catch {
        return Response.json(
          { jsonrpc: "2.0", id: null, error: { code: -32700, message: "Parse error" } },
          { status: 400 }
        );
      }
      const out = handleMcp(body);
      if (out === null) return new Response(null, { status: 202 });
      return Response.json(out);
    }

    return new Response("Not Found", { status: 404 });
  },
};
