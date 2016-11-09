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

    var Movie = Backbone.Model.extend({
        initialize: function(movieId) {
            console.log("Initialize Movie model");
            this.url = getUrl("movies/" + movieId);
        }
    });
    var MoviesCollection = Backbone.Collection.extend({
        model: Movie,
        url: getUrl("movies")
    });

    var spinner = new ( Backbone.View.extend({
        el:"#spinner",
        render: function() {
            var $spinner = this.$("img.spinner_gif"),
                spinnerWidth = $spinner.width() / 2,
                spinnerHeight = $spinner.height(),
                windowWidth = $(window).width() / 2,
                windowTop= $(window).height() / 2 - spinnerHeight;

            this.$el.css({
                "left": windowWidth - spinnerWidth,
                "top": windowTop
            });
        },
        show: function() {
            this.render();
            this.$el.show();
            $("#container").not("#spinner").addClass("blurred");
        },
        hide: function() {
            this.$el.hide();
            $("#container").removeClass("blurred");
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
                description:$(".description").val(),
                stars: $(".stars").val(),
                duration:$(".duration").val(),
                image_url:$(".img_url").val(),
                imbd_url: $(".imbd").val()
            };
            $.ajax({
                url: getUrl("movies"),
                contentType: "application/json",
                data: JSON.stringify(movie),
                method: "POST"
            }).done(function(){
                alert("DONE");
            });
        },
        render: function() {
            var self = this;
            this.$el.html(self.template());
            $("#container").append(this.$el);
        }
    });
    var databaseView =  Backbone.View.extend({
        className: "showDb",
        events: {
            "click .js-movie": "showSingleMovie",
            "click .js-nextMovie": "nextMovie",
            "click .js-prevMovie": "prevMovie"
        },
        template: _.template($("#js-movieView").html()),
        initialize: function() {
            var self = this,
                num;

            this.movies = new MoviesCollection();

            spinner.show();
            this.movies.fetch({
                success: function() {
                    self.render(self.movies);
                    console.log("Succes--->",self.movies);
                },
                error: function() {
                    console.log("Error");
                }
            }).always(function() {
                spinner.hide();
            });
        },
        render: function(movies) {
            var self = this;

            if(this.num == undefined || this.num > movies.length-1) {
                this.num = 0;
            }
            if(this.num < 0) {
                this.num = movies.length-1;
            }

            this.$el.html(this.template({
                movies: movies.toJSON()[self.num]
            }));

            $("#container").append(this.$el);
        },
        nextMovie: function() {
            this.num++;
            this.render(this.movies);
        },
        prevMovie: function() {
            console.log("next");
            this.num--;
            this.render(this.movies);
        }
    });
    var SingleView = Backbone.View.extend({
        events: {
            "click .js-delete": "delete"
        },
        className: "singleMovie",
        template: _.template($("#js-singleMovie").html()),
        initialize: function(options) {

            this.model = new Movie(options.id);
            this.listenTo(this.model, "change", this.render);

            spinner.show();
            this.model.fetch()
            .always(function() {
                spinner.hide();
            });
        },
        render: function() {
            this.$el.html(this.template({
                movie: this.model.attributes
            }));
            $("#container").append(this.$el);
        },
        delete: function() {
            $.ajax({
                url: getUrl("movies/") + this.model.get("_id"),
                contentType: "application/json",
                method: "DELETE"
            });
        }
    });
    var ApplicationRouter = Backbone.Router.extend({
        view: null,
        routes: {
            "": "homeRoute",
            "db": "db",
            "db/": "db",
            "db/:id": "singleMovie",
            "db/:id/": "singleMovie"
        },
        closeCurrentView: function() {
            if (this.view !== null) {
                this.view.remove();
                this.view.unbind();
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
        },
        singleMovie: function(id) {
            this.closeCurrentView();
            this.view = new SingleView({
                id: id
            });
        }
    });
    var appRouter = new ApplicationRouter();
    Backbone.history.start({ pushState: true });

})(jQuery);
