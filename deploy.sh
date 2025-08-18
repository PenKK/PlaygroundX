echo "Switching to branch master"
git checkout master

echo "Deploying files to server..."

ssh deploy 'rm -rf /var/www/playgroundx.mooo.com/*'
scp -r * deploy:/var/www/playgroundx.mooo.com

echo "Done"

read -p "Press enter to close"