import {
  Request,
  Response,
} from "express";

import {
  decryptFrontendData,
  encryptBackendData,
  decryptBackendData,
} from "../utils/crypto";

import {
  createStudentService,
  getStudentsService,
  updateStudentService,
  deleteStudentService,
} from "../services/studentService";

export const registerStudent =
  async (
    req: Request,
    res: Response
  ) => {
    try {
      const frontendEncryptedData =
        req.body.data;

      // First decrypt frontend layer
      const decryptedData =
        decryptFrontendData(
          frontendEncryptedData
        );

      // Apply second encryption
      const backendEncryptedData =
        encryptBackendData(
          decryptedData
        );

      const student =
        await createStudentService(
          backendEncryptedData
        );

      res.status(201).json({
        success: true,

        message:
          "Student Registered",

        data: student,
      });
    } catch (error) {
      console.log(error);

      res.status(500).json({
        success: false,

        message:
          "Registration Failed",
      });
    }
  };

export const getStudents =
  async (
    req: Request,
    res: Response
  ) => {
    try {
      const students =
        await getStudentsService();

      const decryptedStudents =
        students.map(
          (student: any) => {
            return {
              _id: student._id,

              data:
                decryptBackendData(
                  student.data
                ),
            };
          }
        );

      res.status(200).json({
        success: true,

        data: decryptedStudents,
      });
    } catch (error) {
      console.log(error);

      res.status(500).json({
        success: false,

        message:
          "Fetch Failed",
      });
    }
  };

export const updateStudent =
  async (
    req: Request,
    res: Response
  ) => {
    try {
      const id = req.params.id as string;

      const frontendEncryptedData =
        req.body.data;

      const decryptedData =
        decryptFrontendData(
          frontendEncryptedData
        );

      const backendEncryptedData =
        encryptBackendData(
          decryptedData
        );

      const updatedStudent =
        await updateStudentService(
          id,
          backendEncryptedData
        );

      res.status(200).json({
        success: true,

        data: updatedStudent,
      });
    } catch (error) {
      console.log(error);

      res.status(500).json({
        success: false,

        message:
          "Update Failed",
      });
    }
  };

export const deleteStudent =
  async (
    req: Request,
    res: Response
  ) => {
    try {
      const id = req.params.id as string;

      await deleteStudentService(
        id
      );

      res.status(200).json({
        success: true,

        message:
          "Student Deleted",
      });
    } catch (error) {
      console.log(error);

      res.status(500).json({
        success: false,

        message:
          "Delete Failed",
      });
    }
  };