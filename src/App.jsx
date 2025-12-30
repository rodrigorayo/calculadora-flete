import React, { useState, useMemo } from 'react';
import { Truck, Fuel, DollarSign, ArrowRight, TrendingUp, TrendingDown, AlertCircle, ClipboardList, Package } from 'lucide-react';

const App = () => {
  // Variables Fijas (Precios oficiales del Diésel)
  const DIESEL_OLD = 3.72;
  const DIESEL_NEW = 9.80;

  // Variables de Entrada (Cambiables por el usuario)
  const [oldDieselBudget, setOldDieselBudget] = useState(410);
  const [oldFleteUnit, setOldFleteUnit] = useState(11.00);
  const [newFleteUnit, setNewFleteUnit] = useState(14.74);
  const [loadUnits, setLoadUnits] = useState(400); // Ahora es variable

  // Cálculos dinámicos
  const stats = useMemo(() => {
    const liters = oldDieselBudget / DIESEL_OLD;
    const newDieselCost = liters * DIESEL_NEW;
    const fuelIncreaseBs = newDieselCost - oldDieselBudget;
    const fuelIncreasePercent = ((DIESEL_NEW / DIESEL_OLD) - 1) * 100;

    const revenueOld = loadUnits * oldFleteUnit;
    const revenueNew = loadUnits * newFleteUnit;

    const profitOld = revenueOld - oldDieselBudget;
    const profitNew = revenueNew - newDieselCost;

    const netDifference = profitNew - profitOld;
    const profitChangePercent = profitOld !== 0 ? ((profitNew / profitOld) - 1) * 100 : 0;

    // Punto de equilibrio (cuánto cobrar para estar igual que antes solo por combustible)
    const breakEvenFlete = loadUnits > 0 ? (profitOld + newDieselCost) / loadUnits : 0;
    
    // Porcentaje de aumento de flete aplicado
    const fleteIncreasePercent = oldFleteUnit !== 0 ? ((newFleteUnit / oldFleteUnit) - 1) * 100 : 0;

    return {
      liters,
      newDieselCost,
      fuelIncreaseBs,
      fuelIncreasePercent,
      revenueOld,
      revenueNew,
      profitOld,
      profitNew,
      netDifference,
      profitChangePercent,
      breakEvenFlete,
      fleteIncreasePercent
    };
  }, [oldDieselBudget, oldFleteUnit, newFleteUnit, loadUnits]);

  const formatBs = (val) => val.toLocaleString('es-BO', { minimumFractionDigits: 2, maximumFractionDigits: 2 });

  return (
    <div className="min-h-screen bg-slate-50 p-4 md:p-8 font-sans text-slate-900">
      <div className="max-w-4xl mx-auto">
        <header className="mb-8 text-center">
          <h1 className="text-3xl font-bold text-slate-800 flex items-center justify-center gap-2">
            <Truck className="text-blue-600" /> Calculadora de Flete Variable
          </h1>
          <p className="text-slate-500 mt-2">Compara ganancias antes y después del ajuste del diésel</p>
        </header>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-8">
          {/* Panel de Entradas */}
          <div className="bg-white p-6 rounded-2xl shadow-sm border border-slate-200">
            <h2 className="text-lg font-semibold mb-4 flex items-center gap-2 text-blue-700">
              <ClipboardList size={20} /> Datos del Negocio
            </h2>
            
            <div className="space-y-5">
              {/* Cantidad de Carga */}
              <div>
                <label className="block text-sm font-medium text-slate-600 mb-1">
                  Cantidad de Carga (Bolsas de 50kg)
                </label>
                <div className="relative">
                  <span className="absolute left-3 top-3 text-slate-400">
                    <Package size={18} />
                  </span>
                  <input
                    type="number"
                    value={loadUnits}
                    onChange={(e) => setLoadUnits(Number(e.target.value))}
                    className="w-full p-3 pl-10 bg-slate-50 border border-slate-300 rounded-xl focus:ring-2 focus:ring-blue-500 outline-none text-lg font-bold"
                  />
                </div>
              </div>

              {/* Diésel Anterior */}
              <div>
                <label className="block text-sm font-medium text-slate-600 mb-1">
                  Gasto en Diésel ANTES (Bs)
                </label>
                <div className="relative">
                  <span className="absolute left-3 top-3 text-slate-400 font-bold">Bs</span>
                  <input
                    type="number"
                    value={oldDieselBudget}
                    onChange={(e) => setOldDieselBudget(Number(e.target.value))}
                    className="w-full p-3 pl-10 bg-slate-50 border border-slate-300 rounded-xl focus:ring-2 focus:ring-blue-500 outline-none text-lg font-bold"
                  />
                </div>
                <p className="text-xs text-slate-400 mt-1">Equivale a {stats.liters.toFixed(2)} litros.</p>
              </div>

              <div className="grid grid-cols-2 gap-4">
                {/* Flete Anterior */}
                <div>
                  <label className="block text-sm font-medium text-slate-600 mb-1">
                    Flete ANTES (u)
                  </label>
                  <input
                    type="number"
                    step="0.5"
                    value={oldFleteUnit}
                    onChange={(e) => setOldFleteUnit(Number(e.target.value))}
                    className="w-full p-3 bg-slate-50 border border-slate-300 rounded-xl focus:ring-2 focus:ring-blue-500 outline-none text-lg font-bold text-center"
                  />
                </div>

                {/* Flete Nuevo */}
                <div>
                  <label className="block text-sm font-medium text-blue-700 mb-1 font-bold">
                    Flete AHORA (u)
                  </label>
                  <input
                    type="number"
                    step="0.1"
                    value={newFleteUnit}
                    onChange={(e) => setNewFleteUnit(Number(e.target.value))}
                    className="w-full p-3 bg-blue-50 border-2 border-blue-200 rounded-xl focus:ring-2 focus:ring-blue-600 outline-none text-xl font-black text-blue-700 text-center shadow-inner"
                  />
                </div>
              </div>
            </div>
          </div>

          {/* Panel de Referencias Fijas */}
          <div className="bg-slate-900 text-white p-6 rounded-2xl shadow-lg flex flex-col justify-between">
            <div>
              <h2 className="text-lg font-semibold mb-4 flex items-center gap-2">
                <Fuel size={20} className="text-orange-400" /> Costos de Combustible
              </h2>
              <div className="grid grid-cols-2 gap-4">
                <div className="bg-slate-800 p-3 rounded-xl border border-slate-700">
                  <span className="text-xs text-slate-400 block uppercase">Diésel Antes</span>
                  <span className="text-lg font-bold">{DIESEL_OLD} Bs/L</span>
                </div>
                <div className="bg-slate-800 p-3 rounded-xl border border-slate-700">
                  <span className="text-xs text-slate-400 block uppercase font-bold text-orange-400">Diésel Hoy</span>
                  <span className="text-lg font-bold text-orange-400">{DIESEL_NEW} Bs/L</span>
                </div>
              </div>
            </div>
            
            <div className="mt-8 pt-6 border-t border-slate-700">
              <div className="flex justify-between items-center mb-1">
                <span className="text-slate-400">Costo total diésel viaje:</span>
                <span className="text-2xl font-black text-orange-400">{formatBs(stats.newDieselCost)} Bs</span>
              </div>
              <div className="flex justify-between text-sm text-red-400 font-medium">
                <span>Diferencia a pagar:</span>
                <span>+{formatBs(stats.fuelIncreaseBs)} Bs</span>
              </div>
            </div>
          </div>
        </div>

        {/* Bloques Comparativos */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-8">
          {/* Tarjeta Pasado */}
          <div className="bg-white p-6 rounded-2xl border-t-4 border-slate-400 shadow-sm opacity-90">
            <h3 className="text-xs font-bold text-slate-400 uppercase mb-4">Escenario de Antes</h3>
            <div className="space-y-3">
              <div className="flex justify-between text-sm">
                <span className="text-slate-500">Recaudación ({loadUnits} × {oldFleteUnit}):</span>
                <span className="font-semibold">{formatBs(stats.revenueOld)} Bs</span>
              </div>
              <div className="flex justify-between text-sm text-red-400">
                <span>Diésel (Bs {oldDieselBudget}):</span>
                <span className="font-semibold">-{formatBs(oldDieselBudget)} Bs</span>
              </div>
              <div className="pt-3 mt-1 border-t border-slate-100 flex justify-between items-end">
                <span className="text-sm font-bold text-slate-600">Te quedaban libres:</span>
                <span className="text-2xl font-bold text-slate-800">{formatBs(stats.profitOld)} Bs</span>
              </div>
            </div>
          </div>

          {/* Tarjeta Futuro */}
          <div className={`bg-white p-6 rounded-2xl border-t-4 shadow-md ${stats.netDifference >= 0 ? 'border-green-500' : 'border-red-500'}`}>
            <h3 className="text-xs font-bold text-slate-400 uppercase mb-4">Escenario de Ahora</h3>
            <div className="space-y-3">
              <div className="flex justify-between text-sm">
                <span className="text-slate-500">Recaudación ({loadUnits} × {newFleteUnit}):</span>
                <span className="font-semibold">{formatBs(stats.revenueNew)} Bs</span>
              </div>
              <div className="flex justify-between text-sm text-red-500">
                <span>Diésel (Nuevo Precio):</span>
                <span className="font-semibold">-{formatBs(stats.newDieselCost)} Bs</span>
              </div>
              <div className={`pt-3 mt-1 border-t flex justify-between items-end ${stats.netDifference >= 0 ? 'border-green-100' : 'border-red-100'}`}>
                <span className="text-sm font-bold text-slate-600">Te quedan libres:</span>
                <span className={`text-2xl font-black ${stats.netDifference >= 0 ? 'text-green-600' : 'text-red-600'}`}>
                  {formatBs(stats.profitNew)} Bs
                </span>
              </div>
            </div>
          </div>
        </div>

        {/* Widget de Resultado Final */}
        <div className={`p-8 rounded-3xl text-center shadow-xl mb-6 ${stats.netDifference >= 0 ? 'bg-gradient-to-br from-green-600 to-green-700 text-white' : 'bg-gradient-to-br from-red-600 to-red-700 text-white'}`}>
          <div className="text-sm font-bold uppercase tracking-widest opacity-80 mb-2">Resultado neto del viaje</div>
          <div className="text-6xl font-black mb-2 tracking-tighter">
            {stats.netDifference >= 0 ? '+' : ''}{formatBs(stats.netDifference)} <span className="text-2xl">Bs</span>
          </div>
          <p className="text-white/90 font-medium text-lg">
            {stats.netDifference >= 0 
              ? `Ganancia en bolivianos: +${stats.profitChangePercent.toFixed(1)}% vs antes.`
              : `Pérdida en bolivianos: ${Math.abs(stats.profitChangePercent).toFixed(1)}% vs antes.`
            }
          </p>
          
          <div className="mt-8 grid grid-cols-1 md:grid-cols-2 gap-4">
            <div className="bg-black/10 p-4 rounded-2xl border border-white/10 backdrop-blur-sm">
              <p className="text-white/60 text-xs uppercase font-bold mb-1">Precio de Equilibrio</p>
              <p className="text-2xl font-black">{formatBs(stats.breakEvenFlete)} Bs</p>
              <p className="text-[10px] text-white/50 leading-tight mt-1">Precio por bolsa para mantener la ganancia anterior.</p>
            </div>
            <div className="bg-black/10 p-4 rounded-2xl border border-white/10 backdrop-blur-sm flex flex-col justify-center">
              <p className="text-white/60 text-xs uppercase font-bold mb-1">Aumento aplicado</p>
              <p className="text-2xl font-black">{stats.fleteIncreasePercent.toFixed(1)}%</p>
              <p className="text-[10px] text-white/50 leading-tight mt-1">Respecto al flete de {oldFleteUnit} Bs.</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default App;