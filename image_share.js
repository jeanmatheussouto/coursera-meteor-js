Images = new Mongo.Collection("images");

if (Meteor.isClient) {
  Template.images.helpers({images: Images.find()});

  Template.images.events({
    'click .js-image': function(event){
      $(event.target).css("width", "100px");
    },

    'click .js-delete-image': function(event){
      var image_id = this._id;
      $("#" + image_id).hide('slow', function(){
        Images.remove({"_id": image_id});
      });
    }
  });
}
