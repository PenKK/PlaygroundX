echo "Switching to branch master"
git checkout main

echo "Deploying files to server..."

ssh deploy 'rm -rf /var/www/capstone11.mooo.com/*'
scp -r * deploy:/var/www/capstone11.mooo.com

echo "Done"