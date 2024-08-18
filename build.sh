VERSION=$(cat manifest.json | jaq .version | cut -d '"' -f 2 | tr '.' '_')
echo "Building YAFFeather ${VERSION}"
zip -r -FS release/yaffeather-${VERSION} * --exclude .git* release/* build.sh
echo "Build completed"
