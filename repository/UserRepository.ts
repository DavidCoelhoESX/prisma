import { PrismaClient } from "@prisma/client";
import { Person, Result } from "../@types";
import { Prisma } from "@prisma/client";
import { IUserReposiroty } from "../dominio/interfaces/repositories/IPersonRepositor";

const prisma = new PrismaClient();

export class UserRepository implements IUserReposiroty {
  createPerson = async (person: Person): Promise<Result> => {
    try {
      const newPerson = await prisma.people.create({
        data: {
          name: person.name,
          email: person.email,
          age: person.age,
        },
      });
      return {
        status: 200,
        body: newPerson,
      };
    } catch (error) {
      if (error instanceof Prisma.PrismaClientKnownRequestError) {
        switch (error.code) {
          case "P2002":
            return {
              status: 409,
              body: "Email já está em uso",
            };
        }
      }
      return {
        status: 500,
        body: "Erro na criação da pessoa",
      };
    }
  };

  getAllUsers = async (): Promise<Person[]> => {
    const people = await prisma.people.findMany();
    return people;
  };

  getUserByEmail = async (email: string): Promise<Result> => {
    const user = await prisma.people.findUnique({
      where: { email: email },
    });
    // console.log("teste");

    if (!user) throw new Error("404");

    return {
      status: 200,
      body: user!,
    };
  };

  deleteUser = async (email: string): Promise<Result> => {
    try {
      const deletedUser = await prisma.people.delete({
        where: { email },
      });
      return {
        status: 200,
        body: deletedUser,
      };
    } catch (error) {
      if (error instanceof Prisma.PrismaClientKnownRequestError) {
        switch (error.code) {
          case "P2025":
            return {
              status: 404,
              body: "Usuario não encontrado",
            };
        }
      }
      return {
        status: 500,
        body: "Erro de servidor",
      };
    }
  };

  updateUser = async (
    email: string,
    userData: Partial<Person>
  ): Promise<Result> => {
    try {
      const updatedUser = await prisma.people.update({
        where: { email },
        data: userData,
      });
      return {
        status: 200,
        body: updatedUser,
      };
    } catch (error) {
      if (error instanceof Prisma.PrismaClientKnownRequestError) {
        switch (error.code) {
          case "P2025":
            return {
              status: 404,
              body: "Usuario não encontrada",
            };
        }
      }
      return {
        status: 500,
        body: "Erro ao atualizar a pessoa",
      };
    }
  };
}
