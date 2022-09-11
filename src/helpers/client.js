import axios from "axios";
import isEmpty from "lodash/isEmpty";
class APIClient {
  constructor(userId) {
    this.baseApiUrl =
      process.env.BASE_API_URL || "http://135.125.191.18:8080/api";
    this.endpoints = {
      getExpenses: "/users/{userId}/expenses",
      getAggregatedExpenses:
        "/users/{userId}/expenses/aggregated/{aggregationName}",
      getCategories: "/categories",
    };
    this.userId = userId;
  }

  request(method, endpoint, pathParams, params) {
    if (!isEmpty(pathParams)) {
      Object.entries(pathParams).forEach(([name, value]) => {
        endpoint = endpoint.replace(`{${name}}`, value);
      });
    }
    return axios.request({
      url: endpoint,
      method,
      params,
      baseURL: this.baseApiUrl,
    });
  }

  getExpenses({ dateFrom, dateTo, category = null }) {
    if (category === "") {
      category = null;
    }
    return this.request(
      "GET",
      this.endpoints.getExpenses,
      { userId: this.userId },
      {
        /* eslint-disable */
        date_from: dateFrom,
        date_to: dateTo,
        category: category,
        is_expense: true,
      }
    );
  }

  getStatistics(aggregationName, aggFunc, dateFrom, dateTo) {
    return this.request(
      "GET",
      this.endpoints.getAggregatedExpenses,
      { userId: this.userId, aggregationName },
      {
        /* eslint-disable */
        agg_func: aggFunc,
        date_from: dateFrom,
        date_to: dateTo,
        is_expense: true,
      }
    );
  }

  getCategories() {
    return this.request("GET", this.endpoints.getCategories);
  }

  getDebts(dateFrom, dateTo) {
    return this.request(
      "GET",
      this.endpoints.getExpenses,
      {
        userId: this.userId,
      },
      { date_from: dateFrom, date_to: dateTo, category: "Долги" }
    );
  }
}

export default APIClient;
