/*
 * This file creates and starts the jsPsych timeline.
 *
 * This file creates the picture naming task
 */

let jsPsych = initJsPsych(
    {
        exclusions: {
            min_width: MIN_WIDTH,
            min_height: MIN_HEIGHT
        }
    }
);

let start_screen = {
    type: jsPsychHtmlButtonResponse,
    stimulus: function(){
        return "<div class='instruction' >" +
               "<p>" + GENERIC_CHECK + "</p></div>";
    },
    choices: [OK_BUTTON_TEXT],
    response_ends_trial: true,
    on_finish : function(data) {
        if (typeof data.rt === "number") {
            data.rt = Math.round(data.rt);
        }
    }
};

let fix = {
    type: jsPsychHtmlKeyboardResponse,
    stimulus: function () {
        return "" +
            "<div class='stimulus'>\n" +
            "    <svg width=\"100\" height=\"100\">\n" +
            "       <line x1=\"0\" x2=\"100\" y1=\"50\" y2=\"50\" style=\"stroke:black;stroke-width:5\" />\n" +
            "       <line x1=\"50\" x2=\"50\" y1=\"0\" y2=\"100\" style=\"stroke:black;stroke-width:5\" />\n" +
            "    </svg>\n" +
            "</div>\n";
    },
    choices: "NO_KEYS",
    trial_duration: FIX_DUR,
    stimulus_duration: FIX_DUR,
};

/* ************ cue part of trial *************** */

let cue = {
    type: jsPsychHtmlKeyboardResponse,
    stimulus: function() {
        let pic_name = jsPsych.timelineVariable('cue');
        let alt = `Unable to load ${pic_name}`;
        return `<img src="${pic_name}" alt="${alt} class="stimulus" />`;
    },
    choices: "NO_KEYS",
    trial_duration : CUE_DUR,
}

let if_cue = {
    timeline: [cue],
    conditional_function: function () {
        let c = jsPsych.timelineVariable('cue', true);
        console.log("c = " + c);
        if (typeof c ==="string" && c.length > 0) {
            cue.cue = c;
            return true;
            console.log("c = " + c);
        }
        return false;
    },
}

/* *********************** cue and pic together *************** */

let cue_pic = {
    type: jsPsychAudioKeyboardResponse,
    choices: "NO_KEYS",
    stimulus: "sounds/beep.wav",
    prompt: function () {
        let cue = jsPsych.timelineVariable('cue_pic_cue');
        let pic = jsPsych.timelineVariable('cue_pic_pic');
        let prompt =
           `<div class="stimulus">
                <img src="${cue}" alt="oops"/>
            </div>
            <div class="stimulus">
                <img src="${pic}" alt="oops"/>
            </div>`;
        return prompt;
    },
    trial_duration: TRIAL_DUR,
    post_trial_gap: ITI_DUR,
};

let if_cue_pic = {
    timeline: [cue_pic],
    conditional_function: function() {
        let cue_pic_cue = jsPsych.timelineVariable('cue_pic_cue');
        let cue_pic_pic = jsPsych.timelineVariable('cue_pic_pic');
        return typeof cue_pic_cue === "string" && cue_pic_cue.length > 0 &&
               typeof cue_pic_pic === "string" && cue_pic_pic.length > 0;
    }
};

/* **************** only picture ***************** */

let solo_pic = {
    type: jsPsychAudioKeyboardResponse,
    choices: "NO_KEYS",
    stimulus: "sounds/beep.wav",
    prompt: function () {
        let pic = jsPsych.timelineVariable('pic');
        let prompt =
           `<div class="stimulus">
                <img src="${pic}" alt="oops"/>
            </div>`;
        return prompt;
    },
    trial_duration: TRIAL_DUR,
    post_trial_gap: ITI_DUR,
};

