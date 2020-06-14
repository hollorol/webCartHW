#!/usr/bin/python3

import sys
import json
import csv


def convertCSVToJSON(csvFileName):
    res = []
    with open(csvFileName) as csvfile:
        diction = (csv.DictReader(csvfile))
        for row in diction:
            res.append(dict(row))
        print(json.dumps(res))

if __name__ == "__main__":
    if len(sys.argv) != 2:
        print("Please provide a csv file!")
    else:
        convertCSVToJSON(str(sys.argv[1]))
