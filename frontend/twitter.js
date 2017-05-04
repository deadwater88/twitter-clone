const FollowToggle = require("./follow_toggle.js");
const UsersSearch = require("./users_search.js");
const TweetCompose = require("./tweet_compose.js");

$(()=> {
  $(".follow-toggle").each((index, el)=>{
    let follow_toggle = new FollowToggle($(el));
  });

  $(".users-search").each((index, el)=>{
    // debugger;
    let user_search = new UsersSearch($(el));
  });

  $(".tweet-compose").each((index, el)=>{
    new TweetCompose($(el));
  });
});
