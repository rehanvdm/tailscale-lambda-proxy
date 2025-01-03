#!/bin/bash

npm run default
npm run compile
cp assets/lambda/tailscale-proxy/index.js lib/lambda/tailscale-proxy/index.js

# For this proxy package to be used in the -caller project
npm link
# npm run watch  # no watch run everytime a change is made because the above commands are not watched