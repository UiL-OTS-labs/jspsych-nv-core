
// stores whether or not consent is given.
let g_consent_given = null;

/* CSS style for the consent form */
const CONSENT_HTML_STYLE_UU = `<style>
        body {
            background: rgb(246, 246, 246);
            font-family: "Open Sans","Frutiger",Helvetica,Arial,sans-serif;
            color: rgb(33, 37, 41);
            text-align: left;
        }

        p {
            line-height: 1.4; /* Override paragraph for better readability */
        }

        label {
            margin-bottom: 0;
        }

        h1, h2{
            font-size: 2rem;
        }

        h6 {
            font-size: 1.1rem;
        }

        /* Input styles */

        form > table th {
            padding-left: 10px;
            vertical-align: middle;
        }

        input, textarea, select {
            border-radius: 0;
            border: 1px solid #d7d7d7;
            padding: 5px 10px;
            line-height: 20px;
            font-size: 16px;
        }

        input[type=submit], input[type=button], button, .button, .jspsych-btn {
            background: #000;
            color: #fff;
            border: none;
            font-weight: bold;
            font-size: 15px;
            padding: 0 20px;
            line-height: 42px;
            width: auto;
            min-width: auto;
            cursor: pointer;
            display: inline-block;
            border-radius: 0;
        }

        input[type="checkbox"], input[type="radio"]
        {
            width: auto;
        }

        button[type=submit], input[type=submit], .button-colored {
            background: #ffcd00;
            color: #000000;
        }

        button[type=submit].button-black, input[type=submit].button-black {
            background: #000;
            color: #fff;
        }

        button a, .button a,
        button a:hover, .button a:hover,
        a.button, a.button:hover {
            color: #fff;
            text-decoration: none;
        }

        .button-colored a,
        .button-colored a:hover,
        a.button-colored,
        a.button-colored:hover {
            color: #000;
        }

        /* Table styles */
        table thead th {
            border-bottom: 1px solid #ccc;
        }

        table tfoot th {
            border-top: 1px solid #ccc;
        }

        table tbody tr:nth-of-type(odd) {
            background: #eee;
        }

        table tbody tr:hover {
            background: #ddd;
        }

        table tbody tr.no-background:hover, table tbody tr.no-background {
            background: transparent;
        }

        table tbody td, table thead th, table tfoot th {
            padding: 6px 5px;
        }

        /* Link styles */
        a {
            color: rgb(33, 37, 41);
            text-decoration: underline;
            transition: 0.2s ease color;
        }

        a:hover {
            transition: 0.2s ease color;
            color: rgb(85, 85, 95);
        }

        </style>
        `
const CONSENT_HTML = `
     <p><b>Welcome to the online experiment "Word Recognition and Language Switching in a Multilingual Context"</b></p>
	<div style="text-align: left">
	<p>Dear participant,</p>
	<p>Thank you for your interest in participating in this online experiment. The goal of this study is to gain new insights into how multilingual speakers recognize Dutch words and switch between Dutch and English.</p> 
	<p>We are Sofía Zarlenga and Mariia Ralko, Research Master students at Utrecht University and members of the research project “Getting to the CoRe” (Communicative Receptive Approach to Language Learning). This experiment is part of our thesis project and consists of two tasks: a word recognition task and a picture naming task. Together, both tasks take approximately 30 minutes to complete. Our supervisors are Prof. Dr. Rick de Graaff and Prof. Dr. Henriëtte de Swart. If you have any questions, you can contact us at s.l.zarlenga@uu.nl or r.degraaff@uu.nl.</p>
	<p>You can participate in this study if you meet the following criteria: you are at least 18 years old of age, your first language is not English or German, your level of English is C1/C2 and your level of Dutch is B2/C1 and if you do not have any language disorders, such as dyslexia. In addition, the following personal data will be collected: year and month of birth, gender and whether you are left or right- handed. Your answers and the speed of your answer will also be collected. All collected data will remain completely anonymous and securely stored on a server at Utrecht University for at least ten years. The data may be shared with other researchers in the future in compliance with ethical research standards. </p> 
	<p>Participation in this study is entirely voluntary. If you choose to participate, you can withdraw at any point during the experiment without providing a reason. If you decide to withdraw, no data will be stored. There are no negative consequences for choosing not to participate or for withdrawing from the study.</p>
	<p>Your participation is highly valued, and your contribution will help advance our understanding of multilingual language processing and the role of receptive skills in foreign language learning.</p>
	`
	
const DEBRIEF_MESSAGE_NO_CONSENT = `
    <h1>This is the end of the experiment.</h1><BR><BR>
    <h2>Thank you!</h2>
    `;
const DEBRIEF_MESSAGE_NO_CONSENT_DURATION = 3000;
const CONSENT_STATEMENT = `
    Yes, I have read and understood the information provided above, and I give consent for my answers to be used for scientific research.
    `;

const PROCEED_BUTTON_TEXT = "Continue";
const CONSENT_REFERENCE_NAME = 'consent';
const IF_REQUIRED_FEEDBACK_MESSAGE = `
        You must check the box next to '${CONSENT_STATEMENT}' in order to proceed to the experiment.
        `

let consent_block = {
    type: jsPsychSurveyMultiSelect,
    preamble: CONSENT_HTML_STYLE_UU + CONSENT_HTML,
    required_message: IF_REQUIRED_FEEDBACK_MESSAGE,
    questions: [
        {
            prompt: "",
            options: [CONSENT_STATEMENT],
            horizontal: true,
            required: false,
            
            name: CONSENT_REFERENCE_NAME
        }
    ],
	button_label: PROCEED_BUTTON_TEXT,
    on_finish: function(data){
        let consent_choices = data.response.consent;
        let consent_statement = consent_choices.find(
            element => {return element === CONSENT_STATEMENT}
        );
        g_consent_given = consent_statement === CONSENT_STATEMENT;
        if (typeof data.rt === 'number') {
            data.rt = Math.round(data.rt);
        }
    }
};

let no_consent_end_screen = {
    type: jsPsychHtmlButtonResponse,
    stimulus: DEBRIEF_MESSAGE_NO_CONSENT,
    choices: [],
    trial_duration: DEBRIEF_MESSAGE_NO_CONSENT_DURATION,
    on_finish: function (data){
        if (typeof data.rt === 'number') {
            data.rt = Math.round(data.rt);
        }
        jsPsych.endExperiment()
    }
};

let if_node_consent = {
    timeline: [no_consent_end_screen],
    conditional_function: function(data){
        if (g_consent_given){
            return false;
        } else {
            return true;
        }
    }
}

let consent_procedure = {
    timeline: [consent_block, if_node_consent]
}
