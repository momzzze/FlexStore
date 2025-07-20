import { useLocation, Link, useParams } from 'react-router-dom';
import {
  Breadcrumb,
  BreadcrumbItem,
  BreadcrumbLink,
  BreadcrumbList,
  BreadcrumbPage,
  BreadcrumbSeparator,
} from '@/components/ui/breadcrumb';

export const breadcrumbMap = {
  '/dashboard': 'Dashboard',
  '/about': 'About',
  '/clients': 'Clients',
  '/clients/:id': (id: string) => `Client ${id}`,
  '/settings': 'Settings',
  '/settings/users': 'Users',
  '/settings/permissions': 'Permissions',
  '/settings/profile': 'Profile',
};

export default function Breadcrumbs() {
  const location = useLocation();
  const { id } = useParams(); // For dynamic segments

  const segments = location.pathname.split('/').filter(Boolean);
  const pathStack: string[] = [];

  return (
    <Breadcrumb className="mb-4">
      <BreadcrumbList>
        <BreadcrumbItem></BreadcrumbItem>
        {segments.map((segment, idx) => {
          pathStack.push(segment);
          const currentPath = '/' + pathStack.join('/');
          const labelFnOrString = Object.keys(breadcrumbMap).find((pathKey) => {
            if (pathKey.includes(':')) {
              const basePath = pathKey.split('/:')[0];
              return currentPath.startsWith(basePath);
            }
            return currentPath === pathKey;
          });

          if (!labelFnOrString) return null;

          const label = (() => {
            if (typeof breadcrumbMap[labelFnOrString] === 'function') {
              return breadcrumbMap[labelFnOrString](
                id || segment // fallback
              );
            }
            return breadcrumbMap[labelFnOrString as keyof typeof breadcrumbMap];
          })();

          const isLast = idx === segments.length - 1;

          return (
            <div key={currentPath} className="flex items-center">
              <BreadcrumbItem>
                {isLast ? (
                  <BreadcrumbPage>{label}</BreadcrumbPage>
                ) : (
                  <BreadcrumbLink asChild>
                    <Link to={currentPath}>{label}</Link>
                  </BreadcrumbLink>
                )}
              </BreadcrumbItem>
              {!isLast && <BreadcrumbSeparator />}
            </div>
          );
        })}
      </BreadcrumbList>
    </Breadcrumb>
  );
}
