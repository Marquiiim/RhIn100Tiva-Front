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
                    <PaginationPrevious onClick={() => currentPage > 1 && handlePageChange(currentPage - 1)}
                        className={currentPage === 1 ? 'pointer-events-none opacity-50' : 'cursor-pointer'} />
                </PaginationItem>

                <PaginationItem>
                    <PaginationLink isActive>
                        {currentPage}
                    </PaginationLink>
                </PaginationItem>


                <PaginationItem>
                    <PaginationNext onClick={() => currentPage < totalPages && handlePageChange(currentPage + 1)}
                        className={currentPage === totalPages ? 'pointer-events-none opacity-50' : 'cursor-pointer'} />
                </PaginationItem>
            </PaginationContent>
        </Pagination>
    )
}