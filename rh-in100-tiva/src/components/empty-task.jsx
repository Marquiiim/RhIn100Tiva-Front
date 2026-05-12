import { Empty, EmptyDescription, EmptyHeader, EmptyMedia, EmptyTitle } from "@/components/ui/empty"
import { CheckSquare } from "lucide-react"

export default function EmptyTask() {
    return (
        <Empty>
            <EmptyHeader>
                <EmptyMedia>
                    <CheckSquare />
                </EmptyMedia>
                <EmptyTitle>
                    Nenhuma tarefa cadastrada
                </EmptyTitle>
                <EmptyDescription>
                    Você não tem nenhuma tarefa cadastrada.
                    Adicione sua primeira tarefa logo acima.
                </EmptyDescription>
            </EmptyHeader>
        </Empty>
    )
}