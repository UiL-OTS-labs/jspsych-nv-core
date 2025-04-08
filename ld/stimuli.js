"use strict";
////////////////
// STIMULI
///////////////

// Item types
const COGNATE_IDENTICAL = "COGNATE_IDENTICAL";
const COGNATE_NON_IDENTICAL = "COGNATE_NON_IDENTICAL";
const NON_COGNATE = "NON_COGNATE";
const PSEUDOWORD = "PSEUDOWORD";
const PRACTICE = "PRACTICE";
const LISTS = ["list1"];

// In case of more complex design, the above could be, for example:

// const LISTS = [
//     "list1",
//     "list2"
// ];

let PRACTICE_LIST = [
    {
        id: 193, 
        item_type: PRACTICE, 
        word: "woede",
        visual_target: "woede",
        expected_answer: 1
    },
	
	{
        id: 194, 
        item_type: PRACTICE, 
        word: "gemak",
        visual_target: "gemak",
        expected_answer: 1
    },
	
    {
        id: 195, 
        item_type: PRACTICE, 
        word: "schaar", 
        visual_target: "schaar",
        expected_answer: 1
    },
	{
        id: 196, 
        item_type: PRACTICE, 
        word: "lepenten",
        visual_target: "lepenten",
        expected_answer: 0
    },
	
	{
        id: 197, 
        item_type: PRACTICE, 
        word: "kapsuft",
        visual_target: "kapsuft",
        expected_answer: 0
    },
	
	{
        id: 198, 
        item_type: PRACTICE, 
        word: "lokeers",
        visual_target: "lokeers",
        expected_answer: 0
    }
];

