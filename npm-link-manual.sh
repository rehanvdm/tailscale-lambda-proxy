#!/bin/bash

# For this proxy package to be used in the -caller project
npm link
# npm run watch  # won't work need to bundle then compile every , doing it manually
npm run default
npm run compile
cp assets/lambda/tailscale-proxy/index.js lib/lambda/tailscale-proxy/index.js