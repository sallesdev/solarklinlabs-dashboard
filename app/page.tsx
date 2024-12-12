"use client";

import React, { useEffect, useState } from "react";
import Papa from "papaparse";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { DollarSign, FileSpreadsheet } from 'lucide-react';
import { Overview } from "@/components/overview";
import { RecentSales } from "@/components/recent-sales";

interface SaleData {
  DATA_VENDA: string;
  VALOR_PROJETO: string;
}

export default function Home() {
  const [salesData, setSalesData] = useState({ totalSales: 0, totalQuantity: 0 });
  const [previousMonthData, setPreviousMonthData] = useState({ totalSales: 0, totalQuantity: 0 });

  useEffect(() => {
    const loadData = async () => {
      const response = await fetch('/solarklin_clientes.csv'); 

      if (response.ok && response.body) { 
        const reader = response.body.getReader();
        const result = await reader.read();
        const decoder = new TextDecoder('utf-8');
        const csv = decoder.decode(result.value);

        console.log("Conteúdo do CSV:", csv); 

        Papa.parse<SaleData>(csv, {
          header: true,
          complete: (results) => {
            console.log("Dados do CSV:", results.data); 

            const currentDate = new Date();
            const currentMonth = currentDate.getMonth();
            const currentYear = currentDate.getFullYear();
            const previousMonth = currentMonth === 0 ? 11 : currentMonth - 1;
            const previousYear = currentMonth === 0 ? currentYear - 1 : currentYear;

            let totalSalesCurrent = 0;
            let totalQuantityCurrent = 0;
            let totalSalesPrevious = 0;
            let totalQuantityPrevious = 0;

            results.data.forEach(row => {
              const saleDate = new Date(row.DATA_VENDA); 
              console.log("Data da Venda:", saleDate); 

              
              let valueProject = 0; 
              if (row.VALOR_PROJETO) {
                // Limpar o valor do projeto
                const cleanedValue = row.VALOR_PROJETO.replace(/R\$\s?|\.|,/g, '').trim();
                valueProject = parseFloat(cleanedValue);
                console.log("Valor do Projeto Limpo:", cleanedValue, "Valor do Projeto:", valueProject); 
              }

              if (saleDate.getFullYear() === currentYear && saleDate.getMonth() === currentMonth) {
                totalSalesCurrent += valueProject;
                totalQuantityCurrent++;
              } else if (saleDate.getFullYear() === previousYear && saleDate.getMonth() === previousMonth) {
                totalSalesPrevious += valueProject;
                totalQuantityPrevious++;
              }
            });

            console.log("Total de Vendas Atual:", totalSalesCurrent, "Quantidade Atual:", totalQuantityCurrent); 
            console.log("Total de Vendas Anterior:", totalSalesPrevious, "Quantidade Anterior:", totalQuantityPrevious); 

            setSalesData({ totalSales: totalSalesCurrent, totalQuantity: totalQuantityCurrent });
            setPreviousMonthData({ totalSales: totalSalesPrevious, totalQuantity: totalQuantityPrevious });
          }
        });
      } else {
        console.error("Erro ao buscar o arquivo CSV:", response.statusText);
      }
    };

    loadData();
  }, []);

  const salesPercentageChange = previousMonthData.totalSales > 0 
    ? ((salesData.totalSales - previousMonthData.totalSales) / previousMonthData.totalSales) * 100 
    : 0;

  const quantityPercentageChange = previousMonthData.totalQuantity > 0 
 ? ((salesData.totalQuantity - previousMonthData.totalQuantity) / previousMonthData.totalQuantity) * 100 
    : 0;

  return (
    <main className="flex-1 p-8 pt-6">
      <div className="flex flex-col space-y-8">
        <div className="flex items-center justify-between space-y-2">
          <h2 className="text-3xl font-bold tracking-tight">Vendas do Mês</h2>
        </div>
        <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
          <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">
                Total de Compras
              </CardTitle>
              <DollarSign className="h-4 w-4 text-muted-foreground" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">R$ {salesData.totalSales.toFixed(2)}</div>
              <p className="text-xs text-muted-foreground">
                {salesPercentageChange > 0 ? `+${salesPercentageChange.toFixed(2)}% em relação ao mês anterior` : `${salesPercentageChange.toFixed(2)}% em relação ao mês anterior`}
              </p>
            </CardContent>
          </Card>
          <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">
                Quantidade de Vendas
              </CardTitle>
              <FileSpreadsheet className="h-4 w-4 text-muted-foreground" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">{salesData.totalQuantity}</div>
              <p className="text-xs text-muted-foreground">
                {quantityPercentageChange > 0 ? `+${quantityPercentageChange.toFixed(2)}% em relação ao mês anterior` : `${quantityPercentageChange.toFixed(2)}% em relação ao mês anterior`}
              </p>
            </CardContent>
          </Card>
        </div>
        <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-7">
          <Card className="col-span-4">
            <CardHeader>
              <CardTitle>Visão Geral</CardTitle>
            </CardHeader>
            <CardContent className="pl-2">
              <Overview />
            </CardContent>
          </Card>
          <Card className="col-span-3">
            <CardHeader>
              <CardTitle>Vendas Recentes</CardTitle>
            </CardHeader>
            <CardContent>
              <RecentSales />
            </CardContent>
          </Card>
        </div>
      </div>
    </main>
  )
}