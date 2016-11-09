var databaseView = Backbone.View.extend({
    events: {
        "click .showDb": "databaseView"
    },
    initialize: function(){
        console.log("initialize databaseView");
    },
    showDb: function(){
        console.log("click initialize");
    }

});
