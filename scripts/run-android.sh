#!/usr/bin/env bash

SCRIPT_DIR=$( dirname "$0" )
PROJECT_DIR="$( dirname "$( cd "${SCRIPT_DIR}" && pwd )")"

for i in "$@"
do
case $i in
    -p|--prod)
        GOOGLE_SERVICE_FILE="prod.json"
        ENVIRONMENT_FILE=".env.prod"
        VARIANT="release"
      shift
      ;;
    -s|--staging)
        GOOGLE_SERVICE_FILE="dev.json"
        ENVIRONMENT_FILE=".env.staging"
        VARIANT="staging"
      shift
      ;;
    -d|--dev)
        GOOGLE_SERVICE_FILE="dev.json"
        ENVIRONMENT_FILE=".env.dev"
        VARIANT="debug"
      shift
      ;;
esac
done

# Set google services file
GOOGLE_SERVICE_FILE=${GOOGLE_SERVICE_FILE:-dev.json}
ENVIRONMENT_FILE=${ENVIRONMENT_FILE:-.env.dev}
VARIANT=${VARIANT:-debug}

# Update services json for build
echo "Updating google-services config..."
cp "${PROJECT_DIR}/android/app/google-services/$GOOGLE_SERVICE_FILE" "${PROJECT_DIR}/android/app/google-services.json"

cd "${PROJECT_DIR}"

# export env file and run
echo "Running android in ${VARIANT} mode..."

ENVFILE=$ENVIRONMENT_FILE react-native run-android --variant=${VARIANT}

# completed build, restore google-services file if prod build
echo "Restoring google-services config..."
cp "${PROJECT_DIR}/android/app/google-services/dev.json" "${PROJECT_DIR}/android/app/google-services.json"
