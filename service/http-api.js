/**
 * Created by xbh 2019-07-16 集中api
 */
const prefix = require('../conf/resource').url.api;
const http = require('./http-fetch');

const api = {
    category: {
        create: (data) => http.post(`${prefix}/admin/category/create`, data),
        delete: (id) => http.del(`${prefix}/admin/category/delete/${id}`),
        update: (id, data) => http.put(`${prefix}/admin/category/update/${id}`, data),
        list: () => http.get(`${prefix}/admin/category/list`)
    },
    type: {
        create: (data) => http.post(`${prefix}/admin/type/create`, data),
        delete: (id) => http.del(`${prefix}/admin/type/delete/${id}`),
        update: (id, data) => http.put(`${prefix}/admin/type/update/${id}`, data),
        list: (pageNum, pageSize) => http.get(`${prefix}/admin/type/list?&pageNum=${pageNum}&pageSize=${pageSize}`),
        categoryList: (categoryId, pageNum, pageSize) => http.get(`${prefix}/admin/type/list?categoryId=${categoryId}&pageNum=${pageNum}&pageSize=${pageSize}`),
        cateList: (categoryId) => http.get(`${prefix}/admin/type/categoryList?categoryId=${categoryId}`),
    },
    content: {
        create: (data) => http.post(`${prefix}/admin/contents/create`, data),
        addPage: () => http.get(`${prefix}/admin/contents/addpage`),
        delete: (id) => http.del(`${prefix}/admin/contents/delete/${id}`),
        update: (id, data) => http.put(`${prefix}/admin/contents/update/${id}`, data),
        list: (data) => http.post(`${prefix}/admin/contents/list`, data),
    },
    label: {
        create: (data) => http.post(`${prefix}/admin/labels/create`, data),
        delete: (id) => http.del(`${prefix}/admin/labels/delete/${id}`),
        update: (id, data) => http.put(`${prefix}/admin/labels/update/${id}`, data),
        list: (pageNum, pageSize) => http.get(`${prefix}/admin/labels/list?pageNum=${pageNum}&pageSize=${pageSize}`),
    },
    link: {
        create: (data) => http.post(`${prefix}/admin/links/create`, data),
        delete: (id) => http.del(`${prefix}/admin/links/delete/${id}`),
        update: (id, data) => http.put(`${prefix}/admin/links/update/${id}`, data),
        list: (status, pageNum, pageSize) => http.get(`${prefix}/admin/links/list?status=${status}&pageNum=${pageNum}&pageSize=${pageSize}`),
    },
    special: {
        create: (data) => http.post(`${prefix}/admin/special/create`, data),
        delete: (id) => http.del(`${prefix}/admin/special/delete/${id}`),
        update: (id, data) => http.put(`${prefix}/admin/special/update/${id}`, data),
        list: () => http.get(`${prefix}/admin/special/list`),
        detail: (id) => http.get(`${prefix}/admin/special/${id}`),
    },
};
module.exports = api;