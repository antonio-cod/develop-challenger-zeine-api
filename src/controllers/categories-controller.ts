import { prisma } from "@/database/prisma";
import { AppError } from "@/utils/AppError";
import { Request, Response } from "express";

import { z, ZodError } from "zod";

class CategoryController {
  async create(request: Request, response: Response) {
    try {
      const bodySchema = z.object({
        name: z.string().trim().min(3, { message: "Nome é obrigatório" })
  
      });

      const { name } = bodySchema.parse(request.body);

      const gategoryWithSameName = await prisma.category.findFirst({ where: { name } });

      if (gategoryWithSameName) {
        throw new AppError("Já existe uma categoria com este nome!");
      }

    

      const categorys = await prisma.category.create({
        data: {
          name,
  
        },
      });

   

      return response.status(201).json(categorys);

    } catch (error) {
      if (error instanceof ZodError) {
        // Retorna os erros de validação
        return response.status(400).json({
          message: "Erro de validação",
          errors: error.errors.map(err => ({
            field: err.path[0],
            message: err.message,
          })),
        });
      }


      throw error;
    }
  }
}

export { CategoryController };
