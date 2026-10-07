import os
import pandas as pd


def validateParameter(title, expected, received):
    if expected != received:
        return "expected " + title + ": " + expected + " but received: " + received + '<br/>'
    return ''

class Validation:

    def __init__(self):
        pass

