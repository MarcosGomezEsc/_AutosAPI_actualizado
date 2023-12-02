import { Autos_Models } from "./Autos_Model.js";
import { isValidUUID } from "../utils/isValidUUID.js";

export class Autos_Crtl {
  static async getAll(req, res) {
    res.header("Access-Control-Allow-Origin", "*");
    const { Marca } = req.query;
    const autos = await Autos_Models.getAll(Marca);

    autos
      ? res.status(200).json(autos)
      : res.status(404).json({ message: "Autos Not Found" });
  }

  //busca por ID
  static async getById(req, res) {
    const { id } = req.params;
    const isValidID = isValidUUID(id);
    if (!isValidID) return res.status(422).json({ message: "Not valid ID" });

    const autos = await Autos_Models.getById(id);
    if (!autos) return res.status(404).json({ message: "Auto Not Found" });

    res.status(200).json(autos);
    console.log(autos);
  }

  //borra una peli
  static async deleteOne(req, res) {
    const { id } = req.params;
    const isValidID = isValidUUID(id);
    if (!isValidID) return res.status(422).json({ message: "Not valid ID" });

    const result = await Autos_Models.deleteOne(id);
    if (!result) return res.status(404).json({ message: "Car Not Found" });

    res.status(204).end();
  }

  //ubsca por director
  /*  static async getByQuery(req, res) {
    if (!req.query.Marca)
      return res
        .status(400)
        .json({ message: `debe tener el nombre similar a ${Marca}` });
  }
*/

  //crea nuevo post de auto
  static async addOne(req, res) {
    const {
      Marca,
      Modelo,
      Anio,
      Color,
      TipoCombustible,
      Precio,
      NumPuertas,
      Motor,
      Imagen,
    } = req.body;

    try {
      await Autos_Models.addOne({
        Marca,
        Modelo,
        Anio,
        Color,
        TipoCombustible,
        Precio,
        NumPuertas,
        Motor,
        Imagen,
      });

      res.status(201).json({ message: "Auto created" });
    } catch (error) {
      res.status(500).json({ message: "Internal Server Error" });
    }
  }

  //actualizar
  static async updateOne(req, res) {
    const { id } = req.params;
    const isValidID = isValidUUID;
    if (!isValidID) return res.status(422).json({ message: "id no válido" });
    const [isAuto_Nuevo, _info] = await Autos_Models.getById(id);

    if (!isAuto_Nuevo)
      return res.status(404).json({ message: "Auto No Encontrado" });
    const Actualizacion_Auto = await Autos_Models.updateOne(id, req.body);
    Actualizacion_Auto
      ? res.status(200).json({ message: "auto encontrado" })
      : res.status(500).json({ message: "error servicio interno" });
  }
}