let LIST_1 = [
    {
        id: 1, 
        item_type: COGNATE_IDENTICAL, 
        word: "accent", 
		visual_target: "accent",
        expected_answer: 1
    },
	{
        id: 2, 
        item_type: COGNATE_IDENTICAL, 
        word: "alarm", 
		visual_target: "alarm",
        expected_answer: 1
    },
	{
        id: 3, 
        item_type: COGNATE_IDENTICAL, 
        word: "bus", 
		visual_target: "bus",
        expected_answer: 1
    },
	{
        id: 4, 
        item_type: COGNATE_IDENTICAL, 
        word: "campus", 
		visual_target: "campus",
        expected_answer: 1
    },
	{
        id: 5, 
        item_type: COGNATE_IDENTICAL, 
        word: "chaos", 
		visual_target: "chaos",
        expected_answer: 1
    },
	{
        id: 6, 
        item_type: COGNATE_IDENTICAL, 
        word: "circus", 
		visual_target: "circus",
        expected_answer: 1
    },
	{
        id: 7, 
        item_type: COGNATE_IDENTICAL, 
        word: "code", 
		visual_target: "code",
        expected_answer: 1
    },
	{
        id: 8, 
        item_type: COGNATE_IDENTICAL, 
        word: "concept", 
		visual_target: "concept",
        expected_answer: 1
    },
	{
        id: 9, 
        item_type: COGNATE_IDENTICAL, 
        word: "contact", 
		visual_target: "contact",
        expected_answer: 1
    },
	{
        id: 10, 
        item_type: COGNATE_IDENTICAL, 
        word: "crisis", 
		visual_target: "crisis",
        expected_answer: 1
    },
	{
        id: 11, 
        item_type: COGNATE_IDENTICAL, 
        word: "detail", 
		visual_target: "detail",
        expected_answer: 1
    },
	{
        id: 12, 
        item_type: COGNATE_IDENTICAL, 
        word: "hand", 
		visual_target: "hand",
        expected_answer: 1
    },
	{
        id: 13, 
        item_type: COGNATE_IDENTICAL, 
        word: "lamp", 
		visual_target: "lamp",
        expected_answer: 1
    },
	{
        id: 14, 
        item_type: COGNATE_IDENTICAL, 
        word: "lens", 
		visual_target: "lens",
        expected_answer: 1
    },
	{
        id: 15, 
        item_type: COGNATE_IDENTICAL, 
        word: "lip", 
		visual_target: "lip",
        expected_answer: 1
    },
	{
        id: 16, 
        item_type: COGNATE_IDENTICAL, 
        word: "model", 
		visual_target: "model",
        expected_answer: 1
    },
	{
        id: 17, 
        item_type: COGNATE_IDENTICAL, 
        word: "moment", 
		visual_target: "moment",
        expected_answer: 1
    },
	{
        id: 18, 
        item_type: COGNATE_IDENTICAL, 
        word: "nest", 
		visual_target: "nest",
        expected_answer: 1
    },
	{
        id: 19, 
        item_type: COGNATE_IDENTICAL, 
        word: "pen", 
		visual_target: "pen",
        expected_answer: 1
    },
	{
        id: 20, 
        item_type: COGNATE_IDENTICAL, 
        word: "plan", 
		visual_target: "plan",
        expected_answer: 1
    },
	{
        id: 21, 
        item_type: COGNATE_IDENTICAL, 
        word: "storm", 
		visual_target: "storm",
        expected_answer: 1
    },
	{
        id: 22, 
        item_type: COGNATE_IDENTICAL, 
        word: "test", 
		visual_target: "test",
        expected_answer: 1
    },
	{
        id: 23, 
        item_type: COGNATE_IDENTICAL, 
        word: "type", 
		visual_target: "type",
        expected_answer: 1
    },
	{
        id: 24, 
        item_type: COGNATE_IDENTICAL, 
        word: "wild", 
		visual_target: "wild",
        expected_answer: 1
    },
	{
        id: 25, 
        item_type: COGNATE_NON_IDENTICAL, 
        word: "actie", 
		visual_target: "actie",
        expected_answer: 1
    },
	{
        id: 26, 
        item_type: COGNATE_NON_IDENTICAL, 
        word: "advies", 
		visual_target: "advies",
        expected_answer: 1
    },
	{
        id: 27, 
        item_type: COGNATE_NON_IDENTICAL, 
        word: "boek", 
		visual_target: "boek",
        expected_answer: 1
    },
	{
        id: 28, 
        item_type: COGNATE_NON_IDENTICAL, 
        word: "dans", 
		visual_target: "dans",
        expected_answer: 1
    },
	{
        id: 29, 
        item_type: COGNATE_NON_IDENTICAL, 
        word: "debat", 
		visual_target: "debat",
        expected_answer: 1
    },
	{
        id: 30, 
        item_type: COGNATE_NON_IDENTICAL, 
        word: "domein", 
		visual_target: "domein",
        expected_answer: 1
    },
	{
        id: 31, 
        item_type: COGNATE_NON_IDENTICAL, 
        word: "eind", 
		visual_target: "eind",
        expected_answer: 1
    },
	{
        id: 32, 
        item_type: COGNATE_NON_IDENTICAL, 
        word: "grond", 
		visual_target: "grond",
        expected_answer: 1
    },
	{
        id: 33, 
        item_type: COGNATE_NON_IDENTICAL, 
        word: "hart", 
		visual_target: "hart",
        expected_answer: 1
    },
	{
        id: 34, 
        item_type: COGNATE_NON_IDENTICAL, 
        word: "klimaat", 
		visual_target: "klimaat",
        expected_answer: 1
    },
	{
        id: 35, 
        item_type: COGNATE_NON_IDENTICAL, 
        word: "koffie", 
		visual_target: "koffie",
        expected_answer: 1
    },
	{
        id: 36, 
        item_type: COGNATE_NON_IDENTICAL, 
        word: "leider", 
		visual_target: "leider",
        expected_answer: 1
    },
	{
        id: 37, 
        item_type: COGNATE_NON_IDENTICAL, 
        word: "motief", 
		visual_target: "motief",
        expected_answer: 1
    },
	{
        id: 38, 
        item_type: COGNATE_NON_IDENTICAL, 
        word: "nek", 
		visual_target: "nek",
        expected_answer: 1
    },
	{
        id: 39, 
        item_type: COGNATE_NON_IDENTICAL, 
        word: "paniek", 
		visual_target: "paniek",
        expected_answer: 1
    },
	{
        id: 40, 
        item_type: COGNATE_NON_IDENTICAL, 
        word: "peper", 
		visual_target: "peper",
        expected_answer: 1
    },
	{
        id: 41, 
        item_type: COGNATE_NON_IDENTICAL, 
        word: "pijp", 
		visual_target: "pijp",
        expected_answer: 1
    },
	{
        id: 42, 
        item_type: COGNATE_NON_IDENTICAL, 
        word: "prijs", 
		visual_target: "prijs",
        expected_answer: 1
    },
	{
        id: 43, 
        item_type: COGNATE_NON_IDENTICAL, 
        word: "publiek", 
		visual_target: "publiek",
        expected_answer: 1
    },
	{
        id: 44, 
        item_type: COGNATE_NON_IDENTICAL, 
        word: "soep", 
		visual_target: "soep",
        expected_answer: 1
    },
	{
        id: 45, 
        item_type: COGNATE_NON_IDENTICAL, 
        word: "sok", 
		visual_target: "sok",
        expected_answer: 1
    },
	{
        id: 46, 
        item_type: COGNATE_NON_IDENTICAL, 
        word: "tong", 
		visual_target: "tong",
        expected_answer: 1
    },
	{
        id: 47, 
        item_type: COGNATE_NON_IDENTICAL, 
        word: "totaal", 
		visual_target: "totaal",
        expected_answer: 1
    },
	{
        id: 48, 
        item_type: COGNATE_NON_IDENTICAL, 
        word: "vinger", 
		visual_target: "vinger",
        expected_answer: 1
    },
	{
        id: 49, 
        item_type: NON_COGNATE, 
        word: "afval", 
		visual_target: "afval",
        expected_answer: 1
    },
	{
        id: 50, 
        item_type: NON_COGNATE, 
        word: "bot", 
		visual_target: "bot",
        expected_answer: 1
    },
	{
        id: 51, 
        item_type: NON_COGNATE, 
        word: "doel", 
		visual_target: "doel",
        expected_answer: 1
    },
	{
        id: 52, 
        item_type: NON_COGNATE, 
        word: "doos", 
		visual_target: "doos",
        expected_answer: 1
    },
	{
        id: 53, 
        item_type: NON_COGNATE, 
        word: "dun", 
		visual_target: "dun",
        expected_answer: 1
    },
	{
        id: 54, 
        item_type: NON_COGNATE, 
        word: "eerlijk", 
		visual_target: "eerlijk",
        expected_answer: 1
    },
	{
        id: 55, 
        item_type: NON_COGNATE, 
        word: "fakkel", 
		visual_target: "fakkel",
        expected_answer: 1
    },
	{
        id: 56, 
        item_type: NON_COGNATE, 
        word: "gedicht", 
		visual_target: "gedicht",
        expected_answer: 1
    },
	{
        id: 57, 
        item_type: NON_COGNATE, 
        word: "gevaar", 
		visual_target: "gevaar",
        expected_answer: 1
    },
	{
        id: 58, 
        item_type: NON_COGNATE, 
        word: "geweer", 
		visual_target: "geweer",
        expected_answer: 1
    },
	{
        id: 59, 
        item_type: NON_COGNATE, 
        word: "grap", 
		visual_target: "grap",
        expected_answer: 1
    },
	{
        id: 60, 
        item_type: NON_COGNATE, 
        word: "haai", 
		visual_target: "haai",
        expected_answer: 1
    },
	{
        id: 61, 
        item_type: NON_COGNATE, 
        word: "heilig", 
		visual_target: "heilig",
        expected_answer: 1
    },
	{
        id: 62, 
        item_type: NON_COGNATE, 
        word: "hout", 
		visual_target: "hout",
        expected_answer: 1
    },
	{
        id: 63, 
        item_type: NON_COGNATE, 
        word: "huid", 
		visual_target: "huid",
        expected_answer: 1
    },
	{
        id: 64, 
        item_type: NON_COGNATE, 
        word: "huur", 
		visual_target: "huur",
        expected_answer: 1
    },
	{
        id: 65, 
        item_type: NON_COGNATE, 
        word: "jammer", 
		visual_target: "jammer",
        expected_answer: 1
    },
	{
        id: 66, 
        item_type: NON_COGNATE, 
        word: "jas", 
		visual_target: "jas",
        expected_answer: 1
    },
	{
        id: 67, 
        item_type: NON_COGNATE, 
        word: "jurk", 
		visual_target: "jurk",
        expected_answer: 1
    },
	{
        id: 68, 
        item_type: NON_COGNATE, 
        word: "kogel", 
		visual_target: "kogel",
        expected_answer: 1
    },
	{
        id: 69, 
        item_type: NON_COGNATE, 
        word: "konijn", 
		visual_target: "konijn",
        expected_answer: 1
    },
	{
        id: 70, 
        item_type: NON_COGNATE , 
        word: "kooi", 
		visual_target: "kooi",
        expected_answer: 1
    },
	{
        id: 71, 
        item_type: NON_COGNATE, 
        word: "koorts", 
		visual_target: "koorts",
        expected_answer: 1
    },
	{
        id: 72, 
        item_type: NON_COGNATE, 
        word: "kruid", 
		visual_target: "kruid",
        expected_answer: 1
    },
	{
        id: 73, 
        item_type: NON_COGNATE, 
        word: "kunst", 
		visual_target: "kunst",
        expected_answer: 1
    },
	{
        id: 74, 
        item_type: NON_COGNATE, 
        word: "lawaai", 
		visual_target: "lawaai",
        expected_answer: 1
    },
	{
        id: 75, 
        item_type: NON_COGNATE, 
        word: "leger", 
		visual_target: "leger",
        expected_answer: 1
    },
	{
        id: 76, 
        item_type: NON_COGNATE, 
        word: "lied", 
		visual_target: "lied",
        expected_answer: 1
    },
	{
        id: 77, 
        item_type: NON_COGNATE, 
        word: "lijm", 
		visual_target: "lijm",
        expected_answer: 1
    },
	{
        id: 78, 
        item_type: NON_COGNATE, 
        word: "lucht", 
		visual_target: "lucht",
        expected_answer: 1
    },
	{
        id: 79, 
        item_type: NON_COGNATE, 
        word: "mier", 
		visual_target: "mier",
        expected_answer: 1
    },
	{
        id: 80, 
        item_type: NON_COGNATE, 
        word: "moeras", 
		visual_target: "moeras",
        expected_answer: 1
    },
	{
        id: 81, 
        item_type: NON_COGNATE, 
        word: "muur", 
		visual_target: "muur",
        expected_answer: 1
    },
	{
        id: 82, 
        item_type: NON_COGNATE, 
        word: "oorlog", 
		visual_target: "oorlog",
        expected_answer: 1
    },
	{
        id: 83, 
        item_type: NON_COGNATE, 
        word: "plicht", 
		visual_target: "plicht",
        expected_answer: 1
    },
	{
        id: 84, 
        item_type: NON_COGNATE, 
        word: "ridder", 
		visual_target: "ridder",
        expected_answer: 1
    },
	{
        id: 85, 
        item_type: NON_COGNATE, 
        word: "saai", 
		visual_target: "saais",
        expected_answer: 1
    },
	{
        id: 86, 
        item_type: NON_COGNATE, 
        word: "smaak", 
		visual_target: "smaak",
        expected_answer: 1
    },
	{
        id: 87, 
        item_type: NON_COGNATE, 
        word: "spiegel", 
		visual_target: "spiegel",
        expected_answer: 1
    },
	{
        id: 88, 
        item_type: NON_COGNATE, 
        word: "steeg", 
		visual_target: "steeg",
        expected_answer: 1
    },
	{
        id: 89, 
        item_type: NON_COGNATE, 
        word: "tas", 
		visual_target: "tas",
        expected_answer: 1
    },
	{
        id: 90, 
        item_type: NON_COGNATE, 
        word: "touw", 
		visual_target: "touw",
        expected_answer: 1
    },
	{
        id: 91, 
        item_type: NON_COGNATE, 
        word: "twijfel", 
		visual_target: "twijfel",
        expected_answer: 1
    },
	{
        id: 92, 
        item_type: NON_COGNATE, 
        word: "verdrag", 
		visual_target: "verdrag",
        expected_answer: 1
    },
	{
        id: 93, 
        item_type: NON_COGNATE, 
        word: "vloek", 
		visual_target: "vloek",
        expected_answer: 1
    },
	{
        id: 94, 
        item_type: NON_COGNATE, 
        word: "vogel", 
		visual_target: "vogel",
        expected_answer: 1
    },
	{
        id: 95, 
        item_type: NON_COGNATE, 
        word: "wreed", 
		visual_target: "wreed",
        expected_answer: 1
    },
	{
        id: 96, 
        item_type: NON_COGNATE, 
        word: "zout", 
		visual_target: "zout",
        expected_answer: 1
    },
	{
        id: 97, 
        item_type: PSEUDOWORD, 
        word: "abes", 
		visual_target: "abes",
        expected_answer: 0
    },
	{
        id: 98, 
        item_type: PSEUDOWORD, 
        word: "aden", 
		visual_target: "aden",
        expected_answer: 0
    },
	{
        id: 99, 
        item_type: PSEUDOWORD, 
        word: "bege", 
		visual_target: "bege",
        expected_answer: 0
    },
	{
        id: 100, 
        item_type: PSEUDOWORD, 
        word: "betaden", 
		visual_target: "betaden",
        expected_answer: 0
    },
	{
        id: 101, 
        item_type: PSEUDOWORD, 
        word: "bewist", 
		visual_target: "bewist",
        expected_answer: 0
    },
	{
        id: 102, 
        item_type: PSEUDOWORD, 
        word: "bieke", 
		visual_target: "bieke",
        expected_answer: 0
    },
	{
        id: 103, 
        item_type: PSEUDOWORD, 
        word: "bloffel", 
		visual_target: "bloffel",
        expected_answer: 0
    },
	{
        id: 104, 
        item_type: PSEUDOWORD, 
        word: "bolp", 
		visual_target: "bolp",
        expected_answer: 0
    },
	{
        id: 105, 
        item_type: PSEUDOWORD, 
        word: "brunts", 
		visual_target: "brunts",
        expected_answer: 0
    },
	{
        id: 106, 
        item_type: PSEUDOWORD, 
        word: "cek", 
		visual_target: "cek",
        expected_answer: 0
    },
	{
        id: 107, 
        item_type: PSEUDOWORD, 
        word: "comvol", 
		visual_target: "comvol",
        expected_answer: 0
    },
	{
        id: 108, 
        item_type: PSEUDOWORD, 
        word: "coub", 
		visual_target: "coub",
        expected_answer: 0
    },
	{
        id: 109, 
        item_type: PSEUDOWORD, 
        word: "dede", 
		visual_target: "dede",
        expected_answer: 0
    },
	{
        id: 110, 
        item_type: PSEUDOWORD, 
        word: "deek", 
		visual_target: "deek",
        expected_answer: 0
    },
	{
        id: 111, 
        item_type: PSEUDOWORD, 
        word: "deulen", 
		visual_target: "deulen",
        expected_answer: 0
    },
	{
        id: 112, 
        item_type: PSEUDOWORD, 
        word: "eemp", 
		visual_target: "eemp",
        expected_answer: 0
    },
	{
        id: 113, 
        item_type: PSEUDOWORD, 
        word: "etan", 
		visual_target: "etan",
        expected_answer: 0
    },
	{
        id: 114, 
        item_type: PSEUDOWORD, 
        word: "frof", 
		visual_target: "frof",
        expected_answer: 0
    },
	{
        id: 115, 
        item_type: PSEUDOWORD, 
        word: "funtje", 
		visual_target: "funtje",
        expected_answer: 0
    },
	{
        id: 116, 
        item_type: PSEUDOWORD, 
        word: "garp", 
		visual_target: "garp",
        expected_answer: 0
    },
	{
        id: 117, 
        item_type: PSEUDOWORD, 
        word: "gebra", 
		visual_target: "gebra",
        expected_answer: 0
    },
	{
        id: 118, 
        item_type: PSEUDOWORD, 
        word: "gentels", 
		visual_target: "gentels",
        expected_answer: 0
    },
	{
        id: 119, 
        item_type: PSEUDOWORD, 
        word: "gergen", 
		visual_target: "gergen",
        expected_answer: 0
    },
	{
        id: 120, 
        item_type: PSEUDOWORD, 
        word: "gik", 
		visual_target: "gik",
        expected_answer: 0
    },
	{
        id: 121, 
        item_type: PSEUDOWORD, 
        word: "glusje", 
		visual_target: "glusje",
        expected_answer: 0
    },
	{
        id: 122, 
        item_type: PSEUDOWORD, 
        word: "goerig", 
		visual_target: "goerig",
        expected_answer: 0
    },
	{
        id: 123, 
        item_type: PSEUDOWORD, 
        word: "hagie", 
		visual_target: "hagie",
        expected_answer: 0
    },
	{
        id: 124, 
        item_type: PSEUDOWORD, 
        word: "hutter", 
		visual_target: "hutter",
        expected_answer: 0
    },
	{
        id: 125, 
        item_type: PSEUDOWORD, 
        word: "iget", 
		visual_target: "iget",
        expected_answer: 0
    },
	{
        id: 126, 
        item_type: PSEUDOWORD, 
        word: "ijzetje", 
		visual_target: "ijzetje",
        expected_answer: 0
    },
	{
        id: 127, 
        item_type: PSEUDOWORD, 
        word: "jom", 
		visual_target: "jom",
        expected_answer: 0
    },
	{
        id: 128, 
        item_type: PSEUDOWORD, 
        word: "jult", 
		visual_target: "jult",
        expected_answer: 0
    },
	{
        id: 129, 
        item_type: PSEUDOWORD, 
        word: "kand", 
		visual_target: "kand",
        expected_answer: 0
    },
	{
        id: 130, 
        item_type: PSEUDOWORD, 
        word: "kask", 
		visual_target: "kask",
        expected_answer: 0
    },
	{
        id: 131, 
        item_type: PSEUDOWORD, 
        word: "klagse", 
		visual_target: "klagse",
        expected_answer: 0
    },
	{
        id: 132, 
        item_type: PSEUDOWORD, 
        word: "klons", 
		visual_target: "klons",
        expected_answer: 0
    },
	{
        id: 133, 
        item_type: PSEUDOWORD, 
        word: "knoe", 
		visual_target: "knoe",
        expected_answer: 0
    },
	{
        id: 134, 
        item_type: PSEUDOWORD, 
        word: "kouf", 
		visual_target: "kouf",
        expected_answer: 0
    },
	{
        id: 135, 
        item_type: PSEUDOWORD, 
        word: "kreen", 
		visual_target: "kreen",
        expected_answer: 0
    },
	{
        id: 136, 
        item_type: PSEUDOWORD, 
        word: "kwagen", 
		visual_target: "kwagen",
        expected_answer: 0
    },
	{
        id: 137, 
        item_type: PSEUDOWORD, 
        word: "lits", 
		visual_target: "lits",
        expected_answer: 0
    },
	{
        id: 138, 
        item_type: PSEUDOWORD, 
        word: "makkel", 
		visual_target: "makkel",
        expected_answer: 0
    },
	{
        id: 139, 
        item_type: PSEUDOWORD, 
        word: "meus", 
		visual_target: "meus",
        expected_answer: 0
    },
	{
        id: 140, 
        item_type: PSEUDOWORD, 
        word: "mief", 
		visual_target: "mief",
        expected_answer: 0
    },
	{
        id: 141, 
        item_type: PSEUDOWORD, 
        word: "mustje", 
		visual_target: "mustje",
        expected_answer: 0
    },
	{
        id: 142, 
        item_type: PSEUDOWORD, 
        word: "muub", 
		visual_target: "muub",
        expected_answer: 0
    },
	{
        id: 143, 
        item_type: PSEUDOWORD, 
        word: "neek", 
		visual_target: "neek",
        expected_answer: 0
    },
	{
        id: 144, 
        item_type: PSEUDOWORD, 
        word: "nelf", 
		visual_target: "nelf",
        expected_answer: 0
    },
	{
        id: 145, 
        item_type: PSEUDOWORD, 
        word: "noef", 
		visual_target: "noef",
        expected_answer: 0
    },
	{
        id: 146, 
        item_type: PSEUDOWORD, 
        word: "oes", 
		visual_target: "oes",
        expected_answer: 0
    },
	{
        id: 147, 
        item_type: PSEUDOWORD, 
        word: "onwei", 
		visual_target: "onwei",
        expected_answer: 0
    },
	{
        id: 148, 
        item_type: PSEUDOWORD, 
        word: "opdas", 
		visual_target: "opdas",
        expected_answer: 0
    },
	{
        id: 149, 
        item_type: PSEUDOWORD, 
        word: "opdoer", 
		visual_target: "opdoer",
        expected_answer: 0
    },
	{
        id: 150, 
        item_type: PSEUDOWORD, 
        word: "opster", 
		visual_target: "opster",
        expected_answer: 0
    },
	{
        id: 151, 
        item_type: PSEUDOWORD, 
        word: "pieven", 
		visual_target: "pieven",
        expected_answer: 0
    },
	{
        id: 152, 
        item_type: PSEUDOWORD, 
        word: "pijden", 
		visual_target: "pijden",
        expected_answer: 0
    },
	{
        id: 153, 
        item_type: PSEUDOWORD, 
        word: "plap", 
		visual_target: "plap",
        expected_answer: 0
    },
	{
        id: 154, 
        item_type: PSEUDOWORD, 
        word: "podo", 
		visual_target: "podo",
        expected_answer: 0
    },
	{
        id: 155, 
        item_type: PSEUDOWORD, 
        word: "proes", 
		visual_target: "proes",
        expected_answer: 0
    },
	{
        id: 156, 
        item_type: PSEUDOWORD, 
        word: "prome", 
		visual_target: "prome",
        expected_answer: 0
    },
	{
        id: 157, 
        item_type: PSEUDOWORD, 
        word: "pubel", 
		visual_target: "pubel",
        expected_answer: 0
    },
	{
        id: 158, 
        item_type: PSEUDOWORD, 
        word: "punnen", 
		visual_target: "punnen",
        expected_answer: 0
    },
	{
        id: 159, 
        item_type: PSEUDOWORD, 
        word: "puttig", 
		visual_target: "puttig",
        expected_answer: 0
    },
	{
        id: 160, 
        item_type: PSEUDOWORD, 
        word: "putto", 
		visual_target: "putto",
        expected_answer: 0
    },
	{
        id: 161, 
        item_type: PSEUDOWORD, 
        word: "ran", 
		visual_target: "ran",
        expected_answer: 0
    },
	{
        id: 162, 
        item_type: PSEUDOWORD, 
        word: "ranzen", 
		visual_target: "ranzen",
        expected_answer: 0
    },
	{
        id: 163, 
        item_type: PSEUDOWORD, 
        word: "reffen", 
		visual_target: "reffen",
        expected_answer: 0
    },
	{
        id: 164, 
        item_type: PSEUDOWORD, 
        word: "releum", 
		visual_target: "releum",
        expected_answer: 0
    },
	{
        id: 165, 
        item_type: PSEUDOWORD, 
        word: "rolure", 
		visual_target: "rolure",
        expected_answer: 0
    },
	{
        id: 166, 
        item_type: PSEUDOWORD, 
        word: "sloen", 
		visual_target: "sloen",
        expected_answer: 0
    },
	{
        id: 167, 
        item_type: PSEUDOWORD, 
        word: "slopten", 
		visual_target: "slopten",
        expected_answer: 0
    },
	{
        id: 168, 
        item_type: PSEUDOWORD, 
        word: "sluto", 
		visual_target: "sluto",
        expected_answer: 0
    },
	{
        id: 169, 
        item_type: PSEUDOWORD, 
        word: "sneur", 
		visual_target: "sneur",
        expected_answer: 0
    },
	{
        id: 170, 
        item_type: PSEUDOWORD, 
        word: "snud", 
		visual_target: "snud",
        expected_answer: 0
    },
	{
        id: 171, 
        item_type: PSEUDOWORD, 
        word: "snuim", 
		visual_target: "snuim",
        expected_answer: 0
    },
	{
        id: 172, 
        item_type: PSEUDOWORD, 
        word: "strels", 
		visual_target: "strels",
        expected_answer: 0
    },
	{
        id: 173, 
        item_type: PSEUDOWORD, 
        word: "stuis", 
		visual_target: "stuis",
        expected_answer: 0
    },
	{
        id: 174, 
        item_type: PSEUDOWORD, 
        word: "tabod", 
		visual_target: "tabod",
        expected_answer: 0
    },
	{
        id: 175, 
        item_type: PSEUDOWORD, 
        word: "tachten", 
		visual_target: "tachten",
        expected_answer: 0
    },
	{
        id: 176, 
        item_type: PSEUDOWORD, 
        word: "tekken", 
		visual_target: "tekken",
        expected_answer: 0
    },
	{
        id: 177, 
        item_type: PSEUDOWORD, 
        word: "tull", 
		visual_target: "tull",
        expected_answer: 0
    },
	{
        id: 178, 
        item_type: PSEUDOWORD, 
        word: "vag", 
		visual_target: "vag",
        expected_answer: 0
    },
	{
        id: 179, 
        item_type: PSEUDOWORD, 
        word: "vand", 
		visual_target: "vand",
        expected_answer: 0
    },
	{
        id: 180, 
        item_type: PSEUDOWORD, 
        word: "vandje", 
		visual_target: "vandje",
        expected_answer: 0
    },
	{
        id: 181, 
        item_type: PSEUDOWORD, 
        word: "verijd", 
		visual_target: "verijd",
        expected_answer: 0
    },
	{
        id: 182, 
        item_type: PSEUDOWORD, 
        word: "verkijs", 
		visual_target: "verkijs",
        expected_answer: 0
    },
	{
        id: 183, 
        item_type: PSEUDOWORD, 
        word: "voekens", 
		visual_target: "voekens",
        expected_answer: 0
    },
	{
        id: 184, 
        item_type: PSEUDOWORD, 
        word: "vrias", 
		visual_target: "vrias",
        expected_answer: 0
    },
	{
        id: 185, 
        item_type: PSEUDOWORD, 
        word: "wef", 
		visual_target: "wef",
        expected_answer: 0
    },
	{
        id: 186, 
        item_type: PSEUDOWORD, 
        word: "wennig", 
		visual_target: "wennig",
        expected_answer: 0
    },
	{
        id: 187, 
        item_type: PSEUDOWORD, 
        word: "wrip", 
		visual_target: "wrip",
        expected_answer: 0
    },
	{
        id: 188, 
        item_type: PSEUDOWORD, 
        word: "zar", 
		visual_target: "zar",
        expected_answer: 0
    },
	{
        id: 189, 
        item_type: PSEUDOWORD, 
        word: "zats", 
		visual_target: "zats",
        expected_answer: 0
    },
	{
        id: 190, 
        item_type: PSEUDOWORD, 
        word: "ziks", 
		visual_target: "ziks",
        expected_answer: 0
    },
	{
        id: 191, 
        item_type: PSEUDOWORD, 
        word: "zol", 
		visual_target: "zol",
        expected_answer: 0
    },
	{
        id: 192, 
        item_type: PSEUDOWORD, 
        word: "zom", 
		visual_target: "zom",
        expected_answer: 0
    }
];


