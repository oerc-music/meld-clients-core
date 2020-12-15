# Activate nvm and check node version in use
#
# Run as:
#
#    . activate-node.sh
#

export NVM_DIR="$HOME/.nvm" 
[ -s "$NVM_DIR/nvm.sh" ] && \. "$NVM_DIR/nvm.sh"    # This loads nvm
[ -s "$NVM_DIR/bash_completion" ] && \. "$NVM_DIR/bash_completion"

nvm --version

nvm use 14.15.1  # Latest LTS as of 2020-12-15
#nvm use 12.19.0  # Later problems were problematic - need Xcode

node --version