let if_solo_pic = {
    timeline: [solo_pic],
    conditional_function: function() {
        let pic = jsPsych.timelineVariable('pic');
        return typeof pic === "string" && pic.length > 0; 
    }
};

let preload = {
    type : jsPsychPreload,
    message : PRELOAD_MSG,
    on_start: function () {
        console.log(preload.images);
        console.log(preload.audio);
    },
    images: null, //[...getImageStimuli()], needs fixing first
    audio: [...getAudioStimuli()],
};

let well_done_screen = {
    type: jsPsychHtmlButtonResponse,
    stimulus: function(){
        return "<div class='instruction' >" +
            '<p>' + PRE_TEST_INSTRUCTION + '</p></div>';
    },
    choices: [OK_BUTTON_TEXT],
    response_ends_trial: true,
    data: { useful_data_flag: false },
    on_finish : function(data) {
        if (typeof data.rt === "number") {
            data.rt = Math.round(data.rt);
        }
    }
};

let end_screen = {
    type: jsPsychHtmlButtonResponse,
    // stimulus: DEBRIEF_MESSAGE,
    choices: [],
    // trial_duration: DEBRIEF_MESSAGE_DURATION,
    on_finish : function(data) {
        if (typeof data.rt === "number") {
            data.rt = Math.round(data.rt);
        }
    },
};

let trial_timeline = [
    fix,
    if_cue,
    if_solo_pic,
    if_cue_pic,
];

// (timeline) procedures //////////////////////////////////////////////////////////

// let practice_procedure = {
//     timeline: [...trial_timeline, present_feedback],
//     timeline_variables: getPracticeItems().table,
//     randomize_order: false,
// };

let trial_procedure1 = {
    timeline: trial_timeline,
    timeline_variables: null
};

let trial_procedure2 = {
    timeline: trial_timeline,
    timeline_variables: null
};

let trial_procedure3 = {
    timeline: trial_timeline,
    timeline_variables: null
};

function initExperiment(block1, block2, block3) {

    fixStimulusBlocks();
    validateAllStimuli();
    preload.images = getImageStimuli();

    console.log ("block1 = ", block1);
    console.log ("block2 = ", block2);
    console.log ("block3 = ", block3);

    trial_procedure1.timeline_variables = block1;
    trial_procedure2.timeline_variables = block2;
    trial_procedure3.timeline_variables = block3;

    // Data added to the output of all trials.
    let subject_id = jsPsych.randomization.randomID(8);
    jsPsych.data.addProperties({
        subject: subject_id,
    });

    //////////////// timeline /////////////////////////////////

    let timeline = [];

    // it's best practice to have *mouse click* user I/O first
    timeline.push(start_screen);

    timeline.push(preload);

    // // Informed consent (consent.js)
    // timeline.push(consent_procedure);

    // // survey (survey.js)
    // timeline.push(survey_procedure);

    // test/set audio level (sountest.js)
    // timeline.push(maybe_test_audio);

    // task instruction (with button)
    // timeline.push(instruction_screen_practice);

//    timeline.push(practice_procedure);
//    timeline.push(well_done_screen);

    timeline.push(trial_procedure1);
    timeline.push(trial_procedure2);
    timeline.push(trial_procedure3);

//     timeline.push(feedback_screen);
    timeline.push(end_screen);

    // Start jsPsych when running on a Desktop or Laptop style pc.
    uil.browser.rejectMobileOrTablet();
    jsPsych.run(timeline);
}


function main() {
    // Make sure you've updated your key in globals.js
    uil.setAccessKey(ACCESS_KEY);
    uil.stopIfExperimentClosed();

    // Option 1: client side balancing:
    // let stimuli = pickRandomList();
    initExperiment(BLOCK_1, BLOCK_2, BLOCK_3);

     // Option 2: server side balancing:
     // uil.session.start(ACCESS_KEY, (group_name) => {
     //     let stimuli = findList(group_name);
     //     initExperiment(stimuli);
     // });
}
