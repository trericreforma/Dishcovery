const { BASE_URL, TIMEOUT } = require("../config");

function toggleBookmark(recipeId, callback) {
  wx.request({
    url: `${BASE_URL}/bookmarks`,
    method: 'GET',
    success(res) {
      const existing = res.data.find(b => b.recipe_id === recipeId);
      if (existing) {
        wx.request({
          url: `${BASE_URL}/bookmarks/${existing.id}`,
          method: 'DELETE',
          success: () => callback && callback({ action: 'deleted' }),
          fail: (err) => callback && callback(null, err)
        });
      } else {
        wx.request({
          url: `${BASE_URL}/bookmarks`,
          method: 'POST',
          data: { recipe_id: recipeId },
          success: () => callback && callback({ action: 'created' }),
          fail: (err) => callback && callback(null, err)
        });
      }
    },
    fail(err) {
      callback && callback(null, err);
    }
  });
}

function getBookmarks() {
  return new Promise((resolve, reject) => {
    wx.request({
      url: `${BASE_URL}/bookmarks`,
      method: "GET",
      success(res) {
        if (res.statusCode === 200) {
          // Ensure we always return an array
          if (Array.isArray(res.data)) {
            resolve(res.data);
          } else {
            console.error("Unexpected bookmarks response:", res.data);
            resolve([]); // fallback empty array
          }
        } else {
          reject(res.data);
        }
      },
      fail(err) {
        reject(err);
      }
    });
  });
}

function updateBookmark(id, data, callback) {
  wx.request({
    url: `${BASE_URL}/bookmarks/${id}`,
    method: 'PUT',
    data,
    success: (res) => callback && callback(res.data),
    fail: (err) => callback && callback(null, err)
  });
}

function deleteBookmark(id, callback) {
  wx.request({
    url: `${BASE_URL}/bookmarks/${id}`,
    method: 'DELETE',
    success: (res) => callback && callback(res.data),
    fail: (err) => callback && callback(null, err)
  });
}

function checkBookmark(recipeId) {
  return new Promise((resolve, reject) => {
    wx.request({
      url: `${BASE_URL}/bookmarks/check/${recipeId}`,
      method: 'GET',
      success(res) {
        if (res.statusCode === 200) {
          resolve(res.data); // { isBookmarked: true/false, bookmarkId? }
        } else {
          reject(res.data);
        }
      },
      fail(err) {
        reject(err);
      }
    });
  });
}

module.exports = {
  toggleBookmark,
  getBookmarks,
  updateBookmark,
  deleteBookmark,
  checkBookmark
};
