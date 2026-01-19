import Icon from './components/icon'
import Text from './components/text'
import SpinnerIcon from './assets/icons/spinner.svg?react'
import ButtonIcon from './components/button-icon'
import Checkbox from './components/checkbox'
import Button from './components/button'
import Badge from './components/badge'
import Divider from './components/divider'
import Card from './components/card'
import Container from './components/container'

function App() {

  return (
    <main className='flex flex-col justify-center items-center gap-2'>
      <Text> Teste de texto </Text>
      <ButtonIcon icon={SpinnerIcon} />
      <ButtonIcon icon={SpinnerIcon} loading />
      <Icon icon={SpinnerIcon} className='fill-text-label' animate />
      <Checkbox loading />
      <Checkbox />
      <Button handling>Clique aqui</Button>
      <Button loading>Clique aqui</Button>
      <Button variant={"destructive"} handling>Clique aqui</Button>
      <Badge >Gastronomia</Badge>
      <Badge size={'sm'}>Gastronomia</Badge>
      <Badge size={'sm'} loading>Gastronomia</Badge>
      <div className='flex justify-center items-center h-20 w-20'>
        <Divider orientation={'vetical'} />
        <Divider orientation={'horizontal'} />
      </div>
      <Card size={'md'}>
        <Button >Clique aqui</Button>
      </Card>
      <Container className='bg-background-tertiary'>
        <Button >Clique aqui</Button>

      </Container>
    </main>
  )
}

export default App
