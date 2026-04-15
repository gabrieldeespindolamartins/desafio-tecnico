import { NextRequest, NextResponse } from 'next/server';
import fs from 'fs';
import path from 'path';
import { ItemInventario } from '@/types/inventario';

const filePath = path.join(process.cwd(), 'inventario.json');

function readInventario(): ItemInventario[] {
  const raw = fs.readFileSync(filePath, 'utf-8');
  return JSON.parse(raw) as ItemInventario[];
}

function writeInventario(data: ItemInventario[]): void {
  fs.writeFileSync(filePath, JSON.stringify(data, null, 2), 'utf-8');
}

export async function GET(): Promise<NextResponse> {
  try {
    const items = readInventario();
    return NextResponse.json(items, { status: 200 });
  } catch {
    return NextResponse.json({ error: 'Failed to read inventory' }, { status: 500 });
  }
}

export async function POST(request: NextRequest): Promise<NextResponse> {
  try {
    const body = (await request.json()) as Omit<ItemInventario, 'id'>;
    const items = readInventario();

    const maxId = items.length > 0
      ? Math.max(...items.map((item) => item.id))
      : 0;

    const newItem: ItemInventario = {
      id: maxId + 1,
      tipo: body.tipo,
      modeloMarca: body.modeloMarca,
      colaborador: body.colaborador,
      setor: body.setor,
    };

    items.push(newItem);
    writeInventario(items);

    return NextResponse.json(newItem, { status: 201 });
  } catch {
    return NextResponse.json({ error: 'Failed to save item' }, { status: 500 });
  }
}
