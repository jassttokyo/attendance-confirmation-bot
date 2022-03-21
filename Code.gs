// !!please set your slack "attendance" webhook url!!
const ATTENDANCE = '[YOUR SLACK ATTENDANCE WEBHOOK]';
// !!please set your slack "minutes" webhook url!!
const MINUTES = '[YOUR SLACK MINUTES WEBHOOK]';
// email to
const EMAIL_TO = "[TO WHOM]";

function attendance() {

    // get the data from the spreadsheet and check all the labels.
    SpreadsheetApp.getActiveSheet().getDataRange().getValues().forEach((label, i) => {
        // skip blank labels
        if (i == 0 || label.length < 5 || label[2].length == 0) {
            return;
        }
        // calculate the time difference between now and target
        const now = new Date();
        const target = new Date(label[2]);
        // skip it if the difference more than 12 hours
        if (Math.abs(now - target) > 12 * 60 * 60 * 1000) {
            return;
        }

        //  HTTP POST IFTTT if you've got "alarm"
        Logger.log(ATTENDANCE);
        const res = UrlFetchApp.fetch(ATTENDANCE, {
            "method": "post",
            "contentType": "application/json",
            "payload": JSON.stringify({
                "text": label[4]
            })
        });
        Logger.log("Response:" + res);
    });
}

function minutes() {
    // get the data from the spreadsheet and check all the labels.
    SpreadsheetApp.getActiveSheet().getDataRange().getValues().forEach((label, i) => {
        // skip blank labels
        if (i == 0 || label.length < 5 || label[1].length == 0) {
            return;
        }
        // calculate the time difference between now and target
        const now = new Date();
        const target = new Date(label[1]);
        // skip it if the difference more than 12 hours
        if (Math.abs(now - target) > 12 * 60 * 60 * 1000) {
            return;
        }

        //  HTTP POST IFTTT if you've got "alarm"
        Logger.log(MINUTES);
        const res = UrlFetchApp.fetch(MINUTES, {
            "method": "post",
            "contentType": "application/json",
            "payload": JSON.stringify({
                "text": label[3]
            })
        });
        GmailApp.sendEmail(EMAIL_TO,
            "[JaSST Tokyo]次回ミーティングに関して",
            label[3]);
        Logger.log("Response:" + res);
    });
}
