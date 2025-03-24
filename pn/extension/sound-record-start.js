/*
 * When creating a trial with the SoundRecorderStart plugin, you start a recording.
 * When creating a trial with the SoundRecorderStop, you'll stop the recording
 * and the recorded audio is stored with this output.
 *
 * So when you want to record a fragment of the jspsych experiment, you'll
 * need to sandwich that part between a SoundRecorderStart and -Stop.
 *
 * In order to use this plugin, you'll need to enable the PnSoundRecorderExtension
 * and before the first SoundRecorderStart, you need to initialize the microphone
 * using a trial with type: jsPsychInitializeMicrophone
 */

/*
 * SoundRecorderStart
 */

const start_info = {
    name: "sound-recorder-start",
    parameters: {
    }
};

class SoundRecorderStart {
    
    constructor(jsPsych) {
        this.jsPsych = jsPsych;
    }

    trial(dp_element, trial_params, on_load) {
        this.extension = this.jsPsych.extensions.soundrecorder;
        console.assert(this.extension instanceof PnSoundRecorderExtension);

        // start next trial when recording is running
        this.extension.startRecording().then(this.jsPsych.finishTrial());
    }
};

SoundRecorderStart.info = start_info;

/*
 * SoundRecorderStop
 */

const stop_info = {
    name: "sound-recorder-stop",
    parameters: {
    }
};

class SoundRecorderStop {
    
    constructor(jsPsych) {
        this.jsPsych = jsPsych;
    }

    trial(dp_element, trial_params, on_load) {
        this.extension = this.jsPsych.extensions.soundrecorder;
        console.assert(this.extension instanceof PnSoundRecorderExtension);

        this.extension.stopRecording()
            .then((output) => {
                jsPsych.finishTrial({
                    base64_audio: output.audio,
                    codec_hint: output.codec_hint
                });
            });
    }
};

SoundRecorderStop.info = stop_info;

