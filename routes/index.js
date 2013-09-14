
var mongoose= require("mongoose");

//Connect to mongo DB
// mongoose.connect('mongodb://admin:zane77@paulo.mongohq.com:10089/ConsumerEcosystem');
mongoose.connect('mongodb://localhost:27017/Yelp');
var myDB = mongoose.connection;

//Error handling if connection fails
myDB.on('error', console.error.bind(console, 'connection error:'));
//Check if successful connection is made
myDB.once('open', function callback () {
	console.log("MY DB Connected with Mongoose");
});

exports.demo = function(req, res){
  res.render('demo', { title: 'signal | noise - Are there enough reviews?' });
};

exports.index = function(req, res){
  res.render('index', { title: 'signal | noise - Are there enough reviews?' });
};

exports.contact = function(req, res){
  res.render('contact', { title: 'signal | noise - Contact Us' });
};
