import { tasks } from "../data";

export async function GET(
  request: Request,
  { params }: { params: Promise<{ id: string }> }
) {
  const { id } = await params;
  const task = tasks.find((t) => t.id === Number(id));

  if (!task) {
    return Response.json({ error: "Task not found" }, { status: 404 });
  }

  return Response.json({ data: task }, { status: 200 });
}
export async function PATCH(
  request: Request,
  { params }: { params: Promise<{ id: string }> }
) {
  const { id } = await params;
  const taskIndex = tasks.findIndex((t) => t.id === Number(id));

  if (taskIndex === -1) {
    return Response.json({ error: "Task not found" }, { status: 404 });
  }

  const body = await request.json();
  if (body.title === undefined && body.completed === undefined) {
  return Response.json(
    { error: "At least one field (title or completed) must be provided" },
    { status: 400 }
  );
}
  const updatedTask = { ...tasks[taskIndex], ...body };
  tasks[taskIndex] = updatedTask;

  return Response.json({ data: updatedTask }, { status: 200 });
}

export async function DELETE(
  request: Request,
  { params }: { params: Promise<{ id: string }> }
) {
  const { id } = await params;
  const taskIndex = tasks.findIndex((t) => t.id === Number(id));

  if (taskIndex === -1) {
    return Response.json({ error: "Task not found" }, { status: 404 });
  }

  tasks.splice(taskIndex, 1);

  return Response.json({ data: { message: "Task deleted successfully" } }, { status: 200 });
}
