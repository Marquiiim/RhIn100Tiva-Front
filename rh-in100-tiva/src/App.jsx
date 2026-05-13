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
import { Textarea } from "./components/ui/textarea"

export default function App() {
  const [task, setTask] = useState({
    name: '',
    description: ''
  })
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
    }
  }

  const handleAddTask = async (e) => {
    e.preventDefault()
    if (!task.name.trim()) return
    try {
      setIsLoading(true)
      await api.post('/api/task/add', { task })
      setTask({ name: '', description: '' })
      setFoundTasks(prev => ({
        ...prev,
        refresh: prev.refresh + 1,
      }))
    } catch (error) {
      console.log(error)
    } finally {
      setIsLoading(false)
    }
  }

  const toggleTaskStatus = async (id) => {
    try {
      await api.patch('/api/task/change/status', { id })
      setFoundTasks(prev => ({
        ...prev,
        refresh: prev.refresh + 1,
      }))
    } catch (error) {
      console.log(error)
    }
  }

  const handleDeleteTask = async (id) => {
    try {
      await api.delete('/api/task/delete', {
        params: { id }
      })
      setFoundTasks(prev => ({
        ...prev,
        refresh: prev.refresh + 1,
      }))
    } catch (error) {
      console.log(error)
    }
  }

  useEffect(() => {
    fetchAllTasks()
  }, [foundTasks.refresh])

  return (
    <>
      <form className='min-h-screen flex items-center justify-center p-4'
        onSubmit={handleAddTask}
      >
        <Card className='w-full max-w-md'>
          <CardHeader>
            <CardTitle className='text-xl font-bold'>
              Minhas Tarefas
            </CardTitle>
          </CardHeader>

          <CardContent className='space-y-4'>
            <div className='space-y-3'>
              <Input
                value={task.name}
                onChange={(e) => setTask(prev => ({ ...prev, name: e.target.value }))}
                placeholder='Nome da tarefa'
                required
              />

              <Textarea
                value={task.description}
                onChange={(e) => setTask(prev => ({ ...prev, description: e.target.value }))}
                placeholder='Descrição (opcional)'
                className='min-h-[70px] resize-none'
              />

              <Button
                disabled={isLoading}
                type='submit'
                className='w-full'>
                {isLoading && (
                  <Loader2 className='mr-2 h-4 w-4 animate-spin' />
                )}
                {isLoading ? 'Adicionando...' : 'Adicionar'}
              </Button>
            </div>

            <ScrollArea className='h-[250px]'>
              <div className='space-y-2'>
                {!foundTasks.data || foundTasks.data.length === 0 ? (
                  <EmptyTask />
                ) : (
                  foundTasks.data.map((task) => (
                    <div key={task.id}
                      className={`flex items-center justify-between gap-2 p-2 rounded-lg border transition-colors ${task.isComplete
                        ? 'bg-green-100 dark:bg-green-900/30 border-green-200 dark:border-green-800'
                        : 'hover:bg-accent'
                        }`}>
                      <div className='flex items-center gap-2 flex-1 min-w-0'>
                        <Checkbox
                          checked={task.isComplete}
                          onClick={() => toggleTaskStatus(task.id)} />
                        <Label className={`text-sm font-medium truncate ${task.isComplete === 1 ? 'line-through' : ''}`}>
                          {task.name}
                        </Label>
                      </div>
                      <div className='flex items-center gap-2'>
                        <Button
                          onClick={() => setModal({ show: true, taskId: task.id })}
                          variant='outline'
                          size='sm'>
                          Ver
                        </Button>
                        <Button
                          onClick={() => handleDeleteTask(task.id)}
                          variant='destructive'
                          size='sm'>
                          Excluir
                        </Button>
                      </div>
                    </div>
                  ))
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
          refresh={() => setFoundTasks(prev => ({ ...prev, refresh: prev.refresh + 1 }))}
          onClose={() => setModal({ show: false, taskId: null })} />
      }

      <Toaster richColors position='top-right' />
    </>
  )
}