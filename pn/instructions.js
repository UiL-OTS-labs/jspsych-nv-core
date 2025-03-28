/*
 * In this file the instructions are defined that are used throughout
 * the experiment.
 * Make sure when editing this file, the file is stored with
 * utf8 text encoding.
 */

// GENERIC TESTS/CHECKS
const GENERIC_CHECK = `
    <h3>To participate in this experiment, make sure you:</h3>
    <br>
    <ul>
    <li>Open this webpage on a laptop or desktop computer, <b>not</b> on a phone or tablet!</li>
    <li>Use <b>a working keyboard</b>.</li><li>⁠And have a <b>working mouse</b> and/or
    <b>a trackpad</b>.</li>
    </ul>
    <h3>Enable <i>full screen</i> before continuing!</h3>
    <br>
    <p>Click at the bottom of the page when you are ready to continue.</p>
    `;

const PRE_PRACTICE_INSTRUCTION =
    "<strong>Dear participant,</strong><br><br>"         +
    "Thank you for participating in this study."     +
    "<br><br>"                                          +

    "During this task, a word will appear on the screen, "     		+
    "and you have to decide whether this word exists in Dutch or not. " +
    "To do so, you need to press a key on your keyboard as quickly as you can. "         		    +
    "Each word will remain on the screen for 1500 ms (1.5 seconds). "            +
    "Before the main task, you will complete six practice trials. <br><br>" +

    "After clicking OK, place your index fingers "  +
    "on the keys you just set. "		    +

    "<ul>"                                              +
    "<li>Press <kbd>%correct_key%</kbd> for "     	+
    "<strong>Yes</strong>.</li>"                         +
    "<li>Press <kbd>%incorrect_key%</kbd> for "  	+
    "<strong>No</strong>.</li>"                        +
    "</ul>"                                             +

    "You can practice now first.<br><br>"                 +
    "<i>Click OK to start practicing.</i>"
    ;

const PREPARE_YES_KEY_PROMPT = `
    <strong>Place your index fingers on the correct keys!</strong>
    <br>
    <br>
    Press <kbd>%correct_key%</kbd> (<i>'Yes'</i>)
    to begin.
    `;

const PRE_TEST_INSTRUCTION =
    "End of the practice session.<br><br>"                 +
    "Click OK to begin the real experiment."
    ;

const DEBRIEF_MESSAGE = `
    <h1>End of the experiment</h1>
    <br>
    <br>
    <h2>Thank you for your participation!</h2>
    `;


const FEEDBACK_PREAMBLE = `
    <p>The experiment has now ended. <strong>Do not close the page yet.</strong></p>
    `;

const FEEDBACK_PROMPT = `
     Is there anything you would like to say about the experiment? If not, leave this field blank.
    `;

const BLOCK1_INSTRUCTION =
    "End of the practice part.<br>"
    "<br>"
    "Block 1 will start next. First you will have to name each "
    "object in one language and then in the other language. "
    "This procedure will be repeated twice. "
    "There is a pause in between languages.<br> "
    "<br>"
    "<i>Hit Enter when ready to proceed.</i>";

const INSTRUCTION_QUATER1=
   "Now switch to the other language as indicated by the flag";

const INSTRUCTION_QUATER2=
   "Now switch to the other language as indicated by the flag";

 const INSTRUCTION_QUATER3=
   "Now switch to the other language as indicated by the flag";
