// BEFORE RUNNING:
// ---------------
// 1. If not already done, enable the Google Sheets API
//    and check the quota for your project at
//    https://console.developers.google.com/apis/api/sheets
// 2. Install the Node.js client library by running
//    `npm install googleapis --save`

const { google } = require('googleapis');
var sheets = google.sheets('v4');

authorize(function (authClient) {
    var request = {
        // The spreadsheet to apply the updates to.
        spreadsheetId: 'my-spreadsheet-id',  // TODO: Update placeholder value.

        resource: {
            // A list of updates to apply to the spreadsheet.
            // Requests will be applied in the order they are specified.
            // If any request is not valid, no requests will be applied.
            requests: [],  // TODO: Update placeholder value.

            // TODO: Add desired properties to the request body.
        },

        auth: authClient,
    };

    sheets.spreadsheets.batchUpdate(request, function (err, response) {
        if (err) {
            console.error(err);
            return;
        }

        // TODO: Change code below to process the `response` object:
        console.log(JSON.stringify(response, null, 2));
    });
});

function authorize(callback) {
    // TODO: Change placeholder below to generate authentication credentials. See
    // https://developers.google.com/sheets/quickstart/nodejs#step_3_set_up_the_sample
    //
    // Authorize using one of the following scopes:
    //   'https://www.googleapis.com/auth/drive'
    //   'https://www.googleapis.com/auth/drive.file'
    //   'https://www.googleapis.com/auth/spreadsheets'
    var authClient = null;

    if (authClient == null) {
        console.log('authentication failed');
        return;
    }
    callback(authClient);
}