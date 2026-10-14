import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { 
  Database, 
  Boxes, 
  ShoppingCart, 
  TrendingUp, 
  Users, 
  Receipt, 
  ShieldCheck, 
  ArrowUpRight, 
  Plus, 
  Minus, 
  CheckCircle2, 
  AlertTriangle,
  Layers,
  Laptop,
  Smartphone,
  Sparkles
} from 'lucide-react';
import { TasteButton } from './TasteButton';
import { useWhatsAppModal } from '../context/WhatsAppModalContext';
import { useSoundscape } from '../context/SoundscapeContext';
import { SectionProgressIndicator } from './SectionProgressIndicator';

interface SystemPlan {
  id: string;
  name: string;
  subtitle: string;
  badge: string;
  price: number;
  deliveryTime: string;
  highlight?: boolean;
  description: string;
  features: string[];
  specsForQuote: string;
}

const SYSTEM_PLANS: SystemPlan[] = [
  {
    id: 'essential_inventory',
    name: 'Sistema de Inventario & Control Esencial',
    subtitle: 'Para pequeños comercios y bodegas',
    badge: 'Inventario Rápido',
    price: 390,
    deliveryTime: '8 a 12 días hábiles',
    description: 'Control exacto de existencias para saber siempre qué tienes en stock, qué se está agotando y qué debes reponer.',
    features: [
      'Catálogo de productos con código SKU, costo, precio de venta y margen',
      'Control de stock en tiempo real con alertas automáticas de bajo stock',
      'Registro de entradas (compras) y salidas (ventas o mermas)',
      'Búsqueda instantánea y filtros por categoría o marca',
      'Acceso en la nube para 2 usuarios (dueño y encargado)',
      'Base de datos segura con respaldo diario automático'
    ],
    specsForQuote: 'Sistema de Inventario Esencial ($390 USD): Control de stock en tiempo real, alertas de bajo inventario, 2 usuarios en la nube.'
  },
  {
    id: 'pro_pos',
    name: 'Sistema POS & Gestión Comercial Pro',
    subtitle: 'El más solicitado para negocios activos',
    badge: 'El Más Recomendado',
    highlight: true,
    price: 580,
    deliveryTime: '12 a 16 días hábiles',
    description: 'Todo el control de inventario más punto de venta rápido para cobrar en mostrador, corte de caja diario y recibos a WhatsApp.',
    features: [
      'Todo lo del plan Esencial incluido',
      'Módulo Punto de Venta (POS) ultra rápido para registrar ventas en segundos',
      'Generación de recibos digitales listos para enviar por WhatsApp o imprimir',
      'Control de Caja Diaria: apertura con fondo, registro de gastos y arqueo/cierre de caja',
      'Módulo de Clientes con historial de compras y cuentas por cobrar (créditos)',
      'Reportes automáticos de ventas y ganancias netas del día, semana y mes',
      '5 cuentas de usuario con roles de cajero y administrador'
    ],
    specsForQuote: 'Sistema POS & Gestión Comercial Pro ($580 USD): Punto de venta, corte de caja diario, inventario en vivo, recibos digitales a WhatsApp, 5 usuarios.'
  },
  {
    id: 'enterprise_multistore',
    name: 'Sistema ERP & Multi-Sucursal Avanzado',
    subtitle: 'Para empresas en crecimiento con múltiples tiendas',
    badge: 'Solución Integral',
    price: 850,
    deliveryTime: '18 a 25 días hábiles',
    description: 'Gestión centralizada para controlar varias tiendas o bodegas, transferencias de mercancía, analíticas avanzadas y roles.',
    features: [
      'Todo lo del plan Pro incluido',
      'Control multi-sucursal y multi-bodega sincronizado en tiempo real',
      'Módulo de transferencias de mercancía entre sucursales',
      'Roles de usuario avanzados (Super Admin, Administrador de Tienda, Cajeros, Auditores)',
      'Analíticas de ventas por vendedor, por hora y productos más rentables',
      'Exportación completa de reportes contables a Excel y PDF',
      'Capacitación inicial y soporte técnico prioritario'
    ],
    specsForQuote: 'Sistema ERP & Multi-Sucursal ($850 USD): Múltiples tiendas sincronizadas, transferencias de stock, roles avanzados, analíticas completas.'
  }
];

