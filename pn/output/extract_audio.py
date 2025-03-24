#!/usr/bin/env python3


import base64
import typing
import os
import json
import sys
import ffmpeg
import tempfile
from argparse import ArgumentParser

PathLike = typing.Union[str, bytes, os.PathLike]


def getJspychOutput(fn: PathLike) -> list[dict]:
    with open(fn, "r") as infile:
        jsonstr = infile.read()
        return json.loads(jsonstr)


def extract_audio_blocks(fn: PathLike, format: str):
    jsdata = getJspychOutput(fn)
    key = "base64_audio"
    audio_trials = list(filter(lambda trial: key in trial, jsdata))

    for i, trial in enumerate(audio_trials):
        print("decoding")
        base64str = trial[key]

        outname = f"audio_block{i+1}.{format}"

        # create temp decoded base64 trial
        with tempfile.NamedTemporaryFile() as tmpfile:
            tmpfile.write(base64.b64decode(base64str))
            tmpfile.flush()
            print(tmpfile.name)
            (ffmpeg.input(tmpfile.name).output(outname).run())


if __name__ == "__main__":
    parser = ArgumentParser(sys.argv[0])
    parser.add_argument(
        "files",
        type=str,
        nargs="+",
        help="The files from which to extract the audio",
    )
    parser.add_argument(
        "-f",
        "--format",
        type=str,
        choices=["wav", "mp3", "flac"],
        default="flac",
        help="The format to use for the output",
    )

    args = parser.parse_args()
    for file in args.files:
        extract_audio_blocks(file, args.format)
