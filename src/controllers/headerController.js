import userRepository from "../repositories/userRepository.js";

export async function getUser(req, res) {
  const { character } = req.params;

  try {
    const user = await userRepository.getUserByCharacter(character);
    res.status(200).send(user.rows);
  } catch (error) {
    console.log(error);
    res.status(500).send(error.detail);
  }
}
