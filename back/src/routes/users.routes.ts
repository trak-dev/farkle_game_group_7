import { FastifyInstance } from "fastify";
import User from "../models/user.model";
import User_Classe from "../classes/user";

interface loginInterface {
  email: string;
  password: string;
}

async function userRoutes(router: FastifyInstance) {
  router.post<{ Body: User }>("/register", async (req, reply) => {
    try {
      if (!req.body || !req.body.email || !req.body.password || !req.body.pseudo) throw "Missing parameters";
      const { email, password, pseudo } = req.body;
      const userTokenAndId = await User_Classe.register(email, password, pseudo);
      reply.status(200).send(userTokenAndId);
    } catch (error) {
      console.error(error);
      reply.status(500).send(error);
    }
  });

  router.post<{ Body: loginInterface }>("/login", async (req, reply) => {
    try {
      if (!req.body || !req.body.email || !req.body.password)
        throw "Missing parameters";
      const { email, password } = req.body;
      const userTokenAndId = await User_Classe.login(email, password);
      reply.status(200).send(userTokenAndId);
    } catch (error) {
      console.error(error);
      reply.status(500).send(error);
    }
  });

  router.get("/isUserConnected", async (req, reply) => {
    try {
      const logged = await User_Classe.isUserLoggedIn(
        req.headers.authorization!
      );
      reply.status(200).send({ logged });
    } catch (error) {
      console.error(error);
      reply.status(500).send(error);
    }
  });
}

module.exports = userRoutes;
