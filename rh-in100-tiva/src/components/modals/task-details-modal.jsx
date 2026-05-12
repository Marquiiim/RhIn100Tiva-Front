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
import { Label } from "@/components/ui/label"
import { Loader2 } from "lucide-react"
import { useState, useEffect } from "react"

export default function TaskDetailsModal({ id, onClose }) {
    const [change, setChange] = useState('')
    const [isLoading, setIsLoading] = useState(false)

    const handleGetDetailsTask = async (id) => {
        try {
            setIsLoading(true)
            // const response = await api.get('/api/task/:id', {params: { id }})
            // console.log(response.data)
        } catch (error) {
            console.log(error)
        } finally {
            setIsLoading(false)
        }
    }

    const handleChanges = async () => {
        if (!task.trim()) return
        try {
            setIsLoading(true)
            /*const response = await api.patch('/api/task/:id')
             console.log(response.data)*/
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
    }, [])

    return (
        <Dialog
            open={true}
            onOpenChange={onClose}>
            <DialogContent className='sm:max-w-md'>
                <form onSubmit={handleChanges}>
                    <DialogHeader>
                        <DialogTitle className='text-2x1 font-bold'>
                            Task 1
                        </DialogTitle>
                        <DialogDescription>
                            Faça alterações na sua task, logo após clique em salvar
                        </DialogDescription>
                    </DialogHeader>
                    <div className='space-y-4 py-4'>
                        <div className='space-y-2'>
                            <Label className='text-sm font-medium'>
                                Nome da task
                            </Label>
                            <Input
                                onChange={(e) => setChange(e.target.value)}
                                placeholder='Digite o novo nome da tarefa'
                                defaultValue='Task 1'
                                autoFocus
                                className='col-span-3' />
                        </div>
                    </div>
                    <DialogFooter className='flex flex-row gap-2 sm:justify-end'>
                        <Button
                            onClick={onClose}
                            disabled={isLoading}
                            variant='outline'>
                            Cancelar
                        </Button>
                        <Button
                            onClick={handleGetDetailsTask}
                            disabled={isLoading}>
                            type='submit'
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