// Add a second list of stimuli when required.
// const LIST_2 = [
// ...
// ]

const TEST_ITEMS = [
    {list_name: LISTS[0], table: LIST_1}
];

// If there were two lists to choose from:

// const TEST_ITEMS = [
//     {list_name: LISTS[0], table: LIST_1},
//     {list_name: LISTS[1], table: LIST_2}
// ];

function getPracticeItems() {
    return {list_name : "practice", table : PRACTICE_LIST};
}

function pickRandomList() {
    let range = function (n) {
        let empty_array = [];
        let i;
        for (i = 0; i < n; i++) {
            empty_array.push(i);
        }
        return empty_array;
    }
    let num_lists = TEST_ITEMS.length;
    let shuffled_range = jsPsych.randomization.repeat(range(num_lists), 1)
    let retlist = TEST_ITEMS[shuffled_range[0]];
    return retlist
}

/**
 * Checks whether a stimulus contains precisely 1 target stimulus
 *
 * @param {object} trial
 *
 * @return {boolean}  true if the trial contains precisely one target.
 */
function containsOneTarget(trial) {
    let sum = 0;
    let has_visual =   typeof trial.visual_target === "string" &&
                       trial.visual_target.length > 0;
    let has_auditory = typeof trial.auditory_target === "string" &&
                       trial.auditory_target.length > 0;
    if (has_visual)
        sum += 1;
    if (has_auditory)
        sum += 1;
    return sum === 1;
}

