import React, { createContext, useContext, useMemo, useState } from 'react';
import {
  lekkiServiceHub,
  type OyaPartnerBusiness,
  type PartnerOffering,
  type PartnerStaff } from
'../data/oyaPartner';

interface PartnerContextValue {
  partner: OyaPartnerBusiness;
  toggleService: (serviceId: string) => void;
  toggleProvider: (serviceId: string, providerId: string) => void;
  addProvider: (serviceId: string, staff: Omit<PartnerStaff, 'id'>) => void;
  updateOffering: (serviceId: string, offeringId: string, patch: Partial<PartnerOffering>) => void;
  addOffering: (serviceId: string, offering: Omit<PartnerOffering, 'id'>) => void;
}

const PartnerContext = createContext<PartnerContextValue | null>(null);

export function PartnerProvider({ children }: {children: React.ReactNode;}) {
  const [partner, setPartner] = useState<OyaPartnerBusiness>(lekkiServiceHub);

  const value = useMemo<PartnerContextValue>(() => ({
    partner,
    toggleService: (serviceId) => {
      setPartner((current) => ({
        ...current,
        services: current.services.map((service) =>
        service.id === serviceId ? { ...service, enabled: !service.enabled } : service)

      }));
    },
    toggleProvider: (serviceId, providerId) => {
      setPartner((current) => ({
        ...current,
        services: current.services.map((service) =>
        service.id === serviceId ?
        {
          ...service,
          providers: service.providers.map((provider) =>
          provider.id === providerId ? { ...provider, available: !provider.available } : provider)

        } :
        service)

      }));
    },
    addProvider: (serviceId, staff) => {
      const id = `${serviceId}-${staff.name.toLowerCase().replace(/\s+/g, '-')}-${Date.now().toString(36)}`;
      setPartner((current) => ({
        ...current,
        services: current.services.map((service) =>
        service.id === serviceId ?
        { ...service, providers: [...service.providers, { ...staff, id }] } :
        service)

      }));
    },
    updateOffering: (serviceId, offeringId, patch) => {
      setPartner((current) => ({
        ...current,
        services: current.services.map((service) =>
        service.id === serviceId ?
        {
          ...service,
          offerings: service.offerings.map((offering) =>
          offering.id === offeringId ? { ...offering, ...patch } : offering)

        } :
        service)

      }));
    },
    addOffering: (serviceId, offering) => {
      const id = `${serviceId}-${offering.name.toLowerCase().replace(/\s+/g, '-')}-${Date.now().toString(36)}`;
      setPartner((current) => ({
        ...current,
        services: current.services.map((service) =>
        service.id === serviceId ?
        { ...service, offerings: [...service.offerings, { ...offering, id }] } :
        service)

      }));
    }
  }), [partner]);

  return <PartnerContext.Provider value={value}>{children}</PartnerContext.Provider>;
}

export function usePartner() {
  const context = useContext(PartnerContext);
  if (!context) {
    throw new Error('usePartner must be used within PartnerProvider');
  }
  return context;
}
