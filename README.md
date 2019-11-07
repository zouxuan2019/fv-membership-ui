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
- ionic capacitor run android --prod
# Get signed apk

android/build/outputs/apk 
1) keytool -genkey -v -keystore my-release-key.keystore -alias alias_name -keyalg RSA -keysize 2048 -validity 10000

jarsigner -verbose -sigalg SHA1withRSA -digestalg SHA1 -keystore my-release-key.keystore HelloWorld-release-unsigned.apk alias_name

zipalign -v 4 HelloWorld-release-unsigned.apk app-release.apk 

2) android studio-->build-->generate signed Apk-->create new keystore and give password.-->select signature version both v1 and v2.
