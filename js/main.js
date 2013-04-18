var AppRouter = Backbone.Router.extend({

    routes: {
        "": "home",
        "cellar": "list",
        "wines/page/:page": "list",
        "wines/add": "addWine",
        "wines/:id": "wineDetails",
        "about": "about"
    },

    initialize: function() {
        this.headerView = new HeaderView();
        $('.header').html(this.headerView.el);
    },

    home: function() {
        if (!this.loginView) {
            this.loginView = new LoginView();
        }
        $('#content').html(this.loginView.el);
        this.headerView.selectMenuItem('about-menu');
    },
    list: function(page) {
        var p = page ? parseInt(page, 10) : 1;
        var wineList = new WineCollection();
        wineList.fetch({
            success: function(list) {
                $("#content").html(new WineListView({
                    model: wineList,
                    page: p
                }).el);
            }
        });
        this.headerView.selectMenuItem('home-menu');
    },

    wineDetails: function(id) {
        var wine = new Kinvey.Entity({}, 'wines');
        wine.load(id, {
            success: function(wine) {
                $("#content").html(new WineView({
                    model: wine
                }).el);
            }
        });
        this.headerView.selectMenuItem();
    },

    addWine: function() {
        var wine = new Wine({
            _id: null,
            name: "",
            grapes: "",
            country: "USA",
            region: "California",
            year: "",
            description: "",
            picture: null
        });
        $('#content').html(new WineView({
            model: wine
        }).el);
        this.headerView.selectMenuItem('add-menu');
    },

    about: function() {
        if (!this.aboutView) {
            this.aboutView = new AboutView();
        }
        $('#content').html(this.aboutView.el);
        this.headerView.selectMenuItem('about-menu');
    }

});

Kinvey.init({
    'appKey': 'kid_PPAM5yCJzf',
    'appSecret': '5d55c668583d4b868545bcbc7b957ff3'
});

utils.loadTemplate(['LoginView', 'HeaderView', 'WineView', 'WineListItemView', 'AboutView'], function() {

    app = new AppRouter();
    Backbone.history.start();
});