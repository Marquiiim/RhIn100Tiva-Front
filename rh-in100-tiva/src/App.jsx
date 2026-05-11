import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Toaster } from "@/components/ui/sonner"
import { toast } from 'sonner'
import { Checkbox } from "@/components/ui/checkbox"
import { Input } from "@/components/ui/input"
import { ScrollArea } from "@/components/ui/scroll-area"

export default function App() {

  const handleAddTask = async () => {
    try {
      throw new Error('testando erro')
    } catch (error) {
      toast.error(error.message, {
        duration: 6000
      })
    }
  }

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
            <Input
              className='flex-1'
              placeholder='Adicionar nova tarefa'
            />
            <Button type='submit'>Adicionar</Button>

            <ScrollArea className='h-[350px]'>
              <div className='space-y-3'>
                <div className='flex items-center justify-between gap-3 p-2 rounded-lg hover:bg-accent transition-colors'>
                  <div className='flex items-center gap-3'>
                    <Checkbox />
                    <label>Teste 1</label>
                  </div>
                  <div className='flex items-center gap-3'>
                    <Button variant='outline'>
                      Visualizar
                    </Button>
                    <Button variant='destructive'>
                      Excluir
                    </Button>
                  </div>
                </div>
              </div>
            </ScrollArea>

          </CardContent>
        </Card>
      </form>

      <Toaster richColors position='top-right' />
    </>
  )
}
