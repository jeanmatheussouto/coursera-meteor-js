// Routes
Router.configure({
  layoutTemplate: 'ApplycationLayout'
});

Router.route('/', function () {
  this.render('welcome', {
    to: "main",
    data: function () { return {username: 'Jean'} }
  });
});

Router.route('/images', function() {
  this.render('navbar', {
    to: 'navbar'
  });
  this.render('images', function() {
    to: 'main'
  });
});

// Infinity scroll
var lastScrollTop = 0;
Session.set("imagesLimit", 8);
$(window).scroll(function (event) {
  if ($(window).scrollTop() + $(window).height() > $(document).height() - 100){
    var scrollTop = $(this).scrollTop();
    if (scrollTop > lastScrollTop) {
      Session.set("imagesLimit", Session.get('imagesLimit') + 4);
    }
    lastScrollTop = scrollTop;
  }
});

Accounts.ui.config({
  passwordSignupFields: "USERNAME_AND_EMAIL"
});


Template.images.helpers({
  images: function(){
    if (Session.get('userFilter')) {
      return Images.find({createdBy: Session.get('userFilter')}, {sort: {createdAt: -1, rating: -1}, limit: Session.get('imagesLimit')})
    }
    return Images.find({}, {sort: {createdAt: -1, rating: -1}, limit: Session.get('imagesLimit')});
  },

  getUser: function(user_id){
    var user = Meteor.users.findOne({_id: user_id});
    if (user) {
      return user.username;
    } else {
      return "Anonymous"
    }
  },

  getFilterUser: function(){
    if (Session.get('userFilter')) {
      return Meteor.users.findOne({_id: Session.get('userFilter')}).username;
    }
    return false;
  },

  filtering_images_by_user: function(){
    return !!Session.get('userFilter');
  }

});

Template.body.helpers({
  username: function(){
    if (Meteor.user()) {
      return Meteor.user().username
    }
    return "Anonymous User"
  }
});

Template.body.events({
  'click .js-show-image-modal': function(event){
    $("#image_add_form").modal('show');
  }
});

Template.images.events({
  'click .js-image': function(event){
    $(event.target).css("width", "100px");
  },

  'click .js-delete-image': function(event){
    var image_id = this._id;
    $("#" + image_id).hide('slow', function(){
      Images.remove({"_id": image_id});
    });
  },

  'click .js-rate-image': function(event){
    var rate = $(event.currentTarget).data('userrating')
    var image_id = this.id;
    Images.update({_id: image_id}, {$set: {rating: rate}});
  },

  'click .js-set-user-filter': function(event){
    Session.set('userFilter', this.createdBy);
  },

  'click .js-unset-user-filter': function(event){
    Session.set('userFilter', undefined);
  }

});

Template.image_add_form.events({
  'submit .js-add-image': function(event){
    var img_src = event.target.img_src.value;
    var img_alt = event.target.img_alt.value;
    if(Meteor.user()){
      Images.insert({
        img_src: img_src,
        img_alt: img_alt,
        createdAt: new Date(),
        createdBy: Meteor.user()._id
      });
    }

    $("#image_add_form").modal('hide');

    return false;
  }
});
