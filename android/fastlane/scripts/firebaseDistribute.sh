#!/bin/bash

# Read the firebase app ID from a file
FIREBASE_APP_ID=$(cat "$(dirname -- "$0")/firebaseAppID")

# Export the firebase app ID as an environment variable
export FIREBASE_APP_ID

# Export the service account file as an environment variable
export SERVICE_CREDENTIALS_FILE=scripts/android-service-firebase.json

cd "$(dirname -- "$0")/../.."

fastlane android deploy