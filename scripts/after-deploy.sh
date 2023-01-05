#!/bin/bash

REPOSITORY=/home/ubuntu/frontServer

cd $REPOSITORY

sudo pm2 desc front_server > /dev/null
RUNNING=$?

if [ "${RUNNING}" -ne 0 ]; then
  sudo pm2 serve build/ 3000 --name front_server
fi;