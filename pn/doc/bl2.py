#!/usr/bin/env python3

import utils
import typing
import sys


def generate_bl2(infile: str, outfile: typing.TextIO, blockno: int) -> None:
    if blockno not in [2, 3]:
        raise ValueError(f"Oops blockno {blockno} not in [2,3]")
    content = ""
    desired_keys = ["item_type", "picture", "cue", "trial_type", "block"]

    rows = utils.read_file(infile)
    rows = utils.sanitize_input(rows, desired_keys)
    if blockno == 2:
        assert len(rows) == 120
    elif blockno == 3:
        assert len(rows) == 60

    if blockno == 2:  # there are no cues
        for row in rows:
            row["cue"] = ""

    content = "\n"
    content += f"block{blockno}_test = " + utils.triallist_to_jsobjectlist(rows)

    print(content, file=outfile)


def main():
    """Generates block 2/3"""
    parser = utils.default_cmd_parser()
    parser.add_argument("input", type=str, help="the input file")
    parser.add_argument(
        "blockno", type=int, choices=[2, 3], help="the number of the block"
    )
    args = parser.parse_args()

    if args.output:
        with open(args.output, "w") as outfile:
            generate_bl2(args.input, outfile, args.blockno)
    else:
        generate_bl2(args.input, sys.stdout, args.blockno)


if __name__ == "__main__":
    main()
