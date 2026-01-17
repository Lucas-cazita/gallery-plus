import Icon from './components/icon'
import Text from './components/text'
import SpinnerIcon from './assets/icons/spinner.svg?react'
import ButtonIcon from './components/button-icon'
import Checkbox from './components/checkbox'
import Button from './components/button'

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
    </main>
  )
}

export default App
