"use client"

import { useState } from "react"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"

const devedores = [
  { nome: "João Silva", valor: 1500, formaPagamento: "Cartão de Crédito" },
  { nome: "Maria Santos", valor: 2000, formaPagamento: "Boleto" },
  { nome: "Pedro Oliveira", valor: 1000, formaPagamento: "Transferência" },
  { nome: "Ana Rodrigues", valor: 3000, formaPagamento: "Cartão de Crédito" },
  { nome: "Carlos Ferreira", valor: 500, formaPagamento: "Boleto" },
]

export default function Devedores() {
  const [filtro, setFiltro] = useState("Todos")

  const devedoresFiltrados = filtro === "Todos"
    ? devedores
    : devedores.filter(d => d.formaPagamento === filtro)

  return (
    <main className="flex-1 p-8 pt-6">
      <div className="flex flex-col space-y-8">
        <div className="flex items-center justify-between space-y-2">
          <h2 className="text-3xl font-bold tracking-tight">Valores Devedores</h2>
        </div>
        <Card>
          <CardHeader>
            <CardTitle>Filtrar por Forma de Pagamento</CardTitle>
          </CardHeader>
          <CardContent>
            <Select onValueChange={setFiltro} defaultValue="Todos">
              <SelectTrigger className="w-[180px]">
                <SelectValue placeholder="Selecione" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="Todos">Todos</SelectItem>
                <SelectItem value="Cartão de Crédito">Cartão de Crédito</SelectItem>
                <SelectItem value="Boleto">Boleto</SelectItem>
                <SelectItem value="Transferência">Transferência</SelectItem>
              </SelectContent>
            </Select>
          </CardContent>
        </Card>
        <Card>
          <CardHeader>
            <CardTitle>Lista de Devedores</CardTitle>
          </CardHeader>
          <CardContent>
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead>Nome</TableHead>
                  <TableHead>Valor</TableHead>
                  <TableHead>Forma de Pagamento</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {devedoresFiltrados.map((devedor, index) => (
                  <TableRow key={index}>
                    <TableCell>{devedor.nome}</TableCell>
                    <TableCell>R$ {devedor.valor.toFixed(2)}</TableCell>
                    <TableCell>{devedor.formaPagamento}</TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </CardContent>
        </Card>
      </div>
    </main>
  )
}

