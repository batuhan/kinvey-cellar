window.Wine = Kinvey.Entity.extend({
    constructor: function(attributes) {
        Kinvey.Entity.prototype.constructor.call(this, attributes, 'wines');

        this.validators = {};

        this.validators.name = function(value) {
            return value.length > 0 ? {
                isValid: true
            } : {
                isValid: false,
                message: "You must enter a name"
            };
        };

        this.validators.grapes = function(value) {
            return value.length > 0 ? {
                isValid: true
            } : {
                isValid: false,
                message: "You must enter a grape variety"
            };
        };

        this.validators.country = function(value) {
            return value.length > 0 ? {
                isValid: true
            } : {
                isValid: false,
                message: "You must enter a country"
            };
        };
    },

    validateItem: function(key) {
        return (this.validators[key]) ? this.validators[key](this.get(key)) : {
            isValid: true
        };
    },

    // TODO: Implement Backbone's standard validate() method instead.
    validateAll: function() {

        var messages = {};

        for (var key in this.validators) {
            if (this.validators.hasOwnProperty(key)) {
                var check = this.validators[key](this.get(key));
                if (check.isValid === false) {
                    messages[key] = check.message;
                }
            }
        }

        return _.size(messages) > 0 ? {
            isValid: false,
            messages: messages
        } : {
            isValid: true
        };
    },

    defaults: {
        id: null,
        name: "",
        grapes: "",
        country: "USA",
        region: "California",
        year: "",
        description: "",
        picture: null
    }
});

window.WineCollection = Kinvey.Collection.extend({
    // Set the entity class.
    entity: Wine,
    // Overwrite the constructor to automatically link all instances to the events collection.
    constructor: function(options) {
        Kinvey.Collection.prototype.constructor.call(this, 'wines', options);
    }
});