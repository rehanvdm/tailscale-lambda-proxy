#!/bin/bash

# Link the -extension project
npm uninstall tailscale-lambda-extension
npm link tailscale-lambda-extension

# For this proxy package to be used in the -caller project
npm link
npm run watch