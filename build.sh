#!/bin/bash

VERSION=$(cat manifest.json | jaq .version | cut -d '"' -f 2 | tr '.' '_')
echo "Building YAFFeather ${VERSION}"
zip -r -FS release/yaffeather-${VERSION} * --exclude .git* release/* build.sh chrome-manifest.json *.zip
echo "Firefox build completed"

echo "Building YAFFeathear ${VERSION}-chrome"
tempdir=$(mktemp -d)
echo "Made tempdir ${tempdir}"
currentdir=$(pwd)
cp -r ./* ${tempdir}

echo "Replacing references to Manifest-V2 objects"
sed -i 's/browser\./chrome\./g' ${tempdir}/*.js

echo "Replacing manifest.json with chrome manifest v3 file"
mv ${tempdir}/chrome-manifest.json ${tempdir}/manifest.json

echo "Compiling source files"
cd ${tempdir} && zip -r -FS ${currentdir}/release/yaffeather-${VERSION}-chrome * --exclude release/* .git* build.sh chrome-manifest.json *.zip
echo "Chrome build completed"

echo "Shredding tmpdir"
rm -rf ${tempdir}
