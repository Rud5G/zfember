App = Ember.Application.create();

App.Router.map(function() {
    this.resource('home', {
        path: '/'
    });
    this.resource('about');
    this.resource('contact');
});

App.HomeRoute = Ember.Route.extend({
   beforeModel: function() {
     return $.ajax({
        url: '/'
     })
     .then(function(response) {
        Ember.TEMPLATES.home = Ember.Handlebars.compile(response);
    });
   }
});

App.AboutRoute = Ember.Route.extend({
   beforeModel: function() {
     return $.ajax({
        url: '/about'
     })
     .then(function(response) {
        Ember.TEMPLATES.about = Ember.Handlebars.compile(response);
    });
   }
});

App.ContactRoute = Ember.Route.extend({
   beforeModel: function() {
     return $.ajax({
        url: '/contact'
     })
     .then(function(response) {
        Ember.TEMPLATES.contact = Ember.Handlebars.compile(response);
    });
   }
});

if (window.history && window.history.pushState) {
    App.Router.reopen({
      location: 'history'
    });
}

App.LinkLiComponent = Ember.Component.extend({
  tagName: 'li',
  classNameBindings: ['active'],
  active: function() {
    return this.get('childViews').anyBy('active');
  }.property('childViews.@each.active')
});

Em.Handlebars.helper('link-li', App.LinkLiComponent);