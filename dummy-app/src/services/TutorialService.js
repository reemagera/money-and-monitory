import http from "../HttpCommon";

class TutorialDataService {
  getAll() {
    return http.get("/employees");
  }

  create(data) {
    console.log("console from service")
    return http.post("/register", data);
  }

  get(id) {
    return http.get(`/tutorials/${id}`);
  }

  update(id, data) {
    return http.put(`/tutorials/${id}`, data);
  }

  delete(id) {
    return http.delete(`/tutorials/${id}`);
  }

  deleteAll() {
    return http.delete(`/tutorials`);
  }

  findByTitle(title) {
    return http.get(`/tutorials?title=${title}`);
  }
}
export default new TutorialDataService();