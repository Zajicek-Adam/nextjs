import prisma from "../../../lib/prisma";

export async function GET(req: Request, res: Response) {
  try {
    const employees = await prisma.employee.findMany({
      select: {
        id: true,
        name: true,
        position: true,
        phone: true
      },
    });
    return new Response(JSON.stringify(employees), {
      status: 200,
      headers: {
        "Content-Type": "application/json",
      },
    });
  }
  catch(e) {
    return new Response(
      JSON.stringify({
        message: "Internal Server Error",
      }),
      {
        status: 500,
        headers: {
          "Content-Type": "application/json",
        },
      }
    );
  }
}

export async function POST(req: Request, res: Response) {
  try {
    const body = await req.json();

    if (!body.name || !body.position || !body.phone) {
      return new Response(
        JSON.stringify({
          message: "Name, position, and phone must be filled",
        }),
        {
          status: 400, // Change status to 400 for bad request
          headers: {
            "Content-Type": "application/json",
          },
        }
      );
    }

    const employee = await prisma.employee.create({
      data: {
        name: body.name,
        position: body.position,
        phone: body.phone,
      },
    });

    return new Response(JSON.stringify(employee), {
      status: 200, // Change status to 201 for resource created
      headers: {
        "Content-Type": "application/json",
      },
    });
  } catch (e) {
    return new Response(
      JSON.stringify({
        message: "Internal Server Error",
      }),
      {
        status: 500,
        headers: {
          "Content-Type": "application/json",
        },
      }
    );
  }
}


export async function DELETE(req: Request, res: Response) {
  try {
    const body = await req.json()
    const employee = await prisma.employee.delete({
      where: { id: body.id}
    });
    return new Response(
      JSON.stringify({
        message: "Employee removed: " + body.id,
      }),
      {
        status: 200,
        headers: {
          "Content-Type": "application/json",
        },
      }
    );
  }
  catch {
    return new Response(
      JSON.stringify({
        message: "Internal Server Error",
      }),
      {
        status: 500,
        headers: {
          "Content-Type": "application/json",
        },
      }
    );
  }
}