import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from '@/components/ui/table';

export interface GenericColumn<T> {
  label: string;
  render: (item: T) => React.ReactNode;
}

interface GenericTableProps<T> {
  data: T[];
  columns: GenericColumn<T>[];
}

export function GenericTable<T>({ data, columns }: GenericTableProps<T>) {
  return (
    <Table>
      <TableHeader>
        <TableRow>
          {columns.map((col, idx) => (
            <TableHead key={idx}>{col.label}</TableHead>
          ))}
        </TableRow>
      </TableHeader>
      <TableBody>
        {data.map((row, idx) => (
          <TableRow key={idx}>
            {columns.map((col, colIdx) => (
              <TableCell key={colIdx}>{col.render(row)}</TableCell>
            ))}
          </TableRow>
        ))}
      </TableBody>
    </Table>
  );
}
