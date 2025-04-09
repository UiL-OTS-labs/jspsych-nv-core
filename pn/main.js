"use strict";
/*
 * This file creates and starts the jsPsych timeline.
 *
 * This file creates the picture naming task
 */

// is init in initExperiment
let redirection_params = {
    current_url: null,
    search_params: null,
    do_ld: null
};

let jsPsych = initJsPsych(
    {
        exclusions: {
            min_width: MIN_WIDTH,
            min_height: MIN_HEIGHT
        },
        extensions : [
            {type: PnSoundRecorderExtension, params: {}},
        ],
    }
);

let start_screen_nl = {
    type: jsPsychHtmlButtonResponse,
    stimulus: function(){
        return "<div class='instruction' >" +
               "<p>" + PRE_PRACTICE_INSTRUCTION_NL + "</p></div>";
    },
    choices: [OK_BUTTON_TEXT],
    response_ends_trial: true,
    on_finish : function(data) {
        if (typeof data.rt === "number") {
            data.rt = Math.round(data.rt);
        }
    }
};

let start_screen_en = {
    type: jsPsychHtmlButtonResponse,
    stimulus: function(){
        return "<div class='instruction' >" +
               "<p>" + PRE_PRACTICE_INSTRUCTION_EN + "</p></div>";
    },
    choices: [OK_BUTTON_TEXT],
    response_ends_trial: true,
    on_finish : function(data) {
        if (typeof data.rt === "number") {
            data.rt = Math.round(data.rt);
        }
    }
};

function create_instruction(text, continue_keys=["Enter"]) {

    let stim =
        `<div class="instruction">
            ${text}
        </div>`;

    let inst = {
        type : jsPsychHtmlKeyboardResponse,
        choices: continue_keys,
        response_ends_trial : true,
        stimulus : stim,
        on_finish: function (data) {
            if (typeof(data.rt) === "number") {
                data.rt = Math.round(data.rt);
            }
        }
    }
    return inst;
}

// optional instructions to be presented in the first block

let instruction = {
    type: jsPsychHtmlButtonResponse,
    stimulus: jsPsych.timelineVariable("instruction"),
    response_ends_trial: true,
    choices: [OK_BUTTON_TEXT],
    on_finish : function(data) {
        if (typeof data.rt === "number") {
            data.rt = Math.round(data.rt);
        }
    }
}

let if_instruction = {
    timeline: [instruction],
    conditional_function: function() {
        let instruction = jsPsych.timelineVariable("instruction");
        return instruction ? true : false;
    }
}

// fixation cross

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
        let pic_name = jsPsych.timelineVariable('cue_pic');
        let alt = `Unable to load ${pic_name}`;
        return `<img src="${pic_name}" alt="${alt} class="stimulus" />`;
    },
    choices: "NO_KEYS",
    trial_duration : CUE_DUR,
}

let if_cue = {
    timeline: [cue],
    conditional_function: function () {
        let c = jsPsych.timelineVariable('cue_pic', true);
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

let trial_timeline = [
    if_instruction,
    fix,
    if_cue,
    if_solo_pic,
    if_cue_pic,
];

/*
 * Uploads the data and displays a message
 */
let end_screen = {
    type: jsPsychHtmlButtonResponse,
    stimulus: DEBRIEF_MESSAGE,
    choices: [],
    // trial_duration: DEBRIEF_MESSAGE_DURATION,
    on_load: function (){
        uil.saveData();
        if (redirection_params.do_ld) {
            let current_url = new URL (window.location.href);
            let new_url = new URL("../ld", current_url);
            for ([key, value] of current_url.searchParams.entries()) {
                new_url.searchParams.set(key, value);
            }
            window.location.replace(new_url);
        }
    },
    on_finish : function(data) {
        if (typeof data.rt === "number") {
            data.rt = Math.round(data.rt);
        }
    },
};


// (timeline) procedures //////////////////////////////////////////////////////////

let practice_procedure = {
    timeline: trial_timeline,
    timeline_variables: PRACTICE
};

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

function initExperiment() {

    fixStimulusBlocks();
    preload.images = getImageStimuli();

    let url = new URL(window.location.href);
    redirection_params.current_url = url;
    let params = new URLSearchParams(url.searchParams);
    redirection_params.search_params = params;

    if (params.get("second") == "pn") {
        redirection_params.do_ld = true;
    }
    else {
        redirection_params.do_ld = false;
    }
    
    // Data added to the output of all trials.
    jsPsych.data.addProperties({
        pp_id: params.get("pp_id"),
    });

    trial_procedure1.timeline_variables = BLOCK_1;
    trial_procedure2.timeline_variables = BLOCK_2;
    trial_procedure3.timeline_variables = BLOCK_3;

    //////////////// timeline /////////////////////////////////

    let timeline = [];
    
    timeline.push(preload);

    timeline.push(create_instruction(PRE_PRACTICE_INSTRUCTION_NL));
    timeline.push(create_instruction(PRE_PRACTICE_INSTRUCTION_EN));

    timeline.push({type:jsPsychInitializeMicrophone}); // make recording with mic work.

    // test/set audio level (sountest.js)
    timeline.push(maybe_test_audio);

    timeline.push(practice_procedure);

    timeline.push(create_instruction(BLOCK1_INSTRUCTION_NL));
    timeline.push(create_instruction(BLOCK1_INSTRUCTION_EN));
    
    timeline.push ({type: SoundRecorderStart}); 
    timeline.push(trial_procedure1);
    timeline.push ({type: SoundRecorderStop}); 
    
    timeline.push(create_instruction(BLOCK2_INSTRUCTION_NL));
    timeline.push(create_instruction(BLOCK2_INSTRUCTION_EN));

    timeline.push ({type: SoundRecorderStart}); 
    timeline.push(trial_procedure2);
    timeline.push ({type: SoundRecorderStop}); 
    
    timeline.push(create_instruction(BLOCK3_INSTRUCTION_NL));
    timeline.push(create_instruction(BLOCK3_INSTRUCTION_EN));

    timeline.push ({type: SoundRecorderStart}); 
    timeline.push(trial_procedure3);
    timeline.push ({type: SoundRecorderStop}); 

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
    setupStimulusBlocks();
    initExperiment(BLOCK_1, BLOCK_2, BLOCK_3);

     // Option 2: server side balancing:
     // uil.session.start(ACCESS_KEY, (group_name) => {
     //     let stimuli = findList(group_name);
     //     initExperiment(stimuli);
     // });
}