/**
 * Checks whether the trial doesn't contain more than 1 prime.
 * @param trial
 * @return {boolean}
 */
function containsAtMostOnePrime(trial) {
    let sum = 0;
    let visprime = trial.visual_prime && trial.visual_prime.length > 0;
    let audprime = trial.auditory_prime && trial.auditory_prime.length > 0;
    if (visprime) {
        sum += 1;
    }
    if (audprime) {
        sum += 1;
    }
    return sum <= 1;
}

/**
 * Checks that when a mask is present there is also a visual prime.
 *
 * As it makes no sense to mask a prime that is not presented. And it
 * also makes no sense to visually mask an auditory prime.
 *
 * @param {object} trial
 * @return boolean.
 */
function masksVisualPrime(trial) {
    if ((trial.forward_mask && trial.forward_mask.length > 0) ||
        (trial.backward_mask && trial.backward_mask.length > 0)) {
        if (!trial.visual_prime || trial.visual_prime.length === 0)
            return false;
    }
    return true;
}

/**
 * Validates a list of stimuli.
 *
 * The list_name parameters is mostly used to ease the lookup of an invalid
 * items. The name is used together with the item id to print the violating
 * items.
 *
 * @param {[{}]} trials A list with trial parameters
 * @param {string} list_name The name of the list.
 *
 * @return {boolean} returns true when no errors are found, false otherwise
 */
