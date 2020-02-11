const fs = require('fs');
const readline = require('readline');
const {
  google
} = require('googleapis');
var coordinatesObject;
class Coordinates {
  constructor(x, y) {
    this.x = x;
    this.y = y
  }
}

var coordinatesList = [];
// If modifying these scopes, delete token.json.
const SCOPES = ['https://www.googleapis.com/auth/spreadsheets'];
// The file token.json stores the user's access and refresh tokens, and is
// created automatically when the authorization flow completes for the first
// time.
const TOKEN_PATH = 'token.json';

// Load client secrets from a local file.
fs.readFile('credentials.json', (err, content) => {
  if (err) return console.log('Error loading client secret file:', err);
  // Authorize a client with credentials, then call the Google Sheets API.
  authorize(JSON.parse(content), readData);
  authorize(JSON.parse(content), writeData);
});

/**
 * Create an OAuth2 client with the given credentials, and then execute the
 * given callback function.
 * @param {Object} credentials The authorization client credentials.
 * @param {function} callback The callback to call with the authorized client.
 */
function authorize(credentials, callback) {
  const {
    client_secret,
    client_id,
    redirect_uris
  } = credentials.installed;
  const oAuth2Client = new google.auth.OAuth2(
    client_id, client_secret, redirect_uris[0]);

  // Check if we have previously stored a token.
  fs.readFile(TOKEN_PATH, (err, token) => {
    if (err) return getNewToken(oAuth2Client, callback);
    oAuth2Client.setCredentials(JSON.parse(token));
    callback(oAuth2Client);
  });
}

/**
 * Get and store new token after prompting for user authorization, and then
 * execute the given callback with the authorized OAuth2 client.
 * @param {google.auth.OAuth2} oAuth2Client The OAuth2 client to get token for.
 * @param {getEventsCallback} callback The callback for the authorized client.
 */
function getNewToken(oAuth2Client, callback) {
  const authUrl = oAuth2Client.generateAuthUrl({
    access_type: 'offline',
    scope: SCOPES,
  });
  console.log('Authorize this app by visiting this url:', authUrl);
  const rl = readline.createInterface({
    input: process.stdin,
    output: process.stdout,
  });
  rl.question('Enter the code from that page here: ', (code) => {
    rl.close();
    oAuth2Client.getToken(code, (err, token) => {
      if (err) return console.error('Error while trying to retrieve access token', err);
      oAuth2Client.setCredentials(token);
      // Store the token to disk for later program executions
      fs.writeFile(TOKEN_PATH, JSON.stringify(token), (err) => {
        if (err) return console.error(err);
        console.log('Token stored to', TOKEN_PATH);
      });
      callback(oAuth2Client);
    });
  });
}

/**
 * Prints the names and majors of students in a sample spreadsheet:
 * @see https://docs.google.com/spreadsheets/d/1BxiMVs0XRA5nFMdKvBdBZjgmUUqptlbs74OgvE2upms/edit
 * @param {google.auth.OAuth2} auth The authenticated Google OAuth client.
 */
function readData(auth) {
  const sheets = google.sheets({
    version: 'v4',
    auth
  });
  sheets.spreadsheets.values.get({
    spreadsheetId: '16YdlzfEONh1YQ-gGjZ0VGHcyyESjKJg4vRoFWrZAkII',
    range: 'Range1',
  }, (err, res) => {
    if (err) return console.log('The API returned an error: ' + err);
    const rows = res.data.values;
    if (rows.length) {
      console.log('Col A,\tCol B:');
      // Print columns A and E, which correspond to indices 0 and 4.
      rows.map((row) => {
        // console.log(`${row[0]}, ${row[1]}`);
        // calling data from the sheets as variables
        var tempx = (`${row[0]}`).replace(/[^\d.-]/g, '');
        var tempy = (`${row[1]}`).replace(/[^\d.-]/g, '');

        var x="";
        var y="";

        // grabbing only numbers and points inside that data
        for (var i = 0; i < tempx.length; i++) {
          if (((tempx[i] >= 0) && (tempx[i] <= 9)) || (tempx[i] == '.')) {
            x += tempx[i];
          }
        }
        x=parseFloat(x, 10);

        for (var i = 0; i < tempy.length; i++) {
          if (((tempy[i] >= '0') && (tempy[i] <= '9')) || (tempx[i] == '.')) {
            y += tempy[i];
          }
        }

        y=parseFloat(y, 10);

        console.log(x + "; " + y);

        // writting and structuring json file with data coming from google sheets
        coordinatesObject = {
          "coordinates": [
            {
            "latitude": x,
            "longitude": y
          }
        ]
        };

        fs.writeFile("test.json", JSON.stringify(coordinatesObject, null, 4), (err) => {
          if (err) {
            console.error(err);
            return;
          };
        });

        //coordinatesObject = {"test"};

      });
    } else {
      console.log('No data found.');
    }
  });


}

function writeData(auth) {
  const sheets = google.sheets({
    version: 'v4',
    auth
  });


  var request = {
    // The spreadsheet to apply the updates to.
    spreadsheetId: '16YdlzfEONh1YQ-gGjZ0VGHcyyESjKJg4vRoFWrZAkII', // TODO: Update placeholder value.

    range: "Foglio1!A1:A3",

    valueInputOption: "RAW",

    insertDataOption: "INSERT_ROWS",

    resource: {

      range: "Foglio1!A1:A3",

      majorDimension: "ROWS",

      values: [
        ["2", "2.44", "1"],
      ]

    },

    auth: auth,
  };

  sheets.spreadsheets.values.append(request, function(err, response) {
    if (err) {
      console.error(err);
      return;
    }

    // TODO: Change code below to process the `response` object:
    console.log(JSON.stringify(response, null, 2));
  });
}
