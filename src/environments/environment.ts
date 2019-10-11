// This file can be replaced during build by using the `fileReplacements` array.
// `ng build --prod` replaces `environment.ts` with `environment.prod.ts`.
// The list of file replacements can be found in `angular.json`.

export const environment = {
    production: false,
    fomo_Url: 'https://gateway.fomopay.com/sandbox/pgw/v1',
    fomo_Merchant: 'test',
    fomo_ApiKey: '00000000',
    fvMembership_ClientId: 'FvMembershipClientId',
    fvMembership_ClientSecret: 'FvMembershipClientSecret',
    fvMembership_Scope: 'FvMembership',
    eWallet_Host: 'https://localhost:5001'

};

/*
 * For easier debugging in development mode, you can import the following file
 * to ignore zone related error stack frames such as `zone.run`, `zoneDelegate.invokeTask`.
 *
 * This import should be commented out in production mode because it will have a negative impact
 * on performance if an error is thrown.
 */
// import 'zone.js/dist/zone-error';  // Included with Angular CLI.
