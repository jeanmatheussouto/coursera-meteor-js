Meteor.startup(function() {
  if (Images.find().count() == 0) {
    var IMAGES_COUNT = 23;
    for(var i = 1; i < IMAGES_COUNT; i++){
      Images.insert(
        { img_src: "images/img_" + i + ".jpg", img_alt: "Image number " + i }
      );
    }
    console.log("Images count: " + Images.find().count());
  }
});
