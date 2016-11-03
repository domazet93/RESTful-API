(function($) {

"use strict";

$(document).on("click", "a:not([data-bypass])", function(evt) {
  var href = { prop: $(this).prop("href"), attr: $(this).attr("href") };
  var root = location.protocol + "//" + location.host + Backbone.history.options.root;

  if (href.prop && href.prop.slice(0, root.length) === root) {
    evt.preventDefault();
    Backbone.history.navigate(href.attr, true);
  }
});




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
        $spinner.css("margin-left", ((windowHeight) /2 ) + 35);
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

var HomeView =  Backbone.View.extend({
    className: "homeView",
    events: {
        "click .js-submit":"sendMovie"
    },
    template: _.template($("#js-homeView").html()),
    sendMovie: function() {
        var movie = {
            title: $(".title").val(),
            genre:$(".genre").val(),
            description:$(".stars").val(),
            stars: $(".stars").val(),
            duration:$(".duration").val(),
            image_url:$(".img_url").val(),
            imbd_url: $(".imbd").val()
        };

        console.log(JSON.stringify(movie));
        $.ajax({
            url: getUrl("movies"),
            contentType: "application/json",
            data: JSON.stringify(movie),
            method: "POST"
        });
    },
    render: function() {
        var self = this;
        this.$el.html(self.template());
        $('#container').empty().append(this.$el);
    }
});

var databaseView =  Backbone.View.extend({
    className: "showDb",
    events: {
        "click .js-back": "hide",
        "click .js-movie": "showSingleMovie"
    },
    template: _.template($("#js-movieView").html()),
    initialize: function() {
        var self = this;
        this.movies = new MoviesCollection();

        spinner.show();
            this.movies.fetch({
                success: function() {
                    self.render(self.movies);
                }
            }).always(function() {
               spinner.hide();
            });

    },
    render: function(movies) {
        this.$el.html(this.template({
            movies: movies.toJSON()
        }));
        $('#container').empty().append(this.$el);
        console.log(movies.models);
    },
    showSingleMovie: function(e) {
        var id = $(e.currentTarget).data(id).id;
        console.log("Movie ID -->", id);

        $.ajax({
            url: getUrl("movies/") + id,
            contentType: "application/json"
        });
    }
});
var ApplicationRouter = Backbone.Router.extend({
    view: null,
    routes: {
      "": "homeRoute",
      "db": "db"
    },
    closeCurrentView: function() {
        if (this.view !== null) {
            this.view.remove(); //destory
        }
    },
    homeRoute: function() {
        this.closeCurrentView();
        console.log("Initialize homeRoute");
        this.view = new HomeView();
        this.view.render();
    },
    db: function() {
        this.closeCurrentView();
        this.view = new databaseView();
        console.log("Initialize db");
    }
});

var appRouter = new ApplicationRouter();
Backbone.history.start({pushState: true});

})(jQuery);
