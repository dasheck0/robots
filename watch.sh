#!/usr/bin/env bash

fswatch -o -r ./assets ./js index.html | xargs -n1 bash ./deliver.sh