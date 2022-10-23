// command line, etc
// https://developer.okta.com/blog/2019/06/18/command-line-app-with-nodejs

import yargs from "yargs";

const options = yargs
 .usage("Usage: -n <name>")
 .option("o", { alias: "operation", describe: "c=CreateTable, l=ListTables", type: "string", demandOption: true })
 .argv;

import {DynamoDB} from "@aws-sdk/client-dynamodb";

// https://docs.aws.amazon.com/AWSJavaScriptSDK/latest/AWS/DynamoDB.html#createTable-property
const dbClient = new DynamoDB({
  endpoint: "http://localhost:8000",
})


function createTable(tableName) {
    /* This example creates a table named Music. */

    var params = {
        AttributeDefinitions: [
        {
        AttributeName: "Artist", 
        AttributeType: "S"
        }, 
        {
        AttributeName: "SongTitle", 
        AttributeType: "S"
        }
        ], 
        KeySchema: [
        {
        AttributeName: "Artist", 
        KeyType: "HASH"
        }, 
        {
        AttributeName: "SongTitle", 
        KeyType: "RANGE"
        }
        ], 
        ProvisionedThroughput: {
        ReadCapacityUnits: 5, 
        WriteCapacityUnits: 5
        }, 
        TableName: tableName
    };
    dbClient.createTable(params, function(err, data) {
        if (err) console.log(err, err.stack); // an error occurred
        else     console.log(data);           // successful response
        /*
        data = {
        TableDescription: {
        AttributeDefinitions: [
            {
            AttributeName: "Artist", 
            AttributeType: "S"
            }, 
            {
            AttributeName: "SongTitle", 
            AttributeType: "S"
            }
        ], 
        CreationDateTime: <Date Representation>, 
        ItemCount: 0, 
        KeySchema: [
            {
            AttributeName: "Artist", 
            KeyType: "HASH"
            }, 
            {
            AttributeName: "SongTitle", 
            KeyType: "RANGE"
            }
        ], 
        ProvisionedThroughput: {
            ReadCapacityUnits: 5, 
            WriteCapacityUnits: 5
        }, 
        TableName: "Music", 
        TableSizeBytes: 0, 
        TableStatus: "CREATING"
        }
        }
        */
    });

}

function listTables() {
    var params = {
    };
    dbClient.listTables(params, function(err, data) {
        if (err) console.log(err, err.stack); // an error occurred
        else     console.log(data);           // successful response
        /*
        data = {
         TableNames: [
            "Forum", 
            "ProductCatalog", 
            "Reply", 
            "Thread"
         ]
        }
        */
      });
}

function deleteTable(tableName) {
    var params = {
        TableName: tableName
       };
       dbClient.deleteTable(params, function(err, data) {
         if (err) console.log(err, err.stack); // an error occurred
         else     console.log(data);           // successful response
         /*
         data = {
          TableDescription: {
           ItemCount: 0, 
           ProvisionedThroughput: {
            NumberOfDecreasesToday: 1, 
            ReadCapacityUnits: 5, 
            WriteCapacityUnits: 5
           }, 
           TableName: "Music", 
           TableSizeBytes: 0, 
           TableStatus: "DELETING"
          }
         }
         */
       });    
}

const tableName = "Music"
if(options.operation === 'c') {
    createTable(tableName);
}
else if(options.operation === 'l') {
    listTables();
}
else if(options.operation === 'd') {
    deleteTable(tableName);
}

