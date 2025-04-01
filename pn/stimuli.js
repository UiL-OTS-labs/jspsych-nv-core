"use strict";

///////////////
// STIMULI
///////////////


const CUE_EN1 = "pics/cues/EN1.png"
const CUE_EN2 = "pics/cues/EN2.png"
const CUE_NL1 = "pics/cues/NL1.png"
const CUE_NL2 = "pics/cues/NL2.png"

// for preloading
const CUES = [CUE_EN1, CUE_EN2, CUE_NL1, CUE_NL2];

let PRACTICE = undefined;
let BLOCK_1 = undefined;
let BLOCK_2 = undefined;
let BLOCK_3 = undefined


/**
 * Fixes the stimulus names inside of the blocks.
 * The stimulus names in the table do not yet have
 * an appropriate path, this function fixes that.
 */
function _fixImageNames() {

    /**
     * Get the name of a stimulus
     * @param {string} name 
     * @returns {string} the resulting image name
     */
    function imgName(name) {
        return `pics/${name}.png`;
    }

    /**
     * Given cue "EN" or "NL"
     * 
     * Generate a name for the cue that is presented alone
     * 
     * @param {string} cue  must be EN or NL
     * @param {number} n 1 or 2
     * @returns {string} the resulting cue image name
     */
    function cueName(cue, n) {
        let valid = ["EN", "NL"]
        if (valid.indexOf(cue) < 0)
            throw Error(`Oops cue "${cue}" not in ${valid}`)
        return `pics/cues/${cue}${n}.png`
    }

    function fix(block) {
        block.forEach(
            (t) => {
                if (t.cue == "-")
                    t.cue = "";
                if (t.cue) {
                    t.cue_pic_cue = cueName(t.cue, 1);
                    t.cue_pic= cueName(t.cue, 2);
                }
                t.cue_pic_pic = imgName(t.picture);
            }
        );
    }

    fix(PRACTICE);
    fix(BLOCK_1);
    fix(BLOCK_2);
    fix(BLOCK_3);
}

function _setInstructionsBlock1() {
    // Don't put any other instructions here, because they
    // will be recored.
    BLOCK_1[BLOCK_1.length / 4 * 1].instruction = INSTRUCTION_QUATER1;
    BLOCK_1[BLOCK_1.length / 4 * 2].instruction = INSTRUCTION_QUATER2;
    BLOCK_1[BLOCK_1.length / 4 * 3].instruction = INSTRUCTION_QUATER3;
}

/**
 * Checks whether stimuli are not repeated within n trials
 * @param {Object[]} block 
 * @param {number} n
 * 
 * @returns {number} the index of the violating item or -1 when
 *                   no violating items are found
 */
function violates_constraints(block, n) {

    for (let i = n; i < block.length; i++) {
        let stim = block[i].picture;
        let problem = block.slice(i - n, i).find((key) => key.picture == stim);
        if (problem) {
            return i;
        }
    }

    return -1;
}

/**
 * shuffles the 4 quarters of the block until the constraints are met
 */
function _shuffleBlock1() {
    let quarter_len = BLOCK_1.length/4;
    let bl1_q2_start = Math.floor(quarter_len) * 1;
    let bl1_q3_start = Math.floor(quarter_len) * 2;
    let bl1_q4_start = Math.floor(quarter_len) * 3;

    let n = 0;
    let num_tries = 100;
    let n_non_adjacent = 10;

    do {
        shuffleRange(BLOCK_1, 0, bl1_q2_start);
        shuffleRange(BLOCK_1, bl1_q2_start, bl1_q3_start);
        shuffleRange(BLOCK_1, bl1_q3_start, bl1_q4_start);
        shuffleRange(BLOCK_1, bl1_q4_start, BLOCK_1.length);
        for (let i = 0; i < num_tries; i++) {
            let violate = violates_constraints(BLOCK_1, n_non_adjacent)
            let r = Math.floor(Math.random() * quarter_len)
            
            if (violate < 0) { // no violations/ were done:)
                break;
            }

            if (violate < quarter_len) {// violation in the first block
                r = r + quarter_len * 0;
                console.assert(r >= 0 && r < 15);
                console.assert(violate >= 0 && violate < 15);
                swap(BLOCK_1, violate, r);
            }
            else if (violate < quarter_len * 2) { // second
                r = r + quarter_len * 1;
                console.assert(r >= 15 && r < 30);
                console.assert(violate >= 15 && violate < 30);
                swap(BLOCK_1, violate, r);
            }
            else if (violate < quarter_len * 3) { // third
                r = r + quarter_len * 2;
                console.assert(r >= 30 && r < 45);
                console.assert(violate >= 30 && violate < 45);
                swap(BLOCK_1, violate, r);
            }
            else { //fourth
                r = r + quarter_len * 3;
                console.assert(r >= 45 && r < 60);
                console.assert(violate >= 45 && violate < 60);
                swap(BLOCK_1, violate, r);
            }
        }
        n++;
    } while (violates_constraints(BLOCK_1, n_non_adjacent) >= 0);
}

function _shuffleBlock2  () {
    let nth_try = 0;
    let n_non_adjacent = 10;
    let num_tries = 100;
    do {
        shuffleRange(BLOCK_2, 0, BLOCK_2.length);
        for (let i = 0; i < num_tries; i++) {
            let violate = violates_constraints(BLOCK_2, n_non_adjacent)
            let r = Math.floor(Math.random() * BLOCK_2.length)
            
            if (violate < 0) { // no violations/ were done:)
                break;
            }

            swap(BLOCK_2, violate, r);
        }
        nth_try++;
    } while (violates_constraints(BLOCK_2, n_non_adjacent) >= 0);
}