// Interactive Demo Products Data
interface DemoItem {
  id: string;
  sku: string;
  name: string;
  category: string;
  cost: number;
  price: number;
  stock: number;
  minStock: number;
}

const INITIAL_DEMO_ITEMS: DemoItem[] = [
  { id: '1', sku: 'PRD-001', name: 'Torta Selva Negra Premium', category: 'Pastelería', cost: 18, price: 35, stock: 8, minStock: 3 },
  { id: '2', sku: 'PRD-002', name: 'Gorra Streetwear NY Black', category: 'Accesorios', cost: 12, price: 28, stock: 15, minStock: 5 },
  { id: '3', sku: 'PRD-003', name: 'Croissant Mantequilla x6', category: 'Panadería', cost: 4, price: 9, stock: 2, minStock: 5 },
  { id: '4', sku: 'PRD-004', name: 'Camiseta Oversize Cyber Tech', category: 'Ropa', cost: 15, price: 32, stock: 12, minStock: 4 },
];

export const CustomSystemsSection: React.FC = () => {
  const { openConsultation } = useWhatsAppModal();
  const { playTick } = useSoundscape();

  // Interactive Simulator State
  const [simulatorTab, setSimulatorTab] = useState<'inventory' | 'pos' | 'reports'>('inventory');
  const [demoItems, setDemoItems] = useState<DemoItem[]>(INITIAL_DEMO_ITEMS);
  const [cart, setCart] = useState<{ item: DemoItem; qty: number }[]>([]);
  const [dailySalesTotal, setDailySalesTotal] = useState(485);
  const [dailySalesCount, setDailySalesCount] = useState(16);
  const [saleNotification, setSaleNotification] = useState<string | null>(null);

  const handleAdjustStock = (id: string, delta: number) => {
    playTick();
    setDemoItems(prev =>
      prev.map(item => {
        if (item.id === id) {
          const nextStock = Math.max(0, item.stock + delta);
          return { ...item, stock: nextStock };
        }
        return item;
      })
    );
  };

  const handleAddToCart = (item: DemoItem) => {
    playTick();
    if (item.stock <= 0) return;
    setCart(prev => {
      const existing = prev.find(c => c.item.id === item.id);
      if (existing) {
        return prev.map(c => c.item.id === item.id ? { ...c, qty: c.qty + 1 } : c);
      }
      return [...prev, { item, qty: 1 }];
    });
  };

  const handleRemoveFromCart = (itemId: string) => {
    playTick();
    setCart(prev => prev.filter(c => c.item.id !== itemId));
  };

  const cartTotal = cart.reduce((acc, curr) => acc + curr.item.price * curr.qty, 0);

  const handleCompleteSale = () => {
    if (cart.length === 0) return;
    playTick();
    
    // Deduct stock
    setDemoItems(prev =>
      prev.map(item => {
        const inCart = cart.find(c => c.item.id === item.id);
        if (inCart) {
          return { ...item, stock: Math.max(0, item.stock - inCart.qty) };
        }
        return item;
      })
    );

    setDailySalesTotal(prev => prev + cartTotal);
    setDailySalesCount(prev => prev + 1);
    setSaleNotification(`¡Venta registrada con éxito por $${cartTotal} USD! Recibo digital generado.`);
    setCart([]);

    setTimeout(() => {
      setSaleNotification(null);
    }, 4500);
  };

  return (
    <section id="sistemas" className="py-20 sm:py-28 md:py-36 relative bg-[#07090E] border-t border-white/[0.06] overflow-hidden">
      {/* Background ambient lighting */}
      <div className="absolute top-1/4 left-0 w-[550px] h-[550px] bg-[radial-gradient(circle,rgba(0,102,255,0.08)_0%,transparent_70%)] blur-[120px] pointer-events-none" />
      <div className="absolute bottom-10 right-0 w-[500px] h-[500px] bg-[radial-gradient(circle,rgba(0,210,255,0.06)_0%,transparent_70%)] blur-[120px] pointer-events-none" />

      <div className="max-w-[1240px] mx-auto px-4 sm:px-6 md:px-8 relative z-10">
        
        {/* Section Header */}
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 mb-12 sm:mb-16">
          <div>
            <div className="flex items-center gap-2.5 mb-3">
              <span className="w-1.5 h-1.5 rounded-full bg-[#00D2FF]" />
              <span className="text-xs font-mono tracking-widest text-[#00D2FF] uppercase font-semibold">
                01 // SISTEMAS A MEDIDA
              </span>
            </div>

            <h2 className="text-3xl sm:text-5xl md:text-6xl font-black font-display tracking-tight text-white leading-[1.05] max-w-2xl">
              Software para administrar tu negocio e inventario.
            </h2>
          </div>

          <div className="max-w-md">
            <p className="text-zinc-400 text-sm sm:text-base leading-relaxed mb-3">
              Deja atrás las hojas de cálculo confusas y el descontrol de mercancía. Diseñamos sistemas en la nube a medida para controlar tu stock, registrar ventas y proteger tus ganancias.
            </p>
            <div className="flex items-center gap-4 text-xs font-mono-tech text-zinc-400">
              <span className="flex items-center gap-1.5 text-[#00D2FF]">
                <Laptop className="w-3.5 h-3.5" /> Computadora
              </span>
              <span>•</span>
              <span className="flex items-center gap-1.5 text-[#00D2FF]">
                <Smartphone className="w-3.5 h-3.5" /> Celular y Tablet
              </span>
              <span>•</span>
              <span>Sin mensualidades caras</span>
            </div>
          </div>
        </div>

        {/* ============================================================ */}
        {/* 1. INTERACTIVE DEMO: SIMULADOR DE INVENTARIO & POS EN VIVO   */}
        {/* ============================================================ */}
        <div className="mb-16 sm:mb-20 rounded-3xl bg-[#0B0F17] border border-[#0066FF]/35 p-5 sm:p-7 lg:p-8 shadow-[0_20px_50px_rgba(0,0,0,0.8),0_0_30px_rgba(0,102,255,0.15)]">
          <div className="flex flex-col lg:flex-row lg:items-center justify-between gap-4 pb-5 border-b border-white/[0.08] mb-6">
            <div>
              <div className="flex items-center gap-2 mb-1">
                <span className="text-[10px] font-mono-tech tracking-widest text-[#00D2FF] uppercase font-bold">
                  DEMO EN VIVO INTERACTIVA
                </span>
                <span className="px-2 py-0.5 rounded-full bg-[#0066FF]/20 text-[#00D2FF] text-[9px] font-mono border border-[#0066FF]/40">
                  Prueba el sistema ahora
                </span>
              </div>
              <h3 className="text-xl sm:text-2xl font-bold font-display text-white">
                Así se siente administrar tu negocio con D.E.K NOVACORE
              </h3>
            </div>

            {/* Segmented Mode Control for Simulator */}
            <div className="flex items-center gap-1 p-1 bg-black/60 rounded-xl border border-white/[0.08] self-start lg:self-auto">
              <button
                type="button"
                onClick={() => {
                  playTick();
                  setSimulatorTab('inventory');
                }}
                className={`px-3 sm:px-4 py-2 rounded-lg text-xs font-mono-tech transition-all flex items-center gap-2 cursor-pointer ${
                  simulatorTab === 'inventory'
                    ? 'bg-[#0066FF] text-white font-bold shadow-[0_0_12px_rgba(0,102,255,0.5)]'
                    : 'text-zinc-400 hover:text-white'
                }`}
              >
                <Boxes className="w-3.5 h-3.5" />
                <span>Control de Inventario</span>
              </button>

              <button
                type="button"
                onClick={() => {
                  playTick();
                  setSimulatorTab('pos');
                }}
                className={`px-3 sm:px-4 py-2 rounded-lg text-xs font-mono-tech transition-all flex items-center gap-2 cursor-pointer ${
                  simulatorTab === 'pos'
                    ? 'bg-[#0066FF] text-white font-bold shadow-[0_0_12px_rgba(0,102,255,0.5)]'
                    : 'text-zinc-400 hover:text-white'
                }`}
              >
                <ShoppingCart className="w-3.5 h-3.5" />
                <span>Punto de Venta / Caja</span>
              </button>

              <button
                type="button"
                onClick={() => {
                  playTick();
                  setSimulatorTab('reports');
                }}
                className={`px-3 sm:px-4 py-2 rounded-lg text-xs font-mono-tech transition-all flex items-center gap-2 cursor-pointer ${
                  simulatorTab === 'reports'
                    ? 'bg-[#0066FF] text-white font-bold shadow-[0_0_12px_rgba(0,102,255,0.5)]'
                    : 'text-zinc-400 hover:text-white'
                }`}
              >
                <TrendingUp className="w-3.5 h-3.5" />
                <span>Reportes</span>
              </button>
            </div>
          </div>

          {/* Tab 1: Live Inventory Table */}
          {simulatorTab === 'inventory' && (
            <div className="space-y-4">
              <div className="flex flex-wrap items-center justify-between gap-3 text-xs text-zinc-400 pb-2">
                <span>Haz clic en <strong>+</strong> o <strong>-</strong> para simular entradas o salidas de mercancía:</span>
                <span className="font-mono text-[#00D2FF]">Productos en catálogo: {demoItems.length}</span>
              </div>

              <div className="overflow-x-auto rounded-2xl border border-white/[0.08] bg-black/40">
                <table className="w-full text-left border-collapse text-xs">
                  <thead>
                    <tr className="border-b border-white/[0.08] text-zinc-400 font-mono-tech text-[10px] uppercase tracking-wider bg-white/[0.02]">
                      <th className="py-3 px-4">Código SKU</th>
                      <th className="py-3 px-4">Producto</th>
                      <th className="py-3 px-4">Costo / Venta</th>
                      <th className="py-3 px-4">Stock Actual</th>
                      <th className="py-3 px-4">Estado</th>
                      <th className="py-3 px-4 text-right">Ajuste de Stock</th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-white/[0.06]">
                    {demoItems.map(item => {
                      const isLowStock = item.stock <= item.minStock;
                      return (
                        <tr key={item.id} className="hover:bg-white/[0.02] transition-colors">
                          <td className="py-3.5 px-4 font-mono text-[#00D2FF] font-semibold">{item.sku}</td>
                          <td className="py-3.5 px-4 font-medium text-white">
                            <div>{item.name}</div>
                            <span className="text-[10px] text-zinc-400">{item.category}</span>
                          </td>
                          <td className="py-3.5 px-4 font-mono">
                            <span className="text-zinc-400">${item.cost}</span> / <strong className="text-white">${item.price}</strong>
                          </td>
                          <td className="py-3.5 px-4 font-mono font-bold text-white text-sm">
                            {item.stock} <span className="text-[10px] text-zinc-500 font-normal">uds</span>
                          </td>
                          <td className="py-3.5 px-4">
                            {isLowStock ? (
                              <span className="inline-flex items-center gap-1 px-2 py-0.5 rounded-full bg-amber-500/15 border border-amber-500/40 text-amber-300 text-[10px] font-mono-tech">
                                <AlertTriangle className="w-3 h-3 text-amber-400" />
                                Bajo Stock (mín: {item.minStock})
                              </span>
                            ) : (
                              <span className="inline-flex items-center gap-1 px-2 py-0.5 rounded-full bg-emerald-500/15 border border-emerald-500/40 text-emerald-300 text-[10px] font-mono-tech">
                                <CheckCircle2 className="w-3 h-3 text-emerald-400" />
                                Disponible
                              </span>
                            )}
                          </td>
                          <td className="py-3.5 px-4 text-right">
                            <div className="inline-flex items-center gap-1 bg-[#07090E] border border-white/[0.1] rounded-lg p-1">
                              <button
                                type="button"
                                onClick={() => handleAdjustStock(item.id, -1)}
                                className="w-6 h-6 rounded flex items-center justify-center text-zinc-400 hover:text-white hover:bg-white/10 active:scale-95 transition-all"
                                title="Reducir stock"
                              >
                                <Minus className="w-3 h-3" />
                              </button>
                              <span className="font-mono px-2 text-white font-bold">{item.stock}</span>
                              <button
                                type="button"
                                onClick={() => handleAdjustStock(item.id, 1)}
                                className="w-6 h-6 rounded flex items-center justify-center text-zinc-400 hover:text-white hover:bg-white/10 active:scale-95 transition-all"
                                title="Aumentar stock"
                              >
                                <Plus className="w-3 h-3" />
                              </button>
                            </div>
                          </td>
                        </tr>
                      );
                    })}
                  </tbody>
                </table>
              </div>
            </div>
          )}

          {/* Tab 2: Live POS Simulator */}
          {simulatorTab === 'pos' && (
            <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
              {/* Product quick-tap catalog */}
              <div className="lg:col-span-7 space-y-3">
                <span className="text-xs font-mono-tech text-zinc-400 block mb-2">
                  Toca un producto para añadirlo al carrito de venta de mostrador:
                </span>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                  {demoItems.map(item => (
                    <button
                      key={item.id}
                      type="button"
                      disabled={item.stock <= 0}
                      onClick={() => handleAddToCart(item)}
                      className={`p-3.5 rounded-xl border text-left transition-all flex flex-col justify-between ${
                        item.stock > 0
                          ? 'bg-[#07090E] border-white/[0.08] hover:border-[#0066FF] hover:bg-[#0E1424] cursor-pointer'
                          : 'bg-black/40 border-white/[0.04] opacity-50 cursor-not-allowed'
                      }`}
                    >
                      <div className="flex justify-between items-start gap-2 mb-2">
                        <span className="text-xs font-bold text-white leading-snug">{item.name}</span>
                        <span className="font-mono text-xs font-black text-[#00D2FF] shrink-0">${item.price}</span>
                      </div>
                      <div className="flex justify-between items-center text-[10px] font-mono text-zinc-400">
                        <span>Stock: {item.stock}</span>
                        <span className="text-[#0066FF] font-semibold">+ Agregar</span>
                      </div>
                    </button>
                  ))}
                </div>
              </div>

              {/* POS Ticket & Checkout */}
              <div className="lg:col-span-5 bg-[#07090E] border border-white/[0.1] rounded-2xl p-4 sm:p-5 flex flex-col justify-between">
                <div>
                  <div className="flex items-center justify-between pb-3 border-b border-white/[0.08] mb-3">
                    <span className="text-xs font-mono-tech uppercase font-bold text-white flex items-center gap-2">
                      <Receipt className="w-3.5 h-3.5 text-[#00D2FF]" />
                      Recibo de Venta (POS)
                    </span>
                    <span className="text-[10px] font-mono text-zinc-400">Ticket #0042</span>
                  </div>

                  {cart.length === 0 ? (
                    <div className="py-8 text-center text-xs text-zinc-500 font-mono-tech">
                      Carrito vacío. Toca productos para añadirlos a la orden.
                    </div>
                  ) : (
                    <div className="space-y-2 mb-4 max-h-[160px] overflow-y-auto pr-1">
                      {cart.map(c => (
                        <div key={c.item.id} className="flex items-center justify-between text-xs py-1 border-b border-white/[0.04]">
                          <div>
                            <span className="text-white font-medium block truncate max-w-[150px]">{c.item.name}</span>
                            <span className="text-[10px] font-mono text-zinc-400">{c.qty} x ${c.item.price}</span>
                          </div>
                          <div className="flex items-center gap-2">
                            <span className="font-mono font-bold text-white">${c.item.price * c.qty}</span>
                            <button
                              type="button"
                              onClick={() => handleRemoveFromCart(c.item.id)}
                              className="text-zinc-500 hover:text-red-400 text-xs px-1"
                            >
                              ✕
                            </button>
                          </div>
                        </div>
                      ))}
                    </div>
                  )}
                </div>

                <div className="pt-3 border-t border-white/[0.08]">
                  <div className="flex justify-between items-center mb-3">
                    <span className="text-xs font-mono-tech uppercase text-zinc-400">Total a Cobrar</span>
                    <span className="text-xl font-black font-display text-[#00D2FF] font-mono">${cartTotal} USD</span>
                  </div>

                  <button
                    type="button"
                    disabled={cart.length === 0}
                    onClick={handleCompleteSale}
                    className={`w-full py-2.5 px-4 rounded-xl font-bold font-mono-tech text-xs uppercase tracking-wider flex items-center justify-center gap-2 transition-all ${
                      cart.length > 0
                        ? 'bg-[#0066FF] hover:bg-[#0052CC] text-white shadow-[0_0_15px_rgba(0,102,255,0.4)] cursor-pointer'
                        : 'bg-white/[0.05] text-zinc-600 cursor-not-allowed'
                    }`}
                  >
                    <CheckCircle2 className="w-4 h-4" />
                    <span>Cobrar y Emitir Recibo</span>
                  </button>
                </div>
              </div>
            </div>
          )}

          {/* Tab 3: Financial Summary & Reports */}
          {simulatorTab === 'reports' && (
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
              <div className="p-4 rounded-2xl bg-black/40 border border-white/[0.08]">
                <span className="text-[10px] font-mono-tech uppercase text-zinc-400 tracking-wider block mb-1">
                  Ventas Totales Hoy
                </span>
                <span className="text-2xl font-black font-display text-white font-mono">
                  ${dailySalesTotal} <span className="text-xs text-zinc-500 font-normal">USD</span>
                </span>
                <span className="text-[11px] text-[#00D2FF] block mt-1">
                  {dailySalesCount} transacciones registradas
                </span>
              </div>

              <div className="p-4 rounded-2xl bg-black/40 border border-white/[0.08]">
                <span className="text-[10px] font-mono-tech uppercase text-zinc-400 tracking-wider block mb-1">
                  Ganancia Neta Estimada
                </span>
                <span className="text-2xl font-black font-display text-emerald-400 font-mono">
                  ${Math.round(dailySalesTotal * 0.44)} <span className="text-xs text-zinc-500 font-normal">USD</span>
                </span>
                <span className="text-[11px] text-zinc-400 block mt-1">
                  Margen promedio comercial 44%
                </span>
              </div>

              <div className="p-4 rounded-2xl bg-black/40 border border-white/[0.08]">
                <span className="text-[10px] font-mono-tech uppercase text-zinc-400 tracking-wider block mb-1">
                  Alertas de Stock Activas
                </span>
                <span className="text-2xl font-black font-display text-amber-400 font-mono">
                  {demoItems.filter(i => i.stock <= i.minStock).length} <span className="text-xs text-zinc-500 font-normal">artículos</span>
                </span>
                <span className="text-[11px] text-zinc-400 block mt-1">
                  Requieren reabastecimiento pronto
                </span>
              </div>
            </div>
          )}

          {/* Sale feedback notification toast */}
          {saleNotification && (
            <motion.div
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0 }}
              className="mt-4 p-3 rounded-xl bg-emerald-500/15 border border-emerald-500/40 text-emerald-300 text-xs font-mono-tech flex items-center justify-between"
            >
              <div className="flex items-center gap-2">
                <CheckCircle2 className="w-4 h-4 text-emerald-400" />
                <span>{saleNotification}</span>
              </div>
              <span className="text-[10px] text-zinc-400">Stock actualizado automáticamente</span>
            </motion.div>
          )}
        </div>

        {/* ============================================================ */}
        {/* 2. THREE TRANSPARENT PLANS & PRICING FOR SISTEMAS A MEDIDA    */}
        {/* ============================================================ */}
        <div className="mb-12">
          <div className="text-center max-w-xl mx-auto mb-10">
            <span className="text-[11px] font-mono-tech uppercase tracking-[0.25em] text-[#00D2FF] block mb-2 font-semibold">
              PRECIOS TRANSPARENTES
            </span>
            <h3 className="text-2xl sm:text-4xl font-black font-display text-white">
              Elige el sistema ideal para tu modelo de negocio
            </h3>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 lg:gap-8 items-stretch">
            {SYSTEM_PLANS.map(plan => (
              <div
                key={plan.id}
                className={`relative rounded-3xl p-6 sm:p-8 flex flex-col justify-between transition-all duration-300 ${
                  plan.highlight
                    ? 'bg-[#0B0F17] border-2 border-[#0066FF] shadow-[0_0_35px_rgba(0,102,255,0.25)]'
                    : 'bg-[#090C12] border border-white/[0.08] hover:border-white/20'
                }`}
              >
                {/* Top Badge */}
                <div>
                  <div className="flex items-center justify-between gap-2 mb-3">
                    <span className="text-[10px] font-mono-tech uppercase tracking-widest text-[#00D2FF] font-bold">
                      {plan.badge}
                    </span>
                    <span className="text-[10px] font-mono text-zinc-400">
                      {plan.deliveryTime}
                    </span>
                  </div>

                  <h4 className="text-xl sm:text-2xl font-black font-display text-white tracking-tight leading-snug mb-2">
                    {plan.name}
                  </h4>

                  <p className="text-xs text-zinc-400 leading-relaxed mb-6">
                    {plan.description}
                  </p>

                  {/* Price Block */}
                  <div className="p-4 rounded-2xl bg-black/60 border border-white/[0.08] mb-6">
                    <span className="text-[10px] font-mono-tech uppercase text-zinc-400 tracking-wider block">
                      PRECIO TOTAL DEL SISTEMA
                    </span>
                    <div className="flex items-baseline gap-2 mt-0.5">
                      <span className="text-3xl sm:text-4xl font-black font-display text-white">
                        ${plan.price}
                      </span>
                      <span className="text-xs font-mono text-zinc-400">USD • Pago único de desarrollo</span>
                    </div>
                  </div>

                  {/* Features List */}
                  <div className="space-y-2.5 mb-8">
                    <span className="text-[10px] font-mono-tech uppercase tracking-wider text-zinc-400 block mb-2 font-semibold">
                      QUÉ INCLUYE ESTE SISTEMA:
                    </span>
                    {plan.features.map((feat, fIdx) => (
                      <div key={fIdx} className="flex items-start gap-2.5 text-xs text-zinc-300 leading-snug">
                        <CheckCircle2 className="w-3.5 h-3.5 text-[#00D2FF] shrink-0 mt-0.5" />
                        <span>{feat}</span>
                      </div>
                    ))}
                  </div>
                </div>

                {/* Bottom CTA */}
                <div className="pt-4 border-t border-white/[0.08]">
                  <TasteButton
                    onClick={() => {
                      openConsultation({
                        serviceName: plan.name,
                        specs: plan.specsForQuote,
                        priceEstimate: `$${plan.price} USD`,
                      });
                    }}
                    variant={plan.highlight ? 'electric' : 'secondary'}
                    size="md"
                    strength={8}
                    icon={<ArrowUpRight className="w-4 h-4" />}
                    iconPosition="right"
                    className="w-full"
                  >
                    Cotizar este Sistema por WhatsApp
                  </TasteButton>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Bottom Custom Consultation Banner */}
        <div className="p-6 sm:p-8 rounded-3xl bg-[#0B0F17] border border-[#0066FF]/30 flex flex-col md:flex-row items-center justify-between gap-6">
          <div>
            <h4 className="text-lg sm:text-xl font-bold font-display text-white mb-1">
              ¿Tu negocio tiene requerimientos especiales de inventario?
            </h4>
            <p className="text-xs sm:text-sm text-zinc-400">
              Podemos adaptar módulos para códigos de barras físicos, impresoras térmicas de tickets, básculas o pasarelas de pago.
            </p>
          </div>

          <TasteButton
            onClick={() => {
              openConsultation({
                serviceName: 'Sistema a Medida Especializado',
                specs: 'Requiero un sistema a medida especializado con funciones particulares para mi modelo de negocio.',
              });
            }}
            variant="primary"
            size="md"
            icon={<ArrowUpRight className="w-4 h-4" />}
            className="shrink-0"
          >
            Consultar Requerimientos a Medida
          </TasteButton>
        </div>

      </div>
    </section>
  );
};
