(function($){

"use strict";


var baseUrl = "http://localhost:1337/api/";
function getUrl(path) {
    return baseUrl + path;
}

var Movie = Backbone.Model.extend({});

var MoviesCollection = Backbone.Collection.extend({
    model: Movie,
    url: getUrl("movies")
});

var spinner = new (Backbone.View.extend({
    el:"#spinner",
    render: function() {
        var $spinner = this.$(".spinner_gif"),
            spinnerHeight = $("#homeView").height(),
            windowHeight = $(window).height();

        $spinner.css("margin-top", (spinnerHeight) /2);
        $spinner.css("margin-left", ((windowHeight) /2 ) + 25);
    },
    show: function() {
        this.render();
        $(".view-body").not("#spinner").addClass("blurred");
        this.$el.show();
    },
    hide: function() {
        this.$el.hide();
        $(".view-body").removeClass("blurred");
    }
}));

var Screen = Backbone.View.extend({
    show: function(previousView) {
        $(".view-body").hide();
        this.$el.show();
    }
});

var homeView = new (Screen.extend({
    el: "#homeView",
    events: {
        "click .js-showDb": "showDb"
    },
    initialize: function() {
        console.log("initialize homeView");
        this.show();
    },
    showDb: function() {
        console.log("click initialize");
        var self = this;
        this.movies = new MoviesCollection();


        spinner.show();
            this.movies.fetch({
                success: function() {
                    databaseView.render(self.movies);
                }
            }).always(function() {
               spinner.hide();
            });
    }
}));

var databaseView =  new (Screen.extend({
    el: "#showDb",
    events: {
        "click .js-back": "hide"
    },
    template: _.template($("#js-movieView").html()),
    render: function(movies) {
        this.show();
        this.$el.html(this.template({
            movies: movies.toJSON()
        }));
        console.log(movies.models);
    }
}));


})(jQuery);
