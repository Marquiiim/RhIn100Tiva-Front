import {
    Pagination,
    PaginationContent,
    PaginationEllipsis,
    PaginationItem,
    PaginationLink,
    PaginationNext,
    PaginationPrevious,
} from "@/components/ui/pagination"


export default function PaginationTask({ totalPages, page, setPagination }) {
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
                    <PaginationPrevious onClick={() => handlePageChange(page - 1)}
                        className={page === 1 ? 'pointer-events-none opacity-50' : 'cursor-pointer'}
                        disabled={page === 1} />
                </PaginationItem>

                <PaginationItem>
                    <PaginationLink isActive>
                        {page}
                    </PaginationLink>
                </PaginationItem>


                <PaginationItem>
                    <PaginationNext onClick={() => handlePageChange(page + 1)}
                        className={page === totalPages ? 'pointer-events-none opacity-50' : 'cursor-pointer'}
                        disabled={page === totalPages} />
                </PaginationItem>
            </PaginationContent>
        </Pagination>
    )
}