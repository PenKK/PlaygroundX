echo "Switching to branch master"
git checkout main

echo "Deploying files to server..."

scp -r * deploy:/var/www/capstone11.mooo.com

echo "Done"