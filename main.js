"use-strict";
/*
 * This file creates and starts the jsPsych timeline.
 *
 * This file creates the picture naming task
 */

let jsPsych = initJsPsych(
);

let redirection_info = {
    pp_id : null,
    second: "",
    pn_experiment: null,
    ld_experiment: null,
    search_params: null
};

/*
 * Uploads the data and forwards to the second experiment
 */
let end_screen = {
    type: jsPsychHtmlButtonResponse,
    stimulus: DEBRIEF_MESSAGE,
    choices: [],
    // trial_duration: DEBRIEF_MESSAGE_DURATION,
    on_load: function (){

        uil.saveData();

        let relpath = "./" + redirection_info.second
        let url = new URL(relpath, window.location.href);
        for (const [key, value] of redirection_info.search_params.entries()) {
            url.searchParams.set(key, value)
        }

        window.location.replace(url);
    },
};

function initExperiment(group) {
    redirection_info.second = group;
    console.log("second = ", group);

    // Data added to the output of all trials.
    jsPsych.data.addProperties({
        pp_id: redirection_info.pp_id,
    });

    redirection_info.search_params = new URLSearchParams(
        {
            second: group,
            pp_id:redirection_info.pp_id
        }
    );
    if ((new URL(location.href)).searchParams.has("short")) {
        redirection_info.search_params.set("short", true);
    }

    //////////////// timeline /////////////////////////////////

    let timeline = [];

    timeline.push(consent_procedure);
    
    // survey (survey.js)
    timeline.push(survey_procedure);

    timeline.push(end_screen);

    // Start jsPsych when running on a Desktop or Laptop style pc.
    uil.browser.rejectMobileOrTablet();
    jsPsych.run(timeline);
}


function main() {
    
    let current_url = new URL(window.location.href);
    // Capture global params
    let search_params = current_url.searchParams;
    let query_obj = Object.fromEntries(search_params.entries());

    redirection_info.pp_id = query_obj.pp_id;
    redirection_info.pn_experiment = new URL("pn", current_url);
    redirection_info.ld_experiment = new URL("ld", current_url);

    if (!redirection_info.pp_id) {
        throw new Error("No participant id present");
    }

    // Reject mobile devices
    uil.browser.rejectMobileOrTablet();

    // Make sure you've updated your key in globals.js
    uil.setAccessKey(ACCESS_KEY);
    uil.stopIfExperimentClosed();

    if (uil.isOnline()) {
        // Option 2: server side balancing:
        uil.session.start(ACCESS_KEY, (group_name) => {
            initExperiment(group_name);
        });
    }
    else {
        initExperiment(
            ["pn","ld"][Math.floor(Math.random()*2)]
        );
    }
}
