import http from "./http-common";

const getAll = () => {
  return http.get("/companies");
};

const get = (id) => {
  return http.get(`/companies/${id}`);
};

const create = (data) => {
  return http.post("/companies", data);
};

const update = (id, data) => {
  return http.put(`/companies/${id}`, data);
};

const remove = (id) => {
  return http.delete(`/companies/${id}`);
};

const removeAll = () => {
  return http.delete(`/companies`);
};

const findByTitle = (title) => {
  return http.get(`/companies?title=${title}`);
};

const TutorialService = {
  getAll,
  get,
  create,
  update,
  remove,
  removeAll,
  findByTitle,
};

export default TutorialService;