# Environment setup
- install npm
- npm install -g ionic cordova
- npm install --save-dev @angular-devkit/build-angular
- npm install 'ionic-angular'

# Start server
- ionic serve --ssl

# Check in different platform
- npm install --save-dev @ionic/lab
- ionic lab

# Deploy website to firebase
-- ionic build --prod --release
- firebase login
- (only for the first time)firebase init ->select hosting -> www (specify folder to deploy) -> y (write single-page app) -> n
- firebase deploy --project fvmembership-ui

#URL 
https://fvmembership-ui.web.app

# Run in android
- ionic capacitor run android 
