import React, { createContext, useContext, useState } from 'react';

export interface WhatsAppInquiryInitialData {
  serviceName?: string;
  businessType?: string;
  clientName?: string;
  specs?: string;
  priceEstimate?: string;
  breakdown?: string;
}

interface WhatsAppModalContextValue {
  isOpen: boolean;
  initialData: WhatsAppInquiryInitialData;
  openConsultation: (data?: WhatsAppInquiryInitialData) => void;
  closeConsultation: () => void;
}

const WhatsAppModalContext = createContext<WhatsAppModalContextValue | undefined>(undefined);

export const WhatsAppModalProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [isOpen, setIsOpen] = useState(false);
  const [initialData, setInitialData] = useState<WhatsAppInquiryInitialData>({});

  const openConsultation = (data?: WhatsAppInquiryInitialData) => {
    setInitialData(data || {});
    setIsOpen(true);
  };

  const closeConsultation = () => {
    setIsOpen(false);
  };

  return (
    <WhatsAppModalContext.Provider
      value={{
        isOpen,
        initialData,
        openConsultation,
        closeConsultation,
      }}
    >
      {children}
    </WhatsAppModalContext.Provider>
  );
};

export const useWhatsAppModal = () => {
  const context = useContext(WhatsAppModalContext);
  if (!context) {
    throw new Error('useWhatsAppModal must be used within a WhatsAppModalProvider');
  }
  return context;
};
