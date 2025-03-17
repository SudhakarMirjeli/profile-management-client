import axios from "axios";

const API_BASE_URL = "http://35.154.84.189:4001/profile";

export const createProfile = (profileData) => axios.post(API_BASE_URL, profileData);
export const getProfile = (userId) => axios.get(`${API_BASE_URL}/${userId}`);
export const getProfiles = (userId) => axios.get(`${API_BASE_URL}`);

export const updateProfile = (userId, profileData) => axios.put(`${API_BASE_URL}/${userId}`, profileData);
export const deleteProfile = (userId) => axios.delete(`${API_BASE_URL}/${userId}`);
