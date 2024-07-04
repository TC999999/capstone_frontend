import axios from "axios";

const BASE_URL =
  import.meta.env.VITE_REACT_APP_BASE_URL || "http://localhost:3000";

class marketAPI {
  static token = localStorage.getItem("market-token");

  static async request(endpoint, data = {}, method = "get") {
    console.debug("API Call:", endpoint, data, method);

    //there are multiple ways to pass an authorization token, this is how you pass it in the header.
    //this has been provided to show you another way to pass the token. you are only expected to read this code for this project.
    const url = `${BASE_URL}/${endpoint}`;
    const headers = { Authorization: `Bearer ${this.token}` };
    if (method === "post" && endpoint === "items") {
      headers["Content-Type"] = "multipart/form-data";
    }
    const params = method === "get" ? data : {};

    try {
      return (await axios({ url, method, data, params, headers })).data;
    } catch (err) {
      console.error("API Error:", err.response);
      let message = err.response.data.error.message;
      throw Array.isArray(message) ? message : [message];
    }
  }

  static async getAllUsers() {
    let res = await this.request(`users`);
    return res.users;
  }

  static async getCurrentUser() {
    let res = await this.request(`users/get/current`);
    return res.user;
  }

  static async getUserInfo(username) {
    let res = await this.request(`users/${username}`);
    return res.user;
  }
  static async getUserEmail(username) {
    let res = await this.request(`users/${username}/email`);
    return res.email;
  }

  static async updateUser(username, user) {
    let res = await this.request(`users/${username}`, user, "patch");
    return res.user;
  }

  static async updateUserAdminOnly(username, user) {
    let res = await this.request(
      `users/${username}/adminUpdate`,
      user,
      "patch"
    );
    return res.user;
  }

  static async getUserMessages(username) {
    let res = await this.request(`users/${username}/messages`);
    return res.messages;
  }

  static async getConversation(itemID, username1, username2) {
    let res = await this.request(
      `messages/conversation/item/${itemID}/users/${username1}/and/${username2}`
    );
    return res.conversation;
  }

  static async getMessagesForReports(username1, username2) {
    let res = await this.request(
      `messages/users/${username1}/and/${username2}`
    );
    return res.messages;
  }

  static async signUp(userInfo) {
    let res = await this.request("auth/register", userInfo, "post");
    this.token = res.token;
    return res.token;
  }

  static async logIn(userInfo) {
    let res = await this.request("auth/token", userInfo, "post");
    this.token = res.token;
    return res.token;
  }

  static async getAllItems() {
    let res = await this.request(`items`);
    return res.items;
  }

  static async getItemById(id) {
    let res = await this.request(`items/${id}`);
    return res.item;
  }

  static async sellItem(data) {
    let res = await this.request(`users/items/sale`, data, "post");
    return res.purchase;
  }

  static async updateItem(id, username, itemInfo) {
    let res = await this.request(
      `items/${id}/edit/${username}`,
      itemInfo,
      "patch"
    );
    return res.item;
  }

  static async getItemSeller(id) {
    let res = await this.request(`items/${id}/seller`);
    return res.sellerUser;
  }

  static async getItemName(id) {
    let res = await this.request(`items/getname/${id}`);
    return res.item;
  }

  static async getAllTypes() {
    let res = await this.request(`items/types/all`);
    return res.types;
  }

  static async getReccomendedItems(username) {
    let res = await this.request(`users/${username}/reccomendedItems`);
    return res.reccomendedItems;
  }

  static async getItemsInLocation(username) {
    let res = await this.request(`users/${username}/itemsInLocation`);
    return res.itemsInLocation;
  }

  static async searchForItems(searchParams) {
    let res = await this.request(`items`, searchParams);
    return res.items;
  }

  static async addItem(itemInfo) {
    let res = await this.request(`items`, itemInfo, "post");
    return res;
  }

  static async addReview(reviewInfo) {
    let res = await this.request(`reviews/post`, reviewInfo, "post");
    return res.review;
  }

  static async getReviewByID(id) {
    let res = await this.request(`reviews/${id}`);
    return res.review;
  }

  static async sendMessage(itemID, toUser, body) {
    let res = await this.request(
      `messages/post/${itemID}/to/${toUser}`,
      body,
      "post"
    );
    return res.message;
  }

  static async sendNotification(data) {
    let res = await this.request(`messages/notifications`, data, "post");
    return res.notification;
  }

  static async getAllReports(usernameData) {
    let res = await this.request(`reports`, usernameData);
    return res.reports;
  }

  static async getReportByID(id) {
    let res = await this.request(`reports/${id}`);
    return res.report;
  }

  static async addReport(reportInfo) {
    let res = await this.request(`reports`, reportInfo, "post");
    return res.report;
  }

  static async clearReport(id) {
    let res = await this.request(`reports/clear/${id}`, {}, "patch");
    return res.report;
  }
}

export default marketAPI;
