/* Amplify Params - DO NOT EDIT
	ENV
	REGION
	STORAGE_S33FB5F4EE_BUCKETNAME
Amplify Params - DO NOT EDIT *//*
Copyright 2017 - 2017 Amazon.com, Inc. or its affiliates. All Rights Reserved.
Licensed under the Apache License, Version 2.0 (the "License"). You may not use this file except in compliance with the License. A copy of the License is located at
    http://aws.amazon.com/apache2.0/
or in the "license" file accompanying this file. This file is distributed on an "AS IS" BASIS, WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
See the License for the specific language governing permissions and limitations under the License.
*/



const AWS = require('aws-sdk')
var awsServerlessExpressMiddleware = require('aws-serverless-express/middleware')
var bodyParser = require('body-parser')
var express = require('express')

AWS.config.update({ region: process.env.TABLE_REGION });

const dynamodb = new AWS.DynamoDB.DocumentClient();
const s3 = new AWS.S3();

let tableName = "publications";
if(process.env.ENV && process.env.ENV !== "NONE") {
  tableName = tableName + '-' + process.env.ENV;
}
const bucket = 	process.env.STORAGE_S33FB5F4EE_BUCKETNAME;
const userIdPresent = false; // TODO: update in case is required to use that definition
const partitionKeyName = "publicationID";
const partitionKeyType = "S";
const sortKeyName = "";
const sortKeyType = "";
const hasSortKey = sortKeyName !== "";
const path = "/publications";
const UNAUTH = 'UNAUTH';
const hashKeyPath = '/:' + partitionKeyName;
const sortKeyPath = hasSortKey ? '/:' + sortKeyName : '';
// declare a new express app
var app = express()
app.use(bodyParser.json())
app.use(bodyParser.urlencoded(
    {
        extended: true,
        type: 'multipart/form-data',
        limit: '20mb',
        parameterLimit: 1000000
    }
))
app.use(awsServerlessExpressMiddleware.eventContext())

// Enable CORS for all methods
app.use(function(req, res, next) {
  res.header("Access-Control-Allow-Origin", "*")
  res.header("Access-Control-Allow-Headers", "*")
  next()
});

// convert url string param to expected Type
const convertUrlType = (param, type) => {
  switch(type) {
    case "N":
      return Number.parseInt(param);
    default:
      return param;
  }
}


/********************************
 * HTTP Get method for list objects *
 ********************************/

app.get(path, function(req, res) {
    let params = {
        TableName: tableName
    }

    // if (req.query) {
    //     console.log(req.query)
    //     let i = 1
    //     for (let [key, value] of Object.entries(req.query)) {
    //         let attribute = `:${key}`
    //         params["ExpressionAttributeValues"] = {
    //             [attribute] : {
    //                 "S": value
    //             }
    //         }

    //         i === Object.keys(req.query).length ?
    //             params["FilterExpression"] = `${key}=:${key}`
    //             :
    //             params["FilterExpression"] = `${key}=:${key} AND`
    //         ++i
    //     }
    // }

    console.log(params)
  // var condition = {}
  // condition[partitionKeyName] = {
  //   ComparisonOperator: 'EQ'
  // }

  // if (userIdPresent && req.apiGateway) {
  //   condition[partitionKeyName]['AttributeValueList'] = [req.apiGateway.event.requestContext.identity.cognitoIdentityId || UNAUTH ];
  // } else {
  //   try {
  //     condition[partitionKeyName]['AttributeValueList'] = [ convertUrlType(req.query[partitionKeyName], partitionKeyType) ];
  //   } catch(err) {
  //     res.statusCode = 500;
  //     res.json({error: 'Wrong column type ' + err});
  //   }
  // }

  // let queryParams = {
  //   TableName: tableName,
  //   KeyConditions: condition
  // }

  // dynamodb.query(queryParams, (err, data) => {
  //   if (err) {
  //     res.statusCode = 500;
  //     res.json({error: 'Could not load items: ' + err});
  //   } else {
  //     res.json(data.Items);
  //   }
    // });

    dynamodb.scan(params, (err, data) => {
        if (err) {
            res.statusCode = 500;
            res.json({error: 'Could not load items: ' + err});
        } else {
            res.json(data.Items);
        }
    })
});

/*****************************************
 * HTTP Get method for get single object *
 *****************************************/

