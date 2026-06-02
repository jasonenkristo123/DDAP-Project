import api from "@/lib/axios";

export const getAllAchievements = async (params?: {
  search?: string;
  difficulty?: string;
  order?: string;
}) => {
  const res = await api.get("/api/achievements", { params });
  return res.data;
};

export const getAchievementByDifficulty = async (difficulty: string) => {
  const res = await api.get(`/api/achievements?difficulty=${difficulty}`);
  return res.data;
};

export const getAchievementSortBy = async (sortBy: string, orderBy: string) => {
  const res = await api.get(
    `/api/achievements/sort?sortBy=${sortBy}&order=${orderBy}`,
  );
  return res.data;
};

export const getUserAchievements = async (id: number) => {
  const res = await api.get(`/api/achievements/${id}`);
  return res.data;
};
