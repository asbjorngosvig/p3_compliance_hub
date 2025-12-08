import { instance } from "./axiosClient";

const get = (location: String) => {
    return instance.get<String>("/locations"+location);
};

export const locationsService = {
  get,
};