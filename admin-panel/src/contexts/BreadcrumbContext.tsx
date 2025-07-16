import { createContext, useContext, useState } from 'react';

type BreadcrumbPath = { label: string; href?: string };
type BreadcrumbContextType = {
  paths: BreadcrumbPath[];
  setPaths: (paths: BreadcrumbPath[]) => void;
};

const BreadcrumbContext = createContext<BreadcrumbContextType | undefined>(
  undefined
);

export const BreadcrumbProvider = ({
  children,
}: {
  children: React.ReactNode;
}) => {
  const [paths, setPaths] = useState<BreadcrumbPath[]>([]);
  return (
    <BreadcrumbContext.Provider value={{ paths, setPaths }}>
      {children}
    </BreadcrumbContext.Provider>
  );
};

export const useBreadcrumb = () => {
  const context = useContext(BreadcrumbContext);
  if (!context)
    throw new Error('useBreadcrumb must be used within BreadcrumbProvider');
  return context;
};
