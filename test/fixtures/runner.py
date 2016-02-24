#!/usr/bin/env python
# coding: utf-8

"""Script to generate test data.

To run this script, navigate to the './test/fixtures' directory and run

$ python runner.py
"""

import numpy as np
import json


def gen(x, y, name):
    """Generate test data and write to file."""

    z = np.nextafter(x, y)

    out = {
        'x': x.tolist(),
        'expected': z.tolist()
    }

    with open(name, 'w') as f:
        json.dump(out, f)


#
x = np.linspace(0.0, 100.0, 200)
gen(x, 101.0, 'data.json')
