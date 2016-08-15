/* My modification of the node.js sample file from the AWS website */


/*** Include dependencies ***/

// Load the SDK and UUID
var AWS = require('aws-sdk');
// UUID(universally unique IDs)
var uuid = require('node-uuid');
// jsonfile is used to write/read json files
var jsonfile = require('jsonfile');
// bluebird is used for promises
var Promise_bluebird = require('bluebird')


// Tested
/* ------------------------------------------ Create an empty bucket -------------------------------------------- */

function createBucket(bktName, btkReason) {
    // Create an S3 client
    var s3 = new AWS.S3();
    
    // Create an empty bucket
    var bucketName = bktName + uuid.v4();
    s3.createBucket({Bucket: bucketName}, function () {});
    
    // Return the entire bucket name
    return bucketName;
}
/* ------------------------------------------------------------------------------------------------------------------------- */



/* --------------------------------------------- Deletes a bucket -------------------------------------------------- */




/* -------------------------------------------------------------------------------------------------------------------------- */


// Needs testing
/* -------------------------------------------- List all of my buckets --------------------------------------------- */

function getBucketList() {
    return new Promise_bluebird(function(resolve, reject) {
        // Create an S3 client
        var s3 = new AWS.S3();
        s3.listBuckets(function(err, data) {
            if (err) { 
                console.error(err);
            } else {
                console.log("Step 1: " + data.Buckets[0].Name);
                resolve(data.Buckets[0].Name);
            }
        });
    });
    
}
/* -------------------------------------------------------------------------------------------------------------------------- */



// Tested
/* ------------------- Log the purpose of the bucket to the designated file ---------------------------- */

function logBucketData(bktName, bktPurpose) {
    // Define the purpose of the bucket, this will be logged in a file in /Users/Isaac/AWS
    var bucketPurpose = bktPurpose;
    var bucketName = bktName;
    
    // Log the name of the bucket and the purpose to a file
    var fName = "/Users/Isaac/AWS/bucketInfo.json";
    var fileData = {};
    
    
    // Get the data from the file
    jsonfile.readFile(fName, function(err, obj) {
        if (err) {
            console.error(err);
        } else {
            fileData = obj;
            // Add a new property tot the object
            fileData[bucketName] = bktPurpose;
            saveData();
        }
    });
    
    // Save the data
    function saveData() {
        jsonfile.writeFile(fName, fileData, {spaces: 4}, function(err) {
            if (err) {
                console.error(err);
            }
        });
    }
}
/*----------------------------------------------------------------------------------------------------------------------------*/


function Main() {
    var firstBucket = getBucketList()
    console.log("Step 2: " + firstBucket)
}

Main();