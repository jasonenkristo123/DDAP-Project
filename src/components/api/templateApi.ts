import api from "@/lib/axios";

export interface templateData {
  title: string;
  description: string;
  category: string;
  priority: string;
  due_days: number;
}

export const getAllTemplates = async (search?: string) => {
  const res = await api.get(`/api/templates`, {
    params: search ? { search } : {},
  });
  return res.data;
};

export const createTemplate = async (data: templateData) => {
  const res = await api.post(`/api/templates`, data);
  return res.data;
};

export const useTemplate = async (id: number | string) => {
  const res = await api.post(`/api/templates/${id}/use`);
  return res.data;
};
