#!/usr/bin/env python

import csv, json, argparse as ap

from bl1 import restruct_test_items

_PRAC_ITEM = "practice"
_BLOCKED = "blocked"
_MIXED = "mixed_voluntary"
_CUED = "mixed_cued"


_PRINT_ALL = False
_PRINT_PRACTICE = False
_PRINT_BLOCK1 = False
_PRINT_BLOCK2 = False
_PRINT_BLOCK3 = False


def proc_practice(nth_list: int, lines: list[dict[str, str]]) -> None:
    header = f"practice{nth_list} = " + json.dumps(lines, indent="\t", sort_keys=True)
    print(header)


def proc_block1(nth_list: int, lines: list[dict[str, str]]) -> None:
    lines = restruct_test_items(lines)
    header = f"block1_list{nth_list} = " + json.dumps(
        lines, indent="\t", sort_keys=True
    )
    print(header)


def proc_block23(nth_list: int, block_num: int, lines: list[dict[str, str]]) -> None:
    if block_num not in [2, 3]:
        raise ValueError("Blocknum must be 2 or 3")
    header = f"block{block_num}_list{nth_list} = " + json.dumps(
        lines, indent="\t", sort_keys=True
    )
    print(header)


def proces_csv(files: list[str]) -> None:
    for list_num, file in enumerate(files):
        with open(file, "r") as infile:
            nth_list = list_num + 1
            reader = csv.DictReader(infile)

            lines = [line for line in reader]  # fetch all lines

            prac_items = [line for line in lines if line["item_type"] == "practice"]
            test_items = [line for line in lines if line["item_type"] == "test"]

            # split lines in specific groups
            block1 = [line for line in test_items if line["condition"] == _BLOCKED]
            block2 = [line for line in test_items if line["condition"] == _MIXED]
            block3 = [line for line in test_items if line["condition"] == _CUED]

            if _PRINT_PRACTICE:
                proc_practice(nth_list, prac_items)
            if _PRINT_BLOCK1:
                proc_block1(nth_list, block1)
            if _PRINT_BLOCK2:
                proc_block23(nth_list, 2, block2)
            if _PRINT_BLOCK3:
                proc_block23(nth_list, 3, block3)


def main():
    cmd_parser = ap.ArgumentParser(
        description="Parse input csv's, the outcome of the csv's is printed to the output"
    )
    cmd_parser.add_argument("files", type=str, nargs="+")
    cmd_parser.add_argument("--prac", action="store_true", help="print practice items")
    cmd_parser.add_argument("--block1", action="store_true", help="print block1 items")
    cmd_parser.add_argument("--block2", action="store_true", help="print block2 items")
    cmd_parser.add_argument("--block3", action="store_true", help="print block3 items")
    cmd_parser.add_argument("--print-all", action="store_true", help="print all items")

    args = cmd_parser.parse_args()

    global _PRINT_ALL
    global _PRINT_BLOCK1
    global _PRINT_BLOCK2
    global _PRINT_BLOCK3
    global _PRINT_PRACTICE

    if args.prac or args.print_all:
        _PRINT_PRACTICE = True
    if args.block1 or args.print_all:
        _PRINT_BLOCK1 = True
    if args.block2 or args.print_all:
        _PRINT_BLOCK2 = True
    if args.block3 or args.print_all:
        _PRINT_BLOCK3 = True

    proces_csv(args.files)


if __name__ == "__main__":
    main()
