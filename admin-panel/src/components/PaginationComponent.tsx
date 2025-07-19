import {
  Pagination,
  PaginationContent,
  PaginationItem,
  PaginationLink,
  PaginationNext,
  PaginationPrevious,
} from '@/components/ui/pagination';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
} from '@/components/ui/select';

export default function PaginationComponent({
  page,
  totalPages,
  limit,
  onPageChange,
  onLimitChange,
}: {
  page: number;
  totalPages: number;
  limit: number;
  onPageChange: (page: number) => void;
  onLimitChange: (limit: number) => void;
}) {
  const displayPages = Math.max(totalPages, 1);

  return (
    <div className="flex justify-between items-center mt-4">
      <Pagination>
        <PaginationContent>
          <PaginationItem>
            <PaginationPrevious
              onClick={() => onPageChange(Math.max(1, page - 1))}
            />
          </PaginationItem>

          {Array.from({ length: displayPages }, (_, i) => (
            <PaginationItem key={i + 1}>
              <PaginationLink
                isActive={page === i + 1}
                onClick={() => onPageChange(i + 1)}
              >
                {i + 1}
              </PaginationLink>
            </PaginationItem>
          ))}

          <PaginationItem>
            <PaginationNext
              onClick={() => onPageChange(Math.min(displayPages, page + 1))}
            />
          </PaginationItem>
        </PaginationContent>
      </Pagination>

      <div className="w-24">
        <Select
          value={String(limit)}
          onValueChange={(val) => onLimitChange(Number(val))}
        >
          <SelectTrigger />
          <SelectContent>
            {[10, 20, 50].map((option) => (
              <SelectItem key={option} value={String(option)}>
                {option} per page
              </SelectItem>
            ))}
          </SelectContent>
        </Select>
      </div>
    </div>
  );
}
