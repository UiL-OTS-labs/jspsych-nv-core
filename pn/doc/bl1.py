#!/usr/bin/env python

import csv
import os
import json
import re
from typing import Iterable

PathHint = str | bytes | os.PathLike

FILES = ["exp_cond_blocked_list1.csv", "exp_cond_blocked_list2.csv"]


def print_test_items(items: list[dict]):
    for i in items:
        print(i)


def read_file(fn: PathHint):
    """Reads csv file and extract relevant lines"""
    with open(fn) as input:
        reader = csv.DictReader(input, delimiter=",")
        return list(reader)


def sanitize_input(rows: list[dict]) -> list[dict]:
    """Returns a new list columns from data that are not in the desired
    columns, also use lowercase keys
    """
    desired = ["item_type", "picture", "cue", "trial_type", "Part", "block"]

    ret = [{k.lower(): row[k] for k in desired} for row in rows]
    return ret


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


#                            1   2      3         4
LEADING_VAR = re.compile('^(\t+)(")([a-zA-Z0-9]+)(")')


def to_unquoted_key(mobj: re.Match) -> str:
    "Removes quotes from LEADING_VAR"
    return mobj.group(1) + mobj.group(3)


def rm_columns(items: Iterable[dict], keys: list[str]) -> None:
    """removes the all the keys for each item in items"""
    for item in items:
        for key in keys:
            try:
                del item[key]
            except KeyError:  # key is already deleted, that's fine
                pass


content = ""
for n, fn in enumerate(FILES):
    block = n + 1
    rows = read_file(fn)
    rows = sanitize_input(rows)
    prac_items = list(filter(lambda trial: trial["item_type"] == "practice", rows))
    test_items = list(filter(lambda trial: trial["item_type"] == "test", rows))
    restruct = restruct_test_items(test_items)

    rm_columns(restruct, ["part"])
    rm_columns(prac_items, ["part"])
    assert len(restruct) == 60
    assert len(restruct) == 60

    prac_var = (
        f"block1_prac{block} = "
        + json.dumps(prac_items, indent="\t", sort_keys=True)
        + ";\n\n"
    )
    test_var = (
        f"block1_test{block} = "
        + json.dumps(restruct, indent="\t", sort_keys=True)
        + ";\n\n"
    )

    content += prac_var + test_var
    re.sub(LEADING_VAR, to_unquoted_key, content)

print(content)
