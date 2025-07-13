export function GenericTablePagination({
  page,
  totalPages,
  onPageChange,
}: {
  page: number;
  totalPages: number;
  onPageChange: (p: number) => void;
}) {
  return (
    <div className="flex justify-between items-center mt-4 text-sm">
      <span>
        Page {page} of {totalPages}
      </span>
      <div className="flex gap-2">
        <button disabled={page === 1} onClick={() => onPageChange(page - 1)}>
          Prev
        </button>
        <button
          disabled={page === totalPages}
          onClick={() => onPageChange(page + 1)}
        >
          Next
        </button>
      </div>
    </div>
  );
}
