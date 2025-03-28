"""Some utilities to help with generating code from the input data"""

from typing import Iterable
import json
import re
import argparse
import csv
import os
import sys

PathHint = str | bytes | os.PathLike


def read_file(fn: PathHint):
    """Reads csv file and extract relevant lines"""
    with open(fn) as input:
        reader = csv.DictReader(input, delimiter=",")
        return list(reader)


def print_test_items(items: list[dict]):
    """utility to print the test items"""
    for i in items:
        print(i)


def sanitize_input(
    rows: list[dict[str, str]], desired_keys: Iterable[str]
) -> list[dict]:
    """Returns a new list of trials, where the keys are only the desired keys
    other columns will be stripped from the input.

    Additionally, all keys will use lower casing
    """

    ret = [{k.lower(): row[k] for k in desired_keys} for row in rows]
    return ret


def rm_columns(items: Iterable[dict[str, str]], keys: list[str]) -> None:
    """removes the all the keys for each item in items"""
    for item in items:
        for key in keys:
            try:
                del item[key]
            except KeyError:  # key is already deleted, that's fine
                pass


def triallist_to_jsobjectlist(trials: list[dict[str, str]]) -> str:
    """Transforms a list of dicts to a javascript list with javascript
    objects
    """
    #                            1   2      3         4
    LEADING_VAR = re.compile('^(\t+)(")([a-zA-Z0-9]+)(")')

    def to_unquoted_key(mobj: re.Match) -> str:
        "Removes quotes from LEADING_VAR"
        return mobj.group(1) + mobj.group(3)

    jsonstr = json.dumps(trials, indent="\t", sort_keys=True)
    return re.sub(LEADING_VAR, to_unquoted_key, jsonstr)


def default_cmd_parser() -> argparse.ArgumentParser:
    parser = argparse.ArgumentParser(os.path.basename(sys.argv[0]))
    parser.add_argument("-o", "--output", type=str, help="The path to the output file")
    return parser
