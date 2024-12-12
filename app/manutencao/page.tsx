import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"

const projetosEmManutencao = [
  { nome: "Projeto A", cliente: "Empresa X", dataInicio: "2023-05-15", status: "Em andamento" },
  { nome: "Projeto B", cliente: "Empresa Y", dataInicio: "2023-06-01", status: "Aguardando peças" },
  { nome: "Projeto C", cliente: "Empresa Z", dataInicio: "2023-06-10", status: "Em análise" },
]

export default function Manutencao() {
  return (
    <main className="flex-1 p-8 pt-6">
      <div className="flex flex-col space-y-8">
        <div className="flex items-center justify-between space-y-2">
          <h2 className="text-3xl font-bold tracking-tight">AGUARDANDO A INSTALAÇÃO</h2>
        </div>
        <Card>
          <CardHeader>
            <CardTitle>Lista de Projetos</CardTitle>
          </CardHeader>
          <CardContent>
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead>Nome do Projeto</TableHead>
                  <TableHead>Cliente</TableHead>
                  <TableHead>Data de Início</TableHead>
                  <TableHead>Status</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {projetosEmManutencao.map((projeto, index) => (
                  <TableRow key={index}>
                    <TableCell>{projeto.nome}</TableCell>
                    <TableCell>{projeto.cliente}</TableCell>
                    <TableCell>{projeto.dataInicio}</TableCell>
                    <TableCell>{projeto.status}</TableCell>
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

