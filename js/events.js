Backbone.Events.on('loggedin', function() {
	$('.not_logged_in').hide();
	$('.logged_in').show();
});

Backbone.Events.on('loggedout', function() 
	$('.logged_in').hide();
	$('.not_logged_in').show();
	IkonMenu.Router.navigate();
});