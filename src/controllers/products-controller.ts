import { prisma } from "@/database/prisma";
import { AppError } from "@/utils/AppError";
import { Request, Response } from "express";

import { z, ZodError } from "zod";

class ProductsController {
  async create(request: Request, response: Response) {
    try {
      const bodySchema = z.object({
        name: z.string().trim().min(3, { message: "Nome é obrigatório" }),
        price: z.coerce.number()
          .positive({ message: "O preço deve ser um número positivo e no maximo 10 digitos" }),
        description: z
          .string()
          .min(5, { message: "Descrição é obrigatória" })
          .max(255, { message: "Descrição deve ter no máximo 255 caracteres" }),
          categoryId: z.string(),
          filename: z.string().min(20),


      });

      const { name, price, description, categoryId, filename } = bodySchema.parse(request.body);

      const productWithSameName = await prisma.product.findFirst({ where: { name } });

      if (productWithSameName) {
        throw new AppError("Já existe um produto com este nome!");
      }

    

      const product = await prisma.product.create({
        data: {
          name,
          price,
           description,
           categoryId,
           filename,
        },
      });

   

      return response.status(201).json(product);

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

  async index(request: Request, response: Response) {
  try {
    const products = await prisma.product.findMany({
      include: {
        category: {
          select: {
            id: true,
            name: true,
          },
        },
      },
      orderBy: {
        name: 'asc', // opcional: ordena por data de criação
      },
    });

    return response.json(products);
  } catch (error) {
    return response.status(500).json({ message: "Erro ao listar produtos." });
  }
}
}

export { ProductsController };
