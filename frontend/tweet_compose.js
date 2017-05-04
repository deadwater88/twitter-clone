let APIUtil = require("./api_util.js");
class TweetCompose {
  constructor($el) {
    this.$el = $($el);
    this.handleClick();
    this.handleCharsLeft();
    this.handleMention();
  }

  handleClick(){
    this.$el.on('submit', (e)=>{
      e.preventDefault();
      // debugger
      let data = this.$el.serializeJSON();
      $(":input").prop("disabled", true);
      APIUtil.createTweet(data).then(this.handleSuccess.bind(this));
    });
  }

  clearInput(){
    $(":input").val("");
  }

  handleCharsLeft(){
    let textarea = $('#textarea');
    let charCount = $('.chars-left');
    textarea.on('keyup', (e) => {
      let currentCount = textarea.val().length;
      charCount.text(`${140-currentCount} characters left`);
    });
  }

  handleMention(){
    let anchor = $('.add-mentioned-user');
    let div = $('.mentioned-users');
    let script = $('label script');

    let html = script.html();
    // debugger;
    anchor.on('click', (e) => {
      e.preventDefault();
      div.append(html);
      // debugger;



    });
    return false;
  }

  addMentionedUser(){

  }

  handleSuccess(response){
    this.clearInput();
    $(":input").prop("disabled", false);
    let target_ul = $(this.$el.data('tweets-ul'));
    let $tweet = $('<li></li>');
    let content = response.content;
    let author = response.user;
    let created_at = response.created_at;
    console.log(response);
    $tweet.text(`${content} -- ${author.username} -- ${created_at}`);
    target_ul.append($tweet);
  }

}

module.exports = TweetCompose;
