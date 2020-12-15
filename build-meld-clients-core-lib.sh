# Script to re-build meld-clients-core library
#
# 'node_modules' is moved to 'node_modules_save', because building apps against a
# local copy fails is the nodule_modules directory is present in 'meld-clients-core'
#
# 'npm link' sets up for testing with the local instance:
# In an app that is to be built/run against the local instance, 
# use the following command:
#   npm link meld-clients-core
# 

mv node_modules_save node_modules
npm install
npm run build
npm link  # Used for testing with local instance
mv node_modules node_modules_save

# End.
