console.log('Running lib/collections');

Images = new Mongo.Collection("images");

Images.allow({
  insert: function(userID, doc){
    if(!Meteor.user() || userID != doc.createdBy) { return false; }
    return true;
  },

  remove: function(userID, doc){
    if(!Meteor.user() || userID != doc.createdBy) { return false; }
    return true;
  }
});
