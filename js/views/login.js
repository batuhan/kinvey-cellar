window.LoginView = Backbone.View.extend({

	initialize: function() {
		this.render();
	},
	events: {
		"click #login": "login",
		"click #register": "register"
	},
	login: function(e) {
		e.preventDefault();
		var user = new Kinvey.User();
		user.login($('#login-email').val(), $('#login-password').val(), {
			success: function(user) {
				console.log(user)
				//IkonMenu.events.trigger('loggedin');
			},
			error: function(e) {
				console.log(e)
				//add an error handler
			}
		});
	},
	register: function(e) {
		e.preventDefault();
		var user = new Kinvey.User();
		user.login($('#login-email').val(), $('#login-password').val(), {
			success: function(user) {
				console.log(user)
				//IkonMenu.events.trigger('loggedin');
			},
			error: function(e) {
				console.log(e)
				//add an error handler
			}
		});
	},
	render: function() {
		$(this.el).html(this.template());
		return this;
	}

});