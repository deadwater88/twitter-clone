let APIUtil = require('./api_util.js');
let FollowToggle = require('./follow_toggle.js');

class UsersSearch {
  constructor($el){
    this.$el = $el;
    this.input = $($el.input);
    this.ul = $($el.ul);
    this.handleInput();
  }

  handleInput(){
    $('input').on("keyup",(e)=>{
      console.log("event fired");
      let $input = $(e.currentTarget);
      APIUtil.searchUsers($input.val()).then(this.renderResults, (res) => console.log(res));
    });
  }


  renderResults(response){
    $(".user").remove();
    let users = $('.users');
    console.log(response);
    response.forEach((user) => {
      let entry = $('<li></li>');
      let anchor = $('<a></a>');
      anchor.attr("href", `/users/${user.id}`);
      entry.addClass("user");
      anchor.text(user.username);


      let follow_button = $("<button></button>");
      let fState = (user.followed ? "following" : "notFollowing");
      let user_options = {userId: user.id,
        followState: fState};
      new FollowToggle(follow_button, user_options);

      entry.append(anchor);
      entry.append(follow_button);
      users.append(entry);
    });
  }
}

module.exports = UsersSearch;
