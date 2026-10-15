import React, { createContext, useContext, useState } from 'react';

export type SiteMode = 'sistemas' | 'webs' | 'catalogos' | 'todo';

export interface ModeMeta {
  id: SiteMode;
  number: string;
  name: string;
  shortLabel: string;
  tagline: string;
  description: string;
  priceFrom: string;
  priceNote: string;
  targetAnchor: string;
  keywords: string[];
}

export const SITE_MODES: Record<SiteMode, ModeMeta> = {
  sistemas: {
    id: 'sistemas',
    number: '01',
    name: 'Sistemas a Medida',
    shortLabel: 'Sistemas',
    tagline: 'Administración de Negocios, Inventario, Punto de Venta & Control',
    description: 'Software en la nube para gestionar tu stock de productos, caja diaria, clientes y reportes de ganancias.',
    priceFrom: '$220 USD',
    priceNote: 'Planes desde $220 hasta $490 USD',
    targetAnchor: '#sistemas',
    keywords: ['Inventario en vivo', 'Punto de Venta POS', 'Control de Stock', 'Reportes de Ventas']
  },
  webs: {
    id: 'webs',
    number: '02',
    name: 'Páginas Web',
    shortLabel: 'Webs',
    tagline: 'Sitios Web para Negocios, Landing Pages & Presencia Digital',
    description: 'Páginas ultra rápidas, adaptadas al 100% a celulares con botones de contacto directo y SEO para Google.',
    priceFrom: '$95 USD',
    priceNote: 'Planes desde $95 hasta $190 USD',
    targetAnchor: '#servicios',
    keywords: ['Landing Pages', 'Sitios Corporativos', 'Carga Ultra Rápida', 'Dominio Incluido']
  },
  catalogos: {
    id: 'catalogos',
    number: '03',
    name: 'Catálogos Digitales',
    shortLabel: 'Catálogos',
    tagline: 'Catálogos Interactivos con Fotos HD & Checkout a WhatsApp',
    description: 'Vitrina digital para pastelerías, tiendas de ropa, productos y comida con envío de pedido directo a WhatsApp.',
    priceFrom: '$160 USD',
    priceNote: 'Planes desde $160 hasta $260 USD',
    targetAnchor: '#portafolio',
    keywords: ['Pedidos WhatsApp', 'Buscador Instantáneo', 'Galería HD', 'Carrito Móvil']
  },
  todo: {
    id: 'todo',
    number: '04',
    name: 'Ver Todo',
    shortLabel: 'Todo el Sitio',
    tagline: 'Explorar el Ecosistema Completo de D.E.K NOVACORE',
    description: 'Descubre todos nuestros sistemas, páginas web, catálogos en producción, cotizador en vivo y portafolio.',
    priceFrom: 'Accesible',
    priceNote: 'Todo el catálogo y cotizador',
    targetAnchor: '#hero',
    keywords: ['Sistemas + Webs + Catálogos', 'Cotizador en Vivo', 'Portafolio Real']
  }
};

interface SiteModeContextValue {
  activeMode: SiteMode;
  showPortal: boolean;
  selectMode: (mode: SiteMode, scrollToTarget?: boolean) => void;
  openPortal: () => void;
  closePortal: () => void;
}

const SiteModeContext = createContext<SiteModeContextValue | undefined>(undefined);

export const SiteModeProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [activeMode, setActiveMode] = useState<SiteMode>('todo');
  const [showPortal, setShowPortal] = useState<boolean>(true);

  const selectMode = (mode: SiteMode, scrollToTarget = true) => {
    setActiveMode(mode);
    setShowPortal(false);

    if (scrollToTarget) {
      setTimeout(() => {
        const target = SITE_MODES[mode]?.targetAnchor;
        if (target) {
          const el = document.querySelector(target);
          if (el) {
            el.scrollIntoView({ behavior: 'smooth' });
          }
        }
      }, 350);
    }
  };

  const openPortal = () => setShowPortal(true);
  const closePortal = () => setShowPortal(false);

  return (
    <SiteModeContext.Provider
      value={{
        activeMode,
        showPortal,
        selectMode,
        openPortal,
        closePortal,
      }}
    >
      {children}
    </SiteModeContext.Provider>
  );
};

export const useSiteMode = () => {
  const context = useContext(SiteModeContext);
  if (!context) {
    throw new Error('useSiteMode must be used within a SiteModeProvider');
  }
  return context;
};
