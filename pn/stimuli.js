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

const CUE_EN1 = "pics/cues/EN1.png"
const CUE_EN2 = "pics/cues/EN1.png"
const CUE_NL1 = "pics/cues/EN1.png"
const CUE_NL2 = "pics/cues/EN1.png"

// const LISTS = [
//     "list1",
//     "list2"
// ];

const PRACTICE_LIST = [
	
];

let BLOCK_1 = [
    {
        cue: CUE_EN2,           // flag to cue desired response language
        cue_pic_cue : CUE_EN1,  // picture and cue stimulus.
        cue_pic_pic : "117",    // picture num in string format.
    },
];

let BLOCK_2 = [
    {
        pic: "351",
    },
];

let BLOCK_3 = [
    {
        cue: CUE_EN2,           // flag to cue desired response language
        cue_pic_cue : CUE_EN1,  // picture and cue stimulus.
        cue_pic_pic : "117",    // picture num in string format.
    }
]


// Add a second list of stimuli when required.
// const LIST_2 = [
// ...
// ]

const TEST_ITEMS = [
//    {list_name: LISTS[0], table: LIST_1}
];

class ParameterValidationKeyError extends Error {
    constructor(trial) {
        const set1 = ['pic'];
        const set2 = ['cue', 'cue_pic_pic', 'cue_pic_cue'];
        let message = `Trial params should contain ${set1} or ${set2} parameters. `
        message += `Keys given were ${trial}`;
        super(message);
        this.name = 'ParameterValidationKeyError';
    }
};


function validateStimuli(list) {
    let ret = true;

    function arrayEqual(a1, a2) {
        console.assert(Array.isArray(a1) && Array.isArray(a2))
        if (a1.length !== a2.length)
            return false;
        for (let i = 0; i < a1.length; i++) {
            if (a1[i] !== a2[i])
                return false
        }
        return true;
    }

    list.forEach(
        function(trial) {
            set1 = ['pic']
            set2 = ['cue', 'cue_pic_cue', 'cue_pic_pic'];

            if (arrayEqual(Object.keys(trial).sort(), set1)) {
                ;
            }
            else if (arrayEqual(Object.keys(trial).sort(), set2)) {
                ;
            }
            else {
                throw new ParameterValidationKeyError(Object.keys(trial).sort())
            }
        }
    );

    return true;
}

function validateAllStimuli() {
    if (!validateStimuli(BLOCK_1)) {
        console.error("Unable to validate stimuli of block 1");
        return false;
    }
    
    if (!validateStimuli(BLOCK_2)){
        console.error("Unable to validate stimuli of block 2");
        return false;
    }

    if (!validateStimuli(BLOCK_3)) {
        console.error("Unable to validate stimuli of block 3");
        return false;
    }

    return true;
}

// If there were two lists to choose from:

// const TEST_ITEMS = [
//     {list_name: LISTS[0], table: LIST_1},
//     {list_name: LISTS[1], table: LIST_2}
// ];

function getPracticeItems() {
    return {list_name : "practice", table : PRACTICE_LIST};
}

function createStimulusBlocks() {

    fixBlock(BLOCK_1);
    fixBlock(BLOCK_2);
    fixBlock(BLOCK_3);

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
