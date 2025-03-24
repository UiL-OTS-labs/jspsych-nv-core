
/*
 * This class is a rewrite of HtmlAudioResponsePlugin from jsPsych
 * see:
 * https://github.com/jspsych/jsPsych/blob/main/packages/plugin-html-audio-response/src/index.ts
 * 
 * That plugin is written with a single trial in mind. For the current
 * project it is desired to record a large number of trials, hence
 * the plugin is rewritten to operate in the background for a longer
 * time. When you call startRecording(), the recording start and when
 * you call: stopRecording(), you'll obtain the result.
 *
 * In the file are two plugins, one that starts the recording and one
 * that stops it and collects the result.
 */

/**
 * This callback is called when the base64 output of the extension is ready
 *
 * @callback dataReadyCallback
 * @param {string} result The base64 encoded output of the recorded audio string
 */

class PnSoundRecorderExtension {

    constructor(jsPsych) {
        this.jsPsych = jsPsych;
        /**
         * media recorder for the extension
         * @type {MediaRecorder}
         */
        this.recorder = null;
        this.recording = false;
        this.response = null;
        this.chunks = [];
    }

    initialize(params) {
        return new Promise(
            (resolve, reject) => {
                console.log(
                    `Initializing: ${PnSoundRecorderExtension.info.name}`
                );
                resolve();
            }
        );
    }

    start(params) {
        //
    }

    on_load(params) {
        // the page has loaded and the DOM is ready.
    }

    _reset() {
        if (this.recorder) {
            this.recorder.removeEventListener("start", this.handleStart);
            this.recorder.removeEventListener("dataavailable", this.handleAudioData);
            this.recorder.removeEventListener("stop", this.handleStop);
        }
        this.recorder = null;
        this.chunks.length = 0; // clear existing data.
    }

    startRecording() {
        console.log("start recording");
        this._reset();
        let promise = new Promise(
            (resolve, reject) => {
            this.resolveStart = resolve;
            this.recorder = this.jsPsych.pluginAPI.getMicrophoneRecorder();
            this._setupRecordingCallbacks(resolve, reject);
            this.recorder.start();
        });
        return promise;
    }

    /* 
     * stops the recording, waits for the "stop" event and returns the result
     * in the promise
     *
     * returns {Promise<Object>} the base64 encoded audio, the actual encoding
     * of the audio may depend on the platform...
     */
    stopRecording () {
        console.log("stopping recording");
        
        let promise = new Promise((resolve, reject) => {
                this.resolveStop = resolve;
                this.recorder.stop();
            }
        );

        return promise;
    }

    _setupRecordingCallbacks() {

        // Use arrow function to keep pointing this to this.

        // Handle incoming audio
        this.handleAudioData = (audio_blob) => {
            console.log("obtained audio data");
            if (audio_blob.data.size > 0)
                this.chunks.push(audio_blob.data);
        }
        this.recorder.addEventListener(
            'dataavailable', this.handleAudioData
        );

        // handle start of audio start. Make jsPsych continue by resolving the
        // start promise
        this.handleStart = () => {
            this.recording = true;
            this.resolveStart()
            this.resolveStart = undefined; // we should start only once per recording
        }

        this.recorder.addEventListener(
            'start',
            this.handleStart
        );

        // handles stop event
        this.handleStop = () => {
            console.log("handleStop called")
            const data = new Blob(this.chunks, {type: this.chunks[0].type});
            let audio_url = URL.createObjectURL(data);
            const reader = new FileReader();
            reader.addEventListener(
                'load',
                () => {
                    let codec_hint;
                    let base64
                    [codec_hint, base64] = reader.result.split(",")
                    this.response = base64;

                    // return the promise
                    this.resolveStop({audio: this.response, codec_hint: codec_hint});
                }
            );
            reader.readAsDataURL(data);
            this.recording = false;
        }
        this.recorder.addEventListener(
            'stop',
            this.handleStop
        );

    }

};

PnSoundRecorderExtension.info = {
    name: "soundrecorder",
};
