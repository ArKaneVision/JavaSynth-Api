#!/bin/bash

API="http://localhost:4741"
URL_PATH="/presets"

curl "${API}${URL_PATH}" \
  --include \
  --request POST \
  --header "Content-Type: application/json" \
  --header "Authorization: Bearer ${TOKEN}" \
  --data '{
    "preset": {
      "title": "'"${T}"'",
    "envelope": {
      "attack": "'"${A}"'",
      "decay": "'"${D}"'",
      "sustain": "'"${S}"'",
      "release": "'"${R}"'"
      }
    }
  }'

echo
