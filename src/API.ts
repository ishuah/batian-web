import axios from "axios";
import { LayerObject, MapObject } from "./views/Map/Map.types";

const BASE_URL = "http://localhost:8000/api/v1";
const headers = {'Authorization': `ApiKey ${process.env.REACT_APP_API_USERNAME}:${process.env.REACT_APP_API_KEY}`};

const AxiosInstance = axios.create({
    baseURL: BASE_URL,
    headers: headers
  });

export function getMaps(): Promise<Array<MapObject>> {
  return axios.get(`${BASE_URL}/map`, {headers})
              .then((response) => {
                return response.data["objects"] as MapObject[];
              });
}

export function getMap(mapId: string): Promise<MapObject> {
  return axios.get(`${BASE_URL}/map/${mapId}`, {headers})
              .then((response) => {
                return response.data as MapObject;
              });
}

export function getSites(layer: LayerObject, limit: number, page: number): Promise<LayerObject> {
  const offset = (page - 1) * limit;
  return axios.get(`${BASE_URL}/site/?limit=${limit}&offset=${offset}&layer=${layer.id}`, {headers})
              .then((response) => {
                layer.sites = [...layer.sites, ...response.data["objects"]];
                if (response.data["meta"]["next"]) {
                  return getSites(layer, limit, page+1);
                }
                return layer;
              });
}
  

export default AxiosInstance;