#!/usr/bin/env bash

cd client && npm start &
node server/index.js

echo "Running client and server"