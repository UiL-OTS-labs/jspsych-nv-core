////////////////
// SURVEY
///////////////

let repeat_survey = false;


class ParticipantInfo {
    _hand_pref = null;

    static LEFT = 0;
    static RIGHT = 1;
    static HAND_OPTIONS = new Set(
        [ParticipantInfo.RIGHT, ParticipantInfo.LEFT]
    );

    set hand_pref(value) {
        if (ParticipantInfo.HAND_OPTIONS.has(value))
            this._hand_pref = value;
        else {
            let msg = `Value "${value}" not in ParticipantInfo.HAND_OPTIONS`
            throw new RangeError(msg);
        }
    }

    get hand_pref() {
        return this._hand_pref;
    }
}

let participant_info = new ParticipantInfo();

let survey_1 = {
    type: IlsSurveyPlugin,
    fields: {
        birth_year: {label: 'Year of birth'},
        birth_month: {label: 'Month of birth'},
        native_language: {label: 'Native language', options: {ja: "Yes", nee: "No"}},
    },
	ok: "Correct",
	reviewPrompt: "Please check that the following information is correct:",
	cancel: "Change",
	exclusionPrompt: "Thank you for your interest in the experiment. Unfortunately, you do not meet the criteria and cannot participate.",
    html: `
    <h4>Please answer the following questions:</h4>
    <div style="text-align: left">
	<p>What is your year of birth? </p>
	<div>
            <input type="number" name="birth_year" required>
	</div>
	
	<p>What is your month of birth? </p>
	<div>
            <input type="number" name="birth_month" required>
	</div>
	
	<p>Is English or German your native language? </p>
	<div>
		<label><input type="radio" name="native_language" value="yes" required/>Yes</label>
        <label><input type="radio" name="native_language" value="no" required/>No</label>
	</div>
	
    <div style="margin: 20px">
        <button class="jspsych-btn">Continue</button>
    </div>
    `,
    exclusion: function(data) {
	// return true when participant should be excluded

        let currentYear = (new Date()).getFullYear();
        let age = currentYear - parseInt(data.birth_year, 10);

        // reject participants younger than 18
	if (age < 18) {
	    return true;
	}

        // reject participants older than 80
	if (age > 69) {
	    return true;
	}

	if (data.native_language == 'nee') {
	    return true;
	}
	
	if (data.education_level == 'nee') {
	    return true;
	}
	
	// accept participant otherwise
	return false
    }
}

let survey_2 = {
    type: IlsSurveyPlugin,
    fields: {
		dyslexia: {label: 'Dyslexia', options: {yes: "Yes", no: "No"}},
		handedness: {label: 'Left- or right-handed', options: {right: "Right-handed", left: "Left-handed"}},
		sex: {label: 'Gender', options: {male: "Man", female: "Woman", other: "Other", unspecified: "I would rather not say"}},
    },
	ok: "Correct",
	reviewPrompt: "Please check that the following information is correct:",
	cancel: "Change",
	exclusionPrompt: "Thank you for your interest in the experiment. Unfortunately, you do not meet the criteria and cannot participate.",
    exclusion: function(data) {
	// return true when participant should be excluded
	if (data.dyslexia == 'yes') {
	    return true;
	}
	// accept participant otherwise
	return false
    },
    html: `
    <div style="text-align: left">

	<p>Are you left or right-handed? 
        </p>
	<div>
	    <label><input type="radio" name="handedness" value="right" required/>Right-handed</label>
	    <label><input type="radio" name="handedness" value="left" required/>Left-handed</label>
	</div>

        <p>What is your gender?
        </p>
	<div>
	    <label><input type="radio" name="sex" value="male" required/>Man</label>
	    <label><input type="radio" name="sex" value="female" required/>Woman</label>
	    <label><input type="radio" name="sex" value="other" required/>Other</label>
	    <label><input type="radio" name="sex" value="unspecified" required/>I would rather not say</label>
	</div>

	<p>Do you have dyslexia? 
	</p>
	<div>
	    <label><input type="radio" name="dyslexia" value="yes" required/>Yes</label>
	    <label><input type="radio" name="dyslexia" value="no" required/>No</label>
	</div>
    </div>
    <div style="margin: 20px">
        <button class="jspsych-btn">Continue</button>
    </div>
    `,
    on_finish : function(data) {
        let response = data.response;
	if (data['handedness'] == 'left') {
	    participant_info.hand_pref = ParticipantInfo.LEFT;
	}
	else {
	    participant_info.hand_pref = ParticipantInfo.RIGHT;
	}
    }
}

let survey_procedure = {
    timeline: [
        survey_1,
        survey_2
    ],
};
