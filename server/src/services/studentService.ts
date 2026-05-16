import Student from "../models/Student";

export const createStudentService =
  async (
    encryptedData: string
  ) => {
    return await Student.create({
      data: encryptedData,
    });
  };

export const getStudentsService =
  async () => {
    return await Student.find();
  };

export const updateStudentService =
  async (
    id: string,
    encryptedData: string
  ) => {
    return await Student.findByIdAndUpdate(
      id,
      {
        data: encryptedData,
      },

      {
        new: true,
      }
    );
  };

export const deleteStudentService =
  async (id: string) => {
    return await Student.findByIdAndDelete(
      id
    );
  };