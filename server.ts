import express, { Request, Response } from "express";
import { Person } from "./@types";
import { IUserReposiroty } from "./dominio/interfaces/repositories/IPersonRepositor";
import { UserRepository } from "./repository/UserRepository";

const app = express();

app.use(express.json());

const PORT = 3000;

const _userRepository: IUserReposiroty = new UserRepository();

app.post("/user", async (req: Request, res: Response) => {
  const person = req.body as Person;

  const { status, body } = await _userRepository.createPerson(person);

  res.status(status).json({ body });
});

app.get("/users", async (req: Request, res: Response) => {
  const result = await _userRepository.getAllUsers();
  res.status(200).json({ people: result });
});

app.post("/getUser", async (req: Request, res: Response) => {
  const { email } = req.body;
  try {
    const { status, body } = await _userRepository.getUserByEmail(email);
    res.status(status).json(body);
  } catch (error: any) {
    if (error.message === "404") {
      res.status(404).json({ message: "Usuario não encontrado" });
    }
  }
});

app.delete("/deleteUser", async (req: Request, res: Response) => {
  const { email } = req.body;

  try {
    const { status, body } = await _userRepository.deleteUser(email);
    res.status(status).json({ body });
  } catch (error) {
    res.status(500).json({ message: "Erro de servidor" });
  }
});

app.put("/updateUser", async (req: Request, res: Response) => {
  try {
    const data = req.body as Person;
    const { status, body } = await _userRepository.updateUser(data.email, data);

    res.status(status).json({ body });
  } catch (error) {
    res.status(500).json({ message: "Erro ao atualizar a pessoa" });
  }
});

app.listen(PORT, () => {
  console.log(`Funfa na porta ${PORT}`);
});
