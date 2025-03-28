#!/usr/bin/env python

import utils
import typing
import sys


FILES = ["exp_cond_blocked_list1.csv", "exp_cond_blocked_list2.csv"]


def restruct_test_items(trials: list[dict]) -> list[dict]:
    """sort in blocks trials with part 1/3 goto block 1or3, 2/4 go to block
    2 and 4, the blocks are divided into 4 equal parts"""
    block13 = [t for t in trials if t["part"] == "1/3"]
    block24 = [t for t in trials if t["part"] == "2/4"]

    restruct = []
    restruct += block13[: len(block13) // 2]
    restruct += block24[: len(block24) // 2]
    restruct += block13[(len(block13) // 2) :]
    restruct += block24[(len(block24) // 2) :]

    return restruct


def generate_bl1(output: typing.TextIO):
    """Generates the output on the basis of the FILES"""
    content = ""
    desired_keys = ["item_type", "picture", "cue", "trial_type", "Part", "block"]

    for n, fn in enumerate(FILES):
        block = n + 1
        rows = utils.read_file(fn)
        rows = utils.sanitize_input(rows, desired_keys)
        prac_items = list(filter(lambda trial: trial["item_type"] == "practice", rows))
        test_items = list(filter(lambda trial: trial["item_type"] == "test", rows))
        restruct = restruct_test_items(test_items)

        utils.rm_columns(restruct, ["part"])
        utils.rm_columns(prac_items, ["part"])
        assert len(restruct) == 60
        assert len(restruct) == 60

        prac_var = (
            f"block1_prac{block} = "
            + utils.triallist_to_jsobjectlist(prac_items)
            + ";\n\n"
        )
        test_var = (
            f"block1_test{block} = "
            + utils.triallist_to_jsobjectlist(restruct)
            + ";\n\n"
        )

        content += prac_var + test_var

    print(content, file=output)


def main():
    args = utils.default_cmd_parser().parse_args()

    if args.output:
        with open(args.output, "w") as outfile:
            generate_bl1(outfile)
    else:
        generate_bl1(sys.stdout)


if __name__ == "__main__":
    main()
