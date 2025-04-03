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

let start_screen = {
    type: jsPsychHtmlButtonResponse,
    stimulus: function(){
        return "<div class='instruction' >"                            +
               "<p>"                                                   +
                    `pn = ${redirection_info.pn_experiment}<br>`       +
                    `ld = ${redirection_info.ld_experiment}`           +
                "</p></div>";
    },
    choices: [OK_BUTTON_TEXT],
    response_ends_trial: true,
    on_finish : function(data) {
        if (typeof data.rt === "number") {
            data.rt = Math.round(data.rt);
        }
    }
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

        if (redirection_info.second == "pn")
            self.window.location.replace("./pn?" + redirection_info.search_params);
        else
            self.window.location.replace("./ld?" + redirection_info.search_params);
    },
};

function initExperiment(group) {
    redirection_info.second = group;

    // Data added to the output of all trials.
    jsPsych.data.addProperties({
        pp_id: redirection_info.pp_id
    });

    let search_params = new URLSearchParams({
        pp_id: redirection_info.pp_id,
        second: redirection_info.second
    });
    redirection_info.search_params = search_params

    //////////////// timeline /////////////////////////////////

    let timeline = [];

    // it's best practice to have *mouse click* user I/O first
    timeline.push(start_screen);

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
    let params = current_url.searchParams;
    let query_obj = Object.fromEntries(params.entries());

    redirection_info.pp_id = query_obj.pp_id;
    redirection_info.pn_experiment = new URL("pn", current_url);
    redirection_info.ld_experiment = new URL("ld", current_url);

    if (!redirection_info.pp_id) {
        throw new Error("No participant id present");
    }

    // // Make sure you've updated your key in globals.js
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
