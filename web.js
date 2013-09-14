
/**
 * Module dependencies.
 */

var express = require('express')
  , routes = require('./routes')
  , http = require('http')
  , path = require('path');

var app = express();

// all environments
app.set('port', process.env.PORT || 3000);
app.set('views', __dirname + '/views');
app.set('view engine', 'jade');
app.use(express.favicon());
app.use(express.logger('dev'));
app.use(express.bodyParser());
app.use(express.cookieParser('your secret here'));
app.use(express.methodOverride());
app.use(app.router);
app.use(express.session({flash: 'messagegoeshere'}));
app.use(require('stylus').middleware(__dirname + '/public'));
app.use(express.static(path.join(__dirname, 'public')));

//development only
app.configure('development', function(){
	app.use(express.errorHandler({ dumpExceptions: true, showStack: true }));
});

app.configure('production', function(){
  app.use(express.errorHandler());
});

app.get('/', routes.index);
app.get('/contact', routes.contact);
app.get('/demo', routes.demo);

http.createServer(app).listen(app.get('port'), function(){
  console.log('Express server listening on port ' + app.get('port'));
});

app.post('/contact', function(request, response){
    if(request.body.ContactForm.check == undefined)
    	{
    		var api_key = 'key-935f35mtflgrj2x2sb92b67pu0j8nnc9';
    		var domain = 'signal2noise.mailgun.org';
    		var mailgun = require('mailgun-js')(api_key, domain);

    		var data = {
    				from: request.body.ContactForm.name + ' <' + request.body.ContactForm.email + '>',
    				to: 'frobozzco@outlook.com',
    				subject: request.body.ContactForm.subject,
    				text: request.body.ContactForm.body
    		};

    		mailgun.messages.send(data, function (error, res, body) {
    			console.log(body);
    			if(body.message == 'Queued. Thank you.')
    			{
    				request.flash('Info', 'Message sent; Thank you.');
    				response.redirect(200, '/contact');
    			}
    			else
   				{
    				request.flash('Error', body.message);
    				response.redirect('/contact');
   				}
    		});
    	}
    else
    	{
    		console.log('Spambot denied!');
			response.redirect(200, '/index');
    	}
});