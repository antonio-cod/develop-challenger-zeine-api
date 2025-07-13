import { AppError } from "@/utils/AppError";
import { Request, Response } from "express";
import { prisma } from "@/database/prisma";
import { hash } from "bcrypt";
import { z, ZodError } from "zod";

class ProductsController {
  async create(request: Request, response: Response) {
    try {
      const bodySchema = z.object({
       title: z.string().trim().min(3, { message: "Nome é obrigatório" }),
        price: z.string(),
  
        
      });

      const { name, email, password } = bodySchema.parse(request.body);

      const userWithSameEmail = await prisma.user.findFirst({ where: { email } });

      if (userWithSameEmail) {
        throw new AppError("Já existe um usuário com esse mesmo E-mail!");
      }

      const hashedPassword = await hash(password, 8);

      const user = await prisma.user.create({
        data: {
          name,
          email,
          password: hashedPassword,
        },
      });

      const { password: _, ...userWithoutPassword } = user;

      return response.status(201).json(userWithoutPassword);

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

export { ProductsController };
