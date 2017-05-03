let APIUtil = require("./api_util.js");

class FollowToggle {
  constructor($el, options) {
    this.userId = $el.data("user-id") || options.userId;
    this.followState = $el.data("follow-state")|| options.followState;
    this.$el = $el;
    this.handleClick();
    this.render();
  }

  render(){
    this.$el.prop("disabled", false);
    switch (this.followState) {
      case "following":
        this.$el.text("Unfollow!");
        break;
      case "notFollowing":
        this.$el.text("Follow!");
        break;
      default:
        this.$el.prop("disabled", true);
        break;
    }
  }

  handleClick(){
    this.$el.on('click', (e) => {
      e.preventDefault();
      let ajaxcall = (this.followState === "notFollowing" ? APIUtil.followUser : APIUtil.unfollowUser);
      this.followState = (this.followState === "notFollowing" ? "tryingToFollow" : "tryingToUnfollow");
      this.render();
      ajaxcall(this.userId)
        .then(()=> this.toggle())
        .then(()=> this.render());
    });
  }

  toggle(){
    switch (this.followState) {
      case "tryingToUnfollow":
        this.followState = "notFollowing";
        break;
      case "tryingToFollow":
        this.followState = "following";
        break;
      default:
        this.$el.prop("disabled", true);
        break;
    }
  }
}

module.exports = FollowToggle;
