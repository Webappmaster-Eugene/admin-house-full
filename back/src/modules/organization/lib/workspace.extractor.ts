import { PrismaService } from '../../../prisma/prisma.service';
import { HttpException, HttpStatus } from '@nestjs/common';

export async function workspaceExtractor(
  prismaService: PrismaService,
  id: number,
): Promise<{ id: number; name: string }> {
  try {
    const workspace = await prismaService.user.findUnique({
      where: {
        id: id,
      },
      select: {
        creator_of_workspace: {
          select: {
            id: true,
            name: true,
          },
        },
      },
    });
    console.log(workspace);
    return {
      id: workspace.creator_of_workspace.id,
      name: workspace.creator_of_workspace.name,
    };
  } catch (error) {
    // if (error instanceof Prisma.PrismaClientKnownRequestError) {
    //   if (error.code === 'P2002') {
    //   }

    throw new HttpException(
      `${error.message}`,
      HttpStatus.INTERNAL_SERVER_ERROR,
    );
  }
}
