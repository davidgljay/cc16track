
var AWS = require('aws-sdk'),
Twitter = require('twitter');

//AWS Auth
AWS.config.update({
	accessKeyId: process.env.AWS_KEY, 
	secretAccessKey: process.env.AWS_SECRET, 
	region: process.env.AWS_REGION
})

var dynamodb = this.dynamodb = new AWS.DynamoDB({apiVersion: '2015-02-02'});

//Twitter Auth
var twitterclient = new Twitter({
  consumer_key: process.env.TWITTER_CONSUMER_KEY,
  consumer_secret: process.env.TWITTER_CONSUMER_SECRET,
  access_token_key: process.env.TWITTER_ACESS_KEY,
  access_token_secret: process.env.TWITTER_ACESS_SECRET
});

//Get twitter stream
client.stream('statuses/filter', {track: process.env.TRACK_PARAMS}, function(stream) {
  stream.on('data', function(tweet) {
    dynamo_post(tweet);
  });
 
  stream.on('error', function(error) {
    throw error;
  });
});

//Post to DynamoDB
var dynamo_post=function(tweet) {
	var params = {
		TableName:process.env.TABLE_NAME,
		Item: {
				tweet:{S:JSON.stringify(tweet)}
		}
	}
	dynamodb.putItem(params, function(err, data) {
		console.log(data);
	})
};