import {
    Pagination,
    PaginationContent,
    PaginationItem,
    PaginationLink,
    PaginationNext,
    PaginationPrevious,
} from "@/components/ui/pagination"


export default function PaginationTask({ totalPages, page, setPagination }) {
    const currentPage = totalPages > 0
        ? Math.min(Math.max(page || 1, 1), totalPages)
        : 1

    const handlePageChange = (newPage) => {
        if (newPage < 1 || newPage > totalPages) return

        setPagination(prev => ({
            ...prev,
            pagination: {
                ...prev.pagination,
                page: newPage
            }
        }))
    }

    if (totalPages <= 1) return null

    return (
        <Pagination>
            <PaginationContent>
                <PaginationItem>
                    <PaginationPrevious onClick={() => handlePageChange(currentPage - 1)}
                        className={currentPage === 1 ? 'pointer-events-none opacity-50' : 'cursor-pointer'}
                        aria-disabled={currentPage === 1} />
                </PaginationItem>

                <PaginationItem>
                    <PaginationLink isActive>
                        {currentPage}
                    </PaginationLink>
                </PaginationItem>


                <PaginationItem>
                    <PaginationNext onClick={() => handlePageChange(currentPage + 1)}
                        className={currentPage === totalPages ? 'pointer-events-none opacity-50' : 'cursor-pointer'}
                        aria-disabled={currentPage === totalPages} />
                </PaginationItem>
            </PaginationContent>
        </Pagination>
    )
}