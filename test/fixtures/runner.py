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
        'y': y.tolist(),
        'expected': z.tolist()
    }

    with open(name, 'w') as f:
        json.dump(out, f)


n = 500
r = np.random.random(n) - 0.5

# Normal values:
x = np.linspace(-100.0, 100.0, n)
y = np.ones(n)*1000.0
y[r < 0] *= -1
gen(x, y, 'normal.json')

# Negative subnormal values:
x = np.linspace(-1e-320, -1e-309, n)
y = np.zeros(n)
y[r < 0] = -1
gen(x, y, 'negative_subnormal.json')

# # Positive subnormal values:
x = np.linspace(1e-320, 1e-309, n)
y = np.zeros(n)
y[r > 0] = 1
gen(x, y, 'positive_subnormal.json')

# # Negative very large values:
x = np.linspace(-1e300, -1e307, n)
y = np.zeros(n)
y[r < 0] = -1e308
gen(x, y, 'negative_very_large.json')

# # Positive very large values:
x = np.linspace(1e300, 1e307, n)
y = np.zeros(n)
y[r > 0] = 1e308
gen(x, y, 'positive_very_large.json')

# Large values:
x = np.linspace(9007199254740091, 9007199254741891, n)
y = np.zeros(n)
y[r > 0] = 1e308
gen(x, y, 'positive_large.json')
