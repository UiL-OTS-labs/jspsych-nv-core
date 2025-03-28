////////////////
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


function fixStimulusBlocks() {

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
        PRACTICE = block1_prac2;
    }
    else {
        BLOCK_1 = block1_test1; // see block1.js
        PRACTICE = block1_prac1;
    }

    BLOCK_2 = block2_test; // see block.js
    BLOCK_3 = block3_test; // see block.js
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
