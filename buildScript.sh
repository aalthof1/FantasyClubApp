#!/bin/bash          
cd fantasy-club/  
ng build --prod --output-path docs --base-href 'FantasyClubApp'   
rm ../docs -rf
mv docs ../
cd ../docs/
cp index.html 404.html
echo 'thank you for the buildscript brandon'
