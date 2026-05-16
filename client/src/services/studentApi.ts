import axiosInstance from "./axios";

export const createStudent = async (
  payload: string
) => {
  const response =
    await axiosInstance.post(
      "/register",
      {
        data: payload,
      }
    );

  return response.data;
};

export const fetchStudents =
  async () => {
    const response =
      await axiosInstance.get(
        "/students"
      );

    return response.data;
  };

export const updateStudent =
  async (
    id: string,
    payload: string
  ) => {
    const response =
      await axiosInstance.put(
        `/student/${id}`,
        {
          data: payload,
        }
      );

    return response.data;
  };

export const removeStudent =
  async (id: string) => {
    const response =
      await axiosInstance.delete(
        `/student/${id}`
      );

    return response.data;
  };