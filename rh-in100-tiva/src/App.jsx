import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Toaster } from "@/components/ui/sonner"
import { Checkbox } from "@/components/ui/checkbox"
import { Input } from "@/components/ui/input"
import { ScrollArea } from "@/components/ui/scroll-area"
import { Loader2 } from "lucide-react"
import { Label } from "@/components/ui/label"
import TaskDetailsModal from "./components/modals/task-details-modal"
import EmptyTask from "./components/modals/empty-task"
import { useState, useEffect } from "react"
import api from "./services/apiInstance"

export default function App() {
  const [task, setTask] = useState('')
  const [modal, setModal] = useState({
    show: false,
    taskId: null
  })
  const [foundTasks, setFoundTasks] = useState([])
  const [isLoading, setIsLoading] = useState(false)

  const fetchAllTasks = async () => {
    try {
      setIsLoading(true)

      /*const response = await api.get('/api/task/all')
      setFoundTasks(response.data.foundTasks) 
      console.log(response.data)*/
    } catch (error) {
      console.log(error)
      setIsLoading(false)
    } finally {
      setIsLoading(false)
    }
  }

  const handleAddTask = async () => {
    if (!task.trim()) return
    try {
      setIsLoading(true)

      /*const response = await api.post('/api/task/add', task)
       console.log(response.data)*/
    } catch (error) {
      console.log(error)
      setIsLoading(false)
    } finally {
      setIsLoading(false)
    }
  }

  const toggleTaskStatus = async () => {
    try {
      setIsLoading(true)

      /*const response = await api.patch('/api/task/status', task)
       console.log(response.data)*/
    } catch (error) {
      console.log(error)
      setIsLoading(false)
    } finally {
      setIsLoading(false)
    }
  }

  const handleDeleteTask = async () => {
    try {
      setIsLoading(true)
      // const response = await api.delete('/api/task/delete', task)
      // console.log(response.data)
    } catch (error) {
      console.log(error)
    } finally {
      setIsLoading(false)
    }
  }

  useEffect(() => {
    fetchAllTasks()
  }, [])

  return (
    <>
      <form className='min-h-screen flex items-center justify-center'
        onSubmit={handleAddTask}
      >
        <Card className='w-full max-w-md'>

          <CardHeader>
            <CardTitle className='text-2x1 font-bold'>
              Minhas Tarefas
            </CardTitle>
          </CardHeader>

          <CardContent className='space-y-4'>
            <div className='flex gap-2'>
              <Input
                value={task}
                onChange={(e) => setTask(e.target.value)}
                className='flex-1'
                placeholder='Adicionar nova tarefa'
                required
              />
              <Button
                disabled={isLoading}
                type='submit'>
                {isLoading && (
                  <Loader2 className='mr-2 h-4 w-4 animate-spin' />
                )}
                {isLoading ? 'Adicionando...' : 'Adicionar'}
              </Button>
            </div>

            <ScrollArea className='h-[350px]'>
              <div className='space-y-3'>

                {!foundTasks || foundTasks.length === 0 ? (
                  <EmptyTask />
                ) : (
                  <div className='flex items-center justify-between gap-3 p-2 rounded-lg hover:bg-accent transition-colors'>
                    <div className='flex items-center gap-3'>
                      <Checkbox onClick={() => toggleTaskStatus(null)} />
                      <Label className='text-sm font-medium'>
                        Task 1
                      </Label>
                    </div>
                    <div className='flex items-center gap-3'>
                      <Button
                        onClick={() => setModal({ show: true, id: null })}
                        variant='outline'>
                        Visualizar
                      </Button>
                      <Button
                        onClick={() => handleDeleteTask(null)}
                        variant='destructive'>
                        Excluir
                      </Button>
                    </div>
                  </div>
                )}

              </div>
            </ScrollArea>

          </CardContent>
        </Card>
      </form>

      {modal.show &&
        <TaskDetailsModal
          id={modal.taskId}
          onClose={() => setModal({ show: false, data: null })} />
      }

      <Toaster richColors position='top-right' />
    </>
  )
}
