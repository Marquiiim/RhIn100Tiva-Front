import {
    Dialog,
    DialogContent,
    DialogDescription,
    DialogHeader,
    DialogTitle,
    DialogFooter
} from "@/components/ui/dialog"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Textarea } from "@/components/ui/textarea"
import { Label } from "@/components/ui/label"
import { Skeleton } from "@/components/ui/skeleton"
import { Loader2 } from "lucide-react"
import { useState, useEffect } from "react"
import api from "../../services/apiInstance"

export default function TaskDetailsModal({ id, onClose, refresh }) {
    const [changes, setChanges] = useState({
        name: '',
        description: ''
    })
    const [originalTitle, setOriginalTitle] = useState('')
    const [isLoading, setIsLoading] = useState(false)

    const handleGetDetailsTask = async (id) => {
        try {
            setIsLoading(true)
            const response = await api.get('/api/task/get', {
                params: {
                    id
                }
            })
            setChanges({ ...response.data.task })
            setOriginalTitle(response.data.task.name)
        } catch (error) {
            console.log(error)
        } finally {
            setIsLoading(false)
        }
    }

    const handleChanges = async (e) => {
        e.preventDefault()
        try {
            setIsLoading(true)
            await api.patch('/api/task/change', { task: changes })
            refresh()
            onClose()
        } catch (error) {
            console.log(error.message)
            setIsLoading(false)
        } finally {
            setIsLoading(false)
        }
    }

    useEffect(() => {
        if (id) handleGetDetailsTask(id)
    }, [id])

    if (isLoading && !changes.name) {
        return (
            <Dialog open={true} onOpenChange={onClose}>
                <DialogContent className='sm:max-w-md'>
                    <div className="space-y-4">
                        <div className="space-y-2">
                            <Skeleton className="h-8 w-3/4" />
                            <Skeleton className="h-4 w-full" />
                        </div>

                        <div className="space-y-4 py-4">
                            <div className="space-y-2">
                                <Skeleton className="h-4 w-24" />
                                <Skeleton className="h-10 w-full" />
                            </div>
                            <div className="space-y-2">
                                <Skeleton className="h-4 w-24" />
                                <Skeleton className="h-24 w-full" />
                            </div>
                        </div>

                        <div className="flex flex-row gap-2 justify-end">
                            <Skeleton className="h-9 w-20" />
                            <Skeleton className="h-9 w-24" />
                        </div>
                    </div>
                </DialogContent>
            </Dialog>
        )
    }

    return (
        <Dialog
            open={true}
            onOpenChange={onClose}>
            <DialogContent className='sm:max-w-md'>
                <form onSubmit={(e) => handleChanges(e)}>
                    <DialogHeader>
                        <DialogTitle className='text-2xl font-bold'>
                            Task - {originalTitle || 'Carregando...'}
                        </DialogTitle>
                        <DialogDescription>
                            Faça alterações na sua task, logo após clique em salvar
                        </DialogDescription>
                    </DialogHeader>
                    <div className='space-y-4 py-4'>
                        <div className='space-y-2'>
                            <Label className='text-sm font-medium'>
                                Nome
                            </Label>
                            <Input
                                value={changes?.name || ''}
                                onChange={(e) => setChanges(prev => ({ ...prev, name: e.target.value }))}
                                placeholder='Digite o novo nome da tarefa'
                                autoFocus
                                className='col-span-3'
                                disabled={isLoading}
                            />
                            <Label className='text-sm font-medium'>
                                Descrição
                            </Label>
                            <Textarea
                                value={changes?.description || ''}
                                onChange={(e) => setChanges(prev => ({ ...prev, description: e.target.value }))}
                                placeholder='Digite uma descrição mais detalhada...'
                                className="min-h-[100px] resize-none"
                                disabled={isLoading}
                            />
                        </div>
                        <div className='space-y-2'>
                            <Input
                                value={changes?.createdAt ? new Date(changes.createdAt).toLocaleString('pt-BR') : ''}
                                readOnly
                            />
                            <Textarea
                                value={`Tarefa realizada: ${changes?.isComplete ? 'Sim' : 'Não'}
Data da realização: ${changes?.completedAt ? new Date(changes.completedAt).toLocaleString('pt-BR') : 'Não finalizada'}`}
                                className="min-h-[80px] resize-none"
                                readOnly
                            />
                        </div>
                    </div>
                    <DialogFooter className='flex flex-row gap-2 sm:justify-end'>
                        <Button
                            type='button'
                            onClick={onClose}
                            disabled={isLoading}
                            variant='outline'>
                            Cancelar
                        </Button>
                        <Button
                            disabled={isLoading}
                            type='submit'>
                            {isLoading && (
                                <Loader2 className='mr-2 h-4 w-4 animate-spin' />
                            )}
                            {isLoading ? 'Salvando...' : 'Salvar alterações'}
                        </Button>
                    </DialogFooter>
                </form>
            </DialogContent>
        </Dialog>
    )
}