app.get(path + '/object', function(req, res) {
  var params = {};
  if (userIdPresent && req.apiGateway) {
    params[partitionKeyName] = req.apiGateway.event.requestContext.identity.cognitoIdentityId || UNAUTH;
  } else {
    params[partitionKeyName] = req.query[partitionKeyName];
    try {
      params[partitionKeyName] = convertUrlType(req.query[partitionKeyName], partitionKeyType);
    } catch(err) {
      res.statusCode = 500;
      res.json({error: 'Wrong column type ' + err});
    }
  }
  if (hasSortKey) {
    try {
      params[sortKeyName] = convertUrlType(req.query[sortKeyName], sortKeyType);
    } catch(err) {
      res.statusCode = 500;
      res.json({error: 'Wrong column type ' + err});
    }
  }

  let getItemParams = {
    TableName: tableName,
    Key: params
  }

  dynamodb.get(getItemParams,(err, data) => {
    if(err) {
      res.statusCode = 500;
      res.json({error: 'Could not load items: ' + err.message});
    } else {
      if (data.Item) {
        res.json(data.Item);
      } else {
        res.json(data) ;
      }
    }
  });
});


/************************************
* HTTP put method for insert object *
*************************************/

app.put(path, function(req, res) {

  if (userIdPresent) {
    req.body['userId'] = req.apiGateway.event.requestContext.identity.cognitoIdentityId || UNAUTH;
  }

  let putItemParams = {
    TableName: tableName,
    Item: req.body
  }
  dynamodb.put(putItemParams, (err, data) => {
    if(err) {
      res.statusCode = 500;
      res.json({error: err, url: req.url, body: req.body});
    } else{
      res.json({success: 'put call succeed!', url: req.url, data: data})
    }
  });
});

/************************************
* HTTP post method for insert object *
*************************************/

app.post(path, function(req, res) {

    if (userIdPresent) {
        req.body['userId'] = req.apiGateway.event.requestContext.identity.cognitoIdentityId || UNAUTH;
    }

    let item = req.body.content
    item['publicationID'] = req.body.publicationID

    let putItemParams = {
        TableName: tableName,
        Item: item
    }
    console.log(putItemParams)

    dynamodb.put(putItemParams, (err, data) => {
        if(err) {
            res.statusCode = 500;
            res.json({error: err, url: req.url, body: req.body});
        } else{
            res.json({success: 'post call succeed!', url: req.url, data: data})
        }
    });
});

/**************************************
* HTTP remove method to delete object *
***************************************/

app.delete(path + '/object', function(req, res) {
  //  var params = {};
  // if (userIdPresent && req.apiGateway) {
  //   params[partitionKeyName] = req.apiGateway.event.requestContext.identity.cognitoIdentityId || UNAUTH;
  // } else {
  //   params[partitionKeyName] = req.query[partitionKeyName];
  //    try {
  //     params[partitionKeyName] = convertUrlType(req.query[partitionKeyName], partitionKeyType);
  //   } catch(err) {
  //     res.statusCode = 500;
  //     res.json({error: 'Wrong column type ' + err});
  //   }
  // }
  // if (hasSortKey) {
  //   try {
  //     params[sortKeyName] = convertUrlType(req.query[sortKeyName], sortKeyType);
  //   } catch(err) {
  //     res.statusCode = 500;
  //     res.json({error: 'Wrong column type ' + err});
  //   }
  // }

  let removeItemParams = {
    TableName: tableName,
    Key: paramsreq.body.publicationID
  }
  dynamodb.delete(removeItemParams, (err, data)=> {
    if(err) {
      res.statusCode = 500;
      res.json({error: err, url: req.url});
    } else {
      res.json({url: req.url, data: data});
    }
  });
});


/*****************************************
 * HTTP Post method for image upload     *
 *****************************************/


app.post(path + '/image', (req, res) => {
    console.log(req.body);
    const location = 'us-east-2'
    const bucketurl = `https://${bucket}.s3.${location}.amazonaws.com`
    res.json({url: req.url, data: bucketurl})
})

app.listen(3000, function() {
    console.log("App started")
});

// Export the app object. When executing the application local this does nothing. However,
// to port it to AWS Lambda we will create a wrapper around that will load the app from
// this file
module.exports = app

