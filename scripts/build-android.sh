
#!/usr/bin/env bash

SCRIPT_DIR=$( dirname "$0" )
PROJECT_DIR="$( dirname "$( cd "${SCRIPT_DIR}" && pwd )")"

for i in "$@"
do
case $i in
    -p|--prod)
        GOOGLE_SERVICE_FILE="prod.json"
        ENVIRONMENT_FILE=".env.prod"
        TASK="bundleRelease"
      shift
      ;;
    -s|--staging)
        GOOGLE_SERVICE_FILE="dev.json"
        ENVIRONMENT_FILE=".env"
        TASK="assembleRelease"
      shift
      ;;
    -d|--dev)
        GOOGLE_SERVICE_FILE="dev.json"
        ENVIRONMENT_FILE=".env.dev"
        TASK="assembleDebug"
      shift
      ;;
esac
done

# Set google services file
GOOGLE_SERVICE_FILE=${GOOGLE_SERVICE_FILE:-dev.json}
ENVIRONMENT_FILE=${ENVIRONMENT_FILE:-.env.dev}
TASK=${TASK:-assembleDebug}

# Update services json for build
echo "Updating google-services config..."
cp "${PROJECT_DIR}/android/app/google-services/$GOOGLE_SERVICE_FILE" "${PROJECT_DIR}/android/app/google-services.json"

# export env file and build
echo "Commencing apk build..."
export ENVFILE=$ENVIRONMENT_FILE

cd "${PROJECT_DIR}/android"

echo "Commencing assemble task ${TASK}"
./gradlew ${TASK}

cd "${PROJECT_DIR}"

# completed build, restore google-services file if prod build
echo "Restoring google-services config..."
cp "${PROJECT_DIR}/android/app/google-services/dev.json" "${PROJECT_DIR}/android/app/google-services.json"