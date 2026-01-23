import { BrowserRouter, Route, Routes } from 'react-router';
import PageComponents from './pages/page-components';
import LayoutMain from './pages/layout-main';
import PageHome from './pages/page-home';
import PagePhotoDetails from './pages/page-photo-details';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query'
import { NuqsAdapter } from 'nuqs/adapters/react-router/v7'
import { Toaster } from 'sonner';

const queryClient = new QueryClient();

const App = () => {
    return (
        <QueryClientProvider client={queryClient}>
            <NuqsAdapter>
                <Toaster position='bottom-center' duration={500} />
                <BrowserRouter>
                    <Routes>
                        <Route element={<LayoutMain />} >
                            <Route index element={<PageHome />} />
                            <Route path='/photos/:id' element={<PagePhotoDetails />} />
                            <Route path='/components' element={<PageComponents />} />
                        </Route>
                    </Routes>
                </BrowserRouter>
            </NuqsAdapter>
        </QueryClientProvider>
    )
}

export default App;