/**
 * construct_list3
 * 
 * Constructs a slice of the input block that is reordered.
 * 
 * The reordering is in such a way that the pattern below
 * is repeated. It could be the case that
 * 
 * cue              | EN EN NL NL EN EN NL NL ....
 * Same(S) Switch(O)| O  S  O  S  O  S  O  S  ....
 * 
 * 
 * @param {Object[]} block the block 
 * 
 * @returns {Object[]} slice of block
 */
function construct_list3(block) {

    let shallow = block.slice();
    let slice = []; // result
    let en_switch = []
    let en_same = []
    let nl_switch = []
    let nl_same = []

    shuffleRange(shallow, 0, shallow.length);

    let last = shallow.pop(); // start with a random item
    slice.push(last);

    // Put the other items in their appropriate bin
    do {
        let item = shallow.pop()
        if (item.cue == "EN" && item.trial_type == "switch")
            en_switch.push(item);
        else if (item.cue == "EN" && item.trial_type == "same")
            en_same.push(item);
        else if (item.cue == "NL" && item.trial_type == "switch")
            nl_switch.push(item);
        else if (item.cue == "NL" && item.trial_type == "same")
            nl_same.push(item);
        else
            console.assert(0 == 1); // shouldn't be reached.
    } while(shallow.length);

    // We've popped one random item and pushed that to the result
    console.assert(
        Math.abs(en_same.length - en_switch.length) <= 1 &&
        Math.abs(en_same.length - nl_switch.length) <= 1 &&
        Math.abs(en_same.length - nl_same.length) <= 1 &&
        Math.abs(en_same.length - block.length/4) <= 1
    );

    // pop an appropriate item and push it to the result
    /*
     * cue              | EN EN NL NL EN EN NL NL ....
     * Same(S) Switch(O)| O  S  O  S  O  S  O  S  ....
     */
    while (slice.length < block.length) {
        if (last.cue == "EN" && last.trial_type == "switch")
            last = en_same.pop();
        else if (last.cue == "EN" && last.trial_type == "same")
            last = nl_switch.pop();
        else if (last.cue == "NL" && last.trial_type == "switch")
            last = nl_same.pop();
        else if (last.cue == "NL" && last.trial_type == "same")
            last = en_switch.pop();
        else
            // Houston, we've got...
            console.assert(0 == 1);
        slice.push(last);
    }

    return slice;
}

function _shuffleBlock3() {

    let num_tries = 100;
    let block;
    let num_adjacent = 10;
    let i;
    const NUM_BLOCKS = 4;
    let violation;
    let nth_try = 0;

    do {
        block = construct_list3(BLOCK_3);
        nth_try++;

        for (i = 0; i < num_tries; i++) {

            violation = violates_constraints(block, num_adjacent);
            if (violation < 0)
                break;

            let remainder = violation % NUM_BLOCKS;
            let swap_item = Math.floor(Math.random() * block.length/NUM_BLOCKS) * NUM_BLOCKS + remainder;

            swap(block, swap_item, violation);
        }
    } while(violation >= 0)

    return block;
}

function fixStimulusBlocks() {
    _fixImageNames();
    _shuffleBlock1();
    _shuffleBlock2();
    _shuffleBlock3();
    _setInstructionsBlock1();
}

/**
 * Setup the blocks for use:
 *
 * @param {string} [first="dutch"] first should be "english" or "dutch"
 */
function setupStimulusBlocks(first="dutch") {

    /* sanitize input */
    if (!first) { // If you specify something falsish, you'll get dutch
        first = "dutch";
    }
    first = first.trim() 
    first = first.toLocaleLowerCase()

    first = first.toLowerCase();

    if (first === "english") {
        BLOCK_1 = block1_test2; // see block1.js
        PRACTICE = block1_prac2; // block1.js
        BLOCK_3 = block3_test2; // see block3.js
    }
    else {
        BLOCK_1 = block1_test1; // see block1.js
        PRACTICE = block1_prac1;// block2.js
        BLOCK_3 = block3_test1; // see block3.js
    }

    BLOCK_2 = block2_test; // see block2.js
}


/**
 * Extracts all auditory stimuli from the trials.
 *
 * This function makes it somewhat easy to preload the auditory stimuli
 *
 * @return {string[]}
 */
function getAudioStimuli() {

    let audio_stimuli = ["sounds/beep.wav", "sounds/sound_test.mp3"];

    return audio_stimuli;
}

/**
 * Extracts all image stimuli from the trials.
 *
 * This function makes it somewhat easy to preload the images
 *
 * @return {string[]}
 */
function getImageStimuli() {

    let image_stimuli = [];

    function extract_img_stimuli(tparams) {
        if (tparams.cue_pic)
            image_stimuli.push(tparams.cue_pic);
        if (tparams.cue_pic_cue)
            image_stimuli.push(tparams.cue_pic_cue);
        if (tparams.cue_pic_pic)
            image_stimuli.push(tparams.cue_pic_pic);
    }

    BLOCK_1.forEach(extract_img_stimuli);
    BLOCK_2.forEach(extract_img_stimuli);
    BLOCK_3.forEach(extract_img_stimuli);

    return Array.from(new Set(image_stimuli));
}

/**
 * Returns whether this experiment has auditory stimuli
 *
 * @return {boolean} true when this experiment contains audio false otherwise
 */
function experimentUsesAudio() {
    return getAudioStimuli().length > 0;
}
