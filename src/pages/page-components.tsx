import Text from '../components/text'
import Icon from '../components/icon'
import SpinnerIcon from '../assets/icons/spinner.svg?react'
import ButtonIcon from '../components/button-icon'
import Checkbox from '../components/checkbox'
import Button from '../components/button'
import Badge from '../components/badge'
import Divider from '../components/divider'
import Card from '../components/card'
import Container from '../components/container'
import InputText from '../components/input-text'
import SerachIcon from '../assets/icons/search.svg?react'
import InputSingleFile from '../components/input-single-file'
import { useForm } from 'react-hook-form'
import ImagePreview from '../components/image-preview'
import { Dialog, DialogClose, DialogTrigger } from '@radix-ui/react-dialog'
import { DialogBody, DialogContent, DialogFooter, DialogHeader } from '../components/dialog'

function PageComponents() {

    const form = useForm();
    const file = form.watch('file');
    const fileSource = file?.[0] ? URL.createObjectURL(file[0]) : undefined;

    return (
        <main className='flex flex-col justify-center items-center gap-2 mb-40'>
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
                <Divider orientation={'vertical'} />
                <Divider orientation={'horizontal'} />
            </div>
            <Card size={'md'}>
                <Button >Clique aqui</Button>
            </Card>
            <Container className='bg-background-tertiary'>
                <Button >Clique aqui</Button>

            </Container>

            <div>
                <InputText
                    placeholder='Busque uma foto'
                    icon={SerachIcon}
                />

                <InputSingleFile
                    allowedExtenxions={['png', 'jpg', 'jpeg', 'webp']}
                    maxFileSizeInMb={50}
                    form={form}
                    replaceBy={<ImagePreview src={fileSource} />}
                    {...form.register('file')}
                />
            </div>

            <div>
                <Dialog>
                    <DialogTrigger asChild>
                        <Button>Abrir Modal</Button>
                    </DialogTrigger>
                    <DialogContent>
                        <DialogHeader>
                            Teste Dialog
                        </DialogHeader>
                        <DialogBody>
                            <Text as='div' className='mb-4'>Teste de Body</Text>
                            <InputSingleFile
                                allowedExtenxions={['png', 'jpg', 'jpeg', 'webp']}
                                maxFileSizeInMb={50}
                                form={form}
                                replaceBy={<ImagePreview src={fileSource} />}
                                {...form.register('file')}
                            />
                        </DialogBody>
                        <DialogFooter>
                            <DialogClose asChild>
                                <Button variant={'secondary'}>Cancelar</Button>
                            </DialogClose>
                            <Button>Adicionar</Button>
                        </DialogFooter>
                    </DialogContent>
                </Dialog>
            </div>
        </main>
    )
}

export default PageComponents;