# Script to re-build meld-clients-core library
#
# 'node_modules' is moved to 'node_modules_save', because building apps against a
# local copy fails if the nodule_modules directory is present in 'meld-clients-core'
#
# 'npm link' sets up for testing with the local instance:
# In an app that is to be built/run against the local instance, 
# use the following command:
#   npm link meld-clients-core
# 

if [[ "$1" == "clean" ]]; then
    echo "Rebuild from scratch..."
    rm package-lock.json
    rm -rf node_modules 
    rm -rf lib
    # return 0
fi


if [[ "$1" == "unlink" ]]; then
    echo "Unlink from global node_modules..."
    rm $(npm root -g)/meld-clients-core
    return 0
fi


if [[ "$1" == "link-peers" ]]; then
    echo "Link to peer dependency modules..."
    npm link react
    npm link react-dom
    npm link react-redux
    # npm link redux
    return 0
fi

# mv node_modules_save node_modules
npm install
npm run build # Not needed if prepare script provided?  
              # Cf. https://docs.npmjs.com/cli/v6/configuring-npm/package-json#devdependencies
# npm link  # Used for testing with local instance
# mv node_modules node_modules_save

# Set up links for peer dependencies
# npm link react
# npm link react-dom
# npm link react-redux
# npm link redux

# End.