function validateStimuli(trials, list_name) {
    let success = true;
    trials.forEach((trial) => {

        let stim_string =
            `The stimulus with id "${trial.id}" in list "${list_name} "`;

        if (!containsOneTarget(trial)) {
            console.error(stim_string + "does not contain precisely 1 target.");
            success = false;
        }
        if (!containsAtMostOnePrime(trial)) {
            console.error(stim_string + "does not contain at most 1 prime.");
            success = false;
        }
        if (!masksVisualPrime(trial)) {
            console.error(stim_string + "presents masks while no prime is present.");
            success = false;
        }
    });
    return success;
}

function validateAllStimuli() {
    let success = true;
    if (!validateStimuli(PRACTICE_LIST, "practice items")) {
        success = false;
    }
    for (let i = 0; i < TEST_ITEMS.length; i++) {
        let item = TEST_ITEMS[i];
        if (!validateStimuli(item.table, item.list_name))
            success = false;
    }
    return success;
}

function shorten_stimulus_lists(stimuli) {
    let short_prac = [
        PRACTICE_LIST[0],
        PRACTICE_LIST[1],
    ];
    PRACTICE_LIST = short_prac;
    
    let short_list1 = [
        stimuli.table[0],
        stimuli.table[1],
        stimuli.table[stimuli.table.length/2 + 0],
        stimuli.table[stimuli.table.length/2 + 1]
    ];
    stimuli.table = short_list1;
}

/**
 * Extracts all auditory stimuli from the trials.
 *
 * This function makes it somewhat easy to preload the auditory stimuli
 *
 * @return {string[]}
 */
function getAudioStimuli() {

    let audio_stimuli = [];

    let push_stimulus = function(trial) {
        if (typeof trial.auditory_target === "string") {
            audio_stimuli.push(trial.auditory_target);
        }
        if (typeof trial.auditory_prime === "string") {
            audio_stimuli.push(trial.auditory_prime);
        }
    }
    PRACTICE_LIST.forEach(push_stimulus);
    TEST_ITEMS.forEach((test_item) => {
        let trials = test_item.table;
        trials.forEach(push_stimulus);
    });
    return audio_stimuli;
}

/**
 * Returns whether this experiment has auditory stimuli
 *
 * @return {boolean} true when this experiment contains audio false otherwise
 */
function experimentUsesAudio() {
    return getAudioStimuli().length > 0;
}
