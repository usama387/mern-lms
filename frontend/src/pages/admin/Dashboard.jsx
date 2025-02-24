import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import React from "react";

const Dashboard = () => {
  const totalSales = 1000;

  return (
    <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 mt-20">
      <Card>
        <CardHeader>
          <CardTitle>Total Sales</CardTitle>
        </CardHeader>
        <CardContent>
          <p className="text-3xl font-bold text-blue-600">{totalSales}</p>
        </CardContent>
      </Card>
    </div>
  );
};

export default Dashboard;
