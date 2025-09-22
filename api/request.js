const { BASE_URL, TIMEOUT } = require("./config");

const request = (url, method = "GET", data = {}, headers = {}) => {
  return new Promise((resolve, reject) => {
    wx.request({
      url: `${BASE_URL}${url}`,
      method,
      data,
      header: {
        "Content-Type": "application/json",
        ...headers,
      },
      timeout: TIMEOUT,
      success(res) {
        if (res.statusCode === 200) {
          resolve(res.data);
        } else {
          reject({
            statusCode: res.statusCode,
            message: res.data?.message || "API Error",
          });
        }
      },
      fail(err) {
        reject(err);
      },
    });
  });
};

module.exports = {
  get: (url, data, headers) => request(url, "GET", data, headers),
  post: (url, data, headers) => request(url, "POST", data, headers),
  put: (url, data, headers) => request(url, "PUT", data, headers),
  del: (url, data, headers) => request(url, "DELETE", data, headers),
};
