/*
 * This file creates and starts the jsPsych timeline.
 * The sub parts/trials that represent the basic building blocks of the lexical
 * decision are in the file ld_trials.js.
 */

let redirection_params = {
    current_url: null,
    search_params: null,
    do_pn: null
};

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

let preload_audio = {
    type : jsPsychPreload,
    message : PRELOAD_MSG,
    audio : [...getAudioStimuli(), AUDIO_TEST_STIMULUS]
};

let maybe_preload_audio = {
    timeline : [preload_audio],
    conditional_function : experimentUsesAudio
}

let instruction_screen_practice = {
    type: jsPsychHtmlButtonResponse,
    stimulus: function(){
        let text = PRE_PRACTICE_INSTRUCTION;
        text = text.replace('%correct_key%', getWordKey());
        text = text.replace('%incorrect_key%', getNonWordKey());
        return "<div class='instruction' >" +
               "<p>" + text + "</p></div>";
    },
    choices: [OK_BUTTON_TEXT],
    response_ends_trial: true,
    on_finish : function(data) {
        if (typeof data.rt === "number") {
            data.rt = Math.round(data.rt);
        }
    }
};

let participant_keyboard_control_start = {
    type: jsPsychHtmlKeyboardResponse,
    stimulus: function(){
        let text = PREPARE_YES_KEY_PROMPT;
        text = text.replace('%correct_key%', getWordKey())
        return "<div class='instruction' >" +
               "<p>" + text + "</p></div>";
    },
    choices: function(){
        let choice = getWordKey();
        return [choice];
    },
    //trial_duration: 10000,
    trial_ends_after_response: true,
    post_trial_gap: 300,
    on_finish : function(data) {
        if (typeof data.rt === "number") {
            data.rt = Math.round(data.rt);
        }
    }
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

let feedback_screen = {
    type: jsPsychHtmlKeyboardResponse,
    stimulus: "<div class=stimulus>Please wait while we wrap up " +
              "this part of the experiment.</H1></div>",
    on_load: function() {
        function redirectOrContinue() {
            if (redirection_params.do_pn) {
                let new_url = new URL("../pn", redirection_params.current_url)
                for ([key, value] of redirection_params.search_params) {
                    new_url.searchParams.set(key, value);
                }
                window.location.replace(new_url);
            }
            else {
                jsPsych.finishTrial();
            }
        }
        uil.saveData(jsPsych.data.get().json(), ACCESS_KEY)
            .then(redirectOrContinue);
    },
};



let end_screen = {
    type: jsPsychHtmlButtonResponse,
    stimulus: DEBRIEF_MESSAGE,
    choices: [],
    trial_duration: DEBRIEF_MESSAGE_DURATION,
    on_finish : function(data) {
        if (typeof data.rt === "number") {
            data.rt = Math.round(data.rt);
        }
    },
};


let maybe_forward_mask = {
    timeline : [forward_mask],
    conditional_function : function () {
        let tvar = jsPsych.timelineVariable('forward_mask');
        return typeof tvar === "string" && tvar.length > 0;
    }
}

let maybe_visual_prime = {
    timeline : [visual_prime],
    conditional_function : function () {
        let tvar = jsPsych.timelineVariable('visual_prime');
        return typeof tvar === "string" && tvar.length > 0;
    }
}

let maybe_auditory_prime = {
    timeline : [auditory_prime],
    conditional_function : function () {
        let tvar = jsPsych.timelineVariable('auditory_prime');
        return typeof tvar === "string" && tvar.length > 0;
    }
}

let maybe_backward_mask = {
    timeline : [backward_mask],
    conditional_function : function () {
        let tvar = jsPsych.timelineVariable('backward_mask');
        return typeof tvar === "string" && tvar.length > 0;
    }
}

let maybe_visual_target = {
    timeline : [visual_target],
    conditional_function : function () {
        let tvar = jsPsych.timelineVariable('visual_target');
        return typeof tvar === "string" && tvar.length > 0;
    }
}

let maybe_auditory_target = {
    timeline : [auditory_target],
    conditional_function : function () {
        let tvar = jsPsych.timelineVariable('auditory_target');
        return typeof tvar === "string" && tvar.length > 0;
    }
}

let trial_timeline = [
    present_fixation,
    maybe_forward_mask,
    maybe_visual_prime,
    maybe_auditory_prime,
    maybe_backward_mask,
    maybe_visual_target,
    maybe_auditory_target
];

// (timeline) procedures //////////////////////////////////////////////////////////

let practice_procedure = {
    timeline: [...trial_timeline, present_feedback],
    timeline_variables: getPracticeItems().table,
    randomize_order: false,
};

let trial_procedure = {
    timeline: trial_timeline,
    timeline_variables: null
};

// regular JS functions

/**
 * Gets the key which pp use to respond it IS a word.
 * @return {string|*}
 */
function getWordKey()
{
    let url = new URL(window.location.href);
    let params = url.searchParams;
    // most people are right handed, so when we don't know choose that one
    if (params.get("hand") === "left")
        return KEYBOARD_DEFAULTS[chosen_keyboard].left_key;
    else
        return KEYBOARD_DEFAULTS[chosen_keyboard].right_key;
}

/**
 * Gets the key which pp use to respond it is NOT a word.
 * @return {string|*}
 */
function getNonWordKey()
{
    let url = new URL(window.location.href);
    let params = url.searchParams;
    if (params.get("hand") === "left")
        return KEYBOARD_DEFAULTS[chosen_keyboard].right_key;
    else
        return KEYBOARD_DEFAULTS[chosen_keyboard].left_key;
}

function initExperiment(stimuli) {

    let url = new URL(window.location.href);
    redirection_params.current_url = url;
    let params = new URLSearchParams(url.searchParams);
    redirection_params.search_params = params;

    if (params.get("second") == "ld") {
        redirection_params.do_pn = true;
    }
    else {
        redirection_params.do_pn = false;
    }

    validateAllStimuli();

    if (params.get("short") == "true") {
        shorten_stimulus_lists(stimuli);
    }

    console.log("The selected list is %s", stimuli.list_name);
    trial_procedure.timeline_variables = uil.randomization.randomShuffleConstraints(
        stimuli.table,
        {'item_type': MAX_SUCCEEDING_ITEMS_OF_TYPE},
        100
    );

    // Data added to the output of all trials.
    let subject_id = jsPsych.randomization.randomID(8);
    let list_name = stimuli.list_name;
    jsPsych.data.addProperties({
        subject: subject_id,
        pp_id: params.get("pp_id"),
        list: list_name,
    });

    //////////////// timeline /////////////////////////////////

    let timeline = [];

    // it's best practice to have *mouse click* user I/O first
    timeline.push(start_screen);

    timeline.push(maybe_preload_audio);

    // kb layout
    timeline.push(select_keyboard_layout);

    // kb important keys (keyboard.js)
    timeline.push(keyboard_set_key_left_procedure);
    timeline.push(keyboard_set_key_right_procedure);

    // test/set audio level (sountest.js)
    timeline.push(maybe_test_audio);

    // task instruction (with button)
    timeline.push(instruction_screen_practice);

    // a keyboard dominant hand configured key continue/prepare flow
    timeline.push(participant_keyboard_control_start);

    timeline.push(practice_procedure);
    timeline.push(well_done_screen);

    // and a new 'prepare for action' flow
    timeline.push(participant_keyboard_control_start);

    timeline.push(trial_procedure);

    timeline.push(feedback_screen);
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
    let stimuli = pickRandomList();
    initExperiment(stimuli);

     // Option 2: server side balancing:
     // uil.session.start(ACCESS_KEY, (group_name) => {
     //     let stimuli = findList(group_name);
     //     initExperiment(stimuli);
     // });
}
