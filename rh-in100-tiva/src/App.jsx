import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Toaster } from "@/components/ui/sonner"
import { Checkbox } from "@/components/ui/checkbox"
import { Input } from "@/components/ui/input"
import { ScrollArea } from "@/components/ui/scroll-area"
import { Loader2 } from "lucide-react"
import { Label } from "@/components/ui/label"
import TaskDetailsModal from "./components/modals/task-details-modal"
import EmptyTask from "./components/empty-task"
import PaginationTask from "./components/pagination-task"
import { useState, useEffect } from "react"
import api from "./services/apiInstance"

export default function App() {
  const [task, setTask] = useState('')
  const [modal, setModal] = useState({
    show: false,
    taskId: null
  })
  const [foundTasks, setFoundTasks] = useState({
    data: null,
    refresh: 0,
    pagination: {
      page: 1,
      limit: 5,
      totalPages: 0
    }
  })
  const [isLoading, setIsLoading] = useState(false)

  const fetchAllTasks = async () => {
    try {
      setIsLoading(true)

      const response = await api.get('/api/task/all', {
        params: {
          page: foundTasks.pagination.page,
          limit: foundTasks.pagination.limit
        }
      })
      setFoundTasks(prev => ({
        ...prev,
        data: response.data.found,
        pagination: { ...prev.pagination, totalPages: response.data.totalPages }
      }))
    } catch (error) {
      console.log(error)
      setIsLoading(false)
    } finally {
      setIsLoading(false)
    }
  }

  const handleAddTask = async (e) => {
    e.preventDefault()
    if (!task.trim()) return
    try {
      setIsLoading(true)
      await api.post('/api/task/add', { task })
      setTask('')
      setFoundTasks(prev => ({
        ...prev,
        refresh: prev.refresh + 1,
      }))
    } catch (error) {
      console.log(error)
      setIsLoading(false)
    } finally {
      setIsLoading(false)
      setTask('')
    }
  }

  const toggleTaskStatus = async (id) => {
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

  const handleDeleteTask = async (id) => {
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
  }, [foundTasks.refresh])

  return (
    <>
      <form className='min-h-screen flex items-center justify-center'
        onSubmit={(e) => handleAddTask(e)}
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

                {!foundTasks.data || foundTasks.data.length === 0 ? (
                  <EmptyTask />
                ) : (
                  foundTasks.data.map((task) =>
                    <div key={task.id}
                      className='flex items-center justify-between gap-3 p-2 rounded-lg hover:bg-accent transition-colors'>
                      <div className='flex items-center gap-3'>
                        <Checkbox onClick={() => toggleTaskStatus(null)} />
                        <Label className='text-sm font-medium'>
                          {task.name}
                        </Label>
                      </div>
                      <div className='flex items-center gap-3'>
                        <Button
                          onClick={() => setModal({ show: true, id: task.id })}
                          variant='outline'>
                          Visualizar
                        </Button>
                        <Button
                          onClick={() => handleDeleteTask(task.id)}
                          variant='destructive'>
                          Excluir
                        </Button>
                      </div>
                    </div>)
                )}

              </div>
            </ScrollArea>

            <PaginationTask
              totalPages={foundTasks.pagination.totalPages}
              page={foundTasks.pagination.page}
              limit={foundTasks.pagination.limit}
              setPagination={setFoundTasks}
            />

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
