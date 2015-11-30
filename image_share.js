Images = new Mongo.Collection("images");

if (Meteor.isClient) {
  Template.images.helpers({
    images: Images.find({}, {sort: {createdAt: -1, rating: -1}})
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
    'click .js-show-image-modal': function(event){
      $("#image_add_form").modal('show');
    }
  });

  Template.image_add_form.events({
    'submit .js-add-image': function(event){
      var img_src = event.target.img_src.value;
      var img_alt = event.target.img_alt.value;

      Images.insert({
        img_src: img_src,
        img_alt: img_alt,
        createdAt: new Date()
      });

      $("#image_add_form").modal('hide');

      return false;
    }
  });
}
