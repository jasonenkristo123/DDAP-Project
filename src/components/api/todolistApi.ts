import api from "@/lib/axios";

export interface todoData {
  title: string;
  description?: string;
  priority: string;
  category: string;
  due_date?: string;
  status?: string;
}

export interface TodoQueryParams {
  search?: string;
  category?: string;
  sortBy?: string;
  orderBy?: string;
  limit?: number;
  page?: number;
}

export const createTodos = async (data: todoData) => {
  const res = await api.post("/api/todos", data);
  return res.data;
};

export const updateTodos = async (id: number, data: Partial<todoData>) => {
  const res = await api.patch(`/api/todos/${id}`, data);
  return res.data;
};

export const getAllTodos = async (params?: TodoQueryParams) => {
  const res = await api.get("/api/todos", { params });
  return res.data;
};

export const getTodosBySearch = async (search: string) => {
  const res = await api.get(`/api/todos?search=${search}`);
  return res.data;
};

export const getTodosByType = async (category: string) => {
  const res = await api.get(`/api/todos?category=${category}`);
  return res.data;
};

export const getTodosBySort = async (sort: string) => {
  const res = await api.get(`/api/todos?sortBy=${sort}`);
  return res.data;
};

export const deleteTodos = async (id: number) => {
  const res = await api.delete(`/api/todos/${id}`);
  return res.data;
};

export const getAllTotalTodos = async () => {
  const res = await api.get("/api/todos");
  return res.data.meta.totalItems;
};
