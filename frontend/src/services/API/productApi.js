import axios from "axios";
import {
  createProductFailed,
  createProductStart,
  createProductSucess,
  deleteProductFailed,
  deleteProductStart,
  deleteProductSuccess,
  getProductDetailFailed,
  getProductDetailStart,
  getProductDetailSuccess,
  getProductFailed,
  getProductFilterFailed,
  getProductFilterStart,
  getProductFilterSuccess,
  getProductPanigationFailed,
  getProductPanigationStart,
  getProductPanigationSuccess,
  getProductStart,
  getProductSuccess,
} from "../../redux/productSlice";
import { DOMAIN } from "../../utils/settings/config";

export const getListProduct = async (dispatch, params) => {
  dispatch(getProductStart());
  try {
    const response = await axios.get(`${DOMAIN}/api/v1/products/`, { params });
    dispatch(getProductSuccess(response.data));
  } catch (err) {
    dispatch(getProductFailed(err.response.data)); // Capture de l'erreur avec response.data
  }
};

export const getListProductPanigation = async (dispatch, queryParams) => {
  dispatch(getProductPanigationStart());
  try {
    const response = await axios.get(`${DOMAIN}/api/v1/products/`, { params: queryParams });
    dispatch(getProductPanigationSuccess(response.data));
  } catch (err) {
    dispatch(getProductPanigationFailed(err.response.data)); // Capture de l'erreur avec response.data
  }
};

export const getListProductFilter = async (dispatch, queryParams) => {
  dispatch(getProductFilterStart());
  try {
    const response = await axios.get(`${DOMAIN}/api/v1/products/`, { params: queryParams });
    dispatch(getProductFilterSuccess(response.data));
  } catch (err) {
    dispatch(getProductFilterFailed(err.response.data)); // Capture de l'erreur avec response.data
  }
};

export const getProductById = async (dispatch, id) => {
  dispatch(getProductDetailStart());
  try {
    const response = await axios.get(`${DOMAIN}/api/v1/products/${id}`);
    dispatch(getProductDetailSuccess(response.data));
  } catch (err) {
    dispatch(getProductDetailFailed(err.response.data)); // Capture de l'erreur avec response.data
  }
};

export const createProduct = async (dispatch, params) => {
  dispatch(createProductStart());
  try {
    await axios.post(`${DOMAIN}/api/v1/products`, params);
    dispatch(createProductSucess());
  } catch (err) {
    dispatch(createProductFailed(err.response.data)); // Capture de l'erreur avec response.data
  }
};

export const deleteProduct = async (dispatch, id) => {
  dispatch(deleteProductStart());
  try {
    await axios.delete(`${DOMAIN}/api/v1/products/${id}`);
    dispatch(deleteProductSuccess());
  } catch (err) {
    dispatch(deleteProductFailed(err.response.data)); // Capture de l'erreur avec response.data
  }
};
