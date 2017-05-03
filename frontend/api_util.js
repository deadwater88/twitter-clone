const APIUtil = {
  followUser: id => {
    return $.ajax({
      dataType: 'json',
      method: "POST",
      url: `/users/${id}/follow`
    });

    // ...
  },

  unfollowUser: id => {
    return $.ajax({
      dataType: 'json',
      method: "delete",
      url: `/users/${id}/follow`
    });    // ...
  },

  searchUsers: (queryVal, success) => {
    return $.ajax({
      dataType: 'json',
      url: `/users/search`,
      data: {query: queryVal, success: success}
    });
  }
};

module.exports = APIUtil;
