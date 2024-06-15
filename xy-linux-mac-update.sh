#!/bin/bash

cd "${0%/*}"
if [[ ! -x /usr/bin/git ]]; then
  echo "Git is not installed on this system. Skipping update."
  echo "If you installed with a zip file, you will need to download the new zip and install it manually."
else
  git pull --rebase --autostash
  if [[ $? != 0 ]]; then
    echo "There were errors while updating. Please download the latest version manually."
  fi
fi

npm install
read -n 1 -s -r -p "Press any key to continue..."
cd ..
exit

chmod +x y-linux-mac-update.sh
./y-linux-mac-update.sh